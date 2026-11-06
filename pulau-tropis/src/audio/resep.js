// Resep efek suara (v0.25.0): setiap suara disusun dari osilator, derau tersaring & amplop.
// Bentuk resep: { fn(a, out, t, opts) → lama (detik), vol, range (m), ref (m), ui, gema, penting }
// atau suasana berulang: { loop(a, out) → { set(param, now) }, vol, gema }.
// a = mesin (a.ctx, a.buffers), out = GainNode tujuan, t = waktu mulai (detik AudioContext).

const rnd = (a, b) => a + Math.random() * (b - a)
const pick = arr => arr[Math.floor(Math.random() * arr.length)]

// amplop: diam → puncak (serang `at`) → tahan → meluruh eksponensial sampai `dur`
function env(param, t, at, dur, peak, hold = 0) {
  param.setValueAtTime(0.0001, t)
  param.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + Math.max(0.001, at))
  if (hold > 0) param.setValueAtTime(Math.max(0.0002, peak), t + at + hold)
  param.exponentialRampToValueAtTime(0.0001, t + Math.max(at + hold + 0.01, dur))
}

// derau tersaring: kind white / pink / brown; type = jenis saringan; f → f1 (sapuan)
function noise(a, out, t, { dur = 0.2, kind = 'white', type = 'bandpass', f = 1000, f1 = null, q = 1, gain = 0.5, at = 0.005, hold = 0, rate = 1, f2 = null }) {
  const c = a.ctx
  const src = c.createBufferSource()
  src.buffer = a.buffers[kind]
  src.loop = true
  src.playbackRate.value = rate
  const fl = c.createBiquadFilter()
  fl.type = type
  fl.frequency.setValueAtTime(f, t)
  if (f1) fl.frequency.exponentialRampToValueAtTime(f1, t + (f2 ? dur * 0.45 : dur))
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur)
  fl.Q.value = q
  const g = c.createGain()
  env(g.gain, t, at, dur, gain, hold)
  src.connect(fl).connect(g).connect(out)
  src.start(t, Math.random() * 1.5)
  src.stop(t + dur + 0.05)
  a.until = Math.max(a.until || 0, t + dur)
  return dur
}

// nada: type sine / triangle / square / sawtooth; f → f1 (sapuan)
function tone(a, out, t, { type = 'sine', f = 440, f1 = null, dur = 0.2, gain = 0.3, at = 0.005, hold = 0, curve = 'exp', lp = null, detune = 0 }) {
  const c = a.ctx
  const o = c.createOscillator()
  o.type = type
  o.frequency.setValueAtTime(f, t)
  o.detune.value = detune
  if (f1)
    if (curve === 'exp') o.frequency.exponentialRampToValueAtTime(f1, t + dur)
    else o.frequency.linearRampToValueAtTime(f1, t + dur)

  const g = c.createGain()
  env(g.gain, t, at, dur, gain, hold)
  let node = o
  if (lp) {
    const fl = c.createBiquadFilter()
    fl.type = 'lowpass'
    fl.frequency.value = lp
    node = o.connect(fl)
  }
  node.connect(g).connect(out)
  o.start(t)
  o.stop(t + dur + 0.05)
  a.until = Math.max(a.until || 0, t + dur)
  return dur
}

// lonceng / logam: beberapa sinus tak harmonis yang meluruh
function bell(a, out, t, { f = 800, ratios = [1, 2.76, 5.4, 8.93], dur = 0.8, gain = 0.25, decay = 0.7 }) {
  ratios.forEach((r, i) => tone(a, out, t, { f: f * r, dur: dur * Math.pow(decay, i), gain: gain / (1 + i * 0.9), at: 0.002 }))
  return dur
}

// distorsi lembut (geram / aum)
function shaper(c, k = 6) {
  const ws = c.createWaveShaper()
  const n = 1024
  const curve = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1
    curve[i] = Math.tanh(x * k) / Math.tanh(k)
  }
  ws.curve = curve
  return ws
}

// geram berformant (orc, naga): gergaji rendah bergetar → distorsi → dua saringan "mulut"
function growl(a, out, t, { f = 80, f1 = null, dur = 0.8, gain = 0.4, formants = [500, 1100], q = 3, wobble = 18, wobbleDepth = 12, at = 0.04, drive = 4, noiseMix = 0.25, lp = 2200 }) {
  const c = a.ctx
  const o = c.createOscillator()
  o.type = 'sawtooth'
  o.frequency.setValueAtTime(f, t)
  if (f1) o.frequency.linearRampToValueAtTime(f1, t + dur * 0.8)
  const lfo = c.createOscillator()
  lfo.frequency.value = wobble
  const lg = c.createGain()
  lg.gain.value = wobbleDepth
  lfo.connect(lg).connect(o.frequency)
  const ws = shaper(c, drive)
  const mix = c.createGain()
  mix.gain.value = 1
  o.connect(ws).connect(mix)
  const g = c.createGain()
  env(g.gain, t, at, dur, gain, dur * 0.3)
  const low = c.createBiquadFilter()
  low.type = 'lowpass'
  low.frequency.value = lp
  for (const fm of formants) {
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(fm, t)
    if (f1) bp.frequency.linearRampToValueAtTime(fm * (f1 / f) ** 0.5, t + dur)
    bp.Q.value = q
    mix.connect(bp).connect(low)
  }
  low.connect(g).connect(out)
  if (noiseMix > 0) noise(a, g, t, { dur, kind: 'pink', type: 'bandpass', f: formants[0], q: 1, gain: noiseMix, at })
  o.start(t)
  o.stop(t + dur + 0.05)
  lfo.start(t)
  lfo.stop(t + dur + 0.05)
  a.until = Math.max(a.until || 0, t + dur)
  return dur
}

// suara orang (bukan kata-kata): suku kata berformant vokal acak — "ucapan" NPC & pemain
const VOWELS = [[730, 1090], [270, 2290], [300, 870], [530, 1840], [570, 840], [440, 1020]]
function babble(a, out, t, { syll = 4, f0 = 160, gain = 0.22, rate = 1, breathy = 0.15 }) {
  const c = a.ctx
  let at = t
  for (let i = 0; i < syll; i++) {
    const len = rnd(0.07, 0.15) / rate
    const [f1, f2] = pick(VOWELS)
    const o = c.createOscillator()
    o.type = 'sawtooth'
    const p = f0 * rnd(0.9, 1.12) * (i === syll - 1 ? 0.88 : 1)
    o.frequency.setValueAtTime(p, at)
    o.frequency.linearRampToValueAtTime(p * rnd(0.92, 1.06), at + len)
    const g = c.createGain()
    env(g.gain, at, 0.015, len, gain, len * 0.3)
    const sum = c.createGain()
    for (const [fm, k] of [[f1, 1], [f2, 0.55]]) {
      const bp = c.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = fm
      bp.Q.value = 5
      const kg = c.createGain()
      kg.gain.value = k * 2.2
      o.connect(bp).connect(kg).connect(sum)
    }
    sum.connect(g).connect(out)
    o.start(at)
    o.stop(at + len + 0.03)
    if (Math.random() < 0.4) noise(a, out, at, { dur: 0.05, type: 'highpass', f: 3500, gain: breathy * 0.6 }) // konsonan
    at += len + rnd(0.01, 0.05) / rate
  }
  return at - t + 0.05
}

// percik air
function splash(a, out, t, { size = 1, gain = 0.5 }) {
  noise(a, out, t, { dur: 0.25 + size * 0.35, type: 'bandpass', f: 1600, f1: 500, q: 0.8, gain, at: 0.012 })
  noise(a, out, t + 0.02, { dur: 0.18 + size * 0.2, type: 'highpass', f: 3000, gain: gain * 0.35, at: 0.01 })
  const n = 2 + Math.round(size * 3)
  for (let i = 0; i < n; i++) tone(a, out, t + rnd(0.04, 0.3 * size + 0.1), { f: rnd(500, 1400), f1: rnd(900, 2200), dur: 0.05, gain: gain * 0.12 })
  return 0.5 + size * 0.4
}

// langkah per permukaan; k = kuat (jalan 0,6 · lari 1)
const STEP = {
  pasir: (a, o, t, k) => {
    noise(a, o, t, { dur: 0.14, kind: 'pink', type: 'lowpass', f: 1800, f1: 600, gain: 0.32 * k, at: 0.01 })
    return tone(a, o, t, { f: 90, f1: 50, dur: 0.07, gain: 0.12 * k })
  },
  rumput: (a, o, t, k) => {
    noise(a, o, t, { dur: 0.12, type: 'bandpass', f: 2600, q: 0.6, gain: 0.22 * k, at: 0.012 })
    noise(a, o, t + 0.03, { dur: 0.09, type: 'highpass', f: 4500, gain: 0.08 * k })
    return tone(a, o, t, { f: 110, f1: 55, dur: 0.06, gain: 0.12 * k })
  },
  batu: (a, o, t, k) => {
    tone(a, o, t, { f: 150, f1: 70, dur: 0.06, gain: 0.22 * k })
    return noise(a, o, t, { dur: 0.05, type: 'bandpass', f: rnd(2600, 3600), q: 2, gain: 0.28 * k, at: 0.002 })
  },
  kayu: (a, o, t, k) => {
    tone(a, o, t, { type: 'triangle', f: rnd(170, 210), f1: 110, dur: 0.09, gain: 0.3 * k })
    return noise(a, o, t, { dur: 0.07, type: 'bandpass', f: 900, q: 2.5, gain: 0.25 * k, at: 0.002 })
  },
  salju: (a, o, t, k) => {
    for (let i = 0; i < 5; i++) noise(a, o, t + i * rnd(0.012, 0.03), { dur: 0.035, type: 'bandpass', f: rnd(1300, 3200), q: 3, gain: 0.2 * k, at: 0.002 })
    return noise(a, o, t, { dur: 0.16, kind: 'pink', type: 'lowpass', f: 1200, gain: 0.16 * k, at: 0.01 })
  },
  es: (a, o, t, k) => {
    noise(a, o, t, { dur: 0.04, type: 'highpass', f: 4000, gain: 0.2 * k, at: 0.001 })
    tone(a, o, t, { f: rnd(2800, 3600), dur: 0.05, gain: 0.05 * k })
    return tone(a, o, t, { f: 140, f1: 70, dur: 0.06, gain: 0.16 * k })
  },
  air: (a, o, t, k) => splash(a, o, t, { size: 0.35 * k, gain: 0.35 * k }),
}
const stepRecipe = surf => ({ range: 30, ref: 4, gema: 0.6, fn: (a, out, t, o) => STEP[surf](a, out, t, o.kuat ?? 0.7) })

// suasana dari derau berulang
function loopNoise(a, out, { kind = 'pink', type = 'lowpass', f = 600, q = 0.7 }) {
  const c = a.ctx
  const src = c.createBufferSource()
  src.buffer = a.buffers[kind]
  src.loop = true
  const fl = c.createBiquadFilter()
  fl.type = type
  fl.frequency.value = f
  fl.Q.value = q
  src.connect(fl).connect(out)
  src.start(0, Math.random())
  return fl
}
// modulasi amplitudo lambat (ombak, napas, keramaian): keluaran = masukan × (1 − d + d·lfo)
function amLfo(a, input, out, rate, depth) {
  const c = a.ctx
  const g = c.createGain()
  g.gain.value = 1 - depth
  const lfo = c.createOscillator()
  lfo.frequency.value = rate
  const lg = c.createGain()
  lg.gain.value = depth
  lfo.connect(lg).connect(g.gain)
  lfo.start()
  input.connect(g).connect(out)
  return { lfo, g }
}
// penyangga berisi letupan acak (api unggun, tetes) — diputar berulang
function sparseBuffer(a, { seconds = 3, rate = 9, len = 0.004, hp = true }) {
  const c = a.ctx
  const n = Math.floor(c.sampleRate * seconds)
  const buf = c.createBuffer(1, n, c.sampleRate)
  const d = buf.getChannelData(0)
  const count = Math.floor(seconds * rate)
  for (let k = 0; k < count; k++) {
    const at = Math.floor(Math.random() * (n - 2000))
    const l = Math.floor(c.sampleRate * len * rnd(0.5, 2.5))
    const amp = rnd(0.2, 1) ** 2
    for (let i = 0; i < l; i++) d[at + i] += (Math.random() * 2 - 1) * amp * Math.exp(-i / (l * 0.3))
  }
  if (hp) for (let i = n - 1; i > 0; i--) d[i] -= d[i - 1] * 0.6
  return buf
}

export const RESEP = {
  // ---------------------------------------------------------------- pemain: gerak
  'langkah-pasir': stepRecipe('pasir'),
  'langkah-rumput': stepRecipe('rumput'),
  'langkah-batu': stepRecipe('batu'),
  'langkah-kayu': stepRecipe('kayu'),
  'langkah-salju': stepRecipe('salju'),
  'langkah-es': stepRecipe('es'),
  'langkah-air': stepRecipe('air'),
  lompat: { vol: 1.6,
    range: 30,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.25, type: 'bandpass', f: 500, f1: 1600, q: 1.2, gain: 0.22, at: 0.03 })
      return babble(a, o, t, { syll: 1, f0: 170, gain: 0.08, rate: 1.6 })
    },
  },
  mendarat: {
    range: 30,
    gema: 0.6,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      tone(a, o, t, { f: 120, f1: 45, dur: 0.14, gain: 0.35 * k })
      noise(a, o, t, { dur: 0.12, kind: 'pink', type: 'lowpass', f: 900, gain: 0.3 * k, at: 0.004 })
      return (STEP[op.permukaan] || STEP.rumput)(a, o, t + 0.01, 0.8 * k)
    },
  },
  renang: { range: 30, fn: (a, o, t, op) => splash(a, o, t, { size: 0.45, gain: 0.3 * (op.kuat ?? 1) }) },
  cebur: { range: 45, gema: 0.4, fn: (a, o, t, op) => splash(a, o, t, { size: 1.3 * (op.besar ?? 1), gain: 0.55 }) },
  panjat: {
    range: 30,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.45, type: 'bandpass', f: 1400, q: 1.5, gain: 0.16, at: 0.05 })
      tone(a, o, t + 0.05, { type: 'triangle', f: 190, f1: 120, dur: 0.08, gain: 0.18 })
      return babble(a, o, t + 0.12, { syll: 1, f0: 150, gain: 0.1, rate: 1.2 })
    },
  },
  // ---------------------------------------------------------------- pemain: serangan & jurus
  tebas: { vol: 2,
    range: 35,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      noise(a, o, t, { dur: 0.22, type: 'bandpass', f: 500, f1: 2600, f2: 700, q: 1.8, gain: 0.4 * k, at: 0.03 })
      return tone(a, o, t + 0.06, { f: rnd(2600, 3100), dur: 0.18, gain: 0.025 * k })
    },
  },
  tinju: { vol: 3, range: 30, fn: (a, o, t) => noise(a, o, t, { dur: 0.13, type: 'bandpass', f: 400, f1: 1400, q: 1.4, gain: 0.3, at: 0.02 }) },
  tendang: { vol: 2,
    range: 30,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.2, type: 'bandpass', f: 300, f1: 1000, f2: 400, q: 1.3, gain: 0.32, at: 0.03 })
      return babble(a, o, t, { syll: 1, f0: 180, gain: 0.07, rate: 1.8 })
    },
  },
  cincang: { vol: 2.5, range: 35, fn: (a, o, t) => noise(a, o, t, { dur: 0.12, type: 'bandpass', f: 900, f1: 3200, q: 2, gain: 0.3 * rnd(0.8, 1.1), at: 0.012 }) },
  'hentak-naik': {
    range: 40,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.45, type: 'bandpass', f: 300, f1: 1800, q: 1, gain: 0.3, at: 0.08 })
      return babble(a, o, t, { syll: 1, f0: 140, gain: 0.12, rate: 0.8 })
    },
  },
  'hentak-tancap': {
    vol: 0.8,
    range: 60,
    gema: 0.9,
    penting: true,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.05, type: 'highpass', f: 2500, gain: 0.5, at: 0.001 })
      bell(a, o, t, { f: 520, dur: 0.6, gain: 0.12 })
      tone(a, o, t, { f: 80, f1: 32, dur: 0.7, gain: 0.6 })
      noise(a, o, t, { dur: 1.0, kind: 'brown', type: 'lowpass', f: 400, f1: 120, gain: 0.7, at: 0.004 })
      for (let i = 0; i < 6; i++) noise(a, o, t + rnd(0.1, 0.5), { dur: 0.05, type: 'bandpass', f: rnd(1500, 4000), q: 2, gain: 0.1 })
      return 1.1
    },
  },
  putar: {
    range: 40,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) noise(a, o, t + i * 0.16, { dur: 0.2, type: 'bandpass', f: 500 + i * 300, f1: 2500, f2: 600, q: 1.6, gain: 0.32, at: 0.03 })
      return 0.7
    },
  },
  'penggal-bidik': {
    range: 40,
    penting: true,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 2400, f1: 3800, dur: 0.6, gain: 0.07, at: 0.05 })
      tone(a, o, t, { f: 3600, f1: 5200, dur: 0.5, gain: 0.04, at: 0.05 })
      return noise(a, o, t, { dur: 0.55, type: 'highpass', f: 5000, gain: 0.12, at: 0.15 })
    },
  },
  'penggal-sabet': { vol: 2,
    range: 50,
    penting: true,
    fn: (a, o, t, op) => {
      const n = Math.max(1, Math.min(5, op.n || 1))
      for (let i = 0; i < n; i++) noise(a, o, t + i * 0.08, { dur: 0.14, type: 'bandpass', f: 1200, f1: 5000, q: 2.5, gain: 0.35, at: 0.01 })
      noise(a, o, t, { dur: 0.6, type: 'bandpass', f: 300, f1: 1200, q: 0.8, gain: 0.25, at: 0.05 })
      return 0.8
    },
  },
  // ---------------------------------------------------------------- kena
  'kena-daging': {
    range: 40,
    gema: 0.5,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      tone(a, o, t, { f: rnd(130, 170), f1: 55, dur: 0.12, gain: 0.4 * k })
      return noise(a, o, t, { dur: 0.09, kind: 'pink', type: 'lowpass', f: 1100, gain: 0.35 * k, at: 0.002 })
    },
  },
  'kena-kayu': {
    range: 40,
    gema: 0.5,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'triangle', f: rnd(260, 320), f1: 160, dur: 0.12, gain: 0.35 })
      return noise(a, o, t, { dur: 0.1, type: 'bandpass', f: 1300, q: 2, gain: 0.35, at: 0.002 })
    },
  },
  'kena-batu': {
    range: 40,
    gema: 0.6,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.06, type: 'highpass', f: 2500, gain: 0.3, at: 0.001 })
      return bell(a, o, t, { f: rnd(1900, 2400), ratios: [1, 1.48, 2.3], dur: 0.25, gain: 0.08 })
    },
  },
  'kena-logam': {
    range: 45,
    gema: 0.6,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.05, type: 'highpass', f: 3000, gain: 0.3, at: 0.001 })
      tone(a, o, t, { f: 150, f1: 70, dur: 0.1, gain: 0.25 })
      return bell(a, o, t, { f: rnd(480, 620), ratios: [1, 2.58, 4.26, 6.1], dur: 0.55, gain: 0.12 })
    },
  },
  // pemain terluka / roboh / bangun lagi
  sakit: {
    range: 30,
    penting: true,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 120, f1: 60, dur: 0.12, gain: 0.3 })
      return babble(a, o, t + 0.02, { syll: 1, f0: 190, gain: 0.16, rate: 1.1 })
    },
  },
  roboh: {
    range: 40,
    penting: true,
    fn: (a, o, t) => {
      babble(a, o, t, { syll: 2, f0: 170, gain: 0.15, rate: 0.6 })
      tone(a, o, t + 0.6, { f: 100, f1: 40, dur: 0.25, gain: 0.45 })
      noise(a, o, t + 0.6, { dur: 0.3, kind: 'pink', type: 'lowpass', f: 700, gain: 0.35, at: 0.005 })
      return 1.0
    },
  },
  pulih: {
    ui: true,
    fn: (a, o, t) => {
      ;[523, 659, 784, 1047].forEach((f, i) => tone(a, o, t + i * 0.09, { type: 'triangle', f, dur: 0.6, gain: 0.12 }))
      return 1
    },
  },
  tirai: { vol: 2, ui: true, fn: (a, o, t) => noise(a, o, t, { dur: 0.5, type: 'bandpass', f: 1800, f1: 300, q: 0.7, gain: 0.12, at: 0.15 }) },
  // ---------------------------------------------------------------- barang, koin, peti, kerajinan
  koin: {
    ui: true,
    fn: (a, o, t, op) => {
      const n = Math.max(1, Math.min(5, op.n || 2))
      for (let i = 0; i < n; i++) bell(a, o, t + i * 0.07 + rnd(0, 0.02), { f: rnd(1900, 2500), ratios: [1, 1.5, 2.71], dur: 0.35, gain: 0.07 })
      return 0.4 + n * 0.07
    },
  },
  kayu: {
    ui: true,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'triangle', f: 330, f1: 220, dur: 0.08, gain: 0.22 })
      return tone(a, o, t + 0.09, { type: 'triangle', f: 280, f1: 190, dur: 0.08, gain: 0.18 })
    },
  },
  beli: {
    ui: true,
    fn: (a, o, t) => {
      RESEP.koin.fn(a, o, t, { n: 3 })
      return bell(a, o, t + 0.22, { f: 1760, ratios: [1, 2.01, 3], dur: 0.7, gain: 0.08 })
    },
  },
  buat: {
    ui: true,
    fn: (a, o, t) => {
      for (let i = 0; i < 4; i++) {
        tone(a, o, t + i * 0.18, { type: 'triangle', f: 240, f1: 140, dur: 0.07, gain: 0.25 })
        noise(a, o, t + i * 0.18, { dur: 0.06, type: 'bandpass', f: 1500, q: 2, gain: 0.2, at: 0.002 })
      }
      ;[659, 880].forEach((f, i) => tone(a, o, t + 0.8 + i * 0.1, { type: 'triangle', f, dur: 0.4, gain: 0.1 }))
      return 1.3
    },
  },
  makan: { vol: 3,
    ui: true,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) noise(a, o, t + i * 0.22 + j * 0.02, { dur: 0.03, type: 'bandpass', f: rnd(1500, 3000), q: 2, gain: 0.12 })
      return 0.8
    },
  },
  minum: {
    ui: true,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) tone(a, o, t + i * 0.2, { f: 260, f1: 520, dur: 0.12, gain: 0.16, at: 0.02 })
      return bell(a, o, t + 0.65, { f: 1320, ratios: [1, 1.5, 2], dur: 0.6, gain: 0.06 })
    },
  },
  pakai: {
    ui: true,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.25, type: 'bandpass', f: 2200, q: 0.8, gain: 0.12, at: 0.04 })
      return bell(a, o, t + 0.15, { f: 900, ratios: [1, 2.4, 3.9], dur: 0.35, gain: 0.08 })
    },
  },
  'peti-buka': {
    range: 30,
    gema: 0.7,
    penting: true,
    fn: (a, o, t) => {
      const c = a.ctx
      const os = c.createOscillator()
      os.type = 'sawtooth'
      os.frequency.setValueAtTime(110, t)
      os.frequency.linearRampToValueAtTime(190, t + 0.55)
      const bp = c.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 900
      bp.Q.value = 4
      const g = c.createGain()
      env(g.gain, t, 0.05, 0.6, 0.12, 0.3)
      os.connect(bp).connect(g).connect(o)
      os.start(t)
      os.stop(t + 0.7)
      RESEP.koin.fn(a, o, t + 0.55, { n: 5 })
      ;[784, 988, 1175, 1568].forEach((f, i) => tone(a, o, t + 0.6 + i * 0.08, { type: 'triangle', f, dur: 0.5, gain: 0.07 }))
      return 1.3
    },
  },
  ditolak: {
    ui: true,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'square', f: 220, dur: 0.1, gain: 0.06, lp: 1200 })
      return tone(a, o, t + 0.13, { type: 'square', f: 175, dur: 0.14, gain: 0.06, lp: 1200 })
    },
  },
  'peti-segel': {
    range: 25,
    gema: 0.7,
    fn: (a, o, t) => {
      bell(a, o, t, { f: 2600, ratios: [1, 1.6, 2.9], dur: 0.4, gain: 0.06 })
      return bell(a, o, t + 0.14, { f: 2100, ratios: [1, 1.6, 2.9], dur: 0.5, gain: 0.06 })
    },
  },
  'lempeng-geser': {
    range: 35,
    gema: 0.9,
    penting: true,
    fn: (a, o, t) => {
      for (let i = 0; i < 7; i++) noise(a, o, t + i * 0.2, { dur: 0.3, kind: 'brown', type: 'bandpass', f: rnd(250, 420), q: 1.5, gain: 0.5, at: 0.05 })
      noise(a, o, t, { dur: 1.6, type: 'bandpass', f: 1800, q: 1, gain: 0.05, at: 0.2 })
      return tone(a, o, t + 1.4, { f: 90, f1: 45, dur: 0.3, gain: 0.35 })
    },
  },
  // ---------------------------------------------------------------- perahu & mancing
  'perahu-naik': {
    range: 30,
    fn: (a, o, t) => {
      STEP.kayu(a, o, t, 1)
      STEP.kayu(a, o, t + 0.16, 0.7)
      return splash(a, o, t + 0.1, { size: 0.4, gain: 0.25 })
    },
  },
  'perahu-turun': { range: 30, fn: (a, o, t) => splash(a, o, t, { size: 0.6, gain: 0.32 }) },
  dayung: { vol: 2,
    range: 35,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      noise(a, o, t, { dur: 0.35, type: 'bandpass', f: 700, f1: 1500, q: 1, gain: 0.18 * k, at: 0.08 })
      return tone(a, o, t, { type: 'triangle', f: 160, f1: 120, dur: 0.06, gain: 0.06 * k })
    },
  },
  'perahu-jadi': {
    ui: true,
    fn: (a, o, t) => {
      RESEP.buat.fn(a, o, t)
      return splash(a, o, t + 1.1, { size: 0.8, gain: 0.35 })
    },
  },
  'kail-lempar': { vol: 2,
    range: 25,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.3, type: 'bandpass', f: 800, f1: 3500, q: 2, gain: 0.25, at: 0.03 })
      for (let i = 0; i < 10; i++) noise(a, o, t + 0.1 + i * 0.045, { dur: 0.012, type: 'highpass', f: 4000, gain: 0.08 })
      return 0.7
    },
  },
  'kail-plung': {
    range: 30,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 700, f1: 180, dur: 0.12, gain: 0.25 })
      return splash(a, o, t, { size: 0.2, gain: 0.15 })
    },
  },
  'ikan-sambar': {
    range: 30,
    penting: true,
    fn: (a, o, t) => {
      splash(a, o, t, { size: 0.5, gain: 0.35 })
      return bell(a, o, t, { f: 1568, ratios: [1, 2, 3], dur: 0.5, gain: 0.1 })
    },
  },
  'kail-tarik': {
    range: 25,
    fn: (a, o, t) => {
      for (let i = 0; i < 16; i++) noise(a, o, t + i * 0.035, { dur: 0.012, type: 'highpass', f: 3500, gain: 0.1 })
      return splash(a, o, t + 0.3, { size: 0.6, gain: 0.3 })
    },
  },
  'ikan-dapat': {
    ui: true,
    fn: (a, o, t) => {
      for (let i = 0; i < 4; i++) noise(a, o, t + i * 0.09, { dur: 0.05, kind: 'pink', type: 'lowpass', f: 1500, gain: 0.18 })
      ;[523, 659, 784].forEach((f, i) => tone(a, o, t + 0.3 + i * 0.1, { type: 'triangle', f, dur: 0.45, gain: 0.12 }))
      return 1
    },
  },
  'ikan-lepas': {
    ui: true,
    fn: (a, o, t) => {
      splash(a, o, t, { size: 0.4, gain: 0.25 })
      tone(a, o, t + 0.15, { type: 'triangle', f: 440, dur: 0.25, gain: 0.1 })
      return tone(a, o, t + 0.35, { type: 'triangle', f: 330, dur: 0.4, gain: 0.1 })
    },
  },
  // ---------------------------------------------------------------- antarmuka
  klik: { ui: true, fn: (a, o, t) => tone(a, o, t, { type: 'triangle', f: 1500, f1: 1100, dur: 0.04, gain: 0.12 }) },
  buka: {
    ui: true,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'triangle', f: 660, dur: 0.08, gain: 0.1 })
      return tone(a, o, t + 0.06, { type: 'triangle', f: 990, dur: 0.12, gain: 0.1 })
    },
  },
  tutup: {
    ui: true,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'triangle', f: 880, dur: 0.07, gain: 0.09 })
      return tone(a, o, t + 0.06, { type: 'triangle', f: 590, dur: 0.1, gain: 0.09 })
    },
  },
  peta: { vol: 2.5,
    ui: true,
    fn: (a, o, t) => {
      for (let i = 0; i < 8; i++) noise(a, o, t + i * rnd(0.03, 0.06), { dur: 0.05, type: 'bandpass', f: rnd(2000, 5000), q: 1.2, gain: 0.08 })
      return noise(a, o, t, { dur: 0.45, type: 'highpass', f: 2500, gain: 0.05, at: 0.08 })
    },
  },
  tas: { vol: 2.5,
    ui: true,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.3, type: 'bandpass', f: 1400, q: 0.7, gain: 0.1, at: 0.05 })
      for (let i = 0; i < 12; i++) noise(a, o, t + 0.05 + i * 0.022, { dur: 0.012, type: 'bandpass', f: 3500, q: 3, gain: 0.07 })
      return 0.45
    },
  },
  pesan: { vol: 1.4, ui: true, fn: (a, o, t) => tone(a, o, t, { type: 'triangle', f: 880, f1: 990, dur: 0.18, gain: 0.07 }) },
  // spanduk nama wilayah: bunyi khas tiap negeri
  'wilayah-tropis': {
    ui: true,
    fn: (a, o, t) => {
      ;[392, 523, 659, 784].forEach((f, i) => {
        tone(a, o, t + i * 0.12, { f, dur: 0.5, gain: 0.12 })
        tone(a, o, t + i * 0.12, { f: f * 4, dur: 0.12, gain: 0.03 })
      })
      return 1
    },
  },
  'wilayah-kencana': {
    ui: true,
    fn: (a, o, t) => {
      // bonang bernada pelog (perkiraan): logam bergaung
      ;[293, 311, 392, 440, 587].slice(0, 4).forEach((f, i) => bell(a, o, t + i * 0.22, { f, ratios: [1, 2.02, 2.76, 4.1], dur: 1.1, gain: 0.08 }))
      return 1.8
    },
  },
  'wilayah-aeloria': {
    ui: true,
    fn: (a, o, t) => {
      ;[523, 659, 784, 988, 1175].forEach((f, i) => tone(a, o, t + i * 0.09, { type: 'triangle', f, dur: 0.9, gain: 0.08 }))
      return 1.4
    },
  },
  'wilayah-frostfall': {
    ui: true,
    fn: (a, o, t) => {
      ;[1047, 1319, 1568, 2093].forEach((f, i) => bell(a, o, t + i * 0.16, { f, ratios: [1, 2.4, 4.1], dur: 1.2, gain: 0.06 }))
      return 1.8
    },
  },
  'wilayah-gua': {
    ui: true,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 98, dur: 1.6, gain: 0.18, at: 0.2 })
      tone(a, o, t, { f: 147, dur: 1.4, gain: 0.08, at: 0.3 })
      return tone(a, o, t + 0.5, { f: 1600, f1: 2400, dur: 0.08, gain: 0.05 })
    },
  },
  // ---------------------------------------------------------------- suara orang (gelembung ucapan)
  bicara: {
    range: 40,
    ref: 6,
    gema: 0.4,
    fn: (a, o, t, op) => babble(a, o, t, { syll: op.suku ?? 4, f0: op.nada ?? 170, gain: 0.2, rate: op.laju ?? 1 }),
  },
  // ---------------------------------------------------------------- orc, prajurit, elf, duel
  'orc-geram': { range: 45, gema: 0.5, fn: (a, o, t) => growl(a, o, t, { f: rnd(70, 95), f1: rnd(60, 80), dur: rnd(0.5, 0.9), gain: 0.28, formants: [450, 1000] }) },
  'orc-serang': {
    range: 40,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.3, type: 'bandpass', f: 250, f1: 900, f2: 300, q: 1.2, gain: 0.35, at: 0.06 })
      return growl(a, o, t, { f: 90, f1: 70, dur: 0.35, gain: 0.18, formants: [500, 1100] })
    },
  },
  'orc-mati': {
    range: 50,
    gema: 0.6,
    fn: (a, o, t) => {
      growl(a, o, t, { f: 95, f1: 45, dur: 0.9, gain: 0.3, formants: [400, 900] })
      tone(a, o, t + 0.8, { f: 90, f1: 40, dur: 0.25, gain: 0.4 })
      return noise(a, o, t + 0.8, { dur: 0.3, kind: 'pink', type: 'lowpass', f: 600, gain: 0.35 })
    },
  },
  'prajurit-serang': { vol: 2,
    range: 40,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.18, type: 'bandpass', f: 700, f1: 2400, q: 1.6, gain: 0.3, at: 0.02 })
      return babble(a, o, t, { syll: 1, f0: rnd(120, 150), gain: 0.1, rate: 1.6 })
    },
  },
  'prajurit-roboh': {
    range: 45,
    fn: (a, o, t) => {
      babble(a, o, t, { syll: 1, f0: 130, gain: 0.14, rate: 0.7 })
      tone(a, o, t + 0.3, { f: 100, f1: 45, dur: 0.2, gain: 0.35 })
      for (let i = 0; i < 4; i++) bell(a, o, t + 0.3 + i * 0.05, { f: rnd(1200, 2000), ratios: [1, 1.7], dur: 0.15, gain: 0.04 })
      return 0.8
    },
  },
  'tombak-lempar': { vol: 2, range: 60, fn: (a, o, t) => noise(a, o, t, { dur: 0.55, type: 'bandpass', f: 600, f1: 2200, f2: 900, q: 2, gain: 0.3, at: 0.05 }) },
  'tombak-tancap': {
    range: 50,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'triangle', f: 220, f1: 130, dur: 0.12, gain: 0.3 })
      return noise(a, o, t, { dur: 0.15, type: 'bandpass', f: 1000, q: 1.5, gain: 0.25, at: 0.002 })
    },
  },
  'duel-mulai': {
    range: 70,
    penting: true,
    fn: (a, o, t) => {
      // tiupan terompet tanduk
      const c = a.ctx
      const os = c.createOscillator()
      os.type = 'sawtooth'
      os.frequency.setValueAtTime(196, t)
      os.frequency.linearRampToValueAtTime(220, t + 0.15)
      const lp = c.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.setValueAtTime(500, t)
      lp.frequency.linearRampToValueAtTime(1600, t + 0.4)
      lp.frequency.linearRampToValueAtTime(700, t + 1.3)
      const g = c.createGain()
      env(g.gain, t, 0.12, 1.4, 0.14, 0.9)
      os.connect(lp).connect(g).connect(o)
      os.start(t)
      os.stop(t + 1.5)
      return 1.5
    },
  },
  menang: { vol: 1.8,
    ui: true,
    fn: (a, o, t) => {
      ;[523, 659, 784, 1047].forEach((f, i) => tone(a, o, t + i * 0.13, { type: 'square', f, dur: i === 3 ? 0.7 : 0.18, gain: 0.05, lp: 2500 }))
      return 1.2
    },
  },
  kalah: {
    ui: true,
    fn: (a, o, t) => {
      ;[392, 349, 311, 262].forEach((f, i) => tone(a, o, t + i * 0.2, { type: 'triangle', f, dur: 0.35, gain: 0.1 }))
      return 1.2
    },
  },
  // ---------------------------------------------------------------- jurus Ranah Tebas (v0.26.0)
  // (jalur antarmuka: tidak ikut diredam saat waktu dunia berhenti)
  'ranah-buka': {
    ui: true,
    vol: 1.2,
    fn: (a, o, t) => {
      // dentum dalam + desau terbalik yang membesar (waktu berhenti)
      tone(a, o, t, { f: 70, f1: 32, dur: 1.1, gain: 0.5, at: 0.01 })
      noise(a, o, t, { dur: 0.55, kind: 'pink', type: 'bandpass', f: 250, f1: 3200, q: 1.2, gain: 0.35, at: 0.45 })
      noise(a, o, t, { dur: 1.2, kind: 'brown', type: 'lowpass', f: 300, gain: 0.4, at: 0.02 })
      return bell(a, o, t + 0.35, { f: 1046, ratios: [1, 2.01, 3.03], dur: 1.2, gain: 0.06 })
    },
  },
  'ranah-isi': {
    // dengung yang naik nadanya + kilau tinggi selama ranah terisi
    ui: true,
    fn: (a, o, t, op) => {
      const dur = op.lama ?? 2.1
      const c = a.ctx
      const os = c.createOscillator()
      os.type = 'sawtooth'
      os.frequency.setValueAtTime(110, t)
      os.frequency.exponentialRampToValueAtTime(440, t + dur)
      const lp = c.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.setValueAtTime(400, t)
      lp.frequency.exponentialRampToValueAtTime(2600, t + dur)
      const trem = c.createOscillator()
      trem.frequency.setValueAtTime(5, t)
      trem.frequency.linearRampToValueAtTime(18, t + dur)
      const tg = c.createGain()
      tg.gain.value = 0.4
      const g = c.createGain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.2)
      g.gain.linearRampToValueAtTime(0.16, t + dur)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08)
      trem.connect(tg).connect(g.gain)
      os.connect(lp).connect(g).connect(o)
      os.start(t)
      os.stop(t + dur + 0.1)
      trem.start(t)
      trem.stop(t + dur + 0.1)
      a.until = Math.max(a.until || 0, t + dur + 0.1)
      noise(a, o, t + 0.2, { dur: dur - 0.1, type: 'bandpass', f: 5500, f1: 7500, q: 3, gain: 0.08, at: dur * 0.6 })
      return dur + 0.1
    },
  },
  'ranah-kunci': {
    // bunyi kunci sasaran: dua ketukan elektronik, makin tinggi tiap sasaran
    ui: true,
    fn: (a, o, t, op) => {
      const f = 1500 * Math.pow(1.06, op.i ?? 0)
      tone(a, o, t, { type: 'square', f, dur: 0.05, gain: 0.05, lp: 5000 })
      return tone(a, o, t + 0.06, { type: 'square', f: f * 1.5, dur: 0.08, gain: 0.05, lp: 6000 })
    },
  },
  'ranah-penuh': {
    // 100 %: denting pedang yang tajam + dentum
    ui: true,
    vol: 1.3,
    fn: (a, o, t) => {
      bell(a, o, t, { f: 2637, ratios: [1, 1.5, 2.76, 4.1], dur: 1.1, gain: 0.08 })
      noise(a, o, t, { dur: 0.5, type: 'highpass', f: 4500, gain: 0.12, at: 0.005 })
      tone(a, o, t, { f: 90, f1: 40, dur: 0.6, gain: 0.45 })
      return noise(a, o, t + 0.05, { dur: 0.6, kind: 'brown', type: 'lowpass', f: 250, gain: 0.35, at: 0.01 })
    },
  },
  'ranah-kilat': {
    // melesat: desau panjang yang menyapu tinggi
    ui: true,
    vol: 1.5,
    fn: (a, o, t) => noise(a, o, t, { dur: 0.7, type: 'bandpass', f: 600, f1: 5000, f2: 1500, q: 1.4, gain: 0.3, at: 0.04 }),
  },
  'ranah-tebas': {
    // tiap sasaran tertebas: sabetan tajam + denting + hantaman
    ui: true,
    vol: 1.4,
    fn: (a, o, t, op) => {
      const k = 1 + (op.n ?? 0) * 0.03
      noise(a, o, t, { dur: 0.14, type: 'bandpass', f: 1500 * k, f1: 7000, q: 2.5, gain: 0.35, at: 0.006 })
      bell(a, o, t + 0.01, { f: 3100 * k, ratios: [1, 1.42, 2.3], dur: 0.35, gain: 0.04 })
      tone(a, o, t + 0.02, { f: 160, f1: 60, dur: 0.12, gain: 0.3 })
      return noise(a, o, t + 0.02, { dur: 0.12, kind: 'pink', type: 'lowpass', f: 1300, gain: 0.25, at: 0.003 })
    },
  },
  'ranah-ledak': {
    // semua yang terkunci roboh bersamaan: dentum besar + rentetan sabetan + cipratan
    ui: true,
    vol: 1.2,
    fn: (a, o, t, op) => {
      const n = Math.max(1, Math.min(8, op.n || 4))
      tone(a, o, t, { f: 65, f1: 28, dur: 1.2, gain: 0.6 })
      noise(a, o, t, { dur: 1.3, kind: 'brown', type: 'lowpass', f: 380, f1: 100, gain: 0.7, at: 0.004 })
      noise(a, o, t, { dur: 0.08, type: 'highpass', f: 2500, gain: 0.5, at: 0.001 })
      for (let i = 0; i < n + 3; i++) noise(a, o, t + 0.03 + i * rnd(0.025, 0.05), { dur: 0.09, type: 'bandpass', f: rnd(2500, 6500), q: 3, gain: 0.18 })
      for (let i = 0; i < 10; i++) noise(a, o, t + rnd(0.05, 0.4), { dur: rnd(0.06, 0.14), kind: 'pink', type: 'bandpass', f: rnd(600, 1600), q: 1.2, gain: 0.12 })
      return 1.4
    },
  },
  // ---------------------------------------------------------------- Naga Es
  'naga-geram': { range: 80, gema: 0.9, penting: true, fn: (a, o, t) => growl(a, o, t, { f: 50, f1: 72, dur: 1.6, gain: 0.4, formants: [300, 700], q: 2.5, wobble: 9, wobbleDepth: 6, at: 0.4, noiseMix: 0.35, lp: 1400 }) },
  'naga-aum': { vol: 0.6,
    range: 120,
    ref: 12,
    gema: 1,
    penting: true,
    fn: (a, o, t, op) => {
      const k = op.kecil ? 0.6 : 1
      const dur = op.kecil ? 1.1 : 2.1
      growl(a, o, t, { f: 85, f1: 120, dur, gain: 0.5 * k, formants: [520, 1150, 2300], q: 2, wobble: 14, wobbleDepth: 10, at: 0.12, drive: 8, noiseMix: 0.5, lp: 3200 })
      growl(a, o, t + 0.05, { f: 43, f1: 58, dur, gain: 0.35 * k, formants: [250, 600], q: 1.5, wobble: 7, wobbleDepth: 4, at: 0.15, noiseMix: 0.2, lp: 900 })
      noise(a, o, t, { dur: dur * 1.1, kind: 'brown', type: 'lowpass', f: 250, gain: 0.6 * k, at: 0.2, hold: dur * 0.3 })
      noise(a, o, t + 0.1, { dur: dur * 0.9, type: 'bandpass', f: 3500, f1: 2000, q: 0.8, gain: 0.12 * k, at: 0.2 })
      return dur + 0.3
    },
  },
  'naga-dengkur': {
    // napas tidur: gemuruh rendah yang naik-turun pelan (suasana berposisi, lihat suasana.js)
    gema: 0.8,
    vol: 0.9,
    loop: (a, out) => {
      const g = a.ctx.createGain()
      g.gain.value = 1
      const fl = loopNoise(a, g, { kind: 'brown', type: 'lowpass', f: 260, q: 1.2 })
      fl.frequency.value = 260
      amLfo(a, g, out, 0.22, 0.85)
      return {}
    },
  },
  'naga-langkah': {
    range: 70,
    ref: 8,
    gema: 0.8,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      tone(a, o, t, { f: 60, f1: 30, dur: 0.4, gain: 0.5 * k })
      noise(a, o, t, { dur: 0.45, kind: 'brown', type: 'lowpass', f: 350, gain: 0.55 * k, at: 0.01 })
      return STEP.salju(a, o, t, 0.7 * k)
    },
  },
  'naga-gigit': {
    range: 60,
    gema: 0.7,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.3, type: 'bandpass', f: 400, f1: 1500, q: 1, gain: 0.3, at: 0.05 })
      tone(a, o, t + 0.22, { type: 'triangle', f: 420, f1: 140, dur: 0.1, gain: 0.45 })
      noise(a, o, t + 0.22, { dur: 0.06, type: 'highpass', f: 2000, gain: 0.4, at: 0.001 })
      return growl(a, o, t, { f: 70, f1: 90, dur: 0.4, gain: 0.25, formants: [400, 900], at: 0.03 })
    },
  },
  'naga-ekor': { vol: 2.5,
    range: 60,
    gema: 0.6,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.7, type: 'bandpass', f: 180, f1: 700, f2: 220, q: 1.1, gain: 0.55, at: 0.15 })
      return noise(a, o, t + 0.1, { dur: 0.5, type: 'bandpass', f: 900, f1: 2200, q: 1.5, gain: 0.12, at: 0.1 })
    },
  },
  'naga-isi': { vol: 1.6,
    // menghimpun napas es: tarikan napas yang meninggi + kilau es
    range: 80,
    gema: 0.8,
    penting: true,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 1.0, type: 'bandpass', f: 300, f1: 2400, q: 1.5, gain: 0.3, at: 0.7 })
      for (let i = 0; i < 6; i++) tone(a, o, t + 0.2 + i * 0.12, { f: rnd(2500, 4200), dur: 0.35, gain: 0.025 })
      return 1.05
    },
  },
  'naga-hembus': {
    // semburan napas es (±2 detik): desis dingin + gemuruh + kerik kristal
    range: 90,
    ref: 9,
    gema: 0.9,
    penting: true,
    fn: (a, o, t, op) => {
      const dur = op.lama ?? 2.1
      noise(a, o, t, { dur, type: 'highpass', f: 1800, gain: 0.25, at: 0.08, hold: dur * 0.7 })
      noise(a, o, t, { dur, kind: 'pink', type: 'bandpass', f: 700, q: 0.7, gain: 0.4, at: 0.06, hold: dur * 0.7 })
      noise(a, o, t, { dur, kind: 'brown', type: 'lowpass', f: 300, gain: 0.35, at: 0.1, hold: dur * 0.6 })
      for (let i = 0; i < 18; i++) noise(a, o, t + rnd(0.1, dur - 0.1), { dur: 0.03, type: 'bandpass', f: rnd(4000, 7000), q: 4, gain: 0.08 })
      return dur + 0.1
    },
  },
  'naga-tanda': { vol: 1.8,
    range: 70,
    gema: 0.8,
    fn: (a, o, t) => {
      for (let i = 0; i < 5; i++) tone(a, o, t + i * 0.14, { f: 1800 + i * 300, dur: 0.6, gain: 0.04 })
      return noise(a, o, t, { dur: 1.2, type: 'highpass', f: 6000, gain: 0.06, at: 0.6 })
    },
  },
  'es-pecah': {
    // kristal es menyembur / pecah
    range: 70,
    gema: 0.8,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      noise(a, o, t, { dur: 0.06, type: 'highpass', f: 2500, gain: 0.45 * k, at: 0.001 })
      tone(a, o, t, { f: 90, f1: 40, dur: 0.35, gain: 0.35 * k })
      noise(a, o, t, { dur: 0.5, kind: 'brown', type: 'lowpass', f: 500, gain: 0.35 * k, at: 0.004 })
      for (let i = 0; i < 12; i++) bell(a, o, t + rnd(0.01, 0.35), { f: rnd(2500, 6000), ratios: [1, 1.53], dur: rnd(0.08, 0.25), gain: 0.03 * k })
      return 0.7
    },
  },
  'naga-kepak': { vol: 1.5,
    range: 80,
    ref: 9,
    gema: 0.6,
    fn: (a, o, t, op) => noise(a, o, t, { dur: 0.42, kind: 'pink', type: 'lowpass', f: 380, f1: 180, gain: 0.55 * (op.kuat ?? 1), at: 0.12 }),
  },
  'naga-hentak': {
    range: 100,
    ref: 10,
    gema: 1,
    penting: true,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 55, f1: 25, dur: 1.1, gain: 0.7 })
      noise(a, o, t, { dur: 1.3, kind: 'brown', type: 'lowpass', f: 300, f1: 90, gain: 0.8, at: 0.005 })
      RESEP['es-pecah'].fn(a, o, t + 0.08, { kuat: 1.1 })
      return 1.4
    },
  },
  'naga-kena': {
    range: 70,
    gema: 0.7,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.08, type: 'highpass', f: 3000, gain: 0.25, at: 0.001 })
      return growl(a, o, t + 0.02, { f: 95, f1: 80, dur: 0.35, gain: 0.25, formants: [450, 1000], at: 0.02 })
    },
  },
  'naga-kalah': {
    range: 120,
    ref: 12,
    gema: 1,
    penting: true,
    fn: (a, o, t) => {
      growl(a, o, t, { f: 110, f1: 40, dur: 2.6, gain: 0.45, formants: [500, 1100], q: 2, wobble: 6, wobbleDepth: 8, at: 0.1, noiseMix: 0.4 })
      tone(a, o, t + 2.2, { f: 50, f1: 25, dur: 0.9, gain: 0.6 })
      noise(a, o, t + 2.2, { dur: 1.0, kind: 'brown', type: 'lowpass', f: 300, gain: 0.6 })
      return 3.2
    },
  },
  'segel-pecah': {
    range: 60,
    gema: 0.9,
    penting: true,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.15, type: 'highpass', f: 2000, gain: 0.5, at: 0.001 })
      for (let i = 0; i < 26; i++) bell(a, o, t + rnd(0, 0.6), { f: rnd(2000, 7000), ratios: [1, 1.41], dur: rnd(0.1, 0.4), gain: 0.03 })
      ;[1047, 1319, 1568].forEach((f, i) => tone(a, o, t + 0.5 + i * 0.12, { type: 'triangle', f, dur: 0.8, gain: 0.06 }))
      return 1.5
    },
  },
  // ---------------------------------------------------------------- suasana: kejadian sesaat
  burung: {
    range: 70,
    ref: 10,
    vol: 0.6,
    fn: (a, o, t) => {
      const kind = Math.floor(Math.random() * 3)
      const base = rnd(2200, 3600)
      const n = 2 + Math.floor(Math.random() * 4)
      for (let i = 0; i < n; i++) {
        const at = t + i * (kind === 0 ? 0.11 : 0.18)
        if (kind === 2) tone(a, o, at, { f: base * 1.3, f1: base * 0.8, dur: 0.14, gain: 0.08, curve: 'lin' })
        else tone(a, o, at, { f: base, f1: base * (kind === 0 ? 1.4 : 0.7), dur: kind === 0 ? 0.06 : 0.12, gain: 0.08 })
      }
      return n * 0.18 + 0.2
    },
  },
  'burung-laut': {
    // camar di pantai
    range: 90,
    ref: 14,
    vol: 0.5,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) tone(a, o, t + i * 0.25, { type: 'sawtooth', f: 1300, f1: 900, dur: 0.2, gain: 0.05, lp: 2600 })
      return 0.9
    },
  },
  tetes: {
    range: 40,
    ref: 6,
    gema: 1,
    fn: (a, o, t) => {
      const f = rnd(900, 1800)
      return tone(a, o, t, { f, f1: f * 2.2, dur: 0.07, gain: 0.08, at: 0.002 })
    },
  },
  'burung-hantu': {
    range: 120,
    ref: 20,
    vol: 0.7,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 420, f1: 380, dur: 0.35, gain: 0.08, at: 0.06, curve: 'lin' })
      tone(a, o, t + 0.55, { f: 430, f1: 370, dur: 0.22, gain: 0.06, at: 0.04, curve: 'lin' })
      return tone(a, o, t + 0.85, { f: 410, f1: 350, dur: 0.5, gain: 0.07, at: 0.06, curve: 'lin' })
    },
  },
  tempa: {
    // palu pandai besi di landasan
    range: 70,
    ref: 8,
    gema: 0.5,
    fn: (a, o, t) => bell(a, o, t, { f: rnd(820, 980), ratios: [1, 2.7, 5.2, 7.9], dur: 0.6, gain: 0.08 }),
  },
  kuda: {
    range: 90,
    ref: 12,
    vol: 1.08,
    fn: (a, o, t) => {
      // ringkik: nada bergetar yang menurun
      const c = a.ctx
      const os = c.createOscillator()
      os.type = 'sawtooth'
      os.frequency.setValueAtTime(900, t)
      os.frequency.linearRampToValueAtTime(600, t + 0.8)
      const lfo = c.createOscillator()
      lfo.frequency.value = 22
      const lg = c.createGain()
      lg.gain.value = 70
      lfo.connect(lg).connect(os.frequency)
      const bp = c.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 1400
      bp.Q.value = 2
      const g = c.createGain()
      env(g.gain, t, 0.05, 0.9, 0.06, 0.4)
      os.connect(bp).connect(g).connect(o)
      os.start(t)
      os.stop(t + 1)
      lfo.start(t)
      lfo.stop(t + 1)
      return 1
    },
  },
  zirah: {
    // denting zirah / senjata bala tentara
    range: 80,
    ref: 10,
    vol: 0.96,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) bell(a, o, t + rnd(0, 0.3), { f: rnd(1300, 2400), ratios: [1, 1.8], dur: 0.15, gain: 0.03 })
      return 0.5
    },
  },
  // ---------------------------------------------------------------- kegiatan orang (suasana.js)
  kapak: {
    range: 45,
    gema: 0.5,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.12, type: 'bandpass', f: 500, f1: 1400, q: 1.2, gain: 0.15, at: 0.03 })
      return RESEP['kena-kayu'].fn(a, o, t + 0.1)
    },
  },
  panah: {
    range: 50,
    fn: (a, o, t) => {
      tone(a, o, t, { type: 'triangle', f: 180, f1: 140, dur: 0.18, gain: 0.18 })
      return noise(a, o, t + 0.02, { dur: 0.35, type: 'bandpass', f: 2500, f1: 1200, q: 2, gain: 0.12, at: 0.01 })
    },
  },
  sekop: { vol: 2,
    range: 35,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.3, type: 'bandpass', f: 1800, q: 1, gain: 0.12, at: 0.04 })
      return STEP.salju(a, o, t + 0.35, 0.6)
    },
  },
  timba: {
    range: 35,
    fn: (a, o, t) => {
      for (let i = 0; i < 6; i++) noise(a, o, t + i * 0.12, { dur: 0.03, type: 'highpass', f: 3000, gain: 0.05 })
      return splash(a, o, t + 0.9, { size: 0.5, gain: 0.25 })
    },
  },
  masak: { range: 30, gema: 0.6, fn: (a, o, t) => noise(a, o, t, { dur: 1.6, type: 'highpass', f: 3500, gain: 0.1, at: 0.2, hold: 0.8 }) },
  piring: {
    range: 30,
    gema: 0.6,
    fn: (a, o, t) => {
      bell(a, o, t, { f: rnd(1800, 2600), ratios: [1, 1.6, 2.4], dur: 0.25, gain: 0.04 })
      return tone(a, o, t + 0.1, { type: 'triangle', f: 400, f1: 250, dur: 0.06, gain: 0.08 })
    },
  },
  tepuk: {
    range: 40,
    vol: 2.4,
    fn: (a, o, t) => noise(a, o, t, { dur: 0.06, type: 'bandpass', f: rnd(1100, 1600), q: 1.4, gain: 0.25, at: 0.002 }),
  },
  kecapi: {
    range: 45,
    fn: (a, o, t) => {
      const f = pick([294, 330, 392, 440, 494, 587, 659])
      tone(a, o, t, { type: 'triangle', f, dur: 0.9, gain: 0.09 })
      return tone(a, o, t, { f: f * 2, dur: 0.4, gain: 0.03 })
    },
  },
  tawa: { range: 40, fn: (a, o, t, op) => babble(a, o, t, { syll: 4, f0: op.nada ?? 300, gain: 0.12, rate: 2 }) },
  'bola-salju': { vol: 1.8,
    range: 35,
    fn: (a, o, t) => {
      noise(a, o, t, { dur: 0.2, type: 'bandpass', f: 700, f1: 1500, q: 1, gain: 0.08, at: 0.04 })
      return STEP.salju(a, o, t + 0.35, 0.8)
    },
  },
  'koin-orang': {
    // orang membayar di kios (berposisi)
    range: 30,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) bell(a, o, t + i * 0.06, { f: rnd(1900, 2500), ratios: [1, 1.5, 2.71], dur: 0.25, gain: 0.05 })
      return 0.5
    },
  },
  'rusa-dengus': {
    // rusa kutub mendengus kaget
    range: 45,
    fn: (a, o, t) => noise(a, o, t, { dur: 0.22, kind: 'pink', type: 'bandpass', f: 900, f1: 500, q: 2, gain: 0.35, at: 0.01 }),
  },
  genderang: {
    // genderang perang di perahu orc
    range: 110,
    ref: 14,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      tone(a, o, t, { f: 95, f1: 55, dur: 0.35, gain: 0.45 * k })
      return noise(a, o, t, { dur: 0.12, kind: 'pink', type: 'lowpass', f: 600, gain: 0.3 * k, at: 0.002 })
    },
  },
  gosok: { vol: 2, range: 30, fn: (a, o, t) => noise(a, o, t, { dur: 0.5, type: 'bandpass', f: 1200, q: 1.5, gain: 0.1, at: 0.15 }) },
  sorak: {
    range: 50,
    fn: (a, o, t) => {
      for (let i = 0; i < 3; i++) babble(a, o, t + i * 0.05, { syll: 2, f0: rnd(160, 260), gain: 0.07, rate: 0.8 })
      return 0.8
    },
  },
  // ---------------------------------------------------------------- bala tentara Pulau Rajawali (v0.27.0)
  // terompet aba-aba saat pemain memberi perintah (antarmuka: selalu terdengar)
  'aba-aba': {
    ui: true,
    vol: 1.1,
    fn: (a, o, t) => {
      const c = a.ctx
      const notes = [[392, 0, 0.16], [523, 0.17, 0.32]]
      for (const [f, d, len] of notes) {
        const os = c.createOscillator()
        os.type = 'sawtooth'
        os.frequency.setValueAtTime(f * 0.97, t + d)
        os.frequency.linearRampToValueAtTime(f, t + d + 0.04)
        const lp = c.createBiquadFilter()
        lp.type = 'lowpass'
        lp.frequency.setValueAtTime(900, t + d)
        lp.frequency.linearRampToValueAtTime(2400, t + d + 0.06)
        lp.Q.value = 2
        const g = c.createGain()
        env(g.gain, t + d, 0.03, len, 0.07, len * 0.55)
        os.connect(lp).connect(g).connect(o)
        os.start(t + d)
        os.stop(t + d + len + 0.05)
      }
      a.until = Math.max(a.until || 0, t + 0.55)
      return 0.55
    },
  },
  // komandan menjawab ("Siap!"): suara lantang, nada per komandan
  'komandan-siap': {
    range: 130,
    ref: 16,
    vol: 1.2,
    fn: (a, o, t, op) => babble(a, o, t, { syll: 3, f0: op.nada ?? 125, gain: 0.26, rate: 1.25, breathy: 0.25 }),
  },
  // seluruh divisi menyahut ("Hah!"), kuda meringkik bila kavaleri
  'sorak-pasukan': {
    range: 150,
    ref: 22,
    fn: (a, o, t, op) => {
      for (let i = 0; i < 6; i++) babble(a, o, t + rnd(0, 0.09), { syll: 1, f0: rnd(105, 165), gain: 0.07, rate: 1.4, breathy: 0.3 })
      noise(a, o, t, { dur: 0.3, kind: 'pink', type: 'bandpass', f: 700, q: 0.8, gain: 0.06, at: 0.02 })
      if (op.kuda) RESEP.kuda.fn(a, o, t + 0.25, op)
      return 0.9
    },
  },
  // derap barisan: puluhan kaki menapak hampir bersamaan (kuat = banyaknya yang berjalan, lari = laju)
  'derap-barisan': {
    range: 90,
    ref: 12,
    gema: 0.4,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      const n = 5 + Math.round(k * 4)
      for (let i = 0; i < n; i++) {
        const d = rnd(0, op.lari ? 0.05 : 0.09)
        noise(a, o, t + d, { dur: 0.09, kind: 'pink', type: 'lowpass', f: rnd(700, 1300), gain: 0.07 * k, at: 0.006 })
        tone(a, o, t + d, { f: rnd(80, 110), f1: 50, dur: 0.06, gain: 0.04 * k })
      }
      // gemerincing zirah & senjata
      noise(a, o, t + 0.02, { dur: 0.08, type: 'bandpass', f: rnd(3500, 5200), q: 3, gain: 0.025 * k, at: 0.004 })
      return 0.25
    },
  },
  // derap kuda: empat kuku berurutan (jalan) atau beruntun cepat (berlari)
  'derap-kuda': {
    range: 110,
    ref: 14,
    gema: 0.4,
    fn: (a, o, t, op) => {
      const k = op.kuat ?? 1
      const gap = op.lari ? 0.055 : 0.12
      for (let i = 0; i < 4; i++) {
        const d = i * gap + rnd(0, 0.02)
        tone(a, o, t + d, { type: 'triangle', f: rnd(210, 260), f1: 110, dur: 0.05, gain: 0.08 * k })
        noise(a, o, t + d, { dur: 0.06, kind: 'pink', type: 'bandpass', f: rnd(900, 1400), q: 1.5, gain: 0.09 * k, at: 0.002 })
      }
      return 0.5
    },
  },
  cangkul: {
    range: 35,
    fn: (a, o, t) => {
      tone(a, o, t, { f: 110, f1: 60, dur: 0.1, gain: 0.25 })
      return noise(a, o, t, { dur: 0.15, kind: 'pink', type: 'lowpass', f: 1200, gain: 0.25, at: 0.004 })
    },
  },
  // ---------------------------------------------------------------- suasana berulang
  laut: {
    vol: 0.45,
    loop: (a, out) => {
      const pre = a.ctx.createGain()
      const fl = loopNoise(a, pre, { kind: 'pink', type: 'lowpass', f: 700 })
      const am = amLfo(a, pre, out, 0.13, 0.7)
      const hiss = a.ctx.createGain()
      hiss.gain.value = 0.25
      const fh = loopNoise(a, hiss, { kind: 'white', type: 'bandpass', f: 2500, q: 0.6 })
      amLfo(a, hiss, out, 0.13, 0.9)
      return {
        set(k, now) {
          fl.frequency.setTargetAtTime(400 + k * 900, now, 0.6)
          fh.frequency.setTargetAtTime(1800 + k * 1500, now, 0.6)
          am.lfo.frequency.setTargetAtTime(0.1 + k * 0.05, now, 1)
        },
      }
    },
  },
  angin: {
    vol: 0.6,
    loop: (a, out) => {
      const fl = loopNoise(a, out, { kind: 'pink', type: 'bandpass', f: 500, q: 0.8 })
      // hembusan: frekuensi saringan bergeser pelan
      const lfo = a.ctx.createOscillator()
      lfo.frequency.value = 0.09
      const lg = a.ctx.createGain()
      lg.gain.value = 180
      lfo.connect(lg).connect(fl.frequency)
      lfo.start()
      return {
        set(k, now) {
          fl.frequency.setTargetAtTime(380 + k * 700, now, 1)
          fl.Q.setTargetAtTime(0.7 + k * 1.6, now, 1)
          lg.gain.setTargetAtTime(150 + k * 400, now, 1)
        },
      }
    },
  },
  serangga: {
    // jangkrik / tonggeret hutan tropis
    vol: 0.35,
    loop: (a, out) => {
      const pre = a.ctx.createGain()
      loopNoise(a, pre, { kind: 'white', type: 'bandpass', f: 4800, q: 9 })
      const am = amLfo(a, pre, out, 28, 0.8)
      const slow = a.ctx.createOscillator()
      slow.frequency.value = 0.07
      const sg = a.ctx.createGain()
      sg.gain.value = 0.3
      slow.connect(sg).connect(am.g.gain)
      slow.start()
      return {}
    },
  },
  gua: {
    gema: 0.6,
    vol: 0.6,
    loop: (a, out) => {
      loopNoise(a, out, { kind: 'brown', type: 'lowpass', f: 140 })
      const o = a.ctx.createOscillator()
      o.frequency.value = 55
      const g = a.ctx.createGain()
      g.gain.value = 0.03
      o.connect(g).connect(out)
      o.start()
      return {}
    },
  },
  'air-terjun': {
    gema: 0.5,
    vol: 0.55,
    loop: (a, out) => {
      loopNoise(a, out, { kind: 'pink', type: 'lowpass', f: 2600 })
      const g = a.ctx.createGain()
      g.gain.value = 0.35
      loopNoise(a, g, { kind: 'brown', type: 'lowpass', f: 300 })
      g.connect(out)
      return {}
    },
  },
  api: {
    // api unggun: desis rendah + letupan kayu (penyangga letupan acak yang berulang)
    vol: 0.8,
    loop: (a, out) => {
      const low = a.ctx.createGain()
      low.gain.value = 0.25
      loopNoise(a, low, { kind: 'brown', type: 'lowpass', f: 500 })
      low.connect(out)
      const src = a.ctx.createBufferSource()
      src.buffer = sparseBuffer(a, { seconds: 3.7, rate: 11 })
      src.loop = true
      const bp = a.ctx.createBiquadFilter()
      bp.type = 'highpass'
      bp.frequency.value = 900
      const g = a.ctx.createGain()
      g.gain.value = 0.9
      src.connect(bp).connect(g).connect(out)
      src.start()
      return {}
    },
  },
  keramaian: {
    // gumam orang banyak di pasar / alun-alun
    vol: 0.5,
    loop: (a, out) => {
      const sum = a.ctx.createGain()
      for (const [f, q] of [[520, 4], [1300, 5], [2400, 6]]) {
        const pre = a.ctx.createGain()
        loopNoise(a, pre, { kind: 'pink', type: 'bandpass', f, q })
        amLfo(a, pre, sum, rnd(3, 6), 0.6)
      }
      amLfo(a, sum, out, 0.17, 0.35)
      return {}
    },
  },
  'perahu-air': {
    // air beriak di lambung perahu yang melaju / di sekitar badan yang berenang
    loop: (a, out) => {
      const pre = a.ctx.createGain()
      const fl = loopNoise(a, pre, { kind: 'pink', type: 'bandpass', f: 600, q: 0.9 })
      const am = amLfo(a, pre, out, 1.6, 0.6)
      return {
        set(k, now) {
          fl.frequency.setTargetAtTime(450 + k * 700, now, 0.3)
          am.lfo.frequency.setTargetAtTime(1 + k * 2.5, now, 0.3)
        },
      }
    },
  },
}
