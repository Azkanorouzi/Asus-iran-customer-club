"use client";
import { FormControlLabel, Switch } from "@mui/material";

import { useThemeContext } from "@/contexts/ThemeProvider";
import CustomSwitch from "./CustomSwitch";

export default function ThemeToggler() {
  const { isDarkMode, toggleThemeWithTransition } = useThemeContext();
  return (
    <FormControlLabel
      control={
        <CustomSwitch
          isDark={isDarkMode}
          onChange={toggleThemeWithTransition}
        />
      }
      label="Dark mode"
    />
  );
}
