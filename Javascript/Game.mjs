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
    this.addLeftClickListener(gameboard,this._gameboard,rows,columns);
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

  addLeftClickListener(gameboard,generatedGameboard,rows,columns) {
    gameboard.addEventListener("click", (event) => {
      let clickedSquare, click;
      [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(!clickedSquare.isFlagged) {
        event.target.style.backgroundColor = "#3D3B3C";
        event.target.style.fontSize = `${event.target.offsetWidth/1.75}px`;

        clickedSquare.numberOfMinesSurrounding = this.calculateMinesSurrounding(generatedGameboard, clickedSquare, rows, columns)
        if(clickedSquare.hasMine) {
          event.target.innerHTML = `<i class="fas fa-bomb"></i>`;
          clickedSquare.isShowing = true;
        } else if(clickedSquare.numberOfMinesSurrounding === 0) {
          event.target.innerHTML = "";
          this.clickSurrounding(generatedGameboard, clickedSquare, rows, columns);
          clickedSquare.isShowing = true;
        } else {
          event.target.innerHTML = clickedSquare.numberOfMinesSurrounding;
          clickedSquare.isShowing = true;
        }
      }
    })
  }

  addMiddleClickListener(gameboard,generatedGameboard) {
    gameboard.addEventListener("auxclick", (event) => {
      event.preventDefault();
      let clickedSquare,click;
      [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(event.button === 1) {
        alert("middle");
      }
    })
  }

  addRightClickListener(gameboard,generatedGameboard) {
    gameboard.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      let clickedSquare, click;
      [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(this._minesLeft > 0 && !clickedSquare.isFlagged && !clickedSquare.isShowing) {
        click.innerHTML = `<i class="fas fa-flag"></i>`;
        click.style.fontSize = `${event.target.offsetWidth/1.75}px`;
        this._minesLeft--;
        flagsRemaining.innerHTML = this._minesLeft;
        clickedSquare.isFlagged = true;
      } else if(clickedSquare.isFlagged && !clickedSquare.isShowing) {
        click.innerHTML = ``;
        this._minesLeft++;
        flagsRemaining.innerHTML = this._minesLeft;
        clickedSquare.isFlagged = false;
      } else if(clickedSquare.isShowing) {
        alert("You can't flag a square that is already showing!")
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

  calculateMinesSurrounding(generatedGameboard, targetSquare, xMax, yMax) {
    let numberOfMines = 0;
    const squareCoords = targetSquare.coords;
    const x = squareCoords[0];
    const y = squareCoords[1];
    const surroundingCoords = [
      [x,y+1],
      [x,y-1],
      [x+1,y],
      [x-1,y],
      [x-1,y-1],
      [x-1,y+1],
      [x+1,y-1],
      [x+1,y+1]
    ];

    for(let i = 0; i<surroundingCoords.length;i++) {
      const checkBounds = (surroundingCoords[i][0] < 0 || surroundingCoords[i][0] >= xMax || surroundingCoords[i][1] < 0 || surroundingCoords[i][1] >= yMax);
      if(!checkBounds) {
        if(generatedGameboard[surroundingCoords[i][0]][surroundingCoords[i][1]].hasMine) numberOfMines++;
      } 
    }
    return numberOfMines;
  }

  checkSquareClickedInfo(clickedSquare, generatedGameboard) {
    let clickedValue, click;
    if(clickedSquare.nodeName == "DIV") {
      clickedValue = this.getObjectFromGameboard(generatedGameboard, clickedSquare.id);
      click = clickedSquare;
    } else if(clickedSquare.nodeName == "path") {
      clickedValue = this.getObjectFromGameboard(generatedGameboard, clickedSquare.parentElement.parentElement.id);
      click = clickedSquare.parentElement.parentElement;
    } else if(clickedSquare.nodeName == "svg") {
      clickedValue = this.getObjectFromGameboard(generatedGameboard, clickedSquare.parentElement.id);
      click = clickedSquare.parentElement;
    }

    return [clickedValue, click]
  }

  clickSurrounding(generatedGameboard, targetSquare, xMax, yMax) {
    const squareCoords = targetSquare.coords;
    const x = squareCoords[0];
    const y = squareCoords[1];
    console.log(targetSquare);
    const surroundingCoords = [
      [x,y+1],
      [x,y-1],
      [x+1,y],
      [x-1,y],
      [x-1,y-1],
      [x-1,y+1],
      [x+1,y-1],
      [x+1,y+1]
    ];

    for(let i = 0; i<surroundingCoords.length;i++) {
      const checkBounds = (surroundingCoords[i][0] < 0 || surroundingCoords[i][0] >= xMax || surroundingCoords[i][1] < 0 || surroundingCoords[i][1] >= yMax);
      
      if(!checkBounds & !targetSquare.isShowing) {
        document.getElementById(`${surroundingCoords[i][0]}_${surroundingCoords[i][1]}`).click();
      } 
    }
  }

  gameEnd() {

  }

  checkGameWin() {

  }
}