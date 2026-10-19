import * as THREE from 'three'

// Efek pukulan pedang, dibuat agar terbaca dari kamera atas:
// - sabetan: busur putih berbentuk bulan sabit di depan prajurit, menyapu dari kanan ke kiri
//   lalu memudar (selalu muncul saat bilah sampai di depan)
// - serpihan: kepingan kayu + daun (batang pohon) atau debu + percikan (batu) saat bilah mengenai
// Ringan: 1 mesh busur + 1 InstancedMesh (maks. 40 keping), tanpa bayangan.
const SLASH_TIME = 0.22 // detik
const SLASH_ARC = Math.PI * 0.85 // ±150°
const MAX_CHIPS = 40
const GRAVITY = 12
const COLORS = {
  pohon: ['#6b4423', '#8a5a2e', '#a8743f', '#4f8f2f', '#6fb03a'],
  batu: ['#7d7a74', '#a19d96', '#c9c5bd', '#ffd27a'],
}

// bulan sabit datar (bidang XZ), ujung-ujungnya menipis & transparan; tengahnya di arah +z
function slashGeometry(radius, width, segments) {
  const pos = []
  const col = []
  const idx = []
  for (let i = 0; i <= segments; i++) {
    const u = i / segments
    const a = -SLASH_ARC / 2 + SLASH_ARC * u
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

export function createSwingEffects() {
  const group = new THREE.Group()
  group.name = 'efek-pukulan'

  // --- sabetan
  const slashMat = new THREE.MeshBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
  })
  const slash = new THREE.Mesh(slashGeometry(1.35, 0.6, 32), slashMat)
  slash.visible = false
  slash.renderOrder = 8
  group.add(slash)
  let slashT = 0
  let slashHeading = 0

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

  const stats = { slashes: 0, bursts: 0, lastKind: null }

  return {
    object: group,
    stats: () => ({ ...stats, alive }),
    // busur sabetan di (x, y, z) menghadap `heading`
    slash(x, y, z, heading) {
      slash.position.set(x, y, z)
      slashHeading = heading
      slashT = 0
      slash.visible = true
      stats.slashes++
    },
    // serpihan di titik kena (x, y, z), terlempar ke arah (dirX, dirZ) = ke sisi prajurit;
    // floor = tinggi tanah (keping berhenti di sana)
    burst(x, y, z, kind, dirX, dirZ, floor) {
      const palette = COLORS[kind] || COLORS.batu
      const n = kind === 'batu' ? 12 : 16
      const base = Math.atan2(dirX, dirZ)
      for (let i = 0; i < n; i++) {
        const c = pool[next]
        c.alive = true
        c.t = 0
        c.life = 0.45 + Math.random() * 0.4
        c.size = 0.6 + Math.random() * 0.7
        c.spin = (Math.random() - 0.5) * 24
        c.floor = floor
        const a = base + (Math.random() - 0.5) * 2.4
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
    },
    update(dt) {
      if (slash.visible) {
        slashT += dt
        const k = slashT / SLASH_TIME
        if (k >= 1) slash.visible = false
        else {
          // menyapu dari kanan prajurit ke kiri sambil melebar dan memudar
          slash.rotation.y = slashHeading + (k - 0.5) * 0.9
          slash.scale.setScalar(0.85 + 0.3 * k)
          slashMat.opacity = 0.95 * Math.pow(1 - k, 1.3)
        }
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
