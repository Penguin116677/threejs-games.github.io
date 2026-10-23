import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'
import { bakeRig, rigGeometry, toBufferGeometry, boneTexture, animate, frameOf as clipFrame, FPS } from '../kencana/rig.js'

// Rupa para elf Aeloria (kesatria & penduduk) dan cara menggambarnya dengan murah.
// - Badan: Kenney "Mini Characters" (penduduk.glb, CC0) + animasi tambahan (elf.glb) + gerak
//   buatan dari klip yang ada (makan, minum, bersorak, menari, memetik kecapi, memanah, mengaduk,
//   tidur, …). Semua dipanggang ke satu tekstur tulang (rig.js): semua elf berbadan sama digambar
//   dalam SATU draw call.
// - Warna per orang: tiap titik badan diberi "slot" (kulit, rambut, baju, celana, sepatu, hiasan,
//   zirah, warna pasukan); tiap elf memilih warna palet sendiri untuk tiap slot (aDye), jadi tak ada
//   dua elf yang persis sama. Bagian opsional (zirah, helm berjambul, jubah, rambut panjang, tabung
//   panah, sarung pedang, mahkota daun, celemek) ikut di geometri tetapi dilipat ke satu titik bila
//   tidak dipakai orang itu.
// - Telinga runcing untuk semua elf.
// - Dua tingkat detail: DEKAT = model penuh (peralihan halus antar-klip, bayangan, barang di
//   tangan), JAUH = model disederhanakan (titik-titiknya digumpalkan) dengan shader yang lebih murah
//   + bayangan bulat di kaki. Barang di tangan (pedang, tombak, busur, perisai, cangkir, mangkuk,
//   palu, cangkul, keranjang, sendok sayur, kecapi, pancing) diletakkan tiap bingkai mengikuti
//   matriks tulang tangan pada bingkai animasinya.

export const SCALE = 2.3 // sama dengan prajurit pemain & penduduk Kencana
const BONES = 7 // root, kaki kiri, kaki kanan, badan, lengan kiri, lengan kanan, kepala
const FADE = 0.25 // detik peralihan antar-klip
const FAR_CELL = 0.08 // kisi penggumpalan model jauh (satuan model; badan ±0,7)
export { FADE }

// pasangan warna palet colormap Kenney: 0–7 = kolom 0–7 baris 4–5 (terang–gelap), 8–15 = baris 6–7
export const WARNA = {
  kulitTerang: 0, hijau: 1, kuning: 2, jingga: 3, merah: 4, biru: 5, biruMuda: 6, ungu: 7,
  hitam: 8, abuBiru: 9, kelabu: 10, perak: 11, putih: 12, kulitCokelat: 13, cokelat: 14, kulitSawo: 15,
}
const pairOf = (u, v) => {
  const c = Math.floor(u * 8)
  const r = Math.floor(v * 8)
  return r >= 6 ? 8 + c : r >= 4 ? c : -1
}
const PAIR = n => (n[0] === 'A' ? 0 : 8) + Number(n[1]) // 'A3' → 3, 'B5' → 13
// uv di tengah kotak warna terang (baris genap) / gelap (ganjil) sebuah pasangan
const uvOf = (pair, dark = false) => [((pair % 8) + 0.5) / 8, ((pair < 8 ? 4 : 6) + (dark ? 1 : 0) + 0.5) / 8]

// slot warna tiap titik; [kanal aDye, bit bendera bagian opsional (0 = selalu tampak)]
const SLOT = {
  tetap: 0, kulit: 1, rambut: 2, baju: 3, celana: 4, sepatu: 5, hias: 6, zirah: 7, panji: 8,
  helm: 9, rambutPanjang: 10, tabung: 11, sarung: 12, jubah: 13, jambul: 14, mahkota: 15, celemek: 16,
  // warna aslinya tetap, tetapi ikut tersembunyi bersama bagiannya
  bulu: 17, gagang: 18, sabuk: 19,
}
// bagian opsional yang dipakai seorang elf (bit-bit bendera di aDye.w)
export const BAGIAN = { helm: 1, rambutPanjang: 2, tabung: 4, sarung: 8, jubah: 16, zirah: 32, mahkota: 64, celemek: 128 }
// kanal: 0 kulit, 1 rambut, 2 baju, 3 celana, 4 sepatu, 5 hias, 6 zirah, 7 panji, 8 = emas tetap,
// 9 = cokelat tetap, −1 = warna asli
const SLOT_DYE = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 6, 1, 9, 9, 7, 7, 8, 9, -1, -1, 5]
const SLOT_FLAG = [
  0, 0, 0, 0, 0, 0, 0, BAGIAN.zirah, BAGIAN.zirah, BAGIAN.helm, BAGIAN.rambutPanjang, BAGIAN.tabung, BAGIAN.sarung, BAGIAN.jubah,
  BAGIAN.helm, BAGIAN.mahkota, BAGIAN.celemek, BAGIAN.tabung, BAGIAN.sarung, BAGIAN.zirah,
]

// Badan yang dipakai + aturan slot titik aslinya: [kelompok tulang, pasangan warna asli, slot];
// aturan pertama yang cocok berlaku. Kelompok: kepala (6), badan (3), lengan (4, 5), kaki (1, 2), *.
// Mata (hitam di muka kepala) tidak pernah ikut diwarnai rambut.
const BODY_RULES = {
  'male-a': [['*', 'B6', 'kulit'], ['kepala', 'B0', 'rambut'], ['badan', 'A1', 'baju'], ['lengan', 'A1', 'baju'], ['kaki', 'A5', 'celana'], ['badan', 'B5', 'celana'], ['kaki', 'A2', 'sepatu']],
  'male-b': [['kaki', 'B5', 'sepatu'], ['*', 'B7', 'kulit'], ['kepala', 'B5', 'rambut'], ['*', 'A4', 'baju'], ['kaki', 'A5', 'celana']],
  'male-f': [['*', 'B5', 'kulit'], ['kepala', 'B0', 'rambut'], ['badan', 'A1', 'baju'], ['lengan', 'A1', 'baju'], ['lengan', 'B7', 'baju'], ['kaki', 'B7', 'celana'], ['badan', 'B0', 'hias'], ['badan', 'B1', 'hias'], ['kaki', 'B1', 'sepatu']],
  'female-a': [['*', 'B6', 'kulit'], ['kepala', 'B0', 'rambut'], ['badan', 'A7', 'baju'], ['lengan', 'A7', 'baju'], ['lengan', 'A5', 'baju'], ['kaki', 'A5', 'celana'], ['badan', 'B5', 'celana'], ['kaki', 'B7', 'sepatu'], ['lengan', 'B3', 'hias']],
  'female-b': [['*', 'B7', 'kulit'], ['kepala', 'B5', 'rambut'], ['kepala', 'A2', 'hias'], ['badan', 'A2', 'baju'], ['lengan', 'A2', 'baju'], ['kaki', 'A7', 'celana'], ['badan', 'A7', 'celana'], ['kaki', 'B0', 'sepatu']],
  'female-c': [['kaki', 'B5', 'sepatu'], ['*', 'B5', 'kulit'], ['kepala', 'B1', 'rambut'], ['kepala', 'A4', 'hias'], ['badan', 'A4', 'hias'], ['badan', 'A5', 'baju'], ['lengan', 'A5', 'baju'], ['kaki', 'B1', 'celana']],
  'female-f': [['*', 'B7', 'kulit'], ['kepala', 'B6', 'rambut'], ['kepala', 'B5', 'rambut'], ['badan', 'B0', 'baju'], ['lengan', 'B0', 'baju'], ['badan', 'A2', 'hias'], ['lengan', 'A2', 'hias'], ['kaki', 'A5', 'celana'], ['badan', 'B1', 'celana'], ['kaki', 'A7', 'sepatu']],
}
export const BODIES = Object.keys(BODY_RULES)
const GROUP = ['*', 'kaki', 'kaki', 'badan', 'lengan', 'lengan', 'kepala']

// ------------------------------------------------------------------- klip
// Kunci klip yang dipakai simulasi (kehidupan.js). Rangka Kenney: saat bind, lengan terentang ke
// samping (kiri ke +x, kanan ke −x), kaki & badan tegak; gerak buatan mengarahkan lengan ke arah
// tertentu di ruang badan (aim) lalu menambah anggukan / lompatan / putaran badan.
const _ax = new THREE.Vector3(1, 0, 0)
const _ay = new THREE.Vector3(0, 1, 0)
const _az = new THREE.Vector3(0, 0, 1)
const _bind = new THREE.Vector3()
const _dir = new THREE.Vector3()
// arahkan lengan j (4 = kiri, 5 = kanan) ke [keluar, atas, depan] (ruang badan)
function aim(b, j, [out, up, fwd]) {
  const s = j === 4 ? 1 : -1
  _bind.set(s, 0, 0)
  b[j].quaternion.setFromUnitVectors(_bind, _dir.set(s * out, up, fwd).normalize())
}
const mix3 = (a, c, k) => [a[0] + (c[0] - a[0]) * k, a[1] + (c[1] - a[1]) * k, a[2] + (c[2] - a[2]) * k]
const turnTo = (bone, axis, a) => bone.quaternion.setFromAxisAngle(axis, a)
// tonjolan halus 0..1..0 dalam satu siklus: naik [a, b], tahan, turun [c, d]
const bump = (u, a, b, c, d) => (u < a || u > d ? 0 : u < b ? THREE.MathUtils.smoothstep(u, a, b) : u < c ? 1 : 1 - THREE.MathUtils.smoothstep(u, c, d))
// arah lengan
const REST = [0.7, -0.7, 0]
const DOWN = [0.22, -1, 0.04]
const MOUTH = [-0.38, 0.55, 0.72]
const TABLE = [0.12, -0.12, 1]
// klip 'sit' Kenney = duduk di lantai; bangku & kursi setinggi ±0,5 m (0,217 satuan model)
const SEAT = 0.217
const SPECS = {
  idle: { clip: 'idle' },
  walk: { clip: 'walk' },
  run: { clip: 'sprint' },
  sit: { clip: 'sit', mod: b => {
    b[0].position.y += SEAT
  } },
  duduk: { clip: 'sit' },
  // makan di meja: lengan kanan menyuap, lengan kiri bertumpu di meja
  eat: {
    clip: 'sit', frames: 66,
    mod: (b, t) => {
      const k = bump((t / 2.2) % 1, 0.05, 0.3, 0.45, 0.7)
      b[0].position.y += SEAT
      aim(b, 5, mix3(TABLE, MOUTH, k))
      aim(b, 4, TABLE)
      turnTo(b[6], _ax, 0.1 * k)
    },
  },
  // makan bekal sambil duduk di tanah: tangan di pangkuan, menyuap
  bekal: {
    clip: 'sit', frames: 66,
    mod: (b, t) => {
      const k = bump((t / 2.2) % 1, 0.05, 0.3, 0.45, 0.7)
      aim(b, 5, mix3([0.15, -0.55, 1], MOUTH, k))
      aim(b, 4, [0.15, -0.55, 1])
      turnTo(b[6], _ax, 0.1 * k)
    },
  },
  // minum dari cangkir (duduk di bangku / berdiri), kepala menengadah saat meneguk
  drink: {
    clip: 'sit', frames: 111,
    mod: (b, t) => {
      const k = bump((t / 3.7) % 1, 0.05, 0.22, 0.45, 0.62)
      b[0].position.y += SEAT
      aim(b, 5, mix3(TABLE, MOUTH, k))
      aim(b, 4, TABLE)
      turnTo(b[6], _ax, -0.25 * k)
    },
  },
  minum: {
    clip: 'idle', frames: 111,
    mod: (b, t) => {
      const k = bump((t / 3.7) % 1, 0.05, 0.22, 0.45, 0.62)
      aim(b, 5, mix3([0.25, -0.5, 0.6], MOUTH, k))
      turnTo(b[6], _ax, -0.25 * k)
    },
  },
  // bersorak: kedua lengan ke atas melambai, melompat kecil
  cheer: {
    clip: 'idle', frames: 24,
    mod: (b, t) => {
      const p = (t / 0.8) * Math.PI * 2
      aim(b, 4, [0.35 + 0.3 * Math.sin(p), 1, 0.15])
      aim(b, 5, [0.35 - 0.3 * Math.sin(p), 1, 0.15])
      b[0].position.y += 0.03 * Math.abs(Math.sin(p))
    },
  },
  // menari: kaki melangkah di tempat, badan berputar ke kiri-kanan, lengan bergantian ke atas
  dance: {
    clip: 'walk', speed: 1.3, frames: 60,
    mod: (b, t) => {
      const p = (t / 2) * Math.PI * 2
      turnTo(b[3], _ay, 0.38 * Math.sin(p))
      aim(b, 4, [0.6, 0.55 + 0.6 * Math.sin(p), 0.35])
      aim(b, 5, [0.6, 0.55 - 0.6 * Math.sin(p), 0.35])
      b[0].position.y += 0.022 * Math.abs(Math.sin(p * 2))
    },
  },
  // mengobrol: tangan kanan bergerak mengikuti bicara, kepala sedikit mengangguk
  talk: {
    clip: 'idle', frames: 96,
    mod: (b, t) => {
      const p = (t / 3.2) * Math.PI * 2
      const g = Math.max(0, Math.sin(p))
      aim(b, 5, mix3(REST, [0.35, -0.05, 1], g * (0.85 + 0.15 * Math.sin(p * 5))))
      turnTo(b[6], _ax, 0.06 * Math.sin(p * 2))
    },
  },
  nod: { clip: 'emote-yes', loop: false },
  shake: { clip: 'emote-no', loop: false },
  // melambai ke orang yang lewat
  wave: {
    clip: 'idle', frames: 30,
    mod: (b, t) => aim(b, 5, [0.55 + 0.35 * Math.sin((t / 0.5) * Math.PI * 2), 0.9, 0.25]),
  },
  // membungkuk hormat
  bow: {
    clip: 'idle', frames: 45, loop: false,
    mod: (b, t) => turnTo(b[3], _ax, 0.55 * bump(t / 1.5, 0, 0.3, 0.7, 1)),
  },
  // memetik kecapi (pemusik): lengan kiri memegang leher kecapi, kanan memetik, badan bergoyang
  lute: {
    clip: 'idle', frames: 48,
    mod: (b, t) => {
      aim(b, 4, [0.35, 0.3, 1])
      aim(b, 5, [-0.35, -0.42 + 0.14 * Math.sin((t / 0.4) * Math.PI * 2), 1])
      turnTo(b[3], _az, 0.06 * Math.sin((t / 1.6) * Math.PI * 2))
    },
  },
  // memanah: lengan kiri lurus ke depan memegang busur, kanan menarik tali lalu melepas
  shoot: {
    clip: 'idle', frames: 90,
    mod: (b, t) => {
      const draw = bump((t / 3) % 1, 0.1, 0.45, 0.62, 0.64)
      aim(b, 4, [0.02, 0.06, 1])
      aim(b, 5, mix3([-0.05, 0.06, 1], [-0.9, 0.12, 0.25], draw))
    },
  },
  smith: { clip: 'attack-melee-right', speed: 0.8 },
  farm: { clip: 'attack-melee-right', speed: 0.55 },
  harvest: { clip: 'pick-up' },
  // mengaduk kuali: lengan kanan ke depan-bawah berputar pelan
  cook: {
    clip: 'idle', frames: 60,
    mod: (b, t) => {
      const p = (t / 2) * Math.PI * 2
      aim(b, 5, [0.12 + 0.18 * Math.cos(p), -0.5, 1 + 0.2 * Math.sin(p)])
      aim(b, 4, REST)
    },
  },
  serve: { clip: 'interact-right', speed: 0.8 },
  buy: { clip: 'idle', mix: { 5: 'interact-right' } },
  work: { clip: 'interact-right', speed: 0.6 },
  // tanding: menebas dengan perisai terangkat; bertahan: perisai & pedang siaga
  spar: { clip: 'attack-melee-right', speed: 0.85, hold: { 4: 'holding-left' } },
  spar2: { clip: 'attack-melee-left', speed: 0.8, hold: { 5: 'holding-right' } },
  block: { clip: 'idle', hold: { 4: 'holding-left', 5: 'holding-right' } },
  drill: { clip: 'attack-melee-right' },
  guard: { clip: 'idle', hold: { 5: 'holding-right' } },
  // tidur telentang (di tenda / barak / rumput), lengan di sisi badan, dada naik-turun
  sleep: {
    clip: 'idle', frames: 120,
    mod: (b, t) => {
      turnTo(b[0], _ax, -1.5)
      b[0].position.y = 0.06
      b[0].position.z -= 0.12
      turnTo(b[3], _ax, 0.025 * Math.sin((t / 4) * Math.PI * 2))
      aim(b, 4, DOWN)
      aim(b, 5, DOWN)
    },
  },
  // memancing: kedua tangan memegang joran ke depan
  fish: {
    clip: 'idle', frames: 120,
    mod: (b, t) => {
      aim(b, 5, [0.05, -0.25 + 0.04 * Math.sin((t / 4) * Math.PI * 2), 1])
      aim(b, 4, [-0.25, -0.3, 1])
    },
  },
  carry: { clip: 'walk', hold: { 4: 'holding-both', 5: 'holding-both' } },
  // terkena pukulan: badan terdorong ke belakang lalu tegak lagi
  hit: {
    clip: 'idle', frames: 15, loop: false,
    mod: (b, t) => {
      const k = Math.sin(Math.min(1, t / 0.5) * Math.PI)
      turnTo(b[3], _ax, -0.45 * k)
      turnTo(b[6], _ax, -0.3 * k)
    },
  },
  punch: { clip: 'attack-melee-left', speed: 1.2 },
  punch2: { clip: 'attack-melee-right', speed: 1.2 },
  kick: { clip: 'attack-kick-right' },
  die: { clip: 'die', loop: false },
  kneel: { clip: 'crouch' },
  jump: { clip: 'jump' },
}
export const CLIP_KEYS = Object.keys(SPECS)

// ------------------------------------------------------------------- bentuk tambahan
const _m = new THREE.Matrix4()
const _v = new THREE.Vector3()
const _w = new THREE.Vector3()
const _q = new THREE.Quaternion()
const Y = new THREE.Vector3(0, 1, 0)

// kotak dari batas min..max (ruang bind)
const boxAt = (x0, y0, z0, x1, y1, z1) => new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)
// limas terpancung beralas persegi panjang: alas w0 × d0 di y = 0, atas w1 × d1 di y = h
function frustum(w0, d0, w1, d1, h) {
  const g = new THREE.CylinderGeometry(Math.SQRT1_2, Math.SQRT1_2, h, 4, 1).rotateY(Math.PI / 4).translate(0, h / 2, 0)
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) {
    const top = p.getY(i) > h / 2
    p.setX(i, p.getX(i) * (top ? w1 : w0))
    p.setZ(i, p.getZ(i) * (top ? d1 : d0))
  }
  g.computeVertexNormals()
  return g
}
// kerucut pipih dari titik a ke b (telinga runcing)
function spike(a, b, r, flat) {
  const len = a.distanceTo(b)
  const g = new THREE.ConeGeometry(r, len, 4).rotateY(Math.PI / 4).scale(1, 1, flat).translate(0, len / 2, 0)
  _q.setFromUnitVectors(Y, _v.subVectors(b, a).normalize())
  return g.applyMatrix4(_m.compose(a, _q, _w.set(1, 1, 1)))
}

// tambahkan geometri (ruang bind) ke data badan: ikut tulang j, satu warna (uv), slot
function addPart(d, geo, j, uv, slot) {
  const g = geo.index ? geo.toNonIndexed() : geo
  const p = g.attributes.position
  const n = g.attributes.normal
  const base = d.pos.length / 3
  for (let i = 0; i < p.count; i++) {
    d.pos.push(p.getX(i), p.getY(i), p.getZ(i))
    d.nor.push(n.getX(i), n.getY(i), n.getZ(i))
    d.uv.push(uv[0], uv[1])
    d.bone.push(j)
    d.slot.push(slot)
    d.index.push(base + i)
  }
}

// batas tiap tulang (ruang bind) + batas kulit muka (untuk telinga & helm)
function boundsOf(d) {
  const B = Array.from({ length: BONES }, () => new THREE.Box3())
  const face = new THREE.Box3()
  for (let i = 0; i < d.bone.length; i++) {
    _v.set(d.pos[i * 3], d.pos[i * 3 + 1], d.pos[i * 3 + 2])
    B[d.bone[i]].expandByPoint(_v)
    if (d.bone[i] === 6 && d.slot[i] === SLOT.kulit) face.expandByPoint(_v)
  }
  if (face.isEmpty()) face.copy(B[6])
  // tangan = ujung lengan (saat bind lengan terentang ke samping: kiri ke +x, kanan ke −x)
  const hands = [4, 5].map(j => {
    const end = j === 4 ? B[j].max.x : B[j].min.x
    const c = new THREE.Vector3()
    let n = 0
    for (let i = 0; i < d.bone.length; i++)
      if (d.bone[i] === j && Math.abs(d.pos[i * 3] - end) < 0.05) {
        c.x += d.pos[i * 3]
        c.y += d.pos[i * 3 + 1]
        c.z += d.pos[i * 3 + 2]
        n++
      }
    return c.multiplyScalar(1 / Math.max(1, n))
  })
  // "tangan" badan (untuk kecapi): di depan perut
  const belly = new THREE.Vector3(0, B[3].min.y + 0.075, B[3].max.z + 0.03)
  return { B, face, hands: { 3: belly, 4: hands[0], 5: hands[1] } }
}

function addAttachments(d, bounds) {
  const { B, face } = bounds
  const T = B[3]
  const H = B[6]
  const hx = Math.max(Math.abs(face.min.x), Math.abs(face.max.x))
  const kulit = uvOf(0)
  // telinga runcing: dari sisi kepala setinggi mata, ke atas-belakang-luar
  for (const s of [-1, 1]) {
    const a = new THREE.Vector3(s * (hx - 0.012), face.min.y + (face.max.y - face.min.y) * 0.42, (face.min.z + face.max.z) / 2 - 0.02)
    const b = new THREE.Vector3(s * (hx + 0.11), a.y + 0.13, a.z - 0.06)
    addPart(d, spike(a, b, 0.05, 0.42), 6, kulit, SLOT.kulit)
  }
  // rambut panjang terurai di punggung kepala sampai bahu, menyempit ke bawah
  addPart(d, frustum(hx * 1.5, 0.07, hx * 1.2, 0.05, face.max.y - 0.03 - (T.max.y - 0.08)).translate(0, T.max.y - 0.08, H.min.z - 0.012), 6, uvOf(0), SLOT.rambutPanjang)
  // mahkota daun emas melingkar di dahi
  addPart(d, boxAt(face.min.x - 0.012, face.max.y - 0.09, face.min.z - 0.012, face.max.x + 0.012, face.max.y - 0.06, face.max.z + 0.012), 6, uvOf(0), SLOT.mahkota)
  // --- zirah kesatria: pelat dada, bahu, sabuk, kain pasukan di depan, pelindung tulang kering
  const pad = 0.014
  addPart(d, boxAt(T.min.x - pad, T.min.y + 0.012, T.min.z - pad, T.max.x + pad, T.max.y - 0.005, T.max.z + pad), 3, uvOf(0), SLOT.zirah)
  addPart(d, boxAt(T.min.x - pad - 0.004, T.min.y + 0.004, T.min.z - pad - 0.004, T.max.x + pad + 0.004, T.min.y + 0.036, T.max.z + pad + 0.004), 3, uvOf(0, true), SLOT.sabuk)
  addPart(d, boxAt(-0.045, T.min.y + 0.05, T.max.z + pad, 0.045, T.min.y + 0.13, T.max.z + pad + 0.008), 3, uvOf(0), SLOT.panji)
  addPart(d, boxAt(T.min.x * 0.62, T.min.y - 0.06, T.max.z + pad - 0.004, T.max.x * 0.62, T.min.y + 0.03, T.max.z + pad + 0.006), 3, uvOf(0), SLOT.panji)
  // pelindung bahu: membungkus pangkal lengan (lengan terentang ke samping saat bind)
  for (const j of [4, 5]) {
    const A = B[j]
    const s = j === 4 ? 1 : -1
    const x0 = s * (T.max.x - 0.06)
    const x1 = s * (T.max.x + 0.075)
    addPart(d, boxAt(Math.min(x0, x1), A.min.y - 0.012, A.min.z - 0.016, Math.max(x0, x1), A.max.y + 0.022, A.max.z + 0.016), j, uvOf(0), SLOT.zirah)
  }
  for (const j of [1, 2]) {
    const L = B[j]
    addPart(d, boxAt(L.min.x - 0.012, L.min.y + 0.06, L.min.z - 0.012, L.max.x + 0.012, L.min.y + 0.12, L.max.z + 0.012), j, uvOf(0), SLOT.zirah)
  }
  // helm: lingkar logam di atas mata, kubah meruncing ke atas, jambul warna pasukan di puncak
  {
    const w = face.max.x - face.min.x + 0.034
    const dz = face.max.z - face.min.z + 0.034
    const zc = (face.min.z + face.max.z) / 2
    const y0 = face.min.y + (face.max.y - face.min.y) * 0.55
    const y1 = face.max.y - 0.02
    addPart(d, boxAt(-w / 2, y0, zc - dz / 2, w / 2, y1, zc + dz / 2), 6, uvOf(0), SLOT.helm)
    addPart(d, frustum(w, dz, w * 0.45, dz * 0.45, 0.085).translate(0, y1, zc), 6, uvOf(0), SLOT.helm)
    addPart(d, boxAt(-0.014, y1 + 0.06, zc - dz * 0.33, 0.014, y1 + 0.135, zc + dz * 0.25), 6, uvOf(0), SLOT.jambul)
  }
  // jubah di punggung: dari bahu sampai bawah pinggang, sedikit mengembang ke belakang
  addPart(d, frustum(T.max.x * 1.7, 0.012, T.max.x * 1.95, 0.012, T.max.y - T.min.y + 0.07).rotateX(Math.PI).rotateX(-0.14).translate(0, T.max.y - 0.01, T.min.z - pad - 0.008), 3, uvOf(0, true), SLOT.jubah)
  // tabung panah di punggung (miring) + ujung anak panah
  {
    const g = boxAt(-0.032, -0.13, -0.032, 0.032, 0.13, 0.032).rotateZ(-0.4).translate(T.max.x * 0.35, (T.min.y + T.max.y) / 2 + 0.02, T.min.z - pad - 0.045)
    addPart(d, g, 3, uvOf(0), SLOT.tabung)
    const f = boxAt(-0.026, 0, -0.022, 0.026, 0.05, 0.022).rotateZ(-0.4).translate(T.max.x * 0.35 + 0.06, (T.min.y + T.max.y) / 2 + 0.135, T.min.z - pad - 0.045)
    addPart(d, f, 3, uvOf(PAIR('B4')), SLOT.bulu)
  }
  // sarung pedang di pinggul kiri (miring ke belakang) + gagang emas
  {
    const x = T.max.x + 0.022
    const g = boxAt(-0.018, -0.24, -0.026, 0.018, 0, 0.026).rotateX(-0.5).translate(x, T.min.y + 0.03, T.max.z * 0.2)
    addPart(d, g, 3, uvOf(0), SLOT.sarung)
    addPart(d, boxAt(-0.014, 0, -0.014, 0.014, 0.07, 0.014).rotateX(-0.5).translate(x, T.min.y + 0.03, T.max.z * 0.2), 3, uvOf(PAIR('A2')), SLOT.gagang)
  }
  // celemek kulit (pandai besi, juru masak)
  addPart(d, boxAt(T.min.x * 0.8, T.min.y - 0.07, T.max.z + 0.004, T.max.x * 0.8, T.max.y - 0.03, T.max.z + 0.012), 3, uvOf(0), SLOT.celemek)
}

// slot titik asli badan menurut aturannya
function labelBody(d, rules) {
  d.slot = new Array(d.bone.length).fill(0)
  const parsed = rules.map(([g, p, s]) => [g, PAIR(p), SLOT[s]])
  for (let i = 0; i < d.bone.length; i++) {
    const pair = pairOf(d.uv[i * 2], d.uv[i * 2 + 1])
    const group = GROUP[d.bone[i]]
    const eye = d.bone[i] === 6 && d.pos[i * 3 + 2] > 0.15 && d.pos[i * 3 + 1] > 0.38 && d.pos[i * 3 + 1] < 0.535
    for (const [g, p, s] of parsed) {
      if (p !== pair || (g !== '*' && g !== group)) continue
      if (eye && s === SLOT.rambut) break
      d.slot[i] = s
      break
    }
  }
}

// Model jauh: titik-titik yang berdekatan (kisi `cell`) pada tulang, slot & warna yang sama
// digumpalkan menjadi satu titik; segitiga yang menyusut hilang. Hasilnya berindeks (titik gumpalan
// dipakai bersama) dengan normal rata-rata dari segitiga di sekitarnya.
function simplify(d, cell) {
  const keys = new Map()
  const acc = []
  const id = new Int32Array(d.bone.length)
  for (let i = 0; i < d.bone.length; i++) {
    const x = d.pos[i * 3]
    const y = d.pos[i * 3 + 1]
    const z = d.pos[i * 3 + 2]
    const k = `${d.bone[i]}|${d.slot[i]}|${pairOf(d.uv[i * 2], d.uv[i * 2 + 1])}|${Math.round(x / cell)}|${Math.round(y / cell)}|${Math.round(z / cell)}`
    let c = keys.get(k)
    if (c === undefined) {
      c = acc.length
      keys.set(k, c)
      acc.push({ x: 0, y: 0, z: 0, n: 0, src: i, nor: new THREE.Vector3() })
    }
    const a = acc[c]
    a.x += x
    a.y += y
    a.z += z
    a.n++
    id[i] = c
  }
  for (const a of acc) {
    a.x /= a.n
    a.y /= a.n
    a.z /= a.n
  }
  const tris = []
  const seen = new Set()
  const e1 = new THREE.Vector3()
  const e2 = new THREE.Vector3()
  for (let t = 0; t < d.index.length; t += 3) {
    const c = [id[d.index[t]], id[d.index[t + 1]], id[d.index[t + 2]]]
    if (c[0] === c[1] || c[1] === c[2] || c[0] === c[2]) continue
    const key = [...c].sort((a, b) => a - b).join(',')
    if (seen.has(key)) continue
    seen.add(key)
    const [p, q, r] = c.map(k => acc[k])
    e1.set(q.x - p.x, q.y - p.y, q.z - p.z)
    e2.set(r.x - p.x, r.y - p.y, r.z - p.z)
    e1.cross(e2)
    if (e1.lengthSq() < 1e-12) continue
    for (const k of c) acc[k].nor.add(e1) // berbobot luas
    tris.push(c)
  }
  // hanya gumpalan yang masih dipakai segitiga
  const used = new Int32Array(acc.length).fill(-1)
  const out = { pos: [], nor: [], uv: [], bone: [], slot: [], index: [] }
  for (const tri of tris)
    for (const k of tri) {
      if (used[k] < 0) {
        const a = acc[k]
        used[k] = out.pos.length / 3
        a.nor.normalize()
        out.pos.push(a.x, a.y, a.z)
        out.nor.push(a.nor.x, a.nor.y, a.nor.z)
        out.uv.push(d.uv[a.src * 2], d.uv[a.src * 2 + 1])
        out.bone.push(d.bone[a.src])
        out.slot.push(d.slot[a.src])
      }
      out.index.push(used[k])
    }
  return out
}

// ------------------------------------------------------------------- barang di tangan
// Bentuk dalam ruang barang: titik asal = genggaman, sumbu utama +y, depan +z. Tiap barang punya
// pose acuan (klip `ref`, bingkai pertama): di pose itu barang berdiri tegak (diputar `rot`, digeser
// `at`, ruang model) di tangan — misalnya pedang tegak saat siaga, cangkir tegak saat lengan
// menjuntai, joran condong ke depan saat memancing. Dari situ barang ikut tulang tangannya.
const PC = {
  kayu: '#7a5636', kayuTua: '#4b3423', kayuMuda: '#a8814f', besiTua: '#5d636b', emas: '#d9b44a',
  perak: '#dfe6ee', daun: '#4f8a3c', putih: '#f2efe6', jerami: '#d8b968', sup: '#c98b4a', apel: '#d8423a',
}
function colored(parts) {
  const pos = []
  const nor = []
  const col = []
  for (const [g, color] of parts) {
    const n = g.index ? g.toNonIndexed() : g
    const c = new THREE.Color(color)
    pos.push(...n.attributes.position.array)
    nor.push(...n.attributes.normal.array)
    for (let i = 0; i < n.attributes.position.count; i++) col.push(c.r, c.g, c.b)
  }
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3))
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
  out.computeBoundingSphere()
  return out
}
const B = (w, h, d, x = 0, y = 0, z = 0) => new THREE.BoxGeometry(w, h, d).translate(x, y, z)
const C = (r0, r1, h, seg, x = 0, y = 0, z = 0) => new THREE.CylinderGeometry(r0, r1, h, seg).translate(x, y, z)
// bone = tulang tempat barang menempel (5 = tangan kanan, 4 = tangan kiri, 3 = perut)
const PROPS = {
  pedang: { bone: 5, ref: 'guard', rot: [0.3, 0, 0], geo: () => colored([[B(0.018, 0.32, 0.034, 0, 0.19, 0), PC.perak], [B(0.08, 0.018, 0.02, 0, 0.03, 0), PC.emas], [B(0.016, 0.075, 0.016, 0, -0.005, 0), PC.kayuTua]]) },
  tombak: { bone: 5, ref: 'idle', rot: [0, 0, 0], geo: () => colored([[C(0.009, 0.009, 1.05, 5, 0, 0.18, 0), PC.kayu], [C(0, 0.024, 0.09, 4, 0, 0.75, 0), PC.perak], [C(0.015, 0.015, 0.02, 5, 0, 0.7, 0), PC.emas]]) },
  busur: {
    bone: 4, ref: 'shoot', rot: [0, 0, 0],
    geo: () => {
      const parts = []
      const n = 6
      for (let i = 0; i < n; i++) {
        const y = -0.2 + (0.4 * (i + 0.5)) / n
        parts.push([B(0.018, 0.4 / n + 0.008, 0.022, 0, y, 0.05 * (1 - (y / 0.2) ** 2)), PC.kayuTua])
      }
      parts.push([B(0.004, 0.4, 0.004), PC.putih])
      return colored(parts)
    },
  },
  perisai: { bone: 4, ref: 'block', rot: [0, 0, 0], at: [0, 0, 0.03], geo: () => colored([[C(0.12, 0.12, 0.02, 12).rotateX(Math.PI / 2), PC.daun], [C(0.125, 0.125, 0.012, 12).rotateX(Math.PI / 2).translate(0, 0, -0.008), PC.perak], [C(0.035, 0.035, 0.028, 8).rotateX(Math.PI / 2), PC.emas]]) },
  cangkir: { bone: 5, ref: 'minum', rot: [0, 0, 0], geo: () => colored([[C(0.03, 0.025, 0.065, 8, 0, 0.02, 0), PC.kayuMuda], [C(0.031, 0.031, 0.006, 8, 0, 0.05, 0), PC.emas]]) },
  mangkuk: { bone: 5, ref: 'eat', rot: [0, 0, 0], at: [0, 0.02, 0], geo: () => colored([[C(0.05, 0.032, 0.032, 10), PC.putih], [C(0.045, 0.045, 0.004, 10, 0, 0.016, 0), PC.sup]]) },
  roti: { bone: 5, ref: 'eat', rot: [0, 0, Math.PI / 2], geo: () => colored([[C(0.022, 0.026, 0.1, 6), PC.sup]]) },
  palu: { bone: 5, ref: 'guard', rot: [0.2, 0, 0], geo: () => colored([[B(0.016, 0.17, 0.016, 0, 0.06, 0), PC.kayu], [B(0.075, 0.038, 0.038, 0, 0.15, 0), PC.besiTua]]) },
  cangkul: { bone: 5, ref: 'guard', rot: [0.35, 0, 0], geo: () => colored([[B(0.014, 0.44, 0.014, 0, 0.12, 0), PC.kayu], [B(0.065, 0.01, 0.08, 0, 0.33, 0.035), PC.besiTua]]) },
  keranjang: { bone: 4, ref: 'idle', rot: [0, 0, 0], geo: () => colored([[C(0.075, 0.06, 0.075, 8, 0, -0.085, 0), PC.jerami], [B(0.005, 0.05, 0.005, 0, -0.025, 0), PC.kayuTua], [C(0.065, 0.065, 0.014, 8, 0, -0.045, 0), PC.apel]]) },
  sendok: { bone: 5, ref: 'cook', rot: [0, 0, 0], geo: () => colored([[B(0.012, 0.22, 0.012, 0, -0.08, 0), PC.kayu], [C(0.032, 0.022, 0.028, 8, 0, -0.19, 0), PC.kayuTua]]) },
  kecapi: { bone: 3, ref: 'lute', rot: [0, 0, 0.75], geo: () => colored([[C(0.065, 0.065, 0.03, 10).rotateX(Math.PI / 2), PC.kayuMuda], [B(0.022, 0.2, 0.016, 0, 0.13, 0), PC.kayuTua], [C(0.018, 0.018, 0.032, 6).rotateX(Math.PI / 2).translate(0, 0, 0.002), PC.kayuTua]]) },
  pancing: { bone: 5, ref: 'fish', rot: [1.0, 0, 0], geo: () => colored([[B(0.009, 0.75, 0.009, 0, 0.3, 0), PC.kayu], [B(0.02, 0.05, 0.02, 0, 0.02, 0), PC.kayuTua]]) },
}
export const PROP_KEYS = Object.keys(PROPS)

// ------------------------------------------------------------------- warna & bendera per orang
// d = { kulit, rambut, baju, celana, sepatu, hias, zirah, panji, bagian } → vec4 aDye
export function packDye(d) {
  return [d.kulit + 16 * d.rambut, d.baju + 16 * d.celana, d.sepatu + 16 * d.hias, d.zirah + 16 * d.panji + 256 * (d.bagian || 0)]
}

const DYE_GLSL = /* glsl */`
attribute float aSlot;
attribute vec4 aDye;
const int SLOT_DYE[${SLOT_DYE.length}] = int[](${SLOT_DYE.join(', ')});
const int SLOT_FLAG[${SLOT_FLAG.length}] = int[](${SLOT_FLAG.join(', ')});
int elfPair(int ch) {
  if (ch == 8) return 2;  // emas
  if (ch == 9) return 14; // cokelat kulit samak
  int v = ch < 2 ? int(aDye.x + 0.5) : ch < 4 ? int(aDye.y + 0.5) : ch < 6 ? int(aDye.z + 0.5) : int(aDye.w + 0.5);
  return (ch % 2 == 0 ? v : v >> 4) & 15;
}
`

function dyeShader(shader, bones, { simple = false, map = true } = {}) {
  animate(shader, bones)
  shader.vertexShader = DYE_GLSL + shader.vertexShader
    .replace('void main() {', `void main() {
      int elfSlot = int(aSlot + 0.5);
      int elfFlag = SLOT_FLAG[elfSlot];
      bool elfHidden = elfFlag != 0 && ((int(aDye.w + 0.5) >> 8) & elfFlag) == 0;`)
    .replace('#include <project_vertex>', `if (elfHidden) transformed = vec3(0.0);
      #include <project_vertex>`)
  if (map)
    shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', `#include <uv_vertex>
      if (SLOT_DYE[elfSlot] >= 0) {
        int pair = elfPair(SLOT_DYE[elfSlot]);
        vec2 cell = floor(vMapUv * 8.0);
        vec2 inCell = vMapUv * 8.0 - cell;
        vMapUv = (vec2(float(pair % 8), float(pair < 8 ? 4 : 6) + mod(cell.y, 2.0)) + inCell) / 8.0;
      }`)
  if (simple) shader.vertexShader = '#define RIG_SIMPLE\n' + shader.vertexShader
}

// ------------------------------------------------------------------- pembuat
// villagerGltf: penduduk.glb (badan), elfGltf: elf.glb (animasi), caps = { near, far } banyak
// instance maksimum per jenis badan untuk model dekat & jauh
export function createElfFolk({ villagerGltf, elfGltf, quality, caps }) {
  const group = new THREE.Group()
  group.name = 'elf'
  const rows = []
  // salinan adegan penduduk: rangkanya masih pada pose bind (tidak terpengaruh pemanggangan lain)
  const rig = bakeRig(cloneSkinned(villagerGltf.scene), elfGltf.animations, rows, SPECS, { fresh: true })
  const CLIP = rig.table
  // matriks tulang j pada baris bingkai `row` (ruang model) → m
  const boneMatrixOf = (row, j, m) => {
    const r = rows[row]
    const o = j * 12
    return m.set(r[o], r[o + 1], r[o + 2], r[o + 3], r[o + 4], r[o + 5], r[o + 6], r[o + 7], r[o + 8], r[o + 9], r[o + 10], r[o + 11], 0, 0, 0, 1)
  }
  const bones = boneTexture(rows, BONES)
  const meshesByName = {}
  villagerGltf.scene.traverse(o => {
    if (o.isSkinnedMesh) meshesByName[o.name.replace('character-', '')] = o
  })
  const colormap = Object.values(meshesByName)[0].material.map

  const { shadows } = quality
  const types = []
  for (const name of BODIES) {
    const mesh = meshesByName[name]
    if (!mesh) continue
    const d = rigGeometry([mesh])
    labelBody(d, BODY_RULES[name])
    const bounds = boundsOf(d)
    addAttachments(d, bounds)
    const far = simplify(d, FAR_CELL)
    types.push({ name, near: d, far, hands: bounds.hands, bounds })
  }

  // --- satu InstancedMesh per jenis badan untuk tiap tingkat detail
  const makeMesh = (data, cap, tier) => {
    const geo = toBufferGeometry(data)
    geo.setAttribute('aSlot', new THREE.Float32BufferAttribute(data.slot, 1))
    const animA = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    const animB = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    const dye = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('aAnimA', animA)
    geo.setAttribute('aAnimB', animB)
    geo.setAttribute('aDye', dye)
    const mat = new THREE.MeshLambertMaterial({ map: colormap })
    mat.onBeforeCompile = shader => dyeShader(shader, bones, { simple: tier === 'far' })
    mat.customProgramCacheKey = () => `elf-${tier}`
    const mesh = new THREE.InstancedMesh(geo, mat, cap)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false // dipilah sendiri per orang
    mesh.count = 0
    if (tier === 'near' && shadows) {
      mesh.castShadow = true
      const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking })
      depth.onBeforeCompile = shader => dyeShader(shader, bones, { map: false })
      depth.customProgramCacheKey = () => 'elf-depth'
      mesh.customDepthMaterial = depth
    }
    mesh.receiveShadow = shadows && tier === 'near'
    group.add(mesh)
    return { mesh, animA, animB, dye }
  }
  const tiers = types.map(t => ({
    near: makeMesh(t.near, caps.near, 'near'),
    far: makeMesh(t.far, caps.far, 'far'),
  }))
  types.forEach((t, i) => {
    tiers[i].near.mesh.name = `elf-${t.name}`
    tiers[i].far.mesh.name = `elf-${t.name}-jauh`
  })

  // --- barang di tangan
  const propMat = new THREE.MeshLambertMaterial({ vertexColors: true })
  // matriks barang di ruang tulang: kebalikan tulang pada pose acuan × letak tegaknya (ruang model)
  const _place = new THREE.Matrix4()
  const _e = new THREE.Euler()
  for (const t of types)
    t.props = PROP_KEYS.map(key => {
      const P = PROPS[key]
      const { row } = CLIP[P.ref] || CLIP.idle
      const bm = boneMatrixOf(row, P.bone, new THREE.Matrix4())
      const hand = t.hands[P.bone].clone().applyMatrix4(bm)
      if (P.at) hand.add(_v.fromArray(P.at))
      _place.compose(hand, _q.setFromEuler(_e.set(...P.rot)), _w.set(1, 1, 1))
      return bm.invert().multiply(_place)
    })
  const props = PROP_KEYS.map(key => {
    const mesh = new THREE.InstancedMesh(PROPS[key].geo(), propMat, caps.near)
    mesh.name = `elf-barang-${key}`
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    mesh.count = 0
    mesh.castShadow = false
    group.add(mesh)
    return { key, mesh, bone: PROPS[key].bone }
  })
  const propIndex = Object.fromEntries(PROP_KEYS.map((k, i) => [k, i]))

  // --- bayangan bulat di kaki (model jauh, dan semua model bila bayangan peta mati)
  const blobBase = new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2)
  const blobCap = caps.far * 2
  const blobPos = new THREE.InstancedBufferAttribute(new Float32Array(blobCap * 3), 3).setUsage(THREE.DynamicDrawUsage)
  const blobGeo = new THREE.InstancedBufferGeometry()
  blobGeo.index = blobBase.index
  blobGeo.setAttribute('position', blobBase.attributes.position)
  blobGeo.setAttribute('aPos', blobPos)
  blobGeo.instanceCount = 0
  const blobMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })
  blobMat.onBeforeCompile = shader => {
    shader.vertexShader = 'attribute vec3 aPos;\nvarying vec2 vBlob;\n' + shader.vertexShader
      .replace('#include <begin_vertex>', 'vec3 transformed = aPos + vec3(position.x * 0.42, 0.05, position.z * 0.42);\nvBlob = position.xz;')
    shader.fragmentShader = 'varying vec2 vBlob;\n' + shader.fragmentShader
      .replace('#include <opaque_fragment>', 'diffuseColor.a *= 1.0 - smoothstep(0.25, 1.0, dot(vBlob, vBlob));\n#include <opaque_fragment>')
  }
  const blobs = new THREE.Mesh(blobGeo, blobMat)
  blobs.name = 'elf-bayangan'
  blobs.frustumCulled = false
  blobs.renderOrder = 1
  group.add(blobs)

  // --- menulis instance tiap bingkai
  const p = new THREE.Vector3()
  const q = new THREE.Quaternion()
  const s3 = new THREE.Vector3(SCALE, SCALE, SCALE)
  const inst = new THREE.Matrix4()
  const boneM = new THREE.Matrix4()
  const out = new THREE.Matrix4()
  const frame = [0, 0, 0]
  let blobN = 0
  const counts = { near: 0, far: 0, props: 0 }

  function begin() {
    for (const t of tiers) {
      t.near.mesh.count = 0
      t.far.mesh.count = 0
    }
    for (const pr of props) pr.mesh.count = 0
    blobN = 0
    counts.near = 0
    counts.far = 0
    counts.props = 0
  }

  // a = { type, x, y, z, heading, clip, t, prev, prevT, fade, dye: [4], props: ['pedang', …] }
  function put(a, near) {
    const T = tiers[a.type]
    const M = near ? T.near : T.far
    const { mesh } = M
    if (mesh.count >= (near ? caps.near : caps.far)) return false
    const i = mesh.count++
    p.set(a.x, a.y, a.z)
    q.setFromAxisAngle(Y, a.heading)
    inst.compose(p, q, s3.setScalar(SCALE * (a.scale || 1)))
    mesh.setMatrixAt(i, inst)
    const c = CLIP[a.clip] || CLIP.idle
    const A = M.animA.array
    clipFrame(c, a.t, A, i * 4)
    if (near) {
      A[i * 4 + 3] = a.fade > 0 ? a.fade / FADE : 0
      if (a.fade > 0) clipFrame(CLIP[a.prev] || CLIP.idle, a.prevT, M.animB.array, i * 4)
    } else A[i * 4 + 3] = 0
    M.dye.array.set(a.dye, i * 4)
    if (near) {
      counts.near++
      if (a.props) for (const key of a.props) putProp(key, a, c)
      if (!shadows) blob(a)
    } else {
      counts.far++
      blob(a)
    }
    return true
  }

  function putProp(key, a, c) {
    const k = propIndex[key]
    const pr = props[k]
    if (!pr || pr.mesh.count >= caps.near) return
    clipFrame(c, a.t, frame, 0)
    const row = frame[2] < 0.5 ? frame[0] : frame[1]
    out.multiplyMatrices(inst, boneMatrixOf(row, pr.bone, boneM)).multiply(types[a.type].props[k])
    pr.mesh.setMatrixAt(pr.mesh.count++, out)
    counts.props++
  }

  function blob(a) {
    if (blobN >= blobCap) return
    blobPos.array[blobN * 3] = a.x
    blobPos.array[blobN * 3 + 1] = a.y
    blobPos.array[blobN * 3 + 2] = a.z
    blobN++
  }

  function end() {
    for (const t of tiers)
      for (const M of [t.near, t.far]) {
        M.mesh.visible = M.mesh.count > 0
        if (!M.mesh.count) continue
        M.mesh.instanceMatrix.needsUpdate = true
        M.animA.needsUpdate = true
        M.animB.needsUpdate = true
        M.dye.needsUpdate = true
      }
    for (const pr of props) {
      pr.mesh.visible = pr.mesh.count > 0
      if (pr.mesh.count) pr.mesh.instanceMatrix.needsUpdate = true
    }
    blobGeo.instanceCount = blobN
    blobs.visible = blobN > 0
    blobPos.needsUpdate = true
  }

  // lama satu putaran klip (detik)
  const duration = key => (CLIP[key] ? CLIP[key].n / FPS : 1)

  return {
    object: group,
    CLIP,
    types: types.map(t => t.name),
    typeIndex: name => types.findIndex(t => t.name === name),
    begin,
    put,
    end,
    duration,
    stats: () => ({
      jenis: types.length,
      bingkai: rows.length,
      titikDekat: types.map(t => t.near.pos.length / 3),
      titikJauh: types.map(t => t.far.pos.length / 3),
      segitigaDekat: types.map(t => t.near.index.length / 3),
      segitigaJauh: types.map(t => t.far.index.length / 3),
      ...counts,
    }),
  }
}
