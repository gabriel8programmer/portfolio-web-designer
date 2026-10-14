import test from "node:test";
import assert from "node:assert";
import { prisma } from "../src/lib/prisma.ts";

test("Projects CRUD: Can create, retrieve, update and delete a project", async () => {
  const testSlug = `projeto-teste-${Date.now()}`;

  // 1. Create
  const created = await prisma.project.create({
    data: {
      title: "Projeto Teste Automatizado",
      slug: testSlug,
      category: "Website Corporativo",
      shortDescription: "Descrição curta para teste automatizado.",
      fullDescription: "Descrição completa do projeto de teste.",
      coverImage: "https://images.unsplash.com/photo-test",
      websiteUrl: "https://exemplo-teste.com",
      isDemonstration: true,
      featured: true,
      order: 99,
    },
  });

  assert.ok(created.id, "Project should have generated ID");
  assert.strictEqual(created.title, "Projeto Teste Automatizado");
  assert.strictEqual(created.featured, true);
  assert.strictEqual(created.isDemonstration, true);

  // 2. Read
  const fetched = await prisma.project.findUnique({
    where: { id: created.id },
  });
  assert.ok(fetched, "Should find created project");
  assert.strictEqual(fetched?.slug, testSlug);

  // 3. Update
  const updated = await prisma.project.update({
    where: { id: created.id },
    data: {
      title: "Projeto Teste Atualizado",
      featured: false,
    },
  });
  assert.strictEqual(updated.title, "Projeto Teste Atualizado");
  assert.strictEqual(updated.featured, false);

  // 4. Delete
  await prisma.project.delete({
    where: { id: created.id },
  });

  const afterDelete = await prisma.project.findUnique({
    where: { id: created.id },
  });
  assert.strictEqual(afterDelete, null, "Project should be deleted");
});
