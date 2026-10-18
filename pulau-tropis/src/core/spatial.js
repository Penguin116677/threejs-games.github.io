import { rng } from './random.js'

const cellKey = (ix, iz) => (ix + 32768) * 65536 + (iz + 32768)

// Grid ruang sederhana untuk penempatan objek tanpa saling tumpang tindih
// (pohon tidak menembus pohon lain, batu tidak menembus batang, dst.).
// Nanti juga berguna untuk collision di Milestone 2.
export class PlacementGrid {
  constructor(cell = 8) {
    this.cell = cell
    this.cells = new Map()
    this.maxRadius = 0
  }

  add(x, z, radius, kind) {
    const k = cellKey(Math.floor(x / this.cell), Math.floor(z / this.cell))
    let list = this.cells.get(k)
    if (!list) this.cells.set(k, list = [])
    list.push({ x, z, radius, kind })
    this.maxRadius = Math.max(this.maxRadius, radius)
  }

  // panggil fn(obj) untuk setiap objek yang lingkarannya mungkin menyentuh (x, z, radius)
  forEachNear(x, z, radius, fn) {
    const reach = radius + this.maxRadius
    const i0 = Math.floor((x - reach) / this.cell)
    const i1 = Math.floor((x + reach) / this.cell)
    const j0 = Math.floor((z - reach) / this.cell)
    const j1 = Math.floor((z + reach) / this.cell)
    for (let i = i0; i <= i1; i++)
      for (let j = j0; j <= j1; j++) {
        const list = this.cells.get(cellKey(i, j))
        if (list) for (const o of list) if (fn(o) === false) return false
      }
    return true
  }

  isFree(x, z, radius) {
    return this.forEachNear(x, z, radius, o => {
      const dx = o.x - x
      const dz = o.z - z
      const r = o.radius + radius
      return dx * dx + dz * dz >= r * r
    })
  }

  // apakah titik berada di dalam objek berjenis `kind`
  covered(x, z, kind, shrink = 1) {
    return !this.forEachNear(x, z, 0, o => {
      if (o.kind !== kind) return true
      const dx = o.x - x
      const dz = o.z - z
      const r = o.radius * shrink
      return dx * dx + dz * dz >= r * r
    })
  }
}

// Sebar objek secara deterministik di atas tanah, di dalam lingkaran `area` (meter)
// yang mencakup seluruh daratan pulau.
// accept(x, z, h, slope, rand) → boolean. Hasil: [{ x, y, z, r, a, b, c }] (a, b, c = acak 0..1)
export function scatter({ ground, grid, kind, count, seed, radius, accept, area = 370 }) {
  const rand = rng(seed)
  const out = []
  for (let tries = 0; out.length < count && tries < count * 150; tries++) {
    const d = area * Math.sqrt(rand())
    const ang = rand() * Math.PI * 2
    const x = Math.cos(ang) * d
    const z = Math.sin(ang) * d
    const h = ground.heightAt(x, z)
    if (!accept(x, z, h, ground.slopeAt(x, z), rand)) continue
    const r = typeof radius === 'function' ? radius(rand) : radius
    if (!grid.isFree(x, z, r)) continue
    grid.add(x, z, r, kind)
    out.push({ x, y: h, z, r, a: rand(), b: rand(), c: rand() })
  }
  return out
}
