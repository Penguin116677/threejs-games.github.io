import { chromium, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
// Smoke test otomatis (Chromium headless, render software) untuk HP portrait/landscape,
// HP kualitas Rendah, dan komputer. Memeriksa:
// - game termuat tanpa error, karakter (model) muncul berdiri di tanah
// - rumput di lereng gunung, data garis pantai (ombak) valid; memotret pantai & kelapa
// - komputer: jalan (W), lompat (Spasi), tabrakan batang pohon, laut dalam → kembali ke
//   pantai, mendaki lereng gunung
// - HP: joystick sentuh, tombol Lompat, geser kamera, cubit zoom, tombol Lihat pulau,
//   menu Kualitas
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
const cases = [
  ['hp-portrait', { ...devices['Pixel 7'] }, ''],
  ['hp-landscape', { ...devices['Pixel 7 landscape'] }, ''],
  ['hp-rendah', { ...devices['Pixel 7'] }, '?kualitas=rendah'],
  ['desktop', { viewport: { width: 1280, height: 720 } }, ''],
]

const waitFrames = (page, n) => page.evaluate(n => new Promise(resolve => {
  const f0 = window.__pulau.frames()
  const tick = () => (window.__pulau.frames() - f0 >= n ? resolve() : requestAnimationFrame(tick))
  tick()
}), n)

const state = page => page.evaluate(() => {
  const { player, ground, follow } = window.__pulau
  const p = player.position
  const g = ground.heightAt(p.x, p.z)
  return { x: p.x, y: p.y, z: p.z, ground: g, h: p.y - g, speed: player.speed, grounded: player.grounded, yaw: follow.yaw, model: player.usingModel }
})

// pindahkan pemain; kamera di belakangnya menghadap `toward` ([x, z]) bila diberikan
const teleport = (page, x, z, toward) => page.evaluate(([x, z, toward]) => {
  const { player, follow } = window.__pulau
  const heading = toward ? Math.atan2(toward[0] - x, toward[1] - z) : player.heading
  player.placeAt(x, z, heading)
  follow.lookFrom(heading + Math.PI, 0.3)
}, [x, z, toward])

async function waitReady(page) {
  await page.waitForFunction(() => window.__pulau || !document.getElementById('error').hidden, null, { timeout: 180000 })
}

for (const [name, opts, query] of cases) {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
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
  if (info.err) {
    fail(`error di layar: ${info.err}`)
    await ctx.close()
    continue
  }
  await page.screenshot({ path: `${out}/${name}.png` })

  const s0 = await state(page)
  if (!s0.model) fail('model karakter tidak termuat (memakai karakter cadangan)')
  if (Math.abs(s0.h) > 0.05) fail(`karakter tidak berdiri di tanah (selisih ${s0.h.toFixed(2)} m)`)
  else ok('karakter berdiri di tanah')

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

  if (name === 'desktop') {
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

    // tabrakan: berjalan lurus ke batang pohon hutan
    const trunk = await page.evaluate(() => {
      const list = window.__pulau.trees.userData.trunks.filter(t => t.radius === 0.7)
      return list[Math.floor(list.length / 2)]
    })
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

    // joystick: sentuh kiri bawah, dorong ke atas penuh
    await teleport(page, -122, 122, [0, 0])
    await waitFrames(page, 5)
    const a = await state(page)
    await touch('touchStart', [{ x: 90, y: 700, id: 1 }])
    for (let i = 1; i <= 6; i++) await touch('touchMove', [{ x: 90, y: 700 - i * 15, id: 1 }])
    await waitFrames(page, 25)
    await page.screenshot({ path: `${out}/${name}-joystick.png` })
    await touch('touchEnd', [])
    const b = await state(page)
    const moved = Math.hypot(b.x - a.x, b.z - a.z)
    if (moved < 3) fail(`joystick: hanya pindah ${moved.toFixed(1)} m`)
    else ok(`joystick: pindah ${moved.toFixed(1)} m`)

    // tombol Lompat
    await waitFrames(page, 10)
    await page.tap('#btn-lompat')
    let peak = 0
    for (let i = 0; i < 8; i++) {
      await waitFrames(page, 1)
      peak = Math.max(peak, (await state(page)).h)
    }
    if (peak < 0.5) fail(`tombol Lompat: tinggi hanya ${peak.toFixed(2)} m`)
    else ok(`tombol Lompat: tinggi ${peak.toFixed(2)} m`)

    // geser layar kanan memutar kamera
    const yaw0 = (await state(page)).yaw
    await touch('touchStart', [{ x: 330, y: 450, id: 2 }])
    for (let i = 1; i <= 6; i++) await touch('touchMove', [{ x: 330 - i * 20, y: 450, id: 2 }])
    await touch('touchEnd', [])
    await waitFrames(page, 3)
    const yaw1 = (await state(page)).yaw
    if (Math.abs(yaw1 - yaw0) < 0.2) fail('geser kanan tidak memutar kamera')
    else ok(`geser kanan memutar kamera (${(yaw1 - yaw0).toFixed(2)} rad)`)

    // cubit dua jari (dijauhkan) → kamera mendekat
    const d0 = await page.evaluate(() => window.__pulau.follow.state.dist)
    await touch('touchStart', [{ x: 260, y: 400, id: 3 }, { x: 320, y: 460, id: 4 }])
    for (let i = 1; i <= 5; i++) await touch('touchMove', [{ x: 260 - i * 12, y: 400 - i * 12, id: 3 }, { x: 320 + i * 12, y: 460 + i * 12, id: 4 }])
    await touch('touchEnd', [])
    await waitFrames(page, 3)
    const d1 = await page.evaluate(() => window.__pulau.follow.state.dist)
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
