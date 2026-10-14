import test from "node:test";
import assert from "node:assert";
import { validateContactInput } from "../src/lib/contact-validator.ts";
import { prisma } from "../src/lib/prisma.ts";

test("Contact Validation: Flags missing or invalid fields accurately", () => {
  // Empty input
  const emptyResult = validateContactInput({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  assert.strictEqual(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name, "Should flag missing name");
  assert.ok(emptyResult.errors.email, "Should flag missing email");
  assert.ok(emptyResult.errors.phone, "Should flag missing phone");
  assert.ok(emptyResult.errors.message, "Should flag missing message");

  // Invalid email format
  const invalidEmail = validateContactInput({
    name: "Empresa Silva",
    email: "not-an-email",
    phone: "11999999999",
    message: "Gostaria de criar um website corporativo completo.",
  });
  assert.strictEqual(invalidEmail.isValid, false);
  assert.ok(invalidEmail.errors.email, "Should flag invalid email pattern");

  // Too short phone
  const shortPhone = validateContactInput({
    name: "Empresa Silva",
    email: "contato@empresa.com.br",
    phone: "123",
    message: "Gostaria de criar um website corporativo completo.",
  });
  assert.strictEqual(shortPhone.isValid, false);
  assert.ok(shortPhone.errors.phone, "Should flag short phone");

  // Too short message
  const shortMsg = validateContactInput({
    name: "Empresa Silva",
    email: "contato@empresa.com.br",
    phone: "11999999999",
    message: "Oi",
  });
  assert.strictEqual(shortMsg.isValid, false);
  assert.ok(shortMsg.errors.message, "Should flag message shorter than 10 chars");

  // Valid input
  const valid = validateContactInput({
    name: "Empresa Silva",
    email: "contato@empresa.com.br",
    phone: "(11) 99999-9999",
    message: "Gostaria de solicitar um orçamento para o site da minha empresa.",
  });
  assert.strictEqual(valid.isValid, true);
  assert.strictEqual(Object.keys(valid.errors).length, 0);
});

test("Contact Persistence: Successfully stores contact inquiries in database", async () => {
  const testEmail = `lead-${Date.now()}@cliente.com.br`;

  const created = await prisma.contactMessage.create({
    data: {
      name: "Cliente Em Potencial",
      email: testEmail,
      phone: "(11) 98888-7777",
      message: "Tenho uma clínica médica e quero um site com agendamento via WhatsApp.",
      read: false,
    },
  });

  assert.ok(created.id, "Contact message should have generated ID");
  assert.strictEqual(created.read, false);
  assert.strictEqual(created.email, testEmail);

  // Toggle read status
  const updated = await prisma.contactMessage.update({
    where: { id: created.id },
    data: { read: true },
  });
  assert.strictEqual(updated.read, true);

  // Clean up
  await prisma.contactMessage.delete({
    where: { id: created.id },
  });

  const check = await prisma.contactMessage.findUnique({
    where: { id: created.id },
  });
  assert.strictEqual(check, null);
});
