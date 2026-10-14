"use client";

import React, { useState, useMemo } from "react";
import { ProjectCard, ProjectCardData } from "./ProjectCard";
import { WhatsAppIcon } from "./Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ProjectsGalleryProps {
  initialProjects: ProjectCardData[];
}

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["Todos", ...Array.from(set)];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Todos") return initialProjects;
    return initialProjects.filter((p) => p.category === selectedCategory);
  }, [initialProjects, selectedCategory]);

  const whatsappUrl = getWhatsAppUrl(
    `Olá! Vi os projetos no site e gostaria de conversar sobre um projeto personalizado para o meu segmento.`
  );

  return (
    <div>
      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
          <p className="text-slate-400 text-base mb-4">
            Nenhum projeto encontrado nesta categoria no momento.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("Todos")}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-sm hover:bg-slate-700"
          >
            Ver todas as categorias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Conversion Banner below gallery */}
      <div className="mt-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Precisa de um site pensado exclusivamente para o seu negócio?
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Desenvolvemos a estrutura completa: identidade visual, fotos dos seus produtos/serviços e botão de WhatsApp direto para os seus clientes.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm sm:text-base font-bold shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Pedir Orçamento Personalizado</span>
        </a>
      </div>
    </div>
  );
}
