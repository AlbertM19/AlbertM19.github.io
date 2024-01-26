const cells = document.querySelectorAll('.cell');
const gameContainer = document.querySelector('.game-container');
const statusText = document.querySelector('.status-text');
const restartBtn = document.querySelector('.restart-btn');
const introContainer = document.querySelector('.intro-container');
const startBtn = document.querySelector('.intro-btn');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');

class TicTacToe {
    // getting references
    constructor(startBtn, restartBtn, introContainer, gameContainer, previousBtn) {
        this.startBtn = startBtn
        this.restartBtn = restartBtn
        this.previousBtn = previousBtn
        this.introContainer = introContainer
        this.gameContainer = gameContainer
        this.gameOver = false;
        this.currentPlayer = 'X'
        this.winner = null;
        this.moveHistory = []

        // adding event handlers
        this.startBtn.addEventListener('click', () => {
            this.introContainer.classList.add('slide');
            this.introContainer.addEventListener('transitionend', () => {
                this.introContainer.remove();
            })
            this.gameContainer.classList.remove('blur');
            statusText.innerText = `${this.currentPlayer}'s turn`
            this.initializeGame();
        })

        this.restartBtn.addEventListener('click', () => {
            this.gameOver = false
            this.currentPlayer = 'X'
            this.winner = null
            this.moveHistory = []
            cells.forEach(cell => cell.innerText = '')
            statusText.innerText = `${this.currentPlayer}'s turn`
        })
        
        previousBtn.addEventListener('click', () => {
            this.previousMove()
        })
    }

    initializeGame() {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (!this.gameOver) {
                    if (cell.innerText === '') {
                        cell.innerText = this.currentPlayer
                        this.switchPlayer();
                        this.updateCell(cell, index);
                        this.checkWinner();
                    } else {
                        statusText.innerText = `Invalid move, try again`
                        setTimeout(() => statusText.innerText = '', 2000)
                    }
                }
            })
        })
    }

    switchPlayer() {
        if (!this.gameOver) {
            statusText.innerText = `${this.currentPlayer === 'X' ? 'O' : 'X'}'s turn`
        }
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    }

    checkWinner() {
        this.checkMark = '<i class="fa-solid fa-check checkmark"></i>';
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diagonal
        ]

        for (let i = 0; i < this.winningCombinations.length; i++) {
            const [a, b, c] = this.winningCombinations[i];
            if (cells[a].innerText === '' || cells[b].innerText === '' || cells[c].innerText === '') {
                continue;
            } else if (cells[a].innerText === cells[b].innerText && cells[b].innerText === cells[c].innerText) {
                this.winner = cells[a].innerText;
                this.gameOver = true;
                cells[a].innerHTML += this.checkMark;
                cells[b].innerHTML += this.checkMark;
                cells[c].innerHTML += this.checkMark;
                statusText.innerText = `${this.winner}'s win`
                break;
            }
        }
        if (!this.gameOver && Array.from(cells).every(cell => cell.innerText !== '')) {
            this.gameOver = true;
            statusText.innerText = `Draw!`;
        }
    }

    updateCell(cell, index) {
        cell[index] = this.currentPlayer === 'X' ? 'O' : 'X'
        cell.innerText = cell[index]
        this.moveHistory.push([cell.innerText, index])
        console.log(this.moveHistory)
    }

    previousMove() {
        this.moveHistory.pop()
        console.log(this.moveHistory)
    }
}

const Game = new TicTacToe(startBtn, restartBtn, introContainer, gameContainer, previousBtn)
