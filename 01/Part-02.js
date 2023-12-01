const fs = require("fs");

const digits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getNum = (s) => {
  let l, r;
  let i = 0;
  let len = s.length;
  do {
    if (!Number(l)) {
      if (Number(s[i])) {
        l = Number(s[i]);
      } else {
        for (d of digits) {
          if (s.substring(i).startsWith(d)) {
            l = digits.indexOf(d);
          }
        }
      }
    }
    if (!Number(r)) {
      if (Number(s[len - i])) {
        r = Number(s[len - i]);
      } else {
        for (d of digits) {
          if (s.substring(len - i).startsWith(d)) {
            r = digits.indexOf(d);
          }
        }
      }
    }
  } while (i++ < len);

  return (l || 0) * 10 + (r || 0);
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n").filter((n) => n);
  console.log(input.reduce((acc, s) => (acc = acc + getNum(s)), 0));
});
