import * as THREE from 'three'
import { buildTiles, partsFor, boatGeometry } from '../kencana/kingdom.js'
import { buildingMaterial, buildingDepthMaterial } from '../kencana/material.js'
import { forestMask } from '../biome.js'
import { scatter } from '../../core/spatial.js'
import { windMaterial, instancedTiles, standardMatrix, palmGeometry, jungleGeometry, bushGeometry } from '../trees.js'
import { rectDistance } from '../kencana/layout.js'
import { ISLE, FLAT, rajawaliDistance } from './layout.js'

// Pulau Rajawali dalam 3D: bangunan dari rencana (rencana.js) digabung per petak seperti Kencana,
// kelapa di pantai, pohon & semak jarang di pedalaman (dataran benteng & lapangan dibiarkan
// lapang), dan perahu yang bersandar di dermaga.
export function createRajawali({ ground, plan, mask, grid, quality, noiseTexture }) {
  const group = new THREE.Group()
  group.name = 'pulau-rajawali'
  const { shadows } = quality
  const mat = buildingMaterial(noiseTexture)
  const depthMat = buildingDepthMaterial()
  const built = buildTiles({ builds: plan.build, partsFor: b => partsFor(b, ground), mat, depthMat, shadows, name: 'rajawali' })
  group.add(...built.meshes)

  // ------------------------------------------------------------------- pepohonan
  const wind = windMaterial(noiseTexture)
  const d = quality.treeDensity
  const area = ISLE.rx * 1.1
  const on = (x, z) => rajawaliDistance(x, z) < 1.08
  const reserved = (x, z, r) => mask.reserved(x, z, r + 1) || FLAT.some(f => rectDistance(x, z, f) < r + 6)
  const common = { ground, grid, area, cx: ISLE.x, cz: ISLE.z, reserved }
  const kelapa = scatter({
    ...common, kind: 'kelapa', seed: 7101, radius: 1.8, count: Math.round(70 * d),
    accept: (x, z, h, slope, rand) => on(x, z) && h > 0.9 && h < 4.4 && slope < 0.3 && rand() < 0.7,
  })
  const pohon = scatter({
    ...common, kind: 'pohon', seed: 7202, radius: 2.3, count: Math.round(60 * d) + 6,
    accept: (x, z, h, slope) => on(x, z) && h > 3 && slope < 0.6 && forestMask(x, z) > 0.4,
  })
  const semak = scatter({
    ...common, kind: 'semak', seed: 7303, radius: 1.1, count: Math.round(90 * d) + 8,
    accept: (x, z, h, slope) => on(x, z) && h > 2.8 && slope < 0.7,
  })
  const trees = new THREE.Group()
  trees.name = 'pohon-rajawali'
  trees.add(
    instancedTiles('kelapa', palmGeometry(), wind, kelapa, { castShadow: shadows, receiveShadow: shadows, toMatrix: standardMatrix({ scaleMin: 0.8, scaleMax: 1.25, tilt: 0.35, tint: 0.1 }) }),
    instancedTiles('pohon-hutan', jungleGeometry(quality.canopyDetail), wind, pohon, { castShadow: shadows, receiveShadow: shadows, toMatrix: standardMatrix({ scaleMin: 0.75, scaleMax: 1.25, tilt: 0.12, tint: 0.16 }) }),
    instancedTiles('semak', bushGeometry(0, null), wind, semak, {
      castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows,
      toMatrix: standardMatrix({ scaleMin: 0.7, scaleMax: 1.4, tilt: 0.2, tint: 0.2, sink: 0.1 }),
    }),
  )
  group.add(trees)

  // ------------------------------------------------------------------- perahu di dermaga
  const boats = plan.boats.map((b, i) => ({ ...b, i, phase: (b.x * 0.31 + b.z * 0.17) % 6.28 }))
  const boatMesh = new THREE.InstancedMesh(boatGeometry('jukung'), buildingMaterial(noiseTexture, false), Math.max(1, boats.length))
  boatMesh.name = 'perahu-rajawali'
  boatMesh.castShadow = shadows
  boatMesh.receiveShadow = shadows
  boatMesh.customDepthMaterial = buildingDepthMaterial()
  boatMesh.count = boats.length
  boatMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  group.add(boatMesh)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const p = new THREE.Vector3()
  const one = new THREE.Vector3(1, 1, 1)
  function updateBoats(t) {
    for (const b of boats) {
      e.set(Math.sin(t * 0.9 + b.phase) * 0.025, b.rot, Math.sin(t * 1.1 + b.phase * 1.7) * 0.06)
      p.set(b.x, 0.12 + Math.sin(t * 1.3 + b.phase) * 0.1, b.z)
      boatMesh.setMatrixAt(b.i, m.compose(p, q.setFromEuler(e), one))
    }
    boatMesh.instanceMatrix.needsUpdate = true
  }
  updateBoats(0)
  boatMesh.computeBoundingSphere()

  const trunks = [
    ...kelapa.map(t => ({ x: t.x, z: t.z, radius: 0.45, kind: 'pohon' })),
    ...pohon.map(t => ({ x: t.x, z: t.z, radius: 0.7, kind: 'pohon' })),
  ]
  const occlusion = [
    ...plan.blocked.map(b => ({ x: b.x, z: b.z, radius: Math.max(b.hx, b.hz) + 1.5, strength: 0.25 })),
    ...pohon.map(t => ({ x: t.x, z: t.z, radius: 4.8, strength: 0.4 })),
    ...kelapa.map(t => ({ x: t.x, z: t.z, radius: 2.4, strength: 0.18 })),
    ...semak.map(t => ({ x: t.x, z: t.z, radius: 1.8, strength: 0.2 })),
  ]
  return {
    object: group,
    colliders: [...plan.colliders, ...trunks],
    surfaces: plan.surfaces,
    occlusion,
    roofs: plan.roofs,
    stats: { bangunan: plan.build.length, jenis: built.counts, pohon: kelapa.length + pohon.length + semak.length, perahu: boats.length },
    update(t) {
      updateBoats(t)
    },
  }
}
