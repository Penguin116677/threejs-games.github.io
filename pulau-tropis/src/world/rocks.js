import * as THREE from 'three'
import { ISLAND } from './island.js'
import { mountainZone } from './biome.js'
import { valueNoise } from '../core/noise.js'
import { scatter } from '../core/spatial.js'
import { instancedTiles } from './trees.js'

// Batu-batu low-poly: bongkahan besar di lereng gunung, batu kecil di padang dan pantai.

function rockGeometry(seed, detail = 0) {
  const g = new THREE.DodecahedronGeometry(1, detail)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    // bentuk tidak beraturan; titik yang sama selalu bergeser sama → tanpa celah
    const k = 0.72 + 0.5 * valueNoise(v.x * 1.6 + seed, v.z * 1.6 + v.y * 1.3 - seed, 5)
    v.multiplyScalar(k)
    v.y *= 0.82
    if (v.y < 0) v.y *= 0.55 // dasar lebih rata, tertanam di tanah
    p.setXYZ(i, v.x, v.y, v.z)
  }
  g.computeVertexNormals() // non-indexed → permukaan bersegi (khas batu low-poly)
  g.computeBoundingBox()
  const { min, max } = g.boundingBox
  const col = new THREE.Color('#a59c8e')
  const arr = new Float32Array(p.count * 3)
  for (let i = 0; i < p.count; i++) {
    const t = (p.getY(i) - min.y) / (max.y - min.y)
    const k = 0.66 + 0.46 * t
    arr[i * 3] = col.r * k
    arr[i * 3 + 1] = col.g * k
    arr[i * 3 + 2] = col.b * k
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  g.deleteAttribute('uv')
  return g
}

const q = new THREE.Quaternion()
const e = new THREE.Euler()
const pos = new THREE.Vector3()
const scl = new THREE.Vector3()

function rockMatrix(it, m, col) {
  e.set((it.b - 0.5) * 0.5, it.a * Math.PI * 2, (it.c - 0.5) * 0.5)
  q.setFromEuler(e)
  const s = it.r * 0.95
  scl.set(s * (0.8 + 0.4 * it.c), s * (0.8 + 0.5 * it.b), s * (0.8 + 0.4 * it.a))
  pos.set(it.x, it.y - 0.12 * s, it.z)
  m.compose(pos, q, scl)
  // sedikit variasi warna: abu kebiruan ↔ coklat kemerahan (batuan vulkanik)
  const k = 0.82 + 0.36 * it.c
  const warm = (it.a - 0.5) * 0.18
  col.setRGB(k * (1 + warm), k, k * (1 - warm))
}

export function createRocks({ ground, grid, quality }) {
  const d = quality.treeDensity
  // bongkahan di lereng gunung (lebih banyak di bagian curam/berbatu)
  const boulders = scatter({
    ground, grid, kind: 'batu', seed: 606,
    count: Math.round(160 * d),
    radius: rand => 1 + rand() * 1.8,
    accept: (x, z, h, slope, rand) => {
      if (h < 12) return false
      const rocky = Math.min(1, slope * 1.2 + Math.max(0, h - 40) / 20)
      return rand() < mountainZone(x, z) * (0.25 + 0.75 * rocky)
    },
  })
  // batu kecil di padang dan pantai
  const pebbles = scatter({
    ground, grid, kind: 'batu', seed: 707,
    count: Math.round(110 * d),
    radius: rand => 0.4 + rand() * 0.6,
    accept: (x, z, h, slope, rand) => (h > 0.3 && h < ISLAND.beachTop + 0.5 && rand() < 0.25)
      || (h > 4 && h < 45 && slope < 0.8 && rand() < 0.35 + 0.65 * mountainZone(x, z)),
  })

  const mat = new THREE.MeshLambertMaterial({ vertexColors: true })
  const opts = { castShadow: quality.shadows, receiveShadow: quality.shadows, toMatrix: rockMatrix }
  const group = new THREE.Group()
  group.name = 'batu'
  const all = [...boulders, ...pebbles]
  // dua bentuk batu, dibagi selang-seling
  group.add(
    instancedTiles('batu-a', rockGeometry(1.3), mat, all.filter((_, i) => i % 2 === 0), opts),
    instancedTiles('batu-b', rockGeometry(7.9), mat, all.filter((_, i) => i % 2 === 1), opts),
  )
  group.userData.occlusion = all.map(p => ({ x: p.x, z: p.z, radius: p.r * 1.6, strength: 0.3 }))
  group.userData.colliders = all.map(p => ({ x: p.x, z: p.z, radius: p.r * 0.9, kind: 'batu' }))
  group.userData.count = all.length
  return group
}
