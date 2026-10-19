import { ISLAND } from './island.js'

// Peta jalan untuk "ketuk untuk berjalan": grid 2 m di atas seluruh pulau.
// Sel bisa dilewati bila tidak terlalu dalam di air, tidak terlalu curam, dan tidak
// tertutup batang pohon / batu besar. Jalur dicari dengan A* (8 arah) lalu diluruskan
// (titik belok yang tidak perlu dibuang), jadi pemain berjalan memutari rintangan.
// Garis lurus antar titik jalur juga dicek langsung ke collider (lebih tepat dari sel 2 m).
const CELL = 2 // m
const MAX_DEPTH = 1.0 // air lebih dalam dari ini tidak dilewati
const MAX_SLOPE = 1.25 // sedikit di bawah batas pemain (1,3) agar jalur pasti bisa didaki
const BODY = 0.45 // jari-jari pemain + ruang sedikit
const MAX_EXPANSIONS = 120000
const { SQRT2 } = Math
// ruas ke sel tetangga, disimpan sebagai bit di sel (i, j):
// 1 = ke (i+1, j), 2 = ke (i, j+1), 4 = ke (i+1, j+1), 8 = ke (i-1, j+1)
const EDGES = [[1, 0, 1], [0, 1, 2], [1, 1, 4], [-1, 1, 8]]

// jarak² titik p ke ruas a–b
function segDist2(ax, az, bx, bz, px, pz) {
  const vx = bx - ax
  const vz = bz - az
  const t = Math.max(0, Math.min(1, ((px - ax) * vx + (pz - az) * vz) / (vx * vx + vz * vz)))
  const dx = ax + vx * t - px
  const dz = az + vz * t - pz
  return dx * dx + dz * dz
}

// antrean prioritas (binary heap) untuk A*
class Heap {
  constructor(capacity) {
    this.idx = new Int32Array(capacity)
    this.key = new Float64Array(capacity)
    this.size = 0
  }

  push(i, k) {
    let n = this.size++
    while (n > 0) {
      const p = (n - 1) >> 1
      if (this.key[p] <= k) break
      this.idx[n] = this.idx[p]
      this.key[n] = this.key[p]
      n = p
    }
    this.idx[n] = i
    this.key[n] = k
  }

  pop() {
    const top = this.idx[0]
    const lastI = this.idx[--this.size]
    const lastK = this.key[this.size]
    let n = 0
    for (;;) {
      let c = 2 * n + 1
      if (c >= this.size) break
      if (c + 1 < this.size && this.key[c + 1] < this.key[c]) c++
      if (this.key[c] >= lastK) break
      this.idx[n] = this.idx[c]
      this.key[n] = this.key[c]
      n = c
    }
    this.idx[n] = lastI
    this.key[n] = lastK
    return top
  }
}

// colliders: hasil createColliders (list + isFree)
export function createNavGrid(ground, colliders) {
  const half = ISLAND.size / 2
  const n = Math.round(ISLAND.size / CELL)
  const N = n * n
  const H = new Float32Array(N)
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) H[j * n + i] = ground.heightAt(-half + (i + 0.5) * CELL, -half + (j + 0.5) * CELL)

  const walk = new Uint8Array(N)
  for (let j = 1; j < n - 1; j++)
    for (let i = 1; i < n - 1; i++) {
      const k = j * n + i
      if (H[k] < -MAX_DEPTH) continue
      const gx = (H[k + 1] - H[k - 1]) / (2 * CELL)
      const gz = (H[k + n] - H[k - n]) / (2 * CELL)
      if (Math.hypot(gx, gz) <= MAX_SLOPE) walk[k] = 1
    }
  // penghalang: tutup sel yang terlalu dekat, dan tandai ruas antar sel yang menyerempetnya
  // (dua pusat sel bisa sama-sama lapang, tapi garis di antaranya menyentuh batang pohon)
  const edge = new Uint8Array(N)
  const at = i => -half + (i + 0.5) * CELL // pusat sel ke-i (sumbu x atau z)
  for (const c of colliders.list) {
    const r = c.radius + BODY
    const i0 = Math.max(0, Math.floor((c.x - r + half) / CELL) - 1)
    const i1 = Math.min(n - 1, Math.floor((c.x + r + half) / CELL) + 1)
    const j0 = Math.max(0, Math.floor((c.z - r + half) / CELL) - 1)
    const j1 = Math.min(n - 1, Math.floor((c.z + r + half) / CELL) + 1)
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        const k = j * n + i
        const dx = at(i) - c.x
        const dz = at(j) - c.z
        if (dx * dx + dz * dz < r * r) walk[k] = 0
        for (const [di, dj, bit] of EDGES) {
          const ni = i + di
          const nj = j + dj
          if (ni < 0 || ni >= n || nj >= n) continue
          if (segDist2(at(i), at(j), at(ni), at(nj), c.x, c.z) < r * r) edge[k] |= bit
        }
      }
    // sel tempat pusat penghalang selalu tertutup (penghalang kecil di sudut sel)
    if (Math.abs(c.x) < half && Math.abs(c.z) < half)
      walk[Math.floor((c.z + half) / CELL) * n + Math.floor((c.x + half) / CELL)] = 0
  }
  // ruas dari sel (i, j) ke tetangga (i + di, j + dj) menyerempet penghalang?
  function edgeBlocked(i, j, di, dj) {
    if (dj === 0) return edge[j * n + Math.min(i, i + di)] & 1
    if (di === 0) return edge[Math.min(j, j + dj) * n + i] & 2
    if (di === dj) return edge[Math.min(j, j + dj) * n + Math.min(i, i + di)] & 4
    return dj > 0 ? edge[j * n + i] & 8 : edge[(j + dj) * n + i + di] & 8
  }

  const g = new Float32Array(N)
  const came = new Int32Array(N)
  const closed = new Uint8Array(N)
  const heap = new Heap(N * 2)

  const cellIndex = (x, z) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor((x + half) / CELL)))
    const j = Math.min(n - 1, Math.max(0, Math.floor((z + half) / CELL)))
    return j * n + i
  }
  const cx = k => -half + ((k % n) + 0.5) * CELL
  const cz = k => -half + (Math.floor(k / n) + 0.5) * CELL
  const walkableAt = (x, z) => {
    if (Math.abs(x) >= half || Math.abs(z) >= half) return false
    return walk[cellIndex(x, z)] === 1
  }
  // bisa diinjak: sel lapang dan badan pemain tidak menyentuh penghalang
  const standable = (x, z) => walkableAt(x, z) && colliders.isFree(x, z, BODY)

  // garis lurus a→b bisa dilewati? (cek tiap ±0,5 m, termasuk kemiringan antar titik)
  function lineClear(ax, az, bx, bz) {
    const len = Math.hypot(bx - ax, bz - az)
    const steps = Math.max(1, Math.ceil(len / 0.5))
    let prevH = ground.heightAt(ax, az)
    for (let s = 1; s <= steps; s++) {
      const x = ax + (bx - ax) * s / steps
      const z = az + (bz - az) * s / steps
      if (!standable(x, z)) return false
      const h = ground.heightAt(x, z)
      if (Math.abs(h - prevH) / (len / steps) > MAX_SLOPE) return false
      prevH = h
    }
    return true
  }

  // titik tujuan yang tidak bisa diinjak (laut dalam, batang pohon, tebing):
  // mundur sepanjang garis ke arah pemain sampai ketemu sel yang bisa diinjak
  function resolveTarget(tx, tz, fx, fz) {
    if (standable(tx, tz)) return { x: tx, z: tz }
    // mengetuk laut: berhenti di air dangkal (±setinggi lutut), bukan di batas air dalam
    const sea = ground.heightAt(tx, tz) < -MAX_DEPTH
    const len = Math.hypot(fx - tx, fz - tz)
    const steps = Math.ceil(len / (CELL * 0.5))
    for (let s = 1; s <= steps; s++) {
      const x = tx + (fx - tx) * s / steps
      const z = tz + (fz - tz) * s / steps
      if (standable(x, z) && (!sea || ground.heightAt(x, z) > -0.4)) return { x, z }
    }
    return null
  }

  // sel terdekat yang bisa diinjak (untuk posisi awal pemain yang sedikit masuk area terhalang)
  function nearestWalkable(k, maxR = 5) {
    if (walk[k]) return k
    const i0 = k % n
    const j0 = Math.floor(k / n)
    for (let r = 1; r <= maxR; r++)
      for (let dj = -r; dj <= r; dj++)
        for (let di = -r; di <= r; di++) {
          if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue
          const i = i0 + di
          const j = j0 + dj
          if (i < 0 || j < 0 || i >= n || j >= n) continue
          if (walk[j * n + i]) return j * n + i
        }
    return -1
  }

  const NEIGHBORS = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, SQRT2], [1, -1, SQRT2], [-1, 1, SQRT2], [-1, -1, SQRT2]]

  // Cari jalur dari posisi pemain ke titik yang diketuk. Hasil: [{ x, z }, …] (tanpa titik awal)
  // atau null bila tidak ada jalan.
  function findPath(from, to) {
    const target = resolveTarget(to.x, to.z, from.x, from.z)
    if (!target) return null
    // dekat dan lurus: tidak perlu A*
    if (Math.hypot(target.x - from.x, target.z - from.z) < 40 && lineClear(from.x, from.z, target.x, target.z))
      return [target]
    const s = nearestWalkable(cellIndex(from.x, from.z))
    const t = nearestWalkable(cellIndex(target.x, target.z))
    if (s < 0 || t < 0) return null

    g.fill(Infinity)
    closed.fill(0)
    heap.size = 0
    const ti = t % n
    const tj = Math.floor(t / n)
    const h = k => {
      const dx = Math.abs((k % n) - ti)
      const dz = Math.abs(Math.floor(k / n) - tj)
      return (dx + dz) + (SQRT2 - 2) * Math.min(dx, dz)
    }
    g[s] = 0
    heap.push(s, h(s))
    let expansions = 0
    let found = false
    while (heap.size) {
      const k = heap.pop()
      if (k === t) {
        found = true
        break
      }
      if (closed[k]) continue
      closed[k] = 1
      if (++expansions > MAX_EXPANSIONS) break
      const i = k % n
      const j = Math.floor(k / n)
      for (const [di, dj, cost] of NEIGHBORS) {
        const ni = i + di
        const nj = j + dj
        if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue
        const nk = nj * n + ni
        if (!walk[nk] || closed[nk]) continue
        // jangan memotong sudut lewat sel terhalang
        if (di && dj && (!walk[j * n + ni] || !walk[nj * n + i])) continue
        if (edgeBlocked(i, j, di, dj)) continue
        if (Math.abs(H[nk] - H[k]) / (cost * CELL) > MAX_SLOPE) continue
        const ng = g[k] + cost
        if (ng < g[nk]) {
          g[nk] = ng
          came[nk] = k
          heap.push(nk, ng + h(nk))
        }
      }
    }
    if (!found) return null

    // susun jalur: posisi pemain → pusat sel-sel → titik tujuan, lalu luruskan
    const cells = [t]
    for (let k = t; k !== s;) {
      k = came[k]
      cells.push(k)
    }
    cells.reverse()
    const pts = [from, ...cells.map(k => ({ x: cx(k), z: cz(k) })), target]
    const out = []
    for (let i = 0; i < pts.length - 1;) {
      // maju sejauh mungkin selama garis lurus dari titik sekarang masih bisa dilewati
      let j = i + 1
      while (j + 1 < pts.length && lineClear(pts[i].x, pts[i].z, pts[j + 1].x, pts[j + 1].z)) j++
      out.push(pts[j])
      i = j
    }
    return out
  }

  return { findPath, walkableAt, cellSize: CELL, size: n }
}
