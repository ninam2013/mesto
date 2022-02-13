import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';

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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const KEY_ESC = 27;


// контейнер с карточками
const placesContainer = document.querySelector('.places__container');

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


const editFormValidator = new FormValidator(config, formEditProfile);
const cardFormValidator = new FormValidator(config, formCardElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();



// открытие модалки
function openModal(modal) {
  modal.classList.add('popup_open');
  document.addEventListener('keyup', (evt) => closeModalEsc(evt, modal));
}



// закрытие модалки
function closeModal(modal) {
  modal.classList.remove('popup_open');
  document.removeEventListener('keyup', (evt) => closeModalEsc(evt, modal));
}



// закрытие модалки Esc
function closeModalEsc(evt, modal) {
  const key = evt.keyCode;

  if (key == KEY_ESC) {
    closeModal(modal)
  };
}



// закрытие модалки кликом на оверлей
function closeModalOverlay(modal) {
  modal.classList.remove('popup_open');
}



// создание popup карты
export function openImagePopup(cardImage, placeTitle) {
  popupCardImage.src = cardImage.src;
  popupCardImage.alt = cardImage.alt;
  popupCardTitle.textContent = placeTitle.textContent;

  openModal(popupIncreaseCard)
}



// работа с формами
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closeModal(popupEditProfile);
}



function handleCardFormSubmit(evt) {
  evt.preventDefault();

  createCard({
    name: nameCardInput.value,
    link: linkCardInput.value
  });

  nameCardInput.value = '';
  linkCardInput.value = '';

  cardFormValidator.disableButton(popuButton);

  closeModal(popupAddCard);
}



// добавление новой карточки
function createCard(data) {

  const placeElement = new Card(data, '.place-template');
  const cardElement = placeElement.getNewCardElement();
  placesContainer.prepend(cardElement);
}


// остановка всплытия события клик
function stopFormsClickPropagation() {

  document.querySelectorAll('.popup__container').forEach(popupElement => {
    popupElement.addEventListener('click', (e) => e.stopPropagation());
  })
}

stopFormsClickPropagation()



// открытие и закрытие модалок
popupProfileOpenButton.addEventListener('click', () => openModal(popupEditProfile));
popupProfileCloseButton.addEventListener('click', () => closeModal(popupEditProfile));
popupEditProfile.addEventListener('click', () => closeModalOverlay(popupEditProfile));
popupCardOpenButton.addEventListener('click', () => openModal(popupAddCard));
popupCardCloseButton.addEventListener('click', () => closeModal(popupAddCard));
popupAddCard.addEventListener('click', () => closeModalOverlay(popupAddCard));
popupCardCloseButtonIncrease.addEventListener('click', () => closeModal(popupIncreaseCard));
popupIncreaseCard.addEventListener('click', () => closeModalOverlay(popupIncreaseCard));

// навешиваем обработчики событий при отправке формы
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);


initialCards.reverse().forEach(createCard);


nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
