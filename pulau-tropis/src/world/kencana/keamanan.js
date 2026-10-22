import { inKingdom } from './wilayah.js'

// Penjagaan Kerajaan Kencana. Pemain bukan rakyat kerajaan mana pun, jadi ia MUSUH setiap kerajaan
// (aturan yang sama berlaku untuk kerajaan yang dibuat kemudian):
// - PEMAIN: prajurit yang melihatnya di wilayah kerajaan (wilayah.js) — atau berpapasan dengannya di
//   luar wilayah — berseru lalu langsung menghadang & menyerang, dibantu yang lain (paling banyak
//   MAX_ATTACKERS sekaligus; yang roboh atau tertinggal digantikan). Kalah → dibawa keluar wilayah
//   (diurus main.js). Lolos keluar wilayah (tak ada penyerang di dekatnya) → berhenti dikejar,
//   tetapi masuk lagi = diserang lagi.
// - ORC (penyerbu lewat Jembatan Agung): langsung dihadang dan dilawan.
// - PENDATANG (penduduk dari seberang): ditanyai di gerbang Jembatan Agung, lalu boleh lewat.
// Tubuh & gerak prajurit ada di prajurit.js; modul ini hanya memberi perintah.

const DETECT = 40 // m: prajurit sejauh ini melihat pemain di wilayah kerajaan
const NOTICE = 7 // m: di luar wilayah, prajurit yang bertugas menyerang pemain yang sedekat ini
const SCAN = 0.5 // detik antar-pemindaian
const MAX_ATTACKERS = 3
const JOIN = 40 // m: prajurit sejauh ini ikut melawan pemain
const LEASH = 60 // m: penyerang yang tertinggal sejauh ini menyerah (yang lebih dekat menggantikan)
// m: di luar wilayah prajurit mengejar paling jauh sekian dari titik ia mulai mengejar, lalu
// kembali bertugas (prajurit lain yang bertugas di dekat pemain bisa meneruskan)
const PURSUE_OUT = 35
const RAID_JOIN = 80 // m: … ikut menghadang orc
// lolos: di luar wilayah tanpa penyerang sedekat `range` m selama `time` detik → berhenti dikejar
// (berjalan di separuh timur jembatan sambil diburu bukan lolos)
const LOST = { range: 20, time: 6 }
// detik prajurit di luar wilayah belum menyerang lagi: setelah berhenti mengejar / setelah pemain
// dibawa keluar (supaya tidak langsung dikeroyok penjaga kepala jembatan begitu bangun)
const GRACE = { calm: 10, thrown: 30 }
const RAID_FIRST = 100 // detik sejak game dimulai sampai serbuan orc pertama
const RAID_EVERY = [150, 210] // detik antar-serbuan
const VISIT = { first: 35, every: [60, 110], speed: 1.4, shop: [18, 30] } // pendatang (detik, m/s)
const VISITOR_LINES = [
  'Saya pedagang kain dari Pulau Tropis, mau berjualan di pasar.',
  'Saya mau mengantar ikan asin ke pasar kota.',
  'Saya hendak menjenguk saudara di Kampung Nelayan.',
  'Saya membawa kelapa muda untuk dijual di pasar.',
]
// seruan prajurit yang pertama melihat pemain
const CHALLENGE = [
  'Berhenti! Siapa kamu?! Kamu bukan rakyat Kencana!',
  'Musuh kerajaan! Serang!',
  'Penyusup! Tangkap dia!',
  'Hadang dia! Jangan biarkan masuk!',
]

const pick = list => list[Math.floor(Math.random() * list.length)]

// sasaran perintah pemain — objek tetap, jadi perintah yang sama bisa dikenali
export const PLAYER = { kind: 'pemain' }

// soldiers: prajurit.js; enemies: enemies.js (boleh null); player: player.js; bubbles: ui/tanya.js;
// message(teks): pesan singkat di layar; villagers + visit: pendatang (orang berskenario dari
// villagers.js) dan jalurnya { start, gate, market: [] }
export function createSecurity({ soldiers, enemies, player, bubbles, message, villagers = null, visit = null, ground = null }) {
  const S = {
    engaged: false, // prajurit sedang memburu pemain
    inside: false,
    lostT: 0, // detik pemain sudah lolos dari pemburunya
    grace: 0,
    scanT: 0,
    raidT: RAID_FIRST,
    raids: 0,
  }
  let caller = null // prajurit yang terakhir berseru menantang pemain
  const chaseFrom = new Map() // penyerang pemain → titik ia mulai mengejar
  const orcTargets = new Map() // id orc → sasaran
  let raidAnnounced = false
  let raidsOn = true // serbuan berkala (pengujian bisa mematikannya; raid() tetap bisa memicu)
  let peace = false // gencatan senjata (pengujian): prajurit tidak menghiraukan pemain

  const free = a => a.state === 'ronda' || a.state === 'jaga' || a.state === 'kembali'
  const hunting = a => a.state === 'serang' && a.order?.target === PLAYER
  const onDuty = a => a.state === 'ronda' || a.state === 'jaga'
  const say = (a, text, ms = 2600) => bubbles.say(() => (soldiers.alive(a) ? { x: a.x, y: a.y + 2.2, z: a.z } : null), text, ms, `p${a.id}`)
  const pp = player.position

  function targetPos(target) {
    if (target === PLAYER) return player.defeated ? null : pp
    if (target.kind === 'orc') return enemies ? enemies.position(target.id) : null
    if (target.kind === 'orang') return target.ref.gone ? null : target.ref
    return null
  }

  // serangan prajurit mengenai sasarannya
  soldiers.onStrike((a, target, damage) => {
    if (target === PLAYER) player.damage(damage, a)
    else if (target.kind === 'orc') enemies?.damage(target.id, 3, a) // orc (6 nyawa) tumbang dalam dua pukulan
  })

  // ---------------------------------------------------------------- pemain = musuh kerajaan
  function hunt(a) {
    if (!hunting(a)) chaseFrom.set(a, { x: a.x, z: a.z })
    soldiers.command(a, { do: 'serang', target: PLAYER })
  }

  function engage(source, shout) {
    S.engaged = true
    S.scanT = 0
    caller = source && soldiers.alive(source) ? source : soldiers.nearest(pp.x, pp.z, DETECT)
    if (caller) say(caller, shout)
    message('Kamu musuh Kerajaan Kencana! Lawan prajuritnya, atau lari keluar dari wilayah kerajaan.', 3600)
  }

  function calmDown(text, grace) {
    S.engaged = false
    S.lostT = 0
    S.grace = grace
    for (const a of soldiers.list) if (a.order?.target === PLAYER) soldiers.release(a)
    if (text) message(text, 3000)
  }

  // prajurit yang melihat pemain langsung menghadang & menyerangnya
  function watch(dt) {
    if (player.defeated || (!S.inside && S.grace > 0)) return
    S.scanT -= dt
    if (S.scanT > 0) return
    S.scanT = SCAN
    const a = S.inside ? soldiers.nearest(pp.x, pp.z, DETECT, free) : soldiers.nearest(pp.x, pp.z, NOTICE, onDuty)
    if (a) engage(a, pick(CHALLENGE))
  }

  function manageAttack(dt) {
    if (player.defeated) return
    let n = 0
    for (const a of soldiers.list) {
      if (!soldiers.alive(a) || !hunting(a)) continue
      const from = chaseFrom.get(a)
      const strayed = !S.inside && from && Math.hypot(a.x - from.x, a.z - from.z) > PURSUE_OUT
      if (strayed || Math.hypot(a.x - pp.x, a.z - pp.z) > LEASH) soldiers.release(a)
      else n++
    }
    if (n >= MAX_ATTACKERS) return
    S.scanT -= dt
    if (S.scanT > 0) return
    S.scanT = 0.4
    // di luar wilayah hanya yang sedang bertugas di dekatnya (bukan yang baru berhenti mengejar)
    const cands = soldiers.list
      .filter(a => soldiers.alive(a) && (S.inside ? free(a) : onDuty(a)))
      .map(a => ({ a, d: Math.hypot(a.x - pp.x, a.z - pp.z) }))
      .filter(c => c.d < (S.inside ? JOIN : JOIN * 0.6))
      .sort((p, r) => p.d - r.d)
      .slice(0, MAX_ATTACKERS - n)
    for (const { a } of cands) hunt(a)
    // yang datang membantu ikut berseru (seruan penantang tidak ditimpa)
    const helper = cands.find(c => c.a !== caller)
    if (helper) say(helper.a, pick(['Kepung dia!', 'Jangan biarkan lolos!', 'Bantu! Ada penyusup!', 'Serang!']))
  }

  // ---------------------------------------------------------------- serbuan orc
  function orcTarget(id) {
    let t = orcTargets.get(id)
    if (!t) orcTargets.set(id, t = { kind: 'orc', id })
    return t
  }

  function manageRaid(dt) {
    if (!enemies) return
    if (raidsOn || S.raidT <= 0) S.raidT -= dt
    if (S.raidT <= 0 && !enemies.raidActive) {
      S.raidT = RAID_EVERY[0] + Math.random() * (RAID_EVERY[1] - RAID_EVERY[0])
      if (enemies.startRaid(pp)) {
        S.raids++
        raidAnnounced = false
      }
    }
    for (const r of enemies.raiders()) {
      // dihadang begitu masuk wilayah, atau bila sudah dekat prajurit (mis. di separuh timur jembatan)
      if (!inKingdom(r.x, r.z) && !soldiers.nearest(r.x, r.z, 15, free)) continue
      if (!raidAnnounced) {
        raidAnnounced = true
        if (Math.hypot(r.x - pp.x, r.z - pp.z) < 300) message('Gerombolan orc menyerbu Jembatan Agung! Prajurit Kencana menghadang mereka.', 4200)
      }
      const t = orcTarget(r.id)
      let n = 0
      for (const a of soldiers.list) if (a.state === 'serang' && a.order?.target === t) n++
      if (n >= 2) continue
      const a = soldiers.nearest(r.x, r.z, RAID_JOIN, free)
      if (!a) continue
      soldiers.command(a, { do: 'serang', target: t })
      say(a, pick(['Orc menyerbu! Hadang!', 'Serang orc itu!', 'Lindungi kerajaan!', 'Jangan biarkan lewat!']))
    }
  }

  // ---------------------------------------------------------------- pendatang dari seberang
  // Muncul di ujung timur Jembatan Agung (bila pemain jauh), berjalan ke gerbang barat, berhenti
  // ditanyai penjaga pos terdekat, menjawab, lalu boleh lewat ke pasar; sesudah berbelanja pulang
  // lagi lewat jembatan dan menghilang di ujung timur.
  const visitors = (villagers && visit ? villagers.scripted : []).map((a, k) => ({ a, phase: 'tunggu', t: VISIT.first + k * 45, path: [], target: { kind: 'orang', ref: a }, guard: null, asked: 0 }))
  const sayAt = (a, text, ms) => bubbles.say(() => (a.hidden ? null : { x: a.x, y: ground.surfaceAt(a.x, a.z) + 1.95, z: a.z }), text, ms, `v${villagers.agents.indexOf(a)}`)
  function walk(v, dt) {
    const { a } = v
    const p = v.path[0]
    if (!p) return true
    const dx = p.x - a.x
    const dz = p.z - a.z
    const d = Math.hypot(dx, dz)
    if (d < 0.3) {
      v.path.shift()
      return !v.path.length
    }
    const step = Math.min(VISIT.speed * dt, d)
    a.x += (dx / d) * step
    a.z += (dz / d) * step
    a.heading += Math.atan2(Math.sin(Math.atan2(dx, dz) - a.heading), Math.cos(Math.atan2(dx, dz) - a.heading)) * Math.min(1, dt * 6)
    villagers.setClip(a, 'walk')
    return false
  }
  function manageVisitors(dt) {
    for (const v of visitors) {
      const { a } = v
      const far = Math.hypot(pp.x - visit.start.x, pp.z - visit.start.z) > 45
      if (v.phase === 'tunggu') {
        if ((v.t -= dt) > 0 || !far) continue
        a.hidden = false
        a.x = visit.start.x
        a.z = visit.start.z
        a.heading = -Math.PI / 2
        a.speed = VISIT.speed
        v.path = [{ ...visit.gate }]
        v.phase = 'datang'
      } else if (v.phase === 'datang') {
        if (walk(v, dt)) {
          v.phase = 'ditanya'
          v.t = 0
          v.guard = null
          villagers.setClip(a, 'idle')
        }
      } else if (v.phase === 'ditanya') {
        v.t += dt
        if (!v.guard && v.t < 8) {
          v.guard = soldiers.nearest(a.x, a.z, 16, s => s.kind === 'pos' && free(s))
          if (v.guard) {
            v.t = 0
            soldiers.command(v.guard, { do: 'tanya', target: v.target, near: 1.8 })
            soldiers.gesture(v.guard, 'stop')
            say(v.guard, 'Berhenti! Siapa kamu dan mau ke mana?', 2600)
          }
        }
        const g = v.guard
        if (g) {
          a.heading += Math.atan2(Math.sin(Math.atan2(g.x - a.x, g.z - a.z) - a.heading), Math.cos(Math.atan2(g.x - a.x, g.z - a.z) - a.heading)) * Math.min(1, dt * 5)
          if (v.t > 2.6 && !v.said) {
            v.said = true
            v.asked++
            sayAt(a, pick(VISITOR_LINES), 3200)
            villagers.setClip(a, 'interact')
          }
          if (v.t > 6 && !v.passed) {
            v.passed = true
            soldiers.gesture(g, 'yes')
            say(g, pick(['Silakan lewat. Jaga sikapmu di kota.', 'Baik, silakan lewat.', 'Silakan. Pasar ada di dekat alun-alun.']), 2600)
          }
        }
        if (v.t > (g ? 7.6 : 8)) {
          if (g && g.order?.target === v.target) soldiers.release(g)
          v.guard = null
          v.said = v.passed = false
          v.path = visit.market.map(p => ({ ...p }))
          v.phase = 'masuk'
        }
      } else if (v.phase === 'masuk') {
        if (walk(v, dt)) {
          v.phase = 'belanja'
          v.t = VISIT.shop[0] + Math.random() * (VISIT.shop[1] - VISIT.shop[0])
          villagers.setClip(a, 'interact')
        }
      } else if (v.phase === 'belanja') {
        if ((v.t -= dt) <= 0) {
          v.path = [...visit.market].reverse().slice(1).map(p => ({ ...p }))
          v.path.push({ ...visit.gate }, { ...visit.start })
          v.phase = 'pulang'
        }
      } else if (v.phase === 'pulang')
        if (walk(v, dt)) {
          villagers.setClip(a, 'idle')
          if (far) {
            a.hidden = true
            v.phase = 'tunggu'
            v.t = VISIT.every[0] + Math.random() * (VISIT.every[1] - VISIT.every[0])
          }
        }

    }
  }

  return {
    targetPos,
    // prajurit sedang memburu pemain
    get engaged() {
      return S.engaged
    },
    stats: () => ({ ...S, penyerang: soldiers.list.filter(a => soldiers.alive(a) && hunting(a)).length }),
    update(dt) {
      S.inside = !player.defeated && inKingdom(pp.x, pp.z)
      if (S.grace > 0) S.grace -= dt
      if (!peace && !S.engaged) watch(dt)
      else if (!peace) {
        S.lostT = S.inside || soldiers.nearest(pp.x, pp.z, LOST.range, hunting) ? 0 : S.lostT + dt
        if (S.lostT > LOST.time) calmDown('Prajurit Kencana berhenti mengejarmu.', GRACE.calm)
        else manageAttack(dt)
      }

      manageRaid(dt)
      if (visitors.length) manageVisitors(dt)
    },
    // pendatang: { fase, ditanya } (untuk pengujian)
    visitors: () => visitors.map(v => ({ fase: v.phase, ditanya: v.asked, x: v.a.x, z: v.a.z })),
    // untuk pengujian: pendatang berikutnya datang sekarang
    visitNow() {
      const v = visitors.find(o => o.phase === 'tunggu')
      if (v) v.t = 0
    },
    // prajurit diserang orc: membalas, dibantu pasangannya (di mana pun, juga di luar wilayah)
    defend(a, orcId) {
      const t = orcTarget(orcId)
      const helpers = [a, ...(a.squad ? a.squad.members.filter(m => m !== a) : [])]
      helpers.forEach((m, i) => {
        if (!soldiers.alive(m) || (m.state === 'serang' && m.order?.target?.kind === 'orc') || !(free(m) || m === a)) return
        soldiers.command(m, { do: 'serang', target: t })
        if (i === 0) say(m, pick(['Orc! Lawan!', 'Serang balik!', 'Hadang orc ini!']))
      })
    },
    // pemain memukul prajurit (daftar yang kena, boleh sudah roboh) → dilawan, di mana pun
    playerStruck(list) {
      if (!list.length || peace) return
      if (!S.engaged) engage(list[0], pick(['Berani menyerang prajurit Kencana?! Serang!', 'Penyerang! Lawan dia!']))
      for (const a of list) if (soldiers.alive(a) && free(a)) hunt(a)
    },
    // pemain kalah: true bila dikalahkan prajurit kerajaan (dibawa keluar wilayah)
    playerDefeated() {
      const byKingdom = S.engaged
      if (byKingdom) {
        const a = soldiers.nearest(pp.x, pp.z, 12, s => s.order?.target === PLAYER)
        if (a) say(a, 'Bawa dia keluar dari wilayah kerajaan!', 3000)
      }
      calmDown(null, byKingdom ? GRACE.thrown : 0)
      return byKingdom
    },
    // untuk pengujian: semua prajurit kembali bertugas, belum ada yang melihat pemain
    reset() {
      calmDown(null, 0)
      S.scanT = 0
    },
    // untuk pengujian: gencatan senjata hidup-mati (orc & pendatang tetap diurus)
    ceasefire(on) {
      peace = on
      if (on) calmDown(null, 0)
    },
    // untuk pengujian: serbuan orc sekarang juga / serbuan berkala hidup-mati
    raid() {
      S.raidT = 0
    },
    setRaids(on) {
      raidsOn = on
    },
  }
}
