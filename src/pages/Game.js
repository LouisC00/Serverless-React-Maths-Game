import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

const addLeadingZeros = (num, length) => {
  return String(num).padStart(length, "0");
};

export default function Game() {
  const MAX_SECOND = 50;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  const [currentCharacter, setCurrentCharacter] = useState("");

  const [score, setScore] = useScore();
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const startTime = new Date();
    const interval = setInterval(() => {
      const endTime = new Date();
      const msPassed = endTime.getTime() - startTime.getTime();
      const remainingSeconds = MAX_SECOND - Math.floor(msPassed / 1000);
      const remainingMs = 1000 - (msPassed % 1000);
      setSeconds(remainingSeconds);
      setMs(remainingMs);
    }, 1);
    return () => clearInterval(interval);
  }, [setScore]);

  useEffect(() => {
    if (seconds <= -1) {
      navigate("/gameOver"); // Use navigate instead of history.push
    }
  }, [seconds, ms, navigate]);

  const keyDownHandler = useCallback(
    (e) => {
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter, score, setScore]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  // useEffect(() => {
  //   const keyDownHandler = (e) => {
  //     if (e.key === currentCharacter) {
  //       setScore((prevScore) => prevScore + 1);
  //     } else {
  //       if (score > 0) {
  //         setScore((prevScore) => prevScore - 1);
  //       }
  //     }
  //     setRandomCharacter();
  //   };

  //   document.addEventListener("keydown", keyDownHandler);
  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, [currentCharacter]);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  return (
    <StyledGame>
      <StyledScore>
        Score: <StrongText>{score}</StrongText>
      </StyledScore>
      <GridContainer>
        {Array.from({ length: 9 }, (_, i) => (
          <StyledCard key={i}>
            <StyledCharacter>{currentCharacter}</StyledCharacter>
          </StyledCard>
        ))}
      </GridContainer>
      <StyledTimer>
        Time:{" "}
        <StrongText>
          {addLeadingZeros(seconds, 2)}:{addLeadingZeros(ms, 3)}
        </StrongText>
      </StyledTimer>
    </StyledGame>
  );
}
