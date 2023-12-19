const directionList = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export function* matrix2dNodeCompassIterator<T>(
  matrix2d: T[][],
  rowIdx: number,
  colIdx: number
) {
  for (let i = 0; i < directionList.length; i++) {
    const dir = directionList[i];
    const value = { dir, data: matrix2d?.[rowIdx + dir[0]]?.[colIdx + dir[1]] };

    if (i === directionList.length - 1) return value;

    yield value;
  }
}
