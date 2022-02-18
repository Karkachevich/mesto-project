const popups = document.querySelectorAll(".popup");
const nameProfile = document.querySelector(".profile__name");
const hobbyProfile = document.querySelector(".profile__hobby");
const nameInput = document.querySelector("#name-input");
const hobbyInput = document.querySelector("#hobby-input");
const popupEdit = document.querySelector("#popup-edit");
const popupAdd = document.querySelector("#popup-add");
const editButtton = document.querySelector(".profile__button-edit");
const addButtton = document.querySelector(".profile__button-add");

nameProfile.textContent = "Жак-Иф Кусто";
hobbyProfile.textContent = "Исследователь океана";

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
  function keyEcsHadler(evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
      document.removeEventListener("keydown", keyEcsHadler);
    }
  }
  document.addEventListener("keydown", keyEcsHadler);
}

editButtton.addEventListener("click", function () {
  nameInput.value = nameProfile.textContent;
  hobbyInput.value = hobbyProfile.textContent;
  openPopup(popupEdit);
});

addButtton.addEventListener("click", function () {
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
  nameProfile.textContent = nameInput.value;
  hobbyProfile.textContent = hobbyInput.value;
  closePopup(popupEdit);
}

export { getEditProfile, openPopup, closePopup };
