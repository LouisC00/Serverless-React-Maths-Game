import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from "../styled/Game";

import { StrongText } from "../styled/StrongText";

const addLeadingZeros = (num, length) => {
  return String(num).padStart(length, "0");
};

export default function Game() {
  const MAX_SECOND = 999;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  const [currentCharacter, setCurrentCharacter] = useState("");

  const [score, setScore] = useState(1);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    setRandomCharacter();
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
  }, []);

  useEffect(() => {
    if (seconds <= -1) {
      navigate("/gameOver"); // Use navigate instead of history.push
    }
  }, [seconds, ms, navigate]);

  const keyDownHandler = useCallback(
    (e) => {
      console.log(e.key);
      if (e.key == currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
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
        Score:<StrongText>{score}</StrongText>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <StrongText>
          {addLeadingZeros(seconds, 2)}: {addLeadingZeros(ms, 3)}
        </StrongText>
      </StyledTimer>
    </StyledGame>
  );
}
