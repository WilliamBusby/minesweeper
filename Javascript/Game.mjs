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
    this.addLeftClickListener(gameboard,this._gameboard);
    this.addRightClickListener(gameboard,this._gameboard);
    this.addMiddleClickListener(gameboard,this._gameboard);
    this.checkMines(this._gameboard,this._mines);
    flagsRemaining.innerHTML = this._minesLeft;
    this.getObjectFromGameboard(this._gameboard,"0_0");
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

  addLeftClickListener(gameboard,generatedGameboard) {
    gameboard.addEventListener("click", (event) => {
      const clickedSquare = this.getObjectFromGameboard(generatedGameboard, event.target.id);
      event.target.style.backgroundColor = "#3D3B3C";
      event.target.style.fontSize = `${event.target.offsetWidth/1.5}px`;
      if(clickedSquare.hasMine) {
        event.target.innerHTML = `<i class="fas fa-bomb"></i>`;
      } else {
        event.target.innerHTML = "";
      }
    })
  }

  addMiddleClickListener(gameboard,generatedGameboard) {
    gameboard.addEventListener("auxclick", (event) => {
      event.preventDefault();
      const clickedSquare = this.getObjectFromGameboard(generatedGameboard, event.target.id);
      switch(event.button) {
        case 1: 
          alert("middle")
          break;
        default:
          break;
      }
    })
  }

  addRightClickListener(gameboard,generatedGameboard) {
    gameboard.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      let clickedSquare, click;
      if(event.target.nodeName == "DIV") {
        clickedSquare = this.getObjectFromGameboard(generatedGameboard, event.target.id);
        click = event.target;
      } else if(event.target.nodeName == "path") {
        clickedSquare = this.getObjectFromGameboard(generatedGameboard, event.target.parentElement.parentElement.id);
        click = event.target.parentElement.parentElement;
      } else if(event.target.nodeName == "svg") {
        clickedSquare = this.getObjectFromGameboard(generatedGameboard, event.target.parentElement.id);
        click = event.target.parentElement;
      }

      if(this._minesLeft > 0 && !clickedSquare.isFlagged) {
        click.innerHTML = `<i class="fas fa-flag"></i>`;
        click.style.fontSize = `${event.target.offsetWidth/1.5}px`;
        this._minesLeft--;
        flagsRemaining.innerHTML = this._minesLeft;
        clickedSquare.isFlagged = true;
      } else if(clickedSquare.isFlagged) {
        click.innerHTML = ``;
        this._minesLeft++;
        flagsRemaining.innerHTML = this._minesLeft;
        clickedSquare.isFlagged = false;
      } else {
        alert("You've run out of flags to place!");
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

  getObjectFromGameboard(gameboard,targetId) {
    const coords = targetId.split("_");
    const numberCoords = coords.map(number => Number(number));
    return gameboard[numberCoords[0]][numberCoords[1]];
  }
}