import * as THREE from 'three'
import * as B from './buildings.js'
import { buildingMaterial, buildingDepthMaterial, buildingTime } from './material.js'
import { ISLANDS, CITY, TEGAL, CAMPS, rectDistance, inRect } from './layout.js'
import { islandDistance } from './height.js'
import { buildRoutes } from './routes.js'
import { forestMask } from '../biome.js'
import { scatter } from '../../core/spatial.js'
import {
  windMaterial, instancedTiles, standardMatrix, palmGeometry, jungleGeometry, umbrellaGeometry, bushGeometry,
  beringinGeometry, kambojaGeometry, pisangGeometry,
} from '../trees.js'

// Kepulauan Kencana dalam 3D: semua bangunan dari rencana (plan.js) dibuat lalu digabung per petak
// 128 m — satu draw call per petak, petak di luar layar tidak digambar. Ditambah pepohonan khusus
// (beringin, kamboja, mangga, pisang, kelapa) dan pepohonan liar di pulau-pulau barat, serta perahu
// yang mengapung naik-turun di air.

const TILE = 128
const ROOFS = {
  genteng: ['#b65a32', '#a84f2c', '#c46a3a', '#94482b'],
  sirap: ['#6b4f3a', '#5d4434', '#7a5a40', '#584a3c'],
  joglo: ['#5a4a40', '#4a4038', '#62503f', '#3f3a35'],
  alang: ['#bb9c5c', '#a98a4e', '#c4a76a', '#8f7a52'],
}

function partsFor(b, ground) {
  const r = b.roof ?? 0
  switch (b.type) {
    case 'rumah-bata': return B.rumahBata(b.w, b.d, ROOFS.genteng[r])
    case 'rumah-limasan': return B.rumahLimasan(b.w, b.d, ROOFS.sirap[r])
    case 'rumah-joglo': return B.rumahJoglo(b.w, b.d, ROOFS.joglo[r])
    case 'rumah-panggung': return B.rumahPanggung(b.w, b.d, ROOFS.alang[r])
    case 'rumah-lumbung': return B.lumbung(ROOFS.alang[r])
    case 'gudang': return B.gudang(b.w, b.d, B.COL.genteng)
    case 'warung': return B.warung(b.color, b.goods)
    case 'sumur': return B.sumur()
    case 'tembok': return B.tembok(b.len, b.t, b.h)
    case 'tembok-dalam': return B.temboKeraton(b.len, b.t, b.h)
    case 'pagar': return B.pagar(b.len, b.t, b.h)
    case 'pagar-batu': return B.pagar(b.len, b.t, b.h, true)
    case 'menara': return B.menara(b.size, b.h)
    case 'bentar': return B.bentar(b.w, b.d, b.h, b.mirror, b.stone)
    case 'paduraksa': return B.paduraksa(b.w, b.d, b.opening, b.h)
    case 'pendopo': return B.pendopo(b.w, b.d, b.h)
    case 'bangsal': return B.bangsal(b.w, b.d, b.h)
    case 'meru': return B.meru(b.base, b.tiers)
    case 'candi': return B.candi(b.base)
    case 'bale': return B.bale(b.w, b.d)
    case 'dangau': return B.dangau(b.w, b.d)
    case 'umbul': return B.umbul(b.h, b.color)
    case 'siti-hinggil': return B.sitiHinggil(b.w, b.d, b.h)
    case 'tenda': return B.tenda(b.w, b.d, b.color)
    case 'kandang': return B.kandang(b.w, b.d)
    case 'jerami': return B.jerami()
    case 'peti': return B.peti()
    case 'gentong': return B.gentong()
    case 'jemuran': return B.jemuran()
    case 'dermaga': return B.dermaga(b.w, b.len, b.y)
    case 'jembatan-batu':
    case 'jembatan-kayu': {
      const s = b.surface
      const deck = t => s.y0 + (s.y1 - s.y0) * t + s.arch * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - s.a0) / (s.a1 - s.a0))))
      // tiang penyangga tiap ±16 m (batu) / 7 m (kayu) di bentang air
      const stepT = (b.type === 'jembatan-batu' ? 16 : 7) / b.len
      const piers = []
      for (let t = s.a0 + stepT; t < s.a1 - stepT * 0.4; t += stepT) piers.push(t)
      const floor = lz => (b.axis === 'x' ? ground.heightAt(b.x + lz, b.z) : ground.heightAt(b.x, b.z + lz))
      return B.jembatan(b.len, b.w, deck, floor, { stone: b.type === 'jembatan-batu', piers })
    }
    default: throw new Error(`jenis bangunan tidak dikenal: ${b.type}`)
  }
}

// --------------------------------------------------------------------------- perahu
// lambung runcing: penampang V dari haluan ke buritan; tepi atas melengkung naik di ujung
function hull(P, len, beam, depth, color, stripe) {
  const n = 10
  const sec = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const z = -len / 2 + t * len
    const w = beam / 2 * Math.pow(Math.sin(Math.PI * t), 0.6)
    const lift = 0.35 * Math.pow(Math.abs(t - 0.5) * 2, 3)
    sec.push({ z, w, top: 0.25 + lift, keel: -depth * Math.pow(Math.sin(Math.PI * t), 0.5) + lift * 0.6 })
  }
  const outer = []
  const inner = []
  for (let i = 0; i < n; i++) {
    const a = sec[i]
    const b = sec[i + 1]
    for (const s of [-1, 1]) {
      const ta = [s * a.w, a.top, a.z]
      const tb = [s * b.w, b.top, b.z]
      const ka = [0, a.keel, a.z]
      const kb = [0, b.keel, b.z]
      if (s > 0) outer.push([ta, ka, kb], [ta, kb, tb])
      else outer.push([ta, kb, ka], [ta, tb, kb])
    }
    // dek tipis (tutup atas) supaya dari kamera atas tidak berlubang
    inner.push([[-a.w, a.top - 0.12, a.z], [b.w, b.top - 0.12, b.z], [a.w, a.top - 0.12, a.z]], [[-a.w, a.top - 0.12, a.z], [-b.w, b.top - 0.12, b.z], [b.w, b.top - 0.12, b.z]])
  }
  P.faces(outer, color, B.K.KAYU)
  P.faces(inner, B.COL.kayuMuda, B.K.KAYU)
  P.box(beam * 0.02 + 0.05, 0.12, len * 0.7, stripe, B.K.POLOS, { x: beam * 0.43, y: 0.05 })
  P.box(beam * 0.02 + 0.05, 0.12, len * 0.7, stripe, B.K.POLOS, { x: -beam * 0.43, y: 0.05 })
}

function jukungGeometry() {
  const P = new B.Parts()
  hull(P, 6.2, 0.85, 0.45, '#f2efe6', '#2f62a8')
  // cadik: dua pelampung bambu + dua palang
  for (const s of [-1, 1]) P.cyl(0.09, 0.09, 4.6, 5, B.COL.bambu, B.K.KAYU, { x: s * 2.3, y: -0.05, rx: Math.PI / 2, z: 2.3 })
  for (const z of [-1.2, 1.2]) P.box(4.8, 0.08, 0.1, B.COL.kayuTua, B.K.KAYU, { y: 0.35, z })
  // tiang & layar segitiga
  P.cyl(0.05, 0.06, 3.4, 5, B.COL.kayuTua, B.K.KAYU, { y: 0.2, z: 0.6 })
  P.faces([[[0, 3.5, 0.6], [0, 0.9, 0.7], [0, 0.9, -2.0]], [[0, 3.5, 0.6], [0, 0.9, -2.0], [0, 0.9, 0.7]]], B.COL.merah, B.K.POLOS, { sway: 0.03 })
  return P.build()
}

function jongGeometry() {
  const P = new B.Parts()
  hull(P, 18, 5, 2.2, '#7a5236', B.COL.emas)
  P.box(4.2, 2.0, 5.5, B.COL.kayu, B.K.KAYU, { y: 0.1, z: -4.8 })
  P.hip(4.8, 6.2, 2.1, 1.4, B.COL.ijuk, B.K.JERAMI, { z: -4.8 })
  for (const [z, h] of [[2.6, 11], [-1.0, 8.5]]) {
    P.cyl(0.14, 0.18, h, 6, B.COL.kayuTua, B.K.KAYU, { y: 0.1, z })
    // layar tanja: persegi miring khas Nusantara
    const top = h - 0.6
    P.faces([
      [[0, top, z + 2.6], [0, top * 0.35, z - 2.2], [0, top * 0.4, z + 3.4]],
      [[0, top, z + 2.6], [0, top * 0.95, z - 1.6], [0, top * 0.35, z - 2.2]],
      [[0, top, z + 2.6], [0, top * 0.4, z + 3.4], [0, top * 0.35, z - 2.2]],
      [[0, top, z + 2.6], [0, top * 0.35, z - 2.2], [0, top * 0.95, z - 1.6]],
    ], '#e8dcc0', B.K.POLOS, { sway: 0.04 })
  }
  return P.build()
}

export function createKencana({ ground, plan, mask, grid, quality, noiseTexture }) {
  const group = new THREE.Group()
  group.name = 'kepulauan-kencana'
  const { shadows } = quality

  // ------------------------------------------------------------------- bangunan per petak
  // dikelompokkan per petak dulu, lalu dibuat & digabung petak demi petak (memori puncak kecil)
  const tiles = new Map()
  const counts = {}
  for (const b of plan.build) {
    counts[b.type] = (counts[b.type] || 0) + 1
    const k = `${Math.floor(b.x / TILE)},${Math.floor(b.z / TILE)}`
    let list = tiles.get(k)
    if (!list) tiles.set(k, list = [])
    list.push(b)
  }
  const mat = buildingMaterial(noiseTexture)
  const depthMat = buildingDepthMaterial()
  let vertices = 0
  for (const [key, list] of tiles) {
    const parts = list.map(b => partsFor(b, ground))
    const n = parts.reduce((sum, src) => sum + src.pos.length / 3, 0)
    const pos = new Float32Array(n * 3)
    const nor = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const kind = new Float32Array(n)
    const sway = new Float32Array(n)
    let o = 0
    parts.forEach((src, idx) => {
      const b = list[idx]
      const c = Math.cos(b.rot)
      const sn = Math.sin(b.rot)
      const m = src.pos.length / 3
      for (let i = 0; i < m; i++) {
        const k3 = i * 3
        const d3 = (o + i) * 3
        const x = src.pos[k3]
        const z = src.pos[k3 + 2]
        pos[d3] = b.x + x * c + z * sn
        pos[d3 + 1] = b.y + src.pos[k3 + 1]
        pos[d3 + 2] = b.z - x * sn + z * c
        const nx = src.nor[k3]
        const nz = src.nor[k3 + 2]
        nor[d3] = nx * c + nz * sn
        nor[d3 + 1] = src.nor[k3 + 1]
        nor[d3 + 2] = -nx * sn + nz * c
      }
      col.set(src.col, o * 3)
      kind.set(src.kind, o)
      sway.set(src.sway, o)
      o += m
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    geo.setAttribute('aKind', new THREE.BufferAttribute(kind, 1))
    geo.setAttribute('aSway', new THREE.BufferAttribute(sway, 1))
    geo.computeBoundingSphere()
    vertices += n
    const mesh = new THREE.Mesh(geo, mat)
    mesh.name = `bangunan-${key}`
    mesh.castShadow = shadows
    mesh.receiveShadow = shadows
    mesh.customDepthMaterial = depthMat
    group.add(mesh)
  }

  // ------------------------------------------------------------------- pepohonan
  const wind = windMaterial(noiseTexture)
  const detail = quality.canopyDetail
  const d = quality.treeDensity
  const groundY = t => ({ ...t, y: ground.heightAt(t.x, t.z), a: ((t.x * 0.37 + t.z * 0.11) % 1 + 1) % 1, b: 0.5, c: ((t.x * 0.13 - t.z * 0.29) % 1 + 1) % 1 })
  const special = type => plan.trees.filter(t => t.type === type).map(groundY)
  // pohon khusus: putaran acak dari posisinya, skala tetap it.s
  const upright = standardMatrix({ scaleMin: 1, scaleMax: 1, tilt: 0.05, tint: 0.08, sink: 0.1 })
  const scaleVec = new THREE.Vector3()
  const fixedScale = (it, m, col) => {
    upright(it, m, col)
    m.scale(scaleVec.setScalar(it.s))
    m.elements[12] = it.x
    m.elements[13] = it.y - 0.1
    m.elements[14] = it.z
  }
  const trees = new THREE.Group()
  trees.name = 'pohon-kencana'
  const opts = toMatrix => ({ castShadow: shadows, receiveShadow: shadows, toMatrix })
  trees.add(
    instancedTiles('beringin', beringinGeometry(detail), wind, special('beringin'), opts(fixedScale)),
    instancedTiles('kamboja', kambojaGeometry(), wind, special('kamboja'), opts(fixedScale)),
    instancedTiles('pisang', pisangGeometry(), wind, special('pisang'), opts(fixedScale)),
    instancedTiles('mangga', jungleGeometry(detail), wind, special('mangga').map(t => ({ ...t, s: t.s * 0.62 })), opts(fixedScale)),
  )

  // pohon liar: kelapa di pantai, hutan kecil & pohon payung di pedalaman, semak & bunga
  const reserved = (x, z, r) => mask.reserved(x, z, r + 1) || rectDistance(x, z, CITY) < 10 || rectDistance(x, z, TEGAL) < 10
    || CAMPS.some(c => inRect(x, z, c, r + 2))
  const roadPalms = special('kelapa')
  const all = { kelapa: [], pohon: [], payung: [], semak: [], bunga: [] }
  for (const isl of ISLANDS) {
    // lingkaran sebar tiap pulau (pulau lonjong: selebar sumbu panjangnya) bisa menjangkau pulau
    // tetangga; hanya titik di pulau itu sendiri yang dipakai. Pulau Wira berhutan jarang.
    const oval = !!isl.rx
    const area = (oval ? Math.max(isl.rx, isl.rz) : isl.r) * 1.12
    const share = oval ? (isl.rx * isl.rz) / 255 ** 2 : (isl.r / 255) ** 2
    const forest = isl.forest ?? 1
    const on = (x, z) => islandDistance(isl, x, z) < 1.1
    all.kelapa.push(...scatter({
      ground, grid, kind: 'kelapa', seed: 1101 + isl.seed, radius: 1.8, area, cx: isl.x, cz: isl.z, reserved,
      count: Math.round(130 * d * Math.sqrt(share)),
      accept: (x, z, h, slope, rand) => on(x, z) && h > 0.9 && h < 4.2 && slope < 0.3 && rand() < 0.6,
    }))
    all.pohon.push(...scatter({
      ground, grid, kind: 'pohon', seed: 1202 + isl.seed, radius: 2.3, area, cx: isl.x, cz: isl.z, reserved,
      count: Math.round(340 * d * share * forest) + 6,
      accept: (x, z, h, slope) => on(x, z) && h > 3 && h < 30 && slope < 0.6 && forestMask(x, z) > 0.44,
    }))
    all.payung.push(...scatter({
      ground, grid, kind: 'pohon', seed: 1303 + isl.seed, radius: 4.5, area, cx: isl.x, cz: isl.z, reserved,
      count: Math.round(40 * d * share * forest) + 2,
      accept: (x, z, h, slope, rand) => on(x, z) && h > 3 && h < 30 && slope < 0.45 && rand() < 0.5,
    }))
    all.semak.push(...scatter({
      ground, grid, kind: 'semak', seed: 1404 + isl.seed, radius: 1.1, area, cx: isl.x, cz: isl.z, reserved,
      count: Math.round(260 * d * share * Math.sqrt(forest)) + 8,
      accept: (x, z, h, slope) => on(x, z) && h > 2.8 && slope < 0.7,
    }))
    all.bunga.push(...scatter({
      ground, grid, kind: 'semak', seed: 1505 + isl.seed, radius: 1.0, area, cx: isl.x, cz: isl.z, reserved,
      count: Math.round(90 * d * share * Math.sqrt(forest)) + 6,
      accept: (x, z, h, slope) => on(x, z) && h > 2.8 && slope < 0.5,
    }))
  }
  trees.add(
    instancedTiles('kelapa', palmGeometry(), wind, [...roadPalms, ...all.kelapa], opts(standardMatrix({ scaleMin: 0.8, scaleMax: 1.25, tilt: 0.35, tint: 0.1 }))),
    instancedTiles('pohon-hutan', jungleGeometry(detail), wind, all.pohon, opts(standardMatrix({ scaleMin: 0.75, scaleMax: 1.3, tilt: 0.12, tint: 0.16 }))),
    instancedTiles('pohon-payung', umbrellaGeometry(detail), wind, all.payung, opts(standardMatrix({ scaleMin: 0.8, scaleMax: 1.15, tilt: 0.08, tint: 0.12 }))),
    instancedTiles('semak', bushGeometry(0, null), wind, all.semak, {
      castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.7, scaleMax: 1.4, tilt: 0.2, tint: 0.2, sink: 0.1 }),
    }),
    instancedTiles('semak-bunga', bushGeometry(0, ['#e0353f', '#f4c02c', '#f06aa8', '#ffffff']), wind, all.bunga, {
      castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.7, scaleMax: 1.2, tilt: 0.15, tint: 0.08, sink: 0.1 }),
    }),
  )
  group.add(trees)

  // ------------------------------------------------------------------- perahu
  const boatGeo = { jukung: jukungGeometry(), jong: jongGeometry() }
  const boats = []
  for (const type of ['jukung', 'jong']) {
    const list = plan.boats.filter(b => (b.type === 'jukung-darat' ? 'jukung' : b.type) === type)
    if (!list.length) continue
    const mesh = new THREE.InstancedMesh(boatGeo[type], mat, list.length)
    mesh.name = `perahu-${type}`
    mesh.castShadow = shadows
    mesh.receiveShadow = shadows
    mesh.customDepthMaterial = depthMat
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    list.forEach((b, i) => boats.push({ ...b, mesh, i, phase: (b.x * 0.31 + b.z * 0.17) % 6.28, land: b.type === 'jukung-darat', y: Math.max(0, ground.heightAt(b.x, b.z)) }))
    group.add(mesh)
  }
  const boatMeshes = [...new Set(boats.map(b => b.mesh))]
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const p = new THREE.Vector3()
  const one = new THREE.Vector3(1, 1, 1)
  function updateBoats(t) {
    for (const b of boats) {
      if (b.land) {
        e.set(0.04, b.rot, 0.12)
        p.set(b.x, b.y + 0.45, b.z)
      } else {
        e.set(Math.sin(t * 0.9 + b.phase) * 0.025, b.rot, Math.sin(t * 1.1 + b.phase * 1.7) * 0.06)
        p.set(b.x, 0.12 + Math.sin(t * 1.3 + b.phase) * 0.1, b.z)
      }
      q.setFromEuler(e)
      b.mesh.setMatrixAt(b.i, m.compose(p, q, one))
    }
    for (const mesh of boatMeshes) mesh.instanceMatrix.needsUpdate = true
  }
  updateBoats(0)
  for (const mesh of boatMeshes) mesh.computeBoundingSphere()

  // ------------------------------------------------------------------- penghalang & oklusi
  const trunks = [
    ...all.kelapa.map(t => ({ x: t.x, z: t.z, radius: 0.45, kind: 'pohon' })),
    ...all.pohon.map(t => ({ x: t.x, z: t.z, radius: 0.7, kind: 'pohon' })),
    ...all.payung.map(t => ({ x: t.x, z: t.z, radius: 0.75, kind: 'pohon' })),
  ]
  const occlusion = [
    ...plan.blocked.map(b => ({ x: b.x, z: b.z, radius: Math.max(b.hx, b.hz) + 1.5, strength: 0.25 })),
    ...all.pohon.map(t => ({ x: t.x, z: t.z, radius: 4.8, strength: 0.4 })),
    ...all.payung.map(t => ({ x: t.x, z: t.z, radius: 5.5, strength: 0.3 })),
    ...all.kelapa.map(t => ({ x: t.x, z: t.z, radius: 2.4, strength: 0.18 })),
    ...plan.trees.filter(t => t.type === 'beringin').map(t => ({ x: t.x, z: t.z, radius: 12, strength: 0.5 })),
    ...all.semak.map(t => ({ x: t.x, z: t.z, radius: 1.8, strength: 0.2 })),
  ]

  // jaringan jalan penduduk: semua jalan + jalur dermaga/jembatan/pulau kecil
  const routes = buildRoutes([...plan.roads, ...plan.paths])

  return {
    object: group,
    colliders: [...plan.colliders, ...trunks],
    surfaces: plan.surfaces,
    occlusion,
    routes,
    spots: plan.spots,
    roofs: plan.roofs,
    stats: {
      bangunan: plan.build.length,
      rumah: Object.entries(counts).filter(([k]) => k.startsWith('rumah-')).reduce((s, [, v]) => s + v, 0),
      jenis: counts,
      petak: tiles.size,
      titik: vertices,
      pohon: Object.values(all).reduce((n, l) => n + l.length, 0) + plan.trees.length,
      perahu: boats.length,
      simpulJalan: routes.nodes.length,
    },
    update(t) {
      buildingTime.value = t
      updateBoats(t)
    },
  }
}
