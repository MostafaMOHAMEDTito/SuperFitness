import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Detect saved locale (assumes 'ar' or 'en')
const savedLocale = localStorage.getItem("locale") || "en";

// Apply direction to <html> tag
document.documentElement.setAttribute("dir", savedLocale === "ar" ? "rtl" : "ltr");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
