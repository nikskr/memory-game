const deckOfCards = [];

export const cardPaths = [
    "./assets/images/cat.svg",
    "./assets/images/dog.svg",
    "./assets/images/hedgehog.svg",
    "./assets/images/hippopotamus.svg",
    "./assets/images/monkey.svg",
    "./assets/images/orca.svg",
    "./assets/images/parrot.svg",
    "./assets/images/shark.svg",
];

deckOfCards.length = cardPaths.length * 2;

const cardSequenceNumberArray = [];

function fillCardSequenceNumberArray() {
    cardPaths.forEach((_, index) => {
        cardSequenceNumberArray.push(index * 2);
        cardSequenceNumberArray.push(index * 2 + 1);
    });
}

function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function removeElementFromArray(array, element) {
    const index = array.indexOf(element);
    return array.splice(index, 1)[0];
}

function fillCardsDeck() {
    cardPaths.forEach((category) => {
        const deckFirstCardNumber = getRandomElementFromArray(
            cardSequenceNumberArray,
        );
        deckOfCards[deckFirstCardNumber] = {
            img: category,
            id: `${category}__1`,
        };
        removeElementFromArray(cardSequenceNumberArray, deckFirstCardNumber);
        const deckSecondCardNumber = getRandomElementFromArray(
            cardSequenceNumberArray,
        );
        deckOfCards[deckSecondCardNumber] = {
            img: category,
            id: `${category}__2`,
        };
        removeElementFromArray(cardSequenceNumberArray, deckSecondCardNumber);
    });
}

export function formNewDeckOfCards() {
    fillCardSequenceNumberArray();
    fillCardsDeck();
}

export default deckOfCards;
