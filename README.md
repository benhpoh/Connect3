# Connect 3 Readme

The game's objective is for a player to connect 3 tiles in a straight path. 

One player's selected tile is assigned a positive value, and the other's a negative value. Each time a player makes a move, the program calculates the resulting score across the board, and if it determines that any path has the maximum positive or negative score achievable, a winner is determined.

When a player wins, the header color updates to reflect the latest winner, and shakes the board clean for a fresh round to recommence.

One current drawback is that the tile sizes are hardcoded, which may not scale well on differing screen sizes.

## Easter Egg

I've programmed 2 levels of bots into the game. The bots are hard-coded as Blue Player, and will initialise upon Red Player making a valid move.

Clicking the 'Connect' in the header will cause it to flash and turn aqua, activating silly bot.

Double clicking 'Connect' will activate **angry** bot. Have fun...


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