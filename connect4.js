/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = ()=>{
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i ++){
    //create dynamic length array with Array.from length
    board.push(Array.from({length:WIDTH},))
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = ()=>{
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")
  // TODO: add comment for this code
  //create table row
  const top = document.createElement("tr");
  //add id to table row
  top.setAttribute("id", "column-top");
  // add event listener to top table row 
  top.addEventListener("click", handleClick);

  //for loop to create cell for top row
  for (let x = 0; x < WIDTH; x++) {
    //create td of table row
    const headCell = document.createElement("td");
    // add id attribute to td
    headCell.setAttribute("id", x);
    // append table row cell to table row
    top.append(headCell);
  }
  // append top table row to game board
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creat tokens
  for (let y = 0; y < HEIGHT; y++) {
    //create tokens row
    const row = document.createElement("tr");
    // insert token cells to token row  
    for (let x = 0; x < WIDTH; x++) {
      // create token cells
      const cell = document.createElement("td");
      // add unique id to token cells
      cell.setAttribute("id", `${y}-${x}`);
      // append to token row
      row.append(cell);
    }
    // append all token row to game board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x)=> {
  // TODO: write the real version of this, rather than always returning 0
  for(let i = HEIGHT - 1; i >= 0; i --){
    if(!board[i][x]){
      return i
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x)=>{
  // TODO: make a div and insert into correct table cell
  const token = document.createElement("div")
  token.classList.add("piece",`p${currPlayer}`)
  const token_pos = document.getElementById(`${y}-${x}`)
  token_pos.appendChild(token)
}

/** endGame: announce game end */

const endGame = (msg)=>{
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);

  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  board.every(row => row.every(cell => cell)) ? endGame("tie") : null

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
  console.log(currPlayer)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const  checkForWin = ()=> {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    // 
    return cells.every(
      // destruct each array 
      ([y, x]) =>
        // y grater or equal to 0
        y >= 0 &&
        // y less than the columns Height
        y < HEIGHT &&

        // x greater or equal to 0
        x >= 0 &&

        // x less than row width
        x < WIDTH &&

        // current index value equal to current player
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //check all cells position with for loops 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //store the possible horiz indexs 
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // store possible the vertical index
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // store the diagonally index option 1
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // store the diagonal index option 2
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      
      //both either horiz,vert,diagDR,and diagDl is true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        //return true
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
