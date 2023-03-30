import {MIN_APARTMENT_PRICE} from './form.js';

const form = document.querySelector('.ad-form');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE_VALUE = 1000000;

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

// Подсветка невалидных инпутов

form.querySelector('.ad-form__submit').addEventListener('click', () => {
  for (let input of form) {
    if (!input.validity.valid) {
      input.classList.add('ad-form__input--error');
    }
  }
});

const removeInvalidInputBorder = () => {
  for (let input of form) {
    input.classList.remove('ad-form__input--error');
  }
};

export {removeInvalidInputBorder};
