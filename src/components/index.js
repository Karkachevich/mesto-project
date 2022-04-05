import "../index.css";

import { validationConfig, configApi } from "./utils/constants.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithDelete from "./PopupWithDelete.js";
import Api from "./Api.js";

const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const avatarButton = document.querySelector(".profile__avatar-cover");
const formProfile = document.querySelector(".form_type_profile");
const nameProfileInput = formProfile.querySelector(".form__input_type_name");
const aboutProfileInput = formProfile.querySelector(".form__input_type_hobby");
const formCard = document.querySelector(".form_type_card");
//const avatar = document.querySelector(".profile__avatar-pucture");
const formAvatar = document.querySelector(".form_type_avatar");

const user = new UserInfo({ }, ".profile__name", ".profile__hobby", ".profile__avatar-pucture");
const userInfo = user.getUserInfo();

const api = new Api(configApi);

const popupImage = new PopupWithImage(".popup_type_picture");

const popupDelete = new PopupWithDelete({
  selector: ".popup_type_delete",
  handleCardDelete: ({ element, cardId }) => {
    api
      .deleteMyCard(cardId)
      .then(() => {
        element.remove();
        popupDelete.close();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err.message);
      });
  },
});

popupDelete.setEventListeners();

const getCard = (data) => {
  const card = new Card({
    data,
    selector: "#element",
    handleCardClick: () => popupImage.open(data),
    handleCardLike: () => {
      if (!card.isMyLike()) {
        api
          .settingMyLike(data._id)
          .then((res) => {
            card.updateLike(res);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        api
          .removeMylike(data._id)
          .then((res) => {
            card.updateLike(res);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    },
    handleCardDelete: () => {popupDelete.open({ element: card._element, cardId: data._id})},
    userInf: userInfo,
  });
  return card.generate();
};


const section = new Section({
  data: [],
  renderer: (item) => {
    const cardElement = getCard(item);
    section.addItemAppend(cardElement);
  },
 }, ".elements");

const popupAvatar = new PopupWithForm({
  selector: ".popup_type_avatar",
  handleFormSubmit: (getInputValues) => {
    popupAvatar.renderLoading(true);
    api
      .editAvatarUser(getInputValues)
      .then((res) => {
        user.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log("Ошибка изменения аватара", err.message);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  },
});
popupAvatar.setEventListeners();

const popupEdit = new PopupWithForm({
  selector: ".popup_type_profile",
  handleFormSubmit: (getInputValues) => {
    popupEdit.renderLoading(true);
    api
      .editProfileUser(getInputValues)
      .then((res) => {
        user.setUserInfo(res);
        popupEdit.close();
      })
      .catch((err) => {
        console.log("Ошибка изменения профиля", err.message);
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      });
  },
});

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  selector: ".popup_type_card-add",
  handleFormSubmit: (getInputValues) => {
    popupAdd.renderLoading(true);
    api
      .createCardSubmit(getInputValues)
      .then((res) => {
        const card = getCard(res);
        section.addItemPrepend(card);
        popupAdd.close();
      })
      .catch((err) => {
        console.log("Ошибка создания карточки", err.message);
      })
      .finally(() => {
        popupAdd.renderLoading(false);
      });
  },
});

popupAdd.setEventListeners();

const formValidatorAdd = new FormValidator(validationConfig, formCard.querySelector(validationConfig.setForm));
const formValidatorAvatar = new FormValidator(validationConfig, formAvatar.querySelector(validationConfig.setForm));
const formValidatorEdit = new FormValidator(validationConfig, formProfile.querySelector(validationConfig.setForm));


addButton.addEventListener("click", function () {
  formValidatorAdd.enableValidation();
  popupAdd.open();
});

avatarButton.addEventListener("click", function () {
  formValidatorAvatar.enableValidation();
  popupAvatar.open();
});

editButton.addEventListener("click", function () {
  (nameProfileInput.value = userInfo.name),
    (aboutProfileInput.value = userInfo.about);
  formValidatorEdit.enableValidation();
  popupEdit.open();
});

Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    section.rendererItems(cards);
  })
  .catch((err) => {
    console.log("Ошибка загрузки данных", err.message);
  });

