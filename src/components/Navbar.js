import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">
          Learn.Build.<span>Type.</span>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/highScores">High Scores</Link>
        </li>
        <li>
          <Link to="/gameOver">Game Over</Link>
        </li>
      </ul>
    </nav>
  );
}
