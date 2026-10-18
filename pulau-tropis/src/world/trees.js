import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { ISLAND } from './island.js'
import { forestMask, mountainZone } from './biome.js'
import { scatter } from '../core/spatial.js'

// Vegetasi low-poly: kelapa di pantai, pohon hutan, pohon payung di padang,
// semak dan semak berbunga. Setiap jenis digambar dengan InstancedMesh yang dibagi
// per petak 3×3, sehingga petak di luar layar tidak digambar sama sekali.
// Posisi memakai seed tetap → selalu sama setiap kali game dibuka.

const TAU = Math.PI * 2
const UP = new THREE.Vector3(0, 1, 0)

// ---------------------------------------------------------------------------
// Bahan geometri
// ---------------------------------------------------------------------------

// Satu bagian model: non-indexed, tanpa uv, warna per-vertex bergradasi
// (bawah lebih gelap = bayangan-diri palsu). `centers` → normal "membulat"
// dari titik-titik itu, membuat tajuk daun tampak lembut dan bervolume.
function part(geo, color, { centers = null, dark = 0.62, light = 1.08, rings = 0 } = {}) {
  const g = geo.index ? geo.toNonIndexed() : geo
  if (g.attributes.uv) g.deleteAttribute('uv')
  const pos = g.attributes.position
  if (centers) {
    const nor = g.attributes.normal
    const v = new THREE.Vector3()
    const sum = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      sum.set(0, 0, 0)
      for (const [c, w] of centers) sum.addScaledVector(v.fromBufferAttribute(pos, i).sub(c).normalize(), w)
      sum.normalize()
      nor.setXYZ(i, sum.x, sum.y, sum.z)
    }
  }
  g.computeBoundingBox()
  const { min, max } = g.boundingBox
  const span = Math.max(1e-3, max.y - min.y)
  const base = new THREE.Color(color)
  const arr = new Float32Array(pos.count * 3)
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i)
    let k = dark + (light - dark) * ((y - min.y) / span)
    if (rings) k *= 0.88 + 0.12 * Math.sin(y * rings)
    arr[i * 3] = base.r * k
    arr[i * 3 + 1] = base.g * k
    arr[i * 3 + 2] = base.b * k
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  return g
}

// gumpalan daun: bola low-poly sedikit dipipihkan
function blob(r, detail, [x, y, z], squash = 0.82) {
  const g = new THREE.IcosahedronGeometry(r, detail)
  g.scale(1, squash, 1)
  g.translate(x, y, z)
  return g
}

// Pelepah kelapa: tulang daun melengkung + anak daun segitiga di kiri-kanan.
function frondGeometry(length, droop) {
  const K = 9
  const spine = (t, out) => out.set(0, length * (0.3 * t - droop * t * t), length * t * (1 - 0.12 * t))
  const pos = []
  const nor = []
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  const tmp = new THREE.Vector3()
  const n = new THREE.Vector3()
  const e1 = new THREE.Vector3()
  const e2 = new THREE.Vector3()
  for (let side = -1; side <= 1; side += 2)
    for (let k = 0; k < K; k++) {
      const t0 = 0.08 + 0.86 * k / K
      const t1 = t0 + 0.86 / K * 0.95
      const len = 1.3 * Math.sin(Math.PI * (0.16 + 0.76 * t0))
      spine(t0, a)
      spine(t1, b)
      spine(Math.min(1, (t0 + t1) / 2 + 0.07), tmp)
      c.set(tmp.x + side * len, tmp.y - 0.4 * len, tmp.z + 0.3 * len)
      n.crossVectors(e1.subVectors(b, a), e2.subVectors(c, a))
      // sisi depan menghadap ke atas (sisi bawah daun lebih gelap = alami)
      const flip = n.y < 0
      if (flip) n.negate()
      n.normalize().lerp(UP, 0.45).normalize()
      for (const v of flip ? [a, c, b] : [a, b, c]) {
        pos.push(v.x, v.y, v.z)
        nor.push(n.x, n.y, n.z)
      }
    }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3))
  return g
}

function palmGeometry() {
  const parts = []
  const height = 8
  const bend = 0.035 // batang kelapa melengkung
  const trunk = new THREE.CylinderGeometry(0.2, 0.36, height, 6, 5, true)
  trunk.translate(0, height / 2, 0)
  const p = trunk.attributes.position
  for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) + bend * p.getY(i) * p.getY(i))
  parts.push(part(trunk, '#8d6d48', { dark: 0.7, light: 1.05, rings: 9 }))

  const topX = bend * height * height
  const fronds = 8
  for (let i = 0; i < fronds; i++) {
    const old = i % 4 === 3 // pelepah tua: lebih terkulai dan kekuningan
    const f = frondGeometry(old ? 4.0 : 4.5, old ? 0.75 : 0.5)
    f.rotateX(-0.15 + (i % 3) * 0.12)
    f.rotateY(i / fronds * TAU + (i % 2) * 0.25)
    f.translate(topX, height - 0.05, 0)
    parts.push(part(f, old ? '#8c9a38' : (i % 2 ? '#3f8f2f' : '#4c9e34'), { dark: 0.8, light: 1.05 }))
  }
  const crown = new THREE.IcosahedronGeometry(0.42, 0)
  crown.translate(topX, height - 0.15, 0)
  parts.push(part(crown, '#6b5a2e'))

  // tandan kelapa menggantung di bawah pelepah: kebanyakan hijau (muda),
  // sebagian kuning-oranye (kelapa gading) dan coklat (tua)
  const NUTS = [
    [0.0, 0.36, 0.5, '#5f8f23'], [0.8, 0.42, 0.62, '#6f9c2b'], [1.6, 0.37, 0.52, '#c9921f'],
    [2.5, 0.43, 0.66, '#5f8f23'], [3.3, 0.36, 0.5, '#7c5a32'], [4.1, 0.42, 0.63, '#6f9c2b'],
    [4.9, 0.37, 0.54, '#5f8f23'], [5.7, 0.43, 0.67, '#d4a02a'],
  ]
  for (const [a, r, drop, col] of NUTS) {
    const c = new THREE.Vector3(topX + Math.cos(a) * r, height - drop, Math.sin(a) * r)
    const nut = new THREE.IcosahedronGeometry(1, 0)
    nut.scale(0.21, 0.26, 0.21)
    nut.translate(c.x, c.y, c.z)
    parts.push(part(nut, col, { centers: [[c, 1]], dark: 0.7, light: 1.12 }))
  }
  // tangkai tandan dari pangkal pelepah ke gerombol buah
  for (const a of [0.4, 3.6]) {
    const from = new THREE.Vector3(topX, height - 0.2, 0)
    const to = new THREE.Vector3(topX + Math.cos(a) * 0.34, height - 0.6, Math.sin(a) * 0.34)
    const dir = to.clone().sub(from)
    const stalk = new THREE.CylinderGeometry(0.03, 0.05, dir.length(), 4, 1, true)
    stalk.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()))
    stalk.translate((from.x + to.x) / 2, (from.y + to.y) / 2, (from.z + to.z) / 2)
    parts.push(part(stalk, '#b8923f', { dark: 0.85, light: 1 }))
  }
  return mergeGeometries(parts)
}

function jungleGeometry(detail) {
  const parts = []
  const trunk = new THREE.CylinderGeometry(0.3, 0.55, 6.6, 6, 2, true)
  trunk.translate(0, 3.3, 0)
  parts.push(part(trunk, '#6b4f33', { dark: 0.55, light: 1 }))
  for (const s of [-1, 1]) {
    const br = new THREE.CylinderGeometry(0.1, 0.18, 2.6, 5, 1, true)
    br.rotateZ(s * 0.75)
    br.translate(s * 0.85, 5.6, s * 0.3)
    parts.push(part(br, '#6b4f33', { dark: 0.7, light: 1 }))
  }
  const center = new THREE.Vector3(0, 7.4, 0)
  const blobs = [
    [0, 7.5, 0, 3.0, '#2f7d2a'],
    [1.7, 6.7, 0.8, 2.3, '#3a8c30'],
    [-1.5, 6.8, -0.9, 2.4, '#2a7027'],
    [0.2, 9.0, -0.2, 2.1, '#3f9534'],
  ]
  for (const [x, y, z, r, col] of blobs) {
    const g = blob(r, detail, [x, y, z])
    parts.push(part(g, col, { centers: [[center, 0.65], [new THREE.Vector3(x, y, z), 0.35]], dark: 0.66, light: 1.12 }))
  }
  return mergeGeometries(parts)
}

// pohon payung (mirip ketapang/akasia): batang tinggi, tajuk lebar dan pipih
function umbrellaGeometry(detail) {
  const parts = []
  const trunk = new THREE.CylinderGeometry(0.3, 0.6, 9, 6, 3, true)
  trunk.translate(0, 4.5, 0)
  const p = trunk.attributes.position
  for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) + 0.006 * p.getY(i) * p.getY(i))
  parts.push(part(trunk, '#75593a', { dark: 0.55, light: 1 }))
  for (let i = 0; i < 3; i++) {
    const br = new THREE.CylinderGeometry(0.08, 0.16, 3.4, 5, 1, true)
    br.rotateZ(0.9)
    br.translate(1.3, 8.4, 0)
    br.rotateY(i * TAU / 3 + 0.4)
    br.translate(0.45, 0, 0)
    parts.push(part(br, '#75593a', { dark: 0.75, light: 1 }))
  }
  const center = new THREE.Vector3(0.5, 9.8, 0)
  for (const [x, y, z, r, col, sq] of [[0.5, 9.7, 0, 4.4, '#3b7f2c', 0.34], [1.2, 10.6, -0.6, 3.0, '#468f33', 0.4], [-1.4, 9.9, 1.1, 2.6, '#357528', 0.4]]) {
    const g = blob(r, detail, [x, y, z], sq)
    parts.push(part(g, col, { centers: [[center, 0.5], [new THREE.Vector3(x, y - 1, z), 0.5]], dark: 0.66, light: 1.15 }))
  }
  return mergeGeometries(parts)
}

function bushGeometry(detail, flowers) {
  const parts = []
  const center = new THREE.Vector3(0, 0.5, 0)
  for (const [x, y, z, r, col] of [[0, 0.65, 0, 0.95, '#3f8a2e'], [0.75, 0.5, 0.3, 0.7, '#4b9a35'], [-0.6, 0.45, -0.4, 0.65, '#45922f']]) {
    const g = blob(r, detail, [x, y, z], 0.75)
    parts.push(part(g, col, { centers: [[center, 0.6], [new THREE.Vector3(x, y, z), 0.4]], dark: 0.75, light: 1.15 }))
  }
  if (flowers) {
    const spots = [[0.2, 1.35, 0.5], [-0.5, 1.1, 0.4], [0.9, 0.95, -0.2], [-0.2, 1.3, -0.6], [0.5, 1.15, 0.85], [-0.9, 0.8, -0.1]]
    spots.forEach(([x, y, z], i) => {
      const f = new THREE.IcosahedronGeometry(0.17, 0)
      f.translate(x, y, z)
      parts.push(part(f, flowers[i % flowers.length], { dark: 0.9, light: 1.1 }))
    })
  }
  return mergeGeometries(parts)
}

// ---------------------------------------------------------------------------
// Material dengan goyangan angin (vertex shader): makin tinggi makin bergoyang
// ---------------------------------------------------------------------------
const windTime = { value: 0 }

// + pola noise di permukaan (gerombol daun / serat kayu) supaya dari dekat tidak polos
export function windMaterial(noiseTexture) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })
  mat.onBeforeCompile = shader => {
    shader.uniforms.uTime = windTime
    shader.uniforms.uNoise = { value: noiseTexture }
    shader.vertexShader = 'uniform float uTime;\nvarying vec3 vLocal;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      float hh = max(position.y, 0.0);
      vec3 ip = vec3(instanceMatrix[3]);
      float ph = ip.x * 0.13 + ip.z * 0.17;
      vLocal = position + ip * 0.05;
      transformed.x += sin(uTime * 1.3 + ph) * hh * hh * 0.0035;
      transformed.z += cos(uTime * 1.1 + ph) * hh * hh * 0.0025;`
    )
    shader.fragmentShader = 'uniform sampler2D uNoise;\nvarying vec3 vLocal;\n' + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      float leaf = texture2D(uNoise, vLocal.xz * 0.42 + vLocal.y * 0.29).g;
      diffuseColor.rgb *= 0.74 + 0.5 * leaf;`
    )
  }
  return mat
}

// ---------------------------------------------------------------------------
// InstancedMesh per petak: petak di luar layar (dan di luar kotak bayangan) dilewati
// ---------------------------------------------------------------------------
const TILE = ISLAND.size / 3

export function instancedTiles(name, geo, material, items, { castShadow = false, receiveShadow = false, toMatrix }) {
  const group = new THREE.Group()
  group.name = name
  const tiles = new Map()
  for (const it of items) {
    const k = `${Math.floor(it.x / TILE)},${Math.floor(it.z / TILE)}`
    if (!tiles.has(k)) tiles.set(k, [])
    tiles.get(k).push(it)
  }
  const m = new THREE.Matrix4()
  const col = new THREE.Color()
  for (const list of tiles.values()) {
    const mesh = new THREE.InstancedMesh(geo, material, list.length)
    list.forEach((it, i) => {
      toMatrix(it, m, col)
      mesh.setMatrixAt(i, m)
      mesh.setColorAt(i, col)
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
    mesh.castShadow = castShadow
    mesh.receiveShadow = receiveShadow
    group.add(mesh)
  }
  return group
}

const q = new THREE.Quaternion()
const e = new THREE.Euler()
const pos = new THREE.Vector3()
const scl = new THREE.Vector3()

// matriks standar: putar acak, sedikit miring, skala acak, warna sedikit bervariasi
function standardMatrix({ scaleMin, scaleMax, tilt, tint, sink = 0.15 }) {
  return (it, m, col) => {
    e.set((it.b - 0.5) * tilt, it.a * TAU, (it.c - 0.5) * tilt)
    q.setFromEuler(e)
    const s = scaleMin + (scaleMax - scaleMin) * it.b
    scl.set(s, s * (0.9 + 0.2 * it.c), s)
    pos.set(it.x, it.y - sink * s, it.z)
    m.compose(pos, q, scl)
    const k = 1 - tint + tint * 2 * it.c
    const hue = (it.a - 0.5) * tint
    col.setRGB(k * (1 + hue), k, k * (1 - hue))
  }
}

// ---------------------------------------------------------------------------
export function createTrees({ ground, grid, quality, noiseTexture }) {
  const d = quality.treeDensity
  const detail = quality.canopyDetail
  const { shadows } = quality

  // kelapa: di pasir pantai, sedikit di atas air, tidak di lereng curam
  const palms = scatter({
    ground, grid, kind: 'kelapa', seed: 101, radius: 1.8,
    count: Math.round(170 * d),
    accept: (x, z, h, slope, rand) => h > 0.9 && h < 4.2 && slope < 0.3 && rand() < 0.55,
  })
  // pohon hutan: berkelompok (noise) → hutan lebat dan padang terbuka
  const jungle = scatter({
    ground, grid, kind: 'pohon', seed: 202, radius: 2.3,
    count: Math.round(900 * d),
    accept: (x, z, h, slope) => h > 4 && h < 44 && slope < 0.6 && forestMask(x, z) > 0.47,
  })
  // pohon payung: menyendiri di padang dan tepi hutan, terutama di sekitar gunung
  const umbrella = scatter({
    ground, grid, kind: 'pohon', seed: 303, radius: 4.5,
    count: Math.round(110 * d),
    accept: (x, z, h, slope, rand) => {
      if (h < 5 || h > 42 || slope > 0.45) return false
      const f = forestMask(x, z)
      return f > 0.34 && f < 0.49 && rand() < 0.35 + 0.65 * mountainZone(x, z)
    },
  })
  // semak: tepi hutan dan sesekali di padang
  const bushes = scatter({
    ground, grid, kind: 'semak', seed: 404, radius: 1.1,
    count: Math.round(700 * d),
    accept: (x, z, h, slope, rand) => {
      if (h < ISLAND.beachTop + 0.6 || h > 46 || slope > 0.7) return false
      const f = forestMask(x, z)
      return (f > 0.4 && f < 0.56) || rand() < 0.06
    },
  })
  // semak berbunga (kembang sepatu): titik warna di padang dan dekat pantai
  const flowers = scatter({
    ground, grid, kind: 'semak', seed: 505, radius: 1.0,
    count: Math.round(150 * d),
    accept: (x, z, h, slope, rand) => h > ISLAND.beachTop + 0.4 && h < 30 && slope < 0.5
      && forestMask(x, z) < 0.5 && rand() < 0.5,
  })

  const mat = windMaterial(noiseTexture)
  const group = new THREE.Group()
  group.name = 'vegetasi'
  group.add(
    instancedTiles('kelapa', palmGeometry(), mat, palms, {
      castShadow: shadows, receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.8, scaleMax: 1.25, tilt: 0.35, tint: 0.1 }),
    }),
    instancedTiles('pohon-hutan', jungleGeometry(detail), mat, jungle, {
      castShadow: shadows, receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.75, scaleMax: 1.4, tilt: 0.12, tint: 0.16 }),
    }),
    instancedTiles('pohon-payung', umbrellaGeometry(detail), mat, umbrella, {
      castShadow: shadows, receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.8, scaleMax: 1.2, tilt: 0.08, tint: 0.12 }),
    }),
    instancedTiles('semak', bushGeometry(0, null), mat, bushes, {
      castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.7, scaleMax: 1.5, tilt: 0.2, tint: 0.2, sink: 0.1 }),
    }),
    instancedTiles('semak-bunga', bushGeometry(0, ['#e0353f', '#f4c02c', '#f06aa8']), mat, flowers, {
      castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.7, scaleMax: 1.2, tilt: 0.15, tint: 0.08, sink: 0.1 }),
    }),
  )

  // gelapkan tanah di bawah tajuk (oklusi palsu)
  group.userData.occlusion = [
    ...jungle.map(p => ({ x: p.x, z: p.z, radius: 4.8, strength: 0.4 })),
    ...umbrella.map(p => ({ x: p.x, z: p.z, radius: 5.5, strength: 0.3 })),
    ...palms.map(p => ({ x: p.x, z: p.z, radius: 2.4, strength: 0.18 })),
    ...bushes.map(p => ({ x: p.x, z: p.z, radius: 1.8, strength: 0.2 })),
    ...flowers.map(p => ({ x: p.x, z: p.z, radius: 1.6, strength: 0.15 })),
  ]
  // batang pohon untuk collision di Milestone 2
  group.userData.trunks = [
    ...palms.map(p => ({ x: p.x, z: p.z, radius: 0.45 })),
    ...jungle.map(p => ({ x: p.x, z: p.z, radius: 0.7 })),
    ...umbrella.map(p => ({ x: p.x, z: p.z, radius: 0.75 })),
  ]
  group.userData.counts = {
    kelapa: palms.length, pohon: jungle.length, payung: umbrella.length,
    semak: bushes.length, bunga: flowers.length,
  }
  group.userData.update = t => {
    windTime.value = t
  }
  return group
}
