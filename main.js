// -------
const firstChar = document.querySelector("#first-char");
const amaliatName = document.querySelector("#amaliat-name");
const lastChar = document.querySelector("#last-char");
const pasokh = document.querySelector("#pasokh");
// ===========
const startBtn = document.querySelector("#START-btn");
const gameOverlay = document.querySelector(".game-overlay");

// ----
const stepText = document.querySelector("#stepText");

// -----
const randomQuestion = document.querySelector("#random-question");

// ------------
const recordText = document.querySelector("#Record-text");

// ----- audios
const okAudio = document.querySelector("#ok-audio");
const errorAudio = document.querySelector("#error-audio");
// __
const volumeBtn = document.querySelector("#volume-btn");

// ------ btns
const btns = document.querySelectorAll(".btn");

// -------- start

// --------- loading section =----------===>
  // Loading Screen

const loadingScreen = document.querySelector("#loading-screen");

window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hide");
  }, 2200);
});

// ---------------

let record = Number(localStorage.getItem("record")) || 0;

recordText.textContent = `Record : ${record}`;
// _____
let isVolumeUp = localStorage.getItem("isVolumeUp") === "true";

if (isVolumeUp) {
  volumeBtn.firstElementChild.classList.remove("fa-volume-mute");
  volumeBtn.firstElementChild.classList.add("fa-volume-up");
} else {
  volumeBtn.firstElementChild.classList.remove("fa-volume-up");
  volumeBtn.firstElementChild.classList.add("fa-volume-mute");
}

// -----------

startBtn.addEventListener("click", () => {
  stepText.textContent = "1"   // fix UX error
  generateQuestion();
  gameOverlay.classList.add("show");
});

gameOverlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    gameOverlay.classList.remove("show");
  }
});

volumeBtn.addEventListener("click", (e) => {
  isVolumeUp = !isVolumeUp;

  localStorage.setItem("isVolumeUp", isVolumeUp);

  volumeBtn.firstElementChild.classList.toggle("fa-volume-mute", !isVolumeUp);
  volumeBtn.firstElementChild.classList.toggle("fa-volume-up", isVolumeUp);
});

// ----------btns section
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (btn.dataset.value !== undefined && pasokh.textContent.length < 4) {
      pasokh.textContent += btn.dataset.value;
    }

    if (action === "clear") {
      pasokh.textContent = "";
    }

    if (action === "back") {
      pasokh.textContent = removeEndNum(pasokh.textContent);
    }

    if (action === "Exit") {
      gameOverlay.classList.remove("show");
    }

    if (action === "tik") {
      const userAnswer = Number(pasokh.textContent);

      const controls = document.querySelector(".game-contorol");
      const calculatorControls = document.querySelector(
        ".calculator-contoroler",
      );
      const gameBox = document.querySelector(".game-box");

      if (userAnswer === currentAnswer) {
        stepText.textContent = Number(stepText.textContent) + 1;

        if (isVolumeUp) {
          okAudio.currentTime = 0;
          okAudio.play();
        }

        const currentStep = Number(stepText.textContent);

        if (currentStep > record) {
          record = currentStep;

          localStorage.setItem("record", record);

          recordText.textContent = `Record : ${record}`;
        }

// ---------
        controls.classList.add("correct");
        calculatorControls.classList.add("correct");
        gameBox.classList.add("correct");
        generateQuestion();

        setTimeout(() => {
          controls.classList.remove("correct");
          calculatorControls.classList.remove("correct");
          gameBox.classList.remove("correct");
        }, 1000);
      } else {
        controls.classList.add("wrong");
        calculatorControls.classList.add("wrong");
        gameBox.classList.add("wrong");

        if (isVolumeUp) {
          errorAudio.currentTime = 0;
          errorAudio.play();
        }

        setTimeout(() => {
          controls.classList.remove("wrong");
          calculatorControls.classList.remove("wrong");
          gameBox.classList.remove("wrong");
        }, 1000);
      }
    }
  });
});
// --------------
// Keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Numbers
  if (key >= "0" && key <= "9") {
    if (pasokh.textContent.length < 4) {
      pasokh.textContent += key;
    }
  }

  // Clear
  if (key === "Escape") {
    pasokh.textContent = "";
  }

  // Backspace
  if (key === "Backspace") {
    pasokh.textContent = removeEndNum(pasokh.textContent);
  }

  // Enter = OK
  if (key === "Enter") {
    document.querySelector("#okay-btn").click();
  }
});
// ----

const removeEndNum = (num) => {
  return String(num).slice(0, -1);
}; // =======

const operators = ["+", "-", "×", "÷"];

let currentAnswer = 0;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a new question
function generateQuestion() {
  let num1;
  let num2;

  const operator = operators[randomNumber(0, operators.length - 1)];

  // Addition
  if (operator === "+") {
    num1 = randomNumber(1, 200);
    num2 = randomNumber(1, 100);

    currentAnswer = num1 + num2;
  }

  // Subtraction
  if (operator === "-") {
    num1 = randomNumber(1, 200);
    num2 = randomNumber(1, num1);

    currentAnswer = num1 - num2;
  }

// --------------
  if (operator === "×") {
    num1 = randomNumber(1, 20);
    num2 = randomNumber(1, 100);

    currentAnswer = num1 * num2;
  }

// ====================
  if (operator === "÷") {
    num2 = randomNumber(1, 20);
    currentAnswer = randomNumber(1, 20);

    num1 = num2 * currentAnswer;
  }

  firstChar.textContent = num1;
  amaliatName.textContent = operator;
  lastChar.textContent = num2;
  pasokh.textContent = "";
}

function showRandomQuestion() {
  let num1;
  let num2;
  let answer;
  let operator;

  operator = operators[randomNumber(0, operators.length - 1)];

  if (operator === "+") {
    num1 = randomNumber(1, 200);
    num2 = randomNumber(1, 100);
    answer = num1 + num2;
  }

  if (operator === "-") {
    num1 = randomNumber(1, 200);
    num2 = randomNumber(1, num1);
    answer = num1 - num2;
  }

  if (operator === "×") {
    num1 = randomNumber(1, 20);
    num2 = randomNumber(1, 100);
    answer = num1 * num2;
  }

  if (operator === "÷") {
    num2 = randomNumber(1, 20);
    answer = randomNumber(1, 20);
    num1 = num2 * answer;
  }

  randomQuestion.textContent = `${num1} ${operator} ${num2} = ${answer}`;
}

setInterval(showRandomQuestion, 5000);
