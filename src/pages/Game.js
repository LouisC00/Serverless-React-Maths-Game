import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from "../styled/Game";

import { StrongText } from "../styled/StrongText";

export default function Game() {
  return (
    <StyledGame>
      <StyledScore>
        Score:<StrongText>0</StrongText>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: <StrongText>00: 000</StrongText>
      </StyledTimer>
    </StyledGame>
  );
}
