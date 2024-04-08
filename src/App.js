import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import { GlobalStyle } from "./styled/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styled/Themes";

function App() {
  const { isLoading } = useAuth0();

  const theme = "light";
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
