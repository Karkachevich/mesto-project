export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClosePopup = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);

    const elementActive = document.querySelector(".element_active");
    if (elementActive) {
      elementActive.classList.remove("element_active");
    }
  }

  _setEventListeners() {
    this._buttonClosePopup.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) =>
      this._handleOverlayClose(evt)
    );
  }
}
