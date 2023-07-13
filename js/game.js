function GameOfLife(canvas) {
  // Initialize the game board
  this.canvas = canvas;
  
  this.context = this.canvas.getContext("2d");
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.cellSize = 10;
  this.grid = [];
  
  for (let i = 0; i < this.width / this.cellSize; i++) {
    this.grid[i] = [];
    for (let j = 0; j < this.height / this.cellSize; j++) {
      this.grid[i][j] = false;
    }
  }

  // Initialize the game state
  this.running = false;
  this.intervalId = null;
  this.fps = 10;

  // Draw the initial game board
  this.draw();
}

GameOfLife.prototype.draw = function() {
  // Clear the canvas
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.fillStyle = 'lightgray';
  this.context.fillRect(0, 0, this.width, this.height);

  const w = this.width;
  const h = this.height;
  
  
  this.context.strokeStyle = 'darkgray';
  this.context.shadowBlur = 0;

  //X-axis lines
  for (let i = 0; i <= this.height / this.cellSize; i++) {
    this.context.beginPath();
    this.context.moveTo(0, i * this.cellSize);
    this.context.lineTo(this.width, i * this.cellSize);
    this.context.stroke();
  }

  //Y-axis
  for (let j = 0; j <= this.width / this.cellSize; j++) {
    this.context.beginPath();
    //console.log((j * this.cellSize));
    this.context.moveTo(j * this.cellSize, 0);
    this.context.lineTo(j * this.cellSize, this.height);
    this.context.stroke();
  }

  this.context.shadowBlur = 10;
  this.context.shadowColor = "#034fad";
  this.context.fillStyle = '#2b2b2b';

  // Draw the cells
  for (let i = 0; i < this.width / this.cellSize; i++) {
    for (let j = 0; j < this.height / this.cellSize; j++) {
      if (this.grid[i][j]) {
        this.context.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);

      }
    }
  }
  //  */


};

GameOfLife.prototype.toggleCell = function(x, y) {
  // Toggle the cell at the given coordinates
  let i = Math.floor(x / this.cellSize);
  let j = Math.floor(y / this.cellSize);
  this.grid[i][j] = !this.grid[i][j];

  // Redraw the game board
  this.draw();
};

GameOfLife.prototype.start = function() {
  // Start the game loop
  let self = this;
  this.intervalId = setInterval(function() {
    self.update();
    self.draw();
  }, 1000 / this.fps);
  this.running = true;
};

GameOfLife.prototype.stop = function() {
  // Stop the game loop
  clearInterval(this.intervalId);
  this.running = false;
};

GameOfLife.prototype.isRunning = function() {
  // Return whether the game is running or not
  return this.running;
};

GameOfLife.prototype.clear = function() {
  // Clear the game board
  for (let i = 0; i < this.width / this.cellSize; i++) {
    for (let j = 0; j < this.height / this.cellSize; j++) {
      this.grid[i][j] = false;
    }
  }

  // Redraw the game board
  this.draw();
};

GameOfLife.prototype.update = function() {
  // Update the game state
  let newGrid = [];
  for (let i = 0; i < this.width / this.cellSize; i++) {
    newGrid[i] = [];
    for (let j = 0; j < this.height / this.cellSize; j++) {
      let neighbors = this.countNeighbors(i, j);
      if (this.grid[i][j]) {
        newGrid[i][j] = (neighbors === 2 || neighbors === 3);
      } else {
        newGrid[i][j] = (neighbors === 3);
      }
    }
  }
  this.grid = newGrid;
};

GameOfLife.prototype.countNeighbors = function(x, y) {
  // Count the number of live neighbors for the given cell
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      let nx = x + i;
      let ny = y + j;
      if (nx < 0 || nx >= this.width / this.cellSize || ny < 0 || ny >= this.height / this.cellSize) {
        continue;
      }
      if (this.grid[nx][ny]) {
        count++;
      }
    }
  }
  return count;
};