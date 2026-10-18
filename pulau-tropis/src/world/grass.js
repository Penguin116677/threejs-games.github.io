import * as THREE from 'three'
import { rng, seed2 } from '../core/random.js'
import { grassDensity } from './biome.js'

// Rumput: rumpun-rumpun ilalang yang bergoyang tertiup angin di sekitar gunung.
// Supaya ringan di HP, rumput dibuat & digambar hanya di sekitar kamera:
// - dunia dibagi chunk 16×16 m; isi chunk dibuat saat pertama kali dibutuhkan
// - kepadatan turun dengan jarak (≈ jumlah rumpun per piksel layar tetap),
//   rumpun jauh sedikit diperbesar, lalu semuanya menyusut halus ke tanah
//   di batas jarak — tidak ada rumput yang tiba-tiba muncul/hilang
// - semua rumput yang terlihat digambar dalam SATU draw call (instancing)

const CHUNK = 16
const FAR_DENSITY = 0.02 // kepadatan relatif minimum di kejauhan
const BUILD_BUDGET_MS = 3 // waktu maksimum membuat chunk baru per frame (mencegah patah-patah)
const STRIDE = 8 // float per rumpun: x, y, z, rank | rotasi, skala, warna, fase angin
const TAU = Math.PI * 2

// kepadatan relatif pada jarak d (harus sama persis dengan shader)
const lodAt = (d, near) => Math.min(1, Math.max(FAR_DENSITY, Math.pow(near / Math.max(d, 1e-3), 1.5)))

// Satu rumpun: beberapa helai melengkung menyebar dari pusat. Tinggi model ±1 m.
// Warna (ruang linear) disamakan dengan warna tanah padang agar rumput menyatu dengan tanah.
function tuftGeometry(blades) {
  const rand = rng(99)
  const pos = []
  const col = []
  const idx = []
  const base = new THREE.Color().setRGB(0.14, 0.28, 0.05)
  const mid = new THREE.Color().setRGB(0.3, 0.5, 0.11)
  const tip = new THREE.Color().setRGB(0.4, 0.62, 0.13)
  const c = new THREE.Color()
  const SEG = 2 // 3 segitiga per helai
  for (let b = 0; b < blades; b++) {
    const ang = (b / blades) * TAU + rand() * 0.9
    const dx = Math.cos(ang)
    const dz = Math.sin(ang)
    const lean = 0.2 + rand() * 0.4
    const height = 0.6 + rand() * 0.4
    const width = 0.075 + rand() * 0.05
    const r0 = 0.03 + rand() * 0.16
    const start = pos.length / 3
    for (let s = 0; s <= SEG; s++) {
      const t = s / SEG
      const out = r0 + lean * t * t
      const cx = dx * out
      const cz = dz * out
      const y = height * t
      c.copy(base).lerp(mid, Math.min(1, t * 1.6)).lerp(tip, Math.max(0, t * 1.6 - 0.6))
      if (s < SEG) {
        const w = width * (1 - t * 0.6)
        // lebar helai tegak lurus arah condongnya
        pos.push(cx + dz * w, y, cz - dx * w, cx - dz * w, y, cz + dx * w)
        col.push(c.r, c.g, c.b, c.r, c.g, c.b)
      } else {
        pos.push(cx, y, cz)
        col.push(c.r, c.g, c.b)
      }
    }
    for (let s = 0; s < SEG - 1; s++) {
      const a = start + s * 2
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
    const last = start + (SEG - 1) * 2
    idx.push(last, last + 1, last + 2)
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(new Array(pos.length).fill(0).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3))
  g.setIndex(idx)
  return g
}

function grassMaterial(uniforms) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })
  mat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = /* glsl */`
      attribute vec4 aOffset; // xyz = posisi, w = urutan acak (untuk LOD)
      attribute vec4 aParams; // x = rotasi, y = skala, z = warna (0 kering..1 segar), w = fase angin
      uniform float uTime;
      uniform vec3 uCamPos;
      uniform float uRadius;
      uniform float uNear;
      uniform float uFar;
      uniform vec2 uWind;
    ` + shader.vertexShader
      // cahaya rumput mengikuti tanah (normal ke atas) agar menyatu dengan warna tanah
      .replace('#include <beginnormal_vertex>', 'vec3 objectNormal = vec3(0.0, 1.0, 0.0);')
      .replace('#include <begin_vertex>', /* glsl */`
        vec3 transformed = vec3(position);
        float camDist = distance(uCamPos, aOffset.xyz);
        float lod = clamp(pow(uNear / max(camDist, 0.001), 1.5), uFar, 1.0);
        float grow = smoothstep(0.0, 0.15 * lod + 0.002, lod - aOffset.w)
          * (1.0 - smoothstep(uRadius * 0.8, uRadius, camDist))
          * min(1.6, pow(1.0 / lod, 0.2)); // rumpun jauh sedikit lebih besar
        float cr = cos(aParams.x);
        float sr = sin(aParams.x);
        transformed.xz = vec2(cr * transformed.x - sr * transformed.z, sr * transformed.x + cr * transformed.z);
        // angin: gelombang yang menyapu padang + getaran kecil per rumpun
        float bend = position.y * position.y;
        float gust = sin(uTime * 1.7 + dot(aOffset.xz, vec2(0.11, 0.07)) + aParams.w * 0.4) * 0.6
          + sin(uTime * 3.1 + aParams.w) * 0.2;
        transformed.xz += uWind * gust * bend * 0.35;
        transformed.y -= abs(gust) * bend * 0.08;
        transformed *= aParams.y * grow;
        transformed += aOffset.xyz;
      `)
      .replace('#include <color_vertex>', `#include <color_vertex>
        vColor.rgb *= mix(vec3(1.35, 1.1, 0.6), vec3(0.92, 1.0, 0.92), aParams.z);`)
    // kedua sisi helai diterangi sama (tanpa membalik normal untuk sisi belakang)
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_begin>', `
      float faceDirection = 1.0;
      vec3 normal = normalize(vNormal);
      vec3 nonPerturbedNormal = normal;
    `)
  }
  return mat
}

function countBelow(ranks, v) {
  let lo = 0
  let hi = ranks.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (ranks[mid] < v) lo = mid + 1
    else hi = mid
  }
  return lo
}

const EMPTY = { count: 0 }

export function createGrass({ ground, grid, quality }) {
  const cfg = quality.grass
  const base = tuftGeometry(cfg.blades)
  const geo = new THREE.InstancedBufferGeometry()
  geo.index = base.index
  for (const k of ['position', 'color', 'normal']) geo.setAttribute(k, base.attributes[k])
  const buffer = new Float32Array(cfg.max * STRIDE)
  const inst = new THREE.InstancedInterleavedBuffer(buffer, STRIDE, 1).setUsage(THREE.DynamicDrawUsage)
  geo.setAttribute('aOffset', new THREE.InterleavedBufferAttribute(inst, 4, 0))
  geo.setAttribute('aParams', new THREE.InterleavedBufferAttribute(inst, 4, 4))
  geo.instanceCount = 0

  const uniforms = {
    uTime: { value: 0 },
    uCamPos: { value: new THREE.Vector3() },
    uRadius: { value: cfg.radius },
    uNear: { value: cfg.near },
    uFar: { value: FAR_DENSITY },
    uWind: { value: new THREE.Vector2(1, 0.45).normalize() },
  }
  const mesh = new THREE.Mesh(geo, grassMaterial(uniforms))
  mesh.name = 'rumput'
  mesh.frustumCulled = false // pemotongan dilakukan per chunk di bawah
  mesh.receiveShadow = quality.shadows && cfg.shadows
  mesh.visible = false

  const chunks = new Map()

  function buildChunk(cx, cz) {
    const x0 = cx * CHUNK
    const z0 = cz * CHUNK
    // cek cepat 4×4 titik: lewati chunk yang sama sekali tidak berumput
    let any = false
    for (let i = 0; i < 4 && !any; i++)
      for (let j = 0; j < 4 && !any; j++) {
        const x = x0 + (i + 0.5) * CHUNK / 4
        const z = z0 + (j + 0.5) * CHUNK / 4
        if (grassDensity(x, z, ground.heightAt(x, z), 0) > 0.02) any = true
      }
    if (!any) return EMPTY

    const rand = rng(seed2(cx, cz) ^ 0x9e3779b9)
    const n = Math.round(CHUNK * CHUNK * cfg.density)
    const list = []
    let minY = Infinity
    let maxY = -Infinity
    for (let k = 0; k < n; k++) {
      const x = x0 + rand() * CHUNK
      const z = z0 + rand() * CHUNK
      const keep = rand()
      const y = ground.heightAt(x, z)
      if (keep >= grassDensity(x, z, y, ground.slopeAt(x, z))) continue
      if (grid.covered(x, z, 'batu', 0.85)) continue
      const fresh = rand() < 0.12 ? rand() * 0.5 : 0.6 + rand() * 0.4
      list.push([x, y - 0.04, z, rand(), rand() * TAU, 0.6 + rand() * 0.7, fresh, rand() * TAU])
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }
    if (!list.length) return EMPTY
    // urut berdasarkan rank: LOD cukup mengambil "awalan" daftar
    list.sort((a, b) => a[3] - b[3])
    const data = new Float32Array(list.length * STRIDE)
    const ranks = new Float32Array(list.length)
    list.forEach((v, i) => {
      data.set(v, i * STRIDE)
      ranks[i] = v[3]
    })
    return {
      count: list.length,
      data,
      ranks,
      center: new THREE.Vector3(x0 + CHUNK / 2, (minY + maxY) / 2, z0 + CHUNK / 2),
      radius: Math.hypot(CHUNK / 2, CHUNK / 2, (maxY - minY) / 2) + 1.4,
    }
  }

  const frustum = new THREE.Frustum()
  const projView = new THREE.Matrix4()
  const sphere = new THREE.Sphere()
  const lastPos = new THREE.Vector3(Infinity, 0, 0)
  const lastQuat = new THREE.Quaternion()
  const visible = []
  const missing = []
  let pending = false

  function addIfVisible(ch, cam, R) {
    if (!ch.count) return
    const d = Math.max(0, cam.distanceTo(ch.center) - ch.radius)
    if (d > R) return
    sphere.center.copy(ch.center)
    sphere.radius = ch.radius
    if (frustum.intersectsSphere(sphere)) visible.push({ ch, d })
  }

  function update(camera, time) {
    uniforms.uTime.value = time
    const cam = camera.position
    uniforms.uCamPos.value.copy(cam)
    if (!pending && lastPos.equals(cam) && lastQuat.equals(camera.quaternion)) return
    lastPos.copy(cam)
    lastQuat.copy(camera.quaternion)
    pending = false

    camera.updateMatrixWorld()
    projView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projView)

    const R = cfg.radius
    const i0 = Math.floor((cam.x - R) / CHUNK)
    const i1 = Math.floor((cam.x + R) / CHUNK)
    const j0 = Math.floor((cam.z - R) / CHUNK)
    const j1 = Math.floor((cam.z + R) / CHUNK)
    visible.length = 0
    missing.length = 0
    for (let i = i0; i <= i1; i++)
      for (let j = j0; j <= j1; j++) {
        const key = (i + 32768) * 65536 + (j + 32768)
        const ch = chunks.get(key)
        if (ch === undefined) {
          // belum dibuat: catat bila mungkin terjangkau (perkiraan jarak datar)
          const dx = Math.max(0, Math.abs(cam.x - (i + 0.5) * CHUNK) - CHUNK * 0.71)
          const dz = Math.max(0, Math.abs(cam.z - (j + 0.5) * CHUNK) - CHUNK * 0.71)
          const d2 = dx * dx + dz * dz
          if (d2 <= R * R) missing.push({ i, j, key, d2 })
          continue
        }
        addIfVisible(ch, cam, R)
      }

    // buat chunk yang belum ada, terdekat dulu, dalam batas waktu per frame
    if (missing.length) {
      missing.sort((a, b) => a.d2 - b.d2)
      const t0 = performance.now()
      let n = 0
      for (const m of missing) {
        if (n > 0 && performance.now() - t0 > BUILD_BUDGET_MS) break
        const ch = buildChunk(m.i, m.j)
        chunks.set(m.key, ch)
        addIfVisible(ch, cam, R)
        n++
      }
      pending = n < missing.length
    }

    // chunk terdekat diutamakan bila kapasitas penuh
    visible.sort((a, b) => a.d - b.d)
    let total = 0
    for (const { ch, d } of visible) {
      const k = Math.min(countBelow(ch.ranks, lodAt(d, cfg.near)), cfg.max - total)
      if (k <= 0) continue
      buffer.set(ch.data.subarray(0, k * STRIDE), total * STRIDE)
      total += k
      if (total >= cfg.max) break
    }
    geo.instanceCount = total
    mesh.visible = total > 0
    if (total > 0) {
      inst.clearUpdateRanges()
      inst.addUpdateRange(0, total * STRIDE)
      inst.needsUpdate = true
    }
  }

  mesh.userData.update = update
  mesh.userData.stats = () => ({ instances: geo.instanceCount, chunks: chunks.size })
  return mesh
}
