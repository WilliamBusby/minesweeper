
import Mines from "./Javascript/Mines.mjs";
import Game from "./Javascript/Game.mjs";
import Squares from "./Javascript/Board.mjs";

const difficultyOption = document.getElementById("landing_page__difficulty__select");
const useTimer = document.getElementById("landing_page__timer__select");
const customDifficultyNumberInputs = document.getElementById("landing_page__dropdown__custom");
const startButton = document.getElementById("landing_page__start__button");
const landingPage = document.getElementById("landing_page");
const gamePage = document.getElementById("game_page");
const endPage = document.getElementById("end_page");

difficultyOption.addEventListener("change", (event) => {
  event.preventDefault();
  if(difficultyOption.value === "custom") {
    customDifficultyNumberInputs.style.display = "grid";
  } else {
    customDifficultyNumberInputs.style.display = "none";
  }
})

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  const gameTest = new Game("easy", 10, 10, 1, false);
  landingPage.style.display = "none";
  gamePage.style.display = "grid";
})
