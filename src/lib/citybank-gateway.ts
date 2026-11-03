// Citibank checkout. The token has to reach the browser, so it is not an API secret,
// but it still stays out of git. Card numbers never come through this file.

export type CitybankGatewayInput = {
  token?: string | null;
  iframeUrl?: string | null;
};

export type CitybankGatewayView =
  { status: "ready"; embed: string } | { status: "awaiting-token" | "awaiting-url" | "invalid" };

export type DonorInput = {
  amount: string;
  name: string;
  email: string;
};

export type DonorFields = {
  amount: string;
  name: string;
  email: string;
};

export type DonorFieldError = "amount" | "name" | "email";

const TOKEN_PATTERN = /^[A-Za-z0-9._~+/=-]{8,512}$/;
const DONOR_PLACEHOLDERS = ["{amount}", "{name}", "{email}"] as const;

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

function originPart(template: string): string {
  const withoutHash = template.split("#", 1)[0] ?? template;
  const beforeQuery = withoutHash.split("?", 1)[0] ?? withoutHash;
  const scheme = beforeQuery.indexOf("//");
  if (scheme === -1) return beforeQuery;
  const path = beforeQuery.indexOf("/", scheme + 2);
  return path === -1 ? beforeQuery : beforeQuery.slice(0, path);
}

function probeEmbed(embed: string): URL | null {
  const probed = embed
    .replaceAll("{amount}", "1.00")
    .replaceAll("{name}", "Ana")
    .replaceAll("{email}", "a@b.co");
  if (probed.includes("{") || probed.includes("%7B")) return null;
  try {
    const url = new URL(probed);
    return isEmbeddableHttps(url) ? url : null;
  } catch {
    return null;
  }
}

export function resolveCitybankGateway(input: CitybankGatewayInput): CitybankGatewayView {
  const token = input.token?.trim() ?? "";
  const template = input.iframeUrl?.trim() ?? "";
  const tokenOk = TOKEN_PATTERN.test(token);

  if (!token && !template) return { status: "awaiting-token" };
  if (!tokenOk) return token ? { status: "invalid" } : { status: "awaiting-token" };
  if (!template) return { status: "awaiting-url" };
  if (!template.includes("{token}")) return { status: "invalid" };
  if (DONOR_PLACEHOLDERS.some((placeholder) => originPart(template).includes(placeholder))) {
    return { status: "invalid" };
  }

  const embed = template.replaceAll("{token}", encodeURIComponent(token));
  if (embed.includes("{token}") || embed.includes("%7Btoken%7D") || !probeEmbed(embed)) {
    return { status: "invalid" };
  }
  return { status: "ready", embed };
}

// Origin for frame-src. Null leaves the baseline CSP alone.
export function citybankFrameOrigin(
  token?: string | null,
  iframeUrl?: string | null,
): string | null {
  const gateway = resolveCitybankGateway({ token, iframeUrl });
  if (gateway.status !== "ready") return null;
  return probeEmbed(gateway.embed)?.origin ?? null;
}

export function parseDonor(
  input: DonorInput,
): { ok: true; donor: DonorFields } | { ok: false; field: DonorFieldError } {
  const amount = parseAmount(input.amount);
  if (!amount) return { ok: false, field: "amount" };
  const name = parseName(input.name);
  if (!name) return { ok: false, field: "name" };
  const email = parseEmail(input.email);
  if (!email) return { ok: false, field: "email" };
  return { ok: true, donor: { amount, name, email } };
}

function parseAmount(raw: string): string | null {
  const trimmed = raw.trim().replace(/\s/g, "");
  if (!trimmed) return null;
  const normalized = /^\d{1,5},\d{1,2}$/.test(trimmed) ? trimmed.replace(",", ".") : trimmed;
  if (!/^\d{1,5}(\.\d{1,2})?$/.test(normalized)) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 1 || value > 25000) return null;
  return value.toFixed(2);
}

function parseName(raw: string): string | null {
  const name = raw.trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 80) return null;
  if (/[<>"{}\\]/.test(name) || [...name].some((char) => char.charCodeAt(0) <= 31)) return null;
  if (!/^[\p{L}\p{M}][\p{L}\p{M} .'\u2019-]*$/u.test(name)) return null;
  if (!/[\p{L}]{2}/u.test(name)) return null;
  return name;
}

function parseEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length < 6 || email.length > 120) return null;
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) return null;
  if (email.includes("..")) return null;
  return email;
}

// Iframe address after the donor confirms. Null if it would leave the bank origin.
export function openCitybankEmbed(embed: string, donor: DonorFields): string | null {
  const base = probeEmbed(embed);
  if (!base) return null;
  const present = {
    amount: embed.includes("{amount}"),
    name: embed.includes("{name}"),
    email: embed.includes("{email}"),
  };
  const href = embed
    .replaceAll("{amount}", encodeURIComponent(donor.amount))
    .replaceAll("{name}", encodeURIComponent(donor.name))
    .replaceAll("{email}", encodeURIComponent(donor.email));
  if (href.includes("{") || href.includes("%7B")) return null;
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (!present.amount) url.searchParams.set("amount", donor.amount);
  if (!present.name) url.searchParams.set("name", donor.name);
  if (!present.email) url.searchParams.set("email", donor.email);
  if (!isEmbeddableHttps(url) || url.origin !== base.origin) return null;
  return url.href;
}
