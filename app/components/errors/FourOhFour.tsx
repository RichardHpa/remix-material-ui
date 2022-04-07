import { useMatches } from "remix";
import { ErrorPage } from "./ErrorPage";

export function FourOhFour() {
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const pathname = last?.pathname;

  return (
    <ErrorPage
      heroProps={{
        title: "404 - Oh no, you found a page that's missing.",
        subtitle: `"${pathname}" is not a page on this site`,
      }}
    />
  );
}
