import * as THREE from 'three'

// Naga Es (v0.24.0) — model prosedural menurut lembar desain pengguna "Cryo Dragon" (Legendary Boss):
// badan bersisik putih-biru dengan celah sisik yang berpendar biru, deretan duri kristal es di
// punggung sampai ujung ekor, gugus kristal besar di bahu & siku, mahkota kristal di belakang kepala,
// mata biru bercahaya, sayap bermembran es berurat. Tanpa aset luar.
// Satu SkinnedMesh (41 tulang) dengan dua bahan (badan + membran sayap) = 2 draw call.
// Pose bind: berdiri di atas empat kaki, sayap terbentang penuh, menghadap +Z, kaki di y = 0.
// Rangka & bentuk ditulis dalam satuan model (moncong–ujung ekor ±21, kepala ±8, rentang sayap ±29);
// di dunia seluruhnya dikecilkan UKURAN kali (v0.24.1): ±14 m panjang, kepala ±5 m di atas tanah,
// rentang sayap ±19 m — supaya leluasa bergerak, berbelok & terbang di ruang gua (Ø ±36 m).
export const UKURAN = 0.65

export const PALET = { putih: '#ffffff', es: '#d5efff', muda: '#8bd9ff', biru: '#39b6ff', tua: '#0e7bff', malam: '#0b2a4d' }

// ------------------------------------------------------------------------------------- rangka
const BONES = [] // { name, parent, pos (model, bind) }
const J = {}
function bone(name, parent, x, y, z) {
  J[name] = BONES.length
  BONES.push({ name, parent, pos: new THREE.Vector3(x, y, z) })
  return J[name]
}
bone('root', -1, 0, 0, 0)
bone('hips', J.root, 0, 3.3, -1.8)
bone('spine', J.hips, 0, 3.6, 0.2)
bone('chest', J.spine, 0, 3.85, 2.0)
bone('neck1', J.chest, 0, 4.5, 3.2)
bone('neck2', J.neck1, 0, 5.4, 3.95)
bone('neck3', J.neck2, 0, 6.25, 4.6)
bone('neck4', J.neck3, 0, 6.95, 5.3)
bone('head', J.neck4, 0, 7.3, 5.95)
bone('jaw', J.head, 0, 7.02, 6.4)
const TAIL = [[3.2, -3.4], [2.8, -5.0], [2.3, -6.5], [1.8, -7.9], [1.35, -9.1], [1.0, -10.2], [0.75, -11.2]]
TAIL.forEach(([y, z], i) => bone(`tail${i + 1}`, i ? J[`tail${i}`] : J.hips, 0, y, z))
export const TAIL_TIP = new THREE.Vector3(0, 0.55, -12.2)
// sisi: +1 = kiri (+x), −1 = kanan
const SIDES = [[1, 'l'], [-1, 'r']]
for (const [s, k] of SIDES) {
  bone(`upperF${k}`, J.chest, s * 1.25, 3.4, 2.1)
  bone(`lowerF${k}`, J[`upperF${k}`], s * 1.55, 1.95, 2.45)
  bone(`footF${k}`, J[`lowerF${k}`], s * 1.5, 0.55, 2.8)
  bone(`upperH${k}`, J.hips, s * 1.35, 3.05, -1.5)
  bone(`lowerH${k}`, J[`upperH${k}`], s * 1.75, 1.75, -0.7)
  bone(`footH${k}`, J[`lowerH${k}`], s * 1.6, 0.75, -2.0)
  bone(`hum${k}`, J.chest, s * 0.95, 4.55, 1.55)
  bone(`fore${k}`, J[`hum${k}`], s * 4.1, 6.4, 0.5)
  bone(`hand${k}`, J[`fore${k}`], s * 7.4, 7.5, -0.6)
  bone(`f1${k}`, J[`hand${k}`], s * 7.4, 7.5, -0.6)
  bone(`f2${k}`, J[`hand${k}`], s * 7.4, 7.5, -0.6)
  bone(`f3${k}`, J[`hand${k}`], s * 7.4, 7.5, -0.6)
}
export const JOINTS = J
export const BONE_COUNT = BONES.length
// ujung jari sayap (bind)
const TIPS = s => [new THREE.Vector3(s * 14.4, 7.0, -1.8), new THREE.Vector3(s * 12.4, 4.9, -4.6), new THREE.Vector3(s * 9.3, 3.8, -6.2)]

// ------------------------------------------------------------------------------------- penyusun
// Semua bagian ditulis sebagai segitiga lepas (tanpa indeks): posisi, normal, warna, bobot tulang (4),
// uv (badan: panjang lintasan & keliling dalam meter — pola sisik; membran: sepanjang & melintang),
// aInfo (x: pendar 0..2, y: jenis permukaan 0 = kulit bersisik, 1 = kristal / cakar / gigi, 2 = mata,
// 3 = rongga mulut). Grup 0 = badan, grup 1 = membran.
const C = (hex, k = 1) => {
  const c = new THREE.Color(hex)
  return [c.r * k, c.g * k, c.b * k]
}
const V = THREE.Vector3

function createBuilder() {
  const groups = [[], []]
  // v: { p: Vector3, n: Vector3, c: [r,g,b], w: [[tulang, bobot], ...], uv: [u, v], info: [pendar, jenis] }
  // urutan titik disesuaikan dengan normal yang diberikan, jadi muka depan selalu menghadap ke luar
  // (bahan badan hanya menggambar sisi depan)
  const e1 = new V()
  const e2 = new V()
  function tri(a, b, c, g = 0) {
    e1.subVectors(b.p, a.p)
    e2.subVectors(c.p, a.p)
    const fx = e1.y * e2.z - e1.z * e2.y
    const fy = e1.z * e2.x - e1.x * e2.z
    const fz = e1.x * e2.y - e1.y * e2.x
    const dot = fx * (a.n.x + b.n.x + c.n.x) + fy * (a.n.y + b.n.y + c.n.y) + fz * (a.n.z + b.n.z + c.n.z)
    if (dot < 0) groups[g].push(a, c, b)
    else groups[g].push(a, b, c)
  }
  function quad(a, b, c, d, g = 0) {
    tri(a, b, c, g)
    tri(a, c, d, g)
  }
  function geometry() {
    const verts = [...groups[0], ...groups[1]]
    const n = verts.length
    const pos = new Float32Array(n * 3)
    const nor = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const uv = new Float32Array(n * 2)
    const info = new Float32Array(n * 2)
    const si = new Uint16Array(n * 4)
    const sw = new Float32Array(n * 4)
    verts.forEach((v, i) => {
      pos.set([v.p.x, v.p.y, v.p.z], i * 3)
      nor.set([v.n.x, v.n.y, v.n.z], i * 3)
      col.set(v.c, i * 3)
      uv.set(v.uv || [0, 0], i * 2)
      info.set(v.info || [0, 0], i * 2)
      // gabungkan tulang yang sama, ambil 4 terbesar, normalkan
      const m = new Map()
      for (const [b, w] of v.w) m.set(b, (m.get(b) || 0) + w)
      const top = [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4)
      const tot = top.reduce((s, e) => s + e[1], 0) || 1
      top.forEach(([b, w], k) => {
        si[i * 4 + k] = b
        sw[i * 4 + k] = w / tot
      })
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
    g.setAttribute('aInfo', new THREE.BufferAttribute(info, 2))
    g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4))
    g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4))
    g.addGroup(0, groups[0].length, 0)
    g.addGroup(groups[0].length, groups[1].length, 1)
    return g
  }
  return { tri, quad, geometry, count: () => (groups[0].length + groups[1].length) / 3 }
}

// campur dua daftar bobot: a·(1−t) + b·t
const mixW = (a, b, t) => [...a.map(([j, w]) => [j, w * (1 - t)]), ...b.map(([j, w]) => [j, w * t])]

// Catmull-Rom lewat titik-titik (ujung digandakan)
function catmull(pts, f) {
  const n = pts.length - 1
  const x = Math.min(n - 1e-6, Math.max(0, f))
  const i = Math.floor(x)
  const t = x - i
  const p0 = pts[Math.max(0, i - 1)]
  const p1 = pts[i]
  const p2 = pts[i + 1]
  const p3 = pts[Math.min(n, i + 2)]
  const t2 = t * t
  const t3 = t2 * t
  return new V(
    0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    0.5 * (2 * p1.z + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3),
  )
}

// Tabung menyusuri titik kendali { p, rx, ry, w } (Catmull-Rom). up: arah acuan bingkai penampang.
// color(φ, f) → warna (φ: sudut dari punggung, 0 = atas, ±π = perut). Mengembalikan sampel lintasan
// ({ p, x, u, rx, ry, w }) untuk menempelkan duri.
function tube(B, ctrl, { segs = 14, per = 6, up = new V(0, 1, 0), color, flatBelly = 0.88, capStart = false, capEnd = false }) {
  const n = (ctrl.length - 1) * per
  const samples = []
  let len = 0
  for (let k = 0; k <= n; k++) {
    const f = k / per
    const i = Math.min(ctrl.length - 2, Math.floor(f))
    const t = f - i
    const p = catmull(ctrl.map(c => c.p), f)
    if (samples.length) len += p.distanceTo(samples[samples.length - 1].p)
    samples.push({
      p,
      f,
      len,
      rx: ctrl[i].rx + (ctrl[i + 1].rx - ctrl[i].rx) * t,
      ry: ctrl[i].ry + (ctrl[i + 1].ry - ctrl[i].ry) * t,
      w: mixW(ctrl[i].w, ctrl[i + 1].w, t),
    })
  }
  let prevX = null
  for (let k = 0; k < samples.length; k++) {
    const s = samples[k]
    const a = samples[Math.max(0, k - 1)].p
    const b = samples[Math.min(samples.length - 1, k + 1)].p
    const T = b.clone().sub(a).normalize()
    let X = new V().crossVectors(up, T)
    if (X.lengthSq() < 1e-4) X = prevX ? prevX.clone() : new V(1, 0, 0)
    X.normalize()
    prevX = X
    s.T = T
    s.X = X
    s.U = new V().crossVectors(T, X).normalize()
  }
  const ring = s => {
    const out = []
    for (let j = 0; j <= segs; j++) {
      const phi = -Math.PI + (j / segs) * Math.PI * 2 // ±π di perut (kampuh), 0 di punggung
      const ca = Math.sin(phi) // komponen samping
      const sa = Math.cos(phi) // komponen atas
      const ry = sa < 0 ? s.ry * flatBelly : s.ry
      const p = s.p.clone().addScaledVector(s.X, s.rx * ca).addScaledVector(s.U, ry * sa)
      const nrm = new V().addScaledVector(s.X, ry * ca).addScaledVector(s.U, s.rx * sa).normalize()
      out.push({ p, n: nrm, c: color(phi, s), w: s.w, uv: [s.len, phi * (s.rx + s.ry) * 0.5], info: [0, 0] })
    }
    return out
  }
  let prev = ring(samples[0])
  for (let k = 1; k < samples.length; k++) {
    const cur = ring(samples[k])
    for (let j = 0; j < segs; j++) B.quad(prev[j], prev[j + 1], cur[j + 1], cur[j])
    prev = cur
  }
  const cap = (s, flip) => {
    const r = ring(s)
    const c = { p: s.p.clone().addScaledVector(s.T, flip ? -Math.min(s.rx, s.ry) * 0.6 : Math.min(s.rx, s.ry) * 0.6), n: s.T.clone().multiplyScalar(flip ? -1 : 1), c: r[0].c, w: s.w, uv: [s.len, 0], info: [0, 0] }
    for (let j = 0; j < segs; j++)
      if (flip) B.tri(c, r[j + 1], r[j])
      else B.tri(c, r[j], r[j + 1])

  }
  if (capStart) cap(samples[0], true)
  if (capEnd) cap(samples[samples.length - 1], false)
  return samples
}

// Kristal es heksagonal: alas di `base`, menjulang ke arah `dir`, sisi datar (normal per muka).
// glow: pendar inti; w: bobot tulang.
function crystal(B, base, dir, len, r, w, { glow = 0.75, sides = 6, twist = 0, tipK = 0.32 } = {}) {
  const D = dir.clone().normalize()
  let X = new V().crossVectors(D, Math.abs(D.y) < 0.9 ? new V(0, 1, 0) : new V(1, 0, 0)).normalize()
  const Y = new V().crossVectors(X, D).normalize()
  X = new V().crossVectors(D, Y).normalize()
  const body = len * (1 - tipK)
  const bottom = []
  const top = []
  for (let i = 0; i < sides; i++) {
    const a = twist + (i / sides) * Math.PI * 2
    const o = X.clone().multiplyScalar(Math.cos(a)).addScaledVector(Y, Math.sin(a))
    bottom.push(base.clone().addScaledVector(o, r).addScaledVector(D, -r * 0.4))
    top.push(base.clone().addScaledVector(o, r * 0.82).addScaledVector(D, body))
  }
  const tip = base.clone().addScaledVector(D, len)
  const cBase = C(PALET.muda, 0.9)
  const cMid = C(PALET.es)
  const cTip = C(PALET.putih)
  const face = (a, b, c, ca, cb, cc, ga, gb, gc) => {
    const nrm = new V().subVectors(b, a).cross(new V().subVectors(c, a)).normalize()
    B.tri(
      { p: a, n: nrm, c: ca, w, info: [ga, 1] },
      { p: b, n: nrm, c: cb, w, info: [gb, 1] },
      { p: c, n: nrm, c: cc, w, info: [gc, 1] },
    )
  }
  for (let i = 0; i < sides; i++) {
    const j = (i + 1) % sides
    face(bottom[i], bottom[j], top[j], cBase, cBase, cMid, glow, glow, glow * 0.7)
    face(bottom[i], top[j], top[i], cBase, cMid, cMid, glow, glow * 0.7, glow * 0.7)
    face(top[i], top[j], tip, cMid, cMid, cTip, glow * 0.7, glow * 0.7, glow * 1.1)
  }
}

// gugus kristal: beberapa kristal menyebar dari satu titik
function cluster(B, base, dir, size, w, rnd, n = 4, spread = 0.5) {
  const D = dir.clone().normalize()
  for (let i = 0; i < n; i++) {
    const d = D.clone().add(new V((rnd() - 0.5) * spread * 2, (rnd() - 0.3) * spread, (rnd() - 0.5) * spread * 2)).normalize()
    const k = i === 0 ? 1 : 0.45 + rnd() * 0.45
    crystal(B, base.clone().addScaledVector(d, size * 0.05), d, size * k, size * 0.16 * k, w, { glow: 0.7 + rnd() * 0.4, twist: rnd() * 3 })
  }
}

// kerucut (cakar, gigi): alas lingkaran r di `base`, ujung ke `dir`
function cone(B, base, dir, len, r, w, color, glow = 0.15, segs = 6) {
  const D = dir.clone().normalize()
  const X = new V().crossVectors(D, Math.abs(D.y) < 0.9 ? new V(0, 1, 0) : new V(1, 0, 0)).normalize()
  const Y = new V().crossVectors(D, X).normalize()
  const tip = base.clone().addScaledVector(D, len)
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2
    const a1 = ((i + 1) / segs) * Math.PI * 2
    const p0 = base.clone().addScaledVector(X, Math.cos(a0) * r).addScaledVector(Y, Math.sin(a0) * r)
    const p1 = base.clone().addScaledVector(X, Math.cos(a1) * r).addScaledVector(Y, Math.sin(a1) * r)
    const nrm = new V().subVectors(p1, p0).cross(new V().subVectors(tip, p0)).normalize()
    B.tri({ p: p0, n: nrm, c: color, w, info: [glow * 0.4, 1] }, { p: p1, n: nrm, c: color, w, info: [glow * 0.4, 1] }, { p: tip, n: nrm, c: color, w, info: [glow, 1] })
  }
}

// elipsoid kecil (mata, cuping hidung)
function ellipsoid(B, c, rx, ry, rz, w, color, info, rows = 6, cols = 10) {
  const pt = (i, j) => {
    const th = (i / rows) * Math.PI
    const ph = (j / cols) * Math.PI * 2
    const n = new V(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph))
    return { p: new V(c.x + n.x * rx, c.y + n.y * ry, c.z + n.z * rz), n: new V(n.x / rx, n.y / ry, n.z / rz).normalize(), c: color, w, info }
  }
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) B.quad(pt(i, j), pt(i + 1, j), pt(i + 1, j + 1), pt(i, j + 1))
}

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ------------------------------------------------------------------------------------- bentuk
function buildGeometry() {
  const B = createBuilder()
  const rnd = rng(2404)
  const P = name => BONES[J[name]].pos
  const one = name => [[J[name], 1]]
  // warna kulit: punggung putih, sisi putih kebiruan, perut biru muda
  const skin = phi => {
    const up = Math.cos(phi)
    const top = C(PALET.putih, 0.97)
    const side = C(PALET.es)
    const belly = C('#a9dcf5')
    const k = up > 0 ? up : 0
    const kb = up < 0 ? -up : 0
    return side.map((v, i) => v + (top[i] - v) * k * 0.8 + (belly[i] - v) * kb)
  }

  // --- badan: ujung ekor → pinggul → punggung → dada → leher → pangkal kepala
  const body = [
    { p: TAIL_TIP, rx: 0.1, ry: 0.1, w: one('tail7') },
    ...[...TAIL].reverse().map(([y, z], i) => {
      const k = 7 - i
      const r = [1.3, 1.0, 0.78, 0.58, 0.42, 0.3, 0.2][k - 1]
      return { p: new V(0, y, z), rx: r, ry: r * 1.04, w: one(`tail${k}`) }
    }),
    { p: P('hips'), rx: 1.62, ry: 1.6, w: one('hips') },
    { p: P('spine'), rx: 1.88, ry: 1.82, w: one('spine') },
    { p: P('chest'), rx: 1.82, ry: 1.92, w: one('chest') },
    { p: P('neck1'), rx: 1.18, ry: 1.25, w: one('neck1') },
    { p: P('neck2'), rx: 0.92, ry: 0.96, w: one('neck2') },
    { p: P('neck3'), rx: 0.78, ry: 0.82, w: one('neck3') },
    { p: P('neck4'), rx: 0.7, ry: 0.74, w: one('neck4') },
    { p: new V(0, 7.32, 6.0), rx: 0.6, ry: 0.66, w: one('head') },
  ]
  const spine = tube(B, body, { segs: 18, per: 6, color: skin, capStart: true })

  // --- kepala (atas) & rahang bawah: loft melintang sepanjang z, garis mulut y = mulut(z)
  const mouthY = z => 7.04 - 0.07 * (z - 6.4)
  const headProf = [
    // z, setengah lebar, tinggi atap di atas garis mulut
    [5.85, 0.6, 0.9],
    [6.2, 0.74, 1.0],
    [6.65, 0.66, 0.84],
    [7.2, 0.5, 0.6],
    [7.8, 0.42, 0.48],
    [8.4, 0.36, 0.4],
    [8.8, 0.26, 0.3],
    [9.0, 0.1, 0.14],
  ]
  const jawProf = [
    // z, setengah lebar, dalam di bawah garis mulut
    [6.05, 0.56, 0.5],
    [6.6, 0.52, 0.46],
    [7.3, 0.42, 0.36],
    [8.0, 0.34, 0.28],
    [8.6, 0.27, 0.2],
    [8.9, 0.14, 0.1],
  ]
  const HS = 12
  const headW = one('head')
  const jawW = one('jaw')
  const loft = (prof, below, w) => {
    const rows = prof.map(([z, hw, h]) => {
      const y0 = mouthY(z)
      const out = []
      for (let j = 0; j <= HS; j++) {
        const a = (j / HS) * Math.PI // 0 = sisi kanan, π = sisi kiri
        const cx = -Math.cos(a)
        const sy = Math.sin(a)
        // sisi lebih tegak, atap/dagu membulat
        const x = cx * hw * (1 - 0.1 * sy)
        const y = below ? y0 - Math.pow(sy, 0.75) * h : y0 + Math.pow(sy, 0.7) * h
        const nrm = new V(cx * h, (below ? -1 : 1) * sy * hw, 0).normalize()
        const top = below ? C('#b6e2f7') : skin(below ? Math.PI : (1 - sy) * 1.4 * Math.sign(cx || 1))
        out.push({ p: new V(x, y, z), n: nrm, c: top, w, uv: [z * 1.4, a * 0.6], info: [0, 0] })
      }
      return out
    })
    for (let i = 1; i < rows.length; i++)
      for (let j = 0; j < HS; j++)
        if (below) B.quad(rows[i - 1][j], rows[i][j], rows[i][j + 1], rows[i - 1][j + 1])
        else B.quad(rows[i - 1][j], rows[i - 1][j + 1], rows[i][j + 1], rows[i][j])

    // permukaan dalam mulut (langit-langit / lidah): gelap kebiruan
    const inner = C('#24466e')
    for (let i = 1; i < rows.length; i++) {
      const a0 = rows[i - 1][0].p
      const a1 = rows[i - 1][HS].p
      const b0 = rows[i][0].p
      const b1 = rows[i][HS].p
      const n = new V(0, below ? 1 : -1, 0)
      const v = (p, x) => ({ p: new V(p.x * x, p.y + (below ? 0.02 : -0.02), p.z), n, c: inner, w, info: [0.12, 3] })
      if (below) B.quad(v(a0, 0.92), v(a1, 0.92), v(b1, 0.92), v(b0, 0.92))
      else B.quad(v(a0, 0.92), v(b0, 0.92), v(b1, 0.92), v(a1, 0.92))
    }
    return rows
  }
  loft(headProf, false, headW)
  loft(jawProf, true, jawW)
  // gigi: atas menghadap bawah, bawah menghadap atas
  const tooth = C('#f4fbff')
  for (let z = 6.75; z < 8.75; z += 0.26)
    for (const s of [1, -1]) {
      const hw = THREE.MathUtils.lerp(0.62, 0.24, (z - 6.65) / 2.15)
      cone(B, new V(s * hw * 0.86, mouthY(z) + 0.03, z), new V(0, -1, 0.15), 0.2 + (z > 8.3 ? 0.08 : 0), 0.055, headW, tooth, 0.2, 5)
      cone(B, new V(s * hw * 0.8, mouthY(z + 0.13) - 0.03, z + 0.13), new V(0, 1, 0.1), 0.15, 0.05, jawW, tooth, 0.2, 5)
    }
  // mata bercahaya + alis kristal
  for (const s of [1, -1]) {
    ellipsoid(B, new V(s * 0.55, 7.58, 6.72), 0.08, 0.1, 0.2, headW, C('#9ff0ff'), [1.6, 2])
    crystal(B, new V(s * 0.5, 7.82, 6.62), new V(s * 0.35, 0.45, -1), 0.75, 0.1, headW, { glow: 0.8 })
    // cuping hidung
    ellipsoid(B, new V(s * 0.18, mouthY(8.75) + 0.27, 8.75), 0.05, 0.035, 0.07, headW, C(PALET.malam), [0, 3], 4, 6)
    // mahkota: dua kristal besar ke belakang-atas, satu lagi di pipi
    crystal(B, new V(s * 0.38, 7.95, 6.05), new V(s * 0.28, 0.75, -1), 2.2, 0.17, headW, { glow: 0.9 })
    crystal(B, new V(s * 0.5, 7.75, 5.9), new V(s * 0.55, 0.45, -1), 1.5, 0.13, headW, { glow: 0.8 })
    crystal(B, new V(s * 0.66, 7.15, 6.2), new V(s * 0.8, 0.05, -1), 0.95, 0.1, headW, { glow: 0.7 })
    crystal(B, new V(s * 0.5, 6.62, 6.3), new V(s * 0.7, -0.35, -1), 0.7, 0.09, jawW, { glow: 0.6 })
  }
  // jambul tengah kepala
  for (let i = 0; i < 3; i++) crystal(B, new V(0, 7.98 - i * 0.05, 6.5 - i * 0.42), new V(0, 0.9, -1), 0.9 - i * 0.15, 0.12, headW, { glow: 0.8 })

  // --- duri kristal di punggung: dari leher sampai ujung ekor, terbesar di bahu
  for (let k = 2; k < spine.length - 3; k += 2) {
    const s = spine[k]
    const { z } = s.p
    // tinggi duri menurut letaknya
    let h
    if (z > 3.0) h = 0.75 // leher
    else if (z > -0.5) h = 1.6 + 0.9 * Math.sin(((z + 0.5) / 3.5) * Math.PI) // bahu, puncak di atas dada
    else if (z > -3.5) h = 1.35
    else h = Math.max(0.28, 1.2 * (1 - (-3.5 - z) / 9))
    const base = s.p.clone().addScaledVector(s.U, s.ry * 0.92)
    const dir = s.U.clone().addScaledVector(s.T, -0.65)
    crystal(B, base, dir, h, Math.max(0.08, h * 0.17), s.w, { glow: 0.8, twist: rnd() })
    // duri samping kecil berpasangan di punggung & ekor
    if (z < 2.5 && k % 4 === 0)
      for (const sg of [1, -1]) {
        const b2 = s.p.clone().addScaledVector(s.U, s.ry * 0.72).addScaledVector(s.X, sg * s.rx * 0.62)
        const d2 = s.U.clone().addScaledVector(s.X, sg * 0.7).addScaledVector(s.T, -0.6)
        crystal(B, b2, d2, h * 0.5, Math.max(0.06, h * 0.09), s.w, { glow: 0.7, twist: rnd() })
      }
  }
  // sirip kristal di ujung ekor
  {
    const s = spine[2]
    for (let i = 0; i < 5; i++) {
      const a = (i - 2) * 0.42
      const d = new V(Math.sin(a) * 0.9, Math.cos(a) * 0.6, -1.3)
      crystal(B, s.p.clone(), d, 1.25 - Math.abs(i - 2) * 0.22, 0.13, s.w, { glow: 1, twist: i })
    }
  }
  // gugus kristal besar di bahu & pinggul
  for (const s of [1, -1]) {
    cluster(B, new V(s * 1.35, 4.95, 1.9), new V(s * 0.55, 1, -0.35), 2.2, mixW(one('chest'), one(`upperF${s > 0 ? 'l' : 'r'}`), 0.3), rnd, 5, 0.45)
    cluster(B, new V(s * 1.3, 4.5, -1.6), new V(s * 0.6, 1, -0.5), 1.4, one('hips'), rnd, 3, 0.4)
  }

  // --- kaki: tabung + telapak + cakar; gugus kristal di siku kaki depan
  const claw = C('#e8f6ff')
  for (const [s, k] of SIDES) {
    const front = [
      { p: P(`upperF${k}`).clone().add(new V(-s * 0.2, 0.35, -0.1)), rx: 0.95, ry: 1.0, w: mixW(one('chest'), one(`upperF${k}`), 0.6) },
      { p: P(`upperF${k}`), rx: 0.85, ry: 0.88, w: one(`upperF${k}`) },
      { p: P(`lowerF${k}`), rx: 0.6, ry: 0.62, w: one(`lowerF${k}`) },
      { p: P(`footF${k}`), rx: 0.46, ry: 0.48, w: one(`footF${k}`) },
      { p: P(`footF${k}`).clone().add(new V(0, -0.3, 0.55)), rx: 0.5, ry: 0.26, w: one(`footF${k}`) },
    ]
    tube(B, front, { segs: 10, per: 4, up: new V(0, 0, 1), color: skin, capEnd: true, flatBelly: 1 })
    const hind = [
      { p: P(`upperH${k}`).clone().add(new V(-s * 0.3, 0.5, 0)), rx: 1.2, ry: 1.2, w: mixW(one('hips'), one(`upperH${k}`), 0.6) },
      { p: P(`upperH${k}`).clone().add(new V(s * 0.05, -0.4, 0.3)), rx: 1.12, ry: 1.12, w: one(`upperH${k}`) },
      { p: P(`lowerH${k}`), rx: 0.7, ry: 0.72, w: one(`lowerH${k}`) },
      { p: P(`footH${k}`), rx: 0.5, ry: 0.5, w: one(`footH${k}`) },
      { p: P(`footH${k}`).clone().add(new V(0, -0.5, 0.75)), rx: 0.52, ry: 0.26, w: one(`footH${k}`) },
    ]
    tube(B, hind, { segs: 10, per: 4, up: new V(0, 0, 1), color: skin, capEnd: true, flatBelly: 1 })
    // cakar: 3 di depan, 1 di belakang
    for (const [footName, toeZ, toeY] of [[`footF${k}`, 0.75, 0.22], [`footH${k}`, 0.95, 0.22]]) {
      const f = P(footName)
      const w = one(footName)
      for (let i = -1; i <= 1; i++) cone(B, new V(f.x + i * 0.24 + s * 0.02, toeY, f.z + toeZ - Math.abs(i) * 0.12), new V(i * 0.25, -0.55, 1), 0.55, 0.11, w, claw, 0.35)
      cone(B, new V(f.x, 0.3, f.z - 0.15), new V(0, -0.4, -1), 0.35, 0.09, w, claw, 0.3)
    }
    cluster(B, P(`lowerF${k}`).clone().add(new V(s * 0.35, 0.35, -0.35)), new V(s * 0.6, 0.35, -1), 1.3, one(`upperF${k}`), rnd, 4, 0.45)
    crystal(B, P(`lowerH${k}`).clone().add(new V(s * 0.3, 0.1, 0.45)), new V(s * 0.4, 0.3, 1), 0.8, 0.12, one(`lowerH${k}`), { glow: 0.8 })
  }

  // --- sayap: lengan, jari, membran
  const memb = (u, v) => {
    // warna membran: biru es, lebih terang di dekat jari
    const c0 = C('#4fa8de')
    const c1 = C('#bfe8ff')
    const k = Math.pow(Math.abs(v - 0.5) * 2, 3)
    return c0.map((x, i) => x + (c1[i] - x) * (0.25 + 0.75 * k))
  }
  for (const [s, k] of SIDES) {
    const hum = P(`hum${k}`)
    const fore = P(`fore${k}`)
    const hand = P(`hand${k}`)
    const tips = TIPS(s)
    // lengan (pangkal di bahu → siku sayap → pergelangan)
    tube(B, [
      { p: hum.clone().add(new V(-s * 0.3, -0.1, 0.1)), rx: 0.45, ry: 0.45, w: one('chest') },
      { p: hum, rx: 0.38, ry: 0.4, w: one(`hum${k}`) },
      { p: fore, rx: 0.28, ry: 0.3, w: one(`fore${k}`) },
      { p: hand, rx: 0.22, ry: 0.24, w: one(`hand${k}`) },
    ], { segs: 8, per: 4, color: skin, flatBelly: 1, capEnd: true })
    // jari
    tips.forEach((tp, i) => {
      const fw = one(`f${i + 1}${k}`)
      tube(B, [
        { p: hand.clone(), rx: 0.17, ry: 0.17, w: mixW(one(`hand${k}`), fw, 0.5) },
        { p: hand.clone().lerp(tp, 0.5), rx: 0.11, ry: 0.11, w: fw },
        { p: tp.clone(), rx: 0.04, ry: 0.04, w: fw },
      ], { segs: 6, per: 5, color: skin, flatBelly: 1 })
    })
    // cakar ibu jari di pergelangan & duri di sepanjang tepi depan lengan bawah
    cone(B, hand.clone().add(new V(0, 0.15, 0.15)), new V(s * 0.3, 0.3, 1), 0.7, 0.13, one(`hand${k}`), claw, 0.4)
    for (let t = 0.15; t < 0.95; t += 0.2) {
      const p = fore.clone().lerp(hand, t)
      crystal(B, p.clone().add(new V(0, 0.18, 0.12)), new V(s * 0.15, 0.6, 1), 0.55, 0.09, mixW(one(`fore${k}`), one(`hand${k}`), t), { glow: 0.7 })
    }
    crystal(B, fore.clone().add(new V(0, 0.2, 0)), new V(s * 0.2, 1, 0.2), 1.0, 0.15, one(`fore${k}`), { glow: 0.85 })

    // membran antar-jari (berporos di pergelangan, tepi belakang melengkung ke dalam)
    const NU = 9
    const NV = 6
    const panel = (ta, tb, wa, wb, uA) => {
      const grid = []
      for (let iu = 0; iu <= NU; iu++) {
        const u = iu / NU
        const row = []
        for (let iv = 0; iv <= NV; iv++) {
          const v = iv / NV
          const a = hand.clone().lerp(ta, u)
          const b = hand.clone().lerp(tb, u)
          const p = a.clone().lerp(b, v)
          // lengkung tepi belakang: tarik ke arah pergelangan
          const pull = Math.sin(Math.PI * v) * Math.pow(u, 2.2) * ta.distanceTo(tb) * 0.28
          p.addScaledVector(p.clone().sub(hand).normalize(), -pull)
          row.push({ p, c: memb(u, v), w: mixW(wa, wb, v), uv: [u, uA + v] })
        }
        grid.push(row)
      }
      return grid
    }
    const emit = grid => {
      for (let i = 1; i < grid.length; i++)
        for (let j = 1; j < grid[i].length; j++) {
          const a = grid[i - 1][j - 1]
          const b = grid[i][j - 1]
          const c = grid[i][j]
          const d = grid[i - 1][j]
          const n = new V().subVectors(b.p, a.p).cross(new V().subVectors(d.p, a.p)).normalize()
          if (s < 0) n.negate()
          const mk = q => ({ p: q.p, n, c: q.c, w: q.w, uv: q.uv, info: [0, 0] })
          if (s > 0) B.quad(mk(a), mk(b), mk(c), mk(d), 1)
          else B.quad(mk(a), mk(d), mk(c), mk(b), 1)
        }
    }
    emit(panel(tips[0], tips[1], one(`f1${k}`), one(`f2${k}`), 0))
    emit(panel(tips[1], tips[2], one(`f2${k}`), one(`f3${k}`), 1))
    // membran dalam: tepi depan = lengan (bahu → siku → pergelangan), tepi belakang = rusuk badan →
    // ujung jari ke-3, melengkung ke dalam
    {
      const L = [hum.clone().add(new V(-s * 0.4, -0.2, -0.2)), fore, hand]
      const Lw = [one('chest'), one(`fore${k}`), one(`hand${k}`)]
      const T0 = new V(s * 1.05, 3.55, -3.4)
      const T1 = tips[2]
      const NS = 10
      const NR = 7
      const grid = []
      for (let is = 0; is <= NS; is++) {
        const sp = is / NS
        const li = sp < 0.5 ? 0 : 1
        const lt = sp < 0.5 ? sp / 0.5 : (sp - 0.5) / 0.5
        const lp = L[li].clone().lerp(L[li + 1], lt)
        const lw = mixW(Lw[li], Lw[li + 1], lt)
        const tp = T0.clone().lerp(T1, sp)
        tp.lerp(lp, 0.22 * Math.sin(Math.PI * sp))
        const tw = mixW(mixW(one('hips'), one('tail1'), 0.3), one(`f3${k}`), sp)
        const row = []
        for (let ir = 0; ir <= NR; ir++) {
          const r = ir / NR
          row.push({ p: lp.clone().lerp(tp, r), c: memb(sp, 0.5 + r * 0.5), w: [...lw.map(([j, w]) => [j, w * (1 - r)]), ...tw.map(([j, w]) => [j, w * r])], uv: [sp, 2 + r] })
        }
        grid.push(row)
      }
      emit(grid)
    }
  }
  return { geometry: B.geometry(), triangles: B.count() }
}

// ------------------------------------------------------------------------------------- bahan
const shaderPars = /* glsl */`
attribute vec2 aInfo;
varying vec2 vInfo;
varying vec2 vUv2;
varying vec3 vBindN;
`
const fragPars = /* glsl */`
uniform sampler2D uNoise;
uniform float uTime;
uniform float uEyes;
uniform float uFlash;
uniform float uBreathGlow;
varying vec2 vInfo;
varying vec2 vUv2;
varying vec3 vBindN;
// jarak ke tepi sel heksagon (0 di tepi, 0,5 di tengah) + id sel
vec4 hexCell(vec2 uv) {
  vec2 r = vec2(1.0, 1.7320508);
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;
  vec2 gv = dot(a, a) < dot(b, b) ? a : b;
  float e = 0.5 - max(abs(gv.x), dot(abs(gv), normalize(r)));
  vec2 id = uv - gv;
  return vec4(e, id, gv.x);
}
`

export function dragonMaterials(noiseTexture) {
  const uniforms = {
    uTime: { value: 0 },
    uEyes: { value: 1 }, // terang mata (0 = terpejam / tidur)
    uFlash: { value: 0 }, // kilat putih saat terkena serangan
    uBreathGlow: { value: 0 }, // mulut & duri menyala saat menghimpun napas es
  }
  const body = new THREE.MeshLambertMaterial({ vertexColors: true })
  body.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms, { uNoise: { value: noiseTexture } })
    shader.vertexShader = shaderPars + shader.vertexShader.replace(
      '#include <uv_vertex>',
      `#include <uv_vertex>
      vInfo = aInfo;
      vUv2 = uv;
      vBindN = normal;`
    )
    shader.fragmentShader = fragPars + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      float seam = 0.0;
      if (vInfo.y < 0.5) {
        // kulit bersisik: sel heksagon sepanjang badan (uv dalam meter), perut berpelat melintang
        // sisik bertumpuk: sisi ke arah kepala (gv.x +) terselip di bawah sisik di depannya → lebih gelap,
        // tepi bebasnya (ke arah ekor) terang
        vec4 hc = hexCell(vUv2 * vec2(1.7, 1.8));
        float rnd = fract(sin(dot(hc.yz, vec2(12.9898, 78.233))) * 43758.5453);
        float edge = smoothstep(0.0, 0.1, hc.x);
        float lap = mix(1.07, 0.8, smoothstep(-0.45, 0.45, hc.w));
        diffuseColor.rgb *= mix(0.72, 1.0, edge) * lap * (0.95 + 0.1 * rnd);
        seam = 1.0 - smoothstep(0.0, 0.05, hc.x);
        if (vBindN.y < -0.55) {
          float band = abs(fract(vUv2.x * 1.6) - 0.5);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.62, 0.84, 0.96), 0.45) * mix(0.72, 1.0, smoothstep(0.02, 0.1, band));
          seam *= 0.3;
        }
        float n = texture2D(uNoise, vUv2 * 0.07).r;
        diffuseColor.rgb *= 0.9 + 0.2 * n;
      } else if (vInfo.y < 1.5) {
        // kristal / cakar: kilau kebiruan bergantung sudut
        diffuseColor.rgb *= 0.85 + 0.25 * abs(vBindN.y);
      }`
    ).replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      vec3 iceGlow = vec3(0.22, 0.71, 1.0);
      float pulse = 0.85 + 0.15 * sin(uTime * 1.7 + vUv2.x * 0.8);
      totalEmissiveRadiance += iceGlow * seam * 0.5 * pulse;
      if (vInfo.y > 1.5 && vInfo.y < 2.5) totalEmissiveRadiance += vec3(0.2, 0.72, 1.0) * vInfo.x * uEyes;
      else if (vInfo.y > 2.5) totalEmissiveRadiance += vec3(0.25, 0.75, 1.0) * uBreathGlow * 1.4;
      else totalEmissiveRadiance += mix(iceGlow, vec3(0.62, 0.9, 1.0), 0.4) * vInfo.x * (0.42 + 0.5 * uBreathGlow) * pulse;
      totalEmissiveRadiance += vec3(0.9, 0.97, 1.0) * uFlash;`
    )
  }
  const wing = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })
  wing.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms, { uNoise: { value: noiseTexture } })
    shader.vertexShader = shaderPars + shader.vertexShader.replace(
      '#include <uv_vertex>',
      `#include <uv_vertex>
      vInfo = aInfo;
      vUv2 = uv;
      vBindN = normal;`
    )
    shader.fragmentShader = fragPars + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      // retakan es pada membran + urat dari pergelangan ke tepi
      float n1 = texture2D(uNoise, vUv2 * vec2(3.0, 1.4)).r;
      float n2 = texture2D(uNoise, vUv2 * vec2(2.5, 1.2) + 0.3).g;
      float crack = smoothstep(0.47, 0.5, n1) * (1.0 - smoothstep(0.5, 0.53, n1));
      diffuseColor.rgb *= 0.88 + 0.24 * n2;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.92, 0.98, 1.0), crack * 0.6);`
    ).replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      float vein = 1.0 - smoothstep(0.0, 0.06, abs(fract(vUv2.y * 2.0 + 0.5) - 0.5) * 2.0 - 0.0);
      float edgeGlow = smoothstep(0.82, 1.0, vUv2.x);
      float n3 = texture2D(uNoise, vUv2 * vec2(3.0, 1.4)).r;
      float crk = smoothstep(0.47, 0.5, n3) * (1.0 - smoothstep(0.5, 0.53, n3));
      totalEmissiveRadiance += vec3(0.22, 0.65, 1.0) * (0.1 + crk * 0.55 + edgeGlow * 0.25 + vein * 0.15);
      totalEmissiveRadiance += vec3(0.9, 0.97, 1.0) * uFlash * 0.5;`
    )
  }
  return { body, wing, uniforms }
}

// ------------------------------------------------------------------------------------- naga
// Membuat satu naga: { object (Group, taruh di dunia), mesh, bones, pose(p), uniforms, triangles }
let cached = null
export function createDragonModel(noiseTexture) {
  if (!cached) cached = buildGeometry()
  const { geometry, triangles } = cached
  const mats = dragonMaterials(noiseTexture)
  const bones = BONES.map(b => {
    const o = new THREE.Bone()
    o.name = b.name
    return o
  })
  BONES.forEach((b, i) => {
    if (b.parent < 0) bones[i].position.copy(b.pos)
    else {
      bones[i].position.copy(b.pos).sub(BONES[b.parent].pos)
      bones[b.parent].add(bones[i])
    }
  })
  const mesh = new THREE.SkinnedMesh(geometry, [mats.body, mats.wing])
  mesh.name = 'naga-es'
  mesh.add(bones[0])
  mesh.updateMatrixWorld(true)
  const skeleton = new THREE.Skeleton(bones)
  mesh.bind(skeleton)
  geometry.computeBoundingSphere()
  geometry.boundingSphere.radius = Math.max(geometry.boundingSphere.radius, 17)
  mesh.frustumCulled = false
  const object = new THREE.Group()
  object.name = 'naga'
  object.add(mesh)
  // satuan model → meter dunia (semua pose & tinggi akar ikut mengecil)
  mesh.scale.setScalar(UKURAN)
  const rest = bones.map(b => b.position.clone())
  return { object, mesh, bones, rest, uniforms: mats.uniforms, triangles, pose: p => applyPose(bones, rest, p) }
}

// ------------------------------------------------------------------------------------- pose
// Parameter pose (semua bawaan 0; sudut dalam radian):
//   t                  waktu (napas, ekor bergoyang)
//   gait, phase        0 = diam, 1 = berjalan, 2 = berlari; fase langkah (radian)
//   bend               lengkung badan ke samping saat berbelok (−1..1, + = ke kiri / +x)
//   neckLift, neckYaw  angkat leher (+ = kepala naik), toleh (+ = ke +x)
//   headPitch, jaw     angguk kepala (+ = moncong turun), buka rahang 0..1
//   rear, crouch       berdiri di kaki belakang 0..1, merunduk 0..1
//   spread, flap       sayap terbentang 0..1 (0 = terlipat), kepak (+ = naik)
//   tuck               kaki dilipat saat terbang 0..1
//   tailCurl, tailSwing, tailLift   lingkar ekor (tidur), sapuan ekor, angkat ekor
//   sleep, dead        tidur meringkuk 0..1, roboh 0..1
const E = new THREE.Euler()
function setRot(b, x, y, z, order = 'XYZ') {
  E.set(x, y, z, order)
  b.quaternion.setFromEuler(E)
}
// pose sayap terlipat: arah tiap ruas (ruang dada, sisi kiri; kanan dicerminkan) → kuaternion lokal.
// Siku ke belakang-atas, pergelangan terangkat di atas bahu, jari terlipat ke belakang di sisi badan.
const ID = new THREE.Quaternion()
const QA = new THREE.Quaternion()
const QB = new THREE.Quaternion()
const AX_Z = new THREE.Vector3(0, 0, 1)
const FOLD = {}
for (const [s, k] of SIDES) {
  const pos = n => BONES[J[`${n}${k}`]].pos
  const dirOf = (a, b) => b.clone().sub(a).normalize()
  const aim = (x, y, z) => new V(s * x, y, z).normalize()
  const tips = TIPS(s)
  const rH = new THREE.Quaternion().setFromUnitVectors(dirOf(pos('hum'), pos('fore')), aim(0.42, 0.62, -0.66))
  const rF = new THREE.Quaternion().setFromUnitVectors(dirOf(pos('fore'), pos('hand')), aim(-0.08, 0.5, 0.86))
  const fold = { hum: rH, fore: rH.clone().invert().multiply(rF) }
  const fingers = [aim(0.1, -0.12, -0.99), aim(0.16, -0.3, -0.94), aim(0.2, -0.48, -0.86)]
  ;['f1', 'f2', 'f3'].forEach((n, i) => {
    const rK = new THREE.Quaternion().setFromUnitVectors(dirOf(pos('hand'), tips[i]), fingers[i])
    fold[n] = rF.clone().invert().multiply(rK)
  })
  FOLD[k] = fold
}

// Pose tidur & roboh: sudut tiap tulang (Euler YXZ: [x, y, z], sisi kiri; kanan dicerminkan untuk y & z)
// + tinggi akar. Pose biasa dibelokkan ke sini dengan bobot p.sleep / p.dead (slerp per tulang).
//   tidur: perut di lantai, kaki depan terjulur ke depan, kaki belakang terlipat, leher melingkar ke kanan
//          sampai kepala bersandar di lantai di samping kaki depan, ekor melingkar ke sisi yang sama (di
//          gua: melingkari peti harta di sisi kanannya)
//   roboh: tengkurap miring, kaki terkangkang, leher terjulur lunglai, sayap terkulai ke lantai
export const SLEEP = {
  y: -1.6,
  bones: {
    hips: [0, 0, 0], spine: [0, -0.08, 0], chest: [0, -0.1, 0],
    neck1: [0.95, -0.25, 0], neck2: [0.55, -0.3, 0], neck3: [0.3, -0.3, 0], neck4: [0.05, -0.25, 0], head: [-1.8, 0.2, 0], jaw: [0, 0, 0],
    tail1: [0.12, 0.15, 0], tail2: [0.06, 0.3, 0], tail3: [0.04, 0.38, 0], tail4: [0.03, 0.42, 0], tail5: [0.02, 0.42, 0], tail6: [0, 0.4, 0], tail7: [0, 0.35, 0],
    upperFl: [-1, 0, 0], lowerFl: [0.3, 0, 0], footFl: [0.6, 0, 0], upperFr: [-1, 0, 0], lowerFr: [0.3, 0, 0], footFr: [0.6, 0, 0],
    upperHl: [-0.5, 0, 0.05], lowerHl: [1.15, 0, 0], footHl: [-0.8, 0, 0], upperHr: [-0.5, 0, -0.05], lowerHr: [1.15, 0, 0], footHr: [-0.8, 0, 0],
  },
}
export const DEAD = {
  y: -1.6,
  roll: 0,
  bones: {
    hips: [0, 0, 0], spine: [0, -0.05, 0], chest: [0, -0.06, 0],
    neck1: [0.95, -0.1, 0], neck2: [0.5, -0.15, 0], neck3: [0.3, -0.15, 0], neck4: [0.05, -0.15, 0], head: [-1.8, -0.1, -0.35], jaw: [0.3, 0, 0],
    tail1: [0.12, 0.08, 0], tail2: [0.06, 0.1, 0], tail3: [0.04, 0.12, 0], tail4: [0.03, 0.12, 0], tail5: [0.02, 0.1, 0], tail6: [0, 0.08, 0], tail7: [0, 0.06, 0],
    upperFl: [-0.85, 0, 0.55], lowerFl: [0.35, 0, 0], footFl: [0.9, 0, 0], upperFr: [-0.85, 0, -0.55], lowerFr: [0.35, 0, 0], footFr: [0.9, 0, 0],
    upperHl: [-0.45, 0, 0.6], lowerHl: [1.0, 0, 0], footHl: [-0.6, 0, 0], upperHr: [-0.45, 0, -0.6], lowerHr: [1.0, 0, 0], footHr: [-0.6, 0, 0],
  },
}
const QP = new THREE.Quaternion()
function towardPreset(bones, preset, w) {
  for (const [name, [x, y, z]] of Object.entries(preset.bones)) {
    E.set(x, y, z, 'YXZ')
    QP.setFromEuler(E)
    bones[J[name]].quaternion.slerp(QP, w)
  }
}

export function applyPose(bones, rest, p) {
  const b = n => bones[J[n]]
  const t = p.t || 0
  const sleep = Math.min(1, p.sleep || 0)
  const dead = Math.min(1, p.dead || 0)
  const rear = p.rear || 0
  const crouch = p.crouch || 0
  const tuck = p.tuck || 0
  const gait = p.gait || 0
  const spread = p.spread ?? 0
  const flap = p.flap || 0
  const lie = Math.max(sleep, dead)
  const breathe = Math.sin(t * (1.3 - sleep * 0.6))

  // akar: turun saat merunduk, terayun sedikit saat melangkah, mengembang-kempis saat bernapas
  const bob = gait > 0 ? Math.abs(Math.sin(p.phase || 0)) * 0.08 * Math.min(gait, 1.5) : 0
  const root = b('root')
  const yNorm = -crouch * 0.6 + bob + breathe * 0.03
  const yLie = (dead > sleep ? DEAD.y : SLEEP.y) + breathe * 0.05 * (1 - dead)
  root.position.set(0, yNorm + (yLie - yNorm) * lie, 0)
  setRot(root, 0, 0, dead * DEAD.roll)
  // pinggul: mendongak saat berdiri di kaki belakang
  setRot(b('hips'), -rear * 0.55 + (p.bodyPitch || 0), (p.bend || 0) * 0.08, 0)
  setRot(b('spine'), -rear * 0.12 + breathe * 0.012, (p.bend || 0) * 0.14, 0)
  setRot(b('chest'), -rear * 0.1 - breathe * 0.015, (p.bend || 0) * 0.12, 0)

  // leher & kepala: angkat/toleh dibagi rata ke empat ruas
  const lift = p.neckLift || 0
  const yaw = p.neckYaw || 0
  for (const [i, n] of ['neck1', 'neck2', 'neck3', 'neck4'].entries()) setRot(b(n), -lift / 4 + rear * (i === 0 ? 0.2 : 0), yaw / 4, 0, 'YXZ')
  setRot(b('head'), (p.headPitch || 0) + lift * 0.35 - rear * 0.15, 0, 0, 'YXZ')
  setRot(b('jaw'), (p.jaw || 0) * 0.7, 0, 0)

  // ekor: goyang pelan, sapuan saat menyerang
  for (let i = 1; i <= 7; i++) {
    const sway = Math.sin(t * 1.1 - i * 0.55) * 0.05 * (1 + gait * 0.8)
    const curl = (p.tailCurl || 0) * 0.32
    const swing = (p.tailSwing || 0) * (0.06 + i * 0.03)
    const lifted = (p.tailLift || 0) * (i < 3 ? 0.15 : 0.05) + rear * (i === 1 ? 0.5 : i < 4 ? 0.12 : 0.04) - tuck * 0.04
    setRot(b(`tail${i}`), lifted, sway + curl + swing, 0)
  }

  // kaki: langkah urutan samping (kiri depan, kanan belakang, kanan depan, kiri belakang)
  const amp = gait > 1.2 ? 0.5 : 0.3
  const LEGS = [['Fl', 0], ['Hr', 0.25], ['Fr', 0.5], ['Hl', 0.75]]
  for (const [id, off] of LEGS) {
    const front = id[0] === 'F'
    const k = id[1]
    const th = (p.phase || 0) + off * Math.PI * 2
    const g = Math.min(1, gait)
    const swing = -Math.sin(th) * amp * g * (front ? 1 : 0.75)
    const liftK = Math.max(0, Math.cos(th)) * g
    const up = b(front ? `upperF${k}` : `upperH${k}`)
    const lo = b(front ? `lowerF${k}` : `lowerH${k}`)
    const ft = b(front ? `footF${k}` : `footH${k}`)
    if (front) {
      // siku sedikit menekuk ke belakang saat berdiri (kaki kokoh, tidak lurus seperti tiang); terangkat
      // saat berdiri di kaki belakang, terlipat saat terbang
      const fold = tuck + rear * 0.6
      setRot(up, swing - 0.18 - fold * 0.9 - rear * 0.2 + crouch * 0.4, 0, 0)
      setRot(lo, 0.42 + liftK * 0.7 + fold * 1.6 + crouch * 0.75, 0, 0)
      setRot(ft, -0.24 - liftK * 0.5 - fold * 0.7, 0, 0)
    } else {
      const fold = tuck * 0.9
      setRot(up, swing + rear * 0.55 - fold * 0.5 - crouch * 0.3, 0, 0)
      setRot(lo, liftK * 0.6 - fold * 1.1 + crouch * 0.55 + rear * 0.1, 0, 0)
      setRot(ft, -liftK * 0.4 + fold * 1.2 - crouch * 0.25 - rear * 0.55, 0, 0)
    }
  }

  // tidur / roboh: belokkan setiap tulang ke pose bakunya
  if (sleep > 0) towardPreset(bones, SLEEP, sleep)
  if (dead > 0) towardPreset(bones, DEAD, dead)

  // sayap: pose terlipat (FOLD, dihitung sekali) ↔ terbentang (bind), lalu kepak di bahu (sumbu z
  // badan) dengan jeda di siku & jari; roboh = terkulai ke lantai
  for (const [s, k] of SIDES) {
    const f = FOLD[k]
    const sp = Math.min(1, Math.max(0, spread))
    const raise = (p.wingRaise || 0) + flap - dead * 0.38 - sleep * 0.15
    QA.copy(f.hum).slerp(ID, sp)
    QB.setFromAxisAngle(AX_Z, s * raise)
    b(`hum${k}`).quaternion.copy(QB).multiply(QA)
    QA.copy(f.fore).slerp(ID, sp)
    QB.setFromAxisAngle(AX_Z, s * (flap * 0.35 - dead * 0.25))
    b(`fore${k}`).quaternion.copy(QA).multiply(QB)
    QB.setFromAxisAngle(AX_Z, s * flap * 0.2)
    b(`hand${k}`).quaternion.copy(QB)
    for (const n of ['f1', 'f2', 'f3']) b(`${n}${k}`).quaternion.copy(f[n]).slerp(ID, sp)
  }
}
