const fs = require("fs");

const mapXtoY = (mapping, X) => {
  let Y = -1;
  for (const row of mapping) {
    const [end, start, count] = row.split(" ").map(Number);
    if (X >= start && X <= start + count) {
      Y = end - start + X;
      break;
    }
  }
  return Y === -1 ? X : Y;
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  const input = data.split("\n\n");

  const inputSeeds = input[0]
    .split("seeds: ")
    .filter((x) => x)[0]
    .split(" ")
    .map((x) => parseInt(x.trim()));

  let [, ...seedToSoil] = input[1].split("\n");
  let [, ...soilToFertilizers] = input[2].split("\n");
  let [, ...fertilizerToWater] = input[3].split("\n");
  let [, ...waterToLight] = input[4].split("\n");
  let [, ...lightToTemp] = input[5].split("\n");
  let [, ...tempToHum] = input[6].split("\n");
  let [, ...humToLoc] = input[7].split("\n");

  let res = inputSeeds
    .map((n) => mapXtoY(seedToSoil, n))
    .map((n) => mapXtoY(soilToFertilizers, n))
    .map((n) => mapXtoY(fertilizerToWater, n))
    .map((n) => mapXtoY(waterToLight, n))
    .map((n) => mapXtoY(lightToTemp, n))
    .map((n) => mapXtoY(tempToHum, n))
    .map((n) => mapXtoY(humToLoc, n));

  console.log(Math.min(...res));
});
