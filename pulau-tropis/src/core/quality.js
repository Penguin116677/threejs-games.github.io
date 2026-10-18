// Pengaturan kualitas: HP mendapat resolusi dan detail lebih rendah
// agar tetap lancar. Bisa dipaksa lewat URL: ?kualitas=rendah|tinggi
const params = new URLSearchParams(location.search)
const paksa = params.get('kualitas')

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  || (navigator.maxTouchPoints > 1 && window.matchMedia('(pointer: coarse)').matches)

const rendah = paksa ? paksa === 'rendah' : isMobile

export const quality = {
  isMobile,
  level: rendah ? 'rendah' : 'tinggi',
  maxPixelRatio: rendah ? 1.5 : 2,
  terrainSegments: rendah ? 220 : 352,
  antialias: !rendah || window.devicePixelRatio < 2,
}
