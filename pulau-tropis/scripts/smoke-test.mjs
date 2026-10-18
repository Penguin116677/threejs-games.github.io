import { chromium, devices } from 'playwright'
// Smoke test otomatis: buka game di Chromium headless dengan emulasi HP
// (portrait + landscape) dan desktop, cek error, ambil screenshot, dan uji
// gestur geser 1 jari. Pemakaian: npm run build && npm run test:smoke
// Catatan: FPS di sini memakai render software (SwiftShader), BUKAN ukuran performa HP.
import { mkdirSync } from 'node:fs'
const out = process.argv[2] || 'screenshots'
const URL = process.argv[3] || 'http://localhost:4173/'
mkdirSync(out, { recursive: true })
let gagal = false
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const cases = [
  ['hp-portrait', { ...devices['Pixel 7'] }],
  ['hp-landscape', { ...devices['Pixel 7 landscape'] }],
  ['desktop', { viewport: { width: 1280, height: 720 } }],
]
for (const [name, opts] of cases) {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
  const logs = []
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`))
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`))
  const t0 = Date.now()
  await page.goto(URL)
  await page.waitForFunction(() => window.__pulau, null, { timeout: 60000 })
  const loadMs = Date.now() - t0
  await page.waitForTimeout(2500)
  const info = await page.evaluate(() => ({
    err: !document.getElementById('error').hidden ? document.getElementById('error-teks').textContent : null,
    fps: document.getElementById('fps').textContent,
    q: window.__pulau.quality.level,
    tris: window.__pulau.renderer.info.render.triangles,
    calls: window.__pulau.renderer.info.render.calls,
  }))
  if (info.err || logs.some(l => l.startsWith('[pageerror]') || l.startsWith('[error]'))) gagal = true
  console.log(name, 'load', loadMs, 'ms', JSON.stringify(info), logs.filter(l => !l.includes('GPU stall')).join('\n'))
  await page.screenshot({ path: `${out}/${name}.png` })
  if (name === 'hp-portrait') {
    // uji gestur sentuh: geser 1 jari memutar kamera
    const before = await page.evaluate(() => window.__pulau.camera.position.toArray())
    const cdp = await ctx.newCDPSession(page)
    const tp = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] })
    await tp('touchStart', 100, 400)
    for (let i = 1; i <= 10; i++) await tp('touchMove', 100 + i * 20, 400)
    await tp('touchEnd')
    await page.waitForTimeout(800)
    const after = await page.evaluate(() => window.__pulau.camera.position.toArray())
    if (before.join() === after.join()) gagal = true
    console.log('touch rotate before', before.map(v => v.toFixed(1)), 'after', after.map(v => v.toFixed(1)))
    await page.screenshot({ path: `${out}/hp-portrait-setelah-geser.png` })
  }
  await ctx.close()
}
await browser.close()
console.log(gagal ? 'HASIL: GAGAL' : 'HASIL: LULUS')
process.exit(gagal ? 1 : 0)
