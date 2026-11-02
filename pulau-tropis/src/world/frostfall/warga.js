import * as THREE from 'three'
import { rng } from '../../core/random.js'
import { packDye, FADE } from '../aeloria/elf.js'
import { buatPenduduk, PEKERJAAN, DESA } from './penduduk.js'
import { ROADS, TRAILS, PIER } from './layout.js'

// Kehidupan ±300 penduduk Kerajaan Frostfall (v0.22.0). Tiap orang (penduduk.js) hidup menurut JAM
// FROSTFALL (sehari = 20 menit nyata): bangun & sarapan di rumah, bekerja sesuai pekerjaannya, makan
// siang, mengobrol dengan teman, menghangatkan badan di api unggun, pulang makan malam bersama
// keluarga, lalu tidur di rumahnya. Pilihan tiap saat ditimbang dari kebutuhannya (lapar, lelah, bosan,
// kesepian, kedinginan), sifatnya, jam, dan acara di kampungnya. Penduduk sendiri yang mengadakan acara:
// pesta api unggun di alun-alun Emberwick, malam ikan bakar di Teluk Salju, jamuan hasil buruan di Rusa
// Putih (bila perburuan pagi berhasil), syukuran keluarga di depan rumah, perang bola salju anak-anak,
// dongeng tetua di api unggun. Pemburu berangkat berkelompok ke hutan, mengintai kawanan rusa kutub
// (rusa.js), memanah, lalu memikul hasilnya pulang berdua.
// Yang di dalam rumah tidak digambar; yang terlihat digambar dengan sistem warna-per-orang elf.js
// (rupa orang Utara, tokoh/rupa.js): terdekat model penuh, sisanya model jauh.

export const WARGA_CAPS = { rendah: { near: 18, far: 70 }, sedang: { near: 36, far: 140 }, tinggi: { near: 64, far: 260 } }
export const JAM = 50 // detik nyata per jam Frostfall
const MULAI = 8 // jam saat game dimuat
const MENIT = JAM / 60
const SPEED = { dewasa: 1.25, anak: 1.45, tua: 0.85, lari: 3.6 }
const WALK_ANIM = 1.4
const RUN_ANIM = 4.0

// teks "sedang …" tiap kegiatan
export const KEGIATAN = {
  tidur: 'tidur di rumah', rumah: 'beristirahat di rumah', sarapan: 'sarapan di rumah bersama keluarga', makanMalam: 'makan malam bersama keluarga',
  makanSiang: 'makan siang di rumah', bekal: 'makan bekal', mancing: 'memancing', mancingEs: 'memancing di lubang es sungai',
  jemur: 'menjemur ikan di rak', asap: 'mengasapi hasil tangkapan', kulit: 'menyamak kulit rusa', tebang: 'menebang kayu di tepi hutan',
  kayu: 'membelah kayu bakar', kios: 'berjualan di pasar Emberwick', beli: 'berbelanja di pasar', tempa: 'menempa besi', masak: 'memasak di kedai panjang',
  saji: 'melayani tamu kedai panjang', kedai: 'makan di kedai panjang', jaga: 'berjaga di menara', sumur: 'menimba air di sumur',
  sapu: 'menyekop salju di depan rumah', hangat: 'menghangatkan badan di api unggun', duduk: 'duduk-duduk di dekat api unggun',
  ngobrol: 'mengobrol', main: 'bermain kejar-kejaran', bolaSalju: 'perang bola salju', dongeng: 'mendengarkan dongeng',
  mendongeng: 'mendongeng untuk anak-anak', buru: 'berburu rusa kutub', menari: 'menari di sekeliling api unggun',
  musik: 'memainkan kecapi', pesta: 'berpesta', jamuan: 'makan bersama di jamuan', kumpul: 'datang ke acara keluarga',
  jalan: 'berjalan-jalan', lihat: 'melihat-lihat sekeliling kampung', ikut: 'menemani orang tuanya bekerja', antar: 'mengantar hasil tangkapan', bicara: 'mengobrol denganmu',
}

// ------------------------------------------------------------------ antrean prioritas kecil
class Heap {
  constructor() {
    this.k = []
    this.v = []
  }

  get size() {
    return this.k.length
  }

  push(key, val) {
    const { k, v } = this
    let i = k.length
    k.push(key)
    v.push(val)
    while (i > 0) {
      const p = (i - 1) >> 1
      if (k[p] <= key) break
      k[i] = k[p]
      v[i] = v[p]
      i = p
    }
    k[i] = key
    v[i] = val
  }

  pop() {
    const { k, v } = this
    const top = v[0]
    const lk = k.pop()
    const lv = v.pop()
    if (k.length) {
      let i = 0
      for (;;) {
        const l = 2 * i + 1
        const r = l + 1
        let m = i
        let mk = lk
        if (l < k.length && k[l] < mk) {
          m = l
          mk = k[l]
        }
        if (r < k.length && k[r] < mk) m = r
        if (m === i) break
        k[i] = k[m]
        v[i] = v[m]
        i = m
      }
      k[i] = lk
      v[i] = lv
    }
    return top
  }
}

export function createWarga({ ground, plan, folk, rusa, quality, colliders = null }) {
  const rand = rng(31337)
  const between = (a, b) => a + (b - a) * rand()
  const pick = list => list[Math.floor(rand() * list.length)]
  const chance = p => rand() < p
  const W = plan.warga
  const { orang, keluarga } = buatPenduduk(W.homes)
  const homeById = new Map(W.homes.map(h => [h.id, h]))
  let T = 0 // detik simulasi sejak dimuat
  let bubbles = null
  let player = null

  // ------------------------------------------------------------------ jam Frostfall
  const jamOf = t => (MULAI + t / JAM) % 24
  const hariOf = t => Math.floor((MULAI + t / JAM) / 24) + 1
  const jam = () => jamOf(T)
  // detik simulasi sampai jam h berikutnya (h boleh pecahan)
  const untilHour = h => {
    let d = (h - jam()) % 24
    if (d <= 0.01) d += 24
    return T + d * JAM
  }
  const mins = (a, b) => between(a, b) * MENIT
  // 0 siang .. 1 malam: senja 17:30–20:00, fajar 4:30–7:00
  function malamOf(j) {
    if (j >= 20 || j < 4.5) return 1
    if (j >= 17.5) return (j - 17.5) / 2.5
    if (j < 7) return 1 - (j - 4.5) / 2.5
    return 0
  }
  const inRange = (j, a, b) => (a <= b ? j >= a && j < b : j >= a || j < b)
  const fmtJam = h => `${String(Math.floor(h) % 24).padStart(2, '0')}.${String(Math.round((h % 1) * 60) % 60).padStart(2, '0')}`

  // ------------------------------------------------------------------ penghalang & garis bebas
  const BC = 2
  const BX0 = 360
  const BZ0 = -540
  const BW = 520
  const BH = 540
  const blocked = new Uint8Array(BW * BH)
  for (const c of colliders || plan.colliders) {
    if (c.y0 !== undefined || !(c.x > BX0 && c.x < BX0 + BW * BC && c.z > BZ0 && c.z < BZ0 + BH * BC)) continue
    const r0 = c.radius ?? Math.hypot(c.hx, c.hz)
    if (r0 < 0.3) continue
    const PAD = 0.45
    const r = r0 + PAD + BC
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
  const isBlocked = (x, z) => {
    const i = Math.floor((x - BX0) / BC)
    const j = Math.floor((z - BZ0) / BC)
    return i < 0 || j < 0 || i >= BW || j >= BH || blocked[j * BW + i] === 1
  }
  const onPier = (x, z) => x > PIER.x0 && x < PIER.x1 + 1 && Math.abs(z - PIER.z) < PIER.w / 2 + 0.2
  // garis bebas penghalang & tidak lewat air dalam (ujung-ujungnya dikecualikan: kursi & pintu memang
  // menempel ke bangku / dinding)
  function clearLine(x0, z0, x1, z1) {
    const len = Math.hypot(x1 - x0, z1 - z0)
    const n = Math.ceil(len)
    for (let k = 1; k < n; k++) {
      const t = k / n
      if (t * len < 1.6 || (1 - t) * len < 1.6) continue
      const x = x0 + (x1 - x0) * t
      const z = z0 + (z1 - z0) * t
      if (isBlocked(x, z)) return false
      if ((k & 3) === 0 && ground.heightAt(x, z) < -0.4 && !onPier(x, z)) return false
    }
    return true
  }
  const yAt = (x, z) => Math.max(ground.surfaceAt(x, z), ground.outerAt ? ground.outerAt(x, z) : -Infinity)

  // ------------------------------------------------------------------ jaringan jalan
  const nodes = []
  const NCELL = 16
  const nodeGrid = new Map()
  const nkey = (x, z) => `${Math.floor(x / NCELL)},${Math.floor(z / NCELL)}`
  function nodeAt(x, z) {
    // gabungkan dengan simpul yang sudah ada sedekat 2,5 m (persimpangan)
    const ci = Math.floor(x / NCELL)
    const cj = Math.floor(z / NCELL)
    for (let i = ci - 1; i <= ci + 1; i++)
      for (let j = cj - 1; j <= cj + 1; j++)
        for (const n of nodeGrid.get(`${i},${j}`) || []) if (Math.hypot(n.x - x, n.z - z) < 2.5) return n
    const n = { id: nodes.length, x, z, links: [] }
    nodes.push(n)
    const k = nkey(x, z)
    if (!nodeGrid.has(k)) nodeGrid.set(k, [])
    nodeGrid.get(k).push(n)
    return n
  }
  const link = (a, b) => {
    if (a === b || a.links.includes(b)) return
    a.links.push(b)
    b.links.push(a)
  }
  function addLine(line, step = 7) {
    let prev = null
    for (let i = 0; i < line.length - 1; i++) {
      const a = line[i]
      const b = line[i + 1]
      const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / step))
      for (let k = i === 0 ? 0 : 1; k <= n; k++) {
        const nd = nodeAt(a.x + ((b.x - a.x) * k) / n, a.z + ((b.z - a.z) * k) / n)
        if (prev) link(prev, nd)
        prev = nd
      }
    }
  }
  // jalan desa (lorong belakang Emberwick), jalan & setapak Frostfall, lorong kampung
  addLine([{ x: 630, z: -65.5 }, { x: 694, z: -65.5 }, { x: 756, z: -65.5 }])
  addLine([{ x: 630, z: -19.5 }, { x: 694, z: -19.5 }, { x: 756, z: -19.5 }])
  for (const r of [...ROADS, ...TRAILS]) addLine(r.line)
  for (const l of W.lanes) addLine(l)
  // simpul terdekat yang bisa dicapai lurus dari (x, z) (paling banyak 6 dicoba), atau yang terdekat
  function nearNode(x, z) {
    const cands = []
    const ci = Math.floor(x / NCELL)
    const cj = Math.floor(z / NCELL)
    for (let r = 1; r <= 4 && cands.length < 6; r++)
      for (let i = ci - r; i <= ci + r; i++)
        for (let j = cj - r; j <= cj + r; j++) for (const n of nodeGrid.get(`${i},${j}`) || []) if (!cands.includes(n)) cands.push(n)
    if (!cands.length) {
      let best = nodes[0]
      for (const n of nodes) if (Math.hypot(n.x - x, n.z - z) < Math.hypot(best.x - x, best.z - z)) best = n
      return best
    }
    cands.sort((a, b) => Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z))
    for (const n of cands.slice(0, 6)) if (clearLine(x, z, n.x, n.z)) return n
    return cands[0]
  }
  // rute Dijkstra antar simpul (disimpan per simpul asal)
  const prevCache = new Map()
  function route(a, b) {
    let prev = prevCache.get(a.id)
    if (!prev) {
      const dist = new Float64Array(nodes.length).fill(Infinity)
      prev = new Int32Array(nodes.length).fill(-1)
      const h = new Heap()
      dist[a.id] = 0
      h.push(0, a.id)
      while (h.size) {
        const u = h.pop()
        const nu = nodes[u]
        for (const v of nu.links) {
          const d = dist[u] + Math.hypot(v.x - nu.x, v.z - nu.z)
          if (d < dist[v.id]) {
            dist[v.id] = d
            prev[v.id] = u
            h.push(d, v.id)
          }
        }
      }
      if (prevCache.size > 160) prevCache.delete(prevCache.keys().next().value)
      prevCache.set(a.id, prev)
    }
    const out = []
    for (let k = b.id; k >= 0; k = prev[k]) {
      out.push(nodes[k])
      if (k === a.id) break
    }
    if (out[out.length - 1] !== a) return null
    return out.reverse()
  }

  // ------------------------------------------------------------------ penduduk hidup
  const TYPES = folk.types
  const agents = orang.map(o => {
    const h = homeById.get(o.rumah)
    const tua = o.umur >= 66
    return {
      id: o.id, o, home: h, x: h.door.x, z: h.door.z, y: h.y, heading: h.rot, hidden: true,
      act: 'tidur', goal: null, until: 0, path: null, pi: 0, speed: o.umur < 13 ? SPEED.anak : tua ? SPEED.tua : SPEED.dewasa, run: false,
      clip: 'idle', t: rand() * 3, prev: null, prevT: 0, fade: 0, props: [], scale: o.rupa.skala, type: Math.max(0, TYPES.indexOf(o.rupa.body)),
      dye: packDye(o.rupa.dye),
      need: { lapar: between(0.1, 0.4), lelah: between(0, 0.2), bosan: between(0.1, 0.5), sepi: between(0.1, 0.5), dingin: between(0, 0.3) },
      spot: null, event: null, role: null, ring: 0, party: null, talk: false, gaya: null, gayaT: 0, catch: 0, diary: [], said: -999, waved: -999,
      face: null, sneak: false,
      // geseran tetap dari garis tengah jalan (supaya yang berjalan tidak berbaris satu-satu)
      jx: (rand() - 0.5) * 1.8, jz: (rand() - 0.5) * 1.8,
    }
  })
  const byId = id => agents[id]

  // catatan harian (untuk obrolan): { hari, jam, teks }
  function note(a, teks) {
    a.diary.push({ hari: hariOf(T), jam: jam(), teks })
    if (a.diary.length > 8) a.diary.shift()
  }

  // ------------------------------------------------------------------ tempat (dipakai bergiliran)
  const spots = W.spots.map((s, i) => ({ ...s, i, by: null }))
  const seats = []
  for (const f of W.fires) f.seats.forEach(s => seats.push({ ...s, y: f.y, kind: 'api', fire: f, by: null }))
  for (const t of W.tables) t.seats.forEach(s => seats.push({ ...s, y: t.y, kind: 'meja', table: t, by: null }))
  const fireOf = desa => W.fires.find(f => f.desa === desa)
  const plazaOf = desa => W.plazas.find(p => p.desa === desa)
  const kedaiTable = W.tables.find(t => t.id === 'kedai')
  function takeSpot(a, s) {
    releaseSpot(a)
    s.by = a.id
    a.spot = s
  }
  function releaseSpot(a) {
    if (a.spot && a.spot.by === a.id) a.spot.by = null
    a.spot = null
  }
  const freeSpots = (kind, desa = null) => spots.filter(s => s.kind === kind && s.by === null && (!desa || s.desa === desa))
  const freeSeats = filter => seats.filter(s => s.by === null && filter(s))
  const nearest = (list, x, z) => list.reduce((b, s) => (!b || Math.hypot(s.x - x, s.z - z) < Math.hypot(b.x - x, b.z - z) ? s : b), null)

  // ------------------------------------------------------------------ berjalan
  // tujuan: titik (tx, tz); lalu `then(a)` saat tiba
  function walkTo(a, tx, tz, then, { run = false } = {}) {
    if (a.hidden) {
      a.hidden = false
      a.x = a.home.door.x
      a.z = a.home.door.z
      a.heading = a.home.rot
    }
    const d = Math.hypot(tx - a.x, tz - a.z)
    let path
    if (d < 0.4) path = []
    else if (d < 70 && clearLine(a.x, a.z, tx, tz)) path = [{ x: tx, z: tz }]
    else {
      const n0 = nearNode(a.x, a.z)
      const n1 = nearNode(tx, tz)
      const r = n0 === n1 ? [n0] : route(n0, n1)
      path = (r || [n0, n1]).map(n => ({ x: n.x + a.jx, z: n.z + a.jz }))
      path.push({ x: tx, z: tz })
      // pangkas simpul awal yang bisa dilompati lurus
      while (path.length > 1 && clearLine(a.x, a.z, path[1].x, path[1].z) && Math.hypot(path[1].x - a.x, path[1].z - a.z) < 40) path.shift()
      while (path.length > 2 && clearLine(path[path.length - 3].x, path[path.length - 3].z, tx, tz)) path.splice(path.length - 2, 1)
    }
    a.path = path
    a.pi = 0
    a.run = run
    a.act = 'jalan'
    a.then = then
    a.until = Infinity
    setClip(a, run ? 'run' : 'walk')
    a.props = a.carryProps || []
  }
  function stepWalk(a, dt) {
    const v = a.run ? SPEED.lari : a.sneak ? 0.55 : a.speed
    let left = v * dt
    while (left > 0 && a.pi < a.path.length) {
      const p = a.path[a.pi]
      const dx = p.x - a.x
      const dz = p.z - a.z
      const L = Math.hypot(dx, dz)
      if (L <= left) {
        a.x = p.x
        a.z = p.z
        left -= L
        a.pi++
      } else {
        a.x += (dx / L) * left
        a.z += (dz / L) * left
        left = 0
        const want = Math.atan2(dx, dz)
        a.heading += Math.atan2(Math.sin(want - a.heading), Math.cos(want - a.heading)) * Math.min(1, dt * 8)
      }
    }
    a.t += dt * (v / (a.run ? RUN_ANIM : WALK_ANIM)) * (1 / a.scale)
    if (a.pi >= a.path.length) {
      const { then } = a
      a.then = null
      a.path = null
      if (then) then(a)
      else decide(a)
    }
  }

  // ------------------------------------------------------------------ klip & kegiatan
  function setClip(a, clip) {
    if (a.clip === clip) return
    a.prev = a.clip
    a.prevT = a.t
    a.fade = FADE
    a.clip = clip
    a.t = 0
  }
  // mulai kegiatan di tempat: klip, barang di tangan, arah hadap, lama (detik simulasi)
  function doAct(a, act, { clip = 'idle', props = [], dur = mins(20, 40), face = null, x = null, z = null, hidden = false } = {}) {
    a.act = act
    a.until = T + dur
    a.hidden = hidden
    if (x !== null) {
      a.x = x
      a.z = z
    }
    if (face !== null) a.heading = face
    a.props = props
    setClip(a, clip)
  }
  const faceTo = (a, x, z) => Math.atan2(x - a.x, z - a.z)

  // pulang lalu berada di dalam rumah (act) sampai `until`
  function goHome(a, act, until) {
    releaseSpot(a)
    a.event = null
    a.carryProps = null
    const enter = () => {
      doAct(a, act, { hidden: true, dur: 0 })
      a.until = until
      a.x = a.home.door.x
      a.z = a.home.door.z
    }
    if (a.hidden) enter()
    else walkTo(a, a.home.door.x, a.home.door.z, enter)
  }
  // keluar rumah (bila di dalam) lalu pergi ke tempat s
  function goSpot(a, s, act, opts) {
    takeSpot(a, s)
    walkTo(a, s.x, s.z, () => doAct(a, act, { face: s.rot, ...opts }))
  }

  // ------------------------------------------------------------------ acara (dibuat penduduk sendiri)
  const events = [] // { id, jenis, nama, desa, mulai, selesai, hari, host, tempat, peserta: Set }
  let eventId = 0
  const hunts = { hari: 0, berhasil: 0, rusa: 0 }
  const catches = { hari: 0, nelayan: 0, desa: 0 }
  let lastScheduled = -1
  function addEvent(e) {
    const ev = { id: eventId++, hari: hariOf(T), peserta: new Set(), ...e }
    events.push(ev)
    // tuan rumah mengumumkannya (masuk ingatannya untuk obrolan)
    if (ev.host !== null && ev.host !== undefined) note(byId(ev.host), `mengadakan ${ev.nama.toLowerCase()} jam ${fmtJam(ev.mulai)}`)
    return ev
  }
  const adults = desa => agents.filter(a => a.o.desa === desa && a.o.umur >= 18)
  // tiap jam: susun acara hari ini (sekali sehari, jam 6 pagi) & bersihkan acara yang lewat
  function schedule() {
    const h = hariOf(T)
    if (lastScheduled === h) return
    lastScheduled = h
    // acara hari kemarin dibuang
    for (let i = events.length - 1; i >= 0; i--) if (events[i].hari < h) events.splice(i, 1)
    // pesta api unggun di alun-alun Emberwick setiap malam
    {
      const host = adults('desa').filter(a => a.o.kerja !== 'jaga').sort((p, q) => q.o.sifat.riang + rand() * 0.5 - (p.o.sifat.riang + rand() * 0.5))[0]
      addEvent({ jenis: 'pesta', nama: 'Pesta Api Unggun', desa: 'desa', mulai: 19, selesai: 22.5, host: host.id, tempat: { fire: fireOf('desa') } })
    }
    // kampung: kumpul di api unggun (diganti malam ikan bakar / jamuan hasil buruan bila tangkapannya banyak)
    for (const desa of ['nelayan', 'pemburu']) {
      const host = pick(adults(desa))
      addEvent({ jenis: 'kumpul-api', nama: 'Kumpul di Api Unggun', desa, mulai: 19, selesai: 21.5, host: host.id, tempat: { fire: fireOf(desa) } })
    }
    // perang bola salju anak-anak di tiap kampung
    for (const desa of ['desa', 'nelayan', 'pemburu']) addEvent({ jenis: 'bolaSalju', nama: 'Perang Bola Salju', desa, mulai: 15, selesai: 16.5, host: null, tempat: { plaza: plazaOf(desa) } })
    // dongeng tetua pagi & sore di api unggun salah satu kampung
    for (const [mulai, selesai] of [[10, 11], [16.5, 17.5]]) {
      const tetua = agents.filter(a => a.o.umur >= 62)
      if (!tetua.length) continue
      const host = pick(tetua)
      addEvent({ jenis: 'dongeng', nama: 'Dongeng di Api Unggun', desa: host.o.desa, mulai, selesai, host: host.id, tempat: { fire: fireOf(host.o.desa) } })
    }
    // syukuran keluarga: dua keluarga dari kampung berbeda
    const desas = ['desa', 'nelayan', 'pemburu'].sort(() => rand() - 0.5).slice(0, 2)
    for (const desa of desas) {
      const fams = keluarga.filter(f => f.desa === desa)
      const f = pick(fams)
      const anak = f.anggota.map(byId).filter(a => a.o.peran === 'anak')
      const tuan = f.anggota.map(byId).find(a => a.o.peran === 'ibu' || a.o.peran === 'ayah') || byId(f.anggota[0])
      const nama = anak.length && chance(0.6) ? `Ulang Tahun ${pick(anak).o.nama}` : pick(['Syukuran Rumah Baru', 'Syukuran Panen Kayu', 'Syukuran Musim Dingin'])
      addEvent({ jenis: 'keluarga', nama, desa, mulai: 16, selesai: 18, host: tuan.id, keluarga: f.id, tempat: { home: homeById.get(f.rumah) } })
    }
  }
  // acara jamuan setelah perburuan berhasil / malam ikan bakar setelah tangkapan banyak
  function upgradeEvent(desa, jenis, nama, hostId) {
    const ev = events.find(e => e.desa === desa && e.jenis === 'kumpul-api' && e.hari === hariOf(T))
    if (!ev) return
    ev.jenis = jenis
    ev.nama = nama
    ev.host = hostId
    ev.mulai = 18.5
    note(byId(hostId), `mengadakan ${nama.toLowerCase()} malam ini`)
  }
  const activeEvents = () => events.filter(e => e.hari === hariOf(T) && inRange(jam(), e.mulai, e.selesai))
  const eventsToday = () => events.filter(e => e.hari === hariOf(T))

  // mau ikut acara ini?
  function wantsEvent(a, e) {
    const { o } = a
    const j = jam()
    if (a.event === e.id) return false
    if (e.jenis === 'bolaSalju') return o.umur >= 5 && o.umur < 15 && o.desa === e.desa && chance(0.75)
    if (e.jenis === 'dongeng') return (o.umur < 12 && o.umur >= 4 && o.desa === e.desa && chance(0.55)) || e.host === a.id
    if (e.jenis === 'keluarga') {
      if (o.keluarga === e.keluarga) return true
      const fam = keluarga[e.keluarga]
      const friend = fam.anggota.some(id => o.teman.includes(id))
      return o.desa === e.desa && (friend ? chance(0.8) : chance(0.12 + 0.2 * o.sifat.ramah))
    }
    // pesta & kumpul di api unggun: jamnya, sifatnya, lelahnya; anak kecil ikut orang tuanya
    if (e.host === a.id) return true
    const near = o.desa === e.desa || (e.jenis === 'pesta' && chance(0.06))
    if (!near) return false
    if (o.umur < 13 && j > o.tidur - 0.3) return false
    const p = 0.25 + 0.45 * o.sifat.riang + 0.2 * o.sifat.ramah - 0.25 * a.need.lelah - 0.15 * o.sifat.pemalas + (e.jenis === 'pesta' ? 0.1 : 0) + (e.jenis === 'jamuan' || e.jenis === 'ikanBakar' ? 0.25 : 0)
    return chance(Math.max(0.05, Math.min(0.92, p)))
  }
  // ikut acara: tempat & peran di acaranya
  function joinEvent(a, e) {
    a.event = e.id
    e.peserta.add(a.id)
    releaseSpot(a)
    // pulang paling lambat saat acara selesai atau saat jam tidurnya (anak-anak lebih dulu)
    const left = Math.min(untilHour(e.selesai), untilHour(a.o.tidur))
    if (e.jenis === 'dongeng') {
      const f = e.tempat.fire
      if (e.host === a.id) {
        const s = freeSeats(s => s.fire === f)[0]
        if (s) {
          takeSpot(a, s)
          return walkTo(a, s.x, s.z, () => doAct(a, 'mendongeng', { clip: 'talk', face: s.rot, dur: left - T }))
        }
      }
      const ang = rand() * Math.PI * 2
      const x = f.x + Math.sin(ang) * 2.2
      const z = f.z + Math.cos(ang) * 2.2
      return walkTo(a, x, z, () => doAct(a, 'dongeng', { clip: 'duduk', face: faceTo(a, f.x, f.z), dur: left - T }))
    }
    if (e.jenis === 'bolaSalju') {
      const p = e.tempat.plaza
      const team = a.id % 2 ? 1 : -1
      const x = p.x + team * between(2.5, 4.5)
      const z = p.z + between(-4, 4)
      return walkTo(a, x, z, () => snowball(a, e, p, team), { run: true })
    }
    if (e.jenis === 'keluarga') {
      const h = e.tempat.home
      const ang = h.rot + between(-1.2, 1.2)
      const r = a.o.keluarga === e.keluarga ? between(1.2, 2.4) : between(2.4, 4.2)
      const x = h.door.x + Math.sin(ang) * r
      const z = h.door.z + Math.cos(ang) * r
      return walkTo(a, x, z, () => {
        const clip = pick(['talk', 'talk', 'cheer', 'minum'])
        doAct(a, 'kumpul', { clip, props: clip === 'minum' ? ['cangkir'] : [], face: faceTo(a, h.door.x, h.door.z), dur: Math.max(MENIT * 10, left - T) })
      })
    }
    // pesta / kumpul / jamuan / malam ikan bakar di api unggun
    const f = e.tempat.fire
    const role = e.host === a.id && e.jenis === 'pesta' ? 'musik' : a.o.umur < 13 ? pick(['menari', 'menari', 'pesta']) : weightedRole(a, e)
    if (role === 'musik') {
      const ang = between(0, Math.PI * 2)
      const x = f.x + Math.sin(ang) * 5.2
      const z = f.z + Math.cos(ang) * 5.2
      return walkTo(a, x, z, () => doAct(a, 'musik', { clip: 'lute', props: ['kecapi'], face: faceTo(a, f.x, f.z), dur: left - T }))
    }
    if (role === 'duduk') {
      const s = nearest(freeSeats(s => s.fire === f), a.x, a.z)
      if (s) {
        takeSpot(a, s)
        const eat = e.jenis === 'jamuan' || e.jenis === 'ikanBakar' || e.jenis === 'pesta'
        return walkTo(a, s.x, s.z, () => doAct(a, 'pesta', { clip: eat ? pick(['eat', 'drink', 'sit']) : pick(['sit', 'drink']), props: eat ? [pick(['mangkuk', 'cangkir'])] : [], face: s.rot, dur: left - T }))
      }
    }
    if (role === 'menari') {
      a.ring = rand() * Math.PI * 2
      const x = f.x + Math.sin(a.ring) * 3.0
      const z = f.z + Math.cos(a.ring) * 3.0
      return walkTo(a, x, z, () => {
        doAct(a, 'menari', { clip: 'dance', dur: Math.min(left - T, mins(30, 90)) })
        a.dance = { f, r: 2.6 + rand() * 0.8, dir: chance(0.5) ? 1 : -1 }
      })
    }
    // berdiri di lingkar luar: bersorak, mengobrol, minum, menghangatkan tangan
    const ang = rand() * Math.PI * 2
    const r = between(4.6, 6.4)
    const x = f.x + Math.sin(ang) * r
    const z = f.z + Math.cos(ang) * r
    return walkTo(a, x, z, () => {
      const clip = pick(['cheer', 'talk', 'minum', 'hangat'])
      doAct(a, 'pesta', { clip, props: clip === 'minum' ? ['cangkir'] : [], face: faceTo(a, f.x, f.z), dur: Math.min(left - T, mins(25, 70)) })
    })
  }
  function weightedRole(a, e) {
    const s = a.o.sifat
    // jamuan & malam ikan bakar: lebih banyak yang duduk makan
    const makan = e.jenis === 'jamuan' || e.jenis === 'ikanBakar' ? 1.2 : 0
    const pairs = [['duduk', 0.6 + makan + a.need.lelah + (a.o.umur > 55 ? 1 : 0)], ['menari', 0.3 + s.riang * 1.2 - (a.o.umur > 55 ? 0.3 : 0)], ['berdiri', 0.6 + s.ramah * 0.5]]
    let r = rand() * pairs.reduce((t, p) => t + Math.max(0, p[1]), 0)
    for (const [v, w] of pairs) if ((r -= Math.max(0, w)) <= 0) return v
    return 'berdiri'
  }
  function snowball(a, e, p, team) {
    // bergantian: melempar ke tim lawan, lalu berlari ke posisi baru
    const foe = { x: p.x - team * 3.5, z: a.z }
    doAct(a, 'bolaSalju', { clip: 'drill', props: ['bolaSalju'], face: faceTo(a, foe.x, foe.z), dur: mins(1.5, 3) })
    a.snow = { e, p, team }
  }

  // ------------------------------------------------------------------ perburuan (Rusa Putih)
  const parties = []
  function startHunt() {
    const free = agents.filter(a => a.o.kerja === 'pemburu' && !a.party && !a.talk && a.act !== 'tidur' && !a.event)
    if (free.length < 2) return
    free.sort((p, q) => q.o.sifat.pemberani - p.o.sifat.pemberani)
    const members = free.slice(0, Math.min(4, 2 + Math.floor(rand() * 3)))
    const herd = pick(rusa.herds)
    const party = { id: parties.length, members, leader: members[0], herd: herd.id, stage: 'kumpul', t: 0, deer: null, berhasil: false }
    parties.push(party)
    const plaza = plazaOf('pemburu')
    members.forEach((m, k) => {
      releaseSpot(m)
      m.party = party
      m.event = null
      m.carryProps = ['busur']
      const ang = (k / members.length) * Math.PI * 2
      walkTo(m, plaza.x + 4 + Math.sin(ang) * 2, plaza.z + Math.cos(ang) * 2, () => doAct(m, 'buru', { clip: 'talk', props: ['busur'], face: faceTo(m, plaza.x, plaza.z), dur: Infinity }))
    })
    note(party.leader, `memimpin perburuan rusa ke hutan bersama ${members.slice(1).map(m => m.o.nama).join(' dan ')}`)
  }
  function huntUpdate(party, dt) {
    party.t += dt
    const L = party.leader
    const ms = party.members
    const all = fn => ms.every(fn)
    if (party.stage === 'kumpul') {
      if (all(m => m.act === 'buru') || party.t > 25 * MENIT) {
        party.stage = 'berangkat'
        const c = rusa.center(party.herd) || rusa.herds[party.herd]
        const ang = Math.atan2(c.x - L.x, c.z - L.z)
        const sx = c.x - Math.sin(ang) * 34
        const sz = c.z - Math.cos(ang) * 34
        ms.forEach((m, k) => {
          const off = (k - (ms.length - 1) / 2) * 2.4
          walkTo(m, sx + Math.cos(ang) * off, sz - Math.sin(ang) * off, () => doAct(m, 'buru', { clip: 'kneel', props: ['busur'], face: faceTo(m, c.x, c.z), dur: Infinity }))
        })
      }
      return
    }
    if (party.stage === 'berangkat') {
      if (all(m => m.act === 'buru') || party.t > 4 * JAM) {
        // mengintai: mendekat pelan-pelan (tidak membuat rusa kabur) sampai ±17 m dari rusa sasaran
        const d = rusa.target(party.herd, L.x, L.z)
        if (!d) return endHunt(party)
        party.deer = d
        party.stage = 'intai'
        ms.forEach((m, k) => {
          m.sneak = true
          const ang = Math.atan2(d.x - m.x, d.z - m.z)
          const dist = Math.hypot(d.x - m.x, d.z - m.z)
          const go = Math.max(0, dist - 17 - k * 0.6)
          walkTo(m, m.x + Math.sin(ang) * go, m.z + Math.cos(ang) * go, () => doAct(m, 'buru', { clip: 'shoot', props: ['busur'], face: faceTo(m, d.x, d.z), dur: Infinity }))
        })
      }
      return
    }
    if (party.stage === 'intai') {
      if (all(m => m.act === 'buru')) {
        if (party.shootT === undefined) party.shootT = party.t
        for (const m of ms) m.heading = faceTo(m, party.deer.x, party.deer.z)
        if (party.t - party.shootT > 3.2) {
          ms.forEach(m => {
            m.sneak = false
          })
          const skill = ms.reduce((s, m) => s + m.o.sifat.rajin * 0.3 + m.o.sifat.pemberani * 0.2, 0) / ms.length
          if (rusa.alive(party.deer) && chance(0.55 + skill)) {
            rusa.hit(party.deer, L)
            party.berhasil = true
            party.stage = 'ambil'
            const d = party.deer
            ms.forEach((m, k) => {
              const ang = (k / ms.length) * Math.PI * 2
              walkTo(m, d.x + Math.sin(ang) * 1.6, d.z + Math.cos(ang) * 1.6, () => doAct(m, 'buru', { clip: 'harvest', props: [], face: faceTo(m, d.x, d.z), dur: Infinity }))
            })
            for (const m of ms) note(m, 'berhasil memanah seekor rusa kutub di hutan')
          } else {
            rusa.scare(party.herd, L)
            for (const m of ms) note(m, 'pulang dari berburu dengan tangan kosong — rusanya kabur')
            endHunt(party)
          }
        }
      } else if (party.t > 6 * JAM) endHunt(party)
      return
    }
    if (party.stage === 'ambil') {
      if (all(m => m.act === 'buru')) {
        if (party.pickT === undefined) party.pickT = party.t
        if (party.t - party.pickT > 5) {
          // dua pemburu memikul rusanya pulang ke pondok pengasapan, yang lain berjalan di sampingnya
          party.stage = 'pulang'
          const carry = { x: L.x, y: L.y, z: L.z, heading: L.heading }
          party.carry = carry
          rusa.pick(party.deer, carry)
          const asap = spots.find(s => s.kind === 'asap' && s.desa === 'pemburu')
          L.carryProps = []
          walkTo(L, asap.x, asap.z - 2.5, () => doAct(L, 'buru', { clip: 'idle', dur: Infinity }))
          setClip(L, 'carry')
          ms.slice(1).forEach(m => {
            m.carryProps = ['busur']
            m.follow = L
          })
          ms[1].carryProps = []
          ms[1].follow2 = true
        }
      }
      return
    }
    if (party.stage === 'pulang') {
      // yang mengikuti: tetap di belakang / samping pemimpin
      ms.slice(1).forEach((m, k) => {
        const back = m.follow2 ? 2.2 : 2.8 + k
        const side = m.follow2 ? 0 : (k % 2 ? 1 : -1) * 1.4
        const tx = L.x - Math.sin(L.heading) * back + Math.cos(L.heading) * side
        const tz = L.z - Math.cos(L.heading) * back - Math.sin(L.heading) * side
        const dx = tx - m.x
        const dz = tz - m.z
        const dd = Math.hypot(dx, dz)
        if (dd > 0.15) {
          const step = Math.min(dd, (m.follow2 ? SPEED.dewasa : SPEED.dewasa * 1.1) * dt * (dd > 3 ? 1.6 : 1))
          m.x += (dx / dd) * step
          m.z += (dz / dd) * step
          m.heading = Math.atan2(dx, dz)
          setClip(m, m.follow2 ? 'carry' : 'walk')
          m.t += dt
        } else setClip(m, 'idle')
        m.act = 'buru'
        m.until = Infinity
        m.props = m.carryProps || []
      })
      const c = party.carry
      const b = ms[1]
      c.x = (L.x + b.x) / 2
      c.z = (L.z + b.z) / 2
      c.y = (yAt(L.x, L.z) + yAt(b.x, b.z)) / 2
      c.heading = L.heading
      if (L.path === null && L.act === 'buru') {
        // sampai di pondok pengasapan
        rusa.store(party.deer)
        hunts.berhasil++
        hunts.rusa++
        upgradeEvent('pemburu', 'jamuan', 'Jamuan Hasil Buruan', L.id)
        for (const m of ms) note(m, 'memikul rusa hasil buruan ke pondok pengasapan; nanti malam ada jamuan!')
        endHunt(party)
      }
    }
  }
  function endHunt(party) {
    party.stage = 'selesai'
    for (const m of party.members) {
      m.party = null
      m.sneak = false
      m.follow = null
      m.follow2 = false
      m.carryProps = null
      m.until = T
    }
  }

  // ------------------------------------------------------------------ keputusan
  const shouldSleep = (o, j) => inRange(j, o.tidur, o.bangun)
  const isWorker = o => !['anak', 'remaja', 'tetua', 'warga', 'kepala'].includes(o.kerja)
  function workHours(o, j) {
    if (o.kerja === 'jaga') return o.shift === 'malam' ? inRange(j, 19, 6.5) : inRange(j, 7, 19)
    if (o.kerja === 'pedagang') return inRange(j, 8, 17)
    if (o.kerja === 'masak' || o.kerja === 'kedai') return inRange(j, 9, 21)
    return inRange(j, 8, 11.8) || inRange(j, 13, 17)
  }

  function decide(a) {
    if (a.talk || a.party) return
    const { o } = a
    const j = jam()
    a.dance = null
    a.snow = null
    a.carryProps = null
    // tidur (anak lebih dulu; penjaga malam tidur siang)
    if (shouldSleep(o, j)) {
      if (a.act !== 'tidur') note(a, 'pulang untuk tidur')
      return goHome(a, 'tidur', untilHour(o.bangun))
    }
    // baru bangun: sarapan di rumah bersama keluarga
    if (a.act === 'tidur') {
      note(a, `bangun jam ${fmtJam(j)} dan sarapan bersama keluarga`)
      a.need.lelah = 0
      a.need.lapar = Math.max(0, a.need.lapar - 0.7)
      return goHome(a, 'sarapan', T + mins(20, 45))
    }
    // tuan rumah berangkat lebih awal ke tempat acaranya (menyiapkan api, kecapi, meja)
    for (const e of eventsToday()) if (e.host === a.id && !e.peserta.has(a.id) && inRange(jam(), e.mulai - 0.9, e.selesai)) return joinEvent(a, e)
    // acara yang sedang berlangsung
    for (const e of activeEvents()) if (e.peserta.has(a.id) ? false : wantsEvent(a, e)) return joinEvent(a, e)
    // makan malam bersama keluarga (yang tidak ikut acara)
    if (inRange(j, 17.8, 19.2) && !(o.kerja === 'jaga' && workHours(o, j)) && a.act !== 'makanMalam') {
      note(a, 'pulang makan malam bersama keluarga')
      a.need.lapar = 0
      return goHome(a, 'makanMalam', T + mins(40, 70))
    }
    // makan siang
    if (inRange(j, 11.8, 13) && a.need.lapar > 0.35 && a.act !== 'makanSiang' && a.act !== 'bekal' && a.act !== 'kedai') {
      a.need.lapar = 0
      if (o.desa === 'desa' && chance(0.3)) return eatAtKedai(a)
      if (Math.hypot(a.home.door.x - a.x, a.home.door.z - a.z) < 120 || a.hidden) return goHome(a, 'makanSiang', T + mins(30, 50))
      return doAct(a, 'bekal', { clip: 'bekal', props: ['roti'], dur: mins(30, 50) })
    }
    // kerja
    if (isWorker(o) && workHours(o, j) && chance(0.85 + 0.15 * o.sifat.rajin - 0.25 * o.sifat.pemalas))
      if (work(a)) return

    leisure(a)
  }

  function eatAtKedai(a) {
    const s = nearest(freeSeats(s => s.table === kedaiTable), a.x, a.z)
    if (!s) return doAct(a, 'bekal', { clip: 'bekal', props: ['roti'], dur: mins(30, 50) })
    takeSpot(a, s)
    const door = spots.find(p => p.kind === 'pintu-kedai')
    walkTo(a, door.x, door.z, () => {
      a.x = s.x
      a.z = s.z
      doAct(a, 'kedai', { clip: pick(['eat', 'drink']), props: [pick(['mangkuk', 'cangkir'])], face: s.rot, dur: mins(50, 90) })
      note(a, 'makan sup ikan asap di kedai panjang')
    })
  }

  const sellers = agents.filter(a => a.o.kerja === 'pedagang')
  const sellerIndex = a => sellers.indexOf(a)
  // pekerjaan sesuai profesinya; false bila tidak ada tempat kerja yang kosong
  // jam selesai kerja hari ini (kerja tidak melewatinya)
  function workEnd(o, j) {
    if (o.kerja === 'jaga') return o.shift === 'malam' ? 6.5 : 19
    if (o.kerja === 'pedagang') return 17
    if (o.kerja === 'masak' || o.kerja === 'kedai') return 21
    return j < 12.5 ? 11.8 : 17
  }
  function work(a) {
    const { o } = a
    const k = o.kerja
    const end = untilHour(workEnd(o, jam()))
    const at = (kind, desa, act, opts) => {
      const free = freeSpots(kind, desa)
      if (!free.length) return false
      goSpot(a, nearest(free, a.x, a.z), act, { ...opts, dur: Math.max(MENIT * 15, Math.min(opts.dur, end - T)) })
      return true
    }
    switch (k) {
      case 'nelayan': {
        // sesudah lama memancing: antar ikan ke rak / pondok asap
        if (a.catch >= 4) {
          const free = [...freeSpots('jemur', 'nelayan'), ...freeSpots('asap', 'nelayan')]
          if (free.length) {
            a.carryProps = ['ikan']
            const s = nearest(free, a.x, a.z)
            takeSpot(a, s)
            walkTo(a, s.x, s.z, () => {
              doAct(a, 'antar', { clip: 'work', props: [], face: s.rot, dur: mins(25, 45) })
              note(a, `mengantar ${a.catch} ikan ke ${s.kind === 'asap' ? 'pondok pengasapan' : 'rak jemur'}`)
              catches.nelayan += a.catch
              a.catch = 0
            })
            return true
          }
        }
        if (chance(0.25) && at('mancing-es', 'nelayan', 'mancingEs', { clip: 'mancingDuduk', props: ['pancingEs'], dur: mins(120, 220) })) return true
        return at('mancing', 'nelayan', 'mancing', { clip: 'fish', props: ['pancing'], dur: mins(120, 240) })
      }
      case 'pancingEs':
        return at('mancing-es', 'desa', 'mancingEs', { clip: 'mancingDuduk', props: ['pancingEs'], dur: mins(120, 240) })
      case 'pengasap':
        return chance(0.5) ? at('asap', 'nelayan', 'asap', { clip: 'work', dur: mins(70, 140) }) || at('jemur', 'nelayan', 'jemur', { clip: 'work', dur: mins(60, 120) }) : at('jemur', 'nelayan', 'jemur', { clip: 'work', dur: mins(30, 60) }) || at('asap', 'nelayan', 'asap', { clip: 'work', dur: mins(70, 140) })
      case 'penyamak':
        return at('kulit', 'pemburu', 'kulit', { clip: 'work', dur: mins(80, 160) }) || at('asap', 'pemburu', 'asap', { clip: 'work', dur: mins(60, 120) })
      case 'pemburu': {
        // pemburu lain sedang berkumpul? bergabung lewat startHunt (pagi & siang)
        const j = jam()
        if ((inRange(j, 7.5, 9.5) || inRange(j, 13.2, 14.5)) && !parties.some(p => p.stage !== 'selesai')) {
          startHunt()
          if (a.party) return true
        }
        return at('kulit', 'pemburu', 'kulit', { clip: 'work', dur: mins(60, 120) }) || at('kayu', 'pemburu', 'kayu', { clip: 'farm', props: ['kapak'], dur: mins(50, 90) })
      }
      case 'penebang':
        return o.desa === 'desa'
          ? at('kayu', 'desa', 'kayu', { clip: 'farm', props: ['kapak'], dur: mins(80, 160) })
          : at('tebang', 'pemburu', 'tebang', { clip: 'farm', props: ['kapak'], dur: mins(100, 200) }) || at('kayu', 'pemburu', 'kayu', { clip: 'farm', props: ['kapak'], dur: mins(60, 120) })
      case 'pedagang': {
        const s = spots.find(p => p.kind === 'kios' && (p.by === a.id || p.by === null) && p.kios === sellerIndex(a))
        if (!s) return false
        goSpot(a, s, 'kios', { clip: pick(['idle', 'serve', 'talk']), dur: mins(90, 180) })
        return true
      }
      case 'pandai':
        return at('tempa', 'desa', 'tempa', { clip: 'smith', props: ['palu'], dur: mins(90, 180) }) || at('kayu', 'desa', 'kayu', { clip: 'farm', props: ['kapak'], dur: mins(60, 120) })
      case 'masak': {
        if (at('masak', 'desa', 'masak', { clip: 'cook', props: ['sendok'], dur: mins(90, 180) })) return true
        const x = kedaiTable.x + between(-0.8, 0.8)
        const z = kedaiTable.z + between(-1.5, 1.5)
        enterKedai(a, x, z, 'saji', { clip: 'serve', props: ['mangkuk'], dur: mins(50, 100) })
        return true
      }
      case 'kedai': {
        if (chance(0.5)) return at('pintu-kedai', 'desa', 'saji', { clip: 'talk', dur: mins(50, 110) })
        enterKedai(a, kedaiTable.x + between(-0.6, 0.6), kedaiTable.z + between(-2, 2), 'saji', { clip: 'serve', props: ['cangkir'], dur: mins(50, 100) })
        return true
      }
      case 'jaga':
        return at('jaga', 'desa', 'jaga', { clip: 'guard', props: ['tombak'], dur: mins(180, 320) })
      default:
        return false
    }
  }
  function enterKedai(a, x, z, act, opts) {
    const door = spots.find(p => p.kind === 'pintu-kedai')
    walkTo(a, door.x, door.z, () => {
      a.x = x
      a.z = z
      doAct(a, act, { face: rand() * Math.PI * 2, ...opts })
    })
  }

  // waktu luang: ditimbang dari kebutuhan, sifat, umur, dan jam
  function leisure(a) {
    const { o } = a
    const n = a.need
    const s = o.sifat
    const j = jam()
    const kid = o.umur < 13
    const old = o.umur >= 62
    const opts = []
    const add = (w, fn) => w > 0 && opts.push([fn, w])
    const fire = fireOf(o.desa)
    const plaza = plazaOf(o.desa)
    add(0.4 + n.dingin * 2 + (j > 16 ? 0.4 : 0), () => warmUp(a, fire))
    add((0.3 + n.lelah + n.sepi * 0.5 + (old ? 1 : 0)) * (freeSeats(t => t.fire === fire).length ? 1 : 0), () => sitFire(a, fire))
    add(0.4 + n.sepi * 1.6 + s.ramah, () => chat(a))
    add(0.2 + n.lelah * 1.2 + s.pemalas * 0.6, () => goHome(a, 'rumah', T + mins(70, 160)))
    add(0.25 + n.bosan * 0.8 + s.petualang * 0.6, () => stroll(a))
    if (!kid) {
      add((o.kerja === 'warga' ? 0.9 : 0.25) * (j < 12 ? 1.5 : 0.6), () => fetchWater(a))
      add((o.kerja === 'warga' || o.kerja === 'remaja' ? 0.5 : 0.2) * (j < 14 ? 1 : 0.4), () => shovel(a))
      add(o.desa === 'desa' && inRange(j, 8, 17) ? 0.4 + n.bosan * 0.3 + s.rakus * 0.3 : 0, () => shop(a))
      add(o.desa === 'desa' && inRange(j, 17, 21.5) ? 0.3 + s.rakus * 0.6 + s.riang * 0.3 : 0, () => eatAtKedai(a))
    }
    if (kid) {
      add(1.4 + n.bosan * 1.5, () => play(a, plaza))
      add(0.4, () => followParent(a))
    }
    if (o.kerja === 'remaja') add(0.6, () => followParent(a))
    if (o.kerja === 'kepala') add(1.2, () => stroll(a, true))
    let r = rand() * opts.reduce((t, p) => t + p[1], 0)
    for (const [fn, w] of opts)
      if ((r -= w) <= 0) {
        fn()
        return
      }
    stroll(a)
  }
  function warmUp(a, f) {
    const ang = rand() * Math.PI * 2
    const r = between(1.9, 2.4)
    walkTo(a, f.x + Math.sin(ang) * r, f.z + Math.cos(ang) * r, () => {
      doAct(a, 'hangat', { clip: 'hangat', face: faceTo(a, f.x, f.z), dur: mins(45, 100) })
      a.need.dingin = 0
    })
  }
  function sitFire(a, f) {
    const s = nearest(freeSeats(t => t.fire === f), a.x, a.z)
    if (!s) return warmUp(a, f)
    takeSpot(a, s)
    walkTo(a, s.x, s.z, () => doAct(a, 'duduk', { clip: pick(['sit', 'sit', 'drink']), props: [], face: s.rot, dur: mins(60, 140) }))
  }
  // mengobrol: mengajak teman yang sedang senggang di kampung yang sama, bertemu di tengah-tengah
  function chat(a) {
    const friend = a.o.teman.map(byId).find(b => !b.hidden && !b.talk && !b.party && !b.event && ['hangat', 'jalan', 'sapu', 'sumur', 'duduk', 'lihat'].includes(b.act) && Math.hypot(b.x - a.x, b.z - a.z) < 70)
    if (!friend) return stroll(a)
    releaseSpot(friend)
    const mx = (a.x + friend.x) / 2
    const mz = (a.z + friend.z) / 2
    const n = nearNode(mx, mz)
    const meet = { x: n.x, z: n.z }
    const dur = mins(45, 100)
    const ang = rand() * Math.PI * 2
    const pa = { x: meet.x + Math.sin(ang) * 0.8, z: meet.z + Math.cos(ang) * 0.8 }
    const pb = { x: meet.x - Math.sin(ang) * 0.8, z: meet.z - Math.cos(ang) * 0.8 }
    walkTo(a, pa.x, pa.z, () => doAct(a, 'ngobrol', { clip: 'talk', face: faceTo(a, pb.x, pb.z), dur }))
    walkTo(friend, pb.x, pb.z, () => doAct(friend, 'ngobrol', { clip: 'talk', face: faceTo(friend, pa.x, pa.z), dur }))
    a.with = friend.id
    friend.with = a.id
    a.need.sepi = 0
    friend.need.sepi = 0
    note(a, `mengobrol dengan ${friend.o.nama}`)
    note(friend, `mengobrol dengan ${a.o.nama}`)
  }
  function stroll(a, kepala = false) {
    const { home } = a
    const near = nodes.filter(nd => Math.hypot(nd.x - home.x, nd.z - home.z) < (kepala ? 90 : 55))
    const target = near.length ? pick(near) : nearNode(home.x, home.z)
    walkTo(a, target.x + between(-1, 1), target.z + between(-1, 1), () => {
      doAct(a, 'lihat', { clip: kepala ? 'talk' : 'idle', props: a.o.umur >= 66 ? ['tongkat'] : [], dur: mins(25, 60) })
      a.need.bosan = Math.max(0, a.need.bosan - 0.3)
    })
  }
  function fetchWater(a) {
    const s = nearest(freeSpots('sumur', a.o.desa), a.x, a.z)
    if (!s) return stroll(a)
    goSpot(a, s, 'sumur', { clip: 'work', dur: mins(15, 30) })
  }
  function shovel(a) {
    const h = a.home
    const x = h.door.x + Math.sin(h.rot) * 1.4 + between(-1.2, 1.2)
    const z = h.door.z + Math.cos(h.rot) * 1.4 + between(-1.2, 1.2)
    walkTo(a, x, z, () => doAct(a, 'sapu', { clip: 'farm', props: ['sekop'], face: h.rot + Math.PI + between(-0.6, 0.6), dur: mins(35, 70) }))
  }
  function shop(a) {
    const free = freeSpots('beli', 'desa').filter(s => spots.some(k => k.kind === 'kios' && k.kios === s.kios && k.by !== null))
    if (!free.length) return stroll(a)
    const s = pick(free)
    goSpot(a, s, 'beli', { clip: 'buy', props: ['keranjang'], dur: mins(15, 35) })
  }
  function play(a, plaza) {
    const pts = spots.filter(s => s.kind === 'main' && s.desa === a.o.desa)
    const p = pts.length ? pick(pts) : plaza
    const x = p.x + between(-3, 3)
    const z = p.z + between(-3, 3)
    walkTo(a, x, z, () => {
      doAct(a, 'main', { clip: pick(['cheer', 'idle', 'jump', 'wave']), dur: mins(6, 20) })
      a.need.bosan = Math.max(0, a.need.bosan - 0.25)
    }, { run: true })
  }
  // menemani ayah / ibu yang sedang bekerja (berdiri di dekatnya)
  function followParent(a) {
    const p = a.o.ortu.map(byId).find(q => !q.hidden && !q.party && ['mancing', 'mancingEs', 'kulit', 'kios', 'tempa', 'kayu', 'tebang', 'jemur', 'asap', 'sapu'].includes(q.act))
    if (!p) return play(a, plazaOf(a.o.desa))
    const ang = p.heading + between(1.2, 2.0) * (chance(0.5) ? 1 : -1)
    walkTo(a, p.x + Math.sin(ang) * 1.5, p.z + Math.cos(ang) * 1.5, () => doAct(a, 'ikut', { clip: a.o.umur >= 13 ? 'work' : pick(['idle', 'talk']), face: faceTo(a, p.x, p.z), dur: mins(45, 100) }))
  }

  // ------------------------------------------------------------------ kebutuhan
  function needs(a, dt) {
    const k = dt / JAM // jam berlalu
    const n = a.need
    const home = a.hidden
    n.lapar = Math.min(1, n.lapar + k / 6)
    n.lelah = home && (a.act === 'tidur' || a.act === 'rumah') ? Math.max(0, n.lelah - k / 2) : Math.min(1, n.lelah + k / 15)
    n.bosan = Math.min(1, n.bosan + k / (a.o.umur < 13 ? 1.5 : 3))
    n.sepi = home ? Math.max(0, n.sepi - k / 2) : Math.min(1, n.sepi + k / 4)
    const warm = home || a.act === 'hangat' || a.act === 'duduk' || a.act === 'pesta' || a.act === 'menari' || a.act === 'kedai' || a.act === 'masak' || a.act === 'saji'
    n.dingin = warm ? Math.max(0, n.dingin - k * 2) : Math.min(1, n.dingin + k / 2.5)
    if (a.act === 'menari' || a.act === 'pesta' || a.act === 'main' || a.act === 'bolaSalju') n.bosan = Math.max(0, n.bosan - k * 2)
  }

  // ------------------------------------------------------------------ mulai: semua sesuai jam
  function placeAll() {
    for (const a of agents) {
      releaseSpot(a)
      a.event = null
      a.party = null
      a.path = null
      a.then = null
      a.hidden = true
      a.x = a.home.door.x
      a.z = a.home.door.z
      a.act = 'tidur'
      a.until = 0
    }
    for (const p of parties) p.stage = 'selesai'
    // yang sudah bangun langsung berkegiatan (keluar dari rumah bertahap)
    for (const a of agents) {
      if (shouldSleep(a.o, jam())) {
        a.until = untilHour(a.o.bangun)
        continue
      }
      a.act = 'sarapan'
      a.until = T + rand() * 30 * MENIT
    }
  }
  schedule()
  placeAll()

  // ------------------------------------------------------------------ ucapan (gelembung)
  const LINES = {
    mancing: ['Sabar… ikannya sedang mengintip umpan.', 'Air dingin, ikan gemuk!', 'Hari ini aku sudah dapat beberapa ekor.'],
    mancingEs: ['Lubang esnya harus dibuka lagi tiap pagi.', 'Ssst… jangan berisik, ikannya kabur.'],
    kios: ['Roti hangat! Ikan asap! Bulu rusa!', 'Silakan lihat-lihat dulu.', 'Murah, untuk tetangga!'],
    tempa: ['Tang! Tang! Besi harus dipukul selagi panas.'],
    hangat: ['Brrr… api ini penyelamat.', 'Dinginnya menusuk tulang hari ini.'],
    menari: ['Ayo ikut menari!', 'Hei, hei, hei!'],
    musik: ['Lagu lama dari kakek buyut kami.', 'Siapa mau lagu lagi?'],
    pesta: ['Bersulang untuk Frostfall!', 'Pesta ini paling meriah!'],
    bolaSalju: ['Kena kau!', 'Awas, bola salju!', 'Tim kami menang!'],
    main: ['Kejar aku!', 'Ayo main!'],
    buru: ['Ssst… rusanya di sana.', 'Pelan-pelan, jangan sampai mereka mencium kita.'],
    sapu: ['Salju lagi, salju lagi!'],
    kumpul: ['Selamat, ya!', 'Kuenya enak sekali!'],
    mendongeng: ['Dahulu kala, raja Frostfall menitipkan hartanya di gua…', 'Dengarkan baik-baik, anak-anak.'],
    jamuan: ['Daging rusa panggang! Terima kasih, para pemburu!'],
  }
  function chatter(a) {
    if (!bubbles || !player || a.hidden || T - a.said < 40) return
    const d = Math.hypot(a.x - player.position.x, a.z - player.position.z)
    if (d > 12) return
    // menyapa pemain yang lewat (sekali-sekali), atau berseru sesuai kegiatannya
    let text = null
    if (d < 4.5 && T - a.waved > 120 && !a.party && a.act !== 'jalan' && chance(0.5)) {
      a.waved = T
      const j = jam()
      const salam = j < 11 ? 'Selamat pagi' : j < 15 ? 'Selamat siang' : j < 18.5 ? 'Selamat sore' : 'Selamat malam'
      text = pick([`${salam}, pengembara!`, 'Halo! Jarang ada tamu di sini.', `${salam}! Hangatkan badanmu di api unggun.`])
      if (!['menari', 'musik', 'buru', 'bolaSalju', 'mancingEs', 'pesta'].includes(a.act)) {
        a.gaya = 'wave'
        a.gayaT = 1.6
      }
    } else if (LINES[a.act] && chance(0.25)) text = pick(LINES[a.act])
    if (!text) return
    a.said = T
    bubbles.say(() => (a.hidden ? null : { x: a.x, y: a.y + 1.85 * a.scale, z: a.z }), text, 2600, `warga${a.id}`)
  }

  // ------------------------------------------------------------------ pembaruan tiap bingkai
  const cam = new THREE.Vector3()
  const frustum = new THREE.Frustum()
  const pm = new THREE.Matrix4()
  const sphere = new THREE.Sphere(new THREE.Vector3(), 1.4)
  const vis = []
  let lastHour = -1
  let chatterI = 0
  function step(dt) {
    T += dt
    const j = jam()
    const hr = Math.floor(j)
    if (hr !== lastHour) {
      lastHour = hr
      if (hr === 6 || lastScheduled !== hariOf(T)) schedule()
      if (hr === 6 && catches.hari !== hariOf(T)) {
        // hari baru: hitungan tangkapan & buruan mulai lagi
        catches.hari = hariOf(T)
        catches.nelayan = 0
        catches.desa = 0
        hunts.hari = hariOf(T)
        hunts.berhasil = 0
      }
    }
    for (const p of parties) if (p.stage !== 'selesai') huntUpdate(p, dt)
    for (const a of agents) {
      needs(a, dt)
      if (a.talk) continue
      if (a.act === 'jalan' && a.path) {
        stepWalk(a, dt)
        continue
      }
      if (a.dance) {
        // penari bergerak pelan mengelilingi api
        const d = a.dance
        a.ring += dt * 0.18 * d.dir
        a.x = d.f.x + Math.sin(a.ring) * d.r
        a.z = d.f.z + Math.cos(a.ring) * d.r
        a.heading = a.ring + (d.dir > 0 ? Math.PI / 2 : -Math.PI / 2)
      }
      if (a.party) continue
      if (T >= a.until) {
        // kegiatan selesai
        if (a.act === 'mancing' || a.act === 'mancingEs') {
          const n = 1 + Math.floor(rand() * 4)
          a.catch += n
          note(a, `menangkap ${n} ikan`)
          if (a.o.desa === 'desa') catches.desa += n
          else catches.nelayan += n
          if (a.o.desa === 'nelayan' && catches.nelayan >= 24)
            upgradeEvent('nelayan', 'ikanBakar', 'Malam Ikan Bakar', a.id)

        }
        if (a.snow) {
          // berlari ke posisi baru lalu melempar lagi selama acaranya berlangsung
          const { e, p, team } = a.snow
          a.snow = null
          if (inRange(jam(), e.mulai, e.selesai)) {
            const x = p.x + team * between(2.5, 5)
            const z = p.z + between(-4.5, 4.5)
            walkTo(a, x, z, () => snowball(a, e, p, team), { run: true })
            continue
          }
        }
        if (a.with !== undefined) a.with = undefined
        decide(a)
      }
    }
  }

  function update(dt, camera, focus, range = 150) {
    // langkah simulasi dipecah supaya bingkai yang panjang tidak membuat orang melompat
    let left = Math.min(dt, 0.5)
    while (left > 0) {
      const s = Math.min(left, 0.1)
      step(s)
      left -= s
    }
    rusa.update(dt, [...(player ? [{ x: player.position.x, z: player.position.z, sneak: false }] : []), ...agents.filter(a => a.party && !a.sneak && a.act === 'jalan').map(a => ({ x: a.x, z: a.z, sneak: false }))])
    // gambar: yang dekat titik fokus & terlihat kamera
    cam.copy(camera.position)
    pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(pm)
    vis.length = 0
    const r2 = range * range
    for (const a of agents) {
      if (a.hidden) continue
      const dx = a.x - focus.x
      const dz = a.z - focus.z
      const d2 = dx * dx + dz * dz
      if (d2 > r2) continue
      a.y = a.party && a.party.stage === 'pulang' ? yAt(a.x, a.z) : a.act === 'jalan' || a.dance || a.y === undefined || a.yAtX !== a.x || a.yAtZ !== a.z ? yAt(a.x, a.z) : a.y
      a.yAtX = a.x
      a.yAtZ = a.z
      sphere.center.set(a.x, a.y + 1, a.z)
      if (!frustum.intersectsSphere(sphere)) continue
      a.d2 = (a.x - cam.x) ** 2 + (a.z - cam.z) ** 2
      vis.push(a)
    }
    vis.sort((p, q) => p.d2 - q.d2)
    folk.begin()
    const caps = WARGA_CAPS[quality.level] ?? WARGA_CAPS.sedang
    for (let i = 0; i < vis.length; i++) {
      const a = vis[i]
      // animasi
      if (a.fade > 0) a.fade = Math.max(0, a.fade - dt)
      a.prevT += dt
      if (a.act !== 'jalan') a.t += dt
      if (a.gayaT > 0) {
        a.gayaT -= dt
        if (a.gayaT <= 0) a.gaya = null
      }
      const clip = a.gaya || a.clip
      const inst = { type: a.type, x: a.x, y: a.y, z: a.z, heading: a.heading, clip, t: a.t, prev: a.prev, prevT: a.prevT, fade: a.fade, dye: a.dye, props: a.props, scale: a.scale }
      if (i < caps.near) folk.put(inst, true)
      else if (!folk.put(inst, false)) break
    }
    folk.end()
    rusa.render()
    // satu orang per bingkai boleh berseru
    if (vis.length) chatter(vis[chatterI++ % vis.length])
  }

  // ------------------------------------------------------------------ untuk obrolan & pengujian
  const relation = (a, b) => {
    const { o } = a
    if (o.pasangan === b.o.id) return b.o.wanita ? 'istriku' : 'suamiku'
    if (o.anak.includes(b.o.id)) return b.o.wanita ? 'putriku' : 'putraku'
    if (o.ortu.includes(b.o.id)) return b.o.wanita ? 'ibuku' : 'ayahku'
    if (o.keluarga === b.o.keluarga) {
      if (b.o.peran === 'kakek') return 'kakekku'
      if (b.o.peran === 'nenek') return 'nenekku'
      if (o.peran === 'kakek' || o.peran === 'nenek') return b.o.wanita ? 'cucu perempuanku' : 'cucu laki-lakiku'
      return b.o.wanita ? 'saudara perempuanku' : 'saudara laki-lakiku'
    }
    return o.teman.includes(b.o.id) ? 'temanku' : 'tetanggaku'
  }
  const kepala = agents.find(b => b.o.kerja === 'kepala') || null
  function describe(a) {
    const { o } = a
    const fam = keluarga[o.keluarga]
    // sedang diajak bicara pemain: ceritakan kegiatan sebelum disapa (bukan "mengobrol denganmu")
    const now = a.talk && a.sebelum ? a.sebelum.act : a.act
    const act = now === 'jalan' ? null : now
    const pergi = a.talk && a.sebelum ? a.sebelum.pergi : !!a.then
    const ev = a.event !== null && a.event !== undefined ? events.find(e => e.id === a.event) : null
    const members = fam.anggota.filter(id => id !== o.id).map(byId).map(b => ({ nama: b.o.nama, hubungan: relation(a, b), umur: b.o.umur, kegiatan: b.hidden ? (b.act === 'tidur' ? KEGIATAN.tidur : 'di rumah') : KEGIATAN[b.act] || 'berjalan' }))
    const today = eventsToday().map(e => ({ nama: e.nama, desa: DESA[e.desa].pendek, mulai: fmtJam(e.mulai), selesai: fmtJam(e.selesai), host: e.host !== null && e.host !== undefined ? byId(e.host).o.nama : null, jenis: e.jenis, sedang: inRange(jam(), e.mulai, e.selesai), lewat: !inRange(jam(), e.mulai, e.selesai) && jam() > e.selesai }))
    return {
      nama: o.nama, namaLengkap: `${o.nama} ${o.namaKeluarga}`, keluarga: o.namaKeluarga, umur: o.umur, wanita: o.wanita, peran: o.peran,
      kerja: o.kerja, pekerjaan: PEKERJAAN[o.kerja], desa: o.desa, namaDesa: DESA[o.desa].nama,
      kegiatan: act ? (act === 'lihat' && o.kerja === 'kepala' ? 'berkeliling melihat warga' : KEGIATAN[act] || act) : pergi ? 'dalam perjalanan' : 'berjalan-jalan', act: act || 'jalan', acara: ev ? ev.nama : null,
      sifat: o.sifat, kebutuhan: a.need, anggota: members, teman: o.teman.map(byId).map(b => b.o.nama),
      jam: jam(), hari: hariOf(T), waktu: fmtJam(jam()), malam: malamOf(jam()), acaraHariIni: today, catatan: a.diary.slice(),
      bangun: fmtJam(o.bangun), tidur: fmtJam(o.tidur), tangkapan: a.catch, perburuan: { ...hunts }, ikan: catches.nelayan + catches.desa,
      rupa: o.rupa, penduduk: agents.length, kepalaDesa: kepala ? `${kepala.o.nama} ${kepala.o.namaKeluarga}` : null, pasangan: o.pasangan !== null ? byId(o.pasangan).o.nama : null, shift: o.shift || null,
    }
  }
  // penduduk bernama `nama` (huruf kecil) yang dikenal a: keluarga dulu, lalu sekampung, lalu siapa saja
  function kenal(a, nama) {
    const cands = agents.filter(b => b !== a && b.o.nama.toLowerCase() === nama)
    if (!cands.length) return null
    const b = cands.find(q => q.o.keluarga === a.o.keluarga) || cands.find(q => a.o.teman.includes(q.o.id)) || cands.find(q => q.o.desa === a.o.desa) || cands[0]
    return {
      nama: b.o.nama, namaLengkap: `${b.o.nama} ${b.o.namaKeluarga}`, umur: b.o.umur, wanita: b.o.wanita, pekerjaan: PEKERJAAN[b.o.kerja], kerja: b.o.kerja,
      desa: DESA[b.o.desa].pendek, sekampung: b.o.desa === a.o.desa, hubungan: relation(a, b),
      kegiatan: b.hidden ? (b.act === 'tidur' ? KEGIATAN.tidur : 'di rumahnya') : KEGIATAN[b.act] || 'berjalan', jarak: Math.hypot(b.x - a.x, b.z - a.z),
      x: b.x, z: b.z,
    }
  }
  function around(x, z, r) {
    const out = []
    for (const a of agents) if (!a.hidden && Math.abs(a.x - x) < r && Math.abs(a.z - z) < r && Math.hypot(a.x - x, a.z - z) < r) out.push(a)
    return out
  }

  return {
    object: folk.object,
    agents,
    rusa,
    events,
    describe,
    kenal,
    around,
    update,
    KEGIATAN,
    setBubbles(b) {
      bubbles = b
    },
    setPlayer(p) {
      player = p
    },
    get jam() {
      return jam()
    },
    get hari() {
      return hariOf(T)
    },
    get waktu() {
      return fmtJam(jam())
    },
    get malam() {
      return malamOf(jam())
    },
    get acara() {
      return eventsToday()
    },
    get perburuan() {
      return parties
    },
    // obrolan: tahan orangnya (berhenti, menghadap pemain) / lepaskan
    grab(a) {
      if (a.party) return false
      if (!a.talk) a.sebelum = { act: a.act, pergi: !!a.then }
      a.talk = true
      releaseSpot(a)
      a.path = null
      a.then = null
      a.dance = null
      a.snow = null
      a.act = 'bicara'
      a.props = []
      setClip(a, 'idle')
      return true
    },
    mode(a, gaya) {
      setClip(a, gaya === 'nod' ? 'nod' : gaya === 'shake' ? 'shake' : gaya === 'bow' ? 'bow' : gaya === 'wave' ? 'wave' : gaya === 'cheer' ? 'cheer' : gaya === 'talk' ? 'talk' : 'idle')
    },
    free(a) {
      if (!a.talk) return
      a.talk = false
      a.sebelum = null
      a.until = T
      decide(a)
    },
    // dorong pemain keluar dari badan penduduk (penduduk tidak menembus pemain)
    pushOut(pos, radius = 0.35) {
      for (const a of agents) {
        if (a.hidden) continue
        const dx = pos.x - a.x
        const dz = pos.z - a.z
        const r = radius + 0.3 * a.scale
        const d = dx * dx + dz * dz
        if (d < r * r && d > 1e-6 && Math.abs(pos.y - (a.y ?? pos.y)) < 1.6) {
          const k = Math.sqrt(d)
          pos.x = a.x + (dx / k) * r
          pos.z = a.z + (dz / k) * r
        }
      }
    },
    // pengujian: lompat ke jam tertentu hari ini / besok (semua orang menyusun ulang kegiatannya)
    setTime(h) {
      const now = jam()
      let d = h - now
      if (d < 0) d += 24
      T += d * JAM
      lastHour = -1
      lastScheduled = -1
      schedule()
      placeAll()
      // keluar rumah sesuai jadwal tanpa menunggu
      for (const a of agents) if (!shouldSleep(a.o, jam())) a.until = T
    },
    // pengujian: majukan simulasi beberapa detik (langkah kecil, tanpa menggambar)
    skip(seconds, stepS = 0.25) {
      for (let s = 0; s < seconds; s += stepS) {
        step(stepS)
        rusa.update(stepS, [])
      }
    },
    stats() {
      const st = { orang: agents.length, keluarga: keluarga.length, diRumah: 0, diLuar: 0, berjalan: 0, kegiatan: {}, desa: {} }
      for (const a of agents) {
        if (a.hidden) st.diRumah++
        else st.diLuar++
        if (a.act === 'jalan') st.berjalan++
        st.kegiatan[a.act] = (st.kegiatan[a.act] || 0) + 1
        st.desa[a.o.desa] = (st.desa[a.o.desa] || 0) + 1
      }
      st.jam = fmtJam(jam())
      st.hari = hariOf(T)
      st.acara = eventsToday().map(e => `${e.nama} (${DESA[e.desa].pendek} ${fmtJam(e.mulai)}–${fmtJam(e.selesai)}${inRange(jam(), e.mulai, e.selesai) ? `, ${e.peserta.size} orang` : ''})`)
      st.buru = { ...hunts, aktif: parties.filter(p => p.stage !== 'selesai').map(p => p.stage) }
      st.ikan = { ...catches }
      st.rusa = rusa.stats()
      st.simpul = nodes.length
      return st
    },
  }
}
