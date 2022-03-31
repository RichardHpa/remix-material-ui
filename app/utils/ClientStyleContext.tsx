import { createContext, useContext, useState, useEffect, useRef } from "react";
import createEmotionCache from "~/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { Themes } from "~/themes";
import { Form } from "remix";

import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ClientStyleContextData {
  reset: () => void;
  // theme: Themes | null;
  // setTheme: Dispatch<SetStateAction<Themes | null>>;
  // setTheme: (newTheme: Themes | null) => void;
}

const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {},
  // theme: Themes.LIGHT,
  // setTheme: () => {},
});

//
interface ClientCacheProviderProps {
  children: ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());
  // const [theme, _setTheme] = useState<Themes | null>(Themes.LIGHT);

  // const persistTheme = useFetcher();

  // const persistThemeRef = useRef(persistTheme);
  // useEffect(() => {
  //   persistThemeRef.current = persistTheme;
  // }, [persistTheme]);

  // const mountRun = useRef(false);

  // useEffect(() => {
  //   if (!mountRun.current) {
  //     mountRun.current = true;
  //     return;
  //   }
  //   if (!theme) {
  //     return;
  //   }

  //   persistThemeRef.current.submit(
  //     { theme },
  //     { action: "action/set-theme", method: "post" }
  //   );
  // }, [theme]);

  function reset() {
    setCache(createEmotionCache());
  }

  // const setTheme = (newTheme: Themes | null) => {
  //   _setTheme(newTheme);
  // };

  // useEffect(() => {
  //   console.log("current Theme is ", theme);
  // }, [theme]);

  const values: ClientStyleContextData = {
    reset,
    // theme,
    // setTheme,
  };

  return (
    <ClientStyleContext.Provider value={values}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

function useClientStyle() {
  const context = useContext(ClientStyleContext);
  if (context === undefined) {
    throw new Error("useClientStyle must be used within a useClientStyle");
  }
  return context;
}
export { ClientStyleContext, ClientCacheProvider, useClientStyle };
