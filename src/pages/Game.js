import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Assuming useNavigate is used for routing
import {
  StyledGame,
  StyledScore,
  StyledHeart,
  GridContainer,
  StyledCard,
  StyledQuestion,
  StyledAnswer,
  TimeBar,
} from "../styled/Game";
import { StrongText } from "../styled/StrongText";
import { useScore } from "../context/ScoreContext";

const defaultHeart = 200;
const numCards = 9; // Number of cards you want to display

const generateCard = (currentScore) => {
  let num1, num2, question, answer, defaultTime;
  if (currentScore < 1) {
    // Stage 1: Simple Addition
    num1 = Math.floor(Math.random() * 100) + 10;
    num2 = Math.floor(Math.random() * 100) + 10;
    question = `${num1} + ${num2}`;
    answer = `${num1 + num2}`;
    defaultTime = 300;
  } else if (currentScore < 2) {
    // Stage 2: Larger Numbers Addition
    num1 = Math.floor(Math.random() * 900) + 100;
    num2 = Math.floor(Math.random() * 900) + 100;
    question = `${num1} + ${num2}`;
    answer = `${num1 + num2}`;
    defaultTime = 60;
  } else if (currentScore < 5) {
    // Stage 3: Simple Multiplication
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    question = `${num1} × ${num2}`;
    answer = `${num1 * num2}`;
    defaultTime = 10;
  } else {
    // Stage 4: Multiplication with Larger Numbers
    num1 = Math.floor(Math.random() * 90) + 10;
    num2 = Math.floor(Math.random() * 90) + 10;
    question = `${num1} × ${num2}`;
    answer = `${num1 * num2}`;
  }
  return {
    id: Math.random(),
    question: question,
    answer: answer.toString(),
    time: defaultTime,
    defaultTime,
    typed: "",
    completed: false,
  };
};

export default function Game() {
  const navigate = useNavigate();

  const [cards, setCards] = useState(
    Array.from({ length: numCards }, () => generateCard(0))
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
              (card) => (card.completed ? generateCard(score) : card) // Replace completed cards with new cards
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
    [cards, typedCardIds, setScore, setHearts]
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
  }, [setHearts]);

  return (
    <StyledGame>
      <StyledScore>
        Score: <StrongText>{score}</StrongText>
      </StyledScore>
      <GridContainer>
        {cards.map((card) => (
          <StyledCard key={card.id}>
            <StyledQuestion>{card.question}</StyledQuestion>
            <StyledAnswer>{card.typed}</StyledAnswer>
            <TimeBar
              width={((card.time - 0.05) / card.defaultTime) * 100}
              time={card.time}
            />
          </StyledCard>
        ))}
      </GridContainer>
      <StyledHeart>
        {hearts}
        {/* {Array.from({ length: hearts }, () => "❤️").join("")} */}
      </StyledHeart>
    </StyledGame>
  );
}
