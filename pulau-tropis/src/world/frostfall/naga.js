import * as THREE from 'three'
import { createDragonModel, JOINTS, UKURAN } from './naga-model.js'

// Naga Es — penjaga Gua Gletser Utara (v0.24.0, dari lembar desain pengguna "Cryo Dragon").
// Tidur meringkuk melingkari peti harta di Ruang Air Terjun Beku; peti terbungkus segel es selama naga
// hidup. Penyusup yang masuk ke ruang itu membangunkannya:
//   bangun → mengaum → bertarung: Gigitan (depan, dekat), Sapuan Ekor (belakang), Hembusan Es (napas
//   beku berbentuk kerucut), Ledakan Es (lingkaran bercahaya di lantai lalu kristal es menyembur),
//   Terbang (naik dengan hembusan angin sayap → melayang berputar & menyembur dari udara → mendarat
//   menghentak). Nyawa ≤ 50%: mengaum lagi, lebih cepat & lebih sering menyerang.
//   Pemain kabur jauh / keluar gua → naga pulang ke sarangnya, tidur, pulih. Pemain kalah → bangun di
//   luar mulut gua. Naga kalah → roboh, segel es peti pecah; beberapa menit kemudian (saat pemain jauh)
//   ia pulih dan tidur lagi.
// Animasinya prosedural (naga-model.js applyPose): AI hanya mengatur parameter pose yang dihaluskan.

export const NAGA_HP = 240
// ukuran dunia mengikuti UKURAN model (v0.24.1: ±14 m panjang, kepala ±5 m, rentang sayap ±19 m)
const S = UKURAN
const SPEED = { jalan: 2.8, lari: 6.4, putar: 1.7 }
const STRIDE = 3.4 * S // m per siklus langkah
// jurus: jeda pakai (detik), jangkauan (m), luka, lama ancang-ancang & seluruh gerakan
const SK = {
  gigit: { cd: 2.4, reach: 2.6, dmg: 15, windup: 0.55, dur: 1.15 },
  ekor: { cd: 4.5, reach: 8.5, dmg: 15, windup: 0.6, dur: 1.5, push: 9 },
  hembus: { cd: 8, reach: 20, windup: 0.95, dur: 3.3, dps: 18, cone: 0.3 },
  ledak: { cd: 12.5, dmg: 24, r: 3.4, windup: 0.75, delay: 1.35, n: 4 },
  terbang: { cd: 24 },
  hentak: { dmg: 20, r: 6, push: 10 }, // mendarat dari terbang
}
const FLY_Y = 7
const SMOOTH = 5 // laju penghalusan parameter pose (1/detik)

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a))

// ------------------------------------------------------------------------------------- efek
// partikel napas es / serpih / kabut beku: satu THREE.Points (aditif), diperbarui di CPU
function createParticles(max = 420) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(max * 3)
  const size = new Float32Array(max)
  const alpha = new Float32Array(max)
  const tint = new Float32Array(max)
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1))
  geo.setAttribute('aTint', new THREE.BufferAttribute(tint, 1))
  const mat = new THREE.ShaderMaterial({
    uniforms: { uScale: { value: 600 } },
    vertexShader: /* glsl */`
      attribute float aSize;
      attribute float aAlpha;
      attribute float aTint;
      uniform float uScale;
      varying float vAlpha;
      varying float vTint;
      void main() {
        vAlpha = aAlpha;
        vTint = aTint;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp(aSize * uScale / max(0.5, -mv.z), 0.0, 220.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      varying float vAlpha;
      varying float vTint;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float a = smoothstep(0.5, 0.0, d) * vAlpha;
        if (a < 0.01) discard;
        vec3 col = mix(vec3(0.8, 0.95, 1.0), vec3(0.14, 0.55, 1.0), vTint);
        // inti terang, tepi biru: tetap terbaca di gua yang terang maupun gelap
        col = mix(col, vec3(1.0), smoothstep(0.25, 0.0, d) * 0.5);
        gl_FragColor = vec4(col * a * 1.25, a);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const points = new THREE.Points(geo, mat)
  points.name = 'naga-partikel'
  points.frustumCulled = false
  const P = []
  for (let i = 0; i < max; i++) P.push({ life: 0, max: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, s0: 0, s1: 0, tint: 0, drag: 0, grav: 0 })
  let next = 0
  return {
    points,
    uniforms: mat.uniforms,
    emit(x, y, z, vx, vy, vz, life, s0, s1, tint = 0.3, drag = 0.6, grav = 0) {
      const p = P[next]
      next = (next + 1) % max
      Object.assign(p, { life, max: life, x, y, z, vx, vy, vz, s0, s1, tint, drag, grav })
    },
    update(dt) {
      let n = 0
      for (let i = 0; i < max; i++) {
        const p = P[i]
        if (p.life <= 0) {
          alpha[i] = 0
          size[i] = 0
          continue
        }
        p.life -= dt
        const k = Math.exp(-p.drag * dt)
        p.vx *= k
        p.vy = p.vy * k - p.grav * dt
        p.vz *= k
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.z += p.vz * dt
        const t = 1 - p.life / p.max
        pos[i * 3] = p.x
        pos[i * 3 + 1] = p.y
        pos[i * 3 + 2] = p.z
        size[i] = p.s0 + (p.s1 - p.s0) * t
        alpha[i] = Math.min(1, t * 6) * (1 - t)
        tint[i] = Math.min(1, p.tint + t * 0.6)
        n++
      }
      geo.attributes.position.needsUpdate = true
      geo.attributes.aSize.needsUpdate = true
      geo.attributes.aAlpha.needsUpdate = true
      geo.attributes.aTint.needsUpdate = true
      points.visible = n > 0
      return n
    },
  }
}

// kristal es yang menyembur dari lantai (Ledakan Es, hentakan mendarat): InstancedMesh, satu draw call
// kristal: badan heksagonal + ujung runcing; dasar di y = 0, tinggi 1
function crystalGeometry() {
  const pos = []
  const add = geo => {
    const ng = geo.toNonIndexed()
    const a = ng.attributes.position
    for (let i = 0; i < a.count; i++) pos.push(a.getX(i), a.getY(i), a.getZ(i))
  }
  const tip = new THREE.CylinderGeometry(0.0, 0.5, 0.35, 6, 1, false)
  tip.translate(0, 0.825, 0)
  const shaft = new THREE.CylinderGeometry(0.5, 0.6, 0.65, 6, 1, false)
  shaft.translate(0, 0.325, 0)
  add(tip)
  add(shaft)
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  out.computeVertexNormals()
  tip.dispose()
  shaft.dispose()
  return out
}
function createSpikes(max = 96) {
  const mat = new THREE.MeshLambertMaterial({ color: '#cdeeff', emissive: '#2f8fe0', emissiveIntensity: 0.55, flatShading: true })
  const mesh = new THREE.InstancedMesh(crystalGeometry(), mat, max)
  mesh.name = 'naga-kristal'
  mesh.frustumCulled = false
  const S = []
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const v = new THREE.Vector3()
  const sc = new THREE.Vector3()
  for (let i = 0; i < max; i++) {
    S.push({ t: -1, x: 0, y: 0, z: 0, h: 1, r: 0.4, tx: 0, tz: 0, ry: 0, hold: 1 })
    mesh.setMatrixAt(i, m.makeScale(0, 0, 0))
  }
  let next = 0
  return {
    mesh,
    spawn(x, y, z, h, r, tilt, ry, hold = 1.3, delay = 0) {
      const s = S[next]
      next = (next + 1) % max
      Object.assign(s, { t: -delay, x, y, z, h, r, tx: Math.cos(ry) * tilt, tz: Math.sin(ry) * tilt, ry, hold })
    },
    update(dt) {
      let n = 0
      for (let i = 0; i < max; i++) {
        const s = S[i]
        if (s.t === -1) continue
        s.t += dt
        let k = 0
        if (s.t < 0) k = 0
        else if (s.t < 0.16) k = smoothstep(0, 0.16, s.t) * 1.08
        else if (s.t < 0.16 + s.hold) k = 1
        else if (s.t < 0.16 + s.hold + 0.55) k = 1 - smoothstep(0, 0.55, s.t - 0.16 - s.hold)
        else {
          s.t = -1
          mesh.setMatrixAt(i, m.makeScale(0, 0, 0))
          continue
        }
        n++
        e.set(s.tx, s.ry, s.tz)
        q.setFromEuler(e)
        // tenggelam kembali ke lantai saat menghilang
        const sink = s.t > 0.16 + s.hold ? (1 - k) * s.h * 0.6 : 0
        m.compose(v.set(s.x, s.y - sink, s.z), q, sc.set(s.r * 2 * Math.max(0.35, k), s.h * Math.max(0.01, k), s.r * 2 * Math.max(0.35, k)))
        mesh.setMatrixAt(i, m)
      }
      mesh.instanceMatrix.needsUpdate = true
      mesh.visible = n > 0
      return n
    },
  }
}

// cincin datar di lantai: ancang-ancang Ledakan Es (lingkaran berdenyut) & gelombang kejut (mengembang)
function createRings(n = 8) {
  const geo = new THREE.RingGeometry(0.82, 1, 48, 1)
  geo.rotateX(-Math.PI / 2)
  const fill = new THREE.CircleGeometry(0.82, 48)
  fill.rotateX(-Math.PI / 2)
  const R = []
  const group = new THREE.Group()
  group.name = 'naga-cincin'
  for (let i = 0; i < n; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: '#5fc8ff', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
    const fmat = mat.clone()
    const ring = new THREE.Mesh(geo, mat)
    const disc = new THREE.Mesh(fill, fmat)
    ring.add(disc)
    ring.visible = false
    ring.renderOrder = 2
    group.add(ring)
    R.push({ ring, mat, fmat, t: 0, dur: 1, kind: 'tanda', r0: 1, r1: 1 })
  }
  let next = 0
  return {
    group,
    // kind: 'tanda' (berdenyut, mengisi sampai meletus) | 'gelombang' (mengembang r0 → r1, memudar)
    spawn(kind, x, y, z, r0, r1, dur) {
      const s = R[next]
      next = (next + 1) % n
      Object.assign(s, { kind, t: 0, dur, r0, r1 })
      s.ring.position.set(x, y + 0.08, z)
      s.ring.visible = true
    },
    update(dt) {
      for (const s of R) {
        if (!s.ring.visible) continue
        s.t += dt
        const k = s.t / s.dur
        if (k >= 1) {
          s.ring.visible = false
          continue
        }
        if (s.kind === 'tanda') {
          s.ring.scale.setScalar(s.r0)
          s.mat.opacity = 0.55 + 0.4 * Math.sin(s.t * 18) * 0.5 + k * 0.3
          s.fmat.opacity = 0.08 + 0.32 * k
          s.ring.children[0].scale.setScalar(Math.max(0.01, k))
        } else {
          s.ring.scale.setScalar(s.r0 + (s.r1 - s.r0) * (1 - (1 - k) * (1 - k)))
          s.mat.opacity = 0.85 * (1 - k)
          s.fmat.opacity = 0.12 * (1 - k)
          s.ring.children[0].scale.setScalar(1)
        }
      }
    },
  }
}

// bayangan lembut di lantai di bawah naga (penting saat terbang: menunjukkan tempat mendarat)
function createShadow() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31)
  gr.addColorStop(0, 'rgba(0,0,0,0.75)')
  gr.addColorStop(0.6, 'rgba(0,0,0,0.35)')
  gr.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = gr
  g.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  const geo = new THREE.PlaneGeometry(1, 1)
  geo.rotateX(-Math.PI / 2)
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.55 }))
  mesh.name = 'naga-bayang'
  mesh.renderOrder = 1
  return mesh
}

// segel es di sekeliling peti: bongkah es tembus pandang + kristal yang mencuat; pecah saat naga kalah
function createSeal(chest) {
  const group = new THREE.Group()
  group.name = 'segel-es-peti'
  group.position.set(chest.x, chest.y, chest.z)
  group.rotation.y = chest.rot
  const ice = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.9, 1.7), new THREE.MeshLambertMaterial({ color: '#bfe9ff', emissive: '#1d6fb8', emissiveIntensity: 0.5, transparent: true, opacity: 0.55, depthWrite: false }))
  ice.position.y = 0.92
  group.add(ice)
  const spikes = new THREE.InstancedMesh(crystalGeometry(), new THREE.MeshLambertMaterial({ color: '#d8f2ff', emissive: '#2f8fe0', emissiveIntensity: 0.6, flatShading: true }), 9)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    const x = Math.cos(a) * 1.15
    const z = Math.sin(a) * 0.9
    e.set(Math.sin(a) * 0.45, a, -Math.cos(a) * 0.45)
    q.setFromEuler(e)
    const h = 1.3 + (i % 3) * 0.5
    m.compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(0.55, h, 0.55))
    spikes.setMatrixAt(i, m)
  }
  group.add(spikes)
  return { group, ice }
}

// ------------------------------------------------------------------------------------- naga
// plan: frostPlan.naga; chest: peti yang dijaga (frostPlan.chests); ground: tinggi lantai
export function createNaga({ plan, chest, ground, noiseTexture }) {
  const model = createDragonModel(noiseTexture)
  const { bones, uniforms } = model
  const group = new THREE.Group()
  group.name = 'naga-es'
  group.add(model.object)
  const fx = createParticles()
  const spikes = createSpikes()
  const rings = createRings()
  const shadow = createShadow()
  group.add(fx.points, spikes.mesh, rings.group, shadow)
  const seal = chest ? createSeal(chest) : null
  if (seal) group.add(seal.group)

  const A = plan.arena
  const st = {
    state: 'tidur', // tidur · bangun · tarung · terbang · pulang · rebah · kalah
    t: 0, // waktu dalam keadaan ini
    act: null, // jurus yang sedang berjalan { name, t, ... }
    hp: NAGA_HP,
    x: plan.x,
    z: plan.z,
    heading: plan.rot,
    flyY: 0,
    phase: 0,
    gait: 0,
    enraged: false,
    idle: 0,
    cd: { gigit: 0, ekor: 0, hembus: 3, ledak: 5, terbang: 14 },
    lastHit: 0,
    sealed: !!seal,
    deadT: 0,
    fightT: 0,
  }
  // pose sekarang (dihaluskan) & sasaran
  const cur = { sleep: 1, dead: 0, spread: 0, rear: 0, crouch: 0, tuck: 0, neckLift: 0, neckYaw: 0, headPitch: 0, jaw: 0, tailSwing: 0, tailLift: 0, wingRaise: 0, bend: 0 }
  const tgt = { ...cur }
  let flap = 0
  let flapPhase = 0
  let eyes = 0.12
  let flash = 0
  let breathGlow = 0
  let onEvent = () => {}
  let elapsed = 0
  let visible = true

  // titik-titik tubuh (dunia) untuk kena serangan & mendorong pemain: [tulang, jari-jari, geser lokal]
  const HIT = [
    ['hips', 1.9], ['spine', 2.05], ['chest', 1.95], ['neck2', 1.0], ['neck4', 0.85], ['head', 1.1, new THREE.Vector3(0, -0.1, 1.3)],
    ['tail1', 1.35], ['tail3', 0.95], ['tail5', 0.65], ['upperFl', 0.85], ['upperFr', 0.85], ['upperHl', 1.1], ['upperHr', 1.1],
  ].map(([name, r, off]) => ({ bone: bones[JOINTS[name]], r: r * S, off: off || null, p: new THREE.Vector3(), name }))
  const tmp = new THREE.Vector3()
  const tmq = new THREE.Quaternion()
  const mouth = new THREE.Vector3()
  const headDir = new THREE.Vector3()
  const bdir = new THREE.Vector3()
  function refreshBody() {
    model.object.updateMatrixWorld(true)
    for (const h of HIT)
      if (h.off) h.p.copy(h.off).applyMatrix4(h.bone.matrixWorld)
      else h.bone.getWorldPosition(h.p)

    mouth.set(0, -0.32, 2.75).applyMatrix4(bones[JOINTS.head].matrixWorld)
    bones[JOINTS.head].getWorldQuaternion(tmq)
    headDir.set(0, -0.12, 1).normalize().applyQuaternion(tmq)
  }
  const chestPos = () => HIT[2].p

  function event(type, data = {}) {
    onEvent({ type, ...data })
  }

  // --- gerak di lantai: belok ke sasaran, maju dengan kecepatan v (tetap di arena)
  function turnToward(target, dt, rate = SPEED.putar) {
    const want = Math.atan2(target.x - st.x, target.z - st.z)
    const d = wrapAngle(want - st.heading)
    const step = clamp(d, -rate * dt, rate * dt)
    st.heading = wrapAngle(st.heading + step)
    return d
  }
  function advance(v, dt) {
    st.x += Math.sin(st.heading) * v * dt
    st.z += Math.cos(st.heading) * v * dt
    const dx = st.x - A.x
    const dz = st.z - A.z
    const d = Math.hypot(dx, dz)
    if (d > A.r) {
      st.x = A.x + (dx / d) * A.r
      st.z = A.z + (dz / d) * A.r
    }
    st.phase += (v / STRIDE) * Math.PI * 2 * dt
  }

  // hubungan dengan pemain: jarak dari dada & moncong, sudut terhadap arah hadap
  function relation(player) {
    const p = player.position
    const c = chestPos()
    const dist = Math.hypot(p.x - c.x, p.z - c.z)
    const ang = wrapAngle(Math.atan2(p.x - st.x, p.z - st.z) - st.heading)
    const snout = Math.hypot(p.x - mouth.x, p.z - mouth.z)
    const root = Math.hypot(p.x - st.x, p.z - st.z)
    return { dist, ang, snout, root, fromCenter: Math.hypot(p.x - A.x, p.z - A.z) }
  }

  // --- melukai pemain (jarak & tinggi dicek oleh pemanggil)
  function hurt(player, dmg, from, push) {
    if (player.defeated) return
    player.damage(dmg, from, 0, push)
    event('kena', { dmg })
  }
  const playerY = player => player.position.y

  // --- mulai jurus
  function start(name, extra = {}) {
    st.act = { name, t: 0, done: false, ...extra }
    if (SK[name]?.cd) st.cd[name] = SK[name].cd * (st.enraged ? 0.72 : 1)
  }

  // pilih tindakan berikutnya saat bertarung di darat
  function decide(player, rel) {
    if (st.enraged && !st.roaredRage) {
      st.roaredRage = true
      start('aum', { rage: true })
      return
    }
    if (st.cd.terbang <= 0 && st.hp < NAGA_HP * 0.82 && rel.fromCenter < 20) {
      start('terbang', { phase: 'naik' })
      return
    }
    const abs = Math.abs(rel.ang)
    if (abs > 1.9 && rel.dist < SK.ekor.reach && st.cd.ekor <= 0) {
      start('ekor', { side: Math.sign(rel.ang) || 1 })
      return
    }
    if (rel.root < 7.5 && rel.root > 2.5 && abs < 0.6 && st.cd.gigit <= 0) {
      start('gigit')
      return
    }
    if (st.cd.ledak <= 0 && (rel.dist > 8 || Math.random() < 0.35)) {
      start('ledak')
      return
    }
    if (rel.dist < SK.hembus.reach && rel.dist > 3 && abs < 0.55 && st.cd.hembus <= 0) {
      start('hembus')
      return
    }
    if (abs > 0.4) start('belok', { dur: 1.2 })
    else if (rel.root > 6.5) start('dekati', { dur: 2.2 })
    else st.idle = 0.35
  }

  // --- satu langkah jurus yang sedang berjalan; mengatur sasaran pose
  function runAct(dt, player, rel) {
    const a = st.act
    a.t += dt
    const p = player.position
    const k = st.enraged ? 1.18 : 1
    switch (a.name) {
      case 'belok': {
        const d = turnToward(p, dt, SPEED.putar * k)
        st.gait = 1
        st.phase += SPEED.putar * dt * 1.6
        tgt.bend = clamp(d, -1, 1)
        if (Math.abs(d) < 0.15 || a.t > a.dur) a.done = true
        break
      }
      case 'dekati': {
        const err = turnToward(p, dt, SPEED.putar * k)
        const run = st.enraged || rel.dist > 12
        const v = (run ? SPEED.lari : SPEED.jalan) * k
        advance(v * Math.max(0.2, Math.cos(err)), dt)
        st.gait = run ? 2 : 1
        tgt.neckLift = 0.1
        if (rel.root < 6 || a.t > a.dur) a.done = true
        break
      }
      case 'gigit': {
        // ancang-ancang: kepala ditarik ke belakang, rahang terbuka → menyambar
        const w = SK.gigit.windup
        turnToward(p, dt, 0.8)
        if (a.t < w) {
          tgt.neckLift = 0.45
          tgt.headPitch = -0.2
          tgt.jaw = 0.8
          tgt.crouch = 0.25
        } else if (a.t < w + 0.35) {
          // menyambar ke lantai sambil menerjang ±1 m: moncong turun mendekati tanah
          tgt.neckLift = -1.5
          tgt.headPitch = 0.7
          tgt.jaw = a.t < w + 0.2 ? 1 : 0
          tgt.crouch = 0.6
          advance(3.4, dt)
          if (!a.struck && a.t > w + 0.18) {
            a.struck = true
            // titik gigit = moncong saat itu, diproyeksikan ke lantai
            const sx = mouth.x
            const sz = mouth.z
            if (Math.hypot(p.x - sx, p.z - sz) < SK.gigit.reach && playerY(player) < ground.heightAt(sx, sz) + 3) hurt(player, SK.gigit.dmg, { x: sx, z: sz }, 5)
            event('gigit')
          }
        } else {
          tgt.neckLift = 0
          tgt.jaw = 0
          tgt.crouch = 0
        }
        if (a.t > SK.gigit.dur) a.done = true
        break
      }
      case 'ekor': {
        // badan memutar, ekor menyapu dari satu sisi ke sisi lain di belakang
        const w = SK.ekor.windup
        if (a.t < w) {
          tgt.tailSwing = -a.side * 2.2
          tgt.bend = a.side * 0.7
          tgt.tailLift = 1
        } else {
          tgt.tailSwing = a.side * 3
          tgt.bend = -a.side * 0.9
          tgt.tailLift = 0.5
          st.heading = wrapAngle(st.heading + a.side * dt * 1.6 * (a.t < w + 0.5 ? 1 : 0))
          if (!a.struck && a.t > w + 0.25) {
            a.struck = true
            const behind = Math.abs(wrapAngle(Math.atan2(p.x - st.x, p.z - st.z) - st.heading)) > 1.3
            if (behind && Math.hypot(p.x - st.x, p.z - st.z) < SK.ekor.reach && playerY(player) < ground.heightAt(st.x, st.z) + 3) hurt(player, SK.ekor.dmg, { x: st.x, z: st.z }, SK.ekor.push)
            event('ekor')
          }
        }
        if (a.t > SK.ekor.dur) {
          tgt.tailSwing = 0
          tgt.bend = 0
          tgt.tailLift = 0
          a.done = true
        }
        break
      }
      case 'hembus':
        breath(dt, player, a, false)
        break
      case 'ledak': {
        // berdiri di kaki belakang, mengaum ke atas; lingkaran es muncul di bawah pemain & sekitarnya,
        // lalu kristal menyembur dari tiap lingkaran
        const w = SK.ledak.windup
        turnToward(p, dt, 0.9)
        tgt.rear = a.t < w + 0.9 ? 0.75 : 0
        tgt.spread = a.t < w + 0.9 ? 0.85 : 0.15
        tgt.wingRaise = a.t < w + 0.9 ? 0.45 : 0
        tgt.neckLift = a.t < w + 0.9 ? 0.85 : 0
        tgt.jaw = a.t > w * 0.6 && a.t < w + 0.8 ? 1 : 0
        if (!a.marks && a.t > w) {
          a.marks = []
          const gy = ground.heightAt(p.x, p.z)
          a.marks.push({ x: p.x, z: p.z, y: gy })
          for (let i = 0; i < SK.ledak.n + (st.enraged ? 2 : 0); i++) {
            const ang = Math.random() * Math.PI * 2
            const r = 4 + Math.random() * 9
            const x = p.x + Math.cos(ang) * r
            const z = p.z + Math.sin(ang) * r
            if (Math.hypot(x - plan.room.x, z - plan.room.z) > plan.room.r - 2) continue
            a.marks.push({ x, z, y: ground.heightAt(x, z) })
          }
          for (const m of a.marks) rings.spawn('tanda', m.x, m.y, m.z, SK.ledak.r, SK.ledak.r, SK.ledak.delay)
          event('aum', { kecil: true })
        }
        if (a.marks && !a.blown && a.t > w + SK.ledak.delay) {
          a.blown = true
          for (const m of a.marks) {
            eruption(m.x, m.y, m.z, 1)
            if (Math.hypot(p.x - m.x, p.z - m.z) < SK.ledak.r + 0.3 && playerY(player) < m.y + 3.5) hurt(player, SK.ledak.dmg, { x: m.x, z: m.z }, 6)
          }
          event('ledak')
        }
        if (a.t > w + SK.ledak.delay + 0.8) a.done = true
        break
      }
      case 'aum':
        roar(dt, player, a)
        break
      case 'terbang':
        fly(dt, player, a)
        break
      default:
        a.done = true
    }
  }

  // Hembusan Es: menghimpun napas (mulut & duri menyala), lalu menyemburkan kerucut es yang menyapu
  // pelan mengikuti pemain. airborne: dari udara (diarahkan turun ke pemain)
  function breath(dt, player, a, airborne) {
    const w = SK.hembus.windup
    const p = player.position
    if (!a.aim) a.aim = new THREE.Vector3(p.x, p.y + 0.6, p.z)
    // sasaran menyapu ke arah pemain, tetapi lebih lambat dari lari pemain (bisa dihindari)
    const sweep = 2.2 * dt
    a.aim.x += clamp(p.x - a.aim.x, -sweep * 2.2, sweep * 2.2)
    a.aim.z += clamp(p.z - a.aim.z, -sweep * 2.2, sweep * 2.2)
    a.aim.y = p.y + 0.6
    if (!airborne) turnToward(a.aim, dt, 0.5)
    // arahkan leher & kepala ke sasaran
    const dx = a.aim.x - st.x
    const dz = a.aim.z - st.z
    const yawRel = clamp(wrapAngle(Math.atan2(dx, dz) - st.heading), -0.8, 0.8)
    const horiz = Math.hypot(a.aim.x - mouth.x, a.aim.z - mouth.z)
    const pitch = Math.atan2(mouth.y - a.aim.y, Math.max(2, horiz))
    if (a.t < w) {
      breathGlow = Math.min(1, a.t / w)
      tgt.rear = airborne ? 0 : 0.35
      tgt.neckLift = 0.55
      tgt.headPitch = -0.25
      tgt.jaw = 0.25
      tgt.neckYaw = yawRel * 0.6
    } else if (a.t < SK.hembus.dur - 0.3) {
      breathGlow = 1
      tgt.rear = 0
      tgt.crouch = airborne ? 0 : 0.3
      tgt.neckLift = airborne ? -0.2 : -0.15
      tgt.headPitch = clamp(pitch * 0.85 - 0.05, -0.2, 1.1)
      tgt.jaw = 1
      tgt.neckYaw = yawRel
      // semburan: dari mulut ke arah sasaran (dibatasi ke arah hadap kepala)
      const dir = bdir.set(a.aim.x - mouth.x, a.aim.y - mouth.y, a.aim.z - mouth.z).normalize()
      dir.lerp(headDir, 0.25).normalize()
      a.emit = (a.emit || 0) + dt * 150
      while (a.emit > 1) {
        a.emit--
        const sp = 22 + Math.random() * 6
        const j = 0.13
        const vx = (dir.x + (Math.random() - 0.5) * j * 2) * sp
        const vy = (dir.y + (Math.random() - 0.5) * j * 2) * sp
        const vz = (dir.z + (Math.random() - 0.5) * j * 2) * sp
        fx.emit(mouth.x, mouth.y, mouth.z, vx, vy, vz, 0.75 + Math.random() * 0.2, 0.6, 4.2, 0.25 + Math.random() * 0.5, 1.3)
      }
      // kabut beku di lantai tempat semburan jatuh
      a.mist = (a.mist || 0) + dt * 30
      while (a.mist > 1) {
        a.mist--
        const d = 6 + Math.random() * 13
        const x = mouth.x + dir.x * d
        const z = mouth.z + dir.z * d
        const gy = ground.heightAt(x, z)
        if (mouth.y + dir.y * d < gy + 2.5) fx.emit(x, gy + 0.3, z, (Math.random() - 0.5) * 3, 0.6, (Math.random() - 0.5) * 3, 1.2, 1.5, 3.5, 0.15, 1.2)
      }
      // luka: pemain di dalam kerucut semburan
      a.tick = (a.tick || 0) - dt
      if (a.tick <= 0) {
        a.tick = 0.1
        const v = tmp.set(p.x - mouth.x, p.y + 0.9 - mouth.y, p.z - mouth.z)
        const len = v.length()
        const along = v.dot(dir)
        if (len < SK.hembus.reach && along > 0 && Math.acos(clamp(along / Math.max(0.01, len), -1, 1)) < SK.hembus.cone + 0.9 / Math.max(2, len)) hurt(player, SK.hembus.dps * 0.1, mouth, 1.5)
      }
    } else {
      breathGlow = Math.max(0, breathGlow - dt * 3)
      tgt.jaw = 0
      tgt.crouch = 0
      tgt.neckLift = 0
      tgt.headPitch = 0
      tgt.neckYaw = 0
    }
    if (a.t > SK.hembus.dur) {
      a.done = true
      breathGlow = 0
    }
  }

  // Mengaum: berdiri di kaki belakang, sayap terangkat; gelombang kejut mendorong pemain menjauh
  function roar(dt, player, a) {
    turnToward(player.position, dt, 0.9)
    tgt.rear = a.t < 1.8 ? 0.8 : 0
    tgt.spread = a.t < 1.9 ? 1 : 0.15
    tgt.wingRaise = a.t < 1.9 ? 0.55 : 0
    tgt.neckLift = a.t < 1.8 ? 1.0 : 0
    tgt.jaw = a.t > 0.45 && a.t < 1.7 ? 1 : 0
    if (!a.boom && a.t > 0.6) {
      a.boom = true
      const gy = ground.heightAt(st.x, st.z)
      rings.spawn('gelombang', st.x, gy, st.z, 3, 24, 0.9)
      for (let i = 0; i < 40; i++) {
        const an = Math.random() * Math.PI * 2
        fx.emit(mouth.x, mouth.y, mouth.z, Math.cos(an) * 9, 2 + Math.random() * 4, Math.sin(an) * 9, 1.1, 0.8, 3, 0.2, 1.4)
      }
      const p = player.position
      const d = Math.hypot(p.x - st.x, p.z - st.z)
      if (d < 15) hurt(player, a.rage ? 6 : 3, { x: st.x, z: st.z }, 12 - d * 0.5)
      event('aum')
    }
    if (a.t > 2.3) a.done = true
  }

  // semburan kristal es di satu titik (Ledakan Es, hentakan mendarat); big: besar kristal
  function eruption(x, y, z, big) {
    spikes.spawn(x, y - 0.2, z, 3.6 * big + Math.random() * 1.2, 0.55 * big, 0.08, Math.random() * 6, 1.3)
    const n = 6
    for (let i = 0; i < n; i++) {
      const an = (i / n) * Math.PI * 2 + Math.random() * 0.4
      const r = 1.2 + Math.random() * 1.4
      spikes.spawn(x + Math.cos(an) * r, y - 0.15, z + Math.sin(an) * r, (1.4 + Math.random() * 1.6) * big, 0.32 * big, 0.45 + Math.random() * 0.25, an + Math.PI / 2, 1.15, Math.random() * 0.08)
    }
    for (let i = 0; i < 14; i++) {
      const an = Math.random() * Math.PI * 2
      fx.emit(x, y + 0.5, z, Math.cos(an) * 5, 4 + Math.random() * 5, Math.sin(an) * 5, 0.8, 0.5, 1.6, 0.1, 1.2, 9)
    }
    rings.spawn('gelombang', x, y, z, 1, SK.ledak.r + 1.2, 0.5)
  }

  // Terbang: naik (hembusan angin sayap) → melayang berputar & menyembur dari udara → turun & menghentak
  function fly(dt, player, a) {
    const p = player.position
    const gy = ground.heightAt(st.x, st.z)
    if (a.phase === 'naik') {
      tgt.spread = 1
      tgt.crouch = a.t < 0.6 ? 0.9 : 0
      tgt.tuck = a.t > 0.6 ? 1 : 0
      tgt.neckLift = 0.4
      if (a.t > 0.55) {
        flapPhase += dt * 9
        flap = Math.sin(flapPhase) * 0.75
        st.flyY = FLY_Y * smoothstep(0.55, 2.0, a.t)
      }
      if (!a.gust && a.t > 0.6) {
        a.gust = true
        rings.spawn('gelombang', st.x, gy, st.z, 3, 18, 0.8)
        for (let i = 0; i < 36; i++) {
          const an = Math.random() * Math.PI * 2
          fx.emit(st.x + Math.cos(an) * 3, gy + 0.4, st.z + Math.sin(an) * 3, Math.cos(an) * 10, 1.2, Math.sin(an) * 10, 1.1, 1.2, 3.5, 0.05, 1.5)
        }
        const d = Math.hypot(p.x - st.x, p.z - st.z)
        if (d < 13) hurt(player, 4, { x: st.x, z: st.z }, 11 - d * 0.5)
        event('terbang')
      }
      if (a.t > 2.0) {
        a.phase = 'layang'
        a.t = 0
        a.orbit = Math.atan2(st.x - A.x, st.z - A.z)
      }
    } else if (a.phase === 'layang') {
      // berputar pelan mengelilingi tengah ruang, selalu menghadap pemain; menyembur sekali dari udara
      flapPhase += dt * 6.5
      flap = Math.sin(flapPhase) * 0.6
      a.orbit += dt * 0.35
      const tx = A.x + Math.sin(a.orbit) * 7.5
      const tz = A.z + Math.cos(a.orbit) * 7.5
      st.x += (tx - st.x) * (1 - Math.exp(-1.5 * dt))
      st.z += (tz - st.z) * (1 - Math.exp(-1.5 * dt))
      st.flyY = FLY_Y + Math.sin(flapPhase) * 0.35
      turnToward(p, dt, 1.2)
      tgt.tuck = 1
      tgt.spread = 1
      if (a.t > 1.2 && !a.breathDone) {
        a.b = a.b || { name: 'hembus', t: 0 }
        a.b.t += dt
        breath(dt, player, a.b, true)
        if (a.b.done) a.breathDone = true
      } else {
        tgt.neckLift = 0.2
        tgt.headPitch = 0.25
        tgt.jaw = 0
      }
      if (a.breathDone && a.t > 5.5) {
        a.phase = 'turun'
        a.t = 0
        // mendarat di dekat pemain (tetap di arena)
        const dx = p.x - A.x
        const dz = p.z - A.z
        const d = Math.hypot(dx, dz) || 1
        const r = Math.min(A.r, d)
        a.land = { x: A.x + (dx / d) * r * 0.9, z: A.z + (dz / d) * r * 0.9, x0: st.x, z0: st.z, y0: st.flyY }
      }
    } else if (a.phase === 'turun') {
      flapPhase += dt * 8
      flap = Math.sin(flapPhase) * 0.5 * (1 - smoothstep(0.7, 1.2, a.t))
      const k = smoothstep(0, 1.15, a.t)
      st.x = a.land.x0 + (a.land.x - a.land.x0) * k
      st.z = a.land.z0 + (a.land.z - a.land.z0) * k
      st.flyY = a.land.y0 * (1 - k * k)
      turnToward(p, dt, 1)
      tgt.tuck = 1 - smoothstep(0.5, 1.1, a.t)
      tgt.neckLift = 0.3
      if (a.t > 1.15 && !a.slam) {
        a.slam = true
        st.flyY = 0
        flap = 0
        const y = ground.heightAt(st.x, st.z)
        rings.spawn('gelombang', st.x, y, st.z, 2, SK.hentak.r + 4, 0.7)
        for (let i = 0; i < 8; i++) {
          const an = (i / 8) * Math.PI * 2
          const x = st.x + Math.cos(an) * 4.4
          const z = st.z + Math.sin(an) * 4.4
          if (Math.hypot(x - plan.room.x, z - plan.room.z) < plan.room.r - 1.5) eruption(x, ground.heightAt(x, z), z, 0.55)
        }
        const d = Math.hypot(p.x - st.x, p.z - st.z)
        if (d < SK.hentak.r && playerY(player) < y + 3) hurt(player, SK.hentak.dmg, { x: st.x, z: st.z }, SK.hentak.push)
        event('hentak')
      }
      if (a.t > 1.15) {
        tgt.spread = 0.15
        tgt.crouch = a.t < 1.5 ? 0.6 : 0
      }
      if (a.t > 1.9) a.done = true
    }
  }

  // --- pose: sasaran → sekarang (dihaluskan), lalu ke rangka
  function applyPose(dt) {
    const k = 1 - Math.exp(-SMOOTH * dt)
    const kf = 1 - Math.exp(-SMOOTH * 2.2 * dt)
    for (const key of Object.keys(cur)) {
      const fast = key === 'jaw' || key === 'tailSwing' || key === 'neckLift' || key === 'headPitch'
      cur[key] += (tgt[key] - cur[key]) * (fast ? kf : k)
    }
    st.gaitS = (st.gaitS || 0) + (st.gait - (st.gaitS || 0)) * k
    model.pose({ ...cur, t: elapsed, gait: st.gaitS, phase: st.phase, flap })
    uniforms.uTime.value = elapsed
    uniforms.uEyes.value = eyes
    uniforms.uFlash.value = flash
    uniforms.uBreathGlow.value = breathGlow
  }

  function resetTargets() {
    Object.assign(tgt, { rear: 0, crouch: 0, tuck: 0, neckLift: 0, neckYaw: 0, headPitch: 0, jaw: 0, tailSwing: 0, tailLift: 0, wingRaise: 0, bend: 0 })
  }

  function setState(s) {
    st.state = s
    st.t = 0
    st.act = null
  }

  function wake(reason) {
    if (st.state !== 'tidur' && st.state !== 'rebah') return
    setState('bangun')
    event('bangun', { reason })
  }

  // --- satu bingkai
  function update(dt0, { player, inCave = true, pixelScale = 600 }) {
    const p = player.position
    const far = Math.hypot(p.x - plan.x, p.z - plan.z)
    // jauh dari sarang: tidak digambar, tidak dihitung (kecuali sedang pulih dari kalah)
    visible = far < 150
    group.visible = visible
    if (st.state === 'kalah') {
      st.deadT += dt0
      if (st.deadT > 240 && far > 70) revive()
    }
    if (!visible) {
      // tak terlihat (pemain jauh, mis. bangun di luar gua setelah kalah): langsung kembali tidur di sarang
      if (st.state !== 'tidur' && st.state !== 'kalah') goHome()
      return
    }
    const dt = Math.min(dt0, 0.1)
    elapsed += dt
    st.t += dt
    for (const n of Object.keys(st.cd)) st.cd[n] = Math.max(0, st.cd[n] - dt)
    flash = Math.max(0, flash - dt * 3)
    fx.uniforms.uScale.value = pixelScale
    st.gait = 0
    flap *= Math.exp(-3 * dt)

    refreshBody()
    const rel = relation(player)
    const intruder = !st.calm && !player.defeated && inCave && rel.fromCenter < plan.bangun && p.y > plan.room.y - 4 && p.y < plan.room.y + 14
    const gone = player.defeated || !inCave || rel.fromCenter > plan.lepas

    switch (st.state) {
      case 'tidur': {
        tgt.sleep = 1
        eyes = 0.12 + 0.05 * Math.sin(elapsed * 0.7)
        st.hp = Math.min(NAGA_HP, st.hp + dt * 25)
        if (intruder) wake('masuk')
        break
      }
      case 'bangun': {
        // bangkit dari tidur, menoleh ke penyusup, lalu mengaum
        tgt.sleep = 0
        eyes = Math.min(1, eyes + dt * 1.5)
        if (st.t > 1.3) {
          if (!st.act) start('aum', { first: true })
          runAct(dt, player, rel)
          if (st.act?.done) {
            setState('tarung')
            st.idle = 0.6
            st.fightT = 0
          }
        }
        break
      }
      case 'tarung': {
        tgt.sleep = 0
        eyes = 1
        st.fightT += dt
        if (gone) {
          setState('pulang')
          resetTargets()
          event('pulang', { kalahPemain: player.defeated })
          break
        }
        if (!st.enraged && st.hp < NAGA_HP * 0.5) st.enraged = true
        if (st.act) {
          runAct(dt, player, rel)
          if (st.act.done) {
            st.act = null
            resetTargets()
            tgt.spread = 0.15
            st.idle = st.enraged ? 0.25 : 0.55
          }
        } else if ((st.idle -= dt) <= 0 && !st.calm) decide(player, rel)
        else {
          turnToward(p, dt, 0.6)
          tgt.neckYaw = clamp(rel.ang, -0.6, 0.6)
          tgt.spread = 0.15
        }
        break
      }
      case 'pulang': {
        // kembali ke tempat tidur, lalu berbaring
        eyes = 1
        breathGlow = 0
        st.flyY = Math.max(0, st.flyY - dt * 6)
        tgt.tuck = 0
        tgt.spread = 0
        const home = { x: plan.x, z: plan.z }
        const d = Math.hypot(home.x - st.x, home.z - st.z)
        if (intruder && st.t > 2 && !player.defeated) {
          setState('tarung')
          st.idle = 0.3
          break
        }
        if (d > 0.6) {
          // maju hanya sejauh sudah menghadap tujuannya (tidak berputar-putar mengelilingi titik tujuan)
          const err = turnToward(home, dt, SPEED.putar)
          advance(Math.min(SPEED.jalan, d * 1.5 + 0.5) * Math.max(0, Math.cos(err)), dt)
          st.gait = 1
          if (d < 1.2) {
            st.x += (home.x - st.x) * Math.min(1, dt * 2)
            st.z += (home.z - st.z) * Math.min(1, dt * 2)
          }
        } else {
          const want = wrapAngle(plan.rot - st.heading)
          st.heading = wrapAngle(st.heading + clamp(want, -dt, dt))
          if (Math.abs(want) < 0.05) setState('rebah')
          else {
            st.gait = 1
            st.phase += dt * 1.6
          }
        }
        break
      }
      case 'rebah': {
        tgt.sleep = 1
        eyes = Math.max(0.12, eyes - dt * 0.4)
        st.hp = Math.min(NAGA_HP, st.hp + dt * 25)
        if (intruder && !player.defeated) wake('masuk')
        else if (st.t > 2.5) {
          setState('tidur')
          st.enraged = false
          st.roaredRage = false
        }
        break
      }
      case 'kalah': {
        tgt.dead = 1
        tgt.sleep = 0
        eyes = Math.max(0, eyes - dt * 0.8)
        breathGlow = 0
        st.flyY = Math.max(0, st.flyY - dt * 9)
        break
      }
      default:
        break
    }
    if (st.state !== 'kalah') tgt.dead = 0

    applyPose(dt)
    const gy = ground.heightAt(st.x, st.z)
    model.object.position.set(st.x, gy + st.flyY, st.z)
    model.object.rotation.y = st.heading
    shadow.position.set(st.x, gy + 0.06, st.z)
    shadow.rotation.y = st.heading
    shadow.scale.set(8 * S + st.flyY * 0.4, 1, 17 * S + st.flyY * 0.6)
    shadow.material.opacity = 0.5 * (1 - Math.min(0.6, st.flyY / 22))
    refreshBody()
    pushOut(p)
    fx.update(dt)
    spikes.update(dt)
    rings.update(dt)
  }

  // --- pemain tidak bisa menembus badan naga
  function pushOut(pos) {
    if (!visible || st.flyY > 3) return
    for (const h of HIT) {
      if (h.name === 'neck2' || h.name === 'neck4' || h.name === 'head') continue
      if (pos.y > h.p.y + h.r * 0.6 || pos.y < h.p.y - h.r - 2.2) continue
      const dx = pos.x - h.p.x
      const dz = pos.z - h.p.z
      const d = Math.hypot(dx, dz)
      const min = h.r * 0.85 + 0.45
      if (d < min && d > 1e-4) {
        pos.x = h.p.x + (dx / d) * min
        pos.z = h.p.z + (dz / d) * min
      }
    }
  }

  // --- serangan pemain: lingkaran (x, z, r) setinggi y → titik kena untuk efek; membangunkan naga
  function hit(shape, damage, knock, from, y) {
    if (!visible || st.state === 'kalah') return []
    const out = []
    for (const h of HIT) {
      const d = Math.hypot(shape.x - h.p.x, shape.z - h.p.z)
      if (d > shape.r + h.r * 0.95) continue
      if (y !== undefined && (y < h.p.y - h.r - 1.6 || y > h.p.y + h.r + 1.2)) continue
      out.push({ x: h.p.x + (shape.x - h.p.x) * 0.5, y: Math.max(h.p.y - h.r * 0.5, (y ?? h.p.y)), z: h.p.z + (shape.z - h.p.z) * 0.5 })
      break
    }
    if (out.length) damageBy(damage * (st.state === 'tidur' || st.state === 'rebah' ? 2 : 1))
    return out
  }
  function damageBy(amount) {
    if (st.state === 'kalah') return
    st.hp = Math.max(0, st.hp - amount)
    flash = 0.55
    st.lastHit = elapsed
    if (st.state === 'tidur' || st.state === 'rebah' || st.state === 'pulang')
      if (st.state === 'pulang') setState('tarung')
      else wake('dipukul')

    if (st.hp <= 0) defeat()
  }
  function defeat() {
    setState('kalah')
    st.deadT = 0
    st.flyY = Math.min(st.flyY, 6)
    resetTargets()
    tgt.spread = 0.6
    breathGlow = 0
    const wasSealed = st.sealed
    st.sealed = false
    if (seal && seal.group.visible) {
      // segel es pecah
      const c = seal.group.position
      for (let i = 0; i < 60; i++) {
        const an = Math.random() * Math.PI * 2
        fx.emit(c.x, c.y + 1, c.z, Math.cos(an) * 6, 3 + Math.random() * 5, Math.sin(an) * 6, 1, 0.4, 1.4, 0.1, 1.5, 8)
      }
      seal.group.visible = false
    }
    event('kalah', { segel: wasSealed })
  }
  function goHome() {
    st.x = plan.x
    st.z = plan.z
    st.heading = plan.rot
    st.flyY = 0
    st.hp = NAGA_HP
    st.enraged = false
    st.roaredRage = false
    breathGlow = 0
    resetTargets()
    Object.assign(cur, { sleep: 1, spread: 0 })
    tgt.sleep = 1
    tgt.spread = 0
    setState('tidur')
  }
  function revive() {
    st.hp = NAGA_HP
    st.x = plan.x
    st.z = plan.z
    st.heading = plan.rot
    st.flyY = 0
    st.enraged = false
    st.roaredRage = false
    st.cd = { gigit: 0, ekor: 0, hembus: 3, ledak: 5, terbang: 14 }
    resetTargets()
    Object.assign(cur, { dead: 0, sleep: 1, spread: 0 })
    tgt.dead = 0
    tgt.sleep = 1
    setState('tidur')
    event('pulih')
  }

  return {
    object: group,
    get state() {
      return st.state
    },
    get hp() {
      return st.hp
    },
    maxHp: NAGA_HP,
    // sedang menghadang pemain (untuk bilah nyawa di layar)
    get fighting() {
      return visible && (st.state === 'bangun' || st.state === 'tarung')
    },
    get sealed() {
      return st.sealed
    },
    get position() {
      return { x: st.x, y: ground.heightAt(st.x, st.z) + st.flyY, z: st.z }
    },
    get flying() {
      return st.flyY > 1
    },
    get act() {
      return st.act?.name ?? null
    },
    chestId: plan.chest,
    exit: plan.exit,
    stats: { triangles: model.triangles, bones: bones.length },
    update,
    pushOut,
    hit,
    // jurus Penggal: naga tidak bisa dipenggal — luka berat sekali tebas
    target(x, z, range) {
      if (!visible || st.state === 'kalah') return null
      const c = chestPos()
      return Math.hypot(c.x - x, c.z - z) <= range + 2 ? { id: 'n0', x: c.x, z: c.z } : null
    },
    targetPos() {
      const c = chestPos()
      return st.state === 'kalah' ? null : { x: c.x, z: c.z }
    },
    execute() {
      if (st.state === 'kalah') return null
      const c = chestPos()
      damageBy(24)
      return { x: c.x, y: c.y, z: c.z }
    },
    // pemain roboh saat bertarung dengan naga? (main.js: bangun di luar mulut gua)
    playerDefeated() {
      return visible && (st.state === 'tarung' || st.state === 'bangun' || st.state === 'pulang')
    },
    unsealIfOpened() {
      st.sealed = false
      if (seal) seal.group.visible = false
    },
    onEvent(fn) {
      onEvent = fn
    },
    // uji otomatis / debug
    debug: {
      paksa(name) {
        if (st.state !== 'tarung') return false
        st.act = null
        resetTargets()
        start(name, name === 'terbang' ? { phase: 'naik' } : name === 'ekor' ? { side: 1 } : {})
        return true
      },
      setHp(v) {
        st.hp = clamp(v, 1, NAGA_HP)
      },
      bangunkan() {
        wake('debug')
      },
      tenang(on) {
        // bekukan AI (untuk uji lain yang lewat di dekat sarang)
        st.calm = on
      },
      get cur() {
        return { ...cur, flyY: st.flyY, x: st.x, z: st.z, heading: st.heading }
      },
      particles: () => fx.points.geometry.attributes.aAlpha.array.filter(a => a > 0).length,
      spikes: () => spikes.mesh.visible,
    },
  }
}
