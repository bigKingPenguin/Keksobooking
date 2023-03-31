import {CENTER_TOKYO, MAP_ZOOM} from '../const/common.js';
import {SERVER} from '../const/urls.js';
import {api} from '../server.js';
import {showSubmitSuccess, showSubmitError} from '../messages.js';
import {mainPin, map} from '../map/map.js';
import {getMainPinAddress, removeInvalidInputBorder} from './form.js';
import {resetFilters} from '../map/map-filter.js';

const form = document.querySelector('.ad-form');
const formResetButton = form.querySelector('.ad-form__reset');

// Отправка данных

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  removeInvalidInputBorder();
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

// Очистка формы

const resetForm = () => {
  form.reset();
  mainPin.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, MAP_ZOOM);
  resetFilters();
  removeInvalidInputBorder();
  setTimeout(() => getMainPinAddress(CENTER_TOKYO)); // иначе координаты не выставляются
};

formResetButton.addEventListener('click', resetForm);
