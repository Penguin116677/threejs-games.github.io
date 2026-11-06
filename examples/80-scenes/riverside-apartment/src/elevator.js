// Working elevator: a moving car (floor + ceiling colliders that carry the
// player), centre-opening car doors, landing doors on every floor, a call
// button and floor indicator per landing, and a floor-select panel in the car.
import * as THREE from 'three'
import { Builder } from './builder.js'
import { Collider, overlaps } from './physics.js'
import { Fixture } from './lights.js'
import { Pressable } from './interact.js'
import { FLOORS, FLOOR_H, SHAFT, ELEV_DOOR, floorLabel } from './constants.js'
import { makeCanvas } from './materials.js'

const DOOR_H = 2.1
const CAR_H = 2.5
const LANDING_Z = [0.92, 0.97]
const CAR_Z = [1.13, 1.17]

export class Elevator {
  constructor(game) {
    this.game = game
    const st = game.state.get('elevator') || {}
    this.k = st.k ?? 0
    this.y = this.k * FLOOR_H
    this.v = 0
    this.state = 'idle' // idle | opening | open | closing | moving
    this.door = 0 // 0 closed .. 1 open
    this.openTimer = 0
    this.queue = []
    this.target = null
    this.dy = 0
    this.lastDir = 0

    const [x0, x1] = ELEV_DOOR
    this.mid = (x0 + x1) / 2
    this.panelW = (x1 - x0) / 2 + 0.01
    this.travel = this.panelW - 0.02

    this.#buildCar()
    this.#buildLandings()
    this.#updateIndicator(true)
    this.#applyDoors()
    this.#applyCar()
  }

  #buildCar() {
    const g = this.game, M = g.M
    const b = new Builder(g, 'elevator-car')
    const nc = { collide: false }
    const { x0, x1, z0, z1 } = SHAFT
    b.box('metal', x0, -0.15, z0, x1, 0, z1, nc) // floor
    b.box('floorTile', x0 + 0.05, 0, z0 + 0.1, x1 - 0.05, 0.01, z1 - 0.05, nc)
    b.box('metal', x0, CAR_H, z0, x1, CAR_H + 0.1, z1, nc) // ceiling
    b.box('metal', x0, 0, z0, x0 + 0.03, CAR_H, z1, nc) // west
    b.box('metal', x1 - 0.03, 0, z0, x1, CAR_H, z1, nc) // east
    b.box('metal', x0, 0, z1 - 0.03, x1, CAR_H, z1, nc) // back
    b.box('mirror', x0 + 0.4, 0.9, z1 - 0.04, x1 - 0.4, 2.1, z1 - 0.03, nc)
    b.box('metal', x0, 0, z0, ELEV_DOOR[0], CAR_H, CAR_Z[1] + 0.01, nc) // front returns
    b.box('metal', ELEV_DOOR[1], 0, z0, x1, CAR_H, CAR_Z[1] + 0.01, nc)
    b.box('metal', ELEV_DOOR[0], DOOR_H, z0, ELEV_DOOR[1], CAR_H, CAR_Z[1] + 0.01, nc)
    b.box('steel', x0 + 0.03, 0.9, z0 + 0.4, x0 + 0.07, 0.94, z1 - 0.2, nc) // handrails
    b.box('steel', x0 + 0.4, 0.9, z1 - 0.07, x1 - 0.4, 0.94, z1 - 0.03, nc)
    b.box('breaker', x1 - 0.05, 0.9, z0 + 0.25, x1 - 0.03, 1.85, z0 + 0.75, nc) // button panel
    b.box('emissive', x0 + 0.5, CAR_H - 0.01, z0 + 0.6, x1 - 0.5, CAR_H, z1 - 0.6, { collide: false, shadow: false })
    this.car = b.finish()
    g.scene.add(this.car)
    this.carLight = b.group.children.find(m => m.material === M.emissive)
    if (this.carLight) this.carLight.material = new THREE.MeshBasicMaterial({ color: 0xfff4d8 })

    // car door panels (move with the car and slide sideways)
    this.carDoors = [0, 1].map(() => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(this.panelW, DOOR_H, CAR_Z[1] - CAR_Z[0]), M.metal)
      m.castShadow = m.receiveShadow = true
      g.scene.add(m)
      return m
    })

    // colliders
    const W = g.world
    this.cFloor = W.add(new Collider(x0, -0.15, z0, x1, 0, z1, { tag: 'elevator', owner: this }))
    this.cCeil = W.add(new Collider(x0, CAR_H, z0, x1, CAR_H + 0.1, z1, { tag: 'elevator', owner: this }))
    this.cCarDoors = [0, 1].map(() => W.add(new Collider(0, 0, 0, 0.1, 0.1, 0.1, { tag: 'elevatorDoor', owner: this })))

    // floor-select panel: 2 columns x 4 rows + door-open button
    this.buttons = []
    const bx = x1 - 0.055
    const btnGeo = new THREE.BoxGeometry(0.03, 0.085, 0.085)
    for (let k = 0; k < FLOORS; k++) {
      const col = k % 2, row = Math.floor(k / 2)
      const tex = this.#label(floorLabel(k))
      const mat = new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0x000000, roughness: 0.4 })
      const m = new THREE.Mesh(btnGeo, mat)
      m.position.set(bx, 1.0 + row * 0.13, z0 + 0.38 + col * 0.2)
      this.car.add(m)
      const p = new Pressable(g, {
        id: 'elevator-btn-' + k, mesh: m, label: `Press ${floorLabel(k)}`, kind: 'elevatorButton',
        onPress: game => this.press(game, k, m),
      })
      p.floor = k
      this.buttons.push(p)
      g.addInteractable(p)
    }
    const om = new THREE.Mesh(btnGeo, new THREE.MeshStandardMaterial({ map: this.#label('<>'), emissive: 0, roughness: 0.4 }))
    om.position.set(bx, 1.55, z0 + 0.48)
    this.car.add(om)
    const op = new Pressable(g, { id: 'elevator-open', mesh: om, label: 'Hold doors open', kind: 'elevatorButton', onPress: game => this.pressOpen(game) })
    this.buttons.push(op)
    g.addInteractable(op)

    this.light = g.lights.add(new Fixture({
      id: 'elevator-light', pos: () => this._lightPos.set(this.mid - 0.2, this.y + 2.3, 2.25),
      color: 0xfff0d0, intensity: 4, range: 4.5, circuit: 'elevator', flicker: 0.15,
      glow: lv => this.carLight?.material.color.setScalar(0.15 + 0.85 * lv),
    }))
    this.light.floor = undefined
    Object.defineProperty(this.light, 'floorIndex', { get: () => Math.round(this.y / FLOOR_H) })
  }
  _lightPos = new THREE.Vector3()

  #label(text) {
    const [c, ctx] = makeCanvas(64, 64)
    ctx.fillStyle = '#c9c4b5'; ctx.fillRect(0, 0, 64, 64)
    ctx.fillStyle = '#202020'; ctx.font = 'bold 34px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(text, 32, 34)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }

  #buildLandings() {
    const g = this.game, M = g.M
    const [c, ctx] = makeCanvas(128, 64)
    this.indCanvas = c; this.indCtx = ctx
    this.indTex = new THREE.CanvasTexture(c)
    this.indTex.colorSpace = THREE.SRGBColorSpace
    const indMat = new THREE.MeshBasicMaterial({ map: this.indTex })
    const indGeo = new THREE.PlaneGeometry(0.36, 0.18)
    this.landing = []
    for (let k = 0; k < FLOORS; k++) {
      const y = k * FLOOR_H
      const doors = [0, 1].map(() => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(this.panelW, DOOR_H, LANDING_Z[1] - LANDING_Z[0]), M.doorMetal)
        m.position.set(0, y + DOOR_H / 2, (LANDING_Z[0] + LANDING_Z[1]) / 2)
        m.castShadow = m.receiveShadow = true
        g.scene.add(m)
        return m
      })
      const colliders = [0, 1].map(() => g.world.add(new Collider(0, 0, 0, 0.1, 0.1, 0.1, { tag: 'elevatorDoor', owner: this })))
      const ind = new THREE.Mesh(indGeo, indMat)
      ind.position.set(this.mid, y + 2.3, 0.895)
      ind.rotation.y = Math.PI
      g.scene.add(ind)
      // call button plate
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.02), M.steel)
      plate.position.set(ELEV_DOOR[1] + 0.3, y + 1.1, 0.89)
      g.scene.add(plate)
      const btnMat = new THREE.MeshStandardMaterial({ color: 0xd8d0b8, emissive: 0x000000, roughness: 0.4 })
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 16).rotateX(Math.PI / 2), btnMat)
      btn.position.set(ELEV_DOOR[1] + 0.3, y + 1.1, 0.875)
      g.scene.add(btn)
      const p = new Pressable(g, {
        id: 'elevator-call-' + k, mesh: btn, label: 'Call elevator', kind: 'elevatorCall',
        onPress: game => this.call(game, k, btn),
      })
      p.floor = k
      g.addInteractable(p)
      this.landing.push({ doors, colliders, call: p, btn })
      g.floorObjects[k].push(...doors, ind, plate, btn)
    }
  }

  #updateIndicator(force) {
    const k = Math.round(this.y / FLOOR_H)
    const dir = this.state === 'moving' ? Math.sign(this.v) : 0
    const key = k + ':' + dir + ':' + this.game.power.elevator
    if (!force && key === this._indKey) return
    this._indKey = key
    const ctx = this.indCtx
    ctx.fillStyle = '#0a0706'; ctx.fillRect(0, 0, 128, 64)
    if (this.game.power.elevator) {
      ctx.fillStyle = '#ff5a1a'; ctx.font = 'bold 40px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(floorLabel(k), 70, 34)
      if (dir) {
        ctx.beginPath()
        if (dir > 0) { ctx.moveTo(22, 44); ctx.lineTo(34, 18); ctx.lineTo(46, 44) } else { ctx.moveTo(22, 20); ctx.lineTo(34, 46); ctx.lineTo(46, 20) }
        ctx.fill()
      }
    }
    this.indTex.needsUpdate = true
  }

  // ---- requests --------------------------------------------------------------

  #noPower(game) {
    if (game.power.elevator) return false
    game.ui.toast('Nothing happens. The elevator has no power.')
    game.audio.play('click')
    return true
  }

  flash(mesh) {
    if (!mesh?.material?.emissive) return
    mesh.material.emissive.setHex(0xffa040)
    clearTimeout(mesh._t)
    mesh._t = setTimeout(() => mesh.material.emissive.setHex(0), 600)
  }

  call(game, k, mesh) {
    if (this.#noPower(game)) return
    game.audio.play('button')
    this.flash(mesh)
    if (this.state !== 'moving' && this.k === k) { this.#open(); return }
    this.request(k)
  }

  press(game, k, mesh) {
    if (this.#noPower(game)) return
    game.audio.play('button')
    this.flash(mesh)
    if (this.state !== 'moving' && this.k === k) { this.#open(); return }
    this.request(k)
    if (this.state === 'open') this.openTimer = Math.min(this.openTimer, 1.2)
  }

  pressOpen(game) {
    if (this.#noPower(game)) return
    game.audio.play('button')
    if (this.state !== 'moving') this.#open()
  }

  request(k) {
    if (this.target === k || this.queue.includes(k)) return
    this.queue.push(k)
  }

  #open() {
    if (this.state === 'moving') return
    this.state = 'opening'
    this.openTimer = 6
  }

  // ---- simulation --------------------------------------------------------------

  #doorBoxes(amount, yBase, zr) {
    const [x0] = ELEV_DOOR
    const off = amount * this.travel
    const l0 = x0 - off, r0 = this.mid - 0.01 + off
    return [
      [l0, yBase, zr[0], l0 + this.panelW, yBase + DOOR_H, zr[1]],
      [r0, yBase, zr[0], r0 + this.panelW, yBase + DOOR_H, zr[1]],
    ]
  }

  #applyDoors() {
    const W = this.game.world
    const atK = this.state === 'moving' ? -1 : this.k
    for (let k = 0; k < FLOORS; k++) {
      const L = this.landing[k]
      const a = k === atK ? this.door : 0
      const boxes = this.#doorBoxes(a, k * FLOOR_H, LANDING_Z)
      boxes.forEach((b, i) => {
        L.doors[i].position.set((b[0] + b[3]) / 2, k * FLOOR_H + DOOR_H / 2, (b[2] + b[5]) / 2)
        W.update(L.colliders[i], ...b)
      })
    }
    const cb = this.#doorBoxes(this.door, this.y, CAR_Z)
    cb.forEach((b, i) => {
      this.carDoors[i].position.set((b[0] + b[3]) / 2, this.y + DOOR_H / 2, (b[2] + b[5]) / 2)
      W.update(this.cCarDoors[i], ...b)
    })
  }

  #applyCar() {
    const W = this.game.world
    const { x0, x1, z0, z1 } = SHAFT
    this.car.position.y = this.y
    W.update(this.cFloor, x0, this.y - 0.15, z0, x1, this.y, z1)
    W.update(this.cCeil, x0, this.y + CAR_H, z0, x1, this.y + CAR_H + 0.1, z1)
    for (const b of this.buttons) b.mesh.getWorldPosition(b.center)
  }

  #doorsBlocked(nextAmount) {
    const pb = this.game.player.box()
    const test = b => overlaps({ minx: b[0], miny: b[1], minz: b[2], maxx: b[3], maxy: b[4], maxz: b[5] }, ...pb)
    return [...this.#doorBoxes(nextAmount, this.k * FLOOR_H, LANDING_Z), ...this.#doorBoxes(nextAmount, this.y, CAR_Z)].some(test)
  }

  get playerInside() {
    const p = this.game.player.pos
    return p.x > SHAFT.x0 && p.x < SHAFT.x1 && p.z > SHAFT.z0 && p.z < SHAFT.z1 && Math.abs(p.y - this.y) < 1.5
  }

  update(dt) {
    const g = this.game
    this.dy = 0
    const powered = g.power.elevator
    switch (this.state) {
      case 'idle':
        if (powered && this.queue.length) {
          this.target = this.queue.shift()
          if (this.target === this.k) { this.target = null; this.#open() }
          else { this.state = 'moving'; g.audio.play('elevatorStart') }
        }
        break
      case 'opening':
        this.door = Math.min(1, this.door + dt * 1.4)
        if (this.door >= 1) { this.state = 'open' }
        break
      case 'open':
        this.openTimer -= dt
        if (this.openTimer <= 0 || (this.queue.length && this.openTimer < 4)) this.state = 'closing'
        break
      case 'closing': {
        const next = Math.max(0, this.door - dt * 1.1)
        if (this.#doorsBlocked(next)) { this.state = 'opening'; this.openTimer = 4; g.audio.play('button'); break }
        this.door = next
        if (this.door <= 0) this.state = 'idle'
        break
      }
      case 'moving': {
        if (!powered) break
        const ty = this.target * FLOOR_H
        const dist = ty - this.y
        const dir = Math.sign(dist)
        const vmax = 2.4, acc = 1.6
        const want = dir * Math.min(vmax, Math.sqrt(2 * acc * Math.abs(dist)) + 0.08)
        this.v += Math.sign(want - this.v) * Math.min(Math.abs(want - this.v), acc * dt * 1.5)
        let step = this.v * dt
        if (Math.abs(step) >= Math.abs(dist)) step = dist
        this.y += step
        this.dy = step
        if (Math.abs(ty - this.y) < 1e-4) {
          this.y = ty; this.v = 0; this.k = this.target; this.target = null
          g.state.set('elevator', { k: this.k })
          g.audio.play('ding')
          g.events.emit('elevatorArrive', this.k)
          this.state = 'idle'
          this.#open()
        }
        this.#applyCar()
        break
      }
    }
    this.#applyDoors()
    this.#updateIndicator()
    g.audio.setHum(this.state === 'moving' && powered ? 1 : 0)
  }
}
