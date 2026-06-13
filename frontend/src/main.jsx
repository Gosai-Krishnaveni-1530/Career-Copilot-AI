import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import {
  AnalysisProvider,
} from "./context/AnalysisContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <AnalysisProvider>
    <App />
  </AnalysisProvider>
);
