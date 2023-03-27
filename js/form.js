const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectCheckin = document.querySelector('#timein');
const selectCheckout = document.querySelector('#timeout');

// Изменение поля "ТИП ЖИЛЬЯ"

const MIN_APARTMENT_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 2500,
  house: 5000,
  palace: 10000,
};

selectType.addEventListener('change', () => {
  inputPrice.placeholder = MIN_APARTMENT_PRICE[selectType.value];
  inputPrice.value = MIN_APARTMENT_PRICE[selectType.value];
});


// Изменение поля "ВРЕМЯ ЗАЕЗДА" и "ВРЕМЯ ВЫЕЗДА"

selectCheckin.addEventListener('change', () => {
  selectCheckout.value = selectCheckin.value;
});

selectCheckout.addEventListener('change', () => {
  selectCheckin.value = selectCheckout.value;
});
