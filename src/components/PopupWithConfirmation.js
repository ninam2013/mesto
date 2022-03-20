import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  changeSubmitHandler(newSubmitForm) {
    this._submitForm = newSubmitForm;
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm();
      this.close();
    });
  }
}
