import { TEGAL } from './layout.js'

// Barisan bala tentara Kerajaan Kencana di Tegal Wira (Pulau Wira): 25.000 prajurit siap tempur,
// 5.000 per pasukan, menghadap ke utara — ke Siti Hinggil (panggung kehormatan) dan Kotaraja.
// Gelar perang klasik: barisan perisai paling depan, lalu tombak, pedang, pemanah di belakang,
// pasukan berkuda di sayap kiri dan kanan. Murni data (tanpa Three.js): letak setiap prajurit,
// lorong untuk berjalan di antara barisan, penghalang, dan kotak warna untuk peta.

// urutan = indeks jenis (dipakai juga oleh penggambar pasukan)
export const DIVISIONS = [
  { id: 'perisai', name: 'Pasukan perisai', count: 5000, flag: 0, map: '#d8463c' },
  { id: 'tombak', name: 'Pasukan tombak', count: 5000, flag: 3, map: '#4f78d0' },
  { id: 'pedang', name: 'Pasukan pedang', count: 5000, flag: 4, map: '#3f9f6a' },
  { id: 'pemanah', name: 'Pasukan pemanah', count: 5000, flag: 1, map: '#e3b43a' },
  { id: 'kavaleri', name: 'Pasukan berkuda', count: 5000, flag: 2, map: '#e9e6dc' },
]
// para senapati (perwira berkuda di depan barisan) — di luar hitungan 25.000 prajurit
export const OFFICER = { id: 'senapati', name: 'Senapati' }
export const HEADING = Math.PI // semua menghadap utara (−z)

const CX = (TEGAL.x0 + TEGAL.x1) / 2
export const FRONT = TEGAL.z0 + 30 // garis depan barisan perisai

// pejalan kaki: 200 banjar × 25 baris per pasukan, lorong 4 m tiap 50 banjar, jarak antarpasukan 6 m
const INF = { files: 200, ranks: 25, sx: 1.2, sz: 1.35, group: 50, lane: 4, gap: 6 }
// pasukan berkuda: dua sayap, masing-masing 50 banjar × 50 baris, lorong 4 m di tengah
const CAV = { files: 50, ranks: 50, sx: 1.35, sz: 2.75, group: 25, lane: 4, gap: 10 }
// setengah lebar/panjang badan prajurit (kotak penghalang di tepi barisan)
const BODY = { inf: [0.55, 0.6], cav: [0.55, 1.35] }

const spanOf = (n, s, group, lane) => (n - 1) * s + (Math.ceil(n / group) - 1) * lane
const fileX = (x0, f, s, group, lane) => x0 + f * s + Math.floor(f / group) * lane

// hash 0..1 per prajurit (fase animasi, sedikit variasi) — tetap sama setiap kali dimuat
function hash(i) {
  let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

// Semua prajurit + perwira. Hasil:
//  soldiers: { count, x, z, type (Uint8), phase } — type = indeks DIVISIONS, 5 = senapati
//  blocks: kotak barisan { type, x0, x1, z0, z1 } (penghalang + peta), lanes: jalur tanah [ax, az, bx, bz, w]
export function formation() {
  const total = DIVISIONS.reduce((n, d) => n + d.count, 0)
  const officers = []
  const blocks = []
  const lanes = []
  const x = new Float32Array(total + 8)
  const z = new Float32Array(total + 8)
  const type = new Uint8Array(total + 8)
  let n = 0
  const put = (px, pz, t) => {
    x[n] = px
    z[n] = pz
    type[n] = t
    n++
  }

  // --- pejalan kaki: empat barisan berlapis dari depan ke belakang
  const infW = spanOf(INF.files, INF.sx, INF.group, INF.lane)
  const infD = (INF.ranks - 1) * INF.sz
  const ix0 = CX - infW / 2
  for (let d = 0; d < 4; d++) {
    const z0 = FRONT + d * (infD + INF.gap)
    for (let r = 0; r < INF.ranks; r++)
      for (let f = 0; f < INF.files; f++) put(fileX(ix0, f, INF.sx, INF.group, INF.lane), z0 + r * INF.sz, d)
    for (let g = 0; g < INF.files / INF.group; g++) {
      const a = fileX(ix0, g * INF.group, INF.sx, INF.group, INF.lane)
      const b = fileX(ix0, (g + 1) * INF.group - 1, INF.sx, INF.group, INF.lane)
      blocks.push({ type: d, x0: a - BODY.inf[0], x1: b + BODY.inf[0], z0: z0 - BODY.inf[1], z1: z0 + infD + BODY.inf[1] })
    }
  }
  const infBack = FRONT + 3 * (infD + INF.gap) + infD

  // --- dua sayap pasukan berkuda, sejajar garis depan
  const cavW = spanOf(CAV.files, CAV.sx, CAV.group, CAV.lane)
  const cavD = (CAV.ranks - 1) * CAV.sz
  const wings = [CX - infW / 2 - CAV.gap - cavW, CX + infW / 2 + CAV.gap]
  for (const wx0 of wings) {
    for (let r = 0; r < CAV.ranks; r++)
      for (let f = 0; f < CAV.files; f++) put(fileX(wx0, f, CAV.sx, CAV.group, CAV.lane), FRONT + r * CAV.sz, 4)
    for (let g = 0; g < CAV.files / CAV.group; g++) {
      const a = fileX(wx0, g * CAV.group, CAV.sx, CAV.group, CAV.lane)
      const b = fileX(wx0, (g + 1) * CAV.group - 1, CAV.sx, CAV.group, CAV.lane)
      blocks.push({ type: 4, x0: a - BODY.cav[0], x1: b + BODY.cav[0], z0: FRONT - BODY.cav[1], z1: FRONT + cavD + BODY.cav[1] })
    }
  }

  // --- senapati berkuda di depan tiap pasukan + senapati agung di tengah depan
  const cavCenters = wings.map(w => w + cavW / 2)
  for (const px of [cavCenters[0], CX - 96, CX - 32, CX + 32, CX + 96, cavCenters[1]]) officers.push({ x: px, z: FRONT - 9 })
  officers.push({ x: CX, z: FRONT - 20, chief: true })
  for (const o of officers) put(o.x, o.z, 5)

  // --- lorong tanah: antar-kelompok (utara-selatan), antar-pasukan (barat-timur), tepi sayap
  for (let g = 1; g < INF.files / INF.group; g++) {
    const lx = fileX(ix0, g * INF.group, INF.sx, INF.group, INF.lane) - (INF.lane + INF.sx) / 2
    lanes.push([lx, FRONT - 3, lx, infBack + 3, INF.lane - 0.4])
  }
  for (let d = 1; d < 4; d++) {
    const lz = FRONT + d * (infD + INF.gap) - (INF.gap + INF.sz) / 2
    lanes.push([ix0 - 2, lz, ix0 + infW + 2, lz, INF.gap - 0.6])
  }
  for (const wx0 of wings) {
    const lx = fileX(wx0, CAV.group, CAV.sx, CAV.group, CAV.lane) - (CAV.lane + CAV.sx) / 2
    lanes.push([lx, FRONT - 3, lx, FRONT + cavD + 3, CAV.lane - 0.4])
  }
  for (const lx of [ix0 - CAV.gap / 2, ix0 + infW + CAV.gap / 2]) lanes.push([lx, FRONT - 3, lx, Math.max(infBack, FRONT + cavD) + 3, CAV.gap - 1])

  const phase = new Float32Array(n)
  for (let i = 0; i < n; i++) phase[i] = hash(i)
  return {
    soldiers: { count: n, x: x.subarray(0, n), z: z.subarray(0, n), type: type.subarray(0, n), phase },
    total, // 25.000 (tanpa perwira)
    officers,
    blocks,
    lanes,
    bounds: { x0: wings[0] - 2, x1: wings[1] + cavW + 2, z0: FRONT - 22, z1: Math.max(infBack, FRONT + cavD) + 2 },
    heading: HEADING,
  }
}
