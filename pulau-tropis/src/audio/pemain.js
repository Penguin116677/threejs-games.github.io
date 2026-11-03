// Bunyi gerak pemain (v0.25.0): langkah menurut permukaan (pasir, rumput, batu, papan kayu, salju,
// es, air dangkal) seirama fase langkah animasinya, lompat, mendarat (makin keras makin tinggi
// jatuhnya), tercebur, kayuhan renang, memanjat, dan dayung perahu seirama lajunya.
import { suara } from './suara.js'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function createPlayerSounds({ player, boat, ambience }) {
  let prevGait = player.gaitPhase ?? 0
  let prevStroke = player.strokePhase ?? 0
  let wasGrounded = true
  let wasSwimming = false
  let wasClimbing = false
  let airT = 0
  let minVy = 0
  let paddleT = 0
  const at = { x: 0, y: 0, z: 0 }

  function update(dt) {
    const p = player.position
    at.x = p.x
    at.y = p.y
    at.z = p.z
    if (player.defeated) {
      wasGrounded = player.grounded
      return
    }
    // di perahu: dayung seirama laju
    if (player.riding) {
      const v = boat.speed
      if (v > 0.5 && (paddleT -= dt) <= 0) {
        paddleT = clamp(1.5 - v * 0.17, 0.55, 1.5)
        suara.play('dayung', { at: boat.position, kuat: clamp(v / 4, 0.5, 1.1) })
      }
      wasGrounded = true
      wasSwimming = false
      return
    }
    const g = player.gaitPhase
    const v = player.speed
    // langkah: dua per putaran fase langkah
    if (player.grounded && !player.swimming && !player.climbing && v > 0.15)
      if ((prevGait < 0.5 && g >= 0.5) || g < prevGait) suara.play(ambience.surfaceName(p.x, p.z, p.y), { at, kuat: v > 2.6 ? 1 : 0.6 })

    prevGait = g
    // berenang: masuk air, lalu kayuhan
    if (player.swimming) {
      if (!wasSwimming) suara.play('cebur', { at, besar: clamp(-minVy / 6, 0.5, 1.4) })
      const s = player.strokePhase
      if (s < prevStroke) suara.play('renang', { at, kuat: v > 0.6 ? 1 : 0.55 })
      prevStroke = s
    }
    // lompat & mendarat
    if (wasGrounded && !player.grounded && !player.swimming && player.vy > 1.5) suara.play('lompat', { at })
    if (!player.grounded && !player.swimming) {
      airT += dt
      minVy = Math.min(minVy, player.vy)
    }
    if (player.grounded && !wasGrounded) {
      if (airT > 0.22 && !player.swimming) {
        const surf = ambience.surfaceName(p.x, p.z, p.y).replace('langkah-', '')
        suara.play('mendarat', { at, kuat: clamp(-minVy / 8, 0.4, 1.5), permukaan: surf })
      }
      airT = 0
      minVy = 0
    }
    if (player.grounded || player.swimming) {
      airT = 0
      if (player.grounded) minVy = 0
    }
    // memanjat tepi dermaga / batur
    if (player.climbing && !wasClimbing) suara.play('panjat', { at })
    wasGrounded = player.grounded
    wasSwimming = player.swimming
    wasClimbing = player.climbing
  }
  return { update }
}
