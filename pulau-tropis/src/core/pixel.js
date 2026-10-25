import * as THREE from 'three'

// Gambar pixel art HD. Dunia 3D digambar ke target beresolusi rendah (±2 px CSS per "piksel seni"),
// lalu dua tahap pasca-proses:
// 1. per piksel seni: tone mapping ACES + sRGB, sorot terang di sudut cembung (atap, sudut bangunan,
//    punggung bukit), warna 15-bit (32 tingkat per kanal, seperti konsol 16-bit) dengan dithering Bayer
//    4×4 supaya gradasi langit & air pecah menjadi pola piksel, dan tanda sisi mana yang berbatasan
//    dengan sesuatu yang jauh lebih jauh (dari kedalaman: tepi benda yang di depan);
// 2. per piksel kanvas (kanvas seukuran layar, atau lebih kecil bila tebal garis tepi mengizinkan — lihat
//    setSize): tiap piksel seni diperbesar menjadi k × k piksel layar (k BULAT: semua piksel seni sama
//    besar dan tajam), garis tepi gelap TIPIS (±0,4 piksel seni, paling tipis 1 px layar) di sisi yang
//    ditandai.
// Kanal alfa target dunia = penanda garis tepi (1 = boleh bergaris tepi, 0 = tidak, mis. helai rumput).

// tebal garis tepi (bagian dari satu piksel seni); v0.15.0 memakai satu piksel seni penuh
const LINE = 0.4

// Pencahayaan bergaya pixel art untuk SEMUA MeshLambertMaterial (tanah, pohon, rumput, bangunan,
// karakter): cahaya matahari langsung dibulatkan ke 4 tingkat (gelap, redup, terang, penuh) seperti
// bayangan yang digambar tangan, bukan gradasi halus. Dipasang sekali sebelum shader pertama dibuat.
let shadingInstalled = false
export function installPixelShading() {
  if (shadingInstalled) return
  shadingInstalled = true
  const chunk = THREE.ShaderChunk.lights_lambert_pars_fragment
  const from = 'float dotNL = saturate( dot( geometryNormal, directLight.direction ) );'
  if (!chunk.includes(from)) return // versi three berbeda: tetap jalan dengan cahaya halus
  THREE.ShaderChunk.lights_lambert_pars_fragment = chunk.replace(from, `float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	dotNL = dotNL < 0.05 ? 0.0 : ( dotNL < 0.3 ? 0.42 : ( dotNL < 0.62 ? 0.78 : 1.0 ) );`)
  // bayangan matahari bertepi tegas: hasil PCF (yang meratakan tangga piksel peta bayangan)
  // dibulatkan ke gelap / terang
  const begin = THREE.ShaderChunk.lights_fragment_begin
  const shadowCall = 'getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] )'
  if (begin.includes(shadowCall))
    THREE.ShaderChunk.lights_fragment_begin = begin.replace(shadowCall, `step( 0.5, ${shadowCall} )`)
}

const vertexShader = /* glsl */`
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

// ambang Bayer 4×4 (0..1): 0 8 2 10 / 12 4 14 6 / 3 11 1 9 / 15 7 13 5, dari dua Bayer 2×2
const BAYER = /* glsl */`
float bayer2(vec2 a) { return mod(a.x * 2.0 + a.y * 3.0, 4.0); }
float bayer4(vec2 p) {
  vec2 q = mod(floor(p), 4.0);
  return (4.0 * bayer2(mod(q, 2.0)) + bayer2(floor(q * 0.5)) + 0.5) / 16.0;
}
`

// Tahap 1, per piksel seni (ke artTarget): warna akhir piksel seni (tone mapping, sorot, warna 15-bit +
// dithering) di RGB, dan di alfa: sisi mana (kiri, kanan, bawah, atas) yang berbatasan dengan sesuatu
// yang jauh lebih jauh — di sisi itu tahap 2 menggambar garis tepi
const artShader = /* glsl */`
#include <packing>
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uTexel;
uniform float uNear;
uniform float uFar;
uniform float uExposure;
uniform float uHighlight;
uniform float uLevels;
uniform float uDither;
uniform float uSaturation;

float viewZ(vec2 uv) {
  return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar);
}

// ACES filmic (sama dengan three.js ACESFilmicToneMapping)
vec3 RRTAndODTFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}
vec3 aces(vec3 color) {
  const mat3 ACESInputMat = mat3(
    vec3(0.59719, 0.07600, 0.02840),
    vec3(0.35458, 0.90834, 0.13383),
    vec3(0.04823, 0.01566, 0.83777)
  );
  const mat3 ACESOutputMat = mat3(
    vec3(1.60475, -0.10208, -0.00327),
    vec3(-0.53108, 1.10813, -0.07276),
    vec3(-0.07367, -0.00605, 1.07602)
  );
  color *= uExposure / 0.6;
  color = ACESInputMat * color;
  color = RRTAndODTFit(color);
  color = ACESOutputMat * color;
  return clamp(color, 0.0, 1.0);
}
vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, pow(c, vec3(0.41666)) * 1.055 - 0.055, step(0.0031308, c));
}
${BAYER}
void main() {
  vec2 uv = gl_FragCoord.xy * uTexel;
  vec4 src = texture2D(tColor, uv);
  float d = viewZ(uv);
  float dl = viewZ(uv - vec2(uTexel.x, 0.0));
  float dr = viewZ(uv + vec2(uTexel.x, 0.0));
  float du = viewZ(uv + vec2(0.0, uTexel.y));
  float dd = viewZ(uv - vec2(0.0, uTexel.y));
  // tetangga jauh lebih jauh → piksel ini tepi benda yang di depan (kanal alfa scene = boleh bergaris
  // tepi; langit tidak)
  float thr = 0.3 + d * 0.07;
  float own = step(0.5, src.a) * step(d, uFar * 0.98);
  vec4 jump = step(vec4(thr), vec4(dl, dr, dd, du) - d) * own;
  // sudut cembung: rata-rata tetangga lebih jauh dari dirinya (laplacian kedalaman positif), bukan di
  // piksel yang bergaris tepi
  float lap = (dl + dr + du + dd - 4.0 * d) / max(d, 1.0);
  float convex = smoothstep(0.015, 0.05, lap) * (1.0 - max(max(jump.x, jump.y), max(jump.z, jump.w))) * step(0.5, src.a);
  vec3 c = aces(src.rgb);
  // warna sedikit lebih jenuh (palet pixel art)
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = clamp(mix(vec3(l), c, uSaturation), 0.0, 1.0);
  c = min(c * (1.0 + convex * uHighlight), 1.0);
  c = toSRGB(c);
  // warna 15-bit + dithering
  c = floor(c * uLevels + 0.5 + (bayer4(gl_FragCoord.xy) - 0.5) * uDither) / uLevels;
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), dot(jump, vec4(1.0, 2.0, 4.0, 8.0)) / 15.0);
}
`

// Tahap 2, per piksel kanvas: piksel seni diperbesar uScale × uScale (nearest), garis tepi = pita tipis
// selebar uLine (bagian dari piksel seni) di sisi yang ditandai tahap 1. Hanya satu baca tekstur per
// piksel; piksel seni tanpa sisi bergaris tepi (sebagian besar layar) langsung disalin.
const screenShader = /* glsl */`
uniform sampler2D tArt;
uniform vec2 uTexel;
uniform float uScale;
uniform float uLine;
uniform float uOutline;
uniform vec3 uInk;
uniform float uLevels;
uniform float uDither;
${BAYER}
void main() {
  // piksel seni tempat piksel kanvas ini berada (ap) dan letaknya di dalam piksel seni itu (f, 0..1)
  vec2 p = gl_FragCoord.xy / uScale;
  vec2 ap = floor(p);
  vec4 t = texture2D(tArt, (ap + 0.5) * uTexel);
  if (t.a < 0.5 / 15.0) {
    gl_FragColor = vec4(t.rgb, 1.0);
    return;
  }
  vec2 f = p - ap;
  vec4 jump = mod(floor(floor(t.a * 15.0 + 0.5) / vec4(1.0, 2.0, 4.0, 8.0)), 2.0);
  vec4 band = vec4(step(f.x, uLine), step(1.0 - uLine, f.x), step(f.y, uLine), step(1.0 - uLine, f.y));
  vec4 lines = jump * band;
  float edge = max(max(lines.x, lines.y), max(lines.z, lines.w)) * uOutline;
  // tinta dikalikan di ruang warna linear ≈ dikali tinta^(1/2.2) pada warna sRGB, lalu dibulatkan lagi
  vec3 inked = t.rgb * pow(uInk, vec3(0.4545));
  inked = floor(inked * uLevels + 0.5 + (bayer4(ap) - 0.5) * uDither) / uLevels;
  gl_FragColor = vec4(mix(t.rgb, clamp(inked, 0.0, 1.0), edge), 1.0);
}
`

// renderer: THREE.WebGLRenderer (antialias mati, pixel ratio 1 — ukuran diatur di sini);
// pixelSize: px CSS per piksel seni (quality.pixelSize — Tinggi = piksel lebih halus)
export function createPixelRenderer(renderer, { pixelSize = 2 } = {}) {
  const canvas = renderer.domElement
  const half = renderer.capabilities.isWebGL2 && (renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float'))
  const target = new THREE.WebGLRenderTarget(4, 4, {
    type: half ? THREE.HalfFloatType : THREE.UnsignedByteType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    generateMipmaps: false,
    depthBuffer: true,
    depthTexture: new THREE.DepthTexture(4, 4),
  })
  target.depthTexture.minFilter = THREE.NearestFilter
  target.depthTexture.magFilter = THREE.NearestFilter
  // hasil tahap 1: warna akhir tiap piksel seni + tanda sisi bergaris tepi (8 bit cukup: warnanya
  // sudah 15-bit)
  const artTarget = new THREE.WebGLRenderTarget(4, 4, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    generateMipmaps: false,
    depthBuffer: false,
  })

  const uniforms = {
    tColor: { value: target.texture },
    tDepth: { value: target.depthTexture },
    tArt: { value: artTarget.texture },
    uTexel: { value: new THREE.Vector2(0.25, 0.25) },
    uScale: { value: 1 },
    uLine: { value: 1 },
    uNear: { value: 0.5 },
    uFar: { value: 1000 },
    uExposure: { value: renderer.toneMappingExposure },
    uOutline: { value: 1 },
    uHighlight: { value: 0.18 },
    uLevels: { value: 31 },
    uDither: { value: 0.9 },
    uInk: { value: new THREE.Color(0.22, 0.18, 0.3) },
    uSaturation: { value: 1.15 },
  }
  const pass = fragmentShader => {
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false, depthWrite: false, toneMapped: false })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    quad.frustumCulled = false
    const scene = new THREE.Scene()
    scene.add(quad)
    return scene
  }
  const artScene = pass(artShader)
  const screenScene = pass(screenShader)
  const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const size = { w: 4, h: 4, scale: 1, canvas: 1 }
  return {
    uniforms,
    size,
    passes: { art: artScene, screen: screenScene }, // pengujian: shader tiap tahap
    get target() {
      return target
    },
    // ukuran layar (px CSS) → ukuran gambar (piksel seni). Tiap piksel seni = k × k px layar (k bulat):
    // tahap 2 menggambarnya c × c px kanvas, lalu browser membesarkan kanvas m × m tanpa penghalusan
    // (k = c · m). m > 1 hanya bila garis tepi tetap tepat setebal px layarnya (m membagi k dan tebal
    // garis) — gambarnya sama, piksel kanvas m² kali lebih sedikit (mis. Rendah & Tinggi di Pixel 7)
    setSize(cssW, cssH) {
      const dpr = window.devicePixelRatio || 1
      const k = Math.max(1, Math.round(pixelSize * dpr)) // px layar per piksel seni
      const line = Math.max(1, Math.round(k * LINE)) // tebal garis tepi (px layar)
      let m = 1
      for (let d = 2; d <= line; d++) if (k % d === 0 && line % d === 0) m = d
      const c = k / m // px kanvas per piksel seni
      const w = Math.max(1, Math.ceil((cssW * dpr) / k))
      const h = Math.max(1, Math.ceil((cssH * dpr) / k))
      renderer.setPixelRatio(1)
      renderer.setSize(w * c, h * c, false)
      canvas.style.width = `${(w * k) / dpr}px`
      canvas.style.height = `${(h * k) / dpr}px`
      target.setSize(w, h)
      artTarget.setSize(w, h)
      uniforms.uTexel.value.set(1 / w, 1 / h)
      uniforms.uScale.value = c
      uniforms.uLine.value = line / k
      Object.assign(size, { w, h, scale: k / dpr, canvas: c })
      return size
    },
    render(scene, camera) {
      uniforms.uNear.value = camera.near
      uniforms.uFar.value = camera.far
      renderer.setRenderTarget(target)
      renderer.render(scene, camera)
      // renderer.info tetap berisi statistik dunia (segitiga, draw call — seperti sebelumnya, tanpa
      // pass bayangan) ditambah dua tahap ini, tidak dikosongkan oleh render berikutnya
      renderer.info.autoReset = false
      renderer.setRenderTarget(artTarget)
      renderer.render(artScene, postCamera)
      renderer.setRenderTarget(null)
      renderer.render(screenScene, postCamera)
      renderer.info.autoReset = true
    },
  }
}
