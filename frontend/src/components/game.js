class Game {
  constructor() {
    this.adapter = new GamesAdapter()
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.startButton = document.getElementById('start-game')
    this.startButton.addEventListener('click', this.createGame.bind(this))
    this.gameContainer = document.getElementById('game-container')
  }

  createGame() {
    this.adapter.createGame()
    .then(game => {
      this.rounds = game.rounds.map(round => new Round(round, this))
      const roundOne = this.rounds.find(round => round.roundNumber === 1)
      roundOne.begin()
    })
  }

  end() {
    this.calculatePoints()
    this.gameContainer.innerHTML = this.renderSummary()
  }

  renderSummary() {
    return `
      <h2>You earned ${this.totalPoints} points!</h2>
      <button onClick="window.location.reload();">New Game</button>
    `
  }

  calculatePoints() {
    let gamePoints = this.rounds.map(round => round.points)
    this.totalPoints = gamePoints.reduce((acc, cv) => acc + cv)
  }

}
