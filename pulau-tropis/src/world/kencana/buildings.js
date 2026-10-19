import * as THREE from 'three'

// Bangunan Nusantara low-poly (gaya Majapahit/Jawa-Bali): rumah bata beratap limasan, joglo,
// rumah panggung beratap alang-alang, lumbung, warung pasar, tembok & gerbang bata merah
// (candi bentar, paduraksa), pendopo, bangsal, meru, candi, jembatan, dermaga.
// Setiap pembuat mengembalikan Parts: segitiga lepas dengan warna per titik + kode pola permukaan
// (bata, genteng, jerami, papan kayu, batu, …) yang digambar shader bangunan (material.js).
// Titik asal = tengah alas bangunan di tanah, depan bangunan menghadap +z lokal.

export const K = { POLOS: 0, BATA: 1, GENTENG: 2, JERAMI: 3, KAYU: 4, BATU: 5, SIRAP: 6, UBIN: 7, ANYAMAN: 8, PLESTER: 9 }

export const COL = {
  bata: '#a5523a',
  bataTua: '#8a4430',
  batuPutih: '#d3c8b2',
  andesit: '#8f8b84',
  andesitTua: '#6e6b66',
  kayu: '#8a5a35',
  kayuTua: '#5e3d24',
  kayuMuda: '#b08454',
  plester: '#ebe3d1',
  genteng: '#b65a32',
  gentengTua: '#5a4a40',
  ijuk: '#3d3732',
  alang: '#bb9c5c',
  bambu: '#c9ad74',
  emas: '#d9a82e',
  gelap: '#2b2420',
  merah: '#c8312a',
  putih: '#f0eee5',
  kuning: '#e2b32b',
}

const _c = new THREE.Color()
const _m = new THREE.Matrix4()
const _n = new THREE.Matrix3()
const _q = new THREE.Quaternion()
const _e = new THREE.Euler()
const _v = new THREE.Vector3()
const _a = new THREE.Vector3()
const _b = new THREE.Vector3()

export class Parts {
  constructor() {
    this.pos = []
    this.nor = []
    this.col = []
    this.kind = []
    this.sway = []
  }

  // tambahkan BufferGeometry apa pun: warna, kode pola, transformasi, gradasi gelap-terang
  // (bawah lebih gelap = bayangan-diri palsu), sway = seberapa jauh bergoyang angin (kain)
  add(geo, color, kind, o = {}) {
    const g = geo.index ? geo.toNonIndexed() : geo
    return this.addRaw(g.attributes.position.array, g.attributes.normal.array, color, kind, o)
  }

  // sama dengan add, dari larik angka mentah (x, y, z berurutan) — tanpa membuat geometri Three.js
  addRaw(pos, nor, color, kind, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1, shade = [0.84, 1.04], sway = 0 } = {}) {
    let minY = Infinity
    let maxY = -Infinity
    for (let i = 1; i < pos.length; i += 3) {
      if (pos[i] < minY) minY = pos[i]
      if (pos[i] > maxY) maxY = pos[i]
    }
    const span = Math.max(1e-3, maxY - minY)
    _c.set(color)
    // kebanyakan bagian hanya digeser + diputar di sumbu y: jalur cepat tanpa matriks
    const simple = rx === 0 && rz === 0 && sx === 1 && sy === 1 && sz === 1
    const c = Math.cos(ry)
    const s = Math.sin(ry)
    if (!simple) {
      _e.set(rx, ry, rz)
      _q.setFromEuler(_e)
      _m.compose(_v.set(x, y, z), _q, _a.set(sx, sy, sz))
      _n.getNormalMatrix(_m)
    }
    for (let i = 0; i < pos.length; i += 3) {
      const t = (pos[i + 1] - minY) / span
      const k = shade[0] + (shade[1] - shade[0]) * t
      if (simple) {
        this.pos.push(x + pos[i] * c + pos[i + 2] * s, y + pos[i + 1], z - pos[i] * s + pos[i + 2] * c)
        this.nor.push(nor[i] * c + nor[i + 2] * s, nor[i + 1], -nor[i] * s + nor[i + 2] * c)
      } else {
        _v.set(pos[i], pos[i + 1], pos[i + 2]).applyMatrix4(_m)
        this.pos.push(_v.x, _v.y, _v.z)
        _v.set(nor[i], nor[i + 1], nor[i + 2]).applyMatrix3(_n).normalize()
        this.nor.push(_v.x, _v.y, _v.z)
      }
      this.col.push(_c.r * k, _c.g * k, _c.b * k)
      this.kind.push(kind)
      this.sway.push(sway * t)
    }
    return this
  }

  // kotak berukuran w × h × d, alasnya di y (bukan tengahnya); 12 segitiga dibuat langsung
  box(w, h, d, color, kind, o = {}) {
    const x = w / 2
    const z = d / 2
    const pos = []
    const nor = []
    const quad = (a, b, cc, dd, n) => {
      for (const v of [a, b, cc, a, cc, dd]) {
        pos.push(v[0], v[1], v[2])
        nor.push(n[0], n[1], n[2])
      }
    }
    quad([x, 0, z], [x, 0, -z], [x, h, -z], [x, h, z], [1, 0, 0])
    quad([-x, 0, -z], [-x, 0, z], [-x, h, z], [-x, h, -z], [-1, 0, 0])
    quad([-x, 0, z], [x, 0, z], [x, h, z], [-x, h, z], [0, 0, 1])
    quad([x, 0, -z], [-x, 0, -z], [-x, h, -z], [x, h, -z], [0, 0, -1])
    quad([-x, h, z], [x, h, z], [x, h, -z], [-x, h, -z], [0, 1, 0])
    quad([-x, 0, -z], [x, 0, -z], [x, 0, z], [-x, 0, z], [0, -1, 0])
    return this.addRaw(pos, nor, color, kind, o)
  }

  // tabung/kerucut, alas di y
  cyl(rTop, rBot, h, seg, color, kind, o = {}) {
    return this.add(new THREE.CylinderGeometry(rTop, rBot, h, seg).translate(0, h / 2, 0), color, kind, o)
  }

  // segitiga-segitiga lepas [[x,y,z]×3, …] (berlawanan jarum jam dilihat dari luar), normal datar
  faces(tris, color, kind, o = {}) {
    const pos = []
    const nor = []
    for (const [a, b, c] of tris) {
      _a.set(b[0] - a[0], b[1] - a[1], b[2] - a[2])
      _b.set(c[0] - a[0], c[1] - a[1], c[2] - a[2])
      _a.cross(_b).normalize()
      for (const v of [a, b, c]) {
        pos.push(v[0], v[1], v[2])
        nor.push(_a.x, _a.y, _a.z)
      }
    }
    return this.addRaw(pos, nor, color, kind, { shade: [0.96, 1.04], ...o })
  }

  // kulit antara persegi panjang bawah (l0 × w0 di y0) dan atas (l1 × w1 di y1); l searah x.
  // Persegi panjang atas boleh berupa ruas (w1 = 0 → bubungan) atau titik (piramida)
  skirt(l0, w0, y0, l1, w1, y1, color, kind, o = {}) {
    const A = [[-l0 / 2, y0, -w0 / 2], [l0 / 2, y0, -w0 / 2], [l0 / 2, y0, w0 / 2], [-l0 / 2, y0, w0 / 2]]
    const B = [[-l1 / 2, y1, -w1 / 2], [l1 / 2, y1, -w1 / 2], [l1 / 2, y1, w1 / 2], [-l1 / 2, y1, w1 / 2]]
    const tris = []
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4
      // sisi luar: A[i] → A[j] → B[j] → B[i]
      tris.push([A[j], A[i], B[i]], [A[j], B[i], B[j]])
    }
    // buang segitiga gepeng (ujung bubungan / puncak piramida)
    return this.faces(tris.filter(([a, b, c]) => {
      _a.set(b[0] - a[0], b[1] - a[1], b[2] - a[2])
      _b.set(c[0] - a[0], c[1] - a[1], c[2] - a[2])
      return _a.cross(_b).lengthSq() > 1e-8
    }), color, kind, o)
  }

  // atap limasan (perisai): alas l × w di y, tinggi h, bubungan sepanjang sumbu panjang
  hip(l, w, y, h, color, kind, o = {}) {
    const ridge = Math.max(0, Math.abs(l - w) * 0.9)
    return l >= w
      ? this.skirt(l, w, y, ridge, 0, y + h, color, kind, o)
      : this.skirt(l, w, y, 0, ridge, y + h, color, kind, o)
  }

  // atap pelana: bubungan sepanjang x (panjang l), lebar w, tinggi h, ujung segitiga tertutup
  gable(l, w, y, h, color, kind, endColor = color, endKind = kind, o = {}) {
    const a = [-l / 2, y, -w / 2]
    const b = [l / 2, y, -w / 2]
    const c = [l / 2, y, w / 2]
    const d = [-l / 2, y, w / 2]
    const r0 = [-l / 2, y + h, 0]
    const r1 = [l / 2, y + h, 0]
    this.faces([[b, a, r0], [b, r0, r1], [d, c, r1], [d, r1, r0]], color, kind, o)
    return this.faces([[a, d, r0], [c, b, r1]], endColor, endKind, o)
  }

  build() {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3))
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3))
    g.setAttribute('aKind', new THREE.Float32BufferAttribute(this.kind, 1))
    g.setAttribute('aSway', new THREE.Float32BufferAttribute(this.sway, 1))
    g.computeBoundingSphere()
    return g
  }
}

// --------------------------------------------------------------------------- rumah
// pintu & jendela gelap di dinding depan (z = d/2)
function openings(P, w, d, y, wallH, { windows = true, door = 1 } = {}) {
  P.box(door, Math.min(2.1, wallH * 0.75), 0.1, COL.kayuTua, K.KAYU, { y, z: d / 2 + 0.01 })
  if (!windows) return
  for (const s of [-1, 1]) {
    if (w > 5) P.box(0.8, 0.8, 0.1, COL.gelap, K.POLOS, { x: s * w * 0.3, y: y + wallH * 0.42, z: d / 2 + 0.01 })
    P.box(0.1, 0.8, 0.8, COL.gelap, K.POLOS, { x: s * (w / 2 + 0.01), y: y + wallH * 0.42 })
  }
}

// alas batu yang menjorok ke tanah (menutup celah di tanah miring)
const plinth = (P, w, d, h = 0.45) => P.box(w + 0.3, h + 1.6, d + 0.3, COL.andesit, K.BATU, { y: -1.6, shade: [0.7, 1] })

export function rumahBata(w, d, roof) {
  const P = new Parts()
  plinth(P, w, d)
  P.box(w, 0.9, d, COL.bata, K.BATA, { y: 0.45 })
  P.box(w, 1.9, d, COL.plester, K.PLESTER, { y: 1.35 })
  P.box(w + 0.12, 0.14, d + 0.12, COL.batuPutih, K.POLOS, { y: 3.2 })
  openings(P, w, d, 0.45, 2.8)
  P.hip(w + 1.3, d + 1.3, 3.3, Math.min(w, d) * 0.42, roof, K.GENTENG)
  P.box(0.25, 0.25, 0.25, COL.gentengTua, K.POLOS, { x: Math.max(0, w - d) * 0.45, y: 3.3 + Math.min(w, d) * 0.42 - 0.05 })
  return P
}

export function rumahLimasan(w, d, roof) {
  const P = new Parts()
  plinth(P, w, d)
  P.box(w, 3.0, d, COL.kayuMuda, K.KAYU, { y: 0.45 })
  openings(P, w, d, 0.45, 2.9)
  // serambi depan: atap rendah + dua tiang
  P.hip(w + 1.2, d + 1.0, 3.4, Math.min(w, d) * 0.5, roof, K.SIRAP)
  P.box(w * 0.9, 0.12, 1.6, roof, K.SIRAP, { y: 2.8, z: d / 2 + 0.8, rx: 0.25 })
  for (const s of [-1, 1]) P.cyl(0.1, 0.1, 2.75, 6, COL.kayuTua, K.KAYU, { x: s * w * 0.4, y: 0.45, z: d / 2 + 1.4 })
  return P
}

export function rumahJoglo(w, d, roof) {
  const P = new Parts()
  plinth(P, w, d, 0.6)
  P.box(w * 0.86, 3.1, d * 0.86, COL.kayu, K.KAYU, { y: 0.6 })
  openings(P, w * 0.86, d * 0.86, 0.6, 3.1)
  // tiang serambi keliling
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1], [0, 1]])
    P.cyl(0.12, 0.12, 3.3, 6, COL.kayuTua, K.KAYU, { x: sx * w * 0.47, y: 0.6, z: sz * d * 0.47 })
  // atap joglo: emper lebar yang landai, lalu brunjung tinggi yang curam di tengah
  P.skirt(w + 1.6, d + 1.6, 3.6, w * 0.56, d * 0.56, 4.9, roof, K.GENTENG)
  P.hip(w * 0.6, d * 0.6, 4.8, 3.0, roof, K.GENTENG)
  P.box(0.3, 0.45, 0.3, COL.emas, K.POLOS, { y: 7.7 })
  return P
}

export function rumahPanggung(w, d, roof) {
  const P = new Parts()
  // tiang kolong
  for (let i = 0; i < 3; i++)
    for (const s of [-1, 1]) P.cyl(0.13, 0.15, 2.9, 6, COL.kayuTua, K.KAYU, { x: (i - 1) * (w * 0.42), y: -1.5, z: s * d * 0.42 })
  P.box(w, 0.25, d, COL.kayu, K.KAYU, { y: 1.3 })
  P.box(w - 0.3, 2.1, d - 0.3, COL.bambu, K.ANYAMAN, { y: 1.55 })
  P.box(0.95, 1.8, 0.1, COL.kayuTua, K.KAYU, { y: 1.55, z: (d - 0.3) / 2 + 0.01 })
  for (const s of [-1, 1]) P.box(0.7, 0.6, 0.1, COL.gelap, K.POLOS, { x: s * w * 0.3, y: 2.3, z: (d - 0.3) / 2 + 0.01 })
  // tangga depan
  P.box(0.9, 0.12, 2.0, COL.kayuTua, K.KAYU, { y: 0.55, z: d / 2 + 0.75, rx: 0.62 })
  // atap pelana curam berujung lancip, sisi segitiga ikut beratap jerami
  P.gable(w + 1.4, d + 1.7, 3.55, 2.7, roof, K.JERAMI, COL.bambu, K.ANYAMAN)
  P.box(w + 1.6, 0.18, 0.3, COL.ijuk, K.POLOS, { y: 6.2 })
  return P
}

export function lumbung(roof) {
  const P = new Parts()
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    P.cyl(0.12, 0.14, 3.3, 6, COL.kayuTua, K.KAYU, { x: sx * 1.1, y: -1.5, z: sz * 1.1 })
    P.cyl(0.42, 0.42, 0.1, 8, COL.kayu, K.KAYU, { x: sx * 1.1, y: 1.55, z: sz * 1.1 }) // piringan penghalang tikus
  }
  P.box(2.8, 0.2, 2.8, COL.kayu, K.KAYU, { y: 1.65 })
  P.box(2.2, 1.0, 2.2, COL.bambu, K.ANYAMAN, { y: 1.85 })
  // atap bundar seperti topi: tiga kulit makin curam
  P.skirt(4.2, 4.2, 2.0, 3.4, 3.4, 2.7, roof, K.JERAMI)
  P.skirt(3.4, 3.4, 2.7, 2.1, 2.1, 4.4, roof, K.JERAMI)
  P.skirt(2.1, 2.1, 4.4, 0, 0, 6.0, roof, K.JERAMI)
  return P
}

export function gudang(w, d, roof) {
  const P = new Parts()
  plinth(P, w, d, 0.3)
  P.box(w, 3.6, d, COL.kayu, K.KAYU, { y: 0.3 })
  P.box(2.6, 2.6, 0.12, COL.kayuTua, K.KAYU, { y: 0.3, z: d / 2 + 0.01 })
  P.gable(w + 1.0, d + 1.4, 3.9, 2.4, roof, K.GENTENG, COL.kayu, K.KAYU)
  return P
}

const GOODS = {
  buah: ['#e0a020', '#d84a2a', '#7fb03a', '#f2d24b'],
  ikan: ['#9fb4c2', '#c7d3dc', '#7d8f9c'],
  kain: ['#c8312a', '#2f62a8', '#e2b32b', '#3f8f4f', '#8a3f9a'],
  sayur: ['#4f9a2f', '#7cbf3c', '#d84a2a', '#e8e0c0'],
  gerabah: ['#a8603a', '#8f4f30', '#c27a4a'],
}
export const CANOPY = ['#c8312a', '#e07a20', '#e2b32b', '#3f8f4f', '#2f62a8', '#8a3f9a']

export function warung(color, goods) {
  const P = new Parts()
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.cyl(0.07, 0.07, 2.4, 5, COL.kayuTua, K.KAYU, { x: sx * 1.8, z: sz * 1.3 })
  P.box(3.4, 0.85, 1.1, COL.kayu, K.KAYU, { z: 0.45 })
  // kain atap berwarna (bergoyang sedikit)
  P.gable(4.2, 3.2, 2.35, 0.7, CANOPY[color], K.POLOS, CANOPY[color], K.POLOS, { sway: 0.06 })
  const pal = GOODS[goods]
  for (let i = 0; i < 7; i++) {
    const x = -1.4 + i * 0.47
    if (goods === 'kain') P.box(0.36, 0.22, 0.8, pal[i % pal.length], K.POLOS, { x, y: 0.85, z: 0.45 })
    else if (goods === 'gerabah') P.cyl(0.12, 0.17, 0.32, 7, pal[i % pal.length], K.POLOS, { x, y: 0.85, z: 0.45 })
    else P.add(new THREE.IcosahedronGeometry(0.2, 0).translate(0, 0.2, 0), pal[i % pal.length], K.POLOS, { x, y: 0.82, z: 0.45, sy: goods === 'ikan' ? 0.5 : 1, sx: goods === 'ikan' ? 1.6 : 1 })
  }
  // keranjang di tanah
  for (const s of [-1, 1]) P.cyl(0.32, 0.25, 0.4, 8, COL.bambu, K.ANYAMAN, { x: s * 1.3, z: 1.45 })
  return P
}

export function sumur() {
  const P = new Parts()
  P.cyl(1.0, 1.05, 0.9, 10, COL.andesit, K.BATU)
  P.cyl(0.8, 0.8, 0.02, 10, '#26343a', K.POLOS, { y: 0.85 })
  for (const s of [-1, 1]) P.box(0.15, 2.1, 0.15, COL.kayuTua, K.KAYU, { x: s * 0.9 })
  P.gable(2.4, 1.6, 2.1, 0.6, COL.genteng, K.GENTENG)
  return P
}

// --------------------------------------------------------------------------- tembok & gerbang
// tembok kota bata merah sepanjang sumbu z lokal: tutup batu putih + hiasan tegak tiap ±3 m
export function tembok(len, t, h) {
  const P = new Parts()
  P.box(t + 0.5, 1.6, len, COL.andesit, K.BATU, { y: -1.2 })
  P.box(t, h, len, COL.bata, K.BATA, { y: 0.4 })
  P.box(t + 0.35, 0.3, len, COL.batuPutih, K.POLOS, { y: h + 0.4 })
  P.box(t + 0.2, 0.25, len, COL.bata, K.BATA, { y: h + 0.7 })
  const n = Math.max(1, Math.round(len / 3))
  for (let i = 0; i < n; i++) {
    const z = -len / 2 + (i + 0.5) * (len / n)
    P.box(t * 0.55, 0.7, 0.9, COL.bata, K.BATA, { y: h + 0.95, z })
    P.skirt(t * 0.55, 0.9, h + 1.65, 0, 0, h + 2.1, COL.batuPutih, K.POLOS, { z })
  }
  return P
}

// tembok keraton: kaki bata, badan berplester putih, tutup genteng kecil berpelana
export function temboKeraton(len, t, h) {
  const P = new Parts()
  P.box(t + 0.3, 1.5, len, COL.andesit, K.BATU, { y: -1.1 })
  P.box(t, 1.2, len, COL.bata, K.BATA, { y: 0.4 })
  P.box(t, h - 1.2, len, COL.plester, K.PLESTER, { y: 1.6 })
  P.add(gableGeometry(len, t + 0.8, 0.7), COL.genteng, K.GENTENG, { y: h + 0.4, ry: Math.PI / 2 })
  return P
}

function gableGeometry(l, w, h) {
  const g = new Parts()
  g.gable(l, w, 0, h, '#ffffff', 0)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(g.pos, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(g.nor, 3))
  return geo
}

// pagar rendah (bata atau batu) dengan tutup
export function pagar(len, t, h, stone = false) {
  const P = new Parts()
  P.box(t + 0.2, 1.2, len, COL.andesit, K.BATU, { y: -1 })
  P.box(t, h, len, stone ? COL.andesit : COL.bata, stone ? K.BATU : K.BATA, { y: 0.2 })
  P.box(t + 0.2, 0.18, len, stone ? COL.andesitTua : COL.batuPutih, K.POLOS, { y: h + 0.2 })
  return P
}

// menara sudut/tengah tembok: badan bata, tutup bertingkat, gardu jaga beratap di puncak
export function menara(size, h) {
  const P = new Parts()
  P.box(size + 0.8, 1.8, size + 0.8, COL.andesit, K.BATU, { y: -1.4 })
  P.box(size, h, size, COL.bata, K.BATA, { y: 0.4 })
  P.box(size + 0.5, 0.35, size + 0.5, COL.batuPutih, K.POLOS, { y: h + 0.4 })
  P.box(size + 0.2, 0.5, size + 0.2, COL.bata, K.BATA, { y: h + 0.75 })
  const top = h + 1.25
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.cyl(0.14, 0.14, 2.3, 6, COL.kayuTua, K.KAYU, { x: sx * size * 0.3, y: top, z: sz * size * 0.3 })
  P.hip(size * 0.85, size * 0.85, top + 2.3, size * 0.42, COL.gentengTua, K.GENTENG)
  P.box(0.25, 0.4, 0.25, COL.emas, K.POLOS, { y: top + 2.3 + size * 0.42 - 0.05 })
  return P
}

// Satu belahan candi bentar: bertingkat makin ramping ke atas, sisi belahnya rata menghadap celah.
// Sumbu x lokal = sepanjang tembok; mirror = +1 → sisi rata di −x, −1 → sisi rata di +x.
export function bentar(w, d, h, mirror, stone = false) {
  const P = new Parts()
  const main = stone ? COL.andesit : COL.bata
  const kind = stone ? K.BATU : K.BATA
  const trim = stone ? COL.andesitTua : COL.batuPutih
  const split = -mirror * w / 2
  const tiers = 6
  const baseH = 1.2
  const bodyH = (h - baseH) * 0.82
  P.box(w + 0.4, baseH + 1.2, d + 0.4, COL.andesit, K.BATU, { x: mirror * 0.2, y: -1.2 })
  let y = baseH
  for (let i = 0; i < tiers; i++) {
    const f = i / tiers
    const tw = w * (1 - 0.62 * f)
    const td = d * (1 - 0.5 * f)
    const th = bodyH / tiers * (i === 0 ? 1.6 : 0.88)
    const cx = split + mirror * tw / 2
    P.box(tw, th, td, main, kind, { x: cx, y })
    P.box(tw + 0.12, 0.14, td + 0.18, trim, K.POLOS, { x: cx + mirror * 0.06, y: y + th - 0.07 })
    y += th
  }
  const tw = w * 0.32
  P.skirt(tw, d * 0.45, y, 0, 0, h, main, kind, { x: split + mirror * tw / 2 })
  return P
}

// Paduraksa: gerbang beratap (seperti Bajang Ratu): dua badan samping, ambang di atas celah,
// lalu menara bertingkat. Sumbu x lokal = sepanjang tembok, celah di tengah.
export function paduraksa(w, d, opening, h) {
  const P = new Parts()
  const side = (w - opening) / 2
  P.box(w + 1, 1.6, d + 1, COL.andesit, K.BATU, { y: -1.2 })
  for (const s of [-1, 1]) P.box(side, 4.6, d, COL.bata, K.BATA, { x: s * (opening / 2 + side / 2), y: 0.4 })
  P.box(w, 1.4, d, COL.bata, K.BATA, { y: 5 })
  P.box(w + 0.3, 0.2, d + 0.3, COL.batuPutih, K.POLOS, { y: 6.4 })
  let y = 6.6
  const tiers = 5
  for (let i = 0; i < tiers; i++) {
    const f = i / tiers
    const tw = w * (0.85 - 0.6 * f)
    const td = d * (0.95 - 0.55 * f)
    const th = (h - 9) / tiers
    P.box(tw, th, td, COL.bata, K.BATA, { y })
    P.box(tw + 0.2, 0.14, td + 0.2, COL.batuPutih, K.POLOS, { y: y + th - 0.07 })
    y += th
  }
  P.skirt(w * 0.3, d * 0.4, y, 0, 0, h, COL.bata, K.BATA)
  return P
}

// --------------------------------------------------------------------------- keraton
// Pendopo agung di atas batur: tiang saka, atap joglo besar, tangga di depan (+z lokal).
// w = lebar (x lokal), d = dalam (z lokal), h = tinggi batur.
export function pendopo(w, d, h) {
  const P = new Parts()
  P.box(w, h + 1.4, d, COL.bata, K.BATA, { y: -1.4 })
  P.box(w + 0.3, 0.16, d + 0.3, COL.batuPutih, K.POLOS, { y: h - 0.08 })
  P.box(w - 0.6, 0.05, d - 0.6, '#d8cfbd', K.UBIN, { y: h })
  // tangga depan (4 anak tangga) selebar 10 m
  for (let i = 0; i < 4; i++) P.box(10, h * (i + 1) / 4, 0.8, COL.andesit, K.BATU, { y: 0, z: d / 2 + 3.2 - (i + 0.5) * 0.8 })
  // langkan rendah di tepi batur (celah di tangga)
  const lk = (len, o) => P.box(len.w, 0.55, len.d, COL.bata, K.BATA, { ...o, y: h })
  lk({ w, d: 0.4 }, { z: -d / 2 + 0.2 })
  lk({ w: 0.4, d }, { x: -w / 2 + 0.2 })
  lk({ w: 0.4, d }, { x: w / 2 - 0.2 })
  for (const s of [-1, 1]) lk({ w: (w - 10) / 2, d: 0.4 }, { x: s * (5 + (w - 10) / 4), z: d / 2 - 0.2 })
  // saka guru (4 tiang tinggi) + saka pinggir keliling
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.cyl(0.32, 0.36, 9.4, 8, COL.kayuTua, K.KAYU, { x: sx * 3.2, y: h, z: sz * 3.2 })
  const cols = []
  for (let i = -2; i <= 2; i++) for (const s of [-1, 1]) cols.push([s * 12.4, i * 6.3])
  for (const i of [-1, 0, 1]) for (const s of [-1, 1]) if (!(s > 0 && i === 0)) cols.push([i * 6.2, s * 13.4])
  for (const [x, z] of cols) P.cyl(0.24, 0.27, 4.4, 8, COL.kayu, K.KAYU, { x, y: h, z })
  // atap joglo bertingkat
  const y0 = h + 4.3
  P.skirt(w + 3, d + 3, y0, 16, 17, y0 + 2.2, COL.gentengTua, K.SIRAP)
  P.skirt(16.4, 17.4, y0 + 2.1, 9.5, 10, y0 + 3.6, COL.gentengTua, K.SIRAP)
  P.hip(10, 10.5, y0 + 3.5, 5.6, COL.gentengTua, K.SIRAP)
  P.box(0.6, 0.9, 0.6, COL.emas, K.POLOS, { y: y0 + 9 })
  for (const s of [-1, 1]) P.box(0.4, 0.6, 0.4, COL.emas, K.POLOS, { z: s * 0.3, y: y0 + 9 })
  // singgasana di dalam
  P.box(2.2, 0.5, 1.6, COL.emas, K.POLOS, { y: h, z: -9 })
  P.box(2.2, 1.6, 0.3, COL.emas, K.POLOS, { y: h + 0.5, z: -9.7 })
  return P
}

// Bangsal (balairung tertutup) di atas batur, atap limasan besar
export function bangsal(w, d, h) {
  const P = new Parts()
  P.box(w + 1, h + 1.4, d + 1, COL.bata, K.BATA, { y: -1.4 })
  P.box(w + 1.3, 0.16, d + 1.3, COL.batuPutih, K.POLOS, { y: h - 0.08 })
  P.box(w - 1, 1.0, d - 1, COL.bata, K.BATA, { y: h })
  P.box(w - 1, 3.2, d - 1, COL.plester, K.PLESTER, { y: h + 1 })
  for (let i = -2; i <= 2; i++) P.box(1.0, 2.4, 0.1, COL.kayuTua, K.KAYU, { x: i * (w / 5.5), y: h, z: (d - 1) / 2 + 0.02 })
  for (let i = 0; i < 3; i++) P.box(5, h * (i + 1) / 3, 0.7, COL.andesit, K.BATU, { y: 0, z: d / 2 + 0.5 + 2.1 - (i + 0.5) * 0.7 })
  P.hip(w + 2.2, d + 2.4, h + 4.1, 6.5, COL.genteng, K.GENTENG)
  P.box(0.5, 0.8, 0.5, COL.emas, K.POLOS, { y: h + 10.5, x: -(w - d) * 0.42 })
  P.box(0.5, 0.8, 0.5, COL.emas, K.POLOS, { y: h + 10.5, x: (w - d) * 0.42 })
  return P
}

// Meru: menara beratap tumpang (ijuk hitam) di atas batur bata
export function meru(base, tiers) {
  const P = new Parts()
  P.box(base + 0.6, 2.8, base + 0.6, COL.bata, K.BATA, { y: -1.2 })
  P.box(base + 0.9, 0.18, base + 0.9, COL.batuPutih, K.POLOS, { y: 1.5 })
  const body = base * 0.42
  P.box(body, 1.6, body, COL.kayu, K.KAYU, { y: 1.6 })
  let y = 3.1
  for (let i = 0; i < tiers; i++) {
    const f = i / Math.max(1, tiers - 1)
    const s = base * (1.08 - 0.62 * f)
    P.skirt(s, s, y, s * 0.4, s * 0.4, y + 0.55, COL.ijuk, K.JERAMI, { shade: [0.9, 1.06] })
    P.box(s * 0.36, 0.5, s * 0.36, COL.kayuTua, K.KAYU, { y: y + 0.5 })
    y += 0.95
  }
  P.skirt(base * 0.4, base * 0.4, y, 0, 0, y + 1.0, COL.ijuk, K.JERAMI)
  P.cyl(0.05, 0.16, 0.7, 6, COL.emas, K.POLOS, { y: y + 0.95 })
  return P
}

// Candi batu andesit: kaki bertingkat, tubuh berpintu, atap bertingkat dengan ratna kecil
export function candi(base) {
  const P = new Parts()
  const s = base / 17
  P.box(base, 1.9 * s + 1.2, base, COL.andesit, K.BATU, { y: -1.2 })
  P.box(base + 0.4, 0.2 * s, base + 0.4, COL.andesitTua, K.POLOS, { y: 1.9 * s - 0.1 })
  P.box(base * 0.78, 1.3 * s, base * 0.78, COL.andesit, K.BATU, { y: 1.9 * s })
  const bodyW = base * 0.52
  let y = 3.2 * s
  P.box(bodyW, 5.6 * s, bodyW, COL.andesit, K.BATU, { y })
  P.box(bodyW * 0.3, 2.8 * s, 0.3, COL.gelap, K.POLOS, { y: y + 0.2, z: bodyW / 2 + 0.02 })
  P.box(bodyW * 0.42, 0.5 * s, 0.4, COL.andesitTua, K.BATU, { y: y + 3.1 * s, z: bodyW / 2 })
  y += 5.6 * s
  for (let i = 0; i < 3; i++) {
    const w = bodyW * (1.06 - i * 0.2)
    const h = 1.7 * s
    P.box(w, h, w, COL.andesit, K.BATU, { y })
    P.box(w + 0.3 * s, 0.22 * s, w + 0.3 * s, COL.andesitTua, K.POLOS, { y: y - 0.1 * s })
    for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      P.box(0.5 * s, 0.6 * s, 0.5 * s, COL.andesit, K.BATU, { x: sx * w / 2.3, y: y + h, z: sz * w / 2.3 })
      P.skirt(0.5 * s, 0.5 * s, y + h + 0.6 * s, 0, 0, y + h + 1.2 * s, COL.andesit, K.BATU, { x: sx * w / 2.3, z: sz * w / 2.3 })
    }
    y += h
  }
  P.cyl(bodyW * 0.18, bodyW * 0.24, 1.6 * s, 8, COL.andesit, K.BATU, { y })
  P.cyl(0.05 * s, bodyW * 0.16, 2.2 * s, 8, COL.andesit, K.BATU, { y: y + 1.6 * s })
  // tangga depan
  for (let i = 0; i < 4; i++) P.box(3.2 * s, 3.2 * s * (i + 1) / 4, 0.8 * s, COL.andesit, K.BATU, { z: base * 0.39 + (3.2 - (i + 0.5) * 0.8) * s })
  return P
}

// Bale: balai terbuka (4 tiang, lantai rendah, atap tajug)
export function bale(w, d, roof = COL.alang, kind = K.JERAMI) {
  const P = new Parts()
  P.box(w * 0.92, 0.6 + 1.2, d * 0.92, COL.bata, K.BATA, { y: -1.2 })
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.cyl(0.11, 0.11, 2.6, 6, COL.kayuTua, K.KAYU, { x: sx * w * 0.43, y: 0.6, z: sz * d * 0.43 })
  P.hip(w + 1, d + 1, 3.1, Math.min(w, d) * 0.55, roof, kind)
  return P
}

export function dangau(w, d) {
  const P = new Parts()
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.cyl(0.08, 0.08, 3.4, 5, COL.kayuTua, K.KAYU, { x: sx * w * 0.42, y: -1, z: sz * d * 0.42 })
  P.box(w * 0.9, 0.15, d * 0.9, COL.bambu, K.ANYAMAN, { y: 0.9 })
  P.gable(w + 0.8, d + 0.8, 2.4, 1.2, COL.alang, K.JERAMI, COL.alang, K.JERAMI)
  return P
}

// Umbul-umbul: tiang bambu tinggi dengan kain panjang yang berkibar
export const FLAG = [[COL.merah, COL.putih], [COL.kuning, COL.merah], [COL.putih, COL.merah]]
export function umbul(h, color) {
  const P = new Parts()
  P.cyl(0.05, 0.08, h, 5, COL.bambu, K.KAYU, { y: -0.6 })
  const [c1, c2] = FLAG[color % FLAG.length]
  const len = h * 0.62
  const n = 6
  for (let i = 0; i < n; i++) {
    // kain dibagi beberapa potong ke bawah; makin bawah makin jauh bergoyang
    const y = h - 0.9 - (i + 1) * len / n
    P.box(0.04, len / n, 0.5, i % 2 ? c2 : c1, K.POLOS, { y, z: 0.27 })
  }
  // kain bergoyang: tepi bebas (jauh dari tiang) makin bawah makin jauh
  const { sway, pos } = P
  for (let i = 0; i < sway.length; i++) {
    const y = pos[i * 3 + 1]
    if (pos[i * 3 + 2] > 0.1) sway[i] = 0.12 + (h - 0.9 - y) / len * 0.5
  }
  return P
}

export function peti() {
  const P = new Parts()
  P.box(1.0, 0.8, 0.8, COL.kayuMuda, K.KAYU)
  P.box(0.9, 0.7, 0.7, COL.kayu, K.KAYU, { y: 0.8, x: 0.1, ry: 0.4 })
  return P
}

export function gentong() {
  const P = new Parts()
  P.cyl(0.32, 0.26, 0.9, 8, '#a8603a', K.POLOS)
  P.cyl(0.36, 0.32, 0.25, 8, '#a8603a', K.POLOS, { y: 0.9 })
  P.cyl(0.3, 0.24, 0.8, 8, '#8f4f30', K.POLOS, { x: 0.7, z: 0.2 })
  return P
}

export function jemuran() {
  const P = new Parts()
  for (const s of [-1, 1]) P.cyl(0.05, 0.05, 1.4, 5, COL.kayuTua, K.KAYU, { x: s * 1.6 })
  P.box(3.4, 0.08, 1.0, COL.bambu, K.ANYAMAN, { y: 1.1 })
  for (let i = 0; i < 8; i++) P.box(0.3, 0.05, 0.12, '#b7c4cc', K.POLOS, { x: -1.4 + i * 0.4, y: 1.15, z: (i % 2 ? 0.2 : -0.2) })
  return P
}

// --------------------------------------------------------------------------- dermaga & jembatan
export function dermaga(w, len, deckY) {
  const P = new Parts()
  P.box(w, 0.22, len, COL.kayuMuda, K.KAYU, { y: -0.22 })
  for (const s of [-1, 1]) P.box(0.2, 0.25, len, COL.kayuTua, K.KAYU, { x: s * (w / 2 - 0.1), y: -0.45 })
  const posts = Math.max(2, Math.round(len / 3))
  for (let i = 0; i <= posts; i++)
    for (const s of [-1, 1]) P.cyl(0.13, 0.13, deckY + 4.2, 6, COL.kayuTua, K.KAYU, { x: s * (w / 2 - 0.1), y: -deckY - 4, z: -len / 2 + i * len / posts })
  // tiang tambat di ujung
  for (const s of [-1, 1]) P.cyl(0.14, 0.14, 0.7, 6, COL.kayuTua, K.KAYU, { x: s * (w / 2 - 0.25), y: 0, z: len / 2 - 0.4 })
  return P
}

// Jembatan sepanjang z lokal (panjang len, lebar w). deck(t) = tinggi lantai (dunia) pada
// t = 0..1 sepanjang jembatan; floor(z) = tinggi dasar laut di bawahnya; y lokal = y dunia.
export function jembatan(len, w, deck, floor, { stone, piers }) {
  const P = new Parts()
  const n = Math.ceil(len / 1.5)
  const thick = stone ? 0.9 : 0.35
  const zAt = i => -len / 2 + (i / n) * len
  const yAt = i => deck(i / n)
  // lantai: pita yang mengikuti lengkung (atas, sisi, bawah)
  const top = []
  const sides = []
  const under = []
  for (let i = 0; i < n; i++) {
    const z0 = zAt(i)
    const z1 = zAt(i + 1)
    const y0 = yAt(i)
    const y1 = yAt(i + 1)
    const a = [-w / 2, y0, z0]
    const b = [w / 2, y0, z0]
    const c = [w / 2, y1, z1]
    const d = [-w / 2, y1, z1]
    top.push([a, d, c], [a, c, b])
    const a2 = [-w / 2, y0 - thick, z0]
    const b2 = [w / 2, y0 - thick, z0]
    const c2 = [w / 2, y1 - thick, z1]
    const d2 = [-w / 2, y1 - thick, z1]
    sides.push([a2, d, a], [a2, d2, d], [b2, b, c], [b2, c, c2])
    under.push([a2, b2, c2], [a2, c2, d2])
  }
  P.faces(top, stone ? '#9a958c' : COL.kayuMuda, stone ? K.UBIN : K.KAYU)
  P.faces(sides, stone ? COL.andesit : COL.kayu, stone ? K.BATU : K.KAYU)
  P.faces(under, stone ? COL.andesitTua : COL.kayuTua, K.POLOS)
  // langkan / pagar di kedua sisi
  for (const s of [-1, 1]) {
    const x = s * (w / 2 - 0.2)
    const rail = []
    const railH = stone ? 1.05 : 1.0
    for (let i = 0; i < n; i++) {
      const z0 = zAt(i)
      const z1 = zAt(i + 1)
      const y0 = yAt(i)
      const y1 = yAt(i + 1)
      if (stone) {
        // dinding bata pejal setebal 0,4 m
        const o = [x - 0.2, x + 0.2]
        rail.push(
          [[o[1], y0, z0], [o[1], y0 + railH, z0], [o[1], y1 + railH, z1]], [[o[1], y0, z0], [o[1], y1 + railH, z1], [o[1], y1, z1]],
          [[o[0], y1, z1], [o[0], y1 + railH, z1], [o[0], y0 + railH, z0]], [[o[0], y1, z1], [o[0], y0 + railH, z0], [o[0], y0, z0]],
          [[o[0], y0 + railH, z0], [o[0], y1 + railH, z1], [o[1], y1 + railH, z1]], [[o[0], y0 + railH, z0], [o[1], y1 + railH, z1], [o[1], y0 + railH, z0]],
        )
      } else if (i % 2 === 0) P.cyl(0.07, 0.07, railH, 5, COL.kayuTua, K.KAYU, { x, y: y0, z: z0 })
    }
    if (stone) P.faces(rail, COL.bata, K.BATA)
    else {
      // pegangan kayu mengikuti lengkung
      const hand = []
      for (let i = 0; i < n; i++) {
        const z0 = zAt(i)
        const z1 = zAt(i + 1)
        const y0 = yAt(i) + 1.0
        const y1 = yAt(i + 1) + 1.0
        hand.push([[x - 0.06, y0, z0], [x + 0.06, y1, z1], [x + 0.06, y0, z0]], [[x - 0.06, y0, z0], [x - 0.06, y1, z1], [x + 0.06, y1, z1]])
      }
      P.faces(hand, COL.kayu, K.KAYU)
    }
  }
  // tiang penyangga ke dasar laut (dan lampu di atas tiang jembatan batu)
  for (const t of piers) {
    const z = -len / 2 + t * len
    const y = deck(t) - thick
    const f = floor(z)
    if (stone) {
      P.box(w + 0.6, y - f + 0.5, 2.0, COL.andesit, K.BATU, { y: f - 0.5, z })
      P.box(w + 1.0, 0.3, 2.4, COL.andesitTua, K.POLOS, { y: y - 0.3, z })
      for (const s of [-1, 1]) {
        const ly = deck(t) + 1.05
        P.box(0.5, 0.5, 0.5, COL.batuPutih, K.POLOS, { x: s * (w / 2 - 0.2), y: ly, z })
        P.cyl(0.06, 0.06, 1.6, 5, COL.gelap, K.POLOS, { x: s * (w / 2 - 0.2), y: ly + 0.5, z })
        P.box(0.36, 0.48, 0.36, '#ffe3a0', K.POLOS, { x: s * (w / 2 - 0.2), y: ly + 2.1, z })
        P.skirt(0.5, 0.5, ly + 2.58, 0, 0, ly + 2.9, COL.gelap, K.POLOS, { x: s * (w / 2 - 0.2), z })
      }
    } else for (const s of [-1, 1]) P.cyl(0.16, 0.18, y - f + 0.6, 6, COL.kayuTua, K.KAYU, { x: s * (w / 2 - 0.3), y: f - 0.6, z })
  }
  return P
}
