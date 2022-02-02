const gameboard = document.getElementById("game_page__grid");
const flagsRemaining = document.getElementById("game_page__flags_remaining");
import Squares from "./Board.mjs";
import Mines from "./Mines.mjs";

export default class Game {
  constructor(rows, columns, numberOfMines, useTimer) {
    this._mines = new Mines(rows,columns,numberOfMines).mineLocations;
    this._minesLeft = numberOfMines;
    this._useTimer = useTimer,
    this._gameboard = this.generateGameboardSquares(rows, columns);
    this.drawBoardOnScreen(rows, columns);
    this.addLeftClickListener(gameboard);
    this.addRightClickListener(gameboard);
    this.addMiddleClickListener(gameboard);
    this.checkMines(this._gameboard,this._mines);
    flagsRemaining.innerHTML = this._minesLeft;
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

  addLeftClickListener(gameboard) {
    gameboard.addEventListener("click", (event) => {
      const coords = event.target.id.split("_");
      const numberCoords = coords.map(number => Number(number));
      event.target.style.backgroundColor = "#3D3B3C";
      event.target.style.fontSize = `${event.target.offsetWidth/1.5}px`;
      if(this._gameboard[numberCoords[0]][numberCoords[1]].hasMine) {
        event.target.innerHTML = `<i class="fas fa-bomb"></i>`;
      } else {
        event.target.innerHTML = "";
      }
    })
  }

  addMiddleClickListener(gameboard) {
    gameboard.addEventListener("auxclick", (event) => {
      event.preventDefault();
      switch(event.button) {
        case 1: 
          alert("middle")
          break;
        default:
          alert("not middle")
      }
    })
  }

  addRightClickListener(gameboard) {
    gameboard.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if(this._minesLeft > 0) {
        event.target.innerHTML = `<i class="fas fa-flag"></i>`;
        event.target.style.fontSize = `${event.target.offsetWidth/1.5}px`;
        this._minesLeft--;
        flagsRemaining.innerHTML = this._minesLeft;
      } else {
        alert("You've run out of flags to place!");
      }

    })
  }

  checkMines(gameboard,mines) {
    console.log(mines);
    for(let i = 0; i< mines.length; i++) {
      const xPos = mines[i][0];
      const yPos = mines[i][1];
      gameboard[xPos][yPos].hasMine = true;
    }
  }
}