class Game {
  constructor() {
    this.adapter = new GamesAdapter()
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
  }

  calculatePoints() {
    const gamePoints = this.rounds.map(round => round.points)
    this.totalPoints = gamePoints.reduce((acc, cv) => acc + cv)
  }

  displayGameSummary() {
    this.gameContainer.innerHTML = this.renderSummary()
  }

  displayRoundsSummary() {
    const roundSummaries = this.rounds.map(round => round.renderSummary())
    this.roundsSummaryContainer = document.getElementById('rounds-summary-container')
    this.roundsSummaryContainer.innerHTML = roundSummaries.join('')
  }

  renderSummary() {
    return `
      <h2>You earned ${this.totalPoints} points!</h2>
      <div id=rounds-summary-container></div>
      <button class="btn btn-xl btn-outline-dark" onClick="window.location.reload();">New Game</button>
    `
  }
}
