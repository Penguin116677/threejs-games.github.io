import * as THREE from 'three'
import { ISLAND } from '../world/island.js'

// Kamera orang ketiga: mengikuti karakter dari BELAKANG, sedikit di atas bahunya.
// - geser (sentuh/mouse) memutar kamera kiri-kanan & naik-turun; cubit / roda mouse mengatur jarak
// - saat karakter bergerak dan kamera tidak sedang diputar, kamera pelan-pelan kembali ke belakang
//   karakter — arah "maju" joystick selalu arah pandang kamera
// - tidak menembus bukit dan tidak masuk ke bawah permukaan air
const SENS_YAW = 0.0058 // radian per piksel geser
const SENS_PITCH = 0.0045
const PITCH_MIN = -0.12 // sedikit dari bawah (melihat ke atas)
const PITCH_MAX = 1.2
const PITCH_DEFAULT = 0.36 // ±21° dari bidang datar
const DIST_MIN = 2.8
const DIST_MAX = 18
const DIST_DEFAULT = 8.2
const LOOK_HEIGHT = 1.5 // titik putar kamera: sekitar bahu karakter (tinggi badan ±1,55 m)
const LIFT = 0.06 // titik yang dilihat sedikit di atas kepala (× jarak): karakter agak di bawah tengah layar
// kembali ke belakang karakter: radian/detik terbesar (saat berlari menjauhi kamera), kelancaran,
// kecepatan karakter minimum. Makin menyamping arah larinya, makin pelan kamera berputar (dikali
// cos selisih arah) — kalau tidak, menahan joystick ke kanan membuat karakter berlari berputar-putar
// dalam lingkaran kecil; berlari ke arah kamera tidak memutarnya sama sekali
const FOLLOW = { rate: 1.0, ease: 2.4, minSpeed: 0.8 }
const SHAKE_TIME = 0.3 // detik

const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a))

export function createFollowCamera(camera, ground) {
  const state = { yaw: 0, pitch: PITCH_DEFAULT, dist: DIST_DEFAULT }
  const pivot = new THREE.Vector3()
  const desired = new THREE.Vector3()
  const probe = new THREE.Vector3()
  const look = new THREE.Vector3()
  let snap = true
  let shakeT = 0
  let shakeA = 0

  function offset(out, dist) {
    const cp = Math.cos(state.pitch)
    return out.set(Math.sin(state.yaw) * cp * dist, Math.sin(state.pitch) * dist, Math.cos(state.yaw) * cp * dist)
  }
  const floorAt = (x, z) => Math.max(ground.surfaceAt(x, z), ISLAND.seaLevel)

  return {
    state,
    // arah kamera di bidang datar (gerak joystick/keyboard relatif terhadap kamera)
    get yaw() {
      return state.yaw
    },
    // atur arah kamera; instant = pindah langsung tanpa transisi (mis. setelah respawn)
    lookFrom(yaw, instant = true, pitch = state.pitch) {
      state.yaw = yaw
      state.pitch = THREE.MathUtils.clamp(pitch, PITCH_MIN, PITCH_MAX)
      snap = instant
    },
    // guncangan singkat (mis. Hentakan); amount = simpangan terbesar (m)
    shake(amount) {
      shakeA = Math.max(shakeA * (shakeT / SHAKE_TIME), amount)
      shakeT = SHAKE_TIME
    },
    // target: { position, heading, speed, height? (titik putar di atas kaki), distScale? (pengali
    // jarak, mis. saat naik perahu) }
    update(dt, target, input) {
      state.yaw -= input.lookDX * SENS_YAW
      state.pitch = THREE.MathUtils.clamp(state.pitch + (input.lookDY || 0) * SENS_PITCH, PITCH_MIN, PITCH_MAX)
      state.dist = THREE.MathUtils.clamp(state.dist * input.zoom, DIST_MIN, DIST_MAX)

      // ikuti arah gerak bila kamera tidak sedang/baru saja diputar
      if (!input.lookRecent && (target.speed || 0) > FOLLOW.minSpeed) {
        const diff = wrapAngle(target.heading + Math.PI - state.yaw)
        const rate = FOLLOW.rate * Math.max(0, Math.cos(diff)) * Math.min(1, target.speed / 4)
        state.yaw += Math.sign(diff) * Math.min(Math.abs(diff) * FOLLOW.ease, rate) * dt
      }

      // titik putar diperhalus agar guncangan kecil (langkah, lompat) tidak membuat pusing
      const p = target.position
      const tx = p.x
      const ty = p.y + (target.height ?? LOOK_HEIGHT)
      const tz = p.z
      if (snap) pivot.set(tx, ty, tz)
      else {
        const k = 1 - Math.exp(-14 * dt)
        pivot.x += (tx - pivot.x) * k
        pivot.z += (tz - pivot.z) * k
        pivot.y += (ty - pivot.y) * (1 - Math.exp(-7 * dt))
      }

      // jarak dipendekkan bila ada bukit / lantai di antara karakter dan kamera
      let dist = state.dist * (target.distScale ?? 1)
      for (let i = 1; i <= 8; i++) {
        const f = i / 8
        offset(probe, dist * f).add(pivot)
        if (probe.y < floorAt(probe.x, probe.z) + 0.35) {
          dist = Math.max(DIST_MIN * 0.5, dist * (f - 1 / 8))
          break
        }
      }
      offset(desired, dist).add(pivot)
      // jangan pernah di bawah tanah atau di bawah permukaan air
      const floor = floorAt(desired.x, desired.z) + 0.45
      if (desired.y < floor) desired.y = floor

      if (snap) camera.position.copy(desired)
      else camera.position.lerp(desired, 1 - Math.exp(-12 * dt))
      if (shakeT > 0) {
        shakeT = Math.max(0, shakeT - dt)
        const s = 2 * shakeA * (shakeT / SHAKE_TIME)
        camera.position.x += (Math.random() - 0.5) * s
        camera.position.y += (Math.random() - 0.5) * s
        camera.position.z += (Math.random() - 0.5) * s
      }
      camera.lookAt(look.copy(pivot).setY(pivot.y + LIFT * dist))
      snap = false
    },
  }
}
