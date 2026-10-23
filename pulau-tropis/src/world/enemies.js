import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'

// Musuh: orc (Kenney "Mini Dungeon" 2.0, CC0) — rig & animasi sama persis dengan prajurit.
// - Berkelompok 5 ekor di beberapa perkemahan (satu ±16 m di depan titik mulai). Berkeliaran pelan
//   di sekitar perkemahan dan menoleh ke prajurit bila dekat. Belum menyerang (belum ada nyawa
//   pemain).
// - Nyawa 6: bar merah muncul di atas kepala saat terkena; berkedip putih & terpental saat dipukul;
//   roboh (animasi die) saat nyawa habis, terbaring sebentar, tenggelam ke tanah, lalu muncul lagi
//   di perkemahan setelah RESPAWN detik.
// - Jurus Penggal: tanda bidik merah di kepala, lalu kepala terlepas & terlempar (tanpa darah).
// - SERBUAN: sesekali (diatur keamanan.js) tiga orc dari perkemahan terdekat menyerbu Kotaraja
//   Kencana. Pulau-pulau tidak tersambung jembatan, jadi mereka berjalan ke pantai barat Pulau
//   Tropis, mengarungi air dangkal ke PERAHU PERANG mereka, berlayar ke pantai timur Pulau Kencana
//   (di utara Dermaga Timur), turun, lalu berjalan ke gerbang timur. Orc penyerbu menyerang prajurit
//   kerajaan yang menghadang (dan pemain yang memukulnya); yang selamat pulang lewat jalan yang sama
//   (naik perahu lagi). Orc di perkemahan tetap tidak menyerang.
// Hemat untuk HP: orc yang jauh (> VIEW m dari prajurit) tidak digambar dan tidak dianimasikan.

export const MAX_HP = 6
const RADIUS = 0.35
const WALK_SPEED = 1.1 // m/s
const WANDER = 4 // m dari pusat perkemahan
const ALERT = 9 // m: menoleh ke prajurit
const VIEW = 60 // m
const DEAD_TIME = 2.6 // detik terbaring sebelum tenggelam
const SINK_TIME = 1.0
const RESPAWN = 15 // detik setelah hilang
const PER_CAMP = 5
const HEAD_Y = 1.3 // m: tinggi pusat kepala (kepala besar: leher ±0,8 m, ubun-ubun ±1,8 m)
const RAID = { size: 3, speed: 2.4, sight: 7, reach: 1.3, hit: 0.24, dur: 0.42, linger: 25, view: 150 }
const RAID_GOAL = { x: -425, z: 40 } // tepat di dalam gerbang timur Kotaraja Kencana
// perahu perang: lintasan di garis z (utara Dermaga Timur & Dermaga Barat), kecepatan (m/s), tempat
// duduk penumpang (ruang lokal perahu, haluan = +z), air tempat orc naik/turun (m), perahu menunggu
// penumpang yang masih dalam perjalanan ke tambatan paling lama `wait` detik; orc yang tertinggal
// perahu menyerah setelah `giveUp` detik
const SHIP = { z: 66, speed: 6, seats: [[0.5, 2.2], [-0.5, 0.8], [0.5, -0.6], [-0.5, -2]], wade: 0.75, draft: 1.3, wait: 30, giveUp: 45 }
const ME = { kind: 'pemain' }

// tanda bidik: cincin + 4 garis pendek (bidang XY, menghadap kamera)
function reticleGeometry() {
  const ring = new THREE.RingGeometry(0.5, 0.58, 40)
  const ticks = [0, 1, 2, 3].map(i => {
    const g = new THREE.PlaneGeometry(0.07, 0.26)
    g.translate(0, 0.66, 0)
    g.rotateZ((i * Math.PI) / 2)
    return g
  })
  const all = [ring, ...ticks].map(g => g.toNonIndexed())
  const pos = all.flatMap(g => [...g.attributes.position.array])
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  return geo
}

// titik lapang untuk orc: kering, tidak curam, bisa dilewati, jauh dari batang & batu
function standable(ground, colliders, nav, x, z, r = 0.6) {
  return ground.heightAt(x, z) > 0.5 && ground.slopeAt(x, z) < 0.6 && nav.walkableAt(x, z) && colliders.isFree(x, z, r)
}

// pusat perkemahan terdekat dari (x, z) yang cukup lapang untuk PER_CAMP orc (cari melingkar)
function findCamp(ground, colliders, nav, x, z) {
  for (let r = 0; r <= 40; r += 2)
    for (let a = 0; a < Math.PI * 2; a += r ? 2 / r : 7) {
      const cx = x + Math.cos(a) * r
      const cz = z + Math.sin(a) * r
      if (!standable(ground, colliders, nav, cx, cz, 0.8)) continue
      const spots = []
      for (let i = 0; i < PER_CAMP; i++) {
        const b = (i / PER_CAMP) * Math.PI * 2
        spots.push({ x: cx + Math.cos(b) * 2.6, z: cz + Math.sin(b) * 2.6 })
      }
      if (spots.every(s => standable(ground, colliders, nav, s.x, s.z))) return { x: cx, z: cz, spots }
    }
  return null
}

// asset: hasil loadPlayerModel untuk orc; spawn: titik mulai prajurit; shipMesh: mesh perahu perang
// (tanpa perahu = tidak ada serbuan)
export function createEnemies({ ground, colliders, nav, asset, spawn, shipMesh = null }) {
  const group = new THREE.Group()
  group.name = 'musuh'
  const list = []

  // --- bahan bersama: bar nyawa & tanda bidik (selalu terlihat, di atas objek lain)
  const barGeo = new THREE.PlaneGeometry(1, 1)
  const barBack = new THREE.MeshBasicMaterial({ color: '#2a0d0d', transparent: true, opacity: 0.85, depthTest: false, depthWrite: false })
  const barFill = new THREE.MeshBasicMaterial({ color: '#ff4636', depthTest: false, depthWrite: false, toneMapped: false })
  const reticleGeo = reticleGeometry()
  const reticleMat = new THREE.MeshBasicMaterial({
    color: '#ff2a2a', transparent: true, opacity: 0.95, depthTest: false, depthWrite: false, toneMapped: false, side: THREE.DoubleSide,
  })

  // kepala yang terlempar: geometri kepala dipusatkan agar berputar di tengahnya
  const templateHead = asset.model.getObjectByName('head-mesh')
  const headCenter = new THREE.Vector3()
  templateHead.geometry.computeBoundingBox()
  templateHead.geometry.boundingBox.getCenter(headCenter)
  const headGeo = templateHead.geometry.clone().translate(-headCenter.x, -headCenter.y, -headCenter.z)
  headGeo.deleteAttribute('skinIndex')
  headGeo.deleteAttribute('skinWeight')
  const heads = []

  const clipOf = name => THREE.AnimationClip.findByName(asset.clips, name)

  function makeOrc(id, home) {
    const root = new THREE.Group()
    root.name = 'orc'
    const model = cloneSkinned(asset.model)
    const materials = []
    model.traverse(o => {
      if (!o.isMesh) return
      o.material = o.material.clone() // kedipan putih per orc
      materials.push(o.material)
    })
    root.add(model)
    const mixer = new THREE.AnimationMixer(model)
    const actions = {}
    for (const name of ['idle', 'walk', 'sprint', 'die', 'attack']) {
      const a = mixer.clipAction(clipOf(name === 'attack' ? 'attack-melee-right' : name))
      if (name === 'die' || name === 'attack') {
        a.setLoop(THREE.LoopOnce, 1)
        a.clampWhenFinished = true
      }
      actions[name] = a
    }
    actions.idle.play()
    const bar = new THREE.Group()
    const back = new THREE.Mesh(barGeo, barBack)
    back.scale.set(1.08, 0.2, 1)
    back.renderOrder = 11
    const fill = new THREE.Mesh(barGeo, barFill)
    fill.renderOrder = 12
    bar.add(back, fill)
    bar.visible = false
    const reticle = new THREE.Mesh(reticleGeo, reticleMat)
    reticle.visible = false
    reticle.renderOrder = 13
    group.add(root, bar, reticle)
    root.position.set(home.x, ground.heightAt(home.x, home.z), home.z)
    const heading = Math.random() * Math.PI * 2
    root.rotation.y = heading
    return {
      id, root, model, mixer, actions, current: actions.idle, materials, bar, fill, reticle,
      headMesh: model.getObjectByName('head-mesh'), headBone: model.getObjectByName('head'),
      home, pos: root.position, heading, target: null, wait: Math.random() * 3,
      hp: MAX_HP, kx: 0, kz: 0, flash: 0, barTime: 0, state: 'hidup', deadT: 0, headless: false, marked: false, raid: null,
    }
  }

  function play(e, name, fade = 0.2) {
    const next = e.actions[name]
    if (e.current === next) return
    next.reset().play()
    next.crossFadeFrom(e.current, fade, false)
    e.current = next
  }

  // --- perkemahan: satu di depan titik mulai (menuju pusat pulau), sisanya tersebar
  const toCenter = Math.atan2(-spawn.x, -spawn.z)
  const wanted = [
    { x: spawn.x + Math.sin(toCenter) * 16, z: spawn.z + Math.cos(toCenter) * 16 },
    { x: -60, z: -80 }, // padang barat gunung
    { x: 205, z: 25 }, // timur
    { x: 40, z: -200 }, // utara
    { x: 15, z: 190 }, // selatan
  ]
  const camps = []
  for (const w of wanted) {
    const camp = findCamp(ground, colliders, nav, w.x, w.z)
    if (!camp) continue
    camps.push(camp)
    for (const s of camp.spots) list.push(makeOrc(list.length, { x: s.x, z: s.z, camp }))
  }

  function kill(e) {
    e.state = 'mati'
    e.deadT = 0
    e.hp = 0
    e.marked = false
    e.target = null
    e.raid = null
    e.ride = false
    play(e, 'die', 0.08)
  }

  function respawn(e) {
    e.state = 'hidup'
    e.hp = MAX_HP
    e.headless = false
    e.headMesh.visible = true
    e.kx = e.kz = 0
    e.flash = e.barTime = 0
    e.model.position.y = 0
    e.ride = false
    e.pos.set(e.home.x, ground.heightAt(e.home.x, e.home.z), e.home.z)
    e.actions.die.stop()
    e.current.stop()
    e.current = e.actions.idle
    e.current.reset().play()
  }

  // --- perahu perang: ditambatkan di pantai barat Pulau Tropis ('tropis'); saat serbuan berlayar ke
  // pantai timur Pulau Kencana ('kencana') lalu kembali. Tiap tambatan: tempat perahu (air sedalam
  // SHIP.draft) dan tempat orc naik/turun sambil mengarungi air (sedalam SHIP.wade)
  const waterline = (x0, dir, depth) => {
    for (let x = x0; Math.abs(x - x0) < 260; x += dir * 0.5) if (ground.heightAt(x, SHIP.z) < -depth) return x
    return null
  }
  const stopAt = (x0, dir) => {
    const boat = waterline(x0, dir, SHIP.draft)
    const wade = waterline(x0, dir, SHIP.wade)
    return boat === null || wade === null ? null : { boat: { x: boat, z: SHIP.z }, wade: { x: wade, z: SHIP.z } }
  }
  const stops = { tropis: stopAt(-150, -1), kencana: stopAt(-360, 1) }
  const ship = shipMesh && stops.tropis && stops.kencana
    ? { mesh: shipMesh, at: 'tropis', to: null, state: 'tambat', x: stops.tropis.boat.x, z: SHIP.z, heading: -Math.PI / 2, waitT: 0, t: 0, y: 0 }
    : null
  if (ship) group.add(shipMesh)
  const seatPos = k => {
    const [sx, sz] = SHIP.seats[k % SHIP.seats.length]
    const c = Math.cos(ship.heading)
    const s = Math.sin(ship.heading)
    return { x: ship.x + sx * c + sz * s, z: ship.z - sx * s + sz * c }
  }
  const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))
  const sailLeg = e => e.raid && e.raid.legs[e.raid.li]?.sail
  // tujuan pelayaran berikutnya yang masih harus ditempuh penyerbu e (null bila tidak ada)
  const nextSail = e => (e.state === 'hidup' && !e.ride && e.raid ? e.raid.legs.slice(e.raid.li).find(l => l.sail)?.sail ?? null : null)
  function updateShip(dt) {
    if (!ship) return
    ship.t += dt
    const riders = list.filter(e => e.ride && e.state === 'hidup')
    if (ship.state === 'tambat') {
      // penyerbu yang masih dalam perjalanan ke tambatan ini (berjalan / mengarungi air) — ditunggu
      const w = stops[ship.at].wade
      const coming = list.some(e => {
        const to = nextSail(e)
        return to && to !== ship.at && Math.hypot(e.pos.x - w.x, e.pos.z - w.z) < 160
      })
      if (riders.length) {
        ship.waitT += dt
        if (!coming || ship.waitT > SHIP.wait) {
          ship.to = sailLeg(riders[0])
          ship.state = 'berlayar'
        }
      } else if (!coming && ship.at !== 'tropis' && !list.some(e => e.raid && e.state === 'hidup')) {
        // semua penyerbu kalah: perahu kosong kembali ke tambatannya
        ship.to = 'tropis'
        ship.state = 'berlayar'
      } else ship.waitT = 0
    }
    if (ship.state === 'berlayar') {
      const goal = stops[ship.to].boat
      const dx = goal.x - ship.x
      const dz = goal.z - ship.z
      const d = Math.hypot(dx, dz)
      if (d < 0.4) {
        ship.state = 'tambat'
        ship.at = ship.to
        ship.waitT = 0
      } else {
        ship.heading += wrap(Math.atan2(dx, dz) - ship.heading) * Math.min(1, dt * 1.5)
        const step = Math.min(Math.min(SHIP.speed, 0.6 + d * 0.5) * dt, d)
        ship.x += (dx / d) * step
        ship.z += (dz / d) * step
      }
    }
    ship.y = 0.12 + Math.sin(ship.t * 1.2) * 0.07
    ship.mesh.position.set(ship.x, ship.y, ship.z)
    ship.mesh.rotation.set(Math.sin(ship.t * 0.8) * 0.02, ship.heading, Math.sin(ship.t * 1.05) * 0.04)
    for (const e of riders) {
      const s = seatPos(e.seat)
      e.pos.set(s.x, ship.y + 0.25, s.z)
      e.heading = ship.heading
    }
  }
  // penyerbu di bagian perjalanan perahu: mengarungi air ke perahu, naik, menunggu tiba, turun
  function sailStep(e, R, leg, dt) {
    if (!ship) {
      e.raid = null
      return 0
    }
    if (e.ride) {
      if (ship.state === 'tambat' && ship.at === leg.sail) {
        e.ride = false
        const w = stops[ship.at].wade
        e.pos.set(w.x + (Math.random() - 0.5) * 2, 0, w.z + (Math.random() - 0.5) * 2)
        R.li++
        R.i = 0
      }
      return 0
    }
    // perahu sedang di tempat lain / berlayar: menunggu di tepi air; tertinggal terlalu lama =
    // menyerah (berhenti menyerbu)
    if (ship.state !== 'tambat' || ship.at === leg.sail) {
      if ((R.waitShip = (R.waitShip || 0) + dt) > SHIP.giveUp) e.raid = null
      return 0
    }
    R.waitShip = 0
    const s = seatPos(e.seat)
    const dx = s.x - e.pos.x
    const dz = s.z - e.pos.z
    const d = Math.hypot(dx, dz)
    if (d < 1.6) {
      e.ride = true
      return 0
    }
    turn(e, Math.atan2(dx, dz), dt)
    const v = RAID.speed * 0.6 // mengarungi air
    e.pos.x += (dx / d) * Math.min(v * dt, d)
    e.pos.z += (dz / d) * Math.min(v * dt, d)
    return v
  }

  // titik jalan-jalan acak di sekitar perkemahan
  function pickWander(e) {
    for (let k = 0; k < 4; k++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * WANDER
      const x = e.home.camp.x + Math.cos(a) * r
      const z = e.home.camp.z + Math.sin(a) * r
      if (standable(ground, colliders, nav, x, z, 0.5)) return { x, z }
    }
    return null
  }

  function turn(e, want, dt) {
    const diff = Math.atan2(Math.sin(want - e.heading), Math.cos(want - e.heading))
    e.heading += diff * Math.min(1, 6 * dt)
  }

  // --- serbuan: lawan (prajurit kerajaan / pemain) dicari & diserang lewat foes (dari main.js):
  // near(x, z, r) → sasaran | null, pos(sasaran) → { x, z } | null, strike(orc, sasaran, kerusakan)
  let foes = { near: () => null, pos: () => null, strike: () => {} }
  // langkah orc penyerbu; hasil = kecepatan (0 = diam). R.legs = bagian perjalanan berurutan:
  // { walk: [titik…] } berjalan kaki / { sail: tujuan } naik perahu perang
  function stepRaider(e, dt, pp) {
    const R = e.raid
    const leg = R.legs[R.li]
    if (leg?.sail) return sailStep(e, R, leg, dt)
    if (R.target) {
      const tp = R.target === ME ? pp : foes.pos(R.target)
      if (!tp || (R.target === ME && Math.hypot(tp.x - e.pos.x, tp.z - e.pos.z) > 25)) R.target = null
    }
    // selalu menyerang lawan terdekat (pemain yang memukulnya tetap dikejar selama dekat)
    R.scan -= dt
    if (R.scan <= 0) {
      R.scan = 0.4
      const keepPlayer = R.target === ME && Math.hypot(pp.x - e.pos.x, pp.z - e.pos.z) < 8
      if (!keepPlayer) R.target = foes.near(e.pos.x, e.pos.z, RAID.sight)
    }
    R.cd -= dt
    if (R.atk) {
      const { atk } = R // strike() bisa mengubah keadaan di sekitarnya (lihat prajurit.js)
      atk.t += dt
      const tp = R.target ? (R.target === ME ? pp : foes.pos(R.target)) : null
      if (tp) turn(e, Math.atan2(tp.x - e.pos.x, tp.z - e.pos.z), dt)
      if (!atk.hit && atk.t >= RAID.hit) {
        atk.hit = true
        if (tp && Math.hypot(tp.x - e.pos.x, tp.z - e.pos.z) < RAID.reach + 0.6) foes.strike(e, R.target, R.target === ME ? 6 : 1)
      }
      if (atk.t >= RAID.dur && R.atk === atk) R.atk = null
      return false
    }
    let goal = null
    let { speed } = RAID
    if (R.target) {
      const tp = R.target === ME ? pp : foes.pos(R.target)
      const d = Math.hypot(tp.x - e.pos.x, tp.z - e.pos.z)
      if (d <= RAID.reach) {
        turn(e, Math.atan2(tp.x - e.pos.x, tp.z - e.pos.z), dt)
        if (R.cd <= 0) {
          R.atk = { t: 0, hit: false }
          R.cd = 1.5 + Math.random() * 0.5
          e.actions.attack.reset()
          play(e, 'attack', 0.05)
        }
        return false
      }
      goal = tp
      if (d < 4) speed = 1.6
    } else if (leg && R.i < leg.walk.length) {
      goal = leg.walk[R.i]
      if (Math.hypot(goal.x - e.pos.x, goal.z - e.pos.z) < 1.2) R.i++
    } else if (leg) {
      // ujung bagian jalan kaki ini → bagian berikutnya (naik perahu / jalan lagi)
      R.li++
      R.i = 0
      return false
    } else if (!R.back) {
      // sampai tujuan: berkeliaran sebentar, lalu pulang lewat jalan yang sama (naik perahu lagi)
      R.idle += dt
      if (R.idle > RAID.linger) {
        R.back = true
        R.legs = R.homeLegs
        R.li = 0
        R.i = 0
      }
      return false
    } else {
      e.raid = null // pulang ke perkemahan
      return false
    }
    const dx = goal.x - e.pos.x
    const dz = goal.z - e.pos.z
    const d = Math.hypot(dx, dz) || 1
    turn(e, Math.atan2(dx, dz), dt)
    e.pos.x += (dx / d) * Math.min(speed * dt, d)
    e.pos.z += (dz / d) * Math.min(speed * dt, d)
    return speed
  }

  // --- kepala terlempar
  const m4 = new THREE.Matrix4()
  const center = new THREE.Matrix4().makeTranslation(headCenter.x, headCenter.y, headCenter.z)
  function launchHead(e, from) {
    let h = heads.find(k => !k.mesh.visible)
    if (!h) {
      h = { mesh: new THREE.Mesh(headGeo), vel: new THREE.Vector3(), axis: new THREE.Vector3(), spin: 0, t: 0, s: 1 }
      h.mesh.castShadow = true
      group.add(h.mesh)
      heads.push(h)
    }
    // pose kepala saat ini: tulang kepala × invers ikatan × matriks ikat (bobot kulit 100% ke kepala)
    e.root.updateMatrixWorld(true)
    const sk = e.headMesh.skeleton
    m4.multiplyMatrices(e.headBone.matrixWorld, sk.boneInverses[sk.bones.indexOf(e.headBone)])
      .multiply(e.headMesh.bindMatrix).multiply(center)
    m4.decompose(h.mesh.position, h.mesh.quaternion, h.mesh.scale)
    h.s = h.mesh.scale.x
    h.mesh.material = e.headMesh.material
    h.mesh.visible = true
    // terlempar menjauhi prajurit, sedikit menyamping, berputar
    let ax = e.pos.x - from.x
    let az = e.pos.z - from.z
    const al = Math.hypot(ax, az) || 1
    ax /= al
    az /= al
    const side = (Math.random() - 0.5) * 1.6
    const sp = 2 + Math.random() * 1.5
    h.vel.set((ax - az * side) * sp, 4.5 + Math.random() * 1.5, (az + ax * side) * sp)
    h.axis.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
    h.spin = 7 + Math.random() * 6
    h.t = 0
    e.headMesh.visible = false
    e.headless = true
  }

  function updateHeads(dt) {
    for (const h of heads) {
      if (!h.mesh.visible) continue
      h.t += dt
      const p = h.mesh.position
      h.vel.y -= 14 * dt
      p.addScaledVector(h.vel, dt)
      h.mesh.rotateOnWorldAxis(h.axis, h.spin * dt)
      const floor = Math.max(ground.heightAt(p.x, p.z), -0.2) + 0.4
      if (p.y < floor) {
        p.y = floor
        if (h.vel.y < -2) {
          // memantul, makin pelan
          h.vel.set(h.vel.x * 0.55, -h.vel.y * 0.35, h.vel.z * 0.55)
          h.spin *= 0.5
        } else {
          h.vel.set(0, 0, 0)
          h.spin = 0
        }
      }
      // setelah 3 detik mengecil lalu hilang
      if (h.t > 3) h.mesh.scale.setScalar(h.s * Math.max(0, 1 - (h.t - 3) / 0.5))
      if (h.t > 3.5) h.mesh.visible = false
    }
  }

  let clock = 0
  const tmp = new THREE.Vector3()

  return {
    object: group,
    list,
    camps,
    get alive() {
      return list.filter(e => e.state === 'hidup').length
    },
    // lingkaran (x, z, r): kenai semua orc hidup di dalamnya; from = posisi prajurit (arah terpental)
    hit(shape, damage, knock, from) {
      const out = []
      for (const e of list) {
        if (e.state !== 'hidup') continue
        if (Math.hypot(e.pos.x - shape.x, e.pos.z - shape.z) > shape.r + RADIUS) continue
        let ax = e.pos.x - from.x
        let az = e.pos.z - from.z
        const al = Math.hypot(ax, az) || 1
        ax /= al
        az /= al
        e.kx = ax * knock
        e.kz = az * knock
        e.hp -= damage
        e.flash = 0.15
        e.barTime = 4
        e.target = null
        if (e.raid) e.raid.target = ME
        if (e.hp <= 0) kill(e)
        out.push({ id: e.id, x: e.pos.x, y: e.pos.y, z: e.pos.z, dead: e.state !== 'hidup' })
      }
      return out
    },
    // potong leher orc-orc ini sekaligus (jurus Penggal)
    decapitate(ids, from) {
      const out = []
      for (const id of ids) {
        const e = list[id]
        if (!e || e.state !== 'hidup') continue
        launchHead(e, from)
        kill(e)
        out.push({ id, x: e.pos.x, y: e.pos.y, z: e.pos.z })
      }
      return out
    },
    // sasaran Penggal: maks. `max` orc hidup terdekat dalam `range`, diurutkan menjadi jalur
    // terpendek (tetangga terdekat) mulai dari (x, z)
    pickTargets(x, z, range, max) {
      const near = list
        .filter(e => e.state === 'hidup' && Math.hypot(e.pos.x - x, e.pos.z - z) <= range)
        .sort((a, b) => Math.hypot(a.pos.x - x, a.pos.z - z) - Math.hypot(b.pos.x - x, b.pos.z - z))
        .slice(0, max)
      const out = []
      let cx = x
      let cz = z
      while (near.length) {
        let best = 0
        for (let i = 1; i < near.length; i++)
          if (Math.hypot(near[i].pos.x - cx, near[i].pos.z - cz) < Math.hypot(near[best].pos.x - cx, near[best].pos.z - cz)) best = i
        const [e] = near.splice(best, 1)
        out.push({ id: e.id, x: e.pos.x, z: e.pos.z })
        cx = e.pos.x
        cz = e.pos.z
      }
      return out
    },
    // posisi orc yang masih hidup (null bila sudah roboh)
    position(id) {
      const e = list[id]
      return e && e.state === 'hidup' ? { x: e.pos.x, z: e.pos.z } : null
    },
    // kerusakan pada satu orc (serangan prajurit kerajaan); from = posisi penyerang
    damage(id, amount, from) {
      const e = list[id]
      if (!e || e.state !== 'hidup') return
      let ax = e.pos.x - from.x
      let az = e.pos.z - from.z
      const al = Math.hypot(ax, az) || 1
      ax /= al
      az /= al
      e.kx = ax * 1.6
      e.kz = az * 1.6
      e.hp -= amount
      e.flash = 0.15
      e.barTime = 4
      if (e.hp <= 0) kill(e)
    },
    setFoes(f) {
      foes = f
    },
    // mulai serbuan ke Kotaraja dari perkemahan terdekat dengan tambatan perahu perang yang tidak
    // sedang didekati pemain (avoid): jalan ke pantai → perahu → pantai Kencana → gerbang timur.
    // false bila perahu tidak di tambatannya / tidak ada jalan / orc
    startRaid(avoid) {
      if (!ship || ship.state !== 'tambat' || ship.at !== 'tropis') return false
      const dock = stops.tropis.wade
      const ashore = nav.findPath(stops.kencana.wade, RAID_GOAL)
      if (!ashore) return false
      const ok = camps
        .filter(c => Math.hypot(c.x - avoid.x, c.z - avoid.z) > 60)
        .map(c => ({ c, members: list.filter(e => e.home.camp === c && e.state === 'hidup' && !e.raid) }))
        .filter(o => o.members.length >= 2)
        .sort((a, b) => Math.hypot(a.c.x - dock.x, a.c.z - dock.z) - Math.hypot(b.c.x - dock.x, b.c.z - dock.z))
      for (const { c, members } of ok) {
        const toShore = nav.findPath({ x: c.x, z: c.z }, dock)
        if (!toShore) continue
        members.slice(0, RAID.size).forEach((e, k) => {
          e.target = null
          e.seat = k
          e.raid = {
            legs: [{ walk: toShore.slice() }, { sail: 'kencana' }, { walk: ashore.slice() }],
            homeLegs: [{ walk: [...ashore].reverse() }, { sail: 'tropis' }, { walk: [...toShore].reverse().concat([{ x: e.home.x, z: e.home.z }]) }],
            li: 0, i: 0, target: null, scan: k * 0.13, cd: 0, atk: null, idle: 0, back: false,
          }
          // berangkat berurutan (beberapa langkah di belakang yang di depan)
          e.raid.delay = k * 0.9
        })
        return true
      }
      return false
    },
    // perahu perang orc (untuk pengujian & peta): { x, z, at, state } atau null
    get ship() {
      return ship && { x: ship.x, z: ship.z, at: ship.at, state: ship.state, riders: list.filter(e => e.ride && e.state === 'hidup').length }
    },
    get raidActive() {
      return list.some(e => e.raid && e.state === 'hidup')
    },
    // orc penyerbu yang masih hidup
    raiders() {
      return list.filter(e => e.raid && e.state === 'hidup').map(e => ({ id: e.id, x: e.pos.x, z: e.pos.z }))
    },
    // hidupkan lagi semua orc di perkemahannya (untuk pengujian)
    reviveAll() {
      for (const e of list) respawn(e)
    },
    // tampilkan / sembunyikan tanda bidik
    mark(ids, on) {
      for (const id of ids) if (list[id]) list[id].marked = on && list[id].state === 'hidup'
    },
    // focus = titik pandang kamera (mode "Lihat pulau": orc digambar di sekitar titik itu)
    update(dt, camera, player, focus = player.position) {
      clock += dt
      updateShip(dt)
      const pp = player.position
      // saat Penggal prajurit melesat menembus barisan orc — orc tidak didorong
      const through = player.attackMove === 'penggal'
      for (const e of list) {
        const dx = e.pos.x - pp.x
        const dz = e.pos.z - pp.z
        const dist = Math.hypot(dx, dz)
        const near = Math.hypot(e.pos.x - focus.x, e.pos.z - focus.z) < (e.raid ? RAID.view : VIEW)
        if (e.state === 'hilang') {
          e.deadT += dt
          if (e.deadT > RESPAWN) respawn(e)
          e.root.visible = false
          e.bar.visible = e.reticle.visible = false
          continue
        }
        e.root.visible = near
        if (e.state === 'mati') {
          e.deadT += dt
          // terbaring, lalu tenggelam perlahan ke tanah
          if (e.deadT > DEAD_TIME) e.model.position.y = -((e.deadT - DEAD_TIME) / SINK_TIME) * 0.9
          if (e.deadT > DEAD_TIME + SINK_TIME) {
            e.state = 'hilang'
            e.deadT = 0
          }
        } else {
          let moving = false
          let raidMove = 0
          if (e.raid && e.raid.delay > 0) e.raid.delay -= dt
          if (Math.abs(e.kx) + Math.abs(e.kz) > 0.05) {
            // terpental (tidak sampai masuk laut)
            const nx = e.pos.x + e.kx * dt
            const nz = e.pos.z + e.kz * dt
            if (ground.heightAt(nx, nz) > -0.3) {
              e.pos.x = nx
              e.pos.z = nz
            }
            const f = Math.exp(-7 * dt)
            e.kx *= f
            e.kz *= f
          } else if (e.raid) {
            if (e.raid.delay <= 0) raidMove = stepRaider(e, dt, pp)
          } else if (dist < ALERT) {
            // waspada: berhenti dan menghadap prajurit
            turn(e, Math.atan2(-dx, -dz), dt)
            e.target = null
          } else if (e.target) {
            const tx = e.target.x - e.pos.x
            const tz = e.target.z - e.pos.z
            const td = Math.hypot(tx, tz)
            if (td < 0.3) {
              e.target = null
              e.wait = 1.5 + Math.random() * 3
            } else {
              turn(e, Math.atan2(tx, tz), dt)
              e.pos.x += (tx / td) * WALK_SPEED * dt
              e.pos.z += (tz / td) * WALK_SPEED * dt
              moving = true
            }
          } else if ((e.wait -= dt) <= 0) {
            e.target = pickWander(e)
            e.wait = 2
          }
          // tidak menempel prajurit (orc yang bergeser), sesama orc, dan batang pohon (penumpang
          // perahu perang tetap di tempat duduknya — letaknya diatur updateShip)
          if (!e.ride) {
            if (!through && dist < 0.75 && dist > 1e-4) {
              e.pos.x = pp.x + (dx / dist) * 0.75
              e.pos.z = pp.z + (dz / dist) * 0.75
            }
            for (const o of list) {
              if (o === e || o.state !== 'hidup' || o.ride) continue
              const ox = e.pos.x - o.pos.x
              const oz = e.pos.z - o.pos.z
              const od = Math.hypot(ox, oz)
              if (od < 0.7 && od > 1e-4) {
                e.pos.x += (ox / od) * (0.7 - od) * 0.5
                e.pos.z += (oz / od) * (0.7 - od) * 0.5
              }
            }
            colliders.resolve(e.pos, RADIUS, tmp.set(0, 0, 0))
            e.pos.y = ground.surfaceAt(e.pos.x, e.pos.z)
          }
          if (e.raid?.atk) {
            // ayunan serangan sedang diputar
          } else if (raidMove) {
            play(e, raidMove > 2 ? 'sprint' : 'walk')
            e.actions.sprint.timeScale = raidMove / 3.6
          } else play(e, moving ? 'walk' : 'idle')
        }
        e.root.rotation.y = e.heading

        // kedipan putih saat terkena
        if (e.flash > 0) {
          e.flash = Math.max(0, e.flash - dt)
          for (const m of e.materials) m.emissive.setScalar((e.flash / 0.15) * 0.8)
        }
        // bar nyawa (menghadap kamera) beberapa detik setelah terkena
        e.barTime -= dt
        e.bar.visible = near && e.state === 'hidup' && e.barTime > 0
        if (e.bar.visible) {
          e.bar.position.set(e.pos.x, e.pos.y + 2.05, e.pos.z)
          e.bar.quaternion.copy(camera.quaternion)
          const f = Math.max(0, e.hp / MAX_HP)
          e.fill.scale.set(f, 0.13, 1)
          e.fill.position.x = -(1 - f) / 2
        }
        // tanda bidik Penggal: berdenyut & berputar di sekitar kepala
        e.reticle.visible = near && e.marked && e.state === 'hidup'
        if (e.reticle.visible) {
          e.reticle.position.set(e.pos.x, e.pos.y + HEAD_Y, e.pos.z)
          e.reticle.quaternion.copy(camera.quaternion)
          e.reticle.rotateZ(clock * 2.5)
          e.reticle.scale.setScalar(1 + 0.12 * Math.sin(clock * 14))
        }
        if (near) e.mixer.update(dt)
      }
      updateHeads(dt)
    },
  }
}
