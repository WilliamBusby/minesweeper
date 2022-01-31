// Overall object containing all game info
// Internal array called gameboard
// Internal arrays of number rows each representing a column
// Internal objects within each array representing a square from the class grid(?)

// Game object:
// - Gameboard array
// - Mines array
// - Timer
// - Number of flags left
// - [X,Y] grid size

// Class for each square containing: 
// - hasMine (default false, calculate on click from mine coord array, if mineArry includes [x,y])
// - numberOfMinesSurrounding (default 0, calculate after click?)
// - isFlagged (default false, on right click true)
// - isShowing (default false, on left click true)
// - [xCoord, yCoord] (generated from for loops)
// - canBeClicked (true default, false if clicked/whatever)

// Array with coords of mines. Each click checks hasMine first
// Each click checks if xCoord +/- 1 AND yCoord +/- 1 of a mine position (8 squares surrounding)
// Sum how many of the mines are near to it and change innerHTML

// Click on empty one triggers chain event that clicks on all ones around (8 at a time or wall)

// Show innerHTML event that shows info (mine, numberOfMinesSurrounding, empty) once clicked?

// If mine is clicked on (either by person or function, end game)

// Restart button?
// Timer?
// Number of flags left?
// How to play?

// Middle click event:
// - Check if flagged squares around that one are same as numberOfMinesSurrounding
// - If yes, click other squares
// - If no, don't do anything? or alert?

// Left click event, checks if hasMine true, 
// - if yes -> end game
// - if no -> check if numberOfMinesSurrounding = 0,
// -- if yes -> chain event
// -- if no -> calculate number of surrounding mines -> show

// Right click event, checks if numberFlags remaining > 0,
// -if no -> don't do anything? alert?
// -if yes -> check if isShowing true,
// -- if yes -> do nothing? alert?
// -- if no -> place flag (set isFlagged to true)