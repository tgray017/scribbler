class Word {
  constructor(wordJSON) {
    this.word = wordJSON.word
    this.id = wordJSON.id
    this.points = wordJSON.points
    this.definitions = wordJSON.definition
  }

  showWordDefinitionOnHover() {
    // need JQuery here to take advantage of Bootstrap JS
    $(function () {
      $('[data-toggle="popover"]').popover({
        placement : 'auto',
        trigger : 'hover',
        container : 'body',
        boundary : 'window'
      })
    })
  }

  renderWord() {
    return `
      <div class="card border-0 shadow mb-4">
        <div id='word-${this.id}' class="card-body" data-toggle="popover" data-placement="bottom" title="${this.word}" data-content="${this.renderDefinitions()}" data-html="true">
          <div class='word-body'>${this.word}</div>
          <div class='word-points'>${this.points}</div>
        </div>
      </div>
    `
  }

  renderDefinitions() {
    let outerDiv = document.createElement('div')

    for (let partOfSpeech of Object.keys(this.definitions)) {
      let innerDiv = document.createElement('div')
      innerDiv.innerHTML = `<i>${partOfSpeech}</i>`

      let ul = document.createElement('ul')
      for (let definition of this.definitions[`${partOfSpeech}`]) {
        let li = document.createElement('li')
        li.innerHTML = definition
        ul.appendChild(li)
      }

      innerDiv.appendChild(ul)
      outerDiv.appendChild(innerDiv)
    }

    return outerDiv.innerHTML
  }

}
