import * as THREE from 'three'

// Kamera orang ketiga: mengikuti pemain dari belakang-atas.
// - geser (sentuh/mouse) memutar kamera, cubit/roda mouse mengatur jarak
// - saat pemain berjalan dan kamera tidak sedang diputar, kamera pelan-pelan
//   kembali ke belakang pemain (memudahkan main dengan satu jempol)
// - tidak menembus bukit atau masuk ke bawah air
const SENS_YAW = 0.0055 // radian per piksel geser
const SENS_PITCH = 0.0042
const PITCH_MIN = -0.2
const PITCH_MAX = 1.2
const DIST_MIN = 2.6
const DIST_MAX = 16
const TARGET_HEIGHT = 1.35 // titik yang dilihat: sekitar bahu karakter

const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a))

export function createFollowCamera(camera, ground) {
  const state = { yaw: 0, pitch: 0.32, dist: 7 }
  const target = new THREE.Vector3()
  const desired = new THREE.Vector3()
  const probe = new THREE.Vector3()
  let snap = true

  function offset(out, dist) {
    const cp = Math.cos(state.pitch)
    return out.set(Math.sin(state.yaw) * cp * dist, Math.sin(state.pitch) * dist, Math.cos(state.yaw) * cp * dist)
  }

  return {
    state,
    // arah "maju" di tanah menurut kamera (untuk gerakan relatif kamera)
    get yaw() {
      return state.yaw
    },
    // pindahkan kamera langsung tanpa transisi (mis. setelah respawn / ganti mode)
    snapNext() {
      snap = true
    },
    lookFrom(yaw, pitch = state.pitch, instant = true) {
      state.yaw = yaw
      state.pitch = THREE.MathUtils.clamp(pitch, PITCH_MIN, PITCH_MAX)
      snap = instant
    },
    update(dt, player, input) {
      state.yaw -= input.lookDX * SENS_YAW
      state.pitch = THREE.MathUtils.clamp(state.pitch + input.lookDY * SENS_PITCH, PITCH_MIN, PITCH_MAX)
      state.dist = THREE.MathUtils.clamp(state.dist * input.zoom, DIST_MIN, DIST_MAX)

      // ikuti arah lari bila pemain bergerak maju dan kamera tidak sedang diputar
      if (!input.lookRecent && player.speed > 0.8) {
        const behind = player.heading + Math.PI
        const diff = wrapAngle(behind - state.yaw)
        if (Math.abs(diff) < 1.9) {
          const rate = 0.9 * Math.min(1, player.speed / 5)
          state.yaw += THREE.MathUtils.clamp(diff, -rate * dt, rate * dt)
        }
      }

      // titik yang dilihat diperhalus agar guncangan kecil (langkah, lompat) tidak membuat pusing
      const tx = player.position.x
      const ty = player.position.y + TARGET_HEIGHT
      const tz = player.position.z
      if (snap) target.set(tx, ty, tz)
      else {
        const k = 1 - Math.exp(-14 * dt)
        target.x += (tx - target.x) * k
        target.z += (tz - target.z) * k
        target.y += (ty - target.y) * (1 - Math.exp(-7 * dt))
      }

      // jarak dipendekkan bila ada bukit di antara pemain dan kamera
      let { dist } = state
      for (let i = 1; i <= 6; i++) {
        const f = i / 6
        offset(probe, dist * f).add(target)
        const floor = Math.max(ground.heightAt(probe.x, probe.z), 0) + 0.45
        if (probe.y < floor) {
          dist = Math.max(DIST_MIN * 0.6, dist * (f - 1 / 6))
          break
        }
      }
      offset(desired, dist).add(target)
      // jangan pernah di bawah tanah atau di bawah permukaan air
      const floor = Math.max(ground.heightAt(desired.x, desired.z), 0) + 0.5
      if (desired.y < floor) desired.y = floor

      if (snap) camera.position.copy(desired)
      else camera.position.lerp(desired, 1 - Math.exp(-12 * dt))
      camera.lookAt(target)
      snap = false
    },
  }
}
