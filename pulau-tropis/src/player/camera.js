import * as THREE from 'three'

// Kamera gaya game strategi: melihat prajurit dari atas dengan sudut tinggi.
// - geser (sentuh/mouse) memutar kamera mengelilingi prajurit
// - cubit / roda mouse untuk zoom; makin jauh, kamera makin tegak ke bawah
// - kamera tidak berputar sendiri (arah layar tetap selama tidak digeser)
const SENS_YAW = 0.006 // radian per piksel geser
const DIST_MIN = 10
const DIST_MAX = 60
const DIST_DEFAULT = 22
const PITCH_NEAR = 0.85 // ±49° dari bidang datar saat dekat
const PITCH_FAR = 1.12 // ±64° saat jauh
const TARGET_HEIGHT = 0.8
const SHAKE_TIME = 0.3 // detik

export function createStrategyCamera(camera, ground) {
  const state = { yaw: 0, dist: DIST_DEFAULT }
  const target = new THREE.Vector3()
  const desired = new THREE.Vector3()
  let snap = true
  let shakeT = 0
  let shakeA = 0

  const pitch = () => PITCH_NEAR + (PITCH_FAR - PITCH_NEAR) * (state.dist - DIST_MIN) / (DIST_MAX - DIST_MIN)

  return {
    state,
    // arah kamera di bidang datar (dipakai untuk gerak keyboard relatif layar)
    get yaw() {
      return state.yaw
    },
    // atur arah kamera; instant = pindah langsung tanpa transisi (mis. setelah respawn)
    lookFrom(yaw, instant = true) {
      state.yaw = yaw
      snap = instant
    },
    // guncangan singkat (mis. Hentakan); amount = simpangan terbesar (m)
    shake(amount) {
      shakeA = Math.max(shakeA * (shakeT / SHAKE_TIME), amount)
      shakeT = SHAKE_TIME
    },
    update(dt, focus, input) {
      state.yaw -= input.lookDX * SENS_YAW
      state.dist = THREE.MathUtils.clamp(state.dist * input.zoom, DIST_MIN, DIST_MAX)

      const tx = focus.x
      const ty = focus.y + TARGET_HEIGHT
      const tz = focus.z
      if (snap) target.set(tx, ty, tz)
      else {
        const k = 1 - Math.exp(-10 * dt)
        target.x += (tx - target.x) * k
        target.z += (tz - target.z) * k
        target.y += (ty - target.y) * (1 - Math.exp(-5 * dt))
      }

      const p = pitch()
      const cp = Math.cos(p)
      desired.set(
        target.x + Math.sin(state.yaw) * cp * state.dist,
        target.y + Math.sin(p) * state.dist,
        target.z + Math.cos(state.yaw) * cp * state.dist,
      )
      // tetap di atas bukit (mis. saat prajurit di kaki gunung)
      const floor = Math.max(ground.surfaceAt(desired.x, desired.z), 0) + 3
      if (desired.y < floor) desired.y = floor

      if (snap) camera.position.copy(desired)
      else camera.position.lerp(desired, 1 - Math.exp(-10 * dt))
      if (shakeT > 0) {
        shakeT = Math.max(0, shakeT - dt)
        const s = 2 * shakeA * (shakeT / SHAKE_TIME)
        camera.position.x += (Math.random() - 0.5) * s
        camera.position.y += (Math.random() - 0.5) * s
        camera.position.z += (Math.random() - 0.5) * s
      }
      camera.lookAt(target)
      snap = false
    },
  }
}
