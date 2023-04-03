import {debounce} from '../utils/util.js';
import {TIMEOUT_DEBOUNCE} from '../const/common.js';
import {currentAdverts} from '../main.js';
import {initPins, removePins} from './map.js';

const filters = document.querySelector('.map__filters');
const typeFilter = filters['housing-type'];
const priceFilter = filters['housing-price'];
const roomsFilter = filters['housing-rooms'];
const guestsFilter = filters['housing-guests'];
const featuresFilter = filters.querySelectorAll('.map__checkbox');

const PRICE_RANGE = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

const DEFAULT_VALUE = 'any';

const isTypeFilter = (adv) => typeFilter.value === adv.offer.type || typeFilter.value === DEFAULT_VALUE;
const isRoomsFilter = (adv) => +roomsFilter.value === adv.offer.rooms || roomsFilter.value === DEFAULT_VALUE;
const isGuestsFilter = (adv) => +guestsFilter.value === adv.offer.guests || guestsFilter.value === DEFAULT_VALUE;
const isPriceFilter = (adv) => priceFilter.value === DEFAULT_VALUE || (adv.offer.price >= PRICE_RANGE[priceFilter.value].min && adv.offer.price <= PRICE_RANGE[priceFilter.value].max);
const isFeaturesFilter = (adv) => {
  let features = [];
  for (let feature of featuresFilter) {  // перебор чекбоксов
    if (feature.checked) {
      features.push(feature.value);  // если чекбокс отмечен, значение записывается в массив
    }
  }
  if (!features.length) return true;  // если массив свойств пустой, все объявления подходят под критерии
  if (!adv.offer.features) return false; // если в объявлении нет свойств, это объявление не подходит
  return features.every((i) => {
    return adv.offer.features.includes(i);  // если все выбранные свойства есть в объявлении, объявление подходит
  });
};

const checkFilters = () => {
  const filteredAdvs = [];
  for (let adv of currentAdverts) {
    if (isTypeFilter(adv) && isRoomsFilter(adv) && isGuestsFilter(adv) && isPriceFilter(adv) && isFeaturesFilter(adv)) {
      filteredAdvs.push(adv);
    }
  }
  removePins();
  initPins(filteredAdvs);
};

filters.addEventListener('change', () => debounce(() => checkFilters(), TIMEOUT_DEBOUNCE));

const resetFilters = () => {
  filters.reset();
  removePins();
  initPins(currentAdverts);
};

export {resetFilters};
