const gameBoard = (() => {
    let gameEnd = false;
    let gameArray = [null, null, null, null, null, null, null, null, null];
    const getArray = () => gameArray;
    const setArray = (array) => gameArray = array;
    const setPosition = (position, player) => player != null ? gameArray[position] = player.getName(): gameArray[position] = null;
    const getGameEnd = () => gameEnd;
    const setGameEnd = (state) => gameEnd = state;
    const checkWin = (position, player) => {

        // Check Column
        for (let i = position % 3; i < gameArray.length; i += 3) {
            if (player.getName() !== gameArray[i])
                break;
            if (i + 3 >= gameArray.length){
                displayController.win(player);
                return;
            }
        }

        // Check Row
        for (let i = position - (position % 3); i < position - (position % 3) + 3; i++) {
            if (player.getName() !== gameArray[i])
                break;
            if (i % 3 === 2){
                displayController.win(player);
                return;
            }
        }
        
        if (position % 2 == 0) {

            // Check top-left to bottom-right diagonal
            for (let i = 0; i < gameArray.length; i+=4) {
                
                if (player.getName() !== gameArray[i])
                    break;
                if (i + 1 == gameArray.length){
                    displayController.win(player);
                    return;
                }
            }

            // Check top-right to bottom-left diagonal
            for (let i = 2; i <= 6; i += 2){
                if (player.getName() !== gameArray[i])
                    break;
                if (i == 6){
                    displayController.win(player);
                    return;
                }
            }
        }

        if (!gameArray.includes(null))
            displayController.win(null);
        
    }
    return {getArray, setArray, setPosition, checkWin, getGameEnd, setGameEnd};
})();

const displayController = (() => {
    let playerX;
    let playerO;
    let player;

    const setPlayers = (player1, player2) => {
        playerX = player1;
        playerO = player2;
        player = playerX;
        setToMove();
    }

    const populateBoard = array => {
        const board = document.querySelector(".board");
        array.forEach((item, index) => {
            const div = document.createElement("div");
            div.id=index;
            div.addEventListener("click", mark);
            div.addEventListener("mouseover", preview);
            div.addEventListener("mouseout", unview);
            const p = document.createElement("p");
            if (item != null)
                p.textContent = item;
            div.appendChild(p);
            board.appendChild(div);
        });
    }

    const clearBoard = () => {
        gameBoard.setGameEnd(false);
        const entries = document.querySelectorAll(".board div p");
        entries.forEach(entry => entry.textContent = "");
        for (let i = 0; i < gameBoard.getArray().length; i++) {
            gameBoard.setPosition(i, null);
        };
        document.getElementById("winMessage").textContent = "";
        document.getElementById("move").classList.remove("clearMessage");
        setToMove();
    }

    const toggleCurrentCharacter = () => player.getName() === 'O' ? player = playerX : player = playerO;

    const win = (player) => {
        gameBoard.setGameEnd(true);
        if (player !== null) {
            document.getElementById("winMessage").textContent = `${player.getName()} wins!`;
            player.incrementPoints();
            updateScoreBoard();
        }
        else {
            document.getElementById("winMessage").textContent = `Draw!`;
        }

        console.log("here");
        document.getElementById("move").textContent = "Clear board to restart game.";
        document.getElementById("move").classList.add("clearMessage");
    }

    const resetScores = () => {
        playerX.resetPoints();
        playerO.resetPoints();
        updateScoreBoard();
    }

    const updateScoreBoard = () => {
        document.getElementById("pXPoints").textContent = playerX.getPoints();
        document.getElementById("pOPoints").textContent = playerO.getPoints();
    }

    function setToMove() {
        document.getElementById("move").textContent = `${player.getName()} to move.`;
    }

    function mark() {
        if (!gameBoard.getGameEnd() && (this.firstChild.textContent == "" || this.firstChild.classList.contains("faded"))) {
            this.firstChild.textContent = player.getName();
            if (this.firstChild.classList.contains("faded"))
                this.firstChild.classList.remove("faded");
            gameBoard.setPosition(this.id, player);
            gameBoard.checkWin(this.id, player);
            displayController.toggleCurrentCharacter();
            if (!gameBoard.getGameEnd())
                setToMove();
        }
    }

    function preview() {
        if (this.firstChild.textContent === "" && !gameBoard.getGameEnd()) {
            this.firstChild.textContent = player.getName();
            this.firstChild.classList.add("faded");
        }
    }

    function unview() {
        if (this.firstChild.classList.contains("faded")) {
            this.firstChild.textContent = "";
            this.firstChild.classList.remove("faded");
        }
    }

    return {populateBoard, clearBoard, toggleCurrentCharacter, setPlayers, win, updateScoreBoard, resetScores};
})();

const player = (xo) => {
    const name = xo;
    let points = 0;
    const getName = () => name;
    const getPoints = () => points;
    const incrementPoints = () => points++;
    const resetPoints = () => points = 0;
    return {getName, getPoints, incrementPoints, resetPoints};
}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", displayController.clearBoard);
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", displayController.resetScores);

let playerX = player("X");
let playerO = player("O");

displayController.setPlayers(playerX, playerO);
displayController.populateBoard(gameBoard.getArray());
