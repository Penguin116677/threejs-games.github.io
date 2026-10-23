// Otak percakapan NPC (tanpa Three.js / DOM — bisa diuji langsung dengan Node). Pemain mengetik
// kalimat bebas atau memilih topik; NPC menjawab sesuai DIRINYA (nama, bangsa, peran, sifat),
// KEADAANNYA sekarang (kegiatan, suasana hati, kebutuhan), TEMPATNYA (arah & jarak ke tempat lain),
// dan SIKAPNYA kepada pemain (kerajaan yang memusuhi pemain, pemain yang membuat rusuh, keakraban
// dari obrolan sebelumnya, pujian / hinaan, nama pemain yang pernah disebut). Maksud kalimat
// dikenali dari kata kunci bahasa Indonesia sehari-hari, termasuk singkatan obrolan (gmn, dmn, yg,
// ga, makasih, …) dan akhiran -nya / -mu / -ku / -kah / -lah.
//
// npc (dibuat ui/obrolan.js): { bangsa: 'elf' | 'manusia', nama, gender, kerja, peran, pangkat?,
//   pasukan?, senjata?, kegiatan (teks "sedang …"), act (kunci kegiatan), suasana, sifat { rajin, riang,
//   ramah, rakus, pemalas, petualang, pemberani, pemarah: 0..1 }, butuh { lapar, lelah, bosan, sepi,
//   latih: 0..100 }, dagangan? (nama kios), umur, x, z, wilayah }
// ctx: { tempat: [{ nama, kata: [...], x, z, ket? }], seberang(x0, z0, x1, z1) → harus menyeberang
//   laut?, buron (pemain diburu kerajaan si NPC), pesta, koin, hp, makanan: [{ id, nama }], kayu,
//   punyaPancing, punyaPerahu }
// ingatan (per NPC, dibuat createMemory): keakraban & hal-hal yang sudah dibicarakan

const ACAK = Math.random

// ------------------------------------------------------------------ pengenal maksud
const SINGKATAN = {
  gmn: 'gimana', bgmn: 'bagaimana', gimana: 'bagaimana', knp: 'kenapa', dmn: 'di mana', dimana: 'di mana', dimanakah: 'di mana',
  kmn: 'ke mana', kemana: 'ke mana', yg: 'yang', sy: 'saya', aq: 'aku', gw: 'aku', gue: 'aku', lu: 'kamu', lo: 'kamu',
  km: 'kamu', kmu: 'kamu', kau: 'kamu', engkau: 'kamu', anda: 'kamu', ga: 'tidak', gak: 'tidak', nggak: 'tidak',
  enggak: 'tidak', ngga: 'tidak', tdk: 'tidak', udh: 'sudah', sdh: 'sudah', blm: 'belum', bgt: 'banget', mksh: 'makasih',
  trims: 'makasih', thx: 'makasih', tq: 'makasih', tengkyu: 'makasih', org: 'orang', dgn: 'dengan', utk: 'untuk',
  jg: 'juga', aja: 'saja', tau: 'tahu', lg: 'lagi', skrg: 'sekarang', brp: 'berapa', bs: 'bisa', kpn: 'kapan',
  krn: 'karena', ap: 'apa', apaan: 'apa', hlo: 'halo', hallo: 'halo', helo: 'halo', hai: 'halo', hay: 'halo',
  hi: 'halo', hei: 'halo', hey: 'halo', ngapain: 'sedang apa', ngapaen: 'sedang apa', lagi: 'sedang', kalian: 'kamu',
}
const AKHIRAN = ['nya', 'mu', 'ku', 'kah', 'lah', 'pun', 'kan', 'in']

// [niat, kata kunci] — kalimat cocok bila memuat salah satu kata (kata utuh) / frasa
const NIAT = [
  ['pamit', ['dadah', 'bye', 'sampai jumpa', 'selamat tinggal', 'pamit', 'permisi dulu', 'aku pergi', 'saya pergi', 'duluan ya', 'see you', 'daah', 'pergi dulu', 'sampai nanti']],
  ['namaku', []], // dikenali dari pola "namaku …" (lihat kenali)
  ['terimakasih', ['terima kasih', 'makasih', 'thanks', 'thank you', 'matur nuwun', 'nuhun', 'suksma']],
  ['maaf', ['maaf', 'mohon maaf', 'sori', 'sorry', 'ampun', 'ampuni']],
  ['hinaan', ['bodoh', 'goblok', 'tolol', 'jelek', 'payah', 'benci', 'bau', 'jahat', 'pengecut', 'bego', 'dungu', 'sialan', 'brengsek', 'lemah', 'cupu', 'norak']],
  ['pujian', ['hebat', 'keren', 'cantik', 'ganteng', 'tampan', 'bagus', 'pintar', 'baik hati', 'kuat', 'luar biasa', 'mantap', 'indah', 'manis', 'lucu sekali', 'menawan']],
  ['beri', ['beri makan', 'kasih makan', 'mau makan', 'ini makanan', 'untukmu', 'buatmu', 'hadiah', 'kuberi', 'aku beri', 'saya beri', 'ambil ini']],
  ['nama', ['nama', 'siapa kamu', 'kamu siapa', 'siapa namamu', 'kenalan', 'kenalkan', 'siapakah kamu', 'siapa dirimu', 'boleh kenal']],
  ['kabar', ['apa kabar', 'kabar', 'bagaimana kabar', 'sehat', 'baik baik saja', 'how are you', 'apa kbr']],
  ['kegiatan', ['sedang apa', 'mau ke mana', 'hendak ke mana', 'ke mana', 'sibuk', 'lagi ngapain', 'sedang ngapain', 'kegiatan']],
  ['pekerjaan', ['pekerjaan', 'kerja', 'bekerja', 'profesi', 'tugas', 'jabatan', 'pangkat', 'pasukan', 'mata pencaharian']],
  ['perasaan', ['perasaan', 'merasa', 'senang', 'sedih', 'bahagia', 'capek', 'capai', 'lelah', 'bosan', 'kesepian', 'ngantuk', 'suasana hati', 'mood']],
  ['umur', ['umur', 'usia', 'berapa tahun', 'tua', 'lahir']],
  ['keluarga', ['keluarga', 'anak', 'istri', 'suami', 'ibu', 'ayah', 'orang tua', 'saudara', 'kakak', 'adik', 'rumah', 'tinggal di']],
  ['kerajaan', ['kerajaan', 'raja', 'ratu', 'istana', 'benteng', 'keraton', 'pemimpin', 'penguasa', 'negeri', 'rakyat', 'aeloria', 'kencana']],
  ['orc', ['orc', 'monster', 'musuh', 'bahaya', 'perang', 'serbuan', 'menyerang', 'serang', 'perkemahan']],
  ['laut', ['perahu', 'kapal', 'sampan', 'jukung', 'berlayar', 'menyeberang', 'nyebrang', 'seberang', 'laut', 'renang', 'berenang', 'dermaga', 'pelabuhan', 'jembatan', 'selat']],
  ['ikan', ['ikan', 'mancing', 'memancing', 'pancing', 'pancingan', 'umpan', 'nelayan', 'kakap', 'tongkol', 'kerapu']],
  ['kayu', ['kayu', 'pohon', 'tebang', 'menebang', 'papan', 'balok']],
  ['senjata', ['senjata', 'pedang', 'tombak', 'perisai', 'zirah', 'baju besi', 'helm', 'pandai besi', 'tempa', 'busur', 'panah', 'latihan']],
  ['makanan', ['makan', 'makanan', 'lapar', 'roti', 'minum', 'minuman', 'haus', 'masak', 'enak', 'lezat', 'sate', 'buah']],
  ['belanja', ['beli', 'jual', 'harga', 'toko', 'kios', 'belanja', 'dagang', 'dagangan', 'pasar', 'koin', 'uang', 'murah', 'mahal', 'berapa harga']],
  ['musik', ['musik', 'lagu', 'nyanyi', 'bernyanyi', 'menyanyi', 'tari', 'menari', 'pesta', 'joget', 'dansa', 'kecapi']],
  ['cerita', ['cerita', 'dongeng', 'kisah', 'legenda', 'sejarah', 'zaman dulu', 'hikayat', 'rahasia']],
  ['lelucon', ['lelucon', 'lucu', 'lawak', 'lawakan', 'humor', 'tertawa', 'candaan', 'bercanda', 'tebak tebakan']],
  ['nasihat', ['saran', 'nasihat', 'tips', 'bantu', 'bantuan', 'tolong', 'petunjuk', 'harus apa', 'bagaimana cara', 'caranya', 'gimana cara']],
  ['pemain', ['siapa aku', 'kenal aku', 'tahu aku', 'aku siapa', 'tentang aku', 'menurutmu aku', 'pendapatmu tentang aku', 'aku ini']],
  ['cuaca', ['cuaca', 'hujan', 'panas', 'cerah', 'angin', 'matahari', 'langit', 'dingin']],
  ['salam', ['halo', 'pagi', 'siang', 'sore', 'malam', 'selamat', 'assalamualaikum', 'salam', 'permisi', 'punten', 'sampurasun', 'om swastiastu', 'kulonuwun', 'yo', 'sugeng']],
  ['kenapa', ['kenapa', 'mengapa', 'apa sebab', 'kok bisa']],
  ['ya', ['ya', 'iya', 'yoi', 'oke', 'ok', 'baiklah', 'setuju', 'boleh', 'tentu', 'yup', 'sip', 'mau', 'ayo']],
  ['tidak', ['tidak', 'bukan', 'jangan', 'ogah', 'tak usah', 'enggan', 'nanti saja']],
]
// kata tempat yang ditanyakan arahnya (bersama "di mana", "ke …", "arah", …)
const TANYA_TEMPAT = ['di mana', 'ke mana', 'ke', 'arah', 'letak', 'lokasi', 'jalan ke', 'menuju', 'pergi ke', 'cari', 'mencari', 'jauh', 'dekat', 'ke arah', 'lewat mana']

export function normalisasi(teks) {
  const kata = String(teks).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ').replace(/-/g, ' ')
    .split(/\s+/).filter(Boolean)
    .map(k => SINGKATAN[k] || k)
  return ` ${kata.join(' ')} `
}
function tokens(norm) {
  const set = new Set()
  for (const t of norm.trim().split(' ')) {
    set.add(t)
    // akhiran: -nya/-mu/-ku/…, juga -kan & -in bahasa obrolan ("ceritakan", "ceritain" → cerita)
    for (const a of AKHIRAN) if (t.length > a.length + (a.length < 3 && a !== 'mu' && a !== 'ku' ? 4 : 2) && t.endsWith(a)) set.add(t.slice(0, -a.length))
  }
  return set
}
const cocok = (norm, tok, kata) => (kata.includes(' ') ? norm.includes(` ${kata} `) : tok.has(kata))

// tempat yang disebut dalam kalimat (kata kuncinya), atau null
function tempatDisebut(norm, tok, tempat) {
  let best = null
  let len = 0
  for (const t of tempat)
    for (const k of t.kata)
      if (k.length > len && cocok(norm, tok, k)) {
        best = t
        len = k.length
      }
  return best
}

// { niat, tempat, namaPemain }
export function kenali(teks, tempat = []) {
  const norm = normalisasi(teks)
  const tok = tokens(norm)
  const m = norm.match(/ (?:namaku|nama ku|nama saya|nama aku|panggil aku|panggil saya|aku dipanggil|saya dipanggil) (?:adalah |ialah )?([a-z][a-z]{1,15})/)
  if (m) return { niat: 'namaku', namaPemain: m[1].charAt(0).toUpperCase() + m[1].slice(1) }
  const tempatnya = tempatDisebut(norm, tok, tempat)
  if (tempatnya && TANYA_TEMPAT.some(k => cocok(norm, tok, k))) return { niat: 'tempat', tempat: tempatnya }
  for (const [niat, kata] of NIAT) if (kata.some(k => cocok(norm, tok, k))) return { niat, tempat: tempatnya }
  if (tempatnya) return { niat: 'tempat', tempat: tempatnya }
  if (/\?\s*$/.test(String(teks)) || norm.includes(' apa ')) return { niat: 'tanya' }
  return { niat: 'lain' }
}

// ------------------------------------------------------------------ pembantu
export function createMemory() {
  return { kali: 0, suka: 0, namaPemain: '', terakhir: {}, marah: 0, diberi: 0, kenalNama: false, tawar: null, topik: new Set() }
}
// pilih kalimat dari daftar, tidak mengulang kalimat yang sama berturut-turut untuk kunci yang sama
function pilih(mem, kunci, daftar) {
  if (daftar.length === 1) return daftar[0]
  let i = Math.floor(ACAK() * daftar.length)
  if (i === mem.terakhir[kunci]) i = (i + 1) % daftar.length
  mem.terakhir[kunci] = i
  return daftar[i]
}
const SIFAT = ['rajin', 'riang', 'ramah', 'rakus', 'pemalas', 'petualang', 'pemberani', 'pemarah']
export const sifatUtama = npc => SIFAT.slice().sort((a, b) => (npc.sifat[b] || 0) - (npc.sifat[a] || 0))[0]
const elf = npc => npc.bangsa === 'elf'
const anak = npc => npc.kerja === 'anak'

// sapaan untuk pemain
function sebut(npc, mem) {
  if (mem.namaPemain) return mem.namaPemain
  if (anak(npc)) return 'Kak'
  if (!elf(npc)) return 'Kisanak'
  return mem.suka >= 3 ? 'sahabat' : 'pengembara'
}

// arah mata angin dari (x0, z0) ke (x1, z1): −z = utara, +x = timur
const ARAH = ['utara', 'timur laut', 'timur', 'tenggara', 'selatan', 'barat daya', 'barat', 'barat laut']
export function arah(x0, z0, x1, z1) {
  const a = Math.atan2(x1 - x0, -(z1 - z0))
  return ARAH[(Math.round(a / (Math.PI / 4)) + 8) % 8]
}
export function jarakTeks(m) {
  if (m < 25) return 'dekat sekali, beberapa langkah saja'
  if (m < 1000) return `kira-kira ${Math.round(m / 10) * 10} meter`
  return `kira-kira ${(m / 1000).toFixed(1).replace('.', ',')} kilometer`
}

// ------------------------------------------------------------------ bahan jawaban
const KOMENTAR_KEGIATAN = {
  makan: ['Masakan Balai Makan hari ini enak sekali.', 'Supnya hangat, rotinya baru keluar dari tungku.'],
  bekal: ['Bekalku sederhana, tapi cukup mengenyangkan.'],
  antre: ['Antreannya panjang, tapi sabar sedikit pasti kebagian.'],
  tidur: ['Hoahm… aku baru mau tidur.'],
  tanding: ['Lawan tandingku hari ini tangguh sekali!', 'Tangkisanku masih kurang cepat.'],
  panah: ['Tadi tiga anak panahku tepat di tengah sasaran!', 'Angin dari laut membuat panah sedikit melenceng.'],
  boneka: ['Boneka latihan ini sudah penyok kupukul.'],
  baris: ['Kapten kami galak kalau barisan tidak rapi.'],
  jamuan: ['Jamuannya meriah! Ambil saja kalau mau.'],
  tari: ['Ayo ikut menari! Tidak perlu pandai.'],
  api: ['Api unggun ini hangat sekali.'],
  nonton: ['Pemusiknya hebat, ya?'],
  ngobrol: ['Kami sedang bertukar kabar.'],
  kedai: ['Minuman Kedai Daun Emas paling segar di Aeloria.'],
  pantai: ['Angin pantai menenangkan pikiran.'],
  mancing: ['Ikan di sini pemalu, butuh kesabaran.'],
  santai: ['Teduh di bawah pohon ini nyaman sekali.'],
  rebahan: ['Rumputnya empuk… jangan bilang kaptenku.'],
  latihSendiri: ['Berlatih sendirian juga ada gunanya.'],
  jalan: ['Jalan-jalan sore memang menyenangkan.'],
  lihat: ['Banyak yang bisa dilihat di sekitar sini.'],
  belanja: ['Harga di pasar hari ini lumayan.'],
  jaga: ['Aku sedang berjaga, jadi jangan lama-lama.'],
  kerja: ['Pekerjaan hari ini banyak, tapi menyenangkan.'],
  sumur: ['Air sumur ini dingin dan jernih.'],
  pulang: ['Sebentar lagi aku pulang.'],
  main: ['Main kejar-kejaran! Kakak mau ikut?'],
  antar: ['Hasil panen ini harus sampai ke pasar sebelum sore.'],
}
const PEKERJAAN_ELF = {
  kesatria: npc => `Aku ${npc.pangkat === 'Kapten' ? 'kapten yang memimpin satu regu di' : 'kesatria'} ${npc.pasukan}. Kami menjaga Aeloria: berlatih tiap hari, berjaga di gerbang, dan menghadang orc. Senjataku ${npc.senjata || 'pedang'}.`,
  pedagang: npc => `Aku pedagang di ${npc.dagangan || 'pasar'}. Mampirlah kalau butuh sesuatu — siapa pun boleh berbelanja di Pasar Aeloria.`,
  pandai: () => 'Aku pandai besi di Tempa Aeloria. Pedang perak, tombak, perisai, dan zirah lahir dari landasanku.',
  petani: () => 'Aku petani. Gandum dan sayur dari ladang kami diantar ke kios-kios di pasar.',
  masak: () => 'Aku juru masak Balai Makan. Sepuluh ribu kesatria harus kenyang tiap hari!',
  saji: () => 'Aku melayani antrean di Balai Makan. Kesatria yang lapar itu tidak sabaran, lho.',
  musik: () => 'Aku pemusik. Kecapiku menemani pesta di Padang Pesta.',
  kedai: () => 'Aku pemilik Kedai Daun Emas. Teh daun perak buatanku terkenal sampai ke benteng.',
  warga: () => 'Aku warga kota biasa. Kerjaku macam-macam: menimba air, membantu tetangga, berbelanja.',
  anak: () => 'Aku belum bekerja, aku masih kecil! Kerjaku bermain.',
}
const PEKERJAAN_MANUSIA = {
  penjual: () => 'Aku berjualan di pasar Kotaraja. Sayang, prajurit melarang kami berdagang dengan orang asing.',
  pembeli: () => 'Aku cuma belanja kebutuhan dapur di pasar.',
  nelayan: () => 'Aku nelayan. Tiap subuh berangkat dengan jukung, pulang membawa kakap dan tongkol.',
  kuli: () => 'Aku kuli pelabuhan. Peti-peti ini berat, tapi upahnya lumayan.',
  petani: () => 'Aku petani sawah. Padi Pulau Sawah memberi makan seluruh kerajaan.',
  pendeta: () => 'Aku pemangku pura. Kami berdoa agar laut tetap tenang bagi para nelayan.',
  raja: () => 'Aku Raja Kencana. Lancang benar orang asing berani menghadap tanpa dipanggil!',
  warga: () => 'Aku warga Kotaraja. Hidup di kota ramai, tapi sekarang banyak prajurit berjaga.',
  pejalan: () => 'Aku sedang dalam perjalanan. Kerjaku serabutan, apa saja asal halal.',
  pendatang: () => 'Aku pendatang dari Pulau Tropis, menyeberang dengan kapal untuk berdagang di pasar.',
}

const CERITA_ELF = [
  'Konon, Pohon Agung di halaman benteng ditanam raja elf pertama dari sebutir biji perak yang jatuh dari bulan.',
  'Dulu Aeloria tersambung ke Pulau Tropis lewat Jembatan Perak. Sejak orc makin berani, raja memerintahkan jembatan itu dibongkar. Sekarang hanya perahu yang bisa menyeberang.',
  'Kakekku bercerita, orc pertama terdampar di Pulau Tropis setelah badai besar. Sejak itu mereka berkemah di sana.',
  'Lima pasukan kami — Daun, Bulan, Fajar, Embun, dan Senja — dinamai menurut lima waktu ketika raja pertama bersumpah melindungi rakyatnya.',
]
const CERITA_MANUSIA = [
  'Kata simbah, Pura Segara di barat dibangun untuk memohon laut yang tenang bagi para nelayan.',
  'Dulu Jembatan Agung menghubungkan Kencana dengan Pulau Tropis. Sejak orc sering menyeberang, Sang Raja memerintahkan jembatan itu dibongkar. Kini pendatang harus naik kapal ke Dermaga Timur.',
  'Bala tentara di Pulau Wira berjumlah dua puluh lima ribu. Katanya, tidak ada kerajaan yang berani menyerang Kencana.',
  'Konon di dasar selat ada kapal jong tenggelam yang penuh emas. Belum ada nelayan yang menemukannya.',
]
const LELUCON = [
  'Kenapa orc tidak pernah menang main petak umpet? Karena baunya tercium dari seberang pulau! Hahaha!',
  'Apa bedanya kesatria malas dan boneka latihan? Boneka latihan tidak pernah minta istirahat!',
  'Ikan apa yang paling pintar? Ikan kakap… kakap-anpun bisa menjawab! Hehe… maaf, itu jelek sekali.',
  'Kenapa perahu tidak pernah kesepian? Karena selalu ditemani dayung! Hihihi.',
  'Tahu kenapa pandai besi selalu tenang? Karena ia sudah biasa menghadapi tekanan… dan palu!',
]

// ------------------------------------------------------------------ jawaban per maksud
function salam(npc, mem, ctx) {
  const s = sebut(npc, mem)
  if (mem.marah > 0) return { teks: 'Hmph. Aku masih kesal padamu.', gerak: 'shake' }
  if (ctx.buron && elf(npc) && npc.kerja !== 'pedagang')
    return { teks: pilih(mem, 'salamBuron', ['Ka-kau… yang membuat rusuh itu! Ja-jangan sakiti aku…', 'Kesatria sedang memburumu, tahu! Cepat pergi sebelum mereka datang.']), gerak: 'shake' }
  if (mem.kali > 1)
    return { teks: pilih(mem, 'salamLagi', [`${s}! Kita bertemu lagi.`, `Wah, ${s}! Senang melihatmu lagi.`, `Kau lagi, ${s}. Ada kabar apa?`]), gerak: elf(npc) && !anak(npc) ? 'bow' : 'wave' }
  const u = sifatUtama(npc)
  if (anak(npc)) return { teks: pilih(mem, 'salamAnak', ['Halo, Kak! Kakak prajurit dari mana? Helmnya keren!', 'Hai, Kak! Kakak bukan elf, ya? Telingamu bulat!']), gerak: 'wave' }
  if (!elf(npc)) {
    if (npc.kerja === 'raja') return { teks: 'Penjaga! Siapa yang membiarkan orang asing ini masuk?!', gerak: 'shake' }
    return {
      teks: pilih(mem, 'salamManusia', [
        'Sugeng rawuh… eh, kamu orang asing, ya? Pelankan suaramu, Kisanak, prajurit sedang berpatroli.',
        'Monggo, Kisanak. Jarang ada orang asing berani masuk Kencana.',
        u === 'ramah' ? 'Halo, Kisanak! Mampir dari mana? Jangan takut, aku tidak akan melapor ke prajurit.' : 'Ada perlu apa, Kisanak? Cepat saja, aku tidak mau dicurigai prajurit.',
      ]),
      gerak: 'wave',
    }
  }
  const byTrait = {
    pemarah: 'Hmph. Ada perlu apa denganku, manusia?',
    riang: 'Halo halo! Selamat datang di Aeloria, pengembara! Hari yang indah, bukan?',
    ramah: 'Salam, pengembara! Senang sekali ada tamu yang mau mengobrol.',
    pemalas: 'Hoahm… oh, halo. Maaf, aku agak mengantuk.',
    petualang: 'Salam, pengembara! Kau datang dari seberang laut? Ceritakan petualanganmu!',
  }
  return { teks: byTrait[u] || pilih(mem, 'salamElf', ['Salam, pengembara. Selamat datang di Aeloria.', `Salam. Aku ${npc.nama}. Ada yang bisa kubantu?`]), gerak: 'bow' }
}

function perkenalan(npc, mem) {
  mem.kenalNama = true
  const tanyaBalik = mem.namaPemain ? '' : elf(npc) ? ' Dan kau, siapa namamu, pengembara?' : ' Kamu sendiri siapa, Kisanak?'
  if (anak(npc)) return { teks: `Namaku ${npc.nama}! Umurku ${npc.umur} tahun.${mem.namaPemain ? '' : ' Nama Kakak siapa?'}`, gerak: 'wave' }
  if (!elf(npc)) return { teks: `Panggil saja aku ${npc.nama}. ${(PEKERJAAN_MANUSIA[npc.kerja] || PEKERJAAN_MANUSIA.warga)(npc)}${tanyaBalik}`, gerak: 'talk' }
  return { teks: `Namaku ${npc.nama}, ${npc.peran.charAt(0).toLowerCase() + npc.peran.slice(1)}.${tanyaBalik}`, gerak: 'bow' }
}

function kabar(npc, mem) {
  const b = npc.butuh
  if (npc.act === 'tidur' || npc.act === 'rebahan') return { teks: 'Zzz… eh? Aku sedang beristirahat. Kabarku baik, cuma mengantuk.', gerak: 'talk' }
  if (b.lapar > 70) return { teks: pilih(mem, 'lapar', ['Jujur saja, perutku keroncongan. Sudah lama aku belum makan.', 'Lapar sekali! Andai ada yang membagi roti…']), gerak: 'talk', tawar: 'beri' }
  if (b.lelah > 70) return { teks: 'Lelah sekali… rasanya ingin rebahan di bawah pohon.', gerak: 'talk' }
  if (b.bosan > 70) return { teks: 'Bosan! Tidak ada yang seru hari ini. Kau punya cerita menarik?', gerak: 'talk' }
  if (b.sepi > 70) return { teks: 'Agak kesepian, sebenarnya. Untung kau mengajakku bicara.', gerak: 'nod' }
  if (npc.suasana === 'gembira') return { teks: 'Gembira sekali! Pesta dan musik selalu membuat hatiku ringan.', gerak: 'cheer' }
  if (!elf(npc)) return { teks: pilih(mem, 'kabarManusia', ['Baik, Kisanak. Panen tahun ini lumayan.', 'Yah, begitulah. Sejak orc sering menyerbu, prajurit makin galak pada orang asing.', 'Sehat, syukurlah. Pasar sedang ramai.']), gerak: 'talk' }
  return { teks: pilih(mem, 'kabarElf', ['Baik-baik saja, terima kasih sudah bertanya.', `Baik! Hari ini aku ${npc.kegiatan.replace(/^sedang /, '')}.`, 'Senang. Angin laut hari ini sejuk.']), gerak: 'nod' }
}

function kegiatan(npc, mem) {
  const kom = KOMENTAR_KEGIATAN[npc.act]
  const t = `Aku ${npc.kegiatan.replace(/^menuju: /, 'sedang menuju ke tempat untuk ')}.`
  return { teks: kom ? `${t} ${pilih(mem, `kom-${npc.act}`, kom)}` : t, gerak: 'talk' }
}

function pekerjaan(npc) {
  const f = elf(npc) ? (npc.kerja === 'kesatria' ? PEKERJAAN_ELF.kesatria : PEKERJAAN_ELF[npc.kerja] || PEKERJAAN_ELF.warga) : PEKERJAAN_MANUSIA[npc.kerja] || PEKERJAAN_MANUSIA.warga
  return { teks: f(npc), gerak: 'talk', tawar: npc.kerja === 'pedagang' && npc.dagangan ? 'kios' : null }
}

function perasaan(npc, mem) {
  const b = npc.butuh
  const top = Object.entries(b).sort((p, q) => q[1] - p[1])[0]
  const kata = { lapar: 'lapar', lelah: 'lelah', bosan: 'bosan', sepi: 'kesepian', latih: 'ingin berlatih pedang' }
  if (top && top[1] > 55) return { teks: `Jujur saja, aku sedang ${kata[top[0]]}. ${top[0] === 'lapar' ? 'Perutku sudah berbunyi dari tadi.' : top[0] === 'latih' ? 'Tanganku gatal ingin memegang pedang.' : 'Semoga cepat berlalu.'}`, gerak: 'talk', tawar: top[0] === 'lapar' ? 'beri' : null }
  return { teks: pilih(mem, 'rasa', [`Suasana hatiku ${npc.suasana}. Terima kasih sudah peduli.`, 'Aku baik-baik saja. Hari ini terasa damai.']), gerak: 'nod' }
}

function umur(npc) {
  if (anak(npc)) return { teks: `Umurku ${npc.umur} tahun! Kata ibu, untuk ukuran elf aku masih bayi. Huh.`, gerak: 'talk' }
  if (elf(npc)) return { teks: `Umurku ${npc.umur} tahun — masih ${npc.umur < 200 ? 'muda' : 'cukup muda'} untuk ukuran elf. Elf bisa hidup lebih dari seribu tahun.`, gerak: 'talk' }
  return { teks: `Umurku ${npc.umur} tahun, Kisanak. ${npc.umur > 50 ? 'Rambutku sudah mulai memutih.' : 'Masih kuat bekerja seharian.'}`, gerak: 'talk' }
}

function keluarga(npc, mem) {
  if (anak(npc)) return { teks: 'Ibuku sedang bekerja di kota. Aku boleh main sampai sore!', gerak: 'talk' }
  if (npc.kerja === 'kesatria') return { teks: pilih(mem, 'kel', ['Keluargaku di kota, tapi pasukanku juga keluargaku.', 'Aku tidur di tenda perkemahan bersama regu. Rumah orang tuaku di Kota Aeloria.']), gerak: 'talk' }
  if (!elf(npc)) return { teks: pilih(mem, 'kelM', ['Anakku tiga, semuanya bandel. Istri di rumah sedang menenun.', 'Rumahku di kampung dekat pasar. Mampir? Eh, jangan — nanti prajurit curiga.']), gerak: 'talk' }
  return { teks: 'Rumahku di Kota Aeloria, dekat pasar. Tetanggaku ramah-ramah.', gerak: 'talk' }
}

function kerajaan(npc, mem, ctx) {
  if (!elf(npc))
    return {
      teks: pilih(mem, 'kerM', [
        'Kerajaan Kencana diperintah Sang Raja dari Keraton di Kotaraja. Prajurit menjaga setiap pulau, dan bala tentara berbaris di Pulau Wira.',
        'Sejak orc sering menyerbu, orang asing dicurigai — termasuk kamu, Kisanak. Prajurit akan menyerangmu kalau melihatmu.',
      ]),
      gerak: 'talk',
    }
  const peringatan = ctx.buron ? ' Dan kau sedang diburu kesatria — tinggalkan Aeloria sampai mereka melupakanmu.' : ''
  return {
    teks: pilih(mem, 'kerE', [
      'Aeloria adalah kerajaan para elf. Raja kami tinggal di Benteng Aeloria di utara — tempat itu terlarang bagi orang luar. Kota dan pasar di selatannya bebas bagi siapa saja yang datang dengan damai.',
      'Sepuluh ribu kesatria menjaga Aeloria dalam lima pasukan: Daun, Bulan, Fajar, Embun, dan Senja. Selama kau tidak membuat rusuh, mereka tidak akan mengganggumu.',
    ]) + peringatan,
    gerak: 'talk',
  }
}

function orc(npc, mem) {
  const u = sifatUtama(npc)
  if (!elf(npc)) return { teks: 'Orc! Mereka datang dengan perahu perang dari Pulau Tropis dan menyerbu gerbang timur. Untung prajurit kami selalu menghadang.', gerak: 'shake' }
  if (anak(npc)) return { teks: 'Orc itu besar dan bau! Tapi Kakak berani, kan? Kakak pernah mengalahkan orc?', gerak: 'talk' }
  if (u === 'pemberani' || npc.kerja === 'kesatria') return { teks: pilih(mem, 'orcB', ['Biar saja mereka datang! Pedangku sudah lama menunggu lawan yang sepadan.', 'Orc berkemah di Pulau Tropis, di selatan. Kalahkan mereka dan kau dapat koin — mereka selalu membawa harta jarahan.']), gerak: 'talk' }
  return { teks: 'Orc berkemah di Pulau Tropis, di selatan sana. Syukurlah tidak ada jembatan lagi — mereka harus berperahu kalau mau menyerbu.', gerak: 'shake' }
}

function laut(npc, mem, ctx) {
  const tips = ctx.punyaPerahu
    ? 'Kau sudah punya perahu, bukan? Arahkan saja dengan joystick, dan turun di dermaga atau pantai.'
    : `Perahu bisa kau buat sendiri: kumpulkan sepuluh kayu dengan memukul batang pohon, lalu buat di tepi pantai lewat Tas.${ctx.kayu ? ` Kau sudah punya ${ctx.kayu} kayu.` : ''}`
  const awal = elf(npc)
    ? 'Tidak ada lagi jembatan antara Aeloria, Pulau Tropis, dan Kencana. Untuk menyeberang kau harus berenang atau berlayar.'
    : 'Jembatan Agung sudah lama dibongkar. Orang menyeberang dengan perahu ke Dermaga Timur — atau berenang, kalau kuat.'
  return { teks: `${awal} ${tips}`, gerak: 'talk' }
}

function ikan(npc, mem, ctx) {
  const pancing = ctx.punyaPancing ? '' : ' Pancing bisa kau buat dari tiga kayu (lewat Tas).'
  if (npc.kerja === 'nelayan' || npc.act === 'mancing')
    return { teks: `Kakap merah suka di dekat pantai berbatu, tongkol dan kerapu di air yang lebih dalam, dan ikan layaran hanya di laut dalam — pancinglah dari perahu.${pancing}`, gerak: 'talk' }
  return { teks: `Memancinglah di tepi pantai atau dermaga, menghadap laut. Makin dalam airnya, makin besar ikannya. Kios Ikan Bakar di Pasar Aeloria mau membeli ikanmu.${pancing}`, gerak: 'talk' }
}

function kayu(npc) {
  return { teks: `Pohon di Pulau Tropis banyak sekali. Pukul batangnya dengan pedangmu — tiap pohon memberi beberapa potong kayu, lalu tumbuh lagi setelah beberapa menit.${elf(npc) ? ' Tapi jangan tebang pohon perak kami, ya!' : ''}`, gerak: 'talk' }
}

function senjata(npc, mem) {
  if (!elf(npc)) return { teks: 'Senjata kerajaan hanya untuk prajurit, Kisanak. Kalau butuh senjata, coba ke Tempa Aeloria di utara — elf mau berdagang dengan siapa saja.', gerak: 'talk' }
  if (npc.kerja === 'pandai') return { teks: 'Pedang Perak Elf paling tajam, Tombak Elf menjangkau paling jauh, Zirah Perak paling kuat menahan pukulan. Semua ada di Tempa Aeloria, di timur kota.', gerak: 'talk' }
  return { teks: pilih(mem, 'senj', ['Tempa Aeloria di timur kota menjual pedang perak, tombak elf, perisai, dan zirah. Pandai besinya menempa sepanjang hari, jadi stoknya bertambah terus.', 'Tombak menjangkau lebih jauh, pedang perak lebih tajam. Pilih sesuai gayamu bertarung.']), gerak: 'talk' }
}

function makanan(npc, mem, ctx) {
  const lapar = npc.butuh.lapar > 60
  const t = elf(npc)
    ? 'Balai Makan memberi makan para kesatria. Kalau kau lapar, beli roti, sate rusa, atau ikan bakar di Pasar Aeloria.'
    : 'Warung di pasar Kotaraja menjual nasi dan sate, tapi… mereka tidak akan melayani orang asing.'
  return { teks: lapar ? `${t} Bicara soal makanan… aku lapar sekali.` : t, gerak: 'talk', tawar: lapar && ctx.makanan.length ? 'beri' : null }
}

function belanja(npc, mem, ctx) {
  if (npc.kerja === 'pedagang' && npc.dagangan) return { teks: `Tentu! Aku berjualan di ${npc.dagangan}. Lihat saja daganganku.`, gerak: 'nod', tawar: 'kios' }
  if (!elf(npc)) return { teks: 'Pasar Kotaraja ada di dekat gerbang timur, tapi pedagang dilarang melayani orang asing. Coba ke Aeloria di utara — mereka berdagang dengan siapa saja.', gerak: 'talk' }
  return { teks: `Pasar Aeloria punya kios roti, buah, daging, minuman, sayur, ikan bakar, keju, dan ramuan. Tempa Aeloria menjual perlengkapan. ${ctx.koin < 10 ? 'Koinmu tinggal sedikit — kalahkan orc atau jual ikan untuk menambahnya.' : 'Pedagang tidak peduli kau buronan atau bukan, asal membayar.'}`, gerak: 'talk' }
}

function musik(npc, mem, ctx) {
  if (!elf(npc)) return { teks: 'Gamelan di Keraton berbunyi setiap malam purnama. Merdu sekali, Kisanak.', gerak: 'talk' }
  if (ctx.pesta) return { teks: 'Sekarang sedang ada pesta di Padang Pesta! Musik, tarian, api unggun — ayo ke sana!', gerak: 'cheer' }
  return { teks: 'Pemusik kami bermain kecapi di Padang Pesta. Kalau ada pesta, semua orang menari mengelilingi api unggun!', gerak: 'cheer' }
}

function cerita(npc, mem) {
  const daftar = elf(npc) ? CERITA_ELF : CERITA_MANUSIA
  return { teks: pilih(mem, 'cerita', daftar), gerak: 'talk', tawar: 'cerita' }
}

function lelucon(npc, mem) {
  if (sifatUtama(npc) === 'pemarah') return { teks: 'Aku tidak suka bercanda. …Baiklah, satu saja. ' + pilih(mem, 'lucu', LELUCON), gerak: 'talk' }
  return { teks: pilih(mem, 'lucu', LELUCON), gerak: 'cheer' }
}

function nasihat(npc, mem, ctx) {
  const tips = []
  if (ctx.hp < 50) tips.push('Kau terluka. Makan sesuatu atau minum ramuan penyembuh dari Tas.')
  if (ctx.buron && elf(npc)) tips.push('Tinggalkan Aeloria sebentar sampai kesatria melupakanmu — mereka tidak bisa berenang.')
  if (!elf(npc)) tips.push('Jangan berlama-lama di wilayah Kencana — prajurit menyerang orang asing. Kalau dikejar, lari ke laut: prajurit tidak berenang.')
  if (!ctx.punyaPancing) tips.push('Buat pancing dari tiga kayu, lalu memancing di tepi air. Ikan bisa dimakan atau dijual.')
  if (!ctx.punyaPerahu) tips.push('Buat perahu dari sepuluh kayu di tepi pantai — menyeberang jadi jauh lebih cepat.')
  if (ctx.koin < 20) tips.push('Kalahkan orc untuk mendapat koin, atau jual ikan ke Kios Ikan Bakar.')
  tips.push('Jangan masuk Benteng Aeloria tanpa izin — penjaganya menyerang siapa pun.')
  tips.push('Memukul elf sama dengan membuat rusuh: semua kesatria akan memburumu.')
  return { teks: pilih(mem, 'saran', tips), gerak: 'talk' }
}

function tentangPemain(npc, mem, ctx) {
  if (ctx.buron && elf(npc)) return { teks: 'Kau buronan Aeloria! Semua orang membicarakan keributan yang kau buat.', gerak: 'shake' }
  if (!elf(npc)) return { teks: 'Kamu prajurit asing berhelm jambul merah. Prajurit Kencana memburu orang sepertimu… tapi menurutku kamu tidak terlihat jahat.', gerak: 'talk' }
  if (mem.suka >= 3) return { teks: `Kau ${mem.namaPemain || 'sahabatku'}, pengembara pemberani yang suka menolong. Aeloria beruntung kau datang.`, gerak: 'nod' }
  return { teks: 'Kau pengembara berhelm jambul merah dari seberang laut. Jarang ada manusia seberani dirimu menjelajah sendirian.', gerak: 'talk' }
}

function cuaca(npc) {
  return { teks: elf(npc) ? 'Langit Aeloria hampir selalu cerah. Angin laut dari selatan membawa bau garam.' : 'Panas terik, Kisanak. Untung angin laut sejuk. Musim hujan masih lama.', gerak: 'talk' }
}

function tempatJawab(npc, mem, ctx, t) {
  if (!t) {
    const dekat = ctx.tempat.slice().sort((a, b) => Math.hypot(a.x - npc.x, a.z - npc.z) - Math.hypot(b.x - npc.x, b.z - npc.z)).slice(0, 3).map(p => p.nama)
    return { teks: `Tempat mana yang kau cari? Yang dekat dari sini: ${dekat.join(', ')}.`, gerak: 'talk' }
  }
  const d = Math.hypot(t.x - npc.x, t.z - npc.z)
  if (d < 25) return { teks: `${t.nama}? Di sini tempatnya!${t.ket ? ` ${t.ket}` : ''}`, gerak: 'nod' }
  const laut = ctx.seberang?.(npc.x, npc.z, t.x, t.z)
  return {
    teks: `${t.nama} ada di ${arah(npc.x, npc.z, t.x, t.z)} dari sini, ${jarakTeks(d)}.${laut ? ' Kau harus menyeberang laut — berenang atau naik perahu.' : ''}${t.ket ? ` ${t.ket}` : ''}`,
    gerak: 'talk',
  }
}

function beri(npc, mem, ctx) {
  if (!ctx.makanan.length) return { teks: 'Kau tidak membawa makanan apa pun. Tapi niat baikmu kuterima!', gerak: 'nod' }
  return { teks: 'Kau mau memberiku makanan? Wah…', gerak: 'talk', tawar: 'beri' }
}

function lain(npc, mem) {
  const u = sifatUtama(npc)
  if (anak(npc)) return { teks: 'Hah? Aku nggak ngerti, Kak! Tanya yang lain, dong — misalnya soal orc!', gerak: 'shake' }
  const byTrait = {
    pemarah: 'Bicara yang jelas! Aku tidak punya waktu untuk teka-teki.',
    pemalas: 'Hah? Ulangi lagi, aku setengah mengantuk tadi.',
    riang: 'Hihi, aku tidak paham, tapi kedengarannya seru!',
  }
  return { teks: byTrait[u] || pilih(mem, 'lain', ['Hmm, aku kurang paham maksudmu. Tanyakan saja soal tempat, kerajaan, orc, perahu, atau ikan.', 'Maaf, aku tidak mengerti. Coba tanyakan dengan cara lain.']), gerak: 'shake' }
}

// ------------------------------------------------------------------ jawab
// masukan: { teks } (kalimat bebas) atau { topik } (id dari TOPIK). Hasil: { teks, gerak, selesai?,
// tawar? ('beri' = tawarkan memberi makanan, 'kios' = buka kios, 'cerita' = minta cerita lagi) }
export function jawab(npc, mem, ctx, masukan) {
  const k = masukan.topik ? { niat: masukan.topik, tempat: masukan.tempat || null } : kenali(masukan.teks || '', ctx.tempat)
  const { niat } = k
  mem.topik.add(niat)
  // NPC yang masih kesal hanya mau menerima maaf
  if (mem.marah > 0 && niat !== 'maaf' && niat !== 'pamit') {
    mem.marah--
    return { teks: pilih(mem, 'kesal', ['Aku tidak mau bicara denganmu.', 'Pergi sana!', 'Minta maaf dulu, baru kita bicara.']), gerak: 'shake', selesai: mem.marah <= 0 ? false : mem.suka < -4 }
  }
  // "ya" / "tidak" menjawab tawaran sebelumnya
  if ((niat === 'ya' || niat === 'tidak') && mem.tawar) {
    const tw = mem.tawar
    mem.tawar = null
    if (niat === 'ya' && tw === 'cerita') return cerita(npc, mem)
    if (niat === 'ya' && tw === 'nama') return perkenalan(npc, mem)
    if (niat === 'tidak') return { teks: 'Baiklah, tidak apa-apa.', gerak: 'nod' }
  }
  let r
  switch (niat) {
    case 'salam': r = salam(npc, mem, { ...ctx }); break
    case 'pamit':
      r = { teks: elf(npc) ? `Sampai jumpa, ${sebut(npc, mem)}! Semoga anginmu selalu baik.` : `Hati-hati di jalan, ${sebut(npc, mem)}. Jangan sampai ketahuan prajurit!`, gerak: 'wave', selesai: true }
      break
    case 'namaku':
      mem.namaPemain = k.namaPemain
      mem.suka += 1
      r = { teks: `Senang berkenalan, ${k.namaPemain}!${mem.kenalNama ? '' : ` Namaku ${npc.nama}.`}`, gerak: elf(npc) && !anak(npc) ? 'bow' : 'wave' }
      mem.kenalNama = true
      break
    case 'nama': r = perkenalan(npc, mem); break
    case 'kabar': r = kabar(npc, mem); break
    case 'kegiatan': r = kegiatan(npc, mem); break
    case 'pekerjaan': r = pekerjaan(npc); break
    case 'perasaan': r = perasaan(npc, mem); break
    case 'umur': r = umur(npc); break
    case 'keluarga': r = keluarga(npc, mem); break
    case 'kerajaan': r = kerajaan(npc, mem, ctx); break
    case 'orc': r = orc(npc, mem); break
    case 'laut': r = laut(npc, mem, ctx); break
    case 'ikan': r = ikan(npc, mem, ctx); break
    case 'kayu': r = kayu(npc); break
    case 'senjata': r = senjata(npc, mem); break
    case 'makanan': r = makanan(npc, mem, ctx); break
    case 'belanja': r = belanja(npc, mem, ctx); break
    case 'musik': r = musik(npc, mem, ctx); break
    case 'cerita': r = cerita(npc, mem); break
    case 'lelucon': r = lelucon(npc, mem); break
    case 'nasihat': r = nasihat(npc, mem, ctx); break
    case 'pemain': r = tentangPemain(npc, mem, ctx); break
    case 'cuaca': r = cuaca(npc); break
    case 'tempat': r = tempatJawab(npc, mem, ctx, k.tempat); break
    case 'beri': r = beri(npc, mem, ctx); break
    case 'terimakasih':
      mem.suka += 0.5
      r = { teks: pilih(mem, 'trims', ['Sama-sama!', 'Dengan senang hati.', elf(npc) ? 'Tidak perlu berterima kasih, sahabat.' : 'Sama-sama, Kisanak.']), gerak: 'nod' }
      break
    case 'pujian':
      mem.suka += 1
      r = sifatUtama(npc) === 'pemarah'
        ? { teks: 'Hmph… terima kasih. Jangan berharap aku ikut memujimu.', gerak: 'nod' }
        : { teks: pilih(mem, 'puji', ['Ah, kau bisa saja. Pipiku jadi merah.', 'Terima kasih! Kau juga hebat, berani menjelajah sendirian.', 'Hihi, aku jadi malu.']), gerak: 'cheer' }
      break
    case 'hinaan':
      mem.suka -= 2
      if (mem.suka <= -3) {
        mem.marah = 3
        r = { teks: elf(npc) ? 'Cukup! Aku tidak mau bicara denganmu lagi, manusia kasar.' : 'Kurang ajar! Pergi sana, sebelum kupanggil prajurit!', gerak: 'shake', selesai: true }
      } else r = { teks: sifatUtama(npc) === 'pemarah' ? 'Jaga mulutmu, atau kau akan menyesal!' : 'Kenapa kau berkata begitu? Itu menyakitkan.', gerak: 'shake' }
      break
    case 'maaf':
      if (mem.suka < 0 || mem.marah > 0) {
        mem.suka = Math.max(mem.suka, 0)
        mem.marah = 0
        r = { teks: 'Baiklah, kumaafkan. Jangan diulangi, ya.', gerak: 'nod' }
      } else r = { teks: 'Minta maaf untuk apa? Kau tidak berbuat salah.', gerak: 'shake' }
      break
    case 'kenapa':
      r = { teks: pilih(mem, 'knp', ['Kenapa? Hmm… begitulah adanya sejak dulu.', 'Pertanyaan bagus. Aku sendiri kadang bertanya-tanya.', 'Entahlah. Mungkin tanyakan pada orang yang lebih tua.']), gerak: 'talk' }
      break
    case 'ya': r = { teks: pilih(mem, 'ya', ['Baiklah!', 'Hmm, begitu ya.', 'Oke, oke.']), gerak: 'nod' }; break
    case 'tidak': r = { teks: pilih(mem, 'tidak', ['Hmm, baiklah kalau begitu.', 'Tidak apa-apa.']), gerak: 'shake' }; break
    case 'tanya': r = lain(npc, mem); break
    default: r = lain(npc, mem)
  }
  mem.tawar = r.tawar === 'cerita' ? 'cerita' : r.teks.includes('siapa namamu') || r.teks.includes('siapa?') ? null : mem.tawar
  return r
}

// sapaan pembuka saat obrolan dimulai
export function sapaan(npc, mem, ctx) {
  mem.kali++
  return salam(npc, mem, ctx)
}

// beri makanan: { teks, gerak, koin } — NPC lapar menerima dengan senang hati (+koin hadiah),
// yang kenyang menolak halus (kecuali yang rakus)
export function terimaMakanan(npc, mem, namaMakanan, rand = ACAK) {
  const { lapar } = npc.butuh
  if (lapar < 35 && sifatUtama(npc) !== 'rakus') return { teks: `Terima kasih, tapi aku masih kenyang. Simpan saja ${namaMakanan.toLowerCase()}-mu untuk perjalanan.`, gerak: 'shake', diterima: false }
  mem.suka += 2
  mem.diberi++
  const koin = lapar > 60 ? 4 + Math.floor(rand() * 6) : 2 + Math.floor(rand() * 3)
  const teks = elf(npc)
    ? `${namaMakanan}! Kau baik sekali, ${sebut(npc, mem)}. Terimalah ${koin} koin ini sebagai tanda terima kasih.`
    : `Wah, ${namaMakanan.toLowerCase()}! Matur nuwun, Kisanak — kamu tidak seburuk kata prajurit. Ini ${koin} koin untukmu.`
  return { teks, gerak: 'cheer', diterima: true, koin }
}

// topik siap pilih (tombol di panel obrolan); tempat → "Di mana pasar?" dll. dibuat ui/obrolan.js
export const TOPIK = [
  { id: 'nama', teks: 'Siapa namamu?' },
  { id: 'kabar', teks: 'Apa kabar?' },
  { id: 'kegiatan', teks: 'Sedang apa?' },
  { id: 'pekerjaan', teks: 'Apa pekerjaanmu?' },
  { id: 'kerajaan', teks: 'Ceritakan kerajaanmu' },
  { id: 'orc', teks: 'Bagaimana dengan orc?' },
  { id: 'laut', teks: 'Bagaimana menyeberang?' },
  { id: 'ikan', teks: 'Di mana ada ikan?' },
  { id: 'cerita', teks: 'Ceritakan sesuatu' },
  { id: 'lelucon', teks: 'Punya lelucon?' },
  { id: 'nasihat', teks: 'Ada saran untukku?' },
]
