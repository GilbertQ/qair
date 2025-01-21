import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
} from "@mui/material";

const INITIAL_PAIRS_COUNT = 2;

const PairingGame = () => {
  const [allWords] = useState([
    ["Apathique", "Apathetic (lacking enthusiasm or concern)"],
    ["Baguenauder", "To stroll leisurely; to idle"],
    ["Bêtise", "Stupidity; foolishness"],
    ["Brouhaha", "Uproar; commotion"],
    ["Cachotterie", "Secretiveness; slyness"],
    ["Cahot", "Rough jolt (in a vehicle)"],
    ["Charivari", "Noisy demonstration of disapproval"],
    ["Chicanerie", "Petty argument; quibbling"],
    ["Coquetterie", "Flirtatiousness; coquetry"],
    ["Débâcle", "Sudden and ignominious failure"],
    ["Déclassé", "Having fallen from a higher social class"],
    ["Dégaine", "Style; bearing; appearance"],
    ["Délester", "To relieve someone of (money or valuables)"],
    ["Démagogie", "Demagoguery; appealing to emotions rather than reason"],
    ["Démesuré", "Excessive; immoderate"],
    ["Dépaysant", "Unusual; unfamiliar; exotic"],
    ["Désabusé", "Disillusioned; cynical"],
    ["Désarroi", "Confusion; bewilderment"],
    ["Désinvolte", "Casual; nonchalant"],
    ["Désolation", "Desolation; dejection"],
    ["Désuet", "Outdated; obsolete"],
    ["Détournement", "Diversion; misappropriation"],
    ["Drôlerie", "Amusing peculiarity; oddity"],
    ["Embrouiller", "To confuse; to muddle"],
    ["Épatant", "Astounding; amazing"],
    ["Éperdu", "Wild with excitement; frantic"],
    ["Épicurien", "Epicurean; devoted to pleasure"],
    ["Esbroufe", "Bluff; pretense; show"],
    ["Escapade", "Frolic; escapade"],
    ["Esquiver", "To dodge; to evade"],
  ]);

  const [currentPairsCount, setCurrentPairsCount] = useState(INITIAL_PAIRS_COUNT);
  const [gameWords, setGameWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, [currentPairsCount]);

  const initializeGame = () => {
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    const selectedPairs = shuffled.slice(0, currentPairsCount);

    const gameArray = [
      ...selectedPairs.map((pair) => ({
        id: `french-${pair[0]}`,
        text: pair[0],
        pair: pair[1],
        type: "french",
      })),
      ...selectedPairs.map((pair) => ({
        id: `english-${pair[1]}`,
        text: pair[1],
        pair: pair[0],
        type: "english",
      })),
    ];

    setGameWords(gameArray.sort(() => Math.random() - 0.5));
    setSelectedWord(null);
    setMatchedPairs([]);
  };

  const handleWordClick = (word) => {
    if (matchedPairs.includes(word.id)) return;

    if (!selectedWord) {
      setSelectedWord(word);
    } else {
      if (
        selectedWord.id !== word.id &&
        ((selectedWord.type === "french" &&
          word.type === "english" &&
          selectedWord.pair === word.text) ||
          (selectedWord.type === "english" &&
            word.type === "french" &&
            selectedWord.pair === word.text))
      ) {
        setMatchedPairs((prev) => [...prev, selectedWord.id, word.id]);
        setScore((prev) => prev + 1);

        if (matchedPairs.length + 2 === gameWords.length) {
          setTimeout(() => {
            setCurrentPairsCount((prev) => Math.min(prev * 2, allWords.length));
            setScore(0);
          }, 1000);
        }
      }
      setSelectedWord(null);
    }
  };

  const getWordStyle = (word) => {
    if (matchedPairs.includes(word.id)) {
      return { backgroundColor: "#008000", border: "1px solidrgb(199, 155, 129)" };
    }
    if (selectedWord && selectedWord.id === word.id) {
      return { backgroundColor: "#bbdefb", border: "1px solidrgb(100, 246, 112)" };
    }
    return { backgroundColor: "#f5f5f5", border: "1px solidrgb(100, 246, 112)" };
  };

  return (
    <Card sx={{ width: '100%', height: '100%', mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          French Vocabulary Pairing Game
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Pairs to match: {currentPairsCount} | Matched:{" "}
          {matchedPairs.length / 2} | Score: {score}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          |
        </Typography>
        {matchedPairs.length === gameWords.length && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="h6">Congratulations! All pairs matched!</Typography>
          </Alert>
        )}

<Grid container spacing={2}>
  {gameWords.map((word) => {
    const wordLength = word.text.length;

    return (
      <Grid
        item
        key={word.id}
        onClick={() => handleWordClick(word)}
        sx={{
          ...getWordStyle(word),
          padding: 2,
          textAlign: "center",
          borderRadius: 2,
          cursor: "pointer",
          transition: "background-color 0.9s",
          width: `${wordLength*1.25}ch`, // Set width based on word length
          margin: '0.5rem'
        }}
      >
        {word.text}
      </Grid>
    );
  })}
</Grid>

      </CardContent>
    </Card>
  );
};

export default PairingGame;
