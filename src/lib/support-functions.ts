import { createServerFn } from "@tanstack/react-start";
import { supportRequestSchema } from "./support-schema.ts";
import { assertTurnstileVerification } from "./turnstile.server.ts";

export const submitSupportRequest = createServerFn({ method: "POST" })
  .validator(supportRequestSchema)
  .handler(async ({ data }) => {
    const { assertTrustedRequest } = await import("./admin-request.server.ts");
    assertTrustedRequest();

    if (data.website) return { ok: true };

    const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
    const expectedHostname =
      process.env.TURNSTILE_EXPECTED_HOSTNAME?.trim() ||
      (() => {
        try {
          return new URL(process.env.SITE_URL ?? "").hostname;
        } catch {
          return "";
        }
      })();

    if (!secret || !expectedHostname) {
      console.error(JSON.stringify({ event: "support:security-not-configured" }));
      throw new Error("El servicio de verificación no está disponible.");
    }

    let verification: { success: boolean; hostname?: string };
    if (
      process.env.CI === "true" &&
      process.env.E2E_LOCAL_DATABASE === "true" &&
      process.env.TURNSTILE_TEST_MODE === "true"
    ) {
      verification = { success: true, hostname: expectedHostname };
    } else {
      try {
        const response = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ secret, response: data.turnstileToken }),
            signal: AbortSignal.timeout(10_000),
          },
        );
        if (!response.ok) throw new Error("Turnstile request failed");
        verification = await response.json();
      } catch {
        throw new Error("No se pudo verificar la seguridad. Inténtalo nuevamente.");
      }
    }
    assertTurnstileVerification(verification, expectedHostname);

    const { turnstileToken: _token, website: _website, ...request } = data;
    const { saveSupportRequest } = await import("./support-service.server.ts");
    const result = await saveSupportRequest(request);

    if (result.created) {
      const { notifyNewSupportRequest } = await import("./brevo-email.server.ts");
      await notifyNewSupportRequest(request);
    }
    return { ok: true };
  });
