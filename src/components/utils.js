
const renderLoading = (isLoading) => {
  const button = document.querySelector(".form__button_active");
  //const button = document.querySelector(".form__button");
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export { renderLoading }
