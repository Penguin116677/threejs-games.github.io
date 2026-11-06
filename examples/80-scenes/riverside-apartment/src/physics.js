// Axis-aligned collision world + kinematic first-person character controller.
//
// Everything solid in the level (walls, slabs, stair treads, furniture, door
// panels, the elevator car) is an axis-aligned box. Boxes live in a 3D spatial
// hash so a query only touches nearby boxes. Moving boxes (doors, elevator) are
// re-bucketed when they move. The player is an upright box (capsule-like
// footprint) moved with per-axis sweep-and-clamp in small sub-steps, with
// automatic step-up for stairs and ground snapping on the way down.

const CELL = 2
const EPS = 1e-4
const key = (ix, iy, iz) => ((ix + 512) * 1024 + (iy + 512)) * 1024 + (iz + 512)

let nextId = 1

export class Collider {
  constructor(minx, miny, minz, maxx, maxy, maxz, opts = {}) {
    this.id = nextId++
    this.minx = minx; this.miny = miny; this.minz = minz
    this.maxx = maxx; this.maxy = maxy; this.maxz = maxz
    this.tag = opts.tag || 'solid'
    this.owner = opts.owner || null // e.g. a door; used to ignore self when ray testing
    this.enabled = true
    this._cells = []
    this._stamp = 0
  }

  set(minx, miny, minz, maxx, maxy, maxz) {
    this.minx = minx; this.miny = miny; this.minz = minz
    this.maxx = maxx; this.maxy = maxy; this.maxz = maxz
  }
}

export const overlaps = (c, minx, miny, minz, maxx, maxy, maxz) =>
  c.maxx > minx + EPS && c.minx < maxx - EPS &&
  c.maxy > miny + EPS && c.miny < maxy - EPS &&
  c.maxz > minz + EPS && c.minz < maxz - EPS

export class CollisionWorld {
  constructor() {
    this.grid = new Map()
    this.all = new Set()
    this.stamp = 1
  }

  add(c) {
    this.all.add(c)
    this.#insert(c)
    return c
  }

  remove(c) {
    if (!this.all.has(c)) return
    this.#erase(c)
    this.all.delete(c)
  }

  // Move a collider (door panel / elevator) and re-bucket it.
  update(c, minx, miny, minz, maxx, maxy, maxz) {
    this.#erase(c)
    c.set(minx, miny, minz, maxx, maxy, maxz)
    this.#insert(c)
  }

  #insert(c) {
    const x0 = Math.floor(c.minx / CELL), x1 = Math.floor(c.maxx / CELL)
    const y0 = Math.floor(c.miny / CELL), y1 = Math.floor(c.maxy / CELL)
    const z0 = Math.floor(c.minz / CELL), z1 = Math.floor(c.maxz / CELL)
    for (let ix = x0; ix <= x1; ix++)
      for (let iy = y0; iy <= y1; iy++)
        for (let iz = z0; iz <= z1; iz++) {
          const k = key(ix, iy, iz)
          let cell = this.grid.get(k)
          if (!cell) this.grid.set(k, cell = [])
          cell.push(c)
          c._cells.push(cell)
        }
  }

  #erase(c) {
    for (const cell of c._cells) {
      const i = cell.indexOf(c)
      if (i >= 0) { cell[i] = cell[cell.length - 1]; cell.pop() }
    }
    c._cells.length = 0
  }

  // All enabled colliders overlapping the box.
  query(minx, miny, minz, maxx, maxy, maxz, out = []) {
    out.length = 0
    const stamp = ++this.stamp
    const x0 = Math.floor(minx / CELL), x1 = Math.floor(maxx / CELL)
    const y0 = Math.floor(miny / CELL), y1 = Math.floor(maxy / CELL)
    const z0 = Math.floor(minz / CELL), z1 = Math.floor(maxz / CELL)
    for (let ix = x0; ix <= x1; ix++)
      for (let iy = y0; iy <= y1; iy++)
        for (let iz = z0; iz <= z1; iz++) {
          const cell = this.grid.get(key(ix, iy, iz))
          if (!cell) continue
          for (const c of cell) {
            if (c._stamp === stamp) continue
            c._stamp = stamp
            if (c.enabled && overlaps(c, minx, miny, minz, maxx, maxy, maxz)) out.push(c)
          }
        }
    return out
  }

  anyOverlap(minx, miny, minz, maxx, maxy, maxz, ignore = null) {
    for (const c of this.query(minx, miny, minz, maxx, maxy, maxz, this._tmp || (this._tmp = [])))
      if (!ignore || !ignore(c)) return c
    return null
  }

  // Nearest ray hit against colliders. Returns { dist, collider } or null.
  raycast(ox, oy, oz, dx, dy, dz, maxDist, ignore = null) {
    const ex = ox + dx * maxDist, ey = oy + dy * maxDist, ez = oz + dz * maxDist
    const cands = this.query(
      Math.min(ox, ex) - EPS, Math.min(oy, ey) - EPS, Math.min(oz, ez) - EPS,
      Math.max(ox, ex) + EPS, Math.max(oy, ey) + EPS, Math.max(oz, ez) + EPS, [])
    let best = null
    for (const c of cands) {
      if (ignore && ignore(c)) continue
      const t = rayBox(ox, oy, oz, dx, dy, dz, c.minx, c.miny, c.minz, c.maxx, c.maxy, c.maxz)
      if (t !== null && t <= maxDist && (!best || t < best.dist)) best = { dist: t, collider: c }
    }
    return best
  }
}

// Slab-method ray vs AABB; returns entry distance (0 if inside) or null.
export function rayBox(ox, oy, oz, dx, dy, dz, minx, miny, minz, maxx, maxy, maxz) {
  let tmin = 0, tmax = Infinity
  const o = [ox, oy, oz], d = [dx, dy, dz], mn = [minx, miny, minz], mx = [maxx, maxy, maxz]
  for (let a = 0; a < 3; a++) {
    if (Math.abs(d[a]) < 1e-9) {
      if (o[a] < mn[a] || o[a] > mx[a]) return null
    } else {
      let t1 = (mn[a] - o[a]) / d[a], t2 = (mx[a] - o[a]) / d[a]
      if (t1 > t2) { const t = t1; t1 = t2; t2 = t }
      if (t1 > tmin) tmin = t1
      if (t2 < tmax) tmax = t2
      if (tmin > tmax) return null
    }
  }
  return tmin
}

// ---------------------------------------------------------------------------

export class PlayerController {
  constructor(world) {
    this.world = world
    this.pos = { x: 0, y: 0, z: 0 } // feet centre
    this.vy = 0
    this.r = 0.28 // half width of the footprint
    this.hStand = 1.75
    this.hCrouch = 1.15
    this.h = this.hStand
    this.stepH = 0.4
    this.gravity = 22
    this.grounded = false
    this.ground = null
    this.crouching = false
    this.lastSafe = null
    this.safeTimer = 0
    this.blockedTime = 0
    this._q = []
  }

  box(x = this.pos.x, y = this.pos.y, z = this.pos.z, h = this.h) {
    return [x - this.r, y, z - this.r, x + this.r, y + h, z + this.r]
  }

  overlapping(x = this.pos.x, y = this.pos.y, z = this.pos.z, h = this.h) {
    const b = this.box(x, y, z, h)
    return this.world.anyOverlap(b[0], b[1], b[2], b[3], b[4], b[5])
  }

  teleport(x, y, z) {
    this.pos.x = x; this.pos.y = y; this.pos.z = z
    this.vy = 0
    this.ground = null
    this.grounded = false
    this.lastSafe = { x, y, z }
  }

  // Move along one axis and clamp against whatever we ran into.
  // Returns the collider that stopped us (or null).
  moveAxis(axis, d) {
    if (d === 0) return null
    const p = this.pos
    p[axis] += d
    const b = this.box()
    const hits = this.world.query(b[0], b[1], b[2], b[3], b[4], b[5], this._q)
    let stop = null
    for (const c of hits) {
      stop = c
      if (axis === 'x') p.x = d > 0 ? Math.min(p.x, c.minx - this.r - EPS) : Math.max(p.x, c.maxx + this.r + EPS)
      else if (axis === 'z') p.z = d > 0 ? Math.min(p.z, c.minz - this.r - EPS) : Math.max(p.z, c.maxz + this.r + EPS)
      else p.y = d > 0 ? Math.min(p.y, c.miny - this.h - EPS) : Math.max(p.y, c.maxy + EPS)
    }
    return stop
  }

  moveHorizontal(dx, dz) {
    const p = this.pos
    const sx = p.x, sy = p.y, sz = p.z
    const hx = this.moveAxis('x', dx)
    const hz = this.moveAxis('z', dz)
    if (!(hx || hz) || !this.grounded) return !!(hx || hz)

    // Blocked while on the ground: try stepping up (stairs, kerbs, thresholds).
    const ax = p.x, ay = p.y, az = p.z
    const slide = Math.hypot(ax - sx, az - sz)
    p.x = sx; p.y = sy; p.z = sz
    this.moveAxis('y', this.stepH)
    const raised = p.y - sy
    if (raised > 0.02) {
      this.moveAxis('x', dx)
      this.moveAxis('z', dz)
      const ground = this.moveAxis('y', -(raised + 0.02))
      const stepped = Math.hypot(p.x - sx, p.z - sz)
      if (ground && stepped > slide + 1e-4 && p.y - sy <= this.stepH + 1e-3) {
        this.ground = ground
        return true
      }
    }
    p.x = ax; p.y = ay; p.z = az
    return true
  }

  // Push the player out of anything that moved into it (elevator, doors).
  depenetrate() {
    for (let iter = 0; iter < 4; iter++) {
      const b = this.box()
      const hits = this.world.query(b[0], b[1], b[2], b[3], b[4], b[5], this._q)
      if (!hits.length) return true
      const c = hits[0]
      const p = this.pos
      const up = c.maxy - p.y // push up amount
      const opts = [
        [up <= this.stepH + 0.05 ? up * 0.5 : Infinity, 'y', c.maxy + EPS],
        [Math.abs(c.maxx + this.r - p.x), 'x', c.maxx + this.r + EPS],
        [Math.abs(p.x - (c.minx - this.r)), 'x', c.minx - this.r - EPS],
        [Math.abs(c.maxz + this.r - p.z), 'z', c.maxz + this.r + EPS],
        [Math.abs(p.z - (c.minz - this.r)), 'z', c.minz - this.r - EPS],
      ]
      opts.sort((a, b2) => a[0] - b2[0])
      p[opts[0][1]] = opts[0][2]
    }
    return !this.overlapping()
  }

  canStand() {
    return !this.overlapping(this.pos.x, this.pos.y, this.pos.z, this.hStand)
  }

  // wishX/wishZ: desired horizontal velocity (m/s) in world space.
  update(dt, wishX, wishZ, wantCrouch) {
    // crouch / stand (only stand up when there's headroom)
    if (wantCrouch) { this.h = this.hCrouch; this.crouching = true }
    else if (this.crouching && this.canStand()) { this.h = this.hStand; this.crouching = false }

    const startX = this.pos.x, startZ = this.pos.z
    this.vy -= this.gravity * dt
    if (this.vy < -30) this.vy = -30
    const maxComp = Math.max(Math.abs(wishX * dt), Math.abs(wishZ * dt), Math.abs(this.vy * dt))
    const n = Math.max(1, Math.ceil(maxComp / 0.08))
    const h = dt / n
    for (let i = 0; i < n; i++) {
      this.moveHorizontal(wishX * h, wishZ * h)
      const wasGrounded = this.grounded
      const hit = this.moveAxis('y', this.vy * h)
      this.grounded = false
      if (hit && this.vy <= 0) { this.grounded = true; this.ground = hit; this.vy = 0 }
      else if (hit && this.vy > 0) this.vy = 0
      if (!this.grounded && wasGrounded && this.vy <= 0) {
        // snap down when walking off a step
        const y0 = this.pos.y
        const g = this.moveAxis('y', -this.stepH)
        if (g) { this.grounded = true; this.ground = g; this.vy = 0 } else this.pos.y = y0
      }
      if (!this.grounded) this.ground = null
    }

    const moved = Math.hypot(this.pos.x - startX, this.pos.z - startZ)
    const wanted = Math.hypot(wishX, wishZ) * dt
    this.blockedTime = wanted > 0.001 && moved < wanted * 0.1 ? this.blockedTime + dt : 0

    // remember a safe spot to recover to if something goes badly wrong
    this.safeTimer += dt
    if (this.grounded && this.ground && this.ground.tag !== 'elevator' && this.safeTimer > 0.5 && !this.overlapping()) {
      this.safeTimer = 0
      this.lastSafe = { x: this.pos.x, y: this.pos.y, z: this.pos.z }
    }
  }

  recover() {
    if (!this.lastSafe) return
    this.pos.x = this.lastSafe.x; this.pos.y = this.lastSafe.y; this.pos.z = this.lastSafe.z
    this.vy = 0
  }
}
