// Optimised lighting: the level contains many light *fixtures* (cheap emissive
// bulbs), but only a small fixed pool of real PointLights exists. Each update
// the pool is assigned to the nearest powered fixtures on the player's floor.
// The light count never changes, so shaders never recompile.
import * as THREE from 'three'
import { floorOfY } from './constants.js'

export class Fixture {
  // o: { id, pos:Vector3|()=>Vector3, color, intensity, range, circuit, switchId, flicker, floor, glow:(color)=>void }
  constructor({ pos, ...o }) {
    Object.assign(this, { color: 0xffe2b0, intensity: 6, range: 7, flicker: 0, circuit: null, switchId: null }, o)
    this._pos = pos
    this.color = new THREE.Color(this.color)
    this.lastOn = null
    this.flickerT = Math.random() * 10
    this.level = 1
  }
  get pos() { return typeof this._pos === 'function' ? this._pos() : this._pos }
  // ceiling fixtures hang just under the next slab, so judge the storey from 1.2 m lower
  get floorIndex() { return this.floor === 'outside' ? 'outside' : (this.floor ?? floorOfY(this.pos.y - 1.2)) }
}

export class LightManager {
  constructor(game, scene, poolSize) {
    this.game = game
    this.fixtures = new Set()
    this.pool = []
    for (let i = 0; i < poolSize; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 6, 2)
      l.castShadow = false
      scene.add(l)
      this.pool.push(l)
    }
    this.assigned = []
    this.timer = 0
  }

  add(f) { this.fixtures.add(f); return f }
  remove(f) { this.fixtures.delete(f) }

  isOn(f) {
    const g = this.game
    if (f.circuit && !g.power[f.circuit]) return false
    if (f.switchId && !g.switches[f.switchId]) return false
    return true
  }

  update(dt, eye) {
    const pf = floorOfY(eye.y)
    const outsideish = this.game.isOutside() || pf === 0 || pf >= 8
    // flicker + bulb glow for every fixture (cheap)
    for (const f of this.fixtures) {
      const on = this.isOn(f)
      let level = on ? 1 : 0
      if (on && f.flicker > 0) {
        f.flickerT += dt
        const n = Math.sin(f.flickerT * 13.1) * Math.sin(f.flickerT * 3.7 + 1.3) + Math.sin(f.flickerT * 0.7)
        if (n > 1.6 - f.flicker * 1.2) level = 0.05 + Math.random() * 0.25
        else if (Math.random() < f.flicker * 0.04) level = 0.3
      }
      if (this.game.scare > 0 && (f.floorIndex === pf)) level *= Math.random() < 0.5 ? 0 : 0.2
      f.level = level
      if (f.glow && f._glowLevel !== level) { f.glow(level); f._glowLevel = level }
    }
    // reassign the light pool a few times a second
    this.timer -= dt
    const moved = !this.lastEye || (this.lastEye.x - eye.x) ** 2 + (this.lastEye.y - eye.y) ** 2 + (this.lastEye.z - eye.z) ** 2 > 9
    if (this.timer <= 0 || moved) {
      this.lastEye = { x: eye.x, y: eye.y, z: eye.z }
      this.timer = 0.15
      const cands = []
      for (const f of this.fixtures) {
        if (!this.isOn(f)) continue
        const fi = f.floorIndex
        if (fi === 'outside' ? !outsideish : fi !== pf) continue
        const p = f.pos
        const d2 = (p.x - eye.x) ** 2 + (p.y - eye.y) ** 2 + (p.z - eye.z) ** 2
        if (d2 > (f.range + 14) ** 2) continue
        cands.push([d2 / (f.intensity + 1), f])
      }
      cands.sort((a, b) => a[0] - b[0])
      this.assigned = cands.slice(0, this.pool.length).map(c => c[1])
    }
    this.pool.forEach((l, i) => {
      const f = this.assigned[i]
      if (!f) { l.intensity = 0; return } // never toggle .visible: that changes the light count and recompiles shaders
      l.position.copy(f.pos)
      l.color.copy(f.color)
      l.distance = f.range
      l.intensity = f.intensity * f.level
    })
  }
}
