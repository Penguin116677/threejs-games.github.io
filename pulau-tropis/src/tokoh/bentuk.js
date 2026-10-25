import * as THREE from 'three'

// Bentuk-bentuk dasar badan karakter (bulat, bukan kotak) dan penampungnya. Satuan = satuan model
// Kenney (karakter ±0,55 tinggi; diskala 2,3 × di dunia). Semua bentuk punya normal halus — cahaya
// 4 tingkat (core/pixel.js) membuatnya tampak seperti sprite yang diarsir tangan.

// tingkat detail: 1 = penuh (pemain, penduduk), < 1 = lebih sedikit sisi (kerumunan bala tentara)
let DETAIL = 1
export function setDetail(f) {
  DETAIL = f
}
const q = (n, min = 3) => Math.max(min, Math.round(n * DETAIL))

const _m = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _v = new THREE.Vector3()
const Y = new THREE.Vector3(0, 1, 0)

// penampung badan: titik (ruang bind), normal, uv palet, tulang (satu per titik: rangka kaku),
// slot warna (dipakai elf), indeks segitiga
export const bodyData = () => ({ pos: [], nor: [], uv: [], bone: [], slot: [], index: [] })

// tambahkan geometri ke badan: ikut tulang `bone`, satu warna (uv), slot
export function add(d, geo, bone, uv, slot = 0) {
  const p = geo.attributes.position
  const n = geo.attributes.normal
  const base = d.pos.length / 3
  for (let i = 0; i < p.count; i++) {
    d.pos.push(p.getX(i), p.getY(i), p.getZ(i))
    d.nor.push(n.getX(i), n.getY(i), n.getZ(i))
    d.uv.push(uv[0], uv[1])
    d.bone.push(bone)
    d.slot.push(slot)
  }
  if (geo.index) for (let i = 0; i < geo.index.count; i++) d.index.push(base + geo.index.getX(i))
  else for (let i = 0; i < p.count; i++) d.index.push(base + i)
}

// arahkan geometri yang berdiri di sumbu +y (pangkal di titik asal) dari a ke arah b
function orient(g, a, b) {
  _q.setFromUnitVectors(Y, _v.subVectors(b, a).normalize())
  return g.applyMatrix4(_m.compose(a, _q, new THREE.Vector3(1, 1, 1)))
}

// elipsoid berpusat c (vektor / [x, y, z]) dengan jari-jari r = [rx, ry, rz]
export function ellipsoid(c, r, ws = 10, hs = 7) {
  const [x, y, z] = Array.isArray(c) ? c : [c.x, c.y, c.z]
  return new THREE.SphereGeometry(1, q(ws, 4), q(hs, 3)).scale(r[0], r[1], r[2]).translate(x, y, z)
}

// bola satuan sebagian (mulai theta0 dari kutub atas sampai kutub bawah) — kepala berhelm tanpa puncak
export function sphereFrom(ws, hs, theta0 = 0) {
  return new THREE.SphereGeometry(1, q(ws, 4), q(hs, 3), 0, Math.PI * 2, theta0, Math.PI - theta0)
}

// tabung membulat dari a ke b, jari-jari r0 (pangkal) → r1 (ujung), ujung-ujungnya setengah bola
export function capsule(a, b, r0, r1 = r0, seg = 6, cap = 2) {
  const len = a.distanceTo(b)
  const pts = [new THREE.Vector2(0, -r0)]
  for (let k = 1; k < cap; k++) {
    const t = (k / cap) * Math.PI * 0.5
    pts.push(new THREE.Vector2(r0 * Math.sin(t), -r0 * Math.cos(t)))
  }
  pts.push(new THREE.Vector2(r0, 0), new THREE.Vector2(r1, len))
  for (let k = 1; k < cap; k++) {
    const t = (k / cap) * Math.PI * 0.5
    pts.push(new THREE.Vector2(r1 * Math.cos(t), len + r1 * Math.sin(t)))
  }
  pts.push(new THREE.Vector2(0, len + r1))
  return orient(new THREE.LatheGeometry(pts, q(seg, 4)), a, b)
}

// tabung menyusuri titik-titik `pts` dengan jari-jari per titik, penampang elips: pipih `flat` ke arah
// `side` (bawaan sumbu x — jambul helm, ekor, kuncir); ujung-ujungnya ditutup
export function sweep(pts, radii, segments = 6, flat = 1, side = new THREE.Vector3(1, 0, 0)) {
  const seg = q(segments, 4)
  const P = []
  const N = []
  const I = []
  const T = new THREE.Vector3()
  const B = new THREE.Vector3()
  const ring = []
  pts.forEach((p, i) => {
    T.subVectors(pts[Math.min(i + 1, pts.length - 1)], pts[Math.max(i - 1, 0)]).normalize()
    B.crossVectors(side, T).normalize()
    const r = radii[i]
    ring.push(P.length / 3)
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2
      const cx = Math.cos(a)
      const cy = Math.sin(a)
      P.push(p.x + side.x * r * flat * cx + B.x * r * cy, p.y + side.y * r * flat * cx + B.y * r * cy, p.z + side.z * r * flat * cx + B.z * r * cy)
      _v.set(side.x * cx / flat + B.x * cy, side.y * cx / flat + B.y * cy, side.z * cx / flat + B.z * cy).normalize()
      N.push(_v.x, _v.y, _v.z)
    }
  })
  for (let i = 0; i + 1 < pts.length; i++)
    for (let k = 0; k < seg; k++) {
      const a = ring[i] + k
      const b = ring[i] + ((k + 1) % seg)
      const c = ring[i + 1] + k
      const d = ring[i + 1] + ((k + 1) % seg)
      I.push(a, c, b, b, c, d)
    }
  // tutup kedua ujung (titik pusat)
  for (const [i, sgn] of [[0, -1], [pts.length - 1, 1]]) {
    const p = pts[i]
    T.subVectors(pts[Math.min(i + 1, pts.length - 1)], pts[Math.max(i - 1, 0)]).normalize().multiplyScalar(sgn)
    const c = P.length / 3
    P.push(p.x, p.y, p.z)
    N.push(T.x, T.y, T.z)
    for (let k = 0; k < seg; k++) {
      const a = ring[i] + k
      const b = ring[i] + ((k + 1) % seg)
      if (sgn > 0) I.push(b, a, c)
      else I.push(a, b, c)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3))
  g.setIndex(I)
  return g
}

// benda putar dari profil [[jari-jari, y], …] (bawah → atas), penampang elips (sx, sz),
// phi = [mulai, panjang] untuk benda terbuka (mis. rompi yang terbuka di depan)
export function lathe(profile, seg = 10, sx = 1, sz = 1, phi = null) {
  const pts = profile.map(([r, y]) => new THREE.Vector2(Math.max(0, r), y))
  const g = phi ? new THREE.LatheGeometry(pts, q(seg, 4), phi[0], phi[1]) : new THREE.LatheGeometry(pts, q(seg, 4))
  return g.scale(sx, 1, sz)
}

// tabung / kerucut terpancung tegak (pusat alas di (x, y0, z))
export function cylinder(x, y0, z, r0, r1, h, seg = 8, open = false) {
  return new THREE.CylinderGeometry(r1, r0, h, q(seg, 4), 1, open).translate(x, y0 + h / 2, z)
}

// cincin mendatar (sabuk, lingkar mahkota, kerah bulu): jari-jari besar R, tebal r, penampang elips
// (sz = pipih depan-belakang)
export function ring(x, y, z, R, r, seg = 12, sz = 1, tube = 4) {
  return new THREE.TorusGeometry(R, r, tube, seg).rotateX(Math.PI / 2).scale(1, 1, sz).translate(x, y, z)
}

// pita (tabung terbuka tanpa tutup): sabuk, lis zirah — jauh lebih hemat daripada cincin torus
export function band(x, y, z, r, h, seg = 10, sz = 1) {
  return new THREE.CylinderGeometry(r, r, h, q(seg, 5), 1, true).scale(1, 1, sz).translate(x, y, z)
}

// pindahkan titik-titik di bawah bidang (titik p, normal n ke arah yang dipertahankan) ke bidang itu:
// memotong rambut / helm / tudung tanpa menambah segitiga (bagian yang terlipat ada di dalam kepala)
export function clip(g, p, n) {
  const pos = g.attributes.position
  const nrm = g.attributes.normal
  const nn = n.clone().normalize()
  for (let i = 0; i < pos.count; i++) {
    _v.set(pos.getX(i), pos.getY(i), pos.getZ(i))
    const d = _v.clone().sub(p).dot(nn)
    if (d >= 0) continue
    _v.addScaledVector(nn, -d)
    pos.setXYZ(i, _v.x, _v.y, _v.z)
    nrm.setXYZ(i, -nn.x, -nn.y, -nn.z)
  }
  return g
}

// lembaran melengkung dua sisi (jubah, rambut panjang, celemek): f(u, v) → titik, u = 0..1 lebar,
// v = 0..1 panjang; tebal = jarak sisi belakang (ke arah normal kedua)
export function sheet(f, nu = 4, nv = 3, thick = 0.006) {
  const pos = []
  const idx = []
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) pos.push(f(i / nu, j / nv))
  const g = new THREE.BufferGeometry()
  const P = []
  const W = nu + 1
  for (const p of pos) P.push(p.x, p.y, p.z)
  for (let j = 0; j < nv; j++)
    for (let i = 0; i < nu; i++) {
      const a = j * W + i
      idx.push(a, a + W, a + 1, a + 1, a + W, a + W + 1)
    }
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
  g.setIndex(idx)
  g.computeVertexNormals()
  // sisi kedua: digeser sedikit ke belakang, urutan segitiga dibalik
  const n = g.attributes.normal
  const P2 = []
  for (let i = 0; i < pos.length; i++) P2.push(P[i * 3] - n.getX(i) * thick, P[i * 3 + 1] - n.getY(i) * thick, P[i * 3 + 2] - n.getZ(i) * thick)
  const back = new THREE.BufferGeometry()
  back.setAttribute('position', new THREE.Float32BufferAttribute(P2, 3))
  const idx2 = []
  for (let t = 0; t < idx.length; t += 3) idx2.push(idx[t], idx[t + 2], idx[t + 1])
  back.setIndex(idx2)
  back.computeVertexNormals()
  return merge([g, back])
}

// bentuk pipih dari garis tepi 2D (perisai, bilah, bendera): tebal ke arah z, berpusat di z = 0
export function slab(points, thick, bevel = 0) {
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)))
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: thick, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 4,
  })
  g.translate(0, 0, -thick / 2)
  // ExtrudeGeometry sudah tanpa indeks (toNonIndexed hanya akan memperingatkan)
  return g.index ? g.toNonIndexed() : g
}

// gabungkan beberapa geometri (posisi + normal + indeks)
export function merge(list) {
  const P = []
  const N = []
  const I = []
  for (const g of list) {
    const base = P.length / 3
    const p = g.attributes.position
    const n = g.attributes.normal
    for (let i = 0; i < p.count; i++) {
      P.push(p.getX(i), p.getY(i), p.getZ(i))
      N.push(n.getX(i), n.getY(i), n.getZ(i))
    }
    if (g.index) for (let i = 0; i < g.index.count; i++) I.push(base + g.index.getX(i))
    else for (let i = 0; i < p.count; i++) I.push(base + i)
  }
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
  out.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3))
  out.setIndex(I)
  return out
}

export const v3 = (x, y, z) => new THREE.Vector3(x, y, z)
