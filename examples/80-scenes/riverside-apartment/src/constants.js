// Riverside Apartments — shared dimensions (metres). x = east, z = south, y = up.
// The street is to the north (negative z); the entrance is in the north facade.

export const FLOOR_H = 3.0 // floor-to-floor height
export const SLAB = 0.25 // structural slab thickness
export const CEIL_H = FLOOR_H - SLAB // clear ceiling height (2.75 m)
export const FLOORS = 8 // floors 1 (lobby) .. 8
export const ROOF_Y = FLOORS * FLOOR_H

// Building outer footprint.
export const B = { x0: -14, x1: 14, z0: -8, z1: 8 }
export const EXT_T = 0.3 // exterior wall thickness (0.1 brick + 0.2 plaster)
export const IN = { x0: B.x0 + EXT_T, x1: B.x1 - EXT_T, z0: B.z0 + EXT_T, z1: B.z1 - EXT_T }

// Central corridor (clear width 1.8 m), walls 0.2 m thick centred on z = ±1.
export const COR = { z0: -0.9, z1: 0.9 }

// Partition lines between units (centre x).
export const NORTH_SPLITS = [-4, 5] // units 01 | 02 | 03
export const SOUTH_SPLIT = 3 // units 04 | 05

// Stairwell (switch-back, two flights per floor), south-west corner.
export const STAIR = {
  x0: IN.x0, x1: -10.7, z0: 1.1, z1: IN.z1,
  spine0: -12.3, spine1: -12.1, // solid spine wall between the flights
  landZ: 3.0, // floor landing is z ∈ [z0, landZ]
  midZ: 5.56, // mid landing is z ∈ [midZ, z1]
  run: 0.32, steps: 8, // 8 treads + landing riser = 9 risers per flight
  door: [-12.0, -11.1]
}

// Elevator shaft (clear interior) and its landing door in the corridor wall.
export const SHAFT = { x0: -10.5, x1: -8.3, z0: 1.1, z1: 3.4 }
export const ELEV_DOOR = [-9.95, -8.85]

// Apartment door positions in the corridor walls (x ranges).
export const DOORS_N = { '01': [-6.0, -5.1], '02': [0.0, 0.9], '03': [5.5, 6.4] }
export const DOORS_S = { '04': [-2.0, -1.1], '05': [7.0, 7.9] }

export const DOOR_H = 2.1
export const INNER_DOOR_H = 2.05

export const floorY = k => k * FLOOR_H
export const floorLabel = k => String(k + 1)
export const floorOfY = y => Math.max(0, Math.min(FLOORS, Math.floor((y + 0.6) / FLOOR_H)))

// Apartment 703 sits on floor 7 (k = 6), north-east unit.
export const APT_K = 6
// The player's own apartment, 803, is directly above it on the top floor (k = 7).
export const HOME_K = 7
export const hasApartment = k => k === APT_K || k === HOME_K
export const APT = {
  x0: 5.1, x1: IN.x1, z0: IN.z0, z1: -1.1,
  // room rectangles (clear interior)
  kitchen: { x0: 5.1, x1: 9.94, z0: -3.54, z1: -1.1 },
  living: { x0: 5.1, x1: 9.94, z0: IN.z0, z1: -3.66 },
  hall: { x0: 10.06, x1: 11.54, z0: -3.84, z1: -1.1 },
  bedroom: { x0: 10.06, x1: IN.x1, z0: IN.z0, z1: -3.96 },
  bathroom: { x0: 11.66, x1: IN.x1, z0: -3.84, z1: -1.1 },
}

// Playable map bounds (outside the building).
export const MAP = { x0: -32, x1: 32, z0: -32, z1: 16 }
