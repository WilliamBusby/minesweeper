export default class Squares {
  constructor(xPos, yPos) {
    this._coords = [xPos, yPos],
    this._hasMine = false,
    this._numberOfMinesSurrounding = 0,
    this._isFlagged = false,
    this._isShowing = false;
  }

  get coords() {
    return this._coords;
  }

  get hasMine() {
    return this._hasMine;
  }

  get numberOfMinesSurrounding() {
    return this._numberOfMinesSurrounding;
  }

  get isFlagged() {
    return this._isFlagged;
  }

  get isShowing() {
    return this._isShowing;
  }

  set hasMine(hasMine) {
    this._hasMine = hasMine;
  }

  set numberOfMinesSurrounding(numberOfMines) {
    this._numberOfMinesSurrounding = numberOfMines;
  }

  set isFlagged(isFlagged) {
    this._isFlagged = isFlagged;
  }

  set isShowing(isShowing) {
    this._isShowing = isShowing;
  }

}