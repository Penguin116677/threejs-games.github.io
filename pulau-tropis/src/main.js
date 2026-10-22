import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { quality, setQualityLevel } from './core/quality.js'
import { createNoiseTexture, createWaterNormalTexture } from './core/noiseTexture.js'
import { PlacementGrid } from './core/spatial.js'
import { ISLAND, heightAt as islandHeight } from './world/island.js'
import { WORLD } from './world/world.js'
import { createGround, createTerrain } from './world/terrain.js'
import { createShoreData, waveTime } from './world/shore.js'
import { createWater } from './world/water.js'
import { createEnvironment } from './world/sky.js'
import { createTrees, seeThrough } from './world/trees.js'
import { createRocks } from './world/rocks.js'
import { createGrass } from './world/grass.js'
import { createColliders } from './world/colliders.js'
import { createNavGrid } from './world/navgrid.js'
import { createEnemies } from './world/enemies.js'
import { planKencana } from './world/kencana/plan.js'
import { createRegionMask } from './world/kencana/mask.js'
import { createKencana } from './world/kencana/kingdom.js'
import { createVillagers } from './world/kencana/villagers.js'
import { createArmy, balaParts } from './world/kencana/pasukan.js'
import { createSoldiers } from './world/kencana/prajurit.js'
import { createSecurity } from './world/kencana/keamanan.js'
import { planAeloria } from './world/aeloria/plan.js'
import { createAeloria } from './world/aeloria/kingdom.js'
import { createWorldMap, createRegionBanner } from './ui/peta.js'
import { createBubbles, createHealthBar } from './ui/tanya.js'
import { createInput } from './player/input.js'
import { createStrategyCamera } from './player/camera.js'
import { createMarkers } from './player/marker.js'
import { createSwingEffects } from './player/effects.js'
import { SKILLS } from './player/combat.js'
import { createPlayer, loadPlayerModel, MAX_HP } from './player/player.js'

const $ = id => document.getElementById(id)

// Error ditampilkan di layar — di HP tidak ada konsol developer.
function showError(msg) {
  $('loading').hidden = true
  $('error').hidden = false
  $('error-teks').textContent = String(msg)
}
window.addEventListener('error', e => showError(e.error?.stack || e.message))
window.addEventListener('unhandledrejection', e => showError(e.reason?.stack || e.reason))

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!c.getContext('webgl2')
  } catch {
    return false
  }
}

function setStatus(teks) {
  $('loading-teks').textContent = teks
}

// beri browser kesempatan menggambar layar loading sebelum kerja berat
const nextFrame = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)))

const LABEL = { rendah: 'Rendah', sedang: 'Sedang', tinggi: 'Tinggi' }

let messageTimer = 0
function showMessage(teks, ms = 2800) {
  const el = $('pesan')
  el.textContent = teks
  el.hidden = false
  clearTimeout(messageTimer)
  messageTimer = setTimeout(() => {
    el.hidden = true
  }, ms)
}

// Titik mulai: pasir kering di pantai barat daya, menghadap ke gunung.
function findSpawn(ground, colliders) {
  const d = Math.SQRT1_2
  for (let r = 140; r < 280; r += 1) {
    const x = -d * r
    const z = d * r
    const h = ground.heightAt(x, z)
    if (h > 0.9 && h < 2.2 && ground.slopeAt(x, z) < 0.3 && colliders.isFree(x, z, 0.9))
      return { x, z, heading: Math.atan2(-x, -z) }
  }
  return { x: -128, z: 128, heading: Math.atan2(128, -128) }
}

const HINT_TOUCH = '<b>Ketuk tanah</b> untuk berjalan ke sana (jauh = lari)<br>Geser: putar kamera · Cubit: zoom<br><b>Pukul</b> berulang = kombo · 4 tombol <b>jurus</b> · musuh orc ada di depan<br><b>Peta</b>: Kerajaan Kencana di barat (Jembatan Agung) — kamu musuh setiap kerajaan, prajuritnya akan menyerangmu'
const HINT_KEYS = '<b>Klik tanah</b> untuk berjalan ke sana · WASD / panah juga bisa<br>Seret mouse: putar kamera · Roda: zoom · Spasi: lompat<br>F: pukul (kombo) · 1–4: jurus Cincang, Hentak, Putar, Penggal<br>M: peta — Kerajaan Kencana di barat (Jembatan Agung); kamu musuh setiap kerajaan, prajuritnya akan menyerangmu'

// FOV kamera: mode main (kamera atas) lebih sempit agar prajurit tidak terlalu kecil;
// layar tegak butuh FOV lebih lebar agar sisi kiri-kanan tetap terlihat
const FOV = { main: [55, 42], lihat: [70, 55] }

function setupQualityMenu() {
  const btn = $('btn-kualitas')
  const panel = $('panel-kualitas')
  btn.textContent = `Kualitas: ${LABEL[quality.level]}`
  panel.querySelectorAll('button[data-q]').forEach(b => {
    b.classList.toggle('aktif', b.dataset.q === quality.level)
    b.addEventListener('click', () => {
      if (b.dataset.q === quality.level) {
        panel.hidden = true
        return
      }
      panel.hidden = true
      $('loading').hidden = false
      setStatus(`Mengganti kualitas ke ${LABEL[b.dataset.q]}…`)
      setTimeout(() => setQualityLevel(b.dataset.q), 50)
    })
  })
  btn.addEventListener('click', () => {
    panel.hidden = !panel.hidden
    $('saran').hidden = true
  })
  $('btn-tutup-kualitas').addEventListener('click', () => {
    panel.hidden = true
  })
}

async function start() {
  if (!webglAvailable()) {
    showError('Browser ini tidak mendukung WebGL 2.\nCoba gunakan Chrome versi terbaru di Android.')
    return
  }

  const canvas = $('game')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.maxPixelRatio))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  if (quality.shadows) {
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = quality.softShadows ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 5000)

  setStatus('Menyiapkan tekstur…')
  await nextFrame()
  const noiseTexture = createNoiseTexture(renderer)
  const shared = { noiseTexture, quality }

  setStatus('Membuat langit dan cahaya…')
  await nextFrame()
  const env = createEnvironment(scene, shared)

  setStatus('Membentuk pulau-pulau…')
  await nextFrame()
  const ground = createGround(quality.terrainSegments)
  const shore = createShoreData(ground, quality.water.shoreRes)
  // rencana Kepulauan Kencana (kota, jalan, sawah) & Aeloria (kerajaan elf di utara) dulu: catnya
  // ikut digambar shader tanah. Masker Aeloria 1,5 m per texel (jalan tetap halus, memori kecil);
  // juga menjangkau pantai utara Pulau Tropis (kepala Jembatan Perak)
  const plan = planKencana(ground)
  const region = createRegionMask(plan, ground)
  const elfPlan = planAeloria(ground)
  const elfMask = createRegionMask(elfPlan, ground, { rect: { x0: -450, z0: -1140, x1: 450, z1: -165 }, cell: 1.5, style: 1, free: null })
  const terrain = createTerrain(ground, { ...shared, regions: [region, elfMask] })
  scene.add(terrain)
  const reservedAll = (x, z, r) => region.reserved(x, z, r) || elfMask.reserved(x, z, r)

  setStatus('Menanam pohon dan menebar batu…')
  await nextFrame()
  const grid = new PlacementGrid(8)
  // pohon & batu Pulau Tropis ditebar di atas bentuk pulau tengah saja (area lama 1000 m),
  // jadi letaknya sama persis seperti sebelum Kepulauan Kencana ada; kepala Jembatan Agung
  // di pantai barat dikosongkan
  const centralGround = createGround(quality.terrainSegments, { heightFn: islandHeight, rect: { minX: -500, maxX: 500, minZ: -500, maxZ: 500 } })
  const trees = createTrees({ ground: centralGround, grid, quality, noiseTexture, reserved: reservedAll })
  const rocks = createRocks({ ground: centralGround, grid, quality, reserved: reservedAll })
  scene.add(trees, rocks)

  setStatus('Membangun Kerajaan Kencana…')
  await nextFrame()
  const kencana = createKencana({ ground, plan, mask: region, grid, quality, noiseTexture })
  scene.add(kencana.object)
  setStatus('Membangun Kerajaan Aeloria…')
  await nextFrame()
  const aeloria = createAeloria({ ground, plan: elfPlan, mask: elfMask, grid, quality, noiseTexture })
  scene.add(aeloria.object)
  // lantai jembatan, dermaga, batur pendopo, tangga: bisa diinjak
  ground.setSurfaces([...kencana.surfaces, ...aeloria.surfaces])
  terrain.userData.applyOcclusion([...trees.userData.occlusion, ...rocks.userData.occlusion, ...kencana.occlusion, ...aeloria.occlusion])
  // batang pohon + batu besar + dinding bangunan menghalangi pemain; batu kecil bisa dilangkahi
  const colliders = createColliders([
    ...trees.userData.trunks,
    ...rocks.userData.colliders.filter(c => c.radius >= 0.8),
    ...kencana.colliders,
    ...aeloria.colliders,
  ])
  // peta jalan untuk "ketuk untuk berjalan" (memutari pohon, batu, tebing, laut dalam)
  const nav = createNavGrid(ground, colliders)

  setStatus('Menumbuhkan rumput…')
  await nextFrame()
  const grass = createGrass({ ground, grid, quality })
  scene.add(grass)

  setStatus('Mengisi lautan…')
  await nextFrame()
  const normalTexture = createWaterNormalTexture(renderer)
  const water = createWater({ ground, shore, env, noiseTexture, normalTexture, quality })
  scene.add(water)

  setStatus('Menyiapkan karakter…')
  await nextFrame()
  const modelUrl = name => new URL(`models/${name}`, document.baseURI).href
  let asset = null
  try {
    asset = await loadPlayerModel(modelUrl('prajurit.glb'), quality, modelUrl('pedang.glb'))
  } catch (err) {
    console.warn('Model karakter gagal dimuat:', err)
  }
  // musuh orc (model terpisah; bila gagal dimuat, game tetap jalan tanpa musuh)
  let orcAsset = null
  try {
    orcAsset = await loadPlayerModel(modelUrl('orc.glb'), quality)
  } catch (err) {
    console.warn('Model musuh gagal dimuat:', err)
  }
  // kuda & perisai (bala.glb) untuk bala tentara dan prajurit penjaga
  let bala = null
  if (asset)
    try {
      const balaGltf = await new GLTFLoader().loadAsync(modelUrl('bala.glb'))
      bala = balaParts(balaGltf)
    } catch (err) {
      console.warn('Model kuda & perisai gagal dimuat:', err)
    }
  // prajurit yang bertugas: peronda di semua wilayah + penjaga pos (gerbang, keraton, jembatan)
  setStatus('Menugaskan prajurit penjaga…')
  await nextFrame()
  let soldiers = null
  if (asset)
    try {
      soldiers = createSoldiers({ ground, colliders, nav, plan, spots: kencana.spots, quality, soldier: asset, shieldRect: bala?.shieldRect ?? null })
      scene.add(soldiers.object)
    } catch (err) {
      console.warn('Prajurit penjaga gagal dibuat:', err)
    }
  // penduduk Kepulauan Kencana (bila gagal dimuat, kota tetap ada tanpa penduduk); penjaga pos
  // sudah ikut prajurit di atas
  setStatus('Mengundang penduduk kerajaan…')
  await nextFrame()
  let villagers = null
  try {
    const villagerGltf = await new GLTFLoader().loadAsync(modelUrl('penduduk.glb'))
    const spots = soldiers ? kencana.spots.filter(s => s.role !== 'penjaga') : kencana.spots
    villagers = createVillagers({ ground, routes: kencana.routes, spots, quality, villagerGltf, soldier: soldiers ? null : asset, scripted: soldiers ? 2 : 0 })
    scene.add(villagers.object)
  } catch (err) {
    console.warn('Penduduk gagal dimuat:', err)
  }
  // bala tentara di Tegal Wira (Pulau Wira): butuh model prajurit + kuda & perisai
  setStatus('Membariskan 25.000 prajurit…')
  await nextFrame()
  let army = null
  if (asset && bala)
    try {
      army = createArmy({ ground, plan, quality, soldier: asset, bala, renderer, env })
      scene.add(army.object)
    } catch (err) {
      console.warn('Bala tentara gagal dimuat:', err)
    }

  const player = createPlayer({ ground, colliders, quality, asset })
  scene.add(player.root)
  if (player.blob) scene.add(player.blob)
  const spawn = findSpawn(ground, colliders)
  player.placeAt(spawn.x, spawn.z, spawn.heading)
  const enemies = orcAsset ? createEnemies({ ground, colliders, nav, asset: orcAsset, spawn }) : null
  if (enemies) scene.add(enemies.object)
  // penjagaan kerajaan (dibuat setelah input, lihat di bawah); sasaran jurus Penggal: orc & prajurit
  // Kencana hidup terdekat (pemain musuh setiap kerajaan). id: 'o3' = orc ke-3, 's12' = prajurit ke-12
  let security = null
  const soldierOf = id => soldiers.list[Number(id.slice(1))]
  player.setArena({
    pickTargets(x, z, range, max) {
      const cands = enemies ? enemies.pickTargets(x, z, range, 99).map(t => ({ ...t, id: `o${t.id}` })) : []
      if (soldiers)
        for (const a of soldiers.list) if (soldiers.alive(a) && Math.hypot(a.x - x, a.z - z) <= range) cands.push({ id: `s${a.id}`, x: a.x, z: a.z })
      const near = cands.sort((a, b) => Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z)).slice(0, max)
      // urutkan menjadi jalur terpendek (tetangga terdekat) mulai dari (x, z)
      const out = []
      let cx = x
      let cz = z
      while (near.length) {
        let best = 0
        for (let i = 1; i < near.length; i++) if (Math.hypot(near[i].x - cx, near[i].z - cz) < Math.hypot(near[best].x - cx, near[best].z - cz)) best = i
        const [t] = near.splice(best, 1)
        out.push(t)
        cx = t.x
        cz = t.z
      }
      return out
    },
    position(id) {
      if (id[0] === 'o') return enemies ? enemies.position(Number(id.slice(1))) : null
      const a = soldierOf(id)
      return soldiers.alive(a) ? { x: a.x, z: a.z } : null
    },
    standable: (x, z) => nav.walkableAt(x, z) && colliders.isFree(x, z, 0.45) && ground.heightAt(x, z) > -0.9,
  })
  const orcIds = ids => ids.filter(id => id[0] === 'o').map(id => Number(id.slice(1)))
  // orc penyerbu menyerang prajurit kerajaan (dan pemain yang memukulnya)
  if (enemies && soldiers)
    enemies.setFoes({
      near(x, z, r) {
        const a = soldiers.nearest(x, z, r)
        return a ? { kind: 'prajurit', ref: a } : null
      },
      pos: t => (soldiers.alive(t.ref) ? t.ref : null),
      strike(orc, t, damage) {
        if (t.kind === 'prajurit') {
          soldiers.damage(t.ref, damage, orc.pos)
          security?.defend(t.ref, orc.id)
        } else player.damage(damage, orc.pos)
      },
    })

  // Kamera strategi dari atas (mode main) + input ketuk/keyboard
  const touchUI = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  const cam = createStrategyCamera(camera, ground)
  cam.lookFrom(spawn.heading + Math.PI) // di belakang prajurit, menghadap gunung
  const skillButtons = { cincang: $('btn-cincang'), hentak: $('btn-hentak'), putar: $('btn-putar'), penggal: $('btn-penggal') }
  const input = createInput({ canvas, jumpButton: $('btn-lompat'), attackButton: $('btn-pukul'), skillButtons, touch: touchUI })
  const NO_INPUT = { moveX: 0, moveY: 0, jump: false, attack: false, skill: null, lookDX: 0, zoom: 1, taps: [] }
  const markers = createMarkers(ground)
  scene.add(...markers.objects)

  // serangan: yang terkena (orc → nyawa berkurang & terpental; batang/batu → serpihan) + efeknya
  const effects = createSwingEffects(ground)
  scene.add(effects.object)
  player.onAttack(ev => {
    if (ev.type === 'gagal') {
      showMessage('Tidak ada musuh dalam jangkauan Penggal (±14 m).', 1800)
      return
    }
    if (ev.type === 'aim') {
      enemies?.mark(orcIds(ev.targets), true)
      return
    }
    if (ev.type === 'execute') {
      enemies?.mark(orcIds(ev.targets), false)
      const cut = enemies ? enemies.decapitate(orcIds(ev.targets), player.position) : []
      // prajurit Kencana tidak dipenggal: roboh tersabet (dan kawan-kawannya membalas)
      const felled = []
      for (const id of ev.targets) {
        if (id[0] !== 's') continue
        const a = soldierOf(id)
        if (!soldiers.alive(a)) continue
        cut.push({ x: a.x, y: a.y, z: a.z })
        soldiers.knockDown(a, player.position)
        felled.push(a)
      }
      security?.playerStruck(felled)
      effects.execute(cut, player.position)
      if (cut.length) cam.shake(0.22)
      return
    }
    if (ev.type === 'hit') {
      const shape = { x: ev.x, z: ev.z, r: ev.r }
      const struck = enemies ? enemies.hit(shape, ev.damage, ev.knock, ev.origin) : []
      const guards = soldiers ? soldiers.hit(shape, ev.damage, ev.knock, ev.origin) : []
      security?.playerStruck(guards)
      for (const a of guards) struck.push({ x: a.x, y: a.y, z: a.z })
      effects.attack(ev, colliders.hitAll(ev.x, ev.z, ev.r, 5), struck)
      if (ev.plant) cam.shake(0.4)
      else if (struck.length && ev.spin) cam.shake(0.12)
      return
    }
    effects.attack(ev)
  })

  // tombol jurus: lapisan gelap berputar + sisa detik selama jeda pakai
  const shownCooldown = {}
  function updateSkillButtons() {
    for (const [name, el] of Object.entries(skillButtons)) {
      const left = player.cooldowns[name]
      const key = left > 0 ? Math.ceil(left * 10) : 0 // perbarui ±10× per detik saja
      if (shownCooldown[name] === key) continue
      shownCooldown[name] = key
      el.style.setProperty('--cd', (left / SKILLS[name]).toFixed(3))
      el.querySelector('.cd').textContent = left > 0 ? Math.ceil(left) : ''
      el.classList.toggle('siap', left <= 0)
    }
  }

  // titik tanah/permukaan laut di bawah layar (x, y piksel): sinar dari kamera, maju bertahap
  // sampai berada di bawah tanah, lalu dipersempit (bisection) agar tepat
  const ray = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  const surfaceAt = (x, z) => Math.max(ground.surfaceAt(x, z), ISLAND.seaLevel)
  function pickGround(x, y) {
    const rect = canvas.getBoundingClientRect()
    ndc.set(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    const { origin: o, direction: d } = ray.ray
    let prev = 0
    let t = 0
    while (t < 1500) {
      const above = o.y + d.y * t - surfaceAt(o.x + d.x * t, o.z + d.z * t)
      if (above <= 0) {
        let lo = prev
        let hi = t
        for (let i = 0; i < 14; i++) {
          const mid = (lo + hi) / 2
          if (o.y + d.y * mid > surfaceAt(o.x + d.x * mid, o.z + d.z * mid)) lo = mid
          else hi = mid
        }
        return { x: o.x + d.x * hi, z: o.z + d.z * hi }
      }
      prev = t
      t += THREE.MathUtils.clamp(above * 0.5, 0.3, 25)
    }
    return null // menunjuk ke langit
  }

  // ketukan di layar → cari jalan ke titik itu
  function handleTap(tap) {
    if (player.defeated) return
    const hit = pickGround(tap.x, tap.y)
    if (!hit) return
    const path = nav.findPath(player.position, hit)
    if (path) {
      player.followPath(path)
      const end = path[path.length - 1]
      markers.showTarget(end.x, end.z, true)
      hideHint()
    } else {
      markers.showTarget(hit.x, hit.z, false)
      showMessage('Tidak ada jalan ke sana.', 1600)
    }
  }

  // Kamera orbit untuk mode "Lihat pulau" (melihat pulau dari atas, karakter diam)
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 8, 0)
  camera.position.set(-260, 140, 330)
  controls.enabled = false
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 12
  controls.maxDistance = 1500
  controls.maxPolarAngle = Math.PI * 0.47
  controls.rotateSpeed = quality.isMobile ? 0.6 : 0.8
  controls.zoomSpeed = 0.9
  controls.screenSpacePanning = false
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }

  // jaga kamera tetap di atas tanah / air, dan titik pandangnya di dalam dunia
  function keepCameraAboveGround() {
    const ground0 = Math.max(ground.surfaceAt(camera.position.x, camera.position.z), ISLAND.seaLevel)
    if (camera.position.y < ground0 + 3) camera.position.y = ground0 + 3
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, WORLD.minX + 50, WORLD.maxX - 50)
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, WORLD.minZ + 50, WORLD.maxZ - 50)
    controls.target.y = Math.max(ground.surfaceAt(controls.target.x, controls.target.z), 0) + 3
  }

  let mode = 'main'
  const agung = plan.spans.find(s => s.id === 'agung')
  // gelembung ucapan, nyawa pemain
  const bubbles = createBubbles($('gelembung'), camera)
  const health = createHealthBar($('nyawa'), $('luka'))
  // pendatang: dari ujung timur Jembatan Agung ke gerbang baratnya (ditanyai penjaga), lalu ke pasar
  const bridgeWest = Math.min(agung.a, agung.b) - 11
  const visit = {
    start: { x: Math.max(agung.a, agung.b) + 22, z: agung.at + 1.2 },
    gate: { x: bridgeWest + 3.2, z: agung.at + 0.8 },
    market: [{ x: -421, z: agung.at + 1.2 }, { x: -461, z: agung.at + 2.5 }, { x: -466, z: 51 }],
  }
  if (soldiers)
    security = createSecurity({ soldiers, enemies, player, bubbles, villagers, visit, ground, message: showMessage })
  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = FOV[mode][w < h ? 0 : 1]
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', resize)
  window.addEventListener('orientationchange', () => setTimeout(resize, 200))
  resize()

  // tombol layar penuh
  const btnFull = $('btn-layar-penuh')
  if (!document.documentElement.requestFullscreen) btnFull.hidden = true
  btnFull.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen().catch(() => {})
  })
  document.addEventListener('fullscreenchange', () => {
    btnFull.textContent = document.fullscreenElement ? 'Keluar layar penuh' : 'Layar penuh'
  })
  setupQualityMenu()

  // mode "main" (mengendalikan karakter) ↔ "lihat" (kamera bebas melihat pulau)
  function setMode(next) {
    const from = mode
    mode = next
    const main = mode === 'main'
    controls.enabled = !main
    input.setEnabled(main)
    $('btn-mode').textContent = main ? 'Lihat pulau' : 'Main lagi'
    if (main && from === 'lihat') {
      // lanjut dari arah kamera sekarang, dengan transisi halus
      const p = player.position
      const dx = camera.position.x - p.x
      const dz = camera.position.z - p.z
      cam.lookFrom(Math.atan2(dx, dz), false)
    } else if (!main) {
      // karakter berhenti selama melihat-lihat
      player.stop()
      markers.hideTarget()
      controls.target.copy(player.position)
      controls.update()
    }
    resize()
  }
  $('btn-mode').addEventListener('click', () => setMode(mode === 'main' ? 'lihat' : 'main'))

  // peta dunia + spanduk nama wilayah
  const worldMap = createWorldMap({ ground, plans: [plan, elfPlan], regions: [region, elfMask], camps: enemies ? enemies.camps : [], shops: elfPlan.shops })
  const banner = createRegionBanner({ ground, spans: [...plan.spans, ...elfPlan.spans] })
  function toggleMap() {
    if (worldMap.open) worldMap.hide()
    else {
      $('panel-kualitas').hidden = true
      hideHint()
      worldMap.show(player.position, player.heading)
    }
  }
  $('btn-peta').addEventListener('click', toggleMap)
  $('btn-tutup-peta').addEventListener('click', () => worldMap.hide())
  $('peta').addEventListener('click', e => {
    if (e.target.id === 'peta') worldMap.hide() // ketuk di luar kartu peta
  })
  window.addEventListener('keydown', e => {
    if (e.code === 'KeyM' && !e.repeat) toggleMap()
    else if (e.code === 'Escape') worldMap.hide()
  })
  setMode('main')

  // nyawa habis → roboh, layar meredup, bangun di tempat aman: dikalahkan prajurit Kencana = dibawa
  // keluar wilayah kerajaan (pantai di ujung timur Jembatan Agung, cukup jauh dari penjaga kepala
  // jembatan); dikeroyok orc = titik mulai
  const exitPoint = { x: Math.max(agung.a, agung.b) + 26, z: agung.at, heading: Math.PI / 2 }
  player.onHurt(() => {
    health.hurt()
    cam.shake(0.12)
  })
  player.onDefeated(() => {
    const byKingdom = security ? security.playerDefeated() : false
    markers.hideTarget()
    setTimeout(() => $('tirai').classList.add('gelap'), 1100)
    setTimeout(() => {
      const p = byKingdom ? exitPoint : spawn
      player.placeAt(p.x, p.z, p.heading)
      player.revive()
      cam.lookFrom(player.heading + Math.PI)
      $('tirai').classList.remove('gelap')
      showMessage(byKingdom
        ? 'Kamu dikalahkan prajurit Kencana dan dibawa keluar dari wilayah kerajaan.'
        : 'Kamu pingsan dikeroyok orc… dan terbangun di pantai.', 4200)
    }, 1600)
  })

  // masuk laut dalam / terlalu jauh → layar meredup, kembali ke tempat aman terakhir
  let respawning = false
  player.onRespawnNeeded(reason => {
    if (respawning) return
    respawning = true
    player.freeze()
    $('tirai').classList.add('gelap')
    setTimeout(() => {
      player.respawn()
      cam.lookFrom(player.heading + Math.PI)
      $('tirai').classList.remove('gelap')
      showMessage(reason === 'laut'
        ? 'Airnya terlalu dalam! Kamu kembali ke pantai.'
        : 'Terlalu jauh dari pulau. Kamu kembali ke pantai.')
      respawning = false
    }, 450)
  })
  if (!asset) showMessage('Model karakter gagal dimuat — memakai karakter sederhana.', 5000)

  // petunjuk kontrol: hilang setelah pemain mulai bergerak, atau setelah 12 detik
  const hint = $('petunjuk')
  hint.innerHTML = touchUI ? HINT_TOUCH : HINT_KEYS
  let hintTime = 0
  let hintGone = false
  function hideHint() {
    if (hintGone) return
    hintGone = true
    hint.style.opacity = 0
    setTimeout(() => {
      hint.hidden = true
    }, 1000)
  }

  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault()
    showError('Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).\nMuat ulang halaman, lalu pilih Kualitas: Rendah.')
  })

  // shader prajurit bertugas (dan bayangannya) disiapkan di layar loading, supaya tidak tersendat
  // saat prajurit pertama kali terlihat
  if (soldiers) {
    cam.update(0.016, player.position, NO_INPUT)
    env.update(0, camera, player.position)
    soldiers.warmUp(player.position)
    renderer.render(scene, camera)
    soldiers.warmUp(null)
  }

  const clock = new THREE.Clock()
  let frames = 0
  let fpsTime = 0
  // saran turunkan kualitas bila FPS rata-rata rendah setelah beberapa detik
  let sampleTime = 0
  let sampleFrames = 0
  let hinted = quality.level === 'rendah'

  let frameCount = 0
  const roofs = [...kencana.roofs, ...aeloria.roofs]
  const debug = { timeScale: 1 } // pengujian: < 1 = gerak lambat (untuk memotret efek)
  renderer.setAnimationLoop(() => {
    frameCount++
    const dt = Math.min(clock.getDelta(), 0.1) * debug.timeScale
    const t = clock.elapsedTime
    if (mode === 'main') {
      const inp = input.read()
      for (const tap of inp.taps) handleTap(tap)
      player.update(dt, inp, cam.yaw)
      villagers?.pushOut(player.position)
      soldiers?.pushOut(player.position)
      if (!player.hasPath) markers.hideTarget()
      cam.update(dt, player.position, inp)
      if (!hintGone && (player.speed > 0.5 || (hintTime += dt) > 15)) hideHint()
      // tajuk pohon & bangunan di antara kamera dan prajurit dibuat berlubang;
      // di bawah atap besar (pendopo, bale, gerbang) lubangnya diperlebar
      seeThrough.a.value.copy(camera.position)
      seeThrough.b.value.copy(player.position).y += 1
      const p = player.position
      const roof = roofs.find(r => Math.abs(p.x - r.x) < r.hx && Math.abs(p.z - r.z) < r.hz)
      seeThrough.r.value += ((roof ? roof.r : 3.5) - seeThrough.r.value) * (1 - Math.exp(-6 * dt))
    } else {
      player.update(dt, NO_INPUT, cam.yaw)
      controls.update()
      keepCameraAboveGround()
      seeThrough.r.value = 0
    }
    markers.update(dt)
    enemies?.update(dt, camera, player, mode === 'main' ? player.position : controls.target)
    if (banner.update(dt, player.position, mode === 'main')) hideHint()
    villagers?.update(dt, camera, mode === 'main' ? player.position : controls.target, player.position, mode === 'main' ? 110 : 260)
    army?.update(dt, camera, mode === 'main' ? player.position : controls.target)
    security?.update(dt)
    soldiers?.update(dt, {
      camera,
      focus: mode === 'main' ? player.position : controls.target,
      range: mode === 'main' ? 110 : 260,
      player: player.position,
      playerVisible: !player.defeated,
      targetPos: security.targetPos,
    })
    bubbles.update(dt)
    health.set(player.hp, MAX_HP)
    effects.update(dt, camera)
    updateSkillButtons()
    env.update(t, camera, mode === 'main' ? player.position : controls.target)
    waveTime.value = t
    trees.userData.update(t)
    kencana.update(t)
    grass.userData.update(camera, t)
    renderer.render(scene, camera)

    frames++
    fpsTime += dt
    if (fpsTime >= 0.5) {
      $('fps').textContent = `${Math.round(frames / fpsTime)} FPS · kualitas ${quality.level}`
      frames = 0
      fpsTime = 0
    }
    if (!hinted && t > 3) {
      sampleTime += dt
      sampleFrames++
      if (sampleTime > 6) {
        hinted = true
        if (sampleFrames / sampleTime < 24) {
          hideHint() // jangan bertumpuk dengan petunjuk kontrol
          $('saran').hidden = false
          setTimeout(() => {
            $('saran').hidden = true
          }, 9000)
        }
      }
    }
  })

  $('loading').hidden = true
  $('hud').hidden = false

  // akses untuk debugging / pengujian otomatis
  window.__pulau = {
    renderer, scene, camera, controls, ground, shore, quality, trees, rocks, grass, water, env, kencana, region, plan, villagers, army, worldMap, banner, aeloria, elfPlan, elfMask,
    player, cam, input, colliders, nav, markers, effects, enemies, soldiers, security, bubbles, pickGround, setMode, getMode: () => mode,
    frames: () => frameCount, debug,
  }
}

start().catch(showError)
