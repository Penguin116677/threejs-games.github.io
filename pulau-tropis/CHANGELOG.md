# CHANGELOG — Pulau Tropis

## [0.5.0] — 2026-10-18 — Milestone 2: Karakter dan eksplorasi
### Ditambahkan
- **Karakter pemain**: model Kenney "Mini Characters" (CC0) dengan animasi diam, jalan, lari,
  lompat, dan jatuh yang berganti halus menurut kecepatan. Satu file GLB 251 KB (tekstur digabung).
  Bila model gagal dimuat, game memakai karakter sederhana dan tetap bisa dimainkan.
- **Kamera orang ketiga**: mengikuti dari belakang; geser untuk memutar, cubit/roda mouse untuk
  zoom; tidak menembus bukit atau masuk ke bawah air; saat berjalan kamera pelan-pelan kembali
  ke belakang karakter (bisa main dengan satu jempol).
- **Kontrol HP**: joystick virtual muncul di tempat jempol kiri menyentuh (dorong jauh = lari),
  tombol **Lompat** di kanan bawah, geser layar kanan untuk kamera, cubit untuk zoom.
- **Kontrol komputer**: WASD/panah, Shift = pelan, Spasi = lompat, seret mouse = kamera.
- **Fisika**: gravitasi, lompat ±1,1 m (dengan toleransi waktu tekan), tetap menempel saat
  menuruni lereng, lereng > ±52° tidak bisa didaki (merosot), tabrakan dengan batang pohon dan
  batu besar (batu kecil bisa dilangkahi), berjalan lebih lambat di air dangkal.
- **Respawn**: masuk laut dalam (> 1,3 m) atau terlalu jauh dari pulau → layar meredup, pemain
  kembali ke posisi aman terakhir di darat, dengan pesan.
- Tombol **Lihat pulau** / **Main lagi**: beralih ke kamera bebas (orbit) untuk melihat pulau.
- Titik mulai di pantai barat daya, menghadap gunung.
- `scripts/embed-glb-texture.py`: menggabungkan tekstur ke file GLB.
### Diubah
- Smoke test ditulis ulang (menunggu per frame): jalan, lompat, tabrakan pohon, laut dalam,
  mendaki, joystick, tombol Lompat, geser kamera, cubit, tombol mode, menu Kualitas.

## [0.4.0] — 2026-10-18 — Buah kelapa, air lebih bagus, ombak pantai (permintaan pengguna)
### Ditambahkan
- **Buah kelapa**: tandan 8 buah di setiap pohon kelapa — kebanyakan hijau (muda), ada yang
  kuning-oranye (kelapa gading) dan coklat (tua) — menggantung di bawah pelepah dengan tangkainya,
  ikut bergoyang ditiup angin.
- **Ombak pantai** di seluruh pulau:
  - ombak selalu datang tegak lurus garis pantai (memakai peta jarak ke garis pantai);
  - membesar saat mendekat, lalu pecah menjadi buih putih bertekstur;
  - air naik ke pasir lalu surut perlahan, dengan garis buih di ujungnya;
  - pasir yang baru dijilat ombak tetap gelap/basah sebentar (Sedang/Tinggi);
  - set ombak kuat/lemah bergantian; puncak ombak berkelok dan putus-putus (tidak kaku).
### Diubah — kualitas air
- Pantulan langit mengikuti gradasi warna langit + **awan terpantul** di air (Sedang/Tinggi).
- Riak air dari tekstur normal ber-mipmap (1 lapis di Rendah, 2 lapis di Sedang/Tinggi),
  menggantikan gelombang sinus yang dulu menimbulkan pola cincin (moiré) di kejauhan.
- Kilau matahari lebih tajam, efek Fresnel, cahaya tembus di puncak ombak, toska → biru tua
  menurut kedalaman, air tipis di pantai tembus pandang.
- Mesh laut baru: grid rapat di sekitar pulau (Rendah 7,8 m / Sedang 5,2 m / Tinggi 4,2 m),
  makin renggang ke cakrawala, sel daratan dibuang. Kedalaman diambil dari mesh tanah,
  jadi garis air pas dengan pasir.
### Dihapus
- `createDepthTexture` (diganti data pantai `createShoreData`).

## [0.3.0] — 2026-10-18 — Rumput di sekitar gunung + peningkatan kualitas (permintaan pengguna)
### Ditambahkan
- **Rumput ilalang** di lereng dan kaki gunung: rumpun-rumpun helai melengkung yang bergoyang
  ditiup angin (gelombang angin menyapu padang). Sabuk rumput rapat di lereng gunung (±16–76 m,
  di atas batas hutan, di bawah puncak berbatu) + rumput lebih jarang di padang terbuka sekitarnya.
  Sistem chunk 16×16 m: rumput hanya dibuat & digambar di sekitar kamera, kepadatan turun
  dengan jarak, semua dalam satu draw call; chunk yang terlihat kamera dibuat lebih dulu.
- **Menu Kualitas** (tombol "Kualitas" di kanan atas): Rendah / Sedang / Tinggi. Pilihan disimpan;
  HP otomatis mulai di Sedang, komputer di Tinggi. Saran "Terasa berat?" muncul bila FPS < 24.
- **Bayangan matahari** (Sedang/Tinggi): pohon, kelapa, dan batu membayangi tanah. Kotak bayangan
  mengikuti kamera (tajam saat dekat, mencakup pulau saat jauh) dan di-snap ke grid texel agar
  tidak berkedip.
- **Awan** bergerak di langit + cakram matahari.
- **Kilau kaustik** (jaring cahaya) bergerak di air dangkal (Sedang/Tinggi).
- **Vegetasi baru**: pohon payung di padang, semak, semak berbunga (merah/kuning/pink), batu
  besar di lereng gunung dan batu kecil di padang/pantai.
- `PlacementGrid`: objek tidak saling menembus (pohon, batu, semak berjarak wajar).
- `ground.heightAt()`: tinggi permukaan mesh yang sebenarnya — objek berdiri tepat di tanah
  (juga untuk collision karakter di Milestone 2).
### Diubah
- **Tanah** diwarnai per piksel (bukan per vertex) dengan tekstur noise ber-mipmap: batas
  pasir/rumput/batu tajam, butiran halus, bercak warna, padang lebih hijau-kekuningan di sekitar
  gunung, tanah lebih gelap di bawah pohon (oklusi palsu).
- **Kelapa**: pelepah bersirip (anak daun) + pelepah tua kekuningan + buah kelapa, batang bercincin.
- **Pohon hutan**: cabang, tajuk dengan cahaya lembut (normal membulat), pola daun.
- Tone mapping ACES + penyesuaian cahaya; pohon & batu dibagi per petak 3×3 agar yang di luar
  layar tidak digambar.
- Kamera orbit bisa zoom lebih dekat (12 m) untuk melihat rumput.

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
