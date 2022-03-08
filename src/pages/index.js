import '../../src/pages/index.css';
import { initialCards, config, formEditProfile, formCardElement, popupProfileOpenButton, popupCardOpenButton } from '../utils/constants.js'
import { Card } from '../components/Сard.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';


const editFormValidator = new FormValidator(config, formEditProfile);
const cardFormValidator = new FormValidator(config, formCardElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();



const popupImage = new PopupWithImage('.popup_type_increase-card');
popupImage.setEventListeners();



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



const userInfo = new UserInfo({ selectorName: '.profile__title', selectorJob: '.profile__text' });



const popupEdit = new PopupWithForm('.popup_type-edit', userInfo.setUserInfo);
popupEdit.setEventListeners();

const popupCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  cardList.renderer(inputValues);
  popupCard.close();
  cardFormValidator.toggleButton();
}
);
popupCard.setEventListeners();



popupProfileOpenButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  editFormValidator.processFormErrors();
});
popupCardOpenButton.addEventListener('click', () => popupCard.open());

