import React, { useState } from 'react';
import { Button, Typography, Grid, Box } from '@mui/material';

const TicTacToe = () => {
  // Game state: 3x3 board represented by an array
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Check for winner combinations
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle player's move
  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if already filled or game over

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Render a single square
  const renderSquare = (index) => (
    <Button
      variant="outlined"
      onClick={() => handleClick(index)}
      sx={{ width: '100px', height: '100px', fontSize: '24px' }}
    >
      {board[index]}
    </Button>
  );

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4">Tic Tac Toe</Typography>
      <Typography variant="h6" color={winner ? 'green' : 'textPrimary'}>
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </Typography>
      <Grid container spacing={1} justifyContent="center" mt={2}>
        {[0, 1, 2].map(row => (
          <Grid item key={row} container spacing={1} justifyContent="center">
            {[0, 1, 2].map(col => (
              <Grid item key={col}>
                {renderSquare(row * 3 + col)}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      {winner && (
        <Typography mt={2} variant="body1">
          Game Over! Congratulations to {winner}!
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={resetGame} sx={{ mt: 2 }}>
        Reset Game
      </Button>
    </Box>
  );
};

export default TicTacToe;
