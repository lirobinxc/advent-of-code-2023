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

  const timeList = data[0]
    .filter((item) => !isNaN(parseInt(item)))
    .map((numStr) => parseInt(numStr));

  const distanceList = data[1]
    .filter((item) => !isNaN(parseInt(item)))
    .map((numStr) => parseInt(numStr));

  const raceResultList: { time: number; distance: number }[] = [];

  for (let i = 0; i < timeList.length; i++) {
    raceResultList.push({
      time: timeList[i],
      distance: distanceList[i],
    });
  }

  return raceResultList;
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
  const raceList = processInput(inputFile);

  const waysToWinList: number[] = [];

  for (const race of raceList) {
    const waysToWin = getWaysToWin(race.time, race.distance);
    waysToWinList.push(waysToWin);
  }

  const product = waysToWinList.reduce((acc, curr) => acc * curr, 1);
  log(product);
}

main('./day-06/input.txt');
