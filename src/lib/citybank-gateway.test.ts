import test from "node:test";
import assert from "node:assert/strict";
import {
  citybankFrameOrigin,
  openCitybankEmbed,
  parseDonor,
  resolveCitybankGateway,
} from "./citybank-gateway.ts";

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
  assert.equal(gateway.embed, "https://payments.citybank.example/embed?session=abc%2Bdef%3D");
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
    { token, iframeUrl: "https://{name}.citybank.example/embed?session={token}" },
    { iframeUrl: template },
  ];
  for (const input of rejected) {
    const gateway = resolveCitybankGateway(input);
    assert.notEqual(gateway.status, "ready", JSON.stringify(input));
    assert.equal(citybankFrameOrigin(input.token, input.iframeUrl), null);
  }
});

test("donor amount, name and email are checked before they can reach the bank url", () => {
  assert.deepEqual(parseDonor({ amount: "25", name: "Ana María", email: "Ana@Example.com" }), {
    ok: true,
    donor: { amount: "25.00", name: "Ana María", email: "ana@example.com" },
  });
  assert.deepEqual(
    parseDonor({ amount: "25,50", name: "O'Connor", email: "a.b@correo.org" }).ok,
    true,
  );
  for (const input of [
    { amount: "0", name: "Ana", email: "ana@example.com" },
    { amount: "25000.01", name: "Ana", email: "ana@example.com" },
    { amount: "10.999", name: "Ana", email: "ana@example.com" },
    { amount: "veinte", name: "Ana", email: "ana@example.com" },
    { amount: "25", name: "<script>", email: "ana@example.com" },
    { amount: "25", name: "A", email: "ana@example.com" },
    { amount: "25", name: "Ana", email: "no-es-correo" },
    { amount: "25", name: "Ana", email: "ana@example" },
  ]) {
    assert.equal(parseDonor(input).ok, false, JSON.stringify(input));
  }
});

test("a confirmed donation is placed in the bank template without changing its origin", () => {
  const donor = { amount: "50.00", name: "José Pérez", email: "jose@example.com" };
  const plain = resolveCitybankGateway({ token, iframeUrl: template });
  assert.equal(plain.status, "ready");
  if (plain.status !== "ready") return;
  const appended = openCitybankEmbed(plain.embed, donor);
  assert.equal(
    appended,
    "https://payments.citybank.example/embed?session=citybank_token_01&amount=50.00&name=Jos%C3%A9+P%C3%A9rez&email=jose%40example.com",
  );

  const shapedTemplate =
    "https://payments.citybank.example/checkout/{token}?amount={amount}&name={name}&email={email}";
  const shaped = resolveCitybankGateway({ token, iframeUrl: shapedTemplate });
  assert.equal(shaped.status, "ready");
  if (shaped.status !== "ready") return;
  assert.equal(citybankFrameOrigin(token, shapedTemplate), "https://payments.citybank.example");
  assert.equal(
    openCitybankEmbed(shaped.embed, donor),
    "https://payments.citybank.example/checkout/citybank_token_01?amount=50.00&name=Jos%C3%A9%20P%C3%A9rez&email=jose%40example.com",
  );
  assert.equal(openCitybankEmbed("https://{name}.citybank.example/pay", donor), null);
});
