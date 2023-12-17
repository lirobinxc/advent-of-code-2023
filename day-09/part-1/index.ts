import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';

// Get input filenames
const testInputFilepath = path.resolve(__dirname, '..', 'test-input.txt');
const mainInputFilepath = path.resolve(__dirname, '..', 'input.txt');

// Parse input
function parseInput(input: string) {
  const data = fs
    .readFileSync(input, {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((line) => line.split(' ').map((numStr) => parseInt(numStr)));

  return data;
}

// Util functions
function areAllNumsSame(list: number[]) {
  const firstNum = list[0];

  return list.every((num) => num === firstNum);
}

function getNextDiffs(list: number[]) {
  return list.reduce((acc, curr, idx) => {
    if (idx < list.length - 1) {
      const diff = list[idx + 1] - curr;
      acc.push(diff);
    }
    return acc;
  }, [] as number[]);
}

function getAllDiffs(list: number[]) {
  const allDiffs: number[][] = [list];

  let currList = [...list];

  while (!areAllNumsSame(currList)) {
    const diffs = getNextDiffs(currList);
    allDiffs.push(diffs);
    currList = diffs;
  }

  return allDiffs;
}

function getLastItemOfLists<T>(list: T[][]): T[] {
  return list.reduce((acc, curr) => [...acc, curr[curr.length - 1]], [] as T[]);
}

// Main solution
function main(input: string) {
  const lineList = parseInput(input);

  const sumList: number[] = [];

  for (const line of lineList) {
    const allDiffs = getAllDiffs(line);

    const lastNumsList = getLastItemOfLists(allDiffs);
    // log(lastNumsList);

    const sum = lastNumsList.reduce((acc, curr) => acc + curr, 0);

    sumList.push(sum);
  }

  const finalSum = sumList.reduce((acc, curr) => acc + curr, 0);
  log(finalSum);
}

main(mainInputFilepath);
