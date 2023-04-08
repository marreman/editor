export class Program {
  constructor(editor, keyboard) {
    this.editor = editor
    this.keyboard = keyboard
  }

  start() {
    this.keyboard.on("ArrowRight", () => this.editor.selectNext())
    this.keyboard.on("ArrowLeft", () => this.editor.selectPrevious())
    this.keyboard.on("Alt+ArrowRight", () => this.editor.moveForward())
    this.keyboard.on("Alt+ArrowLeft", () => this.editor.moveBackward())
    this.keyboard.on(",", () => this.editor.insert(", "))
    this.keyboard.on(".", () => this.editor.insert(". "))
    this.keyboard.on(" ", (event) => {
      event.preventDefault()
      this.editor.insert(" ")
    })

    document.addEventListener("paste", (event) => {
      const text = event.clipboardData.getData("text")
      document.body.textContent = text
    })
  }
}
