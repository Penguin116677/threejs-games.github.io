import * as THREE from 'three'
import { caveFloor, frostSurface, CAVE_BOX } from './height.js'
import { ROOF_MIN } from './layout.js'

// Gua Es Kristal = rongga di tanah bergrid (lantainya dikeruk di height.js) yang ditutup ATAP:
// permukaan gunung aslinya, digambar dua kali dari grid yang sama dengan terrain —
//   atas  : bahan terrain biasa (dari luar gunung tampak utuh, menyatu dengan tanah sekitarnya)
//   bawah : langit-langit gua (batu biru gelap berbintik kristal) dilihat dari dalam
// Titik grid yang tinggi rongganya < ROOF_MIN dibiarkan terbuka (mulut gua, lubang tangga).
// Pagar tak terlihat (penghalang berbatas tinggi) di titik luar yang bersebelahan dengan atap:
// menahan siapa pun yang berjalan DI ATAS gunung supaya tidak melangkah ke atap (jatuh menembus),
// tanpa menghalangi yang berjalan di lantai gua di bawahnya.

const ceilingVertex = /* glsl */`
varying vec3 vCaveWorld;
`
const ceilingFragment = /* glsl */`
uniform sampler2D uNoise;
varying vec3 vCaveWorld;
`

export function createCave({ ground, terrainMaterial, noiseTexture, shadows }) {
  const { step, x0, z0, nx, nz } = ground
  const i0 = Math.max(0, Math.floor((CAVE_BOX.x0 - x0) / step) - 2)
  const i1 = Math.min(nx, Math.ceil((CAVE_BOX.x1 - x0) / step) + 2)
  const j0 = Math.max(0, Math.floor((CAVE_BOX.z0 - z0) / step) - 2)
  const j1 = Math.min(nz, Math.ceil((CAVE_BOX.z1 - z0) / step) + 2)
  const w = i1 - i0 + 1
  const d = j1 - j0 + 1
  const orig = new Float32Array(w * d) // permukaan gunung asli (atap)
  const foot = new Uint8Array(w * d) // 1 = di dalam rongga, 2 = di dalam rongga & beratap
  for (let j = 0; j < d; j++)
    for (let i = 0; i < w; i++) {
      const x = x0 + (i0 + i) * step
      const z = z0 + (j0 + j) * step
      const k = j * w + i
      orig[k] = frostSurface(x, z)
      const f = caveFloor(x, z)
      if (f !== null) foot[k] = orig[k] - f >= ROOF_MIN ? 2 : 1
    }

  // ------------------------------------------------------------------ atap (sel yang menyentuh titik beratap)
  const roofCell = new Uint8Array(w * d)
  const pos = []
  const nor = []
  const index = []
  const vmap = new Int32Array(w * d).fill(-1)
  const normalAt = (i, j, out) => {
    const k = j * w + i
    const hx = (orig[Math.min(w - 1, i + 1) + j * w] - orig[Math.max(0, i - 1) + j * w]) / (2 * step)
    const hz = (orig[i + Math.min(d - 1, j + 1) * w] - orig[i + Math.max(0, j - 1) * w]) / (2 * step)
    const l = Math.hypot(hx, 1, hz)
    out[0] = -hx / l
    out[1] = 1 / l
    out[2] = -hz / l
    return k
  }
  const n3 = [0, 0, 0]
  const vert = (i, j) => {
    const k = j * w + i
    if (vmap[k] < 0) {
      vmap[k] = pos.length / 3
      pos.push(x0 + (i0 + i) * step, orig[k], z0 + (j0 + j) * step)
      normalAt(i, j, n3)
      nor.push(n3[0], n3[1], n3[2])
    }
    return vmap[k]
  }
  for (let j = 0; j < d - 1; j++)
    for (let i = 0; i < w - 1; i++) {
      const a = j * w + i
      const b = a + w
      if (!(foot[a] === 2 || foot[a + 1] === 2 || foot[b] === 2 || foot[b + 1] === 2)) continue
      // sel yang menyentuh titik rongga terbuka (mulut gua, lubang tangga) tidak beratap: tepi atap
      // berhenti setinggi ≥ ROOF_MIN di atas lantai, jadi bukaannya tidak tertutup lereng atap
      if (foot[a] === 1 || foot[a + 1] === 1 || foot[b] === 1 || foot[b + 1] === 1) continue
      roofCell[a] = 1
      // pembagian segitiga sama dengan terrain (a, b, a+1) lalu (b, b+1, a+1); segitiga yang
      // seluruh titiknya di luar rongga sama persis dengan terrain → dilewati (tanpa z-fighting)
      for (const [p, q, r] of [[a, b, a + 1], [b, b + 1, a + 1]]) {
        if (!foot[p] && !foot[q] && !foot[r]) continue
        const v = [p, q, r].map(k => vert(k % w, Math.floor(k / w)))
        index.push(v[0], v[1], v[2])
      }
    }
  const top = new THREE.BufferGeometry()
  top.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  top.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3))
  const surf = new Float32Array((pos.length / 3) * 2)
  for (let v = 0; v < surf.length; v += 2) surf[v] = 1
  top.setAttribute('aSurface', new THREE.BufferAttribute(surf, 2))
  top.setIndex(index)
  top.computeBoundingSphere()
  // sisi bawah: titik yang sama, urutan terbalik, normal menghadap ke bawah
  const under = new THREE.BufferGeometry()
  under.setAttribute('position', top.attributes.position)
  under.setAttribute('normal', new THREE.Float32BufferAttribute(nor.map(v => -v), 3))
  const rev = []
  for (let t = 0; t < index.length; t += 3) rev.push(index[t], index[t + 2], index[t + 1])
  under.setIndex(rev)
  under.computeBoundingSphere()

  const group = new THREE.Group()
  group.name = 'gua-es'
  const roofTop = new THREE.Mesh(top, terrainMaterial)
  roofTop.name = 'atap-gua'
  roofTop.castShadow = shadows // gunung di atas gua membayangi lantai gua
  roofTop.receiveShadow = false
  const ceilMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  ceilMat.onBeforeCompile = shader => {
    shader.uniforms.uNoise = { value: noiseTexture }
    shader.vertexShader = ceilingVertex + shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
      vCaveWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`
    )
    shader.fragmentShader = ceilingFragment + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      vec3 cp = vCaveWorld;
      float n1 = texture2D(uNoise, cp.xz * 0.07 + cp.y * 0.03).r;
      float n2 = texture2D(uNoise, cp.xz * 0.31 - cp.y * 0.11).g;
      vec3 rock = mix(vec3(0.16, 0.2, 0.27), vec3(0.34, 0.42, 0.52), smoothstep(0.3, 0.75, n1));
      rock = mix(rock, vec3(0.62, 0.78, 0.9), smoothstep(0.72, 0.9, n2) * 0.6);
      diffuseColor.rgb *= rock;`
    ).replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      // bintik kristal kecil yang bercahaya di langit-langit
      float sp = texture2D(uNoise, cp.xz * 0.53 + cp.y * 0.19).r;
      totalEmissiveRadiance += vec3(0.35, 0.75, 1.0) * smoothstep(0.95, 0.99, sp) * 0.9;`
    )
  }
  const ceiling = new THREE.Mesh(under, ceilMat)
  ceiling.name = 'langit-langit-gua'
  ceiling.receiveShadow = false
  group.add(roofTop, ceiling)

  // ------------------------------------------------------------------ pagar di atas gunung
  const fences = []
  const fenced = new Uint8Array(w * d)
  for (let j = 1; j < d - 1; j++)
    for (let i = 1; i < w - 1; i++) {
      const k = j * w + i
      if (foot[k] !== 2) continue
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
        const n = (j + dj) * w + (i + di)
        if (foot[n] || fenced[n]) continue
        fenced[n] = 1
        fences.push({ x: x0 + (i0 + i + di) * step, z: z0 + (j0 + j + dj) * step, hx: step / 2, hz: step / 2, rot: 0, kind: 'batu', y0: orig[n] - 1, y1: 1e4 })
      }
    }

  // ------------------------------------------------------------------ kegelapan: jarak ke bukaan
  // BFS dari titik rongga yang tak beratap (mulut, lubang tangga) melewati titik beratap
  const dist = new Float32Array(w * d).fill(Infinity)
  const queue = []
  for (let k = 0; k < w * d; k++) if (foot[k] === 1) {
    dist[k] = 0
    queue.push(k)
  }
  for (let q = 0; q < queue.length; q++) {
    const k = queue[q]
    const i = k % w
    const j = Math.floor(k / w)
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ii = i + di
      const jj = j + dj
      if (ii < 0 || jj < 0 || ii >= w || jj >= d) continue
      const n = jj * w + ii
      if (!foot[n] || dist[n] <= dist[k] + step) continue
      dist[n] = dist[k] + step
      queue.push(n)
    }
  }
  const nearest = (x, z) => {
    const i = Math.round((x - x0) / step) - i0
    const j = Math.round((z - z0) / step) - j0
    return i < 0 || j < 0 || i >= w || j >= d ? -1 : j * w + i
  }
  // tinggi atap di (x, z) (interpolasi segitiga seperti terrain), −Infinity bila tidak beratap
  function roofAt(x, z) {
    const fx = (x - x0) / step - i0
    const fz = (z - z0) / step - j0
    if (fx < 0 || fz < 0 || fx >= w - 1 || fz >= d - 1) return -Infinity
    const i = Math.floor(fx)
    const j = Math.floor(fz)
    if (!roofCell[j * w + i]) return -Infinity
    const u = fx - i
    const v = fz - j
    const a = orig[j * w + i]
    const b = orig[(j + 1) * w + i]
    const c = orig[(j + 1) * w + i + 1]
    const dd = orig[j * w + i + 1]
    if (u + v <= 1) return a + (dd - a) * u + (b - a) * v
    return c + (b - c) * (1 - u) + (dd - c) * (1 - v)
  }
  return {
    object: group,
    fences,
    roofAt,
    // apakah titik kaki (x, y, z) berada di dalam gua (di bawah atap)
    inside(x, z, y) {
      const k = nearest(x, z)
      if (k < 0 || !foot[k]) return false
      const r = roofAt(x, z)
      return r > -Infinity && y < r - 1.5
    },
    // 0 = dekat bukaan, 1 = jauh di dalam gua (gelap)
    darkness(x, z) {
      const k = nearest(x, z)
      if (k < 0 || !foot[k] || dist[k] === Infinity) return 0
      return Math.min(1, Math.max(0, (dist[k] - 4) / 22))
    },
    stats: { atap: index.length / 3, pagar: fences.length, sel: foot.reduce((n, f) => n + (f ? 1 : 0), 0) },
  }
}
