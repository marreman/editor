import { keyboard } from "./keyboard.mjs"
import { split, trimStart, trimEnd, juxt } from "./util.mjs"

const addPeriod = (string, index) => {
  const [beginning, end] = juxt(split(string, index), [trimEnd, trimStart])
  const [firstLetter, restOfEnd] = split(end, 1)
  return beginning + ". " + firstLetter.toUpperCase() + restOfEnd
}

const addComma = (string, index) => {
  const [beginning, end] = juxt(split(string, index), [trimEnd, trimStart])
  return beginning + ", " + end
}

const addSpace = (string, index) => {
  const [beginning, end] = juxt(split(string, index), [trimEnd, trimStart])
  return beginning + " " + end
}

const selection = (() => {
  document.addEventListener("selectionchange", () => {
    console.log("selection change", window.getSelection().toString())
  })
  return {
    period() {
      const sel = window.getSelection()
      sel.focusNode.textContent = addPeriod(
        sel.focusNode.textContent,
        sel.focusOffset
      )
    },
    comma() {
      const sel = window.getSelection()
      sel.focusNode.textContent = addComma(
        sel.focusNode.textContent,
        sel.focusOffset
      )
    },
    space() {
      const sel = window.getSelection()
      sel.focusNode.textContent = addSpace(
        sel.focusNode.textContent,
        sel.focusOffset
      )
    },
    moveLeft() {
      const sel = window.getSelection()
      sel.collapseToStart()
      sel.modify("extend", "left", "word")
    },
    moveRight() {
      const sel = window.getSelection()
      sel.collapseToEnd()
      sel.modify("extend", "right", "word")
    },
  }
})()

keyboard.on(",", selection.comma)
keyboard.on(".", selection.period)
keyboard.on(" ", selection.space)
keyboard.on("ArrowLeft", selection.moveLeft)
keyboard.on("ArrowRight", selection.moveRight)
keyboard.on("Enter", () => console.log(window.focus()))
