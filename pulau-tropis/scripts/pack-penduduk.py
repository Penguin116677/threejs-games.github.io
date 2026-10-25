"""Kemas beberapa karakter Kenney "Mini Characters" menjadi satu GLB ringkas.

Sejak v0.16.0 game hanya memakai prasetel `elf` (rangka + animasi, tanpa mesh & tekstur) untuk
penduduk Kencana dan elf Aeloria — badannya dibuat di kode (src/tokoh/). Prasetel bawaan
(penduduk.glb: rangka + delapan badan Kenney) tidak dipakai lagi, disimpan untuk pembanding.

Semua karakter Mini Characters memakai rangka (7 tulang) dan animasi yang sama, jadi file ini
berisi SATU rangka + animasi yang dipakai penduduk (idle, walk, sit, interact-right, pick-up,
emote-yes), lalu satu mesh per karakter (badan + kepala digabung, ditempel ke rangka bersama).
Atribut dipadatkan: normal int8 (KHR_mesh_quantization), uv uint16, bobot uint8. Tekstur
colormap.png ikut di dalam file.

Pemakaian: python3 scripts/pack-penduduk.py "<folder GLB format Mini Characters>" public/models/penduduk.glb

Dengan argumen ketiga `elf`, file berisi rangka + animasi tambahan untuk para elf Aeloria saja
(tanpa mesh & tekstur):
    python3 scripts/pack-penduduk.py "<folder>" public/models/elf.glb elf
"""
import json
import os
import struct
import sys

import numpy as np

CHARACTERS = ['male-a', 'male-b', 'male-e', 'male-f', 'female-a', 'female-b', 'female-c', 'female-f']
CLIPS = ['idle', 'walk', 'sit', 'interact-right', 'pick-up', 'emote-yes']
# elf: kegiatan sehari-hari (makan, bertani, menempa, berpesta, berlatih, berkelahi, roboh)
ELF_CLIPS = [
    'idle', 'walk', 'sprint', 'jump', 'sit', 'crouch', 'die', 'pick-up', 'emote-yes', 'emote-no', 'interact-right',
    'holding-right', 'holding-left', 'holding-both', 'holding-both-shoot', 'attack-melee-right', 'attack-melee-left', 'attack-kick-right',
]
COMP = {5126: np.float32, 5123: np.uint16, 5121: np.uint8, 5125: np.uint32, 5120: np.int8, 5122: np.int16}
NCOMP = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}


def load(path):
    data = open(path, 'rb').read()
    jlen = struct.unpack('<I', data[12:16])[0]
    gltf = json.loads(data[20:20 + jlen])
    off = 20 + jlen
    blen = struct.unpack('<I', data[off:off + 4])[0]
    return gltf, data[off + 8:off + 8 + blen]


def read(gltf, binary, index):
    a = gltf['accessors'][index]
    bv = gltf['bufferViews'][a['bufferView']]
    dtype = COMP[a['componentType']]
    n = NCOMP[a['type']]
    start = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    size = np.dtype(dtype).itemsize * n
    stride = bv.get('byteStride', size)
    raw = np.frombuffer(binary, dtype=np.uint8, count=(a['count'] - 1) * stride + size, offset=start)
    rows = np.lib.stride_tricks.as_strided(raw, shape=(a['count'], size), strides=(stride, 1))
    out = np.frombuffer(rows.copy().tobytes(), dtype=dtype).reshape(a['count'], n)
    if a.get('normalized'):
        out = out.astype(np.float32) / np.iinfo(dtype).max
    return out


class Writer:
    def __init__(self):
        self.bin = bytearray()
        self.views = []
        self.accessors = []

    def view(self, raw, target=None, stride=None):
        while len(self.bin) % 4:
            self.bin.append(0)
        v = {'buffer': 0, 'byteOffset': len(self.bin), 'byteLength': len(raw)}
        if target:
            v['target'] = target
        if stride:
            v['byteStride'] = stride
        self.views.append(v)
        self.bin.extend(raw)
        return len(self.views) - 1

    def accessor(self, arr, ctype, atype, normalized=False, target=None, minmax=False, stride=None):
        raw = arr.tobytes()
        a = {'bufferView': self.view(raw, target, stride), 'componentType': ctype, 'count': int(arr.shape[0]), 'type': atype}
        if normalized:
            a['normalized'] = True
        if minmax:
            a['min'] = [float(v) for v in arr.min(0)]
            a['max'] = [float(v) for v in arr.max(0)]
        self.accessors.append(a)
        return len(self.accessors) - 1


def main(folder, dst, preset='penduduk'):
    characters, clips = (CHARACTERS, CLIPS) if preset == 'penduduk' else ([], ELF_CLIPS)
    ref, ref_bin = load(os.path.join(folder, f'character-{CHARACTERS[0]}.glb'))
    w = Writer()
    # tulang: node 1..7 dari karakter pertama (root, kaki, badan, lengan, kepala)
    bones = []
    for n in ref['nodes'][1:8]:
        node = {k: v for k, v in n.items() if k in ('name', 'translation', 'rotation', 'scale', 'children')}
        bones.append(node)
    skin_src = ref['skins'][0]
    ibm = read(ref, ref_bin, skin_src['inverseBindMatrices']).astype(np.float32)
    nodes = [{'name': preset, 'children': [1]}] + bones
    meshes = []
    for name in characters:
        gltf, binary = load(os.path.join(folder, f'character-{name}.glb'))
        pos, nor, uv, jnt, idx = [], [], [], [], []
        base = 0
        for mesh in gltf['meshes']:
            for prim in mesh['primitives']:
                at = prim['attributes']
                p = read(gltf, binary, at['POSITION'])
                weights = read(gltf, binary, at['WEIGHTS_0'])
                joints = read(gltf, binary, at['JOINTS_0'])
                # rangka kaku: satu tulang per titik (bobot terbesar)
                j = joints[np.arange(len(joints)), weights.argmax(1)]
                pos.append(p)
                nor.append(read(gltf, binary, at['NORMAL']))
                uv.append(read(gltf, binary, at['TEXCOORD_0']))
                jnt.append(j)
                idx.append(read(gltf, binary, prim['indices']).reshape(-1) + base)
                base += len(p)
        pos = np.concatenate(pos).astype(np.float32)
        nor = np.concatenate(nor).astype(np.float32)
        nor8 = np.zeros((len(nor), 4), np.int8)
        nor8[:, :3] = np.round(np.clip(nor, -1, 1) * 127).astype(np.int8)
        uv16 = np.round(np.clip(np.concatenate(uv), 0, 1) * 65535).astype(np.uint16)
        jnt = np.concatenate(jnt).astype(np.uint8)
        joints4 = np.zeros((len(jnt), 4), np.uint8)
        joints4[:, 0] = jnt
        weights4 = np.zeros((len(jnt), 4), np.uint8)
        weights4[:, 0] = 255
        indices = np.concatenate(idx).astype(np.uint16)
        prim = {
            'attributes': {
                'POSITION': w.accessor(pos, 5126, 'VEC3', target=34962, minmax=True),
                'NORMAL': len(w.accessors),
            },
            'indices': None,
            'material': 0,
        }
        # normal int8 dengan stride 4 byte (tiga komponen + pengisi)
        w.view(nor8.tobytes(), 34962, 4)
        w.accessors.append({'bufferView': len(w.views) - 1, 'componentType': 5120, 'count': len(nor8), 'type': 'VEC3', 'normalized': True})
        prim['attributes']['TEXCOORD_0'] = w.accessor(uv16, 5123, 'VEC2', normalized=True, target=34962)
        prim['attributes']['JOINTS_0'] = w.accessor(joints4, 5121, 'VEC4', target=34962)
        prim['attributes']['WEIGHTS_0'] = w.accessor(weights4, 5121, 'VEC4', normalized=True, target=34962)
        prim['indices'] = w.accessor(indices.reshape(-1, 1), 5123, 'SCALAR', target=34963)
        meshes.append({'name': f'character-{name}', 'primitives': [prim]})
        nodes.append({'name': f'character-{name}', 'mesh': len(meshes) - 1, 'skin': 0})
        nodes[0]['children'].append(len(nodes) - 1)
        print(f'{name}: {len(pos)} titik, {len(indices) // 3} segitiga')

    skin = {'joints': list(range(1, 8)), 'inverseBindMatrices': w.accessor(ibm, 5126, 'MAT4')} if meshes else None
    # animasi: hanya klip yang dipakai, target tulang (indeks node 1..7 sama dengan sumber)
    animations = []
    for anim in ref['animations']:
        if anim['name'] not in clips:
            continue
        samplers = []
        for s in anim['samplers']:
            inp = read(ref, ref_bin, s['input']).astype(np.float32)
            out = read(ref, ref_bin, s['output']).astype(np.float32)
            src_type = ref['accessors'][s['output']]['type']
            samplers.append({
                'input': w.accessor(inp, 5126, 'SCALAR', minmax=True),
                'output': w.accessor(out, 5126, src_type),
                'interpolation': s.get('interpolation', 'LINEAR'),
            })
        channels = [{'sampler': c['sampler'], 'target': c['target']} for c in anim['channels']]
        animations.append({'name': anim['name'], 'samplers': samplers, 'channels': channels})

    out = {
        'asset': {'version': '2.0', 'generator': 'pulau-tropis pack-penduduk.py (Kenney Mini Characters, CC0)'},
        'scene': 0,
        'scenes': [{'nodes': [0]}],
        'nodes': nodes,
        'animations': animations,
        'accessors': w.accessors,
        'bufferViews': w.views,
        'buffers': [{'byteLength': 0}],
    }
    if meshes:
        png = open(os.path.join(folder, 'Textures', 'colormap.png'), 'rb').read()
        image_view = w.view(png)
        out.update({
            'extensionsUsed': ['KHR_mesh_quantization'],
            'extensionsRequired': ['KHR_mesh_quantization'],
            'meshes': meshes,
            'skins': [skin],
            'materials': [{'name': 'colormap', 'pbrMetallicRoughness': {'baseColorTexture': {'index': 0}, 'metallicFactor': 0, 'roughnessFactor': 1}}],
            'textures': [{'source': 0, 'sampler': 0}],
            'samplers': [{'magFilter': 9728, 'minFilter': 9728}],
            'images': [{'name': 'colormap', 'bufferView': image_view, 'mimeType': 'image/png'}],
        })
    while len(w.bin) % 4:
        w.bin.append(0)
    out['buffers'][0]['byteLength'] = len(w.bin)
    js = json.dumps(out, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    total = 12 + 8 + len(js) + 8 + len(w.bin)
    blob = struct.pack('<III', 0x46546C67, 2, total) + struct.pack('<II', len(js), 0x4E4F534A) + js
    blob += struct.pack('<II', len(w.bin), 0x004E4942) + bytes(w.bin)
    open(dst, 'wb').write(blob)
    print(f'{dst}: {total // 1024} KB, {len(animations)} animasi')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], *sys.argv[3:4])
