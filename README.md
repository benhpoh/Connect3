# Connect 3 Readme

The game's objective is for a player to connect 3 tiles in a straight path. 

One player's selected tile is assigned a positive value, and the other's a negative value. Each time a player makes a move, the program calculates the resulting score across the board, and if it determines that any path has the maximum positive or negative score achievable, a winner is determined.

When a player wins, the header color updates to reflect the latest winner, and shakes the board clean for a fresh round to recommence.

One current drawback is that the tile sizes are hardcoded, which may not scale well on differing screen sizes.

# Program Features

The basics of tic-tac-toe apply, where the player wins by connecting 3 tiles in a straight line. This works vertically, horizontally, or diagonally.

Red player has the first go, and when one player wins, the score is added to the tally. The header will be updated to reflect the latest winner's winning streak, and starting move given to the losing player.

As one player wins continuously, the winning streak on the header is updated to match. The moment that player loses, the streak is reset to the opposing player's streak. There's also a running tally on the bottom with a win-rate calculator.

The reset button can be pressed at any time to shake the board clean.

## Easter Egg

I've programmed 2 levels of bots into the game. The bots are hard-coded as Blue Player, and will only initialise upon Red Player making a valid move (i.e. activating bot mode when it's already Blue Player's turn will not trigger the first bot move).

Clicking the 'Connect' in the header will cause it to flash and turn aqua, activating _silly_ bot.

Double clicking 'Connect' will activate **angry** bot. Have fun...

As double clicking isn't available on touch screen devices, mobile platform compatibility is not yet implemented for angry bot.

In future updates, there should be a toggle to choose if the bot is to be Red or Blue, rather than hard-coded.

- ### Silly Bot Logic
    - Silly bot simply chooses a tile at random, and checks if the tile has already been occupied.
    - If the tile is clear, that tile will be claimed, and the turn passed to the opposing player.
    - If the tile is already occupied, the process is repeated until silly bot finds a clear tile.

- ### Angry Bot Logic
    - Angry bot is coded to recognize a few moves. 
        - When angry bot is given the starting move, the bot will choose a corner tile at random.
        - If the opposing player has claimed a corner tile, bot will claim the middle tile, and vice versa.
        - When the bot has claimed 2 tiles in a line, if the final tile is unclaimed, bot will claim and win.
        - If a win isn't possible, the bot then searches if the opposing player has any lines with a potential win. If one is found, bot will claim the remainder tile to block the line.
    - Barring all the above scenarios, bot will temporarily revert to silly bot mode, and pick a tile at random.
    - The current method to beat angry bot is to intentionally create the scenario that triggers a logic failure in angry bot, and reverting it to silly bot mode.

## Thought Process

1. Create a 3x3 grid // DONE
    - Each box in the grid needs to be responsive. addEventListener? // DONE
     - Each box needs to be uniquely identified. ID instead of class? // DONE

2. OPTIONAL UPGRADE. Allow player to choose their avatar. blue / red  // DECLINED
     - Player 1 selects avatar, player 2 gets assigned remainder // DECLINED
     - Decided to alternate players by having the loser start the new game. // DONE
          - Unexpected side effect. In event of a draw, the loser continues to start. Outcome acceptable. // DONE

3. When player 1 selects a box, run a check // DONE
    - If the box has already been marked, ask to select again // DONE
    - Else if the box hasn't been previously marked, mark it with player 1's icon // DONE

4. Check game logic
    - After each player's turn, check if any grid is complete // DONE
        - This could be done via a positive / negative counter, where player 1's boxes add a positive value, and player 2's returns a negative. // DONE
    - If there's 3 in a row, display winner // DONE
        - If 3 of player1's are in line, the value should be +3, or -3 if player2's are in line // DONE
        - Board should then be disabled to prevent any further input. // DONE
    - Else swap turns to next player // DONE

5. Winner display // DONE
    - Add score to winning player // DONE
    - Resets board to empty // DONE

6. BONUS SECTION
    - Create bot to play against
        - Bot will assume player 2 position. If player 1 does x move, do Y move instead. // DONE
        - Create silly bot first. Use math.random to pick an unclaimed spot. // DONE
        - Create unbeatable bot. // DONE...?