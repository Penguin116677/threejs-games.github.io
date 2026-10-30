import { PLAYER } from './keamanan.js'

// Mengajak prajurit Kencana menjadi ANAK BUAH pemain; yang menolak bisa ditantang DUEL satu lawan
// satu — yang kalah menjadi anak buah yang menang (permintaan pengguna, v0.18.0).
// - AJAK (tombol Ajak, komputer: J) saat berdiri dekat prajurit: prajurit itu — dan yang sedang
//   memburu pemain di dekatnya — berhenti mendengarkan. Mau / tidaknya tergantung kesetiaannya
//   (penjaga pos lebih setia dari peronda), luka-lukanya, dan banyaknya anak buah pemain (makin
//   banyak makin disegani). Yang mau → anak buah. Yang menolak menggeleng & menantang: tombol Duel.
// - DUEL (tombol Duel, komputer: U): satu lawan satu di gelanggang; prajurit lain & anak buah
//   menonton di tepinya, penjagaan kerajaan berhenti selama duel. Lawan duel lebih tangguh (nyawa
//   × DUEL.hp, menyerang lebih kerap, pukulannya 1,5 × lebih keras). Nyawanya habis → menyerah & menjadi anak buah.
//   Nyawa pemain jatuh ke DUEL.floor → pemain kalah: jatuh terduduk dan menjadi anak buah si
//   pemenang — menyerahkan upeti (UPETI bagian koin) — lalu urusannya dianggap selesai (prajurit
//   berhenti memburu sejenak); si pemenang tidak mau ditantang lagi selama BOSS detik. Menjauh dari
//   gelanggang / berenang / naik perahu = lari dari duel (dibatalkan).
// - ANAK BUAH: berjalan berdua-dua di belakang pemain, ikut berenang & memanjat dek, melawan
//   prajurit yang memburu pemain (atau yang menyerang anak buah lain) dan orc di dekat pemain.
//   Roboh hanya pingsan sebentar, lalu menyusul. Tertinggal jauh (pemain berperahu, dibuang keluar
//   wilayah) → menyusul begitu pemain di darat. Paling banyak MAX orang.

const NEAR = 3.2 // m: tombol Ajak muncul
const MAX = 10
const ANSWER = 1.3 // detik: ajakan dijawab
const WAIT = 9 // detik: yang menolak menunggu ditantang (tombol Duel)
const LISTEN = 22 // m: pemburu sedekat ini ikut berhenti selama pemain mengajak / berduel
const DUEL = { hp: 2.5, floor: 12, ring: 6.5, leave: 15 }
const UPETI = 0.3
const BOSS = 90 // detik
const FIGHT = 14 // m dari pemain: musuh sejauh ini dilawan anak buah
const CATCH_UP = { far: 70, time: 4 } // m & detik tertinggal → menyusul (muncul di belakang pemain)

const pick = list => list[Math.floor(Math.random() * list.length)]
const AJAK = ['Bergabunglah denganku!', 'Jadilah anak buahku!', 'Ikutlah denganku, prajurit!']
const MAU = ['Baiklah, aku ikut denganmu!', 'Siap! Mulai sekarang aku anak buahmu.', 'Sudah lama aku bosan meronda. Aku ikut!', 'Aku ikut! Pimpinlah kami.']
const TOLAK = ['Tidak sudi! Aku setia pada Raja Kencana!', 'Mengikutimu? Kalahkan aku dulu!', 'Aku tidak akan mengkhianati kerajaan!', 'Hah! Kau tidak pantas jadi pemimpinku.']
const MENYERAH = ['Aku kalah… Kau memang hebat. Aku ikut denganmu!', 'Cukup! Aku menyerah. Mulai sekarang aku anak buahmu.', 'Ilmumu tinggi… Aku ikut denganmu!']

// soldiers: prajurit.js; security: keamanan.js; enemies: orc (boleh null); bag & shop: koin
// (upeti); bubbles: gelembung ucapan; message(teks, ms): pesan di layar; ground & colliders: tempat
// anak buah muncul saat menyusul
export function createRecruits({ soldiers, security, player, enemies = null, bag, shop, bubbles, message, ground, colliders }) {
  const pp = player.position
  const followers = [] // urutan = tempat barisan
  const lastAnswer = new Map() // prajurit → { yes, t }: jawaban terakhir (tidak berubah sesaat)
  const boss = new Map() // prajurit → detik sisa ia "atasan" pemain (pemain kalah duel)
  const far = new Map() // anak buah → detik tertinggal jauh
  let talk = null // { a, t, answered, yes, listeners: [{ a, hunted }] }
  let duel = null // { a, cx, cz, watchers: [{ a, follower, hunted }] }
  let foeT = 0
  let clock = 0
  let forced = null // pengujian: jawaban berikutnya dipaksa mau (true) / menolak (false)

  const say = (a, text, ms = 2600) => bubbles.say(() => (soldiers.alive(a) ? { x: a.x, y: a.y + 1.8, z: a.z } : null), text, ms, `p${a.id}`)
  const sayMe = (text, ms = 1800) => bubbles.say(() => ({ x: pp.x, y: pp.y + 1.8, z: pp.z }), text, ms, 'pemain')
  const dist = a => Math.hypot(a.x - pp.x, a.z - pp.z)
  const free = () => !player.defeated && !player.riding && !player.climbing && !player.stunned

  // prajurit yang bisa diajak: terdekat, hidup, bukan anak buah, tidak sedang di perahu / memanjat
  function candidate() {
    if (!free() || duel || followers.length >= MAX) return null
    return soldiers.nearest(pp.x, pp.z, NEAR, a => !a.follower && !a.ride && !a.climb && a.state !== 'naik')
  }

  // peluang mau diajak: peronda 32%, penjaga pos 18%; + 6% tiap anak buah (paling banyak +30%);
  // + sampai 35% bila terluka; − 10% bila sedang memburu pemain
  function willing(a) {
    let p = a.kind === 'pos' ? 0.18 : 0.32
    p += Math.min(0.3, followers.length * 0.06)
    p += 0.35 * (1 - a.hp / a.maxHp)
    if (security.isHunting(a)) p -= 0.1
    return Math.max(0.05, Math.min(0.85, p))
  }

  // pemburu di dekat pemain ikut berhenti (mendengarkan / menonton); dicatat supaya bisa dipulihkan.
  // all (duel): yang lebih jauh berhenti memburu & kembali bertugas (tidak datang mengganggu duel)
  function holdHunters(except, all = false) {
    const out = []
    for (const a of soldiers.list) {
      // yang memburu pemain atau menyerang anak buahnya (yang sedang melawan orc dibiarkan)
      const vsFollower = a.state === 'serang' && a.order?.target?.kind === 'prajurit'
      if (a === except || !soldiers.alive(a) || a.follower || a.ride || !(security.isHunting(a) || vsFollower)) continue
      if (dist(a) < LISTEN) {
        out.push({ a, hunted: security.isHunting(a) })
        soldiers.listen(a)
      } else if (all) soldiers.release(a)
    }
    return out
  }
  // kembali seperti semula: yang tadinya memburu pemain memburu lagi (bila penjagaan masih siaga),
  // yang lain kembali bertugas
  function resume(list) {
    for (const { a, hunted } of list) {
      if (!soldiers.alive(a) || a.follower) continue
      if (hunted && security.engaged) soldiers.command(a, { do: 'serang', target: PLAYER })
      else soldiers.release(a)
    }
  }

  function join(a) {
    const n = followers.length
    soldiers.follow(a, n)
    followers.push(a)
    far.delete(a)
    lastAnswer.delete(a)
    message(`${a.kind === 'pos' ? 'Penjaga' : 'Prajurit'} itu kini anak buahmu (${followers.length}/${MAX}).`, 2600)
  }

  function endTalk() {
    if (!talk) return
    if (!talk.a.follower && soldiers.alive(talk.a) && !duel) resume([{ a: talk.a, hunted: talk.hunted }])
    if (!duel) resume(talk.listeners)
    talk = null
    if (!duel) security.pause(false)
  }

  // ------------------------------------------------------------------ duel
  function startDuel(a) {
    const listeners = [...(talk ? talk.listeners : []), ...holdHunters(a, true)]
    talk = null
    const cx = (a.x + pp.x) / 2
    const cz = (a.z + pp.z) / 2
    const watchers = []
    // penonton: pemburu yang tadi berhenti + prajurit lain & anak buah di dekat gelanggang, berdiri
    // di lingkaran DUEL.ring m
    const crowd = [...listeners.map(l => l.a), ...soldiers.list.filter(s => s !== a && soldiers.alive(s) && !s.ride && !listeners.some(l => l.a === s) && Math.hypot(s.x - cx, s.z - cz) < LISTEN && (s.follower || s.state === 'ronda' || s.state === 'jaga' || s.state === 'kembali'))]
    crowd.forEach((s, i) => {
      const ang = Math.atan2(s.x - cx, s.z - cz) + (i % 2 ? 0.15 : -0.15)
      const r = DUEL.ring + (i % 3) * 0.7
      const l = listeners.find(o => o.a === s)
      watchers.push({ a: s, follower: s.follower, hunted: l ? l.hunted : false, duty: !l && !s.follower })
      soldiers.watch(s, { x: cx + Math.sin(ang) * r, z: cz + Math.cos(ang) * r, cx, cz })
    })
    duel = { a, cx, cz, watchers, t: 0 }
    soldiers.setDuel(a, true, DUEL.hp)
    soldiers.command(a, { do: 'serang', target: PLAYER })
    security.pause(true, DUEL.floor)
    say(a, 'Baik! Satu lawan satu. Kalau aku kalah, aku ikut denganmu. Kalau kau kalah, kau jadi anak buahku!', 3600)
    message('DUEL! Kalahkan dia tanpa bantuan. Yang kalah menjadi anak buah yang menang.', 3600)
  }

  // result: 'menang' | 'kalah' | 'lari'
  function endDuel(result) {
    const { a, watchers } = duel
    duel = null
    soldiers.setDuel(a, false)
    for (const w of watchers) {
      if (!soldiers.alive(w.a) && !w.follower) continue
      if (w.follower) soldiers.follow(w.a, followers.indexOf(w.a))
      else if (result !== 'kalah' && w.hunted && security.engaged) soldiers.command(w.a, { do: 'serang', target: PLAYER })
      else soldiers.release(w.a)
    }
    security.pause(false)
    if (result === 'menang') {
      soldiers.gesture(a, 'yes')
      say(a, pick(MENYERAH), 3200)
      join(a)
      message(`Kamu menang duel! Prajurit itu kini anak buahmu (${followers.length}/${MAX}).`, 3200)
    } else if (result === 'kalah') {
      // pemain menjadi anak buah si pemenang: menyerahkan upeti, urusan dianggap selesai
      player.stun(2.4)
      const upeti = Math.floor(bag.koin * UPETI)
      if (upeti > 0) {
        bag.bayar(upeti)
        shop.toast(`-${upeti}`)
      }
      boss.set(a, BOSS)
      soldiers.release(a)
      say(a, 'Kau kalah! Mulai sekarang kau anak buahku. Serahkan upetimu!', 3400)
      security.standDown(null, 25)
      message(upeti > 0
        ? `Kamu kalah duel dan menjadi anak buah prajurit itu: ${upeti} koin diserahkan sebagai upeti.`
        : 'Kamu kalah duel dan menjadi anak buah prajurit itu (tidak ada koin untuk upeti).', 4200)
    } else {
      say(a, pick(['Pengecut! Lari dari duel!', 'Hah! Kabur rupanya!']), 2600)
      if (security.engaged) soldiers.command(a, { do: 'serang', target: PLAYER })
      else soldiers.release(a)
      message('Kamu meninggalkan gelanggang — duel batal.', 2600)
    }
  }

  soldiers.onYield(a => {
    if (duel && duel.a === a) endDuel('menang')
  })

  // pukulan antara anak buah & prajurit kerajaan: yang dipukul membalas
  security.onSoldierStruck((attacker, victim) => {
    if (!soldiers.alive(victim)) return
    if (victim.follower && !attacker.follower) soldiers.setFoe(victim, { kind: 'prajurit', ref: attacker })
    else if (attacker.follower && !victim.follower && !victim.duel && (!security.isHunting(victim) || Math.random() < 0.5))
      soldiers.command(victim, { do: 'serang', target: { kind: 'prajurit', ref: attacker } })
  })

  // yang menolak & menunggu ditantang (tombol Duel)
  function rival() {
    if (!talk || !talk.answered || talk.yes || !free() || duel) return null
    return soldiers.alive(talk.a) && dist(talk.a) < 6 ? talk.a : null
  }

  // ------------------------------------------------------------------ anak buah
  const foes = [] // calon lawan anak buah: { target, x, z, n }
  const soldierTarget = new Map() // prajurit → sasaran tetap { kind: 'prajurit', ref }
  const orcTarget = new Map()
  const targetOf = s => {
    let t = soldierTarget.get(s)
    if (!t) soldierTarget.set(s, t = { kind: 'prajurit', ref: s })
    return t
  }
  function pickFoes() {
    foes.length = 0
    // prajurit yang memburu pemain atau menyerang anak buah, dekat pemain
    for (const s of soldiers.list) {
      if (!soldiers.alive(s) || s.follower || s.duel || dist(s) > FIGHT) continue
      const t = s.order?.target
      if (security.isHunting(s) || (s.state === 'serang' && t?.kind === 'prajurit' && t.ref.follower)) foes.push({ target: targetOf(s), x: s.x, z: s.z, n: 0 })
    }
    for (const o of enemies?.near?.(pp.x, pp.z, FIGHT) ?? []) {
      let t = orcTarget.get(o.id)
      if (!t) orcTarget.set(o.id, t = { kind: 'orc', id: o.id })
      foes.push({ target: t, x: o.x, z: o.z, n: 0 })
    }
    for (const f of followers) {
      if (!soldiers.alive(f) || f.state !== 'ikut') continue
      const cur = f.foe && foes.find(c => c.target === f.foe)
      if (cur) {
        cur.n++
        continue
      }
      // lawan terdekat yang paling sedikit dikeroyok
      let best = null
      let score = Infinity
      for (const c of foes) {
        const sc = Math.hypot(c.x - f.x, c.z - f.z) + c.n * 6
        if (sc < score) {
          score = sc
          best = c
        }
      }
      if (best) best.n++
      soldiers.setFoe(f, best ? best.target : null)
    }
  }

  // anak buah yang tertinggal jauh muncul di belakang pemain (di darat, tidak terhalang)
  function catchUp(f, dt) {
    if (dist(f) < CATCH_UP.far || player.swimming || player.riding || !player.grounded) {
      far.delete(f)
      return
    }
    const t = (far.get(f) || 0) + dt
    far.set(f, t)
    if (t < CATCH_UP.time) return
    const h = player.heading
    const k = followers.indexOf(f)
    for (let i = 0; i < 8; i++) {
      const back = 2.2 + Math.floor(k / 2) * 1.1 + i * 0.8
      const side = (k % 2 ? 1 : -1) * 0.8
      const x = pp.x - Math.sin(h) * back + Math.cos(h) * side
      const z = pp.z - Math.cos(h) * back - Math.sin(h) * side
      if (ground.surfaceAt(x, z) > -0.3 && colliders.isFree(x, z, 0.45)) {
        soldiers.place(f, x, z, h)
        far.delete(f)
        return
      }
    }
  }

  return {
    // prajurit yang bisa diajak sekarang (tombol Ajak) / yang menolak & menunggu ditantang (tombol Duel)
    get near() {
      return talk ? null : candidate()
    },
    get rival() {
      return rival()
    },
    get dueling() {
      return !!duel
    },
    followers,
    get max() {
      return MAX
    },
    // boleh dipukul pemain: bukan anak buahnya; selama duel hanya lawannya
    canHit: a => !a.follower && (!duel || a === duel.a),
    inDuel: a => !!duel && duel.a === a,
    invite() {
      const a = candidate()
      if (!a) {
        if (followers.length >= MAX) message(`Anak buahmu sudah ${MAX} orang.`, 2200)
        return false
      }
      if ((boss.get(a) || 0) > 0) {
        say(a, 'Kau anak buahku sekarang! Jangan perintah aku.', 2600)
        return false
      }
      endTalk()
      player.face(a.x, a.z)
      sayMe(pick(AJAK))
      const prev = lastAnswer.get(a)
      if (prev && !prev.yes && clock - prev.t < 60) {
        // baru saja menolak: langsung menolak lagi tanpa berhenti (tidak bisa dipakai untuk mengulur)
        soldiers.gesture(a, 'no')
        say(a, 'Sudah kubilang tidak! Kalau berani, lawan aku!', 2600)
        talk = { a, t: ANSWER, answered: true, yes: false, hunted: false, listeners: [], quick: true }
        return true
      }
      let yes = Math.random() < willing(a)
      if (forced !== null) {
        yes = forced
        forced = null
      }
      lastAnswer.set(a, { yes, t: clock })
      security.pause(true)
      talk = { a, t: 0, answered: false, yes, hunted: security.isHunting(a), listeners: holdHunters(a) }
      soldiers.listen(a)
      return true
    },
    challenge() {
      const a = rival()
      if (!a) return false
      if (player.hp < DUEL.floor + 15) {
        message('Nyawamu terlalu sedikit untuk berduel. Pulihkan dulu.', 2400)
        return false
      }
      startDuel(a)
      return true
    },
    // untuk pengujian: jawaban berikutnya pasti mau (true) / pasti menolak (false) / acak (null)
    forceAnswer(yes) {
      forced = yes
    },
    update(dt) {
      clock += dt
      for (const [a, t] of boss) if (t - dt <= 0) boss.delete(a)
      else boss.set(a, t - dt)
      // anak buah yang bukan lagi anak buah (mis. pengujian mengembalikan semua prajurit) dilepas
      for (let i = followers.length - 1; i >= 0; i--) if (!followers[i].follower) followers.splice(i, 1)
      followers.forEach((f, i) => {
        f.barisan = i
      })
      if (talk) {
        const { a } = talk
        talk.t += dt
        if (!soldiers.alive(a) || player.defeated || dist(a) > 9) endTalk()
        else if (!talk.answered && talk.t > ANSWER) {
          talk.answered = true
          if (talk.yes) {
            soldiers.gesture(a, 'yes')
            say(a, pick(MAU), 2800)
            join(a)
            const rest = talk.listeners
            talk = null
            resume(rest)
            security.pause(false)
          } else {
            soldiers.gesture(a, 'no')
            say(a, pick(TOLAK), 3000)
            message('Dia menolak. Tantang duel? Yang kalah menjadi anak buah yang menang.', 3200)
          }
        } else if (talk.answered && talk.t > ANSWER + WAIT) {
          if (!talk.quick) say(a, 'Pergilah, sebelum aku berubah pikiran!', 2200)
          endTalk()
        }
      }
      if (duel) {
        const { a } = duel
        duel.t += dt
        a.barT = 99
        if (!soldiers.alive(a)) endDuel('lari')
        else if (player.hp <= DUEL.floor + 0.01 || player.defeated) endDuel('kalah')
        else if (player.swimming || player.riding || Math.hypot(pp.x - duel.cx, pp.z - duel.cz) > DUEL.leave) endDuel('lari')
      }
      if ((foeT -= dt) <= 0) {
        foeT = 0.3
        if (!duel) pickFoes()
      }
      for (const f of followers) if (soldiers.alive(f)) catchUp(f, dt)
    },
    stats: () => ({
      anakBuah: followers.length,
      duel: duel ? { lawan: duel.a.id, nyawa: +duel.a.hp.toFixed(1), penonton: duel.watchers.length } : null,
      bicara: talk ? { prajurit: talk.a.id, dijawab: talk.answered, mau: talk.yes } : null,
    }),
  }
}
