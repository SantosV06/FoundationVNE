import { randomBytes } from "node:crypto";
import { citybankFrameOrigin } from "../../src/lib/citybank-gateway.ts";
import config from "../../vercel.json";

interface SecurityEvent {
  req: Request;
  url: URL;
}

function withCitybankFrame(policy: string): string {
  const origin = citybankFrameOrigin(
    process.env.CITYBANK_GATEWAY_TOKEN,
    process.env.CITYBANK_IFRAME_URL,
  );
  if (!origin || policy.includes(` ${origin}`)) return policy;
  return policy.replace("frame-src 'self'", `frame-src 'self' ${origin}`);
}

export default async function securityHeaders(
  event: SecurityEvent,
  next: () => unknown | Promise<unknown>,
) {
  if (event.req.method !== "GET") return next();

  // Generate before SSR so hydration and theme scripts use the response nonce.
  const nonce = randomBytes(18).toString("base64");
  event.req.headers.set("x-vne-csp-nonce", nonce);
  const response = await next();
  if (
    !(response instanceof Response) ||
    !response.headers.get("content-type")?.includes("text/html")
  )
    return response;

  const baseline = config.headers[0].headers.find(
    (header) => header.key === "Content-Security-Policy",
  )!.value;
  const policy = withCitybankFrame(
    baseline.replace("script-src 'self' 'unsafe-inline'", `script-src 'self' 'nonce-${nonce}'`),
  );
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", policy);
  headers.set("Cache-Control", "private, no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
