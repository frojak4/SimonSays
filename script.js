const beep = new Audio("beep-02.mp3");
beep.volume = 0.05;
const buzz = new Audio("buzz.wav");
buzz.volume = 0.05;
let app = document.querySelector(".app");
let computerMoves = []
let playerMoves = []
const colors = ["yellow", "blue", "red", "green"];
let buttonClass = ["yellow", "blue", "red", "green"];
const activeClass = ["actyellow", "actblue", "actred", "actgreen"];
let state = true;
let randomFarge;
let index = 0;
let i = 0;
let points = 0;
let playerState = false;

function updateView() {
    app.innerHTML = /*HTML*/`
    <div class="overskrift">
    <h1>Simon Says</h1>
    </div>
    <div class="knapper">
        <div onclick="playerMove(0)" class=${buttonClass[0]}></div>
        <div onclick="playerMove(1)" class=${buttonClass[1]}></div>
        <div onclick="playerMove(2)" class=${buttonClass[2]}></div>
        <div onclick="playerMove(3)" class=${buttonClass[3]}></div>

    </div>
    <div class="score">
    <h1 class="skrift">Points: ${points}</h1>
    </div>
    `
}

function startScreen() {
    state = true;
    points = 0;
    app.innerHTML = /*HTML*/`
    <div class="overskrift">
    <h1>Simon Says</h1>
    </div>
    <div onclick="newComputerMove()" class="knapper">
        <h1 class="skrift">Start Game</h1>
    </div>
    `
}

function gameOver() {
    computerMoves = [];
    state = false;
    
    app.innerHTML = /*HTML*/`
    <div class="overskrift">
    <h1>Simon Says</h1>
    </div>
    <div onclick="startScreen()" class="knapper">
        <h1 class="skrift">You lost with ${points} points, <br/> Click to play again!</h1>
    </div>
    `
}

startScreen();



function playerMove(color) {
    if (playerState) {
    if (color == computerMoves[index]) {
        changeColor(color);
        index++;
    } else {
        buzz.play();
        gameOver();
    }

    if (index >= computerMoves.length) {
        index = 0; 
        state = false;
        points ++;
        setTimeout(newComputerMove,1000)
    }
}
}

function changeColor(color) {
    if (state) {
    state = false;
    buttonClass[color] = activeClass[color]
    updateView();
    setTimeout(clearColor, 500);
    beep.play();
}
}

function clearColor() {
    buttonClass = ["yellow", "blue", "red", "green"];
    updateView();
    state = true;
}

function computerMove() {
    if (index < computerMoves.length) {  
        changeColor(computerMoves[index]);
        index += 1;
        setTimeout(computerMove, 1000);
    } else {
        index = 0;
        playerState = true;
    }
}

function newComputerMove() {
    if (state) {
    playerState = false;
    updateView();
    randomTall = Math.floor(Math.random() * 4);
    computerMoves.push(randomTall);
    index = 0;
    setTimeout(computerMove, 500);
}
}

