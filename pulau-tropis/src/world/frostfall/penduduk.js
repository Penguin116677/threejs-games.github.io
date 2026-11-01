import { rng } from '../../core/random.js'

// Penduduk Kerajaan Frostfall (v0.22.0): tepat JUMLAH orang dalam keluarga-keluarga yang masing-masing
// tinggal di satu rumah (P.warga.homes dari plan.js) — ayah & ibu, anak-anak, kadang kakek / nenek.
// Tiap orang punya nama, nama keluarga, umur, sifat, pekerjaan sesuai kampungnya, teman, jam bangun &
// tidur, dan rupa (jenis badan, warna baju, bagian yang dipakai). Murni data (tanpa Three.js) supaya
// bisa diuji langsung dengan Node; warga.js yang menghidupkannya.

export const JUMLAH = 300

const NAMA_PRIA = [
  'Arne', 'Bjarni', 'Dagur', 'Eirik', 'Finnur', 'Gunnar', 'Halvard', 'Ivar', 'Kjell', 'Leif', 'Magnus', 'Nils', 'Oddvar', 'Ragnar',
  'Sten', 'Torvald', 'Ulf', 'Vidar', 'Yngve', 'Brann', 'Haldor', 'Sigvard', 'Torben', 'Asgeir', 'Orm', 'Rune', 'Einar', 'Geir',
  'Hakon', 'Jarle', 'Knut', 'Lars', 'Mats', 'Ottar', 'Per', 'Steinar', 'Trygve', 'Vegard', 'Bard', 'Edvin',
]
const NAMA_WANITA = [
  'Astrid', 'Brynja', 'Dagny', 'Eira', 'Freya', 'Gudrun', 'Hilde', 'Inga', 'Jorunn', 'Kari', 'Liv', 'Maren', 'Nanna', 'Oda', 'Ragna',
  'Sigrid', 'Solveig', 'Thora', 'Unn', 'Vigdis', 'Ylva', 'Alva', 'Embla', 'Runa', 'Tove', 'Siri', 'Hedda', 'Linnea', 'Elin', 'Aslaug',
  'Bergit', 'Frida', 'Gro', 'Helga', 'Ingrid', 'Malin', 'Ragnhild', 'Signe', 'Tuva', 'Vilde',
]
const KELUARGA = [
  'Torvik', 'Halden', 'Brekke', 'Fjell', 'Isdal', 'Snoberg', 'Kaldvik', 'Ulvas', 'Ravnsby', 'Lindholm', 'Grimstad', 'Askeland',
  'Vinterli', 'Nordli', 'Bjerk', 'Hvitfjell', 'Elvestad', 'Moberg', 'Sandvik', 'Isberg', 'Furuli', 'Holt', 'Kvamme', 'Lyngvik',
  'Myrstad', 'Nesheim', 'Opdal', 'Rognli', 'Skog', 'Tindvik', 'Vassbotn', 'Aasen', 'Bremnes', 'Dalen', 'Engen', 'Fossli', 'Granli',
  'Hauge', 'Jordal', 'Kleiven', 'Lunde', 'Midtbo', 'Nyhus', 'Ovrebo', 'Rabben', 'Solli', 'Tveit', 'Urdal', 'Vik', 'Aune', 'Berg',
  'Dahle', 'Eide', 'Flaten', 'Gjerde', 'Hovland', 'Kolstad', 'Lien', 'Moen', 'Narum', 'Oien',
]
export const SIFAT = ['rajin', 'riang', 'ramah', 'rakus', 'pemalas', 'petualang', 'pemberani', 'pemarah']

// pekerjaan: nama tampilan + kegiatan kerja utamanya (warga.js)
export const PEKERJAAN = {
  nelayan: 'nelayan',
  pengasap: 'pengasap ikan',
  pemburu: 'pemburu',
  penyamak: 'penyamak kulit',
  penebang: 'penebang kayu',
  pedagang: 'pedagang pasar',
  pandai: 'pandai besi',
  masak: 'juru masak kedai panjang',
  kedai: 'pemilik kedai panjang',
  jaga: 'penjaga menara',
  pancingEs: 'pemancing di es sungai',
  tetua: 'tetua desa',
  kepala: 'kepala desa',
  warga: 'mengurus rumah',
  anak: 'anak-anak',
  remaja: 'membantu orang tua',
}
export const DESA = {
  desa: { nama: 'Desa Emberwick', pendek: 'Emberwick' },
  nelayan: { nama: 'Kampung Teluk Salju', pendek: 'Teluk Salju' },
  pemburu: { nama: 'Kampung Rusa Putih', pendek: 'Rusa Putih' },
}

// pasangan warna palet (elf.js WARNA): kulit, rambut, jaket, celana, sepatu, sulaman, topi/tudung, syal/jubah
const W = { kulitTerang: 0, hijau: 1, kuning: 2, jingga: 3, merah: 4, biru: 5, biruMuda: 6, ungu: 7, hitam: 8, abuBiru: 9, kelabu: 10, perak: 11, putih: 12, kulitCokelat: 13, cokelat: 14, kulitSawo: 15 }
const BAGIAN = { helm: 1, rambutPanjang: 2, tabung: 4, sarung: 8, jubah: 16, zirah: 32, mahkota: 64, celemek: 128 }

// rangkaian data penduduk dari daftar rumah; hasil: { orang: [...], keluarga: [...] }
export function buatPenduduk(homes, { jumlah = JUMLAH, seed = 4242 } = {}) {
  const rand = rng(seed)
  const pick = list => list[Math.floor(rand() * list.length)]
  const between = (a, b) => a + (b - a) * rand()
  const weighted = pairs => {
    let r = rand() * pairs.reduce((s, p) => s + p[1], 0)
    for (const [v, w] of pairs) if ((r -= w) <= 0) return v
    return pairs[pairs.length - 1][0]
  }
  const usedFamily = new Set()
  const familyName = () => {
    for (let k = 0; k < 50; k++) {
      const n = pick(KELUARGA)
      if (!usedFamily.has(n)) {
        usedFamily.add(n)
        return n
      }
    }
    return pick(KELUARGA)
  }
  const usedNames = new Map() // desa → nama depan yang sudah dipakai (supaya tidak kembar di satu kampung)
  const firstName = (desa, wanita) => {
    const set = usedNames.get(desa) || new Set()
    usedNames.set(desa, set)
    const list = wanita ? NAMA_WANITA : NAMA_PRIA
    for (let k = 0; k < 30; k++) {
      const n = pick(list)
      if (!set.has(n)) {
        set.add(n)
        return n
      }
    }
    return pick(list)
  }
  const sifatAcak = () => Object.fromEntries(SIFAT.map(k => [k, Math.round(rand() * 100) / 100]))

  const orang = []
  const keluarga = []
  const person = (fam, peran, wanita, umur) => {
    const p = {
      id: orang.length, keluarga: fam.id, namaKeluarga: fam.nama, nama: firstName(fam.desa, wanita), wanita, umur, peran,
      desa: fam.desa, rumah: fam.rumah, sifat: sifatAcak(), kerja: null, teman: [], pasangan: null, anak: [], ortu: [],
    }
    orang.push(p)
    fam.anggota.push(p.id)
    return p
  }
  // 1) susunan tiap keluarga dulu (banyak anak, kakek / nenek), lalu disesuaikan sampai tepat `jumlah`
  const plans = homes.map(() => {
    const tua = rand() < 0.08 // pasangan tua tanpa anak di rumah
    const sendiri = !tua && rand() < 0.07 // orang tua tunggal
    return {
      tua, sendiri, ayahDulu: rand() < 0.5,
      anak: tua ? 0 : weighted([[0, 6], [1, 16], [2, 30], [3, 30], [4, 14], [5, 4]]),
      kakek: !tua && rand() < 0.42 ? (rand() < 0.4 ? 2 : 1) : 0,
    }
  })
  const size = f => (f.sendiri ? 1 : 2) + f.anak + f.kakek
  let total = plans.reduce((t, f) => t + size(f), 0)
  for (let guard = 0; total !== jumlah && guard < 5000; guard++) {
    const f = pick(plans)
    if (total < jumlah && !f.tua && f.anak < 5) {
      f.anak++
      total++
    } else if (total > jumlah && (f.anak > 1 || f.kakek > 0)) {
      if (f.kakek > 0 && rand() < 0.5) f.kakek--
      else if (f.anak > 1) f.anak--
      else f.kakek--
      total--
    }
  }
  // 2) orangnya
  homes.forEach((h, i) => {
    const f = plans[i]
    const fam = { id: i, nama: familyName(), desa: h.desa, rumah: h.id, anggota: [] }
    keluarga.push(fam)
    const ayahU = f.tua ? Math.round(between(58, 78)) : Math.round(between(26, 52))
    const ayah = f.sendiri && !f.ayahDulu ? null : person(fam, f.tua ? 'kakek' : 'ayah', false, ayahU)
    const ibu = f.sendiri && ayah ? null : person(fam, f.tua ? 'nenek' : 'ibu', true, Math.max(22, ayahU + Math.round(between(-6, 3))))
    if (ayah && ibu) {
      ayah.pasangan = ibu.id
      ibu.pasangan = ayah.id
    }
    const ortu = [ayah, ibu].filter(Boolean)
    const muda = Math.min(...ortu.map(o => o.umur))
    for (let k = 0; k < f.anak; k++) {
      const umur = Math.max(1, Math.min(muda - 18, Math.round(between(2, 17))))
      const anak = person(fam, 'anak', rand() < 0.5, umur)
      anak.ortu = ortu.map(o => o.id)
      for (const o of ortu) o.anak.push(anak.id)
    }
    if (f.kakek) {
      const kakekU = Math.round(between(Math.max(...ortu.map(o => o.umur)) + 20, 88))
      const peran = rand() < 0.45 ? 'kakek' : 'nenek'
      const g1 = person(fam, peran, peran === 'nenek', kakekU)
      if (f.kakek === 2) {
        const g2 = person(fam, peran === 'kakek' ? 'nenek' : 'kakek', peran === 'kakek', kakekU + Math.round(between(-5, 3)))
        g1.pasangan = g2.id
        g2.pasangan = g1.id
      }
    }
  })

  // 3) pekerjaan menurut kampung, umur & jenis kelamin
  const dewasa = o => o.umur >= 18 && o.umur < 66
  const byDesa = d => orang.filter(o => o.desa === d)
  const assign = (list, kerja, n) => {
    let left = n
    for (const o of list) {
      if (left <= 0) break
      if (o.kerja) continue
      o.kerja = kerja
      left--
    }
  }
  const shuffle = list => {
    const a = list.slice()
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
  {
    const d = shuffle(byDesa('desa').filter(dewasa))
    // tetua desa yang paling tua menjadi kepala desa
    const tuaDesa = byDesa('desa').filter(o => o.umur >= 55).sort((a, b) => b.umur - a.umur)[0]
    if (tuaDesa) tuaDesa.kerja = 'kepala'
    assign(d, 'pedagang', 5)
    assign(d.filter(o => !o.wanita), 'pandai', 2)
    assign(d, 'masak', 2)
    assign(d, 'kedai', 1)
    assign(d.filter(o => !o.wanita), 'jaga', 2)
    assign(d, 'penebang', 3)
    assign(d, 'pancingEs', 3)
  }
  {
    const d = shuffle(byDesa('nelayan').filter(dewasa))
    assign(d.filter(o => !o.wanita), 'nelayan', 99)
    assign(d, 'pengasap', 5)
    assign(d.filter(o => o.wanita), 'nelayan', 3)
  }
  {
    const d = shuffle(byDesa('pemburu').filter(dewasa))
    assign(d.filter(o => !o.wanita), 'pemburu', 12)
    assign(d.filter(o => o.wanita), 'pemburu', 3)
    assign(d, 'penyamak', 6)
    assign(d.filter(o => !o.wanita), 'penebang', 4)
  }
  for (const o of orang) {
    if (o.kerja) continue
    if (o.umur < 13) o.kerja = 'anak'
    else if (o.umur < 18) o.kerja = 'remaja'
    else if (o.umur >= 66) o.kerja = 'tetua'
    else o.kerja = 'warga'
  }

  // 4) teman: 2–4 orang sebaya di kampung yang sama (bukan keluarga sendiri), saling
  for (const o of orang) {
    const cands = orang.filter(q => q.desa === o.desa && q.keluarga !== o.keluarga && Math.abs(q.umur - o.umur) < (o.umur < 18 ? 4 : 14))
    const want = 2 + Math.floor(rand() * 3)
    for (const q of shuffle(cands)) {
      if (o.teman.length >= want) break
      if (o.teman.includes(q.id) || q.teman.length >= 5) continue
      o.teman.push(q.id)
      q.teman.push(o.id)
    }
  }

  // 5) jam bangun & tidur (jam desimal), rupa
  for (const o of orang) {
    const s = o.sifat
    const anak = o.umur < 13
    o.bangun = anak ? between(6.6, 7.6) : o.umur >= 66 ? between(5.2, 6.2) : 5.6 + 1.2 * s.pemalas - 0.6 * s.rajin + between(-0.2, 0.3)
    o.tidur = anak ? between(19.8, 20.8) : o.umur >= 66 ? between(20.4, 21.4) : 21.2 + 1.0 * s.riang + 0.4 * s.petualang - 0.4 * s.rajin + between(-0.2, 0.3)
    if (o.kerja === 'jaga') {
      // dua penjaga bergantian: satu berjaga siang, satu malam
      o.shift = orang.filter(q => q.kerja === 'jaga').indexOf(o) % 2 ? 'malam' : 'siang'
      if (o.shift === 'malam') {
        o.bangun = 14 + between(0, 0.5)
        o.tidur = 6.5 + between(0, 0.4)
      }
    }
    o.rupa = rupaOf(o, rand)
  }
  return { orang, keluarga }
}

// jenis badan, warna (indeks pasangan palet), dan bagian yang dipakai
function rupaOf(o, rand) {
  const pick = list => list[Math.floor(rand() * list.length)]
  const anak = o.umur < 13
  const tua = o.umur >= 60
  const body = anak ? (o.wanita ? 'anak-b' : 'anak-a') : o.wanita ? pick(['wanita-a', 'wanita-b']) : pick(['pria-a', 'pria-a', 'pria-b'])
  const rambut = tua ? pick([W.putih, W.perak, W.kelabu]) : pick([W.kuning, W.kuning, W.jingga, W.cokelat, W.cokelat, W.hitam])
  const kulit = pick([W.kulitTerang, W.kulitTerang, W.kulitTerang, W.kulitSawo, W.kulitCokelat])
  const jaket = o.kerja === 'pemburu' ? pick([W.cokelat, W.kelabu, W.hijau, W.abuBiru]) : o.kerja === 'nelayan' ? pick([W.biru, W.abuBiru, W.kelabu, W.merah]) : pick([W.merah, W.biru, W.hijau, W.cokelat, W.kelabu, W.abuBiru, W.ungu, W.merah, W.biru])
  const celana = pick([W.cokelat, W.kelabu, W.hitam, W.abuBiru])
  const sepatu = pick([W.cokelat, W.cokelat, W.hitam, W.kelabu])
  let hias = pick([W.merah, W.kuning, W.biru, W.putih, W.hijau, W.jingga])
  if (hias === jaket) hias = jaket === W.kuning ? W.merah : W.kuning
  const topi = pick([W.merah, W.biru, W.hijau, W.kelabu, W.cokelat, W.putih, W.biruMuda])
  const syal = pick([W.merah, W.kuning, W.biru, W.hijau, W.putih, W.ungu, W.jingga])
  let bagian = 0
  const r = rand()
  if (anak) bagian |= r < 0.75 ? BAGIAN.helm : r < 0.9 ? BAGIAN.mahkota : 0
  else bagian |= r < 0.38 ? BAGIAN.helm : r < 0.66 ? BAGIAN.mahkota : 0
  if (rand() < (anak ? 0.55 : 0.42)) bagian |= BAGIAN.zirah
  if (o.wanita && rand() < 0.5) bagian |= BAGIAN.rambutPanjang
  if (tua || o.kerja === 'kepala' || o.kerja === 'tetua') bagian |= rand() < 0.75 || o.kerja === 'kepala' ? BAGIAN.jubah : 0
  if (o.kerja === 'pemburu') bagian |= BAGIAN.tabung | BAGIAN.sarung
  if (o.kerja === 'nelayan' || o.kerja === 'penyamak') bagian |= BAGIAN.sarung
  if (['masak', 'pandai', 'pengasap', 'penyamak', 'kedai'].includes(o.kerja)) bagian |= BAGIAN.celemek
  // remaja: badan dewasa yang lebih kecil; anak: badan anak
  const skala = anak ? 0.62 + (o.umur / 13) * 0.14 : o.umur < 18 ? 0.84 + ((o.umur - 13) / 5) * 0.14 : tua ? 0.96 : 0.98 + rand() * 0.06
  return { body, skala, dye: { kulit, rambut, baju: jaket, celana, sepatu, hias, zirah: topi, panji: syal, bagian } }
}
