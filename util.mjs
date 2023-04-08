export const split = (s, at) => [s.slice(0, at), s.slice(at)]
export const trimStart = (s) => s.trimStart()
export const trimEnd = (s) => s.trimEnd()
export const juxt = (xs, fs) =>
  xs.map((x, i) => (fs[i] instanceof Function ? fs[i](x) : x))
export const capitalize = (string) => {
  const [firstLetter, rest] = split(string, 1)
  return firstLetter.toUpperCase() + rest
}
export const decapitalize = (string) => {
  const [firstLetter, rest] = split(string, 1)
  return firstLetter.toLowerCase() + rest
}
