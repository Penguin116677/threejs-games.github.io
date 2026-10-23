import { BARANG, PAKAIAN, KATALOG, NAMA_KIOS, efekTeks } from '../world/aeloria/ekonomi.js'
import { ikonBarang, IKON_KOIN, IKON_TAS } from './ikon.js'

// Belanja di Aeloria: koin di HUD, tombol Belanja di dekat kios, panel toko (daftar barang, stok,
// harga) dan panel Tas (makan / minum / ramuan, pakai-lepas perlengkapan). Kios hanya melayani bila
// salah satu pedagangnya sedang berjaga di balik meja — bila tidak, pemain diberi tahu pedagangnya
// sedang apa. Pedagang tetap melayani walau pemain dimusuhi kerajaan (DECISIONS #50).
const $ = id => document.getElementById(id)
const NEAR = 3.4 // m dari depan meja: tombol Belanja muncul
const FAR = 7 // m: panel toko tertutup sendiri bila pemain menjauh
const KATA_PAKAI = { makanan: 'Makan', minuman: 'Minum', ramuan: 'Minum' }
const JENIS_TEKS = { senjata: 'Senjata', perisai: 'Perisai', zirah: 'Zirah', helm: 'Helm' }
const TERIMA_KASIH = ['Terima kasih!', 'Semoga bermanfaat!', 'Datang lagi, ya!', 'Pilihan yang bagus!']
// nama pendek di tombol Belanja (tombolnya sempit: di sebelahnya ada tombol jurus)
const PENDEK = {
  roti: 'Roti', buah: 'Buah', daging: 'Daging', madu: 'Minuman', sayur: 'Sayur', ikan: 'Ikan Bakar', keju: 'Keju', ramuan: 'Ramuan',
  senjata: 'Senjata', perisai: 'Perisai', zirah: 'Zirah & Helm',
}
const angka = v => String(Math.round(v * 100) / 100).replace('.', ',')
const koinHtml = n => `${IKON_KOIN}<span>${n}</span>`

// life = createLife (kios & pedagangnya; null bila rakyat Aeloria gagal dibuat — koin & Tas tetap
// jalan), bag = createBag, player, bubbles (gelembung ucapan), message(teks, ms), maxHp,
// wanted() = pemain sedang dimusuhi kerajaan Aeloria (pedagang tetap melayani)
export function createShop({ life, bag, player, bubbles, message, maxHp, wanted = () => false }) {
  const stalls = life ? life.economy.stalls : []
  const el = {
    koin: $('koin'), tombol: $('btn-belanja'), tas: $('btn-tas'),
    toko: $('toko'), judul: $('toko-judul'), penjual: $('toko-penjual'), tokoKoin: $('toko-koin'), daftar: $('toko-daftar'), tokoPesan: $('toko-pesan'),
    panelTas: $('tas'), tasKoin: $('tas-koin'), tasEfek: $('tas-efek'), tasDaftar: $('tas-daftar'), tasPesan: $('tas-pesan'),
  }
  el.tas.innerHTML = `${IKON_TAS}<span>Tas</span>`
  let near = null // kios terdekat dalam jangkauan tombol Belanja
  let current = null // kios yang panelnya sedang terbuka
  let pending = null // kios yang diketuk: panel dibuka saat pemain tiba
  let checkT = 0
  let shownShop = ''
  let shownBag = ''
  let shownButton = ''

  const dist = (s, p) => Math.hypot(s.front.x - p.x, s.front.z - p.z)
  function nearestStall(p, r) {
    let best = null
    let bd = r
    for (const s of stalls) {
      const d = dist(s, p)
      if (d < bd) {
        bd = d
        best = s
      }
    }
    return best
  }
  // "Kios Roti sedang tutup: Galalis sedang di rumah dan Galros sedang berjalan kembali ke kios."
  function closedText(s) {
    const where = d => (d.kembali ? `${d.nama} sedang berjalan kembali ke kios` : `${d.nama} ${d.kegiatan}`)
    return `${NAMA_KIOS[s.goods]} sedang tutup: ${life.sellers(s).pergi.map(where).join(' dan ')}.`
  }
  function sayThanks(s) {
    const d = life.sellers(s).jaga[0]
    const a = d && life.agents[d.id]
    if (!a) return
    bubbles.say(() => ({ x: a.x, y: a.y + 2.25 * a.scale, z: a.z }), TERIMA_KASIH[Math.floor(Math.random() * TERIMA_KASIH.length)], 2200, `elf${a.id}`)
  }

  // ----------------------------------------------------------------- panel toko
  function renderShop(force = false) {
    const s = current
    const open = life.isOpen(s)
    const key = `${open}|${wanted()}|${bag.koin}|${KATALOG[s.goods].map(id => `${s.stock[id]}${bag.punya[id] ? 'p' : ''}`).join()}`
    if (!force && key === shownShop) return
    shownShop = key
    el.judul.textContent = NAMA_KIOS[s.goods]
    const { jaga } = life.sellers(s)
    el.penjual.textContent = !open
      ? 'Pedagangnya sedang pergi'
      : wanted()
        ? `Dilayani ${jaga.map(d => d.nama).join(' & ')} — pedagang tetap netral walau kesatria memusuhimu`
        : `Dilayani ${jaga.map(d => d.nama).join(' & ')}`
    el.tokoKoin.innerHTML = koinHtml(bag.koin)
    el.daftar.innerHTML = KATALOG[s.goods].map(id => {
      const b = BARANG[id]
      const n = s.stock[id]
      const owned = PAKAIAN.includes(b.jenis) && bag.punya[id]
      const can = open && n > 0 && !owned && bag.koin >= b.harga
      const label = owned ? 'Dimiliki' : n > 0 ? koinHtml(b.harga) : 'Habis'
      return `<div class="barang"><span class="ikon">${ikonBarang(id)}</span><div class="info"><b>${b.nama}</b><small>${efekTeks(b)} · stok ${n}</small></div>`
        + `<button type="button" class="beli${can ? '' : ' redup'}" data-id="${id}">${label}</button></div>`
    }).join('')
  }
  function openShop(s) {
    pending = null
    if (!life.isOpen(s)) {
      message(`${closedText(s)} Tunggu sebentar atau coba kios lain.`, 4200)
      return
    }
    closeBag()
    current = s
    el.tokoPesan.textContent = s.area === 'tempa' ? 'Perlengkapan langsung kamu pakai setelah dibeli.' : 'Makanan & ramuan masuk ke Tas.'
    renderShop(true)
    el.toko.hidden = false
  }
  function closeShop() {
    current = null
    el.toko.hidden = true
  }
  function buy(id) {
    const s = current
    const b = BARANG[id]
    if (!s || !b) return
    if (!life.isOpen(s)) {
      el.tokoPesan.textContent = closedText(s)
      renderShop(true)
      return
    }
    if (PAKAIAN.includes(b.jenis) && bag.punya[id]) {
      el.tokoPesan.textContent = `Kamu sudah punya ${b.nama}. Pakai atau lepas lewat Tas.`
      return
    }
    const r = life.economy.buy(s, id, bag)
    if (!r.ok) {
      el.tokoPesan.textContent = bag.koin < b.harga ? `${r.alasan} Kalahkan orc untuk mendapat koin.` : r.alasan
      return
    }
    sayThanks(s)
    el.tokoPesan.textContent = PAKAIAN.includes(b.jenis) ? `${b.nama} dibeli dan langsung kamu pakai.` : `${b.nama} masuk ke Tas.`
    renderShop(true)
  }
  el.daftar.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]')
    if (btn) buy(btn.dataset.id)
  })
  $('btn-tutup-toko').addEventListener('click', closeShop)
  el.toko.addEventListener('click', e => {
    if (e.target === el.toko) closeShop() // ketuk di luar kartu
  })

  // ----------------------------------------------------------------- panel tas
  function renderBag(force = false) {
    const e = bag.effect()
    const { buff } = bag
    const key = `${bag.koin}|${JSON.stringify(bag.barang)}|${JSON.stringify(bag.pakai)}|${Object.keys(bag.punya).join()}|${Math.ceil(buff.kuat)}|${Math.ceil(buff.cepat)}|${Math.round(player.hp)}`
    if (!force && key === shownBag) return
    shownBag = key
    el.tasKoin.innerHTML = koinHtml(bag.koin)
    const parts = [`serangan ×${angka(e.serang)}`, `menahan ${Math.round(e.tahan * 100)}% luka`]
    if (e.jangkau) parts.push(`jangkauan +${angka(e.jangkau)} m`)
    if (buff.kuat > 0) parts.push(`ramuan kekuatan: ${Math.ceil(buff.kuat)} dtk`)
    if (buff.cepat > 0) parts.push(`ramuan kecepatan: ${Math.ceil(buff.cepat)} dtk`)
    el.tasEfek.textContent = parts.join(' · ')
    const rows = []
    for (const [id, n] of Object.entries(bag.barang)) {
      const b = BARANG[id]
      rows.push(`<div class="barang"><span class="ikon">${ikonBarang(id)}</span><div class="info"><b>${b.nama} <i>×${n}</i></b><small>${efekTeks(b)}</small></div>`
        + `<button type="button" class="pakai" data-id="${id}">${KATA_PAKAI[b.jenis]}</button></div>`)
    }
    for (const id of Object.keys(bag.punya)) {
      const b = BARANG[id]
      const on = bag.pakai[b.jenis] === id
      rows.push(`<div class="barang${on ? ' dipakai' : ''}"><span class="ikon">${ikonBarang(id)}</span><div class="info"><b>${b.nama}</b><small>${JENIS_TEKS[b.jenis]} · ${efekTeks(b)}${on ? ' · dipakai' : ''}</small></div>`
        + `<button type="button" class="pakai${on ? ' lepas' : ''}" data-id="${id}">${on ? 'Lepas' : 'Pakai'}</button></div>`)
    }
    el.tasDaftar.innerHTML = rows.length ? rows.join('') : '<div class="kosong">Tas masih kosong. Belanja makanan & ramuan di Pasar Aeloria, perlengkapan di Tempa Aeloria (lihat Peta).</div>'
  }
  function openBag() {
    closeShop()
    el.tasPesan.textContent = 'Koin didapat dari mengalahkan orc.'
    renderBag(true)
    el.panelTas.hidden = false
  }
  function closeBag() {
    el.panelTas.hidden = true
  }
  function use(id) {
    const b = BARANG[id]
    if (!b) return
    if (PAKAIAN.includes(b.jenis)) {
      bag.kenakan(id)
      el.tasPesan.textContent = bag.pakai[b.jenis] === id ? `${b.nama} dipakai.` : `${b.nama} dilepas.`
      return
    }
    if (b.pulih && !b.kuat && !b.cepat && player.hp >= maxHp) {
      el.tasPesan.textContent = 'Nyawamu masih penuh — simpan dulu untuk nanti.'
      return
    }
    if (player.defeated) return
    const r = bag.gunakan(id)
    if (!r) return
    if (r.pulih) player.heal(r.pulih)
    el.tasPesan.textContent = r.kuat ? `Seranganmu menguat selama ${r.kuat} detik!` : r.cepat ? `Langkahmu menjadi ringan selama ${r.cepat} detik!` : `${b.nama} memulihkan ${r.pulih} nyawa.`
  }
  el.tasDaftar.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]')
    if (btn) use(btn.dataset.id)
  })
  el.tas.addEventListener('click', () => (el.panelTas.hidden ? openBag() : closeBag()))
  $('btn-tutup-tas').addEventListener('click', closeBag)
  el.panelTas.addEventListener('click', e => {
    if (e.target === el.panelTas) closeBag()
  })

  // ----------------------------------------------------------------- koin & tombol Belanja
  const showCoins = () => {
    el.koin.innerHTML = koinHtml(bag.koin)
  }
  showCoins()
  bag.onChange(() => {
    showCoins()
    if (current) renderShop()
    if (!el.panelTas.hidden) renderBag()
  })
  el.tombol.addEventListener('click', () => {
    if (near) openShop(near)
  })
  window.addEventListener('keydown', e => {
    if (e.repeat) return
    if (e.code === 'KeyE' && near && !current) openShop(near)
    else if (e.code === 'KeyB') el.tas.click()
    else if (e.code === 'Escape') {
      closeShop()
      closeBag()
    }
  })

  return {
    // kios di dekat titik tanah yang diketuk (untuk "ketuk kios untuk berbelanja")
    stallAt(x, z) {
      for (const s of stalls) if (Math.hypot(s.x - x, s.z - z) < 2.6 || Math.hypot(s.front.x - x, s.front.z - z) < 1.6) return s
      return null
    },
    // pemain berjalan ke kios ini; panel dibuka saat tiba
    approach(s) {
      pending = s
    },
    // hadiah koin (mis. mengalahkan orc): angka "+n" melayang di dekat koin HUD
    reward(n) {
      bag.dapat(n)
      const tip = document.createElement('span')
      tip.className = 'koin-tambah'
      tip.textContent = `+${n}`
      el.koin.appendChild(tip)
      setTimeout(() => tip.remove(), 1300)
    },
    get open() {
      return !!current || !el.panelTas.hidden
    },
    close() {
      closeShop()
      closeBag()
    },
    update(dt, active) {
      bag.update(dt)
      checkT -= dt
      if (checkT > 0) return
      checkT = 0.2
      const p = player.position
      near = active && !player.defeated ? nearestStall(p, NEAR) : null
      // tiba di kios yang diketuk
      if (pending && !player.hasPath) {
        if (dist(pending, p) < NEAR + 0.6) openShop(pending)
        pending = null
      }
      if (current && (dist(current, p) > FAR || !active || player.defeated)) closeShop()
      if (current) renderShop()
      if (!el.panelTas.hidden) renderBag()
      // tombol Belanja: nama kios, redup bila tutup
      const key = near && !current ? `${near.goods}|${life.isOpen(near)}` : ''
      if (key !== shownButton) {
        shownButton = key
        el.tombol.hidden = !key
        if (key) {
          const open = life.isOpen(near)
          el.tombol.classList.toggle('tutup-kios', !open)
          el.tombol.innerHTML = `${IKON_TAS}<span>Belanja</span><small>${open ? PENDEK[near.goods] || 'Kios' : 'kios tutup'}</small>`
        }
      }
    },
  }
}
