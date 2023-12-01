const fs = require("fs");

const getNum = (s) => {
  let l, r;
  let i = 0;
  let len = s.length;
  do {
    if (!Number(l)) {
      if (Number(s[i])) {
        l = Number(s[i]);
      }
    }
    if (!Number(r)) {
      if (Number(s[len - i])) {
        r = Number(s[len - i]);
      }
    }
  } while (i++ < len);

  return (l || 0) * 10 + (r || 0);
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n").filter((n) => n);
  console.log(input.reduce((acc, s) => (acc = acc + getNum(s)), 0));
});
