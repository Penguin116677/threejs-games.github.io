import { fbm, smoothstep } from '../core/noise.js'
import { ISLAND } from './island.js'

// Masker vegetasi bersama: pohon, rumput, dan warna tanah memakai fungsi yang sama
// supaya semuanya selaras (hutan lebat vs padang terbuka).

// > ±0.47 = hutan lebat, di bawahnya = padang terbuka
export const forestMask = (x, z) => fbm(x * 0.012 + 40, z * 0.012 - 13, 3, 31)

// zona sekitar gunung: 1 di lereng gunung, memudar ke 0 menjauhi puncak
export function mountainZone(x, z) {
  const d = Math.hypot(x - ISLAND.peak.x, z - ISLAND.peak.z)
  return 1 - smoothstep(150, 245, d)
}

// Sabuk lereng gunung: di atas batas hutan, di bawah puncak berbatu (0..1)
export function slopeBand(h) {
  return smoothstep(16, 30, h) * (1 - smoothstep(66, 76, h))
}

// Bagian "mahal" (noise) dari kepadatan rumput — dipisah agar sistem rumput bisa
// menghitungnya di grid kasar lalu menginterpolasi (noise ini berubah pelan, ±10 m).
export function grassNoise(x, z) {
  return { forest: forestMask(x, z), patch: fbm(x * 0.045 + 7, z * 0.045 - 3, 2, 77) }
}

// Kepadatan rumput 0..1 dari nilai noise yang sudah dihitung.
// Rumput tumbuh rapat di sabuk lereng gunung (padang ilalang di atas hutan),
// dan lebih jarang di padang terbuka sekitar kaki gunung.
export function grassDensityFrom(forestValue, patchValue, x, z, h, slope) {
  if (h < ISLAND.beachTop + 1.2 || h > 76 || slope > 1.15) return 0
  const zone = mountainZone(x, z)
  if (zone <= 0) return 0
  const inForest = forestValue > 0.47 && h < 44 // di dalam hutan: lebih jarang
  const clearing = 1 - smoothstep(0.42, 0.52, forestValue)
  const base = Math.max(slopeBand(h) * (inForest ? 0.35 : 1), 0.75 * clearing)
  const patch = smoothstep(0.25, 0.5, patchValue)
  const flat = 1 - smoothstep(0.75, 1.15, slope)
  const shore = smoothstep(ISLAND.beachTop + 1.2, ISLAND.beachTop + 4, h)
  return zone * base * patch * flat * shore
}

// Kepadatan rumput 0..1. slope = kemiringan (naik / jarak datar).
export function grassDensity(x, z, h, slope) {
  const n = grassNoise(x, z)
  return grassDensityFrom(n.forest, n.patch, x, z, h, slope)
}

// seberapa "padang rumput" tanah ini (untuk warna tanah di bawah rumput), tanpa noise bercak
export function meadowAmount(x, z, h) {
  if (h < ISLAND.beachTop) return 0
  const clearing = 1 - smoothstep(0.42, 0.52, forestMask(x, z))
  const forest = forestMask(x, z) > 0.47 && h < 44
  return mountainZone(x, z) * Math.max(slopeBand(h) * (forest ? 0.4 : 1), 0.75 * clearing)
}
