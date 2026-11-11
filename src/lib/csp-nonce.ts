import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export const requestNonce = createIsomorphicFn()
  .server(() => getRequestHeader("x-vne-csp-nonce"))
  .client(() => document.querySelector<HTMLMetaElement>('meta[name="vne-csp-nonce"]')?.content);
