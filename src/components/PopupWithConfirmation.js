import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
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
