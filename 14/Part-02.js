const fs = require("fs");

function tilt(grid, direction) {
  if (direction == "north") {
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

    return grid;
  } else if (direction == "south") {
    for (let rowIndex = grid.length - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
        if (grid[rowIndex][colIndex] === "O") {
          for (let i = rowIndex + 1; i < grid.length; i++) {
            if (grid[i][colIndex] === "#" || grid[i][colIndex] === "O") {
              grid[rowIndex][colIndex] = ".";
              grid[i - 1][colIndex] = "O";
              break;
            }

            if (i === grid.length - 1) {
              grid[rowIndex][colIndex] = ".";
              grid[grid.length - 1][colIndex] = "O";
              break;
            }
          }
        }
      }
    }

    return grid;
  } else if (direction == "east") {
    for (let colIndex = grid[0].length - 1; colIndex >= 0; colIndex--) {
      for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        if (grid[rowIndex][colIndex] === "O") {
          for (let i = colIndex + 1; i < grid[rowIndex].length; i++) {
            if (grid[rowIndex][i] === "#" || grid[rowIndex][i] === "O") {
              grid[rowIndex][colIndex] = ".";
              grid[rowIndex][i - 1] = "O";
              break;
            }

            if (i === grid[rowIndex].length - 1) {
              grid[rowIndex][colIndex] = ".";
              grid[rowIndex][grid[rowIndex].length - 1] = "O";
              break;
            }
          }
        }
      }
    }
  } else {
    for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
      for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        if (grid[rowIndex][colIndex] === "O") {
          for (let i = colIndex - 1; i >= 0; i--) {
            if (grid[rowIndex][i] === "#" || grid[rowIndex][i] === "O") {
              grid[rowIndex][colIndex] = ".";
              grid[rowIndex][i + 1] = "O";
              break;
            }

            if (i === 0) {
              grid[rowIndex][colIndex] = ".";
              grid[rowIndex][0] = "O";
              break;
            }
          }
        }
      }
    }
  }

  return grid;
}

function cycle(grid) {
  grid = tilt(grid, "north");
  grid = tilt(grid, "west");
  grid = tilt(grid, "south");
  grid = tilt(grid, "east");
  return grid;
}

function mergeGrid(grid) {
  return grid.map((row) => row.join("")).join("\n");
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  let grid = data
    .split("\n")
    .filter((n) => n)
    .map((row) => row.split(""));

  const gridMap = new Map();
  for (let i = 0; i < 1000000000; i++) {
    grid = cycle(grid);

    const hash = mergeGrid(grid);
    if (gridMap.has(hash)) {
      const loopOrigin = gridMap.get(hash);
      const loopLength = i - loopOrigin;

      const remaining = 1000000000 - 1 - i;
      const remainingMod = remaining % loopLength;

      for (let j = 0; j < remainingMod; j++) {
        cycle(grid);
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
      break;
    }
    gridMap.set(hash, i);
  }
});
