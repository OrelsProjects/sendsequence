import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  // Add locales you want in the app
  locales: ["en", "de", "es"],

  // Default locale if no match
  defaultLocale: "en",
  localePrefix: "always",
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(de|es|en)/:page*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    // "/([\\w-]+)?/users/(.+)",
  ],
};
