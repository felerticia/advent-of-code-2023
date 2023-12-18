const fs = require("fs");
let max = 0;
const input = fs.readFileSync("input.txt", "utf8").trim();
const grid = input.split("\n").map((row) => row.split(""));

let startingPoints = [];
for (let c = 0; c < grid[0].length; c++) {
  startingPoints.push({ row: 0, col: c, dir: "d" });
  startingPoints.push({ row: grid.length - 1, col: c, dir: "u" });
}
for (let r = 0; r < grid.length; r++) {
  startingPoints.push({ row: r, col: 0, dir: "r" });
  startingPoints.push({ row: r, col: grid[0].length - 1, dir: "l" });
}

startingPoints.forEach((start) => {
  const dirs = {
    l: [0, -1],
    r: [0, 1],
    u: [-1, 0],
    d: [1, 0],
  };

  let seen = new Map();

  let visited = [...Array(grid.length)].map((_) =>
    Array(grid[0].length).fill(".")
  );

  let queue = [start];
  while (queue.length > 0) {
    let { row, col, dir } = queue.pop();

    let key = `${row}__${col}__${dir}`;
    if (seen.has(key)) {
      continue;
    }

    seen.set(key, 1);

    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      continue;
    } else {
      visited[row][col] = "#";

      let current = grid[row][col];
      let nextDirections = [];

      if (current == "|" && (dir == "r" || dir == "l")) {
        nextDirections = ["u", "d"];
      } else if (current == "-" && (dir == "u" || dir == "d")) {
        nextDirections = ["r", "l"];
      } else if (current == "/") {
        switch (dir) {
          case "u":
            nextDirections = ["r"];
            break;
          case "r":
            nextDirections = ["u"];
            break;
          case "d":
            nextDirections = ["l"];
            break;
          case "l":
            nextDirections = ["d"];
            break;
        }
      } else if (current == "\\") {
        switch (dir) {
          case "u":
            nextDirections = ["l"];
            break;
          case "r":
            nextDirections = ["d"];
            break;
          case "d":
            nextDirections = ["r"];
            break;
          case "l":
            nextDirections = ["u"];
            break;
        }
      } else {
        nextDirections = [dir];
        //pass through in same direction
      }
      nextDirections.forEach((dir) => {
        queue.push({
          col: col + dirs[dir][1],
          row: row + dirs[dir][0],
          dir,
        });
      });
    }
  }
  let a = visited.flat().filter((x) => x == "#").length;

  max = Math.max(max, a);
});

console.log(max);
