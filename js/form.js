import {COORDINATE_ROUND} from './const/common.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE_VALUE = 1000000;
const MIN_APARTMENT_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 2500,
  house: 5000,
  palace: 10000,
};

const GUEST_QUANTITY = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const form = document.querySelector('.ad-form');

const title = form.title;
const price = form.price;
const type = form.type;
const checkin = form.timein;
const checkout = form.timeout;
const roomNumber = form['room_number'];
const guestsNumber = Array.from(form.capacity.querySelectorAll('option'));

// Получение координат главной метки

const getMainPinAddress = (coordinates) => {
  form.address.value = `${coordinates.lat.toFixed(COORDINATE_ROUND)}, ${coordinates.lng.toFixed(COORDINATE_ROUND)}`;
};

// Валидация формы

// Валидация поля "ЗАГОЛОВОК"

title.addEventListener('input', () => {
  if (title.value.length < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Минимальная длина заголовка 30 символов');
  } else if (title.value.length > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Максимальная длина заголовка 100 символов');
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

// Изменение поля "ТИП ЖИЛЬЯ"

price.min = MIN_APARTMENT_PRICE[type.value];
price.placeholder = MIN_APARTMENT_PRICE[type.value];

type.addEventListener('change', () => {
  price.placeholder = MIN_APARTMENT_PRICE[type.value];
  price.min = MIN_APARTMENT_PRICE[type.value];
});

// Валидация поля "ЦЕНА ЗА НОЧЬ"

price.addEventListener('input', () => {
  if (price.value < price.min) {
    price.setCustomValidity(`Минимальная цена для данного типа жилья ${MIN_APARTMENT_PRICE[type.value]} руб.`);
  } else if (price.value > MAX_PRICE_VALUE) {
    price.setCustomValidity('Цена не может быть выше 1 000 000 руб.');
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

// Изменение поля "ВРЕМЯ ЗАЕЗДА" и "ВРЕМЯ ВЫЕЗДА"

checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});

// Изменение поля "КОЛИЧЕСТВО КОМНАТ"

roomNumber.addEventListener('change', () => {
  for (let guests of guestsNumber) {
    if (!GUEST_QUANTITY[roomNumber.value].includes(guests.value)) {
      guests.disabled = true;
      guests.selected = false;

    } else {
      guests.disabled = false;
      guests.selected = true;
    }
  }
});

export {getMainPinAddress};
