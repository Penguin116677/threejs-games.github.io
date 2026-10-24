import * as THREE from 'three'

// Tampilan untuk penjagaan kerajaan:
// - gelembung ucapan di atas kepala (teks yang mengikuti titik 3D di layar): seruan prajurit,
//   tanya-jawab penjaga dengan pendatang
// - bar nyawa pemain + kilatan merah di tepi layar saat terkena

// gelembung ucapan: say(anchor, teks, ms) — anchor = fungsi () → { x, y, z } (titik 3D) atau null
export function createBubbles(container, camera) {
  const pool = []
  const v = new THREE.Vector3()
  function get() {
    let b = pool.find(p => !p.anchor)
    if (!b && pool.length < 12) {
      const el = document.createElement('div')
      el.className = 'gelembung'
      el.hidden = true
      container.appendChild(el)
      b = { el, anchor: null, t: 0, ms: 0, key: null }
      pool.push(b)
    }
    return b || pool.reduce((a, c) => (c.t > a.t ? c : a))
  }
  return {
    say(anchor, teks, ms = 2600, key = null) {
      // satu gelembung per pembicara: kalimat baru menggantikan yang lama
      let b = key !== null ? pool.find(p => p.anchor && p.key === key) : null
      if (!b) b = get()
      b.anchor = anchor
      b.key = key
      b.t = 0
      b.ms = ms
      b.el.textContent = teks
      b.el.hidden = false
      b.el.classList.remove('pudar')
    },
    // teks gelembung yang sedang tampil (untuk pengujian)
    get texts() {
      return pool.filter(p => p.anchor).map(p => p.el.textContent)
    },
    update(dt) {
      const w = window.innerWidth
      const h = window.innerHeight
      for (const b of pool) {
        if (!b.anchor) continue
        b.t += dt * 1000
        const p = b.anchor()
        if (!p || b.t > b.ms) {
          b.anchor = null
          b.el.hidden = true
          continue
        }
        const far = camera.position.distanceTo(v.set(p.x, p.y, p.z)) > 90
        v.project(camera)
        const off = v.z > 1 || v.x < -1.1 || v.x > 1.1 || v.y < -1.1 || v.y > 1.1 || far
        b.el.style.visibility = off ? 'hidden' : 'visible'
        if (off) continue
        // posisi dibulatkan ke piksel utuh: bingkai piksel gelembung tetap tajam
        b.el.style.transform = `translate(${Math.round(((v.x + 1) / 2) * w)}px, ${Math.round(((1 - v.y) / 2) * h)}px) translate(-50%, -100%)`
        if (b.ms - b.t < 400) b.el.classList.add('pudar')
      }
    },
    clear() {
      for (const b of pool) {
        b.anchor = null
        b.el.hidden = true
      }
    },
  }
}

// bar nyawa pemain: hanya diperbarui bila nilainya berubah
export function createHealthBar(el, flashEl) {
  const fill = el.querySelector('.isi')
  const label = el.querySelector('.angka')
  let shown = -1
  return {
    set(hp, max) {
      const v = Math.ceil(hp)
      if (v === shown) return
      shown = v
      fill.style.width = `${(100 * Math.max(0, hp)) / max}%`
      label.textContent = `${v}`
      el.classList.toggle('kritis', hp < max * 0.3)
    },
    hurt() {
      flashEl.classList.remove('kena')
      void flashEl.offsetWidth // mulai ulang animasi CSS
      flashEl.classList.add('kena')
    },
  }
}
