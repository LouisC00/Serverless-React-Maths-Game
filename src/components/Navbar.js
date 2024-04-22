import { Link } from "react-router-dom";
import {
  StyledNavBar,
  StyledNavBrand,
  StyleNavItems,
  StyledLink,
  StyleButtonLink,
} from "../styled/Navbar";
import { Accent } from "../styled/Accent";
import { useAuth0 } from "@auth0/auth0-react";
import { StyledButton } from "../styled/Buttons";

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StyledNavBar>
      <StyledNavBrand>
        <Link to="/">
          I know the<Accent>Maths</Accent>
        </Link>
      </StyledNavBrand>
      <StyleNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <StyleButtonLink onClick={loginWithRedirect}>Login</StyleButtonLink>
        )}
        {isAuthenticated && (
          <StyleButtonLink
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </StyleButtonLink>
        )}
        <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
      </StyleNavItems>
    </StyledNavBar>
  );
}
