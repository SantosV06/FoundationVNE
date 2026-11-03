import { createServerFn } from "@tanstack/react-start";
import { resolveCitybankGateway, type CitybankGatewayView } from "./citybank-gateway";

/** Public embed only. Card data never reaches this handler. */
export const getCitybankGateway = createServerFn({ method: "GET" }).handler(
  async (): Promise<CitybankGatewayView> =>
    resolveCitybankGateway({
      token: process.env.CITYBANK_GATEWAY_TOKEN,
      iframeUrl: process.env.CITYBANK_IFRAME_URL,
    }),
);
