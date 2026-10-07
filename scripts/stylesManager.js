import {
  cardsListElement,
  containerElement,
  gameInfoElement,
  headerElement,
  mainElement,
  modalBtnContainer,
  modalCloseBtn,
  modalContainer,
  modalContent,
  modalElement,
  modalStartGameBtn,
  modalTitle,
  startGameBtn,
  topTableBtn,
} from "./consts.js";

containerElement.classList.add("container");
headerElement.classList.add("header");
mainElement.classList.add("main");
cardsListElement.classList.add("card__list");
startGameBtn.classList.add("header__btn");
topTableBtn.classList.add("header__btn");
gameInfoElement.classList.add("main__game-info");
modalElement.classList.add("modal");
modalContainer.classList.add("modal__container");
modalTitle.classList.add("modal__title");
modalContent.classList.add("modal__content");
modalBtnContainer.classList.add("modal__btn-container");
modalCloseBtn.classList.add("btn");
modalStartGameBtn.classList.add("btn");
