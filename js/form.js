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
const inputTitle = form.querySelector('#title');
const inputAddress = form.querySelector('#address');
const selectType = form.querySelector('#type');
const inputPrice = form.querySelector('#price');
const selectCheckin = form.querySelector('#timein');
const selectCheckout = form.querySelector('#timeout');
const selectRoomNumber = form.querySelector('#room_number');
const selectGuests = form.querySelector('#capacity');
const guestsNumber = Array.from(selectGuests.querySelectorAll('option'));

// Получение координат главной метки

const getMainPinAddress = (coordinates) => {
  inputAddress.value = `${coordinates.lat.toFixed(COORDINATE_ROUND)}, ${coordinates.lng.toFixed(COORDINATE_ROUND)}`;
};

// Валидация формы

// Валидация поля "ЗАГОЛОВОК"

inputTitle.addEventListener('input', () => {
  const inputLength = inputTitle.value.length;
  if (inputLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Минимальная длина заголовка 30 символов');
  } else if (inputLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Максимальная длина заголовка 100 символов');
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
});

// Изменение поля "ТИП ЖИЛЬЯ"

inputPrice.min = MIN_APARTMENT_PRICE[selectType.value];
inputPrice.placeholder = MIN_APARTMENT_PRICE[selectType.value];

selectType.addEventListener('change', () => {
  inputPrice.placeholder = MIN_APARTMENT_PRICE[selectType.value];
  inputPrice.min = MIN_APARTMENT_PRICE[selectType.value];
});

// Валидация поля "ЦЕНА ЗА НОЧЬ"

inputPrice.addEventListener('input', () => {
  const inputValue = inputPrice.value;
  if (inputValue < inputPrice.min) {
    inputPrice.setCustomValidity(`Минимальная цена для данного типа жилья ${MIN_APARTMENT_PRICE[selectType.value]} руб.`);
  } else if (inputValue > MAX_PRICE_VALUE) {
    inputPrice.setCustomValidity('Цена не может быть выше 1 000 000 руб.');
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
});

// Изменение поля "ВРЕМЯ ЗАЕЗДА" и "ВРЕМЯ ВЫЕЗДА"

selectCheckin.addEventListener('change', () => {
  selectCheckout.value = selectCheckin.value;
});

selectCheckout.addEventListener('change', () => {
  selectCheckin.value = selectCheckout.value;
});

// Изменение поля "КОЛИЧЕСТВО КОМНАТ"

selectRoomNumber.addEventListener('change', () => {
  for (let guests of guestsNumber) {
    if (!GUEST_QUANTITY[selectRoomNumber.value].includes(guests.value)) {
      guests.disabled = true;
      guests.selected = false;

    } else {
      guests.disabled = false;
      guests.selected = true;
    }
  }
});

export {getMainPinAddress};
