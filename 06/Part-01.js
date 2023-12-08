const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n");

  const [, ...time] = input[0]
    .split(" ")
    .filter((x) => x.length)
    .map(Number);

  const [, ...dist] = input[1]
    .split(" ")
    .filter((x) => x.length)
    .map(Number);

  let win = time.reduce((acc, lap, i) => {
    const delta = Math.sqrt(lap * lap - 4 * dist[i]);
    const r1 = (-1 * lap + delta) / -2;
    const r2 = (-1 * lap - delta) / -2;

    const min = Math.floor(Math.min(r1, r2));
    const max = Math.ceil(Math.max(r1, r2)) - 1;

    const count = max - min;

    acc *= count;
    return acc;
  }, 1);

  console.log(win);
});
