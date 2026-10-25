import * as THREE from 'three'
import { bodyData, add, ellipsoid, sphereFrom, capsule, lathe, cylinder, ring, band, clip, sheet, slab, sweep, merge, setDetail, v3 } from './bentuk.js'
import { uvWarna, paletteTexture } from './palet.js'

// Rupa karakter bergaya pixel art (pengganti badan kotak-kotak Kenney): kepala bulat ±⅓ tinggi badan
// dengan mata, rambut, helm berjambul, tudung, mahkota, topi; badan, lengan, dan kaki membulat; baju,
// rompi, tabar, zirah, jubah, ransel. Semua ditempel KAKU pada rangka Kenney 7 tulang yang sama
// (root, kaki kiri, kaki kanan, badan, lengan kiri, lengan kanan, kepala), jadi semua animasi Kenney
// dan gerak buatan yang sudah ada tetap dipakai apa adanya.
// Ruang bind = ruang model Kenney: menghadap +z, kiri = +x, tanah y = 0, lengan terentang ke samping.
// Lengan dibuat MENJUNTAI 25° dari garis bahu (DROOP): klip Kenney menurunkan lengan 45° saat diam,
// jadi lengan tampak turun ±70° (rapat ke badan) alih-alih mengangkang.

export { paletteTexture }
export const TULANG = { root: 0, kakiKiri: 1, kakiKanan: 2, badan: 3, lenganKiri: 4, lenganKanan: 5, kepala: 6 }
export const DROOP = (25 * Math.PI) / 180
const COS = Math.cos(DROOP)
const SIN = Math.sin(DROOP)
// titik asal tulang saat bind (rangka Kenney)
const BAHU = { 4: v3(0.0999, 0.28775, -0.01225), 5: v3(-0.0999, 0.28775, -0.01225) }
export const LEHER = v3(0, 0.34325, 0.00264)
// kepala: pusat tengkorak & jari-jarinya
export const KEPALA = v3(0, 0.445, 0)
const TENGKORAK = [0.096, 0.094, 0.09]
export const UBUN = KEPALA.y + TENGKORAK[1] // puncak kepala (tanpa rambut / helm)

// arah lengan saat bind (kiri ke +x, kanan ke −x, menjuntai DROOP)
export const armDir = j => v3(j === 4 ? COS : -COS, -SIN, 0)
const PANJANG_LENGAN = 0.165 // bahu → tengah genggaman
// tengah genggaman tangan di ruang tulang lengan (titik asal = bahu) — titik pegang senjata & barang
export const HAND = {
  4: armDir(4).multiplyScalar(PANJANG_LENGAN).add(v3(0, 0, 0.004)),
  5: armDir(5).multiplyScalar(PANJANG_LENGAN).add(v3(0, 0, 0.004)),
}
// ... dan di ruang model saat bind
export const handBind = j => BAHU[j].clone().add(HAND[j])
// putar arah di ruang tulang lengan supaya mengikuti juntaian (mis. arah bilah pedang pemain)
export const droopDir = (j, d) => d.clone().applyAxisAngle(v3(0, 0, 1), j === 5 ? DROOP : -DROOP)

// cat: nama warna palet, atau { uv, slot } (elf: warna per orang diatur shader lewat slot)
const paint = c => (typeof c === 'string' ? [uvWarna(c), 0] : [c.uv, c.slot])
function put(d, geo, bone, c) {
  const [uv, slot] = paint(c)
  add(d, geo, bone, uv, slot)
}
const along = (j, t) => BAHU[j].clone().addScaledVector(armDir(j), t)

// ------------------------------------------------------------------- kepala
// muka: tengkorak (sedikit menyempit ke dagu), mata, hidung kecil, telinga
function kepala(d, { kulit = 'kulit', telinga = 'manusia', alis = null, marah = false, rahang = 1, besar = 1, tertutup = false }) {
  const r = TENGKORAK.map(x => x * besar)
  // kepala berhelm: puncak tengkorak (tertutup helm) tidak dibuat
  const g = sphereFrom(11, tertutup ? 6 : 8, tertutup ? 0.75 : 0)
    .scale(r[0] * rahang, r[1], r[2]).translate(KEPALA.x, KEPALA.y, KEPALA.z)
  // dagu menyempit (normal bola dibiarkan: perbedaannya tak terlihat dengan cahaya 4 tingkat)
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) {
    const t = Math.min(1, Math.max(0, (KEPALA.y - p.getY(i)) / r[1]))
    p.setX(i, p.getX(i) * (1 - 0.2 * t * t))
  }
  put(d, g, 6, kulit)
  const zAt = (x, y) => KEPALA.z + r[2] * Math.sqrt(Math.max(0, 1 - (x / r[0]) ** 2 - ((y - KEPALA.y) / r[1]) ** 2))
  // mata: lonjong gelap, sedikit timbul dari muka
  for (const s of [-1, 1]) {
    const x = s * 0.034 * besar
    const y = KEPALA.y - 0.008
    put(d, ellipsoid([x, y, zAt(x, y) - 0.001], [0.0115, 0.016, 0.007], 5, 3), 6, 'mata')
    if (alis) {
      const ay = y + 0.03
      const g2 = ellipsoid([x, ay, zAt(x, ay) + 0.001], [0.017, 0.0055, 0.006], 5, 3)
      if (marah) {
        // alis menukik ke tengah
        const q = g2.attributes.position
        for (let i = 0; i < q.count; i++) q.setY(i, q.getY(i) - s * (q.getX(i) - x) * 0.45)
      }
      put(d, g2, 6, alis)
    }
  }
  // hidung
  put(d, ellipsoid([0, KEPALA.y - 0.03, zAt(0, KEPALA.y - 0.03) + 0.003], [0.011, 0.012, 0.01], 5, 3), 6, kulit)
  // telinga
  if (tertutup) return zAt
  if (telinga === 'manusia')
    for (const s of [-1, 1]) put(d, ellipsoid([s * r[0] * 0.97, KEPALA.y - 0.008, -0.006], [0.013, 0.021, 0.017], 5, 4), 6, kulit)
  else if (telinga === 'elf' || telinga === 'orc')
    for (const s of [-1, 1]) {
      const a = v3(s * r[0] * 0.9, KEPALA.y - 0.004, -0.01)
      const b = telinga === 'elf' ? v3(s * (r[0] + 0.05), KEPALA.y + 0.07, -0.06) : v3(s * (r[0] + 0.055), KEPALA.y + 0.02, -0.02)
      put(d, capsule(a, b, 0.019, 0.003, 5, 1), 6, kulit)
    }
  return zAt
}

// rambut: tudung rambut yang dipotong miring (dahi → tengkuk) + hiasan sesuai gaya
const _n = new THREE.Vector3()
function capHair(depan, belakang, tebal = 1) {
  // bidang potong lewat titik dahi (0, depan, 0,07) dan tengkuk (0, belakang, −0,1)
  const F = v3(0, depan, 0.07)
  const B = v3(0, belakang, -0.1)
  _n.set(0, F.z - B.z, -(F.y - B.y)).normalize()
  if (_n.y < 0) _n.negate()
  const g = ellipsoid([KEPALA.x, KEPALA.y + 0.008, KEPALA.z - 0.006], [0.104 * tebal, 0.1 * tebal, 0.099 * tebal], 11, 7)
  return clip(g, F, _n)
}
function rambut(d, gaya, warna) {
  const c = warna
  if (gaya === 'botak') return
  if (gaya === 'panjang' || gaya === 'panjangPirang') {
    put(d, capHair(0.468, 0.34), 6, c)
    // terurai di punggung kepala sampai bahu (melebar ke bawah)
    put(d, lathe([[0.075, 0.27], [0.098, 0.33], [0.1, 0.4], [0.095, 0.47]], 10, 1, 0.55, [Math.PI * 0.62, Math.PI * 0.76]).translate(0, 0, -0.035), 6, c)
    // anak rambut di kedua sisi muka
    for (const s of [-1, 1]) put(d, ellipsoid([s * 0.088, KEPALA.y - 0.03, 0.03], [0.022, 0.06, 0.03], 6, 5), 6, c)
    // poni menyamping
    put(d, ellipsoid([0.03, KEPALA.y + 0.055, 0.07], [0.06, 0.022, 0.03], 8, 5).rotateZ(0), 6, c)
    return
  }
  if (gaya === 'sanggul') {
    put(d, capHair(0.472, 0.38), 6, c)
    put(d, ellipsoid([0, KEPALA.y + 0.06, -0.085], [0.045, 0.042, 0.04], 8, 6), 6, c)
    return
  }
  if (gaya === 'kuncir') {
    put(d, capHair(0.47, 0.37), 6, c)
    put(d, sweep([v3(0, KEPALA.y + 0.04, -0.09), v3(0, KEPALA.y + 0.01, -0.125), v3(0, KEPALA.y - 0.05, -0.135), v3(0, KEPALA.y - 0.11, -0.12)], [0.026, 0.03, 0.022, 0.006], 6, 1), 6, c)
    return
  }
  // pendek / acak / jambul: potongan pendek + poni
  put(d, capHair(0.462, 0.385), 6, c)
  const poni = gaya === 'acak'
    ? [[-0.05, 0.065, 0.072, -0.5], [0.0, 0.07, 0.08, 0.1], [0.05, 0.062, 0.072, 0.6], [-0.085, 0.03, 0.04, -1.1], [0.085, 0.03, 0.04, 1.1]]
    : [[-0.04, 0.062, 0.072, -0.35], [0.015, 0.066, 0.078, 0.15], [0.058, 0.055, 0.066, 0.7]]
  for (const [x, y, z, a] of poni) put(d, ellipsoid([0, 0, 0], [0.03, 0.02, 0.022], 5, 4).rotateZ(a * 0.5).translate(x, KEPALA.y + y, z), 6, c)
  if (gaya === 'jambul') put(d, ellipsoid([0, KEPALA.y + 0.1, 0.02], [0.03, 0.03, 0.06], 5, 4), 6, c)
}

function jenggot(d, warna, gaya = 'penuh') {
  const c = warna
  if (gaya === 'penuh') {
    put(d, ellipsoid([0, KEPALA.y - 0.06, 0.05], [0.07, 0.05, 0.045], 8, 6), 6, c)
    put(d, ellipsoid([0, KEPALA.y - 0.035, 0.083], [0.035, 0.012, 0.012], 6, 4), 6, c)
  }
  if (gaya === 'kumis' || gaya === 'pedagang') {
    for (const s of [-1, 1]) put(d, ellipsoid([0, 0, 0], [0.028, 0.011, 0.012], 5, 4).rotateZ(s * 0.35).translate(s * 0.022, KEPALA.y - 0.038, 0.088), 6, c)
    if (gaya === 'pedagang') put(d, ellipsoid([0, KEPALA.y - 0.07, 0.055], [0.055, 0.04, 0.035], 8, 5), 6, c)
  }
}

// ------------------------------------------------------------------- badan, lengan, kaki
const BADAN_Z = -0.02
// badan: panggul (warna celana) + dada (warna baju) + leher; perut = buncit, lebar = bahu/badan
function badan(d, { baju, celana, kulit = 'kulit', perut = 0, lebar = 1, dalam = 0.72, atas = true }) {
  put(d, lathe([[0, 0.142], [0.062, 0.145], [0.08, 0.158], [0.084, 0.182], [0.082, 0.21]], 10, lebar, dalam).translate(0, 0, BADAN_Z), 3, celana)
  // dada (tak perlu bila seluruhnya tertutup zirah)
  // perut buncit = bagian tengah dada lebih lebar & lebih maju
  const p = perut * 0.016
  if (atas) put(d, lathe([[0.081, 0.205], [0.08 + p, 0.222], [0.088 + p * 1.2, 0.256], [0.097 + p * 0.5, 0.285], [0.092, 0.312], [0.066, 0.331], [0.03, 0.341], [0, 0.343]], 10, lebar, dalam + perut * 0.12).translate(0, 0, BADAN_Z + perut * 0.008), 3, baju)
  put(d, cylinder(0, 0.31, -0.008, 0.03, 0.027, 0.065, 7, true), 3, kulit)
}
function sabuk(d, warna = 'samakTua', gesper = 'emas', y = 0.205, lebar = 1) {
  put(d, band(0, y, BADAN_Z, 0.086 * lebar, 0.022, 10, 0.75), 3, warna)
  if (gesper) put(d, ellipsoid([0, y, BADAN_Z + 0.062], [0.016, 0.014, 0.008], 5, 3), 3, gesper)
}
// lengan: lengan atas + bawah + tangan (sarung tangan / kulit) + manset
function lengan(d, { baju, tangan = 'kulit', tebal = 1, manset = null, pendek = false }) {
  for (const j of [4, 5]) {
    const a = along(j, 0)
    const e = along(j, 0.085)
    const w = along(j, 0.142)
    put(d, capsule(a, e, 0.031 * tebal, 0.027 * tebal, 6, 1), j, baju)
    put(d, capsule(e, w, 0.027 * tebal, 0.024 * tebal, 6, 1), j, pendek ? tangan : baju)
    put(d, ellipsoid(handBind(j), [0.026 * tebal, 0.027 * tebal, 0.025 * tebal], 6, 4), j, tangan)
    if (manset) put(d, cylinder(0, 0, 0, 0.03 * tebal, 0.031 * tebal, 0.024, 6, true).rotateZ(j === 4 ? -Math.PI / 2 - DROOP : Math.PI / 2 + DROOP).translate(...along(j, 0.118).toArray()), j, manset)
  }
}
// kaki: celana + sepatu bot (ujung ke depan) + lipatan bot
function kaki(d, { celana, sepatu = 'samak', tebal = 1, bot = true, pelindung = null }) {
  for (const j of [1, 2]) {
    const s = j === 1 ? 1 : -1
    const x = s * 0.068
    put(d, capsule(v3(x, 0.17, -0.02), v3(x * 0.98, 0.06, -0.016), 0.043 * tebal, 0.036 * tebal, 6, 1), j, celana)
    const boot = ellipsoid([x * 0.98, 0.034, 0.008], [0.04 * tebal, 0.036, 0.062], 7, 5)
    clip(boot, v3(0, 0, 0), v3(0, 1, 0))
    put(d, boot, j, sepatu)
    if (bot) put(d, cylinder(x * 0.98, 0.045, -0.014, 0.04 * tebal, 0.042 * tebal, 0.04, 7, true), j, sepatu)
    if (pelindung) put(d, cylinder(x * 0.98, 0.058, -0.012, 0.043 * tebal, 0.045 * tebal, 0.06, 7, true), j, pelindung)
  }
}

// ------------------------------------------------------------------- pakaian
// rompi terbuka di depan
function rompi(d, warna, lebar = 1) {
  put(d, lathe([[0.087, 0.2], [0.09, 0.246], [0.104, 0.29], [0.094, 0.318], [0.07, 0.332]], 9, lebar, 0.75, [0.55, Math.PI * 2 - 1.1]).translate(0, 0, BADAN_Z), 3, warna)
}
// rok / tunik melebar di bawah pinggang (kaki bergerak di dalamnya)
function rok(d, warna, bawah = 0.1, lebar = 1) {
  put(d, lathe([[0.112 * lebar, bawah], [0.1 * lebar, bawah + 0.04], [0.09 * lebar, 0.17], [0.085 * lebar, 0.215]], 12, 1, 0.8).translate(0, 0, BADAN_Z), 3, warna)
}
// zirah dada (pelat logam) + lis
function zirahDada(d, warna, lis = null, lebar = 1) {
  put(d, lathe([[0.088, 0.19], [0.09, 0.235], [0.103, 0.274], [0.105, 0.3], [0.088, 0.325], [0.045, 0.34], [0, 0.343]], 10, lebar, 0.78).translate(0, 0, BADAN_Z), 3, warna)
  if (lis) put(d, band(0, 0.316, BADAN_Z, 0.098 * lebar, 0.012, 10, 0.79), 3, lis)
}
// tabar: kain bergambar di depan & belakang zirah, menjuntai sampai paha
function tabar(d, warna, lis = null) {
  for (const s of [1, -1]) {
    const g = sheet((u, v) => v3((u - 0.5) * (0.105 + 0.03 * v), 0.3 - 0.2 * v, BADAN_Z + s * (0.085 + 0.012 * v - 0.012 * (u - 0.5) ** 2 * 4)), 3, 3, 0.004)
    put(d, g, 3, warna)
  }
  if (lis) put(d, band(0, 0.205, BADAN_Z, 0.092, 0.018, 10, 0.8), 3, lis)
}
// pelindung bahu: kubah di pangkal lengan
function bahu(d, warna, { besar = 1, duri = null, lis = null } = {}) {
  for (const j of [4, 5]) {
    const c = along(j, 0.012).add(v3(0, 0.014, 0))
    const g = ellipsoid(c, [0.052 * besar, 0.042 * besar, 0.054 * besar], 7, 5)
    clip(g, c.clone().add(v3(0, -0.012 * besar, 0)), armDir(j).clone().multiplyScalar(-0.3).add(v3(0, 1, 0)))
    put(d, g, j, warna)
    if (lis) put(d, band(c.x, c.y - 0.012, c.z, 0.05 * besar, 0.01, 8, 1.05), j, lis)
    if (duri)
      for (const [ox, oz] of [[0.005, 0.02], [0.015, -0.02], [0.028, 0.0]]) {
        const s = j === 4 ? 1 : -1
        const b = c.clone().add(v3(s * ox, 0.03 * besar, oz))
        put(d, capsule(b, b.clone().add(v3(s * 0.012, 0.045, 0)), 0.012, 0.001, 5, 1), j, duri)
      }
  }
}
// jubah di punggung: dari bahu sampai dekat tanah, melebar & sedikit mengembang ke belakang
function jubah(d, warna, { panjang = 1, lebar = 1, bulu = null } = {}) {
  const top = 0.325
  const len = 0.255 * panjang
  const g = sheet((u, v) => v3((u - 0.5) * 0.19 * lebar * (1 + 0.65 * v), top - len * v, BADAN_Z - 0.068 - 0.06 * v - 0.025 * Math.sin(Math.PI * u) * (0.5 + v)), 4, 4, 0.006)
  put(d, g, 3, warna)
  if (bulu) {
    // kerah bulu melingkar + lis bulu di ujung bawah
    put(d, ring(0, 0.322, BADAN_Z - 0.008, 0.083, 0.026, 12, 0.85, 5), 3, bulu)
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2 + 0.3
      put(d, ellipsoid([Math.sin(a) * 0.085, 0.33, BADAN_Z - 0.008 + Math.cos(a) * 0.072], [0.008, 0.01, 0.008], 4, 3), 3, 'buluBintik')
    }
    const b = sheet((u, v) => v3((u - 0.5) * 0.19 * lebar * 1.65 * (1 + 0.04 * v), top - len + 0.03 - 0.03 * v, BADAN_Z - 0.128 - 0.025 * Math.sin(Math.PI * u) * 1.5 - 0.004), 4, 1, 0.01)
    put(d, b, 3, bulu)
  }
}
// syal merah di leher + ujung berkibar di belakang
function syal(d, warna) {
  put(d, ring(0, 0.322, BADAN_Z - 0.004, 0.064, 0.02, 12, 0.85, 5), 3, warna)
  put(d, sheet((u, v) => v3(-0.03 + 0.03 * u + 0.02 * v, 0.315 - 0.11 * v, BADAN_Z - 0.07 - 0.03 * v), 1, 2, 0.006), 3, warna)
}
// ransel pedagang: tas besar + gulungan tikar + kantong samping + panci
function ransel(d) {
  const z = BADAN_Z - 0.115
  put(d, ellipsoid([0, 0.255, z], [0.088, 0.1, 0.058], 10, 7), 3, 'samak')
  put(d, ellipsoid([0, 0.29, z - 0.045], [0.06, 0.04, 0.02], 8, 5), 3, 'samakTua')
  put(d, capsule(v3(-0.085, 0.345, z - 0.01), v3(0.085, 0.345, z - 0.01), 0.03, 0.03, 7, 2), 3, 'jerami')
  for (const s of [-1, 1]) put(d, ellipsoid([s * 0.095, 0.2, z + 0.012], [0.03, 0.042, 0.035], 7, 5), 3, 'samakMuda')
  put(d, cylinder(0.06, 0.13, z - 0.02, 0.03, 0.03, 0.035, 8), 3, 'bajaTua')
  // tali ransel di bahu
  for (const s of [-1, 1]) put(d, capsule(v3(s * 0.058, 0.335, BADAN_Z + 0.02), v3(s * 0.062, 0.21, BADAN_Z + 0.066), 0.008, 0.008, 4, 1), 3, 'samakTua')
}
// tabung panah di punggung (miring) + bulu anak panah
function tabungPanah(d, { tabung = 'samakTua', lis = 'emasTua', bulu = ['hijauDaun', 'putihKain'], n = 4 } = {}) {
  const a = v3(-0.05, 0.15, BADAN_Z - 0.085)
  const b = v3(0.06, 0.37, BADAN_Z - 0.105)
  put(d, capsule(a, b, 0.032, 0.035, 7, 1), 3, tabung)
  put(d, band(b.x - 0.004, b.y - 0.012, b.z, 0.037, 0.014, 8, 1), 3, lis)
  for (let k = 0; k < n; k++) {
    const o = v3((k % 2) * 0.026 - 0.013, 0, Math.floor(k / 2) * 0.022 - 0.011)
    const p = b.clone().add(o)
    put(d, capsule(p, p.clone().add(v3(0.022, 0.07, -0.006)), 0.012, 0.004, 4, 1), 3, bulu[k % 2])
  }
}
// celemek kulit di depan
function celemek(d, warna = 'samakMuda') {
  put(d, sheet((u, v) => v3((u - 0.5) * 0.12, 0.29 - 0.2 * v, BADAN_Z + 0.072 + 0.016 * v - 0.03 * (u - 0.5) ** 2), 2, 2, 0.004), 3, warna)
}

// ------------------------------------------------------------------- penutup kepala
// helm prajurit: kubah baja + lingkar + pelindung hidung & pipi + jambul warna pasukan
function helm(d, { warna = 'bajaSedang', lis = 'bajaTua', jambul = null, hidung = true, besar = 1 }) {
  const F = v3(0, 0.458, 0.075)
  const B = v3(0, 0.39, -0.1)
  _n.set(0, F.z - B.z, -(F.y - B.y)).normalize()
  if (_n.y < 0) _n.negate()
  const dome = clip(ellipsoid([0, KEPALA.y + 0.012, -0.004], [0.11 * besar, 0.106 * besar, 0.105 * besar], 10, 7), F, _n)
  put(d, dome, 6, warna)
  const tilt = Math.atan2(F.y - B.y, F.z - B.z)
  put(d, new THREE.CylinderGeometry(0.112 * besar, 0.112 * besar, 0.018, 11, 1, true).scale(1, 1, 1.0).rotateX(-tilt).translate(0, (F.y + B.y) / 2 + 0.002, (F.z + B.z) / 2 + 0.012), 6, lis)
  if (hidung) put(d, capsule(v3(0, 0.47, 0.104), v3(0, 0.418, 0.1), 0.008, 0.007, 4, 1), 6, lis)
  for (const s of [-1, 1]) put(d, ellipsoid([s * 0.098, 0.418, 0.032], [0.014, 0.036, 0.032], 5, 3), 6, warna)
  if (jambul) {
    // jambul melengkung dari puncak ke tengkuk, tebal di tengah
    const top = KEPALA.y + 0.105
    const pts = [v3(0, top - 0.005, 0.05), v3(0, top + 0.045, 0.0), v3(0, top + 0.04, -0.07), v3(0, top - 0.02, -0.14), v3(0, top - 0.1, -0.18)]
    put(d, sweep(pts, [0.018, 0.042, 0.045, 0.034, 0.01], 6, 0.75), 6, jambul)
  }
}
// tudung pemanah: cangkang terbuka di muka + ujung lancip di belakang + jubah bahu
function tudung(d, warna, dalam = 'hijauTua') {
  const c = [0, KEPALA.y + 0.012, -0.012]
  const open = 0.78
  const g = new THREE.SphereGeometry(1, 12, 8, Math.PI / 2 + open, Math.PI * 2 - open * 2, 0, Math.PI * 0.8).scale(0.118, 0.118, 0.116).translate(...c)
  put(d, g, 6, warna)
  // sisi dalam (gelap) supaya tepi bukaan tidak tembus pandang
  const inner = new THREE.SphereGeometry(1, 12, 8, Math.PI / 2 + open, Math.PI * 2 - open * 2, 0, Math.PI * 0.8).scale(0.111, 0.111, 0.109).translate(...c)
  const idx = inner.index
  for (let i = 0; i < idx.count; i += 3) {
    const t = idx.getX(i + 1)
    idx.setX(i + 1, idx.getX(i + 2))
    idx.setX(i + 2, t)
  }
  const nn = inner.attributes.normal
  for (let i = 0; i < nn.count; i++) nn.setXYZ(i, -nn.getX(i), -nn.getY(i), -nn.getZ(i))
  put(d, inner, 6, dalam)
  put(d, sweep([v3(0, KEPALA.y + 0.085, -0.06), v3(0, KEPALA.y + 0.06, -0.115), v3(0, KEPALA.y, -0.15), v3(0, KEPALA.y - 0.07, -0.16)], [0.05, 0.04, 0.022, 0.004], 6, 1), 6, warna)
  // jubah bahu (bagian badan)
  put(d, lathe([[0.135, 0.255], [0.128, 0.275], [0.105, 0.305], [0.07, 0.33], [0.05, 0.338]], 12, 1, 0.82).translate(0, 0, BADAN_Z), 3, warna)
}
// mahkota emas: lingkar + 5 runcing + permata
function mahkota(d) {
  const y = UBUN - 0.03
  put(d, cylinder(0, y, -0.004, 0.074, 0.08, 0.034, 12, true), 6, 'emas')
  put(d, cylinder(0, y + 0.002, -0.004, 0.07, 0.076, 0.03, 12, true).scale(0.97, 1, 0.97), 6, 'emasTua')
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2
    const x = Math.sin(a) * 0.077
    const z = -0.004 + Math.cos(a) * 0.077
    put(d, capsule(v3(x, y + 0.03, z), v3(x * 1.05, y + 0.07, z * 1.05), 0.014, 0.002, 4, 1), 6, 'emas')
    put(d, ellipsoid([x * 1.05, y + 0.074, z * 1.05], [0.009, 0.009, 0.009], 5, 4), 6, 'emas')
  }
  put(d, ellipsoid([0, y + 0.017, 0.078], [0.012, 0.012, 0.008], 6, 4), 6, 'permataMerah')
  for (const s of [-1, 1]) put(d, ellipsoid([s * 0.054, y + 0.017, 0.054], [0.009, 0.009, 0.007], 5, 4), 6, 'permataBiru')
}
// topi lebar pedagang
function topi(d, warna = 'samak', pita = 'samakTua') {
  const y = UBUN - 0.03
  put(d, cylinder(0, y, -0.006, 0.155, 0.15, 0.012, 16).scale(1, 1, 0.92), 6, warna)
  put(d, lathe([[0.084, y], [0.082, y + 0.04], [0.075, y + 0.075], [0.04, y + 0.088], [0, y + 0.09]], 12, 1, 0.92).translate(0, 0, -0.006), 6, warna)
  put(d, ring(0, y + 0.02, -0.006, 0.084, 0.008, 12, 0.92, 3), 6, pita)
  put(d, capsule(v3(0.06, y + 0.035, -0.07), v3(0.11, y + 0.11, -0.12), 0.012, 0.004, 4, 1), 6, 'merah')
}
// ikat kepala / bandana
function ikatKepala(d, warna) {
  put(d, ring(0, KEPALA.y + 0.045, -0.004, 0.1, 0.012, 14, 0.96, 4), 6, warna)
}
// kerudung kain (perempuan desa)
function kerudung(d, warna) {
  const F = v3(0, 0.47, 0.08)
  const B = v3(0, 0.33, -0.1)
  _n.set(0, F.z - B.z, -(F.y - B.y)).normalize()
  if (_n.y < 0) _n.negate()
  put(d, clip(ellipsoid([0, KEPALA.y + 0.006, -0.01], [0.108, 0.104, 0.104], 12, 9), F, _n), 6, warna)
}

// ------------------------------------------------------------------- senjata & barang (geometri)
// Dalam "ruang barang": genggaman di titik asal, sumbu utama +y, depan +z. Sistem pemakai
// menempatkannya di tangan pada pose acuannya.
export function pedangGeo() {
  const blade = slab([[-0.016, 0], [0.016, 0], [0.013, 0.26], [0, 0.3], [-0.013, 0.26]], 0.008)
  return [
    [blade.translate(0, 0.035, 0), 'baja'],
    [capsule(v3(-0.05, 0.03, 0), v3(0.05, 0.03, 0), 0.01, 0.01, 5, 1), 'emas'],
    [cylinder(0, -0.04, 0, 0.011, 0.011, 0.07, 6), 'samakTua'],
    [ellipsoid([0, -0.045, 0], [0.015, 0.015, 0.015], 6, 4), 'emas'],
  ]
}
export function tombakGeo(panjang = 1.25, bawah = 0.42) {
  return [
    [cylinder(0, -bawah, 0, 0.014, 0.014, panjang, 6), 'kayu'],
    [slab([[-0.03, 0], [0.03, 0], [0.012, 0.1], [0, 0.17], [-0.012, 0.1]], 0.012).translate(0, panjang - bawah, 0), 'baja'],
    [cylinder(0, panjang - bawah - 0.03, 0, 0.022, 0.02, 0.035, 6), 'emas'],
  ]
}
// perisai layang (kite) menghadap +z dengan lambang emas
export function perisaiGeo(warna = 'biru', besar = 1) {
  const s = besar
  const outline = [[0, -0.27], [0.12, -0.08], [0.15, 0.08], [0.13, 0.15], [0, 0.17], [-0.13, 0.15], [-0.15, 0.08], [-0.12, -0.08]].map(([x, y]) => [x * s, y * s])
  const face = slab(outline, 0.028 * s)
  const rim = slab(outline.map(([x, y]) => [x * 1.08, y * 1.06 - 0.004]), 0.02 * s).translate(0, 0, -0.006)
  const cross = [
    slab([[-0.016, -0.17], [0.016, -0.17], [0.016, 0.12], [-0.016, 0.12]].map(([x, y]) => [x * s, y * s]), 0.01).translate(0, 0, 0.018 * s),
    slab([[-0.09, 0.02], [0.09, 0.02], [0.09, 0.05], [-0.09, 0.05]].map(([x, y]) => [x * s, y * s]), 0.01).translate(0, 0, 0.018 * s),
  ]
  return [[rim, 'emasTua'], [face, warna], [merge(cross), 'emas'], [ellipsoid([0, 0.035 * s, 0.024 * s], [0.026 * s, 0.026 * s, 0.01], 6, 4), 'emas']]
}
// busur panjang (melengkung ke depan) + tali
export function busurGeo() {
  const pts = []
  for (let i = 0; i <= 8; i++) {
    const t = i / 8 - 0.5
    pts.push(v3(0, t * 0.62, 0.06 - 0.24 * t * t))
  }
  const parts = []
  for (let i = 0; i < 8; i++) parts.push(capsule(pts[i], pts[i + 1], 0.011, 0.011, 5, 1))
  return [[merge(parts), 'kayuTua'], [capsule(pts[0], pts[8], 0.003, 0.003, 4, 1), 'putihKain'], [cylinder(0, -0.035, 0.035, 0.014, 0.014, 0.07, 6), 'samak']]
}
// tongkat kerajaan: batang emas + bola permata
export function tongkatGeo() {
  return [
    [cylinder(0, -0.2, 0, 0.011, 0.011, 0.52, 6), 'emas'],
    [ellipsoid([0, 0.335, 0], [0.032, 0.032, 0.032], 8, 6), 'emasTua'],
    [ellipsoid([0, 0.37, 0], [0.022, 0.03, 0.022], 6, 5), 'permataBiru'],
  ]
}
// kapak / golok orc
export function golokGeo() {
  return [
    [cylinder(0, -0.08, 0, 0.014, 0.014, 0.3, 6), 'samakTua'],
    [slab([[0, 0], [0.11, -0.02], [0.14, 0.1], [0.06, 0.13], [0, 0.1]], 0.014).translate(0, 0.12, 0), 'bajaTua'],
  ]
}

// kuda tunggangan (pengganti kuda Kenney): 8 bagian kaku dalam ruang model penunggang (kuda
// menghadap +z, punggung ±0,56 di atas tanah), urutan: badan, kaki belakang kiri & kanan, kaki depan
// kiri & kanan, leher, kepala, ekor. warna = bulu badan, surai = surai & ekor.
export function kudaGeo(warna = 'samak', surai = 'rambutHitam', kuku = 'hitam') {
  const badan = [
    [ellipsoid([0, 0.42, 0.0], [0.15, 0.15, 0.3], 10, 7), warna],
    [ellipsoid([0, 0.43, 0.2], [0.14, 0.15, 0.15], 8, 6), warna],
    [ellipsoid([0, 0.45, -0.2], [0.15, 0.15, 0.15], 8, 6), warna],
  ]
  const kaki = (x, z, depan) => {
    const top = v3(x * 0.95, depan ? 0.37 : 0.4, z)
    const mid = v3(x, 0.17, z + (depan ? 0.01 : -0.02))
    const list = [
      [capsule(top, mid, depan ? 0.05 : 0.06, 0.034, 6, 1), warna],
      [capsule(mid, v3(x, 0.05, z), 0.032, 0.03, 5, 1), warna],
      [cylinder(x, 0, z + 0.005, 0.038, 0.034, 0.05, 6), kuku],
    ]
    if (!depan) list.push([ellipsoid([x * 0.9, 0.38, z + 0.03], [0.06, 0.1, 0.09], 6, 5), warna])
    return list
  }
  const leher = [
    [capsule(v3(0, 0.46, 0.25), v3(0, 0.74, 0.34), 0.085, 0.06, 7, 1), warna],
    [sweep([v3(0, 0.56, 0.21), v3(0, 0.68, 0.25), v3(0, 0.79, 0.3), v3(0, 0.84, 0.33)], [0.02, 0.03, 0.028, 0.012], 5, 0.7), surai],
  ]
  const kepala = [
    [capsule(v3(0, 0.78, 0.32), v3(0, 0.67, 0.53), 0.06, 0.045, 7, 2), warna],
    [ellipsoid([0, 0.655, 0.55], [0.045, 0.04, 0.04], 6, 4), warna],
    ...[-1, 1].map(s => [capsule(v3(s * 0.03, 0.82, 0.31), v3(s * 0.04, 0.88, 0.29), 0.014, 0.004, 4, 1), warna]),
    ...[-1, 1].map(s => [ellipsoid([s * 0.052, 0.77, 0.4], [0.008, 0.012, 0.01], 4, 3), 'mata']),
  ]
  const ekor = [[sweep([v3(0, 0.5, -0.29), v3(0, 0.44, -0.37), v3(0, 0.33, -0.42), v3(0, 0.21, -0.42)], [0.03, 0.04, 0.035, 0.012], 5, 0.8), surai]]
  return [badan, kaki(0.094, -0.2375, false), kaki(-0.094, -0.2375, false), kaki(0.094, 0.2375, true), kaki(-0.094, 0.2375, true), leher, kepala, ekor].map(geoWarna)
}
// pelana + kain di punggung kuda (ruang model penunggang)
export function pelanaGeo(kain = 'merah') {
  return geoWarna([
    [ellipsoid([0, 0.565, -0.01], [0.12, 0.03, 0.15], 8, 5), 'samakTua'],
    // kain tersampir melingkari punggung, menjuntai di kedua sisi
    [sheet((u, v) => {
      const a = (u - 0.5) * Math.PI * 0.9
      return v3(Math.sin(a) * 0.165, 0.42 + Math.cos(a) * 0.158, -0.14 + 0.26 * v)
    }, 4, 2, 0.004), kain],
  ])
}

// ubah daftar [geometri, warna] menjadi geometri (dengan uv palet) dalam ruang barang
export function geoWarna(list) {
  const parts = list.map(([g, w]) => {
    const n = g.index ? g.toNonIndexed() : g.clone()
    const uv = uvWarna(w)
    const a = new Float32Array(n.attributes.position.count * 2)
    for (let i = 0; i < a.length; i += 2) {
      a[i] = uv[0]
      a[i + 1] = uv[1]
    }
    n.setAttribute('uv', new THREE.BufferAttribute(a, 2))
    return n
  })
  const P = []
  const N = []
  const U = []
  for (const g of parts) {
    P.push(...g.attributes.position.array)
    N.push(...g.attributes.normal.array)
    U.push(...g.attributes.uv.array)
  }
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
  out.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3))
  out.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2))
  return out
}

// ------------------------------------------------------------------- jenis-jenis karakter
const pick = (list, k) => list[((k % list.length) + list.length) % list.length]

// rakyat jelata: k = nomor varian (pria genap, wanita ganjil)
function rakyat(k) {
  const d = bodyData()
  const wanita = k % 2 === 1
  const kulit = pick(['kulit', 'kulitSawo', 'kulitSawo', 'kulitCokelat', 'kulit'], k >> 1)
  const rambutW = pick(['rambutCokelat', 'rambutHitam', 'rambutCokelatTua', 'rambutJahe', 'rambutHitam', 'rambutPirang'], k)
  const baju = pick(['krem', 'putihKain', 'krem', 'biruMuda', 'kelabuKain', 'krem'], k + 1)
  const celana = pick(['hijauTua', 'samak', 'nila', 'zaitun', 'samakTua'], k)
  kepala(d, { kulit })
  if (wanita) {
    rambut(d, pick(['panjang', 'sanggul', 'kuncir'], k >> 1), rambutW)
    if ((k >> 1) % 3 === 2) kerudung(d, pick(['krem', 'hijauDaun', 'jingga'], k))
    badan(d, { baju, celana: baju, kulit })
    lengan(d, { baju, tangan: kulit })
    kaki(d, { celana: pick(['samak', 'hijauTua', 'nila'], k), sepatu: 'samakTua', bot: false })
    rok(d, pick(['hijau', 'marun', 'nila', 'samak', 'tosca'], k), 0.06)
    put(d, lathe([[0.088, 0.2], [0.09, 0.23], [0.095, 0.26]], 10, 1, 0.76).translate(0, 0, BADAN_Z), 3, pick(['marun', 'samakTua', 'hijauTua'], k))
    if (k % 3 === 0) celemek(d, 'putihKain')
  } else {
    rambut(d, pick(['pendek', 'acak', 'pendek', 'jambul'], k >> 1), rambutW)
    if ((k >> 1) % 4 === 3) jenggot(d, rambutW, 'kumis')
    if ((k >> 1) % 4 === 2) ikatKepala(d, 'samakTua')
    badan(d, { baju, celana, kulit })
    lengan(d, { baju, tangan: kulit })
    kaki(d, { celana, sepatu: pick(['samak', 'samakTua'], k) })
    rompi(d, pick(['samak', 'hijauTua', 'samakTua', 'marun'], k >> 1))
    sabuk(d, 'samakTua', 'kuning')
  }
  return d
}

function pedagang(k = 0) {
  const d = bodyData()
  kepala(d, { kulit: pick(['kulit', 'kulitSawo'], k), alis: 'rambutUban' })
  jenggot(d, pick(['rambutUban', 'rambutCokelat'], k), 'pedagang')
  rambut(d, 'pendek', pick(['rambutUban', 'rambutCokelat'], k))
  topi(d, pick(['samak', 'samakTua'], k), 'samakTua')
  badan(d, { baju: 'krem', celana: 'samakTua', perut: 0.6, lebar: 1.08 })
  lengan(d, { baju: 'krem', tangan: 'kulit', manset: 'samak' })
  kaki(d, { celana: 'samakTua', sepatu: 'samak', tebal: 1.05 })
  rompi(d, pick(['marun', 'merahTua', 'hijauTua'], k), 1.12)
  sabuk(d, 'samakTua', 'emas', 0.2, 1.12)
  ransel(d)
  return d
}

function raja() {
  const d = bodyData()
  kepala(d, { kulit: 'kulit', alis: 'rambutCokelatTua' })
  rambut(d, 'pendek', 'rambutCokelat')
  jenggot(d, 'rambutCokelat', 'penuh')
  mahkota(d)
  badan(d, { baju: 'hitam', celana: 'merahTua', lebar: 1.05 })
  zirahDada(d, 'hitam', 'emas', 1.05)
  put(d, ellipsoid([0, 0.27, BADAN_Z + 0.072], [0.03, 0.04, 0.012], 6, 5), 3, 'emas')
  sabuk(d, 'emasTua', 'permataMerah', 0.205, 1.06)
  rok(d, 'merahTua', 0.08, 1.04)
  lengan(d, { baju: 'hitam', tangan: 'kulit', manset: 'emas' })
  bahu(d, 'emas', { besar: 0.85 })
  kaki(d, { celana: 'merahTua', sepatu: 'hitam' })
  jubah(d, 'merah', { panjang: 1.05, lebar: 1.15, bulu: 'buluPutih' })
  return d
}

function pendeta() {
  const d = bodyData()
  kepala(d, { kulit: 'kulitSawo', alis: 'rambutUban' })
  rambut(d, 'botak', 'rambutUban')
  jenggot(d, 'rambutUban', 'penuh')
  badan(d, { baju: 'putihKain', celana: 'putihKain' })
  lengan(d, { baju: 'putihKain', tangan: 'kulitSawo', manset: 'emas' })
  kaki(d, { celana: 'putihKain', sepatu: 'samakMuda', bot: false })
  rok(d, 'putihKain', 0.03, 1.1)
  put(d, sheet((u, v) => v3((u - 0.5) * 0.04, 0.32 - 0.26 * v, BADAN_Z + 0.075 + 0.04 * v), 1, 3, 0.004), 3, 'jingga')
  sabuk(d, 'jingga', null)
  return d
}

// prajurit kerajaan: zirah baja, tabar & jubah warna pasukan, helm berjambul (atau rambut terbuka)
function prajurit({ tabarW = 'biru', jambul = 'biru', jubahW = null, helmW = true, rambutW = 'rambutCokelat', syalW = null, lis = 'emas' } = {}) {
  const d = bodyData()
  kepala(d, { kulit: 'kulit', alis: helmW ? null : 'rambutCokelatTua', tertutup: !!helmW })
  if (helmW) helm(d, { jambul })
  else rambut(d, 'acak', rambutW)
  badan(d, { baju: 'bajaSedang', celana: 'bajaGelap', atas: false })
  zirahDada(d, 'baja', lis)
  tabar(d, tabarW, null)
  sabuk(d, 'samakTua', 'emas', 0.205, 1.08)
  lengan(d, { baju: 'bajaSedang', tangan: 'samakTua', manset: 'baja' })
  bahu(d, 'baja', { lis })
  kaki(d, { celana: 'bajaGelap', sepatu: 'bajaTua', pelindung: 'baja' })
  if (jubahW) jubah(d, jubahW, { panjang: 0.95 })
  if (syalW) syal(d, syalW)
  return d
}

function pemanah() {
  const d = bodyData()
  kepala(d, { kulit: 'kulit' })
  rambut(d, 'pendek', 'rambutCokelat')
  tudung(d, 'hijau', 'hijauTua')
  badan(d, { baju: 'hijau', celana: 'samakTua' })
  rompi(d, 'samak', 1.02)
  sabuk(d, 'samakTua', 'emasTua')
  rok(d, 'hijau', 0.11)
  lengan(d, { baju: 'hijau', tangan: 'samakTua', manset: 'samak' })
  kaki(d, { celana: 'samakTua', sepatu: 'samak' })
  tabungPanah(d)
  return d
}

function orc() {
  const d = bodyData()
  kepala(d, { kulit: 'kulitOrc', telinga: 'orc', alis: 'kulitOrcTua', marah: true, rahang: 1.12, besar: 1.05 })
  // dahi menonjol, rahang bawah + taring, jambul hitam
  put(d, ellipsoid([0, KEPALA.y + 0.028, 0.07], [0.075, 0.022, 0.03], 8, 5), 6, 'kulitOrcTua')
  put(d, ellipsoid([0, KEPALA.y - 0.058, 0.055], [0.07, 0.035, 0.045], 8, 5), 6, 'kulitOrc')
  for (const s of [-1, 1]) put(d, capsule(v3(s * 0.032, KEPALA.y - 0.06, 0.088), v3(s * 0.036, KEPALA.y - 0.022, 0.098), 0.009, 0.002, 4, 1), 6, 'taring')
  put(d, sweep([v3(0, UBUN - 0.01, 0.05), v3(0, UBUN + 0.03, -0.01), v3(0, UBUN + 0.05, -0.07), v3(0, UBUN - 0.01, -0.13), v3(0, UBUN - 0.11, -0.16)], [0.012, 0.03, 0.032, 0.022, 0.006], 6, 0.6), 6, 'rambutHitam')
  badan(d, { baju: 'kulitOrc', celana: 'samakTua', kulit: 'kulitOrc', lebar: 1.36, dalam: 0.85 })
  // dada berotot
  for (const s of [-1, 1]) put(d, ellipsoid([s * 0.048, 0.282, BADAN_Z + 0.045], [0.052, 0.04, 0.035], 7, 5), 3, 'kulitOrc')
  // tali kulit menyilang + sabuk rantai + cawat merah
  put(d, capsule(v3(0.1, 0.315, BADAN_Z + 0.03), v3(-0.09, 0.2, BADAN_Z + 0.075), 0.012, 0.012, 4, 1), 3, 'samakTua')
  put(d, capsule(v3(0.1, 0.315, BADAN_Z - 0.06), v3(-0.09, 0.2, BADAN_Z - 0.08), 0.012, 0.012, 4, 1), 3, 'samakTua')
  sabuk(d, 'samakTua', 'bajaTua', 0.2, 1.28)
  put(d, ring(0, 0.188, BADAN_Z, 0.11, 0.007, 14, 0.8, 3), 3, 'bajaSedang')
  put(d, sheet((u, v) => v3((u - 0.5) * 0.09, 0.195 - 0.1 * v, BADAN_Z + 0.08 + 0.01 * v), 2, 2, 0.004), 3, 'merahTua')
  lengan(d, { baju: 'kulitOrc', tangan: 'kulitOrc', tebal: 1.5, manset: 'samakTua', pendek: true })
  bahu(d, 'bajaGelap', { besar: 1.25, duri: 'bajaSedang' })
  kaki(d, { celana: 'samakTua', sepatu: 'samakTua', tebal: 1.3 })
  return d
}

// pemain: pendekar berzirah ringan, rambut cokelat acak, syal merah (beda dari prajurit Kencana
// yang berhelm)
function pemain() {
  return prajurit({ helmW: false, tabarW: 'merahTua', jubahW: null, syalW: 'merah', rambutW: 'rambutCokelat', lis: 'emas' })
}

// ------------------------------------------------------------------- elf Aeloria
// Badan elf untuk elf.js: warna tiap bagian diatur per orang oleh shader lewat "slot", jadi tiap cat
// di sini berupa { uv, slot } (P = cat per slot). Bagian opsional (zirah, helm berjambul, jubah,
// rambut panjang, tabung panah, sarung pedang, mahkota daun, celemek) ikut dibuat dan dilipat shader
// bila tidak dipakai orang itu.
const ELF_RAMBUT = { 'male-a': 'pendek', 'male-b': 'kuncir', 'male-f': 'acak', 'female-a': 'panjang', 'female-b': 'sanggul', 'female-c': 'panjang', 'female-f': 'kuncir' }
export const ELF_BADAN = Object.keys(ELF_RAMBUT)
// tangan untuk barang (ruang bind): 3 = depan perut (kecapi), 4 = tangan kiri, 5 = kanan
export const ELF_TANGAN = { 3: v3(0, 0.2, BADAN_Z + 0.09), 4: handBind(4), 5: handBind(5) }
export function elfBadan(gaya, P) {
  // ribuan elf: sisi sedikit lebih jarang dari rupa penuh
  setDetail(0.75)
  try {
    return elfData(gaya, P)
  } finally {
    setDetail(1)
  }
}
function elfData(gaya, P) {
  const d = bodyData()
  const wanita = gaya.startsWith('female')
  kepala(d, { kulit: P.kulit, telinga: 'elf' })
  rambut(d, ELF_RAMBUT[gaya], P.rambut)
  // rambut panjang opsional: terurai di punggung sampai bahu (juga keluar dari bawah helm)
  put(d, lathe([[0.072, 0.265], [0.096, 0.33], [0.1, 0.4], [0.098, 0.47]], 10, 1, 0.55, [Math.PI * 0.6, Math.PI * 0.8]).translate(0, 0, -0.04), 6, P.rambutPanjang)
  badan(d, { baju: P.baju, celana: P.celana, kulit: P.kulit })
  lengan(d, { baju: P.baju, tangan: P.kulit, manset: P.hias })
  kaki(d, { celana: P.celana, sepatu: P.sepatu })
  if (wanita) rok(d, P.baju, 0.06)
  put(d, band(0, 0.205, BADAN_Z, 0.087, 0.02, 10, 0.76), 3, P.hias)
  if (wanita) put(d, lathe([[0.088, 0.24], [0.096, 0.27], [0.098, 0.29]], 10, 1, 0.76).translate(0, 0, BADAN_Z), 3, P.hias)
  // --- zirah kesatria: pelat dada, bahu, pelindung tulang kering, sabuk, kain pasukan di depan
  put(d, lathe([[0.09, 0.19], [0.092, 0.235], [0.104, 0.274], [0.106, 0.3], [0.09, 0.325], [0.047, 0.34], [0, 0.343]], 10, 1, 0.8).translate(0, 0, BADAN_Z), 3, P.zirah)
  bahu(d, P.zirah, { besar: 0.95 })
  for (const j of [1, 2]) {
    const x = (j === 1 ? 1 : -1) * 0.068 * 0.98
    put(d, cylinder(x, 0.06, -0.012, 0.044, 0.046, 0.055, 7, true), j, P.zirah)
  }
  put(d, band(0, 0.2, BADAN_Z, 0.095, 0.022, 10, 0.82), 3, P.sabuk)
  put(d, sheet((u, v) => v3((u - 0.5) * (0.09 + 0.02 * v), 0.25 - 0.15 * v, BADAN_Z + 0.09 + 0.012 * v), 2, 2, 0.004), 3, P.panji)
  // --- helm elf: kubah + lingkar + jambul tinggi
  helm(d, { warna: P.helm, lis: P.helm, jambul: P.jambul, hidung: false, besar: 1.07 })
  // --- jubah di punggung
  jubah(d, P.jubah, { panjang: 0.92 })
  // --- tabung panah + bulu anak panah
  tabungPanah(d, { tabung: P.tabung, lis: P.tabung, bulu: [P.bulu, P.bulu], n: 2 })
  // --- sarung pedang di pinggul kiri (miring ke belakang) + gagang
  put(d, capsule(v3(0.098, 0.2, BADAN_Z + 0.02), v3(0.112, 0.04, BADAN_Z - 0.09), 0.016, 0.012, 5, 1), 3, P.sarung)
  put(d, capsule(v3(0.096, 0.205, BADAN_Z + 0.024), v3(0.09, 0.255, BADAN_Z + 0.055), 0.01, 0.01, 4, 1), 3, P.gagang)
  // --- mahkota daun: lingkar + daun-daun kecil
  put(d, band(0, KEPALA.y + 0.05, -0.004, 0.104, 0.016, 12, 0.98), 6, P.mahkota)
  for (let k = 0; k < 4; k++) {
    const a = ((k - 1.5) / 4) * Math.PI
    put(d, ellipsoid([0, 0, 0], [0.013, 0.026, 0.006], 4, 3).rotateZ(-a * 0.3).translate(Math.sin(a) * 0.105, KEPALA.y + 0.075, Math.cos(a) * 0.1), 6, P.mahkota)
  }
  // --- celemek kulit
  celemek(d, P.celemek)
  return d
}

// semua rupa: kunci → pembuat data badan
export const RUPA = {
  rakyat,
  pedagang,
  raja,
  pendeta,
  pemanah,
  orc,
  pemain,
  // penjaga kerajaan (prajurit.js): jambul pembeda tugas
  jaga: () => prajurit({ tabarW: 'nila', jambul: 'hitam', jubahW: 'nila' }),
  peronda: () => prajurit({ tabarW: 'biru', jambul: 'biruMuda' }),
  perondaPedang: () => prajurit({ tabarW: 'hijauTua', jambul: 'hijauDaun' }),
  // bala tentara (pasukan.js)
  perisai: () => prajurit({ tabarW: 'biru', jambul: 'biru' }),
  tombak: () => prajurit({ tabarW: 'merah', jambul: 'merah' }),
  pedang: () => prajurit({ helmW: false, tabarW: 'merahTua', syalW: 'merah', rambutW: 'rambutCokelatTua' }),
  kavaleri: () => prajurit({ tabarW: 'merah', jambul: 'merah' }),
  senapati: () => prajurit({ tabarW: 'unguTua', jambul: 'ungu', jubahW: 'ungu', lis: 'emas' }),
}

// data badan rupa `nama` (varian `arg`); ringan = lebih sedikit sisi (kerumunan bala tentara)
export function buatRupa(nama, arg = 0, { ringan = false } = {}) {
  setDetail(ringan ? 0.7 : 1)
  try {
    return RUPA[nama](arg)
  } finally {
    setDetail(1)
  }
}

// SkinnedMesh dari data badan, terikat pada rangka `skeleton` (tulang Kenney yang sama)
export function skinnedFrom(data, skeleton, material) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(data.pos, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(data.nor, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(data.uv, 2))
  const n = data.bone.length
  const si = new Uint16Array(n * 4)
  const sw = new Float32Array(n * 4)
  for (let i = 0; i < n; i++) {
    si[i * 4] = data.bone[i]
    sw[i * 4] = 1
  }
  g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4))
  g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4))
  g.setIndex(data.index)
  const mesh = new THREE.SkinnedMesh(g, material)
  mesh.bind(skeleton, new THREE.Matrix4())
  return mesh
}

// pisahkan data badan menurut tulang (mis. kepala orc yang bisa terlepas); vertex(i) = saringan titik
export function splitData(data, keep, vertex = null) {
  const out = bodyData()
  const map = new Int32Array(data.bone.length).fill(-1)
  for (let t = 0; t < data.index.length; t += 3) {
    const tri = [data.index[t], data.index[t + 1], data.index[t + 2]]
    if (!tri.every(i => keep(data.bone[i]) && (!vertex || vertex(i)))) continue
    for (const i of tri) {
      if (map[i] < 0) {
        map[i] = out.pos.length / 3
        out.pos.push(data.pos[i * 3], data.pos[i * 3 + 1], data.pos[i * 3 + 2])
        out.nor.push(data.nor[i * 3], data.nor[i * 3 + 1], data.nor[i * 3 + 2])
        out.uv.push(data.uv[i * 2], data.uv[i * 2 + 1])
        out.bone.push(data.bone[i])
        out.slot.push(data.slot[i])
      }
      out.index.push(map[i])
    }
  }
  return out
}

export const triCount = d => d.index.length / 3
