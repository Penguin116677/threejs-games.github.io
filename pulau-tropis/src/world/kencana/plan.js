import { rng } from '../../core/random.js'
import {
  CITY, GATES, KERATON, ALUN, CANDI, PASAR, PURA, STREETS, island, rectDistance, segmentDistance, inRect,
} from './layout.js'
import { bridgeSpans, BRIDGE_END_Y } from './height.js'

// Rencana rinci Kepulauan Kencana: letak setiap bangunan, penghalang (collider), lantai yang bisa
// diinjak, cat jalan/sawah/lantai batu, pohon khusus, perahu, dan jaringan jalan untuk penduduk.
// Murni angka (tanpa Three.js) — bentuk 3D-nya dibuat di kingdom.js / buildings.js.

const Y = CITY.y
const FACE = { selatan: 0, timur: Math.PI / 2, utara: Math.PI, barat: -Math.PI / 2 }

export function planKencana(ground) {
  const rand = rng(8128)
  const between = (a, b) => a + (b - a) * rand()
  const pick = list => list[Math.floor(rand() * list.length)]
  const spans = bridgeSpans(ground.heightAt)

  const P = {
    spans,
    build: [], // { type, x, y, z, rot, ... }
    colliders: [], // lingkaran / kotak (lihat colliders.js)
    surfaces: [], // lantai yang bisa diinjak (lihat terrain.js setSurfaces)
    roads: [], // [ax, az, bx, bz, lebar]
    pave: [], // persegi panjang lantai batu
    lawn: [], // rumput halus
    fields: [], // sawah: { x0, z0, x1, z1 } atau { x, z, r }
    blocked: [], // jejak bangunan (tanpa pohon/rumput): { x, z, hx, hz, rot }
    trees: [], // pohon khusus { type, x, z, s }
    boats: [], // { type, x, z, rot }
    spots: [], // tempat penduduk diam: { x, z, rot, role, anim }
    paths: [], // ruas jalan tambahan untuk penduduk (di pulau kecil): [ax, az, bx, bz]
    roofs: [], // atap yang bisa dimasuki: { x, z, hx, hz, r } — r = lubang tembus pandang (m)
  }

  // --- pembantu
  const footprint = (x, z, w, d, rot) => {
    const c = Math.cos(rot)
    const s = Math.sin(rot)
    return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => [x + (u * w / 2) * c + (v * d / 2) * s, z - (u * w / 2) * s + (v * d / 2) * c])
  }
  // tinggi lantai bangunan: titik tertinggi jejaknya (fondasi menutup sisi yang lebih rendah)
  const baseY = (x, z, w, d, rot) => Math.max(...footprint(x, z, w, d, rot).map(([px, pz]) => ground.heightAt(px, pz)), ground.heightAt(x, z))
  const box = (x, z, w, d, rot, kind) => {
    P.colliders.push({ x, z, hx: w / 2, hz: d / 2, rot, kind })
  }
  const block = (x, z, w, d, rot = 0) => P.blocked.push({ x, z, hx: w / 2, hz: d / 2, rot })
  const add = b => {
    P.build.push(b)
    return b
  }
  // tembok lurus a→b (sejajar sumbu), tebal t, tinggi h
  function wall(ax, az, bx, bz, t, h, type = 'tembok', kind = 'bata', y = Y) {
    const len = Math.hypot(bx - ax, bz - az)
    if (len < 0.5) return
    const rot = Math.atan2(bx - ax, bz - az) // sumbu lokal z sepanjang tembok
    const x = (ax + bx) / 2
    const z = (az + bz) / 2
    add({ type, x, y, z, rot, len, t, h })
    box(x, z, t, len, rot, kind)
    block(x, z, t + 2, len, rot)
  }
  // ruas sisi [a, b] dikurangi celah-celah [c ± half] → potongan-potongan tembok
  function pieces(a, b, gaps) {
    const out = []
    let cur = a
    for (const [c, half] of [...gaps].sort((p, q) => p[0] - q[0])) {
      if (c - half > cur) out.push([cur, c - half])
      cur = Math.max(cur, c + half)
    }
    if (b > cur) out.push([cur, b])
    return out
  }

  // ===================================================================== tembok kota
  const WALL_T = 2.2
  const WALL_H = 5
  const TOWER = 7.5
  const towersAt = {
    utara: [-580, -490], selatan: [-630, -480], barat: [-10, 50], timur: [-20, 100],
  }
  const corners = [[CITY.x0, CITY.z0], [CITY.x1, CITY.z0], [CITY.x1, CITY.z1], [CITY.x0, CITY.z1]]
  for (const [x, z] of corners) {
    add({ type: 'menara', x, y: Y, z, rot: 0, size: TOWER, h: 7.6 })
    box(x, z, TOWER, TOWER, 0, 'bata')
    block(x, z, TOWER + 2, TOWER + 2)
  }
  const sideGates = side => GATES.filter(g => (side === 'utara' && g.z === CITY.z0) || (side === 'selatan' && g.z === CITY.z1)
    || (side === 'barat' && g.x === CITY.x0) || (side === 'timur' && g.x === CITY.x1))
  const GATE_HALF = g => (g.id === 'timur' ? 5.5 : 4.5) // lebar satu belahan candi bentar
  for (const side of ['utara', 'selatan', 'barat', 'timur']) {
    const horizontal = side === 'utara' || side === 'selatan'
    const fixed = { utara: CITY.z0, selatan: CITY.z1, barat: CITY.x0, timur: CITY.x1 }[side]
    const [a, b] = horizontal ? [CITY.x0, CITY.x1] : [CITY.z0, CITY.z1]
    const gaps = [[a, TOWER / 2], [b, TOWER / 2]]
    for (const t of towersAt[side]) {
      gaps.push([t, 3])
      const [x, z] = horizontal ? [t, fixed] : [fixed, t]
      add({ type: 'menara', x, y: Y, z, rot: 0, size: 6, h: 6.8 })
      box(x, z, 6, 6, 0, 'bata')
      block(x, z, 8, 8)
    }
    for (const g of sideGates(side)) {
      const c = horizontal ? g.x : g.z
      const half = GATE_HALF(g)
      gaps.push([c, g.w / 2 + half])
      // dua belahan candi bentar mengapit celah; sisi rata menghadap celah
      for (const sgn of [-1, 1]) {
        const off = c + sgn * (g.w / 2 + half / 2)
        const [x, z] = horizontal ? [off, fixed] : [fixed, off]
        // sumbu lokal x = sepanjang tembok; belahan kanan dicerminkan
        const rot = horizontal ? 0 : Math.PI / 2
        add({ type: 'bentar', x, y: Y, z, rot, w: half, d: 4.2, h: g.id === 'timur' ? 13 : 10.5, mirror: sgn > 0 ? (horizontal ? 1 : -1) : (horizontal ? -1 : 1) })
        box(x, z, horizontal ? half : 4.2, horizontal ? 4.2 : half, 0, 'bata')
        block(x, z, half + 1, 5.2, rot)
      }
      // penjaga di kiri-kanan celah gerbang, di sisi dalam dan luar, menghadap menjauhi tembok
      for (const sgn of [-1, 1]) {
        const off = c + sgn * (g.w / 2 - 0.9)
        for (const d of [-3.6, 3.6]) {
          const [x, z] = horizontal ? [off, fixed + d] : [fixed + d, off]
          const look = horizontal ? (d > 0 ? FACE.selatan : FACE.utara) : (d > 0 ? FACE.timur : FACE.barat)
          P.spots.push({ x, z, rot: look, role: 'penjaga', anim: 'idle' })
        }
      }
    }
    for (const [p0, p1] of pieces(a, b, gaps))
      if (horizontal) wall(p0, fixed, p1, fixed, WALL_T, WALL_H)
      else wall(fixed, p0, fixed, p1, WALL_T, WALL_H)
  }

  // ===================================================================== jalan kota & luar kota
  for (const s of STREETS) P.roads.push(s)

  // ===================================================================== keraton
  {
    const K = KERATON
    const KW = 1.2
    const KH = 3.6
    const g = K.gate
    const opening = 5
    const gateLen = 9
    // tembok keliling, celah di gerbang timur (paduraksa berdiri di celah)
    wall(K.x0, K.z0, K.x1, K.z0, KW, KH, 'tembok-dalam')
    wall(K.x0, K.z1, K.x1, K.z1, KW, KH, 'tembok-dalam')
    wall(K.x0, K.z0, K.x0, K.z1, KW, KH, 'tembok-dalam')
    wall(K.x1, K.z0, K.x1, g.z - gateLen / 2, KW, KH, 'tembok-dalam')
    wall(K.x1, g.z + gateLen / 2, K.x1, K.z1, KW, KH, 'tembok-dalam')
    add({ type: 'paduraksa', x: g.x, y: Y, z: g.z, rot: Math.PI / 2, w: gateLen, d: 5, opening, h: 15 })
    for (const sgn of [-1, 1]) {
      const z = g.z + sgn * (opening / 2 + (gateLen - opening) / 4)
      box(g.x, z, 5, (gateLen - opening) / 2, 0, 'bata')
      P.spots.push({ x: g.x + 3.4, z: g.z + sgn * 2.1, rot: FACE.timur, role: 'penjaga', anim: 'idle' })
    }
    block(g.x, g.z, 6, gateLen + 1)
    P.roofs.push({ x: g.x, z: g.z, hx: 3.5, hz: opening / 2, r: 6 })

    // pendopo agung di atas batur 1 m, tangga di depan (timur)
    const pd = { x: -628, z: 40, w: 30, d: 28, h: 1.0 }
    add({ type: 'pendopo', x: pd.x, y: Y, z: pd.z, rot: Math.PI / 2, w: pd.d, d: pd.w, h: pd.h })
    P.surfaces.push({ x: pd.x, z: pd.z, hx: pd.w / 2, hz: pd.d / 2, rot: 0, y0: Y + pd.h, y1: Y + pd.h })
    const stairW = 10
    const stairL = 3.2
    P.surfaces.push({ x: pd.x + pd.w / 2 + stairL / 2, z: pd.z, hx: stairW / 2, hz: stairL / 2, rot: -Math.PI / 2, y0: Y + 0.02, y1: Y + pd.h })
    // langkan rendah di tepi batur (kecuali celah tangga)
    const ex = pd.x + pd.w / 2
    const wx = pd.x - pd.w / 2
    const nz = pd.z - pd.d / 2
    const sz = pd.z + pd.d / 2
    for (const [ax, az, bx, bz] of [[wx, nz, ex, nz], [wx, sz, ex, sz], [wx, nz, wx, sz], [ex, nz, ex, pd.z - stairW / 2], [ex, pd.z + stairW / 2, ex, sz]]) {
      const len = Math.hypot(bx - ax, bz - az)
      const rot = Math.atan2(bx - ax, bz - az)
      box((ax + bx) / 2, (az + bz) / 2, 0.5, len, rot, 'batu')
    }
    block(pd.x, pd.z, pd.w + 2, pd.d + 2)
    P.roofs.push({ x: pd.x, z: pd.z, hx: pd.w / 2 + 1.5, hz: pd.d / 2 + 1.5, r: 10 })
    // tiang-tiang pendopo (saka guru + saka pinggir) = penghalang kecil
    for (const [cx, cz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.colliders.push({ x: pd.x + cx * 3.2, z: pd.z + cz * 3.2, radius: 0.35, kind: 'kayu' })
    for (let i = -2; i <= 2; i++)
      for (const sgn of [-1, 1]) {
        P.colliders.push({ x: pd.x + i * 6.3, z: pd.z + sgn * 12.4, radius: 0.28, kind: 'kayu' })
        // sisi depan (timur) tanpa tiang tengah: jalan masuk dari tangga
        if (Math.abs(i) < 2 && !(sgn > 0 && i === 0)) P.colliders.push({ x: pd.x + sgn * 13.4, z: pd.z + i * 6.2, radius: 0.28, kind: 'kayu' })
      }
    // raja & pengawalnya di pendopo
    P.spots.push({ x: pd.x - 9.2, z: pd.z, rot: FACE.timur, role: 'raja', anim: 'sit', y: Y + pd.h + 0.5 })
    P.spots.push({ x: pd.x - 8, z: pd.z - 3, rot: FACE.timur, role: 'penjaga', anim: 'idle', y: Y + pd.h })
    P.spots.push({ x: pd.x - 8, z: pd.z + 3, rot: FACE.timur, role: 'penjaga', anim: 'idle', y: Y + pd.h })
    for (const sgn of [-1, 1]) P.spots.push({ x: ex + stairL + 1.2, z: pd.z + sgn * 6, rot: FACE.timur, role: 'penjaga', anim: 'idle' })

    // bangsal kencana (balairung tertutup) di belakang pendopo
    add({ type: 'bangsal', x: -669, y: Y, z: 40, rot: Math.PI / 2, w: 32, d: 16, h: 1.5 })
    box(-669, 40, 16, 32, 0, 'bata')
    block(-669, 40, 18, 34)
    // meru (menara atap tumpang) di sudut belakang, bale di sudut depan
    for (const [x, z, tiers] of [[-676, 9, 9], [-676, 71, 7]]) {
      add({ type: 'meru', x, y: Y, z, rot: 0, base: 7, tiers })
      box(x, z, 7, 7, 0, 'bata')
      block(x, z, 9, 9)
    }
    for (const [x, z] of [[-647, 8], [-647, 72], [-612, 9], [-612, 71]]) {
      add({ type: 'bale', x, y: Y, z, rot: 0, w: 6, d: 6 })
      P.roofs.push({ x, z, hx: 3.5, hz: 3.5, r: 5 })
      for (const [cx, cz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.colliders.push({ x: x + cx * 2.6, z: z + cz * 2.6, radius: 0.22, kind: 'kayu' })
      block(x, z, 7, 7)
    }
    // halaman: rumput halus + jalan batu dari gerbang ke pendopo
    P.lawn.push({ x0: K.x0 + 1, z0: K.z0 + 1, x1: K.x1 - 1, z1: K.z1 - 1 })
    P.pave.push({ x0: ex, z0: g.z - 5, x1: K.x1, z1: g.z + 5 })
    P.pave.push({ x0: wx - 2, z0: nz - 2, x1: ex + 2, z1: sz + 2 })
    P.pave.push({ x0: -680, z0: 20, x1: wx, z1: 60 })
    for (const [x, z] of [[-660, 4], [-660, 76], [-626, 4], [-626, 76], [-640, 16], [-640, 64], [-686, 30], [-686, 50]])
      P.trees.push({ type: 'kamboja', x, z, s: between(0.9, 1.15) })
    // lapangan depan keraton (pagelaran) berlantai batu + umbul-umbul
    P.pave.push({ x0: K.x1, z0: K.z0, x1: ALUN.x0, z1: K.z1 })
    for (let z = K.z0 + 6; z <= K.z1 - 6; z += 12) {
      if (Math.abs(z - g.z) < 8) continue
      add({ type: 'umbul', x: K.x1 + 7, y: Y, z, rot: Math.PI / 2, h: 9, color: Math.round(z) % 3 })
      P.colliders.push({ x: K.x1 + 7, z, radius: 0.18, kind: 'kayu' })
    }
  }

  // ===================================================================== alun-alun
  {
    const A = ALUN
    P.lawn.push({ ...A })
    for (const z of [26, 54]) {
      const x = (A.x0 + A.x1) / 2
      P.trees.push({ type: 'beringin', x, z, s: 1 })
      P.colliders.push({ x, z, radius: 1.7, kind: 'pohon' })
      // pagar kurung bata rendah 12 × 12 m
      const r = 6
      for (const [ax, az, bx, bz] of [[x - r, z - r, x + r, z - r], [x - r, z + r, x + r, z + r], [x - r, z - r, x - r, z + r], [x + r, z - r, x + r, z + r]])
        wall(ax, az, bx, bz, 0.45, 1.1, 'pagar')
    }
    // penduduk bersantai di bawah beringin
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      const z = i < 3 ? 26 : 54
      P.spots.push({ x: (A.x0 + A.x1) / 2 + Math.cos(a) * 8.5, z: z + Math.sin(a) * 8.5, rot: a + Math.PI / 2, role: 'warga', anim: i % 2 ? 'sit' : 'idle' })
    }
  }

  // ===================================================================== pasar
  {
    const M = PASAR
    P.pave.push({ ...M })
    const cols = [-492, -478, -464, -450, -437]
    const rows = [55, 66, 76]
    const goods = ['buah', 'ikan', 'kain', 'sayur', 'gerabah']
    rows.forEach((z, r) => cols.forEach((x, c) => {
      if (r === 1 && c === 2) return // tengah pasar lapang (sumur)
      const rot = r === 0 ? FACE.utara : FACE.selatan
      add({ type: 'warung', x, y: Y, z, rot, color: (r * 5 + c) % 6, goods: goods[(r + c * 2) % goods.length] })
      box(x, z, 3.6, 2.2, 0, 'kayu')
      block(x, z, 4.4, 3.4)
      // penjual di belakang lapak
      const back = r === 0 ? 1.9 : -1.9
      P.spots.push({ x: x + between(-0.8, 0.8), z: z + back, rot, role: 'penjual', anim: pick(['idle', 'interact', 'interact']) })
    }))
    add({ type: 'sumur', x: -464, y: Y, z: 66, rot: 0 })
    P.colliders.push({ x: -464, z: 66, radius: 1.1, kind: 'batu' })
    for (const [x, z] of [[-497, 50], [-433, 50], [-497, 80], [-433, 80]]) P.trees.push({ type: 'mangga', x, z, s: 0.8 })
    for (let i = 0; i < 8; i++)
      P.spots.push({ x: between(M.x0 + 4, M.x1 - 4), z: pick([60.5, 71]), rot: rand() * Math.PI * 2, role: 'pembeli', anim: 'idle' })
  }

  // ===================================================================== candi
  {
    const C = CANDI
    P.pave.push({ ...C })
    // pagar batu keliling, gerbang candi bentar kecil di selatan (menghadap jalan raya)
    const gw = 6
    wall(C.x0, C.z0, C.x1, C.z0, 0.8, 1.6, 'pagar-batu', 'batu')
    wall(C.x0, C.z0, C.x0, C.z1, 0.8, 1.6, 'pagar-batu', 'batu')
    wall(C.x1, C.z0, C.x1, C.z1, 0.8, 1.6, 'pagar-batu', 'batu')
    wall(C.x0, C.z1, C.x - gw / 2 - 3, C.z1, 0.8, 1.6, 'pagar-batu', 'batu')
    wall(C.x + gw / 2 + 3, C.z1, C.x1, C.z1, 0.8, 1.6, 'pagar-batu', 'batu')
    for (const sgn of [-1, 1]) {
      const x = C.x + sgn * (gw / 2 + 1.5)
      add({ type: 'bentar', x, y: Y, z: C.z1, rot: 0, w: 3, d: 2.6, h: 6.5, mirror: sgn, stone: true })
      box(x, C.z1, 3, 2.6, 0, 'batu')
    }
    add({ type: 'candi', x: C.x, y: Y, z: C.z, rot: 0, base: 17 })
    box(C.x, C.z, 17, 17, 0, 'batu')
    block(C.x, C.z, 19, 19)
    for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      const x = C.x + dx * 21
      const z = C.z + dz * 23
      add({ type: 'candi', x, y: Y, z, rot: 0, base: 6 })
      box(x, z, 6, 6, 0, 'batu')
      block(x, z, 7, 7)
    }
    P.spots.push({ x: C.x, z: C.z + 12, rot: FACE.utara, role: 'pendeta', anim: 'sit' })
    P.spots.push({ x: C.x - 3, z: C.z + 12.5, rot: FACE.utara, role: 'warga', anim: 'sit' })
  }

  // ===================================================================== rumah-rumah di dalam tembok
  // Blok di antara jalan: [x0, x1, z0, z1, lebar jalan di x0, x1, z0, z1]
  const XS = [-694, -647, -600, -553, -504]
  const W = { '-694': 5, '-647': 5, '-600': 5, '-553': 5, '-504': 6, '-426': 5 }
  const bands = [
    { z: [-54, -29], w: [5, 5] }, { z: [-29, -5], w: [5, 6] },
    { z: [85, 110], w: [6, 5], east: true }, { z: [110, 134], w: [5, 5], east: true },
  ]
  const houseKinds = x => (x < -600 ? ['joglo', 'joglo', 'bata', 'bata', 'panggung'] : ['bata', 'bata', 'panggung', 'panggung', 'joglo', 'limasan'])
  function fillRow(x0, x1, z, rot, depthMax) {
    let x = x0 + between(0.4, 1.4)
    while (x < x1 - 5) {
      const type = pick(houseKinds(x))
      const w = type === 'joglo' ? between(8, 9.5) : type === 'panggung' ? between(5.6, 6.8) : between(6.4, 8.2)
      if (x + w > x1) break
      const d = Math.min(depthMax, type === 'joglo' ? between(7, 8) : type === 'panggung' ? between(5.4, 6.2) : between(6, 7.2))
      const cx = x + w / 2
      const cz = z + (rot === FACE.utara ? d / 2 : -d / 2)
      house(type, cx, cz, w, d, rot)
      x += w + between(1.0, 2.4)
    }
  }
  function house(type, x, z, w, d, rot) {
    const y = baseY(x, z, w, d, rot)
    add({ type: `rumah-${type}`, x, y, z, rot, w, d, roof: Math.floor(rand() * 4), wall: rand() })
    box(x, z, w + (type === 'panggung' ? 0.3 : 0.1), d + 0.1, rot, type === 'bata' || type === 'limasan' ? 'bata' : 'kayu')
    block(x, z, w + 1.5, d + 1.5, rot)
  }
  for (const band of bands) {
    const xs = band.east ? [...XS, -426] : XS
    for (let i = 0; i < xs.length - 1; i++) {
      const bx0 = xs[i] + W[xs[i]] / 2 + 0.8
      const bx1 = xs[i + 1] - W[xs[i + 1]] / 2 - 0.8
      const bz0 = band.z[0] + band.w[0] / 2 + 0.8
      const bz1 = band.z[1] - band.w[1] / 2 - 0.8
      const depth = bz1 - bz0
      if (depth >= 13) {
        fillRow(bx0, bx1, bz0, FACE.utara, (depth - 1) / 2)
        fillRow(bx0, bx1, bz1, FACE.selatan, (depth - 1) / 2)
      } else fillRow(bx0, bx1, bz0, FACE.utara, depth)
      // halaman belakang: pohon buah di tengah blok
      const mid = (bz0 + bz1) / 2
      for (let x = bx0 + 6; x < bx1 - 4; x += between(9, 15))
        P.trees.push({ type: pick(['mangga', 'pisang', 'pisang', 'kelapa']), x: x + between(-1, 1), z: mid + between(-0.6, 0.6), s: between(0.75, 1) })
    }
  }

  // ===================================================================== bendungan sawah & desa di luar tembok
  const fieldsKencana = [
    { x0: -418, z0: -175, x1: -340, z1: 22 },
    { x0: -418, z0: 58, x1: -345, z1: 225 },
    { x0: -790, z0: -175, x1: -665, z1: -72 },
    { x0: -638, z0: -185, x1: -560, z1: -75 },
  ]
  for (const f of fieldsKencana) P.fields.push(f)
  const sawahIsl = island('sawah')
  P.fields.push({ x: sawahIsl.x, z: sawahIsl.z, r: sawahIsl.r * 0.82 })

  // lahan cocok untuk rumah desa: kering, landai, tidak di jalan/sawah/bangunan lain
  const isField = (x, z) => P.fields.some(f => (f.r ? Math.hypot(x - f.x, z - f.z) < f.r : inRect(x, z, f)))
  function freeFor(x, z, w, d, rot) {
    for (const [px, pz] of [...footprint(x, z, w + 2, d + 2, rot), [x, z]]) {
      const h = ground.heightAt(px, pz)
      if (h < 2.6 || h > 16) return false
      if (P.roads.some(([ax, az, bx, bz, rw]) => segmentDistance(px, pz, ax, az, bx, bz) < rw / 2 + 0.6)) return false
      if (rectDistance(px, pz, CITY) < 6) return false
    }
    if (ground.slopeAt(x, z) > 0.25) return false
    return !P.blocked.some(b => Math.hypot(b.x - x, b.z - z) < Math.hypot(b.hx, b.hz) + Math.hypot(w, d) / 2 + 1)
  }
  // rumah di kiri-kanan jalan (menghadap jalan), sepanjang ruas a→b
  function roadside(ax, az, bx, bz, roadW, every, types, allowField = false) {
    const len = Math.hypot(bx - ax, bz - az)
    const ux = (bx - ax) / len
    const uz = (bz - az) / len
    for (let s = between(4, 10); s < len - 4; s += every + between(-2, 4))
      for (const side of [-1, 1]) {
        if (rand() < 0.22) continue
        const type = pick(types)
        const w = type === 'lumbung' ? 3.6 : type === 'panggung' ? between(5.6, 6.8) : between(6.2, 7.8)
        const d = type === 'lumbung' ? 3.6 : type === 'panggung' ? between(5.4, 6.2) : between(5.8, 7)
        const off = roadW / 2 + 1.8 + d / 2
        const x = ax + ux * s - uz * side * off
        const z = az + uz * s + ux * side * off
        // menghadap jalan: sumbu lokal +z mengarah ke jalan
        const rot = Math.atan2(uz * side, -ux * side)
        if (!allowField && isField(x, z)) continue
        if (!freeFor(x, z, w, d, rot)) continue
        house(type, x, z, w, d, rot)
      }
  }
  roadside(-420, 40, -340, 40, 7, 11, ['panggung', 'bata', 'limasan', 'panggung'], true)
  roadside(-553, 146, -553, 262, 6, 10, ['panggung', 'bata', 'limasan', 'lumbung'], true)
  roadside(-647, -64, -647, -170, 5, 12, ['panggung', 'lumbung', 'panggung'], true)
  roadside(-704, 110, -770, 110, 5, 11, ['panggung', 'bata', 'panggung'], true)
  roadside(-730, 116, -730, 196, 5, 11, ['panggung', 'lumbung', 'panggung'], true)

  // ===================================================================== pelabuhan
  {
    // tepi pantai di ujung jalan selatan: tanah turun di bawah ±2 m
    let shore = 250
    while (ground.heightAt(-553, shore) > BRIDGE_END_Y && shore < 320) shore += 0.25
    const quay = { x0: -590, z0: shore - 16, x1: -516, z1: shore - 1 }
    P.pave.push(quay)
    P.roads.push([-553, 262, -553, shore - 8, 8])
    // gudang di sisi utara dermaga
    for (const x of [-580, -526]) {
      const y = baseY(x, quay.z0 - 5, 14, 8, 0)
      add({ type: 'gudang', x, y, z: quay.z0 - 5, rot: FACE.selatan, w: 14, d: 8 })
      box(x, quay.z0 - 5, 14, 8, 0, 'kayu')
      block(x, quay.z0 - 5, 15, 9)
    }
    // tiga dermaga kayu menjorok ke laut
    const deckY = 1.75
    for (const x of [-578, -553, -528]) {
      const len = 36
      const z = shore - 2 + len / 2
      add({ type: 'dermaga', x, y: deckY, z, rot: 0, w: 4, len })
      P.surfaces.push({ x, z, hx: 2, hz: len / 2, rot: 0, y0: deckY, y1: deckY })
      block(x, z, 5, len)
      P.paths.push([x, quay.z0 + 6, x, shore - 2 + len - 2])
      // perahu bersandar di kiri-kanan dermaga
      P.boats.push({ type: 'jukung', x: x - 4.2, z: z + between(-6, 8), rot: rand() * 0.2 - 0.1 })
      P.boats.push({ type: 'jukung', x: x + 4.2, z: z + between(-8, 6), rot: Math.PI + rand() * 0.2 - 0.1 })
      P.spots.push({ x: x + between(-1, 1), z: shore + len - 6, rot: FACE.selatan, role: 'nelayan', anim: 'interact' })
    }
    P.boats.push({ type: 'jong', x: -553 + 11, z: shore + 30, rot: 0.08 })
    P.paths.push([-578, quay.z0 + 6, -528, quay.z0 + 6])
    // tumpukan peti & gentong di dermaga
    for (let i = 0; i < 10; i++) {
      const x = between(quay.x0 + 3, quay.x1 - 3)
      const z = between(quay.z0 + 1.5, quay.z0 + 4)
      if (Math.abs(x + 578) < 3 || Math.abs(x + 553) < 3 || Math.abs(x + 528) < 3) continue
      add({ type: rand() < 0.5 ? 'peti' : 'gentong', x, y: ground.heightAt(x, z), z, rot: rand() * Math.PI })
      P.colliders.push({ x, z, radius: 0.55, kind: 'kayu' })
    }
    for (let i = 0; i < 5; i++)
      P.spots.push({ x: between(quay.x0 + 4, quay.x1 - 4), z: quay.z0 + 2.2, rot: FACE.selatan, role: 'kuli', anim: pick(['interact', 'idle']) })
    P.harbor = { shore, quay }
  }

  // ===================================================================== jembatan
  for (const br of spans) {
    const s0 = Math.min(br.a, br.b) - 4
    const s1 = Math.max(br.a, br.b) + 4
    const mid = (s0 + s1) / 2
    const half = (s1 - s0) / 2
    const endY = BRIDGE_END_Y + 0.15
    const rot = br.axis === 'x' ? Math.PI / 2 : 0
    const [x, z] = br.axis === 'x' ? [mid, br.at] : [br.at, mid]
    const tA = (Math.min(br.a, br.b) - s0) / (2 * half)
    const tB = (Math.max(br.a, br.b) - s0) / (2 * half)
    const surf = { x, z, hx: br.width / 2, hz: half, rot, y0: endY, y1: endY, arch: br.rise, a0: tA, a1: tB }
    P.surfaces.push(surf)
    add({ type: br.stone ? 'jembatan-batu' : 'jembatan-kayu', x, y: 0, z, rot, len: 2 * half, w: br.width, surface: surf, a: br.a, b: br.b, axis: br.axis, at: br.at })
    // pagar/langkan di kedua sisi (penghalang tipis)
    for (const sgn of [-1, 1]) {
      const o = sgn * (br.width / 2 - 0.2)
      const [cx, cz] = br.axis === 'x' ? [mid, br.at + o] : [br.at + o, mid]
      P.colliders.push({ x: cx, z: cz, hx: 0.2, hz: half - 1, rot, kind: br.stone ? 'bata' : 'kayu' })
    }
    block(x, z, br.width + 3, 2 * half + 6, rot)
    P.roads.push(br.axis === 'x' ? [s0 - 6, br.at, s1 + 6, br.at, br.width - 1] : [br.at, s0 - 6, br.at, s1 + 6, br.width - 1])
    P.paths.push(br.axis === 'x' ? [s0 - 2, br.at, s1 + 2, br.at] : [br.at, s0 - 2, br.at, s1 + 2])
    // Jembatan Agung: gapura candi bentar di kedua ujung + umbul-umbul + lantai batu di kepala jembatan
    if (br.stone)
      for (const end of [s0 - 7, s1 + 7]) {
        for (const sgn of [-1, 1]) {
          const o = sgn * (br.width / 2 + 1.7)
          const [gx, gz] = br.axis === 'x' ? [end, br.at + o] : [br.at + o, end]
          add({ type: 'bentar', x: gx, y: ground.heightAt(gx, gz), z: gz, rot, w: 3.4, d: 3.4, h: 9, mirror: -sgn })
          box(gx, gz, 3.4, 3.4, 0, 'bata')
          P.spots.push({ x: end + (end < mid ? -2.8 : 2.8), z: br.at + sgn * (br.width / 2 - 0.4), rot: end < mid ? FACE.barat : FACE.timur, role: 'penjaga', anim: 'idle' })
        }
        const [px, pz] = br.axis === 'x' ? [end + (end < mid ? -6 : 6), br.at] : [br.at, end]
        P.pave.push({ x0: px - 9, z0: pz - 9, x1: px + 9, z1: pz + 9 })
        for (const sgn of [-1, 1]) {
          const [ux, uz] = [px + (end < mid ? -1 : 1) * 3, pz + sgn * 8]
          add({ type: 'umbul', x: ux, y: ground.heightAt(ux, uz), z: uz, rot: 0, h: 9, color: sgn > 0 ? 0 : 2 })
          P.colliders.push({ x: ux, z: uz, radius: 0.18, kind: 'kayu' })
        }
      }
  }

  // ===================================================================== Pulau Sawah: dukuh petani
  {
    const br = spans.find(b => b.id === 'sawah')
    const cz = br.b - 16 // sedikit ke utara dari ujung jembatan
    const cx = br.at
    P.pave.push({ x0: cx - 9, z0: cz - 9, x1: cx + 9, z1: cz + 9 })
    P.roads.push([cx, br.b, cx, cz, 3])
    const ring2 = [[-15, -2, FACE.timur, 'panggung'], [15, -2, FACE.barat, 'panggung'], [-14, -16, FACE.timur, 'lumbung'],
      [14, -16, FACE.barat, 'lumbung'], [-4, -22, FACE.selatan, 'panggung'], [6, -22, FACE.selatan, 'lumbung'], [-15, 12, FACE.timur, 'lumbung'], [15, 12, FACE.barat, 'panggung']]
    for (const [dx, dz, rot, type] of ring2) {
      const w = type === 'lumbung' ? 3.6 : 6.2
      const d = type === 'lumbung' ? 3.6 : 5.8
      house(type, cx + dx, cz + dz, w, d, rot)
    }
    P.trees.push({ type: 'mangga', x: cx - 4, z: cz + 4, s: 1.1 })
    // petani di sawah dan pondok jaga
    for (let i = 0; i < 10; i++) {
      const a = rand() * Math.PI * 2
      const r = between(30, 70)
      const x = sawahIsl.x + Math.cos(a) * r
      const z = sawahIsl.z + Math.sin(a) * r
      if (ground.heightAt(x, z) < 2.6) continue
      P.spots.push({ x, z, rot: rand() * Math.PI * 2, role: 'petani', anim: pick(['pickup', 'pickup', 'idle']) })
    }
    for (const [dx, dz] of [[-45, -30], [40, -45], [-30, 40]]) {
      const x = sawahIsl.x + dx
      const z = sawahIsl.z + dz
      add({ type: 'dangau', x, y: ground.heightAt(x, z), z, rot: rand() * Math.PI, w: 3, d: 3 })
      P.colliders.push({ x, z, hx: 1.5, hz: 1.5, rot: 0, kind: 'kayu' })
      block(x, z, 4, 4)
    }
    // jalan setapak di pematang
    P.roads.push([cx, cz, cx, sawahIsl.z - 70, 2.2], [cx - 50, sawahIsl.z, cx + 50, sawahIsl.z, 2.2])
  }

  // ===================================================================== Pulau Nelayan: kampung nelayan
  {
    const N = island('nelayan')
    const br = spans.find(b => b.id === 'nelayan')
    const cx = N.x
    const cz = N.z - 4
    P.pave.push({ x0: cx - 8, z0: cz - 8, x1: cx + 8, z1: cz + 8 })
    P.roads.push([br.at, br.b, br.at, cz, 3], [br.at, cz, cx, cz, 3])
    // rumah panggung melingkari lapangan, menghadap ke tengah
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2 + 0.3
      const r = 22 + (i % 2) * 9
      const x = cx + Math.cos(a) * r
      const z = cz + Math.sin(a) * r
      const rot = Math.atan2(cx - x, cz - z)
      if (!freeFor(x, z, 6.2, 5.8, rot)) continue
      house('panggung', x, z, 6.2, 5.8, rot)
    }
    // jemuran ikan, perahu di pasir, dermaga kecil di selatan
    for (let i = 0; i < 6; i++) {
      const a = Math.PI * (0.15 + i * 0.13)
      const x = cx + Math.cos(a) * 45
      const z = cz + Math.sin(a) * 45
      if (ground.heightAt(x, z) < 1.2) continue
      add({ type: 'jemuran', x, y: ground.heightAt(x, z), z, rot: a })
      P.colliders.push({ x, z, hx: 1.8, hz: 0.4, rot: a, kind: 'kayu' })
    }
    let shore = N.z
    while (ground.heightAt(N.x, shore) > BRIDGE_END_Y && shore < N.z + 140) shore += 0.25
    const len = 26
    add({ type: 'dermaga', x: N.x, y: 1.75, z: shore - 2 + len / 2, rot: 0, w: 3.2, len })
    P.surfaces.push({ x: N.x, z: shore - 2 + len / 2, hx: 1.6, hz: len / 2, rot: 0, y0: 1.75, y1: 1.75 })
    P.roads.push([N.x, cz, N.x, shore - 1, 3])
    P.paths.push([N.x, shore - 1, N.x, shore + len - 4])
    for (let i = 0; i < 4; i++) P.boats.push({ type: 'jukung', x: N.x + (i % 2 ? 3.4 : -3.4), z: shore + 6 + i * 5, rot: (i % 2 ? Math.PI : 0) + rand() * 0.2 })
    for (let i = 0; i < 5; i++) {
      const a = Math.PI * (0.9 + i * 0.22)
      let r = 40
      while (r < 120 && ground.heightAt(N.x + Math.cos(a) * r, N.z + Math.sin(a) * r) > 0.6) r += 0.5
      P.boats.push({ type: 'jukung-darat', x: N.x + Math.cos(a) * (r - 3), z: N.z + Math.sin(a) * (r - 3), rot: a + Math.PI / 2 })
    }
    for (let i = 0; i < 6; i++)
      P.spots.push({ x: cx + between(-14, 14), z: cz + between(-14, 14), rot: rand() * Math.PI * 2, role: 'nelayan', anim: pick(['interact', 'idle', 'sit']) })
  }

  // ===================================================================== Pulau Pura
  {
    const br = spans.find(b => b.id === 'pura')
    const T = PURA
    const yard = { x0: T.x - 15, z0: T.z - 13, x1: T.x + 15, z1: T.z + 13 }
    const py = ground.heightAt(T.x, T.z)
    P.pave.push(yard)
    // jalan naik dari ujung jembatan ke gerbang pura
    P.roads.push([br.b, T.z, yard.x1, T.z, 4])
    P.paths.push([yard.x1, T.z, T.x, T.z])
    const gw = 4
    wall(yard.x0, yard.z0, yard.x1, yard.z0, 0.8, 1.8, 'pagar', 'bata', py)
    wall(yard.x0, yard.z1, yard.x1, yard.z1, 0.8, 1.8, 'pagar', 'bata', py)
    wall(yard.x0, yard.z0, yard.x0, yard.z1, 0.8, 1.8, 'pagar', 'bata', py)
    wall(yard.x1, yard.z0, yard.x1, T.z - gw / 2 - 2.6, 0.8, 1.8, 'pagar', 'bata', py)
    wall(yard.x1, T.z + gw / 2 + 2.6, yard.x1, yard.z1, 0.8, 1.8, 'pagar', 'bata', py)
    for (const sgn of [-1, 1]) {
      const z = T.z + sgn * (gw / 2 + 1.3)
      add({ type: 'bentar', x: yard.x1, y: py, z, rot: Math.PI / 2, w: 2.6, d: 2.4, h: 7, mirror: -sgn })
      box(yard.x1, z, 2.4, 2.6, 0, 'bata')
    }
    for (const [dx, dz, tiers, base] of [[-8, -6, 11, 6], [-8, 6, 7, 5], [2, 7, 3, 4]]) {
      add({ type: 'meru', x: T.x + dx, y: py, z: T.z + dz, rot: 0, base, tiers })
      box(T.x + dx, T.z + dz, base, base, 0, 'bata')
    }
    add({ type: 'bale', x: T.x + 3, y: py, z: T.z - 6, rot: 0, w: 5, d: 5 })
    P.roofs.push({ x: T.x + 3, z: T.z - 6, hx: 3, hz: 3, r: 4.5 })
    for (const [cx, cz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.colliders.push({ x: T.x + 3 + cx * 2.1, z: T.z - 6 + cz * 2.1, radius: 0.2, kind: 'kayu' })
    for (const [dx, dz] of [[10, -9], [10, 9], [-13, 0]]) P.trees.push({ type: 'kamboja', x: T.x + dx, z: T.z + dz, s: 1 })
    for (let s = br.b - 6; s > yard.x1 + 4; s -= 7)
      for (const sgn of [-1, 1]) {
        const uz = T.z + sgn * 3.2
        add({ type: 'umbul', x: s, y: ground.heightAt(s, uz), z: uz, rot: 0, h: 7, color: 1 })
        P.colliders.push({ x: s, z: uz, radius: 0.15, kind: 'kayu' })
      }
    P.spots.push({ x: T.x + 1, z: T.z + 1, rot: FACE.barat, role: 'pendeta', anim: 'sit', y: py })
    P.spots.push({ x: T.x - 1, z: T.z - 2, rot: FACE.barat, role: 'warga', anim: 'sit', y: py })
  }

  // ===================================================================== kelapa di tepi jalan luar kota
  for (const [ax, az, bx, bz, w] of [[-420, 40, -340, 40, 7], [-553, 146, -553, 262, 6]]) {
    const len = Math.hypot(bx - ax, bz - az)
    for (let s = 6; s < len; s += 13)
      for (const side of [-1, 1]) {
        const t = s / len
        const x = ax + (bx - ax) * t + (az === bz ? 0 : side * (w / 2 + 1.2))
        const z = az + (bz - az) * t + (az === bz ? side * (w / 2 + 1.2) : 0)
        if (P.blocked.some(b => Math.hypot(b.x - x, b.z - z) < Math.hypot(b.hx, b.hz) + 1.5)) continue
        P.trees.push({ type: 'kelapa', x, z, s: between(0.85, 1.1) })
      }
  }

  // pohon khusus = penghalang batang (kelapa/mangga/kamboja); pisang tidak (bisa diterobos)
  for (const t of P.trees) {
    const r = { beringin: 0, kamboja: 0.3, mangga: 0.5, kelapa: 0.4, pisang: 0 }[t.type]
    if (r) P.colliders.push({ x: t.x, z: t.z, radius: r * t.s, kind: 'pohon' })
  }
  return P
}
