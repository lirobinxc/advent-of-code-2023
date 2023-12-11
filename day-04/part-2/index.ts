import { log } from 'node:console';
import fs from 'node:fs';

function getScore(winningCount: number) {
  if (winningCount <= 0) return 0;

  return Math.pow(2, winningCount - 1);
}

const data = fs
  .readFileSync('./day-04/input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map((line) => line.split(': ')[1].trim().split(' | '));

const winningCardNumsList = data.map((card) => {
  const winningNumsList = card[0].split(' ');

  const winningMap: Record<string, boolean> = {};

  winningNumsList.forEach((num) => {
    const trimmedNum = num.trim();

    winningMap[trimmedNum] = true;
  });

  return winningMap;
});

const myCardList = data.map((card) => card[1].split(' ').filter((num) => num));

const cardCount: number[] = Array(data.length).fill(1);
const cardPoints: number[] = [];

myCardList.forEach((card, cardIdx) => {
  let winningCount = 0;

  card.forEach((num) => {
    if (winningCardNumsList[cardIdx][num]) {
      winningCount++;
    }
  });

  cardPoints.push(getScore(winningCount));

  // Inc copies of next cards by winningCount
  for (let i = 1; i <= winningCount; i++) {
    const nextCardIdx = cardIdx + i;
    if (!cardCount[nextCardIdx]) break;

    cardCount[nextCardIdx] += cardCount[cardIdx];
  }
});

log(cardCount);

const sum = cardCount.reduce((acc, prev) => acc + prev, 0);
log(sum);
