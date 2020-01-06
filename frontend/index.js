loadHomeScreen()

function loadHomeScreen() {
  let container = document.getElementById('game-container')
  let welcomeMessage = document.createElement('h2')
  welcomeMessage.innerText = "Welcome to Scribbler!"
  container.appendChild(welcomeMessage)
}
