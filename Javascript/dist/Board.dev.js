"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Squares =
/*#__PURE__*/
function () {
  function Squares(xPos, yPos) {
    _classCallCheck(this, Squares);

    this._coords = [xPos, yPos], this._hasMine = false, this._numberOfMinesSurrounding = 0, this._isFlagged = false, this._isShowing = false;
  }

  _createClass(Squares, [{
    key: "coords",
    get: function get() {
      return this._coords;
    }
  }, {
    key: "hasMine",
    get: function get() {
      return this._hasMine;
    },
    set: function set(hasMine) {
      this._hasMine = hasMine;
    }
  }, {
    key: "numberOfMinesSurrounding",
    get: function get() {
      return this._numberOfMinesSurrounding;
    },
    set: function set(numberOfMines) {
      this._numberOfMinesSurrounding = numberOfMines;
    }
  }, {
    key: "isFlagged",
    get: function get() {
      return this._isFlagged;
    },
    set: function set(isFlagged) {
      this._isFlagged = isFlagged;
    }
  }, {
    key: "isShowing",
    get: function get() {
      return this._isShowing;
    },
    set: function set(isShowing) {
      this._isShowing = isShowing;
    }
  }]);

  return Squares;
}();