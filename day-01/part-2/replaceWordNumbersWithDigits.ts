export function replaceWordNumbersWithDigits(
  input: string,
  options?: {
    reversed: boolean;
  }
): string {
  const wordDigitList = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  const reversedWordDigitList = wordDigitList.map((word) =>
    word.split('').reverse().join('')
  );

  let currentWord = '';

  if (options?.reversed) {
    for (let i = input.length - 1; i >= 0; i--) {
      const char = input[i];

      currentWord += char;

      reversedWordDigitList.forEach((wordDigit, idx) => {
        currentWord = currentWord.replace(wordDigit, `${idx}`);
      });
    }

    currentWord = currentWord.split('').reverse().join('');
  } else {
    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      currentWord += char;

      wordDigitList.forEach((wordDigit, idx) => {
        currentWord = currentWord.replace(wordDigit, `${idx}`);
      });
    }
  }

  return currentWord;
}
