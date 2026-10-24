import * as THREE from 'three'

// Langit: kubah gradien + matahari + awan bergerak, tanpa tekstur gambar (murah untuk HP).
// Awan memakai tekstur noise bersama (3 kali baca tekstur per piksel).
const vertexShader = /* glsl */`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // selalu di bidang terjauh
}
`

const fragmentShader = /* glsl */`
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform sampler2D uNoise;
uniform float uTime;
varying vec3 vDir;
// pixel art: gradasi langit, halo matahari, dan awan dibulatkan ke beberapa tingkat
float qn(float v, float n) { return floor(clamp(v, 0.0, 0.999) * n) / (n - 1.0); }
void main() {
  vec3 d = normalize(vDir);
  float up = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, qn(pow(up, 0.5), 9.0));
  float s = max(dot(d, uSunDir), 0.0);
  col += uSunColor * (qn(pow(s, 12.0), 4.0) * 0.22 + step(0.985, s) * 0.4);

  // awan: diproyeksikan ke "langit-langit" datar, bergerak pelan
  if (d.y > 0.0) {
    vec2 uv = d.xz / (d.y + 0.15) * 0.22 + vec2(uTime * 0.0025, uTime * 0.001);
    float n = texture2D(uNoise, uv).b * 0.62
      + texture2D(uNoise, uv * 2.9 + 0.31).g * 0.28
      + texture2D(uNoise, uv * 7.3 + 0.67).r * 0.1;
    // awan: badan bertepi tegas, 3 nada (bawah kelabu, tengah, puncak putih)
    float cover = step(0.6, n) * step(0.03, d.y);
    vec3 cloud = mix(vec3(0.72, 0.78, 0.86), vec3(1.0), qn(smoothstep(0.58, 0.8, n), 3.0));
    cloud += uSunColor * qn(pow(s, 6.0), 3.0) * 0.25; // tepi awan bercahaya ke arah matahari
    col = mix(col, cloud, cover * 0.92);
  }
  // cakram matahari (di atas awan tipis)
  col += uSunColor * step(0.9992, s) * 4.0;
  // di bawah cakrawala: warna kabut (menyatu dengan laut di kejauhan)
  col = mix(col, uHorizon, smoothstep(0.0, -0.05, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export function createEnvironment(scene, { noiseTexture, quality }) {
  const sunDir = new THREE.Vector3(0.5, 0.52, 0.32).normalize()
  const horizon = new THREE.Color('#d3ecf6')
  const zenith = new THREE.Color('#3d8bd4')

  scene.fog = new THREE.Fog(horizon.clone(), 380, 2400)
  scene.background = horizon.clone()

  const skyUniforms = {
    uZenith: { value: zenith },
    uHorizon: { value: horizon },
    uSunDir: { value: sunDir },
    uSunColor: { value: new THREE.Color('#fff0c8') },
    uNoise: { value: noiseTexture },
    uTime: { value: 0 },
  }
  const skyMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: skyUniforms,
  })
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), skyMat)
  sky.name = 'langit'
  sky.frustumCulled = false
  sky.renderOrder = -1
  // kubah langit selalu mengikuti kamera
  sky.onBeforeRender = (renderer, s, camera) => {
    sky.position.copy(camera.position)
    sky.scale.setScalar(camera.far * 0.9)
    sky.updateMatrixWorld()
  }
  scene.add(sky)

  const hemi = new THREE.HemisphereLight('#d6ecff', '#5d7a3c', 1.1)
  scene.add(hemi)

  const sun = new THREE.DirectionalLight('#fff1d6', 2.4)
  sun.position.copy(sunDir).multiplyScalar(500)
  scene.add(sun, sun.target)

  if (quality.shadows) {
    sun.castShadow = true
    sun.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize)
    sun.shadow.camera.near = 1
    sun.shadow.camera.far = 1600
    sun.shadow.bias = -0.0006
    sun.shadow.radius = 2
  }

  // Kotak bayangan mengikuti kamera: dekat = tajam, jauh = mencakup seluruh pulau.
  // Ukuran dibulatkan bertingkat dan posisinya "di-snap" ke grid texel bayangan
  // supaya tepi bayangan tidak berkedip saat kamera bergerak.
  const lightRot = new THREE.Matrix4().lookAt(sunDir, new THREE.Vector3(), new THREE.Vector3(0, 1, 0))
  const lightRotInv = lightRot.clone().invert()
  const center = new THREE.Vector3()
  const STEP = Math.log(1.15)

  function updateShadow(camera, target) {
    if (!sun.castShadow) return
    const dist = camera.position.distanceTo(target)
    const raw = THREE.MathUtils.clamp(dist * 0.95, 45, 560)
    const half = Math.exp(Math.ceil(Math.log(raw) / STEP) * STEP)
    const cam = sun.shadow.camera
    if (cam.right !== half) {
      cam.left = -half
      cam.right = half
      cam.top = half
      cam.bottom = -half
      cam.updateProjectionMatrix()
    }
    const texel = (2 * half) / sun.shadow.mapSize.x
    center.copy(target).lerp(camera.position, 0.25).applyMatrix4(lightRotInv)
    center.x = Math.round(center.x / texel) * texel
    center.y = Math.round(center.y / texel) * texel
    center.applyMatrix4(lightRot)
    sun.target.position.copy(center)
    sun.position.copy(center).addScaledVector(sunDir, 800)
    sun.shadow.normalBias = texel * 1.6
  }

  return {
    sunDir,
    zenith,
    horizon,
    fog: scene.fog,
    sun,
    hemi,
    update(time, camera, target) {
      skyUniforms.uTime.value = time
      updateShadow(camera, target)
    },
  }
}
