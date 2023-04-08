export class Punctuation {
  static pattern = /\b(,|\.)?\s+/g

  static first(string) {
    const matches = [...string.matchAll(Punctuation.pattern)]
    return Punctuation.fromMatch(matches[0])
  }

  static last(string) {
    const matches = [...string.matchAll(Punctuation.pattern)]
    return Punctuation.fromMatch(matches[matches.length - 1])
  }

  static fromMatch(match) {
    if (match && match[0]) {
      return new Punctuation(match[0], match.index)
    }
  }

  constructor(string, index) {
    this.string = string
    this.index = index
    this.length = string.length
  }
}
