import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Browser idle callback (non-blocking)
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(() => {
    console.log("Idle Loaded");
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);