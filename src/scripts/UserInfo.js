// управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ selectorName, selectorJob }, validator) {
    this._profileName = document.querySelector(selectorName);
    this._profileJob = document.querySelector(selectorJob);
    this._validator = validator
  }


  // возврат объекта с данными профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }


  // смена надписи согласно введенным данным в форме
  setUserInfo = (inputValues) => {
    this._profileName.textContent = inputValues.name;
    this._profileJob.textContent = inputValues.job;

  }

}
