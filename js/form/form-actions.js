import {CENTER_TOKYO, MAP_ZOOM} from '../const/common.js';
import {SERVER} from '../const/urls.js';
import {api} from '../server.js';
import {showSubmitSuccess, showSubmitError} from '../messages.js';
import {mainPin, map} from '../map.js';
import {getMainPinAddress, removeInvalidInputBorder} from './form.js';

const form = document.querySelector('.ad-form');

const formResetButton = form.querySelector('.ad-form__reset');

// Очистка формы
// — все заполненные поля возвращаются в изначальное состояние;
// — фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
// — метка адреса возвращается в исходное положение;
// — значение поля адреса корректируется соответственно исходному положению метки.

const resetForm = () => {
  form.reset();
  removeInvalidInputBorder();
  mainPin.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, MAP_ZOOM);
  setTimeout(() => getMainPinAddress(CENTER_TOKYO)); // TODO: иначе координаты не выставляются
};

formResetButton.addEventListener('click', resetForm);

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
