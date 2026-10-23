import { BARANG } from '../world/aeloria/ekonomi.js'

// Ikon barang dagangan (SVG 24 × 24, berwarna). Sengaja tidak memakai huruf/emoji: tidak semua HP
// punya glyph-nya, dan warnanya berbeda-beda antar-merek.
const svg = body => `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`

export const IKON_KOIN = svg('<circle cx="12" cy="12" r="9.5" fill="#f2c94c" stroke="#a87b16" stroke-width="1.8"/><circle cx="12" cy="12" r="5.6" fill="none" stroke="#c99a1f" stroke-width="1.4"/><path d="M12 8.6v6.8" stroke="#a87b16" stroke-width="1.8" stroke-linecap="round"/>')
export const IKON_TAS = svg('<path d="M8.2 8.5V7a3.8 3.8 0 0 1 7.6 0v1.5" fill="none" stroke="#fff" stroke-width="1.9"/><path d="M4.8 8.5h14.4l-1.1 11.2a1.4 1.4 0 0 1-1.4 1.3H7.3a1.4 1.4 0 0 1-1.4-1.3z" fill="#fff"/>')

const ROTI = (c, s) => `<path d="M3.5 14.5c0-4.3 3.8-7.5 8.5-7.5s8.5 3.2 8.5 7.5v2.8a1.9 1.9 0 0 1-1.9 1.9H5.4a1.9 1.9 0 0 1-1.9-1.9z" fill="${c}"/><path d="M8 10.5l1.4 2.6M12 9.6l1.4 2.6M16 10.6l1.2 2.2" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round"/>`
const BUAH = c => `<path d="M12 7.2c-1.6-1.3-5.1-1.5-6.6 1.2-1.7 3.1 0 9.6 3.1 11.1 1.3.6 2.3-.2 3.5-.2s2.2.8 3.5.2c3.1-1.5 4.8-8 3.1-11.1C17.1 5.7 13.6 5.9 12 7.2z" fill="${c}"/><path d="M12 7.2c0-1.6.5-3.1 1.9-4.2" fill="none" stroke="#6b4423" stroke-width="1.5" stroke-linecap="round"/><path d="M13.6 5.3c1.2-1.4 3.1-1.7 4.3-1.1-.6 1.6-2.5 2.3-4.3 1.1z" fill="#4f9a3c"/>`
const DAGING = c => `<ellipse cx="14.6" cy="9.4" rx="6.2" ry="5" transform="rotate(-42 14.6 9.4)" fill="${c}"/><path d="M10 14 5.6 18.4" stroke="#f3ead8" stroke-width="2.8" stroke-linecap="round"/><circle cx="4.6" cy="19.8" r="1.7" fill="#f3ead8"/><circle cx="3.9" cy="17.6" r="1.5" fill="#f3ead8"/>`
const MINUM = c => `<path d="M5.5 6.5h10.5v9.8a3 3 0 0 1-3 3H8.5a3 3 0 0 1-3-3z" fill="#c98a3d"/><path d="M16 9h1.4a2.6 2.6 0 0 1 0 5.2H16" fill="none" stroke="#c98a3d" stroke-width="2"/><path d="M7 9.4h7.5" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`
const SAYUR = '<path d="M16.6 7.4c-2-2-4.6-.8-6.1.7L4.3 18.5c-.6.9.4 1.9 1.3 1.3l10.4-6.2c1.5-1.5 2.6-4.2.6-6.2z" fill="#ef8a2c"/><path d="M16.2 7.8l3.2-4M16.7 8.4l4.1-1.4M15.6 7.4l.4-4.7" stroke="#4f9a3c" stroke-width="1.7" stroke-linecap="round"/>'
const IKAN = '<path d="M2.5 12c3-4.6 9.2-5.6 13.3-2l4.4-3.2v10.4L15.8 14c-4.1 3.6-10.3 2.6-13.3-2z" fill="#6aa9d8"/><circle cx="7.2" cy="11.1" r="1.15" fill="#1d3b52"/><path d="M11 9.6c.8 1.4.8 3.4 0 4.8" fill="none" stroke="#4a86b4" stroke-width="1.2"/>'
const KEJU = '<path d="M2.8 15.5 14.6 6.8 21.2 10.4V18H2.8z" fill="#f4cd55"/><path d="M2.8 15.5h18.4" stroke="#c9a02a" stroke-width="1.2"/><circle cx="8" cy="16.9" r="1" fill="#c9a02a"/><circle cx="16.2" cy="12.8" r="1.2" fill="#c9a02a"/><circle cx="12.6" cy="16.8" r=".8" fill="#c9a02a"/>'
const RAMUAN = c => `<path d="M9.7 2.8h4.6v2h-.6v4.4l4.8 7.4a2.3 2.3 0 0 1-1.9 3.6H7.4a2.3 2.3 0 0 1-1.9-3.6l4.8-7.4V4.8h-.6z" fill="#eaf4ff" fill-opacity=".85"/><path d="M7.3 14.4h9.4l1.3 2.1a1.6 1.6 0 0 1-1.4 2.6H7.4A1.6 1.6 0 0 1 6 16.5z" fill="${c}"/><circle cx="11" cy="16.6" r=".9" fill="#fff" fill-opacity=".7"/>`
const PEDANG = c => `<path transform="rotate(45 12 12)" d="M12 1.5 13.5 4v11h-3V4z" fill="${c}"/><path transform="rotate(45 12 12)" d="M7 15h10v2H7zm4 2h2v4h-2zm-.75 4h3.5v2h-3.5z" fill="#d9b44a"/>`
const TOMBAK = '<path d="M4 20 16 8" stroke="#9a6b3e" stroke-width="2.1" stroke-linecap="round"/><path d="M14.6 6.9 21 3l-3.9 6.4z" fill="#dfe6ee"/><path d="M14.3 8.2l1.6 1.6" stroke="#d9b44a" stroke-width="1.8"/>'
const PERISAI = (c, rim) => `<path d="M12 2.6 20 5.4v6.2c0 4.8-3.4 8.3-8 9.8-4.6-1.5-8-5-8-9.8V5.4z" fill="${rim}"/><path d="M12 4.6 18.1 6.8v4.8c0 3.7-2.6 6.5-6.1 7.8-3.5-1.3-6.1-4.1-6.1-7.8V6.8z" fill="${c}"/><circle cx="12" cy="11.4" r="1.8" fill="#d9b44a"/>`
const ZIRAH = (c, trim) => `<path d="M7 3.5h3.2L12 5.4l1.8-1.9H17l3.6 4-2.6 2.2V20.5H6V9.7L3.4 7.5z" fill="${c}"/><path d="M6 17.2h12M12 5.4v12" stroke="${trim}" stroke-width="1.3"/>`
const HELM = '<path d="M5 15.2a7 7 0 0 1 14 0v3.3H5z" fill="#dfe6ee"/><path d="M5 15.2h14" stroke="#9aa4ae" stroke-width="1.6"/><path d="M4.4 12.2 1.8 9.4M19.6 12.2l2.6-2.8" stroke="#dfe6ee" stroke-width="2.1" stroke-linecap="round"/><path d="M12 8.2V3.8" stroke="#3e8a4a" stroke-width="2.6" stroke-linecap="round"/>'

const GAMBAR = {
  rotiGandum: ROTI('#d9a35a', '#9c6a2c'),
  rotiMadu: ROTI('#e8b04a', '#a8701e'),
  bekalElf: ROTI('#c98d4b', '#7b5124'),
  apelPerak: BUAH('#d94a3d'),
  anggurHutan: '<circle cx="9" cy="10" r="2.6" fill="#7b3fa0"/><circle cx="14" cy="10" r="2.6" fill="#7b3fa0"/><circle cx="11.5" cy="14.2" r="2.6" fill="#8e4cb5"/><circle cx="16.5" cy="14.2" r="2.4" fill="#7b3fa0"/><circle cx="7" cy="14.4" r="2.3" fill="#8e4cb5"/><circle cx="11.6" cy="18.6" r="2.4" fill="#7b3fa0"/><path d="M11.5 7.6V3.6l3 1.2" fill="none" stroke="#4f9a3c" stroke-width="1.6" stroke-linecap="round"/>',
  buahBintang: '<path d="M12 2.8l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.6l-5.6 3.3 1.4-6.3L3 9.3l6.4-.6z" fill="#f0c43a" stroke="#c99a1f" stroke-width="1"/>',
  sateRusa: '<path d="M3 21 19.5 4.5" stroke="#b08a5a" stroke-width="1.5" stroke-linecap="round"/><rect x="6.2" y="13.6" width="4.6" height="3.8" rx="1.2" transform="rotate(-45 8.5 15.5)" fill="#a5492a"/><rect x="9.8" y="10" width="4.6" height="3.8" rx="1.2" transform="rotate(-45 12.1 11.9)" fill="#b8572e"/><rect x="13.4" y="6.4" width="4.6" height="3.8" rx="1.2" transform="rotate(-45 15.7 8.3)" fill="#a5492a"/>',
  dagingPanggang: DAGING('#b5562f'),
  sariBuah: MINUM('#f2973c'),
  tehDaun: MINUM('#8cc06a'),
  maduHutan: MINUM('#f2c94c'),
  saladTaman: '<path d="M3.5 11.5h17a8.5 8.5 0 0 1-17 0z" fill="#e8e1d1"/><circle cx="8.5" cy="10" r="2.6" fill="#5fae45"/><circle cx="12.5" cy="9" r="2.8" fill="#4f9a3c"/><circle cx="16" cy="10.2" r="2.3" fill="#d94a3d"/>',
  supSayur: '<path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z" fill="#c9a87a"/><ellipse cx="12" cy="11" rx="8.5" ry="1.8" fill="#e09a3a"/><circle cx="9" cy="10.8" r="1" fill="#4f9a3c"/><circle cx="14" cy="11" r="1" fill="#ef8a2c"/><path d="M9.5 7c-.8-1 .8-2-.1-3M13.5 7c-.8-1 .8-2-.1-3" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.2" stroke-linecap="round"/>',
  ikanBakar: IKAN,
  kejuElf: KEJU,
  ramuanPenyembuh: RAMUAN('#e0475b'),
  ramuanKekuatan: RAMUAN('#f08a24'),
  ramuanKecepatan: RAMUAN('#3fa9f5'),
  pedangPerak: PEDANG('#eef4ff'),
  tombakElf: TOMBAK,
  perisaiDaun: PERISAI('#4f8a3c', '#7a5636'),
  perisaiPerak: PERISAI('#dfe6ee', '#d9b44a'),
  zirahRantai: ZIRAH('#8d939b', '#5d636b'),
  zirahPerak: ZIRAH('#dfe6ee', '#d9b44a'),
  helmElf: HELM,
}

export function ikonBarang(id) {
  return svg(GAMBAR[id] || SAYUR)
}

// pengujian: setiap barang punya gambar
export const semuaBerikon = () => Object.keys(BARANG).every(id => GAMBAR[id])
