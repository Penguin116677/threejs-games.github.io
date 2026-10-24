# GAME_PLAN — Pulau Tropis

## Visi
Game eksplorasi 3D di sebuah pulau tropis yang bisa dimainkan langsung di browser HP Android
tanpa instalasi. Pemain menjelajahi pantai, hutan, desa, sungai, air terjun, gunung, gua, dan
reruntuhan, berinteraksi dengan NPC, mengumpulkan item, dan menyelesaikan quest eksplorasi ringan.

## Genre
Eksplorasi / petualangan santai orang ketiga: **joystick** di kiri bawah dan **kamera di belakang
karakter** (sejak v0.14.0, permintaan pengguna; v0.6.0–v0.13.0 memakai kamera strategi dari atas +
ketuk tanah untuk berjalan). Prajurit punya kombo pukulan dan 4 jurus (v0.9.0) melawan musuh orc
di perkemahan; orc di perkemahan belum menyerang balik. Sejak v0.12.0 pemain punya nyawa, dan orc
sesekali menyerbu Kerajaan Kencana (sejak v0.14.0 dengan perahu perang). Sejak v0.13.0 ada koin (dari
orc), tas, dan toko: makanan & ramuan memulihkan nyawa, perlengkapan dari pandai besi elf memperkuat
pemain. Sejak v0.14.0 pulau-pulau **tidak tersambung jembatan**: pemain **berenang** atau berlayar
dengan **perahu** buatan sendiri (kayu dari pohon), bisa **memancing** (ikan dimakan atau dijual), dan
bisa **mengobrol** dengan elf Aeloria dan warga Kencana (tombol Bicara).

**Tokoh utama bukan rakyat kerajaan mana pun, jadi ia musuh setiap kerajaan** (v0.12.1, ketentuan
pengguna). Prajurit Kencana langsung menghadang dan menyerangnya di wilayah mereka, tanpa ditanyai.
Orang lain (pendatang) tetap ditanyai di gerbang.

**Kerajaan Elf Aeloria** (v0.13.0) membuka kotanya sebagai pasar bebas, jadi pemain bisa berbelanja.
Ketentuan pengguna untuk Aeloria: *tokoh utama yang membuat rusuh menjadi musuh kerajaan*, dan *musuh
kerajaan bukan berarti musuh pedagang* — pedagang tetap netral dan tetap berdagang dengannya. Benteng
Aeloria (istana) tetap terlarang. Lihat DECISIONS #49–#51.

## Gaya visual (sejak v0.15.0)
**Pixel art HD** (permintaan pengguna): dunia tetap 3D (kamera bebas, ribuan karakter beranimasi),
tetapi digambar seperti game pixel art — resolusi rendah dengan piksel besar yang tajam (±2 px layar per
piksel di Sedang), garis tepi gelap 1 piksel di tepi benda, cahaya 4 tingkat dan bayangan bertepi tegas,
warna 15-bit dengan dithering, tanah / laut / langit dalam beberapa nada bertepi tegas. UI ikut bergaya
pixel art: huruf piksel (Pixelify Sans), bingkai & tombol bulat berpiksel, ikon piksel, peta dunia
berpiksel. Sebelumnya (v0.1.0–v0.14.0) gaya low-poly berwarna halus. Lihat DECISIONS #62–#65.

## Peta dunia (sejak v0.10.0)
- **Pulau Tropis** (tengah): pantai, hutan, padang, gunung, perkemahan orc — titik mulai.
- **Kepulauan Kencana** (barat), di seberang selat barat — **tanpa jembatan** sejak v0.14.0
  (Dermaga Barat di Pulau Tropis ↔ Dermaga Timur di Kencana; berenang atau berperahu): **Pulau Kencana** dengan Kotaraja
  Kencana (ibu kota kerajaan Nusantara: keraton, alun-alun, pasar, candi, pelabuhan, ±160 rumah
  di dalam tembok, ratusan penduduk), **Pulau Sawah** (utara), **Pulau Nelayan** (barat daya), **Pulau Pura** (barat).
- **Pulau Wira** (sejak v0.11.0, selatan pelabuhan Pulau Kencana, lewat Jembatan Wira): markas
  bala tentara Kencana — 25.000 prajurit siap tempur di Tegal Wira (5.000 perisai, 5.000 tombak,
  5.000 pedang, 5.000 pemanah, 5.000 penunggang kuda bertombak) + 7 senapati, Siti Hinggil, perkemahan.
- **Penjagaan kerajaan** (sejak v0.12.0): pasangan peronda di semua wilayah Kencana + penjaga pos di
  gerbang, keraton, Siti Hinggil, Jembatan Wira, dan Dermaga Timur. Wilayah kerajaan = pulau-pulau Kencana
  dan perairan dekatnya; di sana pemain (musuh setiap kerajaan) langsung diserang. Jembatan di dalam
  kerajaan (ke Pulau Sawah, Pura, Nelayan, Wira) tetap ada — yang dihapus hanya jembatan antar-negeri.
- **Tanah Aeloria + Tanjung Perak** (sejak v0.13.0, utara Pulau Tropis, di seberang Selat Perak — tanpa
  jembatan sejak v0.14.0: Dermaga Utara ↔ Dermaga Perak): Kerajaan
  Elf Aeloria — Kota Aeloria (pasar 51 kios, Tempa Aeloria, kedai), kawasan kesatria (Balai Makan,
  Lapangan Latihan, Padang Pesta, perkemahan), ladang & kebun, dan Benteng Aeloria. 10.000 kesatria
  elf + 259 penduduk + 28 anak, masing-masing dengan nama, sifat, kebutuhan, dan pilihan sendiri.
- Wilayah berikutnya bisa ditambahkan di sisi lain (timur): batas dunia, terrain, laut, dan peta jalan
  sudah dibuat umum (lihat DECISIONS #33, #40).

## Target perangkat
- Utama: browser Chrome di HP Android (layar sentuh, portrait dan landscape).
- Sekunder: browser desktop (mouse + keyboard).
- Prinsip: performa HP diutamakan dibanding detail visual.

## Teknologi
Three.js (WebGL 2) + Vite, JavaScript murni (tanpa framework UI). Dunia dibuat prosedural
dengan seed tetap, jadi bentuk pulau selalu sama setiap kali dibuka.

## Kredit aset
- Karakter pemain (prajurit + pedang): Kenney — "Mini Arena" (CC0), www.kenney.nl, kredit tambahan
  Tony Schär. Musuh orc: Kenney "Mini Dungeon" (CC0). Penduduk kerajaan & elf Aeloria: Kenney "Mini
  Characters" (CC0). Kuda bala tentara: Kenney "Prototype Kit" (CC0); perisai: Kenney "Mini Dungeon"
  (CC0).
  Lihat `public/models/LISENSI.txt`.
- Huruf UI: **Pixelify Sans** — © 2021 The Pixelify Sans Project Authors
  (github.com/eifetx/Pixelify-Sans), SIL Open Font License 1.1 (sejak v0.15.0), ikut di dalam game;
  lihat `public/fonts/OFL-PixelifySans.txt`.
- Semua aset lain (pulau, pohon, rumput, air, langit, bangunan kerajaan, perahu, ikon UI) dibuat
  prosedural di kode.

## Rencana milestone
1. **Fondasi game** — Vite + Three.js, terrain pulau, pantai, laut, langit, bisa dibuka di browser HP.
2. **Karakter & eksplorasi** — karakter pemain, kamera (v0.6.0: kamera strategi dari atas; v0.14.0:
   kembali ke kamera di belakang karakter), kontrol (v0.6.0: ketuk untuk berjalan; v0.14.0: joystick
   lagi), tombol lompat, kontrol kamera sentuh, collision, gravitasi, respawn, berenang (v0.14.0).
3. **Pembangunan dunia** — hutan tropis, desa, sungai & air terjun, gunung, gua, reruntuhan,
   pulau kecil, jalur eksplorasi, landmark.
4. **Interaksi gameplay** — interaksi objek, item, inventory, NPC & dialog, quest sederhana.
5. **Peningkatan visual** — material/tekstur, bayangan, animasi vegetasi, partikel, suara.
6. **Sistem game** — UI, peta mini, kesehatan/stamina (bila perlu), siang-malam, simpan progres.
7. **Optimasi & pengujian** — bug, kontrol sentuh, collision, performa, ukuran layar/orientasi.

Milestone adalah rencana, bukan kewajiban. Perubahan konsep dicatat di `DECISIONS.md`.

Catatan: atas permintaan pengguna, pohon (v0.2.0), rumput di sekitar gunung, dan sebagian
peningkatan visual Milestone 5 (bayangan, tanah bertekstur, awan, kaustik — v0.3.0) sudah
dikerjakan lebih awal, sebelum Milestone 2. Milestone 2 (karakter & kontrol) dikerjakan di v0.5.0;
kamera dan kontrolnya diubah ke gaya game strategi di v0.6.0 (permintaan pengguna).
Tombol Pukul (bagian awal Milestone 4 — interaksi) ditambahkan lebih dulu di v0.7.0 atas permintaan,
lalu dikembangkan menjadi kombo + jurus (v0.8.0) dan 4 jurus melawan musuh orc (v0.9.0).
Penjagaan kerajaan (v0.12.0, permintaan pengguna) membawa sebagian Milestone 4 & 6 lebih awal:
nyawa pemain dan NPC yang bereaksi pada pemain. Dialog tanya-jawab dengan prajurit dihapus lagi di
v0.12.1, karena pemain musuh setiap kerajaan.
Di v0.13.0 (permintaan pengguna: kerajaan elf yang hidup bebas, pandai besi, penduduk yang berdagang,
bertani, berkelahi saat rusuh, dan pemain bisa membeli dagangannya) sebagian Milestone 4 ikut dibuat
lebih awal: item, inventori (Tas), toko, koin, dan NPC yang bisa "dibaca" pikirannya (ketuk elf).
Milestone 3 dimulai di v0.10.0 dengan wilayah pilihan pengguna: kepulauan baru di barat berisi
kerajaan besar dengan banyak penduduk (desa & bangunan, pulau kecil, jalur, landmark). Sungai, air
terjun, gua, dan reruntuhan belum dibuat. Peta dunia (bagian Milestone 6) ikut dibuat lebih awal
karena dunia kini terdiri dari beberapa pulau. Di v0.11.0 (permintaan pengguna) kerajaan mendapat
bala tentara 25.000 prajurit di pulau baru, Pulau Wira.
Di v0.14.0 (permintaan pengguna) kontrol kembali ke joystick + kamera di belakang karakter, jembatan
antar-negeri dihapus, dan pemain bisa berenang, membuat perahu, memancing, serta mengobrol dengan NPC —
bagian Milestone 4 (NPC & dialog, membuat barang dari bahan) yang dimajukan lagi.
Di v0.15.0 (permintaan pengguna) seluruh grafik diganti menjadi pixel art HD (bagian Milestone 5 —
peningkatan visual — dengan arah gaya yang baru) tanpa mengubah gameplay; kamera tidak lagi berputar
sendiri mengikuti arah karakter, dan gerakan karakter diperhalus.
