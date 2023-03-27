import {activatePage} from './page-condition.js';
import {adverts} from './get-adverts-data.js';
import {createAdvert} from './create-adverts.js';
import {COORDINATE_ROUND, CENTER_TOKYO} from './const/common.js';
import {getMainPinAddress} from './form.js';

const MAP_ZOOM = 12;

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

for (let adv of adverts) {
  addPin(adv);
}

// Получение координат при перемещении главного пина

mainPin.on('moveend', (evt) => {
  getMainPinAddress(evt.target.getLatLng());
});
