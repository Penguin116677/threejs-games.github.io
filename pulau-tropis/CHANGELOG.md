# CHANGELOG — Pulau Tropis

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
