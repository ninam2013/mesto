
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
  const keyEsc = 27;
  if (key == keyEsc) {
    closeModal(modal)
  };
}



// закрытие модалки кликом на оверлей
function closeModalOverlay(modal) {
  modal.classList.remove('popup_open');
}



// создание popup карты
function openImagePopup(cardImage, placeTitle) {
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

  disableButton(popuButton, config);

  closeModal(popupAddCard);
}



// активация сердечка карточки
function toggleLike(evt) {
  evt.target.classList.toggle('place__button_active');
}



// активация сердечка карточки
function removeCard(cardElement) {
  cardElement.remove('place');
}



// создание новой карточки, вызов открытия модалки карточки, нажатия like и удаление карточки
function getNewCardElement(item) {
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardElement.querySelector('.place__image');
  const placeTitle = cardElement.querySelector('.place__title');

  cardImage.src = item.link;
  cardImage.alt = 'карточка ' + item.name;
  placeTitle.textContent = item.name;


  cardImage.addEventListener('click', () => openImagePopup(cardImage, placeTitle));

  cardElement
    .querySelector('.place__button')
    .addEventListener('click', toggleLike);

  cardElement
    .querySelector('.place__basket')
    .addEventListener(
      'click',
      () => removeCard(cardElement)
    );

  return cardElement
}



// добавление новой карточки
function createCard(placeData) {
  const placeElement = getNewCardElement(placeData)
  placesContainer.prepend(placeElement);
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

// создание карточек из template
const placesContainer = document.querySelector('.places__container');
const placeTemplate = document.querySelector('.place-template').content;


initialCards.reverse().forEach(createCard);


nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

enableValidation(config);
