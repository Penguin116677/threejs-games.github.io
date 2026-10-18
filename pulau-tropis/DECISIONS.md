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
    | Bayangan | – | 1024, PCF | 2048, PCF soft |
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
14. **Tinggi tanah dari grid mesh** (`ground.heightAt`), bukan langsung dari fungsi noise, karena
    mesh adalah interpolasi kasar dari noise; selisihnya bisa >1 m di lereng gunung sehingga objek
    melayang/tenggelam. Collision Milestone 2 wajib memakai fungsi yang sama.
15. **Penempatan tanpa tumpang tindih** (`PlacementGrid` + `scatter`) dengan seed tetap; titik
    diambil di lingkaran yang mencakup daratan (bukan seluruh peta) agar efisien.
16. **Detail tinggi hanya untuk tajuk pohon** (Tinggi): semak dan batu selalu low-poly karena
    kecil di layar — menghemat ±280 ribu segitiga di Tinggi.
