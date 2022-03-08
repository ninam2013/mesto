//настройка валидации полей форм
export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector)
  }


  // действие по умолчанию не должно выполняться
  _submitForm(event) {
    event.preventDefault();
  }


  // обработка ошибок формы
  processFormErrors() {
    this._inputList.forEach(input => this._validateInput(input))
  }


  // Открытие и закрытие кнопки ввода формы
  toggleButton() {
    if (this._isFormValid(this._form)) {
      this._enableButton(this._submitButton)
    } else {
      this.disableButton(this._submitButton)
    }

  }


  // Проверка корректности поля
  _isFormValid() {
    return this._form.checkValidity();

  }


  // включение кнопки формы
  _enableButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }


  // выключение кнопки формы
  disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }


  // добавление ошибки
  _showError(inputElement, errorElement, errorText) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorText;
  }


  // удаление ошибки
  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }


  // проверка валидации поля
  _validateInput(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    const isValid = inputElement.validity.valid;

    const errorText = inputElement.validationMessage;

    if (isValid) {
      this._hideError(inputElement, errorElement);
    } else {
      this._showError(inputElement, errorElement, errorText);
    }
    this.toggleButton(this._form);

  }


  // перебираем поля и вызываем функцию валидации полей
  _setEventListeners() {
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this.toggleButton();
    this._inputs.forEach(inputElement => {

      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
      });
    });
  }


  // перебераем форму и вызываем функции валидации
  enableValidation() {
    this._form.addEventListener('submit', this._submitForm);
    this._setEventListeners();
  }
}
