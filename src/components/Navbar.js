import { Link } from "react-router-dom";
import {
  StyledNavBar,
  StyledNavBrand,
  StyleNavItems,
  StyledLink,
} from "../styled/Navbar";
import { Accent } from "../styled/Accent";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
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
        {!isAuthenticated && <button onClick={loginWithRedirect}>Login</button>}
        {isAuthenticated && (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        )}
      </StyleNavItems>
    </StyledNavBar>
  );
}
