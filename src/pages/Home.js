import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CallToAction from "../styled/CallToAction";
import { Accent } from "../styled/Accent";
import { StyledTitle } from "../styled/Title";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "s") {
        navigate("/game"); // Navigate to the game page when 's' is pressed
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  return (
    <div>
      <StyledTitle>Ready to Solve?</StyledTitle>
      <CallToAction to="/game">
        Click or type <Accent>'s'</Accent> to start playing!
      </CallToAction>
    </div>
  );
}
