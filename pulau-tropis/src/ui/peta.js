import { WORLD } from '../world/world.js'
import { ISLANDS, CITY, KERATON, inRect } from '../world/kencana/layout.js'

// Peta dunia (tombol "Peta") dan spanduk nama wilayah saat prajurit memasuki pulau/kota baru.

const M_PER_PX = 2 // 1 piksel gambar dasar = 2 m

const LABELS = [
  { text: 'Pulau Tropis', x: 10, z: -175, size: 15 },
  { text: 'Gunung', x: 70, z: -48, size: 11 },
  { text: 'Kotaraja Kencana', x: -560, z: -78, size: 14 },
  { text: 'Pulau Kencana', x: -560, z: 222, size: 13 },
  { text: 'Pulau Sawah', x: -660, z: -425, size: 13 },
  { text: 'Pulau Nelayan', x: -760, z: 452, size: 13 },
  { text: 'Pura Segara', x: -890, z: 58, size: 12 },
  { text: 'Jembatan Agung', x: -252, z: 24, size: 11 },
  { text: 'Pelabuhan', x: -553, z: 322, size: 11 },
]

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = t => Math.min(1, Math.max(0, t))

// Wilayah tempat (x, z) berada: { id, name, sub } atau null (di laut)
export function regionAt(x, z, ground, spans) {
  if (inRect(x, z, KERATON)) return { id: 'keraton', name: 'Keraton Kencana', sub: 'Istana Raja Kencana' }
  if (inRect(x, z, CITY, 1)) return { id: 'kotaraja', name: 'Kotaraja Kencana', sub: 'Ibu kota Kerajaan Kencana' }
  for (const b of spans) {
    const along = b.axis === 'x' ? x : z
    const across = b.axis === 'x' ? z : x
    if (Math.abs(across - b.at) < b.width && along > Math.min(b.a, b.b) && along < Math.max(b.a, b.b))
      return { id: `jembatan-${b.id}`, name: b.name, sub: b.id === 'agung' ? 'Penghubung Pulau Tropis dan Kerajaan Kencana' : 'Kepulauan Kencana' }
  }
  if (ground.heightAt(x, z) < -1.2) return null
  if (Math.hypot(x, z) < 340) return { id: 'tropis', name: 'Pulau Tropis', sub: 'Pulau tengah' }
  let best = null
  let bestD = Infinity
  for (const isl of ISLANDS) {
    const d = Math.hypot(x - isl.x, z - isl.z) / isl.r
    if (d < bestD) {
      bestD = d
      best = isl
    }
  }
  if (!best || bestD > 1.35) return null
  const SUB = { kencana: 'Kepulauan Kencana', sawah: 'Lumbung padi kerajaan', nelayan: 'Kampung nelayan', pura: 'Pura di puncak bukit' }
  return { id: best.id, name: best.id === 'pura' ? 'Pura Segara' : best.name, sub: SUB[best.id] }
}

// warna peta untuk tinggi tanah h (+ cat jalan/sawah/lantai dari masker wilayah)
function colorAt(h, mask, out) {
  let r
  let g
  let b
  if (h < 0) {
    const d = clamp01(-h / 14)
    r = lerp(86, 22, d)
    g = lerp(205, 78, d)
    b = lerp(200, 140, d)
  } else if (h < 2.2) {
    r = 226
    g = 208
    b = 156
  } else if (h < 40) {
    const t = clamp01((h - 2.2) / 38)
    r = lerp(104, 64, t)
    g = lerp(168, 118, t)
    b = lerp(72, 52, t)
  } else {
    const t = clamp01((h - 40) / 40)
    r = lerp(120, 196, t)
    g = lerp(118, 190, t)
    b = lerp(100, 182, t)
  }
  if (mask) {
    const mix = (k, cr, cg, cb) => {
      r = lerp(r, cr, k)
      g = lerp(g, cg, k)
      b = lerp(b, cb, k)
    }
    mix(mask.rumput, 120, 196, 84)
    mix(mask.sawah, 168, 210, 80)
    mix(mask.jalan, 214, 184, 132)
    mix(mask.batu, 214, 208, 196)
  }
  out[0] = r
  out[1] = g
  out[2] = b
}

export function createWorldMap({ ground, plan, region, camps = [] }) {
  const panel = document.getElementById('peta')
  const canvas = document.getElementById('peta-kanvas')
  const ctx = canvas.getContext('2d')
  const W = Math.round(WORLD.width / M_PER_PX)
  const H = Math.round(WORLD.depth / M_PER_PX)
  let base = null
  const px = x => (x - WORLD.minX) / M_PER_PX
  const pz = z => (z - WORLD.minZ) / M_PER_PX

  // gambar dasar dibuat sekali, saat peta pertama kali dibuka
  function drawBase() {
    const c = document.createElement('canvas')
    c.width = W
    c.height = H
    const g = c.getContext('2d')
    const img = g.createImageData(W, H)
    const col = [0, 0, 0]
    for (let j = 0; j < H; j++)
      for (let i = 0; i < W; i++) {
        const x = WORLD.minX + (i + 0.5) * M_PER_PX
        const z = WORLD.minZ + (j + 0.5) * M_PER_PX
        colorAt(ground.heightAt(x, z), region.at(x, z), col)
        const k = (j * W + i) * 4
        img.data[k] = col[0]
        img.data[k + 1] = col[1]
        img.data[k + 2] = col[2]
        img.data[k + 3] = 255
      }
    g.putImageData(img, 0, 0)
    // bangunan: jejak gelap kemerahan
    g.fillStyle = 'rgba(120, 52, 36, 0.85)'
    for (const b of plan.blocked) {
      g.save()
      g.translate(px(b.x), pz(b.z))
      g.rotate(-(b.rot || 0))
      g.fillRect(-b.hx / M_PER_PX, -b.hz / M_PER_PX, (2 * b.hx) / M_PER_PX, (2 * b.hz) / M_PER_PX)
      g.restore()
    }
    // jembatan
    g.strokeStyle = '#f4efe2'
    g.lineCap = 'butt'
    for (const s of plan.spans) {
      g.lineWidth = Math.max(2, s.width / M_PER_PX)
      g.beginPath()
      if (s.axis === 'x') {
        g.moveTo(px(s.a), pz(s.at))
        g.lineTo(px(s.b), pz(s.at))
      } else {
        g.moveTo(px(s.at), pz(s.a))
        g.lineTo(px(s.at), pz(s.b))
      }
      g.stroke()
    }
    base = c
  }

  function label(text, x, y, size, scale) {
    ctx.font = `600 ${Math.round(size * scale)}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.lineWidth = 3 * scale
    ctx.strokeStyle = 'rgba(0, 30, 45, 0.85)'
    ctx.strokeText(text, x, y)
    ctx.fillStyle = '#fff'
    ctx.fillText(text, x, y)
  }

  function draw(player, heading) {
    if (!base) drawBase()
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    const s = canvas.width / W
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(base, 0, 0, canvas.width, canvas.height)
    const scale = Math.max(0.8, canvas.width / 900)
    // perkemahan orc
    for (const c of camps) {
      ctx.fillStyle = '#e8483a'
      ctx.beginPath()
      ctx.arc(px(c.x) * s, pz(c.z) * s, 4 * scale, 0, Math.PI * 2)
      ctx.fill()
    }
    for (const l of LABELS) label(l.text, px(l.x) * s, pz(l.z) * s, l.size, scale)
    // prajurit: panah ke arah hadap
    const x = px(player.x) * s
    const y = pz(player.z) * s
    const dx = Math.sin(heading)
    const dy = Math.cos(heading)
    const r = 9 * scale
    ctx.fillStyle = '#ffe14a'
    ctx.strokeStyle = '#1a1206'
    ctx.lineWidth = 2 * scale
    ctx.beginPath()
    ctx.moveTo(x + dx * r * 1.4, y + dy * r * 1.4)
    ctx.lineTo(x - dy * r * 0.8 - dx * r * 0.7, y + dx * r * 0.8 - dy * r * 0.7)
    ctx.lineTo(x - dx * r * 0.25, y - dy * r * 0.25)
    ctx.lineTo(x + dy * r * 0.8 - dx * r * 0.7, y - dx * r * 0.8 - dy * r * 0.7)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    label('Kamu', x, y + 17 * scale, 11, scale)
  }

  return {
    get open() {
      return !panel.hidden
    },
    show(player, heading) {
      panel.hidden = false
      draw(player, heading)
    },
    hide() {
      panel.hidden = true
    },
    // untuk pengujian: warna dasar peta di titik dunia (x, z)
    sample(x, z) {
      if (!base) drawBase()
      const d = base.getContext('2d').getImageData(Math.floor(px(x)), Math.floor(pz(z)), 1, 1).data
      return [d[0], d[1], d[2]]
    },
    size: { width: W, height: H },
  }
}

// Spanduk "memasuki wilayah": nama besar + keterangan, muncul ±3 detik saat wilayah berganti.
// update() → true saat spanduk baru saja ditampilkan
export function createRegionBanner({ ground, spans }) {
  const el = document.getElementById('wilayah')
  const title = el.querySelector('.wilayah-nama')
  const sub = el.querySelector('.wilayah-ket')
  let current = undefined
  let candidate = null
  let stable = 0
  let shown = 0
  let check = 0
  return {
    get current() {
      return current
    },
    update(dt, pos, enabled = true) {
      if (shown > 0) {
        shown -= dt
        if (shown <= 0) el.classList.remove('tampil')
      }
      if ((check -= dt) > 0) return false
      check = 0.25
      const r = regionAt(pos.x, pos.z, ground, spans)
      const id = r ? r.id : null
      if (current === undefined) {
        current = id // wilayah awal tidak diumumkan (petunjuk kontrol sedang tampil)
        return false
      }
      if (id === (current ?? null)) {
        candidate = null
        return false
      }
      if (!candidate || candidate.id !== id) {
        candidate = { id, r }
        stable = 0
        return false
      }
      stable += 0.25
      if (stable < 0.5) return false
      current = id
      candidate = null
      if (!r || !enabled) return false
      title.textContent = r.name
      sub.textContent = r.sub
      el.classList.add('tampil')
      shown = 3.2
      return true // spanduk baru tampil
    },
  }
}

