class Words {
  constructor(roundId) {
    this.words = []
    this.roundId = roundId
    this.adapter = new WordsAdapter(this.roundId)
    this.initBindingsAndEventListeners()
    this.fetchAndLoadWords()
  }

  initBindingsAndEventListeners() {
    this.wordsContainer = document.getElementById('words-container')
    this.newWordContent = document.getElementById('new-word-content')
    this.newWordContent.onkeydown = function(e) {
      if (e.keycode === 13) {
        this.submitWord.bind(this)
      }
    }
    this.wordForm = document.getElementById('notepad')
    this.wordForm.addEventListener('submit', this.submitWord.bind(this))
  }

  submitWord(e) {
    e.preventDefault()
    const word = this.newWordContent.value
    this.createWord(word)
  }

  createWord(word) {
    this.newWordContent.value = ''
    this.adapter.createWord(word)
    .then(word => {
      this.words.push(new Word(word))
      this.render()
    })
    .catch(err => {
      console.log(err);
    }
  )}

  fetchAndLoadWords() {
    this.adapter.getWords()
    .then(words => words.forEach(word => this.words.push(new Word(word))))
    .then(() => this.render())
  }

  render() {
    this.wordsContainer.innerHTML = this.words.map(word => word.renderDiv()).join('')
  }
}
