import * as THREE from 'three'
import { armDir, handBind, HAND, TITIK_SENDI, SEPATU } from './rupa.js'

// Gerak yang mirip manusia untuk rangka BERSENDI (pemain): rangka Kenney 7 tulang ditambah lutut,
// pergelangan kaki, pinggang, dan siku (tokoh/rupa.js SENDI), lalu dibuatkan klip-klip gerak dari
// kurva sudut sendi gaya berjalan & berlari manusia (pinggul, lutut, telapak kaki: tumit menjejak →
// telapak rata → tumit terangkat → ujung kaki menolak → kaki terayun dengan lutut menekuk), panggul
// yang berputar & naik-turun, dada yang berputar berlawanan, lengan berayun berlawanan dengan kaki
// dengan siku menekuk, kepala tetap menghadap ke depan; berenang gaya bebas (lengan mengayuh
// bergantian dengan siku tinggi, badan berguling, kaki mengepak, menoleh untuk mengambil napas) dan
// mengapung tegak (kaki mengayuh bergantian, tangan mengayun mendatar di depan dada).
// Klip dihitung SEKALI saat dimuat lalu diputar AnimationMixer seperti klip Kenney; klip Kenney
// lainnya (lompat, serangan, duduk, …) tetap dipakai apa adanya (sendi tambahannya lurus).
// Satuan = satuan model Kenney (karakter ±0,55 tinggi; diskala 2,3 × di dunia).

const D = Math.PI / 180
const X = new THREE.Vector3(1, 0, 0)
const Y = new THREE.Vector3(0, 1, 0)
const Z = new THREE.Vector3(0, 0, 1)
const TAU = Math.PI * 2

// tulang tambahan: nama, induk, indeks (titik sendinya di TITIK_SENDI)
const TAMBAHAN = [
  ['shin-left', 'leg-left', 7], ['shin-right', 'leg-right', 8],
  ['foot-left', 'shin-left', 9], ['foot-right', 'shin-right', 10],
  ['spine', 'torso', 11],
  ['forearm-left', 'arm-left', 12], ['forearm-right', 'arm-right', 13],
]
const NAMA = ['root', 'leg-left', 'leg-right', 'torso', 'arm-left', 'arm-right', 'head', ...TAMBAHAN.map(t => t[0])]

// Tambahkan tulang sendi pada rangka Kenney `model` (adegan glTF: simpul bernama, rotasi bind nol).
// Lengan & kepala dipindah ke tulang pinggang supaya dada bisa berputar sendiri dari panggul.
export function artikulasi(model) {
  if (model.getObjectByName('spine')) return model
  model.updateMatrixWorld(true)
  const inv = new THREE.Matrix4().copy(model.matrixWorld).invert()
  const m = new THREE.Matrix4()
  const at = o => new THREE.Vector3().setFromMatrixPosition(m.multiplyMatrices(inv, o.matrixWorld))
  for (const [name, parentName, j] of TAMBAHAN) {
    const parent = model.getObjectByName(parentName)
    const bone = new THREE.Bone()
    bone.name = name
    bone.position.copy(TITIK_SENDI[j]).sub(at(parent))
    parent.add(bone)
    bone.updateMatrixWorld(true)
  }
  const spine = model.getObjectByName('spine')
  for (const name of ['arm-left', 'arm-right', 'head']) spine.attach(model.getObjectByName(name))
  return model
}

// panjang tungkai (titik putar paha → pergelangan kaki, tegak) — untuk menurunkan pinggul saat lutut ditekuk
export const TUNGKAI = 0.17625 - TITIK_SENDI[9].y

// tulang & titik genggam tangan j (4 kiri, 5 kanan) untuk barang di tangan: tulang siku pada rangka
// bersendi (ikut tekukan siku), lengan atas pada rangka Kenney biasa
export function genggam(model, j) {
  const fore = model.getObjectByName(j === 4 ? 'forearm-left' : 'forearm-right')
  if (fore) return { bone: fore, at: handBind(j).sub(TITIK_SENDI[j === 4 ? 12 : 13]) }
  return { bone: model.getObjectByName(j === 4 ? 'arm-left' : 'arm-right'), at: HAND[j].clone() }
}

// Arah di ruang tulang `bone` yang menunjuk ke `dir` (ruang model) pada pose awal klip `clip` — untuk
// barang yang harus tegak / lurus pada pose diam (mis. tombak berdiri di samping badan)
export function arahLokal(model, clip, bone, dir) {
  const mixer = new THREE.AnimationMixer(model)
  mixer.clipAction(clip).play()
  mixer.setTime(0)
  model.updateMatrixWorld(true)
  const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().copy(model.matrixWorld).invert().multiply(bone.matrixWorld))
  const out = dir.clone().normalize().applyQuaternion(q.invert())
  mixer.stopAllAction()
  mixer.uncacheRoot(model)
  return out
}

// ------------------------------------------------------------------- bantuan
// kurva berkala (periode 1) lewat titik-titik [fase, nilai], spline Catmull-Rom
function kurva(keys) {
  const n = keys.length
  const at = k => [keys[((k % n) + n) % n][0] + Math.floor(k / n), keys[((k % n) + n) % n][1]]
  return phase => {
    const p = ((phase % 1) + 1) % 1
    let i = n - 1
    for (let k = 0; k < n; k++) if (keys[k][0] <= p) i = k
    const [p0, v0] = at(i - 1)
    const [p1, v1] = at(i)
    const [p2, v2] = at(i + 1)
    const [p3, v3] = at(i + 2)
    const x = p < p1 ? p + 1 : p
    const h = p2 - p1
    const t = (x - p1) / h
    const m1 = ((v2 - v0) / (p2 - p0)) * h
    const m2 = ((v3 - v1) / (p3 - p1)) * h
    const t2 = t * t
    const t3 = t2 * t
    return (2 * t3 - 3 * t2 + 1) * v1 + (t3 - 2 * t2 + t) * m1 + (-2 * t3 + 3 * t2) * v2 + (t3 - t2) * m2
  }
}
// kurva derajat → radian
const sudut = keys => {
  const f = kurva(keys)
  return p => f(p) * D
}
// tonjolan halus di sekitar fase c (lebar w), berkala
const tonjol = (p, c, w) => {
  const d = Math.abs(((p - c + 1.5) % 1) - 0.5)
  return d >= w ? 0 : 0.5 + 0.5 * Math.cos((Math.PI * d) / w)
}

const _qa = new THREE.Quaternion()
const _qb = new THREE.Quaternion()
const _qc = new THREE.Quaternion()
const _v = new THREE.Vector3()
const _h = new THREE.Vector3()
const _w = new THREE.Vector3()
const _u = new THREE.Vector3()
const _a = new THREE.Vector3()
const _m = new THREE.Matrix4()

// Kaki sisi s (+1 kiri, −1 kanan): paha (tekuk ke depan), lutut (tekuk), tapak = sudut telapak
// terhadap lantai (ujung naik = +; sudut pergelangan dihitung darinya) atau, bila mata = angka, sudut
// pergelangan langsung (naik = +); buka = paha menjauh ke samping; putar = paha diputar (radian)
export function kaki(b, s, paha, lutut, tapak, { buka = 0, putar = 0, mata = null } = {}) {
  const k = s > 0 ? 'left' : 'right'
  _qa.setFromAxisAngle(Y, putar)
  _qb.setFromAxisAngle(Z, s * buka)
  _qc.setFromAxisAngle(X, -paha)
  b[`leg-${k}`].quaternion.copy(_qa).multiply(_qb).multiply(_qc)
  b[`shin-${k}`].quaternion.setFromAxisAngle(X, lutut)
  const ankle = mata ?? tapak - paha + lutut
  b[`foot-${k}`].quaternion.setFromAxisAngle(X, -ankle)
}

// Lengan j (4 kiri, 5 kanan): lengan atas mengarah ke `u` (ruang tulang pinggang / dada), siku
// menekuk `siku` radian ke arah `arah` (mis. ke depan). Bidang tekuk siku = bidang (u, arah), jadi
// putaran lengan atas tidak acak — pedang di tangan kanan tetap menghadap ke arah yang wajar.
const LENGAN = {}
for (const j of [4, 5]) {
  const a0 = armDir(j)
  const h0 = new THREE.Vector3().crossVectors(a0, Z).normalize()
  const w0 = new THREE.Vector3().crossVectors(a0, h0)
  LENGAN[j] = { h0, inv: new THREE.Matrix4().makeBasis(a0, h0, w0).transpose() }
}
// putaran tulang siku lengan j untuk tekukan `a` radian (lengan bawah menekuk ke depan pada pose bind)
export const siku = (j, a, out = new THREE.Quaternion()) => out.setFromAxisAngle(LENGAN[j].h0, a)
// ... dan sebaliknya: tekukan siku (radian) dari putaran tulang siku q
export const sudutSiku = (j, q) => 2 * Math.atan2(q.x * LENGAN[j].h0.x + q.y * LENGAN[j].h0.y + q.z * LENGAN[j].h0.z, q.w)
export function lengan(b, j, u, tekuk, arah) {
  const L = LENGAN[j]
  _v.copy(arah).addScaledVector(u, -arah.dot(u)).normalize()
  _h.crossVectors(u, _v).normalize()
  _w.crossVectors(u, _h)
  _m.makeBasis(u, _h, _w).multiply(L.inv)
  b[j === 4 ? 'arm-left' : 'arm-right'].quaternion.setFromRotationMatrix(_m)
  siku(j, tekuk, b[j === 4 ? 'forearm-left' : 'forearm-right'].quaternion)
}
// arah lengan atas yang menggantung: menjauh dari badan `buka`, terayun ke depan `ayun` (radian)
const gantung = (s, buka, ayun, out = new THREE.Vector3()) =>
  out.set(s * Math.sin(buka), -Math.cos(buka) * Math.cos(ayun), Math.cos(buka) * Math.sin(ayun))

const putaran = (out, ...list) => {
  out.identity()
  for (const [axis, a] of list) out.multiply(_qa.setFromAxisAngle(axis, a))
  return out
}

// ------------------------------------------------------------------- berjalan & berlari
// Kurva sudut (derajat) satu siklus langkah, fase 0 = tumit kaki ini menjejak; kaki satunya setengah
// siklus kemudian. Dari data gaya berjalan manusia (paha terhadap garis tegak, lutut, sudut telapak),
// sedikit dibesarkan supaya terbaca dari kamera.
const JALAN = {
  paha: sudut([[0, 31], [0.1, 26], [0.3, 4], [0.5, -23], [0.56, -26], [0.62, -18], [0.75, 15], [0.87, 34], [0.95, 32]]),
  lutut: sudut([[0, 5], [0.13, 20], [0.38, 6], [0.48, 11], [0.6, 40], [0.71, 68], [0.82, 54], [0.92, 17], [0.98, 5]]),
  tapak: sudut([[0, 22], [0.08, 0], [0.25, 0], [0.42, -7], [0.5, -18], [0.56, -33], [0.62, -64], [0.71, -62], [0.8, -30], [0.9, 9], [0.96, 20]]),
  tumpu: 0.62, // bagian siklus kaki menapak
}
// berlari: menapak ±28% siklus, dua fase melayang; lutut menekuk dalam saat terayun (tumit ke bokong)
const LARI = {
  paha: sudut([[0, 38], [0.09, 18], [0.19, -10], [0.28, -36], [0.38, -26], [0.53, 16], [0.7, 56], [0.85, 50], [0.94, 42]]),
  lutut: sudut([[0, 18], [0.09, 38], [0.19, 27], [0.28, 22], [0.4, 78], [0.53, 115], [0.66, 102], [0.8, 62], [0.92, 27]]),
  tapak: sudut([[0, 12], [0.06, 0], [0.15, 0], [0.22, -18], [0.28, -72], [0.38, -88], [0.53, -95], [0.66, -62], [0.8, -12], [0.92, 14]]),
  tumpu: 0.28,
}

// pose berjalan / berlari pada fase p (0..1); pedang = tangan kanan memegang pedang (ayunan lebih kecil)
function langkah(G, lari) {
  return (b, p, { pedang = false } = {}) => {
    const c = Math.cos(TAU * p)
    const s = Math.sin(TAU * p)
    // panggul berputar (pinggul kiri maju saat tumit kiri menjejak), bergeser ke atas kaki tumpuan,
    // miring ke sisi kaki yang terayun; dada berputar berlawanan, kepala tetap ke depan
    const yaw = -(lari ? 9 : 7) * D * c
    const roll = -(lari ? 3 : 3) * D * s
    const lean = (lari ? 9 : 3) * D
    b.root.quaternion.setFromAxisAngle(Y, yaw)
    b.root.position.x = (lari ? 0.003 : 0.005) * s
    putaran(b.torso.quaternion, [X, lean], [Z, roll])
    putaran(b.spine.quaternion, [Y, -(lari ? 1.5 : 1.6) * yaw], [Z, -0.8 * roll], [X, (lari ? 2 : 1) * D])
    putaran(b.head.quaternion, [Y, (lari ? 0.5 : 0.6) * yaw], [X, -(lean + (lari ? 2 : 1) * D) * 0.8])
    for (const [side, ph] of [[1, p], [-1, p + 0.5]]) kaki(b, side, G.paha(ph), G.lutut(ph), G.tapak(ph), { buka: 2 * D, putar: -yaw })
    // lengan berayun berlawanan dengan kaki sisinya (sedikit terlambat), siku makin menekuk saat di depan
    for (const j of [4, 5]) {
      const sd = j === 4 ? 1 : -1
      const ph = j === 4 ? p : p + 0.5
      const f = 0.5 - 0.5 * Math.cos(TAU * (ph - (lari ? 0.02 : 0.03))) // 0 = paling belakang, 1 = paling depan
      const keep = pedang && j === 5
      let ayun
      let tekuk
      if (lari) {
        ayun = (-31 + 72 * f) * (keep ? 0.7 : 1) * D
        tekuk = (keep ? 50 + 22 * f : 74 + 24 * f) * D
      } else {
        ayun = (-13 + 34 * f) * (keep ? 0.55 : 1) * D
        tekuk = (keep ? 10 + 8 * f : 12 + 22 * f) * D
      }
      const u = gantung(sd, (lari ? 14 : 16) * D, ayun)
      lengan(b, j, u, tekuk, _a.set(-sd * (lari ? 0.45 : 0.25), lari ? 0.25 : 0, 1))
    }
  }
}

// diam: bernapas (2 × per siklus 6 detik), berat badan berpindah perlahan, kepala menoleh sedikit
function diam(b, p, { pedang = false } = {}) {
  const napas = Math.sin(TAU * 2 * p)
  const geser = Math.sin(TAU * p)
  b.root.position.x = 0.004 * geser
  putaran(b.torso.quaternion, [Z, -1.5 * D * geser])
  putaran(b.spine.quaternion, [Z, 1.2 * D * geser], [X, (-1 + 0.8 * napas) * D])
  putaran(b.head.quaternion, [Y, 5 * D * Math.sin(TAU * p + 1)], [X, -1 * D])
  for (const s of [1, -1]) {
    const lutut = (4 - 3 * s * geser) * D
    kaki(b, s, lutut * 0.5, lutut, 0, { buka: 2 * D })
  }
  for (const j of [4, 5]) {
    const sd = j === 4 ? 1 : -1
    const u = gantung(sd, (16 + napas) * D, (3 + Math.sin(TAU * p + j)) * D)
    lengan(b, j, u, (pedang && j === 5 ? 10 : 13) * D, _a.set(-sd * 0.25, 0, 1))
  }
}

// ------------------------------------------------------------------- berenang
// Gaya bebas, fase 0 = tangan kiri masuk ke air di depan bahu. Lengan (ruang dada: y = ke arah kepala,
// z = depan dada = ke dalam air, x = ke kiri): masuk → meluncur lurus → menangkap air (lengan bawah
// tegak, siku tinggi) → menarik di bawah dada → mendorong sampai paha → keluar air, siku diangkat
// tinggi → tangan terayun ke depan di atas air. Badan berguling ke sisi lengan yang menarik.
const AYUH = [
  // fase, arah lengan atas (kiri), tekuk siku (°), arah tekukan
  [0, [0.2, 0.92, 0.33], 22, [0, 0.2, 1]],
  [0.08, [0.15, 0.96, 0.22], 10, [0, 0, 1]],
  [0.17, [0.22, 0.88, 0.42], 55, [0, -0.1, 1]],
  [0.28, [0.5, 0.48, 0.72], 95, [-0.4, -0.3, 1]],
  [0.4, [0.45, -0.25, 0.86], 75, [-0.2, -1, 0.6]],
  [0.5, [0.35, -0.85, 0.4], 22, [0, -0.5, 1]],
  [0.58, [0.55, -0.7, -0.45], 60, [0, 0.2, 1]],
  [0.7, [0.92, -0.05, -0.38], 95, [0, 0.6, 1]],
  [0.82, [0.62, 0.62, -0.4], 75, [0, 0.5, 1]],
  [0.92, [0.35, 0.88, -0.15], 45, [0, 0.3, 1]],
]
const ayuh = {
  u: [0, 1, 2].map(k => kurva(AYUH.map(a => [a[0], a[1][k]]))),
  siku: sudut(AYUH.map(a => [a[0], a[2]])),
  arah: [0, 1, 2].map(k => kurva(AYUH.map(a => [a[0], a[3][k]]))),
}
const PUSAT_RENANG = new THREE.Vector3(0, 0.24, -0.02) // badan berputar di sekitar dada
function renang(b, p) {
  const guling = Math.sin(TAU * (p - 0.05))
  putaran(b.root.quaternion, [X, (82 + 2 * Math.sin(TAU * 2 * p)) * D], [Y, -24 * D * guling])
  b.root.position.copy(PUSAT_RENANG).sub(_v.copy(PUSAT_RENANG).applyQuaternion(b.root.quaternion))
  putaran(b.spine.quaternion, [Y, -16 * D * guling])
  // menoleh ke kanan mengambil napas saat bahu kanan terangkat (sekali tiap siklus)
  const napas = tonjol(p, 0.3, 0.16)
  putaran(b.head.quaternion, [Y, -62 * D * napas], [X, (-14 + 6 * napas) * D])
  for (const [s, off] of [[1, 0], [-1, 0.5]]) {
    const k = TAU * 3 * p + off * TAU // enam kepakan tiap siklus
    kaki(b, s, (4 + 13 * Math.sin(k)) * D, (16 - 13 * Math.sin(k - 0.5)) * D, 0, { buka: 3 * D, mata: (-45 - 8 * Math.sin(k + 0.6)) * D })
  }
  for (const j of [4, 5]) {
    const sd = j === 4 ? 1 : -1
    const q = j === 4 ? p : p + 0.5
    _u.set(sd * ayuh.u[0](q), ayuh.u[1](q), ayuh.u[2](q)).normalize()
    _a.set(sd * ayuh.arah[0](q), ayuh.arah[1](q), ayuh.arah[2](q))
    lengan(b, j, _u, ayuh.siku(q), _a)
  }
}
// mengapung tegak di tempat: kaki mengayuh bergantian, tangan mengayun mendatar (mengibas) di depan
function apung(b, p) {
  const t = TAU * p
  b.root.position.y = 0.006 * Math.sin(2 * t)
  putaran(b.torso.quaternion, [X, 9 * D])
  putaran(b.spine.quaternion, [X, -3 * D])
  putaran(b.head.quaternion, [X, -7 * D])
  for (const [s, off] of [[1, 0], [-1, Math.PI]]) {
    const k = t + off
    kaki(b, s, (40 + 18 * Math.sin(k)) * D, (72 + 25 * Math.sin(k + 1.3)) * D, 0, { buka: 14 * D, mata: (5 + 15 * Math.sin(k + 2)) * D })
  }
  const kibas = 0.25 + 0.65 * Math.sin(2 * t)
  for (const j of [4, 5]) {
    const sd = j === 4 ? 1 : -1
    _u.set(sd * 0.62, -0.5, 0.6).normalize()
    lengan(b, j, _u, (80 + 10 * Math.sin(2 * t + 0.8)) * D, _a.set(sd * Math.sin(kibas), -0.1, Math.cos(kibas)))
  }
}

// ------------------------------------------------------------------- perekam klip
// Telapak sepatu (garis bawah elipsoid sepatu, ruang tulang telapak): titik-titik untuk mencari bagian
// kaki yang paling rendah (tumit saat menjejak, ujung saat menolak)
const TELAPAK = []
for (let a = -90; a <= 90; a += 7.5) {
  const c = SEPATU.c.clone().sub(TITIK_SENDI[9])
  TELAPAK.push(new THREE.Vector3(0, c.y - SEPATU.r.y * Math.cos(a * D), c.z + SEPATU.r.z * Math.sin(a * D)))
}
const _inv = new THREE.Matrix4()
const _p = new THREE.Vector3()
// titik telapak terendah kaki `k` (ruang model)
function rendah(model, b, k) {
  let low = Infinity
  _m.multiplyMatrices(_inv, b[`foot-${k}`].matrixWorld)
  for (const t of TELAPAK) low = Math.min(low, _p.copy(t).applyMatrix4(_m).y)
  return low
}

// Rekam pose(b, fase) menjadi klip `name` sepanjang `durasi` detik (n bingkai, berulang mulus).
// tinggi: 'jejak' = kaki terendah tepat di tanah (berjalan, diam); 'layang' = berlari: kaki tumpuan
// di tanah, di antaranya melayang (lengkung, puncak `layang`); null = apa adanya (berenang).
// tumpu = bagian siklus kaki menapak (berjalan & berlari): klip mencatat panjang langkah alaminya
// (userData.langkah, satuan model per siklus) = jarak telapak tumpuan bergeser ke belakang / tumpu.
function rekam(model, b, name, n, durasi, pose, { tinggi = null, tumpu = 0, layang = 0 } = {}, opsi = {}) {
  const rest = Object.fromEntries(NAMA.map(k => [k, b[k].position.clone()]))
  const frames = []
  _inv.copy(model.matrixWorld).invert()
  for (let f = 0; f < n; f++) {
    const p = f / n
    for (const k of NAMA) {
      b[k].quaternion.identity()
      b[k].position.copy(rest[k])
    }
    pose(b, p, opsi)
    model.updateMatrixWorld(true)
    const low = tinggi ? { left: rendah(model, b, 'left'), right: rendah(model, b, 'right') } : null
    const ankle = _p.setFromMatrixPosition(_m.multiplyMatrices(_inv, b['foot-left'].matrixWorld)).z
    frames.push({ p, q: NAMA.map(k => b[k].quaternion.clone()), root: b.root.position.clone(), low, ankle })
  }
  if (tinggi === 'jejak') for (const fr of frames) fr.root.y -= Math.min(fr.low.left, fr.low.right)
  else if (tinggi === 'layang') {
    // menapak: kaki tumpuan di tanah; melayang: lengkung dari tolakan ke jejakan berikutnya
    const lift = fr => {
      const a = fr.p % 0.5
      const k = fr.p < 0.5 ? 'left' : 'right'
      return a < tumpu ? -fr.low[k] : null
    }
    const h = frames.map(lift)
    for (let f = 0; f < n; f++) {
      if (h[f] !== null) continue
      let a = f
      while (h[(a - 1 + n) % n] === null) a--
      let z = f
      while (h[(z + 1) % n] === null) z++
      const h0 = h[(a - 1 + n) % n]
      const h1 = h[(z + 1) % n]
      const s = (f - a + 1) / (z - a + 2)
      frames[f].air = h0 + (h1 - h0) * s + 4 * layang * s * (1 - s)
    }
    const raw = frames.map((fr, f) => h[f] ?? fr.air)
    // dihaluskan sedikit (tanpa sudut tajam saat menjejak / menolak)
    const sm = raw.map((v, f) => (raw[(f - 1 + n) % n] + 2 * v + raw[(f + 1) % n]) / 4)
    frames.forEach((fr, f) => {
      fr.root.y += sm[f]
    })
  }
  const times = []
  for (let f = 0; f <= n; f++) times.push((f / n) * durasi)
  const tracks = NAMA.map((k, i) => {
    const v = []
    for (let f = 0; f <= n; f++) v.push(...frames[f % n].q[i].toArray())
    return new THREE.QuaternionKeyframeTrack(`${k}.quaternion`, times, v)
  })
  const pos = []
  for (let f = 0; f <= n; f++) pos.push(...frames[f % n].root.toArray())
  tracks.push(new THREE.VectorKeyframeTrack('root.position', times, pos))
  for (const k of NAMA) {
    b[k].quaternion.identity()
    b[k].position.copy(rest[k])
  }
  const clip = new THREE.AnimationClip(name, durasi, tracks)
  if (tumpu) clip.userData = { langkah: (frames[0].ankle - frames[Math.round(tumpu * n)].ankle) / tumpu }
  return clip
}

// Klip-klip gerak untuk rangka bersendi `model` (sesudah artikulasi): 'jalan' & 'lari' (satu siklus
// = 1 detik; pemakai mengatur waktunya menurut fase langkah), 'diam' (6 detik), 'renang' (satu
// kayuhan kiri + kanan = 1 detik), 'apung' (1,6 detik). pedang = tangan kanan memegang pedang.
export function buatGerak(model, { pedang = false } = {}) {
  const b = Object.fromEntries(NAMA.map(k => [k, model.getObjectByName(k)]))
  model.updateMatrixWorld(true)
  const opsi = { pedang }
  return [
    rekam(model, b, 'jalan', 48, 1, langkah(JALAN, false), { tinggi: 'jejak', tumpu: JALAN.tumpu }, opsi),
    rekam(model, b, 'lari', 48, 1, langkah(LARI, true), { tinggi: 'layang', tumpu: LARI.tumpu, layang: 0.006 }, opsi),
    rekam(model, b, 'diam', 90, 6, diam, { tinggi: 'jejak' }, opsi),
    rekam(model, b, 'renang', 60, 1, renang, {}, opsi),
    rekam(model, b, 'apung', 48, 1.6, apung, {}, opsi),
  ]
}
