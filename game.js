// initialize the game board
let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const moves = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// flag which player is going to move
let currentPlayer = 1;

//
function remainingValues(moves) {
  let text = "";
  for (const x of moves.values()) {
    text += x + ",";
  }

  return text;
}

// function to display the game board
function display_board() {
  console.log("-------------");
  for (let i = 0; i < 3; i++) {
    let row = "|";
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == 0) {
        row += "   |";
      } else {
        row += " " + board[i][j] + " |";
      }
    }
    console.log(row);
    console.log("-------------");
  }
}

// function to check if a player has won
function check_Win() {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] + board[i][1] + board[i][2] == 15) {
      if (board[i][0] === 0 || board[i][1] === 0 || board[i][2] === 0) continue;
      return 1;
    }
  }

  // check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] + board[1][j] + board[2][j] == 15) {
      if (board[0][j] === 0 || board[1][j] === 0 || board[2][j] === 0) continue;
      return 1;
    }
  }

  // check diagonals
  if (
    board[0][0] + board[1][1] + board[2][2] == 15 &&
    board[0][0] !== 0 &&
    board[1][1] !== 0 &&
    board[2][2] !== 0
  ) {
    return 1;
  }
  if (
    board[0][2] + board[1][1] + board[2][0] == 15 &&
    board[0][2] !== 0 &&
    board[1][1] !== 0 &&
    board[2][0] !== 0
  ) {
    return 1;
  }

  return 0;
}

function get_AImove() {
  const availableCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == 0) {
        availableCells.push([i, j]);
      }
    }
  }

  let move; // contains value
  let cell; // cell to be filled

  // checking for rows if one cell left
  for (let i = 0; i < 3; i++) {
    const first = board[i][0];
    const second = board[i][1];
    const third = board[i][2];

    if (first == 0 && second != 0 && third != 0) {
      move = 15 - second - third;
      if (move > 0 && moves.has(move)) {
        board[i][0] = move;
        moves.delete(move);
        return;
      }
    }
    if (second == 0 && first != 0 && third != 0) {
      move = 15 - first - third;
      if (move > 0 && moves.has(move)) {
        board[i][1] = move;
        moves.delete(move);
        return;
      }
    }
    if (third == 0 && first != 0 && second != 0) {
      move = 15 - second - first;
      if (move > 0 && moves.has(move)) {
        board[i][2] = move;
        moves.delete(move);
        return;
      }
    }
  }

  // checking if two one value left in column
  for (let j = 0; j < 3; j++) {
    const first = board[0][j];
    const second = board[1][j];
    const third = board[2][j];

    if (first == 0 && second != 0 && third != 0) {
      move = 15 - second - third;
      if (move > 0 && moves.has(move)) {
        board[0][j] = move;
        moves.delete(move);
        return;
      }
    }

    if (second == 0 && first != 0 && third != 0) {
      move = 15 - first - third;
      if (move > 0 && moves.has(move)) {
        board[1][j] = move;
        moves.delete(move);
        return;
      }
    }

    if (third == 0 && first != 0 && second != 0) {
      move = 15 - second - first;
      if (move > 0&& moves.has(move)) {
        board[2][j] = move;
        moves.delete(move);
        return;
      }
    }
  }

  // checking if one column is remaining in diagonal

  // checking for first diagnol
  let firstDiagonal = [
    [0, 0],
    [1, 1],
    [2, 2],
  ];
  let secondDiagonal = [
    [0, 2],
    [1, 1],
    [2, 0],
  ];

  let moveMade = false;

  moveMade = fillDiagonals(firstDiagonal);
  if (moveMade) return;
  moveMade = fillDiagonals(secondDiagonal);
  if (moveMade) return;

  function fillDiagonals(diagonal) {
    const first = board[diagonal[0][0]][diagonal[0][1]];
    const second = board[diagonal[1][0]][diagonal[1][1]];
    const third = board[diagonal[2][0]][diagonal[2][1]];

    if (first == 0 && second != 0 && third != 0) {
      move = 15 - second - third;
      if (move > 0 && moves.has(move)) {
        board[diagonal[0][0]][diagonal[0][1]] = move;
        moves.delete(move);
        return true;
      }
    }

    if (second == 0 && first != 0 && third != 0) {
      move = 15 - first - third;
      if (move > 0 && moves.has(move)) {
        board[diagonal[1][0]][diagonal[1][1]] = move;
        moves.delete(move);
        return true;
      }
    }

    if (third == 0 && first != 0 && second != 0) {
      move = 15 - second - first;
      if (move > 0 && moves.has(move)) {
        board[diagonal[2][0]][diagonal[2][1]] = move;
        moves.delete(move);
        return true;
      }
    }
  }

  // at the end pick random and fill 

  cell = availableCells[Math.floor(Math.random() * availableCells.length)];
  move = Array.from(moves)[parseInt(Math.random()*moves.size)]

  moves.delete(move);
  board[cell[0]][cell[1]] = move;
}

function getPlayerMove() {
  while (true) {
    console.log(moves);
    let temp = prompt(
      `Enter a number from the this set: ${remainingValues(moves)}`
    );
    if (!moves.has(Number(temp))) {
      alert("Number already taken, choose another number");
      continue;
    }

    let row = prompt("Enter row number (1-3): ");
    let col = prompt("Enter column number (1-3): ");
    row--;
    col--;
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      alert("Invalid input. Please enter numbers between 1 and 3.");
    } else if (board[row][col] != 0) {
      alert("That square is already taken. Please choose an empty square.");
    } else {
      board[row][col] = Number(temp);
      moves.delete(Number(temp));
      break;
    }
  }
}

function main() {
  while (true) {
    console.log(currentPlayer, "current player");

    if (currentPlayer === 1) {
      console.log("players move");
      getPlayerMove();
      display_board();
      console.log("--------------------------------");
    } else {
      console.log("AI move");
      get_AImove();
      display_board();
      console.log("--------------------------------");
    }
    console.log("checking winner");
    if (check_Win() === 1) {
      console.log(`Player ${currentPlayer} wins!`);
      console.log("Board at winning move");
      display_board();
      break;
    }
    console.log("changing player");
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}

console.log("game Starting");
main();
