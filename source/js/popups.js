import {ESC_KEYCODE, TIMEOUT_POPUP_CLOSE} from './const/common.js';

const map = document.querySelector('.map');
const main = document.querySelector('main');
const loadDataErrorPopup = document.querySelector('#data-error').content.querySelector('.data-error');
const buttonCloseLoadDataError = loadDataErrorPopup.querySelector('.data-error__close');
const submitErrorPopup = document.querySelector('#error').content.querySelector('.error');
const buttonCloseSubmitErrorPopup = submitErrorPopup.querySelector('.error__button');
const submitSuccessPopup = document.querySelector('#success').content.querySelector('.success');

let activeTimeout;
let activePopup;

const removePopup = (evt) => {
  clearTimeout(activeTimeout);
  activePopup.remove();
};

const removePopupOnEsc = (evt) => {
  if (evt.key === ESC_KEYCODE) {
    removePopup(evt);
  }
};

const addPopupCloseListeners = (popup, button) => {
  activeTimeout = setTimeout(() => activePopup.remove(), TIMEOUT_POPUP_CLOSE);
  if (button) {
    button.addEventListener('click', removePopup);
  }
  document.addEventListener('click', removePopup);
  window.addEventListener('keydown', removePopupOnEsc);
};

const appearPopup = (popup, place) => {
  activePopup = popup.cloneNode(true);
  place.appendChild(activePopup);
};

const showPopupLoadDataError = () => {
  appearPopup(loadDataErrorPopup, map);
  addPopupCloseListeners(loadDataErrorPopup, buttonCloseLoadDataError);
};

const showPopupSubmitSuccess = () => {
  appearPopup(submitSuccessPopup, main);
  addPopupCloseListeners(submitSuccessPopup);
};

const showPopupSubmitError = () => {
  appearPopup(submitErrorPopup, main);
  addPopupCloseListeners(submitSuccessPopup, buttonCloseSubmitErrorPopup);
};

export {showPopupLoadDataError, showPopupSubmitSuccess, showPopupSubmitError};
