const container = document.querySelector('.page');
const popup = container.querySelector('.popup');
const closeButton = container.querySelector('.popup__close');
const editButtton = container.querySelector('.profile__button-edit');

function openPopup () {
  popup.classList.add('popup_opened');
}

editButtton.addEventListener('click', function () {
  openPopup();
});

function closePopup () {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', function () {
  closePopup();
});

