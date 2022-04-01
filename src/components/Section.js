export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  rendererItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }
}
