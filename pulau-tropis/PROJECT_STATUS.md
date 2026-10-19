# PROJECT_STATUS — Pulau Tropis

**Milestone aktif:** 2 — Karakter dan eksplorasi (kamera & kontrol diubah ke gaya game strategi di v0.6.0, menunggu umpan balik dari HP)
**Versi:** 0.6.0
**Terakhir diperbarui:** 2026-10-19

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
| Penanda tujuan + cincin prajurit, tajuk pohon tembus pandang di depan kamera | ✅ selesai (v0.6.0) |
| Tombol Lompat, geser kamera, cubit zoom | ✅ selesai |
| Kontrol mouse + keyboard (komputer): klik = jalan, WASD tetap bisa | ✅ selesai |
| Gravitasi, lompat, batas lereng, tabrakan batang pohon & batu besar | ✅ selesai |
| Respawn: laut dalam / terlalu jauh → kembali ke posisi aman | ✅ selesai |
| Map bisa dijelajahi (pantai, hutan, padang, lereng gunung, puncak) | ✅ analisis + uji otomatis |
| Dicoba di HP Android sungguhan | ⏳ menunggu laporan pengguna |

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
- **Rasa kontrol ketuk di HP sungguhan** (ketepatan titik ketuk, beda ketuk vs geser, cubit) dan
  tampilan tembus pandang tajuk di GPU HP — hanya diuji dengan sentuhan tiruan di Chromium.
- **Performa nyata di HP** — FPS di smoke test memakai render software, tidak mewakili HP.
- Gestur cubit (pinch zoom) dua jari di perangkat sungguhan.
- Menu Kualitas di dalam halaman preview (artifact) — memuat ulang halaman di dalam bingkai preview.
- Apakah URL hosting (githack / GitHub Pages) terbuka di HP — tidak bisa diakses dari lingkungan pengembangan.

## Performa (segitiga per frame termasuk bayangan, dari smoke test)
| Tingkat | Pulau penuh | Draw call |
|---|---|---|
| Rendah | ±330 ribu | ±31 |
| Sedang (default HP) | ±475 ribu | ±31 |
| Tinggi (default komputer) | ±980 ribu | ±31 |
v0.3.0: Rendah ±300 rb, Sedang ±400 rb, Tinggi ±850 rb. Tambahan v0.4.0 berasal dari mesh laut
yang lebih rapat (untuk ombak) dan buah kelapa. v0.2.0 (HP): ±230 ribu.

## Masalah yang diketahui
- Ukuran bundle ±700 KB (sebagian besar Three.js). Bisa dikecilkan nanti bila loading lambat.
- Tepi luar terrain (1000 × 1000 m) bisa terlihat samar di bawah air dari sudut tertentu.
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
