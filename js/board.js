let gameOfLife;

document.addEventListener('DOMContentLoaded', () => {
  
  let canvas = document.createElement('canvas');
  
  // Get client width to create an adjustable canvas
  const boardContainer = document.getElementById('gameContainer');
  const board_width = boardContainer.clientWidth
  const last_number = parseInt(board_width.toString().split("").pop());
  
  
  /*
  * Validate canvas width as multiple of 10
  * Cells width and height is: 10px
  */
  
  if(last_number === 0){
    canvas.width = board_width;
  }
  else{
    // Center and set canvas width as multiple of 10
    boardContainer.style.marginLeft = (last_number / 2)+"px";
    canvas.width = board_width - (last_number - 1);
  }
  
  // Set canvas height as multiple of 10
  canvas.height = 550;
  
  // Appned canvas in the container
  boardContainer.appendChild(canvas);
  
  // Add event listeners to the canvas to toggle cells on and off
  canvas.addEventListener("click", function(event) {
    let x = event.pageX - this.offsetLeft;
    let y = event.pageY - this.offsetTop;
    gameOfLife.toggleCell(x, y);
  });
  
  // Create a new game of life object
  gameOfLife = new GameOfLife(canvas);
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