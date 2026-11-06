#!/usr/bin/env node
// Automated verification for Riverside Apartments.
//
// Runs the real game in headless Chromium (?test mode exposes window.__RA) and
// drives the actual physics, doors, elevator and interaction raycasts.
//
//   node tests/run-tests.cjs [--only=name,name] [--quick]      (or: npm test)
//
// Requires Playwright (require('playwright')) with a Chromium build.
const http = require('http')
const fs = require('fs')
const path = require('path')
const { chromium, devices } = require('playwright')

const ROOT = path.resolve(__dirname, '..') // the game folder is self-contained
const args = process.argv.slice(2)
const ONLY = (args.find(a => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean)
const QUICK = args.includes('--quick')
const PAGE = '/'

// ---- static server ----------------------------------------------------------------
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.mp3': 'audio/mpeg', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' }
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split('?')[0])
      if (p.endsWith('/')) p += 'index.html'
      const f = path.join(ROOT, p)
      if (!f.startsWith(ROOT) || !fs.existsSync(f)) { rsp.writeHead(404); return rsp.end('404') }
      rsp.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' })
      fs.createReadStream(f).pipe(rsp)
    })
    srv.listen(0, () => res(srv))
  })
}

// ---- tiny test harness --------------------------------------------------------------
const results = []
const tests = []
const test = (name, fn) => tests.push({ name, fn })
function check(cond, msg, detail) {
  if (!cond) { const e = new Error(msg); e.detail = detail; throw e }
}

const FLOORS = 8, H = 3

// Walk helpers executed in the page.
const inPage = {
  path: (pts, opts) => window.__RA.path(pts, opts),
}

async function main() {
  const srv = await serve()
  const base = `http://localhost:${srv.address().port}${PAGE}`
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })

  const live = new Set()
  async function open(query = '?test&shadows=0', ctxOpts = { viewport: { width: 800, height: 450 } }) {
    const ctx = await browser.newContext(ctxOpts)
    live.add(ctx)
    const page = await ctx.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    await page.goto(base + query)
    await page.waitForFunction(() => window.__RA, null, { timeout: 60000 })
    return { ctx, page, errors, E: (f, a) => page.evaluate(f, a) }
  }

  // =====================================================================================
  test('boot: page loads without errors, start state is correct', async () => {
    const { ctx, E, errors } = await open()
    const s = await E(() => __RA.step(0.3))
    check(errors.length === 0, 'console/page errors', errors)
    check(s.grounded && Math.abs(s.y - 21) < 0.01 && s.x > 5.06 && s.z < -6.06, 'player starts in the bedroom of 803 (top floor)', s)
    check(s.zones.apt803 && !s.zones.lobby, 'only nearby zones are loaded at start', s.zones)
    const counts = await E(() => ({ doors: __RA.game.doors.length, colliders: __RA.game.world.all.size, interactables: __RA.game.interactables.size }))
    check(counts.doors === FLOORS * 5 + 2 + 2 + 2 + 1, 'door count (5 per floor: 2 north + 2 south + stairs; + 2 in 703 + 2 in 803 + 2 entrance + roof)', counts)
    await ctx.close()
    return counts
  })

  // =====================================================================================
  test('vertical slice: street → lobby → elevator → floor 7 → 703 → living/bedroom/bathroom → roof → back down', async () => {
    const { ctx, E, errors } = await open()
    const log = []
    const step = async (name, f, a) => {
      const r = await E(f, a)
      log.push([name, r && r.ok !== undefined ? r.ok : true])
      if (r && r.ok === false) throw Object.assign(new Error('route step failed: ' + name), { detail: r })
      return r
    }
    await E(() => __RA.teleport(0.5, 0, -17.5, Math.PI))
    await step('walk to entrance', () => __RA.path([[0.5, -13.2]]))
    await step('open front door', () => __RA.use('door-entrance-x+'))
    await E(() => __RA.step(1))
    await step('enter lobby', () => __RA.path([[0.05, -12.6], [0.05, -10.5], [1.5, -7.0]]))
    check((await E(() => __RA.status())).flags.entered, 'entered flag')
    await step('front desk', () => __RA.path([[4.4, -6.3], [4.45, -4.4]]))
    await step('try 703 key before drawer is open (must be hidden)', () => {
      const it = [...__RA.game.interactables].find(i => i.id === 'key703')
      const c = it.aimBox().getCenter(new __RA.THREE.Vector3())
      const aimed = __RA.lookAt(c.x, c.y, c.z)
      return { ok: aimed !== 'key703', aimed }
    })
    await step('open desk drawer', () => __RA.use('drawer-desk'))
    await E(() => __RA.step(0.6))
    await step('take key', () => __RA.use('key703'))
    check((await E(() => __RA.status())).inventory.includes('key703'), 'key in inventory')
    await step('read key log', () => __RA.use('doc-keylog'))
    await step('photo on the desk', () => { __RA.path([[4.45, -5.0]]); return __RA.use('photo-lobby') })
    await step('elevator has no power yet', () => {
      __RA.path([[4.45, -2.5], [1.0, -1.8], [-1.0, 0.0], [-9.4, 0.15]])
      __RA.use('elevator-call-0')
      __RA.step(2)
      const s = __RA.status()
      return { ok: s.elevator.door === 0 && /no power/.test(s.toast), s }
    })
    await step('to maintenance door', () => __RA.path([[-5.55, 0.0]]))
    await step('open maintenance door', () => __RA.use('door-0-01'))
    await E(() => __RA.step(1))
    await step('into maintenance room', () => __RA.path([[-5.55, -2.4], [-8.4, -2.4], [-8.4, -1.9]]))
    for (const b of ['brk-elevator', 'brk-f7', 'brk-lobby', 'brk-stairs']) await step('breaker ' + b, id => __RA.use(id), b)
    const pw = (await E(() => __RA.status())).power
    check(pw.elevator && pw.f7 && pw.lobby && pw.stairs, 'all breakers on', pw)
    await step('read maintenance log', () => { __RA.path([[-8.4, -9.5], [-11.0, -10.3]]); return __RA.use('doc-maint') })
    await step('back to elevator', () => __RA.path([[-8.4, -9.5], [-8.4, -2.4], [-5.55, -2.4], [-5.55, 0.0], [-9.4, 0.15]]))
    await step('call elevator', () => __RA.use('elevator-call-0'))
    await step('doors open', () => __RA.waitFor("g.elevator.state==='open'", 10))
    await step('enter car', () => __RA.path([[-9.4, 2.3]]))
    await step('press 7', () => __RA.use('elevator-btn-6'))
    await step('ride to 7', () => __RA.waitFor("g.elevator.k===6 && g.elevator.state==='open'", 40))
    const s7 = await E(() => __RA.status())
    check(Math.abs(s7.y - 18) < 0.01 && s7.grounded, 'player rode the car to floor 7 (y=18)', s7)
    check(s7.zones.apt703, 'apartment 703 interior streamed in', s7.zones)
    await step('floor 7 corridor', () => __RA.path([[-9.4, 0.0], [5.95, 0.0]]))
    await step('photo in the corridor', () => { __RA.path([[7.2, 0.1]]); return __RA.use('photo-f7') })
    await step('back to 703', () => __RA.path([[5.95, 0.0]]))
    await step('unlock & open 703', () => __RA.use('door-6-03'))
    await E(() => __RA.step(1))
    check(!(await E(() => __RA.game.door('door-6-03').locked)), '703 unlocked by the key')
    await step('foyer', () => __RA.path([[5.95, -1.7], [5.95, -2.6]]))
    await step('kitchen', () => __RA.path([[4.8, -2.6], [3.0, -2.1]]))
    await step('kitchen light switch', () => __RA.use('sw-kitchen'))
    check(await E(() => __RA.game.switches['sw-kitchen'] && __RA.game.lights.isOn([...__RA.game.lights.fixtures].find(f => f.id === 'apt-kitchen'))), 'kitchen light on')
    await step('kitchen drawer', () => { __RA.path([[-2.5, -2.11]]); return __RA.use('drawer-kitchen-1') })
    await E(() => __RA.step(0.6))
    await step('photo in drawer', () => __RA.use('photo-kitchen'))
    await step('fridge', () => __RA.use('fridge'))
    await step('living room', () => __RA.path([[1.6, -2.1], [1.9, -4.0], [-1.0, -5.4]]))
    await step('diary on coffee table', () => { __RA.path([[-1.95, -7.2]]); return __RA.use('doc-diary1') })
    await step('living light', () => { __RA.path([[0.9, -5.2], [4.2, -5.2], [4.2, -6.0]]); return __RA.use('sw-living') })
    await step('gallery', () => __RA.path([[4.3, -5.3], [5.8, -5.3], [7.05, -5.1]]))
    await step('open bedroom door', () => __RA.use('door-703-bedroom'))
    await E(() => __RA.step(1))
    await step('bedroom', () => __RA.path([[7.05, -6.9], [7.0, -8.5]]))
    await step('bedroom switch', () => { __RA.path([[6.9, -6.9]]); return __RA.use('sw-bedroom') })
    await step('wardrobe', () => { __RA.path([[8.3, -7.4]]); return __RA.use('wardrobe-l') })
    await step('nightstand drawer', () => { __RA.path([[7.6, -10.4]]); return __RA.use('drawer-night-1') })
    await E(() => __RA.step(0.6))
    await step('photo in nightstand', () => __RA.use('photo-bedroom'))
    await step('diary on desk', () => { __RA.path([[6.6, -10.6]]); return __RA.use('doc-diary2') })
    await step('to bathroom door', () => __RA.path([[7.3, -8.8], [10.6, -6.9]]))
    await step('open bathroom door', () => __RA.use('door-703-bath'))
    await E(() => __RA.step(1))
    await step('bathroom', () => __RA.path([[10.6, -5.2], [11.0, -3.5]]))
    await step('mirror cabinet', () => { __RA.path([[10.2, -3.6]]); return __RA.use('cab-mirror') })
    await E(() => __RA.step(0.8))
    await step('photo behind mirror', () => __RA.use('photo-bath'))
    await step('bathroom note (scare)', () => { __RA.path([[10.2, -3.0]]); return __RA.use('doc-bath') })
    const sa = await E(() => __RA.status())
    for (const r of ['kitchen', 'living', 'bedroom', 'bathroom', 'scare']) check(sa.flags[r], 'visited/flag ' + r, sa.flags)
    // stairs up to the roof
    await step('leave 703', () => __RA.path([[11.0, -3.5], [10.6, -5.2], [10.6, -7.1], [7.05, -7.1], [7.05, -5.2], [5.95, -2.6], [5.95, -1.6], [5.95, 0.0], [-11.55, 0.2]]))
    await step('open stair door 7', () => __RA.use('door-stair-6'))
    await E(() => __RA.step(1))
    await step('climb to 8', () => __RA.path([[-11.55, 1.6], [-11.4, 2.6], [-13.0, 2.6], [-13.0, 6.6], [-11.4, 6.6], [-11.4, 2.4]]))
    await step('climb to roof', () => __RA.path([[-13.0, 2.6], [-13.0, 6.6], [-11.4, 6.6], [-11.4, 2.4], [-11.55, 1.6]]))
    check(Math.abs((await E(() => __RA.status())).y - 24) < 0.01, 'reached roof landing y=24')
    await step('open roof door', () => __RA.use('door-roof'))
    await E(() => __RA.step(1))
    await step('roof', () => __RA.path([[-11.55, 0.0], [-6, -2], [4.6, 1.2]]))
    await step('roof note', () => __RA.use('doc-roof'))
    await step('roof photo', () => __RA.use('photo-roof'))
    const sr = await E(() => __RA.status())
    check(sr.flags.roof && sr.flags.ending, 'roof flags', sr.flags)
    // return to the lobby by elevator (previously visited location)
    await step('back inside', () => __RA.path([[-6, -2], [-11.55, 0.0], [-11.55, 1.6], [-11.4, 2.4]]))
    await step('down a flight to 8', () => __RA.path([[-11.4, 6.6], [-13.0, 6.6], [-13.0, 2.6], [-11.55, 2.0]]))
    await step('open stair door 8', () => __RA.use('door-stair-7'))
    await E(() => __RA.step(1))
    await step('to elevator on 8', () => __RA.path([[-11.55, 0.2], [-9.4, 0.2]]))
    await step('call on 8', () => __RA.use('elevator-call-7'))
    await step('arrive 8', () => __RA.waitFor("g.elevator.k===7 && g.elevator.state==='open'", 30))
    await step('enter car 8', () => __RA.path([[-9.4, 2.3]]))
    await step('press 1', () => __RA.use('elevator-btn-0'))
    await step('ride to lobby', () => __RA.waitFor("g.elevator.k===0 && g.elevator.state==='open'", 40))
    await step('walk out to the street', () => __RA.path([[-9.4, 0.0], [0.05, 0.0], [1.5, -7.0], [0.05, -10.5], [0.05, -12.6], [0.5, -15]]))
    const end = await E(() => __RA.status())
    check(end.photos.length >= 5, 'collected photographs along the route', end.photos)
    check(end.recoveries === 0, 'no fail-safe recoveries were needed', end.recoveries)
    check(errors.length === 0, 'no runtime errors', errors)
    await ctx.close()
    return { steps: log.length, photos: end.photos.length, zones: end.zones }
  })

  // =====================================================================================
  test('start: wake up in 803 on the top floor, get out and take the stairs all the way down to the lobby', async () => {
    const { ctx, E, errors } = await open()
    const r = await E(() => {
      const out = []
      const st = (name, res) => { out.push([name, res.ok !== false]); if (res.ok === false) throw Object.assign(new Error(name), { res }) }
      try {
        const s0 = __RA.step(0.5)
        st('start in bedroom', { ok: s0.y === 21 && s0.grounded && /803/.test(document.getElementById('objective').textContent) })
        st('read phone', __RA.use('doc-home-phone'))
        st('light switch is dead', (() => { __RA.path([[7.0, -6.8]]); const r = __RA.use('sw8-bedroom'); return { ok: r.ok && /dead/.test(__RA.game.ui.lastToast) } })())
        st('bedroom door', (() => { __RA.path([[7.05, -6.8]]); return __RA.use('door-803-bedroom') })()); __RA.step(1)
        st('through the gallery', __RA.path([[7.05, -5.2], [5.95, -2.6], [5.95, -1.7]]))
        st('note under the door', __RA.use('doc-home-note'))
        st('front door of 803 (unlocked)', __RA.use('door-7-03')); __RA.step(1)
        st('corridor 8', __RA.path([[6.0, -1.7], [6.0, 0.2], [-11.55, 0.2]]))
        st('left home', { ok: __RA.game.flags.leftHome })
        st('stair door 8', __RA.use('door-stair-7')); __RA.step(1)
        st('onto landing', __RA.path([[-11.55, 1.6], [-11.4, 2.4]]))
        for (let k = 7; k >= 1; k--) st('down to floor ' + k, __RA.path([[-11.4, 6.6], [-13.0, 6.6], [-13.0, 2.6], [-11.4, 2.4]]))
        st('at ground landing', { ok: Math.abs(__RA.game.player.pos.y) < 0.01 })
        st('stair door 1', (() => { __RA.path([[-11.55, 1.9]]); return __RA.use('door-stair-0') })()); __RA.step(1)
        st('lobby', __RA.path([[-11.55, 0.2], [0.5, 0.0], [0.5, -4]]))
        st('lobby objective', { ok: __RA.game.flags.lobby && /front desk/.test(document.getElementById('objective').textContent) })
      } catch (e) { return { ok: false, out, failed: e.message, res: e.res, status: __RA.status() } }
      return { ok: true, out, recoveries: __RA.game.stats.recoveries }
    })
    check(r.ok, 'start route failed', r)
    check(r.recoveries === 0 && errors.length === 0, 'no recoveries / errors', { r, errors })
    await ctx.close()
    return r.out.map(([n]) => n).join(' → ')
  })

  // =====================================================================================
  test('stairs: every flight connects floor k to k+1 (up and down), floors 1–8 + roof', async () => {
    const { ctx, E } = await open()
    const r = await E(({ FLOORS }) => {
      const g = __RA.game, out = []
      g.setPower('stairs', true)
      for (let k = 0; k < FLOORS; k++) {
        const y = k * 3
        __RA.teleport(-11.55, y, 0.2, Math.PI)
        const d = g.door('door-stair-' + k); d.set(true, -1); __RA.step(1)
        const up = __RA.path([[-11.55, 1.6], [-11.4, 2.6], [-13.0, 2.6], [-13.0, 6.6], [-11.4, 6.6], [-11.4, 2.4]])
        const yUp = g.player.pos.y
        const down = __RA.path([[-11.4, 6.6], [-13.0, 6.6], [-13.0, 2.6], [-12.4, 2.2]])
        const yDown = g.player.pos.y
        d.set(false); __RA.step(0.8)
        out.push({ k, up: up.ok && Math.abs(yUp - (y + 3)) < 0.01, down: down.ok && Math.abs(yDown - y) < 0.01, yUp, yDown, why: up.why || down.why })
      }
      return out
    }, { FLOORS })
    for (const f of r) check(f.up && f.down, `stairs floor ${f.k + 1}`, f)
    await ctx.close()
    return r.map(f => `${f.k + 1}→${f.k + 2}: up ${f.up ? 'ok' : 'FAIL'} / down ${f.down ? 'ok' : 'FAIL'}`)
  })

  // =====================================================================================
  test('elevator: stops level with every floor, only that floor\'s doors open, rider exits on the right floor', async () => {
    const { ctx, E } = await open()
    const r = await E(({ FLOORS }) => {
      const g = __RA.game, e = g.elevator, out = []
      g.setPower('elevator', true)
      __RA.teleport(-9.4, 0, 2.3, 0)
      __RA.step(0.5)
      const order = [3, 7, 1, 6, 2, 5, 4, 0]
      for (const k of order) {
        e.press(g, k, null)
        const w = __RA.waitFor(`g.elevator.k===${k} && g.elevator.state==='open'`, 40)
        const p = g.player.pos
        const level = Math.abs(e.y - k * 3) < 1e-6
        const rider = Math.abs(p.y - k * 3) < 0.01 && g.player.grounded
        const doorsOk = e.landing.every((L, i) => {
          const c = L.colliders[0]
          const closedX = -9.95
          const open = Math.abs(c.minx - closedX) > 0.4
          return i === k ? open : !open
        })
        out.push({ k, arrived: w.ok, level, rider, doorsOk, t: +w.t.toFixed(1) })
      }
      // exit on floor 5 (k=4) and check we're in that corridor
      e.press(g, 4, null)
      __RA.waitFor(`g.elevator.k===4 && g.elevator.state==='open'`, 40)
      const ex = __RA.path([[-9.4, 0.0]])
      out.push({ exit: ex.ok && Math.abs(g.player.pos.y - 12) < 0.01 })
      // safety: doors re-open instead of closing on someone standing in the doorway
      __RA.teleport(-9.4, 12, 1.0, 0)
      e.queue = []; e.state = 'open'; e.openTimer = 0
      __RA.step(3)
      out.push({ safety: e.state !== 'idle' && e.door > 0.2 && !g.player.overlapping() })
      return out
    }, { FLOORS })
    for (const f of r.slice(0, 8)) check(f.arrived && f.level && f.rider && f.doorsOk, `elevator floor ${f.k + 1}`, f)
    check(r[8].exit, 'rider exits at floor 5')
    check(r[9].safety, 'door safety re-open')
    await ctx.close()
    return r.slice(0, 8).map(f => `floor ${f.k + 1}: level=${f.level} doors=${f.doorsOk} (${f.t}s)`)
  })

  // =====================================================================================
  test('doors: every door fits its wall opening, blocks when closed, passable when open; locked doors stay locked', async () => {
    const { ctx, E } = await open()
    const r = await E(() => {
      const g = __RA.game, W = g.world, out = []
      const statics = c => c.tag === 'door' || c.tag === 'elevatorDoor' || c.tag === 'elevator'
      for (const d of g.doors) {
        const res = { id: d.id }
        // panel geometry: closed panel direction + normal
        const ax = Math.cos(d.phi0), az = -Math.sin(d.phi0)
        const nx = -az, nz = ax
        const mid = { x: d.hinge.x + ax * d.width / 2, z: d.hinge.z + az * d.width / 2 }
        const y = d.hinge.y
        // 1) closed panel must not be buried in a wall (central 70% of its span is free of statics)
        d.set(false); d.angle = 0.0001; d.target = 0; d.update(1, g)
        let buried = 0
        for (let t = 0.15; t <= 0.85; t += 0.1) {
          const x = d.hinge.x + ax * d.width * t, z = d.hinge.z + az * d.width * t
          if (W.anyOverlap(x - 0.03, y + 0.1, z - 0.03, x + 0.03, y + d.height - 0.1, z + 0.03, c => statics(c))) buried++
        }
        res.fits = buried === 0
        // 2) opening is a real hole: header above it is solid, the frame is ≤ 2 cm from the panel ends
        const head = W.anyOverlap(mid.x - 0.05, y + d.height + 0.05, mid.z - 0.05, mid.x + 0.05, y + d.height + 0.15, mid.z + 0.05, c => statics(c))
        const jambA = W.anyOverlap(d.hinge.x - ax * 0.05 - 0.02, y + 1, d.hinge.z - az * 0.05 - 0.02, d.hinge.x - ax * 0.05 + 0.02, y + 1.1, d.hinge.z - az * 0.05 + 0.02, c => statics(c))
        const e2 = { x: d.hinge.x + ax * (d.width + 0.05), z: d.hinge.z + az * (d.width + 0.05) }
        const jambB = d.id.startsWith('door-entrance') ? true : W.anyOverlap(e2.x - 0.02, y + 1, e2.z - 0.02, e2.x + 0.02, y + 1.1, e2.z + 0.02, c => statics(c))
        res.framed = !!head && !!jambA && !!jambB
        // 3) closed: can't walk through (try from both sides)
        const wasLocked = d.locked
        const sides = [1, -1].map(s => ({ x: mid.x + nx * 0.9 * s, z: mid.z + nz * 0.9 * s }))
        let blocked = true
        for (const [i, s] of sides.entries()) {
          const o = sides[1 - i]
          __RA.teleport(s.x, y, s.z)
          if (g.player.overlapping()) continue // side not standable (e.g. furniture); the other side covers it
          __RA.step(0.3)
          __RA.walkTo(o.x, o.z, { timeout: 3 })
          const side = (g.player.pos.x - mid.x) * nx + (g.player.pos.z - mid.z) * nz
          if (Math.sign(side) !== Math.sign((s.x - mid.x) * nx + (s.z - mid.z) * nz)) blocked = false
        }
        res.blocksClosed = blocked
        // 4) locked doors refuse to open without the right key
        if (wasLocked) {
          __RA.teleport(sides[0].x, y, sides[0].z)
          __RA.step(0.2)
          d.interact(g)
          __RA.step(0.5)
          res.staysLocked = d.locked && d.angle < 0.01
        }
        // 5) opened: walk straight through in both directions
        d.locked = false
        let pass = true
        for (const [i, s] of sides.entries()) {
          const o = sides[1 - i]
          __RA.teleport(s.x, y, s.z)
          if (g.player.overlapping()) { pass = false; res.blockedSide = i; continue }
          d.set(true, 0); d.sign = 1
          // swing away from the player
          const mx = -Math.sin(d.phi0), mz = -Math.cos(d.phi0)
          d.sign = (s.x - d.hinge.x) * mx + (s.z - d.hinge.z) * mz > 0 ? -1 : 1
          __RA.step(1.2)
          const w = __RA.walkTo(o.x, o.z, { timeout: 6, tol: 0.25 })
          if (!w.ok) { pass = false; res.passFail = w.why }
          d.set(false); __RA.step(1.0)
        }
        res.passableOpen = pass
        d.locked = wasLocked
        d.angle = 0; d.target = 0; d.update(1, g)
        out.push(res)
      }
      return out
    })
    const bad = r.filter(d => !d.fits || !d.framed || !d.blocksClosed || !d.passableOpen || d.staysLocked === false)
    check(bad.length === 0, `${bad.length} door(s) failed`, bad)
    await ctx.close()
    return `${r.length} doors checked: fit opening, framed, block when closed, passable when open, ${r.filter(d => d.staysLocked).length} locked doors stay locked`
  })

  // =====================================================================================
  test('navigation: every floor\'s corridor connects the elevator, stairs and every apartment door; 703 rooms all reachable', async () => {
    const { ctx, E } = await open()
    const r = await E(({ FLOORS }) => {
      const g = __RA.game, out = []
      for (const d of g.doors) { d.locked = false; d.angle = 0; d.sign = 1; d.set(true) }
      g.setPower('elevator', true)
      __RA.step(2)
      for (let k = 0; k < FLOORS; k++) {
        const y = k * 3
        __RA.teleport(-9.4, y, 0, 0) // streams this floor's zones in
        const targets = {
          elevator: [-9.4, 0.5], stairDoor: [-11.55, 0.5], stairLanding: [-11.4, 2.2],
          door01: [-5.55, -0.5], door02: [0.45, -0.5], door03: [5.95, -0.5], door04: [-1.55, 0.5], door05: [7.45, 0.5],
          eastWindow: [13.2, 0], westWindow: [-13.2, 0],
        }
        if (k === 0) Object.assign(targets, { lobby: [0.5, -4], entrance: [0.5, -11.4], maintenance: [-9, -8], desk: [4.4, -4.4], street: [0.5, -16] })
        if (k === 6 || k === 7) Object.assign(targets, { kitchen: [0, -2.1], living: [-1, -6], dining: [2.7, -8.6], hall: [6.5, -3.5], bedroom: [9.5, -8.5], bathroom: [11, -3] })
        const bounds = k === 0 ? { x0: -16, x1: 16, z0: -18, z1: 8 } : undefined
        const res = __RA.reachable(y, [-9.4, 0], targets, bounds)
        out.push({ k, area: res.area, targets: res.targets, why: res.why })
      }
      // roof
      __RA.teleport(-11.55, 24, 0, 0)
      const roof = __RA.reachable(24, [-11.55, 0], { door: [-11.55, 1.6], tank: [3.6, 3.5], northEast: [13, -11], southEast: [13, 7], west: [-13, -10] })
      out.push({ k: 8, area: roof.area, targets: roof.targets })
      return out
    }, { FLOORS })
    for (const f of r) {
      const missing = Object.entries(f.targets || {}).filter(([, v]) => !v).map(([n]) => n)
      check(missing.length === 0, `floor ${f.k + 1}: unreachable ${missing.join(', ')}`, f)
    }
    await ctx.close()
    return r.map(f => `${f.k === 8 ? 'roof' : 'floor ' + (f.k + 1)}: ${f.area} m² walkable, ${Object.keys(f.targets).length} targets reachable`)
  })

  // =====================================================================================
  test('collision: walls, windows, furniture and closed doors are solid; no tunnelling at sprint speed', async () => {
    const { ctx, E } = await open()
    const r = await E(() => {
      const g = __RA.game, out = {}
      g.setPower('f7', true)
      const y7 = 18
      const probe = (name, from, to, opts = {}) => {
        __RA.teleport(from[0], from[1], from[2])
        __RA.step(0.2)
        __RA.walkTo(to[0], to[2], { timeout: 4, sprint: true, ...opts })
        const p = g.player.pos
        out[name] = { stoppedBefore: opts.check(p), at: [+p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2)], overlapping: !!g.player.overlapping() }
      }
      probe('exterior wall (bedroom)', [13.0, y7, -9.5], [13.0, y7, -14], { check: p => p.z > -11.7 })
      probe('window glass (bedroom)', [6.6, y7, -10.5], [6.6, y7, -14], { check: p => p.z > -11.7 })
      probe('partition wall (gallery | bath)', [7.5, y7, -2.6], [11, y7, -2.6], { check: p => p.x < 8.94 })
      probe('sofa', [1.2, y7, -8.3], [-1.5, y7, -8.3], { check: p => p.x > 0.4 })
      probe('bed', [7.6, y7, -10.2], [12, y7, -10.2], { check: p => p.x < 8.5 })
      probe('fridge', [-3.45, y7, -3.0], [-3.45, y7, -0.5], { check: p => p.z < -1.85 })
      probe('kitchen counter', [-1.0, y7, -2.15], [-1.0, y7, -0.5], { check: p => p.z < -1.72 })
      probe('kitchen island', [-0.1, y7, -4.3], [-0.1, y7, -1.0], { check: p => p.z < -3.4 })
      probe('grand piano', [2.6, y7, -8.6], [2.6, y7, -4.0], { check: p => p.z < -8.0 })
      probe('bathtub', [12.8, y7, -3.0], [12.8, y7, -6], { check: p => p.z > -3.9 })
      probe('shower glass', [10.0, y7, -3.0], [10.0, y7, -1.0], { check: p => p.z < -2.34 })
      probe('closed locked door 701', [-5.55, y7, 0.3], [-5.55, y7, -3], { check: p => p.z > -0.9 })
      probe('corridor end window', [12, y7, 0], [16, y7, 0], { check: p => p.x < 13.7 })
      probe('lobby glass', [-2.2, 0, -10.5], [-2.2, 0, -15], { check: p => p.z > -11.7 })
      probe('roof parapet', [0, 24, -10], [0, 24, -16], { check: p => p.z > -11.7 })
      probe('elevator closed doors (no car)', [-9.4, 9, 0.2], [-9.4, 9, 3], { check: p => p.z < 0.93 })
      probe('stair spine wall', [-13.0, 3 + 0.3, 4.2], [-10.9, 3, 4.2], { check: p => p.x < -12.3 })
      probe('map boundary', [20, 0, -25], [40, 0, -25], { check: p => p.x < 32 })
      return out
    })
    const bad = Object.entries(r).filter(([, v]) => !v.stoppedBefore || v.overlapping)
    check(bad.length === 0, 'solid geometry was penetrated', bad)
    await ctx.close()
    return Object.keys(r).map(n => `${n}: solid`)
  })

  // =====================================================================================
  test('escape fuzz: random sprint/crouch walks everywhere never clip into geometry, fall through floors or leave the map', async () => {
    const { ctx, E } = await open()
    const seconds = QUICK ? 8 : 25
    const r = await E(({ seconds }) => {
      const g = __RA.game, W = g.world, B = __RA.B
      for (const k of ['elevator', 'f7', 'lobby', 'stairs']) g.setPower(k, true)
      for (const d of g.doors) { if (Math.random() < 0.6) { d.locked = false; d.set(true) } }
      const spawns = []
      for (let k = 0; k < 8; k++) {
        const y = k * 3
        spawns.push([-12, y, 0], [0, y, 0], [11, y, 0], [-11.4, y, 2.2], [-12.9, y + 1.5, 6.6], [-9.4, y, 2.3])
      }
      spawns.push([0.5, 0, -4], [-9, 0, -4], [4.4, 0, -4.6], [0.5, 0, -16], [0.5, 0, -9], [-9, 0, -9], [-20, 0, -24], [20, 0, 10])
      spawns.push([7.4, 21, -10.4], [-1, 21, -6], [6.5, 21, -3.5], [11, 21, -3], [0, 21, -2.1])
      spawns.push([-1, 18, -6], [0, 18, -2.1], [6.5, 18, -3.5], [9.5, 18, -8.5], [11, 18, -3], [2.7, 18, -8.6], [0, 24, 0], [10, 24, 6])
      let worst = { overlap: 0, below: 0, outside: 0, escapes: 0, stuck: 0 }
      const issues = []
      let steps = 0
      const inside = p => p.x > B.x0 + 0.05 && p.x < B.x1 - 0.05 && p.z > B.z0 + 0.05 && p.z < B.z1 - 0.05
      for (const s of spawns) {
        __RA.teleport(s[0], s[1], s[2], Math.random() * 6.28)
        __RA.step(0.3)
        let inp = { x: 0, y: 1 }, t = 0, lastIn = inside(g.player.pos)
        let still = 0
        while (t < seconds) {
          if (Math.random() < 0.03) inp = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, sprint: Math.random() < 0.5, crouch: Math.random() < 0.15 }
          if (Math.random() < 0.02) g.yaw += (Math.random() - 0.5) * 3
          if (Math.random() < 0.004 && g.aimed) g.aimed.it.interact(g)
          if (g.ui.docOpen) g.ui.closeDocument()
          g.input.forced = inp
          const before = { ...g.player.pos }
          g.step(1 / 60); steps++; t += 1 / 60
          const p = g.player.pos
          const b = g.player.box()
          const ov = W.anyOverlap(b[0] + 0.01, b[1] + 0.01, b[2] + 0.01, b[3] - 0.01, b[4] - 0.01, b[5] - 0.01)
          if (ov) { worst.overlap++; if (issues.length < 10) issues.push({ kind: 'overlap', p: { ...p }, tag: ov.tag, c: [ov.minx, ov.miny, ov.minz, ov.maxx, ov.maxy, ov.maxz] }) }
          if (p.y < -0.6) { worst.below++; if (issues.length < 10) issues.push({ kind: 'below ground', p: { ...p } }) }
          if (p.x < -32 || p.x > 32 || p.z < -32 || p.z > 16) worst.outside++
          const isIn = inside(p)
          // leaving the footprint is only legal through the front entrance (ground floor)
          if (lastIn && !isIn && !(p.y < 0.5 && p.z < -11.5 && p.x > -0.5 && p.x < 1.5)) { worst.escapes++; if (issues.length < 10) issues.push({ kind: 'left building through geometry', from: before, to: { ...p } }) }
          if (!lastIn && isIn && p.y > 0.5 && !(p.y > 23.5)) { worst.escapes++; if (issues.length < 10) issues.push({ kind: 'entered building above ground through geometry', from: before, to: { ...p } }) }
          lastIn = isIn
          // stuck: grounded, wanting to move, and unable to move any direction for 3 s
          if (Math.hypot(p.x - before.x, p.z - before.z) < 1e-5 && Math.hypot(inp.x, inp.y) > 0.3) still += 1 / 60; else still = 0
          if (still > 3) {
            const tries = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dz]) => !W.anyOverlap(p.x + dx * 0.05 - 0.28, p.y + 0.02, p.z + dz * 0.05 - 0.28, p.x + dx * 0.05 + 0.28, p.y + g.player.h, p.z + dz * 0.05 + 0.28))
            if (!tries.some(Boolean)) { worst.stuck++; issues.push({ kind: 'stuck', p: { ...p } }) }
            still = 0
          }
        }
      }
      g.input.forced = null
      return { spawns: spawns.length, steps, ...worst, recoveries: g.stats.recoveries, issues }
    }, { seconds })
    check(r.overlap === 0 && r.below === 0 && r.outside === 0 && r.escapes === 0 && r.stuck === 0, 'fuzz found geometry problems', r)
    await ctx.close()
    return `${r.spawns} spawn points × ${seconds}s, ${r.steps} physics steps: 0 overlaps, 0 falls, 0 escapes, 0 stuck (fail-safe recoveries: ${r.recoveries})`
  })

  // =====================================================================================
  test('interactions: switches, breakers, drawers, cabinets, documents, pickups, flashlight, locks', async () => {
    const { ctx, E, page } = await open()
    const r = await E(() => {
      const g = __RA.game, o = {}
      // flashlight via keyboard
      const before = g.flashOn
      dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF' })); dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyF' }))
      __RA.step(0.1)
      o.flashlightKey = g.flashOn !== before
      // breaker off → lights off; on → on
      __RA.teleport(-8.4, 0, -1.9, 0)
      __RA.step(0.5)
      const fx = () => [...g.lights.fixtures].find(f => f.id === 'lobby-1')
      o.lobbyLightOffInitially = fx() && !g.lights.isOn(fx())
      o.breakerUse = __RA.use('brk-lobby').ok && g.power.lobby && g.lights.isOn(fx())
      // pickup + inventory UI
      __RA.teleport(-7.6, 0, -10.3, 0); __RA.step(0.3)
      o.pickupPhoto = __RA.use('photo-maint').ok && g.photos.has('photo-maint') && /1\/7/.test(document.getElementById('inventory').textContent)
      // document overlay opens and closes
      __RA.teleport(-11.6, 0, -10.4, 0); __RA.step(0.2)
      const it = [...g.interactables].find(i => i.id === 'doc-maint')
      const c = it.aimBox().getCenter(new __RA.THREE.Vector3()); __RA.lookAt(c.x, c.y, c.z)
      g.aimed.it.interact(g)
      o.documentOpens = g.ui.docOpen && document.getElementById('document').classList.contains('show') && /MAINTENANCE LOG/.test(document.getElementById('doc-text').textContent)
      document.getElementById('doc-close').click()
      o.documentCloses = !g.ui.docOpen
      // locked door + wrong key
      __RA.teleport(-5.55, 9, 0.4, 0); __RA.step(0.2)
      __RA.use('door-3-01')
      o.lockedMessage = /lock|handle|radiator|mildew/i.test(g.ui.lastToast) && g.door('door-3-01').locked
      // apartment light switch needs floor-7 power
      g.door('door-6-03').locked = false; g.door('door-6-03').set(true, -1); __RA.step(1)
      __RA.teleport(3.2, 18, -2.0, 0); __RA.step(0.2)
      const kf = () => [...g.lights.fixtures].find(f => f.id === 'apt-kitchen')
      __RA.use('sw-kitchen')
      o.switchWithoutPower = g.switches['sw-kitchen'] && !g.lights.isOn(kf())
      g.setPower('f7', true)
      o.switchWithPower = g.lights.isOn(kf())
      __RA.use('sw-kitchen')
      o.switchOff = !g.lights.isOn(kf())
      // cabinet + drawer state persists across zone unload/reload
      __RA.teleport(-2.0, 18, -2.15, 0); __RA.step(0.2)
      __RA.use('cab-k1'); __RA.step(1)
      __RA.use('drawer-kitchen-2'); __RA.step(1)
      const opened = g.state.get('cab-k1')?.open && g.state.get('drawer-kitchen-2')?.open
      __RA.teleport(0.5, 0, -4, 0); __RA.step(0.5) // apt703 unloads
      const unloaded = !g.zones.get('apt703').loaded
      __RA.teleport(-2.0, 18, -2.15, 0); __RA.step(0.5)
      const dr = [...g.interactables].find(i => i.id === 'drawer-kitchen-2')
      o.stateSurvivesStreaming = opened && unloaded && g.zones.get('apt703').loaded && dr.amount === 1
      return o
    })
    const bad = Object.entries(r).filter(([, v]) => !v)
    check(bad.length === 0, 'interaction checks failed: ' + bad.map(b => b[0]).join(', '), r)
    await ctx.close()
    return Object.keys(r).join(', ')
  })

  // =====================================================================================
  test('mobile (Android emulation): joystick moves, drag looks, USE / LIGHT / RUN / CROUCH buttons work', async () => {
    const dev = devices['Pixel 7'] || devices['Pixel 5']
    const { ctx, page, E, errors } = await open('?test&mobile=1&shadows=0', { ...dev })
    const cdp = await ctx.newCDPSession(page)
    const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map(([x, y, id]) => ({ x, y, id })) })
    const vw = dev.viewport.width, vh = dev.viewport.height
    const res = {}
    res.uiVisible = await E(() => ['btn-interact', 'btn-flashlight', 'btn-sprint', 'btn-crouch', 'touch-zone'].every(id => {
      const r = document.getElementById(id).getBoundingClientRect()
      return r.width > 30 && r.height > 30 && r.right <= innerWidth && r.bottom <= innerHeight && r.left >= 0
    }) && document.body.classList.contains('touch'))
    await E(() => { __RA.game.autoSim = true })
    // joystick: drag up from the lower-left
    const s0 = await E(() => __RA.status())
    await touch('touchStart', [[110, vh - 160, 1]])
    for (let i = 1; i <= 6; i++) { await touch('touchMove', [[110, vh - 160 - i * 12, 1]]); await page.waitForTimeout(30) }
    await page.waitForTimeout(1500)
    await touch('touchEnd', [])
    const s1 = await E(() => __RA.status())
    res.joystickMoves = s1.z - s0.z > 0.3 // facing +z at start
    // look: drag on the right half
    await touch('touchStart', [[vw * 0.75, vh * 0.4, 2]])
    for (let i = 1; i <= 5; i++) { await touch('touchMove', [[vw * 0.75 - i * 20, vh * 0.4, 2]]); await page.waitForTimeout(30) }
    await touch('touchEnd', [])
    await page.waitForTimeout(200)
    const s2 = await E(() => __RA.status())
    res.touchLook = Math.abs(s2.yaw - s1.yaw) > 0.2
    // simultaneous move + look (multi-touch)
    await touch('touchStart', [[110, vh - 160, 3]])
    await touch('touchMove', [[110, vh - 220, 3]])
    await touch('touchStart', [[110, vh - 220, 3], [vw * 0.7, vh * 0.4, 4]])
    for (let i = 1; i <= 4; i++) { await touch('touchMove', [[110, vh - 220, 3], [vw * 0.7 + i * 15, vh * 0.4, 4]]); await page.waitForTimeout(40) }
    await page.waitForTimeout(500)
    await touch('touchEnd', [])
    const s3 = await E(() => __RA.status())
    res.multiTouch = Math.abs(s3.yaw - s2.yaw) > 0.1 && Math.hypot(s3.x - s2.x, s3.z - s2.z) > 0.05
    const tap = async id => {
      const b = await page.locator('#' + id).boundingBox()
      await touch('touchStart', [[b.x + b.width / 2, b.y + b.height / 2, 9]])
      await page.waitForTimeout(80)
      await touch('touchEnd', [])
      await page.waitForTimeout(250)
    }
    const f0 = (await E(() => __RA.status())).flash
    await tap('btn-flashlight')
    res.flashlightButton = (await E(() => __RA.status())).flash !== f0
    await tap('btn-crouch')
    res.crouchButton = (await E(() => __RA.status())).crouching
    await tap('btn-crouch')
    await page.waitForTimeout(300)
    res.standUp = !(await E(() => __RA.status())).crouching
    await tap('btn-sprint')
    res.sprintToggle = await E(() => __RA.game.input.sprintToggle && document.getElementById('btn-sprint').classList.contains('on'))
    // interact: stand at the entrance, aim at the door, press USE
    await E(() => { __RA.game.autoSim = false; __RA.teleport(0.5, 0, -13.2, Math.PI); __RA.lookAt(-0.0, 1.2, -11.85); __RA.game.autoSim = true })
    await page.waitForTimeout(300)
    await tap('btn-interact')
    await page.waitForTimeout(600)
    res.useButton = await E(() => __RA.game.door('door-entrance-x+').target > 0)
    res.noErrors = errors.length === 0
    await page.screenshot({ path: path.join(__dirname, 'mobile-screenshot.png') })
    const bad = Object.entries(res).filter(([, v]) => !v)
    check(bad.length === 0, 'mobile checks failed: ' + bad.map(b => b[0]).join(', '), { res, errors })
    await ctx.close()
    return Object.keys(res).join(', ')
  })

  // =====================================================================================
  test('performance: streaming + per-floor culling keep draw calls bounded', async () => {
    const { ctx, E } = await open()
    const r = await E(() => {
      const g = __RA.game, out = {}
      const spots = { street: [0.5, 0, -17.5, Math.PI], lobby: [0.5, 0, -4, Math.PI], floor4: [0, 9, 0, -Math.PI / 2], floor7: [0, 18, 0, -Math.PI / 2], apt703: [-1, 18, -6, 0.5], roof: [0, 24, 0, 0] }
      for (const [n, [x, y, z, yaw]] of Object.entries(spots)) {
        __RA.teleport(x, y, z, yaw)
        __RA.step(0.1)
        g.renderer.info.reset()
        g.render()
        const loaded = g.zones.list.filter(z => z.loaded).map(z => z.name)
        out[n] = { calls: g.renderer.info.render.calls, tris: g.renderer.info.render.triangles, zones: loaded.length, colliders: g.world.all.size }
      }
      out.programs = g.renderer.info.programs.length
      return out
    })
    for (const [n, v] of Object.entries(r)) if (v.calls) check(v.calls < 450, `${n}: too many draw calls`, v)
    check(r.lobby.zones < 5 && r.floor7.zones <= 5, 'only nearby zones resident', r)
    await ctx.close()
    return Object.entries(r).filter(([, v]) => v.calls).map(([n, v]) => `${n}: ${v.calls} calls, ${v.tris} tris, ${v.zones} zones`).concat([`shader programs: ${r.programs}`])
  })

  // ---- run ------------------------------------------------------------------------------
  const t0 = Date.now()
  for (const t of tests) {
    if (ONLY.length && !ONLY.some(o => t.name.includes(o))) continue
    const s = Date.now()
    try {
      const info = await t.fn().finally(async () => { for (const c of live) await c.close().catch(() => {}); live.clear() })
      results.push({ name: t.name, ok: true, info, ms: Date.now() - s })
      console.log(`\x1b[32m✔\x1b[0m ${t.name} (${((Date.now() - s) / 1000).toFixed(1)}s)`)
      for (const line of [].concat(info || [])) console.log('    ' + (typeof line === 'string' ? line : JSON.stringify(line)))
    } catch (e) {
      results.push({ name: t.name, ok: false, error: e.message, detail: e.detail, ms: Date.now() - s })
      console.log(`\x1b[31m✘\x1b[0m ${t.name}\n    ${e.message}\n    ${JSON.stringify(e.detail)?.slice(0, 2000)}`)
    }
  }
  await browser.close()
  srv.close()
  const failed = results.filter(r => !r.ok).length
  console.log(`\n${results.length - failed}/${results.length} passed in ${((Date.now() - t0) / 1000).toFixed(0)}s`)
  fs.writeFileSync(path.join(__dirname, 'last-report.json'), JSON.stringify(results, null, 2))
  process.exit(failed ? 1 : 0)
}

main().catch(e => { console.error(e); process.exit(1) })
