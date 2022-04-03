export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  getInitialProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  editProfileUser(profile) {
    if (profile.name) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: profile.name,
          about: profile.about
        }),
      }).then(this._checkResponse);
    }
  }

  editAvatarUser(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      }),
    }).then(this._checkResponse);
  }

  createCardSubmit(card) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }),
    }).then(this._checkResponse);
  }

  deleteMyCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._checkResponse);
  }

  settingMyLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    }).then(this._checkResponse);
  }

  removeMylike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._checkResponse);
  }
}

