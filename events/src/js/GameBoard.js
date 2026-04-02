export default class GameBoard {
  constructor(container) {
    this.container = container;
    this.boardEl = null;
    this.cells = [];
  }

  drawBoard(size) {
    this.boardEl = document.createElement('div');
    this.boardEl.classList.add('board');

    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.boardEl.appendChild(cell);
      this.cells.push(cell);
    }

    this.container.appendChild(this.boardEl);
  }

  getCells() {
    return this.cells;
  }
}
