import React from "react";
import Image from "next/image";
import { ExternalLinkIcon, WhatsAppIcon } from "./Icons";
import { getProjectWhatsAppUrl } from "@/lib/whatsapp";

export interface ProjectCardData {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription?: string | null;
  coverImage: string;
  websiteUrl?: string | null;
  demoVideoUrl?: string | null;
  isDemonstration: boolean;
  featured?: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const whatsappUrl = getProjectWhatsAppUrl(project.title);

  return (
    <article className="flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20 group">
      {/* Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <Image
          src={project.coverImage}
          alt={`Demonstração visual do projeto: ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority={project.featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
            {project.category}
          </span>

          {project.isDemonstration && (
            <span
              title="Projeto criado como modelo demonstrativo para apresentar soluções comerciais"
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 backdrop-blur-md"
            >
              Projeto Modelo
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-750 text-slate-200 text-sm font-medium transition-colors hover:text-white"
            >
              <span>Ver Demonstração</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-sm font-semibold transition-all hover:scale-[1.01]"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            <span>Quero um Site Assim</span>
          </a>
        </div>
      </div>
    </article>
  );
}
