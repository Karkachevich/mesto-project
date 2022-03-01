import { openPopup } from "./modal.js";
import {
  removeLike,
  settingLike,
} from "./api.js";

const popupImage = document.querySelector(".popup_type_picture");
const image = document.querySelector(".popup__image");
const captionImage = document.querySelector(".popup__caption");

const elementTemplate = document.querySelector("#element").content;

const popupDelete = document.querySelector(".popup_type_delete");

//функция создания карточки

function createCard(card, isMyLike) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  const like = element.querySelector(".element__like");
  const title = element.querySelector(".element__title");
  const likeCoutn = element.querySelector(".element__like-count");
  likeCoutn.textContent = card.likes.length;
  imageElement.src = card.link;
  imageElement.alt = `фото ${card.name}`;
  title.textContent = card.name;
  element.id = card._id;
  if(isMyLike){
    like.classList.add('element__like_active')
  }

  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
    if (evt.target.classList.contains("element__like_active")) {
      settingLike(element.id).then((res) => {
        likeCoutn.textContent = res.likes.length;
      });
    } else {
      removeLike(element.id).then((res) => {
        likeCoutn.textContent = res.likes.length;
      });
    }
  });

  imageElement.addEventListener("click", function (evt) {
    image.src = evt.target.src;
    captionImage.textContent = title.textContent;
    image.alt = `фото ${captionImage.textContent}`;

    openPopup(popupImage);
  });
  return element;
}

const createMyCard = (card) => {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  const like = element.querySelector(".element__like");
  const trash = element.querySelector(".element__trash");
  const title = element.querySelector(".element__title");
  const likeCoutn = element.querySelector(".element__like-count");
  likeCoutn.textContent = 0;
  imageElement.src = card.link;
  imageElement.alt = `фото ${card.name}`;
  title.textContent = card.name;
  element.id = card._id;

  trash.classList.add("element__trash_active");
  trash.addEventListener("click", function () {
    element.classList.add("element_active");
    openPopup(popupDelete);
  });

  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
    if (evt.target.classList.contains("element__like_active")) {
      settingLike(element.id).then((res) => {
        likeCoutn.textContent = res.likes.length;
      });
    } else {
      removeLike(element.id).then((res) => {
        likeCoutn.textContent = res.likes.length;
      });
    }
  });

  imageElement.addEventListener("click", function (evt) {
    image.src = evt.target.src;
    captionImage.textContent = title.textContent;
    image.alt = `фото ${captionImage.textContent}`;
    openPopup(popupImage);
  });
  return element;
};


export { createMyCard, createCard };
