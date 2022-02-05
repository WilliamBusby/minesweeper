import Game from "./Javascript/Game.mjs";

const difficultyOption = document.getElementById("landing_page__difficulty__select");
const useTimer = document.getElementById("landing_page__timer__select");
const customDifficultySection = document.getElementById("landing_page__dropdown__custom");
const customDifficultyNumbers = document.getElementsByClassName("landing_page__dropdown__custom__input");
const startButton = document.getElementById("landing_page__start__button");
const landingPage = document.getElementById("landing_page");
const transitionPage = document.getElementById("transition_page");
const gamePage = document.getElementById("game_page");
const gameGrid = document.getElementById("game_page__grid");
const endPageRestart = document.getElementById("end_page__restart");


difficultyOption.addEventListener("change", () => {
  customDifficultySection.style.display = (difficultyOption.value === "custom") ? "grid" : "none";
})

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  landingToTransitionStyle();
})

endPageRestart.addEventListener("click", () => {
  location.reload();
})

const difficultyChecker = (value) => {
  let rows, cols, mines;
  if(value === "easy") {
    rows = 8;
    cols = 8;
    mines = 8;
  } else if(value === "medium") {
    rows = 18;
    cols = 18;
    mines = 40;
  } else if(value === "hard") {
    rows = 24;
    cols = 24;
    mines = 99;
  } else if(value === "custom") {
    rows = customDifficultyNumbers[0].value;
    cols = customDifficultyNumbers[1].value;
    mines = customDifficultyNumbers[2].value;
  }
  return [rows,cols,mines];
}

const transitionToGameStyle = (rows,cols,mines) => {
  gameGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${rows},1fr)`;
  transitionPage.style.display = "none";
  gamePage.style.display = "grid";
  const userTimer = (useTimer.value === "timed");
  new Game(rows, cols, mines, userTimer);
}

const landingToTransitionStyle = async () => {
  const [rows, cols, mines] = difficultyChecker(difficultyOption.value);
  if(mines > (rows * cols)) {
    alert("You cannot have more mines than squares avaiable.")
  } else {
    landingPage.style.display="none";
    transitionPage.style.display="grid";
    await setTimeout(transitionToGameStyle,2000,rows,cols,mines);
  }
}