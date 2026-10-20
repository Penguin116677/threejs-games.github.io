import * as THREE from 'three'

// Tampilan untuk penjagaan kerajaan:
// - kartu tanya-jawab dengan prajurit (teks + tombol pilihan jawaban; di komputer juga tombol 1–5)
// - gelembung ucapan di atas kepala (teks yang mengikuti titik 3D di layar)
// - bar nyawa pemain + kilatan merah di tepi layar saat terkena

export function createDialog(el) {
  const name = el.querySelector('.tanya-nama')
  const text = el.querySelector('.tanya-teks')
  const choices = el.querySelector('.tanya-pilihan')
  let current = null
  const pick = i => {
    const c = current
    if (!c || !c.options[i]) return
    const { value } = c.options[i]
    current = null
    el.hidden = true
    c.onChoose(value)
  }
  window.addEventListener('keydown', e => {
    if (!current || e.repeat) return
    const n = Number(e.key)
    if (n >= 1 && n <= current.options.length) {
      e.preventDefault()
      pick(n - 1)
    }
  })
  return {
    get isOpen() {
      return current !== null
    },
    get current() {
      return current
    },
    // spec: { name, text, options: [{ text, value }], onChoose(value) }
    open(spec) {
      current = spec
      name.textContent = spec.name
      text.textContent = spec.text
      choices.replaceChildren(...spec.options.map((o, i) => {
        const b = document.createElement('button')
        b.type = 'button'
        b.innerHTML = '<b></b><span></span>'
        b.firstChild.textContent = `${i + 1}`
        b.lastChild.textContent = o.text
        b.addEventListener('click', () => pick(i))
        return b
      }))
      el.hidden = false
    },
    choose: pick,
    close() {
      current = null
      el.hidden = true
    },
  }
}

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
        b.el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -100%)`
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
