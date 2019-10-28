let boxes = document.querySelectorAll('.box');
let boxesArray = Array.from(boxes);
let alertBox = document.querySelector('.alertBox');
let restartBtn = document.querySelector('.restartBtn button');

// Model
let tictactoe = {
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 1,
  status: 'playing',
  mark: ['X', 'O']
};

// Check
// → function to be called when user click on the box.
function check(e) {
  if (tictactoe.status !== 'playing') return;
  let box = e.target;
  let mark = tictactoe.mark[tictactoe.currentPlayer - 1];

  // If it's already chosen before.
  if (!box.className.includes('clicked')) {
    // Update the view.
    box.classList.add('clicked');
    box.textContent = mark;
    // Update the model
    updateModel(box);
  } else {
    return;
  }
}

// Update model
function updateModel(box) {
  let position = boxesArray.indexOf(box);
  tictactoe.board[position] = tictactoe.currentPlayer;

  // Check win
  if (checkWin()) {
    // If true. Change game status and view.
    tictactoe.status = 'finished';
    alertBox.classList.add('win');
    alertBox.textContent = `Player ${tictactoe.currentPlayer} won`;
  } else {
    // Switch player.
    tictactoe.currentPlayer = tictactoe.currentPlayer === 1 ? 2 : 1;
    alertBox.textContent = `Player ${tictactoe.currentPlayer}'s turn`;
  }
}

// Check win
function checkWin() {
  let { board, currentPlayer } = tictactoe;
  let [zero, one, two, three, four, five, six, seven, eight] = board;

  // 3 Rows
  // 3 Columns
  // 2 Diagonals
  return (
    (zero === currentPlayer && one === currentPlayer && two === currentPlayer) ||
    (three === currentPlayer && four === currentPlayer && five === currentPlayer) ||
    (six === currentPlayer && seven === currentPlayer && eight === currentPlayer) ||
    (zero === currentPlayer && three === currentPlayer && six === currentPlayer) ||
    (one === currentPlayer && four === currentPlayer && seven === currentPlayer) ||
    (two === currentPlayer && five === currentPlayer && eight === currentPlayer) ||
    (zero === currentPlayer && four === currentPlayer && eight === currentPlayer) ||
    (six === currentPlayer && four === currentPlayer && two === currentPlayer)
  );
}

function restart() {
  // Reset model
  tictactoe.board = tictactoe.board.map(() => '');
  tictactoe.currentPlayer = 1;
  tictactoe.status = 'playing';

  // Reset view
  // Alert box
  alertBox.textContent = `Player ${tictactoe.currentPlayer}'s turn`;
  alertBox.classList.remove('win');
  // Board boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = '';
    boxes[i].classList.remove('clicked');
  }
}

function init() {
  alertBox.textContent = `Player ${tictactoe.currentPlayer}'s turn`;
  boxes.forEach(box => {
    box.addEventListener('click', check);
  });

  restartBtn.addEventListener('click', restart);
}

init();
