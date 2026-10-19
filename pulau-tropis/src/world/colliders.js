import { PlacementGrid } from '../core/spatial.js'

// Penghalang berbentuk lingkaran (batang pohon, batu besar) untuk collision pemain.
// list: [{ x, z, radius, kind }] — kind: 'pohon' / 'batu' (untuk efek pukulan)
export function createColliders(list) {
  const grid = new PlacementGrid(8)
  for (const c of list) grid.add(c.x, c.z, c.radius, c.kind || 'blok')

  return {
    list,
    count: list.length,
    // Dorong lingkaran pemain (pos.x, pos.z, r) keluar dari semua penghalang dan
    // hilangkan komponen kecepatan yang menembus penghalang. Kembalikan true bila menabrak.
    resolve(pos, r, vel) {
      let hit = false
      grid.forEachNear(pos.x, pos.z, r, o => {
        const dx = pos.x - o.x
        const dz = pos.z - o.z
        const min = o.radius + r
        const d2 = dx * dx + dz * dz
        if (d2 >= min * min) return true
        const d = Math.sqrt(d2) || 1e-4
        const nx = d2 > 1e-8 ? dx / d : 1
        const nz = d2 > 1e-8 ? dz / d : 0
        pos.x = o.x + nx * min
        pos.z = o.z + nz * min
        const vn = vel.x * nx + vel.z * nz
        if (vn < 0) {
          vel.x -= vn * nx
          vel.z -= vn * nz
        }
        hit = true
        return true
      })
      return hit
    },
    // apakah titik (x, z) dengan jari-jari r bebas dari penghalang
    isFree(x, z, r) {
      return grid.isFree(x, z, r)
    },
    // penghalang terdekat yang tersentuh lingkaran (x, z, r) — mis. ayunan pedang; null bila tidak ada
    hitAt(x, z, r) {
      let best = null
      let bestGap = r
      grid.forEachNear(x, z, r, o => {
        const gap = Math.hypot(o.x - x, o.z - z) - o.radius
        if (gap < bestGap) {
          bestGap = gap
          best = o
        }
        return true
      })
      return best
    },
    // semua penghalang yang tersentuh lingkaran (x, z, r), terdekat lebih dulu (maks. max) —
    // untuk serangan yang mengenai sekeliling (Tebasan Putar, Hentakan)
    hitAll(x, z, r, max = 8) {
      const hits = []
      grid.forEachNear(x, z, r, o => {
        const gap = Math.hypot(o.x - x, o.z - z) - o.radius
        if (gap < r) hits.push({ o, gap })
        return true
      })
      return hits.sort((a, b) => a.gap - b.gap).slice(0, max).map(h => h.o)
    },
  }
}
