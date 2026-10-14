import test from "node:test";
import assert from "node:assert";
import { getWhatsAppUrl, getProjectWhatsAppUrl } from "../src/lib/whatsapp.ts";

test("WhatsApp Links: Formats valid wa.me URLs", () => {
  const defaultUrl = getWhatsAppUrl();
  assert.ok(defaultUrl.startsWith("https://wa.me/"));
  assert.ok(defaultUrl.includes("?text="));

  const projectUrl = getProjectWhatsAppUrl("Clínica Bella Vita");
  assert.ok(projectUrl.startsWith("https://wa.me/"));
  assert.ok(projectUrl.includes(encodeURIComponent("Clínica Bella Vita")));
});
