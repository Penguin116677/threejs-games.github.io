import * as THREE from 'three'
import { segmentDistance, rectDistance } from './layout.js'

// Masker permukaan Kepulauan Kencana (1 texel = 1 m), dibaca shader tanah:
//   r = jalan tanah, g = sawah, b = lantai batu, a = rumput halus.
// Ditambah peta "terpakai" (jalan, lantai, sawah, jejak bangunan) untuk menjauhkan pohon.
export const MASK = { x0: -980, z0: -470, x1: -150, z1: 480 }

export function createRegionMask(plan, ground) {
  const w = MASK.x1 - MASK.x0
  const h = MASK.z1 - MASK.z0
  const data = new Uint8Array(w * h * 4)
  const used = new Uint8Array(w * h)
  const cx = i => MASK.x0 + i + 0.5
  const cz = j => MASK.z0 + j + 0.5

  // cat kanal ch dengan cakupan 0..1 (tepi lembut ±0,5 m) di kotak batas [x0, x1] × [z0, z1]
  function paint(ch, x0, z0, x1, z1, coverage) {
    const i0 = Math.max(0, Math.floor(x0 - MASK.x0))
    const i1 = Math.min(w - 1, Math.ceil(x1 - MASK.x0))
    const j0 = Math.max(0, Math.floor(z0 - MASK.z0))
    const j1 = Math.min(h - 1, Math.ceil(z1 - MASK.z0))
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        const c = coverage(cx(i), cz(j))
        if (c <= 0) continue
        const k = (j * w + i) * 4 + ch
        data[k] = Math.max(data[k], Math.round(Math.min(1, c) * 255))
      }
  }
  const soft = d => Math.min(1, Math.max(0, 0.5 - d))

  // sawah: hanya di dataran rendah yang landai, di atas pasir pantai (bukan bukit)
  const paddy = (x, z) => {
    const y = ground.heightAt(x, z)
    return y > 2.5 && y < 14 && ground.slopeAt(x, z) < 0.22
  }
  for (const f of plan.fields)
    if (f.r) paint(1, f.x - f.r, f.z - f.r, f.x + f.r, f.z + f.r, (x, z) => (paddy(x, z) ? soft(Math.hypot(x - f.x, z - f.z) - f.r) : 0))
    else paint(1, f.x0, f.z0, f.x1, f.z1, (x, z) => (paddy(x, z) ? soft(rectDistance(x, z, f)) : 0))
  for (const l of plan.lawn) paint(3, l.x0 - 1, l.z0 - 1, l.x1 + 1, l.z1 + 1, (x, z) => soft(rectDistance(x, z, l)))
  for (const [ax, az, bx, bz, rw] of plan.roads)
    paint(0, Math.min(ax, bx) - rw, Math.min(az, bz) - rw, Math.max(ax, bx) + rw, Math.max(az, bz) + rw,
      (x, z) => soft(segmentDistance(x, z, ax, az, bx, bz) - rw / 2))
  for (const p of plan.pave) paint(2, p.x0 - 1, p.z0 - 1, p.x1 + 1, p.z1 + 1, (x, z) => soft(rectDistance(x, z, p)))

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
    for (let j = Math.max(0, Math.floor(b.z - r - MASK.z0)); j <= Math.min(h - 1, Math.ceil(b.z + r - MASK.z0)); j++)
      for (let i = Math.max(0, Math.floor(b.x - r - MASK.x0)); i <= Math.min(w - 1, Math.ceil(b.x + r - MASK.x0)); i++) {
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
    const i = Math.floor(x - MASK.x0)
    const j = Math.floor(z - MASK.z0)
    return i >= 0 && j >= 0 && i < w && j < h && used[j * w + i] === 1
  }
  return {
    texture, data, x0: MASK.x0, z0: MASK.z0, width: w, depth: h,
    // apakah lingkaran (x, z, r) menyentuh jalan, lantai, sawah, atau bangunan
    reserved: (x, z, r = 0) => usedAt(x, z) || usedAt(x + r, z) || usedAt(x - r, z) || usedAt(x, z + r) || usedAt(x, z - r),
    // nilai kanal (0..1) di titik (x, z) — untuk pengujian & peta
    at(x, z) {
      const i = Math.floor(x - MASK.x0)
      const j = Math.floor(z - MASK.z0)
      if (i < 0 || j < 0 || i >= w || j >= h) return null
      const k = (j * w + i) * 4
      return { jalan: data[k] / 255, sawah: data[k + 1] / 255, batu: data[k + 2] / 255, rumput: data[k + 3] / 255 }
    },
  }
}
