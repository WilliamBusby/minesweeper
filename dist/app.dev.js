"use strict";

var _Game = _interopRequireDefault(require("./Javascript/Game.mjs"));

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
var endPageRestart = document.getElementById("end_page__restart");
var transitionPage = document.getElementById("transition_page");
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
  landingToTransitionStyle();
});
endPageRestart.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

var difficultyChecker = function difficultyChecker(value) {
  var rows, cols, mines;

  if (value === "easy") {
    rows = 8;
    cols = 8;
    mines = 6;
  } else if (value === "medium") {
    rows = 18;
    cols = 18;
    mines = 40;
  } else if (value === "hard") {
    rows = 24;
    cols = 24;
    mines = 99;
  } else if (value === "custom") {
    rows = customDifficultyNumbers[0].value;
    cols = customDifficultyNumbers[1].value;
    mines = customDifficultyNumbers[2].value;
  }

  return [rows, cols, mines];
};

var gameTest;

var transitionToGameStyle = function transitionToGameStyle() {
  var _difficultyChecker = difficultyChecker(difficultyOption.value),
      _difficultyChecker2 = _slicedToArray(_difficultyChecker, 3),
      rows = _difficultyChecker2[0],
      cols = _difficultyChecker2[1],
      mines = _difficultyChecker2[2];

  gameGrid.style.gridTemplateColumns = "repeat(".concat(cols, ",1fr)");
  gameGrid.style.gridTemplateRows = "repeat(".concat(rows, ",1fr)");
  transitionPage.style.display = "none";
  gamePage.style.display = "grid";
  var userTimer = useTimer.value === "Timer" ? true : false;
  gameTest = new _Game["default"](rows, cols, mines, userTimer);
  console.log(gameTest);
}; // const endToLandingStyle = () => {
//   landingPage.style.display = "grid";
//   endPage.style.display = "none";
//   gameTest = new Game(2,2,1,true);
//   console.log(gameTest);
// }


var landingToTransitionStyle = function landingToTransitionStyle() {
  return regeneratorRuntime.async(function landingToTransitionStyle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          landingPage.style.display = "none";
          transitionPage.style.display = "grid";
          _context.next = 4;
          return regeneratorRuntime.awrap(setTimeout(transitionToGameStyle, 2000));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};