import { useContext, useEffect, useMemo, useRef } from "react";
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
  useFetcher,
} from "remix";
import type { LoaderFunction } from "remix";

import { Navbar } from "./components/Navbar";

import type { LinksFunction, MetaFunction } from "remix";

import { getUser } from "./session.server";

import { ErrorPage } from "./components/errors";
import {
  Container,
  createTheme,
  unstable_useEnhancedEffect as useEnhancedEffect,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { withEmotionCache } from "@emotion/react";
import { useClientStyle } from "./utils/ClientStyleContext";
// import { Themes } from "./themes";
import { getTheme, Themes } from "~/themes";
import {
  SettingsConsumer,
  SettingsProvider,
  useSettings,
} from "./utils/SettingsProvider";

import { getThemeSession } from "~/utils/theme.server";

export type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

const theme = createTheme({});

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
};

// export const loader: LoaderFunction = async ({
//   request,
// }): Promise<RootLoaderData> => {
//   const themeSession = await getThemeSession(request);
//   // console.log(themeSession);
//   return {
//     themeName: themeSession,
//   };
//   //   // themeName: await getUserTheme(request),
//   // };
// };

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data: RootLoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
  theme?: any;
}

const Document = withEmotionCache(
  ({ children, title, theme }: DocumentProps, emotionCache) => {
    const clientStyleData = useClientStyle();
    const { theme: settingTheme } = useSettings();
    // console.log("clientStyleData", clientStyleData.theme);

    // console.log("loaderData", loaderData?.theme);
    // const themeName: Themes = useMemo(() => {
    //   return loaderData?.theme || clientStyleData.theme || Themes.LIGHT;
    // }, [clientStyleData, loaderData]);
    // const themeName: Themes = useMemo(() => {
    //   return Themes.LIGHT;
    // }, []);

    const themeName: Themes = useMemo(() => {
      return theme || settingTheme || Themes.LIGHT;
    }, [settingTheme, theme]);

    // const persistTheme = useFetcher();

    // const persistThemeRef = useRef(persistTheme);
    // useEffect(() => {
    //   persistThemeRef.current = persistTheme;
    // }, [persistTheme]);

    // const mountRun = useRef(false);

    // useEffect(() => {
    //   // if (mountRun.current) {
    //   //   console.log("already mounted");
    //   // }
    //   if (!mountRun.current) {
    //     // console.log("first mount");
    //     // clientStyleData.setTheme(loaderData?.theme);
    //     mountRun.current = true;
    //     return;
    //   }
    //   if (!theme) {
    //     return;
    //   }

    //   persistThemeRef.current.submit(
    //     { theme: themeName },
    //     { action: "action/set-theme", method: "post" }
    //   );
    // }, [clientStyleData, themeName]);

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

    // // Only executed on client
    // useEnhancedEffect(() => {
    //   // change the theme in style context
    //   clientStyleData.setTheme(themeName);
    // }, [themeName]);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
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
            <CssBaseline />
            <Navbar />
            <Container maxWidth="md">{children}</Container>
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
  // const loaderData = useLoaderData<RootLoaderData>();
  // // console.log("loaderData", loaderData.theme);
  // return (
  //   <SettingsProvider specifiedTheme={loaderData.theme}>
  //     <SettingsConsumer>
  //       {({ theme }) => (
  //         <Document theme={theme}>
  //           <Outlet />
  //         </Document>
  //       )}
  //     </SettingsConsumer>
  //   </SettingsProvider>
  // );
  return (
    <AppWithProvider>
      <Outlet />
    </AppWithProvider>
  );
}

export function AppWithProvider({ children }: any) {
  const loaderData = useLoaderData<RootLoaderData>();
  return (
    <SettingsProvider specifiedTheme={loaderData?.theme}>
      <SettingsConsumer>
        {({ theme }) => <Document theme={theme}>{children}</Document>}
      </SettingsConsumer>
    </SettingsProvider>
  );
}

/*
  What Kent does is he has a $slug file at each route that does a 404 if nothing can be found in the db or mdx. and that uses the ThemeProvider with theme that the user saves

 This catch is if there isnt any set route at all ie /random-url/random-url and this takes the browsers default theme and renders a 404 page

 So I could have a MUI ThemeProvider here that just renders the theme based on the users browser settings. Which should ideally be the same as what is saved
*/

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();
  console.error("CatchBoundary", caught);

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
  return (
    <AppWithProvider>
      <ErrorPage
        heroProps={{
          title: "App Error.",
          subtitle: error.message,
        }}
      />
    </AppWithProvider>
  );
}
