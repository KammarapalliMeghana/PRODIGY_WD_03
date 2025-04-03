const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

function renderBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        board.appendChild(cellElement);
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            running = false;
            statusText.innerText = `Player ${boardState[a]} Wins!`;
            return;
        }
    }

    if (!boardState.includes("")) {
        running = false;
        statusText.innerText = "It's a Draw!";
    }
}

function handleClick(event) {
    const index = parseInt(event.target.dataset.index);
    if (boardState[index] === "" && running) {
        boardState[index] = currentPlayer;
        renderBoard();
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (running) statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    boardState.fill("");
    currentPlayer = "X";
    running = true;
    statusText.innerText = "Player X's Turn";
    renderBoard();
}

board.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {
        handleClick(event);
    }
});

resetButton.addEventListener("click", resetGame);
renderBoard();
