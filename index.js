const container = document.querySelector('.page');
const popup = container.querySelector('.popup');
const closeButton = container.querySelector('.popup__close');
const editButtton = container.querySelector('.profile__button-edit');
const saveButton = container.querySelector('.popup__form-button');


function openPopup () {
  popup.classList.add('popup_opened');
}

editButtton.addEventListener('click', openPopup);

function closePopup () {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


const formPopupWinow = document.querySelector('.popup__window');
const nameInput = formPopupWinow.querySelector('#name');
const hobbyInput = formPopupWinow.querySelector('#hobby');

function formSubmitHandler (evt) {
  evt.preventDefault();

  const nameProfile = document.querySelector('.profile__name').textContent = nameInput.value;
  const hobbyProfile = document.querySelector('.profile__hobby').textContent = hobbyInput.value;

  closePopup();
}

formPopupWinow.addEventListener('submit', formSubmitHandler);

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

  const elementsList = document.querySelector('.elements');
  const elementTemplate = document.querySelector('#element').content;

  initialCards.forEach(function (elm) {

    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = elm.link;
    element.querySelector('.element__title').textContent = elm.name;
    element.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    })

    elementsList.append(element);
  });

