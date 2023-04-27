// initialize the game board
let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  
  const set1 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  // flag which player is going to move
  let currentPlayer = 1;
  
  //
  function get_set_value(set1) {
    let text = "";
    for (const x of set1.values()) {
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
        return 1;
      }
    }
  
    // check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] + board[1][j] + board[2][j] == 15) {
        return 1;
      }
    }
  
    // check diagonals
    if (board[0][0] + board[1][1] + board[2][2] == 15) {
      return 1;
    }
    if (board[0][2] + board[1][1] + board[2][0] == 15) {
      return 1;
    }
  
    return 0;
  }
  
  function get_AImove() {
  
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
          board[row][col] =
            15 - board[row][(col + 1) % 3] - board[row][(col + 2) % 3];
          if (check_Win() === 1) {
            board[row][col] = 0; // undo move
          } else {
            return;
          }
        }
      }
    }
    let row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (!isMoveValid(row, col));
    let move = 15 - board[(row + 1) % 3][col] - board[(row + 2) % 3][col]
    set1.delete(move)
    board[row][col] = move;
  }
  
  function get_player_moves() {
    while (true) {
      console.log(set1);
      let temp = prompt(
        `Enter a number from the this set: ${get_set_value(set1)}`
      );
      if (!set1.has(Number(temp)))
        alert("Number already taken, choose another number");
  
      let row = prompt("Enter row number (1-3): ");
      let col = prompt("Enter column number (1-3): ");
      row--;
      col--;
      if (row < 0 || row > 2 || col < 0 || col > 2) {
        alert("Invalid input. Please enter numbers between 1 and 3.");
      } else if (board[row][col] != 0) {
        alert("That square is already taken. Please choose an empty square.");
      } else {
        //   board[row][col] = prompt("Enter a number from 1 to 9: ");
        board[row][col] = Number(temp);
        set1.delete(Number(temp));
        break;
      }
    }
  }
  
  function playGame() {
    while (true) {
      console.log(currentPlayer, "current player");
  
      display_board();
      if (currentPlayer === 1) {
        get_player_moves();
      } else {
        get_AImove();
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
  playGame();
  