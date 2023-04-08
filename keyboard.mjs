export const keyboard = (() => {
  const listeners = {}

  document.addEventListener("keydown", (event) => {
    const chord = [
      event.shiftKey && "Shift",
      event.altKey && "Alt",
      event.ctrlKey && "Control",
      event.key,
    ]
      .filter(Boolean)
      .join("+")

    // console.log(chord)

    const fn = listeners[chord]

    if (!fn) return

    fn(event)
  })

  return {
    on(chord, f) {
      listeners[chord] = f
    },
  }
})()
