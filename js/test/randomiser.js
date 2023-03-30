const checkMinMaxValues = (min, max) => {
  if (min < 0) {
    console.log('Минимальное значение не должно быть меньше 0');   // пока выводим в консоль
  } else if (max === min || min > max) {
    console.log('Максимальное значение должно быть больше минимального'); // пока выводим в консоль
  } else {
    return true;
  }
};

const getRandomInteger = (min, max) => {
  if (checkMinMaxValues(min, max)) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

const getRandomFloat = (min, max, round) => {
  if (checkMinMaxValues(min, max)) {
    return (Math.random() * (max - min) + min).toFixed(round);
  }
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArray = (array) => {
  const usedElements = [];
  const arrayLength = getRandomInteger(0, array.length);
  for (let i = 0; i <= arrayLength; i++) {
    const index = getRandomInteger(0, array.length - 1);
    if (!usedElements.includes(array[index])) {
      usedElements.push(array[index]);
    }
  }
  return usedElements;
};

export {
  getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray,
};
