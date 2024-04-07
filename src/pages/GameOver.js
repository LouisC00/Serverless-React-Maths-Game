import { useNavigate } from "react-router-dom";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { useEffect, useState } from "react";

export default function GameOver() {
  const navigate = useNavigate();

  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");

  if (score === -1) {
    navigate("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "James", score }),
        };
        const res = await fetch("/.netlify/functions/saveHighScore", options);
        const data = await res.json();
        console.log(data);
        if (data.id) {
          setScoreMessage("Congrats! You got a high score!!");
        } else {
          setScoreMessage("Sorry, not a high score. Keep trying!");
        }
      } catch (err) {
        console.error(err);
      }
    };
    saveHighScore();
  }, [score]);
  return (
    <div>
      <h1>Game Over</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again</StyledLink>
    </div>
  );
}
