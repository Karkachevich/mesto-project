export default class UserInfo {
  constructor({ _id }, nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._user = {
      _id: _id,
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }
  getUserInfo() {
    return this._user;
  }

  setUserInfo({ _id, name, about, avatar }) {
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
    if (avatar) {
      this._user.avatar = avatar;
      this._avatarElement.src = avatar;
    }
  }
}
