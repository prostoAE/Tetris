"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);

    _defineProperty(this, "score", 0);

    _defineProperty(this, "lines", 0);

    _defineProperty(this, "level", 0);

    _defineProperty(this, "playfield", this.createPlayfield());

    _defineProperty(this, "activePiece", this.createPiece());

    _defineProperty(this, "nextPiece", this.createPiece());
  }

  _createClass(Game, [{
    key: "getState",
    value: function getState() {
      var playfield = this.createPlayfield();
      var _this$activePiece = this.activePiece,
          pieceY = _this$activePiece.y,
          pieceX = _this$activePiece.x,
          blocks = _this$activePiece.blocks;

      for (var y = 0; y < this.playfield.length; y++) {
        playfield[y] = [];

        for (var x = 0; x < this.playfield[y].length; x++) {
          playfield[y][x] = this.playfield[y][x];
        }
      }

      for (var _y = 0; _y < blocks.length; _y++) {
        for (var _x = 0; _x < blocks[_y].length; _x++) {
          if (blocks[_y][_x]) {
            playfield[pieceY + _y][pieceX + _x] = blocks[_y][_x];
          }
        }
      }

      return {
        playfield: playfield
      };
    }
  }, {
    key: "createPlayfield",
    value: function createPlayfield() {
      var playfield = [];

      for (var y = 0; y < 20; y++) {
        playfield[y] = [];

        for (var x = 0; x < 10; x++) {
          playfield[y][x] = 0;
        }
      }

      return playfield;
    }
  }, {
    key: "createPiece",
    value: function createPiece() {
      var index = Math.floor(Math.random() * 7);
      var type = 'IJLOSTZ'[index];
      var piece = {
        x: 0,
        y: 0
      };

      switch (type) {
        case 'I':
          piece.blocks = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
          break;

        case 'J':
          piece.blocks = [[0, 0, 0], [2, 2, 2], [0, 0, 2]];
          break;

        case 'L':
          piece.blocks = [[0, 0, 0], [3, 3, 3], [3, 0, 0]];
          break;

        case 'O':
          piece.blocks = [[0, 0, 0, 0], [0, 4, 4, 0], [0, 4, 4, 0], [0, 0, 0, 0]];
          break;

        case 'S':
          piece.blocks = [[0, 0, 0], [0, 5, 5], [5, 5, 0]];
          break;

        case 'T':
          piece.blocks = [[0, 0, 0], [6, 6, 6], [0, 6, 0]];
          break;

        case 'Z':
          piece.blocks = [[0, 0, 0], [7, 7, 0], [0, 7, 7]];
          break;

        default:
          throw new Error('Неизвестный тип фигуры');
      }

      piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
      piece.y = -1;
      return piece;
    }
  }, {
    key: "movePieceLeft",
    value: function movePieceLeft() {
      this.activePiece.x -= 1;

      if (this.hasCollision()) {
        this.activePiece.x += 1;
      }
    }
  }, {
    key: "movePieceRight",
    value: function movePieceRight() {
      this.activePiece.x += 1;

      if (this.hasCollision()) {
        this.activePiece.x -= 1;
      }
    }
  }, {
    key: "movePieceDown",
    value: function movePieceDown() {
      this.activePiece.y += 1;

      if (this.hasCollision()) {
        this.activePiece.y -= 1;
        this.lockPiece();
        this.updatePieces();
      }
    }
  }, {
    key: "rotatePiece",
    value: function rotatePiece() {
      this.rotateBlocks();

      if (this.hasCollision()) {
        this.rotateBlocks(false);
      }
    }
  }, {
    key: "rotateBlocks",
    value: function rotateBlocks() {
      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var blocks = this.activePiece.blocks;
      var length = blocks.length;
      var x = Math.floor(length / 2);
      var y = length - 1;

      for (var i = 0; i < x; i++) {
        for (var j = i; j < y - i; j++) {
          var temp = blocks[i][j];

          if (clockwise) {
            blocks[i][j] = blocks[y - j][i];
            blocks[y - j][i] = blocks[y - i][y - j];
            blocks[y - i][y - j] = blocks[j][y - i];
            blocks[j][y - i] = temp;
          } else {
            blocks[i][j] = blocks[j][y - i];
            blocks[j][y - i] = blocks[y - i][y - j];
            blocks[y - i][y - j] = blocks[y - j][i];
            blocks[y - j][i] = temp;
          }
        }
      }
    }
  }, {
    key: "hasCollision",
    value: function hasCollision() {
      var _this$activePiece2 = this.activePiece,
          pieceY = _this$activePiece2.y,
          pieceX = _this$activePiece2.x,
          blocks = _this$activePiece2.blocks;

      for (var y = 0; y < blocks.length; y++) {
        for (var x = 0; x < blocks[y].length; x++) {
          if (blocks[y][x] && (this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined || this.playfield[pieceY + y][pieceX + x])) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "lockPiece",
    value: function lockPiece() {
      var _this$activePiece3 = this.activePiece,
          pieceY = _this$activePiece3.y,
          pieceX = _this$activePiece3.x,
          blocks = _this$activePiece3.blocks;

      for (var y = 0; y < blocks.length; y++) {
        for (var x = 0; x < blocks[y].length; x++) {
          if (blocks[y][x]) {
            this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
          }
        }
      }
    }
  }, {
    key: "updatePieces",
    value: function updatePieces() {
      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();
    }
  }]);

  return Game;
}();

exports["default"] = Game;