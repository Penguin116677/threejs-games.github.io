# PROJECT_STATUS — Pulau Tropis

**Milestone aktif:** 1 — Fondasi game (selesai + tambahan pohon, rumput, dan peningkatan kualitas; menunggu umpan balik dari HP)
**Versi:** 0.3.0
**Terakhir diperbarui:** 2026-10-18

## Kondisi awal repository (sebelum Milestone 1)
- Repository `threejs-games.github.io` berisi koleksi contoh Three.js lama (folder `examples/`,
  `core/`, `libs/`) yang dijalankan tanpa build tool. Belum ada proyek game pulau.
- Game baru dibuat terpisah di folder `pulau-tropis/` agar contoh-contoh lama tidak tersentuh.

## Milestone 1 — status
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
| UI dasar berbahasa Indonesia (judul, FPS, layar penuh, petunjuk) | ✅ selesai |
| Pesan error tampil di layar (tanpa konsol) | ✅ selesai |
| Dibuka di browser HP Android sungguhan | ⏳ belum diverifikasi — menunggu laporan pengguna |

## Yang sudah diperiksa (v0.3.0)
- `npm run build` berhasil; ESLint dengan konfigurasi repo (`.eslintrc.json`, ESLint 8): 0 error, 0 warning.
- Smoke test otomatis (Chromium headless, render software) — **LULUS**:
  - HP portrait & landscape (Sedang, default HP), HP dengan `?kualitas=rendah`, desktop (Tinggi):
    tanpa error JavaScript, dunia ter-render.
  - Rumput muncul di padang lereng gunung pada semua tingkat kualitas.
  - Geser 1 jari memutar kamera.
  - Menu Kualitas: panel terbuka, pilih Rendah → halaman dimuat ulang dengan kualitas Rendah.
- Screenshot diperiksa secara visual dari beberapa sudut (pulau penuh, lereng, padang rumput dekat,
  pantai, kelapa, dalam hutan) di ketiga tingkat kualitas.

## Yang BELUM diperiksa
- **Performa nyata di HP** — FPS di smoke test memakai render software, tidak mewakili HP.
- Gestur cubit (pinch zoom) dua jari di perangkat sungguhan.
- Menu Kualitas di dalam halaman preview (artifact) — memuat ulang halaman di dalam bingkai preview.
- Apakah URL hosting (githack / GitHub Pages) terbuka di HP — tidak bisa diakses dari lingkungan pengembangan.

## Performa (segitiga per frame termasuk bayangan, dari smoke test)
| Tingkat | Pulau penuh | Dekat di padang rumput | Draw call |
|---|---|---|---|
| Rendah | ±300 ribu | ±330 ribu | ±31 |
| Sedang (default HP) | ±400 ribu | ±500 ribu | ±31 |
| Tinggi (default komputer) | ±850 ribu | ±1 juta | ±31 |
Sebagai pembanding, v0.2.0 (HP) ±230 ribu segitiga, 5 draw call.

## Masalah yang diketahui
- Ukuran bundle ±500 KB (sebagian besar Three.js). Bisa dikecilkan nanti bila loading lambat.
- Tepi luar terrain (1000 × 1000 m) bisa terlihat samar di bawah air dari sudut tertentu.
- Pohon dan batu belum punya collision (data batang/batu sudah disiapkan untuk Milestone 2).
- Rumput hanya dibuat di sekitar kamera: saat kamera melompat jauh (zoom cepat), rumput "tumbuh"
  dalam ±1 detik. Dari jauh (> radius rumput) lereng hanya berwarna, tanpa helai.
- Tajuk pohon tetap bergaya low-poly (bersegi) pada Rendah/Sedang.
- Bayangan di Sedang (1024 px) agak kasar bila kamera sangat dekat ke batang pohon.
- Ganti tingkat kualitas memuat ulang halaman (posisi kamera kembali ke awal).
- Belum ada karakter, collision, atau gameplay (memang bagian Milestone 2+).
