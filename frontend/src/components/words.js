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
      this.displayWords()
    })
    .catch(err => {
      if (err.message === "Word must be unique for the current round") {
        this.flashScreen('orange')
      } else {
        this.flashScreen('red')
      }
      console.log(err.message)
    }
  )}

  flashScreen(color) {
    this.addFlash(color)
    setTimeout(this.removeFlash, 100, color)
  }

  addFlash(color) {
    let body = document.getElementsByTagName("body")[0]
    let main = document.getElementsByTagName("main")[0]

    body.setAttribute("class", `flash-${color}`)
    main.setAttribute("class", "move-back")
  }

  removeFlash(color) {
    let body = document.getElementsByTagName("body")[0]
    let main = document.getElementsByTagName("main")[0]

    body.classList.remove(`flash-${color}`)
    main.classList.remove("move-back")
  }

  fetchAndLoadWords() {
    this.adapter.getWords()
    .then(words => words.forEach(word => this.words.push(new Word(word))))
    .then(() => this.displayWords())
  }

  displayWords() {
    this.wordsContainer.innerHTML = this.words.map(word => word.renderWord()).join('')
  }
}
