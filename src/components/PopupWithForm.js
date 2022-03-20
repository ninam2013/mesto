import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._buttonSubmit = this._form.querySelector('.popup__button')
    this._buttonSubmitDefaultText = this._buttonSubmit.textContent;
  }


  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }


  setInputValues(inputValues) {
    for (let [name, value] of Object.entries(inputValues)) {
      this._form.querySelector(`input[name="${name}"]`).value = value;
    }
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();

      this._submitForm(this._getInputValues());
    });
  }


  close() {
    this._form.reset()
    super.close();
  }

  renderLoading(isLoading) {
    const loadingText = this._buttonSubmit.dataset.loading || 'Сохранение...';
    this._buttonSubmit.textContent = isLoading ? loadingText : this._buttonSubmitDefaultText;
  }
}
