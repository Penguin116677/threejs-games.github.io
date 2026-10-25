import * as THREE from 'three'
import { ellipsoid, lathe, band, v3 } from '../tokoh/bentuk.js'
import { HAND, KEPALA, armDir } from '../tokoh/rupa.js'

// Perlengkapan yang dibeli di Tempa Aeloria tampak di badan pemain: perisai di tangan kiri, tombak
// (pedang disimpan) atau pedang perak di tangan kanan, zirah (pelat dada + pelindung bahu), helm elf
// (lingkar dahi bermata hijau + sayap perak). Bentuk-bentuk ditempel pada tulang rangka pemain, jadi
// ikut setiap animasi. Satuan = satuan model asli (model diskala 2,3 × oleh pemain); badan pemain:
// tokoh/rupa.js (kepala berpusat di KEPALA, genggaman tangan di HAND).
// Titik asal tiap tulang saat bind:
const ORIGIN = {
  torso: [0, 0.17625, -0.02375],
  'arm-left': [0.0999, 0.28775, -0.01225],
  'arm-right': [-0.0999, 0.28775, -0.01225],
  head: [0, 0.34325, 0.00264],
}
const C = {
  kayu: '#7a5636', kayuTua: '#4b3423', daun: '#4f8a3c', emas: '#d9b44a', perak: '#dfe6ee', perakTua: '#9aa4ae',
  rantai: '#8d939b', rantaiTua: '#5d636b', bulu: '#3e8a4a',
}
const BADAN_Z = -0.02

// geometri dalam ruang MODEL → ruang tulang `bone`
const toBone = (bone, g) => g.translate(-ORIGIN[bone][0], -ORIGIN[bone][1], -ORIGIN[bone][2])

export function createGear(model, quality) {
  const bones = {}
  for (const name of Object.keys(ORIGIN)) bones[name] = model.getObjectByName(name)
  const sword = model.userData.sword || null
  const swordMats = []
  sword?.traverse(o => {
    if (o.isMesh) swordMats.push({ mesh: o, base: o.material })
  })
  const mats = {}
  const mat = color => {
    if (!mats[color]) mats[color] = new THREE.MeshLambertMaterial({ color })
    return mats[color]
  }
  const parts = {} // id barang → [Mesh…] (dibuat saat pertama dipakai)

  function mesh(bone, geo, color) {
    const m = new THREE.Mesh(geo, mat(color))
    m.castShadow = quality.shadows
    m.visible = false
    bones[bone]?.add(m)
    return m
  }

  // perisai bundar di genggaman kiri, menghadap ke depan (ruang tulang lengan kiri)
  const shieldAt = g => g.rotateX(Math.PI / 2).translate(HAND[4].x - 0.004, HAND[4].y, HAND[4].z + 0.05)
  const BUILD = {
    perisaiDaun: () => [
      mesh('arm-left', shieldAt(new THREE.CylinderGeometry(0.11, 0.11, 0.018, 16)), C.kayu),
      mesh('arm-left', shieldAt(new THREE.CylinderGeometry(0.097, 0.097, 0.022, 16)), C.daun),
      mesh('arm-left', shieldAt(new THREE.CylinderGeometry(0.03, 0.03, 0.036, 10)), C.emas),
    ],
    perisaiPerak: () => [
      mesh('arm-left', shieldAt(new THREE.CylinderGeometry(0.122, 0.122, 0.02, 18)), C.emas),
      mesh('arm-left', shieldAt(new THREE.CylinderGeometry(0.112, 0.112, 0.024, 18)), C.perak),
      mesh('arm-left', new THREE.ConeGeometry(0.04, 0.13, 4).rotateY(Math.PI / 4).scale(1, 1, 0.25).translate(HAND[4].x - 0.004, HAND[4].y, HAND[4].z + 0.066), C.daun),
    ],
    // tombak panjang di genggaman kanan: saat berdiri (lengan idle turun 45°) tegak, sedikit condong
    // ke depan; saat menyerang ikut ayunan lengan
    tombakElf: () => {
      const g = new THREE.Group()
      const dir = new THREE.Vector3(0.621, 0.729, 0.287).normalize()
      g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      g.position.copy(HAND[5])
      const add = (geo, color) => {
        const m = new THREE.Mesh(geo, mat(color))
        m.castShadow = quality.shadows
        g.add(m)
      }
      add(new THREE.CylinderGeometry(0.011, 0.011, 1.15, 6).translate(0, 0.2, 0), C.kayu)
      add(new THREE.ConeGeometry(0.032, 0.13, 4).translate(0, 0.84, 0), C.perak)
      add(new THREE.CylinderGeometry(0.018, 0.018, 0.025, 6).translate(0, 0.765, 0), C.emas)
      g.visible = false
      bones['arm-right']?.add(g)
      return [g]
    },
    // zirah: pelat dada + pelindung bahu kiri-kanan (+ lis emas pada zirah perak), di atas zirah
    // bawaan pemain
    zirahRantai: () => zirah(C.rantai, C.rantaiTua, null),
    zirahPerak: () => zirah(C.perak, C.perakTua, C.emas),
    // helm elf: lingkar dahi emas, permata hijau di dahi, sayap perak di kedua sisi kepala
    helmElf: () => [
      mesh('head', toBone('head', band(0, KEPALA.y + 0.045, -0.004, 0.106, 0.022, 14, 0.98)), C.emas),
      mesh('head', toBone('head', ellipsoid([0, KEPALA.y + 0.045, 0.102], [0.016, 0.02, 0.01], 6, 4)), C.bulu),
      ...[-1, 1].map(s => mesh('head', toBone('head', new THREE.ConeGeometry(0.035, 0.17, 4).scale(1, 1, 0.25).rotateX(-0.35).rotateZ(-s * 0.6)
        .translate(s * 0.13, KEPALA.y + 0.09, -0.03)), C.perak)),
    ],
  }
  function zirah(main, dark, trim) {
    const list = [
      mesh('torso', toBone('torso', lathe([[0.094, 0.19], [0.096, 0.235], [0.109, 0.274], [0.111, 0.3], [0.094, 0.325], [0.05, 0.341]], 12, 1, 0.8).translate(0, 0, BADAN_Z)), main),
      mesh('torso', toBone('torso', band(0, 0.2, BADAN_Z, 0.098, 0.026, 12, 0.81)), trim || dark),
    ]
    for (const [bone, j] of [['arm-left', 4], ['arm-right', 5]]) {
      const c = new THREE.Vector3(...ORIGIN[bone]).addScaledVector(armDir(j), 0.014).add(v3(0, 0.016, 0))
      list.push(mesh(bone, toBone(bone, ellipsoid(c, [0.06, 0.048, 0.062], 9, 6)), main))
      if (trim) list.push(mesh(bone, toBone(bone, band(c.x, c.y - 0.014, c.z, 0.058, 0.012, 10, 1.05)), trim))
    }
    return list
  }

  const silver = new THREE.MeshLambertMaterial({ color: '#eef4ff', emissive: '#28323c' })
  return {
    // pakai = { senjata, perisai, zirah, helm } (id barang atau null)
    set(pakai) {
      const want = new Set(Object.values(pakai).filter(Boolean))
      for (const id of want) if (!parts[id] && BUILD[id]) parts[id] = BUILD[id]()
      for (const [id, list] of Object.entries(parts)) for (const m of list) m.visible = want.has(id)
      // tombak menggantikan pedang; pedang perak = pedang yang sama, bilahnya berkilau perak
      if (sword) {
        sword.visible = pakai.senjata !== 'tombakElf'
        const perak = pakai.senjata === 'pedangPerak'
        for (const s of swordMats) s.mesh.material = perak ? silver : s.base
        sword.scale.setScalar(perak ? 1.12 : 1)
      }
    },
  }
}
