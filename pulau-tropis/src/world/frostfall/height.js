import { fbm, valueNoise, smoothstep } from '../../core/noise.js'
import {
  BOX, LAND, RANGES, PEAKS, VILLAGE, CASTLE, CASTLE_YARD, HIGH_VALLEY, CLIFF_X, RIVER, ROADS, TRAILS, GORGE, CAVES,
  polyInfo, polyBox, inBox, rectDist, segmentInfo, landDistance, HARBOR,
} from './layout.js'

// Lebar lorong gua minimum, dalam langkah grid terrain. Mesh terrain berupa grid: segitiga yang
// menyeberangi dinding gua menjadi lereng yang terlalu curam untuk dilalui, jadi lorong yang hanya
// selebar 1–2 langkah grid tertutup di kualitas Rendah / Sedang. main.js mengatur langkah grid sekali
// sebelum terrain dibuat. Lorong boleh meminta lebih (minSteps, mis. lorong diagonal di grid kasar);
// tangga rahasia (berlantai sendiri) tidak ikut dilebarkan.
let gridStep = 0
export function setCaveGrid(step) {
  gridStep = step
}
export const cavePassage = c => (c.stair ? c.w : Math.max(c.w, gridStep * (c.minSteps ?? 3)))

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

// Sistem gua: kotak batas tiap gua (rongga + pelebaran lorong + dinding bergelombang) dan jangkauan
// batu penutupnya (kotak + 40 m). Gua Es Kristal memakai jangkauan lamanya (v0.19.0) supaya bentuk
// gunung di sekitarnya tetap sama persis.
const REACH_TETAP = { kristal: { x0: 960, x1: 1230, z0: -380, z1: -140 } }
export const CAVE_SYSTEMS = CAVES.map(cave => {
  const box = { x0: Infinity, x1: -Infinity, z0: Infinity, z1: -Infinity }
  for (const c of cave.shapes) {
    const pts = c.kind === 'bulat' ? [{ x: c.x, z: c.z }] : [c.a, c.b]
    const r = (c.r ?? c.w / 2) + 12 // + pelebaran lorong (setCaveGrid) & dinding bergelombang
    for (const p of pts) {
      box.x0 = Math.min(box.x0, p.x - r)
      box.x1 = Math.max(box.x1, p.x + r)
      box.z0 = Math.min(box.z0, p.z - r)
      box.z1 = Math.max(box.z1, p.z + r)
    }
  }
  const reach = REACH_TETAP[cave.id] || { x0: box.x0 - 40, x1: box.x1 + 40, z0: box.z0 - 40, z1: box.z1 + 40 }
  // mulut: koridor keluar sepanjang 30 m searah lorong pertama (dari dalam ke luar)
  const c0 = cave.shapes[0]
  const ol = Math.hypot(c0.a.x - c0.b.x, c0.a.z - c0.b.z) || 1
  const mouths = cave.mouths.map(m => ({ ...m, ex: m.x + ((c0.a.x - c0.b.x) / ol) * 30, ez: m.z + ((c0.a.z - c0.b.z) / ol) * 30 }))
  // gua baru: tepi batu penutup memudar halus sebelum batas 40 m (di kaki gunung yang rendah batas yang
  // tajam menjadi tebing kecil); Gua Es Kristal tetap seperti v0.19.0
  return { cave, box, reach, mouths, halus: !REACH_TETAP[cave.id], cover: cave.shapes.filter(c => !c.stair) }
})
// kotak gabungan semua gua
export const CAVE_BOX = CAVE_SYSTEMS.reduce((b, s) => ({
  x0: Math.min(b.x0, s.box.x0), x1: Math.max(b.x1, s.box.x1), z0: Math.min(b.z0, s.box.z0), z1: Math.max(b.z1, s.box.z1),
}), { x0: Infinity, x1: -Infinity, z0: Infinity, z1: -Infinity })

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
  // batu penutup gua memudar di tepi pantai (mulut gua laut, tanpa pulau batu di depannya)
  return { h: Math.max(h, caveCover(x, z) - 80 * smoothstep(0.93, 1.0, t)), t }
}

// Batu di atas gua: di atas setiap rongga (kecuali tangga rahasia) tanah alami setidaknya 24 m di
// atas lantainya, melandai 4–36 m di luar tepinya — lembah di antara igir tidak pernah membuka atap
// gua. Di mulut gua (mouths) batu penutup tidak menimbun lereng / pantai aslinya, jadi lorong masuk
// terbuka seperti celah di kaki tebing.
function caveCover(x, z) {
  let best = -Infinity
  for (const sys of CAVE_SYSTEMS) best = Math.max(best, systemCover(sys, x, z))
  return best
}
function systemCover(sys, x, z) {
  if (!inBox(x, z, sys.reach)) return -Infinity
  let best = -Infinity
  for (const c of sys.cover) {
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
    if (d < 40) best = Math.max(best, top - 30 * smoothstep(4, 36, d) - (sys.halus ? 60 * smoothstep(22, 38, d) : 0))
  }
  if (best === -Infinity) return best
  // berbatu seperti lereng sekitarnya (bukan kubah mulus)
  best += 14 * multiRidge(x * 0.02 + 1.3, z * 0.02 + 4.1, 89) - 5
  for (const m of sys.mouths) {
    const k = smoothstep(m.r * 0.5, m.r * 1.8, segmentInfo(x, z, m.x, m.z, m.ex, m.ez).d)
    if (k < 1) best -= (1 - k) * 80
  }
  return best
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

// ------------------------------------------------------------------ gua (lantai dikeruk)

// Lantai gua di (x, z), atau null bila di luar rongga. Dinding bergelombang (noise), lantai
// sedikit berbatu; danau beku rata; tangga rata menanjak.
export function caveFloor(x, z) {
  for (const sys of CAVE_SYSTEMS) {
    if (!inBox(x, z, sys.box)) continue
    const f = systemFloor(sys, x, z)
    if (f !== null) return f
  }
  return null
}

// lantai satu sistem gua saja (gua.js membangun atap tiap gua dari grid-nya sendiri; kotak dua gua
// boleh bertumpang tanpa atap ganda)
export const caveFloorIn = (sys, x, z) => (inBox(x, z, sys.box) ? systemFloor(sys, x, z) : null)

// gua tempat (x, z) berada (salah satu CAVES), atau null
export function caveAt(x, z) {
  for (const sys of CAVE_SYSTEMS) if (inBox(x, z, sys.box) && systemFloor(sys, x, z) !== null) return sys.cave
  return null
}

function systemFloor(sys, x, z) {
  const wob = (fbm(x * 0.09, z * 0.09, 2, 91) - 0.5) * 3.2
  let floor = null
  let stair = false
  for (const c of sys.cave.shapes) {
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
  // danau beku terdekat: rata di dalamnya, tepinya sedikit menurun ke es
  let lake = null
  let ld = Infinity
  for (const l of sys.cave.lakes) {
    const e = Math.hypot((x - l.x) / l.rx, (z - l.z) / l.rz)
    if (e < ld) {
      ld = e
      lake = l
    }
  }
  if (lake && ld < 1) return lake.y
  // lantai berbatu kecil
  const rough = floor + (fbm(x * 0.22, z * 0.22, 2, 93) - 0.5) * 0.7
  return lake ? rough + (lake.y - floor) * (1 - smoothstep(1, 1.35, ld)) : rough
}

// Tinggi tanah Frostfall (dengan gua dikeruk).
export function frostHeight(x, z) {
  const c = caveFloor(x, z)
  return c === null ? frostSurface(x, z) : c
}
