const wrapper = document.querySelector("#wrapper");
const guessInput = document.querySelector("#guessField");

const submit = document.querySelector("#subt");

const prevGuesses = document.querySelector(".guesses");

const remainingGuesses = document.querySelector(".lastResult");

const hint = document.querySelector(".lowOrHi");

const newDiv = document.createElement("div");

let previousGuesses = [];

let numRemained = 10;

let playGame = true;
let gameOver = false;

let randomNumber = Math.floor(Math.random() * 100 + 1);

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    let guess = parseInt(guessInput.value);

    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess) || guess > 100 || guess < 0) {
    alert("enter a valid number");
  } else {
    if (numRemained < 1) {
      alert(`Out of turns. Correct guess was ${randomNumber}`);
      resetUI();
      guessInput.value = "";
      endGame();
    } else {
      displayGuesses(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    alert("Correct! You won!");
    resetUI();
    gameOver = true;
    endGame();
  } else if (guess > randomNumber) {
    displayMsg("guess lower");
  } else if (guess < randomNumber) {
    displayMsg("guess higher");
  }

  updateUI();
}

function displayMsg(message) {
  hint.innerHTML = `Hint: ${message}`;
}

function displayGuesses(guess) {
  guessInput.value = "";

  previousGuesses.push(guess);

  prevGuesses.innerHTML = `${previousGuesses}`;
}

const updateUI = () => {
  if (!gameOver) {
    numRemained--;
    remainingGuesses.innerHTML = `${numRemained}`;
  }
};

const resetUI = () => {
  numRemained = 10;
  remainingGuesses.innerHTML = `${numRemained}`;

  previousGuesses = [];
  prevGuesses.innerHTML = `${previousGuesses}`;

  hint.innerHTML = "";

  guessInput.setAttribute("disabled", "");
};

/////

const btn = document.createElement("button");

function endGame() {
  btn.style.display = "block";

  btn.innerHTML = "New Game";

  newDiv.appendChild(btn);

  wrapper.appendChild(newDiv);

  btn.addEventListener("click", newGame);
}

function newGame() {
  guessInput.removeAttribute("disabled");
  btn.style.display = "none";

  randomNumber = Math.floor(Math.random() * 100 + 1);
}

////////// COMMENT important events to learn about

//// type, timestamp, preventDefault(), stopPropagation, target, toElement, scrElement, currentTarget
//// clientX, clientY, screenX, screenY, tilt
//// whether these keys (altkey, ctrlkey, shiftkey) were pressed.
//// keyCode
