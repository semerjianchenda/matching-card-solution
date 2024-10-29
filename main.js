document.querySelector('.start').addEventListener('click', shuffleCards);
document.querySelector('.restart').addEventListener('click', reset);

let firstCard = null;
let secondCard = null;
let lockCard = false;

const matches = [
    ['#first', '#ninth'],
    ['#second', '#sixth'],
    ['#third', '#eighth'],
    ['#fourth', '#tenth'],
    ['#fifth', '#seventh']
];

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', flipCard);
});

function flipCard() {
    if (lockCard) return;
    if (this === firstCard) return;

    this.classList.add('flippedCard');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    matchingCards();
}

function shuffleCards() {
    const ourRows = document.querySelector('.rows');
    const cards = Array.from(ourRows.children);
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => ourRows.appendChild(card));
}

function matchingCards() {
    lockCard = true;
    const aMatch = matches.some(
        checkPair => checkPair.includes(`#${firstCard.id}`) && checkPair.includes(`#${secondCard.id}`)
    );

    aMatch ? disableCard() : unflipCard();
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    toReset();
}

function unflipCard() {
    setTimeout(() => {
        firstCard.classList.remove('flippedCard');
        secondCard.classList.remove('flippedCard');
        toReset();
    }, 1000);
}

function toReset() {
    [firstCard, secondCard] = [null, null];
    lockCard = false;
}

function reset() {
    window.location.reload();
}