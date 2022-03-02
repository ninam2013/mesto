import { Popup } from "./Popup.js";
import {popupIncreaseCard} from "./index.js"

export class PopupWithImage extends Popup {
  constructor(popupselector){
    super (popupselector)
  }
  open(cardImage, placeTitle){
    const popupCardImage = document.querySelector('.popup__img');
    const popupCardTitle = document.querySelector('.popup__title-card');
    popupCardImage.src = cardImage.src;
    popupCardImage.alt = cardImage.alt;
    popupCardTitle.textContent = placeTitle.textContent;

    popupIncreaseCard.open()
  }

}

