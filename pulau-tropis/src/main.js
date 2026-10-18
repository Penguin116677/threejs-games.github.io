import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { quality } from './core/quality.js'
import { ISLAND, heightAt } from './world/island.js'
import { createTerrain, createDepthTexture } from './world/terrain.js'
import { createWater } from './world/water.js'
import { createEnvironment } from './world/sky.js'
import { createTrees } from './world/trees.js'

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

async function start() {
  if (!webglAvailable()) {
    showError('Browser ini tidak mendukung WebGL 2.\nCoba gunakan Chrome versi terbaru di Android.')
    return
  }

  const canvas = $('game')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: quality.antialias, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.maxPixelRatio))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 5000)

  setStatus('Membuat langit dan cahaya…')
  await nextFrame()
  const env = createEnvironment(scene)

  setStatus('Membentuk pulau…')
  await nextFrame()
  const terrain = createTerrain(quality.terrainSegments)
  scene.add(terrain)

  setStatus('Menanam pohon…')
  await nextFrame()
  const trees = createTrees(quality)
  scene.add(trees)

  setStatus('Mengisi lautan…')
  await nextFrame()
  const water = createWater(createDepthTexture(256), env)
  scene.add(water)

  // Kamera orbit sementara untuk melihat pulau (karakter + kamera orang ketiga di Milestone 2)
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 8, 0)
  camera.position.set(-260, 140, 330)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 25
  controls.maxDistance = 900
  controls.maxPolarAngle = Math.PI * 0.47
  controls.rotateSpeed = quality.isMobile ? 0.6 : 0.8
  controls.zoomSpeed = 0.9
  controls.screenSpacePanning = false
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }

  // jaga kamera tetap di atas tanah / air
  function keepCameraAboveGround() {
    const ground = Math.max(heightAt(camera.position.x, camera.position.z), ISLAND.seaLevel)
    if (camera.position.y < ground + 4) camera.position.y = ground + 4
    const half = ISLAND.size * 0.9
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -half, half)
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -half, half)
    controls.target.y = Math.max(heightAt(controls.target.x, controls.target.z), 0) + 4
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

  // petunjuk menghilang setelah pemain mulai menyentuh layar
  canvas.addEventListener('pointerdown', () => {
    setTimeout(() => { $('petunjuk').style.opacity = 0 }, 4000)
  }, { once: true })

  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault()
    showError('Grafis HP kehilangan konteks WebGL (biasanya karena memori penuh).\nMuat ulang halaman.')
  })

  const clock = new THREE.Clock()
  let frames = 0
  let fpsTime = 0

  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.1)
    const t = clock.elapsedTime
    controls.update()
    keepCameraAboveGround()
    water.userData.update(t)
    trees.userData.update(t)
    renderer.render(scene, camera)

    frames++
    fpsTime += dt
    if (fpsTime >= 0.5) {
      $('fps').textContent = `${Math.round(frames / fpsTime)} FPS · kualitas ${quality.level}`
      frames = 0
      fpsTime = 0
    }
  })

  $('loading').hidden = true
  $('hud').hidden = false

  // akses untuk debugging / pengujian otomatis
  window.__pulau = { renderer, scene, camera, controls, heightAt, quality, trees }
}

start().catch(showError)
