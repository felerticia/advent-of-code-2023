const fs = require("fs");

const toHash = (str) =>
  str.split("").reduce((acc, s) => {
    acc += s.charCodeAt(0);
    acc *= 17;
    acc %= 256;
    return acc;
  }, 0);

fs.readFile("input.txt", "utf-8", (err, data) => {
  const commands = data.split(",");
  const boxes = new Array(256).fill("").map(() => []);

  for (const command of commands) {
    if (command.endsWith("-")) {
      const label = command.slice(0, -1);
      const hash = toHash(label);
      boxes[hash] = boxes[hash].filter((lens) => lens.label !== label);
    } else {
      const [label, f] = command.split("=");
      const focalLength = Number(f);
      const hash = toHash(label);
      const index = boxes[hash].findIndex((lens) => lens.label === label);
      if (index === -1) {
        boxes[hash].push({ label, focalLength });
      } else {
        boxes[hash][index].focalLength = focalLength;
      }
    }
  }

  const powers = boxes
    .map((box, boxIdx) =>
      box.map(
        (lens, lensIdx) => (1 + boxIdx) * (1 + lensIdx) * lens.focalLength
      )
    )
    .flat()
    .reduce((acc, h) => acc + h, 0);

  console.log(powers);
});
