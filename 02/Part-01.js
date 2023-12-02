const condition = { red: 12, green: 13, blue: 14 };
const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data
    .split("\n")
    .filter((n) => n)
    .map((row) => {
      let [game, tries] = row.split(":");

      game = Number(game.split("Game ")[1]);

      tries = tries
        .split(";")
        .map((x) => x.trim())
        .map((x) =>
          x.split(",").reduce((acc, x) => {
            const [n, c] = x.trim().split(" ");
            acc[c] = Number(n);

            return acc;
          }, {})
        );
      return { game, tries };
    });

  const win = input
    .filter((row) => {
      const { tries } = row;

      return tries.every((tri) => {
        return Object.keys(tri).every(
          (color) => tri[color] <= condition[color]
        );
      });
    })
    .reduce((acc, row) => acc + row.game, 0);

  console.log(win);
});
