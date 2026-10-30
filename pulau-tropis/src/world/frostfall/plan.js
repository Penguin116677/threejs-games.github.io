import { rng } from '../../core/random.js'
import { dockSpans } from '../kencana/height.js'
import { TOWER } from './buildings.js'
import { cavePassage } from './height.js'
import {
  VILLAGE, SQUARE, CASTLE, CASTLE_YARD, HALL, THRONE, TRAPDOOR, CAVE, LAKE, TREASURE, CAVE_MOUTH, WATERFALL, RIVER, ROADS, TRAILS,
  GORGE, BRIDGES, DOCKS, CAMPS, HIGH_VALLEY, polyInfo,
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
    trapdoor: null,
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
  }
  // pasar di alun-alun: kios di keempat sudut + dua di sisi utara
  const goods = ['roti', 'ikan', 'bulu', 'kayu', 'besi']
  ;[
    { x: 681, z: -53, rot: FACE.selatan }, { x: 707, z: -53, rot: FACE.selatan }, { x: 694, z: -55.5, rot: FACE.selatan },
    { x: 681, z: -30.5, rot: FACE.utara }, { x: 707, z: -30.5, rot: FACE.utara },
  ].forEach((k, i) => {
    const b = add({ type: 'kios', x: k.x, y: vy, z: k.z, rot: k.rot, color: i, goods: goods[i % goods.length] })
    localBox(b, 0, 0.45, 3.6, 1.2, 'kayu')
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

  // ===================================================================== kawasan tanpa pohon
  P.clear = (x, z, r = 0) => {
    if (x > VILLAGE.x0 - 8 - r && x < VILLAGE.x1 + 8 + r && z > VILLAGE.z0 - 8 - r && z < VILLAGE.z1 + 8 + r) return true
    if (x > CASTLE.x0 - 10 - r && x < CASTLE.x1 + 10 + r && z > CASTLE.z0 - 10 - r && z < CASTLE.z1 + 10 + r) return true
    if (x > CASTLE_YARD.x0 - 6 - r && x < CASTLE_YARD.x1 + r && z > CASTLE_YARD.z0 - 6 - r && z < CASTLE_YARD.z1 + 6 + r) return true
    if (Math.hypot(x - CAVE_MOUTH.x, z - CAVE_MOUTH.z + 6) < 16 + r) return true
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
