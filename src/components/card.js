import { openPopup, closePopup } from "./modal.js";

const popupAdd = document.querySelector("#popup-add");
const formPopupAdd = document.querySelector("#popup-add");
const namePlace = formPopupAdd.querySelector("#namePlace-input");
const linkImage = formPopupAdd.querySelector("#linkImage-input");

const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content;

const image = document.querySelector(".popup__image");
const captionImage = document.querySelector(".popup__caption");

const popupImage = document.querySelector("#popup-image");

//функция создания карточки

function createCard(arr) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  imageElement.src = arr.link;
  imageElement.alt = "фото" + " " + arr.name;
  element.querySelector(".element__title").textContent = arr.name;
  element
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  element
    .querySelector(".element__trash")
    .addEventListener("click", function () {
      element.remove();
    });
  element
    .querySelector(".element__image")
    .addEventListener("click", function (evt) {
      image.src = evt.target.src;
      captionImage.textContent =
        element.querySelector(".element__title").textContent;
      image.alt = "фото" + " " + captionImage.textContent;
      openPopup(popupImage);
    });
  return element;
}

//Функция для добавления карточки

function getNewCard(evt) {
  evt.preventDefault();
  evt.link = linkImage.value;
  evt.name = namePlace.value;
  elementsList.prepend(createCard(evt));
  linkImage.value = "";
  namePlace.value = "";
  closePopup(popupAdd);
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },

  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Инициализация массива с карточками

initialCards.forEach(function (item) {
  elementsList.append(createCard(item));
});

export { getNewCard };
