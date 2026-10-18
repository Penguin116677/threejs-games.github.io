# GAME_PLAN — Pulau Tropis

## Visi
Game eksplorasi 3D di sebuah pulau tropis yang bisa dimainkan langsung di browser HP Android
tanpa instalasi. Pemain menjelajahi pantai, hutan, desa, sungai, air terjun, gunung, gua, dan
reruntuhan, berinteraksi dengan NPC, mengumpulkan item, dan menyelesaikan quest eksplorasi ringan.

## Genre
Eksplorasi / petualangan santai orang ketiga (third-person), tanpa pertarungan (untuk saat ini).

## Target perangkat
- Utama: browser Chrome di HP Android (layar sentuh, portrait dan landscape).
- Sekunder: browser desktop (mouse + keyboard).
- Prinsip: performa HP diutamakan dibanding detail visual.

## Teknologi
Three.js (WebGL 2) + Vite, JavaScript murni (tanpa framework UI). Dunia dibuat prosedural
dengan seed tetap, jadi bentuk pulau selalu sama setiap kali dibuka.

## Kredit aset
- Karakter pemain (prajurit + pedang): Kenney — "Mini Arena" (CC0), www.kenney.nl, kredit tambahan
  Tony Schär. Lihat `public/models/LISENSI.txt`.
- Semua aset lain (pulau, pohon, rumput, air, langit) dibuat prosedural di kode.

## Rencana milestone
1. **Fondasi game** — Vite + Three.js, terrain pulau, pantai, laut, langit, bisa dibuka di browser HP.
2. **Karakter & eksplorasi** — karakter pemain, kamera third-person, joystick virtual, tombol lompat,
   kontrol kamera sentuh, collision, gravitasi, respawn.
3. **Pembangunan dunia** — hutan tropis, desa, sungai & air terjun, gunung, gua, reruntuhan,
   pulau kecil, jalur eksplorasi, landmark.
4. **Interaksi gameplay** — interaksi objek, item, inventory, NPC & dialog, quest sederhana.
5. **Peningkatan visual** — material/tekstur, bayangan, animasi vegetasi, partikel, suara.
6. **Sistem game** — UI, peta mini, kesehatan/stamina (bila perlu), siang-malam, simpan progres.
7. **Optimasi & pengujian** — bug, kontrol sentuh, collision, performa, ukuran layar/orientasi.

Milestone adalah rencana, bukan kewajiban. Perubahan konsep dicatat di `DECISIONS.md`.

Catatan: atas permintaan pengguna, pohon (v0.2.0), rumput di sekitar gunung, dan sebagian
peningkatan visual Milestone 5 (bayangan, tanah bertekstur, awan, kaustik — v0.3.0) sudah
dikerjakan lebih awal, sebelum Milestone 2. Milestone 2 (karakter & kontrol) dikerjakan di v0.5.0.
