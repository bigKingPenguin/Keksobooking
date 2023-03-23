const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectCheckin = document.querySelector('#timein');
const selectCheckout = document.querySelector('#timeout');

// Изменение поля "ТИП ЖИЛЬЯ"

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 2500,
  house: 5000,
  palace: 10000,
};

selectType.addEventListener('change', () => {
  inputPrice.placeholder = minPrice[selectType.value];
  asz;
  inputPrice.value = minPrice[selectType.value];
});


// Изменение поля "ВРЕМЯ ЗАЕЗДА" и "ВРЕМЯ ВЫЕЗДА"

selectCheckin.addEventListener('change', () => {
  selectCheckout.value = selectCheckin.value;
});

selectCheckout.addEventListener('change', () => {
  selectCheckin.value = selectCheckout.value;
});
