import "../index.css";
import { openPopup, closePopup } from "./modal.js";
import { createMyCard, createCard } from "./card.js";
import { validationConfig } from "./utils.js";
import { enableValidation, toggleButtonState } from "./validate.js";
import {
  getCards,
  getProfile,
  editProfile,
  editAvatar,
  deleteCard,
  createNewCardSubmit,
} from "./api";

//https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
//https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg

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

const formCard = document.querySelector(".form_type_card");
const inputFormCard = Array.from(
  formCard.querySelectorAll(validationConfig.inputForm)
);
const buttonFormCard = formCard.querySelector(
  validationConfig.submitButtonForm
);

const nameCardInput = formCard.querySelector(".form__input_type_title");
const linkCardInput = formCard.querySelector(".form__input_type_link");

const avatar = document.querySelector(".profile__avatar-pucture");
const formAvatar = document.querySelector(".form_type_avatar");
const linkAvatarInput = formAvatar.querySelector(".form__input_type_avatar");

const nameProfile = document.querySelector(".profile__name");
const hobbyProfile = document.querySelector(".profile__hobby");

const formDelete = document.querySelector(".form_type_delete");
const elementsList = document.querySelector(".elements");

let profileId = "";

getProfile()
  .then((res) => {
    profileId = res._id;
    nameProfile.textContent = res.name;
    hobbyProfile.textContent = res.about;
    avatar.src = res.avatar;
  })
  .catch((err) => {
    console.log("Ошибка загрузки профиля", err.message);
  });

getCards()
  .then((res) => {
    res.forEach(function (item) {
      let isMyLike = item.likes.filter((item) => item._id === profileId);
      if (item.owner._id === profileId) {
        elementsList.append(createMyCard(item));
      } else {
        elementsList.append(createCard(item, isMyLike.length > 0));
      }
    });
  })
  .catch((err) => {
    console.log("Ошибка загрузки карточек", err.message);
  });

enableValidation(validationConfig);

avatarButton.addEventListener("click", function () {
  openPopup(popupAvatar);
});

editButton.addEventListener("click", function () {
  nameProfileInput.value = nameProfile.textContent;
  hobbyProfileInput.value = hobbyProfile.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  toggleButtonState(inputFormCard, buttonFormCard, validationConfig);
  openPopup(popupAdd);
});

popups.forEach((elm) => {
  elm.addEventListener("click", function (e) {
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
  const profile = {
    name: nameProfileInput.value,
    about: hobbyProfileInput.value,
  };
  editProfile(profile)
    .then((res) => {
      nameProfile.textContent = res.name;
      hobbyProfile.textContent = res.about;
    })
    .catch((err) => {
      console.log("Ошибка изменения профиля", err.message);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  editAvatar(linkAvatarInput)
    .then((res) => {
      avatar.src = res.avatar;
    })
    .catch((err) => {
      console.log("Ошибка изменения аватара", err.message);
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: nameCardInput.value,
    link: linkCardInput.value,
  };

  createNewCardSubmit(card)
    .then((res) => {
      elementsList.prepend(createMyCard(res));
    })
    .catch((err) => {
      console.log("Ошибка создания карточки", err.message);
    });

  formCard.reset();
}

formCard.addEventListener("submit", handleNewCardSubmit);

formAvatar.addEventListener("submit", handleAvatarSubmit);

formProfile.addEventListener("submit", handleProfileSubmit);

formDelete.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const element = document.querySelector(".element_active");
  deleteCard(element)
    .then(element.remove())
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
});
