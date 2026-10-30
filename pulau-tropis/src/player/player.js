import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ISLAND } from '../world/island.js'
import { insideWorld } from '../world/world.js'
import { ATTACK_CLIPS, createCombat } from './combat.js'
import { buatRupa, splitData, skinnedFrom, paletteTexture, droopDir, armDir, pedangGeo, geoWarna } from '../tokoh/rupa.js'
import { artikulasi, buatGerak, genggam, siku, sudutSiku, TUNGKAI } from '../tokoh/gerak.js'
import { skeletonOf, TULANG_SENDI } from '../world/kencana/rig.js'

// Karakter pemain: pendekar berzirah ringan bersyal merah (tokoh/rupa.js) di atas rangka Kenney
// "Mini Arena" (CC0) yang diberi sendi lutut, pergelangan kaki, pinggang, dan siku (tokoh/gerak.js):
// diam / jalan / lari / renang gaya bebas / mengapung dengan gerak mirip manusia, lompat / jatuh /
// duduk + animasi serang (tebasan, tinju, tendangan — lihat combat.js) dari klip Kenney.
// Bergerak dengan joystick / keyboard (relatif kamera) atau mengikuti jalur ke kios yang diketuk,
// dengan fisika sederhana: gravitasi, lompat, batas kemiringan lereng, tabrakan batang pohon, batu &
// dinding bangunan, berpijak di tanah atau lantai bangunan (jembatan, dermaga, batur —
// ground.surfaceAt), berjalan di air dangkal, BERENANG di air yang lebih dalam dari dada (mengapung,
// tidak bisa menyerang), dan bisa duduk di perahu (posisinya diatur perahu.js).
// Nyawa: berkurang bila terkena serangan (prajurit Kencana yang bermusuhan, orc penyerbu), pulih
// perlahan setelah beberapa detik aman; habis = roboh (main.js memindahkan pemain ke tempat aman).

const MODEL_SCALE = 2.3 // satuan model Kenney → m (rupa baru ±0,55 tinggi → ±1,27 m)
const RADIUS = 0.35 // jari-jari badan untuk tabrakan
const WALK_SPEED = 2.0 // m/s
const RUN_SPEED = 5.6
// percepatan: menuju kecepatan tujuan secepat-cepatnya ACCEL m/s², lalu melambat halus menjelang
// kecepatan itu (EASE per detik) — tidak menyentak saat mulai, berhenti, atau berganti laju
const ACCEL_GROUND = 26
const ACCEL_AIR = 8
const EASE = 9
const GRAVITY = 21
const JUMP_SPEED = 7.2 // lompatan ±1,2 m
const COYOTE_TIME = 0.12 // masih boleh lompat sesaat setelah meninggalkan tanah
const JUMP_BUFFER = 0.15 // tombol lompat yang ditekan sesaat sebelum mendarat tetap dihitung
const MAX_SLOPE = 1.3 // kemiringan maksimum yang bisa didaki (±52°)
// lantai bangunan (dek dermaga, batur, lantai jembatan): dilangkahi bila tepinya paling tinggi
// STEP_UP m di atas kaki; lebih tinggi = penghalang, dan bila paling tinggi CLIMB_MAX m (dek dermaga
// dari air: ±2,8 m) bisa DIPANJAT (tombol Panjat / Spasi)
const STEP_UP = 0.45
const CLIMB_MAX = 2.95
const CLIMB_REACH = 0.55 // m dari badan ke tepi: tombol Panjat muncul
const CLIMB_IN = 0.6 // m ke dalam lantai dari tepinya: tempat berdiri setelah memanjat
const WADE_DEPTH = 0.35 // mulai melambat di air
// berenang: mulai bila air lebih dalam dari SWIM_DEPTH (sedada), kembali berjalan di bawah SWIM_EXIT
// (jeda supaya tidak bolak-balik di batasnya)
const SWIM_DEPTH = 1.15
const SWIM_EXIT = 0.95
const SWIM_SPEED = 2.4 // m/s (joystick penuh)
const SWIM_ACCEL = 5
// titik letak pemain di bawah permukaan air: mengapung tegak (air setinggi leher) / gaya bebas (badan
// mendatar di sekitar dada — klip 'renang' — punggung di permukaan)
const SWIM_SINK = { tegak: 0.82, maju: 0.63 }
const WORLD_MARGIN = 30 // m dari tepi dunia (data laut & pantai berakhir di sana)
export const MAX_HP = 100
const REGEN = { delay: 6, rate: 5 } // pulih 5 nyawa/detik setelah 6 detik tidak terkena

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))

// Pedang di tangan kanan: arah bilah dalam ruang tulang lengan (Kenney, tanpa tekukan siku) — ke depan
// dan sedikit searah lengan (ikut juntaian lengan), jadi saat lengan turun bilah menunjuk ke
// depan-bawah. Pada rangka bersendi pedang ikut tulang siku; bilahnya sama selama siku lurus
// (animasi serang Kenney), tekukan siku (jalan, lari) sebagian dikembalikan (orientSword).
const BLADE = droopDir(5, new THREE.Vector3(-0.45, 0, 0.9)).normalize()

// Pasang pedang di genggaman kanan: ikut setiap animasi (ayunan lengan saat jalan/lari).
function attachSword(model, material) {
  const weapon = new THREE.Mesh(geoWarna(pedangGeo()), material)
  weapon.name = 'weapon-sword' // nama lama (pedang Kenney) — dicari smoke test
  weapon.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), BLADE)
  const grip = genggam(model, 5)
  weapon.position.copy(grip.at)
  grip.bone?.add(weapon)
  // diputar saat jurus Hentak (pedang menghadap ke bawah). Tidak "enumerable": Object3D.clone
  // menyalin userData lewat JSON, dan menyalin pedang ke JSON itu lambat
  Object.defineProperty(model.userData, 'sword', { value: weapon, enumerable: false })
}

// Pasang badan rupa pada rangka file (models/*.glb hanya berisi rangka + animasi Kenney): dua mesh
// seperti aslinya, badan & kepala — kepala orc bisa terlepas saat jurus Penggal.
function addBody(model, rupa, material, sendi) {
  const skeleton = skeletonOf(model)
  const data = buatRupa(rupa, 0, { sendi })
  const body = skinnedFrom(splitData(data, b => b !== 6), skeleton, material)
  const head = skinnedFrom(splitData(data, b => b === 6), skeleton, material)
  body.name = 'body-mesh'
  head.name = 'head-mesh'
  model.add(body, head)
}

// source: URL file .glb (rangka & animasi Kenney), atau isi file-nya (ArrayBuffer) — yang kedua dipakai
// halaman pratinjau yang tidak bisa menyajikan file .glb. rupa = nama rupa badan (tokoh/rupa.js);
// pedang = pasang pedang di tangan kanan; sendi = rangka bersendi + gerak mirip manusia
// (tokoh/gerak.js: klip 'diam', 'jalan', 'lari', 'renang', 'apung' ditambahkan ke klip Kenney).
// Hasil `rig` = rangka & klip Kenney apa adanya (tanpa sendi & badan) untuk tokoh lain yang
// memanggang rangka ini (prajurit, bala tentara).
export async function loadPlayerModel(source, quality, { rupa = 'pemain', pedang = false, sendi = false } = {}) {
  const loader = new GLTFLoader()
  const gltf = await (typeof source === 'string' ? loader.loadAsync(source) : loader.parseAsync(source, ''))
  const model = gltf.scene
  let rig = { model, clips: gltf.animations }
  let clips = gltf.animations
  if (sendi) {
    rig = { model: model.clone(), clips: gltf.animations }
    rig.model.scale.setScalar(MODEL_SCALE)
    artikulasi(model)
    clips = [...clips, ...buatGerak(model, { pedang })]
  }
  // Lambert + palet karakter: sama dengan dunia (ringan, warnanya senada)
  const material = new THREE.MeshLambertMaterial({ map: paletteTexture() })
  addBody(model, rupa, material, sendi)
  model.scale.setScalar(MODEL_SCALE)
  if (pedang) attachSword(model, material)

  model.traverse(o => {
    if (!o.isMesh) return
    o.castShadow = quality.shadows
    o.receiveShadow = quality.shadows
    o.frustumCulled = false // batas skinned mesh tidak ikut animasi
  })
  return { model, clips, rig }
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

  // --- animasi. Klip-klip dicampur dengan bobot yang bergerak halus menuju sasarannya (lapisan yang
  // bertukar), jadi tidak ada peralihan yang patah. Dua lapisan gabungan: GERAK = campuran diam /
  // jalan / lari menurut kecepatan (jalan & lari berbagi satu fase langkah, jadi saat laju berubah
  // kaki tidak meloncat dari satu klip ke klip lain), dan RENANG = mengapung tegak / gaya bebas
  // menurut laju berenang. Klip gerak itu dari tokoh/gerak.js (rangka bersendi), sisanya klip Kenney.
  const mixer = asset ? new THREE.AnimationMixer(model) : null
  const actions = {}
  // lompat & serangan diputar sekali lalu berhenti di pose akhir sampai berganti animasi
  // + duduk di perahu (sit, drive), memegang pancing (holding-right), melempar kail
  // (interact-right), mengangkat ikan (emote-yes)
  const once = ['jump', 'die', 'interact-right', 'emote-yes', 'pick-up', ...ATTACK_CLIPS]
  if (mixer)
    for (const name of ['diam', 'jalan', 'lari', 'renang', 'apung', 'fall', 'sit', 'drive', 'holding-right', ...once]) {
      const clip = THREE.AnimationClip.findByName(asset.clips, name)
      if (!clip) continue
      const a = mixer.clipAction(clip)
      if (once.includes(name)) {
        a.setLoop(THREE.LoopOnce, 1)
        a.clampWhenFinished = true
      }
      actions[name] = a
    }
  const GERAK = 'gerak'
  const RENANG = 'berenang'
  const LOCO = { diam: 1, jalan: 0, lari: 0 } // bobot di dalam lapisan gerak
  const SWIM = { apung: 1, renang: 0 } // ... di dalam lapisan berenang
  const MIX = { [GERAK]: LOCO, [RENANG]: SWIM }
  const layers = [] // [{ key, w }]: yang terakhir = tujuan peralihan
  let fadeRate = 1 / 0.15 // per detik
  let mainKey = null
  let current = null // aksi lapisan tujuan (null = lapisan gabungan)
  let gait = 0 // fase langkah bersama jalan & lari (0..1)
  let stroke = 0 // fase kayuhan gaya bebas
  let tread = 0 // fase kayuhan mengapung
  // berganti ke klip `name` (atau lapisan gabungan) dalam `fade` detik
  function play(name, fade = 0.15) {
    if (name === mainKey || (!MIX[name] && !actions[name])) return
    mainKey = name
    fadeRate = 1 / Math.max(0.02, fade)
    let layer = layers.find(l => l.key === name)
    if (layer) layers.splice(layers.indexOf(layer), 1)
    else layer = { key: name, w: layers.length ? 0 : 1 }
    layers.push(layer)
    current = actions[name] || null
    if (current) {
      current.reset()
      current.timeScale = 1
    }
  }
  // panjang langkah alami (m per putaran) klip jalan & lari
  const strideOf = (n, m) => (actions[n]?.getClip().userData?.langkah ?? m / MODEL_SCALE) * MODEL_SCALE
  const STRIDE = { jalan: strideOf('jalan', 0.65), lari: strideOf('lari', 1.3) }
  const want = {}
  // putar klip `n` pada fase `ph` (0..1) — waktunya diatur di sini, bukan oleh mixer
  const atPhase = (n, ph) => {
    const a = actions[n]
    if (!a || mainKey === n) return
    a.timeScale = 0
    a.time = ph * a.getClip().duration
  }
  // bobot lapisan → bobot tiap aksi; hs = kecepatan datar (m/s) untuk campuran gerak / berenang,
  // swim = sikap berenang (0 = mengapung tegak, 1 = gaya bebas)
  function blend(dt, hs, swim = 0) {
    if (!mixer || !layers.length) return
    const top = layers[layers.length - 1]
    top.w = Math.min(1, top.w + dt * fadeRate)
    let rest = 0
    for (let i = 0; i < layers.length - 1; i++) rest += layers[i].w
    const k = rest > 1e-6 ? (1 - top.w) / rest : 0
    for (let i = layers.length - 2; i >= 0; i--) {
      layers[i].w *= k
      if (layers[i].w < 0.002) layers.splice(i, 1)
    }
    // diam → jalan (0,12–0,85 m/s) → lari (2,7–4,3 m/s). Irama langkah mengikuti panjang langkah
    // alami klip (telapak tumpuan tidak meluncur) — kaki tokoh pendek, jadi pada laju tinggi langkah
    // dibiarkan sedikit lebih panjang dari alaminya (sampai 1,35 ×) supaya kaki tidak berputar terlalu
    // cepat: ±2,3 putaran (4,6 langkah) per detik saat berjalan 2 m/s, ±3,2 saat berlari 5,6 m/s
    const move = smooth(0.12, 0.85, hs)
    const run = smooth(2.7, 4.3, hs)
    LOCO.diam = 1 - move
    LOCO.jalan = move * (1 - run)
    LOCO.lari = move * run
    const stride = (STRIDE.jalan + (STRIDE.lari - STRIDE.jalan) * run) * (1 + 0.35 * smooth(0.8, RUN_SPEED, hs))
    gait = (gait + dt * THREE.MathUtils.clamp(hs / stride, 0.7, 3.4)) % 1
    // berenang: makin cepat makin mendatar (gaya bebas); kayuhan ±0,55–1,1 putaran per detik
    SWIM.renang = swim
    SWIM.apung = 1 - swim
    stroke = (stroke + dt * (0.55 + 0.23 * hs)) % 1
    tread = (tread + dt / 1.6) % 1
    for (const n in actions) want[n] = 0
    for (const l of layers)
      if (MIX[l.key]) {
        for (const n in MIX[l.key]) if (n in want) want[n] += l.w * MIX[l.key][n]
      } else want[l.key] += l.w
    for (const n in actions) {
      const a = actions[n]
      if (want[n] > 0.002) {
        if (!a.isScheduled()) a.play()
        a.setEffectiveWeight(want[n])
      } else if (a.isScheduled()) a.stop()
    }
    atPhase('jalan', gait)
    atPhase('lari', gait)
    atPhase('renang', stroke)
    atPhase('apung', tread)
  }
  play(GERAK, 0)

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
  let stunT = 0 // detik sisa terjatuh (stun)
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

  // arah naik lereng TANAH (lantai bangunan datar / landai; tepinya bukan lereng melainkan tepi
  // yang dilangkahi atau dipanjat — lihat blockLedges)
  const grad = { x: 0, z: 0, len: 0 }
  function gradient(x, z) {
    const e = 0.5
    grad.x = (ground.heightAt(x + e, z) - ground.heightAt(x - e, z)) / (2 * e)
    grad.z = (ground.heightAt(x, z + e) - ground.heightAt(x, z - e)) / (2 * e)
    grad.len = Math.hypot(grad.x, grad.z)
    return grad
  }
  // pijakan di (x, z) untuk kaki setinggi y: tanah, atau lantai yang bisa dilangkahi
  const support = (x, z, y) => ground.supportAt(x, z, y, STEP_UP)

  // tepi lantai (dek dermaga, batur, lantai jembatan) yang terlalu tinggi untuk dilangkahi dari
  // kaki setinggi footY = dinding: badan didorong keluar dari kotaknya (dulu langsung terangkat ke
  // atas dek lalu tersangkut di tepinya)
  const hit = { gap: 0, nx: 0, nz: 0, px: 0, pz: 0 }
  function blockLedges(footY) {
    ground.forEachSurfaceNear(pos.x, pos.z, RADIUS, s => {
      colliders.probe(s, pos.x, pos.z, hit)
      if (hit.gap >= RADIUS) return
      // sudah di atas lantai ini dan lantai di bawah kaki masih selangkah (mis. di tengah tangga):
      // tepinya bukan penghalang — tanpa ini puncak tangga, yang lebih tinggi dari selangkah dari
      // kaki, "mendorong" pemain keluar menembus tangga
      if (hit.gap < 0 && ground.surfaceHeight(s, pos.x, pos.z) <= footY + STEP_UP) return
      const h = ground.surfaceHeight(s, hit.px - hit.nx * 0.02, hit.pz - hit.nz * 0.02)
      if (h <= footY + STEP_UP) return
      pos.x += hit.nx * (RADIUS - hit.gap)
      pos.z += hit.nz * (RADIUS - hit.gap)
      const vn = vel.x * hit.nx + vel.z * hit.nz
      if (vn < 0) {
        vel.x -= vn * hit.nx
        vel.z -= vn * hit.nz
      }
    })
  }
  // tepi yang bisa DIPANJAT di depan (arah dx, dz): paling jauh CLIMB_REACH m dari badan, STEP_UP–
  // CLIMB_MAX m di atas kaki, dan CLIMB_IN m di dalamnya ada tempat berdiri yang lapang
  function findClimb(dx, dz) {
    let best = null
    ground.forEachSurfaceNear(pos.x, pos.z, RADIUS + CLIMB_REACH, s => {
      colliders.probe(s, pos.x, pos.z, hit)
      if (hit.gap < 0 || hit.gap > RADIUS + CLIMB_REACH) return
      if (-hit.nx * dx - hit.nz * dz < 0.45) return // tidak menghadap tepinya
      const ex = hit.px - hit.nx * 0.02
      const ez = hit.pz - hit.nz * 0.02
      const rise = ground.surfaceHeight(s, ex, ez) - pos.y
      if (!(rise > STEP_UP && rise <= CLIMB_MAX)) return
      const lx = hit.px - hit.nx * CLIMB_IN
      const lz = hit.pz - hit.nz * CLIMB_IN
      const top = ground.surfaceHeight(s, lx, lz)
      if (!(Math.abs(top - pos.y - rise) < 0.35) || ground.surfaceAt(lx, lz) > top + 0.3 || !colliders.isFree(lx, lz, RADIUS)) return
      if (!best || hit.gap < best.gap)
        best = { gap: hit.gap, x: lx, y: top, z: lz, ex: hit.px, ez: hit.pz, nx: hit.nx, nz: hit.nz, heading: Math.atan2(-hit.nx, -hit.nz) }
    })
    return best
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

  // pedang dibalik: orientasi dunia yang diinginkan diubah ke ruang tulang genggaman kanan (siku)
  const sword = model.userData.sword || null
  const swordRest = sword ? sword.quaternion.clone() : null
  const grip = asset ? genggam(model, 5) : { bone: null, at: new THREE.Vector3() }
  const arm = grip.bone
  let swordDown = false
  const qArm = new THREE.Quaternion()
  const qWant = new THREE.Quaternion()
  const qTilt = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -0.3) // ujung sedikit ke depan
  const Y = new THREE.Vector3(0, 1, 0)
  function orientSword() {
    if (!sword) return
    if (!swordDown) {
      // siku yang menekuk (jalan, lari) ikut mengangkat bilah: sebagian dikembalikan supaya bilah
      // tetap condong ke depan-bawah, tidak teracung saat berlari
      sword.quaternion.copy(siku(5, -0.6 * sudutSiku(5, arm.quaternion), qWant)).multiply(swordRest)
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
    rod.position.copy(grip.at)
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

  // --- bentuk badan tiap frame (ditumpangkan di atas animasi):
  // - condong ke depan saat menambah laju / berlari kencang, miring ke dalam tikungan;
  // - pegas teredam saat menolak & mendarat: seperti kaki manusia — mendarat = lutut, pinggul, dan
  //   pergelangan kaki menekuk meredam hentakan (pinggul turun) lalu meregang lagi; menolak = ujung
  //   kaki menjinjit sesaat;
  // - kuda-kuda jurus Hentak: lutut ditekuk dalam.
  let leanF = 0
  let leanS = 0
  let prevFwd = 0
  let prevHeading = 0
  let sq = 0 // > 0 menolak, < 0 meredam
  let sqV = 0
  let crouchY = 0 // m pinggul diturunkan (kuda-kuda)
  function shape(dt, hs, onFoot) {
    const fwd = vel.x * Math.sin(heading) + vel.z * Math.cos(heading)
    const acc = dt > 0 ? (fwd - prevFwd) / dt : 0
    const yawRate = dt > 0 ? wrap(heading - prevHeading) / dt : 0
    prevFwd = fwd
    prevHeading = heading
    const k = 1 - Math.exp(-8 * dt)
    const wantF = onFoot ? THREE.MathUtils.clamp(acc * 0.009, -0.09, 0.09) + 0.05 * smooth(3, RUN_SPEED, hs) : 0
    const wantS = onFoot ? THREE.MathUtils.clamp(-yawRate * hs * 0.02, -0.13, 0.13) : 0
    leanF += (wantF - leanF) * k
    leanS += (wantS - leanS) * k
    for (let t = dt; t > 1e-6; t -= 1 / 60) {
      const h = Math.min(t, 1 / 60)
      sqV += (-170 * sq - 15 * sqV) * h
      sq += sqV * h
    }
    model.rotation.x = leanF
    model.rotation.z = leanS
    legSpring(THREE.MathUtils.clamp(sq, -0.2, 0.14))
  }
  // bentuk badan biasa (duduk di perahu, roboh)
  function neutralShape() {
    leanF = leanS = sq = sqV = 0
    model.rotation.x = model.rotation.z = 0
    model.position.y = 0
  }

  // Tulang-tulang rangka bersendi. Ubahan sesudah mixer (memanjat, di udara, lutut meredam) dihapus
  // lagi sebelum mixer.update berikutnya dengan memulihkan pose hasil mixer: mixer hanya menulis nilai
  // yang BERUBAH sejak bingkai sebelumnya (pose yang tertahan — akhir lompatan, kuda-kuda, game dijeda
  // — tidak ditulis ulang), jadi tulang tidak boleh dikembalikan ke pose bind. Tulang yang tidak lagi
  // digerakkan klip mana pun dikembalikan mixer sendiri ke pose bind.
  const bones = Object.fromEntries(TULANG_SENDI.map(n => [n, model.getObjectByName(n)]).filter(([, b]) => b))
  const mixed = Object.fromEntries(Object.entries(bones).map(([n, b]) => [n, [b.position.clone(), b.quaternion.clone()]]))
  function restorePose() {
    for (const n in bones) {
      bones[n].position.copy(mixed[n][0])
      bones[n].quaternion.copy(mixed[n][1])
    }
  }
  function savePose() {
    for (const n in bones) {
      mixed[n][0].copy(bones[n].position)
      mixed[n][1].copy(bones[n].quaternion)
    }
  }
  const X = new THREE.Vector3(1, 0, 0)
  const toward = (j, x, y, z) => new THREE.Quaternion().setFromUnitVectors(armDir(j), new THREE.Vector3(x, y, z).normalize())
  const rotX = a => new THREE.Quaternion().setFromAxisAngle(X, a)
  const CLIMB_Q = {
    up: { 4: toward(4, 0.3, 0.85, 0.45), 5: toward(5, -0.3, 0.85, 0.45) }, // meraih tepi
    push: { 4: toward(4, 0.32, -0.45, 0.85), 5: toward(5, -0.32, -0.45, 0.85) }, // menekan dek
    lean: rotX(0.5),
    // kaki kanan melangkah naik (paha ke depan 66°, lutut 100°, telapak rata), kaki kiri menolak
    knee: rotX(-1.15),
    shin: rotX(1.75),
    foot: rotX(-0.6),
    back: rotX(0.35),
    shinBack: rotX(0.55),
  }
  const qMix = new THREE.Quaternion()
  const qAdd = new THREE.Quaternion()
  function overrideBone(name, q, w) {
    if (!bones[name] || w <= 0.001) return
    bones[name].quaternion.slerp(q, Math.min(1, w))
  }
  // tambahkan putaran sudut `a` pada sumbu X lokal tulang (di atas pose klip)
  function bendBone(name, a) {
    if (bones[name] && Math.abs(a) > 1e-4) bones[name].quaternion.multiply(qAdd.setFromAxisAngle(X, a))
  }
  // pose panjat pada saat u (0..1): lengan meraih ke atas, siku menekuk menarik badan, lalu menekan
  // dek; badan condong, kaki kanan diangkat melangkah naik
  function climbPose(u) {
    const arms = smooth(0, 0.18, u) * (1 - smooth(0.8, 1, u))
    const push = smooth(0.4, 0.66, u)
    const pull = 0.25 + 1.35 * smooth(0.18, 0.4, u) * (1 - smooth(0.5, 0.72, u))
    for (const j of [4, 5]) {
      qMix.copy(CLIMB_Q.up[j]).slerp(CLIMB_Q.push[j], push)
      overrideBone(j === 4 ? 'arm-left' : 'arm-right', qMix, arms)
      overrideBone(j === 4 ? 'forearm-left' : 'forearm-right', siku(j, pull, qMix), arms)
    }
    overrideBone('torso', CLIMB_Q.lean, smooth(0.3, 0.55, u) * (1 - smooth(0.75, 1, u)))
    const step = smooth(0.45, 0.7, u) * (1 - smooth(0.86, 1, u))
    overrideBone('leg-right', CLIMB_Q.knee, step)
    overrideBone('shin-right', CLIMB_Q.shin, step)
    overrideBone('foot-right', CLIMB_Q.foot, step)
    const back = smooth(0, 0.3, u) * (1 - smooth(0.6, 0.9, u))
    overrideBone('leg-left', CLIMB_Q.back, back)
    overrideBone('shin-left', CLIMB_Q.shinBack, back)
  }
  // di udara: lengan berayun naik ke depan saat menolak, terbuka menjaga keseimbangan saat turun,
  // siku sedikit menekuk; lutut ditarik ke atas saat naik & di puncak, diluruskan menjelang mendarat
  // (klip lompat Kenney hanya merentangkan lengan lurus ke samping)
  // (lengan kanan berpedang berayun lebih sedikit: bilahnya tetap condong ke bawah)
  const AIR_Q = {
    rise: { 4: toward(4, 0.4, 0.62, 0.68), 5: toward(5, -0.78, 0.12, 0.6) },
    fall: { 4: toward(4, 0.85, 0.4, 0.15), 5: toward(5, -0.9, 0.05, 0.3) },
  }
  let airW = 0
  function airPose(dt, on) {
    airW += ((on ? 0.8 : 0) - airW) * (1 - Math.exp(-(on ? 10 : 14) * dt))
    if (airW < 0.01) return
    const rise = smooth(-2.5, 3.5, vel.y)
    for (const j of [4, 5]) {
      qMix.copy(AIR_Q.fall[j]).slerp(AIR_Q.rise[j], rise)
      overrideBone(j === 4 ? 'arm-left' : 'arm-right', qMix, airW)
      overrideBone(j === 4 ? 'forearm-left' : 'forearm-right', siku(j, j === 5 ? 0.25 : 0.45, qMix), airW)
    }
    const tuck = airW * smooth(-4.5, -1, vel.y)
    for (const k of ['left', 'right']) {
      bendBone(`leg-${k}`, -0.45 * tuck)
      bendBone(`shin-${k}`, 0.95 * tuck)
      bendBone(`foot-${k}`, 0.35 * tuck)
    }
  }
  // lutut menekuk sudut a (paha a ke depan, lutut 2a, pergelangan a → telapak tetap rata) dan pinggul
  // turun sebanyak itu; pegas: s < 0 meredam (mendarat), s > 0 menjinjit (menolak); kuda-kuda
  // Hentak: pinggul turun crouchY m — selebihnya dari tekukan terdalam, badan diturunkan
  function legSpring(s) {
    const drop = Math.max(0, -s) * 0.09 + crouchY / MODEL_SCALE
    const a = Math.acos(1 - Math.min(drop, TUNGKAI * 0.45) / TUNGKAI)
    if (a > 1e-3)
      for (const k of ['left', 'right']) {
        bendBone(`leg-${k}`, -a)
        bendBone(`shin-${k}`, 2 * a)
        bendBone(`foot-${k}`, -a)
      }
    if (bones.root) bones.root.position.y -= TUNGKAI * (1 - Math.cos(a))
    if (s > 0) for (const k of ['left', 'right']) bendBone(`foot-${k}`, 2.4 * s)
    model.position.y = -Math.max(0, drop - TUNGKAI * 0.45) * MODEL_SCALE
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
      if (mainKey === name) a.reset()
      else play(name, 0.06)
      a.timeScale = speed
      a.time = from
    },
    // tahan satu pose: animasi berhenti di detik `time` sampai release()
    pose(name, time) {
      const a = actions[name]
      if (!a) return
      if (mainKey !== name) play(name, 0.06)
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
    // badan direndahkan `amount` m (kuda-kuda saat pedang tertancap): lutut menekuk
    crouch(amount) {
      crouchY = amount
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
    if (m > 0.05) heading += wrap(Math.atan2(dx, dz) - heading) * Math.min(1, 6 * dt)
    pos.x += vel.x * dt
    pos.z += vel.z * dt
    colliders.resolve(pos, RADIUS, vel)
    blockLedges(pos.y) // sisi dek dermaga menahan perenang (naik lewat tombol Panjat)
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
    const y0 = pos.y // tinggi kaki sebelum langkah ini: lantai yang bisa dilangkahi diukur darinya
    const depth = ISLAND.seaLevel - support(pos.x, pos.z, y0)
    if (!atk) speed *= speedBoost
    if (depth > WADE_DEPTH && !atk) speed *= 0.55
    // berbalik tajam: melambat dulu sambil memutar badan (tidak berjalan mundur)
    if (!atk && m > 0.05 && grounded) speed *= 0.25 + 0.75 * smooth(2.6, 1.2, Math.abs(wrap(Math.atan2(dx, dz) - heading)))

    // percepat menuju kecepatan yang diinginkan
    const tvx = dx * speed
    const tvz = dz * speed
    const ddx = tvx - vel.x
    const ddz = tvz - vel.z
    const dl = Math.hypot(ddx, ddz)
    if (atk?.keep) {
      // melayang (Hentakan): kecepatan datar dipertahankan
    } else if (atk) {
      const accel = (grounded ? ACCEL_GROUND : ACCEL_AIR) * dt
      if (dl <= accel || atk.instant) {
        vel.x = tvx
        vel.z = tvz
      } else {
        vel.x += (ddx / dl) * accel
        vel.z += (ddz / dl) * accel
      }
    } else if (dl > 1e-6) {
      // gerak biasa: secepat-cepatnya ACCEL, melambat halus menjelang kecepatan tujuannya
      const accel = Math.min(grounded ? ACCEL_GROUND : ACCEL_AIR, dl * EASE) * dt
      if (accel >= dl || dl < 0.02) {
        vel.x = tvx
        vel.z = tvz
      } else {
        vel.x += (ddx / dl) * accel
        vel.z += (ddz / dl) * accel
      }
    }
    // menghadap ke arah gerak (berbelok / berbalik halus, ±0,3 detik untuk setengah putaran)
    if (m > 0.05) heading += wrap(Math.atan2(dx, dz) - heading) * Math.min(1, 10 * dt)

    // lompat (dengan coyote time dan buffer tombol)
    coyote = grounded ? COYOTE_TIME : coyote - dt
    jumpBuffer = input.jump ? JUMP_BUFFER : jumpBuffer - dt
    if (jumpBuffer > 0 && coyote > 0 && depth < SWIM_EXIT && !atk) {
      vel.y = JUMP_SPEED
      grounded = false
      coyote = 0
      jumpBuffer = 0
      airTime = 0
      sqV += 2.4 // badan memanjang saat menolak
      play('jump', 0.06)
    }
    vel.y -= GRAVITY * dt

    pos.x += vel.x * dt
    pos.z += vel.z * dt
    pos.y += vel.y * dt
    colliders.resolve(pos, RADIUS, vel)
    blockLedges(y0)

    // pijakan: tanah, atau lantai yang bisa dilangkahi dari kaki sebelum langkah ini
    const gy = support(pos.x, pos.z, y0)
    const onFloor = gy > ground.heightAt(pos.x, pos.z) + 0.02
    // lereng tanah terlalu curam: tidak bisa didaki, perlahan merosot (lantai bangunan tidak)
    const g = onFloor ? null : gradient(pos.x, pos.z)
    if (g && g.len > MAX_SLOPE) {
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

    if (pos.y <= gy) {
      if (!grounded && airTime > 0.06) land(-vel.y)
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

  // mendarat: badan memendek sebentar (makin keras jatuhnya makin dalam) lalu memantul kembali;
  // jatuh dari tempat tinggi membuat langkah tersendat sejenak
  function land(impact) {
    sqV -= 2.6 * THREE.MathUtils.clamp(impact / JUMP_SPEED, 0.25, 1.7)
    if (impact > 11) {
      vel.x *= 0.6
      vel.z *= 0.6
    }
  }

  // --- memanjat (dek dermaga dari air, batur dari samping): ±1 detik — meraih tepi, menarik badan,
  // melangkah naik. Kenney tidak punya klip memanjat: lengan, badan, dan kaki digerakkan di sini,
  // ditumpangkan di atas klip diam
  let climbable = null // tepi yang bisa dipanjat di depan (findClimb) atau null
  let climb = null // panjatan yang sedang berjalan
  function startClimb(c) {
    climb = {
      t: 0, dur: 0.55 + 0.2 * (c.y - pos.y), x0: pos.x, y0: pos.y, z0: pos.z,
      // bergantung di tepi (badan tepat di luar kotak lantai) → badan di atas tepi → berdiri di dalam
      hx: c.ex + c.nx * RADIUS * 0.8, hz: c.ez + c.nz * RADIUS * 0.8,
      ex: c.ex - c.nx * 0.12, ez: c.ez - c.nz * 0.12,
      x1: c.x, y1: c.y, z1: c.z, heading: c.heading,
      cam: swimming ? ISLAND.seaLevel + 0.75 - pos.y : 1.5,
    }
    climbable = null
    swimming = false
    grounded = false
    vel.set(0, 0, 0)
    path.length = 0
    combat.reset()
    play(GERAK, 0.2)
  }
  const ease = t => t * t * (3 - 2 * t)
  function stepClimb(dt) {
    const c = climb
    c.t += dt
    const u = Math.min(1, c.t / c.dur)
    const hang = Math.max(c.y0, c.y1 - 1.05) // tangan di tepi dek
    if (u < 0.35) {
      const k = ease(u / 0.35)
      pos.set(c.x0 + (c.hx - c.x0) * k, c.y0 + (hang - c.y0) * k, c.z0 + (c.hz - c.z0) * k)
    } else if (u < 0.72) {
      const k = ease((u - 0.35) / 0.37)
      pos.set(c.hx + (c.ex - c.hx) * k, hang + (c.y1 - 0.25 - hang) * k, c.hz + (c.ez - c.hz) * k)
    } else {
      const k = ease((u - 0.72) / 0.28)
      pos.set(c.ex + (c.x1 - c.ex) * k, c.y1 - 0.25 + 0.25 * k, c.ez + (c.z1 - c.ez) * k)
    }
    heading += wrap(c.heading - heading) * Math.min(1, dt * 12)
    if (u >= 1) {
      climb = null
      pos.set(c.x1, c.y1, c.z1)
      grounded = true
      airTime = 0
      sqV -= 1.1 // menjejak dek
    }
    return u
  }

  // animasi + bentuk badan + barang di tangan + bayangan bulat; climbU = saat panjat (0..1) atau −1
  function animate(dt, hs, climbU = -1) {
    restorePose()
    blend(dt, hs, swimming ? swimPose : 0)
    mixer?.update(dt)
    savePose()
    if (climbU >= 0) climbPose(climbU)
    airPose(dt, climbU < 0 && !grounded && !swimming && !combat.busy && !pose && (mainKey === 'jump' || mainKey === 'fall'))
    shape(dt, hs, grounded && !swimming && climbU < 0 && !combat.busy)
    orientSword()
    orientRod()
    showGear(!swimming && !pose && climbU < 0) // pedang disimpan saat berenang / memancing / memanjat
    if (blob) {
      const gy = support(pos.x, pos.z, pos.y + 0.05)
      const h = pos.y - gy
      blob.visible = !swimming && climbU < 0
      blob.position.set(pos.x, gy + 0.05, pos.z)
      blob.material.opacity = Math.max(0, 1 - h / 3)
      blob.scale.setScalar(1 + h * 0.15)
    }
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
      if (climb) return climb.cam + (1.5 - climb.cam) * ease(Math.min(1, climb.t / climb.dur))
      if (swimming) return ISLAND.seaLevel + 0.75 - pos.y
      return 1.5
    },
    // ada tepi yang bisa dipanjat di depan (tombol Panjat) / sedang memanjat
    get climbable() {
      return !!climbable && !climb
    },
    get climbing() {
      return !!climb
    },
    // panjat tepi di depan (dek dermaga dari air, batur dari samping)
    climb() {
      if (!climbable || climb || ride || defeated || frozen) return false
      startClimb(climbable)
      return true
    },
    // duduk di perahu: fn() → { x, y, z, heading, vx, vz, moving } tiap frame; null = turun
    setRide(fn) {
      ride = fn
      path.length = 0
      combat.reset()
      climb = null
      if (!fn) {
        play(GERAK, 0.1)
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
      return out.set(pos.x + Math.sin(heading) * 0.6, pos.y + 1.35, pos.z + Math.cos(heading) * 0.6)
    },
    // putar satu gerakan sekali (mis. melempar kail, mengangkat ikan)
    gesture(name, seconds = 0) {
      const a = actions[name]
      if (!a) return
      if (mainKey === name) a.reset()
      else play(name, 0.1)
      gestureT = seconds || a.getClip().duration
    },
    get attacking() {
      return combat.busy
    },
    // pengujian: lapisan animasi & bobot klip yang sedang diputar
    get anim() {
      const w = {}
      for (const n in actions) if (actions[n].isScheduled()) w[n] = +actions[n].getEffectiveWeight().toFixed(2)
      return { main: mainKey, layers: layers.map(l => `${l.key}:${l.w.toFixed(2)}`), w }
    },
    get hp() {
      return hp
    },
    get defeated() {
      return defeated
    },
    // terkena serangan sebesar `amount` dari arah `from` ({ x, z }): terdorong menjauh. floor = nyawa
    // paling rendah oleh pukulan ini (> 0: tidak roboh — mis. kalah duel, lihat rekrut.js)
    damage(amount, from, floor = 0) {
      if (defeated || frozen) return
      hp = Math.max(floor, hp - amount * (1 - defense))
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
      stunT = 0
      play(GERAK, 0.05)
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
      climb = null
      frozen = false
      stunT = 0
      play(GERAK, 0.05)
    },
    freeze() {
      frozen = true
      vel.set(0, 0, 0)
    },
    // jatuh terduduk sesaat (mis. kalah duel): roboh, tidak bisa bergerak, bangun setelah `seconds` detik
    stun(seconds) {
      if (defeated || ride) return
      path.length = 0
      combat.reset()
      climb = null
      frozen = true
      vel.set(0, 0, 0)
      stunT = seconds
      gestureT = seconds
      play('die', 0.12)
    },
    get stunned() {
      return stunT > 0
    },
    update(dt, input, camYaw) {
      if (defeated) {
        // roboh: terbaring sampai main.js memindahkan & membangunkan
        climb = null
        climbable = null
        neutralShape()
        restorePose()
        blend(dt, 0)
        mixer?.update(dt)
        savePose()
        return
      }
      if (hp < MAX_HP && (calmT += dt) > REGEN.delay) hp = Math.min(MAX_HP, hp + REGEN.rate * dt)
      if (stunT > 0 && (stunT -= dt) <= 0) {
        frozen = false
        play(GERAK, 0.35)
      }
      swimT += dt
      // duduk di perahu: letak & arah mengikuti perahu (perahu.js), tanpa fisika
      if (ride) {
        const r = ride()
        pos.set(r.x, r.y, r.z)
        vel.set(r.vx, 0, r.vz);
        ({ heading } = r)
        root.rotation.y = heading
        climbable = null
        neutralShape()
        if ((gestureT -= dt) <= 0) play(pose || (r.moving ? 'drive' : 'sit'), 0.25)
        restorePose()
        blend(dt, 0)
        mixer?.update(dt)
        savePose()
        orientRod()
        showGear(false)
        if (blob) blob.visible = false
        return
      }
      // Spasi di depan tepi yang bisa dipanjat (komputer) = memanjat, bukan melompat
      let inp = input
      if (inp.jump && climbable && !climb && !frozen && !combat.busy && !pose) {
        startClimb(climbable)
        inp = { ...inp, jump: false }
      }
      if (climb) {
        const u = stepClimb(dt)
        root.rotation.y = heading
        animate(dt, 0, u)
        return
      }
      // masuk air yang dalam (berjalan / jatuh dari dermaga) → berenang; ke air dangkal → berjalan
      const depth0 = ISLAND.seaLevel - support(pos.x, pos.z, pos.y)
      if (!swimming && depth0 > SWIM_DEPTH && pos.y < ISLAND.seaLevel - 0.25) {
        swimming = true
        combat.reset()
        path.length = 0
        vel.y = 0
      } else if (swimming && depth0 < SWIM_EXIT) swimming = false
      // pukulan (kombo) & jurus — sebelum fisika agar gerak langsung berhenti saat mulai menyerang
      // (tidak bisa menyerang sambil berenang)
      if (!frozen && !swimming) combat.update(dt, inp)
      if (!frozen) {
        // langkah kecil saat frame lambat atau bergerak cepat (Serbuan 22 m/s): maks. ±0,3 m per
        // langkah, kalau tidak prajurit bisa "menembus" batang pohon dalam satu langkah
        const atk = combat.drive()
        const want = atk && !atk.keep ? Math.hypot(atk.vx, atk.vz) : 0
        const fast = Math.max(Math.hypot(vel.x, vel.z), want)
        const n = Math.min(12, Math.max(dt > 1 / 45 ? 2 : 1, Math.ceil((fast * dt) / 0.3)))
        for (let i = 0; i < n; i++) step(dt / n, i === 0 ? inp : { ...inp, jump: false }, camYaw)
      }
      root.rotation.y = heading
      // tepi yang bisa dipanjat di depan (tombol Panjat): saat berdiri / berenang, tidak sedang menyerang
      climbable = !frozen && !combat.busy && !pose && (grounded || swimming) ? findClimb(Math.sin(heading), Math.cos(heading)) : null

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
      if (!frozen && !insideWorld(pos.x, pos.z, WORLD_MARGIN)) onRespawnNeeded('jauh')

      // simpan posisi aman (di darat / lantai, tidak curam) secara berkala
      const gy = support(pos.x, pos.z, pos.y + 0.05)
      safeTimer += dt
      if (safeTimer > 0.4 && grounded && gy > 0.4 && (gy > ground.heightAt(pos.x, pos.z) + 0.02 || gradient(pos.x, pos.z).len < 0.8)) {
        safeTimer = 0
        lastSafe.copy(pos)
        lastSafeHeading = heading
      }

      // animasi menurut keadaan (animasi serangan dibiarkan selesai dulu). Berenang: lapisan berenang
      // (mengapung tegak ↔ gaya bebas menurut laju). Di darat: lapisan gerak (campuran diam / jalan /
      // lari menurut kecepatan); di udara: lompat selama naik, jatuh saat turun
      const hs = Math.hypot(vel.x, vel.z)
      if (swimming) play(RENANG, 0.3)
      else if ((gestureT -= dt) > 0) {
        // gerakan sekali sedang diputar
      } else if (pose && !combat.busy) play(pose, 0.2)
      else if (!combat.busy && grounded) play(GERAK, mainKey === 'jump' || mainKey === 'fall' ? 0.1 : 0.2)
      else if (!combat.busy && airTime > 0.12) play(vel.y > 0 && mainKey === 'jump' ? 'jump' : 'fall', mainKey === 'jump' ? 0.25 : 0.15)
      animate(dt, hs)
    },
  }
}
