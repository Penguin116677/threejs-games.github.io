import { inKingdom } from './wilayah.js'

// Penjagaan Kerajaan Kencana — siapa pun yang masuk wilayah kerajaan (wilayah.js) dihadang:
// - PEMAIN (orang asing): prajurit terdekat berlari mencegat, lalu menanyainya (kartu tanya-jawab
//   dengan pilihan jawaban). Jawaban damai → boleh masuk (tamu). Jawaban kasar, terus kabur saat
//   dicegat, atau memukul prajurit → dilawan beramai-ramai (maks. MAX_ATTACKERS sekaligus).
//   Kalah → dibawa keluar wilayah (diurus main.js). Lama di luar wilayah → dianggap asing lagi.
// - MUSUH (orc yang menyerbu lewat Jembatan Agung): langsung dihadang dan dilawan, tanpa ditanya.
// - PENDATANG (penduduk dari seberang): ditanyai di gerbang Jembatan Agung, lalu boleh lewat.
// Tubuh & gerak prajurit ada di prajurit.js; modul ini hanya memberi perintah.

const DETECT = 40 // m: prajurit sejauh ini melihat orang asing yang masuk wilayah
const SCAN = 0.5 // detik antar-pemindaian
const MAX_ATTACKERS = 3
const JOIN = 40 // m: prajurit sejauh ini ikut melawan pemain yang bermusuhan
const RAID_JOIN = 80 // m: … ikut menghadang orc
const CHASE_LIMIT = 30 // detik terus menghindar saat dicegat → dianggap kabur
const CALM_OUTSIDE = 25 // detik di luar wilayah → berhenti dikejar, asing lagi
const GUEST_RESET = 20 // detik di luar wilayah → tamu ditanyai lagi saat masuk kembali
const RAID_FIRST = 100 // detik sejak game dimulai sampai serbuan orc pertama
const RAID_EVERY = [150, 210] // detik antar-serbuan
const VISIT = { first: 35, every: [60, 110], speed: 1.4, shop: [18, 30] } // pendatang (detik, m/s)
const VISITOR_LINES = [
  'Saya pedagang kain dari Pulau Tropis, mau berjualan di pasar.',
  'Saya mau mengantar ikan asin ke pasar kota.',
  'Saya hendak menjenguk saudara di Kampung Nelayan.',
  'Saya membawa kelapa muda untuk dijual di pasar.',
]
const NAME = 'Prajurit Kencana'

const pick = list => list[Math.floor(Math.random() * list.length)]

// sasaran perintah pemain — objek tetap, jadi perintah yang sama bisa dikenali
export const PLAYER = { kind: 'pemain' }

const WELCOME = {
  pengembara: 'Baiklah, pengembara. Kamu boleh masuk. Jangan membuat keributan!',
  raja: 'Sang Raja bersemayam di Keraton, di tengah Kotaraja. Silakan, tapi kami mengawasimu.',
  orc: 'Pemburu orc? Bagus! Gerombolan orc kadang menyerbu lewat Jembatan Agung. Selamat datang!',
  kembali: 'Silakan masuk.',
  maaf: 'Baiklah. Sekali lagi berbuat onar, kami tidak akan segan.',
}

// soldiers: prajurit.js; enemies: enemies.js (boleh null); player: player.js;
// dialog & bubbles: ui/tanya.js; message(teks): pesan singkat di layar; setInput(bool): input pemain;
// villagers + visit: pendatang (orang berskenario dari villagers.js) dan jalurnya { start, gate, market: [] }
export function createSecurity({ soldiers, enemies, player, dialog, bubbles, message, setInput, villagers = null, visit = null, ground = null }) {
  const S = {
    status: 'asing', // 'asing' | 'tamu' | 'musuh'
    record: 0, // berapa kali pernah bermusuhan
    visits: 0, // berapa kali diizinkan masuk
    inside: false,
    outsideT: 0,
    cooldown: 0, // jeda sebelum dicegat lagi (setelah memilih pergi)
    chaseT: 0,
    scanT: 0,
    greetT: 0,
    raidT: RAID_FIRST,
    raids: 0,
  }
  let clock = 0
  let q = null // tanya-jawab yang sedang berjalan: { lead, partner, reason }
  const pursuers = [] // prajurit yang sedang mencegat pemain
  const orcTargets = new Map() // id orc → sasaran
  const timers = []
  let raidAnnounced = false
  let raidsOn = true // serbuan berkala (pengujian bisa mematikannya; raid() tetap bisa memicu)

  const later = (sec, fn) => timers.push({ t: sec, fn })
  const free = a => a.state === 'ronda' || a.state === 'jaga' || a.state === 'kembali'
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

  // ---------------------------------------------------------------- tanya-jawab dengan pemain
  function finish() {
    dialog.close()
    setInput(true)
    q = null
  }

  function startQuestion(lead, partner) {
    q = { lead, partner, reason: null }
    pursuers.length = 0
    player.stop()
    player.face(lead.x, lead.z)
    setInput(false)
    soldiers.command(lead, { do: 'tanya', target: PLAYER, near: 2.1 })
    soldiers.gesture(lead, 'stop')
    if (partner) soldiers.command(partner, { do: 'awasi', target: PLAYER, near: 2.9, side: 1.2 })
    say(lead, 'Berhenti!', 1800)
    if (S.record > 0)
      dialog.open({
        name: NAME,
        text: 'Kamu lagi! Kali ini jangan membuat onar. Mau apa kamu ke sini?',
        options: [
          { text: 'Aku minta maaf. Aku datang dengan damai.', value: 'maaf' },
          { text: 'Aku belum selesai denganmu!', value: 'kasar' },
          { text: 'Aku tidak jadi masuk.', value: 'pergi' },
        ],
        onChoose: answer,
      })
    else if (S.visits > 0)
      dialog.open({
        name: NAME,
        text: 'Kamu lagi, pengembara dari Pulau Tropis. Ada perlu apa kali ini?',
        options: [
          { text: 'Hanya lewat. Aku datang dengan damai.', value: 'kembali' },
          { text: 'Bukan urusanmu!', value: 'kasar' },
        ],
        onChoose: answer,
      })
    else
      dialog.open({
        name: NAME,
        text: 'Berhenti! Siapa kamu? Ada keperluan apa datang ke Kerajaan Kencana?',
        options: [
          { text: 'Aku pengembara dari Pulau Tropis. Aku datang dengan damai.', value: 'pengembara' },
          { text: 'Aku ingin menghadap Sang Raja.', value: 'raja' },
          { text: 'Aku pemburu orc. Aku datang untuk membantu.', value: 'orc' },
          { text: 'Bukan urusanmu! Minggir!', value: 'kasar' },
          { text: 'Maaf, aku tidak jadi masuk.', value: 'pergi' },
        ],
        onChoose: v => (v === 'pengembara' || v === 'raja' || v === 'orc' ? askWeapon(v) : answer(v)),
      })
  }

  // pertanyaan kedua (pertemuan pertama): untuk apa pedang itu?
  function askWeapon(reason) {
    q.reason = reason
    soldiers.gesture(q.lead, 'no')
    dialog.open({
      name: NAME,
      text: 'Pedang itu untuk apa? Senjata tidak boleh dipakai sembarangan di wilayah kerajaan.',
      options: [
        { text: 'Hanya untuk melawan orc dan menjaga diri.', value: reason },
        { text: 'Untuk menebas siapa pun yang menghalangiku!', value: 'kasar' },
      ],
      onChoose: answer,
    })
  }

  function answer(v) {
    if (!q) return
    const { lead, partner } = q
    if (v === 'kasar')
      dialog.open({
        name: NAME,
        text: 'Lancang! Prajurit, tangkap penyusup ini!',
        options: [{ text: 'Bersiap bertarung!', value: 'ok' }],
        onChoose: () => {
          finish()
          soldiers.gesture(lead, 'no')
          becomeHostile(lead, 'Penyusup! Serang!')
          if (partner) say(partner, 'Tangkap dia!')
        },
      })
    else if (v === 'pergi')
      dialog.open({
        name: NAME,
        text: 'Kalau begitu, kembalilah ke Pulau Tropis.',
        options: [{ text: 'Pergi.', value: 'ok' }],
        onChoose: () => {
          finish()
          S.cooldown = 15
          soldiers.gesture(lead, 'no')
          say(lead, 'Jangan kembali tanpa keperluan!')
          later(1.2, () => {
            soldiers.release(lead)
            if (partner) soldiers.release(partner)
          })
        },
      })
    else
      dialog.open({
        name: NAME,
        text: WELCOME[v] ?? WELCOME.pengembara,
        options: [{ text: 'Terima kasih.', value: 'ok' }],
        onChoose: () => {
          finish()
          S.status = 'tamu'
          S.visits++
          soldiers.gesture(lead, 'yes')
          say(lead, 'Silakan lewat.')
          later(1.6, () => {
            soldiers.release(lead)
            if (partner) soldiers.release(partner)
          })
        },
      })

  }

  // ---------------------------------------------------------------- bermusuhan
  function becomeHostile(source, shout) {
    if (q) finish()
    pursuers.length = 0
    if (S.status !== 'musuh') S.record++
    S.status = 'musuh'
    S.scanT = 0
    if (source) say(source, shout)
    message('Prajurit Kencana menyerangmu! Lawan, atau lari keluar dari wilayah kerajaan.', 3600)
  }

  function calmDown(text) {
    S.status = 'asing'
    for (const a of soldiers.list) if (a.order?.target === PLAYER) soldiers.release(a)
    pursuers.length = 0
    if (text) message(text, 3000)
  }

  function manageAttack(dt) {
    if (player.defeated) return
    let n = 0
    for (const a of soldiers.list) if (soldiers.alive(a) && a.state === 'serang' && a.order?.target === PLAYER) n++
    if (n >= MAX_ATTACKERS) return
    S.scanT -= dt
    if (S.scanT > 0) return
    S.scanT = 0.4
    const cands = soldiers.list
      .filter(a => soldiers.alive(a) && (free(a) || (a.order?.target === PLAYER && a.state !== 'serang')))
      .map(a => ({ a, d: Math.hypot(a.x - pp.x, a.z - pp.z) }))
      .filter(c => c.d < (S.inside ? JOIN : JOIN * 0.6))
      .sort((p, r) => p.d - r.d)
      .slice(0, MAX_ATTACKERS - n)
    cands.forEach(({ a }, i) => {
      soldiers.command(a, { do: 'serang', target: PLAYER })
      if (i === 0) say(a, pick(['Kepung dia!', 'Jangan biarkan lolos!', 'Bantu! Ada penyusup!', 'Serang!']))
    })
  }

  // tamu disapa prajurit yang berpapasan
  function greet(dt) {
    S.greetT -= dt
    if (S.greetT > 0) return
    S.greetT = 1
    const a = soldiers.nearest(pp.x, pp.z, 3.2, s => s.state === 'ronda' || s.state === 'jaga')
    if (!a || (a.greetAt ?? -1e9) > clock - 60) return
    a.greetAt = clock
    S.greetT = 8
    say(a, pick(['Selamat datang di Kencana.', 'Salam, pengembara.', 'Jaga sikapmu, ya.', 'Hati-hati di jalan.']))
  }

  // ---------------------------------------------------------------- orang asing masuk wilayah
  function intercept(dt) {
    if (q || player.defeated) return
    for (let i = pursuers.length - 1; i >= 0; i--) if (!soldiers.alive(pursuers[i]) || pursuers[i].state !== 'cegat') pursuers.splice(i, 1)
    if (!S.inside) {
      if (pursuers.length && S.outsideT > 3) {
        for (const a of pursuers) soldiers.release(a)
        pursuers.length = 0
      }
      return
    }
    if (S.cooldown > 0) return
    if (!pursuers.length) {
      S.scanT -= dt
      if (S.scanT > 0) return
      S.scanT = SCAN
      const lead = soldiers.nearest(pp.x, pp.z, DETECT, free)
      if (!lead) return
      pursuers.push(lead)
      soldiers.command(lead, { do: 'cegat', target: PLAYER, near: 2.2 })
      say(lead, S.record ? 'Kamu lagi! Berhenti di situ!' : 'Hei, kamu! Berhenti!')
      const partner = soldiers.nearest(lead.x, lead.z, 25, a => free(a) && a !== lead)
      if (partner) {
        pursuers.push(partner)
        soldiers.command(partner, { do: 'cegat', target: PLAYER, near: 3.4 })
      }
      S.chaseT = 0
      return
    }
    S.chaseT += dt
    const lead = pursuers[0]
    const d = Math.hypot(lead.x - pp.x, lead.z - pp.z)
    if (lead.arrived && d < 3 && !player.attacking && player.grounded) startQuestion(lead, pursuers[1] || null)
    else if (S.chaseT > CHASE_LIMIT) becomeHostile(lead, 'Dia kabur! Tangkap!')
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
    get status() {
      return S.status
    },
    get questioning() {
      return q !== null
    },
    stats: () => ({ ...S, pengejar: pursuers.length, ditanya: q !== null }),
    update(dt) {
      clock += dt
      for (let i = timers.length - 1; i >= 0; i--)
        if ((timers[i].t -= dt) <= 0) {
          const [tm] = timers.splice(i, 1)
          tm.fn()
        }
      S.inside = !player.defeated && inKingdom(pp.x, pp.z)
      S.outsideT = S.inside ? 0 : S.outsideT + dt
      if (S.cooldown > 0) S.cooldown -= dt
      if (S.status === 'musuh')
        if (S.outsideT > CALM_OUTSIDE) calmDown('Prajurit Kencana berhenti mengejarmu.')
        else manageAttack(dt)
      else if (S.status === 'tamu')
        if (S.outsideT > GUEST_RESET) S.status = 'asing'
        else greet(dt)

      if (S.status === 'asing') intercept(dt)
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
    // pemain memukul prajurit (daftar yang kena) → dilawan
    playerStruck(list) {
      if (!list.length) return
      if (S.status !== 'musuh') becomeHostile(list[0], 'Penyerang! Lawan dia!')
      for (const a of list) if (soldiers.alive(a) && free(a)) soldiers.command(a, { do: 'serang', target: PLAYER })
    },
    // pemain kalah: true bila dikalahkan prajurit kerajaan (dibawa keluar wilayah)
    playerDefeated() {
      const byKingdom = S.status === 'musuh'
      if (byKingdom) {
        const a = soldiers.nearest(pp.x, pp.z, 12, s => s.order?.target === PLAYER)
        if (a) say(a, 'Bawa dia keluar dari wilayah kerajaan!', 3000)
      }
      if (q) finish()
      calmDown(null)
      return byKingdom
    },
    // untuk pengujian: kembali ke keadaan awal (asing, belum pernah datang)
    reset() {
      if (q) finish()
      calmDown(null)
      Object.assign(S, { record: 0, visits: 0, cooldown: 0, chaseT: 0, scanT: 0 })
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
