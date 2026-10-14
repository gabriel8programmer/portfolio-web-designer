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
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block">
            Galeria de Trabalhos
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Websites & Páginas Comerciais
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
            Projetos focados em estética moderna, navegação rápida no celular e conversão de visitantes em clientes.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <span className="font-medium text-slate-300">Transparência:</span> Projetos identificados como{" "}
            <span className="text-amber-300 font-medium">Projeto Modelo</span> são demonstrações conceituais desenvolvidas por nossa equipe para ilustrar soluções visuais para cada setor.
          </div>
        </div>

        {/* Gallery */}
        <ProjectsGallery initialProjects={projects} />
      </div>
    </div>
  );
}
