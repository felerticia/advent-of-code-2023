const fs = require("fs");

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const lcm = (a, b) => (a * b) / gcd(a, b);

fs.readFile("input.txt", "utf-8", (err, data) => {
  let [directions, , ...nodes] = data.split("\n");

  const nodesMap = nodes.reduce((acc, x) => {
    const self = x.substring(0, 3);
    const L = x.substring(7, 10);
    const R = x.substring(12, 15);
    acc = { ...acc, [self]: { L, R } };
    return acc;
  }, {});

  let currentNodes = Object.keys(nodesMap).filter((node) => node.endsWith("A"));

  const pathLengths = [];

  for (let i = 0; i < currentNodes.length; i++) {
    let dirIndex = 0;
    let steps = 0;
    let node = currentNodes[i];
    while (!node.endsWith("Z")) {
      dirIndex = dirIndex % directions.length;
      node = nodesMap[node][directions[dirIndex]];
      steps++;
      dirIndex++;
    }
    pathLengths.push(steps);
  }

  console.log(pathLengths.reduce((acc, curr) => lcm(acc, curr), 1));
});
