const { log } = require("console");
const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n").map((x) => x.replace(/  /g, " 0"));

  const cardCount = new Array(input.length).fill(1);

  input.forEach((row, index) => {
    const [, cards] = row.split(": ");
    const [winners, myCards] = cards.split(" | ");

    const point = myCards
      .split(" ")
      .filter((card) => winners.includes(card)).length;

    if (point) {
      for (let i = index + 1; i < index + 1 + point; i++) {
        if (cardCount[i]) cardCount[i] += cardCount[index] || 0;
      }
    }
  });

  console.log(cardCount.reduce((acc, v) => acc + v, 0));
});
