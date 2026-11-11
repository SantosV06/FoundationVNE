import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { negotiateLanguage, type Language } from "./translate";
function readLanguageCookie(cookie: string) {
  const value = /(?:^|;\s*)vne-language=(es|en|pt)(?:;|$)/.exec(cookie)?.[1];
  return value === "es" || value === "en" || value === "pt" ? value : undefined;
}

export const preferredLanguage = createIsomorphicFn()
  .server(() => readLanguageCookie(getRequestHeader("cookie") ?? ""))
  .client(() => readLanguageCookie(document.cookie));

export const browserLanguage = createIsomorphicFn()
  .server((): Language | undefined => negotiateLanguage(getRequestHeader("accept-language")))
  .client((): Language | undefined =>
    negotiateLanguage(navigator.languages?.join(",") ?? navigator.language),
  );
