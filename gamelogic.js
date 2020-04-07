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
//  4.1 after each player's turn, check if any grid is complete
//      4.1.1 each tile has a grid reference. if grid a.length 
//  4.2 if there's 3 in a row, display winner
//  4.3 else swap turns to next player

// 5. winner display
//  5.1 add score to winning player
//  5.2 resets board to empty

// 1
const tiles = document.querySelectorAll(".tile")
var playerNumber = 1;

const handleTile = (event) => {
    if (playerNumber == null) {
        console.log("Game over");
        return;
    }
    
    var player1Tiles = document.querySelectorAll(".player1").length
    var player2Tiles = document.querySelectorAll(".player2").length
    if (player1Tiles + player2Tiles === tiles.length) {
        console.log("Board filled. Hit Reset")
        return;
    }

    if (event.target.classList.contains("player1") || event.target.classList.contains("player2")) {
        console.log("Tile has already been occupied")
    } else if (playerNumber === 1) {
        event.target.classList.add("player1")
        playerNumber = 2;
        checkWin();
    } else if (playerNumber === 2) {
        event.target.classList.add("player2")
        playerNumber = 1;
        checkWin();
    }
}

tiles.forEach( (tile) => {
    tile.addEventListener("click", handleTile)
});

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
    allGrids.forEach((grid) => { 
        gridScore = calculateGridScore(grid);
        if (gridScore === 3) {
            console.log("Player 1 wins");
            playerNumber = null;
        } else if (gridScore === -3) {
            console.log("Player 2 wins");
            playerNumber = null;
        }
    })
}