import * as THREE from 'three'
import { Parts, K, COL } from '../kencana/buildings.js'

// Bangunan elf low-poly untuk Aeloria: rumah batu putih beratap sirap hijau-biru, rumah bulat,
// menara ramping beratap kerucut, istana, barak, tembok & gerbang benteng, kios pasar, bengkel
// pandai besi (tungku menyala), kedai, pergola makan, meja panjang, api unggun, panggung musik,
// sasaran panah, boneka latihan, rak senjata, tenda, kincir angin, air mancur, lentera, lumbung,
// pagar. Memakai pembuat Parts dan shader bangunan yang sama dengan Kencana (kencana/buildings.js,
// material.js); K.CAHAYA = permukaan yang menyala sendiri (api, bara, lentera, jendela malam).
// Titik asal = tengah alas bangunan di tanah, depan bangunan menghadap +z lokal.

export const EC = {
  putih: '#ebe7dc',
  batu: '#d6d2c6',
  batuTua: '#a9a59a',
  plester: '#f2eee4',
  kayu: '#7a5636',
  kayuTua: '#4b3423',
  kayuMuda: '#a8814f',
  emas: '#d9b44a',
  emasTua: '#a8832c',
  kaca: '#3e5f7a',
  daun: '#4f8a3c',
  daunTua: '#2f5e2b',
  api: '#ffb347',
  bara: '#ff6a2a',
  lentera: '#ffe2a0',
  besi: '#8d939b',
  besiTua: '#4d5258',
  air: '#5b9cc7',
  jerami: '#d8b968',
}
// atap sirap: hijau toska, hijau daun, biru, abu perak
export const ROOF = ['#2f6e6a', '#3e6b3a', '#3a5a8c', '#7d8f99', '#5a7a46', '#35606f']
// kain (kanopi kios, tenda, panji)
export const KAIN = ['#4f8a3c', '#5d8fc4', '#f2efe6', '#7d5ba6', '#8c2f3a', '#e3c04f', '#3b7f7a']

const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]]

// jendela berbingkai putih di bidang z = zf (menghadap +z bila zf > 0)
function window2(P, x, y, zf, w = 0.8, h = 1.1, glow = false) {
  const dir = Math.sign(zf) || 1
  P.box(w + 0.18, h + 0.18, 0.06, EC.putih, K.POLOS, { x, y: y - 0.09, z: zf + dir * 0.02 })
  P.box(w, h, 0.06, glow ? EC.lentera : EC.kaca, glow ? K.CAHAYA : K.POLOS, { x, y, z: zf + dir * 0.05 })
  P.box(0.06, h, 0.07, EC.putih, K.POLOS, { x, y, z: zf + dir * 0.07 })
}

// --------------------------------------------------------------------------- rumah
// rumah elf: alas batu, dinding plester putih berangka kayu gelap, atap pelana curam dengan
// teritis lebar, pintu kayu berhias emas, jendela berbingkai, cerobong batu (opsional)
export function rumahElf(w, d, roof, { chimney = true, lamp = true } = {}) {
  const P = new Parts()
  const base = 0.6
  const wallH = 3.2
  P.box(w + 0.4, base, d + 0.4, EC.batu, K.BATU)
  P.box(w, wallH, d, EC.plester, K.PLESTER, { y: base })
  for (const [sx, sz] of corners) P.box(0.26, wallH, 0.26, EC.kayuTua, K.KAYU, { x: sx * w / 2, y: base, z: sz * d / 2 })
  for (const sz of [-1, 1]) P.box(w + 0.1, 0.2, 0.1, EC.kayuTua, K.KAYU, { y: base + wallH * 0.56, z: sz * (d / 2 + 0.03) })
  // pintu & jendela depan, jendela belakang & samping
  P.box(1.15, 2.15, 0.1, EC.kayuTua, K.KAYU, { y: base, z: d / 2 + 0.04 })
  P.box(0.12, 0.12, 0.06, EC.emas, K.POLOS, { x: 0.35, y: base + 1.05, z: d / 2 + 0.1 })
  for (const s of [-1, 1]) {
    if (w > 5) window2(P, s * w * 0.3, base + 1.0, d / 2)
    window2(P, s * w * 0.25, base + 1.0, -d / 2)
  }
  // atap pelana sepanjang sisi panjang + hiasan emas di kedua ujung bubungan
  const roofH = Math.min(w, d) * 0.62 + 1.4
  const long = w >= d
  const L = (long ? w : d) + 1.1
  const W = (long ? d : w) + 1.3
  P.gable(L, W, base + wallH, roofH, roof, K.SIRAP, EC.plester, K.PLESTER, { ry: long ? 0 : Math.PI / 2 })
  for (const s of [-1, 1]) {
    const [x, z] = long ? [s * L / 2, 0] : [0, s * L / 2]
    P.cyl(0.02, 0.12, 0.7, 5, EC.emas, K.POLOS, { x, y: base + wallH + roofH - 0.1, z })
  }
  if (chimney) P.box(0.7, roofH + 0.4, 0.7, EC.batuTua, K.BATU, { x: long ? w * 0.28 : 0.6, y: base + wallH + 0.2, z: long ? -0.6 : -d * 0.28 })
  if (lamp) {
    P.box(0.08, 0.5, 0.08, EC.besiTua, K.POLOS, { x: 0.95, y: base + 2.05, z: d / 2 + 0.25 })
    P.box(0.22, 0.3, 0.22, EC.lentera, K.CAHAYA, { x: 0.95, y: base + 1.8, z: d / 2 + 0.3 })
  }
  return P
}

// rumah bulat elf (beratap kerucut tinggi), jari-jari r
export function rumahBulat(r, roof) {
  const P = new Parts()
  P.cyl(r + 0.25, r + 0.35, 0.6, 10, EC.batu, K.BATU)
  P.cyl(r, r, 3.4, 10, EC.plester, K.PLESTER, { y: 0.6 })
  P.box(1.1, 2.1, 0.1, EC.kayuTua, K.KAYU, { y: 0.6, z: r + 0.02 })
  for (const a of [0.9, -0.9, Math.PI]) {
    const x = Math.sin(a) * (r + 0.01)
    const z = Math.cos(a) * (r + 0.01)
    P.box(0.7, 0.9, 0.08, EC.kaca, K.POLOS, { x, y: 1.9, z, ry: a })
  }
  P.cyl(0, r + 0.9, r * 1.9 + 1.2, 10, roof, K.SIRAP, { y: 4.0 })
  P.cyl(0.03, 0.03, 1.0, 4, EC.emas, K.POLOS, { y: 4.0 + r * 1.9 + 1.0 })
  P.add(new THREE.IcosahedronGeometry(0.16, 0).translate(0, 0.16, 0), EC.emas, K.POLOS, { y: 4.0 + r * 1.9 + 1.9 })
  return P
}

// --------------------------------------------------------------------------- menara & benteng
export function menaraElf(r, h, roof, { base = true } = {}) {
  const P = new Parts()
  if (base) P.cyl(r + 0.45, r + 0.7, 1.0, 12, EC.batuTua, K.BATU)
  P.cyl(r, r + 0.15, h, 12, EC.putih, K.BATU, { y: base ? 1 : 0 })
  const top = (base ? 1 : 0) + h
  // jendela sempit di tiga ketinggian
  for (let k = 0; k < 3; k++)
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + k * 0.4
      P.box(0.35, 1.1, 0.12, EC.kaca, K.POLOS, { x: Math.sin(a) * (r + 0.06), y: top * (0.3 + k * 0.22), z: Math.cos(a) * (r + 0.06), ry: a })
    }
  // pagar balkon di bawah atap
  P.cyl(r + 0.7, r + 0.7, 0.35, 12, EC.batu, K.BATU, { y: top - 0.3 })
  P.cyl(0, r + 1.0, r * 2.6 + 1.5, 12, roof, K.SIRAP, { y: top + 0.05 })
  P.cyl(0.06, 0.06, 2.2, 4, EC.emas, K.POLOS, { y: top + r * 2.6 + 1.2 })
  P.add(new THREE.IcosahedronGeometry(0.25, 0).translate(0, 0.25, 0), EC.emas, K.POLOS, { y: top + r * 2.6 + 3.2 })
  return P
}

// tembok benteng batu putih bergerigi: panjang len (sumbu lokal z), tebal t, tinggi h
export function temboElf(len, t, h) {
  const P = new Parts()
  P.box(t, h, len, EC.putih, K.BATU)
  P.box(t + 0.5, 0.5, len, EC.batuTua, K.BATU, { y: 0 })
  const n = Math.max(1, Math.floor(len / 1.8))
  for (let i = 0; i < n; i++) {
    const z = -len / 2 + (i + 0.5) * (len / n)
    for (const s of [-1, 1]) P.box(0.5, 0.9, 0.9, EC.putih, K.BATU, { x: s * (t / 2 - 0.25), y: h, z })
  }
  // lis emas di bawah gerigi
  for (const s of [-1, 1]) P.box(0.06, 0.18, len, EC.emasTua, K.POLOS, { x: s * (t / 2 + 0.02), y: h - 0.6 })
  return P
}

// gerbang benteng: dua tiang segi empat + lengkung runcing + daun pintu terbuka, lebar celah w
export function gerbangElf(w, h) {
  const P = new Parts()
  for (const s of [-1, 1]) {
    P.box(2.6, h, 3.2, EC.putih, K.BATU, { x: s * (w / 2 + 1.3) })
    P.cyl(0, 1.9, 3.4, 4, ROOF[0], K.SIRAP, { x: s * (w / 2 + 1.3), y: h, ry: Math.PI / 4 })
    P.cyl(0.05, 0.05, 1.2, 4, EC.emas, K.POLOS, { x: s * (w / 2 + 1.3), y: h + 3.3 })
    // daun pintu terbuka ke dalam
    P.box(0.2, h * 0.62, w / 2, EC.kayuTua, K.KAYU, { x: s * (w / 2 - 0.1), z: -w / 4 - 1.6 })
  }
  // balok lengkung di atas celah (dua bidang miring bertemu di tengah)
  const y0 = h * 0.62
  const tris = []
  const fz = 1.6
  for (const zz of [fz, -fz]) {
    const dir = zz > 0 ? 1 : -1
    const a = [-w / 2, y0, zz]
    const b = [0, y0 + w * 0.35, zz]
    const c = [w / 2, y0, zz]
    const top = h + 0.4
    const tl = [-w / 2, top, zz]
    const tr = [w / 2, top, zz]
    // depan (+z) berlawanan jarum jam dilihat dari depan; belakang sebaliknya
    if (dir > 0) tris.push([a, b, tl], [b, tr, tl], [b, c, tr])
    else tris.push([a, tl, b], [b, tl, tr], [b, tr, c])
  }
  P.faces(tris, EC.putih, K.BATU)
  P.box(w, 0.4, 3.2, EC.batuTua, K.BATU, { y: h + 0.2 - 0.2 })
  // daun emas di puncak lengkung
  P.faces([[[-0.9, h + 0.4, fz + 0.05], [0.9, h + 0.4, fz + 0.05], [0, h + 2.2, fz + 0.05]]], EC.emas, K.POLOS)
  return P
}

// gapura Jembatan Perak: dua menara ramping + lengkung daun perak, lebar celah w
export function gapuraPerak(w) {
  const P = new Parts()
  for (const s of [-1, 1]) merge(P, menaraElf(1.1, 7.5, ROOF[0]), { x: s * (w / 2 + 1.4) })
  const tris = []
  for (const zz of [0.4, -0.4]) {
    const a = [-w / 2 - 0.4, 6.2, zz]
    const b = [0, 8.6, zz]
    const c = [w / 2 + 0.4, 6.2, zz]
    tris.push(zz > 0 ? [a, c, b] : [a, b, c])
  }
  P.faces(tris, EC.putih, K.POLOS)
  P.box(w + 0.8, 0.35, 0.8, EC.batu, K.BATU, { y: 6.0 })
  P.faces([[[-0.7, 8.5, 0.45], [0.7, 8.5, 0.45], [0, 9.9, 0.45]], [[0.7, 8.5, -0.45], [-0.7, 8.5, -0.45], [0, 9.9, -0.45]]], EC.emas, K.POLOS)
  return P
}

// Parts lain (sudah jadi) disalin ke P dengan warna & pola aslinya — untuk bangunan gabungan
function merge(P, src, o = {}) {
  const g = src.build()
  const pos = g.attributes.position.array
  const nor = g.attributes.normal.array
  const col = g.attributes.color.array
  const kind = g.attributes.aKind.array
  const sway = g.attributes.aSway.array
  const c = Math.cos(o.ry || 0)
  const s = Math.sin(o.ry || 0)
  const ox = o.x || 0
  const oy = o.y || 0
  const oz = o.z || 0
  for (let i = 0; i < pos.length; i += 3) {
    const x = pos[i]
    const z = pos[i + 2]
    P.pos.push(ox + x * c + z * s, oy + pos[i + 1], oz - x * s + z * c)
    P.nor.push(nor[i] * c + nor[i + 2] * s, nor[i + 1], -nor[i] * s + nor[i + 2] * c)
    P.col.push(col[i], col[i + 1], col[i + 2])
  }
  for (let i = 0; i < kind.length; i++) {
    P.kind.push(kind[i])
    P.sway.push(sway[i])
  }
  g.dispose()
}

// istana raja elf: aula utama di atas batur bertangga, empat menara sudut, menara pusat di atas
// pintu masuk, panji-panji di muka bangunan
export function istana() {
  const P = new Parts()
  const W = 40
  const D = 22
  const plinth = 1.6
  P.box(W + 8, plinth, D + 10, EC.batu, K.BATU)
  // tangga lebar di depan
  for (let i = 0; i < 4; i++) P.box(14, plinth * (4 - i) / 4, 1.2, EC.batu, K.BATU, { z: (D + 10) / 2 + 0.6 + i * 1.2 })
  P.box(W, 12, D, EC.putih, K.BATU, { y: plinth })
  for (let i = -4; i <= 4; i++) {
    if (i === 0) continue
    window2(P, i * 4.2, plinth + 4.2, D / 2, 1.3, 3.2, true)
    window2(P, i * 4.2, plinth + 4.2, -D / 2, 1.3, 3.2, true)
  }
  // pintu besar berlengkung
  P.box(5, 6.5, 0.2, EC.kayuTua, K.KAYU, { y: plinth, z: D / 2 + 0.05 })
  P.box(5.6, 0.5, 0.3, EC.emas, K.POLOS, { y: plinth + 6.5, z: D / 2 + 0.1 })
  P.gable(W + 2, D + 2.4, plinth + 12, 9, ROOF[0], K.SIRAP, EC.putih, K.BATU)
  P.box(W + 2, 0.3, 0.2, EC.emas, K.POLOS, { y: plinth + 12, z: D / 2 + 1.2 })
  for (const [sx, sz] of corners) merge(P, menaraElf(4, 22, ROOF[2]), { x: sx * (W / 2 + 1), y: plinth, z: sz * (D / 2 + 1) })
  merge(P, menaraElf(5, 30, ROOF[0]), { y: plinth, z: D / 2 - 3 })
  // panji di muka bangunan
  for (const x of [-14, -7, 7, 14]) {
    P.box(0.08, 4.5, 0.08, EC.emasTua, K.POLOS, { x, y: plinth + 6.5, z: D / 2 + 0.3 })
    P.box(1.4, 3.6, 0.04, x < 0 ? KAIN[0] : KAIN[1], K.POLOS, { x, y: plinth + 6.0, z: D / 2 + 0.4, sway: 0.05 })
  }
  return P
}

// barak: aula panjang beratap pelana, beberapa pintu di sisi panjang
export function barak(w, d, roof = ROOF[1]) {
  const P = new Parts()
  P.box(w + 0.6, 0.6, d + 0.6, EC.batu, K.BATU)
  P.box(w, 4, d, EC.plester, K.PLESTER, { y: 0.6 })
  for (let x = -w / 2 + 2.5; x < w / 2; x += 5) {
    window2(P, x + 1.2, 2.0, d / 2)
    window2(P, x + 1.2, 2.0, -d / 2)
  }
  for (const x of [-w / 3, 0, w / 3]) P.box(1.4, 2.4, 0.1, EC.kayuTua, K.KAYU, { x, y: 0.6, z: d / 2 + 0.04 })
  P.gable(w + 1, d + 1.4, 4.6, d * 0.55 + 1, roof, K.SIRAP, EC.plester, K.PLESTER)
  return P
}

// gudang senjata benteng: rumah batu + rak tombak & perisai di depannya
export function gudangSenjata(w, d) {
  const P = rumahElf(w, d, ROOF[3], { chimney: false })
  for (const s of [-1, 1]) merge(P, rakSenjata(), { x: s * (w / 2 - 1.5), z: d / 2 + 1.2 })
  return P
}

// --------------------------------------------------------------------------- pasar & tempa
const GOODS = {
  roti: ['#c98b4a', '#b0743a', '#d9a35e', '#e3b877'],
  buah: ['#d8423a', '#f0b13b', '#7bbf3f', '#9b4fb5', '#f28c28'],
  daging: ['#7d3b22', '#94492a', '#6b301b'],
  sayur: ['#4f9a3a', '#e3782a', '#6bb04a', '#d7c24a'],
  madu: ['#e8a930', '#d58c1f', '#f2c14e'],
  kain: ['#7d5ba6', '#4f8a3c', '#5d8fc4', '#c8312a', '#e3c04f'],
  bunga: ['#f06aa8', '#ffffff', '#f4c02c', '#a46bd8'],
  ramuan: ['#4fd1c5', '#e05a7a', '#7bd36a', '#9f7ae0'],
  ikan: ['#9fb4c4', '#7f99ad', '#c4d2dc'],
  keju: ['#e8c35a', '#f0d27a', '#d9a93a'],
  tembikar: ['#b5653a', '#c97b4a', '#8e4e2e'],
  rempah: ['#c8312a', '#e3a12f', '#6b4226', '#4f7a2f'],
  keranjang: ['#d8b968', '#c4a052', '#b08c45'],
}

// kios pasar: empat tiang, meja dagang, kanopi kain berwarna, barang dagangan sesuai jenis
// goods: roti | buah | daging | sayur | madu | kain | bunga | ramuan | ikan | keju | tembikar | rempah |
// keranjang | senjata | zirah | perisai
export function kios(color, goods) {
  const P = new Parts()
  for (const [sx, sz] of corners) P.cyl(0.07, 0.07, 2.5, 5, EC.kayuTua, K.KAYU, { x: sx * 1.9, z: sz * 1.35 })
  P.box(3.6, 0.9, 1.1, EC.kayu, K.KAYU, { z: 0.6 })
  P.box(3.7, 0.08, 1.2, EC.kayuMuda, K.KAYU, { y: 0.9, z: 0.6 })
  P.gable(4.4, 3.4, 2.45, 0.8, KAIN[color % KAIN.length], K.POLOS, KAIN[color % KAIN.length], K.POLOS, { sway: 0.05 })
  // papan nama emas
  P.box(1.6, 0.4, 0.06, EC.kayuTua, K.KAYU, { y: 2.0, z: 1.42 })
  P.box(1.3, 0.22, 0.04, EC.emas, K.POLOS, { y: 2.09, z: 1.46 })
  const y = 0.98
  const z = 0.6
  if (goods === 'senjata') {
    for (let i = 0; i < 6; i++) P.box(0.06, 0.05, 0.9, EC.besi, K.POLOS, { x: -1.4 + i * 0.55, y, z, ry: 0.3 })
    for (let i = 0; i < 4; i++) P.box(0.07, 1.5, 0.07, i % 2 ? EC.besi : EC.kayu, K.POLOS, { x: -1.5 + i * 1.0, y: 0, z: -1.1, rz: 0.12 })
  } else if (goods === 'zirah' || goods === 'perisai') {
    for (const x of [-1.1, 0, 1.1])
      if (goods === 'zirah') {
        P.cyl(0.03, 0.03, 1.1, 4, EC.kayuTua, K.KAYU, { x, z: -0.9 })
        P.box(0.6, 0.65, 0.35, x === 0 ? EC.emas : EC.besi, K.POLOS, { x, y: 1.05, z: -0.9 })
        P.box(0.85, 0.15, 0.3, EC.besi, K.POLOS, { x, y: 1.62, z: -0.9 })
      } else P.cyl(0.42, 0.42, 0.08, 10, x === 0 ? EC.emas : EC.besi, K.POLOS, { x, y: 0.75, z: -1.0, rx: Math.PI / 2 - 0.15 })

    for (let i = 0; i < 3; i++) P.cyl(0.3, 0.3, 0.06, 10, EC.besi, K.POLOS, { x: -1 + i, y, z, rx: 0.05 })
  } else if (goods === 'roti')
    for (let i = 0; i < 8; i++) P.cyl(0.11, 0.13, 0.42, 6, GOODS.roti[i % 4], K.POLOS, { x: -1.5 + i * 0.42, y: y + 0.12, z, rz: Math.PI / 2 })
  else if (goods === 'daging') {
    for (let i = 0; i < 5; i++) P.add(new THREE.IcosahedronGeometry(0.22, 0).translate(0, 0.15, 0), GOODS.daging[i % 3], K.POLOS, { x: -1.3 + i * 0.65, y, z, sx: 1.4 })
    // panggangan kecil berbara di samping
    P.box(0.9, 0.7, 0.7, EC.batuTua, K.BATU, { x: 2.5, z: 0.3 })
    P.box(0.75, 0.06, 0.55, EC.bara, K.CAHAYA, { x: 2.5, y: 0.7, z: 0.3 })
  } else if (goods === 'madu' || goods === 'ramuan')
    for (let i = 0; i < 9; i++) P.cyl(0.09, 0.11, 0.3, 6, GOODS[goods][i % GOODS[goods].length], K.POLOS, { x: -1.5 + i * 0.37, y, z })
  else if (goods === 'kain')
    for (let i = 0; i < 6; i++) P.cyl(0.13, 0.13, 0.9, 6, GOODS.kain[i % 5], K.POLOS, { x: -1.4 + i * 0.56, y: y + 0.13, z, rx: Math.PI / 2 })
  else if (goods === 'ikan')
    for (let i = 0; i < 7; i++) P.box(0.42, 0.08, 0.16, GOODS.ikan[i % 3], K.POLOS, { x: -1.4 + i * 0.47, y, z, ry: 0.4 })
  else if (goods === 'keju')
    for (let i = 0; i < 6; i++) P.cyl(0.22, 0.22, 0.14, 10, GOODS.keju[i % 3], K.POLOS, { x: -1.35 + i * 0.54, y, z })
  else if (goods === 'tembikar')
    for (let i = 0; i < 6; i++) P.cyl(0.12, 0.19, 0.38, 8, GOODS.tembikar[i % 3], K.POLOS, { x: -1.35 + i * 0.54, y, z })
  else if (goods === 'rempah')
    for (let i = 0; i < 6; i++) {
      P.cyl(0.2, 0.22, 0.3, 8, EC.jerami, K.ANYAMAN, { x: -1.35 + i * 0.54, y, z })
      P.cyl(0.18, 0.18, 0.04, 8, GOODS.rempah[i % 4], K.POLOS, { x: -1.35 + i * 0.54, y: y + 0.3, z })
    }
  else if (goods === 'keranjang')
    for (let i = 0; i < 5; i++) P.cyl(0.26, 0.2, 0.3, 8, GOODS.keranjang[i % 3], K.ANYAMAN, { x: -1.3 + i * 0.65, y, z })
  else {
    const pal = GOODS[goods] || GOODS.buah
    for (let i = 0; i < 9; i++) P.add(new THREE.IcosahedronGeometry(0.15, 0).translate(0, 0.15, 0), pal[i % pal.length], K.POLOS, { x: -1.5 + i * 0.37, y, z })
  }
  // keranjang & peti di tanah
  for (const s of [-1, 1]) P.cyl(0.32, 0.25, 0.42, 8, EC.jerami, K.ANYAMAN, { x: s * 1.4, z: 1.6 })
  return P
}

// bengkel pandai besi: atap di atas tiang, lantai batu, tungku berbara + cerobong batu, dua
// landasan tempa, tong air, roda asah, rak senjata
export function tempa() {
  const P = new Parts()
  const W = 12
  const D = 9
  P.box(W, 0.2, D, EC.batuTua, K.UBIN)
  for (const [sx, sz] of corners) P.box(0.4, 3.6, 0.4, EC.kayuTua, K.KAYU, { x: sx * (W / 2 - 0.3), z: sz * (D / 2 - 0.3) })
  for (const sx of [-1, 1]) P.box(0.4, 3.6, 0.4, EC.kayuTua, K.KAYU, { x: sx * (W / 2 - 0.3) })
  P.hip(W + 1.2, D + 1.2, 3.6, 2.6, ROOF[3], K.SIRAP)
  // tungku di dinding belakang + cerobong menembus atap
  P.box(3.2, 1.2, 2.0, EC.batuTua, K.BATU, { x: -2.5, z: -D / 2 + 1.4 })
  P.box(2.6, 0.12, 1.4, EC.bara, K.CAHAYA, { x: -2.5, y: 1.2, z: -D / 2 + 1.4 })
  P.box(1.6, 8.5, 1.4, EC.batu, K.BATU, { x: -2.5, y: 1.2, z: -D / 2 + 0.9 })
  // landasan tempa (anvil) di atas tunggul kayu
  for (const x of [-0.8, 2.2]) {
    P.cyl(0.35, 0.4, 0.6, 7, EC.kayuTua, K.KAYU, { x, z: 0.4 })
    P.box(0.45, 0.3, 0.3, EC.besiTua, K.POLOS, { x, y: 0.6, z: 0.4 })
    P.box(0.9, 0.22, 0.38, EC.besiTua, K.POLOS, { x, y: 0.9, z: 0.4 })
    P.cyl(0, 0.15, 0.35, 5, EC.besiTua, K.POLOS, { x: x + 0.55, y: 1.0, z: 0.4, rz: Math.PI / 2 })
  }
  // tong air pendingin, roda asah, rak senjata, tumpukan batang besi
  P.cyl(0.45, 0.45, 0.8, 9, EC.kayu, K.KAYU, { x: 4, z: -2.2 })
  P.cyl(0.4, 0.4, 0.04, 9, EC.air, K.POLOS, { x: 4, y: 0.78, z: -2.2 })
  P.cyl(0.55, 0.55, 0.18, 10, EC.batu, K.BATU, { x: 4.2, y: 0.9, z: 1.8, rx: Math.PI / 2 })
  P.box(0.2, 0.9, 0.9, EC.kayuTua, K.KAYU, { x: 4.2, z: 1.8 })
  merge(P, rakSenjata(), { x: 1.5, z: -D / 2 + 0.6 })
  for (let i = 0; i < 5; i++) P.box(1.4, 0.08, 0.08, EC.besi, K.POLOS, { x: -5, y: 0.25 + i * 0.09, z: 2.5 + (i % 2) * 0.1 })
  return P
}

// kedai: rumah elf dua lantai + papan nama + tong-tong bir di samping
export function kedai(w, d) {
  const P = new Parts()
  const base = 0.6
  const wallH = 6.2
  P.box(w + 0.4, base, d + 0.4, EC.batu, K.BATU)
  P.box(w, wallH, d, EC.plester, K.PLESTER, { y: base })
  for (const [sx, sz] of corners) P.box(0.3, wallH, 0.3, EC.kayuTua, K.KAYU, { x: sx * w / 2, y: base, z: sz * d / 2 })
  for (const sz of [-1, 1]) P.box(w + 0.1, 0.25, 0.12, EC.kayuTua, K.KAYU, { y: base + 3.1, z: sz * (d / 2 + 0.03) })
  P.box(1.6, 2.4, 0.1, EC.kayuTua, K.KAYU, { y: base, z: d / 2 + 0.04 })
  for (const x of [-w * 0.32, w * 0.32]) {
    window2(P, x, base + 1.1, d / 2, 1.0, 1.2, true)
    window2(P, x, base + 4.1, d / 2, 1.0, 1.2, true)
  }
  window2(P, 0, base + 4.1, d / 2, 1.0, 1.2, true)
  P.gable(w + 1.2, d + 1.4, base + wallH, d * 0.55 + 1.2, ROOF[1], K.SIRAP, EC.plester, K.PLESTER)
  // papan nama "Daun Emas" tergantung di lengan kayu
  P.box(0.12, 0.12, 1.5, EC.kayuTua, K.KAYU, { x: -w / 2 + 0.6, y: base + 3.5, z: d / 2 + 0.75 })
  P.box(1.3, 0.8, 0.08, EC.kayu, K.KAYU, { x: -w / 2 + 0.6, y: base + 2.6, z: d / 2 + 1.3 })
  P.faces([[[-w / 2 + 0.2, base + 2.75, d / 2 + 1.36], [-w / 2 + 1.0, base + 2.75, d / 2 + 1.36], [-w / 2 + 0.6, base + 3.25, d / 2 + 1.36]]], EC.emas, K.POLOS)
  for (const z of [-1.2, 0, 1.2]) P.cyl(0.4, 0.4, 0.9, 9, EC.kayu, K.KAYU, { x: w / 2 + 0.7, z, rz: 0 })
  return P
}

// --------------------------------------------------------------------------- makan & pesta
// pergola makan: tiang + kisi-kisi balok berjalin tanaman rambat (terbuka, kesatria yang makan
// di bawahnya tetap terlihat dari kamera atas)
export function pergola(w, d) {
  const P = new Parts()
  const h = 3.4
  P.box(w + 0.6, 0.25, d + 0.6, EC.batu, K.UBIN)
  for (let x = -w / 2; x <= w / 2 + 0.01; x += w / 4)
    for (const sz of [-1, 1]) P.cyl(0.16, 0.18, h, 6, EC.putih, K.BATU, { x, y: 0.25, z: sz * d / 2 })
  for (const sz of [-1, 1]) P.box(w + 0.6, 0.3, 0.3, EC.kayuTua, K.KAYU, { y: 0.25 + h, z: sz * d / 2 })
  for (let x = -w / 2; x <= w / 2 + 0.01; x += 1.6) P.box(0.18, 0.18, d + 1.2, EC.kayu, K.KAYU, { x, y: 0.55 + h })
  // tanaman rambat: bercak daun di atas kisi (jarang)
  for (let i = 0; i < Math.round(w * d / 9); i++) {
    const x = ((i * 7.31) % 1 - 0.5) * w
    const z = ((i * 3.77) % 1 - 0.5) * d
    P.add(new THREE.IcosahedronGeometry(0.55, 0).translate(0, 0.3, 0), i % 3 ? EC.daun : EC.daunTua, K.POLOS, { x, y: 0.62 + h, z, sy: 0.45, sway: 0.03 })
  }
  return P
}

// meja panjang (sumbu lokal x) + bangku di kedua sisi + hidangan, piring, gelas, lilin
export function mejaPanjang(len, { feast = false } = {}) {
  const P = new Parts()
  P.box(len, 0.1, 1.1, EC.kayuMuda, K.KAYU, { y: 0.78 })
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) P.box(0.12, 0.78, 0.12, EC.kayuTua, K.KAYU, { x: sx * (len / 2 - 0.3), z: sz * 0.4 })
  for (const sz of [-1, 1]) {
    P.box(len, 0.08, 0.4, EC.kayu, K.KAYU, { y: 0.44, z: sz * 0.95 })
    for (const sx of [-1, 1]) P.box(0.1, 0.44, 0.1, EC.kayuTua, K.KAYU, { x: sx * (len / 2 - 0.4), z: sz * 0.95 })
  }
  // taplak hijau di tengah meja
  P.box(len - 0.4, 0.02, 0.5, feast ? KAIN[4] : KAIN[0], K.POLOS, { y: 0.88 })
  const n = Math.floor(len / 0.8)
  for (let i = 0; i < n; i++) {
    const x = -len / 2 + 0.4 + i * 0.8
    for (const sz of [-1, 1]) {
      P.cyl(0.17, 0.17, 0.03, 8, '#f4f1ea', K.POLOS, { x, y: 0.89, z: sz * 0.32 })
      P.cyl(0.05, 0.05, 0.16, 6, feast ? EC.emas : EC.besi, K.POLOS, { x: x + 0.25, y: 0.89, z: sz * 0.22 })
    }
    if (i % 2 === 0) P.add(new THREE.IcosahedronGeometry(0.16, 0).translate(0, 0.12, 0), i % 4 ? '#c98b4a' : '#d8423a', K.POLOS, { x: x + 0.4, y: 0.89, sx: 1.3 })
    if (i % 3 === 1) P.cyl(0.025, 0.025, 0.22, 4, '#f4f1ea', K.POLOS, { x, y: 0.89 }).box(0.06, 0.08, 0.06, EC.api, K.CAHAYA, { x, y: 1.11 })
  }
  if (feast) for (const sx of [-1, 1]) P.cyl(0.35, 0.35, 0.75, 9, EC.kayu, K.KAYU, { x: sx * (len / 2 + 0.6), rx: Math.PI / 2 })
  return P
}

// api unggun: lingkaran batu, kayu bakar bersilang, lidah api (menyala, bergoyang), bangku kayu
export function apiUnggun({ benches = true } = {}) {
  const P = new Parts()
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    P.add(new THREE.IcosahedronGeometry(0.28, 0).translate(0, 0.15, 0), EC.batuTua, K.BATU, { x: Math.cos(a) * 1.1, z: Math.sin(a) * 1.1 })
  }
  // kayu bakar bersilang (diputar di geometrinya: miring dulu, baru diputar arahnya)
  for (let i = 0; i < 4; i++) P.add(new THREE.CylinderGeometry(0.1, 0.12, 1.5, 5).rotateX(Math.PI / 2 - 0.25).rotateY((i / 4) * Math.PI), EC.kayuTua, K.KAYU, { y: 0.25 })
  P.cyl(0.55, 0.65, 0.15, 7, EC.bara, K.CAHAYA, { y: 0.05 })
  P.cyl(0, 0.55, 1.6, 6, EC.api, K.CAHAYA, { y: 0.15, sway: 0.18 })
  P.cyl(0, 0.35, 2.2, 5, '#ffe08a', K.CAHAYA, { y: 0.15, x: 0.1, sway: 0.25 })
  P.cyl(0, 0.3, 1.3, 5, EC.bara, K.CAHAYA, { y: 0.15, x: -0.3, z: 0.2, sway: 0.2 })
  if (benches)
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.4
      P.add(new THREE.CylinderGeometry(0.22, 0.22, 2.4, 6).rotateX(Math.PI / 2).rotateY(-a), EC.kayu, K.KAYU, { x: Math.cos(a) * 4.2, y: 0.22, z: Math.sin(a) * 4.2 })
    }
  return P
}

// panggung musik: lantai kayu, dinding belakang, kanopi kain, harpa emas & genderang
export function panggung(w, d) {
  const P = new Parts()
  P.box(w, 0.8, d, EC.kayu, K.KAYU)
  for (let i = 0; i < 3; i++) P.box(2.4, 0.8 - i * 0.27, 0.6, EC.kayuMuda, K.KAYU, { z: d / 2 + 0.3 + i * 0.6 })
  P.box(w, 3.6, 0.3, EC.putih, K.PLESTER, { y: 0.8, z: -d / 2 + 0.15 })
  for (const sx of [-1, 1]) P.cyl(0.12, 0.12, 4.2, 6, EC.putih, K.BATU, { x: sx * (w / 2 - 0.2), y: 0.8, z: d / 2 - 0.2 })
  P.gable(w + 0.6, d + 0.6, 5.0, 1.4, KAIN[1], K.POLOS, KAIN[1], K.POLOS, { sway: 0.04 })
  P.faces([[[-1.6, 0.9, 0.2], [-1.6, 2.6, 0.2], [-0.8, 0.9, 0.2]], [[-1.6, 0.9, 0.2], [-0.8, 0.9, 0.2], [-1.6, 2.6, 0.2]]], EC.emas, K.POLOS)
  P.cyl(0.45, 0.45, 0.6, 10, '#9a3b2b', K.POLOS, { x: 1.5, y: 0.8, z: -0.4 })
  for (const sx of [-1, 1]) P.box(0.3, 0.5, 0.3, EC.lentera, K.CAHAYA, { x: sx * (w / 2 - 0.2), y: 3.8, z: d / 2 - 0.2 })
  return P
}

// --------------------------------------------------------------------------- latihan
// sasaran panah (menghadap +z): kaki kayu + bulatan jerami berlingkar
export function sasaran() {
  const P = new Parts()
  for (const s of [-1, 1]) P.box(0.1, 1.7, 0.1, EC.kayuTua, K.KAYU, { x: s * 0.45, rz: s * -0.12 })
  P.box(0.1, 1.3, 0.1, EC.kayuTua, K.KAYU, { z: -0.5, rx: 0.4 })
  const rings = [['#f2efe6', 0.62], ['#c8312a', 0.46], ['#f2efe6', 0.31], ['#e3b32b', 0.16]]
  rings.forEach(([c, r], i) => P.cyl(r, r, 0.12 + i * 0.01, 14, c, i === 0 ? K.JERAMI : K.POLOS, { y: 1.25, z: 0.05 + i * 0.006, rx: Math.PI / 2 }))
  return P
}

// boneka latihan jerami di atas tiang (menghadap +z)
export function boneka() {
  const P = new Parts()
  P.cyl(0.06, 0.08, 1.9, 5, EC.kayuTua, K.KAYU)
  P.box(1.3, 0.1, 0.1, EC.kayuTua, K.KAYU, { y: 1.45 })
  P.cyl(0.24, 0.28, 0.85, 7, EC.jerami, K.JERAMI, { y: 0.8 })
  P.add(new THREE.IcosahedronGeometry(0.2, 0).translate(0, 0.2, 0), EC.jerami, K.JERAMI, { y: 1.62 })
  P.box(0.5, 0.25, 0.05, '#8c2f3a', K.POLOS, { y: 1.1, z: 0.27 })
  return P
}

// rak senjata: dua tiang + palang, tombak & pedang bersandar
export function rakSenjata() {
  const P = new Parts()
  for (const s of [-1, 1]) P.box(0.1, 1.6, 0.1, EC.kayuTua, K.KAYU, { x: s * 0.9 })
  P.box(1.9, 0.1, 0.12, EC.kayuTua, K.KAYU, { y: 1.3 })
  P.box(1.9, 0.08, 0.3, EC.kayuTua, K.KAYU, { y: 0.15 })
  for (let i = 0; i < 6; i++) {
    const x = -0.75 + i * 0.3
    if (i % 2) P.box(0.05, 1.1, 0.04, EC.besi, K.POLOS, { x, y: 0.2, z: 0.05, rx: 0.12 })
    else {
      P.cyl(0.02, 0.02, 2.0, 4, EC.kayu, K.KAYU, { x, y: 0.2, z: 0.05, rx: 0.1 })
      P.cyl(0, 0.05, 0.22, 4, EC.besi, K.POLOS, { x, y: 2.15, z: 0.25 })
    }
  }
  return P
}

// --------------------------------------------------------------------------- perkemahan & desa
// tenda elf segi enam beratap runcing, pintu gelap di depan, panji kecil di puncak
export function tendaElf(color = 0) {
  const P = new Parts()
  const kain = KAIN[color % KAIN.length]
  P.cyl(0, 2.6, 3.8, 6, kain, K.POLOS, { ry: Math.PI / 6 })
  P.cyl(2.65, 2.65, 0.25, 6, '#e8e3d6', K.POLOS, { ry: Math.PI / 6 })
  P.faces([[[-0.6, 0.02, 2.3], [0.6, 0.02, 2.3], [0, 1.7, 1.3]]], EC.kayuTua, K.POLOS)
  P.cyl(0.04, 0.04, 1.2, 4, EC.emas, K.POLOS, { y: 3.6 })
  P.box(0.03, 0.3, 0.55, KAIN[(color + 2) % KAIN.length], K.POLOS, { y: 4.4, z: 0.3, sway: 0.08 })
  return P
}

// kincir angin batu: menara kerucut terpancung + topi atap + empat baling-baling
export function kincir() {
  const P = new Parts()
  P.cyl(2.2, 2.8, 8.5, 10, EC.batu, K.BATU)
  P.box(1.1, 2.0, 0.1, EC.kayuTua, K.KAYU, { z: 2.7 })
  P.cyl(0, 2.7, 2.6, 10, ROOF[3], K.SIRAP, { y: 8.5 })
  P.cyl(0.2, 0.2, 1.2, 6, EC.kayuTua, K.KAYU, { y: 8.7, z: 2.6, rx: Math.PI / 2 })
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.3
    P.box(0.9, 5.2, 0.06, i % 2 ? '#f2efe6' : '#e6dfcf', K.POLOS, { y: 8.7, z: 3.2, rz: -a })
  }
  return P
}

// air mancur bulat batu putih: kolam + tiang + mangkuk atas berair
export function airMancur(r = 3) {
  const P = new Parts()
  P.cyl(r, r + 0.2, 0.7, 14, EC.putih, K.BATU)
  P.cyl(r - 0.3, r - 0.3, 0.05, 14, EC.air, K.POLOS, { y: 0.6 })
  P.cyl(0.35, 0.5, 2.2, 8, EC.putih, K.BATU, { y: 0.6 })
  P.cyl(1.0, 0.4, 0.45, 10, EC.putih, K.BATU, { y: 2.8 })
  P.cyl(0.9, 0.9, 0.05, 10, EC.air, K.POLOS, { y: 3.18 })
  P.cyl(0.08, 0.2, 0.9, 6, '#a8d4ee', K.POLOS, { y: 3.2, sway: 0.03 })
  return P
}

// tiang lentera besi tempa dengan lentera menyala
export function lentera(h = 3.2) {
  const P = new Parts()
  P.cyl(0.07, 0.1, h, 6, EC.besiTua, K.POLOS)
  P.box(0.7, 0.07, 0.07, EC.besiTua, K.POLOS, { x: 0.3, y: h - 0.05 })
  P.box(0.3, 0.42, 0.3, EC.lentera, K.CAHAYA, { x: 0.55, y: h - 0.55 })
  P.cyl(0, 0.26, 0.25, 4, EC.besiTua, K.POLOS, { x: 0.55, y: h - 0.13, ry: Math.PI / 4 })
  return P
}

// lumbung bulat beratap jerami
export function lumbungElf() {
  const P = new Parts()
  P.cyl(2.2, 2.3, 3, 10, EC.kayuMuda, K.KAYU, { y: 0.4 })
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    P.box(0.3, 0.4, 0.3, EC.batuTua, K.BATU, { x: Math.cos(a) * 1.8, z: Math.sin(a) * 1.8 })
  }
  P.cyl(0, 2.9, 2.6, 10, EC.jerami, K.JERAMI, { y: 3.4 })
  return P
}

// pagar kayu lurus sepanjang sumbu lokal z
export function pagarKayu(len) {
  const P = new Parts()
  const n = Math.max(1, Math.round(len / 2.5))
  for (let i = 0; i <= n; i++) P.box(0.12, 1.0, 0.12, EC.kayuTua, K.KAYU, { z: -len / 2 + (i / n) * len })
  for (const y of [0.4, 0.8]) P.box(0.06, 0.08, len, EC.kayu, K.KAYU, { y })
  return P
}

// tumpukan peti & tong (dekorasi pasar/gudang)
export function tumpukan() {
  const P = new Parts()
  P.box(0.9, 0.7, 0.9, EC.kayu, K.KAYU, { x: -0.5 })
  P.box(0.7, 0.55, 0.7, EC.kayuMuda, K.KAYU, { x: -0.45, y: 0.7, ry: 0.4 })
  P.cyl(0.38, 0.38, 0.85, 9, EC.kayu, K.KAYU, { x: 0.7 })
  P.cyl(0.4, 0.4, 0.06, 9, EC.besiTua, K.POLOS, { x: 0.7, y: 0.6 })
  return P
}

// bangku taman batu
export function bangkuBatu(len = 2) {
  const P = new Parts()
  P.box(len, 0.12, 0.5, EC.putih, K.BATU, { y: 0.42 })
  for (const s of [-1, 1]) P.box(0.3, 0.42, 0.45, EC.batu, K.BATU, { x: s * (len / 2 - 0.3) })
  return P
}

// dapur balai makan: tungku besar berbara + kuali di atas api
export function dapur() {
  const P = new Parts()
  P.box(3.4, 0.9, 2.2, EC.batuTua, K.BATU)
  P.box(2.6, 0.1, 1.5, EC.bara, K.CAHAYA, { y: 0.9 })
  P.cyl(0.9, 0.7, 0.8, 10, EC.besiTua, K.POLOS, { y: 1.0 })
  P.cyl(0.8, 0.8, 0.04, 10, '#c98b4a', K.POLOS, { y: 1.75 })
  P.cyl(0, 0.5, 0.9, 6, EC.api, K.CAHAYA, { x: -1.2, y: 0.9, sway: 0.2 })
  return P
}

// --------------------------------------------------------------------------- perabot kota & benteng
// gerobak dagang beroda dua berisi barang menggunung; gagang ke depan (+z)
export function gerobak(goods = 'sayur') {
  const P = new Parts()
  for (const s of [-1, 1]) {
    P.add(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 10).rotateZ(Math.PI / 2), EC.kayuTua, K.KAYU, { x: s * 0.82, y: 0.5 })
    P.add(new THREE.CylinderGeometry(0.12, 0.12, 0.16, 6).rotateZ(Math.PI / 2), EC.besiTua, K.POLOS, { x: s * 0.82, y: 0.5 })
    P.box(0.07, 0.07, 1.4, EC.kayu, K.KAYU, { x: s * 0.5, y: 0.5, z: 1.4 })
    P.box(0.08, 0.5, 1.6, EC.kayuMuda, K.KAYU, { x: s * 0.71, y: 0.55 })
    P.box(1.5, 0.5, 0.08, EC.kayuMuda, K.KAYU, { y: 0.55, z: s * 0.76 })
  }
  P.box(1.5, 0.08, 1.6, EC.kayu, K.KAYU, { y: 0.55 })
  P.box(0.08, 0.5, 0.08, EC.kayuTua, K.KAYU, { z: 1.9 }) // penyangga depan
  const pal = GOODS[goods] || GOODS.sayur
  for (let i = 0; i < 14; i++)
    P.add(new THREE.IcosahedronGeometry(0.17, 0), pal[i % pal.length], K.POLOS, { x: -0.5 + (i % 4) * 0.33, y: 0.8 + Math.floor(i / 12) * 0.2, z: -0.55 + (Math.floor(i / 4) % 3) * 0.55 })
  return P
}

// sumur batu beratap sirap kecil, ember di ujung tali
export function sumur() {
  const P = new Parts()
  P.cyl(1.1, 1.2, 0.9, 12, EC.batu, K.BATU)
  P.cyl(0.86, 0.86, 0.05, 12, EC.air, K.POLOS, { y: 0.7 })
  for (const s of [-1, 1]) P.box(0.16, 2.3, 0.16, EC.kayuTua, K.KAYU, { x: s * 1.0 })
  P.box(2.2, 0.1, 0.1, EC.kayuTua, K.KAYU, { y: 2.0 })
  P.gable(2.7, 1.8, 2.3, 0.8, ROOF[0], K.SIRAP, EC.kayu, K.KAYU)
  P.box(0.03, 0.85, 0.03, EC.jerami, K.POLOS, { y: 1.15 })
  P.cyl(0.16, 0.13, 0.25, 8, EC.kayu, K.KAYU, { y: 0.92 })
  return P
}

// patung kesatria elf (batu putih) di atas alas: jubah panjang, telinga runcing, pedang tegak
export function patung() {
  const P = new Parts()
  P.box(2.2, 1.4, 2.2, EC.batuTua, K.BATU)
  P.box(1.8, 0.2, 1.8, EC.batu, K.BATU, { y: 1.4 })
  P.cyl(0.36, 0.72, 2.1, 8, EC.putih, K.BATU, { y: 1.6 })
  P.cyl(0.44, 0.36, 0.75, 8, EC.putih, K.BATU, { y: 3.7 })
  P.add(new THREE.IcosahedronGeometry(0.36, 1), EC.putih, K.BATU, { y: 4.8 })
  for (const s of [-1, 1]) {
    P.add(new THREE.ConeGeometry(0.08, 0.5, 4).rotateZ(-s * 1.05), EC.putih, K.BATU, { x: s * 0.42, y: 4.92 })
    // lengan ke gagang pedang di depan dada
    P.box(0.2, 0.2, 0.7, EC.putih, K.BATU, { x: s * 0.28, y: 3.85, z: 0.3, ry: -s * 0.35 })
  }
  P.box(0.12, 1.9, 0.05, EC.batu, K.BATU, { y: 1.75, z: 0.62 })
  P.box(0.55, 0.09, 0.14, EC.emas, K.POLOS, { y: 3.65, z: 0.62 })
  P.box(0.07, 0.38, 0.07, EC.kayuTua, K.KAYU, { y: 3.74, z: 0.62 })
  return P
}

// tiang panji: kain tergantung dari palang di puncak tiang
export function panji(color = 0, h = 6) {
  const P = new Parts()
  P.cyl(0.07, 0.09, h, 6, EC.kayuTua, K.KAYU)
  P.box(1.3, 0.06, 0.06, EC.emasTua, K.POLOS, { y: h - 0.35 })
  P.add(new THREE.IcosahedronGeometry(0.13, 0), EC.emas, K.POLOS, { y: h + 0.1 })
  P.box(1.1, 2.4, 0.04, KAIN[color % KAIN.length], K.POLOS, { y: h - 2.8, z: 0.06, sway: 0.2 })
  P.box(0.5, 0.5, 0.05, EC.emas, K.POLOS, { y: h - 1.9, z: 0.09 })
  return P
}

// meja saji balai makan: meja panjang, dua kuali berisi masakan, tumpukan mangkuk, keranjang roti
export function mejaSaji() {
  const P = new Parts()
  P.box(4.2, 0.9, 1.1, EC.kayu, K.KAYU)
  P.box(4.4, 0.08, 1.25, EC.kayuMuda, K.KAYU, { y: 0.9 })
  for (const [x, food] of [[-1.4, '#c98b4a'], [0.1, '#7bbf3f']]) {
    P.cyl(0.38, 0.32, 0.4, 10, EC.besiTua, K.POLOS, { x, y: 0.98 })
    P.cyl(0.34, 0.34, 0.03, 10, food, K.POLOS, { x, y: 1.32 })
  }
  for (let i = 0; i < 4; i++) P.cyl(0.15, 0.1, 0.07, 8, EC.putih, K.POLOS, { x: 1.25, y: 0.98 + i * 0.07 })
  P.cyl(0.3, 0.25, 0.3, 8, EC.jerami, K.ANYAMAN, { x: 1.85, y: 0.98 })
  for (let i = 0; i < 4; i++) P.cyl(0.07, 0.08, 0.3, 6, GOODS.roti[i], K.POLOS, { x: 1.75 + (i % 2) * 0.18, y: 1.18, z: (i < 2 ? -0.08 : 0.08), rz: Math.PI / 2 })
  return P
}

export { merge as mergeParts }
export { COL }
