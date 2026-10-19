import * as THREE from 'three'

// Efek serangan prajurit, dibuat agar terbaca dari kamera atas (satu efek khas per gerakan):
// - tebasan / Serbuan: busur putih berbentuk bulan sabit di depan prajurit, menyapu lalu memudar
// - Tebasan Putar: pusaran putih hampir satu lingkaran di sekeliling prajurit
// - tinju: letupan cincin putih kecil di depan; tendangan: cincin debu pasir setinggi kaki
// - Serbuan: jejak lesatan (garis cahaya) dari titik awal ke titik akhir
// - Hentakan: gelombang kejut melebar di tanah + debu berhamburan ke segala arah
// - serpihan saat mengenai: kayu + daun (batang pohon) atau debu + percikan (batu)
// Ringan: beberapa mesh datar + 1 InstancedMesh (maks. 60 keping), tanpa bayangan.
const MAX_CHIPS = 60
const GRAVITY = 12
const COLORS = {
  pohon: ['#6b4423', '#8a5a2e', '#a8743f', '#4f8f2f', '#6fb03a'],
  batu: ['#7d7a74', '#a19d96', '#c9c5bd', '#ffd27a'],
  debu: ['#d8c497', '#c4ab7a', '#a88f63', '#e6d8b0'],
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

// ground: untuk tinggi tanah (serpihan berhenti di tanah)
export function createSwingEffects(ground) {
  const group = new THREE.Group()
  group.name = 'efek-serangan'
  const stats = { slashes: 0, spins: 0, pulses: 0, streaks: 0, bursts: 0, lastKind: null, lastMove: null }

  // --- sapuan (tebasan & putar): bulan sabit yang berputar sedikit, melebar, lalu memudar
  function sweep(arc, radius, width, time, turn) {
    const mat = effectMaterial({ vertexColors: true })
    const mesh = new THREE.Mesh(crescentGeometry(arc, radius, width, 40), mat)
    mesh.visible = false
    mesh.renderOrder = 8
    group.add(mesh)
    let t = 0
    let heading = 0
    return {
      show(x, y, z, h) {
        mesh.position.set(x, y, z)
        heading = h
        t = 0
        mesh.visible = true
      },
      update(dt) {
        if (!mesh.visible) return
        t += dt
        const k = t / time
        if (k >= 1) {
          mesh.visible = false
          return
        }
        // menyapu dari kanan prajurit ke kiri (searah ayunan tangan kanan)
        mesh.rotation.y = heading + (k - 0.5) * turn
        mesh.scale.setScalar(0.85 + 0.3 * k)
        mat.opacity = 0.95 * Math.pow(1 - k, 1.3)
      },
    }
  }
  const slashFx = sweep(Math.PI * 0.85, 1.35, 0.6, 0.22, 0.9)
  const spinFx = sweep(Math.PI * 1.85, 2.1, 0.95, 0.34, 2.6)

  // --- cincin yang melebar (tinju, tendangan, gelombang kejut Hentakan)
  const ringGeo = pulseGeometry(48)
  const rings = Array.from({ length: 4 }, () => {
    const mat = effectMaterial({ vertexColors: true })
    const mesh = new THREE.Mesh(ringGeo, mat)
    mesh.visible = false
    mesh.renderOrder = 8
    group.add(mesh)
    return { mesh, mat, t: 0, time: 1, r0: 0, r1: 1, alpha: 1 }
  })
  let nextRing = 0
  function pulse(x, y, z, r0, r1, time, colorHex, alpha) {
    const r = rings[nextRing]
    nextRing = (nextRing + 1) % rings.length
    r.mesh.position.set(x, y, z)
    r.mat.color.set(colorHex)
    Object.assign(r, { t: 0, time, r0, r1, alpha })
    r.mesh.scale.setScalar(r0)
    r.mesh.visible = true
    stats.pulses++
  }

  // --- jejak lesatan (Serbuan)
  const streakMat = effectMaterial({ vertexColors: true })
  const streak = new THREE.Mesh(streakGeometry(), streakMat)
  streak.visible = false
  streak.renderOrder = 7
  group.add(streak)
  let streakT = 0
  const STREAK_TIME = 0.35

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
    burst(x, y, z, target.kind, n, Math.atan2(dx, dz), 2.4, ground.heightAt(x, z))
  }

  return {
    object: group,
    stats: () => ({ ...stats, alive }),
    // kejadian serangan dari player.onAttack (lihat combat.js)
    attack(ev) {
      const { x, y, z, origin: o } = ev
      stats.lastMove = ev.move
      if (ev.type === 'dash') {
        // jejak lesatan dari titik awal ke titik akhir, setinggi pinggang
        const dx = x - ev.from.x
        const dz = z - ev.from.z
        const len = Math.hypot(dx, dz)
        if (len < 0.5) return
        streak.position.set(ev.from.x, y, ev.from.z)
        streak.rotation.y = Math.atan2(dx, dz)
        streak.scale.set(0.9, 1, len)
        streak.visible = true
        streakT = 0
        stats.streaks++
        return
      }
      let chipCount = 14
      if (ev.move === 'tebas' || ev.move === 'serbu') {
        slashFx.show(o.x, y, o.z, ev.heading)
        stats.slashes++
      } else if (ev.move === 'tinju') {
        pulse(x, y, z, 0.15, 0.7, 0.2, '#ffffff', 1)
        chipCount = 8
      } else if (ev.move === 'tendang') {
        // cincin hangat setinggi kaki + kepulan debu dari tanah yang tersapu kaki
        pulse(x, y, z, 0.2, 0.95, 0.24, '#ffe3a0', 1)
        const gy = ground.heightAt(x, z)
        if (gy > -0.3) burst(x, Math.max(gy, 0) + 0.15, z, 'debu', 5, ev.heading, 1.6, gy)
        chipCount = 10
      } else if (ev.move === 'putar') {
        spinFx.show(o.x, y, o.z, ev.heading)
        stats.spins++
        chipCount = 10
      } else if (ev.move === 'hentak') {
        // dua cincin gelombang kejut + debu ke segala arah
        const gy = ground.heightAt(o.x, o.z)
        const wy = Math.max(gy, 0) + 0.08
        pulse(o.x, wy, o.z, 0.4, 3.6, 0.45, '#fff6dc', 0.9)
        pulse(o.x, wy + 0.02, o.z, 0.2, 2.2, 0.32, '#ffffff', 0.7)
        burst(o.x, wy + 0.1, o.z, 'debu', 14, null, 0, gy)
        chipCount = 8
      }
      for (const t of ev.targets) chipsFrom(t, o.x, o.z, ev.move === 'hentak' ? y + 0.5 : y, chipCount)
    },
    update(dt) {
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
      if (streak.visible) {
        streakT += dt
        const k = streakT / STREAK_TIME
        if (k >= 1) streak.visible = false
        else streakMat.opacity = 0.9 * (1 - k)
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
