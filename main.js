let gameBoard = [null, null, null, null, null, null, null, null, null];

let displayController = (() => {
    let gridContainer = document.querySelector('.grid-container');
    let statsContainer = document.querySelector('.stats-container');
    var turn = 0;

    function checkWin() {
        if (gameBoard === [null, null, null, null, null, null, null, null, null]) {
            return
        }
        if (
            gameBoard[0] === 'X' && gameBoard[1] === 'X' && gameBoard[2] === 'X' || 
            gameBoard[3] === 'X' && gameBoard[4] === 'X' && gameBoard[5] === 'X' || 
            gameBoard[6] === 'X' && gameBoard[7] === 'X' && gameBoard[8] === 'X' || 
            gameBoard[0] === 'X' && gameBoard[4] === 'X' && gameBoard[8] === 'X' || 
            gameBoard[2] === 'X' && gameBoard[4] === 'X' && gameBoard[6] === 'X'
            ) {
                crosses.wins++;
                console.log(crosses.wins);
        }
        if (
            gameBoard[0] === 'O' && gameBoard[1] === 'O' && gameBoard[2] === 'O' || 
            gameBoard[3] === 'O' && gameBoard[4] === 'O' && gameBoard[5] === 'O' || 
            gameBoard[6] === 'O' && gameBoard[7] === 'O' && gameBoard[8] === 'O' || 
            gameBoard[0] === 'O' && gameBoard[4] === 'O' && gameBoard[8] === 'O' || 
            gameBoard[2] === 'O' && gameBoard[4] === 'O' && gameBoard[6] === 'O'
            ) {
                noughts.wins++;
                console.log(noughts.wins);
        }
    }

    function wipeBoard () {
        gridContainer.innerHTML = '';
    }

    function wipeStats() {
        statsContainer.innerHTML = '';
    }

    function render () {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i]) {
                gridContainer.insertAdjacentHTML('beforeend', `<div class="grid-child" id=${i}>${gameBoard[i]}</div>`);
            } else {
                gridContainer.insertAdjacentHTML('beforeend', `<div class="grid-child" id=${i}></div>`);
            }
        }
        let children = document.querySelectorAll('.grid-child');
        children.forEach(child => child.addEventListener('click', updateSquare));
        statsContainer.insertAdjacentHTML('beforeend', `<div>${crosses.name}: ${crosses.wins} wins</div>`);
        statsContainer.insertAdjacentHTML('beforeend', `<div>${noughts.name}: ${noughts.wins} wins</div>`);
    }

    function updateSquare (e) {
        const marker = () => { 
            if (turn % 2 === 0) {
                return 'X'
                } else {
                    return 'O'
                }
        }
        if (e.target.innerHTML.length) {
             alert('Choose an empty square!');
        } else {
            gameBoard.splice(e.target.id, 1, marker());
        }
        turn++;
        updateTurnIndicator();
        wipeBoard();
        wipeStats();
        checkWin();
        render();
        
    }

    function updateTurnIndicator() {
        const p1 = document.querySelector('.p1');
        const p2 = document.querySelector('.p2');
        if (turn % 2 === 0) {
            p1.style.display = 'inline-block';
            p2.style.display = 'none';
        } else {
            p1.style.display = 'none';
            p2.style.display = 'inline-block';
        }
    }

    function reset () {
        gameBoard = [null, null, null, null, null, null, null, null, null];
        turn = 0;
        updateTurnIndicator();
        wipeBoard();
        wipeStats();
        render();
    }

    return { wipeBoard, render, updateSquare, reset }
})();

const PlayerFactory = (name) => {
    wins = 0;
    return { name, wins }
}

const noughts = PlayerFactory('Noughts');
const crosses = PlayerFactory('Crosses');

function addListeners () {
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', displayController.reset);
}

addListeners();
displayController.render();