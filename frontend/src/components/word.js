class Word {
  constructor(wordJSON) {
    this.word = wordJSON.word
    this.id = wordJSON.id
    this.points = wordJSON.points
    this.definition = "hello"
  }

  initModalOnHover() {
    console.log('inside the modal function')

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
        <div id='word-${this.id}' class="card-body" data-toggle="popover" title=${this.word} data-content=${this.definition} data-placement="bottom">
          <div class='word-body'>${this.word}</div>
          <div class='word-points'>${this.points}</div>
        </div>
      </div>
    `
  }
}
