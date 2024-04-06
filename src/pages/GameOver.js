import { useNavigate } from "react-router-dom";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";

export default function GameOver() {
  const navigate = useNavigate();

  const [score] = useScore();

  if (score === -1) {
    navigate("/");
  }
  return (
    <div>
      <h1>Game Over</h1>
      <p>{score}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again</StyledLink>
    </div>
  );
}
