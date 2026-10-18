// Input pemain:
// - HP: joystick virtual (muncul di tempat ibu jari kiri menyentuh, bagian kiri layar),
//   tombol Lompat, geser di bagian kanan layar untuk memutar kamera, cubit 2 jari untuk zoom.
// - Komputer: WASD/panah untuk jalan, Shift untuk jalan pelan, Spasi untuk lompat,
//   seret mouse untuk memutar kamera, roda mouse untuk zoom.
// Dibaca sekali per frame lewat read().

const JOY_RADIUS = 56 // px, jangkauan knob dari pusat
const JOY_ZONE = 0.45 // bagian kiri layar (proporsi lebar) untuk joystick

export function createInput({ canvas, joystick, knob, jumpButton, touch }) {
  const keys = new Set()
  let enabled = true
  let jumpQueued = false
  let lookDX = 0
  let lookDY = 0
  let zoom = 1
  let lastLook = -1e9

  // joystick
  let joyId = null
  const joyCenter = { x: 0, y: 0 }
  const joy = { x: 0, y: 0 } // x = kanan, y = maju (layar ke atas), panjang 0..1

  // jari/mouse untuk kamera: pointerId → posisi terakhir
  const lookers = new Map()
  let pinchDist = 0

  function placeJoystick(x, y, active) {
    joystick.style.transform = `translate(${x - 60}px, ${y - 60}px)`
    joystick.classList.toggle('aktif', active)
  }

  function restJoystick() {
    // posisi istirahat: kiri bawah (sebagai petunjuk tempat joystick)
    const inset = 24
    placeJoystick(inset + 76, window.innerHeight - inset - 96, false)
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

  canvas.addEventListener('pointerdown', e => {
    if (!enabled) return
    const isMouse = e.pointerType === 'mouse'
    if (isMouse && e.button !== 0) return
    if (!isMouse && joyId === null && e.clientX < window.innerWidth * JOY_ZONE && e.clientY > 90) {
      joyId = e.pointerId
      // pusat joystick dijaga agar lingkarannya tetap di dalam layar
      joyCenter.x = Math.max(70, e.clientX)
      joyCenter.y = Math.min(window.innerHeight - 70, Math.max(70, e.clientY))
      placeJoystick(joyCenter.x, joyCenter.y, true)
    } else {
      lookers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (lookers.size === 2) pinchDist = pinchLength()
    }
    canvas.setPointerCapture?.(e.pointerId)
  })

  canvas.addEventListener('pointermove', e => {
    if (e.pointerId === joyId) {
      let dx = e.clientX - joyCenter.x
      let dy = e.clientY - joyCenter.y
      const len = Math.hypot(dx, dy)
      if (len > JOY_RADIUS) {
        dx *= JOY_RADIUS / len
        dy *= JOY_RADIUS / len
      }
      knob.style.transform = `translate(${dx}px, ${dy}px)`
      // zona mati kecil di tengah agar karakter tidak bergerak karena getaran ibu jari
      const m = Math.min(1, len / JOY_RADIUS)
      const k = m < 0.12 ? 0 : (m - 0.12) / 0.88 / Math.max(m, 1e-6)
      joy.x = (dx / JOY_RADIUS) * k
      joy.y = (-dy / JOY_RADIUS) * k
      return
    }
    const p = lookers.get(e.pointerId)
    if (!p) return
    if (lookers.size === 1) {
      lookDX += e.clientX - p.x
      lookDY += e.clientY - p.y
    }
    p.x = e.clientX
    p.y = e.clientY
    if (lookers.size === 2) {
      const d = pinchLength()
      if (pinchDist > 0 && d > 0) zoom *= pinchDist / d
      pinchDist = d
    }
    lastLook = performance.now()
  })

  function release(e) {
    if (e.pointerId === joyId) releaseJoystick()
    if (lookers.delete(e.pointerId)) pinchDist = lookers.size === 2 ? pinchLength() : 0
  }
  canvas.addEventListener('pointerup', release)
  canvas.addEventListener('pointercancel', release)
  canvas.addEventListener('lostpointercapture', release)

  canvas.addEventListener('wheel', e => {
    if (!enabled) return
    e.preventDefault()
    zoom *= Math.exp(e.deltaY * 0.0012)
    lastLook = performance.now()
  }, { passive: false })

  // tombol lompat: pointerdown (bukan click) agar langsung bereaksi
  jumpButton.addEventListener('pointerdown', e => {
    e.preventDefault()
    e.stopPropagation()
    if (enabled) jumpQueued = true
    jumpButton.classList.add('ditekan')
  })
  for (const ev of ['pointerup', 'pointercancel', 'pointerleave'])
    jumpButton.addEventListener(ev, () => jumpButton.classList.remove('ditekan'))

  const GAME_KEYS = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']
  window.addEventListener('keydown', e => {
    if (!enabled || e.target instanceof HTMLInputElement) return
    if (GAME_KEYS.includes(e.code)) e.preventDefault()
    if (e.code === 'Space' && !e.repeat) jumpQueued = true
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
    // nilai input frame ini; akumulasi kamera dan lompat di-reset setelah dibaca
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
        moveX: mx,
        moveY: my,
        jump: jumpQueued,
        lookDX,
        lookDY,
        zoom,
        lookRecent: performance.now() - lastLook < 1800,
      }
      jumpQueued = false
      lookDX = 0
      lookDY = 0
      zoom = 1
      return out
    },
    setEnabled(on) {
      enabled = on
      if (!on) resetAll()
      // joystick & tombol lompat hanya untuk layar sentuh
      joystick.hidden = !on || !touch
      jumpButton.hidden = !on || !touch
    },
  }
}
