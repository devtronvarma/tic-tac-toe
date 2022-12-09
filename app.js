let game = document.querySelector(".game");
let info = document.querySelector(".game-info");
let winnerInfo = document.querySelector(".winner-info");
let currentTurn = "";
let xPositions = [];
let oPositions = [];
let numMoves = 0;
const MAX_MOVES = 9;
let winner = `It's a tie.`;

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
            break;
        } else if (oWins) {
            winner = "O WINS!";
            break;
        }
    }
}


function handleClick(space) {

    // check for winner
    checkWinners();

    // check that we still have moves left and there's no winner yet
    if (numMoves < MAX_MOVES && winner === `It's a tie.`) {


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
    } else {
        winnerInfo.innerText = winner;
        return;
    }
    console.log(numMoves);
}

function init() {

    // set initial game info (X goes first)
    info.innerText = `It's X's turn.`;

    game.addEventListener("click", function (event) {
        handleClick(event.target);
    })

};

init();
