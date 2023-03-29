import {adverts} from './get-adverts-data.js';

const popup = document.querySelector('#card').content.querySelector('.popup');
const advertPlace = document.querySelector('.adverts');

const ADVERT_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const POPUP_FEATURE_CLASS = '.popup__feature';

const ADVERT_FEATURES_CLASS = {
  wifi: `${POPUP_FEATURE_CLASS}--wifi`,
  dishwasher: `${POPUP_FEATURE_CLASS}--dishwasher`,
  parking: `${POPUP_FEATURE_CLASS}--parking`,
  washer: `${POPUP_FEATURE_CLASS}--washer`,
  elevator: `${POPUP_FEATURE_CLASS}--elevator`,
  conditioner: `${POPUP_FEATURE_CLASS}--conditioner`,
};

const getFeaturesList = (features, element) => {
  if (!features.length) {
    element.querySelector('.popup__features').remove();
  } else {
    for (let feature in ADVERT_FEATURES_CLASS) {
      if (!features.includes(feature)) {
        element.querySelector(ADVERT_FEATURES_CLASS[feature]).remove();
      }
    }
  }
};

const getPhotosList = (photos, element) => {
  if (!photos.length) {
    element.querySelector('.popup__photos').remove();
  } else {
    element.querySelector('.popup__photo').src = photos[0];
    for (let i = 1; i <= photos.length - 1; i++) {
      let img = element.querySelector('.popup__photo').cloneNode();
      img.src = photos[i];
      element.querySelector('.popup__photos').appendChild(img);
    }
  }
};

const createAdvert = (adv) => {
  const advertElement = popup.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = adv.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = adv.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${adv.offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = ADVERT_TYPE[adv.offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = `${adv.offer.rooms} комнаты для ${adv.offer.guests} гостей`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${adv.offer.checkin}, выезд до ${adv.offer.checkout}`;
  getFeaturesList(adv.offer.features, advertElement);
  advertElement.querySelector('.popup__description').textContent = adv.offer.description;
  advertElement.querySelector('.popup__avatar').src = adv.author.avatar;
  getPhotosList(adv.offer.photos, advertElement);
  return advertElement;
};

export {createAdvert};
