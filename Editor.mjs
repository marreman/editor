import { Punctuation } from "./Punctuation.mjs"
import { capitalize, decapitalize } from "./util.mjs"

export class Editor {
  constructor() {
    this.selectNext()
  }

  get selection() {
    return window.getSelection()
  }

  get node() {
    return this.selection.anchorNode ?? document.body.childNodes[0]
  }

  get position() {
    return this.selection.anchorOffset ?? 0
  }

  get before() {
    return this.node.textContent.slice(0, this.position)
  }

  get after() {
    return this.node.textContent.slice(this.position)
  }

  select(index, length) {
    const range = document.createRange()
    range.setStart(this.node, index)
    range.setEnd(this.node, index + length)
    this.selection.removeAllRanges()
    this.selection.addRange(range)
  }

  selectNext() {
    const p = Punctuation.first(this.after)
    if (p) this.select(this.before.length + p.index, p.length)
  }

  selectPrevious() {
    const p = Punctuation.last(this.before)
    if (p) this.select(p.index, p.length)
  }

  moveBackward() {
    const toSwitchWith = Punctuation.last(this.before)
    const textToMove = this.selection.toString()
    this.selection.deleteFromDocument()
    this.insert(toSwitchWith.string)
    this.selectPrevious()
    this.insert(textToMove)
  }

  moveForward() {
    const toSwitchWith = Punctuation.first(this.after)
    const textToMove = this.selection.toString()
    this.selection.deleteFromDocument()
    this.insert(toSwitchWith.string)
    this.selectNext()
    this.insert(textToMove)
  }

  insert(string) {
    this.selection.deleteFromDocument()
    const lastPosition = this.position
    this.node.textContent =
      this.before +
      string +
      (string.includes(".") ? capitalize(this.after) : decapitalize(this.after))
    this.select(lastPosition, string.length)
  }
}
