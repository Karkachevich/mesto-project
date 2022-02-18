import { getNewCard } from "./card.js";
import { getEditProfile } from "./modal.js";

const validationConfig = {
  form: ".form",
  inputForm: ".form__input",
  submitButtonForm: ".form__button",
  setForm: ".form__set",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
  inactiveButtonClass: "form__button_inactive",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputForm));
  const buttonElement = formElement.querySelector(config.submitButtonForm);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const inputList = Array.from(
        formElement.querySelectorAll(config.inputForm)
      );
      const buttonElement = formElement.querySelector(config.submitButtonForm);
      if (!hasInvalidInput(inputList)) {
        if (evt.target.id === "form-edit") {
          getEditProfile(evt);
        }
        if (evt.target.id === "form-add") {
          getNewCard(evt);
          toggleButtonState(inputList, buttonElement, config);
        }
      }
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.setForm)
    );
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, config);
    });
  });
};

enableValidation(validationConfig);
