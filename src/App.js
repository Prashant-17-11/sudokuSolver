import Sudoku from "./components/Sudoku";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Container>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='97dvh'
      >
        <Sudoku />
      </Box>
    </Container>
  );
}

export default App;
