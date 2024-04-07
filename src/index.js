import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ScoreProvider } from "./context/ScoreContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-o6sw3kp8b583p1sk.us.auth0.com"
      clientId="nHT6rGAdhvV0Cab34w03g00HPaWBbQqw"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://louis-type-game.netlify.app/",
      }}
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
