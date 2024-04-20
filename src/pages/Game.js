import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Assuming useNavigate is used for routing
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  GridContainer,
  StyledCard,
  StyledCharacter,
} from "../styled/Game";
import { StrongText } from "../styled/StrongText";
import { useScore } from "../context/ScoreContext";

const defaultTime = 500;
const defaultHeart = 300;
const numCards = 9; // Number of cards you want to display

const generateCard = () => {
  const num1 = Math.floor(Math.random() * 20) + 10;
  const num2 = Math.floor(Math.random() * 20) + 10;
  return {
    id: Math.random(),
    question: `${num1} + ${num2}`,
    answer: `${num1 + num2}`,
    time: defaultTime,
    typed: "",
  };
};

export default function Game() {
  const [cards, setCards] = useState(
    Array.from({ length: numCards }, generateCard)
  );
  const [hearts, setHearts] = useState();
  const [score, setScore] = useScore();
  const [typedCardIds, setTypedCardIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setScore(0);
    setHearts(defaultHeart);
  }, [setScore]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key >= "0" && event.key <= "9") {
        let newInput = event.key;
        let matches = [];
        let correctInput = false;
        let completedCard = false; // Flag to indicate card completion

        const newCards = cards.map((card) => {
          if (
            (typedCardIds.length === 0 || typedCardIds.includes(card.id)) &&
            card.answer.startsWith(card.typed + newInput)
          ) {
            let updatedTyped = card.typed + newInput;
            correctInput = true;
            if (updatedTyped === card.answer) {
              completedCard = true; // Set the completion flag
              setScore((score) => score + 1); // Increment score
              return generateCard(); // Generates a new card
            }
            matches.push(card.id); // Track card as matched
            return { ...card, typed: updatedTyped };
          }
          return card;
        });

        if (completedCard) {
          // If a card is completed, reset all typings
          const resetCards = newCards.map((card) => ({ ...card, typed: "" }));
          setCards(resetCards);
        } else if (!correctInput) {
          // Reduce hearts only if no correct input
          setHearts((hearts) => Math.max(0, hearts - 1));
          // Reset the typing on all cards
          const resetCards = newCards.map((card) => ({ ...card, typed: "" }));
          // Check for any potential matches with new input among reset cards
          const finalCards = resetCards.map((card) => {
            if (card.typed === "" && card.answer.startsWith(newInput)) {
              return { ...card, typed: newInput };
            }
            return card;
          });
          setCards(finalCards);
        } else {
          setCards(newCards); // Update cards state with correct input
        }

        setTypedCardIds(matches); // Update which cards are being typed
      }
    },
    [cards, typedCardIds, setScore, setHearts] // Update dependencies to include setHearts
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]); // handleKeyDown is now stable across renders

  useEffect(() => {
    if (hearts <= 0) {
      navigate("/gameOver");
    }
  }, [hearts, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.time > 1) {
            return { ...card, time: card.time - 1 };
          } else {
            setHearts((hearts) => Math.max(0, hearts - 1));
            return generateCard(); // Generate a new card when time expires
          }
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledGame>
      <StyledScore>
        Score: <StrongText>{score}</StrongText>
      </StyledScore>
      <GridContainer>
        {cards.map((card, i) => (
          <StyledCard key={card.id}>
            <StyledCharacter>{card.question}</StyledCharacter>
            <StyledCharacter>{card.typed}</StyledCharacter>
          </StyledCard>
        ))}
      </GridContainer>
      <div>Hearts: {hearts}</div>
    </StyledGame>
  );
}
