# Riverside Apartments

A first-person horror exploration scene: an 8-storey apartment block with a fully
walkable interior, built with three.js (vendored r160, no build step).

Run from the repository root (`npx live-server` or `python3 -m http.server`) and open
`/examples/80-scenes/riverside-apartment/`.

## Vertical slice (implemented first)

You start in the bedroom of your own flat, **Apartment 803** on the top floor, during a
power cut. Leave 803 → take the dark stairwell down 8 floors → lobby → front desk (spare key in the drawer) → maintenance room
(breakers: LOBBY / STAIRS / ELEVATOR / FLOOR 7) → elevator → floor 7 corridor →
Apartment 703 (kitchen, living room, hall, bedroom, bathroom) → stairs → roof → back down.

## What's in the building

| Area | Contents |
| --- | --- |
| All 8 floors | 28 × 20 m footprint (north units 10.6 m deep). Real slabs, 0.3 m exterior / 0.2 m corridor / 0.12 m partition walls, 2.75 m ceilings, door openings with frames, windows with solid glass, corridor with 5 apartment doors, stairwell door, elevator landing (call button, floor indicator, sliding doors) |
| Stairwell | Switch-back stairs, two 9-riser flights per floor (16.7 cm rise, 32 cm tread), mid landings, spine wall, continues to a roof bulkhead |
| Elevator | Moving car that carries the player, centre-opening car + landing doors, 8 floor buttons + door-open, auto-close with obstruction re-open, needs the ELEVATOR breaker |
| Ground floor | Lobby (desk, mailboxes, notice board), maintenance room (breaker panel, workbench), locked office / laundry / storage |
| Apartment 803 (start) | Same luxury plan as 703 (moving boxes, battery lamp, phone, note under the door); floor 8 has no power |
| Apartment 703 | ≈186 m² luxury plan (units 02 + 03 merged): living + dining ≈62 m² (velvet sectional, wall TV, grand piano, dining for six, floor-to-ceiling windows), open kitchen ≈27 m² (marble worktops, island with stools, tall fridge, drawers, wall cabinets), entry foyer/gallery ≈20 m², master bedroom ≈49 m² (king bed, wardrobe wall, writing desk, reading corner), en-suite ≈22 m² (freestanding tub, double vanity, mirror cabinet, glass walk-in shower); damask walls, marble floors, chandeliers, a light switch per room |
| Roof | Parapet, water tank, AC units, final document |

Apartment doors open into their unit. Other apartments are locked (doors are real and openable in tests; interiors are empty
shells awaiting expansion — see *Next steps*).

## Controls

| Desktop | Android / touch |
| --- | --- |
| WASD / arrows – move, mouse – look | left thumb – floating joystick, right thumb – drag to look |
| E or click – interact | USE |
| Shift – sprint | RUN (toggle) |
| C (toggle) / Ctrl (hold) – crouch | CROUCH (toggle) |
| F – flashlight | LIGHT |
| Esc – pause | II |

`?mobile=1` forces touch controls on desktop, `?shadows=0` disables flashlight shadows.

## Architecture (`src/`)

* `physics.js` – AABB collision world in a 3D spatial hash + kinematic player
  (sub-stepped sweep-and-clamp, 0.4 m step-up, ground snapping, moving-platform carry,
  depenetration, last-safe-position recovery).
* `builder.js` – modular geometry: boxes batched per material into merged meshes with
  world-space UVs; walls with openings, two-layer walls, windows, slabs with holes.
  Every solid piece registers its collider from the same numbers that draw it, so
  visuals and collision can't drift apart.
* `level.js` – the building (all floors, stairs, roof, street) and streamed zones.
* `zones.js` – distance-based loading: the shell is always resident; furniture, props,
  interactables and light fixtures load within ±1 floor and unload behind you.
  State lives in `game.state` so drawers/pickups survive reloads.
* `lights.js` – many cheap emissive fixtures, a fixed pool of 6 (4 on mobile) real point
  lights assigned to the nearest powered fixtures on your floor; never recompiles shaders.
* `interact.js`, `props.js` – hinged doors (segmented colliders, swing away from the
  player, never close onto the player), locks/keys, drawers, cabinet doors, switches,
  breakers, documents, pickups.
* `elevator.js`, `input.js`, `ui.js`, `audio.js` (synthesised sounds + rain loop).

Floors more than one storey away are hidden while you're inside; corridor lamps are
instanced. See `TESTING.md` for the verification checklist.
