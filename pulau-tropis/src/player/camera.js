import * as THREE from 'three'
import { ISLAND } from '../world/island.js'

// Kamera orang ketiga: mengikuti karakter dari BELAKANG, sedikit di atas bahunya.
// - posisinya selalu mengikuti karakter (berjalan maju = kamera tetap di belakangnya), tetapi ARAHNYA
//   hanya diputar pemain sendiri: geser (sentuh/mouse) = kiri-kanan & naik-turun, cubit / roda mouse
//   = jarak. Saat karakter berbelok atau berbalik, kamera TIDAK ikut berputar sendiri (permintaan
//   pengguna, v0.15.0). Arah "maju" joystick selalu arah pandang kamera.
// - tidak menembus bukit dan tidak masuk ke bawah permukaan air
// - di dalam ruangan (gua, aula, kedai) tetap di bawah langit-langit dan di dalam dindingnya; dari
//   luar, atap gua (permukaan gunung di atas rongganya) dianggap tanah (lihat setVolumes)
const SENS_YAW = 0.0058 // radian per piksel geser
const SENS_PITCH = 0.0045
const PITCH_MIN = -0.12 // sedikit dari bawah (melihat ke atas)
const PITCH_MAX = 1.2
const PITCH_DEFAULT = 0.36 // ±21° dari bidang datar
const DIST_MIN = 2.8
const DIST_MAX = 18
const DIST_DEFAULT = 8.2
const LOOK_HEIGHT = 1.3 // titik putar kamera: setinggi kepala karakter (tinggi badan ±1,3 m)
const LIFT = 0.06 // titik yang dilihat sedikit di atas kepala (× jarak): karakter agak di bawah tengah layar
const SHAKE_TIME = 0.3 // detik

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
  // volumes (opsional): { roofAt(x, z), inCave(x, z, y), roomAt(x, z, y) → { rect, ceil } | null }
  let volumes = null
  let pivotY = 0
  let inCave = false
  let room = null
  let covered = false // ada lantai bangunan tepat di atas pemain (mis. di tangga di bawah lempeng)
  // lantai: tanah + lantai bangunan (saat pemain di bawah lantai lain: hanya yang tidak lebih tinggi
  // dari titik putar), dan atap gua bila pemain di luar gua
  const floorAt = (x, z) => {
    let f = Math.max(covered ? ground.supportAt(x, z, pivotY, 0.5) : ground.surfaceAt(x, z), ISLAND.seaLevel)
    if (volumes && !inCave) f = Math.max(f, volumes.roofAt(x, z))
    return f
  }
  const ceilAt = (x, z) => {
    let c = covered ? ground.ceilingAt(x, z, pivotY + 0.5) : Infinity
    if (inCave) {
      const r = volumes.roofAt(x, z)
      if (r > -Infinity) c = Math.min(c, r)
    }
    if (room) c = Math.min(c, room.ceil)
    return c
  }

  return {
    state,
    setVolumes(v) {
      volumes = v
    },
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
    // target: { position, height? (titik putar di atas kaki), distScale? (pengali jarak, mis. saat
    // naik perahu) }
    update(dt, target, input) {
      state.yaw -= input.lookDX * SENS_YAW
      state.pitch = THREE.MathUtils.clamp(state.pitch + (input.lookDY || 0) * SENS_PITCH, PITCH_MIN, PITCH_MAX)
      state.dist = THREE.MathUtils.clamp(state.dist * input.zoom, DIST_MIN, DIST_MAX)

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

      pivotY = pivot.y
      covered = ground.ceilingAt(p.x, p.z, pivotY) < Infinity
      inCave = !!volumes?.inCave(p.x, p.z, p.y)
      room = volumes?.roomAt(p.x, p.z, p.y) ?? null
      // jarak dipendekkan bila ada bukit / lantai / langit-langit / dinding ruangan di antara
      // karakter dan kamera
      let dist = state.dist * (target.distScale ?? 1)
      for (let i = 1; i <= 8; i++) {
        const f = i / 8
        offset(probe, dist * f).add(pivot)
        const out = room && (probe.x < room.rect.x0 + 0.4 || probe.x > room.rect.x1 - 0.4 || probe.z < room.rect.z0 + 0.4 || probe.z > room.rect.z1 - 0.4)
        if (out || probe.y < floorAt(probe.x, probe.z) + 0.35 || probe.y > ceilAt(probe.x, probe.z) - 0.35) {
          dist = Math.max(DIST_MIN * 0.5, dist * (f - 1 / 8))
          break
        }
      }
      offset(desired, dist).add(pivot)
      if (room) {
        desired.x = THREE.MathUtils.clamp(desired.x, room.rect.x0 + 0.4, room.rect.x1 - 0.4)
        desired.z = THREE.MathUtils.clamp(desired.z, room.rect.z0 + 0.4, room.rect.z1 - 0.4)
      }
      // jangan pernah di bawah tanah / air, dan di dalam ruangan jangan menembus langit-langit
      const floor = floorAt(desired.x, desired.z) + 0.45
      if (desired.y < floor) desired.y = floor
      const ceil = ceilAt(desired.x, desired.z) - 0.4
      if (desired.y > ceil) desired.y = Math.max(floor, ceil)

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
