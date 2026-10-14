import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  ExternalLinkIcon,
} from "@/components/Icons";
import {
  deleteProjectAction,
  toggleProjectFeaturedAction,
} from "@/app/actions/admin";

import { connection } from "next/server";

export const instant = false;

export default async function AdminProjetosPage() {
  await connection();
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.warn("[Admin Projetos] Queries skipped or table pending migration:", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Projetos & Portfólio
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Gerencie os websites exibidos na página inicial e na galeria de projetos.
          </p>
        </div>

        <Link
          href="/admin/projetos/novo"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/20"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Cadastrar Projeto</span>
        </Link>
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {projects.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Nenhum projeto cadastrado no banco de dados.
            </p>
            <Link
              href="/admin/projetos/novo"
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400"
            >
              Criar o primeiro projeto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Projeto</th>
                  <th className="py-3.5 px-4">Categoria</th>
                  <th className="py-3.5 px-4 text-center">Destaque</th>
                  <th className="py-3.5 px-4 text-center">Tipo</th>
                  <th className="py-3.5 px-4 text-center">Ordem</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {projects.map((project) => {
                  const deleteWithId = deleteProjectAction.bind(null, project.id);
                  const toggleFeaturedWithId = toggleProjectFeaturedAction.bind(
                    null,
                    project.id
                  );

                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {/* Project info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800">
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-white block truncate">
                              {project.title}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                              /{project.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                        <span className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {project.category}
                        </span>
                      </td>

                      {/* Featured toggle */}
                      <td className="py-4 px-4 text-center">
                        <form action={toggleFeaturedWithId} className="inline-block">
                          <button
                            type="submit"
                            title={
                              project.featured
                                ? "Remover dos destaques da Home"
                                : "Adicionar aos destaques da Home"
                            }
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                              project.featured
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                            }`}
                          >
                            {project.featured ? "Destaque" : "Normal"}
                          </button>
                        </form>
                      </td>

                      {/* Type (Demonstration vs Client) */}
                      <td className="py-4 px-4 text-center">
                        {project.isDemonstration ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                            Modelo
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                            Cliente Real
                          </span>
                        )}
                      </td>

                      {/* Order */}
                      <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">
                        {project.order}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {project.websiteUrl && (
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Acessar URL do site"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <ExternalLinkIcon className="w-4 h-4" />
                            </a>
                          )}

                          <Link
                            href={`/admin/projetos/${project.id}/editar`}
                            title="Editar projeto"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <EditIcon className="w-4 h-4" />
                          </Link>

                          <form
                            action={deleteWithId}
                            onSubmit={(e) => {
                              if (
                                !confirm(
                                  `Tem certeza que deseja excluir o projeto "${project.title}"?`
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                            className="inline-block"
                          >
                            <button
                              type="submit"
                              title="Excluir projeto"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
