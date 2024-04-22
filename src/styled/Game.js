import styled from "styled-components";

export const StyledGame = styled.div`
  display: grid;
  height: 75vh; // Max height can adjust according to viewport height
  max-height: 500px;
  grid-template-rows: auto 1fr; // Auto for the header and flexible space for the grid
  grid-template-columns: 1fr 3fr 1fr; // More fluid columns
  padding: 0 20px; // Padding for small screens
  gap: 10px; // Gap between grid items
`;

export const StyledScore = styled.p`
  grid-column: 1;
  justify-self: start; // Aligns the score to the left
  font-size: 1rem; // Smaller font size for smaller screens
  padding-left: 10px;
  text-align: left;
  white-space: nowrap;
`;

export const StyledHeart = styled.p`
  grid-column: 3;
  font-size: 1rem;
  padding-right: 10px;
  text-align: right;
`;

export const StyledTimer = styled.p`
  grid-column: 3;
  font-size: 1rem;
  padding-right: 10px;
  align-self: center;
  text-align: right;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    3,
    minmax(100px, 1fr)
  ); // Adjust min size as needed
  grid-template-rows: repeat(3, 1fr); // Three equal rows
  grid-gap: 2vw; // Use viewport width for dynamic gap sizing
  grid-row: 2; // Default to the second row
  grid-column: 1 / 4; // Span all columns in the second row
  padding: 1vw; // Use viewport width for dynamic padding
  justify-content: center; // Center the grid container within its space
  align-items: start; // Align grid items to start vertically

  @media (max-width: 600px) {
    grid-row: 1; // Move to the first row on small screens
  }

  @media (max-width: 320px) {
    // Targeting very small devices
    GridContainer {
      grid-template-columns: repeat(
        2,
        minmax(40px, 1fr)
      ); // Possibly reduce the number of columns
      grid-gap: 5px; // Reduce the gap
    }
  }
`;

export const StyledCharacter = styled.p`
  font-size: calc(10vw / 3); // Adjust font size based on viewport width
  color: var(--accent-color);
  text-align: center;
  margin: 0;
  transform: translateY(-10%);
`;

export const StyledCard = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--card-bg-color);
  border-radius: 15px;
  display: grid;
  grid-template-rows: 2fr 2fr 1fr 2fr 2fr;
  align-items: start;
  justify-items: center;
  position: relative; // Needed for absolute positioning of the checkmark
`;

export const StyledQuestion = styled.p`
  grid-row: 2; // Place in the second row
  font-size: clamp(
    12px,
    10vw / 3,
    32px
  ); // Adjustable font size with min and max
  color: var(--accent-color);
  text-align: center;
  margin: 0;
`;

export const StyledAnswer = styled.p`
  grid-row: 4; // Place in the fourth row
  font-size: clamp(
    10px,
    12vw / 3,
    38px
  ); // Slightly smaller font size than question
  color: var(--main-text-color);
  text-align: center;
  width: 90%;
  overflow: hidden; // Hides overflow text
  text-overflow: ellipsis; // Adds ellipsis to overflowing text
  white-space: nowrap; // Ensures text stays in a single line
`;

// export const TimeBar = styled.div`
//   width: ${(props) => props.width * 0.75}%;
//   height: 5px;
//   background-color: ${(props) =>
//     props.time <= 3 ? "var(--accent-color)" : "var(--main-text-color)"};
//   transition: width 0.1s linear;
// `;

export const TimeBar = styled.div`
  height: 5px;
  width: var(--time-bar-width);
  background-color: var(--time-bar-color);
  transition: width 0.1s linear;
`;
