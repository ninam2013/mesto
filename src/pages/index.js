import '../../src/pages/index.css';
import { Card } from '../components/Сard.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';


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


// модалки
const popupEditProfile = document.querySelector('.popup_type-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');

// формы
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formCardElement = popupAddCard.querySelector('.popup__form');

//кнопки
const popupButton = document.querySelector('.popup__button_js_card-submit');
const popupProfileOpenButton = document.querySelector('.profile__button');
const popupCardOpenButton = document.querySelector('.profile__add-button');

// инпуты
const nameCardInput = document.querySelector('.popup__input_js_card-name');
const linkCardInput = document.querySelector('.popup__input_js_card-link');


const editFormValidator = new FormValidator(config, formEditProfile);
const cardFormValidator = new FormValidator(config, formCardElement);


editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_increase-card');

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const placeElement = new Card(cardItem, '.place-template', (cardImage, placeTitle) => popupImage.open(cardImage, placeTitle));
      const cardElement = placeElement.getNewCardElement();
      cardList.addItem(cardElement);
    },
  },
  '.places__container'
);

cardList.renderItems();



const userInfo = new UserInfo({ selectorName: '.profile__title', selectorJob: '.profile__text' }, editFormValidator);
const popupEdit = new PopupWithForm('.popup_type-edit', userInfo.setUserInfo);
const popupCard = new PopupWithForm('.popup_type_add-card', () => {
  cardList.renderer({
    name: nameCardInput.value,
    link: linkCardInput.value
  })
  nameCardInput.value = '';
  linkCardInput.value = '';
  cardFormValidator.disableButton(popupButton);
  popupCard.close()
}
);


popupProfileOpenButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  editFormValidator.processFormErrors();
});
popupCardOpenButton.addEventListener('click', () => popupCard.open());

