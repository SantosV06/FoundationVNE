import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { negotiateLanguage, type Language } from "./translate";
function readLanguageCookie(cookie: string) {
  const value = /(?:^|;\s*)vne-language=(es|en|pt)(?:;|$)/.exec(cookie)?.[1];
  return value === "es" || value === "en" || value === "pt" ? value : undefined;
}
/** Same preference on the server and the first browser render avoids hydration races. */
export const preferredLanguage = createIsomorphicFn()
  .server(() => readLanguageCookie(getRequestHeader("cookie") ?? ""))
  .client(() => readLanguageCookie(document.cookie));
/** Browser language when the visitor has not chosen one. The site default is the fallback. */
export const browserLanguage = createIsomorphicFn()
  .server((): Language | undefined => negotiateLanguage(getRequestHeader("accept-language")))
  .client((): Language | undefined =>
    negotiateLanguage(navigator.languages?.join(",") ?? navigator.language),
  );
