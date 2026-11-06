// Riverside Apartments — architecture for all 8 floors + roof + street, and the
// streamed detail zones (lobby, per-floor corridor dressing, Apartment 703, roof).
import * as THREE from 'three'
import { Builder } from './builder.js'
import { HingedDoor } from './interact.js'
import { Fixture } from './lights.js'
import * as P from './props.js'
import {
  FLOOR_H, SLAB, CEIL_H, FLOORS, ROOF_Y, B, IN, STAIR, SHAFT, ELEV_DOOR, DOORS_N, DOORS_S,
  DOOR_H, INNER_DOOR_H, APT_K, HOME_K, hasApartment, APT, MAP, floorLabel,
} from './constants.js'
import { textTexture } from './materials.js'

const STAIR_HOLE = { x0: STAIR.x0, x1: STAIR.x1, z0: STAIR.landZ, z1: STAIR.z1 }
const SHAFT_HOLE = { x0: SHAFT.x0, x1: SHAFT.x1, z0: SHAFT.z0, z1: SHAFT.z1 }
const RISE = 1.5 / 9

// Window layouts (per facade) -------------------------------------------------------
function northWindows(k) {
  if (k === 0) return [
    { a: -12.5, b: -11.1, lo: 1.6, hi: 2.3 }, { a: -9, b: -7.6, lo: 1.6, hi: 2.3 },
    { a: -3.2, b: -1.2, lo: 0.5, hi: 2.4 }, { a: 2.2, b: 4.2, lo: 0.5, hi: 2.4 },
    { a: 6.0, b: 7.4, lo: 0.9, hi: 2.3 }, { a: 11.0, b: 12.6, lo: 0.9, hi: 2.3 },
  ]
  return [[-12.5, -11.1], [-9, -7.6], [-6.4, -5.0], [-3.2, -0.8, 0.25, 2.5], [0.4, 2.8, 0.25, 2.5], [5.6, 7.6, 0.25, 2.5], [11.4, 13.4, 0.25, 2.5]]
    .map(([a, b, lo = 0.9, hi = 2.3]) => ({ a, b, lo, hi }))
}
const SOUTH_WINDOWS = [[-13.2, -11.2, 2.0, 2.8], [-6.5, -5.1], [-3, -1.6], [0.5, 1.9], [4.5, 5.9], [8, 9.4], [11.2, 12.6]]
  .map(([a, b, lo = 0.9, hi = 2.3]) => ({ a, b, lo, hi }))
const EAST_WINDOWS = [[-10.8, -8.8, 0.25, 2.5], [-8.2, -6.8, 0.25, 2.5], [-4.4, -3.0, 1.4, 2.2], [-0.6, 0.6], [3, 4.4], [5.5, 6.9]]
  .map(([a, b, lo = 0.9, hi = 2.3]) => ({ a, b, lo, hi }))
const WEST_WINDOWS = [[-10.4, -9.0], [-6.3, -4.9], [-3.5, -2.1], [-0.6, 0.6]].map(([a, b]) => ({ a, b, lo: 0.9, hi: 2.3 }))

const ENTRANCE = { a: -0.4, b: 1.4, lo: 0, hi: 2.4 }

// ---------------------------------------------------------------------------------

function slab(b, k, finishes) {
  const y = k * FLOOR_H
  const holes = k === 0 ? [SHAFT_HOLE] : [STAIR_HOLE, SHAFT_HOLE]
  // underside (the ceiling of the floor below) + collider
  b.rectMinus('ceiling', IN.x0, IN.z0, IN.x1, IN.z1, holes, y - SLAB, y - 0.011, { collide: false, faces: { py: false } })
  b.rectMinus('concrete', IN.x0, IN.z0, IN.x1, IN.z1, holes, y - 0.012, y - 0.011,
    { collide: false, faces: { px: false, nx: false, ny: false, pz: false, nz: false } })
  b.rectMinus(null, IN.x0, IN.z0, IN.x1, IN.z1, holes, y - SLAB, y)
  for (const [mat, x0, z0, x1, z1] of finishes)
    b.box(mat, x0, y - 0.01, z0, x1, y, z1, { collide: false, faces: { ny: false } })
}

function exteriorWalls(b, k, top = FLOOR_H) {
  const y = k * FLOOR_H, y1 = y + top
  const corr = k === 0 ? 'lobbyPaint' : 'corridorPaint'
  const unit = k === 0 ? 'utilityPaint' : 'wallpaper'
  const nw = northWindows(k)
  const nOpen = k === 0 ? [...nw, ENTRANCE] : nw
  // north (street) facade
  b.wall('brick', 'x', B.x0, B.x1, B.z0, B.z0 + 0.1, y, y1, nOpen)
  b.wall(k === 0 ? 'lobbyPaint' : hasApartment(k) ? [[-3.9, 'wallpaper'], [20, 'luxWall']] : 'wallpaper', 'x', B.x0 + 0.1, B.x1 - 0.1, B.z0 + 0.1, IN.z0, y, y1, nOpen)
  for (const w of nw) b.window('x', w.a, w.b, B.z0, IN.z0, y, w.lo, w.hi, { inside: 1 })
  // south
  b.wall('brick', 'x', B.x0, B.x1, B.z1 - 0.1, B.z1, y, y1, SOUTH_WINDOWS)
  b.wall([[STAIR.x1 + 0.1, 'stairPaint'], [SHAFT.x1 + 0.2, 'concrete'], [20, unit]], 'x', B.x0 + 0.1, B.x1 - 0.1, IN.z1, B.z1 - 0.1, y, y1, SOUTH_WINDOWS)
  for (const w of SOUTH_WINDOWS) b.window('x', w.a, w.b, IN.z1, B.z1, y, w.lo, w.hi, { inside: -1 })
  // east
  const eastIn = hasApartment(k) ? [[-6.0, 'luxWall'], [-1.0, 'marbleWall'], [1.0, corr], [20, 'wallpaper']] : [[-1.0, unit], [1.0, corr], [20, unit]]
  b.wall('brick', 'z', B.z0 + 0.1, B.z1 - 0.1, B.x1 - 0.1, B.x1, y, y1, EAST_WINDOWS)
  b.wall(eastIn, 'z', B.z0 + 0.1, B.z1 - 0.1, IN.x1, B.x1 - 0.1, y, y1, EAST_WINDOWS)
  for (const w of EAST_WINDOWS) b.window('z', w.a, w.b, IN.x1, B.x1, y, w.lo, w.hi, { inside: -1 })
  // west
  b.wall('brick', 'z', B.z0 + 0.1, B.z1 - 0.1, B.x0, B.x0 + 0.1, y, y1, WEST_WINDOWS)
  b.wall([[-1.0, unit], [1.0, corr], [20, 'stairPaint']], 'z', B.z0 + 0.1, B.z1 - 0.1, B.x0 + 0.1, IN.x0, y, y1, WEST_WINDOWS)
  for (const w of WEST_WINDOWS) b.window('z', w.a, w.b, B.x0, IN.x0, y, w.lo, w.hi, { inside: 1 })
  // facade string course at each floor line
  const nc = { collide: false }
  b.box('concrete', B.x0 - 0.06, y - 0.1, B.z0 - 0.06, B.x1 + 0.06, y + 0.06, B.z0, nc)
  b.box('concrete', B.x0 - 0.06, y - 0.1, B.z1, B.x1 + 0.06, y + 0.06, B.z1 + 0.06, nc)
  b.box('concrete', B.x0 - 0.06, y - 0.1, B.z0, B.x0, y + 0.06, B.z1, nc)
  b.box('concrete', B.x1, y - 0.1, B.z0, B.x1 + 0.06, y + 0.06, B.z1, nc)
}

function stairs(b, k) {
  const y = k * FLOOR_H
  const S = STAIR
  const ground = k === 0
  const m = 'stairConcrete'
  for (let j = 1; j <= S.steps; j++) {
    // flight A (west, climbing south from the floor landing)
    const ta = y + j * RISE
    b.box(m, S.x0, ground ? y : ta - 0.6, S.landZ + (j - 1) * S.run, S.spine0, ta, S.landZ + j * S.run)
    // flight B (east, climbing north from the mid landing to the next floor)
    const tb = y + 1.5 + j * RISE
    b.box(m, S.spine1, ground ? y : tb - 0.6, S.midZ - j * S.run, S.x1, tb, S.midZ - (j - 1) * S.run)
  }
  // mid landing
  b.box(m, S.x0, ground ? y : y + 1.25, S.midZ, S.x1, y + 1.5, S.z1)
  if (ground) b.box(m, S.spine1, y, S.landZ, S.x1, y + 1.5, S.midZ) // solid under the first upper flight
  // spine wall between the flights (full storey)
  b.wall2('stairPaint', 'stairPaint', 'z', S.landZ, S.midZ, S.spine0, S.spine1, y, y + FLOOR_H)
  // handrails (visual)
  const nc = { collide: false }
  for (let j = 0; j < S.steps; j++) {
    const za = S.landZ + (j + 0.5) * S.run
    b.box('steel', S.x0 + 0.03, y + (j + 1) * RISE + 0.88, za - S.run / 2, S.x0 + 0.06, y + (j + 1) * RISE + 0.92, za + S.run / 2, nc)
    const zb = S.midZ - (j + 0.5) * S.run
    b.box('steel', S.x1 - 0.06, y + 1.5 + (j + 1) * RISE + 0.88, zb - S.run / 2, S.x1 - 0.03, y + 1.5 + (j + 1) * RISE + 0.92, zb + S.run / 2, nc)
  }
}

function corridorWalls(b, k, game) {
  const y = k * FLOOR_H, yc = y + CEIL_H
  const corr = k === 0 ? 'lobbyPaint' : 'corridorPaint'
  const unit = k === 0 ? 'utilityPaint' : 'wallpaper'
  // north corridor wall: apartment side z[-1.1,-1.0], corridor side z[-1.0,-0.9]
  const nOpen = k === 0
    ? [{ a: DOORS_N['01'][0], b: DOORS_N['01'][1], hi: DOOR_H }, { a: NORTH_LOBBY.x0, b: NORTH_LOBBY.x1, hi: 2.5 }, { a: DOORS_N['03'][0], b: DOORS_N['03'][1], hi: DOOR_H }]
    : RES_DOORS_N.map(([a, b2]) => ({ a, b: b2, hi: DOOR_H }))
  const aptSide = hasApartment(k) ? [[-3.9, unit], [4.0, 'kitchenPaint'], [9.0, 'luxWall'], [20, 'marbleWall']]
    : k === 0 ? [[-3.9, 'utilityPaint'], [5, 'lobbyPaint'], [20, 'utilityPaint']] : unit
  b.wall2(aptSide, corr, 'x', IN.x0, IN.x1, -1.1, -0.9, y, yc, nOpen)
  // south corridor wall: corridor side z[0.9,1.0], other side z[1.0,1.1]
  const sOpen = [
    { a: STAIR.door[0], b: STAIR.door[1], hi: DOOR_H }, { a: ELEV_DOOR[0], b: ELEV_DOOR[1], hi: DOOR_H },
    ...Object.values(DOORS_S).map(([a, b2]) => ({ a, b: b2, hi: DOOR_H })),
  ]
  b.wall2(corr, [[STAIR.x1 + 0.1, 'stairPaint'], [SHAFT.x1 + 0.2, 'concrete'], [20, unit]], 'x', IN.x0, IN.x1, 0.9, 1.1, y, yc, sOpen)
  for (const o of [...nOpen.filter(o => o.hi === DOOR_H), ...sOpen.filter(o => o.a !== ELEV_DOOR[0])])
    b.doorTrim('x', o.a, o.b, o.a < -12.5 ? -1.1 : (sOpen.includes(o) ? 0.9 : -1.1), sOpen.includes(o) ? 1.1 : -0.9, y, DOOR_H)
  b.doorTrim('x', ELEV_DOOR[0], ELEV_DOOR[1], 0.9, 0.9, y, DOOR_H) // corridor-side only
  // skirting strip along corridor floor (visual)
  // north partitions between units
  for (const xc of k === 0 ? [-4, 5] : [-4]) {
    let west = unit, east = unit
    if (k === 0) { west = xc === -4 ? 'utilityPaint' : 'lobbyPaint'; east = xc === -4 ? 'lobbyPaint' : 'utilityPaint' }
    if (hasApartment(k)) east = [[-4.6, 'luxWall'], [-1.1, 'kitchenPaint']]
    b.wall2(west, east, 'z', IN.z0, -1.1, xc - 0.1, xc + 0.1, y, yc)
  }
  // south: stair east wall / shaft walls (full storey height), unit split
  b.wall2('stairPaint', 'concrete', 'z', 1.1, IN.z1, STAIR.x1, SHAFT.x0, y, y + FLOOR_H)
  b.wall2('concrete', unit, 'z', 1.1, IN.z1, SHAFT.x1, SHAFT.x1 + 0.2, y, y + FLOOR_H)
  b.wall('concrete', 'x', SHAFT.x0, SHAFT.x1, SHAFT.z1, SHAFT.z1 + 0.2, y, y + FLOOR_H)
  b.wall2(unit, unit, 'z', 1.1, IN.z1, 2.9, 3.1, y, yc)
  // the elevator shaft front between the corridor ceiling and the next slab is covered by the slab.
  // lobby corner: the header above the wide lobby opening is part of nOpen (hi 2.5)
}
const NORTH_LOBBY = { x0: -3.9, x1: 4.9 }
const RES_DOORS_N = [DOORS_N['01'], DOORS_N['03']] // residential floors: 01 + the merged luxury unit 03

function apartmentWalls(b, k) {
  const y = k * FLOOR_H, yc = y + CEIL_H
  // living | kitchen: wide open-plan opening
  b.wall2('luxWall', 'kitchenPaint', 'x', APT.x0, 5.0, -4.66, -4.54, y, yc, [{ a: -2.4, b: 3.4, hi: 2.4 }])
  // kitchen | foyer: arch
  b.wall2('kitchenPaint', 'luxWall', 'z', -4.54, -1.1, 3.94, 4.06, y, yc, [{ a: -4.2, b: -1.6, hi: 2.3 }])
  // living | bedroom + gallery: arch from the gallery into the living room
  b.wall2('luxWall', 'luxWall', 'z', APT.z0, -4.66, 4.94, 5.06, y, yc, [{ a: -5.9, b: -4.8, hi: 2.3 }])
  // master bedroom | gallery + bathroom: two doors
  b.wall2('luxWall', [[9.0, 'luxWall'], [20, 'marbleWall']], 'x', 5.06, APT.x1, -6.06, -5.94, y, yc,
    [{ a: 6.6, b: 7.5, hi: INNER_DOOR_H }, { a: 10.2, b: 11.0, hi: INNER_DOOR_H }])
  // gallery | bathroom (en-suite: only reachable from the bedroom)
  b.wall2('luxWall', 'marbleWall', 'z', -5.94, -1.1, 8.94, 9.06, y, yc)
  b.doorTrim('x', 6.6, 7.5, -6.06, -5.94, y, INNER_DOOR_H)
  b.doorTrim('x', 10.2, 11.0, -6.06, -5.94, y, INNER_DOOR_H)
  // crown moulding along the luxury rooms (visual)
  const nc = { collide: false }
  b.box('frame', APT.x0, yc - 0.08, APT.z0, APT.x1, yc - 0.06, APT.z0 + 0.06, nc)
  b.box('frame', APT.x0, yc - 0.08, -1.16, APT.x1, yc - 0.06, -1.1, nc)
}

function floorFinishes(k) {
  const f = []
  const S = STAIR
  f.push([k === 0 ? 'lobbyFloor' : 'carpet', IN.x0, -0.9, IN.x1, 0.9])
  f.push(['stairConcrete', S.x0, S.z0, S.x1, k === 0 ? S.z1 : S.landZ])
  if (k === 0) {
    f.push(['lobbyFloor', NORTH_LOBBY.x0, IN.z0, NORTH_LOBBY.x1, -0.9])
    f.push(['lobbyFloor', DOORS_N['01'][0], -1.1, DOORS_N['01'][1], -0.9]) // thresholds
  } else {
    for (const [a, b2] of RES_DOORS_N) f.push(['carpet', a, -1.1, b2, -0.9])
  }
  for (const [a, b2] of Object.values(DOORS_S)) f.push(['carpet', a, 0.9, b2, 1.1])
  f.push([k === 0 ? 'lobbyFloor' : 'carpet', ELEV_DOOR[0], 0.9, ELEV_DOOR[1], 1.1])
  f.push(['stairConcrete', S.door[0], 0.9, S.door[1], 1.1])
  if (hasApartment(k)) {
    const A = APT
    f.push(['marble', A.kitchen.x0, A.kitchen.z0 - 0.06, A.kitchen.x1 + 0.06, A.kitchen.z1])
    f.push(['wood', A.living.x0, A.living.z0, A.living.x1 + 0.06, A.living.z1 + 0.06])
    f.push(['marble', A.hall.x0, A.hall.z0, A.hall.x1, A.hall.z1])
    f.push(['wood', A.bedroom.x0 - 0.06, A.bedroom.z0, A.bedroom.x1, A.bedroom.z1 + 0.12])
    f.push(['lobbyFloor', A.bathroom.x0 - 0.06, A.bathroom.z0, A.bathroom.x1, A.bathroom.z1])
  }
  return f
}

// ---------------------------------------------------------------------------------

function doorPlate(text, small) {
  return textTexture(text, small ? { font: 'bold 44px Arial', bg: '#2b3030', fg: '#d8d8c8' } : {})
}

function addDoors(game, k) {
  const y = k * FLOOR_H
  const residents = ['', 'Okafor', 'Brennan', 'Lindqvist', 'Moreau', 'Haldane']
  const lockedLines = ['It\'s locked.', 'Locked. Someone is breathing on the other side... no. Just the radiator.', 'Locked tight.', 'The handle won\'t turn.', 'Locked. There\'s a smell of mildew under the door.']
  const add = o => game.addDoor(new HingedDoor(game, o))
  for (const [u, [a, b]] of Object.entries(DOORS_N)) {
    const num = `${k + 1}${u}`
    if (u === '02') continue // ground floor: open lobby archway; above: merged into the luxury unit 03
    if (k === 0) {
      const name = u === '01' ? 'maintenance door' : 'office door'
      add({ id: `door-0-${u}`, hinge: { x: a, y, z: -1.0 }, dir: 'x+', width: b - a, height: DOOR_H - 0.01, mat: 'doorPaint', name,
        locked: u !== '01', lockedMsg: 'The manager\'s office is locked.', plate: { texture: doorPlate(u === '01' ? 'MAINT.' : 'OFFICE', true), side: 1 } })
      continue
    }
    add({
      id: `door-${k}-${u}`, hinge: { x: a, y, z: -1.0 }, dir: 'x+', width: b - a, height: DOOR_H - 0.01, mat: 'doorWood',
      swing: 1, // apartment doors open into the unit, never into the corridor
      name: num === '803' ? 'front door' : `door to ${num}`, locked: num !== '803', keyId: num === '703' ? 'key703' : null,
      lockedMsg: num === '703' ? 'Apartment 703 is locked. The manager kept spare keys at the front desk.' : lockedLines[(k * 3 + +u) % lockedLines.length],
      plate: { texture: doorPlate(num), side: 1 },
    })
  }
  for (const [u, [a, b]] of Object.entries(DOORS_S)) {
    const num = `${k + 1}${u}`
    add({
      id: `door-${k}-${u}`, hinge: { x: a, y, z: 1.0 }, dir: 'x+', width: b - a, height: DOOR_H - 0.01, mat: k === 0 ? 'doorPaint' : 'doorWood',
      swing: -1,
      name: k === 0 ? (u === '04' ? 'laundry door' : 'storage door') : `door to ${num}`, locked: true,
      lockedMsg: k === 0 ? 'Locked. A sign reads "Residents only — see manager".' : lockedLines[(k * 2 + +u) % lockedLines.length] + (residents[+u] ? '' : ''),
      plate: { texture: doorPlate(k === 0 ? (u === '04' ? 'LAUNDRY' : 'STORAGE') : num, k === 0), side: -1 },
    })
  }
  add({
    id: `door-stair-${k}`, hinge: { x: STAIR.door[0], y, z: 1.0 }, dir: 'x+', width: STAIR.door[1] - STAIR.door[0], height: DOOR_H - 0.01,
    mat: 'doorMetal', name: 'stairwell door', plate: { texture: doorPlate(`STAIRS ${floorLabel(k)}`, true), side: -1 },
  })
}

function addApartmentDoors(game, k) {
  const y = k * FLOOR_H, n = `${k + 1}03`
  const add = o => game.addDoor(new HingedDoor(game, { mat: 'doorWood', height: INNER_DOOR_H - 0.01, ...o }))
  add({ id: `door-${n}-bedroom`, hinge: { x: 6.6, y, z: -6.0 }, dir: 'x+', width: 0.9, name: 'bedroom door' })
  add({ id: `door-${n}-bath`, hinge: { x: 10.2, y, z: -6.0 }, dir: 'x+', width: 0.8, name: 'bathroom door' })
}

// ---------------------------------------------------------------------------------

export function buildShell(game) {
  for (let k = 0; k < FLOORS; k++) {
    const b = new Builder(game, 'floor' + k)
    slab(b, k, floorFinishes(k))
    exteriorWalls(b, k)
    corridorWalls(b, k, game)
    stairs(b, k)
    if (hasApartment(k)) apartmentWalls(b, k)
    if (k === 0) {
      // entrance threshold (the exterior wall's footprint has no slab under it)
      b.box('lobbyFloor', ENTRANCE.a, -SLAB, B.z0, ENTRANCE.b, 0, IN.z0, { faces: { ny: false } })
      // elevator pit floor
      b.box('concrete', SHAFT.x0, -1.6, SHAFT.z0, SHAFT.x1, -1.4, SHAFT.z1)
      b.box('concrete', B.x0 - 0.1, -0.02, B.z0 - 0.1, B.x1 + 0.1, 0.4, B.z0, { collide: false, faces: { pz: false } }) // plinth
      // entrance canopy
      b.box('concrete', -1.4, 2.75, B.z0 - 1.6, 2.4, 2.95, B.z0, { collide: false })
    }
    game.scene.add(b.finish())
    game.shellBuilders.push(b)
    addDoors(game, k)
    if (hasApartment(k)) addApartmentDoors(game, k)
  }
  // entrance doors (double, swing away from the player)
  for (const [x, dir] of [[ENTRANCE.a, 'x+'], [ENTRANCE.b, 'x-']])
    game.addDoor(new HingedDoor(game, {
      id: 'door-entrance-' + dir, hinge: { x, y: 0, z: B.z0 + 0.15 }, dir, width: 0.9, height: ENTRANCE.hi - 0.01,
      mat: 'doorWood', name: 'front door',
    }))
  buildRoof(game)
  buildExterior(game)
}

function buildRoof(game) {
  const b = new Builder(game, 'roof')
  const y = ROOF_Y, top = y + FLOOR_H
  slab(b, FLOORS, [['roof', IN.x0, IN.z0, IN.x1, IN.z1], ['stairConcrete', STAIR.x0, STAIR.z0, STAIR.x1, STAIR.landZ]])
  // the roof covers the parapet footprint too
  b.box('roof', B.x0, y - SLAB, B.z0, B.x1, y - 0.02, B.z1, { collide: false, faces: { py: false, ny: false } })
  // parapet (with an invisible extension so nobody can get over it)
  const ph = 1.1
  const BH = { x1: SHAFT.x1 + 0.2, z0: 0.9 } // stair/elevator bulkhead: x[B.x0, BH.x1], z[0.9, B.z1]
  b.box('brick', B.x0, y, B.z0, B.x1, y + ph, IN.z0)
  b.box('brick', IN.x1, y, IN.z0, B.x1, y + ph, B.z1)
  b.box('brick', BH.x1, y, IN.z1, IN.x1, y + ph, B.z1)
  b.box('brick', B.x0, y, IN.z0, IN.x0, y + ph, BH.z0)
  b.box('concrete', B.x0 - 0.05, y + ph, B.z0 - 0.05, B.x1 + 0.05, y + ph + 0.08, IN.z0 + 0.05, { collide: false })
  b.box('concrete', IN.x1 - 0.05, y + ph, IN.z0, B.x1 + 0.05, y + ph + 0.08, B.z1 + 0.05, { collide: false })
  b.box('concrete', BH.x1, y + ph, IN.z1 - 0.05, IN.x1, y + ph + 0.08, B.z1 + 0.05, { collide: false })
  b.box('concrete', B.x0 - 0.05, y + ph, IN.z0, IN.x0 + 0.05, y + ph + 0.08, BH.z0, { collide: false })
  b.collider(B.x0, y + ph, B.z0, B.x1, y + 6, IN.z0, { tag: 'bounds' })
  b.collider(IN.x1, y + ph, IN.z0, B.x1, y + 6, B.z1, { tag: 'bounds' })
  b.collider(BH.x1, y + ph, IN.z1, IN.x1, y + 6, B.z1, { tag: 'bounds' })
  b.collider(B.x0, y + ph, IN.z0, IN.x0, y + 6, BH.z0, { tag: 'bounds' })
  // bulkhead over the stairwell + elevator machine room
  const door = [{ a: STAIR.door[0], b: STAIR.door[1], hi: DOOR_H }]
  b.wall2('brick', 'stairPaint', 'x', B.x0, BH.x1, BH.z0, 1.1, y, top, door)
  b.doorTrim('x', STAIR.door[0], STAIR.door[1], 0.9, 1.1, y, DOOR_H)
  b.wall('brick', 'z', 1.1, B.z1, B.x0, IN.x0, y, top)
  b.wall('brick', 'x', IN.x0, BH.x1, IN.z1, B.z1, y, top)
  b.wall2('concrete', 'brick', 'z', 1.1, IN.z1, SHAFT.x1, BH.x1, y, top)
  b.wall2('stairPaint', 'concrete', 'z', 1.1, IN.z1, STAIR.x1, SHAFT.x0, y, top)
  b.wall('concrete', 'x', SHAFT.x0, SHAFT.x1, SHAFT.z1, SHAFT.z1 + 0.2, y, top)
  b.wall2('stairPaint', 'stairPaint', 'z', STAIR.landZ, STAIR.midZ, STAIR.spine0, STAIR.spine1, y, top)
  b.box('roof', B.x0 - 0.05, top, BH.z0 - 0.05, BH.x1 + 0.05, top + 0.25, B.z1 + 0.05, { faces: { ny: false } })
  b.box('ceiling', B.x0, top - 0.01, BH.z0, BH.x1, top, B.z1, { collide: false, faces: { py: false } })
  // guard rail where the top landing overlooks the last flight
  b.box('steel', STAIR.x0, y, STAIR.landZ, STAIR.spine0, y + 1.05, STAIR.landZ + 0.06)
  game.scene.add(b.finish())
  game.shellBuilders.push(b)
  game.addDoor(new HingedDoor(game, {
    id: 'door-roof', hinge: { x: STAIR.door[0], y, z: 1.0 }, dir: 'x+', width: STAIR.door[1] - STAIR.door[0], height: DOOR_H - 0.01,
    mat: 'doorMetal', name: 'roof door', plate: { texture: doorPlate('ROOF', true), side: 1 },
  }))
}

function buildExterior(game) {
  const b = new Builder(game, 'exterior')
  const STREET = { x0: MAP.x0, x1: MAP.x1, z0: -30, z1: -19.5 }
  b.rectMinus('paving', MAP.x0, MAP.z0, MAP.x1, MAP.z1, [B, STREET], -0.4, 0, { faces: { ny: false } })
  b.box('asphalt', STREET.x0, -0.55, STREET.z0, STREET.x1, -0.15, STREET.z1, { faces: { ny: false } })
  b.box('concrete', STREET.x0, -0.15, STREET.z1 - 0.15, STREET.x1, 0, STREET.z1, { collide: false })
  // road markings
  for (let x = MAP.x0 + 2; x < MAP.x1; x += 6) b.box('frame', x, -0.15, -24.85, x + 3, -0.145, -24.65, { collide: false, shadow: false })
  // map boundary: low walls + invisible barrier
  const wallH = 2.2
  for (const [x0, z0, x1, z1] of [[MAP.x0, MAP.z0, MAP.x1, MAP.z0 + 0.3], [MAP.x0, MAP.z1 - 0.3, MAP.x1, MAP.z1], [MAP.x0, MAP.z0, MAP.x0 + 0.3, MAP.z1], [MAP.x1 - 0.3, MAP.z0, MAP.x1, MAP.z1]]) {
    b.box('concrete', x0, -0.6, z0, x1, wallH, z1)
    b.collider(x0 - 1, wallH, z0 - 1, x1 + 1, 40, z1 + 1, { tag: 'bounds' })
  }
  b.collider(MAP.x0 - 2, -3, MAP.z0 - 2, MAP.x1 + 2, -2, MAP.z1 + 2, { tag: 'bounds' })
  // planters along the facade
  for (const [x0, x1] of [[-12, -3], [3.5, 12]]) {
    b.box('concrete', x0, 0, -13.4, x1, 0.45, -12.6)
    b.box('grass', x0 + 0.08, 0.45, -13.32, x1 - 0.08, 0.47, -12.68, { collide: false })
  }
  // trees in the planters
  for (const x of [-10, -5, 6, 10.5]) {
    b.boxC('bark', x, -13, 0.18, 0.18, 0.45, 3.2)
    b.boxC('tree', x, -13, 1.6, 1.6, 2.6, 4.2, { collide: false })
    b.boxC('tree', x + 0.2, -13.1, 1.1, 1.1, 4.2, 5.0, { collide: false })
  }
  // street lamps
  const lampAt = [[-20, -18.8, 0], [-6, -18.8, 0.6], [8, -18.8, 0], [22, -18.8, 0.2], [20, 2, 0]]
  lampAt.forEach(([x, z, fl], i) => {
    b.boxC('steel', x, z, 0.14, 0.14, 0, 5.2)
    b.boxC('steel', x, z - 0.4, 0.12, 0.9, 5.1, 5.25, { collide: false })
    const mat = new THREE.MeshBasicMaterial({ color: 0xffc070 })
    const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.4), mat)
    bulb.position.set(x, 5.07, z - 0.6)
    game.scene.add(bulb)
    game.lights.add(new Fixture({
      id: 'street-' + i, pos: new THREE.Vector3(x, 4.8, z - 0.6), floor: 'outside', circuit: 'street',
      color: 0xffb060, intensity: 45, range: 16, flicker: fl, glow: lv => mat.color.setRGB(lv, lv * 0.75, lv * 0.45),
    }))
  })
  // parked car
  b.box('carPaint', 4.2, -0.15 + 0.25, -22.2, 8.6, 0.95, -20.4)
  b.box('carPaint', 5.2, 0.95, -22.1, 7.6, 1.5, -20.5)
  b.box('glass', 5.25, 1.0, -22.12, 7.55, 1.45, -20.48, { collide: false })
  for (const [x, z] of [[4.9, -22.25], [7.9, -22.25], [4.9, -20.35], [7.9, -20.35]]) b.boxC('blackPlastic', x, z, 0.6, 0.2, -0.15, 0.45, { collide: false })
  // dumpster + bins by the east side
  b.box('carPaint', 16, 0, -4, 18, 1.3, -2.6)
  b.box('blackPlastic', 16.2, 0, -1.8, 16.8, 1.0, -1.2)
  b.box('blackPlastic', 17, 0, -1.8, 17.6, 1.0, -1.2)
  // distant buildings (outside the boundary) with a few lit windows
  const rnd = mulberry(77)
  for (let i = 0; i < 18; i++) {
    const side = i % 3
    let x, z
    if (side === 0) { x = MAP.x0 + i * 4.2; z = MAP.z0 - 8 - rnd() * 10 }
    else if (side === 1) { x = MAP.x0 - 8 - rnd() * 8; z = -30 + i * 3 }
    else { x = MAP.x1 + 8 + rnd() * 8; z = -30 + i * 3 }
    const w = 6 + rnd() * 6, d = 6 + rnd() * 6, h = 8 + rnd() * 26
    b.box('distant', x - w / 2, -0.5, z - d / 2, x + w / 2, h, z + d / 2, { collide: false })
    for (let n = 0; n < 4; n++) {
      if (rnd() < 0.5) continue
      const wy = 2 + Math.floor(rnd() * (h / 3 - 1)) * 3, wx = x - w / 2 + 1 + rnd() * (w - 2.5)
      if (side === 0) b.box('windowLit', wx, wy, z + d / 2, wx + 1.0, wy + 1.2, z + d / 2 + 0.02, { collide: false, shadow: false })
      else if (side === 1) b.box('windowLit', x + w / 2, wy, z - 1, x + w / 2 + 0.02, wy + 1.2, z, { collide: false, shadow: false })
      else b.box('windowLit', x - w / 2 - 0.02, wy, z - 1, x - w / 2, wy + 1.2, z, { collide: false, shadow: false })
    }
  }
  game.scene.add(b.finish())
  game.shellBuilders.push(b)
}

export function mulberry(a) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

// =================================================================================
// Streamed zones
// =================================================================================

export function defineZones(game) {
  const Z = game.zones
  Z.define('lobby', pf => pf <= 1, buildLobby)
  for (let k = 1; k < FLOORS; k++) Z.define('floor-' + k, pf => Math.abs(pf - k) <= 1, z => buildFloorDecor(z, k))
  Z.define('apt703', pf => pf >= APT_K - 1 && pf <= APT_K + 1, buildApartment)
  Z.define('apt803', pf => pf >= HOME_K - 1, buildHome)
  Z.define('roof', pf => pf >= FLOORS - 1, buildRoofProps)
}

function stairLights(z, k) {
  const y = k * FLOOR_H
  P.ceilingLamp(z, { id: `stair-${k}-a`, x: -12.2, y: y + CEIL_H, z: 2.0, circuit: 'stairs', intensity: 3, range: 5, flicker: k % 3 === 1 ? 0.5 : 0.05, style: 'dome' })
  P.ceilingLamp(z, { id: `stair-${k}-b`, x: -12.2, y: y + 4.2, z: 6.6, circuit: 'stairs', intensity: 2.5, range: 4.5, flicker: 0.1, style: 'dome' })
  // floor number painted on the landing wall + exit sign over the door
  const t = textTexture(floorLabel(k), { w: 128, h: 128, bg: '#3b4547', fg: '#d0d0c0', font: 'bold 90px Arial', border: false })
  const m = P.mesh(z, new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }), -10.71, y + 1.6, 2.2)
  m.rotation.y = -Math.PI / 2
  z.own(t)
}

function exitSign(z, x, y, zz, rotY) {
  const t = z.game.exitTexture
  const m = P.mesh(z, new THREE.BoxGeometry(0.36, 0.14, 0.04), new THREE.MeshBasicMaterial({ map: t }), x, y, zz)
  m.rotation.y = rotY
  m.castShadow = false
}

function corridorLamps(z, k, circuit, flick) {
  const y = k * FLOOR_H + CEIL_H
  const xs = [-11.4, -6.8, -2.2, 2.4, 7.0, 11.6]
  // instanced lamp housings (one draw call per floor)
  const inst = new THREE.InstancedMesh(z.game.shared.lampHousing(), z.M.steel, xs.length)
  const bulbs = new THREE.InstancedMesh(z.game.shared.lampBulb(), new THREE.MeshBasicMaterial({ color: 0xffffff }), xs.length)
  const mtx = new THREE.Matrix4()
  const on = new THREE.Color(0xfff1d0), off = new THREE.Color(0x1d1d1b), tmp = new THREE.Color()
  xs.forEach((x, i) => {
    mtx.makeTranslation(x, y, 0)
    inst.setMatrixAt(i, mtx); bulbs.setMatrixAt(i, mtx)
    bulbs.setColorAt(i, off)
    z.fixture(new Fixture({
      id: `cor-${k}-${i}`, pos: new THREE.Vector3(x, y - 0.4, 0), circuit, intensity: 2.6, range: 6, flicker: flick(i),
      glow: lv => { bulbs.setColorAt(i, tmp.copy(off).lerp(on, lv)); bulbs.instanceColor.needsUpdate = true },
    }))
  })
  z.extra.add(inst, bulbs)
}

function buildLobby(z) {
  const g = z.game, b = z.b
  // lights: lobby circuit (ceiling), always-on emergency lights
  P.ceilingLamp(z, { id: 'lobby-1', x: -1.2, y: CEIL_H, z: -5.0, circuit: 'lobby', intensity: 7, range: 8, style: 'panel' })
  P.ceilingLamp(z, { id: 'lobby-2', x: 2.6, y: CEIL_H, z: -2.6, circuit: 'lobby', intensity: 6, range: 8, flicker: 0.3, style: 'panel' })
  corridorLamps(z, 0, 'lobby', i => (i === 1 ? 0.6 : 0.05))
  z.fixture(new Fixture({ id: 'emerg-lobby', pos: new THREE.Vector3(0.5, 2.5, -11.4), color: 0xff5030, intensity: 1.6, range: 7 }))
  z.fixture(new Fixture({ id: 'emerg-cor', pos: new THREE.Vector3(-9.4, 2.5, 0.6), color: 0xff5030, intensity: 1.2, range: 6 }))
  exitSign(z, 0.5, 2.55, -11.68, 0)
  exitSign(z, -11.55, 2.3, 0.88, Math.PI)
  stairLights(z, 0)

  // reception desk with the spare-key drawer (east side, behind the counter)
  b.box('darkWood', 3.2, 0, -5.6, 3.8, 1.0, -3.2)
  b.box('lightWood', 3.1, 1.0, -5.7, 3.9, 1.05, -3.1, { collide: false })
  b.box('darkWood', 3.8, 0.7, -5.6, 4.4, 0.75, -3.2, { collide: false }) // desk shelf behind (visual)
  P.photo(z, { id: 'photo-lobby', x: 3.45, y: 1.05, z: -5.25, rot: 0.4 })
  P.doc(z, {
    id: 'doc-keylog', x: 3.5, y: 1.05, z: -3.7, rot: -0.2, title: 'Spare key log',
    text: `RIVERSIDE APARTMENTS — SPARE KEY LOG\n\n601 — returned 3/2\n604 — returned 3/9\n703 — Mr. Hale. Do NOT give to anyone. He says he hears the walls at night.\n      Kept in the desk drawer, left side.\n802 — lost\n\n(written underneath, in a shakier hand:)\nWhoever reads this — he never came back down. Go up and check on him. Please.`,
  })
  P.drawer(z, {
    id: 'drawer-desk', x: 3.8 + 0.0125, y: 0.86, z: -4.4, w: 0.55, h: 0.18, d: 0.5, facing: '+x', name: 'desk drawer',
    fill: (grp, p) => P.key(z, { id: 'key703', x: p.x, y: p.y, z: p.z, parent: grp, name: 'key to Apartment 703' }),
  })
  P.chair(z, { x: 2.3, z: -11.35, facing: '+z' })
  // mailboxes on the west wall
  b.box('brass', -3.9, 0.8, -6.8, -3.62, 2.0, -4.4)
  for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++)
    b.box('darkWood', -3.63, 0.85 + r * 0.23, -6.75 + c * 0.29, -3.61, 1.03 + r * 0.23, -6.5 + c * 0.29, { collide: false })
  // notice board + notice
  b.box('cardboard', -3.9, 1.2, -3.6, -3.86, 1.9, -2.6)
  P.doc(z, {
    id: 'doc-notice', x: -3.855, y: 1.55, z: -3.1, rot: Math.PI / 2, standing: true, title: 'Notice to residents',
    text: `NOTICE TO ALL RESIDENTS\n\nDue to repeated electrical faults the building has been switched to emergency power.\n\n• The ELEVATOR is out of service until the breaker in the maintenance room (ground floor, west corridor) is reset.\n• Floor 7 has been isolated. Please do not reset the FLOOR 7 breaker.\n• Residents of 703 — your rent is overdue.\n\n— The Management`,
  })
  P.plant(z, -3.4, -11.25); P.plant(z, 4.45, -11.25); P.plant(z, -3.4, -7.4); P.plant(z, 4.45, -7.4)
  P.rug(z, { x0: -0.6, z0: -11.6, x1: 1.6, z1: -5.6, mat: 'fabricRed' })
  // waiting area in the deeper lobby
  P.sofa(z, { x0: -3.6, z0: -10.2, x1: -2.7, z1: -8.2, facing: '+x', mat: 'fabricRed' })
  P.sofa(z, { x0: 3.7, z0: -10.2, x1: 4.6, z1: -8.2, facing: '-x', mat: 'fabricRed' })
  P.ceilingLamp(z, { id: 'lobby-3', x: 0.5, y: CEIL_H, z: -9.4, circuit: 'lobby', intensity: 6, range: 8, flicker: 0.15, style: 'panel' })
  // bench
  b.box('darkWood', -2.8, 0, -2.2, -1.0, 0.45, -1.75)

  // maintenance room (unit 101 position)
  b.box('breaker', -9.1, 0.85, -1.26, -7.7, 2.0, -1.1)
  const circuits = [['brk-lobby', 'lobby', 'LOBBY'], ['brk-stairs', 'stairs', 'STAIRS'], ['brk-elevator', 'elevator', 'ELEVATOR'], ['brk-f7', 'f7', 'FLOOR 7']]
  circuits.forEach(([id, c, label], i) => P.breaker(z, { id, circuit: c, x: -8.88 + i * 0.3, y: 1.45, z: -1.26, facing: '-z', label }))
  P.doc(z, {
    id: 'doc-maint', x: -11.6, y: 0.9, z: -11.3, rot: 0.15, title: 'Maintenance log',
    text: `MAINTENANCE LOG — R. Pike\n\nMon: Elevator tripped the breaker again. Reset it. Smell of burning hair in the shaft?\nWed: Tenants on 7 complaining about knocking inside the walls. Checked 703's pipes from the corridor. Nothing.\nThu: Management told me to cut power to floor 7 "until further notice."\nFri: Hale's lights came on by themselves. The breaker was OFF.\n\nBreakers: LOBBY / STAIRS / ELEVATOR / FLOOR 7.\nI'm not going up there again.`,
  })
  b.box('darkWood', -12.9, 0, -11.7, -10.6, 0.9, -11.0) // workbench
  z.fixture(new Fixture({ id: 'worklamp', pos: new THREE.Vector3(-11.0, 1.2, -11.35), color: 0xffd090, intensity: 1.4, range: 4.5, flicker: 0.4 }))
  b.boxC('steel', -11.0, -11.35, 0.12, 0.12, 0.9, 1.1, { collide: false })
  b.box('steel', -8.6, 0, -11.7, -6.6, 2.0, -11.25) // shelving
  for (let s = 0; s < 4; s++) b.box('steel', -8.6, 0.4 + s * 0.5, -11.75, -6.6, 0.43 + s * 0.5, -11.2, { collide: false })
  P.photo(z, { id: 'photo-maint', x: -7.3, y: 0.93, z: -11.12, rot: -0.3 })
  b.boxC('steel', -13.1, -2.0, 0.7, 0.7, 0, 1.6) // water heater
  P.boxes(z, -12.8, -9.0, 3); P.boxes(z, -6.0, -10.5, 2); P.boxes(z, -12.6, -10.2, 2); P.boxes(z, -9.5, -6.0, 2)
  b.box('red', -5.2, 0, -11.6, -4.7, 0.35, -11.1) // mop bucket
}

function buildFloorDecor(z, k) {
  const b = z.b, y = k * FLOOR_H
  const f7 = k === APT_K
  const circuit = f7 ? 'f7' : k === HOME_K ? 'f8' : (k % 2 ? null : 'dead')
  corridorLamps(z, k, circuit, i => (f7 ? (i % 2 ? 0.7 : 0.25) : (circuit ? 0.9 : 0)))
  stairLights(z, k)
  exitSign(z, -11.55, y + 2.3, 0.88, Math.PI)
  // floor number opposite the elevator
  const t = textTexture(`FLOOR ${floorLabel(k)}`, { w: 256, h: 96, font: 'bold 54px Arial', bg: '#2a2a26', fg: '#d6cfb4' })
  const m = P.mesh(z, new THREE.PlaneGeometry(0.7, 0.26), new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 }), -9.4, y + 1.65, -0.895)
  m.castShadow = false
  z.own(t)
  // radiators + clutter
  const r = z.rng
  for (const x of [-7.6, 3.4, 9.8]) {
    const yy = y
    b.box('metal', x, yy + 0.12, -0.9, x + 0.9, yy + 0.7, -0.8)
  }
  const clutter = Math.floor(r() * 3) + 1
  for (let i = 0; i < clutter; i++) {
    const x = -6 + r() * 18
    const zz = r() < 0.5 ? -0.62 : 0.62
    // keep every doorway (apartments, elevator, stairs) and the radiators clear
    const keepClear = [...Object.values(DOORS_N), ...Object.values(DOORS_S), ELEV_DOOR, STAIR.door, [-7.6, -6.7], [3.4, 4.3], [9.8, 10.7]]
    if (keepClear.some(([a, b2]) => x > a - 0.9 && x < b2 + 0.9)) continue
    b.boxC('blackPlastic', x, zz, 0.45, 0.4, y, y + 0.5) // bin bag
  }
  if (f7) {
    P.photo(z, { id: 'photo-f7', x: 6.8, y: y + 0.0, z: -0.5, rot: 1.1 })
    b.box('fabricRed', 6.0, y + 0.001, -0.85, 6.9, y + 0.006, 0.2, { collide: false, shadow: false }) // stain trailing under 703
    z.lift(y, () => P.chair(z, { x: 11.9, z: 0.4, facing: '-z' }))
  }
}

// ---------------------------------------------------------------------------------
// Luxury apartments 703 (floor 7, the story) and 803 (floor 8, the player's home).
// Both use the same ≈186 m² plan (see APT); `home` switches ids, lights and story items.
function furnishLuxury(z, k, home) {
  const b = z.b
  const y = k * FLOOR_H, yc = y + CEIL_H
  const circuit = home ? 'f8' : 'f7'
  const sw = n => (home ? 'sw8-' : 'sw-') + n
  const I = n => (home ? 'home-' : '') + n
  const L = (id, x, zz, opts) => P.ceilingLamp(z, { id: (home ? 'home-' : 'apt-') + id, x, y: yc, z: zz, circuit, switchId: sw(opts.sw), ...opts })
  // chandeliers / ceiling lights per room
  L('living', -1.2, -8.2, { sw: 'living', intensity: 24, range: 11 })
  L('dining', 2.7, -10.1, { sw: 'living', intensity: 16, range: 9, flicker: 0.1 })
  L('kitchen', -0.6, -2.9, { sw: 'kitchen', intensity: 18, range: 9, style: 'panel', flicker: 0.2 })
  L('hall', 6.6, -3.4, { sw: 'hall', intensity: 11, range: 8 })
  L('bedroom', 9.5, -8.8, { sw: 'bedroom', intensity: 22, range: 10, flicker: 0.1 })
  L('bath', 11.4, -3.5, { sw: 'bath', intensity: 13, range: 8, flicker: 0.35 })
  P.lightSwitch(z, { id: sw('living'), circuit, x: 4.94, z: -6.3, y: y + 1.25, facing: '-x', label: 'living room lights' })
  P.lightSwitch(z, { id: sw('kitchen'), circuit, x: 3.94, z: -1.4, y: y + 1.25, facing: '-x', label: 'kitchen light' })
  P.lightSwitch(z, { id: sw('hall'), circuit, x: 6.75, z: -1.1, y: y + 1.25, facing: '-z', label: 'hall light' })
  P.lightSwitch(z, { id: sw('bedroom'), circuit, x: 7.66, z: -6.06, y: y + 1.25, facing: '-z', label: 'bedroom light' })
  P.lightSwitch(z, { id: sw('bath'), circuit, x: 11.25, z: -5.94, y: y + 1.25, facing: '+z', label: 'bathroom light' })
  if (home) z.fixture(new Fixture({ id: 'home-batterylamp', pos: new THREE.Vector3(8.15, y + 0.95, -11.3), color: 0xffc888, intensity: 4, range: 7, flicker: 0.25 }))

  z.lift(y, () => {
    // ---------------- living + dining (x -3.9…4.94, z -11.7…-4.66) ----------------
    b.box('darkWood', -3.88, 0, -9.7, -3.4, 0.5, -6.9) // media console
    b.box('screen', -3.86, 0.95, -9.3, -3.8, 2.0, -7.3, { collide: false }) // wall TV
    P.sofa(z, { x0: -0.6, z0: -9.9, x1: 0.4, z1: -6.7, facing: '-x', mat: 'velvet' })
    P.sofa(z, { x0: -2.4, z0: -10.9, x1: -0.6, z1: -9.9, facing: '+z', mat: 'velvet' })
    P.table(z, { x0: -2.5, z0: -8.9, x1: -1.4, z1: -7.6, h: 0.42, mat: 'piano' })
    if (!home) P.doc(z, {
      id: 'doc-diary1', x: -1.95, y: 0.422, z: -8.25, rot: 1.3, title: 'Diary — page 41',
      text: `Day 41.\n\nThe knocking moved from the bedroom wall to the bathroom tonight. Three knocks, then counting. It always stops at seven.\n\nI taped the photographs into the drawers so I'd remember what this place looked like before. If you're reading this, collect them. Show someone. Prove it was real.`,
    })
    P.rug(z, { x0: -3.0, z0: -10.4, x1: 0.2, z1: -6.2, mat: home ? 'blanket' : 'fabricRed' })
    // dining for six under the window
    P.table(z, { x0: 1.6, z0: -10.7, x1: 3.8, z1: -9.7, h: 0.76, mat: 'darkWood' })
    for (const x of [2.0, 2.7, 3.4]) { P.chair(z, { x, z: -11.1, facing: '+z' }); P.chair(z, { x, z: -9.3, facing: '-z' }) }
    b.boxC('gold', 2.7, -10.2, 0.25, 0.25, 0.76, 0.8, { collide: false }) // candelabra base
    b.boxC('ceramic', 2.7, -10.2, 0.05, 0.05, 0.8, 1.05, { collide: false })
    // grand piano
    b.box('piano', 1.8, 0.62, -8.0, 3.4, 0.95, -6.4, { collide: false })
    b.box('piano', 1.8, 0.95, -8.0, 3.4, 0.97, -6.9, { collide: false })
    b.box('ceramic', 1.8, 0.75, -6.55, 3.4, 0.79, -6.4, { collide: false }) // keys
    for (const [x, zz] of [[1.95, -7.85], [3.25, -7.85], [2.6, -6.55]]) b.boxC('piano', x, zz, 0.1, 0.1, 0, 0.62, { collide: false })
    b.collider(1.8, 0, -8.0, 3.4, 1.0, -6.4)
    b.box('piano', 2.3, 0, -6.15, 2.9, 0.5, -5.85) // bench
    P.bookshelf(z, { x0: 4.5, z0: -10.6, x1: 4.92, z1: -8.4, facing: '-x' })
    P.plant(z, -3.45, -11.25); P.plant(z, 4.5, -11.25); P.plant(z, -3.45, -5.1)
    if (home) { P.boxes(z, 0.9, -11.2, 3); P.boxes(z, -3.2, -6.2, 2) }

    // ---------------- kitchen (x -3.9…3.94, z -4.54…-1.1) ----------------
    const front = -1.72
    b.box('appliance', -3.9, 0, -1.85, -3.0, 2.0, -1.1) // tall fridge
    P.cabinetDoor(z, { id: I('fridge'), hx: -3.01, hz: -1.862, y0: 0.05, h: 1.9, w: 0.88, facing: '-z', extend: 'x-', mat: 'appliance', name: 'fridge', open: 1.7 })
    b.box('appliance', -3.82, 0.6, -1.8, -3.08, 0.62, -1.2, { collide: false })
    b.box('appliance', -3.82, 1.2, -1.8, -3.08, 1.22, -1.2, { collide: false })
    b.box('darkWood', -3.0, 0, front, 1.8, 0.88, -1.1)
    b.box('marble', -3.0, 0.88, front - 0.03, 1.8, 0.92, -1.1, { collide: false })
    b.box('marbleWall', -3.0, 0.92, -1.12, 1.8, 1.5, -1.1, { collide: false })
    b.box('steel', -0.4, 0.92, -1.62, 0.4, 0.925, -1.22, { collide: false }) // sink
    b.box('steel', -0.03, 0.92, -1.2, 0.03, 1.25, -1.14, { collide: false })
    for (const [cx, cz] of [[0.9, -1.3], [1.3, -1.3], [0.9, -1.55], [1.3, -1.55]]) b.boxC('blackPlastic', cx, cz, 0.22, 0.2, 0.92, 0.925, { collide: false })
    P.drawer(z, { id: I('drawer-kitchen-1'), x: -2.5, y: 0.78, z: front - 0.0125, w: 0.8, h: 0.15, d: 0.55, facing: '-z', name: 'kitchen drawer',
      fill: home ? null : (grp, p) => P.photo(z, { id: 'photo-kitchen', x: p.x, y: p.y, z: p.z, parent: grp, rot: 0.2 }) })
    P.drawer(z, { id: I('drawer-kitchen-2'), x: -1.6, y: 0.78, z: front - 0.0125, w: 0.8, h: 0.15, d: 0.55, facing: '-z', name: 'kitchen drawer' })
    P.cabinetDoor(z, { id: I('cab-k1'), hx: -2.98, hz: front - 0.012, y0: 0.08, h: 0.6, w: 0.85, facing: '-z', extend: 'x+', name: 'cupboard' })
    P.cabinetDoor(z, { id: I('cab-k2'), hx: 1.78, hz: front - 0.012, y0: 0.08, h: 0.6, w: 0.85, facing: '-z', extend: 'x-', name: 'cupboard' })
    b.box('darkWood', -3.0, 1.55, -1.45, 1.8, 2.25, -1.1, { collide: false }) // wall cabinets
    P.cabinetDoor(z, { id: I('cab-k3'), hx: -2.99, hz: -1.462, y0: 1.57, h: 0.66, w: 0.9, facing: '-z', extend: 'x+', name: 'wall cabinet' })
    P.cabinetDoor(z, { id: I('cab-k4'), hx: 1.79, hz: -1.462, y0: 1.57, h: 0.66, w: 0.9, facing: '-z', extend: 'x-', name: 'wall cabinet' })
    // island with stools
    b.box('darkWood', -2.2, 0, -3.3, 1.0, 0.88, -2.6)
    b.box('marble', -2.3, 0.88, -3.4, 1.1, 0.93, -2.5, { collide: false })
    for (const x of [-1.6, -0.6, 0.4]) { b.boxC('steel', x, -3.75, 0.36, 0.36, 0.66, 0.7, { collide: false }); b.boxC('steel', x, -3.75, 0.05, 0.05, 0, 0.66, { collide: false }); b.collider(x - 0.18, 0, -3.93, x + 0.18, 0.7, -3.57) }
    b.boxC('ceramic', 0.6, -2.95, 0.3, 0.3, 0.93, 1.0, { collide: false }) // fruit bowl
    if (!home) P.doc(z, {
      id: 'doc-letter', x: -1.0, y: 0.932, z: -2.95, rot: 0.3, title: 'Final notice',
      text: `FINAL NOTICE — APARTMENT 703 (PENTHOUSE LEVEL)\n\nMr. D. Hale,\n\nDespite repeated requests you have not allowed maintenance access to your apartment. Neighbours report persistent knocking and a voice "counting" through the walls between 2 and 4 a.m.\n\nIf you do not respond within 7 days the management will enter the premises.\n\n(Scrawled across the bottom in pencil:) THEY ALREADY CAME IN. THEY NEVER LEFT.`,
    })
    b.boxC('blackPlastic', 3.6, -1.45, 0.35, 0.35, 0, 0.6) // bin

    // ---------------- entry foyer + gallery (x 4.06…8.94, z -5.94…-1.1) ----------------
    b.box('darkWood', 8.5, 0, -4.4, 8.93, 0.85, -3.0) // console table
    b.box('mirror', 8.92, 1.1, -4.2, 8.935, 2.1, -3.2, { collide: false })
    b.box('gold', 8.9, 1.05, -4.25, 8.94, 2.15, -3.15, { collide: false })
    b.boxC('ceramic', 8.7, -3.3, 0.18, 0.18, 0.85, 1.2, { collide: false }) // vase
    b.boxC('darkWood', 8.6, -1.5, 0.05, 0.05, 0, 1.8, { collide: false }) // coat stand
    b.collider(8.45, 0, -1.65, 8.75, 1.8, -1.35)
    P.rug(z, { x0: 5.0, z0: -5.6, x1: 8.2, z1: -2.2, mat: 'velvet' })
    if (home) P.doc(z, {
      id: 'doc-home-note', x: 6.9, y: 0.002, z: -1.5, rot: 0.6, title: 'Note slipped under your door',
      text: `To the new tenant in 803,\n\nPlease stop walking around at night. Every time you do, the knocking in 703 starts again, right below you.\n\nIf you ever go down there: the breakers are in the maintenance room by the lobby. DON'T turn on floor 7.\n\n— your neighbour in 805`,
    })

    // ---------------- master bedroom (x 5.06…13.7, z -11.7…-6.06) ----------------
    P.bed(z, { x0: 8.5, z0: -11.69, x1: 10.5, z1: -9.4, head: '-z' })
    b.box('velvet', 8.4, 0.3, -11.69, 10.6, 1.45, -11.6, { collide: false }) // tall upholstered headboard
    P.nightstand(z, { id: I('drawer-night-1'), x0: 7.85, z0: -11.69, x1: 8.4, z1: -11.2, facing: '+z',
      fill: home ? null : (grp, p) => P.photo(z, { id: 'photo-bedroom', x: p.x, y: p.y, z: p.z, parent: grp, rot: -0.3 }) })
    P.nightstand(z, { id: I('drawer-night-2'), x0: 10.6, z0: -11.69, x1: 11.15, z1: -11.2, facing: '+z' })
    b.boxC('gold', 8.12, -11.5, 0.14, 0.14, 0.55, 0.75, { collide: false }) // lamps
    b.boxC('gold', 10.88, -11.5, 0.14, 0.14, 0.55, 0.75, { collide: false })
    if (home) {
      b.boxC('emissive', 8.12, -11.5, 0.1, 0.1, 0.75, 0.82, { collide: false, shadow: false })
      P.doc(z, {
        id: 'doc-home-phone', x: 8.15, y: 0.552, z: -11.3, rot: 0.3, w: 0.08, d: 0.15, title: 'Your phone',
        text: `11:52 PM — 0% battery.\n\nLast message, from an unknown number, 11:47 PM:\n\n"803. You can hear it too, can't you. The counting. It's coming up from 703.\nThe lifts are dead. Take the stairs.\nThe manager left Hale's spare key in the front desk. Find out what he did."`,
      })
    }
    // wardrobe wall between the two doors (front faces -z)
    b.box('darkWood', 7.75, 0, -6.66, 9.95, 2.3, -6.07)
    b.box('fabricRed', 8.2, 0.9, -6.5, 8.35, 1.8, -6.2, { collide: false })
    P.cabinetDoor(z, { id: I('wardrobe-l'), hx: 7.76, hz: -6.672, y0: 0.04, h: 2.22, w: 1.09, facing: '-z', extend: 'x+', name: 'wardrobe' })
    P.cabinetDoor(z, { id: I('wardrobe-r'), hx: 9.94, hz: -6.672, y0: 0.04, h: 2.22, w: 1.09, facing: '-z', extend: 'x-', name: 'wardrobe' })
    // writing desk on the west wall
    b.box('darkWood', 5.08, 0.72, -10.5, 5.75, 0.76, -9.0, { collide: false })
    b.box('darkWood', 5.08, 0, -10.5, 5.75, 0.72, -10.4, { collide: false })
    b.box('darkWood', 5.08, 0, -9.1, 5.75, 0.72, -9.0, { collide: false })
    b.collider(5.08, 0, -10.5, 5.75, 0.76, -9.0)
    P.drawer(z, { id: I('drawer-desk-bed'), x: 5.75 + 0.0125, y: 0.62, z: -9.4, w: 0.4, h: 0.14, d: 0.55, facing: '+x', name: 'desk drawer' })
    P.chair(z, { x: 6.1, z: -9.85, facing: '-x' })
    if (!home) P.doc(z, {
      id: 'doc-diary2', x: 5.4, y: 0.762, z: -10.1, rot: -0.2, title: 'Diary — last page',
      text: `I counted with it tonight. One... two... three...\n\nAt seven the bathroom mirror fogged from the inside.\n\nThere is a door behind the mirror that wasn't there when I moved in. It's very small. Something is pressing on it.\n\nIf I'm gone: the roof. I left the last of it on the roof, by the water tank, where the counting can't reach.`,
    })
    // reading corner
    P.sofa(z, { x0: 12.6, z0: -7.9, x1: 13.6, z1: -6.9, facing: '-x', mat: 'velvet' })
    b.boxC('steel', 13.3, -8.5, 0.06, 0.06, 0, 1.6, { collide: false })
    b.boxC('fabric', 13.3, -8.5, 0.36, 0.36, 1.5, 1.8, { collide: false })
    b.collider(13.15, 0, -8.65, 13.45, 1.8, -8.35)
    P.rug(z, { x0: 7.8, z0: -9.3, x1: 11.4, z1: -7.2, mat: home ? 'blanket' : 'rug' })
    P.plant(z, 13.35, -11.3)
    if (home) P.boxes(z, 6.0, -11.2, 2)

    // ---------------- en-suite bathroom (x 9.06…13.7, z -5.94…-1.1) ----------------
    // freestanding tub under the window
    b.box('ceramic', 12.0, 0, -4.8, 13.6, 0.6, -3.9)
    b.box('screen', 12.1, 0.45, -4.7, 13.5, 0.602, -4.0, { collide: false })
    for (const [x, zz] of [[12.1, -4.7], [13.5, -4.7], [12.1, -4.0], [13.5, -4.0]]) b.boxC('gold', x, zz, 0.06, 0.06, 0, 0.08, { collide: false })
    // double vanity on the west wall, front faces +x
    b.box('darkWood', 9.06, 0, -4.6, 9.66, 0.82, -2.6)
    b.box('marble', 9.06, 0.82, -4.65, 9.72, 0.87, -2.55, { collide: false })
    for (const zz of [-4.05, -3.15]) b.boxC('ceramic', 9.35, zz, 0.36, 0.4, 0.87, 0.9, { collide: false })
    P.cabinetDoor(z, { id: I('cab-vanity'), hx: 9.672, hz: -4.58, y0: 0.06, h: 0.7, w: 0.96, facing: '+x', extend: 'z+', name: 'vanity cabinet' })
    b.box('darkWood', 9.06, 1.3, -4.0, 9.22, 1.95, -3.2, { collide: false }) // mirror cabinet body
    P.cabinetDoor(z, { id: I('cab-mirror'), hx: 9.232, hz: -4.0, y0: 1.31, h: 0.63, w: 0.8, facing: '+x', extend: 'z+', mat: 'mirror', name: 'mirror cabinet', open: 1.6 })
    if (!home) {
      P.photo(z, { id: 'photo-bath', x: 9.15, y: 1.52, z: -3.6, rot: 0 })
      P.doc(z, {
        id: 'doc-bath', x: 9.45, y: 0.872, z: -2.85, rot: 0.1, title: 'Note on the sink',
        text: `7\n7\n7\n7\n7\n7\n7\n\nIT'S IN THE WALLS NOW\nDON'T COUNT\nDON'T COUNT\nDON'T`,
      })
    }
    // walk-in shower (glass, solid)
    b.box('marble', 9.06, 0, -2.3, 10.4, 0.04, -1.1, { collide: false })
    b.box('glass', 10.36, 0, -2.3, 10.4, 2.1, -1.1)
    b.box('glass', 9.06, 0, -2.34, 9.8, 2.1, -2.3)
    b.box('steel', 9.5, 2.0, -1.8, 9.8, 2.03, -1.5, { collide: false }) // rain head
    // toilet
    b.boxC('ceramic', 12.5, -1.45, 0.42, 0.6, 0, 0.42)
    b.boxC('ceramic', 12.5, -1.18, 0.42, 0.16, 0.42, 0.8)
    b.box('gold', 11.3, 1.0, -1.13, 11.9, 1.03, -1.1, { collide: false }) // towel rail
    b.box('frame', 11.35, 0.6, -1.15, 11.85, 1.0, -1.12, { collide: false })
    P.plant(z, 13.35, -1.45)
  })
}

function buildApartment(z) { furnishLuxury(z, APT_K, false) }
function buildHome(z) { furnishLuxury(z, HOME_K, true) }

function buildRoofProps(z) {
  const b = z.b, y = ROOF_Y
  z.fixture(new Fixture({ id: 'roof-door-lamp', pos: new THREE.Vector3(-11.55, y + 2.5, 0.6), color: 0xffd8a0, intensity: 3, range: 7, flicker: 0.3 }))
  b.boxC('steel', -11.55, 0.8, 0.3, 0.2, y + 2.4, y + 2.6, { collide: false })
  z.lift(y, () => {
    // water tank on legs
    b.box('metal', 4.0, 0, 2.0, 7.0, 0.9, 5.0)
    b.box('darkWood', 4.1, 0.9, 2.1, 6.9, 3.2, 4.9)
    b.box('darkWood', 3.95, 3.2, 1.95, 7.05, 3.35, 5.05, { collide: false })
    // AC units / vents
    b.box('metal', -2, 0, -5, -0.4, 1.1, -3.6)
    b.box('metal', 1.5, 0, -5.5, 3.1, 1.1, -4.1)
    b.box('metal', 9, 0, 4, 10.4, 1.0, 5.6)
    b.boxC('steel', 11, -6, 0.3, 0.3, 0, 1.4)
    b.boxC('steel', -5, 5, 0.25, 0.25, 0, 1.2)
    b.boxC('steel', 12.5, 6.5, 0.12, 0.12, 0, 6, { collide: false }) // antenna
    b.boxC('steel', 12.5, 6.5, 0.4, 0.4, 0, 0.3)
    P.photo(z, { id: 'photo-roof', x: 5.5, y: 0.9, z: 1.75 })
    P.doc(z, {
      id: 'doc-roof', x: 4.6, y: 0.905, z: 1.8, rot: 0.4, title: 'The last page',
      text: `If you found this you came all the way up. Good. It can't climb stairs; it only knows the walls.\n\nI'm writing this to the next tenant of 703: don't let the management rent it again. Don't switch floor 7 back on.\n\nOh.\n\nYou already did, didn't you.\n\n                                   — D. Hale\n\n[END OF THE VERTICAL SLICE — thank you for exploring Riverside Apartments.]`,
    })
  })
}
