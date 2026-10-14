export function getWhatsAppUrl(customMessage?: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "5511999999999";
  const defaultMessage =
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Olá! Vi seus projetos no site da GB Software Solutions e gostaria de um orçamento para a minha empresa.";

  const text = customMessage || defaultMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function getProjectWhatsAppUrl(projectTitle: string): string {
  return getWhatsAppUrl(
    `Olá! Gostei muito do projeto "${projectTitle}" no portfólio da GB Software Solutions e gostaria de saber mais sobre a criação de um site para a minha empresa.`
  );
}
