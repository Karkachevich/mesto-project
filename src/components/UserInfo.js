export default class UserInfo {
  constructor({ _id }, nameSelector, aboutSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._user = {
      _id: _id,
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }
  getUserInfor() {
    return this._user;
  }

  setUserInfo({ _id, name, about }) {
    if (_id) {
      this._user._id = _id;
    }
    if (name) {
      this._user.name = name;
      this._nameElement.textContent = name;
    }
    if (about) {
      this._user.about = about;
      this._aboutElement.textContent = about;
    }
  }
}
