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
software dan **tidak** mencerminkan performa HP.

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

Laporkan: model HP, angka FPS di tiap tingkat kualitas, screenshot, dan langkah yang gagal.
