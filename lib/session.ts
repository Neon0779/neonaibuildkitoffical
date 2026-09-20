import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "neon_admin_session";
const BUYER_COOKIE = "neon_buyer_session";

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);

  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  return secret;
}

export function createAdminSessionToken(expiresAt: number) {
  const payload = Buffer.from(
    JSON.stringify({ exp: expiresAt }),
    "utf8"
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(`admin:${payload}`)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return false;

  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;

    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(`admin:${payload}`)
      .digest("hex");

    if (!safeEqual(signature, expected)) return false;

    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    return typeof parsed.exp === "number" && Date.now() < parsed.exp;
  } catch {
    return false;
  }
}

export function createBuyerSessionToken(
  buyerId: number,
  expiresAt: number
) {
  const payload = Buffer.from(
    JSON.stringify({ buyerId, exp: expiresAt }),
    "utf8"
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(`buyer:${payload}`)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifyBuyerSessionToken(token?: string) {
  if (!token) return null;

  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(`buyer:${payload}`)
      .digest("hex");

    if (!safeEqual(signature, expected)) return null;

    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      typeof parsed.buyerId !== "number" ||
      typeof parsed.exp !== "number" ||
      Date.now() >= parsed.exp
    ) {
      return null;
    }

    return parsed as { buyerId: number; exp: number };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifyAdminSessionToken(store.get(ADMIN_COOKIE)?.value);
}

export async function getBuyerSession() {
  const store = await cookies();
  return verifyBuyerSessionToken(store.get(BUYER_COOKIE)?.value);
}

export const sessionCookies = {
  admin: ADMIN_COOKIE,
  buyer: BUYER_COOKIE,
};
