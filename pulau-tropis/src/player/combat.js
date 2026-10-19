// Gerakan serang prajurit — semuanya memakai animasi bawaan model Kenney:
// - Tombol Pukul = kombo yang berganti setiap ditekan: tebasan pedang → tinju kiri → tendangan,
//   lalu kembali ke tebasan (mulai lagi dari tebasan bila jeda lebih dari COMBO_WINDOW).
// - Empat jurus dengan jeda pakai (cooldown):
//   1. Cincang — 10 cincangan beruntun ke depan sambil maju pelan.
//   2. Hentak  — melompat, lalu menghentak turun sambil menancapkan pedang ke tanah: gelombang kejut.
//   3. Putar   — 3 cincangan lalu berputar satu kali, mengenai semua di sekeliling.
//   4. Penggal — membidik leher maks. 5 musuh terdekat, lalu melesat melewati semuanya dan
//                memenggal mereka sekaligus dalam satu gerakan (butuh musuh dalam ±14 m).
// Selama menyerang prajurit tidak berjalan (jalur ketukan dibatalkan) dan tidak bisa melompat.
// Tombol yang ditekan saat masih menyerang disimpan, lalu dijalankan begitu gerakan selesai.
// Modul ini hanya mengatur waktu & gerak; yang terkena (musuh, batang pohon, batu) diurus pemanggil
// lewat onEvent, dan sasaran Penggal dipilih lewat "arena" (setArena).

// pukulan kombo — clip: animasi; speed: kecepatan animasi; hit: detik (waktu klip asli) saat
// mengenai; reach/radius: lingkaran sasaran di depan badan (m); y: tinggi titik kena (m);
// damage: kerusakan; knock: kecepatan terpental sasaran (m/s)
export const MOVES = {
  tebas: { clip: 'attack-melee-right', speed: 0.9, hit: 0.24, reach: 1.0, radius: 0.7, y: 0.9, damage: 1, knock: 2.5 },
  tinju: { clip: 'attack-melee-left', speed: 1.0, hit: 0.21, reach: 0.8, radius: 0.55, y: 1.0, damage: 1, knock: 2.5 },
  tendang: { clip: 'attack-kick-right', speed: 1.0, hit: 0.27, reach: 0.95, radius: 0.65, y: 0.45, damage: 2, knock: 4 },
}
export const COMBO = ['tebas', 'tinju', 'tendang']
const COMBO_WINDOW = 0.7 // detik setelah pukulan selesai: tekan lagi = gerakan kombo berikutnya

// jurus (urutan tombol 1–4) → jeda pakai (detik)
export const SKILLS = { cincang: 6, hentak: 7, putar: 5, penggal: 15 }
export const ATTACK_CLIPS = ['attack-melee-right', 'attack-melee-left', 'attack-kick-right']

// satu cincangan: ayunan tebasan dipercepat, mulai setelah awalan ayunan
const CHOP = { time: 0.14, from: 0.1, speed: 2.9, hit: 0.05, reach: 1.1, radius: 0.95, damage: 1, knock: 0.8, advance: 0.9 }
const CINCANG = 10 // jumlah cincangan jurus Cincang
const SPIN = { chops: 3, time: 0.55, hit: 0.3, radius: 2.4, damage: 2, knock: 6 } // jurus Putar
const PLUNGE = { up: 9.5, forward: 2.2, radius: 3.3, plant: 0.75, damage: 3, knock: 7, stuck: 0.35, recover: 0.35 } // Hentak
const EXEC = { range: 14, max: 5, aim: 0.55, seg: 0.08, pause: 0.35, recover: 0.3, past: 1.6 } // Penggal
const RECOVER = 0.15 // jeda sesudah rangkaian cincangan
const FALLBACK = 0.45 // lama pukulan karakter cadangan (tanpa animasi)

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// body: badan prajurit dari player.js — pos, vel, heading (baca/tulis), grounded, depthAt(x, z),
// clipLength(nama), play(nama, fade), playClip(nama, kecepatan, mulai), pose(nama, detik),
// release(), launch(vx, vy, vz), teleport(x, z), swordDown(bool), crouch(m), stopWalking()
export function createCombat(body) {
  let move = null // gerakan yang sedang berjalan
  let comboIndex = 0
  let comboTimer = 0
  let queued = null // 'pukul' atau nama jurus yang ditekan saat masih menyerang
  const cooldown = { cincang: 0, hentak: 0, putar: 0, penggal: 0 }
  let onEvent = () => {}
  // sasaran Penggal (diisi pemanggil): pickTargets(x, z, jangkauan, maks) → [{ id, x, z }],
  // position(id) → { x, z } | null, standable(x, z) → bool
  let arena = { pickTargets: () => [], position: () => null, standable: () => true }

  const forward = () => ({ x: Math.sin(body.heading), z: Math.cos(body.heading) })

  // laporkan kejadian ke pemanggil; untuk 'hit': lingkaran sasaran (x, z, r) + kerusakan
  function emit(type, extra) {
    onEvent({ type, move: move.name, heading: body.heading, origin: { x: body.pos.x, z: body.pos.z }, ...extra })
  }
  function hitFront(reach, radius, y, damage, knock, extra = {}) {
    const f = forward()
    emit('hit', { x: body.pos.x + f.x * reach, z: body.pos.z + f.z * reach, r: radius, y: body.pos.y + y, damage, knock, ...extra })
  }
  function hitAround(radius, y, damage, knock, extra = {}) {
    emit('hit', { x: body.pos.x, z: body.pos.z, r: radius, y: body.pos.y + y, damage, knock, area: true, ...extra })
  }

  function playSwing(name, clip, speed, hit) {
    const len = body.clipLength(clip)
    move = { name, t: 0, dur: len ? len / speed : FALLBACK, hitAt: len ? hit / speed : FALLBACK * 0.55, struck: false }
    body.playClip(clip, speed)
  }
  // mulai satu cincangan (dipakai Cincang & Putar)
  function chop() {
    move.t = 0
    move.struck = false
    body.playClip('attack-melee-right', CHOP.speed, CHOP.from)
  }

  // mulai 'pukul' (kombo) atau jurus; false bila tidak bisa (jurus belum siap, tidak ada sasaran)
  function start(action) {
    if (action === 'pukul') {
      comboIndex = comboTimer > 0 ? (comboIndex + 1) % COMBO.length : 0
      const m = MOVES[COMBO[comboIndex]]
      playSwing(COMBO[comboIndex], m.clip, m.speed, m.hit)
    } else {
      if (!(action in SKILLS) || cooldown[action] > 0) return false
      if (action === 'cincang') {
        move = { name: 'cincang', phase: 'cincang', n: 0, of: CINCANG }
        chop()
      } else if (action === 'putar') {
        move = { name: 'putar', phase: 'cincang', n: 0, of: SPIN.chops }
        chop()
      } else if (action === 'hentak') {
        // lompat hanya dari tanah / air dangkal
        if (!body.grounded || body.depthAt(body.pos.x, body.pos.z) > 0.9) return false
        const f = forward()
        body.launch(f.x * PLUNGE.forward, PLUNGE.up, f.z * PLUNGE.forward)
        move = { name: 'hentak', phase: 'naik', t: 0 }
        body.pose('attack-melee-right', 0.16) // pedang terangkat tinggi
      } else {
        const targets = arena.pickTargets(body.pos.x, body.pos.z, EXEC.range, EXEC.max)
        if (!targets.length) {
          onEvent({ type: 'gagal', move: 'penggal', reason: 'musuh' })
          return false
        }
        move = { name: 'penggal', phase: 'bidik', t: 0, ids: targets.map(t => t.id) }
        body.heading = Math.atan2(targets[0].x - body.pos.x, targets[0].z - body.pos.z)
        body.pose('attack-melee-right', 0.14) // kuda-kuda: pedang ditarik ke belakang
        emit('aim', { targets: move.ids })
      }
      cooldown[action] = SKILLS[action]
      comboTimer = 0
    }
    body.stopWalking()
    return true
  }

  function end() {
    const combo = move.name in MOVES
    move = null
    comboTimer = combo ? COMBO_WINDOW : 0
    const q = queued
    queued = null
    if (q) start(q)
  }

  // rangkaian cincangan: kena di tengah tiap cincangan; arah sabetan berganti-ganti
  function updateChops() {
    if (!move.struck && move.t >= CHOP.hit) {
      move.struck = true
      hitFront(CHOP.reach, CHOP.radius, 0.9, CHOP.damage, CHOP.knock, { swing: move.n % 2 ? -1 : 1, chop: move.n + 1 })
    }
    if (move.t < CHOP.time) return
    move.n++
    if (move.n < move.of) chop()
    else if (move.name === 'putar') {
      // lanjut berputar satu kali
      const len = body.clipLength('attack-melee-right')
      Object.assign(move, { phase: 'putar', t: 0, struck: false, h0: body.heading })
      body.playClip('attack-melee-right', len ? len / SPIN.time : 1)
    } else Object.assign(move, { phase: 'pulih', t: 0 })
  }

  // jalur Penggal: melewati tiap sasaran yang masih hidup, berakhir sedikit di belakang yang terakhir
  function executionPath() {
    const pts = [{ x: body.pos.x, z: body.pos.z }]
    for (const id of move.ids) {
      const p = arena.position(id)
      if (p) pts.push(p)
    }
    if (pts.length < 2) return pts
    const a = pts[pts.length - 2]
    const b = pts[pts.length - 1]
    const len = Math.hypot(b.x - a.x, b.z - a.z) || 1
    for (const d of [EXEC.past, 1, 0.6]) {
      const x = b.x + ((b.x - a.x) / len) * d
      const z = b.z + ((b.z - a.z) / len) * d
      if (arena.standable(x, z)) {
        pts.push({ x, z })
        break
      }
    }
    return pts
  }

  function updateMove(dt) {
    move.t += dt
    const { name, phase } = move
    if (phase === 'cincang') {
      updateChops()
      return
    }
    if (phase === 'pulih') {
      if (move.t >= (name === 'hentak' ? PLUNGE.recover : name === 'penggal' ? EXEC.recover : RECOVER)) end()
      return
    }
    if (name === 'putar') {
      body.heading = move.h0 + smoothstep(0.04, SPIN.time - 0.08, move.t) * Math.PI * 2
      if (!move.struck && move.t >= SPIN.hit) {
        move.struck = true
        hitAround(SPIN.radius, 0.85, SPIN.damage, SPIN.knock, { spin: true })
      }
      if (move.t >= SPIN.time) {
        body.heading = move.h0
        end()
      }
      return
    }
    if (name === 'hentak') {
      if (phase === 'naik' && body.vel.y < 0) {
        // puncak lompatan: pedang dibalik menghadap ke bawah, siap ditancapkan
        move.phase = 'turun'
        body.pose('attack-melee-right', 0.27)
        body.swordDown(true)
      } else if ((phase === 'turun' && body.grounded && move.t > 0.15) || move.t > 2.5) {
        // mendarat: pedang menancap di depan kaki, gelombang kejut ke sekeliling
        const f = forward()
        const plant = { x: body.pos.x + f.x * PLUNGE.plant, z: body.pos.z + f.z * PLUNGE.plant }
        body.crouch(0.28)
        hitAround(PLUNGE.radius, 0.05, PLUNGE.damage, PLUNGE.knock, { plant })
        Object.assign(move, { phase: 'tancap', t: 0 })
      } else if (phase === 'tancap' && move.t >= PLUNGE.stuck) {
        // cabut pedang, berdiri lagi
        body.crouch(0)
        body.swordDown(false)
        body.release()
        Object.assign(move, { phase: 'pulih', t: 0 })
      }
      return
    }
    if (name === 'penggal') {
      if (phase === 'bidik' && move.t >= EXEC.aim) {
        move.path = executionPath()
        Object.assign(move, { phase: 'kilat', t: 0 })
      }
      if (move.phase === 'kilat') {
        // melesat secepat kilat dari satu leher ke leher berikutnya
        const pts = move.path
        const u = Math.min(move.t / EXEC.seg, pts.length - 1)
        const i = Math.min(Math.floor(u), pts.length - 2)
        if (i >= 0) {
          const a = pts[i]
          const b = pts[i + 1]
          const k = u - i
          body.teleport(a.x + (b.x - a.x) * k, a.z + (b.z - a.z) * k)
          body.heading = Math.atan2(b.x - a.x, b.z - a.z)
        }
        if (u >= pts.length - 1) {
          emit('dash', { path: pts, y: body.pos.y + 0.9 })
          body.pose('attack-melee-right', 0.33) // sabetan selesai, pedang terulur
          Object.assign(move, { phase: 'diam', t: 0 })
        }
      } else if (phase === 'diam' && move.t >= EXEC.pause) {
        // jeda sesaat… lalu semua leher terpotong bersamaan
        emit('execute', { targets: move.ids })
        body.release()
        Object.assign(move, { phase: 'pulih', t: 0 })
      }
      return
    }
    // pukulan kombo
    if (!move.struck && move.t >= move.hitAt) {
      move.struck = true
      const m = MOVES[name]
      hitFront(m.reach, m.radius, m.y, m.damage, m.knock, { swing: 1 })
    }
    if (move.t >= move.dur) end()
  }

  return {
    // sisa jeda pakai tiap jurus (detik); hanya untuk dibaca
    cooldown,
    get busy() {
      return move !== null
    },
    get current() {
      return move ? move.name : null
    },
    // tahap gerakan (mis. 'bidik', 'kilat' pada Penggal) — untuk pengujian
    get phase() {
      return move ? move.phase || null : null
    },
    onEvent(fn) {
      onEvent = fn
    },
    setArena(a) {
      arena = a
    },
    // kecepatan datar yang diinginkan selama menyerang: null = tidak menyerang (gerak biasa);
    // keep = pertahankan kecepatan (melayang); instant = langsung pakai kecepatan ini
    drive() {
      if (!move) return null
      if (move.name === 'hentak' && (move.phase === 'naik' || move.phase === 'turun')) return { keep: true }
      if (move.phase === 'cincang') {
        // maju pelan sambil mencincang
        const f = forward()
        return { vx: f.x * CHOP.advance, vz: f.z * CHOP.advance }
      }
      return { vx: 0, vz: 0, instant: move.name === 'penggal' }
    },
    update(dt, input) {
      for (const k in cooldown) cooldown[k] = Math.max(0, cooldown[k] - dt)
      if (!move && comboTimer > 0) comboTimer -= dt
      const pressed = input.skill || (input.attack ? 'pukul' : null)
      if (pressed && move) queued = pressed
      else if (pressed) start(pressed)
      if (move) updateMove(dt)
    },
    reset() {
      if (move) {
        body.swordDown(false)
        body.crouch(0)
      }
      move = null
      queued = null
      comboTimer = 0
    },
  }
}
