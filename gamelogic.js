console.log("Script loaded!")

const tiles = document.querySelectorAll(".tile");
const headerTiles = document.querySelectorAll(".header-tile");
const statusMessage = document.querySelector("#status-message");
const resetBox = document.querySelector("#reset-box");
const resetBtn = document.querySelector(".reset-btn");
const header = document.querySelector("h1");
const redPlayerScoreDisplay = document.querySelector("#redPlayer-score-display");
const bluePlayerScoreDisplay = document.querySelector("#bluePlayer-score-display");
const gameBoard = document.querySelector(".game-board");
var playerTurn = "red";
var lastWinner = null;
var redPlayerScore = 0;
var bluePlayerScore = 0;

//grid checker
const grdA = document.querySelectorAll(".grd-a");
const grdB = document.querySelectorAll(".grd-b");
const grdC = document.querySelectorAll(".grd-c");
const grd1 = document.querySelectorAll(".grd-1");
const grd2 = document.querySelectorAll(".grd-2");
const grd3 = document.querySelectorAll(".grd-3");
const grdX = document.querySelectorAll(".grd-x");
const grdY = document.querySelectorAll(".grd-y");
const allGrids = [grdA, grdB, grdC, grd1, grd2, grd3, grdX, grdY];

const calculateGridScore = (grid) => {
    var gridScore = 0;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].classList.contains("red-player")) {
            gridScore += 1;
        } else if (grid[i].classList.contains("blue-player")) {
            gridScore -= 1;
        }
    }
    return gridScore;
}


//grid completion checker
const checkWin = () => {
    const clearLoser = (loser) => {
        tiles.forEach( (tile) => {
            tile.classList.remove(loser);
        })
    }
    const changeHeader = () => {
        if (lastWinner === "red") {
            headerTiles.forEach( (tile) => {
                tile.classList.remove("blue-winner");
            })
            for (var i = 0; i < headerTiles.length; i++) {
                if (!headerTiles[i].classList.contains("red-winner")) {
                    headerTiles[i].classList.add("red-winner");
                    return;
                } 
            }
        } else if (lastWinner === "blue") {
            headerTiles.forEach( (tile) => {
                tile.classList.remove("red-winner");
            })
            for (var i = 0; i < headerTiles.length; i++) {
                if (!headerTiles[i].classList.contains("blue-winner")) {
                    headerTiles[i].classList.add("blue-winner");
                    return;
                } 
            }
        }
    }
    var redPlayerTiles = document.querySelectorAll(".red-player").length;
    var bluePlayerTiles = document.querySelectorAll(".blue-player").length;

    if (playerTurn != null && redPlayerTiles + bluePlayerTiles === tiles.length) {
        statusMessage.textContent = "It's a draw. Click here to reset the board.";
        playerTurn = null;
    }

    allGrids.forEach((grid) => { 
        gridScore = calculateGridScore(grid);
        if (gridScore === 3) {
            statusMessage.textContent = "Red player wins! Click on Reset Board to continue.";
            setTimeout(clearLoser, 1000, "blue-player");
            lastWinner = "red";
            playerTurn = null;
            redPlayerScore += 1;
            changeHeader();
        } else if (gridScore === -3) {
            setTimeout(clearLoser, 1000, "red-player");
            statusMessage.textContent = "Blue player wins! Click on Reset Board to continue.";
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
    console.log("Silly bot choosing");
    var tileBotChose = tiles[Math.floor(Math.random()*tiles.length)];
    if (playerTurn === "blue") {
        while (tileBotChose.classList.contains("red-player") || tileBotChose.classList.contains("blue-player")) {
            tileBotChose = tiles[Math.floor(Math.random()*tiles.length)];
        }
        tileBotChose.classList.add("blue-player");
        playerTurn = "red";
        statusMessage.textContent = "Red player's turn";
        checkWin();
    } else {
        return "It's not my turn, human...";
    }
}
const superBotTurn = () => {
    if (document.querySelectorAll(".red-player").length === 0) {
        console.log("Bot making first move");
        var cornerTilesIndex = [0, 2, 6, 8];
        var randomCornerTileIndex = cornerTilesIndex[Math.floor(Math.random()*4)];
        tiles[randomCornerTileIndex].classList.add("blue-player");
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
            } // guard condition preventing further loop execution
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
            return "It's not my turn, human...";
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

    // Bot mode activation
    if (header.classList.contains("bot-mode") && playerTurn === "blue") {
        statusMessage.textContent = "Bot is making a move";
        setTimeout(sillyBotTurn,2000);
    } else if (header.classList.contains("super-bot-mode") && playerTurn === "blue") {
        statusMessage.textContent = "Bot is making a move";
        setTimeout(superBotTurn,1000);
    }
}

// const handleReset = () => {
//     if (playerTurn === null) {
//         statusMessage.textContent = "One second. Board is being reset...";
//         gameBoard.classList.add("shake-horizontal");
//         tiles.forEach( (tile) => {
//             tile.classList.remove("red-player");
//             tile.classList.remove("blue-player");
//         })
//         const refreshStatus = () => {
//             gameBoard.classList.remove("shake-horizontal");
//             if (lastWinner === "blue") {
//                 playerTurn = "red";
//                 statusMessage.textContent = "Red player, select a starting tile.";
//             } else {
//                 playerTurn = "blue";
//                 statusMessage.textContent = "Blue player, select a starting tile.";
//                 // Bot mode activation
//                 if (header.classList.contains("bot-mode") && playerTurn === "blue") {
//                     statusMessage.textContent = "Bot is making a move";
//                     setTimeout(sillyBotTurn,2000);
//                 } else if (header.classList.contains("super-bot-mode") && playerTurn === "blue") {
//                     statusMessage.textContent = "Bot is making a move";
//                     setTimeout(superBotTurn,1000);
//                 }
//             }
//         }
//         setTimeout(refreshStatus, 1000);
//     }
// }
const handleForceReset = () => {
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
    setTimeout(refreshStatus, 1000);
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
// resetBox.addEventListener("click",handleReset);
resetBtn.addEventListener("click",handleForceReset);
// header.addEventListener("click",handleSillyBotMode);
header.addEventListener("click",handleSuperBotMode);

