import GameBoard from './GameBoard';
import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  const board = new GameBoard(container);
  board.drawBoard(4);

  const game = new Game(board);
  game.start();
});
