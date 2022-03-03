import { Card } from './Сard.js';
import { Section } from './Section.js';
// import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
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


// контейнер с карточками
const placesContainer = document.querySelector('.places__container');

// модалки
const popupEditProfile = document.querySelector('.popup_type-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');

// формы
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formCardElement = popupAddCard.querySelector('.popup__form');

//кнопки
const popuButton = document.querySelector('.popup__button_js_card-submit');
const popupProfileOpenButton = document.querySelector('.profile__button');
const popupCardOpenButton = document.querySelector('.profile__add-button');

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


// заполнение формы последними значениями
function fillModalForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.toggleButton()
}



// работа с формами
function handleProfileFormSubmit(inputValues) {
  profileName.textContent = inputValues.name;    // смена надписи согласно введенным данным в форме
  profileJob.textContent = inputValues.job;
}



function handleCardFormSubmit() {

  cardList.renderer({                           // вызов параметра _renderer класса Section для создания карточки
    name: nameCardInput.value,
    link: linkCardInput.value
  });

  nameCardInput.value = '';
  linkCardInput.value = '';

  cardFormValidator.disableButton(popuButton);    //выключение кнопки формы

  popupCard.close()                               // закрываем popup
}



popupProfileOpenButton.addEventListener('click', () => { popupEdit.open(); fillModalForm() });    // при клике открывается popup профиля
popupCardOpenButton.addEventListener('click', () => popupCard.open());                            // при клике открывается popup создания карточки




const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const placeElement = new Card(cardItem, '.place-template');   // добавляем экземпляр карточки
      const cardElement = placeElement.getNewCardElement();         // заполняем карточку
      cardList.addItem(cardElement);                                // добавляем карточку
    },
  },
  '.places__container'
);

cardList.renderItems();       // перебираем карточки


const popupEdit = new PopupWithForm( '.popup_type-edit', handleProfileFormSubmit);
const popupCard = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
