import { json, LoaderFunction, useCatch, useLoaderData } from "remix";
import { FourOhFour, ErrorPage } from "~/components/errors";
import { getThemeSession } from "~/utils/theme.server";
import { Theme } from "~/utils/ThemeProvider";

export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data = {
    theme: themeSession.getTheme(),
  };
  // return json(data);
  const headers = {
    "Cache-Control": "private, max-age=3600",
    Vary: "Cookie",
  };
  throw json(data, { status: 404, headers });
};

export default function GetSingleFile() {
  const data = useLoaderData<LoaderData>();
  console.log(data);
  return (
    <div className="mx-4 max-w-xl text-gray-900 dark:text-gray-50 sm:mx-auto">
      <h1 className="text-4xl font-bold">Hey there 👋</h1>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught.data.theme);
  console.error("CatchBoundary", caught);
  if (caught.data.theme) {
    return <FourOhFour />;
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
