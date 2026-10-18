import * as THREE from 'three'

// Tekstur noise 256×256 yang berulang mulus (tileable), dibuat sekali saat loading.
// Dipakai untuk detail tanah, awan, dan kilau kaustik air. Karena berupa tekstur
// ber-mipmap (bukan noise yang dihitung di shader), detail halus tidak berkedip dari jauh.
//   R = butiran halus, G = variasi sedang, B = bercak besar, A = pola urat (kaustik)

function hash(x, y, seed) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0
  h = (h ^ (h >>> 13)) * 1274126177 | 0
  h ^= h >>> 16
  return (h >>> 0) / 4294967295
}

const fade = t => t * t * (3 - 2 * t)
const wrap = (i, p) => ((i % p) + p) % p

function tileNoise(x, y, period, seed) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const tx = fade(x - xi)
  const ty = fade(y - yi)
  const x0 = wrap(xi, period)
  const x1 = wrap(xi + 1, period)
  const y0 = wrap(yi, period)
  const y1 = wrap(yi + 1, period)
  const a = hash(x0, y0, seed)
  const b = hash(x1, y0, seed)
  const c = hash(x0, y1, seed)
  const d = hash(x1, y1, seed)
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty
}

// u, v dalam 0..1; frekuensi bulat agar tetap tileable
function tileFbm(u, v, freq, octaves, seed) {
  let sum = 0
  let amp = 0.5
  let norm = 0
  let f = freq
  for (let i = 0; i < octaves; i++) {
    sum += amp * tileNoise(u * f, v * f, f, seed + i * 13)
    norm += amp
    amp *= 0.5
    f *= 2
  }
  return sum / norm
}

// regangkan kontras channel ke 0..1 (fbm cenderung berkumpul di sekitar 0.5)
function normalize(arr) {
  let min = Infinity
  let max = -Infinity
  for (const v of arr) {
    if (v < min) min = v
    if (v > max) max = v
  }
  const k = 1 / Math.max(1e-6, max - min)
  for (let i = 0; i < arr.length; i++) arr[i] = (arr[i] - min) * k
}

export function createNoiseTexture(renderer, size = 256) {
  const n = size * size
  const ch = [new Float32Array(n), new Float32Array(n), new Float32Array(n), new Float32Array(n)]
  for (let j = 0; j < size; j++)
    for (let i = 0; i < size; i++) {
      const u = i / size
      const v = j / size
      const k = j * size + i
      ch[0][k] = tileFbm(u, v, 32, 3, 1)
      ch[1][k] = tileFbm(u, v, 8, 4, 2)
      ch[2][k] = tileFbm(u, v, 4, 3, 3)
      ch[3][k] = 1 - Math.abs(tileFbm(u, v, 6, 3, 4) * 2 - 1)
    }
  ch.forEach(normalize)

  const data = new Uint8Array(n * 4)
  for (let k = 0; k < n; k++)
    for (let c = 0; c < 4; c++) data[k * 4 + c] = Math.round(ch[c][k] * 255)

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.generateMipmaps = true
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
  tex.needsUpdate = true
  return tex
}

// Tekstur normal riak air 256×256 (tileable, ber-mipmap): dari jauh riak otomatis
// menghalus (mipmap) sehingga tidak muncul pola moiré seperti gelombang sinus.
export function createWaterNormalTexture(renderer, size = 256) {
  const hgt = new Float32Array(size * size)
  for (let j = 0; j < size; j++)
    for (let i = 0; i < size; i++) {
      const u = i / size
      const v = j / size
      // campuran riak bulat + riak "berpuncak" (ridged) agar mirip permukaan air
      const soft = tileFbm(u, v, 6, 4, 21)
      const sharp = 1 - Math.abs(tileFbm(u, v, 9, 3, 37) * 2 - 1)
      hgt[j * size + i] = soft * 0.6 + sharp * 0.4
    }
  normalize(hgt)
  const data = new Uint8Array(size * size * 4)
  const at = (i, j) => hgt[((j + size) % size) * size + ((i + size) % size)]
  const STRENGTH = 5
  for (let j = 0; j < size; j++)
    for (let i = 0; i < size; i++) {
      const nx = -(at(i + 1, j) - at(i - 1, j)) * STRENGTH
      const ny = -(at(i, j + 1) - at(i, j - 1)) * STRENGTH
      const len = Math.hypot(nx, ny, 1)
      const k = (j * size + i) * 4
      data[k] = Math.round((nx / len * 0.5 + 0.5) * 255)
      data[k + 1] = Math.round((ny / len * 0.5 + 0.5) * 255)
      data[k + 2] = Math.round((1 / len * 0.5 + 0.5) * 255)
      data[k + 3] = 255
    }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.generateMipmaps = true
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
  tex.needsUpdate = true
  return tex
}
