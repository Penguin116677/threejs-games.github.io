import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'
import { FPS, bakeRig, bakedMatrix, attach, toBufferGeometry, boneTexture, animate, frameOf, packMatrix } from '../kencana/rig.js'
import { buatRupa, paletteTexture, handBind, HAND, SENDI, pedangGeo, perisaiGeo, busurGeo, kudaGeo, pelanaGeo, geoWarna } from '../../tokoh/rupa.js'
import { uvWarna } from '../../tokoh/palet.js'
import { artikulasi, buatGerak } from '../../tokoh/gerak.js'
import { ISLAND } from '../island.js'
import { DIVISI, PER_DIVISI, HOME_HEADING } from './layout.js'

// Bala tentara Pulau Rajawali (v0.27.0): 400 prajurit tempur milik pemain dalam 4 divisi — 100
// pemanah, 100 pemegang pedang, 100 pemegang perisai, 100 penunggang kuda — masing-masing dipimpin
// SATU komandan berkuda yang membawa panji divisinya. Pemain memerintah lewat komandan
// (komando.js): Ikuti aku, Bergerak ke titik, Formasi (barisan / kotak / lingkaran / baji), dan
// Geser kiri / kanan (bergerak melingkar mengitari titik di depan pasukan → mengepung).
//
// Gerak: tiap divisi punya "jangkar" (titik tengah formasi + arah hadap) yang berjalan menuju
// tujuannya (jalur navgrid di darat, lurus di laut); tiap prajurit menuju tempatnya sendiri di
// formasi itu, jadi barisan tetap rapi sambil berjalan dan berbelok. Di air dalam prajurit
// BERENANG (kuda juga — badan kuda terbenam, kepala & penunggang di atas air), jadi "Ikuti aku"
// ikut menyeberang laut.
//
// Gambar: rupa prajurit (tokoh/rupa.js) di atas rangka Kenney yang dipanggang (rig.js) — pejalan
// kaki bersendi (lutut & siku: jalan, lari, renang seperti pemain), penunggang di atas kuda bulat
// 8 bagian yang melangkah, berderap, dan mengayuh di air. Dua tingkat: DEKAT = model lengkap
// (paling banyak N orang terdekat), JAUH = badan kotak-kotak satu kotak per tulang (±150 segitiga,
// ikut beranimasi) — 400 prajurit tetap ringan di HP.

const SCALE = 2.3 // sama dengan prajurit pemain
const BONES = 15 // 14 tulang pejalan kaki bersendi, 15 untuk penunggang + kuda
const FADE = 0.2
const RADIUS = 0.34
const STEP = 0.45
// laju (m/s): jalan berbaris, berlari, berenang; kuda: jalan, derap, berenang
const SPEED = {
  kaki: { jalan: 1.7, lari: 5.0, renang: 2.5 },
  kuda: { jalan: 2.4, lari: 8.6, renang: 3.2 },
}
// berenang: mulai di air lebih dalam dari `depth`, berjalan lagi di bawah `exit`; titik letak
// `sink` m di bawah permukaan (pejalan kaki: air setinggi leher; kuda: setinggi punggung)
const SWIM = { kaki: { depth: 1.15, exit: 0.95, sink: 0.85 }, kuda: { depth: 1.45, exit: 1.2, sink: 1.25 } }
// jarak antarprajurit di formasi (m): ke samping, ke belakang
const GAP = { kaki: [1.7, 1.9], kuda: [2.5, 4.2] }
const FOCUS = 30 // m: titik di depan pasukan yang dikitari saat Geser kiri / kanan
const FLANK = Math.PI / 4 // sudut satu kali geser
// tingkat gambar: near = banyak model lengkap, view = jarak gambar terjauh dari kamera (m)
const LEVEL = {
  rendah: { near: 50, view: 170 },
  sedang: { near: 110, view: 240 },
  tinggi: { near: 200, view: 320 },
}
export const FORMASI = ['barisan', 'kotak', 'lingkaran', 'baji']
export const NAMA_FORMASI = { barisan: 'Barisan', kotak: 'Kotak', lingkaran: 'Lingkaran', baji: 'Baji' }

const UV = { kayu: uvWarna('kayu'), baja: uvWarna('baja'), emas: uvWarna('emas'), emasTua: uvWarna('emasTua') }
const PANJI = { hijau: 'hijau', merah: 'merah', biru: 'biru', emas: 'emas' }

const _m = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _v = new THREE.Vector3()
const Y = new THREE.Vector3(0, 1, 0)
const SIKU = SENDI.lenganBawah
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))

function stick(a, b, w, d = w) {
  const len = a.distanceTo(b)
  const g = new THREE.BoxGeometry(w, len, d)
  _q.setFromUnitVectors(Y, _v.subVectors(b, a).normalize())
  return g.applyMatrix4(_m.compose(a.clone().add(b).multiplyScalar(0.5), _q, new THREE.Vector3(1, 1, 1)))
}

// badan kotak-kotak untuk model JAUH: satu kotak (sedikit diperkecil) per tulang, seukuran titik-titik
// badan lengkap milik tulang itu, berwarna palet yang paling banyak dipakai tulang itu
function boxify(data, out) {
  const per = new Map()
  for (let i = 0; i < data.bone.length; i++) {
    const j = data.bone[i]
    let b = per.get(j)
    if (!b) per.set(j, b = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity], uv: new Map() })
    for (let k = 0; k < 3; k++) {
      b.min[k] = Math.min(b.min[k], data.pos[i * 3 + k])
      b.max[k] = Math.max(b.max[k], data.pos[i * 3 + k])
    }
    const key = `${data.uv[i * 2].toFixed(4)},${data.uv[i * 2 + 1].toFixed(4)}`
    b.uv.set(key, (b.uv.get(key) || 0) + 1)
  }
  for (const [j, b] of per) {
    let best = null
    let bestN = -1
    for (const [k, n] of b.uv) if (n > bestN) {
      best = k
      bestN = n
    }
    const [u, v] = best.split(',').map(Number)
    const size = b.max.map((m, k) => Math.max(0.01, (m - b.min[k]) * 0.88))
    const g = new THREE.BoxGeometry(...size).toNonIndexed()
    g.translate((b.min[0] + b.max[0]) / 2, (b.min[1] + b.max[1]) / 2, (b.min[2] + b.max[2]) / 2)
    const p = g.attributes.position
    const n = g.attributes.normal
    const base = out.pos.length / 3
    for (let i = 0; i < p.count; i++) {
      out.pos.push(p.getX(i), p.getY(i), p.getZ(i))
      out.nor.push(n.getX(i), n.getY(i), n.getZ(i))
      out.uv.push(u, v)
      out.bone.push(j)
      out.index.push(base + i)
    }
  }
  return out
}
const empty = () => ({ pos: [], nor: [], uv: [], bone: [], index: [] })

// ------------------------------------------------------------------- pejalan kaki (bersendi)
// klip per jenis: lengan pemegang senjata dikunci pada pose "memegang" (siku lurus), lengan lain
// ikut berayun; jalan, lari, renang = gerak bersendi (tokoh/gerak.js)
function footSpecs(kind) {
  const L = { 4: 'holding-left', [SIKU[4]]: 'bind' }
  const R = { 5: 'holding-right', [SIKU[5]]: 'bind' }
  const arm = kind === 'pemanah' ? L : kind === 'pedang' ? R : { ...L, ...R }
  return {
    idle: { clip: 'idle', hold: arm },
    walk: { clip: 'jalan', hold: arm },
    sprint: { clip: 'lari', hold: arm },
    swim: { clip: 'apung', hold: arm },
  }
}

function buildFoot(soldier, rows) {
  const clone = artikulasi(cloneSkinned(soldier.model))
  const gerak = buatGerak(clone)
  const clips = [...soldier.clips, ...gerak]
  const types = []
  const RUPA = { pemanah: 'rajaPemanah', pedang: 'rajaPedang', perisai: 'rajaPerisai' }
  for (const kind of ['pemanah', 'pedang', 'perisai']) {
    const rig = bakeRig(clone, clips, rows, footSpecs(kind), { fresh: true })
    const { row } = rig.table.idle
    const handAt = j => handBind(j).applyMatrix4(bakedMatrix(rows, row, SIKU[j]))
    const near = buatRupa(RUPA[kind], 0, { ringan: true, sendi: true })
    const far = boxify(near, empty())
    // senjata (sama untuk kedua tingkat gambar; bentuknya kecil)
    const weapons = []
    if (kind === 'pemanah') {
      const h = handAt(4)
      weapons.push([geoWarna(busurGeo()).translate(h.x, h.y, h.z), SIKU[4]])
    } else if (kind === 'pedang') {
      const h = handAt(5)
      weapons.push([geoWarna(pedangGeo()).applyMatrix4(_m.makeRotationX(0.25)).translate(h.x, h.y + 0.01, h.z), SIKU[5]])
    } else {
      // perisai layang besar di depan badan + pedang pendek di tangan kanan
      const l = handAt(4)
      weapons.push([geoWarna(perisaiGeo('merahTua', 1.35)).translate(l.x + 0.01, l.y - 0.05, l.z + 0.06), SIKU[4]])
      const h = handAt(5)
      weapons.push([geoWarna(pedangGeo()).applyMatrix4(_m.makeRotationX(0.25)).translate(h.x, h.y + 0.01, h.z), SIKU[5]])
    }
    for (const [g, j] of weapons) {
      attach(near, g.clone(), rows, row, j, null)
      attach(far, g, rows, row, j, null)
    }
    types.push({ id: kind, mounted: false, near, far, table: rig.table })
  }
  const stride = n => gerak.find(c => c.name === n).userData.langkah * SCALE
  return { types, gait: { walk: stride('jalan') * 1.15, sprint: stride('lari') * 1.35 } }
}

// ------------------------------------------------------------------- penunggang + kuda
// Titik putar bagian-bagian kuda (rangka kuda Kenney "Prototype Kit", CC0; menghadap −x) — sama
// dengan pasukan.js. Bentuk bagian = kudaGeo (tokoh/rupa.js).
function horseRig() {
  const horse = new THREE.Object3D()
  const node = (name, parent, x, y, z) => {
    const o = new THREE.Object3D()
    o.name = name
    o.position.set(x, y, z)
    parent.add(o)
    return o
  }
  const torso = node('torso', horse, -0.05, 0.25, 0)
  node('leg-back-left', torso, 0.2875, 0.0625, 0.09375)
  node('leg-back-right', torso, 0.2875, 0.0625, -0.09375)
  node('leg-front-left', torso, -0.1875, 0.0625, 0.09375)
  node('leg-front-right', torso, -0.1875, 0.0625, -0.09375)
  node('head', node('neck', torso, -0.18655853, 0.172996834, 0), -0.048938293, 0.189382941, 0)
  node('tail', torso, 0.317524046, 0.23125, 0)
  return horse
}
const PARTS = ['torso', 'leg-back-left', 'leg-back-right', 'leg-front-left', 'leg-front-right', 'neck', 'head', 'tail']
// langkah kuda: lama satu putaran (detik), banyak bingkai, ayunan kaki (radian), fase tiap kaki
// [belakang kiri, belakang kanan, depan kiri, depan kanan], naik-turun badan, angguk badan
const HORSE_GAITS = {
  idle: { cycle: 3, swing: 0, phase: [0, 0, 0, 0], bob: 0, rock: 0 },
  walk: { cycle: 1.2, swing: 0.32, phase: [0, 0.5, 0.25, 0.75], bob: 0.012, rock: 0.02 },
  gallop: { cycle: 0.6, swing: 0.62, phase: [0, 0.1, 0.5, 0.6], bob: 0.035, rock: 0.07 },
  swim: { cycle: 1.4, swing: 0.5, phase: [0, 0.5, 0.5, 0], bob: 0.01, rock: 0, pitch: -0.12, neck: -0.25 },
}
// panjang langkah kuda per putaran (m, setelah skala)
const HORSE_STRIDE = { walk: 2.0, gallop: 5.2, swim: 2.6 }

function bakeMounted(clone, clips, rows) {
  const riderRows = []
  const tmp = bakeRig(clone, clips, riderRows, { drive: { clip: 'drive' } })
  const { skeleton } = tmp
  const horse = horseRig()
  const place = new THREE.Matrix4().compose(new THREE.Vector3(), new THREE.Quaternion().setFromAxisAngle(Y, Math.PI / 2), new THREE.Vector3(1, 1, 1))
  const nodes = {}
  horse.traverse(o => {
    nodes[o.name] = o
  })
  const rest = {}
  for (const n of PARTS) rest[n] = { q: nodes[n].quaternion.clone(), p: nodes[n].position.clone() }
  const relWorld = name => {
    horse.updateMatrixWorld(true)
    return place.clone().multiply(_m.copy(horse.matrixWorld).invert().multiply(nodes[name].matrixWorld))
  }
  const restWorld = PARTS.map(relWorld)
  const restInv = restWorld.map(m => m.clone().invert())
  const backY = 0.25 + 0.312
  const hip = new THREE.Vector3(0, 0.17625, -0.02375).applyMatrix4(bakedMatrix(riderRows, tmp.table.drive.row, 3))
  const seat = new THREE.Matrix4().makeTranslation(0, backY + 0.035 - hip.y, -0.02 - hip.z)
  const ZA = new THREE.Vector3(0, 0, 1)
  const table = {}
  const rider = new THREE.Matrix4()
  for (const [key, G] of Object.entries(HORSE_GAITS)) {
    const n = Math.round(G.cycle * FPS)
    table[key] = { row: rows.length, n, loop: true }
    for (let f = 0; f < n; f++) {
      const u = f / n
      const ph = u * Math.PI * 2
      for (const name of PARTS) {
        nodes[name].quaternion.copy(rest[name].q)
        nodes[name].position.copy(rest[name].p)
      }
      // badan: naik-turun dua kali per putaran + mengangguk (sumbu z kuda: + = moncong turun)
      nodes.torso.position.y += G.bob * Math.cos(ph * 2)
      nodes.torso.quaternion.multiply(_q.setFromAxisAngle(ZA, (G.pitch || 0) + G.rock * Math.sin(ph)))
      // kaki berayun maju-mundur (+ = telapak ke belakang)
      for (let k = 0; k < 4; k++) {
        const a = G.swing * Math.sin(ph - G.phase[k] * Math.PI * 2)
        nodes[PARTS[1 + k]].quaternion.multiply(_q.setFromAxisAngle(ZA, a))
      }
      // leher & kepala: bernapas saat diam, mengangguk seirama langkah; di air terangkat
      const breath = key === 'idle' ? 0.07 * Math.sin(ph) : 0.05 * Math.sin(ph * 2 + 0.6)
      nodes.neck.quaternion.multiply(_q.setFromAxisAngle(ZA, (G.neck || 0) + breath))
      nodes.head.quaternion.multiply(_q.setFromAxisAngle(ZA, (key === 'idle' ? 0.06 * Math.sin(ph + 0.8) : 0.04 * Math.sin(ph * 2 + 1.2)) - (G.neck || 0) * 0.5))
      nodes.tail.quaternion.multiply(_q.setFromAxisAngle(Y, (key === 'idle' ? 0.3 : 0.18) * Math.sin(ph * 2)))
      nodes.tail.quaternion.multiply(_q.setFromAxisAngle(ZA, key === 'gallop' ? -0.35 : 0))
      const frame = new Float32Array(BONES * 12)
      const torsoDelta = relWorld('torso').multiply(restInv[0])
      const rf = riderRows[tmp.table.drive.row + (key === 'idle' ? f % tmp.table.drive.n : 0)]
      for (let j = 0; j < 7; j++) {
        rider.set(rf[j * 12], rf[j * 12 + 1], rf[j * 12 + 2], rf[j * 12 + 3], rf[j * 12 + 4], rf[j * 12 + 5], rf[j * 12 + 6], rf[j * 12 + 7], rf[j * 12 + 8], rf[j * 12 + 9], rf[j * 12 + 10], rf[j * 12 + 11], 0, 0, 0, 1)
        packMatrix(torsoDelta.clone().multiply(seat).multiply(rider), frame, j * 12)
      }
      PARTS.forEach((name, k) => packMatrix(relWorld(name).multiply(restInv[k]), frame, (7 + k) * 12))
      rows.push(frame)
    }
  }
  for (const name of PARTS) {
    nodes[name].quaternion.copy(rest[name].q)
    nodes[name].position.copy(rest[name].p)
  }
  const row0 = table.idle.row
  const hand = HAND[5].clone().applyMatrix4(skeleton.boneInverses[5].clone().invert()).applyMatrix4(bakedMatrix(rows, row0, 5))
  return { table, hand }
}

function buildMounted(soldier, rows) {
  const clone = cloneSkinned(soldier.model)
  const mounted = bakeMounted(clone, soldier.clips, rows)
  const { row } = mounted.table.idle
  const types = []
  const make = (id, rupa, arg, horseCols, cloth, weapon) => {
    const near = buatRupa(rupa, arg, { ringan: true })
    const far = boxify(near, empty())
    const horse = kudaGeo(...horseCols)
    horse.forEach((g, k) => {
      const j = 7 + k
      g.applyMatrix4(bakedMatrix(rows, row, j))
      // kuda jauh: satu kotak per bagian
      g.computeBoundingBox()
      const bb = g.boundingBox
      const size = bb.getSize(new THREE.Vector3()).multiplyScalar(0.9)
      const c = bb.getCenter(new THREE.Vector3())
      const { uv } = g.attributes
      const box = new THREE.BoxGeometry(size.x, size.y, size.z).translate(c.x, c.y, c.z).toNonIndexed()
      const ua = new Float32Array(box.attributes.position.count * 2)
      for (let i = 0; i < ua.length; i += 2) {
        ua[i] = uv.getX(0)
        ua[i + 1] = uv.getY(0)
      }
      box.setAttribute('uv', new THREE.BufferAttribute(ua, 2))
      attach(near, g, rows, row, j, null)
      attach(far, box, rows, row, j, null)
    })
    for (const dst of [near, far]) attach(dst, pelanaGeo(cloth).applyMatrix4(bakedMatrix(rows, row, 7)), rows, row, 7, null)
    const h = mounted.hand
    const parts = []
    if (weapon === 'tombak') {
      const a = new THREE.Vector3(h.x, h.y - 0.4, h.z - 0.08)
      const b = new THREE.Vector3(h.x, h.y + 1.6, h.z + 0.28)
      parts.push([stick(a, b, 0.032), UV.kayu])
      const tip = b.clone().add(_v.subVectors(b, a).normalize().multiplyScalar(0.14))
      parts.push([stick(b, tip, 0.06, 0.02), UV.baja])
    } else {
      // panji komandan: tiang tinggi + bendera sewarna divisinya
      const a = new THREE.Vector3(h.x, h.y - 0.3, h.z)
      const b = new THREE.Vector3(h.x, h.y + 2.1, h.z)
      parts.push([stick(a, b, 0.035), UV.emasTua])
      parts.push([new THREE.BoxGeometry(0.012, 0.5, 0.42).translate(h.x, h.y + 1.78, h.z - 0.22), uvWarna(weapon)])
      parts.push([new THREE.BoxGeometry(0.014, 0.07, 0.42).translate(h.x, h.y + 2.0, h.z - 0.22), UV.emas])
      parts.push([new THREE.ConeGeometry(0.05, 0.14, 4).translate(h.x, h.y + 2.17, h.z), UV.emas])
    }
    for (const [g, uv] of parts) {
      attach(near, g.clone(), rows, row, 5, uv)
      attach(far, g, rows, row, 5, uv)
    }
    types.push({ id, mounted: true, near, far, table: mounted.table })
  }
  make('kavaleri', 'rajaKavaleri', 0, ['samak', 'rambutHitam', 'hitam'], 'merahTua', 'tombak')
  for (const d of DIVISI) make(`komandan-${d.id}`, 'rajaKomandan', PANJI[d.panji], ['putihKain', 'kelabuKain', 'bajaGelap'], d.panji, PANJI[d.panji])
  return types
}

// ------------------------------------------------------------------- formasi
// tempat tiap prajurit relatif terhadap jangkar: { x: ke kanan, z: ke depan, h: arah hadap tambahan }
// + tempat komandan. Bagian depan formasi di z > 0.
export function formationSlots(name, n, mounted) {
  const [gx, gz] = GAP[mounted ? 'kuda' : 'kaki']
  const out = []
  let cmd = { x: 0, z: 0, h: 0 }
  if (name === 'kotak' || name === 'barisan') {
    const cols = name === 'kotak' ? Math.ceil(Math.sqrt(n)) : Math.min(n, mounted ? 20 : 25)
    const rowsN = Math.ceil(n / cols)
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols)
      const c = i % cols
      const inRow = r === rowsN - 1 ? n - r * cols : cols
      out.push({ x: (c - (inRow - 1) / 2) * gx, z: ((rowsN - 1) / 2 - r) * gz, h: 0 })
    }
    cmd = { x: 0, z: ((rowsN - 1) / 2) * gz + gz * 1.6 + 1.5, h: 0 }
  } else if (name === 'baji') {
    // ujung tombak di depan: baris k berisi 2k+1 orang (1 + 3 + … + 19 = 100)
    let k = 0
    let left = n
    const rowsN = Math.ceil(Math.sqrt(n))
    while (left > 0) {
      const m = Math.min(left, 2 * k + 1)
      for (let c = 0; c < m; c++) out.push({ x: (c - (m - 1) / 2) * gx, z: ((rowsN - 1) / 2 - k) * gz, h: 0 })
      left -= m
      k++
    }
    cmd = { x: 0, z: ((rowsN - 1) / 2) * gz + gz * 1.4 + 1.5, h: 0 }
  } else {
    // lingkaran: cincin-cincin menghadap ke luar, komandan di tengah
    const spacing = gx * 1.1
    let r = Math.max(4, (n * spacing) / (2 * Math.PI) / 2.2)
    let left = n
    const rings = []
    while (left > 0) {
      const m = Math.min(left, Math.max(6, Math.floor((2 * Math.PI * r) / spacing)))
      rings.push({ r, m })
      left -= m
      r += gz
    }
    // cincin terluar diisi lebih dulu (cincin terakhir dihitung paling besar)
    for (const { r: rr, m } of rings.reverse())
      for (let c = 0; c < m; c++) {
        const a = (c / m) * Math.PI * 2
        out.push({ x: Math.sin(a) * rr, z: Math.cos(a) * rr, h: -a })
      }
    cmd = { x: 0, z: 0, h: 0 }
  }
  // lebar & panjang formasi (untuk menata divisi yang mengikuti pemain)
  let w = 0
  let d = 0
  for (const s of out) {
    w = Math.max(w, Math.abs(s.x))
    d = Math.max(d, Math.abs(s.z))
  }
  return { slots: out, cmd, halfW: w + gx / 2, halfD: Math.max(d + gz / 2, Math.abs(cmd.z) + 1) }
}

// ===================================================================== bala tentara
export function createBala({ ground, colliders, nav, quality, soldier }) {
  const group = new THREE.Group()
  group.name = 'bala-rajawali'
  const L = LEVEL[quality.level] ?? LEVEL.sedang
  const rows = []
  const foot = buildFoot(soldier, rows)
  const mountedTypes = buildMounted(soldier, rows)
  const types = [...foot.types, ...mountedTypes] // 0 pemanah, 1 pedang, 2 perisai, 3 kavaleri, 4..7 komandan
  const bones = boneTexture(rows, BONES)
  const map = paletteTexture()

  // --- prajurit & divisi
  const _s = { x: 0, z: 0, h: 0 }
  const agents = []
  const divisions = []
  const typeOf = { pemanah: 0, pedang: 1, perisai: 2, kavaleri: 3 }
  DIVISI.forEach((def, di) => {
    const mounted = def.jenis === 'kavaleri'
    const div = {
      idx: di, def, mounted, formasi: 'kotak', mode: 'rumah',
      ax: def.home.x, az: def.home.z, ah: HOME_HEADING, // jangkar
      goal: { x: def.home.x, z: def.home.z, h: HOME_HEADING }, path: null, arrived: true,
      layout: null, assignedH: HOME_HEADING, members: [], cmdr: null, lag: 0, speed: 0, swimming: 0, moving: 0,
    }
    div.layout = formationSlots(div.formasi, PER_DIVISI, mounted)
    for (let i = 0; i < PER_DIVISI; i++) {
      const s = div.layout.slots[i]
      const a = makeAgent(typeOf[def.jenis], div, i, mounted)
      placeAtSlot(a, s)
    }
    div.cmdr = makeAgent(4 + di, div, -1, true)
    div.cmdr.commander = true
    placeAtSlot(div.cmdr, div.layout.cmd)
    divisions.push(div)
  })
  function makeAgent(type, div, slot, mounted) {
    const a = {
      id: agents.length, type, div, slot, mounted, commander: false,
      x: 0, z: 0, y: 0, heading: 0, swim: false, vy: 0, moved: 0, wantH: 0,
      clip: 'idle', t: Math.random() * 3, prev: null, prevT: 0, fade: 0, animSpeed: 1, still: 0,
    }
    if (slot >= 0) div.members.push(a)
    agents.push(a)
    return a
  }
  // letak dunia tempat `s` (relatif jangkar divisi)
  function slotWorld(div, s, out) {
    const c = Math.cos(div.ah)
    const sn = Math.sin(div.ah)
    // kanan = (−cos h, sin h), depan = (sin h, cos h)
    out.x = div.ax - c * s.x + sn * s.z
    out.z = div.az + sn * s.x + c * s.z
    out.h = div.ah + s.h
    return out
  }
  function placeAtSlot(a, s) {
    slotWorld(a.div, s, _s)
    a.x = _s.x
    a.z = _s.z
    a.y = ground.surfaceAt(a.x, a.z)
    a.heading = _s.h
    a.wantH = _s.h
  }
  const slotOf = a => (a.commander ? a.div.layout.cmd : a.div.layout.slots[a.slot])

  // tata ulang siapa menempati tempat mana (formasi baru / berbalik arah): urutkan prajurit dan
  // tempat menurut letaknya di bingkai formasi yang baru, supaya tidak saling menyeberang
  function reassign(div) {
    const c = Math.cos(div.ah)
    const sn = Math.sin(div.ah)
    const local = a => {
      const dx = a.x - div.ax
      const dz = a.z - div.az
      return { x: -c * dx + sn * dz, z: sn * dx + c * dz }
    }
    const ms = div.members.map(a => ({ a, p: local(a) }))
    const idx = div.layout.slots.map((s, i) => i)
    const key = p => -p.z * 1000 + p.x // baris depan dulu, lalu kiri → kanan
    // lingkaran: urutkan menurut sudut
    if (div.formasi === 'lingkaran') {
      const ang = p => Math.atan2(p.x, p.z)
      ms.sort((u, v) => ang(u.p) - ang(v.p))
      idx.sort((i, j) => ang(div.layout.slots[i]) - ang(div.layout.slots[j]))
    } else {
      // kelompok baris (pita selebar jarak antarbaris), lalu kiri → kanan
      const gz = GAP[div.mounted ? 'kuda' : 'kaki'][1]
      const band = p => Math.round(-p.z / gz)
      ms.sort((u, v) => band(u.p) - band(v.p) || u.p.x - v.p.x)
      idx.sort((i, j) => key(div.layout.slots[i]) - key(div.layout.slots[j]))
      // pita prajurit tidak selalu sama besar dengan baris tempat: cukup urutan depan → belakang
    }
    ms.forEach((m, k) => {
      m.a.slot = idx[k]
    })
    div.assignedH = div.ah
  }

  // --- perintah (dipanggil komando.js)
  function setFormation(div, name) {
    if (!FORMASI.includes(name)) return
    div.formasi = name
    div.layout = formationSlots(name, PER_DIVISI, div.mounted)
    reassign(div)
  }
  function follow(div) {
    div.mode = 'ikut'
    div.path = null
    div.arrived = false
  }
  function moveTo(div, x, z, h = null) {
    div.mode = 'titik'
    const dx = x - div.ax
    const dz = z - div.az
    const heading = h ?? (Math.hypot(dx, dz) > 2 ? Math.atan2(dx, dz) : div.ah)
    div.goal = { x, z, h: heading }
    div.arrived = false
    // jalur darat bila ada (memutari bangunan & tebing); tanpa jalur (menyeberang laut) = lurus
    const path = Math.hypot(dx, dz) > 6 && !nav.lineClear(div.ax, div.az, x, z) ? nav.findPath({ x: div.ax, z: div.az }, { x, z }) : null
    div.path = path && path.length > 1 ? path.slice(1) : null
  }
  // Geser kiri (dir = −1) / kanan (+1): bergerak melingkar 45° mengitari titik FOCUS m di depan
  // pasukan, lalu menghadap titik itu — berulang kali = mengepung dari samping sampai belakang
  function flank(div, dir) {
    const fx = Math.sin(div.ah)
    const fz = Math.cos(div.ah)
    // bila sedang berjalan menuju tujuan, titik tengahnya dihitung dari tujuan itu
    const base = div.mode === 'titik' && !div.arrived ? div.goal : { x: div.ax, z: div.az, h: div.ah }
    const bh = base.h ?? div.ah
    const bfx = div.mode === 'titik' && !div.arrived ? Math.sin(bh) : fx
    const bfz = div.mode === 'titik' && !div.arrived ? Math.cos(bh) : fz
    const cx = base.x + bfx * FOCUS
    const cz = base.z + bfz * FOCUS
    // arah dari titik tengah ke pasukan, diputar ke kiri / kanan pasukan
    const a0 = Math.atan2(base.x - cx, base.z - cz)
    // kiri pasukan yang menghadap h = (cos h, −sin h); dari titik tengah, pasukan berada di arah
    // a0 = h + π, jadi bergeser ke kirinya = sudut berkurang, ke kanannya = sudut bertambah
    const a1 = a0 + dir * FLANK
    const x = cx + Math.sin(a1) * FOCUS
    const z = cz + Math.cos(a1) * FOCUS
    moveTo(div, x, z, Math.atan2(cx - x, cz - z))
    return { cx, cz }
  }

  // --- gerak divisi (jangkar)
  const leader = { x: 0, z: 0, heading: 0, speed: 0, followH: 0 }
  let followers = []
  function followTarget(div, out) {
    // divisi yang mengikuti pemain berderet di belakangnya, dua lajur (kiri & kanan)
    const k = followers.indexOf(div)
    const n = followers.length
    let back = 5
    for (let i = k % 2; i < k; i += 2) back += followers[i].layout.halfD * 2 + 4
    back += div.layout.halfD
    let side = 0
    if (n > 1) {
      const pair = k % 2 === 0 ? followers[k + 1] : followers[k - 1]
      side = (k % 2 === 0 ? -1 : 1) * (div.layout.halfW + 1.5)
      if (!pair) side = 0
    }
    const h = leader.followH
    const c = Math.cos(h)
    const sn = Math.sin(h)
    out.x = leader.x - c * side - sn * back
    out.z = leader.z + sn * side - c * back
    out.h = h
    return out
  }
  const _t = { x: 0, z: 0, h: 0 }
  function stepDivision(div, dt) {
    const sp = SPEED[div.mounted ? 'kuda' : 'kaki']
    let tx
    let tz
    let th
    if (div.mode === 'ikut') {
      followTarget(div, _t)
      tx = _t.x
      tz = _t.z
      th = _t.h
    } else {
      const wp = div.path?.[0]
      tx = wp ? wp.x : div.goal.x
      tz = wp ? wp.z : div.goal.z
      th = div.goal.h
    }
    const dx = tx - div.ax
    const dz = tz - div.az
    const d = Math.hypot(dx, dz)
    // laju jangkar: berbaris; berlari bila tujuannya jauh / pemain menjauh; melambat bila prajuritnya
    // tertinggal (barisan tetap utuh)
    let v
    if (div.mode === 'ikut') v = d > 30 ? Math.max(sp.lari, leader.speed * 1.08) : Math.min(Math.max(sp.jalan, leader.speed * 1.05), d * 0.9)
    else v = d > 45 ? sp.lari * 0.8 : sp.jalan
    if (div.swimming > PER_DIVISI * 0.3) v = Math.min(v, div.mode === 'ikut' ? Math.max(sp.renang, leader.speed * 1.05) : sp.renang)
    v *= THREE.MathUtils.clamp(1.4 - div.lag / 8, 0.15, 1)
    const stepLen = Math.min(d, v * dt)
    if (d > 0.05) {
      div.ax += (dx / d) * stepLen
      div.az += (dz / d) * stepLen
    }
    div.speed = d > 0.05 ? stepLen / Math.max(dt, 1e-4) : 0
    // titik jalan tercapai
    if (div.path && d < 2.5) {
      div.path.shift()
      if (!div.path.length) div.path = null
    }
    // arah hadap: searah perjalanan saat berjalan jauh, arah tujuan saat tiba
    const far = div.mode === 'ikut' ? d > 6 && div.speed > 0.5 : d > 4 || div.path
    const wantH = far ? Math.atan2(dx, dz) : th
    div.ah += wrap(wantH - div.ah) * Math.min(1, dt * (far ? 1.6 : 2.2))
    if (!div.path && div.mode === 'titik' && d < 0.3) div.arrived = true
    // berbalik jauh → tempat ditata ulang (prajurit tidak menembus barisannya sendiri)
    if (Math.abs(wrap(div.ah - div.assignedH)) > 1.0) reassign(div)
  }

  // --- gerak prajurit menuju tempatnya
  const tmpVel = { x: 0, z: 0 }
  function stepAgent(a, dt, player) {
    const { div } = a
    const sp = SPEED[a.mounted ? 'kuda' : 'kaki']
    slotWorld(div, slotOf(a), _s)
    const dx = _s.x - a.x
    const dz = _s.z - a.z
    const d = Math.hypot(dx, dz)
    div.lagSum += d
    let max = a.swim ? Math.max(sp.renang, div.mode === 'ikut' ? leader.speed * 1.1 : 0) : sp.lari
    if (a.commander && !a.swim) max = SPEED.kuda.lari
    const want = d < 0.12 ? 0 : Math.min(max, div.speed + d * 1.6)
    const cur = a.moved
    // percepat / perlambat halus (tidak langsung berhenti / berlari)
    const v = cur + THREE.MathUtils.clamp(want - cur, -dt * 6, dt * (a.mounted ? 5 : 7))
    a.moved = Math.max(0, v)
    if (a.moved > 0.01 && d > 0.01) {
      const s = Math.min(d, a.moved * dt)
      a.x += (dx / d) * s
      a.z += (dz / d) * s
      a.wantH = Math.atan2(dx, dz)
    }
    // tiba: menghadap arah formasi
    if (d < 0.6 && a.moved < 1) a.wantH = _s.h
    a.heading += wrap(a.wantH - a.heading) * Math.min(1, dt * (a.swim ? 4 : a.mounted ? 4.5 : 7))
    // tabrakan: bangunan / pohon, pemain (yang lewat menyibak barisan)
    const px = a.x - player.x
    const pz = a.z - player.z
    const pd = Math.hypot(px, pz)
    const pr = a.mounted ? 1.1 : 0.7
    if (pd < pr && pd > 1e-4) {
      a.x = player.x + (px / pd) * pr
      a.z = player.z + (pz / pd) * pr
    }
    if (a.moved > 0.02 || d > 0.5) {
      tmpVel.x = tmpVel.z = 0
      colliders.resolve(a, a.mounted ? 0.5 : RADIUS, tmpVel)
    }
    settle(a, dt)
  }
  let onWater = () => {}
  let onSplash = () => {}
  let onSwim = () => {}
  let clock = 0
  function settle(a, dt) {
    const S = SWIM[a.mounted ? 'kuda' : 'kaki']
    const gy = ground.supportAt(a.x, a.z, a.y, STEP)
    const depth = ISLAND.seaLevel - gy
    if (a.swim && depth < S.exit) a.swim = false
    if (!a.swim && depth > S.depth && a.y < ISLAND.seaLevel - 0.3) {
      a.swim = true
      onWater(a.x, a.z, a.mounted ? 2 : 1.4, 0.5)
      onSplash(a)
    }
    if (a.swim) {
      const wy = ISLAND.seaLevel - S.sink + Math.sin(clock * 2.1 + a.id) * 0.04
      a.y += (wy - a.y) * Math.min(1, dt * 5)
      a.vy = 0
    } else if (a.y > gy + 0.02) {
      a.vy -= 21 * dt
      a.y = Math.max(gy, a.y + a.vy * dt)
      if (a.y <= gy) a.vy = 0
    } else {
      a.y = gy
      a.vy = 0
    }
  }

  // --- animasi
  function setClip(a, clip) {
    if (a.clip === clip) return
    a.prev = a.clip
    a.prevT = a.t
    a.fade = FADE
    a.clip = clip
    a.t = 0
  }
  function animateAgent(a, dt) {
    if (a.mounted) {
      const c = a.swim ? 'swim' : a.moved > 4.2 ? 'gallop' : a.moved > 0.15 ? 'walk' : 'idle'
      setClip(a, c)
      const cyc = HORSE_GAITS[c].cycle
      a.animSpeed = c === 'idle' ? 1 : Math.max(0.6, a.moved / (HORSE_STRIDE[c] / cyc))
      if (c === 'swim') a.animSpeed = 0.7 + 0.5 * Math.min(1, a.moved / SPEED.kuda.renang)
    } else {
      const c = a.swim ? 'swim' : a.moved > 2.6 ? 'sprint' : a.moved > 0.08 ? 'walk' : 'idle'
      setClip(a, c)
      a.animSpeed = c === 'swim' ? 0.8 + 0.6 * Math.min(1, a.moved / SPEED.kaki.renang)
        : c === 'walk' ? Math.max(0.5, a.moved / foot.gait.walk) : c === 'sprint' ? Math.max(1.2, a.moved / foot.gait.sprint) : 1
    }
    a.t += dt * a.animSpeed
    if (a.fade > 0) {
      a.fade = Math.max(0, a.fade - dt)
      a.prevT += dt
    }
  }

  // --- InstancedMesh: per jenis × (dekat, jauh)
  const count = types.map(() => 0)
  for (const a of agents) count[a.type]++
  function makeMesh(T, data, cap, far) {
    const geo = toBufferGeometry(data)
    const animA = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    const animB = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('aAnimA', animA)
    geo.setAttribute('aAnimB', animB)
    const mat = new THREE.MeshLambertMaterial({ map })
    mat.onBeforeCompile = shader => animate(shader, bones)
    const mesh = new THREE.InstancedMesh(geo, mat, cap)
    mesh.name = `rajawali-${T.id}${far ? '-jauh' : ''}`
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    mesh.castShadow = quality.shadows && !far
    mesh.receiveShadow = quality.shadows
    if (!far) {
      const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking })
      depth.onBeforeCompile = shader => animate(shader, bones)
      mesh.customDepthMaterial = depth
    }
    mesh.count = 0
    group.add(mesh)
    return { mesh, animA, animB, table: T.table }
  }
  const meshes = types.map((T, i) => ({
    near: makeMesh(T, T.near, Math.max(1, Math.min(count[i], L.near)), false),
    far: makeMesh(T, T.far, Math.max(1, count[i]), true),
  }))

  // lingkaran penanda komandan terpilih & tujuan
  const ringGeo = new THREE.RingGeometry(0.85, 1.15, 40).rotateX(-Math.PI / 2)
  const ringMat = new THREE.MeshBasicMaterial({ color: '#ffd84a', transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.renderOrder = 5
  ring.visible = false
  group.add(ring)
  const goalMat = new THREE.MeshBasicMaterial({ color: '#ffd84a', transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false })
  const goals = DIVISI.map(() => {
    const g = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.1, 48).rotateX(-Math.PI / 2), goalMat)
    g.visible = false
    g.renderOrder = 5
    group.add(g)
    return g
  })
  let selected = -1

  // --- gambar
  const frustum = new THREE.Frustum()
  const projView = new THREE.Matrix4()
  const sphere = new THREE.Sphere(new THREE.Vector3(), 2.6)
  const p = new THREE.Vector3()
  const sv = new THREE.Vector3(SCALE, SCALE, SCALE)
  let nearR = 40
  let visible = 0
  let nearShown = 0
  function draw(camera) {
    camera.updateMatrixWorld()
    projView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projView)
    for (const m of meshes) {
      m.near.mesh.count = 0
      m.far.mesh.count = 0
    }
    const cx = camera.position.x
    const cz = camera.position.z
    const view2 = L.view * L.view
    const near2 = nearR * nearR
    let inNear = 0
    visible = 0
    nearShown = 0
    for (const a of agents) {
      const dx = a.x - cx
      const dz = a.z - cz
      const d2 = dx * dx + dz * dz
      if (d2 > view2) continue
      sphere.center.set(a.x, a.y + 1, a.z)
      if (!frustum.intersectsSphere(sphere)) continue
      if (d2 < near2) inNear++
      const useNear = d2 < near2 && nearShown < L.near && meshes[a.type].near.mesh.count < meshes[a.type].near.mesh.instanceMatrix.count
      const M = useNear ? meshes[a.type].near : meshes[a.type].far
      if (useNear) nearShown++
      const i = M.mesh.count++
      p.set(a.x, a.y, a.z)
      _q.setFromAxisAngle(Y, a.heading)
      M.mesh.setMatrixAt(i, _m.compose(p, _q, sv))
      const A = M.animA.array
      frameOf(M.table[a.clip] || M.table.idle, a.t, A, i * 4)
      A[i * 4 + 3] = a.fade > 0 ? a.fade / FADE : 0
      if (a.fade > 0) frameOf(M.table[a.prev] || M.table.idle, a.prevT, M.animB.array, i * 4)
      visible++
    }
    // jari-jari model lengkap menyesuaikan diri: sebanyak-banyaknya L.near orang terdekat
    if (inNear > L.near) nearR = Math.max(8, nearR * 0.96)
    else if (inNear < L.near * 0.85) nearR = Math.min(90, nearR * 1.03)
    for (const m of meshes)
      for (const M of [m.near, m.far]) {
        if (!M.mesh.count) continue
        M.mesh.instanceMatrix.needsUpdate = true
        M.animA.needsUpdate = true
        M.animB.needsUpdate = true
      }
  }

  // --- satu langkah simulasi + gambar
  // ctx: { camera, player: { x, y, z, heading, speed } }
  let swimSound = 0
  function update(dt, ctx) {
    clock += dt
    const pl = ctx.player
    // arah barisan pengikut: arah gerak pemain (bukan arah hadapnya saat diam / berputar di tempat)
    const mdx = pl.x - leader.x
    const mdz = pl.z - leader.z
    const md = Math.hypot(mdx, mdz)
    if (md < 20) leader.speed = THREE.MathUtils.lerp(leader.speed, Math.min(12, md / Math.max(dt, 1e-4)), Math.min(1, dt * 4))
    if (md > 0.02 && md < 20) leader.followH += wrap(Math.atan2(mdx, mdz) - leader.followH) * Math.min(1, dt * 1.2 * Math.min(1, leader.speed / 2))
    if (md >= 20) leader.followH = pl.heading // pindah seketika (dipindahkan / respawn)
    leader.x = pl.x
    leader.z = pl.z
    followers = divisions.filter(d => d.mode === 'ikut')
    for (const div of divisions) stepDivision(div, dt)
    for (const div of divisions) {
      div.lagSum = 0
      div.swimming = 0
      div.moving = 0
    }
    for (const a of agents) {
      stepAgent(a, dt, pl)
      animateAgent(a, dt)
      if (a.swim) a.div.swimming++
      if (a.moved > 0.15) a.div.moving++
    }
    for (const div of divisions) div.lag = div.lagSum / (PER_DIVISI + 1)
    // penanda: komandan terpilih & tujuan divisi
    if (selected >= 0) {
      const c = divisions[selected].cmdr
      ring.visible = true
      ring.position.set(c.x, (c.swim ? ISLAND.seaLevel : c.y) + 0.06, c.z)
      ring.scale.setScalar(1.6 + 0.12 * Math.sin(clock * 5))
    } else ring.visible = false
    divisions.forEach((div, i) => {
      const g = goals[i]
      g.visible = div.mode === 'titik' && !div.arrived && (selected === i || selected < 0)
      if (g.visible) g.position.set(div.goal.x, Math.max(ISLAND.seaLevel, ground.surfaceAt(div.goal.x, div.goal.z)) + 0.08, div.goal.z)
    })
    // percikan sesekali dari prajurit yang berenang
    if ((swimSound -= dt) <= 0) {
      swimSound = 0.3
      const sw = agents.filter(a => a.swim && a.moved > 0.4)
      if (sw.length) onSwim(sw[Math.floor(Math.random() * sw.length)])
    }
    draw(ctx.camera)
  }

  return {
    object: group,
    agents,
    divisions,
    types,
    update,
    setFormation(i, name) {
      setFormation(divisions[i], name)
    },
    follow(i) {
      follow(divisions[i])
    },
    moveTo(i, x, z, h) {
      moveTo(divisions[i], x, z, h)
    },
    flank(i, dir) {
      return flank(divisions[i], dir)
    },
    select(i) {
      selected = i
    },
    get selected() {
      return selected
    },
    // keadaan divisi untuk panel komando
    status(i) {
      const div = divisions[i]
      const c = div.cmdr
      let doing
      if (div.swimming > 20) doing = 'berenang'
      else if (div.mode === 'ikut') doing = 'mengikutimu'
      else if (div.mode === 'rumah') doing = 'di lapangan'
      else if (!div.arrived) doing = div.speed > SPEED[div.mounted ? 'kuda' : 'kaki'].jalan * 1.2 ? 'berlari ke tujuan' : 'berbaris ke tujuan'
      else doing = 'siaga di tujuan'
      return { mode: div.mode, formasi: div.formasi, doing, x: c.x, z: c.z, arrived: div.arrived, count: div.members.length }
    },
    onWater(fn) {
      onWater = fn
    },
    onSplash(fn) {
      onSplash = fn
    },
    onSwim(fn) {
      onSwim = fn
    },
    // keterangan untuk pengujian & HUD
    stats() {
      const per = divisions.map(d => ({ id: d.def.id, n: d.members.length, mode: d.mode, formasi: d.formasi, renang: d.swimming, gerak: d.moving, lag: +d.lag.toFixed(2), ax: +d.ax.toFixed(1), az: +d.az.toFixed(1), ah: +d.ah.toFixed(2), tiba: d.arrived }))
      return { total: agents.length, prajurit: agents.filter(a => !a.commander).length, komandan: agents.filter(a => a.commander).length, divisi: per, visible, dekat: nearShown, nearR: +nearR.toFixed(1), segitiga: types.map(T => ({ id: T.id, dekat: T.near.index.length / 3, jauh: T.far.index.length / 3 })) }
    },
    // kembali seperti awal: semua divisi berbaris kotak di Lapangan Latihan (pengujian)
    reset() {
      divisions.forEach((div, i) => {
        div.mode = 'rumah'
        div.formasi = 'kotak'
        div.layout = formationSlots('kotak', PER_DIVISI, div.mounted)
        div.members.forEach((a, k) => {
          a.slot = k
        })
        this.teleport(i, div.def.home.x, div.def.home.z, HOME_HEADING)
      })
      selected = -1
    },
    // pengujian: pindahkan jangkar & semua prajurit divisi seketika
    teleport(i, x, z, h = 0) {
      const div = divisions[i]
      div.ax = x
      div.az = z
      div.ah = h
      div.assignedH = h
      div.goal = { x, z, h }
      div.path = null
      div.arrived = true
      for (const a of [...div.members, div.cmdr]) {
        placeAtSlot(a, slotOf(a))
        a.swim = false
        a.moved = 0
      }
    },
  }
}
