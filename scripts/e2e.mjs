/** Local QA only. Run against an explicitly started local dev or built preview. */
import assert from "node:assert/strict";
import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "playwright";
import { TOTP } from "otpauth";
import { catalog } from "../src/lib/i18n/catalog.ts";

const base = process.argv[2] || "http://127.0.0.1:8080";
const parsedBase = new URL(base);
if (
  !["http:", "https:"].includes(parsedBase.protocol) ||
  (!["127.0.0.1", "localhost", "::1", "[::1]"].includes(parsedBase.hostname) &&
    process.env.BROWSER_ALLOW_EXTERNAL_HOST !== "1")
) {
  throw new Error("E2E only targets a local HTTP(S) server unless BROWSER_ALLOW_EXTERNAL_HOST=1.");
}
const built = process.argv.includes("--built");
// GitHub runners do not have write access to /workspace. Keep local QA captures there.
const screenshots = process.env.GITHUB_WORKSPACE
  ? `${process.env.GITHUB_WORKSPACE}/screenshots`
  : "/workspace/screenshots";
mkdirSync(screenshots, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const excludedExternalHosts = new Set();
const errors = [];
try {
  const context = await browser.newContext();
  // Turnstile is an external anti-bot service. In E2E only, replace its browser
  // SDK with a deterministic test double. The validate job also sets
  // TURNSTILE_TEST_MODE, so the server skips Cloudflare siteverify.
  await context.route(
    /^https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js(?:\?.*)?$/,
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: `(() => {
          const token = "XXXX.DUMMY.TOKEN.XXXX";
          window.turnstile = {
            render(container, options = {}) {
              const id = "e2e-turnstile-widget";
              queueMicrotask(() => options.callback?.(token));
              return id;
            },
            reset(widgetId) {},
            remove(widgetId) {},
            getResponse(widgetId) { return token; },
            isExpired(widgetId) { return false; },
          };
          const callbackName = new URL(document.currentScript.src).searchParams.get("onload");
          if (callbackName && typeof window[callbackName] === "function") {
            window[callbackName]();
          }
        })();`,
      });
    },
  );
