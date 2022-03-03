import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupselector){
    super (popupselector)
  }
  open(cardImage, placeTitle){
    super.open()
    const popupCardImage = document.querySelector('.popup__img');
    const popupCardTitle = document.querySelector('.popup__title-card');
    popupCardImage.src = cardImage.src;
    popupCardImage.alt = cardImage.alt;
    popupCardTitle.textContent = placeTitle.textContent;
  }
}

