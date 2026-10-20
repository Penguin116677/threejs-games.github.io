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
desktop). Satu putaran penuh ±1 jam di render software.

Penduduk kerajaan (`public/models/penduduk.glb`) dibuat ulang dari paket Kenney "Mini Characters"
dengan `python3 scripts/pack-penduduk.py "<folder GLB format>" public/models/penduduk.glb`.

## Kualitas grafis
- Di game: tombol **Kualitas** (kanan atas) → Rendah / Sedang / Tinggi. Pilihan disimpan.
- Lewat alamat: `?kualitas=rendah|sedang|tinggi` (atau `#kualitas=…`).
- Default: HP → Sedang, komputer → Tinggi.

## Daftar uji manual — Milestone 1 (di HP)
1. Buka URL → layar "Memuat pulau…" muncul lalu pulau tampil (tidak ada layar merah error).
2. Pulau terlihat: pantai pasir, air toska di tepi, laut biru, gunung, langit biru.
3. Geser 1 jari → kamera berputar mengelilingi pulau.
4. Cubit 2 jari → zoom masuk/keluar. Geser 2 jari → kamera bergeser.
5. Kamera tidak bisa menembus tanah atau masuk ke bawah laut.
6. Putar HP (portrait ↔ landscape) → tampilan menyesuaikan tanpa terpotong/meregang.
7. Tombol "Layar penuh" → masuk/keluar layar penuh.
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
4. Ketuk **Kualitas** → pilih Rendah, lalu Tinggi → game dimuat ulang dan label berubah.
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

## Daftar uji manual — v0.6.0 (kamera strategi + ketuk untuk berjalan)
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
