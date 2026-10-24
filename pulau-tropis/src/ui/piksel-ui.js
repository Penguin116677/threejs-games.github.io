// Tema pixel art untuk UI HTML (warna, bingkai, dan huruf piksel ada di style.css):
// - lingkaran piksel untuk tombol bulat & joystick: variabel CSS --lingkar-D (cakram berdiameter D px),
//   --cincin-D (cincin piksel terluar) dan --cincin-D-2 (cincin kedua), berupa clip-path bertangga
//   dengan 1 piksel UI = 2 px CSS;
// - ikon SVG digambar ulang ke kisi piksel kecil: warna tiap piksel = warna terbanyak di dalamnya
//   (tanpa warna campuran di tepi), lalu diperbesar tanpa penghalusan. Ikon yang muncul kemudian
//   (tombol aksi, isi toko & tas, kartu elf) ikut diubah lewat MutationObserver. Gambar vektornya
//   tetap di kode (index.html, aksi.js, ikon.js) — yang berubah hanya cara menampilkannya.

const PX = 2 // px CSS per piksel UI
const LINGKAR = [52, 56, 60, 84, 120] // diameter (px): kenop joystick, tombol bulat, dasar joystick
const JOY_DALAM = 44 // px: lingkaran dalam dasar joystick (bagian yang lebih bening)

// cakram piksel berdiameter n piksel di tengah kisi size × size: rentang [kiri, kanan) tiap baris
function disc(n, size = n) {
  const o = (size - n) / 2
  const r = n / 2
  const rows = []
  for (let j = 0; j < size; j++) {
    const y = j - o + 0.5 - r
    if (Math.abs(y) >= r) {
      rows.push([0, 0])
      continue
    }
    const l = Math.round(r - Math.sqrt(r * r - y * y))
    rows.push([o + l, o + n - l])
  }
  return rows
}

// kikis satu piksel: hanya piksel yang keempat tetangganya ikut di dalam
function erode(rows) {
  return rows.map(([l, r], j) => {
    const a = rows[j - 1]
    const b = rows[j + 1]
    if (!a || !b) return [0, 0]
    const nl = Math.max(l + 1, a[0], b[0])
    const nr = Math.min(r - 1, a[1], b[1])
    return nr > nl ? [nl, nr] : [0, 0]
  })
}

// keliling baris-baris → titik poligon (satuan piksel UI): sisi kanan ke bawah, sisi kiri ke atas
function loop(rows) {
  const pts = []
  const used = rows.map((r, j) => [r, j]).filter(([[l, r]]) => r > l)
  for (const [[, r], j] of used) pts.push([r, j], [r, j + 1])
  for (const [[l], j] of used.reverse()) pts.push([l, j + 1], [l, j])
  // buang titik kembar & titik di tengah garis lurus
  const out = []
  for (const p of pts) {
    const q = out[out.length - 1]
    if (q && q[0] === p[0] && q[1] === p[1]) continue
    const s = out[out.length - 2]
    if (s && q && ((s[0] === q[0] && q[0] === p[0]) || (s[1] === q[1] && q[1] === p[1]))) out.pop()
    out.push(p)
  }
  return out
}

const poly = pts => pts.map(([x, y]) => `${x * PX}px ${y * PX}px`).join(',')
const shape = rows => `polygon(${poly(loop(rows))})`
// cincin = luar dikurangi dalam (aturan evenodd; kedua keliling disambung di titik awalnya)
function ring(outer, inner) {
  const a = loop(outer)
  const b = loop(inner)
  return `polygon(evenodd,${poly([...a, a[0], ...b, b[0]])})`
}

function installCircles(root) {
  for (const d of LINGKAR) {
    const r0 = disc(d / PX)
    const r1 = erode(r0)
    root.style.setProperty(`--lingkar-${d}`, shape(r0))
    root.style.setProperty(`--cincin-${d}`, ring(r0, r1))
    root.style.setProperty(`--cincin-${d}-2`, ring(r1, erode(r1)))
  }
  // dasar joystick: cincin lebar dari piksel kedua sampai lingkaran dalam
  const n = 120 / PX
  root.style.setProperty('--cincin-joystick', ring(erode(disc(n)), disc(JOY_DALAM / PX, n)))
}

// ----------------------------------------------------------------- ikon
const SUB = 4 // sub-sampel per sisi piksel ikon
const ready = new Map() // kunci → data URL PNG (atau null bila gagal)
const pending = new Map() // kunci → Promise

// px CSS per piksel ikon: ikon kecil (koin, tutup) lebih rapat supaya bentuknya tetap terbaca
const cellFor = size => (size <= 20 ? 1 : size < 32 ? 1.5 : 2)

async function rasterize(svg, n, fill) {
  const clone = svg.cloneNode(true)
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', n * SUB)
  clone.setAttribute('height', n * SUB)
  clone.setAttribute('fill', fill)
  const img = new Image()
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`
  await img.decode()
  const w = n * SUB
  const big = document.createElement('canvas')
  big.width = big.height = w
  const bg = big.getContext('2d', { willReadFrequently: true })
  bg.drawImage(img, 0, 0, w, w)
  const src = bg.getImageData(0, 0, w, w).data
  const small = document.createElement('canvas')
  small.width = small.height = n
  // kanvas CPU (willReadFrequently): toDataURL pada kanvas GPU menunggu GPU yang sedang sibuk memuat
  // dunia — terukur ±160 ms per ikon, 1,7 detik untuk 11 ikon di layar loading
  const sg = small.getContext('2d', { willReadFrequently: true })
  const out = sg.createImageData(n, n)
  const count = new Map()
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      count.clear()
      let covered = 0
      let best = null
      for (let sy = 0; sy < SUB; sy++)
        for (let sx = 0; sx < SUB; sx++) {
          const k = ((y * SUB + sy) * w + x * SUB + sx) * 4
          const a = src[k + 3]
          if (a < 24) continue
          covered++
          const key = ((src[k] >> 3) << 15) | ((src[k + 1] >> 3) << 10) | ((src[k + 2] >> 3) << 5) | (a >> 3)
          const c = count.get(key) || { n: 0, k }
          c.n++
          count.set(key, c)
          if (!best || c.n > best.n) best = c
        }
      // piksel terisi bila ≥ 6 dari 16 sub-sampel tertutup (garis tipis tetap bersambung)
      if (covered < 6) continue
      const o = (y * n + x) * 4
      out.data[o] = src[best.k]
      out.data[o + 1] = src[best.k + 1]
      out.data[o + 2] = src[best.k + 2]
      out.data[o + 3] = src[best.k + 3]
    }
  sg.putImageData(out, 0, 0)
  return small.toDataURL('image/png')
}

function show(svg, url) {
  svg.replaceChildren()
  svg.style.background = `url("${url}") center / 100% 100% no-repeat`
  svg.style.imageRendering = 'pixelated'
  svg.dataset.piksel = '1'
}

function pixelize(svg) {
  if (svg.dataset.piksel || !svg.firstElementChild) return
  const cs = getComputedStyle(svg)
  const size = parseFloat(cs.width) || 24
  const n = Math.max(8, Math.round(size / cellFor(size)))
  const key = `${n}|${cs.fill}|${svg.innerHTML}`
  if (ready.has(key)) {
    const url = ready.get(key)
    if (url) show(svg, url)
    return
  }
  let p = pending.get(key)
  if (!p) {
    p = rasterize(svg, n, cs.fill)
      .catch(() => null)
      .then(url => {
        ready.set(key, url)
        pending.delete(key)
        return url
      })
    pending.set(key, p)
  }
  const markup = svg.innerHTML
  p.then(url => {
    // ikon masih sama dan masih tampil di halaman
    if (url && svg.isConnected && !svg.dataset.piksel && svg.innerHTML === markup) show(svg, url)
  })
}

function scan(node) {
  if (node.nodeType !== 1) return
  if (node.tagName.toLowerCase() === 'svg') pixelize(node)
  else for (const s of node.querySelectorAll('svg')) pixelize(s)
}

// root: elemen HUD (semua ikon di dalamnya, sekarang & nanti, dipikselkan)
export function installPixelUI(root) {
  installCircles(document.documentElement)
  scan(root)
  new MutationObserver(list => {
    for (const m of list) for (const node of m.addedNodes) scan(node)
  }).observe(root, { childList: true, subtree: true })
}
