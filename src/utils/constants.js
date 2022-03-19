export const config = {
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
const popupAddAvatar = document.querySelector('.popup_type_avatar');

// формы
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const formCardElement = popupAddCard.querySelector('.popup__form');
export const formAvatarElement = popupAddAvatar.querySelector('.popup__form');

//кнопки
export const popupButton = document.querySelector('.popup__button_js_card-submit');
export const popupProfileOpenButton = document.querySelector('.profile__button');
export const popupCardOpenButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile__button-avatar');

// инпуты
export const nameCardInput = document.querySelector('.popup__input_js_card-name');
export const linkCardInput = document.querySelector('.popup__input_js_card-link');
