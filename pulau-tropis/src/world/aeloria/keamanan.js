import { CITADEL, BRIDGES } from './layout.js'

// Penjagaan Aeloria. Kota bebas & kawasan kesatria adalah zona damai (DECISIONS #49): pemain boleh
// berjalan, berbelanja, dan menonton tanpa diganggu.
// - PEMAIN MEMBUAT RUSUH (memukul elf mana pun) → MUSUH KERAJAAN selama BURON detik sejak kerusuhan
//   terakhir: kesatria di dekatnya langsung melawan (paling banyak MAX_ATK sekaligus, sisanya
//   mengepung & menggantikan yang roboh), dan kesatria yang melihatnya selama ia buron ikut
//   menyerang. Warga biasa di sekitar kerusuhan kabur — yang pemberani ikut berkelahi.
//   PEDAGANG TETAP NETRAL (DECISIONS #50): tidak kabur, tidak menyerang, dan tetap berdagang dengan
//   pemain walaupun ia musuh kerajaan.
// - Semua itu hanya di WILAYAH AELORIA (utara tengah Jembatan Perak): kesatria tidak memburu pemain
//   keluar kerajaan — mereka berhenti di perbatasan, dan pemain yang dibangunkan di ujung selatan
//   jembatan aman dari kesatria yang sedang berjalan-jalan sampai ke sana.
// - BENTENG AELORIA: satu-satunya wilayah terlarang — penjaganya menyerang siapa pun yang masuk;
//   keluar dari benteng = berhenti dikejar (bila tidak sedang buron).
// - KERIBUTAN WARGA: sesekali dua elf pemarah berkelahi di dekat pemain, elf lain berkerumun
//   menonton, lalu kesatria terdekat datang melerai (bila tidak ada, yang kalah jatuh dan bubar).
// Tidak ada elf yang mati: yang roboh pingsan sebentar, lalu bangun dan kembali ke kegiatannya.
// Badan & jadwal elf ada di kehidupan.js; modul ini mengambil alih elf yang terlibat (grab), lalu
// mengembalikannya (free).

const MAX_ATK = 4 // penyerang sekaligus
const MAX_RING = 6 // pengepung (menjaga jarak, menggantikan penyerang yang roboh)
const JOIN = 32 // m: kesatria sejauh ini ikut melawan saat kerusuhan pecah
const SEE = 22 // m: buronan yang terlihat kesatria sedekat ini diserang lagi
const GUARD = 45 // m: penjaga benteng sejauh ini menyerang penyusup
const BURON = 240 // detik pemain dimusuhi sejak kerusuhan terakhir
const LOST = { range: 30, time: 8 } // lolos: tak ada penyerang sedekat ini selama sekian detik
const LEASH = 70 // m: penyerang yang tertinggal sejauh ini menyerah
const SCARE = 16 // m: warga sedekat ini dari kerusuhan kabur (yang pemberani melawan)
const DOWN = [20, 35] // detik pingsan
const HP = { kesatria: 8, penduduk: 4 }
const GAYA = {
  pedang: { reach: 1.45, damage: 5, cd: [1.6, 2.4] },
  tombak: { reach: 1.9, damage: 4, cd: [1.7, 2.5] },
  tinju: { reach: 1.1, damage: 2, cd: [1.1, 1.7] },
}
const ATTACK = { hit: 0.32, dur: 0.75 }
const SPEED = { kejar: 4.1, dekati: 2.4, kabur: 4.0, jalan: 1.6 }
const RUN_ANIM = 4.0 // m/s yang cocok dengan klip run (kehidupan.js)
const WALK_ANIM = 1.4
const RADIUS = 0.35
// perbatasan: tengah Jembatan Perak (z). Utaranya wilayah Aeloria, selatannya Pulau Tropis
const PERAK = BRIDGES.find(b => b.id === 'perak')
const BORDER_Z = (PERAK.from + PERAK.to) / 2
const inLand = z => z < BORDER_Z
const BRAWL = { first: [35, 60], every: [70, 140], knightAfter: [6, 9], alone: 16, watchers: 6 }
// kegiatan tenang: elf yang sedang begini boleh terseret keributan / menontonnya
const CALM = new Set(['ngobrol', 'lihat', 'santai', 'duduk', 'api', 'nonton', 'kedai', 'jalan', 'belanja', 'sumur', 'main'])

const SERU = {
  rusuh: ['Pembuat onar! Tangkap dia!', 'Atas nama Raja Aeloria, menyerahlah!', 'Berani-beraninya membuat rusuh di sini!'],
  lihat: ['Itu buronan Aeloria! Serang!', 'Dia yang membuat rusuh tadi!'],
  benteng: ['Penyusup di benteng! Usir dia!', 'Benteng ini terlarang! Pergi!'],
  balas: ['Aduh! Kurang ajar!', 'Rasakan balasanku!'],
  kabur: ['Tolong! Ada yang mengamuk!', 'Lari! Lari!', 'Aaah!'],
  berani: ['Beraninya kau memukul tetanggaku!', 'Aku tidak takut padamu!'],
  pedagang: ['Aku cuma pedagang, jangan libatkan aku!', 'Ribut boleh, asal jangan rusak daganganku!', 'Aku tetap berdagang dengan siapa saja.'],
  adu: ['Apa katamu tadi?!', 'Rasakan ini!', 'Kau curang main dadu!', 'Jangan sentuh rotiku!'],
  sorak: ['Ayo! Ayo!', 'Hajar!', 'Wah, seru!', 'Sudah, sudah!'],
  lerai: ['Hentikan! Tidak ada perkelahian di Aeloria!', 'Bubar! Bubar semuanya!'],
  datang: ['Hei! Apa-apaan ini?!', 'Ada keributan di sana!'],
  maaf: ['Maaf, Tuan Kesatria…', 'Baik, baik… kami berhenti.'],
  menang: ['Rasakan itu!', 'Hmph. Jangan ulangi lagi.'],
}

const pick = list => list[Math.floor(Math.random() * list.length)]
const between = (a, b) => a + (b - a) * Math.random()
const turn = (h, want, k) => h + Math.atan2(Math.sin(want - h), Math.cos(want - h)) * k

// life = createLife (kehidupan.js); player; bubbles = gelembung ucapan; message(teks, ms);
// nav = navgrid (jalur memutar); colliders; ground
export function createElfSecurity({ life, player, bubbles, message, nav, colliders, ground }) {
  const S = { wanted: false, buron: 0, trespass: false, lostT: 0, scanT: 0, grace: 0, riots: 0, out: true }
  const attackers = new Set()
  const ring = new Set()
  const fleeing = new Set()
  let brawl = null
  let brawlT = between(...BRAWL.first)
  let brawls = 0
  let pathBudget = 0
  const pp = player.position
  const tmpVel = { x: 0, z: 0 }

  const say = (a, text, ms = 2400) => bubbles.say(() => (a.hidden ? null : { x: a.x, y: a.y + 2.25 * a.scale, z: a.z }), text, ms, `elf${a.id}`)
  const dist = a => Math.hypot(a.x - pp.x, a.z - pp.z)
  const busy = a => a.phase === 'tempur' || a.down
  const merchant = a => a.job === 'pedagang'
  const fighter = a => a.kind === 'kesatria' && a.weapon !== 'busur'
  const inCitadel = (x, z, m = 0) => x > CITADEL.x0 - m && x < CITADEL.x1 + m && z > CITADEL.z0 - m && z < CITADEL.z1 + m
  const hostile = () => !player.defeated && (S.trespass || (S.wanted && S.grace <= 0 && inLand(pp.z)))

  // ---------------------------------------------------------------- ambil alih & kembalikan
  function enlist(a, set, alasan) {
    life.grab(a, 'lawan')
    life.mode(a, 'lawan', 'siaga')
    a.hp = HP[a.kind] ?? 4
    a.weap = a.kind === 'kesatria' && a.weapon !== 'busur' ? a.weapon : 'tinju'
    a.atk = null
    a.atkCd = between(0.3, 1.2)
    a.stagger = 0
    a.kx = 0
    a.kz = 0
    a.path = null
    a.navT = 0
    a.goalX = a.x
    a.goalZ = a.z
    a.animT = 0
    a.spd = 0
    a.ringAng = Math.random() * Math.PI * 2
    a.startled = false
    a.alasan = alasan
    set.add(a)
  }
  function dismiss(a) {
    attackers.delete(a)
    ring.delete(a)
    fleeing.delete(a)
    if (a.phase === 'tempur' && !a.down) life.free(a)
  }
  function standDown() {
    for (const a of [...attackers, ...ring]) dismiss(a)
    S.lostT = 0
  }
  function fell(a) {
    attackers.delete(a)
    ring.delete(a)
    fleeing.delete(a)
    life.knockDown(a, between(...DOWN))
  }

  // ---------------------------------------------------------------- gerak bebas (seperti prajurit Kencana)
  function moveToward(a, tx, tz, speed, near, dt) {
    const dx = tx - a.x
    const dz = tz - a.z
    const d = Math.hypot(dx, dz)
    if (d <= near) {
      a.path = null
      a.spd = 0
      return true
    }
    a.navT -= dt
    if (a.navT <= 0) {
      a.navT = 0.6 + Math.random() * 0.4
      const goalMoved = Math.hypot(a.goalX - tx, a.goalZ - tz) > 3
      if (d < 5 || nav.lineClear(a.x, a.z, tx, tz)) a.path = null
      else if ((!a.path || goalMoved) && pathBudget > 0) {
        pathBudget--
        a.path = nav.findPath({ x: a.x, z: a.z }, { x: tx, z: tz })
        a.goalX = tx
        a.goalZ = tz
        if (!a.path) a.navT = 2
      }
    }
    let wx = tx
    let wz = tz
    if (a.path) {
      while (a.path.length > 1 && Math.hypot(a.path[0].x - a.x, a.path[0].z - a.z) < 0.8) a.path.shift()
      if (a.path.length) {
        wx = a.path[0].x
        wz = a.path[0].z
      }
    }
    const ux = wx - a.x
    const uz = wz - a.z
    const ul = Math.hypot(ux, uz) || 1
    const step = Math.min(speed * dt, Math.max(0, d - near) + 0.01)
    const nx = a.x + (ux / ul) * step
    const nz = a.z + (uz / ul) * step
    if (ground.surfaceAt(nx, nz) > -0.6) {
      a.x = nx
      a.z = nz
    }
    a.heading = turn(a.heading, Math.atan2(ux, uz), Math.min(1, dt * 9))
    a.spd = speed
    a.animT += (dt * speed) / (speed > 2.6 ? RUN_ANIM : WALK_ANIM)
    return false
  }
  const face = (a, x, z, dt, k = 8) => {
    a.heading = turn(a.heading, Math.atan2(x - a.x, z - a.z), Math.min(1, dt * k))
  }
  // terdorong (pukulan) — pelan-pelan berhenti
  function knockback(a, dt) {
    if (!a.kx && !a.kz) return
    const nx = a.x + a.kx * dt
    const nz = a.z + a.kz * dt
    if (ground.surfaceAt(nx, nz) > -0.6) {
      a.x = nx
      a.z = nz
    }
    const f = Math.exp(-7 * dt)
    a.kx *= f
    a.kz *= f
    if (Math.abs(a.kx) + Math.abs(a.kz) < 0.05) a.kx = a.kz = 0
  }

  // ---------------------------------------------------------------- kerusuhan oleh pemain
  // kesatria terdekat yang bebas ikut melawan (yang pertama berseru `shout`, bila ada)
  function recruit(radius, shout) {
    const cands = life.around(pp.x, pp.z, radius).filter(a => fighter(a) && !busy(a) && !a.hidden)
    cands.sort((a, b) => dist(a) - dist(b))
    let first = true
    for (const a of cands) {
      if (attackers.size < MAX_ATK) enlist(a, attackers, S.trespass && !S.wanted ? 'mengusir penyusup benteng' : 'melawan pembuat onar')
      else if (ring.size < MAX_RING) enlist(a, ring, 'mengepung pembuat onar')
      else break
      if (first && shout) say(a, pick(SERU[shout]))
      first = false
    }
  }
  // warga di sekitar kerusuhan: kabur, yang pemberani melawan; pedagang tetap di kiosnya
  function scare(radius) {
    let brave = 0
    let fled = 0
    for (const a of life.around(pp.x, pp.z, radius)) {
      if (busy(a) || a.hidden || a.kind === 'kesatria') continue
      if (merchant(a)) {
        if (Math.random() < 0.3) say(a, pick(SERU.pedagang))
        continue
      }
      if (a.kind === 'penduduk' && a.sifat.pemberani > 0.68 && brave < 2) {
        enlist(a, attackers, 'melawan pembuat onar')
        say(a, pick(SERU.berani))
        brave++
      } else if (fled < 10) {
        flee(a)
        fled++
      }
    }
  }
  function flee(a) {
    life.grab(a, 'kabur')
    a.fleeT = between(5, 9)
    const dx = a.x - pp.x
    const dz = a.z - pp.z
    const d = Math.hypot(dx, dz) || 1
    a.fx = dx / d
    a.fz = dz / d
    a.animT = 0
    a.spd = SPEED.kabur * (a.kind === 'anak' ? 0.85 : 1)
    a.alasan = 'kabur dari keributan'
    fleeing.add(a)
    if (Math.random() < 0.35) say(a, pick(SERU.kabur), 1800)
  }
  function riot() {
    if (brawl) endBrawl()
    const first = !S.wanted
    S.wanted = true
    S.buron = BURON
    S.grace = 0
    S.lostT = 0
    if (first) {
      S.riots++
      message('Kamu membuat rusuh di Aeloria! Kini kamu musuh kerajaan — kesatria akan melawanmu. Pedagang tetap netral dan mau berdagang denganmu.', 5200)
    }
    recruit(JOIN, first ? 'rusuh' : null)
    scare(SCARE)
  }

  // pukulan pemain mengenai elf `a`
  function struck(a, damage, knock, from) {
    if (fleeing.has(a)) {
      fleeing.delete(a)
      enlist(a, ring, 'dipukul pembuat onar')
      a.startled = true
    } else if (!attackers.has(a) && !ring.has(a)) {
      if (fighter(a)) enlist(a, attackers, 'melawan pembuat onar')
      else if (merchant(a)) enlist(a, ring, 'dipukul pembuat onar') // hanya terhuyung, lalu kembali ke kios
      else if (a.kind === 'penduduk' && a.sifat.pemberani > 0.5) enlist(a, attackers, 'melawan pembuat onar')
      else enlist(a, ring, 'dipukul pembuat onar')
      if (!merchant(a)) say(a, pick(SERU.balas), 1800)
      else say(a, pick(SERU.pedagang))
      a.startled = !attackers.has(a) // terhuyung lalu kabur / kembali berjualan
    } else if (ring.has(a) && fighter(a)) {
      // pengepung yang dipukul langsung balas menyerang
      ring.delete(a)
      attackers.add(a)
    }
    a.hp -= damage
    a.stagger = 0.4
    const dx = a.x - from.x
    const dz = a.z - from.z
    const d = Math.hypot(dx, dz) || 1
    a.kx = (dx / d) * knock * 0.8
    a.kz = (dz / d) * knock * 0.8
    a.atk = null
    life.mode(a, 'lawan', 'kena', true)
    if (a.hp <= 0) fell(a)
  }

  // ---------------------------------------------------------------- tiap bingkai
  // terhuyung setelah dipukul; true = bingkai ini habis untuk terhuyung. Pedagang & warga penakut
  // yang dipukul: setelah terhuyung kembali berjualan / kabur
  function staggered(a, dt) {
    if (a.stagger <= 0) return false
    a.stagger -= dt
    if (a.stagger > 0) return true
    if (a.startled) {
      attackers.delete(a)
      ring.delete(a)
      if (merchant(a)) life.free(a)
      else flee(a)
      return true
    }
    life.mode(a, 'lawan', 'siaga')
    return true
  }
  // pemain sudah keluar kerajaan & kesatria ini sampai di perbatasan → berhenti mengejar
  const atBorder = a => !inLand(pp.z) && a.z > BORDER_Z - 6
  function stepAttacker(a, dt) {
    if (a.down || a.phase !== 'tempur') {
      attackers.delete(a)
      return
    }
    const d = dist(a)
    if (d > LEASH || atBorder(a)) {
      dismiss(a)
      return
    }
    knockback(a, dt)
    if (staggered(a, dt)) return
    a.atkCd -= dt
    const G = GAYA[a.weap]
    if (a.atk) {
      const { atk } = a
      face(a, pp.x, pp.z, dt, 10)
      atk.t += dt
      if (!atk.hit && atk.t >= ATTACK.hit) {
        atk.hit = true
        if (d <= G.reach + 0.5 && !player.defeated) player.damage(G.damage, a)
      }
      if (atk.t >= ATTACK.dur && a.atk === atk) {
        a.atk = null
        life.mode(a, 'lawan', 'siaga')
      }
      return
    }
    const want = G.reach * 0.8
    if (d > want + 0.15) {
      moveToward(a, pp.x, pp.z, d > 6 ? SPEED.kejar : SPEED.dekati, want, dt)
      life.mode(a, 'lawan', 'kejar')
    } else {
      face(a, pp.x, pp.z, dt, 10)
      a.spd = 0
      if (a.atkCd <= 0 && !player.defeated) {
        a.atk = { t: 0, hit: false }
        a.atkCd = between(...G.cd)
        a.jurus = pick(['punch', 'punch2', 'kick'])
        life.mode(a, 'lawan', 'serang', true)
      } else life.mode(a, 'lawan', 'siaga')
    }
  }
  function stepRing(a, dt) {
    if (a.down || a.phase !== 'tempur') {
      ring.delete(a)
      return
    }
    knockback(a, dt)
    if (staggered(a, dt)) return
    if (dist(a) > LEASH || atBorder(a)) {
      dismiss(a)
      return
    }
    const r = 5.5
    const tx = pp.x + Math.sin(a.ringAng) * r
    const tz = pp.z + Math.cos(a.ringAng) * r
    if (moveToward(a, tx, tz, dist(a) > 9 ? SPEED.kejar : SPEED.dekati, 0.6, dt)) {
      face(a, pp.x, pp.z, dt)
      life.mode(a, 'lawan', 'siaga')
    } else life.mode(a, 'lawan', 'kejar')
  }
  function stepFlee(a, dt) {
    a.fleeT -= dt
    if (a.fleeT <= 0 || a.down || a.phase !== 'tempur') {
      dismiss(a)
      return
    }
    const dx = a.x - pp.x
    const dz = a.z - pp.z
    const d = Math.hypot(dx, dz) || 1
    let vx = a.fx * 0.6 + (dx / d) * 0.4
    let vz = a.fz * 0.6 + (dz / d) * 0.4
    const vl = Math.hypot(vx, vz) || 1
    vx /= vl
    vz /= vl
    const nx = a.x + vx * a.spd * dt
    const nz = a.z + vz * a.spd * dt
    if (!colliders.isFree(nx, nz, RADIUS) || ground.surfaceAt(nx, nz) < 0.2) {
      // terhalang: belok
      const ang = (Math.random() < 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.8)
      const c = Math.cos(ang)
      const s = Math.sin(ang)
      ;[a.fx, a.fz] = [a.fx * c - a.fz * s, a.fx * s + a.fz * c]
      return
    }
    a.x = nx
    a.z = nz
    a.heading = turn(a.heading, Math.atan2(vx, vz), Math.min(1, dt * 10))
    a.animT += (dt * a.spd) / RUN_ANIM
  }

  // ---------------------------------------------------------------- keributan warga
  function startBrawl() {
    const pool = life.near.filter(a => !busy(a) && !a.hidden && a.kind !== 'anak' && !merchant(a) && CALM.has(a.act) && dist(a) > 7 && dist(a) < 32)
    if (pool.length < 4) return false
    pool.sort((p, q) => q.sifat.pemarah - p.sifat.pemarah)
    const A = pool[0]
    const B = pool.find(b => b !== A && Math.hypot(b.x - A.x, b.z - A.z) < 9)
    if (!B) return false
    const cx = (A.x + B.x) / 2
    const cz = (A.z + B.z) / 2
    if (!colliders.isFree(cx, cz, 1.2)) return false
    const ang = Math.atan2(B.x - A.x, B.z - A.z)
    const spots = [-1, 1].map(s => ({ x: cx + Math.sin(ang) * 0.6 * s, z: cz + Math.cos(ang) * 0.6 * s }))
    for (const [k, p] of [A, B].entries()) {
      enlist(p, new Set(), 'berkelahi dengan sesama elf')
      p.weap = 'tinju'
      p.spot = spots[k]
    }
    const watchers = []
    for (const w of life.around(cx, cz, 14)) {
      if (watchers.length >= BRAWL.watchers) break
      if (w === A || w === B || busy(w) || w.hidden || merchant(w) || !CALM.has(w.act)) continue
      life.grab(w, 'sorak')
      w.alasan = 'menonton perkelahian'
      const wa = Math.atan2(w.x - cx, w.z - cz)
      const wr = between(3.4, 4.4)
      w.spot = { x: cx + Math.sin(wa) * wr, z: cz + Math.cos(wa) * wr }
      w.navT = 0
      w.path = null
      w.goalX = w.x
      w.goalZ = w.z
      w.animT = 0
      watchers.push(w)
    }
    brawl = { A, B, cx, cz, t: 0, n: 0, swapT: 1.2, hitT: 0, def: null, knight: null, knightAt: between(...BRAWL.knightAfter), phase: 'adu', leraiT: 0, sorry: false, watchers, endT: 0 }
    brawls++
    say(A, pick(SERU.adu))
    return true
  }
  function endBrawl() {
    const b = brawl
    brawl = null
    brawlT = between(...BRAWL.every)
    for (const a of [b.A, b.B, b.knight, ...b.watchers]) if (a && a.phase === 'tempur' && !a.down) life.free(a)
  }
  function stepBrawl(dt) {
    const b = brawl
    b.t += dt
    const { A, B } = b
    const gone = p => p.down || p.phase !== 'tempur'
    if (Math.hypot(b.cx - pp.x, b.cz - pp.z) > 80 || (gone(A) && gone(B))) {
      endBrawl()
      return
    }
    // ke tempat masing-masing, lalu saling berhadapan
    for (const [p, o] of [[A, B], [B, A]]) {
      if (gone(p)) continue
      if (!moveToward(p, p.spot.x, p.spot.z, SPEED.jalan, 0.15, dt)) {
        if (p.gaya !== 'serang' && p.gaya !== 'kena') life.mode(p, 'lawan', 'kejar')
      } else {
        face(p, o.x, o.z, dt, 9)
        if (p.gaya === 'kejar' || (p.gaya === 'serang' && (p.backT -= dt) <= 0)) life.mode(p, 'lawan', 'siaga')
      }
    }
    for (const w of b.watchers) {
      if (w.phase !== 'tempur' || w.down) continue
      if (!moveToward(w, w.spot.x, w.spot.z, SPEED.jalan, 0.2, dt)) life.mode(w, 'lawan', 'kejar')
      else {
        face(w, b.cx, b.cz, dt, 6)
        life.mode(w, 'sorak')
        if (Math.random() < dt * 0.08) say(w, pick(SERU.sorak), 1600)
      }
    }
    if (b.phase === 'adu') {
      // bergantian memukul; yang dipukul terhuyung
      b.swapT -= dt
      if (b.swapT <= 0 && !gone(A) && !gone(B)) {
        const att = b.n % 2 ? B : A
        b.def = att === A ? B : A
        att.jurus = pick(['punch', 'punch2', 'kick'])
        att.backT = 0.7
        life.mode(att, 'lawan', 'serang', true)
        b.hitT = 0.32
        b.n++
        b.swapT = between(0.9, 1.4)
        if (Math.random() < 0.25) say(att, pick(SERU.adu), 1600)
      }
      if (b.hitT > 0 && (b.hitT -= dt) <= 0 && b.def && !gone(b.def)) life.mode(b.def, 'lawan', 'kena', true)
      // kesatria terdekat datang melerai
      if (!b.knight && b.t > b.knightAt) {
        const k = life.around(b.cx, b.cz, 60).filter(a => a.kind === 'kesatria' && !busy(a) && !a.hidden).sort((p, q) => Math.hypot(p.x - b.cx, p.z - b.cz) - Math.hypot(q.x - b.cx, q.z - b.cz))[0]
        if (k) {
          enlist(k, new Set(), 'melerai perkelahian')
          b.knight = k
          say(k, pick(SERU.datang))
        }
        b.knightAt = b.t + 4 // belum ada: coba lagi nanti
      }
      const k = b.knight
      if (k && !gone(k)) {
        const arrived = moveToward(k, b.cx, b.cz, SPEED.kejar, 1.8, dt)
        if (!arrived) life.mode(k, 'lawan', 'kejar')
        else {
          b.phase = 'lerai'
          life.mode(k, 'lawan', 'lerai')
          say(k, pick(SERU.lerai))
          for (const p of [A, B]) if (!gone(p)) life.mode(p, 'lawan', 'siaga')
        }
      } else if (b.t > BRAWL.alone) {
        // tak ada yang melerai: yang kalah jatuh, lalu bubar
        const loser = Math.random() < 0.5 ? A : B
        const winner = loser === A ? B : A
        if (!gone(loser)) life.knockDown(loser, between(6, 10))
        if (!gone(winner)) say(winner, pick(SERU.menang))
        b.phase = 'bubar'
      }
    } else if (b.phase === 'lerai') {
      b.leraiT += dt
      const k = b.knight
      if (k && !gone(k)) face(k, b.cx, b.cz, dt, 6)
      if (b.leraiT > 1.6 && !b.sorry) {
        b.sorry = true
        const p = gone(A) ? B : A
        if (!gone(p)) say(p, pick(SERU.maaf))
      }
      if (b.leraiT > 3.6) endBrawl()
    } else if ((b.endT += dt) > 2.5) endBrawl()
  }

  // ---------------------------------------------------------------- tabrakan
  function separate() {
    const list = [...attackers, ...ring]
    if (brawl) list.push(brawl.A, brawl.B, ...(brawl.knight ? [brawl.knight] : []), ...brawl.watchers)
    for (const a of list) {
      if (a.phase !== 'tempur' || a.down) continue
      for (const b of list) {
        if (b === a || b.phase !== 'tempur' || b.down) continue
        const dx = a.x - b.x
        const dz = a.z - b.z
        const d2 = dx * dx + dz * dz
        if (d2 > 0.49 || d2 < 1e-8) continue
        const d = Math.sqrt(d2)
        a.x += (dx / d) * (0.7 - d) * 0.5
        a.z += (dz / d) * (0.7 - d) * 0.5
      }
      const px = a.x - pp.x
      const pz = a.z - pp.z
      const pd = Math.hypot(px, pz)
      if (pd < 0.72 && pd > 1e-4) {
        a.x = pp.x + (px / pd) * 0.72
        a.z = pp.z + (pz / pd) * 0.72
      }
      tmpVel.x = tmpVel.z = 0
      colliders.resolve(a, RADIUS, tmpVel)
    }
    for (const a of list) if (a.phase === 'tempur') life.place(a, a.x, a.z)
    for (const a of fleeing) life.place(a, a.x, a.z)
  }

  function update(dt) {
    pathBudget = 2
    if (S.grace > 0) S.grace -= dt
    // Benteng Aeloria: wilayah terlarang
    const inside = inCitadel(pp.x, pp.z)
    if (inside && !S.trespass && !player.defeated) {
      S.trespass = true
      message('Benteng Aeloria adalah wilayah terlarang! Para penjaga menyerangmu — keluarlah dari benteng.', 4200)
      recruit(GUARD, 'benteng')
    } else if (S.trespass && !inCitadel(pp.x, pp.z, 25)) {
      S.trespass = false
      if (!S.wanted) {
        standDown()
        message('Kamu sudah keluar dari Benteng Aeloria. Para penjaga kembali ke posnya.', 3000)
      }
    }
    // buronan: kesatria yang melihatnya ikut menyerang; lolos / dimaafkan
    // buron yang keluar kerajaan: tidak dikejar lagi (sekali pesan tiap keluar; bangun setelah kalah
    // tidak dihitung — pesan kekalahan sudah menjelaskannya)
    if (!player.defeated) {
      const out = !inLand(pp.z)
      if (S.wanted && out && !S.out) message(`Kamu keluar dari wilayah Aeloria — kesatria berhenti di perbatasan. Kamu masih buronan bila kembali (±${Math.ceil(S.buron / 60)} menit).`, 4200)
      S.out = out
    }
    if (S.wanted) {
      S.buron -= dt
      if (S.buron <= 0) {
        S.wanted = false
        if (!S.trespass) standDown()
        message('Kerusuhanmu sudah dimaafkan. Aeloria kembali damai untukmu.', 3600)
      } else if (attackers.size) {
        const near = [...attackers].some(a => dist(a) < LOST.range)
        S.lostT = near ? 0 : S.lostT + dt
        if (S.lostT > LOST.time) {
          standDown()
          S.grace = 6
          message(`Kamu lolos dari kejaran kesatria — tetapi masih buronan Aeloria (±${Math.ceil(S.buron / 60)} menit lagi).`, 3800)
        }
      }
    }
    S.scanT -= dt
    if (S.scanT <= 0) {
      S.scanT = 0.5
      if (hostile()) {
        // pengepung terdekat maju menggantikan penyerang yang roboh, lalu kesatria baru ikut
        while (attackers.size < MAX_ATK && ring.size) {
          const a = [...ring].filter(r => !r.startled).sort((p, q) => dist(p) - dist(q))[0]
          if (!a) break
          ring.delete(a)
          attackers.add(a)
        }
        if (attackers.size < MAX_ATK) recruit(S.trespass ? GUARD : SEE, attackers.size ? null : S.trespass ? 'benteng' : 'lihat')
      } else if (!S.wanted && !S.trespass && (attackers.size || ring.size)) standDown()
    }
    for (const a of attackers) stepAttacker(a, dt)
    for (const a of ring) stepRing(a, dt)
    for (const a of fleeing) stepFlee(a, dt)
    // keributan warga: hanya saat damai, di dekat pemain
    if (brawl) stepBrawl(dt)
    else if (!S.wanted && !S.trespass && !player.defeated && (brawlT -= dt) <= 0 && !startBrawl()) brawlT = 8 // belum ada yang cocok: coba lagi sebentar lagi
    separate()
  }

  return {
    update,
    // pukulan pemain: elf di dalam lingkaran (x, z, r) terkena; anak-anak tidak pernah terkena.
    // Hasil: letak elf yang terkena (untuk efek pukulan)
    hit(shape, damage, knock, from) {
      const victims = life.around(shape.x, shape.z, shape.r + 0.45).filter(a => a.kind !== 'anak' && !a.down && !a.hidden)
      if (!victims.length) return []
      if (brawl) endBrawl() // pemain ikut campur: keributan bubar, yang dipukul melawan pemain
      for (const a of victims) struck(a, damage, knock, from)
      riot()
      return victims.map(a => ({ x: a.x, y: a.y, z: a.z }))
    },
    // sasaran jurus Penggal: hanya elf yang sedang melawan pemain
    targets(x, z, range) {
      const out = []
      for (const a of [...attackers, ...ring]) if (!a.down && !a.startled && Math.hypot(a.x - x, a.z - z) <= range) out.push({ id: `e${a.id}`, x: a.x, z: a.z })
      return out
    },
    position(id) {
      const a = life.agents[Number(id.slice(1))]
      return a && a.phase === 'tempur' && !a.down ? { x: a.x, z: a.z } : null
    },
    // Penggal mengenai elf: roboh (tidak dipenggal); hasil letaknya untuk efek
    fell(id) {
      const a = life.agents[Number(id.slice(1))]
      if (!a || a.down || a.phase !== 'tempur') return null
      fell(a)
      riot()
      return { x: a.x, y: a.y, z: a.z }
    },
    // pemain roboh: bila dikalahkan kesatria, mereka berhenti dan pemain dibawa ke luar kerajaan
    playerDefeated() {
      const byElves = [...attackers].some(a => dist(a) < 12)
      standDown()
      S.trespass = false
      S.out = true // dibangunkan di luar wilayah Aeloria
      if (byElves) S.grace = 20
      return byElves
    },
    get wanted() {
      return S.wanted
    },
    get trespass() {
      return S.trespass
    },
    // pengujian: keadaan & keributan paksa
    stats: () => ({
      buron: S.wanted ? Math.ceil(S.buron) : 0, benteng: S.trespass, penyerang: attackers.size, pengepung: ring.size, kabur: fleeing.size,
      keributan: brawl ? { fase: brawl.phase, detik: Math.round(brawl.t), penonton: brawl.watchers.length, pelerai: !!brawl.knight } : null,
      jumlahKeributan: brawls, kerusuhan: S.riots,
    }),
    startBrawl: () => !brawl && startBrawl(),
    forgive() {
      S.wanted = false
      S.buron = 0
      S.trespass = false
      standDown()
    },
  }
}
