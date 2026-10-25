import { createMemory, jawab, sapaan, terimaMakanan, TOPIK } from '../world/percakapan.js'
import { BARANG, NAMA_KIOS } from '../world/aeloria/ekonomi.js'
import { PASUKAN } from '../world/aeloria/kehidupan.js'

// Mengobrol dengan NPC: tombol "Bicara" muncul di dekat elf Aeloria atau warga Kencana (bukan
// prajurit penjaga); panelnya berisi riwayat obrolan, topik siap pilih, dan kolom ketik bebas.
// Selama mengobrol NPC berhenti & menghadap pemain (elf diambil alih lewat life.grab, warga Kencana
// lewat a.talk), pemain diam menghadap NPC, dan kamera pindah ke samping keduanya (pemain & NPC tampak
// berdampingan di bagian layar yang tidak tertutup panel). Ucapan pamit NPC juga muncul di gelembung
// di atas kepalanya (tetap terlihat sesudah panel tertutup). Isi jawabannya dari world/percakapan.js.
const $ = id => document.getElementById(id)
const RANGE = 3.2 // m: tombol Bicara muncul
const LEAVE = 6.5 // m: obrolan berakhir bila pemain / NPC menjauh
const SIBUK = new Set(['lawan', 'kabur', 'sorak', 'roboh'])
const PIKIR = [0.45, 1.3] // detik NPC "berpikir" sebelum menjawab
const turnTo = (h, want, k) => h + Math.atan2(Math.sin(want - h), Math.cos(want - h)) * k

// nama warga Kencana (tetap per orang: dari nomor urutnya)
const NAMA_PRIA = ['Darmo', 'Joko', 'Bayu', 'Wiryo', 'Karta', 'Seno', 'Ranu', 'Galih', 'Sastro', 'Made', 'Asep', 'Slamet', 'Agus', 'Wayan', 'Bagus', 'Tirta']
const NAMA_WANITA = ['Sari', 'Wulan', 'Darmi', 'Ningsih', 'Ayu', 'Ratih', 'Siti', 'Laras', 'Retno', 'Sekar', 'Kinanti', 'Lestari', 'Asih', 'Puspa']
const SAPA_PRIA = ['Pak', 'Mas', 'Kang', 'Ki']
const SAPA_WANITA = ['Bu', 'Mbak', 'Mbok', 'Nyi']
const PERAN_WARGA = {
  penjual: ['pedagang pasar', 'sedang menjaga dagangan di pasar', 'kerja'],
  pembeli: ['pembeli di pasar', 'sedang berbelanja', 'belanja'],
  petani: ['petani', 'sedang bekerja di sawah', 'kerja'],
  nelayan: ['nelayan', 'sedang memperbaiki jala', 'mancing'],
  kuli: ['kuli pelabuhan', 'sedang mengangkut peti', 'kerja'],
  pendeta: ['pemangku pura', 'sedang berdoa', 'duduk'],
  raja: ['Raja Kencana', 'sedang duduk di singgasana pendopo', 'duduk'],
  warga: ['warga Kotaraja', 'sedang bersantai', 'santai'],
  pejalan: ['warga Kencana', 'sedang berjalan-jalan', 'jalan'],
}
// angka acak tetap per orang (0..1)
const tetap = (n, k) => {
  const v = Math.sin(n * 127.1 + k * 311.7) * 43758.5453
  return v - Math.floor(v)
}
const SIFAT = ['rajin', 'riang', 'ramah', 'rakus', 'pemalas', 'petualang', 'pemberani', 'pemarah']

// life = kehidupan Aeloria (boleh null), villagers = penduduk Kencana (boleh null), player, cam
// (kamera pengikut), camera (THREE.PerspectiveCamera), input, bag, shop, bubbles, places(npc) → daftar
// tempat untuk petunjuk arah, seberang(x0, z0, x1, z1), wantedByElves() → pemain buron di Aeloria,
// feast() → sedang pesta, boatBuilt() → punya perahu
export function createChat({ life, villagers, player, cam, camera, input, bag, shop, bubbles, places, seberang, wantedByElves, feast, boatBuilt }) {
  const el = {
    panel: $('obrolan'), nama: $('obrolan-nama'), peran: $('obrolan-peran'), log: $('obrolan-log'),
    topik: $('obrolan-topik'), form: $('obrolan-form'), teks: $('obrolan-teks'),
  }
  const memories = new Map() // id NPC → ingatan
  let cur = null // { npc, ref, kind: 'elf' | 'warga', mem, held }
  let pending = null // jawaban yang sedang "dipikirkan": { r, t }
  let gestureT = 0
  let savedCam = null

  // ---------------------------------------------------------------- NPC: elf & warga Kencana
  function elfNpc(a) {
    const d = life.describe(a)
    const act = a.act === 'jalan' ? a.goal : a.act
    const child = a.kind === 'anak'
    return {
      id: `e${a.id}`, bangsa: 'elf', nama: a.name, gender: a.gender, kerja: a.kind === 'kesatria' ? 'kesatria' : a.job,
      peran: d.peran.charAt(0).toUpperCase() + d.peran.slice(1), pangkat: a.rank, pasukan: a.kind === 'kesatria' ? PASUKAN[a.pasukan].name : null,
      senjata: d.senjata, kegiatan: d.kegiatan, act, suasana: d.suasana, sifat: a.sifat, butuh: d.kebutuhan,
      dagangan: a.job === 'pedagang' ? NAMA_KIOS[a.work?.site?.goods] || null : null,
      umur: child ? 20 + Math.floor(tetap(a.id, 1) * 40) : 80 + Math.floor(tetap(a.id, 1) * 520), x: a.x, z: a.z,
    }
  }
  function wargaNpc(a, n) {
    const type = villagers.typeName(a)
    const wanita = type.startsWith('female')
    const kerja = a.role && PERAN_WARGA[a.role] ? a.role : 'pejalan'
    const [peran, kegiatan, act] = PERAN_WARGA[kerja]
    const nama = kerja === 'raja' ? 'Prabu Wijaya Kencana'
      : kerja === 'pendeta' ? `Jero ${NAMA_PRIA[n % NAMA_PRIA.length]}`
        : `${(wanita ? SAPA_WANITA : SAPA_PRIA)[Math.floor(tetap(n, 2) * 4)]} ${(wanita ? NAMA_WANITA : NAMA_PRIA)[Math.floor(tetap(n, 3) * (wanita ? NAMA_WANITA : NAMA_PRIA).length)]}`
    const sifat = Object.fromEntries(SIFAT.map((k, i) => [k, tetap(n, 10 + i)]))
    return {
      id: `v${n}`, bangsa: 'manusia', nama, gender: wanita ? 'wanita' : 'pria', kerja, peran: peran.charAt(0).toUpperCase() + peran.slice(1),
      kegiatan, act, suasana: tetap(n, 4) < 0.6 ? 'senang' : 'biasa saja', sifat,
      butuh: { lapar: Math.round(tetap(n, 5) * 90), lelah: Math.round(tetap(n, 6) * 60), bosan: 20, sepi: 30, latih: 0 },
      umur: 18 + Math.floor(tetap(n, 7) * 52), x: a.x, z: a.z,
    }
  }

  // NPC terdekat yang bisa diajak bicara: { kind, ref, n, d } atau null
  function nearest(p) {
    let best = null
    if (life)
      for (const a of life.around(p.x, p.z, RANGE)) {
        if (a.hidden || a.down || SIBUK.has(a.act) || (a.phase === 'tempur' && a.act !== 'bicara')) continue
        const d = Math.hypot(a.x - p.x, a.z - p.z)
        if (!best || d < best.d) best = { kind: 'elf', ref: a, d }
      }
    if (villagers && p.x < -120)
      villagers.agents.forEach((a, n) => {
        if (a.hidden || a.scripted || a.role === 'penjaga') return
        const d = Math.hypot(a.x - p.x, a.z - p.z)
        if (d < RANGE && (!best || d < best.d)) best = { kind: 'warga', ref: a, n, d }
      })
    return best
  }
  const npcOf = t => (t.kind === 'elf' ? elfNpc(t.ref) : wargaNpc(t.ref, t.n))
  const headOf = t => (t.kind === 'elf' ? { x: t.ref.x, y: t.ref.y + 1.75 * t.ref.scale, z: t.ref.z } : { x: t.ref.x, y: (t.ref.y ?? player.position.y) + 1.6, z: t.ref.z })

  // ---------------------------------------------------------------- konteks pemain untuk jawaban
  function context(npc) {
    const makanan = Object.keys(bag.barang).filter(id => ['makanan', 'minuman', 'ikan'].includes(BARANG[id]?.jenis))
      .sort((a, b) => BARANG[a].harga - BARANG[b].harga).map(id => ({ id, nama: BARANG[id].nama }))
    return {
      tempat: places(npc), seberang, buron: npc.bangsa === 'elf' && wantedByElves(), pesta: feast(), koin: bag.koin,
      hp: player.hp, makanan, kayu: bag.jumlah('kayu'), punyaPancing: !!bag.punya.pancing, punyaPerahu: boatBuilt(),
    }
  }

  // ---------------------------------------------------------------- tampilan
  const ENTITAS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }
  const escape = s => String(s).replace(/[&<>"']/g, c => ENTITAS[c])
  function addLine(who, text) {
    const div = document.createElement('div')
    div.className = `ob-baris ${who}`
    div.textContent = text
    el.log.appendChild(div)
    while (el.log.children.length > 40) el.log.firstChild.remove()
    el.log.scrollTop = el.log.scrollHeight
    return div
  }
  let typing = null
  function setTyping(on) {
    if (on && !typing) typing = addLine('npc mengetik', '…')
    else if (!on && typing) {
      typing.remove()
      typing = null
    }
  }
  // topik siap pilih: yang belum dibicarakan dulu, + memberi makanan, + lihat dagangan, + arah
  function renderTopics() {
    if (!cur) return
    const { npc, mem } = cur
    const ctx = context(npc)
    const chips = []
    if (npc.kerja === 'pedagang' && cur.ref.atWork && shop.stallOf(cur.ref)) chips.push({ id: 'kios', teks: 'Lihat daganganmu' })
    if (ctx.makanan.length) chips.push({ id: 'beri', teks: `Beri ${ctx.makanan[0].nama.toLowerCase()}` })
    const fresh = TOPIK.filter(t => !mem.topik.has(t.id))
    const used = TOPIK.filter(t => mem.topik.has(t.id))
    chips.push(...fresh.slice(0, 6))
    const near = ctx.tempat.slice().sort((a, b) => Math.hypot(a.x - npc.x, a.z - npc.z) - Math.hypot(b.x - npc.x, b.z - npc.z))
    const askPlace = near.find(t => Math.hypot(t.x - npc.x, t.z - npc.z) > 60)
    if (askPlace) chips.push({ id: 'tempat', teks: `Di mana ${askPlace.nama}?`, tempat: askPlace })
    if (chips.length < 8) chips.push(...used.slice(0, 8 - chips.length))
    chips.push({ id: 'pamit', teks: 'Sampai jumpa' })
    el.topik.innerHTML = chips.map((c, i) => `<button type="button" data-i="${i}">${escape(c.teks)}</button>`).join('')
    el.topik.chips = chips
  }

  // ---------------------------------------------------------------- gerak NPC
  function gesture(name) {
    if (!cur) return
    gestureT = name === 'talk' ? 2.2 : 1.6
    if (cur.kind === 'elf') {
      if (cur.held) life.mode(cur.ref, 'bicara', name, true)
    } else if (cur.ref.anim === 'sit') cur.ref.talk = 'sit' // yang duduk (raja, pemangku) tetap duduk
    else cur.ref.talk = { talk: 'interact', nod: 'wave', bow: 'wave', wave: 'wave', cheer: 'wave', shake: 'no' }[name] || 'idle'
  }
  function say(r) {
    addLine('npc', r.teks)
    // selama panel terbuka ucapannya cukup di riwayat (gelembung hanya menduplikasi & tertutup panel)
    if (r.selesai) {
      const c = cur
      bubbles.say(() => headOf(c), r.teks.length > 90 ? `${r.teks.slice(0, 87)}…` : r.teks, Math.min(6500, 1800 + r.teks.length * 45), c.kind === 'elf' ? `elf${c.ref.id}` : `v${c.n}`)
    }
    gesture(r.gerak || 'talk')
    if (r.tawar === 'kios' && cur.npc.kerja === 'pedagang') cur.mem.tawarKios = true
    renderTopics()
    if (r.selesai) setTimeout(() => close(), 1600)
  }
  function respond(input) {
    if (!cur || pending) return
    pending = { input, t: PIKIR[0] + Math.random() * (PIKIR[1] - PIKIR[0]) }
    setTyping(true)
    gesture('idle')
  }

  // ---------------------------------------------------------------- buka & tutup
  function open(target) {
    if (cur) close()
    const npc = npcOf(target)
    let mem = memories.get(npc.id)
    if (!mem) memories.set(npc.id, mem = createMemory())
    cur = { ...target, npc, mem, held: false }
    // elf berhenti & menghadap pemain (pedagang yang sedang berjaga tetap di balik mejanya)
    if (target.kind === 'elf' && !(target.ref.job === 'pedagang' && target.ref.atWork) && target.ref.phase !== 'tempur') {
      life.grab(target.ref, 'bicara')
      life.mode(target.ref, 'bicara', 'idle')
      cur.held = true
    } else if (target.kind === 'warga') target.ref.talk = target.ref.anim === 'sit' ? 'sit' : 'idle'
    player.stop()
    player.face(target.ref.x, target.ref.z)
    input.setEnabled(false)
    shop.close()
    // kamera di samping pemain & NPC (sisi yang paling dekat dengan arah kamera sekarang)
    savedCam = { dist: cam.state.dist, pitch: cam.state.pitch, yaw: cam.yaw }
    const across = Math.atan2(target.ref.x - player.position.x, target.ref.z - player.position.z)
    const side = [across + Math.PI / 2, across - Math.PI / 2]
      .map(y => ({ y, d: Math.abs(Math.atan2(Math.sin(y - cam.yaw), Math.cos(y - cam.yaw))) }))
      .sort((a, b) => a.d - b.d)[0].y
    cam.lookFrom(side, false, 0.16)
    cam.state.dist = 6.2
    el.nama.textContent = npc.nama
    el.peran.textContent = npc.peran
    el.log.innerHTML = ''
    el.teks.value = ''
    el.panel.hidden = false
    measure()
    say(sapaan(npc, mem, context(npc)))
  }
  function close() {
    if (!cur) return
    if (cur.kind === 'elf') {
      if (cur.held && cur.ref.phase === 'tempur' && cur.ref.act === 'bicara') life.free(cur.ref)
    } else cur.ref.talk = null
    cur = null
    pending = null
    typing = null
    el.panel.hidden = true
    el.teks.blur()
    input.setEnabled(true)
    // kamera kembali ke arah sebelum mengobrol (kamera tidak berputar sendiri saat berjalan lagi)
    if (savedCam) {
      cam.state.dist = savedCam.dist
      cam.lookFrom(savedCam.yaw, false, savedCam.pitch)
      savedCam = null
    }
  }

  // beri makanan termurah yang dibawa
  function giveFood() {
    const ctx = context(cur.npc)
    const f = ctx.makanan[0]
    if (!f) {
      say({ teks: 'Kau tidak membawa makanan apa pun.', gerak: 'shake' })
      return
    }
    const r = terimaMakanan(cur.npc, cur.mem, f.nama)
    if (r.diterima) {
      bag.ambil(f.id, 1)
      if (cur.kind === 'elf') cur.ref.need.lapar = Math.max(0, cur.ref.need.lapar - 0.6)
      else cur.npc.butuh.lapar = 0
      shop.reward(r.koin)
    }
    say(r)
  }

  // ---------------------------------------------------------------- masukan pemain
  el.form.addEventListener('submit', e => {
    e.preventDefault()
    const text = el.teks.value.trim().slice(0, 120)
    if (!text || !cur) return
    el.teks.value = ''
    addLine('pemain', text)
    respond({ teks: text })
  })
  el.topik.addEventListener('click', e => {
    const b = e.target.closest('button[data-i]')
    const c = b && el.topik.chips?.[Number(b.dataset.i)]
    if (!c || !cur) return
    if (c.id === 'kios') {
      const stall = shop.stallOf(cur.ref)
      close()
      if (stall) shop.openStall(stall)
      return
    }
    addLine('pemain', c.id === 'beri' ? `(memberi ${context(cur.npc).makanan[0]?.nama.toLowerCase() || 'makanan'})` : c.teks)
    if (c.id === 'beri') giveFood()
    else respond({ topik: c.id, tempat: c.tempat })
  })
  $('btn-tutup-obrolan').addEventListener('click', close)
  el.teks.addEventListener('keydown', e => {
    if (e.key === 'Escape') close()
    e.stopPropagation()
  })

  // layar mendatar: bagian kanan layar (pecahan lebar) yang tertutup panel; 0 = tegak (panel di atas)
  let cover = 0
  const landscape = matchMedia('(orientation: landscape)')
  function measure() {
    cover = cur && landscape.matches ? Math.max(0, 1 - el.panel.getBoundingClientRect().left / innerWidth) : 0
  }
  addEventListener('resize', measure)

  let near = null
  let checkT = 0
  const focus = player.position.clone()
  let approach = null // NPC yang dituju dari kartu elf ("Ajak bicara")

  return {
    get open() {
      return !!cur
    },
    // NPC terdekat yang bisa diajak bicara (untuk tombol Bicara): { nama } atau null
    get near() {
      return near
    },
    // titik tengah pemain & NPC yang sedang diajak bicara (diikuti kamera), atau null. Layar mendatar:
    // digeser ke kanan kamera sejauh lebar panel (di jarak kamera) supaya keduanya tampak di tengah
    // bagian kiri layar yang tidak tertutup panel
    get focus() {
      if (!cur) return null
      const p = player.position
      const s = cover * cam.state.dist * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect
      focus.set((p.x + cur.ref.x) / 2 + Math.cos(cam.yaw) * s, p.y, (p.z + cur.ref.z) / 2 - Math.sin(cam.yaw) * s)
      return focus
    },
    // mulai mengobrol dengan NPC terdekat
    talk() {
      if (near) open(near.target)
    },
    // dari kartu elf: berjalan ke elf itu (path dari main.js), obrolan dimulai saat tiba
    approach(a) {
      approach = a
    },
    close,
    update(dt, active) {
      // jawaban yang sedang "dipikirkan"
      if (pending && (pending.t -= dt) <= 0) {
        const { input: inp } = pending
        pending = null
        setTyping(false)
        if (cur) {
          // kegiatan & kebutuhan elf terus berubah selama mengobrol: baca ulang sebelum menjawab
          if (cur.kind === 'elf') cur.npc = elfNpc(cur.ref)
          say(jawab(cur.npc, cur.mem, context(cur.npc), inp))
        }
      }
      if (cur) {
        const a = cur.ref
        const p = player.position
        const gone = cur.kind === 'elf' ? a.hidden || a.down || (cur.held && (a.phase !== 'tempur' || a.act !== 'bicara')) || (!cur.held && SIBUK.has(a.act)) : a.hidden
        if (!active || player.defeated || gone || Math.hypot(a.x - p.x, a.z - p.z) > LEAVE) {
          close()
          return
        }
        // NPC menghadap pemain; gerak sekali kembali ke diam
        if (cur.kind === 'elf' && cur.held) a.heading = turnTo(a.heading, Math.atan2(p.x - a.x, p.z - a.z), Math.min(1, dt * 6))
        if (gestureT > 0 && (gestureT -= dt) <= 0) gesture('idle')
        return
      }
      if ((checkT -= dt) > 0) return
      checkT = 0.2
      const t = active && !player.defeated && !player.swimming && !player.riding ? nearest(player.position) : null
      near = t ? { target: t, nama: t.kind === 'elf' ? t.ref.name : wargaNpc(t.ref, t.n).nama } : null
      if (approach && !player.hasPath) {
        const a = approach
        approach = null
        if (near?.target.ref === a) open(near.target)
      }
    },
    // pengujian
    get current() {
      return cur && { id: cur.npc.id, nama: cur.npc.nama, kind: cur.kind, held: cur.held }
    },
    say: text => respond({ teks: text }),
    memories,
  }
}
