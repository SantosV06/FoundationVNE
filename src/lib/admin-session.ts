import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_SECONDS = 8 * 60 * 60;
export function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  if (secret.length < 32)
    throw new Error("Configura ADMIN_SESSION_SECRET con al menos 32 caracteres en Vercel.");
  return secret;
}
export function adminSettings() {
  const secret = sessionSecret();
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (password.length < 14)
    throw new Error("Configura ADMIN_PASSWORD con al menos 14 caracteres en Vercel.");
  return { password, secret };
}


export function constantEquals(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  const length = Math.max(left.length, right.length, 1);
  const paddedLeft = Buffer.alloc(length);
  const paddedRight = Buffer.alloc(length);
  left.copy(paddedLeft);
  right.copy(paddedRight);
  const sameLength = left.length === right.length;
  const sameBytes = timingSafeEqual(paddedLeft, paddedRight);
  return sameLength && sameBytes;
}
export const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");
export const newSessionToken = () => randomBytes(32).toString("base64url");
export const validSessionToken = (token: string) => /^[A-Za-z0-9_-]{43}$/.test(token);



export const credentialVersion = (storedHash: string, secret: string) =>
  createHmac("sha256", secret).update(storedHash).digest("hex");
