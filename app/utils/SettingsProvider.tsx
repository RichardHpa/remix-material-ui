import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Themes } from "~/themes";

import type { ReactNode } from "react";
import { useFetcher } from "remix";

export interface SettingsContextData {
  theme: Themes | null;
  setTheme: (newTheme: Themes | null) => void;
}

const SettingsContext = createContext<SettingsContextData>({
  theme: Themes.LIGHT,
  setTheme: () => {},
});

interface SettingsProviderProps {
  children: ReactNode;
  specifiedTheme?: Themes;
}

const themes: Array<Themes> = Object.values(Themes);

const prefersLightMQ = "(prefers-color-scheme: light)";
const getPreferredTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Themes.LIGHT : Themes.DARK;

function SettingsProvider({ children, specifiedTheme }: SettingsProviderProps) {
  const [theme, setTheme] = useState<Themes | null>(() => {
    // On the server, if we don't have a specified theme then we should
    // return null and the clientThemeCode will set the theme for us
    // before hydration. Then (during hydration), this code will get the same
    // value that clientThemeCode got so hydration is happy.
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== "object") {
      return null;
    }

    return getPreferredTheme();
  });

  const persistTheme = useFetcher();

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }

    persistTheme.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    console.log("start theme as ", theme);
  }, []);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia(prefersLightMQ);
  //   const handleChange = () => {
  //     setTheme(mediaQuery.matches ? Themes.LIGHT : Themes.DARK);
  //   };
  //   mediaQuery.addEventListener("change", handleChange);
  //   return () => mediaQuery.removeEventListener("change", handleChange);
  // }, []);

  const values = {
    theme,
    setTheme,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

const SettingsConsumer = SettingsContext.Consumer;
export { SettingsContext, SettingsProvider, useSettings, SettingsConsumer };
