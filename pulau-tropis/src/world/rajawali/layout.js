// Pulau Rajawali (v0.27.0): kerajaan kecil MILIK PEMAIN di laut kosong barat laut, di antara
// Kepulauan Kencana dan Aeloria. Tanpa penduduk desa — hanya 400 prajurit tempur (100 pemanah,
// 100 pemegang pedang, 100 pemegang perisai, 100 penunggang kuda) dan 4 komandan, satu per divisi.
// Murni data (tanpa Three.js): bentuk tanah, rencana bangunan, peta, dan bala tentaranya.
// Satuan meter; sumbu −x = barat, −z = utara; arah hadap h: 0 = selatan (+z), π/2 = timur (+x).

// pulau lonjong datar (elips rx × rz) — jauh dari pulau lain (laut lepas ±280 m di sekelilingnya)
export const ISLE = { id: 'rajawali', name: 'Pulau Rajawali', x: -840, z: -900, rx: 145, rz: 118, wobble: 0.05, hills: 2, seed: 71 }
// tinggi dataran yang diratakan (benteng, lapangan, jalan ke dermaga)
export const Y = 4.2

// Benteng Rajawali: tembok bata keliling dengan menara di sudut, gerbang candi bentar di selatan
// menghadap lapangan; di dalamnya pendopo (balairung raja) dan dua bangsal (barak prajurit)
export const FORT = { x0: -890, x1: -820, z0: -977, z1: -919 }
export const FORT_GATE = { x: -855, w: 9 }
// Lapangan Latihan: tanah lapang tempat keempat divisi berbaris (rumah mereka)
export const FIELD = { x0: -925, x1: -760, z0: -912, z1: -842 }
// tempat latihan memanah (sasaran jerami) di barat lapangan, kandang kuda di timur laut
export const ARCHERY = { x0: -962, x1: -934, z0: -910, z1: -850 }
export const STABLE = { x: -787, z: -932, w: 34, d: 8 }
// dataran yang diratakan setinggi Y (sedikit lebih luas dari isinya)
export const FLAT = [
  { x0: FORT.x0 - 4, x1: FORT.x1 + 4, z0: FORT.z0 - 4, z1: FORT.z1 + 2 },
  FIELD,
  ARCHERY,
  { x0: STABLE.x - STABLE.w / 2 - 3, x1: STABLE.x + STABLE.w / 2 + 3, z0: STABLE.z - 7, z1: STABLE.z + 6 },
  { x0: FIELD.x1, x1: -735, z0: -884, z1: -876 }, // jalan ke dermaga
]

// Dermaga Rajawali di pantai timur (menghadap Pulau Tropis & Kencana) — format sama dengan
// kencana/layout.js DOCKS (dockSpans mencari tepi pantainya)
export const DOCKS = [
  { id: 'rajawali', name: 'Dermaga Rajawali', axis: 'x', at: -880, from: -740, dir: 1, len: 34, width: 5 },
]

// Empat divisi (urutan = urutan tombol komandan). jenis = tokoh di bala.js, warna panji komandan.
// home = pusat barisan di Lapangan Latihan (menghadap selatan)
export const DIVISI = [
  { id: 'pemanah', name: 'Pemanah', komandan: 'Komandan Pemanah', jenis: 'pemanah', panji: 'hijau', home: { x: -903, z: -877 } },
  { id: 'pedang', name: 'Pedang', komandan: 'Komandan Pedang', jenis: 'pedang', panji: 'merah', home: { x: -867, z: -877 } },
  { id: 'perisai', name: 'Perisai', komandan: 'Komandan Perisai', jenis: 'perisai', panji: 'biru', home: { x: -831, z: -877 } },
  { id: 'kavaleri', name: 'Kavaleri', komandan: 'Komandan Kavaleri', jenis: 'kavaleri', panji: 'emas', home: { x: -787, z: -877 } },
]
export const PER_DIVISI = 100
export const HOME_HEADING = 0 // menghadap selatan (ke laut, membelakangi benteng)
// titik mulai pemain (v0.27.1): Lapangan Latihan, di depan barisan divisi Pedang & Perisai, menghadap utara
// (pasukan & benteng di depannya); juga tempat bangun setelah pingsan dikeroyok orc
export const HOME = { x: -849, z: -846, heading: Math.PI }

// Nama wilayah untuk spanduk "memasuki …" dan peta (yang pertama cocok menang)
export const REGIONS = [
  { id: 'benteng-rajawali', name: 'Benteng Rajawali', sub: 'Benteng kerajaanmu', rect: FORT },
  { id: 'lapangan-rajawali', name: 'Lapangan Latihan', sub: '400 prajuritmu siap menerima perintah', rect: { x0: ARCHERY.x0, x1: FIELD.x1, z0: FIELD.z0, z1: FIELD.z1 } },
  { id: 'rajawali', name: 'Pulau Rajawali', sub: 'Kerajaan kecilmu sendiri', island: true },
]

export const rajawaliDistance = (x, z) => Math.hypot((x - ISLE.x) / ISLE.rx, (z - ISLE.z) / ISLE.rz)
