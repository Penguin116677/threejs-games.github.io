# Riverside Apartments — verification

## Automated

```
node examples/80-scenes/riverside-apartment/tests/run-tests.cjs           # full (~8 min, SwiftShader)
node examples/80-scenes/riverside-apartment/tests/run-tests.cjs --quick   # shorter fuzz
node examples/80-scenes/riverside-apartment/tests/run-tests.cjs --only=stairs,elevator
```

Runs the real game headless (`?test` exposes `window.__RA`) and drives it through the
real input → physics → raycast-interaction path; nothing is teleported through a wall.

| Test | Covers |
| --- | --- |
| boot | no console/page errors, door/collider counts, only nearby zones resident |
| start | spawn in the 803 bedroom on floor 8, read the phone, dead light switch, bedroom/hall/front doors, corridor, stairwell door, down all 7 storeys of stairs, out into the lobby; objectives update |
| vertical slice | street → entrance → lobby → desk drawer → key → maintenance breakers → elevator → floor 7 → unlock 703 → kitchen/living/hall/bedroom/bathroom (switches, drawers, fridge, wardrobe, mirror cabinet, documents, photos) → stairs to roof → roof door → stairs + elevator back to the lobby → out to the street; asserts zero fail-safe recoveries |
| stairs | for every floor 1–8: walk up both flights to the next floor (8 → roof) and back down; landing heights exact |
| elevator | visits every floor in scrambled order: car level to 1e-6 m, only that floor's landing doors open, rider stays grounded; exits on floor 5; doors re-open on an obstruction |
| doors | all 56 doors: panel sits in its wall opening (not buried), header + jambs exist, closed door blocks from both sides, opened door passable both ways, locked doors stay locked |
| navigation | 0.1 m flood fill of every floor with all doors open: elevator, stair door/landing, every apartment door, corridor ends; ground floor lobby/desk/maintenance/entrance/street; floor 7 every room of 703; roof corners |
| collision | sprinting into exterior walls, window glass, partitions, sofa, bed, fridge, counter, bathtub, locked door, corridor window, lobby glass, roof parapet, closed elevator doors, stair spine, map boundary |
| escape fuzz | 61 spawn points (every corridor, landing, mid-landing, car, lobby, 703 rooms, roof, street) × random sprint/crouch walks with random interactions; checks every physics step for collider overlap, falling below ground, leaving the map, leaving/entering the building other than by the front door, and being stuck |
| interactions | F key flashlight, breaker → lights, photo pickup + HUD, document overlay open/close, locked-door message, light switch needs floor-7 power, drawer/cabinet state survives zone unload/reload |
| mobile | Pixel 7 emulation with real CDP touch events: buttons visible & on-screen, joystick moves, drag looks, simultaneous move + look, LIGHT, CROUCH/stand, RUN toggle, USE opens the aimed door |
| performance | draw calls/triangles at street, lobby, floor 4, floor 7, inside 703, roof; resident zone count; shader program count |

## Manual checklist (per floor)

Play on desktop and on an Android phone (Chrome, landscape and portrait).

**Every floor (1–8)**
- [ ] Stairwell door opens/closes; exit sign and floor number visible on the landing
- [ ] Walk up and down both flights without snagging; no head bumps on the flight above
- [ ] Elevator call button responds (or reports "no power"); indicator shows the car floor
- [ ] Elevator arrives level with the floor; doors open on this floor only; stepping in/out is smooth
- [ ] Every apartment door: correct number plate, locked message, handle aligned, no gaps around the closed door
- [ ] Walk the corridor end to end; windows at both ends are solid
- [ ] Crouch-walk along walls and into corners: never pass through, never stuck
- [ ] Only this floor ±1 is drawn (look up/down the stairwell for pop-in)

**Floor 1 (lobby)**
- [ ] Front doors open from outside and inside; threshold is flush
- [ ] Notice, key log, maintenance log readable; desk drawer opens and the 703 key can be taken only once open
- [ ] All four breakers toggle their circuits (lobby lights, stairwell lights, elevator, floor 7)
- [ ] Office / laundry / storage stay locked

**Floor 8**
- [ ] Game starts in the 803 bedroom facing the bedroom door, battery lamp lit, objective "Get out of your apartment (803)"
- [ ] Phone and the note under the front door are readable; light switches report the floor is dead
- [ ] 803 front door is unlocked and swings into the flat, nudging you back if you stand in its way

**Floor 7**
- [ ] Corridor lights flicker once FLOOR 7 is on; dark with it off
- [ ] 703 refuses to open without the key, unlocks with it
- [ ] Kitchen, living room, hall, bedroom, bathroom all walkable; switches light each room
- [ ] Fridge, cupboards, wall cabinets, kitchen/nightstand/desk drawers, wardrobe, vanity, mirror cabinet open
- [ ] Furniture is solid (sofa, tables, chairs, bed, bath, toilet, counters)
- [ ] Bathroom note triggers the scare (flicker + sound)

**Roof**
- [ ] Roof door opens from the top landing; guard rail stops a fall into the stairwell
- [ ] Parapet blocks the edge everywhere; water tank / AC units solid
- [ ] Final note readable; take the stairs/elevator back to the lobby

**Mobile**
- [ ] Joystick + look work at the same time; buttons reachable with thumbs; USE highlights when aimed
- [ ] Documents scroll and close; pause button works; frame rate acceptable on a mid-range device
