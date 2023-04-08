import { Editor } from "./Editor.mjs"
import { Program } from "./Program.mjs"
import { Keyboard } from "./Keyboard.mjs"

const program = new Program(new Editor(), new Keyboard())

program.start()
