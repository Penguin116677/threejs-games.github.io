import * as THREE from 'three'
import { ISLAND, heightAt } from './island.js'
import { fbm, smoothstep } from '../core/noise.js'

const C = {
  deepSand: new THREE.Color('#b59a6a'),
  wetSand: new THREE.Color('#d2b77f'),
  sand: new THREE.Color('#ecdcaa'),
  grass: new THREE.Color('#5fa63a'),
  jungle: new THREE.Color('#2f7a2c'),
  rock: new THREE.Color('#857a6c'),
  darkRock: new THREE.Color('#5d564e'),
}

const tmp = new THREE.Color()

function colorFor(h, slope, x, z, out) {
  const n = fbm(x * 0.02, z * 0.02, 3, 5)

  if (h < -0.3) {
    out.copy(C.deepSand).lerp(C.wetSand, smoothstep(-8, -0.3, h))
  } else if (h < ISLAND.beachTop) {
    out.copy(C.wetSand).lerp(C.sand, smoothstep(-0.3, 0.8, h))
  } else {
    // vegetasi: campuran rumput terang dan hutan gelap
    out.copy(C.grass).lerp(C.jungle, smoothstep(0.35, 0.65, n))
    // peralihan pasir → rumput
    out.lerp(C.sand, 1 - smoothstep(ISLAND.beachTop, ISLAND.beachTop + 1.6, h))
    // batu di lereng curam dan puncak tinggi
    const rocky = Math.max(smoothstep(0.55, 0.85, slope), smoothstep(48, 62, h))
    tmp.copy(C.rock).lerp(C.darkRock, n)
    out.lerp(tmp, rocky)
  }
  // variasi warna halus agar tidak datar
  const v = 0.92 + 0.16 * fbm(x * 0.15, z * 0.15, 2, 9)
  out.multiplyScalar(v)
}

export function createTerrain(segments) {
  const geo = new THREE.PlaneGeometry(ISLAND.size, ISLAND.size, segments, segments)
  geo.rotateX(-Math.PI / 2)

  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++)
    pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)))

  geo.computeVertexNormals()

  const nor = geo.attributes.normal
  const colors = new Float32Array(pos.count * 3)
  const col = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    const slope = 1 - nor.getY(i)
    colorFor(pos.getY(i), slope * 2.2, pos.getX(i), pos.getZ(i), col)
    colors[i * 3] = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeBoundingSphere()

  const mat = new THREE.MeshLambertMaterial({ vertexColors: true })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.name = 'terrain'
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
