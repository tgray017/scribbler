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
      this.rounds = game.rounds.map(round => new Round(round))
      this.beginRoundOne()
    })
  }

  beginRoundOne() {
    const round = this.rounds.find(round => round.roundNumber === 1)
    const rules = round.rules()
    this.gameContainer.innerHTML = round.render()
  }

}
