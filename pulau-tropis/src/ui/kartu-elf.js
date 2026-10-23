import * as THREE from 'three'

// Kartu "isi pikiran" elf Aeloria: ketuk seorang elf untuk melihat nama, peran, kegiatannya
// sekarang, suasana hati, sifat, dan kebutuhannya (lapar, lelah, bosan, kesepian, ingin berlatih).
// Isinya diperbarui selama kartu terbuka, karena elfnya terus menimbang dan berganti kegiatan.
// Tombol "Ajak bicara" → onTalk(elf) (pemain berjalan ke elf itu lalu mengobrol).
const $ = id => document.getElementById(id)
const PICK_PX = 38 // jarak layar (piksel CSS) dari titik ketuk ke badan elf
const BUTUH = [['lapar', 'Lapar'], ['lelah', 'Lelah'], ['bosan', 'Bosan'], ['sepi', 'Kesepian'], ['latih', 'Ingin berlatih']]
const IKON_TUTUP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>'
const huruf = s => s.charAt(0).toUpperCase() + s.slice(1)

// life = createLife; camera; canvas; markers (cincin penanda elf terpilih)
export function createElfCard({ life, camera, canvas, markers, onTalk = null }) {
  const el = $('kartu-elf')
  const v = new THREE.Vector3()
  let cur = null
  let t = 0
  let shown = ''

  function render() {
    const d = life.describe(cur)
    const bars = BUTUH.map(([k, label]) => `<div class="ke-butuh"><span>${label}</span><i><b style="width:${d.kebutuhan[k]}%"></b></i></div>`).join('')
    const html = `<div class="ke-kepala"><b>${d.nama}</b><button type="button" class="ke-tutup" aria-label="Tutup kartu">${IKON_TUTUP}</button></div>`
      + `<div class="ke-peran">${huruf(d.peran)}${d.senjata ? ` · ${d.senjata}` : ''}</div>`
      + `<div class="ke-kegiatan">${huruf(d.kegiatan)}</div>`
      + `<div class="ke-baris">Suasana hati: <b>${d.suasana}</b> · Sifat: ${d.sifat.join(', ')}</div>${bars}`
      + (onTalk ? '<button type="button" class="ke-bicara">Ajak bicara</button>' : '')
    if (html === shown) return
    shown = html
    el.innerHTML = html
  }
  function hide() {
    cur = null
    shown = ''
    el.hidden = true
    markers.deselect()
  }
  el.addEventListener('click', e => {
    if (e.target.closest('.ke-tutup')) hide()
    else if (e.target.closest('.ke-bicara') && cur) {
      const a = cur
      hide()
      onTalk(a)
    }
  })

  return {
    // elf terdekat dari titik ketuk (x, y piksel layar) di antara elf yang digambar dekat
    pick(x, y) {
      const r = canvas.getBoundingClientRect()
      let best = null
      let bd = PICK_PX
      for (const a of life.near) {
        if (a.hidden) continue
        v.set(a.x, a.y + 0.85 * a.scale, a.z).project(camera)
        if (v.z > 1) continue
        const d = Math.hypot(r.left + ((v.x + 1) / 2) * r.width - x, r.top + ((1 - v.y) / 2) * r.height - y)
        if (d < bd) {
          bd = d
          best = a
        }
      }
      return best
    },
    show(a) {
      cur = a
      t = 0
      render()
      el.hidden = false
      markers.select(a.x, a.z)
    },
    hide,
    get open() {
      return !!cur
    },
    update(dt) {
      if (!cur) return
      if (cur.hidden) {
        hide() // masuk rumah / tenda
        return
      }
      markers.select(cur.x, cur.z)
      if ((t += dt) > 0.5) {
        t = 0
        render()
      }
    },
  }
}
