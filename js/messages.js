import {ESC_KEYCODE} from './const/common.js';

const map = document.querySelector('.map');
const main = document.querySelector('main');
const loadDataErrorPopup = document.querySelector('#data-error').content.querySelector('.data-error');
const buttonCloseLoadDataError = loadDataErrorPopup.querySelector('.data-error__close');
const submitErrorPopup = document.querySelector('#error').content.querySelector('.error');
const buttonCloseSubmitErrorPopup = submitErrorPopup.querySelector('.error__button');
const submitSuccessPopup = document.querySelector('#success').content.querySelector('.success');

const TIMEOUT = 5000;

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
  activeTimeout = setTimeout(() => activePopup.remove(), TIMEOUT);
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

const showLoadDataError = () => {
  appearPopup(loadDataErrorPopup, map);
  addPopupCloseListeners(loadDataErrorPopup, buttonCloseLoadDataError);
};

const showSubmitSuccess = () => {
  appearPopup(submitSuccessPopup, main);
  addPopupCloseListeners(submitSuccessPopup);
};

const showSubmitError = () => {
  appearPopup(submitErrorPopup, main);
  addPopupCloseListeners(submitSuccessPopup, buttonCloseSubmitErrorPopup);
};

export {showLoadDataError, showSubmitSuccess, showSubmitError};
