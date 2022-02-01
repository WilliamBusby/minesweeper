"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var gameboard = document.getElementById("game_page__grid");

var Game =
/*#__PURE__*/
function () {
  function Game(difficulty, rows, columns, numberOfMines, useTimer) {
    _classCallCheck(this, Game);

    this._difficulty = difficulty, this._mines = numberOfMines, this._useTimer = useTimer, this._gameboard = this.generateGameboardSquares(rows, columns);
    this.drawBoardOnScreen(rows, columns);
    this.addClickListener();
  }

  _createClass(Game, [{
    key: "drawBoardOnScreen",
    value: function drawBoardOnScreen(rows, cols) {
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          gameboard.innerHTML += "\n<div class=\"game_page__grid__square\" id=\"game_page_".concat(String(i), "_").concat(String(j), "\">\"").concat(String(i), "_").concat(String(j), "\"</div>");
        }
      }
    }
  }, {
    key: "generateGameboardSquares",
    value: function generateGameboardSquares(rows, cols) {
      var gameboardArray = [];

      for (var i = 0; i < cols; i++) {
        gameboardArray.push([]);

        for (var j = 0; j < rows; j++) {
          gameboardArray[i].push(new Squares(i, j));
        }
      }

      return gameboardArray;
    }
  }, {
    key: "addClickListener",
    value: function addClickListener() {
      gameboard.addEventListener("click", function (event) {
        return event.target.innerHTML = "red";
      });
    }
  }]);

  return Game;
}();

var Squares = function Squares(xPos, yPos) {
  _classCallCheck(this, Squares);

  this._coords = [xPos, yPos], this._hasMine = false, this._numberOfMinesSurrounding = 0, this._isFlagged = false, this._isShowing = false;
};

var gameTest = new Game("easy", 10, 10, 1, false);
console.log(gameTest._gameboard[0][0]);