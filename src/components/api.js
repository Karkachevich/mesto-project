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

  deleteMyCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
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


/////////
const config = {
  url: "https://nomoreparties.co/v1/plus-cohort7",
  hearders: {
    authorization: "606c19ec-1c82-4e12-b9a2-b32d3b016e4d",
    "Content-Type": "application/json"
  }
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

const getCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.hearders
  }).then(checkResponse);
};

const getProfile = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.hearders,
  }).then((res) => checkResponse(res));
};

const editProfile = (profile) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.hearders,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  }).then(checkResponse);
};

const editAvatar = (link) => {
   return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.hearders,
    body: JSON.stringify({
      avatar: link.value
    }),
  }).then(checkResponse);
};

const settingLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.hearders
  }).then(checkResponse);
};

const removeLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.hearders
  }).then(checkResponse);
};

const deleteCard = (element) => {
  return fetch(`${config.url}/cards/${element.id}`, {
    method: "DELETE",
    headers: config.hearders
  }).then(checkResponse);
};

const createNewCardSubmit = (card) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.hearders,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    }),
  }).then(checkResponse);
};

export {
  getCards,
  getProfile,
  editProfile,
  createNewCardSubmit,
  settingLike,
  removeLike,
  deleteCard,
  editAvatar,
};
