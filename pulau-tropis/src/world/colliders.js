// Penghalang untuk collision pemain, jalur ketukan, dan sasaran pukulan:
// - lingkaran { x, z, radius, kind } — batang pohon, batu besar
// - kotak { x, z, hx, hz, rot, kind } — dinding rumah, tembok kota, pagar jembatan
//   (setengah lebar hx × setengah panjang hz, diputar rot radian seperti rotation.y mesh)
// kind: 'pohon' / 'batu' / 'bata' / 'kayu' … (warna serpihan saat dipukul)
const CELL = 8

const cellKey = (i, j) => (i + 32768) * 65536 + (j + 32768)

function prepare(c) {
  if (c.hx === undefined) return c
  const rot = c.rot || 0
  return { ...c, cos: Math.cos(rot), sin: Math.sin(rot), radius: Math.hypot(c.hx, c.hz) }
}

// Titik terdekat pada penghalang dari (x, z), jarak bertanda (negatif = di dalam), dan arah keluar.
// Hasil ditulis ke `out` { gap, nx, nz, px, pz }.
function probe(o, x, z, out) {
  if (o.hx === undefined) {
    const dx = x - o.x
    const dz = z - o.z
    const d = Math.hypot(dx, dz)
    out.gap = d - o.radius
    out.nx = d > 1e-6 ? dx / d : 1
    out.nz = d > 1e-6 ? dz / d : 0
    out.px = o.x + out.nx * o.radius
    out.pz = o.z + out.nz * o.radius
    return out
  }
  // ke ruang lokal kotak
  const dx = x - o.x
  const dz = z - o.z
  const lx = dx * o.cos - dz * o.sin
  const lz = dx * o.sin + dz * o.cos
  const qx = Math.abs(lx) - o.hx
  const qz = Math.abs(lz) - o.hz
  let nlx
  let nlz
  let cx
  let cz
  if (qx > 0 || qz > 0) {
    // di luar: titik terdekat = titik dijepit ke kotak
    cx = Math.max(-o.hx, Math.min(o.hx, lx))
    cz = Math.max(-o.hz, Math.min(o.hz, lz))
    const ex = lx - cx
    const ez = lz - cz
    const d = Math.hypot(ex, ez)
    out.gap = d
    nlx = ex / d
    nlz = ez / d
  } else if (qx > qz) {
    // di dalam: keluar lewat sisi terdekat
    out.gap = qx
    nlx = Math.sign(lx) || 1
    nlz = 0
    cx = nlx * o.hx
    cz = lz
  } else {
    out.gap = qz
    nlx = 0
    nlz = Math.sign(lz) || 1
    cx = lx
    cz = nlz * o.hz
  }
  // kembali ke ruang dunia (kebalikan putaran)
  out.nx = nlx * o.cos + nlz * o.sin
  out.nz = -nlx * o.sin + nlz * o.cos
  out.px = o.x + cx * o.cos + cz * o.sin
  out.pz = o.z - cx * o.sin + cz * o.cos
  return out
}

export function createColliders(input) {
  const list = input.map(prepare)
  // setiap penghalang dimasukkan ke semua sel 8 m yang tersentuh kotak batasnya, jadi
  // pencarian cukup memeriksa sel di sekitar titik tanya (tembok panjang pun murah)
  const cells = new Map()
  for (const o of list) {
    const r = o.radius
    for (let i = Math.floor((o.x - r) / CELL); i <= Math.floor((o.x + r) / CELL); i++)
      for (let j = Math.floor((o.z - r) / CELL); j <= Math.floor((o.z + r) / CELL); j++) {
        const k = cellKey(i, j)
        let c = cells.get(k)
        if (!c) cells.set(k, c = [])
        c.push(o)
      }
  }
  let stamp = 0 // penanda pencarian: penghalang yang ada di beberapa sel hanya diperiksa sekali
  // panggil fn(o) sekali untuk tiap penghalang yang kotak batasnya menyentuh lingkaran (x, z, r);
  // fn mengembalikan false = berhenti
  function forEachNear(x, z, r, fn) {
    stamp++
    for (let i = Math.floor((x - r) / CELL); i <= Math.floor((x + r) / CELL); i++)
      for (let j = Math.floor((z - r) / CELL); j <= Math.floor((z + r) / CELL); j++) {
        const c = cells.get(cellKey(i, j))
        if (!c) continue
        for (const o of c) {
          if (o.seen === stamp) continue
          o.seen = stamp
          const dx = o.x - x
          const dz = o.z - z
          const reach = o.radius + r
          if (dx * dx + dz * dz > reach * reach) continue
          if (fn(o) === false) return false
        }
      }
    return true
  }
  const hit = { gap: 0, nx: 0, nz: 0, px: 0, pz: 0 }

  return {
    list,
    count: list.length,
    forEachNear,
    probe,
    // Dorong lingkaran pemain (pos.x, pos.z, r) keluar dari semua penghalang dan
    // hilangkan komponen kecepatan yang menembus penghalang. Kembalikan true bila menabrak.
    resolve(pos, r, vel) {
      let touched = false
      forEachNear(pos.x, pos.z, r, o => {
        probe(o, pos.x, pos.z, hit)
        if (hit.gap >= r) return true
        pos.x += hit.nx * (r - hit.gap)
        pos.z += hit.nz * (r - hit.gap)
        const vn = vel.x * hit.nx + vel.z * hit.nz
        if (vn < 0) {
          vel.x -= vn * hit.nx
          vel.z -= vn * hit.nz
        }
        touched = true
        return true
      })
      return touched
    },
    // apakah titik (x, z) dengan jari-jari r bebas dari penghalang
    isFree(x, z, r) {
      return forEachNear(x, z, r, o => probe(o, x, z, hit).gap >= r)
    },
    // jarak bertanda dari (x, z) ke penghalang terdekat (maks. `max`)
    clearance(x, z, max = 4) {
      let best = max
      forEachNear(x, z, max, o => {
        best = Math.min(best, probe(o, x, z, hit).gap)
        return true
      })
      return best
    },
    // penghalang terdekat yang tersentuh lingkaran (x, z, r) — mis. ayunan pedang; null bila tidak ada.
    // Hasil berbentuk titik sentuh { x, z, radius: 0, kind } untuk kotak, atau lingkaran aslinya.
    hitAt(x, z, r) {
      let best = null
      let bestGap = r
      forEachNear(x, z, r, o => {
        const { gap } = probe(o, x, z, hit)
        if (gap < bestGap) {
          bestGap = gap
          best = o.hx === undefined ? o : { x: hit.px, z: hit.pz, radius: 0, kind: o.kind }
        }
        return true
      })
      return best
    },
    // semua penghalang yang tersentuh lingkaran (x, z, r), terdekat lebih dulu (maks. max) —
    // untuk serangan yang mengenai sekeliling (Tebasan Putar, Hentakan)
    hitAll(x, z, r, max = 8) {
      const hits = []
      forEachNear(x, z, r, o => {
        const { gap } = probe(o, x, z, hit)
        if (gap < r) hits.push({ o: o.hx === undefined ? o : { x: hit.px, z: hit.pz, radius: 0, kind: o.kind }, gap })
        return true
      })
      return hits.sort((a, b) => a.gap - b.gap).slice(0, max).map(h => h.o)
    },
  }
}
