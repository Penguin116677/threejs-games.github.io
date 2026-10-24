# PROJECT_STATUS — Pulau Tropis

**Milestone aktif:** 3 — Pembangunan dunia (v0.15.0: seluruh grafik menjadi pixel art HD, kamera tidak lagi berputar sendiri, gerakan karakter lebih halus — menunggu umpan balik dari HP).
Gameplay v0.15.0 sama dengan v0.14.0 (joystick, pulau tanpa jembatan, berenang, perahu, memancing, obrolan).
Pengembangan karakter/jurus dihentikan sementara atas permintaan pengguna.
**Versi:** 0.15.0
**Terakhir diperbarui:** 2026-10-24

## Kondisi awal repository (sebelum Milestone 1)
- Repository `threejs-games.github.io` berisi koleksi contoh Three.js lama (folder `examples/`,
  `core/`, `libs/`) yang dijalankan tanpa build tool. Belum ada proyek game pulau.
- Game baru dibuat terpisah di folder `pulau-tropis/` agar contoh-contoh lama tidak tersentuh.

## Milestone 1 — status (selesai, ditambah permintaan pengguna)
| Item | Status |
|---|---|
| Setup Three.js + Vite | ✅ selesai |
| Terrain pulau prosedural (gunung, bukit) | ✅ selesai |
| Pantai pasir landai + air dangkal toska + buih | ✅ selesai |
| Laut beranimasi (shader ringan) | ✅ selesai |
| Langit gradien + matahari + kabut cakrawala | ✅ selesai |
| Kamera orbit sentuh (sementara, sampai Milestone 2) | ✅ selesai |
| Pohon kelapa & hutan tropis (instancing, goyang angin) — permintaan tambahan | ✅ selesai |
| Rumput ilalang di sekitar gunung (chunk + LOD, goyang angin) — permintaan tambahan | ✅ selesai |
| Peningkatan kualitas: bayangan, tanah per-piksel, awan, kaustik, semak, bunga, batu — permintaan tambahan | ✅ selesai |
| Menu Kualitas Rendah/Sedang/Tinggi + saran bila FPS rendah | ✅ selesai |
| Buah kelapa (tandan di setiap pohon kelapa) — permintaan tambahan | ✅ selesai |
| Kualitas air: pantulan langit & awan, riak bertekstur, kilau matahari — permintaan tambahan | ✅ selesai |
| Ombak pantai: pecah jadi buih, naik ke pasir lalu surut, pasir basah — permintaan tambahan | ✅ selesai |
| UI dasar berbahasa Indonesia (judul, FPS, layar penuh, petunjuk) | ✅ selesai |
| Pesan error tampil di layar (tanpa konsol) | ✅ selesai |
| Dibuka di browser HP Android sungguhan | ⏳ belum diverifikasi — menunggu laporan pengguna |

## Milestone 2 — status
| Item | Status |
|---|---|
| Karakter pemain: prajurit berpedang (Kenney CC0), animasi diam/jalan/lari/lompat/jatuh | ✅ selesai (diganti prajurit v0.5.1) |
| Kamera strategi dari atas (putar, zoom 10–60 m, tidak menembus bukit) — menggantikan kamera orang ketiga | ✅ v0.6.0 — diganti v0.14.0 |
| Ketuk tanah untuk berjalan (jalur memutari pohon/batu/tebing/laut dalam) — menggantikan joystick | ✅ v0.6.0 — diganti v0.14.0 (jalur masih dipakai untuk ketuk kios / Ajak bicara) |
| Joystick mengambang + kamera di belakang karakter (tidak menembus bukit / air) | ✅ selesai (v0.14.0) |
| Kamera tidak berputar sendiri saat karakter berbelok / berbalik (arah kamera hanya diputar pemain) | ✅ selesai (v0.15.0) |
| Gerakan karakter diperhalus (belok & animasi pemain, arah hadap elf) | ✅ selesai (v0.15.0) |
| Berenang (tanpa stamina; tidak bisa menyerang sambil berenang) | ✅ selesai (v0.14.0) |
| Penanda tujuan, tajuk pohon tembus pandang di depan kamera (lingkaran hijau dihapus v0.7.0) | ✅ selesai |
| Tombol Pukul: ayunan pedang + efek sabetan/serpihan (belum ada musuh/kerusakan) | ✅ selesai (v0.7.0) |
| Variasi serangan: kombo tebas → tinju → tendang + jurus ber-jeda pakai | ✅ selesai (v0.8.0) |
| Musuh orc (5 perkemahan, nyawa, terpental, roboh, muncul lagi) — belum menyerang | ✅ selesai (v0.9.0) |
| 4 jurus: Cincang 10×, Hentak tancap, Cincang lalu Putar, Penggal 5 leher | ✅ selesai (v0.9.0) |
| Tombol Lompat, geser kamera, cubit zoom | ✅ selesai |
| Kontrol mouse + keyboard (komputer): WASD / panah (klik tanah = jalan sampai v0.13.0) | ✅ selesai |
| Gravitasi, lompat, batas lereng, tabrakan batang pohon & batu besar | ✅ selesai |
| Respawn: terlalu jauh (tepi dunia) → kembali ke posisi aman (laut dalam = berenang sejak v0.14.0) | ✅ selesai |
| Map bisa dijelajahi (pantai, hutan, padang, lereng gunung, puncak) | ✅ analisis + uji otomatis |
| Dicoba di HP Android sungguhan | ⏳ menunggu laporan pengguna |

## Milestone 3 — status
| Item | Status |
|---|---|
| Dunia diperluas ke barat (terrain, laut, ombak, peta jalan untuk beberapa pulau) | ✅ selesai (v0.10.0) |
| Pulau Kencana + Kotaraja Kencana: tembok, gerbang, ±160 rumah, keraton, alun-alun, pasar, candi | ✅ selesai (v0.10.0) |
| Pulau kecil: Pulau Sawah, Pulau Nelayan, Pulau Pura | ✅ selesai (v0.10.0) |
| Jembatan Agung + 3 jembatan kayu, dermaga & pelabuhan (bisa diinjak) | ✅ v0.10.0 — Jembatan Agung dibongkar v0.14.0 |
| Penduduk kerajaan (berjalan, berdagang, bertani, penjaga, raja) | ✅ selesai (v0.10.0) |
| Jalan, sawah, lantai batu, rumput alun-alun; pohon khas (beringin, kamboja, pisang, mangga) | ✅ selesai (v0.10.0) |
| Peta dunia + spanduk nama wilayah (bagian Milestone 6, dibuat lebih awal) | ✅ selesai (v0.10.0) |
| Pulau Wira + Jembatan Wira, Siti Hinggil, perkemahan (tenda, kandang kuda) | ✅ selesai (v0.11.0) |
| Bala tentara 25.000 prajurit siap tempur (5 pasukan × 5.000) + 7 senapati | ✅ selesai (v0.11.0) |
| Prajurit peronda di semua wilayah kerajaan + penjaga pos yang bertugas | ✅ selesai (v0.12.0) |
| Pemain (musuh setiap kerajaan) langsung dihadang & dilawan prajurit; nyawa pemain | ✅ selesai (v0.12.1; tanya-jawab v0.12.0 dihapus) |
| Serbuan orc lewat Jembatan Agung dihadang prajurit; pendatang ditanyai di gerbang | ✅ v0.12.0 — sejak v0.14.0 orc datang dengan perahu perang, pendatang dengan kapal |
| Tanah Aeloria + Tanjung Perak + Jembatan Perak: Kota Aeloria, kawasan kesatria, ladang, Benteng Aeloria | ✅ v0.13.0 — Jembatan Perak dibongkar v0.14.0 |
| 10.000 kesatria elf + penduduk + anak, masing-masing dengan nama, sifat, kebutuhan, dan pilihan sendiri | ✅ selesai (v0.13.0) |
| Pandai besi, pedagang, petani: stok kios mengalir (dibuat, diantar, dibeli warga) | ✅ selesai (v0.13.0) |
| Koin, Tas, toko (makanan, ramuan, perlengkapan yang tampak di badan) — bagian Milestone 4 | ✅ selesai (v0.13.0) |
| Kerusuhan → musuh kerajaan (pedagang netral), Benteng terlarang, keributan warga dilerai kesatria | ✅ selesai (v0.13.0) |
| Ketuk elf → kartu isi pikirannya | ✅ selesai (v0.13.0) |
| Tanpa jembatan antar-negeri: 4 dermaga (Barat ↔ Timur, Utara ↔ Perak), selat harus direnangi / dilayari | ✅ selesai (v0.14.0) |
| Kayu dari pohon, membuat pancing & perahu di Tas, perahu yang bisa dikemudikan — bagian Milestone 4 | ✅ selesai (v0.14.0) |
| Memancing (5 jenis ikan menurut kedalaman), menjual ikan di Kios Ikan Bakar — bagian Milestone 4 | ✅ selesai (v0.14.0) |
| Mengobrol dengan elf & warga Kencana (topik + ketik bebas, berbasis aturan) — bagian Milestone 4 | ✅ selesai (v0.14.0) |
| Sungai & air terjun, gua, reruntuhan | ⏳ belum |
| Dicoba di HP Android sungguhan | ⏳ menunggu laporan pengguna |

## Milestone 5 (peningkatan visual) — status
Sebagian sudah dikerjakan lebih awal (bayangan, tanah per-piksel, awan, kaustik — v0.3.0; ombak — v0.4.0).
| Item | Status |
|---|---|
| Gaya pixel art HD: dunia beresolusi rendah bersekala bulat, garis tepi, cahaya 4 tingkat, warna 15-bit + dithering | ✅ selesai (v0.15.0) |
| Tanah, laut, langit bernada bertingkat & bertepi tegas | ✅ selesai (v0.15.0) |
| UI pixel art: huruf piksel, bingkai & tombol bulat berpiksel, ikon piksel, peta dunia berpiksel | ✅ selesai (v0.15.0) |
| Partikel lanjutan, suara, animasi vegetasi lanjutan, siang–malam | ⏳ belum |
| Dicoba di HP Android sungguhan | ⏳ menunggu laporan pengguna |

## Yang sudah diperiksa (v0.15.0 — grafik pixel art HD, kamera tidak berputar sendiri, gerakan halus)
- **Pemeriksaan kode**: ESLint (konfigurasi repo) 0 error / 0 warning. Commit fitur (kamera & gerakan →
  renderer pixel art → UI pixel art) masing-masing di-lint, di-build, dan dibuka di browser tersendiri.
- **Build**: `vite build` berhasil; huruf piksel ikut sebagai berkas terpisah (`pixelify-sans-*.woff2`,
  12 KB) beserta lisensinya (`fonts/OFL-PixelifySans.txt`); CSS 19 KB, JS 1,10 MB (343 KB gzip).
- **Smoke test otomatis** (versi build, 4 profil) — **LULUS**: 177 cek, 0 gagal (HP tegak 68, HP
  mendatar 28, HP Rendah 28, komputer 53; sama banyaknya dengan v0.14.0). Satu putaran ±84 menit
  (v0.14.0: > 2 jam). Cek kamera diubah: joystick serong kanan-depan → karakter berlari serong, yaw
  kamera tidak berubah (0,000 rad), kamera tetap mengikuti 11,5 m di belakang (jarak kamera 12 m);
  geser layar tetap memutar kamera (0,70 rad). Putaran itu memakai build sebelum empat perubahan kecil
  terakhir (statistik render, ekor gelembung, komentar shader air, kanvas ikon); profil HP mendatar & HP
  Rendah dijalankan ulang pada build terakhir: lulus.
- **Uji terpisah di browser** (Chromium, render software, layar Pixel 7 tegak & mendatar, Sedang):
  - **dunia pixel art** di titik mulai, hutan, Kotaraja, sawah Kencana, Pasar Aeloria, Tegal Wira,
    berenang, mode Lihat pulau: piksel tajam bersekala bulat (Pixel 7 tegak: 217 × 441 piksel seni,
    1,9 px CSS per piksel; mendatar 454 × 189), garis tepi, cahaya 4 tingkat, bayangan tegas, langit &
    laut berdithering, tepi sawah / jalan / lantai tegas di dekat kamera, alur padi bergaris tegas;
  - **UI**: HUD, 6 tombol bulat (Pukul, 4 jurus — siap & jeda pakai —, Lompat), joystick diam &
    dipegang, Tas, Kualitas, Peta, obrolan, kartu elf, gelembung ucapan, pesan, spanduk wilayah, layar
    memuat — tegak & mendatar; 11 ikon HUD + ikon tombol aksi & barang dipikselkan; huruf piksel termuat;
  - **kamera** (sentuhan tiruan): joystick maju / kanan / ke bawah (berbalik) → karakter berbelok &
    berbalik (arah hadap 2,36 → 0,79 → −0,79 rad), yaw kamera tetap 5,498, kamera tetap 7–8 m dari
    pemain; geser layar → yaw 5,498 → 6,194; obrolan dengan elf → kamera ke samping, ditutup → yaw
    kembali persis (selisih 0,000 rad);
  - **efek**: pukul, 4 jurus (penanda Penggal), riak berenang, bar nyawa orc — tampil wajar;
  - **halaman pratinjau** (versi lokal: src tanpa bundel + model base64): termuat 6,8 detik, huruf &
    ikon piksel, tanpa galat atau berkas hilang.
- **Ditemukan & diperbaiki saat uji**:
  - pita hitam di Tegal Wira (potret impostor alpha-to-coverage tanpa MSAA) → alphaTest;
  - garis tepi menggambar badan pemain di bawah air → permukaan laut menulis kedalaman;
  - bayangan bergaris-garis → PCF yang dibulatkan; batas tanah / jalan masih kabur → shader bertepi tegas;
  - ligatur "fi" pada huruf piksel; kotak petunjuk menutupi kepala karakter (huruf piksel ±9% lebih
    lebar) → 13 px; nama jurus menimpa cincin tombol → 9 px; sambungan tipis di ekor gelembung;
  - `renderer.info` hanya menghitung pass terakhir (2 segitiga / 1 draw call) → dunia + pass pasca-proses;
  - **bingkai pertama tertunda ±1,6 detik setelah layar memuat** (komputer Tinggi: siap 6,6 detik vs
    v0.14.0 5,0–5,2): ikon piksel di-encode dari kanvas GPU yang menunggu GPU sibuk memuat dunia
    (`toDataURL` ±160 ms per ikon, 1,74 detik untuk 11 ikon) → kanvas CPU (7 ms untuk 11 ikon), siap
    kembali 5,2 detik.

## Yang sudah diperiksa (v0.14.0 — joystick, tanpa jembatan, berenang, perahu, memancing, obrolan)
- `vite build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning. Tiap commit fitur juga di-lint
  & di-build tersendiri; commit "pulau tanpa jembatan" (sebelum obrolan ada) dibuka di browser: perahu
  dibuat, dinaiki, ditinggalkan, tanpa galat.
- Smoke test otomatis (versi build, 4 profil) — **LULUS**: 177 cek, 0 gagal (HP tegak 68, HP mendatar
  28, HP Rendah 28, komputer 53; v0.13.0: 155). Waktu siap 3,6–5,6 detik. Ketiga profil HP selesai dalam
  satu putaran; putaran itu melewati batas waktu 2 jam di tengah profil komputer (render software lambat
  pada kualitas Tinggi, 30 cek pertamanya sudah lulus), jadi profil komputer dijalankan ulang tersendiri
  sampai selesai. Cek baru / diubah:
  - semua profil: tidak ada jembatan antar-negeri (Jembatan Agung & Perak hilang, 4 dermaga, selat barat
    ≥ 1,5 m & selat utara ≥ 2,8 m); **menyeberang ke Kencana dengan perahu buatan sendiri** (10 kayu →
    Buat perahu 10 m dari tepi air → Naik perahu → berlayar ke barat sampai kandas → Turun di pantai
    Kencana, x −304); mendarat di Dermaga Timur → langsung dihadang & diserang;
  - HP tegak & komputer: serbuan orc menyeberang dengan perahu perang, dihadang & dikalahkan prajurit;
    pendatang turun di Dermaga Timur dan ditanyai di gapura; kalah oleh prajurit → pantai barat Pulau
    Tropis; kalah oleh kesatria → pantai utara Pulau Tropis (13, −207), 35 detik di sana tetap aman;
  - HP tegak: joystick (lari 20,5 m menjauhi kamera, lepas = berhenti, kamera ikut ke arah lari,
    tertahan batang pohon), ketuk tanah tidak berjalan; Pukul batang pohon → +1 kayu; Tas → Buat pancing;
    Mancing → Tarik! → Ikan Belanak; jual ikan di Kios Ikan Bakar (koin 20 → 24); tombol Bicara →
    obrolan (elf berhenti & menghadap, topik dijawab), beri roti (+2 koin), tutup → elf kembali
    berkegiatan & joystick kembali;
  - komputer: klik tanah tidak berjalan (WASD); laut dalam 1,4 m → berenang di permukaan (tidak lagi
    dikembalikan ke pantai), tidak bisa menyerang sambil berenang, berenang kembali → berjalan; obrolan
    lewat G ("di mana pasar?" → "Pasar Aeloria? Di sini tempatnya!"), Escape menutup.
- **Uji terpisah di browser** (Chromium, render software, layar HP tegak & mendatar, Sedang):
  - **joystick & kamera**: jempol di kiri bawah → joystick muncul di situ; dorong ke atas = berjalan
    menjauhi kamera, dorong ke samping = berbelok tanpa berputar-putar, lepas = berhenti; geser jari
    kanan = kamera berputar tanpa memicu jalan; tombol & joystick tidak bertumpuk di kedua orientasi;
  - **air**: berjalan ke laut → berenang (2,4 m/s, pesan petunjuk sekali), kembali ke darat → berjalan;
    4 pukulan ke satu pohon → 3 kayu + "Kayu pohon ini sudah habis…"; Tas → Buat pancing; di tepi
    pantai muncul tombol Mancing & Buat perahu; Mancing → sambaran → Tarik! → Kakap Merah masuk Tas;
    Buat perahu → Naik perahu (tombol muncul ±3 m dari perahu) → berlayar 46 m → Turun di laut lepas →
    terjun ke air & berenang, dengan pesan;
  - **dermaga & serbuan orc**: jembatan yang tersisa hanya sawah, pura, nelayan, wira; 4 dermaga;
    selat barat paling dangkal 1,57 m, selat utara 2,98 m (lebih dalam dari batas berenang 1,15 m);
    perahu perang orc tertambat di pantai barat Pulau Tropis → orc naik → berlayar → mendarat di
    Kencana → berjalan ke gerbang timur;
  - **penyeberangan dengan perahu** dari pantai landai di sebelah Dermaga Barat: perahu dibuat 10 m dari
    tempat berdiri, berlayar ke barat sampai kandas di x −304 (pantai Kencana), turun di air dangkal;
  - **obrolan** (tegak & mendatar): elf Eladra di pasar → tombol "Bicara / Eladra" → panel; elf berhenti
    & membungkuk; "di mana tempa?" → "Tempa Aeloria ada di timur dari sini, kira-kira 110 meter.";
    "namaku Budi, kamu sedang apa?" → "Senang berkenalan, Budi! Namaku Eladra."; Beri roti → "Roti
    Gandum! Kau baik sekali, Budi. Terimalah 3 koin…" (koin 60 → 63); tutup → elf kembali berjalan,
    joystick kembali. Warga Kencana (pedagang pasar Kotaraja): "Panggil saja aku Kang Karta. Aku
    berjualan di pasar Kotaraja. Sayang, prajurit melarang kami berdagang dengan orang asing…";
    "Sampai jumpa" → panel tertutup. Tangkapan layar: pemain & NPC tampak di samping panel (mendatar:
    di kiri panel; tegak: di bawahnya).
- **Ditemukan & diperbaiki saat uji**:
  - menahan joystick ke samping membuat karakter berlari berputar-putar dalam lingkaran kecil (kamera
    mengikuti arah lari terlalu cepat) → kecepatan ikut-belakang dikali cos(selisih arah);
  - jarak pandang 5 km dari kamera rendah: titik mulai Sedang 549 rb segitiga / 92 draw call → jarak
    pandang per kualitas (Sedang 411 rb / 63);
  - tombol Mancing tidak muncul di pantai landai (titik lempar terlalu dekat, airnya masih dangkal) →
    lemparan 5–16 m ke depan, air minimal 0,7 m;
  - tombol Naik perahu tidak muncul karena perahu dibuat 12 m dari pemain (cadiknya ±4,8 m) → jangkauan
    naik 5 m dari pusat perahu, perahu dibuat di air ≥ 0,8 m sedekat mungkin;
  - perahu tidak bisa dibuat dari pasir di sebelah Dermaga Barat (air 0,8 m baru ±8 m dari tepi air) →
    pencarian sampai 16 m (ditemukan smoke test);
  - perahu perang orc berangkat meninggalkan orc ketiga → perahu menunggu orc yang sedang datang (≤ 160 m)
    paling lama 30 detik, orc yang tertinggal menyerah setelah 45 detik;
  - panel obrolan menutupi NPC / pemain, topik terpotong, baris "memberi" tercatat dua kali → kamera ke
    samping keduanya, baris topik tidak menyusut, satu baris; layar mendatar: NPC tertutup panel → titik
    ikut kamera digeser ke kiri panel; gelembung ucapan ganda di belakang panel → hanya ucapan pamit;
  - peta: tulisan "Perahu" menimpa label Dermaga Timur → titik perahu tanpa tulisan, label Dermaga Barat
    di bawah dermaganya;
  - smoke test: titik uji pembuatan perahu ±17 m dari air (pangkal dermaga, bukan tepi air); elf yang
    dipilih skrip berbeda dengan elf terdekat yang dipilih tombol Bicara → skrip diperbaiki.

## Yang sudah diperiksa (v0.13.0 — Kerajaan Elf Aeloria)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (versi build, 4 profil) — **LULUS**: 155 cek, 0 gagal (HP tegak 57, HP mendatar
  25, HP Rendah 25, komputer 48; v0.12.1: 116), ±66 menit. Waktu siap 3,7–5,1 detik. Cek baru:
  - semua profil: 10.000 kesatria + 259 penduduk + 28 anak, 36 kios yang melayani pemain; 347–377 elf
    di sekitar pasar; tombol Belanja di depan Kios Roti → membeli Roti Gandum (koin 60 → 56, masuk
    Tas); Tempa Aeloria: Tombak Elf dibeli & langsung dipakai (jangkauan +0,9 m); ketuk elf di pasar →
    kartu isi pikiran; keributan warga dimulai lalu dilerai kesatria;
  - HP tegak & komputer: memukul kesatria → buron 240 detik, 4–6 kesatria menyerang + 6 mengepung
    (nyawa 100 → 85–95); pedagang tetap melayani buronan; kalah → bangun di (10, −207) dengan nyawa
    100, lalu 35 detik di sana tetap aman; Benteng Aeloria: masuk → 4 penjaga menyerang, keluar →
    berhenti;
  - HP tegak: jurus Penggal pada 5 orc → koin 8 → 47.

  Putaran-putaran sebelumnya GAGAL: satu bug game (kesatria menyerang buronan di ujung selatan
  Jembatan Perak, lihat di bawah), sisanya skrip uji yang terlalu ketat.
- **Halaman pratinjau** (versi lokal artifact, sumber tanpa bundel + model base64): termuat 5,4 detik,
  tanpa galat atau berkas hilang, 10.000 kesatria, tombol Belanja muncul di depan Kios Buah.
- **Uji terpisah di browser** (Chromium, render software, layar HP tegak & mendatar, Sedang):
  - **ekonomi** (waktu dilompati 21 menit): kios yang buka 31–36 dari 36; stok 316 → 589; dibuat
    553 barang, dibeli penduduk 280; stok Tempa naik-turun (zirah sempat habis 0, lalu ditempa lagi).
    Dengan satu pedagang per kios, 7 kios tutup 48–100% waktu; dengan pemilik + pembantu, 31 kios
    buka 100% dan sisanya 85–98%;
  - **toko**: tombol Belanja muncul di depan Kios Roti → panel ("Dilayani Taunia & Tauthiel") →
    beli Roti Madu: koin 60 → 53, stok 3 → 2, masuk Tas, pedagang berkata "Terima kasih!"; koin kurang
    → "Koinmu kurang (2 dari 14). Kalahkan orc untuk mendapat koin."; Tempa: tombak, perisai perak,
    zirah perak, helm elf dibeli & langsung dipakai (efek: serangan ×1,2, jangkauan +0,9 m, menahan
    70%); luka 10 → nyawa berkurang 3; Tas: makan Roti Madu → nyawa 85 → 100; lepas/pakai tombak;
    ketuk kios dari ±10 m → berjalan ke sana, panel terbuka saat tiba; kios yang kedua pedagangnya
    pergi → tombol "kios tutup" + pesan pedagangnya sedang apa; orc dikalahkan → koin +11;
  - **perlengkapan di badan** dipotret dari depan & samping (perisai daun / perak, zirah rantai / perak,
    tombak tegak saat berdiri, pedang perak, helm elf). Versi pertama helm berbentuk piring di
    sekeliling kepala dan tombak mengarah ke samping → diperbaiki;
  - **keributan warga**: dimulai di pasar, 6 penonton berkerumun, kesatria datang melerai setelah
    ±9–10 detik ("Bubar! Bubar semuanya!"), lalu semua kembali berkegiatan;
  - **kerusuhan**: memukul kesatria → pesan musuh kerajaan, 4 penyerang + 5–6 pengepung, nyawa 100 →
    53–60 dalam ±4 detik waktu game; Penggal → 5 elf roboh; memukul warga di tempat warga ramai →
    5 warga & anak kabur, warga yang dipukul terhuyung lalu kabur; pedagang tetap melayani buronan
    (beli roti: koin 200 → 196); kalah → bangun di (10, −206) dengan nyawa penuh, pesan "Kamu
    dikalahkan kesatria Aeloria…"; Benteng: masuk → 4 penjaga menyerang, keluar → berhenti;
  - **kartu isi pikiran**: ketuk elf → "Yavrael | Kesatria Pasukan Bulan · busur | Menuju: makan
    bekal sambil duduk | Suasana hati: biasa saja · Sifat: mudah naik darah, doyan makan" + 5 bar
    kebutuhan; ketuk tanah → kartu tertutup, pemain berjalan;
  - layar mendatar: tombol jurus kini sebaris di bawah; Peta & Tas sebaris, tidak menabrak Pukul.
- **Ditemukan & diperbaiki saat uji**:
  - kesatria yang makan bekal menumpuk di satu titik saat Balai Makan penuh (35 elf dalam 4 × 4 m di
    awal permainan) → kini menyebar 5–24 m; terpadat sekarang 8 per petak (deret kursi makan);
  - tombol jurus di layar mendatar naik miring ke tengah layar (sejak v0.9.0);
  - tombol Tas menabrak tombol Pukul di layar mendatar; tombol Belanja menutupi Cincang untuk nama
    kios yang panjang;
  - kesatria yang berjalan-jalan sampai ujung selatan Jembatan Perak menyerang buronan yang baru
    dibangunkan di sana (nyawa 100 → 22 dalam ±15 detik, lalu kalah lagi) → perburuan hanya di wilayah
    Aeloria; diuji: 58 detik di sana, kesatria lewat sampai 7 m, nyawa tetap 100; rusuh di gapura lalu
    lari ke selatan → pengejar berhenti di perbatasan; masuk lagi → diserang lagi;
  - mengetuk atap kios membuka kartu pedagang di bawahnya → kini membuka tokonya;
  - smoke test: tangkapan layar kadang melewati batas 30 detik di render software sejak dunia
    bertambah besar (normalnya 5–8 detik) → batas waktu 90 detik. Cek Aeloria yang pertama terlalu
    ketat (≥ 8 elf di layar; keributan hanya dicoba di satu titik; status roboh 1,6 detik terlewat
    oleh pengecekan per 5 bingkai) → diperbaiki di skrip uji.

## Yang sudah diperiksa (v0.12.1 — pemain musuh setiap kerajaan)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis — **LULUS**: 116 cek, 0 gagal (HP tegak 43, HP mendatar 19, HP Rendah 19,
  komputer 35). Putaran penuh pertama terpotong batas waktu 50 menit yang saya pasang sendiri, di
  tengah profil komputer (106 cek lolos, 0 gagal sampai titik itu). HP tegak & komputer lalu diulang
  dengan skrip final dan lulus (78 cek).
  - Semua perangkat: menuju Jembatan Agung → dihadang ("Musuh kerajaan! Serang!" / "Bantu! Ada
    penyusup!") dan langsung diserang 2–3 prajurit, tanpa kartu tanya-jawab.
  - HP tegak & komputer: masuk wilayah → langsung diserang 3 prajurit (nyawa turun ke 87–91); jurus
    Putar mengenai prajurit; kalah → dibawa keluar ke x −147 dengan nyawa penuh; masuk lagi →
    diserang lagi; kabur keluar wilayah → prajurit berhenti mengejar; serbuan orc dihadang &
    dikalahkan; pendatang ditanyai di gerbang.
  - Isi dunia sama dengan v0.11.0–v0.12.0. Uji kota & bala tentara memakai gencatan senjata khusus
    pengujian.
- **Uji terpisah di browser** (Chromium, render software, layar HP tegak):
  - dari pantai ke jembatan: dua penjaga kepala jembatan timur berseru dan menyerang di x −157
    (masih di luar wilayah). Peronda jembatan mengambil alih setelah penjaga mengejar ±35 m.
    Pemain pertama terkena di x −178 sampai −197;
  - kabur ke timur: pengejar tertinggal 3–8 m lalu menyerah satu per satu. ±20 detik waktu game
    kemudian muncul "Prajurit Kencana berhenti mengejarmu.";
  - masuk lagi di x −300 → langsung diserang 2 peronda;
  - kalah → bangun di x −146,8 (±12 m dari penjaga). Berdiri di samping penjaga selama masa tenang
    tidak diserang;
  - Penggal di samping penjaga kepala jembatan → 2 penjaga roboh, peronda lain membalas;
  - di pasar → 3 peronda mengepung. Pindah ke Pulau Sawah → penyerang dari pasar menyerah dan
    peronda Pulau Sawah yang menyerang;
  - halaman pratinjau (versi lokal artifact): termuat 3,1 detik, tanpa error / file hilang, tanpa
    kartu tanya-jawab, petunjuk baru tampil, diserang di jembatan.
- **Ditemukan & diperbaiki saat uji**:
  - Pemain yang diburu di separuh timur jembatan (masih di luar wilayah) sambil berjalan masuk
    dianggap kabur setelah 12 detik. Kini "lolos" diukur dari jarak ke pengejar (20 m, 6 detik),
    ditambah batas kejar 35 m di luar wilayah.
  - Prajurit berganti-ganti lari dan jalan saat mengejar pemain yang lari. Kini mereka tetap
    berlari penuh selama sasaran bergerak.
- Beban gambar tidak diukur ulang: hanya logika yang berubah (draw call & jumlah prajurit sama
  dengan v0.12.0).

## Yang sudah diperiksa (v0.12.0 — penjagaan Kerajaan Kencana)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (4 perangkat: HP tegak, HP mendatar, HP Rendah, komputer) — **LULUS** (118 cek,
  0 gagal; v0.11.0: 90 cek). Cek baru:
  - semua perangkat: peronda di 7 wilayah (Rendah 40 / Sedang 64 / Tinggi 96 + 32 penjaga pos) dan
    semuanya berpindah tempat; dicegat & ditanyai di Jembatan Agung (x −266 sampai −306, 5 pilihan
    jawaban); jawaban damai → tamu, lalu lanjut menyeberang;
  - HP tegak & komputer: jawaban kasar → 2–3 prajurit menyerang (nyawa turun ke 92); jurus Putar
    mengenai prajurit (nyawa 10 → 7); kalah → dibawa keluar ke ujung timur Jembatan Agung dengan
    nyawa penuh; serbuan orc dihadang di ujung jembatan dan ketiga orc dikalahkan; pendatang
    ditanyai di gerbang lalu boleh masuk.
  Isi dunia tidak berubah dibanding v0.11.0: 197 rumah, 497 bangunan (500 di Tinggi), 1.668 pohon
  Kencana (2.381 di Tinggi), 16 perahu. Penduduk yang tercatat turun 32 (penjaga pindah ke prajurit).
  Sebelum lulus, smoke test sempat GAGAL dua kali:
  - HP mendatar tidak dicegat (lihat di bawah, sudah diperbaiki);
  - komputer: tangkapan layar kelapa kehabisan waktu sekali; diduga shader prajurit baru disusun saat
    prajurit pertama kali terlihat. Shader kini disiapkan di layar loading (di render software
    pemuatan 0,2–0,6 detik lebih lama: 2,5–4,2 detik), dan putaran berikutnya lulus.
- **Uji terpisah di browser** (Chromium, render software, layar HP tegak & komputer):
  - pencegatan: menyeberangi Jembatan Agung → sepasang peronda mencegat begitu pemain lewat batas
    wilayah → dua pertanyaan → jawaban damai → tamu; prajurit mengangguk lalu kembali bertugas;
  - bermusuhan: jawaban kasar → 3 prajurit menyerang (nyawa 100 → 77 dalam ±6 detik waktu game);
    jurus Putar mengenai ketiganya (nyawa 10→8, 8→3, 9→7), satu roboh dan prajurit lain
    menggantikan; nyawa habis → "Bawa dia keluar dari wilayah kerajaan!" → bangun di ujung timur
    Jembatan Agung (x −158,8) dengan nyawa 100, status asing lagi;
  - serbuan: 3 orc dari perkemahan dekat titik mulai menyeberangi Jembatan Agung; begitu lewat batas
    (x −273) 6 prajurit menghadang dan ketiga orc tumbang;
  - pendatang: dihentikan penjaga di gerbang barat Jembatan Agung, menjawab ("Saya mau mengantar
    ikan asin ke pasar kota."), lalu masuk ke kota.
- **Ditemukan & diperbaiki saat uji**:
  - game membeku saat pukulan prajurit membuat pemain roboh (prajurit ditarik mundur di tengah
    ayunannya sendiri);
  - terlalu kejam: 4 prajurit sekaligus, nyawa 100 → 35 dalam ±6 detik → kini paling banyak 3
    penyerang, 4–5 per pukulan, jeda 1,8–2,6 detik;
  - penjaga pos berjambul merah, sama dengan pemain → kini berjambul hitam;
  - peronda yang diserang orc di separuh timur jembatan (di luar wilayah) tidak membalas → kini
    membela diri dan dibantu pasangannya; orc yang mendekati prajurit langsung dihadang;
  - orc penyerbu terus mengejar prajurit yang sudah pergi, sambil dipukuli → kini selalu menyerang
    lawan terdekat;
  - orc tidak tergambar di mode Lihat pulau bila jauh dari pemain → kini mengikuti titik pandang;
  - kartu tanya-jawab menutupi prajurit → kamera bergeser; di layar mendatar kartu di kanan;
  - jaringan jalan Pulau Wira terputus dari jalan utama → disambung khusus untuk peronda (jalan yang
    dicat & isi dunia tidak berubah);
  - smoke test pertama GAGAL di HP mendatar: pemain tidak dicegat di Jembatan Agung. Pengejar
    (sepasang peronda) datang dari belakang dan lebih lambat dari pemain yang berlari, sementara
    penjaga gerbang di depan tidak ikut; setelah 30 detik pemain dianggap kabur, dikeroyok, dan
    dibawa keluar. Kini pencegat memotong jalan pemain, lebih cepat, prajurit yang lebih dekat ikut
    mencegat, dan berdiri menunggu tidak dihitung kabur (diulang: dicegat setelah 5 detik, bukan 25).
- **Beban gambar** (build, layar HP tegak, kamera 22 m): penjagaan hampir tidak menambah beban —
  Sedang gerbang timur 313 rb segitiga (v0.11.0: 311 rb), pasar 308 rb (309 rb), alun-alun 313 rb
  (312 rb), titik mulai 296 rb (sama). Prajurit bertugas = 3 draw call (+3 bayangan) bila terlihat.
  Tabel lengkap di bagian Performa.

## Yang sudah diperiksa (v0.11.0 — bala tentara di Pulau Wira)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (4 perangkat: HP tegak, HP mendatar, HP Rendah, komputer) — **LULUS** (90 cek,
  0 gagal; v0.10.0: 74 cek), dengan 4 cek baru di tiap perangkat:
  - jumlah: 25.000 prajurit = 5 × 5.000, ditambah 7 senapati; atlas 896×1120 / 1280×1600 /
    1792×2240 (Rendah / Sedang / Tinggi);
  - menyeberangi Jembatan Wira (pijakan terendah 2,15–2,23 m di atas laut);
  - di depan barisan: spanduk "Tegal Wira", 70 / 160 / 320 prajurit 3D di dekat pemain, sisanya
    impostor (jumlahnya selalu tepat 25.000);
  - berjalan lurus ke barisan perisai → tertahan 0,35 m dari tepinya.
  Cek terakhir itu sempat salah sasaran: ia berjalan ke x −268, yaitu lorong tengah yang memang
  bisa dilewati. Kini ia berjalan ke x −300, di dalam barisan.
- **Jumlah prajurit** (dihitung di game): 25.000 = 5.000 perisai + 5.000 tombak + 5.000 pedang +
  5.000 pemanah + 5.000 penunggang kuda, ditambah 7 senapati. Semuanya berdiri di tanah rata 4,2 m.
- **Isi pulau lain tidak berubah** (dicek di Node terhadap v0.10.0, kualitas Rendah/Sedang/Tinggi):
  - tinggi tanah di setiap daratan lama sama persis (selisih 0,000 m);
  - batang pohon Pulau Tropis 885 / 1.074 / 1.203 dan batunya sama letaknya;
  - semua 340 bangunan dan 83 orang di Kencana sama;
  - 80 jalur ketuk acak identik;
  - di Pulau Kencana hanya 0 / 1 / 3 pohon di dekat jalan baru ke Jembatan Wira yang bergeser.
- **Jalan kaki** (browser, peta jalan + collider sungguhan):
  - menyeberangi Jembatan Wira (pijakan terendah 2,28 m);
  - jalur dari titik mulai sampai depan Siti Hinggil ditemukan (12 belokan, 78 ms);
  - jalur juga ditemukan menyusuri lorong tengah sampai belakang barisan, menembus celah antar-pasukan,
    dan ke perkemahan tenda & kandang;
  - berjalan lurus ke barisan perisai → tertahan di tepinya.
- **Dipotret & diperiksa**:
  - barisan dari depan, samping, rendah, dan udara;
  - tiap jenis dari dekat (perisai, tombak, pedang, busur, kuda + tombak, senapati + panji);
  - Siti Hinggil, perkemahan, Jembatan Wira, peta dunia (HP tegak & mendatar).
- **Ditemukan & diperbaiki saat uji**:
  - lingkaran gelap di sekitar pemain — bayangan asli prajurit 3D yang rapat; kini semua prajurit
    memakai bayangan kontak yang sama;
  - prajurit impostor tampak pudar/tembus pandang di pita peralihan — kini 16 arah × 4 sudut
    pandang, dicampur di pita sempit dengan keburaman penuh;
  - prajurit 3D dari kamera jauh tidak perlu — kini hanya bila kamera < 32–55 m;
  - **bolong di barisan saat zoom setengah jauh** (kamera ±30–60 m): ratusan prajurit di sisi jauh
    pemain hilang, hanya bayangannya tersisa (disimulasikan: hingga 380 prajurit di Sedang, 771 di
    Tinggi). Penyebabnya: impostor disembunyikan menurut lingkaran saja, padahal model 3D juga
    dibatasi jarak kamera. Kini shader memakai uji yang sama — 0 bolong di 4 posisi × 26 zoom ×
    16 arah kamera × 3 kualitas, dan dipotret sebelum/sesudah;
  - kuda tampak kemerahan → cokelat tua berkaki gelap;
  - pohon Kencana bisa tumbuh di pantai Pulau Wira → tiap pulau menebar pohon di pulau sendiri saja.

## Yang sudah diperiksa (v0.10.0 — Kepulauan Kencana)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (4 perangkat: HP tegak, HP mendatar, HP Rendah, komputer) — **LULUS** (74 cek),
  termasuk uji baru:
  - kerajaan lengkap: 197 rumah, 340 bangunan (342 di Tinggi: 2 umbul-umbul lagi karena tanah lebih
    halus), 16 perahu; penduduk 203 / 303 / 403 orang (Rendah / Sedang / Tinggi), 115–316 bergerak,
    4–14 terlihat di dekat pasar;
  - menyeberangi Jembatan Agung ±190 m (pijakan terendah 2,15 m di atas laut), spanduk "Kotaraja
    Kencana" di gerbang timur, naik tangga pendopo (lantai 6,5 m), dinding rumah menahan prajurit
    (berhenti 0,35 m), tombol Peta buka/tutup;
  - uji lama (karakter, ketuk-berjalan, memutari pohon, laut dalam, Pukul & 4 jurus, orc, mendaki)
    tetap lulus. Siap dimainkan ±1,2–1,7 detik setelah halaman dibuka (komputer, render software).
- **Pulau Tropis tidak berubah** (dicek di Node terhadap kode v0.9.0, kualitas Rendah/Sedang/Tinggi):
  tinggi tanah di daratan sama, batang pohon 885 / 1.074 / 1.203 sama letaknya kecuali 1–2 kelapa
  tepat di kepala Jembatan Agung, batu sama semua, 60 jalur ketuk acak identik.
- **Bisa dicapai berjalan kaki** dari titik mulai (peta jalan + collider sungguhan, di Node):
  kepala jembatan → seberang Jembatan Agung → gerbang timur → alun-alun → pendopo → pasar → candi →
  gerbang utara → Pulau Sawah → pelabuhan → gerbang barat → Pura Segara → Kampung Nelayan; semua
  sampai di tujuan, cari jalur ≤ 42 ms. Jaringan jalan penduduk 82 simpul, semuanya tersambung
  (sempat terputus di 3 gerbang — ditemukan oleh cek ini dan diperbaiki).
- Uji jalan di browser: menyeberangi Jembatan Agung (pijakan terendah 2,15 m, tidak pernah jatuh ke
  laut), naik tangga pendopo (berdiri di lantai batur 6,5 m), Jembatan Sawah, dorong ke menara/rumah
  → tertahan.
- Percepatan waktu muat yang hasilnya dicek identik: peta jalan 410 → 218 ms (sel & 150 jalur acak
  sama persis), pembuatan bangunan ±540 → ±430 ms (jumlah titik sama: 224.172).
- Dipotret & diperiksa: kepulauan dari udara; gerbang timur dengan penjaga bertombak; pasar dengan
  pedagang & pembeli; alun-alun & beringin; raja bermahkota di singgasana diapit penjaga; deretan
  rumah; candi; Jembatan Agung; peta dunia (komputer & HP); spanduk "Kotaraja Kencana".
- Ditemukan & diperbaiki saat uji: tombak penjaga mendatar (ikut putaran lengan) → kini dipasang pada
  pose diam sehingga tegak; atap pendopo menutupi prajurit → lubang tembus pandang diperlebar di
  bawah atap besar; spanduk/peta bertumpuk dengan petunjuk kontrol → petunjuk disembunyikan; uji
  "Penggal tanpa musuh" sensitif kecepatan render → pesan kini dicatat saat muncul.

## Yang sudah diperiksa (v0.9.0 — musuh orc + 4 jurus)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (4 perangkat) — **LULUS**, termasuk uji baru:
  - 25 orc di 5 perkemahan; yang terdekat ±13–15 m dari titik mulai (berkeliaran);
  - HP: Cincang 10 cincangan → orc di depan roboh; Hentak melompat 1,97 m, pedang menancap
    (retakan), 3 orc terluka; Putar cincang → putar, 3 orc di sekeliling terluka; Penggal 5 orc
    dibidik lalu 5 kepala terpotong, prajurit melesat ±8 m; orc yang roboh muncul lagi utuh;
    Penggal tanpa musuh → pesan, jeda tidak terpakai; semua uji lama tetap lulus;
  - komputer: tombol 1–4 → Cincang, Hentak, Putar, Penggal; uji lama tetap lulus.
- Uji perilaku terpisah: Hentak di 3 orc → 9 nyawa hilang, orc terpental; Putar → 3 orc kena;
  pose Hentak dipotret dari samping: pedang menghadap ke bawah saat turun dan menancap saat mendarat.
- Foto tiap jurus (gerak lambat): sabetan cincang, gelombang kejut + retakan, pusaran putar,
  tanda bidik merah di 5 orc, jejak kilat zig-zag, garis potong di leher, kepala terlempar.
- Ditemukan & diperbaiki saat uji: nama pedang diubah sehingga uji "pedang terpasang" gagal →
  kini memakai referensi, nama asli tetap.
- Performa: dengan satu perkemahan terlihat draw call 37 (sebelumnya 27); orc > 60 m tidak digambar.
- Halaman pratinjau (artifact) diuji dulu sebagai salinan lokal: 25 orc, Penggal memenggal 5.

## Yang sudah diperiksa (v0.8.0 — kombo + 3 jurus)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (4 perangkat) — **LULUS**, termasuk uji baru:
  - HP: kombo Pukul tebas → tinju → tendang; Putar kena batang di sekeliling, jeda 3,9 s, tombol
    menunjukkan "3", ditekan lagi saat jeda tidak berbuat apa-apa; Serbu ke batang 3,2 m di depan →
    berhenti 1,05 m dari pusat batang (tidak menembus) dan menebasnya; Hentak melompat 1,19 m,
    mendarat, gelombang kejut; semua uji lama tetap lulus;
  - komputer: F, lalu 1 / 2 / 3 → Putar, Serbu, Hentak; uji lama tetap lulus.
- Ditemukan & diperbaiki saat uji: pada ±10 FPS Serbuan menembus batang pohon (berakhir 2,28 m di
  belakang batang) → langkah fisika kini maks. ±0,3 m; diulang di 3 batang: berhenti di depan, kena.
- Serbu menghadap laut dari 1 m / 3 m di darat → berhenti di air 0,44 m / 0,20 m, tidak "tenggelam".
- Tata letak tombol diukur: layar tegak (busur) & mendatar (sebaris) tidak menumpuk tombol lain.
- Efek tiap gerakan dipotret pada waktu efek yang tepat; cincin tinju/tendangan dipertebal dan diberi
  tepi gelap setelah terlihat terlalu samar di pasir.
- Halaman pratinjau (artifact) diuji dulu sebagai salinan lokal: Pukul & jurus Putar berjalan.

## Yang sudah diperiksa (v0.7.0 — tombol Pukul, lingkaran hijau dihapus)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (4 perangkat) — **LULUS**, termasuk uji baru:
  - tidak ada lagi lingkaran hijau di scene;
  - HP: Pukul saat berlari → jalan berhenti, 1 sabetan, lalu diam (kecepatan 0); Pukul di depan
    batang pohon → serpihan "pohon" muncul; semua uji lama (ketuk, memutari pohon, laut, Lompat,
    geser, cubit, mode, menu Kualitas) tetap lulus;
  - komputer: tombol F mengayunkan pedang; klik/W/Spasi/tabrakan/laut/mendaki tetap lulus.
- Uji perilaku terpisah: Pukul di tempat lapang → sabetan tanpa serpihan; batang pohon → 16 keping
  kayu & daun; batu besar → 12 keping debu & percikan; tombol Pukul terlihat di HP.
- Efek dipotret pada waktu efek yang tepat (0,04 / 0,1 / 0,18 / 0,3 detik) dari jarak kamera normal
  (22 m): sabetan dan serpihan terbaca.
- Halaman pratinjau (artifact) diuji dulu sebagai salinan lokal: Pukul → mengayun + sabetan.

## Yang sudah diperiksa (v0.6.0 — kamera strategi + ketuk untuk berjalan)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- Smoke test otomatis (Chromium headless, render software, 4 perangkat) — **LULUS**:
  - HP portrait: ketuk tanah → berjalan 10 m, berhenti 0,21 m dari titik ketuk; ketuk di balik
    batang pohon → memutar, jarak terdekat ke batang 1,73 m (tidak menembus); ketuk laut sedalam
    2,1 m → berhenti di air 0,28 m (tidak kembali ke pantai); geser 1 jari memutar kamera 0,72 rad
    tanpa menggerakkan pemain; cubit 22 → 10 m; tombol Lompat 1,06 m; Lihat pulau ↔ Main lagi;
    menu Kualitas.
  - Komputer: klik tanah → sampai 0,24 m dari titik klik; W, Spasi, tertahan batang pohon,
    laut dalam → kembali ke pantai, mendaki +23,9 m dalam 120 frame (fitur lama tetap jalan).
  - HP landscape & HP kualitas Rendah: termuat tanpa error, prajurit berdiri di tanah, rumput muncul.
- Peta jalan diuji di Node dengan pohon & batu sungguhan: 400 tujuan acak di darat semuanya
  terjangkau, 0 jalur menyerempet batang (dicek tiap 0,1 m), 674 batang hutan "ketuk di baliknya"
  semuanya dilewati memutar; grid dibuat ±40 ms, cari jalur median 1,4 ms / maks ±20 ms (puncak).
- Ketuk ke titik di dalam batang kelapa → tujuan mundur ke titik terdekat yang bisa diinjak
  (ditemukan saat uji di kualitas Tinggi; perilaku yang diharapkan).
- Screenshot diperiksa: tampilan awal (tegak & mendatar), cincin tujuan + prajurit berjalan,
  hutan lebat (tajuk berlubang, prajurit terlihat), padang rumput, lereng gunung, zoom 60 m
  (pantai–hutan–laut), berhenti di tepi air setelah mengetuk laut.
- Halaman pratinjau (artifact) diuji dulu sebagai salinan lokal: termuat tanpa error, ketuk → jalan.
- Segitiga per frame di tampilan awal kamera strategi: Rendah ±290 rb, Sedang ±410–425 rb,
  Tinggi ±820 rb; 25–31 draw call.

## Yang sudah diperiksa (v0.5.0)
- `npm run build` berhasil; ESLint dengan konfigurasi repo (`.eslintrc.json`, ESLint 8): 0 error, 0 warning.
- Smoke test otomatis (Chromium headless, render software) — **LULUS**:
  - HP portrait & landscape (Sedang, default HP), HP dengan `?kualitas=rendah`, desktop (Tinggi):
    tanpa error JavaScript, dunia ter-render.
  - Rumput muncul di padang lereng gunung pada semua tingkat kualitas.
  - Data garis pantai valid (ada sisi darat dan laut); foto pantai dua kali berselang 1,5 detik
    menunjukkan ombak bergerak (buih dan tepi air berpindah).
  - Geser 1 jari memutar kamera.
  - Menu Kualitas: panel terbuka, pilih Rendah → halaman dimuat ulang dengan kualitas Rendah.
- Screenshot diperiksa secara visual dari beberapa sudut (pulau penuh, lereng, padang rumput dekat,
  pantai dari laut / dari pasir / dari atas, kelapa dari dekat, dalam hutan) di ketiga tingkat kualitas.
- Peta jarak ke garis pantai diuji angka: nol tepat di garis air, berubah ±1 m per meter (0,987).
- Analisis jangkauan (grid 2 m, batas lereng 1,3, air ≤ 1,3 m): **100% daratan bisa dicapai**
  berjalan kaki dari titik mulai, termasuk puncak gunung 96,5 m (lewat jalur berkelok).
- Smoke test Milestone 2 (per frame): joystick sentuh (pindah ±22 m), tombol Lompat (±1,07 m),
  geser kamera, cubit zoom, tombol Lihat pulau, keyboard W & Spasi, tertahan batang pohon,
  laut dalam → kembali ke pantai + pesan, mendaki lereng (+24 m dalam 120 frame).

## Yang BELUM diperiksa
- **Tampilan pixel art di HP sungguhan** (v0.15.0): ketajaman piksel (skala bulat bergantung
  devicePixelRatio HP), apakah besar piksel Sedang (±2 px) pas, garis tepi, warna & dithering di layar
  HP, terbacanya huruf piksel kecil (nama jurus 9 px, label peta), dan apakah piksel yang "merayap" saat
  kamera bergerak mengganggu. Semua dilihat di Chromium dengan render software (layar Pixel 7 tiruan).
- **FPS v0.15.0 di HP**: seharusnya lebih ringan dari v0.14.0 (piksel yang diwarnai ±8× lebih sedikit
  di Sedang); belum diukur di HP.
- **Kamera tanpa ikut-belakang di HP** (v0.15.0): apakah memutar kamera sendiri terasa nyaman saat lama
  berlari menyamping / berbalik.
- **Rasa joystick & kamera belakang di HP sungguhan** (v0.14.0): besar joystick, zona jempol kiri,
  kecepatan kamera kembali ke belakang, geser kamera dengan jari kanan sambil berjalan, cubit zoom.
  Semua diuji dengan sentuhan tiruan (CDP) di Chromium.
- **FPS dengan kamera rendah di HP** (v0.14.0), terutama di layar mendatar (lebih berat) dan dari
  Dermaga Utara / Pasar Aeloria: jarak pandang Rendah 420 / Sedang 560 / Tinggi 950 m dipilih dari jumlah
  segitiga, belum dari FPS HP. Apakah kabutnya terlalu dekat / terlalu jauh.
- Berenang, mengemudikan perahu, dan waktu **Tarik!** (1,5 detik) di HP sungguhan; getar HP saat ikan
  menyambar (`navigator.vibrate`); perahu tersimpan di localStorage setelah halaman ditutup.
- **Obrolan di HP**: papan ketik HP (apakah menutupi panel / kolom ketik di layar tegak & mendatar),
  dan apakah jawaban NPC terasa masuk akal untuk kalimat-kalimat pengguna sendiri.
- **FPS di Aeloria pada HP sungguhan**: pasar, Balai Makan (paling ramai), Padang Pesta saat pesta,
  dan saat dikeroyok kesatria; juga lama memuat tambahan ("Menghidupkan 10.000 kesatria Aeloria…").
- Apakah elf terasa hidup bagi pengguna, dan apakah harga barang, kekuatan perlengkapan, lama buron
  (4 menit), serta kekuatan kesatria terasa pas.
- Mengetuk elf kecil di layar HP untuk membuka kartunya (radius 38 piksel) — hanya diuji dengan
  sentuhan tiruan.
- Tas & koin tersimpan di browser HP (localStorage) setelah halaman ditutup.
- **Rasa penjagaan di HP sungguhan**: apakah prajurit terlalu kuat/lemah, apakah kota masih enak
  dijelajahi padahal pemain (musuh setiap kerajaan) terus diserang, dan FPS saat dikeroyok atau
  saat serbuan orc.
- **FPS di dekat bala tentara pada HP sungguhan**.
  - Bagian terberat: lorong di tengah barisan (Sedang: 160 prajurit 3D + ±25.000 impostor).
  - Waktu memotret atlas impostor saat dimuat di HP (di komputer ±60 ms CPU; GPU HP belum diukur).
  - Memori tekstur atlas: Rendah 896 × 1.120, Sedang 1.280 × 1.600, Tinggi 1.792 × 2.240 piksel
    + mipmap.
- Apakah pergantian potret impostor saat kamera diputar (pita/lompatan kecil di prajurit jauh) terasa
  mengganggu di layar HP.
- **FPS di kota kerajaan pada HP sungguhan** (bagian paling berat: ±300 penduduk, ±340 bangunan) dan
  waktu loading tambahan untuk membangun kerajaan di HP.
- Apakah ukuran kota dan jumlah penduduk terasa pas saat dimainkan; lebar selat (±85 / ±115 m) untuk
  berenang & berlayar.
- Tampilan tembus pandang tajuk di GPU HP (kini dari kamera di belakang karakter).
- Rasa tombol Pukul & jurus di HP sungguhan (jangkauan jempol ke 5 tombol busur, kecepatan ayunan,
  lama jeda pakai) dan FPS dengan orc di layar.
- **Performa nyata di HP** — FPS di smoke test memakai render software, tidak mewakili HP.
- Gestur cubit (pinch zoom) dua jari di perangkat sungguhan.
- Menu Kualitas di dalam halaman preview (artifact) — memuat ulang halaman di dalam bingkai preview.
- Apakah URL hosting (githack / GitHub Pages) terbuka di HP — tidak bisa diakses dari lingkungan pengembangan.

## Performa (segitiga per frame termasuk bayangan, dari smoke test)
v0.15.0 (pixel art HD), layar HP tegak (Pixel 7), Sedang, versi build, render software; v0.14.0 diukur
bergantian di mesin yang sama (angka segitiga tanpa pass bayangan, seperti `renderer.info` three.js):
| Tempat | Segitiga / draw call | Waktu per bingkai v0.14.0 | v0.15.0 |
|---|---|---|---|
| Titik mulai | 411 rb / 64 | 1.090 ms | 289 ms (3,8× lebih cepat) |
| Pasar Kotaraja | 306 rb / 48 | 696 ms | 162 ms (4,3×) |
| Depan barisan Tegal Wira | 351 rb / 31 | 1.627 ms | 788 ms (2,1×) |
| Pasar Aeloria | 475 rb / 98 | 833 ms | 258 ms (3,2×) |
- Segitiga & draw call tidak berubah (pass pasca-proses +2 segitiga / +1 draw call). Yang berkurang =
  piksel yang diwarnai: Pixel 7 Sedang 217 × 441 = 96 rb piksel seni, v0.14.0 (pixel ratio 1,5)
  618 × 1.259 = 778 rb — ±8× lebih sedikit. Tegal Wira paling sedikit membaik: bagian terberatnya
  25.000 potret impostor (kerja vertex), bukan piksel.
- Waktu siap (komputer 1280 × 720, Tinggi, render software, diukur bergantian): v0.15.0 5,2–5,5 detik,
  v0.14.0 5,0–5,2 detik — tahap membangun dunia sama cepatnya. Smoke test pada build terakhir: HP Rendah
  3,4 detik (331 rb segitiga / 67 draw call di titik mulai), HP mendatar 4,5 detik (600 rb / 118)
  (v0.14.0: 3,6–5,6 detik; putaran 4 profil di atas 4,8–7,8 detik karena ikon masih dibuat di kanvas
  GPU).
- FPS di sini bukan ukuran HP (render software). FPS HP sungguhan belum diukur; seharusnya ikut membaik
  karena HP umumnya dibatasi jumlah piksel yang diwarnai.

v0.14.0, kamera di belakang karakter (jarak 8,2 m), layar HP tegak (Pixel 7), versi build, render
software — angka dalam ribuan segitiga / draw call:
| Tingkat | Titik mulai | Dermaga Barat | Berenang di selat | Berlayar | Gerbang timur | Pasar Kotaraja | Depan barisan | Dermaga Utara (ke Aeloria) | Pasar Aeloria |
|---|---|---|---|---|---|---|---|---|---|
| Rendah (420 m) | 331 / 66 | 322 / 58 | 301 / 56 | 313 / 67 | 330 / 69 | 231 / 43 | 264 / 35 | 302 / 84 | 413 / 97 |
| Sedang (560 m) | 411 / 63 | 416 / 73 | 401 / 69 | 427 / 79 | 406 / 72 | 309 / 51 | 351 / 30 | 453 / 113 | 474 / 96 |
| Tinggi (950 m) | 965 / 105 | 734 / 82 | 703 / 79 | 693 / 83 | 661 / 72 | 823 / 113 | 552 / 34 | 1.180 / 200 | 807 / 108 |
| Sedang, layar mendatar | 600 / 117 | 613 / 109 | 540 / 103 | 562 / 112 | 502 / 94 | 556 / 111 | 387 / 38 | 595 / 168 | 739 / 159 |
- Kamera di belakang karakter melihat jauh lebih banyak daripada kamera strategi 22 m (v0.13.0 Sedang:
  Kencana 296–326 rb, Aeloria 143–256 rb), jadi Sedang kini 309–474 rb. Tanpa batas jarak pandang titik
  mulai Sedang 549 rb / 92 dc. Yang terberat: dari Dermaga Utara menghadap Aeloria (kota + ribuan elf
  jauh di depan kamera) — Tinggi 1,18 jt / 200 dc.
- Layar mendatar melihat ±3× lebih lebar (sudut pandang mendatar ±95° vs ±38° di layar tegak), jadi lebih berat:
  titik mulai Sedang 600 rb / 117 dc (tegak 411 rb / 63). Komputer (1280 × 720, Tinggi): 1,76 jt / 238 dc.
- Waktu siap di render software: 3,6–5,6 detik (v0.13.0: 3,7–5,1 detik).
- FPS di sini bukan ukuran HP (render software, 2–10 FPS). FPS HP sungguhan belum diukur.

v0.13.0 di Aeloria, layar HP tegak (Pixel 7), kamera strategi 22 m (versi build, render software;
dalam kurung: elf model penuh + model jauh yang digambar):
| Tingkat | Gapura | Pasar | Tempa | Balai Makan | Lapangan Latihan | Padang Pesta | Depan Benteng |
|---|---|---|---|---|---|---|---|
| Rendah | 129 rb / 44 dc (9) | 230 rb / 41 dc (21) | 213 rb / 43 dc (15) | 210 rb / 39 dc (19) | 131 rb / 38 dc (35+10) | 146 rb / 38 dc (35+2) | 173 rb / 41 dc (34) |
| Sedang | 151 rb / 38 dc (10) | 225 rb / 34 dc (14) | 220 rb / 38 dc (12) | 256 rb / 39 dc (19) | 143 rb / 34 dc (40) | 174 rb / 40 dc (32) | 185 rb / 36 dc (24) |
| Tinggi | 229 rb / 39 dc (4) | 371 rb / 48 dc (14) | 302 rb / 49 dc (13) | 414 rb / 37 dc (27) | 198 rb / 39 dc (43) | 243 rb / 43 dc (36) | 392 rb / 44 dc (28) |
- Aeloria tidak lebih berat dari Kotaraja Kencana (Sedang 210–326 rb di v0.12.0). Elf digambar per
  bentuk badan (8) × 2 tingkat (penuh & jauh) + barang di tangan; tiap kelompok satu draw call
  instanced, kosong = tidak digambar.
- Biaya JS simulasi 10.000+ elf: 1,4–4 ms per bingkai di komputer uji (memproses kejadian, memilah
  elf yang terlihat, mengisi instance). Penjagaan Aeloria & toko: < 0,2 ms bila tidak ada kerusuhan.
- Waktu siap di render software: 4,3 / 5,2 / 5,6 detik (Rendah / Sedang / Tinggi; v0.12.1: 2,5–4,2
  detik). Tambahannya: membangun Aeloria, memanggang rangka elf, dan menyiapkan 10.000 elf.

v0.12.0, layar HP tegak (Pixel 7), kamera strategi 22 m, pemain sebagai tamu (tanpa tanya-jawab):
| Tingkat | Titik mulai | Jembatan Agung | Gerbang timur | Pasar | Alun-alun | Depan barisan |
|---|---|---|---|---|---|---|
| Rendah | 262 rb / 56 dc | 177 rb / 30 dc | 269 rb / 42 dc | 272 rb / 45 dc | 260 rb / 42 dc | 253 rb / 31 dc |
| Sedang | 296 rb / 51 dc | 210 rb / 28 dc | 313 rb / 44 dc | 308 rb / 37 dc | 313 rb / 45 dc | 326 rb / 26 dc |
| Tinggi | 574 rb / 59 dc | 402 rb / 33 dc | 524 rb / 41 dc | 458 rb / 44 dc | 524 rb / 44 dc | 526 rb / 39 dc |
- Prajurit bertugas: Rendah 72 / Sedang 96 / Tinggi 128 orang, hanya yang dekat & di layar yang
  digambar (biasanya 0–6). Logika semuanya tetap berjalan tiap frame (ringan: gerak sepanjang
  ruas jalan; pencarian jalur dibatasi 2 per frame).
- Waktu siap di komputer (render software, smoke test): 2,5–4,2 detik (v0.11.0: 1,9–3,7 detik),
  termasuk menyiapkan shader prajurit bertugas.

v0.11.0 di sekitar bala tentara, layar HP tegak (Pixel 7), kamera strategi 22 m:
| Tingkat | Ujung Jembatan Wira | Depan barisan | Lorong tengah | Sayap kavaleri | Zoom jauh 60 m |
|---|---|---|---|---|---|
| Rendah | 273 rb / 36 dc | 221 rb / 34 dc | 240 rb / 30 dc (70 prajurit 3D) | 254 rb / 33 dc | 224 rb / 35 dc |
| Sedang | 296 rb / 30 dc | 245 rb / 29 dc | 320 rb / 26 dc (160 prajurit 3D) | 296 rb / 27 dc | 265 rb / 30 dc |
| Tinggi | 467 rb / 42 dc | 386 rb / 44 dc | 492 rb / 39 dc (320 prajurit 3D) | 523 rb / 37 dc | 393 rb / 46 dc |
- Seluruh barisan: 1 draw call impostor + 1 bayangan kontak + 6 jenis prajurit 3D. Bila Pulau Wira
  tidak di layar, barisan tidak digambar sama sekali.
- Titik mulai: Rendah 262 rb, Sedang 296 rb, Tinggi 574 rb (v0.10.0: 252 / 277 / 548 rb).
- Kota kerajaan (Sedang): gerbang timur 311 rb, pasar 309 rb, alun-alun 312 rb.
- Waktu siap di komputer (render software, smoke test): 1,9–3,7 detik (v0.10.0: ±1,2–1,7 detik).
  Tambahannya terutama pemotretan atlas impostor yang dikerjakan CPU di render software.

v0.10.0, layar HP tegak (Pixel 7), kamera strategi 22 m — kota kerajaan tidak lebih berat dari
Pulau Tropis karena terrain, laut, dan bangunan kini dipecah per petak:
| Tingkat | Titik mulai | Gerbang timur | Pasar | Alun-alun | Deret rumah | Jembatan Agung |
|---|---|---|---|---|---|---|
| Rendah | 252 rb / 53 dc | 252 rb / 40 dc | 160 rb / 31 dc | 244 rb / 41 dc | 182 rb / 32 dc | 159 rb / 26 dc |
| Sedang | 277 rb / 48 dc | 292 rb / 42 dc | 193 rb / 29 dc | 296 rb / 44 dc | 259 rb / 39 dc | 191 rb / 27 dc |
| Tinggi | 548 rb / 52 dc | 495 rb / 37 dc | 284 rb / 25 dc | 511 rb / 42 dc | 408 rb / 39 dc | 373 rb / 30 dc |
(dc = draw call). Titik mulai Sedang turun dari ±420 rb (v0.9.0) ke 277 rb. Waktu membangun dunia
di komputer (Node): terrain 137 ms, data pantai 174 ms, rencana+masker kerajaan ±110 ms, bangunan &
pohon kerajaan ±430 ms, peta jalan 218 ms — di HP diperkirakan 3–5× lebih lama (belum diukur).

Sebelumnya (seluruh pulau terlihat):
| Tingkat | Pulau penuh | Draw call |
|---|---|---|
| Rendah | ±330 ribu | ±31 |
| Sedang (default HP) | ±475 ribu | ±31 |
| Tinggi (default komputer) | ±980 ribu | ±31 |
v0.3.0: Rendah ±300 rb, Sedang ±400 rb, Tinggi ±850 rb. Tambahan v0.4.0 berasal dari mesh laut
yang lebih rapat (untuk ombak) dan buah kelapa. v0.2.0 (HP): ±230 ribu.

## Masalah yang diketahui
- (v0.15.0) Tanpa antialias (gaya pixel art), tepi benda "merayap" saat kamera bergerak, dan benda yang
  lebih tipis dari satu piksel (tiang, tali layar, helai rumput jauh) bisa putus-putus atau berkedip di
  kejauhan. Tinggi (piksel 1,6 px) paling sedikit, Rendah (2,4 px) paling terasa.
- (v0.15.0) UI tetap HTML di atas gambar dunia: piksel UI selalu 2 px CSS, sedikit berbeda dari piksel
  dunia di Rendah / Tinggi. Bila huruf piksel belum termuat (koneksi lambat), tulisan sesaat memakai
  huruf sistem.
- (v0.15.0) Layar mendatar: selama petunjuk kontrol tampil (≤ 12 detik atau sampai pemain bergerak)
  kotaknya menutupi sebagian tombol Kualitas & Lihat pulau — sudah begitu di v0.14.0 pada layar uji
  (lebar petunjuk 46% layar), tata letaknya tidak diubah.
- (v0.15.0) Label tempat di Peta tetap kecil (±6 px CSS) seperti sebelumnya, kini berhuruf piksel.
- (v0.14.0) Obrolan berbasis aturan: NPC hanya memahami topik yang dikenalnya (nama, kabar, kegiatan,
  pekerjaan, kerajaan, orc, tempat & arah, makanan, menyeberang, ikan, cerita, lelucon, saran, salam,
  terima kasih, pujian / hinaan); kalimat lain dijawab umum. Ingatan NPC hilang bila halaman dimuat
  ulang. Warga Kencana mendapat bentuk badan acak tiap halaman dimuat, jadi nama / jenis kelaminnya bisa
  berbeda di kunjungan berikutnya. Prajurit dan bala tentara tidak bisa diajak bicara.
- (v0.14.0) Berenang tanpa stamina: pemain bisa berenang ke mana saja di dalam batas dunia. Pengejar
  berhenti di tepi air, jadi berenang menjauh selalu meloloskan diri (sengaja, DECISIONS #58).
- (v0.14.0) Hanya satu perahu pemain; membuat lagi meninggalkan yang lama. Perahu terapung dengan
  goyangan sederhana (tidak mengikuti ombak), tidak bertabrakan dengan perahu hiasan / kapal, dan tidak
  bisa membawa NPC. Perahu & kapal di dermaga hanya hiasan (tidak berlayar); perahu perang orc
  satu-satunya perahu NPC yang berlayar.
- (v0.14.0) Pohon tidak tumbang atau berubah saat kayunya diambil (3 kayu per pohon, tumbuh lagi ±3
  menit). Ikan tidak terlihat di air: jenisnya hanya ditentukan kedalaman di pelampung.
- (v0.14.0) Kamera belakang karakter tidak menghindari batu, bangunan, atau tajuk pohon (hanya bukit
  & air); tajuk & bangunan di antara kamera dan pemain dibuat berlubang seperti sebelumnya.
- (v0.14.0) Kamera rendah melihat lebih banyak daripada kamera strategi: Sedang kini 309–474 rb segitiga
  di layar tegak dan 387–739 rb di layar mendatar (v0.13.0: 143–326 rb). Bila tersendat di HP: pilih
  Rendah, atau mainkan dengan layar tegak.
- (v0.13.0) Kesatria pemanah tidak ikut bertarung (belum ada panah yang terbang); di lajur panahan
  anak panahnya juga belum digambar. Yang melawan pemain hanya kesatria berpedang & bertombak, dan
  warga pemberani dengan tangan kosong.
- (v0.13.0) Elf yang berjalan tidak saling menghindar (bisa berpapasan menembus satu sama lain); yang
  sedang bertarung, kabur, atau menonton keributan saling mendorong sederhana dan bisa berdesakan.
- (v0.13.0) Belum ada siang–malam: kios buka selama pedagangnya berjaga, bukan menurut jam. Harga
  barang tetap (belum naik-turun menurut stok).
- (v0.13.0) Status buron Aeloria tidak disimpan (hilang bila halaman dimuat ulang); koin & isi tas
  disimpan di browser. Elf tidak mengingat pemain secara pribadi (tidak ada dendam per elf).
- (v0.13.0) Keributan warga hanya terjadi di dekat pemain; di tempat lain Aeloria tidak ada keributan.
- (v0.13.0) Perlengkapan di badan berbentuk balok/kerucut sederhana; jambul merah helm prajurit tetap
  terlihat di bawah Helm Elf. Model elf jauh tidak membawa barang di tangan.
- (v0.13.0) Di Balai Makan yang penuh, ratusan kesatria makan bekal di sekitar pergola, jadi kawasan
  itu sangat ramai (sudah tidak menumpuk di satu titik).
- (v0.13.0) Prajurit Kencana dan kesatria Aeloria tidak saling berinteraksi; orc tidak menyerbu
  Aeloria.
- (v0.12.0) Prajurit, orc, dan pemain hanya saling mendorong sederhana: saat ramai mereka bisa
  berdesakan rapat. Prajurit belum punya serangan jarak jauh (pemanah di barisan tetap diam).
- (v0.12.0) Penduduk tidak bereaksi pada perkelahian (tidak lari menjauh). Orc penyerbu yang lolos
  ke kota hanya berkeliaran sebentar lalu pulang.
- (v0.12.1) Bala tentara 25.000 prajurit di Tegal Wira tetap berbaris dan tidak ikut menyerang
  pemain; yang menyerang hanya prajurit bertugas (peronda & penjaga pos).
- (v0.12.1) Karena pemain selalu musuh, menjelajahi kota berarti terus bertarung; belum ada cara
  menyelinap atau bersembunyi.
- (v0.12.0) Nyawa kembali penuh bila halaman dimuat ulang (belum ada simpan progres). Belum ada
  suara.
- (v0.11.0) Prajurit jauh = potret (impostor): saat kamera diputar, potretnya berganti tiap 22,5°;
  di pita peralihan bentuknya sedikit bercampur.
- (v0.11.0) Bala tentara berdiri di tempat: belum berbaris jalan, belum bereaksi pada prajurit, dan
  belum bisa diajak bicara atau diperintah. Pukulan ke barisan hanya memercikkan percikan logam.
- (v0.11.0) Dari depan persis, kepala kuda menutupi badan penunggangnya (kuda Kenney sempit dan
  tinggi lehernya); dari samping/atas terlihat jelas.
- (v0.11.0) Pemuatan bertambah ±1 detik di komputer.
- (v0.10.0) Penduduk tidak saling menghindar (bisa berpapasan menembus satu sama lain) dan berjalan
  di jaringan jalan saja (tidak masuk rumah). Rumah belum bisa dimasuki (tanpa interior).
- (v0.10.0) Penduduk tidak bereaksi terhadap pukulan/jurus (bukan musuh — pukulan menembus mereka).
  (Sejak v0.14.0 bisa diajak bicara.)
- (v0.10.0) Sawah digambar di permukaan tanah (petak & pematang dari shader), belum bertingkat
  (terasering) dan belum ada airnya yang memantulkan langit.
- (v0.10.0) Dari kamera atas, bangunan tinggi di dekat kamera dibuat berlubang (dithering) seperti
  tajuk pohon; atap rumah biasa tidak bisa disembunyikan seluruhnya.
- (v0.10.0) Peta dunia hanya untuk dilihat (belum bisa mengetuk peta untuk berjalan ke sana).
- Ukuran unduhan ±1,6 MB: bundle ±800 KB (±230 KB gzip, sebagian besar Three.js; v0.9.0 ±720 KB)
  + model .glb ±790 KB (penduduk.glb 365 KB baru di v0.10.0). Bisa dikecilkan nanti bila loading lambat.
- Tepi luar dunia (1.625 × 1.000 m) bisa terlihat samar di bawah air dari sudut tertentu (mode Lihat
  pulau dari jauh); di luar tepi itu laut datar tanpa ombak.
- Rumput hanya dibuat di sekitar kamera: saat kamera melompat jauh (zoom cepat), rumput "tumbuh"
  dalam ±1 detik. Dari jauh (> radius rumput) lereng hanya berwarna, tanpa helai.
- Tajuk pohon tetap bergaya low-poly (bersegi) pada Rendah/Sedang.
- Ganti tingkat kualitas memuat ulang halaman (posisi pemain kembali ke awal).
- Ombak tidak memakai fisika sungguhan: bentuknya diatur fungsi (hanya tampilan — pemain yang berenang
  dan perahu tidak diayun ombak). Di teluk yang sempit puncak ombak dari dua sisi bisa bertemu membentuk
  sudut.
- Buah kelapa sama di semua pohon (satu bentuk tandan); belum ada kelapa jatuh di pasir.
- Rumput dan semak belum bereaksi saat dilewati karakter.
- Kecepatan animasi kaki disetel kira-kira (belum dicek per frame apakah kaki "meluncur").
- Kamera selalu mengikuti prajurit (tidak bisa digeser bebas seperti peta); untuk melihat-lihat pakai
  **Lihat pulau**.
- Jalur (ketuk kios, Ajak bicara) dihitung di grid 2 m: celah sangat sempit di antara batang/batu
  (< ±1 m) dianggap tertutup.
- Batu besar tidak ikut tembus pandang.
- Pukulan & jurus belum berpengaruh pada apa pun (belum ada musuh, nyawa, atau kerusakan) dan belum
  ada suara; serpihan hanya efek sesaat. Prajurit menyerang ke arah hadapnya (tidak otomatis
  menghadap sasaran terdekat). Rumput, semak, dan bunga tidak bereaksi saat dipukul.
- Paket animasi tidak punya gerakan berputar/melesat/menghantam: Putar memakai ayunan pedang yang
  diperlambat sambil badan diputar, Serbu memakai animasi lari, Hentak memakai animasi lompat +
  ayunan. Cukup terbaca dari kamera atas, tetapi dari dekat terlihat sederhana.
- Orc belum menyerang dan prajurit belum punya nyawa; orc juga belum mengejar — mereka hanya menoleh.
- Orc di bawah tajuk pohon bisa tertutup dari kamera atas (bar nyawa & tanda bidik tetap terlihat).
- Paket animasi tidak punya gerakan menusuk ke bawah/memenggal: Hentak & Penggal memakai pose yang
  ditahan + pedang diputar di kode — terbaca dari atas, tetapi dari dekat masih sederhana.
- Jalur kilat Penggal lurus antar-orc dan bisa melewati batang pohon (gerak seketika, tidak tertahan).
