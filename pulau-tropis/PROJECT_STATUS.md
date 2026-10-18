# PROJECT_STATUS — Pulau Tropis

**Milestone aktif:** 1 — Fondasi game (selesai diimplementasikan, menunggu umpan balik dari HP)
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
| UI dasar berbahasa Indonesia (judul, FPS, layar penuh, petunjuk) | ✅ selesai |
| Pesan error tampil di layar (tanpa konsol) | ✅ selesai |
| Dibuka di browser HP Android sungguhan | ⏳ belum diverifikasi — menunggu laporan pengguna |

## Yang sudah diperiksa
- `npm run build` berhasil tanpa error.
- Smoke test otomatis (Chromium headless, emulasi Pixel 7 portrait & landscape + desktop):
  tidak ada error JavaScript, dunia ter-render, geser 1 jari memutar kamera.
- Screenshot diperiksa secara visual.

## Yang BELUM diperiksa
- Performa nyata di HP (FPS di smoke test memakai render software, tidak mewakili HP).
- Gestur cubit (pinch zoom) dua jari di perangkat sungguhan.
- Apakah URL hosting (githack / GitHub Pages) terbuka di HP — tidak bisa diakses dari lingkungan pengembangan.

## Masalah yang diketahui
- Ukuran bundle ±500 KB (sebagian besar Three.js). Bisa dikecilkan nanti bila loading lambat.
- Tepi luar terrain (1000 × 1000 m) bisa terlihat samar di bawah air dari sudut tertentu.
- Belum ada karakter, collision, atau gameplay (memang bagian Milestone 2+).
