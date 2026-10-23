import { ISLANDS, DOCKS, CITY, TEGAL, inRect } from './layout.js'
import { islandDistance } from './height.js'

// Wilayah Kerajaan Kencana (untuk penjagaan): semua pulau Kencana sampai air dangkal di pantainya
// (termasuk Dermaga Timur). Pulau Tropis di luar wilayah — tidak ada lagi jembatan di antaranya.
// Murni data + fungsi kecil (tanpa Three.js).

const TIMUR = DOCKS.find(d => d.id === 'timur')
// kawasan Dermaga Timur: dari gerbang timur kota sampai ujung dermaga, sepanjang jalannya
const onDock = (x, z) => Math.abs(z - TIMUR.at) < 22 && x > -418 && x < TIMUR.from + TIMUR.len + 40

export function inKingdom(x, z) {
  for (const isl of ISLANDS) if (islandDistance(isl, x, z) < 1.08) return true
  return false
}

// Wilayah tugas peronda: 'kota' (dalam tembok, termasuk keraton), 'dermaga' (Dermaga Timur & jalan
// ke gerbang timur), atau id pulau ('kencana' = luar kota & pelabuhan, 'sawah', 'nelayan', 'pura',
// 'wira'). Jembatan antarpulau ikut pulau yang paling dekat.
export function zoneAt(x, z) {
  if (onDock(x, z)) return 'dermaga'
  if (inRect(x, z, CITY, 2)) return 'kota'
  if (inRect(x, z, TEGAL, 30)) return 'wira'
  let best = 'kencana'
  let bestD = Infinity
  for (const isl of ISLANDS) {
    const d = islandDistance(isl, x, z)
    if (d < bestD) {
      bestD = d
      best = isl.id
    }
  }
  return best
}

// nama wilayah tugas (untuk teks)
export const ZONE_NAMES = {
  kota: 'Kotaraja', dermaga: 'Dermaga Timur', kencana: 'Pulau Kencana', sawah: 'Pulau Sawah',
  nelayan: 'Pulau Nelayan', pura: 'Pulau Pura', wira: 'Pulau Wira',
}
