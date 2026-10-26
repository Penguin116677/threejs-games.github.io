import * as THREE from 'three'
import { ISLAND } from '../island.js'
import { insideWorld } from '../world.js'
import { Heap } from '../navgrid.js'
import { paletteTexture, tombakGeo, geoWarna } from '../../tokoh/rupa.js'
import { inKingdom } from './wilayah.js'
import { PLAYER } from './keamanan.js'
import { HOP, RIDE_REACH } from './prajurit.js'

// Perahu patroli Kerajaan Kencana. Pemain yang lolos lewat laut (berenang / berperahu menjauhi
// para pengejarnya) dikejar dengan jukung yang bersandar di dermaga-dermaga Kencana:
// 1. Siap: prajurit terdekat (paling banyak dua, penombak didahulukan) berlari ke tepi dek di
//    samping perahu lalu melompat naik — satu di haluan, satu juru mudi di buritan.
// 2. Lepas: perahu bergeser menjauhi dek, berputar, lalu mengejar. Jalurnya dicari di peta laut
//    (A*, sel 4 m, air cukup dalam untuk lambung; jembatan & dek tidak bisa dilalui).
// 3. Kejar: dekat sasaran perahu melambat & menghadapnya. Awak menusuk bila terjangkau dan
//    melempar tombak dari jauh — diarahkan ke perkiraan letak pemain, jadi bisa dihindari dengan
//    berbelok. Perahu pemain yang dikayuh penuh sedikit lebih cepat.
// 4. Pemain naik ke darat / air dangkal di wilayah kerajaan: penombak haluan terjun & berenang
//    mengejarnya, juru mudi tetap di perahu.
// 5. Pulang: pengejaran berhenti (pemain lolos / kalah / terlalu jauh, atau perahu terlalu jauh
//    dari dermaganya) → perahu kembali, bersandar, awaknya naik ke dek lalu kembali bertugas.
// Lambungnya tidak bisa ditembus perenang. Siapa yang dikejar tetap diputuskan keamanan.js.

const CELL = 4 // m: sel peta laut
const AREA = { x0: -1120, z0: -500, x1: -40, z1: 720 } // laut Kepulauan Kencana
const DEEP = { mid: 1.1, edge: 0.75, e: 2.2 } // sel laut: sedalam `mid` di tengah, `edge` sejauh ±e m
const MAX_EXPAND = 24000 // batas sel yang diperiksa satu pencarian jalur
const SPEED = 6.4 // m/s — perahu pemain (7,5 m/s) yang dikayuh penuh bisa lolos
const ACCEL = 0.8 // per detik (mendekati kecepatan tujuan)
const DRAG = 1.2
const TURN = 1.15 // rad/s pada kecepatan penuh (lebih pelan saat lambat)
const DRAFT = 0.6 // m: sama dengan perahu pemain
const BOW = 2.9 // m dari pusat ke haluan / buritan
const HULL = { hx: 0.75, hz: 3.0, r: 0.35 } // lambung (tanpa cadik) yang mendorong perenang
const KEEP = 5.2 // m: jarak pusat dengan perahu lain (cadik ±2,3 m)
const SEATS = [{ z: 1.35, y: 0.16 }, { z: -2.2, y: 0.26 }] // haluan (penombak), buritan (juru mudi)
// berangkat: pemain di laut dalam tanpa pengejar sedekat 9 m selama `wait` detik; perahu sejauh
// `range` m dari pemain; awak sejauh `crew` m dari dek; menunggu awak paling lama `board` detik;
// paling banyak `max` perahu, perahu berikutnya `gap` detik kemudian bila yang lain jauh (`spread` m)
const LAUNCH = { wait: 2.5, range: 230, crew: 70, board: 15, gap: 12, max: 2, spread: 60 }
// menyerah: perahu sejauh `home` m dari dermaganya, atau pemain tertinggal lebih jauh dari `far` m
// (di luar wilayah kerajaan `farOut` m) selama `time` detik
const QUIT = { home: 320, far: 130, farOut: 70, time: 12 }
// lemparan tombak: jarak (m), laju datar (m/s), jeda antarlemparan (detik), meleset ±(err0 + err1·jarak) m
const THROW = { min: 3.6, max: 17, speed: 15, cd: [3.4, 4.8], damage: 5, hitR: 0.8, err: [0.7, 0.1] }
const GRAVITY = 9.8
const SPEARS = 10
const PHRASES = ['Ke perahu! Kejar dia!', 'Dia kabur lewat laut! Siapkan perahu!', 'Naik perahu! Jangan biarkan lolos!']

const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const smooth = u => u * u * (3 - 2 * u)
const pick = list => list[Math.floor(Math.random() * list.length)]
const Z = new THREE.Vector3(0, 0, 1)

// boats: perahu bersandar Kencana (kingdom.js `boats`); soldiers: prajurit.js; security: keamanan.js;
// player / boat: pemain & perahunya; bubbles: gelembung ucapan (boleh null); message(teks, ms);
// ripples: riak air (riak.js, boleh null)
export function createPatrolBoats({ boats, soldiers, security, player, boat, ground, bubbles = null, message = () => {}, ripples = null }) {
  const pp = player.position
  let clock = 0 // detik permainan (ayunan perahu di ombak sama dengan kingdom.js)
  let needT = 0 // detik pemain sudah di laut tanpa pengejar di dekatnya
  let sinceLaunch = 99
  let launches = 0
  let planned = false // satu pencarian jalur per frame (semua perahu)
  const hunting = a => a.state === 'serang' && a.order?.target === PLAYER
  const depthAt = (x, z) => ISLAND.seaLevel - ground.surfaceAt(x, z)
  // lambung muat di (x, z) menghadap h (sama dengan perahu pemain)
  function fits(x, z, h) {
    if (!insideWorld(x, z, 40)) return false
    const sx = Math.sin(h) * BOW
    const sz = Math.cos(h) * BOW
    return depthAt(x, z) >= DRAFT && depthAt(x + sx, z + sz) >= DRAFT && depthAt(x - sx, z - sz) >= DRAFT * 0.8
  }
  const say = (a, text) => bubbles?.say(() => (soldiers.alive(a) ? { x: a.x, y: a.y + 1.8, z: a.z } : null), text, 2600, `p${a.id}`)

  // --------------------------------------------------------------- armada
  // titik naik: tepi dek terdekat dari perahu (0,6 m masuk dari tepinya)
  function boardingPoint(b) {
    let best = null
    let bd = 6
    ground.forEachSurfaceNear(b.x, b.z, 7, s => {
      const dx = b.x - s.x
      const dz = b.z - s.z
      const lx = clamp(dx * s.cos - dz * s.sin, -s.hx + 0.6, s.hx - 0.6)
      const lz = clamp(dx * s.sin + dz * s.cos, -s.hz + 0.6, s.hz - 0.6)
      const x = s.x + lx * s.cos + lz * s.sin
      const z = s.z - lx * s.sin + lz * s.cos
      const d = Math.hypot(b.x - x, b.z - z)
      if (d < bd) {
        bd = d
        best = { x, z }
      }
    })
    return best && { ...best, y: ground.surfaceAt(best.x, best.z) }
  }
  const fleet = []
  const obstacles = [] // perahu lain yang diam di laut (jong besar, jukung di luar wilayah): kapsul di peta laut
  for (const b of boats) {
    if (b.land) continue
    const dock = b.type === 'jukung' && inKingdom(b.x, b.z) && fits(b.x, b.z, b.rot) ? boardingPoint(b) : null
    if (!dock) {
      const half = b.type === 'jong' ? 6.5 : 2
      obstacles.push({ ax: b.x - Math.sin(b.rot) * half, az: b.z - Math.cos(b.rot) * half, bx: b.x + Math.sin(b.rot) * half, bz: b.z + Math.cos(b.rot) * half, r: b.type === 'jong' ? 5 : 4.5 })
      continue
    }
    const ax = b.x - dock.x
    const az = b.z - dock.z
    const al = Math.hypot(ax, az) || 1
    fleet.push({
      b, home: { x: b.x, z: b.z, rot: b.rot }, dock, away: { x: ax / al, z: az / al },
      state: 'tambat', crew: [], speed: 0, path: null, planT: 0, goalX: 0, goalZ: 0, t: 0,
      stuckT: 0, backT: 0, replan: false, farT: 0, from: null,
    })
  }

  // --------------------------------------------------------------- peta laut (sel diperiksa saat dibutuhkan)
  const NX = Math.ceil((AREA.x1 - AREA.x0) / CELL)
  const NZ = Math.ceil((AREA.z1 - AREA.z0) / CELL)
  const N = NX * NZ
  const sea = new Uint8Array(N) // 0 = belum diperiksa, 1 = laut, 2 = bukan
  const cx = i => AREA.x0 + (i + 0.5) * CELL
  const cz = j => AREA.z0 + (j + 0.5) * CELL
  function blockedByBoat(x, z) {
    for (const o of obstacles) {
      const vx = o.bx - o.ax
      const vz = o.bz - o.az
      const t = clamp(((x - o.ax) * vx + (z - o.az) * vz) / (vx * vx + vz * vz || 1), 0, 1)
      if (Math.hypot(o.ax + vx * t - x, o.az + vz * t - z) < o.r) return true
    }
    return false
  }
  function open(i, j) {
    if (i < 0 || j < 0 || i >= NX || j >= NZ) return false
    const k = j * NX + i
    if (!sea[k]) {
      const x = cx(i)
      const z = cz(j)
      const { e } = DEEP
      const ok = insideWorld(x, z, 40) && depthAt(x, z) >= DEEP.mid
        && depthAt(x + e, z) >= DEEP.edge && depthAt(x - e, z) >= DEEP.edge
        && depthAt(x, z + e) >= DEEP.edge && depthAt(x, z - e) >= DEEP.edge && !blockedByBoat(x, z)
      sea[k] = ok ? 1 : 2
    }
    return sea[k] === 1
  }
  const ci = x => Math.floor((x - AREA.x0) / CELL)
  const cj = z => Math.floor((z - AREA.z0) / CELL)
  const openAt = (x, z) => open(ci(x), cj(z))
  // garis lurus di laut (contoh tiap 2 m)
  function seaClear(ax, az, bx, bz) {
    const n = Math.ceil(Math.hypot(bx - ax, bz - az) / 2)
    for (let k = 1; k <= n; k++) if (!openAt(ax + ((bx - ax) * k) / n, az + ((bz - az) * k) / n)) return false
    return true
  }
  // sel laut terdekat dari (x, z), mencari melingkar sampai `r` sel; −1 bila tidak ada
  function nearestOpen(x, z, r = 14) {
    const i0 = ci(x)
    const j0 = cj(z)
    if (open(i0, j0)) return j0 * NX + i0
    for (let ring = 1; ring <= r; ring++) {
      let best = -1
      let bd = Infinity
      const test = (di, dj) => {
        const d = di * di + dj * dj
        if (d < bd && open(i0 + di, j0 + dj)) {
          bd = d
          best = (j0 + dj) * NX + i0 + di
        }
      }
      for (let d = -ring; d <= ring; d++) {
        test(d, -ring)
        test(d, ring)
        if (Math.abs(d) < ring) {
          test(-ring, d)
          test(ring, d)
        }
      }
      if (best >= 0) return best
    }
    return -1
  }

  const g = new Float32Array(N)
  const came = new Int32Array(N)
  const seen = new Uint32Array(N) // nomor pencarian yang terakhir menyentuh sel (g & came berlaku)
  const shut = new Uint32Array(N)
  let search = 0
  const heap = new Heap(MAX_EXPAND * 8 + 16)
  const { SQRT2 } = Math
  const STEPS = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, SQRT2], [1, -1, SQRT2], [-1, 1, SQRT2], [-1, -1, SQRT2]]
  // jalur laut dari (ax, az) ke (bx, bz): [{ x, z }, …] tanpa titik awal. Tujuan bukan laut (darat,
  // air dangkal) → ke sel laut terdekatnya; tak terjangkau → sejauh sel yang paling dekat ke tujuan.
  // null bila tidak ada laut di dekat titik awal / tujuan.
  function seaPath(ax, az, bx, bz) {
    const s = nearestOpen(ax, az, 3)
    const t = nearestOpen(bx, bz)
    if (s < 0 || t < 0) return null
    search++
    heap.size = 0
    const ti = t % NX
    const tj = Math.floor(t / NX)
    const h = k => {
      const dx = Math.abs((k % NX) - ti)
      const dz = Math.abs(Math.floor(k / NX) - tj)
      return dx + dz + (SQRT2 - 2) * Math.min(dx, dz)
    }
    seen[s] = search
    g[s] = 0
    came[s] = -1
    heap.push(s, h(s))
    let best = s
    let bestH = h(s)
    let n = 0
    while (heap.size) {
      const k = heap.pop()
      if (k === t) {
        best = t
        break
      }
      if (shut[k] === search) continue
      shut[k] = search
      const hk = h(k)
      if (hk < bestH) {
        bestH = hk
        best = k
      }
      if (++n > MAX_EXPAND || heap.size > heap.idx.length - 9) break
      const i = k % NX
      const j = Math.floor(k / NX)
      for (const [di, dj, cost] of STEPS) {
        if (!open(i + di, j + dj)) continue
        if (di && dj && (!open(i + di, j) || !open(i, j + dj))) continue // jangan memotong sudut daratan
        const nk = (j + dj) * NX + i + di
        if (shut[nk] === search) continue
        const ng = g[k] + cost
        if (seen[nk] !== search || ng < g[nk]) {
          seen[nk] = search
          g[nk] = ng
          came[nk] = k
          heap.push(nk, ng + h(nk))
        }
      }
    }
    const cells = []
    for (let k = best; k >= 0; k = came[k]) cells.push(k)
    cells.reverse()
    const pts = [{ x: ax, z: az }, ...cells.slice(1).map(k => ({ x: cx(k % NX), z: cz(Math.floor(k / NX)) }))]
    if (best === t && openAt(bx, bz)) pts.push({ x: bx, z: bz })
    if (pts.length < 2) pts.push({ x: cx(best % NX), z: cz(Math.floor(best / NX)) })
    // luruskan: lompat ke titik terjauh yang masih segaris laut
    const out = []
    for (let i = 0; i < pts.length - 1;) {
      let j = i + 1
      while (j + 1 < pts.length && seaClear(pts[i].x, pts[i].z, pts[j + 1].x, pts[j + 1].z)) j++
      out.push(pts[j])
      i = j
    }
    return out
  }

  // --------------------------------------------------------------- tombak lempar
  const spearGeo = geoWarna(tombakGeo(1, 0.5)).scale(2, 2, 2).rotateX(Math.PI / 2) // sepanjang +z, mata di depan
  const spearMesh = new THREE.InstancedMesh(spearGeo, new THREE.MeshLambertMaterial({ map: paletteTexture() }), SPEARS)
  spearMesh.name = 'tombak-lempar'
  spearMesh.count = 0
  spearMesh.frustumCulled = false
  spearMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const spears = Array.from({ length: SPEARS }, () => ({ on: false, state: '', t: 0, T: 0, hold: 0, x0: 0, y0: 0, z0: 0, vx: 0, vy: 0, vz: 0, x: 0, y: 0, z: 0, dir: new THREE.Vector3(0, 0, 1), checked: false }))
  const pv = { x: 0, z: 0 } // kecepatan pemain (dihaluskan) untuk membidik
  let lastX = pp.x
  let lastZ = pp.z
  let thrown = 0
  let hits = 0

  // dilepas di tengah ayunan awak (soldiers.attack): ke perkiraan letak pemain saat tombak tiba
  function throwSpear(a) {
    if (player.defeated) return
    const s = spears.find(o => !o.on) ?? spears.reduce((p, q) => (q.t > p.t ? q : p))
    const x0 = a.x + Math.sin(a.heading) * 0.3
    const z0 = a.z + Math.cos(a.heading) * 0.3
    const y0 = a.y + 1.55
    const d = Math.hypot(pp.x - x0, pp.z - z0)
    const T = Math.max(0.25, d / THROW.speed)
    const err = (THROW.err[0] + THROW.err[1] * d) * Math.sqrt(Math.random())
    const ea = Math.random() * Math.PI * 2
    const tx = pp.x + pv.x * T + Math.cos(ea) * err
    const tz = pp.z + pv.z * T + Math.sin(ea) * err
    const ty = pp.y + 0.9
    Object.assign(s, { on: true, state: 'terbang', t: 0, T, hold: 0, x0, y0, z0, x: x0, y: y0, z: z0, checked: false })
    s.vx = (tx - x0) / T
    s.vz = (tz - z0) / T
    s.vy = (ty - y0 + 0.5 * GRAVITY * T * T) / T
    s.dir.set(s.vx, s.vy, s.vz).normalize()
    thrown++
  }

  const _m = new THREE.Matrix4()
  const _q = new THREE.Quaternion()
  const _p = new THREE.Vector3()
  const one = new THREE.Vector3(1, 1, 1)
  function updateSpears(dt) {
    let n = 0
    for (const s of spears) {
      if (!s.on) continue
      if (s.state === 'terbang') {
        s.t += dt
        const { t } = s
        s.x = s.x0 + s.vx * t
        s.z = s.z0 + s.vz * t
        s.y = s.y0 + s.vy * t - 0.5 * GRAVITY * t * t
        s.dir.set(s.vx, s.vy - GRAVITY * t, s.vz).normalize()
        // tiba di titik bidikan (dihitung tepat di saat itu, tidak bergantung laju frame): kena bila
        // pemain masih di sana
        if (!s.checked && t >= s.T) {
          s.checked = true
          const hx = s.x0 + s.vx * s.T
          const hz = s.z0 + s.vz * s.T
          const hy = s.y0 + s.vy * s.T - 0.5 * GRAVITY * s.T * s.T
          if (!player.defeated && Math.hypot(hx - pp.x, hz - pp.z) < THROW.hitR && Math.abs(hy - (pp.y + 0.9)) < 1.3) {
            player.damage(THROW.damage, { x: s.x0, z: s.z0 })
            hits++
            s.on = false
            continue
          }
        }
        const floor = ground.surfaceAt(s.x, s.z)
        const top = Math.max(ISLAND.seaLevel, floor)
        if (s.y <= top) {
          s.y = top
          if (floor < ISLAND.seaLevel - 0.15) {
            ripples?.spawn(s.x, s.z, 0.9, 0.7)
            s.state = 'tenggelam'
            s.hold = 0.7
          } else {
            s.state = 'tancap'
            s.hold = 2.5
          }
        }
        if (s.t > 4) s.on = false
      } else {
        s.hold -= dt
        if (s.state === 'tenggelam') s.y -= dt * 0.9
        if (s.hold <= 0) s.on = false
      }
      if (!s.on) continue
      // (x, y, z) = mata tombak; pusat batangnya 1,15 m di belakangnya
      _p.set(s.x, s.y, s.z).addScaledVector(s.dir, -1.15)
      _q.setFromUnitVectors(Z, s.dir)
      spearMesh.setMatrixAt(n++, _m.compose(_p, _q, one))
    }
    spearMesh.count = n
    if (n) spearMesh.instanceMatrix.needsUpdate = true
  }

  // --------------------------------------------------------------- awak
  function pickCrew(pb) {
    const list = []
    for (const a of soldiers.list) {
      if (!soldiers.alive(a) || a.ride || a.climb || a.swim) continue
      if (!(a.state === 'ronda' || a.state === 'jaga' || a.state === 'kembali' || hunting(a))) continue
      const d = Math.hypot(a.x - pb.dock.x, a.z - pb.dock.z)
      if (d > LAUNCH.crew) continue
      // penombak didahulukan: bisa melempar tombak dari perahu
      list.push({ a, k: d - (soldiers.types[a.type].weapon === 'tombak' ? 12 : 0) })
    }
    return list.sort((p, q) => p.k - q.k).slice(0, SEATS.length).map(o => o.a)
  }

  function launch(pb, crew) {
    pb.state = 'siap'
    pb.t = 0
    const fx = Math.sin(pb.b.rot)
    const fz = Math.cos(pb.b.rot)
    pb.crew = crew.map((a, seat) => {
      // tiap awak ke titik naiknya sendiri di tepi dek, sejajar tempatnya di perahu
      const k = SEATS[seat].z * 0.5
      const target = { kind: 'titik', x: pb.dock.x + fx * k, z: pb.dock.z + fz * k }
      soldiers.command(a, { do: 'naik', target })
      return { a, seat, ride: null, target }
    })
    say(crew[0], pick(PHRASES))
    message('Prajurit Kencana mengejarmu dengan perahu! Naik ke darat, atau kayuh perahumu menjauh.', 3600)
  }

  // awak yang roboh / berganti tugas di tengah jalan dilepas dari perahu
  function dropCrew(pb) {
    pb.crew = pb.crew.filter(c => (c.ride ? c.a.ride === c.ride : !c.gone))
  }

  // lompatan awak: dari letaknya sekarang ke `to` ({ x, y, z }; null = tempatnya di perahu)
  function hop(c, to, done = null) {
    c.ride.hop = { t: 0, x: c.a.x, y: c.a.y, z: c.a.z, to, done }
    soldiers.gesture(c.a, 'lompat')
  }

  function hopIn(pb, c) {
    c.ride = { boat: pb, seat: c.seat, heading: c.a.heading, hop: null }
    soldiers.board(c.a, c.ride)
    hop(c, null)
  }

  // turun di dermaga: awak melompat ke dek satu per satu, lalu kembali bertugas
  function beginUnload(pb) {
    pb.state = 'turun'
    pb.t = 0
    pb.crew.forEach((c, k) => {
      c.unloadAt = k * 0.35
      c.unloading = false
    })
  }

  // pengejaran batal sebelum berangkat (perahu masih bersandar)
  function standDown(pb) {
    for (const c of pb.crew) if (!c.ride) soldiers.release(c.a)
    pb.crew = pb.crew.filter(c => c.ride)
    if (pb.crew.length) beginUnload(pb)
    else pb.state = 'tambat'
  }

  function goHome(pb, gaveUp) {
    pb.state = 'pulang'
    pb.path = null
    pb.planT = 0
    pb.farT = 0
    for (const c of pb.crew) if (hunting(c.a)) soldiers.release(c.a)
    if (gaveUp && Math.hypot(pp.x - pb.b.x, pp.z - pb.b.z) < 200) message('Perahu patroli Kencana berhenti mengejarmu dan kembali ke dermaga.', 3000)
  }

  // pemain di darat / air dangkal: penombak haluan terjun ke sisi perahu yang menghadap pemain
  function disembark(pb) {
    const c = pb.crew.find(o => o.seat === 0 && !o.ride.hop && !o.leaving)
    if (!c) return
    const { b } = pb
    const rx = Math.cos(b.rot)
    const rz = -Math.sin(b.rot)
    const side = (pp.x - b.x) * rx + (pp.z - b.z) * rz > 0 ? 1 : -1
    const to = { x: c.a.x + rx * side * 1.6, y: ISLAND.seaLevel - 0.3, z: c.a.z + rz * side * 1.6 }
    c.leaving = true
    hop(c, to, () => {
      soldiers.unboard(c.a, to.x, to.y, to.z)
      security.enlist(c.a)
    })
  }

  // awak menyerang dari perahu: tusukan bila terjangkau, lemparan tombak dari jauh
  function fight(c) {
    const { a } = c
    if (c.ride.hop || c.leaving || a.atk || a.atkCd > 0 || a.stagger > 0 || !hunting(a) || player.defeated) return
    const d = Math.hypot(pp.x - a.x, pp.z - a.z)
    if (d <= soldiers.types[a.type].reach + RIDE_REACH) soldiers.attack(a, null, 1.5 + Math.random() * 0.8)
    else if (d >= THROW.min && d <= THROW.max) soldiers.attack(a, throwSpear, THROW.cd[0] + Math.random() * (THROW.cd[1] - THROW.cd[0]))
  }

  const boatY = b => 0.12 + Math.sin(clock * 1.3 + b.phase) * 0.1 // sama dengan kingdom.js updateBoats
  // letakkan awak di tempatnya (atau sepanjang lompatannya)
  function placeCrew(pb, dt) {
    const { b } = pb
    const y = boatY(b)
    const sn = Math.sin(b.rot)
    const cs = Math.cos(b.rot)
    for (const c of pb.crew) {
      const { ride, a } = c
      if (!ride || a.ride !== ride) continue
      const s = SEATS[c.seat]
      const sx = b.x + sn * s.z
      const sz = b.z + cs * s.z
      const sy = y + s.y
      const jump = ride.hop
      if (!jump) {
        a.x = sx
        a.z = sz
        a.y = sy
        ride.heading = b.rot
        continue
      }
      jump.t += dt
      const u = Math.min(1, jump.t / HOP)
      const to = jump.to ?? { x: sx, y: sy, z: sz }
      a.x = jump.x + (to.x - jump.x) * u
      a.z = jump.z + (to.z - jump.z) * u
      a.y = jump.y + (to.y - jump.y) * u + (0.45 + 0.3 * Math.abs(to.y - jump.y)) * 4 * u * (1 - u)
      if (Math.hypot(to.x - jump.x, to.z - jump.z) > 0.2) ride.heading = Math.atan2(to.x - jump.x, to.z - jump.z)
      if (u >= 1) {
        ride.hop = null
        jump.done?.()
      }
    }
  }

  // --------------------------------------------------------------- mengemudi
  function keepApart(pb) {
    const { b } = pb
    const push = (ox, oz) => {
      const dx = b.x - ox
      const dz = b.z - oz
      const d = Math.hypot(dx, dz)
      if (d >= KEEP || d < 1e-3) return
      const nx = b.x + (dx / d) * (KEEP - d) * 0.5
      const nz = b.z + (dz / d) * (KEEP - d) * 0.5
      if (fits(nx, nz, b.rot)) {
        b.x = nx
        b.z = nz
      }
      pb.speed *= 0.9
    }
    if (boat.built) {
      const p = boat.position
      push(p.x, p.z)
    }
    for (const o of fleet) if (o !== pb) push(o.b.x, o.b.z)
  }

  // menuju (tx, tz) lewat peta laut, berhenti `stop` m sebelum sasaran; true = sudah tiba
  // (atau sudah sedekat yang bisa dicapai)
  function drive(pb, tx, tz, stop, dt) {
    const { b } = pb
    pb.planT -= dt
    const d = Math.hypot(tx - b.x, tz - b.z)
    if (pb.planT <= 0 && !planned) {
      pb.planT = 1.2
      if (d < 70 && seaClear(b.x, b.z, tx, tz)) pb.path = null
      else if (!pb.path || pb.replan || Math.hypot(pb.goalX - tx, pb.goalZ - tz) > 6) {
        planned = true
        pb.path = seaPath(b.x, b.z, tx, tz)
        pb.goalX = tx
        pb.goalZ = tz
        pb.replan = false
      }
    }
    let wx = tx
    let wz = tz
    let last = true
    if (pb.path?.length) {
      while (pb.path.length > 1 && Math.hypot(pb.path[0].x - b.x, pb.path[0].z - b.z) < 7) pb.path.shift()
      // titik terakhir jalur = sasaran saat jalur dicari; sasaran di laut yang bergeser sedikit
      // (belum dicari ulang) dituju langsung. Sasaran di darat / air dangkal: berhenti di ujung jalur
      last = pb.path.length === 1
      if (!last || !openAt(tx, tz) || Math.hypot(pb.path[0].x - tx, pb.path[0].z - tz) > 12) {
        wx = pb.path[0].x
        wz = pb.path[0].z
      }
    }
    const dw = Math.hypot(wx - b.x, wz - b.z)
    // tersangkut: mundur sebentar, lalu cari jalur baru
    if (pb.backT > 0) {
      pb.backT -= dt
      pb.speed = 0
      const nx = b.x - Math.sin(b.rot) * 1.6 * dt
      const nz = b.z - Math.cos(b.rot) * 1.6 * dt
      if (fits(nx, nz, b.rot)) {
        b.x = nx
        b.z = nz
      }
      return false
    }
    const diff = wrap(Math.atan2(wx - b.x, wz - b.z) - b.rot)
    const turnRate = TURN * (0.5 + 0.5 * Math.min(1, pb.speed / 3))
    const r = b.rot + clamp(diff, -turnRate * dt, turnRate * dt)
    if (fits(b.x, b.z, r)) b.rot = r
    // berbelok tajam memperlambat; dekat sasaran terakhir melambat sampai berhenti `stop` m darinya
    let want = SPEED * Math.max(0.15, Math.cos(diff))
    if (last) want = Math.min(want, Math.max(0, (dw - stop) * 0.9))
    pb.speed += (want - pb.speed) * Math.min(1, (want > pb.speed ? ACCEL : DRAG) * dt)
    if (pb.speed < 0.02 && !want) pb.speed = 0
    if (pb.speed > 0) {
      const nx = b.x + Math.sin(b.rot) * pb.speed * dt
      const nz = b.z + Math.cos(b.rot) * pb.speed * dt
      if (fits(nx, nz, b.rot)) {
        b.x = nx
        b.z = nz
        pb.stuckT = Math.max(0, pb.stuckT - dt)
      } else {
        pb.speed *= 0.3
        if (want > 0.5) pb.stuckT += dt
      }
    }
    if (pb.stuckT > 1.2) {
      pb.stuckT = 0
      pb.backT = 1.3
      pb.planT = 0
      pb.replan = true
    }
    keepApart(pb)
    return last && dw <= stop + 0.6
  }

  // --------------------------------------------------------------- keadaan perahu
  const STATES = {
    // awak berlari ke dek & melompat naik
    siap(pb, dt, engaged) {
      pb.t += dt
      for (const c of pb.crew) {
        if (c.ride) continue
        const { a } = c
        if (!soldiers.alive(a) || a.state !== 'naik') c.gone = true
        else if (a.atBoat || (pb.t > LAUNCH.board && Math.hypot(a.x - c.target.x, a.z - c.target.z) < 3)) hopIn(pb, c)
      }
      dropCrew(pb)
      if (!engaged) {
        standDown(pb)
        return
      }
      if (!pb.crew.length) {
        pb.state = 'tambat'
        return
      }
      const aboard = pb.crew.filter(c => c.ride)
      if (aboard.some(c => c.ride.hop)) return
      if (aboard.length && (aboard.length === pb.crew.length || pb.t > LAUNCH.board)) {
        // yang belum sampai ditinggal
        for (const c of pb.crew) if (!c.ride) soldiers.release(c.a)
        pb.crew = aboard
        for (const c of aboard) security.enlist(c.a)
        pb.state = 'lepas'
        pb.t = 0
      } else if (!aboard.length && pb.t > LAUNCH.board + 15) standDown(pb)
    },
    // bergeser menjauhi dek sambil mulai berputar ke arah pemain
    lepas(pb, dt) {
      pb.t += dt
      const { b } = pb
      const v = 1.4 * Math.min(1, pb.t / 0.5)
      const nx = b.x + pb.away.x * v * dt
      const nz = b.z + pb.away.z * v * dt
      if (depthAt(nx, nz) >= DRAFT) {
        b.x = nx
        b.z = nz
      }
      if (pb.t > 0.6) {
        const r = b.rot + clamp(wrap(Math.atan2(pp.x - b.x, pp.z - b.z) - b.rot), -0.7 * dt, 0.7 * dt)
        if (fits(b.x, b.z, r)) b.rot = r
      }
      if ((Math.hypot(b.x - pb.home.x, b.z - pb.home.z) > 3.2 && fits(b.x, b.z, b.rot)) || pb.t > 4) {
        pb.state = 'kejar'
        pb.speed = 0.6
        pb.planT = 0
        pb.path = null
      }
      for (const c of pb.crew) fight(c)
    },
    kejar(pb, dt, engaged) {
      dropCrew(pb)
      if (!engaged || !pb.crew.length) {
        goHome(pb, false)
        return
      }
      const { b } = pb
      const d = Math.hypot(pp.x - b.x, pp.z - b.z)
      pb.farT = d > (inKingdom(pp.x, pp.z) ? QUIT.far : QUIT.farOut) ? pb.farT + dt : 0
      if (pb.farT > QUIT.time || Math.hypot(b.x - pb.home.x, b.z - pb.home.z) > QUIT.home) {
        goHome(pb, true)
        return
      }
      // sasaran: pemain — masih jauh: perkiraan letaknya sebentar lagi (memotong jalan larinya)
      const ahead = d > 25 ? Math.min(4, d / SPEED) : 0
      let tx = pp.x + pv.x * ahead
      let tz = pp.z + pv.z * ahead
      if (!openAt(tx, tz)) {
        tx = pp.x
        tz = pp.z
      }
      const stop = boat.aboard ? 7 : player.swimming && openAt(tx, tz) ? 3.4 : 2
      const arrived = drive(pb, tx, tz, stop, dt)
      if (!player.swimming && !boat.aboard && pb.crew.length > 1 && d < 26 && inKingdom(pp.x, pp.z) && pb.speed < 1.2 && (arrived || d < 12)) disembark(pb)
      for (const c of pb.crew) fight(c)
    },
    pulang(pb, dt) {
      dropCrew(pb)
      const gx = pb.home.x + pb.away.x * 4.5
      const gz = pb.home.z + pb.away.z * 4.5
      if (drive(pb, gx, gz, 1.2, dt) || Math.hypot(pb.b.x - gx, pb.b.z - gz) < 2.5) {
        pb.state = 'sandar'
        pb.t = 0
        pb.speed = 0
        pb.from = { x: pb.b.x, z: pb.b.z, rot: pb.b.rot }
      }
    },
    // meluncur pelan ke tambatannya
    sandar(pb, dt) {
      pb.t += dt
      const { b, from, home } = pb
      const u = smooth(Math.min(1, pb.t / 2.6))
      const ur = smooth(Math.min(1, pb.t / 1.6))
      b.x = from.x + (home.x - from.x) * u
      b.z = from.z + (home.z - from.z) * u
      b.rot = from.rot + wrap(home.rot - from.rot) * ur
      if (pb.t >= 2.6) {
        b.rot = home.rot
        beginUnload(pb)
      }
    },
    turun(pb, dt) {
      pb.t += dt
      for (const c of pb.crew) {
        if (c.unloading || c.ride.hop || pb.t < c.unloadAt) continue
        c.unloading = true
        const to = { ...pb.dock }
        hop(c, to, () => {
          soldiers.unboard(c.a, to.x, to.y, to.z)
          soldiers.release(c.a)
        })
      }
      dropCrew(pb)
      if (!pb.crew.length) {
        pb.state = 'tambat'
        pb.b.x = pb.home.x
        pb.b.z = pb.home.z
        pb.b.rot = pb.home.rot
      }
    },
  }

  // --------------------------------------------------------------- berangkat
  const inArea = p => p.x > AREA.x0 && p.x < AREA.x1 && p.z > AREA.z0 && p.z < AREA.z1
  const away = pb => Math.hypot(pb.b.x - pp.x, pb.b.z - pp.z)
  function tryLaunch() {
    needT = LAUNCH.wait - 1.5 // belum ada yang bisa berangkat: coba lagi sebentar lagi
    // perahu yang sedang pulang membawa awaknya berbalik mengejar lagi
    for (const pb of fleet)
      if (pb.state === 'pulang' && pb.crew.length && away(pb) < 160) {
        pb.state = 'kejar'
        pb.path = null
        pb.planT = 0
        for (const c of pb.crew) security.enlist(c.a)
        needT = 0
        return
      }
    const active = fleet.filter(pb => pb.state !== 'tambat')
    if (active.length >= LAUNCH.max || (active.length && sinceLaunch < LAUNCH.gap)) return
    if (active.some(pb => away(pb) < LAUNCH.spread)) return
    const cands = fleet.filter(pb => pb.state === 'tambat' && away(pb) < LAUNCH.range).sort((p, q) => away(p) - away(q))
    for (const pb of cands) {
      const crew = pickCrew(pb)
      if (!crew.length) continue
      launch(pb, crew)
      launches++
      needT = 0
      sinceLaunch = 0
      return
    }
  }

  return {
    object: spearMesh,
    update(dt, t) {
      clock = t
      if (dt > 0) {
        const k = Math.min(1, dt * 4)
        pv.x += (clamp((pp.x - lastX) / dt, -10, 10) - pv.x) * k
        pv.z += (clamp((pp.z - lastZ) / dt, -10, 10) - pv.z) * k
      }
      lastX = pp.x
      lastZ = pp.z
      const engaged = security.engaged && !player.defeated
      // pemain di laut dalam, tidak ada pengejar di dekatnya → perahu diturunkan
      const deep = (player.swimming || boat.aboard) && depthAt(pp.x, pp.z) > 1 && inArea(pp)
      const close = deep && soldiers.nearest(pp.x, pp.z, 9, a => !a.ride && hunting(a))
      needT = engaged && deep && !close ? needT + dt : Math.max(0, needT - 2 * dt)
      sinceLaunch += dt
      if (needT > LAUNCH.wait) tryLaunch()
      planned = false
      for (const pb of fleet) {
        if (pb.state === 'tambat') continue
        STATES[pb.state](pb, dt, engaged)
        placeCrew(pb, dt)
        pb.b.mesh.boundingSphere = null // perahu berpindah: batas gambarnya dihitung ulang
      }
      updateSpears(dt)
    },
    // perenang tidak menembus lambung perahu yang sedang berlayar
    pushOut(pos) {
      if (!player.swimming) return
      for (const pb of fleet) {
        if (pb.state === 'tambat') continue
        const { b } = pb
        const dx = pos.x - b.x
        const dz = pos.z - b.z
        const cs = Math.cos(b.rot)
        const sn = Math.sin(b.rot)
        const lz = dx * sn + dz * cs // sepanjang haluan
        const lx = dx * cs - dz * sn // ke samping
        const ex = HULL.hx + HULL.r - Math.abs(lx)
        const ez = HULL.hz + HULL.r - Math.abs(lz)
        if (ex <= 0 || ez <= 0) continue
        const nlx = ex < ez ? Math.sign(lx || 1) * (HULL.hx + HULL.r) : lx
        const nlz = ex < ez ? lz : Math.sign(lz || 1) * (HULL.hz + HULL.r)
        pos.x = b.x + nlx * cs + nlz * sn
        pos.z = b.z - nlx * sn + nlz * cs
      }
    },
    stats: () => ({
      perahu: fleet.length,
      aktif: fleet.filter(pb => pb.state !== 'tambat').length,
      berangkat: launches,
      tombak: { dilempar: thrown, kena: hits, terbang: spears.filter(s => s.on && s.state === 'terbang').length },
    }),
    // untuk pengujian: keadaan tiap perahu
    list: () => fleet.map(pb => ({
      state: pb.state, x: pb.b.x, z: pb.b.z, rot: pb.b.rot, speed: pb.speed, home: pb.home, dock: pb.dock,
      crew: pb.crew.map(c => ({ id: c.a.id, seat: c.seat, naik: !!c.ride, lompat: !!c.ride?.hop, state: c.a.state, x: c.a.x, y: c.a.y, z: c.a.z })),
      path: pb.path?.length ?? 0,
    })),
    // untuk pengujian: jalur laut antara dua titik
    seaPath,
  }
}
