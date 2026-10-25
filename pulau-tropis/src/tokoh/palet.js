import * as THREE from 'three'

// Palet warna semua karakter: satu tekstur kecil (32 × 32 texel, tanpa penghalusan), tiap bagian badan
// memakai uv di tengah kotak warnanya — jadi semua orang sejenis tetap satu draw call.
// - Setengah bawah (v 0,5–1) = tata letak colormap Kenney "Mini Characters" (kotak 8 × 8, baris
//   4–7, tiap kotak 4 × 4 texel seragam): kode yang menunjuk kotak Kenney (kayu, besi, emas,
//   pasangan warna elf, kuda) tetap benar.
// - Setengah atas = warna bernama untuk badan-badan baru (rupa.js), satu texel per warna.

const N = 32

// warna kotak Kenney baris 4–7 (kolom 0–7), seperti colormap aslinya
const KENNEY = [
  ['#fadcb8', '#4cb681', '#ffc658', '#ff9344', '#f56843', '#6282d1', '#b2d0f5', '#9367db'],
  ['#f5cea0', '#2c9671', '#ffa139', '#ff7b44', '#da594b', '#5b66c4', '#81a9e3', '#6b46c2'],
  ['#41414a', '#797e96', '#4d505e', '#b0b8dd', '#efeff5', '#df8760', '#a55d41', '#e6ae87'],
  ['#38383d', '#61677e', '#424451', '#878da9', '#c9c9dd', '#c06e4c', '#8f5741', '#d28f68'],
]

// warna bernama (gaya pixel art: jenuh, bernada hangat; bayangan dari cahaya 4 tingkat)
export const WARNA = {
  // kulit
  kulit: '#f8dcc6', kulitSawo: '#e8b48e', kulitCokelat: '#c08560', kulitElf: '#fbe6d6',
  kulitOrc: '#86b852', kulitOrcTua: '#5e8a35', bibirOrc: '#46682a',
  // rambut
  rambutCokelat: '#8a5634', rambutCokelatTua: '#5e3b25', rambutHitam: '#3b3440', rambutPirang: '#f0cd73',
  rambutPerak: '#f6ebc4', rambutMerah: '#b8573a', rambutUban: '#e6e1d8', rambutJahe: '#d5833c',
  // logam
  baja: '#e4eaf2', bajaSedang: '#b4bfcf', bajaTua: '#7f8a9c', bajaGelap: '#5a6273',
  emas: '#f2c34a', emasTua: '#b4842a', perunggu: '#b97a3a',
  // kain
  biru: '#3f74dc', biruTua: '#2a4794', biruMuda: '#8ab2f0', merah: '#d63c38', merahTua: '#9a2a32',
  merahMuda: '#ec7a62', hijau: '#4f9f45', hijauTua: '#33693a', hijauDaun: '#8cc858', zaitun: '#7a8a3c',
  krem: '#f2e6cb', putihKain: '#f7f4ee', kelabuKain: '#a3a5ad', ungu: '#8450b0', unguTua: '#563479',
  hitam: '#3a3542', jingga: '#ea8f3c', kuning: '#f4d35c', nila: '#3c5288', tosca: '#3aa197', marun: '#8a3443',
  // kulit samak & kayu
  samak: '#a2683e', samakTua: '#71472b', samakMuda: '#c89a62', kayu: '#9a6638', kayuTua: '#6e4626', kayuMuda: '#c09060',
  // bulu & tali
  buluPutih: '#fbf8f2', buluBintik: '#2f2a33', tali: '#d6bf8a', jerami: '#e4c878',
  // muka & permata
  mata: '#1c1b27', alis: '#3a2a22', taring: '#f2e9c9', permataMerah: '#d9263b', permataBiru: '#3fa1ff', permataHijau: '#41d16c',
  pipi: '#ec9c86',
}
const NAMES = Object.keys(WARNA)

let texture = null
// tekstur palet (dibuat sekali, dipakai bersama semua karakter)
export function paletteTexture() {
  if (texture) return texture
  const data = new Uint8Array(N * N * 4)
  const put = (x, y, hex) => {
    const c = new THREE.Color(hex)
    const o = (y * N + x) * 4
    data[o] = Math.round(c.r * 255)
    data[o + 1] = Math.round(c.g * 255)
    data[o + 2] = Math.round(c.b * 255)
    data[o + 3] = 255
  }
  // kotak Kenney: kolom i, baris j (4–7) = texel [4i, 4i+4) × [4j, 4j+4)
  KENNEY.forEach((row, r) => row.forEach((hex, i) => {
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) put(4 * i + x, 4 * (r + 4) + y, hex)
  }))
  NAMES.forEach((name, k) => put(k % N, Math.floor(k / N), WARNA[name]))
  texture = new THREE.DataTexture(data, N, N, THREE.RGBAFormat)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.needsUpdate = true
  return texture
}

// uv warna bernama
export function uvWarna(name) {
  const k = NAMES.indexOf(name)
  if (k < 0) throw new Error(`warna tidak ada: ${name}`)
  return [((k % N) + 0.5) / N, (Math.floor(k / N) + 0.5) / N]
}

// uv kotak Kenney (kolom i, baris j; tata letak colormap 8 × 8)
export const uvKotak = (i, j) => [(i + 0.5) / 8, (j + 0.5) / 8]
