export const isValidSudokuState = (state) => {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const rowValues = new Set();
    for (let col = 0; col < 9; col++) {
      const value = state[row][col];
      if (value !== "") {
        if (rowValues.has(value)) {
          return false; // Duplicate value found in the row
        }
        rowValues.add(value);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const colValues = new Set();
    for (let row = 0; row < 9; row++) {
      const value = state[row][col];
      if (value !== "") {
        if (colValues.has(value)) {
          return false; // Duplicate value found in the column
        }
        colValues.add(value);
      }
    }
  }

  // Check 3x3 grids
  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      const gridValues = new Set();
      for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
          const value = state[row][col];
          if (value !== "") {
            if (gridValues.has(value)) {
              return false; // Duplicate value found in the 3x3 grid
            }
            gridValues.add(value);
          }
        }
      }
    }
  }

  return true; // State is valid
};
