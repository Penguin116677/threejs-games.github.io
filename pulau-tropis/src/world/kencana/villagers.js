import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'
import { bakeRig, rigGeometry, bakedMatrix, attach, toBufferGeometry, boneTexture, animate, frameOf as clipFrame } from './rig.js'

// Penduduk Kerajaan Kencana: ratusan orang berjalan di jalan-jalan kota, berdagang di pasar,
// bertani, menjaga gerbang. Model: Kenney "Mini Characters" (CC0, penduduk.glb) + prajurit
// Kenney "Mini Arena" (penjaga, membawa tombak). Supaya ringan di HP:
// - animasi rangka (7 tulang) DIPANGGANG sekali ke tekstur (rig.js), jadi semua orang sejenis
//   digambar dalam SATU draw call (InstancedMesh), tanpa SkinnedMesh.
// - hanya orang di sekitar kamera yang ditulis ke buffer instance (yang jauh tidak digambar).
// Penduduk berjalan dari simpul ke simpul jaringan jalan (routes.js), sesekali berhenti, dan
// menoleh + melambai saat prajurit mendekat.

const SCALE = 2.3 // sama dengan prajurit pemain
const CLIPS = { idle: 'idle', walk: 'walk', sit: 'sit', interact: 'interact-right', pickup: 'pick-up', wave: 'emote-yes' }
const SPECS = Object.fromEntries(Object.entries(CLIPS).map(([key, clip]) => [key, { clip, loop: key !== 'wave' }]))
const WALK_ANIM_SPEED = 1.4 // m/s yang cocok dengan klip walk pada kecepatan 1×
const FADE = 0.25 // detik peralihan antar animasi
const NEAR = 2.6 // m: menoleh & melambai ke prajurit
const BODY = 0.35
const TYPES = ['male-a', 'male-b', 'male-e', 'male-f', 'female-a', 'female-b', 'female-c', 'female-f']

// uv blok warna di colormap Kenney (tata letak sama di Mini Characters & Mini Arena)
const UV = { emas: [0.3125, 0.5625], kayu: [0.8125, 0.8125], besi: [0.4375, 0.8125] }

const _m = new THREE.Matrix4()

// villagerGltf: hasil GLTFLoader untuk penduduk.glb; soldier: aset prajurit pemain ({ model, clips })
export function createVillagers({ ground, routes, spots, quality, villagerGltf, soldier }) {
  const group = new THREE.Group()
  group.name = 'penduduk'
  const rows = []

  // --- rangka & geometri penduduk
  const villagerRig = bakeRig(villagerGltf.scene, villagerGltf.animations, rows, SPECS)
  const meshesByName = {}
  villagerGltf.scene.traverse(o => {
    if (o.isSkinnedMesh) meshesByName[o.name.replace('character-', '')] = o
  })
  const colormap = Object.values(meshesByName)[0].material.map
  const types = []
  for (const name of TYPES) {
    const mesh = meshesByName[name]
    if (!mesh) continue
    types.push({ name, data: rigGeometry([mesh]), table: villagerRig.table, map: colormap })
  }
  // raja: pria berjanggut + mahkota emas di ubun-ubun (tulang kepala = 6), pose duduk
  const king = rigGeometry([meshesByName['male-b']])
  let top = 0
  for (let i = 0; i < king.bone.length; i++) if (king.bone[i] === 6) top = Math.max(top, king.pos[i * 3 + 1])
  const sitRow = villagerRig.table.sit.row
  const headSit = bakedMatrix(rows, sitRow, 6)
  const crownAt = new THREE.Vector3(0, top - 0.015, 0.02).applyMatrix4(headSit)
  attach(king, new THREE.CylinderGeometry(0.17, 0.15, 0.07, 10, 1, true).translate(crownAt.x, crownAt.y + 0.035, crownAt.z), rows, sitRow, 6, UV.emas)
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    attach(king, new THREE.ConeGeometry(0.035, 0.09, 4).translate(crownAt.x + Math.cos(a) * 0.16, crownAt.y + 0.11, crownAt.z + Math.sin(a) * 0.16), rows, sitRow, 6, UV.emas)
  }
  types.push({ name: 'raja', data: king, table: villagerRig.table, map: colormap })

  // --- penjaga: prajurit Mini Arena + tombak di tangan kanan (tulang 5)
  if (soldier) {
    const clone = cloneSkinned(soldier.model)
    const soldierRig = bakeRig(clone, soldier.clips, rows, SPECS)
    const parts = []
    clone.traverse(o => {
      if (o.isSkinnedMesh) parts.push(o)
    })
    const data = rigGeometry(parts)
    // tombak tegak di genggaman tangan kanan saat berdiri diam (pose idle bingkai pertama):
    // tangan = ±(−0,265, 0, 0,07) di ruang tulang lengan kanan (sama dengan pedang pemain)
    const idleRow = soldierRig.table.idle.row
    const hand = new THREE.Vector3(-0.265, 0, 0.068)
      .applyMatrix4(soldierRig.skeleton.boneInverses[5].clone().invert())
      .applyMatrix4(bakedMatrix(rows, idleRow, 5))
    attach(data, new THREE.CylinderGeometry(0.016, 0.016, 1.3, 5).translate(hand.x, hand.y + 0.25, hand.z), rows, idleRow, 5, UV.kayu)
    attach(data, new THREE.ConeGeometry(0.04, 0.16, 4).translate(hand.x, hand.y + 0.98, hand.z), rows, idleRow, 5, UV.besi)
    types.push({ name: 'prajurit', data, table: soldierRig.table, map: parts[0].material.map, tint: new THREE.Color(1, 0.86, 0.68) })
  }

  // --- tekstur tulang
  const bones = boneTexture(rows, 7)

  // --- orang-orang
  const agents = []
  const typeIndex = name => types.findIndex(t => t.name === name)
  const villagerTypes = TYPES.map(typeIndex).filter(i => i >= 0)
  const randomType = () => villagerTypes[Math.floor(Math.random() * villagerTypes.length)]
  const ROLE = { penjaga: 'prajurit', raja: 'raja', pendeta: 'male-e' }
  for (const s of spots) {
    let type = ROLE[s.role] ? typeIndex(ROLE[s.role]) : randomType()
    if (type < 0) type = randomType()
    agents.push({
      type, fixed: true, role: s.role, x: s.x, z: s.z, y: s.y ?? null, heading: s.rot, homeHeading: s.rot,
      anim: s.anim, clip: s.anim, t: Math.random() * 3, prev: null, prevT: 0, fade: 0,
    })
  }
  // pejalan kaki di jaringan jalan (sisi kota lebih ramai)
  const walkers = { rendah: 120, sedang: 220, tinggi: 320 }[quality.level] ?? 220
  const nodes = routes.nodes.filter(n => n.links.length)
  const edgeList = []
  for (const n of nodes) for (const m of n.links) if (n.id < m.id) edgeList.push([n, m, Math.hypot(m.x - n.x, m.z - n.z)])
  const weight = ([a, b, len]) => len * (Math.max(a.x, b.x) < -415 && Math.max(a.z, b.z) < 145 && Math.min(a.z, b.z) > -65 && Math.min(a.x, b.x) > -705 ? 3 : 1)
  const totalW = edgeList.reduce((s, e) => s + weight(e), 0)
  for (let i = 0; i < walkers && edgeList.length; i++) {
    let r = Math.random() * totalW
    let e = edgeList[0]
    for (const cand of edgeList) {
      r -= weight(cand)
      if (r <= 0) {
        e = cand
        break
      }
    }
    const [a, b, len] = Math.random() < 0.5 ? e : [e[1], e[0], e[2]]
    agents.push({
      type: randomType(), fixed: false, from: a, to: b, len, s: Math.random() * len, side: Math.random() < 0.5 ? -1 : 1,
      lat: 0.6 + Math.random() * 1.4, speed: 0.95 + Math.random() * 0.55, pause: 0, x: a.x, z: a.z, y: null, heading: 0,
      clip: 'walk', anim: 'walk', t: Math.random(), prev: null, prevT: 0, fade: 0, init: true,
    })
  }

  // --- InstancedMesh per jenis orang
  const perType = types.map(() => 0)
  for (const a of agents) perType[a.type]++
  const meshes = types.map((t, i) => {
    const geo = toBufferGeometry(t.data)
    const cap = Math.max(1, perType[i])
    const animA = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    const animB = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('aAnimA', animA)
    geo.setAttribute('aAnimB', animB)
    const mat = new THREE.MeshLambertMaterial({ map: t.map })
    mat.onBeforeCompile = shader => animate(shader, bones)
    const mesh = new THREE.InstancedMesh(geo, mat, cap)
    mesh.name = `penduduk-${t.name}`
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false // dipilah sendiri per orang
    mesh.castShadow = quality.shadows
    mesh.receiveShadow = quality.shadows
    const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking })
    depth.onBeforeCompile = shader => animate(shader, bones)
    mesh.customDepthMaterial = depth
    if (t.tint) for (let k = 0; k < cap; k++) mesh.setColorAt(k, t.tint)
    mesh.count = 0
    group.add(mesh)
    return { mesh, animA, animB, table: t.table }
  })

  // --- animasi tiap orang: klip sekarang + klip sebelumnya yang memudar
  function setClip(a, clip) {
    if (a.clip === clip) return
    a.prev = a.clip
    a.prevT = a.t
    a.fade = FADE
    a.clip = clip
    a.t = 0
  }
  const frameOf = (table, clip, t, out, o) => clipFrame(table[clip] || table.idle, t, out, o)

  // --- gerak
  const turn = (h, want, k) => h + Math.atan2(Math.sin(want - h), Math.cos(want - h)) * k
  function stepWalker(a, dt, player) {
    const dxp = player.x - a.x
    const dzp = player.z - a.z
    const dp = Math.hypot(dxp, dzp)
    // prajurit dekat: berhenti, menoleh, melambai sekali
    if (dp < NEAR) {
      if (!a.greeted) {
        a.greeted = true
        setClip(a, 'wave')
      } else if (a.clip === 'wave' && a.t > 0.7) setClip(a, 'idle')
      a.heading = turn(a.heading, Math.atan2(dxp, dzp), Math.min(1, dt * 6))
      return
    }
    if (dp > NEAR + 2.5) a.greeted = false
    if (a.pause > 0) {
      a.pause -= dt
      setClip(a, 'idle')
      return
    }
    setClip(a, 'walk')
    a.s += a.speed * dt
    if (a.s >= a.len) {
      // sampai di simpul: pilih jalan berikutnya (tidak berbalik kecuali buntu)
      const at = a.to
      const options = at.links.filter(n => n !== a.from)
      const next = options.length ? options[Math.floor(Math.random() * options.length)] : a.from
      a.s -= a.len
      a.from = at
      a.to = next
      a.len = Math.max(0.1, Math.hypot(next.x - at.x, next.z - at.z))
      if (Math.random() < 0.12) a.pause = 2 + Math.random() * 5
    }
    const ux = (a.to.x - a.from.x) / a.len
    const uz = (a.to.z - a.from.z) / a.len
    const t = Math.min(1, a.s / a.len)
    // sedikit ke sisi jalan (kanan/kiri tetap per orang); makin sempit jalannya makin ke tengah
    const lat = a.side * Math.min(a.lat, Math.max(0, (a.from.w.get(a.to.id) ?? 5) / 2 - 0.9))
    const tx = a.from.x + (a.to.x - a.from.x) * t - uz * lat
    const tz = a.from.z + (a.to.z - a.from.z) * t + ux * lat
    if (a.init) {
      a.x = tx
      a.z = tz
      a.heading = Math.atan2(ux, uz)
      a.init = false
    }
    const k = 1 - Math.exp(-6 * dt)
    a.x += (tx - a.x) * k
    a.z += (tz - a.z) * k
    a.heading = turn(a.heading, Math.atan2(ux, uz), Math.min(1, dt * 5))
  }
  function stepFixed(a, dt, player) {
    const dxp = player.x - a.x
    const dzp = player.z - a.z
    const dp = Math.hypot(dxp, dzp)
    const guard = a.role === 'penjaga'
    const near = dp < (guard ? 4 : NEAR) && a.anim !== 'sit'
    if (near) {
      if (!guard && !a.greeted) {
        a.greeted = true
        setClip(a, 'wave')
      } else if (a.clip === 'wave' && a.t > 0.7) setClip(a, 'idle')
      a.heading = turn(a.heading, Math.atan2(dxp, dzp), Math.min(1, dt * 5))
    } else {
      if (dp > NEAR + 2.5) a.greeted = false
      setClip(a, a.anim)
      a.heading = turn(a.heading, a.homeHeading, Math.min(1, dt * 3))
    }
  }

  // --- tulis instance orang yang terlihat
  const frustum = new THREE.Frustum()
  const projView = new THREE.Matrix4()
  const sphere = new THREE.Sphere(new THREE.Vector3(), 1.6)
  const q = new THREE.Quaternion()
  const p = new THREE.Vector3()
  const s = new THREE.Vector3(SCALE, SCALE, SCALE)
  const Y = new THREE.Vector3(0, 1, 0)
  let visible = 0
  const playerPos = { x: 0, z: 0 }

  function update(dt, camera, focus, player, range = 110) {
    playerPos.x = player ? player.x : 1e9
    playerPos.z = player ? player.z : 1e9
    camera.updateMatrixWorld()
    projView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projView)
    for (const m of meshes) m.mesh.count = 0
    visible = 0
    const r2 = range * range
    for (const a of agents) {
      if (a.fixed) stepFixed(a, dt, playerPos)
      else stepWalker(a, dt, playerPos)
      const speedScale = a.clip === 'walk' ? (a.speed || 1) / WALK_ANIM_SPEED : 1
      a.t += dt * speedScale
      if (a.fade > 0) {
        a.fade = Math.max(0, a.fade - dt)
        a.prevT += dt
      }
      const dx = a.x - focus.x
      const dz = a.z - focus.z
      if (dx * dx + dz * dz > r2) continue
      const y = a.y ?? ground.surfaceAt(a.x, a.z)
      sphere.center.set(a.x, y + 0.8, a.z)
      if (!frustum.intersectsSphere(sphere)) continue
      const M = meshes[a.type]
      const i = M.mesh.count++
      p.set(a.x, y, a.z)
      q.setFromAxisAngle(Y, a.heading)
      M.mesh.setMatrixAt(i, _m.compose(p, q, s))
      const A = M.animA.array
      frameOf(M.table, a.clip, a.t, A, i * 4)
      A[i * 4 + 3] = a.fade > 0 ? a.fade / FADE : 0
      if (a.fade > 0) frameOf(M.table, a.prev, a.prevT, M.animB.array, i * 4)
      visible++
    }
    for (const m of meshes) {
      if (!m.mesh.count) continue
      m.mesh.instanceMatrix.needsUpdate = true
      m.animA.needsUpdate = true
      m.animB.needsUpdate = true
    }
  }

  // dorong prajurit keluar dari badan penduduk (tidak bisa menembus orang)
  function pushOut(pos, radius = 0.35) {
    for (const a of agents) {
      const dx = pos.x - a.x
      const dz = pos.z - a.z
      const min = radius + BODY
      const d2 = dx * dx + dz * dz
      if (d2 >= min * min || d2 < 1e-8) continue
      const d = Math.sqrt(d2)
      pos.x = a.x + (dx / d) * min
      pos.z = a.z + (dz / d) * min
    }
  }

  return {
    object: group,
    agents,
    update,
    pushOut,
    stats: () => ({ total: agents.length, fixed: agents.filter(a => a.fixed).length, visible, jenis: types.length }),
  }
}
