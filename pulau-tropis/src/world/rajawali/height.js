import { fbm, smoothstep } from '../../core/noise.js'
import { ISLE, Y, FLAT, rajawaliDistance } from './layout.js'
import { rectDistance } from '../kencana/layout.js'

// Bentuk tanah Pulau Rajawali: profil pantai sama dengan pulau-pulau lain (dasar laut → paparan
// dangkal → pantai pasir landai), pedalaman landai, benteng + lapangan + jalan diratakan setinggi Y.
const SEA_FLOOR = -18
const REACH = (1 + ISLE.wobble) * 1.38 // di luar ini (jarak ternormalisasi) = dasar laut
// kotak yang memuat pulau + paparannya
const BOX = { x0: ISLE.x - ISLE.rx * REACH - 4, x1: ISLE.x + ISLE.rx * REACH + 4, z0: ISLE.z - ISLE.rz * REACH - 4, z1: ISLE.z + ISLE.rz * REACH + 4 }

export function rajawaliHeight(x, z) {
  if (x < BOX.x0 || x > BOX.x1 || z < BOX.z0 || z > BOX.z1) return SEA_FLOOR
  const u = rajawaliDistance(x, z)
  if (u > REACH) return SEA_FLOOR
  const shape = fbm(x * 0.009 + ISLE.seed * 1.7, z * 0.009 - ISLE.seed, 3, ISLE.seed)
  const t = u / (1 + (shape - 0.5) * 2 * ISLE.wobble)
  let h = SEA_FLOOR + (-SEA_FLOOR - 1.2) * smoothstep(1.38, 1.02, t)
  h += 3.6 * smoothstep(1.04, 0.87, t)
  const inland = smoothstep(0.92, 0.45, t)
  h += inland * inland * fbm(x * 0.012 + ISLE.seed, z * 0.012 - ISLE.seed * 2, 4, ISLE.seed + 9) * ISLE.hills
  h += (fbm(x * 0.08, z * 0.08, 2, 21 + ISLE.seed) - 0.5) * 0.5 * inland
  // dataran benteng & lapangan: rata setinggi Y, memudar ke pantai
  let d = Infinity
  for (const r of FLAT) d = Math.min(d, rectDistance(x, z, r))
  const flat = (1 - smoothstep(4, 22, d)) * smoothstep(1.0, 0.86, t)
  return h + (Y - h) * flat
}
