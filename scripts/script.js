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
} from "./consts.js";
import "./stylesManager.js";
import deckOfCards, { cardPaths, formNewDeckOfCards } from "./deckOfCards.js";

let score = 0;
let moves = 0;

const currentActiveCards = [];

startGameBtn.textContent = "NEW";
startGameBtn.addEventListener("click", () => startNewGame());
topTableBtn.textContent = "TOP";

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

function handleCardClick(e) {
    const currentCardElement = e.target.closest(".card");

    currentActiveCards.push(currentCardElement);

    if (currentCardElement.classList.contains("active")) {
        toggleCardFromActive(currentCardElement);
        return;
    }

    switch (currentActiveCards.length) {
        case 0:
            toggleCardToActive(
                currentActiveCards[currentActiveCards.length - 1],
            );
            break;
        case 1:
            toggleCardToActive(
                currentActiveCards[currentActiveCards.length - 1],
            );
            break;
        case 2:
            toggleCardToActive(
                currentActiveCards[currentActiveCards.length - 1],
            );
            if (
                currentActiveCards[0].querySelector(".card__image").src ===
                currentActiveCards[1].querySelector(".card__image").src
            ) {
                score++;
                scoreElement.textContent = `Score: ${score} / ${cardPaths.length}`;
                console.log(currentActiveCards);
                currentActiveCards.forEach((cardElement) => {
                    cardElement.removeEventListener("click", handleCardClick);
                });
                currentActiveCards.length = 0;
            } else {
                setTimeout(() => {
                    currentActiveCards.forEach((cardElement) => {
                        toggleCardFromActive(cardElement);
                        currentActiveCards.length = 0;
                    });
                }, 1000);
            }
            break;
    }
}

function toggleCardToActive(currentCardElement) {
    currentCardElement.classList.add("active");
    moves++;
    movesElement.textContent = `Moves: ${moves}`;
}

function toggleCardFromActive(currentCardElement) {
    const index = currentActiveCards.indexOf(currentCardElement);
    currentActiveCards.splice(index, 1);
    currentCardElement.classList.remove("active");
    moves++;
    movesElement.textContent = `Moves: ${moves}`;
}
