// Rencana Kepulauan Kencana (di barat Pulau Tropis): satu sumber kebenaran untuk letak pulau,
// kota, jalan, jembatan antarpulau Kencana, dan dermaga. Murni data + fungsi kecil (tanpa Three.js), dipakai bentuk tanah,
// masker jalan, bangunan, peta, dan penduduk. Satuan meter; sumbu −x = barat, −z = utara.

// Pulau-pulau: pusat, jari-jari pantai (r, atau rx × rz untuk pulau lonjong), seberapa berkelok garis
// pantainya, tinggi bukit pedalaman
export const ISLANDS = [
  { id: 'kencana', name: 'Pulau Kencana', x: -560, z: 40, r: 255, wobble: 0.07, hills: 7, seed: 51 },
  { id: 'sawah', name: 'Pulau Sawah', x: -660, z: -345, r: 100, wobble: 0.1, hills: 3, seed: 52 },
  { id: 'nelayan', name: 'Pulau Nelayan', x: -760, z: 360, r: 88, wobble: 0.1, hills: 3, seed: 53 },
  { id: 'pura', name: 'Pulau Pura', x: -890, z: 110, r: 50, wobble: 0.12, hills: 13, seed: 54 },
  // markas bala tentara: pulau lonjong datar di selatan pelabuhan
  { id: 'wira', name: 'Pulau Wira', x: -270, z: 470, rx: 360, rz: 185, r: 360, wobble: 0.05, hills: 2, seed: 55, forest: 0.25 },
]

// Kotaraja: kota bertembok bata (garis tengah tembok) di atas dataran yang diratakan
export const CITY = { x0: -700, x1: -420, z0: -60, z1: 140, y: 5.5 }

// Gerbang kota (candi bentar) — titik tengah celah pada tembok, lebar celah
export const GATES = [
  { id: 'timur', x: -420, z: 40, w: 10, axis: 'x' }, // ke Dermaga Timur
  { id: 'barat', x: -700, z: 110, w: 7, axis: 'x' }, // ke Pulau Pura & Pulau Nelayan
  { id: 'utara', x: -647, z: -60, w: 7, axis: 'z' }, // ke Pulau Sawah
  { id: 'selatan', x: -553, z: 140, w: 8, axis: 'z' }, // ke pelabuhan
]

// Kawasan khusus di dalam tembok
export const KERATON = { x0: -689, x1: -602, z0: -1, z1: 81, gate: { x: -602, z: 40 } }
export const ALUN = { x0: -588, x1: -508, z0: -1, z1: 81 }
export const CANDI = { x0: -500, x1: -430, z0: -50, z1: 31, x: -465, z: -10 }
export const PASAR = { x0: -500, x1: -430, z0: 47, z1: 82 }
export const HARBOR = { x: -553, z: 292 } // ujung jalan selatan di pantai (dermaga menjorok ke laut)
// puncak Pulau Pura diratakan untuk halaman pura
export const PURA = { x: -893, z: 110, r: 21 }
// Tegal Wira: lapangan Pulau Wira tempat bala tentara berbaris, diratakan setinggi y
export const TEGAL = { x0: -490, x1: -50, z0: 370, z1: 577, y: 4.2 }
// tiang Bangsal Witana di atas Siti Hinggil (relatif pusat batur): 4 saka guru lalu tiang pinggir
export const SITI_COLS = [[-4.6, -3.2], [4.6, -3.2], [4.6, 3.2], [-4.6, 3.2], [-10.6, -5.3], [0, -5.3], [10.6, -5.3], [-10.6, 0], [10.6, 0], [-10.6, 5.3], [10.6, 5.3]]
// perkemahan prajurit di ujung barat (tenda) dan timur (kandang kuda) Pulau Wira
export const CAMPS = [
  { id: 'tenda', x0: -578, x1: -508, z0: 392, z1: 556 },
  { id: 'kandang', x0: -32, x1: 34, z0: 392, z1: 540 },
]

// Jalan: [ax, az, bx, bz, lebar]. Dalam tembok = jalan kota, di luar = jalan tanah antardesa.
const ring = [[-694, -54], [-426, -54], [-426, 134], [-694, 134]]
export const STREETS = [
  // jalan lingkar di dalam tembok
  ...ring.map((p, i) => [...p, ...ring[(i + 1) % 4], 5]),
  // lajur kota utara & selatan
  [-694, -29, -504, -29, 5], [-694, -5, -504, -5, 6],
  [-694, 85, -426, 85, 6], [-694, 110, -426, 110, 5],
  [-647, -54, -647, -5, 5], [-600, -54, -600, -5, 5], [-553, -54, -553, -5, 5],
  [-647, 85, -647, 134, 5], [-600, 85, -600, 134, 5], [-553, 85, -553, 134, 5],
  [-504, -54, -504, 134, 6],
  // jalan raya: gerbang timur → alun-alun → gerbang keraton
  [-420, 40, -508, 40, 10], [-508, 40, -602, 40, 8],
  // jalan dari jalan lingkar, menembus gerbang kota, ke luar
  [-420, 40, -338, 40, 7], // ke Dermaga Timur
  [-553, 134, -553, 282, 6], // ke pelabuhan
  [-647, -54, -647, -195, 5], // ke Pulau Sawah
  [-694, 110, -800, 110, 5], // ke Pulau Pura
  [-730, 110, -730, 228, 5], // ke Pulau Nelayan
]

// Jembatan lurus searah sumbu x atau z, di garis `at`, HANYA di antara pulau-pulau Kencana sendiri.
// `from` = titik darat di Pulau Kencana, `to` = titik darat di pulau seberang; ujung jembatan dicari
// dari bentuk tanah (height.js). Jembatan Agung ke Pulau Tropis sudah dibongkar (v0.14.0, DECISIONS
// #57): Kencana, Pulau Tropis, dan Aeloria tidak tersambung jembatan — menyeberang dengan perahu.
export const BRIDGES = [
  { id: 'sawah', name: 'Jembatan Sawah', axis: 'z', at: -646, from: -150, to: -280, width: 4.6, rise: 1.2 },
  { id: 'pura', name: 'Jembatan Pura', axis: 'x', at: 110, from: -770, to: -880, width: 4.6, rise: 1.2 },
  { id: 'nelayan', name: 'Jembatan Nelayan', axis: 'z', at: -730, from: 200, to: 300, width: 4.6, rise: 1.2 },
  { id: 'wira', name: 'Jembatan Wira', axis: 'z', at: -470, from: 230, to: 360, width: 6, rise: 1.6 },
]

// Dermaga penyeberangan (pengganti Jembatan Agung): lantai kayu dari pantai di garis `at` (sumbu
// `axis`) menjorok `len` m ke laut searah `dir` (+1 = ke timur). `from` = titik darat tempat mencari
// tepi pantai (height.js dockSpans). gate = gapura candi bentar & penjaga di pangkalnya.
// Dermaga Timur milik Kencana; Dermaga Barat di Pulau Tropis (di luar wilayah kerajaan) tempat
// perahu-perahu berangkat ke Kencana.
export const DOCKS = [
  { id: 'timur', name: 'Dermaga Timur', axis: 'x', at: 40, from: -360, dir: 1, len: 40, width: 5, gate: true },
  { id: 'tropis-barat', name: 'Dermaga Barat', axis: 'x', at: 40, from: -150, dir: -1, len: 36, width: 4 },
]

// Nama wilayah untuk spanduk "memasuki …" dan peta (diperiksa berurutan: yang pertama cocok menang)
export const REGIONS = [
  { id: 'keraton', name: 'Keraton Kencana', sub: 'Istana Raja', rect: KERATON },
  { id: 'kotaraja', name: 'Kotaraja Kencana', sub: 'Ibu kota Kerajaan Kencana', rect: CITY },
  { id: 'kencana', name: 'Pulau Kencana', sub: 'Kepulauan Kencana', island: 'kencana' },
  { id: 'sawah', name: 'Pulau Sawah', sub: 'Lumbung padi kerajaan', island: 'sawah' },
  { id: 'nelayan', name: 'Kampung Nelayan', sub: 'Pulau Nelayan', island: 'nelayan' },
  { id: 'pura', name: 'Pura Segara', sub: 'Pulau Pura', island: 'pura' },
  { id: 'tegal', name: 'Tegal Wira', sub: 'Bala tentara Kencana siap tempur', rect: TEGAL },
  { id: 'wira', name: 'Pulau Wira', sub: 'Markas bala tentara Kencana', island: 'wira' },
]

export const island = id => ISLANDS.find(i => i.id === id)

// jarak titik (x, z) ke ruas a–b
export function segmentDistance(x, z, ax, az, bx, bz) {
  const vx = bx - ax
  const vz = bz - az
  const t = Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz || 1)))
  return Math.hypot(ax + vx * t - x, az + vz * t - z)
}

// jarak bertanda ke persegi panjang sejajar sumbu (negatif = di dalam)
export function rectDistance(x, z, r) {
  const dx = Math.max(r.x0 - x, x - r.x1)
  const dz = Math.max(r.z0 - z, z - r.z1)
  return Math.hypot(Math.max(dx, 0), Math.max(dz, 0)) + Math.min(Math.max(dx, dz), 0)
}

export const inRect = (x, z, r, margin = 0) => x >= r.x0 - margin && x <= r.x1 + margin && z >= r.z0 - margin && z <= r.z1 + margin
