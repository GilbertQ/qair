import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Paper } from '@mui/material';

const Qlang = () => {
  // Generate 500 English/French word pairs
  const wordPairs = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    english: [
      "Hello",
      "Thank you",
      "Please",
      "Good morning",
      "Good evening",
      "Yes",
      "No",
      "Goodbye",
      "How are you?",
      "You're welcome"
    ][i],
    french: [
      "Bonjour",
      "Merci",
      "S'il vous plaît",
      "Bonjour",
      "Bonsoir",
      "Oui",
      "Non",
      "Au revoir",
      "Comment allez-vous?",
      "De rien"
    ][i]
  }));

  // Shuffle the word pairs
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const shuffledWords = shuffleArray(wordPairs);

  // Separate into English and French words
  const englishWords = shuffledWords.map(pair => pair.english);
  const frenchWords = shuffleArray(shuffledWords.map(pair => pair.french));

  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [selectedFrench, setSelectedFrench] = useState(null);
  const [matches, setMatches] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Handle English word selection
  const handleEnglishClick = (word) => {
    if (!matches.some(match => match.english === word)) {
      setSelectedEnglish(word);
    }
  };

  // Handle French word selection
  const handleFrenchClick = (word) => {
    if (!matches.some(match => match.french === word)) {
      setSelectedFrench(word);
    }
  };

  // Check for a match whenever both selections are made
  useEffect(() => {
    if (selectedEnglish && selectedFrench) {
      setAttempts(prev => prev + 1);
      const englishIndex = wordPairs.findIndex(pair => pair.english === selectedEnglish);
      const frenchIndex = wordPairs.findIndex(pair => pair.french === selectedFrench);

      if (englishIndex === frenchIndex) {
        setMatches(prev => [...prev, { english: selectedEnglish, french: selectedFrench }]);
      }

      setSelectedEnglish(null);
      setSelectedFrench(null);
    }
  }, [selectedEnglish, selectedFrench, wordPairs]);

  // Check if all matches are completed
  const isGameOver = matches.length === wordPairs.length;

  // Reset the game
  const resetGame = () => {
    setSelectedEnglish(null);
    setSelectedFrench(null);
    setMatches([]);
    setAttempts(0);
  };

  // Render a word button
  const renderWordButton = (word, isMatched, onClick) => (
    <Button
      variant="outlined"
      disabled={isMatched}
      onClick={() => onClick(word)}
      sx={{
        width: '120px',
        height: '50px',
        margin: '5px',
        backgroundColor: isMatched ? 'success.light' : 'white',
        '&:hover': {
          backgroundColor: isMatched ? 'success.light' : '#f5f5f5',
        },
      }}
    >
      {word}
    </Button>
  );

  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        mt: 4,
        p: 3,
      }}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h4" align="center" gutterBottom>
        English-French Pairing Game
      </Typography>

      <Typography
        variant="h6"
        align="center"
        gutterBottom
      >
        {isGameOver ? `Congratulations! You matched all pairs in ${attempts} attempts.` : `Attempts: ${attempts}`}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Typography variant="h6" align="center" gutterBottom>
            English Words
          </Typography>
          {englishWords.map(word =>
            renderWordButton(
              word,
              matches.some(match => match.english === word),
              handleEnglishClick
            )
          )}
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" align="center" gutterBottom>
            French Words
          </Typography>
          {frenchWords.map(word =>
            renderWordButton(
              word,
              matches.some(match => match.french === word),
              handleFrenchClick
            )
          )}
        </Grid>
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

export default Qlang;
