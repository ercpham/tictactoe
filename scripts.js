const gameBoard = (() => {
    let gameArray = ['X', null, 'X', 'O', 'X', 'O', null, null, null];
    const getArray = () => gameArray;
    const setArray = (array) => gameArray = array;
    const setPosition = (position, character) => gameArray[position] = character;
    return {getArray, setArray, setPosition};
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
        const entries = document.querySelectorAll(".board div");
        entries.forEach(entry => entry.parentNode.removeChild(entry));
    }

    const toggleCurrentCharacter = () => player === 'O' ? player = 'X' : player = 'O';

    function mark() {
        this.firstChild.textContent = player;
        gameBoard.setPosition(this.id, player);
    }
    return {populateBoard, clearBoard, toggleCurrentCharacter};
})();

const player = () => {
    return {};
}

displayController.populateBoard(gameBoard.getArray());

gameBoard.setArray([null, null, 'X', 'O', 'X', 'O', null, null, null]);

displayController.clearBoard();

gameBoard.setPosition(1, 'X');

displayController.populateBoard(gameBoard.getArray());
