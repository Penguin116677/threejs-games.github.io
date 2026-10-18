import { chromium, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
// Smoke test otomatis: buka game di Chromium headless dengan emulasi HP
// (portrait + landscape) dan desktop, di ketiga tingkat kualitas. Memeriksa:
// tidak ada error, rumput muncul di lereng gunung, gestur geser 1 jari memutar
// kamera, dan menu Kualitas benar-benar mengganti tingkat kualitas.
// Pemakaian: npm run build && npm run preview (terminal lain) && npm run test:smoke
// Catatan: FPS di sini memakai render software (SwiftShader), BUKAN ukuran performa HP.
const out = process.argv[2] || 'screenshots'
const URL = process.argv[3] || 'http://localhost:4173/'
mkdirSync(out, { recursive: true })
let gagal = false
const fail = msg => {
  gagal = true
  console.log('  GAGAL:', msg)
}

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const cases = [
  ['hp-portrait', { ...devices['Pixel 7'] }, ''],
  ['hp-landscape', { ...devices['Pixel 7 landscape'] }, ''],
  ['hp-rendah', { ...devices['Pixel 7'] }, '?kualitas=rendah'],
  ['desktop', { viewport: { width: 1280, height: 720 } }, ''],
]

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
  await page.waitForTimeout(2500)
  const info = await page.evaluate(() => ({
    err: !document.getElementById('error').hidden ? document.getElementById('error-teks').textContent : null,
    fps: document.getElementById('fps').textContent,
    q: window.__pulau?.quality.level,
    tris: window.__pulau?.renderer.info.render.triangles,
    calls: window.__pulau?.renderer.info.render.calls,
  }))
  console.log(name, 'load', loadMs, 'ms', JSON.stringify(info))
  if (info.err) fail(`error di layar: ${info.err}`)
  await page.screenshot({ path: `${out}/${name}.png` })

  if (!info.err) {
    // rumput: kamera di padang lereng gunung barat → harus ada rumput yang digambar
    await page.evaluate(() => {
      const { camera, controls, ground } = window.__pulau
      controls.target.set(-36, ground.heightAt(-36, -88) + 0.8, -88)
      camera.position.set(-50, ground.heightAt(-50, -95) + 1.8, -95)
      controls.update()
    })
    await page.waitForFunction(() => window.__pulau.grass.userData.stats().instances > 0, null, { timeout: 30000 })
      .catch(() => fail('rumput tidak muncul di lereng gunung'))
    await page.waitForTimeout(1500)
    console.log('  rumput', JSON.stringify(await page.evaluate(() => window.__pulau.grass.userData.stats())))
    await page.screenshot({ path: `${out}/${name}-rumput.png` })
  }

  if (name === 'hp-portrait' && !info.err) {
    // uji gestur sentuh: geser 1 jari memutar kamera
    const before = await page.evaluate(() => window.__pulau.camera.position.toArray())
    const cdp = await ctx.newCDPSession(page)
    const tp = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] })
    await tp('touchStart', 100, 400)
    for (let i = 1; i <= 10; i++) await tp('touchMove', 100 + i * 20, 400)
    await tp('touchEnd')
    await page.waitForTimeout(800)
    const after = await page.evaluate(() => window.__pulau.camera.position.toArray())
    if (before.join() === after.join()) fail('geser 1 jari tidak memutar kamera')
    console.log('  geser: sebelum', before.map(v => v.toFixed(1)).join(','), 'sesudah', after.map(v => v.toFixed(1)).join(','))

    // uji menu Kualitas: buka panel, pilih Rendah → halaman dimuat ulang dengan kualitas rendah
    await page.tap('#btn-kualitas')
    if (await page.isHidden('#panel-kualitas')) fail('panel Kualitas tidak terbuka')
    await page.screenshot({ path: `${out}/${name}-menu-kualitas.png` })
    await page.tap('#panel-kualitas button[data-q="rendah"]')
    await page.waitForFunction(() => window.__pulau?.quality.level === 'rendah', null, { timeout: 180000 })
      .catch(() => fail('pilihan kualitas Rendah tidak diterapkan'))
    console.log('  menu kualitas → sekarang:', await page.evaluate(() => window.__pulau?.quality.level))
  }

  const bad = logs.filter(l => l.startsWith('[pageerror]') || l.startsWith('[error]'))
  if (bad.length) fail(bad.join('\n'))
  await ctx.close()
}
await browser.close()
console.log(gagal ? 'HASIL: GAGAL' : 'HASIL: LULUS')
process.exit(gagal ? 1 : 0)
