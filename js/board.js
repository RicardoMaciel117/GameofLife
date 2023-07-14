let gameOfLife;

document.addEventListener('DOMContentLoaded', () => {
  
  let canvas = document.createElement('canvas');
  
  // Get client width to create an adjustable canvas
  const boardContainer = document.getElementById('gameContainer');
  const boardWidth = boardContainer.clientWidth
  const lastNumber = parseInt(boardWidth.toString().split("").pop());
  
  
  /*
  * Validate canvas width as multiple of 10
  * Cells width and height is: 10px
  */
  
  if(lastNumber === 0){
    canvas.width = boardWidth;
  }
  else{
    // Center and set canvas width as multiple of 10
    boardContainer.style.marginLeft = (lastNumber / 2)+"px";
    canvas.width = boardWidth - (lastNumber - 1);
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
    this.innerHTML = `
      <span class="text">
        <i class="fa fa-play"></i> Start
      </span>
    `;
  } else {
    gameOfLife.start();
    this.innerHTML = `
      <span class="text">
        <i class="fa fa-stop"></i> Stop
      </span>
    `;
  }
});

// Add event listener to the clear button to clear the game board
document.getElementById("clearButton").addEventListener("click", function() {
  gameOfLife.clear();
});