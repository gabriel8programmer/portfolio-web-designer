"use server";

import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { validateContactInput } from "@/lib/contact-validator";

export interface ContactActionResult {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
}

export async function submitContactForm(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  const validation = validateContactInput({ name, email, phone, message });

  if (!validation.isValid) {
    return {
      success: false,
      message: "Por favor, corrija os campos indicados abaixo.",
      errors: validation.errors,
    };
  }

  try {
    // 1. Save in database
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      },
    });

    // 2. Send email notification if configured
    await sendContactNotification({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    return {
      success: true,
      message:
        "Obrigado! Sua mensagem foi enviada com sucesso. Retornaremos o contato o mais rápido possível.",
    };
  } catch (error) {
    console.error("Erro ao salvar mensagem de contato:", error);
    return {
      success: false,
      message:
        "Ocorreu um erro temporário ao enviar sua mensagem. Por favor, tente falar diretamente pelo nosso WhatsApp.",
    };
  }
}
