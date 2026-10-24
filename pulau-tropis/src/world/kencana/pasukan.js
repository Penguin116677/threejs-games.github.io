import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js'
import { DIVISIONS, HEADING } from './barisan.js'
import { bakeRig, rigGeometry, bakedMatrix, attach, toBufferGeometry, boneTexture, animate, frameOf, packMatrix } from './rig.js'

// Bala tentara Kerajaan Kencana: 25.000 prajurit siap tempur di Tegal Wira (letaknya: barisan.js).
// 25.000 model 3D beranimasi terlalu berat untuk HP (±14 juta segitiga), jadi ada dua tingkat:
// - DEKAT: N prajurit terdekat dari pemain (Rendah 70 / Sedang 160 / Tinggi 320) memakai model
//   Kenney "Mini Arena" beranimasi (rangka dipanggang, rig.js) lengkap dengan senjatanya —
//   perisai, tombak, pedang, busur + tabung panah, atau kuda + tombak panjang.
// - JAUH: semua prajurit lainnya digambar sebagai "impostor": setiap jenis prajurit dipotret SEKALI
//   saat dimuat dari 16 arah × 4 sudut pandang ke satu atlas tekstur (dengan cahaya matahari yang
//   sama), lalu tiap prajurit = satu kotak menghadap kamera yang memakai potret dari arah yang paling
//   cocok. Semua 25.000 prajurit dalam SATU draw call, 2 segitiga per orang. Para senapati (7 orang)
//   selalu digambar 3D.
// + bayangan kontak lembut di kaki tiap prajurit (juga satu draw call).
// Jenis (indeks): 0 perisai, 1 tombak, 2 pedang, 3 pemanah, 4 kavaleri, 5 senapati.

const SCALE = 2.3 // sama dengan prajurit pemain
const BONES = 15 // tulang prajurit (7) + bagian kuda (8)
const HORSE = 1.0 // skala kuda Kenney dalam satuan model prajurit
const NY = 16 // arah potret impostor (tiap 22,5°)
// sudut pandang potret: 20°, 40°, 60°, 80° di atas bidang datar — kamera strategi melihat
// prajurit di sekitar pemain dari ±30° (jauh di depan) sampai ±80° (dekat kamera)
const PITCH = { first: 0.349, step: 0.349, count: 4 }
const COLS = 16 // kolom atlas
// near = banyak prajurit 3D terdekat, reach = jarak terjauh dari titik fokus, view = jarak terjauh
// dari kamera (kamera jauh/tinggi → semua impostor), cell = ukuran potret di atlas (piksel)
const LEVEL = {
  rendah: { near: 70, reach: 12, view: 32, cell: 56 },
  sedang: { near: 160, reach: 16, view: 42, cell: 80 },
  tinggi: { near: 320, reach: 22, view: 55, cell: 112 },
}

// kotak warna palet colormap Kenney Mini Arena (8 × 8 kotak)
const cell = (i, j) => [(i + 0.5) / 8, (j + 0.5) / 8]
const UV = { kayu: cell(6, 6), kayuTua: cell(6, 7), besi: cell(3, 6), besiTua: cell(3, 7), putih: cell(4, 6), hitam: cell(1, 7), emas: cell(2, 4), emasTua: cell(2, 5), ungu: cell(7, 4) }
// warna pasukan: jambul helm & sabuk (merah, kolom 4 baris 4–5) diganti kotak lain [kolom, baris]
const DYE = [[4, 4], [5, 4], [1, 4], [2, 4], [4, 6], [7, 4]]

// jenis prajurit: pose (klip idle + tulang lengan yang dikunci pada pose "memegang"), ukuran
// potret impostor (m) dan tinggi titik tengahnya, ukuran bayangan kontak (setengah lebar, panjang)
const TYPES = [
  { id: 'perisai', hold: { 4: 'holding-left' }, size: 2.5, center: 1.05, blob: [0.55, 0.55] },
  { id: 'tombak', hold: {}, size: 3.4, center: 1.5, blob: [0.5, 0.5] },
  { id: 'pedang', hold: { 5: 'holding-right' }, size: 2.6, center: 1.15, blob: [0.5, 0.5] },
  { id: 'pemanah', hold: { 4: 'holding-left' }, size: 2.5, center: 1.05, blob: [0.5, 0.5] },
  { id: 'kavaleri', mounted: true, size: 4.6, center: 1.85, blob: [0.48, 1.35] },
  { id: 'senapati', mounted: true, size: 5.0, center: 2.0, blob: [0.48, 1.35], always: true },
]

const _m = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _v = new THREE.Vector3()
const Y = new THREE.Vector3(0, 1, 0)

// ganti kotak warna merah (jambul & sabuk) dengan warna pasukan
function dye(data, [col, row]) {
  for (let i = 0; i < data.uv.length; i += 2) {
    const ci = Math.floor(data.uv[i] * 8)
    const cj = Math.floor(data.uv[i + 1] * 8)
    if (ci === 4 && (cj === 4 || cj === 5)) {
      data.uv[i] = (col + 0.5) / 8
      data.uv[i + 1] = (row + (cj - 4) + 0.5) / 8
    }
  }
}

// kotak tipis dari a ke b (ruang model), tebal w × d
function stick(a, b, w, d = w) {
  const len = a.distanceTo(b)
  const g = new THREE.BoxGeometry(w, len, d)
  _q.setFromUnitVectors(Y, _v.subVectors(b, a).normalize())
  return g.applyMatrix4(_m.compose(a.clone().add(b).multiplyScalar(0.5), _q, new THREE.Vector3(1, 1, 1)))
}

// geometri mesh (dengan uv sendiri) dalam ruang dunia objeknya
function worldGeometry(mesh, root) {
  root.updateMatrixWorld(true)
  const g = mesh.geometry.clone()
  g.applyMatrix4(_m.copy(root.matrixWorld).invert().multiply(mesh.matrixWorld))
  return g
}

// ------------------------------------------------------------------- rangka & bentuk tiap jenis
function buildTypes(soldier, bala, rows) {
  const clone = cloneSkinned(soldier.model)
  const skinned = []
  clone.traverse(o => {
    if (o.isSkinnedMesh) skinned.push(o)
  })
  const { map } = skinned[0].material
  const swordMesh = soldier.model.userData.sword ? (() => {
    let m = null
    soldier.model.userData.sword.traverse(o => {
      if (!m && o.isMesh) m = o
    })
    return m
  })() : null
  const out = []

  // posisi tengah tangan (ruang model) pada bingkai `row`: tangan = ±(0,265, 0, 0,07) di ruang
  // tulang lengan (5 = kanan, 4 = kiri)
  const handAt = (skeleton, row, j) => new THREE.Vector3(j === 5 ? -0.265 : 0.265, 0, 0.068)
    .applyMatrix4(skeleton.boneInverses[j].clone().invert())
    .applyMatrix4(bakedMatrix(rows, row, j))

  // --- pejalan kaki
  for (let t = 0; t < 4; t++) {
    const T = TYPES[t]
    const rig = bakeRig(clone, soldier.clips, rows, { idle: { clip: 'idle', hold: T.hold } })
    const clip = rig.table.idle
    const { row } = clip
    const data = rigGeometry(skinned)
    dye(data, DYE[t])
    if (T.id === 'perisai') {
      // perisai besar di tangan kiri, menghadap ke depan
      const h = handAt(rig.skeleton, row, 4)
      const g = bala.shieldRect.clone().scale(1.5, 1.5, 1.5)
      g.translate(h.x + 0.02, h.y - 0.22, h.z + 0.07)
      attach(data, g, rows, row, 4, null)
    } else if (T.id === 'tombak') {
      // tombak tegak di tangan kanan, pangkalnya hampir di tanah
      const h = handAt(rig.skeleton, row, 5)
      const butt = Math.max(0.02, h.y - 0.42)
      attach(data, new THREE.CylinderGeometry(0.017, 0.017, h.y + 1.05 - butt, 5).translate(h.x, (butt + h.y + 1.05) / 2, h.z), rows, row, 5, UV.kayu)
      attach(data, new THREE.ConeGeometry(0.045, 0.18, 4).translate(h.x, h.y + 1.14, h.z), rows, row, 5, UV.besi)
      attach(data, new THREE.CylinderGeometry(0.03, 0.03, 0.04, 5).translate(h.x, h.y + 1.04, h.z), rows, row, 5, UV.emas)
    } else if (T.id === 'pedang' && swordMesh) {
      // pedang tegak di depan badan (bilah ke atas, sedikit condong ke depan)
      const h = handAt(rig.skeleton, row, 5)
      const g = swordMesh.geometry.clone()
      g.applyMatrix4(_m.makeRotationX(Math.PI - 0.25))
      g.translate(h.x, h.y + 0.02, h.z)
      attach(data, g, rows, row, 5, null)
    } else if (T.id === 'pemanah') {
      // busur tegak di tangan kiri (ujung-ujungnya melengkung ke belakang) + tali
      const h = handAt(rig.skeleton, row, 4)
      const n = 6
      const pts = []
      for (let i = 0; i <= n; i++) {
        const y = -0.36 + (0.72 * i) / n
        pts.push(new THREE.Vector3(h.x, h.y + y, h.z + 0.02 - 0.1 * (y / 0.36) ** 2))
      }
      for (let i = 0; i < n; i++) attach(data, stick(pts[i], pts[i + 1], 0.026, 0.034), rows, row, 4, UV.kayuTua)
      attach(data, stick(pts[0], pts[n], 0.008), rows, row, 4, UV.putih)
      // tabung panah di punggung (tulang badan = 3) dengan bulu anak panah
      const torso = 3
      const base = new THREE.Vector3(0.07, 0.2, -0.17)
      const top = new THREE.Vector3(0.13, 0.42, -0.2)
      // posisi di ruang bind (punggung badan) → ruang model pada pose ini
      const tm = bakedMatrix(rows, row, torso)
      const a = base.clone().applyMatrix4(tm)
      const b = top.clone().applyMatrix4(tm)
      attach(data, stick(a, b, 0.09, 0.07), rows, row, torso, UV.kayuTua)
      for (let k = 0; k < 4; k++) {
        const o = new THREE.Vector3((k % 2) * 0.03 - 0.015, 0, Math.floor(k / 2) * 0.025 - 0.012)
        attach(data, stick(b.clone().add(o), b.clone().add(o).add(new THREE.Vector3(0.025, 0.09, -0.01)), 0.016, 0.03), rows, row, torso, k % 2 ? UV.putih : UV.emas)
      }
    }
    out.push({ ...T, data, clip, map })
  }

  // --- kuda + penunggang (pose "drive") untuk kavaleri & senapati: satu rangka 15 tulang
  const mounted = bakeMounted(clone, soldier.clips, bala, rows)
  for (let t = 4; t < 6; t++) {
    const T = TYPES[t]
    const data = rigGeometry(skinned)
    // geometri penunggang di ruang bind; dipindah ke pelana lewat matriks tulangnya (bakeMounted)
    dye(data, DYE[t])
    const { row } = mounted.clip
    // kuda: bagian-bagian kaku = tulang 7..14 (warna: kavaleri cokelat, senapati putih); geometri
    // bagian ada di ruang diam, jadi diberi pose bingkai pertama dulu (attach membaliknya lagi)
    mounted.parts.forEach((p, k) => {
      const g = p.geometry.clone()
      if (T.id === 'senapati') {
        const { uv } = g.attributes
        for (let i = 0; i < uv.count; i++) {
          const col = Math.floor(uv.getX(i) * 8)
          const line = Math.floor(uv.getY(i) * 8)
          if (col === 1 && line === 7) continue // ekor tetap gelap
          uv.setXY(i, ...(col === 1 ? cell(4, 7) : cell(4, 6)))
        }
      }
      attach(data, g.applyMatrix4(bakedMatrix(rows, row, 7 + k)), rows, row, 7 + k, null)
    })
    // pelana: kain merah (senapati: ungu) di punggung kuda
    const saddle = new THREE.BoxGeometry(0.34, 0.03, 0.36).translate(0, mounted.backY + 0.012, 0)
    attach(data, saddle.applyMatrix4(bakedMatrix(rows, row, 7)), rows, row, 7, T.id === 'senapati' ? UV.ungu : cell(4, 4))
    const h = mounted.hand
    if (T.id === 'kavaleri') {
      // tombak panjang, sedikit condong ke depan
      const a = new THREE.Vector3(h.x, h.y - 0.4, h.z - 0.08)
      const b = new THREE.Vector3(h.x, h.y + 1.6, h.z + 0.28)
      attach(data, stick(a, b, 0.032), rows, row, 5, UV.kayu)
      const tip = b.clone().add(_v.subVectors(b, a).normalize().multiplyScalar(0.12))
      attach(data, stick(b, tip, 0.06, 0.02), rows, row, 5, UV.besi)
    } else {
      // senapati: panji (tiang tinggi + bendera ungu-emas)
      const a = new THREE.Vector3(h.x, h.y - 0.3, h.z)
      const b = new THREE.Vector3(h.x, h.y + 1.9, h.z)
      attach(data, stick(a, b, 0.035), rows, row, 5, UV.emasTua)
      attach(data, new THREE.BoxGeometry(0.01, 0.42, 0.34).translate(h.x, h.y + 1.62, h.z - 0.18), rows, row, 5, UV.ungu)
      attach(data, new THREE.ConeGeometry(0.05, 0.14, 4).translate(h.x, h.y + 1.97, h.z), rows, row, 5, UV.emas)
    }
    out.push({ ...T, data, clip: mounted.clip, map })
  }
  return out
}

// Kuda Kenney (8 bagian kaku) + penunggang. Bingkai: penunggang memakai pose "drive" (duduk, tangan
// ke depan) di atas pelana; kuda "bernapas": leher & kepala naik-turun pelan, ekor mengibas.
function bakeMounted(clone, clips, bala, rows) {
  const riderRows = []
  const tmp = bakeRig(clone, clips, riderRows, { drive: { clip: 'drive' } })
  const { skeleton } = tmp
  // bagian kuda dalam ruang model penunggang: kuda Kenney menghadap −x → diputar menghadap +z
  const { horse } = bala
  const place = new THREE.Matrix4().compose(new THREE.Vector3(0, 0, 0), new THREE.Quaternion().setFromAxisAngle(Y, Math.PI / 2), new THREE.Vector3(HORSE, HORSE, HORSE))
  const nodes = {}
  horse.traverse(o => {
    nodes[o.name] = o
  })
  const partNames = ['torso', 'leg-back-left', 'leg-back-right', 'leg-front-left', 'leg-front-right', 'neck', 'head', 'tail']
  const rest = {}
  for (const n of ['neck', 'head', 'tail']) rest[n] = nodes[n].quaternion.clone()
  const relWorld = name => {
    horse.updateMatrixWorld(true)
    return place.clone().multiply(_m.copy(horse.matrixWorld).invert().multiply(nodes[name].matrixWorld))
  }
  const restWorld = partNames.map(relWorld)
  // pelana: atas badan kuda; pinggul penunggang (tulang badan pada pose drive) diletakkan di sana
  const backY = (0.25 + 0.312) * HORSE
  const hip = new THREE.Vector3(0, 0.17625, -0.02375).applyMatrix4(bakedMatrix(riderRows, tmp.table.drive.row, 3))
  const seat = new THREE.Matrix4().makeTranslation(0, backY + 0.035 - hip.y, -0.02 - hip.z)
  const n = 90 // 3 detik
  const row0 = rows.length
  for (let f = 0; f < n; f++) {
    const ph = (f / n) * Math.PI * 2
    nodes.neck.quaternion.copy(rest.neck).multiply(_q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.07 * Math.sin(ph)))
    nodes.head.quaternion.copy(rest.head).multiply(_q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.06 * Math.sin(ph + 0.8)))
    nodes.tail.quaternion.copy(rest.tail).multiply(_q.setFromAxisAngle(Y, 0.3 * Math.sin(ph * 2)))
    const frame = new Float32Array(BONES * 12)
    const rf = riderRows[tmp.table.drive.row + (f % tmp.table.drive.n)]
    for (let j = 0; j < 7; j++) {
      _m.set(rf[j * 12], rf[j * 12 + 1], rf[j * 12 + 2], rf[j * 12 + 3], rf[j * 12 + 4], rf[j * 12 + 5], rf[j * 12 + 6], rf[j * 12 + 7], rf[j * 12 + 8], rf[j * 12 + 9], rf[j * 12 + 10], rf[j * 12 + 11], 0, 0, 0, 1)
      packMatrix(seat.clone().multiply(_m), frame, j * 12)
    }
    partNames.forEach((name, k) => {
      // geometri bagian disimpan pada pose diam (restWorld); matriks = pose sekarang × kebalikan diam
      packMatrix(relWorld(name).multiply(restWorld[k].clone().invert()), frame, (7 + k) * 12)
    })
    rows.push(frame)
  }
  for (const k of ['neck', 'head', 'tail']) nodes[k].quaternion.copy(rest[k])
  // geometri bagian kuda dalam ruang model (pose diam) — attach() memakai bingkai pertama
  const parts = partNames.map((name, k) => ({ geometry: nodes[name].geometry.clone().applyMatrix4(restWorld[k]) }))
  // tangan kanan penunggang pada bingkai pertama (ruang model)
  const hand = new THREE.Vector3(-0.265, 0, 0.068).applyMatrix4(skeleton.boneInverses[5].clone().invert()).applyMatrix4(bakedMatrix(rows, row0, 5))
  return { clip: { row: row0, n, loop: true }, parts, hand, backY }
}

// ------------------------------------------------------------------- atlas impostor
// Potret setiap jenis dari NY arah × 4 sudut pandang. Dirender dengan material & cahaya yang sama
// (ke target kecil ber-MSAA, lalu disalin ke petak atlas), tanpa kabut/tone mapping — keduanya
// diterapkan saat impostor digambar, persis seperti model 3D-nya.
function bakeAtlas(renderer, lod0, env, px) {
  const per = NY * PITCH.count
  const total = lod0.length * per
  const rowsN = Math.ceil(total / COLS)
  const atlas = new THREE.WebGLRenderTarget(COLS * px, rowsN * px, {
    colorSpace: THREE.SRGBColorSpace, depthBuffer: false, generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter,
  })
  atlas.texture.name = 'atlas-prajurit'
  const small = new THREE.WebGLRenderTarget(px, px, { colorSpace: THREE.SRGBColorSpace, samples: 4 })
  const scene = new THREE.Scene()
  scene.add(new THREE.HemisphereLight(env.hemi.color, env.hemi.groundColor, env.hemi.intensity))
  const sun = new THREE.DirectionalLight(env.sun.color, env.sun.intensity)
  sun.position.copy(env.sunDir).multiplyScalar(50)
  scene.add(sun, sun.target)
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 80)
  const copy = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: { uMap: { value: small.texture } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: 'uniform sampler2D uMap; varying vec2 vUv; void main() { gl_FragColor = texture2D(uMap, vUv); }',
    depthTest: false, depthWrite: false,
  }))
  copy.frustumCulled = false
  const copyScene = new THREE.Scene()
  copyScene.add(copy)

  const prevTarget = renderer.getRenderTarget()
  const prevColor = renderer.getClearColor(new THREE.Color())
  const prevAlpha = renderer.getClearAlpha()
  const prevShadow = renderer.shadowMap.autoUpdate
  renderer.shadowMap.autoUpdate = false
  // tepi transparan diberi warna netral (bukan hitam) supaya tidak ada pinggiran gelap di mipmap
  renderer.setClearColor(0x4a4038, 0)
  renderer.setRenderTarget(atlas)
  renderer.clear()
  atlas.texture.generateMipmaps = false
  atlas.scissorTest = true
  lod0.forEach((L, ti) => {
    const { mesh, type } = L
    const { parent } = mesh
    scene.add(mesh)
    mesh.count = 1
    mesh.setMatrixAt(0, _m.compose(_v.set(0, 0, 0), _q.setFromAxisAngle(Y, HEADING), new THREE.Vector3(SCALE, SCALE, SCALE)))
    mesh.instanceMatrix.needsUpdate = true
    L.anim.array.set([type.clip.row, type.clip.row, 0, 0], 0)
    L.anim.needsUpdate = true
    const half = type.size / 2
    cam.left = -half
    cam.right = half
    cam.top = half
    cam.bottom = -half
    cam.updateProjectionMatrix()
    for (let pi = 0; pi < PITCH.count; pi++) {
      const p = PITCH.first + pi * PITCH.step
      for (let yi = 0; yi < NY; yi++) {
        const yaw = HEADING + (yi / NY) * Math.PI * 2
        cam.position.set(Math.sin(yaw) * Math.cos(p) * 40, type.center + Math.sin(p) * 40, Math.cos(yaw) * Math.cos(p) * 40)
        cam.lookAt(0, type.center, 0)
        renderer.setRenderTarget(small)
        renderer.clear()
        renderer.render(scene, cam)
        const k = ti * per + pi * NY + yi
        atlas.viewport.set((k % COLS) * px, Math.floor(k / COLS) * px, px, px)
        atlas.scissor.copy(atlas.viewport)
        renderer.setRenderTarget(atlas)
        renderer.render(copyScene, cam)
      }
    }
    mesh.count = 0
    parent.add(mesh)
  })
  // mipmap dibuat sekali di akhir
  atlas.scissorTest = false
  atlas.viewport.set(0, 0, atlas.width, atlas.height)
  atlas.scissor.set(0, 0, atlas.width, atlas.height)
  atlas.texture.generateMipmaps = true
  const empty = new THREE.Scene()
  const { autoClear } = renderer
  renderer.autoClear = false
  renderer.setRenderTarget(atlas)
  renderer.render(empty, cam)
  renderer.autoClear = autoClear
  renderer.setRenderTarget(prevTarget)
  renderer.setClearColor(prevColor, prevAlpha)
  renderer.shadowMap.autoUpdate = prevShadow
  small.dispose()
  copy.geometry.dispose()
  copy.material.dispose()
  return { texture: atlas.texture, target: atlas, rows: rowsN, per }
}

const IMPOSTOR_VERT = /* glsl */`
attribute vec3 aPos;
attribute vec2 aInfo; // jenis, arah hadap
uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec4 uLod; // prajurit dekat (digambar 3D, bukan impostor): pusat (x, z), jari-jari², jarak² terjauh dari kamera
uniform vec4 uType[6]; // ukuran potret, tinggi titik tengah, petak pertama, -
uniform vec4 uAtlas; // kolom, baris, arah, -
uniform vec3 uPitch; // sudut pandang potret pertama, selisih antar-sudut, banyaknya
varying vec4 vUvA; // potret arah a & b pada sudut pandang bawah
varying vec4 vUvB; // … pada sudut pandang atas
varying vec2 vW; // campuran antar-arah, antar-sudut pandang
vec2 cellUv(float k) {
  return (vec2(mod(k, uAtlas.x), floor(k / uAtlas.x)) + uv) / uAtlas.xy;
}
`

export function createArmy({ ground, plan, quality, soldier, bala, renderer, env }) {
  const { army } = plan
  const S = army.soldiers
  const L = LEVEL[quality.level] ?? LEVEL.sedang
  const group = new THREE.Group()
  group.name = 'bala-tentara'

  // ------------------------------------------------------------- model dekat (3D)
  const t0 = performance.now()
  const rows = []
  const types = buildTypes(soldier, bala, rows)
  const bones = boneTexture(rows, BONES)
  const perType = TYPES.map(() => 0)
  for (let i = 0; i < S.count; i++) perType[S.type[i]]++
  const lod0 = types.map((type, t) => {
    const geo = toBufferGeometry(type.data)
    const cap = Math.max(1, Math.min(perType[t], L.near + 64))
    const anim = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4).setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('aAnimA', anim)
    geo.setAttribute('aAnimB', new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4))
    const mat = new THREE.MeshLambertMaterial({ map: type.map })
    mat.onBeforeCompile = shader => animate(shader, bones)
    const mesh = new THREE.InstancedMesh(geo, mat, cap)
    mesh.name = `prajurit-${type.id}`
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    // tanpa bayangan peta bayangan: impostor juga tidak punya, jadi barisan yang rapat tidak tampak
    // lebih gelap di sekitar pemain — semua prajurit memakai bayangan kontak yang sama
    mesh.castShadow = false
    mesh.receiveShadow = false
    mesh.count = 0
    group.add(mesh)
    return { mesh, anim, type, cap }
  })

  // ------------------------------------------------------------- impostor (jauh)
  const t1 = performance.now()
  const atlas = bakeAtlas(renderer, lod0.filter(m => !m.type.always), env, L.cell)
  const t2 = performance.now()
  const pos = new Float32Array(S.count * 3)
  const info = new Float32Array(S.count * 2)
  for (let i = 0; i < S.count; i++) {
    pos[i * 3] = S.x[i]
    pos[i * 3 + 1] = ground.heightAt(S.x[i], S.z[i])
    pos[i * 3 + 2] = S.z[i]
    info[i * 2] = S.type[i]
    info[i * 2 + 1] = army.heading
  }
  const aPos = new THREE.InstancedBufferAttribute(pos, 3)
  const aInfo = new THREE.InstancedBufferAttribute(info, 2)
  const quad = new THREE.PlaneGeometry(1, 1)
  const impGeo = new THREE.InstancedBufferGeometry()
  impGeo.index = quad.index
  impGeo.setAttribute('position', quad.attributes.position)
  impGeo.setAttribute('uv', quad.attributes.uv)
  impGeo.setAttribute('aPos', aPos)
  impGeo.setAttribute('aInfo', aInfo)
  impGeo.instanceCount = army.total // para senapati (di akhir daftar) selalu 3D
  // seluruh barisan dalam satu bola batas: tidak digambar sama sekali bila di luar layar
  const b = army.bounds
  const bound = new THREE.Sphere(new THREE.Vector3((b.x0 + b.x1) / 2, pos[1] + 2, (b.z0 + b.z1) / 2), Math.hypot(b.x1 - b.x0, b.z1 - b.z0) / 2 + 6)
  impGeo.boundingSphere = bound
  const uniforms = {
    uCamPos: { value: new THREE.Vector3() },
    uCamRight: { value: new THREE.Vector3(1, 0, 0) },
    uCamUp: { value: new THREE.Vector3(0, 1, 0) },
    uLod: { value: new THREE.Vector4(1e9, 1e9, 0, 0) },
    uType: { value: TYPES.map((T, t) => new THREE.Vector4(T.size, T.center, t * atlas.per, 0)) },
    uAtlas: { value: new THREE.Vector4(COLS, atlas.rows, NY, 0) },
    uPitch: { value: new THREE.Vector3(PITCH.first, PITCH.step, PITCH.count) },
  }
  // tepi potret tegas (pixel art; target gambar tidak ber-MSAA, jadi alpha-to-coverage tidak bisa)
  const impMat = new THREE.MeshBasicMaterial({ map: atlas.texture, alphaTest: 0.5 })
  impMat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = IMPOSTOR_VERT + shader.vertexShader
      .replace('#include <uv_vertex>', /* glsl */`
        int ti = int(aInfo.x + 0.5);
        vec4 T = uType[ti];
        vec3 center = aPos + vec3(0.0, T.y, 0.0);
        // sama dengan pemilihan di update(): yang digambar 3D = di dalam lingkaran DAN cukup dekat
        // ke kamera; yang di dalam lingkaran tetapi jauh dari kamera tetap impostor (bukan bolong)
        vec2 dl = aPos.xz - uLod.xy;
        vec3 dv = aPos + vec3(0.0, 1.0, 0.0) - uCamPos;
        bool hide = dot(dl, dl) < uLod.z && dot(dv, dv) < uLod.w;
        // arah kamera dilihat dari prajurit (relatif arah hadapnya) → dua potret arah terdekat dan
        // dua sudut pandang terdekat, dicampur halus (tanpa campuran: yang terdekat saja)
        vec3 V = uCamPos - center;
        float fy = (atan(V.x, V.z) - aInfo.y) / 6.2831853 * uAtlas.z;
        float pf = clamp((atan(V.y, length(V.xz)) - uPitch.x) / uPitch.y, 0.0, uPitch.z - 1.0);
        #ifdef IMPOSTOR_BLEND
          // campuran hanya di pita sempit sekitar batas dua potret: kebanyakan prajurit tetap tajam
          float y0 = floor(fy);
          float p0 = min(floor(pf), uPitch.z - 2.0);
          vW = smoothstep(0.32, 0.68, vec2(fy - y0, pf - p0));
        #else
          float y0 = floor(fy + 0.5);
          float p0 = floor(pf + 0.5);
          vW = vec2(0.0);
        #endif
        float ya = mod(y0, uAtlas.z);
        float yb = mod(y0 + 1.0, uAtlas.z);
        float pb = min(p0 + 1.0, uPitch.z - 1.0);
        vUvA = vec4(cellUv(T.z + p0 * uAtlas.z + ya), cellUv(T.z + p0 * uAtlas.z + yb));
        vUvB = vec4(cellUv(T.z + pb * uAtlas.z + ya), cellUv(T.z + pb * uAtlas.z + yb));
        vMapUv = vUvA.xy;
        vec3 impWorld = center + uCamRight * (position.x * T.x) + uCamUp * (position.y * T.x);
      `)
      .replace('#include <project_vertex>', /* glsl */`
        vec4 mvPosition = viewMatrix * vec4(impWorld, 1.0);
        gl_Position = hide ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * mvPosition;
      `)
    shader.fragmentShader = 'varying vec4 vUvA;\nvarying vec4 vUvB;\nvarying vec2 vW;\n' + shader.fragmentShader
      .replace('#include <map_fragment>', /* glsl */`
        #ifdef IMPOSTOR_BLEND
          // warna dicampur menurut bobot × keburaman; keburamannya = yang terbesar di antara potret
          // yang ikut (bukan dirata-rata), jadi di pita peralihan prajurit tidak tampak pudar
          vec4 a0 = texture2D(map, vUvA.xy);
          vec4 a1 = texture2D(map, vUvA.zw);
          vec4 b0 = texture2D(map, vUvB.xy);
          vec4 b1 = texture2D(map, vUvB.zw);
          vec4 w = vec4((1.0 - vW.x) * (1.0 - vW.y), vW.x * (1.0 - vW.y), (1.0 - vW.x) * vW.y, vW.x * vW.y);
          vec4 al = vec4(a0.a, a1.a, b0.a, b1.a);
          vec4 wa = w * al;
          vec3 rgb = (a0.rgb * wa.x + a1.rgb * wa.y + b0.rgb * wa.z + b1.rgb * wa.w) / max(wa.x + wa.y + wa.z + wa.w, 1e-4);
          vec4 cov = al * smoothstep(0.0, 0.3, w);
          diffuseColor *= vec4(rgb, max(max(cov.x, cov.y), max(cov.z, cov.w)));
        #else
          diffuseColor *= texture2D(map, vUvA.xy);
        #endif
      `)
  }
  if (quality.level !== 'rendah') impMat.defines = { IMPOSTOR_BLEND: '' }
  const impostors = new THREE.Mesh(impGeo, impMat)
  impostors.name = 'prajurit-impostor'
  group.add(impostors)

  // ------------------------------------------------------------- bayangan kontak
  const blobBase = new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2)
  const blobGeo = new THREE.InstancedBufferGeometry()
  blobGeo.index = blobBase.index
  blobGeo.setAttribute('position', blobBase.attributes.position)
  blobGeo.setAttribute('aPos', aPos)
  blobGeo.setAttribute('aInfo', aInfo)
  blobGeo.instanceCount = S.count
  blobGeo.boundingSphere = bound
  const blobSize = { value: TYPES.map(T => new THREE.Vector2(...T.blob)) }
  const blobMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.32, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })
  blobMat.onBeforeCompile = shader => {
    shader.uniforms.uBlob = blobSize
    shader.vertexShader = 'attribute vec3 aPos;\nattribute vec2 aInfo;\nuniform vec2 uBlob[6];\nvarying vec2 vBlob;\n' + shader.vertexShader
      .replace('#include <begin_vertex>', /* glsl */`
        vec2 bs = uBlob[int(aInfo.x + 0.5)];
        float c = cos(aInfo.y);
        float s = sin(aInfo.y);
        vec2 l = vec2(position.x * bs.x, position.z * bs.y);
        vec3 transformed = aPos + vec3(l.x * c + l.y * s, 0.04, -l.x * s + l.y * c);
        vBlob = position.xz;
      `)
    shader.fragmentShader = 'varying vec2 vBlob;\n' + shader.fragmentShader
      .replace('#include <opaque_fragment>', 'diffuseColor.a *= 1.0 - smoothstep(0.2, 1.0, dot(vBlob, vBlob));\n#include <opaque_fragment>')
  }
  const blobs = new THREE.Mesh(blobGeo, blobMat)
  blobs.name = 'prajurit-bayangan'
  blobs.renderOrder = 1
  group.add(blobs)

  // ------------------------------------------------------------- grid ruang (pemilihan yang dekat)
  const GC = 8
  const gx0 = army.bounds.x0 - 4
  const gz0 = army.bounds.z0 - 4
  const gw = Math.ceil((army.bounds.x1 + 4 - gx0) / GC)
  const gh = Math.ceil((army.bounds.z1 + 4 - gz0) / GC)
  const start = new Int32Array(gw * gh + 1)
  const cellOf = i => Math.floor((S.x[i] - gx0) / GC) + Math.floor((S.z[i] - gz0) / GC) * gw
  for (let i = 0; i < S.count; i++) start[cellOf(i) + 1]++
  for (let c = 0; c < gw * gh; c++) start[c + 1] += start[c]
  const fill = start.slice(0, gw * gh)
  const members = new Int32Array(S.count)
  for (let i = 0; i < S.count; i++) members[fill[cellOf(i)]++] = i

  const candIdx = new Int32Array(4096)
  const candD = new Float32Array(4096)
  const order = new Int32Array(4096)
  const near = new Int32Array(L.near + 64)
  let nearCount = 0
  let time = 0
  const p = new THREE.Vector3()
  const s3 = new THREE.Vector3(SCALE, SCALE, SCALE)

  function update(dt, camera, focus) {
    time += dt
    camera.updateMatrixWorld()
    const e = camera.matrixWorld.elements
    uniforms.uCamRight.value.set(e[0], e[1], e[2])
    uniforms.uCamUp.value.set(e[4], e[5], e[6])
    uniforms.uCamPos.value.set(e[12], e[13], e[14])
    // bayangan kontak hanya bila kamera dekat barisan (dari jauh lebih kecil dari satu piksel)
    const ox = Math.max(b.x0 - e[12], 0, e[12] - b.x1)
    const oz = Math.max(b.z0 - e[14], 0, e[14] - b.z1)
    blobs.visible = ox * ox + oz * oz < 120 * 120

    // prajurit terdekat dari titik fokus (pemain / pusat pandang) → model 3D, asal tidak terlalu
    // jauh dari kamera
    let n = 0
    const R = L.reach
    const cx = e[12]
    const cy = e[13]
    const cz = e[14]
    const V2 = L.view * L.view
    const i0 = Math.max(0, Math.floor((focus.x - R - gx0) / GC))
    const i1 = Math.min(gw - 1, Math.floor((focus.x + R - gx0) / GC))
    const j0 = Math.max(0, Math.floor((focus.z - R - gz0) / GC))
    const j1 = Math.min(gh - 1, Math.floor((focus.z + R - gz0) / GC))
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        const c = i + j * gw
        for (let k = start[c]; k < start[c + 1] && n < candIdx.length; k++) {
          const id = members[k]
          if (id >= army.total) continue // senapati: selalu 3D (di bawah)
          const dx = S.x[id] - focus.x
          const dz = S.z[id] - focus.z
          const d2 = dx * dx + dz * dz
          if (d2 > R * R) continue
          const vx = S.x[id] - cx
          const vy = pos[id * 3 + 1] + 1 - cy
          const vz = S.z[id] - cz
          if (vx * vx + vy * vy + vz * vz > V2) continue
          candIdx[n] = id
          candD[n] = d2
          n++
        }
      }
    let r2 = R * R
    nearCount = 0
    if (n > L.near) {
      for (let k = 0; k < n; k++) order[k] = k
      const sorted = order.subarray(0, n).sort((a, b) => candD[a] - candD[b])
      r2 = candD[sorted[L.near - 1]]
      for (let k = 0; k < n && nearCount < near.length; k++) if (candD[k] <= r2) near[nearCount++] = candIdx[k]
    } else
      for (let k = 0; k < n; k++) near[nearCount++] = candIdx[k]

    // sedikit lebih sempit dari pemilihan: di tepi lebih baik tergambar dua kali daripada bolong
    uniforms.uLod.value.set(focus.x, focus.z, nearCount ? r2 * 0.999 : 0, V2 * 0.999)

    for (const m of lod0) m.mesh.count = 0
    for (let id = army.total; id < S.count; id++) put(id)
    for (let k = 0; k < nearCount; k++) put(near[k])
    for (const m of lod0) {
      if (!m.mesh.count) continue
      m.mesh.instanceMatrix.needsUpdate = true
      m.anim.needsUpdate = true
    }
  }

  // tulis prajurit `id` sebagai model 3D (instance berikutnya pada mesh jenisnya)
  function put(id) {
    const M = lod0[S.type[id]]
    if (M.mesh.count >= M.cap) return
    const i = M.mesh.count++
    p.set(S.x[id], pos[id * 3 + 1], S.z[id])
    M.mesh.setMatrixAt(i, _m.compose(p, _q.setFromAxisAngle(Y, army.heading), s3))
    frameOf(M.type.clip, time + S.phase[id] * 7.3, M.anim.array, i * 4)
    M.anim.array[i * 4 + 3] = 0
  }

  const counts = DIVISIONS.map((d, t) => ({ id: d.id, name: d.name, count: perType[t] }))
  const timing = { rangka: Math.round(t1 - t0), atlas: Math.round(t2 - t1), sisanya: Math.round(performance.now() - t2) }
  return {
    object: group,
    update,
    atlas,
    stats: () => ({
      total: army.total,
      perwira: perType[5],
      pasukan: counts,
      dekat: nearCount,
      impostor: army.total - nearCount,
      atlas: `${atlas.target.width}×${atlas.target.height}`,
      waktu: timing,
    }),
    // untuk pengujian: jenis & letak prajurit ke-i
    soldier: i => ({ x: S.x[i], z: S.z[i], type: TYPES[S.type[i]].id }),
    count: S.count,
  }
}

// kuda & perisai dari bala.glb (GLTFLoader) → { horse: Object3D 'kuda', shieldRect: BufferGeometry }
export function balaParts(gltf) {
  const horse = gltf.scene.getObjectByName('kuda')
  const shield = gltf.scene.getObjectByName('shield-rectangle')
  return { horse, shieldRect: worldGeometry(shield, gltf.scene) }
}

