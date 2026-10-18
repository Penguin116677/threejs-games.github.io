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

Laporkan: model HP, angka FPS di tiap tingkat kualitas, screenshot, dan langkah yang gagal.
