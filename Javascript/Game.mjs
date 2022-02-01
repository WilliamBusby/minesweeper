const gameboard = document.getElementById("game_page__grid");

import Squares from "./Board.mjs";
import Mines from "./Mines.mjs";

export default class Game {
  constructor(rows, columns, numberOfMines, useTimer) {
    this._mines = new Mines(rows,columns,numberOfMines).mineLocations;
    this._useTimer = useTimer,
    this._gameboard = this.generateGameboardSquares(rows, columns);
    this.drawBoardOnScreen(rows, columns);
    this.addClickListener(gameboard);
    this.checkMines(this._gameboard,this._mines);
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

  generateMines(xMax, yMax, numberOfMines) {
    const mines = new Set();
    while(mines.size < numberOfMines) {
      const xPos = Math.floor(Math.random() * xMax);
      const yPos = Math.floor(Math.random() * yMax);
      const coords = [xPos, yPos];
      mines.add(coords);
    }
    return mines;
  }

  addClickListener(gameboard) {
    gameboard.addEventListener("click", (event) => {
      const coords = event.target.id.split("_");
      const numberCoords = coords.map(number => Number(number));
      if(this._gameboard[numberCoords[0]][numberCoords[1]].hasMine) {
        event.target.innerHTML = `<i class="fas fa-bomb"></i>`;
        event.target.style.backgroundColor = "#3D3B3C";
        event.target.style.fontSize = `${event.target.offsetWidth/1.5}px`;
      } else {
        event.target.style.backgroundColor = "#3D3B3C";
      }
    })
  }

  checkMines(gameboard,mines) {
    for(let i = 0; i< mines.length; i++) {
      const xPos = mines[i][0];
      const yPos = mines[i][1];
      gameboard[xPos][yPos].hasMine = true;
    }
  }
}