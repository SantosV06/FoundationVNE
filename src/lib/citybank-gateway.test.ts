import test from "node:test";
import assert from "node:assert/strict";
import { citybankFrameOrigin, resolveCitybankGateway } from "./citybank-gateway.ts";

const template = "https://payments.citybank.example/embed?session={token}";
const token = "citybank_token_01";

test("the donations iframe stays closed until City Bank provides a token and an https template", () => {
  assert.deepEqual(resolveCitybankGateway({}), { status: "awaiting-token" });
  assert.deepEqual(resolveCitybankGateway({ token: "   " }), { status: "awaiting-token" });
  assert.deepEqual(resolveCitybankGateway({ token }), { status: "awaiting-url" });
  assert.equal(citybankFrameOrigin(token, ""), null);
  assert.equal(citybankFrameOrigin(), null);
});

test("a valid token is placed only inside the https template and the origin is limited to that host", () => {
  const gateway = resolveCitybankGateway({ token: "abc+def=", iframeUrl: template });
  assert.equal(gateway.status, "ready");
  if (gateway.status !== "ready") return;
  assert.equal(gateway.src, "https://payments.citybank.example/embed?session=abc%2Bdef%3D");
  assert.equal(citybankFrameOrigin("abc+def=", template), "https://payments.citybank.example");
});

test("rejects secrets-in-the-wrong-shape, insecure hosts and templates that ignore the token", () => {
  const rejected = [
    { token: "short", iframeUrl: template },
    { token: "token with spaces", iframeUrl: template },
    { token: "<script>alert(1)</script>", iframeUrl: template },
    { token, iframeUrl: "http://payments.citybank.example/embed?session={token}" },
    { token, iframeUrl: "javascript:alert(1)" },
    { token, iframeUrl: "https://user:pass@payments.citybank.example/{token}" },
    { token, iframeUrl: "https://payments.citybank.example/embed" },
    { token, iframeUrl: "https://127.0.0.1/embed?session={token}" },
    { token, iframeUrl: "https://localhost/embed?session={token}" },
    { iframeUrl: template },
  ];
  for (const input of rejected) {
    const gateway = resolveCitybankGateway(input);
    assert.notEqual(gateway.status, "ready", JSON.stringify(input));
    assert.equal(citybankFrameOrigin(input.token, input.iframeUrl), null);
  }
});
