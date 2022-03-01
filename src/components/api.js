import { closePopup } from "./modal.js";

const config = {
  url: "https://nomoreparties.co/v1/plus-cohort7",
  hearders: {
    authorization: "606c19ec-1c82-4e12-b9a2-b32d3b016e4d",
    "Content-Type": "application/json"
  }
};

const parserResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

const renderLoading = (isLoading) => {
  const button = document.querySelector(".form__button_active");
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
    button.textContent = "Сохранить";
  }
}

const getCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.hearders
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const getProfile = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.hearders,
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const editProfile = (profile) => {
  renderLoading(true);
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.hearders,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

const editAvatar = (link) => {
  renderLoading(true);
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.hearders,
    body: JSON.stringify({
      avatar: link.value
    }),
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

const settingLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.hearders
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const removeLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.hearders
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const deleteCard = (element) => {
  return fetch(`${config.url}/cards/${element.id}`, {
    method: "DELETE",
    headers: config.hearders
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      const openPopup = document.querySelector(".popup_opened");
      closePopup(openPopup);
    });
};

const createNewCardSubmit = (card) => {
  renderLoading(true);
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.hearders,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    }),
  })
    .then((res) => parserResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      renderLoading(false);
    });
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
