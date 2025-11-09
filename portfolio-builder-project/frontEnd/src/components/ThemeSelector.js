import React from "react";
import "./ThemeSelector.css";

function ThemeSelector({ theme, setTheme }) {
  return (
    <div className="theme-selector">
      <button
        className={theme === "light" ? "active" : ""}
        onClick={() => setTheme("light")}
      >
        🌞 Light
      </button>
      <button
        className={theme === "dark" ? "active" : ""}
        onClick={() => setTheme("dark")}
      >
        🌚 Dark
      </button>
      <button
        className={theme === "gradient" ? "active" : ""}
        onClick={() => setTheme("gradient")}
      >
        🌈 Gradient
      </button>
    </div>
  );
}

export default ThemeSelector;
