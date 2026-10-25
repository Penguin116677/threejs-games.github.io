"""Buang badan, kulit (skin), bahan, dan tekstur dari GLB karakter Kenney: sisakan rangka + animasi.

Sejak v0.16.0 badan semua karakter dibuat di kode (src/tokoh/rupa.js); dari file Kenney hanya rangka
7 tulang (simpul bernama root, leg-left, leg-right, torso, arm-left, arm-right, head) dan klip
animasinya yang dipakai. Simpul yang hanya berisi mesh dibuang, indeks simpul di adegan, anak, dan
kanal animasi disesuaikan, dan buffer hanya berisi data animasi. Kanal geser / skala yang di SEMUA
klip selalu sama dengan pose diam dibuang (tidak ada klip yang pernah mengubahnya, jadi hasilnya sama
persis), dan accessor yang isinya kembar dipakai bersama.

Pemakaian: python3 scripts/rangka-glb.py <masukan.glb> <keluaran.glb> [klip,klip,…]
(daftar klip = hanya klip itu yang disimpan; bawaan: semua)
"""
import json
import struct
import sys

import numpy as np

COMP = {5126: np.float32, 5123: np.uint16, 5121: np.uint8, 5125: np.uint32, 5120: np.int8, 5122: np.int16}
NCOMP = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}


def read_glb(path):
    b = open(path, 'rb').read()
    n = struct.unpack('<I', b[12:16])[0]
    doc = json.loads(b[20:20 + n])
    off = 20 + n
    bn = struct.unpack('<I', b[off:off + 4])[0]
    return doc, b[off + 8:off + 8 + bn]


def write_glb(path, doc, binary):
    js = json.dumps(doc, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    binary += b'\0' * ((4 - len(binary) % 4) % 4)
    total = 12 + 8 + len(js) + 8 + len(binary)
    with open(path, 'wb') as f:
        f.write(struct.pack('<III', 0x46546C67, 2, total))
        f.write(struct.pack('<II', len(js), 0x4E4F534A) + js)
        f.write(struct.pack('<II', len(binary), 0x004E4942) + binary)


def main(src, dst, clips=None):
    doc, binary = read_glb(src)
    if clips:
        doc['animations'] = [a for a in doc.get('animations', []) if a['name'] in clips]
    nodes = doc['nodes']
    # simpul yang dipertahankan: semua kecuali yang hanya membawa mesh
    keep = [i for i, n in enumerate(nodes) if 'mesh' not in n or n.get('children')]
    remap = {old: new for new, old in enumerate(keep)}
    out_nodes = []
    for i in keep:
        n = {k: v for k, v in nodes[i].items() if k not in ('mesh', 'skin')}
        if 'children' in n:
            n['children'] = [remap[c] for c in n['children'] if c in remap]
            if not n['children']:
                del n['children']
        out_nodes.append(n)
    scenes = []
    for s in doc['scenes']:
        s = dict(s)
        s['nodes'] = [remap[c] for c in s['nodes'] if c in remap]
        scenes.append(s)
    # accessor animasi → buffer baru
    accessors = doc['accessors']
    views = doc['bufferViews']

    def values(a):
        acc = accessors[a]
        v = views[acc['bufferView']]
        n = NCOMP[acc['type']]
        start = v.get('byteOffset', 0) + acc.get('byteOffset', 0)
        return np.frombuffer(binary, dtype=COMP[acc['componentType']], count=acc['count'] * n, offset=start).reshape(acc['count'], n)

    # kanal (simpul, jalur) yang tidak pernah lepas dari pose diam di semua klip
    rest = {'translation': lambda n: n.get('translation', [0, 0, 0]), 'scale': lambda n: n.get('scale', [1, 1, 1])}
    still = {}
    for anim in doc.get('animations', []):
        for c in anim['channels']:
            path = c['target']['path']
            if path not in rest:
                continue
            key = (c['target']['node'], path)
            out = values(anim['samplers'][c['sampler']]['output'])
            same = np.allclose(out, np.array(rest[path](nodes[key[0]]), dtype=np.float64), atol=1e-6)
            still[key] = still.get(key, True) and same
    dead = {k for k, v in still.items() if v}
    new_acc = []
    new_views = []
    chunks = []
    size = 0
    acc_map = {}
    by_content = {}

    def copy_accessor(a):
        nonlocal size
        if a in acc_map:
            return acc_map[a]
        acc = dict(accessors[a])
        v = views[acc['bufferView']]
        start = v.get('byteOffset', 0) + acc.pop('byteOffset', 0)
        n = NCOMP[acc['type']]
        data = binary[start:start + acc['count'] * n * np.dtype(COMP[acc['componentType']]).itemsize]
        key = (acc['componentType'], acc['type'], data)
        if key in by_content:
            acc_map[a] = by_content[key]
            return acc_map[a]
        pad = (4 - size % 4) % 4
        chunks.append(b'\0' * pad)
        size += pad
        nv = {'buffer': 0, 'byteOffset': size, 'byteLength': len(data)}
        if 'byteStride' in v:
            nv['byteStride'] = v['byteStride']
        chunks.append(data)
        size += len(data)
        new_views.append(nv)
        acc['bufferView'] = len(new_views) - 1
        new_acc.append(acc)
        acc_map[a] = len(new_acc) - 1
        by_content[key] = acc_map[a]
        return acc_map[a]

    animations = []
    for anim in doc.get('animations', []):
        samplers = []
        channels = []
        for c in anim['channels']:
            node = c['target']['node']
            if node not in remap or (node, c['target']['path']) in dead:
                continue
            s = anim['samplers'][c['sampler']]
            samplers.append({**s, 'input': copy_accessor(s['input']), 'output': copy_accessor(s['output'])})
            channels.append({'sampler': len(samplers) - 1, 'target': {**c['target'], 'node': remap[node]}})
        animations.append({**anim, 'samplers': samplers, 'channels': channels})
    out = {
        'asset': doc['asset'],
        'scene': doc.get('scene', 0),
        'scenes': scenes,
        'nodes': out_nodes,
        'animations': animations,
        'accessors': new_acc,
        'bufferViews': new_views,
        'buffers': [{'byteLength': size}],
    }
    write_glb(dst, out, b''.join(chunks))
    print(f'{src} → {dst}: {len(out_nodes)} simpul, {len(animations)} animasi, {sum(len(a["channels"]) for a in animations)} kanal '
          f'({len(dead)} kanal diam dibuang), {len(new_acc)} accessor, {size} byte data')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3].split(',') if len(sys.argv) > 3 else None)
