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
    this.blockWidth = this.width / collums;
    this.blockHeight = this.height / rows;
    this.element.appendChild(this.canvas);
  }

  _createClass(View, [{
    key: "render",
    value: function render(_ref) {
      var playfield = _ref.playfield;
      this.clearScreen();
      this.renderPlayfield(playfield);
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: "renderPlayfield",
    value: function renderPlayfield(playfield) {
      for (var y = 0; y < playfield.length; y++) {
        var line = playfield[y];

        for (var x = 0; x < line.length; x++) {
          var block = line[x];

          if (block) {
            this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
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