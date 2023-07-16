import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

const Sudoku = () => {
  const initialGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [grid, setGrid] = useState(initialGrid);
  const [userFilledCells, setUserFilledCells] = useState([]);

  const handleCellChange = (value, row, col) => {
    const updatedValue = value !== "" ? parseInt(value) : 0;
    const updatedGrid = grid.map((r, rowIndex) => {
      if (rowIndex === row) {
        return r.map((cell, colIndex) =>
          colIndex === col ? updatedValue : cell
        );
      }
      return r;
    });
    setGrid(updatedGrid);

    const updatedUserFilledCells = [...userFilledCells];
    const cell = { row, col };
    const index = updatedUserFilledCells.findIndex(
      (userCell) => userCell.row === row && userCell.col === col
    );
    if (updatedValue !== 0) {
      if (index === -1) {
        updatedUserFilledCells.push(cell);
      }
    } else {
      if (index !== -1) {
        updatedUserFilledCells.splice(index, 1);
      }
    }
    setUserFilledCells(updatedUserFilledCells);
  };

  const handleReset = () => {
    setGrid(initialGrid);
    setUserFilledCells([]);
  };

  const isSudokuValid = (grid, row, col, num) => {
    for (let d = 0; d < 9; d++) {
      if (grid[row][d] === num) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === num) return false;
    }
    let subGridRowstart = row - (row % 3);
    let subGridColstart = col - (col % 3);
    for (let r = subGridRowstart; r < subGridRowstart + 3; r++) {
      for (let d = subGridColstart; d < subGridColstart + 3; d++) {
        if (grid[r][d] === num) return false;
      }
    }
    return true;
  };

  const solveSudoku = () => {
    const copyGrid = grid.map((row) => [...row]);
    const findEmptyCell = () => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (copyGrid[i][j] === 0) {
            return { row: i, col: j };
          }
        }
      }
      return null;
    };
    const solve = () => {
      const emptyCell = findEmptyCell();
      if (!emptyCell) return true;
      const { row, col } = emptyCell;
      for (let num = 1; num <= 9; num++) {
        if (isSudokuValid(copyGrid, row, col, num)) {
          copyGrid[row][col] = num;
          if (solve()) return true;
          copyGrid[row][col] = 0;
        }
      }
      return false;
    };
    solve();
    setGrid(copyGrid);
  };

  const handleSolve = () => {
    solveSudoku();
  };

  return (
    <Grid container spacing={0} sx={{ maxWidth: "365px" }}>
      {grid.map((row, rowIndex) => (
        <Grid
          container
          item
          key={rowIndex}
          spacing={0}
          sx={{
            flexWrap: "nowrap",
            justifyContent: "center",
          }}
        >
          {row.map((value, colIndex) => {
            const isUserFilledCell = userFilledCells.some(
              (cell) => cell.row === rowIndex && cell.col === colIndex
            );
            return (
              <Grid item key={colIndex} sx={{}}>
                <TextField
                  value={value ? value : ""}
                  onChange={(e) =>
                    handleCellChange(e.target.value, rowIndex, colIndex)
                  }
                  variant='outlined'
                  size='small'
                  inputProps={{ maxLength: 1 }}
                  sx={{
                    width: "40px",
                    backgroundColor: isUserFilledCell
                      ? "#f0f0f0"
                      : "transparent",
                    borderTop:
                      rowIndex === 0 || rowIndex === 3 || rowIndex === 6
                        ? "1px solid #000"
                        : "none",
                    borderBottom: rowIndex === 8 ? "1px solid #000" : "none",
                    borderLeft:
                      colIndex === 0 || colIndex === 3 || colIndex === 6
                        ? "1px solid #000"
                        : "none",
                    borderRight: colIndex === 8 ? "1px solid #000" : "none",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      ))}
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          m: 2,
          maxWidth: "500px",
        }}
      >
        <Button variant='contained' color='primary' onClick={handleReset}>
          Reset
        </Button>
        <Button variant='contained' color='primary' onClick={handleSolve}>
          Solve
        </Button>
      </Grid>
    </Grid>
  );
};

export default Sudoku;
