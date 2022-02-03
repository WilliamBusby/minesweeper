import Game from "./Javascript/Game.mjs";

const difficultyOption = document.getElementById("landing_page__difficulty__select");
const useTimer = document.getElementById("landing_page__timer__select");
const customDifficultySection = document.getElementById("landing_page__dropdown__custom");
const customDifficultyNumbers = document.getElementsByClassName("landing_page__dropdown__custom__input");
const startButton = document.getElementById("landing_page__start__button");
const landingPage = document.getElementById("landing_page");
const gamePage = document.getElementById("game_page");
const endPage = document.getElementById("end_page");
const gameGrid = document.getElementById("game_page__grid");
const endPageRestart = document.getElementById("end_page__restart");
const transitionPage = document.getElementById("transition_page");

difficultyOption.addEventListener("change", (event) => {
  event.preventDefault();
  if(difficultyOption.value === "custom") {
    customDifficultySection.style.display = "grid";
  } else {
    customDifficultySection.style.display = "none";
  }
})

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  landingToTransitionStyle();
})

endPageRestart.addEventListener("click", (event) => {
  event.preventDefault();
  endToLandingStyle();
})

const difficultyChecker = (value) => {
  let rows, cols, mines;
  if(value === "easy") {
    rows = 8;
    cols = 8;
    mines = 6;
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

const transitionToGameStyle = () => {
  const [rows, cols, mines] = difficultyChecker(difficultyOption.value);
  gameGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${rows},1fr)`;
  transitionPage.style.display = "none";
  gamePage.style.display = "grid";
  const userTimer = (useTimer.value === "Timer") ? true : false;
  const gameTest = new Game(rows, cols, mines, userTimer);
}

const endToLandingStyle = () => {
  landingPage.style.display = "grid";
  endPage.style.display = "none";
}

const landingToTransitionStyle = async () => {
  landingPage.style.display="none";
  transitionPage.style.display="grid";
  await setTimeout(transitionToGameStyle,2000);
}

