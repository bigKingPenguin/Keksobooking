import {adverts} from './get-adverts-data.js';

const popup = document.querySelector('#card').content.querySelector('.popup');
const advertPlace = document.querySelector('.adverts');
const advertList = document.createDocumentFragment();

const ADVERT_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const ADVERT_FEATURES = {
  wifi: '.popup__feature--wifi',
  dishwasher: '.popup__feature--dishwasher',
  parking: '.popup__feature--parking',
  washer: '.popup__feature--washer',
  elevator: '.popup__feature--elevator',
  conditioner: '.popup__feature--conditioner',
};

const getFeaturesList = (features, element) => {
  if (!features.length) {
    element.querySelector('.popup__features').remove();
  } else {
    for (let feature in ADVERT_FEATURES) {
      if (!features.includes(feature)) {
        element.querySelector(ADVERT_FEATURES[feature]).remove();
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

adverts.forEach((adv) => {
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
  advertList.appendChild(advertElement);
});

advertPlace.appendChild(advertList);
