import * as THREE from 'three'

// Gambar pixel art HD. Dunia 3D digambar ke target beresolusi rendah (±2 px CSS per "piksel seni"),
// lalu satu pass pasca-proses:
// - garis tepi gelap 1 piksel di tepi benda yang berada di depan benda lain (dari kedalaman), sorot
//   terang tipis di sudut cembung (atap, sudut bangunan, punggung bukit);
// - tone mapping ACES + sRGB, warna 15-bit (32 tingkat per kanal, seperti konsol 16-bit) dengan
//   dithering Bayer 4×4 supaya gradasi langit & air pecah menjadi pola piksel.
// Kanvasnya sebesar target itu; browser memperbesarnya dengan nearest-neighbor (image-rendering:
// pixelated) dengan skala BULAT piksel layar, jadi tiap piksel seni sama besar dan tajam.
// Kanal alfa target = penanda garis tepi (1 = boleh bergaris tepi, 0 = tidak, mis. helai rumput).

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
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = /* glsl */`
#include <packing>
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uTexel;
uniform float uNear;
uniform float uFar;
uniform float uExposure;
uniform float uOutline;
uniform float uHighlight;
uniform float uLevels;
uniform float uDither;
uniform vec3 uInk;
uniform float uSaturation;
varying vec2 vUv;

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
// ambang Bayer 4×4 (0..1)
float bayer4(vec2 p) {
  vec2 q = mod(floor(p), 4.0);
  float i = q.x + q.y * 4.0;
  // urutan: 0 8 2 10 / 12 4 14 6 / 3 11 1 9 / 15 7 13 5
  float v = 0.0;
  if (i < 0.5) v = 0.0; else if (i < 1.5) v = 8.0; else if (i < 2.5) v = 2.0; else if (i < 3.5) v = 10.0;
  else if (i < 4.5) v = 12.0; else if (i < 5.5) v = 4.0; else if (i < 6.5) v = 14.0; else if (i < 7.5) v = 6.0;
  else if (i < 8.5) v = 3.0; else if (i < 9.5) v = 11.0; else if (i < 10.5) v = 1.0; else if (i < 11.5) v = 9.0;
  else if (i < 12.5) v = 15.0; else if (i < 13.5) v = 7.0; else if (i < 14.5) v = 13.0; else v = 5.0;
  return (v + 0.5) / 16.0;
}

void main() {
  vec4 src = texture2D(tColor, vUv);
  vec3 col = src.rgb;
  float d = viewZ(vUv);
  float dl = viewZ(vUv - vec2(uTexel.x, 0.0));
  float dr = viewZ(vUv + vec2(uTexel.x, 0.0));
  float du = viewZ(vUv + vec2(0.0, uTexel.y));
  float dd = viewZ(vUv - vec2(0.0, uTexel.y));
  // garis tepi: tetangga jauh lebih jauh → piksel ini tepi benda yang di depan
  float far = max(max(dl, dr), max(du, dd));
  float thr = 0.3 + d * 0.07;
  float edge = step(thr, far - d) * step(0.5, src.a) * step(d, uFar * 0.98);
  // sudut cembung: rata-rata tetangga lebih jauh dari dirinya (laplacian kedalaman positif)
  float lap = (dl + dr + du + dd - 4.0 * d) / max(d, 1.0);
  float convex = smoothstep(0.015, 0.05, lap) * (1.0 - edge) * step(0.5, src.a);
  vec3 c = aces(col);
  // warna sedikit lebih jenuh (palet pixel art)
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = clamp(mix(vec3(l), c, uSaturation), 0.0, 1.0);
  c = mix(c, c * uInk, edge * uOutline);
  c = min(c * (1.0 + convex * uHighlight), 1.0);
  c = toSRGB(c);
  // warna 15-bit + dithering
  float b = bayer4(gl_FragCoord.xy) - 0.5;
  c = floor(c * uLevels + 0.5 + b * uDither) / uLevels;
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
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

  const uniforms = {
    tColor: { value: target.texture },
    tDepth: { value: target.depthTexture },
    uTexel: { value: new THREE.Vector2(0.25, 0.25) },
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
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false, depthWrite: false, toneMapped: false })
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  quad.frustumCulled = false
  const postScene = new THREE.Scene()
  postScene.add(quad)
  const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const size = { w: 4, h: 4, scale: 1 }
  return {
    uniforms,
    size,
    get target() {
      return target
    },
    // ukuran layar (px CSS) → ukuran gambar (piksel seni); kanvas diperbesar dengan skala bulat
    setSize(cssW, cssH) {
      const dpr = window.devicePixelRatio || 1
      const k = Math.max(1, Math.round(pixelSize * dpr)) // px layar per piksel seni
      const w = Math.max(1, Math.ceil((cssW * dpr) / k))
      const h = Math.max(1, Math.ceil((cssH * dpr) / k))
      renderer.setPixelRatio(1)
      renderer.setSize(w, h, false)
      canvas.style.width = `${(w * k) / dpr}px`
      canvas.style.height = `${(h * k) / dpr}px`
      target.setSize(w, h)
      uniforms.uTexel.value.set(1 / w, 1 / h)
      Object.assign(size, { w, h, scale: k / dpr })
      return size
    },
    render(scene, camera) {
      uniforms.uNear.value = camera.near
      uniforms.uFar.value = camera.far
      renderer.setRenderTarget(target)
      renderer.render(scene, camera)
      renderer.setRenderTarget(null)
      // renderer.info tetap berisi statistik dunia (segitiga, draw call — seperti sebelumnya, tanpa
      // pass bayangan) ditambah pass ini, tidak dikosongkan oleh render kedua
      renderer.info.autoReset = false
      renderer.render(postScene, postCamera)
      renderer.info.autoReset = true
    },
  }
}
