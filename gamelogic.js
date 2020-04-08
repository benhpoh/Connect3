console.log("Script loaded!")

// 1. create a 3x3 grid // DONE
//  1.1 each box in the grid needs to be responsive. addEventListener? // DONE
//  1.2 each box needs to be uniquely identified. ID instead of class? // DONE

// 2. OPTIONAL UPGRADE. Allow player to choose their avatar. blue / red  // DECLINED
//  2.1 player 1 selects avatar, player 2 gets assigned remainder // DECLINED
//  2.2 Decided to alternate players by having the loser start the new game. // DONE
//      2.2.1 Unexpected side effect. In event of a draw, the loser continues to start. Outcome acceptable. // DONE

// 3. when player 1 selects a box, run a check // DONE
//  3.1 if the box has already been marked, ask to select again // DONE
//  3.2 else if the box hasn't been previously marked, mark it with player 1's icon // DONE

// 4. check game logic
//  4.1 after each player's turn, check if any grid is complete // DONE
//      4.1.1 this could be done via a positive / negative counter, where player 1's boxes add a positive value, and player 2's returns a negative. // DONE
//  4.2 if there's 3 in a row, display winner // DONE
//      4.2.1 If 3 of player1's are in line, the value should be +3, or -3 if player2's are in line // DONE
//      4.2.2 Board should then be disabled to prevent any further input. // DONE
//  4.3 else swap turns to next player // DONE

// 5. winner display // DONE
//  5.1 add score to winning player // DONE
//  5.2 resets board to empty // DONE

// 6. BONUS SECTION
//  6.1 Create bot to play against
//      6.1.1 Bot will assume player 2 position. If player 1 does x move, do Y move instead.
//      6.1.2 Create silly bot first. Use math.random to pick an unclaimed spot. // DONE
//      6.1.3 Create unbeatable bot.


const tiles = document.querySelectorAll(".tile");
const headerTiles = document.querySelectorAll(".header-tile");
const statusMessage = document.querySelector("#status-message");
const resetBox = document.querySelector("#reset-box");
const header = document.querySelector("h1");
const redPlayerScoreDisplay = document.querySelector("#redPlayer-score-display");
const bluePlayerScoreDisplay = document.querySelector("#bluePlayer-score-display");
const gameBoard = document.querySelector(".game-board");
var playerTurn = "red";
var lastWinner = null;
var redPlayerScore = 0;
var bluePlayerScore = 0;

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
        if (grid[i].classList.contains("red-player")) {
            gridScore += 1;
        } else if (grid[i].classList.contains("blue-player")) {
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
    const changeHeader = () => {
        if (lastWinner === "red") {
            headerTiles.forEach( (tile) => {
                tile.classList.add("red-winner");
                tile.classList.remove("blue-winner");
            })
        } else if (lastWinner === "blue") {
            headerTiles.forEach( (tile) => {
                tile.classList.add("blue-winner");
                tile.classList.remove("red-winner");
            })
        }
    }

    allGrids.forEach((grid) => { 
        gridScore = calculateGridScore(grid);
        if (gridScore === 3) {
            statusMessage.textContent = "Red player wins! Click here to reset the board."
            setTimeout(clearLoser, 1000, "blue-player");
            lastWinner = "red";
            playerTurn = null;
            redPlayerScore += 1;
            changeHeader();
        } else if (gridScore === -3) {
            setTimeout(clearLoser, 1000, "red-player");
            statusMessage.textContent = "Blue player wins! Click here to reset the board."
            lastWinner = "blue";
            playerTurn = null;
            bluePlayerScore += 1;
            changeHeader();
        }
        var totalScore = redPlayerScore + bluePlayerScore;
        var redPlayerWinrate = (redPlayerScore / totalScore * 100).toFixed(0);
        var bluePlayerWinrate = (bluePlayerScore / totalScore * 100).toFixed(0);

        if (totalScore > 0) {
            redPlayerScoreDisplay.textContent = `${redPlayerScore} (${redPlayerWinrate}% win rate)`;
            bluePlayerScoreDisplay.textContent = `${bluePlayerScore} (${bluePlayerWinrate}% win rate)`;
        }
    })
}
// --------------
// Bot functions
// --------------
const sillyBotTurn = () => {
    console.log("Silly bot choosing")
    var tileBotChose = tiles[Math.floor(Math.random()*tiles.length)]
    if (playerTurn === "blue") {
        while (tileBotChose.classList.contains("red-player") || tileBotChose.classList.contains("blue-player")) {
            tileBotChose = tiles[Math.floor(Math.random()*tiles.length)]
        }
        tileBotChose.classList.add("blue-player")
        playerTurn = "red";
        statusMessage.textContent = "Red player's turn";
        checkWin();
    } else {
        return "It's not my turn, human..."
    }
}
const superBotTurn = () => {
    if (document.querySelectorAll(".red-player").length === 0) {
        console.log("Bot making first move");
        tiles[0].classList.add("blue-player");
        playerTurn = "red";
        statusMessage.textContent = "Red player's turn";
        checkWin();
    } else if (!tiles[4].classList.contains("blue-player") && 
                !tiles[4].classList.contains("red-player") &&  
                (tiles[0].classList.contains("red-player") || 
                 tiles[2].classList.contains("red-player") || 
                 tiles[6].classList.contains("red-player") || 
                 tiles[8].classList.contains("red-player")) ) {
        // console.log("Bot picking middle tile")
        tiles[4].classList.add("blue-player");
        playerTurn = "red";
        statusMessage.textContent = "Red player's turn";
        checkWin();
    } else if (!tiles[0].classList.contains("red-player") && 
                !tiles[0].classList.contains("blue-player") && 
                !tiles[2].classList.contains("red-player") && 
                !tiles[6].classList.contains("red-player") && 
                !tiles[8].classList.contains("red-player")){
        // console.log("Bot picking NW tile")
        tiles[0].classList.add("blue-player");
        playerTurn = "red";
        statusMessage.textContent = "Red player's turn";
        checkWin();
    } else {
        allGrids.forEach( (grid) => {
            if (playerTurn !== "blue") {
                return;
            } // guard condition preventing further execution
            gridScore = calculateGridScore(grid);
            if (gridScore === -2) {
                // console.log("Bot completing");
                grid.forEach( (tile) => {
                    if (!tile.classList.contains("blue-player")) {
                        tile.classList.add("blue-player");
                        playerTurn = "red";
                        statusMessage.textContent = "Red player's turn";
                        checkWin();
                    }
                })
                return;
            } else if (gridScore === 2) {
                // console.log("Bot blocking");
                grid.forEach( (tile) => {
                    if (!tile.classList.contains("red-player")) {
                        tile.classList.add("blue-player");
                        playerTurn = "red";
                        statusMessage.textContent = "Red player's turn";
                        checkWin();
                    }
                })
                return;
            }
        })
        if (playerTurn !== "blue") {
            return;
        }
        sillyBotTurn();
    }
}

// ------------------------
// Event handler functions
// ------------------------
const handleTile = (event) => {
    if (playerTurn == null) {
        console.log("Game over");
        return;
    } // guard condition

    if (event.target.classList.contains("red-player") || event.target.classList.contains("blue-player")) {
        statusMessage.textContent = "Tile has already been occupied. Choose another tile.";
    } else if (playerTurn === "red") {
        event.target.classList.add("red-player");
        playerTurn = "blue";
        statusMessage.textContent = "Blue player's turn";
        checkWin();
    } else if (playerTurn === "blue") {
        event.target.classList.add("blue-player");
        playerTurn = "red";
        statusMessage.textContent = "Red player's turn";
        checkWin();
    }

    var redPlayerTiles = document.querySelectorAll(".red-player").length;
    var bluePlayerTiles = document.querySelectorAll(".blue-player").length;

    if (playerTurn != null && redPlayerTiles + bluePlayerTiles === tiles.length) {
        statusMessage.textContent = "It's a draw. Click here to reset the board.";
        playerTurn = null;
    }
    // Bot mode activation
    if (header.classList.contains("bot-mode") && playerTurn === "blue") {
        statusMessage.textContent = "Bot is making a move";
        setTimeout(sillyBotTurn,2000);
    } else if (header.classList.contains("super-bot-mode") && playerTurn === "blue") {
        statusMessage.textContent = "Bot is making a move";
        setTimeout(superBotTurn,1000);
    }
}

const handleReset = () => {
    if (playerTurn === null) {
        statusMessage.textContent = "One second. Board is being reset...";
        gameBoard.classList.add("shake-horizontal");
        tiles.forEach( (tile) => {
            tile.classList.remove("red-player");
            tile.classList.remove("blue-player");
        })
        const refreshStatus = () => {
            gameBoard.classList.remove("shake-horizontal");
            if (lastWinner === "blue") {
                playerTurn = "red";
                statusMessage.textContent = "Red player, select a starting tile.";
            } else {
                playerTurn = "blue";
                statusMessage.textContent = "Blue player, select a starting tile.";
                // Bot mode activation
                if (header.classList.contains("bot-mode") && playerTurn === "blue") {
                    statusMessage.textContent = "Bot is making a move";
                    setTimeout(sillyBotTurn,2000);
                } else if (header.classList.contains("super-bot-mode") && playerTurn === "blue") {
                    statusMessage.textContent = "Bot is making a move";
                    setTimeout(superBotTurn,1000);
                }
            }
        }
        setTimeout(refreshStatus, 1500)
    }
}

const handleSillyBotMode = (event) => {
    console.log("Silly bot activated")
    event.target.classList.remove("super-bot-mode");
    event.target.classList.toggle("bot-mode");
}
const handleSuperBotMode = (event) => {
    console.log("Smarter bot activated")
    event.target.classList.remove("bot-mode");
    event.target.classList.toggle("super-bot-mode");
}

// ----------------
// Event listeners
// ----------------
tiles.forEach( (tile) => {
    tile.addEventListener("click", handleTile);
});
resetBox.addEventListener("click",handleReset);
header.addEventListener("click",handleSillyBotMode);
header.addEventListener("dblclick",handleSuperBotMode);

