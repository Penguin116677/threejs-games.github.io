import * as THREE from 'three'
import { seeThrough } from '../trees.js'

// Material bangunan: Lambert + warna per titik, lalu pola permukaan digambar per piksel menurut
// kode aKind (lihat buildings.js K) dari posisi dunia: bata bernat, genteng berlajur, jerami
// berserat, papan kayu, batu andesit, sirap, ubin, anyaman bambu, plester. Pola memudar halus
// saat terlalu rapat untuk piksel (tanpa moiré dari jauh). Kain (aSway) bergoyang tertiup angin.
// Bangunan di antara kamera dan prajurit diberi lubang berpola (sama seperti tajuk pohon).
export const buildingTime = { value: 0 }

const vertexPars = /* glsl */`
uniform float uTime;
attribute float aKind;
attribute float aSway;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;
`

const fragmentPars = /* glsl */`
uniform sampler2D uNoise;
uniform vec3 uSeeA;
uniform vec3 uSeeB;
uniform float uSeeR;
varying float vKind;
varying vec3 vBWorld;
varying vec3 vBNrm;

// 1 di garis (nilai v bulat) setebal w (satuan pola), 0 di luar; hilang halus bila terlalu rapat
float lineAA(float v, float w) {
  float d = abs(fract(v + 0.5) - 0.5);
  float aa = fwidth(v);
  return (1.0 - smoothstep(w - aa, w + aa, d)) * (1.0 - smoothstep(0.18, 0.4, aa));
}

float cellNoise(vec2 id) {
  return texture2D(uNoise, id * 0.1371 + 0.5).r;
}

vec3 buildingPattern(vec3 col) {
  int kind = int(vKind + 0.5);
  if (kind == 0) return col;
  vec3 n = normalize(vBNrm);
  vec3 p = vBWorld;
  // koordinat permukaan: u mendatar sepanjang bidang, v tegak (atau z untuk bidang datar)
  float u = abs(n.x) > abs(n.z) ? p.z : p.x;
  float v = p.y;
  if (abs(n.y) > 0.8) {
    u = p.x;
    v = p.z;
  }
  if (kind == 1) { // bata merah
    float row = floor(v / 0.2);
    float bu = u / 0.44 + 0.5 * mod(row, 2.0);
    float mortar = max(lineAA(v / 0.2, 0.07), lineAA(bu, 0.04));
    col *= 0.84 + 0.3 * cellNoise(vec2(floor(bu), row));
    return mix(col, vec3(0.62, 0.55, 0.47), mortar * 0.75);
  }
  if (kind == 2) { // genteng: lajur bertumpuk + alur tegak
    float row = v / 0.27;
    float shade = 0.72 + 0.28 * smoothstep(0.0, 0.45, fract(row));
    float fadeRow = 1.0 - smoothstep(0.1, 0.35, fwidth(row));
    float groove = 0.5 + 0.5 * sin(u * 28.5);
    float fadeG = 1.0 - smoothstep(0.08, 0.3, fwidth(u * 4.5));
    col *= mix(0.88, shade, fadeRow) * (1.0 - 0.12 * groove * fadeG);
    return col * (0.9 + 0.2 * cellNoise(vec2(floor(u / 0.22), floor(row))));
  }
  if (kind == 3) { // jerami / ijuk: serat tegak + lapisan
    float s = texture2D(uNoise, vec2(u * 2.3, v * 0.25)).r;
    float band = smoothstep(0.0, 0.6, fract(v / 0.42));
    float fade = 1.0 - smoothstep(0.1, 0.4, fwidth(v / 0.42));
    return col * mix(0.95, (0.74 + 0.42 * s) * (0.8 + 0.2 * band), fade);
  }
  if (kind == 4) { // papan kayu mendatar
    float gap = lineAA(v / 0.24, 0.06);
    float grain = texture2D(uNoise, vec2(u * 0.35, v * 4.0)).g;
    col *= (0.86 + 0.26 * grain) * (0.9 + 0.2 * cellNoise(vec2(0.0, floor(v / 0.24)) + floor(u / 3.0)));
    return mix(col, col * 0.45, gap);
  }
  if (kind == 5) { // batu andesit: balok besar bernat
    float row = floor(v / 0.36);
    float bu = u / 0.62 + 0.5 * mod(row, 2.0);
    float joint = max(lineAA(v / 0.36, 0.05), lineAA(bu, 0.03));
    col *= 0.82 + 0.32 * cellNoise(vec2(floor(bu), row) + 7.0);
    return mix(col, col * 0.5, joint);
  }
  if (kind == 6) { // sirap kayu
    float row = floor(v / 0.2);
    float bu = u / 0.17 + 0.5 * mod(row, 2.0);
    float gap = max(lineAA(v / 0.2, 0.08), lineAA(bu, 0.05) * 0.6);
    col *= 0.82 + 0.3 * cellNoise(vec2(floor(bu), row) + 3.0);
    return mix(col, col * 0.55, gap);
  }
  if (kind == 7) { // ubin lantai
    float joint = max(lineAA(u / 0.9, 0.03), lineAA(v / 0.9, 0.03));
    col *= 0.88 + 0.22 * cellNoise(floor(vec2(u, v) / 0.9) + 11.0);
    return mix(col, col * 0.6, joint);
  }
  if (kind == 8) { // anyaman bambu (gedek): kotak-kotak miring bergantian
    float a = sin((u + v) * 22.0);
    float b = sin((u - v) * 22.0);
    float weave = step(0.0, a * b);
    float fade = 1.0 - smoothstep(0.04, 0.14, fwidth((u + v) * 3.5));
    return col * mix(0.95, 0.84 + 0.22 * weave, fade);
  }
  // 9: plester, sedikit noda
  return col * (0.9 + 0.14 * texture2D(uNoise, p.xz * 0.11 + p.y * 0.07).b);
}
`

export function buildingMaterial(noiseTexture) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true })
  mat.onBeforeCompile = shader => {
    shader.uniforms.uTime = buildingTime
    shader.uniforms.uNoise = { value: noiseTexture }
    shader.uniforms.uSeeA = seeThrough.a
    shader.uniforms.uSeeB = seeThrough.b
    shader.uniforms.uSeeR = seeThrough.r
    shader.vertexShader = vertexPars + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      #ifdef USE_INSTANCING
        mat4 bModel = modelMatrix * instanceMatrix;
      #else
        mat4 bModel = modelMatrix;
      #endif
      vec3 wp0 = (bModel * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;
      vKind = aKind;
      vBWorld = (bModel * vec4(transformed, 1.0)).xyz;
      vBNrm = normalize(mat3(bModel) * normal);`
    )
    shader.fragmentShader = fragmentPars + shader.fragmentShader.replace(
      '#include <clipping_planes_fragment>',
      `#include <clipping_planes_fragment>
      if (uSeeR > 0.0) {
        vec3 ab = uSeeB - uSeeA;
        float tt = clamp(dot(vBWorld - uSeeA, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
        float rr = uSeeR * (0.35 + 0.65 * tt);
        float dd = distance(vBWorld, uSeeA + ab * tt);
        if (tt < 0.95 && dd < rr) {
          float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          if (dither > smoothstep(rr * 0.55, rr, dd)) discard;
        }
      }`
    ).replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      diffuseColor.rgb = buildingPattern(diffuseColor.rgb);`
    )
  }
  return mat
}

// Bayangan kain yang bergoyang mengikuti goyangan yang sama (bangunan lain tetap)
export function buildingDepthMaterial() {
  const mat = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking })
  mat.onBeforeCompile = shader => {
    shader.uniforms.uTime = buildingTime
    shader.vertexShader = 'uniform float uTime;\nattribute float aSway;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vec3 wp0 = (modelMatrix * vec4(position, 1.0)).xyz;
      float sw = aSway * (sin(uTime * 2.4 + wp0.x * 0.6 + wp0.z * 0.45) + 0.35 * sin(uTime * 5.3 + wp0.y * 1.3));
      transformed.x += sw;
      transformed.z += sw * 0.7;`
    )
  }
  return mat
}
