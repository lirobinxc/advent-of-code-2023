export function* circularIterator(input: string | unknown[]) {
  let idx = 0;

  while (true) {
    if (idx >= input.length) {
      idx = 0;
    }

    yield input[idx];
  }
}
