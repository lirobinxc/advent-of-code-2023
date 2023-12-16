import { log } from 'node:console';
import fs from 'node:fs';

// PROCESS DATA
function processInput(file: string) {
  const data = fs
    .readFileSync(file, {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((line) => line.split(' '));

  const timeStr = data[0].filter((item) => !isNaN(parseInt(item))).join('');
  const distanceStr = data[1].filter((item) => !isNaN(parseInt(item))).join('');

  const raceData = {
    time: parseInt(timeStr),
    distance: parseInt(distanceStr),
  };

  log(raceData);
  return raceData;
}

// SOLVE
function getWaysToWin(timeLimit: number, recordDistance: number) {
  let counter = 0;

  for (let i = 1; i < timeLimit; i++) {
    const chargedSpeed = i;
    const timeRemaining = timeLimit - i;

    const distance = chargedSpeed * timeRemaining;

    if (distance > recordDistance) counter++;
  }

  return counter;
}

function main(inputFile: string) {
  const raceData = processInput(inputFile);

  const waysToWin = getWaysToWin(raceData.time, raceData.distance);
  log(waysToWin);
}

main('./day-06/input.txt');
