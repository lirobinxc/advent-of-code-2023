export type RGB = { red: number; green: number; blue: number };

export function parseGameStringToObject(gameInput: string) {
  const gameData = gameInput.split(': ')[1].trim();
  const playList = gameData.split('; ');

  const sortedResultsList = playList.map((play) => {
    const parsedPlay = play.split(', ');
    const parseSplit = parsedPlay.map((color) => {
      const data = color.split(' ');
      return {
        color: data[1],
        num: parseInt(data[0]),
      } as {
        color: keyof RGB;
        num: number;
      };
    });
    return parseSplit;
  });

  const final = sortedResultsList.map((play) => {
    const data: RGB = {
      red: 0,
      green: 0,
      blue: 0,
    };

    play.forEach((cube) => {
      data[cube.color] = cube.num;
    });

    return data;
  });

  return final;
}
