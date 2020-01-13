class WordsAdapter {
  constructor(roundId) {
    this.roundId = roundId
    this.baseUrl = `http://localhost:3000/rounds/${this.roundId}/guessed_words`
  }

  getWords() {
    return fetch(this.baseUrl).then(res => res.json())
  }

  createWord(word) {
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "word": word,
        "points": 5
      })
    }

    return fetch(this.baseUrl, configurationObject)
    .then(resp => resp.json())
  }
}
