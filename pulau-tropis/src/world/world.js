import { heightAt as islandHeight, ISLAND } from './island.js'
import { westHeight } from './kencana/height.js'
import { northHeight } from './aeloria/height.js'
import { frostHeight } from './frostfall/height.js'

// Dunia = Pulau Tropis (pulau tengah, berpusat di 0,0) + Kepulauan Kencana di barat, Pulau Wira
// (markas bala tentara) di barat daya, Aeloria (kerajaan elf) di utara, dan Frostfall (pegunungan
// salju) di timur.
// Batasnya kelipatan 125 m dari tepi lama (−500): langkah grid terrain 5 / 3,90625 / 2,604 m
// (Rendah / Sedang / Tinggi) membagi habis 125 m, jadi titik-titik grid pulau tengah tetap
// sama persis seperti sebelum dunia diperluas.
export const WORLD = { minX: -1125, maxX: 1500, minZ: -1250, maxZ: 750 }
WORLD.width = WORLD.maxX - WORLD.minX
WORLD.depth = WORLD.maxZ - WORLD.minZ

// lebih dari 470 m dari pusat, bentuk pulau tengah pasti sudah dasar laut (radius pantai maks.
// 340 m × 1,38) — lewati noise-nya
const CENTER_REACH2 = 470 * 470

// Tinggi tanah alami di seluruh dunia (sebelum digrid menjadi mesh terrain).
export function worldHeight(x, z) {
  const center = x * x + z * z < CENTER_REACH2 ? islandHeight(x, z) : ISLAND.seaFloor
  return Math.max(center, westHeight(x, z), northHeight(x, z), frostHeight(x, z))
}

export const insideWorld = (x, z, margin = 0) => x > WORLD.minX + margin && x < WORLD.maxX - margin
  && z > WORLD.minZ + margin && z < WORLD.maxZ - margin
