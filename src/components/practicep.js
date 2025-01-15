import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Paper } from '@mui/material';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Calculate winner with improved validation
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check for winner
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    // Check for draw
    if (squares.every(square => square !== null)) {
      return 'draw';
    }

    return null;
  };

  // Check game status after each move
  useEffect(() => {
    const result = calculateWinner(board);
    if (result === 'draw') {
      setIsDraw(true);
      setWinner(null);
    } else if (result) {
      setWinner(result);
      setIsDraw(false);
    }
  }, [board]);

  // Handle player's move
  const handleClick = (index) => {
    // Return early if square is filled or game is over
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  // Render square with improved styling
  const renderSquare = (index) => (
    <Button
      variant="outlined"
      onClick={() => handleClick(index)}
      sx={{
        width: '100px',
        height: '100px',
        fontSize: '24px',
        color: board[index] === 'X' ? 'primary.main' : 'secondary.main',
        backgroundColor: winner && board[index] === winner ? '#e8f5e9' : 'white',
        '&:hover': {
          backgroundColor: winner && board[index] === winner ? '#e8f5e9' : '#f5f5f5',
        },
      }}
    >
      {board[index]}
    </Button>
  );

  // Get current game status
  const getGameStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <Box
      sx={{
        maxWidth: '400px',
        mx: 'auto',
        mt: 4,
        p: 3,
      }}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Tic Tac Toe
      </Typography>
      
      <Typography 
        variant="h6" 
        align="center" 
        color={winner ? 'success.main' : 'text.primary'}
        gutterBottom
      >
        {getGameStatus()}
      </Typography>

      <Grid container spacing={1} justifyContent="center">
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

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={resetGame}
          sx={{ px: 4 }}
        >
          Reset Game
        </Button>
      </Box>
    </Box>
  );
};

export default TicTacToe;