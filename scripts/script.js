const popupOpenButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_js_name');
const jobInput = document.querySelector('.popup__input_js_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

function togglePopup() {
  popup.classList.toggle('popup_open');
  if (popup.classList.contains('popup_open')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  popup.classList.remove('popup_open');
}
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


initialCards.forEach((placeData) => {

  const placesContainer = document.querySelector('.places__container');
  const placeTemplate = document.querySelector('.place-template').content;

  const placeElement = placeTemplate.cloneNode(true);
  placeElement.querySelector('.place__image').src = placeData.link;
  placeElement.querySelector('.place__title').textContent = placeData.name;

  placesContainer.append(placeElement);
});

// closest - поиск снизу вверх
