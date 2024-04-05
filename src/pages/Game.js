import { useState, useEffect } from "react";
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
  const [score, setScore] = useState(1);
  const MAX_SECOND = 999;
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
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

  const keyUpHandler = (e) => {
    console.log(e.key);
  };

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <StyledGame>
      <StyledScore>
        Score:<StrongText>{score}</StrongText>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <StrongText>
          {addLeadingZeros(seconds, 2)}: {addLeadingZeros(ms, 3)}
        </StrongText>
      </StyledTimer>
    </StyledGame>
  );
}
