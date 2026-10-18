import * as THREE from 'three'
import { ISLAND, heightAt } from './island.js'
import { meadowAmount } from './biome.js'

// ---------------------------------------------------------------------------
// Data tanah: grid tinggi yang SAMA dengan mesh yang digambar.
// ground.heightAt(x, z) mengembalikan tinggi permukaan mesh yang sebenarnya
// (interpolasi segitiga persis seperti PlaneGeometry), sehingga pohon, batu,
// rumput, dan nanti karakter (Milestone 2) berdiri tepat di atas tanah —
// tidak melayang atau tenggelam seperti bila memakai fungsi noise langsung.
// ---------------------------------------------------------------------------
export function createGround(segments) {
  const { size } = ISLAND
  const n = segments + 1
  const step = size / segments
  const half = size / 2
  const heights = new Float32Array(n * n)
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++)
      heights[j * n + i] = heightAt(-half + i * step, -half + j * step)

  function groundHeight(x, z) {
    const fx = (x + half) / step
    const fz = (z + half) / step
    if (fx < 0 || fz < 0 || fx >= segments || fz >= segments) return heightAt(x, z)
    const ix = Math.floor(fx)
    const iz = Math.floor(fz)
    const u = fx - ix
    const v = fz - iz
    const a = heights[iz * n + ix]
    const b = heights[(iz + 1) * n + ix]
    const c = heights[(iz + 1) * n + ix + 1]
    const d = heights[iz * n + ix + 1]
    if (u + v <= 1) return a + (d - a) * u + (b - a) * v
    return c + (b - c) * (1 - u) + (d - c) * (1 - v)
  }

  // kemiringan (naik per meter datar)
  function slopeAt(x, z) {
    const h = groundHeight(x, z)
    return Math.hypot(groundHeight(x + 1, z) - h, groundHeight(x, z + 1) - h)
  }

  return { size, segments, step, half, n, heights, heightAt: groundHeight, slopeAt }
}

// ---------------------------------------------------------------------------
// Shader tanah: warna dihitung per piksel (bukan per vertex) dari tinggi,
// kemiringan, dan tekstur noise → batas pasir/rumput/batu tajam dan bertekstur.
// Dibangun di atas MeshLambertMaterial agar tetap dapat cahaya, kabut, dan bayangan.
// ---------------------------------------------------------------------------
const vertexPars = /* glsl */`
attribute vec2 aSurface; // x = oklusi (gelap di bawah pohon), y = padang rumput
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;
`

const fragmentPars = /* glsl */`
uniform sampler2D uNoise;
uniform float uBeachTop;
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;

const vec3 DEEP_SAND = vec3(0.47, 0.37, 0.22);
const vec3 WET_SAND = vec3(0.62, 0.50, 0.30);
const vec3 SAND = vec3(0.83, 0.72, 0.47);
const vec3 GRASS = vec3(0.24, 0.47, 0.12);
const vec3 GRASS_DARK = vec3(0.11, 0.30, 0.08);
const vec3 MEADOW = vec3(0.32, 0.52, 0.12);
const vec3 DRY = vec3(0.60, 0.58, 0.26);
const vec3 ROCK = vec3(0.42, 0.39, 0.35);
const vec3 ROCK_DARK = vec3(0.26, 0.24, 0.22);

vec3 terrainColor() {
  vec2 p = vWorldPos.xz;
  float h = vWorldPos.y;
  float slope = 1.0 - clamp(normalize(vWorldNrm).y, 0.0, 1.0);
  float nF = texture2D(uNoise, p * 0.055).r;     // butiran ±0.5 m
  float nM = texture2D(uNoise, p * 0.0173).g;    // variasi ±10 m
  float nL = texture2D(uNoise, p * 0.0037).b;    // bercak besar ±60 m

  // pasir: basah di tepi air, kering di atasnya, lebih gelap di dasar laut
  vec3 sand = mix(WET_SAND, SAND, smoothstep(-0.2, 1.0, h + (nM - 0.5) * 0.8));
  sand = mix(DEEP_SAND, sand, smoothstep(-6.0, -0.3, h));
  sand *= 0.9 + 0.2 * nF;

  // rumput/hutan: bercak terang-gelap, lebih kekuningan di padang sekitar gunung
  vec3 grass = mix(GRASS, GRASS_DARK, smoothstep(0.3, 0.75, nL + (nM - 0.5) * 0.4));
  grass = mix(grass, MEADOW, vSurface.y * 0.7);
  grass = mix(grass, DRY, vSurface.y * smoothstep(0.55, 0.85, nM) * 0.45);
  grass *= 0.86 + 0.28 * nF;

  // batu: lereng curam dan dekat puncak
  vec3 rock = mix(ROCK, ROCK_DARK, smoothstep(0.3, 0.8, nM));
  rock *= 0.8 + 0.4 * nF;

  float edge = uBeachTop + (nM - 0.5) * 1.6;
  vec3 col = mix(sand, grass, smoothstep(edge - 0.3, edge + 0.3, h));
  float rocky = max(
    smoothstep(0.32, 0.42, slope + (nM - 0.5) * 0.12),
    smoothstep(70.0, 80.0, h + (nL - 0.5) * 14.0)
  );
  rocky *= smoothstep(uBeachTop, uBeachTop + 1.5, h);
  col = mix(col, rock, rocky);

  return col * vSurface.x;
}
`

export function createTerrain(ground, { noiseTexture, quality }) {
  const { segments, n, heights, half, step } = ground
  const geo = new THREE.PlaneGeometry(ground.size, ground.size, segments, segments)
  geo.rotateX(-Math.PI / 2)
  geo.deleteAttribute('uv')

  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) pos.setY(i, heights[i])
  geo.computeVertexNormals()

  // aSurface: oklusi (diisi pohon nanti) + seberapa padang rumput
  const surface = new Float32Array(pos.count * 2)
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) {
      const k = j * n + i
      surface[k * 2] = 1
      surface[k * 2 + 1] = meadowAmount(-half + i * step, -half + j * step, heights[k])
    }
  const surfaceAttr = new THREE.BufferAttribute(surface, 2)
  geo.setAttribute('aSurface', surfaceAttr)
  geo.computeBoundingSphere()

  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  mat.onBeforeCompile = shader => {
    shader.uniforms.uNoise = { value: noiseTexture }
    shader.uniforms.uBeachTop = { value: ISLAND.beachTop }
    shader.vertexShader = vertexPars + shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
      vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
      vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);
      vSurface = aSurface;`
    )
    shader.fragmentShader = fragmentPars + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      diffuseColor.rgb *= terrainColor();`
    )
  }

  const mesh = new THREE.Mesh(geo, mat)
  mesh.name = 'terrain'
  mesh.receiveShadow = quality.shadows

  // Gelapkan tanah di bawah pohon/batu (oklusi palsu yang murah).
  // items: [{ x, z, radius, strength }]
  mesh.userData.applyOcclusion = items => {
    for (const it of items) {
      const r = it.radius
      const i0 = Math.max(0, Math.floor((it.x - r + half) / step))
      const i1 = Math.min(n - 1, Math.ceil((it.x + r + half) / step))
      const j0 = Math.max(0, Math.floor((it.z - r + half) / step))
      const j1 = Math.min(n - 1, Math.ceil((it.z + r + half) / step))
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) {
          const dx = -half + i * step - it.x
          const dz = -half + j * step - it.z
          const t = 1 - (dx * dx + dz * dz) / (r * r)
          if (t <= 0) continue
          const k = (j * n + i) * 2
          surface[k] = Math.max(0.5, surface[k] * (1 - it.strength * t * t))
        }
    }
    surfaceAttr.needsUpdate = true
  }
  return mesh
}

// Tekstur kedalaman air (0 = dangkal/daratan, 1 = dalam ≥ 20 m) untuk shader laut:
// dipakai untuk warna toska di perairan dangkal dan buih di garis pantai.
export function createDepthTexture(res = 256) {
  const data = new Uint8Array(res * res * 4)
  const half = ISLAND.size / 2
  for (let j = 0; j < res; j++)
    for (let i = 0; i < res; i++) {
      const x = -half + (i + 0.5) / res * ISLAND.size
      const z = -half + (j + 0.5) / res * ISLAND.size
      const depth = Math.min(1, Math.max(0, (ISLAND.seaLevel - heightAt(x, z)) / 20))
      const k = (j * res + i) * 4
      data[k] = Math.round(depth * 255)
      data[k + 1] = 0
      data[k + 2] = 0
      data[k + 3] = 255
    }
  const tex = new THREE.DataTexture(data, res, res, THREE.RGBAFormat, THREE.UnsignedByteType)
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearFilter
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
  tex.needsUpdate = true
  return tex
}
