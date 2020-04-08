console.log("Script loaded!")

// 1. create a 3x3 grid
//  1.1 each box in the grid needs to be responsive. addEventListener? // DONE
//  1.2 each box needs to be uniquely identified. ID instead of class?

// 2. OPTIONAL UPGRADE. Allow player to choose their avatar. blue / red
//  2.1 player 1 selects avatar, player 2 gets assigned remainder

// 3. when player 1 selects a box, run a check
//  3.1 if the box has already been marked, ask to select again // DONE
//  3.2 else if the box hasn't been previously marked, mark it with player 1's icon // DONE

// 4. check game logic
//  4.1 after each player's turn, check if any grid is complete // DONE
//      4.1.1 this could be done via a positive / negative counter, where player 1's boxes add a positive value, and player 2's returns a negative.
//  4.2 if there's 3 in a row, display winner // DONE
//      4.2.1 If 3 of player1's are in line, the value should be +3, or -3 if player2's are in line
//      4.2.2 Board should then be disabled to prevent any further input. // DONE
//  4.3 else swap turns to next player // DONE

// 5. winner display // DONE
//  5.1 add score to winning player
//  5.2 resets board to empty

// 1
const tiles = document.querySelectorAll(".tile");
const statusMessage = document.querySelector("#status-message");
const resetBtn = document.querySelector("#reset-btn");
const player1ScoreDisplay = document.querySelector("#player1-score-display");
const player2ScoreDisplay = document.querySelector("#player2-score-display");
var playerNumber = 1;
var player1Score = 0;
var player2Score = 0;

//grid checker
const grdA = document.querySelectorAll(".grd-a")
const grdB = document.querySelectorAll(".grd-b")
const grdC = document.querySelectorAll(".grd-c")
const grd1 = document.querySelectorAll(".grd-1")
const grd2 = document.querySelectorAll(".grd-2")
const grd3 = document.querySelectorAll(".grd-3")
const grdX = document.querySelectorAll(".grd-x")
const grdY = document.querySelectorAll(".grd-y")
const allGrids = [grdA, grdB, grdC, grd1, grd2, grd3, grdX, grdY]

const calculateGridScore = (grid) => {
    var gridScore = 0;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].classList.contains("player1")) {
            gridScore += 1;
        } else if (grid[i].classList.contains("player2")) {
            gridScore -= 1;
        }
    }
    return gridScore
}


//grid completion checker
const checkWin = () => {
    const clearLoser = (loser) => {
        tiles.forEach( (tile) => {
            tile.classList.remove(loser)
        })
    }

    allGrids.forEach((grid) => { 
        gridScore = calculateGridScore(grid);
        if (gridScore === 3) {
            console.log("Player 1 wins");
            statusMessage.textContent = "Red player wins! Click here to reset the board."
            setTimeout(clearLoser, 2000, "player2");
            player1Score += 1;
            player1ScoreDisplay.textContent = player1Score;
            playerNumber = null;
        } else if (gridScore === -3) {
            console.log("Player 2 wins");
            setTimeout(clearLoser, 2000, "player1");
            statusMessage.textContent = "Blue player wins! Click here to reset the board."
            player2Score += 1;
            player2ScoreDisplay.textContent = player2Score;
            playerNumber = null;
        }
    })
}

const handleTile = (event) => {
    if (playerNumber == null) {
        console.log("Game over");
        return;
    } // guard condition
    
    if (event.target.classList.contains("player1") || event.target.classList.contains("player2")) {
        statusMessage.textContent = "Tile has already been occupied. Choose another tile.";
    } else if (playerNumber === 1) {
        event.target.classList.add("player1");
        playerNumber = 2;
        statusMessage.textContent = "Blue player's turn";
        checkWin();
    } else if (playerNumber === 2) {
        event.target.classList.add("player2");
        playerNumber = 1;
        statusMessage.textContent = "Red player's turn";
        checkWin();
    }

    var player1Tiles = document.querySelectorAll(".player1").length
    var player2Tiles = document.querySelectorAll(".player2").length

    if (playerNumber != null && player1Tiles + player2Tiles === tiles.length) {
        statusMessage.textContent = "It's a draw. Click here to reset the board.";
        playerNumber = null;
    }
}

const handleReset = () => {
    if (playerNumber === null) {
        statusMessage.textContent = "One second. Board is being reset...";
        tiles.forEach( (tile) => {
            tile.classList.remove("player1");
            tile.classList.remove("player2");
        })
        const refreshStatus = () => {
            statusMessage.textContent = "Red player's turn";
        }
        setTimeout(refreshStatus, 1000)
    }
}

tiles.forEach( (tile) => {
    tile.addEventListener("click", handleTile)
});
resetBtn.addEventListener("click",handleReset)