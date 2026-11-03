/**
 * City Bank hosted checkout. The bank's embed token is public by nature
 * (the browser must load the iframe) but it is not a secret API key and
 * must never be committed. The iframe URL is a template that includes
 * the literal `{token}` placeholder.
 */

export type CitybankGatewayInput = {
  token?: string | null;
  iframeUrl?: string | null;
};

export type CitybankGatewayView =
  { status: "ready"; src: string } | { status: "awaiting-token" | "awaiting-url" | "invalid" };

const TOKEN_PATTERN = /^[A-Za-z0-9._~+/=-]{8,512}$/;

function isEmbeddableHttps(url: URL): boolean {
  if (url.protocol !== "https:" || url.username || url.password) return false;
  const host = url.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.includes(":")
  ) {
    return false;
  }
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return false;
  return true;
}

export function resolveCitybankGateway(input: CitybankGatewayInput): CitybankGatewayView {
  const token = input.token?.trim() ?? "";
  const template = input.iframeUrl?.trim() ?? "";
  const tokenOk = TOKEN_PATTERN.test(token);

  if (!token && !template) return { status: "awaiting-token" };
  if (!tokenOk) return token ? { status: "invalid" } : { status: "awaiting-token" };
  if (!template) return { status: "awaiting-url" };
  if (!template.includes("{token}")) return { status: "invalid" };

  let url: URL;
  try {
    url = new URL(template.replaceAll("{token}", encodeURIComponent(token)));
  } catch {
    return { status: "invalid" };
  }
  if (!isEmbeddableHttps(url) || url.href.includes("{token}") || url.href.includes("%7Btoken%7D")) {
    return { status: "invalid" };
  }
  return { status: "ready", src: url.href };
}

/** Origin allowed in `frame-src` once the embed URL is valid. Null keeps the baseline CSP. */
export function citybankFrameOrigin(
  token?: string | null,
  iframeUrl?: string | null,
): string | null {
  const gateway = resolveCitybankGateway({ token, iframeUrl });
  if (gateway.status !== "ready") return null;
  return new URL(gateway.src).origin;
}
