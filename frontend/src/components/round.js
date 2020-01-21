class Round {
  constructor(roundJSON, gameObject) {
    this.adapter = new RoundsAdapter()
    this.game = gameObject
    this.id = roundJSON.id
    this.gameId = roundJSON.game_id
    this.roundNumber = roundJSON.round_number
    this.firstLetter = roundJSON.first_letter
    this.lastLetter = roundJSON.last_letter

    //this.rules = `Words that start with '${this.firstLetter.toUpperCase()}' and end with '${this.lastLetter.toUpperCase()}'`
  }

  initBindingsAndEventListeners() {
    //this.gameContainer = document.getElementById('game-container')
  }

  rules() {
    return `Words that start with '${this.firstLetter.toUpperCase()}' and end with '${this.lastLetter.toUpperCase()}'`
  }

  begin() {
    this.gameContainer = document.getElementById('game-container')
    this.gameContainer.innerHTML = this.render()
    this.timer = new Timer(this)
    this.words = new Words(this.id)
    this.timer.start()
  }

  end() {
    this.calculatePoints()
    if (this.roundNumber < this.game.rounds.length) {
      let nextRoundButton = document.createElement('button')
      nextRoundButton.setAttribute("id", "next-round")
      nextRoundButton.innerHTML = "Next Round"
      let nextRoundNumber = this.roundNumber + 1
      let nextRound = this.game.rounds.find(round => round.roundNumber === nextRoundNumber)

      nextRoundButton.addEventListener('click', nextRound.begin.bind(nextRound))

      this.gameContainer.appendChild(nextRoundButton)
    } else {
      this.game.end()
    }
  }

  calculatePoints() {
    let roundWords = this.words.words
    if (roundWords.length === 0) {
      this.points = 0
    } else {
      let pointsArray = roundWords.map(word => word.points)
      this.points = pointsArray.reduce((acc, cv) => acc + cv)
    }
  }

  render() {
    return `
    <div id="rules-container">
      <h2>Can you name...</h2>
      <h3>${this.rules()}</h3>
    </div>
    <div id="timer-container">
      <div id="timer"></div>
      <button id="timer-forward">>></button>
    </div>
    <form id="notepad">
      <input type="text" id="new-word-content">
    </form>
    <div id="words-container">

    </div>
    `
  }

  renderSummary() {
   return `
    <h3>Round ${this.roundNumber}</h3>
    ${this.words.words.map(word => word.renderDiv()).join('')}
   `
  }
}
