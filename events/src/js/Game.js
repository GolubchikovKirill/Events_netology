export default class Game {
  constructor(board) {
    this.board = board;
    this.score = 0;
    this.misses = 0;
    this.activeCellIndex = null;
    this.intervalId = null;
    this.max_misses = 5;
    this.interval_ms = 1000;

    this.scoreBoardEl = document.createElement('div');
    this.scoreBoardEl.classList.add('score-board');
    this.updateScoreBoard();
    this.board.boardEl.parentNode.insertBefore(this.scoreBoardEl, this.board.boardEl);

    this.onCellClick = this.onCellClick.bind(this);
    this.board.boardEl.addEventListener('click', this.onCellClick);
  }

  start() {
    // move immediately at start, then interval
    this.moveGoblin();
    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, this.interval_ms);
  }

  moveGoblin() {
    if (this.activeCellIndex !== null) {
      // The goblin was here and wasn't clicked -> miss
      this.misses++;
      this.updateScoreBoard();

      if (this.misses >= this.max_misses) {
        this.gameOver();
        return;
      }
    }

    const cells = this.board.getCells();
    if (this.activeCellIndex !== null) {
      cells[this.activeCellIndex].innerHTML = '';
      cells[this.activeCellIndex].classList.remove('goblin-cell');
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cells.length);
    } while (newIndex === this.activeCellIndex);

    this.activeCellIndex = newIndex;

    // Represent goblin as emoji
    cells[this.activeCellIndex].innerHTML = '👹';
    cells[this.activeCellIndex].classList.add('goblin-cell');
  }

  onCellClick(event) {
    const { target } = event;
    // Check if the clicked element is the goblin cell or its contents
    const isGoblin = target.classList.contains('goblin-cell')
                     || (target.closest && target.closest('.goblin-cell'));

    if (isGoblin) {
      this.score++;

      // Clear goblin so it doesn't count as miss on next tick
      const cells = this.board.getCells();
      cells[this.activeCellIndex].innerHTML = '';
      cells[this.activeCellIndex].classList.remove('goblin-cell');
      this.activeCellIndex = null;

      this.updateScoreBoard();
    }
  }

  updateScoreBoard() {
    this.scoreBoardEl.textContent = `Счет: ${this.score} | Промахи: ${this.misses}`;
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.board.boardEl.removeEventListener('click', this.onCellClick);

    const cells = this.board.getCells();
    if (this.activeCellIndex !== null) {
      cells[this.activeCellIndex].innerHTML = '';
      cells[this.activeCellIndex].classList.remove('goblin-cell');
    }

    alert(`Игра окончена! Ваш счет: ${this.score}`);
  }
}
