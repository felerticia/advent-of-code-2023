const fs = require("fs");

const getStartPoint = (input) => {
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "S") {
        return { x, y };
      }
    }
  }
};

const initiateRays = (n) => {
  let rayLoop = [];
  for (let y = 0; y < n; y++) rayLoop[y] = [];
  return rayLoop;
};

const selectPath = (input, start) => {
  const { x, y } = start;
  if (
    input[y + 1][x] === "|" ||
    input[y + 1][x] === "L" ||
    input[y + 1][x] === "J"
  ) {
    return { dir: "SOUTH", y: y + 1, x };
  }

  if (!dir) {
    if (
      input[y - 1][x] === "|" ||
      input[y - 1][x] === "F" ||
      input[y - 1][x] === "7"
    ) {
      return { dir: "NORTH", y: y - 1, x };
    }
  }

  return { dir: "EAST", y, x: x + 1 };
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n");
  let start = getStartPoint(input);

  let rays = initiateRays(input.length);

  let { dir, x, y } = selectPath(input, start);

  let path = [start, { x, y }];
  rays[start.y][start.x] = true;
  rays[y][x] = true;

  while (x !== start.x || y !== start.y) {
    let candidateX = 0;
    let candidateY = 0;
    switch (`${input[y][x]} : ${dir}`) {
      case "| : SOUTH":
        candidateY = 1;
        break;
      case "| : NORTH":
        candidateY = -1;
        break;
      case "- : EAST":
        candidateX = 1;
        break;
      case "- : WEST":
        candidateX = -1;
        break;
      case "L : SOUTH":
        candidateX = 1;
        break;
      case "L : WEST":
        candidateY = -1;
        break;
      case "J : SOUTH":
        candidateX = -1;
        break;
      case "J : EAST":
        candidateY = -1;
        break;
      case "7 : NORTH":
        candidateX = -1;
        break;
      case "7 : EAST":
        candidateY = 1;
        break;
      case "F : NORTH":
        candidateX = 1;
        break;
      case "F : WEST":
        candidateY = 1;
        break;
      default:
        break;
    }
    if (candidateY === 1) {
      dir = "SOUTH";
    } else if (candidateY === -1) {
      dir = "NORTH";
    } else if (candidateX === -1) {
      dir = "WEST";
    } else {
      dir = "EAST";
    }
    x += candidateX;
    y += candidateY;
    rays[y] = rays[y] || [];
    rays[y][x] = true;
    path.push({ x, y });
  }

  let count = 0;
  for (let yy = 0; yy < input.length; yy++) {
    let crosses = 0;
    let line = input[yy];
    let corner = false;
    for (let xx = 0; xx < line.length; xx++) {
      if (rays[yy][xx]) {
        let current = input[yy][xx];
        if (current === "|") {
          crosses++;
        } else if (current !== "-") {
          if (corner) {
            if (corner === "L" && current === "7") {
              crosses++;
            } else if (corner === "F" && current === "J") {
              crosses++;
            }
            corner = false;
          } else {
            corner = current;
          }
        }
      } else if (crosses % 2 === 1) {
        count++;
      }
    }
  }
  console.log(count);
});
