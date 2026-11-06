// HUD: objective, interaction prompt, toasts, inventory, document reader, menus.
const $ = id => document.getElementById(id)

export class UI {
  constructor(game) {
    this.game = game
    this.prompt = $('prompt')
    this.toastEl = $('toast')
    this.objective = $('objective')
    this.inventory = $('inventory')
    this.docEl = $('document')
    this.docTitle = $('doc-title')
    this.docText = $('doc-text')
    this.crosshair = $('crosshair')
    this.toastTimer = 0
    this.docOpen = false
    $('doc-close').addEventListener('click', e => { e.stopPropagation(); this.closeDocument() })
    $('doc-close').addEventListener('pointerdown', e => e.stopPropagation())
    this.docEl.addEventListener('pointerdown', e => e.stopPropagation())
    this._lastPrompt = null
    this._lastObjective = null
  }

  setPrompt(text) {
    if (text === this._lastPrompt) return
    this._lastPrompt = text
    const key = this.game.touch ? '' : '<kbd>E</kbd> '
    this.prompt.innerHTML = text ? key + escapeHtml(text) : ''
    this.prompt.classList.toggle('show', !!text)
    this.crosshair.classList.toggle('active', !!text)
    document.getElementById('btn-interact')?.classList.toggle('ready', !!text)
  }

  toast(text, secs = 3.5) {
    this.toastEl.textContent = text
    this.toastEl.classList.add('show')
    this.toastTimer = secs
    this.lastToast = text
  }

  setObjective(lines) {
    const html = lines.map(l => `<div class="${l.done ? 'done' : ''}">${l.done ? '✓' : '•'} ${escapeHtml(l.text)}</div>`).join('')
    if (html === this._lastObjective) return
    this._lastObjective = html
    this.objective.innerHTML = html
    this.objective.classList.remove('pulse'); void this.objective.offsetWidth; this.objective.classList.add('pulse')
  }

  updateInventory() {
    const g = this.game
    const keys = [...g.inventory.values()].map(i => `<span class="key">🔑 ${escapeHtml(i.name)}</span>`).join('')
    this.inventory.innerHTML = `${keys}<span>Photographs ${g.photos.size}/${g.photoTotal}</span>`
  }

  showDocument(doc) {
    this.docOpen = true
    this.docTitle.textContent = doc.title
    this.docText.textContent = doc.text
    this.docEl.classList.add('show')
    if (document.pointerLockElement) document.exitPointerLock()
    this.game.paused = true
  }

  closeDocument() {
    if (!this.docOpen) return
    this.docOpen = false
    this.docEl.classList.remove('show')
    this.game.paused = false
    this.game.resume?.()
  }

  update(dt) {
    if (this.toastTimer > 0) {
      this.toastTimer -= dt
      if (this.toastTimer <= 0) this.toastEl.classList.remove('show')
    }
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}
