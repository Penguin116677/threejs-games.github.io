import * as THREE from 'three'
import { ISLAND } from '../world/island.js'
import { insideWorld } from '../world/world.js'

// Perahu pemain: jukung bercadik (bentuknya sama dengan perahu nelayan Kencana) yang dibuat sendiri
// dari kayu di tepi pantai, lewat Tas atau tombol "Buat perahu". Pulau-pulau tidak tersambung
// jembatan, jadi perahu (atau berenang) adalah cara menyeberang ke Kencana dan Aeloria.
// - Naik: dekat perahu (dari darat, dermaga, atau sambil berenang) → tombol "Naik perahu".
// - Mengemudi: joystick / WASD menunjuk arah tujuan (relatif kamera); perahu berbelok perlahan ke
//   arah itu dan melaju sesuai dorongan — berbelok tajam memperlambat.
// - Tidak bisa masuk air dangkal / ke bawah dermaga (kandas) dan tidak keluar dari tepi dunia.
// - Turun: ke darat / dermaga / air dangkal terdekat, atau terjun ke air (berenang) di laut lepas.
// - Letaknya disimpan (localStorage): perahu tetap di tempatnya setelah halaman dimuat ulang.
const KEY = 'pulau-tropis:perahu'
export const KAYU_PERAHU = 10
const SPEED = 7.5 // m/s, joystick penuh
const ACCEL = 0.7 // per detik (mendekati kecepatan tujuan)
const DRAG = 0.9 // per detik (melambat saat joystick dilepas / kandas)
const TURN = 1.3 // rad/s
const DRAFT = 0.6 // m: air lebih dangkal dari ini = kandas
const BOW = 2.9 // m dari pusat ke haluan / buritan
const REACH = 5 // m dari pusat perahu: tombol "Naik perahu" muncul (cadiknya selebar ±4,8 m)
const SEAT = { z: -1.45, y: 0.2 } // tempat duduk pemain (ruang lokal perahu; haluan = +z)
const FLOAT = 0.12 // m: titik asal lambung di atas permukaan air

const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    const v = raw ? JSON.parse(raw) : null
    return v && Number.isFinite(v.x) && Number.isFinite(v.z) && Number.isFinite(v.h) ? v : null
  } catch {
    return null
  }
}

// geometry/material: jukung dari kencana/kingdom.js (boatGeometry) + bahan bangunan tanpa tembus pandang
export function createBoat({ ground, nav, colliders, geometry, material, depthMaterial, shadows }) {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'perahu-pemain'
  mesh.castShadow = shadows
  mesh.receiveShadow = shadows
  mesh.customDepthMaterial = depthMaterial
  mesh.rotation.order = 'YXZ'
  mesh.visible = false
  const S = { built: false, x: 0, z: 0, heading: 0, speed: 0, aboard: false, aground: false, t: 0, y: 0, turn: 0 }

  const depthAt = (x, z) => ISLAND.seaLevel - ground.surfaceAt(x, z)
  // lambung muat di (x, z) menghadap h: pusat, haluan, dan buritan cukup dalam & di dalam dunia
  function fits(x, z, h) {
    if (!insideWorld(x, z, 40)) return false
    const sx = Math.sin(h) * BOW
    const sz = Math.cos(h) * BOW
    return depthAt(x, z) >= DRAFT && depthAt(x + sx, z + sz) >= DRAFT && depthAt(x - sx, z - sz) >= DRAFT * 0.8
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ x: +S.x.toFixed(2), z: +S.z.toFixed(2), h: +S.heading.toFixed(3) }))
    } catch {
      // penyimpanan diblokir: perahu tetap ada sampai halaman ditutup
    }
  }
  function place(x, z, h) {
    S.built = true
    S.x = x
    S.z = z
    S.heading = h
    S.speed = 0
    mesh.visible = true
    save()
  }
  const saved = load()
  if (saved && fits(saved.x, saved.z, saved.h)) place(saved.x, saved.z, saved.h)

  // titik air untuk perahu baru di dekat pemain (p = posisi, heading = arah hadap pemain): dicari
  // melingkar mulai dari depan pemain sampai 16 m (pantai landai: air 0,8 m bisa ±8 m dari tepi air);
  // haluan menghadap ke laut (menjauhi pemain)
  function spotNear(p, heading) {
    for (const r of [3.5, 5, 6.5, 8, 10, 12, 14, 16])
      for (let k = 0; k < 16; k++) {
        const a = heading + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * (Math.PI / 8)
        const x = p.x + Math.sin(a) * r
        const z = p.z + Math.cos(a) * r
        if (depthAt(x, z) < 0.8 || !colliders.isFree(x, z, 1.2)) continue
        if (fits(x, z, a)) return { x, z, heading: a }
      }
    return null
  }

  // tempat turun: darat / dermaga / air dangkal terdekat di sekeliling perahu; null = laut lepas
  function landing() {
    let best = null
    let bd = Infinity
    for (const r of [2.4, 3.2, 4.2, 5.4, 6.8])
      for (let k = 0; k < 20; k++) {
        const a = (k / 20) * Math.PI * 2
        const x = S.x + Math.sin(a) * r
        const z = S.z + Math.cos(a) * r
        if (depthAt(x, z) > 0.85 || !nav.walkableAt(x, z) || !colliders.isFree(x, z, 0.45)) continue
        if (r < bd) {
          bd = r
          best = { x, z, heading: a }
        }
      }
    return best
  }

  const seat = { x: 0, y: 0, z: 0, heading: 0, vx: 0, vz: 0, moving: false }

  return {
    object: mesh,
    get built() {
      return S.built
    },
    get aboard() {
      return S.aboard
    },
    get position() {
      return { x: S.x, z: S.z }
    },
    get heading() {
      return S.heading
    },
    get speed() {
      return S.speed
    },
    // menabrak air dangkal / dermaga saat dikemudikan
    get aground() {
      return S.aground
    },
    // jarak dari titik p ke perahu bila cukup dekat untuk naik, selain itu null
    reachable(p) {
      if (!S.built || S.aboard) return null
      const d = Math.hypot(p.x - S.x, p.z - S.z)
      return d < REACH ? d : null
    },
    spotNear,
    // buat perahu di titik spot (hasil spotNear); perahu lama (bila ada) ditinggalkan
    build(spot) {
      place(spot.x, spot.z, spot.heading)
    },
    board() {
      if (!S.built) return false
      S.aboard = true
      S.speed = 0
      return true
    },
    // turun: hasil { x, z, heading, water } — water = terjun ke air (tidak ada daratan dekat)
    leave() {
      S.aboard = false
      S.speed = 0
      save()
      const spot = landing()
      if (spot) return { ...spot, water: false }
      const side = S.heading + Math.PI / 2
      return { x: S.x + Math.sin(side) * 2.8, z: S.z + Math.cos(side) * 2.8, heading: S.heading, water: true }
    },
    // tempat duduk pemain (dipakai player.setRide)
    seat() {
      const c = Math.cos(S.heading)
      const s = Math.sin(S.heading)
      seat.x = S.x + s * SEAT.z
      seat.z = S.z + c * SEAT.z
      seat.y = S.y + SEAT.y
      seat.heading = S.heading
      seat.vx = s * S.speed
      seat.vz = c * S.speed
      seat.moving = Math.abs(S.speed) > 0.4
      return seat
    },
    // input = { moveX, moveY } (null = tidak dikemudikan); camYaw = arah kamera
    update(dt, input, camYaw) {
      if (!S.built) return
      S.t += dt
      let want = 0
      let turning = 0
      if (S.aboard && input) {
        const m = Math.min(1, Math.hypot(input.moveX, input.moveY))
        if (m > 0.05) {
          const fx = -Math.sin(camYaw)
          const fz = -Math.cos(camYaw)
          const rx = Math.cos(camYaw)
          const rz = -Math.sin(camYaw)
          const dx = rx * input.moveX + fx * input.moveY
          const dz = rz * input.moveX + fz * input.moveY
          const diff = wrap(Math.atan2(dx, dz) - S.heading)
          turning = THREE.MathUtils.clamp(diff, -TURN * dt, TURN * dt)
          S.heading += turning
          want = SPEED * m * Math.max(0.2, Math.cos(diff))
        }
      }
      const k = want > S.speed ? ACCEL : DRAG
      S.speed += (want - S.speed) * Math.min(1, k * dt)
      if (Math.abs(S.speed) < 0.02 && !want) S.speed = 0
      // maju; kandas = berhenti di tempat
      S.aground = false
      if (S.speed > 0) {
        const nx = S.x + Math.sin(S.heading) * S.speed * dt
        const nz = S.z + Math.cos(S.heading) * S.speed * dt
        if (fits(nx, nz, S.heading)) {
          S.x = nx
          S.z = nz
        } else {
          S.speed *= 0.3
          S.aground = !!want
        }
      }
      S.turn += ((dt > 0 ? turning / dt : 0) - S.turn) * Math.min(1, dt * 4)
      // terapung: naik-turun & bergoyang mengikuti ombak, miring sedikit saat berbelok
      S.y = ISLAND.seaLevel + FLOAT + Math.sin(S.t * 1.3) * 0.07
      mesh.position.set(S.x, S.y, S.z)
      mesh.rotation.set(Math.sin(S.t * 0.9) * 0.025, S.heading, Math.sin(S.t * 1.1) * 0.05 - S.turn * 0.08 * Math.min(1, S.speed / 3))
    },
  }
}
