import assert from 'node:assert';
import { dir, log } from 'node:console';
import fs from 'node:fs';
import test from 'node:test';

function isGear(char: string) {
  if (!char) return false;

  return char === '*';
}

function isNum(char: string) {
  if (!char) return false;

  return !isNaN(parseInt(char));
}

function isDot(char: string) {
  return char === '.';
}

const dirs = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function createGearName(line: number, char: number) {
  return `gear-${line}-${char}`;
}

function main(input: string) {
  const data = fs
    .readFileSync(input, {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((line) => line.split(''));

  let currNum = '';
  let isValid = false;

  const gearMap = <Record<string, number[]>>{};
  let currGear = '';

  data.forEach((line, lineIdx) => {
    line.forEach((char, charIdx) => {
      if (isNum(char)) {
        currNum += char;

        if (!isValid) {
          isValid = dirs.some((dir) => {
            const y = lineIdx + dir[0];
            const x = charIdx + dir[1];

            const neighbor = data?.[y]?.[x];
            const neighborIsGear = isGear(neighbor);

            if (neighborIsGear) {
              currGear = createGearName(y, x);
              return true;
            }
          });
        }
      } else if (!isNum(char) && isNum(currNum) && isValid) {
        const finalNum = parseInt(currNum);
        if (gearMap[currGear]) {
          gearMap[currGear].push(finalNum);
        } else {
          gearMap[currGear] = [finalNum];
        }
        currNum = '';
        currGear = '';
        isValid = false;
      } else {
        currNum = '';
      }

      // Nums on end of line
      if (charIdx === line.length - 1 && isNum(currNum) && isValid) {
        const finalNum = parseInt(currNum);
        if (gearMap[currGear]) {
          gearMap[currGear].push(finalNum);
        } else {
          gearMap[currGear] = [finalNum];
        }
        currNum = '';
        currGear = '';
        isValid = false;
      }

      // log(currNum, isValid);
    });
  });

  // Result
  const gearValueList = Object.values(gearMap);

  const gearRatioList = gearValueList.map((item) => {
    if (item.length > 1) {
      return item.reduce((acc, curr) => acc * curr, 1);
    }
    return 0;
  });

  const sumofGearRatios = gearRatioList.reduce((acc, curr) => acc + curr, 0);

  log(gearMap);
}

main('./day-03/test-input.txt');

// test('test-input', (t) => {
//   const result = main('./day-03/test-input.txt');

//   assert.strictEqual(result, 4361);
// });
