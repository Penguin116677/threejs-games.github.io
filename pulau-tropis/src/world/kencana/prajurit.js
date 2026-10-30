import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'
import { FPS, bakeRig, bakedMatrix, attach, toBufferGeometry, boneTexture, animate, frameOf } from './rig.js'
import { buatRupa, paletteTexture, HAND, armDir, tombakGeo, pedangGeo, perisaiGeo, geoWarna } from '../../tokoh/rupa.js'
import { ISLAND } from '../island.js'
import { buildRoutes } from './routes.js'
import { TEGAL } from './layout.js'
import { zoneAt } from './wilayah.js'

// Prajurit Kerajaan Kencana yang bertugas (di luar 25.000 prajurit yang berbaris di Tegal Wira):
// - PERONDA: berpasangan (satu bertombak, satu berpedang & berperisai) menyusuri jalan di semua
//   wilayah: Kotaraja & keraton, luar kota & pelabuhan, Jembatan Agung, Pulau Sawah, Pulau Nelayan,
//   Pulau Pura, dan Pulau Wira (jalan depan, sisi, dan belakang barisan). Tiap pasangan punya
//   wilayah tugas sendiri, jadi semua wilayah selalu dironda.
// - PENJAGA POS: berdiri di gerbang kota, gerbang keraton, pendopo, kepala jembatan, Siti Hinggil.
// Modul ini = badan mereka: gerak, animasi, serangan, terkena pukulan, roboh, dan kembali bertugas.
// Yang mengejar BERENANG bila sasarannya di air (terjun dari dek / mengarungi pantai, badan terbenam
// sampai dada, lebih lambat dari pemain), memanjat dek dari air bila sasarannya di atas, dan bisa
// naik perahu patroli (perahu-patroli.js mengatur perahunya).
// Siapa yang dihadang & dilawan (pemain, orc) atau ditanyai (pendatang) diputuskan keamanan.js lewat
// perintah (order).
// Gambar: rupa prajurit berhelm berjambul (tokoh/rupa.js) di atas rangka Kenney "Mini Arena", rangka
// dipanggang (rig.js) — satu InstancedMesh per jenis seragam.

const SCALE = 2.3 // sama dengan prajurit pemain
const RADIUS = 0.35
const WALK_ANIM = 1.4 // m/s yang cocok dengan klip walk pada kecepatan 1×
const RUN_ANIM = 3.6 // … klip sprint
const FADE = 0.2 // detik peralihan antar animasi
const SPEED = { ronda: 1.15, kembali: 1.6, dekati: 2.6, kejar: 5.2 } // m/s; pemain berlari 5,6
const DOWN_TIME = 9 // detik terbaring setelah roboh
const SINK_TIME = 1
const RESPAWN = 30 // detik menghilang sebelum kembali bertugas
const ATTACK = { hit: 0.24, dur: 0.42 } // detik: saat kena & lama klip serang
// berenang: mulai di air lebih dalam dari `depth` m, kembali berjalan di bawah `exit` m; laju (m/s);
// kaki `sink` m di bawah permukaan (kepala & bahu di atas air)
const SWIM = { depth: 1.15, exit: 0.95, speed: 2.1, sink: 1.0 }
const STEP = 0.45 // lantai (dek, batur) setinggi ini di atas kaki dilangkahi; lebih tinggi = tepi
const CLIMB = { max: 2.95, time: 0.95 } // tepi dek yang bisa dipanjat dari air & lamanya (detik)
export const HOP = 0.55 // detik: lompatan naik / turun perahu patroli (perahu-patroli.js)
export const RIDE_REACH = 0.9 // m: dari perahu tombak / pedang dijulurkan lebih jauh (badan mencondong)
const _ax = new THREE.Vector3(1, 0, 0)
const _dir = new THREE.Vector3()
const sm = THREE.MathUtils.smoothstep
// memanjat dek dari air (gerak buatan, klip Kenney tidak punya): lengan meraih tepi → menekan dek,
// badan condong, lutut kanan naik. b = tulang rangka (urutan Kenney)
function climbMod(b, t) {
  const u = Math.min(1, t / CLIMB.time)
  const push = sm(u, 0.4, 0.66)
  for (const j of [4, 5]) {
    _dir.set((j === 4 ? 1 : -1) * 0.31, 0.85 - 1.3 * push, 0.45 + 0.4 * push).normalize()
    b[j].quaternion.setFromUnitVectors(armDir(j), _dir)
  }
  b[3].quaternion.setFromAxisAngle(_ax, 0.5 * sm(u, 0.3, 0.55) * (1 - sm(u, 0.75, 1)))
  b[2].quaternion.setFromAxisAngle(_ax, -1.15 * sm(u, 0.45, 0.7) * (1 - sm(u, 0.86, 1)))
  b[1].quaternion.setFromAxisAngle(_ax, 0.35 * sm(u, 0, 0.3) * (1 - sm(u, 0.6, 0.9)))
}
// melompat (naik / turun perahu): lutut ditekuk di udara, lengan terbuka menjaga keseimbangan
function hopMod(b, t) {
  const k = Math.sin(Math.PI * Math.min(1, t / HOP))
  for (const j of [4, 5]) {
    _dir.set((j === 4 ? 1 : -1) * 0.8, -0.25 + 0.55 * k, 0.3).normalize()
    b[j].quaternion.setFromUnitVectors(armDir(j), _dir)
  }
  b[1].quaternion.setFromAxisAngle(_ax, -0.75 * k)
  b[2].quaternion.setFromAxisAngle(_ax, -0.35 * k)
  b[3].quaternion.setFromAxisAngle(_ax, 0.18 * k)
}
const PATROL = { rendah: 40, sedang: 64, tinggi: 96 } // peronda (berpasangan)
// porsi pasangan peronda per wilayah tugas (paling sedikit satu pasangan per wilayah)
const ZONE_SHARE = { kota: 0.28, wira: 0.22, kencana: 0.2, dermaga: 0.08, sawah: 0.08, nelayan: 0.07, pura: 0.07 }

// jenis seragam: jaga (penjaga pos, jambul hitam & jubah nila), tombak (peronda, jambul biru muda),
// pedang (peronda, jambul hijau, pedang + perisai). reach = jangkauan serang (m)
export const TYPES = [
  { id: 'jaga', weapon: 'tombak', rupa: 'jaga', hp: 10, reach: 1.9, damage: 4 },
  { id: 'tombak', weapon: 'tombak', rupa: 'peronda', hp: 8, reach: 1.9, damage: 4 },
  { id: 'pedang', weapon: 'pedang', rupa: 'perondaPedang', hp: 9, reach: 1.45, damage: 5 },
]

// klip yang dipanggang per jenis senjata; hold = tulang yang dikunci pada pose klip lain
// (tombak tetap tegak di tangan kanan, perisai tetap di depan badan saat berjalan / berlari)
function specsFor(weapon) {
  const spear = { 5: 'idle' }
  const both = { 4: 'holding-left', 5: 'holding-right' }
  const arm = weapon === 'tombak' ? spear : both
  return {
    idle: { clip: 'idle', hold: weapon === 'tombak' ? {} : both },
    walk: { clip: 'walk', hold: arm },
    sprint: { clip: 'sprint', hold: arm },
    attack: { clip: 'attack-melee-right', hold: weapon === 'tombak' ? {} : { 4: 'holding-left' }, loop: false },
    die: { clip: 'die', loop: false },
    yes: { clip: 'emote-yes', hold: arm, loop: false },
    stop: { clip: 'interact-left', hold: weapon === 'tombak' ? spear : { 5: 'holding-right' }, loop: false },
    panjat: { clip: 'idle', loop: false, frames: Math.round(CLIMB.time * FPS), mod: climbMod },
    lompat: { clip: 'idle', loop: false, frames: Math.round(HOP * FPS), mod: hopMod },
  }
}

const _m = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const Y = new THREE.Vector3(0, 1, 0)

function buildTypes(soldier, rows) {
  const clone = cloneSkinned(soldier.model)
  const map = paletteTexture()
  const handAt = (skeleton, row, j) => HAND[j].clone()
    .applyMatrix4(skeleton.boneInverses[j].clone().invert())
    .applyMatrix4(bakedMatrix(rows, row, j))
  return TYPES.map(T => {
    const rig = bakeRig(clone, soldier.clips, rows, specsFor(T.weapon))
    const { row } = rig.table.idle
    const data = buatRupa(T.rupa)
    const h = handAt(rig.skeleton, row, 5)
    if (T.weapon === 'tombak') {
      // tombak tegak di tangan kanan, pangkalnya hampir di tanah
      const butt = Math.max(0.02, h.y - 0.02)
      attach(data, geoWarna(tombakGeo(butt + 1.05, butt)).translate(h.x, h.y, h.z), rows, row, 5, null)
    } else {
      // pedang di tangan kanan (bilah ke atas, condong ke depan) + perisai layang di tangan kiri
      attach(data, geoWarna(pedangGeo()).applyMatrix4(_m.makeRotationX(0.25)).translate(h.x, h.y + 0.01, h.z), rows, row, 5, null)
      const l = handAt(rig.skeleton, row, 4)
      attach(data, geoWarna(perisaiGeo('hijauTua', 0.95)).translate(l.x + 0.01, l.y - 0.04, l.z + 0.05), rows, row, 4, null)
    }
    return { ...T, data, table: rig.table, map }
  })
}

// --- jaringan jalan peronda: jalan + jalur kerajaan, ditambah keliling barisan di Pulau Wira
// (jalan depan → lorong sisi barisan → "jalan belakang"); bagian yang terpisah disambung ke
// simpul terdekat bila garis lurusnya bisa dilewati
function patrolRoutes(plan, nav) {
  const extra = []
  const { army } = plan
  if (army) {
    const NR = TEGAL.z0 - 10
    const WX = TEGAL.x0 - 7
    const EX = TEGAL.x1 + 7
    const outer = army.lanes.slice(-2) // lorong di antara pejalan kaki dan sayap berkuda
    const back = Math.max(...outer.map(l => Math.max(l[1], l[3]))) + 5
    for (const [lx, z0, , z1] of outer) extra.push([lx, NR, lx, Math.min(z0, z1)], [lx, Math.min(z0, z1), lx, back])
    extra.push([WX, back, EX, back])
  }
  const routes = buildRoutes([...plan.roads, ...plan.paths, ...extra])
  const { nodes } = routes
  for (let pass = 0; pass < 6; pass++) {
    const comp = new Int32Array(nodes.length).fill(-1)
    const sizes = []
    for (const n of nodes) {
      if (comp[n.id] >= 0) continue
      const c = sizes.length
      let k = 0
      const stack = [n]
      comp[n.id] = c
      while (stack.length) {
        const a = stack.pop()
        k++
        for (const b of a.links) if (comp[b.id] < 0) {
          comp[b.id] = c
          stack.push(b)
        }
      }
      sizes.push(k)
    }
    if (sizes.length < 2) break
    const main = sizes.indexOf(Math.max(...sizes))
    let joined = false
    for (let c = 0; c < sizes.length; c++) {
      if (c === main) continue
      let best = null
      for (const a of nodes) {
        if (comp[a.id] !== c) continue
        for (const b of nodes) {
          if (comp[b.id] !== main) continue
          const d = Math.hypot(a.x - b.x, a.z - b.z)
          if (d < 16 && (!best || d < best.d) && nav.lineClear(a.x, a.z, b.x, b.z)) best = { a, b, d }
        }
      }
      if (!best) continue
      best.a.links.push(best.b)
      best.b.links.push(best.a)
      best.a.w.set(best.b.id, 3)
      best.b.w.set(best.a.id, 3)
      joined = true
    }
    if (!joined) break
  }
  return routes
}

const turn = (h, want, k) => h + Math.atan2(Math.sin(want - h), Math.cos(want - h)) * k

// soldier: aset prajurit pemain ({ model, clips }) — rangka & klipnya dipakai;
// plan: rencana kerajaan; spots: titik orang tetap (dipakai yang role 'penjaga')
export function createSoldiers({ ground, colliders, nav, plan, spots, quality, soldier }) {
  const group = new THREE.Group()
  group.name = 'prajurit-bertugas'
  const rows = []
  const types = buildTypes(soldier, rows)
  const bones = boneTexture(rows, 7)

  // --- jaringan jalan & wilayah tugas tiap ruas
  const routes = patrolRoutes(plan, nav)
  const edgeZone = new Map()
  const edgeKey = (a, b) => (a.id < b.id ? a.id * 4096 + b.id : b.id * 4096 + a.id)
  const zoneEdges = {}
  for (const n of routes.nodes)
    for (const m of n.links) {
      if (n.id > m.id) continue
      const z = zoneAt((n.x + m.x) / 2, (n.z + m.z) / 2)
      edgeZone.set(edgeKey(n, m), z)
      ;(zoneEdges[z] ||= []).push([n, m, Math.hypot(m.x - n.x, m.z - n.z)])
    }

  // --- prajurit
  const agents = []
  function makeAgent(type, x, z, heading, extra) {
    const T = types[type]
    const a = {
      id: agents.length, type, x, z, y: ground.surfaceAt(x, z), heading,
      state: 'jaga', order: null,
      hp: T.hp, maxHp: T.hp, flash: 0, kx: 0, kz: 0, stagger: 0, barT: 0,
      atkCd: Math.random(), atk: null,
      clip: 'idle', t: Math.random() * 2, prev: null, prevT: 0, fade: 0, animSpeed: 1,
      path: null, navT: 0, goalX: 0, goalZ: 0, moved: 0, downT: 0, waitT: 0, tpx: null, tpz: null, tvx: 0, tvz: 0,
      swim: false, vy: 0, climb: null, wantUp: false, wet: false, rippleT: 0, ride: null, atBoat: false,
      ...extra,
    }
    agents.push(a)
    return a
  }
  // penjaga pos
  for (const s of spots) {
    if (s.role !== 'penjaga') continue
    makeAgent(0, s.x, s.z, s.rot, { kind: 'pos', home: { x: s.x, z: s.z, rot: s.rot }, squad: null, slot: 0 })
  }
  // pasangan peronda, dibagi ke wilayah tugas
  const pairs = Math.floor((PATROL[quality.level] ?? PATROL.sedang) / 2)
  const zones = Object.keys(ZONE_SHARE).filter(z => zoneEdges[z]?.length)
  const quota = Object.fromEntries(zones.map(z => [z, 1]))
  let left = pairs - zones.length
  const want = zones.map(z => ({ z, v: ZONE_SHARE[z] * pairs - 1 }))
  while (left > 0) {
    want.sort((p, q) => q.v - p.v)
    quota[want[0].z]++
    want[0].v -= 1
    left--
  }
  const squads = []
  for (const zone of zones)
    for (let k = 0; k < quota[zone]; k++) {
      const list = zoneEdges[zone]
      const total = list.reduce((s, e) => s + e[2], 0)
      let r = Math.random() * total
      let e = list[0]
      for (const cand of list) {
        r -= cand[2]
        if (r <= 0) {
          e = cand
          break
        }
      }
      const [from, to, len] = Math.random() < 0.5 ? e : [e[1], e[0], e[2]]
      const sq = { id: squads.length, zone, from, to, len, s: Math.random() * len, pause: 0, wait: 0, members: [] }
      squads.push(sq)
      const h = Math.atan2(to.x - from.x, to.z - from.z)
      for (const [type, slot] of [[1, -1], [2, 1]]) {
        const a = makeAgent(type, from.x, from.z, h, { kind: 'ronda', home: null, squad: sq, slot, state: 'ronda', init: true })
        sq.members.push(a)
      }
    }

  // --- InstancedMesh per jenis seragam
  const perType = types.map(() => 0)
  for (const a of agents) perType[a.type]++
  const meshes = types.map((T, i) => {
    const geo = toBufferGeometry(T.data)
    const cap = Math.max(1, perType[i])
    const animA = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    const animB = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    const flash = new THREE.InstancedBufferAttribute(new Float32Array(cap), 1).setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('aAnimA', animA)
    geo.setAttribute('aAnimB', animB)
    geo.setAttribute('aFlash', flash)
    const mat = new THREE.MeshLambertMaterial({ map: T.map })
    mat.onBeforeCompile = shader => {
      animate(shader, bones)
      // kedipan putih saat terkena pukulan
      shader.vertexShader = 'attribute float aFlash;\nvarying float vFlash;\n' + shader.vertexShader
        .replace('void main() {', 'void main() {\n  vFlash = aFlash;')
      shader.fragmentShader = 'varying float vFlash;\n' + shader.fragmentShader
        .replace('#include <dithering_fragment>', '#include <dithering_fragment>\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vFlash);')
    }
    const mesh = new THREE.InstancedMesh(geo, mat, cap)
    mesh.name = `prajurit-${T.id}`
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false // dipilah sendiri per orang
    mesh.castShadow = quality.shadows
    mesh.receiveShadow = quality.shadows
    const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking })
    depth.onBeforeCompile = shader => animate(shader, bones)
    mesh.customDepthMaterial = depth
    mesh.count = 0
    group.add(mesh)
    return { mesh, animA, animB, flash, table: T.table }
  })

  // --- bar nyawa (menghadap kamera) untuk prajurit yang baru terkena
  const barGeo = new THREE.PlaneGeometry(1, 1)
  const barBack = new THREE.MeshBasicMaterial({ color: '#0d1a2a', transparent: true, opacity: 0.85, depthTest: false, depthWrite: false })
  const barFill = new THREE.MeshBasicMaterial({ color: '#ffb02e', depthTest: false, depthWrite: false, toneMapped: false })
  const bars = []
  for (let i = 0; i < 10; i++) {
    const g = new THREE.Group()
    const back = new THREE.Mesh(barGeo, barBack)
    back.scale.set(1.08, 0.2, 1)
    back.renderOrder = 11
    const fill = new THREE.Mesh(barGeo, barFill)
    fill.renderOrder = 12
    g.add(back, fill)
    g.visible = false
    group.add(g)
    bars.push({ g, fill })
  }

  // --- animasi
  function setClip(a, clip, restart = false) {
    if (a.clip === clip && !restart) return
    a.prev = a.clip
    a.prevT = a.t
    a.fade = FADE
    a.clip = clip
    a.t = 0
  }
  const clipDone = a => a.t >= (types[a.type].table[a.clip]?.n ?? 1) / FPS - 0.02

  // --- gerak bebas (menghadang, mengejar, kembali): garis lurus bila lapang, jalur navgrid bila
  // terhalang. Pencarian jalur dibatasi beberapa per frame (A* di dunia besar bisa mahal).
  // wet = boleh masuk air dalam (mengejar sasaran yang berenang, pulang dari air): jalur darat
  // dipakai sampai tepi air, lalu lurus — terjun dari dek / mengarungi pantai lalu berenang.
  // up = sasaran di atas (dek, darat): tepi dek yang menghalangi perenang dipanjat
  let pathBudget = 0
  function moveToward(a, tx, tz, speed, near, dt, wet = false, up = false) {
    a.wet = wet
    a.wantUp = up
    const dx = tx - a.x
    const dz = tz - a.z
    const d = Math.hypot(dx, dz)
    if (d <= near) {
      a.path = null
      return true
    }
    a.navT -= dt
    if (a.swim) a.path = null // di air: lurus (jalur darat tidak berlaku)
    else if (a.navT <= 0) {
      a.navT = 0.6 + Math.random() * 0.4
      const goalMoved = Math.hypot(a.goalX - tx, a.goalZ - tz) > 3
      if (d < 5 || nav.lineClear(a.x, a.z, tx, tz)) a.path = null
      else if ((!a.path || goalMoved) && pathBudget > 0) {
        pathBudget--
        a.path = nav.findPath({ x: a.x, z: a.z }, { x: tx, z: tz })
        a.goalX = tx
        a.goalZ = tz
        if (!a.path) a.navT = 2
      }
    }
    let wx = tx
    let wz = tz
    if (a.path) {
      while (a.path.length > 1 && Math.hypot(a.path[0].x - a.x, a.path[0].z - a.z) < 0.8) a.path.shift()
      if (a.path.length) {
        wx = a.path[0].x
        wz = a.path[0].z
      }
      // ujung jalur darat (tepi air) sudah tercapai: lurus ke sasaran di air
      if (wet && a.path.length === 1 && Math.hypot(wx - a.x, wz - a.z) < 1.2) {
        a.path = null
        a.navT = 1.5
        wx = tx
        wz = tz
      }
    }
    // berenang lebih lambat; mengarungi air dangkal juga (kaki di bawah permukaan air — di atas dek
    // tidak, walau lautnya dalam)
    const depth = ISLAND.seaLevel - a.y
    const v = a.swim ? Math.min(speed, SWIM.speed) : depth > 0.35 ? speed * 0.6 : speed
    const ux = wx - a.x
    const uz = wz - a.z
    const ul = Math.hypot(ux, uz) || 1
    const step = Math.min(v * dt, Math.max(0, d - near) + 0.01)
    const nx = a.x + (ux / ul) * step
    const nz = a.z + (uz / ul) * step
    // jangan masuk laut (kecuali boleh berenang)
    if (wet || ground.surfaceAt(nx, nz) > -0.6) {
      a.x = nx
      a.z = nz
    }
    a.heading = turn(a.heading, Math.atan2(ux, uz), Math.min(1, dt * (a.swim ? 5 : 9)))
    a.moved = v
    return false
  }

  // tinggi kaki prajurit yang bergerak bebas: menapak tanah / lantai yang bisa dilangkahi, jatuh
  // dari dek, berenang di air dalam (kepala di atas air, naik-turun pelan)
  let onWater = () => {} // fn(x, z, besar, kuat): riak / cipratan di permukaan air
  let clock = 0
  function settle(a, dt) {
    const gy = ground.supportAt(a.x, a.z, a.y, STEP)
    const depth = ISLAND.seaLevel - gy
    if (a.swim && depth < SWIM.exit) a.swim = false
    if (!a.swim && depth > SWIM.depth && a.y < ISLAND.seaLevel - 0.3) {
      a.swim = true
      a.path = null
      onWater(a.x, a.z, 1.6, a.vy < -4 ? 0.9 : 0.5) // byur
    }
    if (a.swim) {
      const wy = ISLAND.seaLevel - SWIM.sink + Math.sin(clock * 2.3 + a.id) * 0.035
      a.y += (wy - a.y) * Math.min(1, dt * 5)
      a.vy = 0
      if (a.moved > 0.3 && (a.rippleT -= dt) <= 0) {
        a.rippleT = 0.45
        onWater(a.x, a.z, 1.1, 0.35)
      }
    } else if (a.y > gy + 0.02) {
      // jatuh (melangkah keluar dari dek / batur)
      a.vy -= 21 * dt
      a.y = Math.max(gy, a.y + a.vy * dt)
      if (a.y <= gy) a.vy = 0
    } else {
      a.y = gy
      a.vy = 0
    }
  }

  // tepi lantai yang terlalu tinggi untuk dilangkahi (dek dari air) = dinding; bila sasaran di atas
  // (a.wantUp) dan tepinya terjangkau, prajurit memanjatnya
  const hitL = { gap: 0, nx: 0, nz: 0, px: 0, pz: 0 }
  function ledges(a) {
    ground.forEachSurfaceNear(a.x, a.z, RADIUS, sf => {
      if (a.climb) return
      colliders.probe(sf, a.x, a.z, hitL)
      if (hitL.gap >= RADIUS) return
      // sudah di atas lantai ini (mis. di tengah tangga) dan lantai di bawah kaki masih selangkah:
      // tepinya bukan penghalang
      if (hitL.gap < 0 && ground.surfaceHeight(sf, a.x, a.z) <= a.y + STEP) return
      const h = ground.surfaceHeight(sf, hitL.px - hitL.nx * 0.02, hitL.pz - hitL.nz * 0.02)
      if (h <= a.y + STEP) return
      const lx = hitL.px - hitL.nx * 0.6
      const lz = hitL.pz - hitL.nz * 0.6
      if (a.wantUp && h - a.y <= CLIMB.max && hitL.gap > -0.2 && Math.abs(ground.surfaceHeight(sf, lx, lz) - h) < 0.35 && colliders.isFree(lx, lz, RADIUS)) {
        a.climb = { t: 0, x0: a.x, y0: a.y, z0: a.z, hx: hitL.px + hitL.nx * 0.28, hz: hitL.pz + hitL.nz * 0.28, ex: hitL.px - hitL.nx * 0.12, ez: hitL.pz - hitL.nz * 0.12, x1: lx, y1: h, z1: lz, heading: Math.atan2(-hitL.nx, -hitL.nz) }
        a.swim = false
        a.path = null
        setClip(a, 'panjat', true)
        return
      }
      a.x += hitL.nx * (RADIUS - hitL.gap)
      a.z += hitL.nz * (RADIUS - hitL.gap)
    })
  }
  // memanjat: bergantung di tepi → menarik badan → melangkah ke dek (seperti pemain)
  const ease = t => t * t * (3 - 2 * t)
  function stepClimb(a, dt) {
    const c = a.climb
    c.t += dt
    const u = Math.min(1, c.t / CLIMB.time)
    const hang = Math.max(c.y0, c.y1 - 1.05)
    if (u < 0.35) {
      const k = ease(u / 0.35)
      a.x = c.x0 + (c.hx - c.x0) * k
      a.z = c.z0 + (c.hz - c.z0) * k
      a.y = c.y0 + (hang - c.y0) * k
    } else if (u < 0.72) {
      const k = ease((u - 0.35) / 0.37)
      a.x = c.hx + (c.ex - c.hx) * k
      a.z = c.hz + (c.ez - c.hz) * k
      a.y = hang + (c.y1 - 0.25 - hang) * k
    } else {
      const k = ease((u - 0.72) / 0.28)
      a.x = c.ex + (c.x1 - c.ex) * k
      a.z = c.ez + (c.z1 - c.ez) * k
      a.y = c.y1 - 0.25 + 0.25 * k
    }
    a.heading = turn(a.heading, c.heading, Math.min(1, dt * 12))
    if (u >= 1) {
      a.climb = null
      a.x = c.x1
      a.z = c.z1
      a.y = c.y1
      a.vy = 0
    }
  }
  const face = (a, x, z, dt, k = 7) => {
    a.heading = turn(a.heading, Math.atan2(x - a.x, z - a.z), Math.min(1, dt * k))
  }
  // perkiraan kecepatan sasaran (tvx, tvz) dari posisinya antar-frame, untuk memotong jalannya
  function track(a, tp, dt) {
    if (a.tpx !== null && dt > 0) {
      const k = 1 - Math.exp(-4 * dt)
      a.tvx += ((tp.x - a.tpx) / dt - a.tvx) * k
      a.tvz += ((tp.z - a.tpz) / dt - a.tvz) * k
      // sasaran berpindah seketika (mis. dikembalikan ke pantai): jangan percaya lonjakannya
      const sp = Math.hypot(a.tvx, a.tvz)
      if (sp > 8) {
        a.tvx *= 8 / sp
        a.tvz *= 8 / sp
      }
    }
    a.tpx = tp.x
    a.tpz = tp.z
  }

  // --- ronda: pasangan maju bersama di sepanjang ruas, berdampingan
  function zoneNext(sq, at) {
    const inZone = at.links.filter(n => edgeZone.get(edgeKey(at, n)) === sq.zone)
    const fwd = inZone.filter(n => n !== sq.from)
    const options = fwd.length ? fwd : inZone.length ? inZone : at.links
    return options[Math.floor(Math.random() * options.length)]
  }
  function stepSquad(sq, dt, player) {
    const active = sq.members.filter(a => a.state === 'ronda')
    if (!active.length) return
    const ux = (sq.to.x - sq.from.x) / sq.len
    const uz = (sq.to.z - sq.from.z) / sq.len
    // pemain menghalangi jalan: tunggu; terlalu lama → berbalik arah
    let blocked = false
    for (const a of active) if (Math.hypot(player.x - (a.x + ux * 0.9), player.z - (a.z + uz * 0.9)) < 0.95) blocked = true
    if (blocked) {
      sq.wait += dt
      if (sq.wait > 2.5) {
        ;[sq.from, sq.to] = [sq.to, sq.from]
        sq.s = sq.len - sq.s
        sq.wait = 0
      }
    } else sq.wait = 0
    if (sq.pause > 0) sq.pause -= dt
    else if (!blocked) {
      sq.s += SPEED.ronda * dt
      while (sq.s >= sq.len) {
        const at = sq.to
        const next = zoneNext(sq, at)
        sq.s -= sq.len
        sq.from = at
        sq.to = next
        sq.len = Math.max(0.1, Math.hypot(next.x - at.x, next.z - at.z))
        if (Math.random() < 0.1) sq.pause = 3 + Math.random() * 4
      }
    }
    const walking = sq.pause <= 0 && !blocked
    const vx = (sq.to.x - sq.from.x) / sq.len
    const vz = (sq.to.z - sq.from.z) / sq.len
    const t = Math.min(1, sq.s / sq.len)
    const cx = sq.from.x + (sq.to.x - sq.from.x) * t
    const cz = sq.from.z + (sq.to.z - sq.from.z) * t
    const width = sq.from.w.get(sq.to.id) ?? 4
    const lat = Math.min(0.75, Math.max(0.35, width / 2 - 0.6))
    const k = 1 - Math.exp(-5 * dt)
    for (const a of active) {
      const tx = cx - vz * lat * a.slot
      const tz = cz + vx * lat * a.slot
      if (a.init) {
        a.x = tx
        a.z = tz
        a.heading = Math.atan2(vx, vz)
        a.init = false
      }
      a.x += (tx - a.x) * k
      a.z += (tz - a.z) * k
      if (walking) a.heading = turn(a.heading, Math.atan2(vx, vz), Math.min(1, dt * 5))
      a.moved = walking ? SPEED.ronda : 0
    }
  }
  // titik tempat anggota pasangan bergabung kembali
  function squadPoint(sq, slot) {
    const vx = (sq.to.x - sq.from.x) / sq.len
    const vz = (sq.to.z - sq.from.z) / sq.len
    const t = Math.min(1, sq.s / sq.len)
    return { x: sq.from.x + (sq.to.x - sq.from.x) * t - vz * 0.6 * slot, z: sq.from.z + (sq.to.z - sq.from.z) * t + vx * 0.6 * slot }
  }

  // --- kejadian
  let onStrike = () => {} // fn(prajurit, sasaran, kerusakan) saat ayunan serangannya mengenai
  let onDown = () => {} // fn(prajurit) saat roboh

  function knockDown(a, from) {
    a.hp = 0
    a.state = 'roboh'
    a.order = null
    a.atk = null
    a.downT = 0
    a.path = null
    a.climb = null
    a.ride = null // dari perahu patroli: tercebur
    if (from) {
      const dx = a.x - from.x
      const dz = a.z - from.z
      const d = Math.hypot(dx, dz) || 1
      a.kx = (dx / d) * 3
      a.kz = (dz / d) * 3
    }
    setClip(a, 'die', true)
    onDown(a)
  }

  // kena pukulan / serangan: nyawa berkurang, berkedip, terpental & terhuyung sesaat
  function damage(a, amount, from, knock = 2.5) {
    if (a.state === 'roboh' || a.state === 'hilang') return
    a.hp -= amount
    a.flash = 0.15
    a.barT = 5
    a.stagger = 0.3
    a.atk = null
    a.climb = null // terlepas dari tepi dek
    if (from) {
      const dx = a.x - from.x
      const dz = a.z - from.z
      const d = Math.hypot(dx, dz) || 1
      a.kx = (dx / d) * knock
      a.kz = (dz / d) * knock
    }
    if (a.hp <= 0) knockDown(a, from)
  }

  // kembali bertugas (ke pos, atau bergabung dengan pasangannya)
  function release(a) {
    if (a.state === 'roboh' || a.state === 'hilang') return
    a.order = null
    a.atk = null
    a.path = null
    a.state = 'kembali'
  }

  function respawn(a, player) {
    let p
    if (a.kind === 'pos') p = a.home
    else {
      const partner = a.squad.members.find(m => m !== a && m.state === 'ronda')
      p = partner ? squadPoint(a.squad, a.slot) : { x: a.squad.from.x, z: a.squad.from.z }
    }
    // jangan muncul tepat di depan mata pemain
    if (Math.hypot(p.x - player.x, p.z - player.z) < 45) return false
    a.x = p.x
    a.z = p.z
    a.y = ground.surfaceAt(p.x, p.z)
    a.swim = false
    a.climb = null
    a.ride = null
    a.vy = 0
    a.hp = a.maxHp
    a.kx = a.kz = 0
    a.flash = a.barT = 0
    a.state = 'kembali'
    a.clip = 'idle'
    a.fade = 0
    a.t = 0
    return true
  }

  function updateAgent(a, dt, ctx) {
    // laju peronda diatur pasangannya (stepSquad, sebelum ini) — dulu ikut di-nol-kan di sini, jadi
    // peronda meluncur di jalan dalam pose diam
    if (a.state !== 'ronda') a.moved = 0
    if (a.flash > 0) a.flash = Math.max(0, a.flash - dt)
    if (a.barT > 0) a.barT -= dt
    if (a.atkCd > 0) a.atkCd -= dt
    if (a.state === 'hilang') {
      a.downT += dt
      if (a.downT > RESPAWN && !respawn(a, ctx.player)) a.downT = RESPAWN - 5
      return
    }
    if (a.state === 'roboh') {
      a.downT += dt
      const f = Math.exp(-6 * dt)
      a.x += a.kx * dt
      a.z += a.kz * dt
      a.kx *= f
      a.kz *= f
      if (a.downT > DOWN_TIME + SINK_TIME) {
        a.state = 'hilang'
        a.downT = 0
      }
      return
    }
    // terpental / terhuyung sesaat setelah terkena (di perahu: tetap di tempatnya)
    if (a.ride) a.kx = a.kz = 0
    else if (Math.abs(a.kx) + Math.abs(a.kz) > 0.05) {
      const nx = a.x + a.kx * dt
      const nz = a.z + a.kz * dt
      if (a.swim || a.wet || ground.surfaceAt(nx, nz) > -0.6) {
        a.x = nx
        a.z = nz
      }
      const f = Math.exp(-7 * dt)
      a.kx *= f
      a.kz *= f
    }
    if (a.climb) {
      stepClimb(a, dt)
      return
    }
    if (a.stagger > 0) {
      a.stagger -= dt
      return
    }
    const st = a.state
    if (st === 'jaga') {
      const h = a.home
      const dp = Math.hypot(ctx.player.x - a.x, ctx.player.z - a.z)
      if (dp < 5 && ctx.playerVisible) face(a, ctx.player.x, ctx.player.z, dt, 5)
      else a.heading = turn(a.heading, h.rot, Math.min(1, dt * 3))
      return
    }
    if (st === 'ronda') return // digerakkan pasangannya (stepSquad)
    if (a.ride) {
      // di perahu patroli: letaknya, arah perahu, dan kapan menyerang (attack) diatur
      // perahu-patroli.js; di sini ayunannya dijalankan dan sasarannya diawasi
      const tp = a.state === 'serang' && a.order ? ctx.targetPos(a.order.target) : null
      const d = tp ? Math.hypot(tp.x - a.x, tp.z - a.z) : Infinity
      if (a.ride.hop) a.heading = a.ride.heading
      else if (a.atk) swing(a, tp, d, dt, RIDE_REACH)
      else if (d < 20) face(a, tp.x, tp.z, dt, 6)
      else a.heading = turn(a.heading, a.ride.heading, Math.min(1, dt * 4))
      return
    }
    if (st === 'kembali') {
      const p = a.kind === 'pos' ? a.home : squadPoint(a.squad, a.slot)
      // dari air: berenang lurus ke darat / dek (memanjat), lalu jalur darat
      const wet = a.swim || ISLAND.seaLevel - ground.heightAt(a.x, a.z) > 0.6
      if (moveToward(a, p.x, p.z, SPEED.kembali, 0.4, dt, wet, true))
        if (a.kind === 'pos') a.state = 'jaga'
        else {
          a.state = 'ronda'
          a.init = false
        }

      return
    }
    const o = a.order
    if (st === 'naik') {
      // ke tepi dek di samping perahu patroli (perahu-patroli.js menaikkannya); yang sedang di air
      // berenang ke sana lalu memanjat dek
      if (Math.hypot(o.target.x - a.x, o.target.z - a.z) < 1.2 || moveToward(a, o.target.x, o.target.z, SPEED.kejar, 0.5, dt, true, true)) a.atBoat = true
      return
    }
    const tp = o ? ctx.targetPos(o.target) : null
    if (!tp) {
      release(a)
      return
    }
    if (st === 'tanya') {
      // berdiri `near` m di depan sasaran, menghadapnya
      const ang = Math.atan2(a.x - tp.x, a.z - tp.z)
      const r = o.near ?? 2
      const sx = tp.x + Math.sin(ang) * r
      const sz = tp.z + Math.cos(ang) * r
      if (!moveToward(a, sx, sz, SPEED.kembali, 0.35, dt)) return
      face(a, tp.x, tp.z, dt)
      return
    }
    if (st === 'serang') {
      const T = types[a.type]
      const dx = tp.x - a.x
      const dz = tp.z - a.z
      const d = Math.hypot(dx, dz)
      track(a, tp, dt)
      if (a.atk) {
        swing(a, tp, d, dt)
        return
      }
      const want = T.reach * 0.8
      if (d > want + 0.15) {
        // masih jauh: berlari memotong jalan sasaran — menuju perkiraan posisinya sebentar lagi —
        // jadi prajurit di depannya menghadang, bukan membuntuti dari belakang. Sasaran yang lari
        // dikejar penuh sampai terjangkau; yang diam didekati sambil berlari kecil
        const ahead = d > 6 ? Math.min(2.5, d / SPEED.kejar) : 0
        const fast = d > 6 || Math.hypot(a.tvx, a.tvz) > 2
        // sasaran di air: ikut terjun & berenang; sasaran di atas dek: dek dipanjat
        moveToward(a, tp.x + a.tvx * ahead, tp.z + a.tvz * ahead, fast ? SPEED.kejar : SPEED.dekati, want, dt, true, (tp.y ?? a.y) > a.y + STEP)
      } else {
        face(a, tp.x, tp.z, dt, 10)
        // terlalu dekat: mundur sedikit
        if (d < 0.75 && d > 1e-3) {
          a.x -= (dx / d) * (0.75 - d)
          a.z -= (dz / d) * (0.75 - d)
        }
        if (a.atkCd <= 0) {
          a.atk = { t: 0, hit: false }
          a.atkCd = 1.8 + Math.random() * 0.8
          setClip(a, 'attack', true)
        }
      }
    }
  }

  // ayunan serangan yang sedang berjalan: kena di tengah ayunan bila sasaran masih dalam jangkauan.
  // onStrike bisa langsung mengubah keadaan prajurit ini (mis. pemain roboh → semua penyerang
  // ditarik mundur), jadi ayunannya dipegang di variabel sendiri
  // atk.release (lemparan dari perahu patroli) dipanggil di tengah ayunan, menggantikan tusukan
  function swing(a, tp, d, dt, extra = 0.5) {
    const { atk } = a
    if (tp) face(a, tp.x, tp.z, dt, 10)
    atk.t += dt
    if (!atk.hit && atk.t >= ATTACK.hit) {
      atk.hit = true
      if (atk.release) atk.release(a)
      else if (tp && d <= types[a.type].reach + extra) onStrike(a, a.order.target, types[a.type].damage)
    }
    if (atk.t >= ATTACK.dur && a.atk === atk) a.atk = null
  }

  // --- tulis instance prajurit yang terlihat
  const frustum = new THREE.Frustum()
  const projView = new THREE.Matrix4()
  const sphere = new THREE.Sphere(new THREE.Vector3(), 1.7)
  const p = new THREE.Vector3()
  const sv = new THREE.Vector3(SCALE, SCALE, SCALE)
  const tmpVel = { x: 0, z: 0 }
  let visible = 0

  function update(dt, ctx) {
    // ctx: { camera, focus, range, player: { x, z }, playerVisible, targetPos(sasaran) → { x, z } | null }
    pathBudget = 2
    clock += dt
    for (const sq of squads) stepSquad(sq, dt, ctx.player)
    for (const a of agents) updateAgent(a, dt, ctx)
    // tabrakan: prajurit yang bergerak bebas tidak menembus bangunan, sesamanya, pemain, dan sisi dek;
    // lalu tinggi kakinya (menapak / jatuh / berenang). Peronda & penjaga pos selalu di jalan / posnya
    for (const a of agents) {
      if (a.state === 'hilang') continue
      if (a.state === 'ronda' || a.state === 'jaga') {
        a.y = ground.surfaceAt(a.x, a.z)
        a.swim = false
        continue
      }
      if (a.ride) continue // di perahu patroli: letaknya diatur perahunya
      if (a.state === 'roboh' || a.climb) {
        if (!a.climb) settle(a, dt)
        continue
      }
      for (const b of agents) {
        if (b === a || b.state === 'hilang' || b.state === 'roboh') continue
        const dx = a.x - b.x
        const dz = a.z - b.z
        const d2 = dx * dx + dz * dz
        if (d2 > 0.49 || d2 < 1e-8) continue
        const d = Math.sqrt(d2)
        a.x += (dx / d) * (0.7 - d) * 0.5
        a.z += (dz / d) * (0.7 - d) * 0.5
      }
      const px = a.x - ctx.player.x
      const pz = a.z - ctx.player.z
      const pd = Math.hypot(px, pz)
      if (pd < 0.72 && pd > 1e-4) {
        a.x = ctx.player.x + (px / pd) * 0.72
        a.z = ctx.player.z + (pz / pd) * 0.72
      }
      tmpVel.x = tmpVel.z = 0
      colliders.resolve(a, RADIUS, tmpVel)
      ledges(a)
      if (!a.climb) settle(a, dt)
    }

    // animasi menurut keadaan
    for (const a of agents) {
      if (a.state === 'hilang') continue
      if (a.state !== 'roboh' && !a.atk && !a.climb && !a.ride?.hop && a.clip !== 'stop' && a.clip !== 'yes')
        if (a.swim) setClip(a, 'walk') // menendang air, senjata tetap di tangan
        else if (a.moved > 2.4) setClip(a, 'sprint')
        else if (a.moved > 0.05) setClip(a, 'walk')
        else setClip(a, 'idle')
      else if ((a.clip === 'stop' || a.clip === 'yes') && clipDone(a)) setClip(a, 'idle')
      a.animSpeed = a.swim && a.clip === 'walk' ? 0.55 + 0.2 * Math.min(1, a.moved / SWIM.speed)
        : a.clip === 'walk' ? a.moved / WALK_ANIM : a.clip === 'sprint' ? a.moved / RUN_ANIM : 1
      a.t += dt * a.animSpeed
      if (a.fade > 0) {
        a.fade = Math.max(0, a.fade - dt)
        a.prevT += dt
      }
    }

    // gambar
    const { camera, focus } = ctx
    const r2 = (ctx.range ?? 110) ** 2
    camera.updateMatrixWorld()
    projView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projView)
    for (const m of meshes) m.mesh.count = 0
    visible = 0
    let nb = 0
    for (const a of agents) {
      if (a.state === 'hilang') continue
      const dx = a.x - focus.x
      const dz = a.z - focus.z
      if (dx * dx + dz * dz > r2) continue
      let { y } = a
      if (a.state === 'roboh' && a.downT > DOWN_TIME) y -= ((a.downT - DOWN_TIME) / SINK_TIME) * 0.9
      sphere.center.set(a.x, y + 0.8, a.z)
      if (!frustum.intersectsSphere(sphere)) continue
      const M = meshes[a.type]
      const i = M.mesh.count++
      p.set(a.x, y, a.z)
      _q.setFromAxisAngle(Y, a.heading)
      M.mesh.setMatrixAt(i, _m.compose(p, _q, sv))
      const A = M.animA.array
      frameOf(M.table[a.clip] || M.table.idle, a.t, A, i * 4)
      A[i * 4 + 3] = a.fade > 0 ? a.fade / FADE : 0
      if (a.fade > 0) frameOf(M.table[a.prev] || M.table.idle, a.prevT, M.animB.array, i * 4)
      M.flash.array[i] = a.flash > 0 ? (a.flash / 0.15) * 0.75 : 0
      visible++
      // bar nyawa
      if (a.barT > 0 && a.state !== 'roboh' && nb < bars.length && dx * dx + dz * dz < 3600) {
        const b = bars[nb++]
        b.g.visible = true
        b.g.position.set(a.x, y + 2.05, a.z)
        b.g.quaternion.copy(camera.quaternion)
        const f = Math.max(0, a.hp / a.maxHp)
        b.fill.scale.set(f, 0.13, 1)
        b.fill.position.x = -(1 - f) / 2
      }
    }
    for (let k = nb; k < bars.length; k++) bars[k].g.visible = false
    for (const m of meshes) {
      if (!m.mesh.count) continue
      m.mesh.instanceMatrix.needsUpdate = true
      m.animA.needsUpdate = true
      m.animB.needsUpdate = true
      m.flash.needsUpdate = true
    }
  }

  const alive = a => a.state !== 'roboh' && a.state !== 'hilang'

  return {
    object: group,
    list: agents,
    squads,
    routes,
    types,
    stats() {
      const zonesOut = {}
      for (const sq of squads) zonesOut[sq.zone] = (zonesOut[sq.zone] || 0) + sq.members.length
      return {
        total: agents.length,
        pos: agents.filter(a => a.kind === 'pos').length,
        peronda: agents.filter(a => a.kind === 'ronda').length,
        wilayah: zonesOut,
        siaga: agents.filter(a => alive(a)).length,
        roboh: agents.filter(a => !alive(a)).length,
        bertugas: agents.filter(a => a.state === 'ronda' || a.state === 'jaga').length,
        visible,
      }
    },
    update,
    alive,
    onStrike(fn) {
      onStrike = fn
    },
    onDown(fn) {
      onDown = fn
    },
    // fn(x, z, besar, kuat): prajurit terjun / berenang (riak air)
    onWater(fn) {
      onWater = fn
    },
    // perintah: { do: 'tanya' | 'serang', target, near? }
    command(a, order) {
      if (!alive(a)) return
      if (a.state !== order.do || a.order?.target !== order.target) {
        a.tpx = a.tpz = null
        a.tvx = a.tvz = 0
      }
      a.order = order
      a.state = order.do
      if (order.do !== 'serang') a.atk = null
    },
    release,
    // naik perahu patroli: ride = { boat, seat } — letaknya lalu diatur perahu (ride diisi
    // perahu-patroli.js tiap frame); turun = unboard ke (x, y, z): ke dek, atau terjun ke air
    board(a, ride) {
      a.ride = ride
      a.atBoat = false
      a.path = null
      a.swim = false
      a.climb = null
      a.vy = 0
    },
    unboard(a, x, y, z) {
      a.ride = null
      a.x = x
      a.z = z
      a.y = y
      a.vy = 0
      a.kx = a.kz = 0
    },
    // awak perahu patroli menyerang: tusukan (release = null, kena bila sasaran terjangkau) atau
    // lemparan (release(prajurit) dipanggil di tengah ayunan); cooldown = detik sampai serangan berikutnya
    attack(a, release = null, cooldown = 2) {
      if (!alive(a) || a.atk) return false
      a.atk = { t: 0, hit: false, release }
      a.atkCd = cooldown
      setClip(a, 'attack', true)
      return true
    },
    gesture(a, clip) {
      if (alive(a) && !a.atk) setClip(a, clip, true)
    },
    // prajurit hidup terdekat dari (x, z) dalam `max` m yang lolos filter(a)
    nearest(x, z, max, filter = () => true) {
      let best = null
      let bestD = max
      for (const a of agents) {
        if (!alive(a) || !filter(a)) continue
        const d = Math.hypot(a.x - x, a.z - z)
        if (d < bestD) {
          best = a
          bestD = d
        }
      }
      return best
    },
    // pukulan pemain: lingkaran (x, z, r) → prajurit yang kena (nyawa berkurang, terpental)
    hit(shape, amount, knock, from) {
      const out = []
      for (const a of agents) {
        if (!alive(a)) continue
        if (Math.hypot(a.x - shape.x, a.z - shape.z) > shape.r + RADIUS) continue
        out.push(a)
        damage(a, amount, from, knock)
      }
      return out
    },
    damage,
    knockDown,
    // dorong pemain keluar dari badan prajurit
    pushOut(pos, radius = 0.35) {
      for (const a of agents) {
        if (!alive(a)) continue
        const dx = pos.x - a.x
        const dz = pos.z - a.z
        const min = radius + RADIUS
        const d2 = dx * dx + dz * dz
        if (d2 >= min * min || d2 < 1e-8) continue
        const d = Math.sqrt(d2)
        pos.x = a.x + (dx / d) * min
        pos.z = a.z + (dz / d) * min
      }
    },
    // shader disiapkan saat loading, bukan saat prajurit pertama kali terlihat (menyusun shader
    // di HP bisa ratusan milidetik): satu prajurit tiap jenis di `pos` untuk satu kali render;
    // null = kembalikan
    warmUp(pos) {
      for (const m of meshes) {
        if (!pos) {
          m.mesh.count = 0
          continue
        }
        p.set(pos.x, pos.y, pos.z)
        m.mesh.setMatrixAt(0, _m.compose(p, _q.identity(), sv))
        m.mesh.count = 1
        m.mesh.instanceMatrix.needsUpdate = true
      }
    },
    // kembalikan semua prajurit ke tugasnya, utuh (untuk pengujian)
    resetAll() {
      for (const a of agents) {
        a.hp = a.maxHp
        a.flash = a.barT = a.stagger = 0
        a.order = null
        a.atk = null
        a.path = null
        if (a.kind === 'pos') {
          a.x = a.home.x
          a.z = a.home.z
          a.state = 'jaga'
        } else {
          const q = squadPoint(a.squad, a.slot)
          a.x = q.x
          a.z = q.z
          a.state = 'ronda'
        }
        a.y = ground.surfaceAt(a.x, a.z)
        a.swim = false
        a.climb = null
        a.vy = 0
        setClip(a, 'idle', true)
        a.fade = 0
      }
    },
  }
}
