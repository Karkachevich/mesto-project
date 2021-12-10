const nameProfile = document.querySelector('.profile__name');
const hobbyProfile = document.querySelector('.profile__hobby');

const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-image')

const editButtton = document.querySelector('.profile__button-edit');
const addButtton = document.querySelector('.profile__button-add');

const closeButtonAdd = document.querySelector('#closeButtonAdd');
const closeButtonEdit = document.querySelector('#closeButtonEdit');
const closeImage = document.querySelector('#closeButtonImage');

const elementsList = document.querySelector('.elements');

//функции открытия и закрытия ‘popup’
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

editButtton.addEventListener('click', function () {
  openPopup(popupEdit);
});
addButtton.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeImage.addEventListener('click', function () {
  closePopup(popupImage);
});
closeButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});
closeButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

//функция создания карточки

function createCard(arr) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = arr.link;
  element.querySelector('.element__title').textContent = arr.name;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__trash').addEventListener('click', function () {
    element.remove();
  });
  element.querySelector('.element__image').addEventListener('click', function (evt) {
    document.querySelector('.popup__image').src = evt.target.src;
    document.querySelector('.popup__caption').textContent = element.querySelector('.element__title').textContent;
    openPopup(popupImage);
  });

  return element;
};

//Функция для создания профиля пользователя

const formPopupEdit = document.querySelector('#popup-edit');
const nameInput = formPopupEdit.querySelector('#name');
const hobbyInput = formPopupEdit.querySelector('#hobby');

nameInput.value = nameProfile.textContent = 'Жак-Иф Кусто';
hobbyInput.value = hobbyProfile.textContent = 'Исследователь океана';

function getEditProfile (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  hobbyProfile.textContent = hobbyInput.value;
  closePopup(popupEdit);
};
formPopupEdit.addEventListener('submit', getEditProfile);

//Функция для добавления карточки

const formPopupAdd = document.querySelector('#popup-add');
const namePlace = formPopupAdd.querySelector('#namePlace');
const linkImage = formPopupAdd.querySelector('#linkImage');

function getNewCard (evt) {
  evt.preventDefault();
  evt.link = linkImage.value;
  evt.name = namePlace.value;
  elementsList.prepend(createCard(evt));
  linkImage.value = '';
  namePlace.value = '';
  closePopup(popupAdd);
};
formPopupAdd.addEventListener('submit', getNewCard);

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

initialCards.forEach(function (item) {
  elementsList.append(createCard(item));
});
