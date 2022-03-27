import { darkTheme } from "~/themes/dark";
import { lightTheme } from "~/themes/light";

import type { Theme } from "@mui/material";

export type ThemeNames = "dark" | "light";

const themes: Record<ThemeNames, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

export function getTheme(themeName: ThemeNames): Theme {
  return themes[themeName];
}
