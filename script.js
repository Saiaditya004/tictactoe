let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let winner = null;
let playerXScore = 0;
let playerOScore = 0;

function handleClick(index) {
  if (!gameOver && gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.body.style.backgroundColor = currentPlayer === 'X' ? '#ffe4e1' : '#e0ffff';
  }
}

function renderBoard() {
  const cells = document.querySelectorAll('.cell');
  gameBoard.forEach((value, index) => {
    cells[index].textContent = value;
    cells[index].classList.remove('X', 'O');
    if (value !== '') {
      cells[index].classList.add(value);
    }
  });
}

function showConfetti() {
  const message = document.getElementById('message');
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    message.appendChild(confetti);
    setTimeout(() => {
      message.removeChild(confetti);
    }, 2000);
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      winner = gameBoard[a];
      const message = document.getElementById('message');
      message.textContent = `Congratulations! Player ${winner} wins!`;
      showConfetti();
      updateScoreboard(winner);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameOver = true;
    const message = document.getElementById('message');
    message.textContent = "It's a draw!";
  }
}

function updateScoreboard(winner) {
  if (winner === 'X') {
    playerXScore++;
    document.getElementById('playerXScore').textContent = playerXScore;
  } else if (winner === 'O') {
    playerOScore++;
    document.getElementById('playerOScore').textContent = playerOScore;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  winner = null;
  renderBoard();
  document.body.style.backgroundColor = '#f5f5f5';
  document.getElementById('message').textContent = '';
}

function resetScoreboard() {
  playerXScore = 0;
  playerOScore = 0;
  document.getElementById('playerXScore').textContent = playerXScore;
  document.getElementById('playerOScore').textContent = playerOScore;
}
