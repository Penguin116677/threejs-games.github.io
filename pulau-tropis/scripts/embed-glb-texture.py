"""Gabungkan tekstur eksternal (uri) ke dalam file GLB agar menjadi satu file mandiri.

Pemakaian: python3 scripts/embed-glb-texture.py <masuk.glb> <keluar.glb>
Gambar dengan "uri" relatif dibaca dari folder file masukan lalu disimpan di chunk BIN.
"""
import json
import os
import struct
import sys


def pad(b, fill):
    return b + fill * ((4 - len(b) % 4) % 4)


def main(src, dst):
    data = open(src, 'rb').read()
    magic, version, _ = struct.unpack('<III', data[:12])
    assert magic == 0x46546C67, 'bukan file GLB'
    jlen, jtype = struct.unpack('<II', data[12:20])
    gltf = json.loads(data[20:20 + jlen])
    off = 20 + jlen
    blen, btype = struct.unpack('<II', data[off:off + 8])
    binary = bytearray(data[off + 8:off + 8 + blen])

    for img in gltf.get('images', []):
        uri = img.pop('uri', None)
        if not uri:
            continue
        raw = open(os.path.join(os.path.dirname(src), uri), 'rb').read()
        while len(binary) % 4:
            binary.append(0)
        gltf.setdefault('bufferViews', []).append({'buffer': 0, 'byteOffset': len(binary), 'byteLength': len(raw)})
        img['bufferView'] = len(gltf['bufferViews']) - 1
        img['mimeType'] = 'image/png' if uri.lower().endswith('.png') else 'image/jpeg'
        binary.extend(raw)

    binary = pad(bytes(binary), b'\0')
    gltf['buffers'][0]['byteLength'] = len(binary)
    jbytes = pad(json.dumps(gltf, separators=(',', ':')).encode(), b' ')
    total = 12 + 8 + len(jbytes) + 8 + len(binary)
    out = struct.pack('<III', magic, version, total)
    out += struct.pack('<II', len(jbytes), 0x4E4F534A) + jbytes
    out += struct.pack('<II', len(binary), 0x004E4942) + binary
    open(dst, 'wb').write(out)
    print(f'{dst}: {total // 1024} KB')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
