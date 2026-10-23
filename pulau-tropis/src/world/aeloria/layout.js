// Rencana Kerajaan Aeloria — kerajaan ras elf di utara Pulau Tropis: satu sumber kebenaran untuk
// letak daratan, kawasan (kota bebas, pasar, pandai besi, ladang, balai makan, lapangan latihan,
// padang pesta, perkemahan, benteng), jalan, dan dermaga. Murni data + fungsi kecil (tanpa
// Three.js). Satuan meter; sumbu −x = barat, −z = utara (sama seperti kencana/layout.js).

// Daratan: badan utama (elips besar) + tanjung di selatan yang menjorok ke Pulau Tropis
export const LANDS = [
  { id: 'aeloria', name: 'Tanah Aeloria', x: 0, z: -800, rx: 420, rz: 320, wobble: 0.05, hills: 12, seed: 71 },
  { id: 'tanjung', name: 'Tanjung Perak', x: 10, z: -505, rx: 150, rz: 120, wobble: 0.07, hills: 4, seed: 72 },
]

// Kota Aeloria: kota bebas rakyat elf di dataran yang diratakan (pasar, pandai besi, kedai, rumah)
export const TOWN = { x0: -150, x1: 150, z0: -700, z1: -570, y: 7 }
export const MARKET = { x0: -45, x1: 65, z0: -660, z1: -600 } // alun-alun pasar (jalan raya lewat tengah)
export const SMITHY = { x0: 92, x1: 146, z0: -662, z1: -590 } // kawasan pandai besi (3 tungku)
export const TAVERN = { x: -112, z: -622 } // Kedai Daun Emas
// kawasan kesatria (di luar benteng, terbuka): balai makan, lapangan latihan, padang pesta
export const MESS = { x0: -80, x1: 100, z0: -800, z1: -725, y: 8 }
export const TRAINING = { x0: -320, x1: -120, z0: -880, z1: -730, y: 8 }
export const FEAST = { x0: 140, x1: 330, z0: -880, z1: -730, y: 8 }
// perkemahan tenda kesatria (tidur & istirahat)
export const CAMPS = [
  { id: 'kemah-barat', x0: -270, x1: -140, z0: -975, z1: -900 },
  { id: 'kemah-timur', x0: 150, x1: 280, z0: -975, z1: -900 },
]
// Benteng Aeloria: istana raja elf & barak, di dataran tinggi; SATU-SATUNYA wilayah yang memusuhi
// pemain (kota bebas & kawasan kesatria = zona damai, lihat DECISIONS #49)
export const CITADEL = {
  x0: -110, x1: 130, z0: -1030, z1: -890, y: 12,
  gates: [{ id: 'selatan', x: 10, z: -890, w: 10, axis: 'z' }, { id: 'barat', x: -110, z: -960, w: 7, axis: 'x' }, { id: 'timur', x: 130, z: -960, w: 7, axis: 'x' }],
}
// ladang (gandum & sayur): di tanjung dan di barat/timur kota
export const FIELDS = [
  { x0: -100, x1: -28, z0: -545, z1: -462 },
  { x0: 48, x1: 120, z0: -545, z1: -462 },
  { x0: -268, x1: -172, z0: -700, z1: -625 },
  { x0: 172, x1: 268, z0: -700, z1: -625 },
]
// kebun buah di tepi ladang barat & timur
export const ORCHARDS = [
  { x0: -268, x1: -172, z0: -612, z1: -575 },
  { x0: 172, x1: 268, z0: -612, z1: -575 },
]

// Dermaga penyeberangan (pengganti Jembatan Perak yang dibongkar di v0.14.0 — Aeloria, Pulau Tropis,
// dan Kencana tidak tersambung jembatan, DECISIONS #57): lantai dari pantai di garis x = at
// menjorok `len` m ke laut searah `dir` (+1 = ke selatan). Dermaga Perak (Aeloria, batu putih) di
// ujung Tanjung Perak berpangkal di gapura perak yang dijaga kesatria; Dermaga Utara (kayu) di
// pantai utara Pulau Tropis. Lihat kencana/height.js dockSpans.
export const DOCKS = [
  { id: 'perak', name: 'Dermaga Perak', axis: 'z', at: 10, from: -430, dir: 1, len: 26, width: 5, elf: true, gate: true },
  { id: 'tropis-utara', name: 'Dermaga Utara', axis: 'z', at: 10, from: -190, dir: -1, len: 34, width: 4 },
]
// batas wilayah Aeloria: garis tengah Selat Perak (z) di antara kedua dermaga — utaranya wilayah
// Aeloria, selatannya Pulau Tropis (lihat keamanan.js)
export const SELAT_Z = -310

// jalan: [ax, az, bx, bz, lebar]
const AVE = 10 // garis jalan raya utara–selatan
export const STREETS = [
  // jalan raya: pangkal Dermaga Perak → kota → balai makan → gerbang benteng
  [AVE, -440, AVE, -890, 9],
  // jalan lingkar kota
  [TOWN.x0, TOWN.z0, TOWN.x1, TOWN.z0, 5], [TOWN.x0, TOWN.z1, TOWN.x1, TOWN.z1, 5],
  [TOWN.x0, TOWN.z0, TOWN.x0, TOWN.z1, 5], [TOWN.x1, TOWN.z0, TOWN.x1, TOWN.z1, 5],
  // jalan kota mendatar (lewat pasar) & dua lajur tegak
  [TOWN.x0, -630, TOWN.x1, -630, 6], [-95, TOWN.z0, -95, TOWN.z1, 5], [80, TOWN.z0, 80, TOWN.z1, 5],
  // ke ladang barat & timur
  [TOWN.x0, -650, -268, -650, 4], [TOWN.x1, -650, 268, -650, 4],
  // ke ladang tanjung
  [AVE, -505, -100, -505, 4], [AVE, -505, 120, -505, 4],
  // kawasan kesatria: ke lapangan latihan (barat) & padang pesta (timur), lalu ke perkemahan
  [AVE, -765, TRAINING.x1, -765, 6], [AVE, -765, FEAST.x0, -765, 6],
  [TRAINING.x1, -730, TRAINING.x1, -880, 4], [FEAST.x0, -730, FEAST.x0, -880, 4],
  [-205, TRAINING.z0, -205, -960, 5], [215, FEAST.z0, 215, -960, 5],
  [-205, -960, -110, -960, 4], [215, -960, 130, -960, 4],
  // kota → kawasan kesatria lewat sisi barat & timur
  [-95, TOWN.z0, -95, -765, 4], [80, TOWN.z0, 80, -765, 4],
]

// jalan setapak hutan (tanpa cat; untuk pejalan kaki & kesatria yang berjalan-jalan)
export const TRAILS = [
  [-150, -575, -300, -560], [-300, -560, -360, -680], [-360, -680, -330, -730],
  [150, -575, 300, -560], [300, -560, 360, -680], [360, -680, 330, -730],
  [-320, -880, -330, -1000], [-330, -1000, -110, -1060], [-110, -1060, 130, -1060], [130, -1060, 340, -990], [340, -990, 330, -880],
]

// Nama wilayah untuk spanduk "memasuki …" dan peta (diperiksa berurutan)
export const REGIONS = [
  { id: 'benteng-aeloria', name: 'Benteng Aeloria', sub: 'Istana Raja Elf — wilayah terlarang', rect: CITADEL },
  { id: 'pasar-aeloria', name: 'Pasar Aeloria', sub: 'Pasar bebas: siapa pun boleh berdagang', rect: MARKET },
  { id: 'tempa-aeloria', name: 'Tempa Aeloria', sub: 'Pandai besi elf', rect: SMITHY },
  { id: 'kota-aeloria', name: 'Kota Aeloria', sub: 'Kota bebas rakyat elf', rect: TOWN },
  { id: 'balai-makan', name: 'Balai Makan', sub: 'Tempat makan para kesatria', rect: MESS },
  { id: 'lapangan-latihan', name: 'Lapangan Latihan', sub: 'Kesatria Aeloria berlatih', rect: TRAINING },
  { id: 'padang-pesta', name: 'Padang Pesta', sub: 'Api unggun, musik, dan tarian', rect: FEAST },
  { id: 'kemah-barat', name: 'Perkemahan Kesatria', sub: 'Tenda-tenda kesatria', rect: CAMPS[0] },
  { id: 'kemah-timur', name: 'Perkemahan Kesatria', sub: 'Tenda-tenda kesatria', rect: CAMPS[1] },
  { id: 'tanjung', name: 'Tanjung Perak', sub: 'Ladang gandum Aeloria', land: 'tanjung' },
  { id: 'aeloria', name: 'Tanah Aeloria', sub: 'Kerajaan para elf', land: 'aeloria' },
]

export const land = id => LANDS.find(l => l.id === id)

// jarak ternormalisasi ke pusat daratan (1 = garis pantai rata-rata), sebelum pantai dibuat berkelok
export const landDistance = (l, x, z) => Math.hypot((x - l.x) / l.rx, (z - l.z) / l.rz)
// apakah (x, z) di daratan Aeloria (sampai tepi pantai pasir)
export const onAeloria = (x, z, reach = 1.02) => LANDS.some(l => landDistance(l, x, z) < reach)
