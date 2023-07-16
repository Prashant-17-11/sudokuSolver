export const isValidMove = (grid, row, col, num) => {
  // Check if the number already exists in the same row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) {
      return false;
    }
  }

  // Check if the number already exists in the same column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) {
      return false;
    }
  }

  // Check if the number already exists in the same 3x3 grid
  const gridRow = Math.floor(row / 3) * 3;
  const gridCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[gridRow + i][gridCol + j] === num) {
        return false;
      }
    }
  }

  return true; // Valid move
};
