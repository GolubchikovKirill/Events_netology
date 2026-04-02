import GameBoard from './GameBoard';

test('GameBoard should draw exactly grid size * grid size cells', () => {
  document.body.innerHTML = '<div id="game-container"></div>';
  const container = document.getElementById('game-container');
  const board = new GameBoard(container);
  
  board.drawBoard(4);
  
  expect(board.getCells().length).toBe(16);
});
