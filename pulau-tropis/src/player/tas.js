import { BARANG, PAKAIAN } from '../world/aeloria/ekonomi.js'

// Tas pemain: koin, barang bawaan (makanan, minuman, ramuan, ikan hasil memancing, kayu), perlengkapan
// & alat (pancing) yang dimiliki, perlengkapan yang sedang dipakai, dan ramuan yang sedang bekerja.
// Disimpan di localStorage bila browser mengizinkan (mode privat / pratinjau bisa memblokir — tas
// tetap jalan tanpa disimpan).
const KEY = 'pulau-tropis:tas'
export const KOIN_AWAL = 60
const TAHAN_MAKS = 0.7 // luka yang tertahan paling banyak 70%

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function createBag() {
  const saved = load()
  const state = {
    koin: KOIN_AWAL,
    barang: {}, // id → banyaknya
    punya: {}, // id perlengkapan → true
    pakai: { senjata: null, perisai: null, zirah: null, helm: null },
  }
  if (saved && typeof saved.koin === 'number') {
    state.koin = Math.max(0, Math.floor(saved.koin))
    for (const [id, n] of Object.entries(saved.barang || {})) if (BARANG[id] && n > 0) state.barang[id] = Math.floor(n)
    for (const id of Object.keys(saved.punya || {})) if (BARANG[id]) state.punya[id] = true
    for (const j of PAKAIAN) if (saved.pakai && state.punya[saved.pakai[j]]) state.pakai[j] = saved.pakai[j]
  }
  const buff = { kuat: 0, cepat: 0 } // detik tersisa
  const listeners = []
  const changed = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // penyimpanan diblokir: tidak apa-apa
    }
    for (const fn of listeners) fn()
  }

  // efek gabungan perlengkapan + ramuan
  function effect() {
    let serang = 1
    let jangkau = 0
    let tahan = 0
    for (const j of PAKAIAN) {
      const b = BARANG[state.pakai[j]]
      if (!b) continue
      if (b.serang) serang *= b.serang
      if (b.jangkau) jangkau += b.jangkau
      if (b.tahan) tahan += b.tahan
    }
    if (buff.kuat > 0) serang *= 1.5
    return { serang, jangkau, tahan: Math.min(TAHAN_MAKS, tahan), cepat: buff.cepat > 0 ? 1.35 : 1 }
  }

  return {
    get koin() {
      return state.koin
    },
    get barang() {
      return state.barang
    },
    get punya() {
      return state.punya
    },
    get pakai() {
      return state.pakai
    },
    get buff() {
      return buff
    },
    effect,
    onChange(fn) {
      listeners.push(fn)
    },
    dapat(n) {
      state.koin += n
      changed()
    },
    bayar(n) {
      state.koin = Math.max(0, state.koin - n)
      changed()
    },
    // barang hasil membeli / memancing / menebang / membuat: perlengkapan langsung dipakai, alat
    // (pancing) dimiliki, lainnya masuk tas (n buah)
    terima(id, n = 1) {
      const b = BARANG[id]
      if (!b) return
      if (PAKAIAN.includes(b.jenis)) {
        state.punya[id] = true
        state.pakai[b.jenis] = id
      } else if (b.jenis === 'alat') state.punya[id] = true
      else state.barang[id] = (state.barang[id] || 0) + n
      changed()
    },
    // banyaknya barang `id` di tas
    jumlah(id) {
      return state.barang[id] || 0
    },
    // ambil n barang (mis. kayu untuk membuat perahu, ikan yang dijual); false bila kurang
    ambil(id, n = 1) {
      if ((state.barang[id] || 0) < n) return false
      state.barang[id] -= n
      if (!state.barang[id]) delete state.barang[id]
      changed()
      return true
    },
    // pakai / lepas perlengkapan yang dimiliki
    kenakan(id) {
      const b = BARANG[id]
      if (!b || !state.punya[id] || !PAKAIAN.includes(b.jenis)) return
      state.pakai[b.jenis] = state.pakai[b.jenis] === id ? null : id
      changed()
    },
    // makan / minum / minum ramuan: hasil { pulih, kuat, cepat } atau null bila tidak punya
    gunakan(id) {
      const b = BARANG[id]
      if (!b || !(state.barang[id] > 0)) return null
      state.barang[id]--
      if (!state.barang[id]) delete state.barang[id]
      if (b.kuat) buff.kuat = Math.max(buff.kuat, b.kuat)
      if (b.cepat) buff.cepat = Math.max(buff.cepat, b.cepat)
      changed()
      return { pulih: b.pulih || 0, kuat: b.kuat || 0, cepat: b.cepat || 0 }
    },
    update(dt) {
      const had = buff.kuat > 0 || buff.cepat > 0
      buff.kuat = Math.max(0, buff.kuat - dt)
      buff.cepat = Math.max(0, buff.cepat - dt)
      if (had && !(buff.kuat > 0 || buff.cepat > 0)) for (const fn of listeners) fn()
    },
    // untuk pengujian: kosongkan tas & isi koin
    reset(koin = KOIN_AWAL) {
      state.koin = koin
      state.barang = {}
      state.punya = {}
      state.pakai = { senjata: null, perisai: null, zirah: null, helm: null }
      buff.kuat = buff.cepat = 0
      changed()
    },
  }
}
