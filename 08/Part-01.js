const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  let [directions, , ...nodes] = data.split("\n");

  const nodesMap = nodes.reduce((acc, x) => {
    const self = x.substring(0, 3);
    const L = x.substring(7, 10);
    const R = x.substring(12, 15);
    acc = { ...acc, [self]: { L, R } };
    return acc;
  }, {});

  let dirIndex = 0;
  let steps = 0;
  let current = "AAA";

  while (current !== "ZZZ") {
    dirIndex = dirIndex % directions.length;
    current = nodesMap[current][directions[dirIndex]];
    steps++;
    dirIndex++;
  }

  console.log(steps);
});
