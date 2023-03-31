const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const imageInput = document.querySelector('#images');
const imagePreview = document.querySelector('#photo-container').content.querySelector('.ad-form__photo');
const imageContainer = document.querySelector('.ad-form__photo-container');

const AVATAR_DEFAULT_URL = 'img/muffin-grey.svg';

const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const loadAvatarPreview = () => {
  const file = avatarInput.files[0];
  const matches = FILE_TYPES.some((it) => file.type === it);
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
      avatarPreview.width = '70';
      avatarPreview.height = '70';
      avatarPreview.style.objectFit = 'cover';
    });
    reader.readAsDataURL(file);
  }
};

const loadPhotoPreview = () => {
  const files = Array.from(imageInput.files);
  for (let file of files) {
    const matches = FILE_TYPES.some((it) => file.type === it);
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const preview = imagePreview.cloneNode();
        preview.style.backgroundImage = `url("${reader.result.toString()}")`;
        preview.style.backgroundSize = 'cover';
        imageContainer.appendChild(preview);
      });
      reader.readAsDataURL(file);
    }
  }
};

const removeAvatarPreview = () => {
  avatarPreview.src = AVATAR_DEFAULT_URL;
  avatarPreview.width = '40';
  avatarPreview.height = '40';
  avatarPreview.style = '';
};

const removePhotoPreview = () => {
  const previews = Array.from(imageContainer.querySelectorAll('.ad-form__photo'));
  for (let img of previews) img.remove();
};

avatarInput.addEventListener('change', loadAvatarPreview);
imageInput.addEventListener('change', loadPhotoPreview);

export {removeAvatarPreview, removePhotoPreview};
