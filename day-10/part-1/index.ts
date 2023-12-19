import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import { matrix2dNodeCompassIterator } from '../../utils/matrix2dNodeCompassIterator';

// Get input filenames
const testInputFilepath = path.resolve(__dirname, '..', 'test-input.txt');
const mainInputFilepath = path.resolve(__dirname, '..', 'input.txt');

type PipeConnections = [string | null, string | null];
type PipeMap = Record<string, PipeConnections>;

const PipeType: Record<string, [number, number][] | undefined> = {
  '|': [
    [-1, 0],
    [1, 0],
  ],
  '-': [
    [0, -1],
    [0, 1],
  ],
  L: [
    [-1, 0],
    [0, 1],
  ],
  J: [
    [-1, 0],
    [0, -1],
  ],
  '7': [
    [0, -1],
    [1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
};

const pipeMap = {} as PipeMap;

// Parse input
function parseInput(input: string) {
  const matrix = fs
    .readFileSync(input, {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((str) => str.split(''));

  let startPipeKey = '';

  // Create pipe map
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      const pipeConnections: PipeConnections = [null, null];

      const pipeKey = `${i},${j}`;
      if (char === 'S') {
        startPipeKey = pipeKey;
      }

      const pipeTypeDirs = PipeType[char] as [number, number][] | undefined;
      if (pipeTypeDirs) {
        const pipe0Key = `${i + pipeTypeDirs[0][0]},${j + pipeTypeDirs[0][1]}`;
        const pipe1Key = `${i + pipeTypeDirs[1][0]},${j + pipeTypeDirs[1][1]}`;

        pipeConnections[0] = pipe0Key;
        pipeConnections[1] = pipe1Key;
      }

      pipeMap[pipeKey] = pipeConnections;
    }
  }

  // Find connections of starting pipe
  const startPipeCoord = {
    row: parseInt(startPipeKey.split(',')[0]),
    col: parseInt(startPipeKey.split(',')[1]),
  };
  pipeMap[startPipeKey] = findConnectingPipes(
    matrix,
    startPipeCoord.row,
    startPipeCoord.col
  );

  log(pipeMap);

  return { pipeMap, startPipeKey };
}

// Util functions
function findConnectingPipes(
  matrix: string[][],
  pipeRow: number,
  pipeCol: number
) {
  const result: string[] = [];

  const pipeIterator = matrix2dNodeCompassIterator(matrix, pipeRow, pipeCol);
  let isDone: boolean | undefined = false;
  while (!isDone) {
    const { value, done } = pipeIterator.next();
    isDone = done;

    const dir = value?.dir;
    if (dir) {
      const currKey = `${pipeRow},${pipeCol}`;
      const testKey = `${pipeRow - dir[0]},${pipeCol - dir[1]}`;
      if (pipeMap[testKey]?.includes(currKey)) {
        result.push(testKey);
      }
    }
  }

  return result as PipeConnections;
}

function getPipeLoopSize(pipeMap: PipeMap, startPipeKey: string) {
  let counter = 0;

  let currPipe: string | null = startPipeKey;
  let nextPipe: string | null = pipeMap[startPipeKey][0];

  while (nextPipe && nextPipe !== startPipeKey) {
    const newPipe = pipeMap[nextPipe].filter((key) => key !== currPipe)[0];
    currPipe = nextPipe;
    nextPipe = newPipe;

    counter++;
  }

  return counter;
}

// Main solution
function main(input: string) {
  const { pipeMap, startPipeKey } = parseInput(input);

  const loopSize = getPipeLoopSize(pipeMap, startPipeKey);

  log(Math.ceil(loopSize / 2));
}

main(mainInputFilepath);
