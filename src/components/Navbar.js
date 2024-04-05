import { Link } from "react-router-dom";
import {
  StyledNavBar,
  StyledNavBrand,
  StyleNavItems,
  StyledLink,
} from "../styled/Navbar";
import { Accent } from "../styled/Accent";

export default function Navbar() {
  return (
    <StyledNavBar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyleNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">High Scores</StyledLink>
        </li>
      </StyleNavItems>
    </StyledNavBar>
  );
}
