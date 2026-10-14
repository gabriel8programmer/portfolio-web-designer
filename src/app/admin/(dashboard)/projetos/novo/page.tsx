import React from "react";
import Link from "next/link";
import { createProjectAction } from "@/app/actions/admin";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NovoProjetoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Link href="/admin/projetos" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium">
              Projetos
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Novo</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Cadastrar Novo Projeto
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Adicione um website ao seu portfólio comercial.
          </p>
        </div>
      </div>

      <ProjectForm action={createProjectAction} submitLabel="Cadastrar Projeto" />
    </div>
  );
}
