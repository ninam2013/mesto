import { Popup } from "./Popup.js";

// открытие popup карточки
export class PopupWithImage extends Popup {
  constructor(popupselector){
    super (popupselector)
    this._cardImage = document.querySelector('.popup__img');
    this._placeTitle = document.querySelector('.popup__title-card');
  }

  open(cardImage, placeTitle){
    super.open();

    this._cardImage.src = cardImage.src;
    this._cardImage.alt = cardImage.alt;
    this._placeTitle.textContent = placeTitle.textContent;
  }
}
