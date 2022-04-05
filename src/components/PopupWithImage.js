import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElementLink = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__caption");
  }

  open(data) {
    this._imageElementLink.src = data.link;
    this._title.alt = `фото ${data.name}`;
    this._title.textContent = data.name;
    super.open();
  }
}
