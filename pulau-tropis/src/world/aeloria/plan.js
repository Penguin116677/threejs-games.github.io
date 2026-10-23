import { rng } from '../../core/random.js'
import { rectDistance, inRect } from '../kencana/layout.js'
import { bridgeSpans, BRIDGE_END_Y } from '../kencana/height.js'
import {
  LANDS, TOWN, MARKET, SMITHY, TAVERN, MESS, TRAINING, FEAST, CAMPS, CITADEL, FIELDS, ORCHARDS, BRIDGES, STREETS, TRAILS, landDistance,
} from './layout.js'

// Rencana rinci Aeloria: letak setiap bangunan, penghalang, lantai yang bisa diinjak, cat jalan /
// ladang / lantai batu, pohon khusus, jaringan jalan, serta TEMPAT KEGIATAN (sites) yang dipakai
// simulasi kehidupan (kehidupan.js): pasangan tanding, lajur panahan, barisan latihan, boneka
// latihan, kursi makan & jamuan, lingkaran api unggun, panggung musik, lingkaran mengobrol, bangku,
// tenda & barak (tidur), pos jaga, kios (penjual & pembeli), landasan tempa, ladang, dapur, kedai.
// Murni angka (tanpa Three.js) — bentuk 3D-nya dibuat di kingdom.js / buildings.js.
//
// Arah: rot = rotation.y; rot 0 = menghadap +z (selatan), π = utara, π/2 = timur, −π/2 = barat.

const FACE = { selatan: 0, timur: Math.PI / 2, utara: Math.PI, barat: -Math.PI / 2 }
const facing = (x, z, tx, tz) => Math.atan2(tx - x, tz - z)

export function planAeloria(ground) {
  const rand = rng(4242)
  const between = (a, b) => a + (b - a) * rand()
  const spans = bridgeSpans(ground.heightAt, BRIDGES)

  const P = {
    spans,
    build: [], // { type, x, y, z, rot, ... }
    colliders: [],
    surfaces: [],
    roads: [], // dicat + jaringan jalan: [ax, az, bx, bz, lebar]
    paths: [], // jaringan jalan tanpa cat: [ax, az, bx, bz]
    tracks: [], // jalan setapak yang hanya dicat
    pave: [],
    dirt: [], // lapangan tanah (arena tanding)
    lawn: [],
    fields: [],
    blocked: [],
    trees: [], // pohon khusus { type, x, z, s }
    roofs: [],
    sites: [], // tempat kegiatan { type, area, x, z, slots: [{ x, z, rot, pose, via? }], cap?, ... }
    shops: [], // tempat belanja pemain untuk peta { id, name, kind, x, z }
    leisure: [], // kawasan bersantai bebas (duduk di rumput, berjalan-jalan) { area, rect }
    homes: [], // pintu rumah penduduk { x, z, rot }
  }

  // --- pembantu
  const local = (b, lx, lz) => {
    const c = Math.cos(b.rot)
    const s = Math.sin(b.rot)
    return { x: b.x + lx * c + lz * s, z: b.z - lx * s + lz * c }
  }
  const box = (x, z, w, d, rot, kind) => P.colliders.push({ x, z, hx: w / 2, hz: d / 2, rot, kind })
  const circle = (x, z, radius, kind) => P.colliders.push({ x, z, radius, kind })
  const block = (x, z, w, d, rot = 0) => P.blocked.push({ x, z, hx: w / 2, hz: d / 2, rot })
  const yAt = (x, z) => ground.heightAt(x, z)
  const add = b => {
    P.build.push(b)
    return b
  }
  const site = s => {
    P.sites.push(s)
    return s
  }
  // jejak w × d sudah dipakai bangunan lain (kotak sejajar sumbu, diputar rot kelipatan 90°)?
  const taken = []
  const overlaps = (x, z, w, d, rot, margin = 1) => {
    const swap = Math.abs(Math.sin(rot)) > 0.5
    const hx = (swap ? d : w) / 2 + margin
    const hz = (swap ? w : d) / 2 + margin
    return taken.some(t => Math.abs(t.x - x) < t.hx + hx && Math.abs(t.z - z) < t.hz + hz)
  }
  const take = (x, z, w, d, rot) => {
    const swap = Math.abs(Math.sin(rot)) > 0.5
    taken.push({ x, z, hx: (swap ? d : w) / 2, hz: (swap ? w : d) / 2 })
  }
  const onLand = (x, z, t = 0.86) => LANDS.some(l => landDistance(l, x, z) < t)
  // jarak ke jalan terdekat (setengah lebar jalan sudah dikurangkan)
  const roadGap = (x, z) => {
    let best = Infinity
    for (const [ax, az, bx, bz, w] of STREETS) {
      const vx = bx - ax
      const vz = bz - az
      const t = Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz || 1)))
      best = Math.min(best, Math.hypot(ax + vx * t - x, az + vz * t - z) - w / 2)
    }
    return best
  }

  // jejak w × d (diputar rot) tidak menyentuh jalan mana pun (sudut, tengah sisi, pusat)
  const clearOfRoads = (x, z, w, d, rot, margin = 0.6) => {
    const b = { x, z, rot }
    for (const [u, v] of [[0, 0], [-1, -1], [1, -1], [1, 1], [-1, 1], [0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const p = local(b, (u * w) / 2, (v * d) / 2)
      if (roadGap(p.x, p.z) < margin) return false
    }
    return true
  }
  // rumah penduduk: bangunan + penghalang + pintu (tempat pulang/tidur)
  function house(x, z, rot, { round = false, w = 7.5, d = 6.5, roof = Math.floor(rand() * 6) } = {}) {
    const size = round ? 7.2 : Math.max(w, d) + 1.2
    const fw = round ? 7.2 : w + 1.2
    const fd = round ? 7.2 : d + 1.4
    if (overlaps(x, z, fw, fd, rot) || !onLand(x, z, 0.85) || !clearOfRoads(x, z, fw, fd, rot)) return false
    take(x, z, round ? 7.2 : w + 1.2, round ? 7.2 : d + 1.4, rot)
    const y = Math.max(yAt(x, z), ...[[1, 1], [-1, 1], [1, -1], [-1, -1]].map(([sx, sz]) => yAt(x + sx * size / 2, z + sz * size / 2))) - 0.25
    if (round) {
      const r = 3.0
      add({ type: 'rumah-bulat', x, y, z, rot, r, roof })
      circle(x, z, r + 0.2, 'batu')
      block(x, z, 2 * r + 1, 2 * r + 1, rot)
      P.homes.push({ ...local({ x, z, rot }, 0, r + 1.2), rot })
    } else {
      add({ type: 'rumah-elf', x, y, z, rot, w, d, roof, chimney: rand() < 0.6 })
      box(x, z, w + 0.4, d + 0.4, rot, 'batu')
      block(x, z, w + 1, d + 1, rot)
      P.homes.push({ ...local({ x, z, rot }, 0, d / 2 + 1.2), rot })
    }
    return true
  }
  // lingkaran mengobrol (3–5 orang menghadap ke tengah)
  function chat(x, z, area, n = 3 + Math.floor(rand() * 3), r = 1.1) {
    const a0 = rand() * Math.PI * 2
    const slots = []
    for (let i = 0; i < n; i++) {
      const a = a0 + (i / n) * Math.PI * 2
      const sx = x + Math.cos(a) * r
      const sz = z + Math.sin(a) * r
      slots.push({ x: sx, z: sz, rot: facing(sx, sz, x, z), pose: 'chat' })
    }
    return site({ type: 'ngobrol', area, x, z, slots })
  }
  function lamp(x, z, rot = 0) {
    add({ type: 'lentera', x, y: yAt(x, z), z, rot })
    circle(x, z, 0.15, 'besi')
  }

  // kawasan yang tidak boleh ditanami pohon liar (dipakai kingdom.js) & bukan tempat bersantai bebas
  P.clear = (x, z, r = 0) => [TOWN, MESS, TRAINING, FEAST, CITADEL, ...CAMPS, ...FIELDS, ...ORCHARDS].some(rect => rectDistance(x, z, rect) < r + 6)

  // ===================================================================== jalan
  for (const s of STREETS) P.roads.push(s)
  for (const [ax, az, bx, bz] of TRAILS) {
    P.paths.push([ax, az, bx, bz])
    P.tracks.push([ax, az, bx, bz, 2.4])
  }

  // ===================================================================== Jembatan Perak + gapura
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
    add({ type: 'jembatan-perak', x, y: 0, z, rot, len: 2 * half, w: br.width, surface: surf, a: br.a, b: br.b, axis: br.axis, at: br.at })
    for (const sgn of [-1, 1]) {
      const o = sgn * (br.width / 2 - 0.2)
      P.colliders.push({ x: br.at + o, z: mid, hx: 0.2, hz: half - 1, rot, kind: 'batu' })
    }
    block(x, z, br.width + 3, 2 * half + 6, rot)
    // jalan di kedua ujung (Pulau Tropis di selatan, Aeloria di utara) + lantai jembatan
    P.roads.push([br.at, s1, br.at, s1 + 32, br.width - 1], [br.at, s0 - 12, br.at, s0, br.width - 1])
    P.paths.push([br.at, s0 - 2, br.at, s1 + 2])
    // gapura di ujung Aeloria + lantai batu putih + lentera
    const gz = s0 - 7
    add({ type: 'gapura-perak', x: br.at, y: yAt(br.at, gz), z: gz, rot: 0, w: br.width + 1 })
    for (const sgn of [-1, 1]) circle(br.at + sgn * ((br.width + 1) / 2 + 1.4), gz, 1.7, 'batu')
    P.pave.push({ x0: br.at - 11, z0: gz - 22, x1: br.at + 11, z1: gz + 3 })
    for (const sgn of [-1, 1]) {
      lamp(br.at + sgn * 7, gz - 8, sgn > 0 ? FACE.barat : FACE.timur)
      lamp(br.at + sgn * 7, gz - 18, sgn > 0 ? FACE.barat : FACE.timur)
    }
    // dua kesatria berjaga di gapura (zona damai: hanya menghadang orc / pembuat onar)
    site({ type: 'jaga', area: 'gapura', x: br.at, z: gz - 2, slots: [-1, 1].map(sgn => ({ x: br.at + sgn * 4.2, z: gz - 3, rot: FACE.selatan, pose: 'guard' })) })
    P.gateway = { x: br.at, z: gz }
  }

  // ===================================================================== Kota Aeloria
  // kios: pedagang di belakang meja, tiga tempat pembeli di depannya. Kios makanan & ramuan juga
  // melayani pemain (shop = jenis dagangan, katalognya di ekonomi.js); sisanya dagangan warga saja
  const SHOP_GOODS = new Set(['roti', 'buah', 'daging', 'madu', 'sayur', 'ikan', 'keju', 'ramuan'])
  function stall(x, y, z, rot, goods, color, area, shop = SHOP_GOODS.has(goods) ? goods : null) {
    const b = add({ type: 'kios', x, y, z, rot, color, goods })
    const c = local(b, 0, 0.6)
    box(c.x, c.z, 3.7, 1.2, rot, 'kayu')
    take(x, z, 4.6, 3.6, rot)
    return site({
      type: 'kios', area, x, z, rot, goods, shop,
      seller: { ...local(b, 0, -0.4), rot },
      slots: [-1.1, 0, 1.1].map(o => ({ ...local(b, o, 2.4), rot: rot + Math.PI, pose: 'buy' })),
      front: local(b, 0, 2.3),
    })
  }

  P.pave.push({ ...MARKET })
  // air mancur + bangku di alun-alun pasar
  const FOUNT = { x: -22, z: -646 }
  add({ type: 'air-mancur', x: FOUNT.x, y: TOWN.y, z: FOUNT.z, rot: 0, r: 3 })
  circle(FOUNT.x, FOUNT.z, 3.2, 'batu')
  take(FOUNT.x, FOUNT.z, 7, 7, 0)
  {
    const seats = []
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      const x = FOUNT.x + Math.cos(a) * 3.55
      const z = FOUNT.z + Math.sin(a) * 3.55
      seats.push({ x, z, rot: facing(FOUNT.x, FOUNT.z, x, z), pose: 'sit' })
    }
    site({ type: 'duduk', area: 'pasar', x: FOUNT.x, z: FOUNT.z, slots: seats })
  }
  // kios di keempat tepi alun-alun (menghadap ke dalam) + dua deret saling membelakangi di tengah
  // tiap petak (jalan raya & jalan pasar membagi alun-alun menjadi empat petak)
  const MARKET_STALLS = [
    [-36, -656.5, FACE.selatan, 'roti'], [-25, -656.5, FACE.selatan, 'buah'], [30, -656.5, FACE.selatan, 'kain'],
    [41, -656.5, FACE.selatan, 'bunga'], [52, -656.5, FACE.selatan, 'sayur'],
    [-36, -603.5, FACE.utara, 'daging'], [-25, -603.5, FACE.utara, 'madu'], [-14, -603.5, FACE.utara, 'keju'],
    [30, -603.5, FACE.utara, 'ramuan'], [41, -603.5, FACE.utara, 'tembikar'], [52, -603.5, FACE.utara, 'ikan'],
    [-41.5, -644, FACE.timur, 'rempah'], [-41.5, -616, FACE.timur, 'roti'],
    [61.5, -644, FACE.barat, 'madu'], [61.5, -616, FACE.barat, 'daging'],
  ]
  const ROW_GOODS = ['sayur', 'kain', 'buah', 'keranjang', 'roti', 'bunga', 'ikan', 'tembikar', 'keju', 'rempah', 'daging', 'kain', 'madu', 'ramuan']
  let gi = 0
  for (const r of [{ xs: [22, 27.5, 33, 38.5, 44], z: -645.2 }, { xs: [-11, -5.5, 0], z: -645.2 }, { xs: [-33, -27.5, -22, -16.5, -11], z: -614.6 }, { xs: [22, 27.5, 33, 38.5, 44], z: -614.6 }])
    for (const x of r.xs)
      MARKET_STALLS.push([x, r.z - 1.8, FACE.utara, ROW_GOODS[gi++ % ROW_GOODS.length]], [x, r.z + 1.8, FACE.selatan, ROW_GOODS[gi++ % ROW_GOODS.length]])
  MARKET_STALLS.forEach(([x, z, rot, goods], i) => stall(x, TOWN.y, z, rot, goods, i % 7, 'pasar'))
  // gerobak & tumpukan peti di sudut-sudut alun-alun
  for (const [x, z, rot, goods] of [[-42, -606, 0.4, 'sayur'], [59, -653, -2.6, 'buah'], [59, -607, -0.5, 'keranjang']]) {
    add({ type: 'gerobak', x, y: TOWN.y, z, rot, goods })
    box(x, z, 1.8, 2.6, rot, 'kayu')
    take(x, z, 2.4, 3, 0)
  }
  for (const [x, z] of [[-43, -655], [60, -606.5 + 5], [-43, -631 + 9]]) {
    add({ type: 'tumpukan', x, y: TOWN.y, z, rot: rand() * Math.PI })
    circle(x, z, 1.0, 'kayu')
  }
  P.shops.push({ id: 'pasar', name: 'Pasar Aeloria — makanan, minuman & ramuan', kind: 'makanan', x: 10, z: -630 })
  // lorong-lorong pasar (di depan deretan kios) supaya pembeli & pedagang tidak menembus kios
  P.paths.push([-45, -651.7, 65, -651.7], [-45, -637, 65, -637], [-45, -623, 65, -623], [-45, -608.2, 65, -608.2], [-38, -660, -38, -600], [58, -660, 58, -600])
  // lingkaran mengobrol & lentera di alun-alun
  for (const [x, z] of [[-33, -646], [52, -637], [-37, -623], [53, -622], [-6, -637]]) chat(x, z, 'pasar')
  for (const [x, z] of [[-45, -660], [65, -660], [-45, -600], [65, -600], [4, -640], [16, -620]]) lamp(x, z)

  // --- Tempa Aeloria: tiga bengkel pandai besi menghadap ke barat (lajur x = 80) + kios toko
  const forgeZ = [-650, -626, -602]
  const anvils = []
  const smithStalls = []
  forgeZ.forEach((z, i) => {
    const b = add({ type: 'tempa', x: 120, y: TOWN.y, z, rot: FACE.barat })
    take(120, z, 12, 9.4, FACE.barat)
    // tungku & cerobong, landasan, tong, roda asah: penghalang kecil
    const hearth = local(b, -2.5, -9 / 2 + 1.3)
    box(hearth.x, hearth.z, 3.4, 2.2, b.rot, 'batu')
    for (const ax of [-0.8, 2.2]) {
      const p = local(b, ax, 0.4)
      circle(p.x, p.z, 0.5, 'besi')
      // pandai besi berdiri di depan landasan (sisi depan bengkel), menghadapnya
      const stand = local(b, ax, 1.55)
      anvils.push({ ...stand, rot: b.rot + Math.PI, anvil: { x: p.x, y: TOWN.y + 1.1, z: p.z }, forge: i })
    }
    for (const [lx, lz] of [[4, -2.2], [4.2, 1.8], [1.5, -3.9]]) {
      const p = local(b, lx, lz)
      circle(p.x, p.z, 0.55, 'kayu')
    }
    // tiang bengkel
    for (const [lx, lz] of [[-5.7, -4.2], [5.7, -4.2], [-5.7, 4.2], [5.7, 4.2], [-5.7, 0], [5.7, 0]]) {
      const p = local(b, lx, lz)
      circle(p.x, p.z, 0.3, 'kayu')
    }
    P.roofs.push({ x: 120, z, hx: 4.7, hz: 6.1, r: 5 })
    // kios toko pandai besi di depan bengkel: pedang & tombak, perisai, zirah & helm
    smithStalls.push(stall(88.5, TOWN.y, z, FACE.barat, ['senjata', 'perisai', 'zirah'][i], [4, 1, 6][i], 'tempa', 'tempa'))
  })
  site({ type: 'tempa', area: 'tempa', x: 120, z: -626, slots: anvils.map(a => ({ ...a, pose: 'smith' })), stalls: smithStalls })
  P.shops.push({ id: 'tempa', name: 'Tempa Aeloria — pedang, tombak, perisai, zirah', kind: 'perlengkapan', x: smithStalls[1].front.x, z: smithStalls[1].front.z })
  P.pave.push({ x0: SMITHY.x0 - 8, z0: SMITHY.z0, x1: SMITHY.x1, z1: SMITHY.z1 })
  for (const z of [-662, -614, -590]) lamp(84, z, FACE.timur)

  // --- Kedai Daun Emas + meja di sampingnya
  {
    const b = add({ type: 'kedai', x: TAVERN.x - 10, y: TOWN.y, z: TAVERN.z + 5, rot: FACE.utara, w: 15, d: 11 })
    box(b.x, b.z, 15.4, 11.4, b.rot, 'batu')
    block(b.x, b.z, 16, 12, b.rot)
    take(b.x, b.z, 17, 13, b.rot)
    P.tavern = { x: b.x, z: b.z, door: local(b, 0, 6.8) }
    P.homes.push({ ...local(b, 0, 6.8), rot: b.rot, tavern: true })
    const seats = []
    for (const [tx, tz] of [[-106, -622], [-106, -612], [-106, -602]]) {
      add({ type: 'meja', x: tx, y: TOWN.y, z: tz, rot: 0, len: 5 })
      box(tx, tz, 5.2, 1.2, 0, 'kayu')
      take(tx, tz, 6, 3, 0)
      for (let i = 0; i < 4; i++) for (const sz of [-1, 1]) seats.push({ x: tx - 1.75 + i * 1.15, z: tz + sz * 0.95, rot: sz > 0 ? FACE.utara : FACE.selatan, pose: 'drink' })
    }
    site({ type: 'kedai', area: 'kota', x: -106, z: -612, slots: seats })
    // pemilik kedai di depan pintu
    site({ type: 'kerja', job: 'kedai', area: 'kota', x: b.x, z: b.z, slots: [{ ...local(b, 2.5, 6.2), rot: b.rot, pose: 'idle' }] })
  }

  // --- rumah-rumah di sepanjang jalan kota, menghadap jalan (yang bertabrakan dengan jalan,
  // kios, bengkel, atau rumah lain dilewati)
  const rowAlong = (x0, x1, z, rot, step = 10.5) => {
    for (let x = x0; x <= x1; x += step + between(-0.8, 1.6))
      house(x, z, rot, { round: rand() < 0.25, w: between(7, 8.8), d: between(6, 7) })
  }
  const rowDown = (z0, z1, x, rot, step = 10.5) => {
    for (let z = z0; z <= z1; z += step + between(-0.8, 1.6))
      house(x, z, rot, { round: rand() < 0.25, w: between(7, 8.8), d: between(6, 7) })
  }
  rowAlong(-146, 146, -692.5, FACE.utara) // di dalam jalan lingkar utara
  rowAlong(-146, 146, -577.5, FACE.selatan) // di dalam jalan lingkar selatan
  rowAlong(-146, -50, -641.5, FACE.selatan) // utara jalan pasar (barat)
  rowAlong(-146, -50, -618.5, FACE.utara) // selatan jalan pasar (barat)
  rowAlong(68, 146, -641.5, FACE.selatan)
  rowAlong(68, 146, -618.5, FACE.utara)
  rowDown(-688, -646, -102, FACE.timur) // sepanjang lajur barat
  rowDown(-688, -646, -88, FACE.barat)
  rowDown(-614, -582, -88, FACE.barat)
  rowDown(-688, -646, 3, FACE.barat) // sepanjang jalan raya, di utara pasar
  rowDown(-688, -646, 17, FACE.timur)
  rowDown(-596, -582, 3, FACE.barat) // … dan di selatannya
  rowDown(-596, -582, 17, FACE.timur)
  rowDown(-688, -646, 73, FACE.barat) // sepanjang lajur timur
  rowAlong(-80, -50, -666, FACE.selatan) // di belakang deretan kios utara
  rowAlong(22, 66, -666, FACE.selatan)
  rowAlong(-80, -50, -592, FACE.utara)
  rowAlong(22, 66, -592, FACE.utara)
  // lingkaran mengobrol & bangku di kota
  for (const [x, z] of [[-120, -660], [-70, -690], [40, -688], [110, -684], [-60, -585], [40, -585], [-130, -585]])
    if (!overlaps(x, z, 3, 3, 0, 0)) chat(x, z, 'kota')
  for (const [x, z] of [[-150, -700], [150, -700], [-150, -570], [150, -570], [-95, -655], [80, -605], [-95, -600], [10, -575], [10, -695]]) lamp(x + 2.5, z + 2.5)
  // sumur di tengah blok rumah (warga menimba air & mengobrol di sini)
  for (const [x, z] of [[-125, -606], [-62, -680], [44, -680], [124, -664], [-60, -583], [45, -583], [-128, -660]]) {
    if (overlaps(x, z, 3.2, 3.2, 0, 1) || roadGap(x, z) < 3) continue
    add({ type: 'sumur', x, y: TOWN.y, z, rot: rand() < 0.5 ? 0 : Math.PI / 2 })
    circle(x, z, 1.25, 'batu')
    take(x, z, 3.2, 3.2, 0)
    site({ type: 'sumur', area: 'kota', x, z, slots: [0, 1, 2].map(k => {
      const a = (k / 3) * Math.PI * 2 + 0.5
      const px = x + Math.cos(a) * 1.9
      const pz = z + Math.sin(a) * 1.9
      return { x: px, z: pz, rot: facing(px, pz, x, z), pose: k ? 'chat' : 'work' }
    }) })
  }
  // pohon perak & pohon buah di halaman antar-rumah
  for (let x = TOWN.x0 + 6; x < TOWN.x1 - 4; x += 7)
    for (let z = TOWN.z0 + 6; z < TOWN.z1 - 4; z += 7) {
      const jx = x + between(-2, 2)
      const jz = z + between(-2, 2)
      if (inRect(jx, jz, MARKET, 4) || inRect(jx, jz, SMITHY, 2) || rand() > 0.45) continue
      if (overlaps(jx, jz, 2.4, 2.4, 0, 1.2) || roadGap(jx, jz) < 2.8) continue
      P.trees.push({ type: rand() < 0.6 ? 'perak' : 'buah', x: jx, z: jz, s: between(0.75, 1.05) })
      take(jx, jz, 2.4, 2.4, 0)
    }

  // ===================================================================== Tanjung: ladang & desa
  for (const f of FIELDS) {
    P.fields.push(f)
    // pagar kayu keliling (celah di tengah sisi yang menghadap jalan)
    const sides = [[f.x0, f.z0, f.x1, f.z0], [f.x0, f.z1, f.x1, f.z1], [f.x0, f.z0, f.x0, f.z1], [f.x1, f.z0, f.x1, f.z1]]
    for (const [ax, az, bx, bz] of sides) {
      const len = Math.hypot(bx - ax, bz - az)
      const rot = Math.atan2(bx - ax, bz - az)
      for (const part of [[0, 0.42], [0.58, 1]]) {
        const cx = ax + (bx - ax) * (part[0] + part[1]) / 2
        const cz = az + (bz - az) * (part[0] + part[1]) / 2
        const l = len * (part[1] - part[0])
        add({ type: 'pagar-kayu', x: cx, y: yAt(cx, cz), z: cz, rot, len: l })
        P.colliders.push({ x: cx, z: cz, hx: 0.1, hz: l / 2, rot, kind: 'kayu' })
      }
    }
    // petani bekerja di larikan ladang (tiap 9 m)
    const slots = []
    for (let x = f.x0 + 5; x < f.x1 - 4; x += 9)
      for (let z = f.z0 + 5; z < f.z1 - 4; z += 9) slots.push({ x: x + between(-1.5, 1.5), z: z + between(-1.5, 1.5), rot: rand() * Math.PI * 2, pose: 'farm' })
    site({ type: 'ladang', area: 'ladang', x: (f.x0 + f.x1) / 2, z: (f.z0 + f.z1) / 2, rect: f, slots })
  }
  // kebun buah: pohon berbaris + pemetik
  for (const o of ORCHARDS) {
    const slots = []
    for (let x = o.x0 + 5; x < o.x1 - 3; x += 8)
      for (let z = o.z0 + 5; z < o.z1 - 3; z += 8) {
        P.trees.push({ type: 'buah', x, z, s: between(0.9, 1.1) })
        slots.push({ x: x + 1.6, z, rot: FACE.barat, pose: 'farm' })
      }
    P.lawn.push(o)
    site({ type: 'ladang', area: 'kebun', x: (o.x0 + o.x1) / 2, z: (o.z0 + o.z1) / 2, rect: o, slots })
  }
  // kincir angin, lumbung, rumah petani
  {
    add({ type: 'kincir', x: -128, y: yAt(-128, -560), z: -560, rot: FACE.timur })
    circle(-128, -560, 2.9, 'batu')
    block(-128, -560, 7, 7)
    for (const [x, z] of [[-112, -478], [132, -478], [-150, -650], [150, -620]]) {
      if (!onLand(x, z, 0.84)) continue
      add({ type: 'lumbung', x, y: yAt(x, z), z, rot: 0 })
      circle(x, z, 2.4, 'kayu')
      block(x, z, 6, 6)
    }
    for (const [x, z, rot] of [[-118, -500, FACE.timur], [138, -500, FACE.barat], [-118, -528, FACE.timur], [138, -528, FACE.barat], [-200, -608, FACE.utara], [220, -608, FACE.utara]])
      house(x, z, rot, { w: 7, d: 6 })
  }

  // ===================================================================== Balai Makan (kawasan kesatria)
  // Delapan pergola (20 × 11 m), masing-masing dua meja panjang; di lapangan tengah empat dapur +
  // meja saji tempat kesatria mengantre makanan, lalu membawanya ke kursi kosong.
  {
    const M = MESS
    const COLS = [-62, -22, 42, 82]
    const seats = []
    for (const x of COLS)
      for (const z of [-789, -741]) {
        add({ type: 'pergola', x, y: M.y, z, rot: 0, w: 20, d: 11 })
        for (let i = 0; i <= 4; i++) for (const sz of [-1, 1]) circle(x - 10 + i * 5, z + sz * 5.5, 0.2, 'batu')
        P.roofs.push({ x, z, hx: 10, hz: 5.5, r: 5 })
        for (const tz of [z - 2.5, z + 2.5]) {
          add({ type: 'meja', x, y: M.y, z: tz, rot: 0, len: 16 })
          box(x, tz, 16.2, 2.4, 0, 'kayu')
          for (let i = 0; i < 13; i++)
            for (const sz of [-1, 1]) {
              const sx = x - 8 + 1.1 + i * 1.15
              // datang dari ujung meja terdekat menyusuri bangku (tidak menembus meja)
              seats.push({ x: sx, z: tz + sz * 0.95, rot: sz > 0 ? FACE.utara : FACE.selatan, pose: 'eat', via: { x: sx < x ? x - 10.8 : x + 10.8, z: tz + sz * 1.3 } })
            }
        }
      }
    site({ type: 'makan', area: 'makan', x: 10, z: -765, slots: seats })
    // dua deret dapur + meja saji di kedua sisi jalan tengah (z −765), antrean memanjang ke arah
    // jalan: sisi utara menghadap selatan, sisi selatan menghadap utara
    for (const x of COLS)
      for (const sgn of [-1, 1]) {
        const rz = -765 + sgn * 12 // baris dapur & meja saji
        const face = sgn < 0 ? FACE.selatan : FACE.utara
        const kx = x - 4
        add({ type: 'dapur', x: kx, y: M.y, z: rz, rot: face })
        box(kx, rz, 3.6, 2.4, 0, 'batu')
        site({ type: 'kerja', job: 'masak', area: 'makan', x: kx, z: rz, slots: [{ x: kx - 1.2, z: rz - sgn * 1.8, rot: face + Math.PI, pose: 'cook' }, { x: kx + 1.0, z: rz - sgn * 1.8, rot: face + Math.PI, pose: 'cook' }] })
        // meja saji: pelayan di belakang, antrean memanjang menjauhi meja
        const sx = x + 3.5
        add({ type: 'meja-saji', x: sx, y: M.y, z: rz, rot: face })
        box(sx, rz, 4.4, 1.3, 0, 'kayu')
        const queue = []
        for (let k = 0; k < 10; k++) queue.push({ x: sx, z: rz - sgn * (1.6 + k * 0.95), rot: face + Math.PI, pose: 'queue' })
        site({ type: 'antre', area: 'makan', x: sx, z: rz, server: { x: sx, z: rz + sgn * 1.3, rot: face, pose: 'serve' }, slots: queue })
        add({ type: 'tumpukan', x: x - 8.5, y: M.y, z: rz + sgn * 0.5, rot: rand() * Math.PI })
        circle(x - 8.5, rz + sgn * 0.5, 1.0, 'kayu')
      }
    P.pave.push({ x0: M.x0, z0: M.z0, x1: M.x1, z1: M.z1 })
    // jalan setapak di antara pergola & di tepi balai
    for (const x of [-77, -42, -3, 23, 62, 97]) P.paths.push([x, M.z0, x, M.z1])
    P.paths.push([M.x0, -765, M.x1, -765], [M.x0, -729.5, M.x1, -729.5], [M.x0, -798.5, M.x1, -798.5])
    for (const [x, z] of [[-77, -740], [97, -740], [-77, -795], [97, -795], [-42, -765], [62, -765]]) lamp(x + 1.5, z)
    for (const [x, z] of [[-42, -758], [62, -758], [-3, -770], [23, -770], [-42, -772], [62, -772]]) chat(x, z, 'makan')
  }

  // ===================================================================== Lapangan Latihan
  {
    const T = TRAINING
    P.lawn.push({ x0: T.x0, z0: T.z0, x1: T.x1, z1: T.z1 })
    // arena tanding & lapangan baris-berbaris: tanah padat bekas injakan
    P.dirt.push({ x0: T.x0 + 40, z0: T.z0 + 2, x1: T.x1 - 48, z1: T.z1 - 10 }, { x0: T.x1 - 47, z0: T.z0 + 2, x1: T.x1 - 11, z1: T.z0 + 66 })
    // lajur panahan di sisi barat: sasaran menghadap timur, pemanah berdiri 22 m di depannya
    for (let z = T.z0 + 8; z <= T.z1 - 8; z += 4.2) {
      add({ type: 'sasaran', x: T.x0 + 6, y: T.y, z, rot: FACE.timur })
      box(T.x0 + 6, z, 0.4, 1.4, FACE.timur, 'kayu')
      site({ type: 'panah', area: 'latihan', x: T.x0 + 28, z, target: { x: T.x0 + 6.2, y: T.y + 1.25, z }, slots: [{ x: T.x0 + 28, z, rot: FACE.barat, pose: 'shoot' }] })
    }
    P.tracks.push([T.x0 + 34, T.z0 + 4, T.x0 + 34, T.z1 - 4, 2])
    // pasangan tanding: kisi 6 × 4,5 m di tengah lapangan
    for (let x = T.x0 + 44; x <= T.x1 - 52; x += 6)
      for (let z = T.z0 + 6; z <= T.z1 - 14; z += 4.5) {
        const jx = x + between(-0.6, 0.6)
        const jz = z + between(-0.5, 0.5)
        site({
          type: 'tanding', area: 'latihan', x: jx, z: jz,
          slots: [{ x: jx - 0.9, z: jz, rot: FACE.timur, pose: 'spar' }, { x: jx + 0.9, z: jz, rot: FACE.barat, pose: 'spar' }],
        })
      }
    // barisan latihan bersama di sisi timur: 8 × 14, pelatih di selatannya
    {
      const x0 = T.x1 - 44
      const slots = []
      for (let r = 0; r < 14; r++) for (let c = 0; c < 7; c++) slots.push({ x: x0 + c * 5, z: T.z0 + 6 + r * 4.2, rot: FACE.selatan, pose: 'drill' })
      const coach = { x: x0 + 15, z: T.z0 + 6 + 14 * 4.2 + 3, rot: FACE.utara, pose: 'coach' }
      site({ type: 'baris', area: 'latihan', x: x0 + 15, z: T.z0 + 35, slots, coach })
    }
    // boneka latihan di tepi selatan
    for (let x = T.x0 + 40; x <= T.x1 - 8; x += 6) {
      add({ type: 'boneka', x, y: T.y, z: T.z1 - 5, rot: FACE.selatan })
      circle(x, T.z1 - 5, 0.32, 'kayu')
      site({ type: 'boneka', area: 'latihan', x, z: T.z1 - 3.4, slots: [{ x, z: T.z1 - 3.3, rot: FACE.utara, pose: 'hit' }] })
    }
    // rak senjata
    for (const [x, z, rot] of [[T.x1 - 3, T.z0 + 20, FACE.barat], [T.x1 - 3, T.z0 + 60, FACE.barat], [T.x1 - 3, T.z0 + 100, FACE.barat], [T.x0 + 36, T.z0 + 2.5, FACE.selatan]]) {
      add({ type: 'rak', x, y: T.y, z, rot })
      box(x, z, 2, 0.5, rot, 'kayu')
    }
    // jalan setapak di dalam lapangan (memotong tiap 30 m) supaya kesatria sampai ke tempatnya
    for (let x = T.x0 + 40; x < T.x1; x += 30) P.paths.push([x, T.z0, x, T.z1])
    P.paths.push([T.x0, (T.z0 + T.z1) / 2, T.x1, (T.z0 + T.z1) / 2])
    for (const [x, z] of [[T.x0 + 34, T.z0 - 4], [T.x1 + 3, T.z0 - 4], [T.x0 + 34, T.z1 + 4], [T.x1 + 3, T.z1 + 4]]) lamp(x, z)
  }

  // ===================================================================== Padang Pesta
  {
    const F = FEAST
    P.lawn.push({ x0: F.x0, z0: F.z0, x1: F.x1, z1: F.z1 })
    // meja jamuan: tiga baris di selatan
    const seats = []
    for (const z of [F.z1 - 10, F.z1 - 20, F.z1 - 30])
      for (const x of [F.x0 + 22, F.x0 + 58, F.x0 + 94, F.x0 + 130, F.x0 + 166]) {
        add({ type: 'meja', x, y: F.y, z, rot: 0, len: 14, feast: true })
        box(x, z, 15.4, 2.4, 0, 'kayu')
        for (let i = 0; i < 12; i++) for (const sz of [-1, 1]) seats.push({ x: x - 7 + 0.68 + i * 1.15, z: z + sz * 0.95, rot: sz > 0 ? FACE.utara : FACE.selatan, pose: 'feast' })
      }
    site({ type: 'jamuan', area: 'pesta', x: (F.x0 + F.x1) / 2, z: F.z1 - 20, slots: seats })
    // api unggun + lingkaran tari & bangku kayu
    for (const [x, z] of [[F.x0 + 40, F.z0 + 70], [F.x0 + 100, F.z0 + 62], [F.x0 + 155, F.z0 + 72], [F.x0 + 70, F.z0 + 28], [F.x0 + 135, F.z0 + 25]]) {
      add({ type: 'api-unggun', x, y: F.y, z, rot: rand() * Math.PI })
      circle(x, z, 1.4, 'batu')
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.4
        circle(x + Math.cos(a) * 4.2, z + Math.sin(a) * 4.2, 0.5, 'kayu')
      }
      const dance = []
      const n = 14
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2
        const r = 6.3
        dance.push({ x: x + Math.cos(a) * r, z: z + Math.sin(a) * r, rot: facing(x + Math.cos(a) * r, z + Math.sin(a) * r, x, z), pose: 'dance', a, r })
      }
      const sit = []
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.4
        for (const o of [-0.7, 0.7]) {
          const px = x + Math.cos(a) * 4.2 - Math.sin(a) * o + Math.cos(a) * 0.45
          const pz = z + Math.sin(a) * 4.2 + Math.cos(a) * o + Math.sin(a) * 0.45
          sit.push({ x: px, z: pz, rot: facing(px, pz, x, z), pose: 'sit' })
        }
      }
      site({ type: 'api', area: 'pesta', x, z, slots: [...dance, ...sit], fire: { x, z } })
    }
    // panggung musik di utara padang (menghadap selatan)
    {
      const b = add({ type: 'panggung', x: (F.x0 + F.x1) / 2, y: F.y, z: F.z0 + 6, rot: FACE.selatan, w: 10, d: 5 })
      box(b.x, b.z, 10.2, 5.2, 0, 'kayu')
      site({ type: 'kerja', job: 'musik', area: 'pesta', x: b.x, z: b.z, slots: [-3, -1, 1, 3].map(o => ({ x: b.x + o, z: b.z + 0.8, rot: FACE.selatan, pose: 'play', y: F.y + 0.8 })) })
      // penonton di depan panggung
      const crowd = []
      for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) crowd.push({ x: b.x - 9 + c * 2 + (r % 2), z: b.z + 7 + r * 1.8, rot: FACE.utara, pose: 'cheer' })
      site({ type: 'nonton', area: 'pesta', x: b.x, z: b.z + 10, slots: crowd })
    }
    // kios jamuan (minuman & daging) di sisi barat padang — dilayani penduduk, bukan toko pemain
    for (const [z, goods, color] of [[F.z0 + 50, 'madu', 5], [F.z0 + 90, 'daging', 4]]) stall(F.x0 + 6, F.y, z, FACE.timur, goods, color, 'pesta')
    // panji warna-warni mengelilingi padang
    let pc = 0
    for (let x = F.x0 + 10; x < F.x1; x += 30)
      for (const z of [F.z0 + 1.5, F.z1 - 1.5]) {
        add({ type: 'panji', x, y: F.y, z, rot: z < F.z0 + 5 ? FACE.selatan : FACE.utara, color: pc++, h: 6 })
        circle(x, z, 0.15, 'kayu')
      }
    for (const [x, z] of [[F.x0 + 4, F.z1 - 40], [F.x1 - 4, F.z1 - 40], [F.x0 + 25, F.z0 + 10], [F.x1 - 25, F.z0 + 10]]) {
      add({ type: 'tumpukan', x, y: F.y, z, rot: rand() * Math.PI })
      circle(x, z, 1.0, 'kayu')
    }
    P.leisure.push({ area: 'pesta', rect: { x0: F.x0 + 12, z0: F.z0 + 14, x1: F.x1 - 12, z1: F.z1 - 48 } })
    for (let x = F.x0 + 20; x < F.x1; x += 40) P.paths.push([x, F.z0, x, F.z1])
    P.paths.push([F.x0, F.z1 - 40, F.x1, F.z1 - 40], [F.x0, F.z0 + 45, F.x1, F.z0 + 45])
    for (const [x, z] of [[F.x0 - 3, F.z0 - 3], [F.x1 + 3, F.z0 - 3], [F.x0 - 3, F.z1 + 3], [F.x1 + 3, F.z1 + 3], [F.x0 + 95, F.z1 - 40]]) lamp(x, z)
  }

  // ===================================================================== Perkemahan kesatria
  for (const c of CAMPS) {
    let k = 0
    const beds = []
    for (let z = c.z0 + 6; z <= c.z1 - 4; z += 9)
      for (let x = c.x0 + 5; x <= c.x1 - 4; x += 8.5) {
        // lorong lebar tiap empat tenda (api unggun kecil & jalan)
        if (k++ % 5 === 4) continue
        if (!onLand(x, z, 0.85)) continue
        const rot = (Math.floor((z - c.z0) / 9) % 2) ? FACE.utara : FACE.selatan
        add({ type: 'tenda', x, y: yAt(x, z), z, rot, color: (k * 3) % 7 })
        circle(x, z, 2.5, 'kain')
        block(x, z, 5.4, 5.4)
        beds.push({ ...local({ x, z, rot }, 0, 3.4), rot: rot + Math.PI, pose: 'sleep', cap: 6 })
      }
    site({ type: 'tidur', area: 'kemah', x: (c.x0 + c.x1) / 2, z: (c.z0 + c.z1) / 2, slots: beds })
    // api unggun kecil di antara tenda (duduk, makan bekal, mengobrol)
    for (let i = 0; i < 4; i++) {
      const x = c.x0 + 18 + i * ((c.x1 - c.x0 - 36) / 3)
      const z = (c.z0 + c.z1) / 2 + (i % 2 ? 9 : -9)
      if (!onLand(x, z, 0.85)) continue
      add({ type: 'api-unggun', x, y: yAt(x, z), z, rot: i, benches: false })
      circle(x, z, 1.3, 'batu')
      const ring = []
      for (let j = 0; j < 7; j++) {
        const a = (j / 7) * Math.PI * 2
        ring.push({ x: x + Math.cos(a) * 2.8, z: z + Math.sin(a) * 2.8, rot: facing(x + Math.cos(a) * 2.8, z + Math.sin(a) * 2.8, x, z), pose: 'duduk' })
      }
      site({ type: 'api', area: 'kemah', x, z, slots: ring, fire: { x, z } })
    }
    // lorong-lorong perkemahan
    for (let z = c.z0 + 1.5; z <= c.z1; z += 9) P.paths.push([c.x0, z, c.x1, z])
    P.paths.push([(c.x0 + c.x1) / 2, c.z0, (c.x0 + c.x1) / 2, c.z1])
  }

  // ===================================================================== Benteng Aeloria
  {
    const C = CITADEL
    const Y = C.y
    const WALL_T = 3
    const WALL_H = 7
    // halaman benteng: taman rumput berjalan batu (poros gerbang → istana, poros barat–timur,
    // pelataran istana, lorong di muka barak & gudang senjata)
    P.lawn.push({ x0: C.x0 + 1, z0: C.z0 + 1, x1: C.x1 - 1, z1: C.z1 - 1 })
    P.pave.push(
      { x0: 4, z0: -976, x1: 16, z1: C.z1 }, { x0: C.x0, z0: -963, x1: C.x1, z1: -957 }, { x0: -20, z0: -980, x1: 40, z1: -966 },
      { x0: C.x0 + 6, z0: -917, x1: C.x1 - 6, z1: -911 }, { x0: C.x0 + 6, z0: -1009, x1: -20, z1: -1003 }, { x0: 40, z0: -1009, x1: C.x1 - 6, z1: -1003 },
      { x0: C.x0 + 7, z0: -1009, x1: C.x0 + 13, z1: -911 }, { x0: C.x1 - 13, z0: -1009, x1: C.x1 - 7, z1: -911 },
      { x0: -73, z0: -989, x1: -67, z1: -957 }, { x0: 87, z0: -989, x1: 93, z1: -957 },
    )
    const wall = (ax, az, bx, bz) => {
      const len = Math.hypot(bx - ax, bz - az)
      if (len < 0.5) return
      const rot = Math.atan2(bx - ax, bz - az)
      const x = (ax + bx) / 2
      const z = (az + bz) / 2
      add({ type: 'tembok-elf', x, y: Y, z, rot, len, t: WALL_T, h: WALL_H })
      box(x, z, WALL_T, len, rot, 'batu')
      block(x, z, WALL_T + 2, len, rot)
    }
    const tower = (x, z, r, h) => {
      add({ type: 'menara-elf', x, y: Y - 0.5, z, rot: 0, r, h, roof: 0 })
      circle(x, z, r + 0.7, 'batu')
      block(x, z, 2 * r + 2, 2 * r + 2)
    }
    // sisi: [titik awal, titik akhir, gerbang di sisi itu]
    const sides = [
      [[C.x0, C.z1], [C.x1, C.z1], C.gates.filter(g => g.z === C.z1)],
      [[C.x0, C.z0], [C.x1, C.z0], []],
      [[C.x0, C.z0], [C.x0, C.z1], C.gates.filter(g => g.x === C.x0)],
      [[C.x1, C.z0], [C.x1, C.z1], C.gates.filter(g => g.x === C.x1)],
    ]
    for (const [[ax, az], [bx, bz], gates] of sides) {
      const horizontal = az === bz
      const a = horizontal ? ax : az
      const b = horizontal ? bx : bz
      const cuts = [[a, 5], [b, 5], ...gates.map(g => [horizontal ? g.x : g.z, g.w / 2 + 2.6])]
      // menara di tengah sisi panjang
      if (horizontal) cuts.push([(a + b) / 2 - 60, 4], [(a + b) / 2 + 60, 4])
      cuts.sort((p, q) => p[0] - q[0])
      let cur = a
      for (const [c, half] of cuts) {
        if (c - half > cur) horizontal ? wall(cur, az, c - half, az) : wall(ax, cur, ax, c - half)
        cur = Math.max(cur, c + half)
      }
      if (b > cur) horizontal ? wall(cur, az, b, az) : wall(ax, cur, ax, b)
      if (horizontal) for (const t of [(a + b) / 2 - 60, (a + b) / 2 + 60]) tower(t, az, 3, 12)
      for (const g of gates) {
        const rot = horizontal ? 0 : Math.PI / 2
        add({ type: 'gerbang-elf', x: g.x, y: Y, z: g.z, rot, w: g.w, h: 9 })
        for (const sgn of [-1, 1]) {
          const [px, pz] = horizontal ? [g.x + sgn * (g.w / 2 + 1.3), g.z] : [g.x, g.z + sgn * (g.w / 2 + 1.3)]
          box(px, pz, horizontal ? 2.6 : 3.2, horizontal ? 3.2 : 2.6, 0, 'batu')
        }
        // dua kesatria menjaga tiap gerbang (di luar), menghadap keluar
        const out = horizontal ? [0, 4] : [g.x === C.x0 ? -4 : 4, 0]
        const guardRot = horizontal ? FACE.selatan : g.x === C.x0 ? FACE.barat : FACE.timur
        site({
          type: 'jaga', area: 'benteng', x: g.x, z: g.z,
          slots: [-1, 1].map(sgn => horizontal
            ? { x: g.x + sgn * (g.w / 2 + 0.6), z: g.z + out[1], rot: guardRot, pose: 'guard' }
            : { x: g.x + out[0], z: g.z + sgn * (g.w / 2 + 0.6), rot: guardRot, pose: 'guard' }),
        })
      }
    }
    for (const [x, z] of [[C.x0, C.z0], [C.x1, C.z0], [C.x0, C.z1], [C.x1, C.z1]]) tower(x, z, 4, 15)
    // istana di utara halaman
    {
      const x = 10
      const z = C.z0 + 34
      add({ type: 'istana', x, y: Y, z, rot: FACE.selatan })
      box(x, z, 48, 32, 0, 'batu')
      block(x, z, 50, 40)
      P.palace = { x, z, door: { x, z: z + 21 } }
      site({ type: 'jaga', area: 'benteng', x, z: z + 23, slots: [-1, 1].map(sgn => ({ x: x + sgn * 4, z: z + 22.5, rot: FACE.selatan, pose: 'guard' })) })
    }
    // barak (tidur) & gudang senjata
    const beds = []
    for (const [x, z] of [[-70, -925], [-70, -995], [90, -925], [90, -995]]) {
      add({ type: 'barak', x, y: Y, z, rot: FACE.selatan, w: 30, d: 10 })
      box(x, z, 30.6, 10.6, 0, 'batu')
      block(x, z, 32, 12)
      for (const o of [-10, 0, 10]) beds.push({ x: x + o, z: z + 6.4, rot: FACE.utara, pose: 'sleep', cap: 25 })
    }
    site({ type: 'tidur', area: 'benteng', x: 10, z: -960, slots: beds })
    for (const [x, z] of [[-70, -1018], [90, -1018]]) {
      add({ type: 'gudang-senjata', x, y: Y, z, rot: FACE.selatan, w: 12, d: 8 })
      box(x, z, 12.4, 8.4, 0, 'batu')
      block(x, z, 13, 9)
    }
    // taman: pohon agung, hamparan bunga, deretan pohon perak di poros gerbang, patung & panji
    P.trees.push({ type: 'agung', x: -32, z: -940, s: 1.25 }, { type: 'agung', x: 52, z: -940, s: 1.2 })
    for (const [x, z] of [[-32, -940], [52, -940]]) circle(x, z, 1.6, 'pohon')
    for (const cx of [-32, 52])
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2
        P.trees.push({ type: 'bunga', x: cx + Math.cos(a) * 8.5, z: -940 + Math.sin(a) * 8.5, s: 1 })
      }
    for (let z = -900; z >= -970; z -= 10) for (const x of [-1, 21]) P.trees.push({ type: 'perak', x, z, s: between(0.85, 1.0) })
    for (const [x, z] of [[-16, -972], [36, -972], [-2, -903], [22, -903]]) {
      add({ type: 'patung', x, y: Y, z, rot: FACE.selatan })
      box(x, z, 2.3, 2.3, 0, 'batu')
    }
    let pc = 1
    for (const x of [-95, -55, -15, 35, 75, 115]) {
      add({ type: 'panji', x, y: Y, z: -954, rot: FACE.selatan, color: pc++, h: 7 })
      circle(x, -954, 0.15, 'kayu')
    }
    for (const [x, z] of [[-32, -926], [52, -926], [-50, -975], [70, -975], [-90, -940], [110, -940]]) chat(x, z, 'benteng')
    // jalan di dalam benteng (lurus dengan lantai batunya)
    P.paths.push(
      [10, C.z1, 10, -975], [C.x0, -960, C.x1, -960], [-70, -960, -70, -989], [90, -960, 90, -989],
      [C.x0 + 10, -914, C.x1 - 10, -914], [C.x0 + 10, -1006, -20, -1006], [40, -1006, C.x1 - 10, -1006],
      [C.x0 + 10, -1006, C.x0 + 10, -914], [C.x1 - 10, -1006, C.x1 - 10, -914],
    )
    for (const [x, z] of [[0, -900], [20, -900], [0, -945], [20, -945], [-100, -955], [120, -955], [-20, -966], [40, -966]]) lamp(x, z)
    // halaman berumput = tempat bersantai para kesatria benteng
    P.leisure.push({ area: 'benteng', rect: { x0: -60, z0: -952, x1: -5, z1: -925 } }, { area: 'benteng', rect: { x0: 25, z0: -952, x1: 80, z1: -925 } })
  }

  // ===================================================================== pantai: memandang laut & memancing
  // titik di pasir kering (tinggi ±1,8 m) di sepanjang pantai daratan utama, menghadap ke laut
  {
    const L = LANDS[0]
    const slots = []
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2 + 0.013
      const dx = Math.cos(a)
      const dz = Math.sin(a)
      for (let u = 0.8; u < 1.3; u += 0.005) {
        const x = L.x + dx * L.rx * u
        const z = L.z + dz * L.rz * u
        if (yAt(x, z) > 1.8) continue
        // bukan di kaki Jembatan Perak, bukan di dalam kawasan berbangunan
        if ((Math.abs(x - 10) < 18 && z > -470) || P.clear(x, z, 0)) break
        slots.push({ x, z, rot: Math.atan2(dx * L.rz, dz * L.rx), pose: i % 3 ? 'duduk' : 'fish' })
        break
      }
    }
    site({ type: 'pantai', area: 'pantai', x: L.x, z: L.z, slots, spread: true })
  }

  // ===================================================================== kawasan terbuka: obrolan & bangku
  // lingkaran mengobrol di tepi jalan raya & hutan (kesatria berjalan-jalan berhenti di sini), di
  // tepi lapangan latihan & padang pesta, dan di antara perkemahan
  for (let z = -720; z >= -880; z -= 40) {
    chat(-14, z + 6, 'jalan')
    chat(34, z - 6, 'jalan')
  }
  for (let z = -745; z >= -875; z -= 32) {
    chat(TRAINING.x1 + 9, z, 'latihan')
    chat(FEAST.x0 - 9, z + 14, 'pesta')
  }
  for (const c of CAMPS) for (const x of [c.x0 - 7, c.x1 + 7]) for (const z of [c.z0 + 15, c.z1 - 15]) if (onLand(x, z, 0.85)) chat(x, z, 'kemah')
  for (const [ax, az, bx, bz] of TRAILS)
    for (let t = 0.3; t < 1; t += 0.4) {
      const x = ax + (bx - ax) * t + 4
      const z = az + (bz - az) * t
      if (onLand(x, z, 0.86) && roadGap(x, z) > 2) chat(x, z, 'hutan')
    }
  // bangku batu di tepi jalan raya
  const benches = []
  for (const z of [-470, -530, -715, -805, -850]) for (const sgn of [-1, 1]) {
    const x = 10 + sgn * 7.5
    add({ type: 'bangku', x, y: yAt(x, z), z, rot: sgn > 0 ? FACE.barat : FACE.timur, len: 2.2 })
    box(x, z, 0.5, 2.2, 0, 'batu')
    for (const o of [-0.5, 0.5]) benches.push({ x: x - sgn * 0.45, z: z + o, rot: sgn > 0 ? FACE.barat : FACE.timur, pose: 'sit' })
  }
  site({ type: 'duduk', area: 'jalan', x: 10, z: -650, slots: benches })
  // lentera di sepanjang jalan raya
  for (let z = -450; z >= -880; z -= 30) for (const sgn of [-1, 1]) {
    const x = 10 + sgn * 6.2
    if (inRect(x, z, MARKET, 2) || inRect(x, z, MESS, 0)) continue
    lamp(x, z, sgn > 0 ? FACE.barat : FACE.timur)
  }

  // pohon khusus di kota & sepanjang jalan
  for (let z = -460; z >= -560; z -= 16) for (const sgn of [-1, 1]) P.trees.push({ type: 'perak', x: 10 + sgn * 9, z: z + between(-2, 2), s: between(0.9, 1.15) })
  for (let z = -710; z >= -880; z -= 18) for (const sgn of [-1, 1]) if (!inRect(10 + sgn * 10, z, MESS, 1)) P.trees.push({ type: 'perak', x: 10 + sgn * 10, z, s: between(0.85, 1.1) })

  return P
}
