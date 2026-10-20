# PROJECT_STATUS — Pulau Tropis

**Milestone aktif:** 3 — Pembangunan dunia (v0.12.0: penjagaan Kerajaan Kencana — peronda, cegat & tanya, dilawan — menunggu umpan balik dari HP).
Pengembangan karakter/jurus dihentikan sementara atas permintaan pengguna.
**Versi:** 0.12.0
**Terakhir diperbarui:** 2026-10-20

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
| Kamera strategi dari atas (putar, zoom 10–60 m, tidak menembus bukit) — menggantikan kamera orang ketiga | ✅ selesai (v0.6.0) |
| Ketuk tanah untuk berjalan (jalur memutari pohon/batu/tebing/laut dalam) — menggantikan joystick | ✅ selesai (v0.6.0) |
| Penanda tujuan, tajuk pohon tembus pandang di depan kamera (lingkaran hijau dihapus v0.7.0) | ✅ selesai |
| Tombol Pukul: ayunan pedang + efek sabetan/serpihan (belum ada musuh/kerusakan) | ✅ selesai (v0.7.0) |
| Variasi serangan: kombo tebas → tinju → tendang + jurus ber-jeda pakai | ✅ selesai (v0.8.0) |
| Musuh orc (5 perkemahan, nyawa, terpental, roboh, muncul lagi) — belum menyerang | ✅ selesai (v0.9.0) |
| 4 jurus: Cincang 10×, Hentak tancap, Cincang lalu Putar, Penggal 5 leher | ✅ selesai (v0.9.0) |
| Tombol Lompat, geser kamera, cubit zoom | ✅ selesai |
| Kontrol mouse + keyboard (komputer): klik = jalan, WASD tetap bisa | ✅ selesai |
| Gravitasi, lompat, batas lereng, tabrakan batang pohon & batu besar | ✅ selesai |
| Respawn: laut dalam / terlalu jauh → kembali ke posisi aman | ✅ selesai |
| Map bisa dijelajahi (pantai, hutan, padang, lereng gunung, puncak) | ✅ analisis + uji otomatis |
| Dicoba di HP Android sungguhan | ⏳ menunggu laporan pengguna |

## Milestone 3 — status
| Item | Status |
|---|---|
| Dunia diperluas ke barat (terrain, laut, ombak, peta jalan untuk beberapa pulau) | ✅ selesai (v0.10.0) |
| Pulau Kencana + Kotaraja Kencana: tembok, gerbang, ±160 rumah, keraton, alun-alun, pasar, candi | ✅ selesai (v0.10.0) |
| Pulau kecil: Pulau Sawah, Pulau Nelayan, Pulau Pura | ✅ selesai (v0.10.0) |
| Jembatan Agung + 3 jembatan kayu, dermaga & pelabuhan (bisa diinjak) | ✅ selesai (v0.10.0) |
| Penduduk kerajaan (berjalan, berdagang, bertani, penjaga, raja) | ✅ selesai (v0.10.0) |
| Jalan, sawah, lantai batu, rumput alun-alun; pohon khas (beringin, kamboja, pisang, mangga) | ✅ selesai (v0.10.0) |
| Peta dunia + spanduk nama wilayah (bagian Milestone 6, dibuat lebih awal) | ✅ selesai (v0.10.0) |
| Pulau Wira + Jembatan Wira, Siti Hinggil, perkemahan (tenda, kandang kuda) | ✅ selesai (v0.11.0) |
| Bala tentara 25.000 prajurit siap tempur (5 pasukan × 5.000) + 7 senapati | ✅ selesai (v0.11.0) |
| Prajurit peronda di semua wilayah kerajaan + penjaga pos yang bertugas | ✅ selesai (v0.12.0) |
| Orang asing dicegat & ditanyai (kartu tanya-jawab), dilawan bila bermusuhan; nyawa pemain | ✅ selesai (v0.12.0) |
| Serbuan orc lewat Jembatan Agung dihadang prajurit; pendatang ditanyai di gerbang | ✅ selesai (v0.12.0) |
| Sungai & air terjun, gua, reruntuhan | ⏳ belum |
| Dicoba di HP Android sungguhan | ⏳ menunggu laporan pengguna |

## Yang sudah diperiksa (v0.12.0 — penjagaan Kerajaan Kencana)
- `npm run build` berhasil; ESLint (konfigurasi repo): 0 error, 0 warning.
- SMOKE_V012
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
    dicat & isi dunia tidak berubah).
- PERF_V012

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
- **Rasa penjagaan di HP sungguhan**: apakah prajurit terlalu kuat/lemah, apakah tanya-jawab
  terlalu sering (ditanyai lagi tiap masuk setelah ±20 detik di luar wilayah), apakah tombol
  pilihan jawaban mudah diketuk, dan FPS saat dikeroyok atau saat serbuan orc.
- **FPS di dekat bala tentara pada HP sungguhan**.
  - Bagian terberat: lorong di tengah barisan (Sedang: 160 prajurit 3D + ±25.000 impostor).
  - Waktu memotret atlas impostor saat dimuat di HP (di komputer ±60 ms CPU; GPU HP belum diukur).
  - Memori tekstur atlas: Rendah 896 × 1.120, Sedang 1.280 × 1.600, Tinggi 1.792 × 2.240 piksel
    + mipmap.
- Apakah pergantian potret impostor saat kamera diputar (pita/lompatan kecil di prajurit jauh) terasa
  mengganggu di layar HP.
- **FPS di kota kerajaan pada HP sungguhan** (bagian paling berat: ±300 penduduk, ±340 bangunan) dan
  waktu loading tambahan untuk membangun kerajaan di HP.
- Apakah ukuran kota, panjang Jembatan Agung (±160 m, ±30 detik berlari), dan jumlah penduduk terasa
  pas saat dimainkan.
- **Rasa kontrol ketuk di HP sungguhan** (ketepatan titik ketuk, beda ketuk vs geser, cubit) dan
  tampilan tembus pandang tajuk di GPU HP — hanya diuji dengan sentuhan tiruan di Chromium.
- Rasa tombol Pukul & jurus di HP sungguhan (jangkauan jempol ke 5 tombol busur, kecepatan ayunan,
  lama jeda pakai) dan FPS dengan orc di layar.
- **Performa nyata di HP** — FPS di smoke test memakai render software, tidak mewakili HP.
- Gestur cubit (pinch zoom) dua jari di perangkat sungguhan.
- Menu Kualitas di dalam halaman preview (artifact) — memuat ulang halaman di dalam bingkai preview.
- Apakah URL hosting (githack / GitHub Pages) terbuka di HP — tidak bisa diakses dari lingkungan pengembangan.

## Performa (segitiga per frame termasuk bayangan, dari smoke test)
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
- Waktu siap di komputer (render software, smoke test): ±2–3,5 detik (v0.10.0: ±1,2–1,7 detik).
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
- (v0.12.0) Prajurit, orc, dan pemain hanya saling mendorong sederhana: saat ramai mereka bisa
  berdesakan rapat. Prajurit belum punya serangan jarak jauh (pemanah di barisan tetap diam).
- (v0.12.0) Penduduk tidak bereaksi pada perkelahian (tidak lari menjauh). Orc penyerbu yang lolos
  ke kota hanya berkeliaran sebentar lalu pulang.
- (v0.12.0) Selama ditanyai pemain tidak bisa bergerak sampai memilih jawaban (disengaja).
- (v0.12.0) Status tamu/musuh dan nyawa kembali ke awal bila halaman dimuat ulang (belum ada simpan
  progres). Belum ada suara.
- (v0.11.0) Prajurit jauh = potret (impostor): saat kamera diputar, potretnya berganti tiap 22,5°;
  di pita peralihan bentuknya sedikit bercampur.
- (v0.11.0) Bala tentara berdiri di tempat: belum berbaris jalan, belum bereaksi pada prajurit, dan
  belum bisa diajak bicara atau diperintah. Pukulan ke barisan hanya memercikkan percikan logam.
- (v0.11.0) Dari depan persis, kepala kuda menutupi badan penunggangnya (kuda Kenney sempit dan
  tinggi lehernya); dari samping/atas terlihat jelas.
- (v0.11.0) Pemuatan bertambah ±1 detik di komputer.
- (v0.10.0) Penduduk tidak saling menghindar (bisa berpapasan menembus satu sama lain) dan berjalan
  di jaringan jalan saja (tidak masuk rumah). Rumah belum bisa dimasuki (tanpa interior).
- (v0.10.0) Penduduk tidak bereaksi terhadap pukulan/jurus (bukan musuh — pukulan menembus mereka);
  belum bisa diajak bicara (dialog = Milestone 4).
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
- Ombak tidak memakai fisika sungguhan: bentuknya diatur fungsi (cukup untuk tampilan, belum untuk
  berenang/perahu). Di teluk yang sempit puncak ombak dari dua sisi bisa bertemu membentuk sudut.
- Buah kelapa sama di semua pohon (satu bentuk tandan); belum ada kelapa jatuh di pasir.
- Belum ada berenang: dengan ketuk-berjalan pemain berhenti di air dangkal; laut dalam hanya bisa
  dimasuki lewat keyboard (lalu kembali ke pantai).
- Rumput dan semak belum bereaksi saat dilewati karakter.
- Kecepatan animasi kaki disetel kira-kira (belum dicek per frame apakah kaki "meluncur").
- Kamera strategi selalu mengikuti prajurit (tidak bisa digeser bebas seperti peta); untuk
  melihat-lihat pakai **Lihat pulau**. Titik yang bisa diketuk terbatas pada yang terlihat di layar
  (zoom keluar untuk tujuan jauh).
- Jalur dihitung di grid 2 m: celah sangat sempit di antara batang/batu (< ±1 m) dianggap tertutup;
  mengetuk tajuk pohon memilih tanah di bawah/di balik tajuk.
- Batu besar tidak ikut tembus pandang (jarang menutupi prajurit karena kamera dari atas).
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
