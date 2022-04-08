import { useMemo } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from "remix";
import { getUser } from "./session.server";
import { Layout } from "~/Layout";
import { ErrorPage } from "./components/errors";
import {
  unstable_useEnhancedEffect as useEnhancedEffect,
  ThemeProvider,
} from "@mui/material";
import { withEmotionCache } from "@emotion/react";
import { useClientStyle } from "./utils/ClientStyleContext";
import { getTheme, Themes } from "~/themes";
import {
  SettingsConsumer,
  SettingsProvider,
  useSettings,
} from "./utils/SettingsProvider";
import { getThemeSession } from "~/utils/theme.server";

import type { LoaderFunction } from "remix";
import type { LinksFunction, MetaFunction } from "remix";

export type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Indie Stack",
  viewport: "width=device-width,initial-scale=1",
});

export type RootLoaderData = {
  theme: Themes | null | any;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data: RootLoaderData = {
    theme: themeSession.getTheme(),
    user: await getUser(request),
  };

  return data;
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
  theme?: any;
  disableNavigation?: boolean;
}

const Document = withEmotionCache(
  (
    { children, title, theme, disableNavigation = false }: DocumentProps,
    emotionCache
  ) => {
    const clientStyleData = useClientStyle();
    const { theme: settingTheme } = useSettings();

    const themeName: Themes = useMemo(() => {
      return theme || settingTheme || Themes.LIGHT;
    }, [settingTheme, theme]);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={themeName} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          <ThemeProvider theme={getTheme(themeName)}>
            <Layout disableNavigation={disableNavigation}>{children}</Layout>
          </ThemeProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <AppWithProvider>
      <Outlet />
    </AppWithProvider>
  );
}

export function AppWithProvider({ children }: any) {
  const loaderData = useLoaderData<RootLoaderData>();

  return (
    <SettingsProvider specifiedTheme={loaderData.theme}>
      <SettingsConsumer>
        {({ theme }) => <Document theme={theme}>{children}</Document>}
      </SettingsConsumer>
    </SettingsProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();
  if (caught.status === 404) {
    return (
      <AppWithProvider>
        <ErrorPage
          heroProps={{
            title: "404 - Oh no, you found a page that's missing stuff.",
            subtitle: `"${location.pathname}" does not exist in this site.`,
          }}
        />
      </AppWithProvider>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const location = useLocation();
  return (
    <Document title="Something went Wrong" theme="dark" disableNavigation>
      <ErrorPage
        heroProps={{
          title: "500 - Oh no, something did not go well.",
          subtitle: `"${location.pathname}" is currently not working. So sorry.`,
        }}
      />
    </Document>
  );
}
