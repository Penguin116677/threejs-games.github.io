// Suasana bunyi (v0.25.0): latar yang berubah menurut tempat & waktu, plus bunyi kegiatan orang di
// dekat pemain. Dihitung ±7× per detik (murah), kerasnya dihaluskan oleh mesin.
//   - laut (debur ombak, makin keras di dekat pantai), angin (makin kencang di tempat tinggi & di
//     Frostfall), serangga & kicau burung (siang, daratan tropis), camar (pantai), burung hantu
//     (malam Frostfall), dengung & tetesan gua (dengan gema), gema ruangan (aula, kedai)
//   - sumber tetap: air terjun yang mengalir, api unggun yang menyala, keramaian pasar & alun-alun,
//     tungku pandai besi Aeloria, perkemahan bala tentara (denting zirah, ringkik kuda), pesta Aeloria
//   - orang di dekat pemain: langkah kaki yang berjalan, dan bunyi kegiatannya (menempa, membelah kayu,
//     berlatih pedang / panah, menari & bertepuk, memainkan kecapi, mengobrol, anak-anak bermain, …)
//   - Naga Es yang tidur: dengkur napasnya
import { suara } from './suara.js'

const rnd = (a, b) => a + Math.random() * (b - a)
const clamp01 = x => Math.min(1, Math.max(0, x))

// kegiatan (warga Frostfall: a.act; elf Aeloria: a.act / a.job) → [suara, jeda rata-rata (detik)]
const KEGIATAN = {
  tempa: ['tempa', 0.75],
  kayu: ['kapak', 1.4],
  tebang: ['kapak', 1.7],
  tanding: ['kena-logam', 0.95],
  boneka: ['kena-kayu', 1.2],
  panah: ['panah', 3.2],
  buru: ['panah', 6],
  sapu: ['sekop', 1.7],
  sumur: ['timba', 6],
  masak: ['masak', 3.5],
  saji: ['piring', 4],
  kedai: ['piring', 5],
  menari: ['tepuk', 0.6],
  tari: ['tepuk', 0.6],
  pesta: ['tepuk', 1],
  musik: ['kecapi', 0.5],
  main: ['tawa', 3],
  bolaSalju: ['bola-salju', 1.9],
  mancing: ['kail-plung', 14],
  mancingEs: ['kail-plung', 16],
  kulit: ['gosok', 1.5],
  sorak: ['sorak', 2.6],
  ngobrol: ['obrol', 3.4],
  mendongeng: ['obrol', 2.2],
  jamuan: ['piring', 3],
  makan: ['piring', 4],
}
const KERJA = { pandai: 'tempa', masak: 'masak', petani: 'cangkul' }

export function createAmbience({ ground, frost, frostMask, weather, warga, life, villagers, soldiersArmy, frostPlan, places, naga }) {
  const L = {
    laut: suara.loop('laut'),
    angin: suara.loop('angin'),
    serangga: suara.loop('serangga'),
    gua: suara.loop('gua'),
    airTerjun: suara.loop('air-terjun'),
    api: suara.loop('api'),
    ramai: suara.loop('keramaian'),
    naga: suara.loop('naga-dengkur'),
  }
  const fires = (frostPlan?.build || []).filter(b => b.type === 'api' && b.lit).map(b => ({ x: b.x, y: b.y, z: b.z }))
  const falls = (frost?.waterfalls || []).map(w => ({ x: w.x, y: w.y + (w.h || 0) * 0.5, z: w.z }))
  let tick = 0
  let birdT = rnd(1, 3)
  let gullT = rnd(4, 9)
  let dripT = 1
  let owlT = rnd(8, 15)
  let campT = 2
  let smithT = 0
  const lastPos = new WeakMap() // orang → { x, z, t } (laju dari perpindahan)
  const stepT = new WeakMap() // orang → sisa waktu ke langkah berikutnya
  const doT = new WeakMap() // orang → sisa waktu ke bunyi kegiatan berikutnya
  let clock = 0

  // seberapa banyak laut di sekitar (0..1): sampel tinggi tanah di dua lingkaran
  function seaAround(x, z) {
    let sea = 0
    let n = 0
    for (const r of [14, 32, 60])
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2
        const w = r === 14 ? 1.6 : r === 32 ? 1 : 0.6
        if (ground.heightAt(x + Math.cos(a) * r, z + Math.sin(a) * r) < -0.6) sea += w
        n += w
      }

    return sea / n
  }
  // sumber terdekat dari daftar → { k (0..1), pan }
  function nearest(list, p, range, ref = 6) {
    let best = null
    for (const s of list) {
      const sp = suara.spatial(s, range, ref)
      if (sp && (!best || sp.g > best.g)) best = sp
    }
    return best || { g: 0, pan: 0 }
  }
  const rectDist = (r, x, z) => Math.hypot(Math.max(r.x0 - x, 0, x - r.x1), Math.max(r.z0 - z, 0, z - r.z1))

  // orang-orang di dekat pemain: langkah & bunyi kegiatan
  function people(list, p, dt, kind) {
    if (!list) return
    let shown = 0
    for (const a of list) {
      if (a.hidden) continue
      const dx = a.x - p.x
      const dz = a.z - p.z
      if (Math.abs(dx) > 26 || Math.abs(dz) > 26) {
        if (lastPos.has(a)) lastPos.delete(a)
        continue
      }
      const d = Math.hypot(dx, dz)
      if (d > 26) continue
      const y = a.y ?? ground.surfaceAt(a.x, a.z)
      const at = { x: a.x, y, z: a.z }
      // laju dari perpindahan sejak pemeriksaan terakhir
      const lp = lastPos.get(a)
      let v = 0
      if (lp && clock - lp.t > 0) v = Math.hypot(a.x - lp.x, a.z - lp.z) / (clock - lp.t)
      lastPos.set(a, { x: a.x, z: a.z, t: clock })
      if (v > 0.4 && v < 9 && d < 14 && shown < 6) {
        shown++
        let s = (stepT.get(a) ?? rnd(0, 0.4)) - dt
        if (s <= 0) {
          s = 0.75 / Math.max(0.8, v * 0.9)
          suara.play(surfaceName(a.x, a.z, y), { at, kuat: (a.scale ?? 1) * (v > 3 ? 0.55 : 0.35), vol: 0.75 })
        }
        stepT.set(a, s)
        continue
      }
      if (d > 22) continue
      const act = a.act === 'kerja' ? KERJA[a.job] : a.act
      const spec = KEGIATAN[act]
      if (!spec) continue
      let s = (doT.get(a) ?? rnd(0, spec[1])) - dt
      if (s <= 0) {
        s = spec[1] * rnd(0.75, 1.3)
        const anak = (a.o?.umur ?? 30) < 13 || a.job === 'anak'
        const nada = anak ? rnd(260, 330) : kind === 'elf' ? rnd(170, 240) : rnd(110, 200)
        if (spec[0] === 'obrol') suara.play('bicara', { at, suku: 3 + Math.floor(Math.random() * 4), nada, vol: 0.55 })
        else if (spec[0] === 'tawa') suara.play('tawa', { at, nada: rnd(280, 360) })
        else suara.play(spec[0], { at })
      }
      doT.set(a, s)
    }
  }

  // jenis permukaan di (x, z) setinggi kaki y (langkah pemain & orang)
  function surfaceName(x, z, y) {
    const h = ground.heightAt(x, z)
    if (y !== undefined && y > h + 0.25 && ground.surfaceAt(x, z) > h + 0.2)
      // lantai bangunan: dek / jembatan kayu; di Frostfall lantai batu kastel & aula
      return weather.coldAt(x, z) > 0.5 && !frost.cave.inside(x, z, y) && y > 40 ? 'langkah-batu' : 'langkah-kayu'

    if (y !== undefined && frost.cave.inside(x, z, y)) {
      const pool = frost.poolAt(x, z)
      if (pool && y < pool.y - 0.05) return 'langkah-air'
      const m = frostMask?.at(x, z)
      return m && m.es > 0.5 ? 'langkah-es' : 'langkah-batu'
    }
    if (h < 0.05) return 'langkah-air'
    if (weather.coldAt(x, z) > 0.5) {
      const m = frostMask?.at(x, z)
      if (m && m.batu > 0.5) return 'langkah-batu'
      if (m && m.es > 0.5) return 'langkah-es'
      return 'langkah-salju'
    }
    for (const r of places.paved) {
      const m = r.at(x, z)
      if (m && (m.batu > 0.5 || m.jalan > 0.5)) return 'langkah-batu'
    }
    if (h < 2.3) return 'langkah-pasir'
    return 'langkah-rumput'
  }

  function update(dt, { pos, camera, swimming = false, boatSpeed = 0, indoor = 0, cave = 0 }) {
    clock += dt
    suara.setListener(pos.x, pos.y, pos.z, camera)
    if (!suara.ready) return
    tick -= dt
    const cold = weather.coldAt(pos.x, pos.z)
    const night = warga ? warga.malam * cold : 0
    const covered = cave > 0
    suara.setReverb(covered ? 0.55 + cave * 0.45 : indoor ? 0.35 : 0)
    const open = covered ? 0 : indoor ? 0.25 : 1

    if (tick <= 0) {
      tick = 0.15
      const h = Math.max(0, ground.heightAt(pos.x, pos.z))
      const sea = seaAround(pos.x, pos.z)
      const nearSea = clamp01(sea * 2.2)
      L.laut.set(open * (swimming ? 0.9 : 0.15 + nearSea * 0.85), nearSea)
      // angin: dasar, makin tinggi makin kencang, Frostfall lebih dingin & menderu; terendam di gua
      const wind = 0.18 + clamp01(h / 90) * 0.5 + cold * 0.35 + (warga ? warga.malam * cold * 0.1 : 0)
      L.angin.set(open * clamp01(wind) * (indoor ? 0.4 : 1) + (covered ? 0.05 : 0), clamp01(cold * 0.6 + h / 120))
      // serangga & burung: daratan tropis di siang hari
      const jungle = open * (1 - cold) * clamp01((1 - sea * 1.4) * 1.2) * (h > 1.5 ? 1 : 0.3)
      L.serangga.set(jungle * 0.8)
      L.gua.set(covered ? 0.5 + cave * 0.5 : 0)
      // air terjun & api unggun terdekat
      const wf = nearest(falls, pos, 70, 10)
      L.airTerjun.set(wf.g, undefined, wf.pan)
      const fire = nearest(fires, pos, 30, 3)
      L.api.set(fire.g, undefined, fire.pan)
      // keramaian: pasar & alun-alun (siang); Frostfall hanya di siang hari
      let crowd = 0
      for (const c of places.crowds) {
        const dd = rectDist(c, pos.x, pos.z)
        const k = (1 - clamp01(dd / 45)) * (c.malam === false && warga ? 1 - warga.malam : 1)
        if (k > crowd) crowd = k
      }
      // pesta Aeloria
      if (life?.feast && places.feast && rectDist(places.feast, pos.x, pos.z) < 60) crowd = Math.max(crowd, 1 - rectDist(places.feast, pos.x, pos.z) / 60)
      L.ramai.set(open * crowd * crowd * 0.9 + (indoor && crowd > 0.3 ? 0.2 : 0))
      // dengkur Naga Es yang tidur (berposisi)
      if (naga && naga.state === 'tidur') {
        const s = suara.spatial(naga.position, 45, 6)
        L.naga.set(s ? s.g : 0, undefined, s ? s.pan : 0)
      } else L.naga.set(0)

      // kejadian sesaat
      if (jungle > 0.3 && (birdT -= 0.15) <= 0) {
        birdT = rnd(1.2, 4.5)
        const a = Math.random() * Math.PI * 2
        const r = rnd(10, 35)
        suara.play('burung', { at: { x: pos.x + Math.cos(a) * r, y: pos.y + rnd(4, 12), z: pos.z + Math.sin(a) * r } })
      }
      if (open && nearSea > 0.3 && cold < 0.5 && (gullT -= 0.15) <= 0) {
        gullT = rnd(7, 16)
        const a = Math.random() * Math.PI * 2
        suara.play('burung-laut', { at: { x: pos.x + Math.cos(a) * 40, y: pos.y + 20, z: pos.z + Math.sin(a) * 40 } })
      }
      if (covered && (dripT -= 0.15) <= 0) {
        dripT = rnd(0.6, 2.4)
        const a = Math.random() * Math.PI * 2
        const r = rnd(3, 16)
        suara.play('tetes', { at: { x: pos.x + Math.cos(a) * r, y: pos.y + 2, z: pos.z + Math.sin(a) * r } })
      }
      if (open && night > 0.5 && (owlT -= 0.15) <= 0) {
        owlT = rnd(10, 24)
        const a = Math.random() * Math.PI * 2
        suara.play('burung-hantu', { at: { x: pos.x + Math.cos(a) * 50, y: pos.y + 12, z: pos.z + Math.sin(a) * 50 } })
      }
      // perkemahan bala tentara: denting zirah & ringkik kuda
      if (places.army && rectDist(places.army, pos.x, pos.z) < 70 && (campT -= 0.15) <= 0) {
        campT = rnd(0.8, 2.5)
        const r = places.army
        const at = { x: Math.min(r.x1, Math.max(r.x0, pos.x + rnd(-30, 30))), y: r.y + 1.5, z: Math.min(r.z1, Math.max(r.z0, pos.z + rnd(-30, 30))) }
        suara.play(Math.random() < 0.15 ? 'kuda' : 'zirah', { at })
      }
      // tungku pandai besi Aeloria (siang)
      if (places.smithy && rectDist(places.smithy, pos.x, pos.z) < 50 && (smithT -= 0.15) <= 0) {
        smithT = rnd(0.55, 0.9)
        const r = places.smithy
        suara.play('tempa', { at: { x: (r.x0 + r.x1) / 2 + rnd(-15, 15), y: (r.y ?? 7) + 1, z: (r.z0 + r.z1) / 2 + rnd(-20, 20) } })
      }
    }
    // orang di dekat pemain (setiap bingkai: langkahnya perlu tepat waktu)
    if (!covered || cave < 0.95) {
      people(warga?.agents, pos, dt, 'utara')
      people(life?.agents, pos, dt, 'elf')
      people(villagers?.agents, pos, dt, 'kencana')
      people(soldiersArmy, pos, dt, 'prajurit')
    }
    // air di sekitar perahu yang melaju / badan yang berenang
    L.perahu = L.perahu || suara.loop('perahu-air')
    L.perahu.set(swimming ? 0.45 : clamp01(boatSpeed / 5) * 0.8, swimming ? 0.3 : clamp01(boatSpeed / 6))
  }

  return { update, surfaceName }
}
