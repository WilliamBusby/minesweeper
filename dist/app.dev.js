"use strict";

var _Mines = _interopRequireDefault(require("./Javascript/Mines.mjs"));

var _Game = _interopRequireDefault(require("./Javascript/Game.mjs"));

var _Board = _interopRequireDefault(require("./Javascript/Board.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var difficultyOption = document.getElementById("landing_page__difficulty__select");
var useTimer = document.getElementById("landing_page__timer__select");
var customDifficultySection = document.getElementById("landing_page__dropdown__custom");
var customDifficultyNumbers = document.getElementsByClassName("landing_page__dropdown__custom__input");
var startButton = document.getElementById("landing_page__start__button");
var landingPage = document.getElementById("landing_page");
var gamePage = document.getElementById("game_page");
var endPage = document.getElementById("end_page");
var gameGrid = document.getElementById("game_page__grid");
difficultyOption.addEventListener("change", function (event) {
  event.preventDefault();

  if (difficultyOption.value === "custom") {
    customDifficultySection.style.display = "grid";
  } else {
    customDifficultySection.style.display = "none";
  }
});
startButton.addEventListener("click", function (event) {
  event.preventDefault();

  var _difficultyChecker = difficultyChecker(difficultyOption.value),
      _difficultyChecker2 = _slicedToArray(_difficultyChecker, 3),
      rows = _difficultyChecker2[0],
      cols = _difficultyChecker2[1],
      mines = _difficultyChecker2[2];

  var userTimer = useTimer.value === "Timer" ? true : false;
  var gameTest = new _Game["default"](rows, cols, mines, userTimer);
  landingToGameStyle(cols, rows);
});

var difficultyChecker = function difficultyChecker(value) {
  var rows, cols, mines;

  if (value === "easy") {
    rows = 6;
    cols = 6;
    mines = 6;
  } else if (value === "medium") {
    rows = 12;
    cols = 12;
    mines = 25;
  } else if (value === "hard") {
    rows = 24;
    cols = 24;
    mines = 100;
  } else if (value === "custom") {
    rows = customDifficultyNumbers[0].value;
    cols = customDifficultyNumbers[1].value;
    mines = customDifficultyNumbers[2].value;
  }

  return [rows, cols, mines];
};

var landingToGameStyle = function landingToGameStyle(cols, rows) {
  gameGrid.style.gridTemplateColumns = "repeat(".concat(cols, ",1fr)");
  gameGrid.style.gridTemplateRows = "repeat(".concat(rows, ",1fr)");
  landingPage.style.display = "none";
  gamePage.style.display = "grid";
};