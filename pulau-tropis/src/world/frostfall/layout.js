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

// ------------------------------------------------------------------ nama kawasan (spanduk & peta)
export const REGIONS = [
  { id: 'singgasana', name: 'Ruang Singgasana', sub: 'Kastel Frostfall · sunyi dan membeku', rect: { x0: HALL.x0, z0: HALL.z0, x1: HALL.x1, z1: HALL.z1 } },
  { id: 'kastel', name: 'Kastel Frostfall', sub: 'Kastel tua di bahu gunung, ditinggalkan rajanya', rect: { x0: CASTLE.x0 - 4, z0: CASTLE.z0 - 4, x1: CASTLE.x1 + 4, z1: CASTLE.z1 + 4 } },
  { id: 'desa', name: 'Desa Emberwick', sub: 'Desa kayu yang hangat di Lembah Beku', rect: { x0: VILLAGE.x0 - 6, z0: VILLAGE.z0 - 6, x1: VILLAGE.x1 + 6, z1: VILLAGE.z1 + 6 } },
  { id: 'lembah-atas', name: 'Lembah Atas', sub: 'Lembah gletser · hulu Sungai Beku', rect: { x0: HIGH_VALLEY.x0, z0: HIGH_VALLEY.z0 - 6, x1: HIGH_VALLEY.x1 + 10, z1: HIGH_VALLEY.z1 + 4 } },
  { id: 'celah', name: 'Celah Tersembunyi', sub: 'Ngarai sempit menembus gunung', line: GORGE, width: 9 },
  { id: 'hutan', name: 'Hutan Pinus Salju', sub: 'Hutan lebat · kemah pemburu yang ditinggalkan', rect: FOREST },
]
