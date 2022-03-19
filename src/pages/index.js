import '../../src/pages/index.css';
import {
  config,
  formEditProfile,
  formCardElement,
  formAvatarElement,
  popupProfileOpenButton,
  popupCardOpenButton,
  editButton
} from '../utils/constants.js';
import { api } from '../components/Api.js';
import { Card } from '../components/Сard.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';


api.getProfile()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, job: res.about, id: res._id, avatar: res.avatar })
  });


api.getInitialCard()
  .then((card) => {
    card.forEach(element => {
      cardList.renderer(element);
    });
  });


const editFormValidator = new FormValidator(config, formEditProfile);
const cardFormValidator = new FormValidator(config, formCardElement);
const avatarFormValidator = new FormValidator(config, formAvatarElement);


editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


const popupImage = new PopupWithImage('.popup_type_increase-card');


const userInfo = new UserInfo({ selectorName: '.profile__title', selectorJob: '.profile__text', api, selectorAvatar: '.profile__image' });


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
    }
  },
  '.places__container'
);


const popupEdit = new PopupWithForm('.popup_type-edit', (name, job) => {
  popupEdit.renderLoading(true);
  userInfo.setUserInfo(name, job);
  popupEdit.renderLoading(false);
});


const popupCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  popupCard.renderLoading(true);
  api.addCard(inputValues.name, inputValues.link)
    .then((res) => {
      cardList.renderer(res);
    })
    .finally(() => {
      popupCard.close();
      cardFormValidator.toggleButton();
      avatarPopup.renderLoading(false);
    })
}
);


const avatarPopup = new PopupWithForm(
  '.popup_type_avatar',
  (data) => {
    avatarPopup.renderLoading(true);
    api.editAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({ avatar: data.link });
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
        avatarPopup.close();
      });
  }
);


const confirmPopup = new PopupWithConfirmation('.popup_type_delete-confirm');


popupEdit.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();


popupProfileOpenButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  editFormValidator.processFormErrors();
});
popupCardOpenButton.addEventListener('click', () => popupCard.open());
editButton.addEventListener('click', editButtonAvatarClickHandler);

function editButtonAvatarClickHandler() {
  avatarPopup.open();
  avatarFormValidator.toggleButton();
}
