function submitForm(event) {
  event.preventDefault();
}



// добавление ошибки
function showError(inputElement, errorElement, errorText, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorText;
}



// удаление ошибки
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}



// Проверка корректности поля
function isFormValid(formElement) {
  return formElement.checkValidity();
}



// Открытие и закрытие кнопки ввода формы
function toggleButton(formElement, config) {
  const button = formElement.querySelector(config.submitButtonSelector);

  if (isFormValid(formElement)) {
    enableButton(button, config)
  } else {
    disableButton(button, config)
  }
}



// включение кнопки формы
function enableButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}



// выключение кнопки формы
function disableButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}



// проверка валидации поля
function validateInput(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  const isValid = inputElement.validity.valid;

  const errorText = inputElement.validationMessage;


  if (isValid) {
    hideError(inputElement, errorElement, config);
  } else {
    showError(inputElement, errorElement, errorText, config);
  }
  toggleButton(formElement, config);
}



// перебираем поля и вызываем функцию валидации полей
function setEventListeners(formElement, inputSelector, config) {

  const inputs = formElement.querySelectorAll(inputSelector);

  inputs.forEach(inputElement => {

    inputElement.addEventListener('input', () => {

      validateInput(formElement, inputElement, config);
    });
  });
  toggleButton(formElement, config);
}



// перебераем формы и вызываем функции валидации
function enableValidation({ formSelector, inputSelector, ...config }) {

  const forms = document.querySelectorAll(formSelector);

  forms.forEach(formElement => {
    formElement.addEventListener('submit', submitForm);

    setEventListeners(formElement, inputSelector, config);
  });
}
