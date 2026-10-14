import test from "node:test";
import assert from "node:assert";
import {
  isEmailConfigured,
  sendContactNotification,
  getEmailTransporter,
} from "../src/lib/email.ts";

test("Email Service: Gracefully handles missing SMTP credentials", async () => {
  const originalHost = process.env.SMTP_HOST;
  const originalUser = process.env.SMTP_USER;
  const originalPass = process.env.SMTP_PASS;

  try {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;

    assert.strictEqual(isEmailConfigured(), false);
    assert.strictEqual(getEmailTransporter(), null);

    // Should not throw, should return success: true (skipped)
    const result = await sendContactNotification({
      name: "Cliente Teste",
      email: "cliente@teste.com",
      phone: "11999999999",
      message: "Mensagem de teste de envio de e-mail.",
    });

    assert.strictEqual(result.success, true);
  } finally {
    process.env.SMTP_HOST = originalHost;
    process.env.SMTP_USER = originalUser;
    process.env.SMTP_PASS = originalPass;
  }
});

test("Email Service: Detects configured SendPulse API credentials", () => {
  const originalApiId = process.env.SENDPULSE_API_USER_ID;
  const originalApiSecret = process.env.SENDPULSE_API_SECRET;

  try {
    process.env.SENDPULSE_API_USER_ID = "test_user_id";
    process.env.SENDPULSE_API_SECRET = "test_secret";

    assert.strictEqual(isEmailConfigured(), true);
  } finally {
    if (originalApiId !== undefined) {
      process.env.SENDPULSE_API_USER_ID = originalApiId;
    } else {
      delete process.env.SENDPULSE_API_USER_ID;
    }

    if (originalApiSecret !== undefined) {
      process.env.SENDPULSE_API_SECRET = originalApiSecret;
    } else {
      delete process.env.SENDPULSE_API_SECRET;
    }
  }
});

test("Email Service: Detects configured SMTP credentials", () => {
  const originalHost = process.env.SMTP_HOST;
  const originalUser = process.env.SMTP_USER;
  const originalPass = process.env.SMTP_PASS;

  try {
    process.env.SMTP_HOST = "smtp-pulse.com";
    process.env.SMTP_USER = "user@exemplo.com";
    process.env.SMTP_PASS = "secretPass";

    assert.strictEqual(isEmailConfigured(), true);
    const transporter = getEmailTransporter();
    assert.ok(transporter, "Transporter should be created when SMTP is configured");
  } finally {
    process.env.SMTP_HOST = originalHost;
    process.env.SMTP_USER = originalUser;
    process.env.SMTP_PASS = originalPass;
  }
});

