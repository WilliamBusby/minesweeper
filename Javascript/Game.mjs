const gameboard = document.getElementById("game_page__grid")

export default class Game {
  constructor(difficulty, rows, columns, numberOfMines, useTimer) {
    this._difficulty = difficulty,
    this._mines = numberOfMines,
    this._useTimer = useTimer,
    this._gameboard = this.generateGameboardSquares(rows, columns);
    this.drawBoardOnScreen(rows, columns);
    this.addClickListener();
  }

  drawBoardOnScreen(rows,cols) {
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        gameboard.innerHTML += `\n<div class="game_page__grid__square" id="game_page_${String(i)}_${String(j)}">"${String(i)}_${String(j)}"</div>`
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

  addClickListener() {
    gameboard.addEventListener("click", (event) =>
    event.target.style.backgroundColor = "red")
  }
}

class Squares {
  constructor(xPos, yPos) {
    this._coords = [xPos, yPos],
    this._hasMine = false,
    this._numberOfMinesSurrounding = 0,
    this._isFlagged = false,
    this._isShowing = false;
  }
}

const gameTest = new Game("easy", 10, 10, 1, false)

console.log(gameTest._gameboard[0][0])