console.log("Script loaded!")

// 1. create a 3x3 grid
//  1.1 each box in the grid needs to be responsive. addEventListener?
//  1.2 each box needs to be uniquely identified. ID instead of class?

// 2. need to allow player to choose their avatar. blue / red
//  2.1 player 1 selects avatar, player 2 gets assigned remainder

// 3. when player 1 selects a box, run a check
//  3.1 if the box has already been marked, ask to select again
//  3.2 else if the box hasn't been previously marked, mark it with player 1's icon

// 4. check game logic
//  4.1 after each player's turn, check if selected box has similarly marked adjacent boxes
//  4.2 if there's 3 in a row, display winner
//  4.3 else swap turns to next player

// 5. winner display
//  5.1 add score to winning player
//  5.2 resets board to empty