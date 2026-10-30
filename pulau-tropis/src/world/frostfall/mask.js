import * as THREE from 'three'
import { polyInfo, polyBox, rectDist, segmentInfo, COLD_X0, COLD_X1 } from './layout.js'
import { caveFloor, CAVE_BOX } from './height.js'

// Masker permukaan Kerajaan Frostfall (1 texel = cell m), dibaca shader tanah (FROST_REGION):
//   r = jalan / jejak di salju, g = es (sungai & danau beku), b = lantai batu, a = gua.
// Ditambah peta "terpakai" (jalan, es, lantai, gua, jejak bangunan) untuk menjauhkan pohon & batu.
export const FROST_MASK = { x0: 190, z0: -580, x1: 1440, z1: 540 }

export function createFrostMask(plan, { rect = FROST_MASK, cell = 1.5 } = {}) {
  const w = Math.round((rect.x1 - rect.x0) / cell)
  const h = Math.round((rect.z1 - rect.z0) / cell)
  const data = new Uint8Array(w * h * 4)
  const used = new Uint8Array(w * h)
  const cx = i => rect.x0 + (i + 0.5) * cell
  const cz = j => rect.z0 + (j + 0.5) * cell
  const col = x => Math.floor((x - rect.x0) / cell)
  const row = z => Math.floor((z - rect.z0) / cell)

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

  // gua: rongga + 1 texel (dindingnya ikut berwarna batu gua)
  paint(3, CAVE_BOX.x0, CAVE_BOX.z0, CAVE_BOX.x1, CAVE_BOX.z1, (x, z) => {
    if (caveFloor(x, z) !== null) return 1
    for (const [dx, dz] of [[cell, 0], [-cell, 0], [0, cell], [0, -cell]]) if (caveFloor(x + dx, z + dz) !== null) return 0.85
    return 0
  })
  // es: sungai (lebar per titik) & elips (danau, kolam air terjun) — tepinya bersalju tipis
  for (const ic of plan.ice)
    if (ic.line) {
      const b = polyBox(ic.line, 12)
      paint(1, b.x0, b.z0, b.x1, b.z1, (x, z) => {
        const r = polyInfo(ic.line, x, z, ['w'])
        return soft(r.d - r.w / 2 + 0.6)
      })
    } else {
      const e = ic.ellipse
      paint(1, e.x - e.rx - 2, e.z - e.rz - 2, e.x + e.rx + 2, e.z + e.rz + 2, (x, z) => soft((Math.hypot((x - e.x) / e.rx, (z - e.z) / e.rz) - 1) * Math.min(e.rx, e.rz)))
    }
  for (const p of plan.pave) paint(2, p.x0 - 1, p.z0 - 1, p.x1 + 1, p.z1 + 1, (x, z) => soft(rectDist(x, z, p)))
  for (const [ax, az, bx, bz, rw] of plan.roads)
    paint(0, Math.min(ax, bx) - rw, Math.min(az, bz) - rw, Math.max(ax, bx) + rw, Math.max(az, bz) + rw,
      (x, z) => soft(segmentInfo(x, z, ax, az, bx, bz).d - rw / 2))

  // lantai batu & es menutup cat jalan di bawahnya (jalan yang melintas di atas jembatan tidak
  // menutupi es sungai di bawahnya)
  for (let k = 0; k < w * h; k++) {
    const pave = data[k * 4 + 2] / 255
    data[k * 4] = Math.round(data[k * 4] * (1 - pave))
    const ice = data[k * 4 + 1] / 255
    data[k * 4] = Math.round(data[k * 4] * (1 - ice))
    if (data[k * 4] > 60 || data[k * 4 + 1] > 60 || data[k * 4 + 2] > 60 || data[k * 4 + 3] > 60) used[k] = 1
  }
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
    const i = col(x)
    const j = row(z)
    return i >= 0 && j >= 0 && i < w && j < h && used[j * w + i] === 1
  }
  return {
    texture, data, x0: rect.x0, z0: rect.z0, width: rect.x1 - rect.x0, depth: rect.z1 - rect.z0, cold: [COLD_X0, COLD_X1],
    reserved: (x, z, r = 0) => usedAt(x, z) || usedAt(x + r, z) || usedAt(x - r, z) || usedAt(x, z + r) || usedAt(x, z - r),
    at(x, z) {
      const i = col(x)
      const j = row(z)
      if (i < 0 || j < 0 || i >= w || j >= h) return null
      const k = (j * w + i) * 4
      return { jalan: data[k] / 255, es: data[k + 1] / 255, batu: data[k + 2] / 255, gua: data[k + 3] / 255 }
    },
  }
}
