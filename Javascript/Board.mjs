const gameboard = document.getElementById("game_page__grid");

import Squares from "./Squares.mjs";

export default class Board { 
  constructor(rows, columns) {
    this.drawBoardOnScreen(rows, columns);
    this._generatedGameboard = this.generateGameboardSquares(rows, columns);
  }

  drawBoardOnScreen(rows,cols) {
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        gameboard.innerHTML += `\n<div class="game_page__grid__square" id="${String(j)}_${String(i)}"></div>`
      }
    }
  }

  generateGameboardSquares(rows,cols) {
    const gameboardArray = [];
    for(let i = 0; i < cols; i++) {
      gameboardArray.push([]);
      for(let j = 0; j < rows; j++) {
        gameboardArray[i].push(new Squares(i,j));
      }
    }
    return gameboardArray;
  }

  get generatedGameboard() {
    return this._generatedGameboard;
  }
}

