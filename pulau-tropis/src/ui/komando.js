// Panel komando bala tentara Pulau Rajawali (v0.27.0), di kanan bawah layar (tempat tombol jurus
// pedang dulu): pemain memerintah 400 prajuritnya LEWAT KOMANDAN tiap divisi.
// 1. Ketuk satu dari 4 komandan (Pemanah, Pedang, Perisai, Kavaleri) — cincin kuning di bawah kudanya.
// 2. Perintah untuk divisi komandan itu:
//    - Ikuti aku: seluruh divisi berbaris di belakangmu ke mana pun, ikut berenang menyeberang laut
//    - Ke titik: lalu ketuk tanah tujuan (atau titik di Peta) — divisi berbaris ke sana dalam formasinya
//    - Formasi: Barisan, Kotak, Lingkaran, atau Baji
//    - Geser kiri / kanan: divisi bergerak melingkar 45° mengitari titik 30 m di depannya lalu
//      menghadap titik itu; ulangi untuk mengepung dari samping sampai ke belakang
// Keyboard: 6–9 = pilih komandan, I = ikuti, O = ke titik (lalu klik tanah / peta), L = formasi
// berikutnya, Z / X = geser kiri / kanan.
import { suara, sfx } from '../audio/suara.js'
import { DIVISI } from '../world/rajawali/layout.js'
import { FORMASI, NAMA_FORMASI } from '../world/rajawali/bala.js'

const svg = body => `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`
const W = '#fff'
export const IKON_KOMANDO = {
  // komandan tiap divisi (lambang senjatanya)
  pemanah: svg(`<path d="M7 3.5c6.5 3 6.5 14 0 17" fill="none" stroke="${W}" stroke-width="2.2" stroke-linecap="round"/><path d="M7 3.5v17" stroke="${W}" stroke-width="1" stroke-opacity=".8"/><path d="M4 12h15.5M16.5 9l3 3-3 3" fill="none" stroke="${W}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`),
  pedang: svg(`<path d="M12 2.5 13.6 5v10.5h-3.2V5z" fill="${W}"/><path d="M7 15.5h10v2H7z" fill="${W}"/><path d="M11 17.5h2v3.5h-2z" fill="${W}" fill-opacity=".85"/>`),
  perisai: svg(`<path d="M12 2.8 19.5 5.6v5.8c0 4.6-3.2 8.2-7.5 9.9-4.3-1.7-7.5-5.3-7.5-9.9V5.6z" fill="${W}"/><path d="M12 6.5v11M8 10.5h8" stroke="#8a2a2a" stroke-width="1.8" stroke-linecap="round"/>`),
  kavaleri: svg(`<path d="M5.5 21c0-4.6 1.4-8.3 4.2-10.6L8.6 6.6l2.7 1.3 1.9-4.1 1.1 3.6c2.9 1.2 4.9 3.8 5.4 7.4l-2.3 1.6-2.6-2.1-1.8 1.4c.7 2 .8 4 .5 5.3z" fill="${W}"/><circle cx="15" cy="9.6" r=".9" fill="#5a3a20"/>`),
  // perintah
  ikuti: svg(`<circle cx="16.5" cy="5.5" r="2.6" fill="${W}"/><path d="M12.5 21v-5.2l-1.8-1.3 1.6-5.2c.4-1.2 1.5-1.8 2.7-1.5l2.6.7c1 .3 1.7 1 2 2l.9 3.2-2 .6-.8-2.4-1 3.7 1.8 2.2V21h-2v-4.2l-2-2.2V21z" fill="${W}"/><path d="M3 9.5l3 2.5-3 2.5M7 9.5l3 2.5-3 2.5" fill="none" stroke="${W}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".8"/>`),
  titik: svg(`<path d="M12 2.5a6.2 6.2 0 0 1 6.2 6.2c0 4.6-6.2 11-6.2 11s-6.2-6.4-6.2-11A6.2 6.2 0 0 1 12 2.5z" fill="${W}"/><circle cx="12" cy="8.8" r="2.4" fill="#2a5a7a"/><path d="M5 21.5h14" stroke="${W}" stroke-width="1.8" stroke-linecap="round" stroke-opacity=".7"/>`),
  formasi: svg([5, 12, 19].flatMap(x => [6, 12, 18].map(y => `<circle cx="${x}" cy="${y}" r="2.1" fill="${W}"/>`)).join('')),
  kiri: svg(`<path d="M19.5 18.5A8 8 0 0 0 7 7.6" fill="none" stroke="${W}" stroke-width="2.4" stroke-linecap="round"/><path d="M4.2 4.6 8.8 4l.4 4.8z" fill="${W}"/><circle cx="15" cy="12" r="2" fill="${W}" fill-opacity=".75"/>`),
  kanan: svg(`<path d="M4.5 18.5A8 8 0 0 1 17 7.6" fill="none" stroke="${W}" stroke-width="2.4" stroke-linecap="round"/><path d="M19.8 4.6 15.2 4l-.4 4.8z" fill="${W}"/><circle cx="9" cy="12" r="2" fill="${W}" fill-opacity=".75"/>`),
  batal: svg(`<path d="M6 6l12 12M18 6 6 18" stroke="${W}" stroke-width="2.6" stroke-linecap="round"/>`),
  // formasi
  barisan: svg([3, 7.5, 12, 16.5, 21].flatMap(x => [9, 15].map(y => `<circle cx="${x}" cy="${y}" r="1.8" fill="${W}"/>`)).join('')),
  kotak: svg([6, 12, 18].flatMap(x => [6, 12, 18].map(y => `<rect x="${x - 1.8}" y="${y - 1.8}" width="3.6" height="3.6" rx=".6" fill="${W}"/>`)).join('')),
  lingkaran: svg(Array.from({ length: 10 }, (_, i) => `<circle cx="${(12 + Math.sin((i / 10) * Math.PI * 2) * 8).toFixed(2)}" cy="${(12 + Math.cos((i / 10) * Math.PI * 2) * 8).toFixed(2)}" r="1.7" fill="${W}"/>`).join('')),
  baji: svg([[12, 4], [9, 9.5], [15, 9.5], [6, 15], [12, 15], [18, 15], [3, 20.5], [9, 20.5], [15, 20.5], [21, 20.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${W}"/>`).join('')),
}

// jawaban komandan & sorak pasukannya per perintah
const JAWAB = {
  pilih: ['Siap menunggu perintah!', 'Hamba di sini, Paduka!', 'Divisi siap!'],
  ikuti: ['Siap! Kami mengikutimu!', 'Ikuti Paduka! Maju!', 'Siap, kami di belakangmu!'],
  titik: ['Siap! Berbaris ke sana!', 'Maju ke titik itu!', 'Laksanakan!'],
  formasi: ['Ubah formasi!', 'Siap, bentuk formasi!', 'Rapatkan barisan!'],
  kiri: ['Geser ke kiri, kepung!', 'Sayap kiri, maju mengitari!', 'Ke kiri, kepung mereka!'],
  kanan: ['Geser ke kanan, kepung!', 'Sayap kanan, maju mengitari!', 'Ke kanan, kepung mereka!'],
}
const pick = list => list[Math.floor(Math.random() * list.length)]

// bala = createBala; bubbles = gelembung ucapan; message = pesan singkat; touch = layar sentuh
export function createKomando({ bala, bubbles, message, touch }) {
  const hud = document.getElementById('hud')
  const root = document.createElement('div')
  root.id = 'komando'
  root.hidden = true
  hud.appendChild(root)
  const status = document.createElement('div')
  status.className = 'komando-status'
  root.appendChild(status)
  const rowOrders = document.createElement('div')
  rowOrders.className = 'komando-baris perintah'
  const rowForm = document.createElement('div')
  rowForm.className = 'komando-baris formasi'
  rowForm.hidden = true
  const rowCmd = document.createElement('div')
  rowCmd.className = 'komando-baris komandan'
  root.append(rowOrders, rowForm, rowCmd)

  let sel = -1
  let picking = false
  let formOpen = false

  function button(parent, { id, icon, label, cls = '' }, press) {
    const b = document.createElement('button')
    b.type = 'button'
    b.id = id
    b.className = `komando-tombol ${cls}`.trim()
    b.innerHTML = `${icon}<span>${label}</span>`
    b.addEventListener('pointerdown', e => e.stopPropagation())
    b.addEventListener('click', e => {
      e.stopPropagation()
      press()
    })
    parent.appendChild(b)
    return b
  }
  const cmdButtons = DIVISI.map((d, i) => button(rowCmd, { id: `btn-komandan-${d.id}`, icon: IKON_KOMANDO[d.jenis], label: d.name, cls: `panji-${d.panji}` }, () => select(sel === i ? -1 : i)))
  const orderButtons = {
    ikuti: button(rowOrders, { id: 'btn-perintah-ikuti', icon: IKON_KOMANDO.ikuti, label: 'Ikuti aku' }, () => order('ikuti')),
    titik: button(rowOrders, { id: 'btn-perintah-titik', icon: IKON_KOMANDO.titik, label: 'Ke titik' }, () => order('titik')),
    formasi: button(rowOrders, { id: 'btn-perintah-formasi', icon: IKON_KOMANDO.formasi, label: 'Formasi' }, () => order('formasi')),
    kiri: button(rowOrders, { id: 'btn-perintah-kiri', icon: IKON_KOMANDO.kiri, label: 'Kiri' }, () => order('kiri')),
    kanan: button(rowOrders, { id: 'btn-perintah-kanan', icon: IKON_KOMANDO.kanan, label: 'Kanan' }, () => order('kanan')),
  }
  const formButtons = Object.fromEntries(FORMASI.map(f => [f, button(rowForm, { id: `btn-formasi-${f}`, icon: IKON_KOMANDO[f], label: NAMA_FORMASI[f] }, () => setFormation(f))]))
  button(rowForm, { id: 'btn-formasi-batal', icon: IKON_KOMANDO.batal, label: 'Batal', cls: 'batal' }, () => {
    suara.play('klik')
    formOpen = false
    refresh(true)
  })

  const cmdr = i => bala.divisions[i].cmdr
  const headOf = i => () => {
    const c = cmdr(i)
    return { x: c.x, y: c.y + 3.6, z: c.z }
  }
  // komandan menjawab (gelembung di atas kepalanya) + aba-aba & sorak pasukannya
  function reply(i, kind) {
    const d = DIVISI[i]
    const text = pick(JAWAB[kind])
    bubbles.say(headOf(i), text, 2200, `komandan-${d.id}`)
    const c = cmdr(i)
    suara.play('aba-aba')
    sfx('komandan-siap', { x: c.x, y: c.y + 2.5, z: c.z }, { nada: 120 + i * 12 })
    if (kind !== 'pilih') sfx('sorak-pasukan', { x: c.x, y: c.y + 1.5, z: c.z }, { delay: 0.35, kuda: d.jenis === 'kavaleri' })
    return text
  }
  function select(i) {
    sel = i
    picking = false
    formOpen = false
    bala.select(i)
    if (i >= 0) {
      const d = DIVISI[i]
      const text = reply(i, 'pilih')
      message(`${d.komandan}: “${text}”`, 1800)
    } else suara.play('klik')
    refresh(true)
  }
  function order(kind) {
    if (sel < 0) {
      suara.play('klik')
      message('Pilih dulu komandannya (tombol Pemanah, Pedang, Perisai, atau Kavaleri).', 2400)
      return
    }
    const d = DIVISI[sel]
    if (kind === 'formasi') {
      suara.play('klik')
      formOpen = !formOpen
      picking = false
      refresh(true)
      return
    }
    if (kind === 'titik') {
      suara.play('klik')
      picking = !picking
      formOpen = false
      if (picking) message(touch ? `${d.komandan}: ketuk tanah tujuan — atau buka Peta lalu ketuk titiknya.` : `${d.komandan}: klik tanah tujuan — atau buka Peta (M) lalu klik titiknya.`, 3200)
      refresh(true)
      return
    }
    picking = false
    formOpen = false
    if (kind === 'ikuti') bala.follow(sel)
    else bala.flank(sel, kind === 'kiri' ? -1 : 1)
    const text = reply(sel, kind)
    message(`${d.komandan}: “${text}”`, 2000)
    refresh(true)
  }
  function setFormation(f) {
    if (sel < 0) return
    bala.setFormation(sel, f)
    formOpen = false
    const d = DIVISI[sel]
    reply(sel, 'formasi')
    message(`${d.komandan}: “Formasi ${NAMA_FORMASI[f]}!”`, 1800)
    refresh(true)
  }
  // titik tujuan dari ketukan tanah (main.js handleTap) atau dari peta
  function pickPoint(p) {
    if (!picking || sel < 0 || !p) return false
    picking = false
    bala.moveTo(sel, p.x, p.z)
    const d = DIVISI[sel]
    const text = reply(sel, 'titik')
    const far = Math.hypot(p.x - cmdr(sel).x, p.z - cmdr(sel).z)
    message(`${d.komandan}: “${text}” (${Math.round(far)} m)`, 2000)
    refresh(true)
    return true
  }

  let last = ''
  let tick = 0
  function refresh(force = false) {
    const st = sel >= 0 ? bala.status(sel) : null
    const key = `${sel}|${picking}|${formOpen}|${st ? `${st.doing}|${st.formasi}` : ''}`
    if (!force && key === last) return
    last = key
    cmdButtons.forEach((b, i) => b.classList.toggle('dipilih', i === sel))
    for (const b of Object.values(orderButtons)) b.classList.toggle('redup', sel < 0)
    orderButtons.titik.classList.toggle('menyala', picking)
    orderButtons.ikuti.classList.toggle('aktif', !!st && st.mode === 'ikut')
    orderButtons.formasi.classList.toggle('aktif', formOpen)
    rowOrders.hidden = formOpen
    rowForm.hidden = !formOpen
    for (const [f, b] of Object.entries(formButtons)) b.classList.toggle('aktif', !!st && st.formasi === f)
    if (!st) status.textContent = 'Pilih komandan untuk memberi perintah'
    else if (picking) status.textContent = `${DIVISI[sel].komandan} · ketuk tujuan`
    else status.textContent = `${DIVISI[sel].komandan} · ${NAMA_FORMASI[st.formasi]} · ${st.doing}`
  }

  return {
    get selected() {
      return sel
    },
    get picking() {
      return picking
    },
    setVisible(on) {
      root.hidden = !on
    },
    select,
    order,
    setFormation,
    pickPoint,
    // keyboard (komputer)
    key(code) {
      const n = ['Digit6', 'Digit7', 'Digit8', 'Digit9'].indexOf(code)
      if (n >= 0) select(sel === n ? -1 : n)
      else if (code === 'KeyI') order('ikuti')
      else if (code === 'KeyO') order('titik')
      else if (code === 'KeyZ') order('kiri')
      else if (code === 'KeyX') order('kanan')
      else if (code === 'KeyL' && sel >= 0) setFormation(FORMASI[(FORMASI.indexOf(bala.status(sel).formasi) + 1) % FORMASI.length])
      else return false
      return true
    },
    // tanda divisi di peta (titik sewarna panji + nama)
    mapMarks() {
      return bala.divisions.map((div, i) => ({ x: div.cmdr.x, z: div.cmdr.z, label: DIVISI[i].name, color: { hijau: '#5ccf5c', merah: '#ff5a4a', biru: '#5a9aff', emas: '#ffd34d' }[DIVISI[i].panji] }))
    },
    update(dt) {
      if ((tick -= dt) > 0) return
      tick = 0.25
      refresh()
    },
  }
}
