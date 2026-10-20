import * as THREE from 'three'

// Rangka yang dipanggang ke tekstur — dipakai penduduk (villagers.js) dan bala tentara (pasukan.js).
// Animasi rangka kaku (satu tulang per titik) DIPANGGANG sekali: tiap baris tekstur = satu bingkai,
// tiap tulang = 3 texel (tiga baris matriks 3×4). Shader membaca matriks tulang untuk bingkai milik
// tiap orang, jadi semua orang sejenis digambar dalam SATU draw call (InstancedMesh), tanpa
// SkinnedMesh.

export const FPS = 30 // kerapatan bingkai yang dipanggang

const _m = new THREE.Matrix4()
const _inv = new THREE.Matrix4()

// simpan matriks (ruang model) sebagai tiga baris 3×4
export function packMatrix(m, out, o) {
  const e = m.elements // kolom-mayor
  out[o] = e[0]
  out[o + 1] = e[4]
  out[o + 2] = e[8]
  out[o + 3] = e[12]
  out[o + 4] = e[1]
  out[o + 5] = e[5]
  out[o + 6] = e[9]
  out[o + 7] = e[13]
  out[o + 8] = e[2]
  out[o + 9] = e[6]
  out[o + 10] = e[10]
  out[o + 11] = e[14]
}

// Panggang klip-klip sebuah rangka. specs: { kunci: { clip, loop = true, hold: { tulang: 'klip' } } }
// — hold = tulang yang dikunci pada pose bingkai pertama klip lain (mis. lengan kiri memegang
// perisai ke depan, sementara badan tetap bernapas dengan klip idle).
// Hasil { table: { kunci: { row, n, loop } }, skeleton }; bingkai ditambahkan ke `rows`.
export function bakeRig(root, clips, rows, specs) {
  let skinned = null
  root.traverse(o => {
    if (!skinned && o.isSkinnedMesh) skinned = o
  })
  const { skeleton } = skinned
  const mixer = new THREE.AnimationMixer(root)
  const poses = {}
  const poseOf = name => {
    if (!poses[name]) {
      mixer.stopAllAction()
      mixer.clipAction(THREE.AnimationClip.findByName(clips, name)).reset().play()
      mixer.setTime(0)
      poses[name] = skeleton.bones.map(b => b.quaternion.clone())
    }
    return poses[name]
  }
  const table = {}
  for (const [key, spec] of Object.entries(specs)) {
    const clip = THREE.AnimationClip.findByName(clips, spec.clip)
    if (!clip) continue
    const holds = Object.entries(spec.hold || {}).map(([j, name]) => [Number(j), poseOf(name)])
    mixer.stopAllAction()
    mixer.clipAction(clip).reset().play()
    const n = Math.max(1, Math.round(clip.duration * FPS))
    table[key] = { row: rows.length, n, loop: spec.loop !== false }
    for (let f = 0; f < n; f++) {
      mixer.setTime(f / FPS)
      for (const [j, pose] of holds) skeleton.bones[j].quaternion.copy(pose[j])
      root.updateMatrixWorld(true)
      _inv.copy(root.matrixWorld).invert()
      const frame = new Float32Array(skeleton.bones.length * 12)
      skeleton.bones.forEach((bone, j) => {
        _m.multiplyMatrices(_inv, bone.matrixWorld).multiply(skeleton.boneInverses[j])
        packMatrix(_m, frame, j * 12)
      })
      rows.push(frame)
    }
  }
  mixer.stopAllAction()
  return { table, skeleton }
}

// geometri gabungan beberapa SkinnedMesh (posisi bind) + atribut aBone (tulang berbobot terbesar)
export function rigGeometry(meshes) {
  const pos = []
  const nor = []
  const uv = []
  const bone = []
  const index = []
  for (const mesh of meshes) {
    const g = mesh.geometry
    const base = pos.length / 3
    const p = g.attributes.position
    const n = g.attributes.normal
    const t = g.attributes.uv
    const s = g.attributes.skinIndex
    const w = g.attributes.skinWeight
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i))
      nor.push(n.getX(i), n.getY(i), n.getZ(i))
      uv.push(t.getX(i), t.getY(i))
      let best = 0
      for (let k = 1; k < 4; k++) if (w.getComponent(i, k) > w.getComponent(i, best)) best = k
      bone.push(s.getComponent(i, best))
    }
    const idx = g.index
    for (let i = 0; i < idx.count; i++) index.push(base + idx.getX(i))
  }
  return { pos, nor, uv, bone, index }
}

// matriks tulang j pada baris bingkai `row` yang sudah dipanggang (ruang model)
export function bakedMatrix(rows, row, j) {
  const r = rows[row].subarray(j * 12, j * 12 + 12)
  return new THREE.Matrix4().set(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], 0, 0, 0, 1)
}

// Tambahkan bentuk yang ikut tulang j. `geo` diberikan dalam ruang model pada pose bingkai `row`
// (mis. tombak tegak saat berdiri diam); diubah ke ruang bind lewat kebalikan matriks tulang
// bingkai itu, jadi tepat seperti itu pada pose tersebut dan ikut bergerak bersama tulangnya.
// uvAt = satu kotak warna palet untuk seluruh bentuk, atau null = pakai uv geometri sendiri.
export function attach(dst, geo, rows, row, j, uvAt) {
  const g = geo.index ? geo.toNonIndexed() : geo
  g.applyMatrix4(bakedMatrix(rows, row, j).invert())
  const base = dst.pos.length / 3
  const p = g.attributes.position
  const n = g.attributes.normal
  const t = g.attributes.uv
  for (let i = 0; i < p.count; i++) {
    dst.pos.push(p.getX(i), p.getY(i), p.getZ(i))
    dst.nor.push(n.getX(i), n.getY(i), n.getZ(i))
    if (uvAt) dst.uv.push(uvAt[0], uvAt[1])
    else dst.uv.push(t.getX(i), t.getY(i))
    dst.bone.push(j)
    dst.index.push(base + i)
  }
}

export function toBufferGeometry(d) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(d.pos, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(d.nor, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(d.uv, 2))
  g.setAttribute('aBone', new THREE.Float32BufferAttribute(d.bone, 1))
  g.setIndex(d.index)
  return g
}

// tekstur tulang: baris = bingkai, lebar = bones × 3 texel
export function boneTexture(rows, bones) {
  const W = bones * 3
  const tex = new Float32Array(W * rows.length * 4)
  rows.forEach((frame, r) => tex.set(frame.subarray(0, Math.min(frame.length, W * 4)), r * W * 4))
  const t = new THREE.DataTexture(tex, W, rows.length, THREE.RGBAFormat, THREE.FloatType)
  t.magFilter = THREE.NearestFilter
  t.minFilter = THREE.NearestFilter
  t.needsUpdate = true
  return t
}

const ANIM_GLSL = /* glsl */`
uniform sampler2D uBones;
attribute float aBone;
attribute vec4 aAnimA; // baris bingkai 0, baris bingkai 1, campuran, bobot klip B
attribute vec4 aAnimB; // baris bingkai 0, baris bingkai 1, campuran (klip sebelumnya, memudar)
mat4 boneAt(int b, float row) {
  ivec2 c = ivec2(b * 3, int(row));
  vec4 r0 = texelFetch(uBones, c, 0);
  vec4 r1 = texelFetch(uBones, c + ivec2(1, 0), 0);
  vec4 r2 = texelFetch(uBones, c + ivec2(2, 0), 0);
  return mat4(r0.x, r1.x, r2.x, 0.0, r0.y, r1.y, r2.y, 0.0, r0.z, r1.z, r2.z, 0.0, r0.w, r1.w, r2.w, 1.0);
}
mat4 animMatrix() {
  int b = int(aBone + 0.5);
  mat4 a = boneAt(b, aAnimA.x) * (1.0 - aAnimA.z) + boneAt(b, aAnimA.y) * aAnimA.z;
  if (aAnimA.w <= 0.0) return a;
  mat4 c = boneAt(b, aAnimB.x) * (1.0 - aAnimB.z) + boneAt(b, aAnimB.y) * aAnimB.z;
  return a * (1.0 - aAnimA.w) + c * aAnimA.w;
}
`

// matriks tulang dihitung sekali di awal main(); normal & posisi memakai matriks yang sama
// (berlaku untuk material Lambert maupun material kedalaman bayangan)
export function animate(shader, bones) {
  shader.uniforms.uBones = { value: bones }
  shader.vertexShader = ANIM_GLSL + shader.vertexShader
    .replace('void main() {', 'void main() {\n  mat4 animM = animMatrix();')
    .replace('#include <beginnormal_vertex>', `vec3 objectNormal = normalize(mat3(animM) * vec3(normal));
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif`)
    .replace('#include <begin_vertex>', 'vec3 transformed = (animM * vec4(position, 1.0)).xyz;')
}

// bingkai klip `c` (dari table) pada waktu t → (baris0, baris1, campuran) di out[o..o+2]
export function frameOf(c, t, out, o) {
  const f = t * FPS
  let f0
  let f1
  let frac
  if (c.loop) {
    const w = ((f % c.n) + c.n) % c.n
    f0 = Math.floor(w)
    f1 = (f0 + 1) % c.n
    frac = w - f0
  } else {
    const w = Math.min(f, c.n - 1)
    f0 = Math.floor(w)
    f1 = Math.min(f0 + 1, c.n - 1)
    frac = w - f0
  }
  out[o] = c.row + f0
  out[o + 1] = c.row + f1
  out[o + 2] = frac
}
