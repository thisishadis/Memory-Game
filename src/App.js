import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoise, setFirstChoise] = useState(null);
  const [secondChoise, setSecondChoise] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoise(null);
    setSecondChoise(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handelers
  const choiceHandeler = (card) => {
    console.log(card);
    firstChoise ? setSecondChoise(card) : setFirstChoise(card);
  };

  //use effects

  //compare selected cards
  useEffect(() => {
    if (firstChoise && secondChoise) {
      setDisabled(true);

      if (firstChoise.src == secondChoise.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoise.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstChoise, secondChoise]);

  useEffect(() => {
    shuffleCards();
  }, []);

  //reset choice and count turns
  const resetTurn = () => {
    setFirstChoise(null);
    setSecondChoise(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  

  return (
    <div className="App flex flex-col gap-3">
      <h1>Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((item, index) => (
          <SingleCard
            disabled={disabled}
            choiceHandeler={choiceHandeler}
            item={item}
            key={item.id}
            flipped={item === firstChoise || item === secondChoise || item.matched}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
