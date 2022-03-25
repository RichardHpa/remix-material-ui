import { Link } from "remix";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export function ErrorPage({ heroProps }: { heroProps: HeroSectionProps }) {
  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: 30,
          }}
        >
          <h1 style={{ fontSize: "2em" }}>{heroProps.title}</h1>
          <p style={{ fontSize: "1.5em" }}>{heroProps.subtitle}</p>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>
      <main className="mx-4 max-w-xl text-gray-900 dark:text-gray-50 sm:mx-auto">
        <h1 className="pb-4 text-4xl font-bold">{heroProps.title}</h1>
        <p className="pb-4 text-lg">{heroProps.subtitle}</p>
        <Link
          to="/"
          className="rounded-xl border-2 border-gray-50 bg-gray-900 py-2 px-4 text-gray-50"
        >
          Return Home
        </Link>
      </main>
    </>
  );
}
