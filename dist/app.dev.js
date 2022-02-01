"use strict";

var _Mines = _interopRequireDefault(require("./Javascript/Mines.mjs"));

var _Game = _interopRequireDefault(require("./Javascript/Game.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var difficultyOption = document.getElementById("landing_page__difficulty__select");
var customDifficultyNumberInputs = document.getElementById("landing_page__dropdown__custom");
var gameboard = document.getElementById("game_page__grid");
difficultyOption.addEventListener("change", function (event) {
  event.preventDefault();

  if (difficultyOption.value === "custom") {
    customDifficultyNumberInputs.style.display = "grid";
  } else {
    customDifficultyNumberInputs.style.display = "none";
  }
});
var gameTest = new _Game["default"]("easy", 10, 10, 1, false); // class Game {
//   constructor(difficulty, rows, columns, numberOfMines, useTimer) {
//     this._difficulty = difficulty,
//     this._mines = numberOfMines,
//     this._useTimer = useTimer,
//     this._gameboard = this.generateGameboardSquares(rows, columns);
//     this.drawBoardOnScreen(rows, columns);
//     this.addClickListener();
//     this._mineLocations = this.generateMines(rows, columns, numberOfMines);
//   }
//   drawBoardOnScreen(rows,cols) {
//     for(let i = 0; i < cols; i++) {
//       for(let j = 0; j < rows; j++) {
//         gameboard.innerHTML += `\n<div class="game_page__grid__square" id="game_page_${String(i)}_${String(j)}">"${String(i)}_${String(j)}"</div>`
//       }
//     }
//   }
//   addClickListener() {
//     gameboard.addEventListener("click", (event) =>
//     event.target.style.backgroundColor = "red")
//   }
//   generateGameboardSquares(rows,cols) {
//     const gameboardArray = [];
//     for(let i = 0; i < cols; i++) {
//       gameboardArray.push([]);
//       for(let j = 0; j < rows; j++) {
//         gameboardArray[i].push(new Squares(i,j));
//       }
//     }
//     return gameboardArray;
//   }
//   generateMines(xMax, yMax, numberOfMines) {
//     const mines = new Set();
//     while(mines.size < numberOfMines) {
//       const xPos = Math.floor(Math.random() * xMax);
//       const yPos = Math.floor(Math.random() * yMax);
//       const coords = [xPos, yPos];
//       mines.add(coords);
//     }
//     return mines;
//   }
//   placeMines(mines, squares) {  
//     const 
//   }
// }
// class Squares {
//   constructor(xPos, yPos) {
//     this._coords = [xPos, yPos],
//     this._hasMine = false,
//     this._numberOfMinesSurrounding = 0,
//     this._isFlagged = false,
//     this._isShowing = false;
//   }
//   get coords() {
//     return this._coords;
//   }
//   get hasMine() {
//     return this._hasMine;
//   }
//   get numberOfMinesSurrounding() {
//     return this._numberOfMinesSurrounding;
//   }
//   get isFlagged() {
//     return this._isFlagged;
//   }
//   get isShowing() {
//     return this._isShowing;
//   }
//   set hasMine(hasMine) {
//     this._hasMine = hasMine;
//   }
//   set numberOfMinesSurrounding(numberOfMines) {
//     this._numberOfMinesSurrounding = numberOfMines;
//   }
//   set isFlagged(isFlagged) {
//     this._isFlagged = isFlagged;
//   }
//   set isShowing(isShowing) {
//     this._isShowing = isShowing;
//   }
// }
// const gameTest = new Game("easy", 10, 10, 1, false)