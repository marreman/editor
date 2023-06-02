import { Punctuation, Sentence, Word } from "./Morpheme.mjs"
import { capitalize, decapitalize } from "./util.mjs"

export class Editor {
  constructor() {
    // this.mode = Punctuation
    this.mode = Sentence
    console.log(this.mode)
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
    return this.node.textContent.slice(
      this.position + this.selection.toString().length
    )
  }

  select(index, length) {
    const range = document.createRange()
    range.setStart(this.node, index)
    range.setEnd(this.node, index + length)
    this.selection.removeAllRanges()
    this.selection.addRange(range)
  }

  selectNext() {
    const p = this.mode.first(this.after)
    if (p)
      this.select(
        p.shift(this.before.length + this.selection.toString().length).index,
        p.length
      )
  }

  selectPrevious() {
    const p = this.mode.last(this.before)
    if (p) this.select(p.index, p.length)
  }

  selectClosest() {
    if (this.selection.type !== "Caret") return

    const closestBefore = this.mode.last(this.before)
    const closestAfter = this.mode.first(this.after)?.shift(this.before.length)

    if (!closestAfter) this.selectPrevious()
    else if (!closestBefore) this.selectNext()
    else if (
      Math.abs(this.position - closestAfter.index) <
      Math.abs(this.position - closestBefore.index)
    ) {
      this.selectNext()
    } else {
      this.selectPrevious()
    }
  }

  moveBackward() {
    const toSwitchWith = this.mode.last(this.before)
    if (!toSwitchWith) return
    const textToMove = this.selection.toString()
    this.selection.deleteFromDocument()
    this.insert(toSwitchWith.string)
    this.selectPrevious()
    this.insert(textToMove)
  }

  moveForward() {
    const toSwitchWith = this.mode.first(this.after)
    if (!toSwitchWith) return
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
