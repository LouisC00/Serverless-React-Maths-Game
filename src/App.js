import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/highScores" element={<HighScores />} />
        <Route path="/gameOver" element={<GameOver />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
