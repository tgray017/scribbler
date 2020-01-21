class Timer {
  constructor(round) {
    this.time = 31
    this.round = round
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.timerContainer = document.getElementById('timer-container')
    this.timer = document.getElementById('timer')
    this.forwardButton = document.getElementById('timer-forward')
    this.forwardButton.addEventListener('click', this.forward.bind(this))
  }

  start() {
    this.interval = setInterval(this.countDown.bind(this), 1000)
  }

  end() {
    clearInterval(this.interval)
    this.disableForwardButton()
    this.round.end()
  }

  countDown() {
    (this.time <= 0) ? this.end() : this.time -= 1
    this.timer.innerHTML = this.renderTimer()
  }

  forward() {
    (this.time <= 5) ? this.time = 0 : this.time -= 5
    this.timer.innerHTML = this.renderTimer()
  }

  disableForwardButton() {
    this.forwardButton.disabled = true
  }

  renderTimer() {
    return `00:${('0' + this.time).slice(-2)}`
  }
}
