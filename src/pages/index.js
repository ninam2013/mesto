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


Promise.all([api.getProfile(), api.getInitialCard()])
  .then(([res, card]) => {
    userInfo.setUserInfo({ name: res.name, job: res.about, id: res._id, avatar: res.avatar });
    cardList.renderItems(card)
  })
  .catch((err) => {
    console.log(`${err} при загрузке данных с сервера`);
  });


const editFormValidator = new FormValidator(config, formEditProfile);
const cardFormValidator = new FormValidator(config, formCardElement);
const avatarFormValidator = new FormValidator(config, formAvatarElement);


editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


const popupImage = new PopupWithImage('.popup_type_increase-card');


const userInfo = new UserInfo({ selectorName: '.profile__title', selectorJob: '.profile__text', api, selectorAvatar: '.profile__image' });


const createCard = (cardItem) => {                // в проектной 8 спринта чётко написано было, что в index.js не должно остаться функций. Что я и сделал, а теперь вернул обратно. Мартышкин труд, однако.
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
          .catch((err) => {
            console.log(`${err} при удаление карточки`);
          });
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
          .catch((err) => {
            console.log(`${err} при удалении лайка`);
          });
      } else {
        api.addLike(id)
          .then(res =>
            placeElement.setLikes(res.likes))
          .catch((err) => {
            console.log(`${err} при добавлении лайка`);
          });
      }
    }
  );
  const cardElement = placeElement.getNewCardElement();
  return cardElement
}


const cardList = new Section(
  {
    items: [],
    renderer: (cardItem) => {
      cardList.insertElementAppend(createCard(cardItem));
    }
  },
  '.places__container'
);


const popupEdit = new PopupWithForm('.popup_type-edit', ({ name, job }) => {
  popupEdit.renderLoading(true);

  api.editProfile({ name: name, about: job })
    .then((res) => {

      userInfo.setUserInfo({ name: res.name, about: res.job });
    })
    .catch((err) => {
      console.log(`${err} при смене данных профиля`);
    })
  popupEdit.renderLoading(false);
  popupEdit.close()
});


const popupCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  popupCard.renderLoading(true);
  api.addCard(inputValues.name, inputValues.link)
    .then((res) => {
      cardList.insertElementPrepend(createCard(res))
      cardFormValidator.toggleButton();
      if (res) {
        popupCard.close();
      }
    })
    .catch((err) => {
      console.log(`${err} при создании карточки`);
    })
    .finally(() => {
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
        if (res) {
          avatarPopup.close();
        }
      })
      .catch((err) => {
        console.log(`${err} при замене фото аватара`);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
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
  popupEdit.setInputValues(userInfo.getUserInfo());
  editFormValidator.processFormErrors();
  popupEdit.open();
});
popupCardOpenButton.addEventListener('click', () => popupCard.open());
editButton.addEventListener('click', editButtonAvatarClickHandler);

function editButtonAvatarClickHandler() {
  avatarPopup.open();
  avatarFormValidator.toggleButton();
}
