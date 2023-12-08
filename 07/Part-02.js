const fs = require("fs");

const cardValues = {
  J: 0,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  let lines = data.split("\n");
  lines.sort((a, b) => {
    const handA = a.split(" ")[0];
    const handB = b.split(" ")[0];
    return sortHands(handB, handA);
  });

  const wins = lines.reduce((acc, line, i) => {
    const bid = line.split(" ")[1];
    acc += bid * (i + 1);
    return acc;
  }, 0);

  console.log(wins);
});

const getAllPossibleValues = (hand) => {
  if (!/J/.test(hand)) {
    return [hand];
  }

  const handSet = getHandSet(hand);
  const possibilities = [];
  for (let key in handSet) {
    possibilities.push(hand.replace(/J/g, key));
  }

  return possibilities;
};

const sortHands = (handA, handB) => {
  const possibilitiesA = getAllPossibleValues(handA);
  const possibilitiesB = getAllPossibleValues(handB);
  const handValueA = possibilitiesA
    .map((hand) => getRank(hand))
    .sort((a, b) => b - a)[0];
  const handValueB = possibilitiesB
    .map((hand) => getRank(hand))
    .sort((a, b) => b - a)[0];
  if (handValueA > handValueB) return -1; // A wins
  if (handValueB > handValueA) return 1; // b wins
  return tieBreaker(handA, handB);
};

const getRank = (hand) => {
  const handSet = getHandSet(hand);

  let hasPair = false;
  let hasThree = false;
  for (let key in handSet) {
    const val = handSet[key];
    if (val === 5) {
      return 7;
    } else if (val === 4) {
      return 6;
    } else if ((val === 3 && hasPair) || (val === 2 && hasThree)) {
      return 5;
    } else if (val === 2 && hasPair) {
      return 3;
    } else if (val === 3) {
      hasThree = true;
    } else if (val === 2) {
      hasPair = true;
    }
  }

  if (hasThree) return 4;
  if (hasPair) return 2;
  return 1;
};

const getHandSet = (hand) => {
  const handSet = {};
  for (let i = 0; i < hand.length; i++) {
    handSet[hand[i]] = handSet[hand[i]] || 0;
    handSet[hand[i]] += 1;
  }
  return handSet;
};

const tieBreaker = (handA, handB) => {
  for (let i = 0; i < handA.length; i++) {
    const cardA = handA[i];
    const cardB = handB[i];
    const handAVal = isNaN(Number(cardA)) ? cardValues[cardA] : Number(cardA);
    const handBVal = isNaN(Number(cardB)) ? cardValues[cardB] : Number(cardB);

    if (handAVal > handBVal) return -1;
    if (handBVal > handAVal) return 1;
  }

  return 0;
};
