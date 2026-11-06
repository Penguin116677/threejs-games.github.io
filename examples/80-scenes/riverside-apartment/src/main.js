// Riverside Apartments — explorable horror vertical slice.
import * as THREE from 'three'
import { CollisionWorld, PlayerController, rayBox } from './physics.js'
import { createMaterials, makeCanvas, textTexture } from './materials.js'
import { LightManager } from './lights.js'
import { ZoneManager } from './zones.js'
import { Elevator } from './elevator.js'
import { Input } from './input.js'
import { UI } from './ui.js'
import { Audio } from './audio.js'
import { buildShell, defineZones } from './level.js'
import { B, MAP, FLOORS, FLOOR_H, ROOF_Y, APT, APT_K, floorOfY, floorLabel } from './constants.js'

const REACH = 2.2
const DT = 1 / 60
const PHOTO_IDS = ['photo-lobby', 'photo-maint', 'photo-f7', 'photo-kitchen', 'photo-bedroom', 'photo-bath', 'photo-roof']

class Emitter {
  constructor() { this.h = {} }
  on(e, f) { (this.h[e] ||= []).push(f) }
  emit(e, ...a) { for (const f of this.h[e] || []) f(...a) }
}

export class Game {
  constructor() {
    const params = new URLSearchParams(location.search)
    this.testMode = params.has('test')
    this.touch = params.get('mobile') === '1' || (params.get('mobile') !== '0' && (matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window))
    document.body.classList.toggle('touch', this.touch)

    // renderer / scene
    this.renderer = new THREE.WebGLRenderer({ antialias: !this.touch, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.touch ? 1.25 : 1.75))
    this.renderer.setSize(innerWidth, innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.15
    this.renderer.shadowMap.enabled = !this.touch && params.get('shadows') !== '0'
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.getElementById('app').appendChild(this.renderer.domElement)
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x05070a)
    this.scene.fog = new THREE.FogExp2(0x05070a, 0.05)
    this.camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.05, 140)
    this.camera.rotation.order = 'YXZ'
    this.scene.add(this.camera)
    addEventListener('resize', () => {
      this.camera.aspect = innerWidth / innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(innerWidth, innerHeight)
    })

    // world state
    this.M = createMaterials()
    this.world = new CollisionWorld()
    this.player = new PlayerController(this.world)
    this.state = new Map()
    this.power = { street: true, lobby: false, stairs: false, elevator: false, f7: false, dead: false }
    this.switches = {}
    this.inventory = new Map()
    this.photos = new Set()
    this.photoTotal = PHOTO_IDS.length
    this.flags = { entered: false, f7: false, inApt: false, living: false, bedroom: false, bathroom: false, kitchen: false, scare: false, roof: false }
    this.events = new Emitter()
    this.interactables = new Set()
    this.doors = []
    this.shellBuilders = []
    this.floorObjects = Array.from({ length: FLOORS + 1 }, () => [])
    this.scare = 0
    this.paused = false
    this.running = false
    this.autoSim = !this.testMode
    this.time = 0
    this.yaw = Math.PI
    this.pitch = 0
    this.eye = 1.63
    this.bob = 0
    this.stepDist = 0
    this.flashOn = true
    this.#sharedGeometry()

    this.audio = new Audio()
    this.ui = new UI(this)
    this.input = new Input(this, { touch: this.touch })
    this.lights = new LightManager(this, this.scene, this.touch ? 4 : 6)
    this.zones = new ZoneManager(this)

    this.scene.add(new THREE.HemisphereLight(0x3a4658, 0x0c0a08, 0.32))
    this.#flashlight()
    buildShell(this)
    this.elevator = new Elevator(this)
    defineZones(this)
    this.#rain()
    this.#wireStory()

    this.player.teleport(0.5, 0, -13.5)
    this.zones.update(0, 0, true)
    this.ui.updateInventory()
    this.#objectives()
    this.#updateFloorVisibility(true)

    this.clock = new THREE.Clock()
    this.acc = 0
    this.renderer.setAnimationLoop(() => this.#frame())
    this.#menus()
    if (this.testMode) this.#exposeTestApi()
  }

  // ---------------------------------------------------------------------------

  #sharedGeometry() {
    const cache = new Map()
    const get = (k, f) => cache.get(k) || (cache.set(k, f()), cache.get(k))
    this.shared = {
      doorPanel: (w, h) => get(`door${w}x${h}`, () => new THREE.BoxGeometry(w - 0.01, h, 0.045).translate(w / 2, h / 2, 0)),
      knob: () => get('knob', () => new THREE.SphereGeometry(0.03, 10, 8)),
      plate: () => get('plate', () => new THREE.PlaneGeometry(0.22, 0.11)),
      lampHousing: () => get('lampH', () => new THREE.BoxGeometry(0.7, 0.07, 0.24).translate(0, -0.035, 0)),
      lampBulb: () => get('lampB', () => new THREE.BoxGeometry(0.6, 0.02, 0.17).translate(0, -0.08, 0)),
    }
    this._photoMats = new Map()
    this._labels = new Map()
    const [c, ctx] = makeCanvas(128, 48)
    ctx.fillStyle = '#0a3a12'; ctx.fillRect(0, 0, 128, 48)
    ctx.fillStyle = '#5dff7a'; ctx.font = 'bold 32px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('EXIT', 64, 26)
    this.exitTexture = new THREE.CanvasTexture(c)
    this.exitTexture.colorSpace = THREE.SRGBColorSpace
  }

  photoMaterial(id) {
    if (this._photoMats.has(id)) return this._photoMats.get(id)
    const [c, ctx] = makeCanvas(128, 96)
    let s = [...id].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 3) >>> 0
    const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296
    ctx.fillStyle = '#b9a27a'; ctx.fillRect(0, 0, 128, 96)
    ctx.fillStyle = '#5a4a32'; ctx.fillRect(0, 60 + r() * 15, 128, 40)
    ctx.fillStyle = '#3b2f20' // building silhouette
    ctx.fillRect(20 + r() * 40, 15, 40, 70)
    for (let i = 0; i < 8; i++) { ctx.fillStyle = '#c8b48a'; ctx.fillRect(26 + (i % 3) * 11 + r() * 2, 22 + Math.floor(i / 3) * 14, 5, 7) }
    ctx.fillStyle = '#1b140c' // a figure that shouldn't be there
    const fx = 80 + r() * 30
    ctx.fillRect(fx, 50, 6, 24); ctx.beginPath(); ctx.arc(fx + 3, 46, 4, 0, 7); ctx.fill()
    for (let i = 0; i < 1500; i++) { ctx.fillStyle = `rgba(0,0,0,${r() * 0.15})`; ctx.fillRect(r() * 128, r() * 96, 1, 1) }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    const m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 })
    this._photoMats.set(id, m)
    return m
  }

  docMaterial() {
    if (this._docMat) return this._docMat
    const [c, ctx] = makeCanvas(128, 170)
    ctx.fillStyle = '#e3dac0'; ctx.fillRect(0, 0, 128, 170)
    ctx.fillStyle = 'rgba(30,30,40,0.6)'
    for (let y = 18; y < 160; y += 9) ctx.fillRect(12, y, 70 + Math.random() * 35, 2)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    this._docMat = new THREE.MeshStandardMaterial({ map: t, roughness: 1, emissive: 0x111008 })
    return this._docMat
  }

  labelTexture(text) {
    if (!this._labels.has(text)) this._labels.set(text, textTexture(text, { w: 128, h: 48, font: 'bold 22px Arial', bg: '#d8d2c0', fg: '#111', border: false }))
    return this._labels.get(text)
  }

  #flashlight() {
    const f = new THREE.SpotLight(0xfff2dc, 24, 22, 0.5, 0.6, 1.3)
    f.position.set(0.12, -0.12, 0.05)
    f.target.position.set(0.05, -0.1, -1)
    f.castShadow = this.renderer.shadowMap.enabled
    f.shadow.mapSize.set(512, 512)
    f.shadow.camera.near = 0.1
    f.shadow.bias = -0.0008
    this.camera.add(f, f.target)
    this.flashlight = f
  }

  #rain() {
    const n = this.touch ? 900 : 1800
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - 0.5) * 30; pos[i * 3 + 1] = Math.random() * 16; pos[i * 3 + 2] = (Math.random() - 0.5) * 30 }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.rain = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x8a9aaa, size: 0.05, transparent: true, opacity: 0.55, depthWrite: false }))
    this.rain.frustumCulled = false
    this.scene.add(this.rain)
  }

  // ---- registry -----------------------------------------------------------------

  addInteractable(it) { this.interactables.add(it) }
  removeInteractable(it) { this.interactables.delete(it) }
  addDoor(d) {
    this.doors.push(d)
    this.scene.add(d.pivot)
    this.addInteractable(d)
    const k = Math.min(FLOORS, Math.round(d.hinge.y / FLOOR_H))
    this.floorObjects[k].push(d.pivot)
    return d
  }
  door(id) { return this.doors.find(d => d.id === id) }

  setPower(c, v) {
    this.power[c] = v
    this.state.set('power', { ...this.power })
    this.events.emit('power', c, v)
    if (c === 'elevator') this.ui.toast(v ? 'Somewhere behind the wall, a motor shudders awake.' : 'The elevator hum dies away.')
    if (c === 'f7' && v) this.ui.toast('A distant buzz from upstairs. Floor 7 has power again.')
    if (c === 'lobby') this.ui.toast(v ? 'The lobby lights stutter on.' : 'The lobby goes dark.')
    if (c === 'stairs') this.ui.toast(v ? 'The stairwell lights flicker on.' : 'The stairwell goes dark.')
  }

  collectPhoto(id) {
    this.photos.add(id)
    this.ui.updateInventory()
    this.ui.toast(`Found an old photograph (${this.photos.size}/${this.photoTotal}).` + (this.photos.size === this.photoTotal ? ' That\'s all of them.' : ''))
  }

  isOutside(p = this.player.pos) {
    if (p.x < B.x0 || p.x > B.x1 || p.z < B.z0 || p.z > B.z1) return true
    return p.y > ROOF_Y - 0.3 && !(p.x < -8.1 && p.z > 0.9)
  }

  playerFloor() { return floorOfY(this.player.pos.y) }

  // ---- story ----------------------------------------------------------------------

  #wireStory() {
    this.events.on('read', it => {
      if (it.id === 'doc-bath' && !this.flags.scare) {
        this.flags.scare = true
        this.scare = 3.5
        this.audio.play('scare')
        setTimeout(() => this.ui.toast('Seven knocks, from inside the wall.'), 400)
      }
      if (it.id === 'doc-roof') this.flags.ending = true
    })
    this.events.on('elevatorArrive', k => { if (k === APT_K) this.flags.f7 = true })
  }

  #objectives() {
    const f = this.flags, g = this
    const L = []
    if (!f.entered) L.push({ text: 'Enter Riverside Apartments.' })
    else if (!(g.inventory.has('key703') && g.power.elevator && f.f7)) {
      L.push({ text: 'Find the spare key to 703 (front desk).', done: g.inventory.has('key703') })
      L.push({ text: 'Restore power to the elevator (maintenance room).', done: g.power.elevator })
      L.push({ text: 'Go up to the 7th floor.', done: f.f7 })
    } else if (!f.inApt) L.push({ text: 'Unlock Apartment 703.' })
    else if (!f.scare) {
      L.push({ text: 'Search Apartment 703:' })
      for (const [k, n] of [['kitchen', 'kitchen'], ['living', 'living room'], ['bedroom', 'bedroom'], ['bathroom', 'bathroom']]) L.push({ text: n, done: f[k] })
    } else if (!f.ending) L.push({ text: 'Get to the roof. Use the stairs.' })
    else L.push({ text: `Photographs found: ${g.photos.size}/${g.photoTotal}. Explore freely.` })
    this.ui.setObjective(L)
  }

  #trackFlags() {
    const p = this.player.pos, f = this.flags
    const inB = p.x > B.x0 && p.x < B.x1 && p.z > B.z0 && p.z < B.z1
    if (!f.entered && inB && p.y < 1) f.entered = true
    const k = this.playerFloor()
    if (k === APT_K && inB) {
      f.f7 = true
      const inR = r => p.x > r.x0 && p.x < r.x1 && p.z > r.z0 && p.z < r.z1
      if (p.x > APT.x0 && p.z < APT.z1) f.inApt = true
      for (const r of ['kitchen', 'living', 'bedroom', 'bathroom', 'hall']) if (inR(APT[r])) f[r] = true
    }
    if (p.y > ROOF_Y - 0.5 && this.isOutside()) f.roof = true
  }

  // ---- menus ------------------------------------------------------------------------

  #menus() {
    const start = document.getElementById('start')
    const pause = document.getElementById('pause')
    const begin = e => {
      e?.preventDefault()
      start.classList.remove('show')
      pause.classList.remove('show')
      this.audio.start()
      this.running = true
      this.paused = false
      if (!this.touch) this.renderer.domElement.requestPointerLock?.()
      if (this.touch && document.documentElement.requestFullscreen && !document.fullscreenElement && !this.testMode)
        document.documentElement.requestFullscreen().catch(() => {})
    }
    this.resume = () => { if (!this.touch && this.running && !this.ui.docOpen) this.renderer.domElement.requestPointerLock?.() }
    document.getElementById('btn-start').addEventListener('click', begin)
    document.getElementById('btn-resume').addEventListener('click', begin)
    document.addEventListener('pointerlockchange', () => {
      if (!document.pointerLockElement && this.running && !this.ui.docOpen && !this.testMode) { pause.classList.add('show'); this.paused = true }
    })
    this.renderer.domElement.addEventListener('click', () => { if (this.running && !this.touch && !document.pointerLockElement && !this.ui.docOpen) this.resume() })
    if (this.testMode) { start.classList.remove('show'); this.running = true }
  }

  // ---- simulation --------------------------------------------------------------------

  #frame() {
    const dt = Math.min(0.1, this.clock.getDelta())
    if (this.testMode && !this.autoSim) return // tests step + render on demand
    if (this.autoSim && this.running && !this.paused) {
      this.acc += dt
      let n = 0
      while (this.acc >= DT && n < 5) { this.step(DT); this.acc -= DT; n++ }
      if (n === 5) this.acc = 0
    } else if (this.running) this.#handleMenuInput()
    this.ui.update(dt)
    this.render()
  }

  #handleMenuInput() {
    if (this.input.take('interact') && this.ui.docOpen) this.ui.closeDocument()
    if (this.input.take('menu') && this.ui.docOpen) this.ui.closeDocument()
  }

  step(dt) {
    this.time += dt
    const inp = this.input
    if (this.ui.docOpen) { this.#handleMenuInput(); return }
    const { sprint, crouch } = inp.sample()
    const look = inp.consumeLook()
    this.yaw -= look.dx
    this.pitch = Math.max(-1.45, Math.min(1.45, this.pitch - look.dy))
    if (inp.take('flashlight')) { this.flashOn = !this.flashOn; this.audio.play('flashlight') }
    if (inp.take('menu')) {
      if (this.touch) { this.paused = true; document.getElementById('pause').classList.add('show') }
      else if (document.pointerLockElement) document.exitPointerLock()
    }

    // moving platforms first, then carry the player
    const pl = this.player
    this.elevator.update(dt)
    if (pl.ground === this.elevator.cFloor) pl.pos.y += this.elevator.dy
    for (const d of this.doors) d.update(dt, this)
    for (const it of this.interactables) if (it.update && it.kind !== 'door') it.update(dt, this)
    if (pl.overlapping()) pl.depenetrate()

    // movement
    const speed = crouch || pl.crouching ? 1.3 : sprint ? 4.4 : 2.4
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw)
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw)
    const mx = (fx * inp.move.y + rx * inp.move.x) * speed
    const mz = (fz * inp.move.y + rz * inp.move.x) * speed
    const before = { x: pl.pos.x, z: pl.pos.z }
    pl.update(dt, mx, mz, crouch)
    const moved = Math.hypot(pl.pos.x - before.x, pl.pos.z - before.z)

    // fail-safes: never stuck inside geometry, never outside the map
    if (pl.overlapping() && !pl.depenetrate()) { pl.recover(); this.stats.recoveries++ }
    const p = pl.pos
    if (p.y < -2.5 || p.x < MAP.x0 || p.x > MAP.x1 || p.z < MAP.z0 || p.z > MAP.z1 || p.y > ROOF_Y + 6) { pl.recover(); this.stats.recoveries++ }

    // footsteps & head bob
    if (pl.grounded && moved > 0.001) {
      this.stepDist += moved
      this.bob += moved * (sprint ? 2.2 : 2.6)
      const stride = sprint ? 0.85 : pl.crouching ? 0.5 : 0.65
      if (this.stepDist > stride) { this.stepDist = 0; this.audio.play(pl.crouching ? 'stepSoft' : 'step') }
    }
    const targetEye = pl.h - 0.12
    this.eye += (targetEye - this.eye) * Math.min(1, dt * 10)

    // interaction
    this.aimed = this.pick()
    this.ui.setPrompt(this.aimed ? this.aimed.it.prompt(this) : null)
    if (inp.take('interact') && this.aimed) this.aimed.it.interact(this)

    if (this.scare > 0) this.scare -= dt
    const pf = this.playerFloor()
    this.zones.update(dt, pf)
    this.#updateFloorVisibility()
    this.#trackFlags()
    if ((this._objT = (this._objT || 0) - dt) <= 0) { this._objT = 0.3; this.#objectives() }
  }

  #updateFloorVisibility(force) {
    const pf = this.playerFloor()
    const outside = this.isOutside()
    const key = pf + ':' + outside
    if (!force && key === this._visKey) return
    this._visKey = key
    this.shellBuilders.forEach(b => {
      const m = /^floor(\d)$/.exec(b.name)
      if (m) b.group.visible = outside || Math.abs(+m[1] - pf) <= 1
      if (b.name === 'roof') b.group.visible = outside || pf >= FLOORS - 1
    })
    this.floorObjects.forEach((objs, k) => {
      const vis = outside || Math.abs(k - pf) <= 1
      for (const o of objs) o.visible = vis
    })
  }

  stats = { recoveries: 0 }

  // Ray from the eye: nearest interactable within reach that isn't behind a wall.
  pick() {
    const o = this.camera.getWorldPosition(this._o || (this._o = new THREE.Vector3()))
    const d = this.camera.getWorldDirection(this._d || (this._d = new THREE.Vector3()))
    let best = null
    for (const it of this.interactables) {
      const c = it.center
      if ((c.x - o.x) ** 2 + (c.y - o.y) ** 2 + (c.z - o.z) ** 2 > 10) continue
      const bx = it.aimBox()
      if (bx.isEmpty()) continue
      const t = rayBox(o.x, o.y, o.z, d.x, d.y, d.z, bx.min.x, bx.min.y, bx.min.z, bx.max.x, bx.max.y, bx.max.z)
      if (t !== null && t < REACH && (!best || t < best.t)) best = { it, t }
    }
    if (!best) return null
    const hit = this.world.raycast(o.x, o.y, o.z, d.x, d.y, d.z, best.t, c => c.owner === best.it)
    if (hit && hit.dist < best.t - 0.12) return null
    return best
  }

  render() {
    const p = this.player.pos
    const bobY = Math.sin(this.bob * Math.PI) * 0.025
    this.camera.position.set(p.x, p.y + this.eye + bobY, p.z)
    this.camera.rotation.set(this.pitch, this.yaw, 0)
    this.flashlight.intensity = this.flashOn ? 24 * (this.scare > 0 ? (Math.random() < 0.3 ? 0 : 0.4) : 1) : 0
    const eye = this.camera.position
    this.lights.update(1 / 60, eye)
    const outside = this.isOutside()
    this.rain.visible = outside || p.y < 0.5 && (p.z < B.z0 + 0.5)
    if (this.rain.visible) {
      const a = this.rain.geometry.attributes.position
      for (let i = 0; i < a.count; i++) {
        let y = a.getY(i) - 0.35
        if (y < eye.y - 6) y += 16
        a.setY(i, y)
      }
      a.needsUpdate = true
      this.rain.position.set(eye.x, 0, eye.z)
      this.rain.position.y = 0
    }
    if (this._outside !== outside) { this._outside = outside; this.audio.setRain(outside); this.scene.fog.density = outside ? 0.035 : 0.055 }
    this.renderer.render(this.scene, this.camera)
  }

  // ---- automated testing hooks ------------------------------------------------------

  #exposeTestApi() {
    const g = this
    const api = {
      game: g,
      THREE,
      teleport(x, y, z, yaw = g.yaw, pitch = 0) { g.player.teleport(x, y, z); g.yaw = yaw; g.pitch = pitch; g.zones.update(0, g.playerFloor(), true); g.#updateFloorVisibility(true); g.render() },
      step(seconds, input = null) {
        g.input.forced = input
        const n = Math.round(seconds / DT)
        for (let i = 0; i < n; i++) g.step(DT)
        g.input.forced = null
        g.render()
        return api.status()
      },
      status() {
        const p = g.player.pos
        return { x: +p.x.toFixed(3), y: +p.y.toFixed(3), z: +p.z.toFixed(3), floor: g.playerFloor(), grounded: g.player.grounded, crouching: g.player.crouching,
          yaw: g.yaw, pitch: g.pitch, aimed: g.aimed ? g.aimed.it.id : null, prompt: g.aimed ? g.aimed.it.prompt(g) : null,
          elevator: { k: g.elevator.k, y: g.elevator.y, state: g.elevator.state, door: g.elevator.door }, power: { ...g.power },
          flags: { ...g.flags }, inventory: [...g.inventory.keys()], photos: [...g.photos], flash: g.flashOn, recoveries: g.stats.recoveries,
          zones: Object.fromEntries(g.zones.list.map(z => [z.name, z.loaded])), toast: g.ui.lastToast, docOpen: g.ui.docOpen,
          overlapping: !!g.player.overlapping() }
      },
      // Turn the camera toward a world point (through the eye).
      lookAt(x, y, z) {
        const p = g.player.pos
        const ex = p.x, ey = p.y + g.eye, ez = p.z
        const dx = x - ex, dy = y - ey, dz = z - ez
        g.yaw = Math.atan2(-dx, -dz)
        g.pitch = Math.atan2(dy, Math.hypot(dx, dz))
        g.render()
        g.aimed = g.pick()
        return g.aimed ? g.aimed.it.id : null
      },
      interact() {
        g.render()
        g.aimed = g.pick()
        if (!g.aimed) return null
        const id = g.aimed.it.id
        g.aimed.it.interact(g)
        if (g.ui.docOpen) g.ui.closeDocument()
        return id
      },
      // Look at an interactable by id and use it through the real aim/raycast path.
      use(id) {
        const it = [...g.interactables].find(i => i.id === id)
        if (!it) return { ok: false, why: 'missing ' + id }
        const bx = it.aimBox()
        if (bx.isEmpty()) return { ok: false, why: 'empty box' }
        const c = bx.getCenter(new THREE.Vector3())
        const aimed = api.lookAt(c.x, c.y, c.z)
        if (aimed !== id) return { ok: false, why: `aimed ${aimed}`, status: api.status() }
        api.interact()
        return { ok: true }
      },
      // Walk to (x, z) using real input + physics. Fails if stuck.
      walkTo(x, z, opts = {}) {
        const timeout = opts.timeout || 30, tol = opts.tol || 0.2
        let t = 0
        while (t < timeout) {
          const p = g.player.pos
          const dx = x - p.x, dz = z - p.z
          const dist = Math.hypot(dx, dz)
          if (dist < tol) return { ok: true, t, ...api.status() }
          g.yaw = Math.atan2(-dx, -dz)
          g.input.forced = { y: Math.min(1, dist / 0.5 + 0.2), sprint: !!opts.sprint, crouch: !!opts.crouch }
          g.step(DT)
          t += DT
          if (g.player.blockedTime > 1.0) { g.input.forced = null; return { ok: false, why: 'stuck', t, ...api.status() } }
        }
        g.input.forced = null
        return { ok: false, why: 'timeout', ...api.status() }
      },
      path(points, opts) {
        for (const [i, pt] of points.entries()) {
          const r = api.walkTo(pt[0], pt[1], opts)
          if (!r.ok) return { ...r, failedAt: i, point: pt }
        }
        g.input.forced = null
        g.render()
        return { ok: true, ...api.status() }
      },
      // Wait (simulate) until predicate or timeout.
      waitFor(fnSrc, timeout = 20) {
        const fn = new Function('g', 'return (' + fnSrc + ')')
        let t = 0
        while (t < timeout) { if (fn(g)) return { ok: true, t }; g.step(DT); t += DT }
        return { ok: false, t }
      },
      // Flood-fill the walkable floor of a storey from a start point (0.1 m grid).
      reachable(y, start, targets, bounds = { x0: B.x0, x1: B.x1, z0: B.z0, z1: B.z1 }) {
        const pl = g.player, W = g.world
        const s = 0.1
        const nx = Math.round((bounds.x1 - bounds.x0) / s), nz = Math.round((bounds.z1 - bounds.z0) / s)
        const ok = new Int8Array(nx * nz) // 0 unknown, 1 walkable, -1 blocked
        const cell = (i, j) => {
          const idx = i * nz + j
          if (ok[idx]) return ok[idx] > 0
          const x = bounds.x0 + (i + 0.5) * s, z = bounds.z0 + (j + 0.5) * s
          const free = !W.anyOverlap(x - pl.r, y + 0.02, z - pl.r, x + pl.r, y + pl.hStand, z + pl.r)
          const floor = free && W.anyOverlap(x - 0.05, y - 0.1, z - 0.05, x + 0.05, y + 0.01, z + 0.05)
          ok[idx] = free && floor ? 1 : -1
          return ok[idx] > 0
        }
        const toIJ = (x, z) => [Math.floor((x - bounds.x0) / s), Math.floor((z - bounds.z0) / s)]
        const [si, sj] = toIJ(start[0], start[1])
        if (!cell(si, sj)) return { ok: false, why: 'start blocked' }
        const seen = new Uint8Array(nx * nz)
        const q = [si * nz + sj]; seen[si * nz + sj] = 1
        while (q.length) {
          const idx = q.pop(), i = Math.floor(idx / nz), j = idx % nz
          for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const a = i + di, b = j + dj
            if (a < 0 || b < 0 || a >= nx || b >= nz) continue
            const n = a * nz + b
            if (seen[n]) continue
            if (!cell(a, b)) continue
            seen[n] = 1; q.push(n)
          }
        }
        let count = 0
        for (let i = 0; i < seen.length; i++) count += seen[i]
        const res = {}
        for (const [name, [x, z]] of Object.entries(targets)) {
          const [i, j] = toIJ(x, z)
          // a target counts if any cell within 0.3 m is reachable
          let hit = false
          for (let a = i - 3; a <= i + 3 && !hit; a++) for (let b = j - 3; b <= j + 3 && !hit; b++)
            if (a >= 0 && b >= 0 && a < nx && b < nz && seen[a * nz + b]) hit = true
          res[name] = hit
        }
        return { ok: true, area: +(count * s * s).toFixed(2), targets: res }
      },
      floorLabel,
      APT, B, FLOORS, FLOOR_H, ROOF_Y,
    }
    window.__RA = api
  }
}

const game = new Game()
window.game = game
