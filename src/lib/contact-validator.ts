export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
}

export function validateContactInput(input: ContactInput): ContactValidationResult {
  const errors: ContactValidationResult["errors"] = {};

  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name || name.length < 2) {
    errors.name = "Por favor, informe seu nome ou o nome da sua empresa.";
  } else if (name.length > 100) {
    errors.name = "O nome deve conter no máximo 100 caracteres.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Por favor, informe um endereço de e-mail válido.";
  }

  const cleanedPhone = phone.replace(/\D/g, "");
  if (!phone || cleanedPhone.length < 8) {
    errors.phone = "Por favor, informe um número de telefone ou WhatsApp com DDD.";
  }

  if (!message || message.length < 10) {
    errors.message = "Por favor, detalhe em pelo menos 10 caracteres o que sua empresa precisa.";
  } else if (message.length > 2000) {
    errors.message = "A mensagem não pode ultrapassar 2000 caracteres.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
