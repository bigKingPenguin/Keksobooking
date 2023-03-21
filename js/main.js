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


// Lesson 3

const TITLE = [
  'Чистая квартира',
  'Уютная квартира',
  'Светлая квартира',
  'Просторная квартира',
  'Бабкина квартира',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Дружелюбные соседи (но это не точно)',
  'Зато близко к метро',
  'Не подвал, а полуподвальное помещение',
  'Можно со своими тараканами',
  'Хрущевский дизайн-проект',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const COORDINATE_X_MIN = 35.65000;
const COORDINATE_X_MAX = 35.70000;
const COORDINATE_Y_MIN = 139.70000;
const COORDINATE_Y_MAX = 139.80000;
const COORDINATE_ROUND = 5;

const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 8;

const ADVERT_QUANTITY = 10;

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

const getRandomAdvert = () => {
  const location = {
    x: getRandomFloat(COORDINATE_X_MIN, COORDINATE_X_MAX, COORDINATE_ROUND),
    y: getRandomFloat(COORDINATE_Y_MIN, COORDINATE_Y_MAX, COORDINATE_ROUND),
  };
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.png`,  //число от 1 до 8 с ведущим нулём. Например, 01 , 02
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `${location.x}, ${location.y}`, //{{location.x}}, {{location.y}}
      price: getRandomInteger(1, 50000), // Случайное целое положительное число
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInteger(1, 10), // Случайное целое положительное число
      guests: getRandomInteger(1, 20), // Случайное целое положительное число
      checkin: getRandomArrayElement(CHECKIN_OUT),
      checkout: getRandomArrayElement(CHECKIN_OUT),
      features: getRandomArray(FEATURES), //массив случайной длины из значений (Значения не должны повторяться)
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArray(PHOTOS), // массив случайной длины из значений
    },
    location: location,
  };
};

const adverts = [];
const createAdvertArray = () => {
  for (let i = 1; i <= ADVERT_QUANTITY; i++) {
    adverts.push(getRandomAdvert());
  }
};

createAdvertArray();

console.log(adverts);
