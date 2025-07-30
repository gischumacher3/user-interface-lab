// Estado do jogo
let board = Array(9).fill(null);
let currentPlayer = 'X';
let vsBot = false;
let botLevel = 'easy';
let gameActive = true;
let score = { X: 0, O: 0 };

// DOM
const gameDiv = document.getElementById('game');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreboard = document.getElementById('scoreboard');

// Sons
const moveSound = new Audio('sounds/move.wav');
const winSound = new Audio('sounds/win.wav');
const loseSound = new Audio('sounds/lose.wav');
const drawSound = new Audio('sounds/draw.wav');
[moveSound, winSound, loseSound, drawSound].forEach(s => s.load());

// Game Setup
function startGame(mode = '1v1') {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;

  gameDiv.innerHTML = '';
  gameDiv.classList.remove('hidden');
  scoreboard.classList.remove('hidden');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    gameDiv.appendChild(cell);
  }
}

function startBotGame(level) {
  vsBot = true;
  botLevel = level;
  hideBotDifficulty();
  startGame('bot');
}

// UI Toggle
function showBotDifficulty() {
  document.getElementById('bot-difficulty').classList.remove('hidden');
  gameDiv.classList.add('hidden');
  scoreboard.classList.add('hidden');
}

function hideBotDifficulty() {
  document.getElementById('bot-difficulty').classList.add('hidden');
}

function toggleScore() {
  scoreboard.classList.toggle('hidden');
}

// Jogador Humano
function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer === 'X' ? 'red' : 'blue');
  moveSound.currentTime = 0;
  moveSound.play();

  if (checkWinner()) {
    score[currentPlayer]++;
    updateScore();
    if (vsBot && currentPlayer === 'X') winSound.play();
    if (vsBot && currentPlayer === 'O') loseSound.play();
    alert(`Vitória do ${currentPlayer}!`);
    startGame(vsBot ? 'bot' : '1v1');
    return;
  }

  if (board.every(cell => cell)) {
    drawSound.play();
    alert('Empate!');
    startGame(vsBot ? 'bot' : '1v1');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (vsBot && currentPlayer === 'O' && gameActive) {
    setTimeout(botMove, 400);
  }
}

// BOT CONTROL

function botMove() {
  let moveIndex;

  if (botLevel === 'easy') {
    moveIndex = getRandomMove();
  } else if (botLevel === 'medium') {
    moveIndex = getDefensiveMove() ?? getRandomMove();
  } else if (botLevel === 'hard') {
    moveIndex = getBestMove();
  }

  playBotAt(moveIndex);
}

function playBotAt(index) {
  if (index == null) return;

  const cell = gameDiv.children[index];
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('blue');
  moveSound.currentTime = 0;
  moveSound.play();

  if (checkWinner()) {
    score[currentPlayer]++;
    updateScore();
    loseSound.play();
    alert(`Vitória do ${currentPlayer}!`);
    startGame('bot');
    return;
  }

  if (board.every(cell => cell)) {
    drawSound.play();
    alert('Empate!');
    startGame('bot');
    return;
  }

  currentPlayer = 'X';
}

// BOT STRATEGIES

function getRandomMove() {
  const emptyIndices = board.map((v, i) => v ? null : i).filter(v => v !== null);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

function getDefensiveMove() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let combo of winCombos) {
    const [a,b,c] = combo;
    const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === 'X').length === 2 && values.includes(null)) {
      return combo[values.indexOf(null)];
    }
  }
  return null;
}

function getBestMove() {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(newBoard, depth, isMaximizing) {
  const winner = getWinner(newBoard);
  if (winner !== null) {
    if (winner === 'O') return 1;
    if (winner === 'X') return -1;
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = 'O';
        const score = minimax(newBoard, depth + 1, false);
        newBoard[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = 'X';
        const score = minimax(newBoard, depth + 1, true);
        newBoard[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// CHECKS

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function getWinner(b) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let combo of winCombos) {
    const [a,b,c] = combo;
    if (b[a] && b[a] === b[b] && b[a] === b[c]) return b[a];
  }
  if (b.every(cell => cell)) return 'draw';
  return null;
}

function updateScore() {
  scoreX.textContent = score.X;
  scoreO.textContent = score.O;
}
