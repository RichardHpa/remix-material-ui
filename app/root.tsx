import { useContext } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
} from "remix";
import { Navbar } from "./components/Navbar";

import type { LinksFunction, MetaFunction } from "remix";

import { getUser } from "./session.server";

import { ErrorPage } from "./components/errors";
import {
  Container,
  createTheme,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from "@mui/material";
import { withEmotionCache } from "@emotion/react";
import ClientStyleContext from "./utils/ClientStyleContext";

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

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

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
          <meta name="theme-color" content={theme.palette.primary.main} />
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
          <Navbar />
          <Container maxWidth="md">{children}</Container>
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
    <Document>
      <Outlet />
    </Document>
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
      <Document>
        <ErrorPage
          heroProps={{
            title: "404 - Oh no, you found a page that's missing stuff.",
            subtitle: `"${location.pathname}" does not exist in this site.`,
          }}
        />
      </Document>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <ErrorPage
        heroProps={{
          title: "App Error.",
          subtitle: error.message,
        }}
      />
    </Document>
  );
}
