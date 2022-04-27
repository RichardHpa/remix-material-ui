import { createCookieSessionStorage } from "remix";

import { Themes, isTheme } from "~/themes";

const cookieName = "mui-theme-3";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: cookieName,
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get(cookieName);
      return isTheme(themeValue) ? themeValue : Themes.LIGHT;
    },
    setTheme: (theme: Themes) => session.set(cookieName, theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
