const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start");
const cards = document.getElementById("game");
const topGuesses = document.getElementById("lbGuesses");
const topTime = document.getElementById("lbTime");
const restart = document.getElementById("restart");
const match = document.getElementById("match");
const guesses = document.getElementById("guess");

// Update from localStorage
const leaderBoard = JSON.parse(localStorage.getItem("score")) || [];
if (localStorage.getItem("score") !== null) {
  topGuesses.innerText = Math.round(leaderBoard[0].Guesses);
  topTime.innerText = leaderBoard[0].Time;
}

// Shuffle color picker
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);

// Create cards' colors and eventListeners
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// GAME FUNCTIONS:
let flippedCards = [];
let matchedColors = [];
let matches = 0;
let time = 0;
let guess = 0;
let noClick = false;
let startTimer = true;
let stopTimer;

// To start the game:
const timer = document.getElementById("time");

function startGame() {
  if (startTimer === true) {
    startTimer = false;
    stopTimer = setInterval(function () {
      time++;
      timer.innerText = time;
    }, 1000);
  }
  guess += 0.5;
  guesses.innerText = Math.floor(guess);
}

// To restart game:
function restartGame() {
  clearInterval(stopTimer);
  startTimer = true;
  time = 0;
  timer.innerText = time;
  matches = 0;
  match.innerText = matches;
  guess = 0;
  guesses.innerText = guess;
  matchedColors = [];
  deleteDivsForColors();
  shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

// Flipping Cards:
function handleCardClick(event) {
  if (noClick === true) {
  } else {
    event.target.style.backgroundColor = `${event.target.classList}`;
    flippedCards.push(event.target);

    // After selecting two cards:
    if (flippedCards.length === 2) {
      const firstCardColor = flippedCards[0].style.backgroundColor;
      const secondCardColor = flippedCards[1].style.backgroundColor;

      // If No match, flip back over:
      if (firstCardColor !== secondCardColor) {
        const firstCard = flippedCards[0];
        const secondCard = flippedCards[1];
        function flipDelay() {
          setTimeout(function () {
            firstCard.style.backgroundColor = "inherit";
            secondCard.style.backgroundColor = "inherit";
            noClick = false;
          }, 1000);
          noClick = true;
        }
        flipDelay();
        console.log(`Number of matches: ${matches}`);
      }

      // If Match, stay flipped up:
      else if (
        firstCardColor === secondCardColor &&
        !matchedColors.includes(firstCardColor) &&
        flippedCards[0] !== flippedCards[1]
      ) {
        matches++;
        console.log(`Number of matches: ${matches}`);
        matchedColors.push(event.target.style.backgroundColor);

        // When game is over:
        if (matches === 5) {
          clearInterval(stopTimer);
          console.log("congrats, you won");

          // Update leaderboard and localStorage:
          if (
            parseInt(topGuesses.innerText) === 0 ||
            (guess <= parseInt(topGuesses.innerText) &&
              time <= parseInt(topTime.innerText))
          ) {
            console.log("congrats, you made the leaderboard");
            leaderBoard.pop();
            localStorage.clear();
            topGuesses.innerText = Math.round(guess);
            topTime.innerText = time;
            const savedScore = { Guesses: guess, Time: time };
            leaderBoard.push(savedScore);
            localStorage.setItem("score", JSON.stringify(leaderBoard));
          }
        }
      }

      flippedCards = [];
      match.innerText = matches;
    }
  }
}

function deleteDivsForColors() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.lastChild);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

// Event Listeners
restart.addEventListener("click", restartGame);
cards.addEventListener("click", startGame);
