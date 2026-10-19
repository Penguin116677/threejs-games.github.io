// Jaringan jalan untuk penduduk: ruas-ruas jalan dipotong di setiap pertemuan (perempatan,
// pertigaan, ujung ruas yang menyentuh ruas lain) → simpul + sisi. Penduduk berjalan dari simpul
// ke simpul tetangga. segments: [ax, az, bx, bz, lebar?] (tanpa lebar = jalan setapak 3 m).
// Tiap simpul: { id, x, z, links: [simpul tetangga], w: Map(id tetangga → lebar jalan) }.
const SNAP = 1.6 // m: titik sedekat ini dianggap simpul yang sama

export function buildRoutes(segments) {
  const nodes = []
  const find = (x, z) => {
    for (const n of nodes) if (Math.abs(n.x - x) < SNAP && Math.abs(n.z - z) < SNAP) return n
    const n = { id: nodes.length, x, z, links: [], w: new Map() }
    nodes.push(n)
    return n
  }
  // titik-titik potong sepanjang tiap ruas (t = 0..1)
  const cuts = segments.map(() => [0, 1])
  const onSeg = (s, x, z) => {
    const [ax, az, bx, bz] = s
    const vx = bx - ax
    const vz = bz - az
    const len2 = vx * vx + vz * vz
    const t = ((x - ax) * vx + (z - az) * vz) / len2
    if (t < -1e-6 || t > 1 + 1e-6) return null
    const px = ax + vx * t - x
    const pz = az + vz * t - z
    return px * px + pz * pz < SNAP * SNAP ? Math.min(1, Math.max(0, t)) : null
  }
  for (let i = 0; i < segments.length; i++)
    for (let j = 0; j < segments.length; j++) {
      if (i === j) continue
      const [ax, az, bx, bz] = segments[i]
      const [cx, cz, dx, dz] = segments[j]
      // ujung ruas j yang menempel di ruas i (pertigaan / ruas menyambung)
      for (const [x, z] of [[cx, cz], [dx, dz]]) {
        const t = onSeg(segments[i], x, z)
        if (t !== null) cuts[i].push(t)
      }
      // perpotongan dua ruas
      const rx = bx - ax
      const rz = bz - az
      const sx = dx - cx
      const sz = dz - cz
      const den = rx * sz - rz * sx
      if (Math.abs(den) < 1e-9) continue
      const t = ((cx - ax) * sz - (cz - az) * sx) / den
      const u = ((cx - ax) * rz - (cz - az) * rx) / den
      if (t > 0 && t < 1 && u > 0 && u < 1) cuts[i].push(t)
    }
  const edges = new Set()
  segments.forEach((s, i) => {
    const [ax, az, bx, bz] = s
    const ts = [...new Set(cuts[i].map(t => Math.round(t * 1e4) / 1e4))].sort((p, q) => p - q)
    let prev = null
    for (const t of ts) {
      const n = find(ax + (bx - ax) * t, az + (bz - az) * t)
      if (prev && prev !== n) {
        const key = prev.id < n.id ? `${prev.id}-${n.id}` : `${n.id}-${prev.id}`
        if (!edges.has(key)) {
          edges.add(key)
          prev.links.push(n)
          n.links.push(prev)
        }
        // ruas bertumpuk (jalan + jembatan): pakai yang paling lebar
        const w = Math.max(s[4] ?? 3, prev.w.get(n.id) ?? 0)
        prev.w.set(n.id, w)
        n.w.set(prev.id, w)
      }
      prev = n
    }
  })
  return { nodes, edgeCount: edges.size }
}
