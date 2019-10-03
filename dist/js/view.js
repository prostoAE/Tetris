"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var View =
/*#__PURE__*/
function () {
  function View(element, width, height, rows, collums) {
    _classCallCheck(this, View);

    this.element = element;
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;
    this.blockWidth = this.playfieldInnerWidth / collums;
    this.blockHeight = this.playfieldInnerHeight / rows;
    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.height;
    this.element.appendChild(this.canvas);
  }

  _createClass(View, [{
    key: "renderMainScreen",
    value: function renderMainScreen(state) {
      this.clearScreen();
      this.renderPlayfield(state);
      this.renderPanel(state);
    }
  }, {
    key: "renderStartScreen",
    value: function renderStartScreen() {
      this.context.fillStyle = 'white';
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Press ENTER  to Start', this.width / 2, this.height / 2);
    }
  }, {
    key: "renderPauseScreen",
    value: function renderPauseScreen() {
      this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.fillStyle = 'white';
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Press ENTER  to Resume', this.width / 2, this.height / 2);
    }
  }, {
    key: "renderEndScreen",
    value: function renderEndScreen(_ref) {
      var score = _ref.score;
      this.clearScreen();
      this.context.fillStyle = 'white';
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
      this.context.fillText("Score: ".concat(score), this.width / 2, this.height / 2);
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: "renderPlayfield",
    value: function renderPlayfield(_ref2) {
      var playfield = _ref2.playfield;

      for (var y = 0; y < playfield.length; y++) {
        var line = playfield[y];

        for (var x = 0; x < line.length; x++) {
          var block = line[x];

          if (block) {
            this.renderBlock(this.playfieldX + x * this.blockWidth, this.playfieldY + y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
          }
        }
      }

      this.context.strokeStyle = 'white';
      this.context.lineWidth = this.playfieldBorderWidth;
      this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(_ref3) {
      var level = _ref3.level,
          score = _ref3.score,
          lines = _ref3.lines,
          nextPiece = _ref3.nextPiece;
      this.context.textAlign = 'start';
      this.context.textBaseline = 'top';
      this.context.fillStyle = 'white';
      this.context.font = '14px "Press Start 2P"';
      this.context.fillText("Score: ".concat(score), this.panelX, this.panelY + 0);
      this.context.fillText("Lines: ".concat(lines), this.panelX, this.panelY + 24);
      this.context.fillText("Level: ".concat(level), this.panelX, this.panelY + 48);
      this.context.fillText('Next:', this.panelX, this.panelY + 96);

      for (var y = 0; y < nextPiece.blocks.length; y++) {
        for (var x = 0; x < nextPiece.blocks[y].length; x++) {
          var block = nextPiece.blocks[y][x];

          if (block) {
            this.renderBlock(this.panelX + x * this.blockWidth * 0.5, this.panelY + 100 + y * this.blockHeight * 0.5, this.blockWidth * 0.5, this.blockHeight * 0.5, View.colors[block]);
          }
        }
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(x, y, width, height, color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = 'black';
      this.context.lineWidth = '2';
      this.context.fillRect(x, y, width, height, color);
      this.context.strokeRect(x, y, width, height, color);
    }
  }]);

  return View;
}();

exports["default"] = View;

_defineProperty(View, "colors", {
  '1': 'cyan',
  '2': 'blue',
  '3': 'orange',
  '4': 'yellow',
  '5': 'green',
  '6': 'purple',
  '7': 'red'
});