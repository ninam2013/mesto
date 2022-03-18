import '../../src/pages/index.css';
import { config, formEditProfile, formCardElement, popupProfileOpenButton, popupCardOpenButton } from '../utils/constants.js';
import { api } from '../components/Api.js';
import { Card } from '../components/Сard.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';

api.getProfile()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, job: res.about, id: res._id })
  });

api.getInitialCard()
  .then((card) => {
    card.forEach(element => {
      cardList.renderer(element);
    });
  });



const editFormValidator = new FormValidator(config, formEditProfile);
const cardFormValidator = new FormValidator(config, formCardElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();


const popupImage = new PopupWithImage('.popup_type_increase-card');


const userInfo = new UserInfo({ selectorName: '.profile__title', selectorJob: '.profile__text', api });


const cardList = new Section(
  {
    items: [],
    renderer: (cardItem) => {
      const placeElement = new Card(cardItem,
        '.place-template',
        (cardImage, placeTitle) => popupImage.open(cardImage, placeTitle),
        (id) => {
          confirmPopup.open();
          confirmPopup.changeSubmitHandler(() => {
            api.deleteCard(id)
              .then(res => {
                popupCard.close();
                placeElement.deleteCard();
              })
          })
        },
        {
          userId: userInfo.getUserId()
        },
        (id) => {
          if (placeElement.isLiked()) {
            api.deleteLike(id)
              .then(res =>
                placeElement.setLikes(res.likes))
          } else {
            api.addLike(id)
              .then(res =>
                placeElement.setLikes(res.likes))
          }
        }
      );
      const cardElement = placeElement.getNewCardElement();
      cardList.addItem(cardElement);
    },
  },
  '.places__container'
);


const popupEdit = new PopupWithForm('.popup_type-edit', userInfo.setUserInfo);

const popupCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {

  api.addCard(inputValues.name, inputValues.link)
    .then((res) => {
      cardList.renderer(res);
    });
  popupCard.close();
  cardFormValidator.toggleButton();
}
);

const confirmPopup = new PopupWithForm('.popup_type_delete-confirm');


popupEdit.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
confirmPopup.setEventListeners();


popupProfileOpenButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  editFormValidator.processFormErrors();
});
popupCardOpenButton.addEventListener('click', () => popupCard.open());


