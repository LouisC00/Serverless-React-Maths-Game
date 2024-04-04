import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Container } from "./styled/Container";

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/highScores" element={<HighScores />} />
          <Route path="/gameOver" element={<GameOver />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
