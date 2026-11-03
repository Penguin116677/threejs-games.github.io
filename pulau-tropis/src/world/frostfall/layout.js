// Tata letak Kerajaan Frostfall — daratan pegunungan bersalju di timur Pulau Tropis, dipisahkan
// selat ±110 m (dermaga di kedua sisi; menyeberang dengan berenang atau perahu, seperti negeri lain).
// Murni angka (tanpa Three.js): bentuk tanah (height.js), rencana bangunan (plan.js), masker, peta,
// dan spanduk wilayah membaca dari sini.
//
// Geografi (x = timur, z = selatan; utara = −z):
//   barat   : pantai + Dermaga Frostfall → Lembah Beku (dataran rendah bersalju, Sungai Beku)
//             dengan Desa Emberwick di tepi utara sungai
//   tengah  : tebing Air Terjun Beku → Lembah Atas (lembah gletser, ±52 m) → mulut Gua Es Kristal
//   utara   : Kastel Frostfall di bahu gunung (±72 m); lorong rahasia dari ruang singgasana ke gua
//   timur   : Puncak Taring Es (±255 m) & puncak-puncak lain, punggung gunung bertebing
//   selatan : Hutan Pinus Salju (kemah pemburu) dan Celah Tersembunyi menembus punggung gunung
//             ke Lembah Atas

// ------------------------------------------------------------------ pembantu geometri
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

// jarak titik ke ruas (ax, az)–(bx, bz) + posisi t (0..1) titik terdekat di ruas itu
export function segmentInfo(x, z, ax, az, bx, bz) {
  const vx = bx - ax
  const vz = bz - az
  const t = clamp(((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz || 1), 0, 1)
  return { d: Math.hypot(ax + vx * t - x, az + vz * t - z), t }
}

// garis berliku [{ x, z, ...nilai }]: jarak terdekat + nilai yang diinterpolasi di titik terdekat.
// keys = nama nilai per titik (mis. 'y', 'w'). bbox (opsional) untuk melewati cepat.
export function polyInfo(line, x, z, keys = []) {
  let best = { d: Infinity, i: 0, t: 0 }
  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i]
    const b = line[i + 1]
    const r = segmentInfo(x, z, a.x, a.z, b.x, b.z)
    if (r.d < best.d) best = { d: r.d, i, t: r.t }
  }
  const a = line[best.i]
  const b = line[best.i + 1]
  for (const k of keys) best[k] = a[k] + (b[k] - a[k]) * best.t
  return best
}

// kotak batas sebuah garis berliku (+ jarak tambahan)
export function polyBox(line, pad) {
  const xs = line.map(p => p.x)
  const zs = line.map(p => p.z)
  return { x0: Math.min(...xs) - pad, x1: Math.max(...xs) + pad, z0: Math.min(...zs) - pad, z1: Math.max(...zs) + pad }
}

export const inBox = (x, z, b) => x >= b.x0 && x <= b.x1 && z >= b.z0 && z <= b.z1

// jarak bertanda ke persegi panjang sejajar sumbu (negatif = di dalam)
export function rectDist(x, z, r) {
  const dx = Math.max(r.x0 - x, x - r.x1)
  const dz = Math.max(r.z0 - z, z - r.z1)
  return Math.hypot(Math.max(dx, 0), Math.max(dz, 0)) + Math.min(Math.max(dx, dz), 0)
}

// ------------------------------------------------------------------ daratan
// kotak yang memuat daratan + paparannya (di luar ini = dasar laut, tanpa noise)
export const BOX = { x0: 300, x1: 1440, z0: -580, z1: 540 }
// daratan utama: elips berkelok (garis pantai x ±420 di barat, berhadapan dengan Pulau Tropis)
export const LAND = { x: 890, z: -20, rx: 470, rz: 475, wobble: 0.1, seed: 61 }
export const landDistance = (x, z) => Math.hypot((x - LAND.x) / LAND.rx, (z - LAND.z) / LAND.rz)
// awal "dingin": warna salju, air dingin, cuaca — di timur garis ini (Pulau Tropis berakhir ±x 255)
export const COLD_X0 = 300
export const COLD_X1 = 380

// Pegunungan: tulang punggung (ruas-ruas) dengan lebar w dan tinggi dasar y — di sepanjangnya
// gunung bergerigi dibentuk noise "ridged multifractal" (igir tajam, lembah sempit di antaranya)
export const RANGES = [
  // rangkaian utara: bahu kastel → punggung timur laut
  { a: { x: 1045, z: -440 }, b: { x: 1160, z: -340 }, w: 125, y: 70 },
  { a: { x: 1160, z: -330 }, b: { x: 1330, z: -300 }, w: 130, y: 80 },
  // punggung tengah: di atas Gua Es Kristal → Puncak Taring Es → ke selatan sepanjang pantai timur
  { a: { x: 1050, z: -270 }, b: { x: 1200, z: -170 }, w: 120, y: 90 },
  { a: { x: 1200, z: -170 }, b: { x: 1320, z: 40 }, w: 125, y: 80 },
  { a: { x: 1320, z: 40 }, b: { x: 1240, z: 270 }, w: 135, y: 75 },
  // punggung selatan Lembah Atas — ditembus Celah Tersembunyi
  { a: { x: 985, z: 32 }, b: { x: 1230, z: 70 }, w: 70, y: 60 },
  // bahu barat daya kastel (jalan berkelok naik di lerengnya)
  { a: { x: 900, z: -250 }, b: { x: 1000, z: -380 }, w: 85, y: 30 },
]
// puncak bernama / ditegaskan: { x, z, h (tinggi tambahan di puncak), r }
export const PEAKS = [
  { id: 'taring', name: 'Puncak Taring Es', x: 1200, z: -170, h: 85, r: 90 },
  { id: 'utara', name: 'Puncak Utara', x: 1150, z: -380, h: 40, r: 80 },
  { id: 'selatan', name: 'Puncak Selatan', x: 1250, z: 200, h: 50, r: 90 },
  // bukit-bukit rendah di lembah (barat laut desa, barat daya hutan)
  { id: 'bukit-utara', x: 640, z: -300, h: 34, r: 110 },
  { id: 'bukit-selatan', x: 600, z: 330, h: 24, r: 120 },
  { id: 'bukit-hutan', x: 880, z: 380, h: 30, r: 95 },
]

// ------------------------------------------------------------------ kawasan diratakan
export const VILLAGE = { x0: 625, z0: -100, x1: 760, z1: 12, y: 9.5 } // Desa Emberwick
export const SQUARE = { x0: 676, z0: -58, x1: 712, z1: -26 } // alun-alun & pasar desa
export const CASTLE = { x0: 955, z0: -372, x1: 1045, z1: -290, y: 72 } // Kastel Frostfall (di dalam tembok)
// teras di depan gerbang barat & di kaki tembok selatan (jalan berkelok berakhir di sini)
export const CASTLE_YARD = { x0: 925, z0: -352, x1: 960, z1: -304, y: 72 }
// ruang singgasana: menempel di tembok timur kastel, pintu menghadap barat (halaman)
export const HALL = { x0: 1009, z0: -345, x1: 1045, z1: -317, y: 72, wallH: 11, wall: 1.2 }
export const HIGH_VALLEY = { x0: 990, z0: -128, x1: 1125, z1: -58, y: 52, rise: 6 } // Lembah Atas
export const CLIFF_X = 980 // tebing Air Terjun Beku (Lembah Atas → lembah bawah)

// ------------------------------------------------------------------ Sungai Beku
// permukaan es sungai: y = tinggi es, w = lebar. Hulu di Lembah Atas, terjun di tebing, lalu
// berkelok ke barat daya sampai muara di pantai barat
export const RIVER = [
  { x: 1112, z: -92, y: 56.4, w: 7 },
  { x: 1040, z: -96, y: 53.3, w: 8 },
  { x: CLIFF_X + 1, z: -96, y: 51.6, w: 9 },
  { x: CLIFF_X - 4, z: -95, y: 19.6, w: 11 },
  { x: 930, z: -74, y: 18.4, w: 11 },
  { x: 885, z: -48, y: 16.6, w: 12 },
  { x: 838, z: -22, y: 14.2, w: 12 },
  { x: 790, z: 12, y: 11.6, w: 13 },
  { x: 740, z: 50, y: 8.8, w: 13 },
  { x: 680, z: 84, y: 6.4, w: 14 },
  { x: 610, z: 118, y: 4.2, w: 15 },
  { x: 540, z: 148, y: 2.4, w: 15 },
  { x: 472, z: 174, y: 1.0, w: 16 },
  { x: 425, z: 192, y: -0.6, w: 18 },
]
// tirai es berdiri sedikit di depan kaki tebing, condong ke belakang menempel ke bibir tebing
export const WATERFALL = { x: CLIFF_X - 6, z: -95, top: 51.6, bottom: 19.6, w: 10, lean: 5 }

// ------------------------------------------------------------------ jalan & jalan setapak
// titik { x, z, y } (y = tinggi permukaan jalan, null = ikut tanah), w = lebar
// jalan pantai: pangkal Dermaga Frostfall → gerbang barat desa
export const ROADS = [
  {
    id: 'pantai', w: 5, line: [
      { x: 470, z: 30, y: null }, { x: 530, z: 18, y: null }, { x: 585, z: -10, y: null }, { x: 625, z: -38, y: null },
    ],
  },
  // jalan desa: barat → alun-alun → timur laut
  { id: 'desa', w: 6, line: [{ x: 625, z: -40, y: 9.5 }, { x: 760, z: -40, y: 9.5 }] },
  { id: 'desa-utara', w: 4, line: [{ x: 694, z: -95, y: 9.5 }, { x: 694, z: 10, y: 9.5 }] },
  // jalan gunung ke kastel: berkelok-kelok naik di bahu barat daya
  {
    id: 'kastel', w: 5, bench: true, line: [
      { x: 760, z: -62, y: 9.5 }, { x: 800, z: -110, y: 13 }, { x: 852, z: -150, y: 21 }, { x: 905, z: -178, y: 32 },
      { x: 930, z: -205, y: 38 }, { x: 900, z: -240, y: 47 }, { x: 905, z: -262, y: 52 }, { x: 930, z: -280, y: 59.6 },
      { x: 938, z: -296, y: 64.1 }, { x: 942, z: -314, y: 68.7 }, { x: 948, z: -326, y: 72 }, { x: 958, z: -331, y: 72 },
    ],
  },
]
// jalan setapak (lebih sempit, jejak di salju)
export const TRAILS = [
  // desa → Jembatan Desa → hutan selatan
  {
    id: 'hutan', w: 3, line: [
      { x: 700, z: 12, y: null }, { x: 712, z: 40, y: null }, { x: 717, z: 66, y: null }, { x: 722, z: 92, y: null },
      { x: 745, z: 150, y: null }, { x: 790, z: 210, y: null }, { x: 860, z: 262, y: null }, { x: 935, z: 300, y: null },
    ],
  },
  { id: 'kemah-barat', w: 2.6, line: [{ x: 745, z: 150, y: null }, { x: 700, z: 210, y: null }, { x: 690, z: 268, y: null }] },
  { id: 'kemah-timur', w: 2.6, line: [{ x: 935, z: 300, y: null }, { x: 985, z: 255, y: null }, { x: 1020, z: 175, y: null }] },
  // tepi sungai → Jembatan Lembah → naik ke Lembah Atas di lereng selatan tebing
  {
    id: 'lembah', w: 3.4, bench: true, line: [
      { x: 768, z: -40, y: 9.5 }, { x: 818, z: -52, y: 12.6 }, { x: 866, z: -66, y: 17.4 },
      { x: 888, z: -32, y: 17.4 }, { x: 930, z: -22, y: 24 }, { x: 962, z: -28, y: 33 }, { x: 988, z: -42, y: 42 },
      { x: 1006, z: -60, y: 50 }, { x: 1020, z: -72, y: 53 },
    ],
  },
  // di dalam Lembah Atas: jembatan sungai → mulut gua
  { id: 'gua', w: 3, line: [{ x: 1020, z: -72, y: null }, { x: 1052, z: -86, y: null }, { x: 1060, z: -112, y: null }, { x: 1062, z: -126, y: null }] },
  // ujung utara jalan desa → mulut Tambang Tua di kaki bukit
  { id: 'tambang', w: 3, line: [{ x: 694, z: -95, y: null }, { x: 692, z: -140, y: null }, { x: 688, z: -180, y: null }, { x: 688, z: -200, y: null }] },
  // Lembah Atas → mulut Katedral Taring (ujung timur lembah)
  { id: 'katedral', w: 3, line: [{ x: 1062, z: -92, y: null }, { x: 1100, z: -96, y: null }, { x: 1122, z: -95, y: null }] },
  // kemah timur → mulut Gua Seribu Tiang
  { id: 'tiang', w: 2.8, line: [{ x: 1020, z: 175, y: null }, { x: 1080, z: 160, y: null }, { x: 1130, z: 138, y: null }, { x: 1158, z: 130, y: null }] },
]
// Celah Tersembunyi: ngarai sempit menembus punggung R2 dari hutan ke Lembah Atas (y = lantai)
export const GORGE = [
  { x: 1046, z: 168, y: 24, w: 7 },
  { x: 1052, z: 118, y: 30, w: 6 },
  { x: 1062, z: 60, y: 39, w: 5.5 },
  { x: 1066, z: 6, y: 46, w: 5.5 },
  { x: 1064, z: -40, y: 51.5, w: 7 },
  { x: 1062, z: -62, y: 52, w: 9 },
]

// ------------------------------------------------------------------ jembatan kayu
// { id, name, x, z, rot (arah panjang jembatan, rotation.y), len, w }
export const BRIDGES = [
  { id: 'desa', name: 'Jembatan Desa', x: 716, z: 66, rot: 0.13, len: 26, w: 3.6 },
  { id: 'lembah', name: 'Jembatan Lembah', x: 878, z: -50, rot: 0.48, len: 24, w: 3.4 },
  { id: 'atas', name: 'Jembatan Lembah Atas', x: 1050, z: -92, rot: -0.15, len: 15, w: 3 },
]

// ------------------------------------------------------------------ dermaga
// seperti Aeloria (dockSpans): dicari dari darat (from) ke laut (dir) sampai tepi pantai
export const DOCKS = [
  { id: 'frostfall', name: 'Dermaga Frostfall', axis: 'x', at: 30, from: 520, dir: -1, len: 38, width: 4.5 },
  { id: 'fajar', name: 'Dermaga Fajar', axis: 'x', at: 40, from: 200, dir: 1, len: 34, width: 4 },
]
// cekungan pelabuhan di sekeliling Dermaga Frostfall: pantai barat Frostfall sangat landai (air
// sedalam 1,5 m baru ±30 m dari garis pantai), tanpa ini ujung dermaga berdiri di pasir
export const HARBOR = { x0: 385, x1: 437, z0: 21, z1: 39, y: -2.4, fall: 7 }

// ------------------------------------------------------------------ hutan & kemah pemburu
export const FOREST = { x0: 540, z0: 110, x1: 1180, z1: 470 }
export const CAMPS = [
  { id: 'kemah-barat', x: 690, z: 276, rot: 0.6 },
  { id: 'kemah-timur', x: 1022, z: 172, rot: -2.2 },
  { id: 'kemah-gunung', x: 1102, z: -84, rot: 2.6 }, // di Lembah Atas, dekat hulu sungai
]

// ------------------------------------------------------------------ kampung penduduk (v0.22.0)
// Dua kampung baru di dataran barat, masing-masing pad rata (height.js) dengan 20 rumah keluarga di
// empat baris yang menghadap dua lorong melintang (lanes, z), dipotong lorong membujur (lane, x)
// yang melewati lapangan kampung (plaza: api unggun bersama). rows[0] & rows[2] menghadap selatan
// (rot 0), rows[1] & rows[3] menghadap utara; xs = tengah rumah di tiap baris.
export const HAMLETS = [
  {
    id: 'nelayan', name: 'Kampung Teluk Salju', short: 'Teluk Salju', sub: 'Kampung nelayan di pantai barat · ikan asap & perahu',
    x0: 462, z0: -96, x1: 536, z1: -20, y: 3.2,
    lane: 504, lanes: [-77, -35], rows: [-87, -67, -45, -25], xs: [469, 481.5, 494, 514, 526.5], plaza: { x: 504, z: -56 },
    // lorong ke jalan pantai (selatan) & ke pantai (barat: perahu, rak ikan, dermaga kecil)
    paths: [[{ x: 504, z: -20 }, { x: 504, z: 22 }], [{ x: 462, z: -56 }, { x: 446, z: -56 }]],
  },
  {
    id: 'pemburu', name: 'Kampung Rusa Putih', short: 'Rusa Putih', sub: 'Kampung pemburu di tepi Hutan Pinus Salju',
    x0: 766, z0: 100, x1: 840, z1: 174, y: 16.2,
    lane: 809, lanes: [116, 157], rows: [105, 127, 146, 168], xs: [773, 785, 797, 821, 833], plaza: { x: 809, z: 136.5 },
    // lorong ke jalan setapak hutan (barat) & ke hutan perburuan (selatan)
    paths: [[{ x: 766, z: 136.5 }, { x: 740, z: 136.5 }], [{ x: 809, z: 174 }, { x: 796, z: 206 }]],
  },
]
// ------------------------------------------------------------------ pagar tinggi desa (v0.23.0)
// Pagar kayu gelondong runcing (±4 m) mengelilingi tiap desa, di atas pad rata desanya (4–5 m di luar
// kawasan desa). loop = sudut-sudut keliling (tertutup); gates = gerbang terbuka { x, z, w } tepat di
// sisi keliling, di setiap jalan / lorong / setapak yang keluar dari desa; jalur = sambungan jaringan
// jalan penduduk (tidak dicat) yang melewati gerbang itu, bila jalan di kedua sisinya belum tersambung
// (dulu penduduk berjalan lurus saja di situ — kini akan menabrak pagar). Garis lurus sejajar sumbu
// sengaja di x / z ganjil: tepat di tengah sel kisi penghalang penduduk (2 m, warga.js), jadi
// penduduk tidak pernah "menembus" pagar. Sudut barat daya Rusa Putih dipotong miring supaya setapak
// hutan tidak menyerempet pagar.
export const FENCES = [
  {
    id: 'desa', y: VILLAGE.y,
    loop: [{ x: 621, z: -105 }, { x: 765, z: -105 }, { x: 765, z: 17 }, { x: 621, z: 17 }],
    gates: [
      { x: 621, z: -37, w: 14 }, // barat: jalan pantai (api unggun gerbang barat di luarnya)
      { x: 765, z: -40, w: 12, jalur: [{ x: 760, z: -40 }, { x: 768, z: -40 }] }, // timur: setapak Lembah Atas
      { x: 765, z: -68, w: 12, jalur: [{ x: 756, z: -65.5 }, { x: 760, z: -62 }] }, // timur: jalan gunung ke kastel
      { x: 694, z: -105, w: 12 }, // utara: setapak Tambang Tua
      { x: 701, z: 17, w: 12, jalur: [{ x: 694, z: 10 }, { x: 700, z: 12 }] }, // selatan: setapak hutan & Jembatan Desa
    ],
  },
  {
    id: 'nelayan', y: 3.2,
    loop: [{ x: 463, z: -101 }, { x: 541, z: -101 }, { x: 541, z: -15 }, { x: 463, z: -15 }],
    gates: [
      { x: 504, z: -15, w: 12 }, // selatan: lorong ke jalan pantai
      // barat: ke pantai, perahu & dermaga kecil (jalur: di belakang baris rumah utara, ke lorong tengah)
      { x: 463, z: -56, w: 10, jalur: [{ x: 462, z: -56 }, { x: 467, z: -62 }, { x: 504, z: -63 }] },
    ],
  },
  {
    id: 'pemburu', y: 16.2,
    loop: [{ x: 761, z: 95 }, { x: 845, z: 95 }, { x: 845, z: 179 }, { x: 771, z: 179 }, { x: 761, z: 165 }],
    gates: [
      // barat: lorong ke setapak hutan (jalur: di belakang baris rumah utara, ke lorong tengah)
      { x: 761, z: 136.5, w: 10, jalur: [{ x: 766, z: 136.5 }, { x: 770, z: 131 }, { x: 809, z: 130 }] },
      { x: 806, z: 179, w: 12 }, // selatan: ke hutan perburuan
    ],
  },
]

// dermaga kecil nelayan Teluk Salju (dari pantai ke laut, ke barat): lantai setinggi deck
export const PIER = { x0: 420, x1: 450, z: -56, w: 2.6, deck: 1.3 }
// kawanan rusa kutub di hutan perburuan: pusat & jari-jari wilayah jelajah
export const HERDS = [
  { x: 700, z: 300, r: 55, n: 7 },
  { x: 880, z: 300, r: 60, n: 8 },
  { x: 1000, z: 230, r: 45, n: 6 },
]

// ------------------------------------------------------------------ Gua Es Kristal
// rongga di dalam punggung R1: bentuk { kind: 'bulat' x z r | 'lorong' a b w } + tinggi lantai
// y (lorong: ya → yb). Atapnya permukaan gunung asli (lihat height.js / gua.js)
export const CAVE = [
  // lorong masuk dari Lembah Atas (mulut di dinding utara lembah)
  { kind: 'lorong', a: { x: 1062, z: -130 }, b: { x: 1068, z: -168 }, ya: 55.2, yb: 54.3, w: 11 },
  // Balairung Es: rongga utama dengan danau beku
  { kind: 'bulat', x: 1074, z: -200, r: 28, y: 54 },
  // Lorong Gema: cabang buntu ke barat, gua kristal kecil
  { kind: 'lorong', a: { x: 1052, z: -198 }, b: { x: 1022, z: -190 }, ya: 54, yb: 54.6, w: 9 },
  { kind: 'bulat', x: 1016, z: -188, r: 10, y: 54.6 },
  // Galeri Kristal ke timur
  { kind: 'lorong', a: { x: 1096, z: -212 }, b: { x: 1142, z: -232 }, ya: 54.4, yb: 56.4, w: 14 },
  // celah sempit ke Ruang Harta
  { kind: 'lorong', a: { x: 1142, z: -232 }, b: { x: 1160, z: -262 }, ya: 56.4, yb: 57.8, w: 7 },
  { kind: 'bulat', x: 1166, z: -274, r: 12, y: 58 },
  // lorong rahasia ke ruang singgasana kastel (naik ke utara-barat)
  { kind: 'lorong', a: { x: 1064, z: -224 }, b: { x: 1068, z: -268 }, ya: 54, yb: 57, w: 8 },
  { kind: 'lorong', a: { x: 1068, z: -268 }, b: { x: 1058, z: -322 }, ya: 57, yb: 62.5, w: 8 },
  { kind: 'lorong', a: { x: 1058, z: -322 }, b: { x: 1042, z: -339 }, ya: 62.5, yb: 66.5, w: 7 },
  // tangga rahasia: dari lantai ruang singgasana (di samping-belakang singgasana) turun ke timur,
  // di bawah tembok timur kastel. Tertutup lempeng lantai sampai dibuka (lihat plan.js / main.js)
  { kind: 'lorong', a: { x: 1042, z: -339 }, b: { x: 1024, z: -339 }, ya: 66.5, yb: HALL.y, w: 4.5, stair: true },
]
// lempeng lantai yang menutup tangga rahasia (di atas lubang tangga, setinggi lantai aula)
export const TRAPDOOR = { x: 1032.5, z: -339, hx: 9, hz: 2.6, y: HALL.y }
export const THRONE = { x: 1040, z: -331, rot: -Math.PI / 2 } // singgasana menghadap barat (pintu)
export const LAKE = { x: 1078, z: -204, rx: 15, rz: 10, y: 53.3 } // danau bawah tanah (beku)
export const TREASURE = { x: 1170, z: -278, rot: -2.4 } // peti harta di Ruang Harta
export const CAVE_MOUTH = { x: 1062, z: -124 }
// tinggi rongga minimum: di bawah ini atap tidak dibuat (mulut gua & lubang tangga terbuka)
export const ROOF_MIN = 5

// ------------------------------------------------------------------ semua gua (v0.20.0: + 5 gua besar)
// Tiap gua = sistem rongga sendiri (atap, kegelapan, nama di spanduk & peta):
//   shapes : bentuk rongga seperti CAVE ('bulat' / 'lorong', tinggi lantai)
//   mouths : mulut gua { x, z, r, w, h } (bingkai batu w × h menghadap keluar lorong pertama) — batu penutup
//            (height.js) tidak menimbun mulutnya, jadi lorong masuk terbuka ke lereng / pantai
//   lakes  : danau / laguna beku { x, z, rx, rz, y }
//   chest  : peti harta { x, z, koin, key (localStorage) } — menghadap titik rute sebelum ujungnya
//   route  : jalan dari luar mulut sampai peti — dijaga bebas dari tiang & dipakai uji otomatis
//   tema   : isi gua (plan.js): kristal · tambang · gletser · katedral · laut · tiang
//   gelap  : seberapa gelap bagian dalamnya (bawaan 1)
//   suasana: warna kabut / cahaya di dalamnya { kabut, langit, tanah, terang } (bawaan: biru gelap)
export const CAVES = [
  {
    id: 'kristal', name: 'Gua Es Kristal', short: 'Gua Es', sub: 'Gua beku di dalam gunung · kristal bercahaya', tema: 'kristal',
    shapes: CAVE, mouths: [], lakes: [LAKE], label: { x: 1112, z: -238 },
    chest: { ...TREASURE, koin: 150, key: 'pulau-tropis:harta-frostfall', pesan: 'Harta Raja Frostfall!' },
    route: [{ x: 1062, z: -118 }, { x: 1062, z: -130 }, { x: 1068, z: -168 }, { x: 1080, z: -200 }, { x: 1096, z: -212 }, { x: 1142, z: -232 }, { x: 1160, z: -262 }, { x: 1168, z: -274 }],
  },
  {
    // bukit di barat laut Desa Emberwick: tambang kristal tua, lorongnya turun ke urat kristal ungu
    id: 'tambang', name: 'Tambang Tua Emberwick', short: 'Tambang Tua', sub: 'Tambang kristal yang ditinggalkan penduduk desa', tema: 'tambang',
    gelap: 0.55, // diterangi lentera penambang: tidak segelap gua alam
    shapes: [
      { kind: 'lorong', a: { x: 686, z: -208 }, b: { x: 658, z: -270 }, ya: 16.6, yb: 16, w: 8 },
      { kind: 'bulat', x: 650, z: -284, r: 20, y: 16 }, // Aula Tambang
      { kind: 'lorong', a: { x: 660, z: -295 }, b: { x: 690, z: -320 }, ya: 16, yb: 16.4, w: 7 }, // terowongan buntu
      { kind: 'lorong', a: { x: 640, z: -292 }, b: { x: 604, z: -331 }, ya: 16, yb: 9, w: 8 }, // turunan
      { kind: 'bulat', x: 598, z: -338, r: 15, y: 9 }, // Urat Kristal
    ],
    mouths: [{ x: 688, z: -203, r: 12, w: 9, h: 6 }],
    lakes: [], label: { x: 650, z: -322 },
    chest: { x: 594, z: -343, koin: 60, key: 'pulau-tropis:peti-gua-tambang', pesan: 'Peti para penambang!' },
    route: [{ x: 690, z: -194 }, { x: 686, z: -208 }, { x: 658, z: -270 }, { x: 650, z: -284 }, { x: 640, z: -292 }, { x: 604, z: -331 }, { x: 599, z: -337 }],
  },
  {
    // pantai utara di bawah pegunungan utara: gua gletser berdinding es biru, air terjun beku di dalam
    id: 'gletser', name: 'Gua Gletser Utara', short: 'Gua Gletser', sub: 'Es biru purba di bawah pegunungan utara', tema: 'gletser',
    shapes: [
      { kind: 'lorong', a: { x: 1055, z: -451 }, b: { x: 1090, z: -402 }, ya: 1.4, yb: 9, w: 11 },
      { kind: 'bulat', x: 1100, z: -386, r: 26, y: 9 }, // Aula Gletser
      { kind: 'lorong', a: { x: 1118, z: -373 }, b: { x: 1150, z: -340 }, ya: 9, yb: 11.5, w: 14, minSteps: 3.6 }, // diagonal; lebar untuk deretan lengkung es
      { kind: 'bulat', x: 1160, z: -332, r: 18, y: 11.5 }, // Ruang Air Terjun Beku
    ],
    mouths: [{ x: 1052, z: -456, r: 13, w: 11, h: 7 }],
    // Aula Gletser mengikuti gambar konsep pengguna (v0.21.0): kolam berair (air: tinggi permukaan air)
    // tempat jatuhnya air terjun yang mengalir, deretan lengkung es ke arah lorong berikutnya, tebing
    // bersalju untuk memandang, suasana biru-toska yang lebih terang
    lakes: [{ x: 1112, z: -397, rx: 8.5, rz: 7.5, y: 7.6, air: 8.45 }], label: { x: 1100, z: -418 },
    gelap: 0.72,
    suasana: { kabut: '#1b6577', langit: '#8ae4f2', tanah: '#0f3a47', terang: 0.95 },
    konsep: { aula: { x: 1100, z: -386, y: 9 }, lengkung: [{ x: 1110, z: -376 }, { x: 1124, z: -366 }, { x: 1133, z: -357.5 }], tebing: { x: 1092, z: -380 } },
    chest: { x: 1160, z: -340, koin: 90, key: 'pulau-tropis:peti-gua-gletser', pesan: 'Peti yang membeku di dalam gletser!' },
    // Naga Es penjaga (v0.24.0; v0.24.1 lebih kecil): tidur meringkuk di Ruang Air Terjun Beku, peti di lekuk
    // kanan antara badan & ekornya, menghadap pintu ruang (rot = arah hadap). Saat bertarung titik akar
    // badannya tetap di dalam arena (lingkaran di tengah ruang); bangun bila penyusup masuk sejauh `bangun` m
    // dari tengah ruang
    naga: { x: 1156.6, z: -337.7, rot: -1.92, arena: { x: 1160, z: -332, r: 10 }, bangun: 26, lepas: 46 },
    route: [{ x: 1040, z: -449 }, { x: 1055, z: -451 }, { x: 1090, z: -402 }, { x: 1108, z: -378 }, { x: 1118, z: -373 }, { x: 1150, z: -340 }, { x: 1155, z: -335 }],
  },
  {
    // rongga raksasa di bawah Puncak Taring Es (masuk dari ujung timur Lembah Atas), tiang es raksasa
    id: 'katedral', name: 'Katedral Taring', short: 'Katedral Taring', sub: 'Rongga raksasa di bawah Puncak Taring Es', tema: 'katedral',
    shapes: [
      { kind: 'lorong', a: { x: 1128, z: -97 }, b: { x: 1182, z: -115 }, ya: 57.8, yb: 60, w: 12 },
      { kind: 'bulat', x: 1210, z: -124, r: 34, y: 60 }, // katedral
      { kind: 'lorong', a: { x: 1222, z: -152 }, b: { x: 1236, z: -178 }, ya: 60, yb: 63, w: 10 },
      { kind: 'bulat', x: 1240, z: -186, r: 16, y: 63 }, // Kolam Taring
    ],
    mouths: [{ x: 1124, z: -95, r: 12, w: 12, h: 8 }],
    lakes: [{ x: 1248, z: -184, rx: 7, rz: 6, y: 62.4 }], label: { x: 1210, z: -78 },
    chest: { x: 1236, z: -192, koin: 120, key: 'pulau-tropis:peti-gua-katedral', pesan: 'Persembahan di altar Katedral Taring!' },
    route: [{ x: 1118, z: -93 }, { x: 1128, z: -97 }, { x: 1182, z: -115 }, { x: 1206, z: -128 }, { x: 1222, z: -152 }, { x: 1236, z: -178 }, { x: 1237, z: -186 }],
  },
  {
    // tebing pantai timur: gua laut dengan laguna beku & bangkai kapal — hanya lewat laut
    id: 'laut', name: 'Gua Laut Beku', short: 'Gua Laut Beku', sub: 'Laguna beku di balik tebing pantai timur', tema: 'laut',
    shapes: [
      { kind: 'lorong', a: { x: 1372, z: -4 }, b: { x: 1306, z: -13 }, ya: 0.9, yb: 1.9, w: 12 },
      { kind: 'bulat', x: 1288, z: -14, r: 26, y: 1.9 }, // laguna
      { kind: 'lorong', a: { x: 1284, z: -32 }, b: { x: 1295, z: -68 }, ya: 1.9, yb: 3.4, w: 9 },
      { kind: 'bulat', x: 1298, z: -76, r: 13, y: 3.4 }, // Ceruk Karang Es
    ],
    mouths: [{ x: 1372, z: -3, r: 16, w: 12, h: 7 }],
    lakes: [{ x: 1284, z: -8, rx: 15, rz: 11, y: 1.3 }], label: { x: 1330, z: 26 },
    chest: { x: 1300, z: -80, koin: 150, key: 'pulau-tropis:peti-gua-laut', pesan: 'Harta bajak laut yang terdampar!' },
    route: [{ x: 1380, z: -4 }, { x: 1372, z: -4 }, { x: 1306, z: -13 }, { x: 1290, z: -28 }, { x: 1284, z: -32 }, { x: 1295, z: -68 }, { x: 1298, z: -74 }],
  },
  {
    // punggung tenggara, masuk dari hutan: rongga besar penuh tiang batu & es
    id: 'tiang', name: 'Gua Seribu Tiang', short: 'Gua Seribu Tiang', sub: 'Hutan tiang batu & es di dalam gunung', tema: 'tiang',
    shapes: [
      { kind: 'lorong', a: { x: 1160, z: 128 }, b: { x: 1216, z: 123 }, ya: 20.4, yb: 27, w: 12 },
      { kind: 'bulat', x: 1242, z: 124, r: 32, y: 27 }, // Hutan Tiang
      { kind: 'lorong', a: { x: 1250, z: 94 }, b: { x: 1260, z: 72 }, ya: 27, yb: 29.5, w: 10 },
      { kind: 'bulat', x: 1262, z: 62, r: 15, y: 29.5 }, // Ruang Tiang Kembar
    ],
    mouths: [{ x: 1156, z: 129, r: 12, w: 12, h: 8 }],
    lakes: [], label: { x: 1240, z: 170 },
    chest: { x: 1264, z: 57, koin: 90, key: 'pulau-tropis:peti-gua-tiang', pesan: 'Peti tersembunyi di antara tiang kembar!' },
    route: [{ x: 1150, z: 130 }, { x: 1160, z: 128 }, { x: 1216, z: 123 }, { x: 1238, z: 112 }, { x: 1250, z: 94 }, { x: 1260, z: 72 }, { x: 1263, z: 63 }],
  },
]

// ------------------------------------------------------------------ nama kawasan (spanduk & peta)
export const REGIONS = [
  { id: 'singgasana', name: 'Ruang Singgasana', sub: 'Kastel Frostfall · sunyi dan membeku', rect: { x0: HALL.x0, z0: HALL.z0, x1: HALL.x1, z1: HALL.z1 } },
  { id: 'kastel', name: 'Kastel Frostfall', sub: 'Kastel tua di bahu gunung, ditinggalkan rajanya', rect: { x0: CASTLE.x0 - 4, z0: CASTLE.z0 - 4, x1: CASTLE.x1 + 4, z1: CASTLE.z1 + 4 } },
  { id: 'desa', name: 'Desa Emberwick', sub: 'Desa kayu yang hangat di Lembah Beku', rect: { x0: VILLAGE.x0 - 6, z0: VILLAGE.z0 - 6, x1: VILLAGE.x1 + 6, z1: VILLAGE.z1 + 6 } },
  { id: 'lembah-atas', name: 'Lembah Atas', sub: 'Lembah gletser · hulu Sungai Beku', rect: { x0: HIGH_VALLEY.x0, z0: HIGH_VALLEY.z0 - 6, x1: HIGH_VALLEY.x1 + 10, z1: HIGH_VALLEY.z1 + 4 } },
  { id: 'celah', name: 'Celah Tersembunyi', sub: 'Ngarai sempit menembus gunung', line: GORGE, width: 9 },
  ...HAMLETS.map(h => ({ id: h.id, name: h.name, sub: h.sub, rect: { x0: h.x0 - 6, z0: h.z0 - 6, x1: h.x1 + 6, z1: h.z1 + 6 } })),
  { id: 'hutan', name: 'Hutan Pinus Salju', sub: 'Hutan lebat · tempat berburu rusa kutub', rect: FOREST },
]
