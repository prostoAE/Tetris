import Game from './src/js/game.js';
import View from "./src/js/view.js";

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 480, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37: // left arrow
      game.movePieceLeft();
      view.renderMainScreen(game.getState());
      break;
    case 38: // up aarow
      game.rotatePiece();
      view.renderMainScreen(game.getState());
      break;
    case 39: // right arrow
      game.movePieceRight();
      view.renderMainScreen(game.getState());
      break;
    case 40: // down arrow
      game.movePieceDown();
      view.renderMainScreen(game.getState());
      break;
  }
});
