const gameboard = document.getElementById("game_page__grid");
const flagsRemaining = document.getElementById("game_page__flags_remaining");
const endPage = document.getElementById("end_page");
const gamePage = document.getElementById("game_page");
const winLoseText = document.getElementById("game_page__winLose");
const endPageFlagsLeft = document.getElementById("end_page__flags_remaining");
const gamePageTimer = document.getElementById("game_page__timer");
const endPageTimer = document.getElementById("end_page__timer");
let totalSeconds = 0;

import Squares from "./Squares.mjs";
import Mines from "./Mines.mjs";

export default class Game {
  constructor(rows, columns, numberOfMines, useTimer) {
    this._mines = new Mines(rows,columns,numberOfMines).mineLocations;
    this._flagsLeft = numberOfMines;
    this._useTimer = useTimer,
    this._gameboard = this.generateGameboardSquares(rows, columns);
    this.drawBoardOnScreen(rows, columns);
    this.addLeftClickListener(gameboard,this._gameboard,rows,columns, this._useTimer);
    this.addRightClickListener(gameboard,this._gameboard, this._useTimer);
    this.addMiddleClickListener(gameboard,this._gameboard,rows,columns);
    this.checkMines(this._gameboard,this._mines);
    flagsRemaining.innerHTML = this._flagsLeft;
    this.timer = setInterval(this.addToTimer,1000, this._useTimer);
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

  addLeftClickListener(gameboard,generatedGameboard,rows,columns, useTimer) {
    gameboard.addEventListener("click", (event) => {
      let clickedSquare, click;
      [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(!clickedSquare.isFlagged) {
        event.target.style.backgroundColor = "#3D3B3C";
        event.target.style.fontSize = `${event.target.offsetWidth/1.75}px`;
        clickedSquare.numberOfMinesSurrounding = this.calculateClickSurrounding(generatedGameboard, clickedSquare, rows, columns, "mines")
        if(clickedSquare.hasMine) {
          event.target.innerHTML = `<i class="fas fa-bomb"></i>`;
          clickedSquare.isShowing = true;
          winLoseText.innerHTML = "You lose!";
          endPageFlagsLeft.innerHTML = this._flagsLeft;
          setTimeout(this.gameToEndStyle,3000, useTimer);
          clearInterval(this.timer);
        } else if(clickedSquare.numberOfMinesSurrounding === 0) {
          event.target.innerHTML = "";
          this.calculateClickSurrounding(generatedGameboard, clickedSquare, rows, columns, "click");
          clickedSquare.isShowing = true;
        } else {
          event.target.innerHTML = clickedSquare.numberOfMinesSurrounding;
          clickedSquare.isShowing = true;
        }
      }
    })
  }

  addMiddleClickListener(gameboard,generatedGameboard,rows,cols) {
    gameboard.addEventListener("auxclick", (event) => {
      event.preventDefault();
      let clickedSquare,click;
      [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(event.button === 1) {
        let flagsAround = this.calculateClickSurrounding(generatedGameboard,clickedSquare,rows,cols,"flags")
        if(clickedSquare.isShowing && clickedSquare.numberOfMinesSurrounding === flagsAround) {
          this.calculateClickSurrounding(generatedGameboard,clickedSquare,rows,cols,"middleClick");
        }
      }
    })
  }

  addRightClickListener = async (gameboard,generatedGameboard, useTimer) => {
    gameboard.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      let clickedSquare, click;
      [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(this._flagsLeft > 0 && !clickedSquare.isFlagged && !clickedSquare.isShowing) {
        click.innerHTML = `<i class="fas fa-flag"></i>`;
        click.style.fontSize = `${event.target.offsetWidth/1.75}px`;
        this._flagsLeft--;
        flagsRemaining.innerHTML = this._flagsLeft;
        clickedSquare.isFlagged = true;
        let gameWin = this.checkGameWin(generatedGameboard);
        if(gameWin) {
          winLoseText.innerHTML = "You win!";
          endPageFlagsLeft.innerHTML = this._flagsLeft;
          setTimeout(this.gameToEndStyle,3000, useTimer);
          clearInterval(this.timer);
        }
      } else if(clickedSquare.isFlagged && !clickedSquare.isShowing) {
        click.innerHTML = ``;
        this._flagsLeft++;
        flagsRemaining.innerHTML = this._flagsLeft;
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


  calculateClickSurrounding(generatedGameboard, targetSquare, xMax, yMax, inputType) {
    let changedValue = 0;
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
      const surroundingX = surroundingCoords[i][0];
      const surroundingY = surroundingCoords[i][1];
      const checkBounds = (surroundingX < 0 || surroundingX >= xMax || surroundingY < 0 || surroundingY >= yMax);
      if(!checkBounds && inputType === "flags") {
        if(generatedGameboard[surroundingX][surroundingY].isFlagged) changedValue++;
      } else if(!checkBounds && inputType === "middleClick") {
        document.getElementById(`${surroundingCoords[i][0]}_${surroundingCoords[i][1]}`).click();
      } else if(!checkBounds && inputType=== "mines") {
        if(generatedGameboard[surroundingCoords[i][0]][surroundingCoords[i][1]].hasMine) changedValue++;
      } else if(!checkBounds && !targetSquare.isShowing && inputType === "click") {
        document.getElementById(`${surroundingCoords[i][0]}_${surroundingCoords[i][1]}`).click();
      }
    }

    return changedValue;
  }

  checkGameWin(generatedGameboard) {
    let gameWin = true;
    for(let i = 0; i< this._mines.length; i++) {
      const xMineLocation = this._mines[i][0];
      const yMineLocation = this._mines[i][1];
      const gameboardMineObject = generatedGameboard[xMineLocation][yMineLocation];

      if(!gameboardMineObject.isFlagged) {
        gameWin = false;
      }
    }
    return gameWin;
  }

  
  changeTimer(useTimer, total) {
    let minutes = Math.floor(total/60).toString();
    let seconds = (total%60).toString();
    let output = "";
    if(minutes.length < 2) {
      minutes = "0" + minutes;
    }
    if(seconds.length < 2) {
      seconds = "0" + seconds;
    }
    if(useTimer) {
      output = `${minutes}:${seconds}`;
    } else {
      output = "--:--";
    }
    return output;
  }

  gameToEndStyle = async (useTimer) => {
    gamePage.style.display = "none";
    endPage.style.display = "grid";
    gameboard.innerHTML = "";
    winLoseText.innerHTML = "";
    endPageTimer.innerHTML = this.changeTimer(useTimer, totalSeconds);
  }

  addToTimer = async (useTimer) => {
    ++totalSeconds;
    gamePageTimer.innerHTML = this.changeTimer(useTimer, totalSeconds);
  }
}