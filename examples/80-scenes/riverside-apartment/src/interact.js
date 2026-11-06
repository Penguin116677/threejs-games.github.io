// Interactive objects. Every interactable exposes:
//   id, prompt(game) -> string | null, aimBox() -> THREE.Box3, interact(game),
//   update?(dt, game), center (THREE.Vector3, for cheap distance culling)
// Persistent state (open/closed, collected, switched) lives in game.state so it
// survives a zone being unloaded and rebuilt.
import * as THREE from 'three'
import { overlaps, Collider } from './physics.js'

const _box = new THREE.Box3()
const HALF_PI = Math.PI / 2

const DIR_PHI = { 'x+': 0, 'x-': Math.PI, 'z+': -HALF_PI, 'z-': HALF_PI }

export class HingedDoor {
  // o: { id, hinge:{x,y,z}, dir:'x+'|'x-'|'z+'|'z-', width, height, mat, locked, keyId,
  //      lockedMsg, name, swing: 0 (away from player) | 1 | -1, plate:{texture, side} }
  constructor(game, o) {
    this.game = game
    this.id = o.id
    this.kind = 'door'
    this.name = o.name || 'door'
    this.width = o.width
    this.height = o.height
    this.hinge = new THREE.Vector3(o.hinge.x, o.hinge.y, o.hinge.z)
    this.center = this.hinge.clone()
    this.phi0 = DIR_PHI[o.dir]
    this.swing = o.swing || 0
    this.maxOpen = o.maxOpen || HALF_PI
    this.speed = o.speed || 2.6
    this.keyId = o.keyId || null
    this.lockedMsg = o.lockedMsg || 'It\'s locked.'
    const st = game.state.get(this.id) || {}
    this.locked = st.locked ?? !!o.locked
    this.sign = st.sign || 1
    this.angle = st.open ? this.maxOpen : 0
    this.target = this.angle
    this.blocked = false

    this.pivot = new THREE.Group()
    this.pivot.position.copy(this.hinge)
    this.pivot.name = 'door:' + this.id
    const M = game.M
    const panel = new THREE.Mesh(game.shared.doorPanel(o.width, o.height), M[o.mat || 'doorWood'])
    panel.castShadow = panel.receiveShadow = true
    this.panel = panel
    this.pivot.add(panel)
    const knob = game.shared.knob()
    for (const s of [1, -1]) {
      const h = new THREE.Mesh(knob, M.brass)
      h.position.set(o.width - 0.09, 1.0, s * 0.045)
      this.pivot.add(h)
    }
    if (o.plate) {
      const p = new THREE.Mesh(game.shared.plate(), new THREE.MeshStandardMaterial({ map: o.plate.texture, roughness: 0.5, metalness: 0.3 }))
      p.position.set(o.width / 2, 1.62, o.plate.side * 0.026)
      if (o.plate.side < 0) p.rotation.y = Math.PI
      this.pivot.add(p)
    }
    this.pivot.rotation.y = this.phi0 + this.sign * this.angle

    // collision: a chain of small boxes along the panel (works at any angle)
    this.n = Math.ceil(o.width / 0.1)
    this.segs = []
    const boxes = this.#segBoxes(this.angle)
    for (const b of boxes) this.segs.push(game.world.add(new Collider(...b, { tag: 'door', owner: this })))
  }

  get isOpen() { return this.target > 0 }

  #segBoxes(angle, sign = this.sign) {
    const phi = this.phi0 + sign * angle
    const cx = Math.cos(phi), cz = -Math.sin(phi)
    const out = []
    const hs = 0.07
    for (let i = 0; i < this.n; i++) {
      const t = (i + 0.5) * this.width / this.n
      const x = this.hinge.x + cx * t, z = this.hinge.z + cz * t
      out.push([x - hs, this.hinge.y, z - hs, x + hs, this.hinge.y + this.height, z + hs])
    }
    return out
  }

  aimBox() { return _box.setFromObject(this.panel) }

  prompt() {
    if (this.locked) return `Open ${this.name}`
    return this.isOpen ? `Close ${this.name}` : `Open ${this.name}`
  }

  #save() { this.game.state.set(this.id, { open: this.target > 0, locked: this.locked, sign: this.sign }) }

  interact(game) {
    if (this.locked) {
      if (this.keyId && game.inventory.has(this.keyId)) {
        this.locked = false
        game.ui.toast(`Unlocked the ${this.name} with the ${game.inventory.get(this.keyId).name}.`)
        game.audio.play('unlock')
        game.events.emit('unlock', this)
      } else {
        game.ui.toast(this.lockedMsg)
        game.audio.play('locked')
        this.rattle = 0.25
        return
      }
    }
    if (this.target > 0) { this.target = 0; game.audio.play('doorClose') }
    else {
      if (this.angle < 0.01 && !this.swing) {
        // swing away from the player
        const p = game.player.pos
        const mx = -Math.sin(this.phi0), mz = -Math.cos(this.phi0) // side reached by sign=+1
        this.sign = (p.x - this.hinge.x) * mx + (p.z - this.hinge.z) * mz > 0 ? -1 : 1
      } else if (this.swing) this.sign = this.swing
      this.target = this.maxOpen
      game.audio.play('doorOpen')
    }
    this.#save()
  }

  // Programmatic open/close (tests, scripted events).
  set(open, sign) {
    if (sign) this.sign = sign
    this.target = open ? this.maxOpen : 0
    this.#save()
  }

  update(dt, game) {
    let rattle = 0
    if (this.rattle > 0) { this.rattle -= dt; rattle = Math.sin(this.rattle * 90) * 0.012 }
    if (Math.abs(this.angle - this.target) < 1e-4) {
      if (rattle || this._rattled) { this.pivot.rotation.y = this.phi0 + this.sign * this.angle + rattle; this._rattled = !!rattle }
      return
    }
    const step = Math.sign(this.target - this.angle) * Math.min(Math.abs(this.target - this.angle), this.speed * dt)
    const next = this.angle + step
    const boxes = this.#segBoxes(next)
    const pb = game.player.box()
    const hitsPlayer = boxes.some(b => overlaps({ minx: b[0], miny: b[1], minz: b[2], maxx: b[3], maxy: b[4], maxz: b[5] },
      pb[0] - 0.02, pb[1], pb[2] - 0.02, pb[3] + 0.02, pb[4], pb[5] + 0.02))
    if (hitsPlayer) { this.blocked = true; return }
    this.blocked = false
    this.angle = next
    this.pivot.rotation.y = this.phi0 + this.sign * this.angle
    boxes.forEach((b, i) => game.world.update(this.segs[i], ...b))
  }
}

// Sliding drawer; children of `group` (e.g. a key) ride along.
export class Drawer {
  constructor(game, { id, group, hit, dir, dist = 0.32, name = 'drawer' }) {
    this.game = game
    this.id = id
    this.kind = 'drawer'
    this.group = group
    this.hit = hit
    this.dir = dir.clone().normalize()
    this.dist = dist
    this.name = name
    this.home = group.position.clone()
    this.amount = (game.state.get(id) || {}).open ? 1 : 0
    this.target = this.amount
    this.center = new THREE.Vector3()
    group.updateWorldMatrix(true, true)
    this.#apply()
    hit.getWorldPosition(this.center)
  }
  #apply() { this.group.position.copy(this.home).addScaledVector(this.dir, this.amount * this.dist) }
  aimBox() { return _box.setFromObject(this.hit) }
  prompt() { return this.target ? `Close ${this.name}` : `Open ${this.name}` }
  interact(game) {
    this.target = this.target ? 0 : 1
    game.state.set(this.id, { open: !!this.target })
    game.audio.play(this.target ? 'drawerOpen' : 'drawerClose')
  }
  update(dt) {
    if (this.amount === this.target) return
    this.amount += Math.sign(this.target - this.amount) * Math.min(Math.abs(this.target - this.amount), dt * 3.5)
    this.#apply()
  }
}

// Small hinged door without collision (cabinets, wardrobe, fridge, mirror cabinet).
export class CabinetDoor {
  constructor(game, { id, pivot, hit, openAngle = 1.75, name = 'cabinet' }) {
    this.game = game
    this.id = id
    this.kind = 'cabinet'
    this.pivot = pivot
    this.hit = hit
    this.name = name
    this.base = pivot.rotation.y
    this.openAngle = openAngle
    this.amount = (game.state.get(id) || {}).open ? 1 : 0
    this.target = this.amount
    this.pivot.rotation.y = this.base + this.openAngle * this.amount
    this.center = new THREE.Vector3()
    pivot.updateWorldMatrix(true, true)
    hit.getWorldPosition(this.center)
  }
  aimBox() { return _box.setFromObject(this.hit) }
  prompt() { return this.target ? `Close ${this.name}` : `Open ${this.name}` }
  interact(game) {
    this.target = this.target ? 0 : 1
    game.state.set(this.id, { open: !!this.target })
    game.audio.play(this.target ? 'cabinetOpen' : 'cabinetClose')
  }
  update(dt) {
    if (this.amount === this.target) return
    this.amount += Math.sign(this.target - this.amount) * Math.min(Math.abs(this.target - this.amount), dt * 3)
    this.pivot.rotation.y = this.base + this.openAngle * this.amount
  }
}

// Generic "press to do something" object (light switch, breaker lever, elevator button).
export class Pressable {
  constructor(game, { id, mesh, hit, label, onPress, kind = 'button', box = null }) {
    this.game = game
    this.id = id
    this.kind = kind
    this.mesh = mesh
    this.hit = hit || mesh
    this.label = label
    this.onPress = onPress
    this.fixedBox = box
    this.center = new THREE.Vector3()
    this.hit.updateWorldMatrix(true, true)
    this.hit.getWorldPosition(this.center)
  }
  aimBox() {
    if (this.fixedBox) return this.fixedBox
    _box.setFromObject(this.hit)
    return _box.expandByScalar(0.02)
  }
  prompt(game) { return typeof this.label === 'function' ? this.label(game) : this.label }
  interact(game) { this.onPress(game, this) }
}

// Something that can be picked up (keys, photographs) or read (documents).
export class Item {
  constructor(game, { id, mesh, kind = 'item', name, onTake, doc = null }) {
    this.game = game
    this.id = id
    this.kind = kind
    this.mesh = mesh
    this.name = name
    this.doc = doc
    this.onTake = onTake
    this.center = new THREE.Vector3()
    mesh.updateWorldMatrix(true, true)
    mesh.getWorldPosition(this.center)
  }
  get gone() { return this.game.state.get(this.id)?.taken }
  aimBox() {
    if (this.gone) return _box.makeEmpty()
    _box.setFromObject(this.mesh)
    return _box.expandByScalar(0.05)
  }
  prompt() {
    if (this.gone) return null
    return this.doc ? `Read ${this.name}` : `Take ${this.name}`
  }
  interact(game) {
    if (this.doc) {
      game.ui.showDocument(this.doc)
      game.audio.play('paper')
      game.state.set(this.id, { read: true })
      game.events.emit('read', this)
      return
    }
    game.state.set(this.id, { taken: true })
    this.mesh.visible = false
    game.audio.play('pickup')
    this.onTake?.(game, this)
    game.events.emit('take', this)
  }
}
