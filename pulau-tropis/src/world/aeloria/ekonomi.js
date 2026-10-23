// Ekonomi Aeloria: barang dagangan, harga, stok tiap kios, dan alirannya.
// - Pandai besi yang sedang menempa di landasan menyelesaikan satu barang setiap ±70–110 detik
//   (pedang, tombak, perisai, zirah, helm) → stok kios Tempa Aeloria bertambah.
// - Pedagang makanan menyiapkan dagangannya selama berjaga di kios (±1 porsi per menit); petani yang
//   selesai bekerja mengantar hasil panen ke kios roti / buah / sayur.
// - Penduduk & kesatria yang berbelanja ikut membeli (stok berkurang) — barang bisa habis.
// - Pemain membeli dengan koin (didapat dari mengalahkan orc). Kios hanya melayani bila pedagangnya
//   sedang di tempat. Pedagang tidak pernah memusuhi pemain, bahkan saat pemain menjadi musuh
//   kerajaan (DECISIONS #50).

// jenis: makanan / minuman / ramuan (dipakai dari tas), senjata / perisai / zirah / helm (dipakai
// di badan). pulih = nyawa; kuat / cepat = lama ramuan (detik); serang = pengali kerusakan;
// jangkau = jangkauan tambahan (m); tahan = bagian kerusakan yang ditahan
export const BARANG = {
  rotiGandum: { nama: 'Roti Gandum', jenis: 'makanan', harga: 4, pulih: 15 },
  rotiMadu: { nama: 'Roti Madu', jenis: 'makanan', harga: 7, pulih: 25 },
  bekalElf: { nama: 'Roti Bekal Elf', jenis: 'makanan', harga: 14, pulih: 45 },
  apelPerak: { nama: 'Apel Perak', jenis: 'makanan', harga: 3, pulih: 10 },
  anggurHutan: { nama: 'Anggur Hutan', jenis: 'makanan', harga: 5, pulih: 16 },
  buahBintang: { nama: 'Buah Bintang', jenis: 'makanan', harga: 9, pulih: 28 },
  sateRusa: { nama: 'Sate Rusa', jenis: 'makanan', harga: 8, pulih: 26 },
  dagingPanggang: { nama: 'Daging Panggang', jenis: 'makanan', harga: 12, pulih: 38 },
  sariBuah: { nama: 'Sari Buah', jenis: 'minuman', harga: 4, pulih: 12 },
  tehDaun: { nama: 'Teh Daun Perak', jenis: 'minuman', harga: 6, pulih: 18 },
  maduHutan: { nama: 'Madu Hutan', jenis: 'minuman', harga: 9, pulih: 24 },
  saladTaman: { nama: 'Salad Taman', jenis: 'makanan', harga: 3, pulih: 10 },
  supSayur: { nama: 'Sup Sayur', jenis: 'makanan', harga: 5, pulih: 18 },
  ikanBakar: { nama: 'Ikan Bakar', jenis: 'makanan', harga: 7, pulih: 24 },
  kejuElf: { nama: 'Keju Elf', jenis: 'makanan', harga: 6, pulih: 20 },
  ramuanPenyembuh: { nama: 'Ramuan Penyembuh', jenis: 'ramuan', harga: 25, pulih: 70 },
  ramuanKekuatan: { nama: 'Ramuan Kekuatan', jenis: 'ramuan', harga: 35, kuat: 60 },
  ramuanKecepatan: { nama: 'Ramuan Kecepatan', jenis: 'ramuan', harga: 30, cepat: 60 },
  pedangPerak: { nama: 'Pedang Perak Elf', jenis: 'senjata', harga: 120, serang: 1.5 },
  tombakElf: { nama: 'Tombak Elf', jenis: 'senjata', harga: 95, serang: 1.2, jangkau: 0.9 },
  perisaiDaun: { nama: 'Perisai Daun', jenis: 'perisai', harga: 60, tahan: 0.2 },
  perisaiPerak: { nama: 'Perisai Perak', jenis: 'perisai', harga: 140, tahan: 0.32 },
  zirahRantai: { nama: 'Zirah Rantai', jenis: 'zirah', harga: 110, tahan: 0.25 },
  zirahPerak: { nama: 'Zirah Perak Aeloria', jenis: 'zirah', harga: 240, tahan: 0.4 },
  helmElf: { nama: 'Helm Elf', jenis: 'helm', harga: 55, tahan: 0.1 },
}
export const PAKAIAN = ['senjata', 'perisai', 'zirah', 'helm']

// kalimat keterangan efek barang (untuk daftar toko & tas)
export function efekTeks(b) {
  if (b.pulih) return `+${b.pulih} nyawa`
  if (b.kuat) return `serangan ×1,5 selama ${b.kuat} detik`
  if (b.cepat) return `lari lebih cepat selama ${b.cepat} detik`
  const parts = []
  if (b.serang) parts.push(`serangan ×${String(b.serang).replace('.', ',')}`)
  if (b.jangkau) parts.push(`jangkauan +${String(b.jangkau).replace('.', ',')} m`)
  if (b.tahan) parts.push(`menahan ${Math.round(b.tahan * 100)}% luka`)
  return parts.join(' · ')
}

// isi kios menurut jenis dagangannya (kios lain hanya dagangan warga, tidak dijual ke pemain)
export const KATALOG = {
  roti: ['rotiGandum', 'rotiMadu', 'bekalElf'],
  buah: ['apelPerak', 'anggurHutan', 'buahBintang'],
  daging: ['sateRusa', 'dagingPanggang'],
  madu: ['sariBuah', 'tehDaun', 'maduHutan'],
  sayur: ['saladTaman', 'supSayur'],
  ikan: ['ikanBakar'],
  keju: ['kejuElf'],
  ramuan: ['ramuanPenyembuh', 'ramuanKekuatan', 'ramuanKecepatan'],
  senjata: ['pedangPerak', 'tombakElf'],
  perisai: ['perisaiDaun', 'perisaiPerak'],
  zirah: ['zirahRantai', 'zirahPerak', 'helmElf'],
}
export const NAMA_KIOS = {
  roti: 'Kios Roti', buah: 'Kios Buah', daging: 'Kios Daging Panggang', madu: 'Kios Minuman & Madu', sayur: 'Kios Sayur',
  ikan: 'Kios Ikan Bakar', keju: 'Kios Keju', ramuan: 'Kios Ramuan', senjata: 'Tempa Aeloria — Senjata',
  perisai: 'Tempa Aeloria — Perisai', zirah: 'Tempa Aeloria — Zirah & Helm',
}
const MAKS = { makanan: 8, minuman: 8, ramuan: 4, senjata: 3, perisai: 3, zirah: 3, helm: 3 }
const maxOf = id => MAKS[BARANG[id].jenis] ?? 4

// sites = tempat kegiatan (kehidupan.js); rand = pembangkit acak
export function createEconomy({ sites, rand = Math.random }) {
  // kios yang melayani pemain: punya katalog menurut barangnya
  const stalls = sites.filter(s => s.type === 'kios' && KATALOG[s.goods] && (s.shop || s.area === 'tempa'))
  for (const s of stalls) {
    s.stock = {}
    for (const id of KATALOG[s.goods]) {
      const b = BARANG[id]
      const start = b.jenis === 'makanan' || b.jenis === 'minuman' ? 3 + Math.floor(rand() * 4) : 1 + Math.floor(rand() * 2)
      s.stock[id] = Math.min(maxOf(id), start)
    }
    s.made = 0 // barang yang sudah dibuat / disiapkan di kios ini
    s.sold = 0 // dibeli penduduk
  }
  const smithStall = goods => stalls.find(s => s.area === 'tempa' && s.goods === goods)
  let soldToPlayer = 0
  let harvests = 0

  // tambah satu barang acak yang belum penuh di kios s; hasil id barang atau null
  function restock(s, n = 1) {
    let made = null
    for (let k = 0; k < n; k++) {
      const ids = KATALOG[s.goods].filter(id => s.stock[id] < maxOf(id))
      if (!ids.length) break
      made = ids[Math.floor(rand() * ids.length)]
      s.stock[made]++
      s.made++
    }
    return made
  }

  return {
    stalls,
    // pandai besi di landasan bengkel ke-i menyelesaikan satu barang (bengkel 0 senjata, 1 perisai, 2 zirah)
    forged(forge) {
      const s = smithStall(['senjata', 'perisai', 'zirah'][forge] || 'senjata')
      return s ? restock(s) : null
    },
    // pedagang menyiapkan dagangan di kiosnya
    prepared(stall) {
      return stall.stock ? restock(stall) : null
    },
    // petani mengantar hasil panen ke kios s
    delivered(stall, n = 3) {
      if (!stall.stock) return null
      harvests++
      return restock(stall, n)
    },
    // penduduk / kesatria membeli satu barang yang ada
    npcBuy(stall) {
      if (!stall.stock) return null
      const ids = KATALOG[stall.goods].filter(id => stall.stock[id] > 0)
      if (!ids.length) return null
      const id = ids[Math.floor(rand() * ids.length)]
      stall.stock[id]--
      stall.sold++
      return id
    },
    // pemain membeli barang `id` dengan dompetnya (tas.js); hasil { ok, alasan }
    buy(stall, id, tas) {
      const b = BARANG[id]
      if (!b || !stall.stock || !(id in stall.stock)) return { ok: false, alasan: 'Barang itu tidak dijual di sini.' }
      if (stall.stock[id] <= 0) return { ok: false, alasan: `${b.nama} sedang habis.` }
      if (tas.koin < b.harga) return { ok: false, alasan: `Koinmu kurang (${tas.koin} dari ${b.harga}).` }
      tas.bayar(b.harga)
      stall.stock[id]--
      soldToPlayer++
      tas.terima(id)
      return { ok: true }
    },
    // kios penghasil makanan dari ladang (tujuan antar petani)
    farmStalls: stalls.filter(s => ['roti', 'buah', 'sayur'].includes(s.goods)),
    stats: () => ({
      kios: stalls.length,
      dibuat: stalls.reduce((n, s) => n + s.made, 0),
      dibeliPenduduk: stalls.reduce((n, s) => n + s.sold, 0),
      dibeliPemain: soldToPlayer,
      antarPanen: harvests,
      stokTempa: Object.fromEntries(stalls.filter(s => s.area === 'tempa').map(s => [s.goods, { ...s.stock }])),
    }),
  }
}
