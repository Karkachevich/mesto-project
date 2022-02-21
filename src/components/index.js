import "../index.css";
import { openPopup, closePopup } from "./modal.js";
import { handleNewCardSubmit } from "./card.js";
import { validationConfig } from "./utils.js";
import { enableValidation, toggleButtonState } from "./validate.js";
const popups = document.querySelectorAll(".popup");

const popupEdit = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card-add");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");

const formProfile = document.forms.profile;
const profile = {
  name: formProfile.elements.name,
  hobby: formProfile.elements.hobby,
};
const formCard = document.forms.card;
const inputFormCard = Array.from(formCard.querySelectorAll(validationConfig.inputForm));
const buttonFormCard = formCard.querySelector(validationConfig.submitButtonForm);

const nameProfile = document.querySelector(".profile__name");
const hobbyProfile = document.querySelector(".profile__hobby");

enableValidation(validationConfig);

nameProfile.textContent = "Жак-Иф Кусто";
hobbyProfile.textContent = "Исследователь океана";

editButton.addEventListener("click", function () {
  profile.name.value = nameProfile.textContent;
  profile.hobby.value = hobbyProfile.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  toggleButtonState(inputFormCard, buttonFormCard, validationConfig)
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

function getEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = profile.name.value;
  hobbyProfile.textContent = profile.hobby.value;
  closePopup(popupEdit);
}

formProfile.addEventListener("submit", getEditProfile);
formCard.addEventListener("submit", handleNewCardSubmit);
