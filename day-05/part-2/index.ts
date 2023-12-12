import { log } from 'node:console';
import fs from 'node:fs';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

function getMapData(data: string[], name: string) {
  const nameIdx = data.findIndex((str) => str.includes(name));

  if (nameIdx < 0) return [];

  const result: number[][] = [];

  for (let i = nameIdx + 1; data[i]; i++) {
    result.push(data[i].split(' ').map((num) => parseInt(num)));
  }

  return result;
}

const data = fs
  .readFileSync('./day-05/input.txt', {
    encoding: 'utf-8',
  })
  .split('\n');

const seedNumData = data[0]
  .split(': ')[1]
  .split(' ')
  .map((num) => parseInt(num));

function genSeedRanges() {
  const ranges: { min: number; max: number }[] = [];

  for (let i = 0; i < seedNumData.length; i += 2) {
    const currNum = seedNumData[i];
    const range = seedNumData[i + 1];

    const data = {
      min: currNum,
      max: currNum + range - 1,
    };

    ranges.push(data);
  }

  return ranges;
}

const seedRanges = genSeedRanges();
log(seedRanges);

const mapDataList = [
  getMapData(data, 'seed-to-soil'),
  getMapData(data, 'soil-to-fertilizer'),
  getMapData(data, 'fertilizer-to-water'),
  getMapData(data, 'water-to-light'),
  getMapData(data, 'light-to-temperature'),
  getMapData(data, 'temperature-to-humidity'),
  getMapData(data, 'humidity-to-location'),
];

// log(mapDataList);

const reversedMapFormulasList = mapDataList
  .map((mapData) => {
    const formulas: {
      min: number;
      max: number;
      getResult: (num: number) => number;
    }[] = [];

    mapData.forEach((formula) => {
      const sourceNum = formula[0];
      const destination = formula[1];
      const range = formula[2];

      const data = {
        min: sourceNum,
        max: sourceNum + range - 1,
        getResult(myNum: number) {
          const diff = myNum - sourceNum;

          return destination + diff;
        },
      };

      formulas.push(data);
    });

    return formulas;
  })
  .reverse();

function calcSeedNumFromLocation(location: number) {
  let seedNum = location;

  reversedMapFormulasList.forEach((map) => {
    const correctFormula = map.find((formula) => {
      return seedNum >= formula.min && seedNum <= formula.max;
    });

    seedNum = correctFormula?.getResult(seedNum) || seedNum;
  });

  return seedNum;
}

function main() {
  console.time('runtime');

  let maxSeedLocation = 65_000_000;

  function randomSeedLocation() {
    return Math.floor(Math.random() * maxSeedLocation);
  }

  let location = randomSeedLocation();

  let isRandomSearch = true;
  while (location <= maxSeedLocation) {
    const seedNum = calcSeedNumFromLocation(location);

    const seedIdx = seedRanges.findIndex(
      (range) => seedNum >= range.min && seedNum <= range.max
    );

    if (seedIdx >= 0) {
      if (location > 5_000_000) {
        log('RANDOM SUCCESS, setting new limit');
        maxSeedLocation = location;
        log(location);
      } else {
        log('BEGIN SERIAL SEARCH');
        maxSeedLocation = location;
        isRandomSearch = false;
      }
    }

    if (isRandomSearch) {
      location = randomSeedLocation();
    } else {
      location = 0;
      while (location < maxSeedLocation) {
        log(location);

        const seedNum = calcSeedNumFromLocation(location);

        const seedIdx = seedRanges.findIndex(
          (range) => seedNum >= range.min && seedNum <= range.max
        );

        if (seedIdx >= 0) {
          break;
        }

        location++;
      }

      break;
    }
  }

  log('ANSWER', location);
  console.timeEnd('runtime');
}

main();
