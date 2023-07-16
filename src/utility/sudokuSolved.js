export const isSudokuSolved = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === "") {
        return false; // Empty cell found, Sudoku is not solved yet
      }
    }
  }
  return true; // All cells filled, Sudoku is solved
};
