// управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ selectorName, selectorJob, api }) {
    this._profileName = document.querySelector(selectorName);
    this._profileJob = document.querySelector(selectorJob);
    this._api = api
  }


  // возврат объекта с данными профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }


  // смена надписи согласно введенным данным в форме
  setUserInfo = ({name, job}) => {
    this._api.editProfile({name:name, about:job});
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
