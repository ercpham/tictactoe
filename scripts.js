const gameBoard = (() => {
    let gameArray = [null, null, null, null, null, null, null, null, null];
    const getArray = () => gameArray;
    const setArray = (array) => gameArray = array;
    const setPosition = (position, character) => gameArray[position] = character;
    const checkWin = (position) => {
        const player = gameArray[parseInt(position)];
        // Check column
        for (let i = position % 3; i < gameArray.length; i += 3) {
            if (player !== gameArray[i])
                break;
            if (i + 3 >= gameArray.length){
                displayController.win(player);
                return;
            }
        }

        for (let i = position - (position % 3); i < position - (position % 3) + 3; i++) {
            if (player !== gameArray[i])
                break;
            if (i % 3 === 2){
                displayController.win(player);
                return;
            }
        }
        
        if (position % 2 == 0) {
            for (let i = 0; i < gameArray.length; i+=4) {
                
                if (player !== gameArray[i])
                    break;
                if (i + 1 == gameArray.length){
                    displayController.win(player);
                    return;
                }
            }

            for (let i = 2; i <= 6; i += 2){
                if (player !== gameArray[i])
                    break;
                if (i == 6){
                    displayController.win(player);
                    return;
                }
            }

        }
        
    }
    return {getArray, setArray, setPosition, checkWin};
})();

const displayController = (() => {
    let player = 'O';

    const populateBoard = array => {
        const board = document.querySelector(".board");
        array.forEach((item, index) => {
            const div = document.createElement("div");
            div.id=index;
            div.addEventListener("click", mark);
            const p = document.createElement("p");
            if (item != null)
                p.textContent = item;
            div.appendChild(p);
            board.appendChild(div);
        });
    }

    const clearBoard = () => {
        const entries = document.querySelectorAll(".board div p");
        entries.forEach(entry => entry.textContent = "");
        for (let i = 0; i < gameBoard.getArray().length; i++) {
            gameBoard.setPosition(i, null);
        };
    }

    const toggleCurrentCharacter = () => player === 'O' ? player = 'X' : player = 'O';

    const win = (player) => {
        document.getElementById("winMessage").textContent = `${player} wins!`
    }

    function mark() {
        this.firstChild.textContent = player;
        gameBoard.setPosition(this.id, player);
        gameBoard.checkWin(this.id);
    }
    return {populateBoard, clearBoard, toggleCurrentCharacter, win};
})();

const player = () => {
    return {};
}

displayController.populateBoard(gameBoard.getArray());
