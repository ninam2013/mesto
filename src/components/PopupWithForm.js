import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'))

  }


  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }


  setInputValues(inputValues) {
    const form = this._form;
    for (let [name, value] of Object.entries(inputValues)) {
      form.querySelector(`input[name="${name}"]`).value = value;
    }
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }


  close() {
    this._form.reset()
    super.close();
  }
}
