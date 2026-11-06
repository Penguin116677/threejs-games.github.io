# Third-party notices

Riverside Apartments ships the following third-party software. Its licence text must
be included with every distributed build (web, Android app bundle, store listing
"open-source licences" screen).

| Component | Version | Licence | Location |
| --- | --- | --- | --- |
| three.js | 0.160.0 (unmodified npm build) | MIT | `vendor/three/` — full text in `vendor/three/LICENSE` |

## Original content

Everything else is original to this project and generated in code at run time:

- Textures (brick, wallpaper, damask, marble, tiles, wood, carpet, concrete, signage,
  photographs, paper) — `src/materials.js`, `src/main.js`
- Sound (ambient drone, rain, footsteps, doors, switches, elevator, scare stingers) —
  synthesised with the Web Audio API in `src/audio.js`; no audio files
- Geometry, furniture and level layout — `src/level.js`, `src/props.js`, `src/builder.js`
- Story text and documents — `src/level.js`
- Fonts: the system serif/sans fonts already on the device (no bundled font files)

No assets from the `threejs-games.github.io` repository (or any other source of
unknown licence) are used.
