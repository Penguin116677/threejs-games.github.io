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

// Kepadatan rumput 0..1. slope = kemiringan (naik / jarak datar).
// Rumput tumbuh rapat di sabuk lereng gunung (padang ilalang di atas hutan),
// dan lebih jarang di padang terbuka sekitar kaki gunung.
export function grassDensity(x, z, h, slope) {
  if (h < ISLAND.beachTop + 1.2 || h > 76 || slope > 1.15) return 0
  const zone = mountainZone(x, z)
  if (zone <= 0) return 0
  const forest = forestMask(x, z) > 0.47 && h < 44 // di dalam hutan: lebih jarang
  const clearing = 1 - smoothstep(0.42, 0.52, forestMask(x, z))
  const band = slopeBand(h)
  const base = Math.max(band * (forest ? 0.35 : 1), 0.75 * clearing)
  const patch = smoothstep(0.25, 0.5, fbm(x * 0.045 + 7, z * 0.045 - 3, 2, 77))
  const flat = 1 - smoothstep(0.75, 1.15, slope)
  const shore = smoothstep(ISLAND.beachTop + 1.2, ISLAND.beachTop + 4, h)
  return zone * base * patch * flat * shore
}

// seberapa "padang rumput" tanah ini (untuk warna tanah di bawah rumput), tanpa noise bercak
export function meadowAmount(x, z, h) {
  if (h < ISLAND.beachTop) return 0
  const clearing = 1 - smoothstep(0.42, 0.52, forestMask(x, z))
  const forest = forestMask(x, z) > 0.47 && h < 44
  return mountainZone(x, z) * Math.max(slopeBand(h) * (forest ? 0.4 : 1), 0.75 * clearing)
}
