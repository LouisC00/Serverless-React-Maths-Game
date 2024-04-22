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
import { stages } from "../utils/stages";

const defaultHeart = 2000000;
const numCards = 9; // Number of cards you want to display

const getStageSettings = (score) => {
  // Find the closest stage that the score qualifies for
  const stage = stages.reduce(
    (acc, stage) => (score >= stage.scoreMin ? stage : acc),
    null
  );
  if (!stage) {
    throw new Error("Invalid score: No stage configuration found.");
  }
  // Randomly select an operation from the available operations in the stage
  const operationConfig =
    stage.operations[Math.floor(Math.random() * stage.operations.length)];
  return operationConfig;
};

const generateCard = (currentScore) => {
  currentScore = 560;
  const { ranges, operation, defaultTime } = getStageSettings(currentScore);

  let num1, num2;

  // Choose num2 within its range
  num2 =
    Math.floor(Math.random() * (ranges[1][1] - ranges[1][0] + 1)) +
    ranges[1][0];

  let question, answer;

  switch (operation) {
    case "÷":
      // Generate multipliers that are not simply powers of 10 to avoid trailing zeros
      const minMultiplier = Math.ceil(ranges[0][0] / num2);
      const maxMultiplier = Math.floor(ranges[0][1] / num2);

      // Ensure there are valid multipliers within the range
      if (minMultiplier <= maxMultiplier) {
        const multiplier =
          Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) +
          minMultiplier;
        num1 = num2 * multiplier;
      } else {
        // Fallback to prevent division by zero or out of range errors
        num1 = num2;
      }

      question = `${num1} ÷ ${num2}`;
      answer = Math.floor(num1 / num2);
      break;

    case "+":
      num1 =
        Math.floor(Math.random() * (ranges[0][1] - ranges[0][0] + 1)) +
        ranges[0][0];
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;

    case "−":
      num1 =
        Math.floor(Math.random() * (ranges[0][1] - ranges[0][0] + 1)) +
        ranges[0][0];
      if (num1 < num2) {
        [num1, num2] = [num2, num1]; // Ensure num1 is larger
      }
      question = `${num1} − ${num2}`;
      answer = num1 - num2;
      break;

    case "×":
      num1 =
        Math.floor(Math.random() * (ranges[0][1] - ranges[0][0] + 1)) +
        ranges[0][0];
      question = `${num1} × ${num2}`;
      answer = num1 * num2;
      break;

    default:
      throw new Error("Unsupported operation");
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

function getFontSize(question) {
  const screenWidth = window.innerWidth;
  let baseSize = 28; // Base font size for larger screens

  // Adjust base size based on screen width
  if (screenWidth <= 320) {
    // Very small devices
    baseSize = 10;
  } else if (screenWidth <= 480) {
    // Small devices
    baseSize = 12;
  }

  // Further adjust based on question length
  if (question.length <= 10) {
    return baseSize;
  } else if (question.length <= 20) {
    return Math.max(baseSize - (question.length - 10) * 1, baseSize * 0.75); // Decrease by up to 25% of the base size
  } else {
    return Math.max(baseSize - (question.length - 10) * 1.5, baseSize * 0.5); // Decrease by up to 50% of the base size
  }
}

export default function Game() {
  const navigate = useNavigate();

  const [cards, setCards] = useState(
    Array.from({ length: numCards }, () => generateCard(360))
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
          <StyledCard key={card.id}>
            <StyledQuestion
              style={{ fontSize: `${getFontSize(card.question)}px` }}
            >
              {card.question}
            </StyledQuestion>
            <StyledAnswer>{card.typed}</StyledAnswer>
            <TimeBar
              style={{
                "--time-bar-width": `${
                  ((card.time - 0.05) / card.defaultTime) * 75
                }%`,
                "--time-bar-color":
                  card.time <= 3
                    ? "var(--accent-color)"
                    : "var(--main-text-color)",
              }}
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
