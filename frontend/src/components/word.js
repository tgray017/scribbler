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
      $('[data-toggle="popover"]').popover()
    })

    $(`#word-${this.id}`).on('mouseenter', function() {
      $(this).popover('show')
    })

    $(`#word-${this.id}`).on('mouseleave', function() {
      $(this).popover('hide')
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
    let div = document.createElement('div')
    let ul = document.createElement('ul')
    this.definitions.map(def => {
      let li = document.createElement('li')
      li.innerHTML = def
      ul.appendChild(li)
    })
    div.appendChild(ul)
    return div.innerHTML
  }
  
}
