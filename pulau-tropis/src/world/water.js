import * as THREE from 'three'
import { ISLAND } from './island.js'

// Laut: satu bidang besar dengan shader ringan.
// - gelombang prosedural (normal dihitung di fragment shader, tanpa tekstur)
// - warna toska di air dangkal, biru tua di laut dalam (dari tekstur kedalaman)
// - buih di garis pantai
// - pantulan langit (fresnel) + kilau matahari
const vertexShader = /* glsl */`
uniform float uTime;
varying vec3 vWorld;
varying float vFogDepth;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  // ombak besar yang pelan (tidak terlihat dari jauh, jadi aman di mesh kasar)
  world.y += sin(world.x * 0.05 + uTime * 0.8) * 0.12 + sin(world.z * 0.07 - uTime * 0.6) * 0.1;
  vWorld = world.xyz;
  vec4 mv = viewMatrix * world;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`

const fragmentShader = /* glsl */`
uniform float uTime;
uniform sampler2D uDepth;
uniform float uIslandSize;
uniform vec3 uShallow;
uniform vec3 uDeep;
uniform vec3 uSky;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
varying vec3 vWorld;
varying float vFogDepth;

// turunan (dh/dx, dh/dz) dari jumlah gelombang sinus
vec2 waveGrad(vec2 p, float t) {
  vec2 g = vec2(0.0);
  vec2 d1 = normalize(vec2(1.0, 0.3));
  vec2 d2 = normalize(vec2(-0.4, 1.0));
  vec2 d3 = normalize(vec2(0.7, -0.8));
  vec2 d4 = normalize(vec2(-0.9, -0.2));
  g += d1 * 0.9 * 0.08 * cos(dot(d1, p) * 0.9 + t * 1.3);
  g += d2 * 1.6 * 0.05 * cos(dot(d2, p) * 1.6 + t * 1.7);
  g += d3 * 3.1 * 0.025 * cos(dot(d3, p) * 3.1 + t * 2.3);
  g += d4 * 5.3 * 0.012 * cos(dot(d4, p) * 5.3 + t * 3.1);
  return g;
}

void main() {
  vec2 uv = vWorld.xz / uIslandSize + 0.5;
  float depth = 1.0;
  if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0)
    depth = texture2D(uDepth, uv).r;

  // redam riak di kejauhan: riak kecil yang lebih rapat dari piksel menimbulkan moiré
  float far = smoothstep(60.0, 700.0, vFogDepth);
  vec2 g = waveGrad(vWorld.xz, uTime) * mix(1.0, 0.12, far);
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 viewDir = normalize(cameraPosition - vWorld);

  // warna dasar air dari kedalaman
  vec3 water = mix(uShallow, uDeep, smoothstep(0.0, 0.55, depth));

  // pantulan langit (fresnel Schlick)
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, viewDir), 0.0), 5.0);
  vec3 col = mix(water, uSky, fres * 0.7);

  // kilau matahari
  vec3 h = normalize(uSunDir + viewDir);
  float spec = pow(max(dot(n, h), 0.0), 180.0);
  col += uSunColor * spec * 1.4;

  // buih bergerak di garis pantai
  float shore = 1.0 - smoothstep(0.0, 0.07, depth);
  float band = 0.5 + 0.5 * sin(depth * 140.0 - uTime * 2.2 + vWorld.x * 0.05);
  float foam = shore * (0.45 + 0.55 * band);
  col = mix(col, vec3(1.0), foam * 0.85);

  // air dangkal transparan agar pasir di bawahnya terlihat
  float alpha = mix(0.55, 0.96, smoothstep(0.0, 0.3, depth));
  alpha = max(alpha, foam * 0.9);

  float fogF = smoothstep(uFogNear, uFogFar, vFogDepth);
  col = mix(col, uFogColor, fogF);

  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export function createWater(depthTexture, env) {
  const geo = new THREE.PlaneGeometry(6000, 6000, 120, 120)
  geo.rotateX(-Math.PI / 2)

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uDepth: { value: depthTexture },
      uIslandSize: { value: ISLAND.size },
      uShallow: { value: new THREE.Color('#3fd0c9') },
      uDeep: { value: new THREE.Color('#0b4f86') },
      uSky: { value: env.skyColor.clone() },
      uSunDir: { value: env.sunDir.clone() },
      uSunColor: { value: new THREE.Color('#fff4d6') },
      uFogColor: { value: env.fog.color },
      uFogNear: { value: env.fog.near },
      uFogFar: { value: env.fog.far },
    },
  })

  const mesh = new THREE.Mesh(geo, mat)
  mesh.name = 'laut'
  mesh.position.y = ISLAND.seaLevel
  // air digambar setelah terrain agar transparansi benar
  mesh.renderOrder = 1

  mesh.userData.update = t => {
    mat.uniforms.uTime.value = t
  }
  return mesh
}
