class Word {
  constructor(wordJSON) {
    this.word = wordJSON.word
    this.id = wordJSON.id
    this.points = wordJSON.points
  }

  renderWord() {
    return `
      <div class="card border-0 shadow mb-4">
        <div id='word-${this.id}' class="card-body">
          <div class='word-body'>${this.word}</div>
          <div class='word-points'>${this.points}</div>
        </div>
      </div>  
    `
  }
}
