// Otak percakapan penduduk Frostfall (v0.22.0) — dipanggil percakapan.js untuk npc.bangsa === 'utara'
// (tanpa Three.js / DOM, bisa diuji dengan Node). Jawabannya dari DIRI & HIDUP orang itu (npc.utara =
// warga.describe: keluarga & apa yang sedang mereka lakukan, pekerjaan, kegiatan sekarang, catatan
// hariannya, acara di kampung hari ini, jam Frostfall, bajunya), SIKAPNYA (sifat, ingatan obrolan
// dengan pemain), dan PENGETAHUANNYA tentang Frostfall & dunia di sekitarnya (KAMUS).
// Kalimat yang maksudnya tidak dikenali tetap dijawab sesuai isinya: menyebut nama tetangga → cerita
// tentang orang itu; pernyataan pemain ("aku lapar / sedih / dari Pulau Tropis …") → ditimpali; minta
// pendapat ("menurutmu …", "kamu suka …?") → pendapatnya; pertanyaan ya/tidak ("apakah kamu …") →
// dijawab dari fakta dirinya; kata kunci yang dikenal → pengetahuannya; selain itu menurut kata
// tanyanya (siapa / apa / kapan / di mana / berapa / kenapa / bagaimana); kata yang benar-benar asing
// ditanyakan balik, lalu penjelasan pemain diingat & dipakai lagi nanti.
// A = alat dari percakapan.js (pilih, normalisasi, tokens, tempatJawab, kenali) — supaya tidak ada
// impor melingkar.

const ANGKA = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh']
const angka = n => ANGKA[n] ?? String(n)
const WARNA = ['krem', 'hijau', 'kuning', 'jingga', 'merah', 'biru', 'biru muda', 'ungu', 'hitam', 'biru kelabu', 'kelabu tua', 'perak', 'putih', 'cokelat muda', 'cokelat', 'sawo matang']
const BAG = { helm: 1, rambutPanjang: 2, tabung: 4, sarung: 8, jubah: 16, zirah: 32, mahkota: 64, celemek: 128 }
const daftar = list => (list.length <= 1 ? list[0] || '' : `${list.slice(0, -1).join(', ')} dan ${list[list.length - 1]}`)
const kapital = s => s.charAt(0).toUpperCase() + s.slice(1)
const bagianHari = j => (j < 4.5 ? 'dini hari' : j < 11 ? 'pagi' : j < 15 ? 'siang' : j < 18.5 ? 'sore' : 'malam')
const SALAM_WAKTU = { 'dini hari': 'Selamat malam', pagi: 'Selamat pagi', siang: 'Selamat siang', sore: 'Selamat sore', malam: 'Selamat malam' }
// angka acak tetap dari teks (jawaban yang sama untuk pertanyaan yang sama pada orang yang sama)
const hash = s => {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return ((h >>> 0) % 10000) / 10000
}
const SIFAT = ['rajin', 'riang', 'ramah', 'rakus', 'pemalas', 'petualang', 'pemberani', 'pemarah']
const utama = d => SIFAT.slice().sort((a, b) => (d.sifat[b] || 0) - (d.sifat[a] || 0))[0]

// topik siap pilih untuk penduduk Frostfall (ui/obrolan.js)
export const TOPIK_UTARA = [
  { id: 'nama', teks: 'Siapa namamu?' },
  { id: 'kabar', teks: 'Apa kabar?' },
  { id: 'kegiatan', teks: 'Sedang apa?' },
  { id: 'keluarga', teks: 'Ceritakan keluargamu' },
  { id: 'acara', teks: 'Ada acara apa hari ini?' },
  { id: 'pekerjaan', teks: 'Apa pekerjaanmu?' },
  { id: 'berburu', teks: 'Bagaimana berburu di sini?' },
  { id: 'baju', teks: 'Bajumu bagus, buatan siapa?' },
  { id: 'waktu', teks: 'Jam berapa sekarang?' },
  { id: 'kerajaan', teks: 'Ceritakan tentang Frostfall' },
  { id: 'cerita', teks: 'Ceritakan sesuatu' },
  { id: 'nasihat', teks: 'Ada saran untukku?' },
]

// ------------------------------------------------------------------ pengetahuan Frostfall (KAMUS)
// [kata kunci…], pengetahuan (H → teks), pendapat: 1 suka, 0 biasa, −1 tidak suka
const KAMUS = [
  [['api unggun', 'api'], H => `Api unggun itu jantung kampung. ${H.d.desa === 'desa' ? 'Yang di alun-alun Emberwick tidak pernah padam' : 'Di lapangan kampung kami ada satu'} — orang berkumpul, menghangatkan tangan, dan bercerita di sekelilingnya.`, 1],
  [['kedai panjang', 'kedai'], () => 'Kedai panjang di utara alun-alun Emberwick: perapian besar, dua meja panjang, sup ikan asap yang mengepul. Siapa pun boleh masuk menghangatkan badan.', 1],
  [['sumur'], () => 'Air sumur di sini dingin menggigit, tapi bersih. Tiap pagi ada saja yang menimba sambil bergosip.', 0],
  [['menara jaga', 'menara'], () => 'Menara jaga di sudut timur laut Emberwick. Penjaganya bergantian siang dan malam, mengawasi jalan ke kastel.', 0],
  [['pasar', 'kios'], () => 'Pasar Emberwick ada di alun-alun: kios roti, ikan asap, bulu, kayu bakar, dan besi. Pedagangnya cuma melayani warga desa — belum biasa berdagang dengan orang asing.', 0],
  [['sungai beku', 'sungai'], () => 'Sungai Beku membeku sepanjang tahun. Esnya cukup tebal untuk dilubangi — di situ kami memancing.', 1],
  [['air terjun beku', 'air terjun'], () => 'Air Terjun Beku di timur, membeku menjadi tirai es raksasa di tebing Lembah Atas. Indah sekali kalau kena cahaya pagi.', 1],
  [['gunung', 'puncak', 'taring'], () => 'Puncak Taring Es yang paling tinggi, di timur. Tidak ada yang pernah sampai ke puncaknya — anginnya bisa menerbangkan orang.', 0],
  [['hutan pinus', 'hutan', 'pinus', 'pohon'], () => 'Hutan Pinus Salju di selatan, tempat kawanan rusa kutub merumput di padang-padang kecil. Penebang kami mengambil kayu di tepinya saja.', 1],
  [['dermaga', 'pelabuhan'], () => 'Dermaga Frostfall di pantai barat, berhadapan dengan Pulau Tropis. Nelayan Teluk Salju juga punya dermaga kecil sendiri.', 0],
  [['sampan', 'perahu', 'kapal'], () => 'Nelayan Teluk Salju punya sampan kayu. Di musim dingin sampan dibalik di pantai supaya tidak penuh salju.', 0],
  [['kereta luncur', 'luncur'], () => 'Kereta luncur dipakai mengangkut kayu dan hasil buruan di atas salju. Anak-anak juga suka meluncur dengannya.', 1],
  [['serigala'], () => 'Serigala? Konon ada di pegunungan utara, tapi sudah lama tidak ada yang melihatnya. Yang ada di hutan cuma rusa kutub.', -1],
  [['beruang'], () => 'Beruang tidur sepanjang musim dingin, kata kakekku. Aku sendiri belum pernah melihatnya — syukurlah.', -1],
  [['bulan', 'bintang'], H => (H.d.malam > 0.5 ? 'Lihat ke atas — awan malam di Frostfall tebal, tapi kadang bintang mengintip.' : 'Malam di Frostfall panjang dan biru. Kalau awan tersibak, bintangnya terang sekali.'), 1],
  [['matahari', 'siang'], () => 'Matahari di Frostfall pucat dan rendah. Hangatnya tidak seberapa, tapi cukup untuk menjemur ikan.', 0],
  [['lagu', 'nyanyi', 'bernyanyi', 'menyanyi'], () => 'Lagu kesukaan kami "Nyanyian Api Unggun": tentang pemburu yang pulang membawa rusa putih. Biasanya dinyanyikan waktu pesta.', 1],
  [['sup', 'sup ikan'], () => 'Sup ikan asap dengan kentang dan daun bawang — paling enak dimakan panas-panas di kedai panjang.', 1],
  [['roti'], () => 'Roti gandum hitam, padat dan mengenyangkan. Kios roti di pasar Emberwick membakarnya tiap pagi.', 1],
  [['teh', 'teh pinus'], () => 'Teh daun pinus! Rasanya segar, sedikit pahit, menghangatkan perut.', 1],
  [['madu', 'kue madu', 'kue'], () => 'Kue madu cuma dibuat waktu syukuran dan ulang tahun. Anak-anak selalu berebut potongan terbesar.', 1],
  [['daging rusa', 'daging'], () => 'Daging rusa diasap di pondok pengasapan Rusa Putih. Kalau perburuan berhasil, malamnya ada jamuan.', 1],
  [['ikan asap'], () => 'Ikan diasap berhari-hari di pondok pengasapan Teluk Salju, lalu disimpan untuk musim yang lebih dingin.', 1],
  [['emas', 'koin', 'uang', 'harta'], () => 'Kami jarang memegang koin — kebanyakan saling tukar barang. Tapi konon gua-gua di Frostfall menyimpan peti harta yang ditinggalkan orang dulu.', 0],
  [['pedang'], () => 'Pedang jarang dipakai di sini. Kami lebih butuh kapak, tombak, dan busur untuk hidup sehari-hari.', 0],
  [['tombak', 'busur', 'panah'], () => 'Busur kami dari kayu cemara, talinya dari urat rusa. Pemburu Rusa Putih bisa memanah rusa dari jarak dua puluh langkah.', 1],
  [['kapak'], () => 'Kapak adalah sahabat penebang. Tanpa kayu bakar, tidak ada yang bertahan di musim dingin Frostfall.', 1],
  [['sekolah', 'belajar', 'buku', 'membaca', 'menulis'], H => (H.anak ? 'Tetua mengajari kami membaca huruf di kedai panjang kalau hari terlalu dingin untuk bermain.' : 'Anak-anak belajar dari tetua: membaca jejak, mengasap ikan, dan dongeng-dongeng lama.'), 0],
  [['doa', 'dewa', 'agama', 'tuhan'], () => 'Kami bersyukur tiap musim — untuk ikan, rusa, dan kayu yang cukup. Syukuran keluarga selalu dimulai dengan doa bersama.', 1],
  [['hantu', 'arwah'], () => 'Hiii… katanya di Kastel Frostfall yang kosong kadang terdengar suara langkah. Aku tidak mau ke sana malam-malam!', -1],
  [['naga'], () => 'Naga? Itu cuma ada di dongeng tetua. …Iya, kan?', 0],
  [['penyihir', 'sihir', 'peri'], () => 'Tidak ada penyihir di Frostfall. Yang ada cuma kristal es di gua yang berpendar sendiri — itu pun sudah cukup ajaib.', 0],
  [['elf', 'aeloria'], () => 'Elf tinggal di Aeloria, jauh di barat laut. Kata pedagang yang pernah ke sana, telinga mereka runcing dan mereka tidak pernah kedinginan.', 0],
  [['kencana', 'manusia kencana'], () => 'Kerajaan Kencana di barat jauh — negeri panas yang penuh prajurit. Orang sana tidak tahu rasanya salju!', 0],
  [['pulau tropis', 'tropis', 'kelapa', 'pantai pasir'], () => 'Pulau Tropis di seberang selat, di barat. Katanya di sana pohonnya berbuah kelapa dan orang berjalan tanpa jaket. Aneh sekali!', 0],
  [['orc'], () => 'Orc tidak tahan dingin, jadi mereka tidak pernah ke Frostfall. Salju adalah tembok terbaik kami.', -1],
  [['panas', 'gerah'], () => 'Panas? Di Frostfall? Hahaha! Paling-paling di depan perapian kedai panjang.', 0],
  [['mainan', 'bola', 'boneka', 'main'], H => (H.anak ? 'Mainan kesukaanku bola salju! Kalau sore ada perang bola salju di lapangan.' : 'Anak-anak di sini bermain kejar-kejaran dan perang bola salju. Mainan mereka kebanyakan ukiran kayu.'), 1],
  [['sakit', 'obat', 'tabib', 'demam', 'flu'], () => 'Kalau sakit, kami minum teh pinus panas dan tidur di dekat perapian. Tetua tahu ramuan dari akar-akaran.', -1],
  [['bayi', 'lahir'], () => 'Bayi yang lahir di musim dingin dianggap kuat. Sekampung datang membawa kain bulu sebagai hadiah.', 1],
  [['ponsel', 'hp', 'telepon', 'internet', 'komputer', 'mobil', 'motor', 'pesawat', 'listrik', 'televisi', 'tv', 'game'], H => H.A.pilih(H.mem, 'modern', ['Aku tidak mengerti benda yang kau sebut itu. Apa itu semacam kereta luncur dari negeri jauh?', 'Hah? Kata-katamu aneh sekali, pengembara. Di Frostfall kami cuma punya kayu, salju, dan api.']), 0],
  [['es'], () => 'Es di sini tebal sekali — sungai, danau, bahkan air terjun membeku. Hati-hati, licin!', 0],
  [['tebing', 'salju tebal'], () => 'Jangan berjalan terlalu dekat ke tepi tebing bersalju — saljunya bisa runtuh.', 0],
  [['jamur'], () => 'Di musim dingin tidak ada jamur. Kami makan ikan, daging, dan roti saja.', 0],
  [['bir', 'arak', 'minuman', 'anggur'], () => 'Minuman paling enak di sini teh pinus panas. Orang dewasa kadang minum sari madu hangat waktu pesta.', 1],
]

// ------------------------------------------------------------------ pembantu
const pelaku = H => (H.mem.namaPemain ? H.mem.namaPemain : H.anak ? 'Kak' : H.mem.suka >= 3 ? 'kawan' : 'pengembara')
const pasangan = d => d.anggota.find(m => m.hubungan === 'istriku' || m.hubungan === 'suamiku')
const anakAnak = d => d.anggota.filter(m => m.hubungan === 'putraku' || m.hubungan === 'putriku')
const kegiatanKu = d => d.kegiatan
const pakai = (d, bit) => ((d.rupa?.dye?.bagian || 0) & bit) !== 0
const warnaOf = i => WARNA[i] ?? 'cokelat'
const pelakuOf = d => (d.umur > 70 ? 'nak' : 'anak muda')
const DESA_PENDEK = { desa: 'Emberwick', nelayan: 'Teluk Salju', pemburu: 'Rusa Putih' }

// ------------------------------------------------------------------ jawaban per maksud
function salam(H) {
  const { d, mem, A } = H
  const bh = bagianHari(d.jam)
  const s = SALAM_WAKTU[bh]
  // pemain salah menyebut waktu ("selamat pagi" padahal malam)
  const salamSungguh = H.norm.startsWith(' selamat ') || H.norm.trim().split(' ').length <= 2
  for (const w of ['pagi', 'siang', 'sore', 'malam']) if (salamSungguh && H.norm.includes(` ${w} `) && w !== bh && !(w === 'malam' && bh === 'dini hari')) return { teks: `${kapital(w)}? Sekarang sudah ${bh}, ${pelaku(H)} — jam ${d.waktu}. ${s}!`, gerak: 'cheer' }
  if (mem.kali > 1) return { teks: A.pilih(mem, 'salamLagi', [`${s} lagi, ${pelaku(H)}! Sudah ketemu ${angka(mem.kali)} kali hari ini, hehe.`, `Wah, kau lagi! ${s}.`, `${s}, ${pelaku(H)}. Masih betah di Frostfall?`]), gerak: 'wave' }
  if (H.anak) return { teks: A.pilih(mem, 'salamAnak', [`${s}, Kak! Kakak dari mana? Jaketmu tipis sekali!`, 'Halo, Kak! Mau main bola salju?']), gerak: 'wave' }
  const u = utama(d)
  const sapa = {
    pemarah: `Hmm. ${s}. Ada perlu apa?`,
    riang: `${s}! Selamat datang di ${d.namaDesa}! Dingin, ya? Hahaha!`,
    ramah: `${s}, ${pelaku(H)}! Jarang ada tamu di ${d.namaDesa}. Mampirlah ke api unggun, hangatkan badan.`,
    pemalas: `Hoahm… ${s.toLowerCase()}. Maaf, aku belum benar-benar bangun.`,
    petualang: `${s}! Kau dari seberang selat, ya? Aku selalu ingin mendengar cerita dari luar Frostfall.`,
  }
  return { teks: sapa[u] || `${s}. Aku ${d.nama}. Ada yang bisa kubantu?`, gerak: 'wave' }
}

function perkenalan(H) {
  const { d, mem } = H
  mem.kenalNama = true
  const tanya = mem.namaPemain ? '' : H.anak ? ' Nama Kakak siapa?' : ' Kau sendiri siapa?'
  if (H.anak) return { teks: `Namaku ${d.nama} ${d.keluarga}! Umurku ${d.umur} tahun. Rumahku di ${d.namaDesa}.${tanya}`, gerak: 'wave' }
  return { teks: `Namaku ${d.namaLengkap}, ${d.pekerjaan} dari ${d.namaDesa}.${tanya}`, gerak: 'bow' }
}

function kabar(H) {
  const { d, mem, A } = H
  const n = d.kebutuhan
  const akhir = d.catatan[d.catatan.length - 1]
  if (n.dingin > 0.65) return { teks: 'Brrr… dingin sekali! Jariku sampai kaku. Habis ini aku mau ke api unggun.', gerak: 'shake' }
  if (n.lapar > 0.7) return { teks: 'Lapar, sebenarnya. Perutku sudah berbunyi dari tadi.', gerak: 'talk', tawar: 'beri' }
  if (n.lelah > 0.7) return { teks: 'Capek sekali hari ini. Rasanya ingin cepat pulang dan tidur di dekat perapian.', gerak: 'talk' }
  if (n.sepi > 0.7) return { teks: 'Agak kesepian. Untung kau mengajakku bicara.', gerak: 'nod' }
  if (akhir && akhir.hari === d.hari) return { teks: `Baik! Tadi aku ${akhir.teks}. ${A.pilih(mem, 'kabarTambah', ['Hari yang lumayan.', 'Begitulah hidup di Frostfall.', 'Kau sendiri bagaimana?'])}`, gerak: 'nod' }
  return { teks: A.pilih(mem, 'kabar', ['Baik, terima kasih! Salju hari ini lembut.', 'Sehat! Selama ada kayu bakar dan sup panas, semua baik.', 'Baik-baik saja. Kau sendiri, tidak kedinginan?']), gerak: 'nod' }
}

const KOMENTAR = {
  mancing: d => (d.tangkapan ? `Sudah dapat ${angka(d.tangkapan)} ekor sejak tadi.` : 'Belum dapat apa-apa… sabar, sabar.'),
  mancingEs: d => (d.tangkapan ? `Lumayan, ${angka(d.tangkapan)} ekor dari lubang es ini.` : 'Ikannya malas hari ini.'),
  buru: () => 'Ssst! Jangan keras-keras, rusanya bisa kabur.',
  kios: () => 'Pembeli pagi ini ramai.',
  tempa: () => 'Mata kapak ini harus jadi sebelum sore.',
  masak: () => 'Supnya hampir matang — baunya enak, kan?',
  hangat: () => 'Api ini menyelamatkan jari-jariku.',
  menari: () => 'Ayo ikut menari! Tidak perlu pandai.',
  musik: () => 'Lagu berikutnya untukmu!',
  bolaSalju: () => 'Awas, bola salju!',
  main: () => 'Kakak mau ikut main?',
  jaga: () => 'Dari atas sini aku bisa melihat sampai ke hutan.',
  dongeng: () => 'Ceritanya seru, jangan diganggu dulu!',
  mendongeng: () => 'Anak-anak ini selalu minta cerita yang sama.',
  sapu: () => 'Kalau tidak disekop, pintu rumah bisa tertutup salju!',
  tebang: () => 'Kayu pinus ini bagus untuk perapian.',
}
function kegiatan(H) {
  const { d } = H
  const kom = KOMENTAR[d.act]
  if (d.acara) return { teks: `Aku sedang ${d.kegiatan} — ini ${d.acara}! ${kom ? kom(d) : 'Meriah, kan?'}`, gerak: 'cheer' }
  const rencana = d.jam < 11.8 ? 'Nanti siang aku pulang makan.' : d.jam < 17.8 ? 'Sore nanti aku pulang makan malam bersama keluarga.' : d.jam < 21 ? 'Sebentar lagi aku pulang tidur.' : ''
  return { teks: `Aku sedang ${kegiatanKu(d)}. ${kom ? kom(d) : ''} ${rencana}`.replace(/\s+/g, ' ').trim(), gerak: 'talk' }
}

const PEKERJAAN = {
  nelayan: d => `Aku nelayan Teluk Salju. Pagi-pagi aku memancing dari dermaga kecil atau tepi pantai, lalu ikannya dijemur di rak atau diasap.${d.tangkapan ? ` Hari ini sudah dapat ${angka(d.tangkapan)} ekor.` : ''}`,
  pengasap: () => 'Aku mengurus pondok pengasapan dan rak jemur ikan di Teluk Salju. Ikan asap kami tahan berbulan-bulan.',
  pemburu: d => `Aku pemburu dari Rusa Putih. Pagi-pagi kami berangkat berkelompok ke Hutan Pinus Salju, mengintai kawanan rusa kutub, lalu memanah satu — tidak pernah lebih.${d.perburuan.berhasil ? ' Hari ini perburuan kami berhasil!' : ''}`,
  penyamak: () => 'Aku menyamak kulit rusa di rangka penjemur. Kulit inilah yang jadi jaket, sepatu, dan sarung tangan seluruh kampung.',
  penebang: () => 'Aku penebang kayu. Pohon di tepi hutan kutebang, kayunya kubelah untuk perapian rumah-rumah.',
  pedagang: () => 'Aku berjualan di pasar Emberwick. Pembeliku tetangga sendiri — ada yang bayar koin, ada yang tukar ikan.',
  pandai: () => 'Aku pandai besi Emberwick. Mata kapak, mata tombak, paku, engsel pintu — semua dari landasanku.',
  masak: () => 'Aku juru masak kedai panjang Emberwick. Sup ikan asap dan roti gandum hitamku terkenal sampai ke Rusa Putih!',
  kedai: () => 'Aku pemilik kedai panjang Emberwick. Pintunya selalu terbuka bagi yang kedinginan.',
  jaga: d => `Aku penjaga menara jaga Emberwick, giliran ${d.shift === 'malam' ? 'malam — siang hari aku tidur' : 'siang'}. Dari atas menara aku mengawasi jalan ke kastel dan tepi hutan.`,
  pancingEs: () => 'Aku memancing di lubang es Sungai Beku, di selatan Emberwick. Duduk diam berjam-jam, tapi hasilnya lumayan.',
  tetua: d => `Aku sudah tua, ${pelakuOf(d)}. Kerjaku sekarang mendongeng untuk cucu-cucu dan memberi nasihat bagi yang mau mendengar.`,
  kepala: () => 'Aku kepala desa Emberwick. Kalau ada perselisihan, akulah yang menengahi. Tiap hari aku berkeliling melihat warga.',
  warga: () => 'Aku mengurus rumah: menimba air, menyekop salju, memasak untuk keluarga. Pekerjaan yang tidak pernah selesai!',
  remaja: () => 'Aku membantu orang tuaku. Kata ayah, tahun depan aku boleh ikut kerja sungguhan.',
  anak: () => 'Aku belum kerja, aku masih kecil! Kerjaku main dan… membantu ibu kalau disuruh.',
}
function pekerjaan(H) {
  const f = PEKERJAAN[H.d.kerja] || PEKERJAAN.warga
  return { teks: f(H.d), gerak: 'talk' }
}

function keluarga(H) {
  const { d } = H
  const m = d.anggota
  if (!m.length) return { teks: `Aku tinggal sendiri di rumahku di ${d.namaDesa}. Tetangga-tetanggaku sudah seperti keluarga.`, gerak: 'talk' }
  const pas = pasangan(d)
  const anak = anakAnak(d)
  const lain = m.filter(x => x !== pas && !anak.includes(x))
  const bagian = []
  if (pas) bagian.push(`${pas.hubungan} ${pas.nama}`)
  if (anak.length) bagian.push(`${anak.length === 1 ? `${anak[0].hubungan}` : `${angka(anak.length)} anak kami`} ${daftar(anak.map(a => `${a.nama} (${a.umur})`))}`)
  for (const x of lain) bagian.push(`${x.hubungan} ${x.nama}`)
  const sorot = m.filter(x => !['tidur di rumah', 'di rumah'].includes(x.kegiatan))[0]
  const kini = sorot ? ` ${sorot.nama} sekarang sedang ${sorot.kegiatan}.` : ''
  return { teks: `Keluarga ${d.keluarga} — aku tinggal bersama ${daftar(bagian)} di ${d.namaDesa}.${kini}`, gerak: 'talk' }
}

function rumah(H) {
  const { d } = H
  const dsk = {
    desa: 'di Desa Emberwick, dekat alun-alun. Rumah kayu gelondong dengan perapian batu — hangat sekali di malam hari',
    nelayan: 'di Kampung Teluk Salju, kampung nelayan di pantai barat. Dari jendela aku bisa mencium laut dan asap ikan',
    pemburu: 'di Kampung Rusa Putih, di tepi Hutan Pinus Salju. Di belakang rumah ada tumpukan kayu dan rangka kulit rusa',
  }[d.desa]
  return { teks: `Rumahku ${dsk}. ${d.anggota.length ? `Kami ${angka(d.anggota.length + 1)} orang di dalamnya.` : 'Aku tinggal sendiri.'}`, gerak: 'talk' }
}

function teman(H) {
  const { d } = H
  if (!d.teman.length) return { teks: 'Temanku? Semua orang di kampung ini temanku, hehe.', gerak: 'nod' }
  return { teks: `Teman-temanku ${daftar(d.teman.slice(0, 4))}. ${H.anak ? 'Kami sering main bola salju bersama!' : 'Kami sering mengobrol di dekat api unggun sore-sore.'}`, gerak: 'talk' }
}

function umur(H) {
  const { d } = H
  if (H.anak) return { teks: `Umurku ${d.umur} tahun! ${d.umur < 8 ? 'Kata ibu aku masih kecil, tapi aku sudah bisa membuat manusia salju sendiri.' : 'Sebentar lagi aku boleh ikut kerja.'}`, gerak: 'talk' }
  if (d.umur >= 62) return { teks: `Umurku ${d.umur} tahun. Sudah ${angka(Math.floor(d.umur / 10))} puluhan musim dingin kulewati di Frostfall.`, gerak: 'talk' }
  return { teks: `Umurku ${d.umur} tahun. ${d.umur < 30 ? 'Masih muda dan kuat!' : 'Masih kuat bekerja seharian di udara dingin.'}`, gerak: 'talk' }
}

function perasaan(H) {
  const { d } = H
  const n = d.kebutuhan
  const top = Object.entries(n).sort((a, b) => b[1] - a[1])[0]
  const kata = { lapar: 'lapar', lelah: 'lelah', bosan: 'bosan', sepi: 'kesepian', dingin: 'kedinginan' }
  if (top && top[1] > 0.55) return { teks: `Jujur saja, aku sedang ${kata[top[0]]}. ${top[0] === 'dingin' ? 'Jaket setebal ini pun masih tembus angin!' : top[0] === 'lapar' ? 'Semoga makan malam nanti ada sup.' : 'Semoga cepat berlalu.'}`, gerak: 'talk', tawar: top[0] === 'lapar' ? 'beri' : null }
  if (d.acara) return { teks: `Senang sekali! ${d.acara} selalu membuat hatiku hangat.`, gerak: 'cheer' }
  return { teks: 'Hatiku tenang. Hidup di Frostfall memang dingin, tapi orang-orangnya hangat.', gerak: 'nod' }
}

function tidur(H) {
  const { d } = H
  if (d.kerja === 'jaga' && d.shift === 'malam') return { teks: `Aku penjaga malam, jadi aku tidur siang — bangun jam ${d.bangun}, berjaga sampai pagi.`, gerak: 'talk' }
  return { teks: `Biasanya aku bangun jam ${d.bangun}, sarapan bersama keluarga, dan tidur jam ${d.tidur}. ${H.anak ? 'Ibu selalu menyuruhku tidur lebih cepat!' : 'Malam di sini panjang, jadi tidur nyenyak di dekat perapian.'}`, gerak: 'talk' }
}

function waktu(H) {
  const { d } = H
  const bh = bagianHari(d.jam)
  return { teks: `Sekarang jam ${d.waktu}, ${bh} hari ke-${d.hari} sejak kau datang. ${bh === 'malam' || bh === 'dini hari' ? 'Sebagian besar orang sudah tidur di rumahnya.' : bh === 'sore' ? 'Sebentar lagi gelap — malam di Frostfall datang cepat.' : 'Masih banyak waktu untuk bekerja.'}`, gerak: 'talk' }
}

function acara(H) {
  const { d } = H
  const hari = d.acaraHariIni
  if (!hari.length) return { teks: 'Hari ini tidak ada acara apa-apa. Paling-paling orang berkumpul di api unggun sore nanti.', gerak: 'talk' }
  const sedang = hari.filter(e => e.sedang)
  const nanti = hari.filter(e => !e.sedang && !e.lewat)
  const kampung = DESA_PENDEK[d.desa]
  // acara di kampungnya dulu; perang bola salju belakangan bagi orang dewasa
  const nilai = e => (e.desa === kampung ? 0 : 2) + (e.jenis === 'bolaSalju' && !H.anak ? 3 : 0) + (e.jenis === 'dongeng' && !H.anak ? 1 : 0)
  const pilih = list => list.slice().sort((a, b) => nilai(a) - nilai(b))
  const host = e => (e.host === d.nama ? 'aku sendiri yang mengadakannya!' : e.host ? `diadakan ${e.host}.` : 'untuk anak-anak.')
  if (sedang.length) {
    const e = pilih(sedang)[0]
    return { teks: `Sekarang sedang ada ${e.nama} di ${e.desa} (sampai jam ${e.selesai}) — ${host(e)}${nanti.length ? ` Nanti ada juga ${pilih(nanti)[0].nama} jam ${pilih(nanti)[0].mulai}.` : ''} Ayo ke sana!`, gerak: 'cheer', tawar: 'ajak' }
  }
  if (nanti.length) {
    const list = pilih(nanti).slice(0, 2).map(e => `${e.nama} di ${e.desa} jam ${e.mulai} (${host(e)})`)
    return { teks: `Hari ini ada ${daftar(list)}. Datang, ya!`, gerak: 'cheer', tawar: 'ajak' }
  }
  return { teks: `Acara hari ini sudah lewat semua — tadi ada ${daftar(hari.slice(0, 2).map(e => e.nama))}. Besok pasti ada lagi.`, gerak: 'talk' }
}

function berburu(H) {
  const { d } = H
  if (/ (ajari|ajarkan|cara|bagaimana|gimana) /.test(H.norm) && / (memanah|panah|busur) /.test(H.norm)) return { teks: 'Memanah itu begini: berdiri menyamping, tarik tali sampai ke pipi, tahan napas, lalu lepaskan pelan. Kalau sasarannya rusa, bidik bahunya — dan jangan sampai ia melihatmu dulu!', gerak: 'talk' }
  const p = d.perburuan
  const hasil = p.berhasil ? ' Hari ini para pemburu berhasil membawa pulang seekor rusa — malamnya ada jamuan!' : ''
  if (d.kerja === 'pemburu') return { teks: `Kami berangkat pagi atau lewat tengah hari, tiga-empat orang. Kawanan rusa kutub merumput di padang-padang kecil di Hutan Pinus Salju. Dekati pelan-pelan dari arah angin, berhenti dua puluh langkah, lalu panah. Satu rusa cukup — sisanya biar beranak-pinak.${hasil}`, gerak: 'talk' }
  return { teks: `Pemburu Kampung Rusa Putih yang berburu rusa kutub di Hutan Pinus Salju. Kalau kau mendekati rusa sambil berlari, mereka kabur!${hasil}`, gerak: 'talk' }
}

function ikan(H, ctx) {
  const { d } = H
  if (/ (harga|beli|jual|membeli) /.test(H.norm)) return belanja(H)
  if (/ (minta|boleh|bagi) /.test(H.norm)) return { teks: d.kerja === 'nelayan' ? 'Ikan hari ini untuk diasap dan dibagi ke tetangga, maaf. Tapi kalau kau memancing sendiri di dermaga kecil, ikannya banyak!' : 'Aku tidak punya ikan. Tanyakan pada nelayan Teluk Salju — atau memancinglah sendiri.', gerak: 'shake' }
  const pancing = ctx.punyaPancing ? '' : ' Pancing bisa kau buat dari tiga kayu lewat Tas.'
  if (d.kerja === 'nelayan' || d.kerja === 'pancingEs' || d.act === 'mancing' || d.act === 'mancingEs') return { teks: `Paling enak dari dermaga kecil Teluk Salju, atau dari lubang es di muara Sungai Beku. ${d.ikan ? `Hari ini para pemancing sudah menangkap ${d.ikan} ekor.` : 'Pagi-pagi biasanya paling banyak ikannya.'}${pancing}`, gerak: 'talk' }
  return { teks: `Tanya nelayan Teluk Salju di pantai barat — mereka memancing dari dermaga kecil dan lubang es di sungai.${pancing}`, gerak: 'talk' }
}

function baju(H) {
  const { d } = H
  const dy = d.rupa?.dye || {}
  const bagian = []
  if (pakai(d, BAG.helm)) bagian.push(`topi bulu ${warnaOf(dy.zirah)}`)
  if (pakai(d, BAG.mahkota)) bagian.push(`tudung ${warnaOf(dy.zirah)} berbulu`)
  if (pakai(d, BAG.zirah)) bagian.push(`syal ${warnaOf(dy.panji)}`)
  if (pakai(d, BAG.jubah)) bagian.push('jubah bulu')
  const pembuat = d.anggota.find(m => m.hubungan === 'ibuku' || m.hubungan === 'istriku' || m.hubungan === 'nenekku')
  return {
    teks: `Ini jaket bulu khas Frostfall — warna ${warnaOf(dy.baju)}, berlapis bulu di dalam, kerah & ujungnya bulu putih supaya angin tidak masuk. Sulaman ${warnaOf(dy.hias)} di dada itu untuk keberuntungan.${bagian.length ? ` Aku juga memakai ${daftar(bagian)}.` : ''} ${pembuat ? `${kapital(pembuat.hubungan)} ${pembuat.nama} yang menjahitnya.` : 'Kujahit sendiri dari kulit rusa.'}`,
    gerak: 'talk',
  }
}

function hewan() {
  return { teks: 'Di Hutan Pinus Salju ada kawanan rusa kutub — bulunya cokelat, tanduknya bercabang. Mereka merumput di padang-padang kecil dan kabur kalau didekati. Selain itu paling-paling burung gagak dan kelinci salju.', gerak: 'talk' }
}

function gua(H) {
  const { mem, A } = H
  return {
    teks: A.pilih(mem, 'gua', [
      'Frostfall punya enam gua besar: Gua Es Kristal di Lembah Atas, Tambang Tua di utara Emberwick, Gua Gletser di pantai utara, Katedral Taring, Gua Laut Beku, dan Gua Seribu Tiang. Konon tiap gua menyimpan peti harta.',
      'Tambang Tua di utara desa dulu tambang kristal kakek-kakek kami. Sekarang kosong — tapi lenteranya masih menyala, aneh, kan?',
      'Di Gua Gletser Utara ada air terjun yang tidak membeku, jatuh ke kolam biru kehijauan. Indah sekali, kata yang pernah ke sana.',
    ]),
    gerak: 'talk',
  }
}

function kerajaan(H) {
  const { mem, A } = H
  return {
    teks: A.pilih(mem, 'kerajaanUtara', [
      `Frostfall dulu kerajaan, dengan raja di Kastel Frostfall di bahu gunung. Raja terakhir pergi entah ke mana, kastelnya kini kosong. Sekarang kami hidup sendiri-sendiri di tiga kampung — sekitar ${H.d.penduduk} orang.`,
      'Kata tetua, di ruang singgasana kastel ada lempeng lantai yang bisa digeser — lorong rahasia ke gua di bawah gunung. Aku sendiri tidak berani ke sana.',
      'Kami orang Utara tidak punya raja lagi. Kepala desa Emberwick yang menengahi kalau ada perselisihan, dan semua keputusan dibicarakan di api unggun.',
    ]),
    gerak: 'talk',
  }
}

function makanan(H, ctx) {
  const { d } = H
  const lapar = d.kebutuhan.lapar > 0.6
  const t = 'Makanan kami: sup ikan asap, roti gandum hitam, daging rusa panggang, dan teh daun pinus. Kedai panjang Emberwick memasaknya setiap hari.'
  return { teks: lapar ? `${t} Ngomong-ngomong… aku lapar sekali.` : t, gerak: 'talk', tawar: lapar && ctx.makanan.length ? 'beri' : null }
}

function belanja() {
  return { teks: 'Pasar Emberwick di alun-alun: kios roti, ikan asap, bulu, kayu bakar, dan besi. Tapi pedagangnya hanya melayani warga desa — mereka belum biasa berdagang dengan orang asing.', gerak: 'talk' }
}

const CERITA = [
  'Dahulu kala Raja Frostfall menyembunyikan hartanya di Gua Es Kristal, di balik lorong rahasia dari ruang singgasananya. Banyak yang mencari, sedikit yang menemukan.',
  'Konon rusa kutub putih muncul sekali dalam seratus musim dingin. Siapa yang melihatnya akan selamat dari badai — karena itulah kampung pemburu kami bernama Rusa Putih.',
  'Kakek buyut kami datang ke Frostfall dengan sampan dari selatan, mengejar ikan perak. Mereka tinggal karena jatuh cinta pada api unggun dan malam yang panjang.',
  'Dulu Tambang Tua menghasilkan kristal ungu yang berpendar. Suatu hari para penambang mendengar suara dari dalam gunung, lalu tambang itu ditinggalkan selamanya.',
  'Air Terjun Beku dulu air terjun biasa. Kata tetua, ia membeku dalam satu malam ketika raja terakhir meninggalkan kastel.',
]
function cerita(H) {
  return { teks: H.A.pilih(H.mem, 'ceritaUtara', CERITA), gerak: 'talk', tawar: 'cerita' }
}

const LELUCON = [
  'Kenapa manusia salju tidak pernah marah? Karena dia selalu… dingin kepala! Hahaha!',
  'Apa bedanya rusa kutub dan penebang malas? Rusa kutub punya tanduk bercabang, penebang malas punya alasan bercabang!',
  'Nelayan Teluk Salju bertanya ke ikan: "Kenapa tidak mau makan umpanku?" Ikannya menjawab: "Terlalu dingin, kawan — aku diet!"',
  'Kenapa orang Frostfall tidak pernah berbohong? Karena kalau bicara, napasnya kelihatan! Hihihi.',
]
function lelucon(H) {
  if (utama(H.d) === 'pemarah') return { teks: `Aku tidak pandai melucu. …Baiklah. ${H.A.pilih(H.mem, 'lucuUtara', LELUCON)}`, gerak: 'talk' }
  return { teks: H.A.pilih(H.mem, 'lucuUtara', LELUCON), gerak: 'cheer' }
}

function nasihat(H, ctx) {
  const tips = [
    'Kalau kedinginan, berdirilah di dekat api unggun. Ada satu di alun-alun Emberwick dan satu di tiap kampung.',
    'Jangan dekati kawanan rusa sambil berlari — mereka kabur. Pemburu kami mengintai pelan-pelan.',
    'Gua-gua di Frostfall gelap tapi menyimpan peti harta. Mulailah dari Tambang Tua di utara Emberwick.',
    'Malam di Frostfall gelap dan panjang. Ikuti cahaya jendela rumah kalau tersesat.',
    'Datanglah ke pesta api unggun di alun-alun Emberwick malam hari — semua orang menari di sana.',
  ]
  if (ctx.hp < 50) tips.unshift('Kau terluka. Makan sesuatu atau minum ramuan dari Tasmu dulu.')
  if (!ctx.punyaPerahu) tips.push('Kalau ingin pulang ke Pulau Tropis tanpa berenang di air dingin, buatlah perahu dari sepuluh kayu.')
  return { teks: H.A.pilih(H.mem, 'saranUtara', tips), gerak: 'talk' }
}

function tentangPemain(H) {
  const { mem } = H
  if (mem.suka >= 3) return { teks: `Kau ${mem.namaPemain || 'kawanku'} dari selatan — orang asing yang sudah seperti tetangga sendiri.`, gerak: 'nod' }
  return { teks: 'Kau pengembara dari selatan, kan? Jaketmu tipis, pedangmu panjang, dan kau tidak terlihat kedinginan. Orang Frostfall penasaran sekali denganmu.', gerak: 'talk' }
}

function cuaca(H) {
  const { d } = H
  if (H.norm.includes(' kenapa ') || H.norm.includes(' mengapa ')) return { teks: 'Kata tetua, salju itu air yang membeku di awan lalu turun pelan-pelan seperti bulu. Di Frostfall awannya selalu dingin — jadi saljunya tidak pernah berhenti!', gerak: 'talk' }
  if (d.malam > 0.5) return { teks: 'Malam di Frostfall dingin menusuk tulang. Salju turun pelan — besok pagi pintu rumah harus disekop lagi.', gerak: 'talk' }
  return { teks: H.A.pilih(H.mem, 'cuacaUtara', ['Salju turun hampir setiap hari di sini. Kami sudah biasa — jaket bulu dan api unggun adalah jawabannya.', 'Hari ini cerah untuk ukuran Frostfall: saljunya lembut, anginnya tidak terlalu kencang.']), gerak: 'talk' }
}

function suka(H) {
  const { d } = H
  const m = H.norm.match(/ suka (?:dengan |sama )?([a-z]+) /)
  const has = w => H.norm.includes(` ${w} `)
  const v = hash(d.nama + 'suka')
  if (has('warna')) return { teks: `Warna kesukaanku ${warnaOf(d.rupa?.dye?.baju)} — makanya jaketku warna itu!`, gerak: 'cheer' }
  if (has('lagu') || has('musik')) return { teks: 'Lagu kesukaanku "Nyanyian Api Unggun". Kalau dinyanyikan bersama-sama di pesta, rasanya hangat sampai ke tulang.', gerak: 'cheer' }
  if (has('makanan') || has('makan')) return { teks: `Makanan kesukaanku ${['sup ikan asap', 'daging rusa panggang', 'roti gandum hitam dengan madu', 'kue madu buatan nenek'][Math.floor(v * 4)]}. Hmm, jadi lapar.`, gerak: 'cheer' }
  if (has('hewan') || has('binatang')) return { teks: 'Hewan kesukaanku rusa kutub — gagah, tanduknya bercabang, dan tidak pernah kedinginan.', gerak: 'cheer' }
  if (has('musim')) return { teks: 'Musim kesukaanku? Di Frostfall cuma ada musim dingin dan musim yang lebih dingin, hahaha!', gerak: 'cheer' }
  if (m && !['apa', 'apakah', 'tidak', 'nggak', 'enggak'].includes(m[1])) return pendapatTentang(H, m[1])
  const job = {
    nelayan: 'duduk di ujung dermaga waktu fajar, menunggu ikan menyambar', pemburu: 'berjalan sunyi di hutan pinus setelah salju turun', pedagang: 'mengobrol dengan pembeli sambil menawar',
    pandai: 'bunyi palu di landasan', masak: 'bau sup yang hampir matang', jaga: 'melihat kampung dari atas menara', penebang: 'bau kayu pinus yang baru dibelah',
    anak: 'perang bola salju dan meluncur di es sungai', tetua: 'mendongeng untuk cucu-cucu di depan api unggun',
  }[d.kerja] || 'duduk di dekat api unggun sambil minum teh pinus'
  const u = utama(d)
  const extra = { riang: ' Dan pesta, tentu saja! Aku selalu menari paling lama.', rakus: ' Dan makan, hehe — terutama daging rusa panggang.', petualang: ' Suatu hari aku ingin menyeberang ke Pulau Tropis.', ramah: ' Dan mengobrol dengan tetangga.' }[u] || ''
  return { teks: `Yang paling kusukai? ${kapital(job)}.${extra}`, gerak: 'cheer' }
}

function cinta(H) {
  const { d } = H
  if (H.anak) return { teks: 'Ih! Aku masih kecil, Kak! Hihihi.', gerak: 'shake' }
  if (d.pasangan) return { teks: `Aku sudah menikah dengan ${d.pasangan}. ${utama(d) === 'riang' ? 'Dia yang paling pandai menari di pesta api unggun!' : 'Kami bertemu di pesta api unggun bertahun-tahun lalu.'}`, gerak: 'nod' }
  if (d.umur >= 62) return { teks: 'Pasanganku sudah lama tiada. Tapi anak-cucu menemaniku setiap hari.', gerak: 'talk' }
  return { teks: 'Belum ada yang mau denganku, hahaha. Mungkin di pesta api unggun nanti?', gerak: 'cheer' }
}

function ajak(H) {
  const { d } = H
  const kampung = DESA_PENDEK[d.desa]
  const nilai = x => (x.desa === kampung ? 0 : 2) + (x.jenis === 'bolaSalju' && !H.anak ? 3 : 0) + (x.sedang ? 0 : 1)
  const e = d.acaraHariIni.filter(x => !x.lewat).sort((a, b) => nilai(a) - nilai(b))[0]
  if (d.act === 'buru') return { teks: 'Ssst! Aku sedang berburu. Nanti saja, ya.', gerak: 'shake' }
  if (e) return { teks: `Ayo! ${e.sedang ? `Ke ${e.nama} di ${e.desa} — sedang berlangsung sekarang!` : `Kita bertemu di ${e.nama}, ${e.desa}, jam ${e.mulai}.`}`, gerak: 'cheer' }
  if (['kios', 'tempa', 'masak', 'jaga', 'mancing', 'mancingEs'].includes(d.act)) return { teks: `Maaf, aku sedang ${d.kegiatan}. Kalau sudah selesai, mungkin.`, gerak: 'shake' }
  return { teks: 'Boleh saja! Tapi aku tidak jauh-jauh dari kampung, ya. Ayo ke api unggun saja, lebih hangat.', gerak: 'nod' }
}

function pamit(H) {
  return { teks: H.A.pilih(H.mem, 'pamitUtara', [`Hati-hati di jalan, ${pelaku(H)}! Jangan sampai kedinginan.`, 'Sampai jumpa! Mampirlah lagi ke api unggun kami.', `Selamat jalan, ${pelaku(H)}. Semoga saljunya bersahabat.`]), gerak: 'wave', selesai: true }
}

// ------------------------------------------------------------------ cadangan: selalu menjawab isi kalimat
const STOP = new Set(`yang dan di ke dari itu ini aku kamu saya dia apa siapa kapan mana berapa kenapa mengapa bagaimana apakah ada adalah dengan untuk pada juga saja sudah belum akan bisa boleh mau tidak bukan
ya iya oke tolong coba lagi sedang masih sangat sekali lebih paling banget kok sih dong deh lah kah pun nya mu ku tentang soal menurut menurutmu pendapat pendapatmu suka pernah punya tahu ingin ingat
kau engkau kalian kita kami mereka sini sana situ begitu begini seperti kayak jadi jika kalau karena agar supaya atau tapi tetapi namun hal sesuatu orang yang hari ini besok kemarin sekarang nanti tadi
apa bagaimana gimana cara caranya buat bikin membuat melakukan lakukan kenal tolong ceritakan cerita jelaskan beritahu kasih kenapa mengapa`.split(/\s+/))

function kataPokok(norm) {
  const words = norm.trim().split(' ').filter(w => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w))
  return words.sort((a, b) => b.length - a.length)[0] || null
}

function tentangOrang(H, p) {
  const { d } = H
  if (p.hubungan !== 'tetanggaku' && p.hubungan !== 'temanku') return { teks: `${p.nama}? Itu ${p.hubungan}! Sekarang ${p.kegiatan === 'di rumahnya' ? 'dia sedang di rumah' : `dia sedang ${p.kegiatan}`}.`, gerak: 'cheer' }
  const kenal = p.sekampung ? `${p.hubungan === 'temanku' ? 'temanku' : 'tetanggaku'} di ${d.namaDesa}` : `orang ${p.desa}`
  const dimana = p.kegiatan === 'tidur di rumah' ? 'Jam segini dia sudah tidur.' : p.kegiatan === 'di rumahnya' ? 'Sekarang dia di rumahnya.' : `Terakhir kulihat dia sedang ${p.kegiatan.replace(/^sedang /, '')}.`
  const siapa = p.kerja === 'anak' ? `masih anak-anak, umurnya ${p.umur}` : `${p.pekerjaan}, umurnya ${p.umur}`
  return { teks: `${p.namaLengkap}? ${kapital(kenal)} — ${siapa}. ${dimana}`, gerak: 'talk' }
}

// pernyataan pemain tentang dirinya: "aku lapar", "aku dari Pulau Tropis", "aku suka ikan", …
function pernyataan(H, niat = 'lain') {
  const { norm, ctx } = H
  if (!/ (aku|saya) /.test(norm) || / (kamu|kau) /.test(norm)) return null
  const has = w => norm.includes(` ${w} `)
  if (has('mau') || has('ingin') || has('akan')) {
    if (has('tidur') || has('istirahat')) return { teks: 'Tidurlah yang nyenyak! Kalau butuh tempat hangat, kedai panjang Emberwick selalu terbuka.', gerak: 'nod' }
    if (has('beli') || has('belanja') || has('membeli')) return { teks: 'Mau berbelanja? Pasar Emberwick di alun-alun — tapi pedagangnya hanya melayani warga desa. Coba saja menyapa mereka dulu.', gerak: 'talk' }
    if (has('makan')) return { teks: 'Mau makan? Kedai panjang Emberwick, di utara alun-alun. Supnya selalu panas.', gerak: 'talk' }
    if (has('pulang')) return { teks: 'Pulang ke seberang? Hati-hati di selat, airnya sedingin es. Dermaga Frostfall di pantai barat.', gerak: 'wave' }
    if (has('memancing') || has('mancing')) return { teks: 'Mau memancing? Dermaga kecil Teluk Salju atau lubang es di muara sungai tempat terbaiknya.', gerak: 'talk' }
  }
  if (has('lapar') || has('haus')) return { teks: `Kau ${has('haus') ? 'haus' : 'lapar'}? Pergilah ke kedai panjang Emberwick — sup ikan asapnya hangat dan mengenyangkan.${ctx.makanan.length ? ' Atau makan bekal dari Tasmu dulu.' : ''}`, gerak: 'talk' }
  if (has('dingin') || has('kedinginan') || has('menggigil')) return { teks: 'Tentu saja kau kedinginan, jaketmu tipis sekali! Cepat ke api unggun terdekat — berdiri dekat-dekat apinya.', gerak: 'talk' }
  if (has('capek') || has('lelah') || has('ngantuk')) return { teks: 'Duduklah sebentar di bangku dekat api unggun. Di Frostfall, beristirahat bukan tanda malas — itu cara bertahan hidup.', gerak: 'nod' }
  if (has('sedih') || has('kesepian') || has('kecewa') || has('takut')) return { teks: 'Hei… jangan sedih. Malam ini datanglah ke api unggun — tidak ada yang sendirian di dekat api.', gerak: 'nod' }
  if (has('senang') || has('bahagia') || has('gembira')) return { teks: 'Aku ikut senang! Kegembiraan itu menular, apalagi di musim dingin.', gerak: 'cheer' }
  if (has('tersesat') || has('bingung')) {
    const t = H.A.tempatJawab(H.npc, H.mem, ctx, null)
    return { teks: `Tersesat? ${t.teks}`, gerak: 'talk' }
  }
  if (has('tropis') || has('selatan') || has('seberang')) return { teks: 'Dari Pulau Tropis? Jauh sekali! Pantas jaketmu tipis. Bagaimana rasanya tinggal di negeri tanpa salju?', gerak: 'cheer' }
  if (has('pemburu') || has('berburu')) return { teks: 'Kau juga pemburu? Ikutlah dengan orang-orang Rusa Putih suatu pagi — tapi jangan berisik!', gerak: 'cheer' }
  if (has('nelayan') || has('memancing') || has('mancing')) return { teks: 'Kau juga suka memancing? Coba dari dermaga kecil Teluk Salju — ikannya gemuk-gemuk.', gerak: 'cheer' }
  if (has('suka') || has('senang')) {
    const w = kataPokok(norm.replace(/ (aku|saya) /, ' '))
    if (w) return { teks: `Kau suka ${w}? ${pendapatTentang(H, w).teks}`, gerak: 'talk' }
  }
  if (has('benci') || has('tidak suka')) {
    const w = kataPokok(norm)
    return { teks: `Tidak suka ${w || 'itu'}? Hmm, setiap orang punya selera sendiri.`, gerak: 'nod' }
  }
  // maksudnya dikenal (mis. "aku mau tahu soal gua"): biar dijawab topiknya
  if (niat !== 'lain' && niat !== 'tanya') return null
  const w = kataPokok(norm)
  if (w) return { teks: `Oh, begitu? Ceritakan lagi soal ${w} itu — aku penasaran.`, gerak: 'nod' }
  return null
}

function pendapatTentang(H, w) {
  const { d, mem } = H
  for (const [keys, fn, op] of KAMUS)
    if (keys.some(k => k.includes(w) || w.includes(k))) {
      const pre = op > 0 ? 'Aku suka itu!' : op < 0 ? 'Aku kurang suka, terus terang.' : 'Biasa saja menurutku.'
      return { teks: `${pre} ${fn(H)}`, gerak: op > 0 ? 'cheer' : 'talk' }
    }
  if (mem.kamus?.[w]) return { teks: `Kau pernah bilang ${w} itu ${mem.kamus[w]}. Kedengarannya ${hash(d.nama + w) > 0.4 ? 'menyenangkan' : 'aneh'}!`, gerak: 'talk' }
  const v = hash(d.nama + w)
  return { teks: v > 0.6 ? `${kapital(w)}? Kedengarannya menarik, walau aku belum pernah melihatnya di Frostfall.` : v > 0.3 ? `${kapital(w)}… aku tidak terlalu tahu, jadi tidak punya pendapat.` : `${kapital(w)}? Entahlah, aku lebih suka hal-hal yang kukenal: salju, api unggun, dan sup ikan.`, gerak: 'talk' }
}

// pertanyaan ya/tidak tentang dirinya
function yaTidak(H) {
  const { norm, d } = H
  const q = norm
  const has = w => q.includes(` ${w} `)
  const awal = /^ (apakah|apa|bisakah|pernahkah|sudahkah|maukah|benarkah|punyakah) /.test(q)
  const you = has('kamu') || has('kau')
  const verb = ['bisa', 'pernah', 'punya', 'sudah', 'mau', 'takut', 'tahu', 'kedinginan', 'lapar', 'menikah'].some(has)
  if (!(awal && (you || verb)) && !(/\?\s*$/.test(H.teks) && verb)) return null
  if (has('anak')) {
    const n = anakAnak(d).length
    return { teks: n ? `Punya, ${angka(n)}: ${daftar(anakAnak(d).map(a => a.nama))}.` : H.anak ? 'Aku sendiri masih anak-anak, Kak!' : 'Belum punya anak.', gerak: 'nod' }
  }
  if (has('istri') || has('suami') || has('menikah') || has('pasangan')) return cinta(H)
  if (has('punya')) {
    const PUNYA = {
      rumah: () => `Punya, di ${d.namaDesa}.`, jaket: () => 'Punya — yang kupakai ini!', topi: () => (pakai(d, BAG.helm) ? 'Punya, ini dia di kepalaku!' : 'Punya, tapi hari ini kutinggal di rumah.'),
      busur: () => (d.kerja === 'pemburu' ? 'Tentu, busur cemara buatanku sendiri.' : 'Tidak, aku bukan pemburu.'), pancing: () => (['nelayan', 'pancingEs'].includes(d.kerja) ? 'Punya, joranku sudah menemaniku bertahun-tahun.' : 'Tidak, aku bukan nelayan.'),
      sampan: () => (d.kerja === 'nelayan' ? 'Keluargaku punya satu sampan di pantai Teluk Salju.' : 'Tidak, sampan cuma dipunyai nelayan.'), perahu: () => (d.kerja === 'nelayan' ? 'Keluargaku punya satu sampan di pantai Teluk Salju.' : 'Tidak, perahu cuma dipunyai nelayan.'),
      kapak: () => 'Setiap rumah di Frostfall punya kapak — tanpa kayu bakar kami bisa membeku!', teman: () => `Punya: ${daftar(d.teman.slice(0, 3))}.`,
    }
    for (const [k, f] of Object.entries(PUNYA)) if (has(k)) return { teks: f(), gerak: 'nod' }
    const w = kataPokok(q.replace(' punya ', ' '))
    if (w) return { teks: `${kapital(w)}? Tidak, aku tidak punya. ${['kucing', 'anjing', 'kuda'].includes(w) ? 'Hewan peliharaan jarang di sini — terlalu dingin.' : 'Di Frostfall barang seperti itu jarang ada.'}`, gerak: 'shake' }
  }
  const bisa = {
    memancing: ['nelayan', 'pancingEs'], mancing: ['nelayan', 'pancingEs'], berburu: ['pemburu'], memanah: ['pemburu'], memasak: ['masak', 'warga', 'kedai'], masak: ['masak', 'warga', 'kedai'],
    menebang: ['penebang'], menempa: ['pandai'], berdagang: ['pedagang'], menjahit: ['penyamak', 'warga'],
  }
  for (const [k, jobs] of Object.entries(bisa))
    if (has(k)) return H.anak ? { teks: `Aku masih kecil, Kak, jadi belum pandai ${k}. Tapi aku sering melihat orang dewasa melakukannya!`, gerak: 'talk' } : jobs.includes(d.kerja) ? { teks: `Tentu bisa! Itu memang pekerjaanku sebagai ${d.pekerjaan}.`, gerak: 'cheer' } : { teks: `Sedikit-sedikit, tapi aku bukan ahlinya. ${kapital(d.pekerjaan)} — itu bidangku.`, gerak: 'talk' }
  if (has('menari')) return { teks: d.sifat.riang > 0.5 ? 'Bisa! Lihat saja aku di pesta api unggun nanti.' : 'Menari? Kakiku kaku, hahaha. Aku lebih suka menonton.', gerak: d.sifat.riang > 0.5 ? 'cheer' : 'shake' }
  if (has('berenang')) return { teks: 'Berenang? Di air sedingin ini? Tidak, terima kasih!', gerak: 'shake' }
  if (has('pernah') && (has('tropis') || has('aeloria') || has('kencana') || has('selatan'))) return { teks: d.sifat.petualang > 0.7 ? 'Pernah sekali, waktu muda — naik sampan menyeberang selat. Panasnya bukan main!' : 'Belum pernah. Aku lahir dan besar di Frostfall, belum pernah keluar.', gerak: 'talk' }
  if (has('takut')) return { teks: d.sifat.pemberani > 0.6 ? 'Takut? Orang Utara tidak mudah takut.' : 'Jujur saja… iya, sedikit.', gerak: 'talk' }
  if (has('kedinginan') || has('dingin')) return { teks: d.kebutuhan.dingin > 0.4 ? 'Iya, lumayan dingin. Sebentar lagi aku ke api unggun.' : 'Tidak, jaket buluku hangat sekali.', gerak: 'talk' }
  if (has('lapar')) return { teks: d.kebutuhan.lapar > 0.5 ? 'Iya, lapar sekali!' : 'Tidak, aku sudah makan.', gerak: 'talk' }
  if (has('tahu')) {
    const w = kataPokok(q)
    if (w && H.mem.kamus?.[w]) return { teks: `Tahu! Katamu ${w} itu ${H.mem.kamus[w]}. Aku masih ingat.`, gerak: 'cheer' }
    if (w) return pengetahuan(H, w) || { teks: `${kapital(w)}? Tidak, aku tidak tahu apa-apa soal itu. Ceritakan padaku!`, gerak: 'shake' }
  }
  // selain itu: jawaban tetap (sama untuk pertanyaan yang sama), condong ke sifatnya
  const v = hash(d.nama + q)
  return v < 0.5 ? { teks: H.A.pilih(H.mem, 'yaUtara', ['Iya, tentu saja!', 'Hmm… iya, bisa dibilang begitu.', 'Ya! Kenapa kau bertanya?']), gerak: 'nod' } : { teks: H.A.pilih(H.mem, 'tidakUtara', ['Tidak, rasanya tidak.', 'Hmm, tidak. Tapi pertanyaanmu menarik.', 'Tidak — orang Utara tidak begitu, hehe.']), gerak: 'shake' }
}

function pengetahuan(H, w) {
  for (const [keys, fn] of KAMUS) if (keys.some(k => (k.includes(' ') ? H.norm.includes(` ${k} `) : k === w))) return { teks: fn(H), gerak: 'talk' }
  return null
}

function cadangan(H) {
  const { norm, mem, d, ctx, A } = H
  // kalimat yang sama diulang
  if (mem.terakhirTeks === norm) {
    mem.terakhirTeks = null
    return { teks: 'Kau sudah menanyakan itu tadi, hehe. Apa ada yang ingin kau tahu lebih dalam?', gerak: 'talk' }
  }
  mem.terakhirTeks = norm
  // menyebut nama penduduk
  if (ctx.kenal)
    for (const w of norm.trim().split(' ')) {
      if (w.length < 3 || w === d.nama.toLowerCase()) continue
      const p = ctx.kenal(w)
      if (p) return tentangOrang(H, p)
    }
  if (norm.includes(` ${d.nama.toLowerCase()} `)) return { teks: `Ya, itu aku — ${d.nama}! Ada apa?`, gerak: 'wave' }
  // pernyataan pemain tentang dirinya
  const st = pernyataan(H)
  if (st) return st
  // pendapat
  const op = norm.match(/ (?:menurutmu|menurut kamu|pendapatmu|pendapat kamu|kamu suka|kau suka|suka) (?:tentang |soal |dengan )?([a-z]+(?: [a-z]+)?) /)
  if (op) {
    const w = kataPokok(` ${op[1]} `) || op[1].split(' ')[0]
    return pendapatTentang(H, w)
  }
  // ya / tidak
  const yt = yaTidak(H)
  if (yt) return yt
  // pengetahuan: kata kunci yang dikenal (frasa dulu, lalu kata)
  for (const [keys, fn] of KAMUS) for (const k of keys) if (k.includes(' ') && norm.includes(` ${k} `)) return { teks: fn(H), gerak: 'talk' }
  const tok = A.tokens(norm)
  for (const [keys, fn] of KAMUS) for (const k of keys) if (!k.includes(' ') && tok.has(k)) return { teks: fn(H), gerak: 'talk' }
  // kata yang pernah dijelaskan pemain
  if (mem.kamus) for (const [w, arti] of Object.entries(mem.kamus)) if (tok.has(w)) return { teks: `${kapital(w)} — yang katamu ${arti}, kan? Aku masih ingat!`, gerak: 'cheer' }
  const w = kataPokok(norm)
  const tanya = k => norm.startsWith(` ${k} `) || norm.includes(` ${k} `)
  // menurut kata tanya
  if (tanya('siapa')) return { teks: w ? `${kapital(w)}? Aku tidak kenal nama itu di ${d.namaDesa}. Mungkin orang dari kampung lain, atau dari luar Frostfall.` : 'Siapa? Sebut namanya — aku kenal hampir semua orang di kampungku.', gerak: 'shake' }
  if (tanya('kapan')) return { teks: `Kapan${w ? ` soal ${w}` : ''}? Hmm, di Frostfall kami menghitung waktu dari api unggun: pagi bekerja, sore berkumpul, malam tidur. Sekarang jam ${d.waktu}.`, gerak: 'talk' }
  if (tanya('berapa')) return { teks: `Berapa${w ? ` ${w}` : ''}? Kalau soal kami: ${d.penduduk} orang tinggal di tiga kampung Frostfall, dan keluargaku ${angka(d.anggota.length + 1)} orang. Selain itu aku tidak pandai berhitung, hehe.`, gerak: 'talk' }
  if (tanya('kenapa') || tanya('mengapa')) return { teks: `Kenapa${w ? ` ${w}` : ''}? ${A.pilih(mem, 'knpUtara', ['Kata tetua, semua hal di Frostfall punya alasan — kadang alasannya cuma "karena dingin", hahaha.', 'Pertanyaan bagus. Tanyakan pada tetua desa, mereka tahu jawabannya.', 'Mungkin karena memang sudah begitu sejak zaman kakek buyut kami.'])}`, gerak: 'talk' }
  if (tanya('bagaimana') || tanya('gimana') || tanya('caranya') || tanya('cara')) return { teks: `${w ? `Cara ${w}? ` : ''}${A.pilih(mem, 'caraUtara', ['Pelan-pelan dan sabar — begitulah cara orang Utara mengerjakan segalanya.', 'Tanyakan orang yang ahli: nelayan soal ikan, pemburu soal rusa, juru masak soal sup. Aku cuma tahu urusanku sendiri.'])}`, gerak: 'talk' }
  if (tanya('di mana') || tanya('ke mana')) return A.tempatJawab(H.npc, mem, ctx, null)
  // kata asing: tanya balik & ingat penjelasannya
  if (w) {
    mem.tanyaKata = w
    return { teks: A.pilih(mem, 'asing', [`"${kapital(w)}"? Aku belum pernah mendengar kata itu di Frostfall. Apa itu?`, `Hmm, ${w}… itu apa? Jelaskan padaku, aku penasaran.`, `${kapital(w)}? Itu barang dari negerimu? Ceritakan!`]), gerak: 'talk' }
  }
  return { teks: A.pilih(mem, 'lainUtara', ['Hmm? Coba katakan lagi dengan kata lain.', 'Maaf, telingaku tertutup topi bulu. Apa katamu tadi?', 'Aku kurang paham. Tanyakan soal keluargaku, kampungku, acara hari ini, atau apa saja tentang Frostfall!']), gerak: 'shake' }
}

function terimaPenjelasan(H) {
  const { mem, teks, d } = H
  const kata = mem.tanyaKata
  mem.tanyaKata = null
  const t = teks.trim().replace(/[.!?]+$/, '')
  if (t.split(/\s+/).length < 2) return { teks: `Hmm, jadi ${kata} itu apa? Masih belum kebayang, hehe. Ya sudahlah.`, gerak: 'talk' }
  if (/^(tidak tahu|entah|gak tahu|ga tau|nggak tahu|lupakan|sudahlah|bukan apa apa)/i.test(t)) return { teks: 'Hehe, tidak apa-apa. Mungkin lain kali.', gerak: 'nod' }
  const arti = t.length > 70 ? `${t.slice(0, 67)}…` : t
  mem.kamus = mem.kamus || {}
  mem.kamus[kata] = arti.charAt(0).toLowerCase() + arti.slice(1)
  const teman = d.teman[0]
  return { teks: `Oh, jadi ${kata} itu ${mem.kamus[kata]}? Baru tahu aku! ${teman ? `Nanti kuceritakan pada ${teman}.` : 'Akan kuingat.'}`, gerak: 'cheer' }
}

// "di mana istrimu?", "siapa nama ayahmu?", "anakmu sedang apa?" → tentang anggota keluarga itu
const KERABAT = [
  [['istrimu', 'istri'], ['istriku']], [['suamimu', 'suami'], ['suamiku']], [['ayahmu', 'bapakmu'], ['ayahku']], [['ibumu', 'emakmu'], ['ibuku']],
  [['anakmu', 'putramu', 'putrimu'], ['putraku', 'putriku']], [['kakekmu'], ['kakekku']], [['nenekmu'], ['nenekku']], [['cucumu'], ['cucu laki-lakiku', 'cucu perempuanku']],
  [['adikmu', 'kakakmu', 'saudaramu'], ['saudara laki-lakiku', 'saudara perempuanku']],
]
function kerabat(H) {
  const { norm, d } = H
  const toks = norm.trim().split(' ')
  for (const [kata, rel] of KERABAT) {
    if (!kata.some(k => toks.includes(k))) continue
    if (kata[0] === 'istrimu' || kata[0] === 'suamimu') if (!toks.some(t => t.endsWith('mu')) && !toks.includes('kamu')) continue
    const label = kata[0].replace(/mu$/, '')
    const list = d.anggota.filter(m => rel.includes(m.hubungan))
    if (!list.length) {
      if (label === 'ayah' || label === 'ibu') return { teks: H.anak ? `${kapital(label)}ku? Dia sedang bekerja, pulangnya nanti sore.` : `${kapital(label)}ku sudah lama tiada. Tapi kenangannya masih hangat seperti api unggun.`, gerak: 'talk' }
      if (label === 'istri' || label === 'suami') return cinta(H)
      if (label === 'anak' || label === 'putra' || label === 'putri') return { teks: H.anak ? 'Aku sendiri masih anak-anak, Kak!' : 'Aku belum punya anak.', gerak: 'shake' }
      return { teks: `Aku tidak punya ${label} yang tinggal bersamaku.`, gerak: 'shake' }
    }
    const kini = m => (m.kegiatan === 'tidur di rumah' ? 'sedang tidur' : m.kegiatan === 'di rumah' ? 'sedang di rumah' : `sedang ${m.kegiatan.replace(/^sedang /, '')}`)
    if (list.length === 1) return { teks: `${kapital(list[0].hubungan)} namanya ${list[0].nama}, umurnya ${list[0].umur}. Sekarang dia ${kini(list[0])}.`, gerak: 'talk' }
    return { teks: `Anak-anakku: ${daftar(list.slice(0, 4).map(m => `${m.nama} (${m.umur}) ${kini(m)}`))}.`, gerak: 'talk' }
  }
  return null
}
// yang dilakukannya hari ini (catatan harian) & rencananya
function tadi(H) {
  const { d } = H
  const hari = d.catatan.filter(c => c.hari === d.hari)
  if (!hari.length) return { teks: 'Hari ini belum banyak yang terjadi — aku baru saja mulai.', gerak: 'talk' }
  return { teks: `Hari ini aku ${daftar(hari.slice(-4).map(c => c.teks))}.`, gerak: 'talk' }
}
const RUTIN = {
  nelayan: 'memancing di dermaga kecil sampai siang, lalu mengasap ikan', pemburu: 'berangkat berburu rusa pagi-pagi bersama pemburu lain', pedagang: 'membuka kios di pasar Emberwick',
  pandai: 'menempa di landasan', masak: 'memasak sup di kedai panjang', penebang: 'menebang kayu di tepi hutan', penyamak: 'menyamak kulit rusa', pengasap: 'mengurus pondok pengasapan',
  jaga: 'berjaga di menara', pancingEs: 'memancing di lubang es sungai', anak: 'main bola salju!', tetua: 'mendongeng untuk cucu-cucu', kepala: 'berkeliling melihat warga',
}
function rencana(H) {
  const { d } = H
  const r = RUTIN[H.anak ? 'anak' : d.kerja] || 'menimba air, menyekop salju, dan memasak untuk keluarga'
  const e = d.acaraHariIni.find(x => !x.lewat && !x.sedang)
  return { teks: `${H.norm.includes(' besok ') ? 'Besok' : 'Nanti'}? Seperti biasa: bangun jam ${d.bangun}, sarapan, lalu ${r}.${e && !H.norm.includes(' besok ') ? ` Malam ini aku mau ke ${e.nama} jam ${e.mulai}.` : ' Kalau ada acara, pasti aku datang.'}`, gerak: 'talk' }
}
const SERUAN = /^ (ha(ha)+|he(he)+|hi(hi)+|wk(wk)+|xi(xi)+|lol|wkwk|hehe|haha) $/
const BAHASA_INGGRIS = {
  what: 'apa', who: 'siapa', where: 'di mana', when: 'kapan', how: 'bagaimana', why: 'kenapa', your: '', you: 'kamu', name: 'nama', love: 'cinta', hello: 'halo', hi: 'halo', hey: 'halo',
  family: 'keluarga', food: 'makanan', fish: 'ikan', hunt: 'berburu', hunting: 'berburu', snow: 'salju', cold: 'dingin', thanks: 'makasih', thank: 'terima kasih', bye: 'dadah', good: 'bagus',
  morning: 'pagi', night: 'malam', time: 'jam berapa', party: 'pesta', job: 'pekerjaan', work: 'pekerjaan', old: 'umur', age: 'umur', home: 'rumah', house: 'rumah', friend: 'teman', story: 'cerita',
  joke: 'lelucon', is: '', are: '', the: '', a: '', do: '', i: 'aku', me: 'aku', my: '', doing: 'sedang apa', from: 'dari', like: 'suka',
}
function inggris(norm) {
  const toks = norm.trim().split(' ').filter(Boolean)
  if (toks.length < 2) return null
  const known = toks.filter(t => t in BAHASA_INGGRIS).length
  if (known / toks.length < 0.6) return null
  return toks.map(t => BAHASA_INGGRIS[t] ?? t).filter(Boolean).join(' ')
}

// sapaan pembuka saat obrolan dimulai
export function sapaUtara(npc, mem, ctx, A) {
  const d = npc.utara
  return salam({ npc, mem, ctx, A, d, teks: '', norm: '  ', anak: d.umur < 13 })
}

// ------------------------------------------------------------------ pintu masuk
// k = { niat, tempat, namaPemain }, teks = kalimat pemain ('' bila memilih topik)
export function jawabUtara(npc, mem, ctx, k, teks, A) {
  const d = npc.utara
  const H = { npc, mem, ctx, A, d, teks: teks || '', norm: A.normalisasi(teks || ''), anak: d.umur < 13 }
  // kalimat sesudah "apa itu …?": penjelasan pemain (kecuali ia bertanya / berpamitan / menyapa)
  if (mem.tanyaKata && teks) {
    if (!/\?\s*$/.test(teks) && !SERUAN.test(H.norm) && !inggris(H.norm) && !['pamit', 'salam', 'namaku', 'terimakasih', 'maaf', 'hinaan', 'pujian', 'tidak', 'ya'].includes(k.niat)) return terimaPenjelasan(H)
    mem.tanyaKata = null
  }
  if (teks) {
    // tertawa, "hmm", "ok"
    if (SERUAN.test(H.norm)) return { teks: A.pilih(mem, 'tawa', ['Hahaha! Tawamu menular!', 'Hehe, apa yang lucu?', 'Hahaha, kau ini ada-ada saja.']), gerak: 'cheer' }
    if (/^ (hmm+|hm|eh|em+) $/.test(H.norm)) return { teks: 'Hmm? Sedang memikirkan sesuatu? Tanyakan saja.', gerak: 'talk' }
    // bahasa negeri jauh (Inggris): diterjemahkan sebisanya lalu dijawab
    const en = inggris(H.norm)
    if (en) {
      const k2 = A.kenali(en)
      const r = k2.niat !== 'lain' && k2.niat !== 'tanya' ? jawabUtara(npc, mem, ctx, k2, en, A) : null
      return { teks: `Bahasamu aneh, tapi sepertinya aku mengerti… ${r ? r.teks : 'Maaf, aku hanya bisa bahasa kita.'}`, gerak: r ? r.gerak : 'shake' }
    }
    // anggota keluarga tertentu, kepala desa, catatan hari ini, rencana
    const kr = kerabat(H)
    if (kr) return kr
    if (H.norm.includes(' kepala desa ')) return { teks: d.kepalaDesa ? `Kepala desa Emberwick itu ${d.kepalaDesa}. Kalau ada perselisihan, dialah yang menengahi.` : 'Emberwick tidak punya kepala desa sekarang — semua dibicarakan di api unggun.', gerak: 'talk' }
    if (/ (tadi|seharian|pagi ini) /.test(H.norm) && / (lakukan|kerjakan|ngapain|sedang apa|apa saja|kegiatan|melakukan) /.test(H.norm)) return tadi(H)
    if (/ (besok|nanti|rencana|rencanamu) /.test(H.norm) && / (ngapain|sedang apa|mau|apa|kegiatan|rencana|rencanamu) /.test(H.norm) && k.niat !== 'acara') return rencana(H)
  }
  if (k.niat !== 'lain' && k.niat !== 'tanya') mem.terakhirTeks = null
  if (teks) {
    // pernyataan pemain tentang dirinya ("aku lapar / sedih / suka kucing …") ditimpali lebih dulu
    if (/^ (aku|saya) /.test(H.norm) && !['namaku', 'salam', 'pamit', 'terimakasih', 'maaf', 'hinaan', 'pujian', 'tempat', 'ajak'].includes(k.niat)) {
      const st = pernyataan(H, k.niat)
      if (st) return st
    }
    // pertanyaan ya / tidak tentang dirinya ("apakah kamu bisa memancing?")
    if (/^ (apakah|apa kamu|apa kau|bisakah|pernahkah|sudahkah|maukah|punyakah) /.test(H.norm)) {
      const yt = yaTidak(H)
      if (yt) return yt
    }
    // memuji bajunya → berterima kasih lalu bercerita tentang bajunya
    if (k.niat === 'pujian' && /( baju| jaket| topi| syal| tudung| sulaman| mantel| sepatu)/.test(H.norm)) {
      mem.suka += 1
      return { teks: `Terima kasih! ${baju(H).teks}`, gerak: 'cheer' }
    }
  }
  switch (k.niat) {
    case 'salam': return salam(H)
    case 'pamit': return pamit(H)
    case 'nama': return perkenalan(H)
    case 'kabar': return kabar(H)
    case 'kegiatan': return kegiatan(H)
    case 'pekerjaan': return pekerjaan(H)
    case 'perasaan': return perasaan(H)
    case 'umur': return umur(H)
    case 'keluarga': return keluarga(H)
    case 'rumah': return rumah(H)
    case 'teman': return teman(H)
    case 'tidur': return tidur(H)
    case 'waktu': return waktu(H)
    case 'acara':
    case 'musik': return acara(H)
    case 'berburu': return berburu(H)
    case 'ikan': return ikan(H, ctx)
    case 'baju': return baju(H)
    case 'hewan': return hewan(H)
    case 'gua': return gua(H)
    case 'kerajaan': return kerajaan(H)
    case 'makanan': return makanan(H, ctx)
    case 'belanja': return belanja(H)
    case 'cerita': return cerita(H)
    case 'lelucon': return lelucon(H)
    case 'nasihat': return nasihat(H, ctx)
    case 'pemain': return tentangPemain(H)
    case 'cuaca':
    case 'salju': return cuaca(H)
    case 'suka': return suka(H)
    case 'cinta': return cinta(H)
    case 'ajak': return ajak(H)
    case 'orc': return { teks: 'Orc? Mereka tidak tahan dingin — tidak pernah ada orc yang menginjak salju Frostfall. Kudengar mereka berkemah di Pulau Tropis.', gerak: 'shake' }
    case 'laut': return { teks: `Selat antara Frostfall dan Pulau Tropis dingin sekali — jangan lama-lama berenang. Lebih baik pakai perahu dan berlabuh di Dermaga Frostfall.${ctx.punyaPerahu ? ' Kau sudah punya perahu, bagus.' : ' Perahu bisa kau buat sendiri dari sepuluh kayu, di tepi pantai, lewat Tasmu.'}`, gerak: 'talk' }
    case 'kayu': return { teks: 'Kayu bakar adalah nyawa kami di musim dingin. Penebang mengambilnya dari tepi Hutan Pinus Salju, lalu dibelah di dekat rumah-rumah.', gerak: 'talk' }
    case 'senjata': return { teks: 'Pandai besi Emberwick membuat mata kapak, tombak, dan pisau berburu. Busur dibuat sendiri oleh para pemburu dari kayu cemara.', gerak: 'talk' }
    case 'lain':
    case 'tanya': return cadangan(H)
    default: return null
  }
}
