import { useState, useEffect } from "react";
import {
  pickRandomPokemons,
  shuffleArray,
  isDuplicated,
} from "./utils/pokemonUtils";
import useData from "./hooks/useData";
import usePokemonData from "./hooks/usePokemonData";
import PokeCard from "./components/PokemonCard";
import PokemonStart from './assets/pokemon-start.gif'
import PokemonWin from './assets/pokemon-win.webp'
import PokemonFail from './assets/pokemon-fail.gif'
import Header from "./components/Header";
import StartCard from "./components/Starter";
import "./App.css";

function App() {
  const data = useData("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");

  const [selectedPokemons, setSelectedPokemons] = useState(null);
  const [pokemonsData, setPokemonsData] = useState();

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [startTitle, setStartTitle] = useState("Welcome to the Pokemon's Memory Game.")
  const [memorizedPokemons, setMemorizedPokemons] = useState([]);
  const [isStart, setIsStart] = useState(true);
  const [win, setWin] = useState(false)
  const [fail, setFail] = useState(false)
  const [giphyURL, setGiphyURL] = useState(PokemonStart)
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [playTime, setPlayTime] = useState(0);

  // Time Counter
  useEffect(() => {
    if (isStart) {
      setPlayTime(0);
      return;
    }

    const timer = setInterval(() => {
      setPlayTime((time) => time + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isStart]);

  const pokemonsDataResult = usePokemonData(selectedPokemons);

  useEffect(() => {
    if (pokemonsDataResult) {
      setPokemonsData(pokemonsDataResult);
      setIsStart(false);
    }
  }, [pokemonsDataResult]);

  function clickCardHandler(name) {
    setMemorizedPokemons([...memorizedPokemons, name]);

    if (isDuplicated([...memorizedPokemons, name])) {
      setStartTitle("Ash! You hit a same pokemon. Let's try again.")
      setFail(true)
      setGiphyURL(PokemonFail)
      setIsStart(true);
      setMemorizedPokemons([]);
      return setCurrentScore(0);
    }

    if ([...memorizedPokemons, name].length === selectedPokemons.length) {
      setStartTitle(`Well done, you win this game with score ${currentScore}. 🏆🎉`)
      if (currentScore > bestScore) setBestScore(currentScore)
      setWin(true)
      setGiphyURL(PokemonWin)
      setIsStart(true)
      setMemorizedPokemons([]);
      return setCurrentScore(0);
    }

    setCurrentScore((prevScore) => prevScore + 1);
    setPokemonsData(shuffleArray(pokemonsData));
  }

  function handleDifficulty(e) {
    setCurrentDifficulty(e.target.value);
  }

  function startBtnHandler() {
    const cDiff = currentDifficulty;

    const difficulty =
      cDiff === "easy"
        ? 6
        : cDiff === "medium"
        ? 12
        : cDiff === "hard"
        ? 18
        : null;

    if (data) {
      setCurrentScore(0);
      setMemorizedPokemons([]);
      setSelectedPokemons(pickRandomPokemons(data.results, difficulty));
    }
  }
  
  return (
    <div className="main-wrapper">
      <Header
        currentScore={currentScore}
        bestScore={bestScore}
        playTime={playTime}
        currentDifficulty={currentDifficulty}
        isStart={isStart}
      />

      {isStart ? (
        <StartCard
          currentDifficulty={currentDifficulty}
          startBtnHandler={startBtnHandler}
          handleDifficulty={handleDifficulty}
          message={startTitle}
          giphyURL={giphyURL}
        />
      ) : (
        <section className="poke-cards-section">
          {pokemonsData &&
            pokemonsData.map((poke, index) => (
              <PokeCard
                pokeData={poke}
                key={`${poke.name} ${index}`}
                handleClick={() => clickCardHandler(poke.name)}
              />
            ))}
        </section>
      )}
    </div>
  );
}

export default App;
