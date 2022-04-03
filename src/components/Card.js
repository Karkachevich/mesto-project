export default class Card {
  constructor({
    data,
    selector,
    handleCardClick,
    handleCardLike,
    handleCardDelete,
    userInf,
  }) {
    this._data = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._user = userInf;
  }

  isMyLike() {
    return this._data.likes.some((item) => item._id === this._user._id);
  }

  isMyCard() {
    return this._data.owner._id === this._user._id;
  }

  _setCountLikes() {
    this._likeCoutn.textContent = this._data.likes.length;
  }

  updateLike(data) {
    this._data = data;
    this._setCountLikes();
    if (this.isMyLike()) {
      this._likeButton.classList.add("element__like_active");
    } else {
      this._likeButton.classList.remove("element__like_active");
    }
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setDeleteCard() {
    this._trash = this._element.querySelector(".element__trash");
    this._trash.classList.add("element__trash_active");
    this._trash.addEventListener("click", () => {
      this._handleCardDelete()
    });
  }



  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });

    this._likeButton.addEventListener("click", () => {

      this._handleCardLike();
    });
  }

  generate() {
    this._element = this._getElement();
    this._element.id = this._data._id;
    this._element.querySelector(".element__image").src = this._data.link;
    this._element.querySelector(
      ".element__image"
    ).alt = `фото ${this._data.name}`;
    this._element.querySelector(".element__title").textContent =
      this._data.name;
    this._likeCoutn = this._element.querySelector(".element__like-count");
    this._likeButton = this._element.querySelector(".element__like");

    if (this.isMyCard()) {
      this._setDeleteCard();
    }

    this.updateLike(this._data);
    this._setEventListeners();
    return this._element;
  }
}



//////////////////////////////////////////////////////////////////
import { openPopup } from "./modal.js";
import { removeLike, settingLike } from "./ApiClass.js";

const popupImage = document.querySelector(".popup_type_picture");
const image = document.querySelector(".popup__image");
const captionImage = document.querySelector(".popup__caption");

const elementTemplate = document.querySelector("#element").content;

const popupDelete = document.querySelector(".popup_type_delete");

//функция создания карточки

function createCard(card, isMyLike, isMyCard) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  const like = element.querySelector(".element__like");
  const trash = element.querySelector(".element__trash");
  const title = element.querySelector(".element__title");
  const likeCoutn = element.querySelector(".element__like-count");
  likeCoutn.textContent = card.likes.length;
  imageElement.src = card.link;
  imageElement.alt = `фото ${card.name}`;
  title.textContent = card.name;
  element.id = card._id;
  if (isMyLike) {
    like.classList.add("element__like_active");
  }

  if (isMyCard) {
    trash.classList.add("element__trash_active");
    trash.addEventListener("click", function () {
      element.classList.add("element_active");
      openPopup(popupDelete);
    });
  }

  like.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      settingLike(element.id)
        .then((res) => {
          like.classList.add("element__like_active");
          likeCoutn.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log("Ошибка загрузки лайка", err.message);
        });
    } else {
      removeLike(element.id)
        .then((res) => {
          like.classList.remove("element__like_active");
          likeCoutn.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log("Ошибка загрузки дизлайка", err.message);
        });
    }
  });

  imageElement.addEventListener("click", function (evt) {
    image.src = evt.target.src;
    captionImage.textContent = title.textContent;
    image.alt = `фото ${captionImage.textContent}`;

    openPopup(popupImage);
  });
  return element;
}

export { createCard };
