import { Editor } from "./Editor.mjs"
import { Program } from "./Program.mjs"
import { Keyboard } from "./Keyboard.mjs"

window.program = new Program(new Editor(), new Keyboard())
window.program.start()
