import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._elementForm = this._popup.querySelector(".form");
    this._inputList = this._elementForm.querySelectorAll(".form__input");
    this._buttonForm = this._elementForm.querySelector(".form__button");
    this._buttonFormText = this._buttonForm.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super._setEventListeners();
    this._elementForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._elementForm.reset();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonForm.textContent = "Сохранение...";
    } else {
      this._buttonForm.textContent = this._buttonFormText;
    }
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._elementForm.reset();
  }
}
