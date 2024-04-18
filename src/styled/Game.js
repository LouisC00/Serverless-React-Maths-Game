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
  font-size: 1rem; // Smaller font size for smaller screens
  padding-left: 10px;
  align-self: center;
  text-align: left;
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
  grid-template-columns: repeat(3, 1fr); // Three equal columns
  grid-template-rows: repeat(3, 1fr); // Three equal rows
  grid-gap: 20px;
  grid-row: 2; // This occupies the entire second row
  grid-column: 1 / 4; // Span all columns in the second row
  padding: 20px;
  justify-content: center; // Center the grid container within its space
  align-items: start; // Align grid items to start vertically
`;

export const StyledCard = styled.div`
  width: 100%; // Full width of the column
  aspect-ratio: 1 / 1; // Maintain a square aspect ratio
  background-color: #383838;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCharacter = styled.p`
  font-size: calc(10vw / 3); // Adjust font size based on viewport width
  color: var(--accent-color);
  text-align: center;
  margin: 0;
  transform: translateY(-10%);
`;
