// Desktop (keyboard + pointer-lock mouse) and Android/touch controls:
// floating virtual joystick (left half), drag-to-look (right half), and
// on-screen Interact / Sprint / Crouch / Flashlight buttons.

export class Input {
  constructor(game, { touch }) {
    this.game = game
    this.touch = touch
    this.keys = new Set()
    this.move = { x: 0, y: 0 } // x: strafe right, y: forward
    this.joy = { x: 0, y: 0, id: null, ox: 0, oy: 0 }
    this.look = { dx: 0, dy: 0, id: null, lx: 0, ly: 0 }
    this.sprintHeld = false
    this.sprintToggle = false
    this.crouchToggle = false
    this.crouchHeld = false
    this.pressed = new Set() // edge-triggered actions: interact, flashlight
    this.forced = null // tests can drive input directly
    this.mouseSens = 0.0022
    this.touchSens = 0.0055

    addEventListener('keydown', e => this.#key(e, true))
    addEventListener('keyup', e => this.#key(e, false))
    addEventListener('blur', () => { this.keys.clear(); this.sprintHeld = false; this.crouchHeld = false })
    document.addEventListener('mousemove', e => {
      if (document.pointerLockElement) { this.look.dx += e.movementX; this.look.dy += e.movementY }
      else if (this.dragging) { this.look.dx += e.movementX; this.look.dy += e.movementY }
    })
    document.addEventListener('mousedown', e => {
      if (e.button === 0 && document.pointerLockElement && game.running) this.pressed.add('interact')
    })
    document.addEventListener('mouseup', () => { this.dragging = false })
    if (touch) this.#setupTouch()
  }

  #key(e, down) {
    if (e.target?.tagName === 'INPUT') return
    const k = e.code
    if (down) this.keys.add(k); else this.keys.delete(k)
    if (!down) return
    if (k === 'KeyE') this.pressed.add('interact')
    if (k === 'KeyF') this.pressed.add('flashlight')
    if (k === 'KeyC') this.crouchToggle = !this.crouchToggle
    if (k === 'Escape' || k === 'Tab') this.pressed.add('menu')
    if (['Space', 'ArrowUp', 'ArrowDown', 'Tab'].includes(k)) e.preventDefault()
  }

  #setupTouch() {
    const zone = document.getElementById('touch-zone')
    const base = document.getElementById('joy-base')
    const knob = document.getElementById('joy-knob')
    const R = 60
    const setKnob = (dx, dy) => { knob.style.transform = `translate(${dx}px, ${dy}px)` }
    zone.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && !this.game.testMode) return
      e.preventDefault()
      const leftSide = e.clientX < innerWidth * 0.45
      if (leftSide && this.joy.id === null) {
        this.joy.id = e.pointerId; this.joy.ox = e.clientX; this.joy.oy = e.clientY
        base.style.left = e.clientX + 'px'; base.style.top = e.clientY + 'px'
        base.classList.add('active'); setKnob(0, 0)
      } else if (!leftSide && this.look.id === null) {
        this.look.id = e.pointerId; this.look.lx = e.clientX; this.look.ly = e.clientY
      }
      zone.setPointerCapture?.(e.pointerId)
    }, { passive: false })
    zone.addEventListener('pointermove', e => {
      if (e.pointerId === this.joy.id) {
        let dx = e.clientX - this.joy.ox, dy = e.clientY - this.joy.oy
        const l = Math.hypot(dx, dy)
        if (l > R) { dx *= R / l; dy *= R / l }
        setKnob(dx, dy)
        this.joy.x = dx / R; this.joy.y = -dy / R
      } else if (e.pointerId === this.look.id) {
        this.look.dx += (e.clientX - this.look.lx) * (this.touchSens / this.mouseSens)
        this.look.dy += (e.clientY - this.look.ly) * (this.touchSens / this.mouseSens)
        this.look.lx = e.clientX; this.look.ly = e.clientY
      }
    })
    const end = e => {
      if (e.pointerId === this.joy.id) {
        this.joy.id = null; this.joy.x = this.joy.y = 0
        base.classList.remove('active'); setKnob(0, 0)
      }
      if (e.pointerId === this.look.id) this.look.id = null
    }
    zone.addEventListener('pointerup', end)
    zone.addEventListener('pointercancel', end)

    const btn = (id, down, up) => {
      const el = document.getElementById(id)
      el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); el.classList.add('down'); down() })
      const release = e => { e.stopPropagation(); el.classList.remove('down'); up?.() }
      el.addEventListener('pointerup', release)
      el.addEventListener('pointercancel', release)
      el.addEventListener('pointerleave', release)
    }
    btn('btn-interact', () => this.pressed.add('interact'))
    btn('btn-flashlight', () => this.pressed.add('flashlight'))
    btn('btn-sprint', () => { this.sprintToggle = !this.sprintToggle; this.#syncButtons() })
    btn('btn-crouch', () => { this.crouchToggle = !this.crouchToggle; this.#syncButtons() })
    btn('btn-menu', () => this.pressed.add('menu'))
  }

  #syncButtons() {
    document.getElementById('btn-sprint')?.classList.toggle('on', this.sprintToggle)
    document.getElementById('btn-crouch')?.classList.toggle('on', this.crouchToggle)
  }

  take(action) {
    const had = this.pressed.has(action)
    this.pressed.delete(action)
    return had
  }

  // Sample continuous input once per frame.
  sample() {
    if (this.forced) {
      const f = this.forced
      this.move.x = f.x || 0; this.move.y = f.y || 0
      return { sprint: !!f.sprint, crouch: !!f.crouch }
    }
    const k = this.keys
    let x = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0)
    let y = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0)
    x += this.joy.x; y += this.joy.y
    const l = Math.hypot(x, y)
    if (l > 1) { x /= l; y /= l }
    this.move.x = x; this.move.y = y
    const joySprint = Math.hypot(this.joy.x, this.joy.y) > 0.98 && this.sprintToggle
    const sprint = k.has('ShiftLeft') || k.has('ShiftRight') || this.sprintToggle || joySprint
    const crouch = this.crouchToggle || k.has('ControlLeft') || k.has('ControlRight')
    if (this.crouchToggle && sprint && (k.has('ShiftLeft') || k.has('ShiftRight'))) this.crouchToggle = false
    return { sprint, crouch }
  }

  consumeLook() {
    const d = { dx: this.look.dx * this.mouseSens, dy: this.look.dy * this.mouseSens }
    this.look.dx = 0; this.look.dy = 0
    return d
  }
}
