// Modular level construction: boxes are batched per material into a few merged
// meshes (world-space UVs so textures continue across pieces), and every solid
// box is registered as a collider. A Builder belongs to one streaming zone so
// that its meshes and colliders can be dropped and rebuilt together.
import * as THREE from 'three'
import { Collider } from './physics.js'

// faces: px nx py ny pz nz — corner order bl, br, tr, tl (CCW from outside)
function pushBox(b, minx, miny, minz, maxx, maxy, maxz, ts, faces) {
  const [su, sv] = ts
  const P = b.pos, N = b.nrm, U = b.uv, I = b.idx
  const quad = (nx, ny, nz, c, uvf) => {
    const base = P.length / 3
    for (const v of c) {
      P.push(v[0], v[1], v[2]); N.push(nx, ny, nz)
      const [u, w] = uvf(v); U.push(u, w)
    }
    I.push(base, base + 1, base + 2, base, base + 2, base + 3)
  }
  if (!faces || faces.px !== false)
    quad(1, 0, 0, [[maxx, miny, maxz], [maxx, miny, minz], [maxx, maxy, minz], [maxx, maxy, maxz]], v => [-v[2] / su, v[1] / sv])
  if (!faces || faces.nx !== false)
    quad(-1, 0, 0, [[minx, miny, minz], [minx, miny, maxz], [minx, maxy, maxz], [minx, maxy, minz]], v => [v[2] / su, v[1] / sv])
  if (!faces || faces.py !== false)
    quad(0, 1, 0, [[minx, maxy, maxz], [maxx, maxy, maxz], [maxx, maxy, minz], [minx, maxy, minz]], v => [v[0] / su, -v[2] / su])
  if (!faces || faces.ny !== false)
    quad(0, -1, 0, [[minx, miny, minz], [maxx, miny, minz], [maxx, miny, maxz], [minx, miny, maxz]], v => [v[0] / su, v[2] / su])
  if (!faces || faces.pz !== false)
    quad(0, 0, 1, [[minx, miny, maxz], [maxx, miny, maxz], [maxx, maxy, maxz], [minx, maxy, maxz]], v => [v[0] / su, v[1] / sv])
  if (!faces || faces.nz !== false)
    quad(0, 0, -1, [[maxx, miny, minz], [minx, miny, minz], [minx, maxy, minz], [maxx, maxy, minz]], v => [-v[0] / su, v[1] / sv])
}

export class Builder {
  constructor(game, name) {
    this.game = game
    this.M = game.M
    this.name = name
    this.batches = new Map()
    this.colliders = []
    this.group = new THREE.Group()
    this.group.name = name
    this.boxCount = 0
    this.oy = 0 // vertical offset applied to everything (see Zone.lift)
  }

  // Visual box (+ collider unless collide:false). mat: material name.
  box(mat, minx, miny, minz, maxx, maxy, maxz, opts = {}) {
    miny += this.oy; maxy += this.oy
    if (maxx - minx < 1e-4 || maxy - miny < 1e-4 || maxz - minz < 1e-4) return null
    if (mat) {
      const m = this.M[mat]
      if (!m) throw new Error('unknown material ' + mat)
      let b = this.batches.get(m)
      if (!b) this.batches.set(m, b = { pos: [], nrm: [], uv: [], idx: [], shadow: opts.shadow !== false })
      pushBox(b, minx, miny, minz, maxx, maxy, maxz, m.userData.ts, opts.faces)
      this.boxCount++
    }
    if (opts.collide === false) return null
    return this.#collider(minx, miny, minz, maxx, maxy, maxz, opts)
  }

  collider(minx, miny, minz, maxx, maxy, maxz, opts = {}) {
    return this.#collider(minx, miny + this.oy, minz, maxx, maxy + this.oy, maxz, opts)
  }

  #collider(minx, miny, minz, maxx, maxy, maxz, opts) {
    const c = new Collider(minx, miny, minz, maxx, maxy, maxz, opts)
    this.colliders.push(c)
    return c
  }

  // Box given by centre-x, centre-z, size, and y range (convenience for props).
  boxC(mat, cx, cz, sx, sz, y0, y1, opts) {
    return this.box(mat, cx - sx / 2, y0, cz - sz / 2, cx + sx / 2, y1, cz + sz / 2, opts)
  }

  // A wall slab running along `axis` ('x' or 'z') from a0..a1, thickness c0..c1,
  // from y0..y1, with rectangular openings {a, b, lo, hi} (lo/hi relative to y0).
  wall(mat, axis, a0, a1, c0, c1, y0, y1, openings = [], opts = {}) {
    if (Array.isArray(mat)) return this.#layer(mat, axis, a0, a1, c0, c1, y0, y1, openings, opts)
    const ops = openings
      .map(o => ({ ...o, a: Math.max(o.a, a0), b: Math.min(o.b, a1) }))
      .filter(o => o.b > o.a + 1e-4)
      .sort((p, q) => p.a - q.a)
    const piece = (s0, s1, yy0, yy1) => {
      if (axis === 'x') this.box(mat, s0, yy0, c0, s1, yy1, c1, opts)
      else this.box(mat, c0, yy0, s0, c1, yy1, s1, opts)
    }
    let cur = a0
    for (const o of ops) {
      if (o.a > cur) piece(cur, o.a, y0, y1)
      const lo = y0 + (o.lo || 0), hi = Math.min(y1, y0 + o.hi)
      if (lo > y0) piece(o.a, o.b, y0, lo)
      if (hi < y1) piece(o.a, o.b, hi, y1)
      cur = Math.max(cur, o.b)
    }
    if (cur < a1) piece(cur, a1, y0, y1)
  }

  // Two-layer wall: layer A on the low side of the thickness, layer B on the high side.
  // matA / matB may be a material name or [[upToA, mat], ...] ranges along the wall.
  wall2(matA, matB, axis, a0, a1, c0, c1, y0, y1, openings = [], opts = {}) {
    const cm = (c0 + c1) / 2
    this.#layer(matA, axis, a0, a1, c0, cm, y0, y1, openings, opts)
    this.#layer(matB, axis, a0, a1, cm, c1, y0, y1, openings, opts)
  }

  #layer(mat, axis, a0, a1, c0, c1, y0, y1, openings, opts) {
    if (typeof mat === 'string') return this.wall(mat, axis, a0, a1, c0, c1, y0, y1, openings, opts)
    let s = a0
    for (const [upTo, m] of mat) {
      const e = Math.min(a1, upTo)
      if (e > s) this.wall(m, axis, s, e, c0, c1, y0, y1, openings, opts)
      s = Math.max(s, e)
    }
    if (s < a1) this.wall(mat[mat.length - 1][1], axis, s, a1, c0, c1, y0, y1, openings, opts)
  }

  // Window in a wall opening: frame, sill, mullion and glass; glass is solid.
  window(axis, a, b, c0, c1, y0, lo, hi, opts = {}) {
    const yl = y0 + lo, yh = y0 + hi, cm = (c0 + c1) / 2
    const f = 0.06
    const B = (m, s0, s1, yy0, yy1, d0, d1, o) =>
      axis === 'x' ? this.box(m, s0, yy0, d0, s1, yy1, d1, o) : this.box(m, d0, yy0, s0, d1, yy1, s1, o)
    const nc = { collide: false }
    B('frame', a, b, yl, yl + f, cm - 0.06, cm + 0.06, nc)
    B('frame', a, b, yh - f, yh, cm - 0.06, cm + 0.06, nc)
    B('frame', a, a + f, yl, yh, cm - 0.06, cm + 0.06, nc)
    B('frame', b - f, b, yl, yh, cm - 0.06, cm + 0.06, nc)
    if (b - a > 1.0) B('frame', (a + b) / 2 - 0.025, (a + b) / 2 + 0.025, yl, yh, cm - 0.05, cm + 0.05, nc)
    if (opts.inside != null) { // interior sill on the given side (+1 / -1)
      const s = opts.inside
      const d0 = s > 0 ? c1 : c0 - 0.08, d1 = s > 0 ? c1 + 0.08 : c0
      B('frame', a - 0.05, b + 0.05, yl - 0.04, yl, d0, d1, nc)
    }
    B(opts.lit ? 'windowLit' : 'glass', a + f, b - f, yl + f, yh - f, cm - 0.01, cm + 0.01, { collide: false, shadow: false })
    // collision: the whole opening, full wall thickness
    if (axis === 'x') this.collider(a, yl, c0, b, yh, c1, { tag: 'glass' })
    else this.collider(c0, yl, a, c1, yh, b, { tag: 'glass' })
  }

  // Casing trim around a door opening on both faces of the wall.
  doorTrim(axis, a, b, c0, c1, y0, h) {
    const t = 0.07, d = 0.02
    const nc = { collide: false }
    for (const [d0, d1] of [[c0 - d, c0], [c1, c1 + d]]) {
      if (axis === 'x') {
        this.box('trim', a - t, y0, d0, a, y0 + h + t, d1, nc)
        this.box('trim', b, y0, d0, b + t, y0 + h + t, d1, nc)
        this.box('trim', a, y0 + h, d0, b, y0 + h + t, d1, nc)
      } else {
        this.box('trim', d0, y0, a - t, d1, y0 + h + t, a, nc)
        this.box('trim', d0, y0, b, d1, y0 + h + t, b + t, nc)
        this.box('trim', d0, y0 + h, a, d1, y0 + h + t, b, nc)
      }
    }
  }

  // Rectangle minus holes, decomposed into boxes (for slabs with stair/shaft holes).
  rectMinus(mat, x0, z0, x1, z1, holes, y0, y1, opts) {
    const xs = [...new Set([x0, x1, ...holes.flatMap(h => [h.x0, h.x1])])].filter(v => v >= x0 && v <= x1).sort((a, b) => a - b)
    const zs = [...new Set([z0, z1, ...holes.flatMap(h => [h.z0, h.z1])])].filter(v => v >= z0 && v <= z1).sort((a, b) => a - b)
    for (let i = 0; i < xs.length - 1; i++) {
      let start = null
      for (let j = 0; j <= zs.length - 1; j++) {
        const inside = j < zs.length - 1 && !holes.some(h =>
          (xs[i] + xs[i + 1]) / 2 > h.x0 && (xs[i] + xs[i + 1]) / 2 < h.x1 &&
          (zs[j] + zs[j + 1]) / 2 > h.z0 && (zs[j] + zs[j + 1]) / 2 < h.z1)
        if (inside && start === null) start = zs[j]
        if (!inside && start !== null) {
          this.box(mat, xs[i], y0, start, xs[i + 1], y1, zs[j], opts)
          start = null
        }
      }
    }
  }

  // Build merged meshes, register colliders.
  finish() {
    for (const [m, b] of this.batches) {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3))
      g.setAttribute('normal', new THREE.Float32BufferAttribute(b.nrm, 3))
      g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2))
      g.setIndex(b.pos.length / 3 > 65535 ? new THREE.Uint32BufferAttribute(b.idx, 1) : new THREE.Uint16BufferAttribute(b.idx, 1))
      g.computeBoundingSphere()
      const mesh = new THREE.Mesh(g, m)
      mesh.name = this.name + ':' + m.name
      mesh.receiveShadow = b.shadow
      mesh.castShadow = b.shadow && !m.transparent
      mesh.matrixAutoUpdate = false
      if (m.transparent) mesh.renderOrder = 2
      this.group.add(mesh)
    }
    this.batches.clear()
    for (const c of this.colliders) this.game.world.add(c)
    return this.group
  }

  dispose() {
    for (const c of this.colliders) this.game.world.remove(c)
    this.colliders.length = 0
    this.group.traverse(o => { if (o.isMesh && o.geometry) o.geometry.dispose() })
    this.group.removeFromParent()
  }
}
