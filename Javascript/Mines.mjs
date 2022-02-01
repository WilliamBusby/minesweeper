
export default class Mines {
  constructor(xMax, yMax, numberOfMines) {
    this._mineLocations = this.generateMines(xMax,yMax,numberOfMines);
  }

  generateMines(xMax, yMax, numberOfMines) {
    const mines = new Set();
    while(mines.size < numberOfMines) {
      const xPos = Math.floor(Math.random() * xMax);
      const yPos = Math.floor(Math.random() * yMax);
      const coords = [xPos, yPos];
      mines.add(coords);
    }
    return [...mines];
  }

  get mineLocations() {
    return this._mineLocations;
  }
}