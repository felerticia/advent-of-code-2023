const { log } = require("console");
const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n").map((x) => x.replace(/  /g, " 0"));

  const res = input.reduce((acc, row) => {
    const [, cards] = row.split(": ");
    const [winners, myCards] = cards.split(" | ");

    const point = myCards
      .split(" ")
      .filter((card) => winners.includes(card)).length;

    const value = point === 0 ? 0 : Math.pow(2, point - 1);

    return acc + value;
  }, 0);

  console.log(res);
});
