const gameboard = document.getElementById("game_page__grid");
const flagsRemaining = document.getElementById("game_page__flags_remaining");
const endPage = document.getElementById("end_page");
const gamePage = document.getElementById("game_page");
const winLoseText = document.getElementById("game_page__winLose");
const endPageFlagsLeft = document.getElementById("end_page__flags_remaining");
const gamePageTimer = document.getElementById("game_page__timer");
const endPageTimer = document.getElementById("end_page__timer");

import Mines from "./Mines.mjs";
import Board from "./Board.mjs";

export default class Game {
  constructor(rows, columns, numberOfMines, useTimer) {
    this._gameboard = new Board(rows, columns).generatedGameboard;
    this._mines = new Mines(rows,columns,numberOfMines).mineLocations;
    this.checkMines(this._gameboard,this._mines);
    this._flagsLeft = flagsRemaining.innerHTML = numberOfMines;
    this.addClickListeners(gameboard,this._gameboard,rows,columns);
    this._timer = setInterval(this.addToTimer, 1000, useTimer);
    this._squaresWithoutMines = (rows * columns) - numberOfMines + 1;
    this._isGameOver = false;
    this._totalSeconds = 0;
  }

  addClickListeners(gameboard,generatedGameboard,rows,cols) {
    // Middle and right click
    gameboard.addEventListener("mouseup", (event) => {
      event.preventDefault();
      let [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(!this._isGameOver) {
        if(event.button === 1) {
          this.middleClickEvent(generatedGameboard, clickedSquare, rows, cols);
        } else if(event.button === 2) {
          this.rightClickEvent(generatedGameboard, clickedSquare, click);
        }
      }
    })
    // Removes the context menu so it doesn't interfere with the game
    gameboard.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    })
    // Left click
    gameboard.addEventListener("click", (event) => {
      let [clickedSquare, click] = this.checkSquareClickedInfo(event.target,generatedGameboard);
      if(!this._isGameOver) this.leftClickEvent(generatedGameboard, clickedSquare, rows, cols, click);
    })
  }

  middleClickEvent(generatedGameboard, clickedSquare, rows, cols) {
    let flagsAround = this.calculateClickSurrounding(generatedGameboard,clickedSquare,rows,cols,"flags")
    if(clickedSquare.isShowing && clickedSquare.numberOfMinesSurrounding === flagsAround) {
      this.calculateClickSurrounding(generatedGameboard,clickedSquare,rows,cols,"click");
    }
  }

  leftClickEvent(generatedGameboard, clickedSquare, rows, columns, click) {
    if(!clickedSquare.isFlagged && !clickedSquare.isShowing) {
      click.style.backgroundColor = "#3D3B3C";
      click.style.fontSize = `${click.offsetWidth/1.75}px`;
      clickedSquare.numberOfMinesSurrounding = this.calculateClickSurrounding(generatedGameboard, clickedSquare, rows, columns, "mines");
      if(clickedSquare.hasMine) {
        this.gameLose(click);
      } else if(clickedSquare.numberOfMinesSurrounding === 0) {
        this.calculateClickSurrounding(generatedGameboard, clickedSquare, rows, columns, "click");
        this._squaresWithoutMines--;
      } else {
        click.innerHTML = clickedSquare.numberOfMinesSurrounding;
        this._squaresWithoutMines--;
      }
      clickedSquare.isShowing = true;
      if(this._squaresWithoutMines === 0) this.gameWin();
    }
  }

  rightClickEvent(generatedGameboard, clickedSquare, click) {
    if(this._flagsLeft > 0 && !clickedSquare.isFlagged && !clickedSquare.isShowing) {
      this.placeFlagOnSquare(generatedGameboard, clickedSquare, click)
    } else if(clickedSquare.isFlagged) {
      this.removeFlagFromSquare(click, clickedSquare);
    } else if(clickedSquare.isShowing) {
      alert("You can't flag a square that is already showing!")
    } else {
      alert("You've run out of flags to place!");
    }
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
    } else if(clickedSquare.nodeName == "svg") {
      clickedValue = this.getObjectFromGameboard(generatedGameboard, clickedSquare.parentElement.id);
      click = clickedSquare.parentElement;
    } else if(clickedSquare.nodeName == "path") {
      clickedValue = this.getObjectFromGameboard(generatedGameboard, clickedSquare.parentElement.parentElement.id);
      click = clickedSquare.parentElement.parentElement;
    } 
    return [clickedValue, click];
  }

  calculateClickSurrounding(generatedGameboard, targetSquare, xMax, yMax, inputType) {
    let outputValue = 0;
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
      if(!checkBounds) {
        if(inputType === "flags") {
          if(generatedGameboard[surroundingX][surroundingY].isFlagged) outputValue++;
        } else if(inputType=== "mines") {
          if(generatedGameboard[surroundingX][surroundingY].hasMine) outputValue++;
        } else if(inputType === "click") {
          document.getElementById(`${surroundingX}_${surroundingY}`).click();
        }
      }
    }
    return outputValue;
  }

  checkGameWin(generatedGameboard) {
    let gameWin = true;
    for(let i = 0; i< this._mines.length; i++) {
      const xMineLocation = this._mines[i][0];
      const yMineLocation = this._mines[i][1];
      const gameboardMineObject = generatedGameboard[xMineLocation][yMineLocation];

      if(!gameboardMineObject.isFlagged) gameWin = false;
    }
    return gameWin;
  }

  changeTimer(useTimer, total) {
    let minutes = Math.floor(total/60).toString();
    let seconds = (total%60).toString();
    let output = "";
    if(minutes.length < 2) minutes = "0" + minutes;
    if(seconds.length < 2) seconds = "0" + seconds;
    if(useTimer) {
      output = `${minutes}:${seconds}`;
    } else {
      output = "--:--";
    }
    return output;
  }

  addToTimer = async (useTimer) => {
    ++this._totalSeconds;
    gamePageTimer.innerHTML = this.changeTimer(useTimer, this._totalSeconds);
  }

  gameToEndStyle() {
    gamePage.style.display = "none";
    endPage.style.display = "grid";
    endPageTimer.innerHTML = gamePageTimer.innerHTML;
  }

  gameWin() {
    winLoseText.innerHTML = "You win!";
    endPageFlagsLeft.innerHTML = this._flagsLeft;
    this._isGameOver = true;
    setTimeout(this.gameToEndStyle,3000);
    clearInterval(this._timer);
  }

  gameLose(click) {
    click.innerHTML = `<i class="fas fa-bomb"></i>`;
    winLoseText.innerHTML = "You lose!";
    endPageFlagsLeft.innerHTML = this._flagsLeft;
    this._isGameOver = true;
    setTimeout(this.gameToEndStyle,3000);
    clearInterval(this._timer);
  }

  placeFlagOnSquare(generatedGameboard, clickedSquare, click) {
    click.innerHTML = `<i class="fas fa-flag"></i>`;
    click.style.fontSize = `${click.offsetWidth/1.75}px`;
    this._flagsLeft--;
    flagsRemaining.innerHTML = this._flagsLeft;
    clickedSquare.isFlagged = true;
    if(this.checkGameWin(generatedGameboard)) this.gameWin();
  }

  removeFlagFromSquare(click, clickedSquare) {
    click.innerHTML = "";
    this._flagsLeft++;
    flagsRemaining.innerHTML = this._flagsLeft;
    clickedSquare.isFlagged = false;
  }
}