# TESTING — Pulau Tropis

## Membuka game di HP Android (tanpa instalasi apa pun)
Hasil build (`pulau-tropis/dist/`) ikut di-commit, jadi bisa dibuka langsung dari GitHub
melalui layanan raw.githack (menyajikan file repo sebagai halaman web):

```
https://raw.githack.com/Penguin116677/threejs-games.github.io/<COMMIT>/pulau-tropis/dist/index.html
```

`<COMMIT>` = hash commit terbaru di branch pengembangan (ditulis di laporan setiap iterasi).
Hash commit dipakai karena nama branch mengandung `/` yang membingungkan githack.

Jika GitHub Pages diaktifkan di repo (Settings → Pages → branch `master`) dan perubahan sudah
di-merge ke `master`, alamatnya:
`https://penguin116677.github.io/threejs-games.github.io/pulau-tropis/dist/`

## Menjalankan di komputer
```bash
cd pulau-tropis
npm install
npm run dev        # server pengembangan (--host: bisa dibuka dari HP di Wi-Fi yang sama)
npm run build      # build ke dist/ — WAJIB dijalankan & di-commit setelah mengubah src/
npm run preview    # menyajikan dist/ di http://localhost:4173
npm run test:smoke # (dengan preview berjalan) tes otomatis + screenshot ke screenshots/
```
Smoke test butuh Chromium untuk Playwright. FPS yang dilaporkan smoke test berasal dari render
software dan **tidak** mencerminkan performa HP. Untuk menjalankan sebagian kasus saja:
`SMOKE_CASES=hp-portrait,desktop npm run test:smoke` (kasus: hp-portrait, hp-landscape, hp-rendah,
desktop). Satu putaran penuh ±1,5 jam di render software (v0.15.0: HP tegak ±35 menit, mendatar ±9,
Rendah ±5, komputer ±35; v0.14.0 sebelum pixel art: 2–2,5 jam — beri batas waktu luar yang cukup), batas
waktu tiap langkah 90 detik.

Penduduk kerajaan (`public/models/penduduk.glb`) dibuat ulang dari paket Kenney "Mini Characters"
dengan `python3 scripts/pack-penduduk.py "<folder GLB format>" public/models/penduduk.glb`.

## Kualitas grafis
- Di game: ikon **Pengaturan** (roda gigi, kanan atas) → Kualitas grafis → Rendah / Sedang / Tinggi.
  Pilihan disimpan (sampai v0.15.0 lewat tombol Kualitas).
- Lewat alamat: `?kualitas=rendah|sedang|tinggi` (atau `#kualitas=…`).
- Default: HP → Sedang, komputer → Tinggi.

## Daftar uji manual — Milestone 1 (di HP)
1. Buka URL → layar "Memuat pulau…" muncul lalu pulau tampil (tidak ada layar merah error).
2. Pulau terlihat: pantai pasir, air toska di tepi, laut biru, gunung, langit biru.
3. Geser 1 jari → kamera berputar mengelilingi pulau.
4. Cubit 2 jari → zoom masuk/keluar. Geser 2 jari → kamera bergeser.
5. Kamera tidak bisa menembus tanah atau masuk ke bawah laut.
6. Putar HP (portrait ↔ landscape) → tampilan menyesuaikan tanpa terpotong/meregang.
7. Tombol "Layar penuh" → masuk/keluar layar penuh. *(Dihapus v0.15.1: di HP layar penuh otomatis saat
   layar pertama kali disentuh.)*
8. Catat angka FPS di pojok kiri atas (idealnya ≥ 30).
9. Laut beranimasi (ombak bergerak, buih di pantai).
10. Ada pohon kelapa di pantai dan hutan di pedalaman; zoom dekat → pohon bergoyang pelan.
11. Bandingkan FPS sebelum/sesudah pohon ditambahkan (laporkan bila turun jauh).

## Daftar uji manual — v0.3.0 (rumput + kualitas)
1. Zoom ke lereng gunung (cubit 2 jari) sampai dekat → padang rumput ilalang terlihat dan bergoyang.
   Rumput paling rapat di lereng barat gunung (di atas hutan, di bawah puncak batu).
2. Putar kamera di dekat rumput → rumput tetap mengikuti, tidak ada yang tiba-tiba muncul/hilang
   (rumput boleh "tumbuh" halus ±1 detik setelah zoom cepat).
3. Pohon membayangi tanah (Sedang/Tinggi); ada awan bergerak; air dangkal punya kilau cahaya.
4. Ketuk **Kualitas** (sejak v0.15.1: **Pengaturan** → Kualitas grafis) → pilih Rendah, lalu Tinggi →
   game dimuat ulang dan pilihan yang aktif berubah.
   Catat FPS di tiap tingkat.
5. Bila muncul saran "Terasa berat?", coba Kualitas Rendah dan bandingkan FPS.

## Daftar uji manual — v0.4.0 (kelapa, air, ombak)
1. Zoom ke pohon kelapa di pantai → di bawah pelepah ada tandan buah (hijau, kuning, coklat).
2. Zoom ke pantai mana saja → ombak datang menuju pantai, pecah jadi buih putih, air naik ke pasir
   lalu surut; pasir yang baru terkena ombak tampak lebih gelap (Sedang/Tinggi).
3. Lihat laut dari dekat → riak bergerak, pantulan langit/awan, kilau matahari; dari jauh tidak ada
   pola cincin/garis-garis aneh.
4. Bandingkan FPS dengan versi sebelumnya di tingkat kualitas yang sama.

## Daftar uji manual — Milestone 2 (karakter & fisika)
(Kontrol joystick & kamera orang ketiga diganti di v0.6.0 — lihat daftar berikutnya.)
1. Setelah loading, prajurit berdiri di pantai barat daya, kamera di belakangnya menghadap gunung.
2. Ketuk tombol **Lompat** → prajurit melompat; bisa lompat sambil berlari.
3. Jalan ke laut dalam (lewat keyboard di komputer) → layar meredup, kembali ke pantai dengan pesan.
4. Daki lereng gunung → bisa naik; di bagian sangat curam prajurit tertahan/merosot.
5. Tombol **Lihat pulau** → kamera bebas (geser/cubit seperti dulu); **Main lagi** → kembali.
   *(Tombolnya dihapus v0.15.1 — ada Peta; untuk pengujian: `__pulau.setMode('lihat')` / `('main')`.)*

## Daftar uji manual — v0.6.0 (kamera strategi + ketuk untuk berjalan)
> Diganti v0.14.0: kontrol kembali ke joystick + kamera di belakang karakter; ketuk tanah tidak lagi
> berjalan (lihat daftar v0.14.0 di bawah).

1. Kamera melihat prajurit dari atas (seperti game strategi).
2. **Ketuk tanah** di dekat prajurit → cincin kuning muncul di titik itu, prajurit berjalan ke sana
   lalu berhenti tepat di cincin. Ketuk jauh → prajurit berlari, melambat menjelang tujuan.
3. Ketuk di balik pohon/batu besar → prajurit berjalan memutar, tidak menabrak/tersangkut.
4. Ketuk tempat lain saat prajurit masih berjalan → langsung berganti tujuan.
5. Ketuk laut yang jauh → prajurit berhenti di air dangkal (tidak tenggelam / tidak kembali ke pantai).
6. Di lereng gunung (zoom keluar dulu), ketuk bagian lereng yang lebih tinggi → prajurit mendaki;
   bila lereng terlalu curam ia mengambil jalur berkelok.
7. **Geser satu jari** → kamera berputar, prajurit **tidak** ikut berjalan. **Cubit** → zoom.
8. Masuk ke hutan lebat → tajuk pohon di depan kamera berlubang (pola titik), prajurit tetap terlihat.
9. Ketuk tombol **Lompat** saat berjalan → prajurit melompat dan tetap melanjutkan jalannya.
10. Putar HP portrait ↔ landscape → tampilan & tombol tetap pas; ketukan tetap tepat sasaran.
11. Komputer: klik kiri tanah = jalan, seret / klik kanan = putar kamera, roda = zoom,
    Spasi = lompat, WASD/panah juga bisa.

## Daftar uji manual — v0.7.0 (tombol Pukul)
1. Tidak ada lagi lingkaran hijau di bawah prajurit.
2. Di kanan bawah ada dua tombol: **Pukul** (ikon pedang) dan **Lompat**.
3. Ketuk **Pukul** → prajurit mengayunkan pedang, muncul busur putih di depannya.
4. Ketuk **Pukul** berkali-kali dengan cepat → prajurit mengayun berulang tanpa macet.
5. Ketuk tanah agar prajurit berjalan, lalu ketuk **Pukul** → prajurit berhenti dan memukul.
6. Jalan ke dekat batang pohon (ketuk tanah di depan batang), lalu **Pukul** → serpihan kayu dan
   daun berhamburan. Di dekat batu besar → debu & percikan.
7. Komputer: tombol **F** = pukul.

## Daftar uji manual — v0.8.0 (kombo & jurus)
1. Tombol: **Pukul** besar di pojok kanan bawah; Putar, Serbu, Hentak (biru), dan Lompat di sekitarnya.
   Putar HP ke mendatar → tombol-tombol itu sebaris di kiri Pukul, tidak menutupi tombol lain.
2. Ketuk **Pukul** berulang-ulang → tebasan pedang, tinju, tendangan, lalu tebasan lagi.
3. **Putar** di dekat pohon-pohon → prajurit berputar, serpihan dari batang di sekelilingnya. Tombol
   Putar lalu gelap dengan hitungan mundur 4 → 1; selama itu menekannya tidak berbuat apa-apa.
4. Hadapkan prajurit ke pohon ±3 m di depannya (ketuk tanah di depan pohon dari jauh), lalu **Serbu**
   → prajurit melesat, berhenti tepat di depan batang, dan menebasnya.
5. **Hentak** → prajurit melompat ke depan lalu menghantam tanah: cincin gelombang kejut, debu, layar
   sedikit berguncang.
6. Ketuk Serbu di tepi pantai menghadap laut → prajurit berhenti sebelum air dalam.
7. Komputer: F = pukul (kombo), 1/2/3 (atau Q/E/R) = Putar / Serbu / Hentak.

## Daftar uji manual — v0.9.0 (musuh orc & 4 jurus)
1. Dari titik mulai, sekelompok orc hijau terlihat ±16 m di depan (zoom keluar bila belum terlihat).
2. Dekati orc lalu **Pukul** → orc berkedip putih, terpental, bar nyawa merah muncul di atas kepalanya.
3. **Cincang** di depan orc → 10 cincangan cepat; orc roboh lalu tenggelam ke tanah.
4. **Hentak** di tengah kelompok → prajurit melompat, pedang menghadap ke bawah, menancap ke tanah:
   retakan, gelombang kejut, orc di sekitar terpental, layar berguncang.
5. **Putar** di tengah kelompok → 3 cincangan lalu berputar sekali; orc di sekeliling terluka.
6. **Penggal** dari ±7 m → tanda bidik merah di 5 orc, prajurit melesat melewati semuanya, lalu
   kelima kepala terlepas bersamaan. Jauh dari orc → pesan "Tidak ada musuh dalam jangkauan".
7. Tunggu ±20 detik → orc yang roboh muncul lagi di perkemahannya.
8. Komputer: 1 / 2 / 3 / 4 (atau Q / E / R / T) = Cincang / Hentak / Putar / Penggal.

## Daftar uji manual — v0.10.0 (Kepulauan Kencana, kerajaan di barat)
> Sejak v0.14.0 Jembatan Agung tidak ada: menyeberang ke Kencana dengan berenang atau perahu dari
> Dermaga Barat ke Dermaga Timur. Jembatan di dalam kerajaan (Sawah, Nelayan, Pura, Wira) tetap ada.

1. Ketuk **Peta** (komputer: M) → peta dunia: Pulau Tropis di kanan, Kepulauan Kencana di kiri,
   panah kuning = posisi & arah prajurit, titik merah = perkemahan orc. Tutup lewat **Tutup** atau
   ketuk di luar peta.
2. Dari titik mulai berjalan ke pantai barat Pulau Tropis (sedikit ke utara) → gapura candi bentar
   dan **Jembatan Agung**. Seberangi jembatan (ketuk lantai jembatan) → prajurit berjalan di atas
   lantai, tidak jatuh ke laut; lampu & langkan bata di kedua sisi.
3. Masuk **gerbang timur** kota → spanduk "Kotaraja Kencana" muncul sebentar; penjaga bertombak
   berdiri di kiri-kanan gerbang dan menoleh ke prajurit.
4. Jalan-jalan di kota: rumah beratap genteng/joglo/jerami di setiap blok, penduduk berjalan di
   jalan, pasar ramai (lapak warna-warni, pedagang), alun-alun dengan dua beringin berpagar.
   Dekati penduduk → mereka berhenti, menoleh, dan melambai. Prajurit tidak bisa menembus rumah,
   tembok, maupun penduduk.
5. Ke barat lewat alun-alun → gerbang **Keraton** (spanduk "Keraton Kencana") → naik tangga
   **Pendopo Agung**: raja bermahkota duduk di singgasana diapit dua penjaga. Di bawah atap pendopo
   atap dibuat tembus pandang lebih lebar supaya prajurit tetap terlihat.
6. Keluar lewat gerbang selatan → **pelabuhan**: dermaga bisa dinaiki, perahu & kapal jong mengapung.
7. Kunjungi pulau lain lewat jembatan kayu: **Pulau Sawah** (utara, sawah & lumbung), **Pulau Nelayan**
   (barat daya, rumah panggung & perahu di pasir), **Pura Segara** (barat, meru di puncak bukit).
8. Catat FPS di kota (paling ramai) dan di Pulau Tropis untuk tiap tingkat kualitas.

## Daftar uji manual — v0.11.0 (bala tentara 25.000 prajurit di Pulau Wira)
1. Buka **Peta**: **Pulau Wira** ada di selatan Pulau Kencana. Barisan tampak sebagai pita warna:
   merah (perisai), biru (tombak), hijau (pedang), kuning (pemanah), putih (kavaleri, di kedua sisi).
2. Pergi ke pelabuhan Pulau Kencana (gerbang selatan kota → jalan ke selatan). Dari ujung timur
   dermaga, seberangi **Jembatan Wira** (±85 m) → spanduk "Pulau Wira".
3. Ikuti jalan ke timur di depan barisan. Spanduk "Tegal Wira" muncul. Naik tangga **Siti Hinggil**
   (panggung beratap di utara jalan) untuk melihat seluruh barisan dari atas.
4. Berjalan menyusuri garis depan: dinding perisai merah. Senapati berkuda putih dengan panji ungu
   berdiri di depan tiap pasukan.
   - Zoom dekat: prajurit di dekatmu bernapas pelan dan memegang senjatanya.
   - Zoom jauh / Lihat pulau: ribuan prajurit tetap tampak rapi sampai ke belakang.
   - Di dalam lorong, zoom perlahan dari paling dekat sampai paling jauh: barisan di sekitarmu
     tidak boleh bolong (petak rumput dengan bayangan bulat tanpa prajurit) di zoom mana pun.
5. Masuk **lorong** (4 m) di antara kelompok barisan dan **celah** (6 m) di antara pasukan. Coba
   berjalan menembus barisan → tertahan.
6. Putar kamera mengelilingi barisan. Prajurit yang jauh berganti "potret" saat arah kamera berubah.
   Laporkan bila lompatan atau pita terang-gelapnya terasa mengganggu.
7. Kunjungi perkemahan: deretan tenda (barat) dan kandang kuda (timur).
8. Catat:
   - FPS di depan barisan, di dalam lorong, dan saat zoom jauh, untuk tiap tingkat kualitas;
   - lama memuat (layar "Membariskan 25.000 prajurit…").

Model kuda & perisai (`public/models/bala.glb`) dibuat ulang dari aset Kenney dengan
`python3 scripts/pack-bala.py "<folder Kenney 3D assets>" public/models/prajurit.glb public/models/bala.glb`.

Laporkan: model HP, angka FPS di tiap tingkat kualitas, screenshot, dan langkah yang gagal.

## Daftar uji manual — v0.12.1 (penjagaan Kerajaan Kencana; pemain musuh setiap kerajaan)
> Sejak v0.14.0: penjaga yang dulu di kepala Jembatan Agung kini menjaga Dermaga Timur; kalah → bangun
> di pantai barat Pulau Tropis (dekat Dermaga Barat); orc menyerbu dengan perahu perang; pendatang
> turun dari kapal penyeberangan di Dermaga Timur.

Tokoh utama bukan rakyat kerajaan mana pun, jadi prajurit Kencana tidak menanyainya: mereka langsung
menghadang dan menyerang (sejak v0.12.1; kartu tanya-jawab v0.12.0 sudah dihapus).
1. Dari titik mulai, berjalan ke Jembatan Agung. Di kepala jembatan timur, dua penjaga berseru
   ("Musuh kerajaan! Serang!", "Berhenti! Siapa kamu?! …") lalu menyerang. Muncul pesan "Kamu musuh
   Kerajaan Kencana!…", bar nyawa turun, dan tepi layar berkedip merah. Tidak ada kartu pertanyaan.
2. Terus berjalan ke barat: penjaga kepala jembatan berhenti mengejar setelah ±35 m, peronda jembatan
   meneruskan. Lewat tengah jembatan, prajurit di depan berlari memotong jalanmu (bukan membuntuti).
3. Lawan balik dengan Pukul / jurus: prajurit berkedip, terpental, bar nyawa jingga, lalu roboh.
   Paling banyak 3 yang menyerang bersamaan; yang roboh digantikan prajurit lain di dekatmu.
4. Penggal di dekat beberapa prajurit: mereka roboh (tidak dipenggal), kawan-kawannya membalas.
5. Biarkan nyawa habis → roboh, layar meredup, bangun di pantai ujung timur Jembatan Agung dengan
   nyawa penuh. Penjaga kepala jembatan tidak langsung menyerang lagi (masa tenang ±30 detik).
6. Masuk lagi → langsung diserang lagi. Lalu lari ke timur keluar wilayah: pengejar menyerah, dan
   ±6 detik setelah tidak ada pengejar di dekatmu muncul "Prajurit Kencana berhenti mengejarmu."
7. Jelajahi kota, keraton, pelabuhan, Pulau Sawah/Nelayan/Pura, dan Pulau Wira sambil bertarung:
   di tiap wilayah ada pasangan peronda (tombak + pedang-perisai) yang berjalan dan ikut menyerang.
8. Tunggu ±2–3,5 menit di dekat kepala Jembatan Agung → tiga orc menyerbu menyeberangi jembatan
   (pesan "Gerombolan orc menyerbu…"), prajurit menghadang dan bertarung. Orc yang kamu pukul
   balik menyerangmu.
9. Di kepala barat Jembatan Agung, sesekali pendatang dari seberang dihentikan penjaga
   ("Berhenti! Siapa kamu dan mau ke mana?"), menjawab, lalu berjalan ke pasar.
10. Catat FPS di kota (banyak penduduk + peronda) dan saat dikeroyok, untuk tiap tingkat kualitas.

Laporkan: model HP, FPS, apakah prajurit terlalu kuat / terlalu lemah, apakah kota terlalu sulit
dijelajahi karena terus diserang, dan langkah yang gagal.

## Daftar uji manual — v0.13.0 (Kerajaan Elf Aeloria di utara)
> Sejak v0.14.0 Jembatan Perak tidak ada: berenang / berperahu dari Dermaga Utara ke Dermaga Perak;
> kalah → bangun di pantai utara Pulau Tropis. Ketuk tanah tidak lagi berjalan (joystick).

1. Buka **Peta**: Tanah Aeloria di utara Pulau Tropis, dengan Jembatan Perak dan dua titik toko
   (Pasar Aeloria, Tempa Aeloria). Berjalan dari titik mulai ke pantai utara, seberangi **Jembatan
   Perak** → gapura perak dengan dua kesatria berjaga. Mereka **tidak** menyerangmu (zona damai).
2. Jelajahi kota & kawasan kesatria. Perhatikan elf berkegiatan sendiri-sendiri: mengantre lalu makan
   di Balai Makan, berlatih tanding & memanah di Lapangan Latihan, berpesta & menari di Padang Pesta,
   mengobrol, berbelanja, tidur di tenda, memancing di pantai. Gelembung ucapan muncul sesekali.
3. **Ketuk seorang elf** → kartu isi pikirannya (nama, peran, kegiatan, suasana hati, sifat, bar
   kebutuhan) dan cincin biru di kakinya. Tunggu: isinya berubah saat elf itu berganti kegiatan.
   Ketuk tanah → kartu tertutup dan kamu berjalan. (Mengetuk pedagang yang sedang berjaga = mengetuk
   kiosnya.)
4. **Pasar Aeloria**: ketuk sebuah kios (mis. roti) → kamu berjalan ke depan mejanya dan panel toko
   terbuka. Atau berdiri di depan kios → tombol **Belanja** (kiri bawah). Beli Roti Madu (7 koin):
   koin berkurang, pedagang berkata "Terima kasih!". Coba barang yang lebih mahal dari koinmu →
   "Koinmu kurang…".
5. **Tas** (kanan atas, di samping Peta): terluka dulu (lawan orc), lalu Makan Roti Madu → nyawa +25.
6. Kalahkan beberapa orc (koin +6–12 per orc, angka "+n" melayang di samping koin).
7. **Tempa Aeloria** (timur pasar): lihat pandai besi menempa di landasan. Beli Perisai Daun (60 koin)
   → perisai tampak di tangan kiri; beli Tombak Elf → tombak menggantikan pedang. Pakai/lepas lewat
   Tas. Stok tempa bertambah perlahan selama pandai besi bekerja.
8. Kios yang kedua pedagangnya sedang pergi: tombol berbunyi "kios tutup", dan pesan menyebut
   pedagangnya sedang apa. Coba kios lain atau tunggu.
9. **Keributan warga**: diam beberapa menit di dekat keramaian (pasar, Balai Makan). Dua elf mulai
   berkelahi, yang lain berkerumun bersorak, lalu kesatria datang melerai ("Hentikan!…").
10. **Kerusuhan**: pukul seorang kesatria → pesan "Kamu membuat rusuh di Aeloria! Kini kamu musuh
    kerajaan…", kesatria di dekatmu melawan (4 menyerang, lainnya mengepung), warga di dekatmu kabur.
    Lalu buka toko di pasar → pedagang **tetap melayani** ("pedagang tetap netral…"). Lari jauh →
    "Kamu lolos dari kejaran kesatria…", atau lari menyeberangi Jembatan Perak ke selatan →
    pengejar berhenti di tengah jembatan. Atau biarkan kalah → bangun di ujung selatan Jembatan Perak;
    kesatria yang lewat di sana tidak menyerangmu, tetapi masuk lagi ke Aeloria selagi buron =
    diserang lagi.
11. **Benteng Aeloria** (paling utara, di balik Balai Makan): masuk lewat gerbang → "wilayah
    terlarang", penjaga menyerang. Keluar → mereka berhenti.
12. Catat FPS di pasar, di Balai Makan (paling ramai), di Padang Pesta saat pesta, dan saat dikeroyok,
    untuk tiap tingkat kualitas; juga lama memuat ("Menghidupkan 10.000 kesatria Aeloria…").

Untuk pengujian di komputer, konsol browser bisa memakai `__pulau.life.stats()` (jumlah elf per
kegiatan, waktu JS per bingkai, ekonomi), `__pulau.elfSec.stats()` (buron, penyerang, keributan),
`__pulau.elfSec.startBrawl()`, `__pulau.elfSec.forgive()`, dan `__pulau.bag.reset(koin)`.

Laporkan: model HP, FPS di tiap tingkat kualitas, apakah elf terasa hidup, apakah harga & kekuatan
perlengkapan pas, dan langkah yang gagal.

## Daftar uji manual — v0.14.0 (joystick, tanpa jembatan, berenang, perahu, memancing, mengobrol)
1. **Joystick**: taruh jempol kiri di mana saja di bagian kiri bawah layar → joystick muncul di situ.
   Dorong sedikit = berjalan, dorong penuh = berlari, lepas = berhenti. Kamera di belakang karakter
   dan kembali ke belakangnya saat berlari (diubah v0.15.0: kamera tidak lagi berputar sendiri — lihat
   daftar v0.15.0). Geser dengan jari lain (di luar joystick) = putar kamera
   kiri-kanan & naik-turun; cubit = zoom. Mengetuk tanah tidak lagi membuat karakter berjalan
   (mengetuk elf tetap membuka kartunya, mengetuk kios tetap berjalan ke sana).
2. Tombol **Peta** (kanan atas) hanya berikon peta. Buka peta: tidak ada jembatan antara Pulau Tropis,
   Kencana, dan Aeloria; ada empat dermaga.
3. Ke pantai barat (Dermaga Barat, dua jukung bersandar) dan pantai utara (Dermaga Utara): hanya
   dermaga kayu, tanpa jembatan. Di seberang terlihat Dermaga Timur (Kencana: gapura candi bentar,
   kapal jong) dan Dermaga Perak (Aeloria: batu putih, gapura perak).
4. **Berenang**: berjalan ke laut — makin dalam makin pelan, lalu (sekitar sedada) karakter berenang
   (badan mendatar, riak di sekitarnya). Pukul / jurus → "Tidak bisa menyerang sambil berenang".
   Berenang kembali ke pantai → berjalan lagi. Coba seberangi selat utara ke Aeloria (±115 m antar-ujung
   dermaga, ±50 detik berenang) atau selat barat ke Kencana (±85 m).
5. **Kayu**: Pukul batang pohon (kelapa / pohon hutan) → "+1 kayu (n)" melayang di dekat koin. Tiap
   pohon memberi 3 kayu, lalu "Kayu pohon ini sudah habis…" (tumbuh lagi ±3 menit kemudian).
6. **Tas → Buat dari kayu**: Pancing (3 kayu). Perahu jukung (10 kayu) dibuat di tepi pantai: berdiri
   di pasir dekat air yang cukup dalam → tekan Buat di Tas, atau tombol coklat **Buat perahu** yang
   muncul di sana.
7. **Perahu**: dekati → **Naik perahu** (bisa juga sambil berenang). Dorong joystick ke arah tujuan
   (relatif kamera) → perahu berbelok perlahan lalu melaju; dorong penuh = cepat. Air dangkal →
   kandas (tulisan "perahu kandas" di tombol Turun). **Turun** → melangkah ke darat / dermaga
   terdekat, atau terjun ke air di laut lepas. Berlayar ke Dermaga Timur (penjaga Kencana langsung
   menyerang bila kamu mendarat). Muat ulang halaman → perahu masih di tempat terakhir; Peta
   menampilkan titik "perahumu".
8. **Memancing**: dengan pancing, berdiri diam di pantai / dermaga menghadap laut (atau duduk di
   perahu yang berhenti) → tombol biru **Mancing** → pelampung terlempar. Tunggu 3–9 detik; saat
   pelampung tertarik ke bawah (HP bergetar) ketuk **Tarik!** dalam 1,5 detik → ikan masuk Tas.
   Terlalu cepat / terlambat → ikannya lepas. Air lebih dalam (dari perahu) → ikan lebih besar
   (Ikan Layaran hanya di laut dalam).
9. **Ikan**: Tas → Makan (memulihkan nyawa), atau jual di **Kios Ikan Bakar** (Pasar Aeloria): buka
   kiosnya → "Jual ikan hasil pancinganmu" → Jual → koin bertambah.
10. **Mengobrol**: dekati elf di Aeloria atau warga Kencana (bukan prajurit) → tombol hijau
    **Bicara** dengan namanya. Panel obrolan: ketuk topik (Siapa namamu?, Sedang apa?, Di mana …?,
    Beri makanan, Sampai jumpa) atau ketik sendiri, mis. "namaku Budi", "di mana pasar?", "kamu
    lapar?", "apa kabar?". NPC berhenti, menghadapmu, mengangguk/menggeleng/melambai; kamera pindah ke
    samping kalian berdua. Beri makanan → ucapan terima kasih + beberapa koin. Pedagang yang berjaga →
    "Lihat daganganmu" membuka kiosnya. Tutup: Sampai jumpa / ✕ / berjalan menjauh. Kartu elf →
    **Ajak bicara** → berjalan ke elf itu, obrolan dimulai saat tiba.
11. Layar mendatar: tombol aksi (Bicara, Mancing, Naik perahu, Belanja, …) sebaris di kanan bawah;
    panel obrolan di kanan, kamu & NPC tampak di kiri. Layar tegak: panel obrolan di atas, kalian di
    bawahnya. Periksa: papan ketik HP tidak menutupi kolom ketik (belum bisa diuji di HP sungguhan).
12. Catat FPS di titik mulai, di dermaga, di Kotaraja, di Pasar Aeloria, saat berenang, dan saat
    berlayar, untuk tiap tingkat kualitas.

Komputer: WASD / panah = jalan (Shift = pelan), seret / roda = kamera, F = pukul, 1–4 = jurus,
Spasi = lompat, B = tas, M = peta, E = belanja, C = mancing / tarik, V = naik / turun perahu,
G / Enter = bicara, Esc = tutup. Konsol: `__pulau.bag.terima('kayu')`, `__pulau.craftBoat()`,
`__pulau.boat`, `__pulau.fishing.state`, `__pulau.chat.say('teks')` (saat panel obrolan terbuka).

Laporkan: model HP, FPS di tiap tingkat kualitas, apakah joystick & kamera nyaman, apakah berenang /
berlayar / memancing terasa pas (kecepatan, waktu Tarik!), apakah jawaban NPC masuk akal, dan langkah
yang gagal.

## Daftar uji manual — v0.15.0 (grafik pixel art HD, kamera, gerakan halus)
1. **Tampilan pixel art**: dunia tampak berpiksel besar yang tajam (bukan kabur), setiap benda
   bergaris tepi gelap tipis, cahaya & bayangan bertepi tegas, langit & laut berpola piksel (dithering).
   Bandingkan Rendah / Sedang / Tinggi: Tinggi = piksel paling halus, Rendah = paling besar.
2. Putar HP (tegak ↔ mendatar): gambar tetap tajam, tidak meregang, tidak ada garis / pita hitam di
   tepi layar.
3. **UI**: semua tulisan berhuruf piksel; tombol & panel berbingkai piksel (sudut bertangga); tombol
   Pukul, 4 jurus, Lompat, dan joystick berupa lingkaran piksel; jurus yang siap cincinnya menyala,
   yang sedang jeda gelap dengan sisa detik. Ikon peta, tas, koin, tombol aksi, dan barang di Tas /
   toko berpiksel. Gelembung ucapan berekor piksel. Tulisan tidak terpotong / menimpa (petunjuk
   kontrol tidak menutupi karakter, nama jurus di dalam lingkaran).
4. **Peta**: berpiksel (laut berpita kedalaman, bangunan & jembatan sebagai piksel, panah kuning
   berpiksel), tulisan tempat terbaca.
5. **Kamera**: berjalan maju → kamera tetap di belakang karakter. Dorong joystick ke samping atau ke
   bawah (berbalik) → karakter berbelok / berbalik, **kamera tidak ikut berputar**. Geser layar → kamera
   berputar (satu-satunya cara memutar kamera). Selesai mengobrol → arah kamera kembali seperti sebelum
   mengobrol.
6. **Gerakan halus**: karakter berbelok & berbalik lembut (tidak patah); mulai berjalan / berhenti /
   lari tanpa animasi berkedip; elf di Aeloria berbelok halus di sudut jalan.
7. Catat FPS di titik mulai, Kotaraja, Pasar Aeloria, dan Tegal Wira untuk tiap tingkat kualitas —
   pixel art seharusnya **lebih ringan** daripada v0.14.0 (jauh lebih sedikit piksel yang digambar).

Konsol: `__pulau.pixel.size` (ukuran gambar dalam piksel seni, skalanya, dan sejak v0.15.1 `canvas` = px
kanvas per piksel seni — lebih kecil dari px layar bila browser ikut membesarkan kanvas),
`__pulau.pixel.uniforms` (mis. `uOutline.value = 0` mematikan garis tepi, `uLevels.value = 255`
mematikan pembulatan warna, `uDither.value = 0` mematikan dithering) — untuk membandingkan.

Laporkan: model HP, apakah gambar terasa "pixel art HD" yang diinginkan (piksel terlalu besar / kecil,
garis tepi terlalu tebal / tipis, warna), apakah tulisan berhuruf piksel cukup terbaca, apakah kamera
yang tidak berputar sendiri sudah nyaman, dan FPS dibanding versi sebelumnya.

## Daftar uji manual — v0.15.1 (garis tepi tipis, ikon Pengaturan, tanpa Layar penuh & Lihat pulau)
1. **Garis tepi**: tepi karakter, pohon, dan bangunan kini garis gelap tipis (±2 px layar di HP), bukan
   satu piksel besar. Piksel dunia tetap sebesar sebelumnya.
2. **Kanan atas** hanya tiga tombol sebaris: **Peta**, **Tas**, dan **Pengaturan** (roda gigi). Tidak ada
   lagi Kualitas, Layar penuh, dan Lihat pulau.
3. Ketuk **Pengaturan** → panel "Pengaturan" dengan bagian **Kualitas grafis**: kualitas yang dipakai
   berwarna hijau; pilih yang lain → game dimuat ulang dengan kualitas itu. Tutup / Escape / membuka
   Peta menutup panel.
4. **Layar penuh**: buka game dari browser HP (bukan dari pintasan layar utama) → begitu layar disentuh,
   game masuk layar penuh. Keluar sendiri (gestur kembali) → game tidak memaksa masuk lagi sampai dimuat
   ulang. (Di dalam aplikasi / bingkai pratinjau yang tidak mengizinkan layar penuh, tidak terjadi apa-apa.)
5. Saran "Terasa berat?" (bila FPS rendah) menyebut ikon Pengaturan.
6. Bandingkan FPS dengan v0.15.0 di tempat yang sama (titik mulai, Pasar Aeloria, Tegal Wira).

Laporkan: apakah garis tepinya sudah cukup tipis (atau ingin lebih tipis / lebih tebal), apakah layar
penuh otomatis berjalan di HP-mu, dan FPS.
