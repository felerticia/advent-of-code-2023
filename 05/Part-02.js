const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
const seedsInput = lines[0].split(" ").slice(1).map(Number);
const seeds = [];

for (let i = 0; i < seedsInput.length; i += 2) {
  seeds.push([seedsInput[i], seedsInput[i + 1]]);
}

const maps = [];
let i = 2;
while (i < lines.length) {
  const [catA, , catB] = lines[i].split(" ")[0].split("-");
  maps.push([]);
  i += 1;
  while (i < lines.length && lines[i] !== "") {
    const [dstStart, srcStart, rangeLen] = lines[i].split(" ").map(Number);
    maps[maps.length - 1].push([dstStart, srcStart, rangeLen]);
    i += 1;
  }
  maps[maps.length - 1].sort((a, b) => a[1] - b[1]);
  i += 1;
}
for (const m of maps) {
  for (let i = 0; i < m.length - 1; i++) {
    if (!(m[i][1] + m[i][2] <= m[i + 1][1])) {
      console.log(m[i], m[i + 1]);
    }
  }
}
function* remap(lo, hi, m) {
  const ans = [];
  for (const [dst, src, R] of m) {
    const end = src + R - 1;
    const D = dst - src;
    if (!(end < lo || src > hi)) {
      ans.push([Math.max(src, lo), Math.min(end, hi), D]);
    }
  }
  for (let i = 0; i < ans.length; i++) {
    const [l, r, D] = ans[i];
    yield [l + D, r + D];
    if (i < ans.length - 1 && ans[i + 1][0] > r + 1) {
      yield [r + 1, ans[i + 1][0] - 1];
    }
  }
  if (ans.length === 0) {
    yield [lo, hi];
    return;
  }
  if (ans[0][0] !== lo) {
    yield [lo, ans[0][0] - 1];
  }
  if (ans[ans.length - 1][1] !== hi) {
    yield [ans[ans.length - 1][1] + 1, hi];
  }
}
let ans = 1 << 60;
for (const [start, R] of seeds) {
  let cur_intervals = [[start, start + R - 1]];
  let new_intervals = [];
  for (const m of maps) {
    for (const [lo, hi] of cur_intervals) {
      for (const new_interval of remap(lo, hi, m)) {
        new_intervals.push(new_interval);
      }
    }
    [cur_intervals, new_intervals] = [new_intervals, []];
  }
  for (const [lo, hi] of cur_intervals) {
    ans = Math.min(ans, lo);
  }
  console.log(ans);
}
