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
        "word": word
      })
    }

    return fetch(this.baseUrl, configurationObject)
    .then(resp => {
      return resp.json()
    })
    .then(json => {
      if (json.errors) {
        throw new Error (json.errors)
      } else {
        return json
      }
    })
  }
}
