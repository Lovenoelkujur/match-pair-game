const grid = document.getElementById('grid');
const restartButton = document.getElementById('btn');
const attemptsDisplay = document.getElementById('attempts');

// data stored i array (Card Element)
const cardsArray = ['😘', '😘', '😎', '😎', '♥️', '♥️', '🔔', '🔔', '🔐', '🔐', '📚', '📚', '🎁', '🎁', '🧸', '🧸', '💣', '💣', '💰', '💰'];

let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle Card Element
const Shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
};

// Create Card Element
const createCards = () => {
    grid.innerHTML = "";
    Shuffle(cardsArray);    // Shuffle Card

    cardsArray.forEach(item => {
        const card = document.createElement("div");
        card.classList.add('card');
        card.dataset.value = item;
        card.innerText = "";
        card.addEventListener("click", revealCard)      // Reveal Card
        grid.appendChild(card);
    })
};


// Reveal Card on Flip
function revealCard(){
    if(lockBoard || this === firstCard) return;

    this.innerText = this.dataset.value;
    this.classList.add("revealed");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}


// Check for Match
const checkForMatch = () => {
    if(firstCard.dataset.value === secondCard.dataset.value){
        disableCards();
    }
    else{
        unflipCards();
    }

    attempts++;
    attemptsDisplay.innerText = attempts;
}

// Disable Card
const disableCards = () => {
    firstCard.removeEventListener("click", revealCard);
    secondCard.removeEventListener("click", revealCard);
    matchedPairs++;

    if(matchedPairs === cardsArray.length / 2){
        setTimeout(() => {
            alert(`Congratulations! You've matched all the pairs in ${attempts} attempts!`);
        }, 500);
    }

    resetBoard();
};

// Unflip Card
const unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.innerText = "";
        secondCard.innerText = "";
        firstCard.classList.remove("revealed");     // Remove classlist revealed
        secondCard.classList.remove("revealed");
        resetBoard();
    }, 1000);
};

// Reset Board
const resetBoard = () => {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart Game
const restartGame = () => {
    attempts = 0;
    matchedPairs = 0;
    attemptsDisplay.innerText = attempts;
    resetBoard();
    createCards();
};

createCards();

restartButton.addEventListener("click", restartGame);