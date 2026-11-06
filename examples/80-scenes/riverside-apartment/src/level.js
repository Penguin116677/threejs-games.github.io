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
  return [[-12.5, -11.1], [-9, -7.6], [-6.4, -5.0], [-2.8, -1.4], [0.2, 1.6], [2.8, 4.2], [6.0, 7.4], [8.2, 9.6], [11.0, 12.6]]
    .map(([a, b]) => ({ a, b, lo: 0.9, hi: 2.3 }))
}
const SOUTH_WINDOWS = [[-13.2, -11.2, 2.0, 2.8], [-6.5, -5.1], [-3, -1.6], [0.5, 1.9], [4.5, 5.9], [8, 9.4], [11.2, 12.6]]
  .map(([a, b, lo = 0.9, hi = 2.3]) => ({ a, b, lo, hi }))
const EAST_WINDOWS = [[-6.5, -5.1], [-3.0, -2.2, 1.5, 2.1], [-0.6, 0.6], [3, 4.4], [5.5, 6.9]]
  .map(([a, b, lo = 0.9, hi = 2.3]) => ({ a, b, lo, hi }))
const WEST_WINDOWS = [[-6.3, -4.9], [-3.5, -2.1], [-0.6, 0.6]].map(([a, b]) => ({ a, b, lo: 0.9, hi: 2.3 }))

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
  b.wall(k === 0 ? 'lobbyPaint' : 'wallpaper', 'x', B.x0 + 0.1, B.x1 - 0.1, B.z0 + 0.1, IN.z0, y, y1, nOpen)
  for (const w of nw) b.window('x', w.a, w.b, B.z0, IN.z0, y, w.lo, w.hi, { inside: 1 })
  // south
  b.wall('brick', 'x', B.x0, B.x1, B.z1 - 0.1, B.z1, y, y1, SOUTH_WINDOWS)
  b.wall([[STAIR.x1 + 0.1, 'stairPaint'], [SHAFT.x1 + 0.2, 'concrete'], [20, unit]], 'x', B.x0 + 0.1, B.x1 - 0.1, IN.z1, B.z1 - 0.1, y, y1, SOUTH_WINDOWS)
  for (const w of SOUTH_WINDOWS) b.window('x', w.a, w.b, IN.z1, B.z1, y, w.lo, w.hi, { inside: -1 })
  // east
  const eastIn = hasApartment(k) ? [[-3.9, 'wallpaper'], [-1.0, 'wallTile'], [1.0, corr], [20, 'wallpaper']] : [[-1.0, unit], [1.0, corr], [20, unit]]
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
    : Object.values(DOORS_N).map(([a, b2]) => ({ a, b: b2, hi: DOOR_H }))
  const aptSide = hasApartment(k) ? [[-3.9, unit], [5, unit], [10, 'kitchenPaint'], [11.6, 'wallpaper'], [20, 'wallTile']]
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
  for (const xc of [-4, 5]) {
    let west = unit, east = unit
    if (k === 0) { west = xc === -4 ? 'utilityPaint' : 'lobbyPaint'; east = xc === -4 ? 'lobbyPaint' : 'utilityPaint' }
    if (hasApartment(k) && xc === 5) east = [[-3.6, 'wallpaper'], [-1.1, 'kitchenPaint']]
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

function apartmentWalls(b, k) {
  const y = k * FLOOR_H, yc = y + CEIL_H
  // A: living | kitchen, wide arch
  b.wall2('wallpaper', 'kitchenPaint', 'x', APT.x0, 9.94, -3.66, -3.54, y, yc, [{ a: 7.4, b: 9.4, hi: 2.3 }])
  // B: west rooms | east rooms, door to the hall
  b.wall2([[-3.6, 'wallpaper'], [-1.1, 'kitchenPaint']], 'wallpaper', 'z', APT.z0, -1.1, 9.94, 10.06, y, yc, [{ a: -2.6, b: -1.75, hi: INNER_DOOR_H }])
  // C: bedroom | hall + bathroom
  b.wall2('wallpaper', [[11.6, 'wallpaper'], [20, 'wallTile']], 'x', 10.06, APT.x1, -3.96, -3.84, y, yc, [{ a: 10.3, b: 11.1, hi: INNER_DOOR_H }])
  // D: hall | bathroom
  b.wall2('wallpaper', 'wallTile', 'z', -3.84, -1.1, 11.54, 11.66, y, yc, [{ a: -2.75, b: -1.95, hi: INNER_DOOR_H }])
  b.doorTrim('z', -2.6, -1.75, 9.94, 10.06, y, INNER_DOOR_H)
  b.doorTrim('x', 10.3, 11.1, -3.96, -3.84, y, INNER_DOOR_H)
  b.doorTrim('z', -2.75, -1.95, 11.54, 11.66, y, INNER_DOOR_H)
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
    for (const [a, b2] of Object.values(DOORS_N)) f.push(['carpet', a, -1.1, b2, -0.9])
  }
  for (const [a, b2] of Object.values(DOORS_S)) f.push(['carpet', a, 0.9, b2, 1.1])
  f.push([k === 0 ? 'lobbyFloor' : 'carpet', ELEV_DOOR[0], 0.9, ELEV_DOOR[1], 1.1])
  f.push(['stairConcrete', S.door[0], 0.9, S.door[1], 1.1])
  if (hasApartment(k)) {
    const A = APT
    f.push(['floorTile', A.kitchen.x0, A.kitchen.z0 - 0.06, A.kitchen.x1, A.kitchen.z1])
    f.push(['wood', A.living.x0, A.living.z0, A.living.x1, A.living.z1 + 0.06])
    f.push(['wood', A.hall.x0 - 0.06, A.hall.z0, A.hall.x1, A.hall.z1])
    f.push(['wood', A.bedroom.x0, A.bedroom.z0, A.bedroom.x1, A.bedroom.z1 + 0.12])
    f.push(['floorTile', A.bathroom.x0 - 0.06, A.bathroom.z0, A.bathroom.x1, A.bathroom.z1])
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
    if (k === 0 && u === '02') continue // the lobby is an open archway on the ground floor
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
  const add = o => game.addDoor(new HingedDoor(game, { mat: 'doorPaint', height: INNER_DOOR_H - 0.01, ...o }))
  add({ id: `door-${n}-hall`, hinge: { x: 10.0, y, z: -1.75 }, dir: 'z-', width: 0.85, name: 'hall door' })
  add({ id: `door-${n}-bedroom`, hinge: { x: 10.3, y, z: -3.9 }, dir: 'x+', width: 0.8, name: 'bedroom door' })
  add({ id: `door-${n}-bath`, hinge: { x: 11.6, y, z: -2.75 }, dir: 'z+', width: 0.8, name: 'bathroom door' })
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
      b.box('concrete', -1.4, 2.75, -9.6, 2.4, 2.95, B.z0, { collide: false })
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
  const STREET = { x0: MAP.x0, x1: MAP.x1, z0: -26, z1: -15.5 }
  b.rectMinus('paving', MAP.x0, MAP.z0, MAP.x1, MAP.z1, [B, STREET], -0.4, 0, { faces: { ny: false } })
  b.box('asphalt', STREET.x0, -0.55, STREET.z0, STREET.x1, -0.15, STREET.z1, { faces: { ny: false } })
  b.box('concrete', STREET.x0, -0.15, STREET.z1 - 0.15, STREET.x1, 0, STREET.z1, { collide: false })
  // road markings
  for (let x = MAP.x0 + 2; x < MAP.x1; x += 6) b.box('frame', x, -0.15, -20.85, x + 3, -0.145, -20.65, { collide: false, shadow: false })
  // map boundary: low walls + invisible barrier
  const wallH = 2.2
  for (const [x0, z0, x1, z1] of [[MAP.x0, MAP.z0, MAP.x1, MAP.z0 + 0.3], [MAP.x0, MAP.z1 - 0.3, MAP.x1, MAP.z1], [MAP.x0, MAP.z0, MAP.x0 + 0.3, MAP.z1], [MAP.x1 - 0.3, MAP.z0, MAP.x1, MAP.z1]]) {
    b.box('concrete', x0, -0.6, z0, x1, wallH, z1)
    b.collider(x0 - 1, wallH, z0 - 1, x1 + 1, 40, z1 + 1, { tag: 'bounds' })
  }
  b.collider(MAP.x0 - 2, -3, MAP.z0 - 2, MAP.x1 + 2, -2, MAP.z1 + 2, { tag: 'bounds' })
  // planters along the facade
  for (const [x0, x1] of [[-12, -3], [3.5, 12]]) {
    b.box('concrete', x0, 0, -9.4, x1, 0.45, -8.6)
    b.box('grass', x0 + 0.08, 0.45, -9.32, x1 - 0.08, 0.47, -8.68, { collide: false })
  }
  // trees in the planters
  for (const x of [-10, -5, 6, 10.5]) {
    b.boxC('bark', x, -9, 0.18, 0.18, 0.45, 3.2)
    b.boxC('tree', x, -9, 1.6, 1.6, 2.6, 4.2, { collide: false })
    b.boxC('tree', x + 0.2, -9.1, 1.1, 1.1, 4.2, 5.0, { collide: false })
  }
  // street lamps
  const lampAt = [[-20, -14.8, 0], [-6, -14.8, 0.6], [8, -14.8, 0], [22, -14.8, 0.2], [20, 2, 0]]
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
  b.box('carPaint', 4.2, -0.15 + 0.25, -18.2, 8.6, 0.95, -16.4)
  b.box('carPaint', 5.2, 0.95, -18.1, 7.6, 1.5, -16.5)
  b.box('glass', 5.25, 1.0, -18.12, 7.55, 1.45, -16.48, { collide: false })
  for (const [x, z] of [[4.9, -18.25], [7.9, -18.25], [4.9, -16.35], [7.9, -16.35]]) b.boxC('blackPlastic', x, z, 0.6, 0.2, -0.15, 0.45, { collide: false })
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
  z.fixture(new Fixture({ id: 'emerg-lobby', pos: new THREE.Vector3(0.5, 2.5, -7.4), color: 0xff5030, intensity: 1.6, range: 7 }))
  z.fixture(new Fixture({ id: 'emerg-cor', pos: new THREE.Vector3(-9.4, 2.5, 0.6), color: 0xff5030, intensity: 1.2, range: 6 }))
  exitSign(z, 0.5, 2.55, -7.68, 0)
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
  P.chair(z, { x: 2.3, z: -7.35, facing: '+z' })
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
  P.plant(z, -3.4, -7.25); P.plant(z, 4.45, -7.25)
  P.rug(z, { x0: -0.6, z0: -7.6, x1: 1.6, z1: -5.6, mat: 'fabricRed' })
  // bench
  b.box('darkWood', -2.8, 0, -2.2, -1.0, 0.45, -1.75)

  // maintenance room (unit 101 position)
  b.box('breaker', -9.1, 0.85, -1.26, -7.7, 2.0, -1.1)
  const circuits = [['brk-lobby', 'lobby', 'LOBBY'], ['brk-stairs', 'stairs', 'STAIRS'], ['brk-elevator', 'elevator', 'ELEVATOR'], ['brk-f7', 'f7', 'FLOOR 7']]
  circuits.forEach(([id, c, label], i) => P.breaker(z, { id, circuit: c, x: -8.88 + i * 0.3, y: 1.45, z: -1.26, facing: '-z', label }))
  P.doc(z, {
    id: 'doc-maint', x: -11.6, y: 0.9, z: -7.3, rot: 0.15, title: 'Maintenance log',
    text: `MAINTENANCE LOG — R. Pike\n\nMon: Elevator tripped the breaker again. Reset it. Smell of burning hair in the shaft?\nWed: Tenants on 7 complaining about knocking inside the walls. Checked 703's pipes from the corridor. Nothing.\nThu: Management told me to cut power to floor 7 "until further notice."\nFri: Hale's lights came on by themselves. The breaker was OFF.\n\nBreakers: LOBBY / STAIRS / ELEVATOR / FLOOR 7.\nI'm not going up there again.`,
  })
  b.box('darkWood', -12.9, 0, -7.7, -10.6, 0.9, -7.0) // workbench
  z.fixture(new Fixture({ id: 'worklamp', pos: new THREE.Vector3(-11.0, 1.2, -7.35), color: 0xffd090, intensity: 1.4, range: 4.5, flicker: 0.4 }))
  b.boxC('steel', -11.0, -7.35, 0.12, 0.12, 0.9, 1.1, { collide: false })
  b.box('steel', -8.6, 0, -7.7, -6.6, 2.0, -7.25) // shelving
  for (let s = 0; s < 4; s++) b.box('steel', -8.6, 0.4 + s * 0.5, -7.75, -6.6, 0.43 + s * 0.5, -7.2, { collide: false })
  P.photo(z, { id: 'photo-maint', x: -7.3, y: 0.93, z: -7.12, rot: -0.3 })
  b.boxC('steel', -13.1, -2.0, 0.7, 0.7, 0, 1.6) // water heater
  P.boxes(z, -12.8, -5.0, 3); P.boxes(z, -6.0, -6.5, 2); P.boxes(z, -12.6, -6.2, 2)
  b.box('red', -5.2, 0, -7.6, -4.7, 0.35, -7.1) // mop bucket
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

function buildApartment(z) {
  const b = z.b, g = z.game
  const y = APT_K * FLOOR_H, yc = y + CEIL_H
  // Furniture below is authored relative to the floor and lifted by y (z.lift).
  // lights
  P.ceilingLamp(z, { id: 'apt-living', x: 7.5, y: yc, z: -5.7, circuit: 'f7', switchId: 'sw-living', intensity: 9, range: 7.5 })
  P.ceilingLamp(z, { id: 'apt-kitchen', x: 7.6, y: yc, z: -2.3, circuit: 'f7', switchId: 'sw-kitchen', intensity: 7, range: 6.5, style: 'panel', flicker: 0.2 })
  P.ceilingLamp(z, { id: 'apt-hall', x: 10.8, y: yc, z: -2.5, circuit: 'f7', switchId: 'sw-hall', intensity: 4, range: 4.5 })
  P.ceilingLamp(z, { id: 'apt-bedroom', x: 11.9, y: yc, z: -5.8, circuit: 'f7', switchId: 'sw-bedroom', intensity: 8, range: 6.5, flicker: 0.1 })
  P.ceilingLamp(z, { id: 'apt-bath', x: 12.7, y: yc, z: -2.4, circuit: 'f7', switchId: 'sw-bath', intensity: 5, range: 4.5, flicker: 0.35 })
  P.lightSwitch(z, { id: 'sw-kitchen', circuit: 'f7', x: 6.6, z: -1.1, y: y + 1.25, facing: '-z', label: 'kitchen light' })
  P.lightSwitch(z, { id: 'sw-living', circuit: 'f7', x: 7.2, z: -3.66, y: y + 1.25, facing: '-z', label: 'living room light' })
  P.lightSwitch(z, { id: 'sw-hall', circuit: 'f7', x: 9.94, z: -1.45, y: y + 1.25, facing: '-x', label: 'hall light' })
  P.lightSwitch(z, { id: 'sw-bedroom', circuit: 'f7', x: 11.3, z: -3.96, y: y + 1.25, facing: '-z', label: 'bedroom light' })
  P.lightSwitch(z, { id: 'sw-bath', circuit: 'f7', x: 11.54, z: -1.6, y: y + 1.25, facing: '-x', label: 'bathroom light' })

  z.lift(y, () => {
    // ---------------- kitchen (x 5.1–9.94, z -3.54..-1.1) ----------------
    const kz0 = -3.54
    // fridge
    b.box('appliance', 5.12, 0, kz0, 5.8, 1.78, kz0 + 0.66)
    P.cabinetDoor(z, { id: 'fridge', hx: 5.13, hz: kz0 + 0.67, y0: 0.05, h: 1.7, w: 0.66, facing: '+z', extend: 'x+', mat: 'appliance', name: 'fridge', open: 1.7 })
    b.box('appliance', 5.18, 0.5, kz0 + 0.05, 5.74, 0.52, kz0 + 0.6, { collide: false }) // shelf
    b.box('appliance', 5.18, 1.0, kz0 + 0.05, 5.74, 1.02, kz0 + 0.6, { collide: false })
    b.boxC('fabricRed', 5.4, kz0 + 0.35, 0.12, 0.12, 1.02, 1.2, { collide: false }) // something wrapped in red paper
    // base cabinets with drawers + doors (front faces +z at z = kz0 + 0.6)
    const front = kz0 + 0.6
    b.box('darkWood', 5.8, 0, kz0, 7.4, 0.86, front)
    b.box('lightWood', 5.8, 0.86, kz0, 7.4, 0.9, front + 0.03, { collide: false }) // worktop
    b.box('wallTile', 5.8, 0.9, kz0, 7.4, 1.45, kz0 + 0.01, { collide: false }) // backsplash
    b.box('steel', 6.75, 0.9, kz0 + 0.1, 7.25, 0.905, kz0 + 0.5, { collide: false }) // sink
    b.box('steel', 6.95, 0.9, kz0 + 0.05, 7.0, 1.2, kz0 + 0.1, { collide: false }) // tap
    for (const [cx, cz] of [[6.05, kz0 + 0.18], [6.35, kz0 + 0.18], [6.05, kz0 + 0.45], [6.35, kz0 + 0.45]]) // hob
      b.boxC('blackPlastic', cx, cz, 0.2, 0.2, 0.9, 0.905, { collide: false })
    P.drawer(z, { id: 'drawer-kitchen-1', x: 6.2, y: 0.76, z: front + 0.0125, w: 0.76, h: 0.15, d: 0.55, facing: '+z', name: 'kitchen drawer',
      fill: (grp, p) => P.photo(z, { id: 'photo-kitchen', x: p.x, y: p.y, z: p.z, parent: grp, rot: 0.2 }) })
    P.drawer(z, { id: 'drawer-kitchen-2', x: 7.0, y: 0.76, z: front + 0.0125, w: 0.76, h: 0.15, d: 0.55, facing: '+z', name: 'kitchen drawer' })
    P.cabinetDoor(z, { id: 'cab-k1', hx: 5.82, hz: front + 0.012, y0: 0.08, h: 0.58, w: 0.78, facing: '+z', extend: 'x+', name: 'cupboard' })
    P.cabinetDoor(z, { id: 'cab-k2', hx: 7.38, hz: front + 0.012, y0: 0.08, h: 0.58, w: 0.78, facing: '+z', extend: 'x-', name: 'cupboard' })
    // wall cabinets above
    b.box('darkWood', 5.8, 1.5, kz0, 7.4, 2.2, kz0 + 0.33, { collide: false })
    P.cabinetDoor(z, { id: 'cab-k3', hx: 5.81, hz: kz0 + 0.34, y0: 1.52, h: 0.66, w: 0.79, facing: '+z', extend: 'x+', name: 'wall cabinet' })
    P.cabinetDoor(z, { id: 'cab-k4', hx: 7.39, hz: kz0 + 0.34, y0: 1.52, h: 0.66, w: 0.79, facing: '+z', extend: 'x-', name: 'wall cabinet' })
    P.doc(z, {
      id: 'doc-letter', x: 7.1, y: 0.905, z: kz0 + 0.4, rot: 0.3, title: 'Final notice',
      text: `FINAL NOTICE — APARTMENT 703\n\nMr. D. Hale,\n\nDespite repeated requests you have not allowed maintenance access to your apartment. Neighbours report persistent knocking and a voice "counting" through the walls between 2 and 4 a.m.\n\nIf you do not respond within 7 days the management will enter the premises.\n\n(Scrawled across the bottom in pencil:) THEY ALREADY CAME IN. THEY NEVER LEFT.`,
    })
    b.boxC('blackPlastic', 9.6, -1.5, 0.35, 0.35, 0, 0.6) // bin
    P.rug(z, { x0: 5.4, z0: -1.9, x1: 6.6, z1: -1.2, mat: 'fabric' })

    // ---------------- living room (x 5.1–9.94, z -7.7..-3.66) ----------------
    P.sofa(z, { x0: 9.0, z0: -6.6, x1: 9.92, z1: -4.6, facing: '-x' })
    P.table(z, { x0: 6.9, z0: -5.9, x1: 7.7, z1: -4.9, h: 0.45 })
    P.doc(z, {
      id: 'doc-diary1', x: 7.3, y: 0.452, z: -5.4, rot: 1.3, title: 'Diary — page 41',
      text: `Day 41.\n\nThe knocking moved from the bedroom wall to the bathroom tonight. Three knocks, then counting. It always stops at seven.\n\nI taped the photographs into the drawers so I'd remember what this place looked like before. If you're reading this, collect them. Show someone. Prove it was real.`,
    })
    b.box('darkWood', 5.12, 0, -5.9, 5.55, 0.5, -4.7) // TV stand
    b.box('blackPlastic', 5.15, 0.5, -5.55, 5.6, 0.95, -5.0) // CRT
    b.box('screen', 5.6, 0.55, -5.5, 5.61, 0.9, -5.05, { collide: false })
    P.bookshelf(z, { x0: 5.12, z0: -4.55, x1: 5.48, z1: -3.7, facing: '+x' })
    P.table(z, { x0: 6.1, z0: -7.55, x1: 7.5, z1: -6.75, h: 0.75 })
    P.chair(z, { x: 6.5, z: -6.45, facing: '-z' })
    P.chair(z, { x: 7.15, z: -6.45, facing: '-z' })
    P.rug(z, { x0: 6.5, z0: -6.3, x1: 8.5, z1: -4.5 })
    // floor lamp (part of the living-room circuit)
    b.boxC('steel', 9.7, -7.45, 0.06, 0.06, 0, 1.55, { collide: false })
    b.boxC('fabric', 9.7, -7.45, 0.36, 0.36, 1.45, 1.75, { collide: false })
    b.collider(9.55, 0, -7.6, 9.85, 1.75, -7.3)
    P.plant(z, 5.4, -7.35)
    b.box('metal', 8.25, 0.12, -7.7, 9.55, 0.7, -7.6) // radiator

    // ---------------- hall ----------------
    b.boxC('darkWood', 11.3, -1.3, 0.35, 0.3, 0, 0.8) // shoe cabinet
    b.boxC('darkWood', 11.38, -1.25, 0.04, 0.04, 0.8, 1.8, { collide: false }) // coat rack pole

    // ---------------- bedroom (x 10.06–13.7, z -7.7..-3.96) ----------------
    P.bed(z, { x0: 11.65, z0: -6.0, x1: 13.25, z1: -3.97, head: '+z' })
    P.nightstand(z, { id: 'drawer-night-1', x0: 11.12, z0: -4.46, x1: 11.6, z1: -3.97, facing: '-z',
      fill: (grp, p) => P.photo(z, { id: 'photo-bedroom', x: p.x, y: p.y, z: p.z, parent: grp, rot: -0.3 }) })
    P.nightstand(z, { id: 'drawer-night-2', x0: 13.25, z0: -4.46, x1: 13.69, z1: -3.97, facing: '-z' })
    b.boxC('ceramic', 11.36, -4.2, 0.14, 0.14, 0.55, 0.8, { collide: false }) // bedside lamp
    // wardrobe with two doors (front faces +x at x = 10.66)
    b.box('darkWood', 10.07, 0, -7.55, 10.66, 2.05, -6.0)
    b.box('lightWood', 10.1, 1.75, -7.5, 10.6, 1.77, -6.05, { collide: false })
    b.box('fabricRed', 10.3, 0.9, -7.3, 10.4, 1.7, -7.0, { collide: false }) // a coat
    P.cabinetDoor(z, { id: 'wardrobe-l', hx: 10.672, hz: -7.55, y0: 0.04, h: 1.97, w: 0.775, facing: '+x', extend: 'z+', name: 'wardrobe' })
    P.cabinetDoor(z, { id: 'wardrobe-r', hx: 10.672, hz: -6.0, y0: 0.04, h: 1.97, w: 0.775, facing: '+x', extend: 'z-', name: 'wardrobe' })
    // desk under the window
    b.box('darkWood', 11.2, 0.71, -7.68, 12.5, 0.75, -7.1, { collide: false })
    b.box('darkWood', 11.2, 0, -7.68, 11.6, 0.71, -7.1, { collide: false })
    b.box('darkWood', 12.45, 0, -7.68, 12.5, 0.71, -7.1, { collide: false })
    b.collider(11.2, 0, -7.68, 12.5, 0.75, -7.1)
    P.drawer(z, { id: 'drawer-desk-bed', x: 11.4, y: 0.6, z: -7.1 + 0.0125, w: 0.36, h: 0.14, d: 0.5, facing: '+z', name: 'desk drawer' })
    P.chair(z, { x: 12.0, z: -6.75, facing: '-z' })
    P.doc(z, {
      id: 'doc-diary2', x: 12.05, y: 0.752, z: -7.4, rot: -0.2, title: 'Diary — last page',
      text: `I counted with it tonight. One... two... three...\n\nAt seven the bathroom mirror fogged from the inside.\n\nThere is a door behind the mirror that wasn't there when I moved in. It's very small. Something is pressing on it.\n\nIf I'm gone: the roof. I left the last of it on the roof, by the water tank, where the counting can't reach.`,
    })
    P.rug(z, { x0: 10.8, z0: -6.9, x1: 13.0, z1: -6.1, mat: 'fabricRed' })
    b.box('metal', 11.1, 0.12, -7.7, 11.18, 0.7, -7.6, { collide: false })

    // ---------------- bathroom (x 11.66–13.7, z -3.84..-1.1) ----------------
    b.box('ceramic', 11.66, 0, -3.84, 13.69, 0.55, -3.12) // bathtub
    b.box('steel', 11.8, 0.55, -3.75, 13.55, 0.551, -3.2, { collide: false })
    b.box('screen', 11.85, 0.4, -3.7, 13.5, 0.552, -3.25, { collide: false }) // dark water
    b.boxC('ceramic', 13.38, -1.9, 0.6, 0.42, 0, 0.42) // toilet bowl
    b.boxC('ceramic', 13.6, -1.9, 0.18, 0.4, 0.42, 0.8) // tank
    // vanity with cabinet + mirror cabinet (front faces -z)
    b.box('darkWood', 12.15, 0, -1.55, 12.95, 0.82, -1.11)
    b.box('ceramic', 12.12, 0.82, -1.6, 12.98, 0.86, -1.11, { collide: false })
    b.box('steel', 12.52, 0.86, -1.2, 12.56, 1.05, -1.15, { collide: false })
    P.cabinetDoor(z, { id: 'cab-vanity', hx: 12.17, hz: -1.562, y0: 0.06, h: 0.7, w: 0.76, facing: '-z', extend: 'x+', name: 'vanity cabinet' })
    b.box('darkWood', 12.2, 1.3, -1.26, 12.9, 1.95, -1.11, { collide: false }) // mirror cabinet body
    const mc = P.cabinetDoor(z, { id: 'cab-mirror', hx: 12.2, hz: -1.272, y0: 1.31, h: 0.63, w: 0.7, facing: '-z', extend: 'x+', mat: 'mirror', name: 'mirror cabinet', open: 1.6 })
    void mc
    P.photo(z, { id: 'photo-bath', x: 12.55, y: 1.52, z: -1.19, rot: Math.PI / 2 })
    P.doc(z, {
      id: 'doc-bath', x: 12.35, y: 0.862, z: -1.38, rot: 0.1, title: 'Note on the sink',
      text: `7\n7\n7\n7\n7\n7\n7\n\nIT'S IN THE WALLS NOW\nDON'T COUNT\nDON'T COUNT\nDON'T`,
    })
    b.box('frame', 11.9, 1.0, -1.16, 12.05, 1.6, -1.12, { collide: false }) // towel
  })
}

// Apartment 803 — the player's own flat, where the game starts. Same plan as 703.
function buildHome(z) {
  const b = z.b
  const y = HOME_K * FLOOR_H, yc = y + CEIL_H
  for (const [id, x, zz, sw, style] of [['home-living', 7.5, -5.7, 'sw8-living', 'dome'], ['home-kitchen', 7.6, -2.3, 'sw8-kitchen', 'panel'],
    ['home-hall', 10.8, -2.5, 'sw8-hall', 'dome'], ['home-bedroom', 11.9, -5.8, 'sw8-bedroom', 'dome'], ['home-bath', 12.7, -2.4, 'sw8-bath', 'dome']])
    P.ceilingLamp(z, { id, x, y: yc, z: zz, circuit: 'f8', switchId: sw, intensity: 6, range: 6, style })
  P.lightSwitch(z, { id: 'sw8-kitchen', circuit: 'f8', x: 6.6, z: -1.1, y: y + 1.25, facing: '-z', label: 'kitchen light' })
  P.lightSwitch(z, { id: 'sw8-living', circuit: 'f8', x: 7.2, z: -3.66, y: y + 1.25, facing: '-z', label: 'living room light' })
  P.lightSwitch(z, { id: 'sw8-hall', circuit: 'f8', x: 9.94, z: -1.45, y: y + 1.25, facing: '-x', label: 'hall light' })
  P.lightSwitch(z, { id: 'sw8-bedroom', circuit: 'f8', x: 11.3, z: -3.96, y: y + 1.25, facing: '-z', label: 'bedroom light' })
  P.lightSwitch(z, { id: 'sw8-bath', circuit: 'f8', x: 11.54, z: -1.6, y: y + 1.25, facing: '-x', label: 'bathroom light' })
  // a battery lamp on the nightstand is the only light when you wake up
  z.fixture(new Fixture({ id: 'home-batterylamp', pos: new THREE.Vector3(11.36, y + 0.95, -4.25), color: 0xffc888, intensity: 1.3, range: 4, flicker: 0.25 }))

  z.lift(y, () => {
    // bedroom (start)
    P.bed(z, { x0: 11.65, z0: -6.0, x1: 13.25, z1: -3.97, head: '+z' })
    P.nightstand(z, { id: 'home-night-1', x0: 11.12, z0: -4.46, x1: 11.6, z1: -3.97, facing: '-z' })
    P.nightstand(z, { id: 'home-night-2', x0: 13.25, z0: -4.46, x1: 13.69, z1: -3.97, facing: '-z' })
    b.boxC('steel', 11.36, -4.22, 0.12, 0.12, 0.55, 0.78, { collide: false }) // battery lamp
    b.boxC('emissive', 11.36, -4.22, 0.08, 0.08, 0.78, 0.84, { collide: false, shadow: false })
    b.box('darkWood', 10.07, 0, -7.55, 10.66, 2.05, -6.0)
    P.cabinetDoor(z, { id: 'home-wardrobe-l', hx: 10.672, hz: -7.55, y0: 0.04, h: 1.97, w: 0.775, facing: '+x', extend: 'z+', name: 'wardrobe' })
    P.cabinetDoor(z, { id: 'home-wardrobe-r', hx: 10.672, hz: -6.0, y0: 0.04, h: 1.97, w: 0.775, facing: '+x', extend: 'z-', name: 'wardrobe' })
    P.table(z, { x0: 11.2, z0: -7.68, x1: 12.5, z1: -7.1 })
    P.chair(z, { x: 12.0, z: -6.75, facing: '-z' })
    P.boxes(z, 13.3, -7.3, 2) // unpacked moving boxes
    P.rug(z, { x0: 10.8, z0: -6.9, x1: 13.0, z1: -6.1, mat: 'blanket' })
    P.doc(z, {
      id: 'doc-home-phone', x: 11.22, y: 0.552, z: -4.25, rot: 0.3, w: 0.08, d: 0.15, title: 'Your phone',
      text: `11:52 PM — 0% battery.\n\nLast message, from an unknown number, 11:47 PM:\n\n"803. You can hear it too, can't you. The counting. It's coming up from 703.\nThe lifts are dead. Take the stairs.\nThe manager left Hale's spare key in the front desk. Find out what he did."`,
    })
    // living room
    P.sofa(z, { x0: 9.0, z0: -6.6, x1: 9.92, z1: -4.6, facing: '-x', mat: 'fabricRed' })
    P.table(z, { x0: 6.9, z0: -5.9, x1: 7.7, z1: -4.9, h: 0.45 })
    b.box('darkWood', 5.12, 0, -5.9, 5.55, 0.5, -4.7)
    b.box('blackPlastic', 5.15, 0.5, -5.55, 5.6, 0.95, -5.0)
    b.box('screen', 5.6, 0.55, -5.5, 5.61, 0.9, -5.05, { collide: false })
    P.boxes(z, 5.6, -7.2, 3); P.boxes(z, 6.4, -7.3, 2)
    P.plant(z, 9.55, -7.35)
    // kitchen
    b.box('appliance', 5.12, 0, -3.54, 5.8, 1.78, -2.88)
    P.cabinetDoor(z, { id: 'home-fridge', hx: 5.13, hz: -2.87, y0: 0.05, h: 1.7, w: 0.66, facing: '+z', extend: 'x+', mat: 'appliance', name: 'fridge', open: 1.7 })
    b.box('darkWood', 5.8, 0, -3.54, 7.4, 0.86, -2.94)
    b.box('lightWood', 5.8, 0.86, -3.54, 7.4, 0.9, -2.91, { collide: false })
    b.box('steel', 6.75, 0.9, -3.44, 7.25, 0.905, -3.04, { collide: false })
    P.drawer(z, { id: 'home-drawer', x: 6.2, y: 0.76, z: -2.94 + 0.0125, w: 0.76, h: 0.15, d: 0.55, facing: '+z', name: 'kitchen drawer' })
    P.doc(z, {
      id: 'doc-home-note', x: 6.0, y: 0.002, z: -1.45, rot: 0.6, title: 'Note slipped under your door',
      text: `To the new tenant in 803,\n\nPlease stop walking around at night. Every time you do, the knocking in 703 starts again, right below you.\n\nIf you ever go down there: the breakers are in the maintenance room by the lobby. DON'T turn on floor 7.\n\n— your neighbour in 804`,
    })
    // bathroom
    b.box('ceramic', 11.66, 0, -3.84, 13.69, 0.55, -3.12)
    b.boxC('ceramic', 13.38, -1.9, 0.6, 0.42, 0, 0.42)
    b.boxC('ceramic', 13.6, -1.9, 0.18, 0.4, 0.42, 0.8)
    b.box('darkWood', 12.15, 0, -1.55, 12.95, 0.82, -1.11)
    b.box('ceramic', 12.12, 0.82, -1.6, 12.98, 0.86, -1.11, { collide: false })
    b.box('mirror', 12.2, 1.3, -1.13, 12.9, 1.95, -1.11, { collide: false })
  })
}

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
