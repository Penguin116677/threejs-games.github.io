import * as THREE from 'three'
import { ISLAND } from './island.js'
import { SHORE_GLSL, waveTime } from './shore.js'

// Laut:
// - ombak pantai yang datang tegak lurus garis pantai, pecah menjadi buih putih,
//   naik ke pasir lalu surut (data jarak-ke-pantai dari shore.js)
// - alun lembut di laut lepas
// - riak dari tekstur normal ber-mipmap (tanpa moiré di kejauhan)
// - pantulan gradasi langit + awan, kilau matahari, efek Fresnel
// - toska di air dangkal → biru tua di laut dalam, pasir terlihat di air tipis
// - kilau kaustik di air dangkal (Sedang/Tinggi)

const vertexShader = /* glsl */`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform float uWaveTime;
uniform float uIslandSize;
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal; // fase & kekuatan ombak lokal (berubah pelan, cukup per vertex)
${SHORE_GLSL}

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec2 p = world.xz;
  vec2 uv = p / uIslandSize + 0.5;
  bool inside = uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0;
  float s = inside ? textureLod(uShore, uv, 0.0).g : 600.0;
  vec2 local = waveLocal(uNoise, p, uWaveTime);
  vLocal = local;

  float y;
  if (s < 0.0) {
    // di atas pasir: permukaan air pantai naik-turun; tanah menutupinya bila lebih tinggi
    y = s > -14.0 ? swashLevel(local, uWaveTime) : -3.0;
  } else {
    float u = wavePhase(s, local.x, uWaveTime);
    // puncak di lepas pantai sedikit diratakan di geometri (grid lebih kasar dari ombak);
    // bentuk tajamnya digambar di fragment shader. Dekat garis pantai permukaan menyatu
    // dengan tinggi air di pasir, supaya tepi air di pasir tetap mulus (tidak bergerigi).
    float crestY = waveAmp(s, local.y) * waveProfile(u) * 0.45;
    y = mix(swashLevel(local, uWaveTime), crestY, smoothstep(0.0, 9.0, s));
  }
  // alun lembut di laut lepas
  y += (sin(dot(p, vec2(0.021, 0.008)) + uWaveTime * 0.7) * 0.16
    + sin(dot(p, vec2(-0.012, 0.023)) + uWaveTime * 0.55) * 0.1) * smoothstep(30.0, 120.0, s);
  // di luar area pulau (sel grid makin besar) air dibuat datar
  float edge = 1.0 - smoothstep(0.44, 0.5, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
  world.y += y * edge;

  vWorld = world.xyz;
  vec4 mv = viewMatrix * world;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`

const fragmentShader = /* glsl */`
uniform sampler2D uShore;
uniform sampler2D uNoise;
uniform sampler2D uNormal;
uniform float uWaveTime;
uniform float uIslandSize;
uniform vec3 uShallow;
uniform vec3 uDeep;
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
varying vec3 vWorld;
varying float vFogDepth;
varying vec2 vLocal;
${SHORE_GLSL}

// warna langit pada arah pantulan r (gradasi + awan, sama seperti kubah langit)
vec3 skyReflection(vec3 r) {
  vec3 c = mix(uHorizon, uZenith, pow(max(r.y, 0.0), 0.5));
#ifdef CLOUD_REFLECTION
  vec2 cuv = r.xz / (r.y + 0.15) * 0.22 + vec2(uWaveTime * 0.0025, uWaveTime * 0.001);
  float n = texture2D(uNoise, cuv).b * 0.62 + texture2D(uNoise, cuv * 2.9 + 0.31).g * 0.28 + 0.05;
  float cover = smoothstep(0.5, 0.74, n) * smoothstep(0.0, 0.16, r.y);
  c = mix(c, vec3(0.86, 0.9, 0.95), cover * 0.85);
#endif
  return c;
}

void main() {
  vec2 p = vWorld.xz;
  vec2 uv = p / uIslandSize + 0.5;
  vec4 sh = vec4(-18.0, 600.0, 0.0, 1.0);
  if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) sh = texture2D(uShore, uv);
  float ground = sh.r;                        // tinggi dasar/pasir di bawah air
  float s = sh.g;                             // jarak ke garis pantai (+ di laut)
  vec2 dir = sh.ba / max(length(sh.ba), 1e-3); // arah ke laut lepas
  float depth = max(-ground, 0.0);            // kedalaman laut saat tenang
  float water = vWorld.y - ground;            // tebal air saat ini (ikut ombak)
  float far = smoothstep(80.0, 900.0, vFogDepth);
  // garis ombak memudar dari jauh (dari udara pulau tidak tampak dikelilingi "garis kontur")
  float waveFade = 1.0 - 0.8 * smoothstep(120.0, 560.0, vFogDepth);

  // --- ombak pantai: fase, tinggi, kemiringan
  float sc = max(s, 0.0);
  float u = wavePhase(sc, vLocal.x, uWaveTime);
  float amp = waveAmp(sc, vLocal.y);
  // kemiringan ombak (dilebihkan sedikit untuk pencahayaan agar ombak terbaca dari jauh)
  float slope = 1.6 * waveFade * amp * (waveProfile(fract(u + 0.02)) - waveProfile(fract(u - 0.02))) / (0.04 * WAVE_LEN);

  // --- normal permukaan: alun + ombak pantai + riak (tekstur normal)
  vec2 g = vec2(0.021, 0.008) * cos(dot(p, vec2(0.021, 0.008)) + uWaveTime * 0.7) * 0.16
    + vec2(-0.012, 0.023) * cos(dot(p, vec2(-0.012, 0.023)) + uWaveTime * 0.55) * 0.1;
  g *= smoothstep(30.0, 120.0, s);
  g += dir * slope;
  vec2 ripple = texture2D(uNormal, p * 0.045 + vec2(uWaveTime * 0.021, uWaveTime * 0.013)).xy * 2.0 - 1.0;
#if DETAIL_LAYERS > 1
  ripple += texture2D(uNormal, p * 0.083 + vec2(-uWaveTime * 0.017, uWaveTime * 0.024)).xy * 2.0 - 1.0;
  ripple *= 0.6;
#endif
  ripple *= mix(0.5, 0.18, far);
  vec3 n = normalize(vec3(-g.x + ripple.x, 1.0, -g.y + ripple.y));

  vec3 V = normalize(cameraPosition - vWorld);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, V), 0.0), 5.0);
  vec3 R = reflect(-V, n);
  R.y = abs(R.y);
  vec3 refl = skyReflection(R);

  // warna badan air: toska di dangkal → biru tua di laut dalam
  vec3 body = mix(uShallow, uDeep, smoothstep(0.5, 12.0, depth));
  // puncak ombak lebih terang (cahaya menembus air tipis), lembah sedikit lebih gelap;
  // puncak putus-putus sepanjang pantai dan lebih samar dari jauh agar tidak seperti garis kontur
  float breakup = smoothstep(0.2, 0.6, texture2D(uNoise, p * 0.013 + 0.71).g);
  float shade = (amp / WAVE_AMP) * waveFade * mix(0.45, 1.0, breakup);
  body = body * (1.0 - 0.1 * shade * (1.0 - waveProfile(u)) * (1.0 - smoothstep(4.0, 10.0, depth)))
    + uShallow * waveProfile(u) * shade * 0.5;
#ifdef CAUSTICS
  vec2 cp = p * 0.045;
  float c1 = texture2D(uNoise, cp + vec2(uWaveTime * 0.011, uWaveTime * 0.007)).a;
  float c2 = texture2D(uNoise, cp * 1.37 + vec2(-uWaveTime * 0.009, uWaveTime * 0.012)).a;
  float caustic = pow(smoothstep(0.55, 1.0, 1.0 - abs(c1 - c2)), 3.0);
  body += vec3(0.85, 1.0, 0.95) * caustic * 0.3 * (1.0 - smoothstep(0.6, 8.0, depth)) * (1.0 - far);
#endif
  vec3 col = mix(body, refl, fres);

  // kilau matahari: pantulan tajam + kilauan lebar yang lembut
  vec3 H = normalize(uSunDir + V);
  float NdotH = max(dot(n, H), 0.0);
  col += uSunColor * (pow(NdotH, 320.0) * 2.6 + pow(NdotH, 48.0) * 0.07);

  // --- buih
  float lace = texture2D(uNoise, p * 0.19 + dir * u * 0.6 + vec2(uWaveTime * 0.012, 0.0)).r * 0.65
    + texture2D(uNoise, p * 0.47 - dir * u * 0.9).r * 0.35;
  float strength = amp / WAVE_AMP;
  // 1) ombak pecah: muka depan putih + jejak buih di belakangnya, dekat pantai
  float breaking = smoothstep(28.0, 9.0, s) * smoothstep(-0.5, 1.5, s) * sqrt(strength);
  float front = smoothstep(0.0, 0.04, u) * (1.0 - smoothstep(0.1, 0.42, u));
  float foam = breaking * front * smoothstep(0.4, 0.75, lace * 0.95 + front * 0.25);
  // 2) garis putih tipis di puncak ombak yang masih di tengah (belum pecah)
  float whitecap = smoothstep(0.07, 0.11, u) * (1.0 - smoothstep(0.12, 0.2, u));
  foam = max(foam, whitecap * smoothstep(50.0, 24.0, s) * strength * breakup * smoothstep(0.3, 0.6, lace) * 0.6 * waveFade);
  // 3) air yang naik ke pasir berbuih, dengan garis buih di ujungnya
  float swash = (1.0 - smoothstep(0.0, 0.3, water)) * (1.0 - smoothstep(0.0, 6.0, s));
  foam = max(foam, swash * smoothstep(0.3, 0.65, lace) * 0.75);
  float edgeFoam = (1.0 - smoothstep(0.0, 0.1 + 0.1 * lace, water)) * step(0.0, water);
  foam = max(foam, edgeFoam * 0.9);
  // 4) sisa buih tipis berpola di air dangkal
  foam = max(foam, smoothstep(0.64, 0.86, lace) * (1.0 - smoothstep(0.3, 2.5, depth)) * 0.4);
  foam *= 1.0 - far * 0.6;
  col = mix(col, vec3(0.93, 0.97, 1.0) * (0.82 + 0.18 * uSunDir.y), foam);

  // transparansi: air tipis tembus pandang (pasir terlihat), tepi air lembut
  float alpha = mix(0.32, 0.96, smoothstep(0.0, 2.2, water));
  alpha = max(alpha, fres * 0.9);
  alpha = max(alpha, foam);
  alpha *= smoothstep(-0.005, 0.03, water);

  col = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, vFogDepth));
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

// Grid laut: rapat di area pulau, makin renggang ke cakrawala (satu mesh, tanpa celah).
// Sel yang seluruhnya daratan (di luar jangkauan ombak) tidak dibuat.
function waterGeometry(ground, inner) {
  const half = ISLAND.size / 2
  const OUTER = 12
  const step = (2 * half) / inner
  // rasio pertumbuhan sel di luar pulau agar tepi grid mencapai ±6000 m
  let lo = 1.01
  let hi = 4
  for (let it = 0; it < 60; it++) {
    const r = (lo + hi) / 2
    if (step * (Math.pow(r, OUTER) - 1) / (r - 1) < 5500) lo = r
    else hi = r
  }
  const r = (lo + hi) / 2
  const coords = []
  for (let k = OUTER; k >= 1; k--) coords.push(-half - step * (Math.pow(r, k) - 1) / (r - 1))
  for (let i = 0; i <= inner; i++) coords.push(-half + i * step)
  for (let k = 1; k <= OUTER; k++) coords.push(half + step * (Math.pow(r, k) - 1) / (r - 1))

  const n = coords.length
  const pos = new Float32Array(n * n * 3)
  const land = new Float32Array(n * n)
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) {
      const k = j * n + i
      const x = coords[i]
      const z = coords[j]
      pos[k * 3] = x
      pos[k * 3 + 2] = z
      land[k] = Math.abs(x) < half && Math.abs(z) < half ? ground.heightAt(x, z) : -18
    }
  const index = []
  for (let j = 0; j < n - 1; j++)
    for (let i = 0; i < n - 1; i++) {
      const a = j * n + i
      const b = a + 1
      const c = a + n
      const d = c + 1
      if (Math.min(land[a], land[b], land[c], land[d]) > 1.6) continue
      index.push(a, c, b, b, c, d)
    }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setIndex(index)
  geo.computeBoundingSphere()
  return geo
}

export function createWater({ ground, shore, env, noiseTexture, normalTexture, quality }) {
  const cfg = quality.water
  const defines = { DETAIL_LAYERS: cfg.detailLayers }
  if (cfg.cloudReflection) defines.CLOUD_REFLECTION = ''
  if (quality.caustics) defines.CAUSTICS = ''

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    defines,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uShore: { value: shore.texture },
      uNoise: { value: noiseTexture },
      uNormal: { value: normalTexture },
      uWaveTime: waveTime,
      uIslandSize: { value: ISLAND.size },
      uShallow: { value: new THREE.Color('#3fd6c6') },
      uDeep: { value: new THREE.Color('#0a4a82') },
      uZenith: { value: env.zenith },
      uHorizon: { value: env.horizon },
      uSunDir: { value: env.sunDir },
      uSunColor: { value: new THREE.Color('#fff2d2') },
      uFogColor: { value: env.fog.color },
      uFogNear: { value: env.fog.near },
      uFogFar: { value: env.fog.far },
    },
  })

  const mesh = new THREE.Mesh(waterGeometry(ground, cfg.segments), mat)
  mesh.name = 'laut'
  mesh.position.y = ISLAND.seaLevel
  mesh.frustumCulled = false
  // air digambar setelah terrain agar transparansi benar
  mesh.renderOrder = 1
  return mesh
}
