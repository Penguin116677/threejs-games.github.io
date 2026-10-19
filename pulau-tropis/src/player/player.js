import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ISLAND } from '../world/island.js'

// Karakter pemain: prajurit Kenney "Mini Arena" (CC0) membawa pedang, dengan animasi
// bawaan idle / walk / sprint / jump / fall. Bergerak mengikuti jalur hasil ketukan layar
// (atau keyboard di komputer), dengan fisika sederhana:
// gravitasi, lompat, batas kemiringan lereng, tabrakan batang pohon & batu,
// berjalan di air dangkal, dan kembali ke tempat aman bila masuk laut dalam.

const MODEL_SCALE = 2.3 // tinggi model asli ±0,67 (tanpa jambul helm) → ±1,55 m
const RADIUS = 0.35 // jari-jari badan untuk tabrakan
const WALK_SPEED = 2.0 // m/s
const RUN_SPEED = 5.6
const ACCEL_GROUND = 26
const ACCEL_AIR = 8
const GRAVITY = 21
const JUMP_SPEED = 7.2 // lompatan ±1,2 m
const COYOTE_TIME = 0.12 // masih boleh lompat sesaat setelah meninggalkan tanah
const JUMP_BUFFER = 0.15 // tombol lompat yang ditekan sesaat sebelum mendarat tetap dihitung
const MAX_SLOPE = 1.3 // kemiringan maksimum yang bisa didaki (±52°)
const WADE_DEPTH = 0.35 // mulai melambat di air
const DEEP_DEPTH = 1.3 // lebih dalam dari ini = kembali ke pantai
const MAX_DISTANCE = 430 // dari pusat pulau

// Pedang di tangan kanan, dalam ruang lokal tulang lengan kanan (satuan model asli).
// hand = pusat balok tangan (dihitung dari data skin model); blade = arah bilah:
// ke depan dan sedikit searah lengan, jadi saat lengan turun bilah menunjuk ke depan-bawah.
const WEAPON_GRIP = { hand: [-0.265, 0, 0.068], blade: [-0.45, 0, 0.9], grip: 0.05 }

// source / weaponSource: URL file .glb, atau isi file-nya (ArrayBuffer) — yang kedua dipakai
// halaman pratinjau yang tidak bisa menyajikan file .glb. Senjata boleh tidak ada / gagal dimuat.
// Pasang pedang pada tulang lengan kanan: ikut setiap animasi (ayunan lengan saat jalan/lari).
async function attachWeapon(model, load, weaponSource) {
  try {
    const weapon = (await load(weaponSource)).scene
    // bilah model pedang mengarah ke −y; gagang ±0,05 di atas pelindung tangan (titik asal)
    const blade = new THREE.Vector3().fromArray(WEAPON_GRIP.blade).normalize()
    weapon.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), blade)
    weapon.position.fromArray(WEAPON_GRIP.hand).addScaledVector(blade, WEAPON_GRIP.grip)
    model.getObjectByName('arm-right')?.add(weapon)
  } catch (err) {
    console.warn('Senjata gagal dimuat:', err)
  }
}

export async function loadPlayerModel(source, quality, weaponSource = null) {
  const loader = new GLTFLoader()
  const load = src => (typeof src === 'string' ? loader.loadAsync(src) : loader.parseAsync(src, ''))
  const gltf = await load(source)
  const model = gltf.scene
  model.scale.setScalar(MODEL_SCALE)
  if (weaponSource) await attachWeapon(model, load, weaponSource)

  model.traverse(o => {
    if (!o.isMesh) return
    // Lambert: sama dengan dunia (lebih ringan dan warnanya senada)
    const old = o.material
    o.material = new THREE.MeshLambertMaterial({ map: old.map })
    old.dispose()
    o.castShadow = quality.shadows
    o.receiveShadow = quality.shadows
    o.frustumCulled = false // batas skinned mesh tidak ikut animasi
  })
  return { model, clips: gltf.animations }
}

// karakter sederhana bila model gagal dimuat (mis. koneksi putus)
function fallbackModel(quality) {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.6, 4, 8), new THREE.MeshLambertMaterial({ color: '#3f8f4a' }))
  body.position.y = 0.6
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 8), new THREE.MeshLambertMaterial({ color: '#e0b48a' }))
  head.position.y = 1.32
  g.add(body, head)
  g.traverse(o => {
    o.castShadow = quality.shadows
  })
  return g
}

export function createPlayer({ ground, colliders, quality, asset }) {
  const root = new THREE.Group()
  root.name = 'pemain'
  const model = asset ? asset.model : fallbackModel(quality)
  root.add(model)

  // --- animasi
  const mixer = asset ? new THREE.AnimationMixer(model) : null
  const actions = {}
  if (mixer)
    for (const name of ['idle', 'walk', 'sprint', 'jump', 'fall']) {
      const clip = THREE.AnimationClip.findByName(asset.clips, name)
      if (!clip) continue
      const a = mixer.clipAction(clip)
      if (name === 'jump') {
        a.setLoop(THREE.LoopOnce, 1)
        a.clampWhenFinished = true
      }
      actions[name] = a
    }
  let current = null
  function play(name, fade = 0.15) {
    const next = actions[name]
    if (!next || current === next) return
    next.reset().play()
    if (current) next.crossFadeFrom(current, fade, false)
    current = next
  }
  play('idle')

  // --- bayangan bulat sederhana di bawah kaki (tingkat Rendah tidak punya bayangan matahari)
  let blob = null
  if (!quality.shadows) {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(0,0,0,0.5)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    blob = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 1.2).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }),
    )
    blob.renderOrder = 2
  }

  // --- keadaan fisika
  const pos = root.position
  const vel = new THREE.Vector3()
  const lastSafe = new THREE.Vector3()
  let heading = 0
  let lastSafeHeading = 0
  let grounded = true
  let coyote = 0
  let jumpBuffer = 0
  let airTime = 0
  let deepTime = 0
  let safeTimer = 0
  let onRespawnNeeded = () => {}
  let frozen = false

  // --- jalur dari "ketuk untuk berjalan": daftar titik { x, z } yang dituju berurutan
  const path = []
  let stuckTimer = 0
  let stuckBest = Infinity

  // arah & kecepatan menuju titik jalur berikutnya (null bila tidak ada jalur)
  function pathDrive() {
    while (path.length) {
      const wp = path[0]
      if (Math.hypot(wp.x - pos.x, wp.z - pos.z) > (path.length > 1 ? 0.8 : 0.25)) break
      path.shift()
      stuckBest = Infinity
      stuckTimer = 0
    }
    if (!path.length) return null
    const dx = path[0].x - pos.x
    const dz = path[0].z - pos.z
    const d = Math.hypot(dx, dz)
    let remaining = d
    for (let i = 1; i < path.length; i++) remaining += Math.hypot(path[i].x - path[i - 1].x, path[i].z - path[i - 1].z)
    // jauh = lari, dekat = jalan; melambat menjelang tujuan
    const speed = Math.min(remaining > 7 ? RUN_SPEED : WALK_SPEED * 1.4, 0.8 + remaining * 2.2)
    return { dx: dx / d, dz: dz / d, speed }
  }

  // arah naik lereng (gradien tinggi tanah)
  const grad = { x: 0, z: 0, len: 0 }
  function gradient(x, z) {
    const e = 0.5
    grad.x = (ground.heightAt(x + e, z) - ground.heightAt(x - e, z)) / (2 * e)
    grad.z = (ground.heightAt(x, z + e) - ground.heightAt(x, z - e)) / (2 * e)
    grad.len = Math.hypot(grad.x, grad.z)
    return grad
  }

  function placeAt(x, z, h) {
    pos.set(x, ground.heightAt(x, z), z)
    vel.set(0, 0, 0)
    heading = h
    root.rotation.y = h
    grounded = true
    deepTime = 0
    // hanya titik di darat yang boleh menjadi tempat kembali
    if (pos.y > 0.4) {
      lastSafe.copy(pos)
      lastSafeHeading = h
    }
  }

  function step(dt, input, camYaw) {
    let dx = 0
    let dz = 0
    let m = 0
    let speed = 0
    if (Math.abs(input.moveX) + Math.abs(input.moveY) > 0.01) {
      // keyboard (komputer): arah relatif terhadap kamera; membatalkan jalur ketukan
      path.length = 0
      const fx = -Math.sin(camYaw)
      const fz = -Math.cos(camYaw)
      const rx = Math.cos(camYaw)
      const rz = -Math.sin(camYaw)
      dx = rx * input.moveX + fx * input.moveY
      dz = rz * input.moveX + fz * input.moveY
      const len = Math.hypot(dx, dz)
      m = Math.min(1, len)
      dx /= len
      dz /= len
      speed = m < 0.7 ? WALK_SPEED * (m / 0.7) : WALK_SPEED + (RUN_SPEED - WALK_SPEED) * (m - 0.7) / 0.3
    } else {
      const drive = pathDrive()
      if (drive) {
        ({ dx, dz, speed } = drive)
        m = 1
      }
    }
    const depth = ISLAND.seaLevel - ground.heightAt(pos.x, pos.z)
    if (depth > WADE_DEPTH) speed *= 0.55

    // percepat menuju kecepatan yang diinginkan
    const accel = (grounded ? ACCEL_GROUND : ACCEL_AIR) * dt
    const tvx = dx * speed
    const tvz = dz * speed
    const ddx = tvx - vel.x
    const ddz = tvz - vel.z
    const dl = Math.hypot(ddx, ddz)
    if (dl <= accel) {
      vel.x = tvx
      vel.z = tvz
    } else {
      vel.x += (ddx / dl) * accel
      vel.z += (ddz / dl) * accel
    }
    // menghadap ke arah gerak
    if (m > 0.05) {
      const want = Math.atan2(dx, dz)
      let diff = want - heading
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      heading += diff * Math.min(1, 12 * dt)
    }

    // lompat (dengan coyote time dan buffer tombol)
    coyote = grounded ? COYOTE_TIME : coyote - dt
    jumpBuffer = input.jump ? JUMP_BUFFER : jumpBuffer - dt
    if (jumpBuffer > 0 && coyote > 0 && depth < DEEP_DEPTH * 0.8) {
      vel.y = JUMP_SPEED
      grounded = false
      coyote = 0
      jumpBuffer = 0
      airTime = 0
      play('jump', 0.08)
    }
    vel.y -= GRAVITY * dt

    pos.x += vel.x * dt
    pos.z += vel.z * dt
    pos.y += vel.y * dt
    colliders.resolve(pos, RADIUS, vel)

    // lereng terlalu curam: tidak bisa didaki, perlahan merosot
    const g = gradient(pos.x, pos.z)
    if (g.len > MAX_SLOPE) {
      const ux = g.x / g.len
      const uz = g.z / g.len
      const up = vel.x * ux + vel.z * uz
      if (up > 0) {
        vel.x -= up * ux
        vel.z -= up * uz
        pos.x -= up * ux * dt
        pos.z -= up * uz * dt
      }
      if (grounded) {
        vel.x -= ux * 6 * dt
        vel.z -= uz * 6 * dt
      }
    }

    // tanah
    const gy = ground.heightAt(pos.x, pos.z)
    if (pos.y <= gy) {
      pos.y = gy
      if (vel.y < 0) vel.y = 0
      grounded = true
    } else if (grounded && vel.y <= 0 && pos.y - gy < 0.6) {
      // tetap menempel saat berjalan menuruni lereng (tidak "melompat-lompat")
      pos.y = gy
      vel.y = 0
    } else grounded = false
    if (!grounded) airTime += dt
    else airTime = 0
  }

  return {
    root,
    blob,
    get position() {
      return pos
    },
    get heading() {
      return heading
    },
    get speed() {
      return Math.hypot(vel.x, vel.z)
    },
    get grounded() {
      return grounded
    },
    get usingModel() {
      return !!asset
    },
    get hasPath() {
      return path.length > 0
    },
    placeAt,
    // berjalan mengikuti jalur [{ x, z }, …] (hasil navgrid.findPath)
    followPath(points) {
      path.length = 0
      path.push(...points)
      stuckBest = Infinity
      stuckTimer = 0
    },
    stop() {
      path.length = 0
    },
    onRespawnNeeded(fn) {
      onRespawnNeeded = fn
    },
    // kembali ke posisi aman terakhir di darat
    respawn() {
      placeAt(lastSafe.x, lastSafe.z, lastSafeHeading)
      path.length = 0
      frozen = false
      play('idle', 0.05)
    },
    freeze() {
      frozen = true
      vel.set(0, 0, 0)
    },
    update(dt, input, camYaw) {
      if (!frozen) {
        // dua langkah kecil saat frame lambat agar tabrakan tetap stabil
        const n = dt > 1 / 45 ? 2 : 1
        for (let i = 0; i < n; i++) step(dt / n, i === 0 ? input : { ...input, jump: false }, camYaw)
      }
      root.rotation.y = heading

      // tersangkut (mis. lereng terlalu curam di jalur): lewati titik ini setelah 1,2 detik
      if (path.length && !frozen) {
        const d = Math.hypot(path[0].x - pos.x, path[0].z - pos.z)
        if (d < stuckBest - 0.25) {
          stuckBest = d
          stuckTimer = 0
        } else if ((stuckTimer += dt) > 1.2) {
          path.shift()
          stuckBest = Infinity
          stuckTimer = 0
        }
      }

      // laut dalam / terlalu jauh → kembali ke pantai
      const gy = ground.heightAt(pos.x, pos.z)
      const depth = ISLAND.seaLevel - gy
      deepTime = depth > DEEP_DEPTH ? deepTime + dt : 0
      if (!frozen && deepTime > 0.6) onRespawnNeeded('laut')
      else if (!frozen && Math.hypot(pos.x, pos.z) > MAX_DISTANCE) onRespawnNeeded('jauh')

      // simpan posisi aman (di darat, tidak curam) secara berkala
      safeTimer += dt
      if (safeTimer > 0.4 && grounded && gy > 0.4 && gradient(pos.x, pos.z).len < 0.8) {
        safeTimer = 0
        lastSafe.copy(pos)
        lastSafeHeading = heading
      }

      // animasi menurut keadaan
      const hs = Math.hypot(vel.x, vel.z)
      let anim = null
      if (grounded) anim = hs < 0.3 ? 'idle' : hs < 3.6 ? 'walk' : 'sprint'
      else if (airTime > 0.12) anim = vel.y > 0 && current === actions.jump ? 'jump' : 'fall'
      if (anim) play(anim, 0.18)
      if (actions.walk) actions.walk.timeScale = THREE.MathUtils.clamp(hs / 1.4, 0.6, 1.6)
      if (actions.sprint) actions.sprint.timeScale = THREE.MathUtils.clamp(hs / 3.6, 0.8, 1.6)
      mixer?.update(dt)

      if (blob) {
        const h = pos.y - gy
        blob.position.set(pos.x, gy + 0.05, pos.z)
        blob.material.opacity = Math.max(0, 1 - h / 3)
        blob.scale.setScalar(1 + h * 0.15)
      }
    },
  }
}
