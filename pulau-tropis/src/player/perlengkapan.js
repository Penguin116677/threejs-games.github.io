import * as THREE from 'three'

// Perlengkapan yang dibeli di Tempa Aeloria tampak di badan pemain: perisai di tangan kiri, tombak
// (pedang disimpan) atau pedang perak di tangan kanan, zirah (pelat dada + pelindung bahu), helm elf
// (lingkar dahi bermata hijau + sayap perak). Bentuk-bentuk ditempel pada tulang model prajurit
// (Kenney Mini Arena), jadi ikut setiap animasi. Satuan = satuan model asli (model diskala 2,3 × oleh
// pemain); kepala-helm asli: x ±0,227, y 0,29–0,70 (+ jambul sampai 0,84), z −0,33…0,19.
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

// kotak dari batas ruang MODEL (min..max), dipindah ke ruang tulang `bone`
function boxAt(bone, x0, y0, z0, x1, y1, z1) {
  const o = ORIGIN[bone]
  return new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2 - o[0], (y0 + y1) / 2 - o[1], (z0 + z1) / 2 - o[2])
}

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

  const BUILD = {
    // perisai bundar di genggaman kiri, menghadap ke depan
    perisaiDaun: () => {
      const at = g => g.rotateX(Math.PI / 2).translate(0.255, 0, 0.12)
      return [
        mesh('arm-left', at(new THREE.CylinderGeometry(0.135, 0.135, 0.02, 16)), C.kayu),
        mesh('arm-left', at(new THREE.CylinderGeometry(0.12, 0.12, 0.024, 16)), C.daun),
        mesh('arm-left', at(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 10)), C.emas),
      ]
    },
    perisaiPerak: () => {
      const at = g => g.rotateX(Math.PI / 2).translate(0.255, 0, 0.12)
      return [
        mesh('arm-left', at(new THREE.CylinderGeometry(0.15, 0.15, 0.022, 18)), C.emas),
        mesh('arm-left', at(new THREE.CylinderGeometry(0.138, 0.138, 0.026, 18)), C.perak),
        mesh('arm-left', new THREE.ConeGeometry(0.05, 0.16, 4).rotateY(Math.PI / 4).scale(1, 1, 0.25).translate(0.255, 0, 0.137), C.daun),
      ]
    },
    // tombak panjang di genggaman kanan: saat berdiri (lengan idle turun 45°) tegak, sedikit condong
    // ke depan; saat menyerang ikut ayunan lengan
    tombakElf: () => {
      const g = new THREE.Group()
      const dir = new THREE.Vector3(0.621, 0.729, 0.287).normalize()
      g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      g.position.set(-0.265, 0, 0.068)
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
    // zirah: pelat dada + pelindung bahu kiri-kanan (+ lis emas pada zirah perak)
    zirahRantai: () => zirah(C.rantai, C.rantaiTua, null),
    zirahPerak: () => zirah(C.perak, C.perakTua, C.emas),
    // helm elf: lingkar dahi emas yang memeluk helm (depan + kedua sisi), permata hijau di dahi,
    // sayap perak di kedua sisi kepala
    helmElf: () => [
      mesh('head', boxAt('head', -0.236, 0.56, 0.186, 0.236, 0.605, 0.204), C.emas),
      ...[-1, 1].map(s => mesh('head', boxAt('head', s > 0 ? 0.224 : -0.24, 0.56, -0.25, s > 0 ? 0.24 : -0.224, 0.605, 0.2), C.emas)),
      mesh('head', boxAt('head', -0.035, 0.548, 0.2, 0.035, 0.618, 0.214), C.bulu),
      ...[-1, 1].map(s => mesh('head', new THREE.ConeGeometry(0.045, 0.24, 4).scale(1, 1, 0.25).rotateX(-0.35).rotateZ(-s * 0.55)
        .translate(s * 0.27 - ORIGIN.head[0], 0.66 - ORIGIN.head[1], -0.05 - ORIGIN.head[2]), C.perak)),
    ],
  }
  function zirah(main, dark, trim) {
    const list = [mesh('torso', boxAt('torso', -0.17, 0.18, -0.171, 0.17, 0.338, 0.125), main)]
    list.push(mesh('torso', boxAt('torso', -0.175, 0.17, -0.175, 0.175, 0.2, 0.13), trim || dark))
    for (const [bone, s] of [['arm-left', 1], ['arm-right', -1]]) {
      const x0 = s * 0.06
      const x1 = s * 0.2
      list.push(mesh(bone, boxAt(bone, Math.min(x0, x1), 0.2, -0.08, Math.max(x0, x1), 0.385, 0.135), main))
      if (trim) list.push(mesh(bone, boxAt(bone, Math.min(x0, x1) - 0.002, 0.37, -0.082, Math.max(x0, x1) + 0.002, 0.39, 0.137), trim))
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
