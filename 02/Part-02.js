const condition = { red: 12, green: 13, blue: 14 };
const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data
    .split("\n")
    .filter((n) => n)
    .map((row) => {
      let [, tries] = row.split(":");

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
      return tries;
    })
    .map((tries) => {
      return tries.reduce((acc, tri) => {
        Object.keys(tri).forEach((c) => {
          acc[c] = Math.max(acc[c] || 0, tri[c]);
        });

        return acc;
      });
    })
    .reduce(
      (acc, row) =>
        (acc += Object.values(row).reduce((mul, item) => mul * item, 1)),

      0
    );

  console.log(input);
});
