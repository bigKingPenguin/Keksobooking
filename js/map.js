import {activatePage} from './page-condition.js';
import {createAdvert} from './create-adverts.js';
import {CENTER_TOKYO, MAP_ZOOM, ADVERT_QUANTITY} from './const/common.js';
import {getMainPinAddress} from './form/form.js';

const LAYER_PARAMETERS = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const PIN_MAIN = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const PIN = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Создание карты
const map = L.map('map-canvas').setView(CENTER_TOKYO, MAP_ZOOM);

const tileLayer = L.tileLayer(LAYER_PARAMETERS.TILE_LAYER, {
    attribution: LAYER_PARAMETERS.ATTRIBUTION,
  },
);

// Инициализация карты

tileLayer
.on('load', activatePage)
.addTo(map);

// Создание и инициализация пинов

const mainPin = L.marker(CENTER_TOKYO, {draggable: true, icon: PIN_MAIN})
.addTo(map);

getMainPinAddress(CENTER_TOKYO);

const addPin = (adv) => {
  L.marker(adv.location, {icon: PIN})
  .bindPopup(createAdvert(adv))
  .addTo(map);
};

const initPins = (adverts) => {
  for (let adv of adverts.slice(0, ADVERT_QUANTITY)) {
    addPin(adv);
  }
};

// Получение координат при перемещении главного пина

mainPin.on('moveend', (evt) => {
  getMainPinAddress(evt.target.getLatLng());
});

export {initPins, mainPin, map};
