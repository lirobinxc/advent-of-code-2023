import { log } from 'node:console';
import fs from 'node:fs';
import { parseGameStringToObject, type RGB } from './parseGameStringToObject';
import readline from 'node:readline';

const CUBE_LIMITS: RGB = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const fileStream = fs.createReadStream('solutions/day-02/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const gameList: RGB[][] = [];

  // Parse input
  for await (const line of rl) {
    gameList.push(parseGameStringToObject(line));
  }

  // Loop through gameList and find sum of possible games
  const possibleGameIds: number[] = [];
  gameList.forEach((game, idx) => {
    const isImpossible = game.some((play) => {
      return (
        play.red > CUBE_LIMITS.red ||
        play.blue > CUBE_LIMITS.blue ||
        play.green > CUBE_LIMITS.green
      );
    });

    if (!isImpossible) {
      possibleGameIds.push(idx + 1);
    }
  });

  // Result
  const sum = possibleGameIds.reduce((acc, curr) => acc + curr, 0);
  log(sum);
}

main();
