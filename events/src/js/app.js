import GameBoard from './GameBoard';
import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  const board = new GameBoard(container);
  const boardSize = 4;

  board.drawBoard(boardSize);

  const game = new Game(board);
  game.start();
});
