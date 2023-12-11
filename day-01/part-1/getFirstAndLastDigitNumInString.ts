export function getFirstAndLastDigitNumInString(line: string) {
  let p1 = 0;
  let p2 = line.length - 1;

  const result: [number, number] = [0, 0];

  let num1Found = false;
  let num2Found = false;
  while (!num1Found && p1 < line.length) {
    const char1 = line[p1];
    const num1 = parseInt(char1);

    if (!isNaN(num1)) {
      num1Found = true;
      result[0] = num1;
    } else {
      p1++;
    }
  }

  while (!num2Found && p2 >= 0) {
    const char2 = line[p2];
    const num2 = parseInt(char2);

    if (!isNaN(num2)) {
      num2Found = true;
      result[1] = num2;
    } else {
      p2--;
    }
  }

  return parseInt(`${result[0]}${result[1]}`);
}
