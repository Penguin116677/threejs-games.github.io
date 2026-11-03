import * as THREE from 'three'
import { RANAH } from './combat.js'

// Tampilan & kamera jurus Ranah Tebas (v0.26.0, dari video kiriman pengguna):
//   buka   — lingkaran ranah melebar dari kaki pemain; dunia mulai berhenti
//   isi    — kamera naik melihat lurus ke bawah; kubah ranah tembus pandang, layar kelabu dengan tepi
//            merah, angka "% 0 → % 100" di atas layar + cincin merah di tepi ranah yang terisi searah
//            jarum jam; cakram merah di bawah pemain; setiap sasaran terkunci → penanda merah di atas
//            kepalanya, dan jalur merah melengkung terlukis dari pemain ke sasaran-sasaran itu
//   puncak — ranah memerah; kamera menyorot dekat dari bawah; garis-garis tebasan merah melintang layar
//   kilat  — kamera kembali di belakang pemain; jejak merah-jingga di setiap lesatan, percik merah di
//            setiap sasaran yang tertebas
//   ledak  — semua sasaran pecah bersamaan; nama jurus muncul sesaat
// Semua mesh dibuat sekali (satu kelompok), disembunyikan bila jurus tidak berjalan.
const $ = id => document.getElementById(id)
const R = RANAH.r
const MAX = RANAH.max
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// kubah: tepi berpendar (fresnel), tengahnya hampir bening
function domeMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#f2f4f6') }, uAlpha: { value: 0 }, uRed: { value: 0 } },
    vertexShader: /* glsl */`
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      uniform float uAlpha;
      uniform float uRed;
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
        vec3 c = mix(uColor, vec3(0.95, 0.18, 0.2), uRed);
        gl_FragColor = vec4(c, uAlpha * (0.1 + 0.75 * f));
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
}

// cincin kemajuan: hanya bagian sudut < uProgress yang tampak (mulai dari arah "atas layar")
function progressMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uProgress: { value: 0 }, uStart: { value: 0 }, uAlpha: { value: 1 } },
    vertexShader: /* glsl */`
      varying vec2 vP;
      void main() {
        vP = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uProgress;
      uniform float uStart;
      uniform float uAlpha;
      varying vec2 vP;
      void main() {
        float a = atan(vP.x, vP.y) - uStart;
        a = mod(a, 6.2831853) / 6.2831853; // 0..1 searah jarum jam (dilihat dari atas) dari titik mulai
        if (a > uProgress) discard;
        gl_FragColor = vec4(0.92, 0.16, 0.2, uAlpha);
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
}

// penanda kunci: kotak merah dengan siku putih (tekstur kanvas)
function markerTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  g.fillStyle = '#e0222f'
  g.fillRect(16, 16, 32, 32)
  g.fillStyle = '#ffffff'
  g.fillRect(25, 25, 14, 14)
  g.fillStyle = '#e0222f'
  g.fillRect(28, 28, 8, 8)
  g.strokeStyle = '#ffffff'
  g.lineWidth = 4
  for (const [x, y, dx, dy] of [[6, 6, 1, 1], [58, 6, -1, 1], [6, 58, 1, -1], [58, 58, -1, -1]]) {
    g.beginPath()
    g.moveTo(x, y + dy * 12)
    g.lineTo(x, y)
    g.lineTo(x + dx * 12, y)
    g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

// titik bulat lembut (percik)
function dotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const g = c.getContext('2d')
  const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16)
  gr.addColorStop(0, 'rgba(255,255,255,1)')
  gr.addColorStop(0.35, 'rgba(255,200,180,0.85)')
  gr.addColorStop(1, 'rgba(255,60,40,0)')
  g.fillStyle = gr
  g.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(c)
}

// ground: tinggi tanah; ceil(x, z, y): langit-langit di atas (gua / ruangan) atau Infinity
export function createRanah({ ground, ceil = () => Infinity }) {
  const group = new THREE.Group()
  group.name = 'ranah-tebas'
  group.visible = false
  group.renderOrder = 5

  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 20, 0, Math.PI * 2, 0, Math.PI / 2), domeMaterial())
  const floor = new THREE.Mesh(new THREE.CircleGeometry(1, 72), new THREE.MeshBasicMaterial({ color: '#e8ecf0', transparent: true, opacity: 0, depthWrite: false }))
  floor.rotation.x = -Math.PI / 2
  const edge = new THREE.Mesh(new THREE.RingGeometry(0.975, 1, 96), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }))
  edge.rotation.x = -Math.PI / 2
  const prog = new THREE.Mesh(new THREE.RingGeometry(0.955, 1.01, 128), progressMaterial())
  prog.rotation.x = -Math.PI / 2
  const core = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ color: '#e5323c', transparent: true, opacity: 0, depthWrite: false }))
  core.rotation.x = -Math.PI / 2
  for (const m of [dome, floor, edge, prog, core]) {
    m.renderOrder = 5
    m.frustumCulled = false
  }
  group.add(dome, floor, edge, prog, core)

  // penanda kunci di atas kepala sasaran
  const tex = markerTexture()
  const markers = []
  for (let i = 0; i < MAX; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false, sizeAttenuation: false }))
    s.visible = false
    s.renderOrder = 7
    group.add(s)
    markers.push({ s, t: 0, on: false, id: null })
  }

  // jalur merah melengkung (dibentuk saat ranah terisi, terungkap sedikit demi sedikit)
  const trailMat = new THREE.MeshBasicMaterial({ color: '#ff1a1a', transparent: true, opacity: 0.95, depthWrite: false, depthTest: false })
  let trail = null

  // jejak lesatan (kilat) & percik merah
  const streakGeo = new THREE.BoxGeometry(1, 1, 1)
  const streaks = []
  for (let i = 0; i < MAX + 2; i++) {
    const m = new THREE.Mesh(streakGeo, new THREE.MeshBasicMaterial({ color: '#ff5a2a', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    m.visible = false
    m.renderOrder = 6
    group.add(m)
    streaks.push({ m, t: 0 })
  }
  const SPARKS = 220
  const sparkGeo = new THREE.BufferGeometry()
  const sparkPos = new Float32Array(SPARKS * 3)
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
  const sparkMat = new THREE.PointsMaterial({ color: '#ff3020', size: 0.22, map: dotTexture(), transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending })
  const sparks = new THREE.Points(sparkGeo, sparkMat)
  sparks.frustumCulled = false
  sparks.visible = false
  const sparkV = Array.from({ length: SPARKS }, () => ({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0 }))
  let sparkNext = 0
  const sparkWorld = new THREE.Group()
  sparkWorld.add(sparks)
  sparkWorld.name = 'ranah-percik'

  // lapisan layar
  const layar = $('ranah-layar')
  const persen = layar?.querySelector('.ranah-persen b')
  const nama = $('ranah-nama')

  const state = { active: false, phase: null, t: 0, center: { x: 0, y: 0, z: 0 }, start: 0, ids: [], targets: new Map(), camBlend: 0, look: null, closeUp: false, end: 0, flash: 0 }
  const tmp = new THREE.Vector3()
  const tmp2 = new THREE.Vector3()
  const camPos = new THREE.Vector3()
  const camQuat = new THREE.Quaternion()
  const upTop = new THREE.Vector3()
  const mTmp = new THREE.Matrix4()

  function spark(x, y, z, n, speed = 7) {
    for (let i = 0; i < n; i++) {
      const p = sparkV[sparkNext]
      sparkNext = (sparkNext + 1) % SPARKS
      const a = Math.random() * Math.PI * 2
      const up = Math.random()
      const v = speed * (0.4 + Math.random() * 0.8)
      Object.assign(p, { x, y, z, vx: Math.cos(a) * v * (1 - up * 0.5), vy: 1.5 + up * v * 0.8, vz: Math.sin(a) * v * (1 - up * 0.5), life: 0.5 + Math.random() * 0.5 })
    }
    sparks.visible = true
  }

  function buildTrail(points) {
    if (trail) {
      group.remove(trail)
      trail.geometry.dispose()
      trail = null
    }
    if (points.length < 2) return
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
    const segs = Math.max(24, points.length * 24)
    const geo = new THREE.TubeGeometry(curve, segs, 0.22, 6, false)
    trail = new THREE.Mesh(geo, trailMat)
    trail.renderOrder = 6
    trail.frustumCulled = false
    geo.setDrawRange(0, 0)
    trail.userData.total = geo.index ? geo.index.count : geo.attributes.position.count
    trail.userData.segs = segs
    group.add(trail)
  }

  // titik jalur: pemain → sasaran terkunci (urut), sedikit di atas tanah, melengkung keluar-masuk
  function trailPoints(positions) {
    const pts = [new THREE.Vector3(state.center.x, state.center.y + 0.2, state.center.z)]
    for (let i = 0; i < positions.length; i++) {
      const p = positions[i]
      const prev = pts[pts.length - 1]
      // titik tengah dibelokkan ke samping supaya jalurnya melengkung seperti dilukis tangan
      const mx = (prev.x + p.x) / 2
      const mz = (prev.z + p.z) / 2
      const dx = p.x - prev.x
      const dz = p.z - prev.z
      const l = Math.hypot(dx, dz) || 1
      const side = (i % 2 ? 1 : -1) * Math.min(3, l * 0.35)
      const gx = mx - (dz / l) * side
      const gz = mz + (dx / l) * side
      pts.push(new THREE.Vector3(gx, ground.surfaceAt(gx, gz) + 0.25, gz))
      pts.push(new THREE.Vector3(p.x, p.y + 0.3, p.z))
    }
    return pts
  }

  const api = {
    object: group,
    sparks: sparkWorld,
    get active() {
      return state.active
    },
    get phase() {
      return state.phase
    },
    // pengujian: keadaan tampilan
    get debug() {
      return { phase: state.phase, camBlend: +state.camBlend.toFixed(2), closeUp: state.closeUp, locked: markers.filter(m => m.on).length, trail: !!trail, layar: layar ? !layar.hidden : null, persen: persen?.textContent ?? null }
    },
    // kejadian dari combat.js (type 'ranah'); positionOf(id) → { x, y, z } | null; yaw = arah kamera
    event(ev, positionOf, yaw) {
      if (ev.fase === 'buka') {
        const p = ev.origin
        const y = ground.surfaceAt(p.x, p.z)
        Object.assign(state, { active: true, phase: 'buka', t: 0, center: { x: p.x, y, z: p.z }, ids: ev.targets.slice(), camBlend: 0, closeUp: false, end: 0, flash: 0 })
        state.start = -yaw // "atas layar" saat kamera melihat lurus ke bawah = arah pandang kamera
        state.targets.clear()
        for (const m of markers) {
          m.on = false
          m.s.visible = false
        }
        buildTrail([])
        group.position.set(p.x, y + 0.04, p.z)
        group.visible = true
        if (layar) {
          layar.hidden = false
          layar.className = 'buka'
        }
        if (persen) persen.textContent = '0'
      } else if (ev.fase === 'isi') {
        state.phase = 'isi'
        state.t = 0
        if (layar) layar.className = 'isi'
      } else if (ev.fase === 'kunci') {
        const m = markers[ev.i]
        if (m) {
          m.on = true
          m.t = 0
          m.id = ev.id
          m.s.visible = true
        }
        // jalur sampai sasaran yang sudah terkunci
        const pos = []
        for (const k of markers) if (k.on) {
          const p = positionOf(k.id)
          if (p) pos.push(p)
        }
        buildTrail(trailPoints(pos))
      } else if (ev.fase === 'penuh') {
        Object.assign(state, { phase: 'puncak', t: 0, closeUp: true, flash: 1 })
        if (layar) layar.className = 'puncak'
      } else if (ev.fase === 'kilat') {
        Object.assign(state, { phase: 'kilat', t: 0, closeUp: false, camBlend: 0 })
        if (layar) layar.className = 'kilat'
        // jejak lesatan untuk tiap ruas jalur
        const pts = ev.path
        for (let i = 0; i + 1 < pts.length && i < streaks.length; i++) {
          const a = pts[i]
          const b = pts[i + 1]
          const len = Math.hypot(b.x - a.x, b.z - a.z)
          const s = streaks[i]
          if (len < 0.3) continue
          const ya = ground.surfaceAt(a.x, a.z) + 1
          const yb = ground.surfaceAt(b.x, b.z) + 1
          s.m.position.set((a.x + b.x) / 2 - group.position.x, (ya + yb) / 2 - group.position.y, (a.z + b.z) / 2 - group.position.z)
          s.m.rotation.set(0, Math.atan2(b.x - a.x, b.z - a.z), 0)
          s.m.scale.set(0.05, 0.05, len)
          s.t = -i * RANAH.seg // muncul saat pemain melesat di ruas itu
          s.m.visible = true
          s.m.material.opacity = 0
        }
        // ranah memudar
        for (const m of markers) m.s.visible = m.on
      } else if (ev.fase === 'tebas') {
        const y = ground.surfaceAt(ev.x, ev.z)
        spark(ev.x, y + 1.1, ev.z, 18, 6)
        const m = markers.find(k => k.id === ev.id)
        if (m) m.t = -1 // tanda: tertebas (berdenyut lalu hilang saat ledakan)
      } else if (ev.fase === 'ledak') {
        Object.assign(state, { phase: 'ledak', t: 0, flash: 0.8 })
        for (const id of ev.targets) {
          const p = positionOf(id)
          if (p) spark(p.x, p.y + 1, p.z, 26, 9)
        }
        for (const m of markers) {
          m.on = false
          m.s.visible = false
        }
        if (nama) {
          nama.hidden = false
          nama.classList.remove('tampil')
          void nama.offsetWidth // mulai ulang animasi
          nama.classList.add('tampil')
          clearTimeout(api._namaT)
          api._namaT = setTimeout(() => {
            nama.hidden = true
          }, 1900)
        }
        if (layar) layar.className = 'ledak'
      }
    },
    // dipanggil tiap bingkai (dt nyata). r = player.ranah (keadaan combat) atau null; positionOf(id)
    update(dt, r, positionOf, playerPos) {
      // percik merah (juga setelah jurus selesai)
      if (sparks.visible) {
        let alive = 0
        for (let i = 0; i < SPARKS; i++) {
          const p = sparkV[i]
          if (p.life <= 0) {
            sparkPos[i * 3 + 1] = -9999
            continue
          }
          p.life -= dt
          p.vy -= 14 * dt
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.z += p.vz * dt
          sparkPos[i * 3] = p.x
          sparkPos[i * 3 + 1] = p.y
          sparkPos[i * 3 + 2] = p.z
          alive++
        }
        sparkGeo.attributes.position.needsUpdate = true
        if (!alive) sparks.visible = false
      }
      if (!state.active) return
      // jurus terputus (pemain roboh / kembali ke darat): tampilan langsung ditutup
      if (!r && state.phase !== 'ledak') {
        state.active = false
        group.visible = false
        for (const s of streaks) s.m.visible = false
        if (layar) layar.hidden = true
        return
      }
      state.t += dt
      const pct = r ? r.pct : 1
      // ranah melebar (buka) lalu tetap; memudar di akhir
      const open = state.phase === 'buka' ? smooth(0, RANAH.buka, state.t) : 1
      const fade = state.phase === 'ledak' ? 1 - smooth(0.1, 0.7, state.t) : state.phase === 'kilat' ? 1 - smooth(0, 0.5, state.t) * 0.6 : 1
      const red = state.phase === 'puncak' ? 1 : state.phase === 'kilat' || state.phase === 'ledak' ? 0.8 : smooth(0.85, 1, pct) * 0.6
      dome.scale.set(R * open, R * open * 0.62, R * open)
      dome.material.uniforms.uAlpha.value = 0.55 * open * fade * (state.phase === 'buka' ? 0.6 : 1)
      dome.material.uniforms.uRed.value = red
      floor.scale.setScalar(R * open)
      floor.material.opacity = 0.16 * fade
      floor.material.color.set(red > 0.5 ? '#f0b0b0' : '#e8ecf0')
      edge.scale.setScalar(R * open)
      edge.material.opacity = 0.85 * fade
      prog.scale.setScalar(R * open)
      prog.material.uniforms.uProgress.value = pct
      prog.material.uniforms.uStart.value = state.start
      prog.material.uniforms.uAlpha.value = fade
      // cakram merah di bawah pemain: membesar saat penuh
      const coreR = state.phase === 'buka' || state.phase === 'isi' ? 1.6 + pct * 0.6 : 1.6 + 0.6 + smooth(0, 0.3, state.t) * (R * 0.55)
      core.scale.setScalar(coreR)
      core.material.opacity = (state.phase === 'buka' ? 0.6 * open : 0.62) * fade
      // cakram & kubah mengikuti tempat ranah dibuka; cakram merah di bawah pemain
      tmp.set(playerPos.x - group.position.x, 0.03, playerPos.z - group.position.z)
      core.position.copy(tmp)
      // penanda kunci di atas kepala sasaran (berdenyut saat baru terkunci)
      for (const m of markers) {
        if (!m.on) continue
        const p = positionOf(m.id)
        if (!p) {
          m.s.visible = false
          continue
        }
        m.t += m.t < 0 ? 0 : dt
        const pop = m.t >= 0 ? 1 + 0.8 * Math.exp(-m.t * 10) : 1.25 + 0.25 * Math.sin(state.t * 30)
        m.s.position.set(p.x - group.position.x, p.y + 2.3 - group.position.y, p.z - group.position.z)
        m.s.scale.setScalar(0.05 * pop) // ukuran tetap di layar (bagian tinggi layar)
        m.s.material.opacity = fade
      }
      // jalur merah: terungkap sejauh kemajuan pengisian
      if (trail) {
        const { total } = trail.userData
        const k = state.phase === 'isi' ? Math.min(1, pct * 1.05 + 0.05) : 1
        trail.geometry.setDrawRange(0, Math.floor((total * k) / 3) * 3)
        trailMat.opacity = 0.95 * fade
        trail.position.set(-group.position.x, -group.position.y, -group.position.z)
      }
      // jejak lesatan: muncul cepat, memudar
      for (const s of streaks) {
        if (!s.m.visible) continue
        s.t += dt
        if (s.t < 0) continue
        const k = s.t / 0.7
        if (k >= 1) {
          s.m.visible = false
          continue
        }
        s.m.material.opacity = k < 0.12 ? k / 0.12 : 1 - (k - 0.12) / 0.88
        s.m.scale.x = s.m.scale.y = 0.04 + 0.06 * (1 - k)
      }
      // persen di layar
      if (persen) {
        const v = String(Math.round(pct * 100))
        if (persen.textContent !== v) persen.textContent = v
      }
      if (state.phase === 'ledak' && state.t > 0.9) {
        state.active = false
        group.visible = false
        if (layar) layar.hidden = true
      }
    },
    // kamera: setelah kamera biasa diperbarui. Saat ranah terisi: melihat lurus ke bawah dari atas
    // pemain (seluruh ranah tampak); puncak: sorotan dekat dari bawah; selain itu kamera biasa
    camera(camera, dt, playerPos, yaw, heading = yaw + Math.PI) {
      if (!state.active) {
        state.camBlend = 0
        return
      }
      const top = state.phase === 'buka' || state.phase === 'isi'
      state.camBlend += ((top ? 1 : 0) - state.camBlend) * (1 - Math.exp(-(top ? 7 : 30) * dt))
      if (state.closeUp && state.phase === 'puncak') {
        // sorotan dekat: rendah di depan-samping pemain (arah hadapnya), menengadah ke dadanya
        const fx = Math.sin(heading)
        const fz = Math.cos(heading)
        const rx = Math.cos(heading)
        const rz = -Math.sin(heading)
        const push = smooth(0, RANAH.puncak, state.t) * 0.5
        camera.position.set(playerPos.x + fx * (3.4 - push) + rx * 1.3, playerPos.y + 0.5, playerPos.z + fz * (3.4 - push) + rz * 1.3)
        tmp.set(playerPos.x, playerPos.y + 1.35, playerPos.z)
        camera.up.set(0, 1, 0)
        camera.lookAt(tmp)
        return
      }
      if (state.camBlend < 0.001) return
      // tinggi agar seluruh ranah (+ tepinya) muat di layar, dibatasi langit-langit gua / ruangan
      const halfV = THREE.MathUtils.degToRad(camera.fov) / 2
      const halfH = Math.atan(Math.tan(halfV) * camera.aspect)
      const need = (R * 1.12) / Math.tan(Math.min(halfV, halfH))
      const c = state.center
      const roof = ceil(c.x, c.z, c.y + 1.5)
      const h = Math.max(6, Math.min(need, roof - c.y - 2.5))
      // "atas layar" = arah pandang kamera biasa
      upTop.set(-Math.sin(yaw), 0, -Math.cos(yaw))
      camPos.set(c.x, c.y + h, c.z)
      tmp2.set(c.x, c.y, c.z)
      mTmp.lookAt(camPos, tmp2, upTop)
      camQuat.setFromRotationMatrix(mTmp)
      const k = state.camBlend
      camera.position.lerp(camPos, k)
      camera.quaternion.slerp(camQuat, k)
    },
    get flash() {
      return state.flash
    },
  }
  return api
}
