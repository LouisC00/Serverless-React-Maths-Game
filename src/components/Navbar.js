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

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        <StyleButtonLink onClick={toggleTheme}>Toggle Theme</StyleButtonLink>
      </StyleNavItems>
    </StyledNavBar>
  );
}
