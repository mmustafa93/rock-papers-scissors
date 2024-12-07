// Constants and variables
const options = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
const backgrounds = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFF8E1", "#F3E5F5"];

// DOM Elements
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const restartButton = document.getElementById("restart");
const buttons = document.querySelectorAll("#game button");
const gameContainer = document.querySelector(".game-container");

// Event Listeners
buttons.forEach(button =>
    button.addEventListener("click", event => playRound(event.target.id))
);
restartButton.addEventListener("click", restartGame);

// Functions
function getComputerChoice() {
    return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection) {
    const computerSelection = getComputerChoice();

    // Change background color
    document.body.style.backgroundColor =
        backgrounds[Math.floor(Math.random() * backgrounds.length)];

    if (playerSelection === computerSelection) {
        messageDisplay.textContent = `It's a tie! You both chose ${playerSelection}.`;
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        humanScore++;
        messageDisplay.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        messageDisplay.textContent = `Computer wins! ${computerSelection} beats ${playerSelection}.`;
    }

    updateScore();

    if (humanScore === 5 || computerScore === 5) {
        declareWinner();
    }
}

function updateScore() {
    scoreDisplay.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
}

function declareWinner() {
    if (humanScore === 5) {
        messageDisplay.textContent = "Congratulations! You are the champion!";
    } else {
        messageDisplay.textContent = "Game over! Computer wins this time.";
    }

    // Disable buttons and show restart
    buttons.forEach(button => (button.disabled = true));
    restartButton.classList.remove("hidden");
}

function restartGame() {
    // Reset scores and messages
    humanScore = 0;
    computerScore = 0;
    scoreDisplay.textContent = `Human: 0 | Computer: 0`;
    messageDisplay.textContent = "Let the game begin!";

    // Reset buttons and hide restart
    buttons.forEach(button => (button.disabled = false));
    restartButton.classList.add("hidden");

    // Reset background color
    document.body.style.backgroundColor = "#FFFFFF";
}