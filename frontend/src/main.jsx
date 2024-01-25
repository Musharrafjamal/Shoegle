import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <Auth0Provider
      domain="dev-qbnkdlsbfytbzy17.us.auth0.com"
      clientId="PviD1FdcP2er3wKNqPnNnHryF0VvYVZ0"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
