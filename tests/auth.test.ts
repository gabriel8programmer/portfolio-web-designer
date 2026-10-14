import test from "node:test";
import assert from "node:assert";
import bcrypt from "bcryptjs";
import {
  verifyAdminCredentials,
  createSessionToken,
  verifySessionToken,
} from "../src/lib/auth.ts";

test("Authentication: verifyAdminCredentials validates correct password", async () => {
  const originalEmail = process.env.SUPER_ADMIN_EMAIL;
  const originalHash = process.env.SUPER_ADMIN_PASSWORD_HASH;

  try {
    const testPassword = "secureTestPassword123!";
    const testHash = await bcrypt.hash(testPassword, 10);
    process.env.SUPER_ADMIN_EMAIL = "admin@gbtest.com";
    process.env.SUPER_ADMIN_PASSWORD_HASH = testHash;

    const isValid = await verifyAdminCredentials("admin@gbtest.com", testPassword);
    assert.strictEqual(isValid, true, "Should accept correct password");

    const isWrongPasswordValid = await verifyAdminCredentials(
      "admin@gbtest.com",
      "wrongPassword"
    );
    assert.strictEqual(
      isWrongPasswordValid,
      false,
      "Should reject wrong password"
    );

    const isWrongEmailValid = await verifyAdminCredentials(
      "other@gbtest.com",
      testPassword
    );
    assert.strictEqual(
      isWrongEmailValid,
      false,
      "Should reject mismatched email"
    );
  } finally {
    process.env.SUPER_ADMIN_EMAIL = originalEmail;
    process.env.SUPER_ADMIN_PASSWORD_HASH = originalHash;
  }
});

test("Authentication: rejects when environment variables are missing", async () => {
  const originalEmail = process.env.SUPER_ADMIN_EMAIL;
  const originalHash = process.env.SUPER_ADMIN_PASSWORD_HASH;

  try {
    delete process.env.SUPER_ADMIN_EMAIL;
    delete process.env.SUPER_ADMIN_PASSWORD_HASH;

    const result = await verifyAdminCredentials("admin@gbtest.com", "pass");
    assert.strictEqual(result, false, "Should safely reject when env vars are missing");
  } finally {
    process.env.SUPER_ADMIN_EMAIL = originalEmail;
    process.env.SUPER_ADMIN_PASSWORD_HASH = originalHash;
  }
});

test("Authentication: issues and validates tamper-proof signed session tokens", () => {
  const originalEmail = process.env.SUPER_ADMIN_EMAIL;
  const originalSecret = process.env.ADMIN_SESSION_SECRET;

  try {
    process.env.SUPER_ADMIN_EMAIL = "admin@gbtest.com";
    process.env.ADMIN_SESSION_SECRET = "super-secret-key-at-least-32-chars-long";

    const token = createSessionToken("admin@gbtest.com");
    assert.ok(token.includes("."), "Token should contain signature separator");

    const validSession = verifySessionToken(token);
    assert.ok(validSession, "Token should verify successfully");
    assert.strictEqual(validSession?.email, "admin@gbtest.com");

    // Tampered token test
    const tampered = token.slice(0, -4) + "XXXX";
    const invalidSession = verifySessionToken(tampered);
    assert.strictEqual(invalidSession, null, "Tampered token should be rejected");
  } finally {
    process.env.SUPER_ADMIN_EMAIL = originalEmail;
    process.env.ADMIN_SESSION_SECRET = originalSecret;
  }
});

test("Authentication: handles quoted env variables and plaintext password fallback", async () => {
  const originalEmail = process.env.SUPER_ADMIN_EMAIL;
  const originalHash = process.env.SUPER_ADMIN_PASSWORD_HASH;

  try {
    // Quoted email and plaintext password (common mistake when users set Vercel envs)
    process.env.SUPER_ADMIN_EMAIL = '"admin@gbtest.com"';
    process.env.SUPER_ADMIN_PASSWORD_HASH = '"MinhaSenhaForte2025!"';

    const isValid = await verifyAdminCredentials("admin@gbtest.com", "MinhaSenhaForte2025!");
    assert.strictEqual(isValid, true, "Should handle quoted email and plaintext password in env");

    const isCaseInsensitiveEmail = await verifyAdminCredentials("ADMIN@gbtest.com ", "MinhaSenhaForte2025!");
    assert.strictEqual(isCaseInsensitiveEmail, true, "Should handle trimmed and case-insensitive email input");
  } finally {
    process.env.SUPER_ADMIN_EMAIL = originalEmail;
    process.env.SUPER_ADMIN_PASSWORD_HASH = originalHash;
  }
});
