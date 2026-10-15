import nodemailer from "nodemailer";

interface ContactNotificationParams {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function isSendPulseApiConfigured(): boolean {
  return Boolean(
    (process.env.SENDPULSE_API_USER_ID || process.env.SENDPULSE_CLIENT_ID) &&
    (process.env.SENDPULSE_API_SECRET || process.env.SENDPULSE_CLIENT_SECRET)
  );
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

export function isEmailConfigured(): boolean {
  return isSendPulseApiConfigured() || isSmtpConfigured();
}

export function getEmailTransporter() {
  if (!isSmtpConfigured()) {
    return null;
  }

  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildEmailHtml({ name, email, phone, message }: ContactNotificationParams): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-top: 0;">Novo Contato Recebido</h2>
      <p style="color: #64748b;">Uma nova solicitação de proposta foi enviada pelo formulário do seu site:</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Telefone / WhatsApp:</strong> ${escapeHtml(phone)}</p>
      <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-radius: 6px;">
        <strong>Mensagem:</strong>
        <p style="white-space: pre-wrap; margin-top: 8px; color: #334155;">${escapeHtml(message)}</p>
      </div>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #94a3b8;">Mensagem gerada automaticamente pelo portfólio GB Software Solutions.</p>
    </div>
  `;
}

function buildEmailText({ name, email, phone, message }: ContactNotificationParams): string {
  return `Você recebeu uma nova mensagem através do site:\n\nNome: ${name}\nE-mail: ${email}\nTelefone / WhatsApp: ${phone}\n\nMensagem:\n${message}\n`;
}

async function getSendPulseAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch("https://api.sendpulse.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`SendPulse auth failed (${res.status}): ${errorBody}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("SendPulse auth response did not include access_token");
  }

  return data.access_token;
}

async function sendViaSendPulseApi(
  params: ContactNotificationParams
): Promise<{ success: boolean; error?: string }> {
  const clientId = process.env.SENDPULSE_API_USER_ID || process.env.SENDPULSE_CLIENT_ID || "";
  const clientSecret = process.env.SENDPULSE_API_SECRET || process.env.SENDPULSE_CLIENT_SECRET || "";

  const token = await getSendPulseAccessToken(clientId, clientSecret);

  const recipient =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.SUPER_ADMIN_EMAIL ||
    "contato@gbsoftwaresolutions.com.br";

  const senderEmail =
    process.env.SENDPULSE_FROM_EMAIL ||
    process.env.SMTP_FROM_EMAIL ||
    process.env.SMTP_FROM ||
    "contato@gbsoftwaresolutions.com.br";

  const senderName = process.env.SENDPULSE_FROM_NAME || "GB Software Solutions";

  const html = buildEmailHtml(params);
  const text = buildEmailText(params);

  const payload = {
    email: {
      subject: `Novo Contato do Site: ${params.name}`,
      html: Buffer.from(html).toString("base64"),
      text,
      from: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          name: "GB Software Solutions",
          email: recipient,
        },
      ],
    },
  };

  const res = await fetch("https://api.sendpulse.com/smtp/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`SendPulse API error (${res.status}): ${errorBody}`);
  }

  return { success: true };
}

async function sendViaSmtp(
  params: ContactNotificationParams
): Promise<{ success: boolean; error?: string }> {
  const transporter = getEmailTransporter();
  if (!transporter) {
    return { success: true };
  }

  const recipient =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.SUPER_ADMIN_EMAIL ||
    "contato@gbsoftwaresolutions.com.br";

  const sender =
    process.env.SMTP_FROM ||
    `"GB Software Solutions" <${process.env.SMTP_USER}>`;

  const mailOptions = {
    from: sender,
    to: recipient,
    replyTo: params.email,
    subject: `Novo Contato do Site: ${params.name}`,
    text: buildEmailText(params),
    html: buildEmailHtml(params),
  };

  const info = await transporter.sendMail(mailOptions);
  console.info(`[Email Sent via SMTP] Para: ${recipient} | MessageId: ${info.messageId}`);
  return { success: true };
}

export async function sendContactNotification(
  params: ContactNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    if (isSendPulseApiConfigured()) {
      return await sendViaSendPulseApi(params);
    }

    if (isSmtpConfigured()) {
      return await sendViaSmtp(params);
    }

    console.info(
      `[Email Notification Skipped] Neither SendPulse API nor SMTP configured. New message received from: ${params.name} (${params.email})`
    );
    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown email error";
    console.error("[Email Notification Error]", errorMsg);
    return { success: false, error: errorMsg };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
