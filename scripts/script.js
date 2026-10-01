import "./consts.js";
import "./deckOfCards.js";
import {
    bodyElement,
    containerElement,
    headerElement,
    mainElement,
    cardsListElement,
    topTableBtn,
    startGameBtn,
    gameInfoElement,
    scoreElement,
    movesElement,
    modalContainer,
    modalElement,
    modalTitle,
    modalContent,
    modalBtnContainer,
    modalCloseBtn,
    modalStartGameBtn,
} from "./consts.js";
import "./stylesManager.js";
import { addTopResult, topResults } from "./topResults.js";
import deckOfCards, { cardPaths, formNewDeckOfCards } from "./deckOfCards.js";

let score = 0;
let moves = 0;

const currentActiveCards = [];

const startGameText = "New";

startGameBtn.textContent = startGameText;
startGameBtn.addEventListener("click", () => startNewGame());
topTableBtn.textContent = "Top";
topTableBtn.addEventListener("click", () => {
    openModal("top");
    modalElement.classList.add("active");
});

headerElement.appendChild(startGameBtn);
headerElement.appendChild(topTableBtn);

containerElement.appendChild(headerElement);

scoreElement.textContent = `Score: ${score} / ${cardPaths.length}`;
movesElement.textContent = `Moves: ${moves}`;

gameInfoElement.appendChild(scoreElement);
gameInfoElement.appendChild(movesElement);

mainElement.appendChild(gameInfoElement);

startNewGame();

containerElement.appendChild(mainElement);

bodyElement.appendChild(containerElement);

function startNewGame() {
    moves = 0;
    movesElement.textContent = `Moves: ${moves}`;
    score = 0;
    scoreElement.textContent = `Score: ${score} / ${cardPaths.length}`;
    cardsListElement.replaceChildren();
    formNewDeckOfCards();
    deckOfCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.id = card.id;

        const cardImage = document.createElement("img");
        cardImage.classList.add("card__image");
        cardImage.src = card.img;

        cardElement.addEventListener("click", handleCardClick);
        cardElement.appendChild(cardImage);
        cardsListElement.appendChild(cardElement);
    });

    mainElement.appendChild(cardsListElement);
}

let modalWinText = `Your game moves: x`;

function handleCardClick(e) {
    const currentCardElement = e.target.closest(".card");

    currentActiveCards.push(currentCardElement);

    switch (currentActiveCards.length) {
        case 1:
            toggleCardToActive(currentCardElement);
            currentCardElement.removeEventListener("click", handleCardClick);
            break;
        case 2:
            moves++;
            movesElement.textContent = `Moves: ${moves}`;
            toggleCardToActive(currentCardElement);
            if (
                currentActiveCards[0].querySelector(".card__image").src ===
                currentActiveCards[1].querySelector(".card__image").src
            ) {
                score++;
                scoreElement.textContent = `Score: ${score} / ${cardPaths.length}`;
                currentActiveCards.forEach((cardElement) => {
                    cardElement.classList.add("completed");
                    cardElement.removeEventListener("click", handleCardClick);
                });
                if (score === cardPaths.length) {
                    addTopResult(moves, Date.now());
                    openModal("win");
                    modalElement.classList.add("active");
                }
                currentActiveCards.length = 0;
            } else {
                const allCardElements = document.querySelectorAll(
                    ".card:not(.completed)",
                );
                allCardElements.forEach((cardElement) => {
                    cardElement.removeEventListener("click", handleCardClick);
                });
                setTimeout(() => {
                    toggleCardFromActive(currentActiveCards[1]);
                    toggleCardFromActive(currentActiveCards[0]);
                    allCardElements.forEach((cardElement) => {
                        cardElement.addEventListener("click", handleCardClick);
                    });
                }, 1000);
            }
            break;
    }
}

function toggleCardToActive(currentCardElement) {
    currentCardElement.classList.add("active");
}

function toggleCardFromActive(currentCardElement) {
    const index = currentActiveCards.indexOf(currentCardElement);
    currentActiveCards.splice(index, 1);
    currentCardElement.classList.remove("active");
    currentCardElement.addEventListener("click", handleCardClick);
}

modalCloseBtn.textContent = "Close";

modalCloseBtn.addEventListener("click", closeModal);

function closeModal() {
    modalContainer.replaceChildren();
    modalContent.replaceChildren();
    modalBtnContainer.replaceChildren();
    modalElement.classList.remove("active");
}

modalStartGameBtn.addEventListener("click", () => {
    closeModal();
    startNewGame();
});

modalStartGameBtn.textContent = startGameText;

function openModal(type) {
    switch (type) {
        case "win":
            modalTitle.textContent = "You won!";
            modalWinText = `Your game moves: ${moves}`;
            modalContent.textContent = modalWinText;
            modalBtnContainer.appendChild(modalStartGameBtn);
            break;
        case "top":
            {
                if (topResults.length === 0) {
                    modalTitle.textContent = "No results yet";
                } else {
                    modalTitle.textContent = "Top results";
                    const topTable = document.createElement("table");
                    const tableHeadRow = document.createElement("tr");
                    const tableNumberHead = document.createElement("th");
                    tableNumberHead.textContent = "№";
                    const tableMovesHead = document.createElement("th");
                    tableMovesHead.textContent = "Moves";
                    const tableDateHead = document.createElement("th");
                    tableDateHead.textContent = "Date";
                    tableHeadRow.appendChild(tableNumberHead);
                    tableHeadRow.appendChild(tableMovesHead);
                    tableHeadRow.appendChild(tableDateHead);
                    topTable.appendChild(tableHeadRow);
                    topResults.forEach((result, i) => {
                        const tableResultRow = document.createElement("tr");
                        const tableResultNumber = document.createElement("td");
                        tableResultNumber.textContent = i + 1;
                        const tableResultMoves = document.createElement("td");
                        tableResultMoves.textContent = result.moves;
                        const tableResultDate = document.createElement("td");
                        tableResultDate.textContent = result.date;
                        tableResultRow.appendChild(tableResultNumber);
                        tableResultRow.appendChild(tableResultMoves);
                        tableResultRow.appendChild(tableResultDate);
                        topTable.appendChild(tableResultRow);
                    });
                    modalContent.appendChild(topTable);
                }
            }
            break;
    }
    modalBtnContainer.appendChild(modalCloseBtn);
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(modalContent);
    modalContainer.appendChild(modalBtnContainer);
    modalElement.appendChild(modalContainer);
    bodyElement.appendChild(modalElement);
}
