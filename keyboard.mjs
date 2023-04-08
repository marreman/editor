export class Keyboard {
  constructor() {
    this.listeners = {}

    document.addEventListener("keydown", (event) => {
      this.trigger(new KeyboardEvent(event))
    })
  }

  trigger(keyboardEvent) {
    const fn = this.listeners[keyboardEvent.chord]
    if (!fn) return
    fn(keyboardEvent.event)
  }

  on(chord, f) {
    this.listeners[chord] = f
  }
}

class KeyboardEvent {
  constructor(event) {
    this.event = event
  }

  get chord() {
    return [
      this.event.shiftKey && "Shift",
      this.event.altKey && "Alt",
      this.event.ctrlKey && "Control",
      this.event.key,
    ]
      .filter(Boolean)
      .join("+")
  }
}
