import * as THREE from 'three'

// Langit: kubah gradien + matahari, tanpa tekstur (murah untuk HP).
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
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float up = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(up, 0.55));
  float s = max(dot(d, uSunDir), 0.0);
  col += uSunColor * (pow(s, 900.0) * 3.0 + pow(s, 12.0) * 0.25);
  // di bawah cakrawala: warna kabut (menyatu dengan laut di kejauhan)
  col = mix(col, uHorizon, smoothstep(0.0, -0.05, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export function createEnvironment(scene) {
  const sunDir = new THREE.Vector3(0.45, 0.55, 0.35).normalize()
  const horizon = new THREE.Color('#cfe9f3')
  const zenith = new THREE.Color('#3f8fd6')

  scene.fog = new THREE.Fog(horizon.clone(), 350, 2400)
  scene.background = horizon.clone()

  const skyMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uZenith: { value: zenith },
      uHorizon: { value: horizon },
      uSunDir: { value: sunDir },
      uSunColor: { value: new THREE.Color('#fff2cc') },
    },
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

  const hemi = new THREE.HemisphereLight('#cfeaff', '#6b8a4a', 1.4)
  scene.add(hemi)

  const sun = new THREE.DirectionalLight('#fff1d6', 2.2)
  sun.position.copy(sunDir).multiplyScalar(500)
  scene.add(sun)

  return {
    sunDir,
    skyColor: new THREE.Color('#9fd0ee'),
    fog: scene.fog,
    sun,
    hemi,
  }
}
