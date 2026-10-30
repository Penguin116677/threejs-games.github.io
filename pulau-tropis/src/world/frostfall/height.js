import { fbm, valueNoise, smoothstep } from '../../core/noise.js'
import {
  BOX, LAND, RANGES, PEAKS, VILLAGE, CASTLE, CASTLE_YARD, HIGH_VALLEY, CLIFF_X, RIVER, ROADS, TRAILS, GORGE, CAVE, LAKE,
  polyInfo, polyBox, inBox, rectDist, segmentInfo, landDistance, HARBOR,
} from './layout.js'

// Lebar lorong gua minimum (m). Mesh terrain berupa grid: segitiga yang menyeberangi dinding gua
// menjadi lereng yang terlalu curam untuk dilalui, jadi lorong yang hanya selebar 1–2 langkah grid
// tertutup di kualitas Rendah / Sedang. main.js mengaturnya sekali (dari langkah grid) sebelum
// terrain dibuat; tangga rahasia (berlantai sendiri) tidak ikut dilebarkan.
let minPassage = 0
export function setCavePassage(width) {
  minPassage = width
}
export const cavePassage = c => (c.stair ? c.w : Math.max(c.w, minPassage))

// Bentuk tanah Kerajaan Frostfall. Profil pantainya sama dengan pulau-pulau lain (dasar laut →
// paparan dangkal → pantai), lalu:
//   alami    : dataran rendah yang naik ke timur + gunung (puncak & punggung, berbatu tajam lewat
//              noise "ridged") — di pantai timur gunung langsung jatuh ke laut sebagai tebing
//   permukaan: alami + kawasan yang diratakan (desa, kastel, Lembah Atas dengan tebing air
//              terjunnya), alur Sungai Beku, jalan yang dipapas di lereng, Celah Tersembunyi
//   tanah    : permukaan + rongga Gua Es Kristal yang dikeruk (lantai gua); permukaan aslinya
//              menjadi atap gua (gua.js)
const SEA_FLOOR = -18
const REACH = (1 + LAND.wobble) * 1.38
const CAVE_REACH = { x0: 960, x1: 1230, z0: -380, z1: -140 }

// ridged multifractal (Musgrave): igir tajam yang bercabang, lembah di antaranya; ±0..1,2
function multiRidge(x, z, seed) {
  let sum = 0
  let amp = 1
  let freq = 1
  let weight = 1
  for (let i = 0; i < 5; i++) {
    let n = 1 - Math.abs(2 * valueNoise(x * freq, z * freq, seed + i * 31) - 1)
    n = n * n * weight
    weight = Math.min(1, Math.max(0, n * 2))
    sum += n * amp
    amp *= 0.5
    freq *= 2.05
  }
  return sum
}

// tinggi alami + jarak ternormalisasi ke pantai (t)
function natural(x, z) {
  const u = landDistance(x, z)
  if (u > REACH) return { h: SEA_FLOOR, t: 9 }
  const shape = fbm(x * 0.006 + 3.3, z * 0.006 - 1.7, 3, LAND.seed)
  const t = u / (1 + (shape - 0.5) * 2 * LAND.wobble)
  let h = SEA_FLOOR + (-SEA_FLOOR - 1.2) * smoothstep(1.38, 1.02, t)
  h += 3.6 * smoothstep(1.04, 0.87, t)
  if (t > 1.02) return { h, t }
  const inland = smoothstep(0.92, 0.5, t)
  // dataran rendah: naik pelan ke timur, bergelombang (bukit-bukit landai)
  const low = 3 + 15 * smoothstep(520, 980, x) + (fbm(x * 0.009, z * 0.009, 4, 63) - 0.45) * 16
  // pegunungan: seberapa dekat ke tulang punggungnya (0..1) × tinggi dasar + igir bergerigi
  let mass = 0
  let base = 0
  for (const r of RANGES) {
    const { d } = segmentInfo(x, z, r.a.x, r.a.z, r.b.x, r.b.z)
    if (d >= r.w) continue
    const k = smoothstep(r.w, r.w * 0.2, d)
    if (k > mass) {
      mass = k
      base = r.y
    }
  }
  let m = 0
  // igir sebanding tinggi dasarnya: punggung utama menjulang, bahu rendah tetap landai
  if (mass > 0) m = mass * (base * 0.5 + base * 1.6 * multiRidge(x * 0.0062 + 7.1, z * 0.0062 - 3.3, 81) * mass)
  for (const p of PEAKS) {
    const d = Math.hypot(x - p.x, z - p.z)
    if (d < p.r * 1.6) m += p.h * Math.exp(-((d / p.r) ** 2) * 1.6) * (0.8 + 0.3 * multiRidge(x * 0.02, z * 0.02, 87))
  }
  // permukaan berbatu kecil di lereng tinggi
  m += (fbm(x * 0.05, z * 0.05, 3, 73) - 0.5) * 6 * smoothstep(15, 60, m)
  // gunung boleh sampai ke pantai (tebing ke laut), dataran rendah tidak
  h += inland * low + smoothstep(1.0, 0.74, t) * m
  h += (fbm(x * 0.08, z * 0.08, 2, 67) - 0.5) * 0.6 * inland
  return { h: Math.max(h, caveCover(x, z)), t }
}

// Batu di atas Gua Es Kristal: di atas setiap rongga (kecuali tangga rahasia) tanah
// alami setidaknya 24 m di atas lantainya, melandai 4–36 m di luar tepinya — lembah di antara igir
// tidak pernah membuka atap gua
const COVER = CAVE.filter(c => !c.stair)
function caveCover(x, z) {
  if (x < CAVE_REACH.x0 || x > CAVE_REACH.x1 || z < CAVE_REACH.z0 || z > CAVE_REACH.z1) return -Infinity
  let best = -Infinity
  for (const c of COVER) {
    let d
    let top
    if (c.kind === 'bulat') {
      d = Math.hypot(x - c.x, z - c.z) - c.r
      top = c.y + 24
    } else {
      const s = segmentInfo(x, z, c.a.x, c.a.z, c.b.x, c.b.z)
      d = s.d - cavePassage(c) / 2
      top = Math.max(c.ya, c.yb) + 24
    }
    if (d < 40) best = Math.max(best, top - 30 * smoothstep(4, 36, d))
  }
  // berbatu seperti lereng sekitarnya (bukan kubah mulus)
  return best === -Infinity ? best : best + 14 * multiRidge(x * 0.02 + 1.3, z * 0.02 + 4.1, 89) - 5
}

// ratakan h menuju y: penuh sampai `pad` m di luar kawasan, memudar sampai pad + fall
const flatten = (h, d, y, pad, fall) => (d >= pad + fall ? h : h + (y - h) * (1 - smoothstep(pad, pad + fall, d)))

const RIVER_BOX = polyBox(RIVER, 30)
const GORGE_BOX = polyBox(GORGE, 30)
const LINES = [...ROADS, ...TRAILS].filter(r => r.line.some(p => p.y !== null)).map(r => ({ ...r, box: polyBox(r.line, r.w + 8) }))
const CASTLE_PAD = { ...CASTLE, x0: CASTLE.x0 - 2, x1: CASTLE.x1 + 2, z0: CASTLE.z0 - 2, z1: CASTLE.z1 + 2 }

// alur sungai: lebar w di dasar (es), tepi naik ±1,4 m dalam 7 m lalu menyatu dengan tanah
function river(h, x, z) {
  if (!inBox(x, z, RIVER_BOX)) return h
  const r = polyInfo(RIVER, x, z, ['y', 'w'])
  const half = r.w / 2
  if (r.d > half + 16) return h
  // ruas air terjun (tebing): alur menembus tebing sebagai takik curam
  const e = r.d - half
  if (e <= 0) return r.y
  const bank = r.y + 1.4 * smoothstep(0, 7, e)
  // tanah lebih tinggi: dipotong menjadi tepi; lebih rendah: ditimbun menjadi tanggul landai
  const k = 1 - smoothstep(7, 16, e)
  return h > bank ? h + (bank - h) * (1 - smoothstep(4, 16, e)) : h + (bank - h) * k
}

// Permukaan luar Frostfall (tanpa gua) — juga tinggi atap gua.
export function frostSurface(x, z) {
  if (x < BOX.x0 || x > BOX.x1 || z < BOX.z0 || z > BOX.z1) return SEA_FLOOR
  const n = natural(x, z)
  let { h } = n
  // cekungan pelabuhan (dasar laut dikeruk, tepinya curam seperti dinding dermaga)
  const hd = rectDist(x, z, HARBOR)
  if (hd < HARBOR.fall) h = Math.min(h, HARBOR.y + 40 * smoothstep(0, HARBOR.fall, hd))
  if (n.t > 0.97) return h
  const coast = smoothstep(0.97, 0.82, n.t)
  // desa & dataran kastel
  h = flatten(h, rectDist(x, z, VILLAGE), VILLAGE.y, 6, 26 * coast + 0.01)
  h = flatten(h, rectDist(x, z, CASTLE_YARD), CASTLE_YARD.y, 1, 16)
  h = flatten(h, rectDist(x, z, CASTLE_PAD), CASTLE.y, 1, 13)
  // Lembah Atas: dasar rata yang naik pelan ke timur; ujung baratnya tebing tegak (air terjun)
  {
    const v = HIGH_VALLEY
    const y = v.y + v.rise * smoothstep(v.x0, v.x1, x)
    const d = rectDist(x, z, v)
    if (x < CLIFF_X) {
      // di bawah tebing: tidak ikut ditinggikan (lembah bawah)
    } else h = flatten(h, d, y, 2, 12)
  }
  // jalan & jalan setapak yang dipapas di lereng (titik dengan y): lantai jalan rata melintang
  for (const r of LINES) {
    if (!inBox(x, z, r.box)) continue
    const line = r.line.map(p => ({ ...p, y: p.y ?? null }))
    const info = polyInfo(line, x, z)
    const a = line[info.i]
    const b = line[info.i + 1]
    if (a.y === null && b.y === null) continue
    const ya = a.y ?? b.y
    const yb = b.y ?? a.y
    const y = ya + (yb - ya) * info.t
    const half = r.w / 2 + 0.6
    h = flatten(h, info.d - half, y, 0, r.bench ? 4 : 7)
  }
  h = river(h, x, z)
  // Celah Tersembunyi: ngarai berdinding curam
  if (inBox(x, z, GORGE_BOX)) {
    const g = polyInfo(GORGE, x, z, ['y', 'w'])
    const e = g.d - g.w / 2
    if (e < 6) h = Math.min(h, g.y + Math.max(0, e) * 9)
  }
  return h
}

// ------------------------------------------------------------------ Gua Es Kristal
const CAVE_BOX = (() => {
  const b = { x0: Infinity, x1: -Infinity, z0: Infinity, z1: -Infinity }
  for (const c of CAVE) {
    const pts = c.kind === 'bulat' ? [{ x: c.x, z: c.z }] : [c.a, c.b]
    const r = (c.r ?? c.w / 2) + 12 // + pelebaran lorong (setCavePassage) & dinding bergelombang
    for (const p of pts) {
      b.x0 = Math.min(b.x0, p.x - r)
      b.x1 = Math.max(b.x1, p.x + r)
      b.z0 = Math.min(b.z0, p.z - r)
      b.z1 = Math.max(b.z1, p.z + r)
    }
  }
  return b
})()
export { CAVE_BOX }

// Lantai gua di (x, z), atau null bila di luar rongga. Dinding bergelombang (noise), lantai
// sedikit berbatu; danau beku rata; tangga rata menanjak.
export function caveFloor(x, z) {
  if (!inBox(x, z, CAVE_BOX)) return null
  const wob = (fbm(x * 0.09, z * 0.09, 2, 91) - 0.5) * 3.2
  let floor = null
  let stair = false
  for (const c of CAVE) {
    let d
    let fy
    if (c.kind === 'bulat') {
      d = Math.hypot(x - c.x, z - c.z) - c.r
      fy = c.y
    } else {
      const s = segmentInfo(x, z, c.a.x, c.a.z, c.b.x, c.b.z)
      d = s.d - cavePassage(c) / 2
      fy = c.ya + (c.yb - c.ya) * s.t
    }
    // tangga: dinding rata (tanpa noise) supaya lubangnya rapi
    if (d + (c.stair ? 0 : wob) > 0) continue
    if (floor === null || fy < floor || c.stair) {
      floor = fy
      stair = !!c.stair
    }
    if (c.stair) break
  }
  if (floor === null) return null
  if (stair) return floor
  const lake = Math.hypot((x - LAKE.x) / LAKE.rx, (z - LAKE.z) / LAKE.rz)
  if (lake < 1) return LAKE.y
  // lantai berbatu kecil + tepi danau sedikit menurun ke es
  return floor + (fbm(x * 0.22, z * 0.22, 2, 93) - 0.5) * 0.7 + (LAKE.y - floor) * (1 - smoothstep(1, 1.35, lake))
}

// Tinggi tanah Frostfall (dengan gua dikeruk).
export function frostHeight(x, z) {
  const c = caveFloor(x, z)
  return c === null ? frostSurface(x, z) : c
}
