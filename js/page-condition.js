const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = Array.from(mapFilter.children);
const formSection = document.querySelector('.ad-form');
const formInteractiveElements = formSection.querySelectorAll('fieldset');

// Inactive
document.addEventListener('DOMContentLoaded', () => {
  formSection.classList.add('ad-form--disabled');
  formInteractiveElements.forEach(i => i.setAttribute('disabled', 'disabled'));
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElements.forEach(i => i.setAttribute('disabled', 'disabled'));
});

// Active
const activatePage = () => {
  formSection.classList.remove('ad-form--disabled');
  formInteractiveElements.forEach(i => i.removeAttribute('disabled'));
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElements.forEach(i => i.removeAttribute('disabled'));
};

export {activatePage};
