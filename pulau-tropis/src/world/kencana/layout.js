// Rencana Kepulauan Kencana (di barat Pulau Tropis): satu sumber kebenaran untuk letak pulau,
// kota, jalan, dan jembatan. Murni data + fungsi kecil (tanpa Three.js), dipakai bentuk tanah,
// masker jalan, bangunan, peta, dan penduduk. Satuan meter; sumbu −x = barat, −z = utara.

// Pulau-pulau: pusat, jari-jari pantai, seberapa berkelok garis pantainya, tinggi bukit pedalaman
export const ISLANDS = [
  { id: 'kencana', name: 'Pulau Kencana', x: -560, z: 40, r: 255, wobble: 0.07, hills: 7, seed: 51 },
  { id: 'sawah', name: 'Pulau Sawah', x: -660, z: -345, r: 100, wobble: 0.1, hills: 3, seed: 52 },
  { id: 'nelayan', name: 'Pulau Nelayan', x: -760, z: 360, r: 88, wobble: 0.1, hills: 3, seed: 53 },
  { id: 'pura', name: 'Pulau Pura', x: -890, z: 110, r: 50, wobble: 0.12, hills: 13, seed: 54 },
]

// Kotaraja: kota bertembok bata (garis tengah tembok) di atas dataran yang diratakan
export const CITY = { x0: -700, x1: -420, z0: -60, z1: 140, y: 5.5 }

// Gerbang kota (candi bentar) — titik tengah celah pada tembok, lebar celah
export const GATES = [
  { id: 'timur', x: -420, z: 40, w: 10, axis: 'x' }, // ke Jembatan Agung
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
  [-420, 40, -300, 40, 7], // ke Jembatan Agung
  [-553, 134, -553, 282, 6], // ke pelabuhan
  [-647, -54, -647, -195, 5], // ke Pulau Sawah
  [-694, 110, -800, 110, 5], // ke Pulau Pura
  [-730, 110, -730, 228, 5], // ke Pulau Nelayan
]

// Jembatan lurus searah sumbu x atau z, di garis `at`. `from` = titik darat di Pulau Kencana,
// `to` = titik darat di pulau seberang; ujung jembatan dicari dari bentuk tanah (height.js)
export const BRIDGES = [
  { id: 'agung', name: 'Jembatan Agung', axis: 'x', at: 40, from: -360, to: -160, width: 7, rise: 2.2, stone: true },
  { id: 'sawah', name: 'Jembatan Sawah', axis: 'z', at: -646, from: -150, to: -280, width: 4.6, rise: 1.2 },
  { id: 'pura', name: 'Jembatan Pura', axis: 'x', at: 110, from: -770, to: -880, width: 4.6, rise: 1.2 },
  { id: 'nelayan', name: 'Jembatan Nelayan', axis: 'z', at: -730, from: 200, to: 300, width: 4.6, rise: 1.2 },
]

// Nama wilayah untuk spanduk "memasuki …" dan peta (diperiksa berurutan: yang pertama cocok menang)
export const REGIONS = [
  { id: 'keraton', name: 'Keraton Kencana', sub: 'Istana Raja', rect: KERATON },
  { id: 'kotaraja', name: 'Kotaraja Kencana', sub: 'Ibu kota Kerajaan Kencana', rect: CITY },
  { id: 'kencana', name: 'Pulau Kencana', sub: 'Kepulauan Kencana', island: 'kencana' },
  { id: 'sawah', name: 'Pulau Sawah', sub: 'Lumbung padi kerajaan', island: 'sawah' },
  { id: 'nelayan', name: 'Kampung Nelayan', sub: 'Pulau Nelayan', island: 'nelayan' },
  { id: 'pura', name: 'Pura Segara', sub: 'Pulau Pura', island: 'pura' },
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
