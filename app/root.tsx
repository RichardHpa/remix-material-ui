import {
  json,
  Link,
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
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";

import {
  ThemeProvider,
  useTheme,
  NonFlashOfWrongThemeEls,
} from "~/utils/ThemeProvider";

import { getThemeSession } from "./utils/theme.server";
import { getUser } from "./session.server";

import { Theme } from "~/utils/ThemeProvider";

import { ErrorPage } from "./components/errors";
import { MuiThemeProvider } from "./utils/theme";
import { Container } from "@mui/material";

export type LoaderData = {
  theme: Theme | null;
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
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  return json<LoaderData>({
    user: await getUser(request),
    theme: themeSession.getTheme(),
  });
};

function Document({
  children,
  title = `New Remix Ap`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const data = useLoaderData<LoaderData>();
  const [theme] = useTheme();

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
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        {/* <Navbar /> */}
        <MuiThemeProvider mode={theme!}>
          <Container maxWidth="md">{children}</Container>
        </MuiThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
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
      <html lang="en">
        <head>
          <title>Oh no...</title>
          <Links />
        </head>
        <body>
          <Container maxWidth="md">
            <ErrorPage
              heroProps={{
                title: "404 - Oh no, you found a page that's missing stuff.",
                subtitle: `"${location.pathname}" is not a page on kentcdodds.com. So sorry.`,
              }}
            />
          </Container>

          <Scripts />
        </body>
      </html>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="error-container">
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
