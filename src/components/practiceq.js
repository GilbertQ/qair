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
  const [allWords] = useState([["Aubaine","Windfall, lucky find"],["Badaud","Gawker, onlooker"],["Bouquin","Old book"],["Cafouiller","To bungle, mess up"],["Chipoter","To quibble, nitpick"],["Débrouillard","Resourceful person"],["Dépaysement","Change of scenery"],["Ébahi","Astonished, amazed"],["Éclaircie","Clearing (in the sky)"],["Épanoui","Fulfilled, blooming"],["Fadaises","Nonsense, rubbish"],["Farfelu","Far-fetched, eccentric"],["Flemmard","Lazy person"],["Flâner","To stroll, wander aimlessly"],["Gourmandise","Greediness, gluttony"],["Gouaille","Cheek, impudence"],["Gringalet","Weakling, puny person"],["Hurluberlu","Eccentric, oddball"],["Inénarrable","Indescribable, ineffable"],["Lambiner","To dawdle, linger"],["Loufoque","Crazy, eccentric"],["Marmaille","Brats, bunch of kids"],["Mélancolie","Melancholy"],["Mignardise","Delicacy, sweet treat"],["Niais","Naive, simple-minded"],["Pacotille","Junk, cheap trinkets"],["Pataquès","Blunder, slip of the tongue"],["Péripétie","Adventure, twist (in a story)"],["Pétillant","Sparkling, bubbly"],["Pignouf","Boor, uncouth person"],["Potache","Schoolboy, immature"],["Quiproquo","Misunderstanding, mix-up"],["Rabat-joie","Killjoy, spoilsport"],["Raffut","Racket, noise"],["Ras-le-bol","Fed up, sick and tired"],["Rêvasser","To daydream"],["Ribouldingue","Riotous, boisterous"],["Rigolo","Funny, amusing"],["Sérendipité","Serendipity"],["Souci","Worry, concern"],["Souffre-douleur","Scapegoat, whipping boy"],["Souk","Mess, chaos"],["Tintamarre","Din, racket"],["Tohu-bohu","Chaos, confusion"],["Toupet","Nerve, audacity"],["Turlupiner","To bother, worry"],["Vadrouille","Wander, roam"],["Vagabond","Vagrant, wanderer"],["Velléitaire","Indecisive, wishy-washy"],["Zigzaguer","To zigzag"],["Absorbé","absorbé"],["Adaptable","adaptable"],["Ambitieux","ambitious"],["Analyser","to analyze"],["Appréciation","appreciation"],["Articuler","articulate"],["Authentique","authentic"],["Calculatrice","calculator"],["Cérébral","cerebral"],["Cohérent","coherent"],["Commémorer","to commemorate"],["Conciliant","conciliatory"],["Conscient","conscious"],["Crédibilité","credibility"],["Débat","debate"],["Débattre","to debate"],["Décentraliser","decentralize"],["Déclarer","declare"],["Délibérer","deliberate"],["Démocratie","democracy"],["Dépendance","dependence"],["Déterminant","determinant"],["Différenciation","differentiation"],["Disponibilité","availability"],["Dynamique","dynamic"],["Échec","failure"],["Effets secondaires","side effects"],["Empathie","empathy"],["Environnement","environment"],["Équilibre","balance"],["Estimation","estimation"],["Éthique","ethics"],["Evaluation","evaluation"],["Expérience","experience"],["Expertise","expertise"],["Facilitateur","facilitator"],["Fidélité","loyalty"],["Flexibilité","flexibility"],["Formulation","formulation"],["Gestionnaire","manager"],["Globalisation","globalization"],["Harmonisation","harmonization"],["Hétérogène","heterogeneous"],["Holistique","holistic"],["Humain","human"],["Idiosyncrasie","idiosyncrasy"],["Implication","implication"],["Incitation","incentive"],["Indicateur","indicator"],["Individualisme","individualism"],["Innovation","innovation"],["Intangible","intangible"],["Interaction","interaction"],["Interprétation","interpretation"],["Intuition","intuition"],["Jeu de mots","pun"],["Justification","justification"],["KPI","KPI (Key Performance Indicator)"],["Leadership","leadership"],["Légalité","legality"],["Libéralisme","liberalism"],["Logiciel","software"],["Maîtrise","mastery"],["Médiatisation","mediatization"],["Mémorandum","memorandum"],["Métaphore","metaphor"],["Modèle conceptuel","conceptual model"],["Motivation","motivation"],["Multilingue","multilingual"],["Narration","narration"],["Négociation","negotiation"],["Normalisation","normalization"],["Objectif","objective"],["Opportunité","opportunity"],["Optimisation","optimization"],["Ordinateur","computer"],["Paradoxal","paradoxical"],["Partenariat","partnership"],["Patrimoine","heritage"],["Perspectivisme","perspectivism"],["Philosophie","philosophy"],["Pluralisme","pluralism"],["Politique","policy"],["Pragmatique","pragmatic"],["Précision","precision"],["Précipitation","precipitation"],["Présence","presence"],["Préservatif","condom"],["Probabilité","probability"],["Problématique","problematic"],["Procès","process"],["Produit","product"],["Progression","progression"],["Proposer","propose"],["Protocole","protocol"],["Publicité","advertising"],["Qualitatif","qualitative"],["Quantitatif","quantitative"],["Raisonnement","reasoning"],["Réactivité","reactivity"],["Récepteur","receptor"],["Réconfortant","comforting"],["Réflexion","reflection"],["Réforme","reform"],["Réglementation","regulation"],["Relationnel","relational"],["Relativité","relativity"],["Remède","remedy"],["Renforcement","reinforcement"],["Réseau","network"],["Responsabilité","responsibility"],["Restructuration","restructuring"],["Rhizome","rhizome"],["Risque","risk"],["Sécurité","security"],["Séduction","seduction"],["Sémantique","semantics"],["Sensibilisation","sensitization"],["Simulation","simulation"],["Sociologie","sociology"],["Solidaire","solidarity"],["Spécialiste","specialist"],["Stratégie","strategy"],["Structurel","structural"],["Subvention","subsidy"],["Supplémentaire","supplementary"],["Synchrone","synchronous"],["Synergie","synergy"],["Tâche","task"],["Technologie","technology"],["Temporel","temporal"],["Théorie","theory"],["Tolérance","tolerance"],["Transfert","transfer"],["Transformation","transformation"],["Transparence","transparency"],["Travailleur","worker"],["Triangle","triangle"],["Typographie","typography"],["Unanimité","unanimity"],["Utilisé","used"],["Valeur ajoutée","added value"],["Variable","variable"],["Visionnaire","visionary"],["Volontaire","voluntary"],["Vulnérabilité","vulnerability"],["Warrant","warrant"],["Xénophobie","xenophobia"],["Y4:0","Y4:0 (rating scale)"],["Zéro","zero"],["Apathique","Apathetic (lacking enthusiasm or concern)"],["Baguenauder","To stroll leisurely; to idle"],["Bêtise","Stupidity; foolishness"],["Brouhaha","Uproar; commotion"],["Cachotterie","Secretiveness; slyness"],["Cahot","Rough jolt (in a vehicle)"],["Charivari","Noisy demonstration of disapproval"],["Chicanerie","Petty argument; quibbling"],["Coquetterie","Flirtatiousness; coquetry"],["Débâcle","Sudden and ignominious failure"],["Déclassé","Having fallen from a higher social class"],["Dégaine","Style; bearing; appearance"],["Délester","To relieve someone of (money or valuables)"],["Démagogie","Demagoguery; appealing to emotions rather than reason"],["Démesuré","Excessive; immoderate"],["Dépaysant","Unusual; unfamiliar; exotic"],["Désabusé","Disillusioned; cynical"],["Désarroi","Confusion; bewilderment"],["Désinvolte","Casual; nonchalant"],["Désolation","Desolation; dejection"],["Désuet","Outdated; obsolete"],["Détournement","Diversion; misappropriation"],["Drôlerie","Amusing peculiarity; oddity"],["Embrouiller","To confuse; to muddle"],["Épatant","Astounding; amazing"],["Éperdu","Wild with excitement; frantic"],["Épicurien","Epicurean; devoted to pleasure"],["Esbroufe","Bluff; pretense; show"],["Escapade","Frolic; escapade"],["Esquiver","To dodge; to evade"],["Fantaisie","Imagination; whimsy"],["Fiasco","Complete failure"],["Ficelle","Trick; ruse"],["Frivole","Frivolous; trivial"],["Gâchis","Waste; mess"],["Gaucherie","Awkwardness; clumsiness"],["Gribouillage","Scribble; doodle"],["Grincer des dents","To grit one's teeth"],["Hésiter","To hesitate; to waver"],["Imbroglio","Complex and confusing situation"],["Indécis","Indecisive; irresolute"],["Indolent","Lazy; idle"],["Insidieux","Insidious; treacherous"],["Intriguant","Intriguing; fascinating"],["Intuition","Intuition; instinct"],["Lambiner","To dawdle; to procrastinate"],["Languir","To languish; to pine"],["Languissant","Languid; listless"],["Lécher","To lick; to lap up"],["Légèreté","Lightness; frivolity"],["Liseron","Morning glory"],["Lugubre","Mournful; gloomy"],["Machination","Plot; scheme"],["Maladresse","Clumsiness; awkwardness"],["Malentendu","Misunderstanding"],["Malice","Malice; spite"],["Malveillance","Malevolence; ill will"],["Méconnaissable","Unrecognizable"],["Médisance","Slander; gossip"],["Mélancolie","Melancholy; sadness"],["Mépris","Contempt; scorn"],["Mériter","To deserve; to merit"],["Mésaventure","Misfortune; mishap"],["Mésentente","Disagreement; discord"],["Mésestimer","To underestimate"],["Mieux-disant","One who outbids another"],["Minutie","Minute detail; meticulousness"],["Misère","Misery; poverty"],["Misogynie","Misogyny; hatred of women"],["Moquerie","Mockery; derision"],["Morne","Dreary; gloomy"],["Navrant","Heartbreaking; distressing"],["Négligence","Negligence; carelessness"],["Obsolescence","Obsolescence; state of being outdated"],["Odious","Odious; hateful"],["Oeuvre","Work (of art, literature, etc.)"],["Ombrage","Suspicion; resentment"],["Omettre","To omit; to leave out"],["Onerer","To burden; to weigh down"],["Oublier","To forget"],["Outrance","Excess; extremity"],["Pâmoison","Fainting fit; swoon"],["Paradoxe","Paradox"],["Parangonner","To compare; to liken"],["Parler","To speak; to talk"],["Parvenir","To succeed; to achieve"],["Passivité","Passivity; inaction"],["Paupière","Eyelid"],["Pavoiser","To decorate (with flags)"],["Pédanterie","Pedantry; ostentatious display of learning"],["Percer","To break through; to succeed"],["Perdre","To lose"],["Perplexité","Perplexity; confusion"],["Persévérance","Perseverance; persistence"],["Perturbation","Disturbance; agitation"],["Pétulance","Petulance; irritability"],["Plaisanterie","Joke; jest"],["Plaisir","Pleasure; delight"],["Plastronner","To boast; to brag"],["Poignard","Dagger"],["Pointe","Point; tip"],["Pointeau","Pencil"]]
  );

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
