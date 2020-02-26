class Game {
  constructor() {
    this.adapter = new GamesAdapter()
    this.alphabetize = false
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.startButton = document.getElementById('start-game')
    this.startButton.addEventListener('click', this.start.bind(this))
    this.gameContainer = document.getElementById('game-container')
  }

  start() {
    this.adapter.createGame()
    .then(game => {
      this.rounds = game.rounds.map(round => new Round(round, this))
      const roundOne = this.rounds.find(round => round.roundNumber === 1)
      roundOne.start()
    })
  }

  end() {
    this.calculatePoints()
    this.displayGameSummary()
    this.displayRoundsSummary()
    this.showWordDefinitionsOnHover()
  }

  showWordDefinitionsOnHover() {
    this.rounds.forEach(round => {
      round.words.words.forEach(word => {
        word.showWordDefinitionOnHover()
      })
    })
  }

  calculatePoints() {
    const gamePoints = this.rounds.map(round => round.points)
    this.totalPoints = gamePoints.reduce((acc, cv) => acc + cv)
  }

  displayGameSummary() {
    this.gameContainer.innerHTML = this.renderSummary()
    let button = document.getElementById('alphabetize')
    button.addEventListener('click', this.displayAlphabetizedWords.bind(this))
  }

  displayAlphabetizedWords() {
    this.alphabetize = true
    this.displayRoundsSummary()
    this.showWordDefinitionsOnHover()
//    let url = `http://localhost:3000/rounds/271/guessed_words`
//    let wordsArr

//    fetch(url)
//    .then(resp => resp.json())
//    .then(words => {
//      wordsArr = words

//      wordsArr.sort(function (a, b) {
//        let comparison
//        if (a.word > b.word) {
//          comparison = 1
//        } else {
//          comparison = -1
//        }
//        return comparison
//      })

//      this.wordsArr = wordsArr
//      console.log(this.wordsArr)
//    })
  }

  displayRoundsSummary() {
    const roundSummaries = this.rounds.map(round => round.renderSummary())
    this.roundsSummaryContainer = document.getElementById('rounds-summary-container')
    this.roundsSummaryContainer.innerHTML = roundSummaries.join('')
  }

  renderSummary() {
    return `
      <h2>You earned ${this.totalPoints} points!</h2>
      <button id="alphabetize">Alphabetize!</button>
      <div id=rounds-summary-container></div>
      <button class="btn btn-xl btn-outline-dark" onClick="window.location.reload();">New Game</button>
    `
  }
}
