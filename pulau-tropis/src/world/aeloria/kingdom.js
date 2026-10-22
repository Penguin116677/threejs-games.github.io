import * as THREE from 'three'
import * as B from '../kencana/buildings.js'
import * as E from './buildings.js'
import { buildingMaterial, buildingDepthMaterial } from '../kencana/material.js'
import { buildTiles } from '../kencana/kingdom.js'
import { buildRoutes } from '../kencana/routes.js'
import { LANDS, landDistance } from './layout.js'
import { forestMask } from '../biome.js'
import { scatter } from '../../core/spatial.js'
import {
  windMaterial, instancedTiles, standardMatrix, bushGeometry, perakGeometry, elfGeometry, cemaraGeometry, agungGeometry, buahGeometry,
} from '../trees.js'

// Aeloria dalam 3D: bangunan dari rencana (plan.js) digabung per petak 128 m (buildTiles, sama
// seperti Kencana), pepohonan elf (pohon perak, pohon elf besar, cemara, pohon buah, pohon agung),
// semak & bunga, serta jaringan jalan untuk kesatria & penduduk.

const TREE_TILE = 128 // petak pohon lebih kecil dari pulau tengah: hutan elf rapat, pemilahan lebih tajam

function partsFor(b, ground) {
  switch (b.type) {
    case 'rumah-elf': return E.rumahElf(b.w, b.d, E.ROOF[b.roof % E.ROOF.length], { chimney: b.chimney })
    case 'rumah-bulat': return E.rumahBulat(b.r, E.ROOF[b.roof % E.ROOF.length])
    case 'menara-elf': return E.menaraElf(b.r, b.h, E.ROOF[b.roof % E.ROOF.length])
    case 'tembok-elf': return E.temboElf(b.len, b.t, b.h)
    case 'gerbang-elf': return E.gerbangElf(b.w, b.h)
    case 'gapura-perak': return E.gapuraPerak(b.w)
    case 'istana': return E.istana()
    case 'barak': return E.barak(b.w, b.d)
    case 'gudang-senjata': return E.gudangSenjata(b.w, b.d)
    case 'kios': return E.kios(b.color, b.goods)
    case 'tempa': return E.tempa()
    case 'kedai': return E.kedai(b.w, b.d)
    case 'pergola': return E.pergola(b.w, b.d)
    case 'meja': return E.mejaPanjang(b.len, { feast: b.feast })
    case 'api-unggun': return E.apiUnggun({ benches: b.benches !== false })
    case 'panggung': return E.panggung(b.w, b.d)
    case 'sasaran': return E.sasaran()
    case 'boneka': return E.boneka()
    case 'rak': return E.rakSenjata()
    case 'tenda': return E.tendaElf(b.color)
    case 'kincir': return E.kincir()
    case 'air-mancur': return E.airMancur(b.r)
    case 'lentera': return E.lentera()
    case 'lumbung': return E.lumbungElf()
    case 'pagar-kayu': return E.pagarKayu(b.len)
    case 'tumpukan': return E.tumpukan()
    case 'bangku': return E.bangkuBatu(b.len)
    case 'dapur': return E.dapur()
    case 'gerobak': return E.gerobak(b.goods)
    case 'sumur': return E.sumur()
    case 'patung': return E.patung()
    case 'panji': return E.panji(b.color, b.h)
    case 'meja-saji': return E.mejaSaji()
    case 'jembatan-perak': {
      const s = b.surface
      const deck = t => s.y0 + (s.y1 - s.y0) * t + s.arch * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - s.a0) / (s.a1 - s.a0))))
      const stepT = 14 / b.len
      const piers = []
      for (let t = s.a0 + stepT; t < s.a1 - stepT * 0.4; t += stepT) piers.push(t)
      const floor = lz => (b.axis === 'x' ? ground.heightAt(b.x + lz, b.z) : ground.heightAt(b.x, b.z + lz))
      return B.jembatan(b.len, b.w, deck, floor, {
        stone: true, piers,
        pal: { lantai: '#cfccc2', sisi: E.EC.putih, bawah: E.EC.batuTua, langkan: E.EC.putih, langkanKind: B.K.BATU, tiang: E.EC.batu, tiangTua: E.EC.batuTua, lampu: E.EC.emas },
      })
    }
    default: throw new Error(`jenis bangunan Aeloria tidak dikenal: ${b.type}`)
  }
}

export function createAeloria({ ground, plan, mask, grid, quality, noiseTexture }) {
  const group = new THREE.Group()
  group.name = 'aeloria'
  const { shadows } = quality

  // ------------------------------------------------------------------- bangunan per petak
  const mat = buildingMaterial(noiseTexture)
  const depthMat = buildingDepthMaterial()
  const built = buildTiles({ builds: plan.build, partsFor: b => partsFor(b, ground), mat, depthMat, shadows, name: 'aeloria' })
  group.add(...built.meshes)

  // ------------------------------------------------------------------- pepohonan
  const wind = windMaterial(noiseTexture)
  const detail = quality.canopyDetail
  const d = quality.treeDensity
  const groundY = t => ({ ...t, y: ground.heightAt(t.x, t.z), a: ((t.x * 0.37 + t.z * 0.11) % 1 + 1) % 1, b: 0.5, c: ((t.x * 0.13 - t.z * 0.29) % 1 + 1) % 1 })
  const special = type => plan.trees.filter(t => t.type === type).map(groundY)
  const upright = standardMatrix({ scaleMin: 1, scaleMax: 1, tilt: 0.04, tint: 0.08, sink: 0.1 })
  const scaleVec = new THREE.Vector3()
  const fixedScale = (it, m, col) => {
    upright(it, m, col)
    m.scale(scaleVec.setScalar(it.s))
    m.elements[12] = it.x
    m.elements[13] = it.y - 0.1
    m.elements[14] = it.z
  }
  const opts = (toMatrix, extra = {}) => ({ castShadow: shadows, receiveShadow: shadows, toMatrix, tile: TREE_TILE, ...extra })

  // hutan liar: di daratan Aeloria, di luar kawasan bangunan, jalan, ladang
  const reserved = (x, z, r) => mask.reserved(x, z, r + 1) || plan.clear(x, z, r)
  const on = (x, z) => LANDS.some(l => landDistance(l, x, z) < 1.05)
  const area = 520
  const all = { perak: [], elf: [], cemara: [], semak: [], bunga: [] }
  const common = { ground, grid, area, cx: 0, cz: -760, reserved }
  all.perak = scatter({
    ...common, kind: 'pohon', seed: 7101, radius: 2.2, count: Math.round(520 * d),
    accept: (x, z, h, slope) => on(x, z) && h > 3 && h < 40 && slope < 0.6 && forestMask(x, z) > 0.4,
  })
  all.elf = scatter({
    ...common, kind: 'pohon', seed: 7202, radius: 3.6, count: Math.round(170 * d),
    accept: (x, z, h, slope, rand) => on(x, z) && h > 3 && h < 40 && slope < 0.45 && rand() < 0.7,
  })
  all.cemara = scatter({
    ...common, kind: 'pohon', seed: 7303, radius: 2.0, count: Math.round(320 * d),
    // cemara terutama di utara (bukit di belakang benteng) dan di bukit-bukit tinggi
    accept: (x, z, h, slope, rand) => on(x, z) && h > 3 && slope < 0.7 && (z < -900 || h > 12 || rand() < 0.25) && forestMask(x, z) > 0.36,
  })
  all.semak = scatter({
    ...common, kind: 'semak', seed: 7404, radius: 1.1, count: Math.round(420 * d),
    accept: (x, z, h, slope) => on(x, z) && h > 2.8 && slope < 0.7,
  })
  all.bunga = scatter({
    ...common, kind: 'semak', seed: 7505, radius: 1.0, count: Math.round(200 * d),
    accept: (x, z, h, slope) => on(x, z) && h > 2.8 && slope < 0.5,
  })
  const trees = new THREE.Group()
  trees.name = 'pohon-aeloria'
  trees.add(
    instancedTiles('pohon-perak', perakGeometry(detail), wind, [...special('perak'), ...all.perak.map(t => ({ ...t, s: 0.8 + t.b * 0.45 }))], opts(fixedScale)),
    instancedTiles('pohon-elf', elfGeometry(detail), wind, all.elf, opts(standardMatrix({ scaleMin: 0.85, scaleMax: 1.25, tilt: 0.06, tint: 0.12 }))),
    instancedTiles('cemara', cemaraGeometry(), wind, all.cemara, opts(standardMatrix({ scaleMin: 0.8, scaleMax: 1.4, tilt: 0.05, tint: 0.12 }))),
    instancedTiles('pohon-agung', agungGeometry(detail), wind, special('agung'), opts(fixedScale)),
    instancedTiles('pohon-buah', buahGeometry(detail), wind, special('buah'), opts(fixedScale)),
    instancedTiles('semak-aeloria', bushGeometry(0, null), wind, all.semak, {
      castShadow: shadows && quality.level === 'tinggi', receiveShadow: shadows, tile: TREE_TILE,
      toMatrix: standardMatrix({ scaleMin: 0.7, scaleMax: 1.4, tilt: 0.2, tint: 0.2, sink: 0.1 }),
    }),
    instancedTiles('bunga-aeloria', bushGeometry(0, ['#f4c02c', '#ffffff', '#a46bd8', '#f06aa8']), wind, [...all.bunga, ...special('bunga')], {
      castShadow: false, receiveShadow: shadows, tile: TREE_TILE,
      toMatrix: standardMatrix({ scaleMin: 0.6, scaleMax: 1.1, tilt: 0.15, tint: 0.08, sink: 0.1 }),
    }),
  )
  group.add(trees)

  // ------------------------------------------------------------------- penghalang & oklusi
  const trunks = [
    ...[...special('perak'), ...all.perak].map(t => ({ x: t.x, z: t.z, radius: 0.45, kind: 'pohon' })),
    ...all.elf.map(t => ({ x: t.x, z: t.z, radius: 0.85, kind: 'pohon' })),
    ...all.cemara.map(t => ({ x: t.x, z: t.z, radius: 0.4, kind: 'pohon' })),
    ...special('buah').map(t => ({ x: t.x, z: t.z, radius: 0.3, kind: 'pohon' })),
  ]
  const occlusion = [
    ...plan.blocked.map(b => ({ x: b.x, z: b.z, radius: Math.max(b.hx, b.hz) + 1.5, strength: 0.25 })),
    ...all.perak.map(t => ({ x: t.x, z: t.z, radius: 3.6, strength: 0.3 })),
    ...all.elf.map(t => ({ x: t.x, z: t.z, radius: 5.5, strength: 0.4 })),
    ...all.cemara.map(t => ({ x: t.x, z: t.z, radius: 3, strength: 0.35 })),
    ...special('agung').map(t => ({ x: t.x, z: t.z, radius: 13, strength: 0.45 })),
    ...all.semak.map(t => ({ x: t.x, z: t.z, radius: 1.8, strength: 0.2 })),
  ]

  // jaringan jalan kesatria & penduduk: jalan dicat + jalur tanpa cat (jembatan, lapangan, kemah)
  const routes = buildRoutes([...plan.roads, ...plan.paths])

  return {
    object: group,
    colliders: [...plan.colliders, ...trunks],
    surfaces: plan.surfaces,
    occlusion,
    routes,
    roofs: plan.roofs,
    stats: {
      bangunan: plan.build.length,
      rumah: (built.counts['rumah-elf'] || 0) + (built.counts['rumah-bulat'] || 0),
      jenis: built.counts,
      petak: built.tiles.size,
      titik: built.vertices,
      pohon: Object.values(all).reduce((n, l) => n + l.length, 0) + plan.trees.length,
      simpulJalan: routes.nodes.length,
      tempat: plan.sites.length,
    },
  }
}
