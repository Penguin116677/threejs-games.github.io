// Input pemain (kontrol joystick, kamera di belakang karakter):
// - HP: JOYSTICK di bagian kiri-bawah layar — muncul di tempat ibu jari kiri menyentuh, dorong
//   sedikit = berjalan, dorong penuh = lari. Geser di bagian lain layar untuk memutar kamera
//   (kiri-kanan & naik-turun), cubit dua jari untuk zoom. Tombol Pukul (kombo), 4 tombol jurus,
//   Lompat. Ketuk elf / kios untuk memilihnya.
// - Komputer: WASD/panah untuk berjalan (Shift = pelan), seret mouse untuk memutar kamera, roda
//   untuk zoom, klik untuk memilih, F untuk memukul, 1–4 (atau Q/E/R/T) untuk jurus, Spasi lompat.
// Ketukan dibedakan dari geseran: jari bergerak < TAP_MOVE px dan dilepas < TAP_TIME ms.
// Dibaca sekali per frame lewat read().

const TAP_MOVE = 12 // px
const TAP_TIME = 800 // ms (lebih lama dari ini tanpa bergeser = bukan ketukan)
const JOY_RADIUS = 56 // px: jangkauan kenop dari pusat joystick
const JOY_DEAD = 0.12 // zona mati di tengah: getaran ibu jari tidak menggerakkan karakter
// daerah joystick: bagian kiri layar, di bawah HUD kiri atas
const JOY_ZONE = { x: 0.45, y: 0.3 }
const SKILL_KEYS = {
  Digit1: 'cincang', KeyQ: 'cincang', Digit2: 'hentak', KeyE: 'hentak',
  Digit3: 'putar', KeyR: 'putar', Digit4: 'penggal', KeyT: 'penggal',
}

// joystick = elemen dasar joystick (berisi knob); skillButtons: { cincang, hentak, putar, penggal }
export function createInput({ canvas, joystick, knob, jumpButton, attackButton, skillButtons, touch }) {
  const keys = new Set()
  let enabled = true
  let jumpQueued = false
  let attackQueued = false
  let skillQueued = null
  let lookDX = 0
  let lookDY = 0
  let zoom = 1
  const taps = []

  // joystick: jari yang memegangnya, pusatnya, dan arahnya (x = kanan, y = maju, panjang 0..1)
  let joyId = null
  const joyCenter = { x: 0, y: 0 }
  const joyStart = { x: 0, y: 0, t: 0, moved: false }
  const joy = { x: 0, y: 0 }

  // jari/mouse lain (kamera & ketukan): pointerId → { x, y, sx, sy, t, moved }
  const lookers = new Map()
  let pinchDist = 0

  function placeJoystick(x, y, active) {
    joystick.style.transform = `translate(${x - 60}px, ${y - 60}px)`
    joystick.classList.toggle('aktif', active)
  }
  // posisi istirahat: kiri bawah (petunjuk tempat joystick)
  function restJoystick() {
    placeJoystick(88, window.innerHeight - 152, false)
    knob.style.transform = 'translate(0px, 0px)'
  }
  function releaseJoystick() {
    joyId = null
    joy.x = 0
    joy.y = 0
    restJoystick()
  }

  function pinchLength() {
    const [a, b] = [...lookers.values()]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  canvas.addEventListener('contextmenu', e => e.preventDefault())

  canvas.addEventListener('pointerdown', e => {
    if (!enabled) return
    const mouse = e.pointerType === 'mouse'
    if (mouse && e.button !== 0 && e.button !== 2) return
    // t = waktu sentuhan dari event itu sendiri: frame yang lambat tidak mengubah ketukan jadi "tahan"
    if (!mouse && joyId === null && e.clientX < window.innerWidth * JOY_ZONE.x && e.clientY > window.innerHeight * JOY_ZONE.y) {
      joyId = e.pointerId
      // pusat dijaga agar lingkaran joystick tetap di dalam layar
      joyCenter.x = Math.max(66, e.clientX)
      joyCenter.y = Math.min(window.innerHeight - 66, e.clientY)
      Object.assign(joyStart, { x: e.clientX, y: e.clientY, t: e.timeStamp, moved: false })
      placeJoystick(joyCenter.x, joyCenter.y, true)
    } else {
      lookers.set(e.pointerId, {
        x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: e.timeStamp,
        // klik kanan mouse hanya untuk memutar kamera
        moved: mouse && e.button === 2,
      })
      if (lookers.size === 2) {
        pinchDist = pinchLength()
        for (const p of lookers.values()) p.moved = true // dua jari = zoom, bukan ketukan
      }
    }
    canvas.setPointerCapture?.(e.pointerId)
  })

  canvas.addEventListener('pointermove', e => {
    if (e.pointerId === joyId) {
      let dx = e.clientX - joyCenter.x
      let dy = e.clientY - joyCenter.y
      if (!joyStart.moved && Math.hypot(e.clientX - joyStart.x, e.clientY - joyStart.y) > TAP_MOVE) joyStart.moved = true
      const len = Math.hypot(dx, dy)
      if (len > JOY_RADIUS) {
        dx *= JOY_RADIUS / len
        dy *= JOY_RADIUS / len
      }
      knob.style.transform = `translate(${dx}px, ${dy}px)`
      const m = Math.min(1, len / JOY_RADIUS)
      const k = m < JOY_DEAD ? 0 : (m - JOY_DEAD) / (1 - JOY_DEAD) / Math.max(m, 1e-6)
      joy.x = (dx / JOY_RADIUS) * k
      joy.y = (-dy / JOY_RADIUS) * k
      return
    }
    const p = lookers.get(e.pointerId)
    if (!p) return
    if (lookers.size === 1) {
      if (!p.moved && Math.hypot(e.clientX - p.sx, e.clientY - p.sy) > TAP_MOVE) p.moved = true
      if (p.moved) {
        lookDX += e.clientX - p.x
        lookDY += e.clientY - p.y
      }
    }
    p.x = e.clientX
    p.y = e.clientY
    if (lookers.size === 2) {
      const d = pinchLength()
      if (pinchDist > 0 && d > 0) zoom *= pinchDist / d
      pinchDist = d
    }
  })

  function release(e, allowTap) {
    if (e.pointerId === joyId) {
      // sentuhan singkat tanpa menggeser joystick tetap dihitung ketukan (memilih elf / kios)
      if (allowTap && enabled && !joyStart.moved && e.timeStamp - joyStart.t < TAP_TIME) taps.push({ x: e.clientX, y: e.clientY })
      releaseJoystick()
      return
    }
    const p = lookers.get(e.pointerId)
    if (!p) return
    if (allowTap && enabled && !p.moved && e.timeStamp - p.t < TAP_TIME) taps.push({ x: e.clientX, y: e.clientY })
    lookers.delete(e.pointerId)
    pinchDist = lookers.size === 2 ? pinchLength() : 0
  }
  canvas.addEventListener('pointerup', e => release(e, true))
  canvas.addEventListener('pointercancel', e => release(e, false))
  canvas.addEventListener('lostpointercapture', e => release(e, false))

  canvas.addEventListener('wheel', e => {
    if (!enabled) return
    e.preventDefault()
    zoom *= Math.exp(e.deltaY * 0.0012)
  }, { passive: false })

  // tombol aksi (Lompat, Pukul, jurus): pointerdown (bukan click) agar langsung bereaksi
  function actionButton(button, press) {
    button.addEventListener('pointerdown', e => {
      e.preventDefault()
      e.stopPropagation()
      if (enabled) press()
      button.classList.add('ditekan')
    })
    for (const ev of ['pointerup', 'pointercancel', 'pointerleave'])
      button.addEventListener(ev, () => button.classList.remove('ditekan'))
  }
  actionButton(jumpButton, () => {
    jumpQueued = true
  })
  actionButton(attackButton, () => {
    attackQueued = true
  })
  for (const [name, button] of Object.entries(skillButtons))
    actionButton(button, () => {
      skillQueued = name
    })

  const typing = e => e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
  const GAME_KEYS = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']
  window.addEventListener('keydown', e => {
    if (!enabled || typing(e)) return
    if (GAME_KEYS.includes(e.code)) e.preventDefault()
    if (e.code === 'Space' && !e.repeat) jumpQueued = true
    if (e.code === 'KeyF' && !e.repeat) attackQueued = true
    if (SKILL_KEYS[e.code] && !e.repeat) skillQueued = SKILL_KEYS[e.code]
    keys.add(e.code)
  })
  window.addEventListener('keyup', e => keys.delete(e.code))

  // jangan sampai tombol/jari "tersangkut" saat aplikasi berpindah
  function resetAll() {
    keys.clear()
    lookers.clear()
    pinchDist = 0
    releaseJoystick()
  }
  window.addEventListener('blur', resetAll)
  document.addEventListener('visibilitychange', resetAll)
  window.addEventListener('resize', () => {
    if (joyId === null) restJoystick()
  })
  restJoystick()

  const key = (...codes) => codes.some(c => keys.has(c))

  return {
    // nilai input frame ini; ketukan, putaran kamera, zoom, lompat, pukul & jurus di-reset setelah dibaca
    read() {
      let mx = joy.x
      let my = joy.y
      const kx = key('KeyD', 'ArrowRight') - key('KeyA', 'ArrowLeft')
      const ky = key('KeyW', 'ArrowUp') - key('KeyS', 'ArrowDown')
      if (kx || ky) {
        const len = Math.hypot(kx, ky)
        const slow = key('ShiftLeft', 'ShiftRight') ? 0.45 : 1
        mx = (kx / len) * slow
        my = (ky / len) * slow
      }
      const out = {
        moveX: mx, moveY: my, jump: jumpQueued, attack: attackQueued, skill: skillQueued,
        lookDX, lookDY, zoom, taps: taps.splice(0),
      }
      jumpQueued = false
      attackQueued = false
      skillQueued = null
      lookDX = 0
      lookDY = 0
      zoom = 1
      return out
    },
    // joystick sedang dipegang (untuk pengujian & petunjuk)
    get joystickActive() {
      return joyId !== null
    },
    setEnabled(on) {
      enabled = on
      if (!on) resetAll()
      // joystick & tombol aksi hanya untuk layar sentuh (komputer memakai keyboard)
      joystick.hidden = !on || !touch
      for (const b of [jumpButton, attackButton, ...Object.values(skillButtons)]) b.hidden = !on || !touch
    },
  }
}
