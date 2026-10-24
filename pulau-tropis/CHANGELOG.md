# CHANGELOG — Pulau Tropis

## [0.15.0] — 2026-10-24 — Grafik pixel art HD, kamera tidak berputar sendiri, gerakan karakter lebih halus (permintaan pengguna)
### Diubah
- **Semua grafik menjadi pixel art HD.** Gameplay, dunia, tata letak tombol, dan isi game tidak
  berubah — hanya cara menggambarnya:
  - dunia 3D digambar pada resolusi rendah lalu diperbesar tanpa penghalusan dengan skala **bulat**
    piksel layar, jadi setiap piksel sama besar dan tajam: 1 piksel seni = ±2 px di Sedang, ±2,4 px di
    Rendah, ±1,6 px di Tinggi (Tinggi = piksel paling halus);
  - **garis tepi gelap 1 piksel** di tepi setiap benda yang berada di depan benda lain (karakter, pohon,
    bangunan, bukit di depan laut) dan sorot terang tipis di sudut cembung (atap, sudut tembok, punggung
    bukit), seperti sprite yang digambar tangan;
  - cahaya matahari **4 tingkat** (gelap, redup, terang, penuh) dan bayangan bertepi tegas, bukan
    gradasi halus;
  - **warna 15-bit** (32 tingkat per kanal, seperti konsol 16-bit) dengan **dithering** 4×4 — gradasi
    langit & laut pecah menjadi pola piksel — dan warna sedikit lebih jenuh;
  - tanah: pasir, pasir basah, rumput, padang, dan batu dalam 3–4 nada bertepi tegas; jalan, lantai
    batu, rumput alun-alun, sawah & ladang bertepi tegas di dekat kamera, alur tanam & pematang bergaris
    tegas;
  - laut: pantulan langit, warna kedalaman, kilau matahari, buih, dan kaustik dalam beberapa nada;
  - langit bertingkat, awan bertepi tegas dalam 3 nada, cakram matahari tegas;
  - prajurit jauh (potret impostor) bertepi tegas.
- **UI pixel art**: huruf piksel **Pixelify Sans** (lisensi SIL Open Font License 1.1, ikut di dalam
  game — tidak diunduh dari internet, `public/fonts/OFL-PixelifySans.txt`); semua tombol, panel, kartu,
  bar nyawa, gelembung ucapan (berekor piksel), dan kolom ketik berbingkai piksel (garis luar gelap,
  sudut bertangga, tepi timbul); tombol bulat (Pukul, 4 jurus, Lompat) dan joystick berupa **lingkaran
  piksel**; jurus yang siap dipakai cincinnya menyala; semua **ikon** (peta, tas, koin, aksi, barang)
  digambar ulang menjadi ikon piksel; layar memuat bergradasi pita.
- **Peta dunia pixel art**: laut 4 pita kedalaman, tanah & gunung beberapa nada, bangunan, barisan
  pasukan, jembatan, dan dermaga sebagai piksel utuh; perkemahan orc = kotak merah, toko = belah ketupat
  emas, perahumu = kotak toska, panah pemain berpiksel; tulisan berhuruf piksel bergaris luar. Peta kini
  juga lebih cepat dibuka pertama kali (gambar dasarnya ±12× lebih sedikit titik).
- **Kamera tidak lagi berputar sendiri** saat karakter berbelok atau berbalik: kamera tetap mengikuti
  posisi karakter (berjalan maju = kamera tetap di belakangnya), tetapi **arahnya hanya berubah bila
  pemain sendiri menggeser layar / mouse**. (v0.14.0: kamera pelan-pelan kembali ke belakang karakter
  saat berlari.) Selesai mengobrol, kamera kembali ke arah sebelum mengobrol.
- **Gerakan karakter lebih halus**: pemain berbelok & berbalik lebih lembut (setengah putaran ±0,3
  detik); pergantian animasi diam ↔ jalan ↔ lari memakai ambang berjeda (tidak lagi berganti-ganti
  di sekitar batas kecepatan) dan peralihan lebih panjang (0,25 detik); arah hadap elf Aeloria yang
  digambar kini berbelok halus (sebelumnya patah di sudut jalan dan saat tiba di tempatnya).
  Prajurit, penduduk Kencana, dan orc sudah berbelok halus dan animasinya sudah berpindah halus.
- Huruf piksel lebih lebar daripada huruf sistem, jadi ukuran beberapa tulisan disesuaikan supaya
  tata letaknya tetap: petunjuk kontrol 14 → 13 px (mendatar 13 → 12 px; kotaknya tidak menutupi
  karakter) dan nama jurus 10 → 9 px (muat di dalam lingkaran).
### Diperiksa
- Pemeriksaan kode: ESLint (konfigurasi repo) 0 error / 0 warning. Tiap commit fitur di-lint, di-build,
  dan dibuka di browser tersendiri.
- Build (`vite build`) berhasil; huruf piksel ikut sebagai berkas 12 KB beserta lisensinya.
- Smoke test otomatis (versi build, 4 profil): **177 cek, 0 gagal** (HP tegak 68, HP mendatar 28,
  HP Rendah 28, komputer 53), termasuk cek baru "berbelok dengan joystick: kamera tidak ikut berputar
  (0,000 rad)". Satu putaran kini ±84 menit (v0.14.0: > 2 jam), karena render software menggambar
  jauh lebih sedikit piksel. Profil HP mendatar & HP Rendah dijalankan ulang pada build terakhir: lulus.
- Uji di browser (Chromium, render software, layar Pixel 7 tegak & mendatar): tampilan pixel art di
  titik mulai, hutan, Kotaraja, sawah, Pasar Aeloria, Tegal Wira, berenang, mode Lihat pulau; semua panel
  UI, peta, gelembung, joystick; kamera (joystick ke kanan & berbalik → arah kamera tetap, geser layar →
  berputar, selesai mengobrol → kembali ke arah semula); efek pukul, 4 jurus, riak.
- Performa (render software, Sedang, layar tegak, v0.14.0 diukur bergantian di mesin yang sama): waktu
  per bingkai titik mulai 1.090 → 289 ms, Pasar Kotaraja 696 → 162 ms, Tegal Wira 1.627 → 788 ms,
  Pasar Aeloria 833 → 258 ms; segitiga & draw call sama (+1 draw call pass pasca-proses); waktu memuat
  sama (komputer Tinggi 5,2 detik). Belum diukur di HP sungguhan.
### Diperbaiki saat uji
- Bingkai pertama setelah layar memuat tertunda ±1,6 detik: ikon piksel dibuat di kanvas GPU yang
  menunggu GPU sibuk memuat dunia (±160 ms per ikon) → kanvas CPU (< 1 ms per ikon).
- Statistik render (`renderer.info`) hanya menghitung pass terakhir (2 segitiga) → dunia + pass
  pasca-proses.
- Ekor gelembung ucapan bersambungan tipis di antara pikselnya → digambar sebagai satu bentuk bertangga.
- Pita hitam di Tegal Wira: potret prajurit jauh memakai alpha-to-coverage yang butuh MSAA (gambar
  pixel art tidak ber-MSAA) → tepi potong alphaTest.
- Garis tepi menggambar badan pemain yang terendam saat berenang → permukaan laut ikut menulis
  kedalaman.
- Bayangan bergaris-garis (peta bayangan tanpa penyaringan) → PCF lalu dibulatkan ke gelap / terang.
- Batas pasir–rumput, jalan, dan lantai batu masih kabur → dibuat bertepi tegas di shader.
- Ligatur "fi" huruf piksel ("grafis") tampak janggal → ligatur dimatikan.
- Kotak petunjuk kontrol menutupi kepala karakter dan nama jurus menimpa cincin tombol (huruf piksel
  lebih lebar) → ukuran huruf disesuaikan.

## [0.14.0] — 2026-10-23 — Joystick & kamera belakang, pulau tanpa jembatan, berenang, perahu, memancing, mengobrol dengan NPC (permintaan pengguna)
### Diubah
- **Kontrol joystick + kamera dari belakang karakter** (menggantikan kamera strategi dari atas +
  ketuk tanah untuk berjalan, v0.6.0):
  - joystick mengambang di kiri bawah: muncul di tempat jempol menyentuh, dorong sedikit = berjalan,
    dorong penuh = berlari, lepas = berhenti; komputer tetap WASD / panah;
  - kamera mengikuti dari belakang setinggi bahu; geser jari lain = putar kamera (kiri-kanan &
    naik-turun), cubit / roda = jarak 2,8–18 m; saat berlari kamera pelan-pelan kembali ke belakang
    karakter (makin menyamping arah larinya makin pelan, supaya joystick ke samping tidak membuat
    karakter berlari berputar-putar);
  - ketuk tanah tidak lagi berjalan; ketuk elf tetap membuka kartunya, ketuk kios tetap berjalan ke sana;
  - tombol **Peta** kini hanya ikon peta; tombol aksi sesuai keadaan (Belanja, Bicara, Naik perahu,
    Turun, Mancing, Tarik!, Buat perahu) muncul bila bisa dipakai — layar tegak bertumpuk di tepi
    kanan, layar mendatar sebaris di kanan bawah;
  - jarak pandang per tingkat kualitas (Rendah 420 m, Sedang 560 m, Tinggi 950 m) dengan kabut:
    kamera rendah kini melihat sampai cakrawala; pulau seberang tetap tampak samar.
- **Pulau Tropis, Kerajaan Kencana, dan Aeloria tidak lagi tersambung jembatan**: Jembatan Agung dan
  Jembatan Perak dibongkar. Penggantinya dermaga di kedua sisi selat: **Dermaga Barat** (Pulau Tropis)
  ↔ **Dermaga Timur** (Kencana: gapura candi bentar dijaga dua prajurit, kapal jong berlabuh) dan
  **Dermaga Utara** (Pulau Tropis) ↔ **Dermaga Perak** (Aeloria: batu putih, gapura perak dijaga dua
  kesatria). Selatnya terlalu dalam untuk diseberangi berjalan kaki: berenang atau berperahu.
  Jembatan di dalam Kepulauan Kencana (ke Pulau Sawah, Pura Segara, Kampung Nelayan, Pulau Wira)
  tetap ada.
  - Serbuan orc ke Kencana kini dengan **perahu perang orc** dari pantai barat Pulau Tropis: orc naik,
    berlayar menyeberang, mendarat di pantai timur Kencana, lalu menyerbu gerbang timur.
  - Pendatang turun dari kapal penyeberangan di ujung Dermaga Timur dan ditanyai penjaga di gapuranya.
  - Kalah oleh prajurit Kencana → dibuang ke pantai barat Pulau Tropis; oleh kesatria Aeloria →
    diantar ke pantai utara Pulau Tropis. Wilayah Kencana dihitung per pulau, wilayah Aeloria berakhir
    di tengah Selat Perak.
### Ditambahkan
- **Berenang**: air sedada atau lebih dalam → karakter berenang (badan mendatar, riak di sekitarnya,
  2,4 m/s), kembali berjalan di air dangkal. Tanpa stamina / tenggelam. Tidak bisa menyerang sambil
  berenang; prajurit, kesatria, dan orc tidak mengejar ke air dalam. (Dulu laut dalam = dikembalikan ke
  pantai.)
- **Kayu**: Pukul batang pohon → +1 kayu (3 per pohon, tumbuh lagi ±3 menit kemudian).
- **Membuat barang di Tas** ("Buat dari kayu"): **Pancing** (3 kayu) dan **Perahu jukung** (10 kayu,
  dibuat di tepi pantai; juga lewat tombol **Buat perahu** di pantai).
- **Perahu**: Naik perahu dari pantai, dermaga, atau sambil berenang; joystick menunjuk arah tujuan
  (relatif kamera), perahu berbelok perlahan dan melaju sampai 7,5 m/s; kandas di air dangkal; Turun
  ke darat / dermaga terdekat atau terjun ke air. Letak perahu disimpan di browser dan tampak di Peta
  ("perahumu"). Tidak bisa menyerang dari perahu.
- **Memancing**: berdiri diam di tepi air / dermaga menghadap laut (atau di perahu yang berhenti) →
  **Mancing** → pelampung dilempar → saat ikan menyambar (pelampung tertarik ke bawah, HP bergetar)
  ketuk **Tarik!** dalam 1,5 detik. 5 jenis ikan menurut kedalaman: Ikan Belanak, Kakap Merah, Ikan
  Tongkol, Ikan Kerapu, Ikan Layaran (laut dalam). Ikan bisa dimakan (nyawa +8…+24) atau **dijual di
  Kios Ikan Bakar** Aeloria (4–30 koin per ekor).
- **Mengobrol dengan NPC**: tombol hijau **Bicara** di dekat elf Aeloria atau warga Kencana (bukan
  prajurit); komputer: G / Enter. Panel obrolan berisi riwayat, topik siap pilih (Siapa namamu?, Apa
  kabar?, Sedang apa?, Apa pekerjaanmu?, Ceritakan kerajaanmu, Di mana …?, Beri makanan, Sampai jumpa,
  dll.), dan kolom ketik bebas.
  - Jawaban sesuai NPC-nya: nama, pekerjaan, kegiatannya sekarang, rasa lapar / lelah / bosan, sifat,
    kerajaannya, dan petunjuk arah ke tempat lain (arah mata angin + jarak, dan perlu menyeberang laut
    atau tidak). Kalimat sehari-hari & singkatan (gmn, dmn, yg, ga, makasih) dikenali.
  - NPC mengingat namamu dan obrolan sebelumnya selama halaman terbuka; pujian & hadiah membuatnya
    lebih akrab, hinaan sebaliknya. Memberi makanan kepada NPC yang lapar → ia berterima kasih dan
    memberi beberapa koin.
  - Selama mengobrol NPC berhenti, menghadapmu, mengangguk / menggeleng / melambai; kamera pindah ke
    samping kalian berdua. Warga Kencana mau bicara tetapi takut ketahuan prajurit (kamu musuh
    kerajaan) dan tidak boleh berdagang denganmu.
  - Kartu elf punya tombol **Ajak bicara** (berjalan ke elf itu, obrolan dimulai saat tiba); pedagang
    yang berjaga punya topik "Lihat daganganmu" yang membuka kiosnya.
- Komputer: **C** = mancing / tarik, **V** = naik / turun perahu, **G / Enter** = bicara.
### Diperiksa
- ESLint 0 error / 0 warning; build berhasil; uji di browser (render software, HP tegak & mendatar):
  joystick, berenang, kayu, pancing, memancing, menjual ikan, membuat / naik / mengemudi / turun
  perahu, menyeberang ke Kencana dengan perahu, dermaga, serbuan orc dengan perahu, obrolan dengan elf
  & warga Kencana. Smoke test 4 profil (versi build): 177 cek, 0 gagal — rinciannya di PROJECT_STATUS.md.
### Diperbaiki saat uji
- Kamera yang mengikuti arah lari terlalu cepat membuat joystick ke samping berputar-putar.
- Tombol Mancing tidak muncul di pantai landai; tombol Naik perahu tidak muncul karena perahu terlalu
  jauh; perahu tidak bisa dibuat dari pasir di pantai landai (Dermaga Barat).
- Perahu perang orc berangkat meninggalkan satu orc.
- Panel obrolan menutupi NPC (terutama di layar mendatar), topik terpotong, gelembung ucapan ganda.
- Di Peta, tulisan "Perahu" menimpa label Dermaga Timur.

## [0.13.0] — 2026-10-23 — Kerajaan Elf Aeloria di utara: 10.000 kesatria yang hidup bebas (permintaan pengguna)
### Ditambahkan
- **Tanah Aeloria + Tanjung Perak** di utara Pulau Tropis, lewat **Jembatan Perak** (jembatan batu
  ±175 m dari pantai utara Pulau Tropis) dan gapura perak. Isinya:
  - **Kota Aeloria** (kota bebas): Pasar Aeloria dengan 51 kios, **Tempa Aeloria** (3 bengkel pandai
    besi + 3 kios senjata/perisai/zirah), Kedai Daun Emas, sumur, rumah-rumah;
  - **kawasan kesatria**: Balai Makan (8 pergola, dua deret meja saji berantrean), Lapangan Latihan
    (arena tanding, lajur panahan, lapangan baris, boneka latihan), Padang Pesta (api unggun, panggung
    musik, meja jamuan), dua perkemahan tenda;
  - ladang gandum & sayur, kebun buah, kincir angin, jalan setapak hutan, pohon khas elf (perak,
    raksasa, emas, cemara, buah);
  - **Benteng Aeloria**: istana raja elf, barak, taman — satu-satunya wilayah terlarang.
- **10.000 kesatria elf** dalam 5 pasukan (Daun, Bulan, Fajar, Embun, Senja; pedang & perisai, tombak,
  busur; kapten bermahkota) + **259 penduduk** (92 pedagang, 6 pandai besi, 42 petani, 16 juru
  masak, 8 pelayan, 4 pemusik, pemilik kedai, 90 warga) + 28 anak. Tiap elf punya nama, 8 sifat
  (rajin, riang, ramah, rakus, pemalas, petualang, pemberani, pemarah), dan kebutuhan yang naik-turun
  (lapar, lelah, bosan, kesepian, ingin berlatih; penduduk: ingin bekerja). **Tiap elf memutuskan
  sendiri** kegiatan berikutnya: makan di Balai Makan (mengantre, membawa mangkuk ke kursi), bekal saat penuh, berlatih
  tanding berpasangan, memanah, baris-berbaris, memukul boneka, berpesta & menari di sekeliling api
  unggun, menonton pemusik, mengobrol, minum di kedai, memancing atau bersantai di pantai, rebahan di
  rumput, berjalan-jalan, berbelanja, berjaga, tidur di tenda atau barak. Penduduk berjualan,
  menempa, bertani, memasak, melayani antrean, bermain musik, menimba air, berbelanja, pulang; anak-anak
  bermain kejar-kejaran. Gelembung ucapan sesuai kegiatan ("Enak sekali!", "Bersulang!",
  "Roti hangat! Roti hangat!"…).
- **Ekonomi yang mengalir**: pandai besi yang menempa di landasan menyelesaikan satu pedang / tombak /
  perisai / zirah / helm tiap ±70–110 detik → stok kios Tempa Aeloria bertambah. Pedagang makanan
  menyiapkan dagangannya selama berjaga; petani mengantar sekeranjang panen ke kios roti / buah /
  sayur. Penduduk & kesatria yang berbelanja ikut membeli, jadi stok bisa habis.
- **Belanja untuk pemain** (25 barang):
  - **koin**: 60 di awal, +6–12 tiap orc yang dikalahkan (angka "+n" melayang di dekat koin);
  - makanan & minuman (Roti Gandum 4 koin … Daging Panggang 12 koin; memulihkan 10–45 nyawa),
    ramuan (Penyembuh +70 nyawa, Kekuatan serangan ×1,5 selama 60 detik, Kecepatan lari lebih cepat
    60 detik);
  - perlengkapan Tempa Aeloria: Pedang Perak Elf (serangan ×1,5), Tombak Elf (×1,2 + jangkauan
    +0,9 m), Perisai Daun / Perisai Perak (menahan 20% / 32% luka), Zirah Rantai / Zirah Perak Aeloria
    (25% / 40%), Helm Elf (10%) — paling banyak 70% luka tertahan. **Perlengkapan tampak di badan**
    (perisai di tangan kiri, tombak menggantikan pedang, pedang berkilau perak, zirah & pelindung bahu,
    lingkar dahi emas bersayap).
  - Di dekat kios muncul tombol **Belanja** (kiri bawah); **ketuk kios** untuk berjalan ke sana dan
    panel toko terbuka saat tiba. Panel menampilkan barang (ikon bergambar), efek, stok, harga.
  - Tombol **Tas**: makan / minum / minum ramuan, pakai / lepas perlengkapan, efek gabungan. Tas & koin
    disimpan di browser.
  - Kios hanya melayani bila salah satu dari **dua pedagangnya** (pemilik + pembantu, rumahnya dekat
    pasar) sedang berjaga. Kios tutup memberi tahu pedagangnya sedang apa ("Galalis sedang di rumah").
- **Penjagaan Aeloria** (kota & kawasan kesatria = zona damai):
  - **Membuat rusuh** (memukul elf mana pun) → **musuh kerajaan** selama 4 menit sejak kerusuhan
    terakhir: kesatria di dekatmu melawan (4 sekaligus, 6 mengepung dan menggantikan yang roboh),
    kesatria lain yang melihatmu selama kamu buron ikut menyerang. Warga di sekitar kabur ("Tolong!
    Ada yang mengamuk!"), yang pemberani ikut berkelahi dengan tangan kosong. Lolos dari kejaran atau
    tunggu sampai dimaafkan.
  - **Pedagang tetap netral**: tidak kabur, tidak menyerang, dan **tetap berdagang denganmu** walau
    kamu musuh kerajaan ("Dilayani … — pedagang tetap netral walau kesatria memusuhimu").
  - **Benteng Aeloria terlarang**: penjaganya menyerang siapa pun yang masuk; keluar = berhenti.
  - Perburuan hanya di **wilayah Aeloria** (utara tengah Jembatan Perak): lari menyeberang ke selatan
    → kesatria berhenti di perbatasan ("Kamu keluar dari wilayah Aeloria…"); masuk lagi selagi
    buron → diserang lagi.
  - Kalah oleh kesatria → dibawa ke luar kerajaan, di ujung selatan Jembatan Perak.
  - **Tidak ada yang mati**: elf yang roboh pingsan 20–35 detik, lalu bangun dan kembali berkegiatan.
    Anak-anak tidak bisa dipukul. Jurus Penggal hanya menyasar elf yang sedang melawanmu (roboh, tidak
    dipenggal).
- **Keributan warga**: sesekali dua elf pemarah berkelahi di dekatmu ("Kau curang main dadu!"),
  elf lain berkerumun menonton dan bersorak, lalu kesatria terdekat datang melerai ("Hentikan! Tidak
  ada perkelahian di Aeloria!"). Bila tidak ada yang melerai, yang kalah jatuh dan mereka bubar.
- **Ketuk seorang elf → kartu isi pikirannya**: nama, peran & senjata, kegiatan sekarang, suasana
  hati, sifat, dan bar kebutuhan; diperbarui selama kartu terbuka. Elf yang dipilih ditandai cincin
  biru muda. Mengetuk pedagang yang sedang berjaga (sering tertutup atap kiosnya) = mengetuk kiosnya.
- Peta: Aeloria, Jembatan Perak, titik toko (pasar & tempa). Spanduk wilayah: Pasar Aeloria, Tempa
  Aeloria, Kota Aeloria, Balai Makan, Lapangan Latihan, Padang Pesta, Perkemahan Kesatria, Benteng
  Aeloria ("wilayah terlarang"), Tanjung Perak, Tanah Aeloria.
- Elf digambar dengan tubuh Kenney Mini Characters (sudah ada di penduduk.glb) + animasi tambahan
  `elf.glb` (57 KB): telinga runcing, warna tiap bagian badan berbeda per elf, zirah / helm / jubah /
  rambut panjang / tabung panah / sarung pedang / mahkota daun / celemek, dan ±40 gerak (makan,
  minum, bersorak, menari, menempa, memanah, memancing, tidur, berkelahi, roboh…). Model penuh untuk
  yang dekat (Rendah 35 / Sedang 70 / Tinggi 140 elf), model jauh ±370 titik untuk sisanya
  (200 / 380 / 800).
### Diubah
- Petunjuk kontrol menyebut koin, Aeloria, ketuk kios, dan ketuk elf. Kolom tombol kanan atas:
  **Peta** dan **Tas** sebaris.
- Pemain: perlengkapan & ramuan mengubah kerusakan, jangkauan, luka yang tertahan, dan kecepatan lari.
### Diperbaiki
- **Layar mendatar: tombol jurus Hentak / Putar / Penggal naik miring ke tengah layar** (sejak
  v0.9.0). Aturan tata letak mendatar kalah oleh aturan tegak yang lebih spesifik; kini kelima tombol
  sebaris di bawah.
- Ditemukan saat uji: saat Balai Makan penuh, kesatria yang makan bekal duduk di titik yang sama —
  di awal permainan sampai 35 elf menumpuk dalam satu petak 4 × 4 m. Kini mereka mencari tempat lapang
  5–24 m dari situ.
- Ditemukan saat uji: tombol Belanja menutupi tombol Cincang untuk nama kios yang panjang → nama
  pendek ("Zirah & Helm").
- Ditemukan saat uji: kesatria yang berjalan-jalan sampai ujung selatan Jembatan Perak menyerang
  pemain buron yang baru dibangunkan di sana, jadi ia bisa kalah berulang-ulang → perburuan kini hanya
  di wilayah Aeloria.
- Ditemukan saat uji: mengetuk atap kios membuka kartu pedagang yang berdiri di bawahnya, bukan
  tokonya → mengetuk pedagang yang sedang berjaga = mengetuk kiosnya.
### Pengujian
- Smoke test: Aeloria (10.000 kesatria, elf terlihat di pasar, tombol Belanja, membeli roti &
  tombak, ketuk elf → kartu, keributan dilerai), (HP tegak & komputer) kerusuhan → diserang, pedagang
  tetap melayani, kalah → ujung selatan Jembatan Perak, Benteng Aeloria terlarang; (HP tegak) koin
  dari orc yang dipenggal.

## [0.12.1] — 2026-10-22 — Pemain musuh setiap kerajaan (permintaan pengguna)
### Diubah
- **Pemain bukan rakyat kerajaan mana pun, jadi ia musuh setiap kerajaan.** Prajurit Kencana tidak
  lagi menanyai pemain. Prajurit yang melihatnya di wilayah kerajaan (≤ 40 m), atau berpapasan
  dengannya di luar wilayah (≤ 7 m, mis. penjaga kepala jembatan timur), berseru ("Berhenti! Siapa
  kamu?! Kamu bukan rakyat Kencana!", "Musuh kerajaan! Serang!") lalu langsung menghadang dan
  menyerang. Paling banyak 3 sekaligus; yang roboh atau tertinggal jauh digantikan prajurit
  terdekat. Aturan ini juga berlaku untuk kerajaan yang dibuat kemudian.
- Prajurit yang menyerang dari jauh berlari memotong jalan pemain (menuju perkiraan posisinya),
  jadi yang di depan pemain menghadang, bukan membuntuti.
- Lari keluar wilayah: di luar wilayah tiap prajurit mengejar paling jauh ±35 m dari tempat ia mulai
  mengejar. Bila tidak ada lagi pengejar dalam 20 m selama 6 detik → "Prajurit Kencana berhenti
  mengejarmu." Masuk lagi → langsung diserang lagi.
- Kalah oleh prajurit → bangun di pantai ±12 m dari penjaga kepala jembatan timur (dulu ±5 m),
  dengan masa tenang 30 detik: penjaga di luar wilayah tidak langsung menyerang lagi.
- Jurus Penggal selalu bisa menyasar prajurit Kencana (dulu hanya saat bermusuhan). Prajurit yang
  dirobohkan Penggal membuat kawan-kawannya membalas.
- Petunjuk kontrol: "kamu musuh setiap kerajaan, prajuritnya akan menyerangmu".
### Dihapus
- Kartu tanya-jawab untuk pemain, status tamu, sapaan peronda, dan pergeseran kamera selama
  ditanyai. Pendatang (penduduk dari seberang) tetap ditanyai penjaga di gerbang lewat gelembung
  ucapan.
- Keadaan prajurit "cegat" & "awasi" dan klip geleng kepala (tidak terpakai lagi).
### Diperbaiki (ditemukan saat uji)
- Pemain yang diburu di separuh timur Jembatan Agung (masih di luar wilayah) sambil berjalan MASUK
  ke kerajaan dianggap kabur setelah 12 detik, dan pengejaran berhenti. Kini "lolos" dihitung dari
  jarak ke pengejar, bukan dari lamanya di luar wilayah.
- Dalam 6 m terakhir, prajurit yang mengejar melambat menjadi berjalan (1,6 m/s), sehingga saat
  mengejar pemain yang lari mereka berganti-ganti lari dan jalan. Kini mereka tetap berlari penuh
  selama sasaran bergerak, dan mendekati sasaran yang diam sambil berlari kecil (2,6 m/s).
### Pengujian
- Smoke test:
  - menuju Jembatan Agung → dihadang dan langsung diserang (tanpa kartu tanya-jawab);
  - (HP tegak & komputer) masuk wilayah → diserang; kalah → dibawa keluar; masuk lagi → diserang
    lagi; kabur keluar wilayah → prajurit berhenti mengejar.

  Uji kota dan bala tentara memakai "gencatan senjata" khusus pengujian supaya tidak diganggu
  prajurit.

## [0.12.0] — 2026-10-20 — Penjagaan Kerajaan Kencana: peronda, cegat & tanya, dilawan (permintaan pengguna)
### Ditambahkan
- **Prajurit peronda di semua wilayah**: Rendah 40 / Sedang 64 / Tinggi 96 prajurit berjalan
  berpasangan (satu bertombak berjambul biru, satu berpedang & berperisai berjambul hijau) di
  Kotaraja & keraton, luar kota & pelabuhan, Jembatan Agung, Pulau Sawah, Pulau Nelayan, Pulau Pura,
  dan Pulau Wira (jalan depan, sisi, dan belakang barisan). Mereka menunggu bila jalan dihalangi
  pemain, sesekali berhenti, lalu lanjut meronda.
- **Penjaga pos** (32 orang di gerbang kota, gerbang keraton, pendopo, kepala jembatan, Siti
  Hinggil) kini ikut bertugas: mencegat, menanyai, dan bertarung — dulu hanya berdiri.
- **Orang asing yang masuk wilayah kerajaan langsung dihadang dan ditanyai**: begitu pemain
  melewati tengah Jembatan Agung (atau muncul di pulau Kencana mana pun), prajurit terdekat berlari
  mencegat bersama pasangannya. Muncul **kartu tanya-jawab** dengan pilihan jawaban:
  - "Siapa kamu? Ada keperluan apa?" → pengembara / menghadap raja / pemburu orc / kasar / pergi
  - "Pedang itu untuk apa?" → untuk melawan orc (boleh masuk) / untuk menebas siapa pun (dilawan)
  - jawaban damai → menjadi **tamu**: prajurit mengangguk, mempersilakan lewat, dan peronda
    menyapa saat berpapasan. Datang lagi → ditanyai singkat; pernah membuat onar → ditanyai curiga.
- **Dilawan**: jawaban kasar, terus kabur saat dicegat, atau memukul prajurit → "Penyusup!
  Serang!" — paling banyak 3 prajurit menyerang sekaligus, yang lain bergantian datang. Prajurit
  bisa dipukul balik (berkedip, terpental, bar nyawa), roboh, lalu kembali bertugas ±40 detik
  kemudian. Jurus Penggal juga menyasar prajurit yang bermusuhan (mereka roboh, tidak dipenggal).
- **Nyawa pemain** (bar merah di kiri atas, kilatan merah di tepi layar saat terkena), pulih
  perlahan setelah aman. Habis → roboh, lalu dibawa keluar wilayah kerajaan ke ujung timur Jembatan
  Agung (atau bangun di titik mulai bila dikeroyok orc). Lari keluar wilayah ±25 detik →
  pengejaran berhenti.
- **Serbuan orc**: tiap ±3 menit tiga orc dari perkemahan terdekat berjalan ke Kotaraja lewat
  Jembatan Agung. Begitu masuk wilayah kerajaan mereka langsung dihadang dan dilawan prajurit
  (tanpa ditanya). Orc penyerbu membalas prajurit, dan pemain yang memukulnya.
- **Pendatang**: penduduk dari Pulau Tropis datang lewat Jembatan Agung, dihentikan penjaga di
  gerbang ("Berhenti! Siapa kamu dan mau ke mana?"), menjawab keperluannya, lalu boleh lewat ke
  pasar dan kemudian pulang.
- **Gelembung ucapan** di atas kepala prajurit & pendatang ("Hei, kamu! Berhenti!", "Silakan
  lewat.", "Orc menyerbu! Hadang!", …).
### Diubah
- Penjaga gerbang/keraton/jembatan pindah dari penduduk ke prajurit bertugas (jumlah penduduk
  yang tercatat turun 32; jumlah orang di dunia tetap).
- Petunjuk kontrol menyebut bahwa prajurit Kencana akan menanyaimu.
- Model kuda & perisai (`bala.glb`) dimuat sekali untuk bala tentara dan prajurit bertugas.
### Diperbaiki (ditemukan saat uji)
- Game berhenti (layar membeku) bila pukulan prajurit membuat pemain roboh: prajurit yang sedang
  mengayun ditarik mundur di tengah ayunannya sendiri. Ayunan kini dipegang terpisah.
- Uji jalan menyeberangi Jembatan Agung di smoke test menyesuaikan penjagaan baru (dicegat,
  menjawab damai, lalu lanjut).
### Pengujian
- Smoke test ditambah:
  - peronda di semua 7 wilayah tugas dan benar-benar berjalan;
  - menyeberangi Jembatan Agung → dicegat & ditanyai, jawaban damai → tamu, lalu lanjut menyeberang;
  - (HP tegak & komputer) jawaban kasar → dilawan; jurus Putar mengenai prajurit; nyawa habis →
    dibawa keluar wilayah dengan nyawa penuh; serbuan orc dihadang & dikalahkan prajurit; pendatang
    ditanyai penjaga di gerbang lalu boleh masuk.

## [0.11.0] — 2026-10-20 — Bala tentara Kencana: 25.000 prajurit siap tempur (permintaan pengguna)
### Ditambahkan
- **Pulau Wira** — pulau baru di selatan pelabuhan Pulau Kencana, markas bala tentara kerajaan.
  Dihubungkan **Jembatan Wira** (±85 m) dari ujung timur dermaga pelabuhan.
- **25.000 prajurit siap tempur** berbaris dalam gelar perang di **Tegal Wira** (lapangan
  440 × 207 m), menghadap Siti Hinggil:
  - 5.000 **pemegang perisai** — barisan paling depan, jambul merah, perisai besar;
  - 5.000 **pemegang tombak** — jambul biru, tombak tegak;
  - 5.000 **pemegang pedang** — jambul hijau, pedang terhunus;
  - 5.000 **pemanah** — jambul kuning, busur di tangan, tabung panah di punggung;
  - 5.000 **penunggang kuda bertombak** — jambul putih, di sayap kiri dan kanan;
  - ditambah 7 **senapati** berkuda putih dengan panji ungu (di luar hitungan 25.000).
  Prajurit di dekat pemain bernapas pelan (animasi diam, waktunya berbeda-beda).
- **Lorong** 4–6 m di antara barisan bisa dilewati; barisannya sendiri tidak bisa ditembus.
- **Siti Hinggil** (panggung kehormatan): batur bata dengan Bangsal Witana, dampar emas, payung
  kebesaran, dan tangga; dijaga 4 penjaga.
- **Perkemahan**:
  - barat: 113 tenda prajurit + 2 gudang senjata;
  - timur: 6 kandang kuda + tumpukan jerami;
  - umbul-umbul berwarna pasukan di sepanjang jalan depan dan di sudut-sudut barisan.
- **Peta dunia**: Pulau Wira, kotak warna tiap pasukan, label "Tegal Wira · 25.000 prajurit".
  **Spanduk wilayah** "Pulau Wira" dan "Tegal Wira".
- Model kuda (Kenney "Prototype Kit") dan perisai (Kenney "Mini Dungeon"), CC0, dikemas menjadi
  `public/models/bala.glb` (42 KB) oleh `scripts/pack-bala.py`.
### Cara kerjanya (supaya ringan di HP)
- **Dekat pemain**: 70 / 160 / 320 prajurit terdekat (Rendah / Sedang / Tinggi) digambar sebagai model
  3D beranimasi lengkap dengan senjatanya, selama kamera cukup dekat (< 32 / 42 / 55 m).
- **Selebihnya — "impostor"**: tiap jenis prajurit dipotret sekali saat dimuat, dari 16 arah × 4 sudut
  pandang. Tiap prajurit lalu menjadi satu kotak yang memakai potret paling cocok.
- Seluruh 25.000 prajurit = 1 draw call, ditambah 1 draw call untuk bayangan kontak.
- Segitiga per frame di layar HP saat di dekat barisan: Rendah ±220–270 rb, Sedang ±245–320 rb,
  Tinggi ±390–520 rb.
### Diubah
- Dunia diperluas 250 m ke selatan (kini 1.625 × 1.250 m).
- Pulau Tropis dan isi Kepulauan Kencana lama tidak berubah, dicek terhadap v0.10.0:
  - tinggi tanah setiap daratan, semua bangunan, dan penduduk sama persis;
  - pohon & batu Pulau Tropis sama semua;
  - di Pulau Kencana hanya 0–3 pohon di dekat jalan baru ke Jembatan Wira yang bergeser.
- Petunjuk kontrol menyebut Pulau Wira.
- Fungsi rangka yang dipanggang dipindah dari `villagers.js` ke `rig.js` (dipakai penduduk dan prajurit).
### Pengujian
- Smoke test ditambah:
  - jumlah prajurit tiap pasukan dan senapati;
  - menyeberangi Jembatan Wira;
  - spanduk "Tegal Wira";
  - prajurit 3D di dekat pemain + impostor;
  - barisan menahan prajurit;
  - foto barisan dan Pulau Wira dari udara.

## [0.10.0] — 2026-10-19 — Kepulauan Kencana: kerajaan besar di barat (Milestone 3, permintaan pengguna)
### Ditambahkan
- **Dunia diperluas ke barat** (1.625 × 1.000 m): Pulau Tropis tetap di tengah, di baratnya
  **Kepulauan Kencana** — empat pulau baru yang dihubungkan jembatan:
  - **Pulau Kencana** (pulau terbesar) dengan **Kotaraja Kencana**, ibu kota kerajaan bergaya
    Nusantara (Majapahit/Jawa–Bali): tembok kota bata merah 280 × 200 m dengan 12 menara dan
    4 gerbang candi bentar, ±160 rumah dalam blok-blok jalan, **Keraton** bertembok (gerbang
    paduraksa, Pendopo Agung di atas batur dengan singgasana raja, bangsal, 2 meru, 4 bale),
    **alun-alun** dengan dua beringin berpagar, **pasar** 14 lapak warna-warni, kompleks **candi**
    batu dengan 4 candi perwara, sawah di luar tembok, desa di tepi jalan, dan **pelabuhan**
    (3 dermaga kayu, gudang, perahu bercadik, kapal jong).
  - **Pulau Sawah** (utara): hamparan sawah berpetak, dukuh petani dengan lumbung, dangau.
  - **Pulau Nelayan** (barat daya): kampung rumah panggung, jemuran ikan, dermaga, perahu di pasir.
  - **Pulau Pura** (barat): pura di puncak bukit — meru bertingkat 11, 7, 3, bale, candi bentar,
    jalan naik berhias umbul-umbul.
- **Jembatan Agung** (±160 m, batu andesit, langkan bata, lampu, gapura candi bentar di kedua ujung)
  dari pantai barat Pulau Tropis ke Pulau Kencana; 3 jembatan kayu ke pulau-pulau lain. Jembatan,
  dermaga, batur, dan tangga bisa diinjak (lantai bangunan), bangunan & tembok tidak bisa ditembus.
- **Penduduk kerajaan** (±200 / ±300 / ±400 orang di kualitas Rendah / Sedang / Tinggi): berjalan di jalan-jalan kota dan
  antarpulau, sesekali berhenti; pedagang di pasar, petani di sawah, nelayan di dermaga, warga
  bersantai di alun-alun, pendeta di candi & pura, **raja bermahkota** di singgasana, **penjaga
  bertombak** di setiap gerbang. Penduduk menoleh dan melambai saat prajurit mendekat, dan tidak bisa
  ditembus. Model: Kenney "Mini Characters" (CC0, 8 karakter dalam satu file 365 KB).
- **Peta dunia** (tombol **Peta**, komputer: **M**): semua pulau, kota, jalan, jembatan, perkemahan
  orc, dan posisi + arah prajurit.
- **Spanduk nama wilayah** saat memasuki pulau / kota / keraton / jembatan baru
  (mis. "Kotaraja Kencana — Ibu kota Kerajaan Kencana").
- Jalan tanah, lantai batu, rumput halus alun-alun, dan sawah berpetak (pematang, padi muda–menguning)
  digambar shader tanah dari masker 1 m per piksel.
- Pepohonan baru: beringin, kamboja, pisang, mangga; kelapa, hutan kecil, semak & bunga di pulau-pulau
  barat.
### Diubah
- Judul HUD: Milestone 3. Petunjuk kontrol menyebut Peta dan arah ke kerajaan.
- Terrain, laut, dan bangunan kini dipecah per petak: bagian di luar layar tidak digambar. Walau
  dunia 1,6× lebih luas, segitiga per frame di titik mulai justru turun (Rendah ±290 → 252 rb,
  Sedang ±420 → 277 rb, Tinggi ±820 → 548 rb); draw call naik dari ±30 ke ±50.
- Tajuk/atap tembus pandang kini juga berlaku untuk bangunan; di bawah atap besar (pendopo, bale,
  gerbang keraton) lubangnya diperlebar.
- Batas "terlalu jauh" kini tepi dunia (bukan 430 m dari pusat Pulau Tropis).
### Tidak berubah
- Pulau Tropis sama persis: bentuk tanah, ±1.000 pohon, batu, perkemahan orc, titik mulai, dan jalur
  ketuk-berjalan dicek identik dengan versi 0.9.0 (kecuali beberapa pohon di kepala Jembatan Agung).
### Pengujian
- Smoke test ditambah: kerajaan lengkap (rumah, tembok, pendopo, jembatan), penduduk bergerak &
  terlihat di pasar, menyeberangi Jembatan Agung tanpa jatuh, spanduk wilayah di gerbang timur,
  naik tangga pendopo, dinding rumah menahan prajurit, tombol Peta.

## [0.9.0] — 2026-10-19 — Musuh orc + 4 jurus baru (permintaan pengguna)
### Ditambahkan
- **Musuh orc** (Kenney "Mini Dungeon", CC0 — rig & animasi sama dengan prajurit): 25 orc di 5
  perkemahan (satu ±16 m di depan titik mulai; lainnya di padang barat gunung, timur, utara, selatan).
  Berkeliaran pelan dan menoleh ke prajurit bila dekat; **belum menyerang**.
  - Nyawa 6: bar merah muncul di atas kepala saat terkena; berkedip putih & terpental saat dipukul;
    roboh (animasi jatuh), lalu tenggelam ke tanah dan muncul lagi di perkemahannya ±19 detik kemudian.
  - Orc yang jauh (> 60 m) tidak digambar dan tidak dianimasikan (hemat untuk HP).
- **4 jurus baru** (komputer: tombol 1–4 atau Q/E/R/T):
  1. **Cincang** (jeda 6 detik): 10 cincangan beruntun ke depan sambil maju pelan.
  2. **Hentak** (jeda 7 detik): melompat ±2 m, pedang dibalik menghadap ke bawah di puncak
     lompatan, lalu menghentak turun dan menancapkan pedang ke tanah — retakan tanah, gelombang kejut
     ±3,3 m (orc terluka & terpental), layar berguncang.
  3. **Putar** (jeda 5 detik): 3 cincangan lalu berputar satu kali, mengenai semua di sekeliling ±2,4 m.
  4. **Penggal** (jeda 15 detik): membidik leher maks. 5 orc terdekat (±14 m, tanda bidik merah),
     lalu melesat secepat kilat melewati semuanya dan memenggal kelimanya bersamaan — jejak kilat
     zig-zag, garis potong di leher, kepala terlepas & terlempar (bergaya kartun, tanpa darah).
     Tanpa musuh dalam jangkauan: muncul pesan dan jeda pakai tidak terpakai.
- Pukulan kombo (tebas / tinju / tendang) juga melukai orc.
### Diubah
- Tombol jurus: Cincang, Hentak, Putar, **Penggal** (merah, jurus pamungkas) + Lompat melingkari
  tombol Pukul (layar tegak) atau sebaris di kirinya (layar mendatar).
- Jurus lama diganti: Putar kini "cincang lalu putar", Hentak kini "menancapkan pedang", **Serbu dihapus**
  (gerakan melesatnya kini bagian dari Penggal).
### Pengujian
- Smoke test: orc di 5 perkemahan dekat titik mulai; Cincang (10 cincangan, orc roboh); Hentak
  (lompat, retakan, orc terluka); Putar (cincang → putar, ≥ 2 orc terluka); Penggal (5 leher dibidik
  & dipenggal, prajurit melesat); orc hidup lagi; Penggal tanpa musuh; tombol 1–4 di komputer.

## [0.8.0] — 2026-10-19 — Variasi serangan: kombo + 3 jurus (permintaan pengguna)
### Ditambahkan
- **Kombo Pukul**: tombol Pukul berganti gerakan setiap ditekan — tebasan pedang → tinju kiri →
  tendangan, lalu kembali ke tebasan. Tekan lagi selagi bergerak atau ≤ 0,7 detik setelahnya untuk
  melanjutkan kombo; jeda lebih lama → mulai lagi dari tebasan.
- **3 jurus dengan jeda pakai** (tombol bulat biru di sekitar tombol Pukul; komputer: 1/2/3 atau Q/E/R):
  - **Putar** — Tebasan Putar (jeda 4 detik): berputar satu lingkaran sambil menebas, mengenai semua
    batang/batu dalam ±2 m di sekeliling.
  - **Serbu** — Serbuan (jeda 5 detik): melesat ±5 m ke depan lalu menebas; berhenti di depan
    batang/batu atau sebelum air dalam.
  - **Hentak** — Hentakan (jeda 7 detik): melompat ke depan (±1,2 m tinggi, ±2,7 m maju) lalu
    menghantam tanah; gelombang kejut mengenai sekeliling ±3 m dan layar sedikit berguncang.
  - Selama jeda, tombol jurus gelap dengan sisa detik; jurus yang siap bercahaya.
- Efek khas tiap gerakan: cincin putih (tinju), cincin hangat + debu (tendangan), pusaran putih
  (Putar), jejak lesatan (Serbu), gelombang kejut + debu (Hentak). Cincin bertepi gelap tipis agar
  terlihat di pasir maupun di hutan.
### Diubah
- Tata letak tombol aksi: **Pukul** (besar) di pojok kanan bawah; Putar, Serbu, Hentak, dan **Lompat**
  melingkarinya (layar tegak) atau sebaris di kirinya (layar mendatar). Tombol Lompat pindah dari pojok.
- Tombol serang/jurus yang ditekan saat masih menyerang disimpan, lalu langsung dijalankan.
- Logika serangan dipindah ke `src/player/combat.js` (player.js tetap untuk fisika & animasi).
### Diperbaiki
- Batang pohon hutan & pohon payung tidak lagi tampak berlubang dari atas saat tajuk di depan kamera
  dibuat tembus pandang (ujung batang kini tertutup).
### Pengujian
- Smoke test: kombo tebas → tinju → tendang; jurus Putar (kena sekeliling, jeda pakai, sisa detik di
  tombol, tidak bisa dipakai saat jeda); Serbu ke batang pohon (berhenti tanpa menembus, menebas);
  Hentak (melompat, mendarat, gelombang kejut); tombol 1/2/3 di komputer.

## [0.7.0] — 2026-10-19 — Tombol Pukul, lingkaran hijau dihapus (permintaan pengguna)
### Ditambahkan
- **Tombol Pukul** (ikon pedang, kanan bawah di sebelah kiri tombol Lompat): prajurit berhenti di
  tempat dan mengayunkan pedang (animasi bawaan model `attack-melee-right`, ±0,46 detik).
  Ditekan lagi saat masih mengayun = langsung mengayun sekali lagi. Saat berjalan, memukul
  menghentikan jalan (ketuk tanah lagi untuk melanjutkan). Komputer: tombol **F**.
- **Efek pukulan** agar terlihat dari kamera atas: busur sabetan putih berbentuk bulan sabit yang
  menyapu lalu memudar; bila bilah mengenai batang pohon → serpihan kayu & daun berhamburan, bila
  mengenai batu → debu & percikan. Jangkauan ±1 m di depan prajurit.
### Dihapus
- **Lingkaran hijau** di bawah prajurit. Cincin kuning penanda tujuan tetap ada; di hutan prajurit
  tetap terlihat lewat tajuk yang tembus pandang.
### Pengujian
- Smoke test: Pukul saat berjalan (berhenti + 1 sabetan), Pukul batang pohon (serpihan muncul),
  tombol F di komputer, dan memastikan lingkaran hijau sudah tidak ada.

## [0.6.0] — 2026-10-19 — Kamera strategi + ketuk untuk berjalan (permintaan pengguna)
### Diubah
- **Kamera gaya game strategi** menggantikan kamera orang ketiga: prajurit dilihat dari atas dengan
  sudut ±49° (dekat) sampai ±64° (jauh), arah kamera tidak berputar sendiri. Geser satu jari /
  seret mouse = putar kamera; cubit / roda mouse = zoom 10–60 m (awal 22 m). FOV disesuaikan per
  orientasi layar (tegak 55°, mendatar 42°); mode **Lihat pulau** tetap memakai FOV lama.
- **Ketuk untuk berjalan** menggantikan joystick: ketuk tanah → prajurit berjalan ke titik itu
  (jauh = lari, dekat = jalan, melambat menjelang tujuan) lewat jalur yang memutari batang pohon,
  batu besar, lereng yang terlalu curam, dan laut dalam. Ketuk lagi = ganti tujuan.
  Ketuk laut → berhenti di air dangkal (tidak tenggelam). Tidak ada jalan → cincin merah +
  pesan "Tidak ada jalan ke sana.".
- Joystick virtual dihapus. Tombol **Lompat** tetap ada. Komputer: klik kiri tanah = jalan,
  klik kanan / seret = putar kamera, roda = zoom; WASD/panah tetap bisa (membatalkan jalur klik).
- Ketukan dibedakan dari geseran: jari bergeser > 12 px atau ditahan > 0,8 detik = bukan ketukan;
  waktu diambil dari event sentuhan itu sendiri (frame yang lambat tidak membatalkan ketukan).
### Ditambahkan
- **Peta jalan** (`src/world/navgrid.js`): grid 2 m di seluruh pulau, A* 8 arah lalu jalur
  diluruskan; setiap ruas dicek langsung ke collider sehingga jalur tidak menyerempet batang.
  Dibuat saat loading (±40 ms di komputer); mencari jalur ±1–20 ms per ketukan.
- **Penanda** (`src/player/marker.js`): cincin kuning berdenyut di titik tujuan, cincin hijau di
  bawah prajurit; keduanya mengikuti kemiringan tanah dan tetap terlihat walau tertutup pohon.
- **Tajuk pohon tembus pandang** di antara kamera dan prajurit (pola titik halus), jadi prajurit
  tetap terlihat saat berada di dalam hutan.
- Detail halus tanah (butiran pasir/rumput ±8 cm) agar tanah tidak tampak buram dari kamera atas.
### Diperbaiki
- Saran "Terasa berat?" tidak lagi bertumpuk dengan kotak petunjuk kontrol.
### Pengujian
- Smoke test: ketuk tanah (sampai ke titik ketuk), memutari batang pohon tanpa menembus, ketuk laut
  dalam → berhenti di air dangkal, geser kamera tanpa menggerakkan pemain, cubit, klik tanah di
  komputer (menggantikan uji joystick).

## [0.5.1] — 2026-10-18 — Karakter diganti prajurit (permintaan pengguna)
### Diubah
- Karakter pemain sekarang **prajurit**: Kenney "Mini Arena" `character-soldier` (CC0) — helm baja
  berjambul merah, tunik merah — memegang **pedang** (`weapon-sword`) di tangan kanan. Pedang
  dipasang pada tulang lengan sehingga ikut berayun saat berjalan/berlari/melompat; posisinya
  dihitung dari data skin model (pusat balok tangan).
- Rig dan nama animasi sama dengan karakter sebelumnya, jadi kontrol, animasi, dan fisika tidak
  berubah. File: `models/prajurit.glb` (183 KB) + `models/pedang.glb` (18 KB), tekstur digabung.
- Model penjelajah lama (`penjelajah.glb`) dihapus dari build (masih ada di riwayat git).
- Smoke test memeriksa pedang terpasang.

## [0.5.0] — 2026-10-18 — Milestone 2: Karakter dan eksplorasi
### Ditambahkan
- **Karakter pemain**: model Kenney "Mini Characters" (CC0) dengan animasi diam, jalan, lari,
  lompat, dan jatuh yang berganti halus menurut kecepatan. Satu file GLB 251 KB (tekstur digabung).
  Bila model gagal dimuat, game memakai karakter sederhana dan tetap bisa dimainkan.
- **Kamera orang ketiga**: mengikuti dari belakang; geser untuk memutar, cubit/roda mouse untuk
  zoom; tidak menembus bukit atau masuk ke bawah air; saat berjalan kamera pelan-pelan kembali
  ke belakang karakter (bisa main dengan satu jempol).
- **Kontrol HP**: joystick virtual muncul di tempat jempol kiri menyentuh (dorong jauh = lari),
  tombol **Lompat** di kanan bawah, geser layar kanan untuk kamera, cubit untuk zoom.
- **Kontrol komputer**: WASD/panah, Shift = pelan, Spasi = lompat, seret mouse = kamera.
- **Fisika**: gravitasi, lompat ±1,1 m (dengan toleransi waktu tekan), tetap menempel saat
  menuruni lereng, lereng > ±52° tidak bisa didaki (merosot), tabrakan dengan batang pohon dan
  batu besar (batu kecil bisa dilangkahi), berjalan lebih lambat di air dangkal.
- **Respawn**: masuk laut dalam (> 1,3 m) atau terlalu jauh dari pulau → layar meredup, pemain
  kembali ke posisi aman terakhir di darat, dengan pesan.
- Tombol **Lihat pulau** / **Main lagi**: beralih ke kamera bebas (orbit) untuk melihat pulau.
- Titik mulai di pantai barat daya, menghadap gunung.
- `scripts/embed-glb-texture.py`: menggabungkan tekstur ke file GLB.
### Diubah
- Smoke test ditulis ulang (menunggu per frame): jalan, lompat, tabrakan pohon, laut dalam,
  mendaki, joystick, tombol Lompat, geser kamera, cubit, tombol mode, menu Kualitas.

## [0.4.0] — 2026-10-18 — Buah kelapa, air lebih bagus, ombak pantai (permintaan pengguna)
### Ditambahkan
- **Buah kelapa**: tandan 8 buah di setiap pohon kelapa — kebanyakan hijau (muda), ada yang
  kuning-oranye (kelapa gading) dan coklat (tua) — menggantung di bawah pelepah dengan tangkainya,
  ikut bergoyang ditiup angin.
- **Ombak pantai** di seluruh pulau:
  - ombak selalu datang tegak lurus garis pantai (memakai peta jarak ke garis pantai);
  - membesar saat mendekat, lalu pecah menjadi buih putih bertekstur;
  - air naik ke pasir lalu surut perlahan, dengan garis buih di ujungnya;
  - pasir yang baru dijilat ombak tetap gelap/basah sebentar (Sedang/Tinggi);
  - set ombak kuat/lemah bergantian; puncak ombak berkelok dan putus-putus (tidak kaku).
### Diubah — kualitas air
- Pantulan langit mengikuti gradasi warna langit + **awan terpantul** di air (Sedang/Tinggi).
- Riak air dari tekstur normal ber-mipmap (1 lapis di Rendah, 2 lapis di Sedang/Tinggi),
  menggantikan gelombang sinus yang dulu menimbulkan pola cincin (moiré) di kejauhan.
- Kilau matahari lebih tajam, efek Fresnel, cahaya tembus di puncak ombak, toska → biru tua
  menurut kedalaman, air tipis di pantai tembus pandang.
- Mesh laut baru: grid rapat di sekitar pulau (Rendah 7,8 m / Sedang 5,2 m / Tinggi 4,2 m),
  makin renggang ke cakrawala, sel daratan dibuang. Kedalaman diambil dari mesh tanah,
  jadi garis air pas dengan pasir.
### Dihapus
- `createDepthTexture` (diganti data pantai `createShoreData`).

## [0.3.0] — 2026-10-18 — Rumput di sekitar gunung + peningkatan kualitas (permintaan pengguna)
### Ditambahkan
- **Rumput ilalang** di lereng dan kaki gunung: rumpun-rumpun helai melengkung yang bergoyang
  ditiup angin (gelombang angin menyapu padang). Sabuk rumput rapat di lereng gunung (±16–76 m,
  di atas batas hutan, di bawah puncak berbatu) + rumput lebih jarang di padang terbuka sekitarnya.
  Sistem chunk 16×16 m: rumput hanya dibuat & digambar di sekitar kamera, kepadatan turun
  dengan jarak, semua dalam satu draw call; chunk yang terlihat kamera dibuat lebih dulu.
- **Menu Kualitas** (tombol "Kualitas" di kanan atas): Rendah / Sedang / Tinggi. Pilihan disimpan;
  HP otomatis mulai di Sedang, komputer di Tinggi. Saran "Terasa berat?" muncul bila FPS < 24.
- **Bayangan matahari** (Sedang/Tinggi): pohon, kelapa, dan batu membayangi tanah. Kotak bayangan
  mengikuti kamera (tajam saat dekat, mencakup pulau saat jauh) dan di-snap ke grid texel agar
  tidak berkedip.
- **Awan** bergerak di langit + cakram matahari.
- **Kilau kaustik** (jaring cahaya) bergerak di air dangkal (Sedang/Tinggi).
- **Vegetasi baru**: pohon payung di padang, semak, semak berbunga (merah/kuning/pink), batu
  besar di lereng gunung dan batu kecil di padang/pantai.
- `PlacementGrid`: objek tidak saling menembus (pohon, batu, semak berjarak wajar).
- `ground.heightAt()`: tinggi permukaan mesh yang sebenarnya — objek berdiri tepat di tanah
  (juga untuk collision karakter di Milestone 2).
### Diubah
- **Tanah** diwarnai per piksel (bukan per vertex) dengan tekstur noise ber-mipmap: batas
  pasir/rumput/batu tajam, butiran halus, bercak warna, padang lebih hijau-kekuningan di sekitar
  gunung, tanah lebih gelap di bawah pohon (oklusi palsu).
- **Kelapa**: pelepah bersirip (anak daun) + pelepah tua kekuningan + buah kelapa, batang bercincin.
- **Pohon hutan**: cabang, tajuk dengan cahaya lembut (normal membulat), pola daun.
- Tone mapping ACES + penyesuaian cahaya; pohon & batu dibagi per petak 3×3 agar yang di luar
  layar tidak digambar.
- Kamera orbit bisa zoom lebih dekat (12 m) untuk melihat rumput.

## [0.2.0] — 2026-10-18 — Pohon (permintaan pengguna)
### Ditambahkan
- Pohon kelapa low-poly di pantai (batang melengkung, daun terkulai) dan pohon hutan tropis
  di pedalaman yang berkelompok (hutan lebat + padang terbuka).
- Semua pohon memakai `InstancedMesh` (1 draw call per jenis) dan bergoyang pelan ditiup angin
  (animasi di vertex shader, tanpa beban CPU).
- Posisi pohon tetap (seed) dan disimpan sebagai data batang untuk collision di Milestone 2.
- Jumlah: HP ±170 kelapa + ±900 pohon hutan; desktop ±1,8×.

## [0.1.0] — 2026-10-18 — Milestone 1: Fondasi game
### Ditambahkan
- Proyek baru `pulau-tropis/` (Three.js 0.170 + Vite 6), build relatif (`base: './'`) agar bisa
  di-hosting dari sub-folder mana pun.
- Pulau prosedural seed tetap: garis pantai tidak beraturan, bukit, gunung ±80 m berpuncak batu.
- Pewarnaan terrain: pasir basah, pasir pantai, rumput, hutan, batu di lereng curam.
- Laut shader: gelombang animasi, warna toska di air dangkal → biru di laut dalam,
  buih di garis pantai, pantulan langit, kilau matahari, peredaman riak di kejauhan (anti-moiré).
- Langit gradien dengan matahari dan kabut cakrawala.
- Kamera orbit sentuh sementara (geser 1 jari, cubit 2 jari), dijaga agar tidak masuk tanah/air.
- Pengaturan kualitas otomatis (HP vs desktop), bisa dipaksa dengan `?kualitas=rendah|tinggi`.
- HUD bahasa Indonesia: judul, FPS, tombol layar penuh, petunjuk kontrol.
- Layar loading dan layar error (error JavaScript tampil di layar, berguna di HP).
- Smoke test otomatis `npm run test:smoke` (Playwright).
- Dokumen proyek: GAME_PLAN, PROJECT_STATUS, CHANGELOG, TESTING, DECISIONS.
