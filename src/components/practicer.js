import React, { useState, useEffect, useCallback } from 'react';
import { Button, Typography, Grid, Box, Paper } from '@mui/material';

const qair = () => {
  const wordPairs = [
    // Add your word pairs here...
    ["Apathique", "Apathetic (lacking enthusiasm or concern)"],
    ["Baguenauder", "To stroll leisurely; to idle"],
    ["Bêtise", "Stupidity; foolishness"],
    ["Brouhaha", "Uproar; commotion"],
    [	"Drôlerie"		,	"Amusing peculiarity; oddity"	],
[	"Embrouiller"		,	"To confuse; to muddle"	],
[	"Épatant"		,	"Astounding; amazing"	],
[	"Éperdu"		,	"Wild with excitement; frantic"	],
[	"Épicurien"		,	"Epicurean; devoted to pleasure"	],
[	"Esbroufe"		,	"Bluff; pretense; show"	]
  ];

  const [currentPairs, setCurrentPairs] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [matches, setMatches] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Stable startGame function
  const startGame = useCallback((numPairs) => {
    const shuffledPairs = [...wordPairs].sort(() => Math.random() - 0.5);
    setCurrentPairs(shuffledPairs.slice(0, numPairs));
    setSelectedWord(null);
    setMatches([]);
    setAttempts(0);
  }, [wordPairs]);

  // Initialize the game
  useEffect(() => {
    startGame(2);
  }, [startGame]);

  const handleWordClick = (word) => {
    if (matches.includes(word)) return;

    if (!selectedWord) {
      setSelectedWord(word);
    } else {
      setAttempts((prev) => prev + 1);
      const isMatch = currentPairs.some(
        ([eng, fr]) => (eng === selectedWord && fr === word) || (fr === selectedWord && eng === word)
      );

      if (isMatch) {
        setMatches((prev) => [...prev, selectedWord, word]);
      }
      setSelectedWord(null);
    }
  };

  useEffect(() => {
    if (matches.length === currentPairs.length * 2) {
      const newPairCount = Math.min(currentPairs.length * 2, wordPairs.length);
      startGame(newPairCount);
    }
  }, [matches, currentPairs.length, startGame, wordPairs.length]);

  const renderWordButton = (word) => {
    const isMatched = matches.includes(word);
    const isSelected = selectedWord === word;

    return (
      <Button
        key={word}
        variant="outlined"
        onClick={() => handleWordClick(word)}
        disabled={isMatched}
        sx={{
          backgroundColor: isMatched ? 'green' : isSelected ? 'lightblue' : 'white',
          margin: '5px',
          width: '200px',
          height: '50px',
        }}
      >
        {word}
      </Button>
    );
  };

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

      <Typography variant="h6" align="center" gutterBottom>
        Matches: {matches.length / 2}/{currentPairs.length} | Attempts: {attempts}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" align="center">
            English Words
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {currentPairs.map(([eng]) => renderWordButton(eng))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="center">
            French Words
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {currentPairs.map(([, fr]) => renderWordButton(fr))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default qair;
