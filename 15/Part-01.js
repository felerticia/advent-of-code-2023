const fs = require("fs");

const toHash = (str) =>
  str.split("").reduce((acc, s) => {
    acc += s.charCodeAt(0);
    acc *= 17;
    acc %= 256;
    return acc;
  }, 0);

fs.readFile("input.txt", "utf-8", (err, data) => {
  const hashes = data
    .split(",")
    .map(toHash)
    .reduce((acc, h) => acc + h, 0);

  console.log(hashes);
});
