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


const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// модалки
const popupEditProfile = document.querySelector('.popup_type-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');

// формы
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formCardElement = popupAddCard.querySelector('.popup__form');

//кнопки
const popuButton = document.querySelector('.popup__button_js_card-submit');
const popupProfileOpenButton = document.querySelector('.profile__button');
const popupProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupCardCloseButtonIncrease = popupIncreaseCard.querySelector('.popup__close');

// инпуты
const nameInput = document.querySelector('.popup__input_js_name');
const jobInput = document.querySelector('.popup__input_js_job');
const nameCardInput = document.querySelector('.popup__input_js_card-name');
const linkCardInput = document.querySelector('.popup__input_js_card-link');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

const popupCardImage = document.querySelector('.popup__img');
const popupCardTitle = document.querySelector('.popup__title-card');



// открытие и закрытие модалок
function toggleModal(modal) {
  modal.classList.toggle('popup_open');
}


// закрытие модалки Esc
function closeModalEsc(evt, modal) {           //1
  const key = evt.keyCode;
  if (key == 27) {
    modal.classList.remove('popup_open');
  };
}


// закрытие модалки кликом на оверлей
function closeModalOverlay(modal) {             //1
  modal.classList.remove('popup_open');
}



// создание popup карты
function openImagePopup(cardImage, placeTitle) {
  popupCardImage.src = cardImage.src;
  popupCardImage.alt = cardImage.alt;
  popupCardTitle.textContent = placeTitle.textContent;

  toggleModal(popupIncreaseCard)
}



// работа с формами
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  toggleModal(popupEditProfile);
}


function handleCardFormSubmit(evt) {
  evt.preventDefault();

  createCard({
    name: nameCardInput.value,
    link: linkCardInput.value
  });

  nameCardInput.value = '';
  linkCardInput.value = '';

  disableButton(popuButton, classes);

  toggleModal(popupAddCard);
}


// открытие и закрытие модалок
popupProfileOpenButton.addEventListener('click', () => toggleModal(popupEditProfile));
popupProfileCloseButton.addEventListener('click', () => toggleModal(popupEditProfile));
window.addEventListener('keyup', (evt) => closeModalEsc(evt, popupEditProfile));       //1
popupEditProfile.addEventListener('click', () => closeModalOverlay(popupEditProfile));   //1
popupCardOpenButton.addEventListener('click', () => toggleModal(popupAddCard));
popupCardCloseButton.addEventListener('click', () => toggleModal(popupAddCard));
window.addEventListener('keyup', (evt) => closeModalEsc(evt, popupAddCard));               //1
popupAddCard.addEventListener('click', () => closeModalOverlay(popupAddCard));                        //1
popupCardCloseButtonIncrease.addEventListener('click', () => toggleModal(popupIncreaseCard));
window.addEventListener('keyup', (evt) => closeModalEsc(evt, popupIncreaseCard));       //1
popupIncreaseCard.addEventListener('click', () => closeModalOverlay(popupIncreaseCard));   //1

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);


// создание карточек из template
const placesContainer = document.querySelector('.places__container');
const placeTemplate = document.querySelector('.place-template').content;


// активация сердечка карточки
function toggleLike(evt) {
  evt.target.classList.toggle('place__button_active');
}

// создание новой карточки, вызов открытия модалки карточки, нажатия like и удаление карточки
function getNewCardElement(item) {
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardElement.querySelector('.place__image');
  const placeTitle = cardElement.querySelector('.place__title');

  cardImage.src = item.link;
  cardImage.alt = 'карточка ' + item.name;
  placeTitle.textContent = item.name;


  cardImage.addEventListener('click', () => openImagePopup(cardImage, placeTitle));

  cardElement
    .querySelector('.place__button')
    .addEventListener('click', toggleLike);

  cardElement
    .querySelector('.place__basket')
    .addEventListener(
      'click',
      () => cardElement.remove()
    );

  return cardElement
}

// добавление новой карточки
function createCard(placeData) {
  const placeElement = getNewCardElement(placeData)
  placesContainer.prepend(placeElement);
}

initialCards.reverse().forEach(createCard);



nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

enableValidation(classes);
