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
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

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
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

function Document({
  children,
  title = `New Remix Ap`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
        <meta
          name="emotion-insertion-point"
          content="emotion-insertion-point"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
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
