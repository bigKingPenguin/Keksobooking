import {CENTER_TOKYO, MAP_ZOOM, COORDINATE_ROUND} from './const/common.js';
import {SERVER} from './const/urls.js';
import {api} from './server.js';
import {showSubmitSuccess, showSubmitError} from './messages.js';
import {mainPin, map} from './map.js';

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
const guestsNumber = Array.from(form.capacity.querySelectorAll('option'));
const formResetButton = form.querySelector('.ad-form__reset');

// Получение координат главной метки

const getMainPinAddress = (coordinates) => {
  form.address.value = `${coordinates.lat.toFixed(COORDINATE_ROUND)}, ${coordinates.lng.toFixed(COORDINATE_ROUND)}`;
};

// Валидация формы

// Валидация поля "ЗАГОЛОВОК"

form.title.addEventListener('input', () => {
  if (form.title.value.length < MIN_TITLE_LENGTH) {
    form.title.setCustomValidity('Минимальная длина заголовка 30 символов');
  } else if (form.title.value.length > MAX_TITLE_LENGTH) {
    form.title.setCustomValidity('Максимальная длина заголовка 100 символов');
  } else {
    form.title.setCustomValidity('');
  }
  form.title.reportValidity();
});

// Изменение поля "ТИП ЖИЛЬЯ"

form.price.min = MIN_APARTMENT_PRICE[form.type.value];
form.price.placeholder = MIN_APARTMENT_PRICE[form.type.value];

form.type.addEventListener('change', () => {
  form.price.placeholder = MIN_APARTMENT_PRICE[form.type.value];
  form.price.min = MIN_APARTMENT_PRICE[form.type.value];
});

// Валидация поля "ЦЕНА ЗА НОЧЬ"

form.price.addEventListener('input', () => {
  if (form.price.value < form.price.min) {
    form.price.setCustomValidity(`Минимальная цена для данного типа жилья ${MIN_APARTMENT_PRICE[form.type.value]} руб.`);
  } else if (form.price.value > MAX_PRICE_VALUE) {
    form.price.setCustomValidity('Цена не может быть выше 1 000 000 руб.');
  } else {
    form.price.setCustomValidity('');
  }
  form.price.reportValidity();
});

// price.addEventListener('invalid', (evt) => price.classList.add('ad-form__input--error'))

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

// Очистка формы
// — все заполненные поля возвращаются в изначальное состояние;
// — фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
// — метка адреса возвращается в исходное положение;
// — значение поля адреса корректируется соответственно исходному положению метки.

const resetForm = () => {
  form.reset();
  mainPin.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, MAP_ZOOM);
  setTimeout(() => getMainPinAddress(CENTER_TOKYO)); // TODO: иначе координаты не выставляются
};

formResetButton.addEventListener('click', resetForm);

// Отправка данных

form.querySelector('.ad-form__submit').addEventListener('click', () => {
  for (let input of form) {
    if (!input.validity.valid) {
      input.classList.add('ad-form__input--error');
    }
  }
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  for (let input of form) {
    input.classList.remove('ad-form__input--error');
  }
  api({
    url: SERVER,
    method: 'POST',
    body: evt.target,
    onSuccess: (data) => {
      showSubmitSuccess(data);
      resetForm();
    },
    onError: (error) => showSubmitError(error),
  });
});

export {getMainPinAddress};
