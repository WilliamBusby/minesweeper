
import Mines from "./Javascript/Mines.mjs";
import Game from "./Javascript/Game.mjs";
import Squares from "./Javascript/Board.mjs";

const difficultyOption = document.getElementById("landing_page__difficulty__select");
const useTimer = document.getElementById("landing_page__timer__select");
const customDifficultySection = document.getElementById("landing_page__dropdown__custom");
const customDifficultyNumbers = document.getElementsByClassName("landing_page__dropdown__custom__input");
const startButton = document.getElementById("landing_page__start__button");
const landingPage = document.getElementById("landing_page");
const gamePage = document.getElementById("game_page");
const endPage = document.getElementById("end_page");
const gameGrid = document.getElementById("game_page__grid");

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
  const [rows, cols, mines] = difficultyChecker(difficultyOption.value);
  const userTimer = (useTimer.value === "Timer") ? true : false;
  const gameTest = new Game(rows, cols, mines, userTimer);
  landingToGameStyle(cols,rows);
})

const difficultyChecker = (value) => {
  let rows, cols, mines;
  if(value === "easy") {
    rows = 6;
    cols = 6;
    mines = 6;
  } else if(value === "medium") {
    rows = 12;
    cols = 12;
    mines = 25;
  } else if(value === "hard") {
    rows = 24;
    cols = 24;
    mines = 100;
  } else if(value === "custom") {
    rows = customDifficultyNumbers[0].value;
    cols = customDifficultyNumbers[1].value;
    mines = customDifficultyNumbers[2].value;
  }
  return [rows,cols,mines];
}

const landingToGameStyle = (cols,rows) => {
  gameGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${rows},1fr)`;
  landingPage.style.display = "none";
  gamePage.style.display = "grid";
}