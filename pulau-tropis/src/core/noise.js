// Value noise 2D deterministik (seed tetap) — cukup untuk terrain dan murah.
// Dipakai bersama oleh pembuatan mesh dan query tinggi (collision Milestone 2),
// jadi keduanya selalu sepakat soal bentuk pulau.

function hash(x, y, seed) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0
  h = (h ^ (h >>> 13)) * 1274126177 | 0
  h ^= h >>> 16
  return (h >>> 0) / 4294967295
}

const fade = t => t * t * (3 - 2 * t)

export function valueNoise(x, y, seed = 1) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const tx = fade(x - xi)
  const ty = fade(y - yi)
  const a = hash(xi, yi, seed)
  const b = hash(xi + 1, yi, seed)
  const c = hash(xi, yi + 1, seed)
  const d = hash(xi + 1, yi + 1, seed)
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty
}

// Fractal brownian motion, hasil 0..1
export function fbm(x, y, octaves = 4, seed = 1) {
  let sum = 0
  let amp = 0.5
  let freq = 1
  let norm = 0
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq, seed + i * 17)
    norm += amp
    amp *= 0.5
    freq *= 2.03
  }
  return sum / norm
}

export const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}
