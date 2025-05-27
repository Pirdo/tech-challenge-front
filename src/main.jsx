import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import AuthenticationContext from "./context/AuthenticationContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthenticationContext>
        <App />
      </AuthenticationContext>
    </Router>
  </React.StrictMode>
);
