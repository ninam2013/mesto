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
const popupEditProfile = document.querySelector('.popup_type-edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupIncreaseCard = document.querySelector('.popup_type_increase-card');

// формы
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formCardElement = popupAddCard.querySelector('.popup__form');


//кнопки
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


// подсказка последнего введенного значения
function popupChangeProfile() {
  if (popupEditProfile.classList.contains('popup_open')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}


function popupCardOpen(evt) {
  const cardElement = evt.target.closest('.place');
  const cardTitle = cardElement.querySelector('.place__title').textContent;

  popupCardImage.src = evt.target.src;
  popupCardImage.alt = 'увеличенное фото ' + cardTitle;
  popupCardTitle.textContent = cardTitle;

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

  nameCardInput.value = ' ';
  linkCardInput.value = ' ';

  toggleModal(popupAddCard);
}


// открытие и закрытие модалок
popupProfileOpenButton.addEventListener('click', () => toggleModal(popupEditProfile));
popupProfileOpenButton.addEventListener('click', () => popupChangeProfile());
popupProfileCloseButton.addEventListener('click', () => toggleModal(popupEditProfile));
popupCardOpenButton.addEventListener('click', () => toggleModal(popupAddCard));
popupCardCloseButton.addEventListener('click', () => toggleModal(popupAddCard));
popupCardCloseButtonIncrease.addEventListener('click', () => toggleModal(popupIncreaseCard));

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);

// создание карточек из template
const placesContainer = document.querySelector('.places__container');
const placeTemplate = document.querySelector('.place-template').content;


// активация сердечка карточки
function placeButtonActiveState(evt) {
  evt.target.classList.toggle('place__button_active');
}


function getNewCardElement(item) {
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardElement.querySelector('.place__image');
  const placeTitle = cardElement.querySelector('.place__title');

  cardImage.src = item.link;
  placeTitle.textContent = item.name;

  cardImage.addEventListener('click', popupCardOpen);

  cardElement
    .querySelector('.place__button')
    .addEventListener('click', placeButtonActiveState);

  cardElement
    .querySelector('.place__basket')
    .addEventListener(
      'click',
      () => cardElement.remove()
    );

  return cardElement
}


function createCard(placeData) {
  const placeElement = getNewCardElement(placeData)
  placesContainer.prepend(placeElement);
}

initialCards.reverse().forEach(createCard);
