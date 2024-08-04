"use client";
// This context is used to toggle between light and darkmode
import React, { useState, createContext, ReactNode, useContext } from "react";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
  toggleThemeWithTransition: (time: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = function ({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // For toggling between night and dark mode
  const toggleTheme = () => setIsDarkMode((curTheme) => !curTheme);
  const toggleThemeWithTransition = (time: number) => {
    setTimeout(toggleTheme, time);
  };

  // Custom theme
  const darkMode = createTheme({
    palette: {
      mode: "dark",
      primary: {
        dark: "#00e5ff",
        main: "#00e5ff",
        contrastText: "#baffdd",
      },
      secondary: {
        dark: "#89ff00",
        main: "#89ff00",
        contrastText: "#02527d",
      },
      background: {
        default: "#000e20",
        paper: "#000e41",
      },
    },
  });

  const lightMode = createTheme({
    palette: { mode: "light" },
  });
  return (
    <ThemeContext.Provider
      value={{ toggleTheme, isDarkMode, toggleThemeWithTransition }}
    >
      <MuiThemeProvider theme={isDarkMode ? darkMode : lightMode}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for retrieving the context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
