// управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ selectorName, selectorJob }, validator) {
    this._profileName = document.querySelector(selectorName);
    this._profileJob = document.querySelector(selectorJob);
    this._validator = validator
  }


  // вывод последней записи в поля формы
  getUserInfo() {
    const nameInput = document.querySelector('.popup__input_js_name');
    const jobInput = document.querySelector('.popup__input_js_job');
    nameInput.value = this._profileName.textContent;
    jobInput.value = this._profileJob.textContent;
    this._validator.toggleButton()
  }


  // смена надписи согласно введенным данным в форме
  setUserInfo = (inputValues) => {
    this._profileName.textContent = inputValues.name;
    this._profileJob.textContent = inputValues.job;

  }

}
