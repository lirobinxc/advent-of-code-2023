import { log } from 'node:console';
import fs from 'node:fs';

function processData(file: string) {
  const data = fs
    .readFileSync(file, {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((play) => {
      const [cards, bet] = play.split(' ');
      return {
        cards,
        bet: parseInt(bet),
      };
    });

  return data;
}

const CardRank: Record<string, number> = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

function createCardMap() {
  return new Map<string, number>([
    ['2', 0],
    ['3', 0],
    ['4', 0],
    ['5', 0],
    ['6', 0],
    ['7', 0],
    ['8', 0],
    ['9', 0],
    ['T', 0],
    ['J', 0],
    ['Q', 0],
    ['K', 0],
    ['A', 0],
  ]);
}

function convertCardStringToPowerLevel(cards: string) {
  let powerLevel = '';

  cards.split('').forEach((card) => {
    const rank = CardRank[card] || 0;

    powerLevel += rank.toString().padStart(2, '0');
  });

  return parseInt(powerLevel);
  // return powerLevel;
}

// convertCardStringToPowerLevel('569TQ');

function parseHand(cards: string) {
  const cardMap = createCardMap();

  for (const card of cards) {
    const count = cardMap.get(card) || 0;
    cardMap.set(card, count + 1);
  }

  const sortedCardList = [...cardMap.entries()].sort((a, b) => b[1] - a[1]);

  const highestCard = sortedCardList[0];
  const secondHighestCard = sortedCardList[1];

  switch (highestCard[1]) {
    case 5:
      return 6;
    case 4:
      return 5;
    case 3:
      return secondHighestCard[1] === 2 ? 4 : 3;
    case 2:
      return secondHighestCard[1] === 2 ? 2 : 1;
    default:
      return 0;
  }
}

function main(file: string) {
  console.time('timer');
  const data = processData(file);

  const rankingList = data.map((hand) => {
    return {
      ...hand,
      rank: parseHand(hand.cards),
      powerLevel: convertCardStringToPowerLevel(hand.cards),
    };
  });

  const sortedRankingList = [...rankingList].sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;

    return a.powerLevel - b.powerLevel;
    // return 0;
  });

  log(sortedRankingList);

  const totalWin = sortedRankingList.reduce(
    (acc, curr, idx) => acc + curr.bet * (idx + 1),
    0
  );

  log(totalWin);

  console.timeEnd('timer');
}

main('./day-07/test-input.txt');
