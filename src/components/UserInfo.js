// управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ selectorName, selectorJob, selectorAvatar }) {
    this._profileName = document.querySelector(selectorName);
    this._profileJob = document.querySelector(selectorJob);
    this._profileAvatar = document.querySelector(selectorAvatar)
  }


  // возврат объекта с данными профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }


  getUserId() {
    return this._id;
  }


  // смена надписи согласно введенным данным в форме
  setUserInfo = ({ name = false, job = false, id = false, avatar = false }) => {
    if (name)   this._profileName.textContent = name;
    if (job)    this._profileJob.textContent = job;
    if (id)     this._id = id;
    if (avatar) this._profileAvatar.src = avatar
  }
}
