// Input pemain (gaya game strategi):
// - HP: KETUK tanah untuk berjalan ke sana, geser satu jari untuk memutar kamera,
//   cubit dua jari untuk zoom, tombol Pukul (kombo), 3 tombol jurus, dan Lompat.
// - Komputer: klik tanah untuk berjalan, seret mouse untuk memutar kamera, roda untuk zoom,
//   F untuk memukul, 1/2/3 (atau Q/E/R) untuk jurus, Spasi untuk lompat; WASD/panah tetap bisa.
// Ketukan dibedakan dari geseran: jari bergerak < TAP_MOVE px dan dilepas < TAP_TIME ms.
// Dibaca sekali per frame lewat read().

const TAP_MOVE = 12 // px
const SKILL_KEYS = { Digit1: 'putar', KeyQ: 'putar', Digit2: 'serbu', KeyE: 'serbu', Digit3: 'hentak', KeyR: 'hentak' }
const TAP_TIME = 800 // ms (lebih lama dari ini tanpa bergeser = bukan ketukan)

// skillButtons: { putar, serbu, hentak } → elemen tombol jurus
export function createInput({ canvas, jumpButton, attackButton, skillButtons, touch }) {
  const keys = new Set()
  let enabled = true
  let jumpQueued = false
  let attackQueued = false
  let skillQueued = null
  let lookDX = 0
  let zoom = 1
  const taps = []

  // jari/mouse yang sedang menyentuh: pointerId → { x, y, sx, sy, t, moved }
  const pointers = new Map()
  let pinchDist = 0

  function pinchLength() {
    const [a, b] = [...pointers.values()]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  canvas.addEventListener('contextmenu', e => e.preventDefault())

  canvas.addEventListener('pointerdown', e => {
    if (!enabled) return
    if (e.pointerType === 'mouse' && e.button !== 0 && e.button !== 2) return
    // t = waktu sentuhan dari event itu sendiri: frame yang lambat tidak mengubah ketukan jadi "tahan"
    pointers.set(e.pointerId, {
      x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: e.timeStamp,
      // klik kanan mouse hanya untuk memutar kamera
      moved: e.pointerType === 'mouse' && e.button === 2,
    })
    if (pointers.size === 2) {
      pinchDist = pinchLength()
      for (const p of pointers.values()) p.moved = true // dua jari = zoom, bukan ketukan
    }
    canvas.setPointerCapture?.(e.pointerId)
  })

  canvas.addEventListener('pointermove', e => {
    const p = pointers.get(e.pointerId)
    if (!p) return
    if (pointers.size === 1) {
      if (!p.moved && Math.hypot(e.clientX - p.sx, e.clientY - p.sy) > TAP_MOVE) p.moved = true
      if (p.moved) lookDX += e.clientX - p.x
    }
    p.x = e.clientX
    p.y = e.clientY
    if (pointers.size === 2) {
      const d = pinchLength()
      if (pinchDist > 0 && d > 0) zoom *= pinchDist / d
      pinchDist = d
    }
  })

  function release(e, allowTap) {
    const p = pointers.get(e.pointerId)
    if (!p) return
    if (allowTap && enabled && !p.moved && e.timeStamp - p.t < TAP_TIME) taps.push({ x: e.clientX, y: e.clientY })
    pointers.delete(e.pointerId)
    pinchDist = pointers.size === 2 ? pinchLength() : 0
  }
  canvas.addEventListener('pointerup', e => release(e, true))
  canvas.addEventListener('pointercancel', e => release(e, false))
  canvas.addEventListener('lostpointercapture', e => release(e, false))

  canvas.addEventListener('wheel', e => {
    if (!enabled) return
    e.preventDefault()
    zoom *= Math.exp(e.deltaY * 0.0012)
  }, { passive: false })

  // tombol aksi (Lompat, Pukul): pointerdown (bukan click) agar langsung bereaksi
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

  const GAME_KEYS = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']
  window.addEventListener('keydown', e => {
    if (!enabled || e.target instanceof HTMLInputElement) return
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
    pointers.clear()
    pinchDist = 0
  }
  window.addEventListener('blur', resetAll)
  document.addEventListener('visibilitychange', resetAll)

  const key = (...codes) => codes.some(c => keys.has(c))

  return {
    // nilai input frame ini; ketukan, putaran kamera, zoom, lompat, pukul & jurus di-reset setelah dibaca
    read() {
      let mx = 0
      let my = 0
      const kx = key('KeyD', 'ArrowRight') - key('KeyA', 'ArrowLeft')
      const ky = key('KeyW', 'ArrowUp') - key('KeyS', 'ArrowDown')
      if (kx || ky) {
        const len = Math.hypot(kx, ky)
        const slow = key('ShiftLeft', 'ShiftRight') ? 0.45 : 1
        mx = (kx / len) * slow
        my = (ky / len) * slow
      }
      const out = {
        moveX: mx, moveY: my, jump: jumpQueued, attack: attackQueued, skill: skillQueued, lookDX, zoom, taps: taps.splice(0),
      }
      jumpQueued = false
      attackQueued = false
      skillQueued = null
      lookDX = 0
      zoom = 1
      return out
    },
    setEnabled(on) {
      enabled = on
      if (!on) resetAll()
      // tombol aksi hanya untuk layar sentuh (komputer memakai tombol keyboard)
      for (const b of [jumpButton, attackButton, ...Object.values(skillButtons)]) b.hidden = !on || !touch
    },
  }
}
