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
6. **Kualitas adaptif** — HP: pixel ratio maks 1.5, grid terrain 220². Desktop: 2 dan 352².
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
