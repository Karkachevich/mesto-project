import "../index.css";
import { openPopup, closePopup } from "./modal.js";
import { createCard } from "./CardClass.js";
import { renderLoading } from "./utils.js";
import { validationConfig, configApi } from "./constants";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { Popup } from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithDelete } from "./PopupWithDelete.js";
import {
  getCards,
  getProfile,
  editProfile,
  editAvatar,
  deleteCard,
  createNewCardSubmit,
} from "./ApiClass";

const popups = document.querySelectorAll(".popup");

const popupEdit = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card-add");
const popupAvatar = document.querySelector(".popup_type_avatar");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const avatarButton = document.querySelector(".profile__avatar-cover");

const formProfile = document.querySelector(".form_type_profile");
const nameProfileInput = formProfile.querySelector(".form__input_type_name");
const hobbyProfileInput = formProfile.querySelector(".form__input_type_hobby");
const formButtonProfile = formProfile.querySelector(".form__button_type_profile");

const formCard = document.querySelector(".form_type_card");
const nameCardInput = formCard.querySelector(".form__input_type_title");
const linkCardInput = formCard.querySelector(".form__input_type_link");
const formButtonCard = formCard.querySelector(".form__button_type_card");

const avatar = document.querySelector(".profile__avatar-pucture");
const formAvatar = document.querySelector(".form_type_avatar");
const linkAvatarInput = formAvatar.querySelector(".form__input_type_avatar");
const formButtonAvatar = formAvatar.querySelector(".form__button_type_avatar");

const nameProfile = document.querySelector(".profile__name");
const hobbyProfile = document.querySelector(".profile__hobby");

const formDelete = document.querySelector(".form_type_delete");
const elementsList = document.querySelector(".elements");
/////////////////////////////////////////////////////////////////////////////////

const user = new UserInfo({ }, ".profile__name", ".profile__hobby");

const api = new Api(config);

const popupImage = new PopupWithImage(".popup_type_picture");

const popupDelete = new PopupWithDelete({
  selector: ".popup_type_delete",
  handleCardDelete: ({ element, cardId }) => {
    //const elementAct = document.querySelector(".element_active");
    //console.log(cardId)
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
    userInf: user.getUserInfor(),
  });
  return card.generate();
};

const getSection = (res) => {
  const section = new Section(
    {
      data: res,
      renderer: (item) => {
        const cardElement = getCard(item);
        section.addItemAppend(cardElement);
      },
    },
    ".elements"
  );

  return section;
};

const myCard = new Section({ data: [] }, ".elements");

const popupAvatar = new PopupWithForm({
  selector: ".popup_type_avatar",
  handleFormSubmit: (getInputValues) => {
    popupAvatar.renderLoading(true);
    api
      .editAvatarUser(getInputValues)
      .then((res) => {
        avatar.src = res.avatar;
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
        myCard.addItemPrepend(card);
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

addButton.addEventListener("click", function () {
  const formValidatorAdd = new FormValidator(validationConfig, formCard);
  formValidatorAdd.enableValid();
  popupAdd.open();
});

avatarButton.addEventListener("click", function () {
  const formValidatorAvatar = new FormValidator(validationConfig, formAvatar);
  formValidatorAvatar.enableValid();
  popupAvatar.open();
});

editButton.addEventListener("click", function () {
  (nameProfileInput.value = user.getUserInfor().name),
    (aboutProfileInput.value = user.getUserInfor().about);
  const formValidatorEdit = new FormValidator(validationConfig, formProfile);
  formValidatorEdit.enableValid();
  popupEdit.open();
});

Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    avatar.src = userData.avatar;
    const section = getSection(cards);
    section.rendererItems();
  })
  .catch((err) => {
    console.log("Ошибка загрузки данных", err.message);
  });

///////////////////////////////////////////////////////////////////////////////////



enableValidation(validationConfig);

Promise.all([getProfile(), getCards()])
  .then(([userData, cards]) => {
    user.id = userData._id;
    nameProfile.textContent = userData.name;
    hobbyProfile.textContent = userData.about;
    avatar.src = userData.avatar;

    cards.forEach(function (item) {
      const isMyLike = item.likes.filter((item) => item._id === user.id);
      const isMyCard = item.owner._id === user.id;
      elementsList.append(createCard(item, isMyLike.length > 0, isMyCard));
    });
  })
  .catch((err) => {
    console.log("Ошибка загрузки данных", err.message);
  });


avatarButton.addEventListener("click", function () {
  enableValidation(validationConfig);
   openPopup(popupAvatar);
});

editButton.addEventListener("click", function () {
  nameProfileInput.value = nameProfile.textContent;
  hobbyProfileInput.value = hobbyProfile.textContent;
  enableValidation(validationConfig);
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  enableValidation(validationConfig);
  openPopup(popupAdd);
});

popups.forEach((elm) => {
  elm.addEventListener("mousedown", function (e) {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close")
    ) {
      closePopup(elm);
    }
  });
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formButtonProfile);
  const profile = {
    name: nameProfileInput.value,
    about: hobbyProfileInput.value,
  };

  editProfile(profile)
    .then((res) => {
      nameProfile.textContent = res.name;
      hobbyProfile.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log("Ошибка изменения профиля", err.message);
    })
    .finally(() => {
      renderLoading(false, formButtonProfile );
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formButtonAvatar);
  editAvatar(linkAvatarInput)
    .then((res) => {
      avatar.src = res.avatar;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log("Ошибка изменения аватара", err.message);
    })
    .finally(() => {
      renderLoading(false, formButtonAvatar);
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
   renderLoading(true,formButtonCard);

  const card = {
    name: nameCardInput.value,
    link: linkCardInput.value,
  };

  createNewCardSubmit(card)
    .then((res) => {
      const isMyLike = res.likes.filter((item) => item._id === user.id);
      const isMyCard = res.owner._id === user.id;
      elementsList.prepend(createCard(res, isMyLike.length > 0, isMyCard));
      formCard.reset();
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log("Ошибка создания карточки", err.message);
    })
    .finally(() => {
      renderLoading(false, formButtonCard);
    });
}

formCard.addEventListener("submit", handleNewCardSubmit);

formAvatar.addEventListener("submit", handleAvatarSubmit);

formProfile.addEventListener("submit", handleProfileSubmit);

formDelete.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const element = document.querySelector(".element_active");

  deleteCard(element)
    .then(() => {
      element.remove();

      const popupOpened = document.querySelector(".popup_opened");
      closePopup(popupOpened);
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
});
