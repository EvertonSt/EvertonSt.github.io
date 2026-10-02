import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageProvider";

const container = document.getElementById("root");

if (!container) {
  // A missing mount point is a deployment error, not a runtime condition to
  // paper over. Failing loudly here beats a blank page with a red console that
  // nobody opens before a recruiter does.
  throw new Error("Mount point #root is missing from index.html");
}

createRoot(container).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
