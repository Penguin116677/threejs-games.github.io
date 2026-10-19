import * as THREE from 'three'

// Penanda gaya game strategi:
// - cincin tujuan berdenyut di titik yang diketuk (kuning = bisa, merah = tidak bisa ke sana)
// - cincin hijau di bawah prajurit, tetap terlihat walau tertutup tajuk pohon
// Keduanya mengikuti kemiringan tanah dan digambar di atas objek lain (depthTest mati).

function ringMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color, transparent: true, opacity, depthTest: false, depthWrite: false, toneMapped: false,
  })
}

const UP = new THREE.Vector3(0, 1, 0)
const normal = new THREE.Vector3()

// letakkan penanda di tanah, miring mengikuti lereng
function placeOnGround(obj, ground, x, z, lift) {
  const e = 0.6
  const h = Math.max(ground.heightAt(x, z), 0)
  normal.set(
    -(ground.heightAt(x + e, z) - ground.heightAt(x - e, z)) / (2 * e), 1,
    -(ground.heightAt(x, z + e) - ground.heightAt(x, z - e)) / (2 * e),
  ).normalize()
  if (h <= 0.001) normal.copy(UP) // di air: datar mengikuti permukaan laut
  obj.position.set(x, h + lift, z)
  obj.quaternion.setFromUnitVectors(UP, normal)
}

export function createMarkers(ground) {
  // --- cincin tujuan
  const target = new THREE.Group()
  const ringMat = ringMaterial('#ffe26a', 0.95)
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.72, 40).rotateX(-Math.PI / 2), ringMat)
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20).rotateX(-Math.PI / 2), ringMat)
  target.add(ring, dot)
  target.visible = false
  target.renderOrder = 10
  ring.renderOrder = 10
  dot.renderOrder = 10

  // --- cincin prajurit (seperti unit terpilih di game strategi)
  const self = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.68, 40).rotateX(-Math.PI / 2), ringMaterial('#6dff8a', 0.85))
  self.renderOrder = 9

  let t = 0
  let invalid = false

  return {
    objects: [target, self],
    // tunjukkan tujuan; ok = false → merah sebentar (tidak bisa ke sana)
    showTarget(x, z, ok = true) {
      placeOnGround(target, ground, x, z, 0.06)
      ringMat.color.set(ok ? '#ffe26a' : '#ff5a5a')
      ringMat.opacity = 0.95
      target.visible = true
      invalid = !ok
      t = 0
    },
    hideTarget() {
      if (!invalid) target.visible = false
    },
    update(dt, player) {
      placeOnGround(self, ground, player.position.x, player.position.z, 0.05)
      // saat melompat cincin tetap di tanah
      if (!target.visible) return
      t += dt
      const s = 1 + 0.14 * Math.sin(t * 7)
      ring.scale.setScalar(s)
      if (invalid) {
        ringMat.opacity = Math.max(0, 0.95 - t * 1.2)
        if (t > 0.8) {
          target.visible = false
          invalid = false
        }
      }
    },
  }
}
