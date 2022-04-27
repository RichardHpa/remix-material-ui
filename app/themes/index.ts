import { darkTheme } from "~/themes/dark";
import { lightTheme } from "~/themes/light";

import type { Theme } from "@mui/material";

enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

const themes: Record<Themes, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

function getTheme(themeName: Themes): Theme {
  return themes[themeName];
}

const allThemes: Array<Themes> = Object.values(Themes);
function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && allThemes.includes(value as Themes);
}

export { Themes, getTheme, isTheme };
