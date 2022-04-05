import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor({ selector, handleCardDelete }) {
    super(selector);
    this._elementFormDelete = this._popup.querySelector(".form_type_delete");
    this._handleCardDelete = handleCardDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._elementFormDelete.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCardDelete(this._element);
    });
  }

  open(element) {
    this._element = element;
    super.open();
  }

  // close() {
  //   super.close();
  // }
}
