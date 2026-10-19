# DECISIONS — Pulau Tropis

Keputusan teknis dan desain. Tambahkan entri baru di bawah; jangan hapus entri lama —
tandai sebagai "diganti" bila berubah.

1. **Repository & lokasi** — Game dibuat di folder `pulau-tropis/` di repo
   `threejs-games.github.io`. Repo ini sudah berisi contoh Three.js dan berpotensi di-hosting
   GitHub Pages; folder terpisah menjaga contoh lama tetap utuh.
2. **Stack** — Three.js 0.170 (versi dikunci) + Vite 6, JavaScript murni. Tanpa engine fisika
   untuk sekarang; collision Milestone 2 akan memakai `heightAt()` (cukup untuk terrain).
3. **Dunia prosedural seed tetap** — `src/world/island.js` adalah satu-satunya sumber bentuk
   pulau (`heightAt(x, z)`). Mesh, tekstur kedalaman laut, kamera, dan nanti collision
   memakai fungsi yang sama, sehingga visual dan fisika selalu sepakat.
4. **Laut dengan shader kustom** — bukan addon `Water` Three.js (butuh render pantulan tambahan,
   berat untuk HP). Kedalaman air dibaca dari tekstur 256×256 yang dihitung sekali saat loading.
5. **Pencahayaan murah** — `MeshLambertMaterial` + warna per-vertex, tanpa bayangan di Milestone 1.
   Bayangan dan material lebih kaya ditunda ke Milestone 5 dengan memperhatikan performa HP.
   *(Diperbarui v0.3.0 — lihat no. 11: sebagian peningkatan visual dimajukan atas permintaan.)*
6. **Kualitas adaptif** — HP: pixel ratio maks 1.5, grid terrain 220². Desktop: 2 dan 352².
   *(Diganti v0.3.0 oleh no. 12: tiga tingkat Rendah/Sedang/Tinggi yang bisa dipilih di game.)*
7. **Hasil build di-commit (`dist/`)** — agar game bisa dibuka dari HP tanpa komputer
   (melalui raw.githack atau GitHub Pages). Konsekuensi: setiap perubahan `src/` harus diikuti
   `npm run build` dan commit `dist/`.
8. **Kamera orbit sementara** — Milestone 1 memakai OrbitControls untuk melihat pulau;
   akan diganti kamera third-person di Milestone 2.
   *(Diperbarui v0.5.0: kamera orang ketiga menjadi kamera utama; orbit tetap ada sebagai mode
   "Lihat pulau". Diperbarui v0.6.0: kamera utama menjadi kamera strategi dari atas — lihat no. 26.)*
9. **Bahasa** — semua UI, pesan error, dan dokumentasi dalam bahasa Indonesia.
10. **Pohon prosedural + instancing** — pohon dibuat dari geometri sederhana di kode (tanpa file
    model), digabung per jenis dan digambar dengan `InstancedMesh`. Goyangan angin di vertex shader.
    Dipilih karena paling ringan untuk HP dan tidak perlu mengunduh aset. Pohon "hutan tropis" penuh
    (variasi jenis, semak, dll.) tetap bagian Milestone 3.
11. **Peningkatan visual dimajukan dari Milestone 5** (permintaan pengguna "tingkatkan kualitas",
    v0.3.0): bayangan, tanah per-piksel, awan, kaustik, tone mapping. Milestone 5 tetap ada untuk
    sisanya (partikel, suara, animasi vegetasi lanjutan, dll.).
12. **Tiga tingkat kualitas** di `src/core/quality.js` — satu tempat untuk semua angka performa:
    | | Rendah | Sedang | Tinggi |
    |---|---|---|---|
    | Pixel ratio maks | 1.25 | 1.5 | 2 |
    | Grid terrain | 200² | 256² | 384² |
    | Bayangan | – | 1024, PCF soft (sejak v0.5.0; sebelumnya PCF) | 2048, PCF soft |
    | Jumlah pohon | 0,75× | 1× | 1,5× |
    | Rumput (radius / rumpun per m² dekat / helai) | 70 m / 1,6 / 4 | 120 m / 2,4 / 6 | 170 m / 3,2 / 8 |
    | Kaustik air | – | ✓ | ✓ |
    Default: HP → Sedang, komputer → Tinggi. Ganti tingkat = simpan pilihan lalu muat ulang halaman
    (lebih aman daripada membangun ulang dunia di tempat). Pilihan dibawa lewat `#kualitas=` dan
    localStorage (keduanya opsional; bila diblokir, game tetap jalan).
13. **Rumput = geometri helai + chunk + LOD jarak**, bukan tekstur alpha (kartu rumput). Alasan:
    kamera orbit sering melihat dari atas, di mana kartu rumput tampak sebagai garis; geometri
    tidak butuh alpha-test (lebih ramah GPU HP). Kepadatan ∝ (jarak)^-1,5 → jumlah rumpun di layar
    hampir tetap berapa pun radiusnya; rumpun "tumbuh/menyusut" halus sehingga tidak ada pop-in.
    Chunk dibuat saat dibutuhkan dengan anggaran 3 ms per frame, chunk yang terlihat kamera lebih
    dulu; noise vegetasi dihitung di grid 5×5 per chunk lalu diinterpolasi (noise itu berubah pelan).
14. **Tinggi tanah dari grid mesh** (`ground.heightAt`), bukan langsung dari fungsi noise, karena
    mesh adalah interpolasi kasar dari noise; selisihnya bisa >1 m di lereng gunung sehingga objek
    melayang/tenggelam. Collision Milestone 2 wajib memakai fungsi yang sama.
15. **Penempatan tanpa tumpang tindih** (`PlacementGrid` + `scatter`) dengan seed tetap; titik
    diambil di lingkaran yang mencakup daratan (bukan seluruh peta) agar efisien.
16. **Detail tinggi hanya untuk tajuk pohon** (Tinggi): semak dan batu selalu low-poly karena
    kecil di layar — menghemat ±280 ribu segitiga di Tinggi.
17. **Ombak pantai berbasis jarak ke garis pantai** (v0.4.0). Saat loading, `shore.js` menghitung
    peta jarak bertanda ke garis pantai dari mesh tanah (transformasi jarak Euclidean Felzenszwalb,
    ±80 ms untuk 512², dihaluskan dengan −h/|∇h| di dekat garis air) dan menyimpannya di tekstur
    half-float (tinggi tanah, jarak, arah ke laut). Fase ombak = (jarak + waktu·kecepatan)/panjang
    gelombang, jadi ombak selalu tegak lurus pantai tanpa perlu simulasi. Fungsi ombak (GLSL
    `SHORE_GLSL`) dipakai bersama shader laut dan shader tanah agar air yang naik ke pasir dan pasir
    basahnya selalu sinkron. Dipilih karena murah untuk HP (tanpa simulasi fluida, tanpa render
    pantulan tambahan).
18. **Mesh laut = satu grid "melengkung"**: sel rapat di area pulau, membesar geometris sampai
    ±6000 m (tanpa sambungan/celah), sel daratan dibuang dari index. Dekat garis pantai permukaan
    disatukan dengan tinggi air di pasir, kalau tidak tepi air di pasir bergerigi mengikuti grid.
19. **Pantulan air memakai warna langit + awan yang dihitung ulang di shader**, bukan render
    pantulan (Reflector/Water three.js) yang menggandakan biaya render — terlalu berat untuk HP.
20. **Buah kelapa digabung ke geometri pohon kelapa** (bukan objek terpisah): ikut goyangan angin
    dan bayangan tanpa draw call tambahan. Konsekuensi: semua pohon punya tandan yang sama
    (variasi hanya dari rotasi/skala). Kelapa jatuh/bisa diambil cocok untuk Milestone 4 (item).
21. **Karakter = model Kenney (CC0), bukan buatan prosedural** (v0.5.0; diganti prajurit di v0.5.1 —
    Kenney "Mini Arena" `character-soldier` + `weapon-sword`, rig & animasi sama). Semula:
    Kenney "Mini Characters". Sudah ber-rig
    dengan animasi idle/walk/sprint/jump/fall (+ pick-up, interact, emote untuk Milestone 4),
    1.291 vertex, 251 KB — ringan untuk HP dan gayanya cocok dengan dunia low-poly. Material diganti
    Lambert agar senada dengan dunia. Karakter default `character-male-f`; 12 karakter lain di paket
    yang sama memakai rig & animasi yang sama, jadi bisa diganti tanpa ubah kode lain. Bila model
    gagal dimuat, dipakai karakter kapsul sederhana (game tetap bisa dimainkan).
22. **Fisika buatan sendiri, bukan engine fisika** (Rapier/Cannon): tanah = `ground.heightAt`
    (permukaan mesh yang persis), penghalang = lingkaran (batang pohon, batu ≥ 0,8 m) di grid ruang.
    Cukup untuk berjalan/lompat di pulau, jauh lebih ringan, dan tanpa unduhan tambahan. Engine
    fisika bisa dipertimbangkan bila nanti ada benda yang bisa didorong/dilempar.
23. *(Diganti #26 di v0.6.0.)* **Kontrol HP**: joystick dinamis (muncul di tempat jempol kiri menyentuh, 45% kiri layar),
    besar dorongan = kecepatan (≥ 70% = lari); tombol Lompat besar (86 px) di kanan bawah; sisa
    layar kanan untuk kamera. Kamera otomatis kembali ke belakang pemain saat berjalan (bila
    pemain tidak sedang memutar kamera ±1,8 detik) supaya bisa main dengan satu jempol.
24. **Laut dalam = kembali ke pantai, belum ada berenang.** Air ≤ 1,3 m bisa diseberangi (pelan);
    lebih dalam selama 0,6 detik → layar meredup dan pemain kembali ke posisi aman terakhir di darat.
    Berenang bisa ditambahkan nanti bila diinginkan.
25. **Prajurit = gaya prajurit klasik** (helm berjambul, tunik, pedang) karena itulah model prajurit
    CC0 yang tersedia dengan rig & animasi yang sama. Prajurit militer modern (seragam loreng, helm
    tempur) belum ada asetnya; bisa dibuat nanti (mewarnai ulang + helm buatan sendiri) bila diminta.
    Pedang dipasang pada tulang `arm-right` di pusat balok tangan (dihitung dari data skin),
    bilah ke depan-bawah agar terlihat dari depan dan sedikit dari belakang. Pedang belum bisa dipakai
    menyerang (animasi `attack-melee-right` sudah tersedia untuk nanti).
26. **Kamera strategi + ketuk untuk berjalan** (v0.6.0, permintaan pengguna) menggantikan kamera
    orang ketiga + joystick (#23). Kamera melihat dari atas (±49°–64°, makin jauh makin tegak) dan
    tidak berputar sendiri, supaya titik yang diketuk tetap di tempatnya di layar. Satu jari:
    ketuk = jalan, geser = putar kamera (ketukan = bergeser < 12 px dan < 0,8 detik, diukur dari
    `event.timeStamp`); dua jari = zoom. Kamera tidak bisa digeser (pan) bebas: selalu mengikuti
    prajurit — untuk melihat-lihat ada mode **Lihat pulau**. Titik ketuk dicari dengan sinar dari
    kamera yang maju bertahap di atas `max(ground.heightAt, permukaan laut)` lalu dipersempit
    (bisection), bukan raycast ke mesh (mesh tanah 256² segitiga terlalu berat untuk raycast).
    WASD/panah tetap ada di komputer (tidak mengganggu HP; fitur lama tidak dihapus).
27. **Jalur = A* di grid 2 m** (250.000 sel) dengan cek collider tepat per ruas, bukan navmesh.
    Sel tertutup bila air > 1 m, lereng > 1,25 (sedikit di bawah batas pemain 1,3), atau terlalu
    dekat penghalang; ruas antar sel bertetangga yang menyerempet penghalang juga ditandai,
    sehingga jalur hasil A* + pelurusan tidak menyentuh batang (diuji: 674 batang hutan + 400
    tujuan acak, 0 menyerempet, semua terjangkau). Tujuan di laut dalam / batang / tebing
    "mundur" sepanjang garis ke arah pemain sampai titik yang bisa diinjak (laut: air ≤ 0,4 m).
    Pemain yang tersangkut > 1,2 detik melewati titik jalur itu (cadangan, mis. lereng berubah).
28. **Tembus pandang tajuk = dither (discard berpola), bukan transparansi**: material pohon tetap
    opaque (tanpa sorting, tanpa biaya blending), fragmen di silinder antara kamera dan prajurit
    dibuang dengan pola interleaved gradient noise (aman untuk presisi GPU HP). Bayangan pohon
    tetap utuh. *(Cincin hijau di bawah prajurit yang semula jadi cadangan dihapus di v0.7.0 atas
    permintaan pengguna.)*
29. **Memukul = animasi bawaan model + cek lingkaran di depan, belum ada sistem pertarungan**
    (v0.7.0, permintaan pengguna). Prajurit memakai klip `attack-melee-right` (tangan kanan yang
    memegang pedang) dengan kecepatan 0,9× agar terbaca dari kamera atas. Selama mengayun prajurit
    berdiri di tempat dan jalur ketukannya dibatalkan (seperti game klik-untuk-jalan: memukul
    menghentikan gerak); lompat ditahan sampai ayunan selesai. Pada puncak ayunan (0,24 detik di
    klip asli) dicek lingkaran r 0,7 m yang berpusat 1 m di depan badan terhadap collider batang
    pohon/batu (`colliders.hitAt`, collider kini membawa `kind`). Belum ada nyawa/kerusakan/musuh —
    itu bagian Milestone 4 — jadi pukulan baru memberi efek visual (sabetan + serpihan, 1 mesh +
    1 InstancedMesh 40 keping, tanpa bayangan). Di komputer: tombol F (klik kiri dipakai berjalan).
