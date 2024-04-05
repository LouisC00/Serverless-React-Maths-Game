import CallToAction from "../styled/CallToAction";
import { Accent } from "../styled/Accent";
import { StyledTitle } from "../styled/Title";

export default function Home() {
  return (
    <div>
      <StyledTitle>Ready to Type?</StyledTitle>
      <CallToAction to="/game">
        Click or type <Accent>'s'</Accent> Click to start playing!
      </CallToAction>
    </div>
  );
}
