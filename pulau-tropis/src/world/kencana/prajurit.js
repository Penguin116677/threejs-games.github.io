import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'
import { FPS, bakeRig, rigGeometry, bakedMatrix, attach, toBufferGeometry, boneTexture, animate, frameOf } from './rig.js'
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
// Siapa yang dicegat, ditanyai, atau dilawan diputuskan keamanan.js lewat perintah (order).
// Gambar: rangka dipanggang (rig.js) — satu InstancedMesh per jenis seragam.

const SCALE = 2.3 // sama dengan prajurit pemain
const RADIUS = 0.35
const WALK_ANIM = 1.4 // m/s yang cocok dengan klip walk pada kecepatan 1×
const RUN_ANIM = 3.6 // … klip sprint
const FADE = 0.2 // detik peralihan antar animasi
const SPEED = { ronda: 1.15, kembali: 1.6, lari: 4.0, kejar: 4.4 }
const DOWN_TIME = 9 // detik terbaring setelah roboh
const SINK_TIME = 1
const RESPAWN = 30 // detik menghilang sebelum kembali bertugas
const ATTACK = { hit: 0.24, dur: 0.42 } // detik: saat kena & lama klip serang
const PATROL = { rendah: 40, sedang: 64, tinggi: 96 } // peronda (berpasangan)
// porsi pasangan peronda per wilayah tugas (paling sedikit satu pasangan per wilayah)
const ZONE_SHARE = { kota: 0.28, wira: 0.22, kencana: 0.2, agung: 0.08, sawah: 0.08, nelayan: 0.07, pura: 0.07 }

// jenis seragam: jaga (penjaga pos, jambul merah, tombak), tombak (peronda, jambul biru),
// pedang (peronda, jambul hijau, pedang + perisai). reach = jangkauan serang (m)
export const TYPES = [
  { id: 'jaga', weapon: 'tombak', dye: null, hp: 10, reach: 1.9, damage: 4 },
  { id: 'tombak', weapon: 'tombak', dye: [5, 4], hp: 8, reach: 1.9, damage: 4 },
  { id: 'pedang', weapon: 'pedang', dye: [1, 4], hp: 9, reach: 1.45, damage: 5 },
]

// kotak warna palet Kenney Mini Arena (8 × 8)
const cell = (i, j) => [(i + 0.5) / 8, (j + 0.5) / 8]
const UV = { kayu: cell(6, 6), besi: cell(3, 6), emas: cell(2, 4) }

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
    no: { clip: 'emote-no', hold: arm, loop: false },
    stop: { clip: 'interact-left', hold: weapon === 'tombak' ? spear : { 5: 'holding-right' }, loop: false },
  }
}

const _m = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const Y = new THREE.Vector3(0, 1, 0)

// ganti kotak warna merah (jambul & sabuk) dengan warna lain
function dye(data, [col, row]) {
  for (let i = 0; i < data.uv.length; i += 2) {
    const ci = Math.floor(data.uv[i] * 8)
    const cj = Math.floor(data.uv[i + 1] * 8)
    if (ci === 4 && (cj === 4 || cj === 5)) {
      data.uv[i] = (col + 0.5) / 8
      data.uv[i + 1] = (row + (cj - 4) + 0.5) / 8
    }
  }
}

function buildTypes(soldier, shieldRect, rows) {
  const clone = cloneSkinned(soldier.model)
  const skinned = []
  clone.traverse(o => {
    if (o.isSkinnedMesh) skinned.push(o)
  })
  const { map } = skinned[0].material
  let swordMesh = null
  soldier.model.userData.sword?.traverse(o => {
    if (!swordMesh && o.isMesh) swordMesh = o
  })
  const handAt = (skeleton, row, j) => new THREE.Vector3(j === 5 ? -0.265 : 0.265, 0, 0.068)
    .applyMatrix4(skeleton.boneInverses[j].clone().invert())
    .applyMatrix4(bakedMatrix(rows, row, j))
  return TYPES.map(T => {
    const rig = bakeRig(clone, soldier.clips, rows, specsFor(T.weapon))
    const { row } = rig.table.idle
    const data = rigGeometry(skinned)
    if (T.dye) dye(data, T.dye)
    const h = handAt(rig.skeleton, row, 5)
    if (T.weapon === 'tombak') {
      // tombak tegak di tangan kanan, pangkalnya hampir di tanah
      const butt = Math.max(0.02, h.y - 0.42)
      attach(data, new THREE.CylinderGeometry(0.017, 0.017, h.y + 1.05 - butt, 5).translate(h.x, (butt + h.y + 1.05) / 2, h.z), rows, row, 5, UV.kayu)
      attach(data, new THREE.ConeGeometry(0.045, 0.18, 4).translate(h.x, h.y + 1.14, h.z), rows, row, 5, UV.besi)
      attach(data, new THREE.CylinderGeometry(0.03, 0.03, 0.04, 5).translate(h.x, h.y + 1.04, h.z), rows, row, 5, UV.emas)
    } else {
      // pedang di tangan kanan (bilah ke atas, condong ke depan) + perisai di tangan kiri
      if (swordMesh) {
        const g = swordMesh.geometry.clone()
        g.applyMatrix4(_m.makeRotationX(Math.PI - 0.25))
        g.translate(h.x, h.y + 0.02, h.z)
        attach(data, g, rows, row, 5, null)
      }
      const l = handAt(rig.skeleton, row, 4)
      const s = shieldRect ? shieldRect.clone().scale(1.3, 1.3, 1.3) : new THREE.BoxGeometry(0.3, 0.38, 0.04)
      s.translate(l.x + 0.02, l.y - 0.18, l.z + 0.07)
      attach(data, s, rows, row, 4, shieldRect ? null : UV.kayu)
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

// soldier: aset prajurit pemain ({ model, clips }); shieldRect: geometri perisai (bala.glb) atau null;
// plan: rencana kerajaan; spots: titik orang tetap (dipakai yang role 'penjaga')
export function createSoldiers({ ground, colliders, nav, plan, spots, quality, soldier, shieldRect }) {
  const group = new THREE.Group()
  group.name = 'prajurit-bertugas'
  const rows = []
  const types = buildTypes(soldier, shieldRect, rows)
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
      state: 'jaga', order: null, arrived: false,
      hp: T.hp, maxHp: T.hp, flash: 0, kx: 0, kz: 0, stagger: 0, barT: 0,
      atkCd: Math.random(), atk: null,
      clip: 'idle', t: Math.random() * 2, prev: null, prevT: 0, fade: 0, animSpeed: 1,
      path: null, navT: 0, goalX: 0, goalZ: 0, moved: 0, downT: 0, waitT: 0,
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

  // --- gerak bebas (mencegat, mengejar, kembali): garis lurus bila lapang, jalur navgrid bila
  // terhalang. Pencarian jalur dibatasi beberapa per frame (A* di dunia besar bisa mahal).
  let pathBudget = 0
  function moveToward(a, tx, tz, speed, near, dt) {
    const dx = tx - a.x
    const dz = tz - a.z
    const d = Math.hypot(dx, dz)
    if (d <= near) {
      a.path = null
      return true
    }
    a.navT -= dt
    if (a.navT <= 0) {
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
    }
    const ux = wx - a.x
    const uz = wz - a.z
    const ul = Math.hypot(ux, uz) || 1
    const step = Math.min(speed * dt, Math.max(0, d - near) + 0.01)
    const nx = a.x + (ux / ul) * step
    const nz = a.z + (uz / ul) * step
    // jangan masuk laut
    if (ground.surfaceAt(nx, nz) > -0.6) {
      a.x = nx
      a.z = nz
    }
    a.heading = turn(a.heading, Math.atan2(ux, uz), Math.min(1, dt * 9))
    a.moved = speed
    return false
  }
  const face = (a, x, z, dt, k = 7) => {
    a.heading = turn(a.heading, Math.atan2(x - a.x, z - a.z), Math.min(1, dt * k))
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
    a.arrived = false
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
    a.moved = 0
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
    // terpental / terhuyung sesaat setelah terkena
    if (Math.abs(a.kx) + Math.abs(a.kz) > 0.05) {
      const nx = a.x + a.kx * dt
      const nz = a.z + a.kz * dt
      if (ground.surfaceAt(nx, nz) > -0.6) {
        a.x = nx
        a.z = nz
      }
      const f = Math.exp(-7 * dt)
      a.kx *= f
      a.kz *= f
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
    if (st === 'kembali') {
      const p = a.kind === 'pos' ? a.home : squadPoint(a.squad, a.slot)
      if (moveToward(a, p.x, p.z, SPEED.kembali, 0.4, dt))
        if (a.kind === 'pos') a.state = 'jaga'
        else {
          a.state = 'ronda'
          a.init = false
        }

      return
    }
    const o = a.order
    const tp = o ? ctx.targetPos(o.target) : null
    if (!tp) {
      release(a)
      return
    }
    if (st === 'cegat') {
      // berlari ke sasaran, berhenti di depannya
      a.arrived = moveToward(a, tp.x, tp.z, SPEED.lari, o.near ?? 2.3, dt)
      if (a.arrived) face(a, tp.x, tp.z, dt)
      return
    }
    if (st === 'tanya' || st === 'awasi') {
      // berdiri di titik berjarak `near` dari sasaran (sedikit ke samping untuk yang mengawasi)
      const ang = Math.atan2(a.x - tp.x, a.z - tp.z) + (st === 'awasi' ? (o.side ?? 0.9) : 0)
      const r = o.near ?? (st === 'tanya' ? 2 : 2.6)
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
      if (a.atk) {
        // ayunan sedang berjalan: kena di tengah ayunan bila sasaran masih dalam jangkauan.
        // onStrike bisa langsung mengubah keadaan prajurit ini (mis. pemain roboh → semua
        // penyerang ditarik mundur), jadi ayunannya dipegang di variabel sendiri
        const { atk } = a
        face(a, tp.x, tp.z, dt, 10)
        atk.t += dt
        if (!atk.hit && atk.t >= ATTACK.hit) {
          atk.hit = true
          if (d <= T.reach + 0.5) onStrike(a, o.target, T.damage)
        }
        if (atk.t >= ATTACK.dur && a.atk === atk) a.atk = null
        return
      }
      const want = T.reach * 0.8
      if (d > want + 0.15) moveToward(a, tp.x, tp.z, d > 6 ? SPEED.kejar : SPEED.kembali, want, dt)
      else {
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
    for (const sq of squads) stepSquad(sq, dt, ctx.player)
    for (const a of agents) updateAgent(a, dt, ctx)
    // tabrakan: prajurit yang bergerak bebas tidak menembus bangunan, sesamanya, dan pemain
    for (const a of agents) {
      if (a.state === 'hilang' || a.state === 'roboh' || a.state === 'ronda' || a.state === 'jaga') continue
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
    }

    // animasi menurut keadaan
    for (const a of agents) {
      if (a.state === 'hilang') continue
      if (a.state !== 'roboh' && !a.atk && a.clip !== 'stop' && a.clip !== 'yes' && a.clip !== 'no')
        if (a.moved > 2.4) setClip(a, 'sprint')
        else if (a.moved > 0.05) setClip(a, 'walk')
        else setClip(a, 'idle')
      else if ((a.clip === 'stop' || a.clip === 'yes' || a.clip === 'no') && clipDone(a)) setClip(a, 'idle')
      a.animSpeed = a.clip === 'walk' ? a.moved / WALK_ANIM : a.clip === 'sprint' ? a.moved / RUN_ANIM : 1
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
      a.y = ground.surfaceAt(a.x, a.z)
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
    // perintah: { do: 'cegat' | 'tanya' | 'awasi' | 'serang', target, near?, side? }
    command(a, order) {
      if (!alive(a)) return
      if (a.state !== order.do || a.order?.target !== order.target) a.arrived = false
      a.order = order
      a.state = order.do
      if (order.do !== 'serang') a.atk = null
    },
    release,
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
        setClip(a, 'idle', true)
        a.fade = 0
      }
    },
  }
}
