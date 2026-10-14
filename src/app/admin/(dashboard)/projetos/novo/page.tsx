import React from "react";
import Link from "next/link";
import { createProjectAction } from "@/app/actions/admin";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NovoProjetoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/admin/projetos" className="hover:text-emerald-400">
              Projetos
            </Link>
            <span>/</span>
            <span className="text-slate-200">Novo</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Cadastrar Novo Projeto
          </h1>
          <p className="text-sm text-slate-400">
            Adicione um website ao seu portfólio comercial.
          </p>
        </div>
      </div>

      <ProjectForm action={createProjectAction} submitLabel="Cadastrar Projeto" />
    </div>
  );
}
