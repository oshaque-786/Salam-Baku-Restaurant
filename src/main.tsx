import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
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
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </AuthProvider>
  </StrictMode>
);