import { useEffect, useState } from "react";
import { ScoresList, ScoreLI } from "../styled/HighScores";

export default function HighScores() {
  // fetch score data
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const scores = await res.json();
        console.log(scores);
        setHighScores(scores);
      } catch (err) {
        console.log(err);
      }
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <h1>High Scores</h1>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLI key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
