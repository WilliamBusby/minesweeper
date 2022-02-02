
export default class Mines {
  constructor(xMax, yMax, numberOfMines) {
    this._mineLocations = this.generateMines(xMax,yMax,numberOfMines);
  }

  generateMines(xMax, yMax, numberOfMines) {
    let minesObject = {};
    while(Object.keys(minesObject).length < numberOfMines) {
      const xPos = Math.floor(Math.random() * xMax);
      const yPos = Math.floor(Math.random() * yMax);
      const coords = [xPos, yPos];
      minesObject[coords] = undefined;
    }
    const mines = Object.keys(minesObject); 
    const newMines = [];
    for(let i = 0; i < mines.length; i++) {
      const splitVal = mines[i].split(",");
      newMines.push([Number(splitVal[0]), Number(splitVal[1])]);
    }
    return newMines;
  }

  get mineLocations() {
    return this._mineLocations;
  }
}