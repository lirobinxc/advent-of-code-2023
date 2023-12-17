import { dir, log } from 'node:console';
import fs, { link } from 'node:fs';

type NodeLinks = {
  L: string;
  R: string;
};

function parseNodeStrToNodeData(nodeStr: string) {
  const initialData = nodeStr.split(' = ');

  const nodeData: { name: string; links: NodeLinks } = {
    name: initialData[0],
    links: {
      L: initialData[1].slice(1, 4),
      R: initialData[1].slice(6, 9),
    },
  };

  // log(nodeData);
  return nodeData;
}

parseNodeStrToNodeData('AAA = (BBB, ZZZ)');

function processData(file: string) {
  const data = fs
    .readFileSync(file, {
      encoding: 'utf-8',
    })
    .split('\n\n');

  const instructions = data[0];
  const nodeStrList = data[1].split('\n');

  const linkedNodeList = new Map<string, NodeLinks>();

  for (const nodeStr of nodeStrList) {
    const parsed = parseNodeStrToNodeData(nodeStr);

    linkedNodeList.set(parsed.name, parsed.links);
  }

  // log(linkedNodeList);
  return { linkedNodeList, instructions };
}

function main(file: string) {
  console.time('timer');
  const { linkedNodeList, instructions } = processData(file);

  function walkNodes() {
    const START_NAME = 'AAA';
    const END_NAME = 'ZZZ';

    let stepCounter = 1;
    let currNode = linkedNodeList.get(START_NAME);
    for (let i = 0; i < instructions.length; i++) {
      if (!currNode) return null;

      const direction = instructions[i] as 'L' | 'R';
      const nextNodeName = currNode[direction];

      if (nextNodeName === END_NAME) {
        return stepCounter;
      } else {
        currNode = linkedNodeList.get(nextNodeName);
      }

      if (i === instructions.length - 1) {
        // Loop to start of instructions if no END found
        i = -1;
      }

      stepCounter++;
    }

    return stepCounter;
  }

  log(walkNodes());
  console.timeEnd('timer');
}

main('./day-08/input.txt');
