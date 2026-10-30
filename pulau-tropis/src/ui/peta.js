import { WORLD } from '../world/world.js'
import { ISLANDS, CITY, KERATON, TEGAL, inRect } from '../world/kencana/layout.js'
import { islandDistance } from '../world/kencana/height.js'
import { DIVISIONS } from '../world/kencana/barisan.js'
import { REGIONS as ELF_REGIONS, LANDS as ELF_LANDS, landDistance } from '../world/aeloria/layout.js'
import { REGIONS as FROST_REGIONS, PEAKS as FROST_PEAKS, COLD_X0, landDistance as frostLandDistance, polyInfo } from '../world/frostfall/layout.js'
import { caveFloor } from '../world/frostfall/height.js'

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
  { text: 'Dermaga Timur', x: -318, z: 24, size: 10 },
  { text: 'Dermaga Barat', x: -190, z: 58, size: 10 }, // di bawah dermaganya: label Dermaga Timur dekat
  { text: 'Pelabuhan', x: -553, z: 236, size: 11 },
  { text: 'Pulau Wira', x: -270, z: 620, size: 14 },
  { text: 'Tegal Wira · 25.000 prajurit', x: -270, z: 352, size: 11 },
  { text: 'Aeloria · Kerajaan Elf', x: 10, z: -1105, size: 15 },
  { text: 'Kota Aeloria', x: 10, z: -556, size: 13 },
  { text: 'Benteng Aeloria', x: 10, z: -876, size: 12 },
  { text: 'Lapangan Latihan', x: -220, z: -718, size: 11 },
  { text: 'Padang Pesta', x: 235, z: -718, size: 11 },
  { text: 'Dermaga Perak', x: 54, z: -384, size: 10 },
  { text: 'Dermaga Utara', x: 54, z: -238, size: 10 },
  { text: 'Frostfall · Kerajaan Salju', x: 860, z: -520, size: 15 },
  { text: 'Desa Emberwick', x: 692, z: -112, size: 12 },
  { text: 'Kastel Frostfall', x: 1000, z: -390, size: 12 },
  { text: 'Lembah Beku', x: 600, z: 70, size: 11 },
  { text: 'Lembah Atas', x: 1058, z: -48, size: 11 },
  { text: 'Gua Es', x: 1112, z: -238, size: 11 },
  { text: 'Hutan Pinus Salju', x: 860, z: 330, size: 12 },
  { text: 'Air Terjun Beku', x: 930, z: -112, size: 10 },
  { text: 'Dermaga Frostfall', x: 470, z: 50, size: 10 },
  { text: 'Dermaga Fajar', x: 250, z: 62, size: 10 },
  ...FROST_PEAKS.filter(p => p.name).map(p => ({ text: p.name, x: p.x, z: p.z, size: 10 })),
]

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = t => Math.min(1, Math.max(0, t))

// Wilayah tempat (x, z) berada: { id, name, sub } atau null (di laut)
export function regionAt(x, z, ground, spans) {
  // Frostfall (timur): gua, kawasan, lalu daratannya
  if (x > COLD_X0) {
    if (caveFloor(x, z) !== null) return { id: 'gua', name: 'Gua Es Kristal', sub: 'Gua beku di dalam gunung · kristal bercahaya' }
    for (const r of FROST_REGIONS) {
      if (r.rect && inRect(x, z, r.rect)) return { id: r.id, name: r.name, sub: r.sub }
      if (r.line && polyInfo(r.line, x, z).d < r.width) return { id: r.id, name: r.name, sub: r.sub }
    }
    if (frostLandDistance(x, z) < 1.05 && ground.heightAt(x, z) > -1.2)
      return ground.heightAt(x, z) > 80
        ? { id: 'pegunungan', name: 'Pegunungan Frostfall', sub: 'Puncak bersalju & tebing es' }
        : { id: 'frostfall', name: 'Kerajaan Frostfall', sub: 'Negeri pegunungan salju di timur · Lembah Beku' }
  }
  // Aeloria (kerajaan elf di utara): kawasan dulu, lalu daratannya
  if (z < -330)
    for (const r of ELF_REGIONS) {
      if (r.rect && inRect(x, z, r.rect, 1)) return { id: r.id, name: r.name, sub: r.sub }
      if (r.land && landDistance(ELF_LANDS.find(l => l.id === r.land), x, z) < 1.02 && ground.heightAt(x, z) > -1.2) return { id: r.id, name: r.name, sub: r.sub }
    }
  if (inRect(x, z, KERATON)) return { id: 'keraton', name: 'Keraton Kencana', sub: 'Istana Raja Kencana' }
  if (inRect(x, z, CITY, 1)) return { id: 'kotaraja', name: 'Kotaraja Kencana', sub: 'Ibu kota Kerajaan Kencana' }
  if (inRect(x, z, TEGAL)) return { id: 'tegal', name: 'Tegal Wira', sub: '25.000 prajurit Kencana siap tempur' }
  for (const b of spans) {
    const along = b.axis === 'x' ? x : z
    const across = b.axis === 'x' ? z : x
    if (Math.abs(across - b.at) < b.width && along > Math.min(b.a, b.b) && along < Math.max(b.a, b.b))
      return { id: `jembatan-${b.id}`, name: b.name, sub: 'Kepulauan Kencana' }
  }
  if (ground.heightAt(x, z) < -1.2) return null
  if (Math.hypot(x, z) < 340) return { id: 'tropis', name: 'Pulau Tropis', sub: 'Pulau tengah' }
  let best = null
  let bestD = Infinity
  for (const isl of ISLANDS) {
    const d = islandDistance(isl, x, z)
    if (d < bestD) {
      bestD = d
      best = isl
    }
  }
  if (!best || bestD > 1.35) return null
  const SUB = { kencana: 'Kepulauan Kencana', sawah: 'Lumbung padi kerajaan', nelayan: 'Kampung nelayan', pura: 'Pura di puncak bukit', wira: 'Markas bala tentara Kencana' }
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

// warna peta Frostfall: laut dingin, salju (makin tinggi makin putih), batu di tebing, es, jalan, lantai batu
function frostColorAt(h, slope, mask, out) {
  let r
  let g
  let b
  if (h < 0) {
    const d = clamp01(-h / 14)
    r = lerp(96, 20, d)
    g = lerp(150, 60, d)
    b = lerp(170, 110, d)
  } else if (h < 1.8) {
    r = 150
    g = 148
    b = 146
  } else {
    const t = clamp01(h / 260)
    r = lerp(222, 250, t)
    g = lerp(228, 252, t)
    b = lerp(238, 255, t)
    if (slope > 1.0) {
      const k = clamp01((slope - 1.0) / 0.8)
      r = lerp(r, 112, k)
      g = lerp(g, 114, k)
      b = lerp(b, 124, k)
    }
  }
  if (mask) {
    const mix = (k, cr, cg, cb) => {
      r = lerp(r, cr, k)
      g = lerp(g, cg, k)
      b = lerp(b, cb, k)
    }
    mix(mask.gua * 0.7, 70, 110, 160)
    mix(mask.es, 140, 196, 228)
    mix(mask.jalan, 176, 160, 140)
    mix(mask.batu, 160, 162, 170)
  }
  out[0] = r
  out[1] = g
  out[2] = b
}

// plans & regions: rencana dan masker semua wilayah (Kencana, Aeloria); frost: masker Frostfall
// (warna salju / es / gua sendiri); shops: toko yang bisa dibeli
export function createWorldMap({ ground, plans, regions, frost = null, camps = [], shops = [] }) {
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
        let m = null
        for (const r of regions) if (!m) m = r.at(x, z)
        if (frost && x > COLD_X0) frostColorAt(ground.heightAt(x, z), ground.slopeAt(x, z), frost.at(x, z), col)
        else colorAt(ground.heightAt(x, z), m, col)
        const k = (j * W + i) * 4
        img.data[k] = col[0]
        img.data[k + 1] = col[1]
        img.data[k + 2] = col[2]
        img.data[k + 3] = 255
      }
    g.putImageData(img, 0, 0)
    // bangunan: jejak gelap kemerahan
    g.fillStyle = 'rgba(120, 52, 36, 0.85)'
    for (const b of plans.flatMap(p => p.blocked)) {
      g.save()
      g.translate(px(b.x), pz(b.z))
      g.rotate(-(b.rot || 0))
      g.fillRect(-b.hx / M_PER_PX, -b.hz / M_PER_PX, (2 * b.hx) / M_PER_PX, (2 * b.hz) / M_PER_PX)
      g.restore()
    }
    // barisan bala tentara: kotak berwarna pasukannya
    for (const b of plans.flatMap(p => p.army?.blocks ?? [])) {
      g.fillStyle = DIVISIONS[b.type].map
      g.fillRect(px(b.x0), pz(b.z0), (b.x1 - b.x0) / M_PER_PX, (b.z1 - b.z0) / M_PER_PX)
    }
    // jembatan
    g.strokeStyle = '#f4efe2'
    g.lineCap = 'butt'
    for (const s of plans.flatMap(p => p.spans)) {
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
    // dermaga (kayu / batu putih)
    for (const d of plans.flatMap(p => p.docks ?? [])) {
      g.strokeStyle = d.elf ? '#f4efe2' : '#b98a55'
      g.lineWidth = Math.max(2, d.width / M_PER_PX)
      g.beginPath()
      if (d.axis === 'x') {
        g.moveTo(px(d.s0), pz(d.at))
        g.lineTo(px(d.s1), pz(d.at))
      } else {
        g.moveTo(px(d.at), pz(d.s0))
        g.lineTo(px(d.at), pz(d.s1))
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

  // marks: penanda tambahan [{ x, z, label? }] (mis. perahu pemain): titik toska, berlabel bila ada label
  function draw(player, heading, marks) {
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
    // toko (pasar & pandai besi Aeloria): lingkaran emas
    for (const t of shops) {
      ctx.fillStyle = '#ffd34d'
      ctx.strokeStyle = '#3a2a06'
      ctx.lineWidth = 1.5 * scale
      ctx.beginPath()
      ctx.arc(px(t.x) * s, pz(t.z) * s, 3.5 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
    for (const l of LABELS) label(l.text, px(l.x) * s, pz(l.z) * s, l.size, scale)
    for (const m of marks) {
      ctx.fillStyle = '#3fd0d4'
      ctx.strokeStyle = '#06292b'
      ctx.lineWidth = 1.5 * scale
      ctx.beginPath()
      ctx.arc(px(m.x) * s, pz(m.z) * s, 4.5 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      if (m.label) label(m.label, px(m.x) * s, pz(m.z) * s - 12 * scale, 10, scale)
    }
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
    show(player, heading, marks = []) {
      panel.hidden = false
      draw(player, heading, marks)
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

