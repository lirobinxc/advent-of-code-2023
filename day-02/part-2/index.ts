import { log } from 'node:console';
import fs from 'node:fs';
import readline from 'node:readline';
import {
  RGB,
  parseGameStringToObject,
} from '../part-1/parseGameStringToObject';

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

  // Loop through gameList and find max value of each color
  const minCubeList: [number, number, number][] = gameList.map((game) => {
    const maxValues: [number, number, number] = [0, 0, 0]; // [R, G, B]
    game.forEach((play) => {
      if (play.red > maxValues[0]) {
        maxValues[0] = play.red;
      }
      if (play.green > maxValues[1]) {
        maxValues[1] = play.green;
      }
      if (play.blue > maxValues[2]) {
        maxValues[2] = play.blue;
      }
    });

    return maxValues;
  });

  // Convert maxValue arrays to powers
  const powerList = minCubeList.map((set) => {
    return set.reduce((acc, curr) => acc * curr, 1);
  });

  // Result
  const sum = powerList.reduce((acc, curr) => acc + curr, 0);
  log(sum);
}

main();
