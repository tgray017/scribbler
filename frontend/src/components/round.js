class Round {
  constructor(roundJSON) {
    this.adapter = new RoundsAdapter()
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

  render() {
    return `
    <div id="rules-container">
      <h2>Can you name...</h2>
      <h3>${this.rules()}</h3>
    </div>
    <form id="notepad">
      <input type="text" id="new-word-content">
    </form>
    <div id="words-container">

    </div>`
  }
}
