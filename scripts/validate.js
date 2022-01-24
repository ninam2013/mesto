function submitForm(event) {
  event.preventDefault();
}



// добавление ошибки
function showError(inputElement, errorElement, errorText, classes) {
  inputElement.classList.add(classes.inputErrorClass);
  errorElement.classList.add(classes.errorClass);
  errorElement.textContent = errorText;
}



// удаление ошибки
function hideError(inputElement, errorElement, classes) {
  inputElement.classList.remove(classes.inputErrorClass);
  errorElement.classList.remove(classes.errorClass);
  errorElement.textContent = '';
}



// Проверка корректности поля
function toggleButton(formElement, classes) {
  const button = formElement.querySelector(classes.submitButtonSelector);
  const isFormValid = formElement.checkValidity();

  if (isFormValid) {
    enableButton(button, classes)
  } else {
    disableButton(button, classes)
  }
}



// включение кнопки формы
function enableButton(button, classes) {
  button.classList.remove(classes.inactiveButtonClass);
  button.disabled = false;
}



// выключение кнопки формы
function disableButton(button, classes) {
  button.classList.add(classes.inactiveButtonClass);
  button.disabled = true;
}



// проверка валидации поля
function validateInput(formElement, inputElement, classes) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  const isValid = inputElement.validity.valid;

  const errorText = inputElement.validationMessage;


  if (isValid) {
    hideError(inputElement, errorElement, classes);
  } else {
    showError(inputElement, errorElement, errorText, classes);
  }
  toggleButton(formElement, classes);
}



// перебераем формы и поля, и вызываем функции валидации
function enableValidation({ formSelector, inputSelector, ...classes }) {

  popupCardImage.closest('.popup__container-card').addEventListener('click', (e) => e.stopPropagation());

  const forms = document.querySelectorAll(formSelector);

  forms.forEach(formElement => {
    formElement.addEventListener('submit', submitForm);

    const inputs = formElement.querySelectorAll(inputSelector);

    formElement.closest('.popup__container').addEventListener('click', (e) => e.stopPropagation());

    inputs.forEach(inputElement => {

      inputElement.addEventListener('input', () => {

        validateInput(formElement, inputElement, classes);
      });
    });
    toggleButton(formElement, classes);
  });
}
