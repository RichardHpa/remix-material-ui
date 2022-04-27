import { createContext, useContext, useState } from "react";
import createEmotionCache from "~/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";

import type { ReactNode } from "react";

export interface ClientStyleContextData {
  reset: () => void;
}

const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {},
});

interface ClientCacheProviderProps {
  children: ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  const values: ClientStyleContextData = {
    reset,
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
