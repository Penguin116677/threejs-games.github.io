import { rng } from '../../core/random.js'
import { dockSpans } from '../kencana/height.js'
import { TOWER } from './buildings.js'
import { cavePassage, caveFloorIn, frostSurface, CAVE_SYSTEMS } from './height.js'
import {
  VILLAGE, SQUARE, CASTLE, CASTLE_YARD, HALL, THRONE, TRAPDOOR, CAVE, LAKE, TREASURE, CAVE_MOUTH, WATERFALL, RIVER, ROADS, TRAILS,
  GORGE, BRIDGES, DOCKS, CAMPS, HIGH_VALLEY, CAVES, HAMLETS, PIER, HERDS, FENCES, polyInfo, segmentInfo,
} from './layout.js'

// Rencana rinci Kerajaan Frostfall: letak setiap bangunan, penghalang (sebagian berbatas tinggi:
// dinding aula di atas lorong rahasia, pagar jembatan), lantai yang bisa diinjak (dermaga, jembatan,
// menara jaga, lantai aula & tangga rahasia, lempeng pintu rahasia), cat jalan / es / lantai batu
// untuk masker tanah, titik cahaya (api unggun, perapian, anglo), ruang dalam (kamera tetap di
// dalam aula & kedai), kristal gua, peti harta. Murni angka (tanpa Three.js).
//
// Arah: rot = rotation.y; rot 0 = menghadap +z (selatan), π = utara, π/2 = timur, −π/2 = barat.
const FACE = { selatan: 0, timur: Math.PI / 2, utara: Math.PI, barat: -Math.PI / 2 }

export function planFrostfall(ground) {
  const rand = rng(9393)
  const between = (a, b) => a + (b - a) * rand()
  const yAt = (x, z) => ground.heightAt(x, z)
  const docks = dockSpans(ground.heightAt, DOCKS)

  const P = {
    docks,
    build: [], // { type, x, y, z, rot, ... } → buildings.js lewat kingdom.js
    colliders: [],
    surfaces: [],
    roads: [], // cat jalan: [ax, az, bx, bz, lebar]
    ice: [], // cat es: { line } (sungai) | { ellipse } (danau, kolam)
    pave: [], // lantai batu { x0, z0, x1, z1 }
    blocked: [], // jejak bangunan (pohon tidak tumbuh di sini) { x, z, hx, hz, rot }
    lights: [], // titik cahaya { x, y, z, color, power, range, flicker }
    interiors: [], // ruang dalam { id, rect: { x0, z0, x1, z1 }, floor, ceil }
    crystals: [], // kristal { x, y, z, n, size, seed, ungu }
    smoke: [], // ujung cerobong (asap tipis) { x, y, z }
    spans: [], // (Frostfall tidak punya jembatan antarpulau)
    shops: [],
    chest: null,
    chests: [], // peti harta tiap gua { id, x, y, z, rot, koin, key, pesan, gua }
    waterfalls: [], // air terjun yang mengalir (Aula Gletser) { x, y, z, rot, h, w }
    pools: [], // permukaan air kolam di dalam gua { x, z, rx, rz, y }
    shafts: [], // berkas cahaya dari celah atap { x, y, z, h, r, tilt, rot }
    caves: CAVES,
    trapdoor: null,
    // penduduk (v0.22.0, warga.js): rumah keluarga & tempat berkegiatan
    warga: {
      homes: [], // { id, desa, x, z, y, rot, w, d, door: { x, z } }
      spots: [], // { kind, desa, x, z, y, rot } — mancing, mancing-es, kios, beli, masak, kayu, asap, jemur, kulit, sumur, jaga, main, …
      fires: [], // api unggun bersama { id, desa, x, z, y, seats: [{ x, z, rot }] }
      tables: [], // meja jamuan { id, desa, x, z, y, rot, len, seats: [{ x, z, rot }] }
      plazas: [], // lapangan / alun-alun { desa, x, z, y, r }
      lanes: [], // garis jalan kampung untuk jaringan jalan penduduk [{ x, z }, …]
    },
  }
  const add = b => {
    P.build.push(b)
    return b
  }
  const box = (x, z, w, d, rot, kind, yr = null) => P.colliders.push({ x, z, hx: w / 2, hz: d / 2, rot, kind, ...(yr ? { y0: yr[0], y1: yr[1] } : {}) })
  const circle = (x, z, radius, kind) => P.colliders.push({ x, z, radius, kind })
  const block = (x, z, w, d, rot = 0) => P.blocked.push({ x, z, hx: w / 2, hz: d / 2, rot })
  // titik lokal (lx, lz) bangunan b → dunia
  const local = (b, lx, lz) => {
    const c = Math.cos(b.rot)
    const s = Math.sin(b.rot)
    return { x: b.x + lx * c + lz * s, z: b.z - lx * s + lz * c }
  }
  // kotak lokal (tengah lx, lz; ukuran w × d) bangunan b → penghalang dunia
  const localBox = (b, lx, lz, w, d, kind, yr = null) => {
    const p = local(b, lx, lz)
    box(p.x, p.z, w, d, b.rot, kind, yr)
  }
  const light = (x, y, z, color, power, range, flicker = 1) => P.lights.push({ x, y, z, color, power, range, flicker })

  // ===================================================================== dermaga
  // Dermaga Frostfall (pantai barat) & Dermaga Fajar (pantai timur Pulau Tropis)
  for (const d of docks) {
    const deckY = 1.75
    const lo = Math.min(d.s0, d.s1)
    const hi = Math.max(d.s0, d.s1)
    const len = hi - lo
    const mid = (lo + hi) / 2
    add({ type: 'dermaga', x: mid, y: deckY, z: d.at, rot: FACE.timur, w: d.width, len })
    P.surfaces.push({ x: mid, z: d.at, hx: d.width / 2, hz: len / 2, rot: FACE.timur, y0: deckY, y1: deckY })
    block(mid, d.at, len + 2, d.width + 2)
    if (d.id === 'frostfall') {
      P.roads.push([d.s0 + d.dir * 1, d.at, d.s0 - d.dir * 20, d.at, 4])
      for (const s of [-1, 1]) {
        const x = d.s0 - d.dir * 5
        add({ type: 'lentera', x, y: yAt(x, d.at + s * 3.6), z: d.at + s * 3.6, rot: s > 0 ? FACE.utara : FACE.selatan })
      }
      add({ type: 'peti', x: d.s0 - d.dir * 9, y: yAt(d.s0 - d.dir * 9, d.at - 6), z: d.at - 6, rot: 0.4, n: 4, seed: 3 })
    }
  }

  // ===================================================================== jalan, sungai (cat)
  const paintLine = (line, w) => {
    for (let i = 0; i < line.length - 1; i++) P.roads.push([line[i].x, line[i].z, line[i + 1].x, line[i + 1].z, w])
  }
  for (const r of [...ROADS, ...TRAILS]) paintLine(r.line, r.w)
  // sungai beku: tanpa ruas air terjun (tebing tegak)
  P.ice.push({ line: RIVER.slice(0, 3) }, { line: RIVER.slice(3) })
  P.ice.push({ ellipse: { x: LAKE.x, z: LAKE.z, rx: LAKE.rx + 1, rz: LAKE.rz + 1 } })
  P.ice.push({ ellipse: { x: WATERFALL.x - 5, z: WATERFALL.z, rx: 6, rz: 7 } })

  // ===================================================================== Desa Emberwick
  const V = VILLAGE
  const vy = V.y
  P.pave.push({ ...SQUARE })
  const houses = [
    // utara jalan utama (menghadap selatan) & selatannya (menghadap utara)
    ...[638, 655, 726, 744].map(x => ({ x, z: -50, rot: FACE.selatan })),
    ...[638, 655, 726, 744].map(x => ({ x, z: -29.5, rot: FACE.utara })),
    // baris belakang utara & selatan
    ...[640, 726, 744].map(x => ({ x, z: -74, rot: FACE.selatan })),
    ...[640, 657, 728, 745].map(x => ({ x, z: -4, rot: FACE.utara })),
    // di kiri-kanan jalan utara–selatan (menghadap jalan)
    { x: 682, z: -76, rot: FACE.timur }, { x: 706.5, z: -76, rot: FACE.barat },
    { x: 682, z: -12, rot: FACE.timur }, { x: 706.5, z: -12, rot: FACE.barat },
  ]
  houses.forEach((h, i) => {
    const w = 6 + (i % 3) * 0.8
    const d = 5.2 + (i % 2) * 0.6
    const b = add({ type: 'rumah', x: h.x, y: vy, z: h.z, rot: h.rot, w, d, roof: i % 5, chimney: i % 4 !== 3, porch: i % 3 === 1, seed: i + 1 })
    P.warga.homes.push({ id: `desa-${i}`, desa: 'desa', x: h.x, z: h.z, y: vy, rot: h.rot, w, d, door: local(b, 0, d / 2 + 1.1) })
    localBox(b, 0, 0, w + 0.4, d + 0.4, 'kayu')
    block(h.x, h.z, w + 2, d + 2, h.rot)
    if (i % 4 !== 3) {
      const c = local(b, w * 0.28, -d * 0.12)
      P.smoke.push({ x: c.x, y: vy + 0.5 + 2.9 + Math.max(2.2, d * 0.62) + 1.6, z: c.z })
    }
  })
  // kedai panjang (bisa dimasuki): di utara alun-alun, pintu menghadap timur (jalan utara–selatan)
  {
    const w = 14
    const d = 9
    const b = add({ type: 'kedai', x: 664, y: vy, z: -80, rot: FACE.timur, w, d, roof: 1, door: 2.4 })
    const t = 0.5
    localBox(b, 0, -d / 2 + t / 2, w, t, 'kayu')
    for (const s of [-1, 1]) localBox(b, s * (w / 2 - t / 2), 0, t, d, 'kayu')
    const side = (w - 2.4) / 2
    for (const s of [-1, 1]) localBox(b, s * (1.2 + side / 2), d / 2 - t / 2, side, t, 'kayu')
    // perapian, meja, bangku, tong di dalam
    localBox(b, 0, -d / 2 + 1.1, 2.6, 1.3, 'batu')
    for (const s of [-1, 1]) localBox(b, s * w * 0.22, 0.6, 2.9, d * 0.5, 'kayu')
    for (const s of [-1, 1]) {
      const p = local(b, s * (w / 2 - 1.1), -d / 2 + 1.1)
      circle(p.x, p.z, 0.45, 'kayu')
    }
    block(b.x, b.z, d + 2, w + 2)
    const f = local(b, 0, -d / 2 + 1.5)
    light(f.x, vy + 1.2, f.z, '#ff9a4a', 26, 14)
    // ruang dalam (sumbu dunia: kedai diputar 90°, jadi lebar ↔ panjang)
    P.interiors.push({ id: 'kedai', rect: { x0: b.x - d / 2 + t, z0: b.z - w / 2 + t, x1: b.x + d / 2 - t, z1: b.z + w / 2 - t }, floor: vy + 0.35, ceil: vy + 0.35 + 3.6 - 0.4 })
    const c = local(b, 0, -d / 2 + 1.0)
    P.smoke.push({ x: c.x, y: vy + 7.2, z: c.z })
    // penduduk: kursi di kedua sisi kedua meja panjang (menghadap meja), juru masak di perapian
    const seats = []
    for (const s of [-1, 1])
      for (const side of [-1, 1])
        for (const lz of [-1.1, 0.1, 1.3, 2.5]) {
          const p = local(b, s * w * 0.22 + side * 0.9, lz) // di atas bangkunya (±0,85 dari meja)
          seats.push({ x: p.x, z: p.z, rot: b.rot + (side > 0 ? -Math.PI / 2 : Math.PI / 2) })
        }
    P.warga.tables.push({ id: 'kedai', desa: 'desa', x: b.x, z: b.z, y: vy + 0.35, rot: b.rot, len: w, seats, inside: true })
    const cook = local(b, 1.6, -d / 2 + 1.9)
    P.warga.spots.push({ kind: 'masak', desa: 'desa', x: cook.x, z: cook.z, y: vy + 0.35, rot: b.rot + Math.PI })
    const door = local(b, 0, d / 2 + 1.2)
    P.warga.spots.push({ kind: 'pintu-kedai', desa: 'desa', x: door.x, z: door.z, y: vy, rot: b.rot + Math.PI })
  }
  // pasar di alun-alun: kios di keempat sudut + dua di sisi utara
  const goods = ['roti', 'ikan', 'bulu', 'kayu', 'besi']
  ;[
    { x: 681, z: -53, rot: FACE.selatan }, { x: 707, z: -53, rot: FACE.selatan }, { x: 694, z: -55.5, rot: FACE.selatan },
    { x: 681, z: -30.5, rot: FACE.utara }, { x: 707, z: -30.5, rot: FACE.utara },
  ].forEach((k, i) => {
    const b = add({ type: 'kios', x: k.x, y: vy, z: k.z, rot: k.rot, color: i, goods: goods[i % goods.length] })
    localBox(b, 0, 0.45, 3.6, 1.2, 'kayu')
    const sell = local(b, 0, -0.7)
    const buy = local(b, 0, 1.95)
    P.warga.spots.push({ kind: 'kios', desa: 'desa', x: sell.x, z: sell.z, y: vy, rot: b.rot, goods: goods[i % goods.length], kios: i })
    P.warga.spots.push({ kind: 'beli', desa: 'desa', x: buy.x, z: buy.z, y: vy, rot: b.rot + Math.PI, goods: goods[i % goods.length], kios: i })
    for (const [sx, sz] of [[-1, -1], [1, -1]]) {
      const p = local(b, sx * 1.8, sz * 1.25)
      circle(p.x, p.z, 0.12, 'kayu')
    }
    block(k.x, k.z, 4.6, 3.6, k.rot)
  })
  // api unggun alun-alun, sumur, lentera di sepanjang jalan utama
  {
    add({ type: 'api', x: 686, y: vy, z: -47, rot: 0.3, lit: true, logs: true })
    circle(686, -47, 1.2, 'batu')
    light(686, vy + 1.6, -47, '#ffa050', 30, 18)
    add({ type: 'sumur', x: 702, y: vy, z: -34, rot: 0 })
    circle(702, -34, 1.25, 'batu')
    for (let x = 632; x <= 756; x += 24)
      for (const s of [-1, 1]) {
        if (x > 672 && x < 716) continue
        const z = -40 + s * 3.9
        add({ type: 'lentera', x, y: vy, z, rot: s > 0 ? FACE.utara : FACE.selatan })
        circle(x, z, 0.15, 'besi')
      }
  }
  // menara jaga di sudut timur laut desa (tangga turun ke selatan)
  {
    const h = 8
    add({ type: 'menara', x: 752, y: vy, z: -90, rot: FACE.selatan, h })
    const s = TOWER.size / 2
    for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) circle(752 + sx * (s - 0.2), -90 + sz * (s - 0.2), 0.3, 'kayu')
    P.surfaces.push({ x: 752, z: -90, hx: s + 0.2, hz: s + 0.2, rot: 0, y0: vy + h, y1: vy + h })
    P.surfaces.push({ x: 752, z: -90 + s + TOWER.stairLen / 2, hx: TOWER.stairW / 2, hz: TOWER.stairLen / 2, rot: 0, y0: vy + h, y1: vy })
    // pagar lantai pandang: hanya menahan yang berdiri di atasnya
    const yr = [vy + h - 0.3, vy + h + 2.2]
    box(752, -90 - s, TOWER.size, 0.2, 0, 'kayu', yr)
    for (const sx of [-1, 1]) box(752 + sx * s, -90, 0.2, TOWER.size, 0, 'kayu', yr)
    for (const sx of [-1, 1]) box(752 + sx * TOWER.size * 0.34, -90 + s, TOWER.size * 0.32, 0.2, 0, 'kayu', yr)
    block(752, -84, 6, 18)
    add({ type: 'api', x: 738, y: yAt(738, -91), z: -91, rot: 1.1, lit: true, logs: true })
    circle(738, -91, 1.2, 'batu')
    light(738, vy + 1.6, -91, '#ffa050', 22, 14)
  }
  // api unggun di gerbang barat, tumpukan kayu, gerobak, peti
  add({ type: 'api', x: 618, y: yAt(618, -52), z: -52, rot: 0.7, lit: true, logs: true })
  circle(618, -52, 1.2, 'batu')
  light(618, yAt(618, -52) + 1.6, -52, '#ffa050', 22, 14)
  for (const [x, z, rot, len] of [[648, -61, 0, 3], [734, -61, 0, 3.4], [650, -18, Math.PI, 3], [736, -17, Math.PI, 2.6]]) {
    add({ type: 'kayu-bakar', x, y: vy, z, rot, len })
    box(x, z, len + 0.4, 1.3, rot, 'kayu')
  }
  for (const [x, z, rot] of [[668, -44, 0.3], [721, -36, -0.6], [631, -32, 1.2]]) {
    add({ type: 'gerobak', x, y: vy, z, rot })
    box(x, z, 2.2, 3.2, rot, 'kayu')
  }
  for (const [x, z] of [[672, -63], [716, -60], [660, -22], [740, -22]]) {
    add({ type: 'peti', x, y: vy, z, rot: between(0, 3), n: 3, seed: Math.round(x) })
    circle(x, z, 1.1, 'kayu')
  }
  // pagar kayu di tepi utara & selatan desa
  for (const [x0, x1, z] of [[628, 676, -97], [712, 742, -97], [628, 680, 9], [708, 757, 9]]) {
    const len = x1 - x0
    add({ type: 'pagar', x: (x0 + x1) / 2, y: vy, z, rot: FACE.timur, len })
    box((x0 + x1) / 2, z, len, 0.2, 0, 'kayu')
  }
  block((V.x0 + V.x1) / 2, (V.z0 + V.z1) / 2, V.x1 - V.x0 + 6, V.z1 - V.z0 + 6)

  // ===================================================================== jembatan kayu
  for (const br of BRIDGES) {
    const dx = Math.sin(br.rot) * br.len / 2
    const dz = Math.cos(br.rot) * br.len / 2
    const ya = yAt(br.x - dx, br.z - dz) + 0.08
    const yb = yAt(br.x + dx, br.z + dz) + 0.08
    const arch = 0.9
    const s = { x: br.x, z: br.z, hx: br.w / 2, hz: br.len / 2, rot: br.rot, y0: ya, y1: yb, arch, a0: 0.12, a1: 0.88 }
    P.surfaces.push(s)
    add({ type: 'jembatan', x: br.x, y: 0, z: br.z, rot: br.rot, len: br.len, w: br.w, surface: s })
    // pegangan: menahan yang berjalan di atas jembatan (yang berdiri di es di bawahnya tidak)
    const lo = Math.min(ya, yb)
    for (const sg of [-1, 1]) {
      const p = { x: br.x + Math.cos(br.rot) * sg * (br.w / 2 + 0.1), z: br.z - Math.sin(br.rot) * sg * (br.w / 2 + 0.1) }
      box(p.x, p.z, 0.25, br.len * 0.86, br.rot, 'kayu', [lo + 0.4, Math.max(ya, yb) + arch + 2.5])
    }
    block(br.x, br.z, br.w + 2, br.len + 2, br.rot)
  }

  // ===================================================================== Kastel Frostfall
  const C = CASTLE
  const cy = C.y
  const WT = 2.4 // tebal tembok
  const WH = 9 // tinggi tembok
  P.pave.push({ x0: C.x0 + 1, z0: C.z0 + 1, x1: C.x1 - 1, z1: C.z1 - 1 })
  const wall = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0)
    const rot = Math.atan2(x1 - x0, z1 - z0)
    const x = (x0 + x1) / 2
    const z = (z0 + z1) / 2
    add({ type: 'tembok', x, y: cy, z, rot, len, t: WT, h: WH })
    box(x, z, WT, len, rot, 'batu')
    block(x, z, WT + 2, len + 2, rot)
  }
  const gz = (C.z0 + C.z1) / 2 // poros gerbang–aula (z = −331)
  const GATE = 10
  wall(C.x0 + 1, C.z0 + 4, C.x0 + 1, gz - GATE / 2)
  wall(C.x0 + 1, gz + GATE / 2, C.x0 + 1, C.z1 - 4)
  wall(C.x0 + 4, C.z0 + 1, C.x1 - 4, C.z0 + 1)
  wall(C.x0 + 4, C.z1 - 1, C.x1 - 4, C.z1 - 1)
  wall(C.x1 - 1, C.z0 + 4, C.x1 - 1, HALL.z0)
  wall(C.x1 - 1, HALL.z1, C.x1 - 1, C.z1 - 4)
  // menara di keempat sudut
  ;[[C.x0 + 1, C.z0 + 1], [C.x1 - 1, C.z0 + 1], [C.x0 + 1, C.z1 - 1], [C.x1 - 1, C.z1 - 1]].forEach(([x, z], i) => {
    add({ type: 'menara-kastel', x, y: cy, z, rot: 0, r: 5, h: 15, banner: i % 2 })
    circle(x, z, 5.4, 'batu')
    block(x, z, 12, 12)
  })
  // gerbang (lorong menghadap barat)
  {
    const b = add({ type: 'gerbang', x: C.x0 + 1, y: cy, z: gz, rot: FACE.barat, w: GATE + 4, h: 11, depth: 6 })
    const open = (GATE + 4) * 0.45
    const side = (GATE + 4 - open) / 2
    for (const s of [-1, 1]) localBox(b, s * (open / 2 + side / 2), 0, side, 6, 'batu')
    block(b.x, b.z, 8, GATE + 6)
  }
  // halaman: sumur beku, gerobak & peti yang ditinggalkan, kristal es di sudut, anglo padam
  add({ type: 'sumur', x: 984, y: cy, z: -352, rot: 0 })
  circle(984, -352, 1.25, 'batu')
  for (const [x, z, rot] of [[972, -306, 0.4], [990, -364, -1.2]]) {
    add({ type: 'gerobak', x, y: cy, z, rot })
    box(x, z, 2.2, 3.2, rot, 'kayu')
  }
  for (const [x, z] of [[966, -360], [1000, -300], [975, -318]]) {
    add({ type: 'peti', x, y: cy, z, rot: between(0, 3), n: 4, seed: Math.round(z) })
    circle(x, z, 1.1, 'kayu')
  }
  for (const [x, z, n, s] of [[962, -365, 6, 1.4], [1038, -298, 7, 1.6], [1038, -366, 5, 1.2], [962, -297, 5, 1.2]]) P.crystals.push({ x, y: cy, z, n, size: s, seed: Math.round(x + z) })
  for (const s of [-1, 1]) {
    const x = HALL.x0 - 4
    const z = gz + s * 4.5
    add({ type: 'anglo', x, y: cy, z, rot: 0 })
    circle(x, z, 0.6, 'besi')
    light(x, cy + 2.2, z, '#ff9040', 20, 12)
  }

  // ===================================================================== Ruang Singgasana
  {
    const H = HALL
    const L = H.x1 - H.x0
    const W = H.z1 - H.z0
    const cx = (H.x0 + H.x1) / 2
    const cz = (H.z0 + H.z1) / 2
    const door = 4.6
    add({ type: 'aula', x: cx, y: H.y, z: cz, rot: 0, L, W, h: H.wallH, t: H.wall, door })
    // dinding aula: dinding timur berbatas tinggi (lorong rahasia lewat di bawahnya)
    const yr = [H.y - 2, H.y + H.wallH + 4]
    box(H.x1 - H.wall / 2, cz, H.wall, W, 0, 'batu', yr)
    for (const s of [-1, 1]) box(cx, cz + s * (W / 2 - H.wall / 2), L, H.wall, 0, 'batu')
    const side = (W - door) / 2
    for (const s of [-1, 1]) box(H.x0 + H.wall / 2, cz + s * (door / 2 + side / 2), H.wall, side, 0, 'batu')
    // tiang-tiang
    for (let x = -L / 2 + 6; x <= L / 2 - 8; x += 6) for (const s of [-1, 1]) circle(cx + x, cz + s * W * 0.27, 0.75, 'batu')
    block(cx, cz, L + 2, W + 2)
    // singgasana di ujung timur (menghadap pintu barat) + anglo menyala
    add({ type: 'singgasana', x: THRONE.x, y: H.y, z: THRONE.z, rot: THRONE.rot })
    box(THRONE.x, THRONE.z, 6, 7, 0, 'batu')
    for (const s of [-1, 1]) light(THRONE.x - 1.3, H.y + 2.4, THRONE.z + s * 3, '#ff8a3a', 26, 14)
    P.interiors.push({ id: 'aula', rect: { x0: H.x0 + H.wall, z0: H.z0 + H.wall, x1: H.x1 - H.wall, z1: H.z1 - H.wall }, floor: H.y, ceil: H.y + H.wallH - 1.3 })
    P.pave.push({ x0: H.x0, z0: H.z0, x1: H.x1, z1: H.z1 })
    // tangga rahasia (di utara singgasana) + lempeng penutupnya + lantai aula di sekeliling lubang
    const st = CAVE.find(c => c.stair)
    const sx0 = Math.min(st.a.x, st.b.x)
    const sx1 = Math.max(st.a.x, st.b.x)
    const half = st.w / 2
    add({ type: 'tangga', x: sx0, y: H.y, z: st.a.z, rot: 0, len: sx1 - sx0, drop: H.y - st.ya, w: st.w })
    P.surfaces.push({ x: (sx0 + sx1) / 2, z: st.a.z, hx: half, hz: (sx1 - sx0) / 2, rot: Math.PI / 2, y0: H.y, y1: st.ya, stair: true })
    // lantai aula (permukaan rata) menutup lekuk tanah di tepi lubang tangga
    const ix0 = H.x0 + H.wall
    const ix1 = H.x1 - H.wall
    const iz0 = H.z0 + H.wall
    const iz1 = H.z1 - H.wall
    const hole = { x0: sx0 - 0.2, x1: sx1 + 0.2, z0: st.a.z - half - 0.2, z1: st.a.z + half + 0.2 }
    for (const r of [
      { x0: ix0, x1: ix1, z0: iz0, z1: hole.z0 },
      { x0: ix0, x1: ix1, z0: hole.z1, z1: iz1 },
      { x0: ix0, x1: hole.x0, z0: hole.z0, z1: hole.z1 },
      { x0: hole.x1, x1: ix1, z0: hole.z0, z1: hole.z1 },
    ]) if (r.x1 - r.x0 > 0.2 && r.z1 - r.z0 > 0.2) {
      P.surfaces.push({ x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2, hx: (r.x1 - r.x0) / 2, hz: (r.z1 - r.z0) / 2, rot: 0, y0: H.y, y1: H.y, floor: true })
      add({ type: 'lantai', x: (r.x0 + r.x1) / 2, y: H.y, z: (r.z0 + r.z1) / 2, rot: 0, w: r.x1 - r.x0, d: r.z1 - r.z0 })
    }
    // langkan batu di sisi panjang lubang (menahan yang berjalan di lantai aula)
    for (const s of [-1, 1]) {
      const z = st.a.z + s * (half + 0.25)
      add({ type: 'langkan', x: (sx0 + 2.5 + sx1) / 2, y: H.y, z, rot: FACE.timur, len: sx1 - sx0 - 2.5 })
      box((sx0 + 2.5 + sx1) / 2, z, sx1 - sx0 - 2.5, 0.45, 0, 'batu', [H.y - 0.5, H.y + 3])
    }
    P.trapdoor = {
      ...TRAPDOOR,
      // lantai lempeng (selama tertutup) & penghalang di ujung atas tangga (dari bawah)
      surface: { x: TRAPDOOR.x, z: TRAPDOOR.z, hx: TRAPDOOR.hx, hz: TRAPDOOR.hz, rot: 0, y0: H.y, y1: H.y, trapdoor: true },
      gate: { x: sx0 + 2.6, z: st.a.z, hx: 2.4, hz: half + 0.3, rot: 0, kind: 'batu', y0: st.ya - 8, y1: H.y - 0.25 },
      // tempat tombol muncul: di atas (lantai aula, dekat singgasana) / di bawah (tangga)
      top: { x: sx0 + 1.5, z: st.a.z + half + 1.6, y: H.y },
      bottom: { x: sx0 + 6, z: st.a.z, y: H.y - 2 },
    }
    P.colliders.push(P.trapdoor.gate)
    P.surfaces.push(P.trapdoor.surface)
  }

  // ===================================================================== air terjun, gua, harta
  add({ type: 'air-terjun', x: WATERFALL.x, y: WATERFALL.bottom, z: WATERFALL.z, rot: FACE.barat, h: WATERFALL.top - WATERFALL.bottom + 1, w: WATERFALL.w, lean: WATERFALL.lean })
  // bongkah batu di mulut gua (menghadap selatan, ke Lembah Atas)
  {
    const z = CAVE_MOUTH.z - 9
    add({ type: 'mulut-gua', x: CAVE_MOUTH.x + 1, y: yAt(CAVE_MOUTH.x + 1, z), z, rot: 0, w: 11, h: 7 })
  }
  // kristal es di dalam gua: di sepanjang dinding setiap rongga
  for (const c of CAVE) {
    if (c.stair) continue
    if (c.kind === 'bulat') {
      const n = Math.max(4, Math.round(c.r / 3))
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rand() * 0.5
        const r = c.r - 2.5 - rand() * 2
        const x = c.x + Math.cos(a) * r
        const z = c.z + Math.sin(a) * r
        P.crystals.push({ x, y: yAt(x, z), z, n: 5 + Math.floor(rand() * 5), size: between(0.8, 1.8), seed: i * 7 + Math.round(c.x), ungu: rand() < 0.3 })
      }
    } else {
      const len = Math.hypot(c.b.x - c.a.x, c.b.z - c.a.z)
      const ux = (c.b.x - c.a.x) / len
      const uz = (c.b.z - c.a.z) / len
      for (let s = 6; s < len - 3; s += 9 + rand() * 6) {
        const side = rand() < 0.5 ? -1 : 1
        const off = cavePassage(c) / 2 - 1.6
        const x = c.a.x + ux * s - uz * side * off
        const z = c.a.z + uz * s + ux * side * off
        P.crystals.push({ x, y: yAt(x, z), z, n: 4 + Math.floor(rand() * 4), size: between(0.6, 1.3), seed: Math.round(s * 13 + x), ungu: rand() < 0.25 })
      }
    }
  }
  // kristal besar di tepi danau & di Ruang Harta
  for (const a of [0.3, 2.1, 3.9, 5.2]) {
    const x = LAKE.x + Math.cos(a) * (LAKE.rx + 2.5)
    const z = LAKE.z + Math.sin(a) * (LAKE.rz + 2.5)
    P.crystals.push({ x, y: yAt(x, z), z, n: 9, size: 2.2, seed: Math.round(a * 100), ungu: a > 3 })
  }
  for (const c of P.crystals) if (c.size > 1.5 && c.y < cy) circle(c.x, c.z, c.size * 0.5, 'es')
  // cahaya biru kristal (dipakai satu lampu titik yang berpindah ke kristal terdekat, lihat cuaca.js)
  for (const c of P.crystals) if (c.size >= 1.4) light(c.x, c.y + c.size * 1.5, c.z, '#66c8ff', 18 * c.size, 9 + c.size * 3, 0)
  add({ type: 'harta', x: TREASURE.x, y: yAt(TREASURE.x, TREASURE.z), z: TREASURE.z, rot: TREASURE.rot })
  box(TREASURE.x, TREASURE.z, 1.7, 1.1, TREASURE.rot, 'kayu')
  P.chest = { x: TREASURE.x, y: yAt(TREASURE.x, TREASURE.z), z: TREASURE.z, rot: TREASURE.rot }
  light(TREASURE.x, P.chest.y + 2, TREASURE.z, '#ffd27a', 16, 10, 0)
  P.chests = [{ id: 'kristal', ...P.chest, koin: CAVES[0].chest.koin, key: CAVES[0].chest.key, pesan: CAVES[0].chest.pesan, gua: CAVES[0].name }]

  // ===================================================================== lima gua besar (v0.20.0)
  // Isi bertema tiap gua baru (CAVES selain Gua Es Kristal): bingkai batu di mulut, kristal di dinding,
  // tiang es & stalagmit, jurai es di bawah langit-langit yang rendah, perlengkapan tambang, bangkai
  // kapal, altar, peti harta. Acak sendiri (rng terpisah) supaya isi Frostfall yang lama tetap sama.
  {
    const rc = rng(2020)
    const rb = (a, b) => a + (b - a) * rc()
    // tinggi atap seperti mesh atap gua (gua.js): permukaan asli di titik grid, interpolasi segitiga
    const { step: gs, x0: gx0, z0: gz0 } = ground
    const meshRoof = (x, z) => {
      const fx = (x - gx0) / gs
      const fz = (z - gz0) / gs
      const i = Math.floor(fx)
      const j = Math.floor(fz)
      const u = fx - i
      const v = fz - j
      const at = (di, dj) => frostSurface(gx0 + (i + di) * gs, gz0 + (j + dj) * gs)
      const a = at(0, 0)
      const b = at(0, 1)
      const c = at(1, 1)
      const d = at(1, 0)
      return u + v <= 1 ? a + (d - a) * u + (b - a) * v : c + (b - c) * (1 - u) + (d - c) * (1 - v)
    }
    // Aula Gletser mengikuti gambar konsep pengguna (v0.21.0) — acak sendiri (rng 2121)
    const konsepAula = (cv, { floorAt, gapAt, crystal, route }) => {
      const rk = rng(2121)
      const kb = (a, b) => a + (b - a) * rk()
      const KS = cv.konsep
      const pool = cv.lakes[0]
      const A = KS.aula
      // permukaan air kolam (lebih lebar dari dasar rata kolam: tepinya yang landai juga tergenang)
      P.pools.push({ x: pool.x, z: pool.z, rx: pool.rx * 1.42, rz: pool.rz * 1.42, y: pool.air })
      // air terjun: di dinding aula di belakang kolam, menghadap ke tengah aula
      const dl = Math.hypot(pool.x - A.x, pool.z - A.z)
      const ux = (pool.x - A.x) / dl
      const uz = (pool.z - A.z) / dl
      let tw = 0
      for (let t = 0; t < 30; t += 0.5) {
        const x = pool.x + ux * t
        const z = pool.z + uz * t
        if (floorAt(x, z) === null || yAt(x, z) > A.y + 1.2) break
        tw = t
      }
      // 2 m di depan kaki dinding (dinding gua melandai menjauh ke atas); tingginya dari atap di atas kolam
      const wx = pool.x + ux * (tw - 2)
      const wz = pool.z + uz * (tw - 2)
      const wh = Math.min(18, gapAt(pool.x, pool.z) - 4)
      const rot = Math.atan2(-ux, -uz)
      P.waterfalls.push({ x: wx, y: pool.air - 0.15, z: wz, rot, h: wh, w: 6.5 })
      box(wx + ux * 0.4, wz + uz * 0.4, 7, 1.2, rot, 'es')
      light(wx - ux * 2, pool.air + 3, wz - uz * 2, '#9fe9ff', 26, 16, 0)
      // berkas cahaya dari celah atap jatuh di kolam, sedikit miring
      P.shafts.push({ x: pool.x - ux * 2, y: pool.air, z: pool.z - uz * 2, h: Math.min(34, gapAt(pool.x, pool.z) + 2), r: 3.2, tilt: 0.22, rot: rot + 0.9 })
      // bongkah salju pipih terapung di kolam (tidak di kaki air terjun)
      for (let i = 0, n = 0; i < 40 && n < 4; i++) {
        const a = rk() * Math.PI * 2
        const d = 0.25 + rk() * 0.5
        const x = pool.x + Math.cos(a) * pool.rx * d
        const z = pool.z + Math.sin(a) * pool.rz * d
        const r = kb(1.2, 2.2)
        if (Math.hypot(x - wx, z - wz) < 6 + r || P.build.some(b => b.type === 'bongkah-salju' && Math.hypot(b.x - x, b.z - z) < b.r + r + 1.2)) continue
        add({ type: 'bongkah-salju', x, y: pool.air + 0.1, z, rot: kb(0, 6), r, seed: i + 5 })
        circle(x, z, r * 0.85, 'es')
        n++
      }
      // batu berukir di kiri-kanan kaki air terjun
      for (const sgn of [-1, 1]) {
        const x = wx - ux * 3.5 + uz * sgn * 7.5
        const z = wz - uz * 3.5 - ux * sgn * 7.5
        if (floorAt(x, z) === null || yAt(x, z) > A.y + 1) continue
        add({ type: 'batu-rune', x, y: yAt(x, z) - 0.1, z, rot: Math.atan2(A.x - x, A.z - z), seed: sgn + 3 })
        circle(x, z, 0.95, 'batu')
        light(x, yAt(x, z) + 2, z, '#66c8ff', 10, 7, 0)
      }
      // tebing bersalju menghadap kolam; tanjakan di belakangnya. Pijakan: puncak + tanjakan
      const T = KS.tebing
      const W = 6
      const Dd = 5
      const H = 2.6
      const RW = 2.4
      const RL = 7
      // menghadap kolam; bila sudut tebing atau ujung tanjakan jatuh di lereng dinding (grid kasar), putar
      // sedikit sampai semuanya di lantai aula yang rata
      const flat = (x, z) => floorAt(x, z) !== null && Math.abs(yAt(x, z) - A.y) < 0.9
      let trot = Math.atan2(pool.x - T.x, pool.z - T.z)
      for (const dr of [0, 0.4, -0.4, 0.8, -0.8, 1.2, -1.2]) {
        const tb0 = { x: T.x, z: T.z, rot: trot + dr }
        const pts = [[-W / 2, -Dd / 2], [W / 2, -Dd / 2], [W / 2, Dd / 2], [-W / 2, Dd / 2], [-W / 2 + RW / 2 + 0.3, -Dd / 2 - RL], [-W / 2 + 0.3, -Dd / 2 - RL], [-W / 2 + RW + 0.3, -Dd / 2 - RL]]
        if (pts.every(([lx, lz]) => {
          const q = local(tb0, lx, lz)
          return flat(q.x, q.z)
        })) {
          trot += dr
          break
        }
      }
      const tb = { x: T.x, z: T.z, rot: trot }
      let ty = -Infinity
      for (const [lx, lz] of [[-W / 2, -Dd / 2], [W / 2, -Dd / 2], [W / 2, Dd / 2], [-W / 2, Dd / 2], [0, 0]]) {
        const q = local(tb, lx, lz)
        ty = Math.max(ty, yAt(q.x, q.z))
      }
      add({ type: 'tebing', x: T.x, y: ty, z: T.z, rot: trot, w: W, d: Dd, h: H, rw: RW, rl: RL })
      P.surfaces.push({ x: T.x, z: T.z, hx: W / 2, hz: Dd / 2, rot: trot, y0: ty + H, y1: ty + H, ledge: true })
      const rc0 = local(tb, -W / 2 + RW / 2 + 0.3, -Dd / 2 - RL / 2)
      const far = local(tb, -W / 2 + RW / 2 + 0.3, -Dd / 2 - RL)
      P.surfaces.push({ x: rc0.x, z: rc0.z, hx: RW / 2, hz: RL / 2, rot: trot, y0: yAt(far.x, far.z), y1: ty + H, ledge: true })
      P.konsep = { tebing: { x: T.x, z: T.z, y: ty + H, ramp: far, top: local(tb, -W / 2 + RW / 2 + 0.3, -Dd / 2 + 0.8), rot: trot }, waterfall: { x: wx, z: wz }, pool: P.pools[P.pools.length - 1] }
      // lengkung es berderet melintang jalan ke ruang berikutnya; kristal bercahaya di kakinya
      P.konsep.lengkung = []
      for (const [k, a] of KS.lengkung.entries()) {
        const seg = polyInfo(route, a.x, a.z)
        const p0 = route[seg.i]
        const p1 = route[seg.i + 1]
        const L = Math.hypot(p1.x - p0.x, p1.z - p0.z)
        const ax = (p1.x - p0.x) / L
        const az = (p1.z - p0.z) / L
        const y = yAt(a.x, a.z)
        const side = sgn => {
          let r = 1
          for (; r < 9; r += 0.25) {
            const px = a.x + az * sgn * r
            const pz = a.z - ax * sgn * r
            if (floorAt(px, pz) === null || Math.abs(yAt(px, pz) - y) > 0.9) break
          }
          return r
        }
        // dipusatkan di tengah lantai rata yang sebenarnya (dinding bergelombang bisa menggesernya)
        const sr = Math.min(side(1), 8.5)
        const sl = Math.min(side(-1), 8.5)
        const half = (sr + sl) / 2 - 0.9
        if (half < 2.4) continue
        const mid = (sr - sl) / 2
        const cx = a.x + az * mid
        const cz = a.z - ax * mid
        const t = 1.4 + rk() * 0.4
        const h = Math.min(gapAt(cx, cz) - 1.5, half * 1.5 + 5)
        add({ type: 'lengkung-es', x: cx, y: y - 0.2, z: cz, rot: Math.atan2(ax, az), span: half * 2, h, t, seed: k + 1 })
        P.konsep.lengkung.push({ x: cx, z: cz, span: half * 2, h })
        for (const sgn of [-1, 1]) {
          const lx = cx + az * sgn * half
          const lz = cz - ax * sgn * half
          circle(lx, lz, t * 1.15, 'es')
          crystal(lx + az * sgn * 1.4 + ax * 0.8, lz - ax * sgn * 1.4 + az * 0.8, 7, kb(1.6, 2.1), false)
        }
      }
    }

    for (const cv of CAVES) {
      if (cv.tema === 'kristal') continue
      const sys = CAVE_SYSTEMS.find(sy => sy.cave === cv)
      const floorAt = (x, z) => caveFloorIn(sys, x, z)
      const gapAt = (x, z) => meshRoof(x, z) - yAt(x, z)
      // titik di dalam rongga, setidaknya m meter dari dinding
      const insideBy = (x, z, m) => [[0, 0], [m, 0], [-m, 0], [0, m], [0, -m]].every(([dx, dz]) => floorAt(x + dx, z + dz) !== null)
      const ch = cv.chest
      // jalan utama (rute mulut → peti) & sekitar peti dijaga lapang
      const clear = (x, z, r) => polyInfo(cv.route, x, z).d > r + 2.4 && Math.hypot(x - ch.x, z - ch.z) > r + 3.5
      const lorong = cv.shapes.filter(c => c.kind === 'lorong')
      const bulat = cv.shapes.filter(c => c.kind === 'bulat')
      const axis = c => {
        const len = Math.hypot(c.b.x - c.a.x, c.b.z - c.a.z)
        return { len, ux: (c.b.x - c.a.x) / len, uz: (c.b.z - c.a.z) / len }
      }
      const crystal = (x, z, n, size, ungu) => {
        if (floorAt(x, z) === null) return
        const y = yAt(x, z)
        P.crystals.push({ x, y, z, n, size, seed: Math.round(x * 3 + z * 7), ungu })
        if (size > 1.5) circle(x, z, size * 0.5, 'es')
        if (size >= 1.4) light(x, y + size * 1.5, z, ungu ? '#a99cff' : '#66c8ff', 18 * size, 9 + size * 3, 0)
      }
      const pillar = (x, z, r, tinggi, seed) => {
        const gap = gapAt(x, z)
        const atap = gap < tinggi + 3
        add({ type: 'tiang-es', x, y: yAt(x, z), z, rot: rb(0, 6), h: atap ? gap + 0.6 : tinggi, r, sampai: atap, seed })
        circle(x, z, r * 1.1, 'es')
      }

      // bingkai batu & es di mulut gua, menghadap keluar lorong pertama, di tempat atapnya cukup tinggi
      for (const m of cv.mouths) {
        const c0 = cv.shapes[0]
        const { ux, uz } = axis(c0)
        let x = c0.a.x + ux * 6
        let z = c0.a.z + uz * 6
        for (let t = 3; t < 22; t += 1) {
          x = c0.a.x + ux * t
          z = c0.a.z + uz * t
          if (gapAt(x, z) >= m.h) break
        }
        add({ type: 'mulut-gua', x, y: yAt(x, z), z, rot: Math.atan2(-ux, -uz), w: m.w, h: m.h })
      }

      // kristal di dinding setiap rongga — tambang: kristal ungu hanya di Urat Kristal & ujung terowongan
      const ungu = { tambang: 1, gletser: 0, katedral: 0.3, laut: 0.15, tiang: 0.25 }[cv.tema]
      for (const c of cv.shapes) {
        if (cv.tema === 'tambang' && !(c.kind === 'bulat' && c.r < 18)) continue
        if (c.kind === 'bulat') {
          const n = Math.max(4, Math.round(c.r / 3.2))
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2 + rc() * 0.5
            const r = c.r - 2.5 - rc() * 2
            const x = c.x + Math.cos(a) * r
            const z = c.z + Math.sin(a) * r
            if (clear(x, z, 1)) crystal(x, z, 5 + Math.floor(rc() * 5), rb(0.9, cv.tema === 'katedral' ? 2.4 : 1.9), rc() < ungu)
          }
        } else {
          const { len, ux, uz } = axis(c)
          for (let t = 6; t < len - 3; t += 9 + rc() * 6) {
            const side = rc() < 0.5 ? -1 : 1
            const off = cavePassage(c) / 2 - 1.6
            crystal(c.a.x + ux * t - uz * side * off, c.a.z + uz * t + ux * side * off, 4 + Math.floor(rc() * 4), rb(0.6, 1.3), rc() < ungu)
          }
        }
      }

      // jurai es di langit-langit yang rendah (5–16 m di atas lantai), dekat dinding lorong & ruang
      const jurai = (x, z) => {
        if (!insideBy(x, z, 1.5)) return
        const gap = gapAt(x, z)
        if (gap < 5 || gap > 16) return
        add({ type: 'jurai-es', x, y: meshRoof(x, z) + 0.15, z, rot: rb(0, 6), n: 5 + Math.floor(rc() * 5), len: Math.min(3, gap * 0.22), seed: Math.round(x + z) })
      }
      for (const c of lorong) {
        const { len, ux, uz } = axis(c)
        for (let t = 3; t < len; t += 5) for (const side of [-1, 1]) jurai(c.a.x + ux * t - uz * side * (cavePassage(c) / 2 - 2.2), c.a.z + uz * t + ux * side * (cavePassage(c) / 2 - 2.2))
      }
      for (const c of bulat)
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2
          jurai(c.x + Math.cos(a) * (c.r - 3), c.z + Math.sin(a) * (c.r - 3))
        }

      if (cv.tema === 'tambang') {
        // penyangga kayu tiap ±7 m di setiap lorong, selebar lorong sebenarnya di grid ini (sampai lantai
        // mulai naik ke dinding); lentera di setiap penyangga kedua
        for (const c of lorong) {
          const { len, ux, uz } = axis(c)
          const rot = Math.atan2(ux, uz)
          let k = 0
          for (let t = 4; t < len - 3; t += 7) {
            const x = c.a.x + ux * t
            const z = c.a.z + uz * t
            const y = yAt(x, z)
            const side = sgn => {
              let r = 0.5
              for (; r < 9; r += 0.25) {
                const px = x + uz * sgn * r
                const pz = z - ux * sgn * r
                if (floorAt(px, pz) === null || Math.abs(yAt(px, pz) - y) > 0.5) break
              }
              return r - 0.6
            }
            const half = Math.min(side(1), side(-1), 4.5)
            const h = Math.min(4.2, gapAt(x, z) - 0.4)
            if (half < 1.6 || h < 2.8) continue
            add({ type: 'penyangga', x, y, z, rot, w: half * 2, h })
            for (const sgn of [-1, 1]) circle(x + uz * sgn * (half - 0.15), z - ux * sgn * (half - 0.15), 0.3, 'kayu')
            if (k++ % 2 === 0) {
              const lx = x + uz * (half - 0.55) + ux * 0.7
              const lz = z - ux * (half - 0.55) + uz * 0.7
              const ly = yAt(lx, lz)
              add({ type: 'lentera', x: lx, y: ly, z: lz, rot: rot - Math.PI / 2 })
              light(lx, ly + 2.7, lz, '#ffb060', 22, 12, 1)
            }
          }
        }
        // rel dari mulut sampai Urat Kristal (potongan ≤ 3 m mengikuti lantai)
        const rails = cv.route.slice(1, 7)
        for (let i = 0; i < rails.length - 1; i++) {
          const a = rails[i]
          const b = rails[i + 1]
          const L = Math.hypot(b.x - a.x, b.z - a.z)
          const n = Math.ceil(L / 3)
          for (let k = 0; k < n; k++) {
            const x0 = a.x + ((b.x - a.x) * k) / n
            const z0 = a.z + ((b.z - a.z) * k) / n
            const x1 = a.x + ((b.x - a.x) * (k + 1)) / n
            const z1 = a.z + ((b.z - a.z) * (k + 1)) / n
            if (floorAt(x0, z0) === null || floorAt(x1, z1) === null) continue
            add({ type: 'rel', x: (x0 + x1) / 2, y: (yAt(x0, z0) + yAt(x1, z1)) / 2, z: (z0 + z1) / 2, rot: Math.atan2(x1 - x0, z1 - z0), len: L / n + 0.05 })
          }
        }
        // kereta tambang (di Aula Tambang, di ujung terowongan buntu, di Urat Kristal), peti kayu, bekas
        // api unggun penambang — hanya yang tidak menghalangi jalan utama
        const spot = (x, z, r) => floorAt(x, z) !== null && insideBy(x, z, r) && clear(x, z, r)
        for (const [x, z, rot] of [[638, -272, 2.2], [686, -318, -2.27], [606, -346, 0.9]]) {
          if (!spot(x, z, 1.2)) continue
          add({ type: 'kereta-tambang', x, y: yAt(x, z), z, rot })
          box(x, z, 1.3, 2.0, rot, 'besi')
        }
        for (const [x, z, n] of [[634, -282, 4], [644, -266, 3], [692, -323, 3], [612, -346, 3]]) {
          if (!spot(x, z, 1.1)) continue
          add({ type: 'peti', x, y: yAt(x, z), z, rot: rb(0, 3), n, seed: Math.round(x - z) })
          circle(x, z, 1.1, 'kayu')
        }
        if (spot(660, -280, 1)) {
          add({ type: 'api', x: 660, y: yAt(660, -280), z: -280, rot: 0, lit: false, logs: true })
          circle(660, -280, 0.9, 'kayu')
        }
        // lentera di kiri-kanan mulut tambang
        const m = cv.mouths[0]
        const c0 = cv.shapes[0]
        const { ux, uz } = axis(c0)
        for (const sgn of [-1, 1]) {
          const x = m.x + uz * sgn * 5.2 - ux * 1
          const z = m.z - ux * sgn * 5.2 - uz * 1
          add({ type: 'lentera', x, y: yAt(x, z), z, rot: Math.atan2(-ux, -uz) })
          light(x, yAt(x, z) + 2.7, z, '#ffb060', 22, 12, 1)
        }
      }

      if (cv.tema === 'gletser') {
        // tiang es di kedua ruang besar; yang langit-langitnya rendah menjadi tiang sampai atap. Tiang yang
        // jatuh di tempat isi Aula Gletser (kolam, tebing, lengkung) tidak dipasang — acaknya tetap dipakai,
        // jadi letak isi gua lain tidak bergeser
        const KS = cv.konsep
        const pool = cv.lakes[0]
        const diKonsep = (x, z, r) => Math.hypot((x - pool.x) / (pool.rx * 1.45), (z - pool.z) / (pool.rz * 1.45)) < 1 + r / pool.rx ||
          Math.hypot(x - KS.tebing.x, z - KS.tebing.z) < 11 + r || KS.lengkung.some(a => Math.hypot(x - a.x, z - a.z) < 8 + r)
        for (const c of bulat) {
          const want = Math.round(c.r / 3.4)
          let n = 0
          for (let i = 0; i < want * 6 && n < want; i++) {
            const a = rc() * Math.PI * 2
            const d = Math.sqrt(rc()) * (c.r - 3)
            const x = c.x + Math.cos(a) * d
            const z = c.z + Math.sin(a) * d
            const r = rb(0.9, 1.7)
            if (!insideBy(x, z, r + 1) || !clear(x, z, r)) continue
            const tinggi = rb(7, 14)
            if (diKonsep(x, z, r)) rb(0, 6)
            else pillar(x, z, r, tinggi, i + 31)
            n++
          }
        }
        konsepAula(cv, { floorAt, gapAt, crystal, route: cv.route })
        // air terjun beku di dinding timur Ruang Air Terjun Beku, menghadap ke tengah ruang
        const c = bulat[bulat.length - 1]
        let tw = 0
        for (let t = 0; t < c.r + 8; t += 0.5) {
          if (floorAt(c.x + t, c.z) === null || Math.abs(yAt(c.x + t, c.z) - c.y) > 1) break
          tw = t
        }
        const fx = c.x + tw - 2.2
        const h = Math.min(14, gapAt(fx, c.z) - 1)
        if (h > 4) {
          add({ type: 'air-terjun', x: fx, y: yAt(fx, c.z), z: c.z, rot: FACE.barat, h, w: 7, lean: 0 })
          box(fx, c.z, 1.6, 7.5, 0, 'es')
          P.ice.push({ ellipse: { x: fx - 2.5, z: c.z, rx: 4.5, rz: 5 } })
        }
      }

      if (cv.tema === 'katedral') {
        // barisan tiang es raksasa melingkar seperti tiang katedral (yang menghalangi rute dilewati)
        const c = bulat[0]
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2
          const x = c.x + Math.cos(a) * c.r * 0.66
          const z = c.z + Math.sin(a) * c.r * 0.66
          const r = rb(1.5, 2.3)
          if (!insideBy(x, z, r + 1) || !clear(x, z, r)) continue
          pillar(x, z, r, rb(26, 42), i + 7)
        }
        // stalagmit batu di antara tiang
        let n = 0
        for (let i = 0; i < 80 && n < 16; i++) {
          const a = rc() * Math.PI * 2
          const d = Math.sqrt(rc()) * (c.r - 3)
          const x = c.x + Math.cos(a) * d
          const z = c.z + Math.sin(a) * d
          const r = rb(0.8, 1.6)
          if (!insideBy(x, z, r + 1) || !clear(x, z, r)) continue
          add({ type: 'stalagmit', x, y: yAt(x, z), z, rot: rb(0, 6), h: rb(3, 9), r, seed: i + 3, es: false })
          circle(x, z, r * 1.1, 'batu')
          n++
        }
      }

      if (cv.tema === 'laut') {
        // bangkai kapal terjebak di laguna beku, peti-peti muatannya, bongkah es
        const lk = cv.lakes[0]
        const wx = lk.x + 2
        const wz = lk.z + 1
        add({ type: 'bangkai-kapal', x: wx, y: lk.y + 0.05, z: wz, rot: 0.55, len: 14 })
        box(wx, wz, 5, 14, 0.55, 'kayu')
        for (const [x, z, n] of [[lk.x - 8, lk.z + 4, 4], [lk.x + 9, lk.z - 5, 3]]) {
          add({ type: 'peti', x, y: yAt(x, z), z, rot: rb(0, 3), n, seed: Math.round(x + z) })
          circle(x, z, 1.1, 'kayu')
        }
        let n = 0
        for (let i = 0; i < 60 && n < 10; i++) {
          const x = lk.x + rb(-1, 1) * lk.rx
          const z = lk.z + rb(-1, 1) * lk.rz
          const r = rb(0.7, 1.4)
          if (Math.hypot((x - lk.x) / lk.rx, (z - lk.z) / lk.rz) > 0.9 || Math.hypot(x - wx, z - wz) < 9 || !clear(x, z, r)) continue
          add({ type: 'stalagmit', x, y: yAt(x, z), z, rot: rb(0, 6), h: rb(0.8, 2), r, seed: i + 50, es: true })
          circle(x, z, r, 'es')
          n++
        }
      }

      if (cv.tema === 'tiang') {
        // hutan tiang: kisi berjarak ±6,5 m yang digeser acak — stalagmit batu & tiang es (sampai atap
        // bila langit-langitnya terjangkau)
        const c = bulat[0]
        for (let gx = c.x - c.r; gx <= c.x + c.r; gx += 6.5)
          for (let gz = c.z - c.r; gz <= c.z + c.r; gz += 6.5) {
            const x = gx + rb(-2, 2)
            const z = gz + rb(-2, 2)
            const es = rc() < 0.45
            const r = es ? rb(1.0, 1.8) : rb(0.9, 1.6)
            if (Math.hypot(x - c.x, z - c.z) > c.r - 2 || !insideBy(x, z, r + 0.8) || !clear(x, z, r)) continue
            if (es) pillar(x, z, r, rb(10, 22), Math.round(gx * 3 + gz))
            else {
              add({ type: 'stalagmit', x, y: yAt(x, z), z, rot: rb(0, 6), h: rb(4, 11), r, seed: Math.round(gx + gz), es: false })
              circle(x, z, r * 1.05, 'batu')
            }
          }
      }

      // danau beku: cat es di masker tanah
      for (const l of cv.lakes) P.ice.push({ ellipse: { x: l.x, z: l.z, rx: l.rx + 1, rz: l.rz + 1 } })

      // peti harta menghadap arah datangnya pemain (titik rute sebelumnya); altar di belakangnya
      // (Katedral Taring), tiang kembar mengapitnya (Gua Seribu Tiang)
      const prev = cv.route[cv.route.length - 2]
      const rot = Math.atan2(prev.x - ch.x, prev.z - ch.z)
      const y = yAt(ch.x, ch.z)
      add({ type: 'harta', x: ch.x, y, z: ch.z, rot })
      box(ch.x, ch.z, 1.7, 1.1, rot, 'kayu')
      P.chests.push({ id: cv.id, x: ch.x, y, z: ch.z, rot, koin: ch.koin, key: ch.key, pesan: ch.pesan, gua: cv.name })
      light(ch.x, y + 2, ch.z, '#ffd27a', 16, 10, 0)
      const fx = Math.sin(rot)
      const fz = Math.cos(rot)
      if (cv.tema === 'katedral') {
        const ax = ch.x - fx * 2.8
        const az = ch.z - fz * 2.8
        add({ type: 'altar', x: ax, y: yAt(ax, az), z: az, rot })
        box(ax, az, 4.2, 2.4, rot, 'batu')
        for (const sgn of [-1, 1]) crystal(ax - fz * sgn * 3.6 - fx * 0.6, az + fx * sgn * 3.6 - fz * 0.6, 9, 2.4, sgn > 0)
      }
      if (cv.tema === 'tiang')
        for (const sgn of [-1, 1]) {
          const x = ch.x + fz * sgn * 3.4
          const z = ch.z - fx * sgn * 3.4
          if (floorAt(x, z) !== null) pillar(x, z, 1.6, 30, sgn + 90)
        }
    }
  }

  // ===================================================================== kemah pemburu
  for (const c of CAMPS) {
    const b = { x: c.x, z: c.z, rot: c.rot }
    const put = (type, lx, lz, rot, extra = {}) => {
      const p = local(b, lx, lz)
      return add({ type, x: p.x, y: yAt(p.x, p.z), z: p.z, rot: c.rot + rot, ...extra })
    }
    put('tenda', 0, -3.5, 0)
    localBox(b, 0, -3.5, 3.4, 3.4, 'kain')
    put('api', 0, 2, 0, { lit: false, logs: true })
    put('rak', 4.2, -1, -0.6)
    put('luncur', -4, 1, 0.8)
    put('peti', 3.4, 3.2, 0.3, { n: 3, seed: Math.round(c.x) })
    for (const [lx, lz, r] of [[4.2, -1, 0.3], [-4, 1, 1.1], [3.4, 3.2, 1.1]]) {
      const p = local(b, lx, lz)
      circle(p.x, p.z, r, 'kayu')
    }
    block(c.x, c.z, 14, 14)
  }

  // ===================================================================== penduduk (v0.22.0)
  // Rumah-rumah Desa Emberwick sudah tercatat di atas. Di sini: tempat berkegiatan di desa, dua kampung
  // baru (nelayan & pemburu) lengkap dengan rumah, api unggun bersama, dan tempat kerjanya, lubang
  // pancing di es sungai, tunggul tebangan di tepi hutan. Semua untuk warga.js.
  const W = P.warga
  const spot = (kind, desa, x, z, rot, extra = {}) => W.spots.push({ kind, desa, x, z, y: extra.y ?? yAt(x, z), rot, ...extra })
  // api unggun bersama + bangku gelondong melingkar (2 tempat duduk per bangku, menghadap api)
  const fireRing = (id, desa, x, z, y, { benches = 4, r = 3.4, start = Math.PI / 4, light: lit = true } = {}) => {
    const seats = []
    for (let i = 0; i < benches; i++) {
      const a = start + (i / benches) * Math.PI * 2
      const bx = x + Math.sin(a) * r
      const bz = z + Math.cos(a) * r
      const rot = a + Math.PI / 2 // panjang bangku menyinggung lingkaran
      add({ type: 'bangku', x: bx, y, z: bz, rot, len: 2.4 })
      box(bx, bz, 2.4, 0.55, rot, 'kayu')
      for (const s of [-0.6, 0.6]) {
        const sx = bx + Math.cos(rot) * s
        const sz = bz - Math.sin(rot) * s
        // duduk di atas bangku (sedikit ke sisi luar), menghadap api
        const ox = sx + Math.sin(a) * 0.12
        const oz = sz + Math.cos(a) * 0.12
        seats.push({ x: ox, z: oz, rot: Math.atan2(x - ox, z - oz) })
      }
    }
    W.fires.push({ id, desa, x, z, y, seats, r })
    if (lit) light(x, y + 1.6, z, '#ffa050', 26, 16)
  }
  const tableAt = (id, desa, x, z, y, rot, len = 4.8) => {
    add({ type: 'meja', x, y, z, rot, len })
    box(x, z, len, 2.1, rot, 'kayu')
    const seats = []
    for (const side of [-1, 1])
      for (let lx = -len / 2 + 0.7; lx <= len / 2 - 0.6; lx += 0.95) {
        const c = Math.cos(rot)
        const sn = Math.sin(rot)
        const lz = side * 0.85
        seats.push({ x: x + lx * c + lz * sn, z: z - lx * sn + lz * c, rot: rot + (side > 0 ? Math.PI : 0) })
      }
    W.tables.push({ id, desa, x, z, y, rot, len, seats })
  }

  // ----- Desa Emberwick: bangku di sekeliling api unggun alun-alun, meja jamuan, sumur, menara, kayu
  {
    fireRing('alun-alun', 'desa', 686, -47, vy, { light: false })
    tableAt('alun-alun', 'desa', 703, -45, vy, 0)
    W.plazas.push({ desa: 'desa', x: 694, z: -42, y: vy, r: 14 })
    spot('sumur', 'desa', 702, -32.2, Math.PI, { y: vy })
    spot('jaga', 'desa', 752, -90, Math.PI, { y: vy + 8 })
    for (const [x, z, rot] of [[648, -63.4, 0], [734, -63.4, 0], [650, -15.6, Math.PI], [736, -14.6, Math.PI]]) spot('kayu', 'desa', x, z, rot, { y: vy })
    // tempat bermain anak: sudut alun-alun & lapangan di selatan jalan utama
    for (const [x, z] of [[690, -35], [699, -51], [672, -32], [716, -48]]) spot('main', 'desa', x, z, 0, { y: vy })
    // pandai besi di belakang kios besi (menempa di landasan)
    {
      const x = 707
      const z = -26.6
      add({ type: 'peti', x: x + 2.2, y: vy, z, rot: 0.2, n: 2, seed: 77 })
      circle(x + 2.2, z, 0.8, 'kayu')
      spot('tempa', 'desa', x - 0.5, z, Math.PI, { y: vy })
    }
  }

  // ----- kampung nelayan & pemburu
  const HOUSE_ROT = [FACE.selatan, FACE.utara, FACE.selatan, FACE.utara]
  for (const K of HAMLETS) {
    const hy = K.y
    let n = 0
    K.rows.forEach((z, r) =>
      K.xs.forEach((x, c) => {
        const i = n++
        const seed = (K.id === 'nelayan' ? 40 : 80) + i
        const w = 5.8 + ((i * 7) % 3) * 0.7
        const d = 5.0 + ((i * 5) % 2) * 0.6
        const rot = HOUSE_ROT[r]
        const b = add({ type: 'rumah', x, y: hy, z, rot, w, d, roof: (i + (K.id === 'nelayan' ? 2 : 4)) % 5, chimney: i % 5 !== 4, porch: (i + r) % 3 === 0, seed })
        localBox(b, 0, 0, w + 0.4, d + 0.4, 'kayu')
        block(x, z, w + 2, d + 2, rot)
        if (i % 5 !== 4) {
          const cc = local(b, w * 0.28, -d * 0.12)
          P.smoke.push({ x: cc.x, y: hy + 0.5 + 2.9 + Math.max(2.2, d * 0.62) + 1.6, z: cc.z })
        }
        W.homes.push({ id: `${K.id}-${i}`, desa: K.id, x, z, y: hy, rot, w, d, door: local(b, 0, d / 2 + 1.1), col: c, row: r })
      }))
    // lorong kampung (cat jalan) + jaringan jalan penduduk
    for (const lz of K.lanes) {
      P.roads.push([K.x0 + 2, lz, K.x1 - 2, lz, 3.2])
      W.lanes.push([{ x: K.x0 + 2, z: lz }, { x: K.lane, z: lz }, { x: K.x1 - 2, z: lz }])
    }
    P.roads.push([K.lane, K.z0 + 2, K.lane, K.z1 - 2, 3.6])
    W.lanes.push([{ x: K.lane, z: K.z0 + 2 }, { x: K.lane, z: K.lanes[0] }, { x: K.lane, z: K.plaza.z }, { x: K.lane, z: K.lanes[1] }, { x: K.lane, z: K.z1 - 2 }])
    for (const line of K.paths) {
      for (let i = 0; i < line.length - 1; i++) P.roads.push([line[i].x, line[i].z, line[i + 1].x, line[i + 1].z, 3])
      W.lanes.push(line)
    }
    // lapangan kampung: api unggun bersama, bangku, meja jamuan, sumur, tumpukan kayu
    const pz = K.plaza
    add({ type: 'api', x: pz.x, y: hy, z: pz.z, rot: 0.4, lit: true, logs: true })
    circle(pz.x, pz.z, 1.2, 'batu')
    fireRing(`api-${K.id}`, K.id, pz.x, pz.z, hy)
    W.plazas.push({ desa: K.id, x: pz.x, z: pz.z, y: hy, r: 10 })
    const sumur = { x: K.xs[1] + 1, z: pz.z }
    add({ type: 'sumur', x: sumur.x, y: hy, z: sumur.z, rot: 0 })
    circle(sumur.x, sumur.z, 1.25, 'batu')
    spot('sumur', K.id, sumur.x + 1.8, sumur.z, -Math.PI / 2, { y: hy })
    const wood = { x: K.xs[0] - 0.5, z: pz.z }
    add({ type: 'kayu-bakar', x: wood.x, y: hy, z: wood.z - 1.6, rot: 0, len: 3 })
    box(wood.x, wood.z - 1.6, 3.4, 1.3, 0, 'kayu')
    add({ type: 'tunggul', x: wood.x, y: hy, z: wood.z + 1.2, rot: 0.3 })
    circle(wood.x, wood.z + 1.2, 0.55, 'kayu')
    spot('kayu', K.id, wood.x, wood.z + 2.4, Math.PI, { y: hy })
    for (const [dx, dz] of [[-6, 4], [6, -4]]) spot('main', K.id, pz.x + dx, pz.z + dz, 0, { y: hy })
    // pondok pengasapan (pintu menghadap lapangan, ke barat)
    const asap = { x: K.xs[3] + 6.5, z: pz.z }
    const ab = add({ type: 'pengasapan', x: asap.x, y: hy, z: asap.z, rot: -Math.PI / 2 })
    localBox(ab, 0, 0, 4.0, 3.4, 'kayu')
    block(asap.x, asap.z, 6, 5)
    const top = local(ab, -3.6 * 0.28, -3.0 * 0.15)
    P.smoke.push({ x: top.x, y: hy + 5.0, z: top.z })
    const asapDoor = local(ab, 0, 2.6)
    spot('asap', K.id, asapDoor.x, asapDoor.z, ab.rot + Math.PI, { y: hy })
    if (K.id === 'pemburu') {
      // rangka penjemur kulit, kereta luncur
      for (const [dx, dz, rot] of [[-12, -3.2, 0], [-12, 3.2, Math.PI]]) {
        const x = pz.x + dx
        const z = pz.z + dz
        add({ type: 'rangka-kulit', x, y: hy, z, rot })
        box(x, z, 2.3, 0.4, rot, 'kayu')
        spot('kulit', K.id, x, z + (rot ? -1.1 : 1.1), rot ? 0 : Math.PI, { y: hy })
      }
      add({ type: 'luncur', x: pz.x + 4, y: hy, z: K.z1 + 1, rot: 0.25 })
      box(pz.x + 4, K.z1 + 1, 1.3, 2.6, 0.25, 'kayu')
    }
  }
  // ----- pantai nelayan: dermaga kecil, sampan, rak ikan, tempat memancing
  {
    const len = PIER.x1 - PIER.x0
    const mid = (PIER.x0 + PIER.x1) / 2
    add({ type: 'dermaga', x: mid, y: PIER.deck, z: PIER.z, rot: FACE.timur, w: PIER.w, len })
    P.surfaces.push({ x: mid, z: PIER.z, hx: len / 2, hz: PIER.w / 2, rot: 0, y0: PIER.deck, y1: PIER.deck })
    block(mid, PIER.z, len + 2, PIER.w + 2)
    // ujung dermaga & kedua sisinya (menghadap laut)
    spot('mancing', 'nelayan', PIER.x0 + 1.2, PIER.z, FACE.barat, { y: PIER.deck })
    for (const x of [PIER.x0 + 5, PIER.x0 + 11]) {
      spot('mancing', 'nelayan', x, PIER.z - PIER.w / 2 + 0.45, FACE.utara, { y: PIER.deck })
      spot('mancing', 'nelayan', x, PIER.z + PIER.w / 2 - 0.45, FACE.selatan, { y: PIER.deck })
    }
    // sisi Dermaga Frostfall (di selatan kampung): nelayan memancing dari kedua sisinya
    const df = docks.find(d => d.id === 'frostfall')
    if (df)
      for (const t of [0.25, 0.55, 0.85]) {
        const x = df.s0 + (df.s1 - df.s0) * t
        spot('mancing', 'nelayan', x, df.at - df.width / 2 + 0.45, FACE.utara, { y: 1.75 })
        spot('mancing', 'nelayan', x, df.at + df.width / 2 - 0.45, FACE.selatan, { y: 1.75 })
      }
    // tepi air di pantai (menghadap barat)
    for (const z of [-98, -88, -76, -64, -42, -30, -18]) {
      let x = 446
      while (x > 430 && yAt(x - 1, z) > 0.12) x -= 0.5
      spot('mancing', 'nelayan', x, z, FACE.barat)
    }
    // sampan (terbalik di pasir & tegak di tepi air), rak ikan
    for (const [x, z, rot, terbalik] of [[452, -82, -1.45, true], [451, -70, -1.7, true], [447, -44, -1.5, false], [452, -33, -1.62, true]]) {
      add({ type: 'sampan', x, y: yAt(x, z), z, rot, terbalik })
      box(x, z, 1.2, 4.2, rot, 'kayu')
    }
    for (const [x, z] of [[458, -88], [459, -63], [459, -49], [458, -26]]) {
      add({ type: 'rak-ikan', x, y: yAt(x, z), z, rot: FACE.timur })
      box(x, z, 0.4, 3.0, 0, 'kayu')
      spot('jemur', 'nelayan', x + 1.2, z, FACE.barat)
    }
  }
  // ----- lubang pancing di es Sungai Beku (dekat muara & di bawah desa)
  {
    const holes = [[540, 148, 472, 174, [0.28, 0.5, 0.72], 'nelayan'], [680, 84, 610, 118, [0.3, 0.6], 'desa']]
    for (const [ax, az, bx, bz, ts, desa] of holes) {
      const dx = bx - ax
      const dz = bz - az
      const l = Math.hypot(dx, dz)
      for (const t of ts) {
        const x = ax + dx * t + (-dz / l) * 2.5
        const z = az + dz * t + (dx / l) * 2.5
        const { y } = polyInfo(RIVER, x, z, ['y'])
        const hb = add({ type: 'lubang-es', x, y, z, rot: Math.atan2(dx, dz) })
        // duduk di bangku kecil lubang itu, menghadap lubangnya
        const seat = local(hb, -0.1, 0.85)
        spot('mancing-es', desa, seat.x, seat.z, Math.atan2(x - seat.x, z - seat.z), { y, hole: { x, z } })
      }
    }
  }
  // ----- tunggul tebangan di tepi hutan (penebang kayu Rusa Putih & Emberwick)
  for (const [x, z] of [[778, 190], [812, 192], [842, 184], [752, 182]]) {
    add({ type: 'tunggul', x, y: yAt(x, z), z, rot: x * 0.7 })
    circle(x, z, 0.55, 'kayu')
    block(x, z, 4, 4)
    spot('tebang', 'pemburu', x, z + 1.2, Math.PI)
  }

  // ===================================================================== pagar tinggi desa (v0.23.0)
  // tiap sisi keliling dipotong di gerbangnya; sisi dalam (palang) menghadap tengah desa. Penghalang
  // garis lurus setebal 0,7 m (miring: 1 m, supaya tetap menutup kisi penghalang penduduk tanpa celah)
  P.fences = []
  for (const F of FENCES) {
    const cx = F.loop.reduce((s, p) => s + p.x, 0) / F.loop.length
    const cz = F.loop.reduce((s, p) => s + p.z, 0) / F.loop.length
    const fence = { id: F.id, pieces: [], gates: [] }
    F.loop.forEach((a, i) => {
      const b = F.loop[(i + 1) % F.loop.length]
      const len = Math.hypot(b.x - a.x, b.z - a.z)
      const ux = (b.x - a.x) / len
      const uz = (b.z - a.z) / len
      const rot = Math.atan2(ux, uz)
      const at = t => ({ x: a.x + ux * t, z: a.z + uz * t })
      const straight = Math.abs(ux) < 1e-6 || Math.abs(uz) < 1e-6
      const cuts = F.gates
        .filter(g => segmentInfo(g.x, g.z, a.x, a.z, b.x, b.z).d < 0.01)
        .map(g => {
          const t = (g.x - a.x) * ux + (g.z - a.z) * uz
          return { g, t0: t - g.w / 2, t1: t + g.w / 2 }
        })
        .sort((p, q) => p.t0 - q.t0)
      let s = 0
      for (const c of [...cuts, { t0: len, t1: len }]) {
        if (c.t0 - s > 0.5) {
          const p0 = at(s)
          const p1 = at(c.t0)
          const m = { x: (p0.x + p1.x) / 2, z: (p0.z + p1.z) / 2 }
          const plen = c.t0 - s
          const inside = Math.sign(uz * (cx - m.x) - ux * (cz - m.z)) || 1
          // tampilan: di tanah yang tidak rata (tepi pad, tebing sungai) dipecah per ±2,5 m, tiap
          // potongan berdiri di titik terendah tanahnya (pagar bertingkat mengikuti lereng)
          const ys = []
          for (let t = 0; t <= plen + 1e-6; t += 0.5) ys.push(yAt(p0.x + ux * t, p0.z + uz * t))
          const flat = Math.max(...ys) - Math.min(...ys) < 0.12
          const nk = flat ? 1 : Math.max(1, Math.round(plen / 2.5))
          for (let k = 0; k < nk; k++) {
            const t0 = (plen * k) / nk
            const t1 = (plen * (k + 1)) / nk
            const lo = Math.min(...ys.slice(Math.floor(t0 / 0.5), Math.ceil(t1 / 0.5) + 1))
            const c = at(s + (t0 + t1) / 2)
            add({ type: 'pagar-tinggi', x: c.x, y: flat ? F.y : lo + 0.04, z: c.z, rot, len: t1 - t0, inside, seed: fence.pieces.length * 31 + k + 1 })
          }
          box(m.x, m.z, straight ? 0.7 : 1.0, plen, rot, 'kayu')
          block(m.x, m.z, 1.2, plen, rot)
          fence.pieces.push({ ax: p0.x, az: p0.z, bx: p1.x, bz: p1.z })
        }
        const { g } = c
        if (g) {
          const gy = Math.min(yAt(g.x + ux * g.w / 2, g.z + uz * g.w / 2), yAt(g.x - ux * g.w / 2, g.z - uz * g.w / 2))
          add({ type: 'gerbang-pagar', x: g.x, y: Math.min(F.y, gy + 0.04), z: g.z, rot, w: g.w, seed: fence.gates.length + 1 })
          for (const sg of [-1, 1]) circle(g.x + ux * sg * g.w / 2, g.z + uz * sg * g.w / 2, 0.42, 'kayu')
          fence.gates.push({ x: g.x, z: g.z, w: g.w, rot })
          if (g.jalur) P.warga.lanes.push(g.jalur)
        }
        s = c.t1
      }
      // tiang sudut
      add({ type: 'tiang-pagar', x: a.x, y: Math.abs(yAt(a.x, a.z) - F.y) < 0.12 ? F.y : yAt(a.x, a.z), z: a.z, rot: 0 })
      circle(a.x, a.z, 0.36, 'kayu')
    })
    P.fences.push(fence)
  }

  // ===================================================================== kawasan tanpa pohon
  P.clear = (x, z, r = 0) => {
    if (x > VILLAGE.x0 - 8 - r && x < VILLAGE.x1 + 8 + r && z > VILLAGE.z0 - 8 - r && z < VILLAGE.z1 + 8 + r) return true
    for (const k of HAMLETS) if (x > k.x0 - 12 - r && x < k.x1 + 12 + r && z > k.z0 - 12 - r && z < k.z1 + 12 + r) return true
    // jalur bebas pohon di luar pagar tinggi (mahkota pinus tidak menembus pagar)
    for (const f of P.fences) for (const q of f.pieces) if (segmentInfo(x, z, q.ax, q.az, q.bx, q.bz).d < 4.5 + r) return true
    if (x > 440 - r && x < 470 + r && z > -100 - r && z < -15 + r) return true
    // padang rumput salju tempat kawanan rusa kutub merumput
    for (const h of HERDS) if (Math.hypot(x - h.x, z - h.z) < 24 + r) return true
    if (x > CASTLE.x0 - 10 - r && x < CASTLE.x1 + 10 + r && z > CASTLE.z0 - 10 - r && z < CASTLE.z1 + 10 + r) return true
    if (x > CASTLE_YARD.x0 - 6 - r && x < CASTLE_YARD.x1 + r && z > CASTLE_YARD.z0 - 6 - r && z < CASTLE_YARD.z1 + 6 + r) return true
    if (Math.hypot(x - CAVE_MOUTH.x, z - CAVE_MOUTH.z + 6) < 16 + r) return true
    for (const cv of CAVES) for (const m of cv.mouths) if (Math.hypot(x - m.x, z - m.z) < m.r + 6 + r) return true
    if (Math.hypot(x - WATERFALL.x, z - WATERFALL.z) < 14 + r) return true
    const river = polyInfo(RIVER, x, z, ['w'])
    if (river.d < river.w / 2 + 5 + r) return true
    if (polyInfo(GORGE, x, z, ['w']).d < 6 + r) return true
    // Lembah Atas: hanya sedikit pohon (hash tetap per titik, bukan acak per panggilan)
    const hash = ((Math.sin(x * 12.9898 + z * 78.233) * 43758.5453) % 1 + 1) % 1
    if (x > HIGH_VALLEY.x0 && x < HIGH_VALLEY.x1 && z > HIGH_VALLEY.z0 && z < HIGH_VALLEY.z1 && hash < 0.85) return true
    return false
  }
  return P
}
