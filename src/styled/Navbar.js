import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavBar = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 20px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stack items vertically on smaller screens
    grid-auto-flow: row;
  }
`;

export const StyledNavBrand = styled.div`
  font-size: 1.4rem;
  text-align: left;

  & > a {
    text-decoration: none;
  }
`;

export const StyleNavItems = styled.ul`
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2 rem;
  transition: color 200ms;

  &:hover {
    color: var(--accent-color);
  }
`;

export const StyleButtonLink = styled.div`
  border: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: var(--accent-color);
  }
`;
