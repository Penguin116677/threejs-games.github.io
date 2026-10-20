import * as THREE from 'three'

// Efek serangan prajurit, dibuat agar terbaca dari kamera atas (satu efek khas per gerakan):
// - tebasan & cincangan: busur putih bulan sabit di depan prajurit (arah sapuan bergantian)
// - tinju: letupan cincin putih kecil; tendangan: cincin hangat + debu setinggi kaki
// - Putar: pusaran putih hampir satu lingkaran di sekeliling prajurit
// - Hentak: retakan tanah di titik pedang menancap + gelombang kejut + debu ke segala arah
// - Penggal: jejak kilat zig-zag melewati para sasaran, lalu garis potongan di tiap leher
// - serpihan saat mengenai: kayu + daun (batang pohon) atau debu + percikan (batu);
//   percikan cahaya saat mengenai musuh
// Ringan: beberapa mesh datar dari kolam (pool) + 1 InstancedMesh (maks. 60 keping), tanpa bayangan.
const MAX_CHIPS = 60
const GRAVITY = 12
const COLORS = {
  pohon: ['#6b4423', '#8a5a2e', '#a8743f', '#4f8f2f', '#6fb03a'],
  batu: ['#7d7a74', '#a19d96', '#c9c5bd', '#ffd27a'],
  debu: ['#d8c497', '#c4ab7a', '#a88f63', '#e6d8b0'],
  bata: ['#9c4a30', '#b8603c', '#7e3a26', '#d9b48a'],
  kayu: ['#6b4423', '#8a5a2e', '#a8743f', '#c99a5f'],
  // perisai & zirah prajurit: percikan logam
  prajurit: ['#c9cfdc', '#eef1f7', '#ffd27a', '#8a5a2e'],
}

const effectMaterial = (opts = {}) => new THREE.MeshBasicMaterial({
  transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, toneMapped: false, ...opts,
})

// bulan sabit datar (bidang XZ) selebar `arc`, ujung-ujungnya menipis & transparan;
// tengahnya di arah +z (depan prajurit)
function crescentGeometry(arc, radius, width, segments) {
  const pos = []
  const col = []
  const idx = []
  for (let i = 0; i <= segments; i++) {
    const u = i / segments
    const a = -arc / 2 + arc * u
    const w = Math.sin(Math.PI * u) // 0 di ujung, 1 di tengah
    const inner = radius - width * w
    const alpha = Math.pow(w, 0.7)
    pos.push(Math.sin(a) * radius, 0, Math.cos(a) * radius, Math.sin(a) * inner, 0, Math.cos(a) * inner)
    col.push(1, 1, 1, alpha, 1, 1, 1, alpha * 0.15)
    if (i < segments) {
      const k = i * 2
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 4))
  geo.setIndex(idx)
  return geo
}

// cincin datar berjari-jari 1: tepi dalam transparan → tengah terang → tepi luar gelap tipis,
// jadi tetap terbaca di atas pasir yang terang maupun hutan yang gelap
function pulseGeometry(segments) {
  const rows = [[0.55, 1, 0], [0.84, 1, 1], [1, 0.12, 0.55]] // [jari-jari, kecerahan, alfa]
  const pos = []
  const col = []
  const idx = []
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2
    for (const [r, c, alpha] of rows) {
      pos.push(Math.sin(a) * r, 0, Math.cos(a) * r)
      col.push(c, c, c, alpha)
    }
    if (i < segments)
      for (let k = 0; k < rows.length - 1; k++) {
        const v = i * rows.length + k
        const n = v + rows.length
        idx.push(v, n, v + 1, v + 1, n, n + 1)
      }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 4))
  geo.setIndex(idx)
  return geo
}

// jejak lesatan: persegi panjang datar dari z = 0 (ekor, transparan) ke z = 1 (kepala, terang)
function streakGeometry() {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, 0, 0, 0.5, 0, 0, -0.5, 0, 1, 0.5, 0, 1], 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute([1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0.9, 1, 1, 1, 0.9], 4))
  geo.setIndex([0, 1, 2, 1, 3, 2])
  return geo
}

// garis potong leher: batang tipis datar sepanjang sumbu x, ujung-ujungnya memudar
function cutGeometry() {
  const pos = []
  const col = []
  const idx = []
  const n = 8
  for (let i = 0; i <= n; i++) {
    const u = i / n
    const a = Math.sin(Math.PI * u)
    pos.push(u - 0.5, 0, -0.04, u - 0.5, 0, 0.04)
    col.push(1, 1, 1, a, 1, 1, 1, a)
    if (i < n) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 4))
  geo.setIndex(idx)
  return geo
}

const CRACKS = 9 // jumlah retakan dari titik pedang menancap

// cincin datar (bidang XZ) → bidang XY, agar bisa dihadapkan ke kamera
const LIE_UP = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)

// ground: untuk tinggi tanah (serpihan & retakan mengikuti tanah)
export function createSwingEffects(ground) {
  const group = new THREE.Group()
  group.name = 'efek-serangan'
  const stats = { slashes: 0, spins: 0, pulses: 0, streaks: 0, bursts: 0, cracks: 0, cuts: 0, sparks: 0, lastKind: null, lastMove: null }

  // --- sapuan bulan sabit yang berputar sedikit, melebar, lalu memudar (kolam beberapa mesh,
  //     karena cincangan datang lebih cepat dari umur satu sapuan)
  function sweeps(count, arc, radius, width, time, turn) {
    const geo = crescentGeometry(arc, radius, width, 40)
    const items = Array.from({ length: count }, () => {
      const mat = effectMaterial({ vertexColors: true })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.visible = false
      mesh.renderOrder = 8
      group.add(mesh)
      return { mesh, mat, t: 0, heading: 0, dir: 1, tilt: 0 }
    })
    let next = 0
    return {
      // dir = arah sapuan: 1 dari kanan ke kiri, -1 sebaliknya; tilt = kemiringan bidang sapuan
      show(x, y, z, heading, dir = 1, tilt = 0) {
        const s = items[next]
        next = (next + 1) % count
        s.mesh.position.set(x, y, z)
        Object.assign(s, { t: 0, heading, dir, tilt })
        s.mesh.visible = true
      },
      update(dt) {
        for (const s of items) {
          if (!s.mesh.visible) continue
          s.t += dt
          const k = s.t / time
          if (k >= 1) {
            s.mesh.visible = false
            continue
          }
          s.mesh.rotation.set(s.tilt, s.heading + (k - 0.5) * turn * s.dir, 0, 'YXZ')
          s.mesh.scale.setScalar(0.85 + 0.3 * k)
          s.mat.opacity = 0.95 * Math.pow(1 - k, 1.3)
        }
      },
    }
  }
  const slashFx = sweeps(4, Math.PI * 0.85, 1.35, 0.6, 0.22, 0.9)
  const spinFx = sweeps(1, Math.PI * 1.85, 2.3, 1.0, 0.34, 2.6)

  // --- cincin yang melebar (tinju, tendangan, gelombang kejut, percikan saat mengenai musuh)
  const ringGeo = pulseGeometry(48)
  const rings = Array.from({ length: 12 }, () => {
    const mat = effectMaterial({ vertexColors: true })
    const mesh = new THREE.Mesh(ringGeo, mat)
    mesh.visible = false
    mesh.renderOrder = 8
    group.add(mesh)
    return { mesh, mat, t: 0, time: 1, r0: 0, r1: 1, alpha: 1 }
  })
  let nextRing = 0
  // face = menghadap kamera (percikan di badan musuh), selain itu mendatar
  function pulse(x, y, z, r0, r1, time, colorHex, alpha, face = null) {
    const r = rings[nextRing]
    nextRing = (nextRing + 1) % rings.length
    r.mesh.position.set(x, y, z)
    if (face) r.mesh.quaternion.copy(face).multiply(LIE_UP)
    else r.mesh.quaternion.identity()
    r.mat.color.set(colorHex)
    Object.assign(r, { t: 0, time, r0, r1, alpha })
    r.mesh.scale.setScalar(r0)
    r.mesh.visible = true
    stats.pulses++
  }

  // --- jejak kilat (Penggal): satu persegi panjang per ruas jalur
  const streakGeo = streakGeometry()
  const streaks = Array.from({ length: 7 }, () => {
    const mat = effectMaterial({ vertexColors: true })
    const mesh = new THREE.Mesh(streakGeo, mat)
    mesh.visible = false
    mesh.renderOrder = 7
    group.add(mesh)
    return { mesh, mat, t: 0 }
  })
  const STREAK_TIME = 0.5

  // --- retakan tanah (Hentak): garis-garis gelap memancar, mengikuti tinggi tanah
  const cracks = Array.from({ length: 2 }, () => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(CRACKS * 9), 3))
    const mat = new THREE.MeshBasicMaterial({ color: '#2b1d12', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.visible = false
    mesh.frustumCulled = false
    mesh.renderOrder = 6
    group.add(mesh)
    return { mesh, mat, t: 0 }
  })
  let nextCrack = 0
  const CRACK_TIME = 1.6
  function crack(x, z) {
    const c = cracks[nextCrack]
    nextCrack = (nextCrack + 1) % cracks.length
    const p = c.mesh.geometry.attributes.position
    const lift = 0.05
    for (let i = 0; i < CRACKS; i++) {
      // tiap retakan = segitiga tipis dari dekat pusat ke ujung acak
      const a = (i / CRACKS) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
      const len = 1.3 + Math.random() * 1.6
      const w = 0.07 + Math.random() * 0.05
      const bx = x + Math.sin(a) * 0.15
      const bz = z + Math.cos(a) * 0.15
      const pts = [
        [bx + Math.cos(a) * w, bz - Math.sin(a) * w],
        [bx - Math.cos(a) * w, bz + Math.sin(a) * w],
        [x + Math.sin(a) * len, z + Math.cos(a) * len],
      ]
      pts.forEach(([px, pz], k) => p.setXYZ(i * 3 + k, px, Math.max(ground.surfaceAt(px, pz), 0) + lift, pz))
    }
    p.needsUpdate = true
    c.t = 0
    c.mesh.visible = true
    stats.cracks++
  }

  // --- garis potong leher (Penggal)
  const cutGeo = cutGeometry()
  const cuts = Array.from({ length: 5 }, () => {
    const mat = effectMaterial({ vertexColors: true, depthTest: false })
    const mesh = new THREE.Mesh(cutGeo, mat)
    mesh.visible = false
    mesh.renderOrder = 14
    group.add(mesh)
    return { mesh, mat, t: 0 }
  })
  let nextCut = 0
  const CUT_TIME = 0.4

  // --- serpihan
  const chips = new THREE.InstancedMesh(new THREE.BoxGeometry(0.21, 0.21, 0.21), new THREE.MeshBasicMaterial(), MAX_CHIPS)
  chips.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  chips.frustumCulled = false // keping bergerak; bounding sphere bawaan tidak berlaku
  chips.visible = false
  group.add(chips)
  const pool = Array.from({ length: MAX_CHIPS }, () => ({
    alive: false, t: 0, life: 1, size: 1, spin: 1, floor: 0, p: new THREE.Vector3(), v: new THREE.Vector3(),
  }))
  const dummy = new THREE.Object3D()
  const color = new THREE.Color()
  const hidden = new THREE.Matrix4().makeScale(0, 0, 0)
  for (let i = 0; i < MAX_CHIPS; i++) {
    chips.setMatrixAt(i, hidden)
    chips.setColorAt(i, color.set('#ffffff'))
  }
  let next = 0
  let alive = 0

  // n keping dari (x, y, z); dir = arah lemparan (radian) dengan sebaran `spread`,
  // atau null = ke segala arah
  function burst(x, y, z, kind, n, dir, spread, floor) {
    const palette = COLORS[kind] || COLORS.batu
    for (let i = 0; i < n; i++) {
      const c = pool[next]
      c.alive = true
      c.t = 0
      c.life = 0.45 + Math.random() * 0.4
      c.size = 0.6 + Math.random() * 0.7
      c.spin = (Math.random() - 0.5) * 24
      c.floor = floor
      const a = dir === null ? Math.random() * Math.PI * 2 : dir + (Math.random() - 0.5) * spread
      const sp = 1.5 + Math.random() * 3
      c.p.set(x, y, z)
      c.v.set(Math.sin(a) * sp, 1.5 + Math.random() * 3.5, Math.cos(a) * sp)
      chips.setColorAt(next, color.set(palette[i % palette.length]))
      next = (next + 1) % MAX_CHIPS
    }
    chips.instanceColor.needsUpdate = true
    chips.visible = true
    stats.bursts++
    stats.lastKind = kind
  }

  // serpihan dari permukaan batang/batu yang menghadap prajurit (ox, oz)
  function chipsFrom(target, ox, oz, y, n) {
    const dx = ox - target.x
    const dz = oz - target.z
    const d = Math.hypot(dx, dz) || 1
    const x = target.x + (dx / d) * target.radius
    const z = target.z + (dz / d) * target.radius
    burst(x, y, z, target.kind, n, Math.atan2(dx, dz), 2.4, ground.surfaceAt(x, z))
  }

  let camQuat = new THREE.Quaternion()

  return {
    object: group,
    stats: () => ({ ...stats, alive }),
    // kejadian serangan dari player.onAttack (lihat combat.js);
    // trees = batang/batu yang kena, enemies = musuh yang kena ({ x, y, z })
    attack(ev, trees = [], enemies = []) {
      const o = ev.origin
      stats.lastMove = ev.move
      if (ev.type === 'dash') {
        // jejak kilat: satu ruas per sasaran yang dilewati, setinggi pinggang
        const pts = ev.path
        for (let i = 0; i + 1 < pts.length && i < streaks.length; i++) {
          const a = pts[i]
          const b = pts[i + 1]
          const len = Math.hypot(b.x - a.x, b.z - a.z)
          if (len < 0.3) continue
          const s = streaks[i]
          s.mesh.position.set(a.x, ev.y, a.z)
          s.mesh.rotation.y = Math.atan2(b.x - a.x, b.z - a.z)
          s.mesh.scale.set(0.7, 1, len)
          s.mesh.visible = true
          s.t = -i * 0.04 // ruas berikutnya memudar sedikit belakangan
        }
        stats.streaks++
        return
      }
      if (ev.type !== 'hit') return
      const { x, y, z } = ev
      let chipCount = 14
      if (ev.chop) {
        // cincangan: sapuan bergantian arah, sedikit miring acak
        slashFx.show(o.x, y, o.z, ev.heading, ev.swing, (Math.random() - 0.5) * 0.5)
        stats.slashes++
        chipCount = 6
      } else if (ev.move === 'tebas') {
        slashFx.show(o.x, y, o.z, ev.heading)
        stats.slashes++
      } else if (ev.move === 'tinju') {
        pulse(x, y, z, 0.15, 0.7, 0.2, '#ffffff', 1)
        chipCount = 8
      } else if (ev.move === 'tendang') {
        // cincin hangat setinggi kaki + kepulan debu dari tanah yang tersapu kaki
        pulse(x, y, z, 0.2, 0.95, 0.24, '#ffe3a0', 1)
        const gy = ground.surfaceAt(x, z)
        if (gy > -0.3) burst(x, Math.max(gy, 0) + 0.15, z, 'debu', 5, ev.heading, 1.6, gy)
        chipCount = 10
      } else if (ev.spin) {
        spinFx.show(o.x, y, o.z, ev.heading)
        stats.spins++
        chipCount = 10
      } else if (ev.plant) {
        // pedang menancap: retakan + kilatan di titik tancap, dua gelombang kejut, debu
        const gy = ground.surfaceAt(o.x, o.z)
        const wy = Math.max(gy, 0) + 0.08
        crack(ev.plant.x, ev.plant.z)
        pulse(ev.plant.x, wy + 0.05, ev.plant.z, 0.1, 1.2, 0.25, '#ffffff', 1)
        pulse(o.x, wy, o.z, 0.4, 4.0, 0.5, '#fff6dc', 0.9)
        pulse(o.x, wy + 0.02, o.z, 0.2, 2.5, 0.35, '#ffffff', 0.7)
        burst(ev.plant.x, wy + 0.1, ev.plant.z, 'debu', 16, null, 0, gy)
        chipCount = 8
      }
      for (const t of trees) chipsFrom(t, o.x, o.z, ev.plant ? y + 0.5 : y, chipCount)
      // musuh yang kena: percikan cahaya menghadap kamera di badannya
      for (const e of enemies) {
        pulse(e.x, e.y + 1.0, e.z, 0.1, 0.65, 0.16, '#fff3c0', 1, camQuat)
        stats.sparks++
      }
    },
    // garis potong di leher tiap musuh yang dipenggal (cuts: [{ x, y, z }]), dari arah prajurit
    execute(cutsAt, from) {
      for (const c of cutsAt) {
        const s = cuts[nextCut]
        nextCut = (nextCut + 1) % cuts.length
        s.mesh.position.set(c.x, c.y + 0.85, c.z)
        // garis tegak lurus arah dari prajurit, sedikit miring
        s.mesh.rotation.set(0, Math.atan2(c.x - from.x, c.z - from.z) + Math.PI / 2 + (Math.random() - 0.5) * 0.5, 0)
        s.t = 0
        s.mesh.visible = true
        pulse(c.x, c.y + 0.85, c.z, 0.1, 0.8, 0.2, '#ffffff', 1, camQuat)
        stats.cuts++
      }
    },
    update(dt, camera) {
      if (camera) camQuat = camera.quaternion
      slashFx.update(dt)
      spinFx.update(dt)
      for (const r of rings) {
        if (!r.mesh.visible) continue
        r.t += dt
        const k = r.t / r.time
        if (k >= 1) {
          r.mesh.visible = false
          continue
        }
        const e = 1 - Math.pow(1 - k, 3) // cepat di awal, melambat di akhir
        r.mesh.scale.setScalar(r.r0 + (r.r1 - r.r0) * e)
        r.mat.opacity = r.alpha * (1 - k)
      }
      for (const s of streaks) {
        if (!s.mesh.visible) continue
        s.t += dt
        const k = Math.max(0, s.t) / STREAK_TIME
        if (k >= 1) s.mesh.visible = false
        else s.mat.opacity = 0.95 * (1 - k)
      }
      for (const c of cracks) {
        if (!c.mesh.visible) continue
        c.t += dt
        const k = c.t / CRACK_TIME
        if (k >= 1) c.mesh.visible = false
        else c.mat.opacity = 0.75 * Math.min(1, (1 - k) * 2.5)
      }
      for (const s of cuts) {
        if (!s.mesh.visible) continue
        s.t += dt
        const k = s.t / CUT_TIME
        if (k >= 1) {
          s.mesh.visible = false
          continue
        }
        s.mesh.scale.set(0.5 + 1.1 * Math.min(1, k * 3), 1, 1 + 2 * (1 - k))
        s.mat.opacity = Math.min(1, (1 - k) * 2)
      }
      if (!chips.visible) return
      alive = 0
      for (let i = 0; i < MAX_CHIPS; i++) {
        const c = pool[i]
        if (!c.alive) continue
        c.t += dt
        if (c.t >= c.life) {
          c.alive = false
          chips.setMatrixAt(i, hidden)
          continue
        }
        alive++
        c.v.y -= GRAVITY * dt
        c.p.addScaledVector(c.v, dt)
        if (c.p.y < c.floor + 0.05) {
          // jatuh di tanah: berhenti meluncur
          c.p.y = c.floor + 0.05
          c.v.set(c.v.x * 0.5, 0, c.v.z * 0.5)
        }
        dummy.position.copy(c.p)
        dummy.rotation.set(c.t * c.spin, c.t * c.spin * 0.7, 0)
        dummy.scale.setScalar(c.size * (1 - Math.pow(c.t / c.life, 3)))
        dummy.updateMatrix()
        chips.setMatrixAt(i, dummy.matrix)
      }
      chips.instanceMatrix.needsUpdate = true
      if (!alive) chips.visible = false
    },
  }
}
