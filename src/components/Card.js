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
    this._element = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._likeCount = null;
    this._likeButton = null;
    this._trash = null;
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
    this._elementImage.addEventListener("click", () => {
        this._handleCardClick();
      });

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    if (this.isMyCard()) {
      this._setDeleteCard();
    }
  }

  generate() {
    this._element = this._getElement();
    this._element.id = this._data._id;
    this._elementImage = this._element.querySelector(".element__image");
    this._elementImage.src = this._data.link;
    this._elementImage.alt = `фото ${this._data.name}`;
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementTitle.textContent = this._data.name;
    this._likeCount = this._element.querySelector(".element__like-count");
    this._likeButton = this._element.querySelector(".element__like");


    this.updateLike(this._data);
    this._setEventListeners();
    return this._element;
  }
}
