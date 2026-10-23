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
import { createKencana, boatGeometry } from './world/kencana/kingdom.js'
import { buildingMaterial, buildingDepthMaterial } from './world/kencana/material.js'
import { createVillagers } from './world/kencana/villagers.js'
import { createArmy, balaParts } from './world/kencana/pasukan.js'
import { createSoldiers } from './world/kencana/prajurit.js'
import { createSecurity } from './world/kencana/keamanan.js'
import { planAeloria } from './world/aeloria/plan.js'
import { createAeloria } from './world/aeloria/kingdom.js'
import { createElfFolk } from './world/aeloria/elf.js'
import { createLife, ELF_CAPS } from './world/aeloria/kehidupan.js'
import { createElfSecurity } from './world/aeloria/keamanan.js'
import { createWorldMap, createRegionBanner } from './ui/peta.js'
import { createBubbles, createHealthBar } from './ui/tanya.js'
import { createShop } from './ui/toko.js'
import { createElfCard } from './ui/kartu-elf.js'
import { createActionButton, IKON_AKSI } from './ui/aksi.js'
import { createChat } from './ui/obrolan.js'
import { CITY, KERATON, ALUN, CANDI, PASAR, HARBOR, ISLANDS, TEGAL } from './world/kencana/layout.js'
import { TOWN, MARKET, SMITHY, TAVERN, MESS, TRAINING, FEAST, CAMPS as ELF_CAMPS, CITADEL, LANDS } from './world/aeloria/layout.js'
import { createInput } from './player/input.js'
import { createFollowCamera } from './player/camera.js'
import { createMarkers } from './player/marker.js'
import { createSwingEffects } from './player/effects.js'
import { SKILLS } from './player/combat.js'
import { createPlayer, loadPlayerModel, MAX_HP } from './player/player.js'
import { createBag } from './player/tas.js'
import { createGear } from './player/perlengkapan.js'
import { createBoat, KAYU_PERAHU } from './player/perahu.js'
import { createFishing, KAYU_PANCING } from './player/mancing.js'
import { createRipples } from './player/riak.js'

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

const HINT_TOUCH = '<b>Joystick</b> (kiri bawah): berjalan, dorong penuh = lari · Geser layar: putar kamera · Cubit: zoom<br><b>Pukul</b> berulang = kombo · 4 <b>jurus</b> · orc kalah = <b>koin</b> · dekati orang: <b>Bicara</b><br>Pukul pohon = <b>kayu</b> → buat <b>pancing</b> &amp; <b>perahu</b> di <b>Tas</b> · pulau tidak berjembatan: berenang / berlayar<br><b>Peta</b>: Kencana (barat) memusuhimu · Aeloria (utara) damai bila kamu tidak rusuh · <b>ketuk kios / elf</b>'
const HINT_KEYS = '<b>WASD / panah</b>: berjalan (Shift = pelan) · Seret: putar kamera · Roda: zoom<br>F: pukul (kombo) · 1–4: jurus · Spasi: lompat · orc kalah = koin · B: tas · G / Enter: bicara<br>Pukul pohon = kayu → buat pancing &amp; perahu di Tas · C: mancing / tarik · V: naik / turun perahu<br>M: peta — Kencana (barat) memusuhimu · Aeloria (utara) damai bila kamu tidak rusuh · klik kios / elf'

// FOV kamera (tegak, mendatar): layar tegak butuh FOV lebih lebar agar sisi kiri-kanan tetap
// terlihat dari kamera di belakang karakter
const FOV = { main: [70, 52], lihat: [70, 55] }
// jarak pandang mode main (m): kamera rendah di belakang karakter bisa melihat sampai cakrawala, jadi
// petak pohon, bangunan & daratan yang jauh tidak digambar — kabut menutupinya lebih dulu, pulau
// seberang tetap tampak samar. Mode Lihat pulau melihat seluruh dunia dari atas (5 km, kabut tipis).
const VIEW = { rendah: 420, sedang: 560, tinggi: 950 }

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
  // juga menjangkau pantai utara Pulau Tropis (Dermaga Utara)
  const plan = planKencana(ground)
  const region = createRegionMask(plan, ground)
  const elfPlan = planAeloria(ground)
  const elfMask = createRegionMask(elfPlan, ground, { rect: { x0: -450, z0: -1140, x1: 450, z1: -165 }, cell: 1.5, style: 1, free: null })
  // dermaga penyeberangan (pengganti jembatan antarpulau yang dibongkar)
  const dockTimur = plan.docks.find(d => d.id === 'timur')
  const dockBarat = plan.docks.find(d => d.id === 'tropis-barat')
  const dockPerak = elfPlan.docks.find(d => d.id === 'perak')
  const dockUtara = elfPlan.docks.find(d => d.id === 'tropis-utara')
  const terrain = createTerrain(ground, { ...shared, regions: [region, elfMask] })
  scene.add(terrain)
  const reservedAll = (x, z, r) => region.reserved(x, z, r) || elfMask.reserved(x, z, r)

  setStatus('Menanam pohon dan menebar batu…')
  await nextFrame()
  const grid = new PlacementGrid(8)
  // pohon & batu Pulau Tropis ditebar di atas bentuk pulau tengah saja (area lama 1000 m),
  // jadi letaknya sama persis seperti sebelum Kepulauan Kencana ada; pangkal Dermaga Barat & Dermaga
  // Utara dikosongkan
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
  let villagerGltf = null
  try {
    villagerGltf = await new GLTFLoader().loadAsync(modelUrl('penduduk.glb'))
    const spots = soldiers ? kencana.spots.filter(s => s.role !== 'penjaga') : kencana.spots
    villagers = createVillagers({ ground, routes: kencana.routes, spots, quality, villagerGltf, soldier: soldiers ? null : asset, scripted: soldiers ? 2 : 0 })
    scene.add(villagers.object)
  } catch (err) {
    console.warn('Penduduk gagal dimuat:', err)
  }
  // rakyat Aeloria: 10.000 kesatria elf + penduduk, masing-masing berkegiatan sesuai pikirannya
  // sendiri (badan: penduduk.glb, animasi tambahan: elf.glb)
  setStatus('Menghidupkan 10.000 kesatria Aeloria…')
  await nextFrame()
  let life = null
  if (villagerGltf)
    try {
      const elfGltf = await new GLTFLoader().loadAsync(modelUrl('elf.glb'))
      const folk = createElfFolk({ villagerGltf, elfGltf, quality, caps: ELF_CAPS[quality.level] ?? ELF_CAPS.sedang })
      scene.add(folk.object)
      life = createLife({ ground, plan: elfPlan, routes: aeloria.routes, folk, quality, free: (x, z, r) => colliders.isFree(x, z, r) })
      life.folk = folk
    } catch (err) {
      console.warn('Rakyat Aeloria gagal dibuat:', err)
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
  // tas pemain (koin, bekal, ramuan, perlengkapan) + perlengkapan yang tampak di badan
  const bag = createBag()
  const gear = asset ? createGear(asset.model, quality) : null
  const applyGear = () => {
    const fx = bag.effect()
    player.setDefense(fx.tahan)
    player.setSpeedBoost(fx.cepat)
    gear?.set(bag.pakai)
  }
  bag.onChange(applyGear)
  applyGear()
  // air: riak, perahu buatan sendiri (jukung), memancing; kayu dari menebang pohon untuk membuatnya
  const ripples = createRipples()
  scene.add(ripples.object)
  // perahu (pemain & perahu perang orc) memakai bahan bangunan tanpa tembus pandang
  const boatMaterial = buildingMaterial(noiseTexture, false)
  const boatDepth = buildingDepthMaterial()
  const boat = createBoat({
    ground, nav, colliders, geometry: boatGeometry('jukung'), material: boatMaterial, depthMaterial: boatDepth, shadows: quality.shadows,
  })
  scene.add(boat.object)
  const fishing = createFishing({ ground, player, bag, ripples, message: showMessage })
  scene.add(fishing.object)
  function craftRod() {
    bag.ambil('kayu', KAYU_PANCING)
    bag.terima('pancing')
    return 'Pancing jadi! Berdirilah di tepi air (pantai, dermaga, atau di perahu) menghadap laut, lalu tekan Mancing.'
  }
  function craftBoat() {
    if (bag.jumlah('kayu') < KAYU_PERAHU) return `Butuh ${KAYU_PERAHU} kayu untuk membuat perahu (punya ${bag.jumlah('kayu')}).`
    if (player.swimming || boat.aboard) return 'Naiklah ke darat dulu untuk membuat perahu.'
    const spot = boat.spotNear(player.position, player.heading)
    if (!spot) return 'Perahu dibuat di tepi pantai: berdirilah di pasir dekat air yang cukup dalam, lalu coba lagi.'
    const replaced = boat.built
    bag.ambil('kayu', KAYU_PERAHU)
    boat.build(spot)
    ripples.spawn(spot.x, spot.z, 3, 0.7)
    return `Perahu jadi${replaced ? ' (perahu lamamu ditinggalkan)' : ''}! Dekati lalu tekan Naik perahu. Letaknya juga terlihat di Peta.`
  }
  const recipes = [
    { id: 'pancing', nama: 'Pancing', ikon: 'pancing', kayu: KAYU_PANCING, ket: 'untuk memancing di tepi air / dari perahu', ada: () => !!bag.punya.pancing, buat: craftRod },
    { id: 'perahu', nama: 'Perahu jukung', ikon: 'perahu', kayu: KAYU_PERAHU, ket: 'dibuat di tepi pantai, untuk menyeberang laut', ada: () => false, buat: craftBoat },
  ]
  // koin, tombol Belanja di dekat kios Aeloria, panel toko & Tas (+ gelembung ucapan yang juga
  // dipakai penjaga & rakyat elf)
  const bubbles = createBubbles($('gelembung'), camera)
  // penjagaan Aeloria: zona damai, kerusuhan → musuh kerajaan (pedagang tetap netral), benteng
  // terlarang, keributan warga yang dilerai kesatria
  const elfSec = life ? createElfSecurity({ life, player, bubbles, message: showMessage, nav, colliders, ground }) : null
  const shop = createShop({ life, bag, player, bubbles, message: showMessage, maxHp: MAX_HP, wanted: () => !!elfSec?.wanted, recipes })
  // kayu: tiap pukulan yang mengenai batang pohon memberi 1 kayu, paling banyak KAYU_POHON per pohon
  // (pohon itu "tumbuh lagi" setelah TUMBUH detik)
  const KAYU_POHON = 3
  const TUMBUH = 180
  const chopped = new Map() // collider batang → { n, t, told }
  function chopWood(hits) {
    const tree = hits.find(o => o.kind === 'pohon')
    if (!tree) return
    const now = performance.now() / 1000
    let c = chopped.get(tree)
    if (!c || now - c.t > TUMBUH) chopped.set(tree, c = { n: 0, t: now, told: false })
    if (c.n >= KAYU_POHON) {
      if (!c.told) showMessage('Kayu pohon ini sudah habis — coba pohon lain (tumbuh lagi beberapa menit kemudian).', 2400)
      c.told = true
      return
    }
    c.n++
    bag.terima('kayu')
    shop.toast(`+1 kayu (${bag.jumlah('kayu')})`)
  }
  // hadiah koin: 6–12 per orc yang dikalahkan
  const orcCoins = n => {
    let c = 0
    for (let i = 0; i < n; i++) c += 6 + Math.floor(Math.random() * 7)
    return c
  }
  // orc + perahu perang mereka (serbuan ke Kencana lewat laut)
  const orcShip = new THREE.Mesh(boatGeometry('orc'), boatMaterial)
  orcShip.name = 'perahu-orc'
  orcShip.castShadow = quality.shadows
  orcShip.receiveShadow = quality.shadows
  orcShip.customDepthMaterial = boatDepth
  const enemies = orcAsset ? createEnemies({ ground, colliders, nav, asset: orcAsset, spawn, shipMesh: orcShip }) : null
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
      // elf Aeloria hanya bila sedang melawan pemain (yang damai tidak pernah jadi sasaran)
      if (elfSec) cands.push(...elfSec.targets(x, z, range))
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
      if (id[0] === 'e') return elfSec ? elfSec.position(id) : null
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

  // Kamera di belakang karakter (mode main) + joystick / keyboard
  const touchUI = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  const cam = createFollowCamera(camera, ground)
  cam.lookFrom(spawn.heading + Math.PI) // di belakang prajurit, menghadap gunung
  const skillButtons = { cincang: $('btn-cincang'), hentak: $('btn-hentak'), putar: $('btn-putar'), penggal: $('btn-penggal') }
  const input = createInput({
    canvas, joystick: $('joystick'), knob: $('joystick').querySelector('.kenop'), jumpButton: $('btn-lompat'), attackButton: $('btn-pukul'), skillButtons, touch: touchUI,
  })
  const NO_INPUT = { moveX: 0, moveY: 0, jump: false, attack: false, skill: null, lookDX: 0, lookDY: 0, zoom: 1, taps: [], lookRecent: false }
  const markers = createMarkers(ground)
  scene.add(...markers.objects)
  // ketuk elf → kartu isi pikirannya
  const elfCard = life ? createElfCard({ life, camera, canvas, markers, onTalk: a => talkTo(a) }) : null

  // obrolan dengan NPC (elf Aeloria & warga Kencana); tempat-tempat untuk petunjuk arah
  const mid = r => ({ x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2 })
  const place = (nama, kata, p, ket = '') => ({ nama, kata, x: p.x, z: p.z, ket })
  const PLACES_ELF = [
    place('Pasar Aeloria', ['pasar', 'kios'], mid(MARKET)),
    place('Tempa Aeloria', ['tempa', 'pandai besi', 'senjata', 'zirah'], mid(SMITHY)),
    place('Kedai Daun Emas', ['kedai', 'warung'], TAVERN),
    place('Balai Makan', ['balai makan'], mid(MESS)),
    place('Lapangan Latihan', ['lapangan', 'lapangan latihan', 'tempat latihan'], mid(TRAINING)),
    place('Padang Pesta', ['pesta', 'padang pesta', 'api unggun'], mid(FEAST)),
    place('Benteng Aeloria', ['benteng', 'istana', 'raja'], mid(CITADEL), 'Tapi ingat: benteng terlarang bagi orang luar, penjaganya akan menyerangmu!'),
    place('Perkemahan Kesatria', ['tenda', 'perkemahan kesatria'], mid(ELF_CAMPS[0])),
    place('Kota Aeloria', ['kota', 'kota aeloria'], mid(TOWN)),
    place('Tanjung Perak', ['tanjung', 'ladang', 'tanjung perak'], LANDS[1]),
    place('Dermaga Perak', ['dermaga', 'dermaga perak'], dockPerak.base),
  ]
  const PLACES_KENCANA = [
    place('Pasar Kotaraja', ['pasar', 'warung'], mid(PASAR)),
    place('Keraton Kencana', ['keraton', 'istana', 'raja'], mid(KERATON), 'Jangan coba-coba masuk — keraton dijaga ketat.'),
    place('alun-alun', ['alun alun', 'alun'], mid(ALUN)),
    place('Candi Kotaraja', ['candi'], CANDI),
    place('Kotaraja Kencana', ['kota', 'kotaraja'], mid(CITY)),
    place('Pelabuhan Kencana', ['pelabuhan'], HARBOR),
    place('Pulau Sawah', ['sawah', 'pulau sawah'], ISLANDS[1]),
    place('Kampung Nelayan', ['kampung nelayan', 'nelayan', 'pulau nelayan'], ISLANDS[2]),
    place('Pura Segara', ['pura', 'pura segara'], ISLANDS[3]),
    place('Pulau Wira', ['wira', 'pulau wira', 'bala tentara'], mid(TEGAL)),
    place('Dermaga Timur', ['dermaga', 'dermaga timur'], dockTimur.base),
  ]
  const PLACES_UMUM = [
    place('Pulau Tropis', ['pulau tropis', 'tropis', 'pulau tengah'], { x: -20, z: 40 }),
    place('gunung Pulau Tropis', ['gunung', 'puncak'], ISLAND.peak),
    place('Kerajaan Kencana', ['kencana', 'kerajaan manusia', 'kerajaan kencana'], mid(CITY)),
    place('Aeloria', ['aeloria', 'kerajaan elf', 'negeri elf'], mid(TOWN)),
    place('Dermaga Barat', ['dermaga barat'], dockBarat.base),
    place('Dermaga Utara', ['dermaga utara'], dockUtara.base),
  ]
  function placesFor(npc) {
    const list = [...(npc.bangsa === 'elf' ? PLACES_ELF : PLACES_KENCANA), ...PLACES_UMUM]
    if (boat.built) list.push(place('perahumu', ['perahuku', 'perahu saya', 'perahu aku', 'perahumu'], boat.position))
    const camp = enemies?.camps.slice().sort((a, b) => Math.hypot(a.x - npc.x, a.z - npc.z) - Math.hypot(b.x - npc.x, b.z - npc.z))[0]
    if (camp) list.push(place('perkemahan orc terdekat', ['orc', 'perkemahan orc', 'kemah orc', 'sarang orc'], camp, 'Hati-hati, orc di sana banyak!'))
    return list
  }
  // apakah garis (x0, z0) → (x1, z1) melintasi laut dalam (harus berenang / berperahu)
  function seberang(x0, z0, x1, z1) {
    const n = Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 8)
    let run = 0
    for (let i = 1; i < n; i++) {
      const t = i / n
      run = ground.heightAt(x0 + (x1 - x0) * t, z0 + (z1 - z0) * t) < -1.5 ? run + 1 : 0
      if (run >= 3) return true
    }
    return false
  }
  const chat = createChat({
    life, villagers, player, cam, camera, input, bag, shop, bubbles, places: placesFor, seberang,
    wantedByElves: () => !!elfSec?.wanted, feast: () => !!life?.feast, boatBuilt: () => boat.built,
  })
  // yang diikuti kamera: kepala pemain (lebih rendah saat berenang), lebih jauh saat naik perahu;
  // saat mengobrol: titik tengah pemain & NPC, dilihat lebih tinggi supaya keduanya tampak di bagian
  // bawah layar (bagian atas tertutup panel obrolan)
  const camTarget = {
    get position() {
      return chat.focus || player.position
    },
    get heading() {
      return player.heading
    },
    get speed() {
      return chat.open ? 0 : player.speed
    },
    get height() {
      return chat.open ? 2.6 : player.cameraHeight
    },
    get distScale() {
      return player.riding ? 1.45 : 1
    },
  }
  // "Ajak bicara" dari kartu elf: berjalan ke elf itu, obrolan dimulai saat tiba
  function talkTo(a) {
    const path = nav.findPath(player.position, { x: a.x, z: a.z })
    if (path && path.length > 1) {
      path.pop() // berhenti di depan elfnya, bukan di tempatnya berdiri
      player.followPath(path)
    }
    chat.approach(a)
  }

  // mode "main" (mengendalikan karakter) atau "lihat" (kamera bebas melihat pulau)
  let mode = 'main'
  // tombol aksi sesuai keadaan: naik / turun perahu, mancing / tarik, buat perahu
  const aksiBox = $('aksi-konteks')
  let toldBoat = false
  function boardBoat() {
    if (boat.aboard || boat.reachable(player.position) === null || player.defeated) return
    fishing.cancel()
    player.stop()
    markers.hideTarget()
    shop.close()
    elfCard?.hide()
    boat.board()
    player.setRide(() => boat.seat())
    cam.lookFrom(boat.heading + Math.PI, false)
    if (!toldBoat)
      showMessage(touchUI ? 'Joystick: arahkan perahu (dorong penuh = cepat) · Turun: ke darat terdekat, atau terjun ke air' : 'WASD: arahkan perahu · V: turun', 4200)
    toldBoat = true
  }
  function leaveBoat() {
    if (!boat.aboard) return
    fishing.cancel()
    const spot = boat.leave()
    player.setRide(null)
    player.placeAt(spot.x, spot.z, spot.heading)
    if (spot.water) showMessage('Tidak ada daratan di dekat perahu — kamu terjun ke air. Berenanglah, atau naik perahu lagi.', 3000)
  }
  const fishPress = () => (fishing.state ? fishing.pull() : fishing.start())
  const toggleBoat = () => (boat.aboard ? leaveBoat() : boardBoat())
  const btnNaik = createActionButton(aksiBox, { id: 'btn-naik', icon: IKON_AKSI.perahu }, boardBoat)
  const btnTurun = createActionButton(aksiBox, { id: 'btn-turun', icon: IKON_AKSI.turun }, leaveBoat)
  const btnMancing = createActionButton(aksiBox, { id: 'btn-mancing', icon: IKON_AKSI.mancing, cls: 'biru' }, fishPress)
  const btnTarik = createActionButton(aksiBox, { id: 'btn-tarik', icon: IKON_AKSI.tarik, cls: 'biru' }, fishPress)
  const btnBuatPerahu = createActionButton(aksiBox, { id: 'btn-buat-perahu', icon: IKON_AKSI.buat, cls: 'coklat' }, () => showMessage(craftBoat(), 3800))
  const btnBicara = createActionButton(aksiBox, { id: 'btn-bicara', icon: IKON_AKSI.bicara, cls: 'hijau' }, () => chat.talk())
  let actionT = 0
  let buildSpot = null
  function updateActions(dt) {
    if ((actionT -= dt) > 0) return
    actionT = 0.1
    const p = player.position
    const free = mode === 'main' && !player.defeated && !chat.open
    btnBicara.set(free && !!chat.near && !boat.aboard && !fishing.state, 'Bicara', chat.near?.nama || '')
    btnNaik.set(free && !fishing.state && boat.reachable(p) !== null, 'Naik perahu', player.swimming ? 'naik dari air' : '')
    btnTurun.set(free && boat.aboard, 'Turun', boat.aground ? 'perahu kandas' : '')
    // Mancing muncul saat berdiri diam di tepi air yang cukup dalam (di perahu: saat perahu diam)
    const still = player.speed < 0.5 || (boat.aboard && boat.speed < 0.6)
    const fishHere = free && !player.swimming && (!!fishing.state || (still && !!fishing.spot()))
    const hasRod = !!bag.punya.pancing
    btnMancing.set(fishHere && fishing.state !== 'sambar', fishing.state ? 'Menunggu ikan…' : 'Mancing',
      fishing.state ? 'ketuk untuk berhenti' : hasRod ? '' : `buat pancing: ${KAYU_PANCING} kayu`, hasRod || fishing.state ? '' : 'redup')
    btnTarik.set(free && fishing.state === 'sambar', 'Tarik!', 'ikan menyambar', 'menyala')
    // Buat perahu: di tepi pantai dengan kayu cukup (dan perahu lama jauh / belum ada)
    const wantBuild = free && !boat.aboard && !player.swimming && player.speed < 0.5 && bag.jumlah('kayu') >= KAYU_PERAHU
      && (!boat.built || Math.hypot(boat.position.x - p.x, boat.position.z - p.z) > 40)
    buildSpot = wantBuild ? boat.spotNear(p, player.heading) : null
    btnBuatPerahu.set(!!buildSpot, 'Buat perahu', `${KAYU_PERAHU} kayu`)
  }

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
      if (cut.length) shop.reward(orcCoins(cut.length))
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
      for (const id of ev.targets) {
        if (id[0] !== 'e' || !elfSec) continue
        const at = elfSec.fell(id)
        if (at) cut.push(at)
      }
      effects.execute(cut, player.position)
      if (cut.length) cam.shake(0.22)
      return
    }
    if (ev.type === 'hit') {
      // perlengkapan: pengali serangan (pedang perak, tombak, ramuan kekuatan); tombak menjangkau
      // lebih jauh ke depan (pukulan di sekeliling badan tidak berubah)
      const fx = bag.effect()
      const shape = { x: ev.x, z: ev.z, r: ev.r }
      if (fx.jangkau && !ev.area) {
        const dx = ev.x - ev.origin.x
        const dz = ev.z - ev.origin.z
        const d = Math.hypot(dx, dz) || 1
        shape.x += (dx / d) * fx.jangkau * 0.5
        shape.z += (dz / d) * fx.jangkau * 0.5
        shape.r += fx.jangkau * 0.5
      }
      const damage = ev.damage * fx.serang
      const struck = enemies ? enemies.hit(shape, damage, ev.knock, ev.origin) : []
      const felledOrcs = struck.filter(o => o.dead).length
      if (felledOrcs) shop.reward(orcCoins(felledOrcs))
      const guards = soldiers ? soldiers.hit(shape, damage, ev.knock, ev.origin) : []
      security?.playerStruck(guards)
      for (const a of guards) struck.push({ x: a.x, y: a.y, z: a.z })
      // elf Aeloria: memukul elf = membuat rusuh (kesatria melawan, warga kabur / ikut berkelahi)
      if (elfSec) struck.push(...elfSec.hit(shape, damage, ev.knock, ev.origin))
      const hits = colliders.hitAll(ev.x, ev.z, ev.r, 5)
      chopWood(hits)
      effects.attack(ev, hits, struck)
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

  // ketukan di layar: elf → kartu isi pikirannya; kios → berjalan ke depan mejanya. Berjalan biasa
  // memakai joystick (mengetuk tanah tidak menggerakkan karakter)
  function handleTap(tap) {
    if (player.defeated) return
    // ketuk elf → kartu isi pikirannya; tetapi pedagang yang sedang berjaga (sering tertutup atap
    // kiosnya) berarti kiosnya yang diketuk
    const elf = elfCard?.pick(tap.x, tap.y)
    const elfStall = elf && elf.job === 'pedagang' && elf.atWork ? shop.stallOf(elf) : null
    if (elf && !elfStall) {
      elfCard.show(elf)
      return
    }
    elfCard?.hide()
    const hit = elfStall ? null : pickGround(tap.x, tap.y)
    // ketuk kios Aeloria: berjalan ke depan mejanya, panel toko terbuka saat tiba
    const stall = elfStall || (hit && shop.stallAt(hit.x, hit.z))
    if (!stall) return
    const path = nav.findPath(player.position, stall.front)
    shop.approach(path ? stall : null)
    if (path) {
      player.followPath(path)
      const end = path[path.length - 1]
      markers.showTarget(end.x, end.z, true)
      hideHint()
    } else showMessage('Tidak ada jalan ke kios itu.', 1600)
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

  // gelembung ucapan, nyawa pemain
  life?.setBubbles(bubbles)
  const health = createHealthBar($('nyawa'), $('luka'))
  // pendatang: turun dari kapal penyeberangan di ujung Dermaga Timur, ditanyai penjaga di luar
  // gapuranya, lalu ke pasar
  const visit = {
    start: { x: dockTimur.tip.x - dockTimur.dir * 1.5, z: dockTimur.at + 1 },
    gate: { x: plan.gate.x + dockTimur.dir * 3.2, z: dockTimur.at + 0.8 },
    market: [{ x: -421, z: dockTimur.at + 1.2 }, { x: -461, z: dockTimur.at + 2.5 }, { x: -466, z: 51 }],
  }
  if (soldiers)
    security = createSecurity({ soldiers, enemies, player, bubbles, villagers, visit, ground, message: showMessage })
  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = FOV[mode][w < h ? 0 : 1]
    camera.far = mode === 'main' ? VIEW[quality.level] ?? VIEW.sedang : 5000
    scene.fog.near = mode === 'main' ? camera.far * 0.3 : 380
    scene.fog.far = mode === 'main' ? camera.far * 0.95 : 2400
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
      chat.close()
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
      worldMap.show(player.position, player.heading, boat.built ? [{ ...boat.position, label: 'Perahu' }] : [])
    }
  }
  $('btn-peta').addEventListener('click', toggleMap)
  $('btn-tutup-peta').addEventListener('click', () => worldMap.hide())
  $('peta').addEventListener('click', e => {
    if (e.target.id === 'peta') worldMap.hide() // ketuk di luar kartu peta
  })
  window.addEventListener('keydown', e => {
    if (e.target instanceof HTMLInputElement) return
    if (e.code === 'KeyM' && !e.repeat) toggleMap()
    else if (e.code === 'KeyV' && !e.repeat && mode === 'main') toggleBoat()
    else if (e.code === 'KeyC' && !e.repeat && mode === 'main' && !player.swimming) fishPress()
    else if ((e.code === 'KeyG' || e.code === 'Enter') && !e.repeat && mode === 'main' && !chat.open) chat.talk()
    else if (e.code === 'Escape') {
      worldMap.hide()
      elfCard?.hide()
    }
  })
  setMode('main')

  // nyawa habis → roboh, layar meredup, bangun di tempat aman: dikalahkan prajurit Kencana = dibuang
  // ke pantai barat Pulau Tropis (di dekat Dermaga Barat, di luar wilayah kerajaan); dikeroyok orc =
  // titik mulai
  const exitPoint = { x: dockBarat.base.x - dockBarat.dir * 14, z: dockBarat.at + 3, heading: Math.PI / 2 }
  player.onHurt(() => {
    health.hurt()
    cam.shake(0.12)
  })
  // dikalahkan kesatria Aeloria = diantar ke luar kerajaan: pantai utara Pulau Tropis (Dermaga Utara)
  const elfExit = { x: dockUtara.at + 3, z: dockUtara.base.z - dockUtara.dir * 12, heading: 0 }
  player.onDefeated(() => {
    const byKingdom = security ? security.playerDefeated() : false
    const byElves = elfSec ? elfSec.playerDefeated() : false
    markers.hideTarget()
    shop.close()
    fishing.cancel()
    if (boat.aboard) {
      boat.leave()
      player.setRide(null)
    }
    setTimeout(() => $('tirai').classList.add('gelap'), 1100)
    setTimeout(() => {
      const p = byElves ? elfExit : byKingdom ? exitPoint : spawn
      player.placeAt(p.x, p.z, p.heading)
      player.revive()
      cam.lookFrom(player.heading + Math.PI)
      $('tirai').classList.remove('gelap')
      showMessage(byElves
        ? 'Kamu dikalahkan kesatria Aeloria dan diantar perahu ke luar kerajaan: pantai utara Pulau Tropis.'
        : byKingdom
          ? 'Kamu dikalahkan prajurit Kencana dan dibuang ke pantai barat Pulau Tropis, di luar wilayah kerajaan.'
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
    cam.update(0.016, camTarget, NO_INPUT)
    env.update(0, camera, player.position)
    soldiers.warmUp(player.position)
    renderer.render(scene, camera)
    soldiers.warmUp(null)
  }

  // riak di sekitar pemain yang berenang & di buritan perahu yang melaju; petunjuk pertama berenang
  let rippleT = 0
  let toldSwim = false
  function waterFx(dt) {
    ripples.update(dt)
    if ((rippleT -= dt) > 0) return
    const p = player.position
    if (player.swimming) {
      const moving = player.speed > 0.6
      ripples.spawn(p.x, p.z, moving ? 1.3 : 0.9, moving ? 0.45 : 0.3)
      rippleT = moving ? 0.35 : 0.9
      if (!toldSwim) showMessage('Kamu berenang. Menyeberang lebih cepat dengan perahu: kumpulkan kayu dari pohon, lalu buat di Tas.', 4200)
      toldSwim = true
    } else if (boat.speed > 1.2) {
      const b = boat.position
      const h = boat.heading
      ripples.spawn(b.x - Math.sin(h) * 3, b.z - Math.cos(h) * 3, 1.6 + boat.speed * 0.15, 0.4)
      rippleT = 0.22
    } else rippleT = 0.2
  }
  let blockedT = 0
  function blockedAttack() {
    const now = performance.now()
    if (now - blockedT < 2500) return
    blockedT = now
    showMessage(player.riding ? 'Tidak bisa menyerang dari perahu.' : 'Tidak bisa menyerang sambil berenang.', 1600)
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
      if ((inp.attack || inp.skill) && (player.swimming || player.riding)) blockedAttack()
      // di perahu: joystick mengemudikan perahu (pemain hanya duduk)
      boat.update(dt, boat.aboard ? inp : null, cam.yaw)
      // mengobrol: pemain diam menghadap NPC
      player.update(dt, chat.open ? NO_INPUT : inp, cam.yaw)
      fishing.update(dt, Math.abs(inp.moveX) + Math.abs(inp.moveY) > 0.1 || player.hasPath || (boat.aboard && boat.speed > 0.6))
      villagers?.pushOut(player.position)
      soldiers?.pushOut(player.position)
      life?.pushOut(player.position)
      if (!player.hasPath) markers.hideTarget()
      cam.update(dt, camTarget, inp)
      if (!hintGone && (player.speed > 0.5 || (hintTime += dt) > 15)) hideHint()
      // tajuk pohon & bangunan di antara kamera dan prajurit dibuat berlubang;
      // di bawah atap besar (pendopo, bale, gerbang) lubangnya diperlebar
      seeThrough.a.value.copy(camera.position)
      seeThrough.b.value.copy(player.position).y += 1
      const p = player.position
      const roof = roofs.find(r => Math.abs(p.x - r.x) < r.hx && Math.abs(p.z - r.z) < r.hz)
      seeThrough.r.value += ((roof ? roof.r : 3.5) - seeThrough.r.value) * (1 - Math.exp(-6 * dt))
    } else {
      boat.update(dt, null, cam.yaw)
      player.update(dt, NO_INPUT, cam.yaw)
      fishing.update(dt, false)
      controls.update()
      keepCameraAboveGround()
      seeThrough.r.value = 0
    }
    markers.update(dt)
    waterFx(dt)
    updateActions(dt)
    enemies?.update(dt, camera, player, mode === 'main' ? player.position : controls.target)
    if (banner.update(dt, player.position, mode === 'main')) hideHint()
    villagers?.update(dt, camera, mode === 'main' ? player.position : controls.target, player.position, mode === 'main' ? 110 : 260)
    army?.update(dt, camera, mode === 'main' ? player.position : controls.target)
    life?.update(dt, camera, mode === 'main' ? player.position : controls.target, mode === 'main' ? 110 : 260)
    elfSec?.update(dt)
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
    shop.update(dt, mode === 'main' && !chat.open)
    chat.update(dt, mode === 'main')
    elfCard?.update(dt)
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
    renderer, scene, camera, controls, ground, shore, quality, trees, rocks, grass, water, env, kencana, region, plan, villagers, army, worldMap, banner, aeloria, elfPlan, elfMask, life,
    player, cam, input, colliders, nav, markers, effects, enemies, soldiers, security, bubbles, pickGround, setMode, getMode: () => mode, bag, gear, shop, elfSec, elfCard,
    boat, fishing, ripples, recipes, craftBoat, boardBoat, leaveBoat, chat, placesFor,
    frames: () => frameCount, debug,
  }
}

start().catch(showError)
