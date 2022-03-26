import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import type { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {}
      : {
          background: {
            default: "#95a5a6",
            paper: "#95a5a6",
          },
        }),
  },
});

export const theme = (mode: PaletteMode) => {
  return createTheme(getTheme(mode));
};

interface MuiThemeProviderProps {
  children: React.ReactNode;
  mode: PaletteMode;
}

export const MuiThemeProvider = ({ mode, children }: MuiThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
