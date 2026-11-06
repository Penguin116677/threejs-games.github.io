// Distance-based streaming of detailed interiors. The building shell (walls,
// slabs, stairs, doors, elevator) is always resident so collision and the
// route are never interrupted; furniture, props, interactables and light
// fixtures are built per zone when the player gets within a floor of it and
// released when they leave. State (drawers, pickups, switches) lives in
// game.state, so a rebuilt zone looks exactly as the player left it.
import * as THREE from 'three'
import { Builder } from './builder.js'
import { mulberry } from './level.js'

export class Zone {
  constructor(game, name, shouldLoad, build) {
    this.game = game
    this.M = game.M
    this.name = name
    this.shouldLoad = shouldLoad
    this.buildFn = build
    this.loaded = false
    this.loads = 0
  }

  load() {
    const g = this.game
    this.b = new Builder(g, this.name)
    this.root = new THREE.Group()
    this.root.name = 'zone:' + this.name
    this.extra = this.root
    this.items = []
    this.fixtures = []
    this.owned = []
    this.rng = mulberry(this.name.split('').reduce((a, c) => a * 31 + c.charCodeAt(0), 7))
    this.buildFn(this)
    this.root.add(this.b.finish())
    g.scene.add(this.root)
    this.loaded = true
    this.loads++
  }

  unload() {
    const g = this.game
    for (const it of this.items) g.removeInteractable(it)
    for (const f of this.fixtures) g.lights.remove(f)
    this.b.dispose()
    this.root.traverse(o => {
      if (o.isMesh || o.isInstancedMesh) {
        o.geometry?.dispose?.()
        if (o.material && !Object.values(g.M).includes(o.material)) o.material.dispose?.()
      }
    })
    for (const t of this.owned) t.dispose()
    this.root.removeFromParent()
    this.items = []; this.fixtures = []; this.owned = []
    this.loaded = false
  }

  interactable(it) { this.items.push(it); this.game.addInteractable(it); return it }
  fixture(f) { this.fixtures.push(f); this.game.lights.add(f); return f }
  own(tex) { this.owned.push(tex); return tex }

  // Author furniture relative to a floor: builder boxes and meshes get +y.
  lift(y, fn) {
    const prevExtra = this.extra, prevOy = this.b.oy
    const g = new THREE.Group()
    g.position.y = y
    prevExtra.add(g)
    g.updateMatrixWorld(true)
    this.extra = g
    this.b.oy = prevOy + y
    try { fn() } finally { this.extra = prevExtra; this.b.oy = prevOy }
  }
}

export class ZoneManager {
  constructor(game) {
    this.game = game
    this.list = []
    this.timer = 0
    this.forceAll = false
  }

  define(name, shouldLoad, build) {
    const z = new Zone(this.game, name, shouldLoad, build)
    this.list.push(z)
    return z
  }

  get(name) { return this.list.find(z => z.name === name) }

  update(dt, pf, force = false) {
    this.timer -= dt
    if (!force && this.timer > 0) return
    this.timer = 0.25
    for (const z of this.list) {
      const want = this.forceAll || z.shouldLoad(pf)
      if (want && !z.loaded) z.load()
      else if (!want && z.loaded) z.unload()
    }
  }
}
