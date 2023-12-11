import { log } from 'node:console';
import fs from 'node:fs';
import readline from 'node:readline';
import { getFirstAndLastWordOrDigitNumInString } from './getFirstAndLastWordOrDigitNumInString';

async function main() {
  const fileStream = fs.createReadStream('solutions/day-01/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const parsedNumList: number[] = [];

  // 2 pointer strategy
  for await (const line of rl) {
    const parsedNum = getFirstAndLastWordOrDigitNumInString(line);

    parsedNumList.push(parsedNum);
  }

  // Result
  const sum = parsedNumList.reduce((acc, curr) => acc + curr, 0);
  log(sum);
}

main();
