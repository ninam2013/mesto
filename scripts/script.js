const popupOpenButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function togglePopup() {
  popup.classList.toggle('popup_open');
}

popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__name-input');
let jobInput = document.querySelector('.popup__job-input');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  nameInput.value = '';
  jobInput.value = '';
  let profileName = document.querySelector('.profile__title');
  let profileJob = document.querySelector('.profile__text');

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}
formElement.addEventListener('submit', formSubmitHandler);
