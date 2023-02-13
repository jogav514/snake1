let snake = [0, 1, 2];
const size = 10;
const box = document.getElementById('snake-box');
let divs;
const interval = 500;
let idInterval;
const playButton = document.getElementById('play-button');
const rightButton = document.getElementById('button-right');
const downButton = document.getElementById('button-down');
const upButton = document.getElementById('button-up');
const leftButton = document.getElementById('button-left');
let Accumulator = 1;
let foodIndex;
const score = document.getElementById('score');
let scoreCount = 0;

playButton.addEventListener('click', () => {
    startGame();
})
rightButton.addEventListener('click', () => {
    right();
})

leftButton.addEventListener('click', () => {
    left();
})

downButton.addEventListener('click', () => {
    down();
})

upButton.addEventListener('click', () => {
    up();
})




function createBox() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const div = document.createElement('div');
            box.appendChild(div);
        }
    }
}

function drawSnake() {
    divs = document.querySelectorAll('.box div');
    snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake() {
    const tail = snake.shift();
    divs[tail].classList.remove('snake');
    const head = snake[snake.length - 1] + Accumulator;

    if (isColision(head)) {
        alert('game over');
        clearGame();
        return
    }
    snake.push(head);


    divs[head].classList.add('snake');
    //food
    eatFood(tail);

}

function eatFood(tail) {
    if (snake[snake.length - 1] === foodIndex) {
        divs[foodIndex].classList.remove('food');
        snake.unshift(tail);
        divs[tail].classList.add('snake')
        score.innerText = ++scoreCount;
        randomFood();

    }
}

function isColision(index) {
    console.log(index % size);
    if (
        index >= size * size
        || index < 0
        || (Accumulator === 1 && index % size === 0)
        || (Accumulator === -1 && (index + 1) % size === 0)
    ) {
        return true;
    }
    return false
}

function startGame() {
    clearGame();
    idInterval = setInterval(() => {
        moveSnake();
    }, interval)

}

function clearGame() {
    score.innerText=0
    box.innerHTML = '';
    Accumulator = 1;
    scoreCount= 0;
    snake = [0, 1, 2];
    score.innerText=scoreCount;
    clearInterval(idInterval);
    createBox();
    drawSnake();
    randomFood();

}

function up() {
    Accumulator = -size;
}

function down() {
    Accumulator = size;
}

function left() {
    Accumulator = -1;
}

function right() {
    Accumulator = 1;
}

function randomFood() {
    foodIndex = Math.floor(Math.random() * divs.length);
    while (snake.includes(foodIndex)) {
        foodIndex = Math.floor(Math.random() * divs.length);
    }
    divs[foodIndex].classList.add('food');
}

clearGame();




