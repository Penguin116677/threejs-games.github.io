import * as THREE from 'three'
import { segmentDistance, rectDistance } from './layout.js'

// Masker permukaan sebuah wilayah (bawaan: Kepulauan Kencana, 1 texel = 1 m), dibaca shader tanah:
//   r = jalan tanah, g = sawah / ladang, b = lantai batu, a = rumput halus.
// Ditambah peta "terpakai" (jalan, lantai, sawah, jejak bangunan) untuk menjauhkan pohon.
export const MASK = { x0: -980, z0: -470, x1: -30, z1: 640 }
// sampai v0.10.0 masker berakhir di x = −150; pulau tengah tetap memakai batas itu supaya letak
// pohon & batunya sama persis (masker kini melebar ke timur hanya untuk Pulau Wira)
const OLD_EDGE = -150
const kencanaFree = (x, z) => x >= OLD_EDGE && z < 300

// rect = area masker (m), cell = ukuran texel (m), style = gaya warna ladang & lantai di shader tanah
// (0 = sawah Kencana, 1 = ladang gandum & batu putih Aeloria), free(x, z) = titik yang tidak pernah
// dianggap terpakai
export function createRegionMask(plan, ground, { rect = MASK, cell = 1, style = 0, free = kencanaFree } = {}) {
  const w = Math.round((rect.x1 - rect.x0) / cell)
  const h = Math.round((rect.z1 - rect.z0) / cell)
  const data = new Uint8Array(w * h * 4)
  const used = new Uint8Array(w * h)
  const cx = i => rect.x0 + (i + 0.5) * cell
  const cz = j => rect.z0 + (j + 0.5) * cell
  const col = x => Math.floor((x - rect.x0) / cell)
  const row = z => Math.floor((z - rect.z0) / cell)

  // cat kanal ch dengan cakupan 0..1 (tepi lembut ±0,5 texel) di kotak batas [x0, x1] × [z0, z1]
  function paint(ch, x0, z0, x1, z1, coverage) {
    const i0 = Math.max(0, col(x0))
    const i1 = Math.min(w - 1, col(x1) + 1)
    const j0 = Math.max(0, row(z0))
    const j1 = Math.min(h - 1, row(z1) + 1)
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        const c = coverage(cx(i), cz(j))
        if (c <= 0) continue
        const k = (j * w + i) * 4 + ch
        data[k] = Math.max(data[k], Math.round(Math.min(1, c) * 255))
      }
  }
  const soft = d => Math.min(1, Math.max(0, 0.5 - d / cell))

  // sawah: hanya di dataran rendah yang landai, di atas pasir pantai (bukan bukit)
  const paddy = (x, z) => {
    const y = ground.heightAt(x, z)
    return y > 2.5 && y < 14 && ground.slopeAt(x, z) < 0.22
  }
  for (const f of plan.fields)
    if (f.r) paint(1, f.x - f.r, f.z - f.r, f.x + f.r, f.z + f.r, (x, z) => (paddy(x, z) ? soft(Math.hypot(x - f.x, z - f.z) - f.r) : 0))
    else paint(1, f.x0, f.z0, f.x1, f.z1, (x, z) => (paddy(x, z) ? soft(rectDistance(x, z, f)) : 0))
  for (const l of plan.lawn) paint(3, l.x0 - 1, l.z0 - 1, l.x1 + 1, l.z1 + 1, (x, z) => soft(rectDistance(x, z, l)))
  for (const [ax, az, bx, bz, rw] of [...plan.roads, ...plan.tracks])
    paint(0, Math.min(ax, bx) - rw, Math.min(az, bz) - rw, Math.max(ax, bx) + rw, Math.max(az, bz) + rw,
      (x, z) => soft(segmentDistance(x, z, ax, az, bx, bz) - rw / 2))
  for (const p of plan.pave) paint(2, p.x0 - 1, p.z0 - 1, p.x1 + 1, p.z1 + 1, (x, z) => soft(rectDistance(x, z, p)))
  // lapangan tanah (mis. arena tanding Aeloria): dicat seperti jalan tanah
  for (const d of plan.dirt || []) paint(0, d.x0 - 1, d.z0 - 1, d.x1 + 1, d.z1 + 1, (x, z) => soft(rectDistance(x, z, d)))

  // jalan & lantai menutup sawah/rumput di bawahnya
  for (let k = 0; k < w * h; k++) {
    const cover = Math.max(data[k * 4], data[k * 4 + 2]) / 255
    data[k * 4 + 1] = Math.round(data[k * 4 + 1] * (1 - cover))
    data[k * 4 + 3] = Math.round(data[k * 4 + 3] * (1 - cover))
    if (data[k * 4] > 60 || data[k * 4 + 1] > 60 || data[k * 4 + 2] > 60) used[k] = 1
  }
  // jejak bangunan (+1 m)
  for (const b of plan.blocked) {
    const r = Math.hypot(b.hx, b.hz) + 1
    const c = Math.cos(b.rot || 0)
    const s = Math.sin(b.rot || 0)
    for (let j = Math.max(0, row(b.z - r)); j <= Math.min(h - 1, row(b.z + r) + 1); j++)
      for (let i = Math.max(0, col(b.x - r)); i <= Math.min(w - 1, col(b.x + r) + 1); i++) {
        const dx = cx(i) - b.x
        const dz = cz(j) - b.z
        if (Math.abs(dx * c - dz * s) <= b.hx + 1 && Math.abs(dx * s + dz * c) <= b.hz + 1) used[j * w + i] = 1
      }
  }

  const texture = new THREE.DataTexture(data, w, h, THREE.RGBAFormat, THREE.UnsignedByteType)
  texture.magFilter = THREE.LinearFilter
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.generateMipmaps = true
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true

  const usedAt = (x, z) => {
    if (free && free(x, z)) return false
    const i = col(x)
    const j = row(z)
    return i >= 0 && j >= 0 && i < w && j < h && used[j * w + i] === 1
  }
  return {
    texture, data, x0: rect.x0, z0: rect.z0, width: rect.x1 - rect.x0, depth: rect.z1 - rect.z0, style,
    // apakah lingkaran (x, z, r) menyentuh jalan, lantai, sawah, atau bangunan
    reserved: (x, z, r = 0) => usedAt(x, z) || usedAt(x + r, z) || usedAt(x - r, z) || usedAt(x, z + r) || usedAt(x, z - r),
    // nilai kanal (0..1) di titik (x, z) — untuk pengujian & peta
    at(x, z) {
      const i = col(x)
      const j = row(z)
      if (i < 0 || j < 0 || i >= w || j >= h) return null
      const k = (j * w + i) * 4
      return { jalan: data[k] / 255, sawah: data[k + 1] / 255, batu: data[k + 2] / 255, rumput: data[k + 3] / 255 }
    },
  }
}
