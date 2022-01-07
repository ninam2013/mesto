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


// модалки
const popupEdit = document.querySelector('.popup_type-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');      // 1

// формы
const formElement = popupEdit.querySelector('.popup__form');
const formCardElement = popupAddCard.querySelector('.popup__form');


//кнопки
const popupOpenButton = document.querySelector('.profile__button');
const popupCloseButton = popupEdit.querySelector('.popup__close');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupCardCloseButtonIncrease = popupIncreaseCard.querySelector('.popup__close');    // 1

// инпуты
const nameInput = document.querySelector('.popup__input_js_name');
const jobInput = document.querySelector('.popup__input_js_job');
const nameCardInput = document.querySelector('.popup__input_js_card-name');
const linkCardInput = document.querySelector('.popup__input_js_card-link');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

const popupCardImage = document.querySelector('.popup__img');    //1
const popupCardTitle = document.querySelector('.popup__title-card');


function toggleModal(modal) {
  modal.classList.toggle('popup_open');
  if (popupEdit.classList.contains('popup_open')) {   // открытие и закрытие модалок
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  popupEdit.classList.remove('popup_open');

}

function formSubmitCardHandler(evt) {
  evt.preventDefault();

  createCard({
    name: nameCardInput.value,
    link: linkCardInput.value
  });

  popupAddCard.classList.remove('popup_open');
}

// открытие и закрытие модалок
popupOpenButton.addEventListener('click', () => toggleModal(popupEdit));
popupCloseButton.addEventListener('click', () => toggleModal(popupEdit));
popupCardOpenButton.addEventListener('click', () => toggleModal(popupAddCard));
popupCardCloseButton.addEventListener('click', () => toggleModal(popupAddCard));
popupCardCloseButtonIncrease.addEventListener('click', () => toggleModal(popupIncreaseCard));     // 1

formElement.addEventListener('submit', formSubmitHandler);
formCardElement.addEventListener('submit', formSubmitCardHandler);

// создание карточек из template
const placesContainer = document.querySelector('.places__container');
const placeTemplate = document.querySelector('.place-template').content;
const placeButtons = document.querySelectorAll('.place__button');


// активация сердечка карточки
function placeButtonActiveState(evt) {
  if (evt.target.classList.contains('place__button')) {
    evt.target.classList.toggle('place__button_active');
  }
}

function toggleModalCard(e) {
  popupIncreaseCard.classList.toggle('popup_open');
  if (popupIncreaseCard.classList.contains('popup_open')) {
    popupCardImage.src = e.path[0].src
    popupCardTitle.textContent = e.path[1].innerText
  }

}

// работа с карточками
function createCard(placeData) {
  const placeElement = placeTemplate.cloneNode(true);
  const cardImage = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  const placeBasket = placeElement.querySelector('.place__basket');
  // const searchCard = placeBasket.closest('.place');
  const place = placeElement.querySelector('.place');

  cardImage.src = placeData.link;
  placeTitle.textContent = placeData.name;
  placeElement.querySelector('.place__button').addEventListener('click', placeButtonActiveState);
  placeBasket.addEventListener('click', () => place.remove());

  // placeElement.addEventListener('click', () => toggleModal(popupIncreaseCard));      // 1
  cardImage.addEventListener('click', toggleModalCard);

  placesContainer.prepend(placeElement);

}

initialCards.reverse().forEach(createCard);

