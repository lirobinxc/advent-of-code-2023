import assert from 'node:assert';
import { dir, log } from 'node:console';
import fs from 'node:fs';
import test from 'node:test';

function isSymbol(char: string) {
  if (!char) return false;

  return isNaN(parseInt(char)) && char !== '.';
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

function main(input: string) {
  const data = fs
    .readFileSync(input, {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((line) => line.split(''));

  const result: number[] = [];
  let currNum = '';
  let isValid = false;

  data.forEach((line, lineIdx) => {
    line.forEach((char, charIdx) => {
      if (isNum(char)) {
        currNum += char;

        if (!isValid) {
          isValid = dirs.some((dir) => {
            const neighbor = data?.[lineIdx + dir[0]]?.[charIdx + dir[1]];
            return isSymbol(neighbor);
          });
        }
      } else if (!isNum(char) && isNum(currNum) && isValid) {
        result.push(parseInt(currNum));
        currNum = '';
        isValid = false;
      } else {
        currNum = '';
      }

      // Nums on end of line
      if (charIdx === line.length - 1 && isNum(currNum) && isValid) {
        result.push(parseInt(currNum));
        currNum = '';
        isValid = false;
      }

      log(currNum, isValid);
    });
  });

  // Result
  log(result);
  const sum = result.reduce((acc, curr) => acc + curr, 0);
  log(sum);

  return sum;
}

main('./day-03/input.txt');

// test('test-input', (t) => {
//   const result = main('./day-03/test-input.txt');

//   assert.strictEqual(result, 4361);
// });
