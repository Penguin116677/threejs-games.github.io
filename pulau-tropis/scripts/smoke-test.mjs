import { chromium, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
// Smoke test otomatis (Chromium headless, render software) untuk HP portrait/landscape,
// HP kualitas Rendah, dan komputer. Memeriksa:
// - game termuat tanpa error, karakter prajurit (model + pedang) muncul berdiri di tanah
// - rumput di lereng gunung, data garis pantai (ombak) valid; memotret pantai & kelapa
// - komputer: klik tanah untuk berjalan, jalan (W), lompat (Spasi), tabrakan batang pohon,
//   laut dalam → kembali ke pantai, mendaki lereng gunung
// - HP: ketuk tanah untuk berjalan (jalur memutari batang pohon), ketuk laut → berhenti di
//   air dangkal, tombol Pukul (berhenti + mengayun, mengenai batang pohon → serpihan,
//   kombo tebas → tinju → tendang), jurus Cincang / Hentak / Putar / Penggal terhadap orc
//   (+ jeda pakai, Penggal tanpa musuh, orc hidup lagi), tombol Lompat, geser kamera
//   (tanpa memicu jalan), cubit zoom, tombol Lihat pulau, menu Kualitas
// - musuh orc ada di perkemahan (satu dekat titik mulai)
// - komputer: tombol F = pukul, 1–4 = jurus
// - tidak ada lagi lingkaran hijau di bawah prajurit
// - Kepulauan Kencana: kota lengkap (rumah, tembok, pendopo, Jembatan Agung), penduduk berjalan,
//   menyeberangi Jembatan Agung, spanduk wilayah di gerbang kota, naik tangga pendopo,
//   dinding rumah menahan prajurit, tombol Peta
// - Pulau Wira: 25.000 prajurit (5 pasukan × 5.000) + senapati, menyeberangi Jembatan Wira,
//   spanduk "Tegal Wira" di depan barisan, prajurit 3D di dekat pemain, barisan menahan prajurit
// - penjagaan kerajaan (pemain musuh setiap kerajaan): peronda di semua wilayah & bergerak,
//   menyeberangi Jembatan Agung → langsung dihadang & diserang (tanpa kartu tanya-jawab);
//   (HP tegak & komputer) masuk wilayah → diserang, pukulan pemain mengenai prajurit, kalah →
//   dibawa keluar wilayah, kabur keluar wilayah → berhenti dikejar, serbuan orc dihadang
//   prajurit, pendatang ditanyai penjaga di gerbang. Di luar uji penjagaan prajurit dibuat tidak
//   menghiraukan pemain (gencatan senjata), supaya uji kota & bala tentara tidak terganggu.
// - Kerajaan Elf Aeloria (utara): 10.000 kesatria + penduduk, elf terlihat di pasar, tombol Belanja
//   di depan kios, membeli makanan & perlengkapan (koin berkurang, tombak dipakai), ketuk elf →
//   kartu isi pikiran, keributan warga dilerai kesatria; (HP tegak & komputer) memukul kesatria →
//   kerusuhan (musuh kerajaan, kesatria menyerang), pedagang tetap melayani, kalah → dibawa ke ujung
//   selatan Jembatan Perak, Benteng Aeloria terlarang (masuk → diserang, keluar → berhenti);
//   (HP tegak) jurus Penggal pada orc memberi koin
// Waktu tunggu dihitung dalam FRAME (fisika berjalan per frame), bukan detik, karena
// render software jauh lebih lambat dari HP.
// Pemakaian: npm run build && npm run preview (terminal lain) && npm run test:smoke
// Catatan: FPS di sini BUKAN ukuran performa HP.
const out = process.argv[2] || 'screenshots'
const URL = process.argv[3] || 'http://localhost:4173/'
mkdirSync(out, { recursive: true })
let gagal = false
const fail = msg => {
  gagal = true
  console.log('  GAGAL:', msg)
}
const ok = msg => console.log('  ok:', msg)

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
// SMOKE_CASES=hp-portrait,desktop → hanya kasus itu (bawaan: semua)
const only = process.env.SMOKE_CASES ? process.env.SMOKE_CASES.split(',') : null
const cases = [
  ['hp-portrait', { ...devices['Pixel 7'] }, ''],
  ['hp-landscape', { ...devices['Pixel 7 landscape'] }, ''],
  ['hp-rendah', { ...devices['Pixel 7'] }, '?kualitas=rendah'],
  ['desktop', { viewport: { width: 1280, height: 720 } }, ''],
].filter(([name]) => !only || only.includes(name))

const waitFrames = (page, n) => page.evaluate(n => new Promise(resolve => {
  const f0 = window.__pulau.frames()
  const tick = () => (window.__pulau.frames() - f0 >= n ? resolve() : requestAnimationFrame(tick))
  tick()
}), n)

const state = page => page.evaluate(() => {
  const { player, ground, cam } = window.__pulau
  const p = player.position
  const g = ground.heightAt(p.x, p.z)
  return {
    x: p.x, y: p.y, z: p.z, ground: g, h: p.y - g, speed: player.speed, grounded: player.grounded,
    yaw: cam.yaw, model: player.usingModel, path: player.hasPath, attacking: player.attacking,
    move: player.attackMove,
  }
})

// pindahkan pemain; kamera di belakangnya menghadap `toward` ([x, z]) bila diberikan
const teleport = (page, x, z, toward) => page.evaluate(([x, z, toward]) => {
  const { player, cam } = window.__pulau
  const heading = toward ? Math.atan2(toward[0] - x, toward[1] - z) : player.heading
  player.placeAt(x, z, heading)
  player.stop()
  cam.lookFrom(heading + Math.PI)
}, [x, z, toward])

// posisi layar (piksel) dari titik dunia (x, z) di permukaan tanah / laut
const screenOf = (page, x, z) => page.evaluate(([x, z]) => {
  const { camera, ground } = window.__pulau
  const v = camera.position.clone().set(x, Math.max(ground.heightAt(x, z), 0), z).project(camera)
  return { x: (v.x + 1) / 2 * innerWidth, y: (1 - v.y) / 2 * innerHeight }
}, [x, z])

// tunggu sampai pemain selesai mengikuti jalur; catat jarak terdekat ke titik `near` ([x, z])
async function walkUntilDone(page, maxFrames, near) {
  let s = await state(page)
  let closest = Infinity
  for (let f = 0; f < maxFrames && s.path; f += 2) {
    await waitFrames(page, 2)
    s = await state(page)
    if (near) closest = Math.min(closest, Math.hypot(s.x - near[0], s.z - near[1]))
  }
  return { ...s, closest }
}

// titik lapang (bisa diinjak, jauh dari batang/batu) 10–20 m dari (x, z) ke arah `toward`
const openSpot = (page, x, z, toward) => page.evaluate(([x, z, toward]) => {
  const { nav, colliders } = window.__pulau
  const len = Math.hypot(toward[0] - x, toward[1] - z)
  for (let d = 10; d < 20; d += 0.5) {
    const px = x + (toward[0] - x) / len * d
    const pz = z + (toward[1] - z) / len * d
    if (nav.walkableAt(px, pz) && colliders.isFree(px, pz, 0.6)) return [px, pz]
  }
  return null
}, [x, z, toward])

// tunggu sampai fn() (dijalankan di halaman) bernilai benar, maks. maxFrames frame; hasil fn terakhir
async function waitUntil(page, fn, maxFrames, step = 5) {
  let v = await page.evaluate(fn)
  for (let f = 0; f < maxFrames && !v; f += step) {
    await waitFrames(page, step)
    v = await page.evaluate(fn)
  }
  return v
}

// tunggu waktu permainan ≥ detik (dt per frame dibatasi 0,1 s, jadi hitung frame dan waktu nyata)
const waitGameTime = (page, seconds) => page.evaluate(seconds => new Promise(resolve => {
  const f0 = window.__pulau.frames()
  const t0 = performance.now()
  const tick = () => (window.__pulau.frames() - f0 >= seconds * 10 && performance.now() - t0 >= seconds * 1000
    ? resolve() : requestAnimationFrame(tick))
  tick()
}), seconds)

// tunggu sampai ayunan pedang selesai; kembalikan statistik efek pukulan
async function attackDone(page) {
  for (let i = 0; i < 60 && (await state(page)).attacking; i++) await waitFrames(page, 1)
  return page.evaluate(() => window.__pulau.effects.stats())
}

// prajurit `d` m dari orc ke-i perkemahan pertama (dari arah luar perkemahan), menghadapnya;
// semua orc dihidupkan lagi dan jeda pakai jurus dikosongkan
const nearOrc = (page, i, d) => page.evaluate(([i, d]) => {
  const { enemies, player, cam } = window.__pulau
  enemies.reviveAll()
  for (const k in player.cooldowns) player.cooldowns[k] = 0
  const camp = enemies.camps[0]
  const e = enemies.list[i]
  const ax = e.pos.x - camp.x
  const az = e.pos.z - camp.z
  const al = Math.hypot(ax, az) || 1
  const x = e.pos.x + (ax / al) * d
  const z = e.pos.z + (az / al) * d
  const h = Math.atan2(e.pos.x - x, e.pos.z - z)
  player.placeAt(x, z, h)
  player.stop()
  cam.lookFrom(h + Math.PI)
}, [i, d])
const orcStats = page => page.evaluate(() => window.__pulau.enemies.list.slice(0, 5).map(e => ({ hp: e.hp, state: e.state, headless: e.headless })))

// batang pohon hutan yang kiri-kanannya lapang (untuk uji tabrakan & jalur memutar)
const openTrunk = page => page.evaluate(() => {
  const { trees, colliders, nav } = window.__pulau
  const ok = (x, z) => colliders.isFree(x, z, 0.6) && nav.walkableAt(x, z)
  const list = trees.userData.trunks.filter(t => t.radius === 0.7 && ok(t.x - 4, t.z) && ok(t.x + 4, t.z))
  return list[Math.floor(list.length / 2)]
})

async function waitReady(page) {
  await page.waitForFunction(() => window.__pulau || !document.getElementById('error').hidden, null, { timeout: 180000 })
}

for (const [name, opts, query] of cases) {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
  // render software: satu bingkai 0,3–0,8 detik, tangkapan layar 5–8 detik; batas bawaan Playwright
  // (30 detik) sesekali terlewati sejak dunia bertambah besar
  page.setDefaultTimeout(90000)
  const logs = []
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`))
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`))
  const t0 = Date.now()
  await page.goto(URL + query)
  await waitReady(page)
  const loadMs = Date.now() - t0
  await waitFrames(page, 15)
  const info = await page.evaluate(() => ({
    err: !document.getElementById('error').hidden ? document.getElementById('error-teks').textContent : null,
    q: window.__pulau?.quality.level,
    tris: window.__pulau?.renderer.info.render.triangles,
    calls: window.__pulau?.renderer.info.render.calls,
  }))
  console.log(name, 'load', loadMs, 'ms', JSON.stringify(info))
  // catat setiap pesan yang muncul (pesan hanya tampil ±2 detik; render software bisa lebih lambat)
  await page.evaluate(() => {
    window.__pesanLog = []
    const el = document.getElementById('pesan')
    new MutationObserver(() => {
      if (!el.hidden) window.__pesanLog.push(el.textContent)
    }).observe(el, { attributes: true, childList: true, characterData: true, subtree: true })
    window.__pulau.security?.setRaids(false)
    window.__pulau.security?.ceasefire(true)
  })
  if (info.err) {
    fail(`error di layar: ${info.err}`)
    await ctx.close()
    continue
  }
  await page.screenshot({ path: `${out}/${name}.png` })

  const s0 = await state(page)
  if (!s0.model) fail('model karakter tidak termuat (memakai karakter cadangan)')
  else if (!await page.evaluate(() => !!window.__pulau.player.root.getObjectByName('weapon-sword')))
    fail('pedang prajurit tidak terpasang')
  else ok('prajurit dengan pedang termuat')
  if (Math.abs(s0.h) > 0.05) fail(`karakter tidak berdiri di tanah (selisih ${s0.h.toFixed(2)} m)`)
  else ok('karakter berdiri di tanah')
  const greenRing = await page.evaluate(() => {
    let found = false
    window.__pulau.scene.traverse(o => {
      if (o.material?.color?.getHexString?.() === '6dff8a') found = true
    })
    return found
  })
  if (greenRing) fail('lingkaran hijau di bawah prajurit masih ada')
  const foes = await page.evaluate(() => {
    const { enemies, player } = window.__pulau
    if (!enemies) return null
    const p = player.position
    return {
      n: enemies.list.length, camps: enemies.camps.length,
      nearest: Math.min(...enemies.list.map(e => Math.hypot(e.pos.x - p.x, e.pos.z - p.z))),
    }
  })
  if (!foes || foes.n < 20 || foes.camps < 4) fail(`musuh orc: ${JSON.stringify(foes)}`)
  else if (foes.nearest > 20) fail(`perkemahan orc terlalu jauh dari titik mulai (${foes.nearest.toFixed(1)} m)`)
  else ok(`musuh: ${foes.n} orc di ${foes.camps} perkemahan, terdekat ${foes.nearest.toFixed(1)} m dari titik mulai`)

  // rumput: pemain di padang lereng barat gunung, menghadap puncak
  await teleport(page, -50, -95, [70, -60])
  await page.waitForFunction(() => window.__pulau.grass.userData.stats().instances > 0, null, { timeout: 30000 })
    .then(() => ok('rumput muncul di lereng gunung'))
    .catch(() => fail('rumput tidak muncul di lereng gunung'))
  await waitFrames(page, 10)
  await page.screenshot({ path: `${out}/${name}-rumput.png` })

  // pantai barat daya menghadap laut + data garis pantai
  const shoreOk = await page.evaluate(() => {
    let neg = 0
    let pos = 0
    for (const v of window.__pulau.shore.distance) v < 0 ? neg++ : pos++
    return neg > 0 && pos > 0
  })
  if (!shoreOk) fail('data garis pantai (shore) tidak valid')
  await teleport(page, -122, 122, [-170, 170])
  await waitFrames(page, 20)
  await page.screenshot({ path: `${out}/${name}-pantai.png` })

  // kelapa dari dekat (mode Lihat pulau = kamera bebas)
  await page.evaluate(() => {
    const { camera, controls, trees, setMode } = window.__pulau
    setMode('lihat')
    const m = new camera.matrix.constructor()
    trees.getObjectByName('kelapa').children[0].getMatrixAt(5, m)
    const [x, y, z] = [m.elements[12], m.elements[13], m.elements[14]]
    controls.target.set(x + 0.3, y + 6.6, z)
    camera.position.set(x + 6, y + 5.2, z + 4)
    controls.update()
  })
  await waitFrames(page, 10)
  await page.screenshot({ path: `${out}/${name}-kelapa.png` })
  await page.evaluate(() => window.__pulau.setMode('main'))

  // ===== Kepulauan Kencana (wilayah barat): kota, penduduk, jembatan, keraton, peta
  const k = await page.evaluate(() => {
    const { kencana, villagers } = window.__pulau
    return { ...kencana.stats, warga: villagers ? villagers.stats() : null }
  })
  if (k.rumah < 150 || !k.jenis.pendopo || !k.jenis['jembatan-batu'] || (k.jenis.tembok || 0) < 8)
    fail(`Kerajaan Kencana tidak lengkap: ${JSON.stringify(k)}`)
  else ok(`Kerajaan Kencana: ${k.rumah} rumah, ${k.bangunan} bangunan, ${k.pohon} pohon, ${k.perahu} perahu`)
  if (!k.warga || k.warga.total < 150) fail(`penduduk: ${JSON.stringify(k.warga)}`)
  else ok(`penduduk: ${k.warga.total} orang (${k.warga.fixed} di tempat tetap)`)

  // penduduk berjalan dan terlihat di dekat pasar
  await teleport(page, -470, 44, [-465, 66])
  await waitFrames(page, 4)
  const walkersAt = () => page.evaluate(() => window.__pulau.villagers.agents.filter(a => !a.fixed).map(a => [a.x, a.z]))
  const w0 = await walkersAt()
  await waitFrames(page, 20)
  const w1 = await walkersAt()
  const seen = await page.evaluate(() => window.__pulau.villagers.stats().visible)
  const moved = w0.filter((p, i) => Math.hypot(p[0] - w1[i][0], p[1] - w1[i][1]) > 0.3).length
  if (moved < 20 || seen < 3) fail(`penduduk: ${moved} bergerak, ${seen} terlihat di pasar`)
  else ok(`penduduk berjalan: ${moved} orang bergerak, ${seen} terlihat di dekat pasar`)
  await page.screenshot({ path: `${out}/${name}-pasar.png` })

  // Jembatan Agung: dari pantai barat Pulau Tropis ke Pulau Kencana, selalu di atas lantai jembatan
  // (waktu dipercepat 4×; fisika tetap memakai langkah kecil)
  async function walkTo(x, z, maxFrames) {
    const n = await page.evaluate(([x, z]) => {
      window.__pesanLog.length = 0
      const { nav, player } = window.__pulau
      const path = nav.findPath(player.position, { x, z })
      if (path) player.followPath(path)
      return path ? path.length : 0
    }, [x, z])
    let s = await state(page)
    let minY = s.y
    for (let f = 0; f < maxFrames && s.path; f += 3) {
      await waitFrames(page, 3)
      s = await state(page)
      minY = Math.min(minY, s.y)
    }
    return { n, s, minY, msg: await page.evaluate(() => window.__pesanLog.join(' | ')) }
  }
  await page.evaluate(() => {
    window.__pulau.debug.timeScale = 4
  })
  // ===== Penjagaan: peronda di semua wilayah tugas, dan bergerak
  const guards0 = await page.evaluate(() => {
    const { soldiers } = window.__pulau
    window.__ronda0 = soldiers.list.filter(a => a.kind === 'ronda').map(a => [a.x, a.z])
    return soldiers.stats()
  })
  const zonesOk = ['kota', 'kencana', 'agung', 'sawah', 'nelayan', 'pura', 'wira'].every(z => (guards0.wilayah[z] || 0) >= 2)
  if (guards0.pos < 30 || guards0.peronda < 40 || !zonesOk) fail(`prajurit penjaga: ${JSON.stringify(guards0)}`)
  else ok(`prajurit penjaga: ${guards0.pos} di pos + ${guards0.peronda} peronda di ${Object.keys(guards0.wilayah).length} wilayah (${Object.entries(guards0.wilayah).map(([z, n]) => `${z} ${n}`).join(', ')})`)
  // menyeberang ke wilayah kerajaan: pemain bukan rakyat kerajaan mana pun → langsung dihadang &
  // diserang, tanpa ditanyai (gencatan senjata uji dimatikan sebentar)
  await teleport(page, -160, 40, [-352, 40])
  await waitFrames(page, 2)
  await page.evaluate(() => {
    const { nav, player, security } = window.__pulau
    window.__pesanLog.length = 0
    security.ceasefire(false)
    player.followPath(nav.findPath(player.position, { x: -352, z: 40 }))
  })
  // seruan prajurit dicatat saat ia melihat pemain (gelembung hilang sendiri ±2,6 detik kemudian)
  const shout = await waitUntil(page, () => window.__pulau.security.engaged && window.__pulau.bubbles.texts.join('" / "'), 600, 2)
  const hit = await waitUntil(page, () => {
    const { player, security } = window.__pulau
    return security.engaged && player.hp < 100 && { x: player.position.x, hp: player.hp, n: security.stats().penyerang, msg: window.__pesanLog.join(' | '), kartu: !!document.getElementById('tanya') }
  }, 900)
  const patrolMoved = await page.evaluate(() => window.__pulau.soldiers.list.filter(a => a.kind === 'ronda').filter((a, i) => Math.hypot(a.x - window.__ronda0[i][0], a.z - window.__ronda0[i][1]) > 2).length)
  if (patrolMoved < guards0.peronda * 0.6) fail(`peronda bergerak: hanya ${patrolMoved} dari ${guards0.peronda}`)
  else ok(`peronda menyusuri jalan: ${patrolMoved} dari ${guards0.peronda} sudah berpindah`)
  if (!hit || !shout || hit.kartu || !hit.msg.includes('musuh')) fail(`tidak dihadang & diserang di Jembatan Agung: ${JSON.stringify(hit)}, seruan ${JSON.stringify(shout)}`)
  else ok(`menuju Jembatan Agung: dihadang ("${shout}") & langsung diserang ${hit.n} prajurit (x ${hit.x.toFixed(0)}, nyawa ${Math.round(hit.hp)})`)
  await page.screenshot({ path: `${out}/${name}-dihadang.png` })
  // uji jembatan, kota & bala tentara berikutnya memakai gencatan senjata lagi
  await page.evaluate(() => {
    const { security, player } = window.__pulau
    security.ceasefire(true)
    player.stop()
    player.revive()
  })
  await teleport(page, -160, 40, [-352, 40])
  await waitFrames(page, 2)
  const br = await walkTo(-352, 40, 600)
  if (!br.n) fail('tidak ada jalur menyeberangi Jembatan Agung')
  else if (Math.hypot(br.s.x + 352, br.s.z - 40) > 3 || br.minY < 1.5 || br.msg) fail(`Jembatan Agung: berhenti di (${br.s.x.toFixed(1)}, ${br.s.z.toFixed(1)}), terendah ${br.minY.toFixed(2)} m, pesan "${br.msg}"`)
  else ok(`Jembatan Agung: menyeberang ±190 m, pijakan terendah ${br.minY.toFixed(2)} m di atas laut`)
  // masuk lewat gerbang timur → spanduk "Kotaraja Kencana"
  const gate = await walkTo(-445, 40, 400)
  await waitFrames(page, 6)
  const banner = await page.evaluate(() => ({ shown: document.getElementById('wilayah').classList.contains('tampil'), text: document.querySelector('.wilayah-nama').textContent }))
  if (Math.hypot(gate.s.x + 445, gate.s.z - 40) > 3) fail(`gerbang timur: berhenti di (${gate.s.x.toFixed(1)}, ${gate.s.z.toFixed(1)})`)
  else if (banner.text !== 'Kotaraja Kencana') fail(`spanduk wilayah: "${banner.text}" (tampil ${banner.shown})`)
  else ok('masuk gerbang timur: spanduk "Kotaraja Kencana" muncul')
  await page.screenshot({ path: `${out}/${name}-gerbang.png` })
  // naik tangga pendopo keraton (lantai batur 1 m di atas halaman)
  await teleport(page, -598, 40, [-628, 40])
  await waitFrames(page, 2)
  const pd = await walkTo(-628, 44, 300)
  if (Math.abs(pd.s.y - 6.5) > 0.15 || Math.hypot(pd.s.x + 628, pd.s.z - 44) > 2) fail(`tangga pendopo: berhenti di (${pd.s.x.toFixed(1)}, ${pd.s.y.toFixed(2)}, ${pd.s.z.toFixed(1)})`)
  else ok(`naik tangga pendopo: berdiri di lantai batur (y ${pd.s.y.toFixed(2)} m)`)
  await page.screenshot({ path: `${out}/${name}-pendopo.png` })
  // dinding rumah tidak bisa ditembus: berjalan lurus ke tengah rumah
  const house = await page.evaluate(() => {
    const { colliders, player } = window.__pulau
    const h = colliders.list.find(c => c.hx !== undefined && c.kind === 'bata' && c.hx > 2.8 && c.hx < 5 && c.x > -690 && c.x < -620 && c.z > -50 && c.z < -10)
    player.placeAt(h.x, h.z + h.hz + 2.5, Math.PI)
    player.followPath([{ x: h.x, z: h.z }])
    return h
  })
  await waitFrames(page, 40)
  const inHouse = await page.evaluate(h => {
    const { colliders, player } = window.__pulau
    return colliders.probe(h, player.position.x, player.position.z, {}).gap
  }, house)
  if (inHouse < 0.2) fail(`menembus dinding rumah (jarak ke dinding ${inHouse.toFixed(2)} m)`)
  else ok(`dinding rumah menahan prajurit (berhenti ${inHouse.toFixed(2)} m dari dinding)`)
  await page.evaluate(() => {
    window.__pulau.player.stop()
    window.__pulau.debug.timeScale = 1
  })
  // peta dunia: tombol Peta → kartu peta, tombol Tutup → tertutup
  await page.click('#btn-peta')
  await waitFrames(page, 2)
  const mapOpen = await page.isVisible('#peta')
  await page.screenshot({ path: `${out}/${name}-peta.png` })
  await page.click('#btn-tutup-peta')
  const mapClosed = await page.isHidden('#peta')
  if (!mapOpen || !mapClosed) fail(`peta: terbuka ${mapOpen}, tertutup ${mapClosed}`)
  else ok('tombol Peta membuka peta dunia, Tutup menutupnya')
  // pemandangan kerajaan dari udara
  await page.evaluate(() => {
    const { camera, controls, setMode } = window.__pulau
    setMode('lihat')
    controls.target.set(-560, 5, 40)
    camera.position.set(-330, 300, 330)
    controls.update()
  })
  await waitFrames(page, 4)
  await page.screenshot({ path: `${out}/${name}-kerajaan.png` })
  await page.evaluate(() => window.__pulau.setMode('main'))

  // ===== Bala tentara di Tegal Wira (Pulau Wira)
  const army = await page.evaluate(() => window.__pulau.army?.stats())
  const per = army ? army.pasukan.map(p => p.count) : []
  if (!army || army.total !== 25000 || per.length !== 5 || per.some(n => n !== 5000) || army.perwira < 5)
    fail(`bala tentara: ${JSON.stringify(army)}`)
  else ok(`bala tentara: ${army.total} prajurit (${army.pasukan.map(p => `${p.count} ${p.id}`).join(', ')}) + ${army.perwira} senapati, atlas ${army.atlas}`)
  await page.evaluate(() => {
    window.__pulau.debug.timeScale = 4
  })
  // Jembatan Wira: dari ujung timur dermaga pelabuhan ke Pulau Wira
  await teleport(page, -505, 258, [-470, 362])
  await waitFrames(page, 2)
  const bw = await walkTo(-470, 362, 600)
  if (!bw.n) fail('tidak ada jalur menyeberangi Jembatan Wira')
  else if (Math.hypot(bw.s.x + 470, bw.s.z - 362) > 3 || bw.minY < 1.5 || bw.msg) fail(`Jembatan Wira: berhenti di (${bw.s.x.toFixed(1)}, ${bw.s.z.toFixed(1)}), terendah ${bw.minY.toFixed(2)} m, pesan "${bw.msg}"`)
  else ok(`Jembatan Wira: menyeberang ke Pulau Wira, pijakan terendah ${bw.minY.toFixed(2)} m`)
  // ke depan barisan perisai → spanduk "Tegal Wira"; prajurit terdekat digambar 3D
  const fr = await walkTo(-268, 396.5, 900)
  await waitFrames(page, 8)
  const tegal = await page.evaluate(() => ({ text: document.querySelector('.wilayah-nama').textContent, army: window.__pulau.army.stats() }))
  if (Math.hypot(fr.s.x + 268, fr.s.z - 396.5) > 3) fail(`depan barisan: berhenti di (${fr.s.x.toFixed(1)}, ${fr.s.z.toFixed(1)})`)
  else if (tegal.text !== 'Tegal Wira') fail(`spanduk Tegal Wira: "${tegal.text}"`)
  else if (tegal.army.dekat < 10 || tegal.army.impostor < 24000) fail(`prajurit 3D/impostor: ${JSON.stringify(tegal.army)}`)
  else ok(`depan barisan: spanduk "Tegal Wira", ${tegal.army.dekat} prajurit 3D di dekat pemain, ${tegal.army.impostor} impostor`)
  await page.screenshot({ path: `${out}/${name}-bala.png` })
  // barisan tidak bisa ditembus: berjalan lurus ke tengah barisan perisai (x −300 = kelompok
  // kedua dari barat; x −270 ± 2 adalah lorong tengah, yang memang bisa dilewati)
  await teleport(page, -300, 396.5, [-300, 412])
  await page.evaluate(() => window.__pulau.player.followPath([{ x: -300, z: 412 }]))
  await waitFrames(page, 40)
  const gapArmy = await page.evaluate(() => {
    const { colliders, player, plan } = window.__pulau
    const b = plan.army.blocks.find(o => o.type === 0 && o.x0 < -300 && o.x1 > -300)
    if (!b) return null
    return colliders.probe({ x: (b.x0 + b.x1) / 2, z: (b.z0 + b.z1) / 2, hx: (b.x1 - b.x0) / 2, hz: (b.z1 - b.z0) / 2, rot: 0, cos: 1, sin: 0, radius: Math.hypot(b.x1 - b.x0, b.z1 - b.z0) / 2 }, player.position.x, player.position.z, {}).gap
  })
  if (gapArmy === null) fail('tidak ada kotak barisan perisai di x −300')
  else if (gapArmy < 0.2) fail(`menembus barisan prajurit (jarak ${gapArmy.toFixed(2)} m)`)
  else ok(`barisan perisai menahan prajurit (berhenti ${gapArmy.toFixed(2)} m dari barisan)`)
  await page.evaluate(() => {
    window.__pulau.player.stop()
    window.__pulau.debug.timeScale = 1
  })
  // pemandangan Pulau Wira dari udara
  await page.evaluate(() => {
    const { camera, controls, setMode } = window.__pulau
    setMode('lihat')
    controls.target.set(-270, 4, 470)
    camera.position.set(-270, 230, 255)
    controls.update()
  })
  await waitFrames(page, 4)
  await page.screenshot({ path: `${out}/${name}-wira.png` })
  await page.evaluate(() => window.__pulau.setMode('main'))

  // ===== Penjagaan: masuk wilayah kerajaan → langsung diserang; kalah → dibawa keluar wilayah;
  // kabur keluar wilayah → berhenti dikejar; serbuan orc dihadang; pendatang ditanyai di gerbang
  if (name === 'hp-portrait' || name === 'desktop') {
    await page.evaluate(() => {
      window.__pulau.debug.timeScale = 2
      window.__pulau.security.ceasefire(false)
      window.__pulau.security.reset()
    })
    await teleport(page, -330, 40, [-360, 40])
    const hurt = await waitUntil(page, () => window.__pulau.player.hp < 95 && { hp: window.__pulau.player.hp, n: window.__pulau.security.stats().penyerang, musuh: window.__pulau.security.engaged }, 600)
    if (!hurt || !hurt.musuh) fail(`masuk wilayah kerajaan tidak diserang: ${JSON.stringify(hurt)}`)
    else {
      ok(`masuk wilayah kerajaan → langsung diserang ${hurt.n} prajurit, nyawa pemain turun ke ${Math.round(hurt.hp)}`)
      await page.screenshot({ path: `${out}/${name}-dilawan.png` })
      // membalas dengan jurus Putar (mengenai sekeliling)
      await page.evaluate(() => {
        const { player, soldiers } = window.__pulau
        const a = soldiers.nearest(player.position.x, player.position.z, 6)
        if (a) player.face(a.x, a.z)
        player.cooldowns.putar = 0
      })
      await page.keyboard.press('Digit3')
      const struck = await waitUntil(page, () => window.__pulau.soldiers.list.filter(a => a.hp < a.maxHp).map(a => `${a.hp}/${a.maxHp}`).join(' '), 120)
      if (!struck) fail('jurus Putar tidak mengenai prajurit yang mengeroyok')
      else ok(`pukulan pemain mengenai prajurit (nyawa ${struck})`)
      // kalah → layar meredup → bangun di ujung timur Jembatan Agung, nyawa penuh
      await page.evaluate(() => {
        window.__pesanLog.length = 0
      })
      await page.evaluate(() => window.__pulau.player.damage(500, null))
      await page.waitForTimeout(2400)
      await waitFrames(page, 4)
      const after = await page.evaluate(() => ({ x: window.__pulau.player.position.x, hp: window.__pulau.player.hp, down: window.__pulau.player.defeated, musuh: window.__pulau.security.engaged, msg: window.__pesanLog.join(' | ') }))
      if (after.down || after.hp < 100 || after.x < -200 || after.musuh || !after.msg.includes('dibawa keluar')) fail(`kalah: ${JSON.stringify(after)}`)
      else ok(`kalah → dibawa keluar ke ujung timur Jembatan Agung (x ${after.x.toFixed(0)}), nyawa penuh lagi`)
      // masuk lagi → diserang lagi; kabur jauh keluar wilayah → prajurit berhenti mengejar
      await teleport(page, -330, 40, [-360, 40])
      const again = await waitUntil(page, () => window.__pulau.security.engaged, 200)
      await page.evaluate(() => {
        window.__pesanLog.length = 0
      })
      await teleport(page, -122, 122, [-170, 170])
      const calm = await waitUntil(page, () => !window.__pulau.security.engaged && { msg: window.__pesanLog.join(' | '), n: window.__pulau.security.stats().penyerang }, 600)
      if (!again || !calm || calm.n > 0 || !calm.msg.includes('berhenti mengejar')) fail(`masuk lagi / kabur: diserang lagi ${again}, ${JSON.stringify(calm)}`)
      else ok('masuk lagi → diserang lagi; kabur keluar wilayah → prajurit berhenti mengejar')
    }
    // serbuan orc: tiga orc menyeberang ke Kotaraja, dihadang prajurit
    await teleport(page, -130, 120, [-122, 122])
    await page.evaluate(() => {
      window.__pulau.debug.timeScale = 4
      window.__pulau.security.raid()
    })
    const raid = await waitUntil(page, () => {
      const { enemies, soldiers } = window.__pulau
      const r = enemies.raiders()
      const fighting = soldiers.list.filter(a => a.state === 'serang' && a.order?.target?.kind === 'orc').length
      return fighting > 0 && { orc: r.length, prajurit: fighting, x: Math.round(r[0]?.x ?? 0) }
    }, 1500, 10)
    if (!raid) fail(`serbuan orc tidak dihadang: ${JSON.stringify(await page.evaluate(() => window.__pulau.enemies.raiders()))}`)
    else ok(`serbuan orc: ${raid.orc} orc menyeberang (x ${raid.x}), dihadang ${raid.prajurit} prajurit`)
    const beaten = await waitUntil(page, () => !window.__pulau.enemies.raidActive, 1500, 10)
    if (!beaten) fail(`orc penyerbu tidak terkalahkan: ${JSON.stringify(await page.evaluate(() => window.__pulau.enemies.raiders()))}`)
    else ok('orc penyerbu dikalahkan prajurit Kencana')
    // pendatang dari seberang ditanyai penjaga di gerbang barat Jembatan Agung
    await teleport(page, -122, 122, [-170, 170])
    await page.evaluate(() => window.__pulau.security.visitNow())
    const visitor = await waitUntil(page, () => window.__pulau.security.visitors().find(v => v.ditanya > 0 && v.fase === 'masuk'), 2500, 10)
    if (!visitor) fail(`pendatang tidak ditanyai: ${JSON.stringify(await page.evaluate(() => window.__pulau.security.visitors()))}`)
    else ok(`pendatang dari seberang ditanyai penjaga di gerbang, lalu boleh masuk (${visitor.x.toFixed(0)}, ${visitor.z.toFixed(0)})`)
    await page.evaluate(() => {
      window.__pulau.debug.timeScale = 1
      window.__pulau.security.ceasefire(true)
    })
  }

  // ===== Kerajaan Elf Aeloria (utara): rakyat, toko, kartu elf, keributan, kerusuhan, benteng
  const elf = await page.evaluate(() => {
    const { life } = window.__pulau
    if (!life) return null
    const s = life.stats()
    return { kesatria: s.kesatria, penduduk: s.penduduk, anak: s.anak, kios: life.economy.stalls.length }
  })
  if (!elf || elf.kesatria !== 10000 || elf.penduduk < 150 || elf.kios < 30) fail(`rakyat Aeloria: ${JSON.stringify(elf)}`)
  else ok(`Aeloria: ${elf.kesatria} kesatria, ${elf.penduduk} penduduk, ${elf.anak} anak, ${elf.kios} kios yang melayani pemain`)
  // berdiri di depan kios yang buka (barang `goods`), menghadapnya; hasil: indeks kios atau -1
  const atStall = (goods, area) => page.evaluate(([goods, area]) => {
    const { life, player, cam } = window.__pulau
    const i = life.economy.stalls.findIndex(s => s.goods === goods && s.area === area && life.isOpen(s))
    if (i < 0) return -1
    const s = life.economy.stalls[i]
    const h = Math.atan2(s.x - s.front.x, s.z - s.front.z)
    player.placeAt(s.front.x, s.front.z, h)
    player.stop()
    cam.lookFrom(h + Math.PI)
    cam.state.dist = 12
    return i
  }, [goods, area])
  if (elf) {
    await page.evaluate(() => window.__pulau.bag.reset(60))
    const roti = await atStall('roti', 'pasar')
    await waitFrames(page, 12)
    const shown = await page.evaluate(() => ({
      ramai: window.__pulau.life.around(10, -630, 60).length,
      dekat: window.__pulau.life.stats().dekat,
      tombol: document.getElementById('btn-belanja').hidden ? null : document.getElementById('btn-belanja').textContent,
    }))
    if (roti < 0 || shown.ramai < 30 || shown.dekat < 2 || !shown.tombol) fail(`pasar Aeloria: kios ${roti}, ${JSON.stringify(shown)}`)
    else ok(`pasar Aeloria: ${shown.ramai} elf di sekitar pasar, ${shown.dekat} digambar dekat, tombol "${shown.tombol}"`)
    await page.screenshot({ path: `${out}/${name}-aeloria-pasar.png` })
    if (shown.tombol) {
      await page.click('#btn-belanja')
      await waitFrames(page, 3)
      const id = await page.evaluate(i => Object.keys(window.__pulau.life.economy.stalls[i].stock).find(k => window.__pulau.life.economy.stalls[i].stock[k] > 0), roti)
      await page.click(`#toko-daftar button[data-id="${id}"]`)
      await waitFrames(page, 3)
      const buy = await page.evaluate(id => ({ koin: window.__pulau.bag.koin, punya: window.__pulau.bag.barang[id] || 0, panel: !document.getElementById('toko').hidden }), id)
      await page.screenshot({ path: `${out}/${name}-aeloria-toko.png` })
      if (!buy.panel || buy.koin >= 60 || buy.punya !== 1) fail(`membeli ${id}: ${JSON.stringify(buy)}`)
      else ok(`membeli ${id} di Kios Roti: koin 60 → ${buy.koin}, masuk tas`)
      await page.click('#btn-tutup-toko')
    }
    // Tempa Aeloria: tombak langsung dipakai (jangkauan +0,9 m)
    await page.evaluate(() => window.__pulau.bag.reset(500))
    const tempa = await atStall('senjata', 'tempa')
    if (tempa >= 0) {
      await page.evaluate(i => {
        const s = window.__pulau.life.economy.stalls[i]
        s.stock.tombakElf = Math.max(1, s.stock.tombakElf)
      }, tempa)
      await waitFrames(page, 8)
      await page.click('#btn-belanja')
      await waitFrames(page, 3)
      await page.click('#toko-daftar button[data-id="tombakElf"]')
      await waitFrames(page, 3)
      await page.click('#btn-tutup-toko')
      const gear = await page.evaluate(() => ({ pakai: window.__pulau.bag.pakai.senjata, efek: window.__pulau.bag.effect() }))
      if (gear.pakai !== 'tombakElf' || gear.efek.jangkau !== 0.9) fail(`tombak dari Tempa Aeloria: ${JSON.stringify(gear)}`)
      else ok('Tempa Aeloria: Tombak Elf dibeli dan langsung dipakai (jangkauan +0,9 m)')
    } else fail('kios senjata Tempa Aeloria tutup')
    await page.evaluate(() => window.__pulau.bag.reset(0))
    // ketuk / klik elf → kartu isi pikiran (di tengah pasar yang ramai; pedagang yang berjaga tidak
    // dihitung, karena mengetuknya = mengetuk kiosnya)
    await page.evaluate(() => {
      const { player, cam } = window.__pulau
      player.placeAt(5, -628, 0.6)
      player.stop()
      cam.lookFrom(0.6)
      cam.state.dist = 18
    })
    await waitFrames(page, 8)
    const target = await page.evaluate(() => {
      const { life, camera } = window.__pulau
      let best = null
      let bd = 1e9
      for (const a of life.near) {
        if (a.hidden || (a.job === 'pedagang' && a.atWork)) continue // pedagang yang berjaga = ketuk kios
        const v = camera.position.clone().set(a.x, a.y + 0.85 * a.scale, a.z).project(camera)
        const sx = (v.x + 1) / 2 * innerWidth
        const sy = (1 - v.y) / 2 * innerHeight
        const d = Math.hypot(sx - innerWidth / 2, sy - innerHeight * 0.55)
        if (d < bd && sy > 140 && sy < innerHeight - 140) {
          bd = d
          best = { x: sx, y: sy }
        }
      }
      return best
    })
    if (target) {
      if (name.startsWith('hp')) await page.touchscreen.tap(target.x, target.y)
      else await page.mouse.click(target.x, target.y)
      await waitFrames(page, 4)
    }
    const card = await page.evaluate(() => document.getElementById('kartu-elf').hidden ? null : document.getElementById('kartu-elf').innerText.split('\n')[0])
    if (!card) fail(`ketuk elf: kartu tidak terbuka (${JSON.stringify(target)})`)
    else ok(`ketuk elf: kartu isi pikiran "${card}"`)
    await page.screenshot({ path: `${out}/${name}-aeloria-kartu.png` })
    await page.evaluate(() => window.__pulau.elfCard.hide())
    // keributan warga: dua elf berkelahi, kesatria terdekat datang melerai. Keributan hanya dimulai
    // di antara elf tenang yang terlihat, jadi dicoba di beberapa tempat ramai
    let brawl = false
    for (const [x, z, yaw] of [[5, -628, 0.6], [10, -752, 0.4], [-20, -640, 2.2], [235, -790, 0.3]]) {
      await page.evaluate(([x, z, yaw]) => {
        const { player, cam } = window.__pulau
        player.placeAt(x, z, yaw)
        player.stop()
        cam.lookFrom(yaw)
        cam.state.dist = 28
      }, [x, z, yaw])
      await waitFrames(page, 8)
      for (let k = 0; k < 3 && !brawl; k++) {
        brawl = await page.evaluate(() => window.__pulau.elfSec.startBrawl())
        if (!brawl) await waitFrames(page, 8)
      }
      if (brawl) break
    }
    const calmed = brawl && await waitUntil(page, () => {
      const k = window.__pulau.elfSec.stats().keributan
      return !k || k.fase !== 'adu'
    }, 400, 10)
    const brawlEnd = await page.evaluate(() => window.__pulau.elfSec.stats())
    if (!brawl) fail('keributan warga tidak bisa dimulai di pasar')
    else if (!calmed) fail(`keributan tidak berakhir: ${JSON.stringify(brawlEnd)}`)
    else ok(`keributan warga: ${brawlEnd.keributan ? `fase ${brawlEnd.keributan.fase}, pelerai ${brawlEnd.keributan.pelerai}` : 'sudah bubar'}`)
  }
  if (elf && (name === 'hp-portrait' || name === 'desktop')) {
    // kerusuhan: memukul kesatria → musuh kerajaan, kesatria menyerang
    const knight = await page.evaluate(() => {
      const { life, player, cam } = window.__pulau
      const p = player.position
      const a = life.around(p.x, p.z, 40).filter(k => k.kind === 'kesatria' && k.weapon !== 'busur' && k.phase !== 'tempur' && !k.down)
        .sort((u, v) => Math.hypot(u.x - p.x, u.z - p.z) - Math.hypot(v.x - p.x, v.z - p.z))[0]
      if (!a) return null
      const x = a.x + 0.9
      const { z } = a
      const h = Math.atan2(a.x - x, a.z - z)
      player.placeAt(x, z, h)
      player.stop()
      cam.lookFrom(h + Math.PI)
      return a.id
    })
    await page.keyboard.press('KeyF')
    const riot = await waitUntil(page, () => {
      const s = window.__pulau.elfSec.stats()
      return s.buron > 0 && s.penyerang > 0 && s
    }, 60, 3)
    if (knight === null || !riot) fail(`kerusuhan: kesatria ${knight}, ${JSON.stringify(await page.evaluate(() => window.__pulau.elfSec.stats()))}`)
    else ok(`kerusuhan: musuh kerajaan ${riot.buron} detik, ${riot.penyerang} kesatria menyerang, ${riot.pengepung} mengepung`)
    const hp0 = await page.evaluate(() => window.__pulau.player.hp)
    const hurt = await waitUntil(page, () => window.__pulau.player.hp < 100 && window.__pulau.player.hp, 300, 10)
    if (!hurt) fail(`kesatria tidak menyerang (nyawa ${hp0})`)
    else ok(`kesatria menyerang pemain: nyawa ${Math.round(hp0)} → ${Math.round(hurt)}`)
    await page.screenshot({ path: `${out}/${name}-aeloria-rusuh.png` })
    // pedagang tetap netral
    const buah = await atStall('buah', 'pasar')
    await waitFrames(page, 6)
    if (buah >= 0) await page.click('#btn-belanja').catch(() => {})
    await waitFrames(page, 3)
    const seller = await page.evaluate(() => document.getElementById('toko').hidden ? null : document.getElementById('toko-penjual').textContent)
    if (!seller || !seller.includes('netral')) fail(`pedagang saat pemain buron: ${seller}`)
    else ok(`pedagang tetap melayani buronan: "${seller}"`)
    await page.evaluate(() => window.__pulau.shop.close())
    // kalah oleh kesatria → dibawa ke ujung selatan Jembatan Perak
    await page.evaluate(() => {
      const { player } = window.__pulau
      window.__pesanLog = []
      player.damage(player.hp - 2, null)
    })
    // status roboh hanya ±1,6 detik waktu nyata: tunggu pesan kekalahannya (muncul setelah dibangunkan)
    const down = await waitUntil(page, () => window.__pesanLog.some(m => m.includes('dikalahkan kesatria Aeloria')), 600, 3)
    const out1 = await page.evaluate(() => ({ x: window.__pulau.player.position.x, z: window.__pulau.player.position.z, hp: window.__pulau.player.hp }))
    if (!down || out1.z < -215 || out1.z > -180 || out1.hp < 100) fail(`kalah oleh kesatria Aeloria: ${JSON.stringify({ down, ...out1 })}`)
    else ok(`kalah → dibawa ke luar kerajaan (${out1.x.toFixed(0)}, ${out1.z.toFixed(0)}), nyawa ${out1.hp}`)
    // di luar wilayah Aeloria, kesatria yang lewat tidak menyerang buronan (masa tenang 20 detik + 15)
    await waitGameTime(page, 35)
    const safe = await page.evaluate(() => ({ hp: window.__pulau.player.hp, s: window.__pulau.elfSec.stats() }))
    if (safe.hp < 100 || safe.s.penyerang) fail(`setelah dibangunkan di luar kerajaan masih diserang: ${JSON.stringify(safe)}`)
    else ok(`35 detik di ujung selatan Jembatan Perak: aman (buron ${safe.s.buron} detik lagi)`)
    // Benteng Aeloria: wilayah terlarang
    await page.evaluate(() => window.__pulau.elfSec.forgive())
    await teleport(page, 10, -905, [10, -960])
    const guard = await waitUntil(page, () => {
      const s = window.__pulau.elfSec.stats()
      return s.benteng && s.penyerang > 0 && s
    }, 120, 5)
    if (!guard) fail(`Benteng Aeloria: ${JSON.stringify(await page.evaluate(() => window.__pulau.elfSec.stats()))}`)
    else ok(`masuk Benteng Aeloria → ${guard.penyerang} penjaga menyerang`)
    await page.screenshot({ path: `${out}/${name}-aeloria-benteng.png` })
    await teleport(page, 10, -850, [10, -800])
    const left = await waitUntil(page, () => {
      const s = window.__pulau.elfSec.stats()
      return !s.benteng && !s.penyerang
    }, 60, 5)
    if (!left) fail(`keluar benteng: ${JSON.stringify(await page.evaluate(() => window.__pulau.elfSec.stats()))}`)
    else ok('keluar Benteng Aeloria → penjaga berhenti menyerang')
    await page.evaluate(() => {
      window.__pulau.elfSec.forgive()
      window.__pulau.player.heal(100)
    })
  }
  await teleport(page, -122, 122, [-170, 170])

  if (name === 'desktop') {
    // klik tanah → berjalan ke titik itu (klik lewat CDP dengan cap waktu eksplisit, tombol
    // ditekan 80 ms: render software lambat bisa membuat jeda tekan–lepas terbaca "ditahan")
    const cdp = await ctx.newCDPSession(page)
    async function click({ x, y }) {
      const now = Date.now() / 1000
      const ev = { x, y, button: 'left', clickCount: 1 }
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, timestamp: now - 0.05 })
      await cdp.send('Input.dispatchMouseEvent', { ...ev, type: 'mousePressed', timestamp: now })
      await cdp.send('Input.dispatchMouseEvent', { ...ev, type: 'mouseReleased', timestamp: now + 0.08 })
    }
    await teleport(page, -122, 122, [0, 0])
    await waitFrames(page, 5)
    const goal = await openSpot(page, -122, 122, [0, 0])
    await click(await screenOf(page, ...goal))
    await waitFrames(page, 2)
    if (!(await state(page)).path) fail('klik tanah tidak membuat jalur')
    const end = await walkUntilDone(page, 200)
    const miss = Math.hypot(end.x - goal[0], end.z - goal[1])
    if (end.path || miss > 0.6) fail(`klik tanah: berhenti ${miss.toFixed(2)} m dari titik klik`)
    else ok(`klik tanah: sampai ${miss.toFixed(2)} m dari titik klik`)

    // jalan maju dengan W
    await teleport(page, -122, 122, [0, 0])
    const a = await state(page)
    await page.keyboard.down('KeyW')
    await waitFrames(page, 30)
    const b = await state(page)
    await page.keyboard.up('KeyW')
    const moved = Math.hypot(b.x - a.x, b.z - a.z)
    if (moved < 5 || Math.abs(b.h) > 0.05) fail(`jalan W: pindah ${moved.toFixed(1)} m, selisih tanah ${b.h.toFixed(2)}`)
    else ok(`jalan W: pindah ${moved.toFixed(1)} m dalam 30 frame, tetap di tanah`)
    await page.screenshot({ path: `${out}/${name}-jalan.png` })

    // pukul dengan F
    const fxa = await page.evaluate(() => window.__pulau.effects.stats())
    await page.keyboard.press('KeyF')
    await waitFrames(page, 2)
    const swingF = (await state(page)).attacking
    const fxb = await attackDone(page)
    if (!swingF || fxb.slashes !== fxa.slashes + 1) fail(`tombol F: mengayun ${swingF}, sabetan ${fxb.slashes - fxa.slashes}`)
    else ok('tombol F: prajurit mengayunkan pedang')

    // jurus dengan tombol 1–4 (dekat perkemahan orc agar Penggal punya sasaran)
    const keyed = []
    for (const key of ['Digit1', 'Digit2', 'Digit3', 'Digit4']) {
      await nearOrc(page, 0, 6)
      await waitFrames(page, 3)
      await page.keyboard.press(key)
      await waitFrames(page, 2)
      keyed.push((await state(page)).move)
      await attackDone(page)
    }
    if (keyed.join() !== 'cincang,hentak,putar,penggal') fail(`tombol 1–4: ${keyed.join(', ')}`)
    else ok('tombol 1–4: jurus Cincang, Hentak, Putar, Penggal')

    // lompat dengan Spasi
    await waitFrames(page, 10)
    await page.keyboard.press('Space')
    let peak = 0
    for (let i = 0; i < 10; i++) {
      await waitFrames(page, 1)
      peak = Math.max(peak, (await state(page)).h)
    }
    await waitFrames(page, 20)
    const landed = await state(page)
    if (peak < 0.8 || !landed.grounded) fail(`lompat: tinggi ${peak.toFixed(2)} m, mendarat ${landed.grounded}`)
    else ok(`lompat setinggi ${peak.toFixed(2)} m lalu mendarat`)

    // tabrakan: berjalan lurus (W) ke batang pohon hutan
    const trunk = await openTrunk(page)
    await teleport(page, trunk.x - 4, trunk.z, [trunk.x, trunk.z])
    await page.keyboard.down('KeyW')
    await waitFrames(page, 25)
    await page.keyboard.up('KeyW')
    const c = await state(page)
    const dist = Math.hypot(c.x - trunk.x, c.z - trunk.z)
    if (dist < trunk.radius + 0.35 - 0.03) fail(`menembus batang pohon (jarak ${dist.toFixed(2)} m)`)
    else ok(`tertahan batang pohon (jarak ${dist.toFixed(2)} m ≥ ${(trunk.radius + 0.35).toFixed(2)} m)`)

    // laut dalam → kembali ke pantai
    await teleport(page, -122, 122, [0, 0])
    await waitFrames(page, 15)
    await teleport(page, -180, 180, [-250, 250])
    await page.waitForFunction(() => {
      const { player, ground } = window.__pulau
      return ground.heightAt(player.position.x, player.position.z) > 0.3
    }, null, { timeout: 20000 })
      .then(() => ok('masuk laut dalam → kembali ke pantai'))
      .catch(() => fail('tidak kembali ke pantai setelah masuk laut dalam'))
    const msg = await page.evaluate(() => (document.getElementById('pesan').hidden ? '' : document.getElementById('pesan').textContent))
    if (!msg) fail('pesan kembali ke pantai tidak muncul')
    else ok(`pesan: "${msg}"`)
    await page.screenshot({ path: `${out}/${name}-kembali.png` })

    // mendaki lereng gunung dari padang barat menuju puncak
    await teleport(page, -50, -95, [70, -60])
    const startY = (await state(page)).y
    await page.keyboard.down('KeyW')
    let maxY = startY
    for (let i = 0; i < 12; i++) {
      await waitFrames(page, 10)
      const s = await state(page)
      maxY = Math.max(maxY, s.y)
      if (s.h < -0.05) fail('karakter masuk ke dalam tanah saat mendaki')
    }
    await page.keyboard.up('KeyW')
    ok(`mendaki: naik ${(maxY - startY).toFixed(1)} m dalam 120 frame`)
    await page.screenshot({ path: `${out}/${name}-mendaki.png` })
  }

  if (name === 'hp-portrait') {
    const cdp = await ctx.newCDPSession(page)
    const touch = (type, points) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points })
    // ketukan dengan cap waktu eksplisit (jari menempel 80 ms): CDP menunggu frame render
    // yang lambat di antara kedua event, jadi tanpa ini ketukan bisa terbaca "ditahan lama"
    async function tap({ x, y }) {
      const now = Date.now() / 1000
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }], timestamp: now })
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [], timestamp: now + 0.08 })
    }

    // ketuk tanah di depan → berjalan sampai ke titik itu
    await teleport(page, -122, 122, [0, 0])
    await waitFrames(page, 5)
    const goal = await openSpot(page, -122, 122, [0, 0])
    await tap(await screenOf(page, ...goal))
    await waitFrames(page, 2)
    const st1 = await state(page)
    const markerOn = await page.evaluate(() => window.__pulau.markers.objects[0].visible)
    if (!st1.path || !markerOn) fail(`ketuk tanah: jalur ${st1.path}, penanda tujuan ${markerOn}`)
    await waitFrames(page, 10)
    await page.screenshot({ path: `${out}/${name}-ketuk.png` })
    const end = await walkUntilDone(page, 200)
    const miss = Math.hypot(end.x - goal[0], end.z - goal[1])
    if (end.path || miss > 0.6 || Math.abs(end.h) > 0.05) fail(`ketuk tanah: berhenti ${miss.toFixed(2)} m dari titik ketuk`)
    else ok(`ketuk tanah: berjalan ${Math.hypot(goal[0] + 122, goal[1] - 122).toFixed(1)} m, sampai ${miss.toFixed(2)} m dari titik ketuk`)

    // ketuk di balik batang pohon: jalur memutarinya, tidak menembus / tersangkut
    const trunk = await openTrunk(page)
    await teleport(page, trunk.x - 4, trunk.z, [trunk.x, trunk.z])
    await waitFrames(page, 5)
    await tap(await screenOf(page, trunk.x + 4, trunk.z))
    await waitFrames(page, 2)
    const around = await walkUntilDone(page, 200, [trunk.x, trunk.z])
    const miss2 = Math.hypot(around.x - trunk.x - 4, around.z - trunk.z)
    if (around.path || miss2 > 0.6) fail(`memutari pohon: berhenti ${miss2.toFixed(2)} m dari tujuan`)
    else if (around.closest < trunk.radius + 0.35 - 0.03) fail(`memutari pohon: menembus batang (jarak ${around.closest.toFixed(2)} m)`)
    else ok(`memutari batang pohon: sampai, jarak terdekat ke batang ${around.closest.toFixed(2)} m`)

    // ketuk laut dalam → berhenti di air dangkal, tidak "tenggelam" (tidak kembali ke pantai)
    // (zoom keluar dulu agar laut dalam terlihat di layar)
    await teleport(page, -122, 122, [-170, 170])
    await page.evaluate(() => {
      window.__pulau.cam.state.dist = 60
    })
    await waitFrames(page, 15)
    const sea = await page.evaluate(() => {
      // titik paling atas layar yang masih laut dalam
      const { pickGround, ground } = window.__pulau
      for (let y = 0.05; y < 0.5; y += 0.05) {
        const p = pickGround(innerWidth / 2, innerHeight * y)
        if (p && ground.heightAt(p.x, p.z) < -1.5) return { x: innerWidth / 2, y: innerHeight * y, depth: -ground.heightAt(p.x, p.z) }
      }
      return null
    })
    if (!sea) fail('tidak ada laut dalam di layar untuk diuji')
    else {
      await tap(sea)
      await waitFrames(page, 2)
      const wade = await walkUntilDone(page, 200)
      const depth = await page.evaluate(() => {
        const { player, ground } = window.__pulau
        return -ground.heightAt(player.position.x, player.position.z)
      })
      const respawned = await page.evaluate(() => !document.getElementById('pesan').hidden)
      if (respawned || depth > 1.0) fail(`ketuk laut: kedalaman ${depth.toFixed(2)} m, kembali ke pantai ${respawned}`)
      else ok(`ketuk laut (dalam ${sea.depth.toFixed(1)} m): berhenti di air dangkal ${Math.max(0, depth).toFixed(2)} m`)
      if (wade.path) fail('ketuk laut: masih berjalan setelah 200 frame')
    }
    await page.evaluate(() => {
      window.__pulau.cam.state.dist = 22
    })

    // tombol Pukul saat berjalan: prajurit berhenti di tempat dan mengayunkan pedang
    await teleport(page, -122, 122, [0, 0])
    await waitFrames(page, 3)
    await tap(await screenOf(page, ...(await openSpot(page, -122, 122, [0, 0]))))
    await waitFrames(page, 6)
    const fx0 = await page.evaluate(() => window.__pulau.effects.stats())
    const run = await state(page)
    await page.tap('#btn-pukul')
    await waitFrames(page, 2)
    const swing = await state(page)
    const fx1 = await attackDone(page)
    const after = await state(page)
    if (!run.path || run.speed < 1) fail('uji Pukul: prajurit tidak sedang berjalan sebelum menekan Pukul')
    else if (!swing.attacking || swing.path) fail(`tombol Pukul: mengayun ${swing.attacking}, masih berjalan ${swing.path}`)
    else if (after.attacking || fx1.slashes !== fx0.slashes + 1 || after.speed > 0.3) fail(`tombol Pukul: selesai ${!after.attacking}, sabetan ${fx1.slashes - fx0.slashes}, kecepatan ${after.speed.toFixed(2)}`)
    else ok('tombol Pukul: berhenti berjalan, mengayunkan pedang (1 sabetan), lalu diam')

    // memukul batang pohon dari dekat → serpihan kayu & daun
    const target = await openTrunk(page)
    await teleport(page, target.x - (target.radius + 0.5), target.z, [target.x, target.z])
    await waitFrames(page, 5)
    await page.tap('#btn-pukul')
    await waitFrames(page, 2)
    const fx2 = await attackDone(page)
    if (fx2.bursts !== fx1.bursts + 1 || fx2.lastKind !== 'pohon') fail(`Pukul batang pohon: serpihan ${fx2.bursts - fx1.bursts}, jenis ${fx2.lastKind}`)
    else ok('Pukul batang pohon: kena, serpihan kayu & daun muncul')
    await page.screenshot({ path: `${out}/${name}-pukul.png` })

    // kombo: Pukul ditekan lagi selagi gerakan berjalan → gerakan berikutnya menyusul
    await teleport(page, -122, 122, [0, 0])
    await waitGameTime(page, 1)
    const combo = []
    await page.tap('#btn-pukul')
    for (let i = 0; i < 60 && combo.length < 3; i++) {
      const mv = (await state(page)).move
      if (mv && mv !== combo[combo.length - 1]) {
        combo.push(mv)
        if (combo.length < 3) await page.tap('#btn-pukul')
      }
      await waitFrames(page, 1)
    }
    await attackDone(page)
    if (combo.join() !== 'tebas,tinju,tendang') fail(`kombo Pukul: ${combo.join(' → ')}`)
    else ok('kombo Pukul: tebas → tinju → tendang')

    // jurus 1 Cincang: 10 cincangan ke orc di depan → orc roboh
    await nearOrc(page, 0, 1.3)
    await waitFrames(page, 5)
    const c0 = await page.evaluate(() => window.__pulau.effects.stats().slashes)
    await page.tap('#btn-cincang')
    await waitFrames(page, 2)
    const chopMove = (await state(page)).move
    const c1 = await attackDone(page)
    const o1 = await orcStats(page)
    if (chopMove !== 'cincang' || c1.slashes - c0 !== 10) fail(`jurus Cincang: gerakan ${chopMove}, sabetan ${c1.slashes - c0}`)
    else if (o1[0].state === 'hidup') fail(`jurus Cincang: orc di depan masih hidup (nyawa ${o1[0].hp})`)
    else ok('jurus Cincang: 10 cincangan, orc di depan roboh')
    await page.screenshot({ path: `${out}/${name}-cincang.png` })

    // jurus 2 Hentak: melompat, menancapkan pedang, gelombang kejut melukai orc di sekitar
    await nearOrc(page, 0, 1.8)
    await waitFrames(page, 5)
    const h0 = await page.evaluate(() => window.__pulau.effects.stats())
    await page.tap('#btn-hentak')
    let top = 0
    for (let i = 0; i < 80; i++) {
      const s = await state(page)
      top = Math.max(top, s.h)
      if (!s.attacking && i > 1) break
      await waitFrames(page, 1)
    }
    const landed = await state(page)
    const h1 = await page.evaluate(() => window.__pulau.effects.stats())
    const o2 = await orcStats(page)
    const hurt2 = o2.filter(o => o.hp < 6).length
    if (top < 1.5 || Math.abs(landed.h) > 0.05 || h1.cracks !== h0.cracks + 1) fail(`jurus Hentak: tinggi ${top.toFixed(2)} m, di tanah ${landed.h.toFixed(2)}, retakan ${h1.cracks - h0.cracks}`)
    else if (hurt2 < 1) fail('jurus Hentak: tidak ada orc yang terluka')
    else ok(`jurus Hentak: melompat ${top.toFixed(2)} m, pedang menancap (retakan), ${hurt2} orc terluka`)

    // jurus 3 Putar: cincang lalu berputar sekali di tengah kelompok orc
    await nearOrc(page, 0, -1.6)
    await waitFrames(page, 5)
    const p0 = await page.evaluate(() => window.__pulau.effects.stats())
    await page.tap('#btn-putar')
    const phases = []
    for (let i = 0; i < 80; i++) {
      const s = await page.evaluate(() => window.__pulau.player.attackPhase)
      if (s && phases[phases.length - 1] !== s) phases.push(s)
      if (!s && i > 1) break
      await waitFrames(page, 1)
    }
    const p1 = await page.evaluate(() => window.__pulau.effects.stats())
    const hurt3 = (await orcStats(page)).filter(o => o.hp < 6).length
    if (!phases.includes('cincang') || !phases.includes('putar') || p1.spins !== p0.spins + 1) fail(`jurus Putar: tahap ${phases.join(' → ')}, pusaran ${p1.spins - p0.spins}`)
    else if (hurt3 < 2) fail(`jurus Putar: hanya ${hurt3} orc terluka`)
    else ok(`jurus Putar: cincang → putar, ${hurt3} orc di sekeliling terluka`)

    // jurus 4 Penggal: membidik 5 leher lalu memenggal semuanya dalam satu gerakan
    await nearOrc(page, 0, 7)
    await waitFrames(page, 5)
    const pg0 = await state(page)
    const coin0 = await page.evaluate(() => window.__pulau.bag.koin)
    await page.tap('#btn-penggal')
    await waitFrames(page, 2)
    const aimed = await page.evaluate(() => window.__pulau.enemies.list.filter(e => e.marked).length)
    await attackDone(page)
    const pg1 = await state(page)
    const o4 = await orcStats(page)
    const fx4 = await page.evaluate(() => window.__pulau.effects.stats())
    const cd4 = await page.evaluate(() => window.__pulau.player.cooldowns.penggal)
    if (aimed !== 5) fail(`jurus Penggal: ${aimed} orc dibidik (harus 5)`)
    else if (o4.filter(o => o.headless).length !== 5 || fx4.cuts < 5) fail(`jurus Penggal: kepala terpotong ${o4.filter(o => o.headless).length}, garis potong ${fx4.cuts}`)
    else if (Math.hypot(pg1.x - pg0.x, pg1.z - pg0.z) < 3 || cd4 < 10) fail(`jurus Penggal: prajurit pindah ${Math.hypot(pg1.x - pg0.x, pg1.z - pg0.z).toFixed(1)} m, jeda ${cd4.toFixed(1)}`)
    else ok(`jurus Penggal: 5 leher dibidik lalu dipenggal sekaligus, prajurit melesat ${Math.hypot(pg1.x - pg0.x, pg1.z - pg0.z).toFixed(1)} m`)
    const coin1 = await page.evaluate(() => window.__pulau.bag.koin)
    if (coin1 - coin0 < 30 || coin1 - coin0 > 60) fail(`koin dari 5 orc: ${coin0} → ${coin1}`)
    else ok(`koin dari 5 orc yang dipenggal: ${coin0} → ${coin1}`)
    await waitFrames(page, 4)
    await page.screenshot({ path: `${out}/${name}-penggal.png` })

    // orc yang roboh muncul lagi di perkemahan (waktu dipercepat)
    await page.evaluate(() => {
      window.__pulau.debug.timeScale = 4
    })
    const back = await page.waitForFunction(() => window.__pulau.enemies.list.slice(0, 5).every(e => e.state === 'hidup'), null, { timeout: 120000 })
      .then(() => true).catch(() => false)
    await page.evaluate(() => {
      window.__pulau.debug.timeScale = 1
    })
    if (!back) fail('orc yang roboh tidak muncul lagi')
    else ok('orc yang roboh muncul lagi di perkemahan (kepala utuh lagi)')

    // Penggal tanpa musuh di dekatnya → pesan, jeda pakai tidak terpakai
    await teleport(page, 150, -60, [0, 0])
    await page.evaluate(() => {
      window.__pulau.player.cooldowns.penggal = 0
    })
    await waitFrames(page, 3)
    await page.evaluate(() => {
      window.__pesanLog.length = 0
    })
    await page.tap('#btn-penggal')
    await waitFrames(page, 3)
    const none = await page.evaluate(() => ({
      move: window.__pulau.player.attackMove, cd: window.__pulau.player.cooldowns.penggal,
      msg: window.__pesanLog.join(' | '),
    }))
    if (none.move || none.cd > 0 || !none.msg.includes('Tidak ada musuh')) fail(`Penggal tanpa musuh: ${JSON.stringify(none)}`)
    else ok(`Penggal tanpa musuh: "${none.msg}", jeda pakai tidak terpakai`)

    // tombol Lompat
    await teleport(page, -122, 122, [0, 0])
    await waitFrames(page, 10)
    await page.tap('#btn-lompat')
    let peak = 0
    for (let i = 0; i < 8; i++) {
      await waitFrames(page, 1)
      peak = Math.max(peak, (await state(page)).h)
    }
    if (peak < 0.5) fail(`tombol Lompat: tinggi hanya ${peak.toFixed(2)} m`)
    else ok(`tombol Lompat: tinggi ${peak.toFixed(2)} m`)

    // geser satu jari memutar kamera — dan tidak dianggap ketukan (pemain tetap diam)
    await waitFrames(page, 15)
    const g0 = await state(page)
    await touch('touchStart', [{ x: 330, y: 450, id: 2 }])
    for (let i = 1; i <= 6; i++) await touch('touchMove', [{ x: 330 - i * 20, y: 450, id: 2 }])
    await touch('touchEnd', [])
    await waitFrames(page, 3)
    const g1 = await state(page)
    if (Math.abs(g1.yaw - g0.yaw) < 0.2) fail('geser tidak memutar kamera')
    else if (g1.path || Math.hypot(g1.x - g0.x, g1.z - g0.z) > 0.3) fail('geser kamera ikut menggerakkan pemain')
    else ok(`geser memutar kamera (${(g1.yaw - g0.yaw).toFixed(2)} rad), pemain tetap diam`)

    // cubit dua jari (dijauhkan) → kamera mendekat
    const d0 = await page.evaluate(() => window.__pulau.cam.state.dist)
    await touch('touchStart', [{ x: 260, y: 400, id: 3 }, { x: 320, y: 460, id: 4 }])
    for (let i = 1; i <= 5; i++) await touch('touchMove', [{ x: 260 - i * 12, y: 400 - i * 12, id: 3 }, { x: 320 + i * 12, y: 460 + i * 12, id: 4 }])
    await touch('touchEnd', [])
    await waitFrames(page, 3)
    const d1 = await page.evaluate(() => window.__pulau.cam.state.dist)
    if (d1 >= d0) fail(`cubit tidak mengubah jarak kamera (${d0.toFixed(1)} → ${d1.toFixed(1)})`)
    else ok(`cubit: jarak kamera ${d0.toFixed(1)} → ${d1.toFixed(1)} m`)

    // tombol Lihat pulau ↔ Main lagi
    await page.tap('#btn-mode')
    const m1 = await page.evaluate(() => window.__pulau.getMode())
    await page.tap('#btn-mode')
    const m2 = await page.evaluate(() => window.__pulau.getMode())
    if (m1 !== 'lihat' || m2 !== 'main') fail(`tombol mode: ${m1} → ${m2}`)
    else ok('tombol Lihat pulau ↔ Main lagi')

    // menu Kualitas: pilih Rendah → dimuat ulang dengan kualitas Rendah
    await page.tap('#btn-kualitas')
    if (await page.isHidden('#panel-kualitas')) fail('panel Kualitas tidak terbuka')
    await page.screenshot({ path: `${out}/${name}-menu-kualitas.png` })
    await page.tap('#panel-kualitas button[data-q="rendah"]')
    await page.waitForFunction(() => window.__pulau?.quality.level === 'rendah', null, { timeout: 180000 })
      .then(() => ok('menu Kualitas → Rendah diterapkan'))
      .catch(() => fail('pilihan kualitas Rendah tidak diterapkan'))
  }

  const bad = logs.filter(l => l.startsWith('[pageerror]') || l.startsWith('[error]'))
  if (bad.length) fail(bad.join('\n'))
  await ctx.close()
}
await browser.close()
console.log(gagal ? 'HASIL: GAGAL' : 'HASIL: LULUS')
process.exit(gagal ? 1 : 0)
