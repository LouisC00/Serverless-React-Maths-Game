import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Global from "./styled/Global";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Main>
        <p>loading...</p>
      </Main>
    );
  }
  return (
    <Router>
      <Global />
      <Main>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && (
          <Container>
            <Navbar />
            <Routes>
              <Route path="/game" element={<Game />} />
              <Route path="/highScores" element={<HighScores />} />
              <Route path="/gameOver" element={<GameOver />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        )}
      </Main>
    </Router>
  );
}

export default App;
