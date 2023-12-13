const fs = require("fs");

const getDifferencesCount = (left, right) => {
  let differences = 0;
  let i = 0;
  while (i < left.length) {
    if (left[i] !== right[i]) differences++;
    i++;
  }
  return differences;
};

const hReflection = (section) => {
  let len = section[0].length;
  for (let col = 0; col < len - 1; col++) {
    let anomaly = 0;
    let l = col;
    let r = col + 1;
    while (l >= 0 && r < len) {
      let leftCol = section.map((row) => row[l]).join("");
      let rightCol = section.map((row) => row[r]).join("");
      anomaly += getDifferencesCount(leftCol, rightCol);
      l--;
      r++;
    }
    if (anomaly === 1) return col + 1;
  }
  return null;
};

const vReflection = (section) => {
  let len = section.length;
  for (let row = 0; row < len - 1; row++) {
    let anomaly = 0;
    let t = row;
    let b = row + 1;
    while (t >= 0 && b < len) {
      let topRow = section[t];
      let bottomRow = section[b];
      anomaly += getDifferencesCount(topRow, bottomRow);
      t--;
      b++;
    }
    if (anomaly === 1) return (row + 1) * 100;
  }
  return null;
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n");

  let val = input
    .reduce(
      (acc, line) => {
        if (!line) {
          acc = [...acc, []];
        } else {
          acc.at(-1).push(line);
        }
        return acc;
      },
      [[]]
    )
    .reduce((acc, part) => {
      let h = hReflection(part);
      let v = vReflection(part);
      acc += h || v || 0;
      return acc;
    }, 0);
  console.log(val);
});
