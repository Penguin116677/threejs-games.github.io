import { rng } from '../../core/random.js'
import { dockSpans } from '../kencana/height.js'
import { Y, FORT, FORT_GATE, FIELD, ARCHERY, STABLE, DOCKS } from './layout.js'

// Rencana Pulau Rajawali dalam format yang sama dengan rencana Kencana (kencana/plan.js), jadi
// bangunannya dibuat oleh pembuat bangunan Kencana (kingdom.js partsFor/buildTiles) dan catnya
// oleh masker wilayah (kencana/mask.js). TANPA penduduk desa: tidak ada rumah, pasar, atau sawah —
// hanya benteng, barak, lapangan latihan, kandang kuda, dan dermaga.

const FACE = { selatan: 0, timur: Math.PI / 2, utara: Math.PI, barat: -Math.PI / 2 }

export function planRajawali(ground) {
  const rand = rng(7171)
  const docks = dockSpans(ground.heightAt, DOCKS)
  const P = {
    spans: [], // tanpa jembatan
    docks,
    build: [],
    colliders: [],
    surfaces: [],
    roads: [],
    pave: [],
    lawn: [],
    fields: [],
    dirt: [],
    blocked: [],
    tracks: [],
    paths: [],
    boats: [],
    roofs: [],
  }
  const box = (x, z, w, d, rot, kind) => P.colliders.push({ x, z, hx: w / 2, hz: d / 2, rot, kind })
  const block = (x, z, w, d, rot = 0) => P.blocked.push({ x, z, hx: w / 2, hz: d / 2, rot })
  const add = b => {
    P.build.push(b)
    return b
  }
  function wall(ax, az, bx, bz, t, h) {
    const len = Math.hypot(bx - ax, bz - az)
    if (len < 0.5) return
    const rot = Math.atan2(bx - ax, bz - az)
    const x = (ax + bx) / 2
    const z = (az + bz) / 2
    add({ type: 'tembok', x, y: Y, z, rot, len, t, h })
    box(x, z, t, len, rot, 'bata')
    block(x, z, t + 2, len, rot)
  }

  // ===================================================================== Benteng Rajawali
  const WALL_T = 2
  const WALL_H = 4.6
  const TOWER = 6.5
  const F = FORT
  for (const [x, z] of [[F.x0, F.z0], [F.x1, F.z0], [F.x1, F.z1], [F.x0, F.z1]]) {
    add({ type: 'menara', x, y: Y, z, rot: 0, size: TOWER, h: 7.2 })
    box(x, z, TOWER, TOWER, 0, 'bata')
    block(x, z, TOWER + 2, TOWER + 2)
  }
  const th = TOWER / 2
  wall(F.x0 + th, F.z0, F.x1 - th, F.z0, WALL_T, WALL_H) // utara
  wall(F.x0, F.z0 + th, F.x0, F.z1 - th, WALL_T, WALL_H) // barat
  wall(F.x1, F.z0 + th, F.x1, F.z1 - th, WALL_T, WALL_H) // timur
  // selatan: dua potong mengapit gerbang candi bentar
  const half = 3.4 // lebar satu belahan bentar
  const gL = FORT_GATE.x - FORT_GATE.w / 2 - half
  const gR = FORT_GATE.x + FORT_GATE.w / 2 + half
  wall(F.x0 + th, F.z1, gL, F.z1, WALL_T, WALL_H)
  wall(gR, F.z1, F.x1 - th, F.z1, WALL_T, WALL_H)
  for (const sgn of [-1, 1]) {
    const x = FORT_GATE.x + sgn * (FORT_GATE.w / 2 + half / 2)
    add({ type: 'bentar', x, y: Y, z: F.z1, rot: 0, w: half, d: 3.8, h: 10, mirror: sgn })
    box(x, F.z1, half, 3.8, 0, 'bata')
    block(x, F.z1, half + 1, 4.8)
    // umbul-umbul di depan gerbang
    const ux = FORT_GATE.x + sgn * 9.5
    add({ type: 'umbul', x: ux, y: Y, z: F.z1 + 4, rot: 0, h: 9, color: sgn > 0 ? 0 : 2 })
    P.colliders.push({ x: ux, z: F.z1 + 4, radius: 0.18, kind: 'kayu' })
  }
  // halaman berlantai batu
  P.pave.push({ x0: F.x0 + 1, z0: F.z0 + 1, x1: F.x1 - 1, z1: F.z1 - 1 })
  P.pave.push({ x0: FORT_GATE.x - 5, z0: F.z1 - 2, x1: FORT_GATE.x + 5, z1: F.z1 + 7 })

  // pendopo (balairung raja) di atas batur 1 m, tangga ke selatan (menghadap gerbang)
  const pd = { x: FORT_GATE.x, z: -953, w: 28, d: 30, h: 1.0 }
  add({ type: 'pendopo', x: pd.x, y: Y, z: pd.z, rot: 0, w: pd.w, d: pd.d, h: pd.h })
  P.surfaces.push({ x: pd.x, z: pd.z, hx: pd.w / 2, hz: pd.d / 2, rot: 0, y0: Y + pd.h, y1: Y + pd.h })
  const stairW = 10
  const stairL = 3.2
  P.surfaces.push({ x: pd.x, z: pd.z + pd.d / 2 + stairL / 2, hx: stairW / 2, hz: stairL / 2, rot: Math.PI, y0: Y + 0.02, y1: Y + pd.h })
  {
    const wx = pd.x - pd.w / 2
    const ex = pd.x + pd.w / 2
    const nz = pd.z - pd.d / 2
    const sz = pd.z + pd.d / 2
    for (const [ax, az, bx, bz] of [[wx, nz, ex, nz], [wx, nz, wx, sz], [ex, nz, ex, sz], [wx, sz, pd.x - stairW / 2, sz], [pd.x + stairW / 2, sz, ex, sz]]) {
      const len = Math.hypot(bx - ax, bz - az)
      box((ax + bx) / 2, (az + bz) / 2, 0.5, len, Math.atan2(bx - ax, bz - az), 'batu')
    }
  }
  block(pd.x, pd.z, pd.w + 2, pd.d + 2)
  P.roofs.push({ x: pd.x, z: pd.z, hx: pd.w / 2 + 1.5, hz: pd.d / 2 + 1.5, r: 10 })
  for (const [cx, cz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.colliders.push({ x: pd.x + cx * 3.2, z: pd.z + cz * 3.2, radius: 0.35, kind: 'kayu' })
  // tiang pinggir (pendopo menghadap +z lokal: tiang di x ±12,4 tiap 6,3 m sepanjang z, dan di z ±13,4)
  for (let i = -2; i <= 2; i++)
    for (const sgn of [-1, 1]) {
      P.colliders.push({ x: pd.x + sgn * 12.4, z: pd.z + i * 6.3, radius: 0.28, kind: 'kayu' })
      if (Math.abs(i) < 2 && !(sgn > 0 && i === 0)) P.colliders.push({ x: pd.x + i * 6.2, z: pd.z + sgn * 13.4, radius: 0.28, kind: 'kayu' })
    }

  // dua bangsal (barak prajurit) di sisi barat & timur halaman, tangganya menghadap ke tengah
  for (const sgn of [-1, 1]) {
    const x = sgn < 0 ? F.x0 + 10 : F.x1 - 10
    const z = -951
    add({ type: 'bangsal', x, y: Y, z, rot: sgn < 0 ? FACE.timur : FACE.barat, w: 22, d: 10, h: 1.2 })
    box(x, z, 11, 23, 0, 'bata')
    block(x, z, 13, 25)
  }
  // gentong & peti perbekalan di sudut halaman
  for (const [dx, dz, type] of [[6, 5, 'gentong'], [10, 4, 'peti'], [-7, 5, 'peti'], [-11, 4, 'gentong']]) {
    const x = (dx > 0 ? F.x0 : F.x1) + dx
    const z = F.z1 - dz
    add({ type, x, y: Y, z, rot: rand() * Math.PI, w: 1, d: 1 })
    P.colliders.push({ x, z, radius: 0.6, kind: 'kayu' })
  }

  // ===================================================================== Lapangan Latihan
  P.dirt.push(FIELD, ARCHERY)
  // umbul-umbul di keempat sudut lapangan
  for (const [x, z, c] of [[FIELD.x0, FIELD.z0, 1], [FIELD.x1, FIELD.z0, 3], [FIELD.x0, FIELD.z1, 3], [FIELD.x1, FIELD.z1, 1]]) {
    const ux = x + Math.sign(x - (FIELD.x0 + FIELD.x1) / 2) * 2
    const uz = z + Math.sign(z - (FIELD.z0 + FIELD.z1) / 2) * 2
    add({ type: 'umbul', x: ux, y: Y, z: uz, rot: 0, h: 8, color: c })
    P.colliders.push({ x: ux, z: uz, radius: 0.18, kind: 'kayu' })
  }
  // tempat latihan memanah: sasaran berderet di sisi barat, menghadap ke timur
  for (let z = ARCHERY.z0 + 6; z <= ARCHERY.z1 - 6; z += 8) {
    const x = ARCHERY.x0 + 3
    add({ type: 'sasaran', x, y: Y, z, rot: FACE.timur })
    box(x, z, 0.8, 1.4, 0, 'kayu')
  }
  for (const z of [ARCHERY.z0 + 2, ARCHERY.z1 - 2]) {
    add({ type: 'jerami', x: ARCHERY.x1 - 2, y: Y, z, rot: 0 })
    P.colliders.push({ x: ARCHERY.x1 - 2, z, radius: 1.1, kind: 'kayu' })
  }
  // boneka latihan pedang berbaris di depan tembok benteng (antara lapangan & tembok)
  for (let i = 0; i < 6; i++)
    for (const sgn of [-1, 1]) {
      const x = FORT_GATE.x + sgn * (16 + i * 4.5)
      const z = F.z1 + 4.5
      if (x < F.x0 + 3 || x > F.x1 - 3) continue
      add({ type: 'boneka', x, y: Y, z, rot: rand() * 0.6 - 0.3 })
      P.colliders.push({ x, z, radius: 0.32, kind: 'kayu' })
    }
  // kandang kuda kavaleri di timur laut lapangan (sisi terbuka menghadap lapangan)
  add({ type: 'kandang', x: STABLE.x, y: Y, z: STABLE.z, rot: 0, w: STABLE.w, d: STABLE.d })
  box(STABLE.x, STABLE.z - STABLE.d / 2 + 0.1, STABLE.w, 0.4, 0, 'kayu')
  for (const sgn of [-1, 1]) box(STABLE.x + sgn * (STABLE.w / 2 - 0.1), STABLE.z, 0.4, STABLE.d, 0, 'kayu')
  block(STABLE.x, STABLE.z, STABLE.w + 2, STABLE.d + 2)
  P.roofs.push({ x: STABLE.x, z: STABLE.z, hx: STABLE.w / 2, hz: STABLE.d / 2, r: 6 })
  for (const dx of [-12, 0, 12]) {
    const x = STABLE.x + dx
    add({ type: 'jerami', x, y: Y, z: STABLE.z + STABLE.d / 2 + 2.5, rot: 0 })
    P.colliders.push({ x, z: STABLE.z + STABLE.d / 2 + 2.5, radius: 1.1, kind: 'kayu' })
  }

  // ===================================================================== Dermaga Rajawali
  for (const d of docks) {
    const deckY = 1.75
    const lo = Math.min(d.s0, d.s1)
    const hi = Math.max(d.s0, d.s1)
    const len = hi - lo
    const rot = Math.PI / 2
    const x = (lo + hi) / 2
    add({ type: 'dermaga', x, y: deckY, z: d.at, rot, w: d.width, len })
    P.surfaces.push({ x, z: d.at, hx: d.width / 2, hz: len / 2, rot, y0: deckY, y1: deckY })
    block(x, d.at, d.width + 2, len + 2, rot)
    // jalan tanah dari lapangan ke pangkal dermaga
    P.roads.push([FIELD.x1 - 2, d.at, d.s0 + 1, d.at, 5])
    P.paths.push([FIELD.x1, d.at, d.s1 - 2, d.at])
    // gapura candi bentar kecil di pangkalnya + umbul-umbul
    const end = d.shore - d.dir * 9
    for (const sgn of [-1, 1]) {
      const gz = d.at + sgn * 4.6
      add({ type: 'bentar', x: end, y: ground.heightAt(end, gz), z: gz, rot, w: 3, d: 3, h: 8, mirror: -sgn })
      box(end, gz, 3, 3, 0, 'bata')
      const uz = d.at + sgn * 7.5
      add({ type: 'umbul', x: end - 5, y: ground.heightAt(end - 5, uz), z: uz, rot: 0, h: 8, color: sgn > 0 ? 0 : 2 })
      P.colliders.push({ x: end - 5, z: uz, radius: 0.18, kind: 'kayu' })
    }
    for (const [side, off] of [[1, 6], [-1, 14]]) P.boats.push({ type: 'jukung', x: d.s1 - d.dir * off, z: d.at + side * (d.width / 2 + 2.3), rot: rot + (side > 0 ? 0 : Math.PI) + (rand() - 0.5) * 0.2 })
  }
  return P
}
