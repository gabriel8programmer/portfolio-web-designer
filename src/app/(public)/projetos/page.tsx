import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProjectsGallery } from "@/components/ProjectsGallery";

export const metadata: Metadata = {
  title: "Projetos & Portfólio de Sites | GB Software Solutions",
  description:
    "Confira nossos projetos de websites, landing pages e modelos comerciais desenvolvidos para empresas, clínicas, consultorias e negócios locais.",
};

export const instant = false;

export default async function ProjetosPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.warn("[ProjetosPage] Projects query skipped or table pending migration:", error);
  }

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 block">
            Galeria de Trabalhos
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            Websites & Páginas Comerciais
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
            Projetos focados em estética moderna, navegação rápida no celular e conversão de visitantes em clientes.
          </p>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed shadow-sm">
            <span className="font-semibold text-slate-900 dark:text-slate-200">Transparência:</span> Projetos identificados como{" "}
            <span className="text-amber-700 dark:text-amber-300 font-semibold">Projeto Modelo</span> são demonstrações conceituais desenvolvidas por nossa equipe para ilustrar soluções visuais para cada setor.
          </div>
        </div>

        {/* Gallery */}
        <ProjectsGallery initialProjects={projects} />
      </div>
    </div>
  );
}
