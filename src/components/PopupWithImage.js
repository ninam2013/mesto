import { Popup } from "./Popup.js";

// открытие popup карточки
export class PopupWithImage extends Popup {
  constructor(popupselector){
    super (popupselector)
    this._cardImage = this._popupElement.querySelector('.popup__img');
    this._placeTitle = this._popupElement.querySelector('.popup__title-card');
  }

  open(cardImage, placeTitle){
    super.open();

    this._cardImage.src = cardImage.src;
    this._cardImage.alt = cardImage.alt;
    this._placeTitle.textContent = placeTitle.textContent;
  }
}
