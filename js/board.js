// Create a new game of life object
let gameOfLife = new GameOfLife("gameBoard");

// Add event listeners to the canvas to toggle cells on and off
document.getElementById("gameBoard").addEventListener("click", function(event) {
  let x = event.pageX - this.offsetLeft;
  let y = event.pageY - this.offsetTop;
  gameOfLife.toggleCell(x, y);
});

// Add event listener to the start/stop button to start and stop the game
document.getElementById("startStopButton").addEventListener("click", function() {
  if (gameOfLife.isRunning()) {
    gameOfLife.stop();
    this.innerHTML = "Start";
  } else {
    gameOfLife.start();
    this.innerHTML = "Stop";
  }
});

// Add event listener to the clear button to clear the game board
document.getElementById("clearButton").addEventListener("click", function() {
  gameOfLife.clear();
});