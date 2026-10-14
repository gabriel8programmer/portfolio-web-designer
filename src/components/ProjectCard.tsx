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
    <article className="flex flex-col bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-300 dark:hover:border-slate-700 transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-emerald-950/20 group">
      {/* Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image
          src={project.coverImage}
          alt={`Demonstração visual do projeto: ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority={project.featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 dark:from-slate-950/80 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/90 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 backdrop-blur-md shadow-sm">
            {project.category}
          </span>

          {project.isDemonstration && (
            <span
              title="Projeto criado como modelo demonstrativo para apresentar soluções comerciais"
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50/95 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 backdrop-blur-md shadow-sm"
            >
              Projeto Modelo
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 bg-white dark:bg-transparent">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2.5">
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 bg-white hover:bg-slate-100 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-sm font-semibold transition-colors shadow-xs whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Ver Demonstração</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
            </a>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 dark:text-emerald-300 dark:border dark:border-emerald-500/30 text-sm font-bold shadow-sm shadow-emerald-500/20 transition-all hover:scale-[1.005] whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-slate-950 dark:text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap">Quero um Site Assim</span>
          </a>
        </div>
      </div>
    </article>
  );
}
