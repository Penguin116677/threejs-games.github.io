import * as THREE from 'three'
import { ISLAND } from './island.js'
import { WORLD, worldHeight } from './world.js'
import { meadowAmount } from './biome.js'
import { SHORE_GLSL, waveTime } from './shore.js'

// ---------------------------------------------------------------------------
// Data tanah: grid tinggi yang SAMA dengan mesh yang digambar.
// ground.heightAt(x, z) mengembalikan tinggi permukaan mesh yang sebenarnya
// (interpolasi segitiga persis seperti PlaneGeometry), sehingga pohon, batu,
// rumput, dan nanti karakter (Milestone 2) berdiri tepat di atas tanah —
// tidak melayang atau tenggelam seperti bila memakai fungsi noise langsung.
// ---------------------------------------------------------------------------
// heightFn / rect: bentuk tanah & area grid. Bawaan = seluruh dunia; penebaran pohon pulau tengah
// memakai grid khusus pulau tengah (heightFn = bentuk Pulau Tropis saja, area lama 1000 m) supaya
// pohon dan batunya tetap sama persis seperti sebelum Kepulauan Kencana ditambahkan.
export function createGround(segments, { heightFn = worldHeight, rect = WORLD } = {}) {
  // langkah grid sama seperti sebelum dunia diperluas (ISLAND.size / segments), dibentangkan
  // ke seluruh area — titik grid pulau tengah tidak bergeser
  const step = ISLAND.size / segments
  const nx = Math.round((rect.maxX - rect.minX) / step)
  const nz = Math.round((rect.maxZ - rect.minZ) / step)
  const cols = nx + 1
  const x0 = rect.minX
  const z0 = rect.minZ
  const heights = new Float32Array(cols * (nz + 1))
  for (let j = 0; j <= nz; j++)
    for (let i = 0; i <= nx; i++)
      heights[j * cols + i] = heightFn(x0 + i * step, z0 + j * step)

  function groundHeight(x, z) {
    const fx = (x - x0) / step
    const fz = (z - z0) / step
    if (fx < 0 || fz < 0 || fx >= nx || fz >= nz) return heightFn(x, z)
    const ix = Math.floor(fx)
    const iz = Math.floor(fz)
    const u = fx - ix
    const v = fz - iz
    const a = heights[iz * cols + ix]
    const b = heights[(iz + 1) * cols + ix]
    const c = heights[(iz + 1) * cols + ix + 1]
    const d = heights[iz * cols + ix + 1]
    if (u + v <= 1) return a + (d - a) * u + (b - a) * v
    return c + (b - c) * (1 - u) + (d - c) * (1 - v)
  }

  // kemiringan (naik per meter datar)
  function slopeAt(x, z) {
    const h = groundHeight(x, z)
    return Math.hypot(groundHeight(x + 1, z) - h, groundHeight(x, z + 1) - h)
  }

  // Permukaan pijakan = tanah + bangunan yang bisa diinjak (lantai jembatan, dermaga, batur/lantai
  // tinggi, tangga). heightAt tetap tinggi mesh tanah saja (untuk ombak, laut, rumput, penebaran).
  const SURF_CELL = 16
  const surfCells = new Map()
  const surfKey = (i, j) => (i + 32768) * 65536 + (j + 32768)
  let surfaces = []

  // tinggi lantai `s` di titik (x, z), atau −Infinity bila (x, z) di luar lantai itu
  function surfaceHeight(s, x, z) {
    const dx = x - s.x
    const dz = z - s.z
    const lx = dx * s.cos - dz * s.sin
    const lz = dx * s.sin + dz * s.cos
    if (Math.abs(lx) > s.hx || Math.abs(lz) > s.hz) return -Infinity
    const t = (lz + s.hz) / (2 * s.hz) // 0..1 sepanjang sumbu lokal z
    return s.y0 + (s.y1 - s.y0) * t + (s.arch ? s.arch * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - s.a0) / (s.a1 - s.a0)))) : 0)
  }

  function surfaceAt(x, z) {
    const h = groundHeight(x, z)
    if (!surfaces.length) return h
    const list = surfCells.get(surfKey(Math.floor(x / SURF_CELL), Math.floor(z / SURF_CELL)))
    if (!list) return h
    let top = h
    for (const s of list) {
      const y = surfaceHeight(s, x, z)
      if (y > top) top = y
    }
    return top
  }

  // Pijakan untuk kaki setinggi footY: tanah, atau lantai yang paling tinggi `step` m di atas kaki.
  // Lantai yang lebih tinggi dari itu (dek dermaga dilihat dari air, batur dari samping) bukan
  // pijakan, melainkan tepi yang harus dipanjat (forEachSurfaceNear untuk tabrakannya).
  function supportAt(x, z, footY, step) {
    const h = groundHeight(x, z)
    if (!surfaces.length) return h
    const list = surfCells.get(surfKey(Math.floor(x / SURF_CELL), Math.floor(z / SURF_CELL)))
    if (!list) return h
    let top = h
    for (const s of list) {
      const y = surfaceHeight(s, x, z)
      if (y > top && y <= footY + step) top = y
    }
    return top
  }
  // lantai terendah yang lebih tinggi dari y di (x, z) — "langit-langit" (mis. lempeng pintu
  // rahasia di atas tangga, lantai aula di atas lorong); Infinity bila tidak ada
  function ceilingAt(x, z, y) {
    if (!surfaces.length) return Infinity
    const list = surfCells.get(surfKey(Math.floor(x / SURF_CELL), Math.floor(z / SURF_CELL)))
    if (!list) return Infinity
    let low = Infinity
    for (const s of list) {
      const h = surfaceHeight(s, x, z)
      if (h > y && h < low) low = h
    }
    return low
  }
  // fn(lantai) sekali untuk tiap lantai yang kotak batasnya mungkin menyentuh lingkaran (x, z, r)
  let surfStamp = 0
  function forEachSurfaceNear(x, z, r, fn) {
    if (!surfaces.length) return
    surfStamp++
    for (let i = Math.floor((x - r) / SURF_CELL); i <= Math.floor((x + r) / SURF_CELL); i++)
      for (let j = Math.floor((z - r) / SURF_CELL); j <= Math.floor((z + r) / SURF_CELL); j++) {
        const list = surfCells.get(surfKey(i, j))
        if (!list) continue
        for (const s of list) {
          if (s.seen === surfStamp) continue
          s.seen = surfStamp
          fn(s)
        }
      }
  }

  // list: [{ x, z, hx, hz, rot, y0, y1, arch?, a0?, a1? }] — persegi panjang (setengah lebar hx/hz,
  // diputar rot radian seperti rotation.y), tinggi naik linear y0 → y1 sepanjang sumbu lokal z,
  // ditambah lengkung sin setinggi `arch` di antara t = a0..a1 (lantai jembatan)
  function setSurfaces(list) {
    surfaces = list.map(s => ({ a0: 0, a1: 1, arch: 0, ...s, cos: Math.cos(s.rot || 0), sin: Math.sin(s.rot || 0) }))
    surfCells.clear()
    for (const s of surfaces) {
      const r = Math.hypot(s.hx, s.hz)
      for (let i = Math.floor((s.x - r) / SURF_CELL); i <= Math.floor((s.x + r) / SURF_CELL); i++)
        for (let j = Math.floor((s.z - r) / SURF_CELL); j <= Math.floor((s.z + r) / SURF_CELL); j++) {
          const k = surfKey(i, j)
          if (!surfCells.has(k)) surfCells.set(k, [])
          surfCells.get(k).push(s)
        }
    }
  }

  return {
    step, nx, nz, cols, x0, z0, heights,
    heightAt: groundHeight, slopeAt, surfaceAt, supportAt, ceilingAt, forEachSurfaceNear, setSurfaces,
    get surfaces() {
      return surfaces
    },
    surfaceHeight,
  }
}

// ---------------------------------------------------------------------------
// Shader tanah: warna dihitung per piksel (bukan per vertex) dari tinggi,
// kemiringan, dan tekstur noise → batas pasir/rumput/batu tajam dan bertekstur.
// Dibangun di atas MeshLambertMaterial agar tetap dapat cahaya, kabut, dan bayangan.
// ---------------------------------------------------------------------------
const vertexPars = /* glsl */`
attribute vec2 aSurface; // x = oklusi (gelap di bawah pohon), y = padang rumput
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;
`

const fragmentPars = /* glsl */`
uniform sampler2D uNoise;
uniform float uBeachTop;
uniform float uWaveTime;
${SHORE_GLSL}
varying vec3 vWorldPos;
varying vec3 vWorldNrm;
varying vec2 vSurface;

const vec3 DEEP_SAND = vec3(0.47, 0.37, 0.22);
const vec3 WET_SAND = vec3(0.62, 0.50, 0.30);
const vec3 SAND = vec3(0.83, 0.72, 0.47);
const vec3 GRASS = vec3(0.24, 0.47, 0.12);
const vec3 GRASS_DARK = vec3(0.11, 0.30, 0.08);
const vec3 MEADOW = vec3(0.32, 0.52, 0.12);
const vec3 DRY = vec3(0.60, 0.58, 0.26);
const vec3 ROCK = vec3(0.42, 0.39, 0.35);
const vec3 ROCK_DARK = vec3(0.26, 0.24, 0.22);

#if defined(REGION_MASK) || defined(REGION_MASK2)
// Masker wilayah (Kepulauan Kencana, Aeloria): r = jalan tanah, g = sawah / ladang, b = lantai batu,
// a = rumput halus. uRegionRect = x0, z0, 1/lebar, 1/panjang
#ifdef REGION_MASK
uniform sampler2D uRegion;
uniform vec4 uRegionRect;
#endif
#ifdef REGION_MASK2
uniform sampler2D uRegion2;
uniform vec4 uRegionRect2;
#endif
const vec3 ROAD = vec3(0.60, 0.49, 0.33);
const vec3 PAVE = vec3(0.60, 0.56, 0.50);
const vec3 PAVE_ELF = vec3(0.67, 0.65, 0.59);
const vec3 LAWN = vec3(0.27, 0.52, 0.12);
const vec3 RICE = vec3(0.36, 0.62, 0.09);
const vec3 RICE_RIPE = vec3(0.74, 0.62, 0.20);
const vec3 PADDY_WATER = vec3(0.30, 0.42, 0.40);
const vec3 DIKE = vec3(0.40, 0.42, 0.20);
const vec3 WHEAT = vec3(0.47, 0.60, 0.16);
const vec3 WHEAT_RIPE = vec3(0.86, 0.70, 0.30);
const vec3 SOIL = vec3(0.45, 0.33, 0.20);
const vec3 GREENS = vec3(0.22, 0.48, 0.14);

// 1 di garis kisi (tiap cell m, tebal w m), memudar halus saat garis lebih rapat dari piksel
float gridLine(vec2 p, vec2 cell, float w) {
  vec2 q = p / cell;
  vec2 d = abs(fract(q + 0.5) - 0.5) * cell; // jarak ke garis terdekat (m)
  vec2 aa = fwidth(p) + 1e-4;
  vec2 l = 1.0 - smoothstep(vec2(w) - aa, vec2(w) + aa, d);
  float fade = 1.0 - smoothstep(0.2, 0.6, max(aa.x, aa.y) / w);
  return max(l.x, l.y) * fade;
}

// style 0 = Kencana (sawah, lantai batu andesit), 1 = Aeloria (ladang gandum & sayur, batu putih)
vec3 regionColor(vec3 col, vec2 p, float nF, float nM, float nD, sampler2D region, vec4 rect, int style) {
  vec2 ruv = (p - rect.xy) * rect.zw;
  if (ruv.x <= 0.0 || ruv.x >= 1.0 || ruv.y <= 0.0 || ruv.y >= 1.0) return col;
  vec4 m = texture2D(region, ruv);
  // rumput halus (alun-alun, halaman): hijau rata dengan jalur bekas pangkasan
  float stripe = 0.94 + 0.06 * step(0.5, fract(p.x * 0.125));
  col = mix(col, LAWN * stripe * (0.9 + 0.2 * nF), m.a);
  // ladang Aeloria: petak 14×10 m — gandum (hijau → keemasan) atau barisan sayur di tanah gembur
  if (style == 1 && m.g > 0.01) {
    vec2 plot = floor(p / vec2(14.0, 10.0));
    float kind = texture2D(uNoise, (plot + 0.5) * 0.173).g;
    float rows = 0.5 + 0.5 * sin(p.x * 9.0 + p.y * 0.2);
    rows = mix(0.5, rows, 1.0 - smoothstep(0.03, 0.09, fwidth(p.x)));
    vec3 wheat = mix(WHEAT, WHEAT_RIPE, smoothstep(0.35, 0.6, kind)) * (0.85 + 0.25 * rows) * (0.9 + 0.2 * nF);
    vec3 veg = mix(SOIL * (0.85 + 0.2 * nD), GREENS * (0.9 + 0.25 * nF), smoothstep(0.35, 0.65, rows));
    vec3 field = kind > 0.72 ? veg : wheat;
    field = mix(field, SOIL * (0.8 + 0.3 * nD), gridLine(p, vec2(14.0, 10.0), 0.45));
    col = mix(col, field, m.g);
  }
  // sawah: petak 12×8 m dibatasi pematang, tiap petak beda umur padinya
  if (style == 0 && m.g > 0.01) {
    vec2 plot = floor(p / vec2(12.0, 8.0));
    float age = texture2D(uNoise, (plot + 0.5) * 0.173).g;
    float rows = 0.5 + 0.5 * sin(p.y * 20.9 + p.x * 0.3);
    rows = mix(0.5, rows, 1.0 - smoothstep(0.02, 0.06, fwidth(p.y)));
    vec3 rice = mix(RICE, RICE_RIPE, smoothstep(0.62, 0.78, age));
    float water = (1.0 - smoothstep(0.2, 0.5, age)) * (0.55 + 0.45 * rows);
    vec3 paddy = mix(rice * (0.82 + 0.3 * rows), PADDY_WATER, water * 0.6) * (0.9 + 0.2 * nF);
    paddy = mix(paddy, DIKE * (0.85 + 0.3 * nD), gridLine(p, vec2(12.0, 8.0), 0.35));
    col = mix(col, paddy, m.g);
  }
  // jalan tanah: coklat muda, sedikit belang
  col = mix(col, ROAD * (0.86 + 0.22 * nM) * (0.9 + 0.2 * nD), m.r);
  // lantai batu: ubin 1,2 m bernat gelap, warna tiap ubin sedikit beda
  if (m.b > 0.01) {
    vec2 tile = floor(p / 1.2);
    float tv = texture2D(uNoise, (tile + 0.5) * 0.37).r;
    vec3 pave = (style == 1 ? PAVE_ELF : PAVE) * (0.82 + 0.3 * tv) * (0.94 + 0.12 * nD);
    pave *= 1.0 - 0.35 * gridLine(p, vec2(1.2), 0.04);
    col = mix(col, pave, m.b);
  }
  return col;
}
#endif


#ifdef FROST_REGION
// Kerajaan Frostfall (timur): seluruh daratannya bersalju. Masker uFrost: r = jalan / jejak di
// salju, g = es (sungai & danau beku), b = lantai batu (halaman kastel, alun-alun desa), a = gua.
// uFrostRect = x0, z0, 1/lebar, 1/panjang; uCold = x mulai dingin, x penuh dingin
uniform sampler2D uFrost;
uniform vec4 uFrostRect;
uniform vec2 uCold;
const vec3 SNOW = vec3(0.90, 0.93, 0.98);
const vec3 SNOW_SHADE = vec3(0.70, 0.78, 0.92);
const vec3 GRANITE = vec3(0.42, 0.40, 0.39);
const vec3 GRANITE_DARK = vec3(0.21, 0.20, 0.21);
const vec3 GRAVEL = vec3(0.42, 0.41, 0.40);
const vec3 TRODDEN = vec3(0.66, 0.67, 0.70);
const vec3 MUD = vec3(0.40, 0.35, 0.30);
const vec3 ICE = vec3(0.62, 0.80, 0.90);
const vec3 ICE_DEEP = vec3(0.16, 0.36, 0.55);
const vec3 COBBLE = vec3(0.50, 0.51, 0.55);
const vec3 CAVE_ROCK = vec3(0.22, 0.27, 0.36);
const vec3 CAVE_FROST = vec3(0.58, 0.71, 0.85);
float gFrostGlow = 0.0;

vec3 frostColor(vec3 col, vec2 p, float h, float slope, float nF, float nM, float nL, float nD) {
  float cold = smoothstep(uCold.x, uCold.y, p.x);
  if (cold <= 0.0) return col;
  float aa = fwidth(p.x);
  // salju: bercak putih / kebiruan, riak tiupan angin, kilau butiran salju dari dekat
  float rip = sin(dot(p, vec2(0.83, 0.56)) * 2.4 + nM * 9.0) * (1.0 - smoothstep(0.08, 0.3, aa * 2.4));
  vec3 snow = mix(SNOW_SHADE, SNOW, smoothstep(0.15, 0.75, nL + (nM - 0.5) * 0.6));
  snow *= (0.95 + 0.06 * nF) * (0.975 + 0.035 * rip) * (0.97 + 0.05 * nD);
  // kilau: butir-butir kecil (bukan kanal .a yang berpola urat seperti kaustik)
  float spark = smoothstep(0.93, 0.985, texture2D(uNoise, p * 1.7).r) * (1.0 - smoothstep(0.02, 0.08, aa));
  // batu granit: lereng curam (tebing), salju menempel di lekuknya
  // batu granit berlapis (pita mendatar), sedikit salju menempel di tonjolannya
  vec3 rock = mix(GRANITE, GRANITE_DARK, smoothstep(0.25, 0.8, nM)) * (0.8 + 0.35 * nF) * (0.9 + 0.2 * nD);
  rock *= 0.88 + 0.12 * sin(h * 1.3 + nM * 7.0);
  rock = mix(rock, snow * 0.9, smoothstep(0.78, 0.92, nF) * 0.4);
  float rocky = smoothstep(0.4, 0.52, slope + (nM - 0.5) * 0.16);
  // pantai: kerikil gelap, di bawah air lebih gelap
  float beach = 1.0 - smoothstep(1.2, 2.6, h + (nM - 0.5) * 1.2);
  vec3 gravel = GRAVEL * (0.75 + 0.35 * nF) * (0.85 + 0.25 * nD) * mix(0.55, 1.0, smoothstep(-6.0, 0.0, h));
  vec3 c = mix(snow, gravel, beach);
  c = mix(c, rock, rocky);
  float glow = spark * 0.22 * (1.0 - rocky) * (1.0 - beach);
  vec2 ruv = (p - uFrostRect.xy) * uFrostRect.zw;
  if (ruv.x > 0.0 && ruv.x < 1.0 && ruv.y > 0.0 && ruv.y < 1.0) {
    vec4 m = texture2D(uFrost, ruv);
    // gua: batu kebiruan, embun beku di bidang datar
    vec3 cave = mix(CAVE_ROCK * (0.75 + 0.4 * nF), CAVE_FROST * (0.85 + 0.2 * nD), (1.0 - smoothstep(0.15, 0.4, slope)) * smoothstep(0.35, 0.7, nM));
    c = mix(c, cave, m.a);
    glow *= 1.0 - m.a;
    // jalan: salju terinjak, di tengahnya tanah becek & kerikil
    float rut = smoothstep(0.55, 0.85, m.r) * smoothstep(0.35, 0.65, nF + (nD - 0.5) * 0.4);
    vec3 path = mix(TRODDEN * (0.86 + 0.2 * nF), MUD * (0.85 + 0.3 * nD), rut * 0.6);
    c = mix(c, path, smoothstep(0.1, 0.6, m.r) * (1.0 - rocky * 0.7));
    glow *= 1.0 - m.r;
    // lantai batu: ubin bulat 1,1 m, salju di nat
    if (m.b > 0.01) {
      vec2 tile = floor(p / 1.1);
      float tv = texture2D(uNoise, (tile + 0.5) * 0.37).r;
      vec3 pave = COBBLE * (0.8 + 0.32 * tv) * (0.93 + 0.12 * nD);
      vec2 q = abs(fract(p / 1.1) - 0.5);
      float joint = smoothstep(0.38, 0.46, max(q.x, q.y)) * (1.0 - smoothstep(0.1, 0.3, aa / 1.1));
      pave = mix(pave, SNOW * 0.9, joint * 0.4);
      c = mix(c, pave, smoothstep(0.1, 0.6, m.b));
      glow *= 1.0 - m.b;
    }
    // es: biru jernih bergradasi, retakan putih, salju tipis di tepi; danau di gua bercahaya
    if (m.g > 0.01) {
      float crack = texture2D(uNoise, p * 0.11).g;
      float lines = 1.0 - smoothstep(0.0, 0.035, abs(crack - 0.5)) ;
      lines = max(lines, 1.0 - smoothstep(0.0, 0.03, abs(texture2D(uNoise, p * 0.29 + 0.4).b - 0.5)));
      lines *= 1.0 - smoothstep(0.05, 0.2, aa);
      vec3 ice = mix(ICE_DEEP, ICE, smoothstep(0.2, 0.85, nM + nF * 0.3));
      ice = mix(ice, vec3(0.92, 0.97, 1.0), lines * 0.55);
      float drift = smoothstep(0.62, 0.85, nL + (1.0 - m.g) * 0.6) * (1.0 - m.a);
      ice = mix(ice, snow, drift);
      float gi = smoothstep(0.25, 0.65, m.g);
      c = mix(c, ice, gi);
      glow = mix(glow, (0.25 + 0.45 * lines) * m.a, gi);
    }
  }
  gFrostGlow = glow * cold;
  return mix(col, c, cold);
}
#endif

vec3 terrainColor() {
  vec2 p = vWorldPos.xz;
  float h = vWorldPos.y;
  float slope = 1.0 - clamp(normalize(vWorldNrm).y, 0.0, 1.0);
  float nF = texture2D(uNoise, p * 0.055).r;     // butiran ±0.5 m
  float nM = texture2D(uNoise, p * 0.0173).g;    // variasi ±10 m
  float nL = texture2D(uNoise, p * 0.0037).b;    // bercak besar ±60 m
  float nD = texture2D(uNoise, p * 0.37).r;      // detail halus ±8 cm (tajam dari kamera atas)

  // pasir: basah di tepi air, kering di atasnya, lebih gelap di dasar laut
  vec3 sand = mix(WET_SAND, SAND, smoothstep(-0.2, 1.0, h + (nM - 0.5) * 0.8));
  sand = mix(DEEP_SAND, sand, smoothstep(-6.0, -0.3, h));
  sand *= (0.9 + 0.2 * nF) * (0.92 + 0.16 * nD);
#ifdef WAVE_WET_SAND
  // pasir yang baru dijilat ombak tetap gelap (basah) sebentar setelah air surut
  if (h > -0.4 && h < 1.0) {
    vec2 loc = waveLocal(uNoise, p, uWaveTime);
    float top = max(swashLevel(loc, uWaveTime),
      max(swashLevel(loc, uWaveTime - 1.3) * 0.9, swashLevel(loc, uWaveTime - 2.8) * 0.75));
    sand *= mix(1.0, 0.66, 1.0 - smoothstep(top - 0.03, top + 0.05, h));
  }
#endif

  // rumput/hutan: bercak terang-gelap, lebih kekuningan di padang sekitar gunung
  vec3 grass = mix(GRASS, GRASS_DARK, smoothstep(0.3, 0.75, nL + (nM - 0.5) * 0.4));
  grass = mix(grass, MEADOW, vSurface.y * 0.7);
  grass = mix(grass, DRY, vSurface.y * smoothstep(0.55, 0.85, nM) * 0.45);
  grass *= (0.86 + 0.28 * nF) * (0.88 + 0.24 * nD);

  // batu: lereng curam dan dekat puncak
  vec3 rock = mix(ROCK, ROCK_DARK, smoothstep(0.3, 0.8, nM));
  rock *= (0.8 + 0.4 * nF) * (0.9 + 0.2 * nD);

  float edge = uBeachTop + (nM - 0.5) * 1.6;
  vec3 col = mix(sand, grass, smoothstep(edge - 0.3, edge + 0.3, h));
  float rocky = max(
    smoothstep(0.32, 0.42, slope + (nM - 0.5) * 0.12),
    smoothstep(70.0, 80.0, h + (nL - 0.5) * 14.0)
  );
  rocky *= smoothstep(uBeachTop, uBeachTop + 1.5, h);
  col = mix(col, rock, rocky);
#ifdef REGION_MASK
  col = regionColor(col, p, nF, nM, nD, uRegion, uRegionRect, REGION_STYLE);
#endif
#ifdef REGION_MASK2
  col = regionColor(col, p, nF, nM, nD, uRegion2, uRegionRect2, REGION2_STYLE);
#endif
#ifdef FROST_REGION
  col = frostColor(col, p, h, slope, nF, nM, nL, nD);
#endif

  return col * vSurface.x;
}
`

const CHUNK = 64 // sel per sisi potongan terrain (potongan di luar layar tidak digambar)
const DEEP_SKIP = -12 // potongan yang seluruhnya lebih dalam dari ini tidak dibuat (lihat dasar laut)
const FLOOR_Y = -18.4

// Normal per titik grid: jumlah normal segitiga di sekelilingnya — sama dengan
// computeVertexNormals pada PlaneGeometry (pembagian segitiga a-b-d / b-c-d), tapi dihitung
// untuk seluruh grid sekaligus, jadi tepi antarpotongan menyambung tanpa jahitan cahaya.
function gridNormals(ground) {
  const { nx, nz, cols, heights: h, step } = ground
  const nor = new Float32Array(cols * (nz + 1) * 3)
  const add = (k, x, y, z) => {
    nor[k * 3] += x
    nor[k * 3 + 1] += y
    nor[k * 3 + 2] += z
  }
  const s2 = step * step
  for (let j = 0; j < nz; j++)
    for (let i = 0; i < nx; i++) {
      const a = j * cols + i
      const b = a + cols
      const c = b + 1
      const d = a + 1
      // segitiga (a, b, d) lalu (b, c, d)
      const x1 = step * (h[a] - h[d])
      const z1 = step * (h[a] - h[b])
      add(a, x1, s2, z1)
      add(b, x1, s2, z1)
      add(d, x1, s2, z1)
      const x2 = step * (h[b] - h[c])
      const z2 = step * (h[d] - h[c])
      add(b, x2, s2, z2)
      add(c, x2, s2, z2)
      add(d, x2, s2, z2)
    }
  for (let k = 0; k < nor.length; k += 3) {
    const l = Math.hypot(nor[k], nor[k + 1], nor[k + 2]) || 1
    nor[k] /= l
    nor[k + 1] /= l
    nor[k + 2] /= l
  }
  return nor
}

// regions (opsional, maks. 2): masker jalan/sawah/lantai batu/rumput halus Kepulauan Kencana &
// Aeloria { texture, x0, z0, width, depth, style } — lihat kencana/mask.js
// frost (opsional): masker Kerajaan Frostfall { texture, x0, z0, width, depth, cold: [x0, x1] } — lihat
// frostfall/mask.js
export function createTerrain(ground, { noiseTexture, quality, regions = [], frost = null }) {
  const { nx, nz, cols, heights, x0, z0, step } = ground
  const normals = gridNormals(ground)

  // aSurface: oklusi (diisi pohon nanti) + seberapa padang rumput
  const surface = new Float32Array(cols * (nz + 1) * 2)
  for (let j = 0; j <= nz; j++)
    for (let i = 0; i <= nx; i++) {
      const k = j * cols + i
      surface[k * 2] = 1
      surface[k * 2 + 1] = meadowAmount(x0 + i * step, z0 + j * step, heights[k])
    }

  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  mat.defines = {}
  if (quality.water.wetSand) mat.defines.WAVE_WET_SAND = ''
  const [region, region2] = regions
  if (region) {
    mat.defines.REGION_MASK = ''
    mat.defines.REGION_STYLE = region.style ?? 0
  }
  if (region2) {
    mat.defines.REGION_MASK2 = ''
    mat.defines.REGION2_STYLE = region2.style ?? 0
  }
  if (frost) mat.defines.FROST_REGION = ''
  mat.onBeforeCompile = shader => {
    shader.uniforms.uNoise = { value: noiseTexture }
    shader.uniforms.uBeachTop = { value: ISLAND.beachTop }
    shader.uniforms.uWaveTime = waveTime
    if (region) {
      shader.uniforms.uRegion = { value: region.texture }
      shader.uniforms.uRegionRect = { value: new THREE.Vector4(region.x0, region.z0, 1 / region.width, 1 / region.depth) }
    }
    if (region2) {
      shader.uniforms.uRegion2 = { value: region2.texture }
      shader.uniforms.uRegionRect2 = { value: new THREE.Vector4(region2.x0, region2.z0, 1 / region2.width, 1 / region2.depth) }
    }
    if (frost) {
      shader.uniforms.uFrost = { value: frost.texture }
      shader.uniforms.uFrostRect = { value: new THREE.Vector4(frost.x0, frost.z0, 1 / frost.width, 1 / frost.depth) }
      shader.uniforms.uCold = { value: new THREE.Vector2(frost.cold[0], frost.cold[1]) }
    }
    shader.vertexShader = vertexPars + shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
      vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
      vWorldNrm = normalize(mat3(modelMatrix) * objectNormal);
      vSurface = aSurface;`
    )
    shader.fragmentShader = fragmentPars + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      diffuseColor.rgb *= terrainColor();`
    ).replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      #ifdef FROST_REGION
      // kilau butiran salju & danau es di gua yang bercahaya biru
      totalEmissiveRadiance += vec3(0.55, 0.82, 1.0) * gFrostGlow;
      #endif`
    )
  }

  const group = new THREE.Group()
  group.name = 'terrain'
  const chunks = []
  for (let j0 = 0; j0 < nz; j0 += CHUNK)
    for (let i0 = 0; i0 < nx; i0 += CHUNK) {
      const i1 = Math.min(nx, i0 + CHUNK)
      const j1 = Math.min(nz, j0 + CHUNK)
      const w = i1 - i0 + 1
      const d = j1 - j0 + 1
      let top = -Infinity
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) top = Math.max(top, heights[j * cols + i])
      if (top < DEEP_SKIP) continue // laut dalam: cukup dasar laut datar di bawah

      const pos = new Float32Array(w * d * 3)
      const nor = new Float32Array(w * d * 3)
      const map = new Int32Array(w * d) // indeks titik global (untuk menyalin aSurface)
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) {
          const v = (j - j0) * w + (i - i0)
          const k = j * cols + i
          pos[v * 3] = x0 + i * step
          pos[v * 3 + 1] = heights[k]
          pos[v * 3 + 2] = z0 + j * step
          nor.set(normals.subarray(k * 3, k * 3 + 3), v * 3)
          map[v] = k
        }
      const index = []
      for (let j = 0; j < d - 1; j++)
        for (let i = 0; i < w - 1; i++) {
          const a = j * w + i
          const b = a + w
          index.push(a, b, a + 1, b, b + 1, a + 1)
        }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3))
      const surf = new THREE.BufferAttribute(new Float32Array(w * d * 2), 2)
      geo.setAttribute('aSurface', surf)
      geo.setIndex(index)
      geo.computeBoundingSphere()
      const mesh = new THREE.Mesh(geo, mat)
      mesh.name = `terrain-${i0 / CHUNK}-${j0 / CHUNK}`
      mesh.receiveShadow = quality.shadows
      group.add(mesh)
      chunks.push({ surf, map })
    }

  // dasar laut datar di bawah potongan yang dilewati (terlihat samar menembus laut dalam)
  const floorGeo = new THREE.PlaneGeometry(WORLD.width, WORLD.depth).rotateX(-Math.PI / 2)
  floorGeo.translate(WORLD.minX + WORLD.width / 2, FLOOR_Y, WORLD.minZ + WORLD.depth / 2)
  floorGeo.deleteAttribute('uv')
  floorGeo.setAttribute('aSurface', new THREE.BufferAttribute(new Float32Array([1, 0, 1, 0, 1, 0, 1, 0]), 2))
  const floor = new THREE.Mesh(floorGeo, mat)
  floor.name = 'dasar-laut'
  group.add(floor)

  function refresh() {
    for (const c of chunks) {
      const a = c.surf.array
      for (let v = 0; v < c.map.length; v++) {
        a[v * 2] = surface[c.map[v] * 2]
        a[v * 2 + 1] = surface[c.map[v] * 2 + 1]
      }
      c.surf.needsUpdate = true
    }
  }
  refresh()

  // Gelapkan tanah di bawah pohon/batu/bangunan (oklusi palsu yang murah).
  // items: [{ x, z, radius, strength }]
  group.userData.applyOcclusion = items => {
    for (const it of items) {
      const r = it.radius
      const i0 = Math.max(0, Math.floor((it.x - r - x0) / step))
      const i1 = Math.min(nx, Math.ceil((it.x + r - x0) / step))
      const j0 = Math.max(0, Math.floor((it.z - r - z0) / step))
      const j1 = Math.min(nz, Math.ceil((it.z + r - z0) / step))
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) {
          const dx = x0 + i * step - it.x
          const dz = z0 + j * step - it.z
          const t = 1 - (dx * dx + dz * dz) / (r * r)
          if (t <= 0) continue
          const k = (j * cols + i) * 2
          surface[k] = Math.max(0.5, surface[k] * (1 - it.strength * t * t))
        }
    }
    refresh()
  }
  group.userData.chunks = group.children.length - 1
  group.userData.material = mat
  return group
}
