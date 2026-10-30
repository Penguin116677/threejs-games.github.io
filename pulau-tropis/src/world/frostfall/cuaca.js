import * as THREE from 'three'
import { COLD_X0, COLD_X1, LAND } from './layout.js'

// Cuaca & suasana Kerajaan Frostfall:
//   - salju turun: satu Points (shader) di kotak yang selalu mengelilingi kamera — butiran digeser
//     waktu & angin lalu "dibungkus" (mod) supaya tidak pernah habis; tidak ada di dalam gua / aula
//   - iklim: warna kabut, langit, cahaya langit & matahari berbaur dari tropis ke musim dingin
//     menurut posisi pemain; di dalam gua gelap kebiruan, di dalam aula / kedai redup
//   - satu lampu titik yang berpindah ke sumber cahaya terdekat (api unggun, perapian, anglo,
//     kristal) dan berkedip — selalu ada sejak awal (menambah/menghapus lampu = semua shader dibuat
//     ulang), intensitas 0 bila tidak ada sumber di dekat
//   - asap tipis dari cerobong rumah desa
const SNOW_N = { rendah: 500, sedang: 1300, tinggi: 2600 }
const BOX = new THREE.Vector3(48, 30, 48)

const snowVertex = /* glsl */`
uniform float uTime;
uniform vec3 uCam;
uniform vec3 uBox;
uniform float uSize;
attribute vec3 aSeed;
varying float vFade;
void main() {
  // jatuh 1,1–1,9 m/s, melayang ke samping (angin) & bergoyang
  vec3 p = position * uBox;
  float fall = 1.1 + aSeed.x * 0.8;
  p.y -= uTime * fall;
  p.x += uTime * 0.9 + sin(uTime * (0.6 + aSeed.y) + aSeed.z * 6.28) * 0.8;
  p.z += uTime * 0.35 + cos(uTime * (0.5 + aSeed.z) + aSeed.y * 6.28) * 0.6;
  // bungkus di sekitar kamera
  vec3 rel = mod(p - uCam + uBox * 0.5, uBox) - uBox * 0.5;
  vec3 world = uCam + rel;
  vec4 mv = modelViewMatrix * vec4(world, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = -mv.z;
  gl_PointSize = min(uSize * (0.6 + aSeed.x * 0.8) / max(dist, 0.5), uSize * 0.18);
  // memudar di tepi kotak (tidak "muncul tiba-tiba") & sangat dekat kamera
  vec3 edge = abs(rel) / (uBox * 0.5);
  vFade = (1.0 - smoothstep(0.75, 1.0, max(edge.x, max(edge.y, edge.z)))) * smoothstep(1.5, 4.0, dist);
}
`
const snowFragment = /* glsl */`
uniform float uOpacity;
uniform vec3 uColor;
varying float vFade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - smoothstep(0.2, 0.5, length(c));
  gl_FragColor = vec4(uColor, a * vFade * uOpacity);
}
`
// asap: tiap partikel naik dari cerobongnya, mengembang, memudar (umur 6 s, berulang)
const smokeVertex = /* glsl */`
uniform float uTime;
uniform float uSize;
attribute float aPhase;
varying float vLife;
void main() {
  float life = fract(uTime / 6.0 + aPhase);
  vec3 p = position + vec3(life * 2.2 + sin(life * 5.0 + aPhase * 9.0) * 0.4, life * 7.0, life * 0.8);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.5 + life * 1.6) / max(-mv.z, 0.5);
  vLife = life;
}
`
const smokeFragment = /* glsl */`
uniform float uOpacity;
varying float vLife;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = (1.0 - smoothstep(0.15, 0.5, length(c))) * smoothstep(0.0, 0.12, vLife) * (1.0 - vLife);
  gl_FragColor = vec4(vec3(0.82, 0.84, 0.88), a * 0.32 * uOpacity);
}
`

export function createWeather({ scene, env, quality, water, smoke = [], lights = [] }) {
  // ------------------------------------------------------------------ salju
  const n = SNOW_N[quality.level] ?? SNOW_N.sedang
  const pos = new Float32Array(n * 3)
  const seed = new Float32Array(n * 3)
  let s = 1234567
  const r = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  for (let i = 0; i < n * 3; i++) {
    pos[i] = r()
    seed[i] = r()
  }
  const snowGeo = new THREE.BufferGeometry()
  snowGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  snowGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3))
  const snowUniforms = {
    uTime: { value: 0 },
    uCam: { value: new THREE.Vector3() },
    uBox: { value: BOX },
    uSize: { value: 0 },
    uOpacity: { value: 0 },
    uColor: { value: new THREE.Color('#ffffff') },
  }
  const snow = new THREE.Points(snowGeo, new THREE.ShaderMaterial({
    vertexShader: snowVertex, fragmentShader: snowFragment, uniforms: snowUniforms, transparent: true, depthWrite: false,
  }))
  snow.name = 'salju-turun'
  snow.frustumCulled = false
  snow.visible = false
  snow.renderOrder = 3
  scene.add(snow)

  // ------------------------------------------------------------------ asap cerobong
  const PUFFS = 7
  const smokePos = new Float32Array(smoke.length * PUFFS * 3)
  const phase = new Float32Array(smoke.length * PUFFS)
  smoke.forEach((c, i) => {
    for (let k = 0; k < PUFFS; k++) {
      const o = (i * PUFFS + k) * 3
      smokePos[o] = c.x
      smokePos[o + 1] = c.y
      smokePos[o + 2] = c.z
      phase[i * PUFFS + k] = k / PUFFS + i * 0.13
    }
  })
  const smokeGeo = new THREE.BufferGeometry()
  smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3))
  smokeGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
  const smokeUniforms = { uTime: { value: 0 }, uSize: { value: 0 }, uOpacity: { value: 0 } }
  const smokePts = new THREE.Points(smokeGeo, new THREE.ShaderMaterial({
    vertexShader: smokeVertex, fragmentShader: smokeFragment, uniforms: smokeUniforms, transparent: true, depthWrite: false,
  }))
  smokePts.name = 'asap-cerobong'
  smokePts.visible = false
  smokeGeo.computeBoundingSphere()
  scene.add(smokePts)

  // ------------------------------------------------------------------ lampu titik bergerak
  const lamp = quality.level === 'rendah' ? null : new THREE.PointLight('#ffa050', 0, 14, 1.6)
  if (lamp) {
    lamp.name = 'lampu-frostfall'
    lamp.position.set(LAND.x, -50, LAND.z)
    scene.add(lamp)
  }
  let lampTarget = null
  let lampLevel = 0

  // ------------------------------------------------------------------ warna iklim
  const base = {
    fog: env.fog.color.clone(),
    horizon: env.horizon.clone(),
    zenith: env.zenith.clone(),
    hemiSky: env.hemi.color.clone(),
    hemiGround: env.hemi.groundColor.clone(),
    hemiI: env.hemi.intensity,
    sun: env.sun.color.clone(),
    sunI: env.sun.intensity,
  }
  const cold = {
    fog: new THREE.Color('#c9d5e0'),
    horizon: new THREE.Color('#d2dce6'),
    zenith: new THREE.Color('#6f8fb2'),
    hemiSky: new THREE.Color('#dfe8f4'),
    hemiGround: new THREE.Color('#a9b8cc'),
    hemiI: 1.25,
    sun: new THREE.Color('#ffe6c8'),
    sunI: 1.95,
  }
  const cave = { fog: new THREE.Color('#0d1a2b'), hemiSky: new THREE.Color('#5d86b8'), hemiGround: new THREE.Color('#1d3350'), hemiI: 0.42, sunI: 0.12 }
  const indoor = { hemiI: 1.0, sunI: 0.5, hemiSky: new THREE.Color('#f0dcc4'), hemiGround: new THREE.Color('#6a5644') }
  const state = { frost: 0, cave: 0, indoor: 0 }
  const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * dt))

  // seberapa "dingin" titik (x, z): 0 di Pulau Tropis, 1 di Frostfall (memudar di selat)
  const coldAt = (x, z) => {
    const k = Math.min(1, Math.max(0, (x - COLD_X0) / (COLD_X1 - COLD_X0)))
    const away = Math.hypot((x - LAND.x) / (LAND.rx * 1.5), (z - LAND.z) / (LAND.rz * 1.5))
    return k * (1 - Math.min(1, Math.max(0, (away - 1) / 0.25)))
  }

  return {
    snow,
    get state() {
      return state
    },
    coldAt,
    // target: { x, y, z } posisi pemain; inCave: 0..1 (kegelapan gua), indoorK: 0..1 (di dalam aula /
    // kedai); far: jarak pandang kamera; camera: kamera
    update(dt, time, { target, inCave, indoorK, far, camera }) {
      state.frost = approach(state.frost, coldAt(target.x, target.z), 1.5, dt)
      state.cave = approach(state.cave, inCave, 2.2, dt)
      state.indoor = approach(state.indoor, indoorK, 3, dt)
      const f = state.frost
      const c = state.cave
      const ind = state.indoor
      // kabut & langit
      env.fog.color.copy(base.fog).lerp(cold.fog, f).lerp(cave.fog, c)
      env.horizon.copy(base.horizon).lerp(cold.horizon, f).lerp(cave.fog, c)
      env.zenith.copy(base.zenith).lerp(cold.zenith, f).lerp(cave.fog, c)
      if (scene.background?.isColor) scene.background.copy(env.horizon)
      const near = far * (0.3 - 0.16 * f)
      const farF = far * (0.95 - 0.22 * f)
      env.fog.near = near + (5 - near) * c
      env.fog.far = farF + (85 - farF) * c
      if (water) {
        const u = water.userData.material.uniforms
        u.uFogNear.value = 380 + (env.fog.near - 380) * Math.max(f, c)
        u.uFogFar.value = 2400 + (env.fog.far - 2400) * Math.max(f, c)
      }
      // cahaya
      env.hemi.color.copy(base.hemiSky).lerp(cold.hemiSky, f).lerp(indoor.hemiSky, ind * 0.5).lerp(cave.hemiSky, c)
      env.hemi.groundColor.copy(base.hemiGround).lerp(cold.hemiGround, f).lerp(indoor.hemiGround, ind * 0.5).lerp(cave.hemiGround, c)
      let hemiI = base.hemiI + (cold.hemiI - base.hemiI) * f
      hemiI += (indoor.hemiI - hemiI) * ind
      env.hemi.intensity = hemiI + (cave.hemiI - hemiI) * c
      env.sun.color.copy(base.sun).lerp(cold.sun, f)
      let sunI = base.sunI + (cold.sunI - base.sunI) * f
      sunI += (indoor.sunI - sunI) * ind
      env.sun.intensity = sunI + (cave.sunI - sunI) * c
      // salju turun (tidak di dalam gua / ruangan)
      const snowK = f * (1 - c) * (1 - ind)
      snow.visible = snowK > 0.02
      if (snow.visible) {
        snowUniforms.uTime.value = time
        snowUniforms.uCam.value.copy(camera.position)
        snowUniforms.uOpacity.value = 0.85 * snowK
        snowUniforms.uSize.value = 0.11 * (window.innerHeight * Math.min(window.devicePixelRatio, quality.maxPixelRatio)) / Math.tan((camera.fov * Math.PI) / 360) * 0.5
      }
      smokePts.visible = f > 0.05 && smoke.length > 0
      if (smokePts.visible) {
        smokeUniforms.uTime.value = time
        smokeUniforms.uOpacity.value = f
        smokeUniforms.uSize.value = 1.4 * (window.innerHeight * Math.min(window.devicePixelRatio, quality.maxPixelRatio)) / Math.tan((camera.fov * Math.PI) / 360) * 0.5
      }
      // lampu titik: sumber cahaya terdekat dalam jangkauannya
      if (lamp) {
        let best = null
        let bestD = Infinity
        if (f > 0.05)
          for (const l of lights) {
            const d = Math.hypot(l.x - target.x, l.y - target.y, l.z - target.z)
            if (d < l.range + 6 && d < bestD) {
              bestD = d
              best = l
            }
          }
        if (best !== lampTarget) {
          // pindah: padamkan dulu, lalu nyalakan di tempat baru
          lampLevel = approach(lampLevel, 0, 9, dt)
          if (lampLevel < 0.05) {
            lampTarget = best
            if (best) {
              lamp.position.set(best.x, best.y, best.z)
              lamp.color.set(best.color)
              lamp.distance = best.range * 1.6
            }
          }
        } else lampLevel = approach(lampLevel, best ? 1 : 0, 4, dt)
        const flick = lampTarget && lampTarget.flicker ? 0.82 + 0.1 * Math.sin(time * 13.1) + 0.08 * Math.sin(time * 23.7 + 1.3) : 1
        lamp.intensity = lampTarget ? lampTarget.power * lampLevel * flick : 0
      }
    },
  }
}
