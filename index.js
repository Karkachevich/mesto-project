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

