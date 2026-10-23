import * as THREE from 'three'
import { ISLAND } from '../world/island.js'
import { BARANG } from '../world/aeloria/ekonomi.js'

// Memancing: berdiri di tepi air (pantai, dermaga, air dangkal) atau duduk di perahu, menghadap air
// yang cukup dalam, dengan pancing di Tas (dibuat dari kayu). Lempar kail → pelampung terapung →
// saat ikan menyambar (pelampung tertarik ke bawah, HP bergetar) tekan "Tarik!" dalam 1,5 detik →
// ikan masuk Tas. Jenis ikan menurut kedalaman air di pelampung: belanak & kakap di pinggir,
// tongkol & kerapu lebih ke tengah, ikan layaran hanya di laut dalam (biasanya dari perahu).
// Bergerak, diserang, atau berenang membatalkan.
export const KAYU_PANCING = 3
const CAST = [5, 16] // m di depan pemain: tempat pelampung jatuh (dicoba dari yang terjauh; pantai landai)
const MIN_DEPTH = 0.7 // m: air di pelampung minimal sedalam ini
const THROW = 0.7 // detik ayunan melempar
const WAIT = [3, 9] // detik menunggu sambaran
const BITE = 1.5 // detik kesempatan menarik
const LINE_PTS = 14

// [kedalaman minimum, peluang per jenis ikan]
const IKAN = [
  [0, { ikanBelanak: 60, ikanKakap: 35, ikanKerapu: 5 }],
  [2.5, { ikanBelanak: 25, ikanKakap: 40, ikanTongkol: 25, ikanKerapu: 10 }],
  [7, { ikanKakap: 20, ikanTongkol: 40, ikanKerapu: 25, ikanLayaran: 15 }],
]

export function fishFor(depth, rand = Math.random) {
  let table = IKAN[0][1]
  for (const [d, t] of IKAN) if (depth >= d) table = t
  const total = Object.values(table).reduce((s, v) => s + v, 0)
  let r = rand() * total
  for (const [id, w] of Object.entries(table)) {
    r -= w
    if (r <= 0) return id
  }
  return Object.keys(table)[0]
}

// player: player.js (pose, gerakan, ujung pancing); bag: tas; ripples: riak.js; message(teks, ms)
export function createFishing({ ground, player, bag, ripples, message, rand = Math.random }) {
  const group = new THREE.Group()
  group.name = 'pancing'
  group.visible = false
  // pelampung merah-putih
  const bobber = new THREE.Group()
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: '#e0352b' }))
  const bottom = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), new THREE.MeshLambertMaterial({ color: '#f4f1ea' }))
  bobber.add(top, bottom)
  // tali pancing: garis melengkung dari ujung joran ke pelampung
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(LINE_PTS * 3), 3))
  const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: '#f2f2f2', transparent: true, opacity: 0.75 }))
  line.frustumCulled = false
  group.add(bobber, line)

  const S = { state: null, t: 0, wait: 0, x: 0, z: 0, depth: 0, from: new THREE.Vector3(), rip: 0 }
  const tip = new THREE.Vector3()

  const depthAt = (x, z) => ISLAND.seaLevel - ground.surfaceAt(x, z)
  // tempat pelampung di depan pemain (arah hadap; di perahu = arah haluan) atau null
  function spot() {
    const p = player.position
    const h = player.heading
    for (let d = CAST[1]; d >= CAST[0]; d -= 1) {
      const x = p.x + Math.sin(h) * d
      const z = p.z + Math.cos(h) * d
      const depth = depthAt(x, z)
      if (depth >= MIN_DEPTH) return { x, z, depth }
    }
    return null
  }
  function stop() {
    S.state = null
    group.visible = false
    player.setPose(null)
  }
  function updateLine(sag) {
    player.rodTip(tip)
    const a = line.geometry.attributes.position
    const by = bobber.position.y + 0.08
    for (let i = 0; i < LINE_PTS; i++) {
      const k = i / (LINE_PTS - 1)
      a.setXYZ(i, tip.x + (bobber.position.x - tip.x) * k, tip.y + (by - tip.y) * k - Math.sin(k * Math.PI) * sag, tip.z + (bobber.position.z - tip.z) * k)
    }
    a.needsUpdate = true
  }

  return {
    object: group,
    // keadaan: null (tidak memancing), 'lempar', 'tunggu', 'sambar'
    get state() {
      return S.state
    },
    get canStart() {
      return !S.state && !!bag.punya.pancing && !player.swimming && !player.defeated && !!spot()
    },
    spot,
    start() {
      if (S.state) return false
      if (!bag.punya.pancing) {
        message(`Kamu belum punya pancing. Buat di Tas dari ${KAYU_PANCING} kayu (pukul batang pohon untuk mendapat kayu).`, 3600)
        return false
      }
      const at = spot()
      if (!at) {
        message('Airnya terlalu dangkal di depanmu. Menghadaplah ke laut, atau memancing dari dermaga / perahu.', 3000)
        return false
      }
      Object.assign(S, { state: 'lempar', t: 0, x: at.x, z: at.z, depth: at.depth })
      player.stop()
      player.setPose('holding-right')
      player.gesture('interact-right', THROW)
      player.rodTip(S.from)
      group.visible = true
      return true
    },
    // tombol Tarik: berhasil hanya saat ikan sedang menyambar
    pull() {
      if (S.state === 'sambar') {
        const id = fishFor(S.depth, rand)
        bag.terima(id)
        ripples.spawn(S.x, S.z, 1.8, 0.7)
        player.gesture('emote-yes', 1.0)
        message(`Dapat ${BARANG[id].nama}! Masuk ke Tas — bisa dimakan atau dijual di Kios Ikan Bakar Aeloria.`, 3200)
        stop()
        return id
      }
      if (S.state === 'tunggu') {
        message('Terlalu cepat — ikannya belum menyambar.', 1600)
        stop()
      }
      return null
    },
    cancel() {
      if (S.state) stop()
    },
    update(dt, moving) {
      if (!S.state) return
      // bergerak / berenang / roboh membatalkan
      if (moving || player.swimming || player.defeated || player.attacking) {
        stop()
        return
      }
      S.t += dt
      const wy = ISLAND.seaLevel + 0.02
      if (S.state === 'lempar') {
        // pelampung melayang dari ujung joran ke air
        const k = Math.min(1, S.t / THROW)
        player.rodTip(tip)
        bobber.position.set(tip.x + (S.x - tip.x) * k, tip.y + (wy - tip.y) * k + Math.sin(k * Math.PI) * 1.6, tip.z + (S.z - tip.z) * k)
        updateLine(0.1)
        if (k >= 1) {
          ripples.spawn(S.x, S.z, 1.2, 0.6)
          S.state = 'tunggu'
          S.t = 0
          S.wait = WAIT[0] + rand() * (WAIT[1] - WAIT[0])
        }
        return
      }
      if (S.state === 'tunggu') {
        bobber.position.set(S.x, wy + Math.sin(S.t * 2.2) * 0.025, S.z)
        // sesekali ikan menyentuh umpan (pelampung bergetar kecil)
        if ((S.rip -= dt) <= 0) {
          S.rip = 1.4 + rand() * 1.4
          ripples.spawn(S.x, S.z, 0.6, 0.3)
        }
        updateLine(0.35)
        if (S.t >= S.wait) {
          S.state = 'sambar'
          S.t = 0
          ripples.spawn(S.x, S.z, 1.4, 0.8)
          try {
            navigator.vibrate?.([60, 40, 90])
          } catch {
            // getar tidak didukung
          }
        }
        return
      }
      // sambar: pelampung tertarik ke bawah & berguncang
      bobber.position.set(S.x + Math.sin(S.t * 31) * 0.05, wy - 0.12 - Math.abs(Math.sin(S.t * 9)) * 0.08, S.z)
      updateLine(0.05)
      if ((S.rip -= dt) <= 0) {
        S.rip = 0.3
        ripples.spawn(S.x, S.z, 0.9, 0.6)
      }
      if (S.t >= BITE) {
        message('Ikannya lepas… tekan Tarik! begitu pelampung tertarik ke bawah.', 2600)
        stop()
      }
    },
  }
}
