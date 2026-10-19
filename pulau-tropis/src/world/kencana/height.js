import { fbm, smoothstep } from '../../core/noise.js'
import { ISLANDS, CITY, PURA, BRIDGES, rectDistance } from './layout.js'

// Bentuk tanah Kepulauan Kencana. Profil pantainya sama dengan Pulau Tropis (dasar laut → paparan
// dangkal → pantai pasir landai) supaya ombak, pasir basah, dan warna air berlaku sama.
const SEA_FLOOR = -18
// kotak yang memuat semua pulau barat + paparannya (di luar ini = dasar laut, tanpa noise)
const BOX = { x0: -1000, x1: -180, z0: -500, z1: 500 }
// ujung jembatan: tempat tanah turun di bawah tinggi ini (±tepi atas pantai pasir)
export const BRIDGE_END_Y = 2.0
// tinggi halaman pura: sedikit di bawah puncak alami bukitnya
const PURA_Y = 8.5

function islandHeight(isl, x, z) {
  const dx = x - isl.x
  const dz = z - isl.z
  const reach = isl.r * (1 + isl.wobble) * 1.38
  const d2 = dx * dx + dz * dz
  if (d2 > reach * reach) return SEA_FLOOR
  // garis pantai sedikit berkelok (noise), bukan lingkaran sempurna
  const shape = fbm(x * 0.009 + isl.seed * 1.7, z * 0.009 - isl.seed, 3, isl.seed)
  const t = Math.sqrt(d2) / (isl.r * (1 + (shape - 0.5) * 2 * isl.wobble))
  let h = SEA_FLOOR + (-SEA_FLOOR - 1.2) * smoothstep(1.38, 1.02, t)
  h += 3.6 * smoothstep(1.04, 0.87, t)
  const inland = smoothstep(0.92, 0.45, t)
  h += inland * inland * fbm(x * 0.012 + isl.seed, z * 0.012 - isl.seed * 2, 4, isl.seed + 9) * isl.hills
  h += (fbm(x * 0.08, z * 0.08, 2, 21 + isl.seed) - 0.5) * 0.5 * inland

  if (isl.id === 'kencana') {
    // dataran kota: rata setinggi CITY.y sampai 8 m di luar tembok, memudar sampai 35 m —
    // tidak pernah sampai ke pantai (t < 0,95)
    const flat = (1 - smoothstep(8, 35, rectDistance(x, z, CITY))) * smoothstep(0.95, 0.8, t)
    h += (CITY.y - h) * flat
  } else if (isl.id === 'pura') {
    // halaman pura di puncak bukit: rata, tepinya landai menyatu dengan lereng
    const f = 1 - smoothstep(PURA.r * 0.7, PURA.r * 1.25, Math.hypot(x - PURA.x, z - PURA.z))
    h += (PURA_Y - h) * f
  }
  return h
}

// Tinggi tanah alami Kepulauan Kencana (dasar laut −18 di luar pulau-pulaunya).
export function westHeight(x, z) {
  if (x < BOX.x0 || x > BOX.x1 || z < BOX.z0 || z > BOX.z1) return SEA_FLOOR
  let h = SEA_FLOOR
  for (const isl of ISLANDS) h = Math.max(h, islandHeight(isl, x, z))
  return h
}

// Bentang jembatan di atas air: dari titik darat `from` berjalan ke arah `to`, cari tempat tanah
// turun di bawah BRIDGE_END_Y (a) lalu naik lagi di atasnya (b). heightAt = tinggi tanah dunia.
// Hasil: [{ ...jembatan, a, b, length }] — a, b = koordinat sepanjang sumbu jembatan.
export function bridgeSpans(heightAt) {
  return BRIDGES.map(br => {
    const dir = Math.sign(br.to - br.from)
    const at = s => (br.axis === 'x' ? heightAt(s, br.at) : heightAt(br.at, s))
    let a = null
    let b = null
    for (let s = br.from; dir * (br.to - s) >= 0; s += dir * 0.25) {
      const h = at(s)
      if (a === null && h < BRIDGE_END_Y) a = s
      else if (a !== null && h >= BRIDGE_END_Y) {
        b = s
        break
      }
    }
    if (a === null || b === null) throw new Error(`ujung ${br.name} tidak ditemukan`)
    return { ...br, a, b, length: Math.abs(b - a) }
  })
}
