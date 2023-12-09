const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  const parsed = data.split("\n").map((line) => line.split(" ").map(Number));

  function getHistory(line) {
    const history = [line];
    let current = line;

    while (true) {
      let next = [];
      for (let i = 0; i < current.length - 1; i++) {
        next.push(current[i + 1] - current[i]);
      }
      history.push(next);
      if (next.some((x) => x)) {
        current = next;
        next = [];
      } else {
        break;
      }
    }
    return history;
  }

  function getNext(history) {
    history.reverse();
    for (let i = 0; i < history.length - 1; i++) {
      var sum = history[i + 1][0] - history[i][0];
      history[i + 1].unshift(sum);
    }
    return history.at(-1).at(0);
  }

  let res = parsed
    .map(getHistory)
    .map(getNext)
    .reduce((acc, line) => (acc += line), 0);

  console.log(res);
});
