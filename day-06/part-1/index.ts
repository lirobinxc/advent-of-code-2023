import { log } from 'node:console';
import fs from 'node:fs';

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

const seedNumList = data[0]
  .split(': ')[1]
  .split(' ')
  .map((num) => parseInt(num));

const mapDataList = [
  getMapData(data, 'seed-to-soil'),
  getMapData(data, 'soil-to-fertilizer'),
  getMapData(data, 'fertilizer-to-water'),
  getMapData(data, 'water-to-light'),
  getMapData(data, 'light-to-temperature'),
  getMapData(data, 'temperature-to-humidity'),
  getMapData(data, 'humidity-to-location'),
];

log(mapDataList);

const mapFormulasList = mapDataList.map((mapData) => {
  const formulas: {
    min: number;
    max: number;
    getResult: (num: number) => number;
  }[] = [];

  mapData.forEach((formula) => {
    const sourceNum = formula[1];
    const destination = formula[0];
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
});

// Convert seed nums to location
const seedLocationList = seedNumList.map((seed) => {
  let currNum = seed;
  // log('SEED NUM = ', currNum);

  mapFormulasList.forEach((map) => {
    const correctFormula = map.find((formula) => {
      return currNum >= formula.min && currNum <= formula.max;
    });

    // log(currNum, correctFormula);
    currNum = correctFormula?.getResult(currNum) || currNum;
  });

  return currNum;
});

log(Math.min(...seedLocationList));
