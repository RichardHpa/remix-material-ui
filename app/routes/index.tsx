import { Link } from "remix";
// import { useOptionalUser } from "~/utils";

import { Theme, useTheme } from "~/utils/ThemeProvider";

export default function Index() {
  // const user = useOptionalUser();
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 ">
        <button
          className="rounded-xl border-4 border-gray-50 bg-gray-900 py-4 px-28 text-3xl text-gray-50"
          onClick={toggleTheme}
        >
          Current is {theme === Theme.LIGHT ? "Light" : "Dark"} Mode
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 py-8">
        <Link
          to="/random-url"
          className="rounded-xl border-4 border-gray-50 bg-gray-900 py-4 px-28 text-3xl text-gray-50"
        >
          Go to 404 Page
        </Link>
      </div>
      <div className="mx-4 mt-16 max-w-xl text-gray-900 dark:text-gray-50 sm:mx-auto">
        <h1 className="text-4xl font-bold">Hey there 👋</h1>
        <p className="mt-4 text-lg">
          This is a demo for adding a dark mode to a{" "}
          <a
            className="font-medium text-blue-700 hover:underline hover:underline-offset-1 dark:text-blue-400"
            href="https://remix.run/"
          >
            Remix
          </a>{" "}
          app. You can find the code on my{" "}
          <a
            className="font-medium text-blue-700 hover:underline hover:underline-offset-1 dark:text-blue-400"
            href="https://github.com/mattstobbs/remix-dark-mode"
          >
            GitHub
          </a>
          .
        </p>
        <p className="my-1 text-lg">
          You can also find a{" "}
          <a
            className="font-medium text-blue-700 hover:underline hover:underline-offset-1 dark:text-blue-400"
            href="https://github.com/mattstobbs/remix-dark-mode"
          >
            complete guide to Remix dark mode
          </a>{" "}
          on my blog.
        </p>
        <p className="text-lg">
          If you have any questions, feel free to message me on{" "}
          <a
            className="font-medium text-blue-700 hover:underline hover:underline-offset-1 dark:text-blue-400"
            href="https://twitter.com/matt_stobbs"
          >
            Twitter
          </a>
          .
        </p>
      </div>
    </div>
  );
}
