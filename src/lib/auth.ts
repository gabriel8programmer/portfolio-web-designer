import bcrypt from "bcryptjs";
import crypto from "node:crypto";

export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export function getSecretKey(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    return "default-gbsoftware-dev-secret-key-32chars!";
  }
  return secret.replace(/^["']|["']$/g, "").trim();
}

export function signPayload(payload: string): string {
  const secret = getSecretKey();
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyPayload(token: string): string | null {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);

  const expectedSignature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payload)
    .digest("hex");

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  return payload;
}

export function createSessionToken(email: string): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = JSON.stringify({ email: email.toLowerCase(), exp: expiresAt });
  return signPayload(Buffer.from(payload).toString("base64url"));
}

export function verifySessionToken(token: string): { email: string } | null {
  try {
    const rawPayload = verifyPayload(token);
    if (!rawPayload) return null;

    const decoded = Buffer.from(rawPayload, "base64url").toString("utf8");
    const session = JSON.parse(decoded) as { email: string; exp: number };

    if (!session.exp || session.exp < Date.now()) {
      return null;
    }

    const rawAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    if (rawAdminEmail) {
      const adminEmail = rawAdminEmail.replace(/^["']|["']$/g, "").trim().toLowerCase();
      if (session.email !== adminEmail) {
        return null;
      }
    }

    return { email: session.email };
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const rawAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const rawAdminHash = process.env.SUPER_ADMIN_PASSWORD_HASH;

  if (!rawAdminEmail || !rawAdminHash) {
    console.error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD_HASH is not set in environment.");
    return false;
  }

  const adminEmail = rawAdminEmail.replace(/^["']|["']$/g, "").trim().toLowerCase();
  const adminHash = rawAdminHash.replace(/^["']|["']$/g, "").trim();
  const normalizedInputEmail = email.trim().toLowerCase();

  if (normalizedInputEmail !== adminEmail) {
    return false;
  }

  // If the configured value is a bcrypt hash
  if (adminHash.startsWith("$2")) {
    try {
      const match = await bcrypt.compare(password, adminHash);
      if (match) return true;
    } catch (e) {
      console.warn("[Auth] Bcrypt comparison error:", e);
    }
  }

  // Graceful fallback: If the admin configured a plaintext password directly in env
  return password === adminHash;
}
