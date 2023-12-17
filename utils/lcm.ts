export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const doLcm = (a: number, b: number) => (a * b) / gcd(a, b);

export const lcm = (...numbers: number[]) => {
  if (numbers.length < 2) {
    throw new RangeError('need at least two numbers');
  }
  return numbers.reduce((acc, x) => doLcm(acc, x), 1);
};
