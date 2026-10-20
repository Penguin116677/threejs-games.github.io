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
30. **Variasi serangan = kombo di tombol Pukul + 3 jurus ber-jeda pakai** (v0.8.0, permintaan
    "skill pukulnya bervariasi"), mengikuti pola game aksi/MOBA di HP: serangan dasar besar di pojok,
    jurus di sekelilingnya. Semua gerakan memakai animasi bawaan model (attack-melee-right/left,
    attack-kick-right, jump, sprint) — tidak ada animasi putar/lesat/hantam di paket, jadi:
    Putar = ayunan pedang diperlambat + badan diputar 360° di kode; Serbu = kecepatan 22 m/s selama
    0,24 detik lewat fisika biasa (tertahan collider, berhenti bila gerak < 35% atau air dalam di
    depan) lalu tebasan; Hentak = lompatan fisika biasa + ayunan di puncak + gelombang kejut saat
    mendarat. Jurus area memakai `colliders.hitAll`. Logika serangan dipisah ke `combat.js` dengan
    antarmuka "badan" kecil dari player.js (posisi, kecepatan, arah, animasi) supaya fisika dan
    serangan tidak bercampur. Masih tanpa musuh/kerusakan (Milestone 4). Komputer: F, 1/2/3 (Q/E/R).
    Langkah fisika kini dibagi mengikuti kecepatan (maks. ±0,3 m per langkah): pada ±10 FPS Serbuan
    bergerak 1,1 m per langkah dan sempat "menembus" batang pohon (ketahuan di smoke test).
31. **Musuh = orc Kenney "Mini Dungeon" (CC0)** (v0.9.0; dibutuhkan jurus Penggal "memenggal
    5 leher musuh"). Rig & animasinya sama persis dengan prajurit (posisi tulang dicek identik), jadi
    animasi dan pose dipakai bersama. Kepalanya mesh terpisah yang 100% terikat ke tulang kepala,
    sehingga "memenggal" cukup menyembunyikan head-mesh lalu melempar salinan kepala pada pose saat
    itu (matriks dunia tulang kepala × invers ikatan × bindMatrix). Tiap orc = klon SkeletonUtils
    dengan material sendiri (kedipan putih saat terkena). Orc > 60 m tidak digambar/dianimasikan;
    dengan 5 orc terlihat draw call naik ±10. **Belum menyerang** dan pemain belum punya nyawa — itu
    perlu sistem kesehatan (Milestone 6), jadi sengaja ditunda agar tidak mengubah terlalu banyak sekaligus.
32. **Empat jurus persis permintaan pengguna** (v0.9.0): Cincang 10×, Hentak tancap, Cincang lalu
    Putar, Penggal 5 leher; menggantikan Putar/Serbu/Hentak lama (Serbu dihapus, gerakan melesatnya
    dipakai Penggal). combat.js hanya mengatur waktu & gerak dan melaporkan lingkaran sasaran;
    main.js yang memutuskan apa yang kena (orc → nyawa & terpental, batang/batu → serpihan), sasaran
    Penggal dipilih lewat "arena" (orc hidup terdekat, diurutkan menjadi jalur tetangga terdekat).
    Paket animasi tidak punya gerakan menusuk ke bawah / memenggal, jadi: Hentak = pose ayunan
    ditahan + pedang diputar lurus ke bawah di ruang tulang lengan + badan direndahkan saat menancap;
    Penggal = kuda-kuda ditahan, lalu pindah posisi seketika per ruas (0,08 detik/ruas) dan jeda
    0,35 detik sebelum semua kepala lepas bersamaan (gaya "iaido" anime).
33. **Dunia diperluas dengan batas umum `WORLD`, bukan "wilayah tempelan"** (v0.10.0, permintaan
    "kepulauan baru di barat"). Terrain, data pantai (ombak), laut, dan peta jalan kini dibentangkan
    ke persegi panjang dunia (x −1125…500, z −500…500) yang tepinya kelipatan 125 m dari tepi lama,
    sehingga grid lama (langkah 5 / 3,906 / 2,604 m dan sel jalan 2 m) tetap sejajar dan Pulau Tropis
    tidak bergeser. Bentuk tanah = maks(Pulau Tropis, pulau-pulau barat). Supaya beban HP tidak
    naik: terrain dipecah petak 64 sel (petak yang seluruhnya lebih dalam dari −12 m tidak dibuat;
    gantinya satu bidang dasar laut), laut dipecah petak 48 sel — petak di luar layar tidak digambar.
    Pohon & batu Pulau Tropis ditebar di atas grid khusus pulau tengah (bentuk lama, area lama),
    jadi letaknya sama persis; tempat yang "dicadangkan" (kepala Jembatan Agung) tetap memakai angka
    acak & ruangnya, hanya objeknya tidak dibuat, sehingga pohon lain tidak bergeser. Dicek di Node:
    tinggi tanah, 1.074 batang pohon, batu, sel jalan, dan 60 jalur acak identik dengan v0.9.0.
    Wilayah berikutnya cukup menambah bentuk tanah + rencana di `src/world/<wilayah>/`.
34. **Gaya kerajaan Nusantara (Majapahit/Jawa–Bali), bangunan prosedural** — pengguna meminta
    "kerajaan besar" tanpa menyebut gaya; di dunia tropis berbahasa Indonesia dipilih bata merah,
    candi bentar, paduraksa, pendopo/joglo, meru, alun-alun dengan beringin kurung, pasar, dan
    candi batu (bisa diganti bila pengguna ingin gaya lain). Kit Kenney (Castle/Fantasy Town)
    bergaya Eropa, jadi bangunan dibuat di kode (`buildings.js`) dengan gaya low-poly yang sama
    dengan pohon. Semua bangunan digabung menjadi satu mesh per petak 128 m (± 22 draw call untuk
    ±340 bangunan, ±225 ribu titik); pola bata/genteng/jerami/papan/batu/anyaman digambar shader
    dari posisi dunia + kode pola per titik (tanpa tekstur gambar, tanpa moiré dari jauh).
35. **Lantai bangunan terpisah dari tanah**: `ground.heightAt` tetap tinggi mesh tanah (dipakai
    ombak, laut, rumput, penebaran), `ground.surfaceAt` = tanah + lantai yang bisa diinjak
    (jembatan melengkung, dermaga, batur, tangga). Pemain, penanda tujuan, kamera, efek, dan
    pencari titik ketuk memakai `surfaceAt`; peta jalan menimpa sel yang pusatnya di atas lantai.
    Tepi lantai yang tinggi (langkan jembatan, langkan batur) adalah collider kotak, jadi pemain
    hanya bisa naik lewat tangga dan tidak jatuh dari jembatan.
36. **Collider kotak (berputar) selain lingkaran**: dinding rumah, tembok, menara, pagar, langkan.
    Setiap penghalang dimasukkan ke semua sel 8 m yang tersentuh kotak batasnya (tembok panjang tetap
    murah dicari); pukulan yang mengenai kotak menghasilkan titik sentuh (serpihan bata/kayu).
37. **Penduduk = animasi dipanggang ke tekstur + instancing, bukan SkinnedMesh per orang**. Semua
    karakter Kenney "Mini" memakai rangka 7 tulang yang sama (posisi tulang dicek identik ±1 mm)
    dan kulit kaku (1 tulang per titik), jadi saat dimuat setiap bingkai klip (30/detik) diubah
    menjadi 7 matriks dalam satu tekstur float; shader membaca matriks untuk bingkai milik tiap
    orang (+ peralihan antar klip). Satu InstancedMesh per jenis orang (8 penduduk + raja + penjaga
    = 10 draw call untuk ±300 orang di Sedang); hanya orang dalam ±110 m dari kamera dan di dalam layar yang
    ditulis ke buffer. Penduduk berjalan di jaringan jalan (simpul di pertemuan jalan), bukan A*
    per orang. Tombak penjaga & mahkota raja ditempel ke tulang tangan/kepala di ruang "pose diam".
    Penduduk tidak bisa diserang (bukan musuh) — pukulan melewati mereka.
38. **Jalan, lantai batu, rumput alun-alun, dan sawah = masker 1 m/piksel** (830 × 950 texel RGBA)
    yang dibaca shader tanah, bukan geometri tambahan: tepi jalan tajam walau grid tanah 2,6–5 m,
    dan petak sawah/pematang/padi dihitung per piksel. Masker yang sama menjauhkan pohon dari jalan,
    sawah, dan bangunan.
39. **Peta dunia & spanduk wilayah dibuat lebih awal** (bagian Milestone 6) karena dunia kini
    beberapa pulau: peta digambar sekali dari tinggi tanah + masker + jejak bangunan (2 m/piksel),
    lalu hanya penanda prajurit yang digambar ulang saat dibuka.
40. **Bala tentara di pulau baru (Pulau Wira), bukan di Pulau Kencana** (v0.11.0, permintaan:
    25.000 prajurit untuk kerajaan).
    - Kebutuhan ruang: 25.000 prajurit dalam gelar perang butuh ±60.000 m², lebih luas dari
      kotaraja. Di Pulau Kencana itu berarti menghapus sawah, hutan, dan desa yang sudah ada.
    - Jadi dibuat pulau lonjong 720 × 370 m di selatan pelabuhan, dan dunia diperluas 250 m ke
      selatan. Batas dunia tetap kelipatan 125 m, jadi grid pulau tengah tidak bergeser.
    - Gelar perang menghadap Siti Hinggil (utara): perisai di depan, lalu tombak, pedang, pemanah;
      pasukan berkuda di kedua sayap.
    - Isi pulau lain dijaga tetap sama:
      - bagian Pulau Wira di `plan.js` dibuat paling akhir, dengan angka acak sendiri;
      - masker untuk pohon pulau tengah tetap berbatas x = −150;
      - tiap pulau hanya menebar pohon di pulau itu sendiri.
41. **25.000 prajurit = model 3D di dekat pemain + "impostor" untuk sisanya**. Model penuh 25.000 ×
    ±550 segitiga ≈ 14 juta segitiga, jauh di atas kemampuan HP.
    - Dekat: N terdekat dari pemain (70 / 160 / 320), dan hanya bila kamera < 32–55 m, digambar 3D
      dengan rangka dipanggang (keputusan #37).
    - Sisanya:
      - tiap jenis dipotret sekali saat dimuat dari 16 arah × 4 sudut pandang (20°/40°/60°/80°) ke
        satu atlas sRGB ber-mipmap, dengan material dan cahaya matahari yang sama;
      - tiap prajurit = satu kotak menghadap kamera dalam SATU draw call;
      - shader memilih potret menurut arah kamera dilihat dari prajurit;
      - prajurit yang sedang digambar 3D disembunyikan lewat uniform: pusat + jari-jari DAN jarak
        terjauh dari kamera. Uji sembunyi di shader harus sama persis dengan pemilihan 3D di
        `update()`; bila hanya memakai lingkaran, prajurit di dalam lingkaran yang terlalu jauh dari
        kamera tidak digambar sama sekali (bolong hingga ±400 prajurit saat zoom setengah jauh).
    - Pilihan yang dicoba dan ditolak:
      - 12 arah × 3 sudut pandang: pita terang-gelap di antara potret dan warna pudar saat
        dicampur;
      - campuran rata alfa: prajurit tampak tembus pandang di pita peralihan.
    - Yang dipakai:
      - sudut pandang lebih rapat;
      - campuran hanya di pita sempit dekat batas potret;
      - keburaman = yang terbesar (bukan dirata-rata).
    - Prajurit 3D tidak memakai bayangan peta bayangan, karena impostor juga tidak. Semua prajurit
      memakai bayangan kontak yang sama; dengan bayangan asli, area 3D tampak sebagai lingkaran
      gelap.
    - Barisan sebagai penghalang: 20 kotak (satu per kelompok) + lorong 4–6 m yang bisa
      dilewati — bukan 25.000 collider.
42. **Semua prajurit dari model pemain (Kenney Mini Arena), warna pasukan dari palet**.
    - Pose tiap jenis = klip idle dengan satu lengan dikunci pada pose "holding" (memegang perisai /
      busur / pedang ke depan); badan tetap bernapas. Kavaleri: pose "drive" di atas pelana.
    - Warna pasukan: kotak warna merah jambul & sabuk di palet diganti kotak lain lewat uv — merah,
      biru, hijau, kuning, putih, ungu (senapati). Jadi semua jenis memakai SATU tekstur.
    - Kuda (Kenney Prototype Kit, 8 bagian kaku → 8 "tulang" tambahan) dan perisai (Mini Dungeon)
      dikemas ke `bala.glb`, uv-nya dipetakan ke palet yang sama.
    - Tombak, busur, tabung panah, panji, pelana dibuat di kode.
43. **Prajurit yang bertugas = peronda + penjaga pos dalam satu sistem (`prajurit.js`)**, terpisah
    dari 25.000 prajurit yang berbaris (yang tetap diam).
    - Peronda berjalan berpasangan (satu bertombak, satu berpedang & berperisai): Rendah 40 /
      Sedang 64 / Tinggi 96 orang. Tiap pasangan punya wilayah tugas: kota, luar kota & pelabuhan,
      Jembatan Agung, Pulau Sawah, Pulau Nelayan, Pulau Pura, Pulau Wira (paling sedikit satu
      pasangan per wilayah), jadi semua wilayah selalu dironda dan peronda tidak menumpuk di kota.
    - Jalur ronda = jaringan jalan penduduk + keliling barisan di Pulau Wira. Jaringan jalan Pulau
      Wira ternyata terputus dari jalan utama (jalan dermaga → Jembatan Wira berhenti 3 m dan 12 m
      dari jalan lain); untuk peronda disambung ke simpul terdekat yang garis lurusnya lapang, tanpa
      mengubah jalan yang dicat, jadi isi dunia tidak bergeser.
    - 32 penjaga gerbang/keraton/jembatan pindah dari `villagers.js` ke sistem ini, supaya bisa
      ikut mencegat dan bertarung (dulu hanya patung yang menoleh).
    - Gambar: rangka dipanggang seperti penduduk (satu InstancedMesh per seragam, 3 draw call);
      klip jalan, lari, serang, roboh, angguk, geleng, isyarat berhenti — lengan pemegang tombak &
      perisai dikunci supaya senjata tetap tegak saat berjalan.
44. **Orang asing yang masuk wilayah kerajaan dicegat lalu ditanyai lewat kartu tanya-jawab**.
    - Wilayah kerajaan (`wilayah.js`) = semua pulau Kencana + separuh barat Jembatan Agung.
    - Prajurit terdekat (≤ 40 m) berlari mencegat bersama pasangannya, memotong jalan pemain (menuju
      titik di depannya, 5 m/s; pemain berlari 5,6 m/s). Selama mengejar, prajurit bebas yang ≥ 6 m
      lebih dekat ke pemain (mis. penjaga gerbang di depan) ikut mencegat — dulu hanya pengejar
      pertama, dan pengejar dari belakang tidak pernah tersusul. Kartu tanya-jawab muncul
      di bawah layar (di layar mendatar: di kanan) dengan pilihan jawaban besar untuk jari; kamera
      bergeser supaya pemain & prajurit tidak tertutup kartu.
    - Pertemuan pertama: dua pertanyaan (siapa / mau apa, lalu untuk apa pedangnya). Jawaban damai →
      tamu (disapa peronda, tidak dicegat lagi). Datang lagi → ditanyai singkat. Pernah bermusuhan
      → ditanyai dengan curiga.
    - Dilawan bila: menjawab kasar, terus bergerak menghindar saat dicegat (30 detik; berdiri
      menunggu tidak dihitung), atau memukul prajurit
      (termasuk tak sengaja kena jurus Putar/Hentak). Paling banyak 3 prajurit menyerang
      bersamaan; yang lain bergantian masuk.
    - Lari keluar wilayah ±25 detik → pengejaran berhenti; tamu yang keluar ±20 detik ditanyai lagi
      saat kembali.
45. **Pemain punya nyawa (100)**, pulih 5/detik setelah 6 detik tidak terkena.
    - Pukulan prajurit 4–5 (jeda 1,8–2,6 detik) — dikeroyok 3 prajurit ±15 detik sampai roboh, jadi
      masih sempat melawan (Cincang menumbangkan satu prajurit) atau lari.
    - Roboh oleh prajurit → layar meredup → dibawa keluar ke ujung timur Jembatan Agung; roboh oleh
      orc → bangun di titik mulai. Tidak ada "game over".
    - Prajurit Kencana tidak dipenggal: jurus Penggal hanya menyasar mereka saat bermusuhan, dan
      mereka roboh tersabet (kepala tetap utuh). Prajurit yang roboh menghilang lalu kembali bertugas
      ±40 detik kemudian, tidak di depan mata pemain.
46. **Serbuan orc lewat Jembatan Agung** (supaya "musuh yang masuk langsung dihadang" benar-benar
    terjadi): tiap 150–210 detik tiga orc dari perkemahan terdekat (yang tidak sedang didekati
    pemain) berjalan ke gerbang timur Kotaraja. Begitu masuk wilayah, dua prajurit per orc
    menghadang dan melawan tanpa bertanya; orc yang mendekati prajurit di luar wilayah (mis. di
    separuh timur jembatan) juga dihadang, dan prajurit yang diserang selalu membela diri dibantu
    pasangannya. Orc penyerbu membalas prajurit dan pemain yang memukulnya, selalu ke lawan
    terdekat; orc di perkemahan tetap tidak menyerang (seperti v0.9.0).
    - Kekuatan: prajurit → orc 3 (orc tumbang dalam dua pukulan), orc → prajurit 1, orc → pemain 6.
      Dengan 2 per pukulan ke prajurit, tiga orc sempat merobohkan empat prajurit sebelum kalah —
      kerajaan terlihat lemah.
47. **Pendatang ditanyai di gerbang**: dua penduduk dari seberang bergantian datang lewat Jembatan
    Agung, dihentikan penjaga pos di kepala barat jembatan, menjawab keperluannya (gelembung
    ucapan), lalu boleh lewat ke pasar dan pulang lagi. Gelembung ucapan = teks HTML yang mengikuti
    titik 3D (tajam di layar HP, tanpa tekstur).
