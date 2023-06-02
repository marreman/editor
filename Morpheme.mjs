export class Morpheme {
  constructor(string, index) {
    this.string = string
    this.index = index
    this.length = string.length
  }

  shift(n) {
    return new this.constructor(this.string, this.index + n)
  }

  static fromRegExpMatch(match) {
    if (match && match[0]) {
      return new Word(match[0], match.index)
    }
  }
}

export class Word extends Morpheme {
  static pattern = /[^(,|\.)?\s+]+/g

  static first(string) {
    const matches = [...string.matchAll(Word.pattern)]
    return Morpheme.fromRegExpMatch(matches[0])
  }

  static last(string) {
    const matches = [...string.matchAll(Word.pattern)]
    return Morpheme.fromRegExpMatch(matches[matches.length - 1])
  }
}

export class Sentence extends Morpheme {
  static pattern = /.*\.\s+/g

  static first(string) {
    const matches = [...string.matchAll(Sentence.pattern)]
    return Morpheme.fromRegExpMatch(matches[0])
  }

  static last(string) {
    const matches = [...string.matchAll(Sentence.pattern)]
    return Morpheme.fromRegExpMatch(matches[matches.length - 1])
  }
}

export class Punctuation extends Morpheme {
  static pattern = /(,|\.)?\s+/g

  static first(string) {
    const matches = [...string.matchAll(Punctuation.pattern)]
    return Morpheme.fromMatch(matches[0])
  }

  static last(string) {
    const matches = [...string.matchAll(Punctuation.pattern)]
    return Morpheme.fromMatch(matches[matches.length - 1])
  }
}
