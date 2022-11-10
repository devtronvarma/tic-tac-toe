let game = document.querySelector(".game");
let info = document.querySelector(".game-info");
let currentTurn = "";
let xPositions = [];
let oPositions = [];
let numMoves = 0;
const MAX_MOVES = 9;
let winner = "IT'S A TIE!";

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWinners() {
    for (let i in winningPositions) {
        let possibleSolution = winningPositions[i];
        let xWins = possibleSolution.every(spot => xPositions.includes(spot));
        let oWins = possibleSolution.every(spot => oPositions.includes(spot));

        if (xWins) {
            winner = "X WINS!";
            return true;
        } else if (oWins) {
            winner = "O WINS!";
            return true;
        }
    }
}

// TODO make sure no one has clicked the space yet (return boolean)
function checkIfClicked() {
    console.log('not clicked')
}

function handleClick (space) {

    // // kill game and call it a tie if no one has one and all the spaces have been filled
    // if (numMoves >=MAX_MOVES) {
    //     info.innerText = winner;
    //     return;
    // }

    const position = parseInt(space.id.substring(space.id.length - 1));

    // first, check to make sure there are no duplicate moves
    if (!xPositions.includes(position) && !oPositions.includes(position)) {
        // even moves are X's and odd moves are O's (x gets 0th move)
        if (numMoves % 2 === 0) {
            space.innerText = "X"
            currentTurn = "O"
            info.innerText = `It's ${currentTurn}'s turn.`
            xPositions.push(position)
        } else {
            space.innerText = "O"
            currentTurn = "X"
            info.innerText = `It's ${currentTurn}'s turn.`
            oPositions.push(position)
        }

        numMoves++;
    }


    // check if there's a winner and exit if there is
    if (checkWinners() || numMoves >=MAX_MOVES) {
        info.innerText = winner;
        return;
    }

    console.log(numMoves);
}

function init() {

    // set initial game info (X goes first)
    info.innerText = `It's X's turn.`;

    // listen for clicks on any div within the game
    game.addEventListener("click", function (event) {
            handleClick(event.target);
    })
}


init();
