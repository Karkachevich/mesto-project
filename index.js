//функции открытия и закрытия ‘popup’ для редактирования профиля

const popupEdit = document.querySelector('#popup-edit');
const editButtton = document.querySelector('.profile__button-edit');
const closeButtonEdit = document.querySelector('#closeButtonEdit');

function openPopupEdit () {
  popupEdit.classList.add('popup_opened');
}
editButtton.addEventListener('click', openPopupEdit);

function closePopupEdit () {
  popupEdit.classList.remove('popup_opened');
}
closeButtonEdit.addEventListener('click', closePopupEdit);

//функции открытия и закрытия ‘popup’ для добавления карточки

const popupAdd = document.querySelector('#popup-add');
const closeButtonAdd =document.querySelector('#closeButtonAdd');
const addButtton = document.querySelector('.profile__button-add');

function openPopupAdd () {
  popupAdd.classList.add('popup_opened');
}
addButtton.addEventListener('click', openPopupAdd);

function closePopupAdd () {
  popupAdd.classList.remove('popup_opened');
}
closeButtonAdd.addEventListener('click', closePopupAdd);

//функция создания карточки и ‘popup’ для просмотра фотографии

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

function addCard (link, name) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.popup__image').src = link;
  element.querySelector('.popup__caption').textContent = name;
  element.querySelector('.element__title').textContent = name;


  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })
  element.querySelector('.element__trash').addEventListener('click', function () {
    element.remove();
  })
  element.querySelector('.element__image').addEventListener('click', function () {
    element.querySelector('.popup').classList.add('popup_opened');
  });
  element.querySelector('.popup__close').addEventListener('click', function () {
    element.querySelector('.popup').classList.remove('popup_opened');
  });
  elementsList.prepend(element);
}

//Функция для создания профиля пользователя

const formPopupEdit = document.querySelector('#popup-edit');
const nameInput = formPopupEdit.querySelector('#name');
const hobbyInput = formPopupEdit.querySelector('#hobby');

function formSubmitEdit (evt) {
  evt.preventDefault();
  const nameProfile = document.querySelector('.profile__name').textContent = nameInput.value;
  const hobbyProfile = document.querySelector('.profile__hobby').textContent = hobbyInput.value;
  closePopupEdit();
}
formPopupEdit.addEventListener('submit', formSubmitEdit);

//Функция для добавления карточки

const formPopupAdd = document.querySelector('#popup-add');
const namePlace = formPopupAdd.querySelector('#namePlace');
const linkImage = formPopupAdd.querySelector('#linkImage');

function formSubmitAdd (evt) {
  evt.preventDefault();
  const linkImg = linkImage.value;
  const namePlc = namePlace.value;
  addCard (linkImg, namePlc);
  closePopupAdd();
}
formPopupAdd.addEventListener('submit', formSubmitAdd);

//Инициализация массива с карточками

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

initialCards.forEach(function (item){
  addCard(item.link, item.name)
})


