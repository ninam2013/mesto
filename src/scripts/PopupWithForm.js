import { Popup } from './Popup.js';

//
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.submitForm = submitForm;
  }

  get _form() { return this.popupElement.querySelector('form') }

  get _inputsList() { return this._form.querySelectorAll('input[type="text"]') }


  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }


  setInputValues (inputValues) {
    const form = this._form;
    for (let [name, value] of Object.entries(inputValues)) {
      form.querySelector(`input[name="${name}"]`).value = value;
    }
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
      this.close();
    });
  }


  close() {
    super.close();
    this._inputsList.forEach(input => input.value = '');
  }
}
