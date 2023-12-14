const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  let grid = data
    .split("\n")
    .filter((n) => n)
    .map((row) => row.split(""));

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      if (grid[rowIndex][colIndex] === "O") {
        for (let i = rowIndex - 1; i >= 0; i--) {
          if (grid[i][colIndex] === "#" || grid[i][colIndex] === "O") {
            grid[rowIndex][colIndex] = ".";
            grid[i + 1][colIndex] = "O";
            break;
          }

          if (i === 0) {
            grid[rowIndex][colIndex] = ".";
            grid[0][colIndex] = "O";
            break;
          }
        }
      }
    }
  }

  let sum = 0;

  for (let y = grid.length - 1; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "O") {
        sum += grid.length - y;
      }
    }
  }

  console.log(sum);
});
