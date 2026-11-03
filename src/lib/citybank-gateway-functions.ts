import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  openCitybankEmbed,
  parseDonor,
  resolveCitybankGateway,
  type CitybankGatewayView,
  type DonorFieldError,
  type DonorFields,
} from "./citybank-gateway";

export type CitybankGatewayPublic = { status: CitybankGatewayView["status"] };

export type CitybankDonationResult =
  | { ok: true; src: string; donor: DonorFields }
  | { ok: false; field: DonorFieldError }
  | { ok: false; closed: true };

const donorInputSchema = z.object({
  amount: z.string().max(32),
  name: z.string().max(120),
  email: z.string().max(200),
});

function gatewayFromEnv() {
  return resolveCitybankGateway({
    token: process.env.CITIBANK_GATEWAY_TOKEN || process.env.CITYBANK_GATEWAY_TOKEN,
    iframeUrl: process.env.CITIBANK_IFRAME_URL || process.env.CITYBANK_IFRAME_URL,
  });
}

// Status only. The embed address stays on the server until the donor continues.
export const getCitybankGateway = createServerFn({ method: "GET" }).handler(
  async (): Promise<CitybankGatewayPublic> => ({ status: gatewayFromEnv().status }),
);

// Builds the bank iframe address. Does not accept card numbers. Nothing is stored.
export const openCitybankDonation = createServerFn({ method: "POST" })
  .validator(donorInputSchema)
  .handler(async ({ data }): Promise<CitybankDonationResult> => {
    // Keep this public-facing POST consistent with the origin checks used by
    // volunteer and administrative mutations. It only prepares the bank URL;
    // it must not be callable cross-site.
    const { assertTrustedRequest } = await import("./admin-request.server");
    assertTrustedRequest();

    const parsed = parseDonor(data);
    if (!parsed.ok) return { ok: false, field: parsed.field };
    const gateway = gatewayFromEnv();
    if (gateway.status !== "ready") return { ok: false, closed: true };
    const src = openCitybankEmbed(gateway.embed, parsed.donor);
    if (!src) return { ok: false, closed: true };
    return { ok: true, src, donor: parsed.donor };
  });
