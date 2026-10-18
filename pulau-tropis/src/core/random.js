// Generator acak deterministik (mulberry32): seed sama → urutan sama,
// jadi posisi pohon, batu, dan rumput selalu sama setiap kali game dibuka.
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

// seed dari dua bilangan bulat (mis. koordinat chunk)
export const seed2 = (x, y) => (Math.imul(x | 0, 73856093) ^ Math.imul(y | 0, 19349663)) >>> 0
