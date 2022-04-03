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
    this._likeCount.textContent = this._data.likes.length;
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
    this._likeCount = this._element.querySelector(".element__like-count");
    this._likeButton = this._element.querySelector(".element__like");

    if (this.isMyCard()) {
      this._setDeleteCard();
    }

    this.updateLike(this._data);
    this._setEventListeners();
    return this._element;
  }
}
