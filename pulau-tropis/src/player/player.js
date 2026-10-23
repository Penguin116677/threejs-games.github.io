import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ISLAND } from '../world/island.js'
import { insideWorld } from '../world/world.js'
import { ATTACK_CLIPS, createCombat } from './combat.js'

// Karakter pemain: prajurit Kenney "Mini Arena" (CC0) membawa pedang, dengan animasi bawaan
// idle / walk / sprint / jump / fall + animasi serang (tebasan, tinju, tendangan — lihat combat.js).
// Bergerak dengan joystick / keyboard (relatif kamera) atau mengikuti jalur ke kios yang diketuk,
// dengan fisika sederhana: gravitasi, lompat, batas kemiringan lereng, tabrakan batang pohon, batu &
// dinding bangunan, berpijak di tanah atau lantai bangunan (jembatan, dermaga, batur —
// ground.surfaceAt), berjalan di air dangkal, BERENANG di air yang lebih dalam dari dada (mengapung,
// tidak bisa menyerang), dan bisa duduk di perahu (posisinya diatur perahu.js).
// Nyawa: berkurang bila terkena serangan (prajurit Kencana yang bermusuhan, orc penyerbu), pulih
// perlahan setelah beberapa detik aman; habis = roboh (main.js memindahkan pemain ke tempat aman).

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
// berenang: mulai bila air lebih dalam dari SWIM_DEPTH (sedada), kembali berjalan di bawah SWIM_EXIT
// (jeda supaya tidak bolak-balik di batasnya)
const SWIM_DEPTH = 1.15
const SWIM_EXIT = 0.95
const SWIM_SPEED = 2.4 // m/s (joystick penuh)
const SWIM_ACCEL = 5
// titik kaki di bawah permukaan air: mengapung tegak (kepala di atas air) / berenang maju (badan
// mendatar, dimiringkan SWIM_TILT radian ke depan)
const SWIM_SINK = { tegak: 1.02, maju: 0.32 }
const SWIM_TILT = 1.25
const WORLD_MARGIN = 30 // m dari tepi dunia (data laut & pantai berakhir di sana)
export const MAX_HP = 100
const REGEN = { delay: 6, rate: 5 } // pulih 5 nyawa/detik setelah 6 detik tidak terkena

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
    // diputar saat jurus Hentak (pedang menghadap ke bawah). Tidak "enumerable": Object3D.clone
    // menyalin userData lewat JSON, dan menyalin pedang (+ teksturnya) ke JSON itu lambat
    Object.defineProperty(model.userData, 'sword', { value: weapon, enumerable: false })
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
  // lompat & serangan diputar sekali lalu berhenti di pose akhir sampai berganti animasi
  // + duduk di perahu (sit, drive), memegang pancing (holding-right), melempar kail
  // (interact-right), mengangkat ikan (emote-yes)
  const once = ['jump', 'die', 'interact-right', 'emote-yes', 'pick-up', ...ATTACK_CLIPS]
  if (mixer)
    for (const name of ['idle', 'walk', 'sprint', 'fall', 'sit', 'drive', 'holding-right', ...once]) {
      const clip = THREE.AnimationClip.findByName(asset.clips, name)
      if (!clip) continue
      const a = mixer.clipAction(clip)
      if (once.includes(name)) {
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
  let swimming = false
  let swimPose = 0 // 0 = mengapung tegak, 1 = berenang maju (badan mendatar)
  let swimT = 0
  let ride = null // duduk di perahu: fungsi → { x, y, z, heading, vx, vz, moving }
  let pose = null // klip yang dipaksakan modul lain (mis. memegang pancing)
  let gestureT = 0 // detik sisa gerakan sekali (gesture) yang tidak boleh ditimpa
  let safeTimer = 0
  let onRespawnNeeded = () => {}
  let frozen = false
  let hp = MAX_HP
  let calmT = 0 // detik sejak terakhir terkena
  let defeated = false
  let defense = 0 // bagian luka yang ditahan perlengkapan (perisai, zirah, helm)
  let speedBoost = 1 // ramuan kecepatan
  let onHurt = () => {}
  let onDefeated = () => {}

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
    grad.x = (ground.surfaceAt(x + e, z) - ground.surfaceAt(x - e, z)) / (2 * e)
    grad.z = (ground.surfaceAt(x, z + e) - ground.surfaceAt(x, z - e)) / (2 * e)
    grad.len = Math.hypot(grad.x, grad.z)
    return grad
  }

  function placeAt(x, z, h) {
    // di air dalam (mis. terjun dari perahu): langsung mengapung
    const gy = ground.surfaceAt(x, z)
    const deep = ISLAND.seaLevel - gy > SWIM_DEPTH
    pos.set(x, deep ? ISLAND.seaLevel - SWIM_SINK.tegak : gy, z)
    vel.set(0, 0, 0)
    heading = h
    root.rotation.y = h
    grounded = !deep
    swimming = deep
    // hanya titik di darat yang boleh menjadi tempat kembali
    if (pos.y > 0.4) {
      lastSafe.copy(pos)
      lastSafeHeading = h
    }
  }

  // pedang dibalik: orientasi dunia yang diinginkan diubah ke ruang tulang lengan kanan
  const sword = model.userData.sword || null
  const swordRest = sword ? sword.quaternion.clone() : null
  const arm = model.getObjectByName('arm-right')
  let swordDown = false
  const qArm = new THREE.Quaternion()
  const qWant = new THREE.Quaternion()
  const qTilt = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -0.3) // ujung sedikit ke depan
  const Y = new THREE.Vector3(0, 1, 0)
  function orientSword() {
    if (!sword) return
    if (!swordDown) {
      sword.quaternion.copy(swordRest)
      return
    }
    arm.getWorldQuaternion(qArm)
    qWant.setFromAxisAngle(Y, heading).multiply(qTilt)
    sword.quaternion.copy(qArm.invert().multiply(qWant))
  }

  // joran pancing di tangan kanan (dibuat saat pertama dipakai, hanya tampak saat memancing): arah
  // dunianya dihitung tiap frame — ke depan & 40° ke atas — lalu diubah ke ruang tulang lengan, jadi
  // tetap benar apa pun animasinya. Ujungnya dipakai mancing.js untuk tali pancing.
  let rod = null
  let rodTip = null
  const rodDir = new THREE.Vector3()
  const qRod = new THREE.Quaternion()
  function makeRod() {
    rod = new THREE.Group()
    const k = 1 / MODEL_SCALE // ruang tulang memakai satuan model asli
    const wood = new THREE.MeshLambertMaterial({ color: '#7a5230' })
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012 * k, 0.022 * k, 1.9 * k, 5).translate(0, 0.95 * k, 0), wood)
    const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * k, 0.04 * k, 0.05 * k, 8).rotateZ(Math.PI / 2).translate(0.03 * k, 0.25 * k, 0), new THREE.MeshLambertMaterial({ color: '#c9c3b8' }))
    stick.castShadow = quality.shadows
    rodTip = new THREE.Object3D()
    rodTip.position.set(0, 1.9 * k, 0)
    rod.add(stick, reel, rodTip)
    rod.position.fromArray(WEAPON_GRIP.hand)
    arm?.add(rod)
  }
  function orientRod() {
    const on = pose === 'holding-right'
    if (!on) {
      if (rod) rod.visible = false
      return
    }
    if (!rod) makeRod()
    rod.visible = true
    if (!arm) return
    arm.getWorldQuaternion(qArm)
    rodDir.set(Math.sin(heading) * 0.77, 0.64, Math.cos(heading) * 0.77)
    qRod.setFromUnitVectors(Y, rodDir)
    rod.quaternion.copy(qArm.invert().multiply(qRod))
  }

  // berenang maju: model dimiringkan ke depan (mendatar) dan digeser ke belakang supaya badannya
  // tetap di atas titik letak pemain; mengapung tegak = pose biasa
  function setSwimPose(k) {
    model.rotation.x = k * SWIM_TILT
    model.position.z = -k * 0.55
  }
  // pedang (dan perlengkapan lain di badan) disembunyikan saat berenang, di perahu, atau memegang
  // pancing
  let gearShown = true
  function showGear(on) {
    if (on === gearShown) return
    gearShown = on
    if (sword) sword.visible = on
  }

  // --- serangan (kombo pukulan + jurus): logikanya di combat.js, badan prajurit dipinjamkan di sini
  const combat = createCombat({
    pos, vel,
    get heading() {
      return heading
    },
    set heading(h) {
      heading = h
    },
    get grounded() {
      return grounded
    },
    depthAt: (x, z) => ISLAND.seaLevel - ground.surfaceAt(x, z),
    clipLength: name => actions[name]?.getClip().duration || 0,
    play,
    // putar animasi serang dari detik `from` (juga bila animasi yang sama sedang diputar)
    playClip(name, speed, from = 0) {
      const a = actions[name]
      if (!a) return
      a.timeScale = speed
      if (current === a) a.reset().play()
      else play(name, 0.06)
      a.time = from
    },
    // tahan satu pose: animasi berhenti di detik `time` sampai release()
    pose(name, time) {
      const a = actions[name]
      if (!a) return
      if (current !== a) play(name, 0.06)
      a.time = time
      a.paused = true
    },
    release() {
      if (current) current.paused = false
    },
    launch(vx, vy, vz) {
      vel.set(vx, vy, vz)
      grounded = false
      coyote = 0
      airTime = 0
    },
    // pindah seketika (jurus Penggal melesat dari leher ke leher)
    teleport(x, z) {
      pos.set(x, ground.surfaceAt(x, z), z)
      vel.set(0, 0, 0)
      grounded = true
    },
    // pedang menghadap lurus ke bawah (jurus Hentak: ditancapkan ke tanah)
    swordDown(on) {
      swordDown = on
    },
    // badan direndahkan (kuda-kuda saat pedang tertancap)
    crouch(amount) {
      model.position.y = -amount
    },
    stopWalking() {
      path.length = 0
    },
  })

  // berenang: tanpa gravitasi & serangan; badan mengapung di permukaan, lebih lambat dari berjalan
  function swimStep(dt, input, camYaw) {
    let dx = 0
    let dz = 0
    let m = 0
    if (Math.abs(input.moveX) + Math.abs(input.moveY) > 0.01) {
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
    }
    const speed = SWIM_SPEED * m * Math.min(speedBoost, 1.15)
    const accel = SWIM_ACCEL * dt
    const ddx = dx * speed - vel.x
    const ddz = dz * speed - vel.z
    const dl = Math.hypot(ddx, ddz)
    if (dl <= accel) {
      vel.x = dx * speed
      vel.z = dz * speed
    } else {
      vel.x += (ddx / dl) * accel
      vel.z += (ddz / dl) * accel
    }
    if (m > 0.05) {
      const diff = Math.atan2(Math.sin(Math.atan2(dx, dz) - heading), Math.cos(Math.atan2(dx, dz) - heading))
      heading += diff * Math.min(1, 6 * dt)
    }
    pos.x += vel.x * dt
    pos.z += vel.z * dt
    colliders.resolve(pos, RADIUS, vel)
    // mengapung: makin cepat berenang makin mendatar badannya; sedikit naik-turun mengikuti ombak
    const want = Math.min(1, Math.hypot(vel.x, vel.z) / 1.2)
    swimPose += (want - swimPose) * Math.min(1, dt * 4)
    const sink = SWIM_SINK.tegak + (SWIM_SINK.maju - SWIM_SINK.tegak) * swimPose
    const wy = ISLAND.seaLevel - sink + Math.sin(swimT * 2.3) * 0.035
    pos.y += (wy - pos.y) * Math.min(1, dt * 5)
    vel.y = 0
    grounded = false
    jumpBuffer = 0
  }

  function step(dt, input, camYaw) {
    if (swimming) {
      swimStep(dt, input, camYaw)
      return
    }
    let dx = 0
    let dz = 0
    let m = 0
    let speed = 0
    // sedang menyerang: kecepatan datar diatur gerakan serang (berhenti, melesat, atau melayang)
    const atk = combat.drive()
    if (atk) {
      dx = atk.vx || 0
      dz = atk.vz || 0
      speed = 1
    } else if (Math.abs(input.moveX) + Math.abs(input.moveY) > 0.01) {
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
    const depth = ISLAND.seaLevel - ground.surfaceAt(pos.x, pos.z)
    if (!atk) speed *= speedBoost
    if (depth > WADE_DEPTH && !atk) speed *= 0.55

    // percepat menuju kecepatan yang diinginkan
    const accel = (grounded ? ACCEL_GROUND : ACCEL_AIR) * dt
    const tvx = dx * speed
    const tvz = dz * speed
    const ddx = tvx - vel.x
    const ddz = tvz - vel.z
    const dl = Math.hypot(ddx, ddz)
    if (atk?.keep) {
      // melayang (Hentakan): kecepatan datar dipertahankan
    } else if (dl <= accel || atk?.instant) {
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
    if (jumpBuffer > 0 && coyote > 0 && depth < SWIM_EXIT && !atk) {
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
    const gy = ground.surfaceAt(pos.x, pos.z)
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
    // sedang berenang / duduk di perahu
    get swimming() {
      return swimming
    },
    get riding() {
      return !!ride
    },
    // tinggi titik putar kamera di atas titik letak pemain: kepala tetap di tengah pandangan saat
    // badan terbenam (berenang) atau duduk di perahu
    get cameraHeight() {
      if (ride) return 1.3
      if (swimming) return ISLAND.seaLevel + 0.75 - pos.y
      return 1.5
    },
    // duduk di perahu: fn() → { x, y, z, heading, vx, vz, moving } tiap frame; null = turun
    setRide(fn) {
      ride = fn
      path.length = 0
      combat.reset()
      if (!fn) {
        play('idle', 0.1)
        vel.set(0, 0, 0)
      }
    },
    // paksa satu klip (mis. 'holding-right' saat memancing); null = kembali otomatis
    setPose(name) {
      pose = name
    },
    // posisi dunia ujung joran pancing (untuk tali pancing); tanpa joran: di atas kepala
    rodTip(out) {
      if (rodTip && rod?.visible) {
        root.updateMatrixWorld(true)
        return rodTip.getWorldPosition(out)
      }
      return out.set(pos.x + Math.sin(heading) * 0.6, pos.y + 1.6, pos.z + Math.cos(heading) * 0.6)
    },
    // putar satu gerakan sekali (mis. melempar kail, mengangkat ikan)
    gesture(name, seconds = 0) {
      const a = actions[name]
      if (!a) return
      a.reset()
      play(name, 0.1)
      a.play()
      gestureT = seconds || a.getClip().duration
    },
    get attacking() {
      return combat.busy
    },
    get hp() {
      return hp
    },
    get defeated() {
      return defeated
    },
    // terkena serangan sebesar `amount` dari arah `from` ({ x, z }): terdorong menjauh
    damage(amount, from) {
      if (defeated || frozen) return
      hp = Math.max(0, hp - amount * (1 - defense))
      calmT = 0
      if (from) {
        const dx = pos.x - from.x
        const dz = pos.z - from.z
        const d = Math.hypot(dx, dz) || 1
        vel.x += (dx / d) * 3.5
        vel.z += (dz / d) * 3.5
      }
      onHurt(amount)
      if (hp <= 0) {
        defeated = true
        path.length = 0
        combat.reset()
        play('die', 0.1)
        onDefeated()
      }
    },
    // makan / minum ramuan: nyawa bertambah (tidak melebihi penuh)
    heal(amount) {
      if (defeated) return
      hp = Math.min(MAX_HP, hp + amount)
    },
    // perlengkapan & ramuan (tas.js): bagian luka yang ditahan, pengali kecepatan lari
    setDefense(f) {
      defense = Math.min(0.9, Math.max(0, f))
    },
    setSpeedBoost(k) {
      speedBoost = k
    },
    // bangun lagi dengan nyawa penuh (setelah roboh)
    revive() {
      hp = MAX_HP
      calmT = 0
      defeated = false
      frozen = false
      play('idle', 0.05)
    },
    onHurt(fn) {
      onHurt = fn
    },
    onDefeated(fn) {
      onDefeated = fn
    },
    // menghadap titik (x, z)
    face(x, z) {
      heading = Math.atan2(x - pos.x, z - pos.z)
      root.rotation.y = heading
    },
    // gerakan serang yang sedang berjalan ('tebas', 'tinju', 'tendang', 'cincang', 'hentak',
    // 'putar', 'penggal') atau null
    get attackMove() {
      return combat.current
    },
    get attackPhase() {
      return combat.phase
    },
    // sisa jeda pakai jurus (detik): { cincang, hentak, putar, penggal }
    get cooldowns() {
      return combat.cooldown
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
    // fn(kejadian serangan) — lihat combat.js: { type: 'hit' | 'dash' | 'aim' | 'execute' | 'gagal',
    // move, heading, origin, … } — 'hit' membawa lingkaran sasaran (x, z, r), damage, knock
    onAttack(fn) {
      combat.onEvent(fn)
    },
    // sasaran jurus Penggal (musuh) — lihat combat.js setArena
    setArena(arena) {
      combat.setArena(arena)
    },
    // kembali ke posisi aman terakhir di darat
    respawn() {
      placeAt(lastSafe.x, lastSafe.z, lastSafeHeading)
      path.length = 0
      combat.reset()
      frozen = false
      play('idle', 0.05)
    },
    freeze() {
      frozen = true
      vel.set(0, 0, 0)
    },
    update(dt, input, camYaw) {
      if (defeated) {
        // roboh: terbaring sampai main.js memindahkan & membangunkan
        mixer?.update(dt)
        return
      }
      if (hp < MAX_HP && (calmT += dt) > REGEN.delay) hp = Math.min(MAX_HP, hp + REGEN.rate * dt)
      swimT += dt
      // duduk di perahu: letak & arah mengikuti perahu (perahu.js), tanpa fisika
      if (ride) {
        const r = ride()
        pos.set(r.x, r.y, r.z)
        vel.set(r.vx, 0, r.vz);
        ({ heading } = r)
        root.rotation.y = heading
        setSwimPose(0)
        if ((gestureT -= dt) <= 0) play(pose || (r.moving ? 'drive' : 'sit'), 0.25)
        mixer?.update(dt)
        orientRod()
        showGear(false)
        if (blob) blob.visible = false
        return
      }
      // masuk air yang dalam (berjalan / jatuh dari dermaga) → berenang; ke air dangkal → berjalan
      const depth0 = ISLAND.seaLevel - ground.surfaceAt(pos.x, pos.z)
      if (!swimming && depth0 > SWIM_DEPTH && pos.y < ISLAND.seaLevel - 0.25) {
        swimming = true
        combat.reset()
        path.length = 0
        vel.y = 0
      } else if (swimming && depth0 < SWIM_EXIT) swimming = false
      // pukulan (kombo) & jurus — sebelum fisika agar gerak langsung berhenti saat mulai menyerang
      // (tidak bisa menyerang sambil berenang)
      if (!frozen && !swimming) combat.update(dt, input)
      if (!frozen) {
        // langkah kecil saat frame lambat atau bergerak cepat (Serbuan 22 m/s): maks. ±0,3 m per
        // langkah, kalau tidak prajurit bisa "menembus" batang pohon dalam satu langkah
        const atk = combat.drive()
        const want = atk && !atk.keep ? Math.hypot(atk.vx, atk.vz) : 0
        const fast = Math.max(Math.hypot(vel.x, vel.z), want)
        const n = Math.min(12, Math.max(dt > 1 / 45 ? 2 : 1, Math.ceil((fast * dt) / 0.3)))
        for (let i = 0; i < n; i++) step(dt / n, i === 0 ? input : { ...input, jump: false }, camYaw)
      }
      root.rotation.y = heading

      // tersangkut (mis. lereng terlalu curam di jalur): lewati titik ini setelah 1,2 detik
      // (tidak dihitung selama menyerang — saat itu prajurit memang diam)
      if (path.length && !frozen && !combat.busy) {
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

      // terlalu jauh (tepi dunia) → kembali ke pantai
      const gy = ground.surfaceAt(pos.x, pos.z)
      if (!frozen && !insideWorld(pos.x, pos.z, WORLD_MARGIN)) onRespawnNeeded('jauh')

      // simpan posisi aman (di darat, tidak curam) secara berkala
      safeTimer += dt
      if (safeTimer > 0.4 && grounded && gy > 0.4 && gradient(pos.x, pos.z).len < 0.8) {
        safeTimer = 0
        lastSafe.copy(pos)
        lastSafeHeading = heading
      }

      // animasi menurut keadaan (animasi serangan dibiarkan selesai dulu). Berenang: klip lari
      // dengan badan mendatar (gaya bebas) / klip jalan pelan dengan badan tegak (mengapung)
      const hs = Math.hypot(vel.x, vel.z)
      if (swimming) play(swimPose > 0.45 ? 'sprint' : 'walk', 0.3)
      else if ((gestureT -= dt) > 0) {
        // gerakan sekali sedang diputar
      } else if (pose && !combat.busy) play(pose, 0.2)
      else if (!combat.busy) {
        let anim = null
        if (grounded) anim = hs < 0.3 ? 'idle' : hs < 3.6 ? 'walk' : 'sprint'
        else if (airTime > 0.12) anim = vel.y > 0 && current === actions.jump ? 'jump' : 'fall'
        if (anim) play(anim, 0.18)
      }
      if (actions.walk) actions.walk.timeScale = swimming ? 0.55 : THREE.MathUtils.clamp(hs / 1.4, 0.6, 1.6)
      if (actions.sprint) actions.sprint.timeScale = swimming ? 0.75 : THREE.MathUtils.clamp(hs / 3.6, 0.8, 1.6)
      setSwimPose(swimming ? swimPose : 0)
      mixer?.update(dt)
      orientSword()
      orientRod()
      showGear(!swimming && !pose)

      if (blob) {
        const h = pos.y - gy
        blob.visible = !swimming
        blob.position.set(pos.x, gy + 0.05, pos.z)
        blob.material.opacity = Math.max(0, 1 - h / 3)
        blob.scale.setScalar(1 + h * 0.15)
      }
    },
  }
}
