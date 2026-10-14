import nodemailer from "nodemailer";

interface ContactNotificationParams {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

export function getEmailTransporter() {
  if (!isEmailConfigured()) {
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

export async function sendContactNotification({
  name,
  email,
  phone,
  message,
}: ContactNotificationParams): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getEmailTransporter();
    if (!transporter) {
      console.info(
        `[Email Notification Skipped] SMTP not configured. New message received from: ${name} (${email})`
      );
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
      replyTo: email,
      subject: `Novo Contato do Site: ${name}`,
      text: `Você recebeu uma nova mensagem através do site:\n\nNome: ${name}\nE-mail: ${email}\nTelefone / WhatsApp: ${phone}\n\nMensagem:\n${message}\n`,
      html: `
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
      `,
    };

    await transporter.sendMail(mailOptions);
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
