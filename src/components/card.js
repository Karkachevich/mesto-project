import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./utils.js";

const popupCard = document.querySelector(".popup_type_card-add");
const popupImage = document.querySelector(".popup_type_picture");
const image = document.querySelector(".popup__image");
const captionImage = document.querySelector(".popup__caption");

const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content;

const formCard = document.forms.card;
const card = {
  name: formCard.elements.name,
  link: formCard.elements.link,
};

//функция создания карточки

function createCard(card) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  const like = element.querySelector(".element__like");
  const trash = element.querySelector(".element__trash");
  const title = element.querySelector(".element__title");
  imageElement.src = card.link;
  imageElement.alt = `фото ${card.name}`;
  title.textContent = card.name;

  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });

  trash.addEventListener("click", function () {
    element.remove();
  });
  imageElement.addEventListener("click", function (evt) {
    image.src = evt.target.src;
    captionImage.textContent = title.textContent;
    image.alt = `фото ${captionImage.textContent}`;
    openPopup(popupImage);
  });
  return element;
}

//Функция для добавления карточки

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  evt.link = card.link.value;
  evt.name = card.name.value;
  elementsList.prepend(createCard(evt));
  closePopup(popupCard);
  formCard.reset();
}

//Инициализация массива с карточками

initialCards.forEach(function (item) {
  elementsList.append(createCard(item));
});

export { handleNewCardSubmit };
