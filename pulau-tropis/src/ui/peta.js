import { WORLD } from '../world/world.js'
import { ISLANDS, CITY, KERATON, TEGAL, inRect } from '../world/kencana/layout.js'
import { islandDistance } from '../world/kencana/height.js'
import { DIVISIONS } from '../world/kencana/barisan.js'
import { REGIONS as ELF_REGIONS, LANDS as ELF_LANDS, landDistance } from '../world/aeloria/layout.js'

// Peta dunia (tombol "Peta") dan spanduk nama wilayah saat prajurit memasuki pulau/kota baru.

const M_PER_PX = 2 // 1 piksel gambar dasar untuk pengujian (sample) = 2 m
const PIX = 1.5 // px CSS per piksel peta: peta digambar sebagai pixel art

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
]

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = t => Math.min(1, Math.max(0, t))

// Wilayah tempat (x, z) berada: { id, name, sub } atau null (di laut)
export function regionAt(x, z, ground, spans) {
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

// warna peta untuk tinggi tanah h (+ cat jalan/sawah/lantai dari masker wilayah), dibulatkan ke beberapa
// tingkat seperti peta pixel art: laut 4 pita kedalaman, rumput & batu 3 pita ketinggian
const band = (t, n) => Math.min(n - 1, Math.floor(t * n)) / (n - 1)
function colorAt(h, mask, out) {
  let r
  let g
  let b
  if (h < 0) {
    const d = band(clamp01(-h / 14), 4)
    r = lerp(86, 22, d)
    g = lerp(205, 78, d)
    b = lerp(200, 140, d)
  } else if (h < 2.2) {
    r = 226
    g = 208
    b = 156
  } else if (h < 40) {
    const t = band(clamp01((h - 2.2) / 38), 3)
    r = lerp(104, 64, t)
    g = lerp(168, 118, t)
    b = lerp(72, 52, t)
  } else {
    const t = band(clamp01((h - 40) / 40), 3)
    r = lerp(120, 196, t)
    g = lerp(118, 190, t)
    b = lerp(100, 182, t)
  }
  if (mask) {
    // cat wilayah bertepi tegas: setengah tertutup = penuh
    const paint = (k, cr, cg, cb) => {
      if (k < 0.5) return
      r = cr
      g = cg
      b = cb
    }
    paint(mask.rumput, 120, 196, 84)
    paint(mask.sawah, 168, 210, 80)
    paint(mask.jalan, 214, 184, 132)
    paint(mask.batu, 214, 208, 196)
  }
  out[0] = r
  out[1] = g
  out[2] = b
}

// plans & regions: rencana dan masker semua wilayah (Kencana, Aeloria); shops: toko yang bisa dibeli
export function createWorldMap({ ground, plans, regions, camps = [], shops = [] }) {
  const panel = document.getElementById('peta')
  const canvas = document.getElementById('peta-kanvas')
  const ctx = canvas.getContext('2d')
  const W = Math.round(WORLD.width / M_PER_PX)
  const H = Math.round(WORLD.depth / M_PER_PX)
  const bases = new Map() // "kolom×baris" → kanvas gambar dasar
  let last = null // isi peta terakhir (digambar ulang setelah huruf piksel termuat)

  // gambar dasar pixel art cols × rows piksel: warna tanah tiap piksel dari tinggi & masker wilayah,
  // lalu bangunan, barisan pasukan, jembatan, dan dermaga digambar ke lapisan terpisah dan dibulatkan
  // (piksel terisi penuh atau kosong — tanpa tepi halus)
  function drawBase(cols, rows) {
    const key = `${cols}×${rows}`
    if (bases.has(key)) return bases.get(key)
    const mx = WORLD.width / cols
    const mz = WORLD.depth / rows
    const c = document.createElement('canvas')
    c.width = cols
    c.height = rows
    const g = c.getContext('2d')
    const img = g.createImageData(cols, rows)
    const col = [0, 0, 0]
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const x = WORLD.minX + (i + 0.5) * mx
        const z = WORLD.minZ + (j + 0.5) * mz
        let m = null
        for (const r of regions) if (!m) m = r.at(x, z)
        colorAt(ground.heightAt(x, z), m, col)
        const k = (j * cols + i) * 4
        img.data[k] = col[0]
        img.data[k + 1] = col[1]
        img.data[k + 2] = col[2]
        img.data[k + 3] = 255
      }
    // lapisan benda buatan, dalam satuan meter dunia
    const o = document.createElement('canvas')
    o.width = cols
    o.height = rows
    const og = o.getContext('2d', { willReadFrequently: true })
    og.scale(1 / mx, 1 / mz)
    og.translate(-WORLD.minX, -WORLD.minZ)
    // bangunan: jejak gelap kemerahan
    og.fillStyle = '#783424'
    for (const b of plans.flatMap(p => p.blocked)) {
      og.save()
      og.translate(b.x, b.z)
      og.rotate(-(b.rot || 0))
      og.fillRect(-b.hx, -b.hz, 2 * b.hx, 2 * b.hz)
      og.restore()
    }
    // barisan bala tentara: kotak berwarna pasukannya
    for (const b of plans.flatMap(p => p.army?.blocks ?? [])) {
      og.fillStyle = DIVISIONS[b.type].map
      og.fillRect(b.x0, b.z0, b.x1 - b.x0, b.z1 - b.z0)
    }
    // jembatan & dermaga: paling tipis 1,5 piksel peta supaya tetap bersambung
    const thin = 1.5 * Math.max(mx, mz)
    const line = (axis, at, s0, s1) => {
      og.beginPath()
      if (axis === 'x') {
        og.moveTo(s0, at)
        og.lineTo(s1, at)
      } else {
        og.moveTo(at, s0)
        og.lineTo(at, s1)
      }
      og.stroke()
    }
    og.lineCap = 'butt'
    og.strokeStyle = '#f4efe2'
    for (const s of plans.flatMap(p => p.spans)) {
      og.lineWidth = Math.max(thin, s.width)
      line(s.axis, s.at, s.a, s.b)
    }
    for (const d of plans.flatMap(p => p.docks ?? [])) {
      og.strokeStyle = d.elf ? '#f4efe2' : '#b98a55'
      og.lineWidth = Math.max(thin, d.width)
      line(d.axis, d.at, d.s0, d.s1)
    }
    const ov = og.getImageData(0, 0, cols, rows).data
    for (let k = 0; k < cols * rows * 4; k += 4)
      if (ov[k + 3] >= 96) {
        img.data[k] = ov[k]
        img.data[k + 1] = ov[k + 1]
        img.data[k + 2] = ov[k + 2]
      }
    g.putImageData(img, 0, 0)
    if (bases.size > 3) bases.delete(bases.keys().next().value)
    bases.set(key, c)
    return c
  }

  // tulisan berhuruf piksel bergaris luar piksel (8 arah)
  function label(text, x, y, size, scale) {
    ctx.font = `600 ${Math.round(size * scale)}px 'Pixelify Sans', system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const o = Math.max(1, Math.round(scale * 1.2))
    ctx.fillStyle = 'rgb(0, 30, 45)'
    for (const [dx, dy] of [[-o, 0], [o, 0], [0, -o], [0, o], [-o, -o], [o, -o], [-o, o], [o, o]]) ctx.fillText(text, x + dx, y + dy)
    ctx.fillStyle = '#fff'
    ctx.fillText(text, x, y)
  }

  // marks: penanda tambahan [{ x, z, label? }] (mis. perahu pemain): titik toska, berlabel bila ada label
  function draw(player, heading, marks) {
    last = { player, heading, marks }
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(3, window.devicePixelRatio || 1)
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    // k = piksel layar per piksel peta (bulat: semua piksel peta sama besar)
    const k = Math.max(1, Math.round(PIX * dpr))
    const cols = Math.ceil(canvas.width / k)
    const rows = Math.ceil(canvas.height / k)
    const base = drawBase(cols, rows)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(base, 0, 0, cols * k, rows * k)
    // posisi dunia → piksel peta (pecahan) dan → piksel kanvas
    const mi = x => ((x - WORLD.minX) / WORLD.width) * cols
    const mj = z => ((z - WORLD.minZ) / WORLD.depth) * rows
    const scale = Math.max(0.8, canvas.width / 900)
    // kotak piksel n × n bergaris luar 1 piksel, berpusat di piksel peta tempat (x, z) berada
    const dot = (x, z, n, fill, edge) => {
      const i = Math.floor(mi(x)) - Math.floor(n / 2)
      const j = Math.floor(mj(z)) - Math.floor(n / 2)
      ctx.fillStyle = edge
      ctx.fillRect((i - 1) * k, (j - 1) * k, (n + 2) * k, (n + 2) * k)
      ctx.fillStyle = fill
      ctx.fillRect(i * k, j * k, n * k, n * k)
    }
    // perkemahan orc: kotak merah
    for (const c of camps) dot(c.x, c.z, 2, '#e8483a', '#3a0d08')
    // toko (pasar & pandai besi Aeloria): belah ketupat emas
    for (const t of shops) {
      const i = Math.floor(mi(t.x))
      const j = Math.floor(mj(t.z))
      for (const [r, color] of [[3, '#3a2a06'], [2, '#ffd34d']])
        for (let d = -r; d <= r; d++) {
          const w = r - Math.abs(d)
          ctx.fillStyle = color
          ctx.fillRect((i - w) * k, (j + d) * k, (2 * w + 1) * k, k)
        }
    }
    for (const l of LABELS) label(l.text, (mi(l.x) + 0.5) * k, (mj(l.z) + 0.5) * k, l.size, scale)
    for (const m of marks) {
      dot(m.x, m.z, 3, '#3fd0d4', '#06292b')
      if (m.label) label(m.label, (mi(m.x) + 0.5) * k, (mj(m.z) - 3) * k, 10, scale)
    }
    // prajurit: panah piksel ke arah hadap (bentuk mata panah, diisi per piksel peta + garis luar)
    const cx = mi(player.x)
    const cy = mj(player.z)
    const dx = Math.sin(heading)
    const dy = Math.cos(heading)
    const r = 3.2
    const poly = [
      [cx + dx * r * 1.4, cy + dy * r * 1.4],
      [cx - dy * r * 0.8 - dx * r * 0.7, cy + dx * r * 0.8 - dy * r * 0.7],
      [cx - dx * r * 0.25, cy - dy * r * 0.25],
      [cx + dy * r * 0.8 - dx * r * 0.7, cy - dx * r * 0.8 - dy * r * 0.7],
    ]
    const inside = (px, py) => {
      let c = false
      for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
        const [xa, ya] = poly[a]
        const [xb, yb] = poly[b]
        if (ya > py !== yb > py && px < ((xb - xa) * (py - ya)) / (yb - ya) + xa) c = !c
      }
      return c
    }
    const R = 7
    const i0 = Math.floor(cx) - R
    const j0 = Math.floor(cy) - R
    const cells = []
    for (let j = 0; j <= 2 * R; j++) for (let i = 0; i <= 2 * R; i++) cells.push(inside(i0 + i + 0.5, j0 + j + 0.5))
    const at = (i, j) => i >= 0 && j >= 0 && i <= 2 * R && j <= 2 * R && cells[j * (2 * R + 1) + i]
    for (let j = 0; j <= 2 * R; j++)
      for (let i = 0; i <= 2 * R; i++) {
        if (at(i, j)) ctx.fillStyle = '#ffe14a'
        else if (at(i - 1, j) || at(i + 1, j) || at(i, j - 1) || at(i, j + 1)) ctx.fillStyle = '#1a1206'
        else continue
        ctx.fillRect((i0 + i) * k, (j0 + j) * k, k, k)
      }
    label('Kamu', (cx + 0.5) * k, (cy + 6.5) * k, 11, scale)
  }

  return {
    get open() {
      return !panel.hidden
    },
    show(player, heading, marks = []) {
      panel.hidden = false
      draw(player, heading, marks)
      // huruf piksel belum termuat: gambar ulang begitu siap
      const font = '600 12px "Pixelify Sans"'
      if (document.fonts && !document.fonts.check(font))
        document.fonts.load(font).then(() => {
          if (!panel.hidden && last) draw(last.player, last.heading, last.marks)
        })
    },
    hide() {
      panel.hidden = true
    },
    // untuk pengujian: warna dasar peta di titik dunia (x, z) (gambar dasar 2 m per piksel)
    sample(x, z) {
      const d = drawBase(W, H).getContext('2d').getImageData(Math.floor((x - WORLD.minX) / M_PER_PX), Math.floor((z - WORLD.minZ) / M_PER_PX), 1, 1).data
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

