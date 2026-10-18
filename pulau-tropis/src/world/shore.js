import * as THREE from 'three'
import { ISLAND } from './island.js'

// ---------------------------------------------------------------------------
// Data pantai untuk ombak. Tekstur half-float, per titik:
//   r = tinggi tanah (m, sama dengan mesh terrain)
//   g = jarak bertanda ke garis pantai (m; + di laut, − di darat)
//   b, a = arah menjauhi pantai (menuju laut lepas)
// Ombak bergerak menurut jarak ini, jadi selalu datang tegak lurus garis pantai
// di mana pun di sekeliling pulau.
// ---------------------------------------------------------------------------

const INF = 1e20

// Transformasi jarak Euclidean 1D (Felzenszwalb & Huttenlocher): f → d (jarak kuadrat)
function edt1d(f, n, d, v, z) {
  let k = 0
  v[0] = 0
  z[0] = -INF
  z[1] = INF
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
    while (s <= z[k]) {
      k--
      s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
    }
    k++
    v[k] = q
    z[k] = s
    z[k + 1] = INF
  }
  k = 0
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++
    d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]
  }
}

// jarak kuadrat (dalam texel) ke titik "fitur" terdekat (nilai 0) — di tempat
function edt2d(grid, size) {
  const f = new Float64Array(size)
  const d = new Float64Array(size)
  const v = new Int32Array(size)
  const z = new Float64Array(size + 1)
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) f[y] = grid[y * size + x]
    edt1d(f, size, d, v, z)
    for (let y = 0; y < size; y++) grid[y * size + x] = d[y]
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) f[x] = grid[y * size + x]
    edt1d(f, size, d, v, z)
    for (let x = 0; x < size; x++) grid[y * size + x] = d[x]
  }
}

export function createShoreData(ground, res = 512) {
  const half = ISLAND.size / 2
  const cell = ISLAND.size / res
  const n = res * res
  const h = new Float32Array(n)
  const toLand = new Float64Array(n)
  const toWater = new Float64Array(n)
  for (let j = 0; j < res; j++)
    for (let i = 0; i < res; i++) {
      const k = j * res + i
      const y = ground.heightAt(-half + (i + 0.5) * cell, -half + (j + 0.5) * cell)
      h[k] = y
      toLand[k] = y > 0 ? 0 : INF
      toWater[k] = y > 0 ? INF : 0
    }
  edt2d(toLand, res)
  edt2d(toWater, res)

  const s = new Float32Array(n)
  for (let k = 0; k < n; k++)
    s[k] = h[k] > 0 ? -(Math.sqrt(toWater[k]) - 0.5) * cell : (Math.sqrt(toLand[k]) - 0.5) * cell

  // dekat garis pantai: perkiraan linear −h / |∇h| (lebih halus daripada ukuran texel)
  for (let j = 1; j < res - 1; j++)
    for (let i = 1; i < res - 1; i++) {
      const k = j * res + i
      if (Math.abs(s[k]) > 3 * cell) continue
      const gx = (h[k + 1] - h[k - 1]) / (2 * cell)
      const gz = (h[k + res] - h[k - res]) / (2 * cell)
      const g = Math.hypot(gx, gz)
      if (g > 0.02) s[k] = Math.max(-3 * cell, Math.min(3 * cell, -h[k] / g))
    }

  const toHalf = THREE.DataUtils.toHalfFloat
  const data = new Uint16Array(n * 4)
  for (let j = 0; j < res; j++)
    for (let i = 0; i < res; i++) {
      const k = j * res + i
      const dx = s[Math.min(res - 1, i + 1) + j * res] - s[Math.max(0, i - 1) + j * res]
      const dz = s[i + Math.min(res - 1, j + 1) * res] - s[i + Math.max(0, j - 1) * res]
      const len = Math.hypot(dx, dz) || 1
      data[k * 4] = toHalf(h[k])
      data[k * 4 + 1] = toHalf(Math.max(-60, Math.min(600, s[k])))
      data[k * 4 + 2] = toHalf(dx / len)
      data[k * 4 + 3] = toHalf(dz / len)
    }
  const texture = new THREE.DataTexture(data, res, res, THREE.RGBAFormat, THREE.HalfFloatType)
  texture.magFilter = THREE.LinearFilter
  texture.minFilter = THREE.LinearFilter
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true
  return { texture, res, cell, heights: h, distance: s }
}

// Waktu ombak bersama (shader laut dan shader tanah memakai objek uniform yang sama).
export const waveTime = { value: 0 }

// Fungsi ombak pantai (GLSL) — dipakai shader laut (tinggi air, normal, buih)
// dan shader tanah (pasir basah yang ditinggalkan ombak), supaya keduanya sinkron.
export const SHORE_GLSL = /* glsl */`
const float WAVE_LEN = 15.0;   // jarak antar puncak ombak (m)
const float WAVE_SPEED = 2.4;  // kecepatan ombak menuju pantai (m/s)
const float WAVE_AMP = 0.5;    // tinggi ombak maksimum (m)

// profil satu ombak: muka depan curam menghadap pantai (u kecil), punggung landai
float waveProfile(float u) {
  return smoothstep(0.0, 0.12, u) * (1.0 - smoothstep(0.12, 1.0, u));
}

// fase ombak pada jarak s (m) dari pantai; ph = geser fase lokal
float wavePhase(float s, float ph, float t) {
  return fract((s + t * WAVE_SPEED) / WAVE_LEN + ph);
}

// tinggi ombak: muncul ±65 m dari pantai, membesar saat mendekat (laut makin dangkal)
float waveAmp(float s, float sets) {
  return WAVE_AMP * sets * smoothstep(65.0, 35.0, s) * (0.55 + 0.45 * smoothstep(24.0, 4.0, s));
}

// variasi lokal sepanjang pantai: x = geser fase (puncak ombak berkelok), y = kekuatan (set ombak)
vec2 waveLocal(sampler2D noiseTex, vec2 p, float t) {
  float ph = textureLod(noiseTex, p * 0.0023, 0.0).b * 1.7 + textureLod(noiseTex, p * 0.0091 + 0.53, 0.0).g * 0.6;
  float sets = 0.72 + 0.28 * sin(t * 0.33 + textureLod(noiseTex, p * 0.0031 + 0.37, 0.0).g * 12.0);
  return vec2(ph, sets);
}

// ketinggian air di garis pantai: naik cepat saat ombak tiba, surut perlahan
float swashLevel(vec2 local, float t) {
  return waveAmp(0.0, local.y) * waveProfile(wavePhase(0.0, local.x, t));
}
`
