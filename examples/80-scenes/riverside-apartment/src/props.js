// Furniture & prop library. Static parts go through the zone's Builder (merged
// geometry + colliders); moving parts (drawers, cabinet doors) are separate
// meshes wired to interactables. Coordinates are absolute world metres.
import * as THREE from 'three'
import { Drawer, CabinetDoor, Item, Pressable } from './interact.js'
import { Fixture } from './lights.js'

const FACING = { '+x': [1, 0], '-x': [-1, 0], '+z': [0, 1], '-z': [0, -1] }
const DIR_PHI = { 'x+': 0, 'x-': Math.PI, 'z+': -Math.PI / 2, 'z-': Math.PI / 2 }

// size for a thin panel facing `facing`: (thickness along facing axis, w across, h)
function panelSize(facing, t, w, h) {
  return facing[1] === 'x' ? [t, h, w] : [w, h, t]
}

export function mesh(zone, geo, mat, x, y, z, parent) {
  const m = new THREE.Mesh(geo, typeof mat === 'string' ? zone.M[mat] : mat)
  m.position.set(x, y, z)
  m.castShadow = m.receiveShadow = true
  ;(parent || zone.extra).add(m)
  return m
}

// ---- moving parts --------------------------------------------------------------

// Drawer whose closed front is centred at (x, y, z) on a furniture face.
export function drawer(zone, { id, x, y, z, w, h, d, facing, mat = 'darkWood', name = 'drawer', fill }) {
  const [fx, fz] = FACING[facing]
  const g = new THREE.Group()
  g.position.set(x, y, z)
  zone.extra.add(g)
  const front = mesh(zone, new THREE.BoxGeometry(...panelSize(facing, 0.025, w, h)), mat, 0, 0, 0, g)
  mesh(zone, new THREE.BoxGeometry(...panelSize(facing, 0.03, Math.min(0.14, w * 0.4), 0.025)), 'brass', fx * 0.02, 0.01, fz * 0.02, g)
  // tray (hidden inside the body while closed)
  const trayW = w - 0.05, trayD = d - 0.04
  const tray = facing[1] === 'x' ? [trayD, 0.015, trayW] : [trayW, 0.015, trayD]
  mesh(zone, new THREE.BoxGeometry(...tray), 'lightWood', -fx * trayD / 2, -h / 2 + 0.03, -fz * trayD / 2, g)
  for (const s of [-1, 1]) { // tray sides
    const side = facing[1] === 'x' ? [trayD, h * 0.6, 0.012] : [0.012, h * 0.6, trayD]
    mesh(zone, new THREE.BoxGeometry(...side), 'lightWood',
      -fx * trayD / 2 + (facing[1] === 'x' ? 0 : s * trayW / 2), -h * 0.15, -fz * trayD / 2 + (facing[1] === 'x' ? s * trayW / 2 : 0), g)
  }
  const dr = new Drawer(zone.game, { id, group: g, hit: front, dir: new THREE.Vector3(fx, 0, fz), dist: d * 0.75, name })
  zone.interactable(dr)
  // contents sit in the front half of the tray so they're reachable when open
  const inside = { x: -fx * trayD * 0.35, y: -h / 2 + 0.045, z: -fz * trayD * 0.35 }
  fill?.(g, inside)
  return dr
}

// Hinged cabinet door: hinge at (hx, hz) on the front plane, panel extends along `extend`.
export function cabinetDoor(zone, { id, hx, hz, y0, h, w, facing, extend, mat = 'darkWood', name = 'cabinet', open = 1.8 }) {
  const pivot = new THREE.Group()
  pivot.position.set(hx, y0, hz)
  const phi0 = DIR_PHI[extend]
  pivot.rotation.y = phi0
  zone.extra.add(pivot)
  const geo = new THREE.BoxGeometry(w - 0.006, h - 0.006, 0.02).translate(w / 2, h / 2, 0)
  const panel = mesh(zone, geo, mat, 0, 0, 0, pivot)
  // handle near the free edge, on the outside face
  const [fx, fz] = FACING[facing]
  const outside = Math.sin(phi0) * fx + Math.cos(phi0) * fz > 0 ? 1 : -1 // local +z == facing ?
  mesh(zone, new THREE.BoxGeometry(0.02, Math.min(0.12, h * 0.4), 0.02), 'brass', w - 0.04, h / 2, outside * 0.02, pivot)
  // swing the free edge toward the front (facing) side
  const mx = -Math.sin(phi0), mz = -Math.cos(phi0)
  const sign = mx * fx + mz * fz > 0 ? 1 : -1
  const cd = new CabinetDoor(zone.game, { id, pivot, hit: panel, openAngle: sign * open, name })
  zone.interactable(cd)
  return cd
}

// ---- items ----------------------------------------------------------------------

export function photo(zone, { id, x, y, z, parent, rot = 0 }) {
  const game = zone.game
  if (game.state.get(id)?.taken) return null
  const g = new THREE.Group()
  g.position.set(x, y, z)
  g.rotation.y = rot
  ;(parent || zone.extra).add(g)
  mesh(zone, new THREE.BoxGeometry(0.15, 0.004, 0.11), 'paper', 0, 0.002, 0, g)
  const img = mesh(zone, new THREE.PlaneGeometry(0.13, 0.09).rotateX(-Math.PI / 2), game.photoMaterial(id), 0, 0.0045, 0, g)
  img.castShadow = false
  const it = new Item(game, {
    id, mesh: g, kind: 'photo', name: 'old photograph',
    onTake: game => game.collectPhoto(id),
  })
  zone.interactable(it)
  return it
}

export function key(zone, { id, x, y, z, parent, name }) {
  const game = zone.game
  if (game.state.get(id)?.taken) return null
  const g = new THREE.Group()
  g.position.set(x, y, z)
  ;(parent || zone.extra).add(g)
  mesh(zone, new THREE.BoxGeometry(0.07, 0.008, 0.02), 'brass', 0, 0.004, 0, g)
  mesh(zone, new THREE.CylinderGeometry(0.02, 0.02, 0.008, 12), 'brass', -0.045, 0.004, 0, g)
  mesh(zone, new THREE.BoxGeometry(0.05, 0.03, 0.002).rotateX(-Math.PI / 2), 'paper', 0.0, 0.009, 0.03, g) // tag
  const it = new Item(game, {
    id, mesh: g, kind: 'key', name,
    onTake: game => { game.inventory.set(id, { name }); game.ui.toast(`Picked up the ${name}.`); game.ui.updateInventory() },
  })
  zone.interactable(it)
  return it
}

export function doc(zone, { id, x, y, z, rot = 0, parent, title, text, w = 0.21, d = 0.28, standing = false }) {
  const game = zone.game
  const g = new THREE.Group()
  g.position.set(x, y, z)
  g.rotation.y = rot
  ;(parent || zone.extra).add(g)
  const geo = standing ? new THREE.BoxGeometry(w, d, 0.003) : new THREE.BoxGeometry(w, 0.003, d)
  const p = mesh(zone, geo, game.docMaterial(), 0, standing ? 0 : 0.002, 0, g)
  p.castShadow = false
  const it = new Item(game, { id, mesh: g, kind: 'document', name: title.toLowerCase().startsWith('the ') ? title : `"${title}"`, doc: { id, title, text } })
  zone.interactable(it)
  return it
}

// Wall light switch on a wall face: (x, z) on the face, `facing` = outward normal.
export function lightSwitch(zone, { id, x, z, y, facing, label, circuit = null }) {
  const game = zone.game
  const [fx, fz] = FACING[facing]
  const plate = mesh(zone, new THREE.BoxGeometry(...panelSize(facing, 0.012, 0.08, 0.12)), 'ceramic', x + fx * 0.006, y, z + fz * 0.006)
  const tog = mesh(zone, new THREE.BoxGeometry(...panelSize(facing, 0.02, 0.022, 0.04)), 'ceramic', x + fx * 0.016, y, z + fz * 0.016)
  const sync = () => { tog.position.y = y + (game.switches[id] ? 0.012 : -0.012) }
  sync()
  const p = new Pressable(game, {
    id, mesh: plate, kind: 'switch',
    label: g => `${g.switches[id] ? 'Turn off' : 'Turn on'} ${label}`,
    onPress: g => {
      g.switches[id] = !g.switches[id]
      g.state.set('switch:' + id, g.switches[id])
      g.audio.play('switch')
      sync()
      if (g.switches[id] && circuit && !g.power[circuit]) g.ui.toast(circuit === 'f8' ? 'Click. Nothing. The whole floor is dead.' : 'The switch clicks, but nothing happens.')
    },
  })
  zone.interactable(p)
  return p
}

// Ceiling lamp + fixture.
export function ceilingLamp(zone, { id, x, y, z, circuit = null, switchId = null, intensity = 5, range = 6.5, flicker = 0, color = 0xffe0b0, style = 'dome' }) {
  const b = zone.b
  if (style === 'dome') {
    b.boxC('steel', x, z, 0.08, 0.08, y - 0.12, y, { collide: false })
  } else {
    b.boxC('steel', x, z, 0.7, 0.22, y - 0.06, y, { collide: false })
  }
  const bulbGeo = style === 'dome' ? new THREE.SphereGeometry(0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI) : new THREE.BoxGeometry(0.62, 0.03, 0.16)
  const mat = new THREE.MeshBasicMaterial({ color: 0x222222 })
  const bulb = mesh(zone, bulbGeo, mat, x, style === 'dome' ? y - 0.1 : y - 0.07, z)
  bulb.castShadow = false
  const on = new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.4)
  const off = new THREE.Color(0x1c1c1a)
  return zone.fixture(new Fixture({
    id, pos: new THREE.Vector3(x, y - 0.35, z), circuit, switchId, intensity, range, flicker, color,
    glow: lv => mat.color.copy(off).lerp(on, lv),
  }))
}

// ---- furniture ---------------------------------------------------------------------

export function table(zone, { x0, z0, x1, z1, h = 0.75, mat = 'darkWood' }) {
  const b = zone.b
  b.box(mat, x0, h - 0.04, z0, x1, h, z1, { collide: false })
  for (const [x, z] of [[x0 + 0.05, z0 + 0.05], [x1 - 0.05, z0 + 0.05], [x0 + 0.05, z1 - 0.05], [x1 - 0.05, z1 - 0.05]])
    b.boxC(mat, x, z, 0.05, 0.05, 0, h - 0.04, { collide: false })
  b.collider(x0, 0, z0, x1, h, z1)
}

export function chair(zone, { x, z, facing, mat = 'darkWood' }) {
  const b = zone.b
  const s = 0.42
  b.boxC(mat, x, z, s, s, 0.42, 0.46, { collide: false })
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
    b.boxC(mat, x + dx * (s / 2 - 0.03), z + dz * (s / 2 - 0.03), 0.04, 0.04, 0, 0.42, { collide: false })
  const [fx, fz] = FACING[facing]
  // backrest on the side opposite to facing
  const bx = x - fx * (s / 2 - 0.02), bz = z - fz * (s / 2 - 0.02)
  b.boxC(mat, bx, bz, fx ? 0.04 : s, fz ? 0.04 : s, 0.46, 0.95, { collide: false })
  b.collider(x - s / 2, 0, z - s / 2, x + s / 2, 0.95, z + s / 2)
}

export function sofa(zone, { x0, z0, x1, z1, facing, mat = 'fabric' }) {
  const b = zone.b
  const [fx, fz] = FACING[facing]
  b.box(mat, x0, 0.1, z0, x1, 0.45, z1, { collide: false }) // seat
  const t = 0.22
  if (fx > 0) b.box(mat, x0, 0.45, z0, x0 + t, 0.9, z1, { collide: false })
  if (fx < 0) b.box(mat, x1 - t, 0.45, z0, x1, 0.9, z1, { collide: false })
  if (fz > 0) b.box(mat, x0, 0.45, z0, x1, 0.9, z0 + t, { collide: false })
  if (fz < 0) b.box(mat, x0, 0.45, z1 - t, x1, 0.9, z1, { collide: false })
  // arms
  if (fx) { b.box(mat, x0, 0.45, z0, x1, 0.65, z0 + 0.18, { collide: false }); b.box(mat, x0, 0.45, z1 - 0.18, x1, 0.65, z1, { collide: false }) }
  else { b.box(mat, x0, 0.45, z0, x0 + 0.18, 0.65, z1, { collide: false }); b.box(mat, x1 - 0.18, 0.45, z0, x1, 0.65, z1, { collide: false }) }
  b.box('darkWood', x0 + 0.05, 0, z0 + 0.05, x1 - 0.05, 0.1, z1 - 0.05, { collide: false })
  b.collider(x0, 0, z0, x1, 0.9, z1)
}

export function bed(zone, { x0, z0, x1, z1, head }) {
  const b = zone.b
  b.box('darkWood', x0, 0, z0, x1, 0.35, z1, { collide: false })
  b.box('mattress', x0 + 0.03, 0.35, z0 + 0.03, x1 - 0.03, 0.55, z1 - 0.03, { collide: false })
  // blanket over the foot two-thirds
  if (head === '-z') b.box('blanket', x0 + 0.01, 0.42, z0 + 0.6, x1 - 0.01, 0.58, z1 + 0.01, { collide: false })
  if (head === '+z') b.box('blanket', x0 + 0.01, 0.42, z0 - 0.01, x1 - 0.01, 0.58, z1 - 0.6, { collide: false })
  const hz = head === '-z' ? z0 : z1
  b.box('mattress', x0 + 0.15, 0.55, head === '-z' ? z0 + 0.08 : z1 - 0.45, x1 - 0.15, 0.66, head === '-z' ? z0 + 0.45 : z1 - 0.08, { collide: false }) // pillow
  b.box('darkWood', x0, 0, head === '-z' ? hz : hz - 0.06, x1, 1.05, head === '-z' ? hz + 0.06 : hz, { collide: false })
  b.collider(x0, 0, z0, x1, 0.62, z1)
  b.collider(x0, 0, head === '-z' ? hz : hz - 0.06, x1, 1.05, head === '-z' ? hz + 0.06 : hz)
}

// Box-shaped cabinet body with a front face; returns the front plane coordinate.
export function body(zone, { x0, z0, x1, z1, y0 = 0, h, mat = 'darkWood', collide = true }) {
  zone.b.box(mat, x0, y0, z0, x1, y0 + h, z1, { collide })
}

export function nightstand(zone, { id, x0, z0, x1, z1, facing, fill }) {
  body(zone, { x0, z0, x1, z1, h: 0.55 })
  const [fx, fz] = FACING[facing]
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2
  const fxp = fx > 0 ? x1 : fx < 0 ? x0 : cx
  const fzp = fz > 0 ? z1 : fz < 0 ? z0 : cz
  const w = fx ? z1 - z0 : x1 - x0, d = fx ? x1 - x0 : z1 - z0
  drawer(zone, { id, x: fxp + fx * 0.0125, y: 0.42, z: fzp + fz * 0.0125, w: w - 0.06, h: 0.16, d: d - 0.05, facing, name: 'nightstand drawer', fill })
}

export function bookshelf(zone, { x0, z0, x1, z1, h = 1.9, facing }) {
  const b = zone.b
  const [fx, fz] = FACING[facing]
  // back + sides + shelves (visual), single collider
  b.box('darkWood', x0, 0, z0, x1, 0.06, z1, { collide: false })
  b.box('darkWood', x0, h - 0.03, z0, x1, h, z1, { collide: false })
  const backT = 0.02
  if (fx > 0) b.box('darkWood', x0, 0, z0, x0 + backT, h, z1, { collide: false })
  if (fx < 0) b.box('darkWood', x1 - backT, 0, z0, x1, h, z1, { collide: false })
  if (fz > 0) b.box('darkWood', x0, 0, z0, x1, h, z0 + backT, { collide: false })
  if (fz < 0) b.box('darkWood', x0, 0, z1 - backT, x1, h, z1, { collide: false })
  if (fx) { b.box('darkWood', x0, 0, z0, x1, h, z0 + 0.02, { collide: false }); b.box('darkWood', x0, 0, z1 - 0.02, x1, h, z1, { collide: false }) }
  else { b.box('darkWood', x0, 0, z0, x0 + 0.02, h, z1, { collide: false }); b.box('darkWood', x1 - 0.02, 0, z0, x1, h, z1, { collide: false }) }
  const rnd = zone.rng
  const cols = ['fabricRed', 'blanket', 'fabric', 'cardboard', 'lightWood']
  for (let s = 1; s <= 4; s++) {
    const y = s * (h / 5)
    b.box('darkWood', x0, y - 0.02, z0, x1, y, z1, { collide: false })
    // books
    const len = fx ? z1 - z0 : x1 - x0
    let t = 0.03
    while (t < len - 0.06) {
      const bw = 0.03 + rnd() * 0.04, bh = 0.18 + rnd() * 0.14
      if (rnd() < 0.15) { t += bw * 2; continue }
      const m = cols[Math.floor(rnd() * cols.length)]
      if (fx) b.box(m, x0 + 0.04, y, z0 + t, x1 - 0.03, y + bh, z0 + t + bw, { collide: false })
      else b.box(m, x0 + t, y, z0 + 0.04, x0 + t + bw, y + bh, z1 - 0.03, { collide: false })
      t += bw + 0.004
    }
  }
  b.collider(x0, 0, z0, x1, h, z1)
}

export function rug(zone, { x0, z0, x1, z1, mat = 'rug' }) {
  zone.b.box(mat, x0, 0.001, z0, x1, 0.012, z1, { collide: false, shadow: false })
}

export function boxes(zone, x, z, n = 3) {
  const r = zone.rng
  let y = 0
  for (let i = 0; i < n; i++) {
    const s = 0.35 + r() * 0.25
    const ox = (r() - 0.5) * 0.15, oz = (r() - 0.5) * 0.15
    zone.b.boxC('cardboard', x + ox, z + oz, s, s * 0.9, y, y + s * 0.8)
    y += s * 0.8
  }
}

export function plant(zone, x, z) {
  const b = zone.b
  b.boxC('red', x, z, 0.36, 0.36, 0, 0.4) // pot (collider)
  b.boxC('plant', x, z, 0.5, 0.5, 0.4, 0.9, { collide: false })
  b.boxC('plant', x + 0.05, z - 0.04, 0.3, 0.3, 0.9, 1.3, { collide: false })
}

export function radiator(zone, { x0, z0, x1, z1 }) {
  const b = zone.b
  const along = x1 - x0 > z1 - z0
  const len = along ? x1 - x0 : z1 - z0
  for (let t = 0.02; t < len - 0.02; t += 0.07) {
    if (along) b.box('metal', x0 + t, 0.12, z0, x0 + t + 0.04, 0.72, z1, { collide: false })
    else b.box('metal', x0, 0.12, z0 + t, x1, 0.72, z0 + t + 0.04, { collide: false })
  }
  b.collider(x0, 0, z0, x1, 0.72, z1)
}

// Interactable breaker lever on a panel face.
export function breaker(zone, { id, circuit, x, y, z, facing, label }) {
  const game = zone.game
  const [fx, fz] = FACING[facing]
  const base = mesh(zone, new THREE.BoxGeometry(...panelSize(facing, 0.03, 0.12, 0.16)), 'blackPlastic', x + fx * 0.015, y, z + fz * 0.015)
  const pivot = new THREE.Group()
  pivot.position.set(x + fx * 0.03, y, z + fz * 0.03)
  zone.extra.add(pivot)
  const lever = mesh(zone, new THREE.BoxGeometry(...panelSize(facing, 0.07, 0.04, 0.03)), 'red', fx * 0.035, 0, fz * 0.035, pivot)
  const plate = mesh(zone, new THREE.PlaneGeometry(0.12, 0.05), new THREE.MeshBasicMaterial({ map: game.labelTexture(label) }), x + fx * 0.031, y - 0.12, z + fz * 0.031)
  plate.rotation.y = Math.atan2(fx, fz)
  const sync = () => {
    const on = game.power[circuit]
    // tilt up (on) / down (off) around the horizontal axis parallel to the panel
    if (fx) pivot.rotation.z = (on ? 1 : -1) * 0.6 * fx
    else pivot.rotation.x = (on ? -1 : 1) * 0.6 * fz
    lever.material = zone.M[on ? 'brass' : 'red']
  }
  sync()
  const p = new Pressable(game, {
    id, mesh: base, kind: 'breaker',
    label: g => `${g.power[circuit] ? 'Switch off' : 'Switch on'} breaker: ${label}`,
    onPress: g => {
      g.setPower(circuit, !g.power[circuit])
      g.audio.play('breaker')
      sync()
    },
  })
  zone.interactable(p)
  return p
}
