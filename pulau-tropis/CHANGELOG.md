# CHANGELOG — Pulau Tropis

## [0.10.0] — 2026-10-19 — Kepulauan Kencana: kerajaan besar di barat (Milestone 3, permintaan pengguna)
### Ditambahkan
- **Dunia diperluas ke barat** (1.625 × 1.000 m): Pulau Tropis tetap di tengah, di baratnya
  **Kepulauan Kencana** — empat pulau baru yang dihubungkan jembatan:
  - **Pulau Kencana** (pulau terbesar) dengan **Kotaraja Kencana**, ibu kota kerajaan bergaya
    Nusantara (Majapahit/Jawa–Bali): tembok kota bata merah 280 × 200 m dengan 12 menara dan
    4 gerbang candi bentar, ±160 rumah dalam blok-blok jalan, **Keraton** bertembok (gerbang
    paduraksa, Pendopo Agung di atas batur dengan singgasana raja, bangsal, 2 meru, 4 bale),
    **alun-alun** dengan dua beringin berpagar, **pasar** 14 lapak warna-warni, kompleks **candi**
    batu dengan 4 candi perwara, sawah di luar tembok, desa di tepi jalan, dan **pelabuhan**
    (3 dermaga kayu, gudang, perahu bercadik, kapal jong).
  - **Pulau Sawah** (utara): hamparan sawah berpetak, dukuh petani dengan lumbung, dangau.
  - **Pulau Nelayan** (barat daya): kampung rumah panggung, jemuran ikan, dermaga, perahu di pasir.
  - **Pulau Pura** (barat): pura di puncak bukit — meru bertingkat 11, 7, 3, bale, candi bentar,
    jalan naik berhias umbul-umbul.
- **Jembatan Agung** (±160 m, batu andesit, langkan bata, lampu, gapura candi bentar di kedua ujung)
  dari pantai barat Pulau Tropis ke Pulau Kencana; 3 jembatan kayu ke pulau-pulau lain. Jembatan,
  dermaga, batur, dan tangga bisa diinjak (lantai bangunan), bangunan & tembok tidak bisa ditembus.
- **Penduduk kerajaan** (±200 / ±300 / ±400 orang di kualitas Rendah / Sedang / Tinggi): berjalan di jalan-jalan kota dan
  antarpulau, sesekali berhenti; pedagang di pasar, petani di sawah, nelayan di dermaga, warga
  bersantai di alun-alun, pendeta di candi & pura, **raja bermahkota** di singgasana, **penjaga
  bertombak** di setiap gerbang. Penduduk menoleh dan melambai saat prajurit mendekat, dan tidak bisa
  ditembus. Model: Kenney "Mini Characters" (CC0, 8 karakter dalam satu file 365 KB).
- **Peta dunia** (tombol **Peta**, komputer: **M**): semua pulau, kota, jalan, jembatan, perkemahan
  orc, dan posisi + arah prajurit.
- **Spanduk nama wilayah** saat memasuki pulau / kota / keraton / jembatan baru
  (mis. "Kotaraja Kencana — Ibu kota Kerajaan Kencana").
- Jalan tanah, lantai batu, rumput halus alun-alun, dan sawah berpetak (pematang, padi muda–menguning)
  digambar shader tanah dari masker 1 m per piksel.
- Pepohonan baru: beringin, kamboja, pisang, mangga; kelapa, hutan kecil, semak & bunga di pulau-pulau
  barat.
### Diubah
- Judul HUD: Milestone 3. Petunjuk kontrol menyebut Peta dan arah ke kerajaan.
- Terrain, laut, dan bangunan kini dipecah per petak: bagian di luar layar tidak digambar. Walau
  dunia 1,6× lebih luas, segitiga per frame di titik mulai justru turun (Rendah ±290 → 252 rb,
  Sedang ±420 → 277 rb, Tinggi ±820 → 548 rb); draw call naik dari ±30 ke ±50.
- Tajuk/atap tembus pandang kini juga berlaku untuk bangunan; di bawah atap besar (pendopo, bale,
  gerbang keraton) lubangnya diperlebar.
- Batas "terlalu jauh" kini tepi dunia (bukan 430 m dari pusat Pulau Tropis).
### Tidak berubah
- Pulau Tropis sama persis: bentuk tanah, ±1.000 pohon, batu, perkemahan orc, titik mulai, dan jalur
  ketuk-berjalan dicek identik dengan versi 0.9.0 (kecuali beberapa pohon di kepala Jembatan Agung).
### Pengujian
- Smoke test ditambah: kerajaan lengkap (rumah, tembok, pendopo, jembatan), penduduk bergerak &
  terlihat di pasar, menyeberangi Jembatan Agung tanpa jatuh, spanduk wilayah di gerbang timur,
  naik tangga pendopo, dinding rumah menahan prajurit, tombol Peta.

## [0.9.0] — 2026-10-19 — Musuh orc + 4 jurus baru (permintaan pengguna)
### Ditambahkan
- **Musuh orc** (Kenney "Mini Dungeon", CC0 — rig & animasi sama dengan prajurit): 25 orc di 5
  perkemahan (satu ±16 m di depan titik mulai; lainnya di padang barat gunung, timur, utara, selatan).
  Berkeliaran pelan dan menoleh ke prajurit bila dekat; **belum menyerang**.
  - Nyawa 6: bar merah muncul di atas kepala saat terkena; berkedip putih & terpental saat dipukul;
    roboh (animasi jatuh), lalu tenggelam ke tanah dan muncul lagi di perkemahannya ±19 detik kemudian.
  - Orc yang jauh (> 60 m) tidak digambar dan tidak dianimasikan (hemat untuk HP).
- **4 jurus baru** (komputer: tombol 1–4 atau Q/E/R/T):
  1. **Cincang** (jeda 6 detik): 10 cincangan beruntun ke depan sambil maju pelan.
  2. **Hentak** (jeda 7 detik): melompat ±2 m, pedang dibalik menghadap ke bawah di puncak
     lompatan, lalu menghentak turun dan menancapkan pedang ke tanah — retakan tanah, gelombang kejut
     ±3,3 m (orc terluka & terpental), layar berguncang.
  3. **Putar** (jeda 5 detik): 3 cincangan lalu berputar satu kali, mengenai semua di sekeliling ±2,4 m.
  4. **Penggal** (jeda 15 detik): membidik leher maks. 5 orc terdekat (±14 m, tanda bidik merah),
     lalu melesat secepat kilat melewati semuanya dan memenggal kelimanya bersamaan — jejak kilat
     zig-zag, garis potong di leher, kepala terlepas & terlempar (bergaya kartun, tanpa darah).
     Tanpa musuh dalam jangkauan: muncul pesan dan jeda pakai tidak terpakai.
- Pukulan kombo (tebas / tinju / tendang) juga melukai orc.
### Diubah
- Tombol jurus: Cincang, Hentak, Putar, **Penggal** (merah, jurus pamungkas) + Lompat melingkari
  tombol Pukul (layar tegak) atau sebaris di kirinya (layar mendatar).
- Jurus lama diganti: Putar kini "cincang lalu putar", Hentak kini "menancapkan pedang", **Serbu dihapus**
  (gerakan melesatnya kini bagian dari Penggal).
### Pengujian
- Smoke test: orc di 5 perkemahan dekat titik mulai; Cincang (10 cincangan, orc roboh); Hentak
  (lompat, retakan, orc terluka); Putar (cincang → putar, ≥ 2 orc terluka); Penggal (5 leher dibidik
  & dipenggal, prajurit melesat); orc hidup lagi; Penggal tanpa musuh; tombol 1–4 di komputer.

## [0.8.0] — 2026-10-19 — Variasi serangan: kombo + 3 jurus (permintaan pengguna)
### Ditambahkan
- **Kombo Pukul**: tombol Pukul berganti gerakan setiap ditekan — tebasan pedang → tinju kiri →
  tendangan, lalu kembali ke tebasan. Tekan lagi selagi bergerak atau ≤ 0,7 detik setelahnya untuk
  melanjutkan kombo; jeda lebih lama → mulai lagi dari tebasan.
- **3 jurus dengan jeda pakai** (tombol bulat biru di sekitar tombol Pukul; komputer: 1/2/3 atau Q/E/R):
  - **Putar** — Tebasan Putar (jeda 4 detik): berputar satu lingkaran sambil menebas, mengenai semua
    batang/batu dalam ±2 m di sekeliling.
  - **Serbu** — Serbuan (jeda 5 detik): melesat ±5 m ke depan lalu menebas; berhenti di depan
    batang/batu atau sebelum air dalam.
  - **Hentak** — Hentakan (jeda 7 detik): melompat ke depan (±1,2 m tinggi, ±2,7 m maju) lalu
    menghantam tanah; gelombang kejut mengenai sekeliling ±3 m dan layar sedikit berguncang.
  - Selama jeda, tombol jurus gelap dengan sisa detik; jurus yang siap bercahaya.
- Efek khas tiap gerakan: cincin putih (tinju), cincin hangat + debu (tendangan), pusaran putih
  (Putar), jejak lesatan (Serbu), gelombang kejut + debu (Hentak). Cincin bertepi gelap tipis agar
  terlihat di pasir maupun di hutan.
### Diubah
- Tata letak tombol aksi: **Pukul** (besar) di pojok kanan bawah; Putar, Serbu, Hentak, dan **Lompat**
  melingkarinya (layar tegak) atau sebaris di kirinya (layar mendatar). Tombol Lompat pindah dari pojok.
- Tombol serang/jurus yang ditekan saat masih menyerang disimpan, lalu langsung dijalankan.
- Logika serangan dipindah ke `src/player/combat.js` (player.js tetap untuk fisika & animasi).
### Diperbaiki
- Batang pohon hutan & pohon payung tidak lagi tampak berlubang dari atas saat tajuk di depan kamera
  dibuat tembus pandang (ujung batang kini tertutup).
### Pengujian
- Smoke test: kombo tebas → tinju → tendang; jurus Putar (kena sekeliling, jeda pakai, sisa detik di
  tombol, tidak bisa dipakai saat jeda); Serbu ke batang pohon (berhenti tanpa menembus, menebas);
  Hentak (melompat, mendarat, gelombang kejut); tombol 1/2/3 di komputer.

## [0.7.0] — 2026-10-19 — Tombol Pukul, lingkaran hijau dihapus (permintaan pengguna)
### Ditambahkan
- **Tombol Pukul** (ikon pedang, kanan bawah di sebelah kiri tombol Lompat): prajurit berhenti di
  tempat dan mengayunkan pedang (animasi bawaan model `attack-melee-right`, ±0,46 detik).
  Ditekan lagi saat masih mengayun = langsung mengayun sekali lagi. Saat berjalan, memukul
  menghentikan jalan (ketuk tanah lagi untuk melanjutkan). Komputer: tombol **F**.
- **Efek pukulan** agar terlihat dari kamera atas: busur sabetan putih berbentuk bulan sabit yang
  menyapu lalu memudar; bila bilah mengenai batang pohon → serpihan kayu & daun berhamburan, bila
  mengenai batu → debu & percikan. Jangkauan ±1 m di depan prajurit.
### Dihapus
- **Lingkaran hijau** di bawah prajurit. Cincin kuning penanda tujuan tetap ada; di hutan prajurit
  tetap terlihat lewat tajuk yang tembus pandang.
### Pengujian
- Smoke test: Pukul saat berjalan (berhenti + 1 sabetan), Pukul batang pohon (serpihan muncul),
  tombol F di komputer, dan memastikan lingkaran hijau sudah tidak ada.

## [0.6.0] — 2026-10-19 — Kamera strategi + ketuk untuk berjalan (permintaan pengguna)
### Diubah
- **Kamera gaya game strategi** menggantikan kamera orang ketiga: prajurit dilihat dari atas dengan
  sudut ±49° (dekat) sampai ±64° (jauh), arah kamera tidak berputar sendiri. Geser satu jari /
  seret mouse = putar kamera; cubit / roda mouse = zoom 10–60 m (awal 22 m). FOV disesuaikan per
  orientasi layar (tegak 55°, mendatar 42°); mode **Lihat pulau** tetap memakai FOV lama.
- **Ketuk untuk berjalan** menggantikan joystick: ketuk tanah → prajurit berjalan ke titik itu
  (jauh = lari, dekat = jalan, melambat menjelang tujuan) lewat jalur yang memutari batang pohon,
  batu besar, lereng yang terlalu curam, dan laut dalam. Ketuk lagi = ganti tujuan.
  Ketuk laut → berhenti di air dangkal (tidak tenggelam). Tidak ada jalan → cincin merah +
  pesan "Tidak ada jalan ke sana.".
- Joystick virtual dihapus. Tombol **Lompat** tetap ada. Komputer: klik kiri tanah = jalan,
  klik kanan / seret = putar kamera, roda = zoom; WASD/panah tetap bisa (membatalkan jalur klik).
- Ketukan dibedakan dari geseran: jari bergeser > 12 px atau ditahan > 0,8 detik = bukan ketukan;
  waktu diambil dari event sentuhan itu sendiri (frame yang lambat tidak membatalkan ketukan).
### Ditambahkan
- **Peta jalan** (`src/world/navgrid.js`): grid 2 m di seluruh pulau, A* 8 arah lalu jalur
  diluruskan; setiap ruas dicek langsung ke collider sehingga jalur tidak menyerempet batang.
  Dibuat saat loading (±40 ms di komputer); mencari jalur ±1–20 ms per ketukan.
- **Penanda** (`src/player/marker.js`): cincin kuning berdenyut di titik tujuan, cincin hijau di
  bawah prajurit; keduanya mengikuti kemiringan tanah dan tetap terlihat walau tertutup pohon.
- **Tajuk pohon tembus pandang** di antara kamera dan prajurit (pola titik halus), jadi prajurit
  tetap terlihat saat berada di dalam hutan.
- Detail halus tanah (butiran pasir/rumput ±8 cm) agar tanah tidak tampak buram dari kamera atas.
### Diperbaiki
- Saran "Terasa berat?" tidak lagi bertumpuk dengan kotak petunjuk kontrol.
### Pengujian
- Smoke test: ketuk tanah (sampai ke titik ketuk), memutari batang pohon tanpa menembus, ketuk laut
  dalam → berhenti di air dangkal, geser kamera tanpa menggerakkan pemain, cubit, klik tanah di
  komputer (menggantikan uji joystick).

## [0.5.1] — 2026-10-18 — Karakter diganti prajurit (permintaan pengguna)
### Diubah
- Karakter pemain sekarang **prajurit**: Kenney "Mini Arena" `character-soldier` (CC0) — helm baja
  berjambul merah, tunik merah — memegang **pedang** (`weapon-sword`) di tangan kanan. Pedang
  dipasang pada tulang lengan sehingga ikut berayun saat berjalan/berlari/melompat; posisinya
  dihitung dari data skin model (pusat balok tangan).
- Rig dan nama animasi sama dengan karakter sebelumnya, jadi kontrol, animasi, dan fisika tidak
  berubah. File: `models/prajurit.glb` (183 KB) + `models/pedang.glb` (18 KB), tekstur digabung.
- Model penjelajah lama (`penjelajah.glb`) dihapus dari build (masih ada di riwayat git).
- Smoke test memeriksa pedang terpasang.

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
