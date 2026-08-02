import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { logger } from "./utils/logger";

// Browser idle callback (non-blocking)
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(() => {
    logger.debug("Idle Loaded");
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>

      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
