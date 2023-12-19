export function rotateMatrix<T>(
  matrix: T[][],
  options?: {
    counterClockwise?: boolean;
  }
) {
  if (options?.counterClockwise) {
    return matrix[0].map((_val, index) =>
      matrix.map((row) => row[row.length - 1 - index])
    );
  }

  return matrix[0].map((_val, index) =>
    matrix.map((row) => row[index]).reverse()
  );
}
