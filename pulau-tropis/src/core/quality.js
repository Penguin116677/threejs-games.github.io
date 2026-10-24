// Pengaturan kualitas grafis: rendah / sedang / tinggi.
// Pilihan dibaca dari: #kualitas= (diset menu dalam game) → ?kualitas= di URL
// → pilihan tersimpan → otomatis (HP: sedang, komputer: tinggi).
const LEVELS = ['rendah', 'sedang', 'tinggi']
const KEY = 'pulau-tropis:kualitas'

const PRESETS = {
  rendah: {
    pixelSize: 2.4, // px CSS per piksel seni (gambar pixel art, core/pixel.js)
    terrainSegments: 200,
    shadows: false,
    shadowMapSize: 0,
    treeDensity: 0.75,
    canopyDetail: 0,
    grass: { radius: 70, near: 9, density: 1.6, blades: 4, max: 4000, shadows: false },
    caustics: false,
    water: { segments: 128, detailLayers: 1, cloudReflection: false, wetSand: false, shoreRes: 256 },
  },
  sedang: {
    pixelSize: 2,
    terrainSegments: 256,
    shadows: true,
    shadowMapSize: 1024,
    treeDensity: 1,
    canopyDetail: 0,
    grass: { radius: 120, near: 13, density: 2.4, blades: 6, max: 9000, shadows: false },
    caustics: true,
    water: { segments: 192, detailLayers: 2, cloudReflection: true, wetSand: true, shoreRes: 512 },
  },
  tinggi: {
    pixelSize: 1.6,
    terrainSegments: 384,
    shadows: true,
    shadowMapSize: 2048,
    treeDensity: 1.5,
    canopyDetail: 1,
    grass: { radius: 170, near: 18, density: 3.2, blades: 8, max: 26000, shadows: true },
    caustics: true,
    water: { segments: 240, detailLayers: 2, cloudReflection: true, wetSand: true, shoreRes: 512 },
  },
}

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  || (navigator.maxTouchPoints > 1 && window.matchMedia('(pointer: coarse)').matches)

function stored() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null // penyimpanan bisa diblokir (mode privat / pratinjau)
  }
}

function pickLevel() {
  const fromHash = new URLSearchParams(location.hash.slice(1)).get('kualitas')
  const fromUrl = new URLSearchParams(location.search).get('kualitas')
  for (const v of [fromHash, fromUrl, stored()])
    if (LEVELS.includes(v)) return v
  return isMobile ? 'sedang' : 'tinggi'
}

const level = pickLevel()

export const quality = { isMobile, level, levels: LEVELS, ...PRESETS[level] }

// Simpan pilihan lalu muat ulang halaman (dunia dibangun ulang dengan pengaturan baru).
export function setQualityLevel(next) {
  if (!LEVELS.includes(next)) return
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // tidak apa-apa: pilihan tetap terbawa lewat #kualitas= di alamat
  }
  try {
    const url = new URL(location.href)
    url.searchParams.delete('kualitas')
    url.hash = `kualitas=${next}`
    history.replaceState(null, '', url)
  } catch {
    location.hash = `kualitas=${next}`
  }
  location.reload()
}
