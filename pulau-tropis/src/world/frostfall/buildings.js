import * as THREE from 'three'
import { Parts, K } from '../kencana/buildings.js'

// Bangunan low-poly Kerajaan Frostfall: rumah kayu gelondong beratap curam bersalju dengan jendela
// yang menyala hangat, kios pasar, menara jaga, kedai panjang, api unggun, tumpukan kayu, kastel
// batu (tembok bergerigi, menara bulat, gerbang), ruang singgasana yang ditinggalkan, air terjun
// beku, kristal es yang bercahaya, perlengkapan kemah pemburu, dan harta karun.
// Memakai pembuat Parts + shader bangunan yang sama dengan Kencana & Aeloria (K.SALJU = salju,
// K.ES = es, K.KRISTAL = kristal bercahaya, K.CAHAYA = api / jendela menyala).
// Titik asal = tengah alas di tanah, depan menghadap +z lokal.

export const FC = {
  kayu: '#6b4a32',
  kayuTua: '#43301f',
  kayuMuda: '#8f6a48',
  batu: '#8a8d93',
  batuTua: '#5c5f66',
  batuMuda: '#b3b6bc',
  salju: '#f1f5fb',
  es: '#bfe4f6',
  esTua: '#7fb8da',
  kristal: '#7fd8ff',
  kristalUngu: '#a9a2ff',
  jendela: '#ffc76e',
  api: '#ffb347',
  bara: '#ff6a2a',
  besi: '#7d838c',
  besiTua: '#3f444b',
  emas: '#d9b44a',
  emasTua: '#a8832c',
  merah: '#8c2f3a',
  biru: '#2f4f8c',
  bulu: '#8a7560',
  kain: '#cdbf9f',
}
// atap sirap: batu tulis kelabu, kayu tua, kelabu kebiruan, merah bata tua
export const ROOF = ['#4b4f58', '#5a3f2e', '#3f5560', '#6a3b2c', '#535a4a']
const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
const rnd = s0 => {
  let seed = s0
  return () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
}

// --------------------------------------------------------------------------- pembantu
// atap pelana curam bersalju: atap sirap + lapisan salju yang sedikit lebih kecil (tepi atap tetap
// terlihat), ujung segitiga papan kayu, deretan es menggantung di kedua tepi bawah
function snowRoof(P, l, w, y, h, roof, { icicles = true, seed = 1 } = {}) {
  P.gable(l, w, y, h, roof, K.SIRAP, FC.kayu, K.KAYU)
  P.gable(l * 0.97, w * 0.9, y + h * 0.1 + 0.08, h * 0.9 + 0.06, FC.salju, K.SALJU, FC.salju, K.SALJU)
  if (!icicles) return
  const r = rnd(seed * 97 + 13)
  for (const s of [-1, 1])
    for (let x = -l / 2 + 0.4; x < l / 2 - 0.2; x += 0.45 + r() * 0.5) {
      const len = 0.25 + r() * 0.55
      P.cyl(0.07, 0, len, 4, FC.es, K.ES, { x, y: y - len + 0.02, z: s * (w / 2 - 0.05) })
    }
}

// jendela menyala hangat (bingkai kayu + palang) di bidang z = zf
function warmWindow(P, x, y, zf, w = 0.9, h = 1.0) {
  const dir = Math.sign(zf) || 1
  P.box(w + 0.2, h + 0.2, 0.08, FC.kayuTua, K.KAYU, { x, y: y - 0.1, z: zf + dir * 0.02 })
  P.box(w, h, 0.06, FC.jendela, K.CAHAYA, { x, y, z: zf + dir * 0.06 })
  P.box(0.07, h, 0.08, FC.kayuTua, K.POLOS, { x, y, z: zf + dir * 0.09 })
  P.box(w, 0.07, 0.08, FC.kayuTua, K.POLOS, { x, y: y + h / 2 - 0.035, z: zf + dir * 0.09 })
  // salju di ambang jendela
  P.box(w + 0.3, 0.1, 0.25, FC.salju, K.SALJU, { x, y: y - 0.16, z: zf + dir * 0.12 })
}

// jendela di dinding samping (bidang x = xf), menghadap ±x
function sideWindow(P, xf, y, z, w = 0.9, h = 1.0) {
  const dir = Math.sign(xf) || 1
  P.box(0.08, h + 0.2, w + 0.2, FC.kayuTua, K.KAYU, { x: xf + dir * 0.02, y: y - 0.1, z })
  P.box(0.06, h, w, FC.jendela, K.CAHAYA, { x: xf + dir * 0.06, y, z })
  P.box(0.08, h, 0.07, FC.kayuTua, K.POLOS, { x: xf + dir * 0.09, y, z })
  P.box(0.25, 0.1, w + 0.3, FC.salju, K.SALJU, { x: xf + dir * 0.12, y: y - 0.16, z })
}

// gundukan salju (bola dipipihkan)
function drift(P, x, z, r, y = 0) {
  P.add(new THREE.IcosahedronGeometry(r, 1).scale(1, 0.35, 1), FC.salju, K.SALJU, { x, y, z, shade: [0.92, 1.0] })
}

// --------------------------------------------------------------------------- rumah & desa
// Rumah kayu gelondong: alas batu, dinding papan tebal berujung gelondong di sudut, atap pelana
// curam bersalju, cerobong batu (asap: lihat cuaca.js), pintu & jendela menyala, tumpukan kayu
export function rumahSalju(w, d, roof, { chimney = true, porch = false, seed = 1 } = {}) {
  const P = new Parts()
  const base = 0.5
  const wallH = 2.9
  P.box(w + 0.4, base, d + 0.4, FC.batu, K.BATU)
  P.box(w, wallH, d, FC.kayu, K.KAYU, { y: base })
  // ujung gelondong di keempat sudut
  for (const [sx, sz] of corners)
    for (let y = base + 0.15; y < base + wallH; y += 0.48) {
      P.add(new THREE.CylinderGeometry(0.17, 0.17, 0.55, 6).rotateZ(Math.PI / 2), FC.kayuMuda, K.KAYU, { x: sx * (w / 2 + 0.05), y, z: sz * (d / 2 - 0.12) })
      P.add(new THREE.CylinderGeometry(0.17, 0.17, 0.55, 6).rotateX(Math.PI / 2), FC.kayuMuda, K.KAYU, { x: sx * (w / 2 - 0.12), y: y + 0.24, z: sz * (d / 2 + 0.05) })
    }
  // pintu (depan) + tangga batu kecil + jendela
  P.box(1.1, 2.0, 0.1, FC.kayuTua, K.KAYU, { y: base, z: d / 2 + 0.04 })
  P.box(0.12, 0.12, 0.06, FC.besi, K.POLOS, { x: 0.35, y: base + 1.0, z: d / 2 + 0.11 })
  P.box(1.6, 0.25, 0.7, FC.batuTua, K.BATU, { z: d / 2 + 0.45 })
  for (const s of [-1, 1]) if (w > 4.6) warmWindow(P, s * w * 0.3, base + 1.55, d / 2 + 0.02)
  warmWindow(P, 0, base + 1.55, -d / 2 - 0.02, 1.0, 1.0)
  sideWindow(P, w / 2 + 0.02, base + 1.55, 0)
  sideWindow(P, -w / 2 - 0.02, base + 1.55, 0)
  // atap: bubungan sepanjang x (lebar rumah), teritis lebar
  const h = Math.max(2.2, d * 0.62)
  snowRoof(P, w + 1.2, d + 1.4, base + wallH, h, roof, { seed })
  if (chimney) {
    const cx = w * 0.28
    P.box(0.75, h + 1.6, 0.75, FC.batuTua, K.BATU, { x: cx, y: base + wallH - 0.2, z: -d * 0.12 })
    P.box(0.95, 0.2, 0.95, FC.salju, K.SALJU, { x: cx, y: base + wallH + h + 1.4, z: -d * 0.12 })
  }
  if (porch) {
    // teras beratap di depan pintu, ditopang dua tiang
    for (const s of [-1, 1]) P.cyl(0.1, 0.12, 2.3, 6, FC.kayuTua, K.KAYU, { x: s * 1.2, y: base, z: d / 2 + 1.5 })
    P.box(3.0, 0.15, 1.9, ROOF[1], K.SIRAP, { y: base + 2.3, z: d / 2 + 0.85, rx: 0.22 })
    P.box(2.9, 0.12, 1.7, FC.salju, K.SALJU, { y: base + 2.42, z: d / 2 + 0.8, rx: 0.22 })
  }
  // tumpukan kayu bakar di sisi rumah
  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3)
    P.add(new THREE.CylinderGeometry(0.16, 0.16, 1.1, 6).rotateX(Math.PI / 2), i % 2 ? FC.kayuMuda : FC.kayu, K.KAYU, { x: w / 2 + 0.55, y: 0.17 + row * 0.3, z: -0.6 + (i % 3) * 0.34 + row * 0.1 })
  }
  drift(P, -w / 2 - 0.4, d / 2 - 0.3, 0.9)
  drift(P, w / 2 + 0.3, -d / 2 + 0.2, 0.8)
  return P
}

// Kedai panjang (balai desa) yang bisa dimasuki: dinding kayu dengan pintu terbuka di depan,
// perapian menyala di dalam, meja-meja panjang, tong, kepala rusa di dinding. Pintu: lebar door.
export function kedaiPanjang(w, d, roof, door = 2.2) {
  const P = new Parts()
  const wallH = 3.6
  const t = 0.5
  P.box(w + 0.5, 0.35, d + 0.5, FC.batu, K.BATU)
  // lantai papan di dalam
  P.box(w - t * 2, 0.06, d - t * 2, FC.kayuMuda, K.KAYU, { y: 0.35 })
  // dinding: belakang, samping, depan (dua bagian di kiri-kanan pintu + ambang atas)
  P.box(w, wallH, t, FC.kayu, K.KAYU, { y: 0.35, z: -d / 2 + t / 2 })
  for (const s of [-1, 1]) P.box(t, wallH, d, FC.kayu, K.KAYU, { x: s * (w / 2 - t / 2), y: 0.35 })
  const side = (w - door) / 2
  for (const s of [-1, 1]) P.box(side, wallH, t, FC.kayu, K.KAYU, { x: s * (door / 2 + side / 2), y: 0.35, z: d / 2 - t / 2 })
  P.box(door, wallH - 2.6, t, FC.kayu, K.KAYU, { y: 0.35 + 2.6, z: d / 2 - t / 2 })
  // jendela menyala di sisi panjang (luar & dalam)
  for (let x = -w / 2 + 3; x <= w / 2 - 3; x += 4) {
    if (Math.abs(x) < door) continue
    warmWindow(P, x, 2.0, d / 2 + 0.02)
  }
  for (let z = -d / 2 + 2.5; z <= d / 2 - 2.5; z += 3.5) for (const s of [-1, 1]) sideWindow(P, s * (w / 2 + 0.02), 2.0, z)
  // perapian batu di dinding belakang (api menyala)
  P.box(2.6, 2.4, 1.2, FC.batuTua, K.BATU, { y: 0.35, z: -d / 2 + 1.1 })
  P.box(1.5, 1.1, 0.3, '#1d1712', K.POLOS, { y: 0.45, z: -d / 2 + 1.6 })
  P.cyl(0, 0.45, 0.9, 6, FC.api, K.CAHAYA, { y: 0.45, z: -d / 2 + 1.5, sway: 0.08 })
  P.cyl(0.45, 0.5, 0.12, 6, FC.bara, K.CAHAYA, { y: 0.42, z: -d / 2 + 1.5 })
  P.box(0.9, 4.5, 0.9, FC.batuTua, K.BATU, { y: 2.5, z: -d / 2 + 1.0 })
  // meja panjang + bangku
  for (const s of [-1, 1]) {
    const x = s * w * 0.22
    P.box(1.1, 0.12, d * 0.5, FC.kayuMuda, K.KAYU, { x, y: 1.15, z: 0.6 })
    for (const zz of [-d * 0.2 + 0.6, d * 0.2 + 0.6]) P.box(0.12, 0.8, 0.12, FC.kayuTua, K.KAYU, { x, y: 0.35, z: zz })
    for (const o of [-0.85, 0.85]) P.box(0.4, 0.5, d * 0.48, FC.kayu, K.KAYU, { x: x + o, y: 0.35, z: 0.6 })
    for (let i = 0; i < 3; i++) P.cyl(0.12, 0.1, 0.22, 6, FC.besi, K.POLOS, { x, y: 1.27, z: -d * 0.12 + i * d * 0.16 })
  }
  // tong & kepala rusa
  for (const s of [-1, 1]) P.cyl(0.42, 0.38, 1.0, 8, FC.kayu, K.KAYU, { x: s * (w / 2 - 1.1), y: 0.35, z: -d / 2 + 1.1 })
  P.box(0.5, 0.6, 0.4, FC.bulu, K.POLOS, { y: 3.2, z: -d / 2 + 0.75 })
  for (const s of [-1, 1]) P.cyl(0.04, 0.05, 0.9, 4, '#e8dcc0', K.POLOS, { x: s * 0.35, y: 3.6, z: -d / 2 + 0.75, rz: s * 0.7 })
  // atap pelana panjang bersalju (bubungan sepanjang x), teritis + lentera di pintu
  snowRoof(P, w + 1.4, d + 1.6, 0.35 + wallH, d * 0.55, roof, { seed: 7 })
  P.box(w - 1, 0.25, d - 1, FC.kayuTua, K.KAYU, { y: 0.35 + wallH - 0.25 }) // langit-langit (balok)
  for (const s of [-1, 1]) P.box(0.3, 0.42, 0.3, FC.jendela, K.CAHAYA, { x: s * (door / 2 + 0.5), y: 2.6, z: d / 2 + 0.3 })
  return P
}

// Kios pasar musim dingin: rangka kayu, meja, kanopi kain bersalju, barang dagangan
const CANOPY = ['#8c2f3a', '#2f5f8c', '#5d7a3a', '#a8732c', '#6a4a8c']
const GOODS = {
  roti: ['#c8955a', '#a8743c', '#e0b878'],
  ikan: ['#9fb3c0', '#7f95a3', '#c4d2db'],
  bulu: ['#8a7560', '#5d4a38', '#e8e0d0', '#3d3530'],
  kayu: ['#8f6a48', '#6b4a32'],
  besi: ['#7d838c', '#5a6068', '#b0b6be'],
}
export function kiosSalju(color, goods) {
  const P = new Parts()
  for (const [sx, sz] of corners) P.cyl(0.08, 0.09, 2.5, 6, FC.kayuTua, K.KAYU, { x: sx * 1.8, z: sz * 1.25 })
  P.box(3.5, 0.9, 1.1, FC.kayu, K.KAYU, { z: 0.5 })
  P.gable(4.2, 3.1, 2.45, 0.75, CANOPY[color % CANOPY.length], K.POLOS, CANOPY[color % CANOPY.length], K.POLOS, { sway: 0.04 })
  P.gable(3.9, 2.6, 2.62, 0.62, FC.salju, K.SALJU)
  const pal = GOODS[goods] || GOODS.roti
  for (let i = 0; i < 7; i++) {
    const x = -1.4 + i * 0.47
    if (goods === 'bulu') P.box(0.42, 0.12, 0.8, pal[i % pal.length], K.POLOS, { x, y: 0.9, z: 0.5 })
    else if (goods === 'besi') P.box(0.08, 0.9, 0.08, pal[i % pal.length], K.POLOS, { x, y: 0.9, z: 0.35, rz: 0.3 })
    else if (goods === 'kayu') P.add(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 6).rotateX(Math.PI / 2), pal[i % 2], K.KAYU, { x, y: 1.0, z: 0.5 })
    else P.add(new THREE.IcosahedronGeometry(0.2, 0).translate(0, 0.2, 0), pal[i % pal.length], K.POLOS, { x, y: 0.88, z: 0.5, sy: goods === 'ikan' ? 0.45 : 0.8, sx: goods === 'ikan' ? 1.7 : 1 })
  }
  P.cyl(0.35, 0.3, 0.6, 8, FC.kayuMuda, K.KAYU, { x: 1.35, z: 1.55 })
  P.box(0.7, 0.55, 0.6, FC.kayuMuda, K.KAYU, { x: -1.3, z: 1.6, ry: 0.3 })
  drift(P, -2.2, -1.0, 0.7)
  return P
}

// Menara jaga kayu: 4 kaki (tinggi h), lantai pandang 4,4 × 4,4 m berpagar, atap limas bersalju,
// anak tangga (sepanjang +z lokal) dari tanah ke lantai pandang
export const TOWER = { size: 4.4, stairLen: 11, stairW: 1.4 }
export function menaraJaga(h) {
  const P = new Parts()
  const s = TOWER.size / 2
  for (const [sx, sz] of corners) P.cyl(0.2, 0.26, h + 2.6, 6, FC.kayuTua, K.KAYU, { x: sx * (s - 0.2), z: sz * (s - 0.2) })
  // palang silang
  for (const [ax, az, len, ry] of [[0, -s + 0.2, TOWER.size, 0], [0, s - 0.2, TOWER.size, 0], [-s + 0.2, 0, TOWER.size, Math.PI / 2], [s - 0.2, 0, TOWER.size, Math.PI / 2]])
    for (const y of [h * 0.3, h * 0.65]) P.box(len, 0.16, 0.16, FC.kayu, K.KAYU, { x: ax, y, z: az, ry })
  // lantai pandang + pagar + atap
  P.box(TOWER.size + 0.4, 0.3, TOWER.size + 0.4, FC.kayuMuda, K.KAYU, { y: h - 0.3 })
  for (const [x, z, w, d] of [[0, -s, TOWER.size, 0.12], [-s, 0, 0.12, TOWER.size], [s, 0, 0.12, TOWER.size]]) P.box(w, 1.0, d, FC.kayu, K.KAYU, { x, y: h, z })
  for (const sx of [-1, 1]) P.box(TOWER.size * 0.32, 1.0, 0.12, FC.kayu, K.KAYU, { x: sx * TOWER.size * 0.34, y: h, z: s })
  P.skirt(TOWER.size + 1.4, TOWER.size + 1.4, h + 2.6, 0, 0, h + 4.6, ROOF[0], K.SIRAP)
  P.skirt(TOWER.size + 0.9, TOWER.size + 0.9, h + 2.8, 0, 0, h + 4.5, FC.salju, K.SALJU)
  P.cyl(0.05, 0.05, 1.6, 4, FC.kayuTua, K.KAYU, { y: h + 4.5 })
  P.box(0.04, 0.5, 0.8, FC.merah, K.POLOS, { y: h + 5.5, z: 0.4, sway: 0.1 })
  // obor kecil & tanduk peringatan di lantai pandang
  P.box(0.25, 0.35, 0.25, FC.jendela, K.CAHAYA, { x: s - 0.35, y: h + 1.6, z: -s + 0.35 })
  // anak tangga miring: dari lantai pandang (z = s) turun ke tanah sepanjang +z
  const n = Math.round(h / 0.4)
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n
    P.box(TOWER.stairW, 0.12, TOWER.stairLen / n + 0.05, FC.kayuMuda, K.KAYU, { y: h * (1 - t) - 0.12, z: s + TOWER.stairLen * t })
  }
  for (const sx of [-1, 1]) {
    const x = sx * (TOWER.stairW / 2 + 0.05)
    P.add(new THREE.BoxGeometry(0.12, 0.12, Math.hypot(TOWER.stairLen, h)).rotateX(Math.atan2(h, TOWER.stairLen)), FC.kayu, K.KAYU, { x, y: h / 2 + 0.9, z: s + TOWER.stairLen / 2 })
    P.add(new THREE.BoxGeometry(0.14, 0.2, Math.hypot(TOWER.stairLen, h)).rotateX(Math.atan2(h, TOWER.stairLen)), FC.kayuTua, K.KAYU, { x, y: h / 2 - 0.2, z: s + TOWER.stairLen / 2 })
  }
  return P
}

// Api unggun (menyala) dengan batu melingkar; mati = abu & kayu hangus (kemah ditinggalkan)
export function apiUnggun({ lit = true, logs = true } = {}) {
  const P = new Parts()
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    P.add(new THREE.IcosahedronGeometry(0.3, 0).translate(0, 0.15, 0), FC.batuTua, K.BATU, { x: Math.cos(a) * 1.05, z: Math.sin(a) * 1.05 })
  }
  for (let i = 0; i < 4; i++) P.add(new THREE.CylinderGeometry(0.1, 0.12, 1.4, 5).rotateX(Math.PI / 2 - 0.25).rotateY((i / 4) * Math.PI), lit ? FC.kayuTua : '#2a2420', K.KAYU, { y: 0.22 })
  if (lit) {
    P.cyl(0.55, 0.62, 0.14, 7, FC.bara, K.CAHAYA, { y: 0.04 })
    P.cyl(0, 0.52, 1.5, 6, FC.api, K.CAHAYA, { y: 0.14, sway: 0.18 })
    P.cyl(0, 0.33, 2.0, 5, '#ffe08a', K.CAHAYA, { y: 0.14, x: 0.1, sway: 0.24 })
  } else {
    P.cyl(0.6, 0.66, 0.06, 7, '#4a4643', K.POLOS, { y: 0.02 })
    drift(P, 0.3, 0.2, 0.45, 0.05)
  }
  if (logs)
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.5
      P.add(new THREE.CylinderGeometry(0.24, 0.24, 2.2, 7).rotateZ(Math.PI / 2).rotateY(-a + Math.PI / 2), FC.kayu, K.KAYU, { x: Math.cos(a) * 3.6, y: 0.24, z: Math.sin(a) * 3.6 })
      P.add(new THREE.BoxGeometry(1.9, 0.08, 0.36).rotateY(-a + Math.PI / 2), FC.salju, K.SALJU, { x: Math.cos(a) * 3.6, y: 0.46, z: Math.sin(a) * 3.6 })
    }
  return P
}

// tumpukan kayu bakar beratap kecil
export function tumpukanKayu(len = 3) {
  const P = new Parts()
  for (let row = 0; row < 4; row++)
    for (let x = -len / 2 + 0.2; x < len / 2 - 0.1; x += 0.36) P.add(new THREE.CylinderGeometry(0.17, 0.17, 1.0, 6).rotateX(Math.PI / 2), (row + Math.round(x * 3)) % 2 ? FC.kayuMuda : FC.kayu, K.KAYU, { x: x + (row % 2) * 0.17, y: 0.17 + row * 0.31 })
  P.box(len + 0.4, 0.1, 1.3, ROOF[1], K.SIRAP, { y: 1.5, rx: -0.15 })
  P.box(len + 0.3, 0.12, 1.2, FC.salju, K.SALJU, { y: 1.6, rx: -0.15 })
  for (const s of [-1, 1]) P.cyl(0.06, 0.06, 1.5, 5, FC.kayuTua, K.KAYU, { x: s * (len / 2 + 0.1), z: 0.5 })
  return P
}

// lentera tiang
export function lenteraSalju(h = 3.2) {
  const P = new Parts()
  P.cyl(0.08, 0.11, h, 6, FC.besiTua, K.POLOS)
  P.box(0.7, 0.07, 0.07, FC.besiTua, K.POLOS, { x: 0.3, y: h - 0.05 })
  P.box(0.32, 0.44, 0.32, FC.jendela, K.CAHAYA, { x: 0.55, y: h - 0.56 })
  P.cyl(0, 0.27, 0.25, 4, FC.besiTua, K.POLOS, { x: 0.55, y: h - 0.13, ry: Math.PI / 4 })
  P.cyl(0, 0.22, 0.12, 4, FC.salju, K.SALJU, { x: 0.55, y: h + 0.05, ry: Math.PI / 4 })
  return P
}

// sumur batu beratap bersalju
export function sumurSalju() {
  const P = new Parts()
  P.cyl(1.1, 1.2, 0.9, 12, FC.batu, K.BATU)
  P.cyl(0.86, 0.86, 0.05, 12, FC.es, K.ES, { y: 0.72 })
  for (const s of [-1, 1]) P.box(0.16, 2.3, 0.16, FC.kayuTua, K.KAYU, { x: s * 1.0 })
  P.box(2.2, 0.1, 0.1, FC.kayuTua, K.KAYU, { y: 2.0 })
  snowRoof(P, 2.7, 1.8, 2.3, 0.8, ROOF[0], { seed: 3 })
  return P
}

// pagar kayu (sepanjang z lokal) dengan salju di palang atasnya
export function pagarSalju(len) {
  const P = new Parts()
  const n = Math.max(1, Math.round(len / 2))
  for (let i = 0; i <= n; i++) P.cyl(0.07, 0.08, 1.2, 5, FC.kayuTua, K.KAYU, { z: -len / 2 + (i * len) / n })
  for (const y of [0.45, 0.95]) P.box(0.07, 0.1, len, FC.kayu, K.KAYU, { y })
  P.box(0.14, 0.06, len, FC.salju, K.SALJU, { y: 1.05 })
  return P
}

// --------------------------------------------------------------------------- kastel
// tembok kastel batu sepanjang z lokal: kaki melebar, puncak bergerigi (merlon), salju di atasnya
export function temboKastel(len, t, h) {
  const P = new Parts()
  P.box(t + 0.8, 1.6, len, FC.batuTua, K.BATU, { y: -1.2 })
  P.box(t, h, len, FC.batu, K.BATU, { y: 0.4 })
  P.box(t - 0.1, 0.15, len, FC.salju, K.SALJU, { y: h + 0.4 })
  const n = Math.max(1, Math.floor(len / 2.2))
  for (let i = 0; i < n; i++) {
    const z = -len / 2 + (i + 0.5) * (len / n)
    for (const s of [-1, 1]) {
      P.box(0.45, 1.0, 1.1, FC.batu, K.BATU, { x: s * (t / 2 - 0.22), y: h + 0.4, z })
      P.box(0.5, 0.12, 1.15, FC.salju, K.SALJU, { x: s * (t / 2 - 0.22), y: h + 1.4, z })
    }
  }
  return P
}

// menara kastel bulat: dinding batu, cincin bergerigi, atap kerucut batu tulis bersalju, panji
export function menaraKastel(r, h, banner = 0) {
  const P = new Parts()
  P.cyl(r + 0.5, r + 0.9, 1.8, 12, FC.batuTua, K.BATU, { y: -1.2 })
  P.cyl(r, r + 0.2, h, 12, FC.batu, K.BATU, { y: 0.4 })
  P.cyl(r + 0.5, r + 0.3, 0.6, 12, FC.batuTua, K.BATU, { y: h + 0.4 })
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    P.box(0.9, 0.9, 0.5, FC.batu, K.BATU, { x: Math.cos(a) * (r + 0.25), y: h + 1.0, z: Math.sin(a) * (r + 0.25), ry: -a + Math.PI / 2 })
  }
  P.cyl(0, r + 0.4, r * 1.8, 12, ROOF[0], K.SIRAP, { y: h + 1.2 })
  P.cyl(0, r * 0.95, r * 1.3, 12, FC.salju, K.SALJU, { y: h + 1.9 })
  // celah panah (gelap) & panji
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4
    P.box(0.25, 1.4, 0.2, '#1c2026', K.POLOS, { x: Math.cos(a) * (r + 0.12), y: h * 0.55, z: Math.sin(a) * (r + 0.12), ry: -a + Math.PI / 2 })
  }
  P.cyl(0.05, 0.05, 2.2, 4, FC.besiTua, K.POLOS, { y: h + 1.2 + r * 1.8 - 0.2 })
  P.box(0.04, 0.6, 1.1, banner ? FC.biru : FC.merah, K.POLOS, { y: h + 1.2 + r * 1.8 + 1.1, z: 0.55, sway: 0.14 })
  return P
}

// gerbang kastel (sepanjang x lokal, lebar w): dua menara kecil mengapit lorong gerbang beratap,
// jeruji besi terangkat, pintu kayu terbuka ke dalam, panji di kiri-kanan
export function gerbangKastel(w, h, depth) {
  const P = new Parts()
  const open = w * 0.45
  const side = (w - open) / 2
  for (const s of [-1, 1]) {
    P.box(side, h, depth, FC.batu, K.BATU, { x: s * (open / 2 + side / 2), y: 0 })
    P.box(side + 0.3, 0.6, depth + 0.3, FC.batuTua, K.BATU, { x: s * (open / 2 + side / 2), y: h })
    for (const zz of [-depth / 2 + 0.3, depth / 2 - 0.3]) P.box(0.9, 0.9, 0.5, FC.batu, K.BATU, { x: s * (open / 2 + side / 2), y: h + 0.6, z: zz })
    P.box(side * 0.9, 0.12, depth, FC.salju, K.SALJU, { x: s * (open / 2 + side / 2), y: h + 0.6 })
    // panji besar menjuntai di muka gerbang
    P.box(1.4, 3.2, 0.06, FC.biru, K.POLOS, { x: s * (open / 2 + side / 2), y: h - 3.8, z: depth / 2 + 0.06, sway: 0.05 })
    P.box(0.5, 0.5, 0.07, FC.emas, K.POLOS, { x: s * (open / 2 + side / 2), y: h - 2.4, z: depth / 2 + 0.1 })
  }
  // ambang atas lorong gerbang + jeruji terangkat
  P.box(open, h * 0.3, depth, FC.batu, K.BATU, { y: h * 0.7 })
  for (let x = -open / 2 + 0.3; x < open / 2; x += 0.45) P.box(0.08, h * 0.22, 0.1, FC.besiTua, K.POLOS, { x, y: h * 0.62, z: depth / 2 - 0.4 })
  // daun pintu terbuka ke dalam
  for (const s of [-1, 1]) P.box(open / 2 - 0.1, h * 0.62, 0.22, FC.kayuTua, K.KAYU, { x: s * (open / 2 - 0.25), y: 0, z: -depth / 2 - open / 4, ry: s * Math.PI / 2 })
  P.box(open, 0.12, depth, FC.batuTua, K.BATU, { y: 0 })
  return P
}

// Ruang singgasana (aula batu panjang sepanjang x lokal = panjang L, lebar W, pintu di sisi −x).
// Dinding setebal t dengan jendela tinggi berkaca biru gelap, tiang-tiang, karpet merah usang,
// panji robek, anglo menyala, gundukan salju yang masuk lewat atap yang berlubang.
export function aulaSinggasana(L, W, h, t, door) {
  const P = new Parts()
  const hx = L / 2
  const hz = W / 2
  // dinding: belakang (+x) dengan jendela mawar, samping (±z), depan (−x) dengan pintu
  P.box(t, h, W, FC.batu, K.BATU, { x: hx - t / 2 })
  for (const s of [-1, 1]) P.box(L, h, t, FC.batu, K.BATU, { z: s * (hz - t / 2) })
  const side = (W - door) / 2
  for (const s of [-1, 1]) P.box(t, h, side, FC.batu, K.BATU, { x: -hx + t / 2, z: s * (door / 2 + side / 2) })
  P.box(t, h - 6, door, FC.batu, K.BATU, { x: -hx + t / 2, y: 6 })
  // kaki dinding & lis atas
  P.box(L + 0.6, 0.8, W + 0.6, FC.batuTua, K.BATU, { y: -0.6 })
  // jendela tinggi berkaca gelap di sisi panjang (luar & dalam)
  for (let x = -hx + 5; x <= hx - 4; x += 6.5)
    for (const s of [-1, 1]) {
      P.box(1.4, 4.2, 0.1, '#22344a', K.POLOS, { x, y: 3.6, z: s * (hz + 0.02) })
      P.box(1.4, 4.2, 0.1, '#5f86a8', K.ES, { x, y: 3.6, z: s * (hz - t - 0.02) })
      P.box(1.8, 0.25, 0.4, FC.salju, K.SALJU, { x, y: 3.45, z: s * (hz + 0.18) })
    }
  // atap pelana batu tulis bersalju (bubungan sepanjang x) — berlubang dekat pintu (salju masuk)
  const roofY = h
  P.gable(L + 1.2, W + 1.8, roofY, W * 0.42, ROOF[0], K.SIRAP, FC.batu, K.BATU)
  P.gable((L + 1.2) * 0.97, (W + 1.8) * 0.9, roofY + 0.25, W * 0.42 * 0.9, FC.salju, K.SALJU, FC.salju, K.SALJU)
  // langit-langit gelap di dalam (balok-balok)
  P.box(L - t * 2, 0.4, W - t * 2, '#3a3530', K.KAYU, { y: h - 0.4 })
  for (let x = -hx + 3; x < hx - 2; x += 4) P.box(0.5, 0.6, W - t * 2, FC.kayuTua, K.KAYU, { x, y: h - 1.0 })
  // tiang dua baris
  for (let x = -hx + 6; x <= hx - 8; x += 6)
    for (const s of [-1, 1]) {
      P.cyl(0.6, 0.7, h - 1.0, 8, FC.batuMuda, K.BATU, { x, z: s * W * 0.27 })
      P.cyl(0.85, 0.85, 0.5, 8, FC.batuTua, K.BATU, { x, z: s * W * 0.27 })
      P.cyl(0.62, 0.62, 0.4, 8, FC.es, K.ES, { x, y: h * 0.45, z: s * W * 0.27 }) // kerak es
    }
  // karpet merah usang dari pintu ke singgasana
  P.box(L - 9, 0.04, 3.2, '#6e2630', K.POLOS, { x: -1.5, y: 0.02 })
  P.box(L - 9.4, 0.05, 2.6, '#8c3a44', K.POLOS, { x: -1.5, y: 0.03 })
  // panji robek di dinding samping
  for (let x = -hx + 8; x <= hx - 8; x += 6.5)
    for (const s of [-1, 1]) P.box(1.1, 3.4, 0.06, s > 0 ? FC.biru : FC.merah, K.POLOS, { x: x + 3.2, y: h - 5.2, z: s * (hz - t - 0.06), sway: 0.03 })
  // salju yang masuk: gundukan di dekat pintu dan di bawah lubang atap
  drift(P, -hx + 3, -2.2, 2.2)
  drift(P, -hx + 2.4, 2.6, 1.6)
  drift(P, -hx + 9, W * 0.18, 2.6)
  drift(P, -4, -W * 0.3, 1.4)
  // kursi terguling & meja panjang yang ditinggalkan
  P.box(1.0, 0.1, 6, FC.kayuTua, K.KAYU, { x: -6, y: 1.0, z: -W * 0.13 })
  for (const zz of [-2.6, 2.6]) P.box(0.12, 1.0, 0.12, FC.kayuTua, K.KAYU, { x: -6, z: -W * 0.13 + zz })
  P.box(0.6, 1.1, 0.6, FC.kayu, K.KAYU, { x: -3.5, z: -W * 0.08, rz: 1.45, y: 0.3 })
  return P
}

// Singgasana: undakan batu, kursi batu bersandaran tinggi berlapis es, mahkota beku di dudukannya,
// dua anglo menyala di kiri-kanan (depan menghadap +z lokal)
export function singgasana() {
  const P = new Parts()
  P.box(7, 0.4, 6, FC.batuTua, K.BATU)
  P.box(5, 0.4, 4.2, FC.batu, K.BATU, { y: 0.4, z: -0.3 })
  P.box(2.6, 0.9, 1.8, FC.batuMuda, K.BATU, { y: 0.8, z: -0.6 })
  P.box(2.8, 3.6, 0.6, FC.batuMuda, K.BATU, { y: 0.8, z: -1.6 })
  for (const s of [-1, 1]) P.box(0.4, 1.4, 1.8, FC.batuMuda, K.BATU, { x: s * 1.3, y: 1.7, z: -0.6 })
  P.skirt(2.8, 0.6, 4.4, 0.4, 0.3, 5.4, FC.batuMuda, K.BATU, { z: -1.6 })
  // lapisan es & duri es di sandaran
  P.box(2.9, 2.4, 0.2, FC.es, K.ES, { y: 2.0, z: -1.25 })
  for (let i = 0; i < 5; i++) P.cyl(0, 0.16, 0.9 + (i % 2) * 0.5, 5, FC.es, K.ES, { x: -1.1 + i * 0.55, y: 4.4, z: -1.6 })
  // mahkota beku
  P.cyl(0.32, 0.3, 0.22, 8, FC.emas, K.POLOS, { y: 1.72, z: -0.4 })
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    P.cyl(0, 0.07, 0.25, 4, FC.emas, K.POLOS, { x: Math.cos(a) * 0.28, y: 1.94, z: -0.4 + Math.sin(a) * 0.28 })
  }
  for (const s of [-1, 1]) {
    P.cyl(0.25, 0.35, 1.3, 6, FC.besiTua, K.POLOS, { x: s * 3.0, y: 0.4, z: 1.3 })
    P.cyl(0.65, 0.3, 0.35, 8, FC.besiTua, K.POLOS, { x: s * 3.0, y: 1.7, z: 1.3 })
    P.cyl(0, 0.45, 1.1, 6, FC.api, K.CAHAYA, { x: s * 3.0, y: 1.95, z: 1.3, sway: 0.14 })
  }
  return P
}

// lantai ubin batu ruang singgasana (w × d), permukaannya 2 cm di atas y 0: menutup tanah / atap gua di
// bawahnya, yang di kualitas Rendah / Sedang ikut terkeruk di sekitar lubang tangga rahasia
export function lantaiAula(w, d) {
  return new Parts().box(w, 0.35, d, FC.batuTua, K.UBIN, { y: -0.33 })
}

// tangga batu rahasia: anak tangga turun sepanjang +x lokal (len m, turun drop m), lebar w,
// dinding batu di kedua sisi lubangnya, pagar batu rendah di sisi aula
export function tanggaRahasia(len, drop, w) {
  const P = new Parts()
  const n = Math.round(drop / 0.3)
  for (let i = 0; i < n; i++) {
    const t0 = i / n
    P.box(len / n + 0.04, 0.3, w, FC.batuTua, K.BATU, { x: len * (t0 + 0.5 / n), y: -drop * t0 - 0.3 })
  }
  for (const s of [-1, 1]) P.box(len, drop + 0.4, 0.3, FC.batu, K.BATU, { x: len / 2, y: -drop - 0.3, z: s * (w / 2 + 0.15) })
  P.box(0.3, drop + 0.4, w + 0.6, FC.batu, K.BATU, { x: len + 0.15, y: -drop - 0.3 })
  return P
}

// --------------------------------------------------------------------------- es & gua
// Air terjun beku di muka tebing setinggi h (dari y = 0 ke atas): tirai tiang-tiang es tak
// beraturan sepanjang lebar w (sumbu x lokal), condong `lean` m ke belakang (−z, ke tebing) di
// puncaknya, es menggantung di bibir atas, kolam beku di bawah
export function airTerjunBeku(h, w, seed = 5, lean = 0) {
  const P = new Parts()
  const r = rnd(seed)
  const tilt = -Math.atan2(lean, h)
  for (let x = -w / 2; x <= w / 2; x += 0.8 + r() * 0.5) {
    const top = h * (0.9 + r() * 0.12)
    const rad = 0.45 + r() * 0.55
    const z = (r() - 0.5) * 1.2
    // tiang es: beberapa ruas bertumpuk, mengecil ke atas & menggembung di bawah
    let y = 0
    while (y < top) {
      const seg = 2 + r() * 3
      const rb = rad * (1.2 - 0.5 * (y / top))
      P.cyl(rb * 0.75, rb, Math.min(seg, top - y), 6, r() < 0.8 ? FC.es : FC.esTua, K.ES, { x: x + (r() - 0.5) * 0.3, y, z: z - lean * (y / h), rx: tilt })
      y += seg * 0.92
    }
    // tetesan es di bibir atas
    P.cyl(rad * 0.7, 0, 1.2 + r() * 2, 5, FC.es, K.ES, { x, y: h - 0.4, z: z + 0.4 - lean, rx: Math.PI })
  }
  // kolam beku & bongkah es di kaki tebing
  P.cyl(w * 0.62, w * 0.66, 0.35, 12, FC.es, K.ES, { y: -0.25, z: 2.5 })
  for (let i = 0; i < 7; i++) P.add(new THREE.IcosahedronGeometry(0.6 + r() * 0.9, 0), i % 2 ? FC.es : FC.esTua, K.ES, { x: (r() - 0.5) * w, y: 0.1, z: 1 + r() * 3, sy: 0.7 })
  return P
}

// sekelompok kristal es bercahaya: prisma segi enam berujung runcing, miring acak
export function kristal(n = 7, size = 1, seed = 1, ungu = false) {
  const P = new Parts()
  const r = rnd(seed * 31 + 7)
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2
    const d = r() * size * 0.9
    const h = size * (1.1 + r() * 1.8) * (i === 0 ? 1.5 : 1)
    const rad = size * (0.18 + r() * 0.16)
    const tilt = i === 0 ? 0 : 0.25 + r() * 0.5
    const col = ungu && i % 3 === 0 ? FC.kristalUngu : FC.kristal
    const g = new THREE.CylinderGeometry(rad, rad, h, 6).translate(0, h / 2, 0)
    const tip = new THREE.ConeGeometry(rad, rad * 2.2, 6).translate(0, h + rad * 1.1, 0)
    for (const geo of [g, tip]) P.add(geo.rotateZ(tilt).rotateY(a), col, K.KRISTAL, { x: Math.cos(a) * d, z: Math.sin(a) * d, shade: [0.7, 1.15] })
  }
  P.add(new THREE.IcosahedronGeometry(size * 0.7, 0).scale(1.3, 0.4, 1.3), FC.esTua, K.ES, { y: 0.05 })
  return P
}

// bongkah batu pembingkai mulut gua + es menggantung di atasnya (lebar w, tinggi h, menghadap +z)
export function mulutGua(w, h) {
  const P = new Parts()
  const r = rnd(42)
  for (let i = 0; i < 9; i++) {
    const t = i / 8
    const a = Math.PI * t
    const x = -Math.cos(a) * (w / 2 + 1)
    const y = Math.sin(a) * h
    P.add(new THREE.IcosahedronGeometry(1.6 + r() * 1.3, 0), i % 2 ? '#4e5157' : '#6b6e74', K.POLOS, { x, y, z: r() * 0.8, sy: 0.85 })
  }
  for (let x = -w / 2 + 0.6; x < w / 2; x += 0.6 + r() * 0.5) P.cyl(0.12 + r() * 0.1, 0, 0.8 + r() * 1.6, 5, FC.es, K.ES, { x, y: h - 1.4 - r() * 0.5, z: 1.0 })
  return P
}

// --------------------------------------------------------------------------- kemah pemburu
// rak pengering kulit (dua tiang + palang, kulit tergantung)
export function rakJemur() {
  const P = new Parts()
  for (const s of [-1, 1]) P.cyl(0.07, 0.08, 2.2, 5, FC.kayuTua, K.KAYU, { x: s * 1.2 })
  P.box(2.6, 0.1, 0.1, FC.kayu, K.KAYU, { y: 2.0 })
  P.box(0.9, 1.1, 0.05, FC.bulu, K.POLOS, { x: -0.5, y: 0.85, sway: 0.03 })
  P.box(0.7, 0.9, 0.05, '#6e5a45', K.POLOS, { x: 0.55, y: 1.05, sway: 0.03 })
  P.box(2.6, 0.08, 0.2, FC.salju, K.SALJU, { y: 2.06 })
  return P
}

// kereta luncur kayu berisi bungkusan
export function keretaLuncur() {
  const P = new Parts()
  for (const s of [-1, 1]) P.box(0.08, 0.1, 2.4, FC.kayuTua, K.KAYU, { x: s * 0.5, y: 0.05 })
  P.box(1.1, 0.12, 1.9, FC.kayuMuda, K.KAYU, { y: 0.35 })
  for (const z of [-0.6, 0.6]) for (const s of [-1, 1]) P.box(0.08, 0.3, 0.08, FC.kayu, K.KAYU, { x: s * 0.5, y: 0.05, z })
  P.box(0.9, 0.5, 0.9, FC.kain, K.POLOS, { y: 0.47, z: -0.3 })
  P.box(0.7, 0.35, 0.6, FC.bulu, K.POLOS, { y: 0.47, z: 0.5 })
  P.box(0.85, 0.08, 0.85, FC.salju, K.SALJU, { y: 0.97, z: -0.3 })
  return P
}

// tenda pemburu yang ditinggalkan: kain kusam, salju di bubungan
export function tendaPemburu() {
  const P = new Parts()
  const h = 2.3
  const x = 1.6
  const z = 1.6
  const kain = '#b9ab8a'
  P.faces([[[-x, 0, z], [0, h, -z], [-x, 0, -z]], [[-x, 0, z], [0, h, z], [0, h, -z]], [[x, 0, z], [x, 0, -z], [0, h, -z]], [[x, 0, z], [0, h, -z], [0, h, z]], [[x, 0, -z], [-x, 0, -z], [0, h, -z]]], kain, K.POLOS)
  P.faces([[[-0.6, 0, z + 0.02], [0.6, 0, z + 0.02], [0, 1.5, z + 0.02]]], '#2b2420', K.POLOS)
  P.box(0.12, 0.12, 2 * z + 0.6, FC.kayuTua, K.KAYU, { y: h - 0.04 })
  P.box(0.5, 0.06, 2 * z + 0.2, FC.salju, K.SALJU, { y: h + 0.02 })
  drift(P, -x - 0.3, 0, 0.8)
  return P
}

// tumpukan peti & tong
export function peti(n = 3, seed = 1) {
  const P = new Parts()
  const r = rnd(seed)
  for (let i = 0; i < n; i++) {
    const s = 0.7 + r() * 0.4
    P.box(s, s * 0.8, s, i % 2 ? FC.kayuMuda : FC.kayu, K.KAYU, { x: (r() - 0.5) * 1.6, y: i > 1 ? 0.7 : 0, z: (r() - 0.5) * 1.2, ry: r() })
  }
  P.box(0.9, 0.1, 0.9, FC.salju, K.SALJU, { y: 0.78 })
  return P
}

// Ruang Harta: tumpukan koin emas, piala, perisai, dan peti harta (badan saja — tutupnya mesh
// terpisah supaya bisa dibuka, lihat kingdom.js)
export function harta() {
  const P = new Parts()
  const r = rnd(77)
  for (let i = 0; i < 9; i++) {
    const a = r() * Math.PI * 2
    const d = 1.2 + r() * 2.2
    P.cyl(0.2, 0.55 + r() * 0.5, 0.25 + r() * 0.35, 8, i % 2 ? FC.emas : FC.emasTua, K.POLOS, { x: Math.cos(a) * d, z: Math.sin(a) * d })
  }
  for (let i = 0; i < 3; i++) {
    const a = 0.6 + i * 1.7
    P.cyl(0.12, 0.08, 0.35, 6, FC.emas, K.POLOS, { x: Math.cos(a) * 2.4, y: 0.3, z: Math.sin(a) * 2.4 })
    P.cyl(0.18, 0.12, 0.18, 6, FC.emas, K.POLOS, { x: Math.cos(a) * 2.4, y: 0.62, z: Math.sin(a) * 2.4 })
  }
  P.cyl(0.9, 0.9, 0.12, 10, FC.biru, K.POLOS, { x: -2.6, y: 0.7, z: 1.4, rx: 1.3 })
  P.cyl(0.35, 0.35, 0.13, 10, FC.emas, K.POLOS, { x: -2.6, y: 0.72, z: 1.48, rx: 1.3 })
  // badan peti
  P.box(1.6, 0.8, 1.0, FC.kayu, K.KAYU)
  for (const s of [-1, 1]) P.box(0.12, 0.84, 1.04, FC.emas, K.POLOS, { x: s * 0.6 })
  P.box(1.64, 0.1, 1.04, FC.emasTua, K.POLOS, { y: 0.72 })
  return P
}
// tutup peti harta (engsel di tepi belakang = titik asal, lihat kingdom.js)
export function tutupPeti() {
  const P = new Parts()
  P.box(1.64, 0.32, 1.04, FC.kayu, K.KAYU, { z: 0.52 })
  P.add(new THREE.CylinderGeometry(0.52, 0.52, 1.64, 8, 1, false, 0, Math.PI).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2), FC.kayu, K.KAYU, { y: 0.3, z: 0.52 })
  for (const s of [-1, 1]) P.box(0.12, 0.5, 1.08, FC.emas, K.POLOS, { x: s * 0.6, y: 0.1, z: 0.52 })
  P.box(0.3, 0.3, 0.1, FC.emas, K.POLOS, { y: 0.05, z: 1.06 })
  return P
}

// lempeng lantai pintu rahasia (hx × hz setengah ukuran, tebal 0,3 m, atasnya di y = 0)
export function lempengRahasia(hx, hz) {
  const P = new Parts()
  P.box(hx * 2, 0.3, hz * 2, FC.batuTua, K.BATU, { y: -0.3 })
  P.box(hx * 2 - 0.3, 0.04, hz * 2 - 0.3, '#56595f', K.UBIN, { y: 0 })
  P.box(0.5, 0.14, 0.18, FC.besiTua, K.POLOS, { x: -hx + 1.2, y: 0 })
  return P
}
