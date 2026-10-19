// Gerakan serang prajurit — semuanya memakai animasi bawaan model Kenney "Mini Arena":
// - Tombol Pukul = kombo yang berganti setiap ditekan: tebasan pedang → tinju kiri → tendangan,
//   lalu kembali ke tebasan (mulai lagi dari tebasan bila jeda lebih dari COMBO_WINDOW).
// - Tiga jurus dengan jeda pakai (cooldown):
//   Tebasan Putar — berputar 360° sambil menebas, mengenai semua di sekeliling;
//   Serbuan — melesat ±5 m ke depan (berhenti di depan penghalang / air dalam) lalu menebas;
//   Hentakan — melompat ke depan lalu menghantam tanah, gelombang kejut di sekeliling.
// Selama menyerang prajurit tidak berjalan (jalur ketukan dibatalkan) dan tidak bisa melompat.
// Tombol yang ditekan saat masih menyerang disimpan, lalu dijalankan begitu gerakan selesai.
// Sasaran sementara: batang pohon & batu (belum ada musuh) — dilaporkan lewat onEvent.

// pukulan kombo — clip: animasi; speed: kecepatan animasi; hit: detik (waktu klip asli) saat
// mengenai; reach/radius: lingkaran sasaran di depan badan (m); y: tinggi titik kena (m)
export const MOVES = {
  tebas: { clip: 'attack-melee-right', speed: 0.9, hit: 0.24, reach: 1.0, radius: 0.7, y: 0.9 },
  tinju: { clip: 'attack-melee-left', speed: 1.0, hit: 0.21, reach: 0.8, radius: 0.55, y: 1.0 },
  tendang: { clip: 'attack-kick-right', speed: 1.0, hit: 0.27, reach: 0.95, radius: 0.65, y: 0.45 },
}
export const COMBO = ['tebas', 'tinju', 'tendang']
const COMBO_WINDOW = 0.7 // detik setelah pukulan selesai: tekan lagi = gerakan kombo berikutnya

// jurus → jeda pakai (detik)
export const SKILLS = { putar: 4, serbu: 5, hentak: 7 }
export const ATTACK_CLIPS = ['attack-melee-right', 'attack-melee-left', 'attack-kick-right']

const SPIN = { time: 0.62, hit: 0.32, radius: 2.1 } // Tebasan Putar
const DASH = { speed: 22, time: 0.24, slash: 1.1, reach: 1.1, radius: 0.8 } // Serbuan (±5 m)
const LEAP = { up: 8, forward: 3.6, radius: 3.0, recover: 0.3, maxTime: 2.5 } // Hentakan
const FALLBACK = 0.45 // lama pukulan karakter cadangan (tanpa animasi)

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// body: badan prajurit dari player.js — pos, vel, heading (baca/tulis), grounded, colliders,
// depthAt(x, z), clipLength(nama), playClip(nama, kecepatan), play(nama, fade),
// launch(vx, vy, vz), stopWalking()
export function createCombat(body) {
  let move = null // gerakan yang sedang berjalan
  let comboIndex = 0
  let comboTimer = 0
  let queued = null // 'pukul' atau nama jurus yang ditekan saat masih menyerang
  const cooldown = { putar: 0, serbu: 0, hentak: 0 }
  let onEvent = () => {}

  const forward = () => ({ x: Math.sin(body.heading), z: Math.cos(body.heading) })

  // sasaran: lingkaran di depan badan, atau di sekeliling badan
  function front(reach, radius) {
    const f = forward()
    const x = body.pos.x + f.x * reach
    const z = body.pos.z + f.z * reach
    const t = body.colliders.hitAt(x, z, radius)
    return { x, z, targets: t ? [t] : [] }
  }
  function around(radius) {
    const { x, z } = body.pos
    return { x, z, targets: body.colliders.hitAll(x, z, radius, 5) }
  }
  // laporkan kejadian: type 'hit' (saat mengenai) atau 'dash' (akhir lesatan Serbuan)
  function emit(type, at, y, extra = {}) {
    onEvent({
      type, move: move.name, x: at.x, y: body.pos.y + y, z: at.z, heading: body.heading,
      origin: { x: body.pos.x, z: body.pos.z }, targets: at.targets || [], ...extra,
    })
  }

  function playSwing(name, clip, speed, hit) {
    const len = body.clipLength(clip)
    move = { name, t: 0, dur: len ? len / speed : FALLBACK, hitAt: len ? hit / speed : FALLBACK * 0.55, struck: false }
    body.playClip(clip, speed)
  }

  // mulai 'pukul' (kombo) atau jurus; false bila tidak bisa (jurus belum siap, dsb.)
  function start(action) {
    if (action === 'pukul') {
      comboIndex = comboTimer > 0 ? (comboIndex + 1) % COMBO.length : 0
      const m = MOVES[COMBO[comboIndex]]
      playSwing(COMBO[comboIndex], m.clip, m.speed, m.hit)
    } else {
      if (!(action in SKILLS) || cooldown[action] > 0) return false
      if (action === 'hentak') {
        // lompat hanya dari tanah / air dangkal
        if (!body.grounded || body.depthAt(body.pos.x, body.pos.z) > 0.9) return false
        const f = forward()
        body.launch(f.x * LEAP.forward, LEAP.up, f.z * LEAP.forward)
        move = { name: 'hentak', t: 0, phase: 'udara', swung: false }
        body.play('jump', 0.05)
      } else if (action === 'serbu') {
        const { x, z } = body.pos
        move = { name: 'serbu', t: 0, phase: 'lesat', dir: forward(), from: { x, z }, last: { x, z }, prevDt: 0, stop: false }
        body.play('sprint', 0.05)
      } else {
        // putar: ayunan pedang diperlambat selama tubuh berputar satu lingkaran
        const len = body.clipLength('attack-melee-right')
        move = { name: 'putar', t: 0, dur: SPIN.time, hitAt: SPIN.hit, struck: false, h0: body.heading }
        body.playClip('attack-melee-right', len ? len / SPIN.time : 1)
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

  function updateMove(dt) {
    move.t += dt
    const { pos, vel } = body
    if (move.name === 'serbu' && move.phase === 'lesat') {
      // tertahan batang/batu/lereng (gerak frame lalu < 35% dari seharusnya) atau air dalam di
      // depan → berhenti. Frame pertama belum ada gerak fisika, jadi belum dinilai.
      const moved = Math.hypot(pos.x - move.last.x, pos.z - move.last.z)
      const blocked = move.prevDt > 0 && moved < DASH.speed * move.prevDt * 0.35
      move.last = { x: pos.x, z: pos.z }
      move.prevDt = dt
      if (move.t >= DASH.time || blocked || move.stop) {
        emit('dash', { x: pos.x, z: pos.z }, 0.6, { from: move.from })
        vel.x *= 0.15
        vel.z *= 0.15
        playSwing('serbu', 'attack-melee-right', DASH.slash, MOVES.tebas.hit)
      }
      return
    }
    if (move.name === 'hentak') {
      if (move.phase === 'udara') {
        // di puncak lompatan: ayunkan pedang ke bawah, kena tepat saat mendarat
        if (!move.swung && vel.y < 0) {
          move.swung = true
          body.playClip('attack-melee-right', 0.9)
        }
        if ((body.grounded && move.t > 0.12) || move.t > LEAP.maxTime) {
          emit('hit', around(LEAP.radius), 0.05)
          move.phase = 'pulih'
          move.t = 0
        }
      } else if (move.t >= LEAP.recover) end()
      return
    }
    if (move.name === 'putar') body.heading = move.h0 + smoothstep(0.06, SPIN.time - 0.1, move.t) * Math.PI * 2
    if (!move.struck && move.t >= move.hitAt) {
      move.struck = true
      if (move.name === 'putar') emit('hit', around(SPIN.radius), 0.85)
      else if (move.name === 'serbu') emit('hit', front(DASH.reach, DASH.radius), 0.9)
      else {
        const m = MOVES[move.name]
        emit('hit', front(m.reach, m.radius), m.y)
      }
    }
    if (move.t >= move.dur) {
      if (move.name === 'putar') body.heading = move.h0
      end()
    }
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
    onEvent(fn) {
      onEvent = fn
    },
    // kecepatan datar yang diinginkan selama menyerang: null = tidak menyerang (gerak biasa);
    // keep = pertahankan kecepatan (melayang); instant = langsung pakai kecepatan ini
    drive() {
      if (!move) return null
      if (move.name === 'serbu' && move.phase === 'lesat') {
        const ax = body.pos.x + move.dir.x * 0.7
        const az = body.pos.z + move.dir.z * 0.7
        if (body.depthAt(ax, az) > 0.9) move.stop = true
        const s = move.stop ? 0 : DASH.speed
        return { vx: move.dir.x * s, vz: move.dir.z * s, instant: true }
      }
      if (move.name === 'hentak' && move.phase === 'udara') return { keep: true }
      return { vx: 0, vz: 0 }
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
      move = null
      queued = null
      comboTimer = 0
    },
  }
}
