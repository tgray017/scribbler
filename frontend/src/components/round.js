class Round {
  constructor(roundJSON, gameObject) {
    this.game = gameObject
    this.id = roundJSON.id
    this.roundNumber = roundJSON.round_number
    this.firstLetter = roundJSON.first_letter
    this.lastLetter = roundJSON.last_letter
  }

  start() {
    this.game.gameContainer.innerHTML = this.renderRound()
    this.timer = new Timer(this)
    this.words = new Words(this.id)
    this.timer.start()
  }

  end() {
    this.disableNotepad()
    this.calculatePoints()
    if (this.roundNumber < this.game.rounds.length) {
      const button = this.createNextRoundButton()
      const nextRound = this.game.rounds.find(round => round.roundNumber === this.roundNumber + 1)
      button.addEventListener('click', nextRound.start.bind(nextRound))
      this.game.gameContainer.appendChild(button)
    } else {
      this.game.end()
    }
  }

  disableNotepad() {
    this.words.newWordContent.disabled = true
  }

  calculatePoints() {
    const roundWords = this.words.words
    if (roundWords.length === 0) {
      this.points = 0
    } else {
      const pointsArray = roundWords.map(word => word.points)
      this.points = pointsArray.reduce((acc, cv) => acc + cv)
    }
  }

  createNextRoundButton() {
    const nextRoundButton = document.createElement('button')
    nextRoundButton.setAttribute("id", "next-round")
    nextRoundButton.setAttribute("class", "btn btn-xl btn-outline-dark")
    nextRoundButton.innerHTML = "Next Round"
    return nextRoundButton
  }

  renderRound() {
    return `
    <div id="rules-container">
      <h2>Can you name...</h2>
      <h3>${this.renderRules()}</h3>
    </div>
    <div id="timer-container" class="container d-flex">
      <div id="timer"></div>
      <button id="timer-forward" class="btn btn-sm btn-outline-dark">>></button>
    </div>
    <form id="notepad">
      <input type="text" id="new-word-content" class="form-control border-0" placeholder="Start typing!">
    </form>
    <div id="words-container">

    </div>
    `
  }

  renderRules() {
    return `Words that start with '${this.firstLetter.toUpperCase()}' and end with '${this.lastLetter.toUpperCase()}'`
  }

  renderSummary() {
   return `
    <h3>Round ${this.roundNumber}</h3>
    ${this.renderSummaryWords()}
   `
  }

  renderSummaryWords() {
    if (this.words.words.length === 0) {
      return "<p>You guessed no words this round!</p>"
    } else {
      let wordsArr = this.words.words

      if (this.game.alphabetize) {
        wordsArr.sort(function (a, b) {
          let comparison
          if (a.word > b.word) {
            comparison = 1
          } else {
            comparison = -1
          }
          return comparison
        })
      }

      return wordsArr.map(word => word.renderWord()).join('')
    }
  }


}
