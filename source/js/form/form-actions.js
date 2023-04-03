import {CENTER_TOKYO, MAP_ZOOM} from '../const/common.js';
import {SERVER} from '../const/urls.js';
import {api} from '../server.js';
import {showPopupSubmitSuccess, showPopupSubmitError} from '../popups.js';
import {mainPin, map} from '../map/map.js';
import {getMainPinAddress, removeInvalidInputBorder} from './form.js';
import {removeAvatarPreview, removePhotoPreview} from './form-preview.js';
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
      showPopupSubmitSuccess(data);
      resetForm(evt);
    },
    onError: (error) => showPopupSubmitError(error),
  });
});

// Очистка формы

const resetForm = (evt) => {
  evt.preventDefault();
  form.reset();
  mainPin.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, MAP_ZOOM);
  resetFilters();
  removeInvalidInputBorder();
  removeAvatarPreview();
  removePhotoPreview();
  getMainPinAddress(CENTER_TOKYO);
};

formResetButton.addEventListener('click', resetForm);
