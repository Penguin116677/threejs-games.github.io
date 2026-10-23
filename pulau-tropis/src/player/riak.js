import * as THREE from 'three'
import { ISLAND } from '../world/island.js'

// Riak air: lingkaran tipis di permukaan laut yang melebar lalu memudar — di sekitar pemain yang
// berenang, di buritan perahu yang melaju, dan di pelampung pancing. Satu kolam mesh kecil yang
// dipakai ulang (tidak membuat objek baru tiap riak).
const POOL = 14
const LIFE = 1.3 // detik

export function createRipples() {
  const group = new THREE.Group()
  group.name = 'riak-air'
  const geo = new THREE.RingGeometry(0.82, 1, 28).rotateX(-Math.PI / 2)
  const rings = []
  for (let i = 0; i < POOL; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.visible = false
    mesh.renderOrder = 3
    group.add(mesh)
    rings.push({ mesh, t: LIFE, size: 1 })
  }
  let next = 0

  return {
    object: group,
    // riak baru di (x, z); size = jari-jari akhir (m), strength = kecerahan awal 0..1
    spawn(x, z, size = 1.4, strength = 0.55) {
      const r = rings[next]
      next = (next + 1) % POOL
      r.t = 0
      r.size = size
      r.strength = strength
      r.mesh.position.set(x, ISLAND.seaLevel + 0.03, z)
      r.mesh.visible = true
    },
    update(dt) {
      for (const r of rings) {
        if (r.t >= LIFE) continue
        r.t += dt
        const k = Math.min(1, r.t / LIFE)
        r.mesh.scale.setScalar(0.25 + k * r.size)
        r.mesh.material.opacity = r.strength * (1 - k) * (1 - k)
        if (r.t >= LIFE) r.mesh.visible = false
      }
    },
  }
}
