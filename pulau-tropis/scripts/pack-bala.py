"""Kemas model pelengkap bala tentara Kerajaan Kencana menjadi satu GLB kecil: bala.glb.

Isi: kuda dari Kenney "Prototype Kit" (animal-horse: 8 bagian kaku dengan susunan node aslinya,
jadi titik putar kaki/leher/kepala/ekor tetap) dan dua perisai dari Kenney "Mini Dungeon"
(shield-rectangle, shield-round). Semua CC0.

Tekstur tidak ikut: semua uv dipetakan ulang ke palet colormap Kenney "Mini Arena" yang sudah ada di
prajurit.glb, jadi prajurit, senjata, dan kuda digambar dengan SATU tekstur. Perisai: warna tiap
titik dicocokkan ke kotak palet terdekat. Kuda: warna per bagian (badan cokelat, kaki cokelat tua,
kaki & ekor gelap).

Pemakaian:
  python3 scripts/pack-bala.py "<folder Kenney 3D assets>" public/models/prajurit.glb public/models/bala.glb
"""
import io
import json
import os
import struct
import sys

import numpy as np
from PIL import Image

COMP = {5126: np.float32, 5123: np.uint16, 5121: np.uint8, 5125: np.uint32, 5120: np.int8, 5122: np.int16}
NCOMP = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}
GRID = 8  # palet Kenney: 8 × 8 kotak warna


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


def glb_image(gltf, binary):
    view = gltf['bufferViews'][gltf['images'][0]['bufferView']]
    start = view.get('byteOffset', 0)
    return Image.open(io.BytesIO(binary[start:start + view['byteLength']])).convert('RGB')


def palette(img):
    """warna tengah tiap kotak palet → (warna[64×3], uv tengah[64×2])"""
    w, h = img.size
    cols, uvs = [], []
    for j in range(GRID):
        for i in range(GRID):
            cols.append(img.getpixel((int((i + 0.5) * w / GRID), int((j + 0.5) * h / GRID))))
            uvs.append(((i + 0.5) / GRID, (j + 0.5) / GRID))
    return np.array(cols, np.float32), np.array(uvs, np.float32)


class Writer:
    def __init__(self):
        self.bin = bytearray()
        self.views = []
        self.accessors = []

    def accessor(self, arr, ctype, atype, target=None, minmax=False):
        while len(self.bin) % 4:
            self.bin.append(0)
        raw = arr.tobytes()
        v = {'buffer': 0, 'byteOffset': len(self.bin), 'byteLength': len(raw)}
        if target:
            v['target'] = target
        self.views.append(v)
        self.bin.extend(raw)
        a = {'bufferView': len(self.views) - 1, 'componentType': ctype, 'count': int(arr.shape[0]), 'type': atype}
        if minmax:
            a['min'] = [float(x) for x in arr.min(0)]
            a['max'] = [float(x) for x in arr.max(0)]
        self.accessors.append(a)
        return len(self.accessors) - 1

    def mesh(self, name, pos, nor, uv, idx):
        prim = {
            'attributes': {
                'POSITION': self.accessor(pos.astype(np.float32), 5126, 'VEC3', 34962, minmax=True),
                'NORMAL': self.accessor(nor.astype(np.float32), 5126, 'VEC3', 34962),
                'TEXCOORD_0': self.accessor(uv.astype(np.float32), 5126, 'VEC2', 34962),
            },
            'indices': self.accessor(idx.astype(np.uint16), 5123, 'SCALAR', 34963),
        }
        return {'name': name, 'primitives': [prim]}


def mesh_data(gltf, binary, mesh_index):
    prim = gltf['meshes'][mesh_index]['primitives'][0]
    at = prim['attributes']
    return (read(gltf, binary, at['POSITION']), read(gltf, binary, at['NORMAL']),
            read(gltf, binary, at['TEXCOORD_0']), read(gltf, binary, prim['indices']).reshape(-1))


def main(kenney, soldier_glb, dst):
    sg, sb = load(soldier_glb)
    arena_cols, arena_uvs = palette(glb_image(sg, sb))
    cell_uv = lambda i, j: arena_uvs[j * GRID + i]
    w = Writer()
    nodes = [{'name': 'bala', 'children': []}]
    meshes = []

    # --- kuda: susunan node asli (root → torso → kaki/leher → kepala, ekor)
    horse, hb = load(os.path.join(kenney, 'Prototype Kit/Models/GLB format/animal-horse.glb'))
    # kuda cokelat tua dengan kaki & ekor gelap (palet Mini Arena: [kolom, baris])
    colors = {'torso': (6, 7), 'neck': (6, 7), 'head': (6, 7), 'tail': (1, 7),
              'leg-back-left': (1, 6), 'leg-back-right': (1, 6), 'leg-front-left': (1, 6), 'leg-front-right': (1, 6)}
    remap = {}

    def copy_node(i):
        src = horse['nodes'][i]
        node = {k: v for k, v in src.items() if k in ('name', 'translation', 'rotation', 'scale')}
        node['name'] = 'kuda' if src['name'] == 'animal-horse' else src['name']
        nodes.append(node)
        me = len(nodes) - 1
        remap[i] = me
        if 'mesh' in src:
            pos, nor, _, idx = mesh_data(horse, hb, src['mesh'])
            uv = np.tile(cell_uv(*colors[src['name']]), (len(pos), 1))
            meshes.append(w.mesh(src['name'], pos, nor, uv, idx))
            node['mesh'] = len(meshes) - 1
        kids = [copy_node(c) for c in src.get('children', [])]
        if kids:
            node['children'] = kids
        return me

    nodes[0]['children'].append(copy_node(0))

    # --- perisai Mini Dungeon: uv → kotak palet Mini Arena dengan warna terdekat
    for name in ('shield-rectangle', 'shield-round'):
        g, b = load(os.path.join(kenney, f'Mini Dungeon/Models/GLB format/{name}.glb'))
        tex = Image.open(os.path.join(kenney, 'Mini Dungeon/Models/GLB format/Textures/colormap.png')).convert('RGB')
        pos, nor, uv, idx = mesh_data(g, b, 0)
        tw, th = tex.size
        src = np.array([tex.getpixel((min(tw - 1, int(u * tw)), min(th - 1, int(v * th)))) for u, v in uv], np.float32)
        near = ((src[:, None, :] - arena_cols[None, :, :]) ** 2).sum(2).argmin(1)
        meshes.append(w.mesh(name, pos, nor, arena_uvs[near], idx))
        nodes.append({'name': name, 'mesh': len(meshes) - 1})
        nodes[0]['children'].append(len(nodes) - 1)
        err = np.sqrt(((src - arena_cols[near]) ** 2).sum(1)).max()
        print(f'{name}: {len(pos)} titik, selisih warna terbesar {err:.1f}')

    gltf = {
        'asset': {'version': '2.0', 'generator': 'pulau-tropis pack-bala.py'},
        'scene': 0,
        'scenes': [{'nodes': [0]}],
        'nodes': nodes,
        'meshes': meshes,
        'accessors': w.accessors,
        'bufferViews': w.views,
        'buffers': [{'byteLength': len(w.bin)}],
    }
    js = json.dumps(gltf, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    while len(w.bin) % 4:
        w.bin.append(0)
    out = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(w.bin))
    out += struct.pack('<II', len(js), 0x4E4F534A) + js
    out += struct.pack('<II', len(w.bin), 0x004E4942) + bytes(w.bin)
    open(dst, 'wb').write(out)
    print(f'{dst}: {len(out) // 1024} KB, {len(meshes)} mesh')


if __name__ == '__main__':
    main(*sys.argv[1:4])
