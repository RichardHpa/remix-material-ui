import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

import { ClientCacheProvider } from "./utils/ClientStyleContext";

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
