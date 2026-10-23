import * as THREE from 'three'
import { rng } from '../../core/random.js'
import { WARNA, BAGIAN, packDye, FADE } from './elf.js'
import { CITADEL } from './layout.js'

// Kehidupan Aeloria: 10.000 kesatria elf + ratusan penduduk yang masing-masing punya pikiran sendiri.
//
// Tiap elf punya nama, sifat (rajin, riang, ramah, rakus, pemalas, petualang, pemberani, pemarah)
// dan kebutuhan yang naik-turun (lapar, lelah, bosan, kesepian, ingin berlatih; penduduk: ingin
// bekerja). Setiap kali selesai berkegiatan, ia menimbang sendiri mau apa berikutnya — makan di
// Balai Makan (mengantre dulu di meja saji), berlatih tanding / memanah / baris / memukul boneka,
// berpesta & menari di Padang Pesta, mengobrol, minum di kedai, memancing atau duduk di pantai,
// bersantai di bawah pohon, berjalan-jalan, berbelanja di pasar, berjaga, tidur di tenda —
// berdasarkan kebutuhan, sifat, jarak, dan tempat yang masih kosong. Penduduk bekerja (berdagang,
// menempa, bertani, memasak, bermain musik, menjaga kedai), menimba air, berbelanja, mengobrol,
// pulang ke rumah; anak-anak bermain kejar-kejaran.
//
// Simulasinya berbasis kejadian: elf yang sedang berkegiatan tidak dihitung tiap bingkai, hanya
// saat kegiatannya selesai (antrean waktu). Elf yang berjalan menyusuri jaringan jalan (rute
// Dijkstra) letaknya dihitung dari waktu, jadi 10.000 elf tetap ringan. Yang digambar hanya yang
// dekat titik fokus & terlihat kamera: yang terdekat memakai model penuh (elf.js), sisanya model
// jauh yang lebih murah.

const KNIGHTS = 10000
// banyak elf yang digambar per bingkai: model penuh (terdekat) + model jauh
export const ELF_CAPS = {
  rendah: { near: 35, far: 200 },
  sedang: { near: 70, far: 380 },
  tinggi: { near: 140, far: 800 },
}
const WALK_ANIM = 1.4 // m/s yang cocok dengan klip walk pada kecepatan 1×
const RUN_ANIM = 4.0
const RUN_SPEED = 4.3
const STRAIGHT = 18 // m: sedekat ini langsung berjalan lurus tanpa jaringan jalan

// pasukan kesatria: nama, warna panji, warna zirah
export const PASUKAN = [
  { id: 'daun', name: 'Pasukan Daun', panji: WARNA.hijau, zirah: WARNA.perak },
  { id: 'bulan', name: 'Pasukan Bulan', panji: WARNA.biru, zirah: WARNA.putih },
  { id: 'fajar', name: 'Pasukan Fajar', panji: WARNA.kuning, zirah: WARNA.perak },
  { id: 'embun', name: 'Pasukan Embun', panji: WARNA.biruMuda, zirah: WARNA.putih },
  { id: 'senja', name: 'Pasukan Senja', panji: WARNA.ungu, zirah: WARNA.perak },
]
const SIFAT = ['rajin', 'riang', 'ramah', 'rakus', 'pemalas', 'petualang', 'pemberani', 'pemarah']
export const SIFAT_TEKS = {
  rajin: 'rajin berlatih', riang: 'suka berpesta', ramah: 'senang mengobrol', rakus: 'doyan makan',
  pemalas: 'suka bermalas-malasan', petualang: 'suka menjelajah', pemberani: 'pemberani', pemarah: 'mudah naik darah',
}
const KEBUTUHAN = ['lapar', 'lelah', 'bosan', 'sepi', 'latih']
// berapa menit sampai sebuah kebutuhan penuh (dari 0 ke 1) bila tidak dipenuhi
const NAIK = { lapar: 90, lelah: 100, bosan: 40, sepi: 55, latih: 45 }

const NAMA = {
  pria: [['Ae', 'Cae', 'El', 'Fin', 'Gal', 'Ith', 'Lor', 'Mir', 'Ny', 'Sil', 'Tha', 'Va', 'Ere', 'Ara', 'Bel', 'Hal'], ['lion', 'dor', 'thas', 'rin', 'las', 'orn', 'ian', 'ndil', 'mir', 'ros', 'gor', 'ion', 'dir']],
  wanita: [['Ari', 'Cel', 'Ela', 'Gala', 'Ila', 'Lir', 'Mel', 'Nim', 'Syl', 'Tau', 'Yav', 'Eli', 'Rina', 'Ama'], ['wen', 'iel', 'rael', 'wyn', 'anna', 'ith', 'ria', 'dra', 'nia', 'thiel', 'lis']],
}
const PEKERJAAN = {
  pedagang: 'pedagang', pandai: 'pandai besi', petani: 'petani', masak: 'juru masak', saji: 'pelayan balai makan',
  musik: 'pemusik', kedai: 'pemilik kedai', warga: 'warga kota', anak: 'anak-anak',
}

// Kegiatan: judul untuk kartu "sedang …", kebutuhan yang dipuaskan (per menit), lama (detik)
const KEGIATAN = {
  makan: { teks: 'makan di Balai Makan', lega: { lapar: 1.6, sepi: 0.2 }, lama: [70, 140] },
  bekal: { teks: 'makan bekal sambil duduk', lega: { lapar: 1.2 }, lama: [60, 120] },
  antre: { teks: 'mengantre makanan', lega: {}, lama: [0, 0] },
  kemakan: { teks: 'makan di Balai Makan', lega: {}, lama: [0, 0] },
  tidur: { teks: 'beristirahat di tenda', lega: { lelah: 0.3 }, lama: [600, 1200] },
  tanding: { teks: 'berlatih tanding pedang', lega: { latih: 0.35, bosan: 0.05, sepi: 0.1 }, lelah: 0.06, lama: [360, 840] },
  panah: { teks: 'berlatih memanah', lega: { latih: 0.3 }, lelah: 0.03, lama: [300, 720] },
  boneka: { teks: 'memukul boneka latihan', lega: { latih: 0.3 }, lelah: 0.05, lama: [240, 540] },
  baris: { teks: 'latihan baris-berbaris', lega: { latih: 0.4 }, lelah: 0.05, lama: [0, 0] },
  jamuan: { teks: 'berpesta di meja jamuan', lega: { bosan: 0.4, sepi: 0.35, lapar: 0.6 }, lama: [300, 720] },
  tari: { teks: 'menari di sekeliling api unggun', lega: { bosan: 0.6, sepi: 0.3 }, lelah: 0.04, lama: [240, 540] },
  api: { teks: 'duduk di dekat api unggun', lega: { bosan: 0.2, sepi: 0.3, lelah: 0.05 }, lama: [300, 700] },
  nonton: { teks: 'menonton pemusik', lega: { bosan: 0.5, sepi: 0.15 }, lama: [240, 540] },
  ngobrol: { teks: 'mengobrol', lega: { sepi: 0.7, bosan: 0.15 }, lama: [150, 360] },
  duduk: { teks: 'duduk-duduk', lega: { lelah: 0.08, bosan: 0.05 }, lama: [150, 360] },
  kedai: { teks: 'minum di Kedai Daun Emas', lega: { bosan: 0.4, sepi: 0.4 }, lama: [240, 540] },
  pantai: { teks: 'bersantai di pantai', lega: { bosan: 0.3, lelah: 0.06 }, lama: [360, 900] },
  mancing: { teks: 'memancing di pantai', lega: { bosan: 0.35 }, lama: [420, 1000] },
  santai: { teks: 'bersantai di bawah pohon', lega: { lelah: 0.1, bosan: 0.12 }, lama: [300, 720] },
  rebahan: { teks: 'tidur siang di rumput', lega: { lelah: 0.18 }, lama: [360, 900] },
  latihSendiri: { teks: 'berlatih pedang sendirian', lega: { latih: 0.25 }, lelah: 0.03, lama: [240, 540] },
  jalan: { teks: 'berjalan-jalan', lega: { bosan: 0.25 }, lama: [6, 25] },
  lihat: { teks: 'melihat-lihat sekeliling', lega: { bosan: 0.2 }, lama: [20, 60] },
  belanja: { teks: 'berbelanja di pasar', lega: { bosan: 0.15 }, lama: [30, 80] },
  jaga: { teks: 'berjaga', lega: { latih: 0.1 }, lama: [600, 1200] },
  kerja: { teks: 'bekerja', lega: { kerja: 0.25 }, lama: [600, 1200] },
  sumur: { teks: 'menimba air di sumur', lega: { sepi: 0.2 }, lama: [40, 100] },
  pulang: { teks: 'di rumah', lega: { lelah: 0.25, lapar: 0.8 }, lama: [240, 600] },
  main: { teks: 'bermain kejar-kejaran', lega: { bosan: 0.5 }, lama: [90, 240] },
}

// ------------------------------------------------------------------- antrean waktu (min-heap)
class EventQueue {
  constructor() {
    this.t = []
    this.id = []
    this.tok = []
  }

  get size() {
    return this.t.length
  }

  push(time, id, tok) {
    const { t, id: ids, tok: toks } = this
    let i = t.length
    t.push(time)
    ids.push(id)
    toks.push(tok)
    while (i > 0) {
      const p = (i - 1) >> 1
      if (t[p] <= time) break
      t[i] = t[p]
      ids[i] = ids[p]
      toks[i] = toks[p]
      i = p
    }
    t[i] = time
    ids[i] = id
    toks[i] = tok
  }

  peek() {
    return this.t.length ? this.t[0] : Infinity
  }

  // ambil yang terawal → [id, token]
  pop(out) {
    const { t, id: ids, tok: toks } = this
    out[0] = ids[0]
    out[1] = toks[0]
    const lt = t.pop()
    const li = ids.pop()
    const lk = toks.pop()
    const n = t.length
    if (!n) return out
    let i = 0
    for (;;) {
      const l = 2 * i + 1
      if (l >= n) break
      const r = l + 1
      const c = r < n && t[r] < t[l] ? r : l
      if (t[c] >= lt) break
      t[i] = t[c]
      ids[i] = ids[c]
      toks[i] = toks[c]
      i = c
    }
    t[i] = lt
    ids[i] = li
    toks[i] = lk
    return out
  }
}

// ------------------------------------------------------------------- pembuat
// ground, plan (planAeloria), routes (jaringan jalan Aeloria), folk (createElfFolk), quality,
// free(x, z, r) = titik kosong dari penghalang (untuk tempat bersantai di hutan)
export function createLife({ ground, plan, routes, folk, quality, free = () => true }) {
  const rand = rng(90210)
  const between = (a, b) => a + (b - a) * rand()
  const pick = list => list[Math.floor(rand() * list.length)]
  const weighted = pairs => {
    let r = rand() * pairs.reduce((s, p) => s + p[1], 0)
    for (const [v, w] of pairs) if ((r -= w) <= 0) return v
    return pairs[pairs.length - 1][0]
  }
  let T = 0 // waktu simulasi (detik)

  // ----------------------------------------------------------------- jaringan jalan & rute
  const { nodes } = routes
  const CELL = 40
  const nodeGrid = new Map()
  for (const n of nodes) {
    if (!n.links.length) continue
    const k = `${Math.floor(n.x / CELL)},${Math.floor(n.z / CELL)}`
    if (!nodeGrid.has(k)) nodeGrid.set(k, [])
    nodeGrid.get(k).push(n)
  }
  function nearestNode(x, z) {
    const ci = Math.floor(x / CELL)
    const cj = Math.floor(z / CELL)
    let best = null
    let bd = Infinity
    for (let r = 0; r < 40; r++) {
      for (let i = ci - r; i <= ci + r; i++)
        for (let j = cj - r; j <= cj + r; j++) {
          if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== r) continue
          const list = nodeGrid.get(`${i},${j}`)
          if (!list) continue
          for (const n of list) {
            const d = (n.x - x) ** 2 + (n.z - z) ** 2
            if (d < bd) {
              bd = d
              best = n
            }
          }
        }
      // simpul di cincin berikutnya tidak mungkin lebih dekat dari ini
      if (best && Math.sqrt(bd) < r * CELL) break
    }
    return best
  }
  // Dijkstra dari tiap simpul asal (disimpan setelah dihitung sekali)
  const prevOf = new Map()
  function dijkstra(src) {
    const n = nodes.length
    const dist = new Float64Array(n).fill(Infinity)
    const prev = new Int32Array(n).fill(-1)
    const done = new Uint8Array(n)
    const heap = new EventQueue()
    dist[src.id] = 0
    heap.push(0, src.id, 0)
    const top = [0, 0]
    while (heap.size) {
      heap.pop(top)
      const u = top[0]
      if (done[u]) continue
      done[u] = 1
      const nu = nodes[u]
      for (const v of nu.links) {
        const d = dist[u] + Math.hypot(v.x - nu.x, v.z - nu.z)
        if (d < dist[v.id]) {
          dist[v.id] = d
          prev[v.id] = u
          heap.push(d, v.id, 0)
        }
      }
    }
    return prev
  }
  function routeNodes(a, b) {
    let prev = prevOf.get(a.id)
    if (!prev) {
      prev = dijkstra(a)
      prevOf.set(a.id, prev)
    }
    const out = []
    for (let k = b.id; k >= 0; k = prev[k]) {
      out.push(nodes[k])
      if (k === a.id) break
    }
    if (out[out.length - 1] !== a) return [a, b] // tidak tersambung: lurus saja
    return out.reverse()
  }

  // jarak terjauh tempat kegiatan yang boleh dipilih (decideKnight → choose)
  let maxReach = Infinity
  // kisi kasar penghalang (penghalang rencana yang besar: bangunan, tembok, pagar ladang, meja, kios;
  // tiang lentera & sejenisnya diabaikan):
  // elf berjalan lurus lintas-alam bila garisnya tidak melewati sel terhalang atau air; kalau
  // tidak, menyusuri jaringan jalan
  const BC = 4
  const BX0 = -470
  const BZ0 = -1160
  const BW = Math.ceil(940 / BC)
  const BH = Math.ceil(1020 / BC)
  const blocked = new Uint8Array(BW * BH)
  const PAD = 1.2
  for (const c of plan.colliders) {
    if ((c.radius ?? Math.max(c.hx, c.hz)) < 0.6) continue
    const r = (c.radius ?? Math.hypot(c.hx, c.hz)) + PAD + BC
    const cos = Math.cos(c.rot || 0)
    const sin = Math.sin(c.rot || 0)
    for (let j = Math.floor((c.z - r - BZ0) / BC); j <= Math.floor((c.z + r - BZ0) / BC); j++)
      for (let i = Math.floor((c.x - r - BX0) / BC); i <= Math.floor((c.x + r - BX0) / BC); i++) {
        if (i < 0 || j < 0 || i >= BW || j >= BH) continue
        const dx = BX0 + (i + 0.5) * BC - c.x
        const dz = BZ0 + (j + 0.5) * BC - c.z
        const inside = c.radius !== undefined
          ? Math.hypot(dx, dz) <= c.radius + PAD
          : Math.abs(dx * cos - dz * sin) <= c.hx + PAD && Math.abs(dx * sin + dz * cos) <= c.hz + PAD
        if (inside) blocked[j * BW + i] = 1
      }
  }
  // garis (x0, z0) → (x1, z1) bebas penghalang & di daratan (ujung-ujungnya dikecualikan: kursi
  // makan memang menempel di meja)
  function clearLine(x0, z0, x1, z1) {
    const len = Math.hypot(x1 - x0, z1 - z0)
    const n = Math.ceil(len / 2)
    for (let k = 1; k < n; k++) {
      const t = k / n
      if (t * len < 3.5 || (1 - t) * len < 3.5) continue
      const x = x0 + (x1 - x0) * t
      const z = z0 + (z1 - z0) * t
      const i = Math.floor((x - BX0) / BC)
      const j = Math.floor((z - BZ0) / BC)
      if (i < 0 || j < 0 || i >= BW || j >= BH || blocked[j * BW + i]) return false
      if (ground.heightAt(x, z) < 0.6) return false
    }
    return true
  }

  // ----------------------------------------------------------------- tempat kegiatan
  const sites = plan.sites.map((s, i) => ({
    ...s, index: i,
    occ: new Int32Array(s.slots.length).fill(0), // banyak penghuni tiap slot
    cap: s.slots.map(sl => sl.cap || 1),
    who: s.slots.map(() => -1), // penghuni (slot berkapasitas 1)
    queue: s.type === 'antre' ? [] : null,
  }))
  // tempat bersantai bebas: titik-titik di kawasan rumput (plan.leisure) & di hutan
  {
    const slots = []
    for (const { area, rect } of plan.leisure)
      for (let x = rect.x0; x < rect.x1; x += 3.6)
        for (let z = rect.z0; z < rect.z1; z += 3.6) {
          const px = x + between(-1.2, 1.2)
          const pz = z + between(-1.2, 1.2)
          if (free(px, pz, 0.8)) slots.push({ x: px, z: pz, rot: rand() * Math.PI * 2, pose: weighted([['duduk', 5], ['sleep', 2], ['idle', 1], ['latih', 2]]), area })
        }
    // hutan & padang Aeloria: titik di tanah landai, jauh dari kawasan berbangunan
    let tries = 0
    let made = 0
    while (made < 1600 && tries++ < 40000) {
      const x = between(-420, 420)
      const z = between(-1120, -480)
      const h = ground.heightAt(x, z)
      if (h < 3 || ground.slopeAt(x, z) > 0.3 || plan.clear(x, z, 4) || !free(x, z, 1.2)) continue
      slots.push({ x, z, rot: rand() * Math.PI * 2, pose: weighted([['duduk', 5], ['sleep', 2], ['idle', 1], ['latih', 2]]), area: 'hutan' })
      made++
    }
    sites.push({ type: 'santai', area: 'hutan', x: 0, z: -760, index: sites.length, slots, occ: new Int32Array(slots.length), cap: slots.map(() => 1), who: slots.map(() => -1), spread: true })
  }
  // tempat dengan banyak kursi/titik dipilih seperti tempat tersebar: kursi kosong terdekat
  for (const s of sites) if (['makan', 'jamuan', 'tidur', 'nonton', 'kedai'].includes(s.type)) s.spread = true
  const byType = {}
  for (const s of sites) (byType[s.type] ||= []).push(s)
  const GRID = 50
  for (const s of sites) {
    if (!s.spread) continue
    s.grid = new Map()
    s.slots.forEach((sl, i) => {
      const k = `${Math.floor(sl.x / GRID)},${Math.floor(sl.z / GRID)}`
      if (!s.grid.has(k)) s.grid.set(k, [])
      s.grid.get(k).push(i)
    })
  }
  // slot kosong acak di tempat tersebar, sedekat mungkin dari (x, z) (makin jauh cincinnya bila
  // yang dekat penuh)
  const nearPick = []
  function nearFreeSlot(site, x, z, rings = 5) {
    const ci = Math.floor(x / GRID)
    const cj = Math.floor(z / GRID)
    for (let r = 0; r <= rings; r++) {
      nearPick.length = 0
      for (let i = ci - r; i <= ci + r; i++)
        for (let j = cj - r; j <= cj + r; j++) {
          if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== r) continue
          const list = site.grid.get(`${i},${j}`)
          if (list) for (const k of list) if (site.occ[k] < site.cap[k]) nearPick.push(k)
        }
      if (nearPick.length) return nearPick[Math.floor(rand() * nearPick.length)]
    }
    return -1
  }
  const of = type => byType[type] || []

  // slot kosong di sebuah tempat: yang pertama, atau acak untuk tempat yang tersebar (pantai, hutan)
  function freeSlot(site) {
    const n = site.slots.length
    if (site.spread) {
      for (let k = 0; k < 12; k++) {
        const i = Math.floor(rand() * n)
        if (site.occ[i] < site.cap[i]) return i
      }
      return -1
    }
    for (let i = 0; i < n; i++) if (site.occ[i] < site.cap[i]) return i
    return -1
  }
  // tempat terbaik dari sebuah jenis untuk elf a: dekat + sedikit acak (tidak semua ke tempat yang
  // sama); filter opsional. Hasil { site, slot } atau null
  function choose(a, type, { filter = null, spread = 60, near = null } = {}) {
    const list = of(type)
    let best = null
    let bc = Infinity
    for (const s of list) {
      if (filter && !filter(s)) continue
      let { x } = s
      let { z } = s
      let slot = -1
      const ref = near || a
      if (s.spread) {
        // tempat tersebar: titik kosong di sekitar elf
        slot = nearFreeSlot(s, ref.x, ref.z)
        if (slot < 0) continue
        ;({ x, z } = s.slots[slot])
      }
      const dist = Math.hypot(x - ref.x, z - ref.z)
      if (dist > maxReach) continue
      const c = dist + rand() * spread
      if (c >= bc) continue
      if (slot < 0) slot = freeSlot(s)
      if (slot < 0) continue
      bc = c
      best = { site: s, slot }
    }
    return best
  }
  function take(a, site, slot) {
    site.occ[slot]++
    if (site.cap[slot] === 1) site.who[slot] = a.id
    a.site = site
    a.slot = slot
  }
  function release(a) {
    const s = a.site
    if (!s) return
    if (a.slot >= 0) {
      s.occ[a.slot] = Math.max(0, s.occ[a.slot] - 1)
      if (s.who[a.slot] === a.id) s.who[a.slot] = -1
    }
    if (s.queue) {
      const i = s.queue.indexOf(a.id)
      if (i >= 0) {
        s.queue.splice(i, 1)
        advanceQueue(s, i)
      }
    }
    a.site = null
    a.slot = -1
  }

  // ----------------------------------------------------------------- penduduk & kesatria
  const agents = []
  // salinan data yang dibaca tiap bingkai saat memilah elf yang terlihat (larik bertipe: cepat)
  const N_MAX = KNIGHTS + 1024
  const CX = new Float32Array(N_MAX)
  const CZ = new Float32Array(N_MAX)
  const CR = new Float32Array(N_MAX)
  const HID = new Uint8Array(N_MAX)
  const sync = a => {
    CX[a.id] = a.cx
    CZ[a.id] = a.cz
    CR[a.id] = a.cr
    HID[a.id] = a.hidden ? 1 : 0
  }
  const SKIN = [[WARNA.kulitTerang, 50], [WARNA.kulitSawo, 30], [WARNA.kulitCokelat, 12], [WARNA.cokelat, 8]]
  const HAIR = [[WARNA.kuning, 25], [WARNA.putih, 20], [WARNA.perak, 8], [WARNA.cokelat, 20], [WARNA.hitam, 12], [WARNA.jingga, 9], [WARNA.abuBiru, 4]]
  const CLOTH = [[WARNA.hijau, 22], [WARNA.cokelat, 16], [WARNA.kuning, 10], [WARNA.putih, 12], [WARNA.biruMuda, 10], [WARNA.ungu, 10], [WARNA.biru, 10], [WARNA.merah, 6], [WARNA.kelabu, 6]]
  const bodies = folk.types
  const nameOf = gender => {
    const [a, b] = NAMA[gender]
    return pick(a) + pick(b)
  }
  const traits = () => Object.fromEntries(SIFAT.map(k => [k, Math.min(1, Math.max(0, (rand() + rand() + rand()) / 3 + (rand() - 0.5) * 0.5))]))
  function makeAgent(kind, extra) {
    const type = Math.floor(rand() * bodies.length)
    const gender = bodies[type].startsWith('female') ? 'wanita' : 'pria'
    const a = {
      id: agents.length, kind, type, gender, name: nameOf(gender), scale: 1,
      sifat: traits(), need: {}, needT: 0,
      act: null, site: null, slot: -1, phase: 'di', until: 0, tok: 0,
      pts: null, cum: null, len: 0, wT0: 0, speed: between(1.3, 1.75), lane: between(-1, 1), last: null,
      x: 0, z: 0, y: 0, heading: rand() * Math.PI * 2, cx: 0, cz: 0, cr: 0, startT: 0, phaseT: rand() * 20,
      clip: 'idle', clipT0: 0, prev: null, prevT: 0, hidden: false, home: null, hp: 1, say: 0,
      ...extra,
    }
    for (const k of KEBUTUHAN) a.need[k] = rand() * 0.7
    a.need.kerja = rand() * 0.5
    agents.push(a)
    return a
  }
  function dyeKnight(a) {
    const P = PASUKAN[a.pasukan]
    let bagian = BAGIAN.zirah
    if (rand() < 0.45) bagian |= BAGIAN.helm
    else if (rand() < 0.55) bagian |= BAGIAN.rambutPanjang
    if (rand() < 0.65) bagian |= BAGIAN.jubah
    if (a.weapon === 'busur') bagian |= BAGIAN.tabung
    else if (a.weapon === 'pedang') bagian |= BAGIAN.sarung
    if (a.rank === 'Kapten') bagian |= BAGIAN.jubah | BAGIAN.mahkota
    a.dye = packDye({
      kulit: weighted(SKIN), rambut: weighted(HAIR), baju: weighted([[WARNA.putih, 3], [WARNA.kelabu, 2], [P.panji, 1]]),
      celana: weighted([[WARNA.kelabu, 3], [WARNA.cokelat, 2], [WARNA.hitam, 1]]), sepatu: WARNA.cokelat, hias: WARNA.kuning,
      zirah: P.zirah, panji: P.panji, bagian,
    })
  }
  function dyeVillager(a) {
    let bagian = 0
    if (rand() < 0.4) bagian |= BAGIAN.rambutPanjang
    if (rand() < 0.15) bagian |= BAGIAN.mahkota
    if (a.job === 'pandai' || a.job === 'masak') bagian |= BAGIAN.celemek
    a.dye = packDye({
      kulit: weighted(SKIN), rambut: weighted(HAIR), baju: weighted(CLOTH), celana: weighted(CLOTH), sepatu: weighted([[WARNA.cokelat, 3], [WARNA.hitam, 1], [WARNA.kelabu, 1]]),
      hias: weighted(CLOTH), zirah: WARNA.perak, panji: WARNA.hijau, bagian,
    })
  }

  // kesatria
  for (let i = 0; i < KNIGHTS; i++) {
    const a = makeAgent('kesatria', {
      pasukan: i % PASUKAN.length,
      weapon: weighted([['pedang', 50], ['tombak', 25], ['busur', 25]]),
      rank: i % 97 === 0 ? 'Kapten' : 'Kesatria',
    })
    dyeKnight(a)
  }
  // penduduk: pekerjaan tetap di tempat kerjanya
  const homes = plan.homes.filter(h => !h.tavern)
  const villager = (job, extra = {}) => {
    const a = makeAgent(job === 'anak' ? 'anak' : 'penduduk', { job, home: pick(homes), ...extra })
    if (job === 'anak') a.scale = 0.72
    dyeVillager(a)
    return a
  }
  for (const s of of('kios')) {
    const a = villager('pedagang', { work: { site: s, seller: true } })
    s.keeper = a.id
  }
  {
    const forge = of('tempa')[0]
    if (forge) forge.slots.forEach((sl, k) => villager('pandai', { work: { site: forge, slot: k } }))
  }
  for (const s of of('ladang')) {
    const n = Math.max(2, Math.round(s.slots.length / 9))
    for (let k = 0; k < n; k++) villager('petani', { work: { site: s, slot: -1 } })
  }
  for (const s of of('kerja')) s.slots.forEach((sl, k) => villager(s.job, { work: { site: s, slot: k } }))
  for (const s of of('antre')) {
    const a = villager('saji', { work: { site: s, server: true } })
    s.keeper = a.id
  }
  for (let i = 0; i < 90; i++) villager('warga')
  for (let i = 0; i < 28; i++) villager('anak')

  // ----------------------------------------------------------------- perjalanan
  // rute dari letak sekarang ke (tx, tz): [via asal] → jaringan jalan → [via tujuan] → tujuan
  const pts = []
  function planWalk(a, tx, tz, viaTo, { run = false, direct = false } = {}) {
    pts.length = 0
    pts.push(a.x, a.z)
    const viaFrom = a.leaveVia
    a.leaveVia = null
    if (viaFrom) pts.push(viaFrom.x, viaFrom.z)
    const ex = viaTo ? viaTo.x : tx
    const ez = viaTo ? viaTo.z : tz
    const sx = pts[pts.length - 2]
    const sz = pts[pts.length - 1]
    if (!direct && Math.hypot(ex - sx, ez - sz) > STRAIGHT && !clearLine(sx, sz, ex, ez)) {
      const A = nearestNode(sx, sz)
      const B = nearestNode(ex, ez)
      if (A && B) {
        const list = A === B ? [A] : routeNodes(A, B)
        // lajur sendiri tiap elf: titik simpul digeser ke samping (selebar jalannya)
        for (let k = 0; k < list.length; k++) {
          const n = list[k]
          const p = list[k - 1] || null
          const q = list[k + 1] || null
          let dx = (q ? q.x : n.x) - (p ? p.x : n.x)
          let dz = (q ? q.z : n.z) - (p ? p.z : n.z)
          const l = Math.hypot(dx, dz) || 1
          dx /= l
          dz /= l
          const w = Math.min(q ? n.w.get(q.id) ?? 3 : 3, p ? n.w.get(p.id) ?? 3 : 3)
          const off = a.lane * Math.max(0, w / 2 - 0.7)
          pts.push(n.x - dz * off, n.z + dx * off)
        }
      }
    }
    if (viaTo) pts.push(viaTo.x, viaTo.z)
    pts.push(tx, tz)
    // tarik lurus: dari tiap titik langsung ke titik terjauh yang terlihat tanpa penghalang
    const m = pts.length / 2
    const keep = [0]
    for (let i = 0; i < m - 1;) {
      let j = m - 1
      while (j > i + 1 && !clearLine(pts[i * 2], pts[i * 2 + 1], pts[j * 2], pts[j * 2 + 1])) j--
      keep.push(j)
      i = j
    }
    // buang titik yang berimpit
    const P = [pts[0], pts[1]]
    for (const k of keep.slice(1)) {
      const lx = P[P.length - 2]
      const lz = P[P.length - 1]
      if (Math.hypot(pts[k * 2] - lx, pts[k * 2 + 1] - lz) > 0.05) P.push(pts[k * 2], pts[k * 2 + 1])
    }
    const n = P.length / 2
    a.pts = new Float32Array(P)
    a.cum = new Float32Array(n)
    let minx = Infinity
    let maxx = -Infinity
    let minz = Infinity
    let maxz = -Infinity
    for (let i = 0; i < n; i++) {
      if (i) a.cum[i] = a.cum[i - 1] + Math.hypot(P[i * 2] - P[i * 2 - 2], P[i * 2 + 1] - P[i * 2 - 1])
      minx = Math.min(minx, P[i * 2])
      maxx = Math.max(maxx, P[i * 2])
      minz = Math.min(minz, P[i * 2 + 1])
      maxz = Math.max(maxz, P[i * 2 + 1])
    }
    a.len = a.cum[n - 1]
    a.run = run
    a.wT0 = T
    a.phase = 'jalan'
    a.hidden = false
    a.cx = (minx + maxx) / 2
    a.cz = (minz + maxz) / 2
    a.cr = Math.hypot(maxx - minx, maxz - minz) / 2
    sync(a)
    return a.len / (run ? RUN_SPEED : a.speed)
  }
  // letak di rute pada waktu T
  function walkPos(a) {
    const s = Math.min(a.len, (T - a.wT0) * (a.run ? RUN_SPEED : a.speed))
    const { cum, pts: P } = a
    let lo = 0
    let hi = cum.length - 1
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1
      if (cum[m] <= s) lo = m
      else hi = m
    }
    const seg = cum[hi] - cum[lo] || 1
    const k = Math.min(1, (s - cum[lo]) / seg)
    const ax = P[lo * 2]
    const az = P[lo * 2 + 1]
    const bx = P[hi * 2]
    const bz = P[hi * 2 + 1]
    a.x = ax + (bx - ax) * k
    a.z = az + (bz - az) * k
    // arah hadap: ruas sekarang, berbelok halus di dekat sudut
    let h = Math.atan2(bx - ax, bz - az)
    const left = cum[hi] - s
    if (left < 0.8 && hi < cum.length - 1) {
      const h2 = Math.atan2(P[hi * 2 + 2] - bx, P[hi * 2 + 3] - bz)
      h += Math.atan2(Math.sin(h2 - h), Math.cos(h2 - h)) * (0.5 - left / 1.6)
    }
    a.heading = h
  }

  // ----------------------------------------------------------------- jadwal
  const queue = new EventQueue()
  const schedule = (a, at) => {
    a.until = at
    a.tok++
    queue.push(at, a.id, a.tok)
  }

  // kebutuhan diperbarui saat kegiatan berganti: naik menurut waktu, turun menurut kegiatannya
  function settle(a) {
    const dtm = (T - a.needT) / 60
    if (dtm <= 0) return
    a.needT = T
    const K = KEGIATAN[a.act] || {}
    const lega = K.lega || {}
    const n = a.need
    const { rajin } = a.sifat
    for (const k of KEBUTUHAN) {
      let v = n[k] + (k === 'latih' ? (0.5 + rajin) : 1) * dtm / NAIK[k]
      if (k === 'lelah' && K.lelah) v += K.lelah * dtm
      v -= (lega[k] || 0) * dtm
      n[k] = Math.min(1, Math.max(0, v))
    }
    n.kerja = Math.min(1, Math.max(0, n.kerja + dtm / 9 - (lega.kerja || 0) * dtm))
  }

  // tiba / mulai berkegiatan di slotnya
  function begin(a, act, site, slot, dur) {
    a.act = act
    a.phase = 'di'
    a.pts = null
    const sl = site && slot >= 0 ? site.slots[slot] : null
    if (sl) {
      a.x = sl.x
      a.z = sl.z
      a.heading = sl.rot ?? a.heading
    }
    a.leaveVia = sl?.via || null
    a.cx = a.x
    a.cz = a.z
    a.cr = act === 'tari' ? 7 : act === 'main' ? 6 : 0
    a.startT = T
    a.y = sl && sl.y !== undefined ? sl.y : ground.surfaceAt(a.x, a.z)
    a.hidden = act === 'tidur' || act === 'pulang'
    sync(a)
    schedule(a, T + dur)
  }

  // pergi ke slot sebuah tempat untuk berkegiatan `act`
  function goTo(a, act, site, slot, opts) {
    release(a)
    take(a, site, slot)
    const sl = site.slots[slot]
    a.goal = act
    a.act = 'jalan'
    const t = planWalk(a, sl.x, sl.z, sl.via, opts)
    schedule(a, T + t)
  }
  function goToPoint(a, act, x, z, opts) {
    release(a)
    a.goal = act
    a.act = 'jalan'
    a.target = { x, z }
    const t = planWalk(a, x, z, null, opts)
    schedule(a, T + t)
  }

  // ---- antrean meja saji: elf berdiri di slot sesuai urutannya; yang paling depan dilayani
  function advanceQueue(site, from) {
    for (let i = from; i < site.queue.length; i++) {
      const b = agents[site.queue[i]]
      if (!b || b.goal !== 'antre') continue
      b.qi = i
      if (b.act === 'jalan' && b.pts) walkPos(b)
      const sl = site.slots[i]
      b.act = 'jalan'
      schedule(b, T + planWalk(b, sl.x, sl.z, null, { direct: true }))
    }
  }
  function joinQueue(a) {
    // meja saji dengan antrean terpendek (dan dekat)
    let best = null
    let bc = Infinity
    for (const s of of('antre')) {
      if (s.queue.length >= s.slots.length) continue
      // hanya meja saji di dekatnya (tidak menyeberangi seluruh balai demi antrean pendek)
      const d = Math.hypot(s.x - a.x, s.z - a.z)
      if (d > 26) continue
      const c = s.queue.length * 3 + d + rand() * 6
      if (c < bc) {
        bc = c
        best = s
      }
    }
    if (!best) return false
    release(a)
    best.queue.push(a.id)
    a.site = best
    a.slot = -1
    a.qi = best.queue.length - 1
    a.goal = 'antre'
    a.act = 'jalan'
    const sl = best.slots[a.qi]
    schedule(a, T + planWalk(a, sl.x, sl.z, null, { direct: true }))
    return true
  }

  // ---- keputusan berikutnya
  const feast = { on: false, t: 0, next: 120 + rand() * 120 }
  let served = 0 // banyak porsi yang sudah disajikan Balai Makan
  const drill = { on: false, t: 0, next: 60 + rand() * 60, site: of('baris')[0] || null }
  const dutyOpen = () => of('jaga').some(s => s.occ.some((o, i) => o < s.cap[i]))

  function decideKnight(a) {
    const n = a.need
    const s = a.sifat
    const opts = [
      ['makan', n.lapar * 2.4 + s.rakus * 0.3 - (n.lapar < 0.55 - s.rakus * 0.15 ? 1.5 : 0)],
      ['tidur', n.lelah * 2.2 + s.pemalas * 0.3 - (n.lelah < 0.55 ? 1.4 : 0)],
      ['latih', n.latih * 1.6 + s.rajin * 0.7 - n.lelah * 0.7 + (drill.on ? 0.3 : 0)],
      ['pesta', n.bosan * 1.3 + s.riang * 0.8 + (feast.on ? 0.9 : -0.2) - n.lelah * 0.3],
      ['ngobrol', n.sepi * 1.4 + s.ramah * 0.6],
      ['jalan', s.petualang * 0.55 + n.bosan * 0.3 - n.lelah * 0.4 - 0.15],
      ['pantai', s.petualang * 0.45 + s.pemalas * 0.4 + n.bosan * 0.35 - 0.15],
      ['santai', s.pemalas * 0.8 + n.lelah * 0.7 - 0.1],
      ['belanja', 0.15 + s.rakus * 0.2 + n.bosan * 0.2],
      ['kedai', n.bosan * 0.55 + s.riang * 0.45 + s.ramah * 0.25 - 0.35],
      ['jaga', dutyOpen() ? 0.55 + s.rajin * 0.9 : -9],
    ]
    // jarang mengulang kegiatan yang sama berturut-turut (kecuali makan & tidur)
    for (const o of opts) o[1] += (rand() - 0.5) * 0.7 - (o[0] === a.last && o[0] !== 'makan' && o[0] !== 'tidur' ? 0.6 : 0)
    opts.sort((p, q) => q[1] - p[1])
    // kebutuhan mendesak (lapar / lelah) boleh jauh; selebihnya cari yang dekat dulu
    const urgent = n.lapar > 0.7 || n.lelah > 0.75
    for (const reach of urgent ? [Infinity] : [160 + rand() * 120, Infinity])
      for (const [act] of opts) {
        maxReach = reach
        const ok = tryKnight(a, act)
        maxReach = Infinity
        if (ok) {
          a.last = act
          return
        }
      }
    // semua penuh: bersantai di hutan
    const c = choose(a, 'santai')
    if (c) goTo(a, 'santai', c.site, c.slot)
    else schedule(a, T + 20)
  }

  function tryKnight(a, act) {
    let c = null
    switch (act) {
      case 'makan': {
        // ke lapangan tengah Balai Makan dulu (mengantre setibanya di sana: tempat antrean tidak
        // dipesan dari jauh); dari Padang Pesta lebih dekat ke meja jamuan
        const counters = of('antre')
        if (!counters.length) return false
        const k = counters[Math.floor(rand() * counters.length)]
        const d = Math.hypot(k.x - a.x, k.z - a.z)
        if (d > 220 && rand() < 0.5) {
          c = choose(a, 'jamuan', { spread: 30 })
          if (c) {
            goTo(a, 'jamuan', c.site, c.slot)
            return true
          }
        }
        goToPoint(a, 'kemakan', k.x + between(-7, 7), -765 + between(-3.5, 3.5))
        return true
      }
      case 'tidur': {
        // perkemahan (tenda) atau barak benteng
        c = choose(a, 'tidur', { spread: 120 })
        if (c) goTo(a, 'tidur', c.site, c.slot)
        return !!c
      }
      case 'latih': {
        if (drill.on && drill.site && rand() < 0.5) {
          const slot = freeSlot(drill.site)
          if (slot >= 0) {
            goTo(a, 'baris', drill.site, slot)
            return true
          }
        }
        if (a.weapon === 'busur' && rand() < 0.8) {
          c = choose(a, 'panah', { spread: 30 })
          if (c) {
            goTo(a, 'panah', c.site, c.slot)
            return true
          }
        }
        if (rand() < 0.2) {
          c = choose(a, 'boneka', { spread: 30 })
          if (c) {
            goTo(a, 'boneka', c.site, c.slot)
            return true
          }
        }
        // tanding: utamakan pasangan yang sedang menunggu lawan
        c = choose(a, 'tanding', { filter: s => s.occ[0] + s.occ[1] === 1, spread: 40 }) || choose(a, 'tanding', { spread: 40 })
        if (c) goTo(a, 'tanding', c.site, c.slot)
        return !!c
      }
      case 'pesta': {
        const r = rand()
        if (r < 0.4) c = choose(a, 'jamuan', { spread: 50 })
        else if (r < 0.75) c = choose(a, 'api', { filter: s => s.area === 'pesta', spread: 40 })
        else c = choose(a, 'nonton', { spread: 40 })
        if (!c) return false
        const { pose } = c.site.slots[c.slot]
        goTo(a, c.site.type === 'jamuan' ? 'jamuan' : c.site.type === 'nonton' ? 'nonton' : pose === 'dance' ? 'tari' : 'api', c.site, c.slot)
        return true
      }
      case 'ngobrol': {
        // lebih suka lingkaran yang sudah ada orangnya
        c = choose(a, 'ngobrol', { filter: s => s.occ.some(o => o) && s.occ.some((o, i) => o < s.cap[i]), spread: 70 }) || choose(a, 'ngobrol', { spread: 70 })
        if (!c && rand() < 0.5) c = choose(a, 'api', { filter: s => s.area === 'kemah', spread: 60 })
        if (!c) return false
        goTo(a, c.site.type === 'api' ? 'api' : 'ngobrol', c.site, c.slot)
        return true
      }
      case 'jalan': {
        // tujuan acak di sekitar: titik 50–180 m dari sini, di daratan & bukan di dalam bangunan
        for (let k = 0; k < 12; k++) {
          const ang = rand() * Math.PI * 2
          const d = between(50, 180)
          const x = a.x + Math.cos(ang) * d
          const z = a.z + Math.sin(ang) * d
          const i = Math.floor((x - BX0) / BC)
          const j = Math.floor((z - BZ0) / BC)
          if (i < 0 || j < 0 || i >= BW || j >= BH || blocked[j * BW + i] || ground.heightAt(x, z) < 1) continue
          goToPoint(a, 'jalan', x, z)
          return true
        }
        return false
      }
      case 'pantai': {
        c = choose(a, 'pantai', { spread: 120 })
        if (!c) return false
        goTo(a, c.site.slots[c.slot].pose === 'fish' ? 'mancing' : 'pantai', c.site, c.slot)
        return true
      }
      case 'santai': {
        c = rand() < 0.35 ? choose(a, 'duduk', { spread: 60 }) : choose(a, 'santai', { spread: 80 })
        if (!c) return false
        const { pose } = c.site.slots[c.slot]
        goTo(a, c.site.type === 'duduk' ? 'duduk' : pose === 'sleep' ? 'rebahan' : pose === 'latih' ? 'latihSendiri' : 'santai', c.site, c.slot)
        return true
      }
      case 'belanja': {
        c = choose(a, 'kios', { spread: 50 })
        if (!c) return false
        goTo(a, 'belanja', c.site, c.slot)
        return true
      }
      case 'kedai': {
        c = choose(a, 'kedai', { spread: 20 })
        if (!c) return false
        goTo(a, 'kedai', c.site, c.slot)
        return true
      }
      case 'jaga': {
        c = choose(a, 'jaga', { spread: 200 })
        if (!c) return false
        goTo(a, 'jaga', c.site, c.slot)
        return true
      }
      default:
        return false
    }
  }

  function decideVillager(a) {
    const n = a.need
    const s = a.sifat
    if (a.job === 'anak') {
      // anak: bermain di dekat rumah / alun-alun, pulang, duduk di air mancur
      const r = rand()
      if (r < 0.55) {
        const base = rand() < 0.5 ? a.home : { x: -22 + between(-8, 8), z: -640 + between(-6, 6) }
        a.playAt = { x: base.x + between(-4, 4), z: base.z + between(-4, 4) }
        goToPoint(a, 'main', a.playAt.x, a.playAt.z, { run: true })
      } else if (r < 0.75) goToPoint(a, 'pulang', a.home.x, a.home.z)
      else {
        const c = choose(a, 'duduk', { spread: 40, near: a.home })
        if (c) goTo(a, 'duduk', c.site, c.slot)
        else goToPoint(a, 'pulang', a.home.x, a.home.z)
      }
      return
    }
    const opts = [
      ['kerja', a.work ? n.kerja * 2 + 0.6 + s.rajin * 0.4 : -9],
      ['pulang', n.lelah * 1.6 + n.lapar * 1.3 - 0.3],
      ['ngobrol', n.sepi * 1.3 + s.ramah * 0.5],
      ['sumur', 0.25 + (a.job === 'warga' ? 0.3 : 0)],
      ['belanja', 0.3 + s.rakus * 0.3],
      ['kedai', n.bosan * 0.5 + s.riang * 0.4 - 0.25],
      ['duduk', s.pemalas * 0.6 + n.lelah * 0.4],
      ['pesta', feast.on ? s.riang * 0.9 + n.bosan * 0.6 : -9],
    ]
    for (const o of opts) o[1] += (rand() - 0.5) * 0.6
    opts.sort((p, q) => q[1] - p[1])
    for (const [act] of opts) if (tryVillager(a, act)) return
    goToPoint(a, 'pulang', a.home.x, a.home.z)
  }

  function tryVillager(a, act) {
    let c = null
    switch (act) {
      case 'kerja': {
        const w = a.work
        if (w.seller || w.server) {
          // berdiri di balik meja dagang / meja saji
          const p = w.seller ? w.site.seller : w.site.server
          release(a)
          a.goal = 'kerja'
          a.act = 'jalan'
          a.target = p
          schedule(a, T + planWalk(a, p.x, p.z, null))
          return true
        }
        if (w.slot < 0) {
          // petani: petak ladang mana saja yang kosong
          const slot = freeSlot(w.site)
          if (slot < 0) return false
          goTo(a, 'kerja', w.site, slot)
          return true
        }
        if (w.site.occ[w.slot] >= w.site.cap[w.slot]) return false
        goTo(a, 'kerja', w.site, w.slot)
        return true
      }
      case 'pulang':
        goToPoint(a, 'pulang', a.home.x, a.home.z)
        return true
      case 'ngobrol':
        c = choose(a, 'ngobrol', { filter: s => s.area === 'kota' || s.area === 'pasar', spread: 40 })
        if (c) goTo(a, 'ngobrol', c.site, c.slot)
        return !!c
      case 'sumur':
        c = choose(a, 'sumur', { spread: 30 })
        if (c) goTo(a, 'sumur', c.site, c.slot)
        return !!c
      case 'belanja':
        c = choose(a, 'kios', { filter: s => s.area === 'pasar' || s.area === 'tempa', spread: 40 })
        if (c) goTo(a, 'belanja', c.site, c.slot)
        return !!c
      case 'kedai':
        c = choose(a, 'kedai', { spread: 20 })
        if (c) goTo(a, 'kedai', c.site, c.slot)
        return !!c
      case 'duduk':
        c = choose(a, 'duduk', { spread: 30 })
        if (c) goTo(a, 'duduk', c.site, c.slot)
        return !!c
      case 'pesta':
        c = rand() < 0.5 ? choose(a, 'nonton', { spread: 30 }) : choose(a, 'api', { filter: s => s.area === 'pesta', spread: 30 })
        if (!c) return false
        goTo(a, c.site.type === 'nonton' ? 'nonton' : c.site.slots[c.slot].pose === 'dance' ? 'tari' : 'api', c.site, c.slot)
        return true
      default:
        return false
    }
  }

  // ---- satu kejadian elf: tiba di tujuan, atau kegiatannya selesai
  function wake(a) {
    wakeUp(a)
    sync(a)
  }
  function wakeUp(a) {
    if (a.down) {
      // bangun setelah roboh
      a.down = false
      a.hp = 1
      settle(a)
      decide(a)
      return
    }
    if (a.act === 'jalan') {
      // tiba
      a.x = a.pts[a.pts.length - 2]
      a.z = a.pts[a.pts.length - 1]
      const { goal } = a
      if (goal === 'kemakan') {
        if (joinQueue(a)) return
        // antrean penuh: langsung duduk, makanan diantar pelayan; bila semua kursi penuh: ke meja
        // jamuan Padang Pesta / kedai
        const c = choose(a, 'makan', { spread: 10 }) || choose(a, 'jamuan', { spread: 30 }) || choose(a, 'kedai', { spread: 20 })
        if (c) {
          if (c.site.type === 'makan') a.carry = 'mangkuk'
          goTo(a, c.site.type, c.site, c.slot)
          return
        }
        // semua penuh: tidak berkeliling mencari meja lain — makan bekal sambil duduk di dekat sini
        const spot = choose(a, 'santai', { spread: 20 })
        if (spot) goTo(a, 'bekal', spot.site, spot.slot)
        else {
          a.act = 'bekal'
          begin(a, 'bekal', null, -1, between(...KEGIATAN.bekal.lama))
        }
        return
      }
      if (goal === 'antre') {
        a.act = 'antre'
        a.phase = 'di'
        a.pts = null
        a.cx = a.x
        a.cz = a.z
        a.cr = 0
        a.heading = a.site?.slots[a.qi]?.rot ?? Math.PI
        a.y = ground.surfaceAt(a.x, a.z)
        a.startT = T
        // paling depan: dilayani beberapa detik; lainnya menunggu digeser maju
        if (a.qi === 0) schedule(a, T + between(0.7, 1.3))
        else schedule(a, T + 600)
        return
      }
      if (goal === 'kerja' && a.target && !a.site) {
        // pedagang / pelayan di tempatnya
        a.act = 'kerja'
        a.phase = 'di'
        a.pts = null
        a.x = a.target.x
        a.z = a.target.z
        a.heading = a.target.rot ?? a.heading
        a.cx = a.x
        a.cz = a.z
        a.cr = 0
        a.y = ground.surfaceAt(a.x, a.z)
        a.startT = T
        a.hidden = false
        a.tok++
        schedule(a, T + between(...KEGIATAN.kerja.lama))
        a.atWork = true
        return
      }
      const K = KEGIATAN[goal] || KEGIATAN.duduk
      let dur = between(...K.lama)
      if (goal === 'baris') dur = Math.max(10, drill.t - T)
      if (goal === 'jalan' || goal === 'main') {
        // tiba di tujuan jalan-jalan: melihat-lihat atau duduk menikmati suasana; anak: bermain
        a.act = goal === 'main' ? 'main' : rand() < 0.5 ? 'lihat' : 'santai'
        dur = between(...KEGIATAN[a.act].lama) * (a.act === 'santai' ? 0.6 : 1)
        a.phase = 'di'
        a.pts = null
        a.cx = a.x
        a.cz = a.z
        a.cr = goal === 'main' ? 6 : 0
        a.startT = T
        a.y = ground.surfaceAt(a.x, a.z)
        a.hidden = false
        schedule(a, T + dur)
        return
      }
      if (goal === 'pulang') {
        a.act = 'pulang'
        a.phase = 'di'
        a.pts = null
        a.hidden = true
        a.cx = a.x
        a.cz = a.z
        a.cr = 0
        schedule(a, T + dur)
        return
      }
      begin(a, goal, a.site, a.slot, dur)
      return
    }
    if (a.act === 'antre') {
      // dilayani: keluar antrean, bawa makanan ke kursi kosong
      served++
      const { site } = a
      settle(a)
      const c = choose(a, 'makan', { spread: 25 })
      if (site && site.queue) {
        const i = site.queue.indexOf(a.id)
        if (i >= 0) {
          site.queue.splice(i, 1)
          advanceQueue(site, i)
        }
      }
      a.site = null
      a.carry = 'mangkuk'
      if (c) goTo(a, 'makan', c.site, c.slot)
      else {
        // semua kursi penuh: makanannya dibawa, dimakan sambil duduk di dekat sini
        const spot = choose(a, 'santai', { spread: 20 })
        if (spot) goTo(a, 'bekal', spot.site, spot.slot)
        else begin(a, 'bekal', null, -1, between(...KEGIATAN.bekal.lama))
      }
      return
    }
    // kegiatan selesai
    settle(a)
    // jajan di kios makanan juga mengenyangkan
    if (a.act === 'belanja' && a.site?.shop && a.site.shop !== 'ramuan' && a.site.shop !== 'tempa') a.need.lapar = Math.max(0, a.need.lapar - 0.45)
    if (a.act === 'makan' || a.act === 'jamuan') a.carry = null
    if (a.atWork) a.atWork = false
    decide(a)
  }

  function decide(a) {
    a.carry = a.carry === 'mangkuk' ? null : a.carry
    if (a.kind === 'kesatria') decideKnight(a)
    else decideVillager(a)
  }

  // ----------------------------------------------------------------- keadaan awal: semua sudah
  // berkegiatan (sebagian di tengah jalan), supaya Aeloria langsung ramai
  for (const a of agents) {
    a.needT = 0
    const home = a.home || { x: between(-200, 200), z: between(-950, -600) }
    a.x = home.x
    a.z = home.z
  }
  {
    const start = []
    for (const a of agents) start.push(a)
    // penduduk mulai di tempat kerjanya / rumah; kesatria tersebar di tempat-tempat kegiatan
    for (const a of start) {
      if (a.kind !== 'kesatria') {
        if (a.work && rand() < 0.8) {
          tryVillager(a, 'kerja')
          finishNow(a)
        } else {
          decide(a)
          if (rand() < 0.7) finishNow(a)
        }
        continue
      }
      const n = nodes[Math.floor(rand() * nodes.length)]
      if (n && n.links.length) {
        a.x = n.x + between(-3, 3)
        a.z = n.z + between(-3, 3)
      }
      decide(a)
      // ±85% langsung tiba (sudah berkegiatan sejak tadi), sisanya di tengah perjalanan
      if (rand() < 0.85) finishNow(a)
      else if (a.act === 'jalan') a.wT0 = T - rand() * (a.len / a.speed) * 0.9
    }
  }
  // lompat ke akhir perjalanan & mulai kegiatannya dengan sisa waktu acak
  function finishNow(a) {
    if (a.act !== 'jalan' || !a.pts) return
    wake(a)
    if (a.phase === 'di' && a.act !== 'antre' && a.until > T) {
      const left = (a.until - T) * rand()
      schedule(a, T + Math.max(2, left))
      a.startT = T - rand() * 30
    }
  }

  // ----------------------------------------------------------------- peristiwa besar
  function updateEvents() {
    // Pesta besar di Padang Pesta: pemusik bermain, banyak kesatria datang menari
    if (!feast.on && T > feast.next) {
      feast.on = true
      feast.t = T + 200
    } else if (feast.on && T > feast.t) {
      feast.on = false
      feast.next = T + 260 + rand() * 200
    }
    // latihan baris-berbaris bersama dipimpin kapten
    if (!drill.on && T > drill.next && drill.site) {
      drill.on = true
      drill.t = T + 150
      drill.t0 = T
    } else if (drill.on && T > drill.t) {
      drill.on = false
      drill.next = T + 180 + rand() * 120
    }
  }

  // ----------------------------------------------------------------- tampilan
  // klip & barang yang dipegang menurut kegiatan + pose slotnya; beberapa kegiatan berganti-ganti
  // gerak (mengobrol: bicara–mengangguk–diam; pesta: minum–makan–bersorak; tanding: menebas–bertahan)
  const out = { clip: 'idle', props: null, t: 0 }
  const PROPS = {
    pedang: ['pedang'], tombak: ['tombak'], tandingPedang: ['pedang', 'perisai'], busur: ['busur'], mangkuk: ['mangkuk'], roti: ['roti'], cangkir: ['cangkir'],
    kecapi: ['kecapi'], sendok: ['sendok'], palu: ['palu'], cangkul: ['cangkul'], keranjang: ['keranjang'], pancing: ['pancing'],
  }
  function look(a) {
    const t = T - a.startT
    const ph = a.phaseT
    out.t = t + ph
    out.props = null
    const pose = a.site && a.slot >= 0 ? a.site.slots[a.slot].pose : null
    const cycle = (period, n) => Math.floor((t + ph * 3) / period) % n
    switch (a.act) {
      case 'jalan':
      case 'antre':
        out.clip = a.act === 'jalan' ? (a.run ? 'run' : 'walk') : 'idle'
        out.t = a.act === 'jalan' ? ((T - a.wT0) * (a.run ? RUN_SPEED / RUN_ANIM : a.speed / WALK_ANIM)) + ph : t + ph
        if (a.carry) out.props = PROPS[a.carry]
        else if (a.kind === 'kesatria' && a.weapon === 'tombak' && a.goal === 'jaga') out.props = PROPS.tombak
        return out
      case 'makan':
        out.clip = 'eat'
        out.props = cycle(9, 3) === 2 ? PROPS.roti : PROPS.mangkuk
        return out
      case 'bekal':
        out.clip = 'bekal'
        out.props = PROPS.roti
        return out
      case 'jamuan': {
        const k = cycle(7, 4)
        out.clip = k === 0 ? 'eat' : 'drink'
        out.props = k === 0 ? PROPS.roti : PROPS.cangkir
        return out
      }
      case 'kedai':
        out.clip = cycle(8, 3) === 2 ? 'talk' : 'drink'
        out.props = out.clip === 'drink' ? PROPS.cangkir : null
        if (out.clip === 'talk') out.clip = 'sit'
        return out
      case 'tanding': {
        const partner = a.site.who[a.slot ^ 1]
        const ready = partner >= 0 && agents[partner].act === 'tanding'
        out.props = a.weapon === 'tombak' ? PROPS.tombak : PROPS.tandingPedang
        out.clip = !ready ? 'block' : ['spar', 'block', 'spar2', 'spar'][cycle(1.4, 4)]
        return out
      }
      case 'panah':
        out.clip = 'shoot'
        out.props = PROPS.busur
        return out
      case 'boneka':
      case 'latihSendiri':
        out.clip = ['spar', 'spar', 'spar2', 'block'][cycle(1.3, 4)]
        out.props = a.act === 'boneka' || a.weapon !== 'tombak' ? PROPS.pedang : PROPS.tombak
        return out
      case 'baris':
        // seluruh barisan serentak: waktunya dari awal latihan, bukan dari tiap elf
        out.clip = 'drill'
        out.t = T - (drill.t0 || 0)
        out.props = a.weapon === 'tombak' ? PROPS.tombak : PROPS.pedang
        return out
      case 'tari':
        out.clip = 'dance'
        return out
      case 'api':
        out.clip = pose === 'duduk' ? 'duduk' : 'sit'
        if (cycle(6, 3) === 1) out.clip = 'talk'
        return out
      case 'nonton':
        out.clip = feast.on || cycle(5, 3) === 0 ? 'cheer' : 'talk'
        return out
      case 'ngobrol':
        out.clip = ['talk', 'idle', 'nod', 'talk', 'shake', 'idle'][cycle(2.5, 6)]
        if (out.clip === 'nod' || out.clip === 'shake') out.t = (t + ph * 3) % 2.5
        return out
      case 'duduk':
        out.clip = 'sit'
        return out
      case 'pantai':
        out.clip = 'duduk'
        return out
      case 'mancing':
        out.clip = 'fish'
        out.props = PROPS.pancing
        return out
      case 'santai':
        out.clip = pose === 'idle' ? 'idle' : 'duduk'
        return out
      case 'rebahan':
        out.clip = 'sleep'
        return out
      case 'belanja':
        out.clip = 'buy'
        if (a.kind !== 'kesatria') out.props = PROPS.keranjang
        return out
      case 'jaga':
        out.clip = a.weapon === 'tombak' ? 'idle' : 'guard'
        out.props = a.weapon === 'tombak' ? PROPS.tombak : PROPS.pedang
        return out
      case 'sumur':
        out.clip = pose === 'work' ? 'work' : 'talk'
        return out
      case 'main':
        out.clip = 'run'
        out.t = t * 1.1 + ph
        return out
      case 'kerja':
        return lookWork(a, t, pose, cycle)
      default:
        out.clip = 'idle'
        return out
    }
  }
  function lookWork(a, t, pose, cycle) {
    switch (a.job) {
      case 'pedagang': {
        const s = a.work.site
        const busy = s.occ.some(o => o)
        out.clip = busy ? ['serve', 'talk', 'serve'][cycle(2.2, 3)] : ['idle', 'talk', 'idle', 'wave'][cycle(4, 4)]
        return out
      }
      case 'saji':
        out.clip = a.work.site.queue.length ? 'serve' : 'idle'
        return out
      case 'pandai':
        out.clip = 'smith'
        out.props = PROPS.palu
        return out
      case 'petani':
        out.clip = cycle(12, 3) === 2 ? 'harvest' : 'farm'
        out.props = out.clip === 'farm' ? PROPS.cangkul : null
        return out
      case 'masak':
        out.clip = 'cook'
        out.props = PROPS.sendok
        return out
      case 'musik':
        out.clip = 'lute'
        out.props = PROPS.kecapi
        return out
      default:
        out.clip = ['idle', 'talk'][cycle(5, 2)]
        return out
    }
  }

  // posisi di lingkaran tari: berputar mengelilingi api unggun
  function danceSpot(a) {
    const sl = a.site.slots[a.slot]
    const f = a.site.fire
    const ang = sl.a + (T - a.startT) * 0.22
    a.x = f.x + Math.cos(ang) * sl.r
    a.z = f.z + Math.sin(ang) * sl.r
    a.heading = Math.atan2(-Math.sin(ang), Math.cos(ang)) // menghadap arah putaran
  }
  // anak bermain: berlari mengitari titik bermain
  function playSpot(a) {
    const c = a.playAt || a
    const ang = (T - a.startT) * 0.9 + a.phaseT
    const r = 3 + Math.sin(a.phaseT) * 1.5
    a.x = c.x + Math.cos(ang) * r
    a.z = c.z + Math.sin(ang) * r
    a.heading = Math.atan2(-Math.sin(ang), Math.cos(ang))
  }

  // ----------------------------------------------------------------- per bingkai
  const frustum = new THREE.Frustum()
  const projView = new THREE.Matrix4()
  const sphere = new THREE.Sphere(new THREE.Vector3(), 1.4)
  // calon yang terlihat, diurutkan per ember jarak 1/BUCKETS jangkauan (urut-hitung, bukan sort)
  const BUCKETS = 96
  let candI = new Int32Array(4096)
  let candB = new Uint8Array(4096)
  let sortedI = new Int32Array(4096)
  const bucketStart = new Int32Array(BUCKETS + 1)
  let candN = 0
  let frame = 0
  const LIMIT = ELF_CAPS[quality.level] ?? ELF_CAPS.sedang
  const shown = { near: [], far: 0 }
  const draw = { type: 0, x: 0, y: 0, z: 0, heading: 0, clip: 'idle', t: 0, prev: null, prevT: 0, fade: 0, dye: null, props: null }
  const top = [0, 0]
  let lastFocus = { x: 0, z: 0 }

  const prof = { kejadian: 0, pilah: 0, urut: 0, gambar: 0, n: 0 }
  function update(dt, camera, focus, range = 110) {
    const p0 = performance.now()
    T += dt
    updateEvents()
    // kejadian yang jatuh tempo (dibatasi per bingkai supaya tidak tersendat)
    let budget = 400
    while (queue.peek() <= T && budget-- > 0) {
      queue.pop(top)
      const a = agents[top[0]]
      if (a.tok !== top[1]) continue
      wake(a)
    }

    const p1 = performance.now()
    // elf yang terlihat
    camera.updateMatrixWorld()
    projView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projView)
    const fx = focus.x
    const fz = focus.z
    lastFocus = { x: fx, z: fz }
    frame++
    candN = 0
    bucketStart.fill(0)
    const r2 = range * range
    for (let i = 0; i < agents.length; i++) {
      if (HID[i]) continue
      const dx = CX[i] - fx
      const dz = CZ[i] - fz
      const lim = range + CR[i]
      if (dx * dx + dz * dz > lim * lim) continue
      const a = agents[i]
      // yang bergerak: letaknya dihitung tiap bingkai bila dekat, bergiliran (1 dari 3 bingkai)
      // bila jauh — model jauh kecil di layar, lompatan 15 cm tidak terlihat
      if (a.phase === 'jalan' && a.pts) {
        if (a.near || (frame + i) % 3 === 0) {
          walkPos(a)
          a.y = ground.surfaceAt(a.x, a.z)
        }
      } else if (a.act === 'tari' && a.site) danceSpot(a)
      else if (a.act === 'main') playSpot(a)
      const ex = a.x - fx
      const ez = a.z - fz
      const d2 = ex * ex + ez * ez
      if (d2 > r2) continue
      a.near = d2 < 40 * 40
      sphere.center.set(a.x, a.y + 0.9, a.z)
      if (!frustum.intersectsSphere(sphere)) continue
      if (candN === candI.length) {
        const grow = A => {
          const N = new A.constructor(A.length * 2)
          N.set(A)
          return N
        }
        candI = grow(candI)
        candB = grow(candB)
        sortedI = new Int32Array(candI.length)
      }
      const b = Math.min(BUCKETS - 1, Math.floor((Math.sqrt(d2) / range) * BUCKETS))
      candI[candN] = i
      candB[candN] = b
      bucketStart[b + 1]++
      candN++
    }
    const p2 = performance.now()
    // urut-hitung per ember jarak: yang terdekat lebih dulu → model penuh
    for (let b = 0; b < BUCKETS; b++) bucketStart[b + 1] += bucketStart[b]
    for (let k = 0; k < candN; k++) sortedI[bucketStart[candB[k]]++] = candI[k]
    const n = candN
    const p3 = performance.now()
    folk.begin()
    shown.near.length = 0
    shown.far = 0
    const total = Math.min(n, LIMIT.near + LIMIT.far)
    for (let k = 0; k < total; k++) {
      const a = agents[sortedI[k]]
      const near = k < LIMIT.near
      const L = look(a)
      // peralihan halus antar-klip (hanya terlihat pada model dekat)
      if (L.clip !== a.clip) {
        a.prev = a.clip
        a.prevT = T - a.clipT0
        a.clip = L.clip
        a.clipT0 = T
      }
      const since = T - a.clipT0
      draw.type = a.type
      draw.x = a.x
      draw.y = a.y
      draw.z = a.z
      draw.heading = a.heading
      draw.clip = L.clip
      draw.t = L.t
      draw.prev = a.prev
      draw.prevT = a.prevT + since
      draw.fade = since < FADE ? FADE - since : 0
      draw.dye = a.dye
      draw.props = near ? L.props : null
      draw.scale = a.scale
      if (!folk.put(draw, near)) continue
      if (near) shown.near.push(a)
      else shown.far++
    }
    folk.end()
    chatter(dt)
    const p4 = performance.now()
    prof.kejadian += p1 - p0
    prof.pilah += p2 - p1
    prof.urut += p3 - p2
    prof.gambar += p4 - p3
    prof.n++
  }

  // ----------------------------------------------------------------- gelembung ucapan
  const UCAPAN = {
    makan: ['Enak sekali!', 'Sup jamurnya lezat.', 'Tambah lagi, ah!', 'Rotinya masih hangat.'],
    bekal: ['Balai Makan penuh, bekal saja.', 'Roti bekal pun enak.'],
    jamuan: ['Bersulang!', 'Untuk Aeloria!', 'Hidangannya luar biasa!'],
    kedai: ['Satu cangkir lagi!', 'Hik!', 'Sari buahnya segar.'],
    tanding: ['Hiaaat!', 'Bagus! Lagi!', 'Pertahananmu kuat!', 'Kena kau!'],
    panah: ['Tepat sasaran!', 'Hampir...', 'Anginnya kencang.'],
    boneka: ['Hah!', 'Satu lagi!'],
    baris: ['Siap!', 'Satu! Dua!'],
    tari: ['Ayo menari!', 'Lagu kesukaanku!', 'Hidup Aeloria!'],
    nonton: ['Bagus sekali!', 'Lagi! Lagi!'],
    api: ['Hangatnya...', 'Kau ingat perang di utara?', 'Ceritakan lagi!'],
    ngobrol: ['Kau dengar kabar dari selatan?', 'Orc makin berani...', 'Cuaca indah hari ini.', 'Raja akan berpidato besok.', 'Pedangmu baru, ya?', 'Haha, benar sekali!'],
    jaga: ['Semua aman.', 'Jangan buat onar di sini.'],
    pantai: ['Lautnya tenang.', 'Indah sekali...'],
    mancing: ['Ayo, makan umpannya...', 'Dapat satu!'],
    rebahan: ['Zzz...'],
    santai: ['Damai sekali di sini.', 'Hmm...'],
    belanja: ['Berapa harganya?', 'Aku ambil yang ini.'],
    sumur: ['Airnya jernih.', 'Pagi, tetangga!'],
    main: ['Kejar aku!', 'Hihihi!', 'Tidak kena!'],
    pedagang: ['Roti hangat! Roti hangat!', 'Buah segar dari kebun!', 'Mampir, mampir!', 'Murah untuk hari ini!'],
    pandai: ['Satu pedang lagi selesai!', 'Bajanya sudah merah.'],
    petani: ['Panen tahun ini bagus.', 'Fiuh, panas sekali.'],
    masak: ['Supnya hampir matang!'],
    musik: ['♪ La la la ♪'],
  }
  let bubbles = null
  let chatT = 0
  function chatter(dt) {
    if (!bubbles || !shown.near.length) return
    chatT -= dt
    if (chatT > 0) return
    chatT = 1.4 + rand() * 1.6
    const a = shown.near[Math.floor(rand() * Math.min(shown.near.length, 30))]
    if (!a || T - a.say < 20) return
    const key = a.act === 'kerja' ? a.job : a.act
    const lines = UCAPAN[key]
    if (!lines) return
    a.say = T
    bubbles.say(() => (a.hidden ? null : { x: a.x, y: a.y + 2.25 * a.scale, z: a.z }), pick(lines), 2600, `elf${a.id}`)
  }

  // ----------------------------------------------------------------- untuk UI & pengujian
  const moodOf = a => {
    const n = a.need
    if (a.down) return 'pingsan'
    if (n.lapar > 0.8) return 'lapar sekali'
    if (n.lelah > 0.8) return 'kelelahan'
    if (n.bosan > 0.75) return 'bosan'
    if (n.sepi > 0.75) return 'kesepian'
    if (a.act === 'tari' || a.act === 'jamuan' || a.act === 'nonton') return 'gembira'
    return n.lapar + n.lelah + n.bosan + n.sepi < 1.2 ? 'senang' : 'biasa saja'
  }
  function describe(a) {
    settle(a)
    const act = a.act === 'jalan' ? a.goal : a.act
    const K = KEGIATAN[act]
    let doing = K ? K.teks : 'berjalan-jalan'
    if (act === 'kerja') doing = { pedagang: `berjualan ${a.work?.site?.goods ?? ''}`.trim(), pandai: 'menempa senjata di Tempa Aeloria', petani: 'bertani di ladang', masak: 'memasak di Balai Makan', saji: 'melayani antrean makan', musik: 'bermain musik', kedai: 'menjaga Kedai Daun Emas', warga: 'bekerja' }[a.job] || 'bekerja'
    if (act === 'tidur' && a.site?.area === 'benteng') doing = 'beristirahat di barak benteng'
    const sifat = SIFAT.slice().sort((p, q) => a.sifat[q] - a.sifat[p]).slice(0, 2).map(k => SIFAT_TEKS[k])
    const role = a.kind === 'kesatria' ? `${a.rank} ${PASUKAN[a.pasukan].name}` : PEKERJAAN[a.job]
    return {
      id: a.id, nama: a.name, peran: role, senjata: a.kind === 'kesatria' ? { pedang: 'pedang & perisai', tombak: 'tombak', busur: 'busur' }[a.weapon] : null,
      kegiatan: a.act === 'jalan' ? `menuju: ${doing}` : `sedang ${doing}`, suasana: moodOf(a), sifat,
      kebutuhan: Object.fromEntries(KEBUTUHAN.map(k => [k, Math.round(a.need[k] * 100)])),
    }
  }

  return {
    agents,
    sites,
    update,
    setBubbles(b) {
      bubbles = b
    },
    // elf yang digambar model dekat (untuk mengetuk & mendorong pemain)
    get near() {
      return shown.near
    },
    describe,
    get time() {
      return T
    },
    get feast() {
      return feast.on
    },
    get drill() {
      return drill.on
    },
    // dorong titik (pemain) keluar dari badan elf terdekat
    pushOut(pos, radius = 0.35) {
      for (const a of shown.near) {
        if (a.hidden || a.act === 'rebahan') continue
        const dx = pos.x - a.x
        const dz = pos.z - a.z
        const min = radius + 0.33 * a.scale
        const d2 = dx * dx + dz * dz
        if (d2 >= min * min || d2 < 1e-8) continue
        const d = Math.sqrt(d2)
        pos.x = a.x + (dx / d) * min
        pos.z = a.z + (dz / d) * min
      }
    },
    stats() {
      const by = {}
      for (const a of agents) {
        const k = a.act === 'jalan' ? 'berjalan' : a.act
        by[k] = (by[k] || 0) + 1
      }
      // rata-rata ms per bingkai sejak panggilan stats() sebelumnya
      const ms = prof.n ? Object.fromEntries(['kejadian', 'pilah', 'urut', 'gambar'].map(k => [k, +(prof[k] / prof.n).toFixed(2)])) : null
      for (const k of ['kejadian', 'pilah', 'urut', 'gambar', 'n']) prof[k] = 0
      return {
        kesatria: agents.filter(a => a.kind === 'kesatria').length,
        penduduk: agents.filter(a => a.kind === 'penduduk').length,
        anak: agents.filter(a => a.kind === 'anak').length,
        dekat: shown.near.length,
        jauh: shown.far,
        kandidat: candN,
        antrean: queue.size,
        porsi: served,
        pesta: feast.on,
        baris: drill.on,
        kegiatan: by,
        fokus: lastFocus,
        ms,
      }
    },
    // lompati waktu (pengujian): kejadian diproses per langkah
    skip(seconds, step = 1) {
      for (let s = 0; s < seconds; s += step) {
        T += step
        updateEvents()
        while (queue.peek() <= T) {
          queue.pop(top)
          const a = agents[top[0]]
          if (a.tok === top[1]) wake(a)
        }
      }
    },
    citadel: CITADEL,
  }
}
