import { ISLANDS, BRIDGES, CITY, TEGAL, inRect } from './layout.js'
import { islandDistance } from './height.js'

// Wilayah Kerajaan Kencana (untuk penjagaan): semua pulau Kencana sampai air dangkal di pantainya,
// ditambah separuh barat Jembatan Agung. Separuh timur jembatan dan Pulau Tropis di luar wilayah.
// Murni data + fungsi kecil (tanpa Three.js).

const AGUNG = BRIDGES.find(b => b.id === 'agung')
// batas wilayah: tengah Jembatan Agung
export const BORDER_X = (AGUNG.from + AGUNG.to) / 2

const onAgung = (x, z) => Math.abs(z - AGUNG.at) < AGUNG.width && x > AGUNG.from - 12 && x < AGUNG.to + 12

export function inKingdom(x, z) {
  if (onAgung(x, z)) return x < BORDER_X
  for (const isl of ISLANDS) if (islandDistance(isl, x, z) < 1.08) return true
  return false
}

// Wilayah tugas peronda: 'kota' (dalam tembok, termasuk keraton), 'agung' (Jembatan Agung &
// kepalanya), atau id pulau ('kencana' = luar kota & pelabuhan, 'sawah', 'nelayan', 'pura',
// 'wira'). Jembatan antarpulau ikut pulau yang paling dekat.
export function zoneAt(x, z) {
  if (onAgung(x, z)) return 'agung'
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
  kota: 'Kotaraja', agung: 'Jembatan Agung', kencana: 'Pulau Kencana', sawah: 'Pulau Sawah',
  nelayan: 'Pulau Nelayan', pura: 'Pulau Pura', wira: 'Pulau Wira',
}
