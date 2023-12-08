const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n");

  let time = input[0]
    .split(" ")
    .filter((x) => x.length && Number(x))
    .join("");

  time = Number(time);

  let dist = input[1]
    .split(" ")
    .filter((x) => x.length && Number(x))
    .join("");

  dist = Number(dist);

  const delta = Math.sqrt(time * time - 4 * dist);
  const r1 = (-1 * time + delta) / -2;
  const r2 = (-1 * time - delta) / -2;

  const min = Math.floor(Math.min(r1, r2));
  const max = Math.ceil(Math.max(r1, r2)) - 1;

  const count = max - min;

  console.log(count);
});
