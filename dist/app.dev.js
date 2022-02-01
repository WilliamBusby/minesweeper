"use strict";

var _Mines = _interopRequireDefault(require("./Javascript/Mines.mjs"));

var _Game = _interopRequireDefault(require("./Javascript/Game.mjs"));

var _Board = _interopRequireDefault(require("./Javascript/Board.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var difficultyOption = document.getElementById("landing_page__difficulty__select");
var customDifficultyNumberInputs = document.getElementById("landing_page__dropdown__custom");
var startButton = document.getElementById("landing_page__start__button");
var landingPage = document.getElementById("landing_page");
var gamePage = document.getElementById("game_page");
var endPage = document.getElementById("end_page");
difficultyOption.addEventListener("change", function (event) {
  event.preventDefault();

  if (difficultyOption.value === "custom") {
    customDifficultyNumberInputs.style.display = "grid";
  } else {
    customDifficultyNumberInputs.style.display = "none";
  }
});
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  var gameTest = new _Game["default"]("easy", 10, 10, 1, false);
  landingPage.style.display = "none";
  gamePage.style.display = "grid";
});