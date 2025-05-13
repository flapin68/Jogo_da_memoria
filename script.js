const images = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png',
    'img5.png', 'img6.png', 'img7.png', 'img8.png'
];

let firstCard, secondCard, lockBoard;
const board = document.getElementById('gameBoard');
const newGameBtn = document.getElementById('newGameBtn');

function startGame() {
    board.innerHTML = '';
    let cards = [...images, ...images];
    cards = cards.sort(() => 0.5 - Math.random());

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    cards.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = `images/${image}`;
        card.appendChild(img);

        card.addEventListener('click', flipCard);

        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

newGameBtn.addEventListener('click', startGame);
startGame();

