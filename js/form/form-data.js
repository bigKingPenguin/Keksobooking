import {COORDINATE_ROUND} from '../const/common.js';

const form = document.querySelector('.ad-form');
const guestsNumber = Array.from(form.capacity.querySelectorAll('option'));

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

// Получение координат главной метки

const getMainPinAddress = (coordinates) => {
  form.address.value = `${coordinates.lat.toFixed(COORDINATE_ROUND)}, ${coordinates.lng.toFixed(COORDINATE_ROUND)}`;
};

// Изменение поля "ТИП ЖИЛЬЯ"

form.price.min = MIN_APARTMENT_PRICE[form.type.value];
form.price.placeholder = MIN_APARTMENT_PRICE[form.type.value];

form.type.addEventListener('change', () => {
  form.price.placeholder = MIN_APARTMENT_PRICE[form.type.value];
  form.price.min = MIN_APARTMENT_PRICE[form.type.value];
});

// Изменение поля "ВРЕМЯ ЗАЕЗДА" и "ВРЕМЯ ВЫЕЗДА"

form.timein.addEventListener('change', () => {
  form.timeout.value = form.timein.value;
});

form.timeout.addEventListener('change', () => {
  form.timein.value = form.timeout.value;
});

// Изменение поля "КОЛИЧЕСТВО КОМНАТ"

form.room_number.addEventListener('change', () => {
  for (let guests of guestsNumber) {
    if (!GUEST_QUANTITY[form.room_number.value].includes(guests.value)) {
      guests.disabled = true;
      guests.selected = false;

    } else {
      guests.disabled = false;
      guests.selected = true;
    }
  }
});

export {getMainPinAddress, MIN_APARTMENT_PRICE};
