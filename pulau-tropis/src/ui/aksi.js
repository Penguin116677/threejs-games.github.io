// Tombol aksi sesuai keadaan, di baris #aksi-konteks (tengah layar tegak / kanan layar mendatar):
// Naik perahu, Turun, Mancing / Tarik!, Buat perahu, Bicara, Panjat, … Elemennya dibuat sekali; set() hanya
// menulis ulang isinya bila teks/keadaannya berubah (dipanggil tiap frame tanpa membebani DOM).

// ikon SVG 24 × 24 (UI tidak memakai huruf/emoji sebagai ikon)
const svg = body => `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`
export const IKON_AKSI = {
  perahu: svg('<path d="M2.5 14.5h19l-2.6 4.3a2 2 0 0 1-1.7 1H6.8a2 2 0 0 1-1.7-1z" fill="#fff"/><path d="M11.6 3.2v10.3H5.2z" fill="#fff" fill-opacity=".85"/><path d="M12.6 5.5v8h5.2z" fill="#fff" fill-opacity=".6"/>'),
  turun: svg('<path d="M3 20.5h18" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  mancing: svg('<path d="M4 21 18.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M18.5 3.5c1.7 4 1.8 9.3.6 13.4" fill="none" stroke="#fff" stroke-width="1.1"/><circle cx="19.1" cy="18.3" r="1.9" fill="#ff8a7a"/>'),
  tarik: svg('<path d="M3 13c2.6-4 8-4.9 11.6-1.8l3.9-2.8v9l-3.9-2.8C11 17.7 5.6 16.9 3 13z" fill="#fff"/><path d="M19.5 3.5v5M19.5 11v.6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>'),
  buat: svg('<path d="M14.2 3.8 20.2 9.8l-2.1 2.1-6-6z" fill="#fff"/><path d="M15 11 5.6 20.4a1.6 1.6 0 0 1-2.3-2.3L12.7 8.7z" fill="#fff" fill-opacity=".85"/>'),
  // tepi lantai (dek / batur) + panah naik ke atasnya
  panjat: svg('<path d="M2.5 20.5h9v-7.5h10" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 10V3.6M12.7 6.9 16 3.6l3.3 3.3" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>'),
  bicara: svg('<path d="M4 4.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-8.4L6.5 20.6V16.5H4A1.5 1.5 0 0 1 2.5 15V6A1.5 1.5 0 0 1 4 4.5z" fill="#fff"/><circle cx="8" cy="10.5" r="1.3" fill="#2f7d4a"/><circle cx="12" cy="10.5" r="1.3" fill="#2f7d4a"/><circle cx="16" cy="10.5" r="1.3" fill="#2f7d4a"/>'),
}

// container: elemen #aksi-konteks; id: id tombol; icon: SVG; cls: kelas warna; onPress: aksi
export function createActionButton(container, { id, icon, cls = '' }, onPress) {
  const b = document.createElement('button')
  b.type = 'button'
  b.id = id
  b.className = cls
  b.hidden = true
  container.appendChild(b)
  b.addEventListener('click', e => {
    e.stopPropagation()
    onPress()
  })
  let shown = ''
  return {
    el: b,
    // on = tampil; label & sub = teks besar & kecil; extra = kelas tambahan (mis. 'menyala')
    set(on, label = '', sub = '', extra = '') {
      const key = on ? `${label}|${sub}|${extra}` : ''
      if (key === shown) return
      shown = key
      b.hidden = !on
      if (!on) return
      b.className = `${cls} ${extra}`.trim()
      b.innerHTML = `${icon}<span>${label}</span>${sub ? `<small>${sub}</small>` : ''}`
    },
    get shown() {
      return !b.hidden
    },
  }
}
