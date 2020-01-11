class Word {
  constructor(wordJSON) {
    this.word = wordJSON.word
    this.id = wordJSON.id
    this.points = wordJSON.points
  }

  renderDiv() {
    return `
      <div id='word-${this.id}'>
        <div class='word-body'>${this.word}</div>
        <div class='word-points'>${this.points}</div>
      </div>
    `
  }
}
