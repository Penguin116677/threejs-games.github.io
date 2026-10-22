import { fbm, smoothstep } from '../../core/noise.js'
import { rectDistance } from '../kencana/layout.js'
import { LANDS, TOWN, MESS, TRAINING, FEAST, CITADEL, CAMPS, FIELDS, ORCHARDS, landDistance } from './layout.js'

// Bentuk tanah Aeloria. Profil pantainya sama dengan Pulau Tropis & Kepulauan Kencana (dasar laut →
// paparan dangkal → pantai pasir landai), jadi ombak, pasir basah, dan warna air berlaku sama.
// Pedalaman berbukit (hutan elf); kawasan kota, balai makan, lapangan latihan, padang pesta,
// perkemahan, dan benteng diratakan, tepinya landai menyatu dengan bukit.
const SEA_FLOOR = -18
// kotak yang memuat daratan + paparannya (di luar ini = dasar laut, tanpa noise)
const BOX = { x0: -640, x1: 640, z0: -1260, z1: -330 }
// dataran yang diratakan: kotak, tinggi, jarak datar penuh di luar kotak, kekuatan (ladang hanya
// dilandaikan sebagian supaya tetap mengikuti bukit)
const FLATS = [
  { r: TOWN, y: TOWN.y, pad: 8, k: 1 },
  { r: MESS, y: MESS.y, pad: 6, k: 1 },
  { r: TRAINING, y: TRAINING.y, pad: 6, k: 1 },
  { r: FEAST, y: FEAST.y, pad: 6, k: 1 },
  { r: CITADEL, y: CITADEL.y, pad: 9, k: 1 },
  ...CAMPS.map(c => ({ r: c, y: 10, pad: 4, k: 0.9 })),
  ...[...FIELDS, ...ORCHARDS].map(f => ({ r: f, y: null, pad: 3, k: 0.75 })),
]

// tinggi tanah satu daratan + jarak ternormalisasinya ke pantai, atau null bila jauh di laut
function landHeight(l, x, z) {
  const u = landDistance(l, x, z)
  if (u > (1 + l.wobble) * 1.38) return null
  // garis pantai sedikit berkelok (noise), bukan elips sempurna
  const shape = fbm(x * 0.009 + l.seed * 1.7, z * 0.009 - l.seed, 3, l.seed)
  const t = u / (1 + (shape - 0.5) * 2 * l.wobble)
  let h = SEA_FLOOR + (-SEA_FLOOR - 1.2) * smoothstep(1.38, 1.02, t)
  h += 3.6 * smoothstep(1.04, 0.87, t)
  const inland = smoothstep(0.92, 0.45, t)
  h += inland * inland * fbm(x * 0.011 + l.seed, z * 0.011 - l.seed * 2, 4, l.seed + 9) * l.hills
  h += (fbm(x * 0.08, z * 0.08, 2, 21 + l.seed) - 0.5) * 0.5 * inland
  return { h, t }
}

// Tinggi tanah alami Aeloria (dasar laut −18 di luar daratannya).
export function northHeight(x, z) {
  if (x < BOX.x0 || x > BOX.x1 || z < BOX.z0 || z > BOX.z1) return SEA_FLOOR
  let h = SEA_FLOOR
  let t = 9
  for (const l of LANDS) {
    const r = landHeight(l, x, z)
    if (!r) continue
    h = Math.max(h, r.h)
    t = Math.min(t, r.t)
  }
  if (t > 0.95) return h
  // kawasan yang diratakan — tidak pernah sampai ke pantai (t < 0,95)
  const coast = smoothstep(0.95, 0.8, t)
  for (const f of FLATS) {
    const d = rectDistance(x, z, f.r)
    if (d > f.pad + 30) continue
    const w = (1 - smoothstep(f.pad, f.pad + 30, d)) * coast * f.k
    // ladang: dilandaikan ke tinggi rata-rata bukit sekitarnya (bukan tinggi tetap)
    const y = f.y ?? 4.5 + (fbm(f.r.x0 * 0.01, f.r.z0 * 0.01, 2, 5) - 0.5) * 2
    h += (y - h) * w
  }
  return h
}
