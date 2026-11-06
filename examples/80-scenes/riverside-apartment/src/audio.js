// Small synthesised sound kit (no downloads except the shared rain loop).
export class Audio {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  start() {
    if (this.ctx || !this.enabled) return
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      this.ctx = new AC()
    } catch { this.enabled = false; return }
    const c = this.ctx
    this.master = c.createGain(); this.master.gain.value = 0.6; this.master.connect(c.destination)
    // noise buffer
    const len = c.sampleRate * 2
    this.noise = c.createBuffer(1, len, c.sampleRate)
    const d = this.noise.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    // ambient drone
    const drone = c.createGain(); drone.gain.value = 0.05; drone.connect(this.master)
    for (const f of [41.2, 41.7, 61.8]) {
      const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 160
      o.connect(lp).connect(drone); o.start()
    }
    // rain (outside, muffled inside)
    this.rainGain = c.createGain(); this.rainGain.gain.value = 0
    this.rainFilter = c.createBiquadFilter(); this.rainFilter.type = 'lowpass'; this.rainFilter.frequency.value = 6000
    this.rainFilter.connect(this.rainGain).connect(this.master)
    fetch('/assets/sounds/rain.mp3').then(r => r.arrayBuffer()).then(b => c.decodeAudioData(b)).then(buf => {
      const s = c.createBufferSource(); s.buffer = buf; s.loop = true; s.connect(this.rainFilter); s.start()
    }).catch(() => {})
    // elevator hum
    this.hum = c.createGain(); this.hum.gain.value = 0; this.hum.connect(this.master)
    const ho = c.createOscillator(); ho.type = 'triangle'; ho.frequency.value = 58
    ho.connect(this.hum); ho.start()
  }

  setRain(outside) {
    if (!this.rainGain) return
    const t = this.ctx.currentTime
    this.rainGain.gain.setTargetAtTime(outside ? 0.5 : 0.12, t, 0.5)
    this.rainFilter.frequency.setTargetAtTime(outside ? 6000 : 700, t, 0.5)
  }

  setHum(v) {
    if (!this.hum) return
    this.hum.gain.setTargetAtTime(v * 0.08, this.ctx.currentTime, 0.3)
  }

  #noiseBurst(dur, freq, gain, type = 'lowpass', q = 1) {
    const c = this.ctx, t = c.currentTime
    const s = c.createBufferSource(); s.buffer = this.noise
    const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q
    const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    s.connect(f).connect(g).connect(this.master)
    s.start(t, Math.random()); s.stop(t + dur + 0.05)
  }

  #tone(freq, dur, gain, type = 'sine', slide = 0) {
    const c = this.ctx, t = c.currentTime
    const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t)
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur)
    const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    o.connect(g).connect(this.master); o.start(t); o.stop(t + dur + 0.05)
  }

  play(name) {
    if (!this.ctx) return
    switch (name) {
      case 'step': this.#noiseBurst(0.09, 380 + Math.random() * 120, 0.18); break
      case 'stepSoft': this.#noiseBurst(0.07, 260, 0.08); break
      case 'doorOpen': this.#tone(140, 0.6, 0.05, 'sawtooth', 90); this.#noiseBurst(0.2, 900, 0.06, 'bandpass', 3); break
      case 'doorClose': this.#noiseBurst(0.25, 200, 0.35); this.#tone(70, 0.2, 0.15, 'sine'); break
      case 'locked': this.#noiseBurst(0.08, 2500, 0.12, 'bandpass', 4); setTimeout(() => this.ctx && this.#noiseBurst(0.08, 2200, 0.1, 'bandpass', 4), 110); break
      case 'unlock': this.#noiseBurst(0.06, 3000, 0.15, 'bandpass', 5); this.#tone(900, 0.08, 0.05, 'square'); break
      case 'drawerOpen': case 'drawerClose': this.#noiseBurst(0.3, 600, 0.12, 'bandpass', 2); break
      case 'cabinetOpen': case 'cabinetClose': this.#noiseBurst(0.15, 800, 0.1, 'bandpass', 2); break
      case 'click': case 'switch': this.#noiseBurst(0.03, 4000, 0.2, 'highpass'); break
      case 'breaker': this.#noiseBurst(0.05, 1800, 0.4, 'bandpass', 2); this.#tone(60, 0.5, 0.08, 'square'); break
      case 'button': this.#tone(1200, 0.05, 0.05, 'square'); break
      case 'ding': this.#tone(1318, 1.2, 0.12); setTimeout(() => this.ctx && this.#tone(1046, 1.4, 0.1), 250); break
      case 'elevatorStart': this.#noiseBurst(0.5, 150, 0.2); break
      case 'pickup': this.#tone(660, 0.12, 0.08, 'triangle'); this.#tone(990, 0.2, 0.06, 'triangle'); break
      case 'paper': this.#noiseBurst(0.25, 3000, 0.08, 'highpass'); break
      case 'flashlight': this.#noiseBurst(0.02, 5000, 0.25, 'highpass'); break
      case 'scare': this.#tone(80, 2.5, 0.25, 'sawtooth', -40); this.#noiseBurst(1.5, 300, 0.3); break
      case 'whisper': this.#noiseBurst(1.8, 1800, 0.05, 'bandpass', 8); break
    }
  }
}
