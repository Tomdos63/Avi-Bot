const boardSize = 10;
const mineCount = 10;
let board = [];
let gameOver = false;

function createBoard() {
    board = [];
    gameOver = false;
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => handleClick(cell, i, j));
            board[i][j] = { element: cell, hasMine: false, revealed: false };
            gameBoard.appendChild(cell);
        }
    }

    placeMines();
}

function placeMines() {
    let placedMines = 0;
    while (placedMines < mineCount) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (!board[row][col].hasMine) {
            board[row][col].hasMine = true;
            placedMines++;
        }
    }
}

function handleClick(cell, row, col) {
    if (gameOver || board[row][col].revealed) return;

    board[row][col].revealed = true;

    if (board[row][col].hasMine) {
        cell.classList.add('mine');
        alert('Game Over! You clicked on a mine.');
        gameOver = true;
        revealBoard();
    } else {
        cell.classList.add('revealed');
        const mineCount = countMines(row, col);
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            revealSurroundingCells(row, col);
        }
    }
}

function countMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                if (board[newRow][newCol].hasMine) {
                    count++;
                }
            }
        }
    }
    return count;
}

function revealSurroundingCells(row, col) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                if (!board[newRow][newCol].revealed && !board[newRow][newCol].hasMine) {
                    handleClick(board[newRow][newCol].element, newRow, newCol);
                }
            }
        }
    }
}

function revealBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].hasMine) {
                board[i][j].element.classList.add('mine');
            }
        }
    }
}

document.getElementById('reset-button').addEventListener('click', createBoard);

// Start the game
createBoard();
