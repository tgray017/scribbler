class WordsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/guessed_words'
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
    .then(res => res.json())
  }
}
