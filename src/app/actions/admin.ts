"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminCredentials } from "@/lib/auth";
import {
  createAdminSession,
  destroyAdminSession,
  getAdminSession,
} from "@/lib/session";

export interface AdminActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function loginAdminAction(
  prevState: AdminActionResult | null,
  formData: FormData
): Promise<AdminActionResult> {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return {
      success: false,
      message: "Preencha o e-mail e a senha de administrador.",
    };
  }

  const isValid = await verifyAdminCredentials(email, password);
  if (!isValid) {
    return {
      success: false,
      message: "Credenciais de administrador inválidas.",
    };
  }

  await createAdminSession(email);
  revalidatePath("/admin", "layout");
  return {
    success: true,
    message: "",
  };
}

export async function logoutAdminAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export async function createProjectAction(
  prevState: AdminActionResult | null,
  formData: FormData
): Promise<AdminActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Não autorizado." };
  }

  const title = formData.get("title")?.toString().trim() || "";
  let slug = formData.get("slug")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "Website Institucional";
  const shortDescription = formData.get("shortDescription")?.toString().trim() || "";
  const fullDescription = formData.get("fullDescription")?.toString().trim() || null;
  const coverImage = formData.get("coverImage")?.toString().trim() || "";
  const websiteUrl = formData.get("websiteUrl")?.toString().trim() || null;
  const demoVideoUrl = formData.get("demoVideoUrl")?.toString().trim() || null;
  const isDemonstration = formData.get("isDemonstration") === "on";
  const featured = formData.get("featured") === "on";
  const order = parseInt(formData.get("order")?.toString() || "0", 10) || 0;

  const errors: Record<string, string> = {};

  if (!title) errors.title = "O título é obrigatório.";
  if (!shortDescription) errors.shortDescription = "A descrição curta é obrigatória.";
  if (!coverImage) errors.coverImage = "A URL da imagem de capa é obrigatória.";

  if (!slug) {
    slug = slugify(title);
  } else {
    slug = slugify(slug);
  }

  // Check unique slug
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Corrija os erros do formulário.", errors };
  }

  try {
    await prisma.project.create({
      data: {
        title,
        slug,
        category,
        shortDescription,
        fullDescription,
        coverImage,
        websiteUrl,
        demoVideoUrl,
        isDemonstration,
        featured,
        order,
      },
    });

    revalidatePath("/");
    revalidatePath("/projetos");
    revalidatePath("/admin/projetos");
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return { success: false, message: "Erro ao salvar projeto no banco de dados." };
  }

  redirect("/admin/projetos");
}

export async function updateProjectAction(
  projectId: string,
  prevState: AdminActionResult | null,
  formData: FormData
): Promise<AdminActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, message: "Não autorizado." };
  }

  const title = formData.get("title")?.toString().trim() || "";
  let slug = formData.get("slug")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "Website Institucional";
  const shortDescription = formData.get("shortDescription")?.toString().trim() || "";
  const fullDescription = formData.get("fullDescription")?.toString().trim() || null;
  const coverImage = formData.get("coverImage")?.toString().trim() || "";
  const websiteUrl = formData.get("websiteUrl")?.toString().trim() || null;
  const demoVideoUrl = formData.get("demoVideoUrl")?.toString().trim() || null;
  const isDemonstration = formData.get("isDemonstration") === "on";
  const featured = formData.get("featured") === "on";
  const order = parseInt(formData.get("order")?.toString() || "0", 10) || 0;

  const errors: Record<string, string> = {};

  if (!title) errors.title = "O título é obrigatório.";
  if (!shortDescription) errors.shortDescription = "A descrição curta é obrigatória.";
  if (!coverImage) errors.coverImage = "A URL da imagem de capa é obrigatória.";

  if (!slug) {
    slug = slugify(title);
  } else {
    slug = slugify(slug);
  }

  // Check unique slug on other projects
  const existing = await prisma.project.findFirst({
    where: { slug, NOT: { id: projectId } },
  });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Corrija os erros do formulário.", errors };
  }

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        slug,
        category,
        shortDescription,
        fullDescription,
        coverImage,
        websiteUrl,
        demoVideoUrl,
        isDemonstration,
        featured,
        order,
      },
    });

    revalidatePath("/");
    revalidatePath("/projetos");
    revalidatePath("/admin/projetos");
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return { success: false, message: "Erro ao atualizar projeto." };
  }

  redirect("/admin/projetos");
}

export async function deleteProjectAction(projectId: string): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("Não autorizado");

  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/");
  revalidatePath("/projetos");
  revalidatePath("/admin/projetos");
}

export async function toggleProjectFeaturedAction(projectId: string): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("Não autorizado");

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return;

  await prisma.project.update({
    where: { id: projectId },
    data: { featured: !project.featured },
  });

  revalidatePath("/");
  revalidatePath("/projetos");
  revalidatePath("/admin/projetos");
}

export async function toggleMessageReadAction(
  messageId: string,
  currentStatus: boolean
): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("Não autorizado");

  await prisma.contactMessage.update({
    where: { id: messageId },
    data: { read: !currentStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/mensagens");
}

export async function deleteMessageAction(messageId: string): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("Não autorizado");

  await prisma.contactMessage.delete({ where: { id: messageId } });
  revalidatePath("/admin");
  revalidatePath("/admin/mensagens");
}
