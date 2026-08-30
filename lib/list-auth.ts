export const LIST_SESSION_COOKIE = "list_session";

const encoder = new TextEncoder();
const SESSION_PAYLOAD = "list-session-v1";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = process.env.LIST_AUTH_SECRET;
  if (!secret) {
    throw new Error("LIST_AUTH_SECRET is not set");
  }
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

export async function createSessionToken(): Promise<string> {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(SESSION_PAYLOAD),
  );
  return toHex(signature);
}

export async function isValidSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }
  const expected = await createSessionToken();
  return token === expected;
}

export function checkCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.LIST_AUTH_USER;
  const expectedPassword = process.env.LIST_AUTH_PASSWORD;
  if (!expectedUser || !expectedPassword) {
    return false;
  }
  return username === expectedUser && password === expectedPassword;
}
