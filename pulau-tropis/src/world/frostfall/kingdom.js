import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import * as B from '../kencana/buildings.js'
import * as E from '../aeloria/buildings.js'
import * as F from './buildings.js'
import { buildingMaterial, buildingDepthMaterial } from '../kencana/material.js'
import { buildTiles } from '../kencana/kingdom.js'
import { windMaterial } from '../trees.js'
import { scatter } from '../../core/spatial.js'
import { fbm } from '../../core/noise.js'
import { LAND, FOREST, landDistance, inBox } from './layout.js'
import { caveFloor } from './height.js'
import { createCave } from './gua.js'

// Kerajaan Frostfall dalam 3D: bangunan dari rencana (plan.js) digabung per petak (buildTiles, sama
// seperti Kencana & Aeloria), kristal es, Gua Es Kristal (atap + langit-langit, gua.js), hutan pinus
// bersalju dengan dua tingkat detail (dekat: bertingkat + salju; jauh: satu kerucut), batu besar
// bersalju, batang tumbang, bongkah es di laut dekat pantai, serta lempeng pintu rahasia & tutup
// peti harta (mesh terpisah yang bisa bergerak).

const TREE_TILE = 160

// ------------------------------------------------------------------ geometri vegetasi
// bagian berwarna per titik: warna atas (puncak) → bawah, gradasi menurut tinggi
function tinted(geo, top, bottom, k0 = 0.62, k1 = 1.05) {
  const g = geo.index ? geo.toNonIndexed() : geo
  if (g.attributes.uv) g.deleteAttribute('uv')
  g.computeBoundingBox()
  const { min, max } = g.boundingBox
  const span = Math.max(1e-3, max.y - min.y)
  const a = new THREE.Color(bottom)
  const b = new THREE.Color(top)
  const c = new THREE.Color()
  const pos = g.attributes.position
  const arr = new Float32Array(pos.count * 3)
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - min.y) / span
    c.copy(a).lerp(b, t).multiplyScalar(k0 + (k1 - k0) * t)
    arr[i * 3] = c.r
    arr[i * 3 + 1] = c.g
    arr[i * 3 + 2] = c.b
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  return g
}

// pinus bersalju (dekat): 5 tingkat kerucut; tiap tingkat putih di atas (salju), hijau tua di tepi
export function pinusGeometry() {
  const parts = [tinted(new THREE.CylinderGeometry(0.2, 0.38, 3, 6).translate(0, 1.5, 0), '#6b4a32', '#3d2a1c')]
  const tiers = [[2.9, 3.0, 1.5], [2.4, 2.7, 3.1], [1.9, 2.4, 4.6], [1.4, 2.1, 6.0], [0.85, 1.9, 7.3]]
  for (const [r, h, y] of tiers) {
    const cone = new THREE.ConeGeometry(r, h, 7, 2, true).translate(0, y + h / 2, 0)
    const g = cone.toNonIndexed()
    // titik puncak & cincin tengah = salju, cincin bawah = daun hijau tua
    const pos = g.attributes.position
    const arr = new Float32Array(pos.count * 3)
    const snow = new THREE.Color('#eef3f9')
    const leaf = new THREE.Color('#1f3d2c')
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getY(i) - y) / h
      const c = t > 0.3 ? snow : leaf
      const k = t > 0.3 ? 0.9 + 0.12 * t : 0.7
      arr[i * 3] = c.r * k
      arr[i * 3 + 1] = c.g * k
      arr[i * 3 + 2] = c.b * k
    }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3))
    g.deleteAttribute('uv')
    parts.push(g)
  }
  return mergeGeometries(parts)
}
// pinus jauh: satu kerucut (hijau di bawah → putih di atas)
export function pinusJauhGeometry() {
  const cone = new THREE.ConeGeometry(2.7, 8.6, 6, 2, true).translate(0, 1.4 + 4.3, 0)
  return tinted(cone, '#eef3f9', '#203f2d', 0.72, 1.0)
}
// batu besar bersalju: bagian atas putih
function batuGeometry() {
  const g = new THREE.IcosahedronGeometry(1, 0)
  g.deleteAttribute('uv')
  const pos = g.attributes.position
  const nor = g.attributes.normal
  const arr = new Float32Array(pos.count * 3)
  const rock = new THREE.Color('#5d6068')
  const snow = new THREE.Color('#eef3f9')
  for (let i = 0; i < pos.count; i += 3) {
    // warna per segitiga menurut arah normalnya: menghadap ke atas = salju
    const ny = (nor.getY(i) + nor.getY(i + 1) + nor.getY(i + 2)) / 3
    const c = ny > 0.55 ? snow : rock
    const k = ny > 0.55 ? 0.95 : 0.75 + 0.2 * ny
    for (let v = 0; v < 3; v++) {
      arr[(i + v) * 3] = c.r * k
      arr[(i + v) * 3 + 1] = c.g * k
      arr[(i + v) * 3 + 2] = c.b * k
    }
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  return g
}
// batang tumbang: gelondong rebah + salju di atasnya + tunggul cabang
function gelondongGeometry() {
  const log = tinted(new THREE.CylinderGeometry(0.32, 0.38, 6, 7).rotateZ(Math.PI / 2).translate(0, 0.32, 0), '#6b4a32', '#4a3222', 0.8, 1.0)
  const snow = tinted(new THREE.BoxGeometry(5.6, 0.12, 0.42).translate(0, 0.66, 0), '#eef3f9', '#e4ebf3', 0.95, 1.0)
  const stub = tinted(new THREE.CylinderGeometry(0.08, 0.12, 0.8, 5).rotateZ(0.6).translate(1.2, 0.7, 0.15), '#5a3f2a', '#4a3222')
  return mergeGeometries([log, snow, stub])
}
// bongkah es terapung
function bongkahGeometry() {
  const g = new THREE.CylinderGeometry(1, 1.15, 0.5, 7).translate(0, 0.05, 0)
  return tinted(g, '#f2f8fc', '#9cc7df', 0.9, 1.05)
}

// InstancedMesh per petak dengan dua tingkat detail: dekat (geoNear) & jauh (geoFar). update()
// memilih per petak menurut jarak kamera.
function lodTiles(name, geoNear, geoFar, material, items, { tile, castShadow, receiveShadow, toMatrix }) {
  const group = new THREE.Group()
  group.name = name
  const tiles = new Map()
  for (const it of items) {
    const k = `${Math.floor(it.x / tile)},${Math.floor(it.z / tile)}`
    if (!tiles.has(k)) tiles.set(k, [])
    tiles.get(k).push(it)
  }
  const m = new THREE.Matrix4()
  const col = new THREE.Color()
  const list = []
  for (const its of tiles.values()) {
    const mk = (geo, shadow) => {
      const mesh = new THREE.InstancedMesh(geo, material, its.length)
      its.forEach((it, i) => {
        toMatrix(it, m, col)
        mesh.setMatrixAt(i, m)
        mesh.setColorAt(i, col)
      })
      mesh.instanceMatrix.needsUpdate = true
      mesh.computeBoundingSphere()
      mesh.castShadow = shadow
      mesh.receiveShadow = receiveShadow
      group.add(mesh)
      return mesh
    }
    const near = mk(geoNear, castShadow)
    const far = geoFar ? mk(geoFar, false) : null
    const cx = its.reduce((s, it) => s + it.x, 0) / its.length
    const cz = its.reduce((s, it) => s + it.z, 0) / its.length
    list.push({ near, far, cx, cz })
  }
  group.userData.update = (camera, switchDist) => {
    for (const t of list) {
      const d = Math.hypot(camera.position.x - t.cx, camera.position.z - t.cz)
      const close = d < switchDist
      t.near.visible = close || !t.far
      if (t.far) t.far.visible = !close
    }
  }
  return group
}

const q = new THREE.Quaternion()
const e = new THREE.Euler()
const pv = new THREE.Vector3()
const sv = new THREE.Vector3()
function treeMatrix(it, m, col) {
  e.set((it.b - 0.5) * 0.06, it.a * Math.PI * 2, (it.c - 0.5) * 0.06)
  q.setFromEuler(e)
  const s = 0.75 + 0.7 * it.b
  sv.set(s * (0.9 + 0.2 * it.c), s * (0.92 + 0.25 * it.c), s * (0.9 + 0.2 * it.c))
  pv.set(it.x, it.y - 0.2 * s, it.z)
  m.compose(pv, q, sv)
  const k = 0.88 + 0.22 * it.c
  col.setRGB(k, k, k * 1.02)
}

function partsFor(b) {
  switch (b.type) {
    case 'rumah': return F.rumahSalju(b.w, b.d, F.ROOF[b.roof % F.ROOF.length], { chimney: b.chimney, porch: b.porch, seed: b.seed })
    case 'kedai': return F.kedaiPanjang(b.w, b.d, F.ROOF[b.roof % F.ROOF.length], b.door)
    case 'kios': return F.kiosSalju(b.color, b.goods)
    case 'menara': return F.menaraJaga(b.h)
    case 'api': return F.apiUnggun({ lit: b.lit, logs: b.logs })
    case 'kayu-bakar': return F.tumpukanKayu(b.len)
    case 'lentera': return F.lenteraSalju()
    case 'sumur': return F.sumurSalju()
    case 'pagar': return F.pagarSalju(b.len)
    case 'gerobak': return E.gerobak('kayu')
    case 'peti': return F.peti(b.n, b.seed)
    case 'tembok': return F.temboKastel(b.len, b.t, b.h)
    case 'menara-kastel': return F.menaraKastel(b.r, b.h, b.banner)
    case 'gerbang': return F.gerbangKastel(b.w, b.h, b.depth)
    case 'aula': return F.aulaSinggasana(b.L, b.W, b.h, b.t, b.door)
    case 'singgasana': return F.singgasana()
    case 'tangga': return F.tanggaRahasia(b.len, b.drop, b.w)
    case 'langkan': return F.temboKastel(b.len, 0.45, 0.6)
    case 'lantai': return F.lantaiAula(b.w, b.d)
    case 'anglo': {
      const P = new B.Parts()
      P.cyl(0.25, 0.35, 1.2, 6, F.FC.besiTua, B.K.POLOS)
      P.cyl(0.6, 0.28, 0.35, 8, F.FC.besiTua, B.K.POLOS, { y: 1.2 })
      P.cyl(0, 0.42, 1.0, 6, F.FC.api, B.K.CAHAYA, { y: 1.45, sway: 0.12 })
      return P
    }
    case 'air-terjun': return F.airTerjunBeku(b.h, b.w, 5, b.lean)
    case 'mulut-gua': return F.mulutGua(b.w, b.h)
    case 'harta': return F.harta()
    case 'tenda': return F.tendaPemburu()
    case 'rak': return F.rakJemur()
    case 'luncur': return F.keretaLuncur()
    case 'kristal': return F.kristal(b.n, b.size, b.seed, b.ungu)
    case 'dermaga': return B.dermaga(b.w, b.len, b.y)
    case 'jembatan': {
      const s = b.surface
      const deck = t => s.y0 + (s.y1 - s.y0) * t + s.arch * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - s.a0) / (s.a1 - s.a0))))
      const piers = [0.3, 0.5, 0.7]
      const floor = lz => {
        // tanah di bawah titik lz sepanjang jembatan (sumbu lokal z, diputar b.rot)
        const x = b.x + Math.sin(b.rot) * lz
        const z = b.z + Math.cos(b.rot) * lz
        return b.ground.heightAt(x, z)
      }
      return B.jembatan(b.len, b.w, deck, floor, { stone: false, piers })
    }
    default: throw new Error(`jenis bangunan Frostfall tidak dikenal: ${b.type}`)
  }
}

export function createFrostfall({ ground, plan, mask, grid, quality, noiseTexture, terrainMaterial }) {
  const group = new THREE.Group()
  group.name = 'frostfall'
  const { shadows } = quality

  // ------------------------------------------------------------------- bangunan & kristal per petak
  const mat = buildingMaterial(noiseTexture)
  const depthMat = buildingDepthMaterial()
  const builds = [
    ...plan.build.map(b => (b.type === 'jembatan' ? { ...b, ground } : b)),
    ...plan.crystals.map(c => ({ type: 'kristal', x: c.x, y: c.y - 0.1, z: c.z, rot: 0, n: c.n, size: c.size, seed: c.seed, ungu: c.ungu })),
  ]
  const built = buildTiles({ builds, partsFor, mat, depthMat, shadows, name: 'frostfall' })
  group.add(...built.meshes)

  // ------------------------------------------------------------------- pintu rahasia & tutup peti
  const solidMat = buildingMaterial(noiseTexture, false)
  const slab = new THREE.Mesh(F.lempengRahasia(plan.trapdoor.hx, plan.trapdoor.hz).build(), solidMat)
  slab.name = 'pintu-rahasia'
  slab.position.set(plan.trapdoor.x, plan.trapdoor.y, plan.trapdoor.z)
  slab.receiveShadow = shadows
  const lidPivot = new THREE.Group()
  lidPivot.name = 'tutup-peti'
  // engsel di tepi belakang peti (lokal z = −0,5), di atas badan peti (y = 0,8)
  const c = Math.cos(plan.chest.rot)
  const s = Math.sin(plan.chest.rot)
  lidPivot.position.set(plan.chest.x - 0.52 * s, plan.chest.y + 0.8, plan.chest.z - 0.52 * c)
  lidPivot.rotation.y = plan.chest.rot
  const lid = new THREE.Mesh(F.tutupPeti().build(), solidMat)
  lidPivot.add(lid)
  group.add(slab, lidPivot)

  // ------------------------------------------------------------------- gua
  const cave = createCave({ ground, terrainMaterial, noiseTexture, shadows })
  group.add(cave.object)

  // ------------------------------------------------------------------- pinus, batu, gelondong
  const d = quality.treeDensity
  const reserved = (x, z, r) => mask.reserved(x, z, r + 1) || plan.clear(x, z, r)
  const onLand = (x, z) => landDistance(x, z) < 1.0 && x > 420
  const noCave = (x, z) => caveFloor(x, z) === null && caveFloor(x + 3, z) === null && caveFloor(x - 3, z) === null && caveFloor(x, z + 3) === null && caveFloor(x, z - 3) === null
  const common = { ground, grid, area: 560, cx: LAND.x, cz: LAND.z, reserved }
  const forest = (x, z) => inBox(x, z, FOREST) ? 1 : 0
  const pines = scatter({
    ...common, kind: 'pohon', seed: 8101, radius: 2.4, count: Math.round(2600 * d),
    accept: (x, z, h, slope, rand) => {
      if (!onLand(x, z) || h < 3 || h > 175 || slope > 0.85 || !noCave(x, z)) return false
      // hutan pinus lebat di selatan; bercak hutan di lembah & lereng; makin tinggi makin jarang
      const patch = fbm(x * 0.012 + 3, z * 0.012 - 9, 3, 811)
      const p = forest(x, z) ? 0.95 : patch > 0.52 ? 0.6 : 0.12
      return rand() < p * (1 - Math.min(1, Math.max(0, (h - 90) / 85)))
    },
  })
  const rocks = scatter({
    ...common, kind: 'batu', seed: 8202, radius: 1.8, count: Math.round(520 * d),
    accept: (x, z, h, slope) => onLand(x, z) && h > 2.6 && slope < 1.4 && noCave(x, z),
  })
  const logs = scatter({
    ...common, kind: 'batu', seed: 8303, radius: 3.4, count: Math.round(110 * d),
    accept: (x, z, h, slope) => onLand(x, z) && h > 4 && slope < 0.35 && (forest(x, z) || fbm(x * 0.012 + 3, z * 0.012 - 9, 3, 811) > 0.52) && noCave(x, z),
  })
  const wind = windMaterial(noiseTexture)
  const pineGroup = lodTiles('pinus-salju', pinusGeometry(), pinusJauhGeometry(), wind, pines, {
    tile: TREE_TILE, castShadow: shadows, receiveShadow: shadows, toMatrix: treeMatrix,
  })
  const rockMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true })
  const rockGroup = lodTiles('batu-salju', batuGeometry(), null, rockMat, rocks, {
    tile: TREE_TILE, castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
    toMatrix: (it, m, col) => {
      e.set((it.a - 0.5) * 0.6, it.b * 6.28, (it.c - 0.5) * 0.6)
      q.setFromEuler(e)
      const s = 0.6 + 1.5 * it.a * it.a
      sv.set(s * (1 + 0.4 * it.b), s * (0.55 + 0.35 * it.c), s * (1 + 0.3 * it.c))
      pv.set(it.x, it.y - 0.15 * s, it.z)
      m.compose(pv, q, sv)
      col.setRGB(1, 1, 1)
    },
  })
  const logGroup = lodTiles('gelondong', gelondongGeometry(), null, rockMat, logs, {
    tile: TREE_TILE, castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
    toMatrix: (it, m, col) => {
      e.set(0, it.a * 6.28, 0)
      q.setFromEuler(e)
      sv.set(0.8 + 0.4 * it.b, 1, 1)
      pv.set(it.x, it.y - 0.05, it.z)
      m.compose(pv, q, sv)
      col.setRGB(1, 1, 1)
    },
  })
  group.add(pineGroup, rockGroup, logGroup)

  // bongkah es terapung di laut dangkal sekitar Frostfall
  const floes = []
  for (let i = 0; i < 260 && floes.length < 70; i++) {
    const a = (i * 2.399) % (Math.PI * 2)
    const u = 1.04 + ((i * 0.618) % 1) * 0.22
    const x = LAND.x + Math.cos(a) * LAND.rx * u
    const z = LAND.z + Math.sin(a) * LAND.rz * u
    const h = ground.heightAt(x, z)
    if (h > -1.2 || h < -9 || x < 420 || plan.docks.some(dk => Math.abs(z - dk.at) < 14 && Math.abs(x - (dk.s0 + dk.s1) / 2) < 40)) continue
    floes.push({ x, z, a: (i * 0.37) % 1, b: (i * 0.71) % 1 })
  }
  const floeMesh = new THREE.InstancedMesh(bongkahGeometry(), rockMat, Math.max(1, floes.length))
  floeMesh.name = 'bongkah-es'
  {
    const m = new THREE.Matrix4()
    floes.forEach((f, i) => {
      e.set(0, f.a * 6.28, 0)
      q.setFromEuler(e)
      const sc = 1.2 + f.b * 2.6
      sv.set(sc * (1 + f.a * 0.6), 1, sc)
      pv.set(f.x, -0.1, f.z)
      m.compose(pv, q, sv)
      floeMesh.setMatrixAt(i, m)
    })
    floeMesh.count = floes.length
    floeMesh.instanceMatrix.needsUpdate = true
    floeMesh.computeBoundingSphere()
    floeMesh.receiveShadow = shadows
  }
  group.add(floeMesh)

  // ------------------------------------------------------------------- penghalang & oklusi
  const trunks = [
    ...pines.map(t => ({ x: t.x, z: t.z, radius: 0.4, kind: 'pohon' })),
    ...rocks.filter(r => 0.6 + 1.5 * r.a * r.a > 1.0).map(r => ({ x: r.x, z: r.z, radius: (0.6 + 1.5 * r.a * r.a) * 0.85, kind: 'batu' })),
  ]
  const occlusion = [
    ...plan.blocked.map(b => ({ x: b.x, z: b.z, radius: Math.max(b.hx, b.hz) + 1.2, strength: 0.18 })),
    ...pines.map(t => ({ x: t.x, z: t.z, radius: 3.4, strength: 0.32 })),
  ]

  // ------------------------------------------------------------------- pintu rahasia & peti
  let slabOpen = 0 // 0 = tertutup … 1 = terbuka penuh (animasi)
  let slabTarget = 0
  let lidOpen = 0
  let lidTarget = 0
  return {
    object: group,
    colliders: [...plan.colliders, ...trunks, ...cave.fences],
    surfaces: plan.surfaces,
    occlusion,
    cave,
    lights: plan.lights,
    interiors: plan.interiors,
    smoke: plan.smoke,
    trapdoor: plan.trapdoor,
    chest: plan.chest,
    get trapdoorOpen() {
      return slabTarget === 1
    },
    openTrapdoor() {
      slabTarget = 1
    },
    openChest() {
      lidTarget = 1
    },
    update(dt, camera) {
      pineGroup.userData.update(camera, quality.level === 'tinggi' ? 230 : quality.level === 'sedang' ? 150 : 100)
      rockGroup.userData.update(camera, Infinity)
      logGroup.userData.update(camera, Infinity)
      // lempeng: turun 0,35 m lalu bergeser ke barat masuk ke bawah lantai
      if (slabOpen !== slabTarget) {
        slabOpen = Math.min(1, slabOpen + dt / 1.6)
        const sink = Math.min(1, slabOpen / 0.25)
        const slide = Math.max(0, (slabOpen - 0.25) / 0.75)
        slab.position.y = plan.trapdoor.y - 0.36 * sink
        slab.position.x = plan.trapdoor.x - slide * (plan.trapdoor.hx * 2 + 0.5)
        slab.visible = slabOpen < 1
      }
      if (lidOpen !== lidTarget) {
        lidOpen = Math.min(1, lidOpen + dt / 0.9)
        lid.rotation.x = -1.9 * (1 - (1 - lidOpen) ** 3)
      }
    },
    stats: {
      bangunan: plan.build.length,
      rumah: built.counts.rumah || 0,
      jenis: built.counts,
      petak: built.tiles.size,
      titik: built.vertices,
      pinus: pines.length,
      batu: rocks.length,
      gelondong: logs.length,
      kristal: plan.crystals.length,
      bongkah: floes.length,
      gua: cave.stats,
    },
  }
}
