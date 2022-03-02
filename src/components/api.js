
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
