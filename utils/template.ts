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

  log(data);

  return data;
}

// Util functions

// Main solution
function main(input: string) {
  const lineList = parseInput(input);

  for (const line of lineList) {
  }
}

main(testInputFilepath);
