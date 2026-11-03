// Mesin efek suara (v0.25.0). Semua suara DIBUAT dari kode dengan Web Audio (osilator + derau
// tersaring + amplop) — tanpa file suara: tetap offline, aset sendiri, unduhan tidak bertambah.
//
// - AudioContext baru dibuat pada sentuhan / tombol pertama (aturan browser HP), dihentikan saat tab
//   disembunyikan (hemat baterai).
// - Tiga jalur: efek (sfx), suasana (ambient), antarmuka (ui) → kompresor → keluaran. Jalur gema
//   (konvolusi dari derau yang meluruh) untuk gua & ruangan.
// - Suara berposisi: makin jauh makin pelan (hilang di luar `range`), kiri / kanan menurut arah kamera.
// - Paling banyak MAX_VOICES suara sekaligus (HP lemah): yang lebih pelan / jauh tidak dimainkan.
// - Volume & bisu disimpan di browser (Pengaturan).
import { RESEP } from './resep.js'

const KEY = 'pulau-tropis:suara'
const MAX_VOICES = 24

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { vol: typeof s.vol === 'number' ? Math.min(1, Math.max(0, s.vol)) : 0.8, bisu: !!s.bisu }
  } catch {
    return { vol: 0.8, bisu: false }
  }
}

function createEngine() {
  const settings = typeof window === 'undefined' ? { vol: 0.8, bisu: false } : loadSettings()
  let ctx = null
  let master = null
  let bus = null // { sfx, amb, ui }
  let revIn = null // masukan gema (dikirimi sebagian suara berposisi)
  let revLevel = 0 // 0 = luar ruang, 1 = gua besar
  let duck = 1 // peredam suara dunia (setDuck)
  let voices = 0
  const buffers = {}
  const loops = new Map() // nama → { out, ctl, level }
  const listener = { x: 0, y: 0, z: 0, rx: 1, rz: 0 } // posisi telinga + arah kanan kamera (datar)
  const log = [] // nama-nama suara terakhir (uji otomatis)
  const counts = {}
  let self = null // = api (resep menerima mesin ini)

  function makeNoise(kind) {
    const n = ctx.sampleRate * 2
    const buf = ctx.createBuffer(1, n, ctx.sampleRate)
    const d = buf.getChannelData(0)
    let b0 = 0
    let b1 = 0
    let b2 = 0
    let last = 0
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1
      if (kind === 'white') d[i] = w * 0.6
      else if (kind === 'pink') {
        // penyaring pink sederhana (Paul Kellet, ringkas)
        b0 = 0.99765 * b0 + w * 0.099046
        b1 = 0.963 * b1 + w * 0.2965164
        b2 = 0.57 * b2 + w * 1.0526913
        d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.16
      } else {
        // coklat: jalan acak teredam (gemuruh)
        last = (last + 0.02 * w) / 1.02
        d[i] = last * 3.2
      }
    }
    return buf
  }
  // gema: derau stereo yang meluruh eksponensial (±1,9 detik)
  function makeImpulse() {
    const len = Math.floor(ctx.sampleRate * 1.9)
    const buf = ctx.createBuffer(2, len, ctx.sampleRate)
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c)
      for (let i = 0; i < len; i++) {
        const t = i / len
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3.2) * (i < 80 ? i / 80 : 1)
      }
    }
    return buf
  }

  function init() {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    ctx = new AC({ latencyHint: 'interactive' })
    for (const k of ['white', 'pink', 'brown']) buffers[k] = makeNoise(k)
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -14
    comp.knee.value = 12
    comp.ratio.value = 4
    comp.attack.value = 0.004
    comp.release.value = 0.22
    master = ctx.createGain()
    master.gain.value = settings.bisu ? 0 : settings.vol
    comp.connect(master).connect(ctx.destination)
    bus = { sfx: ctx.createGain(), amb: ctx.createGain(), ui: ctx.createGain() }
    bus.sfx.gain.value = 1
    bus.amb.gain.value = 0.85
    bus.ui.gain.value = 0.7
    for (const b of Object.values(bus)) b.connect(comp)
    const conv = ctx.createConvolver()
    conv.buffer = makeImpulse()
    revIn = ctx.createGain()
    revIn.gain.value = 0
    const revOut = ctx.createGain()
    revOut.gain.value = 0.9
    revIn.connect(conv).connect(revOut).connect(comp)
    // suasana yang sudah diminta sebelum suara dibuka
    for (const [name, L] of loops) startLoop(name, L)
  }

  function unlock() {
    if (!ctx) init()
    if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {})
  }
  if (typeof window !== 'undefined') {
    const opts = { capture: true, passive: true }
    for (const ev of ['pointerdown', 'touchend', 'keydown']) window.addEventListener(ev, unlock, opts)
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return
      if (document.hidden) ctx.suspend().catch(() => {})
      else ctx.resume().catch(() => {})
    })
  }

  // kekerasan suara berposisi: 1 di dekat, memudar sampai 0 di `range`; pan kiri / kanan
  function spatial(at, range, ref) {
    const dx = at.x - listener.x
    const dy = (at.y ?? listener.y) - listener.y
    const dz = at.z - listener.z
    const d = Math.hypot(dx, dy * 0.6, dz)
    if (d >= range) return null
    const fall = ref / (ref + Math.max(0, d - ref * 0.5))
    const edge = 1 - Math.pow(d / range, 3)
    const flat = Math.hypot(dx, dz)
    const pan = flat > 0.5 ? ((dx * listener.rx + dz * listener.rz) / flat) * 0.75 * Math.min(1, flat / 4) : 0
    return { g: fall * edge, pan, d }
  }

  function play(name, opts = {}) {
    counts[name] = (counts[name] || 0) + 1
    log.push(name)
    if (log.length > 300) log.shift()
    if (!ctx || ctx.state !== 'running' || settings.bisu) return false
    const r = RESEP[name]
    if (!r) return false
    let g = (opts.vol ?? 1) * (r.vol ?? 1)
    let pan = 0
    if (opts.at) {
      const s = spatial(opts.at, opts.range ?? r.range ?? 45, opts.ref ?? r.ref ?? 5)
      if (!s) return false
      g *= s.g
      ;({ pan } = s)
    }
    if (g < 0.02) return false
    if (voices >= MAX_VOICES && !(opts.penting || r.penting)) return false
    const t = ctx.currentTime + (opts.delay || 0) + 0.005
    const out = ctx.createGain()
    out.gain.value = g
    let tail = out
    if (pan) {
      const p = ctx.createStereoPanner()
      p.pan.value = pan
      out.connect(p)
      tail = p
    }
    tail.connect(bus[opts.ui || r.ui ? 'ui' : 'sfx'])
    let send = null
    if (revLevel > 0.02 && !(opts.ui || r.ui)) {
      send = ctx.createGain()
      send.gain.value = revLevel * (r.gema ?? 0.5)
      tail.connect(send).connect(revIn)
    }
    voices++
    let dur = 0.5
    try {
      self.until = 0
      dur = r.fn(self, out, t, opts) || 0.5
      // bagian terpanjang resep (nada / derau yang dijadwalkan), supaya tidak terpotong
      dur = Math.max(dur, self.until - t)
    } catch (e) {
      console.warn('suara', name, e)
    }
    setTimeout(() => {
      voices--
      out.disconnect()
      if (tail !== out) tail.disconnect()
      send?.disconnect()
    }, (dur + (opts.delay || 0) + 0.25) * 1000)
    return true
  }

  // --- suasana (berulang terus; kerasnya diatur tiap bingkai)
  function startLoop(name, L) {
    if (!ctx || L.out) return
    const r = RESEP[name]
    if (!r?.loop) return
    L.out = ctx.createGain()
    L.out.gain.value = 0
    L.pan = ctx.createStereoPanner()
    L.out.connect(L.pan).connect(bus.amb)
    if (r.gema) {
      L.send = ctx.createGain()
      L.send.gain.value = 0
      L.pan.connect(L.send).connect(revIn)
    }
    L.ctl = r.loop(self, L.out) || {}
  }
  function loop(name) {
    let L = loops.get(name)
    if (!L) {
      L = { out: null, ctl: null, level: 0, pan: null, send: null }
      loops.set(name, L)
      startLoop(name, L)
    }
    return {
      // level 0..1 (dihaluskan), param bebas untuk resepnya, pan −1..1
      set(level, param, pan = 0) {
        L.level = level
        if (!L.out) return
        const now = ctx.currentTime
        const target = Math.max(0, level) * (RESEP[name].vol ?? 1)
        L.out.gain.setTargetAtTime(target, now, 0.35)
        L.pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.3)
        if (L.send) L.send.gain.setTargetAtTime(revLevel * (RESEP[name].gema ?? 0.5), now, 0.5)
        if (param !== undefined && L.ctl.set) L.ctl.set(param, now)
      },
      get level() {
        return L.level
      },
    }
  }

  const api = {
    until: 0, // akhir bunyi terjauh resep yang sedang dibuat (diisi oleh resep.js)
    get ctx() {
      return ctx
    },
    get ready() {
      return !!ctx && ctx.state === 'running'
    },
    buffers,
    unlock,
    play,
    loop,
    // telinga: posisi pemain, arah kanan dari kamera (pan kiri / kanan)
    setListener(x, y, z, camera) {
      listener.x = x
      listener.y = y
      listener.z = z
      if (camera) {
        const e = camera.matrixWorld.elements
        const l = Math.hypot(e[0], e[2]) || 1
        listener.rx = e[0] / l
        listener.rz = e[2] / l
      }
    },
    // redam suara dunia (efek & suasana) — mis. saat Ranah Tebas menghentikan waktu; antarmuka tidak
    setDuck(k) {
      if (!ctx || duck === k) return
      duck = k
      const now = ctx.currentTime
      bus.sfx.gain.setTargetAtTime(k, now, 0.12)
      bus.amb.gain.setTargetAtTime(0.85 * k, now, 0.12)
    },
    // banyaknya gema (gua / ruangan), 0..1
    setReverb(k) {
      revLevel = Math.max(0, Math.min(1, k))
    },
    // jarak dari telinga (untuk suasana yang dihitung pemanggil)
    spatial(at, range, ref = 5) {
      return spatial(at, range, ref)
    },
    get volume() {
      return settings.vol
    },
    set volume(v) {
      settings.vol = Math.min(1, Math.max(0, v))
      save()
    },
    get muted() {
      return settings.bisu
    },
    set muted(b) {
      settings.bisu = !!b
      save()
    },
    // uji otomatis: daftar & jumlah suara yang diminta (juga sebelum suara dibuka / saat bisu)
    debug: {
      log,
      counts,
      get voices() {
        return voices
      },
      reset() {
        log.length = 0
        for (const k of Object.keys(counts)) delete counts[k]
      },
    },
  }
  self = api
  function save() {
    if (master) master.gain.setTargetAtTime(settings.bisu ? 0 : settings.vol, ctx.currentTime, 0.05)
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
      // penyimpanan diblokir: berlaku sampai halaman dimuat ulang
    }
  }
  return api
}

// satu mesin untuk seluruh game (modul dunia cukup `import { suara } from '…/audio/suara.js'`)
export const suara = createEngine()
// singkatan: efek berposisi di titik { x, y, z }
export const sfx = (name, at, opts) => suara.play(name, at ? { ...opts, at } : opts)
