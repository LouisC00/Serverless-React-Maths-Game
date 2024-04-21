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

const getStageSettings = (score) => {
  switch (true) {
    case score < 1:
      // Stage 1: Simple Addition, 2 digits + 2 digits
      return {
        ranges: [
          [1, 100],
          [10, 1000],
        ],
        operation: "+",
        defaultTime: 300,
      };
    case score < 2:
      // Stage 2: Larger Numbers Addition, 3 digits + 3 digits
      return {
        ranges: [
          [100, 1000],
          [100, 1000],
        ],
        operation: "+",
        defaultTime: 60,
      };
    case score < 5:
      // Stage 3: Simple Multiplication, 1 digit × 1 digit
      return {
        ranges: [
          [1, 10],
          [1, 10],
        ],
        operation: "×",
        defaultTime: 10,
      };
    default:
      // Stage 4: Multiplication with Larger Numbers, 2 digits × 2 digits
      return {
        ranges: [
          [10, 100],
          [10, 100],
        ],
        operation: "×",
        defaultTime: 10,
      };
  }
};

const generateCard = (currentScore) => {
  const { ranges, operation, defaultTime } = getStageSettings(currentScore);
  const num1 =
    Math.floor(Math.random() * (ranges[0][1] - ranges[0][0])) + ranges[0][0];
  const num2 =
    Math.floor(Math.random() * (ranges[1][1] - ranges[1][0])) + ranges[1][0];

  let question;
  let answer;
  switch (operation) {
    case "+":
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "×":
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
