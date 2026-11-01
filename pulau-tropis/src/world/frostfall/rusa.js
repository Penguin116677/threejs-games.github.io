import * as THREE from 'three'
import { rng } from '../../core/random.js'
import { HERDS } from './layout.js'

// Rusa kutub di Hutan Pinus Salju (v0.22.0): beberapa kawanan yang merumput, berjalan pelan di wilayah
// jelajahnya, dan berlari menjauh bila pemain / pemburu mendekat. Pemburu Kampung Rusa Putih memanah
// salah satunya (roboh), memikulnya pulang berdua, lalu rusa itu muncul lagi di kawanannya sehari
// kemudian. Satu InstancedMesh untuk semua rusa; kaki berayun & kepala menunduk (merumput) diatur
// shader per titik (bagian badan + titik putarnya), bukan rangka.

const PART = { badan: 0, kaki: [1, 2, 3, 4], kepala: 5 }
const SPEED = { jalan: 1.0, kabur: 6.5 }
const FLEE_R = 16 // m: pemain / pemburu yang berdiri sedekat ini membuat rusa kabur
const RESPAWN = 1440 // detik nyata (±1 hari Frostfall)

function deerGeometry() {
  const pos = []
  const nor = []
  const col = []
  const part = []
  const pivot = []
  const c = new THREE.Color()
  const push = (geo, color, p, pv) => {
    const g = geo.index ? geo.toNonIndexed() : geo
    c.set(color)
    const P = g.attributes.position
    const N = g.attributes.normal
    for (let i = 0; i < P.count; i++) {
      pos.push(P.getX(i), P.getY(i), P.getZ(i))
      nor.push(N.getX(i), N.getY(i), N.getZ(i))
      const k = 0.85 + 0.2 * Math.min(1, Math.max(0, P.getY(i) / 1.6))
      col.push(c.r * k, c.g * k, c.b * k)
      part.push(p)
      pivot.push(...pv)
    }
  }
  const B = (w, h, d, x, y, z) => new THREE.BoxGeometry(w, h, d).translate(x, y, z)
  const CY = (r0, r1, h, x, y, z) => new THREE.CylinderGeometry(r0, r1, h, 6).translate(x, y, z)
  const coat = '#94785a'
  const pale = '#e9e0cf'
  const dark = '#3b3027'
  // badan (menghadap +z), perut pucat, ekor & bokong putih
  push(B(0.5, 0.48, 1.25, 0, 1.05, 0), coat, PART.badan, [0, 0, 0])
  push(B(0.42, 0.12, 1.0, 0, 0.8, 0), pale, PART.badan, [0, 0, 0])
  push(B(0.3, 0.3, 0.08, 0, 1.1, -0.64), pale, PART.badan, [0, 0, 0])
  // surai pucat di leher depan
  push(B(0.34, 0.3, 0.2, 0, 1.05, 0.62), pale, PART.badan, [0, 0, 0])
  // kaki: pangkal di badan, berayun di pangkalnya
  const legs = [[0.17, 0.5], [-0.17, 0.5], [0.17, -0.48], [-0.17, -0.48]]
  legs.forEach(([x, z], i) => {
    push(B(0.12, 0.62, 0.13, x, 0.5, z), coat, PART.kaki[i], [x, 0.85, z])
    push(B(0.13, 0.16, 0.14, x, 0.08, z + 0.01), dark, PART.kaki[i], [x, 0.85, z])
  })
  // leher + kepala + tanduk: menunduk di pangkal leher
  const nv = [0, 1.18, 0.55]
  push(CY(0.13, 0.16, 0.55, 0, 1.38, 0.72).rotateX(0), coat, PART.kepala, nv)
  push(B(0.24, 0.24, 0.5, 0, 1.62, 0.9), coat, PART.kepala, nv)
  push(B(0.16, 0.14, 0.12, 0, 1.56, 1.16), dark, PART.kepala, nv)
  for (const s of [-1, 1]) {
    push(B(0.05, 0.12, 0.05, s * 0.13, 1.75, 0.82), pale, PART.kepala, nv)
    // tanduk bercabang
    push(CY(0.025, 0.035, 0.55, s * 0.2, 2.0, 0.78).rotateZ(0), pale, PART.kepala, nv)
    push(CY(0.02, 0.03, 0.4, 0, 0, 0).rotateZ(s * 0.9).translate(s * 0.36, 2.2, 0.76), pale, PART.kepala, nv)
    push(CY(0.018, 0.025, 0.32, 0, 0, 0).rotateX(0.8).translate(s * 0.22, 2.15, 0.95), pale, PART.kepala, nv)
    push(CY(0.018, 0.025, 0.3, 0, 0, 0).rotateZ(-s * 0.5).translate(s * 0.12, 2.32, 0.7), pale, PART.kepala, nv)
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3))
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
  g.setAttribute('aPart', new THREE.Float32BufferAttribute(part, 1))
  g.setAttribute('aPivot', new THREE.Float32BufferAttribute(pivot, 3))
  return g
}

export function createReindeer({ ground }) {
  const rand = rng(5150)
  const between = (a, b) => a + (b - a) * rand()
  const herds = HERDS.map((h, i) => ({ ...h, id: i }))
  const deer = []
  for (const h of herds)
    for (let k = 0; k < h.n; k++) {
      const a = rand() * Math.PI * 2
      const r = Math.sqrt(rand()) * h.r * 0.7
      deer.push({
        id: deer.length, herd: h.id, x: h.x + Math.sin(a) * r, z: h.z + Math.cos(a) * r, y: 0, heading: rand() * Math.PI * 2,
        state: 'makan', until: between(2, 12), tx: 0, tz: 0, phase: rand() * 6, move: 0, graze: 1, respawnAt: 0, carry: null, size: between(0.74, 0.88),
      })
    }
  const yOf = (x, z) => Math.max(ground.surfaceAt(x, z), ground.outerAt ? ground.outerAt(x, z) : -Infinity)
  for (const d of deer) d.y = yOf(d.x, d.z)

  // ------------------------------------------------------------------ mesh
  const geo = deerGeometry()
  const cap = deer.length
  const anim = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
  geo.setAttribute('aAnim', anim)
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true })
  mat.onBeforeCompile = shader => {
    shader.vertexShader = 'attribute float aPart;\nattribute vec3 aPivot;\nattribute vec4 aAnim;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `vec3 transformed = vec3(position);
      int p = int(aPart + 0.5);
      float ang = 0.0;
      if (p >= 1 && p <= 4) {
        // kaki depan-belakang berselang (langkah diagonal); amplitudo ikut laju
        float off = (p == 1 || p == 4) ? 0.0 : 3.14159;
        ang = sin(aAnim.x + off) * 0.55 * aAnim.y;
      } else if (p == 5) {
        ang = 1.05 * aAnim.z; // merumput: kepala menunduk
      }
      if (ang != 0.0) {
        float c = cos(ang);
        float s = sin(ang);
        vec3 q = transformed - aPivot;
        transformed = aPivot + vec3(q.x, q.y * c - q.z * s, q.y * s + q.z * c);
      }`,
    )
  }
  const mesh = new THREE.InstancedMesh(geo, mat, cap)
  mesh.name = 'rusa-kutub'
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  mesh.frustumCulled = false
  mesh.count = cap

  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const p = new THREE.Vector3()
  const s = new THREE.Vector3()

  // ------------------------------------------------------------------ perilaku
  function wander(d) {
    const h = herds[d.herd]
    const a = rand() * Math.PI * 2
    const r = Math.sqrt(rand()) * h.r
    d.tx = h.x + Math.sin(a) * r
    d.tz = h.z + Math.cos(a) * r
  }
  function flee(d, from) {
    d.state = 'kabur'
    d.until = between(4, 7)
    const a = Math.atan2(d.x - from.x, d.z - from.z) + between(-0.5, 0.5)
    const h = herds[d.herd]
    // menjauh, tetapi tidak keluar jauh dari wilayahnya
    const dist = 22
    d.tx = d.x + Math.sin(a) * dist
    d.tz = d.z + Math.cos(a) * dist
    const away = Math.hypot(d.tx - h.x, d.tz - h.z)
    if (away > h.r * 1.4) {
      d.tx = h.x + ((d.tx - h.x) / away) * h.r * 1.4
      d.tz = h.z + ((d.tz - h.z) / away) * h.r * 1.4
    }
  }
  const alive = d => d.state !== 'roboh' && d.state !== 'dibawa' && d.state !== 'hilang'

  let T = 0
  function update(dt, threats) {
    T += dt
    for (const d of deer) {
      if (d.state === 'hilang') {
        if (T >= d.respawnAt) {
          const h = herds[d.herd]
          d.x = h.x + between(-8, 8)
          d.z = h.z + between(-8, 8)
          d.y = yOf(d.x, d.z)
          d.state = 'makan'
          d.until = between(3, 10)
        }
        continue
      }
      if (d.state === 'roboh' || d.state === 'dibawa') continue
      // ancaman: kabur menjauh
      if (d.state !== 'kabur')
        for (const t of threats)
          if (!t.sneak && Math.hypot(t.x - d.x, t.z - d.z) < FLEE_R) {
            flee(d, t)
            // sekawanan ikut kabur
            for (const o of deer) if (o !== d && o.herd === d.herd && alive(o) && o.state !== 'kabur' && Math.hypot(o.x - d.x, o.z - d.z) < 25) flee(o, t)
            break
          }
      d.until -= dt
      if (d.state === 'makan') {
        d.move += (0 - d.move) * Math.min(1, dt * 4)
        d.graze += (1 - d.graze) * Math.min(1, dt * 1.5)
        if (d.until <= 0) {
          d.state = 'jalan'
          d.until = between(6, 16)
          wander(d)
        }
      } else {
        const v = d.state === 'kabur' ? SPEED.kabur : SPEED.jalan
        const dx = d.tx - d.x
        const dz = d.tz - d.z
        const L = Math.hypot(dx, dz)
        d.graze += (0 - d.graze) * Math.min(1, dt * 4)
        if (L < 0.5 || d.until <= 0) {
          d.state = 'makan'
          d.until = between(4, 14)
        } else {
          const want = Math.atan2(dx, dz)
          d.heading += Math.atan2(Math.sin(want - d.heading), Math.cos(want - d.heading)) * Math.min(1, dt * 4)
          const step = Math.min(L, v * dt)
          d.x += Math.sin(d.heading) * step
          d.z += Math.cos(d.heading) * step
          d.y = yOf(d.x, d.z)
          d.move += ((d.state === 'kabur' ? 1.6 : 1) - d.move) * Math.min(1, dt * 4)
          d.phase += dt * v * 3.2
        }
      }
    }
  }

  // tulis instance (dipanggil tiap bingkai bila Frostfall terlihat)
  function render() {
    for (const d of deer) {
      const i = d.id
      if (d.state === 'hilang') {
        m.makeScale(0, 0, 0)
        mesh.setMatrixAt(i, m)
        continue
      }
      if (d.state === 'roboh') {
        // terbaring di sisi kiri
        e.set(0, d.heading, Math.PI / 2)
        p.set(d.x, d.y + 0.25 * d.size, d.z)
      } else if (d.state === 'dibawa' && d.carry) {
        // dipikul di antara dua pemburu: telentang, kaki ke atas
        e.set(0, d.carry.heading, Math.PI)
        p.set(d.carry.x, d.carry.y + 1.62, d.carry.z)
      } else {
        e.set(0, d.heading, 0)
        p.set(d.x, d.y, d.z)
      }
      q.setFromEuler(e)
      s.setScalar(d.size * (d.state === 'dibawa' ? 0.75 : 1))
      m.compose(p, q, s)
      mesh.setMatrixAt(i, m)
      anim.array[i * 4] = d.phase
      anim.array[i * 4 + 1] = d.state === 'roboh' || d.state === 'dibawa' ? 0 : d.move
      anim.array[i * 4 + 2] = d.state === 'roboh' || d.state === 'dibawa' ? 0.4 : d.graze
    }
    mesh.instanceMatrix.needsUpdate = true
    anim.needsUpdate = true
  }

  return {
    object: mesh,
    deer,
    herds,
    alive,
    update,
    render,
    // rusa hidup terdekat dari kawanan h (untuk pemburu)
    target(h, x, z) {
      let best = null
      let bd = Infinity
      for (const d of deer) {
        if (d.herd !== h || !alive(d)) continue
        const dd = Math.hypot(d.x - x, d.z - z)
        if (dd < bd) {
          bd = dd
          best = d
        }
      }
      return best
    },
    // titik tengah kawanan (rusa yang masih hidup)
    center(h) {
      let x = 0
      let z = 0
      let n = 0
      for (const d of deer)
        if (d.herd === h && alive(d)) {
          x += d.x
          z += d.z
          n++
        }
      return n ? { x: x / n, z: z / n, n } : null
    },
    // terkena panah: roboh; kawanannya kabur menjauh dari pemanah
    hit(d, from) {
      d.state = 'roboh'
      d.move = 0
      for (const o of deer) if (o !== d && o.herd === d.herd && alive(o) && Math.hypot(o.x - d.x, o.z - d.z) < 30) flee(o, from)
    },
    // panah meleset: kawanan kabur
    scare(h, from) {
      for (const o of deer) if (o.herd === h && alive(o)) flee(o, from)
    },
    // dipikul: carry = { x, y, z, heading } (diperbarui pemanggil tiap bingkai)
    pick(d, carry) {
      d.state = 'dibawa'
      d.carry = carry
    },
    // diserahkan ke pondok pengasapan: hilang, muncul lagi di kawanannya setelah RESPAWN detik
    store(d) {
      d.state = 'hilang'
      d.carry = null
      d.respawnAt = T + RESPAWN
    },
    get time() {
      return T
    },
    stats() {
      const st = {}
      for (const d of deer) st[d.state] = (st[d.state] || 0) + 1
      return { jumlah: deer.length, ...st }
    },
  }
}
