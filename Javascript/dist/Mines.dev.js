"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mines =
/*#__PURE__*/
function () {
  function Mines(xMax, yMax, numberOfMines) {
    _classCallCheck(this, Mines);

    this._mineLocations = this.generateMines(xMax, yMax, numberOfMines);
  }

  _createClass(Mines, [{
    key: "generateMines",
    value: function generateMines(xMax, yMax, numberOfMines) {
      var mines = new Set();

      while (mines.size < numberOfMines) {
        var xPos = Math.floor(Math.random() * xMax);
        var yPos = Math.floor(Math.random() * yMax);
        var coords = [xPos, yPos];
        mines.add(coords);
      }

      return mines;
    }
  }, {
    key: "mineLocations",
    get: function get() {
      return this._mineLocations;
    }
  }]);

  return Mines;
}();