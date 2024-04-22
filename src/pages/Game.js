import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Assuming useNavigate is used for routing
import {
  StyledGame,
  StyledScore,
  StyledHeart,
  GridContainer,
} from "../styled/Game";
import { StrongText } from "../styled/StrongText";
import { useScore } from "../context/ScoreContext";
import { generateCard } from "../utils/generateCard";
import Card from "../components/Card";

const defaultHeart = 3;
const numCards = 9; // Number of cards you want to display

export default function Game() {
  const navigate = useNavigate();

  const [cards, setCards] = useState(
    Array.from({ length: numCards }, () => generateCard(300))
  );
  const [hearts, setHearts] = useState();
  const [score, setScore] = useScore();
  const [typedCardIds, setTypedCardIds] = useState([]);

  useEffect(() => {
    setScore(0);
    setHearts(defaultHeart);
  }, [setScore]);

  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;
      if (key < "0" || key > "9") return;

      let matches = [];
      let completedCard = false;

      const newCards = cards.map((card) => {
        const updatedTyped = card.typed + key;
        const isBeingTyped =
          typedCardIds.length === 0 || typedCardIds.includes(card.id);

        if (isBeingTyped && card.answer.startsWith(updatedTyped)) {
          if (updatedTyped === card.answer) {
            completedCard = true;
            return { ...card, typed: updatedTyped, completed: true }; // Mark the current card as
          }
          matches.push(card.id);
          return { ...card, typed: updatedTyped };
        }

        return typedCardIds.includes(card.id) ? { ...card, typed: "" } : card;
      });

      setCards(newCards);

      if (completedCard) {
        setTimeout(() => {
          // Add a delay to allow the fade-out animation to play
          setCards(
            newCards.map(
              (card) =>
                card.completed ? generateCard(score) : { ...card, typed: "" } // Replace completed cards with new cards and clear typed for others
            )
          );
        }, 100);
        setScore((prevScore) => prevScore + 1);
        matches = [];
      } else if (matches.length === 0) {
        setHearts((prevHearts) => Math.max(0, prevHearts - 1));
        const resetCards = newCards.map((card) => ({ ...card, typed: "" }));
        const finalCards = resetCards.map((card) => {
          if (card.typed === "" && card.answer.startsWith(key)) {
            matches.push(card.id);
            return { ...card, typed: key };
          }
          return card;
        });
        setCards(finalCards);
      } else {
        setCards(newCards);
      }

      setTypedCardIds(matches);
    },
    [cards, typedCardIds, setScore, setHearts, score]
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
          if (card.time > 0) {
            return { ...card, time: card.time - 0.1 };
          } else {
            setHearts((hearts) => Math.max(0, hearts - 1));
            return generateCard(score); // Generate a new card when time expires
          }
        })
      );
    }, 100);

    return () => clearInterval(intervalId);
  }, [setHearts, score]);

  return (
    <StyledGame>
      <StyledScore>
        Score: <StrongText>{score}</StrongText>
      </StyledScore>
      <GridContainer>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </GridContainer>
      <StyledHeart>
        {Array.from({ length: hearts }, () => "❤️").join("")}
      </StyledHeart>
    </StyledGame>
  );
}
