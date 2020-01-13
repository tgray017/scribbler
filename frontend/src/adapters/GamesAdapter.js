class GamesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/games'
  }

  createGame() {
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }

    return fetch(this.baseUrl, configurationObject)
    .then(resp => resp.json())
  }
}
