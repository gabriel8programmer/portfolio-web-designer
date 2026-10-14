import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProjectAction } from "@/app/actions/admin";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const instant = false;

export default async function EditarProjetoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const updateActionWithId = updateProjectAction.bind(null, project.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/admin/projetos" className="hover:text-emerald-400">
              Projetos
            </Link>
            <span>/</span>
            <span className="text-slate-200">Editar</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Editar Projeto: {project.title}
          </h1>
          <p className="text-sm text-slate-400">
            Atualize as informações e links deste website.
          </p>
        </div>
      </div>

      <ProjectForm
        initialData={project}
        action={updateActionWithId}
        submitLabel="Salvar Alterações"
      />
    </div>
  );
}
