export const shuffleArray = (originalArray) => {
  const array = [...originalArray];

  for (let index = array.length - 1; index > 0; index--) {
    const random = Math.floor(Math.random() * (index + 1));
    [array[index], array[random]] = [array[random], array[index]];
  }

  return array;
};
