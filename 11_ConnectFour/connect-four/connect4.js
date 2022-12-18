// CONNECT FOUR

// Player 1 and 2 alternate turns. On each turn, a piece is dropped
//down a column until a player gets four-in-a-row (horiz, vert, or
//diag) or until board fills (tie)

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push([null, null, null, null, null, null, null]);
  }
}

// makeHtmlBoard: make HTML table and row of column tops.
function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // Creates a table row w/ id of #column-top
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // Event listener to top column of board (for where to drop pieces)
  top.addEventListener("click", handleClick);

  // Creates 7 tds and appends them to the 'top' row (adds 7 cells to the row)
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  // Appends the new row of 7 cells to the htmlBoard
  htmlBoard.append(top);

  // Creates 6 rows with 7 cells each
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // Each cell is given an id of #(y-axis)-(x-axis)
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    // Adds row to board
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("piece");
  newDiv.classList.add(`p${currPlayer}`);

  const targetTd = document.getElementById(`${y}-${x}`);
  targetTd.append(newDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every((row) => row.every((val) => val))) {
    return endGame("Game over, both players tie!");
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // Loop through each el of every array in board
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // Checking for horizontal groups of 4
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      // Checking for vertical groups of 4
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      // Checking for diagonally down & right groups of 4
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      // Checking for diagonally down & left groups of 4
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      // If either 4 horiz, vert, diagDR, or diagDL have all 4 el ===, return true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
