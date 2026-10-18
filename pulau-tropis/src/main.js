import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { quality, setQualityLevel } from './core/quality.js'
import { createNoiseTexture, createWaterNormalTexture } from './core/noiseTexture.js'
import { PlacementGrid } from './core/spatial.js'
import { ISLAND } from './world/island.js'
import { createGround, createTerrain } from './world/terrain.js'
import { createShoreData, waveTime } from './world/shore.js'
import { createWater } from './world/water.js'
import { createEnvironment } from './world/sky.js'
import { createTrees } from './world/trees.js'
import { createRocks } from './world/rocks.js'
import { createGrass } from './world/grass.js'

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

  setStatus('Membentuk pulau…')
  await nextFrame()
  const ground = createGround(quality.terrainSegments)
  const shore = createShoreData(ground, quality.water.shoreRes)
  const terrain = createTerrain(ground, shared)
  scene.add(terrain)

  setStatus('Menanam pohon dan menebar batu…')
  await nextFrame()
  const grid = new PlacementGrid(8)
  const trees = createTrees({ ground, grid, quality, noiseTexture })
  const rocks = createRocks({ ground, grid, quality })
  scene.add(trees, rocks)
  terrain.userData.applyOcclusion([...trees.userData.occlusion, ...rocks.userData.occlusion])

  setStatus('Menumbuhkan rumput…')
  await nextFrame()
  const grass = createGrass({ ground, grid, quality })
  scene.add(grass)

  setStatus('Mengisi lautan…')
  await nextFrame()
  const normalTexture = createWaterNormalTexture(renderer)
  const water = createWater({ ground, shore, env, noiseTexture, normalTexture, quality })
  scene.add(water)

  // Kamera orbit sementara untuk melihat pulau (karakter + kamera orang ketiga di Milestone 2)
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 8, 0)
  camera.position.set(-260, 140, 330)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 12
  controls.maxDistance = 900
  controls.maxPolarAngle = Math.PI * 0.47
  controls.rotateSpeed = quality.isMobile ? 0.6 : 0.8
  controls.zoomSpeed = 0.9
  controls.screenSpacePanning = false
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }

  // jaga kamera tetap di atas tanah / air
  function keepCameraAboveGround() {
    const ground0 = Math.max(ground.heightAt(camera.position.x, camera.position.z), ISLAND.seaLevel)
    if (camera.position.y < ground0 + 3) camera.position.y = ground0 + 3
    const half = ISLAND.size * 0.9
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -half, half)
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -half, half)
    controls.target.y = Math.max(ground.heightAt(controls.target.x, controls.target.z), 0) + 3
  }

  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // layar tegak (portrait) butuh FOV lebih lebar agar pulau tetap terlihat
    camera.fov = w < h ? 70 : 55
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

  // petunjuk menghilang setelah pemain mulai menyentuh layar
  canvas.addEventListener('pointerdown', () => {
    setTimeout(() => {
      $('petunjuk').style.opacity = 0
    }, 4000)
  }, { once: true })

  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault()
    showError('Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).\nMuat ulang halaman, lalu pilih Kualitas: Rendah.')
  })

  const clock = new THREE.Clock()
  let frames = 0
  let fpsTime = 0
  // saran turunkan kualitas bila FPS rata-rata rendah setelah beberapa detik
  let sampleTime = 0
  let sampleFrames = 0
  let hinted = quality.level === 'rendah'

  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.1)
    const t = clock.elapsedTime
    controls.update()
    keepCameraAboveGround()
    env.update(t, camera, controls.target)
    waveTime.value = t
    trees.userData.update(t)
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
  window.__pulau = { renderer, scene, camera, controls, ground, shore, quality, trees, rocks, grass, water, env }
}

start().catch(showError)
