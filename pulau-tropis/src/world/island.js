import { fbm, smoothstep } from '../core/noise.js'

// Satu sumber kebenaran untuk bentuk pulau. Satuan = meter, permukaan laut y = 0.
export const ISLAND = {
  size: 1000, // sisi area terrain (persegi), berpusat di (0, 0)
  seaLevel: 0,
  seaFloor: -18,
  beachTop: 2.2, // di bawah ketinggian ini: pasir pantai
  peak: { x: 70, z: -60 }, // posisi gunung utama
}

// Tinggi terrain di koordinat dunia (x, z).
// Dipakai untuk membuat mesh dan nanti untuk collision / penempatan objek.
export function heightAt(x, z) {
  const r = Math.hypot(x, z)

  // garis pantai tidak bulat: radius bervariasi mengikuti noise
  const shape = fbm(x * 0.0035 + 3.1, z * 0.0035 - 7.4, 3, 7)
  const radius = 230 + (shape - 0.5) * 220
  const t = r / radius

  // profil pantai: dasar laut → paparan dangkal (air toska) → pantai pasir landai.
  // Pantai sengaja lebar (±30 m) agar terlihat mulus walau grid terrain kasar.
  let h = ISLAND.seaFloor + (ISLAND.seaFloor * -1 - 1.2) * smoothstep(1.38, 1.02, t)
  h += 3.6 * smoothstep(1.04, 0.87, t)

  // bukit-bukit di pedalaman
  const inland = smoothstep(0.92, 0.45, t)
  const hills = fbm(x * 0.011 + 10, z * 0.011 - 5, 5, 3)
  h += inland * inland * hills * 26

  // gunung utama (puncak ±80 m) dengan permukaan kasar
  const dx = x - ISLAND.peak.x
  const dz = z - ISLAND.peak.z
  const mountain = Math.exp(-(dx * dx + dz * dz) / (2 * 75 * 75))
  const rough = 0.7 + 0.6 * fbm(x * 0.03, z * 0.03, 4, 11)
  h += inland * mountain * 70 * rough

  // riak kecil agar permukaan tidak terlalu mulus
  h += (fbm(x * 0.08, z * 0.08, 2, 21) - 0.5) * 0.8 * inland

  return h
}
