// Card.js
import React from "react";
import {
  StyledCard,
  StyledQuestion,
  StyledAnswer,
  TimeBar,
} from "../styled/Game";
import { getFontSize } from "../utils/utils";

const Card = ({ card }) => (
  <StyledCard>
    <StyledQuestion style={{ fontSize: `${getFontSize(card.question)}px` }}>
      {card.question}
    </StyledQuestion>
    <StyledAnswer>{card.typed}</StyledAnswer>
    <TimeBar
      style={{
        "--time-bar-width": `${((card.time - 0.05) / card.defaultTime) * 75}%`,
        "--time-bar-color":
          card.time <= 3 ? "var(--accent-color)" : "var(--main-text-color)",
      }}
    />
  </StyledCard>
);

export default Card;
