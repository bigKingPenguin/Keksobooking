// import * as randomize from './util/randomiser.js';
// import {COORDINATE_ROUND} from './const/common.js';
//
// const TITLE = [
//   'Чистая квартира',
//   'Уютная квартира',
//   'Светлая квартира',
//   'Просторная квартира',
//   'Бабкина квартира',
// ];
//
// const TYPE = [
//   'palace',
//   'flat',
//   'house',
//   'bungalow',
// ];
//
// const CHECKIN_OUT = [
//   '12:00',
//   '13:00',
//   '14:00',
// ];
//
// const FEATURES = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner',
// ];
//
// const DESCRIPTION = [
//   'Дружелюбные соседи (но это не точно)',
//   'Зато близко к метро',
//   'Не подвал, а полуподвальное помещение',
//   'Можно со своими тараканами',
//   'Хрущевский дизайн-проект',
// ];
//
// const PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
// ];
//
// const COORDINATE_X_MIN = 35.65000;
// const COORDINATE_X_MAX = 35.70000;
// const COORDINATE_Y_MIN = 139.70000;
// const COORDINATE_Y_MAX = 139.80000;
//
// const AVATAR_NUMBER_MIN = 1;
// const AVATAR_NUMBER_MAX = 8;
//
// const ADVERT_QUANTITY = 10;
//
// const getRandomAdvert = () => {
//   const location = {
//     lat: randomize.getRandomFloat(COORDINATE_X_MIN, COORDINATE_X_MAX, COORDINATE_ROUND),
//     lng: randomize.getRandomFloat(COORDINATE_Y_MIN, COORDINATE_Y_MAX, COORDINATE_ROUND),
//   };
//   return {
//     author: {
//       avatar: `img/avatars/user0${randomize.getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.png`,  //число от 1 до 8 с ведущим нулём. Например, 01 , 02
//     },
//     offer: {
//       title: randomize.getRandomArrayElement(TITLE),
//       address: `${location.lat}, ${location.lng}`, //{{location.x}}, {{location.y}}
//       price: randomize.getRandomInteger(300, 10000), // Случайное целое положительное число
//       type: randomize.getRandomArrayElement(TYPE),
//       rooms: randomize.getRandomInteger(1, 5), // Случайное целое положительное число
//       guests: randomize.getRandomInteger(1, 10), // Случайное целое положительное число
//       checkin: randomize.getRandomArrayElement(CHECKIN_OUT),
//       checkout: randomize.getRandomArrayElement(CHECKIN_OUT),
//       features: randomize.getRandomArray(FEATURES), //массив случайной длины из значений (Значения не должны повторяться)
//       description: randomize.getRandomArrayElement(DESCRIPTION),
//       photos: randomize.getRandomArray(PHOTOS), // массив случайной длины из значений
//     },
//     location: location,
//   };
// };
//
// const adverts = [];
// const createAdvertArray = () => {
//   for (let i = 1; i <= ADVERT_QUANTITY; i++) {
//     adverts.push(getRandomAdvert());
//   }
// };
//
// createAdvertArray();
//
// export {
//   adverts,
// };
