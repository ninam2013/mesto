import { PopupWithImage } from './PopupWithImage.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }



  _getTemplate() {
    const placeTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = placeTemplate.querySelector('.place').cloneNode(true);

    return cardElement
  }



  getNewCardElement() {
    const element = this._getTemplate();
    const cardImage = element.querySelector('.place__image');
    const placeTitle = element.querySelector('.place__title');

    cardImage.src = this._link;
    cardImage.alt = 'карточка ' + this._name;
    placeTitle.textContent = this._name;

    this._setEventListeners(cardImage, placeTitle, element)

    return element;
  }



  _setEventListeners(cardImage, placeTitle, element) {
    this._setOpenImagePopup(cardImage, placeTitle);
    this._setLikeHandler(element);
    this._setRemoveCardHandler(element);
  }



  _setOpenImagePopup(cardImage, placeTitle) {
    cardImage.addEventListener('click', () => {
      const popupImage = new PopupWithImage('.popup_type_increase-card');
      popupImage.open(cardImage, placeTitle)
    });
  }

  _setRemoveCardHandler(element) {
    element
      .querySelector('.place__basket')
      .addEventListener(
        'click',
        () => this._removeCard(element)
      );
  }



  _setLikeHandler(element) {
    element
      .querySelector('.place__button')
      .addEventListener('click', this._toggleLike);
  }



  _toggleLike(evt) {
    evt.target.classList.toggle('place__button_active');
  }



  _removeCard(cardElement) {
    cardElement.remove('place');
  }

}


