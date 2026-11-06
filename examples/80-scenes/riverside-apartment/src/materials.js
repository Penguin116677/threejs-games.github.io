// Procedural (canvas) textures and the shared material palette.
// Everything is generated at start-up so the scene needs no texture downloads.
import * as THREE from 'three'

function rng(seed) {
  let s = seed >>> 0
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296
}

function canvas(w, h = w) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  return [c, c.getContext('2d')]
}

function noise(ctx, w, h, r, amount, n = 9000, light = false) {
  for (let i = 0; i < n; i++) {
    const a = r() * amount
    ctx.fillStyle = light ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`
    ctx.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2)
  }
}

function stains(ctx, w, h, r, count, color = '40,30,10', maxA = 0.25, maxR = 0.25) {
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h, rad = (0.05 + r() * maxR) * w
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad)
    g.addColorStop(0, `rgba(${color},${r() * maxA})`)
    g.addColorStop(1, `rgba(${color},0)`)
    ctx.fillStyle = g
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2)
  }
}

// Wrap horizontally/vertically so stains don't create visible seams: draw a 3x3 tile.
function drips(ctx, w, h, r, count, color = '50,40,20') {
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h * 0.6, len = 20 + r() * h * 0.4
    ctx.strokeStyle = `rgba(${color},${0.05 + r() * 0.12})`
    ctx.lineWidth = 1 + r() * 3
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (r() - 0.5) * 6, y + len); ctx.stroke()
  }
}

function toTexture(c, srgb = true) {
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

// Wall textures span exactly one storey vertically (v period = 3 m) so the
// skirting board and dado rail line up on every floor.
function wallPaint(seed, base, lower, rail = true) {
  const [c, ctx] = canvas(256, 512)
  const r = rng(seed)
  ctx.fillStyle = base; ctx.fillRect(0, 0, 256, 512)
  const dado = 512 - 512 / 3 // 1 m above the floor
  if (lower) { ctx.fillStyle = lower; ctx.fillRect(0, dado, 256, 512 - dado) }
  if (rail) { ctx.fillStyle = 'rgba(30,25,15,0.6)'; ctx.fillRect(0, dado - 4, 256, 6) }
  ctx.fillStyle = '#2a241c'; ctx.fillRect(0, 512 - 16, 256, 16) // skirting
  noise(ctx, 256, 512, r, 0.06, 6000)
  stains(ctx, 256, 512, r, 14, '60,45,15', 0.22)
  drips(ctx, 256, 512, r, 10)
  stains(ctx, 256, 100, r, 6, '30,25,10', 0.3, 0.3) // ceiling-line water damage
  return c
}

function wallpaper(seed) {
  const [c, ctx] = canvas(256, 512)
  const r = rng(seed)
  ctx.fillStyle = '#8c8063'; ctx.fillRect(0, 0, 256, 512)
  for (let x = 0; x < 256; x += 32) {
    ctx.fillStyle = 'rgba(70,60,40,0.35)'; ctx.fillRect(x, 0, 10, 512)
    ctx.fillStyle = 'rgba(150,135,100,0.25)'; ctx.fillRect(x + 14, 0, 4, 512)
  }
  for (let y = 16; y < 512; y += 42)
    for (let x = 16; x < 256; x += 32) {
      ctx.fillStyle = 'rgba(90,40,40,0.35)'
      ctx.beginPath(); ctx.arc(x + ((y / 42) % 2) * 16, y, 4, 0, Math.PI * 2); ctx.fill()
    }
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(0, 512 - 18, 256, 18)
  noise(ctx, 256, 512, r, 0.08, 6000)
  stains(ctx, 256, 512, r, 18, '50,35,10', 0.3)
  drips(ctx, 256, 512, r, 14)
  // peeling strips
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = 'rgba(200,190,160,0.35)'
    ctx.fillRect(r() * 256, r() * 300, 6 + r() * 10, 30 + r() * 80)
  }
  return c
}

// Dark green damask with gold, faded and water-stained: once-expensive wallpaper.
function damask(seed) {
  const [c, ctx] = canvas(256, 512)
  const r = rng(seed)
  ctx.fillStyle = '#28372e'; ctx.fillRect(0, 0, 256, 512)
  for (let y = 0; y < 512; y += 64)
    for (let x = 0; x < 256; x += 64) {
      const ox = ((y / 64) % 2) * 32
      ctx.save(); ctx.translate(x + ox + 32, y + 32)
      ctx.fillStyle = 'rgba(176,146,82,0.32)'
      ctx.beginPath()
      ctx.moveTo(0, -24); ctx.bezierCurveTo(14, -14, 14, 10, 0, 24); ctx.bezierCurveTo(-14, 10, -14, -14, 0, -24); ctx.fill()
      ctx.fillStyle = 'rgba(176,146,82,0.22)'
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
  const dado = 512 - 512 / 3
  ctx.fillStyle = '#3a2618'; ctx.fillRect(0, dado, 256, 512 - dado) // wood wainscot
  for (let x = 0; x < 256; x += 64) { ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 3; ctx.strokeRect(x + 8, dado + 12, 48, 512 - dado - 40) }
  ctx.fillStyle = '#b0925a'; ctx.fillRect(0, dado - 6, 256, 6) // gilt rail
  ctx.fillStyle = '#1e140c'; ctx.fillRect(0, 512 - 20, 256, 20)
  noise(ctx, 256, 512, r, 0.08, 6000)
  stains(ctx, 256, 512, r, 14, '30,25,10', 0.3)
  drips(ctx, 256, 512, r, 10, '20,15,5')
  return c
}

function marble(seed, base = '#d9d6cf', tile = 0) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = base; ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 26; i++) {
    ctx.strokeStyle = `rgba(90,90,95,${0.08 + r() * 0.22})`; ctx.lineWidth = 0.5 + r() * 2
    ctx.beginPath(); ctx.moveTo(r() * 256, r() * 256)
    ctx.bezierCurveTo(r() * 256, r() * 256, r() * 256, r() * 256, r() * 256, r() * 256); ctx.stroke()
  }
  if (tile) { ctx.strokeStyle = 'rgba(60,55,50,0.6)'; ctx.lineWidth = 2; for (let i = 0; i <= 256; i += 256 / tile) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke() } }
  stains(ctx, 256, 256, r, 5, '60,50,20', 0.18)
  noise(ctx, 256, 256, r, 0.04, 3000)
  return c
}

function tiles(seed, color, grout, n = 4) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = grout; ctx.fillRect(0, 0, 256, 256)
  const s = 256 / n
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const v = 0.92 + r() * 0.08
      ctx.fillStyle = color
      ctx.globalAlpha = v
      ctx.fillRect(i * s + 2, j * s + 2, s - 4, s - 4)
      ctx.globalAlpha = 1
      if (r() < 0.12) { // cracked tile
        ctx.strokeStyle = 'rgba(40,40,40,0.5)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(i * s + r() * s, j * s); ctx.lineTo(i * s + r() * s, j * s + s); ctx.stroke()
      }
    }
  stains(ctx, 256, 256, r, 10, '60,50,20', 0.25)
  noise(ctx, 256, 256, r, 0.05, 3000)
  return c
}

function checker(seed) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) {
      ctx.fillStyle = (i + j) % 2 ? '#1d1c1a' : '#b9b2a2'
      ctx.fillRect(i * 128, j * 128, 128, 128)
    }
  for (let i = 0; i < 40; i++) { // marble veins
    ctx.strokeStyle = `rgba(120,120,120,${r() * 0.3})`
    ctx.beginPath(); ctx.moveTo(r() * 256, r() * 256)
    ctx.bezierCurveTo(r() * 256, r() * 256, r() * 256, r() * 256, r() * 256, r() * 256); ctx.stroke()
  }
  stains(ctx, 256, 256, r, 8, '40,30,10', 0.3)
  return c
}

function planks(seed, base) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = base; ctx.fillRect(0, 0, 256, 256)
  const rows = 8
  for (let j = 0; j < rows; j++) {
    const y = j * 32
    let x = -r() * 128
    while (x < 256) {
      const len = 90 + r() * 90
      const l = 0.85 + r() * 0.3
      ctx.fillStyle = `rgba(${Math.floor(90 * l)},${Math.floor(60 * l)},${Math.floor(35 * l)},0.6)`
      ctx.fillRect(x, y, len, 32)
      ctx.fillStyle = 'rgba(20,12,5,0.8)'; ctx.fillRect(x, y, 2, 32)
      for (let k = 0; k < 6; k++) {
        ctx.strokeStyle = `rgba(40,25,10,${r() * 0.25})`
        ctx.beginPath(); ctx.moveTo(x, y + r() * 32); ctx.lineTo(x + len, y + r() * 32); ctx.stroke()
      }
      x += len
    }
    ctx.fillStyle = 'rgba(15,10,5,0.9)'; ctx.fillRect(0, y, 256, 2)
  }
  stains(ctx, 256, 256, r, 8, '20,15,5', 0.35)
  noise(ctx, 256, 256, r, 0.08, 4000)
  return c
}

function carpet(seed) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = '#4a1414'; ctx.fillRect(0, 0, 256, 256)
  ctx.strokeStyle = 'rgba(150,110,40,0.35)'; ctx.lineWidth = 3
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      ctx.beginPath()
      ctx.moveTo(i * 64 + 32, j * 64 + 8); ctx.lineTo(i * 64 + 56, j * 64 + 32)
      ctx.lineTo(i * 64 + 32, j * 64 + 56); ctx.lineTo(i * 64 + 8, j * 64 + 32); ctx.closePath(); ctx.stroke()
    }
  noise(ctx, 256, 256, r, 0.15, 12000)
  stains(ctx, 256, 256, r, 10, '10,5,0', 0.45)
  return c
}

function concrete(seed, base = '#77736c') {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = base; ctx.fillRect(0, 0, 256, 256)
  noise(ctx, 256, 256, r, 0.12, 14000)
  noise(ctx, 256, 256, r, 0.06, 6000, true)
  stains(ctx, 256, 256, r, 12, '30,30,25', 0.25)
  return c
}

function brick(seed) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = '#3b3430'; ctx.fillRect(0, 0, 256, 256)
  const bw = 32, bh = 12.8 // 8 bricks across 2 m, 20 rows over 1.5 m (wraps)
  for (let j = 0; j < 20; j++)
    for (let i = -1; i < 9; i++) {
      const x = i * bw + (j % 2) * bw / 2, y = j * bh
      const l = 0.7 + r() * 0.4
      ctx.fillStyle = `rgb(${Math.floor(110 * l)},${Math.floor(45 * l)},${Math.floor(35 * l)})`
      ctx.fillRect(x + 1.5, y + 1.5, bw - 3, bh - 3)
    }
  noise(ctx, 256, 256, r, 0.12, 6000)
  stains(ctx, 256, 256, r, 10, '10,10,10', 0.35)
  return c
}

function asphalt(seed) {
  const c = concrete(seed, '#2b2b2d')
  const ctx = c.getContext('2d')
  const r = rng(seed + 1)
  stains(ctx, 256, 256, r, 10, '0,0,0', 0.4)
  return c
}

function paving(seed) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = '#5c5a55'; ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) {
      ctx.fillStyle = `rgba(${90 + r() * 20},${88 + r() * 20},${82 + r() * 20},1)`
      ctx.fillRect(i * 128 + 2, j * 128 + 2, 124, 124)
    }
  noise(ctx, 256, 256, r, 0.12, 8000)
  stains(ctx, 256, 256, r, 6, '10,10,5', 0.3)
  return c
}

function ceiling(seed) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = '#a7a194'; ctx.fillRect(0, 0, 256, 256)
  noise(ctx, 256, 256, r, 0.05, 5000)
  stains(ctx, 256, 256, r, 6, '90,60,20', 0.35, 0.35)
  return c
}

function doorTex(seed, base) {
  const [c, ctx] = canvas(128, 256)
  const r = rng(seed)
  ctx.fillStyle = base; ctx.fillRect(0, 0, 128, 256)
  ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = 4
  ctx.strokeRect(18, 18, 92, 100); ctx.strokeRect(18, 136, 92, 100)
  noise(ctx, 128, 256, r, 0.1, 2500)
  stains(ctx, 128, 256, r, 6, '20,10,0', 0.3)
  return c
}

function metal(seed) {
  const [c, ctx] = canvas(256)
  const r = rng(seed)
  ctx.fillStyle = '#7d7f80'; ctx.fillRect(0, 0, 256, 256)
  for (let y = 0; y < 256; y++) {
    ctx.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},${r() * 0.06})`
    ctx.fillRect(0, y, 256, 1)
  }
  stains(ctx, 256, 256, r, 6, '40,30,20', 0.3)
  return c
}

function roofTar(seed) {
  const c = concrete(seed, '#3a3834')
  const ctx = c.getContext('2d')
  const r = rng(seed + 3)
  for (let i = 0; i < 2500; i++) {
    ctx.fillStyle = `rgba(${150 + r() * 60},${140 + r() * 60},${120 + r() * 60},${r() * 0.25})`
    ctx.fillRect(r() * 256, r() * 256, 2, 2)
  }
  return c
}

// ---------------------------------------------------------------------------

export function createMaterials(quality = 'high') {
  const M = {}
  const std = (name, opts, ts = [2, 2]) => {
    const m = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0, ...opts })
    m.userData.ts = ts // metres per texture repeat (u, v) for world-space UVs
    m.name = name
    M[name] = m
    return m
  }
  std('brick', { map: toTexture(brick(1)) }, [2, 1.5])
  std('concrete', { map: toTexture(concrete(2)) }, [2, 2])
  std('stairConcrete', { map: toTexture(concrete(22, '#6a675f')) }, [1.5, 1.5])
  std('corridorPaint', { map: toTexture(wallPaint(3, '#76735a', '#38402f')) }, [2, 3])
  std('lobbyPaint', { map: toTexture(wallPaint(4, '#7b6f5a', '#3d2c22')) }, [2, 3])
  std('stairPaint', { map: toTexture(wallPaint(5, '#7c8284', '#4b5a5f')) }, [2, 3])
  std('utilityPaint', { map: toTexture(wallPaint(6, '#6f706b', '#545650', false)) }, [2, 3])
  std('wallpaper', { map: toTexture(wallpaper(7)) }, [1.2, 3])
  std('kitchenPaint', { map: toTexture(wallPaint(8, '#a19a72', '#7c745a')) }, [2, 3])
  std('luxWall', { map: toTexture(damask(30)) }, [1.0, 3])
  std('marble', { map: toTexture(marble(31, '#d9d6cf', 2)), roughness: 0.25 }, [1.6, 1.6])
  std('marbleWall', { map: toTexture(marble(32, '#cfcac0', 2)), roughness: 0.3 }, [1.2, 1.2])
  std('velvet', { color: 0x4a1622, roughness: 1 })
  std('gold', { color: 0xb8954a, metalness: 0.9, roughness: 0.3 })
  std('piano', { color: 0x070708, metalness: 0.2, roughness: 0.15 })
  std('wallTile', { map: toTexture(tiles(9, '#d8d6cc', '#6b6a62')), roughness: 0.45 }, [0.6, 0.6])
  std('floorTile', { map: toTexture(tiles(10, '#9a9686', '#3a3a34', 3)), roughness: 0.6 }, [0.9, 0.9])
  std('lobbyFloor', { map: toTexture(checker(11)), roughness: 0.4 }, [1.2, 1.2])
  std('wood', { map: toTexture(planks(12, '#5b3d23')), roughness: 0.75 }, [2, 2])
  std('carpet', { map: toTexture(carpet(13)), roughness: 1 }, [1.6, 1.6])
  std('ceiling', { map: toTexture(ceiling(14)) }, [3, 3])
  std('roof', { map: toTexture(roofTar(15)) }, [3, 3])
  std('asphalt', { map: toTexture(asphalt(16)) }, [4, 4])
  std('paving', { map: toTexture(paving(17)) }, [2, 2])
  std('grass', { map: toTexture(concrete(18, '#2c3324')) }, [3, 3])
  std('metal', { map: toTexture(metal(19)), metalness: 0.6, roughness: 0.45 }, [1.5, 1.5])
  std('trim', { color: 0x3a2a1c, roughness: 0.7 })
  std('frame', { color: 0xd8d2c0, roughness: 0.6 })
  std('darkWood', { color: 0x3b2616, roughness: 0.7 })
  std('lightWood', { color: 0x8a6a45, roughness: 0.7 })
  std('fabric', { color: 0x44513f, roughness: 1 })
  std('fabricRed', { color: 0x5a2222, roughness: 1 })
  std('mattress', { color: 0xb8b2a4, roughness: 1 })
  std('blanket', { color: 0x3c3f5c, roughness: 1 })
  std('ceramic', { color: 0xe6e4dc, roughness: 0.25 })
  std('steel', { color: 0x9a9c9e, metalness: 0.8, roughness: 0.35 })
  std('blackPlastic', { color: 0x141414, roughness: 0.5 })
  std('appliance', { color: 0xcfcbbf, roughness: 0.4 })
  std('paper', { color: 0xe8e0c8, roughness: 1, side: THREE.DoubleSide })
  std('cardboard', { color: 0x8a6c45, roughness: 1 })
  std('rug', { color: 0x5a3d2a, roughness: 1 })
  std('plant', { color: 0x2c3a1e, roughness: 1 })
  std('breaker', { color: 0x5b6266, metalness: 0.5, roughness: 0.5 })
  std('red', { color: 0x8a1010, roughness: 0.5 })
  std('brass', { color: 0xb08d3a, metalness: 0.9, roughness: 0.35 })
  std('mirror', { color: 0x99a3a8, metalness: 1, roughness: 0.05 })
  std('screen', { color: 0x050607, roughness: 0.2 })
  std('tree', { color: 0x1f241a, roughness: 1 })
  std('bark', { color: 0x2c2118, roughness: 1 })
  std('carPaint', { color: 0x1d2a33, metalness: 0.6, roughness: 0.4 })
  std('distant', { color: 0x15171b, roughness: 1 })
  M.doorWood = std('doorWood', { map: toTexture(doorTex(20, '#4a3020')) })
  M.doorPaint = std('doorPaint', { map: toTexture(doorTex(21, '#6f7563')) })
  M.doorMetal = std('doorMetal', { map: toTexture(doorTex(23, '#59605f')), metalness: 0.4, roughness: 0.5 })

  M.glass = new THREE.MeshStandardMaterial({
    color: 0x223038, metalness: 0.9, roughness: 0.08, transparent: true, opacity: 0.35, depthWrite: false,
  })
  M.glass.userData.ts = [1, 1]
  M.windowLit = new THREE.MeshBasicMaterial({ color: 0xd8b060 })
  M.windowLit.userData.ts = [1, 1]
  M.bulbOn = new THREE.Color(0xfff0c8)
  M.bulbOff = new THREE.Color(0x222222)
  M.emissive = new THREE.MeshBasicMaterial({ color: 0xffffff })
  for (const m of Object.values(M)) if (m.isMaterial && !m.userData.ts) m.userData.ts = [1, 1]
  return M
}

// Small text plates (apartment numbers, signs).
export function textTexture(text, { w = 256, h = 128, bg = '#2a2418', fg = '#c9b27a', font = 'bold 72px Georgia', border = true } = {}) {
  const [c, ctx] = canvas(w, h)
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)
  if (border) { ctx.strokeStyle = fg; ctx.lineWidth = 6; ctx.strokeRect(8, 8, w - 16, h - 16) }
  ctx.fillStyle = fg; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(text, w / 2, h / 2 + 4)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function makeCanvas(w, h) { return canvas(w, h) }
