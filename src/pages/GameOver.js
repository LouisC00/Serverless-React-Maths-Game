import { useNavigate } from "react-router-dom";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Title";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function GameOver() {
  const navigate = useNavigate();

  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (score === -1) {
      navigate("/");
    }
  }, [navigate, score]);

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently();
        const options = {
          method: "POST",
          body: JSON.stringify({ score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch("/.netlify/functions/saveHighScore", options);
        const data = await res.json();

        if (data.id) {
          setScoreMessage("Congrats! You got a high score!!");
        } else {
          setScoreMessage("Sorry, not a high score. Keep trying!");
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [getAccessTokenSilently, isAuthenticated, score]);

  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <h2>You should log in or sign up to compete for high scores!</h2>
      )}
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again</StyledLink>
      </div>
    </div>
  );
}
