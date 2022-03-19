class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }


  //подгрузка информации пользователя с сервера
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}  в данных профиля`))
      .catch((err) => {
        console.log(err);
      });
  }


  //подгрузка карточек с сервера
  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при загрузке карточек с сервера`))
      .catch((err) => {
        console.log(err);
      });
  }


  //отредактированные данные профиля сохраняться на сервере
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при смене информации профиля`))
      .catch((err) => {
        console.log(err);
      });
  }


  //добавление новой карточки на сервер
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при создании карточки`))
      .catch((err) => {
        console.log(err);
      });
  }


  //удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при удаление карточки`))
      .catch((err) => {
        console.log(err);
      });
  }

  //добавление лайков
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при добавлении лайка`))
      .catch((err) => {
        console.log(err);
      });
  }


  //удаление лайков
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при удалении лайка`))
      .catch((err) => {
        console.log(err);
      });
  }

  //замена фото
  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} при замене фото аватара`))
      .catch((err) => {
        console.log(err);
      });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: 'b5637daf-69d0-4d18-bf49-ea24b3d65735',
    'Content-Type': 'application/json'
  }
});
