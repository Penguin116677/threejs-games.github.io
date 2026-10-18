import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { ISLAND, heightAt } from './island.js'
import { fbm } from '../core/noise.js'

// Pohon low-poly: kelapa di pantai, pohon hutan di pedalaman.
// Satu InstancedMesh per jenis = satu draw call per jenis, ringan untuk HP.
// Penempatan memakai seed tetap, jadi posisi pohon selalu sama.

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

// samakan atribut (position, normal, color) agar bisa digabung
function prep(geo, color) {
  const g = geo.index ? geo.toNonIndexed() : geo
  g.deleteAttribute('uv')
  g.computeVertexNormals()
  const c = new THREE.Color(color)
  const n = g.attributes.position.count
  const arr = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    arr[i * 3] = c.r
    arr[i * 3 + 1] = c.g
    arr[i * 3 + 2] = c.b
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  return g
}

function palmGeometry() {
  const parts = []
  const height = 8
  const bend = 0.035 // batang kelapa melengkung
  const trunk = new THREE.CylinderGeometry(0.22, 0.38, height, 5, 4, true)
  trunk.translate(0, height / 2, 0)
  const p = trunk.attributes.position
  for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) + bend * p.getY(i) * p.getY(i))
  parts.push(prep(trunk, '#8a6a45'))

  const topX = bend * height * height
  const fronds = 8
  for (let i = 0; i < fronds; i++) {
    const leaf = new THREE.PlaneGeometry(1.6, 4.6, 1, 4)
    leaf.translate(0, 2.3, 0)
    // daun melengkung ke bawah
    const lp = leaf.attributes.position
    for (let j = 0; j < lp.count; j++) {
      const y = lp.getY(j)
      lp.setZ(j, 0.07 * y * y)
      lp.setX(j, lp.getX(j) * (1 - y / 5.2))
    }
    leaf.rotateX(Math.PI / 2 - 0.25)
    leaf.rotateY(i / fronds * Math.PI * 2 + (i % 2) * 0.2)
    leaf.translate(topX, height - 0.1, 0)
    parts.push(prep(leaf, i % 2 ? '#3f8f2f' : '#4fa236'))
  }
  const crown = new THREE.IcosahedronGeometry(0.45, 0)
  crown.translate(topX, height - 0.2, 0)
  parts.push(prep(crown, '#6b5a2e'))
  return mergeGeometries(parts)
}

function jungleTreeGeometry() {
  const parts = []
  const trunk = new THREE.CylinderGeometry(0.35, 0.6, 6, 6, 1, true)
  trunk.translate(0, 3, 0)
  parts.push(prep(trunk, '#6e5235'))
  const blobs = [
    [0, 7.2, 0, 3.0, '#2f7d2a'],
    [1.6, 6.2, 0.6, 2.2, '#3a8c30'],
    [-1.3, 6.4, -0.8, 2.3, '#2a7027'],
    [0.2, 8.6, -0.3, 2.0, '#3f9534'],
  ]
  for (const [x, y, z, r, col] of blobs) {
    const b = new THREE.IcosahedronGeometry(r, 0)
    b.scale(1, 0.8, 1)
    b.translate(x, y, z)
    parts.push(prep(b, col))
  }
  return mergeGeometries(parts)
}

function slopeAt(x, z) {
  const e = 1.5
  const dx = heightAt(x + e, z) - heightAt(x - e, z)
  const dz = heightAt(x, z + e) - heightAt(x, z - e)
  return Math.hypot(dx, dz) / (2 * e)
}

// pilih titik-titik pohon secara deterministik
function scatter({ count, seed, accept }) {
  const rand = rng(seed)
  const out = []
  const half = ISLAND.size / 2
  for (let tries = 0; out.length < count && tries < count * 40; tries++) {
    const x = (rand() * 2 - 1) * half
    const z = (rand() * 2 - 1) * half
    const h = heightAt(x, z)
    if (accept(x, z, h, slopeAt(x, z), rand))
      out.push({ x, z, h, s: rand(), r: rand() })
  }
  return out
}

const sway = { value: 0 }

function makeMaterial() {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide, flatShading: true })
  // goyangan angin ringan di vertex shader: makin tinggi makin bergoyang
  mat.onBeforeCompile = shader => {
    shader.uniforms.uTime = sway
    shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      float hh = max(position.y, 0.0);
      vec3 ip = vec3(instanceMatrix[3]);
      float ph = ip.x * 0.13 + ip.z * 0.17;
      transformed.x += sin(uTime * 1.3 + ph) * hh * hh * 0.0035;
      transformed.z += cos(uTime * 1.1 + ph) * hh * hh * 0.0025;`
    )
  }
  return mat
}

function instanced(geo, points, { scaleMin, scaleMax, tilt, tint }) {
  const mesh = new THREE.InstancedMesh(geo, makeMaterial(), points.length)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const pos = new THREE.Vector3()
  const scl = new THREE.Vector3()
  const col = new THREE.Color()
  points.forEach((p, i) => {
    e.set((p.s - 0.5) * tilt, p.r * Math.PI * 2, (p.r - 0.5) * tilt)
    q.setFromEuler(e)
    const s = scaleMin + (scaleMax - scaleMin) * p.s
    scl.set(s, s * (0.9 + 0.2 * p.r), s)
    pos.set(p.x, p.h - 0.15, p.z)
    m.compose(pos, q, scl)
    mesh.setMatrixAt(i, m)
    // variasi warna per pohon
    col.setHSL(0, 0, 1).multiplyScalar(1 - tint + tint * 2 * p.r)
    mesh.setColorAt(i, col)
  })
  mesh.instanceMatrix.needsUpdate = true
  mesh.computeBoundingSphere()
  mesh.computeBoundingBox()
  return mesh
}

export function createTrees(quality) {
  const group = new THREE.Group()
  group.name = 'pohon'
  const banyak = quality.level === 'rendah' ? 1 : 1.8

  // kelapa: di pasir pantai, sedikit di atas air, tidak di lereng curam
  const palms = scatter({
    count: Math.round(170 * banyak),
    seed: 101,
    accept: (x, z, h, slope, rand) => h > 0.9 && h < 4.5 && slope < 0.3 && rand() < 0.5,
  })
  // pohon hutan: berkelompok (noise) supaya ada hutan lebat dan padang terbuka
  const jungle = scatter({
    count: Math.round(900 * banyak),
    seed: 202,
    accept: (x, z, h, slope) => h > 4 && h < 42 && slope < 0.55
      && fbm(x * 0.012 + 40, z * 0.012 - 13, 3, 31) > 0.47,
  })

  const palmMesh = instanced(palmGeometry(), palms, { scaleMin: 0.8, scaleMax: 1.25, tilt: 0.35, tint: 0.12 })
  palmMesh.name = 'kelapa'
  const jungleMesh = instanced(jungleTreeGeometry(), jungle, { scaleMin: 0.7, scaleMax: 1.4, tilt: 0.12, tint: 0.18 })
  jungleMesh.name = 'pohon-hutan'
  group.add(palmMesh, jungleMesh)

  // posisi batang untuk collision di Milestone 2
  group.userData.trunks = [
    ...palms.map(p => ({ x: p.x, z: p.z, radius: 0.5 })),
    ...jungle.map(p => ({ x: p.x, z: p.z, radius: 0.8 })),
  ]
  group.userData.update = t => {
    sway.value = t
  }
  return group
}
